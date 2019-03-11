/*eslint-disable no-unused-lets*/
/*global $, user_id*/

'use strict';

let JSONAPI_MIMETYPE = 'application/vnd.api+json';

$(document).ready(function() {

    let ajax_call = function() {
        $.ajax({
            error: function() {
                alert('Dataset does not exist');
            },
            url: '/api/dataset/user/' + user_id,
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                let datasets = data;
                for (let i = 0; i < datasets.length; i++) {
                    // change color to red if there is an error
                    if (datasets[i]['error']) {
                        $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                            .addClass('progress-bar-danger');
                    }
                    // change the status text
                    $('#dataset' + datasets[i]['id'] + ' > td:nth-child(2) > em:nth-child(1)')
                        .text(datasets[i]['status']);
                    // change the progress bar
                    if (datasets[i]['progress'] > 100) {
                        datasets[i]['progress'] = 100;
                    }
                    // change the width of the progres bar
                    $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                        .css('width', datasets[i]['progress'] + '%');
                    // change the text of the progress bar
                    $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                        .html(datasets[i]['progress'] + '%');
                }
            }
        });
    };
    // do the ajax call every 30 seconds
    let interval = 1000 * 30;
    setInterval(ajax_call, interval);

});
