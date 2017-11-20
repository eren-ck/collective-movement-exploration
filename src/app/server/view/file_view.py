import os
import os.path as op
import time
import sys

from feature_extraction.calculate_features import calculate_features
from multiprocessing import Process
from model.dataset_model import Dataset
from model.user_role_model import *

from flask_admin.contrib import fileadmin
from flask_security import current_user
from flask import url_for, redirect, request, abort
from flask_admin.babel import gettext
from flask import flash
from flask_admin.base import expose
from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import DecimalField, BooleanField, StringField, SubmitField, IntegerField
from wtforms.validators import InputRequired
from werkzeug import secure_filename


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
    background_image = FileField(u'Background image of the spatial view')
    submit = SubmitField('')


# Create directory for file fields to use
file_path = op.join(op.dirname(__file__), '../files')
try:
    os.mkdir(file_path)
except OSError:
    pass


class MyFileAdminView(fileadmin.FileAdmin):
    """
       Custom file view view
    """
    upload_template = 'view/upload.html'  # upload tremplate
    list_template = 'view/upload_list.html'
    can_delete_dirs = False
    can_delete = False
    can_mkdir = False
    can_rename = False
    can_download = False
    ALLOWED_EXTENSIONS = set(['csv'])

    def is_accessible(self):
        """
        Accessible if user is logged in
        """
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.is_active:
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

    def on_file_upload(self, form, movement_file_filename, metadata_file_filename, image_name=None):
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

        pass

    def before_file_delete(self, full_path, filename):
        """
            Perform some actions before a file has successfully been deleted.

            Called from delete method

            By default do nothing.
        """
        pass

    def get_base_path(self):
        """
            Return base path. Override to customize behavior (per-user
            directories, etc)
        """
        try:
            os.mkdir(os.path.join(fileadmin.FileAdmin.get_base_path(self), str(current_user.id)))
        except OSError:
            pass

        return os.path.join(fileadmin.FileAdmin.get_base_path(self), str(current_user.id))

    def check_csv_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1] in self.ALLOWED_EXTENSIONS

    @expose('/upload/', methods=('GET', 'POST'))
    @expose('/upload/<path:path>', methods=('GET', 'POST'))
    def upload(self, path=None):
        """
            Upload view method

            :param path:
                Optional directory path. If not provided, will use the base directory
        """
        # Get path and verify if it is valid
        base_path, directory, path = self._normalize_path(path)

        # Check if upload is enabled
        if not self.can_upload:
            flash(gettext('File uploading is disabled.'), 'error')
            return redirect(self._get_dir_url('.index_view', path))

        # check if the user has the permission to access this
        if not self.is_accessible_path(path):
            flash(gettext('Permission denied.'), 'error')
            return redirect(self._get_dir_url('.index_view'))

        form = UploadForm()

        if form.is_submitted():

            # Validation of the input
            if not form.validate():
                flash(form.errors, 'error')
                return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))

            # check if background image has the right extension
            print('Hello world!', file=sys.stderr)
            print(form.background_image, file=sys.stderr)
            print(form.background_image.data, file=sys.stderr)

            if form.background_image.data:
                image_name = form.background_image.data.filename.lower()
                ALLOWED_IMAGE_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
                if not ('.' in image_name and image_name.rsplit('.', 1)[-1] in ALLOWED_IMAGE_EXTENSIONS):
                    flash(gettext('Wrong Filetype, you can upload only png,jpg,jpeg files'), 'error')
                    return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))
                current_milli_time = int(round(time.time() * 1000))
                image_name = str(current_milli_time) + '.' + image_name.rsplit('.', 1)[-1]
                image_name = self._separator.join([os.path.join('static', 'img'), secure_filename(image_name)])

                self.save_file(image_name, form.background_image.data)
            else:
                image_name = ''
            # rename the movement file
            form.movement.data.filename = form.name.data + '.csv'

            # Make the filename safe, remove unsupported chars
            movement_file_filename = self._separator.join([directory, secure_filename(form.movement.data.filename)])

            # Check if the animal movement file is csv
            if not self.check_csv_file(form.movement.data.filename):
                flash(gettext('Animal Movement file is not CSV !'), 'error')
                return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))

            # Check if the metadata file is csv
            if form.metadata.data and not self.check_csv_file(form.metadata.data):
                flash(gettext('Metadata file  Movement file is not CSV !'), 'error')
                return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))

            # Check if there a object with the same name
            if self.storage.path_exists(movement_file_filename):
                flash(gettext('Failed to save - file already exists !'), 'error')
                return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))
            # Save the object
            else:
                try:
                    # save
                    self.save_file(movement_file_filename, form.movement.data)
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
                metadata_file_filename = self._separator.join([directory, secure_filename(form.metadata.data.filename)])

                # Check if there a object with the same name
                if self.storage.path_exists(metadata_file_filename):
                    flash(gettext('Failed to save - file already exists !'), 'error')
                    return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))
                # Save the object
                else:
                    try:
                        # save
                        self.save_file(metadata_file_filename, form.metadata.data)
                        #  Flash message successfully
                        flash(gettext('Successfully saved file: %(name)s',
                                      name=form.metadata.data.filename), 'success')

                    except Exception as ex:
                        flash(gettext('Failed to save file: %(error)s', error=ex), 'error')
                # call the on file upload method
                self.on_file_upload(form, movement_file_filename, metadata_file_filename, image_name)
            else:
                # call the on file upload method
                self.on_file_upload(form, movement_file_filename, '', image_name)
            # redirect to the upload page
            return redirect(self._get_dir_url('.index_view', path))

        return self.render(self.upload_template, form=form, header_text=gettext('Upload File'))

    @expose('/')
    @expose('/b/<path:path>')
    def index_view(self):
        """
            Custom upload index view
        """
        # get the datasets of the user
        datasets = Dataset.query.filter_by(user_id=current_user.id)

        return self.render(self.list_template, datasets=datasets, get_dir_url=self._get_dir_url)
