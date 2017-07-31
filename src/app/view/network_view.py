import sys
import os
import time

from flask_admin.contrib import sqla
from flask_security import current_user
from flask import url_for, request, redirect, abort, flash
from flask_admin.base import expose
from flask_wtf import FlaskForm
from wtforms import DecimalField, BooleanField, StringField, SelectField
from wtforms.validators import InputRequired

from flask_admin.helpers import get_redirect_target
from flask_admin.form import FormOpts

from model.network_model import Network

from db import db
from model.dataset_model import Dataset


class NetworkForm(FlaskForm):
    """
       WTForms for editing
    """
    dataset_id = SelectField(u'Dataset', validators=[InputRequired()])
    name = StringField(label='Network Name', validators=[InputRequired()])


class MyNetworkView(sqla.ModelView):
    """
    Create customized model view class
    """
    can_create = True
    can_edit = False
    # can_set_page_size = True
    can_view_details = True
    column_list = ['name']
    column_details_list = ['dataset_id', 'name', 'network']
    form_excluded_columns = (
        'network')

    # Templates
    # list_template = 'view/network_list.html'
    """Default list view template"""

    # details_template = 'view/dataset_explore.html'
    """Default details view template"""

    # edit_template = 'view/dataset_edit.html'
    """Default edit template"""

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

    # def on_model_delete(self, model):
    #     """
    #         Perform some actions before a model is deleted.
    #
    #         Called from delete_model in the same transaction
    #         (if it has any meaning for a store backend).
    #
    #         Only the user who has uploaded the dataset is able to delete it
    #     """
    #     # TODO change this
    #     if not (current_user.id == model.user_id):
    #         abort(403)
    #     pass

    # def get_query(self):
    #     """
    #     Filter the datasets - only get current user datasets
    #     """
    #     return self.session.query(self.model).filter(self.model.user_id == current_user.id)
    #
    # def get_count_query(self):
    #     """
    #     Number of datasets - only get current user datasets
    #     """
    #     return self.session.query(sqla.view.func.count('*')).filter(self.model.user_id == current_user.id)

    # @expose('/details/')
    # def details_view(self):
    #     """
    #         Details model view
    #     """
    #     template = self.details_template
    #     id = request.args['id']
    #     parameters = db.session.query(Dataset).filter_by(id=id)[0].as_dict()
    #
    #     return self.render(template, parameters=parameters)


    @expose('/new/', methods=('GET', 'POST'))
    def create_view(self):
        """
            Create model view
        """
        return_url = get_redirect_target() or self.get_url('.index_view')

        if not self.can_create:
            return redirect(return_url)

        form = NetworkForm()

        choices = []
        for dataset in db.session.query(Dataset).filter_by(user_id=current_user.id):
            choices.append((dataset.id, dataset.name))

        form.dataset_id.choices = choices

        if not hasattr(form, '_validated_ruleset') or not form._validated_ruleset:
            self._validate_form_instance(ruleset=self.form, form=form)

        if request.method == 'POST':
            form = NetworkForm(request.form)

            # if not form.validate():
            #     flash(form.errors, 'error')
            #     return redirect(request.url)
            print('XXXX', file=sys.stderr)
            print(form.data, file=sys.stderr)

            model = Network(**form.data)
            db.session.add(model)
            db.session.commit()

            if '_add_another' in request.form:
                return redirect(request.url)
            else:
                # save button
                return redirect(self.get_save_return_url(model, is_created=True))

        form_opts = FormOpts(widget_args=self.form_widget_args,
                             form_rules=self._form_create_rules)

        template = self.create_template

        return self.render(template,
                           form=form,
                           form_opts=form_opts,
                           return_url=return_url)