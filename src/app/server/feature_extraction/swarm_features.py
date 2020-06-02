from model.dataset_model import Dataset
from model.group_data_model import Group_data
from model.movement_data_model import Movement_data
from db import create_session
from functools import reduce

from geoalchemy2 import functions
import pandas as pd
import numpy as np
import movekit as mkit
from collections import OrderedDict


def calculate_swarm_features(id):
    """ Calculate swarm features

    Keyword arguments:
    id -- dataset id

    """
    # create a new threaded database session
    session = create_session()
    # Query the dataset with the id
    dataset = session.query(Dataset).filter_by(id=id)
    dataset[0].status = 'Calculating swarm features'
    dataset[0].progress = 50
    session.commit()

    # for every animal get the movement data
    # and extrat the absolute features
    try:
                # calculate the centroid
        calculate_centroid(id, session)
        # calculate the convex hull area
        calculate_convex_hull(id, session)
        # calculate convex hull area
        calculate_convex_hull_area(id, session)
        # calculate delaunay triangulation
        calculate_delaunay_triangulation(id, session)
        # calculate voronoi diagram
        calculate_voronoi_diagram(id, session)

        calculate_mkit_feats(id, session)
        # complete
        dataset[0].status = 'Complete'
        dataset[0].progress = 100
    except Exception as e:
        # Something went wrong when calculating swarm features
        session.rollback()
        dataset[0].status = 'Error - calculating swarm features: ' + str(e)[0:200]
        dataset[0].error = True
        session.commit()
        session.remove()
    # commit the changes
    session.commit()

    # remove the session
    session.remove()


def calculate_centroid(id, session):
    """ Calculate the centroid of the animal group
    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = '''UPDATE   group_data
                SET 	centroid =  subquery.geom
                FROM ( SELECT "time", ST_Centroid(ST_Collect(position)) AS geom
                                        FROM movement_data
                                        WHERE dataset_id = :id
                                        GROUP BY "time") AS subquery
                WHERE   group_data.time = subquery.time
                        AND group_data.dataset_id = :id;'''
    session.execute(query, {'id': id})


def calculate_convex_hull(id, session):
    """ Calculate the convex hull of the animal group
    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = '''UPDATE group_data
                SET 	convex_hull = subquery.geom
                FROM (  SELECT "time", ST_ConvexHull(ST_Collect(position)) AS geom
                        FROM movement_data
                        WHERE dataset_id = :id
                        GROUP BY "time") AS subquery
                WHERE  group_data.time = subquery.time
                    AND group_data.dataset_id = :id; '''
    session.execute(query, {'id': id})


def calculate_convex_hull_area(id, session):
    """ Calculate the convex hull area of the animal group
    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = '''UPDATE group_data
                SET 	convex_hull_area = subquery.area
                FROM (  SELECT "time", ST_Area(convex_hull) AS area
                        FROM group_data
                        WHERE dataset_id = :id) AS subquery
                WHERE  group_data.time = subquery.time
                    AND group_data.dataset_id = :id; '''
    session.execute(query, {'id': id})


def calculate_delaunay_triangulation(id, session):
    """ Calculate the delaunay triangulation of the animal group
    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = '''UPDATE group_data
                SET 	delaunay_triangulation = subquery.geom
                FROM (  SELECT "time", ST_DelaunayTriangles(ST_Collect(position),0,1) AS geom
                        FROM movement_data
                        WHERE dataset_id = :id
                        GROUP BY "time") AS subquery
                WHERE  group_data.time = subquery.time
                    AND group_data.dataset_id = :id; '''
    session.execute(query, {'id': id})


def calculate_voronoi_diagram(id, session):
    """ Calculate the voronoi diagram of the animal group
    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = '''
                UPDATE
                    group_data
                SET 	voronoi_polygons = subquery.geom
                FROM (  SELECT "time", ST_VoronoiPolygons(ST_Collect(position)) AS geom
                        FROM movement_data
                        WHERE dataset_id = :id
                        GROUP BY "time") AS subquery
                WHERE  group_data.time = subquery.time
                    AND group_data.dataset_id = :id; '''
    session.execute(query, {'id': id})


def calculate_mkit_feats(id, session):

    """ Calculate all remaining features, including: mean speed/acceleration, centroid-direction, mean-dist centroid, polarization,

    Keyword arguments:
    id - id of the dataset
    session - db session
    """
    query = session.query(Movement_data.time,
                          Movement_data.animal_id,
                          Movement_data.direction,
                          functions.ST_X(Movement_data.position),
                          functions.ST_Y(Movement_data.position)) \
        .filter_by(dataset_id=id).order_by('time')
    # read into pandas frame for faster calculation
    df = pd.read_sql(query.statement, query.session.bind)
    df.rename(columns={'ST_X_1': 'x', 'ST_Y_1': 'y'}, inplace=True)


    # calculate the distance to centroid store in movement data
    # calculate the centroids and medoids, store in group data
    movement = mkit.centroid_medoid_computation(df)

    group = movement.loc[movement.animal_id == list(set(movement.animal_id))[0], ['time', 'x_centroid', 'y_centroid', 'medoid']].reset_index(drop=True)


    # compute polarization, store in group data
    pol = mkit.compute_polarization(df, group_output = True).fillna(0)

    # compute mean speed, acceleration and mean distance to centroid, store in group data
    mov = mkit.group_movement(movement).fillna(0)

    # compute centroid direction, store in group_data
    cen_dir = mkit.compute_centroid_direction(movement, group_output = True).fillna(0)



    data_frames = [group, pol, mov, cen_dir]
    group = reduce(lambda  left,right: pd.merge(left,right,on=['time'],
                                                how='outer'), data_frames)


    movement = movement.drop(columns = ["x_centroid", "y_centroid", "medoid", "x", "y"])
    movement = movement.rename(columns = {'distance_to_centroid':'distance_centroid'})
    for index, row in movement.iterrows():
        query = Group_data(dataset_id=id, **OrderedDict(row))
        session.merge(query)

    session.commit()



    group = group.drop(columns = ["x_centroid", "y_centroid"])
    group = group.rename(columns = {'mean_distance_centroid':'distance_centroid','centroid_direction':'direction','mean_speed':'speed','mean_acceleration':'acceleration','mean_distance_centroid':'distance_centroid', 'total_dist': 'metric_distance', 'polarization': 'polarisation'})

    query = session.query(Group_data.time, Group_data.polarisation).filter_by(dataset_id=id).order_by('time')
    # read into pandas frame for faster calculation
    df = pd.read_sql(query.statement, query.session.bind)

    df = group

    # Extracting the features via mkit

    for index, row in group.iterrows():
        query = Group_data(dataset_id=id, **OrderedDict(row))
        session.merge(query)

    # change the progress bar
    # add the data to the database
    session.commit()


    #group_dat = Group_data.query.get(2)

    #print(group_dat)
    # commit
    #session.commit()
