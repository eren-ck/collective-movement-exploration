/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, colorbrewer, Set */
'use strict';
import {
    dataset,
    networkData,
    swarmData,
    animalIds,
    datasetMetadata,
    setNetworkData,
    //setHierarchyData,
    dataSetPercentile,
    networkHierarchy
} from '../explore.js';

import {
    networkColorScale,
    networkAuto,
    setNetworLimit,
    networkLimit,
    showNetworkHierarchy,
    setnetworkColor
    // networkID,
    // networkBackground,
    // networkBackgroundLimit
} from '../network.js';



import {
    percentiles,
    makeResizable,
    defaultConfig,
    disablePlayButton,
    enablePlayButton,
    percentilesLineChart
} from '../helpers.js';

import {
    setTimeSlider,
    initTooltip,
    tooltipFunction,
    initSliders,
    tooltip,
    slider
} from './interaction.js';

import {
    metadataColor
} from '../metadata.js';



import {
    initListeners,

} from '../listener.js';

import {
    addSpatialViewGroup
} from './legend.js';

import {
    //updateDendrogram,
    //setHierarchyLevel,
    //getHierarchyLevel,
    //drawHierarchy,
    initDendrogramLegend,
    addHierarchyButton,
    removeHierarchyButton,
    hierarchyColors,
    colors,
    // networkHierarchyIds,
    // sethierarchyGroupStdev,
    resethierarchyGroupStdev,
    hierarchyGroupStdev,
    maxNumberHierarchies,
    treemap,
    setOperation,
    //collapse,
    hierarchyLevels,
    diagonalLines,
    //click,
    //getHierarchyVertices,
    Dendrogram
} from '../hierarchy.js';

import {
    trackingBoolean,
    addTrackedData
} from '../visual_parameter.js';


import {
    getDatasetFeature,
    getNetworkData,
    getSwarmDatasetFeature,
    //getNetworkHierarchyData
} from '../ajax_queries.js';


 // svg container for the spatial view
 // svg group for the spatial view tank
// let networkBakData = {};

//export let indexTime = 0; // actual time moment in the animation

// array of animals for the specific time frame


// Drawer Setup



let JSONAPI_MIMETYPE = 'application/vnd.api+json';
let trendChartsZoom = {};
//let this.trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
//let lineChartWidth = 5000;


// Listener Setup
// brushing variable
export let playBoolean = true;


// Linechart Setup
let ratio = 1;
let zoomGroup;
let x;
let y;
export let zoomFunction;





/**
* Base class drawer
*/

/**
 * Initialize the spatial view with all the important factors
 */
export class Drawer {
   constructor(){
     this.indexTime=0;
     // Tank Base
     this.svgContainer = d3.select('#main-vis')


     this.zoom = d3.zoom()
         .scaleExtent([1, 6])
         .on('zoom', ()=>{
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
     this.zoomGroup = this.svgContainer.append('svg:g');
     this.tank = this.zoomGroup.append('svg:g')
               .attr('class', 'tank')
               .attr('transform', ()=>{
                   let x = parameters.inverted_x ? -1 : 1;
                   let y = parameters.inverted_y ? -1 : 1;
                   return 'scale(' + x + ',' + y + ')';
               });

    // actual time moment in the animation

     this.activeScale = 'black'; // can be speed, acceleration, .. and black (meaning no active scale)
     this.colorScale = {
         type: 'Linear',
         color: colorbrewer.BuYlBu
     };
     this.legendWidth = 550;
     this.legendHeight = 60;

     this.svgLegend = d3.select('#main-vis-legend-div')
         .append('svg')
         .attr('id', 'main-vis-legend')
         .attr('width', this.legendWidth)
         .attr('height', this.legendHeight);

     this.medoidAnimal = -1; // which animal is the medoid (-1 is no animal)
     this.activeAnimals = []; // active selected animals
     this.arrayAnimals = dataset.filter((d)=>{
         return d['t'] === this.indexTime;
     });// array of animals for the specific time frame
     this.id = $('.show-dendrogram.btn-primary').attr('data');
     this.playBoolean = true;
     this.hierarchyLevels = {};
     this.hierarchyGroupStdev = {};
     this.brush = d3.brush()
         .extent([
             [0, 0],
             [this.tankWidth, this.tankHeight]
         ]);
     this.svgLegend_netw = d3.select('#hierarchy-legend-div');
     this.dendrozoom = this.zoomGroup;
     this.networkColor = {};




   }
   setIndexTime(value) {
       if (typeof value === 'number' && (this.indexTime <= swarmData.length)) {
           this.indexTime = value;
       } else {
           this.indexTime = 0;
       }
   }
   setActiveScale(value) {
       this.activeScale = value;
  }
   setActiveAnimals(value) {
      this.activeAnimals = value;
  }
   decIndexTime() {
       this.indexTime = this.indexTime - 1;
   }
   updateLineChart() {
       if (d3.select('#lineChartTimeLine') && swarmData[Math.ceil(this.indexTime / ratio)]) {
           let tmp = Math.ceil(this.indexTime / ratio);
           //update the line chart legend text values per second
           if (this.indexTime % 25 === 0) {
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
   returnColorScale() {
       //if linear is choosen
       if (this.colorScale['type'] === 'Linear') {
           return d3.scaleLinear()
               .domain(
                   dataSetPercentile[this.activeScale]
               )
               .range(this.colorScale['color']);
       } //Threshold color scale
       else if (this.colorScale['type'] === 'Threshold') {
           return d3.scaleThreshold()
               .domain(
                   dataSetPercentile[this.activeScale]
               )
               .range(this.colorScale['color']);
       }
   }
   initColorPicker() {
       d3.select('.colors-body')
           .selectAll('.palette')
           .data(d3.entries(colorbrewer))
           .enter()
           .append('span')
           .attr('class', 'palette')
           .attr('title', (d)=>{
               return d.key;
           })
           .on('click', (d)=>{
               // hightlight the right palette
               $('.palette').removeClass('selected');
               $('.palette[title="' + d.key + '"]').addClass('selected');
               this.colorScale.color = colorbrewer[d.key];
               this.changelegend();
               if (!$('#play-button')
                   .hasClass('active')) {
                   //go back one second and draw the next frame
                   //this applys the changes
                   this.decIndexTime();
                   this.draw();
               }
           })
           .selectAll('.swatch')
           .data((d)=>{
               return d.value;
           })
           .enter()
           .append('span')
           .attr('class', 'swatch')
           .style('background-color', (d)=>{
               return d;
           });

       // highlight the selected color scheme
       $('.palette[title="BuYlBu"]').addClass('selected');
   }
   changelegend() {
       let legend; // the color legend
       let legendText; // color legend text
       // vars for the legend
       let legendSwatchWidth = 50;
       let legendSwatchHeight = 20;
       // let differentColors = 0;


       // Show the svg first of all
       $('#main-vis-legend-div')
           .show();

       //change the colors of the animals
       if (this.activeScale !== 'black') {
           var tmpScale = this.returnColorScale();
           // once the fill for the heads and the stroke for the path
           legend = this.svgLegend.selectAll('rect.legend')
               .data(tmpScale.range());

           legendText = this.svgLegend.selectAll('text.legend-text')
               .data(tmpScale.domain());
           // differentColors = tmpScale.range()
           // .length;
       } else {
           legend = this.svgLegend.selectAll('rect.legend')
               .data([]);
           legendText = this.svgLegend.selectAll('text.legend-text')
               .data([]);
           // hide the div again
           $('#main-vis-legend-div')
               .hide();
       }

       // --------------- Legend swatches  -------------------
       // UPDATE - legend
       legend.style('fill', function(d) {
           return d;
       });
       // ENTER - legend
       legend
           .enter()
           .append('rect')
           .attr('class', 'legend')
           .attr('width', legendSwatchWidth)
           .attr('height', legendSwatchHeight)
           .attr('y', 0)
           .attr('x', function(d, i) {
               return (legendSwatchWidth + i * legendSwatchWidth) + 'px';
           })
           .style('fill', function(d) {
               return d;
           });
       // EXIT - legend
       legend.exit()
           .remove();

       // --------------- Text  -------------------
       // UPDATE - legend text
       legendText.text(function(d) {
           return Math.ceil(d * 2) / 2;
       });
       // ENTER - legend text
       legendText
           .enter()
           .append('text')
           .attr('class', 'legend-text')
           .attr('y', 2 * legendSwatchHeight)
           .attr('x', function(d, i) {
               // plus 5 has to be changed
               return (legendSwatchWidth + i * legendSwatchWidth + 5) + 'px';
           })
           .text(function(d) {
               return Math.ceil(d * 2) / 2;
           });

       // EXIT - legend text
       legendText.exit()
           .remove();
   }

   draw() {

       //update time to wait aka speed of replay
       let timeToWait = $('input[type="radio"].group-playback-rate:checked')
           .val();
       //scale the size by this number
       let animalScale = $('input[type="radio"].group-size:checked')
           .val();

       //get the next animals
       this.arrayAnimals = dataset.filter((d)=>{
           return d['t'] === this.indexTime;
         });


       //the timeout is set after one update 30 ms
       setTimeout(()=>{
               // draw hierarchy
               this.drawDendrogram();
               //change the time frame text
               this.svgContainer.select('.frame-text')
                   .text(Math.floor(this.indexTime / 1500) % 60 + ':' + Math.floor(this.indexTime / parameters['fps']) % 60 + '::' + this.indexTime % parameters['fps']);
               // if a second has changed move the slider
               if (this.indexTime % parameters['fps'] === 0) {
                   setTimeSlider(this.indexTime);
               }

               let svgAnimals = this.tank.selectAll('g.animal')
                   .data(this.arrayAnimals);

               // Network vis
               let networkVis;
               // let networkVisBak;
               if (this.indexTime in networkData) {
                   let network = networkData[this.indexTime];
                   // reset the group standard deviation for the hierarhcy
                   // needed for coloring of the dendrogram nodes (variacne)
                   resethierarchyGroupStdev();

                   // display the whole network
                   network = network.map((item)=>{
                       let animal1 = this.arrayAnimals.filter(function(obj) {
                           return obj['a'] === item['s'];
                       })[0];
                       let animal2 = this.arrayAnimals.filter(function(obj) {
                           return obj['a'] === item['e'];
                       })[0];
                       return {
                           'node1': animal1['a'],
                           'node2': animal2['a'],
                           'start': animal1['p'],
                           'end': animal2['p'],
                           'val': item['v']
                       };
                   });

                   network.forEach(function(d) {
                       $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', networkColorScale(d['val']));
                       $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', networkColorScale(d['val']));
                   });

                   if (networkAuto) {
                       let tmpArray = [];
                       for (let i = 0; i < network.length; i++) {
                           tmpArray.push(network[i]['val']);
                       }
                       setNetworLimit(percentiles(tmpArray));
                   }
                   network = network.filter(function(d) {
                       return d['val'] <= (1 - networkLimit);
                   });
                   // DATA JOIN
                   networkVis = this.tank.select('#network-group')
                       .selectAll('line.network-edges')
                       .data(network);
                   // UPDATE
                   networkVis
                       .attr('x1', function(d) {
                           return d['start'][0];
                       })
                       .attr('y1', function(d) {
                           return -d['start'][1];
                       })
                       .attr('x2', function(d) {
                           return d['end'][0];
                       })
                       .attr('y2', function(d) {
                           return -d['end'][1];
                       })
                       .attr('stroke', function(d) {
                           return networkColorScale((1 - d['val']));
                       })
                       .attr('stroke-opacity', function(d) {
                           return 1 - d['val'];
                       });
                   //ENTER

                   networkVis
                       .enter()
                       .append('line')
                       .attr('class', 'network-edges')
                       .attr('x1', function(d) {
                           return d['start'][0];
                       })
                       .attr('y1', function(d) {
                           return -d['start'][1];
                       })
                       .attr('x2', function(d) {
                           return d['end'][0];
                       })
                       .attr('y2', function(d) {
                           return -d['end'][1];
                       })
                       .attr('stroke', function(d) {
                           return networkColorScale(d['val']);
                       })
                       .attr('stroke-opacity', function(d) {
                           return d['val'];
                       });

               } else {
                   networkVis = this.tank.selectAll('line.network-edges')
                       .data([]);

               }
               // EXIT - network
               networkVis.exit()
                   .remove();

               // delaunay triangulation
               // DATA JOIN  - triangulation
               var triangulation;
               if ($('#draw-triangulation')
                   .is(':checked')) {
                   //console.log([swarmData[this.indexTime]['triangulation']]);
                   triangulation = this.tank.select('#delaunay-triangulation-group')
                       .selectAll('path.delaunay-triangulation')
                       .data([swarmData[this.indexTime]['triangulation']]);
                   // UPDATE - triangulation
                   triangulation
                       .attr('d', (d)=>{
                           return d;
                       });
                   //ENTER - triangulation
                   triangulation.enter()
                       .append('path')
                       .attr('class', 'delaunay-triangulation')
                       .attr('d', (d)=>{
                           return d;
                       });
               } else {
                   triangulation = this.tank.selectAll('path.delaunay-triangulation')
                       .data([]);
               }
               // EXIT - triangulation
               triangulation.exit()
                   .remove();

               // Voronoi
               // DATA JOIN  - voronoi
               var voronoi;
               if ($('#draw-voronoi')
                   .is(':checked')) {
                   //console.log(this.indexTime);
                   //console.log('ho');
                   //console.log([swarmData[this.indexTime]['voronoi']]);

                //append the group for the voronoi paths
                // This is a workaround to avoid voronoi stopping at split if empty value.
                if (!('voronoi' in swarmData[0])){
                   voronoi = this.tank
                       .select('#vornoi-group')
                       .selectAll('path.voronoi')
                       .data([swarmData[this.indexTime]['voronoi']])
                     }
                else {
                  voronoi = this.tank
                       .select('#vornoi-group')
                       .selectAll('path.voronoi')
                       .data(swarmData[this.indexTime]['voronoi'].split(';'));
                }

                   //console.log(swarmData[this.indexTime]['voronoi']);

                   // UPDATE - voronoi
                   voronoi
                       .attr('d', (d)=>{
                           return d;
                       });
                   //ENTER - voronoi
                   voronoi.enter()
                       .append('path')
                       .attr('class', 'voronoi')
                       .attr('d', (d)=>{
                           return d;
                       });

               } else {
                   voronoi = this.tank.select('#vornoi-group')
                       .selectAll('path.voronoi')
                       .data([]);
               }
               // EXIT - voronoi
               voronoi.exit()
                   .remove();

               //ENTER - append the animal groups
               let animalGroupings = svgAnimals
                   .enter()
                   .append('g')
                   .attr('class', 'animal')
                   .attr('id', (d)=>{
                       return 'animal-' + d['a'];
                   });

               // Append the circles for each animal to the animalgroup
               animalGroupings.append('circle')
                   .attr('r', 1.5 * animalScale)
                   .attr('cx', (d)=> {
                       return d['p'][0];
                   })
                   .attr('cy', (d)=> {
                       return -d['p'][1];
                   })
                   .on('mouseover', (d)=>{
                       tooltipFunction(d);
                   })
                   .on('mouseout', ()=>{
                       tooltip
                           .transition()
                           .duration(500)
                           .style('opacity', 0);
                   })
                   // add on click for the active fishs
                   .on('click', (d)=> {
                       if (this.activeAnimals.includes(d['a'])) {
                           this.activeAnimals = this.activeAnimals.filter(item => item !== d['a']);
                       } else {
                           this.activeAnimals.push(d['a']);
                       }
                       if (!$('#play-button')
                           .hasClass('active')) {
                           //go back one second and draw the next frame
                           //this applys the changes
                           this.indexTime--;
                           this.draw();
                       }
                   });

               // UPDATE - animals circles
               svgAnimals.select('circle')
                   .attr('cx', (d)=> {
                       return d['p'][0];
                   })
                   .attr('cy', (d)=> {
                       return -d['p'][1];
                   })
                   .attr('r', animalScale);
                //console.log(svgAnimals.select('circle'));
               // Append for each group the arrow, needed for coloring
               animalGroupings.append('svg:defs')
                   .append('svg:marker')
                   .attr('id', (d)=>{
                       return 'arrow-marker-' + d['a'];
                   })
                   .attr('refX', 2)
                   .attr('refY', 6)
                   .attr('markerWidth', 13)
                   .attr('markerHeight', 13)
                   .attr('orient', 'auto')
                   .append('svg:path')
                   .attr('d', 'M2,2 L2,11 L10,6 L2,2');

               // Append the line for the direction arrow
               animalGroupings
                   .append('line')
                   .attr('class', 'arrow')
                   .attr('marker-end', (d)=>{
                       return 'url(#arrow-marker-' + d['a'] + ')';
                   });

               //execute only when draw direction button is checked
               if ($('#draw-direction')
                   .is(':checked')) {
                   // UPDATE animal direction arrow
                   svgAnimals.select('line')
                       .attr('x1', (d)=>{
                           return d['p'][0];
                       })
                       .attr('y1', (d)=> {
                           return -d['p'][1];
                       })
                       .attr('x2', (d)=>{
                           return (d['p'][0] + 2 * animalScale);
                       })
                       .attr('y2', (d)=>{
                           return (-d['p'][1]);
                       })
                       .attr('transform', (d)=>{
                           return 'rotate(' + -d['direction'] + ' ' + d['p'][0] + ' ' + -d['p'][1] + ')';
                       });
               } else {
                   // hide the arrows
                   $('.arrow').hide();
               }

               // EXIT - the groups
               svgAnimals.exit()
                   .remove();

               //Convex hull
               if ($('#draw-convex-hull')
                   .is(':checked')) {
                   // DATA JOIN - paths
                   var hullPath = this.tank.selectAll('path.hull-path')
                       .data([swarmData[this.indexTime]['convex_hull']]);

                   // UPDATE - hull path
                   hullPath
                       .attr('d', (d)=>{
                           return d;
                       });

                   // ENTER - hull paths
                   hullPath.enter()
                       .append('path')
                       .attr('class', 'hull-path')
                       .attr('d', (d)=>{
                           return d;
                       });

               } else {
                   // draw no hull
                   hullPath = this.tank.select('path.hull-path')
                       .data([]);
               }
               // EXIT - hull paths
               hullPath.exit()
                   .remove();

               //change the colors of the fish
               if (this.activeScale !== 'black') {
                   // once the fill for the heads and the stroke for the path
                   var tmpScale = this.returnColorScale();
                   svgAnimals
                       .transition()
                       .duration(10)
                       .style('fill', (d)=>{
                           return tmpScale(d[this.activeScale]);
                       })
                       .attr('stroke', (d)=>{
                           return tmpScale(d[this.activeScale]);
                       });
               } else {
                   //color every fish black
                   svgAnimals
                       .style('fill', '#000')
                       .attr('stroke', '#000');

                   if (!$.isEmptyObject(metadataColor)) {
                       Object.keys(metadataColor).forEach(function(key) {
                           d3
                               .select('#animal-' + key)
                               .style('fill', metadataColor[key])
                               .attr('stroke', metadataColor[key]);
                       });
                   }
               }

               //change opactiy if the fish is selected
               if (this.activeAnimals.length) {
                   svgAnimals
                       .style('opacity', (d)=>{
                           if (this.activeAnimals.includes(d['a'])) {
                               return 1;
                           } else {
                               return 0.25;
                           }
                       });
                   if ($('#remove-active-selected-button')
                       .is(':disabled')) {
                       $('#remove-active-selected-button')
                           .prop('disabled', false);
                       $('#visual-parameter-button')
                           .prop('disabled', false);
                   }
                   // if tracking is on
                   if (trackingBoolean) {
                       addTrackedData(this.arrayAnimals[0]['t'], this.activeAnimals);
                   }
               } else {
                   if (!$('#remove-active-selected-button')
                       .is(':disabled')) {
                       $('#remove-active-selected-button')
                           .prop('disabled', true);
                       $('#visual-parameter-button')
                           .prop('disabled', true);
                   }
                   // normal opacity
                   svgAnimals
                       .style('opacity', 1);
               }

               //draw centroid
               d3.select('.centroid')
                   .attr('cx', ()=>{
                       if ('centroid' in swarmData[0]) {
                           return swarmData[this.indexTime]['centroid'][0];
                       } else {
                           return 0;
                       }
                   })
                   .attr('cy', ()=>{
                       if ('centroid' in swarmData[0]) {
                           return -swarmData[this.indexTime]['centroid'][1];
                       } else {
                           return 0;
                       }
                   });
               if ($('#draw-direction').is(':checked') &&
                   swarmData[this.indexTime].centroid &&
                   $('#draw-centroid').is(':checked')) {
                   d3.select('#centroid-line')
                       .classed('hidden', false);
                   // UPDATE animal direction arrow
                   d3.select('#centroid-line')
                       .attr('x1', ()=>{
                           return swarmData[this.indexTime]['centroid'][0];
                       })
                       .attr('y1', ()=>{
                           return -swarmData[this.indexTime]['centroid'][1];
                       })
                       .attr('x2', ()=>{
                           return (swarmData[this.indexTime]['centroid'][0] + 2 * animalScale);
                       })
                       .attr('y2', ()=>{
                           return -swarmData[this.indexTime]['centroid'][1];
                       })
                       .attr('transform', ()=>{
                           return 'rotate(' + -swarmData[this.indexTime]['direction'] + ' ' + swarmData[this.indexTime]['centroid'][0] + ' ' + -swarmData[this.indexTime]['centroid'][1] + ')';
                       });
               } else {
                   // hide the arrows
                   d3.select('#centroid-line')
                       .attr('class', 'hidden');
               }

               // medoid
               if (this.medoidAnimal !== -1) {
                   d3.selectAll('#animal-' + this.medoidAnimal)
                       .classed('medoid', false);
                   this.medoidAnimal = swarmData[this.indexTime]['medoid'];
                   d3.selectAll('#animal-' + this.medoidAnimal)
                       .classed('medoid', true);
               }

               //next frame
               this.indexTime++;

               this.updateLineChart();


               //check if play button is active and if the animation is not finished
               if (this.indexTime >= swarmData.length) {
                   //start again from the start
                   this.indexTime = 0;
                   this.draw();
               } else if (this.playBoolean) {
                   //measure execution time
                   //   let t1 = performance.now();
                   //   console.log(t1 - t0); // in milliseconds
                   this.draw();
               }
           },
           timeToWait);
   }

   initDendrogram() {
       // constanct factors for the dendgrogram
       let margin = 20,
           width = 5000,
           height = 5000;

       // zoom function for the dendrogram
       let zoom = d3.zoom()
           .scaleExtent([1, 10])
           .on('zoom', ()=>{
               //constrained zooming
               d3.event.transform.x = Math.min(0, width * (d3.event.transform.k - 1),
                   Math.max(width * (1 - d3.event.transform.k), d3.event.transform.x));

               d3.event.transform.y = Math.min(0, height * (d3.event.transform.k - 1),
                   Math.max(height * (1 - d3.event.transform.k), d3.event.transform.y));

               // translate and scale
               this.dendrozoom.attr('transform', d3.event.transform);
           });

       // svg container for the dendrogram
       let svg = d3.select('#dendrogram-panel')
           .classed('svg-dendrogram-container', true)
           .append('svg')
           .attr('preserveAspectRatio', 'xMinYMin meet')
           .attr('viewBox', '0 0 ' + width + ' ' + height)
           // add the class svg-content
           .classed('svg-content-dendrogram', true)
           .call(zoom);

       initDendrogramLegend();

       // append the zoom group to the svg
       this.dendrozoom = svg.append('g')
           .attr('transform', 'translate(' + margin + ',' + margin + ')')
           .append('svg:g');

       // d3 tree
       let treemap = d3.tree() //d3.cluster()
           .size([(height - 10 * margin), (width - 10 * margin)]);

       // set the spatial view - needed to add the clustering to the spatial view window
       let spatialView = d3.select('.tank');

       // init dendrogram slider
       // initialize the Network slider
       $('#dendrogram-panel-level-slider')
           .slider({
               range: 'max',
               min: 2,
               max: 2,
               step: 1,
               value: this.hierarchyLevels['h0'],
               slide: (event, ui)=>{
                   let id = $('.show-dendrogram.btn-primary').attr('data');
                   this.setHierarchyLevel(id, ui.value);
                   this.updateDendrogram();
                   // if no animation is active draw the new clustering and dendrogram
                   // drawDendrogram();
                   if (!$('#play-button').hasClass('active')) {
                       //go back one second and draw the next frame
                       //this applys the changes
                       this.decIndexTime();
                       this.draw();
                       this.drawDendrogram();
                   }
               }
           });
       let tooltipDiv;
       // init the tooltip for the dendrogram
       tooltipDiv = d3.select('#dendrogram-tooltip')
           .style('left', 0 + 'px')
           .style('top', 0 + 'px')
           .on('mouseover', function() {
               tooltipDiv
                   .style('opacity', 1);
           });
       // init the hierarchy legend
       let legendWidth = maxNumberHierarchies * 100;
       let legendHeight = 60;

       this.svgLegend_netw = d3.select('#hierarchy-legend-div')
           .append('svg')
           .attr('id', 'hierarchy-legend')
           .attr('width', legendWidth)
           .attr('height', legendHeight);

       // add pattern for striped background of intersections etc.
       spatialView.append('defs')
           .append('svg:pattern')
           .attr('id', 'striped')
           .attr('patternUnits', 'userSpaceOnUse')
           .attr('width', '20')
           .attr('height', '5')
           .attr('patternTransform', 'rotate(60)')
           .append('rect')
           .attr('width', 5)
           .attr('height', 10)
           .attr('transform', 'translate(0,0)')
           .style('fill', '#67000d');

   };
   click(d) {
       setActiveAnimals(d['data']['name']);
       // if no animation is active draw the draw one step
       if (!$('#play-button').hasClass('active')) {
           this.decIndexTime();
           this.draw();
       }
   }
   sethierarchyGroupStdev(key, value) {
       if (key in this.hierarchyGroupStdev) {
           this.hierarchyGroupStdev[key].push(value);
       } else {
           this.hierarchyGroupStdev[key] = [value];
       }
   }

   /**
    * Reset hierarchy group standard deviation
    */
   resethierarchyGroupStdev() {
       this.hierarchyGroupStdev = {};
   }
   getHierarchyLevel(root, hierarchy) {
    let result = [];
    let level = this.hierarchyLevels['h' + hierarchy];

    // second level of the array
    let tmp_nodes = root['children'];
    // iterate through the tree
    for (let i = 1; i < root['height']; i++) {
        // check if we are at the searched level
        if (tmp_nodes[0] && tmp_nodes[0]['depth'] === level) {
            // add each cluster to the result set
            tmp_nodes.forEach(function(node) {
                if (typeof node['data']['name'] !== 'undefined') {
                    result.push(node['data']['name']);
                }
            });
            break;
        }
        // get all children of a specific level in the tree
        let tmp = [];
        tmp_nodes.forEach(function(node) {
            if (typeof node['children'] !== 'undefined') {
                tmp = tmp.concat(node['children']);
            }
        });
        tmp_nodes = tmp;
    }
    return result;
}
   setHierarchyLevel(hierarchy, level) {
     // TODO catch cases < 0 and bigger than overall height
     this.hierarchyLevels['h' + hierarchy] = level;
    }
   setHierarchyColor(hierarchy) {
        // check if the hierarchy is already shown as network
        // take the same color
        for (let key in this.networkColor) {
            if (key === ('h' + hierarchy)) {
                hierarchyColors['h' + hierarchy] = this.networkColor[key];
                return;
            }
        }
        // hierarchy is not visualized already as a network
        for (let i = 0; i < colors.length; i++) {
            let tmp_boolean = true;
            for (let key in hierarchyColors) {
                if (hierarchyColors.hasOwnProperty(key)) {
                    if (hierarchyColors[key] === colors[i]) {
                        tmp_boolean = false;
                    }
                }
            }
            if (tmp_boolean) {
                // check if a network is depicted
                // if so skip the color which is already choosen for the network
                if (Object.keys(this.networkColor).length !== 0) {
                    for (let key in this.networkColor) {
                        if (this.networkColor[key] !== colors[i]) {
                            hierarchyColors['h' + hierarchy] = colors[i];
                            return;
                        }
                    }
                } else {
                    hierarchyColors['h' + hierarchy] = colors[i];
                    return;
                }

            }
        }
    }
   removeHierarchyColor(hierarchy) {
        delete hierarchyColors['h' + hierarchy];
    }
   removeHierarchyLevel(hierarchy) {
      // TODO catch cases < 0 and bigger than overall height
      delete this.hierarchyLevels['h' + hierarchy];
  }
   updateDendrogram() {
     // get the important info
     let id = $('.show-dendrogram.btn-primary').attr('data');
     let name = $('.show-dendrogram.btn-primary').attr('name');
     // set the name of the displayed hierarchy
     $('#dendrogram-panel-name').text(name);

     // set slider and  text value
     $('#dendrogram-panel-level-slider').val(this.hierarchyLevels['h' + id]);
     $('#dendrogram-panel-level-text').text(this.hierarchyLevels['h' + id]);

}
   getHierarchyVertices(hierarchies) {
       let result = []; // result set
       hierarchies.forEach((cluster)=>{
           let vertices = []; // vertices of the clusters in the spatial view
           for (let j = 0; j < cluster.length; j++) {
               let groupMember = this.arrayAnimals.find(d => d['a'] === cluster[j]);
               if (groupMember) {
                   vertices.push([groupMember['p'][0], -groupMember['p'][1]]);
               }
           }
           // Andrew montone chain algorithm reutrns for points fewer than 3 null
           if (vertices.length >= 3) {
               result.push(d3.polygonHull(vertices));
           }
       });
       return result;
   }
   drawHierarchy() {
      console.log('hierarchy drawn');

       // id of the hierarchy e.g. [1,5,3]
       let hierarchyIds = Object.keys(networkHierarchy).map(function(x) {
           return x.replace('h', '');
       });
       //  The clustering in an 2D array with which animal id belongs to which group
       let hierarchyVertices = [];

       // iterate over the hierarchy data to get the hierarchy animal ids per clustering and grouping
       for (let i = 0; i < hierarchyIds.length; i++) {
           let treeData = networkHierarchy['h' + hierarchyIds[i]][this.indexTime];
           //console.log(treeData);
           let nodes = d3.hierarchy(treeData, function(d) {
               return d.children;
           });
           let margin = 20,
               width = 5000,
               height = 5000;

           // d3 tree
           let treemap = d3.tree() //d3.cluster()
               .size([(height - 10 * margin), (width - 10 * margin)]);
           nodes = treemap(nodes);
           let root = nodes['children'][0];
           if (showNetworkHierarchy === hierarchyIds[i]) {
               networkHierarchyIds = this.getHierarchyLevel(root, hierarchyIds[i]);
           }
           // add the vertices into the array
           hierarchyVertices.push(this.getHierarchyVertices(this.getHierarchyLevel(root, hierarchyIds[i])));
       }

       // if more than 2 hierarchies are drawn
       if (hierarchyVertices.length > 0) {

       }
       let spatialView = d3.select('.tank');
       // DATA Join
       let hierarchies = spatialView
           .selectAll('g.hierarchy-group')
           .data(hierarchyVertices);

       // ENTER the groups - adds a specific id and color
       hierarchies
           .enter()
           .append('g')
           .attr('class', function(d, i) {
               if (setOperation === 'intersection') {
                   return 'hierarchy-group intersection';
               } else if (setOperation === 'sym-difference') {
                   return 'hierarchy-group sym-difference';
               } else {
                   return 'hierarchy-group h' + hierarchyIds[i];
               }
           })
           .style('fill', function(d, i) {
               return hierarchyColors['h' + hierarchyIds[i]];
           })
           console.log(hierarchyColors);
           .attr('stroke', function(d, i) {
               return hierarchyColors['h' + hierarchyIds[i]];
           })
           .moveToBack();

       // UPDATE - the class needed for intersection and symmetric difference
       hierarchies.attr('class', function(d, i) {
           if (setOperation === 'intersection') {
               return 'hierarchy-group intersection';
           } else if (setOperation === 'sym-difference') {
               return 'hierarchy-group sym-difference';
           } else {
               return 'hierarchy-group h' + hierarchyIds[i];
           }
       });

       // EXIT
       hierarchies.exit()
           .remove();

       // Hierachy hulls added to the spatial view - get the points for each animal in the
       // spatial view so that a convex hull can be calculated
       let hieraryHulls = hierarchies.selectAll('path.hierarchy-hull-path')
           .data(function(d) {
               return d;
           });

       // ENTER and calculate the convex hull
       hieraryHulls
           .enter()
           .append('path')
           // .attr('id', function(d) {
           //     return 'hp' + d.join('').replace(/,/g, '');
           // })
           .attr('class', 'hierarchy-hull-path')
           .attr('d', function(d) {
               // return drawLine(d);
               return 'M' + d.join('L') + 'Z';
           });

       // UPDATE the convex hull
       hieraryHulls
           .attr('d', function(d) {
               // return drawLine(d);
               return 'M' + d.join('L') + 'Z';
           });
       // .attr('id', function(d) {
       // return 'hp' + d.join('').replace(/,/g, '');
       // });
       // EXIT
       hieraryHulls.exit()
           .remove();

   }
   drawDendrogram() {


         var collapse = (d)=>{
          //console.log(this.hierarchyLevels);
          //console.log(d.children);
          //if (d.children && d.depth <= this.hierarchyLevels['h' + this.id])
          if (d.children && d.depth <= 2) {
              d._children = d.children;
              d._children.forEach(collapse);
          } else {
              d.children = 0;
          }
    }

       // get the active dendrogram
       let id = $('.show-dendrogram.btn-primary').attr('data');
       // if data is avaiable draw hierarchy clusters and a button is active selcted
       if (!$.isEmptyObject(networkHierarchy) && id) {
           // get the data and transform it
           let treeData = networkHierarchy['h' + id][this.indexTime];

           let nodes = d3.hierarchy(treeData, function(d) {
               return d.children;
           });
           // skip the root node
           nodes = nodes.children[0];
           // collapse the tree
           nodes.children.forEach(collapse);

           let margin = 20,
               width = 5000,
               height = 5000;

           // d3 tree
           let treemap = d3.tree() //d3.cluster()
               .size([(height - 10 * margin), (width - 10 * margin)]);



           // maps the node data to the tree layout
           nodes = treemap(nodes);
           //console.log(nodes);

           // hide if no network is choosen
           if ($('.show-dendrogram.btn-primary').length) {
              //console.log(hierarchyLevels);
               // set the new slider max
               $('#dendrogram-panel-level-slider')
                   .slider('option', 'max', (nodes['height'] - 1))
                   .slider('value', this.hierarchyLevels['h' + id]);

               // DATA JOIN - links (edges)
               let link = this.dendrozoom
                   .selectAll('path.link')
                   .data(nodes.descendants().slice(1));

               // ENTER
               link
                   .enter()
                   .append('path')
                   .attr('class', 'link')
                   .attr('d', diagonalLines);

               // Transition links to their new position.
               link
                   .attr('d', diagonalLines);

               // EXIT
               link.exit()
                   .remove();

               // DATA JOIN - nodes
               // adds each node as a group
               let node = this.dendrozoom
                   .selectAll('.node')
                   .data(nodes.descendants());

               // add the groups to the dendgrogram
               var nodeEnter = node.enter()
                   .append('g')
                   .attr('class', function(d) {
                       return 'node' +
                           (d.children ? ' node--internal' : ' node--leaf');
                   })
                   .attr('transform', function(d) {
                       return 'translate(' + d.x + ',' + d.y + ')';
                   });

               // ENTER - append for each group a node (circle)
               // with highlighting for the active choosen level
               nodeEnter.append('circle')
                   .attr('r', (d)=>{
                       if (d['depth'] === this.hierarchyLevels['h' + id]) {
                           return 40 + d.data.name.length;
                       } else {
                           return 20 + d.data.name.length;
                       }
                   })
                   .attr('class', (d)=>{
                       if (d['depth'] === this.hierarchyLevels['h' + id]) {
                           return 'active-level';
                       }
                   })
                   .attr('id', (d)=>{
                       return 'h' + d['data']['name'].toString().hashCode();
                   })
                   // TODO find a nice function for the on click method
                   .on('click', this.click)
                   .on('mouseover', function(d) {
                       // tooltip position and text
                       tooltipDiv
                           .style('left', (d3.event.pageX + 5) + 'px')
                           .style('top', (d3.event.pageY + 5) + 'px')
                           .style('opacity', 1);
                       tooltipDiv.select('.tooltip-span').html(d['data']['name'].toString());
                       // add highlight in the spatial view
                       // the undion of the paths makes this complicated
                       addHighlightSpatialView(d['data']['name']);
                   })
                   .on('mouseout', function() {
                       tooltipDiv.transition()
                           .duration(500)
                           .style('opacity', 0);
                       // remove highlight in the spatial view
                       removeHighlightSpatialView();
                   });

               // add the text - # number of animals in the cluster
               nodeEnter.append('text')
                   .attr('class', 'dendrogram-text')
                   .attr('x', 150)
                   .attr('y', -150)
                   .text((d)=>{
                       return d.data.name.length;
                   });

               // UPDATE -- update the groups
               nodeEnter
                   .attr('transform', (d)=>{
                       return 'translate(' + d.x + ',' + d.y + ')';
                   });

               // updae the node and circles
               // with active-level function to highlight which level is chosen
               node
                   .attr('transform', (d)=>{
                       return 'translate(' + d.x + ',' + d.y + ')';
                   })
                   .select('circle')
                   .attr('r', (d)=>{
                       if (d['depth'] === this.hierarchyLevels['h' +id]) {
                           return 40 + d.data.name.length;
                       } else {
                           return 20 + d.data.name.length;
                       }
                   })
                   .attr('class', (d)=> {
                       if (d['depth'] === this.hierarchyLevels['h' + id]) {
                           // console.log('active-level');
                           // console.log(('h' + d['data']['name'].toString().hashCode()));
                           return 'active-level';
                       } else {
                           return '';
                       }
                   })
                   .attr('id', (d)=>{
                       return 'h' + d['data']['name'].toString().hashCode();
                   });

               // update the text of number of entities
               node.select('text')
                   .text((d)=>{
                       return d.data.name.length;
                   });

               // EXIT
               node.exit()
                   .remove();
              //console.log(hierarchyGroupStdev);
               // color the dendrogram nodes using the standardDeviation in the cluster
               if (Object.keys(this.hierarchyGroupStdev).length) {
                   console.log('runs');
                   // show the legend for the coloring
                   // console.log(hierarchyGroupStdev);
                   // TODO legend here
                   // console.log('JUMPS HERE');
                   if ($('#dendrogram-legend').css('display') == 'none') {
                       $('#dendrogram-legend').show();
                   }
                   // IMPORTANT - async problems
                   // TODO solve this - very slow
                   setTimeout(()=>{
                       node.select('circle')
                           .style('fill', function(d) {
                               // console.log(hierarchyGroupStdev);
                               // console.log(('h' + d['data']['name'].toString().hashCode()));
                               // console.log(('h' + d['data']['name'].toString().hashCode()) in hierarchyGroupStdev)
                               // color the nodes by calculating the standardDeviation
                               // for each cluster
                               // only active is show in cluster is choosen
                               if (('h' + d['data']['name'].toString().hashCode()) in hierarchyGroupStdev) {
                                   // console.log('hello');
                                   // console.log(standardDeviation(hierarchyGroupStdev[('h' + d['data']['name'].toString().hashCode())]));
                                   return standardDeviationColorScale(standardDeviation(hierarchyGroupStdev[('h' + d['data']['name'].toString().hashCode())]));
                               } else if (d['depth'] !== hierarchyLevels['h' +this.id]) {
                                   return '';
                               } else {
                                   return '#000';
                               }
                           });
                   }, 250);
               } else if ($('#dendrogram-legend').css('display') !== 'none') {
                   $('#dendrogram-legend').hide();
               }
           }
       }
       if (!$.isEmptyObject(networkHierarchy)) {
           // draw the hierarchy in spatial view
           this.drawHierarchy();
       }
   }

   changeHierarchyLegend() {
       let legend; // the color legend
       let legendText; // color legend text
       // vars for the legend
       let legendSwatchWidth = 50;
       let legendSwatchHeight = 20;
       console.log(Object.keys(hierarchyColors).length);
       // Show or hide the svg element
       if (Object.keys(hierarchyColors).length !== 0 || Object.keys(this.networkColor).length !== 0) {
           console.log('applys');
           $('#hierarchy-legend-div').show();
       } else {
           $('#hierarchy-legend-div').hide();
       }

       let legendData = [];
       let legendTextData = [];
       // get the required data
       $('.show-dendrogram').each(function(i, obj) {
           // check if data is not undefined
           if (hierarchyColors['h' + $(obj).attr('data')] != null && $(obj).attr('name') != null) {
               legendData.push(hierarchyColors['h' + $(obj).attr('data')]);
               legendTextData.push($(obj).attr('name'));
           }
       });
       // add the network color
       if (Object.keys(this.networkColor).length !== 0) {
           for (let key in this.networkColor) {
               if (legendData.indexOf(this.networkColor[key]) === -1) {
                   legendData.push(this.networkColor[key]);
                   legendTextData.push('Network');
               }
           }
       }
       // DATA JOIN
       legend = this.svgLegend_netw.selectAll('rect.legend')
           .data(legendData);
       legendText = this.svgLegend_netw.selectAll('text.legend-text')
           .data(legendTextData);

       // --------------- Legend swatches  -------------------
       // UPDATE - legend
       legend.style('fill', function(d) {
           return d;
       });
       // ENTER - legend
       legend
           .enter()
           .append('rect')
           .attr('class', 'legend')
           .attr('width', legendSwatchWidth)
           .attr('height', legendSwatchHeight)
           .attr('y', 0)
           .attr('x', function(d, i) {
               return (legendSwatchWidth + 2.5 * i * legendSwatchWidth) + 'px';
           })
           .style('fill', function(d) {
               return d;
           });
       // EXIT - legend
       legend.exit()
           .remove();

       // --------------- Text  -------------------
       // UPDATE - legend text
       legendText.text(function(d) {
           return d;
       });
       // ENTER - legend text
       legendText
           .enter()
           .append('text')
           .attr('class', 'legend-text')
           .attr('y', 2 * legendSwatchHeight)
           .attr('x', function(d, i) {
               return (legendSwatchWidth + 2.5 * i * legendSwatchWidth) + 'px';
           })
           .text(function(d) {
               return d;
           });

       // EXIT - legend text
       legendText.exit()
           .remove();

   }


   setnetworkColor(network_id) {
       // if id = -1 set the color to nothing
       if (network_id >= 0) {
           this.networkColor['h' + network_id] = '#08306b';
       } else {
           console.log('color nothing');
           this.networkColor = {};
       }
       this.changeHierarchyLegend();
   }

   setHierarchyData(value, network_id) {
       // if the element is empty remove the element from the netwrokHierarchy object
       if (Object.keys(value).length === 0 && value.constructor === Object) {
           delete networkHierarchy['h' + network_id];
           this.removeHierarchyLevel(network_id);
           this.removeHierarchyColor(network_id);
       } // add it to the network hierarchy
       else {
           networkHierarchy['h' + network_id] = value;
          this.setHierarchyLevel(network_id, 2);
          this.setHierarchyColor(network_id);
       } // too many elements cant be added

       this.changeHierarchyLegend();
   }

   getNetworkHierarchyData(network_id) {
       $.ajax({
           url: '/api/dataset/network/hierarchy/' + parameters['id'] + '/' + network_id,
           dataType: 'json',
           type: 'GET',
           contentType: 'application/json; charset=utf-8',
           headers: {
               'Accept': JSONAPI_MIMETYPE
           },
           success: (data)=>{
               if (data.length) {
                   this.setHierarchyData(JSON.parse(data[0]['hierarchy']), network_id);
               }
               enablePlayButton();
           }
       });
   }



 }


export class SpatialView extends Drawer{
  constructor(data){
    super(data);


    this.spatialViewInit();
    //this.cp_listener();
  }
  cp_listener() {

      /**
       * Play or stop the animation
       */
      $('#play-button').click(()=>{
          if ($('#play-button').hasClass('active') === true) {
              this.playBoolean = false;
              $('.mdi-pause').hide();
              $('.mdi-play').show();
          } else {
              this.playBoolean = true;
              $('.mdi-play').hide();
              $('.mdi-pause').show();
              this.setIndexTime(slider.slider('value'));
              $('.brush').remove();
              this.draw();
          }
      });

      /**
       * Pause the animation and show only the next frame
       */
      $('#next-frame-button').click(()=>{
          if ($('#play-button').hasClass('active') === true) {
              this.playBoolean = false;
          }
          $('#play-button').removeClass('active');
          this.draw();
      });

      /**
       * Brushing button
       */
      $('#brushing-button').click(()=>{
          //stop the animation

          this.playBoolean = false;
          $('#play-button').removeClass('active');
          if (!$('#brushing-button').hasClass('active')) {
              //define the brush
              this.brush = d3.brush()
                  .extent([
                      [0, 0],
                      [this.tankWidth, this.tankHeight]
                  ])
                  .on('end', ()=>{
                         //let arrayAnimals = this.arrayAnimals;
                         //let activeAnimals = this.activeAnimals;
                         var rect = d3.event.selection;
                         this.activeAnimals = [];

                         //iterate over the 151 fish to check which are in the brush

                         this.arrayAnimals.map((animal)=>{
                           var point = [animal['p'][0], animal['p'][1]];
                           //check which fish are in  the brushed area
                           if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
                               (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
                               // Point is in the brush
                               this.activeAnimals.push(animal['a']);
                         }})
                         console.log(this.activeAnimals);
                         //setActiveAnimals(activeAnimals);



                         //this.setActiveAnimals(this.activeAnimals);
                         if (!$('#play-button')
                             .hasClass('active')) {
                             //go back one second and draw the next frame
                             //this applys the changes
                             //this.decIndexTime();
                             //SPV.draw();
                         }
                         $('#brushing-button')
                             .removeClass('active');
                         // remove the brush
                         $('.brush')
                             .remove();
                     });
              //add the brush
              d3.select('#main-vis-svg')
                  .append('g')
                  .attr('class', 'brush')
                  .call(this.brush);
          } else {
              // remove the brush
              $('.brush').remove();
          }
      });

      /**
       * Unselect all button
       */
      $('#remove-active-selected-button').click(()=>{
          if (!$('#remove-active-selected-button').is(':disabled')) {
              $('#remove-active-selected-button').prop('disabled', true);
              this.setActiveAnimals([]);
              // tracking of data for visual parameter suggestion
              resetTrackedData();
              $('#visual-parameter-button').prop('disabled', true).removeClass('active');

              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes

                  this.decIndexTime();
                  this.draw();
              }
          }
      });

      /**
       * Track visual parameter button
       */
      $('#visual-parameter-button').click(()=>{
          if ($('#visual-parameter-button').hasClass('active') === true) {
              setTrackingBoolean(false);
          } else {
              setTrackingBoolean(true);
          }
      });

      /**
       * Send the tracked via a ajax query to the server to calculate the parameters
       */
      $('#calculate-parameter-button').click(()=>{
          if (!$('#calculate-parameter-button').hasClass('active')) {
              setTrackingBoolean(false);
              sendTrackedData();

              // disable both buttons and remove the active one
              $('#calculate-parameter-button').prop('disabled', true);
              $('#calculate-parameter-button').removeClass('active');
              $('#visual-parameter-button').removeClass('active');
          }
      });

      /**
       * Spatial view background color
       */
      $('#background-color').change(()=>{
          let color = $('input[type="radio"].group-background:checked').val();
          $('#main-vis-svg').css('background-color', color);
      });

      /**
       * Show the spatial view axis button
       */
      $('#draw-axis').on('change', ()=> {
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
      $('#draw-time').on('change', ()=>{
          if (this.checked) {
              $('#main-vis .frame-text').show();
          } else {
              $('#main-vis .frame-text').hide();
          }
      });

      /**
       * Draw the network background color
       */
      $('#network-background').on('change', ()=> {
          if (this.checked) {
              setNetworkBackground(true);
          } else {
              setNetworkBackground(false);
          }
      });

      /**
       * Set the network background edge limit
       */
      $('#network-background-limit').val(1);
      $('#network-background-limit').on('change', ()=>{
          let val = $(this).val();
          if ($.isNumeric(val) && val > 0) {
              setNetworkBackgroundLimit(val);
          } else {
              $(this).val(1);
          }
      });

      /**
       * Color Scale Function Radio buttons
       */
      $('#color-scale-radio-form input').on('change', ()=>{
          this.colorScale['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              this.draw();
          }
      });
  }
  sf_listeners() {

      /**
       * Draw direction arrow of the animal
       */
      $('#draw-direction').click(()=>{
          if ($('#draw-direction').is(':checked')) {
              if (!('direction' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get direction data
                  getDatasetFeature('direction');
              }
              $('.arrow').show();
          } else {
              $('.arrow').hide();
          }
          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw medoid in color button
       */
      $('#draw-medoid').click(() => {
          if ($('#draw-medoid').is(':checked')) {

              if (!('medoid' in swarmData[0])) {
                  getSwarmDatasetFeature('medoid');

              }
              this.setMedoidAnimal(swarmData[this.indexTime]['medoid']);
              // display the medoid
              d3.selectAll('#animal-' + this.medoidAnimal)
                  .classed('medoid', true);
          } else {
              // do not display the medoid fish
              d3.selectAll('#animal-' + this.medoidAnimal)
                  .classed('medoid', false);
              this.setMedoidAnimal(-1);
          }
      });

      /**
       * Draw centroid button
       */
      $('#draw-centroid').click(()=>{
          if ($('#draw-centroid').is(':checked')) {
              if (!('centroid' in swarmData[0])) {
                  getSwarmDatasetFeature('centroid');
              }
              // display the centroid
              $('#g-centroid').show();
          } else {
              // hide the centroid
              $('#g-centroid').hide();
          }
      });


      /**
       * Draw convex hull in color button
       */
      $('#draw-convex-hull').click(()=>{
          if ($('#draw-convex-hull').is(':checked')) {
              if (!('hull' in swarmData[0])) {
                  getSwarmDatasetFeature('convex_hull');

              }
          }
      });


      /**
       * Draw triangulation
       */
      $('#draw-triangulation').click(()=>{
          if ($('#draw-triangulation').is(':checked')) {
              if (!('triangulation' in swarmData[0])) {
                  //console.log('ere');
                  getSwarmDatasetFeature('triangulation');
                  //console.log(swarmData[this.indexTime]['triangulation']);

              }
              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes
                  this.decIndexTime();
                  //this.draw();


              }
          }
      });


      /**
       * Draw voronoi
       */
      $('#draw-voronoi').click(()=>{
          if ($('#draw-voronoi').is(':checked')) {
              if (!('voronoi' in swarmData[0])) {
                  //console.log('ere');
                  getSwarmDatasetFeature('voronoi');
                  //console.log(swarmData[this.indexTime]['voronoi']);

              }
              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes
                  //console.log('there');
                  this.decIndexTime();
                  //this.draw();
              }

          }
      });


  }
  af_listeners() {

      /**
       * Draw Speed button
       */
      $('#draw-speed').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-speed').is(':checked')) {
              // load absolute feature speed data once
              if (!('speed' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature speed
                  getDatasetFeature('speed');
              }
              // $('.draw-details').hide();
              $('#draw-speed-details').show();
              $('#draw-acceleration').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('speed');
          } else {
              $('#draw-speed-details').hide();
              this.setActiveScale('black');
          }
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw acceleration button
       */
      $('#draw-acceleration').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-acceleration').is(':checked')) {
              // load absolute feature acceleration data once
              if (!('acceleration' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature acceleration
                  getDatasetFeature('acceleration');
              }
              $('#draw-acceleration-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('acceleration');
          } else {
              $('#draw-acceleration-details').hide();
              this.setActiveScale('black');
          }
          $('.draw-details.active').click();
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw distance to centroid button
       */
      $('#draw-distance_centroid').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-distance_centroid').is(':checked')) {
              console.log('checked');
              // load absolute feature distance_centroid data once
              if (!('distance_centroid' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature distance_centroid
                  getDatasetFeature('distance_centroid');
              }
              console.log(dataset);
              $('#draw-distance_centroid-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-acceleration').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('distance_centroid');
          } else {
            console.log('black');
              $('#draw-distance_centroid-details').hide();
              this.setActiveScale('black');

          }
          $('.draw-details.active').click();

          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw midline offset
       */
      $('#draw-midline_offset').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-midline_offset').is(':checked')) {
              // load absolute feature draw-midline_offset data once
              if (!('draw-midline_offset' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature midline_offset
                  getDatasetFeature('midline_offset');
              }
              $('#draw-midline_offset-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-acceleration').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              setActiveScale('midline_offset');
          } else {
              setActiveScale('black');
          }
          $('.draw-details.active').click();
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              this.draw();
          }
      });

  }
  md_listeners() {
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
              $('#metadata-input').hide();
          } else {
              $('#metadata-input').show();
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
          $('#metadata-input').hide();
          resetIndividualMetadata();
      });

  }
  initShowDendrogramListener(id) {

      $('#show-dendrogram-' + id).click(function(){
          let clickedButtonID = $(this).attr('id');
          // iterate over all buttons and custom highlight just one or none
          $('.show-dendrogram').each(function(i, button){
              // active found button
              if ($(button).attr('id') === clickedButtonID && $(button).hasClass('btn-primary') === false) {
                  $(button).addClass('btn-primary');
                  $(button).find('#btn-left').hide();
                  $(button).find('#btn-right').show();
                  // TODO add here a resize of the main vis
                  // $('#dendrogram-panel').insertAfter($(this));
              } // remove highlight
              else {
                  $(button).removeClass('btn-primary');
                  $(button).find('#btn-left').show();
                  $(button).find('#btn-right').hide();
              }
          });

          // show dendrogram
          if ($('.show-dendrogram.btn-primary').length) {
              $('#dendrogram-panel').show();
          } else {
              $('#dendrogram-panel').hide();
          }
          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              this.draw();
              this.drawDendrogram();
          }
      });
  }
  h_listeners() {
      var checkbox;

      // Store given checkbox in variable
      $('.hiearchy-checkbox').on('change', function() {
          checkbox = $(this);
        });

      // Use checkbox to draw dendrogram
      $('.hiearchy-checkbox').on('change', ()=>{
          console.log('jumps');

          let id = checkbox.attr('data');
          let name = checkbox.attr('name');
          let checked = checkbox.prop('checked');
          console.log(checked);

          if (checked && $('.show-dendrogram').length < maxNumberHierarchies) {
              disablePlayButton();
              this.getNetworkHierarchyData(id);

              addHierarchyButton(id, name);
              this.initShowDendrogramListener(id);
              $('#dendrogram-buttons-div').show();
          }
          // else if ($('.show-dendrogram').length === maxNumberHierarchies) {
          // console.log('Max number of hierarchies is: ' + maxNumberHierarchies);
          //TODO implement this here
          // notice user that it is not possible to show more than n hierarchies
          //          <div class="alert alert-warning">
          //   <strong>Info!</strong> Attention user .
          // </div>
          // }
          else {
              // tmp variable to save if the button which is going to be removed
              // was active
              let tmpActive = $('#show-dendrogram-' + id).hasClass('btn-primary');
              this.setHierarchyData({}, id);

              removeHierarchyButton(id);
              // TODO find better way here
              d3.select('g.h' + id).remove();
              // remove the dendrogram and the panel if the removed element was checked
              if (tmpActive === true) {
                  $('#dendrogram-panel').hide();
              }
              if ($('.show-dendrogram').length === 0) {
                  $('#dendrogram-buttons-div').hide();
              }

          }
          // resize the main svg
          if ($('.show-dendrogram').length) {
              $('#main-vis-div').removeClass('col-md-12');
              $('#main-vis-div').addClass('col-md-8');
          } else {
              $('#main-vis-div').removeClass('col-md-8');
              $('#main-vis-div').addClass('col-md-12');
          }
      });

      /**
       * Visualize the network only in the choosen hierarchy
       */
      $('.network-hierarchy-checkbox').on('change', ()=>{
          // get the info for the clicked button
          let checkbox = $(this);

          // reset all the other active checkboxes
          $('.network-hierarchy-checkbox').prop('checked', false);
          checkbox.prop('checked', true);

          if (checkbox.prop('checked')) {
              // set the network id
              setNetworkHierarchy(checkbox.attr('data'));
          } else {
              setNetworkHierarchy(undefined);
          }
      });

}
  n_listeners() {
    /**
     * Network buttons clicked - get the data
     */
    var network_id;

    $('#networks-modal-body button').click(function() {
        network_id = $(this).attr('data');
      });

    $('#networks-modal-body button').click(()=>{
        // add the name of the choosen network to the Network modal
        $('#active-network-name').text($(this).attr('name'));

        disablePlayButton();
        getNetworkData(network_id);
        // set the color of the network
        this.setnetworkColor(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(()=>{
        setNetworkData({});
        setNetworkID(-1);
        // remove the network color
        this.setnetworkColor(-1);
        $('#active-network-name').text('');
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

      let zoom = d3.zoom()
          .scaleExtent([1, 6])
          .on('zoom', () => {
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
          .attr('transform', ()=>{
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

      this.initColorPicker();
      var linechart = new LineChart(swarmData);
      this.cp_listener();
      this.sf_listeners();
      this.af_listeners();
      this.md_listeners();
      this.n_listeners();
      this.h_listeners();
      //var dendrogram = new Dendrogram();
//findinit
      this.initDendrogram();
      makeResizable(this.tankHeight, this.tankWidth);
      defaultConfig();
      // start the animation
      this.draw();
  };
  setMedoidAnimal(value) {
      this.medoidAnimal = value;
  }

}




class Chart extends Drawer {

    constructor(data) {
    super()
      // load in arguments from config object
    this.swarmData = data;
    this.swarm_features = Object.keys(this.swarmData[0]);
    this.lineChartWidth = 5000;
    this.trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
    }


        /**
     * init the line chart and also the trend chart
     */


}

export class LineChart extends Chart {
    constructor(data){
    super(data)
    this.lineChart();

    }

    lineChart() {

      ratio = Math.ceil(this.swarmData.length / this.lineChartWidth);

      // Swarm features line chart
      let lineChartHeight = 500; // the line chart height
      let margin = {
          top: 10,
          right: 0,
          bottom: 100,
          left: 10
      };
      let marginToLegend = 50;

      let swarm_features = this.swarm_features;
      // remove the time key
      let index = swarm_features.indexOf('time');
      swarm_features.splice(index, 1);

      let lineChartData = [];
      // aggregate and average the swarm data to this.lineChartWidth points in the line chart
      if (this.swarmData.length > this.lineChartWidth) {
          // tmp array for the aggregated and averaged features
          let tmp = new Array(swarm_features.length).fill(0);

          for (let i = 0; i < this.swarmData.length; i++) {
              // aggregate the features in the temp array
              for (let j = 0; j < swarm_features.length; j++) {
                  tmp[j] += this.swarmData[i][swarm_features[j]];
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
          lineChartData = this.swarmData;
      }
      //console.log(lineChartData);
      zoomFunction = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);


      // x axis scale - minus marginLineChart  needed
      x = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);
      let x2 = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);
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

      let dragged = ()=>{
          // dragged function get the coordinates and calculate the time moment from this
          let coords = d3.mouse(this);
          if (coords[0] < margin.left || coords[0] > this.lineChartWidth || coords[1] < 0 || coords[1] > lineChartHeight) {
              return;
          }
          // tmp scale to include the zoom factor
          let tmpScale = d3.scaleLinear()
              .domain(zoomFunction.range())
              .range(zoomFunction.domain());
          // set the new time
          this.setIndexTime(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
      };
      let zoom = d3.zoom()
          .scaleExtent([1, 20])
          .translateExtent([
              [0, 0],
              [this.lineChartWidth, lineChartHeight]
          ])
          .extent([
              [0, 0],
              [this.lineChartWidth, lineChartHeight]
          ])
          .on('zoom', ()=>{
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
                      for (let i = 0; i < this.trendChartsElem.length; i++) {
                          zoomGroup
                              .select(('#' + key + 'TrendChart .' + this.trendChartsElem[i]))
                              .attr('d', trendChartsZoom[key][this.trendChartsElem[i]]);
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

          .attr('viewBox', '0 0 ' + this.lineChartWidth + ' ' + (lineChartHeight + margin.bottom))
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
              .attr('width', this.lineChartWidth)
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

      this.initLineChartButtons()


  }

  /**
   * Init line chart button listeners
   */
  initLineChartButtons() {
      // add the Line chart buttons to the feature panel
      for (let i = 0; i < this.swarm_features.length; i++) {
          let capitalized_feature_string = this.swarm_features[i].split('_').join(' ');
          capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

          $('#line-chart-feature-checkboxes')
              .append('<tr><th> <div class="pretty p-switch p-fill p-bigger"><input type="checkbox" class="line-chart-check-box" id="draw-' +
                  this.swarm_features[i] + '" data="#' + this.swarm_features[i] + 'Line" /><div class="state"><label>' +
                  capitalized_feature_string + '</label></div></div></th></tr>');
      }

      $('.line-chart-check-box').change(function() {
          let checkbox = $(this);
          if (checkbox.prop('checked')) {
              $(checkbox.attr('data')).show();
          } else {
              $(checkbox.attr('data')).hide();
          }
      });
  }


}

/**
 * Add a trend chart showing median and percentiles
 * // - which feature
 */
export class TrendChart extends Chart{
    constructor(elem, swarmData){
      super(swarmData);
      this.elem = elem;

      this.trendchart();
      //this.disableLineChart();

    }

    disableLineChart() {
        $('.lineChartButton').prop('checked', false).prop('disabled', true);
        $('.line-chart-check-box').attr('disabled', true);
        $('.lineChartLine').attr('visibility', 'hidden');
    }


    trendchart(){
    // check which feature to display in the trend chart
    let feature = '';
    if (this.elem['id'].toLowerCase().includes('speed')) {
        feature = 'speed';
    } else if (this.elem['id'].toLowerCase().includes('acceleration')) {
        feature = 'acceleration';
    } else if (this.elem['id'].toLowerCase().includes('distance_centroid')) {
        feature = 'distance_centroid';
    } else if (this.elem['id'].toLowerCase().includes('midline_offset')) {
        feature = 'midline_offset';
    } else {
        return;
    }
    // data is not loaded fully -- return
    //if (!dataset[0][feature]) {
    //    return;
    //}
    // change to the trend chart legend
    $('#lineChartLegend').hide();
    $('#trendChartLegend').show();
    // check if already computed and only hidden
    if (!$(('#' + feature + 'TrendChart')).length) {
        // get the data for the trend chart
        let trendChartData = [];
        let num_animals = animalIds.length;
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
        //aggregate and average the trendChartData to this.lineChartWidth data points
        if (trendChartData.length > this.lineChartWidth) {
            let tmpTrendChartData = [];

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

        for (let i = 0; i < this.trendChartsElem.length; i++) {
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
            trendChartsZoom[feature][this.trendChartsElem[i]] = temp;
            // append it to the path
            trendChart.append('path')
                .data([trendChartData])
                .attr('class', this.trendChartsElem[i])
                .attr('d', temp);
        }
    } else {
        // show the trend chart
        $(('#' + feature + 'TrendChart')).show();
    }
}
}

/**
 * Update the line chart fields and the line chart time line
 */



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


/**
 * Decrease time by 1
 */


/**
 * Set the the new active scale - e.g. speed, acceleration, black etc.
 * @param {String} value - active scale for the individual animals
 */
export function setActiveScale(value) {
    activeScale = value;
}

/**
 * Set the new medoid animal
 * @param {Number} value - Uniquethis.id of the animal
 */
export function setMedoidAnimal(value) {
    medoidAnimal = value;
}

/**
 * Set the selected and highlighted animals
 * @param {array} value - array of unqiuethis.id of the animals
 */
