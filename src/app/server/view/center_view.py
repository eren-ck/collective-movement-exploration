import psutil

from flask import render_template
from flask.views import View

from db import db
from model.dataset_model import Dataset
from model.user_role_model import User
from helpers.auth import user_required


class MyCenterView(View):
    """
    Custom flask view center home  view
    """
    decorators = [user_required]

    def dispatch_request(self):
        # system status
        cpu = psutil.cpu_percent()
        ram = psutil.virtual_memory().percent
        # disk = math.floor(psutil.disk_usage('/').percent)
        # database information
        num_users = db.session.query(User).count()
        num_datasets = db.session.query(Dataset).count()
        db_size = db.engine.execute('SELECT pg_size_pretty(pg_database_size(\'animaldb\'));').fetchone()[0]
        return render_template('center/index.html', cpu=cpu, ram=ram,  # disk=disk,
                               num_users=num_users, num_datasets=num_datasets, db_size=db_size)
