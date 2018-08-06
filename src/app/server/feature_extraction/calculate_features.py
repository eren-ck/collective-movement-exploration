import csv
import os
import sys
import chardet
import codecs
from db import create_session

from model.movement_data_model import Movement_data
from model.metadata_model import Metadata
from model.group_data_model import Group_data
from model.dataset_model import Dataset
from feature_extraction.swarm_features import calculate_swarm_features
from feature_extraction.network_calculation import calculate_basic_networks

from feature_extraction.absolute_features import calculate_absolute_features


def calculate_features(id, movement_file_filename, metadata_file_filename, image_name):
    """ Calculate all features for one dataset

    Keyword arguments:
    id -- dataset id
    movement_file_filename -- movement file name needed for upload to db
    metadata_file_filename -- metadata file name needed for upload to db

    """
    # Upload the dataset
    upload_data(id, movement_file_filename, metadata_file_filename, image_name)

    # Calculate the absolute features
    # Starts multiple processes to speed up the calculation
    calculate_absolute_features(id)
    #
    # # calculate swarm features
    # calculate_swarm_features(id)
    #
    # # calculate percentiles
    # calculate_percentiles(id)
    #
    # # calculate several basic networks for each dataset automatically with the upload
    # calculate_basic_networks(id)


def upload_data(id, movement_file_filename, metadata_file_filename, image_name):
    """  Upload the movement and metadata file to the db.

    Keyword arguments:
    id -- dataset id
    movement_file_filename -- movement file name needed for upload to db
    metadata_file_filename -- metadata file name needed for upload to db

    """

    # create new db session for the new spanned process
    session = create_session()

    dataset = session.query(Dataset).filter_by(id=id)

    # set of unique time moments needed for group data creation
    group_time = set()

    ## Save the movement data into the database

    # detect encoding
    # encoding detection
    num_bytes = min(1024, os.path.getsize(movement_file_filename))
    raw = open(movement_file_filename, 'rb').read(num_bytes)
    if raw.startswith(codecs.BOM_UTF8):
        file_encoding = 'utf-8-sig'
    else:
        file_encoding = chardet.detect(raw)['encoding']

    # open the csv file
    csv_data = csv.DictReader(open(movement_file_filename, 'rU', encoding=file_encoding), delimiter=',')

    # change the headers to lowercase - make it case insensitive
    for i in range(0, len(csv_data.fieldnames)):
        csv_data.fieldnames[i] = csv_data.fieldnames[i].lower()
    # build the query
    # and extract the absolute features

    # needed to map the time moments to a sequence from 0,..,n without gaps in between the frame numbers
    csv_data = list(csv_data)
    tmp_list = []
    # get all time moments
    for row in csv_data:
        tmp_list.append(int(row['time']))

    # create a mapping to consecutive numbers
    mapping = {}
    index = 0
    for time in sorted(set(tmp_list)):
        mapping[time] = index
        index = index + 1
    # transform the frame numbers
    for row in csv_data:
        row['time'] = mapping[int(row['time'])]

    try:
        for row in csv_data:
            query = Movement_data(id, **row)
            session.merge(query)
            session.flush()
            # fill group set
            group_time.add(row['time'])
            # execute the query
        session.commit()
    except Exception as e:
        # Something went wrong when calculating absolute features
        session.rollback()
        dataset[0].status = 'Error - uploading movement file to db ' + str(e)[0:200]
        dataset[0].error = True
        pass

    if metadata_file_filename:
        ## Save the metadata file in the database
        # encoding detection
        num_bytes = min(1024, os.path.getsize(movement_file_filename))
        raw = open(movement_file_filename, 'rb').read(num_bytes)
        if raw.startswith(codecs.BOM_UTF8):
            file_encoding = 'utf-8-sig'
        else:
            file_encoding = chardet.detect(raw)['encoding']

        csv_data = csv.DictReader(open(metadata_file_filename, 'rU', encoding=file_encoding), delimiter=',')
        # change the headers to lowercase - make it case insensitive
        for i in range(0, len(csv_data.fieldnames)):
            csv_data.fieldnames[i] = csv_data.fieldnames[i].lower()

        try:
            # build the query
            for row in csv_data:
                query = Metadata(id, **row)
                session.merge(query)
                session.flush()
            # execute the query
            session.commit()
        except Exception as e:
            # Something went wrong when calculating absolute features
            session.rollback()
            dataset[0].status = 'Error - Uploading and saving reference file ' + str(e)[0:200]
            dataset[0].error = True
            pass

    # save the image path in the db
    if image_name:
        dataset[0].background = image_name

    try:
        # save the group data
        # build the query
        for elem in group_time:
            query = Group_data(id, elem)
            session.merge(query)
            session.flush()
        # execute the query
        session.commit()
    except Exception as e:
        # Something went wrong when calculating absolute features
        session.rollback()
        dataset[0].status = 'Error - creating swarm feature table ' + str(e)[0:200]
        dataset[0].error = True
        pass

    # get set values that the dataset is uploaded
    dataset[0].status = 'Dataset is uploaded - starting feature extraction'
    dataset[0].progress = 3

    session.commit()

    session.remove()
    # remove the csv files in the file system
    try:
        os.remove(movement_file_filename)
        os.remove(metadata_file_filename)
    except OSError:
        pass


def calculate_percentiles(id):
    """  Calculate the percentiles of the absolute features

    Keyword arguments:
    id -- dataset id
    """

    # create new db session for the new spanned process
    session = create_session()

    dataset = session.query(Dataset).filter_by(id=id)

    # get the one movement data record to check if the fields exists, from which the percentiles are calculated
    # needed because there are optional fields
    movement_data = session.query(Movement_data).filter_by(dataset_id=id).first().get_percentile_fields()

    percentiles = ['speed', 'acceleration', 'distance_centroid', 'midline_offset']
    try:
        # calculate the percentiles
        for elem in percentiles:
            if movement_data[elem]:
                query = '''INSERT INTO percentile (dataset_id, feature, min, percentile_1, percentile_2, percentile_3,
                percentile_4, percentile_5, percentile_6, percentile_7, percentile_8, percentile_9, max)
                SELECT 	:id,
                        :feature,
                        percentile_disc(.0) WITHIN GROUP (ORDER BY ''' + elem + ''') AS min,
                        percentile_disc(.1) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_1,
                        percentile_disc(.2) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_2,
                        percentile_disc(.3) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_3,
                        percentile_disc(.4) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_4,
                        percentile_disc(.5) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_5,
                        percentile_disc(.6) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_6,
                        percentile_disc(.7) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_7,
                        percentile_disc(.8) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_8,
                        percentile_disc(.9) WITHIN GROUP (ORDER BY ''' + elem + ''') AS percentile_9,
                        percentile_disc(1) WITHIN GROUP (ORDER BY ''' + elem + ''')  AS max
                    FROM movement_data
                    WHERE dataset_id = :id;
                '''
                session.execute(query, {'id': id, 'feature': elem})
    except Exception as e:
        # Something went wrong when calculating the percentiles
        session.rollback()
        dataset[0].status = 'Error - calculating percentiles ' + str(e)[0:200]
        dataset[0].error = True
        pass

    session.commit()
    session.remove()
