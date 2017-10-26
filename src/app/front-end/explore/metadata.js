/*eslint-disable no-unused-lets*/
/*global window, $, */

import {
    datasetMetadata
} from './explore.js';

export function initializeMetaddata() {
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
