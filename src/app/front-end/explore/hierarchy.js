/*eslint-disable no-unused-lets*/
/*global window,$, d3, PolyBool*/
// import * as spv from './spatial_view.js';

import {
    networkHierarchy
} from './explore.js';

import {
    indexTime,
    arrayAnimals,
    setActiveAnimals,
    decIndexTime,
    draw
} from './spatial_view/spatial_view.js';

import {
    showNetworkHierarchy,
    networkColor,
    networkColorScale,
    networkAuto,
    setNetworLimit,
    networkLimit,
} from './network.js';

import {
    standardDeviation
} from './helpers.js';

import {
    setTimeSlider,
    initTooltip,
    tooltipFunction,
    initSliders,
    tooltip
} from './spatial_view/interaction.js';

import {
    //lineChart,
    updateLineChart,
    LineChart
} from './line_chart.js';

let zoomGroup; // zoom group for the specific dendrogram
let treemap;
let tooltipDiv;
let spatialView; // get the spatial view svg from the main vis
let svgLegend;
let hierarchyLevels = {};
let setOperation = 'union';
let id; // needed for the collapse function
//Static color scale for the dendrogram variacne coloring
let standardDeviationColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    )
    .range(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']);

export const maxNumberHierarchies = 4;
export let networkHierarchyIds = [];
export let hierarchyColors = {};
export let hierarchyGroupStdev = {};
// TODO add more colors
export let colors = ['#7fc97f', '#386cb0', '#e7298a', '#ff9900'];


export class Drawer {
  constructor(){
    this.tankWidth = 0;
    this.tankHeight=0;
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
    this.zoomGroup = this.svgContainer.append('svg:g');
    this.tank = this.zoomGroup.append('svg:g')
              .attr('class', 'tank')
              .attr('transform', function() {
                  let x = parameters.inverted_x ? -1 : 1;
                  let y = parameters.inverted_y ? -1 : 1;
                  return 'scale(' + x + ',' + y + ')';
              });
    this.indexTime = 0; // actual time moment in the animation

    this.activeScale = 'black'; // can be speed, acceleration, .. and black (meaning no active scale)
    this.medoidAnimal = -1; // which animal is the medoid (-1 is no animal)
    this.activeAnimals = []; // active selected animals
    this.arrayAnimals = 0 // array of animals for the specific time frame


  }
  static draw() {
      //update time to wait aka speed of replay
      let timeToWait = $('input[type="radio"].group-playback-rate:checked')
          .val();
      //scale the size by this number
      let animalScale = $('input[type="radio"].group-size:checked')
          .val();

      //get the next animals
      arrayAnimals = dataset.filter(function(d) {
          return d['t'] === this.indexTime;
      });

      //the timeout is set after one update 30 ms
      setTimeout(function() {
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
                  .data(arrayAnimals);

              // Network vis
              let networkVis;
              // let networkVisBak;
              if (this.indexTime in networkData) {
                  let network = networkData[this.indexTime];
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
                  voronoi = this.tank
                      .select('#vornoi-group')
                      .selectAll('path.voronoi')
                      .data(swarmData[this.indexTime]['voronoi'].split(';'));

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
                  var hullPath = this.tank.selectAll('path.hull-path')
                      .data([swarmData[this.indexTime]['convex_hull']]);

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
                  hullPath = this.tank.select('path.hull-path')
                      .data([]);
              }
              // EXIT - hull paths
              hullPath.exit()
                  .remove();

              //change the colors of the fish
              if (this.activeScale !== 'black') {
                  // once the fill for the heads and the stroke for the path
                  var tmpScale = returnColorScale();
                  svgAnimals
                      .transition()
                      .duration(10)
                      .style('fill', function(d) {
                          return tmpScale(d[this.activeScale]);
                      })
                      .attr('stroke', function(d) {
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
                      .style('opacity', function(d) {
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
                      addTrackedData(arrayAnimals[0]['t'], this.activeAnimals);
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
                          return swarmData[this.indexTime]['centroid'][0];
                      } else {
                          return 0;
                      }
                  })
                  .attr('cy', function() {
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
                      .attr('x1', function() {
                          return swarmData[this.indexTime]['centroid'][0];
                      })
                      .attr('y1', function() {
                          return -swarmData[this.indexTime]['centroid'][1];
                      })
                      .attr('x2', function() {
                          return (swarmData[this.indexTime]['centroid'][0] + 2 * animalScale);
                      })
                      .attr('y2', function() {
                          return -swarmData[this.indexTime]['centroid'][1];
                      })
                      .attr('transform', function() {
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

              updateLineChart();


              //check if play button is active and if the animation is not finished
              if (this.indexTime >= swarmData.length) {
                  //start again from the start
                  this.indexTime = 0;
                  this.draw();
              } else if (playBoolean) {
                  //measure execution time
                  //   let t1 = performance.now();
                  //   console.log(t1 - t0); // in milliseconds
                  this.draw();
              }
          },
          timeToWait);
  }
  static drawDendrogram() {
      // get the active dendrogram
      id = $('.show-dendrogram.btn-primary').attr('data');
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
              let link = this.zoomGroup
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
              let node = this.zoomGroup
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
  }

  static decindexTime() {
      this.indexTime = this.indexTime - 1;
  }
}



export class Dendrogram extends Drawer{
  constructor(){
    this.initDendrogram()
  }

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
                      this.decIndexTime();
                      this.draw();
                      this.drawDendrogram();
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

}


/**
 * Initialize the dendrogram
 */


/**
 * Draw the dendgrogram for one step
 * Further calls the drawHierarchy function
 */


/**
 * Collapse function - only show the active level and one sub level
 */
function collapse(d) {
    if (d.children && d.depth <= hierarchyLevels['h' + id]) {
        d._children = d.children;
        d._children.forEach(collapse);
    } else {
        d.children = null;
    }
}

/**
 * Draw the all hierarchies in the spatial view
 * add a group with the ids of the animals in it to the view
 * with path child elements
 */
export function drawHierarchy() {
    // id of the hierarchy e.g. [1,5,3]
    let hierarchyIds = Object.keys(networkHierarchy).map(function(x) {
        return x.replace('h', '');
    });
    //  The clustering in an 2D array with which animal id belongs to which group
    let hierarchyVertices = [];

    // iterate over the hierarchy data to get the hierarchy animal ids per clustering and grouping
    for (let i = 0; i < hierarchyIds.length; i++) {
        let treeData = networkHierarchy['h' + hierarchyIds[i]][indexTime];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        nodes = treemap(nodes);
        let root = nodes['children'][0];
        if (showNetworkHierarchy === hierarchyIds[i]) {
            networkHierarchyIds = getHierarchyLevel(root, hierarchyIds[i]);
        }
        // add the vertices into the array
        hierarchyVertices.push(getHierarchyVertices(getHierarchyLevel(root, hierarchyIds[i])));
    }

    // if more than 2 hierarchies are drawn
    if (hierarchyVertices.length > 0) {
        // union the list of polygons to one polygon
        // for (let i = 0; i < hierarchyIds.length; i++) {
        //     hierarchyVertices[i] = unionPolygons(hierarchyVertices[i]);
        // }

        // transform and calculate the intersection polygons of the n hierarchies
        // if (setOperation === 'intersection') {
        //     // temp solution of two intersections
        //     let tmpIntersection = hierarchyVertices[0];
        //     // iterate over the hierarchies and intersect all of them
        //     for (let i = 1; i < hierarchyVertices.length; i++) {
        //         // intersection
        //         tmpIntersection = PolyBool.intersect({
        //             regions: tmpIntersection, // list of regions
        //             inverted: false // is this polygon inverted?
        //         }, {
        //             regions: hierarchyVertices[i],
        //             inverted: false
        //         });
        //         // convert it again
        //         tmpIntersection = tmpIntersection['regions'];
        //     }
        //
        //     // result
        //     hierarchyVertices = [tmpIntersection];
        // }
        // // transform and calculate the symmetric difference polygons of the n hierarchies
        // else if (setOperation === 'sym-difference') {
        //     // xor = Union of all hierarchies - intersection of all hierarchies
        //     // temp solution of two intersections
        //     let tmpIntersection = hierarchyVertices[0];
        //     // iterate over the hierarchies and intersect all of them
        //     for (let i = 1; i < hierarchyVertices.length; i++) {
        //         // intersection
        //         tmpIntersection = PolyBool.intersect({
        //             regions: tmpIntersection, // list of regions
        //             inverted: false // is this polygon inverted?
        //         }, {
        //             regions: hierarchyVertices[i],
        //             inverted: false
        //         });
        //         // convert it again
        //         tmpIntersection = tmpIntersection['regions'];
        //     }
        //     // intersection result
        //     let intersectionHierarchyPolygons = tmpIntersection;
        //
        //     // union
        //     let tmpUnion = hierarchyVertices[0];
        //     // iterate over the hierarchies and intersect all of them
        //     for (let i = 1; i < hierarchyVertices.length; i++) {
        //         // intersection
        //         tmpUnion = PolyBool.union({
        //             regions: tmpUnion, // list of regions
        //             inverted: false // is this polygon inverted?
        //         }, {
        //             regions: hierarchyVertices[i],
        //             inverted: false
        //         });
        //         // convert it again
        //         tmpUnion = tmpUnion['regions'];
        //     }
        //     let unionHierarchyPolygons = tmpUnion;
        //
        //
        //     // symmetric difference
        //     let tmpDifference = PolyBool.xor({
        //         regions: unionHierarchyPolygons, // list of regions
        //         inverted: false // is this polygon inverted?
        //     }, {
        //         regions: intersectionHierarchyPolygons,
        //         inverted: false
        //     });
        //     // convert it again
        //     tmpDifference = tmpDifference['regions'];
        //     // result
        //     hierarchyVertices = [tmpDifference];
        // }
    }

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

/**
 * Union multiple polygons together - needed or else there will be holes in the intersections
 * @param {array} polygons - array of array of points
 */
// function unionPolygons(polygons) {
//     // console.log(polygons);
//     for (let i = 0; i < polygons.length; i++) {
//         polygons[i] = {
//             regions: [polygons[i]],
//             inverted: false // is this polygon inverted?
//         };
//     }
//     // union a list of polygons together
//     let segments = PolyBool.segments(polygons[0]);
//     for (let i = 1; i < polygons.length; i++) {
//         let seg2 = PolyBool.segments(polygons[i]);
//         let comb = PolyBool.combine(segments, seg2);
//         segments = PolyBool.selectUnion(comb);
//     }
//     return PolyBool.polygon(segments)['regions'];
// }

/**
 * Edge drawing method of the dendrogram
 * @param {object} d - Treemap element
 */
function diagonalLines(d) {
    return 'M' + d.x + ',' + d.y +
        'V' + d.parent.y + 'H' + d.parent.x;
}

/**
 * On click function - highlight the elements in the spatial view
 * @param {object} d - Treemap element
 */
function click(d) {
    setActiveAnimals(d['data']['name']);
    // if no animation is active draw the draw one step
    if (!$('#play-button').hasClass('active')) {
        decIndexTime();
        draw();
    }
}

/**
 * Get all the clustering of a specific level in the dendrogram tree
 * For instance all clusters from level 5
 * @param {object} root - Root of the treemap
 * @param {number} hiearchy - Number of hierarchy from [0-3]
 */
function getHierarchyLevel(root, hierarchy) {
    let result = [];
    let level = hierarchyLevels['h' + hierarchy];

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

/**
 * Return the specific vertices of a clustering in the spatial view
 * Return an array of points [[x,y][x,y]...]
 * @param {Array} hierarchies - Array of arrays with each array contains all the ids for a specific clustering
 */
function getHierarchyVertices(hierarchies) {
    let result = []; // result set
    hierarchies.forEach(function(cluster) {
        let vertices = []; // vertices of the clusters in the spatial view
        for (let j = 0; j < cluster.length; j++) {
            let groupMember = arrayAnimals.find(d => d['a'] === cluster[j]);
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

/**
 * Set the active level for a specific dendrogram
 * @param {number} hierarchy - Hierarchy can be from [0-3]
 * @param {number} level - New active level
 */
export function setHierarchyLevel(hierarchy, level) {
    // TODO catch cases < 0 and bigger than overall height
    hierarchyLevels['h' + hierarchy] = level;
}

/**
 * Remove the entry for the hierarch level
 * @param {number} hierarchy - Hierarchy
 */
export function removeHierarchyLevel(hierarchy) {
    // TODO catch cases < 0 and bigger than overall height
    delete hierarchyLevels['h' + hierarchy];
}

/**
 * Set the active color for a specific dendrogram
 * @param {number} hierarchy - Hierarchy can be from [0-3]
 */
export function setHierarchyColor(hierarchy) {
    // check if the hierarchy is already shown as network
    // take the same color
    for (let key in networkColor) {
        if (key === ('h' + hierarchy)) {
            hierarchyColors['h' + hierarchy] = networkColor[key];
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
            if (Object.keys(networkColor).length !== 0) {
                for (let key in networkColor) {
                    if (networkColor[key] !== colors[i]) {
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

/**
 * Remove the color for the hierarch level
 * @param {number} hierarchy - Hierarchy
 */
export function removeHierarchyColor(hierarchy) {
    delete hierarchyColors['h' + hierarchy];
}

/**
 * Add the hierarchy button to the div
 * @param {number} id - Hierarchy of the id
 * @param {String} name - New active level
 */
export function addHierarchyButton(id, name) {
    if ($('.show-dendrogram').length < maxNumberHierarchies) {
        $('#dendrogram-buttons-div').append('<button type="button" id="show-dendrogram-' + id + '" data=' + id + ' name=' + name +
            ' class="show-dendrogram btn btn-block" data-toggle="button" aria-pressed="false" autocomplete="off">' +
            ' <span class="btn-label" id="btn-left"> <i class="mdi mdi-arrow-collapse-left"></i>&nbsp&nbsp Show ' + name + '</span>' +
            '<span class="btn-label" id="btn-right"> <i class="mdi mdi-arrow-collapse-right"></i>&nbsp&nbsp Hide ' + name + ' </span></button> <br>'
        );
        $('#show-dendrogram-' + id).find('#btn-right').hide();
    }
}

/**
 * Remove a specific hierarchy button to the div
 * @param {number} id - Hierarchy of the id
 */
export function removeHierarchyButton(id) {
    // remove the following line break and element
    $('#show-dendrogram-' + id).next().remove();
    $('#show-dendrogram-' + id).remove();
}

/**
 * Update slider and text in the dendrogram panel
 */
export function updateDendrogram() {
    // get the important info
    let id = $('.show-dendrogram.btn-primary').attr('data');
    let name = $('.show-dendrogram.btn-primary').attr('name');
    // set the name of the displayed hierarchy
    $('#dendrogram-panel-name').text(name);

    // set slider and  text value
    $('#dendrogram-panel-level-slider').val(hierarchyLevels['h' + id]);
    $('#dendrogram-panel-level-text').text(hierarchyLevels['h' + id]);

}

/**
 * Update hierarchy legend
 */
export function changeHierarchyLegend() {
    let legend; // the color legend
    let legendText; // color legend text
    // vars for the legend
    let legendSwatchWidth = 50;
    let legendSwatchHeight = 20;

    // Show or hide the svg element
    if (Object.keys(hierarchyColors).length !== 0 || Object.keys(networkColor).length !== 0) {
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
    if (Object.keys(networkColor).length !== 0) {
        for (let key in networkColor) {
            if (legendData.indexOf(networkColor[key]) === -1) {
                legendData.push(networkColor[key]);
                legendTextData.push('Network');
            }
        }
    }
    // DATA JOIN
    legend = svgLegend.selectAll('rect.legend')
        .data(legendData);
    legendText = svgLegend.selectAll('text.legend-text')
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


/**
 * Initialize the dendrogram legend
 */
export function initDendrogramLegend() {
    let legendWidth = 550;
    let legendHeight = 60;

    let dendrogramLegend = d3.select('#dendrogram-panel')
        .append('svg')
        .attr('id', 'dendrogram-legend')
        .attr('width', legendWidth)
        .attr('height', legendHeight);

    $('#dendrogram-legend').hide();

    let legend; // the color legend
    let legendText; // color legend text
    // vars for the legend
    let legendSwatchWidth = 50;
    let legendSwatchHeight = 20;

    let legendData = standardDeviationColorScale.range();
    //TODO change this to better solution
    let legendTextData = ['low', '', '', '', '', '', '', '', 'high'];

    legend = dendrogramLegend.selectAll('rect.legend')
        .data(legendData);
    legendText = dendrogramLegend.selectAll('text.legend-text')
        .data(legendTextData);

    // ENTER - legend
    legend
        .enter()
        .append('rect')
        .attr('class', 'legend')
        .attr('width', legendSwatchWidth)
        .attr('height', legendSwatchHeight)
        .attr('y', 0)
        .attr('x', function(d, i) {
            return (i * legendSwatchWidth) + 'px';
        })
        .style('fill', function(d) {
            return d;
        });

    // --------------- Text  -------------------
    // ENTER - legend text
    legendText
        .enter()
        .append('text')
        .attr('class', 'legend-text')
        .attr('y', 2 * legendSwatchHeight)
        .attr('x', function(d, i) {
            return (i * legendSwatchWidth) + 'px';
        })
        .text(function(d) {
            return d;
        });
}

/**
 * Set the set operation
 * @param {string} operation - e.g. "union" "intersection" "sym-difference"
 */
export function setSetOperation(value) {
    setOperation = value;
}

/**
 * Set the hierarchy group standard deviation
 * @param {String} key - unique hash id for the group
 * @param {number} value - unique hash id for the group
 */
export function sethierarchyGroupStdev(key, value) {
    if (key in hierarchyGroupStdev) {
        hierarchyGroupStdev[key].push(value);
    } else {
        hierarchyGroupStdev[key] = [value];
    }
}

/**
 * Reset hierarchy group standard deviation
 */
export function resethierarchyGroupStdev() {
    hierarchyGroupStdev = {};
}

/**
 * Highlight a subset of animals in the spatial view
 * @param {array} animals - array of animal ids which have to be highlighted
 */
export function addHighlightSpatialView(animals) {
    // points to calculate the convex hull of the highlight cluster
    let vertices = [];
    // iterate through the objects in the cluster
    // get the points and highlight the animals
    for (let i = 0; i < animals.length; i++) {
        let tmpAnimal = spatialView.select('#animal-' + animals[i]);
        let point = tmpAnimal.data()[0]['p'];
        vertices.push([point[0], -point[1]]);

        tmpAnimal.classed('animal-highlight', true);
    }
    // add a polygon hull in the spatial view
    spatialView.append('path')
        .attr('class', 'highlight-hierarchy')
        .attr('d', ('M' + d3.polygonHull(vertices).join('L') + 'Z'));
}

/**
 * Remove the highlight in the spatial view
 */
export function removeHighlightSpatialView() {
    // remove the coloring and the hierarchy highlight hull
    d3.selectAll('.animal').classed('animal-highlight', false);
    d3.selectAll('.highlight-hierarchy').remove();
}
