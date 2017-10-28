/*eslint-disable no-unused-lets*/
/*global window, $, d3 */


let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0;
// fixed color scale for the network

export let networkColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    )
    .range(['#ffffff', '#dfdfdf', '#c0c0c0', '#a3a3a3', '#858585', '#696969', '#4e4e4e', '#353535', '#1d1d1d', '#000000']);


/**
 * Add the network select buttons to the webinterface
 * @param {array} data - Array of network data
 */
export function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-modal-body')
                    .append('<button type="button" class="btn btn-default btn-lg btn-block" data=' +
                        data[i]['network_id'] +
                        '><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>' +
                        data[i]['name'] + '</button>');
            }
        }
    } else {
        $('#networks-modal-body')
            .append('There is no network data for this dataset');
    }
}

/************************************************
    Getter and setter
 *************************************************/

export function getNetworkAuto() {
    return networkAuto;
}

export function setNetworkAuto(value) {
    networkAuto = value;
}

export function getNetworLimit() {
    return networkLimit;
}

export function setNetworLimit(value) {
    networkLimit = value;
}
