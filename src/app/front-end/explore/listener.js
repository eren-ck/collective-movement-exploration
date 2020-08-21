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


<<<<<<< HEAD
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
        }
    });

    /**
     * Draw distance to centroid button
     */
    $('#draw-distance_centroid').click(function() {
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-distance_centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in dataset[0])) {
                disablePlayButton();
                // ajax query to get the absolute feature distance_centroid
                getDatasetFeature('distance_centroid');
            }
            $('#draw-distance_centroid-details').show();
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            SPV.setActiveScale('distance_centroid');
        } else {
            $('#draw-distance_centroid-details').hide();
            SPV.setActiveScale('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
        }
    });

    /**
     * Draw midline offset
     */
    $('#draw-midline_offset').click(function() {
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-midline_offset').is(':checked')) {
            // load absolute feature draw-midline_offset data once
            if (!('draw-midline_offset' in dataset[0])) {
                disablePlayButton();
                // ajax query to get the absolute feature midline_offset
                getDatasetFeature('midline_offset');
            }
            $('#draw-midline_offset-details').show();
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            SPV.setActiveScale('midline_offset');
        } else {
            SPV.setActiveScale('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
        }
    });

}

/**
 * Init network listeeners
 */
function n_listeners() {
    /**
     * Network buttons clicked - get the data
     */
    $('#networks-modal-body button').click(function() {
        let network_id = $(this).attr('data');

        // add the name of the choosen network to the Network modal
        $('#active-network-name').text($(this).attr('name'));

        disablePlayButton();
        getNetworkData(network_id);
        // set the color of the network
        setnetworkColor(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        setNetworkData({});
        setNetworkID(-1);
        // remove the network color
        setnetworkColor(-1);
        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            setNetworkAuto(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            setNetworkAuto(false);
            let limit = $('#network-slider').slider('value');
            setNetworLimit(limit);
            $('#network-limit').val(limit);
        }
    });

}

/**
 * Init metadata listeners
 */
function md_listeners() {
    /**
     * Metadata swatch functions coloring individual animals
     */
    $('.metadata-swatch.metadata-swatch-clickable').click(function() {
        let id = $(this).attr('value');
        let colorRGB = $(this).css('background-color');
        // set the color of the swatch preview
        $('#metadata-row-' + id + ' #preview')
            .css('background-color', colorRGB);
        // if white than reset the color
        if (colorRGB === 'rgb(255, 255, 255)') {
            if (metadataColor[id]) {
                delete metadataColor[id];
            }
        } else {
            metadataColor[id] = colorRGB;
        }
    });

    /**
     * Metadata group metadata functions for instance color sex
     */
    $('#group-metadata :input').change(function() {
        // reset the metadat acoloring
        resetIndividualMetadata();

        let value = $(this).attr('value');
        let tmp = [];

        // metadata sex is choosen - coloring based on m and f
        if (value === 'sex') {
            $('#metadata-div').modal('toggle');
            // close and color here
            for (let i = 0; i < datasetMetadata.length; i++) {
                tmp.push(datasetMetadata[i][value].toLowerCase());
            }
            // create a set of individual strings in sex
            tmp = Array.from(new Set(tmp));
            let colors = ['#7fc97f', '#386cb0'];

            for (let i = 0; i < datasetMetadata.length; i++) {
                for (let j = 0; j < tmp.length; j++) {
                    if (datasetMetadata[i][value].toLowerCase() === tmp[j]) {
                        // add the coloring to the metadatacolor object
                        metadataColor[datasetMetadata[i]['animal_id']] = colors[j];
                    }
                }
            }
            $('#metadata-input').hide();
        } else {
            $('#metadata-input').show();
            // set values of inputs
            // here are automatically input values calculated
            // .25 and .75 percentiles are used
            for (let i = 0; i < datasetMetadata.length; i++) {
                tmp.push(datasetMetadata[i][value]);
            }
            let blAvg = d3.quantile(tmp, 0.25); // below average value
            let abAvg = d3.quantile(tmp, 0.75); // above average
            $('#bl-avg').val(blAvg);
            $('#ab-avg').val(abAvg);
            // color the animals
            colorMetadata();
        }
    });

    /**
     * Metadata group metadata input spinner
     * +/- 0.1 to the input value
     */
    $('.number-spinner button').click(function() {
        let btn = $(this),
            oldValue = btn.closest('.number-spinner').find('input').val().trim(),
            newVal = 0;

        if (btn.attr('data-dir') == 'up') {
            newVal = parseFloat(oldValue) + 0.1;
        } else {
            if (oldValue > 0) {
                newVal = parseFloat(oldValue) - 0.1;
            } else {
                newVal = 0;
            }
        }
        newVal = Math.round(newVal * 100) / 100; -
        btn.closest('.number-spinner').find('input').val(newVal);
        // change the coloring
        colorMetadata();
    });

    /**
     * Metadata input fields change
     */
    $('.number-spinner input').on('input', function() {
        colorMetadata();
    });


    /**
     * Reset all metadata input parameters
     */
    $('#metadata-reset').click(function() {
        $('#metadata-input').hide();
        resetIndividualMetadata();
    });

}
/**
 * Initialize hierarchy/dendgrogram listeners
 */
function h_listeners() {
    /**
     * Show dendgrogram sliding button
     */
    function initShowDendrogramListener(id) {

        $('#show-dendrogram-' + id).click(function() {
            let clickedButtonID = $(this).attr('id');
            // iterate over all buttons and custom highlight just one or none
            $('.show-dendrogram').each(function(i, button) {
                // active found button
                if ($(button).attr('id') === clickedButtonID && $(button).hasClass('btn-primary') === false) {
                    $(button).addClass('btn-primary');
                    $(button).find('#btn-left').hide();
                    $(button).find('#btn-right').show();
                    // TODO add here a resize of the main vis
                    // $('#dendrogram-panel').insertAfter($(this));
                } // remove highlight
                else {
                    $(button).removeClass('btn-primary');
                    $(button).find('#btn-left').show();
                    $(button).find('#btn-right').hide();
                }
            });

            // show dendrogram
            if ($('.show-dendrogram.btn-primary').length) {
                $('#dendrogram-panel').show();
            } else {
                $('#dendrogram-panel').hide();
            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                SPV.decIndexTime();
                SPV.draw();
                drawDendrogram();
            }
        });
    }

    /**
     * Hierarchy button in network modal on change
     * Load data or remove it
     */
    $('.hiearchy-checkbox').on('change', function() {
        let checkbox = $(this);


        let id = checkbox.attr('data');
        let name = checkbox.attr('name');
        let checked = checkbox.prop('checked');
        console.log(checked);
        if (checked && $('.show-dendrogram').length < maxNumberHierarchies) {
            disablePlayButton();
            getNetworkHierarchyData(id);

            addHierarchyButton(id, name);
            initShowDendrogramListener(id);
            $('#dendrogram-buttons-div').show();
        }
        // else if ($('.show-dendrogram').length === maxNumberHierarchies) {
        // console.log('Max number of hierarchies is: ' + maxNumberHierarchies);
        //TODO implement this here
        // notice user that it is not possible to show more than n hierarchies
        //          <div class="alert alert-warning">
        //   <strong>Info!</strong> Attention user .
        // </div>
        // }
        else {
            // tmp variable to save if the button which is going to be removed
            // was active
            let tmpActive = $('#show-dendrogram-' + id).hasClass('btn-primary');
            setHierarchyData({}, id);

            removeHierarchyButton(id);
            // TODO find better way here
            d3.select('g.h' + id).remove();
            // remove the dendrogram and the panel if the removed element was checked
            if (tmpActive === true) {
                $('#dendrogram-panel').hide();
            }
            if ($('.show-dendrogram').length === 0) {
                $('#dendrogram-buttons-div').hide();
            }

        }
        // resize the main svg
        if ($('.show-dendrogram').length) {
            $('#main-vis-div').removeClass('col-md-12');
            $('#main-vis-div').addClass('col-md-8');
        } else {
            $('#main-vis-div').removeClass('col-md-8');
            $('#main-vis-div').addClass('col-md-12');
        }
    });

    /**
     * Visualize the network only in the choosen hierarchy
     */
    $('.network-hierarchy-checkbox').on('change', function() {
        // get the info for the clicked button
        let checkbox = $(this);

        // reset all the other active checkboxes
        $('.network-hierarchy-checkbox').prop('checked', false);
        checkbox.prop('checked', true);

        if (checkbox.prop('checked')) {
            // set the network id
            setNetworkHierarchy(checkbox.attr('data'));
        } else {
            setNetworkHierarchy(undefined);
        }
    });

    /**
     * Hierarchy set theory buttons - union, intersection, symmetric difference
     */
    $('.set-button').click(function() {
        let data = $(this).find('input').attr('data');
        setSetOperation(data);

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
            drawDendrogram();
        }
    });
    // = ;

}
=======
>>>>>>> hierarchyzoom
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
