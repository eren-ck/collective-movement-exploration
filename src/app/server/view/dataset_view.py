import sys
import os
import time

from flask import Blueprint, render_template, request, redirect, abort, flash, url_for
from flask_admin.contrib import sqla
from flask_security import current_user
from flask_admin.base import expose
from flask_wtf import FlaskForm
from wtforms import DecimalField, BooleanField, StringField, FileField
from wtforms.validators import InputRequired

from flask_admin.helpers import get_redirect_target
from flask_admin.babel import gettext
from flask_admin.form import FormOpts

from werkzeug import secure_filename

from db import db
from model.dataset_model import Dataset
from helpers.auth import user_required

dataset_page = Blueprint('dataset', __name__, url_prefix='/center/dataset')


class EditForm(FlaskForm):
    """
       WTForms for editing
    """
    name = StringField(validators=[InputRequired()])
    origin_x = DecimalField(label='X', places=2, validators=[InputRequired()])
    origin_y = DecimalField(label='Y', places=2, validators=[InputRequired()])
    min_x = DecimalField(label='X', places=2, validators=[InputRequired()])
    min_y = DecimalField(label='Y', places=2, validators=[InputRequired()])
    max_x = DecimalField(label='X', places=2, validators=[InputRequired()])
    max_y = DecimalField(label='Y', places=2, validators=[InputRequired()])
    inverted_x = BooleanField('Invert x-axis')
    inverted_y = BooleanField('Invert y-axis')
    background_image = FileField(u'Background image of the spatial view')


@dataset_page.before_request
@user_required
def check_user():
    """ Protect to only logged in users of the admin endpoints. """
    pass


@dataset_page.route('/')
def dataset_list():
    """
        List the uploaded datasets
    """
    datasets = Dataset.query.filter_by(user_id=current_user.id).filter(Dataset.progress == 100).all()
    return render_template('/center/dataset/list.html', datasets=datasets)


@dataset_page.route('/delete/<dataset_id>')
def dataset_delete(dataset_id):
    """
        Delete a dataset if the current user is also the owner of the dataset
    """
    dataset = Dataset.query.filter_by(id=dataset_id).first()
    if dataset is None or current_user.id != dataset.user_id:
        abort(400, description="This is not your dataset")
    db.session.delete(dataset)
    db.session.commit()
    flash(gettext('Dataset deleted'), 'success')
    return redirect(url_for('.dataset_list'))


@dataset_page.route('/edit/<dataset_id>', methods=('GET', 'POST'))
def dataset_edit(dataset_id):
    """
        Edit a dataset if the current user is also the owner of the dataset
    """
    dataset = Dataset.query.filter_by(id=dataset_id).first()
    if dataset is None or current_user.id != dataset.user_id:
        abort(400, description="You can edit this dataset")

    model = dataset.as_dict()

    # empty record
    if model is None:
        flash(gettext('Record does not exist.'), 'error')
        return redirect(url_for('.dataset_list'))

    form = EditForm()

    # set the already set values for the dataset
    if request.method == 'GET':
        form.name.data = model['name']
        form.origin_x.data = model['coordinate_origin']['geometry']['coordinates'][0]
        form.origin_y.data = model['coordinate_origin']['geometry']['coordinates'][1]
        form.min_x.data = model['min']['geometry']['coordinates'][0]
        form.min_y.data = model['min']['geometry']['coordinates'][1]
        form.max_x.data = model['max']['geometry']['coordinates'][0]
        form.max_y.data = model['max']['geometry']['coordinates'][1]
        form.inverted_x.data = model['inverted_x']
        form.inverted_y.data = model['inverted_y']
        form.background_image.filename = model['background_image']

    # if post get the data and save it
    if request.method == 'POST':
        form = EditForm(request.form)

        if not form.validate():
            flash(form.errors, 'error')
            return redirect(url_for('.dataset_list'))

        # check if background image has the right extension

        if request.files['background_image']:
            file = request.files['background_image']
            image_name = file.filename.lower()
            ALLOWED_IMAGE_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
            if not ('.' in image_name and image_name.rsplit('.', 1)[-1] in ALLOWED_IMAGE_EXTENSIONS):
                flash(gettext('Wrong Filetype, you can upload only png,jpg,jpeg files'), 'error')
                return redirect(request.url)
            current_milli_time = int(round(time.time() * 1000))
            image_name = str(current_milli_time) + '.' + image_name.rsplit('.', 1)[-1]
            image_name = os.path.join('static', 'img', secure_filename(image_name))

            file.save(image_name)
        else:
            image_name = ''
        # update the dataset
        dataset.edit_update(form, image_name)
        db.session.commit()
        # feedback for user
        flash(gettext('Record was successfully saved.'), 'success')
        # save button
        flash(gettext('Dataset edited'), 'success')
        return redirect(url_for('.dataset_list'))

    return render_template('/center/dataset/edit.html',
                           model=model,
                           form=form)


@dataset_page.route('/export/<dataset_id>/')
def dataset_export(dataset_id):
    """
        Export the dataset - only get current user datasets

        :param id:
        id of the dataset
    """
    dataset = Dataset.query.filter_by(id=dataset_id).first()
    if dataset is None or current_user.id != dataset.user_id:
        abort(400, description="You can export this dataset")
    return render_template('/center/dataset/export.html', id=dataset_id)


@dataset_page.route('/explore/<dataset_id>/')
def dataset_explore(dataset_id):
    """
        Explore the datasets - only get current user datasets

        :param id:
        id of the dataset
    """
    dataset = Dataset.query.filter_by(id=dataset_id).first()
    return render_template('/center/dataset/explore.html', parameters=dataset.as_dict())
