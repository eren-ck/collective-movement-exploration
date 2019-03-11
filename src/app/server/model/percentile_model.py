from sqlalchemy.orm import backref

from db import db
from model.dataset_model import Dataset


class Percentile(db.Model):
    """
    Percentile data class
    """
    # db table name
    __tablename__ = 'percentile'

    # realtionship to dataset table
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), primary_key=True, nullable=False)
    dataset = db.relationship(Dataset, backref=backref("percentile", cascade="all, delete-orphan"))

    # columns
    feature = db.Column(db.Text, primary_key=True, nullable=False)
    min = db.Column(db.Float)
    percentile_1 = db.Column(db.Float)
    percentile_2 = db.Column(db.Float)
    percentile_3 = db.Column(db.Float)
    percentile_4 = db.Column(db.Float)
    percentile_5 = db.Column(db.Float)
    percentile_6 = db.Column(db.Float)
    percentile_7 = db.Column(db.Float)
    percentile_8 = db.Column(db.Float)
    percentile_9 = db.Column(db.Float)
    max = db.Column(db.Float)

    def __init__(self, dataset_id, **kwargs):
        self.dataset_id = dataset_id
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.dataset_id) + ',' + self.feature + ')'

    def as_dict(self):
        return {
            'feature': self.feature,
            'min': self.min,
            'p1': self.percentile_1,
            'p2': self.percentile_2,
            'p3': self.percentile_3,
            'p4': self.percentile_4,
            'p5': self.percentile_5,
            'p6': self.percentile_6,
            'p7': self.percentile_7,
            'p8': self.percentile_8,
            'p9': self.percentile_9,
            'max': self.max,
        }
