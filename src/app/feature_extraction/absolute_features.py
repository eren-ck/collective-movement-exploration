import math
import datetime, sys
import itertools
from db import *
from multiprocessing import Pool

from model.dataset_model import Dataset
from model.movement_data_model import Movement_data


def calculate_absolute_features(id):
    """ Calculate the absolute features for the dataset id.
    This is using multiple processes to speed up the calculation
    It uses 5 processes - defined at pool_size = 5

    Keyword arguments:
    id -- id of the dataset

    """
    print('Absolute features started', file=sys.stderr)
    # print(datetime.datetime.utcnow(), file=sys.stderr)

    # create new db session
    session = create_session()
    # get the dataset row from the db
    dataset = session.query(Dataset).filter_by(id=id)
    # get needed values
    dataset[0].status = 'Calculating absolute features'
    dataset[0].progress = 5
    # commit status and progress bar changes
    session.commit()

    # tmp query to get all distinct animal ids from the dataset
    tmp = session.query(Movement_data) \
        .filter_by(dataset_id=id) \
        .distinct(Movement_data.animal_id)

    # list for the distinct animal ids of the dataset
    animal_ids = []
    # save the ids in the list
    for data in tmp:
        animal_ids.append(data.animal_id)

    # progress per animal in the loop
    # this is added to the progress bar after an animal absolute features calculation are finished
    progress_per_animal = 45 / (len(animal_ids) + 1)

    # Multiprocessing
    pool_size = 5  # 5 parallel processes
    pool = Pool(pool_size)
    # call the absolute_feature_worker method with the needed parameters
    pool.map(absolute_feature_worker,
             zip((range(0, len(animal_ids))), itertools.repeat(id), itertools.repeat(animal_ids),
                 itertools.repeat(progress_per_animal), ))
    pool.close()
    # wait until all processes are finished
    pool.join()

    session.remove()
    # print('Absolute features finished', file=sys.stderr)
    # print(datetime.datetime.utcnow(), file=sys.stderr)


def absolute_feature_worker(tmp):
    """ Calculate absolute features for one animal. This is called by a pool.

    Keyword arguments:
    tmp - list of parameters
    tmp[0] - parameter i needed for animal_ids
    tmp[1] - id of the dataset
    tmp[2] - list of all animal_ids is used with parameter tmp[0]
    tmp[3] - progress_per_animal, this value is added to the progess bar after the calculation is finished

    """
    # create a new threaded db session
    session = create_session()
    # rewrite the tmp values to make it easier
    i = tmp[0]
    id = tmp[1]
    animal_ids = tmp[2]
    progress_per_animal = tmp[3]
    # get the dataset
    dataset = session.query(Dataset).filter_by(id=id)
    # needed for speed and acceleration calculation
    fps = dataset[0].fps

    # and extract the absolute features
    try:
        # query the movement data of the animal
        animal = session.query(Movement_data) \
            .filter_by(dataset_id=id, animal_id=animal_ids[i]) \
            .order_by(Movement_data.time)
        print('Animal ' + str(i), file=sys.stderr)

        # calculate the metric distance
        calculate_metric_distance(animal)
        # calculate the speed feature
        calculate_speed(animal, fps)
        # calculate the acceleration feature
        calculate_acceleration(animal, fps)
        # calculate the direction of the moving entity
        calculate_direction(animal)

        # change the progress bar
        dataset[0].progress += progress_per_animal
        # add the data to the database
        session.commit()

    except Exception as e:
        # Something went wrong when calculating absolute features
        session.rollback()
        dataset[0].status = 'Error - calculating absolute features ' + str(e)[0:200]
        dataset[0].error = True
        # session.commit()
        pass
    # remove the session
    session.remove()


def calculate_metric_distance(animal):
    """ Calculate the metric distance between the frame.

    Keyword arguments:
    animal -- dataset with all time moments

    """
    animal[0].metric_distance = 0
    number_elem = animal.count()
    for i in range(1, number_elem):
        dist = math.hypot(animal[i].get_x() - animal[i - 1].get_x(),
                          animal[i].get_y() - animal[i - 1].get_y())
        animal[i].metric_distance = dist


def calculate_speed(animal, fps):
    """
    Calculate the averaged speed of an animal
    #ToDo Change this right now in 25 frames per second calculation

    Keyword arguments:
    animal -- a animal with all frames
    fps -- frames per second needed to calculate the right speed per second

    """
    # fps divide by 2 and round down, idea is to take the first (fps/2) and the following (fps/2)
    # to calculate the averaged speed
    fps = math.floor(fps / 2) or 1
    number_elem = animal.count()
    for i in range(0, number_elem):
        sum_dist = 0
        for j in range(i - fps, i + fps + 1):
            if j >= 0 and j < number_elem:
                sum_dist = sum_dist + animal[j].metric_distance
        animal[i].speed = sum_dist


def calculate_acceleration(animal, fps):
    """ Calculate the average Acceleration  of an animal .

    Keyword arguments:
    animal -- animal with all frames
    fps -- frames per second needed to calculate the right speed per second

    """
    # fps divide by 2 and round down, idea is to take the first (fps/2) and the following (fps/2)
    # to calculate the averaged speed
    fps = math.floor(fps / 2) or 1
    number_elem = animal.count()
    for i in range(0, number_elem):
        array_speed = []
        for j in range(i - fps, i + fps + 1):
            if j >= 0 and j < number_elem:
                array_speed.append(animal[j].speed)
        sum_change = sum([array_speed[j + 1] - array_speed[j] for j in range(len(array_speed) - 1)])
        animal[i].acceleration = sum_change


def calculate_direction(animal):
    """ Calculate the moving direction of the animal.

    Keyword arguments:
    animal -- dataset with all time moments

    """
    animal[0].direction = 0
    number_elem = animal.count()
    for i in range(1, number_elem):
        angle = math.atan2((animal[i].get_y() - animal[i - 1].get_y()), (animal[i].get_x() - animal[i - 1].get_x()))

        angle = round(math.degrees(angle), 2)
        animal[i].direction = angle
