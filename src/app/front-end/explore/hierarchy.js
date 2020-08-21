/*eslint-disable no-unused-lets*/
/*global window,$, d3, PolyBool, parameters, Set*/
// import * as spv from './spatial_view.js';

import {
    networkHierarchy
} from './explore.js';

import {
    indexTime,
    arrayAnimals,
    setActiveAnimals,
    decIndexTime,
    Drawer
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

//let zoomGroup; // zoom group for the specific dendrogram
let treemap; // beide
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


<<<<<<< HEAD
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
                    //drawDendrogram();
                }
            }
        });
=======
>>>>>>> hierarchyzoom




export class Dendrogram extends Drawer{
  constructor(){
    super();
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
          .on('zoom', ()=>{
              //constrained zooming
              d3.event.transform.x = Math.min(0, width * (d3.event.transform.k - 1),
                  Math.max(width * (1 - d3.event.transform.k), d3.event.transform.x));

              d3.event.transform.y = Math.min(0, height * (d3.event.transform.k - 1),
                  Math.max(height * (1 - d3.event.transform.k), d3.event.transform.y));

              // translate and scale
              this.zoomGroup.attr('transform', d3.event.transform);
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
      this.zoomGroup = svg.append('g')
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
export function collapse(d) {
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
        console.log(treeData);
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
export function diagonalLines(d) {
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
export function getHierarchyLevel(root, hierarchy) {
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
export function getHierarchyVertices(hierarchies) {
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
