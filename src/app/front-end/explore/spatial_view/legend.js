/*eslint-disable no-unused-lets*/
/*global window, d3,*/

import * as SPV from './spatial_view.js';

import {
    returnColorScale
} from './color_picker.js';

let svgLegend; // svg container for the legend
let tankWidth; // spatial view width
let tankHeight; // spatial view height

/**
 * Add the group to the svg where the legend for the color legend is
 * TODO change this - so that the legend is also responsive
 */
export function addSpatialViewGroup() {
    tankWidth = SPV.tankWidth;
    tankHeight = SPV.tankHeight;

    svgLegend = d3.select('#main-vis-legend-div')
        .classed('svg-legend-container', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + tankWidth + ' ' + 100)
        // add the class svg-content
        .classed('svg-content-legend', true)
        .append('svg:g')
        .attr('class', 'colorLegend');
}

/**
 * Change the color legend
 *
 */
export function changeLegend() {
    var legend; // the color legend
    var legendText; // color legend text
    // vars for the legend
    var legendWidth = tankWidth * 0.08;
    var legendHeight = tankHeight * 0.04;
    var differentColors = 0;

    //change the colors of the animals
    if (SPV.activeScale !== 'black') {
        var tmpScale = returnColorScale();
        // once the fill for the heads and the stroke for the path
        legend = svgLegend.selectAll('rect.legend')
            .data(tmpScale.range());
        legendText = svgLegend.selectAll('text.legend-text')
            .data(tmpScale.domain());
        differentColors = tmpScale.range()
            .length;
    } else {
        legend = svgLegend.selectAll('rect.legend')
            .data([]);
        legendText = svgLegend.selectAll('text.legend-text')
            .data([]);
    }
    // UPDATE - legend
    legend.style('fill', function(d) {
        return d;
    });
    // ENTER - legend
    legend
        .enter()
        .append('rect')
        .attr('class', 'legend')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr('y', 0)
        .attr('x', function(d, i) {
            return ((tankWidth - differentColors * legendWidth) + i * legendWidth - 30) + 'px';
        })
        .style('fill', function(d) {
            return d;
        });
    // EXIT - legend
    legend.exit()
        .remove();

    // UPDATE - legend text
    legendText.text(function(d) {
        return d;
    });
    // ENTER - legend text
    legendText
        .enter()
        .append('text')
        .attr('class', 'legend-text')
        .attr('y', 2 * legendHeight)
        .attr('x', function(d, i) {
            // plus 15 has to be changed
            return ((tankWidth - differentColors * legendWidth) + i * legendWidth - 10) + 'px';
        })
        .text(function(d) {
            return Math.ceil(d * 2) / 2;
        });

    // EXIT - legend text
    legendText.exit()
        .remove();
}