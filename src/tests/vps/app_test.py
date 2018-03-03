import csv
import random
import numpy as np
import math
import time
import sys

from scipy.spatial.distance import pdist, cdist
from scipy.cluster.hierarchy import *
from bayes_opt import BayesianOptimization

# csv file
data = []
# number of consecutive frames which are tested
number_frames = 0
# number of animals tested
number_animals = 0


def parse_csv(path):
    """ Parse the static csv file

    Keyword arguments:
    path -- path to the csv file
    """
    with open(path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        # i = 0
        for row in reader:
            if len(data) == int(row['time']):
                data.append([])
            # convert to int and add to the list
            data[int(row['time'])].append(list(map(float, [row['x'], row['y'], row['metric_distance'], row['speed'],
                                                           row['acceleration'], row['distance_centroid'],
                                                           row['direction']])))
            # i = i + 1
            # if i == 9060:
            #     break


def normalize_vectors():
    """
            normalize the vectors

            :param selected_data: vector list of selected animals
            :param unselected_data: vector list of selected animals
        """
    # [x, y, metric_distance, speed, acceleration, distance_centroid, direction]
    min = []
    max = []
    # fill min and max
    for i in range(0, len(data[0][0])):
        min.append(data[0][0][i])
        max.append(data[0][0][i])
    # get min max of selected data
    for elem in data:
        for vector in elem:
            for i in range(0, len(vector)):
                if vector[i] < min[i]:
                    min[i] = vector[i]
                if vector[i] > max[i]:
                    max[i] = vector[i]

    # normalize selected data
    for elem in data:
        for vector in elem:
            for i in range(0, len(vector)):
                vector[i] = normalize(vector[i], min[i], max[i])


def normalize(value, min, max):
    """ Min max normalization

        Keyword arguments:
            value -- value
            min -- minimum
            max -- maximum
        """
    return round((value - min) / (max - min), 3)


def quantitative_evaluation():
    """ Choose random time moments and n animals
        Cluster them with random weights
        Try to use the vps to guess the random weight variables

        Return the results of random weights, the weights suggested by function 1 and function 2
        """
    # number of time moments and number of animals for random
    num_time = len(data)
    num_animals = len(data[0])
    # random time moments from where to start
    random_time = random.randint(0, num_time - number_frames)
    # random number of selected animals for the clustering
    random_animal_ids = []
    for i in range(0, number_animals):
        temp = random.randint(0, num_animals)
        if temp not in random_animal_ids:
            random_animal_ids.append(temp)

    cluster_data = []
    # create the random array of data
    for i in range(0, number_frames):
        if random_time + i < num_time:
            cluster_data.append([])
            for j in range(0, num_animals):
                # print('First index ' + str(random_time + i))
                # print('Second index ' + str(j))
                if j in random_animal_ids:
                    cluster_data[i].append(data[random_time + i][j])

    # random weight vector used for the ward clustering
    # [x, y, metric_distance, speed, acceleration, distance_centroid, direction]
    random_weights = []
    for i in range(0, 7):
        random_weights.append(random.uniform(0, 1))
    random_weights = np.array(random_weights)

    # ward clustering
    hclust = []
    for i in range(0, number_frames):
        # calculate the condensed distance matrix with the weights
        dist_matrix = pdist(np.array(cluster_data[i]), 'wminkowski', 2, random_weights)
        hclust.append(fcluster(ward(dist_matrix), 2, criterion='maxclust'))

    # second level of clustering - left and right node of the hiearchy
    left_hclust = []
    right_hclust = []
    for i in range(0, number_frames):
        left_hclust.append([])
        right_hclust.append([])
        for j in range(0, len(cluster_data[i])):
            if hclust[i][j] == 1:
                left_hclust[i].append(cluster_data[i][j])
            else:
                right_hclust[i].append(cluster_data[i][j])

    ##
    ## function 1
    ##
    t = time.process_time()
    f1_weights = calculate_parameters_f1(left_hclust)['max_params']
    f1_elapsed_time = time.process_time() - t

    f1_weights = np.array([f1_weights['x'], f1_weights['y'], f1_weights['metric_distance'], f1_weights['speed'],
                           f1_weights['acceleration'], f1_weights['distance_centroid'], f1_weights['direction']])

    f1_hclust = []
    f1_dist = 0
    for i in range(0, number_frames):
        # calculate the condensed distance matrix with the weights
        dist_matrix = pdist(np.array(cluster_data[i]), 'wminkowski', 2, f1_weights)
        f1_hclust.append(fcluster(ward(dist_matrix), 2, criterion='maxclust'))
        f1_dist = f1_dist + np.absolute(hclust[i] - f1_hclust[i]).sum()

    ##
    ## function 2
    ##
    t = time.process_time()
    f2_weights = calculate_parameters_f2(left_hclust, right_hclust)['max_params']
    f2_elapsed_time = time.process_time() - t

    f2_weights = np.array([f2_weights['x'], f2_weights['y'], f2_weights['metric_distance'], f2_weights['speed'],
                           f2_weights['acceleration'], f2_weights['distance_centroid'], f2_weights['direction']])

    f2_hclust = []
    f2_dist = 0
    for i in range(0, number_frames):
        # calculate the condensed distance matrix with the weights
        dist_matrix = pdist(np.array(cluster_data[i]), 'wminkowski', 2, f2_weights)
        f2_hclust.append(fcluster(ward(dist_matrix), 2, criterion='maxclust'))
        f2_dist = f2_dist + np.absolute(hclust[i] - f2_hclust[i]).sum()

    ##
    ## random guess for weights
    ##
    random_weights_guess = []
    for i in range(0, 7):
        random_weights_guess.append(random.uniform(0, 1))
    random_weights_guess = np.array(random_weights_guess)

    ran_hclust = []
    ran_dist = 0
    for i in range(0, number_frames):
        # calculate the condensed distance matrix with the weights
        dist_matrix = pdist(np.array(cluster_data[i]), 'wminkowski', 2, random_weights_guess)
        ran_hclust.append(fcluster(ward(dist_matrix), 2, criterion='maxclust'))
        ran_dist = ran_dist + np.absolute(hclust[i] - ran_hclust[i]).sum()

    return (f1_dist, f1_elapsed_time, f2_dist, f2_elapsed_time, ran_dist)


def calculate_parameters_f1(data):
    """
        Calculate the parameters first function
    """

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
        # use sklearn's default parameters for theta and random_start
        bo.maximize(init_points=20, n_iter=20)
    except Exception as e:
        print(e)
        pass
    # return the result
    return bo.res['max']


def calculate_parameters_f2(selected_data, unselected_data):
    """
        Calculate the parameters second function
    """

    # target function
    def target(x, y, metric_distance, speed, acceleration, distance_centroid, direction):
        """
               Calculate the weighted euclidean distance - function is optimized

               :param 7 weights
           """
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
        for i in range(0, len(selected_data)):
            # calculate the weighted distance between each selected animal and than the sum of the matrix
            selected_dists = pdist(np.array(selected_data[i]), metric, p, weights).sum()
            # normalize the proportion between selected and unselected animals
            selected_dists = (len(selected_data[i]) / (
                    len(selected_data[i]) + len(unselected_data[i]))) * selected_dists

            # calculate the weighted distance between each selected animal and unselected animal and than the sum of the matrix
            dists = cdist(np.array(selected_data[i]), np.array(unselected_data[i]), metric, p=p, w=weights).sum()
            dists = (len(unselected_data[i]) / (
                    len(selected_data[i]) + len(unselected_data[i]))) * dists

            result.append(selected_dists / dists)

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
        # use sklearn's default parameters for theta and random_start
        bo.maximize(init_points=20, n_iter=20)
    except Exception as e:
        print(e)
        pass
    # return the result
    return bo.res['max']


if __name__ == '__main__':
    # parse the data
    parse_csv('./data/GoldenShiner.csv')
    normalize_vectors()

    # test n times and write to output file
    n = 15

    number_frames_list = [1, 5, 10, 25, 25]
    number_animals_list = [5, 10, 25, 50]
    for frame in number_frames_list:
        number_frames = frame

        for animals in number_animals_list:
            number_animals = animals

            with open('output_' + str(number_frames) + '_' + str(number_animals) + '.txt', 'w') as f:
                f.write(
                    'random_weights, random_time,  suggested_f1, suggested_f1_time, suggested_f2, suggested_f2_time\n')
                f.flush()
                for i in range(0, n):
                    # return random results for one time
                    f1_dist, f1_elapsed_time, f2_dist, f2_elapsed_time, ran_dist = quantitative_evaluation()
                    f.write(str(ran_dist) + ', 0, ' + str(f1_dist) + ', ' + str(f1_elapsed_time) + ', ' + str(
                        f2_dist) + ', ' + str(f2_elapsed_time) + '\n')
                    f.flush()
