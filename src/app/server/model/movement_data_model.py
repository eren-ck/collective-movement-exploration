from sqlalchemy.orm import backref

from db import db
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from model.dataset_model import Dataset


class Movement_data(db.Model):
    """
    Movement data class
    """
    # db table name
    __tablename__ = 'movement_data'

    # realtionship to dataset table
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), primary_key=True, nullable=False)
    dataset = db.relationship(Dataset, backref=backref("movement_data", cascade="all, delete-orphan"))

    # columns
    animal_id = db.Column(db.Integer, primary_key=True, nullable=False)
    time = db.Column(db.Integer, primary_key=True, nullable=False)
    position = db.Column(Geometry('POINT'))
    metric_distance = db.Column(db.Float)
    speed = db.Column(db.Float)
    acceleration = db.Column(db.Float)
    distance_centroid = db.Column(db.Float)
    direction = db.Column(db.Float)

    def __init__(self, dataset_id, **kwargs):
        self.dataset_id = dataset_id
        self.position = 'POINT(' + str(kwargs['x']) + ' ' + str(kwargs['y']) + ')'
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.animal_id) + ',' + str(self.time) + \
               ',' + str(self.get_position()) + '])'

    def get_x(self):
        return to_shape(self.position).x

    def get_y(self):
        return to_shape(self.position).y

    def get_position(self):
        return [to_shape(self.position).x, to_shape(self.position).y]

    def get_movment_only_as_dict(self):
        return {
            'a': self.animal_id,
            't': self.time,
            'p': self.get_position()
        }
