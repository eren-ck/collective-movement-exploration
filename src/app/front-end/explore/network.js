/*eslint-disable no-unused-lets*/
/*global window, $, d3 */
import {
    hierarchyColors,
    colors,
    changeHierarchyLegend
} from './hierarchy.js';



export let networkAuto = false; // if true the network edge limit is automatically suggested
export let networkLimit = 0.5;
export let showNetworkHierarchy;
export let networkColor = {};
export let networkID;
export let networkBackground = true;
export let networkBackgroundLimit = 1; //draw background line if limit is exceeded
// fixed color scale for the network

/**
 * color scale for network - range is defined dynamic based on the hierarhcy color
 */
export let networkColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    ).range(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']);


/**
 * Add the network  select buttons and hierarchy checkboxes to the network modal
 * @param {array} data - Array of network data
 */
export function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-hierarchies-table tbody')
                    .append('<tr><td>' + data[i]['name'] + '</td> ' +
                        '<td> <button type="button" class="btn btn-default" data=' + data[i]['network_id'] + ' name=' + data[i]['name'] +
                        '><span class="mdi mdi-graphql" aria-hidden="true"></span></button></td> ' +
                        '<td><div class="pretty p-switch p-fill"><input type="checkbox" class="hiearchy-checkbox" data="' +
                        data[i]['network_id'] + '" name="' + data[i]['name'] + '"><div class="state p-success"><label></label></div></div></td>' +
                        '<td>---</td>'
                        // '<td><div class="pretty p-switch p-fill"><input type="checkbox" class="network-hierarchy-checkbox" data="' +
                        // data[i]['network_id'] + '"><div class="state p-success"><label></label></div></div></td>'
                    );
            }
        }
    } else {
        $('#networks-hierarchies-table')
            .append('There is no network data for this dataset');
    }
}

/************************************************
   Setter
 *************************************************/

/**
 * Set the network auto value - if true than the network limit is set to the 0.95 percentile of all values
 * @param {Boolean} value
 */
export function setNetworkAuto(value) {
    networkAuto = value;
}

/**
 * Set the network limit with the specific network slider - custom
 * 0 = similar and 1 unsimilar for the specific time moment
 * @param {Number} value - between 0 and 1
 */
export function setNetworLimit(value) {
    networkLimit = value;
}

/**
 * Set the network in hierarchy (e.g. h0) filter
 * @param {Number} hierarchy - e.g. 0-n
 */
export function setNetworkHierarchy(value) {
    showNetworkHierarchy = value;
}

/**
 * Set the network network id - needed for hierarchy standard deviation coloring
 * @param {Number} value - e.g. 0-n
 */
export function setNetworkID(value) {
    networkID = value;
}

/**
 * Set network color scale range
 * @param {Number} id - id of the network
 */
export function setnetworkColor(network_id) {
    // if id = -1 set the color to nothing
    if (network_id >= 0) {
        networkColor['h' + network_id] = '#08306b';
    } else {
        networkColor = {};
    }
    changeHierarchyLegend();
}

/**
 * Set the boolean value for the network background color
 * @param {Boolean} value - true or false
 */
export function setNetworkBackground(value) {
    networkBackground = value;
}


/**
 * Set the network background color limit - draw background line if limit is exceeded
 * @param {Integer} value - new limit
 */
export function setNetworkBackgroundLimit(value) {
    networkBackgroundLimit = value;
}