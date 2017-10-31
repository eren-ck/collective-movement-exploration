from flask_security import UserMixin, RoleMixin, utils
from db import db

class Role(db.Model, RoleMixin):
    """
    User Role Class
    """
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __str__(self):
        return self.name


# Define relationship
roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)


class User(db.Model, UserMixin):
    """
    User  Class
    """
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)
        self.password = utils.encrypt_password(self.password)

    def __str__(self):
        return self.email

    def is_active(self):
        return self.active

    def __unicode__(self):
        return self.first_name
