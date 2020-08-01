/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/
import {
    setIndexTime,
    Drawer
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
//let this.trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
//let lineChartWidth = 5000;
let ratio = 1;
let zoomGroup;
let x;
let y;







//ratio = Math.ceil(swarmData.length / this.lineChartWidth);
    //console.log(swarmData);
    //let result = swarmData.map(obj => ({time:obj.time, dist_cen:obj.distance_centroid}));
    //console.log(result);





//linechart.draw();
//let swarmDat = new swarmData();
