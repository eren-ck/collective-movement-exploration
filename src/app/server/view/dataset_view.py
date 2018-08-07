import sys
import os
import time

from flask import Blueprint, render_template, request, redirect, abort, flash
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

# Templates
# Default list view template
list_template = 'view/dataset_list.html'

# Default details view template
explore_template = 'view/dataset_explore.html'

# Default edit template
edit_template = 'view/dataset_edit.html'


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
def upload_list():
    """
        List the uploaded datasets
    """
    datasets = Dataset.query.filter_by(user_id=current_user.id).filter(Dataset.progress == 100).all()
    return render_template('/center/dataset/list.html', datasets=datasets)



def on_model_delete(self, model):
    """
        Perform some actions before a model is deleted.

        Called from delete_model in the same transaction
        (if it has any meaning for a store backend).

        Only the user who has uploaded the dataset is able to delete it
    """
    if not (current_user.id == model.user_id):
        abort(403)
    pass


def after_model_delete(self, model):
    """
        Perform some actions after a model was deleted and
        committed to the database.

        Delete the csv files movement data and metadata

        :param model:
            Model that was deleted
    """
    # get the path to the files folder
    path_file = os.path.dirname(os.getcwd()) + '\\files\\' + str(current_user.id) + '\\'
    # print(path_file + model.name + '.csv',
    #  delete the movement file of the dataset
    try:
        os.remove(path_file + model.name + '.csv')
    except OSError:
        pass
    # delete the metadata file of the dataset
    try:
        os.remove(path_file + model.name + '_metadata.csv')
    except OSError:
        pass
    pass


@expose('/export/<id>/')
def export(self, id):
    """
        Filter the datasets - only get current user datasets

        :param id:
        id of the dataset
    """
    return self.render('view/dataset_export.html', id=id)


def get_query(self):
    """
    Filter the datasets - only get current user datasets
    """
    return self.session.query(self.model).filter(self.model.user_id == current_user.id)


def get_count_query(self):
    """
    Number of datasets - only get current user datasets
    """
    return self.session.query(sqla.view.func.count('*')).filter(self.model.user_id == current_user.id)


@expose('/details/')
def details_view(self):
    """
        Details model view
    """
    template = self.details_template
    id = request.args['id']
    parameters = db.session.query(Dataset).filter_by(id=id)[0].as_dict()

    return self.render(template, parameters=parameters)


@expose('/edit/', methods=('GET', 'POST'))
def edit_view(self):
    """
        Edit model view
    """
    return_url = get_redirect_target() or self.get_url('.index_view')

    # if not editable
    if not self.can_edit:
        return redirect(return_url)

    # get the requested id
    id = request.args.get('id')
    if id is None:
        return redirect(return_url)
    # get the dataset of the id
    dataset = db.session.query(Dataset).filter_by(id=id)[0]
    model = dataset.as_dict()

    # empty record
    if model is None:
        flash(gettext('Record does not exist.'), 'error')
        return redirect(return_url)

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

    if not hasattr(form, '_validated_ruleset') or not form._validated_ruleset:
        self._validate_form_instance(ruleset=self._form_edit_rules, form=form)

    # if post get the data and save it
    if request.method == 'POST':
        form = EditForm(request.form)

        if not form.validate():
            flash(form.errors, 'error')
            return redirect(request.url)

        # check if background image has the right extension
        # print('Hello world!', file=sys.stderr)

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
        if '_add_another' in request.form:
            return redirect(self.get_url('.create_view', url=return_url))
        elif '_continue_editing' in request.form:
            return redirect(request.url)
        else:
            # save button
            return redirect(self.get_save_return_url(model, is_created=False))

    form_opts = FormOpts(widget_args=self.form_widget_args,
                         form_rules=self._form_edit_rules)

    template = self.edit_template

    return self.render(template,
                       model=model,
                       form=form,
                       form_opts=form_opts,
                       return_url=return_url)
