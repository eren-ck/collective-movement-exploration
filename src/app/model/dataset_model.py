from db import db
from geoalchemy2 import Geometry
import geojson
from geoalchemy2.shape import to_shape


class Dataset(db.Model):
    """
    Metadata data class
    """
    __tablename__ = 'dataset'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    coordinate_origin = db.Column(Geometry('POINT'), nullable=False)
    min = db.Column(Geometry('POINT'), nullable=False)
    max = db.Column(Geometry('POINT'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    progress = db.Column(db.Integer, nullable=False)
    inverted = db.Column(db.Boolean)
    status = db.Column(db.String(255))
    error = db.Column(db.Boolean)
    fps = db.Column(db.Integer, nullable=False)
    background = db.Column(db.String(255))

    def __init__(self, form, user_id):
        self.name = form.name.data
        self.coordinate_origin = 'POINT(' + str(form.origin_x.data) + ' ' + str(form.origin_y.data) + ')'
        self.min = 'POINT(' + str(form.min_x.data) + ' ' + str(form.min_y.data) + ')'
        self.max = 'POINT(' + str(form.max_x.data) + ' ' + str(form.max_y.data) + ')'
        self.user_id = user_id
        self.progress = 0
        self.inverted = form.inverted.data
        self.status = 'Loading into database'
        self.error = False
        self.background = ''
        # fps check
        if form.fps.data <= 0:
            self.fps = 1
        else:
            self.fps = form.fps.data

    def __repr__(self):
        return '<Dataset %r>' % (self.name)

    def as_dict(self):
        return {
            'name': self.name,
            'user_id': self.id,
            'progress': self.progress,
            'status': self.status,
            'error': self.error,
            'id': self.id,
            'coordinate_origin': geojson.Feature(geometry=(to_shape(self.coordinate_origin)), properties={}),
            'min': geojson.Feature(geometry=(to_shape(self.min)), properties={}),
            'max': geojson.Feature(geometry=(to_shape(self.max)), properties={}),
            'inverted': self.inverted,
            'fps': self.fps,
            'background_image': self.background
        }
