/*eslint-disable no-unused-lets*/
/*global window, $, parameters */
// import all js
import {
    spatialView
} from './spatial_view.js';

// import css
import './explore.css';

let JSONAPI_MIMETYPE = 'application/vnd.api+json';

// var animalNameSpace = animalNameSpace || {};
export let dataset = [];
export let datasetMetadata = [];
export let swarmData = [];
export let dataSetPercentile = {};
export let indexTime = 0;
export let zoomFunction;
export let networkData = {};
export let animal_ids = [];
var source;


/**
 * Load the movement data with ajax queries
 * Afterwards if all ajax queries are finished
 * draw the group view
 */
$(document).ready(function() {
    // console.log(parameters);

    if (window.EventSource) {
        source = new EventSource('/api/movement_only/' + parameters['id']);
        source.onmessage = function(e) {
            if (e.data === 'close') {
                source.close();
                // console.log(dataset);
                // if all ajax queries are compelte initialize
                (function() {
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            window.setTimeout(checkPendingRequest, 100);
                        } else {
                            spatialView();
                        }
                    }
                    window.setTimeout(checkPendingRequest, 100);
                })();


            } else {
                var data = JSON.parse(e.data);
                dataset = dataset.concat(data);
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

    // ajax query to get the first page of the movement dataset
    $.ajax({
        url: '/api/percentile/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // convert the dataSetPercentile into an array
            // [min, percentile_1,...,percentile_9,max]
            for (let i = 0; i < data.length; i++) {
                dataSetPercentile[data[i]['feature']] = [data[i]['min'], data[i]['p1'], data[i]['p2'], data[i]['p3'], data[i]['p5'], data[i]['p7'], data[i]['p8'], data[i]['p9'], data[i]['max']];
            }
        }
    });

    // get the swarm features for the line chart
    let swarm_features = ['swarm_speed', 'swarm_acceleration', 'swarm_convex_hull_area',
        'swarm_distance_centroid', 'swarm_direction', 'swarm_polarisation'
    ];

    $.ajax({
        url: '/api/dataset/' + parameters['id'] + '/' + swarm_features[0],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // this has to be done first - do not remove
            // TODO find a better solution for this
            // add the speed feature to the dataset
            for (let i = 0; i < data.length; i++) {
                swarmData.push({
                    'time': i,
                    'speed': +data[i]
                });
            }
            // get all the other swarm features for the line chart
            for (let i = 1; i < swarm_features.length; i++) {
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/' + swarm_features[i],
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        let string_feature = swarm_features[i].replace('swarm_', '');
                        // add the speed feature to the dataset
                        for (let i = 0; i < swarmData.length; i++) {
                            swarmData[i][string_feature] = +data[i];
                        }
                    }
                });
            }
        }
    });


    //get metadata information
    $.ajax({
        url: '/api/metadata/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // add the speed feature to the dataset
            for (let i = 0; i < data.length; i++) {
                datasetMetadata.push(data[i]);
            }
            // add the data to the metadata modal
            if (datasetMetadata.length) {
                for (let i = 0; i < datasetMetadata.length; i++) {

                    $('#metadata-table').find('tbody')
                        .append($('<tr id="metadata-row-' + datasetMetadata[i]['animal_id'] + '">')
                            .append($('<td>')
                                .append(datasetMetadata[i]['animal_id']))
                            .append($('<td>')
                                .append(datasetMetadata[i]['species']))
                            .append($('<td>')
                                .append(datasetMetadata[i]['sex']))
                            .append($('<td>')
                                .append(datasetMetadata[i]['size']))
                            .append($('<td>')
                                .append(datasetMetadata[i]['weight']))
                            .append($('<td>')
                                .append(`<div class="dropdown">
                                                      <a class="dropdown-toggle btn btn-default btn-color" data-toggle="dropdown" href="#">
                                                      <div id="preview" class="metadata-swatch" style="background-color:#fff"></div>
                                                      <input class="color-field" value="White" style="display:none;">
                                                      </a>
                                                      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"> ` +
                                    function(id) {
                                        let colors = ['#fff', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
                                        let resultString = '';
                                        for (let i = 0; i < colors.length; i++) {
                                            resultString += '<div class="metadata-swatch metadata-swatch-clickable" style="background-color:' + colors[i] + '" value="' + id + '"></div>';
                                        }
                                        return resultString;
                                    }(datasetMetadata[i]['animal_id']) +
                                    '</ul></div>')
                            )
                        );
                }
            } else {
                $('#metadata-table').find('tbody')
                    .append('There is no metadata for this dataset');
            }
        }
    });

    $.ajax({
        url: '/api/dataset/networks/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            if (data.length) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]['finished']) {
                        $('#networks-modal-body').append('<button type="button" class="btn btn-default btn-lg btn-block" data=' + data[i]['network_id'] + '><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>' + data[i]['name'] + '</button>');
                    }
                }
            } else {
                $('#networks-modal-body')
                    .append('There is no network data for this dataset');
            }

        }
    });

});
