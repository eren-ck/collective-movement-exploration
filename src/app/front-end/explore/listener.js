/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters, Set*/

import * as SPV from './spatial_view/spatial_view.js';

import {
    enablePlayButton,
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
    setNetworLimit
} from './network.js';

import {
    dataset,
    swarmData,
    setSwarmData,
    datasetMetadata,
    setNetworkData
} from './explore.js';

import {
    getDatasetFeature
} from './ajax_queries.js';

import {
    colorScale
} from './spatial_view/color_picker';

let JSONAPI_MIMETYPE = 'application/vnd.api+json';
let brush; // brushing variable
export let playBoolean = true; // pause and play boolean

/**
 * Init all the listeners
 */
export function initListeners() {
    cp_listener();
    sf_listeners();
    af_listeners();
    md_listeners();
    n_listeners();
}

/**
 * Init control panel listeners
 */
function cp_listener() {

    /**
     * Play or stop the animation
     */
    $('#play-button').click(function() {
        if ($('#play-button').hasClass('active') === true) {
            playBoolean = false;
        } else {
            playBoolean = true;
            SPV.setIndexTime(slider.slider('value'));
            $('.brush').remove();
            SPV.draw();
        }
    });

    /**
     * Pause the animation and show only the next frame
     */
    $('#next-frame-button').click(function() {
        if ($('#play-button').hasClass('active') === true) {
            playBoolean = false;
        }
        $('#play-button').removeClass('active');
        SPV.draw();
    });


    /**
     * Brushing button
     */
    $('#brushing-button').click(function() {
        //stop the animation
        playBoolean = false;
        $('#play-button').removeClass('active');
        if (!$('#brushing-button').hasClass('active')) {
            //define the brush
            brush = d3.brush()
                .extent([
                    [0, 0],
                    [SPV.tankWidth, SPV.tankHeight]
                ])
                .on('end', brushend);
            //add the brush
            d3.select('#main-vis-svg')
                .append('g')
                .attr('class', 'brush')
                .call(brush);
        } else {
            // remove the brush
            $('.brush').remove();
        }
    });

    /**
     * Unselect all button
     */
    $('#remove-active-selected-button').click(function() {
        if (!$('#remove-active-selected-button').is(':disabled')) {
            $('#remove-active-selected-button').prop('disabled', true);
            SPV.setActiveAnimals([]);
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes

                SPV.decIndexTime();
                SPV.draw();
            }
        }
    });

    /**
     * Spatial view background color
     */
    $('#background-color').change(function() {
        let color = $('input[type="radio"].group-background:checked').val();
        $('#main-vis-svg').css('background-color', color);
    });

    /**
     * Show the spatial view axis button
     */
    $('#draw-axis').on('change', function() {
        if (this.checked) {
            $('#main-vis g.x.axis').show();
            $('#main-vis g.y.axis').show();
        } else {
            $('#main-vis g.x.axis').hide();
            $('#main-vis g.y.axis').hide();
        }

    });

    /**
     * Show the frame (time) number in the spatial view button
     */
    $('#draw-time').on('change', function() {
        if (this.checked) {
            $('#main-vis .frameText').show();
        } else {
            $('#main-vis .frameText').hide();
        }
    });

    /**
     * Color Scale Function Radio buttons
     */
    $('#color-scale-radio-form input').on('change', function() {
        colorScale['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
        }
    });
}

/**
 * Init swarm features listeners
 */
function sf_listeners() {

    /**
     * Draw direction arrow of the animal
     */
    $('#draw-direction').click(function() {
        if ($('#draw-direction').is(':checked')) {
            // load absolute feature speed data once
            if (!('direction' in dataset[0])) {
                disablePlayButton();
                // ajax query to get direction data
                getDatasetFeature('direction');
            }
            d3.selectAll('.arrow')
                .classed('hidden', false);
        } else {
            d3.selectAll('.arrow')
                .classed('hidden', true);
        }
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            SPV.decIndexTime();
            SPV.draw();
        }
    });

    /**
     * Draw medoid in color button
     */
    $('#draw-medoid').click(function() {
        if ($('#draw-medoid').is(':checked')) {

            if (!('medoid' in swarmData[0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/medoid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < swarmData.length; i++) {
                            swarmData[i]['medoid'] = data[i];
                        }
                        enablePlayButton();
                    }
                });

            }
            SPV.setMedoidAnimal(swarmData[SPV.indexTime]['medoid']);
            // display the medoid
            d3.selectAll('#animal-' + SPV.medoidAnimal)
                .classed('medoid', true);
        } else {
            // do not display the medoid fish
            d3.selectAll('#animal-' + SPV.medoidAnimal)
                .classed('medoid', false);
            SPV.setMedoidAnimal(-1);
        }
    });

    /**
     * Draw centroid button
     */
    $('#draw-centroid').click(function() {
        if ($('#draw-centroid').is(':checked')) {
            if (!('centroid' in swarmData[0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/centroid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < swarmData.length; i++) {
                            swarmData[i]['centroid'] = [Math.round(data[i][0] * 100) / 100, Math.round(data[i][1] * 100) / 100];
                        }
                        enablePlayButton();
                    }
                });

            }
            // hide the centroid
            d3.select('circle.centroid')
                .classed('hidden', false);
        } else {
            // display the centroid
            d3.select('circle.centroid')
                .classed('hidden', true);
        }
    });


    /**
     * Draw convex hull in color button
     */
    $('#draw-convex-hull').click(function() {
        if ($('#draw-convex-hull').is(':checked')) {
            if (!('hull' in swarmData[0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/convex_hull',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        setSwarmData(data, 'hull');
                        enablePlayButton();
                    }
                });
            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-triangulation').click(function() {
        if ($('#draw-triangulation').is(':checked')) {
            if (!('triangulation' in swarmData[0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/triangulation',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        setSwarmData(data, 'triangulation');
                        enablePlayButton();
                    }
                });
            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                SPV.decIndexTime();
                SPV.draw();
            }
        }
    });


    /**
     * Draw voronoi
     */
    $('#draw-voronoi').click(function() {
        if ($('#draw-voronoi').is(':checked')) {
            if (!('voronoi' in swarmData[0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/voronoi',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < swarmData.length; i++) {
                            swarmData[i]['voronoi'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                SPV.decIndexTime();
                SPV.draw();
            }
        }
    });


}

/**
 * Init absolute feature listeners
 */
function af_listeners() {

    /**
     * Draw Speed button
     */
    $('#draw-speed').click(function() {
        if ($('#draw-speed').is(':checked')) {
            // load absolute feature speed data once
            if (!('speed' in dataset[0])) {
                disablePlayButton();
                // ajax query to get the absolute feature speed
                getDatasetFeature('speed');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-speed-details').removeClass('hidden');
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
            SPV.setActiveScale('speed');
        } else {
            $('#draw-speed-details').addClass('hidden');
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
     * Draw acceleration button
     */
    $('#draw-acceleration').click(function() {
        if ($('#draw-acceleration').is(':checked')) {
            // load absolute feature acceleration data once
            if (!('acceleration' in dataset[0])) {
                disablePlayButton();
                // ajax query to get the absolute feature acceleration
                getDatasetFeature('acceleration');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-acceleration-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
            SPV.setActiveScale('acceleration');
        } else {
            $('#draw-acceleration-details').addClass('hidden');
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
     * Draw distance to centroid button
     */
    $('#draw-distance-centroid').click(function() {
        if ($('#draw-distance-centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in dataset[0])) {
                disablePlayButton();
                // ajax query to get the absolute feature distance_centroid
                getDatasetFeature('distance_centroid');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-distance-centroid-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            SPV.setActiveScale('distance_centroid');
        } else {
            $('#draw-distance-centroid-details').addClass('hidden');
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
        // get the data
        $.ajax({
            url: '/api/dataset/networks/' + parameters['id'] + '/' + network_id,
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                if (data.length) {

                    setNetworkData(JSON.parse(data[0]['data']));
                }
            }
        });

    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        setNetworkData({});
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
            $('#metadata-input').addClass('hidden');
        } else {
            $('#metadata-input').removeClass('hidden');
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
        $('#metadata-input').addClass('hidden');
        resetIndividualMetadata();
    });

}
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
