/*eslint-disable no-unused-lets*/
/*global window, d3, $, Set*/

import * as SPV from './spatial_view/spatial_view.js';

import {
    disablePlayButton
} from './helpers.js';

import {
    brushend,
    slider
} from './spatial_view/interaction.js';

import {
    changeLegend,
} from './spatial_view/legend.js';

import {
    metadataColor,
    resetIndividualMetadata,
    colorMetadata
} from './metadata.js';


import {
    setNetworkAuto,
    setNetworLimit,
    setNetworkHierarchy,
    setnetworkColor,
    setNetworkID,
    setNetworkBackground,
    setNetworkBackgroundLimit
} from './network.js';

import {
    dataset,
    swarmData,
    datasetMetadata,
    setNetworkData,
    setHierarchyData
} from './explore.js';

import {
    getDatasetFeature,
    getNetworkData,
    getSwarmDatasetFeature,
    getNetworkHierarchyData
} from './ajax_queries.js';

import {
    colorScale
} from './spatial_view/color_picker';

import {
    addHierarchyButton,
    removeHierarchyButton,
    maxNumberHierarchies,
    setSetOperation,
    //Drawer
} from './hierarchy.js';

import {
    setTrackingBoolean,
    resetTrackedData,
    sendTrackedData
} from './visual_parameter.js';

let brush; // brushing variable
export let playBoolean = true; // pause and play boolean


/************************************************
    Getter and setter
 *************************************************/

/**
 * Set play boolean
 * @param {Boolean} value - pause (false) or play (true)
 */
export function setPlayBoolean(value) {
    if (typeof value === 'boolean') {
        playBoolean = value;
    } else {
        playBoolean = false;
    }
}
