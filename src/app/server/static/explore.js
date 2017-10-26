/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataset", function() { return dataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datasetMetadata", function() { return datasetMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "swarmData", function() { return swarmData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataSetPercentile", function() { return dataSetPercentile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomFunction", function() { return zoomFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "networkData", function() { return networkData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animal_ids", function() { return animal_ids; });
/* harmony export (immutable) */ __webpack_exports__["addToDataset"] = addToDataset;
/* harmony export (immutable) */ __webpack_exports__["setDataSetPercentile"] = setDataSetPercentile;
/* harmony export (immutable) */ __webpack_exports__["setMetaData"] = setMetaData;
/* harmony export (immutable) */ __webpack_exports__["setSwarmData"] = setSwarmData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__metadata_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__explore_css__);
/*eslint-disable no-unused-lets*/
/*global window, $ */
// import all js





// import css


let dataset = [];
let datasetMetadata = [];
let swarmData = [];
let dataSetPercentile = {};
let zoomFunction;
let networkData = {};
let animal_ids = [];

/**
 * Load the movement data with ajax queries
 * Afterwards if all ajax queries are finished
 * draw the group view
 */
$(document).ready(function() {
    // console.log(parameters);

    // get the movement data
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["e" /* streamMovementData */]();

    // get the dataSetPercentile
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["c" /* getPercentile */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["d" /* getSwarmFeatures */]();

    // get the metadata and initialize the metada window
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["a" /* getMetaData */]();

    // get the information if there are already networks created for this dastaset
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["b" /* getNetworkData */]();

    // if all ajax queries are compelte initialize
    (function() {
        function checkPendingRequest() {
            if ($.active > 0) {
                window.setTimeout(checkPendingRequest, 100);
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["d" /* spatialView */])();
            }
        }
        window.setTimeout(checkPendingRequest, 100);
    })();

});

/**
 * Concact to the dataset
 * the idea is to use this one day for lazy loading
 * @param {array} value -array of movement datasets
 */
function addToDataset(value) {
    dataset = dataset.concat(value);
}

/**
 * Set dataset percentile
 * @param {array} value - array of arrarys
 */
function setDataSetPercentile(value) {
    dataSetPercentile = value;
}

/**
 * Set dataset metadata
 * @param {array} value - array
 */
function setMetaData(value) {
    datasetMetadata = value;
    // initialize the metadata modal
    Object(__WEBPACK_IMPORTED_MODULE_2__metadata_js__["a" /* initializeMetaddata */])();
}

/**
 * Add a new feature dimension to the swarm dataset
 * makes this modular
 * @param {array} data - Array of swarm values consisting of [{time:.., feature:..},{...}...]
 * @param {string} feature - string array of the feature
 */
function setSwarmData(data, feature) {
    for (let i = 0; i < data.length; i++) {
        if (typeof swarmData[i] === 'undefined') {
            swarmData.push({});
        }
        swarmData[i][feature] = +data[i];
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setIndexTime;
/* harmony export (immutable) */ __webpack_exports__["a"] = getZoomFunction;
/* harmony export (immutable) */ __webpack_exports__["c"] = setZoomFunction;
/* harmony export (immutable) */ __webpack_exports__["d"] = spatialView;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_chart__ = __webpack_require__(2);
/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set, colorbrewer */






let zoomFunction;
let indexTime = 0;

function setIndexTime(value) {
    indexTime = value;
}

function getZoomFunction() {
    return zoomFunction;
}

function setZoomFunction(value) {
    zoomFunction = value;
}

let JSONAPI_MIMETYPE = 'application/vnd.api+json';


/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
function spatialView() {

    // Global namespace variables
    let $slider;
    let svgContainer;
    let tank;
    let tooltip; // the tooltip
    let playBoolean = true; // pause and play boolean
    var activeScale = 'black'; // no color scales
    var colorScales = {
        type: 'Linear',
        color: colorbrewer.BuYlBu
    };
    let svgLegend;
    let tankWidth;
    let tankHeight;
    let medoidAnimal = -1;
    let lineChartWidth = 5000;
    let lineChartRatio = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length / lineChartWidth);
    let arrayAnimals;
    let activeAnimals = []; // active selected animals
    let brush; // brushing variable
    let metadataColor = {}; // save the metadata coloring
    let networkColorScale;
    let networkLimit = 0;
    let networkAuto = false; // if true the network edge limit is automatically suggested
    let animal_ids;


    initialize();

    /**
     * Initialize various components:
     *      SVG and Animal Tank
     *      Zoom
     *      Tooltip
     */
    function initialize() {

        let minPoint = parameters['min']['geometry']['coordinates'];
        let maxPoint = parameters['max']['geometry']['coordinates'];
        // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
        // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
        tankWidth = (maxPoint[0] - minPoint[0]) * 1.02;
        tankHeight = (maxPoint[1] - minPoint[1]) * 1.02;

        $(function() {
            $('#main-vis').draggable({
                    containment: 'parent'
                }).resizable({
                    aspectRatio: true,
                    maxWidth: $('#main-vis-div').width()
                }).height(tankHeight * 0.5)
                .width(tankWidth * 0.5);

        });

        //reset all checkboxes
        $('input[type=checkbox]')
            .attr('checked', false);
        //set the color scale function to linear
        $('#color-scale-linear')
            .prop('checked', true);
        $('#group-size-m')
            .prop('checked', true);
        $('#background-white')
            .prop('checked', true);
        $('#settings-div input[type=checkbox]')
            .prop('checked', true);
        //hide the loading gif
        $('#loading')
            .hide();

        // number of distinct animal ids
        let num_animals = new Set();
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
            if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['t'] === __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0]['t']) {
                num_animals.add(__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['a']);
            } else {
                i = __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length;
            }
        }
        animal_ids = Array.from(num_animals).sort();

        // initialize the slider
        $slider = $('#slider')
            .slider({
                min: 0,
                max: __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length,
                step: 25,
                slide: function(event, ui) {
                    indexTime = ui.value;
                    // if paused apply changes
                    if (!$('#play-button').hasClass('active')) {
                        //this applys the changes
                        draw();
                    }
                }
            });
        // initialize the network slider
        $('#network-slider')
            .slider({
                range: 'max',
                min: 0,
                max: 1,
                step: 0.01,
                value: 0,
                slide: function(event, ui) {
                    networkLimit = ui.value;
                    $('#network-limit').val(networkLimit);
                }
            });

        // get the max from the slider this is needed to calculate the ticks
        let max = $slider.slider('option', 'max');
        let space = 100 / max;
        //append the minute ticks
        for (let i = 0; i < max; i = i + 1500) {
            $('<span class="ui-slider-tick"></span>')
                .css('left', (space * i) + '%')
                .appendTo($slider);
        }
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
                d3.event.transform.x = Math.min(0, tankWidth * (d3.event.transform.k - 1), Math.max(tankWidth * (1 - d3.event.transform.k), d3.event.transform.x));
                d3.event.transform.y = Math.min(0, tankHeight * (d3.event.transform.k - 1), Math.max(tankHeight * (1 - d3.event.transform.k), d3.event.transform.y));

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


        /* depends on svg ratio, for  1240/1900 = 0.65 so padding-bottom = 65% */
        let percentage = Math.ceil((tankHeight / tankWidth) * 100);
        $('#main-vis').append($('<style>#main-vis::after {padding-top: ' + percentage + '%;display: block;content: "";}</style> '));

        zoomGroup = svgContainer.append('svg:g');

        if (parameters.background_image) {
            zoomGroup
                .append('image')
                //  .attr('d',path)
                .attr('xlink:href', '/' + parameters.background_image)
                .attr('class', 'backgroundImage')
                .attr('height', tankHeight)
                .attr('width', tankWidth)
                // while adding an image to an svg these are the coordinates i think of the top left
                .attr('x', '0')
                .attr('y', '0')
                .attr('background', '#fff');

        }

        //append the tank group with a transformation which rotates the y axis
        tank = zoomGroup.append('svg:g')
            .attr('class', 'tank')
            .attr('transform', function() {
                let x = 1;
                let y = 1;
                if (parameters.inverted_x) {
                    x = -1;
                }
                if (parameters.inverted_y) {
                    y = -1;
                }
                return 'scale(' + x + ',' + y + ')';
            });

        //add the centroid
        tank.append('g')
            .attr('id', 'g-centroid')
            .append('circle')
            .attr('class', 'centroid hidden')
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
            .attr('id', 'networkGroup');

        //append delaunayTriangulation group
        tank.append('g')
            .attr('id', 'delaunayTriangulationGroup');

        //append voronoi group
        tank.append('g')
            .attr('id', 'vornoiGroup');

        // group for the legend
        svgLegend = d3.select('#main-vis-legend-div')
            .classed('svg-legendContainer', true)
            // to make it responsive with css
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '0 0 ' + tankWidth + ' ' + 100)
            // add the class svg-content
            .classed('svg-content-legend', true)
            .append('svg:g')
            .attr('class', 'colorLegend');


        //append the frame time text
        svgContainer.append('text')
            .attr('class', 'frameText')
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

        //tooltip
        tooltip = d3.select('div.tooltip')
            .style('left', 0 + 'px')
            .style('top', 0 + 'px')
            .on('mouseover', function() {
                tooltip
                    .style('opacity', 1);
            });


        //definte the line chart time scale
        zoomFunction = d3.scaleLinear()
            .domain([0, __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length])
            .range([0, __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length]);

        d3.select('.colors-body')
            .selectAll('.palette')
            .data(d3.entries(colorbrewer))
            .enter()
            .append('span')
            .attr('class', 'palette')
            .attr('title', function(d) {
                return d.key;
            })
            .on('click', function(d) {
                // hightlight the right palette
                $('.palette').removeClass('selected');
                $('.palette[title=\"' + d.key + '\"]').addClass('selected');
                colorScales.color = colorbrewer[d.key];
                changeLegend();
                if (!$('#play-button')
                    .hasClass('active')) {
                    //go back one second and draw the next frame
                    //this applys the changes
                    indexTime--;
                    draw();
                }
            })
            .selectAll('.swatch')
            .data(function(d) {
                return d.value;
            })
            .enter()
            .append('span')
            .attr('class', 'swatch')
            .style('background-color', function(d) {
                return d;
            });
        // highlight the selected color scheme
        $('.palette[title=\"BuYlBu\"]').addClass('selected');

        // fixed color scale for the network
        networkColorScale = d3.scaleThreshold()
            .domain(
                [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
            )
            .range(['#ffffff', '#dfdfdf', '#c0c0c0', '#a3a3a3', '#858585', '#696969', '#4e4e4e', '#353535', '#1d1d1d', '#000000']);

        //Draw the fish swarm line chart
        Object(__WEBPACK_IMPORTED_MODULE_1__line_chart__["a" /* lineChart */])();

        draw();

    }


    /**
     * Drawing function - is called for each timestep
     * indexTime saves the current time
     *
     */
    function draw() {
        //measure execution time of function draw
        // let t0 = performance.now();

        //update time to wait aka speed of replay
        let timeToWait = $('input[name=group1]:checked', '#group1')
            .val();
        //scale the size by this number
        let animalScale = $('input[type="radio"].group-size:checked')
            .val();

        //get the next animals
        arrayAnimals = __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].slice(animal_ids.length * indexTime, animal_ids.length * indexTime + animal_ids.length);

        //the timeout is set after one update 30 ms
        setTimeout(function() {
                //change the time frame text
                svgContainer.select('.frameText')
                    .text(Math.floor(indexTime / 1500) % 60 + ':' + Math.floor(indexTime / parameters['fps']) % 60 + '::' + indexTime % parameters['fps']);
                // if a second has changed move the slider
                if (indexTime % parameters['fps'] === 0) {
                    $slider.slider('value', indexTime);
                }

                let svgAnimals = tank.selectAll('g.animal')
                    .data(arrayAnimals);

                // Network vis
                let networkVis;
                if (indexTime in __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"]) {
                    let network = [];
                    let tmp = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"][indexTime];

                    let tmp_index = 0;
                    for (let i = 0; i < arrayAnimals.length; i++) {
                        for (let j = i + 1; j < arrayAnimals.length; j++) {
                            network.push({
                                'node1': arrayAnimals[i]['a'],
                                'node2': arrayAnimals[j]['a'],
                                'start': arrayAnimals[i]['p'],
                                'end': arrayAnimals[j]['p'],
                                'val': tmp[tmp_index]
                            });
                            tmp_index = tmp_index + 1;
                        }
                    }
                    network.forEach(function(d) {
                        $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', networkColorScale(d['val']));
                        $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', networkColorScale(d['val']));
                    });

                    if (networkAuto) {
                        let tmpArray = [];
                        for (let i = 0; i < network.length; i++) {
                            tmpArray.push(network[i]['val']);
                        }
                        networkLimit = percentiles(tmpArray);
                    }

                    network = network.filter(function(d) {
                        return d['val'] >= networkLimit;
                    });
                    // DATA JOIN
                    networkVis = tank.select('#networkGroup')
                        .selectAll('line.networkEdges')
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
                            return (d['end'][0]);
                        })
                        .attr('y2', function(d) {
                            return (-d['end'][1]);
                        })
                        .attr('stroke', function(d) {
                            return networkColorScale(d['val']);
                        })
                        .attr('stroke-opacity', function(d) {
                            return d['val'];
                        });
                    //ENTER
                    networkVis
                        .enter()
                        .append('line')
                        .attr('class', 'networkEdges')
                        .attr('x1', function(d) {
                            return d['start'][0];
                        })
                        .attr('y1', function(d) {
                            return -d['start'][1];
                        })
                        .attr('x2', function(d) {
                            return (d['end'][0]);
                        })
                        .attr('y2', function(d) {
                            return (-d['end'][1]);
                        })
                        .attr('stroke', function(d) {
                            return networkColorScale(d['val']);
                        })
                        .attr('stroke-opacity', function(d) {
                            return d['val'];
                        });



                } else {
                    networkVis = tank.selectAll('line.networkEdges')
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
                    triangulation = tank.select('#delaunayTriangulationGroup')
                        .selectAll('path.delaunayTriangulation')
                        .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['triangulation']]);

                    // UPDATE - triangulation
                    triangulation
                        .attr('d', function(d) {
                            return d;
                        });
                    //ENTER - triangulation
                    triangulation.enter()
                        .append('path')
                        .attr('class', 'delaunayTriangulation')
                        .attr('d', function(d) {
                            return d;
                        });
                } else {
                    triangulation = tank.selectAll('path.delaunayTriangulation')
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
                        .select('#vornoiGroup')
                        .selectAll('path.voronoi')
                        .data(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['voronoi'].split(';'));


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
                    voronoi = tank.select('#vornoiGroup')
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
                    svgAnimals.select('line')
                        .attr('class', 'arrow hidden');
                }

                // EXIT - the groups
                svgAnimals.exit()
                    .remove();

                //Convex hull
                if ($('#draw-convex-hull')
                    .is(':checked')) {
                    // DATA JOIN - paths
                    var hullPath = tank.selectAll('path.hullPath')
                        .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['hull']]);

                    // UPDATE - hull path
                    hullPath
                        .attr('d', function(d) {
                            return d;
                        });

                    // ENTER - hull paths
                    hullPath.enter()
                        .append('path')
                        .attr('class', 'hullPath')
                        .attr('d', function(d) {
                            return d;
                        });

                } else {
                    // draw no hull
                    hullPath = tank.select('path.hullPath')
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
                    }
                } else {
                    if (!$('#remove-active-selected-button')
                        .is(':disabled')) {
                        $('#remove-active-selected-button')
                            .prop('disabled', true);
                    }
                    // normal opacity
                    svgAnimals
                        .style('opacity', 1);
                }

                //draw centroid
                d3.select('.centroid')
                    .attr('cx', function() {
                        if ('centroid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0]) {
                            return __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][0];
                        } else {
                            return 0;
                        }
                    })
                    .attr('cy', function() {
                        if ('centroid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0]) {
                            return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][1];
                        } else {
                            return 0;
                        }
                    });
                if ($('#draw-direction').is(':checked') &&
                    __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime].centroid &&
                    $('#draw-centroid').is(':checked')) {
                    d3.select('#centroid-line')
                        .classed('hidden', false);
                    // UPDATE animal direction arrow
                    d3.select('#centroid-line')
                        .attr('x1', function() {
                            return __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][0];
                        })
                        .attr('y1', function() {
                            return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][1];
                        })
                        .attr('x2', function() {
                            return (__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][0] + 2 * animalScale);
                        })
                        .attr('y2', function() {
                            return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][1];
                        })
                        .attr('transform', function() {
                            return 'rotate(' + -__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['direction'] + ' ' + __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][0] + ' ' + -__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['centroid'][1] + ')';
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
                    medoidAnimal = __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['medoid'];
                    d3.selectAll('#animal-' + medoidAnimal)
                        .classed('medoid', true);
                }

                //next frame
                indexTime++;

                if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][Math.ceil(indexTime / lineChartRatio)]) {
                    let tmp = Math.ceil(indexTime / lineChartRatio);
                    //update the line chart legend text values per second
                    if (indexTime % 25 === 0) {
                        // TODO change this to a more modular way
                        d3.select('#convex_hull_areaLineValue')
                            .text((__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['convex_hull_area']) + 'mm²');
                        d3.select('#speedLineValue')
                            .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['speed'] + 'mm/s');
                        d3.select('#accelerationLineValue')
                            .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['acceleration'] + 'mm/s²');
                        d3.select('#distance_centroidLineValue')
                            .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['distance_centroid'] + 'mm');
                        d3.select('#directionLineValue')
                            .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['direction'] + '°');
                        d3.select('#polarisationLineValue')
                            .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][tmp]['polarisation']);
                    }

                    d3.select('#lineChartTimeLine')
                        .attr('transform', 'translate(' + zoomFunction(tmp) + ',0)');
                }


                //check if play button is active and if the animation is not finished
                if (indexTime >= __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length) {
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


    /**
     * Play or stop the animation
     */
    $('#play-button').click(function() {
        if ($('#play-button').hasClass('active') === true) {
            playBoolean = false;
        } else {
            playBoolean = true;
            indexTime = $slider.slider('value');
            $('.brush').remove();
            draw();
        }
    });

    /**
     * Pause the animation and show only the next frame
     */
    $('#next-frame-button').click(function() {
        if ($('#play-button').hasClass('active') === true) {
            playBoolean = false;
        }
        $('#play-button').removeClass('active');
        draw();
    });

    /**
     * Draw Speed button
     */
    $('#draw-speed').click(function() {
        if ($('#draw-speed').is(':checked')) {
            // load absolute feature speed data once
            if (!('speed' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0])) {
                disablePlayButton();
                // ajax query to get the absolute feature speed
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/speed',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        // add the speed feature to the dataset
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['speed'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#draw-speed-details').removeClass('hidden');
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
            activeScale = 'speed';
        } else {
            $('#draw-speed-details').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
    });

    /**
     * Draw acceleration button
     */
    $('#draw-acceleration').click(function() {
        if ($('#draw-acceleration').is(':checked')) {
            // load absolute feature acceleration data once
            if (!('acceleration' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0])) {
                disablePlayButton();
                // ajax query to get the absolute feature acceleration
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/acceleration',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        // add the acceleration feature to the self.dataset
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['acceleration'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#draw-acceleration-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
            activeScale = 'acceleration';
        } else {
            $('#draw-acceleration-details').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
    });

    /**
     * Draw distance to centroid button
     */
    $('#draw-distance-centroid').click(function() {
        if ($('#draw-distance-centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0])) {
                disablePlayButton();
                // ajax query to get the absolute feature distance_centroid
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/distance_centroid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        // add the distance_centroid feature to the self.dataset
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['distance_centroid'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#draw-distance-centroid-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            activeScale = 'distance_centroid';
        } else {
            $('#draw-distance-centroid-details').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
    });

    /**
     * Draw direction arrow of the animal
     */
    $('#draw-direction').click(function() {
        if ($('#draw-direction').is(':checked')) {
            // load absolute feature speed data once
            if (!('direction' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0])) {
                disablePlayButton();
                // ajax query to get the absolute feature speed
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/direction',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        // add the speed feature to the dataset
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['direction'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            d3.selectAll('.arrow')
                .classed('hidden', false);
        } else {
            d3.selectAll('.arrow')
                .classed('hidden', true);
        }
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
    });

    /**
     * Draw medoid in color button
     */
    $('#draw-medoid').click(function() {
        if ($('#draw-medoid').is(':checked')) {
            if (!('medoid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/medoid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i]['medoid'] = data[i];
                        }
                        enablePlayButton();
                    }
                });

            }
            medoidAnimal = __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['medoid'];
            // display the medoid
            d3.selectAll('#animal-' + medoidAnimal)
                .classed('medoid', true);
        } else {
            // do not display the medoid fish
            d3.selectAll('#animal-' + medoidAnimal)
                .classed('medoid', false);
            medoidAnimal = -1;
        }
    });

    /**
     * Draw centroid button
     */
    $('#draw-centroid').click(function() {
        if ($('#draw-centroid').is(':checked')) {
            if (!('centroid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/centroid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i]['centroid'] = [Math.round(data[i][0] * 100) / 100, Math.round(data[i][1] * 100) / 100];
                        }
                        enablePlayButton();
                    }
                });

            }
            // hide the centroid
            d3.select('circle.centroid')
                .classed('hidden', false);
        } else {
            // display the centroid
            d3.select('circle.centroid')
                .classed('hidden', true);
        }
    });


    /**
     * Draw convex hull in color button
     */
    $('#draw-convex-hull').click(function() {
        if ($('#draw-convex-hull').is(':checked')) {
            if (!('hull' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/convex_hull',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i]['hull'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-triangulation').click(function() {
        if ($('#draw-triangulation').is(':checked')) {
            if (!('triangulation' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/triangulation',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i]['triangulation'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                indexTime--;
                draw();
            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-voronoi').click(function() {
        if ($('#draw-voronoi').is(':checked')) {
            if (!('voronoi' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0])) {
                disablePlayButton();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/voronoi',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i]['voronoi'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                indexTime--;
                draw();
            }
        }
    });


    /**
     * Brush end function
     * Add the fish in the brush to the active fish and remove the brush again
     *
     */
    function brushend() {
        var rect = d3.event.selection;
        //iterate over the 151 fish to check which are in the brush
        for (var i = 0; i < animal_ids.length; i++) {
            var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
            //check which fish are in  the brushed area
            if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
                (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
                // Point is in the brush
                activeAnimals.push(arrayAnimals[i]['a']);
            }
        }
        if (!$('#play-button')
            .hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
        $('#brushing-button')
            .removeClass('active');
        // remove the brush
        $('.brush')
            .remove();
    }

    /**
     * Brushing button
     */
    $('#brushing-button').click(function() {
        //stop the animation
        playBoolean = false;
        $('#play-button').removeClass('active');
        if (!$('#brushing-button').hasClass('active')) {
            //define the brush
            brush = d3.brush()
                .extent([
                    [0, 0],
                    [tankWidth, tankHeight]
                ])
                .on('end', brushend);
            //add the brush
            svgContainer.append('g')
                .attr('class', 'brush')
                .call(brush);
        } else {
            // remove the brush
            $('.brush').remove();
        }
    });

    /**
     * Unselect all button
     */
    $('#remove-active-selected-button').click(function() {
        if (!$('#remove-active-selected-button').is(':disabled')) {
            $('#remove-active-selected-button').prop('disabled', true);
            activeAnimals = [];
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                indexTime--;
                draw();
            }
        }
    });

    /**
     * Spatial view background color
     */
    $('#background-color').change(function() {
        let color = $('input[type="radio"].group-background:checked').val();
        $('#main-vis-svg').css('background-color', color);
    });

    /**
     * Show the spatial view axis button
     */
    $('#draw-axis').on('change', function() {
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
    $('#draw-time').on('change', function() {
        if (this.checked) {
            $('#main-vis .frameText').show();
        } else {
            $('#main-vis .frameText').hide();
        }
    });

    /**
     * Tooltip function
     *
     */
    function tooltipFunction(d) {
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {
            if (d['a'] === __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']) {
                tooltip
                    .style('left', (d3.event.pageX + 5) + 'px')
                    .style('top', (d3.event.pageY - 100) + 'px')
                    .style('opacity', 1);
                // set the values
                tooltip.select('#tooltip-animal-id')
                    .html(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']);
                tooltip.select('#tooltip-species')
                    .html(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['species']);
                tooltip.select('#tooltip-sex')
                    .html(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['sex']);
                tooltip.select('#tooltip-size')
                    .html(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['size']);
                tooltip.select('#tooltip-weight')
                    .html(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['weight']);
            }
        }

    }

    /**
     * Returns the color scale
     *
     */
    function returnColorScale() {
        //if linear is choosen
        if (colorScales['type'] === 'Linear') {
            return d3.scaleLinear()
                .domain(
                    __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataSetPercentile"][activeScale]
                )
                .range(colorScales['color']);
        } //Threshold color scale
        else if (colorScales['type'] === 'Threshold') {
            return d3.scaleThreshold()
                .domain(
                    __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataSetPercentile"][activeScale]
                )
                .range(colorScales['color']);
        }
    }

    /**
     * Color Scale Function Radio buttons
     */
    $('#color-scale-radio-form input').on('change', function() {
        colorScales['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            indexTime--;
            draw();
        }
    });

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
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {
                tmp.push(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i][value].toLowerCase());
            }
            // create a set of individual strings in sex
            tmp = Array.from(new Set(tmp));
            let colors = ['#7fc97f', '#386cb0'];

            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {
                for (let j = 0; j < tmp.length; j++) {
                    if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i][value].toLowerCase() === tmp[j]) {
                        // add the coloring to the metadatacolor object
                        metadataColor[__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']] = colors[j];
                    }
                }
            }
            $('#metadata-input').addClass('hidden');
        } else {
            $('#metadata-input').removeClass('hidden');
            // set values of inputs
            // here are automatically input values calculated
            // .25 and .75 percentiles are used
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {
                tmp.push(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i][value]);
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
     * Size and weight coloring for the metadata
     */
    function colorMetadata() {
        resetIndividualMetadata();
        // get the input values
        let value = $('#group-metadata .btn.btn-default.active input')
            .attr('value');
        let blAvg = $('#bl-avg').val();
        let abAvg = $('#ab-avg').val();
        // color scheme for the inputs
        let colors = ['#7fc97f', '#fdc086', '#386cb0'];
        // color the animals
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {
            if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i][value] < blAvg) {
                metadataColor[__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']] = colors[0];
            } else if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i][value] > abAvg) {
                metadataColor[__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']] = colors[2];
            } else {
                metadataColor[__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']] = colors[1];
            }
        }
    }

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
        $('#metadata-input').addClass('hidden');
        resetIndividualMetadata();
    });

    /**
     * Metadata reset all individual metadata input fields
     */
    function resetIndividualMetadata() {
        metadataColor = {};
        $('.dropdown #preview')
            .css('background-color', 'rgb(255, 255, 255)');
    }

    /**
     * Network buttons clicked - get the data
     */
    $('#networks-modal-body button').click(function() {
        let network_id = $(this).attr('data');
        // get the data
        $.ajax({
            url: '/api/dataset/networks/' + parameters['id'] + '/' + network_id,
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                if (data.length) {
                    __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"] = JSON.parse(data[0]['data']);
                }
            }
        });

    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"] = {};
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            networkAuto = true;
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            networkAuto = false;
            networkLimit = $('#network-slider').slider('value');
            $('#network-limit').val(networkLimit);
        }
    });


    /**
     * Disable the play button --> Loading symbol
     *
     */
    function disablePlayButton() {
        playBoolean = false;
        $('#play-button').removeClass('active');
        $('#play-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
        $('#play-button').prop('disabled', true);
    }

    /**
     * Enable the play button remove loading symbol
     *
     */
    function enablePlayButton() {
        playBoolean = true;
        $('#play-button').addClass('active');
        $('#play-button').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>Play');
        $('#play-button').prop('disabled', false);
        draw();
    }

    /**
     * Change the color legend
     */
    function changeLegend() {
        var legend; // the color legend
        var legendText; // color legend text
        // vars for the legend
        var legendWidth = tankWidth * 0.08;
        var legendHeight = tankHeight * 0.04;
        var differentColors = 0;

        //change the colors of the animals
        if (activeScale !== 'black') {
            var tmpScale = returnColorScale();
            // once the fill for the heads and the stroke for the path
            legend = svgLegend.selectAll('rect.legend')
                .data(tmpScale.range());
            legendText = svgLegend.selectAll('text.legendText')
                .data(tmpScale.domain());
            differentColors = tmpScale.range()
                .length;
        } else {
            legend = svgLegend.selectAll('rect.legend')
                .data([]);
            legendText = svgLegend.selectAll('text.legendText')
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
            .attr('class', 'legendText')
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

    /**
     * Return  .95 percentiles of the array
     *
     */
    function percentiles(arr) {
        let p = 0.95;
        if (arr.length === 0) {
            return 0;
        }
        arr.sort(function(a, b) {
            return a - b;
        });
        let index = (arr.length - 1) * p;
        let lower = Math.floor(index);
        let upper = lower + 1;
        let weight = index % 1;
        if (upper >= arr.length) {
            return arr[lower];
        } else {
            return arr[lower] * (1 - weight) + arr[upper] * weight;
        }
    }

};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lineChart;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/






/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
function lineChart() {

    /**
     * Draw the line chart for the averaged swarm features
     *
     */
    // Swarm features line chart
    let lineChartHeight = 500; // the line chart height
    let margin = {
        top: 10,
        right: 0,
        bottom: 100,
        left: 10
    };
    let marginToLegend = 50;
    let lineChartWidth = 5000;

    let swarm_features = Object.keys(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][0]);
    // remove the time key
    let index = swarm_features.indexOf('time');
    swarm_features.splice(index, 1);

    // add the Line chart buttons to the feature panel
    for (let i = 0; i < swarm_features.length; i++) {
        let capitalized_feature_string = swarm_features[i].split('_').join(' ');
        capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

        $('.feature-check-box').append(`<div class="feature-check-box-default lineChartCheckBox">
                                       <input id="drawSwarm` + swarm_features[i] + `" class="lineChartButton" type="checkbox">
                                       <label for="drawSwarm` + swarm_features[i] + '">' + capitalized_feature_string + `</label>
                     </div>`);
    }
    //check line chart draw all lines
    $('.lineChartButton')
        .prop('checked', true);

    let lineChartData = [];
    let ratio = 1;
    // aggregate and average the swarm data to lineChartWidth points in the line chart
    if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length > lineChartWidth) {
        ratio = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length / lineChartWidth);
        // tmp array for the aggregated and averaged features
        let tmp = new Array(swarm_features.length).fill(0);

        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
            // aggregate the features in the temp array
            for (let j = 0; j < swarm_features.length; j++) {
                tmp[j] += __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][i][swarm_features[j]];
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
        lineChartData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"];
    }



    // x axis scale - minus marginLineChart  needed
    let x = d3.scaleLinear()
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
    let y = d3.scaleLinear()
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
            .domain(Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["a" /* getZoomFunction */])().range())
            .range(Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["a" /* getZoomFunction */])().domain());
        // set the new time
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["b" /* setIndexTime */])(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
    };
    let trendChartsZoom = {};
    let zoomGroup;
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
            Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["c" /* setZoomFunction */])(x.domain(t.rescaleX(x2).domain()));
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
        .classed('svg-LineChartContainer', true)
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
        .attr('class', 'x axisLineChart')
        .attr('transform', 'translate(0,' + lineChartHeight + ')')
        .call(xAxis);

    // append a group for the y axis
    zoomGroup.append('g')
        .attr('class', 'y axisLineChart')
        .call(yAxis);


    // the time line append the line
    zoomGroup.append('line')
        .attr('class', 'timeLine')
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
                .attr('class', 'lineChartlegendText')
                .attr('y', textSpace)
                .attr('x', (spacing * i + legendWidth + 10) + 'px')
                .text(d.attributes.name.value + ': ');

            //append the text for the value of the line
            d3.select(this).append('text')
                .attr('id', d.attributes.id.value + 'Value')
                .attr('class', 'lineChartlegendText')
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
                .attr('class', 'lineChartlegendText')
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

    /**
     * Line chart details click listener
     *
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
     *
     */
    function disableLineChart() {
        $('.lineChartButton').prop('checked', false).prop('disabled', true);
        $('.lineChartCheckBox').addClass('disabled');
        $('.lineChartLine').attr('visibility', 'hidden');
    }

    /**
     * Line chart details click listener
     *
     */
    function enableLineChart() {
        $('.lineChartButton').prop('checked', true).prop('disabled', false);
        $('.lineChartCheckBox').removeClass('disabled');
        $('.lineChartLine').attr('visibility', 'visible');
    }

    // trend chart elements
    let trendChartsElem = ['lowerOuterArea', 'lowerInnerArea', 'medianLine', 'upperInnerArea', 'upperOuterArea'];
    /**
     * Add a trend chart showing median and percentiles
     *
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
        if (!__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0][feature]) {
            return;
        }
        // change to the trend chart legend
        $('#lineChartLegend').hide();
        $('#trendChartLegend').show();
        // check if already computed and only hidden
        if (!$(('#' + feature + 'TrendChart')).length) {
            // get the data for the trend chart
            let trendChartData = [];
            // calculate the percetiles for every time step
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length; i++) {
                let tmp = [];
                for (let j = 0; j < num_animals; j++) {
                    if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i * num_animals + j]) {
                        tmp.push(__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i * num_animals + j][feature]);
                    }
                }
                trendChartData.push(percentiles(tmp));
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
     * Return the 05, 25, 50, 75, 95 percentiles of the array
     *
     */
    function percentiles(arr) {
        let p = [0.05, 0.25, 0.5, 0.75, 0.95];
        let result = [];
        if (arr.length === 0) {
            return 0;
        }
        arr.sort(function(a, b) {
            return a - b;
        });
        for (let i = 0; i < p.length; i++) {
            let index = (arr.length - 1) * p[i];
            let lower = Math.floor(index);
            let upper = lower + 1;
            let weight = index % 1;
            if (upper >= arr.length) {
                result.push(arr[lower]);
            } else {
                result.push(arr[lower] * (1 - weight) + arr[upper] * weight);
            }
        }
        return result;
    }

    /**
     * Hide the trend chart
     *
     */
    function removeTrendChart() {
        $('.trendChartData').hide();
        $('#trendChartLegend').hide();
        $('#lineChartLegend').show();
    }

}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./explore.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./explore.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-content-legend {\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-legendContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 10%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: hidden;\r\n}\r\n\r\n.svg-LineChartContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axisLineChart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frameText {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legendText {\r\n    font-size: 1.5em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.lineChartlegendText {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.timeLine {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hullPath {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.delaunayTriangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.lineChartCheckBox.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upperOuterArea, .lowerOuterArea {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upperInnerArea, .lowerInnerArea {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.medianLine {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axisLineChart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.networkEdges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["d"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["a"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["b"] = getNetworkData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(10);
/*eslint-disable no-unused-lets*/
/*global window, $, parameters */

let JSONAPI_MIMETYPE = 'application/vnd.api+json';
var source;





/**
 * Stream the movement data from the API
 * Loads only the explicit movement data
 */
function streamMovementData() {
    if (window.EventSource) {
        source = new EventSource('/api/movement_only/' + parameters['id']);
        source.onmessage = function(e) {
            if (e.data === 'close') {
                source.close();
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["addToDataset"])(JSON.parse(e.data));
            }
        };

        source.addEventListener('error', function(e) {
            if (e.readyState == EventSource.CLOSED) {
                alert('Streaming error');
            }
        }, false);
    } else {
        alert('Webbrowser does not support streaming');
    }
}

/**
 * Get the percentile data from the api
 *
 */
function getPercentile() {
    let dataSetPercentile = [];
    $.ajax({
        url: '/api/percentile/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // convert the dataSetPercentile into an array
            // [min, percentile_1,...,percentile_9,max]
            for (let i = 0; i < data.length; i++) {
                dataSetPercentile[data[i]['feature']] = [data[i]['min'], data[i]['p1'], data[i]['p2'], data[i]['p3'], data[i]['p5'], data[i]['p7'], data[i]['p8'], data[i]['p9'], data[i]['max']];
            }
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setDataSetPercentile"])(dataSetPercentile);
        }
    });

}

/**
 * Get the swarm features for the line chart from the api
 *
 */
function getSwarmFeatures() {
    let swarm_features = ['swarm_time', 'swarm_speed', 'swarm_acceleration', 'swarm_convex_hull_area',
        'swarm_distance_centroid', 'swarm_direction', 'swarm_polarisation'
    ];

    // get all the other swarm features for the line chart
    for (let i = 0; i < swarm_features.length; i++) {
        $.ajax({
            url: '/api/dataset/' + parameters['id'] + '/' + swarm_features[i],
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                let feature = swarm_features[i].replace('swarm_', '');

                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setSwarmData"])(data, feature);
            }
        });
    }
}
//
//
function getMetaData() {
    //get metadata information
    $.ajax({
        url: '/api/metadata/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // add the speed feature to the dataset
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setMetaData"])(data);
        }
    });
}


function getNetworkData() {
    $.ajax({
        url: '/api/dataset/networks/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["a" /* addNetworkButtons */])(data);
        }
    });
}


// export function aa() {}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initializeMetaddata;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/*eslint-disable no-unused-lets*/
/*global window, $, */



function initializeMetaddata() {
    // add the data to the metadata modal
    if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length) {
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"].length; i++) {

            $('#metadata-table').find('tbody')
                .append($('<tr id="metadata-row-' + __WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id'] + '">')
                    .append($('<td>')
                        .append(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']))
                    .append($('<td>')
                        .append(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['species']))
                    .append($('<td>')
                        .append(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['sex']))
                    .append($('<td>')
                        .append(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['size']))
                    .append($('<td>')
                        .append(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['weight']))
                    .append($('<td>')
                        .append(`<div class="dropdown">
                                              <a class="dropdown-toggle btn btn-default btn-color" data-toggle="dropdown" href="#">
                                              <div id="preview" class="metadata-swatch" style="background-color:#fff"></div>
                                              <input class="color-field" value="White" style="display:none;">
                                              </a>
                                              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"> ` +
                            function(id) {
                                let colors = ['#fff', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
                                let resultString = '';
                                for (let i = 0; i < colors.length; i++) {
                                    resultString += '<div class="metadata-swatch metadata-swatch-clickable" style="background-color:' + colors[i] + '" value="' + id + '"></div>';
                                }
                                return resultString;
                            }(__WEBPACK_IMPORTED_MODULE_0__explore_js__["datasetMetadata"][i]['animal_id']) +
                            '</ul></div>')
                    )
                );
        }
    } else {
        $('#metadata-table').find('tbody')
            .append('There is no metadata for this dataset');
    }

}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/*eslint-disable no-unused-lets*/
/*global window, $ */

/**
 * Add the network select buttons to the webinterface
 * @param {array} data - Array of network data
 */
function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-modal-body').append('<button type="button" class="btn btn-default btn-lg btn-block" data=' +
                    data[i]['network_id'] +
                    '><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>' +
                    data[i]['name'] + '</button>');
            }
        }
    } else {
        $('#networks-modal-body')
            .append('There is no network data for this dataset');
    }
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmY4MDE1ZGRmY2M5NDY4YTk4NmEiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGluZV9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2V4cGxvcmUuY3NzP2RlNGMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9hamF4X3F1ZXJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHVDQUF1QyxtRUFBMkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUVBQWlDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlFQUFpQztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQix5RUFBaUM7QUFDNUQsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix5RUFBaUM7QUFDNUQ7QUFDQTtBQUNBLCtDQUErQztBQUMvQywrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUVBQWlDO0FBQ3hEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDanFEQTtBQUFBO0FBQ0E7O0FBRUE7QUFJQzs7QUFNQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1FQUFzQjtBQUM3QztBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEs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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFPQzs7QUFJQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7Ozs7Ozs7QUNuSUE7QUFBQTtBQUNBOztBQUlDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5RUFBNEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbUJBQW1CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDaERBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJmODAxNWRkZmNjOTQ2OGE5ODZhIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gICAgc3BhdGlhbFZpZXdcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YVxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuLy8gaW1wb3J0IGNzc1xyXG5pbXBvcnQgJy4vZXhwbG9yZS5jc3MnO1xyXG5cclxuZXhwb3J0IGxldCBkYXRhc2V0ID0gW107XHJcbmV4cG9ydCBsZXQgZGF0YXNldE1ldGFkYXRhID0gW107XHJcbmV4cG9ydCBsZXQgc3dhcm1EYXRhID0gW107XHJcbmV4cG9ydCBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSB7fTtcclxuZXhwb3J0IGxldCB6b29tRnVuY3Rpb247XHJcbmV4cG9ydCBsZXQgbmV0d29ya0RhdGEgPSB7fTtcclxuZXhwb3J0IGxldCBhbmltYWxfaWRzID0gW107XHJcblxyXG4vKipcclxuICogTG9hZCB0aGUgbW92ZW1lbnQgZGF0YSB3aXRoIGFqYXggcXVlcmllc1xyXG4gKiBBZnRlcndhcmRzIGlmIGFsbCBhamF4IHF1ZXJpZXMgYXJlIGZpbmlzaGVkXHJcbiAqIGRyYXcgdGhlIGdyb3VwIHZpZXdcclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhKCk7XHJcblxyXG4gICAgLy8gaWYgYWxsIGFqYXggcXVlcmllcyBhcmUgY29tcGVsdGUgaW5pdGlhbGl6ZVxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGVuZGluZ1JlcXVlc3QoKSB7XHJcbiAgICAgICAgICAgIGlmICgkLmFjdGl2ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzcGF0aWFsVmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICB9KSgpO1xyXG5cclxufSk7XHJcblxyXG4vKipcclxuICogQ29uY2FjdCB0byB0aGUgZGF0YXNldFxyXG4gKiB0aGUgaWRlYSBpcyB0byB1c2UgdGhpcyBvbmUgZGF5IGZvciBsYXp5IGxvYWRpbmdcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLWFycmF5IG9mIG1vdmVtZW50IGRhdGFzZXRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRhc2V0KHZhbHVlKSB7XHJcbiAgICBkYXRhc2V0ID0gZGF0YXNldC5jb25jYXQodmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGRhdGFzZXQgcGVyY2VudGlsZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIGFycmFyeXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhU2V0UGVyY2VudGlsZSh2YWx1ZSkge1xyXG4gICAgZGF0YVNldFBlcmNlbnRpbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IG1ldGFkYXRhXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZXRhRGF0YSh2YWx1ZSkge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhID0gdmFsdWU7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBzd2FybSBkYXRhc2V0XHJcbiAqIG1ha2VzIHRoaXMgbW9kdWxhclxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW3t0aW1lOi4uLCBmZWF0dXJlOi4ufSx7Li4ufS4uLl1cclxuICogQHBhcmFtIHtzdHJpbmd9IGZlYXR1cmUgLSBzdHJpbmcgYXJyYXkgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2FybURhdGFbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YS5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCxkMywgcGFyYW1ldGVycywgU2V0LCBjb2xvcmJyZXdlciAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCAqIGFzIHNlbGYgZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnRcclxufSBmcm9tICcuL2xpbmVfY2hhcnQnO1xyXG5cclxuXHJcbmxldCB6b29tRnVuY3Rpb247XHJcbmxldCBpbmRleFRpbWUgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaW5kZXhUaW1lID0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRab29tRnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gem9vbUZ1bmN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Wm9vbUZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB6b29tRnVuY3Rpb24gPSB2YWx1ZTtcclxufVxyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmFtZXNwYWNlIHRvIG1pbmltaXplIGdsb2JhbCB2YXJpYWJsZXNcclxuICogQ29kZSBpcyBpbiBhIGNsb3N1cmUgYW5kIG1hbnVhbGx5IGV4cG9zZSBvbmx5IHRob3NlXHJcbiAqIHZhcmlhYmxlcyB0aGF0IG5lZWQgdG8gYmUgZ2xvYmFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwYXRpYWxWaWV3KCkge1xyXG5cclxuICAgIC8vIEdsb2JhbCBuYW1lc3BhY2UgdmFyaWFibGVzXHJcbiAgICBsZXQgJHNsaWRlcjtcclxuICAgIGxldCBzdmdDb250YWluZXI7XHJcbiAgICBsZXQgdGFuaztcclxuICAgIGxldCB0b29sdGlwOyAvLyB0aGUgdG9vbHRpcFxyXG4gICAgbGV0IHBsYXlCb29sZWFuID0gdHJ1ZTsgLy8gcGF1c2UgYW5kIHBsYXkgYm9vbGVhblxyXG4gICAgdmFyIGFjdGl2ZVNjYWxlID0gJ2JsYWNrJzsgLy8gbm8gY29sb3Igc2NhbGVzXHJcbiAgICB2YXIgY29sb3JTY2FsZXMgPSB7XHJcbiAgICAgICAgdHlwZTogJ0xpbmVhcicsXHJcbiAgICAgICAgY29sb3I6IGNvbG9yYnJld2VyLkJ1WWxCdVxyXG4gICAgfTtcclxuICAgIGxldCBzdmdMZWdlbmQ7XHJcbiAgICBsZXQgdGFua1dpZHRoO1xyXG4gICAgbGV0IHRhbmtIZWlnaHQ7XHJcbiAgICBsZXQgbWVkb2lkQW5pbWFsID0gLTE7XHJcbiAgICBsZXQgbGluZUNoYXJ0V2lkdGggPSA1MDAwO1xyXG4gICAgbGV0IGxpbmVDaGFydFJhdGlvID0gTWF0aC5jZWlsKHNlbGYuc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuICAgIGxldCBhcnJheUFuaW1hbHM7XHJcbiAgICBsZXQgYWN0aXZlQW5pbWFscyA9IFtdOyAvLyBhY3RpdmUgc2VsZWN0ZWQgYW5pbWFsc1xyXG4gICAgbGV0IGJydXNoOyAvLyBicnVzaGluZyB2YXJpYWJsZVxyXG4gICAgbGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuICAgIGxldCBuZXR3b3JrQ29sb3JTY2FsZTtcclxuICAgIGxldCBuZXR3b3JrTGltaXQgPSAwO1xyXG4gICAgbGV0IG5ldHdvcmtBdXRvID0gZmFsc2U7IC8vIGlmIHRydWUgdGhlIG5ldHdvcmsgZWRnZSBsaW1pdCBpcyBhdXRvbWF0aWNhbGx5IHN1Z2dlc3RlZFxyXG4gICAgbGV0IGFuaW1hbF9pZHM7XHJcblxyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdmFyaW91cyBjb21wb25lbnRzOlxyXG4gICAgICogICAgICBTVkcgYW5kIEFuaW1hbCBUYW5rXHJcbiAgICAgKiAgICAgIFpvb21cclxuICAgICAqICAgICAgVG9vbHRpcFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBsZXQgbWluUG9pbnQgPSBwYXJhbWV0ZXJzWydtaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgICAgICBsZXQgbWF4UG9pbnQgPSBwYXJhbWV0ZXJzWydtYXgnXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgICAgICAvLyBsZXQgY29vcmRpbmF0ZU9yaWdpbiA9IHBhcmFtZXRlcnNbJ2Nvb3JkaW5hdGVfb3JpZ2luJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAqMS4wMiAtLT4gc28gdGhlcmUgaXMgYSBtYXJnaW4gaW4gdGhlIHNwYXRpYWwgdmlldyB3aGVyZSBubyBhbmltYWwgaXMgZXZlclxyXG4gICAgICAgIHRhbmtXaWR0aCA9IChtYXhQb2ludFswXSAtIG1pblBvaW50WzBdKSAqIDEuMDI7XHJcbiAgICAgICAgdGFua0hlaWdodCA9IChtYXhQb2ludFsxXSAtIG1pblBvaW50WzFdKSAqIDEuMDI7XHJcblxyXG4gICAgICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcycpLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAkKCcjbWFpbi12aXMtZGl2Jykud2lkdGgoKVxyXG4gICAgICAgICAgICAgICAgfSkuaGVpZ2h0KHRhbmtIZWlnaHQgKiAwLjUpXHJcbiAgICAgICAgICAgICAgICAud2lkdGgodGFua1dpZHRoICogMC41KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVzZXQgYWxsIGNoZWNrYm94ZXNcclxuICAgICAgICAkKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIC8vc2V0IHRoZSBjb2xvciBzY2FsZSBmdW5jdGlvbiB0byBsaW5lYXJcclxuICAgICAgICAkKCcjY29sb3Itc2NhbGUtbGluZWFyJylcclxuICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAkKCcjZ3JvdXAtc2l6ZS1tJylcclxuICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgJCgnI3NldHRpbmdzLWRpdiBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgLy9oaWRlIHRoZSBsb2FkaW5nIGdpZlxyXG4gICAgICAgICQoJyNsb2FkaW5nJylcclxuICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgLy8gbnVtYmVyIG9mIGRpc3RpbmN0IGFuaW1hbCBpZHNcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YXNldFtpXVsndCddID09PSBzZWxmLmRhdGFzZXRbMF1bJ3QnXSkge1xyXG4gICAgICAgICAgICAgICAgbnVtX2FuaW1hbHMuYWRkKHNlbGYuZGF0YXNldFtpXVsnYSddKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGkgPSBzZWxmLmRhdGFzZXQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFuaW1hbF9pZHMgPSBBcnJheS5mcm9tKG51bV9hbmltYWxzKS5zb3J0KCk7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHNsaWRlclxyXG4gICAgICAgICRzbGlkZXIgPSAkKCcjc2xpZGVyJylcclxuICAgICAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHNlbGYuc3dhcm1EYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDI1LFxyXG4gICAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4VGltZSA9IHVpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHBhdXNlZCBhcHBseSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBuZXR3b3JrIHNsaWRlclxyXG4gICAgICAgICQoJyNuZXR3b3JrLXNsaWRlcicpXHJcbiAgICAgICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtMaW1pdCA9IHVpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKG5ldHdvcmtMaW1pdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1heCBmcm9tIHRoZSBzbGlkZXIgdGhpcyBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSB0aWNrc1xyXG4gICAgICAgIGxldCBtYXggPSAkc2xpZGVyLnNsaWRlcignb3B0aW9uJywgJ21heCcpO1xyXG4gICAgICAgIGxldCBzcGFjZSA9IDEwMCAvIG1heDtcclxuICAgICAgICAvL2FwcGVuZCB0aGUgbWludXRlIHRpY2tzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgPSBpICsgMTUwMCkge1xyXG4gICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cInVpLXNsaWRlci10aWNrXCI+PC9zcGFuPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdsZWZ0JywgKHNwYWNlICogaSkgKyAnJScpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJHNsaWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vWCBhbmQgWSBheGlzXHJcbiAgICAgICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgICAgIC5yYW5nZShbbWluUG9pbnRbMF0sIG1heFBvaW50WzBdXSk7XHJcblxyXG4gICAgICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeClcclxuICAgICAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgICAgIC50aWNrUGFkZGluZyg1KTtcclxuXHJcbiAgICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pXHJcbiAgICAgICAgICAgIC5yYW5nZShbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSk7XHJcblxyXG4gICAgICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgICAgICAudGlja3MoNylcclxuICAgICAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgICAgIC8vIFpPT01JTkcgQU5EIFBBTk5JTkcgU1RVRkZcclxuICAgICAgICBsZXQgem9vbUdyb3VwO1xyXG4gICAgICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgICAgIC5zY2FsZUV4dGVudChbMSwgNl0pXHJcbiAgICAgICAgICAgIC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgICAgICAvLyBtb2RpZnkgdGhlIHRyYW5zbGF0ZSBzbyB0aGF0IGl0IG5ldmVyIGV4aXRzIHRoZSB0YW5rXHJcbiAgICAgICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHRhbmtXaWR0aCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLCBNYXRoLm1heCh0YW5rV2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuICAgICAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgdGFua0hlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLCBNYXRoLm1heCh0YW5rSGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICAgICAgem9vbUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVYKHgpKSk7XHJcbiAgICAgICAgICAgICAgICBnWWF4aXMuY2FsbCh5QXhpcy5zY2FsZShkMy5ldmVudC50cmFuc2Zvcm0ucmVzY2FsZVkoeSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vdGhlIHN2ZyBjb250YWluZXJcclxuICAgICAgICBzdmdDb250YWluZXIgPSBkMy5zZWxlY3QoJyNtYWluLXZpcycpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzdmctY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG4gICAgICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSlcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuXHJcbiAgICAgICAgLyogZGVwZW5kcyBvbiBzdmcgcmF0aW8sIGZvciAgMTI0MC8xOTAwID0gMC42NSBzbyBwYWRkaW5nLWJvdHRvbSA9IDY1JSAqL1xyXG4gICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCh0YW5rSGVpZ2h0IC8gdGFua1dpZHRoKSAqIDEwMCk7XHJcbiAgICAgICAgJCgnI21haW4tdmlzJykuYXBwZW5kKCQoJzxzdHlsZT4jbWFpbi12aXM6OmFmdGVyIHtwYWRkaW5nLXRvcDogJyArIHBlcmNlbnRhZ2UgKyAnJTtkaXNwbGF5OiBibG9jaztjb250ZW50OiBcIlwiO308L3N0eWxlPiAnKSk7XHJcblxyXG4gICAgICAgIHpvb21Hcm91cCA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ3N2ZzpnJyk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdpbWFnZScpXHJcbiAgICAgICAgICAgICAgICAvLyAgLmF0dHIoJ2QnLHBhdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcvJyArIHBhcmFtZXRlcnMuYmFja2dyb3VuZF9pbWFnZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdiYWNrZ3JvdW5kSW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0YW5rV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSBhZGRpbmcgYW4gaW1hZ2UgdG8gYW4gc3ZnIHRoZXNlIGFyZSB0aGUgY29vcmRpbmF0ZXMgaSB0aGluayBvZiB0aGUgdG9wIGxlZnRcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAnMCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignYmFja2dyb3VuZCcsICcjZmZmJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHRhbmsgZ3JvdXAgd2l0aCBhIHRyYW5zZm9ybWF0aW9uIHdoaWNoIHJvdGF0ZXMgdGhlIHkgYXhpc1xyXG4gICAgICAgIHRhbmsgPSB6b29tR3JvdXAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0YW5rJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmludmVydGVkX3kpIHtcclxuICAgICAgICAgICAgICAgICAgICB5ID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NjYWxlKCcgKyB4ICsgJywnICsgeSArICcpJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHRoZSBjZW50cm9pZFxyXG4gICAgICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2ctY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2VudHJvaWQgaGlkZGVuJylcclxuICAgICAgICAgICAgLmF0dHIoJ3InLCA2KVxyXG4gICAgICAgICAgICAuYXR0cignY3gnLCAwKVxyXG4gICAgICAgICAgICAuYXR0cignY3knLCAwKTtcclxuXHJcbiAgICAgICAgLy8gYXJyb3cgZm9yIHRoZSBjZW50cm9pZCBkaXJlY3Rpb25cclxuICAgICAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtYXJyb3cnKVxyXG4gICAgICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNjZW50cm9pZC1hcnJvdyknKTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgbmV0d29yayAgZ3JvdXBcclxuICAgICAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICduZXR3b3JrR3JvdXAnKTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgZGVsYXVuYXlUcmlhbmd1bGF0aW9uIGdyb3VwXHJcbiAgICAgICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnZGVsYXVuYXlUcmlhbmd1bGF0aW9uR3JvdXAnKTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgdm9yb25vaSBncm91cFxyXG4gICAgICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3Zvcm5vaUdyb3VwJyk7XHJcblxyXG4gICAgICAgIC8vIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjbWFpbi12aXMtbGVnZW5kLWRpdicpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzdmctbGVnZW5kQ29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG4gICAgICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIDEwMClcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQtbGVnZW5kJywgdHJ1ZSlcclxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29sb3JMZWdlbmQnKTtcclxuXHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSBmcmFtZSB0aW1lIHRleHRcclxuICAgICAgICBzdmdDb250YWluZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZyYW1lVGV4dCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMzApXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMzApXHJcbiAgICAgICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgYXhpc1xyXG4gICAgICAgIGxldCBnWGF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGdZYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICB0b29sdGlwID0gZDMuc2VsZWN0KCdkaXYudG9vbHRpcCcpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIDAgKyAncHgnKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vZGVmaW50ZSB0aGUgbGluZSBjaGFydCB0aW1lIHNjYWxlXHJcbiAgICAgICAgem9vbUZ1bmN0aW9uID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFswLCBzZWxmLnN3YXJtRGF0YS5sZW5ndGhdKVxyXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHNlbGYuc3dhcm1EYXRhLmxlbmd0aF0pO1xyXG5cclxuICAgICAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5wYWxldHRlJylcclxuICAgICAgICAgICAgLmRhdGEoZDMuZW50cmllcyhjb2xvcmJyZXdlcikpXHJcbiAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGFsZXR0ZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmtleTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZ2h0bGlnaHQgdGhlIHJpZ2h0IHBhbGV0dGVcclxuICAgICAgICAgICAgICAgICQoJy5wYWxldHRlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cXFwiJyArIGQua2V5ICsgJ1xcXCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlcy5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5zd2F0Y2gnKVxyXG4gICAgICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzd2F0Y2gnKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBjb2xvciBzY2hlbWVcclxuICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cXFwiQnVZbEJ1XFxcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgLy8gZml4ZWQgY29sb3Igc2NhbGUgZm9yIHRoZSBuZXR3b3JrXHJcbiAgICAgICAgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAucmFuZ2UoWycjZmZmZmZmJywgJyNkZmRmZGYnLCAnI2MwYzBjMCcsICcjYTNhM2EzJywgJyM4NTg1ODUnLCAnIzY5Njk2OScsICcjNGU0ZTRlJywgJyMzNTM1MzUnLCAnIzFkMWQxZCcsICcjMDAwMDAwJ10pO1xyXG5cclxuICAgICAgICAvL0RyYXcgdGhlIGZpc2ggc3dhcm0gbGluZSBjaGFydFxyXG4gICAgICAgIGxpbmVDaGFydCgpO1xyXG5cclxuICAgICAgICBkcmF3KCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdpbmcgZnVuY3Rpb24gLSBpcyBjYWxsZWQgZm9yIGVhY2ggdGltZXN0ZXBcclxuICAgICAqIGluZGV4VGltZSBzYXZlcyB0aGUgY3VycmVudCB0aW1lXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZSBvZiBmdW5jdGlvbiBkcmF3XHJcbiAgICAgICAgLy8gbGV0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgICAgIC8vdXBkYXRlIHRpbWUgdG8gd2FpdCBha2Egc3BlZWQgb2YgcmVwbGF5XHJcbiAgICAgICAgbGV0IHRpbWVUb1dhaXQgPSAkKCdpbnB1dFtuYW1lPWdyb3VwMV06Y2hlY2tlZCcsICcjZ3JvdXAxJylcclxuICAgICAgICAgICAgLnZhbCgpO1xyXG4gICAgICAgIC8vc2NhbGUgdGhlIHNpemUgYnkgdGhpcyBudW1iZXJcclxuICAgICAgICBsZXQgYW5pbWFsU2NhbGUgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtc2l6ZTpjaGVja2VkJylcclxuICAgICAgICAgICAgLnZhbCgpO1xyXG5cclxuICAgICAgICAvL2dldCB0aGUgbmV4dCBhbmltYWxzXHJcbiAgICAgICAgYXJyYXlBbmltYWxzID0gc2VsZi5kYXRhc2V0LnNsaWNlKGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lLCBhbmltYWxfaWRzLmxlbmd0aCAqIGluZGV4VGltZSArIGFuaW1hbF9pZHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy90aGUgdGltZW91dCBpcyBzZXQgYWZ0ZXIgb25lIHVwZGF0ZSAzMCBtc1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgdGltZSBmcmFtZSB0ZXh0XHJcbiAgICAgICAgICAgICAgICBzdmdDb250YWluZXIuc2VsZWN0KCcuZnJhbWVUZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChNYXRoLmZsb29yKGluZGV4VGltZSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKGluZGV4VGltZSAvIHBhcmFtZXRlcnNbJ2ZwcyddKSAlIDYwICsgJzo6JyArIGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGEgc2Vjb25kIGhhcyBjaGFuZ2VkIG1vdmUgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlci5zbGlkZXIoJ3ZhbHVlJywgaW5kZXhUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3ZnQW5pbWFscyA9IHRhbmsuc2VsZWN0QWxsKCdnLmFuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoYXJyYXlBbmltYWxzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrIHZpc1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmtWaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhUaW1lIGluIHNlbGYubmV0d29ya0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV0d29yayA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXAgPSBzZWxmLm5ldHdvcmtEYXRhW2luZGV4VGltZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTInOiBhcnJheUFuaW1hbHNbal1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhcnQnOiBhcnJheUFuaW1hbHNbaV1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHRtcFt0bXBfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTEnXSArICctJyArIGRbJ25vZGUyJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMiddICsgJy0nICsgZFsnbm9kZTEnXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXR3b3JrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKG5ldHdvcmtbaV1bJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrTGltaXQgPSBwZXJjZW50aWxlcyh0bXBBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrID0gbmV0d29yay5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ10gPj0gbmV0d29ya0xpbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtWaXMgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEobmV0d29yayk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVVBEQVRFXHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3ZhbCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0VOVEVSXHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25ldHdvcmtFZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3RBbGwoJ2xpbmUubmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRVhJVCAtIG5ldHdvcmtcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXMuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRlbGF1bmF5IHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjZHJhdy10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heVRyaWFuZ3VsYXRpb25Hcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGguZGVsYXVuYXlUcmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoW3NlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ3RyaWFuZ3VsYXRpb24nXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguZGVsYXVuYXlUcmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRVhJVCAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZvcm9ub2lcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjZHJhdy12b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yb25vaSA9IHRhbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgICAgIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FTlRFUiAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICB2b3Jvbm9pLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRVhJVCAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gYXBwZW5kIHRoZSBhbmltYWwgZ3JvdXBzXHJcbiAgICAgICAgICAgICAgICBsZXQgYW5pbWFsR3JvdXBpbmdzID0gc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FuaW1hbC0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgY2lyY2xlcyBmb3IgZWFjaCBhbmltYWwgdG8gdGhlIGFuaW1hbGdyb3VwXHJcbiAgICAgICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgMS41ICogYW5pbWFsU2NhbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwRnVuY3Rpb24oZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbiBjbGljayBmb3IgdGhlIGFjdGl2ZSBmaXNoc1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMgPSBhY3RpdmVBbmltYWxzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGRbJ2EnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSBhbmltYWxzIGNpcmNsZXNcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGFuaW1hbFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZm9yIGVhY2ggZ3JvdXAgdGhlIGFycm93LCBuZWVkZWQgZm9yIGNvbG9yaW5nXHJcbiAgICAgICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fycm93LW1hcmtlci0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3JlZlgnLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgMTMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTIsMiBMMiwxMSBMMTAsNiBMMiwyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgICAgICBhbmltYWxHcm91cGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjYXJyb3ctbWFya2VyLScgKyBkWydhJ10gKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9leGVjdXRlIG9ubHkgd2hlbiBkcmF3IGRpcmVjdGlvbiBidXR0b24gaXMgY2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ3AnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ3AnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLWRbJ2RpcmVjdGlvbiddICsgJyAnICsgZFsncCddWzBdICsgJyAnICsgLWRbJ3AnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93IGhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVYSVQgLSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0NvbnZleCBodWxsXHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTiAtIHBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGh1bGxQYXRoID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguaHVsbFBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShbc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXVsnaHVsbCddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGh1bGxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBFTlRFUiAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaHVsbFBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXcgbm8gaHVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGh1bGxQYXRoID0gdGFuay5zZWxlY3QoJ3BhdGguaHVsbFBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBFWElUIC0gaHVsbCBwYXRoc1xyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGZpc2hcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wU2NhbGUgPSByZXR1cm5Db2xvclNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBTY2FsZShkW2FjdGl2ZVNjYWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbG9yIGV2ZXJ5IGZpc2ggYmxhY2tcclxuICAgICAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICcjMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG1ldGFkYXRhQ29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhQ29sb3IpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNhbmltYWwtJyArIGtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBtZXRhZGF0YUNvbG9yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG1ldGFkYXRhQ29sb3Jba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5pbmNsdWRlcyhkWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjI1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vZHJhdyBjZW50cm9pZFxyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ2NlbnRyb2lkJyBpbiBzZWxmLnN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHNlbGYuc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXNlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXS5jZW50cm9pZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHNlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAyICogYW5pbWFsU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1zZWxmLnN3YXJtRGF0YVtpbmRleFRpbWVdWydkaXJlY3Rpb24nXSArICcgJyArIHNlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAnICcgKyAtc2VsZi5zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1lZG9pZFxyXG4gICAgICAgICAgICAgICAgaWYgKG1lZG9pZEFuaW1hbCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBtZWRvaWRBbmltYWwgPSBzZWxmLnN3YXJtRGF0YVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgaW5kZXhUaW1lKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJykgJiYgc2VsZi5zd2FybURhdGFbTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wID0gTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgbGluZSBjaGFydCBsZWdlbmQgdGV4dCB2YWx1ZXMgcGVyIHNlY29uZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGNoYW5nZSB0aGlzIHRvIGEgbW9yZSBtb2R1bGFyIHdheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjb252ZXhfaHVsbF9hcmVhTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KChzZWxmLnN3YXJtRGF0YVt0bXBdWydjb252ZXhfaHVsbF9hcmVhJ10pICsgJ21twrInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjc3BlZWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5zd2FybURhdGFbdG1wXVsnc3BlZWQnXSArICdtbS9zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2FjY2VsZXJhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzZWxmLnN3YXJtRGF0YVt0bXBdWydhY2NlbGVyYXRpb24nXSArICdtbS9zwrInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlzdGFuY2VfY2VudHJvaWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5zd2FybURhdGFbdG1wXVsnZGlzdGFuY2VfY2VudHJvaWQnXSArICdtbScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkaXJlY3Rpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5zd2FybURhdGFbdG1wXVsnZGlyZWN0aW9uJ10gKyAnwrAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjcG9sYXJpc2F0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHNlbGYuc3dhcm1EYXRhW3RtcF1bJ3BvbGFyaXNhdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHpvb21GdW5jdGlvbih0bXApICsgJywwKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleFRpbWUgPj0gc2VsZi5zd2FybURhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdGFydCBhZ2FpbiBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5Qm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0MSAtIHQwKTsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aW1lVG9XYWl0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IG9yIHN0b3AgdGhlIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpbmRleFRpbWUgPSAkc2xpZGVyLnNsaWRlcigndmFsdWUnKTtcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhdXNlIHRoZSBhbmltYXRpb24gYW5kIHNob3cgb25seSB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV4dC1mcmFtZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBkcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgU3BlZWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXNwZWVkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXNwZWVkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnc3BlZWQnIGluIHNlbGYuZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnL3NwZWVkJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YXNldFtpXVsnc3BlZWQnXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVNjYWxlID0gJ3NwZWVkJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBhY3RpdmVTY2FsZSA9ICdibGFjayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYWNjZWxlcmF0aW9uIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvbiBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2FjY2VsZXJhdGlvbicgaW4gc2VsZi5kYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnL2FjY2VsZXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBhY2NlbGVyYXRpb24gZmVhdHVyZSB0byB0aGUgc2VsZi5kYXRhc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFzZXRbaV1bJ2FjY2VsZXJhdGlvbiddID0gK2RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgYWN0aXZlU2NhbGUgPSAnYWNjZWxlcmF0aW9uJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgYWN0aXZlU2NhbGUgPSAnYmxhY2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIGluZGV4VGltZS0tO1xyXG4gICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpc3RhbmNlIHRvIGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2Rpc3RhbmNlX2NlbnRyb2lkJyBpbiBzZWxmLmRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgZGlzdGFuY2VfY2VudHJvaWRcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy9kaXN0YW5jZV9jZW50cm9pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBkaXN0YW5jZV9jZW50cm9pZCBmZWF0dXJlIHRvIHRoZSBzZWxmLmRhdGFzZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YXNldFtpXVsnZGlzdGFuY2VfY2VudHJvaWQnXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVNjYWxlID0gJ2Rpc3RhbmNlX2NlbnRyb2lkJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBhY3RpdmVTY2FsZSA9ICdibGFjayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlyZWN0aW9uIGFycm93IG9mIHRoZSBhbmltYWxcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlyZWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2RpcmVjdGlvbicgaW4gc2VsZi5kYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YXNldFtpXVsnZGlyZWN0aW9uJ10gPSArZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5hcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbWVkb2lkIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1tZWRvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWVkb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ21lZG9pZCcgaW4gc2VsZi5zd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnL21lZG9pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLnN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FybURhdGFbaV1bJ21lZG9pZCddID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZG9pZEFuaW1hbCA9IHNlbGYuc3dhcm1EYXRhW2luZGV4VGltZV1bJ21lZG9pZCddO1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBtZWRvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGRpc3BsYXkgdGhlIG1lZG9pZCBmaXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWVkb2lkQW5pbWFsID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdjZW50cm9pZCcgaW4gc2VsZi5zd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnL2NlbnRyb2lkJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXJtRGF0YVtpXVsnY2VudHJvaWQnXSA9IFtNYXRoLnJvdW5kKGRhdGFbaV1bMF0gKiAxMDApIC8gMTAwLCBNYXRoLnJvdW5kKGRhdGFbaV1bMV0gKiAxMDApIC8gMTAwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGhpZGUgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnY2lyY2xlLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY29udmV4IGh1bGwgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNvbnZleC1odWxsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2h1bGwnIGluIHNlbGYuc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy9jb252ZXhfaHVsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLnN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FybURhdGFbaV1bJ2h1bGwnXSA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0cmlhbmd1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd0cmlhbmd1bGF0aW9uJyBpbiBzZWxmLnN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvdHJpYW5ndWxhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLnN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FybURhdGFbaV1bJ3RyaWFuZ3VsYXRpb24nXSA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRyaWFuZ3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdm9yb25vaScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy12b3Jvbm9pJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ3Zvcm9ub2knIGluIHNlbGYuc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy92b3Jvbm9pJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXJtRGF0YVtpXVsndm9yb25vaSddID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJydXNoIGVuZCBmdW5jdGlvblxyXG4gICAgICogQWRkIHRoZSBmaXNoIGluIHRoZSBicnVzaCB0byB0aGUgYWN0aXZlIGZpc2ggYW5kIHJlbW92ZSB0aGUgYnJ1c2ggYWdhaW5cclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZDMuZXZlbnQuc2VsZWN0aW9uO1xyXG4gICAgICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSAxNTEgZmlzaCB0byBjaGVjayB3aGljaCBhcmUgaW4gdGhlIGJydXNoXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbmltYWxfaWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb2ludCA9IFthcnJheUFuaW1hbHNbaV1bJ3AnXVswXSwgYXJyYXlBbmltYWxzW2ldWydwJ11bMV1dO1xyXG4gICAgICAgICAgICAvL2NoZWNrIHdoaWNoIGZpc2ggYXJlIGluICB0aGUgYnJ1c2hlZCBhcmVhXHJcbiAgICAgICAgICAgIGlmICgocmVjdFswXVswXSA8PSBwb2ludFswXSkgJiYgKHBvaW50WzBdIDw9IHJlY3RbMV1bMF0pICYmXHJcbiAgICAgICAgICAgICAgICAocmVjdFswXVsxXSA8PSBwb2ludFsxXSkgJiYgKHBvaW50WzFdIDw9IHJlY3RbMV1bMV0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQb2ludCBpcyBpbiB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChhcnJheUFuaW1hbHNbaV1bJ2EnXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgICAgICQoJy5icnVzaCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJydXNoaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy9zdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoISQoJyNicnVzaGluZy1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9kZWZpbmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGJydXNoID0gZDMuYnJ1c2goKVxyXG4gICAgICAgICAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0YW5rV2lkdGgsIHRhbmtIZWlnaHRdXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdlbmQnLCBicnVzaGVuZCk7XHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpXHJcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2VsZWN0IGFsbCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgYWN0aXZlQW5pbWFscyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIGluZGV4VGltZS0tO1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGF0aWFsIHZpZXcgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICovXHJcbiAgICAkKCcjYmFja2dyb3VuZC1jb2xvcicpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtYmFja2dyb3VuZDpjaGVja2VkJykudmFsKCk7XHJcbiAgICAgICAgJCgnI21haW4tdmlzLXN2ZycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgc3BhdGlhbCB2aWV3IGF4aXMgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWF4aXMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBmcmFtZSAodGltZSkgbnVtYmVyIGluIHRoZSBzcGF0aWFsIHZpZXcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRpbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lVGV4dCcpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lVGV4dCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2x0aXAgZnVuY3Rpb25cclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRvb2x0aXBGdW5jdGlvbihkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZFsnYSddID09PSBzZWxmLmRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pIHtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAxMDApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtYW5pbWFsLWlkJylcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbChzZWxmLmRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pO1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNwZWNpZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pO1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNleCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoc2VsZi5kYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKTtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zaXplJylcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbChzZWxmLmRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKTtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC13ZWlnaHQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29sb3Igc2NhbGVcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJldHVybkNvbG9yU2NhbGUoKSB7XHJcbiAgICAgICAgLy9pZiBsaW5lYXIgaXMgY2hvb3NlblxyXG4gICAgICAgIGlmIChjb2xvclNjYWxlc1sndHlwZSddID09PSAnTGluZWFyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAgICAgLmRvbWFpbihcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFTZXRQZXJjZW50aWxlW2FjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVzWydjb2xvciddKTtcclxuICAgICAgICB9IC8vVGhyZXNob2xkIGNvbG9yIHNjYWxlXHJcbiAgICAgICAgZWxzZSBpZiAoY29sb3JTY2FsZXNbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQzLnNjYWxlVGhyZXNob2xkKClcclxuICAgICAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhU2V0UGVyY2VudGlsZVthY3RpdmVTY2FsZV1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlc1snY29sb3InXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sb3IgU2NhbGUgRnVuY3Rpb24gUmFkaW8gYnV0dG9uc1xyXG4gICAgICovXHJcbiAgICAkKCcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybSBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvclNjYWxlc1sndHlwZSddID0gJCgnaW5wdXRbbmFtZT1jb2xvci1zY2FsZS1yYWRpb106Y2hlY2tlZCcsICcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybScpLnZhbCgpO1xyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIHN3YXRjaCBmdW5jdGlvbnMgY29sb3JpbmcgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAgICAgKi9cclxuICAgICQoJy5tZXRhZGF0YS1zd2F0Y2gubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgY29sb3JSR0IgPSAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIC8vIHNldCB0aGUgY29sb3Igb2YgdGhlIHN3YXRjaCBwcmV2aWV3XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXJvdy0nICsgaWQgKyAnICNwcmV2aWV3JylcclxuICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yUkdCKTtcclxuICAgICAgICAvLyBpZiB3aGl0ZSB0aGFuIHJlc2V0IHRoZSBjb2xvclxyXG4gICAgICAgIGlmIChjb2xvclJHQiA9PT0gJ3JnYigyNTUsIDI1NSwgMjU1KScpIHtcclxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhQ29sb3JbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbWV0YWRhdGFDb2xvcltpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2lkXSA9IGNvbG9yUkdCO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgZ3JvdXAgbWV0YWRhdGEgZnVuY3Rpb25zIGZvciBpbnN0YW5jZSBjb2xvciBzZXhcclxuICAgICAqL1xyXG4gICAgJCgnI2dyb3VwLW1ldGFkYXRhIDppbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyByZXNldCB0aGUgbWV0YWRhdCBhY29sb3JpbmdcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG5cclxuICAgICAgICAvLyBtZXRhZGF0YSBzZXggaXMgY2hvb3NlbiAtIGNvbG9yaW5nIGJhc2VkIG9uIG0gYW5kIGZcclxuICAgICAgICBpZiAodmFsdWUgPT09ICdzZXgnKSB7XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1kaXYnKS5tb2RhbCgndG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIC8vIGNsb3NlIGFuZCBjb2xvciBoZXJlXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5kYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXQgb2YgaW5kaXZpZHVhbCBzdHJpbmdzIGluIHNleFxyXG4gICAgICAgICAgICB0bXAgPSBBcnJheS5mcm9tKG5ldyBTZXQodG1wKSk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdLnRvTG93ZXJDYXNlKCkgPT09IHRtcFtqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGNvbG9yaW5nIHRvIHRoZSBtZXRhZGF0YWNvbG9yIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YUNvbG9yW3NlbGYuZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIC8vIHNldCB2YWx1ZXMgb2YgaW5wdXRzXHJcbiAgICAgICAgICAgIC8vIGhlcmUgYXJlIGF1dG9tYXRpY2FsbHkgaW5wdXQgdmFsdWVzIGNhbGN1bGF0ZWRcclxuICAgICAgICAgICAgLy8gLjI1IGFuZCAuNzUgcGVyY2VudGlsZXMgYXJlIHVzZWRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goc2VsZi5kYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYmxBdmcgPSBkMy5xdWFudGlsZSh0bXAsIDAuMjUpOyAvLyBiZWxvdyBhdmVyYWdlIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBhYkF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC43NSk7IC8vIGFib3ZlIGF2ZXJhZ2VcclxuICAgICAgICAgICAgJCgnI2JsLWF2ZycpLnZhbChibEF2Zyk7XHJcbiAgICAgICAgICAgICQoJyNhYi1hdmcnKS52YWwoYWJBdmcpO1xyXG4gICAgICAgICAgICAvLyBjb2xvciB0aGUgYW5pbWFsc1xyXG4gICAgICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaXplIGFuZCB3ZWlnaHQgY29sb3JpbmcgZm9yIHRoZSBtZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjb2xvck1ldGFkYXRhKCkge1xyXG4gICAgICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbnB1dCB2YWx1ZXNcclxuICAgICAgICBsZXQgdmFsdWUgPSAkKCcjZ3JvdXAtbWV0YWRhdGEgLmJ0bi5idG4tZGVmYXVsdC5hY3RpdmUgaW5wdXQnKVxyXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgYmxBdmcgPSAkKCcjYmwtYXZnJykudmFsKCk7XHJcbiAgICAgICAgbGV0IGFiQXZnID0gJCgnI2FiLWF2ZycpLnZhbCgpO1xyXG4gICAgICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnI2ZkYzA4NicsICcjMzg2Y2IwJ107XHJcbiAgICAgICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPCBibEF2Zykge1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltzZWxmLmRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA+IGFiQXZnKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YUNvbG9yW3NlbGYuZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YUNvbG9yW3NlbGYuZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBncm91cCBtZXRhZGF0YSBpbnB1dCBzcGlubmVyXHJcbiAgICAgKiArLy0gMC4xIHRvIHRoZSBpbnB1dCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIG9sZFZhbHVlID0gYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKCkudHJpbSgpLFxyXG4gICAgICAgICAgICBuZXdWYWwgPSAwO1xyXG5cclxuICAgICAgICBpZiAoYnRuLmF0dHIoJ2RhdGEtZGlyJykgPT0gJ3VwJykge1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSArIDAuMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSAtIDAuMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZChuZXdWYWwgKiAxMDApIC8gMTAwOyAtXHJcbiAgICAgICAgYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBjb2xvcmluZ1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgaW5wdXQgZmllbGRzIGNoYW5nZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgaW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBtZXRhZGF0YSBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNtZXRhZGF0YS1yZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSByZXNldCBhbGwgaW5kaXZpZHVhbCBtZXRhZGF0YSBpbnB1dCBmaWVsZHNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKSB7XHJcbiAgICAgICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgICAgICQoJy5kcm9wZG93biAjcHJldmlldycpXHJcbiAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keSBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV0d29ya19pZCA9ICQodGhpcykuYXR0cignZGF0YScpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YVxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3Jrcy8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIG5ldHdvcmtfaWQsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5ldHdvcmtEYXRhID0gSlNPTi5wYXJzZShkYXRhWzBdWydkYXRhJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLm5ldHdvcmtEYXRhID0ge307XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYXV0byBidXR0b24gc2V0IGFjaXZlIG9yIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBuZXR3b3JrQXV0byA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQtcCcpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstc2xpZGVyJykuc2hvdygpO1xyXG4gICAgICAgICAgICBuZXR3b3JrQXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICBuZXR3b3JrTGltaXQgPSAkKCcjbmV0d29yay1zbGlkZXInKS5zbGlkZXIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKG5ldHdvcmtMaW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSB0aGUgcGxheSBidXR0b24gLS0+IExvYWRpbmcgc3ltYm9sXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkaXNhYmxlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBnbHlwaGljb24tcmVmcmVzaC1hbmltYXRlXCI+PC9zcGFuPkxvYWRpbmcnKTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlIHRoZSBwbGF5IGJ1dHRvbiByZW1vdmUgbG9hZGluZyBzeW1ib2xcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGVuYWJsZVBsYXlCdXR0b24oKSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5QbGF5Jyk7XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSBjb2xvciBsZWdlbmRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hhbmdlTGVnZW5kKCkge1xyXG4gICAgICAgIHZhciBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgICAgICB2YXIgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgICAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgdmFyIGxlZ2VuZFdpZHRoID0gdGFua1dpZHRoICogMC4wODtcclxuICAgICAgICB2YXIgbGVnZW5kSGVpZ2h0ID0gdGFua0hlaWdodCAqIDAuMDQ7XHJcbiAgICAgICAgdmFyIGRpZmZlcmVudENvbG9ycyA9IDA7XHJcblxyXG4gICAgICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGFuaW1hbHNcclxuICAgICAgICBpZiAoYWN0aXZlU2NhbGUgIT09ICdibGFjaycpIHtcclxuICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLnJhbmdlKCkpO1xyXG4gICAgICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLmRvbWFpbigpKTtcclxuICAgICAgICAgICAgZGlmZmVyZW50Q29sb3JzID0gdG1wU2NhbGUucmFuZ2UoKVxyXG4gICAgICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgICAgICBsZWdlbmQuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICAgICAgbGVnZW5kXHJcbiAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0YW5rV2lkdGggLSBkaWZmZXJlbnRDb2xvcnMgKiBsZWdlbmRXaWR0aCkgKyBpICogbGVnZW5kV2lkdGggLSAzMCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRVhJVCAtIGxlZ2VuZFxyXG4gICAgICAgIGxlZ2VuZC5leGl0KClcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgICAgIGxlZ2VuZFRleHQudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgICAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMiAqIGxlZ2VuZEhlaWdodClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwbHVzIDE1IGhhcyB0byBiZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0YW5rV2lkdGggLSBkaWZmZXJlbnRDb2xvcnMgKiBsZWdlbmRXaWR0aCkgKyBpICogbGVnZW5kV2lkdGggLSAxMCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgICAgICBsZWdlbmRUZXh0LmV4aXQoKVxyXG4gICAgICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gIC45NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHBlcmNlbnRpbGVzKGFycikge1xyXG4gICAgICAgIGxldCBwID0gMC45NTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHA7XHJcbiAgICAgICAgbGV0IGxvd2VyID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICAgICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICAgICAgaWYgKHVwcGVyID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycltsb3dlcl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIHBhcmFtZXRlcnMqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQge1xyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldCxcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldEluZGV4VGltZSxcclxuICAgIGdldFpvb21GdW5jdGlvbixcclxuICAgIHNldFpvb21GdW5jdGlvblxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuYW1lc3BhY2UgdG8gbWluaW1pemUgZ2xvYmFsIHZhcmlhYmxlc1xyXG4gKiBDb2RlIGlzIGluIGEgY2xvc3VyZSBhbmQgbWFudWFsbHkgZXhwb3NlIG9ubHkgdGhvc2VcclxuICogdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBnbG9iYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGluZUNoYXJ0KCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0aGUgbGluZSBjaGFydCBmb3IgdGhlIGF2ZXJhZ2VkIHN3YXJtIGZlYXR1cmVzXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICAvLyBTd2FybSBmZWF0dXJlcyBsaW5lIGNoYXJ0XHJcbiAgICBsZXQgbGluZUNoYXJ0SGVpZ2h0ID0gNTAwOyAvLyB0aGUgbGluZSBjaGFydCBoZWlnaHRcclxuICAgIGxldCBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiAxMCxcclxuICAgICAgICByaWdodDogMCxcclxuICAgICAgICBib3R0b206IDEwMCxcclxuICAgICAgICBsZWZ0OiAxMFxyXG4gICAgfTtcclxuICAgIGxldCBtYXJnaW5Ub0xlZ2VuZCA9IDUwO1xyXG4gICAgbGV0IGxpbmVDaGFydFdpZHRoID0gNTAwMDtcclxuXHJcbiAgICBsZXQgc3dhcm1fZmVhdHVyZXMgPSBPYmplY3Qua2V5cyhzd2FybURhdGFbMF0pO1xyXG4gICAgLy8gcmVtb3ZlIHRoZSB0aW1lIGtleVxyXG4gICAgbGV0IGluZGV4ID0gc3dhcm1fZmVhdHVyZXMuaW5kZXhPZigndGltZScpO1xyXG4gICAgc3dhcm1fZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIExpbmUgY2hhcnQgYnV0dG9ucyB0byB0aGUgZmVhdHVyZSBwYW5lbFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IHN3YXJtX2ZlYXR1cmVzW2ldLnNwbGl0KCdfJykuam9pbignICcpO1xyXG4gICAgICAgIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5zbGljZSgxKTtcclxuXHJcbiAgICAgICAgJCgnLmZlYXR1cmUtY2hlY2stYm94JykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZmVhdHVyZS1jaGVjay1ib3gtZGVmYXVsdCBsaW5lQ2hhcnRDaGVja0JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJkcmF3U3dhcm1gICsgc3dhcm1fZmVhdHVyZXNbaV0gKyBgXCIgY2xhc3M9XCJsaW5lQ2hhcnRCdXR0b25cIiB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArICdcIj4nICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgKyBgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcbiAgICB9XHJcbiAgICAvL2NoZWNrIGxpbmUgY2hhcnQgZHJhdyBhbGwgbGluZXNcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgbGV0IGxpbmVDaGFydERhdGEgPSBbXTtcclxuICAgIGxldCByYXRpbyA9IDE7XHJcbiAgICAvLyBhZ2dyZWdhdGUgYW5kIGF2ZXJhZ2UgdGhlIHN3YXJtIGRhdGEgdG8gbGluZUNoYXJ0V2lkdGggcG9pbnRzIGluIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBpZiAoc3dhcm1EYXRhLmxlbmd0aCA+IGxpbmVDaGFydFdpZHRoKSB7XHJcbiAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuICAgICAgICAvLyB0bXAgYXJyYXkgZm9yIHRoZSBhZ2dyZWdhdGVkIGFuZCBhdmVyYWdlZCBmZWF0dXJlc1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhZ2dyZWdhdGUgdGhlIGZlYXR1cmVzIGluIHRoZSB0ZW1wIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzd2FybURhdGFbaV1bc3dhcm1fZmVhdHVyZXNbal1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSByYXRpbyBpcyB6ZXJvIHRoZW4gYXZlcmFnZSBpdCBhbmQgc2V0IGl0IHRvIHplcm9cclxuICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9vYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpbWUnOiBpIC8gcmF0aW9cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF9vYmplY3Rbc3dhcm1fZmVhdHVyZXNbal1dID0gdG1wW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVDaGFydERhdGEucHVzaCh0bXBfb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpbmVDaGFydERhdGEgPSBzd2FybURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyB4IGF4aXMgc2NhbGUgLSBtaW51cyBtYXJnaW5MaW5lQ2hhcnQgIG5lZWRlZFxyXG4gICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgMTAwXSlcclxuICAgICAgICAucmFuZ2UoW2xpbmVDaGFydEhlaWdodCwgMF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeSlcclxuICAgICAgICAudGlja3MoMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIGxldCBkcmFnZ2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZHJhZ2dlZCBmdW5jdGlvbiBnZXQgdGhlIGNvb3JkaW5hdGVzIGFuZCBjYWxjdWxhdGUgdGhlIHRpbWUgbW9tZW50IGZyb20gdGhpc1xyXG4gICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzKTtcclxuICAgICAgICBpZiAoY29vcmRzWzBdIDwgbWFyZ2luLmxlZnQgfHwgY29vcmRzWzBdID4gbGluZUNoYXJ0V2lkdGggfHwgY29vcmRzWzFdIDwgMCB8fCBjb29yZHNbMV0gPiBsaW5lQ2hhcnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0bXAgc2NhbGUgdG8gaW5jbHVkZSB0aGUgem9vbSBmYWN0b3JcclxuICAgICAgICBsZXQgdG1wU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ2V0Wm9vbUZ1bmN0aW9uKCkucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKGdldFpvb21GdW5jdGlvbigpLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBzZXQgdGhlIG5ldyB0aW1lXHJcbiAgICAgICAgc2V0SW5kZXhUaW1lKE1hdGguZmxvb3IoKHRtcFNjYWxlKGNvb3Jkc1swXSAtIG1hcmdpbi5sZWZ0KSkgKiByYXRpbykpO1xyXG4gICAgfTtcclxuICAgIGxldCB0cmVuZENoYXJ0c1pvb20gPSB7fTtcclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICBzZXRab29tRnVuY3Rpb24oeC5kb21haW4odC5yZXNjYWxlWCh4MikuZG9tYWluKCkpKTtcclxuICAgICAgICAgICAgLy8gem9vbSBlYWNoIGF2YWlhYmxlIGxpbmVcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGxpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cC5zZWxlY3QoKCcjJyArIGtleSArICdMaW5lJykpLmF0dHIoJ2QnLCBsaW5lc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB6b29tIHRoZSB0cmVuZCBjaGFydHNcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRyZW5kQ2hhcnRzWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyZW5kQ2hhcnRzWm9vbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCgnIycgKyBrZXkgKyAnVHJlbmRDaGFydCAuJyArIHRyZW5kQ2hhcnRzRWxlbVtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRyZW5kQ2hhcnRzWm9vbVtrZXldW3RyZW5kQ2hhcnRzRWxlbVtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBzdmcgcmVzaXphYmxlXHJcbiAgICBsZXQgc3dhcm1MaW5lQ2hhcnQgPSBkMy5zZWxlY3QoJyNzd2FybS12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctTGluZUNoYXJ0Q29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBsaW5lQ2hhcnRIZWlnaHQgKyAnKScpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeSBheGlzXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG5cclxuICAgIC8vIHRoZSB0aW1lIGxpbmUgYXBwZW5kIHRoZSBsaW5lXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGltZUxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRUaW1lTGluZScpXHJcbiAgICAgICAgLmF0dHIoJ3gxJywgMClcclxuICAgICAgICAuYXR0cigneTEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4MicsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kyJywgbGluZUNoYXJ0SGVpZ2h0KTtcclxuXHJcbiAgICAvLyAqKlxyXG4gICAgLy8gY29sb3JzIGZvciB0aGUgbGluZXNcclxuICAgIGxldCBsaW5lX2NvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVDYXRlZ29yeTEwKTtcclxuICAgIGxldCBsaW5lcyA9IHt9O1xyXG4gICAgLy8gYWRkIHRoZSBsaW5lcyB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtaW4gPSBkMy5taW4obGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1heCA9IGQzLm1heChsaW5lQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkW3N3YXJtX2ZlYXR1cmVzW2ldXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuICAgICAgICBsZXQgbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geChkWyd0aW1lJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtzd2FybV9mZWF0dXJlc1tpXV0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGluZXNbc3dhcm1fZmVhdHVyZXNbaV1dID0gbGluZTtcclxuICAgICAgICAvL2FwcGVuZCB0aGUgbGluZSB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgICAgIHpvb21Hcm91cC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuZGF0YShbbGluZUNoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lIGxpbmVDaGFydExpbmUnKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGxpbmVfY29sb3JzKGkpKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpXHJcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgc3dhcm1fZmVhdHVyZXNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3pvb20nKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxpbmVDaGFydFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsaW5lQ2hhcnRIZWlnaHQpXHJcbiAgICAgICAgLmNhbGwoem9vbSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZHJhZ2dlZClcclxuICAgICAgICAuY2FsbChkMy5kcmFnKClcclxuICAgICAgICAgICAgLm9uKCdkcmFnJywgZHJhZ2dlZClcclxuICAgICAgICApO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbGVnZW5kIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gMTAwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDUwO1xyXG5cclxuICAgIC8vc2VsZWN0IGFsbCB0aGUgbGluZXNcclxuICAgIGxldCBjaGFydExpbmVzID0gZDMuc2VsZWN0QWxsKCcubGluZScpO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSBsZWdlbmRcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydExlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5ib3R0b20gKyAnLCcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luVG9MZWdlbmQpICsgJyknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShjaGFydExpbmVzLl9ncm91cHNbMF0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA2MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZC5zdHlsZS5zdHJva2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lQ2hhcnRsZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSArICc6ICcpO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBlbmQgdGhlIHRleHQgZm9yIHRoZSB2YWx1ZSBvZiB0aGUgbGluZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0bGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggK1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgZXhwcmVzc2lvbiBnZXRzIHRoZSB0ZXh0IGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnIycgKyBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnTGVnZW5kVGl0bGUnKS5ub2RlKCkuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgK1xyXG4gICAgICAgICAgICAgICAgICAgIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgnMC4wJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy9hcHBlbmQgYSBsZWdlbmQgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydHNcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RyZW5kQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoWyc1JSAtIDk1JScsICcyNSUgLSA3NSUnLCAnTWVkaWFuJ10pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA4MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNzRhOWNmJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjMDQ1YThkJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyM1MjUyNTInO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydGxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICsgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGxpbmUgY2hhcnQgYnV0dG9uIGxpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJCgoJyNkcmF3U3dhcm0nICsgc3dhcm1fZmVhdHVyZXNbaV0pKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICQoKCcjJyArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgICQoJy5kcmF3LWRldGFpbHMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICAgICAgYWRkVHJlbmRDaGFydCh0aGlzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW1vdmVUcmVuZENoYXJ0KCk7XHJcbiAgICAgICAgICAgIGVuYWJsZUxpbmVDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkaXNhYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydENoZWNrQm94JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBlbmFibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAkKCcubGluZUNoYXJ0Q2hlY2tCb3gnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAkKCcubGluZUNoYXJ0TGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRyZW5kIGNoYXJ0IGVsZW1lbnRzXHJcbiAgICBsZXQgdHJlbmRDaGFydHNFbGVtID0gWydsb3dlck91dGVyQXJlYScsICdsb3dlcklubmVyQXJlYScsICdtZWRpYW5MaW5lJywgJ3VwcGVySW5uZXJBcmVhJywgJ3VwcGVyT3V0ZXJBcmVhJ107XHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRyZW5kIGNoYXJ0IHNob3dpbmcgbWVkaWFuIGFuZCBwZXJjZW50aWxlc1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggZmVhdHVyZSB0byBkaXNwbGF5IGluIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCBmZWF0dXJlID0gJyc7XHJcbiAgICAgICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgICAgICBmZWF0dXJlID0gJ3NwZWVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWNjZWxlcmF0aW9uJykpIHtcclxuICAgICAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdkaXN0YW5jZS1jZW50cm9pZCcpKSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmUgPSAnZGlzdGFuY2VfY2VudHJvaWQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZGF0YSBpcyBub3QgbG9hZGVkIGZ1bGx5IC0tIHJldHVyblxyXG4gICAgICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAgICAgJCgnI2xpbmVDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuICAgICAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLnNob3coKTtcclxuICAgICAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgICAgIGlmICghJCgoJyMnICsgZmVhdHVyZSArICdUcmVuZENoYXJ0JykpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGRhdGEgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJjZXRpbGVzIGZvciBldmVyeSB0aW1lIHN0ZXBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtX2FuaW1hbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0W2kgKiBudW1fYW5pbWFscyArIGpdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXModG1wKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9hZ2dyZWdhdGUgYW5kIGF2ZXJhZ2UgdGhlIHRyZW5kQ2hhcnREYXRhIHRvIGxpbmVDaGFydFdpZHRoIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFRyZW5kQ2hhcnREYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICByYXRpbyA9IE1hdGguY2VpbCh0cmVuZENoYXJ0RGF0YS5sZW5ndGggLyBsaW5lQ2hhcnRXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZ2dyZWdhdGVcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gKz0gdHJlbmRDaGFydERhdGFbaV1bal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpdmlkZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICUgcmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wVHJlbmRDaGFydERhdGEucHVzaCh0bXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBbcGVyYzA1LHBlcmMyNSxwZXJjNTAscGVyYzc1LHBlcmM5NV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhID0gdG1wVHJlbmRDaGFydERhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IGZvciB0aGUgbm9ybWFsaXphdGlvblxyXG4gICAgICAgICAgICBsZXQgbWluID0gZDMubWluKHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZFswXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXggPSBkMy5tYXgodHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkWzRdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICAgICAgbGV0IHRyZW5kQ2hhcnQgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0cmVuZENoYXJ0RGF0YScpO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHpvb20gcmVjdGFuZ2xlIGFnYWluIHRvIHRoZSBlbmQgb2YgdGhlIGdyb3VwXHJcbiAgICAgICAgICAgICQoJy56b29tJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgICAgICAvLyB2YXIgdG8gc2F2ZSB0aGUgZnVuY3Rpb25zIGZvciB0aGUgem9vbVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbnMgZm9yIHRoZSB1cHBlciBhbmQgaW5uZXIgYXJlYXMgYW5kIHRoZSBtZWRpYW5cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgLy8gbG93ZXIgb3V0ZXIgYXJlYSBhbmQgbG93ZXIgaW5uZXIgYXJlYVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkWyhpICsgMSldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG1lZGlhbiBsaW5lXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB1cHBlciBpbm5lciBhcmVhIGFuZCB1cHBlciBvdXRlciBhcmVhXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5hcmVhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgLSAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBzYXZlIHRoaXMgZm9yIHRoZSBsYXRlciB6b29tXHJcbiAgICAgICAgICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV1bdHJlbmRDaGFydHNFbGVtW2ldXSA9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhdGhcclxuICAgICAgICAgICAgICAgIHRyZW5kQ2hhcnQuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbdHJlbmRDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHRyZW5kQ2hhcnRzRWxlbVtpXSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRlbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICAgICAgJCgoJyMnICsgZmVhdHVyZSArICdUcmVuZENoYXJ0JykpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIDA1LCAyNSwgNTAsIDc1LCA5NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHBlcmNlbnRpbGVzKGFycikge1xyXG4gICAgICAgIGxldCBwID0gWzAuMDUsIDAuMjUsIDAuNSwgMC43NSwgMC45NV07XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHBbaV07XHJcbiAgICAgICAgICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgdXBwZXIgPSBsb3dlciArIDE7XHJcbiAgICAgICAgICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICAgICAgICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnJbbG93ZXJdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVRyZW5kQ2hhcnQoKSB7XHJcbiAgICAgICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsaW5lQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saW5lX2NoYXJ0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmVhdHVyZXMgY2hlY2tib3ggYW5kIHJhZGlvIGJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggZGl2IHtcXHJcXG4gICAgY2xlYXI6IGJvdGg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBsYWJlbCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5LCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xcclxcbiAgICB0ZXh0LWluZGVudDogM2VtO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICB3aWR0aDogMi41ZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogI0MyQzJDMjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjNzc3O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4ICM5OTk7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogU1ZHIGVsZW1lbnRzIGFuZCB0ZXh0ICovXFxyXFxuXFxyXFxuLnN2Zy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudC1sZWdlbmQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAxMHB4O1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWxlZ2VuZENvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1MaW5lQ2hhcnRDb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgLyogZGVwZW5kcyBvbiBzdmcgcmF0aW8gKi9cXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDE3JTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBwYXRoIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgbGluZSB7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjM7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLngge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnkge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXNMaW5lQ2hhcnQgcGF0aCBsaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi5saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRpbWUgICovXFxyXFxuXFxyXFxuLmZyYW1lVGV4dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi8qIFNsaWRlciB0aWNrcyAgKi9cXHJcXG5cXHJcXG4udWktc2xpZGVyLXRpY2sge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAzcHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICMzMzdhYjc7XFxyXFxuICAgIGhlaWdodDogMC44ZW07XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTGFvZGluZyBnaWYgICAqL1xcclxcblxcclxcbiNsb2FkaW5nIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29sb3IgbGVnZW5kICAgICovXFxyXFxuXFxyXFxuLmxlZ2VuZCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVnZW5kVGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmVDaGFydGxlZ2VuZFRleHQge1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4udGltZUxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKnN3YXJtIGZlYXR1cmVzICovXFxyXFxuXFxyXFxuLmNlbnRyb2lkIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkb2lkIHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmh1bGxQYXRoIHtcXHJcXG4gICAgZmlsbDogI2ZmZjtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGF1bmF5VHJpYW5ndWxhdGlvbiB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjQ7XFxyXFxufVxcclxcblxcclxcbi5nbHlwaGljb24tcmVmcmVzaC1hbmltYXRlIHtcXHJcXG4gICAgLWFuaW1hdGlvbjogc3BpbiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbjIgLjdzIGluZmluaXRlIGxpbmVhcjtcXHJcXG59XFxyXFxuXFxyXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4yIHtcXHJcXG4gICAgZnJvbSB7XFxyXFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgIHRvIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHNwaW4ge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgIHRvIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3Igc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciAuYnRuIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjYmRiZGJkO1xcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciAuYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MSB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNkOWQ5ZDk7XFxyXFxufVxcclxcblxcclxcbiNidG4tZ3JleTIge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjOTY5Njk2O1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWRhcmsge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjNGQ0ZDRkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBicmV3ZXIgcGlja2VyIGRpdiAqL1xcclxcblxcclxcbi5wYWxldHRlIHtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZTtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXHJcXG4gICAgbWFyZ2luOiA0cHggMCA0cHggNHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYWFhO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhdGNoIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICB3aWR0aDogMjJweDtcXHJcXG4gICAgaGVpZ2h0OiAyMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udm9yb25vaSB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2lyY2xlIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiA2cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS40Mjg1NzE0Mjk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2lyY2xlLmJ0bi1sZyB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEzcHggMTNweDtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4zMztcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVG9vbHRpcCAqL1xcclxcblxcclxcbmRpdi50b29sdGlwIHtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KSAhaW1wb3J0YW50O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogIzFiODA5ZSAhaW1wb3J0YW50O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xcclxcbiAgICBib3JkZXItbGVmdC13aWR0aDogNXB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAgdGFibGUgdGQ6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmVDaGFydENoZWNrQm94LmRpc2FibGVkIHtcXHJcXG4gICAgY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi51cHBlck91dGVyQXJlYSwgLmxvd2VyT3V0ZXJBcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjNzRhOWNmO1xcclxcbiAgICBzdHJva2U6ICMzNjkwYzA7XFxyXFxufVxcclxcblxcclxcbi51cHBlcklubmVyQXJlYSwgLmxvd2VySW5uZXJBcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjMDQ1YThkO1xcclxcbiAgICBzdHJva2U6ICMwMjM4NTg7XFxyXFxufVxcclxcblxcclxcbi5tZWRpYW5MaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNTI1MjUyO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDU7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5OTk7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkICM0ZDRkNGQ7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMXB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuNCk7XFxyXFxufVxcclxcblxcclxcbi56b29tIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLnguYXhpc0xpbmVDaGFydD5nPnRleHQge1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4uYXJyb3cge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1saW5lIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1hcnJvdyB7XFxyXFxuICAgIGZpbGw6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IC01cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogLTEwcHg7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogdGhpY2sgc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBzcGFuIHtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgYm9yZGVyOiB0aGljayBzb2xpZCB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBoMiB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDdweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC50MiAubW9kLWhlYWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLmNsb3NlIHtcXHJcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaGVhZGVyIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICNlNWU1ZTU7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlOmhvdmVyIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJvcGRvd24tbWVudSB7XFxyXFxuICAgIG1pbi13aWR0aDogNDBweDtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbWV0YWRhdGEtaW5wdXQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgbGkge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHNwYW4ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYmwtYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzdmYzk3ZjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYzA4NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYWItYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM4NmNiMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmtFZGdlcyB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xcclxcbn1cXHJcXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxudmFyIHNvdXJjZTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRUb0RhdGFzZXQsXHJcbiAgICBzZXREYXRhU2V0UGVyY2VudGlsZSxcclxuICAgIHNldFN3YXJtRGF0YSxcclxuICAgIHNldE1ldGFEYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGROZXR3b3JrQnV0dG9uc1xyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG4vKipcclxuICogU3RyZWFtIHRoZSBtb3ZlbWVudCBkYXRhIGZyb20gdGhlIEFQSVxyXG4gKiBMb2FkcyBvbmx5IHRoZSBleHBsaWNpdCBtb3ZlbWVudCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtTW92ZW1lbnREYXRhKCkge1xyXG4gICAgaWYgKHdpbmRvdy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9tb3ZlbWVudF9vbmx5LycgKyBwYXJhbWV0ZXJzWydpZCddKTtcclxuICAgICAgICBzb3VyY2Uub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSAnY2xvc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZFRvRGF0YXNldChKU09OLnBhcnNlKGUuZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5yZWFkeVN0YXRlID09IEV2ZW50U291cmNlLkNMT1NFRCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1N0cmVhbWluZyBlcnJvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnV2ViYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0cmVhbWluZycpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwZXJjZW50aWxlIGRhdGEgZnJvbSB0aGUgYXBpXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGVyY2VudGlsZSgpIHtcclxuICAgIGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL3BlcmNlbnRpbGUvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZGF0YVNldFBlcmNlbnRpbGUgaW50byBhbiBhcnJheVxyXG4gICAgICAgICAgICAvLyBbbWluLCBwZXJjZW50aWxlXzEsLi4uLHBlcmNlbnRpbGVfOSxtYXhdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbZGF0YVtpXVsnZmVhdHVyZSddXSA9IFtkYXRhW2ldWydtaW4nXSwgZGF0YVtpXVsncDEnXSwgZGF0YVtpXVsncDInXSwgZGF0YVtpXVsncDMnXSwgZGF0YVtpXVsncDUnXSwgZGF0YVtpXVsncDcnXSwgZGF0YVtpXVsncDgnXSwgZGF0YVtpXVsncDknXSwgZGF0YVtpXVsnbWF4J11dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldERhdGFTZXRQZXJjZW50aWxlKGRhdGFTZXRQZXJjZW50aWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydCBmcm9tIHRoZSBhcGlcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybUZlYXR1cmVzKCkge1xyXG4gICAgbGV0IHN3YXJtX2ZlYXR1cmVzID0gWydzd2FybV90aW1lJywgJ3N3YXJtX3NwZWVkJywgJ3N3YXJtX2FjY2VsZXJhdGlvbicsICdzd2FybV9jb252ZXhfaHVsbF9hcmVhJyxcclxuICAgICAgICAnc3dhcm1fZGlzdGFuY2VfY2VudHJvaWQnLCAnc3dhcm1fZGlyZWN0aW9uJywgJ3N3YXJtX3BvbGFyaXNhdGlvbidcclxuICAgIF07XHJcblxyXG4gICAgLy8gZ2V0IGFsbCB0aGUgb3RoZXIgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgc3dhcm1fZmVhdHVyZXNbaV0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZSA9IHN3YXJtX2ZlYXR1cmVzW2ldLnJlcGxhY2UoJ3N3YXJtXycsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vL1xyXG4vL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0YURhdGEoKSB7XHJcbiAgICAvL2dldCBtZXRhZGF0YSBpbmZvcm1hdGlvblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL21ldGFkYXRhLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXRNZXRhRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YSgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmtzLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGFhKCkge31cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIC8vIGFkZCB0aGUgZGF0YSB0byB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGlmIChkYXRhc2V0TWV0YWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRyIGlkPVwibWV0YWRhdGEtcm93LScgKyBkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddICsgJ1wiPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc3BlY2llcyddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzaXplJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChgPGRpdiBjbGFzcz1cImRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBidG4gYnRuLWRlZmF1bHQgYnRuLWNvbG9yXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicHJldmlld1wiIGNsYXNzPVwibWV0YWRhdGEtc3dhdGNoXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yLWZpZWxkXCIgdmFsdWU9XCJXaGl0ZVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+IGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JzID0gWycjZmZmJywgJyNlNDFhMWMnLCAnIzM3N2ViOCcsICcjNGRhZjRhJywgJyM5ODRlYTMnLCAnI2ZmN2YwMCcsICcjZmZmZjMzJywgJyNhNjU2MjgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0U3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U3RyaW5nICs9ICc8ZGl2IGNsYXNzPVwibWV0YWRhdGEtc3dhdGNoIG1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArIGNvbG9yc1tpXSArICdcIiB2YWx1ZT1cIicgKyBpZCArICdcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfShkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC91bD48L2Rpdj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjbWV0YWRhdGEtdGFibGUnKS5maW5kKCd0Ym9keScpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ1RoZXJlIGlzIG5vIG1ldGFkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxuXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQgKi9cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIG5ldHdvcmsgc2VsZWN0IGJ1dHRvbnMgdG8gdGhlIHdlYmludGVyZmFjZVxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgbmV0d29yayBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV0d29ya0J1dHRvbnMoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldWydmaW5pc2hlZCddKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keScpLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWxnIGJ0bi1ibG9ja1wiIGRhdGE9JyArXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICtcclxuICAgICAgICAgICAgICAgICAgICAnPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaV1bJ25hbWUnXSArICc8L2J1dHRvbj4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHknKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdUaGVyZSBpcyBubyBuZXR3b3JrIGRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9uZXR3b3JrLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9