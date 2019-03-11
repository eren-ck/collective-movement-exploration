/*eslint-disable no-unused-lets*/
/*global window, d3, $*/
import {
    datasetMetadata,
    swarmData,
    animalIds
} from '../explore.js';

import * as SPV from './spatial_view.js';

import * as Network from '../network.js';

export let slider; // time slider of the app
export let tooltip; // tooltip function

/**
 * Brush end function
 * add active animals to the array or remove them
 */
export function brushend() {
    let arrayAnimals = SPV.arrayAnimals;
    let activeAnimals = SPV.activeAnimals;
    var rect = d3.event.selection;
    //iterate over the 151 fish to check which are in the brush
    for (var i = 0; i < animalIds.length; i++) {
        var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
        //check which fish are in  the brushed area
        if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
            (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
            // Point is in the brush
            activeAnimals.push(arrayAnimals[i]['a']);
        }
    }
    SPV.setActiveAnimals(activeAnimals);
    if (!$('#play-button')
        .hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        SPV.decIndexTime();
        SPV.draw();
    }
    $('#brushing-button')
        .removeClass('active');
    // remove the brush
    $('.brush')
        .remove();
}

/**
 * Initialize the tooltip
 */
export function initTooltip() {
    tooltip = d3.select('div.tooltip')
        .style('left', 0 + 'px')
        .style('top', 0 + 'px')
        .on('mouseover', function() {
            tooltip
                .style('opacity', 1);
        });
}

/**
 * Tooltip function
 * @param {Object} d - d3 data object with the metadata information
 *
 */
export function tooltipFunction(d) {
    for (let i = 0; i < datasetMetadata.length; i++) {
        if (d['a'] === datasetMetadata[i]['animal_id']) {
            tooltip
                .style('left', (d3.event.pageX + 5) + 'px')
                .style('top', (d3.event.pageY - 100) + 'px')
                .style('opacity', 1);
            // set the values
            // TODO make this modular
            tooltip.select('#tooltip-animal-id')
                .html(datasetMetadata[i]['animal_id']);
            tooltip.select('#tooltip-species')
                .html(datasetMetadata[i]['species']);
            tooltip.select('#tooltip-sex')
                .html(datasetMetadata[i]['sex']);
            tooltip.select('#tooltip-size')
                .html(datasetMetadata[i]['size']);
            tooltip.select('#tooltip-weight')
                .html(datasetMetadata[i]['weight']);
        }
    }

}

/**
 * Initialize the time slider and the dynamic network slider
 */
export function initSliders() {
    // time slider
    slider = $('#slider')
        .slider({
            min: 0,
            max: swarmData.length,
            step: 25,
            slide: function(event, ui) {
                SPV.setIndexTime(ui.value);
                // if paused apply changes
                if (!$('#play-button').hasClass('active')) {
                    //this applys the changes
                    SPV.draw();
                }
            }
        });
    // initialize the Network slider
    $('#network-slider')
        .slider({
            range: 'max',
            min: 0,
            max: 1,
            step: 0.01,
            value: 0.5,
            slide: function(event, ui) {
                Network.setNetworLimit(ui.value);
                $('#network-limit').val(ui.value);
            }
        });
    // set text for the first initialization
    $('#network-limit').val(0.5);

    // get the max from the slider this is needed to calculate the ticks
    let max = slider.slider('option', 'max');
    let space = 100 / max;
    //append the minute ticks
    for (let i = 0; i < max; i = i + 1500) {
        $('<span class="ui-slider-tick"></span>')
            .css('left', (space * i) + '%')
            .appendTo(slider);
    }
}

/************************************************
    Setter
 *************************************************/

/**
 * Set the time slider to a new value
 * @param {Number} value - new value for the time slider
 */
export function setTimeSlider(value) {
    slider.slider('value', value);
}