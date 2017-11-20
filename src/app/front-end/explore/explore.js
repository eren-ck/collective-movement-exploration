/*eslint-disable no-unused-lets*/
/*global window, $ */
// import all js
import * as queries from './ajax_queries.js';
import {
    spatialViewInit
} from './spatial_view/spatial_view.js';

import {
    initializeMetaddata
} from './metadata.js';

// import css
import './explore.css';

export let dataset = []; // main dataset with values for each individual animal
export let datasetMetadata = []; // metadataset for each individual fish
export let swarmData = []; // swarmdata for linechart and also other swarm features
export let dataSetPercentile = {}; // pecentiles needed for the color mapping
export let networkData = {}; // network data
export let networkHierarchy = {}; // network data



/**
 * Get the basic data to get the tool running.
 * after the pending ajax queries are finished
 * the tool is drawn
 */
$(document).ready(function() {
    // console.log(parameters);

    // get the movement data
    queries.streamMovementData();

    // get the dataSetPercentile
    queries.getPercentile();

    // get the swarm features for the line chart
    queries.getSwarmFeatures();

    // get the metadata and initialize the metada window
    queries.getMetaData();

    // get the information if there are already networks created for this dastaset
    queries.getNetworkDataButton();

    // if all ajax queries are compelte initialize
    (function() {
        function checkPendingRequest() {
            if ($.active > 0) {
                window.setTimeout(checkPendingRequest, 100);
            } else {
                spatialViewInit();
            }
        }
        window.setTimeout(checkPendingRequest, 100);
    })();

});

/************************************************
    Getter and setter
 *************************************************/

/**
 * Concact to the main dataset
 * the idea is to use this one day for lazy loading
 * @param {array} value - array of movement datasets
 */
export function addToDataset(value) {
    dataset = dataset.concat(value);
}

/**
 * Set dataset percentile
 * @param {array} value - array of arrarys
 */
export function setDataSetPercentile(value) {
    dataSetPercentile = value;
}

/**
 * Set dataset metadata
 * @param {array} value - array
 */
export function setMetaData(value) {
    datasetMetadata = value;
    // initialize the metadata modal
    initializeMetaddata();
}

/**
 * Add a new feature dimension to the swarm dataset
 * @param {array} data - Array of swarm values consisting of [feature_0,feature_1,...]
 * @param {string} feature - string array of the feature
 */
export function setSwarmData(data, feature) {
    for (let i = 0; i < data.length; i++) {

        // add the the object to the array if there is no element yet
        if (typeof swarmData[i] === 'undefined') {
            swarmData.push({});
        }

        // check if integer or float
        if (data[i] && !(isNaN(data[i]))) {
            swarmData[i][feature] = +data[i];
        } else {
            // is string
            swarmData[i][feature] = data[i];
        }

    }
}

/**
 * Add a new feature dimension to the dataset
 * @param {array} data - Array of features values consisting of [feature_0, feature_1,...]
 * @param {string} feature - string array of the feature
 */
export function setDatasetFeature(data, feature) {
    for (let i = 0; i < data.length; i++) {
        // add the the object to the array if there is no element yet
        if (typeof dataset[i] === 'undefined') {
            dataset.push({});
        }
        // parse the int
        dataset[i][feature] = +data[i];
    }
}

/**
 * Set the network value
 * @param {array} value - Array of of arrays with all values
 *                           from the calculated adjacency matrix
 */
export function setNetworkData(value) {
    networkData = value;
}

/**
 * Set the network hiearhcy value
 * @param {array} value - Array of of arrays with all values
 *                           with hierarchy
 */
export function setNetworkHierarchy(value) {
    networkHierarchy = value;
}
