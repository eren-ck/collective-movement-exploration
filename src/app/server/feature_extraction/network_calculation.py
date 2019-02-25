import sys
import os
import pandas as pd
from geoalchemy2 import functions
import numpy as np
from scipy.spatial.distance import pdist, squareform
from scipy.cluster.hierarchy import ward, to_tree
from sklearn.preprocessing import MinMaxScaler
import json
from functools import reduce
from multiprocessing import Pool, cpu_count
import time

from db import create_session

from model.network_model import Network
from model.movement_data_model import Movement_data

# max number of network edges per frame
CONST_NETWORK_EDGES = 500


def calculate_network(dataset_id, network_id):
    """ Calculate the dynamic network for the dataset and the chosen weighted features

    Keyword arguments:
    dataset_id -- id of the dataset
    network_id -- in combination with the dataset_id the primary key
    """
    start = time.time()
    # create new db session for the new spanned process
    session = create_session()
    try:
        network_model = session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id).first()

        # numpy array of the input weights
        weights = np.array([network_model.metric_distance, network_model.speed, network_model.acceleration,
                            network_model.distance_centroid, network_model.direction, network_model.euclidean_distance,
                            network_model.euclidean_distance])

        # new way to compute the distance matrix
        # get the movement data
        query = session.query(Movement_data.time, Movement_data.animal_id, Movement_data.metric_distance,
                              Movement_data.speed, Movement_data.acceleration, Movement_data.distance_centroid,
                              Movement_data.direction,
                              functions.ST_X(Movement_data.position), functions.ST_Y(Movement_data.position)) \
            .filter_by(dataset_id=dataset_id).order_by('time', 'animal_id')

        # read into pandas frame for faster calculation
        df = pd.read_sql(query.statement, query.session.bind)
        df.rename(columns={'ST_X_1': 'x', 'ST_Y_1': 'y'}, inplace=True)
        # normalize the columns
        scaler = MinMaxScaler()
        df[['metric_distance', 'speed', 'acceleration', 'distance_centroid', 'direction', 'x',
            'y']] = scaler.fit_transform(
            df[['metric_distance', 'speed', 'acceleration', 'distance_centroid', 'direction', 'x',
                'y']])

        # group by time for the network computation for each time frame
        grouped_df = df.groupby(['time'])  # .apply(lambda g: pd.Series(distance.pdist(g), index=["D1", "D2", "D3"]))
        # compute network and hierarhcy
        two_result = applyParallel(grouped_df, weights)

        result_network = two_result[0]
        result_hclust = two_result[1]

        # save the results in the database
        network_model.network = json.dumps(result_network)
        network_model.hierarchy = json.dumps(result_hclust, separators=(',', ':'))
        network_model.finished = True
        session.commit()
    except Exception as e:
        # Something went wrong while calculating the network
        print('Error - ' + str(e)[0:200])
        session.rollback()
        network_model.status = 'Error - ' + str(e)[0:200]
        network_model.error = True
        session.commit()
        session.remove()

    session.remove()
    end = time.time()
    print(end - start)


def applyParallel(dfGrouped, weights):
    """ Multiprocessed function

    Keyword arguments:
    dfGrouped -- grouped dataframe
    weights -- dataframe weights
    """
    with Pool(cpu_count()) as p:
        ret_list = p.map(network_computation, [[group, weights] for key, group in dfGrouped])
    result_network = {}
    result_hclust = {}
    for d in ret_list:
        result_network[d['time']] = d['network']
        result_hclust[d['time']] = d['hierarchy']
    return [result_network, result_hclust]


def network_computation(data):
    """ Compute the network and hierarchy

    Keyword arguments:
    data -- list of two element a dataframe and the weight data frame
    """
    df = data[0]
    weights = data[1]
    result = {}
    result['time'] = df.iloc[0, 0].item()

    df.set_index('animal_id', inplace=True)
    # remove the time column - this is stored in key
    df.drop('time', 1, inplace=True)
    # compute the pairwise distance - weighted euclidean distance
    dist = pdist(df, 'wminkowski', p=2, w=weights)
    if dist.size != 0:
        # transform into squared matrix
        network_df = pd.DataFrame(squareform(dist), index=df.index, columns=df.index)
        # rename column and index name needed - for duplicate error warning
        network_df.columns.name = None
        network_df.index.name = None
        # get the upper triangular matrix of the pandas dataframe
        network_df = network_df.where(np.triu(np.ones(network_df.shape)).astype(np.bool))
        network_df = network_df.stack().reset_index()
        # start end value
        network_df.columns = ['s', 'e', 'v']
        # remove rows with the value zero
        network_df = network_df[network_df.v != 0]
        # sort and pick the n smallest values
        network_df = network_df.nsmallest(CONST_NETWORK_EDGES, 'v')
        # filtered network round
        result['network'] = network_df.round({'v': 4}).to_dict('records')
        # ** Hierarchy
        # hierarchical clustering (ward clustering)
        hierarchy = hierarchical_clustering(dist, df.index.tolist())
        result['hierarchy'] = hierarchy
    return result


def hierarchical_clustering(data, labels):
    """
        Return the hierarchical clustering encoded as a linkage matrix
        Perform Ward’s linkage on a condensed distance matrix.

        :param data: condensed matrix
        :param labels:  labels
    """
    # args
    # cluster and transform to a tree object
    clusters = ward(data)
    tree = to_tree(clusters, rd=False)

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

    return dendro


def calculate_basic_networks(dataset_id):
    """ Calculate a few basic networks for a uploaded dataset

        Keyword arguments:
            dataset_id -- id of the dataset
        """
    # create new db session for the new spanned process
    session = create_session()

    # network  0 - euclidean distance
    try:
        # arguments for network
        network0_args = {'dataset_id': dataset_id,
                         'name': 'euclidean dist',
                         'metric_distance': 0,
                         'speed': 0,
                         'acceleration': 0,
                         'distance_centroid': 0,
                         'direction': 0,
                         'euclidean_distance': 1,
                         }
        # create and commit the network
        network0_model = Network(0, **network0_args)
        session.add(network0_model)
        session.commit()
        # calculate the network and the hierarhcy
        calculate_network(dataset_id, 0)
        session.commit()
    except Exception as e:
        # Something went wrong while calculating the network
        session.rollback()
        network0_model.status = 'Error - ' + str(e)[0:200]
        network0_model.error = True
        session.commit()
        pass

    # network  1 - speed direction
    try:
        # arguments for network
        network1_args = {'dataset_id': dataset_id,
                         'name': 'speed direction',
                         'metric_distance': 1,
                         'speed': 1,
                         'acceleration': 1,
                         'distance_centroid': 0,
                         'direction': 1,
                         'euclidean_distance': 0,
                         }
        # create and commit the network
        network1_model = Network(1, **network1_args)
        session.add(network1_model)
        session.commit()
        # calculate the network and the hierarhcy
        calculate_network(dataset_id, 1)
        session.commit()
    except Exception as e:
        # Something went wrong while calculating the network
        session.rollback()
        network1_model.status = 'Error - ' + str(e)[0:200]
        network1_model.error = True
        session.commit()
        pass

    # network  2 - distance - direction
    try:
        # arguments for network
        network2_args = {'dataset_id': dataset_id,
                         'name': 'distance direction',
                         'metric_distance': 0,
                         'speed': 0,
                         'acceleration': 0,
                         'distance_centroid': 1,
                         'direction': 1,
                         'euclidean_distance': 1,
                         }
        # create and commit the network
        network2_model = Network(2, **network2_args)
        session.add(network2_model)
        session.commit()
        # calculate the network and the hierarhcy
        calculate_network(dataset_id, 2)
        session.commit()
    except Exception as e:
        # Something went wrong while calculating the network
        session.rollback()
        network2_model.status = 'Error - ' + str(e)[0:200]
        network2_model.error = True
        session.commit()
        pass

    session.remove()

    return
