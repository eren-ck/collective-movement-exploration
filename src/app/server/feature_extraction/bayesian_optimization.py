from bayes_opt import BayesianOptimization
import numpy as np
from scipy.spatial.distance import pdist
import json
import sys
import math

from db import create_session
from model.movement_data_model import Movement_data


# movemnt data vecotr is [x,y,metric_distance,speed,acceleration,distance_centroid,direction]

def calculate_parameters(dataset_id, tracked_data):
    """
        Calculate the parameters

        :param dataset_id: id of the specific dataset
        :param tracked_data: list of objects [{time_moment: animal_id1, animalid2,...}...}
    """
    # if emtpy return nothing
    if dataset_id is None or tracked_data is None:
        return {}
    else:
        # preprocess the data and get the vectors
        data = preprocess_data(dataset_id, tracked_data)
        # if emtpy return nothing
        if not bool(data):
            return {}
        # normalize the vectors
        data = normalize_vectors(data)

        # target function
        def target(x, y, metric_distance, speed, acceleration, distance_centroid, direction):
            """
                   Calculate the weighted euclidean distance - function is optimized

                   :param 7 weights
               """
            # TODO find modular way to calculate this
            if not len(data):
                return 0
            # weights definition and variables for weighted euclidean calculation
            weights = np.array([x, y, metric_distance, speed, acceleration, distance_centroid, direction])
            metric = 'wminkowski'
            p = 2
            # check if sum of weights is zero - otherwise it will divide through 0 and throw an error
            if not weights.sum():
                return -math.inf

            # result array for each time point
            result = []
            # calculate the weighted distances between the vectors and add them to each other
            for elem in data:
                dists = pdist(np.array(elem), metric, p, weights)
                result.append(dists.sum() / weights.sum())
            # add all the distances between the frames to one value which has to be minimized
            # multiply by -1 to find the maximum minus value - library has no minimize
            return np.array(result).sum() * (-1)

        # optimize the values
        bo = BayesianOptimization(target,
                                  {'x': (0, 1),
                                   'y': (0, 1),
                                   'metric_distance': (0, 1),
                                   'speed': (0, 1),
                                   'acceleration': (0, 1),
                                   'distance_centroid': (0, 1),
                                   'direction': (0, 1),
                                   })
        # Optimize the values and catch errors
        try:
            bo.maximize(init_points=20, n_iter=10)
        except Exception as e:
            print('Error bayesian optimization ', file=sys.stderr)
            print(e, file=sys.stderr)
            pass
        # return the result
        return bo.res['max']


def preprocess_data(dataset_id, tracked_data):
    """
        Get the vectors for each time moment for each animal that was tracked

        :param dataset_id: id of the specific dataset
        :param tracked_data: list of objects [{time_moment: animal_id1, animalid2,...}...}
    """
    session = create_session()
    # selected animals object with a list with the animals for each time step
    selected_animals = {}
    try:
        # extract all the time moments
        time_moments = []
        # tmp list for conversion to object
        tmp_tracked_data = {}
        # parse the data
        for data in tracked_data:
            for key in data:
                time_moments.append(key)
                tmp_tracked_data[key] = json.loads(data[key])
        tracked_data = tmp_tracked_data

        # get the moevment dataset and filter it by time and animals
        movement_data = session.query(Movement_data).filter_by(dataset_id=dataset_id).filter(
            Movement_data.time.in_(time_moments)) \
            .order_by(Movement_data.time, Movement_data.animal_id)

        for time in time_moments:
            selected_animals[time] = []
        # get the data
        for data in movement_data:
            if data.animal_id in tracked_data[str(data.time)]:
                selected_animals[str(data.time)].append(data)

        # parse the features of each animals to a list
        tmp_selected_animals = []
        for key, data in selected_animals.items():
            tmp_animals = []
            for animal in data:
                tmp_animals.append(animal.get_data_vector())
            tmp_selected_animals.append(tmp_animals)

        # Result is 2d list with first level time moment and second animals of each time moment
        # [ [ [animal_features list ], [..] ]
        selected_animals = tmp_selected_animals

    except Exception as e:
        print('Error', file=sys.stderr)
        print(e, file=sys.stderr)
        pass

    session.remove()
    return selected_animals


def normalize_vectors(data):
    """
        normalize the vectors

        :param dataset_id: id of the specific dataset
        :param tracked_data: list of objects [{time_moment: animal_id1, animalid2,...}...}
    """
    # [x, y, metric_distance, speed, acceleration, distance_centroid, direction]
    min = []
    max = []
    # fill min and max
    for i in range(0, len(data[0][0])):
        min.append(data[0][0][i])
        max.append(data[0][0][i])
    # get min max
    for elem in data:
        for vector in elem:
            for i in range(0, len(vector)):
                if vector[i] < min[i]:
                    min[i] = vector[i]
                if vector[i] > max[i]:
                    max[i] = vector[i]

    # normalize
    for elem in data:
        for vector in elem:
            for i in range(0, len(vector)):
                vector[i] = normalize(vector[i], min[i], max[i])
    return data


def normalize(value, min, max):
    """ Min max normalization

        Keyword arguments:
            value -- value
            min -- minimum
            max -- maximum
        """
    return round((value - min) / (max - min), 3)
