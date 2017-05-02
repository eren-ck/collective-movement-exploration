import sys, os

from flask_admin.contrib import sqla
from flask_security import current_user
from flask import url_for, request, redirect, flash, abort
from flask_admin.base import expose

from db import db
from model.dataset_model import Dataset


class MyDatasetView(sqla.ModelView):
    """
    Create customized model view class
    """
    can_create = False
    can_edit = False
    can_set_page_size = True
    can_view_details = True
    column_list = ['name']
    column_searchable_list = ('name',)
    column_details_list = ['id', 'name', 'status', 'user_id', 'progress', 'movement_data', 'metadata', 'group_data']

    # Templates
    list_template = 'view/dataset_list.html'
    """Default list view template"""

    details_template = 'view/dataset_explore.html'
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

        # print(path_file + model.name + '.csv', file=sys.stderr)
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