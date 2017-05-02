import psutil
import math

from flask_security import current_user
from flask import url_for, redirect, request, abort
from flask_admin import expose, AdminIndexView

from db import db
from model.dataset_model import Dataset
from model.user_role_model import User


class MyHomeView(AdminIndexView):
    """
    Custom flask view home view
    """

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

    @expose("/")
    def index(self):
        # system status
        cpu = psutil.cpu_percent()
        ram = psutil.virtual_memory().percent
        disk = math.floor(psutil.disk_usage('/').percent)
        # database information
        num_users = db.session.query(User).count()
        num_datasets = db.session.query(Dataset).count()
        db_size = db.engine.execute('SELECT pg_size_pretty(pg_database_size(\'animaldb\'));').fetchone()[0]
        return self.render('view/home.html', cpu=cpu, ram=ram, disk=disk,
                           num_users=num_users, num_datasets=num_datasets, db_size=db_size)
