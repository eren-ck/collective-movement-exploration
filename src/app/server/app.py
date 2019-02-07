import os
import os.path as op
import atexit

from flask import Flask, render_template, jsonify, make_response
from flask_security import SQLAlchemyUserDatastore, Security

from view.center_view import MyCenterView
from view.upload_view import upload_page
from view.dataset_view import dataset_page
from view.network_view import network_page
from view.user_view import user_page, RegistrationForm
from view.api_view import api_page

from model.user_role_model import *

# Create Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
db.init_app(app)

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
Security(app, user_datastore, register_form=RegistrationForm)

path = op.join(op.dirname(__file__), 'files')

# Class based views
app.add_url_rule('/center/', view_func=MyCenterView.as_view('center_view'))

# Register Blueprints
app.register_blueprint(upload_page)
app.register_blueprint(dataset_page)
app.register_blueprint(network_page)
app.register_blueprint(user_page)
app.register_blueprint(api_page)


# Flask views
@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/contact')
def contact():
    return render_template('/contact.html')


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404


@app.errorhandler(405)
def not_found(error):
    return make_response(jsonify({'error': 'Method Not Allowed'}), 405)


@app.errorhandler(500)
def not_found(error):
    return make_response(jsonify({'error': 'Internal Server Error'}), 500)


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
