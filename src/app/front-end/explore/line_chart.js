/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/
import {
    setIndexTime
} from './spatial_view/spatial_view.js';

import {
    swarmData,
    dataset,
    animalIds
} from './explore.js';

import {
    percentilesLineChart
} from './helpers.js';

import {
    indexTime,
} from './spatial_view/spatial_view';




export let zoomFunction;

let trendChartsZoom = {};
let trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
let lineChartWidth = 5000;
let ratio = 1;
let zoomGroup;
let x;
let y;


export class Chart {

    constructor(opts) {
        // load in arguments from config object
        this.data = opts.data;
        this.element = opts.element;
        // create the chart
        this.draw();
    }

    draw() {
        // define width, height and margin
        this.width = 5000;
        this.height = 500;
        this.margin = {
        top: 10,
        right: 0,
        bottom: 100,
        left: 10
    };

        // set up parent element and SVG
        this.element.innerHTML = '';
        const svg = d3.select(this.element)
          .classed('svg-line-chart-container', true)
          .append('svg')
          .attr('preserveAspectRatio', 'xMinYMin meet')

          .attr('viewBox', '0 0 ' + this.width + ' ' + (this.height + this.margin.bottom))
          // add the class svg-content
          .classed('svg-content', true);

        // we'll actually be appending to a <g> element
        this.plot = svg.append('g')
            .attr('transform',`translate(${this.margin.left},${this.margin.top})`);

        // create the other stuff
        this.createScales();
        this.addAxes();
        this.addLine();
    }

    createScales() {
        // shorthand to save typing later
        const m = this.margin;

        // calculate max and min for data
        const xExtent = d3.extent(this.data, d => d[0]);
        const yExtent = d3.extent(this.data, d => d[1]);

        // force zero baseline if all data points are positive
        if (yExtent[0] > 0) { yExtent[0] = 0; };

        this.xScale = d3.scaleLinear()
            .range([0, this.width-m.right])
            .domain(xExtent);

        this.yScale = d3.scaleLinear()
            .range([this.height-(m.top+m.bottom), 0])
            .domain(yExtent);
    }

    addAxes() {
        const m = this.margin;

        // create and append axis elements
        // this is all pretty straightforward D3 stuff
        const xAxis = d3.axisBottom()
            .scale(this.xScale)
            .ticks(d3.timeMonth);

        const yAxis = d3.axisLeft()
            .scale(this.yScale)
            .tickFormat(d3.format("d"));

        this.plot.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${this.height-(m.top+m.bottom)})`)
            .call(xAxis);

        this.plot.append("g")
            .attr("class", "y axis")
            .call(yAxis)
    }

    addLine() {
        const line = d3.line()
            .x(d => this.xScale(d[0]))
            .y(d => this.yScale(d[1]));

        this.plot.append('path')
            // use data stored in `this`
            .datum(this.data)
            .classed('line',true)
            .attr('d',line)
            // set stroke to specified color, or default to red
            .style('stroke', this.lineColor || 'red');
    }

    // the following are "public methods"
    // which can be used by code outside of this file

    setColor(newColor) {
        this.plot.select('.line')
            .style('stroke', newColor);

        // store for use when redrawing
        this.lineColor = newColor;
    }

    setData(newData) {
        this.data = newData;

        // full redraw needed
        this.draw();
    }

    getData(){
        return this.data;
    }

    zoomFunction(){

      d3.scaleLinear()
        .domain([0, this.data.length])
        .range([0, this.width]);
      }

    updateLineChart() {
        if (d3.select('#lineChartTimeLine') && swarmData[Math.ceil(indexTime / ratio)]) {
            let tmp = Math.ceil(indexTime / ratio);
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
                .attr('transform', 'translate(' + this.zoomFunction(tmp) + ',0)');
        }
    }




};

export function initTrendChartListener() {
    $('.draw-details').click(function() {
        if ($(this).find('input:checkbox').prop('checked')) {
            disableLineChart();
            addTrendChart(this);
        } else {
            removeTrendChart();
            enableLineChart();
        }
    });
}






//ratio = Math.ceil(swarmData.length / lineChartWidth);
    //console.log(swarmData);
    //let result = swarmData.map(obj => ({time:obj.time, dist_cen:obj.distance_centroid}));
    //console.log(result);





//linechart.draw();
//let swarmDat = new swarmData();
