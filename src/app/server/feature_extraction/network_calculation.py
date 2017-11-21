import sys
import os
import numpy as np
from scipy.spatial.distance import pdist
from scipy.cluster.hierarchy import ward, to_tree
import multiprocessing as mp
import json
from functools import reduce

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

    try:
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
        movement_data = session.query(Movement_data).filter_by(dataset_id=dataset_id) \
            .order_by(Movement_data.time, Movement_data.animal_id)
        # get the unique animal ids from the dataset needed for the labeling of the hierarchy
        animal_ids = session.query(Movement_data.animal_id).filter_by(dataset_id=dataset_id) \
            .order_by(Movement_data.animal_id).distinct()
        animal_ids = [d[0] for d in animal_ids]
        labels = dict(zip(range(len(animal_ids)), animal_ids))

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

        ### Multiprocessing
        pool_size = 10  # 5 parallel processes
        # create the pool
        pool = mp.Pool(pool_size)
        # pack the input arguments together
        arglist = [[i, feature_matrices, 'wminkowski', 2, weights] for i in feature_matrices.keys()]
        # start the calculation function for each time step
        results = pool.map(distance_calculation, arglist)

        # hierarchical clustering (ward clustering)
        arglist = [[d, labels] for d in results]
        result_hclust = pool.map(hierarchical_clustering, arglist)

        pool.close()
        # wait until all processes are finished
        pool.join()
        #

        # convert the results in a format which can be converted to json
        tmp = {}
        for res in results:
            for t in res:
                tmp[t] = res[t].round(2).tolist()
        results = tmp

        # convert the hierarchical clustering in a form which can be converted to json
        tmp = {}
        for data in result_hclust:
            for key, value in data.items():
                tmp[key] = value;

        result_hclust = tmp;

        # save the results in the database
        network_model.network = json.dumps(results)
        network_model.hierarchy = json.dumps(result_hclust, separators=(',', ':'))
        network_model.finished = True
        session.commit()
    except Exception as e:
        # Something went wrong while calculating the network
        session.rollback()
        network_model.status = 'Error - ' + str(e)[0:200]
        network_model.error = True
        session.commit()
        pass

    session.remove()


def distance_calculation(args):
    """
        Return the pairwise distance between the observations in the n-dimensional space

        :param id:
            args: (["index","feature_matrix","metric","p-norm","weight vector"]
    """
    # return squareform(pdist(X, metric, p, w))
    i, X, metric, p, w = args
    return {i: pdist(X[i], metric, p, w)}


def hierarchical_clustering(args):
    """
        Return the hierarchical clustering encoded as a linkage matrix
        Perform Ward’s linkage on a condensed distance matrix.

        :param args: ([{time:condensed matrix}, labels])
    """
    # args
    data, labels = args
    time = -1
    # cluster and transform to a tree object
    for key, value in data.items():
        clusters = ward(value)
        tree = to_tree(clusters, rd=False)
        time = key

    def add_node(node, parent):
        """
            Create a nested dictionary from the ClusterNode's returned by SciPy
        """
        # First create the new node and append it to its parent's children
        newNode = dict(node_id=node.id, children=[])
        parent['children'].append(newNode)

        # Recursively add the current node's children
        if node.left:
            add_node(node.left, newNode)
        if node.right:
            add_node(node.right, newNode)

    # Label each node with the names of each leaf in its subtree
    def label_tree(n):
        # If the node is a leaf, then we have its name
        if len(n['children']) == 0:
            leafNames = [labels[n['node_id']]]

        # If not, flatten all the leaves in the node's subtree
        else:
            leafNames = reduce(lambda ls, c: ls + label_tree(c), n['children'], [])

        # Delete the node id since we don't need it anymore and
        # it makes for cleaner JSON
        del n['node_id']

        # Labeling convention: "-"-separated leaf names
        n['name'] = sorted(leafNames)

        return leafNames

    # parse the scipy tree structure to a json tree structure
    dendro = dict(children=[], name='Root')
    add_node(tree, dendro)

    # label the leafs of the tree
    label_tree(dendro['children'][0])

    return {time: dendro}


def normalize(value, min, max):
    """ Min max normalization

        Keyword arguments:
            value -- value
            min -- minimum
            max -- maximum
        """
    return (value - min) / (max - min)
