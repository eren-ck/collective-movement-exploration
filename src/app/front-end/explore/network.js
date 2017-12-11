/*eslint-disable no-unused-lets*/
/*global window, $, d3 */

export let networkAuto = false; // if true the network edge limit is automatically suggested
export let networkLimit = 0;
export let showNetworkHierarchy;
// fixed color scale for the network

/**
 * Static color scale for the network coloring
 * TODO change this sometime
 */
export let networkColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    )
    .range(['#ffffff', '#dfdfdf', '#c0c0c0', '#a3a3a3', '#858585', '#696969', '#4e4e4e', '#353535', '#1d1d1d', '#000000']);


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
                        '<td> <button type="button" class="btn btn-default btn-block" data=' + data[i]['network_id'] + ' name=' + data[i]['name'] +
                        '><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></button></td> ' +
                        ' <td><label class="custom-control custom-checkbox hiearchy-checkbox"><input class="custom-control-input hidden" type="checkbox" data=' +
                        data[i]['network_id'] + ' name=' + data[i]['name'] + '><span class="custom-control-indicator"></span></label></td>' +
                        '<td><label class="custom-control custom-checkbox network-hierarchy-checkbox"><input class="custom-control-input hidden" type="checkbox" data="' +
                        data[i]['network_id'] + '"><span class="custom-control-indicator"></span></label></td>');
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