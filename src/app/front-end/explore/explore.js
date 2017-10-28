/*eslint-disable no-unused-lets*/
/*global window, $ */
// import all js
import * as queries from './ajax_queries.js';
import {
    spatialViewInit
} from './spatial_view.js';

import {
    initializeMetaddata
} from './metadata.js';

// import css
import './explore.css';

export let dataset = [];
export let datasetMetadata = [];
export let swarmData = [];
export let dataSetPercentile = {};
export let zoomFunction;
export let networkData = {};


/**
 * Load the movement data with ajax queries
 * Afterwards if all ajax queries are finished
 * draw the group view
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
    queries.getNetworkData();

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
 * Concact to the dataset
 * the idea is to use this one day for lazy loading
 * @param {array} value -array of movement datasets
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


export function getSwarmData() {
    return swarmData;
}

/**
 * Add a new feature dimension to the swarm dataset
 * makes this modular
 * @param {array} data - Array of swarm values consisting of [{time:.., feature:..},{...}...]
 * @param {string} feature - string array of the feature
 */
export function setSwarmData(data, feature) {
    for (let i = 0; i < data.length; i++) {
        if (typeof swarmData[i] === 'undefined') {
            swarmData.push({});
        }
        swarmData[i][feature] = +data[i];
    }
}
