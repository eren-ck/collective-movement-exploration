from sqlalchemy.orm import backref
from sqlalchemy.orm import deferred

from db import db
from model.dataset_model import Dataset
from sqlalchemy.dialects.postgresql import JSONB


class Network(db.Model):
    """
    Network data class
    """
    # db table name
    __tablename__ = 'network'

    # realtionship to dataset table
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), primary_key=True, nullable=False)
    dataset = db.relationship(Dataset, backref=backref("network", cascade="all, delete-orphan"))

    # columns
    network_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    network = deferred(db.Column(JSONB))
    metric_distance = db.Column(db.Float)
    speed = db.Column(db.Float)
    acceleration = db.Column(db.Float)
    distance_centroid = db.Column(db.Float)
    direction = db.Column(db.Float)
    euclidean_distance = db.Column(db.Float)
    finished = db.Column(db.Boolean, default=False)
    error = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(255))
    metric = db.Column(db.String(255), nullable=False, default='euclidean')
    hierarchy = deferred(db.Column(JSONB))

    def __init__(self, network_id, **kwargs):
        self.network_id = network_id
        self.network = {}
        self.hierarchy = {}
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.dataset_id) + ',' + self.name + ')'

    def as_dict(self):
        return {
            'dataset_name': self.dataset.name,
            'name': self.name,
            'finished': self.finished,
            'error': self.error,
            'status': self.status,
            'metric_distance': self.metric_distance,
            'speed': self.speed,
            'acceleration': self.acceleration,
            'distance_centroid': self.distance_centroid,
            'direction': self.direction,
            'euclidean_distance': self.euclidean_distance,
            'metric': self.metric
        }

    def as_info_dict(self):
        return {
            'name': self.name,
            'finished': self.finished,
            'network_id': self.network_id
        }

    def network_as_data_dict(self):
        return {
            'name': self.name,
            'data': self.network
        }

    def hierarchy_as_data_dict(self):
        return {
            'name': self.name,
            'hierarchy': self.hierarchy
        }