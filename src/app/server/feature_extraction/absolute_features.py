import datetime, sys
import pandas as pd
from geoalchemy2 import functions
import numpy as np
from collections import OrderedDict

from db import *
from model.dataset_model import Dataset
from model.movement_data_model import Movement_data
import movekit as mkit


def calculate_absolute_features(id):
    """ Calculate the absolute features for the dataset id.

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

    # Extracting the features via mkit
    df = mkit.extract_features(df, dataset[0].fps).sort_values(['animal_id', 'time'])
    df = df.drop(columns = ['stopped'])
    df = df.rename(columns = {'distance':'metric_distance', 'average_speed':'speed', 'average_acceleration':'acceleration'})

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

