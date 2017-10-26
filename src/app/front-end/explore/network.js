/*eslint-disable no-unused-lets*/
/*global window, $ */

/**
 * Add the network select buttons to the webinterface
 * @param {array} data - Array of network data
 */
export function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-modal-body').append('<button type="button" class="btn btn-default btn-lg btn-block" data=' +
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
