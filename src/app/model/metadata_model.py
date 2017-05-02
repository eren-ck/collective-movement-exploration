from sqlalchemy.orm import backref

from db import db
from model.dataset_model import Dataset


class Metadata(db.Model):
    """
    Metadata data class
    """
    # db table name
    __tablename__ = 'metadata'

    # realtionship to dataset table
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), primary_key=True, nullable=False)
    dataset = db.relationship(Dataset, backref=backref("metadata", cascade="all, delete-orphan"))

    # columns
    animal_id = db.Column(db.Integer, primary_key=True, nullable=False)
    species = db.Column(db.String(255), nullable=False)
    sex = db.Column(db.String(255), nullable=False)
    size = db.Column(db.Float())
    weight = db.Column(db.Float())

    def __init__(self, dataset_id, **kwargs):
        self.dataset_id = dataset_id
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.animal_id) + ',' + self.species + \
               ',' + self.sex + ')'

    def as_dict(self):
        return {
            'animal_id': self.animal_id,
            'species': self.species,
            'sex': self.sex,
            'size': self.size,
            'weight': self.weight
        }