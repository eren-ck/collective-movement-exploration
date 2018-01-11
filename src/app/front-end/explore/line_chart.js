/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/
import {
    setIndexTime,
    animal_ids
} from './spatial_view/spatial_view.js';

import {
    swarmData,
    dataset
} from './explore.js';

import {
    percentilesLineChart
} from './helpers.js';

import {
    indexTime,
} from './spatial_view/spatial_view';


export let zoomFunction;
export let lineChartRatio = 0;

let trendChartsZoom = {};
let trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
let lineChartWidth = 5000;
let ratio = 1;
let zoomGroup;
let x;
let y;

/**
 * init the line chart and also the trend chart
 */
export function lineChart() {

    zoomFunction = d3.scaleLinear()
        .domain([0, swarmData.length])
        .range([0, lineChartWidth]);

    lineChartRatio = Math.ceil(swarmData.length / lineChartWidth);

    // Swarm features line chart
    let lineChartHeight = 500; // the line chart height
    let margin = {
        top: 10,
        right: 0,
        bottom: 100,
        left: 10
    };
    let marginToLegend = 50;

    let swarm_features = Object.keys(swarmData[0]);
    // remove the time key
    let index = swarm_features.indexOf('time');
    swarm_features.splice(index, 1);

    // add the Line chart buttons to the feature panel
    for (let i = 0; i < swarm_features.length; i++) {
        let capitalized_feature_string = swarm_features[i].split('_').join(' ');
        capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

        $('.feature-check-box').append(`<div class="feature-check-box-default line-chart-check-box">
                                       <input id="drawSwarm` + swarm_features[i] + `" class="lineChartButton" type="checkbox">
                                       <label for="drawSwarm` + swarm_features[i] + '">' + capitalized_feature_string + `</label>
                     </div>`);
    }
    //check line chart draw all lines
    $('.lineChartButton')
        .prop('checked', true);

    let lineChartData = [];
    // aggregate and average the swarm data to lineChartWidth points in the line chart
    if (swarmData.length > lineChartWidth) {
        ratio = Math.ceil(swarmData.length / lineChartWidth);
        // tmp array for the aggregated and averaged features
        let tmp = new Array(swarm_features.length).fill(0);

        for (let i = 0; i < swarmData.length; i++) {
            // aggregate the features in the temp array
            for (let j = 0; j < swarm_features.length; j++) {
                tmp[j] += swarmData[i][swarm_features[j]];
            }
            // if the ratio is zero then average it and set it to zero
            if (i % ratio === 0) {
                let tmp_object = {
                    'time': i / ratio
                };

                for (let j = 0; j < swarm_features.length; j++) {
                    tmp[j] = tmp[j] / ratio;
                    tmp_object[swarm_features[j]] = tmp[j];
                }

                lineChartData.push(tmp_object);
                tmp = new Array(swarm_features.length).fill(0);
            }
        }
    } else {
        lineChartData = swarmData;
    }



    // x axis scale - minus marginLineChart  needed
    x = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartWidth]);
    let x2 = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartWidth]);
    // define where the axis is etc
    let xAxis = d3.axisBottom(x)
        .ticks(10)
        .tickSize(10)
        .tickPadding(5)
        .tickFormat(function(d) {
            return Math.floor((d * ratio) / 1500) % 60 + ':' + Math.floor((d * ratio) / parameters['fps']) % 60 + '::' + (d * ratio) % parameters['fps'];
        });

    // y axis scale which is normalized
    y = d3.scaleLinear()
        .domain([0, 100])
        .range([lineChartHeight, 0]);
    // define where the axis is etc
    let yAxis = d3.axisLeft(y)
        .ticks(0)
        .tickSize(10)
        .tickPadding(5);

    let dragged = function() {
        // dragged function get the coordinates and calculate the time moment from this
        let coords = d3.mouse(this);
        if (coords[0] < margin.left || coords[0] > lineChartWidth || coords[1] < 0 || coords[1] > lineChartHeight) {
            return;
        }
        // tmp scale to include the zoom factor
        let tmpScale = d3.scaleLinear()
            .domain(zoomFunction.range())
            .range(zoomFunction.domain());
        // set the new time
        setIndexTime(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
    };
    let zoom = d3.zoom()
        .scaleExtent([1, 20])
        .translateExtent([
            [0, 0],
            [lineChartWidth, lineChartHeight]
        ])
        .extent([
            [0, 0],
            [lineChartWidth, lineChartHeight]
        ])
        .on('zoom', function() {
            // get the transform factor
            let t = d3.event.transform;
            // change scaling function
            zoomFunction = x.domain(t.rescaleX(x2).domain());
            // zoom each avaiable line
            for (let key in lines) {
                if (lines.hasOwnProperty(key)) {
                    zoomGroup.select(('#' + key + 'Line')).attr('d', lines[key]);
                }
            }
            // zoom the trend charts
            for (let key in trendChartsZoom) {
                if (trendChartsZoom.hasOwnProperty(key)) {
                    for (let i = 0; i < trendChartsElem.length; i++) {
                        zoomGroup
                            .select(('#' + key + 'TrendChart .' + trendChartsElem[i]))
                            .attr('d', trendChartsZoom[key][trendChartsElem[i]]);
                    }
                }
            }
            // rescale the axis
            gXaxis.call(xAxis);
        });

    // make the svg resizable
    let swarmLineChart = d3.select('#swarm-vis')
        .classed('svg-line-chart-container', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')

        .attr('viewBox', '0 0 ' + lineChartWidth + ' ' + (lineChartHeight + margin.bottom))
        // add the class svg-content
        .classed('svg-content', true);

    zoomGroup = swarmLineChart
        .append('svg:g')
        .attr('id', 'lineChartZoom')
        .attr('transform', 'translate(' + margin.left + ',0)');

    // append a group for the x axis
    // add the axis
    let gXaxis = zoomGroup.append('g')
        .attr('class', 'x axis-line-chart')
        .attr('transform', 'translate(0,' + lineChartHeight + ')')
        .call(xAxis);

    // append a group for the y axis
    zoomGroup.append('g')
        .attr('class', 'y axis-line-chart')
        .call(yAxis);


    // the time line append the line
    zoomGroup.append('line')
        .attr('class', 'time-line')
        .attr('id', 'lineChartTimeLine')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', lineChartHeight);

    // **
    // colors for the lines
    let line_colors = d3.scaleOrdinal(d3.schemeCategory10);
    let lines = {};
    // add the lines to the line chart
    for (let i = 0; i < swarm_features.length; i++) {
        let min = d3.min(lineChartData, function(d) {
            return d[swarm_features[i]];
        });
        let max = d3.max(lineChartData, function(d) {
            return d[swarm_features[i]];
        });

        let normalizationScale = d3.scaleLinear().domain([min, max]).range([0, 100]);
        let line = d3.line()
            .x(function(d) {
                return x(d['time']);
            })
            .y(function(d) {
                return y(normalizationScale(d[swarm_features[i]]));
            });
        lines[swarm_features[i]] = line;
        //append the line to the line chart
        zoomGroup.append('path')
            .data([lineChartData])
            .attr('id', (swarm_features[i] + 'Line'))
            .attr('class', 'line lineChartLine')
            .style('stroke', line_colors(i))
            .attr('d', line)
            .attr('name', swarm_features[i]);
    }

    $('#lineChartTimeLine').appendTo('#lineChartZoom');
    // append the zoom rectangle
    zoomGroup.append('rect')
        .attr('class', 'zoom')
        .attr('width', lineChartWidth)
        .attr('height', lineChartHeight)
        .call(zoom)
        .on('click', dragged)
        .call(d3.drag()
            .on('drag', dragged)
        );

    // append the legend for the line chart
    // vars for the legend
    let legendWidth = 100;
    let legendHeight = 50;

    //select all the lines
    let chartLines = d3.selectAll('.line');

    //append a group for the legend
    swarmLineChart
        .append('g')
        .attr('id', 'lineChartLegend')
        .attr('transform', 'translate(' + margin.bottom + ',' + (lineChartHeight + marginToLegend) + ')')
        .selectAll('rect.legend')
        .data(chartLines._groups[0])
        .enter()
        //append the whole legend in a each function
        .each(function(d, i) {
            let spacing = 600;
            let textSpace = 40;
            // append the rectangles for the legend
            d3.select(this).append('rect')
                .attr('class', 'legend')
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .attr('x', (spacing * i) + 'px')
                .style('fill', d.style.stroke);

            // append the text for the legend
            d3.select(this).append('text')
                .attr('id', d.attributes.id.value + 'LegendTitle')
                .attr('class', 'line-chart-legend-text')
                .attr('y', textSpace)
                .attr('x', (spacing * i + legendWidth + 10) + 'px')
                .text(d.attributes.name.value + ': ');

            //append the text for the value of the line
            d3.select(this).append('text')
                .attr('id', d.attributes.id.value + 'Value')
                .attr('class', 'line-chart-legend-text')
                .attr('y', textSpace)
                .attr('x', (spacing * i + legendWidth +
                    //the next expression gets the text length
                    d3.select('#' + d.attributes.id.value + 'LegendTitle').node().getComputedTextLength() +
                    10) + 'px')
                .text('0.0');
        });

    //append a legend group for the trend charts
    swarmLineChart
        .append('g')
        .attr('id', 'trendChartLegend')
        .attr('transform', 'translate(' + margin.bottom + ',' + (lineChartHeight + marginToLegend) + ')')
        .selectAll('rect.legend')
        .data(['5% - 95%', '25% - 75%', 'Median'])
        .enter()
        //append the whole legend in a each function
        .each(function(d, i) {
            let spacing = 800;
            let textSpace = 40;
            // append the rectangles for the legend
            d3.select(this).append('rect')
                .attr('class', 'legend')
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .attr('x', (spacing * i) + 'px')
                .style('fill', function() {
                    if (i === 0) {
                        return '#74a9cf';
                    } else if (i === 1) {
                        return '#045a8d';
                    } else {
                        return '#525252';
                    }
                });

            // append the text for the legend
            d3.select(this).append('text')
                .attr('class', 'line-chart-legend-text')
                .attr('y', textSpace)
                .attr('x', (spacing * i + legendWidth + 10) + 'px')
                .text(d);
        });
    $('#trendChartLegend').hide();

    /**
     * Draw line chart button listeners
     */
    for (let i = 0; i < swarm_features.length; i++) {
        $(('#drawSwarm' + swarm_features[i])).click(function() {
            if ($(('#drawSwarm' + swarm_features[i])).is(':checked')) {
                $(('#' + swarm_features[i] + 'Line'))
                    .attr('visibility', 'visible');
            } else {
                $(('#' + swarm_features[i] + 'Line'))
                    .attr('visibility', 'hidden');
            }

        });
    }


}
/**
 * Line chart details click listener
 */
$('.draw-details').click(function() {
    if (!$(this).hasClass('active')) {
        disableLineChart();
        addTrendChart(this);
    } else {
        removeTrendChart();
        enableLineChart();
    }
});

/**
 * Line chart details click listener
 */
function disableLineChart() {
    $('.lineChartButton').prop('checked', false).prop('disabled', true);
    $('.line-chart-check-box').addClass('disabled');
    $('.lineChartLine').attr('visibility', 'hidden');
}

/**
 * Line chart details click listener
 */
function enableLineChart() {
    $('.lineChartButton').prop('checked', true).prop('disabled', false);
    $('.line-chart-check-box').removeClass('disabled');
    $('.lineChartLine').attr('visibility', 'visible');
}

/**
 * Hide the trend chart
 */
function removeTrendChart() {
    $('.trendChartData').hide();
    $('#trendChartLegend').hide();
    $('#lineChartLegend').show();
}

/**
 * Add a trend chart showing median and percentiles
 * @param {String} elem - which feature
 */
function addTrendChart(elem) {
    // check which feature to display in the trend chart
    let feature = '';
    if (elem['id'].toLowerCase().includes('speed')) {
        feature = 'speed';
    } else if (elem['id'].toLowerCase().includes('acceleration')) {
        feature = 'acceleration';
    } else if (elem['id'].toLowerCase().includes('distance-centroid')) {
        feature = 'distance_centroid';
    } else {
        return;
    }
    // data is not loaded fully -- return
    if (!dataset[0][feature]) {
        return;
    }
    // change to the trend chart legend
    $('#lineChartLegend').hide();
    $('#trendChartLegend').show();
    // check if already computed and only hidden
    if (!$(('#' + feature + 'TrendChart')).length) {
        // get the data for the trend chart
        let trendChartData = [];
        let num_animals = animal_ids.length;
        // calculate the percetiles for every time step
        for (let i = 0; i < swarmData.length; i++) {
            let tmp = [];
            for (let j = 0; j < num_animals; j++) {
                if (dataset[i * num_animals + j]) {
                    tmp.push(dataset[i * num_animals + j][feature]);
                }
            }
            trendChartData.push(percentilesLineChart(tmp));
        }
        //aggregate and average the trendChartData to lineChartWidth data points
        if (trendChartData.length > lineChartWidth) {
            let tmpTrendChartData = [];
            ratio = Math.ceil(trendChartData.length / lineChartWidth);

            // [perc05,perc25,perc50,perc75,perc95]
            let tmp = [0, 0, 0, 0, 0];

            for (let i = 0; i < trendChartData.length; i++) {
                // aggregate
                for (let j = 0; j < tmp.length; j++) {
                    tmp[j] += trendChartData[i][j];
                }
                // divide
                if (i % ratio === 0) {
                    for (let j = 0; j < tmp.length; j++) {
                        tmp[j] += tmp[j] / ratio;
                    }
                    //add to the
                    tmpTrendChartData.push(tmp);
                    // [perc05,perc25,perc50,perc75,perc95]
                    tmp = [0, 0, 0, 0, 0];
                }
            }
            trendChartData = tmpTrendChartData;
        }
        // get min and max for the normalization
        let min = d3.min(trendChartData, function(d) {
            return d[0];
        });
        let max = d3.max(trendChartData, function(d) {
            return d[4];
        });
        let normalizationScale = d3.scaleLinear().domain([min, max]).range([0, 100]);

        // add a group for the trend chart
        let trendChart = zoomGroup.append('g')
            .attr('id', (feature + 'TrendChart'))
            .attr('class', 'trendChartData');
        // append the zoom rectangle again to the end of the group
        $('.zoom').appendTo('#lineChartZoom');
        $('#lineChartTimeLine').appendTo('#lineChartZoom');
        // var to save the functions for the zoom
        trendChartsZoom[feature] = {};

        for (let i = 0; i < trendChartsElem.length; i++) {
            // functions for the upper and inner areas and the median
            let temp;
            // lower outer area and lower inner area
            if (i < 2) {
                temp = d3.area()
                    .x(function(d, j) {
                        return x(j);
                    })
                    .y0(function(d) {
                        return y(normalizationScale(d[(i + 1)]));
                    })
                    .y1(function(d) {
                        return y(normalizationScale(d[i]));
                    });
            }
            // median line
            else if (i === 2) {
                temp = d3.line()
                    .x(function(d, j) {
                        return x(j);
                    })
                    .y(function(d) {
                        return y(normalizationScale(d[i]));
                    });
            }
            // upper inner area and upper outer area
            else if (i > 2) {
                temp = d3.area()
                    .x(function(d, j) {
                        return x(j);
                    })
                    .y0(function(d) {
                        return y(normalizationScale(d[i]));
                    })
                    .y1(function(d) {
                        return y(normalizationScale(d[(i - 1)]));
                    });
            }
            // save this for the later zoom
            trendChartsZoom[feature][trendChartsElem[i]] = temp;
            // append it to the path
            trendChart.append('path')
                .data([trendChartData])
                .attr('class', trendChartsElem[i])
                .attr('d', temp);
        }
    } else {
        // show the trend chart
        $(('#' + feature + 'TrendChart')).show();
    }
}

/**
 * Update the line chart fields and the line chart time line
 */
export function updateLineChart() {
    if (d3.select('#lineChartTimeLine') && swarmData[Math.ceil(indexTime / lineChartRatio)]) {
        let tmp = Math.ceil(indexTime / lineChartRatio);
        //update the line chart legend text values per second
        if (indexTime % 25 === 0) {
            // TODO change this to a more modular way
            d3.select('#convex_hull_areaLineValue')
                .text((swarmData[tmp]['convex_hull_area']) + 'mm²');
            d3.select('#speedLineValue')
                .text(swarmData[tmp]['speed'] + 'mm/s');
            d3.select('#accelerationLineValue')
                .text(swarmData[tmp]['acceleration'] + 'mm/s²');
            d3.select('#distance_centroidLineValue')
                .text(swarmData[tmp]['distance_centroid'] + 'mm');
            d3.select('#directionLineValue')
                .text(swarmData[tmp]['direction'] + '°');
            d3.select('#polarisationLineValue')
                .text(swarmData[tmp]['polarisation']);
        }
        d3.select('#lineChartTimeLine')
            .attr('transform', 'translate(' + zoomFunction(tmp) + ',0)');
    }
}