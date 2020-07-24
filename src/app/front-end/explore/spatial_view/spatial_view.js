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
    playBoolean
} from '../listener.js';

import {
    addSpatialViewGroup
} from './legend.js';

import {
    drawDendrogram,
    updateDendrogram,
    setHierarchyLevel,
    drawHierarchy,
    initDendrogramLegend,
    // networkHierarchyIds,
    // sethierarchyGroupStdev,
    resethierarchyGroupStdev
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
 * Initialize the spatial view with all the important factors
 */

export class SpatialView {
  constructor(){
    this.spatialViewInit();
  }
  spatialViewInit(){

      let minPoint = parameters['min']['geometry']['coordinates'];
      let maxPoint = parameters['max']['geometry']['coordinates'];
      // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
      // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
      tankWidth = (maxPoint[0] - minPoint[0]) * 1.02;
      tankHeight = (maxPoint[1] - minPoint[1]) * 1.02;
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
              d3.event.transform.x = Math.min(0, tankWidth * (d3.event.transform.k - 1),
                  Math.max(tankWidth * (1 - d3.event.transform.k), d3.event.transform.x));

              d3.event.transform.y = Math.min(0, tankHeight * (d3.event.transform.k - 1),
                  Math.max(tankHeight * (1 - d3.event.transform.k), d3.event.transform.y));

              // translate and scale
              zoomGroup.attr('transform', d3.event.transform);

              // rescale the axis
              gXaxis.call(xAxis.scale(d3.event.transform.rescaleX(x)));
              gYaxis.call(yAxis.scale(d3.event.transform.rescaleY(y)));
          });

      //the svg container
      svgContainer = d3.select('#main-vis')
          .classed('svg-container', true)
          // to make it responsive with css
          .append('svg')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', '0 0 ' + tankWidth + ' ' + tankHeight)
          // add the class svg-content
          .classed('svg-content', true)
          .attr('id', 'main-vis-svg')
          .call(zoom);

      /* depends on svg ratio, for e.g 1240/1900 = 0.65 so padding-bottom = 65% */
      let percentage = Math.ceil((tankHeight / tankWidth) * 100);
      $('#main-vis').append($('<style>#main-vis::after {padding-top: ' + percentage + '%;display: block;content: "";}</style> '));

      zoomGroup = svgContainer.append('svg:g');

      // Visualize the background image if it is uploaded
      if (parameters.background_image) {
          zoomGroup
              .append('image')
              .attr('xlink:href', '/' + parameters.background_image)
              .attr('class', 'background-image')
              .attr('height', tankHeight)
              .attr('width', tankWidth)
              .attr('x', '0')
              .attr('y', '0');
      }

      //append the tank group with a transformation which rotates the y axis
      tank = zoomGroup.append('svg:g')
          .attr('class', 'tank')
          .attr('transform', function() {
              let x = parameters.inverted_x ? -1 : 1;
              let y = parameters.inverted_y ? -1 : 1;
              return 'scale(' + x + ',' + y + ')';
          });

      //add the centroid
      tank.append('g')
          .attr('id', 'g-centroid')
          .append('circle')
          .attr('class', 'centroid')
          .attr('r', 6)
          .attr('cx', 0)
          .attr('cy', 0);

      // arrow for the centroid direction
      tank.select('#g-centroid')
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
      tank.select('#g-centroid')
          .append('line')
          .attr('id', 'centroid-line')
          .attr('marker-end', 'url(#centroid-arrow)');

      //append network  group
      tank.append('g')
          .attr('id', 'network-group');

      //append delaunay-triangulation group
      tank.append('g')
          .attr('id', 'delaunay-triangulation-group');

      //append voronoi group
      tank.append('g')
          .attr('id', 'vornoi-group');

      //append the frame time text
      svgContainer.append('text')
          .attr('class', 'frame-text')
          .attr('x', 30)
          .attr('y', 30)
          .text('-- : -- : -- ');

      // add the axis
      let gXaxis = svgContainer.append('g')
          .attr('class', 'x axis')
          .call(xAxis);

      let gYaxis = svgContainer.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

      // init stuff from other modules
      initTooltip();
      initSliders();
      addSpatialViewGroup();
      initColorPicker();
      var linechart = new LineChart(swarmData);
      initListeners();
      initDendrogram();
      makeResizable(tankHeight, tankWidth);
      defaultConfig();
      // start the animation
      draw();
  };
  draw() {
      //update time to wait aka speed of replay
      let timeToWait = $('input[type="radio"].group-playback-rate:checked')
          .val();
      //scale the size by this number
      let animalScale = $('input[type="radio"].group-size:checked')
          .val();

      //get the next animals
      arrayAnimals = dataset.filter(function(d) {
          return d['t'] === indexTime;
      });

      //the timeout is set after one update 30 ms
      setTimeout(function() {
              // draw hierarchy
              drawDendrogram();
              //change the time frame text
              svgContainer.select('.frame-text')
                  .text(Math.floor(indexTime / 1500) % 60 + ':' + Math.floor(indexTime / parameters['fps']) % 60 + '::' + indexTime % parameters['fps']);
              // if a second has changed move the slider
              if (indexTime % parameters['fps'] === 0) {
                  setTimeSlider(indexTime);
              }

              let svgAnimals = tank.selectAll('g.animal')
                  .data(arrayAnimals);

              // Network vis
              let networkVis;
              // let networkVisBak;
              if (indexTime in networkData) {
                  let network = networkData[indexTime];
                  // reset the group standard deviation for the hierarhcy
                  // needed for coloring of the dendrogram nodes (variacne)
                  resethierarchyGroupStdev();

                  // display the whole network
                  network = network.map(function(item) {
                      let animal1 = arrayAnimals.filter(function(obj) {
                          return obj['a'] === item['s'];
                      })[0];
                      let animal2 = arrayAnimals.filter(function(obj) {
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
                  networkVis = tank.select('#network-group')
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
                  networkVis = tank.selectAll('line.network-edges')
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
                  triangulation = tank.select('#delaunay-triangulation-group')
                      .selectAll('path.delaunay-triangulation')
                      .data([swarmData[indexTime]['triangulation']]);

                  // UPDATE - triangulation
                  triangulation
                      .attr('d', function(d) {
                          return d;
                      });
                  //ENTER - triangulation
                  triangulation.enter()
                      .append('path')
                      .attr('class', 'delaunay-triangulation')
                      .attr('d', function(d) {
                          return d;
                      });
              } else {
                  triangulation = tank.selectAll('path.delaunay-triangulation')
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
                  voronoi = tank
                      .select('#vornoi-group')
                      .selectAll('path.voronoi')
                      .data(swarmData[indexTime]['voronoi'].split(';'));

                  // UPDATE - voronoi
                  voronoi
                      .attr('d', function(d) {
                          return d;
                      });
                  //ENTER - voronoi
                  voronoi.enter()
                      .append('path')
                      .attr('class', 'voronoi')
                      .attr('d', function(d) {
                          return d;
                      });
              } else {
                  voronoi = tank.select('#vornoi-group')
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
                  .attr('id', function(d) {
                      return 'animal-' + d['a'];
                  });

              // Append the circles for each animal to the animalgroup
              animalGroupings.append('circle')
                  .attr('r', 1.5 * animalScale)
                  .attr('cx', function(d) {
                      return d['p'][0];
                  })
                  .attr('cy', function(d) {
                      return -d['p'][1];
                  })
                  .on('mouseover', function(d) {
                      tooltipFunction(d);
                  })
                  .on('mouseout', function() {
                      tooltip
                          .transition()
                          .duration(500)
                          .style('opacity', 0);
                  })
                  // add on click for the active fishs
                  .on('click', function(d) {
                      if (activeAnimals.includes(d['a'])) {
                          activeAnimals = activeAnimals.filter(item => item !== d['a']);
                      } else {
                          activeAnimals.push(d['a']);
                      }
                      if (!$('#play-button')
                          .hasClass('active')) {
                          //go back one second and draw the next frame
                          //this applys the changes
                          indexTime--;
                          draw();
                      }
                  });

              // UPDATE - animals circles
              svgAnimals.select('circle')
                  .attr('cx', function(d) {
                      return d['p'][0];
                  })
                  .attr('cy', function(d) {
                      return -d['p'][1];
                  })
                  .attr('r', animalScale);

              // Append for each group the arrow, needed for coloring
              animalGroupings.append('svg:defs')
                  .append('svg:marker')
                  .attr('id', function(d) {
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
                  .attr('marker-end', function(d) {
                      return 'url(#arrow-marker-' + d['a'] + ')';
                  });

              //execute only when draw direction button is checked
              if ($('#draw-direction')
                  .is(':checked')) {
                  // UPDATE animal direction arrow
                  svgAnimals.select('line')
                      .attr('x1', function(d) {
                          return d['p'][0];
                      })
                      .attr('y1', function(d) {
                          return -d['p'][1];
                      })
                      .attr('x2', function(d) {
                          return (d['p'][0] + 2 * animalScale);
                      })
                      .attr('y2', function(d) {
                          return (-d['p'][1]);
                      })
                      .attr('transform', function(d) {
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
                  var hullPath = tank.selectAll('path.hull-path')
                      .data([swarmData[indexTime]['convex_hull']]);

                  // UPDATE - hull path
                  hullPath
                      .attr('d', function(d) {
                          return d;
                      });

                  // ENTER - hull paths
                  hullPath.enter()
                      .append('path')
                      .attr('class', 'hull-path')
                      .attr('d', function(d) {
                          return d;
                      });

              } else {
                  // draw no hull
                  hullPath = tank.select('path.hull-path')
                      .data([]);
              }
              // EXIT - hull paths
              hullPath.exit()
                  .remove();

              //change the colors of the fish
              if (activeScale !== 'black') {
                  // once the fill for the heads and the stroke for the path
                  var tmpScale = returnColorScale();
                  svgAnimals
                      .transition()
                      .duration(10)
                      .style('fill', function(d) {
                          return tmpScale(d[activeScale]);
                      })
                      .attr('stroke', function(d) {
                          return tmpScale(d[activeScale]);
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
              if (activeAnimals.length) {
                  svgAnimals
                      .style('opacity', function(d) {
                          if (activeAnimals.includes(d['a'])) {
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
                      addTrackedData(arrayAnimals[0]['t'], activeAnimals);
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
                  .attr('cx', function() {
                      if ('centroid' in swarmData[0]) {
                          return swarmData[indexTime]['centroid'][0];
                      } else {
                          return 0;
                      }
                  })
                  .attr('cy', function() {
                      if ('centroid' in swarmData[0]) {
                          return -swarmData[indexTime]['centroid'][1];
                      } else {
                          return 0;
                      }
                  });
              if ($('#draw-direction').is(':checked') &&
                  swarmData[indexTime].centroid &&
                  $('#draw-centroid').is(':checked')) {
                  d3.select('#centroid-line')
                      .classed('hidden', false);
                  // UPDATE animal direction arrow
                  d3.select('#centroid-line')
                      .attr('x1', function() {
                          return swarmData[indexTime]['centroid'][0];
                      })
                      .attr('y1', function() {
                          return -swarmData[indexTime]['centroid'][1];
                      })
                      .attr('x2', function() {
                          return (swarmData[indexTime]['centroid'][0] + 2 * animalScale);
                      })
                      .attr('y2', function() {
                          return -swarmData[indexTime]['centroid'][1];
                      })
                      .attr('transform', function() {
                          return 'rotate(' + -swarmData[indexTime]['direction'] + ' ' + swarmData[indexTime]['centroid'][0] + ' ' + -swarmData[indexTime]['centroid'][1] + ')';
                      });
              } else {
                  // hide the arrows
                  d3.select('#centroid-line')
                      .attr('class', 'hidden');
              }

              // medoid
              if (medoidAnimal !== -1) {
                  d3.selectAll('#animal-' + medoidAnimal)
                      .classed('medoid', false);
                  medoidAnimal = swarmData[indexTime]['medoid'];
                  d3.selectAll('#animal-' + medoidAnimal)
                      .classed('medoid', true);
              }

              //next frame
              indexTime++;

              updateLineChart();


              //check if play button is active and if the animation is not finished
              if (indexTime >= swarmData.length) {
                  //start again from the start
                  indexTime = 0;
                  draw();
              } else if (playBoolean) {
                  //measure execution time
                  //   let t1 = performance.now();
                  //   console.log(t1 - t0); // in milliseconds
                  draw();
              }
          },
          timeToWait);
  };
  initDendrogram() {
      // constanct factors for the dendgrogram
      let margin = 20,
          width = 5000,
          height = 5000;

      // zoom function for the dendrogram
      let zoom = d3.zoom()
          .scaleExtent([1, 10])
          .on('zoom', function() {
              //constrained zooming
              d3.event.transform.x = Math.min(0, width * (d3.event.transform.k - 1),
                  Math.max(width * (1 - d3.event.transform.k), d3.event.transform.x));

              d3.event.transform.y = Math.min(0, height * (d3.event.transform.k - 1),
                  Math.max(height * (1 - d3.event.transform.k), d3.event.transform.y));

              // translate and scale
              zoomGroup.attr('transform', d3.event.transform);
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
      zoomGroup = svg.append('g')
          .attr('transform', 'translate(' + margin + ',' + margin + ')')
          .append('svg:g');

      // d3 tree
      treemap = d3.tree() //d3.cluster()
          .size([(height - 10 * margin), (width - 10 * margin)]);

      // set the spatial view - needed to add the clustering to the spatial view window
      spatialView = d3.select('.tank');

      // init dendrogram slider
      // initialize the Network slider
      $('#dendrogram-panel-level-slider')
          .slider({
              range: 'max',
              min: 2,
              max: 2,
              step: 1,
              value: hierarchyLevels['h0'],
              slide: function(event, ui) {
                  let id = $('.show-dendrogram.btn-primary').attr('data');
                  setHierarchyLevel(id, ui.value);
                  updateDendrogram();
                  // if no animation is active draw the new clustering and dendrogram
                  // drawDendrogram();
                  if (!$('#play-button').hasClass('active')) {
                      //go back one second and draw the next frame
                      //this applys the changes
                      decIndexTime();
                      draw();
                      drawDendrogram();
                  }
              }
          });

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

      svgLegend = d3.select('#hierarchy-legend-div')
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
          decIndexTime();
          draw();
      }
  };
  drawDendrogram() {
      // get the active dendrogram
      id = $('.show-dendrogram.btn-primary').attr('data');
      // if data is avaiable draw hierarchy clusters and a button is active selcted
      if (!$.isEmptyObject(networkHierarchy) && id) {
          // get the data and transform it
          let treeData = networkHierarchy['h' + id][indexTime];
          let nodes = d3.hierarchy(treeData, function(d) {
              return d.children;
          });
          // skip the root node
          nodes = nodes.children[0];
          // collapse the tree
          nodes.children.forEach(collapse);

          // maps the node data to the tree layout
          nodes = treemap(nodes);
          console.log(nodes);

          // hide if no network is choosen
          if ($('.show-dendrogram.btn-primary').length) {

              // set the new slider max
              $('#dendrogram-panel-level-slider')
                  .slider('option', 'max', (nodes['height'] - 1))
                  .slider('value', hierarchyLevels['h' + id]);

              // DATA JOIN - links (edges)
              let link = zoomGroup
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
              let node = zoomGroup
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
                  .attr('r', function(d) {
                      if (d['depth'] === hierarchyLevels['h' + id]) {
                          return 40 + d.data.name.length;
                      } else {
                          return 20 + d.data.name.length;
                      }
                  })
                  .attr('class', function(d) {
                      if (d['depth'] === hierarchyLevels['h' + id]) {
                          return 'active-level';
                      }
                  })
                  .attr('id', function(d) {
                      return 'h' + d['data']['name'].toString().hashCode();
                  })
                  // TODO find a nice function for the on click method
                  .on('click', click)
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
                  .text(function(d) {
                      return d.data.name.length;
                  });

              // UPDATE -- update the groups
              nodeEnter
                  .attr('transform', function(d) {
                      return 'translate(' + d.x + ',' + d.y + ')';
                  });

              // updae the node and circles
              // with active-level function to highlight which level is chosen
              node
                  .attr('transform', function(d) {
                      return 'translate(' + d.x + ',' + d.y + ')';
                  })
                  .select('circle')
                  .attr('r', function(d) {
                      if (d['depth'] === hierarchyLevels['h' + id]) {
                          return 40 + d.data.name.length;
                      } else {
                          return 20 + d.data.name.length;
                      }
                  })
                  .attr('class', function(d) {
                      if (d['depth'] === hierarchyLevels['h' + id]) {
                          // console.log('active-level');
                          // console.log(('h' + d['data']['name'].toString().hashCode()));
                          return 'active-level';
                      } else {
                          return '';
                      }
                  })
                  .attr('id', function(d) {
                      return 'h' + d['data']['name'].toString().hashCode();
                  });

              // update the text of number of entities
              node.select('text')
                  .text(function(d) {
                      return d.data.name.length;
                  });

              // EXIT
              node.exit()
                  .remove();

              // color the dendrogram nodes using the standardDeviation in the cluster
              if (Object.keys(hierarchyGroupStdev).length) {
                  // show the legend for the coloring
                  // console.log(hierarchyGroupStdev);
                  // TODO legend here
                  // console.log('JUMPS HERE');
                  if ($('#dendrogram-legend').css('display') == 'none') {
                      $('#dendrogram-legend').show();
                  }
                  // IMPORTANT - async problems
                  // TODO solve this - very slow
                  setTimeout(function() {
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
                              } else if (d['depth'] !== hierarchyLevels['h' + id]) {
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
          drawHierarchy();
      }
  };
  




}



/**
 * Drawing function - is called for each timestep
 * indexTime saves the current time
 */
export function draw() {
    //update time to wait aka speed of replay
    let timeToWait = $('input[type="radio"].group-playback-rate:checked')
        .val();
    //scale the size by this number
    let animalScale = $('input[type="radio"].group-size:checked')
        .val();

    //get the next animals
    arrayAnimals = dataset.filter(function(d) {
        return d['t'] === indexTime;
    });

    //the timeout is set after one update 30 ms
    setTimeout(function() {
            // draw hierarchy
            drawDendrogram();
            //change the time frame text
            svgContainer.select('.frame-text')
                .text(Math.floor(indexTime / 1500) % 60 + ':' + Math.floor(indexTime / parameters['fps']) % 60 + '::' + indexTime % parameters['fps']);
            // if a second has changed move the slider
            if (indexTime % parameters['fps'] === 0) {
                setTimeSlider(indexTime);
            }

            let svgAnimals = tank.selectAll('g.animal')
                .data(arrayAnimals);

            // Network vis
            let networkVis;
            // let networkVisBak;
            if (indexTime in networkData) {
                let network = networkData[indexTime];
                // reset the group standard deviation for the hierarhcy
                // needed for coloring of the dendrogram nodes (variacne)
                resethierarchyGroupStdev();

                // display the whole network
                network = network.map(function(item) {
                    let animal1 = arrayAnimals.filter(function(obj) {
                        return obj['a'] === item['s'];
                    })[0];
                    let animal2 = arrayAnimals.filter(function(obj) {
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
                networkVis = tank.select('#network-group')
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
                networkVis = tank.selectAll('line.network-edges')
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
                triangulation = tank.select('#delaunay-triangulation-group')
                    .selectAll('path.delaunay-triangulation')
                    .data([swarmData[indexTime]['triangulation']]);

                // UPDATE - triangulation
                triangulation
                    .attr('d', function(d) {
                        return d;
                    });
                //ENTER - triangulation
                triangulation.enter()
                    .append('path')
                    .attr('class', 'delaunay-triangulation')
                    .attr('d', function(d) {
                        return d;
                    });
            } else {
                triangulation = tank.selectAll('path.delaunay-triangulation')
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
                voronoi = tank
                    .select('#vornoi-group')
                    .selectAll('path.voronoi')
                    .data(swarmData[indexTime]['voronoi'].split(';'));

                // UPDATE - voronoi
                voronoi
                    .attr('d', function(d) {
                        return d;
                    });
                //ENTER - voronoi
                voronoi.enter()
                    .append('path')
                    .attr('class', 'voronoi')
                    .attr('d', function(d) {
                        return d;
                    });
            } else {
                voronoi = tank.select('#vornoi-group')
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
                .attr('id', function(d) {
                    return 'animal-' + d['a'];
                });

            // Append the circles for each animal to the animalgroup
            animalGroupings.append('circle')
                .attr('r', 1.5 * animalScale)
                .attr('cx', function(d) {
                    return d['p'][0];
                })
                .attr('cy', function(d) {
                    return -d['p'][1];
                })
                .on('mouseover', function(d) {
                    tooltipFunction(d);
                })
                .on('mouseout', function() {
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                })
                // add on click for the active fishs
                .on('click', function(d) {
                    if (activeAnimals.includes(d['a'])) {
                        activeAnimals = activeAnimals.filter(item => item !== d['a']);
                    } else {
                        activeAnimals.push(d['a']);
                    }
                    if (!$('#play-button')
                        .hasClass('active')) {
                        //go back one second and draw the next frame
                        //this applys the changes
                        indexTime--;
                        draw();
                    }
                });

            // UPDATE - animals circles
            svgAnimals.select('circle')
                .attr('cx', function(d) {
                    return d['p'][0];
                })
                .attr('cy', function(d) {
                    return -d['p'][1];
                })
                .attr('r', animalScale);

            // Append for each group the arrow, needed for coloring
            animalGroupings.append('svg:defs')
                .append('svg:marker')
                .attr('id', function(d) {
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
                .attr('marker-end', function(d) {
                    return 'url(#arrow-marker-' + d['a'] + ')';
                });

            //execute only when draw direction button is checked
            if ($('#draw-direction')
                .is(':checked')) {
                // UPDATE animal direction arrow
                svgAnimals.select('line')
                    .attr('x1', function(d) {
                        return d['p'][0];
                    })
                    .attr('y1', function(d) {
                        return -d['p'][1];
                    })
                    .attr('x2', function(d) {
                        return (d['p'][0] + 2 * animalScale);
                    })
                    .attr('y2', function(d) {
                        return (-d['p'][1]);
                    })
                    .attr('transform', function(d) {
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
                var hullPath = tank.selectAll('path.hull-path')
                    .data([swarmData[indexTime]['convex_hull']]);

                // UPDATE - hull path
                hullPath
                    .attr('d', function(d) {
                        return d;
                    });

                // ENTER - hull paths
                hullPath.enter()
                    .append('path')
                    .attr('class', 'hull-path')
                    .attr('d', function(d) {
                        return d;
                    });

            } else {
                // draw no hull
                hullPath = tank.select('path.hull-path')
                    .data([]);
            }
            // EXIT - hull paths
            hullPath.exit()
                .remove();

            //change the colors of the fish
            if (activeScale !== 'black') {
                // once the fill for the heads and the stroke for the path
                var tmpScale = returnColorScale();
                svgAnimals
                    .transition()
                    .duration(10)
                    .style('fill', function(d) {
                        return tmpScale(d[activeScale]);
                    })
                    .attr('stroke', function(d) {
                        return tmpScale(d[activeScale]);
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
            if (activeAnimals.length) {
                svgAnimals
                    .style('opacity', function(d) {
                        if (activeAnimals.includes(d['a'])) {
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
                    addTrackedData(arrayAnimals[0]['t'], activeAnimals);
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
                .attr('cx', function() {
                    if ('centroid' in swarmData[0]) {
                        return swarmData[indexTime]['centroid'][0];
                    } else {
                        return 0;
                    }
                })
                .attr('cy', function() {
                    if ('centroid' in swarmData[0]) {
                        return -swarmData[indexTime]['centroid'][1];
                    } else {
                        return 0;
                    }
                });
            if ($('#draw-direction').is(':checked') &&
                swarmData[indexTime].centroid &&
                $('#draw-centroid').is(':checked')) {
                d3.select('#centroid-line')
                    .classed('hidden', false);
                // UPDATE animal direction arrow
                d3.select('#centroid-line')
                    .attr('x1', function() {
                        return swarmData[indexTime]['centroid'][0];
                    })
                    .attr('y1', function() {
                        return -swarmData[indexTime]['centroid'][1];
                    })
                    .attr('x2', function() {
                        return (swarmData[indexTime]['centroid'][0] + 2 * animalScale);
                    })
                    .attr('y2', function() {
                        return -swarmData[indexTime]['centroid'][1];
                    })
                    .attr('transform', function() {
                        return 'rotate(' + -swarmData[indexTime]['direction'] + ' ' + swarmData[indexTime]['centroid'][0] + ' ' + -swarmData[indexTime]['centroid'][1] + ')';
                    });
            } else {
                // hide the arrows
                d3.select('#centroid-line')
                    .attr('class', 'hidden');
            }

            // medoid
            if (medoidAnimal !== -1) {
                d3.selectAll('#animal-' + medoidAnimal)
                    .classed('medoid', false);
                medoidAnimal = swarmData[indexTime]['medoid'];
                d3.selectAll('#animal-' + medoidAnimal)
                    .classed('medoid', true);
            }

            //next frame
            indexTime++;

            updateLineChart();


            //check if play button is active and if the animation is not finished
            if (indexTime >= swarmData.length) {
                //start again from the start
                indexTime = 0;
                draw();
            } else if (playBoolean) {
                //measure execution time
                //   let t1 = performance.now();
                //   console.log(t1 - t0); // in milliseconds
                draw();
            }
        },
        timeToWait);
}

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
