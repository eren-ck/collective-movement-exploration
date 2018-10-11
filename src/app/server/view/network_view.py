import sys
import os
import time

from flask_security import current_user
from flask import url_for, request, redirect, abort, flash, Blueprint, render_template
from flask_wtf import FlaskForm
from wtforms import DecimalField, SubmitField, StringField, SelectField
from wtforms.validators import InputRequired, NumberRange

from multiprocessing import Process
from sqlalchemy import desc

from model.network_model import Network

from db import db
from model.dataset_model import Dataset
from helpers.auth import user_required

from feature_extraction.network_calculation import calculate_network

network_page = Blueprint('network', __name__, url_prefix='/center/network')


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
    euclidean_distance = DecimalField(label='Euclidean Distance to other animals', places=2,
                                      validators=[InputRequired(), NumberRange(min=0, max=1,
                                                                               message='Please enter a value between 0 and 1')])
    # metric = SelectField(U'Metric', choices=[('euclidean', 'Euclidean distance '),
    #                                          ('cityblock', 'Manhattan distance'),
    #                                          ('Sqeuclidean', 'Squared Euclidean distance'),
    #                                          ('cosine', 'Cosine distance '),
    #                                          ('correlation', 'Correlation distance '),
    #                                          ('hamming', 'Hamming distance'),
    #                                          ('jaccard', 'Jaccard distance'),
    #                                          ('chebyshev', 'Chebyshev distance'),
    #                                          ('canberra', 'Canberra distance'),
    #                                          ('braycurtis', 'Bray-Curtis distance')],
    #                      validators=[InputRequired()])

    submit = SubmitField('')


@network_page.before_request
@user_required
def check_user():
    """ Protect to only logged in users of the admin endpoints. """
    pass


@network_page.route('/')
def network_list():
    """
        List the uploaded networks
    """
    networks = Network.query.join(Dataset).filter(Dataset.user_id == current_user.id).order_by(Dataset.name,
                                                                                               Network.name).all()
    return render_template('/center/network/list.html', networks=networks)


@network_page.route('/details/<dataset_id>/<network_id>')
def network_details(dataset_id, network_id):
    """
        Details model view
    """
    model = db.session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id).first().as_dict()
    return render_template('/center/network/details.html', model=model)


@network_page.route('/delete/<dataset_id>/<network_id>')
def network_delete(dataset_id, network_id):
    """
        Details model view
    """
    network = db.session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id).first()
    if network is None or current_user.id != network.dataset.user_id:
        abort(400, description="You can delete this network")
    db.session.delete(network)
    db.session.commit()
    flash('Network deleted', 'success')
    return redirect(url_for('.network_list'))


@network_page.route('/new', methods=('GET', 'POST'))
def network_new():
    """
        Create new network
    """
    form = NetworkForm()
    # set the possible choices for the dataset id
    form.dataset_id.choices = [(d.id, d.name) for d in
                               db.session.query(Dataset).filter_by(user_id=current_user.id)]

    if request.method == 'POST':
        form = NetworkForm(request.form)
        # set the possible choices for the dataset id
        form.dataset_id.choices = [(d.id, d.name) for d in
                                   db.session.query(Dataset).filter_by(user_id=current_user.id, progress=100)]

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
                        args=(model.dataset_id, model.network_id))
            p.start()

            flash('Network created', 'success')
            return redirect(url_for('.network_list'))

    return render_template('/center/network/new.html',
                           form=form)
