import datetime, sys
import pandas as pd
from geoalchemy2 import functions
import numpy as np
from collections import OrderedDict

from db import *
from model.dataset_model import Dataset
from model.movement_data_model import Movement_data


def calculate_absolute_features(id):
    """ Calculate the absolute features for the dataset id.
    This is using multiple processes to speed up the calculation
    It uses 5 processes - defined at pool_size = 5

    Keyword arguments:
    id -- id of the dataset

    """
    # increasing performance of these computations
    # t0 = datetime.datetime.utcnow()
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
    query = session.query(Movement_data.time, Movement_data.animal_id,
                          functions.ST_X(Movement_data.position), functions.ST_Y(Movement_data.position)) \
        .filter_by(dataset_id=id).order_by('time')
    # read into pandas frame for faster calculation
    df = pd.read_sql(query.statement, query.session.bind)
    # rename a column
    df.rename(columns={'ST_X_1': 'x', 'ST_Y_1': 'y'}, inplace=True)
    # groupby animal id for the feature extraction
    grouped_df = df.groupby(['animal_id'])
    # extract the features
    df = absolute_feature_worker_2(grouped_df, dataset[0].fps)
    # upload the dataset
    try:
        for index, row in df.iterrows():
            query = Movement_data(dataset_id=id, **OrderedDict(row))
            session.merge(query)

        # change the progress bar
        dataset[0].progress = 50
        # add the data to the database
        session.commit()

    except Exception as e:
        # Something went wrong when calculating absolute features
        print(e)
        session.rollback()
        dataset[0].status = 'Error - calculating absolute features ' + str(e)[0:200]
        dataset[0].error = True
        session.commit()
        session.remove()

    session.remove()
    # print("Performance " + str(datetime.datetime.utcnow() - t0) + " secs")


def absolute_feature_worker_2(grouped_df, fps):
    """ Calculate absolute features for one animal. This is called by a pool.

       Keyword arguments:
       grouped_df - grouped pandas table data frame
       fps - frames per second needed for e.g. speed calculation

       """
    appended_data = []
    # for key, item in grouped_df:
    for key, df in grouped_df:
        # compute metric distance
        df = calculate_metric_distance(df)
        # compute speed
        df = calculate_speed(df, fps)
        # # compute acceleration
        df = calculate_acceleration(df, fps)
        # compute direction
        df = calculate_direction(df)
        appended_data.append(df)
    appended_data = pd.concat(appended_data, axis=0)
    return appended_data


def calculate_metric_distance(df):
    """ Calculate the metric distance between two consecutive frames.

    Keyword arguments:
    df -- panda dataframe for one animal
    """
    df['metric_distance'] = np.sqrt(
        (df['x'] - df['x'].shift()) ** 2 + (df['y'] - df['y'].shift()) ** 2)
    return df.fillna(0)


def calculate_speed(df, fps):
    """
    Calculate the averaged speed of an animal

    Keyword arguments:
    df -- panda dataframe for one animal
    fps -- frames per second needed to calculate the right speed per second
    """
    df['speed'] = df['metric_distance'].rolling(min_periods=1, window=fps, center=True).mean()
    return df.fillna(0)


def calculate_acceleration(df, fps):
    """ Calculate the average Acceleration  of an animal .

    Keyword arguments:
    df -- panda dataframe for one animal
    fps -- frames per second needed to calculate the right speed per second

    """
    df['acceleration'] = df['speed'].rolling(min_periods=1, window=fps, center=True).apply(lambda x: x[1] - x[0],
                                                                                           raw=True)
    return df.fillna(0)


def calculate_direction(df):
    """ Calculate the moving direction of the animal.

    Keyword arguments:
    animal -- dataset with all time moments

    """
    df['direction'] = np.rad2deg(np.arctan2(
        (df['y'] - df['y'].shift()), (df['x'] - df['x'].shift())))
    return df.fillna(0)
