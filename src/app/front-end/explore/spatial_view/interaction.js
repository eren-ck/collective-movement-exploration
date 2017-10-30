/*eslint-disable no-unused-lets*/
/*global window, d3, $*/
import {
    datasetMetadata,
    swarmData
} from '../explore.js';

import * as spv from './spatial_view.js';

import * as network from '../network.js';

export let slider;
export let tooltip;

/**
 * Brush end function
 * Add the fish in the brush to the active fish and remove the brush again
 *
 */
export function brushend() {
    let arrayAnimals = spv.arrayAnimals;
    let activeAnimals = spv.activeAnimals;
    var rect = d3.event.selection;
    //iterate over the 151 fish to check which are in the brush
    for (var i = 0; i < spv.animal_ids.length; i++) {
        var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
        //check which fish are in  the brushed area
        if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
            (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
            // Point is in the brush
            activeAnimals.push(arrayAnimals[i]['a']);
        }
    }
    spv.setActiveAnimals(activeAnimals);
    if (!$('#play-button')
        .hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        spv.decIndexTime();
        spv.draw();
    }
    $('#brushing-button')
        .removeClass('active');
    // remove the brush
    $('.brush')
        .remove();
}

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

export function initSliders() {
    // initialize the slider
    slider = $('#slider')
        .slider({
            min: 0,
            max: swarmData.length,
            step: 25,
            slide: function(event, ui) {
                spv.setIndexTime(ui.value);
                // if paused apply changes
                if (!$('#play-button').hasClass('active')) {
                    //this applys the changes
                    spv.draw();
                }
            }
        });
    // initialize the network slider
    $('#network-slider')
        .slider({
            range: 'max',
            min: 0,
            max: 1,
            step: 0.01,
            value: 0,
            slide: function(event, ui) {
                network.setNetworLimit(ui.value);
                $('#network-limit').val(ui.value);
            }
        });

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

export function setTimeSlider(value) {
    slider.slider('value', value);
}
