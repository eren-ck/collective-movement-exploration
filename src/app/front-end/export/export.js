/*eslint-disable no-unused-lets*/
/*global $,Papa, dataset_id, window*/
'use strict';
import './export.css';

let JSONAPI_MIMETYPE = 'application/vnd.api+json';

// result data array for absolute feature movement ajax query
let resultMovement = [];
// result data array for group feature ajax query
let resultGroup = [];
var source;

$(document).ready(function() {
    $.ajax({
        error: function() {
            alert('Dataset does not exist');
        },
        url: '/api/dataset/' + dataset_id,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            $('#export-title').text('Export: ' + data[0].name);
        }
    });
});


/**
 * Download the movement data
 */
$('#download-movement-data').click(function() {
    // change the button text and icon (loading)
    $('#download-movement-data').html('Loading...></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    // if the movement data set is empty
    // if downloaded again it is not queried again from the db
    if (resultMovement.length === 0) {
        if (window.EventSource) {
            source = new EventSource('/api/movement_only/' + dataset_id);
            source.onmessage = function(e) {
                if (e.data === 'close') {
                    source.close();
                    getAbsoluteFeatures();
                } else {
                    var data = JSON.parse(e.data);
                    resultMovement = resultMovement.concat(data);
                }
            };

            source.addEventListener('error', function(e) {
                if (e.readyState == EventSource.CLOSED) {
                    alert('Streaming error');
                }
            }, false);
        } else {
            alert('Webbrowser does not support streaming');
        }
    } else {
        getAbsoluteFeatures();
    }


    /**
     * Download the needed absolute features
     */
    function getAbsoluteFeatures() {
        // get what should be included in the csv file
        // get metric distance if checked
        if ($('#metric-distance').is(':checked') && !('metric_distance' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/metric_distance',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the metric distance feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['metric_distance'] = +data[i];
                    }
                }
            });
        }
        // get speed if checked
        if ($('#speed').is(':checked') && !('speed' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#acceleration').is(':checked') && !('acceleration' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the acceleration feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // check if distance centroid is checked
        if ($('#distance-centroid').is(':checked') && !('distance_centroid' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/distance_centroid',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the distance centroid feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['distance_centroid'] = +data[i];
                    }
                }
            });
        }
        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }


    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];
        // get what should be included in the csv file
        let position = $('#position').is(':checked');
        let metric = $('#metric-distance').is(':checked');
        let speed = $('#speed').is(':checked');
        let acceleration = $('#acceleration').is(':checked');
        let distanceCentroid = $('#distance-centroid').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultMovement.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultMovement[i]['t'];
            csletray[i]['animal_id'] = resultMovement[i]['a'];
            // deceide if the position is in one column (x,y) or in two columns x,y
            if (position) {
                csletray[i]['x'] = resultMovement[i]['p'][0];
                csletray[i]['y'] = resultMovement[i]['p'][1];
            } else {
                csletray[i]['position'] = '(' + resultMovement[i]['p'] + ')';
            }
            // metric distance checked
            if (metric) {
                csletray[i]['metric_distance'] = resultMovement[i]['metric_distance'];
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultMovement[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultMovement[i]['acceleration'];
            }
            // distance centroid checked
            if (distanceCentroid) {
                csletray[i]['distance_centroid'] = resultMovement[i]['distance_centroid'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_absolute_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-movement-data').html('Download <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);
    });

});


/**
 * Download the goup data
 */
$('#download-group-data').click(function() {
    // change the button text and icon (loading)
    $('#download-group-data').html('Loading... <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    if (resultGroup.length === 0) {
        $.ajax({
            url: '/api/dataset/' + dataset_id + '/centroid',
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    resultGroup.push({
                        'time': i,
                        'centroid': data[i]
                    });
                }
                getGroupFeatures();
            }
        });
    } else {
        getGroupFeatures();
    }

    /**
     * Download the needed group features
     */
    function getGroupFeatures() {
        // get speed if checked
        if ($('#group-speed').is(':checked') && !('speed' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#group-acceleration').is(':checked') && !('acceleration' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // get convex_hull_area if checked
        if ($('#group-convex-hull-area').is(':checked') && !('convex_hull_area' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_convex_hull_area',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['convex_hull_area'] = +data[i];
                    }
                }
            });
        }

        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }

    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];

        // get what should be included in the csv file
        let centroid = $('#centroid').is(':checked');
        let speed = $('#group-speed').is(':checked');
        let acceleration = $('#group-acceleration').is(':checked');
        let convexHull = $('#group-convex-hull-area').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultGroup.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultGroup[i]['time'];
            // centroid is checked
            if (centroid) {
                csletray[i]['centroid'] = '(' + resultGroup[i]['centroid'] + ')';
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultGroup[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultGroup[i]['acceleration'];
            }
            // distance centroid checked
            if (convexHull) {
                csletray[i]['convex_hull_area'] = resultGroup[i]['convex_hull_area'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_group_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-group-data').html('Download');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);

    });
});