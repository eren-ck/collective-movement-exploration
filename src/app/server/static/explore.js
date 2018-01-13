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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "networkData", function() { return networkData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "networkHierarchy", function() { return networkHierarchy; });
/* harmony export (immutable) */ __webpack_exports__["addToDataset"] = addToDataset;
/* harmony export (immutable) */ __webpack_exports__["setDataSetPercentile"] = setDataSetPercentile;
/* harmony export (immutable) */ __webpack_exports__["setMetaData"] = setMetaData;
/* harmony export (immutable) */ __webpack_exports__["setSwarmData"] = setSwarmData;
/* harmony export (immutable) */ __webpack_exports__["setDatasetFeature"] = setDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["setNetworkData"] = setNetworkData;
/* harmony export (immutable) */ __webpack_exports__["setHierarchyData"] = setHierarchyData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hierarchy_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__explore_css__);
/*eslint-disable no-unused-lets*/
/*global window, $ */
// import all js






// import css


let dataset = []; // main dataset with values for each individual animal
let datasetMetadata = []; // metadataset for each individual fish
let swarmData = []; // swarmdata for linechart and also other swarm features
let dataSetPercentile = {}; // pecentiles needed for the color mapping
let networkData = {}; // network data
let networkHierarchy = {}; // network hierarchy data



/**
 * Get the basic data to get the tool running.
 * after the pending ajax queries are finished
 * the tool is drawn
 */
$(document).ready(function() {
    // console.log(parameters);

    // get the movement data
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["j" /* streamMovementData */]();

    // get the dataSetPercentile
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["f" /* getPercentile */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["i" /* getSwarmFeatures */]();

    // get the metadata and initialize the metada window
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["b" /* getMetaData */]();

    // get the information if there are already networks created for this dastaset
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["d" /* getNetworkDataButton */]();

});

/************************************************
    Getter and setter
 *************************************************/

/**
 * Concact to the main dataset
 * the idea is to use this one day for lazy loading
 * @param {array} value - array of movement datasets
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
    Object(__WEBPACK_IMPORTED_MODULE_1__metadata_js__["b" /* initializeMetaddata */])();
}

/**
 * Add a new feature dimension to the swarm dataset
 * @param {array} data - Array of swarm values consisting of [feature_0,feature_1,...]
 * @param {string} feature - string array of the feature
 */
function setSwarmData(data, feature) {
    for (let i = 0; i < data.length; i++) {
        // add the the object to the array if there is no element yet
        if (typeof swarmData[i] === 'undefined') {
            swarmData.push({});
        }

        // check if integer or float
        if (data[i] && !(isNaN(data[i]))) {
            swarmData[i][feature] = +data[i];
        } else {
            // is string
            swarmData[i][feature] = data[i];
        }

    }
}

/**
 * Add a new feature dimension to the dataset
 * @param {array} data - Array of features values consisting of [feature_0, feature_1,...]
 * @param {string} feature - string array of the feature
 */
function setDatasetFeature(data, feature) {
    for (let i = 0; i < data.length; i++) {
        // add the the object to the array if there is no element yet
        if (typeof dataset[i] === 'undefined') {
            dataset.push({});
        }
        // parse the int
        dataset[i][feature] = +data[i];
    }
}

/**
 * Set the network value
 * @param {array} value - Array of of arrays with all values
 *                           from the calculated adjacency matrix
 */
function setNetworkData(value) {
    networkData = value;
}

/**
 * Set the network hiearhcy value
 * @param {array} value - Array of of arrays with all values
 *                           with hierarchy
 */
function setHierarchyData(value, network_id) {
    // if the element is empty remove the element from the netwrokHierarchy object
    if (Object.keys(value).length === 0 && value.constructor === Object) {
        delete networkHierarchy['h' + network_id];
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["i" /* removeHierarchyLevel */])(network_id);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["h" /* removeHierarchyColor */])(network_id);
    } // add it to the network hierarchy
    else {
        networkHierarchy['h' + network_id] = value;
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["k" /* setHierarchyLevel */])(network_id, 2);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["j" /* setHierarchyColor */])(network_id);
    } // too many elements cant be added

    Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["b" /* changeHierarchyLegend */])();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return indexTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return tankWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return tankHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return activeScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return medoidAnimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return activeAnimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return arrayAnimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return animal_ids; });
/* harmony export (immutable) */ __webpack_exports__["m"] = spatialViewInit;
/* harmony export (immutable) */ __webpack_exports__["f"] = draw;
/* harmony export (immutable) */ __webpack_exports__["k"] = setIndexTime;
/* harmony export (immutable) */ __webpack_exports__["e"] = decIndexTime;
/* harmony export (immutable) */ __webpack_exports__["j"] = setActiveScale;
/* harmony export (immutable) */ __webpack_exports__["l"] = setMedoidAnimal;
/* harmony export (immutable) */ __webpack_exports__["i"] = setActiveAnimals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interaction_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__ = __webpack_require__(10);
/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set */
























let indexTime = 0; // actual time moment in the animation
let tankWidth;
let tankHeight;
let activeScale = 'black'; // can be speed, acceleration, .. and black (meaning no active scale)
let medoidAnimal = -1; // which animal is the medoid (-1 is no animal)
let activeAnimals = []; // active selected animals
let arrayAnimals; // array of animals for the specific time frame
let animal_ids; // array of unique animal ids

let svgContainer; // svg container for the spatial view
let tank; // svg group for the spatial view tank

/**
 * Initialize the spatial view with all the important factors
 */
function spatialViewInit() {

    let minPoint = parameters['min']['geometry']['coordinates'];
    let maxPoint = parameters['max']['geometry']['coordinates'];
    // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
    // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
    tankWidth = (maxPoint[0] - minPoint[0]) * 1.02;
    tankHeight = (maxPoint[1] - minPoint[1]) * 1.02;

    // make the view resizable
    $(function() {
        $('#main-vis').draggable({
                containment: 'parent'
            }).resizable({
                aspectRatio: true,
                maxWidth: $('#main-vis-div').width()
            }).height(tankHeight * 0.6)
            .width(tankWidth * 0.6);
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

    // get  number of distinct animal ids
    let num_animals = new Set();
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length; i++) {
        if (__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['t'] === __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][0]['t']) {
            num_animals.add(__WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"][i]['a']);
        } else {
            i = __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].length;
        }
    }
    animal_ids = Array.from(num_animals).sort();

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
    // TODO remove this from here to interaction
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

    //append delaunay-triangulation group
    tank.append('g')
        .attr('id', 'delaunay-triangulation-group');

    //append voronoi group
    tank.append('g')
        .attr('id', 'vornoiGroup');

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
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["c" /* initTooltip */])();
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["b" /* initSliders */])();
    Object(__WEBPACK_IMPORTED_MODULE_8__legend_js__["a" /* addSpatialViewGroup */])();
    Object(__WEBPACK_IMPORTED_MODULE_6__color_picker_js__["b" /* initColorPicker */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["b" /* lineChart */])();
    Object(__WEBPACK_IMPORTED_MODULE_7__listener_js__["a" /* initListeners */])();
    Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* initDendrogram */])();
    // start the animation
    draw();
}

/**
 * Drawing function - is called for each timestep
 * indexTime saves the current time
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
            // draw hierarchy
            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["c" /* drawDendrogram */])();
            //change the time frame text
            svgContainer.select('.frame-text')
                .text(Math.floor(indexTime / 1500) % 60 + ':' + Math.floor(indexTime / parameters['fps']) % 60 + '::' + indexTime % parameters['fps']);
            // if a second has changed move the slider
            if (indexTime % parameters['fps'] === 0) {
                Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["d" /* setTimeSlider */])(indexTime);
            }

            let svgAnimals = tank.selectAll('g.animal')
                .data(arrayAnimals);

            // Network vis
            let networkVis;
            if (indexTime in __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"]) {
                let network = [];
                let tmp = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"][indexTime];

                let tmp_index = 0;
                // display the whole network
                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["h" /* showNetworkHierarchy */] == null) {
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
                } // display the network only in the clustering
                else {
                    for (let i = 0; i < arrayAnimals.length; i++) {
                        for (let j = i + 1; j < arrayAnimals.length; j++) {
                            for (let k = 0; k < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["f" /* networkHierarchyIds */].length; k++) {
                                if (__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["f" /* networkHierarchyIds */][k].includes(arrayAnimals[i]['a']) && __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["f" /* networkHierarchyIds */][k].includes(arrayAnimals[j]['a'])) {
                                    network.push({
                                        'node1': arrayAnimals[i]['a'],
                                        'node2': arrayAnimals[j]['a'],
                                        'start': arrayAnimals[i]['p'],
                                        'end': arrayAnimals[j]['p'],
                                        'val': tmp[tmp_index]
                                    });
                                }
                            }
                            tmp_index = tmp_index + 1;
                        }
                    }
                }

                network.forEach(function(d) {
                    $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']));
                    $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']));
                });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["b" /* networkAuto */]) {
                    let tmpArray = [];
                    for (let i = 0; i < network.length; i++) {
                        tmpArray.push(network[i]['val']);
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["e" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["d" /* percentiles */])(tmpArray));
                }

                network = network.filter(function(d) {
                    return d['val'] <= __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkLimit */];
                });
                // DATA JOIN
                networkVis = tank.select('#networkGroup')
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
                        return (d['end'][0]);
                    })
                    .attr('y2', function(d) {
                        return (-d['end'][1]);
                    })
                    .attr('stroke', function(d) {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']);
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
                        return (d['end'][0]);
                    })
                    .attr('y2', function(d) {
                        return (-d['end'][1]);
                    })
                    .attr('stroke', function(d) {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']);
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
                    .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['triangulation']]);

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
                    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["g" /* tooltipFunction */])(d);
                })
                .on('mouseout', function() {
                    __WEBPACK_IMPORTED_MODULE_4__interaction_js__["f" /* tooltip */]
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
                var hullPath = tank.selectAll('path.hull-path')
                    .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['convex_hull']]);

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
                var tmpScale = Object(__WEBPACK_IMPORTED_MODULE_6__color_picker_js__["c" /* returnColorScale */])();
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

                if (!$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["c" /* metadataColor */])) {
                    Object.keys(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["c" /* metadataColor */]).forEach(function(key) {
                        d3
                            .select('#animal-' + key)
                            .style('fill', __WEBPACK_IMPORTED_MODULE_5__metadata_js__["c" /* metadataColor */][key])
                            .attr('stroke', __WEBPACK_IMPORTED_MODULE_5__metadata_js__["c" /* metadataColor */][key]);
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
                if (__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["f" /* trackingBoolean */]) {
                    Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["a" /* addTrackedData */])(arrayAnimals[0]['t'], activeAnimals);
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

            Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["c" /* updateLineChart */])();


            //check if play button is active and if the animation is not finished
            if (indexTime >= __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length) {
                //start again from the start
                indexTime = 0;
                draw();
            } else if (__WEBPACK_IMPORTED_MODULE_7__listener_js__["b" /* playBoolean */]) {
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
function setIndexTime(value) {
    if (typeof value === 'number' && (indexTime <= __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length)) {
        indexTime = value;
    } else {
        indexTime = 0;
    }
}

/**
 * Decrease time by 1
 */
function decIndexTime() {
    indexTime = indexTime - 1;
}

/**
 * Set the the new active scale - e.g. speed, acceleration, black etc.
 * @param {String} value - active scale for the individual animals
 */
function setActiveScale(value) {
    activeScale = value;
}

/**
 * Set the new medoid animal
 * @param {Number} value - Unique id of the animal
 */
function setMedoidAnimal(value) {
    medoidAnimal = value;
}

/**
 * Set the selected and highlighted animals
 * @param {array} value - array of unqiue id of the animals
 */
function setActiveAnimals(value) {
    activeAnimals = value;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return networkAuto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return networkLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return showNetworkHierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["f"] = setNetworkAuto;
/* harmony export (immutable) */ __webpack_exports__["e"] = setNetworLimit;
/* harmony export (immutable) */ __webpack_exports__["g"] = setNetworkHierarchy;
/*eslint-disable no-unused-lets*/
/*global window, $, d3 */

let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0.5;
let showNetworkHierarchy;
// fixed color scale for the network

/**
 * Static color scale for the network coloring
 * TODO change this sometime
 */
let networkColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    )
    .range(['#000000', '#1d1d1d', '#353535', '#4e4e4e', '#696969', '#858585', '#a3a3a3', '#c0c0c0', '#dfdfdf', '#ffffff']);


/**
 * Add the network  select buttons and hierarchy checkboxes to the network modal
 * @param {array} data - Array of network data
 */
function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-hierarchies-table tbody')
                    .append('<tr><td>' + data[i]['name'] + '</td> ' +
                        '<td> <button type="button" class="btn btn-default btn-block" data=' + data[i]['network_id'] + ' name=' + data[i]['name'] +
                        '><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></button></td> ' +
                        ' <td><label class="custom-control custom-checkbox hiearchy-checkbox"><input class="custom-control-input hidden" type="checkbox" data=' +
                        data[i]['network_id'] + ' name=' + data[i]['name'] + '><span class="custom-control-indicator"></span></label></td>' +
                        '<td><label class="custom-control custom-checkbox network-hierarchy-checkbox"><input class="custom-control-input hidden" type="checkbox" data="' +
                        data[i]['network_id'] + '"><span class="custom-control-indicator"></span></label></td>');
            }
        }
    } else {
        $('#networks-hierarchies-table')
            .append('There is no network data for this dataset');
    }
}

/************************************************
   Setter
 *************************************************/

/**
 * Set the network auto value - if true than the network limit is set to the 0.95 percentile of all values
 * @param {Boolean} value
 */
function setNetworkAuto(value) {
    networkAuto = value;
}

/**
 * Set the network limit with the specific network slider - custom
 * 0 = similar and 1 unsimilar for the specific time moment
 * @param {Number} value - between 0 and 1
 */
function setNetworLimit(value) {
    networkLimit = 1 - value;
}

/**
 * Set the network in hierarchy (e.g. h0) filter
 * @param {Number} hierarchy - e.g. 0-n
 */
function setNetworkHierarchy(value) {
    showNetworkHierarchy = value;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = disablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["c"] = enablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["d"] = percentiles;
/* harmony export (immutable) */ __webpack_exports__["e"] = percentilesLineChart;
/* harmony export (immutable) */ __webpack_exports__["a"] = addAbsoluteFeatureButtons;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart_js__ = __webpack_require__(11);
/*eslint-disable no-unused-lets*/
/*global window,$,*/
// import * as spv from './spatial_view.js';






/**
 * Disable the play button --> Loading symbol
 */
function disablePlayButton() {
    Object(__WEBPACK_IMPORTED_MODULE_1__listener_js__["c" /* setPlayBoolean */])(false);
    $('#play-button').removeClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
    $('#play-button').prop('disabled', true);
}

/**
 * Enable the play button remove loading symbol
 */
function enablePlayButton() {
    Object(__WEBPACK_IMPORTED_MODULE_1__listener_js__["c" /* setPlayBoolean */])(true);
    $('#play-button').addClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>Play');
    $('#play-button').prop('disabled', false);
    Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */])();
}


/**
 * Return  .05 percentiles of the array
 */
function percentiles(arr) {
    let p = 0.05;
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
        return 1 - arr[lower];
    } else {
        return 1 - (arr[lower] * (1 - weight) + arr[upper] * weight);
    }
}

/**
 * Return the 05, 25, 50, 75, 95 percentiles of the array
 *
 */
function percentilesLineChart(arr) {
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
 * Add the absolute feature checkboxes in the feature panel
 *
 */
function addAbsoluteFeatureButtons(dataSetPercentile) {
    // iterate over the object
    for (var key in dataSetPercentile) {
        if (dataSetPercentile.hasOwnProperty(key)) {
            // generate text for the displayed button
            let capitalized_feature_string = key.split('_').join(' ');
            capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);
            // add the button
            $('#absolute-feature-checkboxes').after('<div class="feature-check-box-default"> <input type="checkbox" name="checkbox" id="draw-' + key +
                '"/><label for="draw-' + key + '">' + capitalized_feature_string +
                '<button type="button" id="draw-' + key +
                '-details" class="btn btn-default pull-right hidden draw-details" data-toggle="button" aria-pressed="false" autocomplete="off">' +
                '<span class="glyphicon glyphicon-search" aria-hidden="true"></span> </button> </label> </div>');

        }
    }
    // init the listerners
    Object(__WEBPACK_IMPORTED_MODULE_2__line_chart_js__["a" /* initTrendChartListener */])();

}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["f"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["i"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkDataButton;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["h"] = getSwarmDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNetworkData;
/* harmony export (immutable) */ __webpack_exports__["e"] = getNetworkHierarchyData;
/* harmony export (immutable) */ __webpack_exports__["g"] = getSuggestedParameters;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visual_parameter_js__ = __webpack_require__(10);
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
                // if all ajax queries are compelte initialize
                (function() {
                    function checkPendingRequest() {
                        if ($.active > 0) {
                            window.setTimeout(checkPendingRequest, 100);
                        } else {
                            Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view_js__["m" /* spatialViewInit */])();
                        }
                    }
                    window.setTimeout(checkPendingRequest, 100);
                })();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* addAbsoluteFeatureButtons */])(dataSetPercentile);
        }
    });

}

/**
 * Get the swarm features for the line chart from the api
 */
function getSwarmFeatures() {
    const swarm_features = ['swarm_time', 'swarm_speed', 'swarm_acceleration', 'swarm_convex_hull_area',
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

/**
 * Get the meadata information
 */
function getMetaData() {
    $.ajax({
        url: '/api/metadata/' + parameters['id'],
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setMetaData"])(data);
        }
    });
}

/**
 * Get the network datasets for the buttons
 */
function getNetworkDataButton() {
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

/**
 * Get the specifc feature
 * @param {String} feature - for instance speed, acceleration etc.
 */
function getDatasetFeature(feature) {
    $.ajax({
        url: '/api/dataset/' + parameters['id'] + '/' + feature,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // add the speed feature to the dataset
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setDatasetFeature"])(data, feature);
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* enablePlayButton */])();
        }
    });
}

/**
 * Get the specifc swarm feature
 * @param {String} feature - for instance centroid, medoid etc.
 */
function getSwarmDatasetFeature(feature) {
    Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* disablePlayButton */])();
    $.ajax({
        url: '/api/dataset/' + parameters['id'] + '/' + feature,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // add the speed feature to the dataset
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setSwarmData"])(data, feature);
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* enablePlayButton */])();
        }
    });
}



/**
 * Get the network for the specific network_id
 * @param {String} network_id - unique network id of a dataset.
 */
function getNetworkData(network_id) {
    $.ajax({
        url: '/api/dataset/network/' + parameters['id'] + '/' + network_id,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            if (data.length) {
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setNetworkData"])(JSON.parse(data[0]['data']));
            }
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* enablePlayButton */])();
        }
    });

}

/**
 * Get the network hierarchy for the specific network_id
 * @param {String} network_id - unique network id of a dataset.
 */
function getNetworkHierarchyData(network_id) {
    $.ajax({
        url: '/api/dataset/network/hierarchy/' + parameters['id'] + '/' + network_id,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            if (data.length) {
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setHierarchyData"])(JSON.parse(data[0]['hierarchy']), network_id);
            }
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* enablePlayButton */])();
        }
    });

}


/**
 * Visual parameter suggestion ajax query
 * @param {Array} trackedData - tracked data with .
 */
function getSuggestedParameters(trackedData) {
    $.ajax({
        url: '/api/dataset/visual_parameter/' + parameters['id'],
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            Object(__WEBPACK_IMPORTED_MODULE_4__visual_parameter_js__["c" /* responseParameters */])(data);
        },
        data: trackedData
    });

}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return metadataColor; });
/* harmony export (immutable) */ __webpack_exports__["b"] = initializeMetaddata;
/* harmony export (immutable) */ __webpack_exports__["a"] = colorMetadata;
/* harmony export (immutable) */ __webpack_exports__["d"] = resetIndividualMetadata;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/*eslint-disable no-unused-lets*/
/*global window, $, */
// import * as spv from './spatial_view.js';




let metadataColor = {}; // save the metadata coloring

/**
 * Init Metadata buttons 
 */
function initializeMetaddata() {
    let colors = ['#fff', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
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
 * Metadata reset all individual metadata input fields
 */
function resetIndividualMetadata() {
    metadataColor = {};
    $('.dropdown #preview')
        .css('background-color', 'rgb(255, 255, 255)');
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorScale; });
/* harmony export (immutable) */ __webpack_exports__["c"] = returnColorScale;
/* harmony export (immutable) */ __webpack_exports__["b"] = initColorPicker;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__legend_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explore_js__ = __webpack_require__(0);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, colorbrewer*/






let colorScale = {
    type: 'Linear',
    color: colorbrewer.BuYlBu
};

/**
 * Returns the color scale
 * @return {colorScale} active color scale is in linear or threshold
 */
function returnColorScale() {
    //if linear is choosen
    if (colorScale['type'] === 'Linear') {
        return d3.scaleLinear()
            .domain(
                __WEBPACK_IMPORTED_MODULE_2__explore_js__["dataSetPercentile"][__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["b" /* activeScale */]]
            )
            .range(colorScale['color']);
    } //Threshold color scale
    else if (colorScale['type'] === 'Threshold') {
        return d3.scaleThreshold()
            .domain(
                __WEBPACK_IMPORTED_MODULE_2__explore_js__["dataSetPercentile"][__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["b" /* activeScale */]]
            )
            .range(colorScale['color']);
    }
}

/**
 * Initialize the color picker
 * with all listeners included
 */
function initColorPicker() {
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
            $('.palette[title="' + d.key + '"]').addClass('selected');
            colorScale.color = colorbrewer[d.key];
            Object(__WEBPACK_IMPORTED_MODULE_1__legend_js__["b" /* changeLegend */])();
            if (!$('#play-button')
                .hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["f" /* draw */]();
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
    $('.palette[title="BuYlBu"]').addClass('selected');
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addSpatialViewGroup;
/* harmony export (immutable) */ __webpack_exports__["b"] = changeLegend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_js__ = __webpack_require__(6);
/*eslint-disable no-unused-lets*/
/*global window, d3, $*/





let svgLegend; // svg container for the legend

/**
 * Add the group to the svg where the legend for the color legend is
 */
function addSpatialViewGroup() {
    let legendWidth = 550;
    let legendHeight = 60;

    svgLegend = d3.select('#main-vis-legend-div')
        .append('svg')
        .attr('id', 'main-vis-legend')
        .attr('width', legendWidth)
        .attr('height', legendHeight);
}

/**
 * Change the color legend
 *
 */
function changeLegend() {
    let legend; // the color legend
    let legendText; // color legend text
    // vars for the legend
    let legendSwatchWidth = 50;
    let legendSwatchHeight = 20;
    // let differentColors = 0;

    // Show the svg first of all
    $('#main-vis-legend-div').show();

    //change the colors of the animals
    if (__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["b" /* activeScale */] !== 'black') {
        var tmpScale = Object(__WEBPACK_IMPORTED_MODULE_1__color_picker_js__["c" /* returnColorScale */])();
        // once the fill for the heads and the stroke for the path
        legend = svgLegend.selectAll('rect.legend')
            .data(tmpScale.range());

        legendText = svgLegend.selectAll('text.legend-text')
            .data(tmpScale.domain());
        // differentColors = tmpScale.range()
        // .length;
    } else {
        legend = svgLegend.selectAll('rect.legend')
            .data([]);
        legendText = svgLegend.selectAll('text.legend-text')
            .data([]);
        // hide the div again
        $('#main-vis-legend-div').hide();
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

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playBoolean; });
/* harmony export (immutable) */ __webpack_exports__["a"] = initListeners;
/* harmony export (immutable) */ __webpack_exports__["c"] = setPlayBoolean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__ = __webpack_require__(10);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, Set*/
























let brush; // brushing variable
let playBoolean = true; // pause and play boolean

/**
 * Init all the listeners
 */
function initListeners() {
    cp_listener();
    sf_listeners();
    af_listeners();
    md_listeners();
    n_listeners();
    h_listeners();
}

/**
 * Init control panel listeners
 */
function cp_listener() {

    /**
     * Play or stop the animation
     */
    $('#play-button').click(function() {
        if ($('#play-button').hasClass('active') === true) {
            playBoolean = false;
        } else {
            playBoolean = true;
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["k" /* setIndexTime */](__WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__["e" /* slider */].slider('value'));
            $('.brush').remove();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
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
        __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
    });

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
                    [__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["o" /* tankWidth */], __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["n" /* tankHeight */]]
                ])
                .on('end', __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__["a" /* brushend */]);
            //add the brush
            d3.select('#main-vis-svg')
                .append('g')
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveAnimals */]([]);
            // tracking of data for visual parameter suggestion
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["b" /* resetTrackedData */])();
            $('#visual-parameter-button').prop('disabled', true).removeClass('active');

            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes

                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
            }
        }
    });

    /**
     * Track visual parameter button
     */
    $('#visual-parameter-button').click(function() {
        if ($('#visual-parameter-button').hasClass('active') === true) {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["e" /* setTrackingBoolean */])(false);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["e" /* setTrackingBoolean */])(true);
        }
    });

    /**
     * Send the tracked via a ajax query to the server to calculate the parameters
     */
    $('#calculate-parameter-button').click(function() {
        if (!$('#calculate-parameter-button').hasClass('active')) {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["e" /* setTrackingBoolean */])(false);
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["d" /* sendTrackedData */])();

            // disable both buttons and remove the active one
            $('#calculate-parameter-button').prop('disabled', true);
            $('#calculate-parameter-button').removeClass('active');
            $('#visual-parameter-button').removeClass('active');
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
            $('#main-vis .frame-text').show();
        } else {
            $('#main-vis .frame-text').hide();
        }
    });

    /**
     * Color Scale Function Radio buttons
     */
    $('#color-scale-radio-form input').on('change', function() {
        __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__["a" /* colorScale */]['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });
}

/**
 * Init swarm features listeners
 */
function sf_listeners() {

    /**
     * Draw direction arrow of the animal
     */
    $('#draw-direction').click(function() {
        if ($('#draw-direction').is(':checked')) {
            if (!('direction' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
                // ajax query to get direction data
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('direction');
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });

    /**
     * Draw medoid in color button
     */
    $('#draw-medoid').click(function() {
        if ($('#draw-medoid').is(':checked')) {

            if (!('medoid' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["h" /* getSwarmDatasetFeature */])('medoid');

            }
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["l" /* setMedoidAnimal */](__WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["g" /* indexTime */]]['medoid']);
            // display the medoid
            d3.selectAll('#animal-' + __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["h" /* medoidAnimal */])
                .classed('medoid', true);
        } else {
            // do not display the medoid fish
            d3.selectAll('#animal-' + __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["h" /* medoidAnimal */])
                .classed('medoid', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["l" /* setMedoidAnimal */](-1);
        }
    });

    /**
     * Draw centroid button
     */
    $('#draw-centroid').click(function() {
        if ($('#draw-centroid').is(':checked')) {
            if (!('centroid' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["h" /* getSwarmDatasetFeature */])('centroid');

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
            if (!('hull' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["h" /* getSwarmDatasetFeature */])('convex_hull');

            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-triangulation').click(function() {
        if ($('#draw-triangulation').is(':checked')) {
            if (!('triangulation' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["h" /* getSwarmDatasetFeature */])('triangulation');

            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
            }
        }
    });


    /**
     * Draw voronoi
     */
    $('#draw-voronoi').click(function() {
        if ($('#draw-voronoi').is(':checked')) {
            if (!('voronoi' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["h" /* getSwarmDatasetFeature */])('voronoi');

            }
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
            }
        }
    });


}

/**
 * Init absolute feature listeners
 */
function af_listeners() {

    /**
     * Draw Speed button
     */
    $('#draw-speed').click(function() {
        if ($('#draw-speed').is(':checked')) {
            // load absolute feature speed data once
            if (!('speed' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
                // ajax query to get the absolute feature speed
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('speed');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-speed-details').removeClass('hidden');
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('speed');
        } else {
            $('#draw-speed-details').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });

    /**
     * Draw acceleration button
     */
    $('#draw-acceleration').click(function() {
        if ($('#draw-acceleration').is(':checked')) {
            // load absolute feature acceleration data once
            if (!('acceleration' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
                // ajax query to get the absolute feature acceleration
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('acceleration');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-acceleration-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('acceleration');
        } else {
            $('#draw-acceleration-details').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });

    /**
     * Draw distance to centroid button
     */
    $('#draw-distance_centroid').click(function() {
        if ($('#draw-distance_centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
                // ajax query to get the absolute feature distance_centroid
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('distance_centroid');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-distance_centroid-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('distance_centroid');
        } else {
            $('#draw-distance_centroid-details').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });

    /**
     * Draw midline offset
     */
    $('#draw-midline_offset').click(function() {
        if ($('#draw-midline_offset').is(':checked')) {
            // load absolute feature draw-midline_offset data once
            if (!('draw-midline_offset' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
                // ajax query to get the absolute feature midline_offset
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('midline_offset');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-midline_offset-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('midline_offset');
        } else {
            $('#draw-midline_offset-details').addClass('hidden');
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
        }
    });

}

/**
 * Init network listeeners
 */
function n_listeners() {
    /**
     * Network buttons clicked - get the data
     */
    $('#networks-modal-body button').click(function() {
        let network_id = $(this).attr('data');

        // add the name of the choosen network to the Network modal
        $('#active-network-name').text($(this).attr('name'));

        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
        Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["c" /* getNetworkData */])(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});

        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["f" /* setNetworkAuto */])(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["f" /* setNetworkAuto */])(false);
            let limit = $('#network-slider').slider('value');
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["e" /* setNetworLimit */])(limit);
            $('#network-limit').val(limit);
        }
    });

}

/**
 * Init metadata listeners
 */
function md_listeners() {
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
            if (__WEBPACK_IMPORTED_MODULE_4__metadata_js__["c" /* metadataColor */][id]) {
                delete __WEBPACK_IMPORTED_MODULE_4__metadata_js__["c" /* metadataColor */][id];
            }
        } else {
            __WEBPACK_IMPORTED_MODULE_4__metadata_js__["c" /* metadataColor */][id] = colorRGB;
        }
    });

    /**
     * Metadata group metadata functions for instance color sex
     */
    $('#group-metadata :input').change(function() {
        // reset the metadat acoloring
        Object(__WEBPACK_IMPORTED_MODULE_4__metadata_js__["d" /* resetIndividualMetadata */])();

        let value = $(this).attr('value');
        let tmp = [];

        // metadata sex is choosen - coloring based on m and f
        if (value === 'sex') {
            $('#metadata-div').modal('toggle');
            // close and color here
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"].length; i++) {
                tmp.push(__WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"][i][value].toLowerCase());
            }
            // create a set of individual strings in sex
            tmp = Array.from(new Set(tmp));
            let colors = ['#7fc97f', '#386cb0'];

            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"].length; i++) {
                for (let j = 0; j < tmp.length; j++) {
                    if (__WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"][i][value].toLowerCase() === tmp[j]) {
                        // add the coloring to the metadatacolor object
                        __WEBPACK_IMPORTED_MODULE_4__metadata_js__["c" /* metadataColor */][__WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"][i]['animal_id']] = colors[j];
                    }
                }
            }
            $('#metadata-input').addClass('hidden');
        } else {
            $('#metadata-input').removeClass('hidden');
            // set values of inputs
            // here are automatically input values calculated
            // .25 and .75 percentiles are used
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"].length; i++) {
                tmp.push(__WEBPACK_IMPORTED_MODULE_6__explore_js__["datasetMetadata"][i][value]);
            }
            let blAvg = d3.quantile(tmp, 0.25); // below average value
            let abAvg = d3.quantile(tmp, 0.75); // above average
            $('#bl-avg').val(blAvg);
            $('#ab-avg').val(abAvg);
            // color the animals
            Object(__WEBPACK_IMPORTED_MODULE_4__metadata_js__["a" /* colorMetadata */])();
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
        Object(__WEBPACK_IMPORTED_MODULE_4__metadata_js__["a" /* colorMetadata */])();
    });

    /**
     * Metadata input fields change
     */
    $('.number-spinner input').on('input', function() {
        Object(__WEBPACK_IMPORTED_MODULE_4__metadata_js__["a" /* colorMetadata */])();
    });


    /**
     * Reset all metadata input parameters
     */
    $('#metadata-reset').click(function() {
        $('#metadata-input').addClass('hidden');
        Object(__WEBPACK_IMPORTED_MODULE_4__metadata_js__["d" /* resetIndividualMetadata */])();
    });

}
/**
 * Initialize hierarchy/dendgrogram listeners
 */
function h_listeners() {
    /**
     * Show dendgrogram sliding button
     */
    function initShowDendrogramListener(id) {

        $('#show-dendrogram-' + id).click(function() {
            let clickedButtonID = $(this).attr('id');
            // iterate over all buttons and custom highlight just one or none
            $('.show-dendrogram').each(function(i, button) {
                // active found button
                if ($(button).attr('id') === clickedButtonID && $(button).hasClass('btn-primary') === false) {
                    $(button).addClass('btn-primary');
                    $(button).find('#btn-left').addClass('hidden');
                    $(button).find('#btn-right').removeClass('hidden');
                    // TODO add here a resize of the main vis
                    // $('#dendrogram-panel').insertAfter($(this));
                } // remove highlight
                else {
                    $(button).removeClass('btn-primary');
                    $(button).find('#btn-left').removeClass('hidden');
                    $(button).find('#btn-right').addClass('hidden');
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
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["c" /* drawDendrogram */])();
            }
        });
    }

    /**
     * Hierarchy button in network modal on change
     * Load data or remove it
     */
    $('.hiearchy-checkbox').on('change', function() {
        let checkbox = $(this).find('input:hidden');

        let id = checkbox.attr('data');
        let name = checkbox.attr('name');
        let checked = checkbox.prop('checked');


        if (checked && $('.show-dendrogram').length < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["e" /* maxNumberHierarchies */]) {
            Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* disablePlayButton */])();
            Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["e" /* getNetworkHierarchyData */])(id);

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["a" /* addHierarchyButton */])(id, name);
            initShowDendrogramListener(id);
            $('#dendrogram-buttons-div').removeClass('hidden');
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
            Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setHierarchyData"])({}, id);

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["g" /* removeHierarchyButton */])(id);
            // TODO find better way here
            d3.select('g.h' + id).remove();
            // remove the dendrogram and the panel if the removed element was checked
            if (tmpActive === true) {
                $('#dendrogram-panel').hide();
            }
            if ($('.show-dendrogram').length === 0) {
                $('#dendrogram-buttons-div').addClass('hidden');
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
    $('.network-hierarchy-checkbox').on('change', function() {
        // get the info for the clicked button
        let checkbox = $(this).find('input:hidden');
        let id = checkbox.attr('data');
        let checked = checkbox.prop('checked');

        // reset all the other active checkboxes
        $('.network-hierarchy-checkbox').each(function(i, button) {
            if ($(this).find('input:hidden').prop('checked') && $(this).find('input:hidden').prop('data') !== id) {
                $(button).trigger('click');
            }
        });
        if (checked) {
            // set the network id
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["g" /* setNetworkHierarchy */])(id);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["g" /* setNetworkHierarchy */])(undefined);
        }
    });

    /**
     * Hierarchy set theory buttons - union, intersection, symmetric difference
     */
    $('.set-button').click(function() {
        let data = $(this).find('input').attr('data');
        Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["l" /* setSetOperation */])(data);

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["c" /* drawDendrogram */])();
        }
    });
    // = ;

}
/************************************************
    Getter and setter
 *************************************************/

/**
 * Set play boolean
 * @param {Boolean} value - pause (false) or play (true)
 */
function setPlayBoolean(value) {
    if (typeof value === 'boolean') {
        playBoolean = value;
    } else {
        playBoolean = false;
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return networkHierarchyIds; });
/* harmony export (immutable) */ __webpack_exports__["d"] = initDendrogram;
/* harmony export (immutable) */ __webpack_exports__["c"] = drawDendrogram;
/* harmony export (immutable) */ __webpack_exports__["k"] = setHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["i"] = removeHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["j"] = setHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["h"] = removeHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["a"] = addHierarchyButton;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeHierarchyButton;
/* unused harmony export updateDendrogram */
/* harmony export (immutable) */ __webpack_exports__["b"] = changeHierarchyLegend;
/* harmony export (immutable) */ __webpack_exports__["l"] = setSetOperation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_js__ = __webpack_require__(2);
/*eslint-disable no-unused-lets*/
/*global window,$, d3, PolyBool*/
// import * as spv from './spatial_view.js';







let zoomGroup; // zoom group for the specific dendrogram
let treemap;
let tooltipDiv;
let spatialView; // get the spatial view svg from the main vis
let svgLegend;

const maxNumberHierarchies = 4;
/* harmony export (immutable) */ __webpack_exports__["e"] = maxNumberHierarchies;

let networkHierarchyIds = [];

let hierarchyLevels = {};
let hierarchyColors = {};

let setOperation = 'union';

// TODO add more colors
let colors = ['#7fc97f', '#e7298a', '#ff9900', '#386cb0'];

let id; // needed for the collapse function

/**
 * Initialize the dendrogram
 */
function initDendrogram() {
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
                    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["e" /* decIndexTime */])();
                    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["f" /* draw */])();
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

}

/**
 * Draw the dendgrogram for one step
 * Further calls the drawHierarchy function
 */
function drawDendrogram() {
    // get the active dendrogram
    id = $('.show-dendrogram.btn-primary').attr('data');
    // if data is avaiable draw hierarchy clusters and a button is active selcted
    if (!$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]) && id) {

        // get the data and transform it
        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]['h' + id][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["g" /* indexTime */]];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });
        // skip the root node
        nodes = nodes.children[0];
        // collapse the tree
        nodes.children.forEach(collapse);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

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
                // TODO find a nice function for the on click method
                .on('click', click)
                .on('mouseover', function(d) {
                    // tooltip position and text
                    tooltipDiv
                        .style('left', (d3.event.pageX + 5) + 'px')
                        .style('top', (d3.event.pageY + 5) + 'px')
                        .style('opacity', 1);
                    tooltipDiv.select('.tooltip-span').html(d['data']['name'].toString());
                    // highlight in the spatial view
                    //TODO make this work again
                    // console.log('#hp' + d['data']['name'].join(''));
                    // spatialView.select('#hp' + d['data']['name'].join(''))
                    // .classed('highlight-hierarchy', true);
                    // highlight each animal in the cluster in the spatial view
                    for (let i = 0; i < d['data']['name'].length; i++) {
                        spatialView.select('#animal-' + d['data']['name'][i])
                            .style('fill', '#c51b7d');
                    }
                })
                .on('mouseout', function(d) {
                    tooltipDiv.transition()
                        .duration(500)
                        .style('opacity', 0);
                    // remove highlight in the spatial view
                    // TODO make this work again
                    // spatialView.select('#hp' + d['data']['name'].join(''))
                    // .classed('highlight-hierarchy', false);
                    // remove highlight each animal in the cluster in the spatial view
                    for (let i = 0; i < d['data']['name'].length; i++) {
                        spatialView.select('#animal-' + d['data']['name'][i])
                            .style('fill', '#000');
                    }
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
                        return 'active-level';
                    } else {
                        return '';
                    }
                });

            // EXIT
            node.exit()
                .remove();
        }
    }
    if (!$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"])) {
        // draw the hierarchy in spatial view
        drawHierarchy();
    }
}

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
function drawHierarchy() {
    // id of the hierarchy e.g. [1,5,3]
    let hierarchyIds = Object.keys(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]).map(function(x) {
        return x.replace('h', '');
    });
    //  The clustering in an 2D array with which animal id belongs to which group
    let hierarchyVertices = [];

    // iterate over the hierarchy data to get the hierarchy animal ids per clustering and grouping
    for (let i = 0; i < hierarchyIds.length; i++) {
        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]['h' + hierarchyIds[i]][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["g" /* indexTime */]];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        nodes = treemap(nodes);
        let root = nodes['children'][0];
        if (__WEBPACK_IMPORTED_MODULE_2__network_js__["h" /* showNetworkHierarchy */] === hierarchyIds[i]) {
            networkHierarchyIds = getHierarchyLevel(root, hierarchyIds[i]);
        }
        // add the vertices into the array
        hierarchyVertices.push(getHierarchyVertices(getHierarchyLevel(root, hierarchyIds[i])));
    }

    // if more than 2 hierarchies are drawn
    if (hierarchyVertices.length > 0) {
        // union the list of polygons to one polygon
        for (let i = 0; i < hierarchyIds.length; i++) {
            hierarchyVertices[i] = unionPolygons(hierarchyVertices[i]);
        }

        // transform and calculate the intersection polygons of the n hierarchies
        if (setOperation === 'intersection') {
            // temp solution of two intersections
            let tmpIntersection = hierarchyVertices[0];
            // iterate over the hierarchies and intersect all of them
            for (let i = 1; i < hierarchyVertices.length; i++) {
                // intersection
                tmpIntersection = PolyBool.intersect({
                    regions: tmpIntersection, // list of regions
                    inverted: false // is this polygon inverted?
                }, {
                    regions: hierarchyVertices[i],
                    inverted: false
                });
                // convert it again
                tmpIntersection = tmpIntersection['regions'];
            }

            // result
            hierarchyVertices = [tmpIntersection];
        }
        // transform and calculate the symmetric difference polygons of the n hierarchies
        else if (setOperation === 'sym-difference') {
            // xor = Union of all hierarchies - intersection of all hierarchies
            // temp solution of two intersections
            let tmpIntersection = hierarchyVertices[0];
            // iterate over the hierarchies and intersect all of them
            for (let i = 1; i < hierarchyVertices.length; i++) {
                // intersection
                tmpIntersection = PolyBool.intersect({
                    regions: tmpIntersection, // list of regions
                    inverted: false // is this polygon inverted?
                }, {
                    regions: hierarchyVertices[i],
                    inverted: false
                });
                // convert it again
                tmpIntersection = tmpIntersection['regions'];
            }
            // intersection result
            let intersectionHierarchyPolygons = tmpIntersection;

            // union
            let tmpUnion = hierarchyVertices[0];
            // iterate over the hierarchies and intersect all of them
            for (let i = 1; i < hierarchyVertices.length; i++) {
                // intersection
                tmpUnion = PolyBool.union({
                    regions: tmpUnion, // list of regions
                    inverted: false // is this polygon inverted?
                }, {
                    regions: hierarchyVertices[i],
                    inverted: false
                });
                // convert it again
                tmpUnion = tmpUnion['regions'];
            }
            let unionHierarchyPolygons = tmpUnion;


            // symmetric difference
            let tmpDifference = PolyBool.xor({
                regions: unionHierarchyPolygons, // list of regions
                inverted: false // is this polygon inverted?
            }, {
                regions: intersectionHierarchyPolygons,
                inverted: false
            });
            // convert it again
            tmpDifference = tmpDifference['regions'];
            // result
            hierarchyVertices = [tmpDifference];
        }
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
        });

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
function unionPolygons(polygons) {
    // console.log(polygons);
    for (let i = 0; i < polygons.length; i++) {
        polygons[i] = {
            regions: [polygons[i]],
            inverted: false // is this polygon inverted?
        };
    }
    // union a list of polygons together
    let segments = PolyBool.segments(polygons[0]);
    for (let i = 1; i < polygons.length; i++) {
        let seg2 = PolyBool.segments(polygons[i]);
        let comb = PolyBool.combine(segments, seg2);
        segments = PolyBool.selectUnion(comb);
    }
    return PolyBool.polygon(segments)['regions'];
}

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
    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["i" /* setActiveAnimals */])(d['data']['name']);
    // if no animation is active draw the draw one step
    if (!$('#play-button').hasClass('active')) {
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["e" /* decIndexTime */])();
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["f" /* draw */])();
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
            let groupMember = __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["d" /* arrayAnimals */].find(d => d['a'] === cluster[j]);
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
function setHierarchyLevel(hierarchy, level) {
    // TODO catch cases < 0 and bigger than overall height
    hierarchyLevels['h' + hierarchy] = level;
}

/**
 * Remove the entry for the hierarch level
 * @param {number} hierarchy - Hierarchy
 */
function removeHierarchyLevel(hierarchy) {
    // TODO catch cases < 0 and bigger than overall height
    delete hierarchyLevels['h' + hierarchy];
}

/**
 * Set the active color for a specific dendrogram
 * @param {number} hierarchy - Hierarchy can be from [0-3]
 */
function setHierarchyColor(hierarchy) {
    for (let i = 0; i < colors.length; i++) {
        let tmp_boolean = true;
        for (var key in hierarchyColors) {
            if (hierarchyColors.hasOwnProperty(key)) {
                if (hierarchyColors[key] === colors[i]) {
                    tmp_boolean = false;
                }
            }
        }
        if (tmp_boolean) {
            hierarchyColors['h' + hierarchy] = colors[i];
        }
    }
}

/**
 * Remove the color for the hierarch level
 * @param {number} hierarchy - Hierarchy
 */
function removeHierarchyColor(hierarchy) {
    delete hierarchyColors['h' + hierarchy];
}

/**
 * Add the hierarchy button to the div
 * @param {number} id - Hierarchy of the id
 * @param {String} name - New active level
 */
function addHierarchyButton(id, name) {
    if ($('.show-dendrogram').length < maxNumberHierarchies) {
        $('#dendrogram-buttons-div').append('<button type="button" id="show-dendrogram-' + id + '" data=' + id + ' name=' + name +
            ' class="show-dendrogram btn btn-block" data-toggle="button" aria-pressed="false" autocomplete="off">' +
            ' <span class="btn-label" id="btn-left"> <i class="glyphicon glyphicon-chevron-left"></i>&nbsp&nbsp Show ' + name + '</span>' +
            '<span class="btn-label hidden" id="btn-right"> <i class="glyphicon glyphicon-chevron-right"></i>&nbsp&nbsp Hide ' + name + ' </span></button> <br>'
        );
    }
}

/**
 * Remove a specific hierarchy button to the div
 * @param {number} id - Hierarchy of the id
 */
function removeHierarchyButton(id) {
    // remove the following line break and element
    $('#show-dendrogram-' + id).next().remove();
    $('#show-dendrogram-' + id).remove();
}

/**
 * Update slider and text in the dendrogram panel
 */
function updateDendrogram() {
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
function changeHierarchyLegend() {
    let legend; // the color legend
    let legendText; // color legend text
    // vars for the legend
    let legendSwatchWidth = 50;
    let legendSwatchHeight = 20;

    // Show or hide the svg element
    if (Object.keys(hierarchyColors).length !== 0) {
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
 * Set the set operation
 * @param {string} operation - e.g. "union" "intersection" "sym-difference"
 */
function setSetOperation(value) {
    setOperation = value;
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return trackingBoolean; });
/* harmony export (immutable) */ __webpack_exports__["e"] = setTrackingBoolean;
/* harmony export (immutable) */ __webpack_exports__["b"] = resetTrackedData;
/* harmony export (immutable) */ __webpack_exports__["a"] = addTrackedData;
/* harmony export (immutable) */ __webpack_exports__["d"] = sendTrackedData;
/* harmony export (immutable) */ __webpack_exports__["c"] = responseParameters;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(8);
/*eslint-disable no-unused-lets*/
/*global window, $, parameters */






let trackingBoolean = false; // boolean for active tracking
let trackedData = [];


/**
 * Set the boolean value if tracking should be activated
 * @param {Boolean} value - Boolean for active value
 */
function setTrackingBoolean(value) {
    trackingBoolean = value;
}

/**
 * Resets the tracked data
 */
function resetTrackedData() {
    trackedData = [];
    trackingBoolean = false;
    // disable the send button
    $('#calculate-parameter-button').prop('disabled', true);
}

/**
 * Add data to trackedData
 * @param {Numeric} time - time of the frame
 * @param {Array} data - Array of animals ids for the specific frame
 */
function addTrackedData(time, ids) {
    trackedData.push({
        [time]: JSON.stringify(ids)
    });
    // enable the calculation button
    if ($('#calculate-parameter-button').is(':disabled') && $('#calculate-parameter-button').attr('data') == 0) {
        $('#calculate-parameter-button').prop('disabled', false);
    }
}


/**
 * Send data with a ajax query to the server and wait for the answer
 */
function sendTrackedData() {
    disableCalculationButton();
    Object(__WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["g" /* getSuggestedParameters */])(JSON.stringify(trackedData));
    resetTrackedData();
}

/**
 * Response of the ajax query - open new tab with values to create network
 */
function responseParameters(data) {
    Object(__WEBPACK_IMPORTED_MODULE_1__listener_js__["c" /* setPlayBoolean */])(false);
    // open network create url
    let url = '../../network/new?dataset_id=' + parameters['id'] + '&' + $.param(data['data']['max_params']);
    // create new tab with the result parameter
    window.open(url, '_blank');
    enableCalculationButton();
}


/**
 * Disable the calculation button -> loading symbol
 */
function disableCalculationButton() {
    $('#calculate-parameter-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
    $('#calculate-parameter-button').prop('disabled', true);
    $('#calculate-parameter-button').attr('data', 1);

}

/**
 * Enable the calculation button remove loading symbol
 */
function enableCalculationButton() {
    $('#calculate-parameter-button').html('<span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>Calculate');
    $('#calculate-parameter-button').attr('data', 0);

}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export zoomFunction */
/* unused harmony export lineChartRatio */
/* harmony export (immutable) */ __webpack_exports__["b"] = lineChart;
/* harmony export (immutable) */ __webpack_exports__["a"] = initTrendChartListener;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateLineChart;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/









let zoomFunction;
let lineChartRatio = 0;

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
function lineChart() {

    zoomFunction = d3.scaleLinear()
        .domain([0, __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length])
        .range([0, lineChartWidth]);

    lineChartRatio = Math.ceil(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length / lineChartWidth);

    // Swarm features line chart
    let lineChartHeight = 500; // the line chart height
    let margin = {
        top: 10,
        right: 0,
        bottom: 100,
        left: 10
    };
    let marginToLegend = 50;

    let swarm_features = Object.keys(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][0]);
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
    if (__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length > lineChartWidth) {
        ratio = Math.ceil(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length / lineChartWidth);
        // tmp array for the aggregated and averaged features
        let tmp = new Array(swarm_features.length).fill(0);

        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length; i++) {
            // aggregate the features in the temp array
            for (let j = 0; j < swarm_features.length; j++) {
                tmp[j] += __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][i][swarm_features[j]];
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
        lineChartData = __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"];
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
        Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["k" /* setIndexTime */])(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
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
function initTrendChartListener() {
    $('.draw-details').click(function() {
        if (!$(this).hasClass('active')) {
            disableLineChart();
            addTrendChart(this);
        } else {
            removeTrendChart();
            enableLineChart();
        }
    });
}

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
    } else if (elem['id'].toLowerCase().includes('distance_centroid')) {
        feature = 'distance_centroid';
    } else if (elem['id'].toLowerCase().includes('midline_offset')) {
        feature = 'midline_offset';
    } else {
        return;
    }
    // data is not loaded fully -- return
    if (!__WEBPACK_IMPORTED_MODULE_1__explore_js__["dataset"][0][feature]) {
        return;
    }
    // change to the trend chart legend
    $('#lineChartLegend').hide();
    $('#trendChartLegend').show();
    // check if already computed and only hidden
    if (!$(('#' + feature + 'TrendChart')).length) {
        // get the data for the trend chart
        let trendChartData = [];
        let num_animals = __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["c" /* animal_ids */].length;
        // calculate the percetiles for every time step
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length; i++) {
            let tmp = [];
            for (let j = 0; j < num_animals; j++) {
                if (__WEBPACK_IMPORTED_MODULE_1__explore_js__["dataset"][i * num_animals + j]) {
                    tmp.push(__WEBPACK_IMPORTED_MODULE_1__explore_js__["dataset"][i * num_animals + j][feature]);
                }
            }
            trendChartData.push(Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["e" /* percentilesLineChart */])(tmp));
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
function updateLineChart() {
    if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["g" /* indexTime */] / lineChartRatio)]) {
        let tmp = Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["g" /* indexTime */] / lineChartRatio);
        //update the line chart legend text values per second
        if (__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["g" /* indexTime */] % 25 === 0) {
            // TODO change this to a more modular way
            d3.select('#convex_hull_areaLineValue')
                .text((__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['convex_hull_area']) + 'mm²');
            d3.select('#speedLineValue')
                .text(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['speed'] + 'mm/s');
            d3.select('#accelerationLineValue')
                .text(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['acceleration'] + 'mm/s²');
            d3.select('#distance_centroidLineValue')
                .text(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['distance_centroid'] + 'mm');
            d3.select('#directionLineValue')
                .text(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['direction'] + '°');
            d3.select('#polarisationLineValue')
                .text(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][tmp]['polarisation']);
        }
        d3.select('#lineChartTimeLine')
            .attr('transform', 'translate(' + zoomFunction(tmp) + ',0)');
    }
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return slider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return tooltip; });
/* harmony export (immutable) */ __webpack_exports__["a"] = brushend;
/* harmony export (immutable) */ __webpack_exports__["c"] = initTooltip;
/* harmony export (immutable) */ __webpack_exports__["g"] = tooltipFunction;
/* harmony export (immutable) */ __webpack_exports__["b"] = initSliders;
/* harmony export (immutable) */ __webpack_exports__["d"] = setTimeSlider;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_js__ = __webpack_require__(2);
/*eslint-disable no-unused-lets*/
/*global window, d3, $*/






let slider; // time slider of the app
let tooltip; // tooltip function

/**
 * Brush end function
 * add active animals to the array or remove them
 */
function brushend() {
    let arrayAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["d" /* arrayAnimals */];
    let activeAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["a" /* activeAnimals */];
    var rect = d3.event.selection;
    //iterate over the 151 fish to check which are in the brush
    for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["c" /* animal_ids */].length; i++) {
        var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
        //check which fish are in  the brushed area
        if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
            (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
            // Point is in the brush
            activeAnimals.push(arrayAnimals[i]['a']);
        }
    }
    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["i" /* setActiveAnimals */](activeAnimals);
    if (!$('#play-button')
        .hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["e" /* decIndexTime */]();
        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["f" /* draw */]();
    }
    $('#brushing-button')
        .removeClass('active');
    // remove the brush
    $('.brush')
        .remove();
}

/**
 * Initialize the tooltip
 */
function initTooltip() {
    tooltip = d3.select('div.tooltip')
        .style('left', 0 + 'px')
        .style('top', 0 + 'px')
        .on('mouseover', function() {
            tooltip
                .style('opacity', 1);
        });
}

/**
 * Tooltip function
 * @param {Object} d - d3 data object with the metadata information
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
            // TODO make this modular
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
 * Initialize the time slider and the dynamic network slider
 */
function initSliders() {
    // time slider
    slider = $('#slider')
        .slider({
            min: 0,
            max: __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"].length,
            step: 25,
            slide: function(event, ui) {
                __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["k" /* setIndexTime */](ui.value);
                // if paused apply changes
                if (!$('#play-button').hasClass('active')) {
                    //this applys the changes
                    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["f" /* draw */]();
                }
            }
        });
    // initialize the Network slider
    $('#network-slider')
        .slider({
            range: 'max',
            min: 0,
            max: 1,
            step: 0.01,
            value: 0.5,
            slide: function(event, ui) {
                __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* setNetworLimit */](ui.value);
                $('#network-limit').val(ui.value);
            }
        });
    // set text for the first initialization 
    $('#network-limit').val(0.5);

    // get the max from the slider this is needed to calculate the ticks
    let max = slider.slider('option', 'max');
    let space = 100 / max;
    //append the minute ticks
    for (let i = 0; i < max; i = i + 1500) {
        $('<span class="ui-slider-tick"></span>')
            .css('left', (space * i) + '%')
            .appendTo(slider);
    }
}

/************************************************
    Setter
 *************************************************/

/**
 * Set the time slider to a new value
 * @param {Number} value - new value for the time slider
 */
function setTimeSlider(value) {
    slider.slider('value', value);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(16)(content, options);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.line-chart-check-box.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n.custom-checkbox {\r\n    min-height: 1rem;\r\n    padding-left: 0;\r\n    margin-right: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator {\r\n    content: \"\";\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 30px;\r\n    height: 10px;\r\n    background-color: #818181;\r\n    border-radius: 15px;\r\n    margin-right: 10px;\r\n    -webkit-transition: background .3s ease;\r\n    transition: background .3s ease;\r\n    vertical-align: middle;\r\n    margin: 0 16px;\r\n    box-shadow: none;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    display: inline-block;\r\n    width: 18px;\r\n    height: 18px;\r\n    background-color: #f1f1f1;\r\n    border-radius: 21px;\r\n    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);\r\n    left: -2px;\r\n    top: -4px;\r\n    -webkit-transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n    transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator {\r\n    background-color: #84c7c1;\r\n    background-image: none;\r\n    box-shadow: none !important;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator:after {\r\n    background-color: #84c7c1;\r\n    left: 15px;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:focus~.custom-control-indicator {\r\n    box-shadow: none !important;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n.intersection {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.sym-difference {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}", ""]);

// exports


/***/ }),
/* 15 */
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
/* 16 */
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

var	fixUrls = __webpack_require__(17);

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
/* 17 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjVmYTNhZTEzYWY3ZGQ3ZGEyOWMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcz9kZTRjIiwid2VicGFjazovLy8uL2V4cGxvcmUvZXhwbG9yZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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O0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFx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RztBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxtQkFBbUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5RUFBNEI7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRCxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQUE7QUFDQTs7QUFFQTs7QUFJQzs7QUFLQTs7QUFJQTs7QUFNQTs7O0FBT0E7O0FBUUE7O0FBT0E7O0FBSUE7O0FBUUE7O0FBTUE7O0FBRUQsVUFBVTtBQUNWLHVCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFL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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsU0FB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QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY1ZmEzYWUxM2FmN2RkN2RhMjljIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRIaWVyYXJjaHlMZXZlbCxcclxuICAgIHJlbW92ZUhpZXJhcmNoeUxldmVsLFxyXG4gICAgc2V0SGllcmFyY2h5Q29sb3IsXHJcbiAgICByZW1vdmVIaWVyYXJjaHlDb2xvcixcclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZFxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcbi8vIGltcG9ydCBjc3NcclxuaW1wb3J0ICcuL2V4cGxvcmUuY3NzJztcclxuXHJcbmV4cG9ydCBsZXQgZGF0YXNldCA9IFtdOyAvLyBtYWluIGRhdGFzZXQgd2l0aCB2YWx1ZXMgZm9yIGVhY2ggaW5kaXZpZHVhbCBhbmltYWxcclxuZXhwb3J0IGxldCBkYXRhc2V0TWV0YWRhdGEgPSBbXTsgLy8gbWV0YWRhdGFzZXQgZm9yIGVhY2ggaW5kaXZpZHVhbCBmaXNoXHJcbmV4cG9ydCBsZXQgc3dhcm1EYXRhID0gW107IC8vIHN3YXJtZGF0YSBmb3IgbGluZWNoYXJ0IGFuZCBhbHNvIG90aGVyIHN3YXJtIGZlYXR1cmVzXHJcbmV4cG9ydCBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSB7fTsgLy8gcGVjZW50aWxlcyBuZWVkZWQgZm9yIHRoZSBjb2xvciBtYXBwaW5nXHJcbmV4cG9ydCBsZXQgbmV0d29ya0RhdGEgPSB7fTsgLy8gbmV0d29yayBkYXRhXHJcbmV4cG9ydCBsZXQgbmV0d29ya0hpZXJhcmNoeSA9IHt9OyAvLyBuZXR3b3JrIGhpZXJhcmNoeSBkYXRhXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGJhc2ljIGRhdGEgdG8gZ2V0IHRoZSB0b29sIHJ1bm5pbmcuXHJcbiAqIGFmdGVyIHRoZSBwZW5kaW5nIGFqYXggcXVlcmllcyBhcmUgZmluaXNoZWRcclxuICogdGhlIHRvb2wgaXMgZHJhd25cclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhQnV0dG9uKCk7XHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENvbmNhY3QgdG8gdGhlIG1haW4gZGF0YXNldFxyXG4gKiB0aGUgaWRlYSBpcyB0byB1c2UgdGhpcyBvbmUgZGF5IGZvciBsYXp5IGxvYWRpbmdcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBtb3ZlbWVudCBkYXRhc2V0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0YXNldCh2YWx1ZSkge1xyXG4gICAgZGF0YXNldCA9IGRhdGFzZXQuY29uY2F0KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IHBlcmNlbnRpbGVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBhcnJhcnlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVNldFBlcmNlbnRpbGUodmFsdWUpIHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWV0YURhdGEodmFsdWUpIHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSA9IHZhbHVlO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGEoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgc3dhcm0gZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCxmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBhZGQgdGhlIHRoZSBvYmplY3QgdG8gdGhlIGFycmF5IGlmIHRoZXJlIGlzIG5vIGVsZW1lbnQgeWV0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2FybURhdGFbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YS5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGludGVnZXIgb3IgZmxvYXRcclxuICAgICAgICBpZiAoZGF0YVtpXSAmJiAhKGlzTmFOKGRhdGFbaV0pKSkge1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpcyBzdHJpbmdcclxuICAgICAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gZGF0YVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBmZWF0dXJlcyB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLCBmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGFzZXRbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGRhdGFzZXQucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBhcnNlIHRoZSBpbnRcclxuICAgICAgICBkYXRhc2V0W2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSB0aGUgY2FsY3VsYXRlZCBhZGphY2VuY3kgbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0RhdGEodmFsdWUpIHtcclxuICAgIG5ldHdvcmtEYXRhID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgaGllYXJoY3kgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBoaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlEYXRhKHZhbHVlLCBuZXR3b3JrX2lkKSB7XHJcbiAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyBlbXB0eSByZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgbmV0d3Jva0hpZXJhcmNoeSBvYmplY3RcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuICAgICAgICBkZWxldGUgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlMZXZlbChuZXR3b3JrX2lkKTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlDb2xvcihuZXR3b3JrX2lkKTtcclxuICAgIH0gLy8gYWRkIGl0IHRvIHRoZSBuZXR3b3JrIGhpZXJhcmNoeVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXSA9IHZhbHVlO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUxldmVsKG5ldHdvcmtfaWQsIDIpO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUNvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgfSAvLyB0b28gbWFueSBlbGVtZW50cyBjYW50IGJlIGFkZGVkXHJcblxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLGQzLCBwYXJhbWV0ZXJzLCBTZXQgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldCxcclxuICAgIG5ldHdvcmtEYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbmV0d29ya0NvbG9yU2NhbGUsXHJcbiAgICBuZXR3b3JrQXV0byxcclxuICAgIHNldE5ldHdvckxpbWl0LFxyXG4gICAgbmV0d29ya0xpbWl0LFxyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICB1cGRhdGVMaW5lQ2hhcnRcclxufSBmcm9tICcuLi9saW5lX2NoYXJ0JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc1xyXG59IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFRpbWVTbGlkZXIsXHJcbiAgICBpbml0VG9vbHRpcCxcclxuICAgIHRvb2x0aXBGdW5jdGlvbixcclxuICAgIGluaXRTbGlkZXJzLFxyXG4gICAgdG9vbHRpcFxyXG59IGZyb20gJy4vaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3JcclxufSBmcm9tICcuLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdENvbG9yUGlja2VyLFxyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0TGlzdGVuZXJzLFxyXG4gICAgcGxheUJvb2xlYW5cclxufSBmcm9tICcuLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0RGVuZHJvZ3JhbSxcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbmV0d29ya0hpZXJhcmNoeUlkc1xyXG59IGZyb20gJy4uL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgdHJhY2tpbmdCb29sZWFuLFxyXG4gICAgYWRkVHJhY2tlZERhdGFcclxufSBmcm9tICcuLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IGluZGV4VGltZSA9IDA7IC8vIGFjdHVhbCB0aW1lIG1vbWVudCBpbiB0aGUgYW5pbWF0aW9uXHJcbmV4cG9ydCBsZXQgdGFua1dpZHRoO1xyXG5leHBvcnQgbGV0IHRhbmtIZWlnaHQ7XHJcbmV4cG9ydCBsZXQgYWN0aXZlU2NhbGUgPSAnYmxhY2snOyAvLyBjYW4gYmUgc3BlZWQsIGFjY2VsZXJhdGlvbiwgLi4gYW5kIGJsYWNrIChtZWFuaW5nIG5vIGFjdGl2ZSBzY2FsZSlcclxuZXhwb3J0IGxldCBtZWRvaWRBbmltYWwgPSAtMTsgLy8gd2hpY2ggYW5pbWFsIGlzIHRoZSBtZWRvaWQgKC0xIGlzIG5vIGFuaW1hbClcclxuZXhwb3J0IGxldCBhY3RpdmVBbmltYWxzID0gW107IC8vIGFjdGl2ZSBzZWxlY3RlZCBhbmltYWxzXHJcbmV4cG9ydCBsZXQgYXJyYXlBbmltYWxzOyAvLyBhcnJheSBvZiBhbmltYWxzIGZvciB0aGUgc3BlY2lmaWMgdGltZSBmcmFtZVxyXG5leHBvcnQgbGV0IGFuaW1hbF9pZHM7IC8vIGFycmF5IG9mIHVuaXF1ZSBhbmltYWwgaWRzXHJcblxyXG5sZXQgc3ZnQ29udGFpbmVyOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgc3BhdGlhbCB2aWV3XHJcbmxldCB0YW5rOyAvLyBzdmcgZ3JvdXAgZm9yIHRoZSBzcGF0aWFsIHZpZXcgdGFua1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHNwYXRpYWwgdmlldyB3aXRoIGFsbCB0aGUgaW1wb3J0YW50IGZhY3RvcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcGF0aWFsVmlld0luaXQoKSB7XHJcblxyXG4gICAgbGV0IG1pblBvaW50ID0gcGFyYW1ldGVyc1snbWluJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICBsZXQgbWF4UG9pbnQgPSBwYXJhbWV0ZXJzWydtYXgnXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIC8vIGxldCBjb29yZGluYXRlT3JpZ2luID0gcGFyYW1ldGVyc1snY29vcmRpbmF0ZV9vcmlnaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIC8vIHdpZHRoID0gd2lkdGggKjEuMDIgLS0+IHNvIHRoZXJlIGlzIGEgbWFyZ2luIGluIHRoZSBzcGF0aWFsIHZpZXcgd2hlcmUgbm8gYW5pbWFsIGlzIGV2ZXJcclxuICAgIHRhbmtXaWR0aCA9IChtYXhQb2ludFswXSAtIG1pblBvaW50WzBdKSAqIDEuMDI7XHJcbiAgICB0YW5rSGVpZ2h0ID0gKG1heFBvaW50WzFdIC0gbWluUG9pbnRbMV0pICogMS4wMjtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSB2aWV3IHJlc2l6YWJsZVxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbWFpbi12aXMnKS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXHJcbiAgICAgICAgICAgIH0pLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAkKCcjbWFpbi12aXMtZGl2Jykud2lkdGgoKVxyXG4gICAgICAgICAgICB9KS5oZWlnaHQodGFua0hlaWdodCAqIDAuNilcclxuICAgICAgICAgICAgLndpZHRoKHRhbmtXaWR0aCAqIDAuNik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3Jlc2V0IGFsbCBjaGVja2JveGVzXHJcbiAgICAkKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAvL3NldCB0aGUgY29sb3Igc2NhbGUgZnVuY3Rpb24gdG8gbGluZWFyXHJcbiAgICAkKCcjY29sb3Itc2NhbGUtbGluZWFyJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI2dyb3VwLXNpemUtbScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNiYWNrZ3JvdW5kLXdoaXRlJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI3NldHRpbmdzLWRpdiBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgIC8vaGlkZSB0aGUgbG9hZGluZyBnaWZcclxuICAgICQoJyNsb2FkaW5nJylcclxuICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgIC8vIGdldCAgbnVtYmVyIG9mIGRpc3RpbmN0IGFuaW1hbCBpZHNcclxuICAgIGxldCBudW1fYW5pbWFscyA9IG5ldyBTZXQoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkYXRhc2V0W2ldWyd0J10gPT09IGRhdGFzZXRbMF1bJ3QnXSkge1xyXG4gICAgICAgICAgICBudW1fYW5pbWFscy5hZGQoZGF0YXNldFtpXVsnYSddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpID0gZGF0YXNldC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYW5pbWFsX2lkcyA9IEFycmF5LmZyb20obnVtX2FuaW1hbHMpLnNvcnQoKTtcclxuXHJcbiAgICAvL1ggYW5kIFkgYXhpc1xyXG4gICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMF0sIG1heFBvaW50WzBdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pO1xyXG5cclxuICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeClcclxuICAgICAgICAudGlja3MoMTApXHJcbiAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgIC50aWNrUGFkZGluZyg1KTtcclxuXHJcbiAgICBsZXQgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFttaW5Qb2ludFsxXSwgbWF4UG9pbnRbMV1dKVxyXG4gICAgICAgIC5yYW5nZShbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSk7XHJcblxyXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc1JpZ2h0KHkpXHJcbiAgICAgICAgLnRpY2tzKDcpXHJcbiAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgIC50aWNrUGFkZGluZyg1KTtcclxuXHJcbiAgICAvLyBaT09NSU5HIEFORCBQQU5OSU5HIFNUVUZGXHJcbiAgICAvLyBUT0RPIHJlbW92ZSB0aGlzIGZyb20gaGVyZSB0byBpbnRlcmFjdGlvblxyXG4gICAgbGV0IHpvb21Hcm91cDtcclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCA2XSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIC8vIG1vZGlmeSB0aGUgdHJhbnNsYXRlIHNvIHRoYXQgaXQgbmV2ZXIgZXhpdHMgdGhlIHRhbmtcclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnggPSBNYXRoLm1pbigwLCB0YW5rV2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHRhbmtXaWR0aCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueCkpO1xyXG5cclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnkgPSBNYXRoLm1pbigwLCB0YW5rSGVpZ2h0ICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rSGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgYW5kIHNjYWxlXHJcbiAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcy5zY2FsZShkMy5ldmVudC50cmFuc2Zvcm0ucmVzY2FsZVgoeCkpKTtcclxuICAgICAgICAgICAgZ1lheGlzLmNhbGwoeUF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVZKHkpKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy90aGUgc3ZnIGNvbnRhaW5lclxyXG4gICAgc3ZnQ29udGFpbmVyID0gZDMuc2VsZWN0KCcjbWFpbi12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG4gICAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgMCAnICsgdGFua1dpZHRoICsgJyAnICsgdGFua0hlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSlcclxuICAgICAgICAuYXR0cignaWQnLCAnbWFpbi12aXMtc3ZnJylcclxuICAgICAgICAuY2FsbCh6b29tKTtcclxuXHJcblxyXG4gICAgLyogZGVwZW5kcyBvbiBzdmcgcmF0aW8sIGZvciAgMTI0MC8xOTAwID0gMC42NSBzbyBwYWRkaW5nLWJvdHRvbSA9IDY1JSAqL1xyXG4gICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmNlaWwoKHRhbmtIZWlnaHQgLyB0YW5rV2lkdGgpICogMTAwKTtcclxuICAgICQoJyNtYWluLXZpcycpLmFwcGVuZCgkKCc8c3R5bGU+I21haW4tdmlzOjphZnRlciB7cGFkZGluZy10b3A6ICcgKyBwZXJjZW50YWdlICsgJyU7ZGlzcGxheTogYmxvY2s7Y29udGVudDogXCJcIjt9PC9zdHlsZT4gJykpO1xyXG5cclxuICAgIHpvb21Hcm91cCA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ3N2ZzpnJyk7XHJcblxyXG4gICAgaWYgKHBhcmFtZXRlcnMuYmFja2dyb3VuZF9pbWFnZSkge1xyXG4gICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWFnZScpXHJcbiAgICAgICAgICAgIC8vICAuYXR0cignZCcscGF0aClcclxuICAgICAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCAnLycgKyBwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdiYWNrZ3JvdW5kSW1hZ2UnKVxyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGFua0hlaWdodClcclxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGFua1dpZHRoKVxyXG4gICAgICAgICAgICAvLyB3aGlsZSBhZGRpbmcgYW4gaW1hZ2UgdG8gYW4gc3ZnIHRoZXNlIGFyZSB0aGUgY29vcmRpbmF0ZXMgaSB0aGluayBvZiB0aGUgdG9wIGxlZnRcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgJzAnKVxyXG4gICAgICAgICAgICAuYXR0cignYmFja2dyb3VuZCcsICcjZmZmJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vYXBwZW5kIHRoZSB0YW5rIGdyb3VwIHdpdGggYSB0cmFuc2Zvcm1hdGlvbiB3aGljaCByb3RhdGVzIHRoZSB5IGF4aXNcclxuICAgIHRhbmsgPSB6b29tR3JvdXAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RhbmsnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHggPSAxO1xyXG4gICAgICAgICAgICBsZXQgeSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmludmVydGVkX3gpIHtcclxuICAgICAgICAgICAgICAgIHggPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF95KSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICdzY2FsZSgnICsgeCArICcsJyArIHkgKyAnKSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy9hZGQgdGhlIGNlbnRyb2lkXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NlbnRyb2lkIGhpZGRlbicpXHJcbiAgICAgICAgLmF0dHIoJ3InLCA2KVxyXG4gICAgICAgIC5hdHRyKCdjeCcsIDApXHJcbiAgICAgICAgLmF0dHIoJ2N5JywgMCk7XHJcblxyXG4gICAgLy8gYXJyb3cgZm9yIHRoZSBjZW50cm9pZCBkaXJlY3Rpb25cclxuICAgIHRhbmsuc2VsZWN0KCcjZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdjZW50cm9pZC1hcnJvdycpXHJcbiAgICAgICAgLmF0dHIoJ3JlZlgnLCAyKVxyXG4gICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCAnTTIsMiBMMiwxMSBMMTAsNiBMMiwyJyk7XHJcblxyXG4gICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdjZW50cm9pZC1saW5lJylcclxuICAgICAgICAuYXR0cignbWFya2VyLWVuZCcsICd1cmwoI2NlbnRyb2lkLWFycm93KScpO1xyXG5cclxuICAgIC8vYXBwZW5kIG5ldHdvcmsgIGdyb3VwXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ25ldHdvcmtHcm91cCcpO1xyXG5cclxuICAgIC8vYXBwZW5kIGRlbGF1bmF5LXRyaWFuZ3VsYXRpb24gZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZGVsYXVuYXktdHJpYW5ndWxhdGlvbi1ncm91cCcpO1xyXG5cclxuICAgIC8vYXBwZW5kIHZvcm9ub2kgZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAndm9ybm9pR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgZnJhbWUgdGltZSB0ZXh0XHJcbiAgICBzdmdDb250YWluZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnZnJhbWUtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAzMClcclxuICAgICAgICAuYXR0cigneScsIDMwKVxyXG4gICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIGxldCBnWWF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG4gICAgLy8gaW5pdCBzdHVmZiBmcm9tIG90aGVyIG1vZHVsZXNcclxuICAgIGluaXRUb29sdGlwKCk7XHJcbiAgICBpbml0U2xpZGVycygpO1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cCgpO1xyXG4gICAgaW5pdENvbG9yUGlja2VyKCk7XHJcbiAgICBsaW5lQ2hhcnQoKTtcclxuICAgIGluaXRMaXN0ZW5lcnMoKTtcclxuICAgIGluaXREZW5kcm9ncmFtKCk7XHJcbiAgICAvLyBzdGFydCB0aGUgYW5pbWF0aW9uXHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3aW5nIGZ1bmN0aW9uIC0gaXMgY2FsbGVkIGZvciBlYWNoIHRpbWVzdGVwXHJcbiAqIGluZGV4VGltZSBzYXZlcyB0aGUgY3VycmVudCB0aW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhdygpIHtcclxuICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZSBvZiBmdW5jdGlvbiBkcmF3XHJcbiAgICAvLyBsZXQgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICAvL3VwZGF0ZSB0aW1lIHRvIHdhaXQgYWthIHNwZWVkIG9mIHJlcGxheVxyXG4gICAgbGV0IHRpbWVUb1dhaXQgPSAkKCdpbnB1dFtuYW1lPWdyb3VwMV06Y2hlY2tlZCcsICcjZ3JvdXAxJylcclxuICAgICAgICAudmFsKCk7XHJcbiAgICAvL3NjYWxlIHRoZSBzaXplIGJ5IHRoaXMgbnVtYmVyXHJcbiAgICBsZXQgYW5pbWFsU2NhbGUgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtc2l6ZTpjaGVja2VkJylcclxuICAgICAgICAudmFsKCk7XHJcblxyXG4gICAgLy9nZXQgdGhlIG5leHQgYW5pbWFsc1xyXG4gICAgYXJyYXlBbmltYWxzID0gZGF0YXNldC5zbGljZShhbmltYWxfaWRzLmxlbmd0aCAqIGluZGV4VGltZSwgYW5pbWFsX2lkcy5sZW5ndGggKiBpbmRleFRpbWUgKyBhbmltYWxfaWRzLmxlbmd0aCk7XHJcblxyXG4gICAgLy90aGUgdGltZW91dCBpcyBzZXQgYWZ0ZXIgb25lIHVwZGF0ZSAzMCBtc1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZHJhdyBoaWVyYXJjaHlcclxuICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIHRpbWUgZnJhbWUgdGV4dFxyXG4gICAgICAgICAgICBzdmdDb250YWluZXIuc2VsZWN0KCcuZnJhbWUtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChNYXRoLmZsb29yKGluZGV4VGltZSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKGluZGV4VGltZSAvIHBhcmFtZXRlcnNbJ2ZwcyddKSAlIDYwICsgJzo6JyArIGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddKTtcclxuICAgICAgICAgICAgLy8gaWYgYSBzZWNvbmQgaGFzIGNoYW5nZWQgbW92ZSB0aGUgc2xpZGVyXHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZVNsaWRlcihpbmRleFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ZnQW5pbWFscyA9IHRhbmsuc2VsZWN0QWxsKCdnLmFuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShhcnJheUFuaW1hbHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTmV0d29yayB2aXNcclxuICAgICAgICAgICAgbGV0IG5ldHdvcmtWaXM7XHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgaW4gbmV0d29ya0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXR3b3JrID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gbmV0d29ya0RhdGFbaW5kZXhUaW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIHdob2xlIG5ldHdvcmtcclxuICAgICAgICAgICAgICAgIGlmIChzaG93TmV0d29ya0hpZXJhcmNoeSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMSc6IGFycmF5QW5pbWFsc1tpXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGFydCc6IGFycmF5QW5pbWFsc1tpXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbmQnOiBhcnJheUFuaW1hbHNbal1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2luZGV4ID0gdG1wX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gLy8gZGlzcGxheSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjbHVzdGVyaW5nXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbmV0d29ya0hpZXJhcmNoeUlkcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrSGllcmFyY2h5SWRzW2tdLmluY2x1ZGVzKGFycmF5QW5pbWFsc1tpXVsnYSddKSAmJiBuZXR3b3JrSGllcmFyY2h5SWRzW2tdLmluY2x1ZGVzKGFycmF5QW5pbWFsc1tqXVsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUxJzogYXJyYXlBbmltYWxzW2ldWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTInOiBhcnJheUFuaW1hbHNbal1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGFydCc6IGFycmF5QW5pbWFsc1tpXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IGFycmF5QW5pbWFsc1tqXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHRtcFt0bXBfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMSddICsgJy0nICsgZFsnbm9kZTInXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTInXSArICctJyArIGRbJ25vZGUxJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtBdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXR3b3JrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2gobmV0d29ya1tpXVsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXROZXR3b3JMaW1pdChwZXJjZW50aWxlcyh0bXBBcnJheSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBuZXR3b3JrLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3ZhbCddIDw9IG5ldHdvcmtMaW1pdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEobmV0d29yayk7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEVcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGRbJ3ZhbCddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUlxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSBuZXR3b3JrXHJcbiAgICAgICAgICAgIG5ldHdvcmtWaXMuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWxhdW5heSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIHZhciB0cmlhbmd1bGF0aW9uO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24gPSB0YW5rLnNlbGVjdCgnI2RlbGF1bmF5LXRyaWFuZ3VsYXRpb24tZ3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGguZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW3N3YXJtRGF0YVtpbmRleFRpbWVdWyd0cmlhbmd1bGF0aW9uJ11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUiAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZWxhdW5heS10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBWb3Jvbm9pXHJcbiAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZhciB2b3Jvbm9pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctdm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vYXBwZW5kIHRoZSBncm91cCBmb3IgdGhlIHZvcm9ub2kgcGF0aHNcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKHN3YXJtRGF0YVtpbmRleFRpbWVdWyd2b3Jvbm9pJ10uc3BsaXQoJzsnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm9yb25vaSA9IHRhbmsuc2VsZWN0KCcjdm9ybm9pR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZvcm9ub2kuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0VOVEVSIC0gYXBwZW5kIHRoZSBhbmltYWwgZ3JvdXBzXHJcbiAgICAgICAgICAgIGxldCBhbmltYWxHcm91cGluZ3MgPSBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FuaW1hbC0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIGNpcmNsZXMgZm9yIGVhY2ggYW5pbWFsIHRvIHRoZSBhbmltYWxncm91cFxyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCAxLjUgKiBhbmltYWxTY2FsZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRnVuY3Rpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgb24gY2xpY2sgZm9yIHRoZSBhY3RpdmUgZmlzaHNcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzID0gYWN0aXZlQW5pbWFscy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0gYW5pbWFscyBjaXJjbGVzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYW5pbWFsU2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGZvciBlYWNoIGdyb3VwIHRoZSBhcnJvdywgbmVlZGVkIGZvciBjb2xvcmluZ1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fycm93LW1hcmtlci0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5nc1xyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoI2Fycm93LW1hcmtlci0nICsgZFsnYSddICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2V4ZWN1dGUgb25seSB3aGVuIGRyYXcgZGlyZWN0aW9uIGJ1dHRvbiBpcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsncCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsncCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtZFsnZGlyZWN0aW9uJ10gKyAnICcgKyBkWydwJ11bMF0gKyAnICcgKyAtZFsncCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93IGhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdGhlIGdyb3Vwc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db252ZXggaHVsbFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgdmFyIGh1bGxQYXRoID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NvbnZleF9odWxsJ11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSBodWxsIHBhdGhcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVOVEVSIC0gaHVsbCBwYXRoc1xyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGguZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdodWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3IG5vIGh1bGxcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoID0gdGFuay5zZWxlY3QoJ3BhdGguaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBmaXNoXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgZXZlcnkgZmlzaCBibGFja1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChtZXRhZGF0YUNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhQ29sb3IpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjYW5pbWFsLScgKyBrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBtZXRhZGF0YUNvbG9yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgbWV0YWRhdGFDb2xvcltrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdHJhY2tpbmcgaXMgb25cclxuICAgICAgICAgICAgICAgIGlmICh0cmFja2luZ0Jvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRUcmFja2VkRGF0YShhcnJheUFuaW1hbHNbMF1bJ3QnXSwgYWN0aXZlQW5pbWFscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykgJiZcclxuICAgICAgICAgICAgICAgIHN3YXJtRGF0YVtpbmRleFRpbWVdLmNlbnRyb2lkICYmXHJcbiAgICAgICAgICAgICAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydkaXJlY3Rpb24nXSArICcgJyArIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgJyAnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1lZG9pZFxyXG4gICAgICAgICAgICBpZiAobWVkb2lkQW5pbWFsICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1lZG9pZEFuaW1hbCA9IHN3YXJtRGF0YVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9uZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIGluZGV4VGltZSsrO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlTGluZUNoYXJ0KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jaGVjayBpZiBwbGF5IGJ1dHRvbiBpcyBhY3RpdmUgYW5kIGlmIHRoZSBhbmltYXRpb24gaXMgbm90IGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgPj0gc3dhcm1EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9zdGFydCBhZ2FpbiBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5Qm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lXHJcbiAgICAgICAgICAgICAgICAvLyAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0MSAtIHQwKTsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWVUb1dhaXQpO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBpbmRleCB0aW1lIHRvIGEgbmV3IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB0aW1lIHN0ZXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJbmRleFRpbWUodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIChpbmRleFRpbWUgPD0gc3dhcm1EYXRhLmxlbmd0aCkpIHtcclxuICAgICAgICBpbmRleFRpbWUgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlY3JlYXNlIHRpbWUgYnkgMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY0luZGV4VGltZSgpIHtcclxuICAgIGluZGV4VGltZSA9IGluZGV4VGltZSAtIDE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHRoZSBuZXcgYWN0aXZlIHNjYWxlIC0gZS5nLiBzcGVlZCwgYWNjZWxlcmF0aW9uLCBibGFjayBldGMuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSAtIGFjdGl2ZSBzY2FsZSBmb3IgdGhlIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVNjYWxlKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVTY2FsZSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXcgbWVkb2lkIGFuaW1hbFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBVbmlxdWUgaWQgb2YgdGhlIGFuaW1hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1lZG9pZEFuaW1hbCh2YWx1ZSkge1xyXG4gICAgbWVkb2lkQW5pbWFsID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNlbGVjdGVkIGFuZCBoaWdobGlnaHRlZCBhbmltYWxzXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXkgb2YgdW5xaXVlIGlkIG9mIHRoZSBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlQW5pbWFscyh2YWx1ZSkge1xyXG4gICAgYWN0aXZlQW5pbWFscyA9IHZhbHVlO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgZDMgKi9cclxuXHJcbmV4cG9ydCBsZXQgbmV0d29ya0F1dG8gPSBmYWxzZTsgLy8gaWYgdHJ1ZSB0aGUgbmV0d29yayBlZGdlIGxpbWl0IGlzIGF1dG9tYXRpY2FsbHkgc3VnZ2VzdGVkXHJcbmV4cG9ydCBsZXQgbmV0d29ya0xpbWl0ID0gMC41O1xyXG5leHBvcnQgbGV0IHNob3dOZXR3b3JrSGllcmFyY2h5O1xyXG4vLyBmaXhlZCBjb2xvciBzY2FsZSBmb3IgdGhlIG5ldHdvcmtcclxuXHJcbi8qKlxyXG4gKiBTdGF0aWMgY29sb3Igc2NhbGUgZm9yIHRoZSBuZXR3b3JrIGNvbG9yaW5nXHJcbiAqIFRPRE8gY2hhbmdlIHRoaXMgc29tZXRpbWVcclxuICovXHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAuZG9tYWluKFxyXG4gICAgICAgIFswLCAuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjgsIC45LCAxXVxyXG4gICAgKVxyXG4gICAgLnJhbmdlKFsnIzAwMDAwMCcsICcjMWQxZDFkJywgJyMzNTM1MzUnLCAnIzRlNGU0ZScsICcjNjk2OTY5JywgJyM4NTg1ODUnLCAnI2EzYTNhMycsICcjYzBjMGMwJywgJyNkZmRmZGYnLCAnI2ZmZmZmZiddKTtcclxuXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBuZXR3b3JrICBzZWxlY3QgYnV0dG9ucyBhbmQgaGllcmFyY2h5IGNoZWNrYm94ZXMgdG8gdGhlIG5ldHdvcmsgbW9kYWxcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIG5ldHdvcmsgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXVsnZmluaXNoZWQnXSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmtzLWhpZXJhcmNoaWVzLXRhYmxlIHRib2R5JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8dHI+PHRkPicgKyBkYXRhW2ldWyduYW1lJ10gKyAnPC90ZD4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8dGQ+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1ibG9ja1wiIGRhdGE9JyArIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICcgbmFtZT0nICsgZGF0YVtpXVsnbmFtZSddICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJz48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2J1dHRvbj48L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyA8dGQ+PGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLWNoZWNrYm94IGhpZWFyY2h5LWNoZWNrYm94XCI+PGlucHV0IGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXQgaGlkZGVuXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YT0nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJyBuYW1lPScgKyBkYXRhW2ldWyduYW1lJ10gKyAnPjxzcGFuIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yXCI+PC9zcGFuPjwvbGFiZWw+PC90ZD4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD48bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3ggbmV0d29yay1oaWVyYXJjaHktY2hlY2tib3hcIj48aW5wdXQgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dCBoaWRkZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICdcIj48c3BhbiBjbGFzcz1cImN1c3RvbS1jb250cm9sLWluZGljYXRvclwiPjwvc3Bhbj48L2xhYmVsPjwvdGQ+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNuZXR3b3Jrcy1oaWVyYXJjaGllcy10YWJsZScpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ1RoZXJlIGlzIG5vIG5ldHdvcmsgZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBhdXRvIHZhbHVlIC0gaWYgdHJ1ZSB0aGFuIHRoZSBuZXR3b3JrIGxpbWl0IGlzIHNldCB0byB0aGUgMC45NSBwZXJjZW50aWxlIG9mIGFsbCB2YWx1ZXNcclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtBdXRvKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrQXV0byA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGxpbWl0IHdpdGggdGhlIHNwZWNpZmljIG5ldHdvcmsgc2xpZGVyIC0gY3VzdG9tXHJcbiAqIDAgPSBzaW1pbGFyIGFuZCAxIHVuc2ltaWxhciBmb3IgdGhlIHNwZWNpZmljIHRpbWUgbW9tZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIGJldHdlZW4gMCBhbmQgMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvckxpbWl0KHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrTGltaXQgPSAxIC0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgaW4gaGllcmFyY2h5IChlLmcuIGgwKSBmaWx0ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZXJhcmNoeSAtIGUuZy4gMC1uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0hpZXJhcmNoeSh2YWx1ZSkge1xyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHkgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9uZXR3b3JrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRyYXdcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFBsYXlCb29sZWFuXHJcbn0gZnJvbSAnLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdFRyZW5kQ2hhcnRMaXN0ZW5lclxyXG59IGZyb20gJy4vbGluZV9jaGFydC5qcyc7XHJcbi8qKlxyXG4gKiBEaXNhYmxlIHRoZSBwbGF5IGJ1dHRvbiAtLT4gTG9hZGluZyBzeW1ib2xcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKGZhbHNlKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZWZyZXNoIGdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGVcIj48L3NwYW4+TG9hZGluZycpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgcGxheSBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKHRydWUpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+UGxheScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuICAuMDUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXMoYXJyKSB7XHJcbiAgICBsZXQgcCA9IDAuMDU7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgIH0pO1xyXG4gICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHA7XHJcbiAgICBsZXQgbG93ZXIgPSBNYXRoLmZsb29yKGluZGV4KTtcclxuICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICBpZiAodXBwZXIgPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gYXJyW2xvd2VyXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSAoYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSAwNSwgMjUsIDUwLCA3NSwgOTUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXNMaW5lQ2hhcnQoYXJyKSB7XHJcbiAgICBsZXQgcCA9IFswLjA1LCAwLjI1LCAwLjUsIDAuNzUsIDAuOTVdO1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IChhcnIubGVuZ3RoIC0gMSkgKiBwW2ldO1xyXG4gICAgICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gaW5kZXggJSAxO1xyXG4gICAgICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGNoZWNrYm94ZXMgaW4gdGhlIGZlYXR1cmUgcGFuZWxcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zKGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIG9iamVjdFxyXG4gICAgZm9yICh2YXIga2V5IGluIGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAgICAgaWYgKGRhdGFTZXRQZXJjZW50aWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGV4dCBmb3IgdGhlIGRpc3BsYXllZCBidXR0b25cclxuICAgICAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0ga2V5LnNwbGl0KCdfJykuam9pbignICcpO1xyXG4gICAgICAgICAgICBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYnV0dG9uXHJcbiAgICAgICAgICAgICQoJyNhYnNvbHV0ZS1mZWF0dXJlLWNoZWNrYm94ZXMnKS5hZnRlcignPGRpdiBjbGFzcz1cImZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHRcIj4gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjaGVja2JveFwiIGlkPVwiZHJhdy0nICsga2V5ICtcclxuICAgICAgICAgICAgICAgICdcIi8+PGxhYmVsIGZvcj1cImRyYXctJyArIGtleSArICdcIj4nICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgK1xyXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiZHJhdy0nICsga2V5ICtcclxuICAgICAgICAgICAgICAgICctZGV0YWlsc1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgaGlkZGVuIGRyYXctZGV0YWlsc1wiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiA8L2J1dHRvbj4gPC9sYWJlbD4gPC9kaXY+Jyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGluaXQgdGhlIGxpc3Rlcm5lcnNcclxuICAgIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKTtcclxuXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBwYXJhbWV0ZXJzICovXHJcblxyXG5sZXQgSlNPTkFQSV9NSU1FVFlQRSA9ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nO1xyXG52YXIgc291cmNlO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZFRvRGF0YXNldCxcclxuICAgIHNldERhdGFTZXRQZXJjZW50aWxlLFxyXG4gICAgc2V0U3dhcm1EYXRhLFxyXG4gICAgc2V0TWV0YURhdGEsXHJcbiAgICBzZXREYXRhc2V0RmVhdHVyZSxcclxuICAgIHNldE5ldHdvcmtEYXRhLFxyXG4gICAgc2V0SGllcmFyY2h5RGF0YVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkTmV0d29ya0J1dHRvbnNcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGVuYWJsZVBsYXlCdXR0b24sXHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbixcclxuICAgIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnNcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNwYXRpYWxWaWV3SW5pdFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcmVzcG9uc2VQYXJhbWV0ZXJzXHJcbn0gZnJvbSAnLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcblxyXG4vKipcclxuICogU3RyZWFtIHRoZSBtb3ZlbWVudCBkYXRhIGZyb20gdGhlIEFQSVxyXG4gKiBMb2FkcyBvbmx5IHRoZSBleHBsaWNpdCBtb3ZlbWVudCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtTW92ZW1lbnREYXRhKCkge1xyXG4gICAgaWYgKHdpbmRvdy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9tb3ZlbWVudF9vbmx5LycgKyBwYXJhbWV0ZXJzWydpZCddKTtcclxuICAgICAgICBzb3VyY2Uub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSAnY2xvc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBhamF4IHF1ZXJpZXMgYXJlIGNvbXBlbHRlIGluaXRpYWxpemVcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1BlbmRpbmdSZXF1ZXN0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5hY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhdGlhbFZpZXdJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUb0RhdGFzZXQoSlNPTi5wYXJzZShlLmRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUucmVhZHlTdGF0ZSA9PSBFdmVudFNvdXJjZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdTdHJlYW1pbmcgZXJyb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ1dlYmJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBzdHJlYW1pbmcnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcGVyY2VudGlsZSBkYXRhIGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcmNlbnRpbGUoKSB7XHJcbiAgICBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9wZXJjZW50aWxlLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIGRhdGFTZXRQZXJjZW50aWxlIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgLy8gW21pbiwgcGVyY2VudGlsZV8xLC4uLixwZXJjZW50aWxlXzksbWF4XVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXRQZXJjZW50aWxlW2RhdGFbaV1bJ2ZlYXR1cmUnXV0gPSBbZGF0YVtpXVsnbWluJ10sIGRhdGFbaV1bJ3AxJ10sIGRhdGFbaV1bJ3AyJ10sIGRhdGFbaV1bJ3AzJ10sIGRhdGFbaV1bJ3A1J10sIGRhdGFbaV1bJ3A3J10sIGRhdGFbaV1bJ3A4J10sIGRhdGFbaV1bJ3A5J10sIGRhdGFbaV1bJ21heCddXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXREYXRhU2V0UGVyY2VudGlsZShkYXRhU2V0UGVyY2VudGlsZSk7XHJcbiAgICAgICAgICAgIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnMoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0IGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRmVhdHVyZXMoKSB7XHJcbiAgICBjb25zdCBzd2FybV9mZWF0dXJlcyA9IFsnc3dhcm1fdGltZScsICdzd2FybV9zcGVlZCcsICdzd2FybV9hY2NlbGVyYXRpb24nLCAnc3dhcm1fY29udmV4X2h1bGxfYXJlYScsXHJcbiAgICAgICAgJ3N3YXJtX2Rpc3RhbmNlX2NlbnRyb2lkJywgJ3N3YXJtX2RpcmVjdGlvbicsICdzd2FybV9wb2xhcmlzYXRpb24nXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGdldCBhbGwgdGhlIG90aGVyIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIHN3YXJtX2ZlYXR1cmVzW2ldLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlYXR1cmUgPSBzd2FybV9mZWF0dXJlc1tpXS5yZXBsYWNlKCdzd2FybV8nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG1lYWRhdGEgaW5mb3JtYXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhRGF0YSgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9tZXRhZGF0YS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRNZXRhRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBkYXRhc2V0cyBmb3IgdGhlIGJ1dHRvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YUJ1dHRvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmtzLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2Ugc3BlZWQsIGFjY2VsZXJhdGlvbiBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YXNldEZlYXR1cmUoZmVhdHVyZSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIHN3YXJtIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2UgY2VudHJvaWQsIG1lZG9pZCBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGZvciB0aGUgc3BlY2lmaWMgbmV0d29ya19pZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV0d29ya19pZCAtIHVuaXF1ZSBuZXR3b3JrIGlkIG9mIGEgZGF0YXNldC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YShuZXR3b3JrX2lkKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3JrLycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldE5ldHdvcmtEYXRhKEpTT04ucGFyc2UoZGF0YVswXVsnZGF0YSddKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBoaWVyYXJjaHkgZm9yIHRoZSBzcGVjaWZpYyBuZXR3b3JrX2lkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXR3b3JrX2lkIC0gdW5pcXVlIG5ldHdvcmsgaWQgb2YgYSBkYXRhc2V0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKG5ldHdvcmtfaWQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmsvaGllcmFyY2h5LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSksIG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVmlzdWFsIHBhcmFtZXRlciBzdWdnZXN0aW9uIGFqYXggcXVlcnlcclxuICogQHBhcmFtIHtBcnJheX0gdHJhY2tlZERhdGEgLSB0cmFja2VkIGRhdGEgd2l0aCAuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VnZ2VzdGVkUGFyYW1ldGVycyh0cmFja2VkRGF0YSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvdmlzdWFsX3BhcmFtZXRlci8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogdHJhY2tlZERhdGFcclxuICAgIH0pO1xyXG5cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9hamF4X3F1ZXJpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0TWV0YWRhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgbWV0YWRhdGFDb2xvciA9IHt9OyAvLyBzYXZlIHRoZSBtZXRhZGF0YSBjb2xvcmluZ1xyXG5cclxuLyoqXHJcbiAqIEluaXQgTWV0YWRhdGEgYnV0dG9ucyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTWV0YWRkYXRhKCkge1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnI2ZmZicsICcjZTQxYTFjJywgJyMzNzdlYjgnLCAnIzRkYWY0YScsICcjOTg0ZWEzJywgJyNmZjdmMDAnLCAnI2ZmZmYzMycsICcjYTY1NjI4J107XHJcbiAgICAvLyBhZGQgdGhlIGRhdGEgdG8gdGhlIG1ldGFkYXRhIG1vZGFsXHJcbiAgICBpZiAoZGF0YXNldE1ldGFkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtdGFibGUnKS5maW5kKCd0Ym9keScpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ciBpZD1cIm1ldGFkYXRhLXJvdy0nICsgZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSArICdcIj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnd2VpZ2h0J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoYDxkaXYgY2xhc3M9XCJkcm9wZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1jb2xvclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInByZXZpZXdcIiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojZmZmXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvci1maWVsZFwiIHZhbHVlPVwiV2hpdGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFN0cmluZyArPSAnPGRpdiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaCBtZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvcnNbaV0gKyAnXCIgdmFsdWU9XCInICsgaWQgKyAnXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvdWw+PC9kaXY+JylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdUaGVyZSBpcyBubyBtZXRhZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2l6ZSBhbmQgd2VpZ2h0IGNvbG9yaW5nIGZvciB0aGUgbWV0YWRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvck1ldGFkYXRhKCkge1xyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuICAgIC8vIGdldCB0aGUgaW5wdXQgdmFsdWVzXHJcbiAgICBsZXQgdmFsdWUgPSAkKCcjZ3JvdXAtbWV0YWRhdGEgLmJ0bi5idG4tZGVmYXVsdC5hY3RpdmUgaW5wdXQnKVxyXG4gICAgICAgIC5hdHRyKCd2YWx1ZScpO1xyXG4gICAgbGV0IGJsQXZnID0gJCgnI2JsLWF2ZycpLnZhbCgpO1xyXG4gICAgbGV0IGFiQXZnID0gJCgnI2FiLWF2ZycpLnZhbCgpO1xyXG4gICAgLy8gY29sb3Igc2NoZW1lIGZvciB0aGUgaW5wdXRzXHJcbiAgICBsZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyNmZGMwODYnLCAnIzM4NmNiMCddO1xyXG4gICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPCBibEF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA+IGFiQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1sxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWV0YWRhdGEgcmVzZXQgYWxsIGluZGl2aWR1YWwgbWV0YWRhdGEgaW5wdXQgZmllbGRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKSB7XHJcbiAgICBtZXRhZGF0YUNvbG9yID0ge307XHJcbiAgICAkKCcuZHJvcGRvd24gI3ByZXZpZXcnKVxyXG4gICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBjb2xvcmJyZXdlciovXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY2hhbmdlTGVnZW5kXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5leHBvcnQgbGV0IGNvbG9yU2NhbGUgPSB7XHJcbiAgICB0eXBlOiAnTGluZWFyJyxcclxuICAgIGNvbG9yOiBjb2xvcmJyZXdlci5CdVlsQnVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBzY2FsZVxyXG4gKiBAcmV0dXJuIHtjb2xvclNjYWxlfSBhY3RpdmUgY29sb3Igc2NhbGUgaXMgaW4gbGluZWFyIG9yIHRocmVzaG9sZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJldHVybkNvbG9yU2NhbGUoKSB7XHJcbiAgICAvL2lmIGxpbmVhciBpcyBjaG9vc2VuXHJcbiAgICBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnTGluZWFyJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfSAvL1RocmVzaG9sZCBjb2xvciBzY2FsZVxyXG4gICAgZWxzZSBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnVGhyZXNob2xkJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgY29sb3IgcGlja2VyXHJcbiAqIHdpdGggYWxsIGxpc3RlbmVycyBpbmNsdWRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb2xvclBpY2tlcigpIHtcclxuICAgIGQzLnNlbGVjdCgnLmNvbG9ycy1ib2R5JylcclxuICAgICAgICAuc2VsZWN0QWxsKCcucGFsZXR0ZScpXHJcbiAgICAgICAgLmRhdGEoZDMuZW50cmllcyhjb2xvcmJyZXdlcikpXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGFsZXR0ZScpXHJcbiAgICAgICAgLmF0dHIoJ3RpdGxlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5rZXk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyBoaWdodGxpZ2h0IHRoZSByaWdodCBwYWxldHRlXHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlW3RpdGxlPVwiJyArIGQua2V5ICsgJ1wiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBjb2xvclNjYWxlLmNvbG9yID0gY29sb3JicmV3ZXJbZC5rZXldO1xyXG4gICAgICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJy5zd2F0Y2gnKVxyXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3NwYW4nKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzd2F0Y2gnKVxyXG4gICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBjb2xvciBzY2hlbWVcclxuICAgICQoJy5wYWxldHRlW3RpdGxlPVwiQnVZbEJ1XCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFjdGl2ZVNjYWxlXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHJldHVybkNvbG9yU2NhbGVcclxufSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG5sZXQgc3ZnTGVnZW5kOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgbGVnZW5kXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBncm91cCB0byB0aGUgc3ZnIHdoZXJlIHRoZSBsZWdlbmQgZm9yIHRoZSBjb2xvciBsZWdlbmQgaXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRTcGF0aWFsVmlld0dyb3VwKCkge1xyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gNTUwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDYwO1xyXG5cclxuICAgIHN2Z0xlZ2VuZCA9IGQzLnNlbGVjdCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLWxlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIGNvbG9yIGxlZ2VuZFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUxlZ2VuZCgpIHtcclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcbiAgICAvLyBsZXQgZGlmZmVyZW50Q29sb3JzID0gMDtcclxuXHJcbiAgICAvLyBTaG93IHRoZSBzdmcgZmlyc3Qgb2YgYWxsXHJcbiAgICAkKCcjbWFpbi12aXMtbGVnZW5kLWRpdicpLnNob3coKTtcclxuXHJcbiAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBhbmltYWxzXHJcbiAgICBpZiAoYWN0aXZlU2NhbGUgIT09ICdibGFjaycpIHtcclxuICAgICAgICB2YXIgdG1wU2NhbGUgPSByZXR1cm5Db2xvclNjYWxlKCk7XHJcbiAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUucmFuZ2UoKSk7XHJcblxyXG4gICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUuZG9tYWluKCkpO1xyXG4gICAgICAgIC8vIGRpZmZlcmVudENvbG9ycyA9IHRtcFNjYWxlLnJhbmdlKClcclxuICAgICAgICAvLyAubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAvLyBoaWRlIHRoZSBkaXYgYWdhaW5cclxuICAgICAgICAkKCcjbWFpbi12aXMtbGVnZW5kLWRpdicpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDUgaGFzIHRvIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCArIDUpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgU2V0Ki9cclxuXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBicnVzaGVuZCxcclxuICAgIHNsaWRlclxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmQsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yLFxyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEsXHJcbiAgICBjb2xvck1ldGFkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldE5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBzZXROZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc2V0TmV0d29ya0RhdGEsXHJcbiAgICBzZXRIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBnZXREYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtEYXRhLFxyXG4gICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNvbG9yU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZEhpZXJhcmNoeUJ1dHRvbixcclxuICAgIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbixcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbWF4TnVtYmVySGllcmFyY2hpZXMsXHJcbiAgICBzZXRTZXRPcGVyYXRpb25cclxufSBmcm9tICcuL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VHJhY2tpbmdCb29sZWFuLFxyXG4gICAgcmVzZXRUcmFja2VkRGF0YSxcclxuICAgIHNlbmRUcmFja2VkRGF0YVxyXG59IGZyb20gJy4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5sZXQgYnJ1c2g7IC8vIGJydXNoaW5nIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgcGxheUJvb2xlYW4gPSB0cnVlOyAvLyBwYXVzZSBhbmQgcGxheSBib29sZWFuXHJcblxyXG4vKipcclxuICogSW5pdCBhbGwgdGhlIGxpc3RlbmVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjcF9saXN0ZW5lcigpO1xyXG4gICAgc2ZfbGlzdGVuZXJzKCk7XHJcbiAgICBhZl9saXN0ZW5lcnMoKTtcclxuICAgIG1kX2xpc3RlbmVycygpO1xyXG4gICAgbl9saXN0ZW5lcnMoKTtcclxuICAgIGhfbGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGNvbnRyb2wgcGFuZWwgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBjcF9saXN0ZW5lcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgb3Igc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUoc2xpZGVyLnNsaWRlcigndmFsdWUnKSk7XHJcbiAgICAgICAgICAgICQoJy5icnVzaCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGF1c2UgdGhlIGFuaW1hdGlvbiBhbmQgc2hvdyBvbmx5IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXh0LWZyYW1lLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJydXNoaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy9zdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoISQoJyNicnVzaGluZy1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9kZWZpbmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGJydXNoID0gZDMuYnJ1c2goKVxyXG4gICAgICAgICAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtTUFYudGFua1dpZHRoLCBTUFYudGFua0hlaWdodF1cclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsIGJydXNoZW5kKTtcclxuICAgICAgICAgICAgLy9hZGQgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpXHJcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2VsZWN0IGFsbCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZUFuaW1hbHMoW10pO1xyXG4gICAgICAgICAgICAvLyB0cmFja2luZyBvZiBkYXRhIGZvciB2aXN1YWwgcGFyYW1ldGVyIHN1Z2dlc3Rpb25cclxuICAgICAgICAgICAgcmVzZXRUcmFja2VkRGF0YSgpO1xyXG4gICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG5cclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNrIHZpc3VhbCBwYXJhbWV0ZXIgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUcmFja2luZ0Jvb2xlYW4odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIHRoZSB0cmFja2VkIHZpYSBhIGFqYXggcXVlcnkgdG8gdGhlIHNlcnZlciB0byBjYWxjdWxhdGUgdGhlIHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKGZhbHNlKTtcclxuICAgICAgICAgICAgc2VuZFRyYWNrZWREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGJvdGggYnV0dG9ucyBhbmQgcmVtb3ZlIHRoZSBhY3RpdmUgb25lXHJcbiAgICAgICAgICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BhdGlhbCB2aWV3IGJhY2tncm91bmQgY29sb3JcclxuICAgICAqL1xyXG4gICAgJCgnI2JhY2tncm91bmQtY29sb3InKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLWJhY2tncm91bmQ6Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgICQoJyNtYWluLXZpcy1zdmcnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIHNwYXRpYWwgdmlldyBheGlzIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1heGlzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgZnJhbWUgKHRpbWUpIG51bWJlciBpbiB0aGUgc3BhdGlhbCB2aWV3IGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10aW1lJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIC5mcmFtZS10ZXh0Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWUtdGV4dCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIFNjYWxlIEZ1bmN0aW9uIFJhZGlvIGJ1dHRvbnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0gaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JTY2FsZVsndHlwZSddID0gJCgnaW5wdXRbbmFtZT1jb2xvci1zY2FsZS1yYWRpb106Y2hlY2tlZCcsICcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybScpLnZhbCgpO1xyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBzd2FybSBmZWF0dXJlcyBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIHNmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlyZWN0aW9uIGFycm93IG9mIHRoZSBhbmltYWxcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlyZWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdkaXJlY3Rpb24nIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgZGlyZWN0aW9uIGRhdGFcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdkaXJlY3Rpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5hcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmFycm93JylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IG1lZG9pZCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctbWVkb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LW1lZG9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoISgnbWVkb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdtZWRvaWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbChzd2FybURhdGFbU1BWLmluZGV4VGltZV1bJ21lZG9pZCddKTtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgbWVkb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgU1BWLm1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgZGlzcGxheSB0aGUgbWVkb2lkIGZpc2hcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnY2VudHJvaWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaGlkZSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2NpcmNsZS5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBjb252ZXggaHVsbCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctY29udmV4LWh1bGwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnaHVsbCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnY29udmV4X2h1bGwnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRyaWFuZ3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy10cmlhbmd1bGF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ3RyaWFuZ3VsYXRpb24nIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ3RyaWFuZ3VsYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB2b3Jvbm9pXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXZvcm9ub2knKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdm9yb25vaScpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd2b3Jvbm9pJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCd2b3Jvbm9pJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGFic29sdXRlIGZlYXR1cmUgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBhZl9saXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IFNwZWVkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1zcGVlZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1zcGVlZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ3NwZWVkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnc3BlZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdzcGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGFjY2VsZXJhdGlvbiBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBhY2NlbGVyYXRpb24gZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdhY2NlbGVyYXRpb24nIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgYWNjZWxlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnYWNjZWxlcmF0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uLWRldGFpbHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYWNjZWxlcmF0aW9uJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpc3RhbmNlIHRvIGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2Rpc3RhbmNlX2NlbnRyb2lkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdkaXN0YW5jZV9jZW50cm9pZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IG1pZGxpbmUgb2Zmc2V0XHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGRyYXctbWlkbGluZV9vZmZzZXQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdkcmF3LW1pZGxpbmVfb2Zmc2V0JyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIG1pZGxpbmVfb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnbWlkbGluZV9vZmZzZXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdtaWRsaW5lX29mZnNldCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBuZXR3b3JrIGxpc3RlZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIG5fbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keSBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV0d29ya19pZCA9ICQodGhpcykuYXR0cignZGF0YScpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIG5hbWUgb2YgdGhlIGNob29zZW4gbmV0d29yayB0byB0aGUgTmV0d29yayBtb2RhbFxyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgkKHRoaXMpLmF0dHIoJ25hbWUnKSk7XHJcblxyXG4gICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCk7XHJcbiAgICAgICAgJCgnI25ldHdvcmstZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXROZXR3b3JrRGF0YSh7fSk7XHJcblxyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYXV0byBidXR0b24gc2V0IGFjaXZlIG9yIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGxpbWl0ID0gJCgnI25ldHdvcmstc2xpZGVyJykuc2xpZGVyKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JMaW1pdChsaW1pdCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG1ldGFkYXRhIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbWRfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBzd2F0Y2ggZnVuY3Rpb25zIGNvbG9yaW5nIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gICAgICovXHJcbiAgICAkKCcubWV0YWRhdGEtc3dhdGNoLm1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IGNvbG9yUkdCID0gJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBzd2F0Y2ggcHJldmlld1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1yb3ctJyArIGlkICsgJyAjcHJldmlldycpXHJcbiAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvclJHQik7XHJcbiAgICAgICAgLy8gaWYgd2hpdGUgdGhhbiByZXNldCB0aGUgY29sb3JcclxuICAgICAgICBpZiAoY29sb3JSR0IgPT09ICdyZ2IoMjU1LCAyNTUsIDI1NSknKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YUNvbG9yW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhQ29sb3JbaWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltpZF0gPSBjb2xvclJHQjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGZ1bmN0aW9ucyBmb3IgaW5zdGFuY2UgY29sb3Igc2V4XHJcbiAgICAgKi9cclxuICAgICQoJyNncm91cC1tZXRhZGF0YSA6aW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIG1ldGFkYXQgYWNvbG9yaW5nXHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gbWV0YWRhdGEgc2V4IGlzIGNob29zZW4gLSBjb2xvcmluZyBiYXNlZCBvbiBtIGFuZCBmXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnc2V4Jykge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBhbmQgY29sb3IgaGVyZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXQgb2YgaW5kaXZpZHVhbCBzdHJpbmdzIGluIHNleFxyXG4gICAgICAgICAgICB0bXAgPSBBcnJheS5mcm9tKG5ldyBTZXQodG1wKSk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSA9PT0gdG1wW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgY29sb3JpbmcgdG8gdGhlIG1ldGFkYXRhY29sb3Igb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIC8vIHNldCB2YWx1ZXMgb2YgaW5wdXRzXHJcbiAgICAgICAgICAgIC8vIGhlcmUgYXJlIGF1dG9tYXRpY2FsbHkgaW5wdXQgdmFsdWVzIGNhbGN1bGF0ZWRcclxuICAgICAgICAgICAgLy8gLjI1IGFuZCAuNzUgcGVyY2VudGlsZXMgYXJlIHVzZWRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBibEF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC4yNSk7IC8vIGJlbG93IGF2ZXJhZ2UgdmFsdWVcclxuICAgICAgICAgICAgbGV0IGFiQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjc1KTsgLy8gYWJvdmUgYXZlcmFnZVxyXG4gICAgICAgICAgICAkKCcjYmwtYXZnJykudmFsKGJsQXZnKTtcclxuICAgICAgICAgICAgJCgnI2FiLWF2ZycpLnZhbChhYkF2Zyk7XHJcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICAgICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGlucHV0IHNwaW5uZXJcclxuICAgICAqICsvLSAwLjEgdG8gdGhlIGlucHV0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgb2xkVmFsdWUgPSBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwoKS50cmltKCksXHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChidG4uYXR0cignZGF0YS1kaXInKSA9PSAndXAnKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpICsgMC4xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpIC0gMC4xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKG5ld1ZhbCAqIDEwMCkgLyAxMDA7IC1cclxuICAgICAgICBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwobmV3VmFsKTtcclxuICAgICAgICAvLyBjaGFuZ2UgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBpbnB1dCBmaWVsZHMgY2hhbmdlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBtZXRhZGF0YSBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNtZXRhZGF0YS1yZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG59XHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGhpZXJhcmNoeS9kZW5kZ3JvZ3JhbSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGhfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRlbmRncm9ncmFtIHNsaWRpbmcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKSB7XHJcblxyXG4gICAgICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRCdXR0b25JRCA9ICQodGhpcykuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBidXR0b25zIGFuZCBjdXN0b20gaGlnaGxpZ2h0IGp1c3Qgb25lIG9yIG5vbmVcclxuICAgICAgICAgICAgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhY3RpdmUgZm91bmQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpZiAoJChidXR0b24pLmF0dHIoJ2lkJykgPT09IGNsaWNrZWRCdXR0b25JRCAmJiAkKGJ1dHRvbikuaGFzQ2xhc3MoJ2J0bi1wcmltYXJ5JykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLWxlZnQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tcmlnaHQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBhZGQgaGVyZSBhIHJlc2l6ZSBvZiB0aGUgbWFpbiB2aXNcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLmluc2VydEFmdGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSAvLyByZW1vdmUgaGlnaGxpZ2h0XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tbGVmdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1yaWdodCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG93IGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGllcmFyY2h5IGJ1dHRvbiBpbiBuZXR3b3JrIG1vZGFsIG9uIGNoYW5nZVxyXG4gICAgICogTG9hZCBkYXRhIG9yIHJlbW92ZSBpdFxyXG4gICAgICovXHJcbiAgICAkKCcuaGllYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gY2hlY2tib3guYXR0cignZGF0YScpO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2hlY2tib3guYXR0cignbmFtZScpO1xyXG4gICAgICAgIGxldCBjaGVja2VkID0gY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGFkZEhpZXJhcmNoeUJ1dHRvbihpZCwgbmFtZSk7XHJcbiAgICAgICAgICAgIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKTtcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01heCBudW1iZXIgb2YgaGllcmFyY2hpZXMgaXM6ICcgKyBtYXhOdW1iZXJIaWVyYXJjaGllcyk7XHJcbiAgICAgICAgLy9UT0RPIGltcGxlbWVudCB0aGlzIGhlcmVcclxuICAgICAgICAvLyBub3RpY2UgdXNlciB0aGF0IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBzaG93IG1vcmUgdGhhbiBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLy8gICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAvLyAgIDxzdHJvbmc+SW5mbyE8L3N0cm9uZz4gQXR0ZW50aW9uIHVzZXIgLlxyXG4gICAgICAgIC8vIDwvZGl2PlxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdG1wIHZhcmlhYmxlIHRvIHNhdmUgaWYgdGhlIGJ1dHRvbiB3aGljaCBpcyBnb2luZyB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIC8vIHdhcyBhY3RpdmVcclxuICAgICAgICAgICAgbGV0IHRtcEFjdGl2ZSA9ICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5oYXNDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgc2V0SGllcmFyY2h5RGF0YSh7fSwgaWQpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBmaW5kIGJldHRlciB3YXkgaGVyZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2cuaCcgKyBpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZGVuZHJvZ3JhbSBhbmQgdGhlIHBhbmVsIGlmIHRoZSByZW1vdmVkIGVsZW1lbnQgd2FzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKHRtcEFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNpemUgdGhlIG1haW4gc3ZnXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbGl6ZSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjaG9vc2VuIGhpZXJhcmNoeVxyXG4gICAgICovXHJcbiAgICAkKCcubmV0d29yay1oaWVyYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmZvIGZvciB0aGUgY2xpY2tlZCBidXR0b25cclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpO1xyXG4gICAgICAgIGxldCBpZCA9IGNoZWNrYm94LmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBsZXQgY2hlY2tlZCA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgYWxsIHRoZSBvdGhlciBhY3RpdmUgY2hlY2tib3hlc1xyXG4gICAgICAgICQoJy5uZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveCcpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2NoZWNrZWQnKSAmJiAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2RhdGEnKSAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICQoYnV0dG9uKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXR3b3JrIGlkXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkodW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZXJhcmNoeSBzZXQgdGhlb3J5IGJ1dHRvbnMgLSB1bmlvbiwgaW50ZXJzZWN0aW9uLCBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICovXHJcbiAgICAkKCcuc2V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBzZXRTZXRPcGVyYXRpb24oZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gPSA7XHJcblxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCBwbGF5IGJvb2xlYW5cclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIHBhdXNlIChmYWxzZSkgb3IgcGxheSAodHJ1ZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRQbGF5Qm9vbGVhbih2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saXN0ZW5lci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCQsIGQzLCBQb2x5Qm9vbCovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbmV0d29ya0hpZXJhcmNoeVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5kZXhUaW1lLFxyXG4gICAgYXJyYXlBbmltYWxzLFxyXG4gICAgc2V0QWN0aXZlQW5pbWFscyxcclxuICAgIGRlY0luZGV4VGltZSxcclxuICAgIGRyYXdcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNob3dOZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmxldCB6b29tR3JvdXA7IC8vIHpvb20gZ3JvdXAgZm9yIHRoZSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbmxldCB0cmVlbWFwO1xyXG5sZXQgdG9vbHRpcERpdjtcclxubGV0IHNwYXRpYWxWaWV3OyAvLyBnZXQgdGhlIHNwYXRpYWwgdmlldyBzdmcgZnJvbSB0aGUgbWFpbiB2aXNcclxubGV0IHN2Z0xlZ2VuZDtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXhOdW1iZXJIaWVyYXJjaGllcyA9IDQ7XHJcbmV4cG9ydCBsZXQgbmV0d29ya0hpZXJhcmNoeUlkcyA9IFtdO1xyXG5cclxubGV0IGhpZXJhcmNoeUxldmVscyA9IHt9O1xyXG5sZXQgaGllcmFyY2h5Q29sb3JzID0ge307XHJcblxyXG5sZXQgc2V0T3BlcmF0aW9uID0gJ3VuaW9uJztcclxuXHJcbi8vIFRPRE8gYWRkIG1vcmUgY29sb3JzXHJcbmxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnI2U3Mjk4YScsICcjZmY5OTAwJywgJyMzODZjYjAnXTtcclxuXHJcbmxldCBpZDsgLy8gbmVlZGVkIGZvciB0aGUgY29sbGFwc2UgZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBkZW5kcm9ncmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdERlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBjb25zdGFuY3QgZmFjdG9ycyBmb3IgdGhlIGRlbmRncm9ncmFtXHJcbiAgICBsZXQgbWFyZ2luID0gMjAsXHJcbiAgICAgICAgd2lkdGggPSA1MDAwLFxyXG4gICAgICAgIGhlaWdodCA9IDUwMDA7XHJcblxyXG4gICAgLy8gem9vbSBmdW5jdGlvbiBmb3IgdGhlIGRlbmRyb2dyYW1cclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCAxMF0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHdpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh3aWR0aCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueCkpO1xyXG5cclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnkgPSBNYXRoLm1pbigwLCBoZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KGhlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tcGFuZWwnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctZGVuZHJvZ3JhbS1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50LWRlbmRyb2dyYW0nLCB0cnVlKVxyXG4gICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSBncm91cCB0byB0aGUgc3ZnXHJcbiAgICB6b29tR3JvdXAgPSBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luICsgJywnICsgbWFyZ2luICsgJyknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJyk7XHJcblxyXG4gICAgLy8gZDMgdHJlZVxyXG4gICAgdHJlZW1hcCA9IGQzLnRyZWUoKSAvL2QzLmNsdXN0ZXIoKVxyXG4gICAgICAgIC5zaXplKFsoaGVpZ2h0IC0gMTAgKiBtYXJnaW4pLCAod2lkdGggLSAxMCAqIG1hcmdpbildKTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIHNwYXRpYWwgdmlldyAtIG5lZWRlZCB0byBhZGQgdGhlIGNsdXN0ZXJpbmcgdG8gdGhlIHNwYXRpYWwgdmlldyB3aW5kb3dcclxuICAgIHNwYXRpYWxWaWV3ID0gZDMuc2VsZWN0KCcudGFuaycpO1xyXG5cclxuICAgIC8vIGluaXQgZGVuZHJvZ3JhbSBzbGlkZXJcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIE5ldHdvcmsgc2xpZGVyXHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1pbjogMixcclxuICAgICAgICAgICAgbWF4OiAyLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgICAgICB2YWx1ZTogaGllcmFyY2h5TGV2ZWxzWydoMCddLFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgc2V0SGllcmFyY2h5TGV2ZWwoaWQsIHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZURlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGFuaW1hdGlvbiBpcyBhY3RpdmUgZHJhdyB0aGUgbmV3IGNsdXN0ZXJpbmcgYW5kIGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgICAgIC8vIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gaW5pdCB0aGUgdG9vbHRpcCBmb3IgdGhlIGRlbmRyb2dyYW1cclxuICAgIHRvb2x0aXBEaXYgPSBkMy5zZWxlY3QoJyNkZW5kcm9ncmFtLXRvb2x0aXAnKVxyXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5zdHlsZSgndG9wJywgMCArICdweCcpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9vbHRpcERpdlxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBpbml0IHRoZSBoaWVyYXJjaHkgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSBtYXhOdW1iZXJIaWVyYXJjaGllcyAqIDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA2MDtcclxuXHJcbiAgICBzdmdMZWdlbmQgPSBkMy5zZWxlY3QoJyNoaWVyYXJjaHktbGVnZW5kLWRpdicpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnaGllcmFyY2h5LWxlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodCk7XHJcblxyXG4gICAgLy8gYWRkIHBhdHRlcm4gZm9yIHN0cmlwZWQgYmFja2dyb3VuZCBvZiBpbnRlcnNlY3Rpb25zIGV0Yy5cclxuICAgIHNwYXRpYWxWaWV3LmFwcGVuZCgnZGVmcycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdHRlcm4nKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdzdHJpcGVkJylcclxuICAgICAgICAuYXR0cigncGF0dGVyblVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCAnMjAnKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnNScpXHJcbiAgICAgICAgLmF0dHIoJ3BhdHRlcm5UcmFuc2Zvcm0nLCAncm90YXRlKDYwKScpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgNSlcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgMTApXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwwKScpXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgJyM2NzAwMGQnKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3IHRoZSBkZW5kZ3JvZ3JhbSBmb3Igb25lIHN0ZXBcclxuICogRnVydGhlciBjYWxscyB0aGUgZHJhd0hpZXJhcmNoeSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdEZW5kcm9ncmFtKCkge1xyXG4gICAgLy8gZ2V0IHRoZSBhY3RpdmUgZGVuZHJvZ3JhbVxyXG4gICAgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG4gICAgLy8gaWYgZGF0YSBpcyBhdmFpYWJsZSBkcmF3IGhpZXJhcmNoeSBjbHVzdGVycyBhbmQgYSBidXR0b24gaXMgYWN0aXZlIHNlbGN0ZWRcclxuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG5ldHdvcmtIaWVyYXJjaHkpICYmIGlkKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YSBhbmQgdHJhbnNmb3JtIGl0XHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBpZF1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gc2tpcCB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgbm9kZXMgPSBub2Rlcy5jaGlsZHJlblswXTtcclxuICAgICAgICAvLyBjb2xsYXBzZSB0aGUgdHJlZVxyXG4gICAgICAgIG5vZGVzLmNoaWxkcmVuLmZvckVhY2goY29sbGFwc2UpO1xyXG5cclxuICAgICAgICAvLyBtYXBzIHRoZSBub2RlIGRhdGEgdG8gdGhlIHRyZWUgbGF5b3V0XHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBpZiBubyBuZXR3b3JrIGlzIGNob29zZW5cclxuICAgICAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgc2xpZGVyIG1heFxyXG4gICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlcignb3B0aW9uJywgJ21heCcsIChub2Rlc1snaGVpZ2h0J10gLSAxKSlcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ3ZhbHVlJywgaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBsaW5rcyAoZWRnZXMpXHJcbiAgICAgICAgICAgIGxldCBsaW5rID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKS5zbGljZSgxKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFTlRFUlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBsaW5rcyB0byB0aGVpciBuZXcgcG9zaXRpb24uXHJcbiAgICAgICAgICAgIGxpbmtcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIGxpbmsuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBub2Rlc1xyXG4gICAgICAgICAgICAvLyBhZGRzIGVhY2ggbm9kZSBhcyBhIGdyb3VwXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubm9kZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBzIHRvIHRoZSBkZW5kZ3JvZ3JhbVxyXG4gICAgICAgICAgICB2YXIgbm9kZUVudGVyID0gbm9kZS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vZGUnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGQuY2hpbGRyZW4gPyAnIG5vZGUtLWludGVybmFsJyA6ICcgbm9kZS0tbGVhZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVIgLSBhcHBlbmQgZm9yIGVhY2ggZ3JvdXAgYSBub2RlIChjaXJjbGUpXHJcbiAgICAgICAgICAgIC8vIHdpdGggaGlnaGxpZ2h0aW5nIGZvciB0aGUgYWN0aXZlIGNob29zZW4gbGV2ZWxcclxuICAgICAgICAgICAgbm9kZUVudGVyLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA0MCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gZmluZCBhIG5pY2UgZnVuY3Rpb24gZm9yIHRoZSBvbiBjbGljayBtZXRob2RcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGljaylcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvb2x0aXAgcG9zaXRpb24gYW5kIHRleHRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYuc2VsZWN0KCcudG9vbHRpcC1zcGFuJykuaHRtbChkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyBtYWtlIHRoaXMgd29yayBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcjaHAnICsgZFsnZGF0YSddWyduYW1lJ10uam9pbignJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2hwJyArIGRbJ2RhdGEnXVsnbmFtZSddLmpvaW4oJycpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC5jbGFzc2VkKCdoaWdobGlnaHQtaGllcmFyY2h5JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGVhY2ggYW5pbWFsIGluIHRoZSBjbHVzdGVyIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRbJ2RhdGEnXVsnbmFtZSddLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2FuaW1hbC0nICsgZFsnZGF0YSddWyduYW1lJ11baV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnI2M1MWI3ZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIHdvcmsgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzcGF0aWFsVmlldy5zZWxlY3QoJyNocCcgKyBkWydkYXRhJ11bJ25hbWUnXS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuY2xhc3NlZCgnaGlnaGxpZ2h0LWhpZXJhcmNoeScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaGlnaGxpZ2h0IGVhY2ggYW5pbWFsIGluIHRoZSBjbHVzdGVyIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRbJ2RhdGEnXVsnbmFtZSddLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2FuaW1hbC0nICsgZFsnZGF0YSddWyduYW1lJ11baV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnIzAwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0tIHVwZGF0ZSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIG5vZGVFbnRlclxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhZSB0aGUgbm9kZSBhbmQgY2lyY2xlc1xyXG4gICAgICAgICAgICAvLyB3aXRoIGFjdGl2ZS1sZXZlbCBmdW5jdGlvbiB0byBoaWdobGlnaHQgd2hpY2ggbGV2ZWwgaXMgY2hvc2VuXHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDQwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyMCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYWN0aXZlLWxldmVsJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIG5vZGUuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCEkLmlzRW1wdHlPYmplY3QobmV0d29ya0hpZXJhcmNoeSkpIHtcclxuICAgICAgICAvLyBkcmF3IHRoZSBoaWVyYXJjaHkgaW4gc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgZHJhd0hpZXJhcmNoeSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29sbGFwc2UgZnVuY3Rpb24gLSBvbmx5IHNob3cgdGhlIGFjdGl2ZSBsZXZlbCBhbmQgb25lIHN1YiBsZXZlbFxyXG4gKi9cclxuZnVuY3Rpb24gY29sbGFwc2UoZCkge1xyXG4gICAgaWYgKGQuY2hpbGRyZW4gJiYgZC5kZXB0aCA8PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgZC5fY2hpbGRyZW4gPSBkLmNoaWxkcmVuO1xyXG4gICAgICAgIGQuX2NoaWxkcmVuLmZvckVhY2goY29sbGFwc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkLmNoaWxkcmVuID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXcgdGhlIGFsbCBoaWVyYXJjaGllcyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIGFkZCBhIGdyb3VwIHdpdGggdGhlIGlkcyBvZiB0aGUgYW5pbWFscyBpbiBpdCB0byB0aGUgdmlld1xyXG4gKiB3aXRoIHBhdGggY2hpbGQgZWxlbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIGRyYXdIaWVyYXJjaHkoKSB7XHJcbiAgICAvLyBpZCBvZiB0aGUgaGllcmFyY2h5IGUuZy4gWzEsNSwzXVxyXG4gICAgbGV0IGhpZXJhcmNoeUlkcyA9IE9iamVjdC5rZXlzKG5ldHdvcmtIaWVyYXJjaHkpLm1hcChmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHgucmVwbGFjZSgnaCcsICcnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gIFRoZSBjbHVzdGVyaW5nIGluIGFuIDJEIGFycmF5IHdpdGggd2hpY2ggYW5pbWFsIGlkIGJlbG9uZ3MgdG8gd2hpY2ggZ3JvdXBcclxuICAgIGxldCBoaWVyYXJjaHlWZXJ0aWNlcyA9IFtdO1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2h5IGRhdGEgdG8gZ2V0IHRoZSBoaWVyYXJjaHkgYW5pbWFsIGlkcyBwZXIgY2x1c3RlcmluZyBhbmQgZ3JvdXBpbmdcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGllcmFyY2h5SWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBoaWVyYXJjaHlJZHNbaV1dW2luZGV4VGltZV07XHJcbiAgICAgICAgbGV0IG5vZGVzID0gZDMuaGllcmFyY2h5KHRyZWVEYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBub2RlcyA9IHRyZWVtYXAobm9kZXMpO1xyXG4gICAgICAgIGxldCByb290ID0gbm9kZXNbJ2NoaWxkcmVuJ11bMF07XHJcbiAgICAgICAgaWYgKHNob3dOZXR3b3JrSGllcmFyY2h5ID09PSBoaWVyYXJjaHlJZHNbaV0pIHtcclxuICAgICAgICAgICAgbmV0d29ya0hpZXJhcmNoeUlkcyA9IGdldEhpZXJhcmNoeUxldmVsKHJvb3QsIGhpZXJhcmNoeUlkc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFkZCB0aGUgdmVydGljZXMgaW50byB0aGUgYXJyYXlcclxuICAgICAgICBoaWVyYXJjaHlWZXJ0aWNlcy5wdXNoKGdldEhpZXJhcmNoeVZlcnRpY2VzKGdldEhpZXJhcmNoeUxldmVsKHJvb3QsIGhpZXJhcmNoeUlkc1tpXSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBtb3JlIHRoYW4gMiBoaWVyYXJjaGllcyBhcmUgZHJhd25cclxuICAgIGlmIChoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gdW5pb24gdGhlIGxpc3Qgb2YgcG9seWdvbnMgdG8gb25lIHBvbHlnb25cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpZXJhcmNoeUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBoaWVyYXJjaHlWZXJ0aWNlc1tpXSA9IHVuaW9uUG9seWdvbnMoaGllcmFyY2h5VmVydGljZXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdHJhbnNmb3JtIGFuZCBjYWxjdWxhdGUgdGhlIGludGVyc2VjdGlvbiBwb2x5Z29ucyBvZiB0aGUgbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vIHRlbXAgc29sdXRpb24gb2YgdHdvIGludGVyc2VjdGlvbnNcclxuICAgICAgICAgICAgbGV0IHRtcEludGVyc2VjdGlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSBQb2x5Qm9vbC5pbnRlcnNlY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IHRtcEludGVyc2VjdGlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gdG1wSW50ZXJzZWN0aW9uWydyZWdpb25zJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlc3VsdFxyXG4gICAgICAgICAgICBoaWVyYXJjaHlWZXJ0aWNlcyA9IFt0bXBJbnRlcnNlY3Rpb25dO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0cmFuc2Zvcm0gYW5kIGNhbGN1bGF0ZSB0aGUgc3ltbWV0cmljIGRpZmZlcmVuY2UgcG9seWdvbnMgb2YgdGhlIG4gaGllcmFyY2hpZXNcclxuICAgICAgICBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgLy8geG9yID0gVW5pb24gb2YgYWxsIGhpZXJhcmNoaWVzIC0gaW50ZXJzZWN0aW9uIG9mIGFsbCBoaWVyYXJjaGllc1xyXG4gICAgICAgICAgICAvLyB0ZW1wIHNvbHV0aW9uIG9mIHR3byBpbnRlcnNlY3Rpb25zXHJcbiAgICAgICAgICAgIGxldCB0bXBJbnRlcnNlY3Rpb24gPSBoaWVyYXJjaHlWZXJ0aWNlc1swXTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaGllcyBhbmQgaW50ZXJzZWN0IGFsbCBvZiB0aGVtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gUG9seUJvb2wuaW50ZXJzZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBJbnRlcnNlY3Rpb24sIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogaGllcmFyY2h5VmVydGljZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IHRtcEludGVyc2VjdGlvblsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGludGVyc2VjdGlvbiByZXN1bHRcclxuICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbkhpZXJhcmNoeVBvbHlnb25zID0gdG1wSW50ZXJzZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gdW5pb25cclxuICAgICAgICAgICAgbGV0IHRtcFVuaW9uID0gaGllcmFyY2h5VmVydGljZXNbMF07XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2hpZXMgYW5kIGludGVyc2VjdCBhbGwgb2YgdGhlbVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHRtcFVuaW9uID0gUG9seUJvb2wudW5pb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IHRtcFVuaW9uLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICB0bXBVbmlvbiA9IHRtcFVuaW9uWydyZWdpb25zJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHVuaW9uSGllcmFyY2h5UG9seWdvbnMgPSB0bXBVbmlvbjtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICAgICAgICBsZXQgdG1wRGlmZmVyZW5jZSA9IFBvbHlCb29sLnhvcih7XHJcbiAgICAgICAgICAgICAgICByZWdpb25zOiB1bmlvbkhpZXJhcmNoeVBvbHlnb25zLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGludGVyc2VjdGlvbkhpZXJhcmNoeVBvbHlnb25zLFxyXG4gICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgIHRtcERpZmZlcmVuY2UgPSB0bXBEaWZmZXJlbmNlWydyZWdpb25zJ107XHJcbiAgICAgICAgICAgIC8vIHJlc3VsdFxyXG4gICAgICAgICAgICBoaWVyYXJjaHlWZXJ0aWNlcyA9IFt0bXBEaWZmZXJlbmNlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gREFUQSBKb2luXHJcbiAgICBsZXQgaGllcmFyY2hpZXMgPSBzcGF0aWFsVmlld1xyXG4gICAgICAgIC5zZWxlY3RBbGwoJ2cuaGllcmFyY2h5LWdyb3VwJylcclxuICAgICAgICAuZGF0YShoaWVyYXJjaHlWZXJ0aWNlcyk7XHJcblxyXG4gICAgLy8gRU5URVIgdGhlIGdyb3VwcyAtIGFkZHMgYSBzcGVjaWZpYyBpZCBhbmQgY29sb3JcclxuICAgIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBpbnRlcnNlY3Rpb24nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ3N5bS1kaWZmZXJlbmNlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgc3ltLWRpZmZlcmVuY2UnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaCcgKyBoaWVyYXJjaHlJZHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHlJZHNbaV1dO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHlJZHNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIFVQREFURSAtIHRoZSBjbGFzcyBuZWVkZWQgZm9yIGludGVyc2VjdGlvbiBhbmQgc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgIGhpZXJhcmNoaWVzLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGludGVyc2VjdGlvbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgc3ltLWRpZmZlcmVuY2UnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGgnICsgaGllcmFyY2h5SWRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVRcclxuICAgIGhpZXJhcmNoaWVzLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyBIaWVyYWNoeSBodWxscyBhZGRlZCB0byB0aGUgc3BhdGlhbCB2aWV3IC0gZ2V0IHRoZSBwb2ludHMgZm9yIGVhY2ggYW5pbWFsIGluIHRoZVxyXG4gICAgLy8gc3BhdGlhbCB2aWV3IHNvIHRoYXQgYSBjb252ZXggaHVsbCBjYW4gYmUgY2FsY3VsYXRlZFxyXG4gICAgbGV0IGhpZXJhcnlIdWxscyA9IGhpZXJhcmNoaWVzLnNlbGVjdEFsbCgncGF0aC5oaWVyYXJjaHktaHVsbC1wYXRoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVOVEVSIGFuZCBjYWxjdWxhdGUgdGhlIGNvbnZleCBodWxsXHJcbiAgICBoaWVyYXJ5SHVsbHNcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgIC8vIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuICdocCcgKyBkLmpvaW4oJycpLnJlcGxhY2UoLywvZywgJycpO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZXJhcmNoeS1odWxsLXBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZHJhd0xpbmUoZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnTScgKyBkLmpvaW4oJ0wnKSArICdaJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBVUERBVEUgdGhlIGNvbnZleCBodWxsXHJcbiAgICBoaWVyYXJ5SHVsbHNcclxuICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGRyYXdMaW5lKGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCdMJykgKyAnWic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAvLyByZXR1cm4gJ2hwJyArIGQuam9pbignJykucmVwbGFjZSgvLC9nLCAnJyk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vIEVYSVRcclxuICAgIGhpZXJhcnlIdWxscy5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVW5pb24gbXVsdGlwbGUgcG9seWdvbnMgdG9nZXRoZXIgLSBuZWVkZWQgb3IgZWxzZSB0aGVyZSB3aWxsIGJlIGhvbGVzIGluIHRoZSBpbnRlcnNlY3Rpb25zXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHBvbHlnb25zIC0gYXJyYXkgb2YgYXJyYXkgb2YgcG9pbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiB1bmlvblBvbHlnb25zKHBvbHlnb25zKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwb2x5Z29ucyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvbHlnb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcG9seWdvbnNbaV0gPSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbnM6IFtwb2x5Z29uc1tpXV0sXHJcbiAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIHVuaW9uIGEgbGlzdCBvZiBwb2x5Z29ucyB0b2dldGhlclxyXG4gICAgbGV0IHNlZ21lbnRzID0gUG9seUJvb2wuc2VnbWVudHMocG9seWdvbnNbMF0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2x5Z29ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzZWcyID0gUG9seUJvb2wuc2VnbWVudHMocG9seWdvbnNbaV0pO1xyXG4gICAgICAgIGxldCBjb21iID0gUG9seUJvb2wuY29tYmluZShzZWdtZW50cywgc2VnMik7XHJcbiAgICAgICAgc2VnbWVudHMgPSBQb2x5Qm9vbC5zZWxlY3RVbmlvbihjb21iKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQb2x5Qm9vbC5wb2x5Z29uKHNlZ21lbnRzKVsncmVnaW9ucyddO1xyXG59XHJcblxyXG4vKipcclxuICogRWRnZSBkcmF3aW5nIG1ldGhvZCBvZiB0aGUgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZCAtIFRyZWVtYXAgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gZGlhZ29uYWxMaW5lcyhkKSB7XHJcbiAgICByZXR1cm4gJ00nICsgZC54ICsgJywnICsgZC55ICtcclxuICAgICAgICAnVicgKyBkLnBhcmVudC55ICsgJ0gnICsgZC5wYXJlbnQueDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNsaWNrIGZ1bmN0aW9uIC0gaGlnaGxpZ2h0IHRoZSBlbGVtZW50cyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkIC0gVHJlZW1hcCBlbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGljayhkKSB7XHJcbiAgICBzZXRBY3RpdmVBbmltYWxzKGRbJ2RhdGEnXVsnbmFtZSddKTtcclxuICAgIC8vIGlmIG5vIGFuaW1hdGlvbiBpcyBhY3RpdmUgZHJhdyB0aGUgZHJhdyBvbmUgc3RlcFxyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICBkZWNJbmRleFRpbWUoKTtcclxuICAgICAgICBkcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHRoZSBjbHVzdGVyaW5nIG9mIGEgc3BlY2lmaWMgbGV2ZWwgaW4gdGhlIGRlbmRyb2dyYW0gdHJlZVxyXG4gKiBGb3IgaW5zdGFuY2UgYWxsIGNsdXN0ZXJzIGZyb20gbGV2ZWwgNVxyXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdCAtIFJvb3Qgb2YgdGhlIHRyZWVtYXBcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZWFyY2h5IC0gTnVtYmVyIG9mIGhpZXJhcmNoeSBmcm9tIFswLTNdXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHkpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGxldCBsZXZlbCA9IGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldO1xyXG5cclxuICAgIC8vIHNlY29uZCBsZXZlbCBvZiB0aGUgYXJyYXlcclxuICAgIGxldCB0bXBfbm9kZXMgPSByb290WydjaGlsZHJlbiddO1xyXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSB0cmVlXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvb3RbJ2hlaWdodCddOyBpKyspIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgYXQgdGhlIHNlYXJjaGVkIGxldmVsXHJcbiAgICAgICAgaWYgKHRtcF9ub2Rlc1swXSAmJiB0bXBfbm9kZXNbMF1bJ2RlcHRoJ10gPT09IGxldmVsKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCBlYWNoIGNsdXN0ZXIgdG8gdGhlIHJlc3VsdCBzZXRcclxuICAgICAgICAgICAgdG1wX25vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlWydkYXRhJ11bJ25hbWUnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlWydkYXRhJ11bJ25hbWUnXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiBvZiBhIHNwZWNpZmljIGxldmVsIGluIHRoZSB0cmVlXHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG4gICAgICAgIHRtcF9ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlWydjaGlsZHJlbiddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdG1wID0gdG1wLmNvbmNhdChub2RlWydjaGlsZHJlbiddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRtcF9ub2RlcyA9IHRtcDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHNwZWNpZmljIHZlcnRpY2VzIG9mIGEgY2x1c3RlcmluZyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiBwb2ludHMgW1t4LHldW3gseV0uLi5dXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGhpZXJhcmNoaWVzIC0gQXJyYXkgb2YgYXJyYXlzIHdpdGggZWFjaCBhcnJheSBjb250YWlucyBhbGwgdGhlIGlkcyBmb3IgYSBzcGVjaWZpYyBjbHVzdGVyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIaWVyYXJjaHlWZXJ0aWNlcyhoaWVyYXJjaGllcykge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdOyAvLyByZXN1bHQgc2V0XHJcbiAgICBoaWVyYXJjaGllcy5mb3JFYWNoKGZ1bmN0aW9uKGNsdXN0ZXIpIHtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBbXTsgLy8gdmVydGljZXMgb2YgdGhlIGNsdXN0ZXJzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNsdXN0ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyb3VwTWVtYmVyID0gYXJyYXlBbmltYWxzLmZpbmQoZCA9PiBkWydhJ10gPT09IGNsdXN0ZXJbal0pO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXBNZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goW2dyb3VwTWVtYmVyWydwJ11bMF0sIC1ncm91cE1lbWJlclsncCddWzFdXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQW5kcmV3IG1vbnRvbmUgY2hhaW4gYWxnb3JpdGhtIHJldXRybnMgZm9yIHBvaW50cyBmZXdlciB0aGFuIDMgbnVsbFxyXG4gICAgICAgIGlmICh2ZXJ0aWNlcy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChkMy5wb2x5Z29uSHVsbCh2ZXJ0aWNlcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYWN0aXZlIGxldmVsIGZvciBhIHNwZWNpZmljIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeSBjYW4gYmUgZnJvbSBbMC0zXVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgLSBOZXcgYWN0aXZlIGxldmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGllcmFyY2h5TGV2ZWwoaGllcmFyY2h5LCBsZXZlbCkge1xyXG4gICAgLy8gVE9ETyBjYXRjaCBjYXNlcyA8IDAgYW5kIGJpZ2dlciB0aGFuIG92ZXJhbGwgaGVpZ2h0XHJcbiAgICBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XSA9IGxldmVsO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBlbnRyeSBmb3IgdGhlIGhpZXJhcmNoIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlMZXZlbChoaWVyYXJjaHkpIHtcclxuICAgIC8vIFRPRE8gY2F0Y2ggY2FzZXMgPCAwIGFuZCBiaWdnZXIgdGhhbiBvdmVyYWxsIGhlaWdodFxyXG4gICAgZGVsZXRlIGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBhY3RpdmUgY29sb3IgZm9yIGEgc3BlY2lmaWMgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5IGNhbiBiZSBmcm9tIFswLTNdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGllcmFyY2h5Q29sb3IoaGllcmFyY2h5KSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0bXBfYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGhpZXJhcmNoeUNvbG9ycykge1xyXG4gICAgICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnNba2V5XSA9PT0gY29sb3JzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX2Jvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG1wX2Jvb2xlYW4pIHtcclxuICAgICAgICAgICAgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBjb2xvciBmb3IgdGhlIGhpZXJhcmNoIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlDb2xvcihoaWVyYXJjaHkpIHtcclxuICAgIGRlbGV0ZSBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgaGllcmFyY2h5IGJ1dHRvbiB0byB0aGUgZGl2XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEhpZXJhcmNoeSBvZiB0aGUgaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOZXcgYWN0aXZlIGxldmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkSGllcmFyY2h5QnV0dG9uKGlkLCBuYW1lKSB7XHJcbiAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5hcHBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwic2hvdy1kZW5kcm9ncmFtLScgKyBpZCArICdcIiBkYXRhPScgKyBpZCArICcgbmFtZT0nICsgbmFtZSArXHJcbiAgICAgICAgICAgICcgY2xhc3M9XCJzaG93LWRlbmRyb2dyYW0gYnRuIGJ0bi1ibG9ja1wiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nICtcclxuICAgICAgICAgICAgJyA8c3BhbiBjbGFzcz1cImJ0bi1sYWJlbFwiIGlkPVwiYnRuLWxlZnRcIj4gPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tbGVmdFwiPjwvaT4mbmJzcCZuYnNwIFNob3cgJyArIG5hbWUgKyAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJidG4tbGFiZWwgaGlkZGVuXCIgaWQ9XCJidG4tcmlnaHRcIj4gPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHRcIj48L2k+Jm5ic3AmbmJzcCBIaWRlICcgKyBuYW1lICsgJyA8L3NwYW4+PC9idXR0b24+IDxicj4nXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHNwZWNpZmljIGhpZXJhcmNoeSBidXR0b24gdG8gdGhlIGRpdlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgLSBIaWVyYXJjaHkgb2YgdGhlIGlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGZvbGxvd2luZyBsaW5lIGJyZWFrIGFuZCBlbGVtZW50XHJcbiAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkubmV4dCgpLnJlbW92ZSgpO1xyXG4gICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLnJlbW92ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIHNsaWRlciBhbmQgdGV4dCBpbiB0aGUgZGVuZHJvZ3JhbSBwYW5lbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBnZXQgdGhlIGltcG9ydGFudCBpbmZvXHJcbiAgICBsZXQgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG4gICAgbGV0IG5hbWUgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignbmFtZScpO1xyXG4gICAgLy8gc2V0IHRoZSBuYW1lIG9mIHRoZSBkaXNwbGF5ZWQgaGllcmFyY2h5XHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1uYW1lJykudGV4dChuYW1lKTtcclxuXHJcbiAgICAvLyBzZXQgc2xpZGVyIGFuZCAgdGV4dCB2YWx1ZVxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJykudmFsKGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtdGV4dCcpLnRleHQoaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIGhpZXJhcmNoeSBsZWdlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hXaWR0aCA9IDUwO1xyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaEhlaWdodCA9IDIwO1xyXG5cclxuICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgc3ZnIGVsZW1lbnRcclxuICAgIGlmIChPYmplY3Qua2V5cyhoaWVyYXJjaHlDb2xvcnMpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICQoJyNoaWVyYXJjaHktbGVnZW5kLWRpdicpLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2JykuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsZWdlbmREYXRhID0gW107XHJcbiAgICBsZXQgbGVnZW5kVGV4dERhdGEgPSBbXTtcclxuICAgIC8vIGdldCB0aGUgcmVxdWlyZWQgZGF0YVxyXG4gICAgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGF0YSBpcyBub3QgdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9yc1snaCcgKyAkKG9iaikuYXR0cignZGF0YScpXSAhPSBudWxsICYmICQob2JqKS5hdHRyKCduYW1lJykgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZWdlbmREYXRhLnB1c2goaGllcmFyY2h5Q29sb3JzWydoJyArICQob2JqKS5hdHRyKCdkYXRhJyldKTtcclxuICAgICAgICAgICAgbGVnZW5kVGV4dERhdGEucHVzaCgkKG9iaikuYXR0cignbmFtZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEQVRBIEpPSU5cclxuICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShsZWdlbmREYXRhKTtcclxuICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAuZGF0YShsZWdlbmRUZXh0RGF0YSk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIExlZ2VuZCBzd2F0Y2hlcyAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFN3YXRjaFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgMi41ICogaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gVGV4dCAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgMi41ICogaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzZXQgb3BlcmF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRpb24gLSBlLmcuIFwidW5pb25cIiBcImludGVyc2VjdGlvblwiIFwic3ltLWRpZmZlcmVuY2VcIlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNldE9wZXJhdGlvbih2YWx1ZSkge1xyXG4gICAgc2V0T3BlcmF0aW9uID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGllcmFyY2h5LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsIHBhcmFtZXRlcnMgKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBnZXRTdWdnZXN0ZWRQYXJhbWV0ZXJzXHJcbn0gZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFBsYXlCb29sZWFuXHJcbn0gZnJvbSAnLi9saXN0ZW5lci5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCB0cmFja2luZ0Jvb2xlYW4gPSBmYWxzZTsgLy8gYm9vbGVhbiBmb3IgYWN0aXZlIHRyYWNraW5nXHJcbmxldCB0cmFja2VkRGF0YSA9IFtdO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGJvb2xlYW4gdmFsdWUgaWYgdHJhY2tpbmcgc2hvdWxkIGJlIGFjdGl2YXRlZFxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gQm9vbGVhbiBmb3IgYWN0aXZlIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0VHJhY2tpbmdCb29sZWFuKHZhbHVlKSB7XHJcbiAgICB0cmFja2luZ0Jvb2xlYW4gPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc2V0cyB0aGUgdHJhY2tlZCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRUcmFja2VkRGF0YSgpIHtcclxuICAgIHRyYWNrZWREYXRhID0gW107XHJcbiAgICB0cmFja2luZ0Jvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIGRpc2FibGUgdGhlIHNlbmQgYnV0dG9uXHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGRhdGEgdG8gdHJhY2tlZERhdGFcclxuICogQHBhcmFtIHtOdW1lcmljfSB0aW1lIC0gdGltZSBvZiB0aGUgZnJhbWVcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIEFycmF5IG9mIGFuaW1hbHMgaWRzIGZvciB0aGUgc3BlY2lmaWMgZnJhbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUcmFja2VkRGF0YSh0aW1lLCBpZHMpIHtcclxuICAgIHRyYWNrZWREYXRhLnB1c2goe1xyXG4gICAgICAgIFt0aW1lXTogSlNPTi5zdHJpbmdpZnkoaWRzKVxyXG4gICAgfSk7XHJcbiAgICAvLyBlbmFibGUgdGhlIGNhbGN1bGF0aW9uIGJ1dHRvblxyXG4gICAgaWYgKCQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmlzKCc6ZGlzYWJsZWQnKSAmJiAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJykgPT0gMCkge1xyXG4gICAgICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFNlbmQgZGF0YSB3aXRoIGEgYWpheCBxdWVyeSB0byB0aGUgc2VydmVyIGFuZCB3YWl0IGZvciB0aGUgYW5zd2VyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VuZFRyYWNrZWREYXRhKCkge1xyXG4gICAgZGlzYWJsZUNhbGN1bGF0aW9uQnV0dG9uKCk7XHJcbiAgICBnZXRTdWdnZXN0ZWRQYXJhbWV0ZXJzKEpTT04uc3RyaW5naWZ5KHRyYWNrZWREYXRhKSk7XHJcbiAgICByZXNldFRyYWNrZWREYXRhKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNwb25zZSBvZiB0aGUgYWpheCBxdWVyeSAtIG9wZW4gbmV3IHRhYiB3aXRoIHZhbHVlcyB0byBjcmVhdGUgbmV0d29ya1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlUGFyYW1ldGVycyhkYXRhKSB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhbihmYWxzZSk7XHJcbiAgICAvLyBvcGVuIG5ldHdvcmsgY3JlYXRlIHVybFxyXG4gICAgbGV0IHVybCA9ICcuLi8uLi9uZXR3b3JrL25ldz9kYXRhc2V0X2lkPScgKyBwYXJhbWV0ZXJzWydpZCddICsgJyYnICsgJC5wYXJhbShkYXRhWydkYXRhJ11bJ21heF9wYXJhbXMnXSk7XHJcbiAgICAvLyBjcmVhdGUgbmV3IHRhYiB3aXRoIHRoZSByZXN1bHQgcGFyYW1ldGVyXHJcbiAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuICAgIGVuYWJsZUNhbGN1bGF0aW9uQnV0dG9uKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogRGlzYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uIC0+IGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5mdW5jdGlvbiBkaXNhYmxlQ2FsY3VsYXRpb25CdXR0b24oKSB7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBnbHlwaGljb24tcmVmcmVzaC1hbmltYXRlXCI+PC9zcGFuPkxvYWRpbmcnKTtcclxuICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJywgMSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmFibGVDYWxjdWxhdGlvbkJ1dHRvbigpIHtcclxuICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10YXNrc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5DYWxjdWxhdGUnKTtcclxuICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmF0dHIoJ2RhdGEnLCAwKTtcclxuXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIHBhcmFtZXRlcnMqL1xyXG5pbXBvcnQge1xyXG4gICAgc2V0SW5kZXhUaW1lLFxyXG4gICAgYW5pbWFsX2lkc1xyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldFxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXNMaW5lQ2hhcnRcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgem9vbUZ1bmN0aW9uO1xyXG5leHBvcnQgbGV0IGxpbmVDaGFydFJhdGlvID0gMDtcclxuXHJcbmxldCB0cmVuZENoYXJ0c1pvb20gPSB7fTtcclxubGV0IHRyZW5kQ2hhcnRzRWxlbSA9IFsnbG93ZXItb3V0ZXItYXJlYScsICdsb3dlci1pbm5lci1hcmVhJywgJ21lZGlhbi1saW5lJywgJ3VwcGVyLWlubmVyLWFyZWEnLCAndXBwZXItb3V0ZXItYXJlYSddO1xyXG5sZXQgbGluZUNoYXJ0V2lkdGggPSA1MDAwO1xyXG5sZXQgcmF0aW8gPSAxO1xyXG5sZXQgem9vbUdyb3VwO1xyXG5sZXQgeDtcclxubGV0IHk7XHJcblxyXG4vKipcclxuICogaW5pdCB0aGUgbGluZSBjaGFydCBhbmQgYWxzbyB0aGUgdHJlbmQgY2hhcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lQ2hhcnQoKSB7XHJcblxyXG4gICAgem9vbUZ1bmN0aW9uID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIHN3YXJtRGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuXHJcbiAgICBsaW5lQ2hhcnRSYXRpbyA9IE1hdGguY2VpbChzd2FybURhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgIC8vIFN3YXJtIGZlYXR1cmVzIGxpbmUgY2hhcnRcclxuICAgIGxldCBsaW5lQ2hhcnRIZWlnaHQgPSA1MDA7IC8vIHRoZSBsaW5lIGNoYXJ0IGhlaWdodFxyXG4gICAgbGV0IG1hcmdpbiA9IHtcclxuICAgICAgICB0b3A6IDEwLFxyXG4gICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgIGJvdHRvbTogMTAwLFxyXG4gICAgICAgIGxlZnQ6IDEwXHJcbiAgICB9O1xyXG4gICAgbGV0IG1hcmdpblRvTGVnZW5kID0gNTA7XHJcblxyXG4gICAgbGV0IHN3YXJtX2ZlYXR1cmVzID0gT2JqZWN0LmtleXMoc3dhcm1EYXRhWzBdKTtcclxuICAgIC8vIHJlbW92ZSB0aGUgdGltZSBrZXlcclxuICAgIGxldCBpbmRleCA9IHN3YXJtX2ZlYXR1cmVzLmluZGV4T2YoJ3RpbWUnKTtcclxuICAgIHN3YXJtX2ZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBMaW5lIGNoYXJ0IGJ1dHRvbnMgdG8gdGhlIGZlYXR1cmUgcGFuZWxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBzd2FybV9mZWF0dXJlc1tpXS5zcGxpdCgnXycpLmpvaW4oJyAnKTtcclxuICAgICAgICBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuc2xpY2UoMSk7XHJcblxyXG4gICAgICAgICQoJy5mZWF0dXJlLWNoZWNrLWJveCcpLmFwcGVuZChgPGRpdiBjbGFzcz1cImZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgbGluZS1jaGFydC1jaGVjay1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgYFwiIGNsYXNzPVwibGluZUNoYXJ0QnV0dG9uXCIgdHlwZT1cImNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkcmF3U3dhcm1gICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnXCI+JyArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nICsgYDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmApO1xyXG4gICAgfVxyXG4gICAgLy9jaGVjayBsaW5lIGNoYXJ0IGRyYXcgYWxsIGxpbmVzXHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgIGxldCBsaW5lQ2hhcnREYXRhID0gW107XHJcbiAgICAvLyBhZ2dyZWdhdGUgYW5kIGF2ZXJhZ2UgdGhlIHN3YXJtIGRhdGEgdG8gbGluZUNoYXJ0V2lkdGggcG9pbnRzIGluIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBpZiAoc3dhcm1EYXRhLmxlbmd0aCA+IGxpbmVDaGFydFdpZHRoKSB7XHJcbiAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuICAgICAgICAvLyB0bXAgYXJyYXkgZm9yIHRoZSBhZ2dyZWdhdGVkIGFuZCBhdmVyYWdlZCBmZWF0dXJlc1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhZ2dyZWdhdGUgdGhlIGZlYXR1cmVzIGluIHRoZSB0ZW1wIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzd2FybURhdGFbaV1bc3dhcm1fZmVhdHVyZXNbal1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSByYXRpbyBpcyB6ZXJvIHRoZW4gYXZlcmFnZSBpdCBhbmQgc2V0IGl0IHRvIHplcm9cclxuICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9vYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpbWUnOiBpIC8gcmF0aW9cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF9vYmplY3Rbc3dhcm1fZmVhdHVyZXNbal1dID0gdG1wW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVDaGFydERhdGEucHVzaCh0bXBfb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpbmVDaGFydERhdGEgPSBzd2FybURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyB4IGF4aXMgc2NhbGUgLSBtaW51cyBtYXJnaW5MaW5lQ2hhcnQgIG5lZWRlZFxyXG4gICAgeCA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgbGV0IHgyID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIGxpbmVDaGFydERhdGEubGVuZ3RoXSlcclxuICAgICAgICAucmFuZ2UoWzAsIGxpbmVDaGFydFdpZHRoXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSlcclxuICAgICAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gMTUwMCkgJSA2MCArICc6JyArIE1hdGguZmxvb3IoKGQgKiByYXRpbykgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyAoZCAqIHJhdGlvKSAlIHBhcmFtZXRlcnNbJ2ZwcyddO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHkgYXhpcyBzY2FsZSB3aGljaCBpcyBub3JtYWxpemVkXHJcbiAgICB5ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIDEwMF0pXHJcbiAgICAgICAgLnJhbmdlKFtsaW5lQ2hhcnRIZWlnaHQsIDBdKTtcclxuICAgIC8vIGRlZmluZSB3aGVyZSB0aGUgYXhpcyBpcyBldGNcclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHkpXHJcbiAgICAgICAgLnRpY2tzKDApXHJcbiAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgIC50aWNrUGFkZGluZyg1KTtcclxuXHJcbiAgICBsZXQgZHJhZ2dlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGRyYWdnZWQgZnVuY3Rpb24gZ2V0IHRoZSBjb29yZGluYXRlcyBhbmQgY2FsY3VsYXRlIHRoZSB0aW1lIG1vbWVudCBmcm9tIHRoaXNcclxuICAgICAgICBsZXQgY29vcmRzID0gZDMubW91c2UodGhpcyk7XHJcbiAgICAgICAgaWYgKGNvb3Jkc1swXSA8IG1hcmdpbi5sZWZ0IHx8IGNvb3Jkc1swXSA+IGxpbmVDaGFydFdpZHRoIHx8IGNvb3Jkc1sxXSA8IDAgfHwgY29vcmRzWzFdID4gbGluZUNoYXJ0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdG1wIHNjYWxlIHRvIGluY2x1ZGUgdGhlIHpvb20gZmFjdG9yXHJcbiAgICAgICAgbGV0IHRtcFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKHpvb21GdW5jdGlvbi5yYW5nZSgpKVxyXG4gICAgICAgICAgICAucmFuZ2Uoem9vbUZ1bmN0aW9uLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBzZXQgdGhlIG5ldyB0aW1lXHJcbiAgICAgICAgc2V0SW5kZXhUaW1lKE1hdGguZmxvb3IoKHRtcFNjYWxlKGNvb3Jkc1swXSAtIG1hcmdpbi5sZWZ0KSkgKiByYXRpbykpO1xyXG4gICAgfTtcclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCAyMF0pXHJcbiAgICAgICAgLnRyYW5zbGF0ZUV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAuZXh0ZW50KFtcclxuICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICBbbGluZUNoYXJ0V2lkdGgsIGxpbmVDaGFydEhlaWdodF1cclxuICAgICAgICBdKVxyXG4gICAgICAgIC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHRyYW5zZm9ybSBmYWN0b3JcclxuICAgICAgICAgICAgbGV0IHQgPSBkMy5ldmVudC50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZSBzY2FsaW5nIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHpvb21GdW5jdGlvbiA9IHguZG9tYWluKHQucmVzY2FsZVgoeDIpLmRvbWFpbigpKTtcclxuICAgICAgICAgICAgLy8gem9vbSBlYWNoIGF2YWlhYmxlIGxpbmVcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGxpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cC5zZWxlY3QoKCcjJyArIGtleSArICdMaW5lJykpLmF0dHIoJ2QnLCBsaW5lc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB6b29tIHRoZSB0cmVuZCBjaGFydHNcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRyZW5kQ2hhcnRzWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyZW5kQ2hhcnRzWm9vbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCgnIycgKyBrZXkgKyAnVHJlbmRDaGFydCAuJyArIHRyZW5kQ2hhcnRzRWxlbVtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRyZW5kQ2hhcnRzWm9vbVtrZXldW3RyZW5kQ2hhcnRzRWxlbVtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBzdmcgcmVzaXphYmxlXHJcbiAgICBsZXQgc3dhcm1MaW5lQ2hhcnQgPSBkMy5zZWxlY3QoJyNzd2FybS12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctbGluZS1jaGFydC1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC8vIHRvIG1ha2UgaXQgcmVzcG9uc2l2ZSB3aXRoIGNzc1xyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcblxyXG4gICAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgMCAnICsgbGluZUNoYXJ0V2lkdGggKyAnICcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luLmJvdHRvbSkpXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpO1xyXG5cclxuICAgIHpvb21Hcm91cCA9IHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRab29tJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmxlZnQgKyAnLDApJyk7XHJcblxyXG4gICAgLy8gYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSB4IGF4aXNcclxuICAgIC8vIGFkZCB0aGUgYXhpc1xyXG4gICAgbGV0IGdYYXhpcyA9IHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMtbGluZS1jaGFydCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgbGluZUNoYXJ0SGVpZ2h0ICsgJyknKVxyXG4gICAgICAgIC5jYWxsKHhBeGlzKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgYSBncm91cCBmb3IgdGhlIHkgYXhpc1xyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcy1saW5lLWNoYXJ0JylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG5cclxuICAgIC8vIHRoZSB0aW1lIGxpbmUgYXBwZW5kIHRoZSBsaW5lXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGltZS1saW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0VGltZUxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCd4MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kxJywgMClcclxuICAgICAgICAuYXR0cigneDInLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MicsIGxpbmVDaGFydEhlaWdodCk7XHJcblxyXG4gICAgLy8gKipcclxuICAgIC8vIGNvbG9ycyBmb3IgdGhlIGxpbmVzXHJcbiAgICBsZXQgbGluZV9jb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XHJcbiAgICBsZXQgbGluZXMgPSB7fTtcclxuICAgIC8vIGFkZCB0aGUgbGluZXMgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWluID0gZDMubWluKGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgobGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZFsndGltZSddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbc3dhcm1fZmVhdHVyZXNbaV1dKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmVzW3N3YXJtX2ZlYXR1cmVzW2ldXSA9IGxpbmU7XHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIGxpbmUgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgICAgICB6b29tR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmRhdGEoW2xpbmVDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBsaW5lQ2hhcnRMaW5lJylcclxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBsaW5lX2NvbG9ycyhpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgICAgICAuYXR0cignbmFtZScsIHN3YXJtX2ZlYXR1cmVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd6b29tJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsaW5lQ2hhcnRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGluZUNoYXJ0SGVpZ2h0KVxyXG4gICAgICAgIC5jYWxsKHpvb20pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGRyYWdnZWQpXHJcbiAgICAgICAgLmNhbGwoZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5vbignZHJhZycsIGRyYWdnZWQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIGxlZ2VuZCBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvL3NlbGVjdCBhbGwgdGhlIGxpbmVzXHJcbiAgICBsZXQgY2hhcnRMaW5lcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmUnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoY2hhcnRMaW5lcy5fZ3JvdXBzWzBdKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQuc3R5bGUuc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgKyAnOiAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgdmFsdWUgb2YgdGhlIGxpbmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGV4cHJlc3Npb24gZ2V0cyB0aGUgdGV4dCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyMnICsgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJykubm9kZSgpLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICtcclxuICAgICAgICAgICAgICAgICAgICAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJzAuMCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgbGVnZW5kIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd0cmVuZENoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKFsnNSUgLSA5NSUnLCAnMjUlIC0gNzUlJywgJ01lZGlhbiddKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzc0YTljZic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzA0NWE4ZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNTI1MjUyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkKTtcclxuICAgICAgICB9KTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBsaW5lIGNoYXJ0IGJ1dHRvbiBsaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCgnI2RyYXdTd2FybScgKyBzd2FybV9mZWF0dXJlc1tpXSkpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgoJyMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKSB7XHJcbiAgICAkKCcuZHJhdy1kZXRhaWxzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgICAgIGFkZFRyZW5kQ2hhcnQodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlVHJlbmRDaGFydCgpO1xyXG4gICAgICAgICAgICBlbmFibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJy5saW5lLWNoYXJ0LWNoZWNrLWJveCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVUcmVuZENoYXJ0KCkge1xyXG4gICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgdHJlbmQgY2hhcnQgc2hvd2luZyBtZWRpYW4gYW5kIHBlcmNlbnRpbGVzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gd2hpY2ggZmVhdHVyZVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAvLyBjaGVjayB3aGljaCBmZWF0dXJlIHRvIGRpc3BsYXkgaW4gdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICBsZXQgZmVhdHVyZSA9ICcnO1xyXG4gICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnc3BlZWQnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FjY2VsZXJhdGlvbicpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rpc3RhbmNlX2NlbnRyb2lkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2Rpc3RhbmNlX2NlbnRyb2lkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtaWRsaW5lX29mZnNldCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdtaWRsaW5lX29mZnNldCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNldGlsZXMgZm9yIGV2ZXJ5IHRpbWUgc3RlcFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXNMaW5lQ2hhcnQodG1wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSB0cmVuZENoYXJ0RGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwodHJlbmRDaGFydERhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2dyZWdhdGVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRyZW5kQ2hhcnREYXRhW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZGl2aWRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICB0bXBUcmVuZENoYXJ0RGF0YS5wdXNoKHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhID0gdG1wVHJlbmRDaGFydERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBtaW4gYW5kIG1heCBmb3IgdGhlIG5vcm1hbGl6YXRpb25cclxuICAgICAgICBsZXQgbWluID0gZDMubWluKHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgodHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbNF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCB0cmVuZENoYXJ0ID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyZW5kQ2hhcnREYXRhJyk7XHJcbiAgICAgICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZSBhZ2FpbiB0byB0aGUgZW5kIG9mIHRoZSBncm91cFxyXG4gICAgICAgICQoJy56b29tJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgLy8gdmFyIHRvIHNhdmUgdGhlIGZ1bmN0aW9ucyBmb3IgdGhlIHpvb21cclxuICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV0gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIGZvciB0aGUgdXBwZXIgYW5kIGlubmVyIGFyZWFzIGFuZCB0aGUgbWVkaWFuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBsb3dlciBvdXRlciBhcmVhIGFuZCBsb3dlciBpbm5lciBhcmVhXHJcbiAgICAgICAgICAgIGlmIChpIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSArIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtZWRpYW4gbGluZVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1cHBlciBpbm5lciBhcmVhIGFuZCB1cHBlciBvdXRlciBhcmVhXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSAtIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNhdmUgdGhpcyBmb3IgdGhlIGxhdGVyIHpvb21cclxuICAgICAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdW3RyZW5kQ2hhcnRzRWxlbVtpXV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhdGhcclxuICAgICAgICAgICAgdHJlbmRDaGFydC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoW3RyZW5kQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHRyZW5kQ2hhcnRzRWxlbVtpXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBzaG93IHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICQoKCcjJyArIGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgdGhlIGxpbmUgY2hhcnQgZmllbGRzIGFuZCB0aGUgbGluZSBjaGFydCB0aW1lIGxpbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMaW5lQ2hhcnQoKSB7XHJcbiAgICBpZiAoZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKSAmJiBzd2FybURhdGFbTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKV0pIHtcclxuICAgICAgICBsZXQgdG1wID0gTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKTtcclxuICAgICAgICAvL3VwZGF0ZSB0aGUgbGluZSBjaGFydCBsZWdlbmQgdGV4dCB2YWx1ZXMgcGVyIHNlY29uZFxyXG4gICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGNoYW5nZSB0aGlzIHRvIGEgbW9yZSBtb2R1bGFyIHdheVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNjb252ZXhfaHVsbF9hcmVhTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KChzd2FybURhdGFbdG1wXVsnY29udmV4X2h1bGxfYXJlYSddKSArICdtbcKyJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI3NwZWVkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydzcGVlZCddICsgJ21tL3MnKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjYWNjZWxlcmF0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydhY2NlbGVyYXRpb24nXSArICdtbS9zwrInKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlzdGFuY2VfY2VudHJvaWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2Rpc3RhbmNlX2NlbnRyb2lkJ10gKyAnbW0nKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlyZWN0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydkaXJlY3Rpb24nXSArICfCsCcpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNwb2xhcmlzYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ3BvbGFyaXNhdGlvbiddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgem9vbUZ1bmN0aW9uKHRtcCkgKyAnLDApJyk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGluZV9jaGFydC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQqL1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgTmV0d29yayBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmV4cG9ydCBsZXQgc2xpZGVyOyAvLyB0aW1lIHNsaWRlciBvZiB0aGUgYXBwXHJcbmV4cG9ydCBsZXQgdG9vbHRpcDsgLy8gdG9vbHRpcCBmdW5jdGlvblxyXG5cclxuLyoqXHJcbiAqIEJydXNoIGVuZCBmdW5jdGlvblxyXG4gKiBhZGQgYWN0aXZlIGFuaW1hbHMgdG8gdGhlIGFycmF5IG9yIHJlbW92ZSB0aGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XHJcbiAgICBsZXQgYXJyYXlBbmltYWxzID0gU1BWLmFycmF5QW5pbWFscztcclxuICAgIGxldCBhY3RpdmVBbmltYWxzID0gU1BWLmFjdGl2ZUFuaW1hbHM7XHJcbiAgICB2YXIgcmVjdCA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcclxuICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSAxNTEgZmlzaCB0byBjaGVjayB3aGljaCBhcmUgaW4gdGhlIGJydXNoXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFNQVi5hbmltYWxfaWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvaW50ID0gW2FycmF5QW5pbWFsc1tpXVsncCddWzBdLCBhcnJheUFuaW1hbHNbaV1bJ3AnXVsxXV07XHJcbiAgICAgICAgLy9jaGVjayB3aGljaCBmaXNoIGFyZSBpbiAgdGhlIGJydXNoZWQgYXJlYVxyXG4gICAgICAgIGlmICgocmVjdFswXVswXSA8PSBwb2ludFswXSkgJiYgKHBvaW50WzBdIDw9IHJlY3RbMV1bMF0pICYmXHJcbiAgICAgICAgICAgIChyZWN0WzBdWzFdIDw9IHBvaW50WzFdKSAmJiAocG9pbnRbMV0gPD0gcmVjdFsxXVsxXSkpIHtcclxuICAgICAgICAgICAgLy8gUG9pbnQgaXMgaW4gdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChhcnJheUFuaW1hbHNbaV1bJ2EnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU1BWLnNldEFjdGl2ZUFuaW1hbHMoYWN0aXZlQW5pbWFscyk7XHJcbiAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgfVxyXG4gICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIC8vIHJlbW92ZSB0aGUgYnJ1c2hcclxuICAgICQoJy5icnVzaCcpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgdG9vbHRpcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUb29sdGlwKCkge1xyXG4gICAgdG9vbHRpcCA9IGQzLnNlbGVjdCgnZGl2LnRvb2x0aXAnKVxyXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5zdHlsZSgndG9wJywgMCArICdweCcpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb29sdGlwIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkIC0gZDMgZGF0YSBvYmplY3Qgd2l0aCB0aGUgbWV0YWRhdGEgaW5mb3JtYXRpb25cclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b29sdGlwRnVuY3Rpb24oZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZFsnYSddID09PSBkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMTAwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXNcclxuICAgICAgICAgICAgLy8gVE9ETyBtYWtlIHRoaXMgbW9kdWxhclxyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtYW5pbWFsLWlkJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc3BlY2llcycpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zZXgnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zaXplJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXdlaWdodCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgdGltZSBzbGlkZXIgYW5kIHRoZSBkeW5hbWljIG5ldHdvcmsgc2xpZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcbiAgICAvLyB0aW1lIHNsaWRlclxyXG4gICAgc2xpZGVyID0gJCgnI3NsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiBzd2FybURhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdGVwOiAyNSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgU1BWLnNldEluZGV4VGltZSh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBwYXVzZWQgYXBwbHkgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgTmV0d29yayBzbGlkZXJcclxuICAgICQoJyNuZXR3b3JrLXNsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiAnbWF4JyxcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLjUsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIE5ldHdvcmsuc2V0TmV0d29yTGltaXQodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwodWkudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBzZXQgdGV4dCBmb3IgdGhlIGZpcnN0IGluaXRpYWxpemF0aW9uIFxyXG4gICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwoMC41KTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1heCBmcm9tIHRoZSBzbGlkZXIgdGhpcyBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSB0aWNrc1xyXG4gICAgbGV0IG1heCA9IHNsaWRlci5zbGlkZXIoJ29wdGlvbicsICdtYXgnKTtcclxuICAgIGxldCBzcGFjZSA9IDEwMCAvIG1heDtcclxuICAgIC8vYXBwZW5kIHRoZSBtaW51dGUgdGlja3NcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpID0gaSArIDE1MDApIHtcclxuICAgICAgICAkKCc8c3BhbiBjbGFzcz1cInVpLXNsaWRlci10aWNrXCI+PC9zcGFuPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2xlZnQnLCAoc3BhY2UgKiBpKSArICclJylcclxuICAgICAgICAgICAgLmFwcGVuZFRvKHNsaWRlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHRpbWUgc2xpZGVyIHRvIGEgbmV3IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB2YWx1ZSBmb3IgdGhlIHRpbWUgc2xpZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZVNsaWRlcih2YWx1ZSkge1xyXG4gICAgc2xpZGVyLnNsaWRlcigndmFsdWUnLCB2YWx1ZSk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBGZWF0dXJlcyBjaGVja2JveCBhbmQgcmFkaW8gYnV0dG9ucyAqL1xcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBkaXYge1xcclxcbiAgICBjbGVhcjogYm90aDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGxhYmVsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QxRDNENDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHksIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmVtcHR5IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHl+bGFiZWwsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmVtcHR5fmxhYmVsIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBsaW5lLWhlaWdodDogMi41ZW07XFxyXFxuICAgIHRleHQtaW5kZW50OiAzZW07XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHdpZHRoOiAyLjVlbTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWwsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWwge1xcclxcbiAgICBjb2xvcjogIzg4ODtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06aG92ZXI6bm90KDpjaGVja2VkKX5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJ1xcXFwyNzE0JztcXHJcXG4gICAgdGV4dC1pbmRlbnQ6IC45ZW07XFxyXFxuICAgIGNvbG9yOiAjQzJDMkMyO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM3Nzc7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWR+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpmb2N1c35sYWJlbDpiZWZvcmUge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggIzk5OTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTVkcgZWxlbWVudHMgYW5kIHRleHQgKi9cXHJcXG5cXHJcXG4jbWFpbi12aXMge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jaGllcmFyY2h5LWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbi12aXMtbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxuICAgIHRvcDogMTBweDtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudC1kZW5kcm9ncmFtIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvICovXFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiAxNyU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBwYXRoIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgbGluZSB7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjM7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLngge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnkge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMtbGluZS1jaGFydCBwYXRoIGxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVGltZSAgKi9cXHJcXG5cXHJcXG4uZnJhbWUtdGV4dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi8qIFNsaWRlciB0aWNrcyAgKi9cXHJcXG5cXHJcXG4udWktc2xpZGVyLXRpY2sge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAzcHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICMzMzdhYjc7XFxyXFxuICAgIGhlaWdodDogMC44ZW07XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTGFvZGluZyBnaWYgICAqL1xcclxcblxcclxcbiNsb2FkaW5nIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29sb3IgbGVnZW5kICAgICovXFxyXFxuXFxyXFxuLmxlZ2VuZCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVnZW5kLXRleHQge1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi5saW5lLWNoYXJ0LWxlZ2VuZC10ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpbWUtbGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qc3dhcm0gZmVhdHVyZXMgKi9cXHJcXG5cXHJcXG4uY2VudHJvaWQge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5tZWRvaWQge1xcclxcbiAgICBmaWxsOiAjZTcyOThhICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaHVsbC1wYXRoIHtcXHJcXG4gICAgZmlsbDogI2ZmZjtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZXJhcmNoeS1ncm91cCB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTA7XFxyXFxuICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XFxyXFxuICAgIG9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24ge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC40O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZSB7XFxyXFxuICAgIC1hbmltYXRpb246IHNwaW4gLjdzIGluZmluaXRlIGxpbmVhcjtcXHJcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4yIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxufVxcclxcblxcclxcbkAtd2Via2l0LWtleWZyYW1lcyBzcGluMiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICB0byB7XFxyXFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBzcGluIHtcXHJcXG4gICAgZnJvbSB7XFxyXFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICB0byB7XFxyXFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3IgLmJ0biB7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogI2JkYmRiZDtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3IgLmFjdGl2ZSBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVxcclxcblxcclxcbiNidG4tZ3JleTEge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZDlkOWQ5O1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk2OTY5NjtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1kYXJrIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzRkNGQ0ZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29sb3IgYnJld2VyIHBpY2tlciBkaXYgKi9cXHJcXG5cXHJcXG4ucGFsZXR0ZSB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgZGlzcGxheTogdGFibGU7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxyXFxuICAgIG1hcmdpbjogNHB4IDAgNHB4IDRweDtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTtcXHJcXG59XFxyXFxuXFxyXFxuLnN3YXRjaCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gICAgd2lkdGg6IDIycHg7XFxyXFxuICAgIGhlaWdodDogMjJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnZvcm9ub2kge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMztcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4yO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNpcmNsZSB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNnB4IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDI5O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNpcmNsZS5idG4tbGcge1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBwYWRkaW5nOiAxM3B4IDEzcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMzM7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRvb2x0aXAgKi9cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDI1NSkgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICMxYjgwOWUgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXHJcXG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbmRpdi50b29sdGlwIHRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi50b29sdGlwLXNwYW4ge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxufVxcclxcblxcclxcbi5saW5lLWNoYXJ0LWNoZWNrLWJveC5kaXNhYmxlZCB7XFxyXFxuICAgIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXItb3V0ZXItYXJlYSwgLmxvd2VyLW91dGVyLWFyZWEge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIGZpbGw6ICM3NGE5Y2Y7XFxyXFxuICAgIHN0cm9rZTogIzM2OTBjMDtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyLWlubmVyLWFyZWEsIC5sb3dlci1pbm5lci1hcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjMDQ1YThkO1xcclxcbiAgICBzdHJva2U6ICMwMjM4NTg7XFxyXFxufVxcclxcblxcclxcbi5tZWRpYW4tbGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzUyNTI1MjtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1O1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0ZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjOTk5O1xcclxcbiAgICBib3JkZXI6IDRweCBzb2xpZCAjNGQ0ZDRkO1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDFweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjQpO1xcclxcbn1cXHJcXG5cXHJcXG4uem9vbSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxyXFxufVxcclxcblxcclxcbi54LmF4aXMtbGluZS1jaGFydD5nPnRleHQge1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4uYXJyb3cge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1saW5lIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1hcnJvdyB7XFxyXFxuICAgIGZpbGw6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IC01cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogLTEwcHg7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogdGhpY2sgc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBzcGFuIHtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgYm9yZGVyOiB0aGljayBzb2xpZCB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBoMiB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDdweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC50MiAubW9kLWhlYWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLmNsb3NlIHtcXHJcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaGVhZGVyIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICNlNWU1ZTU7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlOmhvdmVyIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJvcGRvd24tbWVudSB7XFxyXFxuICAgIG1pbi13aWR0aDogNDBweDtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbWV0YWRhdGEtaW5wdXQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgbGkge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHNwYW4ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYmwtYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzdmYzk3ZjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYzA4NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYWItYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM4NmNiMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmstZWRnZXMge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUgdGV4dCB7XFxyXFxuICAgIGZvbnQ6IDEycHggc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUtLWludGVybmFsIHRleHQge1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggMCAjZmZmLCAwIC0xcHggMCAjZmZmLCAxcHggMCAwICNmZmYsIC0xcHggMCAwICNmZmY7XFxyXFxufVxcclxcblxcclxcbi5saW5rIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNjM2MzYzO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCB7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDFyZW07XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzgxODE4MTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQgLjNzIGVhc2U7XFxyXFxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjNzIGVhc2U7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIG1hcmdpbjogMCAxNnB4O1xcclxcbiAgICBib3gtc2hhZG93OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbmRpY2F0b3I6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAxOHB4O1xcclxcbiAgICBoZWlnaHQ6IDE4cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIxcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAxcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcclxcbiAgICBsZWZ0OiAtMnB4O1xcclxcbiAgICB0b3A6IC00cHg7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogbGVmdCAuM3MgZWFzZSwgYmFja2dyb3VuZCAuM3MgZWFzZSwgYm94LXNoYWRvdyAuMXMgZWFzZTtcXHJcXG4gICAgdHJhbnNpdGlvbjogbGVmdCAuM3MgZWFzZSwgYmFja2dyb3VuZCAuM3MgZWFzZSwgYm94LXNoYWRvdyAuMXMgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZH4uY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg0YzdjMTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2Vkfi5jdXN0b20tY29udHJvbC1pbmRpY2F0b3I6YWZ0ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODRjN2MxO1xcclxcbiAgICBsZWZ0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1c34uY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yIHtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4jYWN0aXZlLW5ldHdvcmstbmFtZSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgICBjb2xvcjogIzI5NjI5MjtcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2ZS1sZXZlbCB7XFxyXFxuICAgIGZpbGw6ICMzODZjYjA7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLXBhbmVsIHtcXHJcXG4gICAgcG9zaXRpb246IGluaXRpYWw7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLXBhbmVsIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZVxcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtIHtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWRlbmRyb2dyYW06aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRDFEM0Q0O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlnaGxpZ2h0LWhpZXJhcmNoeSB7XFxyXFxuICAgIGZpbGw6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxMDtcXHJcXG4gICAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1idXR0b25zLWRpdiAuYnRuIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYgLmJ0bi5hY3RpdmUgc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1idXR0b25zLWRpdiB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmludGVyc2VjdGlvbiB7XFxyXFxuICAgIGZpbGw6IHVybCgjc3RyaXBlZCkgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjNjcwMDBkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ltLWRpZmZlcmVuY2Uge1xcclxcbiAgICBmaWxsOiB1cmwoI3N0cmlwZWQpICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogIzY3MDAwZDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9