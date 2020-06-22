from sqlalchemy.orm import backref
from sqlalchemy.orm import deferred

from db import db
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from model.dataset_model import Dataset


class Group_data(db.Model):
    """
    Group data class
    """
    # db table name
    __tablename__ = 'group_data'

    # relationship to dataset table
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), primary_key=True, nullable=False)
    dataset = db.relationship(Dataset, backref=backref("group_data", cascade="all, delete-orphan"))

    # columns
    time = db.Column(db.Integer, primary_key=True, nullable=False)
    centroid = db.Column(Geometry('POINT'))
    direction = db.Column(db.Numeric)
    medoid = db.Column(db.Integer)
    speed = db.Column(db.Numeric)
    metric_distance = db.Column(db.Numeric)
    distance_centroid = db.Column(db.Numeric)
    polarisation = db.Column(db.Numeric)
    acceleration = db.Column(db.Numeric)
    convex_hull_area = db.Column(db.Numeric)
    convex_hull = deferred(db.Column(Geometry('Geometry')))
    delaunay_triangulation = (db.Column(Geometry('MultiLineString')))
    voronoi_polygons = deferred(db.Column(Geometry('GeometryCollection')))

    def __init__(self, dataset_id, **kwargs):
        self.dataset_id = dataset_id
        self.__dict__.update(kwargs)

    def __repr__(self):
        return '(' + str(self.time) + ')'

    def get_centroid_x(self):
        return to_shape(self.centroid).x

    def get_centroid_y(self):
        return to_shape(self.centroid).y
