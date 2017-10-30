/*eslint-disable no-unused-lets*/
/*global window, $, */
// import * as spv from './spatial_view.js';

import {
    datasetMetadata
} from './explore.js';


export let metadataColor = {}; // save the metadata coloring


export function initializeMetaddata() {
    let colors = ['#fff', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
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

/**
 * Size and weight coloring for the metadata
 */
export function colorMetadata() {
    resetIndividualMetadata();
    // get the input values
    let value = $('#group-metadata .btn.btn-default.active input')
        .attr('value');
    let blAvg = $('#bl-avg').val();
    let abAvg = $('#ab-avg').val();
    // color scheme for the inputs
    let colors = ['#7fc97f', '#fdc086', '#386cb0'];
    // color the animals
    for (let i = 0; i < datasetMetadata.length; i++) {
        if (datasetMetadata[i][value] < blAvg) {
            metadataColor[datasetMetadata[i]['animal_id']] = colors[0];
        } else if (datasetMetadata[i][value] > abAvg) {
            metadataColor[datasetMetadata[i]['animal_id']] = colors[2];
        } else {
            metadataColor[datasetMetadata[i]['animal_id']] = colors[1];
        }
    }
}


/**
 * Metadata reset all individual metadata input fields
 */
export function resetIndividualMetadata() {
    metadataColor = {};
    $('.dropdown #preview')
        .css('background-color', 'rgb(255, 255, 255)');
}
