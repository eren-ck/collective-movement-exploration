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

    def __init__(self, network_id,**kwargs):
        self.network_id = network_id
        self.network = {}
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.dataset_id) + ',' + self.name + ')'
