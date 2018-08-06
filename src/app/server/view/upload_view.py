import os
import os.path as op
import time
import sys

from feature_extraction.calculate_features import calculate_features
from helpers.auth import user_required

from multiprocessing import Process
from model.dataset_model import Dataset
from model.user_role_model import *

from flask_security import current_user
from flask import url_for, redirect, request, abort
from flask_admin.babel import gettext
from flask import flash, render_template
from flask import Blueprint
from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import DecimalField, BooleanField, StringField, SubmitField, IntegerField
from wtforms.validators import InputRequired
from werkzeug import secure_filename

upload_page = Blueprint('upload', __name__, url_prefix='/center/upload')

# Variables
# Create directory for file fields to use
file_path = op.join(os.path.dirname(__file__), '../files')
# Create img dir if it does not exist
img_path = os.path.join('static', 'img')
try:
    os.mkdir(file_path)
    os.mkdir(img_path)
except OSError:
    pass

ALLOWED_EXTENSIONS = set(['csv'])


class UploadForm(FlaskForm):
    """
       WTForms for upload
    """
    name = StringField(validators=[InputRequired()])
    movement = FileField(validators=[InputRequired()])
    metadata = FileField()
    origin_x = DecimalField(label='X', default=0.0, places=2, validators=[InputRequired()])
    origin_y = DecimalField(label='Y', default=0.0, places=2, validators=[InputRequired()])
    min_x = DecimalField(label='X', places=2, validators=[InputRequired()])
    min_y = DecimalField(label='Y', places=2, validators=[InputRequired()])
    max_x = DecimalField(label='X', places=2, validators=[InputRequired()])
    max_y = DecimalField(label='Y', places=2, validators=[InputRequired()])
    inverted_x = BooleanField('Invert x-axis', default=False)
    inverted_y = BooleanField('Invert y-axis', default=True)
    fps = IntegerField(label='FPS', default=25, validators=[InputRequired()])
    background_image = FileField()
    submit = SubmitField('')


@upload_page.before_request
@user_required
def check_user():
    """ Protect to only logged in users of the admin endpoints. """
    pass


@upload_page.route('/')
def upload_list():
    """
        List the uploaded datasets
    """
    datasets = Dataset.query.filter_by(user_id=current_user.id).filter(Dataset.progress != 100).all()
    return render_template('/center/upload/list.html', datasets=datasets)


@upload_page.route('/new', methods=('GET', 'POST'))
def upload_new():
    """
        Upload the files and start the upload and feature extraction process
    """
    template = '/center/upload/new.html'
    directory = get_files_path()

    # wtf upload form
    form = UploadForm()

    if form.is_submitted():

        # Validation of the input
        if not form.validate():
            flash(form.errors, 'error')
            return render_template(template, form=form)

        # check if background image has the right extension
        if form.background_image.data:
            image_name = form.background_image.data.filename.lower()
            ALLOWED_IMAGE_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
            # if wrong return l
            if not ('.' in image_name and image_name.rsplit('.', 1)[-1] in ALLOWED_IMAGE_EXTENSIONS):
                flash(gettext('Wrong Filetype, you can upload only png,jpg,jpeg files'), 'error')
                return render_template(template, form=form)
            current_milli_time = int(round(time.time() * 1000))
            image_name = str(current_milli_time) + '.' + image_name.rsplit('.', 1)[-1]
            image_name = os.path.join(img_path, secure_filename(image_name))
            form.background_image.data.save(image_name)
        else:
            # no image was uploaded
            image_name = ''

        # Store the uploaded movement file
        form.movement.data.filename = form.name.data + '.csv'
        # Make the filename safe, remove unsupported chars
        movement_file_filename = os.path.join(directory, secure_filename(form.movement.data.filename))
        # Check if the movement file is csv
        if not check_csv_file(form.movement.data.filename):
            flash(gettext('Animal Movement file is not CSV !'), 'error')
            return render_template(template, form=form)
        # if the file already exists delete it
        if os.path.exists(movement_file_filename):
            os.remove(movement_file_filename)
        # save the movement file
        try:
            # save
            form.movement.data.save(movement_file_filename)
            #  Flash message successfully
            flash(gettext('Successfully saved file: %(name)s',
                          name=form.movement.data.filename), 'success')

        except Exception as ex:
            flash(gettext('Failed to save file: %(error)s', error=ex), 'error')

        # get the request metadata file
        if form.metadata.data:
            # rename the metadata file
            form.metadata.data.filename = form.name.data + '_metadata.csv'
            # Make the filename safe, remove unsupported chars
            metadata_file_filename = os.path.join(directory, secure_filename(form.metadata.data.filename))
            # Check if the metadata file is csv
            if not check_csv_file(form.metadata.data.filename):
                flash(gettext('Metadata file is not CSV !'), 'error')
                return render_template(template, form=form)
            # if the file already exists delete it
            if os.path.exists(metadata_file_filename):
                os.remove(metadata_file_filename)
            # Save the object
            try:
                # save
                form.metadata.data.save(metadata_file_filename)
            except Exception as ex:
                flash(gettext('Failed to save file: %(error)s', error=ex), 'error')
        else:
            metadata_file_filename = ''
        print('Hello world!', file=sys.stderr)
        print('Would start without metadata', file=sys.stderr)
        # call the on file upload method
        start_upload(form, movement_file_filename, metadata_file_filename, image_name)
        # redirect to the upload list
        return redirect(url_for('upload.upload_list'))

    # normal get
    return render_template(template, form=form)


def start_upload(form, movement_file_filename, metadata_file_filename, image_name):
    """
        Perform some actions after a file has been successfully uploaded.

        Save the csv file in the database
    """
    ## Save the dataset data into the database
    dataset = Dataset(form, current_user.id)
    db.session.add(dataset)
    db.session.commit()

    # upload the dataset
    p = Process(target=calculate_features,
                args=(dataset.id, movement_file_filename, metadata_file_filename, image_name))
    p.start()


def get_files_path():
    """
        Return base path. Override to customize behavior (per-user
        directories, etc)
    """
    try:
        os.mkdir(os.path.join(file_path, str(current_user.id)))
    except OSError:
        pass
    return os.path.join(file_path, str(current_user.id))


def check_csv_file(filename):
    """
        Check if file extension is correct
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
