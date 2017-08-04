import sys
import os
import numpy as np
from scipy.spatial.distance import pdist

from db import create_session

from model.network_model import Network
from model.movement_data_model import Movement_data


def calculate_network(dataset_id, network_id):
    """ Calculate the dynamic network for the dataset and the chosen weighted features

    Keyword arguments:
    id -- dataset id
    dataset_id -- id of the dataset
    network_id -- in combination with the dataset_id the primary key

    """
    # create new db session for the new spanned process
    session = create_session()

    network_model = session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id)[0]

    # numpy array of the input weights
    weights = np.array([network_model.metric_distance, network_model.speed, network_model.acceleration,
                        network_model.distance_centroid, network_model.direction, network_model.euclidean_distance,
                        network_model.euclidean_distance])

    # # get min max of all features
    min_max = {}
    # get min max from the database for the movement features
    query = '''SELECT  min(metric_distance) as min_metric_distance, max(metric_distance) as max_metric_distance,
                       min(speed) as min_speed, max(speed) as max_speed,
                       min(acceleration) as min_acceleration, max(acceleration) as max_acceleration,
                       min(distance_centroid) as min_distance_centroid, max(distance_centroid) as max_distance_centroid,
                       min(direction) as min_direction, max(direction) as max_direction,
                       min(ST_X("position")) as min_position_x, max(ST_X("position")) as max_position_x,
                       min(ST_Y("position")) as min_position_y, max(ST_Y("position")) as max_position_y
        FROM movement_data
        WHERE dataset_id = :id; '''
    tmp = session.execute(query, {'id': dataset_id})
    row = tmp.fetchone()
    keys = tmp.keys()
    # add it to the dict
    for elem in keys:
        min_max[elem] = float(row[elem])

    # get the movement data
    movement_data = session.query(Movement_data).filter_by(dataset_id=dataset_id).filter(
        Movement_data.time <= 3).order_by(Movement_data.time,
                                          Movement_data.animal_id)
    # object of  ndarray of feature vectors - e.g. {1:array[(...)], 2:array[(...)]}
    # attributes of the object are the time steps
    feature_matrices = {}
    # normalize the vectors and add them to the feature_matrices
    for elem in movement_data:
        if str(elem.time) not in feature_matrices:
            feature_matrices[str(elem.time)] = []
        v_normed = np.array([
            normalize(elem.metric_distance, min_max['min_metric_distance'], min_max['max_metric_distance']),
            normalize(elem.speed, min_max['min_speed'], min_max['max_speed']),
            normalize(elem.acceleration, min_max['min_acceleration'], min_max['max_acceleration']),
            normalize(elem.distance_centroid, min_max['min_distance_centroid'], min_max['max_distance_centroid']),
            normalize(elem.direction, min_max['min_direction'], min_max['max_direction']),
            normalize(elem.get_x(), min_max['min_position_x'], min_max['max_position_x']),
            normalize(elem.get_y(), min_max['min_position_y'], min_max['max_position_y']),
        ])
        feature_matrices[str(elem.time)].append(v_normed)

    for t in feature_matrices:
        feature_matrices[t] = np.asarray(feature_matrices[t])
        # feature_matrices[t] = pdist(feature_matrices[t], 'wminkowski', 2, weights)

    print('XXXX', file=sys.stderr)
    print(feature_matrices, file=sys.stderr)
    # create

    session.remove()


def normalize(value, min, max):
    """ Min max normalization

        Keyword arguments:
            value -- value
            min -- minimum
            max -- maximum
        """
    return (value - min) / (max - min)
