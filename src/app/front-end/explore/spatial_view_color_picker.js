/*eslint-disable no-unused-lets*/
/*global window, d3, $, colorbrewer*/
import * as spv from './spatial_view.js';

import {
    changeLegend
} from './spatial_view_legend.js';

import {
    dataSetPercentile
} from './explore.js';

let colorScale = {
    type: 'Linear',
    color: colorbrewer.BuYlBu
};


/**
 * Returns the color scale
 *
 */
export function returnColorScale() {
    //if linear is choosen
    if (colorScale['type'] === 'Linear') {
        return d3.scaleLinear()
            .domain(
                dataSetPercentile[spv.getActiveScale()]
            )
            .range(colorScale['color']);
    } //Threshold color scale
    else if (colorScale['type'] === 'Threshold') {
        return d3.scaleThreshold()
            .domain(
                dataSetPercentile[spv.getActiveScale()]
            )
            .range(colorScale['color']);
    }
}

export function initColorPicker() {
    d3.select('.colors-body')
        .selectAll('.palette')
        .data(d3.entries(colorbrewer))
        .enter()
        .append('span')
        .attr('class', 'palette')
        .attr('title', function(d) {
            return d.key;
        })
        .on('click', function(d) {
            // hightlight the right palette
            $('.palette').removeClass('selected');
            $('.palette[title="' + d.key + '"]').addClass('selected');
            colorScale.color = colorbrewer[d.key];
            changeLegend();
            if (!$('#play-button')
                .hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                spv.setIndexTime(spv.getIndexTime() - 1);
                spv.draw();
            }
        })
        .selectAll('.swatch')
        .data(function(d) {
            return d.value;
        })
        .enter()
        .append('span')
        .attr('class', 'swatch')
        .style('background-color', function(d) {
            return d;
        });

    // highlight the selected color scheme
    $('.palette[title="BuYlBu"]').addClass('selected');

}

/************************************************
    Getter and setter
 *************************************************/

export function getColorScale() {
    return colorScale;
}
