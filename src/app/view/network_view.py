import sys
import os
import time

from flask_admin.contrib import sqla
from flask_security import current_user
from flask import url_for, request, redirect, abort, flash
from flask_admin.base import expose
from flask_wtf import FlaskForm
from wtforms import DecimalField, SubmitField, StringField, SelectField
from wtforms.validators import InputRequired, NumberRange

from multiprocessing import Process
from sqlalchemy import desc

from flask_admin.helpers import get_redirect_target
from flask_admin.form import FormOpts

from model.network_model import Network

from db import db
from model.dataset_model import Dataset

from feature_extraction.network_calculation import calculate_network

class NetworkForm(FlaskForm):
    """
       WTForms for editing
    """
    dataset_id = SelectField(u'Dataset', coerce=int, validators=[InputRequired()])
    name = StringField(label='Network Name', validators=[InputRequired()])
    metric_distance = DecimalField(label='Metric Distance to frame n-1', places=2, validators=[InputRequired(),
                                                                                               NumberRange(min=0, max=1,
                                                                                                           message='Please enter a value between 0 and 1')])
    speed = DecimalField(label='Speed', places=2, validators=[InputRequired(), NumberRange(min=0, max=1,
                                                                                           message='Please enter a value between 0 and 1')])
    acceleration = DecimalField(label='Acceleration', places=2, validators=[InputRequired(), NumberRange(min=0, max=1,
                                                                                                         message='Please enter a value between 0 and 1')])
    distance_centroid = DecimalField(label='Distance to Centroid', places=2, validators=[InputRequired(),
                                                                                         NumberRange(min=0, max=1,
                                                                                                     message='Please enter a value between 0 and 1')])
    direction = DecimalField(label='Direction', places=2, validators=[InputRequired(), NumberRange(min=0, max=1,
                                                                                                   message='Please enter a value between 0 and 1')])
    euclidean_distance = DecimalField(label='Euclidean Distance to other animals', places=2, validators=[InputRequired(), NumberRange(min=0, max=1,
                                                                                                   message='Please enter a value between 0 and 1')])
    submit = SubmitField('')



class MyNetworkView(sqla.ModelView):
    """
    Create customized model view class
    """
    can_create = True
    can_edit = False
    # can_set_page_size = True
    can_view_details = True
    column_list = ['dataset.name', 'name', 'finished']
    column_details_list = ['dataset_id', 'name', 'finished', 'error', 'metric_distance', 'speed', 'acceleration',
                           'distance_centroid', 'direction']
    form_excluded_columns = (
        'network')

    # Templates
    list_template = 'view/network_list.html'
    """Default list view template"""

    create_template = 'view/network_create.html'
    """Default create template"""

    details_template = 'view/network_details.html'
    """Default details view template"""

    def is_accessible(self):
        """
        Accessible if user is logged in and it is his dataset
        """
        if current_user.is_authenticated:
            return True

        return False

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)
            else:
                # login
                return redirect(url_for('security.login', next=request.url))

    def on_model_delete(self, model):
        """
            Perform some actions before a model is deleted.

            Called from delete_model in the same transaction
            (if it has any meaning for a store backend).

            Only the user who has uploaded the dataset is able to delete it
        """
        if not (current_user.id == model.dataset.user_id):
            abort(403)
        pass

    def get_query(self):
        """
        Filter the datasets - only get current user datasets
        """
        return self.session.query(self.model).join(Dataset).filter(Dataset.user_id == current_user.id)

    @expose('/details/')
    def details_view(self):
        """
            Details model view
        """
        template = self.details_template
        ids = request.args['id'].split(',')
        dataset_id= ids[0]
        network_id = ids[1]
        model = db.session.query(Network).filter_by(dataset_id=dataset_id,network_id=network_id)[0].as_dict()

        return self.render(template, model=model)


    @expose('/new/', methods=('GET', 'POST'))
    def create_view(self):
        """
            Create model view
        """
        return_url = get_redirect_target() or self.get_url('.index_view')

        if not self.can_create:
            return redirect(return_url)

        form = NetworkForm()
        # set the possible choices for the dataset id
        form.dataset_id.choices = [(d.id, d.name) for d in
                                   db.session.query(Dataset).filter_by(user_id=current_user.id)]

        if request.method == 'POST':
            form = NetworkForm(request.form)
            # set the possible choices for the dataset id
            form.dataset_id.choices = [(d.id, d.name) for d in
                                       db.session.query(Dataset).filter_by(user_id=current_user.id)]

            if not hasattr(form, '_validated_ruleset') or not form._validated_ruleset:
                self._validate_form_instance(ruleset=self._form_create_rules, form=form)

            # check if valid form
            if form.validate():
                # get the next network_id for the dataset
                network_id = db.session.query(Network).filter_by(dataset_id=form.dataset_id.data).order_by(
                    desc(Network.network_id)).limit(1).first()
                if network_id:
                    network_id = network_id.network_id + 1
                else:
                    network_id = 0
                # create and commit the new network
                model = Network(network_id, **form.data)
                db.session.add(model)
                db.session.commit()

                # start the calculation in a new process
                p = Process(target=calculate_network,
                            args=(model.dataset_id,model.network_id))
                p.start()

                if '_add_another' in request.form:
                    return redirect(request.url)
                else:
                    # save button
                    return redirect(self.get_save_return_url(model, is_created=True))
            else:
                self.on_form_prefill(form, id)

        form_opts = FormOpts(widget_args=self.form_widget_args,
                             form_rules=self._form_create_rules)

        template = self.create_template

        return self.render(template,
                           form=form,
                           form_opts=form_opts,
                           return_url=return_url)
