/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters, Set*/

import * as spv from './spatial_view.js';

import {
    enablePlayButton,
    disablePlayButton
} from './helpers.js';

import {
    getTimeSlider,
    brushend
} from './spatial_view_interaction.js';

import {
    changeLegend,
    getColorScale
} from './spatial_view_legend.js';

import {
    getMetadataColor,
    resetIndividualMetadata,
    colorMetadata
} from './metadata.js';


import {
    setNetworkAuto,
    setNetworLimit
} from './network.js';

let JSONAPI_MIMETYPE = 'application/vnd.api+json';
let brush; // brushing variable

/**
 * Play or stop the animation
 */
$('#play-button').click(function() {
    if ($('#play-button').hasClass('active') === true) {
        spv.setPlayBoolean(false);
    } else {
        spv.setPlayBoolean(true);
        spv.setIndexTime(getTimeSlider().slider('value'));
        $('.brush').remove();
        spv.draw();
    }
});

/**
 * Pause the animation and show only the next frame
 */
$('#next-frame-button').click(function() {
    if ($('#play-button').hasClass('active') === true) {
        spv.setPlayBoolean(false);
    }
    $('#play-button').removeClass('active');
    spv.draw();
});

/**
 * Draw Speed button
 */
$('#draw-speed').click(function() {
    if ($('#draw-speed').is(':checked')) {
        // load absolute feature speed data once
        if (!('speed' in self.dataset[0])) {
            disablePlayButton();
            // ajax query to get the absolute feature speed
            $.ajax({
                url: '/api/dataset/' + parameters['id'] + '/speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < self.dataset.length; i++) {
                        self.dataset[i]['speed'] = +data[i];
                    }
                    enablePlayButton();
                }
            });
        }
        $('.draw-details').addClass('hidden');
        $('#draw-speed-details').removeClass('hidden');
        $('#draw-acceleration').prop('checked', false);
        $('#draw-distance-centroid').prop('checked', false);
        spv.setActiveScale('speed');
    } else {
        $('#draw-speed-details').addClass('hidden');
        spv.setActiveScale('black');
    }
    $('.draw-details.active').click();
    //change color legend
    d3.selectAll('.colorLegend *').remove();
    changeLegend();

    if (!$('#play-button').hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        spv.setIndexTime(spv.getIndexTime() - 1);
        spv.draw();
    }
});

/**
 * Draw acceleration button
 */
$('#draw-acceleration').click(function() {
    if ($('#draw-acceleration').is(':checked')) {
        // load absolute feature acceleration data once
        if (!('acceleration' in self.dataset[0])) {
            disablePlayButton();
            // ajax query to get the absolute feature acceleration
            $.ajax({
                url: '/api/dataset/' + parameters['id'] + '/acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the acceleration feature to the self.dataset
                    for (let i = 0; i < self.dataset.length; i++) {
                        self.dataset[i]['acceleration'] = +data[i];
                    }
                    enablePlayButton();
                }
            });
        }
        $('.draw-details').addClass('hidden');
        $('#draw-acceleration-details').removeClass('hidden');
        $('#draw-speed').prop('checked', false);
        $('#draw-distance-centroid').prop('checked', false);
        spv.setActiveScale('acceleration');
    } else {
        $('#draw-acceleration-details').addClass('hidden');
        spv.setActiveScale('black');
    }
    $('.draw-details.active').click();
    //change color legend
    d3.selectAll('.colorLegend *').remove();
    changeLegend();

    if (!$('#play-button').hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        spv.setIndexTime(spv.getIndexTime() - 1);
        spv.draw();
    }
});

/**
 * Draw distance to centroid button
 */
$('#draw-distance-centroid').click(function() {
    if ($('#draw-distance-centroid').is(':checked')) {
        // load absolute feature distance_centroid data once
        if (!('distance_centroid' in self.dataset[0])) {
            disablePlayButton();
            // ajax query to get the absolute feature distance_centroid
            $.ajax({
                url: '/api/dataset/' + parameters['id'] + '/distance_centroid',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the distance_centroid feature to the self.dataset
                    for (let i = 0; i < self.dataset.length; i++) {
                        self.dataset[i]['distance_centroid'] = +data[i];
                    }
                    enablePlayButton();
                }
            });
        }
        $('.draw-details').addClass('hidden');
        $('#draw-distance-centroid-details').removeClass('hidden');
        $('#draw-speed').prop('checked', false);
        $('#draw-acceleration').prop('checked', false);
        spv.setActiveScale('distance_centroid');
    } else {
        $('#draw-distance-centroid-details').addClass('hidden');
        spv.setActiveScale('black');
    }
    $('.draw-details.active').click();
    //change color legend
    d3.selectAll('.colorLegend *').remove();
    changeLegend();

    if (!$('#play-button').hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        spv.setIndexTime(spv.getIndexTime() - 1);
        spv.draw();
    }
});

/**
 * Draw direction arrow of the animal
 */
$('#draw-direction').click(function() {
    if ($('#draw-direction').is(':checked')) {
        // load absolute feature speed data once
        if (!('direction' in self.dataset[0])) {
            disablePlayButton();
            // ajax query to get the absolute feature speed
            $.ajax({
                url: '/api/dataset/' + parameters['id'] + '/direction',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < self.dataset.length; i++) {
                        self.dataset[i]['direction'] = +data[i];
                    }
                    enablePlayButton();
                }
            });
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
        spv.setIndexTime(spv.getIndexTime() - 1);
        spv.draw();
    }
});

/**
 * Draw medoid in color button
 */
$('#draw-medoid').click(function() {
    if ($('#draw-medoid').is(':checked')) {
        if (!('medoid' in self.swarmData[0])) {
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
                    for (let i = 0; i < self.getSwarmData().length; i++) {
                        self.getSwarmData()[i]['medoid'] = data[i];
                    }
                    enablePlayButton();
                }
            });

        }
        spv.setMedoidAnimal(self.getSwarmData()[spv.getIndexTime()]['medoid']);
        // display the medoid
        d3.selectAll('#animal-' + spv.getMedoidAnimal())
            .classed('medoid', true);
    } else {
        // do not display the medoid fish
        d3.selectAll('#animal-' + spv.getMedoidAnimal())
            .classed('medoid', false);
        spv.setMedoidAnimal(-1);
    }
});

/**
 * Draw centroid button
 */
$('#draw-centroid').click(function() {
    if ($('#draw-centroid').is(':checked')) {
        if (!('centroid' in self.swarmData[0])) {
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
                    for (let i = 0; i < self.getSwarmData().length; i++) {
                        self.getSwarmData()[i]['centroid'] = [Math.round(data[i][0] * 100) / 100, Math.round(data[i][1] * 100) / 100];
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
        if (!('hull' in self.swarmData[0])) {
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
                    for (let i = 0; i < self.getSwarmData().length; i++) {
                        self.getSwarmData()[i]['hull'] = data[i];
                    }
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
        if (!('triangulation' in self.swarmData[0])) {
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
                    for (let i = 0; i < self.getSwarmData().length; i++) {
                        self.getSwarmData()[i]['triangulation'] = data[i];
                    }
                    enablePlayButton();
                }
            });
        }
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            spv.setIndexTime(spv.getIndexTime() - 1);
            spv.draw();
        }
    }
});


/**
 * Draw triangulation
 */
$('#draw-voronoi').click(function() {
    if ($('#draw-voronoi').is(':checked')) {
        if (!('voronoi' in self.swarmData[0])) {
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
                    for (let i = 0; i < self.getSwarmData().length; i++) {
                        self.getSwarmData()[i]['voronoi'] = data[i];
                    }
                    enablePlayButton();
                }
            });
        }
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            spv.setIndexTime(spv.getIndexTime() - 1);
            spv.draw();
        }
    }
});

/**
 * Brushing button
 */
$('#brushing-button').click(function() {
    //stop the animation
    spv.setPlayBoolean(false);
    $('#play-button').removeClass('active');
    if (!$('#brushing-button').hasClass('active')) {
        //define the brush
        brush = d3.brush()
            .extent([
                [0, 0],
                [spv.getTankWidth(), spv.getTankHeight()]
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
        spv.setActiveAnimals([]);
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            spv.setIndexTime(spv.getIndexTime() - 1);
            spv.draw();
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
    getColorScale()['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
    if (!$('#play-button').hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        spv.setIndexTime(spv.getIndexTime() - 1);
        spv.draw();
    }
});

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
        if (getMetadataColor()[id]) {
            delete getMetadataColor()[id];
        }
    } else {
        getMetadataColor()[id] = colorRGB;
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
        for (let i = 0; i < self.datasetMetadata.length; i++) {
            tmp.push(self.datasetMetadata[i][value].toLowerCase());
        }
        // create a set of individual strings in sex
        tmp = Array.from(new Set(tmp));
        let colors = ['#7fc97f', '#386cb0'];

        for (let i = 0; i < self.datasetMetadata.length; i++) {
            for (let j = 0; j < tmp.length; j++) {
                if (self.datasetMetadata[i][value].toLowerCase() === tmp[j]) {
                    // add the coloring to the metadatacolor object
                    getMetadataColor()[self.datasetMetadata[i]['animal_id']] = colors[j];
                }
            }
        }
        $('#metadata-input').addClass('hidden');
    } else {
        $('#metadata-input').removeClass('hidden');
        // set values of inputs
        // here are automatically input values calculated
        // .25 and .75 percentiles are used
        for (let i = 0; i < self.datasetMetadata.length; i++) {
            tmp.push(self.datasetMetadata[i][value]);
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
                self.networkData = JSON.parse(data[0]['data']);
            }
        }
    });

});

/**
 * Network buttons clicked - get the data
 */
$('#network-remove').click(function() {
    self.networkData = {};
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
