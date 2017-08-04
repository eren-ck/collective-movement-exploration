from sqlalchemy.orm import backref

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
    network = db.Column(JSONB)
    metric_distance = db.Column(db.Float)
    speed = db.Column(db.Float)
    acceleration = db.Column(db.Float)
    distance_centroid = db.Column(db.Float)
    direction = db.Column(db.Float)
    euclidean_distance = db.Column(db.Float)
    finished = db.Column(db.Boolean, default=False)
    error = db.Column(db.Boolean, default=False)

    def __init__(self, network_id, **kwargs):
        self.network_id = network_id
        self.network = {}
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.dataset_id) + ',' + self.name + ')'

    def as_dict(self):
        return {
            'dataset_name': self.dataset.name,
            'name': self.name,
            'finished': self.finished,
            'error': self.error,
            'metric_distance': self.metric_distance,
            'speed': self.speed,
            'acceleration': self.acceleration,
            'distance_centroid': self.distance_centroid,
            'direction': self.direction,
            'euclidean_distance': self.euclidean_distance
        }
