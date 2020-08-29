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
    setnetworkColor,
    //setNetworkID
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
    //hierarchyColors,
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

import {
    zoomFunction
} from '../line_chart.js'

// Drawer Setup


// Chart
let trendChartsZoom = {};

// Linechart Setup
let ratio = 1;
let zoomGroup;
let x;
let y;
//export let zoomFunction;


let zoom = d3.zoom()
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


/**
* Base class drawer
*/

/**
 * Initialize the spatial view with all the important factors
 */
export class Drawer {
   constructor(){
     this.ratio = 1;
     this.minPoint = parameters['min']['geometry']['coordinates'];
     this.maxPoint = parameters['max']['geometry']['coordinates'];
     // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
     // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
     this.tankWidth = (this.maxPoint[0] - this.minPoint[0]) * 1.02;
     this.tankHeight = (this.maxPoint[1] - this.minPoint[1]) * 1.02;
     this.indexTime=0;
     // Tank Base
     this.svgContainer = d3.select('#main-vis')
     .classed('svg-container', true)
     // to make it responsive with css
     .append('svg')
     .attr('preserveAspectRatio', 'xMinYMin meet')
     .attr('viewBox', '0 0 ' + this.tankWidth + ' ' + this.tankHeight)
     // add the class svg-content
     .classed('svg-content', true)
     .attr('id', 'main-vis-svg')
     .call(d3.zoom().on('zoom', ()=>{console.log('hi')}));
     // this is where I cannot place the zoom function



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
     //this.id = $('.show-dendrogram.btn-primary').attr('data');
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
     this.hierarchyColors = {};
     this.networkHierarchy = networkHierarchy;
     this.spatialView = d3.select('.tank');
     this.tooltipDiv = d3.select('#dendrogram-tooltip')
         .style('left', 0 + 'px')
         .style('top', 0 + 'px')
         .on('mouseover', ()=>{
             this.tooltipDiv
                 .style('opacity', 1);
         });
     this.networkID = -1




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
       //this.spatialView = d3.select('.tank');

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
       // init the tooltip for the dendrogram

       // init the hierarchy legend
       let legendWidth = maxNumberHierarchies * 100;
       let legendHeight = 60;

       this.svgLegend_netw = d3.select('#hierarchy-legend-div')
           .append('svg')
           .attr('id', 'hierarchy-legend')
           .attr('width', legendWidth)
           .attr('height', legendHeight);

       // add pattern for striped background of intersections etc.
       this.spatialView.append('defs')
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
                this.hierarchyColors['h' + hierarchy] = this.networkColor[key];
                return;
            }

        }
        // hierarchy is not visualized already as a network
        for (let i = 0; i < colors.length; i++) {
            let tmp_boolean = true;
            for (let key in this.hierarchyColors) {

                if (this.hierarchyColors.hasOwnProperty(key)) {
                    if (this.hierarchyColors[key] === colors[i]) {
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
                            this.hierarchyColors['h' + hierarchy] = colors[i];
                            return;
                        }
                    }
                } else {
                    this.hierarchyColors['h' + hierarchy] = colors[i];
                    return;
                }

            }
        }
    }
   removeHierarchyColor(hierarchy) {
        delete this.hierarchyColors['h' + hierarchy];
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
       // id of the hierarchy e.g. [1,5,3]
       let hierarchyIds = Object.keys(this.networkHierarchy).map(function(x) {
           return x.replace('h', '');
       });
       //  The clustering in an 2D array with which animal id belongs to which group
       let hierarchyVertices = [];

       // iterate over the hierarchy data to get the hierarchy animal ids per clustering and grouping
       for (let i = 0; i < hierarchyIds.length; i++) {
           let treeData = this.networkHierarchy['h' + hierarchyIds[i]][this.indexTime];
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
       // DATA Join
       let hierarchies = this.spatialView
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
           .style('fill', (d, i)=>{
               return this.hierarchyColors['h' + hierarchyIds[i]];
           })
           .attr('stroke', (d, i)=>{
               return this.hierarchyColors['h' + hierarchyIds[i]];
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
   addHighlightSpatialView(animals) {
       // points to calculate the convex hull of the highlight cluster
       let vertices = [];
       let spatialView = d3.select('.tank');
       // iterate through the objects in the cluster
       // get the points and highlight the animals
       for (let i = 0; i < animals.length; i++) {
           //console.log(this.spatialView.select('#animal-' + animals[i]));
           let tmpAnimal = d3.select('#animal-' + animals[i]);
           let point = tmpAnimal.data()[0]['p'];
           vertices.push([point[0], -point[1]]);

           tmpAnimal.classed('animal-highlight', true);
       }
       // add a polygon hull in the spatial view
       this.spatialView.append('path')
           .attr('class', 'highlight-hierarchy')
           .attr('d', ('M' + d3.polygonHull(vertices).join('L') + 'Z'));
   }

   removeHighlightSpatialView() {
       // remove the coloring and the hierarchy highlight hull
       d3.selectAll('.animal').classed('animal-highlight', false);
       d3.selectAll('.highlight-hierarchy').remove();
   }
   drawDendrogram() {


         var collapse = (d)=>{
           let id = $('.show-dendrogram.btn-primary').attr('data');
          //if (d.children && d.depth <= this.hierarchyLevels['h' + this.id])
          if (d.children && d.depth <= this.hierarchyLevels['h' + id]) {
              d._children = d.children;
              d._children.forEach(collapse);
          } else {
              d.children = 0;
          }
    }

       // get the active dendrogram
       let id = $('.show-dendrogram.btn-primary').attr('data');
       // if data is avaiable draw hierarchy clusters and a button is active selcted
       if (!$.isEmptyObject(this.networkHierarchy) && id) {
           // get the data and transform it
           let treeData = this.networkHierarchy['h' + id][this.indexTime];

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
           // hide if no network is choosen
           if ($('.show-dendrogram.btn-primary').length) {
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
                   .on('click', (d)=>{
                          this.setActiveAnimals(d['data']['name']);
                          // if no animation is active draw the draw one step
                          if (!$('#play-button').hasClass('active')) {
                              this.decIndexTime();
                              this.draw();
                          }})
                   .on('mouseover', (d)=>{
                       // tooltip position and text
                       this.tooltipDiv
                           .style('left', (d3.event.pageX + 5) + 'px')
                           .style('top', (d3.event.pageY + 5) + 'px')
                           .style('opacity', 1);
                       this.tooltipDiv.select('.tooltip-span').html(d['data']['name'].toString());
                       // add highlight in the spatial view
                       // the undion of the paths makes this complicated
                       this.addHighlightSpatialView(d['data']['name']);
                   })
                   .on('mouseout', ()=>{
                       this.tooltipDiv.transition()
                           .duration(500)
                           .style('opacity', 0);
                       // remove highlight in the spatial view
                       this.removeHighlightSpatialView();
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
               // color the dendrogram nodes using the standardDeviation in the cluster
               if (Object.keys(this.hierarchyGroupStdev).length) {
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
                               } else if (d['depth'] !== this.hierarchyLevels['h' +id]) {
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
       if (!$.isEmptyObject(this.networkHierarchy)) {
           // draw the hierarchy in spatial view
           this.drawHierarchy();
       }
       //this.drawHierarchy();
   }

   changeHierarchyLegend() {
       let legend; // the color legend
       let legendText; // color legend text
       // vars for the legend
       let legendSwatchWidth = 50;
       let legendSwatchHeight = 20;
       // Show or hide the svg element
       if (Object.keys(this.hierarchyColors).length !== 0 || Object.keys(this.networkColor).length !== 0) {
           $('#hierarchy-legend-div').show();
       } else {
           $('#hierarchy-legend-div').hide();
       }

       let legendData = [];
       let legendTextData = [];
       // get the required data
       $('.show-dendrogram').each((i, obj)=>{
           // check if data is not undefined
           if (this.hierarchyColors['h' + $(obj).attr('data')] != null && $(obj).attr('name') != null) {
               legendData.push(this.hierarchyColors['h' + $(obj).attr('data')]);
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
           this.networkColor = {};
       }
       this.changeHierarchyLegend();
   }

   setHierarchyData(value, network_id) {
       // if the element is empty remove the element from the netwrokHierarchy object
       if (Object.keys(value).length === 0 && value.constructor === Object) {
           delete this.networkHierarchy['h' + network_id];
           this.removeHierarchyLevel(network_id);
           this.removeHierarchyColor(network_id);
       } // add it to the network hierarchy
       else {
           this.networkHierarchy['h' + network_id] = value;
          this.setHierarchyLevel(network_id, 2);
          this.setHierarchyColor(network_id);
       } // too many elements cant be added

       this.changeHierarchyLegend();
   }

   getNetworkHierarchyData(network_id) {
       let JSONAPI_MIMETYPE = 'application/vnd.api+json';

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

   setNetworkID(value) {
       this.networkID = value;
   }



 }
