/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set */
'use strict';
import {
    dataset,
    networkData,
    swarmData
} from '../explore.js';

import {
    networkColorScale,
    networkAuto,
    setNetworLimit,
    networkLimit,
    // showNetworkHierarchy,
    // networkID,
    // networkBackground,
    // networkBackgroundLimit
} from '../network.js';

import {
    //lineChart,
    updateLineChart,
    LineChart
} from '../line_chart';

import {
    percentiles,
    makeResizable,
    defaultConfig
} from '../helpers.js';

import {
    setTimeSlider,
    initTooltip,
    tooltipFunction,
    initSliders,
    tooltip
} from './interaction.js';

import {
    metadataColor
} from '../metadata.js';

import {
    initColorPicker,
    returnColorScale
} from './color_picker.js';

import {
    initListeners,
    playBoolean,
    Listener
} from '../listener.js';

import {
    addSpatialViewGroup
} from './legend.js';

import {
    updateDendrogram,
    setHierarchyLevel,
    drawHierarchy,
    initDendrogramLegend,
    // networkHierarchyIds,
    // sethierarchyGroupStdev,
    resethierarchyGroupStdev,
    Drawer,
    Dendrogram
} from '../hierarchy.js';

import {
    trackingBoolean,
    addTrackedData
} from '../visual_parameter.js';


export let indexTime = 0; // actual time moment in the animation
export let tankWidth;
export let tankHeight;
export let activeScale = 'black'; // can be speed, acceleration, .. and black (meaning no active scale)
export let medoidAnimal = -1; // which animal is the medoid (-1 is no animal)
export let activeAnimals = []; // active selected animals
export let arrayAnimals; // array of animals for the specific time frame

let svgContainer; // svg container for the spatial view
let tank; // svg group for the spatial view tank
// let networkBakData = {};

/**
* Base class drawer
*/

/**
 * Initialize the spatial view with all the important factors
 */

export class SpatialView extends Drawer {
  constructor(){
    this.spatialViewInit();
  }
  spatialViewInit(){

      let minPoint = parameters['min']['geometry']['coordinates'];
      let maxPoint = parameters['max']['geometry']['coordinates'];
      // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
      // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
      this.tankWidth = (maxPoint[0] - minPoint[0]) * 1.02;
      this.tankHeight = (maxPoint[1] - minPoint[1]) * 1.02;
      //X and Y axis
      let x = d3.scaleLinear()
          .domain([minPoint[0], maxPoint[0]])
          .range([minPoint[0], maxPoint[0]]);

      let xAxis = d3.axisBottom(x)
          .ticks(10)
          .tickSize(10)
          .tickPadding(5);

      let y = d3.scaleLinear()
          .domain([minPoint[1], maxPoint[1]])
          .range([minPoint[1], maxPoint[1]]);

      let yAxis = d3.axisRight(y)
          .ticks(7)
          .tickSize(10)
          .tickPadding(5);

      // ZOOMING AND PANNING STUFF
      let zoomGroup;
      let zoom = d3.zoom()
          .scaleExtent([1, 6])
          .on('zoom', function() {
              //constrained zooming
              // modify the translate so that it never exits the tank
              d3.event.transform.x = Math.min(0, this.tankWidth * (d3.event.transform.k - 1),
                  Math.max(this.tankWidth * (1 - d3.event.transform.k), d3.event.transform.x));

              d3.event.transform.y = Math.min(0, this.tankHeight * (d3.event.transform.k - 1),
                  Math.max(this.tankHeight * (1 - d3.event.transform.k), d3.event.transform.y));

              // translate and scale
              this.zoomGroup.attr('transform', d3.event.transform);

              // rescale the axis
              gXaxis.call(xAxis.scale(d3.event.transform.rescaleX(x)));
              gYaxis.call(yAxis.scale(d3.event.transform.rescaleY(y)));
          });

      //the svg container
      this.svgContainer = d3.select('#main-vis')
          .classed('svg-container', true)
          // to make it responsive with css
          .append('svg')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', '0 0 ' + this.tankWidth + ' ' + this.tankHeight)
          // add the class svg-content
          .classed('svg-content', true)
          .attr('id', 'main-vis-svg')
          .call(zoom);

      /* depends on svg ratio, for e.g 1240/1900 = 0.65 so padding-bottom = 65% */
      let percentage = Math.ceil((this.tankHeight / this.tankWidth) * 100);
      $('#main-vis').append($('<style>#main-vis::after {padding-top: ' + percentage + '%;display: block;content: "";}</style> '));

      this.zoomGroup = this.svgContainer.append('svg:g');

      // Visualize the background image if it is uploaded
      if (parameters.background_image) {
          this.zoomGroup
              .append('image')
              .attr('xlink:href', '/' + parameters.background_image)
              .attr('class', 'background-image')
              .attr('height', this.tankHeight)
              .attr('width', this.tankWidth)
              .attr('x', '0')
              .attr('y', '0');
      }

      //append the tank group with a transformation which rotates the y axis
      this.tank = this.zoomGroup.append('svg:g')
          .attr('class', 'tank')
          .attr('transform', function() {
              let x = parameters.inverted_x ? -1 : 1;
              let y = parameters.inverted_y ? -1 : 1;
              return 'scale(' + x + ',' + y + ')';
          });

      //add the centroid
      this.tank.append('g')
          .attr('id', 'g-centroid')
          .append('circle')
          .attr('class', 'centroid')
          .attr('r', 6)
          .attr('cx', 0)
          .attr('cy', 0);

      // arrow for the centroid direction
      this.tank.select('#g-centroid')
          .append('svg:defs')
          .append('svg:marker')
          .attr('id', 'centroid-arrow')
          .attr('refX', 2)
          .attr('refY', 6)
          .attr('markerWidth', 13)
          .attr('markerHeight', 13)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M2,2 L2,11 L10,6 L2,2');

      // Append the line for the direction arrow
      this.tank.select('#g-centroid')
          .append('line')
          .attr('id', 'centroid-line')
          .attr('marker-end', 'url(#centroid-arrow)');

      //append network  group
      this.tank.append('g')
          .attr('id', 'network-group');

      //append delaunay-triangulation group
      this.tank.append('g')
          .attr('id', 'delaunay-triangulation-group');

      //append voronoi group
      this.tank.append('g')
          .attr('id', 'vornoi-group');

      //append the frame time text
      this.svgContainer.append('text')
          .attr('class', 'frame-text')
          .attr('x', 30)
          .attr('y', 30)
          .text('-- : -- : -- ');

      // add the axis
      let gXaxis = this.svgContainer.append('g')
          .attr('class', 'x axis')
          .call(xAxis);

      let gYaxis = this.svgContainer.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

      // init stuff from other modules
      initTooltip();
      initSliders();
      addSpatialViewGroup();
      initColorPicker();
      var linechart = new LineChart(swarmData);
      //var listener = new Listener();
      //var dendrogram = new Dendrogram();
      makeResizable(tankHeight, tankWidth);
      defaultConfig();
      // start the animation
      this.draw();
  };






}



/**
 * Drawing function - is called for each timestep
 * indexTime saves the current time
 */


/************************************************
    Setter
 *************************************************/

/**
 * Set the index time to a new value
 * @param {Number} value - new time step
 */
export function setIndexTime(value) {
    if (typeof value === 'number' && (indexTime <= swarmData.length)) {
        indexTime = value;
    } else {
        indexTime = 0;
    }
}

/**
 * Decrease time by 1
 */
export function decIndexTime() {
    indexTime = indexTime - 1;
}

/**
 * Set the the new active scale - e.g. speed, acceleration, black etc.
 * @param {String} value - active scale for the individual animals
 */
export function setActiveScale(value) {
    activeScale = value;
}

/**
 * Set the new medoid animal
 * @param {Number} value - Unique id of the animal
 */
export function setMedoidAnimal(value) {
    medoidAnimal = value;
}

/**
 * Set the selected and highlighted animals
 * @param {array} value - array of unqiue id of the animals
 */
export function setActiveAnimals(value) {
    activeAnimals = value;
}
