from flask_security import current_user
from flask_security.registerable import register_user
from flask import request, redirect, abort, flash, render_template, Blueprint, url_for
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, PasswordField
from wtforms.validators import InputRequired

from db import db
from model.user_role_model import User
from helpers.auth import user_required

user_page = Blueprint('user', __name__, url_prefix='/center/user')


class RegistrationForm(FlaskForm):
    """
       WTForms for creation
    """
    first_name = StringField(validators=[InputRequired()])
    last_name = StringField(validators=[InputRequired()])
    email = StringField(validators=[InputRequired()])
    password = PasswordField(validators=[InputRequired()])
    submit = SubmitField('')


@user_page.before_request
@user_required
def check_user():
    # only the admin has access to the user creation
    if not current_user.has_role('admin'):
        abort(400, description="Only users with the role admin can access this page")
    pass


@user_page.route('/')
def user_list():
    """
        List the all users
    """
    users = db.session.query(User).all()
    return render_template('/center/user/list.html', users=users)


@user_page.route('/delete/<user_id>')
def network_delete(user_id):
    """
        Delete the user
    """
    user = db.session.query(User).filter_by(id=user_id).first()
    if not current_user.has_role('admin'):
        abort(400, description="Only users with the role admin can access this page")
    db.session.delete(user)
    db.session.commit()
    flash('User deleted', 'success')
    return redirect(url_for('.user_list'))


@user_page.route('/edit/<user_id>', methods=('GET', 'POST'))
def network_edit(user_id):
    """
        Edit user
    """
    user = db.session.query(User).filter_by(id=user_id).first()

    if user is None:
        flash('User does not exist.', 'error')
        return redirect(url_for('.user_list'))
    # edit
    if request.method == 'POST':
        form = RegistrationForm(request.form)
        # not valid input form
        if not form.validate():
            flash(form.errors, 'error')
            return redirect(url_for('.dataset_list'))
        # update the user
        user.edit_update(form)
        db.session.commit()
        flash('User successfully edited', 'success')
        return redirect(url_for('.user_list'))
    # get form
    form = RegistrationForm(obj=user)
    return render_template('/center/user/new.html', title='Edit', form=form)


@user_page.route('/new', methods=('GET', 'POST'))
def user_new():
    """
        Create new user
    """
    form = RegistrationForm(request.form)

    if request.method == 'POST' and form.validate():
        # check if user email already exists
        email = form.email.data
        user_exists = db.session.query(User).filter_by(email=email).first()
        if user_exists:
            form.email.errors.append(email + ' is already associated with another user')
            form.email.data = email
            flash('User already exists', 'error')
            return render_template('center/user/new.html', form=form)
        else:
            # add new user
            model = User(**form.data)
            db.session.add(model)
            db.session.commit()
            flash('User added successfully', 'success')
            return redirect(url_for('.user_list'))
    return render_template('/center/user/new.html', title='New User', form=form)
