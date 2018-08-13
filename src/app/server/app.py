import os
import os.path as op
import atexit

from flask import Flask, render_template, request
from flask_security import SQLAlchemyUserDatastore, Security

from view.center_view import MyCenterView
from view.upload_view import upload_page
from view.dataset_view import dataset_page
from view.network_view import network_page
from view.user_view import user_page, RegistrationForm

from model.user_role_model import *

from helpers.restless import *

# Create Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
db.init_app(app)

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
Security(app, user_datastore, register_form=RegistrationForm)

path = op.join(op.dirname(__file__), 'files')


# Flask views
@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/contact')
def contact():
    return render_template('/contact.html')


# Custom Rest API
@app.route('/api/dataset', methods=['GET'])
def get_dataset():
    return api_get_dataset()


@app.route('/api/dataset/<int:id>', methods=['GET'])
def get_dataset_id(id):
    return api_get_dataset(id)


@app.route('/api/dataset/user/<int:user_id>', methods=['GET'])
def get_dataset_user_id(user_id):
    return api_get_dataset_user(user_id)


@app.route('/api/dataset/<int:id>/<feature>', methods=['GET'])
def get_feature(id, feature):
    return api_get_feature(id, feature)


@app.route('/api/dataset/<int:id>/vc', methods=['GET'])
def get_vc_feature(id):
    return api_get_vc(id)


@app.route('/api/movement_only/<int:id>', methods=['GET'])
def get_movment_only(id):
    return api_get_movment_only(id)


@app.route('/api/percentile/<int:id>', methods=['GET'])
def get_percentile(id):
    return api_get_percentile(id)


@app.route('/api/metadata/<int:id>', methods=['GET'])
def get_metadata(id):
    return api_get_metadata(id)


@app.route('/api/dataset/networks/<int:id>', methods=['GET'])
def get_dataset_networks(id):
    return api_get_dataset_networks(id)


@app.route('/api/dataset/network/<int:dataset_id>/<int:network_id>', methods=['GET'])
def get_dataset_network_data(dataset_id, network_id):
    return api_get_network_data(dataset_id, network_id)


@app.route('/api/dataset/network/hierarchy/<int:dataset_id>/<int:network_id>', methods=['GET'])
def get_dataset_network_hierarchy_data(dataset_id, network_id):
    return api_get_network_hierarchy_data(dataset_id, network_id)


# @ app.route('/api/dataset/visual_parameter/<int:dataset_id>', methods=['POST'])
# def get_dataset_suggested_parameters(dataset_id):
    # Get JSON object passed with Ajax request
    # tracked_data = request.json
    # return api_get_dataset_suggested_parameters(dataset_id, tracked_data)


# Class based views
app.add_url_rule('/center/', view_func=MyCenterView.as_view('center_view'))

# Register Blueprints
app.register_blueprint(upload_page)
app.register_blueprint(dataset_page)
app.register_blueprint(network_page)
app.register_blueprint(user_page)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404


# defining function to run on shutdown
def close_running_threads():
    db.session.remove()


# Register the function to be called on exit
atexit.register(close_running_threads)

if __name__ == '__main__':
    # Build a sample db on the fly, if one does not exist yet.
    app_dir = os.path.realpath(os.path.dirname(__file__))
    database_path = os.path.join(app_dir, app.config['DATABASE_FILE'])
    # Start app
    app.run(threaded=True, debug=True)
