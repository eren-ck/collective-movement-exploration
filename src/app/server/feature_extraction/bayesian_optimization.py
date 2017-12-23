from bayes_opt import BayesianOptimization
import numpy as np
import json
import sys

from db import create_session
from model.movement_data_model import Movement_data


# movemnt data get vecotr is  [x,y,metric_distance,speed,acceleration,distance_centroid,direction]

def calculate_parameters(dataset_id, tracked_data):
    if dataset_id is None or tracked_data is None:
        return {}
    else:
        data = preprocess_data(dataset_id, tracked_data)
        if bool(data) == False:
            return {}

        return {'aaaa': 'aaaa'}


def target(x):
    return x
    # return np.exp(-(x - 2) ** 2) + np.exp(-(x - 6) ** 2 / 10) + 1 / (x ** 2 + 1)


def preprocess_data(dataset_id, tracked_data):
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
