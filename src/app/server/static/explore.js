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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hierarchy_js__ = __webpack_require__(4);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["k" /* removeHierarchyLevel */])(network_id);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["j" /* removeHierarchyColor */])(network_id);
    } // add it to the network hierarchy
    else {
        networkHierarchy['h' + network_id] = value;
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["n" /* setHierarchyLevel */])(network_id, 2);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["m" /* setHierarchyColor */])(network_id);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(4);
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
    Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["f" /* initDendrogram */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* drawDendrogram */])();
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
                // reset the group standard deviation for the hierarhcy
                // needed for coloring of the dendrogram nodes (variacne )
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["l" /* resethierarchyGroupStdev */])();

                let tmp_index = 0;
                // display the whole network
                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["l" /* showNetworkHierarchy */] == null) {
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
                    let show_dendrogram = $('.show-dendrogram.btn-primary').length;
                    let id = $('.show-dendrogram.btn-primary').attr('data');
                    for (let i = 0; i < arrayAnimals.length; i++) {
                        for (let j = i + 1; j < arrayAnimals.length; j++) {
                            for (let k = 0; k < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["h" /* networkHierarchyIds */].length; k++) {
                                if (__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["h" /* networkHierarchyIds */][k].includes(arrayAnimals[i]['a']) && __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["h" /* networkHierarchyIds */][k].includes(arrayAnimals[j]['a'])) {
                                    // console.log(networkHierarchyIds[k]);
                                    network.push({
                                        'node1': arrayAnimals[i]['a'],
                                        'node2': arrayAnimals[j]['a'],
                                        'start': arrayAnimals[i]['p'],
                                        'end': arrayAnimals[j]['p'],
                                        'val': tmp[tmp_index]
                                    });
                                    // if true depict the standard deviation via color in the dendrogram
                                    // TODO make this faster
                                    if (show_dendrogram && id === __WEBPACK_IMPORTED_MODULE_1__network_js__["e" /* networkID */]) {
                                        Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["p" /* sethierarchyGroupStdev */])('h' + __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["h" /* networkHierarchyIds */][k].toString().hashCode(), tmp[tmp_index]);
                                    }
                                }
                            }
                            tmp_index = tmp_index + 1;
                        }
                    }
                }

                network.forEach(function(d) {
                    $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']));
                    $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']));
                });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["b" /* networkAuto */]) {
                    let tmpArray = [];
                    for (let i = 0; i < network.length; i++) {
                        tmpArray.push(network[i]['val']);
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["g" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["d" /* percentiles */])(tmpArray));
                }

                network = network.filter(function(d) {
                    return d['val'] <= __WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* networkLimit */];
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']);
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return networkLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return showNetworkHierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return networkColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return networkID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["h"] = setNetworkAuto;
/* harmony export (immutable) */ __webpack_exports__["g"] = setNetworLimit;
/* harmony export (immutable) */ __webpack_exports__["i"] = setNetworkHierarchy;
/* harmony export (immutable) */ __webpack_exports__["j"] = setNetworkID;
/* harmony export (immutable) */ __webpack_exports__["k"] = setnetworkColor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__ = __webpack_require__(4);
/*eslint-disable no-unused-lets*/
/*global window, $, d3 */




let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0.5;
let showNetworkHierarchy;
let networkColor = {};
let networkID;
// fixed color scale for the network

/**
 * color scale for network - range is defined dynamic based on the hierarhcy color
 */
let networkColorScale = d3.scaleThreshold()
    .domain(
        [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
    );


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

/**
 * Set the network network id - needed for hierarchy standard deviation coloring
 * @param {Number} value - e.g. 0-n
 */
function setNetworkID(value) {
    networkID = value;
}

/**
 * Set network color scale range

 * @param {Number} id - id of the network
 */
function setnetworkColor(network_id) {
    // if id = -1 set the color to nothing
    if (network_id >= 0) {
        // reset color of the edges
        networkColor = {};

        // hierarchy colors which are already in usage
        let tmpColor = [];

        // get the color
        // search in the hieraryColors if a color was defined for the network id
        for (var key in __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["e" /* hierarchyColors */]) {
            if (__WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["e" /* hierarchyColors */].hasOwnProperty(key)) {
                if (key === ('h' + network_id)) {
                    networkColor['h' + network_id] = __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["e" /* hierarchyColors */][key];
                } else {
                    tmpColor.push(__WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["e" /* hierarchyColors */][key]);
                }
            }
        }
        // if the the networkColor is still empty choose a color
        // check if the color is already in usage, if so skip
        if (Object.keys(networkColor).length === 0) {
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["c" /* colors */].length; i++) {
                if (tmpColor.indexOf(__WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["c" /* colors */][i]) === -1) {
                    networkColor['h' + network_id] = __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["c" /* colors */][i];
                    break;
                }
            }
        }
        // change the color scale
        let tmp = networkColor['h' + network_id];
        networkColorScale
            .range([d3.color(tmp).darker([5]), d3.color(tmp).darker([4]), d3.color(tmp).darker([3]), d3.color(tmp).darker([2]), d3.color(tmp).darker([1]),
                d3.color(tmp), d3.color(tmp).brighter([1]), d3.color(tmp).brighter([2]), d3.color(tmp).brighter([3]), d3.color(tmp).brighter([])
            ]);

    } else {
        networkColor = {};
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__hierarchy_js__["b" /* changeHierarchyLegend */])();
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
/* harmony export (immutable) */ __webpack_exports__["f"] = standardDeviation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(6);
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

// generate hash codes from strings
// source: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/**
 * Calculate the standardDeviation of an array of numbers
 * @param {Array} arr - array of numbers
 */
function standardDeviation(arr) {
    if (arr instanceof Array) {
        let mean = arr.reduce(function(pv, cv) {
            return pv + cv;
        }, 0) / arr.length;
        let tmp = arr.map(function(num) {
            return Math.pow(num - mean, 2);
        });
        return Math.sqrt(tmp.reduce(function(pv, cv) {
            return pv + cv;
        }, 0) / tmp.length);
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return networkHierarchyIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hierarchyColors; });
/* unused harmony export hierarchyGroupStdev */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return colors; });
/* harmony export (immutable) */ __webpack_exports__["f"] = initDendrogram;
/* harmony export (immutable) */ __webpack_exports__["d"] = drawDendrogram;
/* harmony export (immutable) */ __webpack_exports__["n"] = setHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["k"] = removeHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["m"] = setHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["j"] = removeHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["a"] = addHierarchyButton;
/* harmony export (immutable) */ __webpack_exports__["i"] = removeHierarchyButton;
/* unused harmony export updateDendrogram */
/* harmony export (immutable) */ __webpack_exports__["b"] = changeHierarchyLegend;
/* harmony export (immutable) */ __webpack_exports__["o"] = setSetOperation;
/* harmony export (immutable) */ __webpack_exports__["p"] = sethierarchyGroupStdev;
/* harmony export (immutable) */ __webpack_exports__["l"] = resethierarchyGroupStdev;
/* unused harmony export addHighlightSpatialView */
/* unused harmony export removeHighlightSpatialView */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(3);
/*eslint-disable no-unused-lets*/
/*global window,$, d3, PolyBool*/
// import * as spv from './spatial_view.js';









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

const maxNumberHierarchies = 4;
/* harmony export (immutable) */ __webpack_exports__["g"] = maxNumberHierarchies;

let networkHierarchyIds = [];
let hierarchyColors = {};
let hierarchyGroupStdev = {};
// TODO add more colors
let colors = ['#7fc97f', '#386cb0', '#e7298a', '#ff9900'];

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
                                return standardDeviationColorScale(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* standardDeviation */])(hierarchyGroupStdev[('h' + d['data']['name'].toString().hashCode())]));
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
        if (__WEBPACK_IMPORTED_MODULE_2__network_js__["l" /* showNetworkHierarchy */] === hierarchyIds[i]) {
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
    // check if the hierarchy is already shown as network
    // take the same color
    for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]) {
        if (key === ('h' + hierarchy)) {
            hierarchyColors['h' + hierarchy] = __WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */][key];
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
            if (Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]).length !== 0) {
                for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]) {
                    if (__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */][key] !== colors[i]) {
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
    if (Object.keys(hierarchyColors).length !== 0 || Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]).length !== 0) {
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
    if (Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]).length !== 0) {
        for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */]) {
            if (legendData.indexOf(__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */][key]) === -1) {
                legendData.push(__WEBPACK_IMPORTED_MODULE_2__network_js__["c" /* networkColor */][key]);
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
function initDendrogramLegend() {
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
function setSetOperation(value) {
    setOperation = value;
}

/**
 * Set the hierarchy group standard deviation
 * @param {String} key - unique hash id for the group
 * @param {number} value - unique hash id for the group
 */
function sethierarchyGroupStdev(key, value) {
    if (key in hierarchyGroupStdev) {
        hierarchyGroupStdev[key].push(value);
    } else {
        hierarchyGroupStdev[key] = [value];
    }
}

/**
 * Reset hierarchy group standard deviation
 */
function resethierarchyGroupStdev() {
    hierarchyGroupStdev = {};
}

/**
 * Highlight a subset of animals in the spatial view
 * @param {array} animals - array of animal ids which have to be highlighted
 */
function addHighlightSpatialView(animals) {
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
function removeHighlightSpatialView() {
    // remove the coloring and the hierarchy highlight hull
    d3.selectAll('.animal').classed('animal-highlight', false);
    d3.selectAll('.highlight-hierarchy').remove();
}

/***/ }),
/* 5 */
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
    // needed for standard Deviation in dendrogram
    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["j" /* setNetworkID */])(network_id);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playBoolean; });
/* harmony export (immutable) */ __webpack_exports__["a"] = initListeners;
/* harmony export (immutable) */ __webpack_exports__["c"] = setPlayBoolean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(4);
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
        // set the color of the network
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["k" /* setnetworkColor */])(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["j" /* setNetworkID */])(-1);
        // remove the network color
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["k" /* setnetworkColor */])(-1);
        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["h" /* setNetworkAuto */])(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["h" /* setNetworkAuto */])(false);
            let limit = $('#network-slider').slider('value');
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["g" /* setNetworLimit */])(limit);
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
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* drawDendrogram */])();
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


        if (checked && $('.show-dendrogram').length < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["g" /* maxNumberHierarchies */]) {
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

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["i" /* removeHierarchyButton */])(id);
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
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["i" /* setNetworkHierarchy */])(id);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["i" /* setNetworkHierarchy */])(undefined);
        }
    });

    /**
     * Hierarchy set theory buttons - union, intersection, symmetric difference
     */
    $('.set-button').click(function() {
        let data = $(this).find('input').attr('data');
        Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["o" /* setSetOperation */])(data);

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* drawDendrogram */])();
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addSpatialViewGroup;
/* harmony export (immutable) */ __webpack_exports__["b"] = changeLegend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_js__ = __webpack_require__(8);
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return trackingBoolean; });
/* harmony export (immutable) */ __webpack_exports__["e"] = setTrackingBoolean;
/* harmony export (immutable) */ __webpack_exports__["b"] = resetTrackedData;
/* harmony export (immutable) */ __webpack_exports__["a"] = addTrackedData;
/* harmony export (immutable) */ __webpack_exports__["d"] = sendTrackedData;
/* harmony export (immutable) */ __webpack_exports__["c"] = responseParameters;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(6);
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

    ratio = Math.ceil(__WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length / lineChartWidth);

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

    zoomFunction = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartWidth]);


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
    if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["g" /* indexTime */] / ratio)]) {
        let tmp = Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["g" /* indexTime */] / ratio);
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
                __WEBPACK_IMPORTED_MODULE_2__network_js__["g" /* setNetworLimit */](ui.value);
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
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.line-chart-check-box.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n.custom-checkbox {\r\n    min-height: 1rem;\r\n    padding-left: 0;\r\n    margin-right: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator {\r\n    content: \"\";\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 30px;\r\n    height: 10px;\r\n    background-color: #818181;\r\n    border-radius: 15px;\r\n    margin-right: 10px;\r\n    -webkit-transition: background .3s ease;\r\n    transition: background .3s ease;\r\n    vertical-align: middle;\r\n    margin: 0 16px;\r\n    box-shadow: none;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    display: inline-block;\r\n    width: 18px;\r\n    height: 18px;\r\n    background-color: #f1f1f1;\r\n    border-radius: 21px;\r\n    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);\r\n    left: -2px;\r\n    top: -4px;\r\n    -webkit-transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n    transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator {\r\n    background-color: #84c7c1;\r\n    background-image: none;\r\n    box-shadow: none !important;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator:after {\r\n    background-color: #84c7c1;\r\n    left: 15px;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:focus~.custom-control-indicator {\r\n    box-shadow: none !important;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n.animal-highlight {\r\n    fill: #c51b7d !important;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n#dendrogram-legend {\r\n    margin-left: 20px;\r\n}\r\n\r\n.intersection {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.sym-difference {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNmMTM2NTIzZjM2MDE4ZDFiMmUiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL21ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcz9kZTRjIiwid2VicGFjazovLy8uL2V4cGxvcmUvZXhwbG9yZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7O0FBUUE7O0FBRUQ7QUFDQTs7QUFFQSxpQkFBd0I7QUFDeEIseUJBQWdDO0FBQ2hDLG1CQUEwQjtBQUMxQiwyQkFBa0M7QUFDbEMscUJBQTRCO0FBQzVCLDBCQUFpQzs7OztBQUlqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SkE7QUFBQTtBQUNBO0FBQ0E7QUFLQzs7QUFTQTs7QUFLQTs7QUFJQTs7QUFRQTs7QUFJQTs7QUFLQTs7QUFLQTs7QUFJQTs7QUFRQTs7QUFLQTs7O0FBR0Qsa0JBQXlCO0FBQ3pCO0FBQ0E7QUFDQSwwQkFBaUM7QUFDakMsc0JBQTZCO0FBQzdCLHVCQUE4QjtBQUM5QixpQkFBd0I7QUFDeEIsZUFBc0I7O0FBRXRCLGlCQUFpQjtBQUNqQixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpRUFBb0I7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHNEQUFzRCxpQ0FBaUMsZUFBZSxhQUFhOztBQUVuSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQsMkNBQTJDLHlCQUF5QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQsMkNBQTJDLHlCQUF5QjtBQUNwRSwyQ0FBMkMsdUZBQWdDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxtQ0FBbUMsb0JBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0dBQWtFOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWU7QUFDZixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVB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O0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pSQTtBQUFBO0FBQ0E7O0FBRUE7O0FBSUM7O0FBS0E7O0FBSUE7O0FBTUE7OztBQVNBOztBQVFBOztBQU9BOztBQUlBOztBQVFBOztBQU1BOztBQUVELFVBQVU7QUFDVix1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUVBQTRCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLHlFQUE0QjtBQUN2RCwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlFQUE0QjtBQUN2RDtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNoekJBO0FBQUE7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRCxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQzNHQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7O0FBR0QsdUJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5RUFBNEI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLG1CQUFtQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlFQUE0QjtBQUMvQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFBQTtBQUNBOztBQUlDOztBQUlBOzs7QUFHRCw0QkFBbUM7QUFDbkM7OztBQUdBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBQUE7QUFDQTtBQUlDOztBQUtBOztBQUlBOztBQUlBOzs7QUFHRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1FQUFzQjtBQUM3QztBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFD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QUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFjZjEzNjUyM2YzNjAxOGQxYjJlIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRIaWVyYXJjaHlMZXZlbCxcclxuICAgIHJlbW92ZUhpZXJhcmNoeUxldmVsLFxyXG4gICAgc2V0SGllcmFyY2h5Q29sb3IsXHJcbiAgICByZW1vdmVIaWVyYXJjaHlDb2xvcixcclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZFxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcbi8vIGltcG9ydCBjc3NcclxuaW1wb3J0ICcuL2V4cGxvcmUuY3NzJztcclxuXHJcbmV4cG9ydCBsZXQgZGF0YXNldCA9IFtdOyAvLyBtYWluIGRhdGFzZXQgd2l0aCB2YWx1ZXMgZm9yIGVhY2ggaW5kaXZpZHVhbCBhbmltYWxcclxuZXhwb3J0IGxldCBkYXRhc2V0TWV0YWRhdGEgPSBbXTsgLy8gbWV0YWRhdGFzZXQgZm9yIGVhY2ggaW5kaXZpZHVhbCBmaXNoXHJcbmV4cG9ydCBsZXQgc3dhcm1EYXRhID0gW107IC8vIHN3YXJtZGF0YSBmb3IgbGluZWNoYXJ0IGFuZCBhbHNvIG90aGVyIHN3YXJtIGZlYXR1cmVzXHJcbmV4cG9ydCBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSB7fTsgLy8gcGVjZW50aWxlcyBuZWVkZWQgZm9yIHRoZSBjb2xvciBtYXBwaW5nXHJcbmV4cG9ydCBsZXQgbmV0d29ya0RhdGEgPSB7fTsgLy8gbmV0d29yayBkYXRhXHJcbmV4cG9ydCBsZXQgbmV0d29ya0hpZXJhcmNoeSA9IHt9OyAvLyBuZXR3b3JrIGhpZXJhcmNoeSBkYXRhXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGJhc2ljIGRhdGEgdG8gZ2V0IHRoZSB0b29sIHJ1bm5pbmcuXHJcbiAqIGFmdGVyIHRoZSBwZW5kaW5nIGFqYXggcXVlcmllcyBhcmUgZmluaXNoZWRcclxuICogdGhlIHRvb2wgaXMgZHJhd25cclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhQnV0dG9uKCk7XHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENvbmNhY3QgdG8gdGhlIG1haW4gZGF0YXNldFxyXG4gKiB0aGUgaWRlYSBpcyB0byB1c2UgdGhpcyBvbmUgZGF5IGZvciBsYXp5IGxvYWRpbmdcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBtb3ZlbWVudCBkYXRhc2V0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0YXNldCh2YWx1ZSkge1xyXG4gICAgZGF0YXNldCA9IGRhdGFzZXQuY29uY2F0KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IHBlcmNlbnRpbGVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBhcnJhcnlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVNldFBlcmNlbnRpbGUodmFsdWUpIHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWV0YURhdGEodmFsdWUpIHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSA9IHZhbHVlO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGEoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgc3dhcm0gZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCxmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBhZGQgdGhlIHRoZSBvYmplY3QgdG8gdGhlIGFycmF5IGlmIHRoZXJlIGlzIG5vIGVsZW1lbnQgeWV0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2FybURhdGFbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YS5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGludGVnZXIgb3IgZmxvYXRcclxuICAgICAgICBpZiAoZGF0YVtpXSAmJiAhKGlzTmFOKGRhdGFbaV0pKSkge1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpcyBzdHJpbmdcclxuICAgICAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gZGF0YVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBmZWF0dXJlcyB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLCBmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGFzZXRbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGRhdGFzZXQucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBhcnNlIHRoZSBpbnRcclxuICAgICAgICBkYXRhc2V0W2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSB0aGUgY2FsY3VsYXRlZCBhZGphY2VuY3kgbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0RhdGEodmFsdWUpIHtcclxuICAgIG5ldHdvcmtEYXRhID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgaGllYXJoY3kgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBoaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlEYXRhKHZhbHVlLCBuZXR3b3JrX2lkKSB7XHJcbiAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyBlbXB0eSByZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgbmV0d3Jva0hpZXJhcmNoeSBvYmplY3RcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuICAgICAgICBkZWxldGUgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlMZXZlbChuZXR3b3JrX2lkKTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlDb2xvcihuZXR3b3JrX2lkKTtcclxuICAgIH0gLy8gYWRkIGl0IHRvIHRoZSBuZXR3b3JrIGhpZXJhcmNoeVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXSA9IHZhbHVlO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUxldmVsKG5ldHdvcmtfaWQsIDIpO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUNvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgfSAvLyB0b28gbWFueSBlbGVtZW50cyBjYW50IGJlIGFkZGVkXHJcblxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLGQzLCBwYXJhbWV0ZXJzLCBTZXQgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldCxcclxuICAgIG5ldHdvcmtEYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbmV0d29ya0NvbG9yU2NhbGUsXHJcbiAgICBuZXR3b3JrQXV0byxcclxuICAgIHNldE5ldHdvckxpbWl0LFxyXG4gICAgbmV0d29ya0xpbWl0LFxyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHksXHJcbiAgICBuZXR3b3JrSURcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICB1cGRhdGVMaW5lQ2hhcnRcclxufSBmcm9tICcuLi9saW5lX2NoYXJ0JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc1xyXG59IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFRpbWVTbGlkZXIsXHJcbiAgICBpbml0VG9vbHRpcCxcclxuICAgIHRvb2x0aXBGdW5jdGlvbixcclxuICAgIGluaXRTbGlkZXJzLFxyXG4gICAgdG9vbHRpcFxyXG59IGZyb20gJy4vaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3JcclxufSBmcm9tICcuLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdENvbG9yUGlja2VyLFxyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0TGlzdGVuZXJzLFxyXG4gICAgcGxheUJvb2xlYW5cclxufSBmcm9tICcuLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0RGVuZHJvZ3JhbSxcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbmV0d29ya0hpZXJhcmNoeUlkcyxcclxuICAgIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYsXHJcbiAgICByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXZcclxufSBmcm9tICcuLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHRyYWNraW5nQm9vbGVhbixcclxuICAgIGFkZFRyYWNrZWREYXRhXHJcbn0gZnJvbSAnLi4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCBpbmRleFRpbWUgPSAwOyAvLyBhY3R1YWwgdGltZSBtb21lbnQgaW4gdGhlIGFuaW1hdGlvblxyXG5leHBvcnQgbGV0IHRhbmtXaWR0aDtcclxuZXhwb3J0IGxldCB0YW5rSGVpZ2h0O1xyXG5leHBvcnQgbGV0IGFjdGl2ZVNjYWxlID0gJ2JsYWNrJzsgLy8gY2FuIGJlIHNwZWVkLCBhY2NlbGVyYXRpb24sIC4uIGFuZCBibGFjayAobWVhbmluZyBubyBhY3RpdmUgc2NhbGUpXHJcbmV4cG9ydCBsZXQgbWVkb2lkQW5pbWFsID0gLTE7IC8vIHdoaWNoIGFuaW1hbCBpcyB0aGUgbWVkb2lkICgtMSBpcyBubyBhbmltYWwpXHJcbmV4cG9ydCBsZXQgYWN0aXZlQW5pbWFscyA9IFtdOyAvLyBhY3RpdmUgc2VsZWN0ZWQgYW5pbWFsc1xyXG5leHBvcnQgbGV0IGFycmF5QW5pbWFsczsgLy8gYXJyYXkgb2YgYW5pbWFscyBmb3IgdGhlIHNwZWNpZmljIHRpbWUgZnJhbWVcclxuZXhwb3J0IGxldCBhbmltYWxfaWRzOyAvLyBhcnJheSBvZiB1bmlxdWUgYW5pbWFsIGlkc1xyXG5cclxubGV0IHN2Z0NvbnRhaW5lcjsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIHNwYXRpYWwgdmlld1xyXG5sZXQgdGFuazsgLy8gc3ZnIGdyb3VwIGZvciB0aGUgc3BhdGlhbCB2aWV3IHRhbmtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBzcGF0aWFsIHZpZXcgd2l0aCBhbGwgdGhlIGltcG9ydGFudCBmYWN0b3JzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3BhdGlhbFZpZXdJbml0KCkge1xyXG5cclxuICAgIGxldCBtaW5Qb2ludCA9IHBhcmFtZXRlcnNbJ21pbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgbGV0IG1heFBvaW50ID0gcGFyYW1ldGVyc1snbWF4J11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyBsZXQgY29vcmRpbmF0ZU9yaWdpbiA9IHBhcmFtZXRlcnNbJ2Nvb3JkaW5hdGVfb3JpZ2luJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyB3aWR0aCA9IHdpZHRoICoxLjAyIC0tPiBzbyB0aGVyZSBpcyBhIG1hcmdpbiBpbiB0aGUgc3BhdGlhbCB2aWV3IHdoZXJlIG5vIGFuaW1hbCBpcyBldmVyXHJcbiAgICB0YW5rV2lkdGggPSAobWF4UG9pbnRbMF0gLSBtaW5Qb2ludFswXSkgKiAxLjAyO1xyXG4gICAgdGFua0hlaWdodCA9IChtYXhQb2ludFsxXSAtIG1pblBvaW50WzFdKSAqIDEuMDI7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgdmlldyByZXNpemFibGVcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21haW4tdmlzJykuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50J1xyXG4gICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJCgnI21haW4tdmlzLWRpdicpLndpZHRoKClcclxuICAgICAgICAgICAgfSkuaGVpZ2h0KHRhbmtIZWlnaHQgKiAwLjYpXHJcbiAgICAgICAgICAgIC53aWR0aCh0YW5rV2lkdGggKiAwLjYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9yZXNldCBhbGwgY2hlY2tib3hlc1xyXG4gICAgJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgLy9zZXQgdGhlIGNvbG9yIHNjYWxlIGZ1bmN0aW9uIHRvIGxpbmVhclxyXG4gICAgJCgnI2NvbG9yLXNjYWxlLWxpbmVhcicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNncm91cC1zaXplLW0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNzZXR0aW5ncy1kaXYgaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAvL2hpZGUgdGhlIGxvYWRpbmcgZ2lmXHJcbiAgICAkKCcjbG9hZGluZycpXHJcbiAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAvLyBnZXQgIG51bWJlciBvZiBkaXN0aW5jdCBhbmltYWwgaWRzXHJcbiAgICBsZXQgbnVtX2FuaW1hbHMgPSBuZXcgU2V0KCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YXNldFtpXVsndCddID09PSBkYXRhc2V0WzBdWyd0J10pIHtcclxuICAgICAgICAgICAgbnVtX2FuaW1hbHMuYWRkKGRhdGFzZXRbaV1bJ2EnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSA9IGRhdGFzZXQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFuaW1hbF9pZHMgPSBBcnJheS5mcm9tKG51bV9hbmltYWxzKS5zb3J0KCk7XHJcblxyXG4gICAgLy9YIGFuZCBZIGF4aXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKTtcclxuXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgIC50aWNrcyg3KVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgLy8gWk9PTUlORyBBTkQgUEFOTklORyBTVFVGRlxyXG4gICAgLy8gVE9ETyByZW1vdmUgdGhpcyBmcm9tIGhlcmUgdG8gaW50ZXJhY3Rpb25cclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgNl0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICAvLyBtb2RpZnkgdGhlIHRyYW5zbGF0ZSBzbyB0aGF0IGl0IG5ldmVyIGV4aXRzIHRoZSB0YW5rXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgdGFua1dpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rV2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgdGFua0hlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua0hlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVYKHgpKSk7XHJcbiAgICAgICAgICAgIGdZYXhpcy5jYWxsKHlBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWSh5KSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vdGhlIHN2ZyBjb250YWluZXJcclxuICAgIHN2Z0NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI21haW4tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG5cclxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvLCBmb3IgIDEyNDAvMTkwMCA9IDAuNjUgc28gcGFkZGluZy1ib3R0b20gPSA2NSUgKi9cclxuICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCh0YW5rSGVpZ2h0IC8gdGFua1dpZHRoKSAqIDEwMCk7XHJcbiAgICAkKCcjbWFpbi12aXMnKS5hcHBlbmQoJCgnPHN0eWxlPiNtYWluLXZpczo6YWZ0ZXIge3BhZGRpbmctdG9wOiAnICsgcGVyY2VudGFnZSArICclO2Rpc3BsYXk6IGJsb2NrO2NvbnRlbnQ6IFwiXCI7fTwvc3R5bGU+ICcpKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzdmdDb250YWluZXIuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAvLyAgLmF0dHIoJ2QnLHBhdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4bGluazpocmVmJywgJy8nICsgcGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFja2dyb3VuZEltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRhbmtXaWR0aClcclxuICAgICAgICAgICAgLy8gd2hpbGUgYWRkaW5nIGFuIGltYWdlIHRvIGFuIHN2ZyB0aGVzZSBhcmUgdGhlIGNvb3JkaW5hdGVzIGkgdGhpbmsgb2YgdGhlIHRvcCBsZWZ0XHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ2JhY2tncm91bmQnLCAnI2ZmZicpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgdGFuayBncm91cCB3aXRoIGEgdHJhbnNmb3JtYXRpb24gd2hpY2ggcm90YXRlcyB0aGUgeSBheGlzXHJcbiAgICB0YW5rID0gem9vbUdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0YW5rJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gMTtcclxuICAgICAgICAgICAgbGV0IHkgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF94KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeSkge1xyXG4gICAgICAgICAgICAgICAgeSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnc2NhbGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYWRkIHRoZSBjZW50cm9pZFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjZW50cm9pZCBoaWRkZW4nKVxyXG4gICAgICAgIC5hdHRyKCdyJywgNilcclxuICAgICAgICAuYXR0cignY3gnLCAwKVxyXG4gICAgICAgIC5hdHRyKCdjeScsIDApO1xyXG5cclxuICAgIC8vIGFycm93IGZvciB0aGUgY2VudHJvaWQgZGlyZWN0aW9uXHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtYXJyb3cnKVxyXG4gICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNjZW50cm9pZC1hcnJvdyknKTtcclxuXHJcbiAgICAvL2FwcGVuZCBuZXR3b3JrICBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICduZXR3b3JrR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBkZWxhdW5heS10cmlhbmd1bGF0aW9uIGdyb3VwXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2RlbGF1bmF5LXRyaWFuZ3VsYXRpb24tZ3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCB2b3Jvbm9pIGdyb3VwXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3Zvcm5vaUdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdGhlIGZyYW1lIHRpbWUgdGV4dFxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZyYW1lLXRleHQnKVxyXG4gICAgICAgIC5hdHRyKCd4JywgMzApXHJcbiAgICAgICAgLmF0dHIoJ3knLCAzMClcclxuICAgICAgICAudGV4dCgnLS0gOiAtLSA6IC0tICcpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgYXhpc1xyXG4gICAgbGV0IGdYYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxyXG4gICAgICAgIC5jYWxsKHhBeGlzKTtcclxuXHJcbiAgICBsZXQgZ1lheGlzID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuICAgIC8vIGluaXQgc3R1ZmYgZnJvbSBvdGhlciBtb2R1bGVzXHJcbiAgICBpbml0VG9vbHRpcCgpO1xyXG4gICAgaW5pdFNsaWRlcnMoKTtcclxuICAgIGFkZFNwYXRpYWxWaWV3R3JvdXAoKTtcclxuICAgIGluaXRDb2xvclBpY2tlcigpO1xyXG4gICAgbGluZUNoYXJ0KCk7XHJcbiAgICBpbml0TGlzdGVuZXJzKCk7XHJcbiAgICBpbml0RGVuZHJvZ3JhbSgpO1xyXG4gICAgLy8gc3RhcnQgdGhlIGFuaW1hdGlvblxyXG4gICAgZHJhdygpO1xyXG59XHJcblxyXG4vKipcclxuICogRHJhd2luZyBmdW5jdGlvbiAtIGlzIGNhbGxlZCBmb3IgZWFjaCB0aW1lc3RlcFxyXG4gKiBpbmRleFRpbWUgc2F2ZXMgdGhlIGN1cnJlbnQgdGltZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoKSB7XHJcbiAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWUgb2YgZnVuY3Rpb24gZHJhd1xyXG4gICAgLy8gbGV0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgLy91cGRhdGUgdGltZSB0byB3YWl0IGFrYSBzcGVlZCBvZiByZXBsYXlcclxuICAgIGxldCB0aW1lVG9XYWl0ID0gJCgnaW5wdXRbbmFtZT1ncm91cDFdOmNoZWNrZWQnLCAnI2dyb3VwMScpXHJcbiAgICAgICAgLnZhbCgpO1xyXG4gICAgLy9zY2FsZSB0aGUgc2l6ZSBieSB0aGlzIG51bWJlclxyXG4gICAgbGV0IGFuaW1hbFNjYWxlID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLXNpemU6Y2hlY2tlZCcpXHJcbiAgICAgICAgLnZhbCgpO1xyXG5cclxuICAgIC8vZ2V0IHRoZSBuZXh0IGFuaW1hbHNcclxuICAgIGFycmF5QW5pbWFscyA9IGRhdGFzZXQuc2xpY2UoYW5pbWFsX2lkcy5sZW5ndGggKiBpbmRleFRpbWUsIGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lICsgYW5pbWFsX2lkcy5sZW5ndGgpO1xyXG5cclxuICAgIC8vdGhlIHRpbWVvdXQgaXMgc2V0IGFmdGVyIG9uZSB1cGRhdGUgMzAgbXNcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGRyYXcgaGllcmFyY2h5XHJcbiAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSB0aW1lIGZyYW1lIHRleHRcclxuICAgICAgICAgICAgc3ZnQ29udGFpbmVyLnNlbGVjdCgnLmZyYW1lLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoTWF0aC5mbG9vcihpbmRleFRpbWUgLyAxNTAwKSAlIDYwICsgJzonICsgTWF0aC5mbG9vcihpbmRleFRpbWUgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyBpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGEgc2Vjb25kIGhhcyBjaGFuZ2VkIG1vdmUgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVTbGlkZXIoaW5kZXhUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN2Z0FuaW1hbHMgPSB0YW5rLnNlbGVjdEFsbCgnZy5hbmltYWwnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoYXJyYXlBbmltYWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5ldHdvcmsgdmlzXHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVmlzO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lIGluIG5ldHdvcmtEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29yayA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IG5ldHdvcmtEYXRhW2luZGV4VGltZV07XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCB0aGUgZ3JvdXAgc3RhbmRhcmQgZGV2aWF0aW9uIGZvciB0aGUgaGllcmFyaGN5XHJcbiAgICAgICAgICAgICAgICAvLyBuZWVkZWQgZm9yIGNvbG9yaW5nIG9mIHRoZSBkZW5kcm9ncmFtIG5vZGVzICh2YXJpYWNuZSApXHJcbiAgICAgICAgICAgICAgICByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXYoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIHdob2xlIG5ldHdvcmtcclxuICAgICAgICAgICAgICAgIGlmIChzaG93TmV0d29ya0hpZXJhcmNoeSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMSc6IGFycmF5QW5pbWFsc1tpXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGFydCc6IGFycmF5QW5pbWFsc1tpXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbmQnOiBhcnJheUFuaW1hbHNbal1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2luZGV4ID0gdG1wX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gLy8gZGlzcGxheSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjbHVzdGVyaW5nXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd19kZW5kcm9ncmFtID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBuZXR3b3JrSGllcmFyY2h5SWRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtIaWVyYXJjaHlJZHNba10uaW5jbHVkZXMoYXJyYXlBbmltYWxzW2ldWydhJ10pICYmIG5ldHdvcmtIaWVyYXJjaHlJZHNba10uaW5jbHVkZXMoYXJyYXlBbmltYWxzW2pdWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ldHdvcmtIaWVyYXJjaHlJZHNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUxJzogYXJyYXlBbmltYWxzW2ldWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTInOiBhcnJheUFuaW1hbHNbal1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGFydCc6IGFycmF5QW5pbWFsc1tpXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IGFycmF5QW5pbWFsc1tqXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHRtcFt0bXBfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0cnVlIGRlcGljdCB0aGUgc3RhbmRhcmQgZGV2aWF0aW9uIHZpYSBjb2xvciBpbiB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIG1ha2UgdGhpcyBmYXN0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNob3dfZGVuZHJvZ3JhbSAmJiBpZCA9PT0gbmV0d29ya0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRoaWVyYXJjaHlHcm91cFN0ZGV2KCdoJyArIG5ldHdvcmtIaWVyYXJjaHlJZHNba10udG9TdHJpbmcoKS5oYXNoQ29kZSgpLCB0bXBbdG1wX2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBfaW5kZXggPSB0bXBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTEnXSArICctJyArIGRbJ25vZGUyJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoKCcjbWMtJyArIGRbJ25vZGUyJ10gKyAnLScgKyBkWydub2RlMSddKSkuY3NzKCdmaWxsJywgbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV0d29yay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKG5ldHdvcmtbaV1bJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV0d29yTGltaXQocGVyY2VudGlsZXModG1wQXJyYXkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrID0gbmV0d29yay5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXSA8PSBuZXR3b3JrTGltaXQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTlxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0KCcjbmV0d29ya0dyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKG5ldHdvcmspO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVJcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gbmV0d29ya1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsYXVuYXkgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsndHJpYW5ndWxhdGlvbiddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9yb25vaVxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFua1xyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShzd2FybURhdGFbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Zvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2b3Jvbm9pLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9FTlRFUiAtIGFwcGVuZCB0aGUgYW5pbWFsIGdyb3Vwc1xyXG4gICAgICAgICAgICBsZXQgYW5pbWFsR3JvdXBpbmdzID0gc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhbmltYWwtJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBjaXJjbGVzIGZvciBlYWNoIGFuaW1hbCB0byB0aGUgYW5pbWFsZ3JvdXBcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgMS41ICogYW5pbWFsU2NhbGUpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEZ1bmN0aW9uKGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIG9uIGNsaWNrIGZvciB0aGUgYWN0aXZlIGZpc2hzXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQW5pbWFscyA9IGFjdGl2ZUFuaW1hbHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVQREFURSAtIGFuaW1hbHMgY2lyY2xlc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGFuaW1hbFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBmb3IgZWFjaCBncm91cCB0aGUgYXJyb3csIG5lZWRlZCBmb3IgY29sb3JpbmdcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJvdy1tYXJrZXItJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3NcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCNhcnJvdy1tYXJrZXItJyArIGRbJ2EnXSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9leGVjdXRlIG9ubHkgd2hlbiBkcmF3IGRpcmVjdGlvbiBidXR0b24gaXMgY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ3AnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ3AnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLWRbJ2RpcmVjdGlvbiddICsgJyAnICsgZFsncCddWzBdICsgJyAnICsgLWRbJ3AnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdyBoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHRoZSBncm91cHNcclxuICAgICAgICAgICAgc3ZnQW5pbWFscy5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29udmV4IGh1bGxcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gcGF0aHNcclxuICAgICAgICAgICAgICAgIHZhciBodWxsUGF0aCA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmh1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW3N3YXJtRGF0YVtpbmRleFRpbWVdWydjb252ZXhfaHVsbCddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gaHVsbCBwYXRoXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFTlRFUiAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBubyBodWxsXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aCA9IHRhbmsuc2VsZWN0KCdwYXRoLmh1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgIGh1bGxQYXRoLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGNvbG9ycyBvZiB0aGUgZmlzaFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlU2NhbGUgIT09ICdibGFjaycpIHtcclxuICAgICAgICAgICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICAgICAgICAgIHZhciB0bXBTY2FsZSA9IHJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBTY2FsZShkW2FjdGl2ZVNjYWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yIGV2ZXJ5IGZpc2ggYmxhY2tcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnIzAwMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICcjMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QobWV0YWRhdGFDb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YUNvbG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2FuaW1hbC0nICsga2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgbWV0YWRhdGFDb2xvcltrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG1ldGFkYXRhQ29sb3Jba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY2hhbmdlIG9wYWN0aXkgaWYgdGhlIGZpc2ggaXMgc2VsZWN0ZWRcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5pbmNsdWRlcyhkWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjI1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIHRyYWNraW5nIGlzIG9uXHJcbiAgICAgICAgICAgICAgICBpZiAodHJhY2tpbmdCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVHJhY2tlZERhdGEoYXJyYXlBbmltYWxzWzBdWyd0J10sIGFjdGl2ZUFuaW1hbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG5vcm1hbCBvcGFjaXR5XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZHJhdyBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpICYmXHJcbiAgICAgICAgICAgICAgICBzd2FybURhdGFbaW5kZXhUaW1lXS5jZW50cm9pZCAmJlxyXG4gICAgICAgICAgICAgICAgJCgnI2RyYXctY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSBhbmltYWwgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnZGlyZWN0aW9uJ10gKyAnICcgKyBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXSArICcgJyArIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtZWRvaWRcclxuICAgICAgICAgICAgaWYgKG1lZG9pZEFuaW1hbCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtZWRvaWRBbmltYWwgPSBzd2FybURhdGFbaW5kZXhUaW1lXVsnbWVkb2lkJ107XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICBpbmRleFRpbWUrKztcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUxpbmVDaGFydCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgcGxheSBidXR0b24gaXMgYWN0aXZlIGFuZCBpZiB0aGUgYW5pbWF0aW9uIGlzIG5vdCBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lID49IHN3YXJtRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vc3RhcnQgYWdhaW4gZnJvbSB0aGUgc3RhcnRcclxuICAgICAgICAgICAgICAgIGluZGV4VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheUJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZVxyXG4gICAgICAgICAgICAgICAgLy8gICBsZXQgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2codDEgLSB0MCk7IC8vIGluIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lVG9XYWl0KTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgaW5kZXggdGltZSB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdGltZSBzdGVwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5kZXhUaW1lKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAoaW5kZXhUaW1lIDw9IHN3YXJtRGF0YS5sZW5ndGgpKSB7XHJcbiAgICAgICAgaW5kZXhUaW1lID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluZGV4VGltZSA9IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNyZWFzZSB0aW1lIGJ5IDFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNJbmRleFRpbWUoKSB7XHJcbiAgICBpbmRleFRpbWUgPSBpbmRleFRpbWUgLSAxO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aGUgbmV3IGFjdGl2ZSBzY2FsZSAtIGUuZy4gc3BlZWQsIGFjY2VsZXJhdGlvbiwgYmxhY2sgZXRjLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgLSBhY3RpdmUgc2NhbGUgZm9yIHRoZSBpbmRpdmlkdWFsIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVTY2FsZSh2YWx1ZSkge1xyXG4gICAgYWN0aXZlU2NhbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV3IG1lZG9pZCBhbmltYWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVW5pcXVlIGlkIG9mIHRoZSBhbmltYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZWRvaWRBbmltYWwodmFsdWUpIHtcclxuICAgIG1lZG9pZEFuaW1hbCA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzZWxlY3RlZCBhbmQgaGlnaGxpZ2h0ZWQgYW5pbWFsc1xyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIHVucWl1ZSBpZCBvZiB0aGUgYW5pbWFsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZUFuaW1hbHModmFsdWUpIHtcclxuICAgIGFjdGl2ZUFuaW1hbHMgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsIGQzICovXHJcbmltcG9ydCB7XHJcbiAgICBoaWVyYXJjaHlDb2xvcnMsXHJcbiAgICBjb2xvcnMsXHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmRcclxufSBmcm9tICcuL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBsZXQgbmV0d29ya0F1dG8gPSBmYWxzZTsgLy8gaWYgdHJ1ZSB0aGUgbmV0d29yayBlZGdlIGxpbWl0IGlzIGF1dG9tYXRpY2FsbHkgc3VnZ2VzdGVkXHJcbmV4cG9ydCBsZXQgbmV0d29ya0xpbWl0ID0gMC41O1xyXG5leHBvcnQgbGV0IHNob3dOZXR3b3JrSGllcmFyY2h5O1xyXG5leHBvcnQgbGV0IG5ldHdvcmtDb2xvciA9IHt9O1xyXG5leHBvcnQgbGV0IG5ldHdvcmtJRDtcclxuLy8gZml4ZWQgY29sb3Igc2NhbGUgZm9yIHRoZSBuZXR3b3JrXHJcblxyXG4vKipcclxuICogY29sb3Igc2NhbGUgZm9yIG5ldHdvcmsgLSByYW5nZSBpcyBkZWZpbmVkIGR5bmFtaWMgYmFzZWQgb24gdGhlIGhpZXJhcmhjeSBjb2xvclxyXG4gKi9cclxuZXhwb3J0IGxldCBuZXR3b3JrQ29sb3JTY2FsZSA9IGQzLnNjYWxlVGhyZXNob2xkKClcclxuICAgIC5kb21haW4oXHJcbiAgICAgICAgWzAsIC4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOCwgLjksIDFdXHJcbiAgICApO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIG5ldHdvcmsgIHNlbGVjdCBidXR0b25zIGFuZCBoaWVyYXJjaHkgY2hlY2tib3hlcyB0byB0aGUgbmV0d29yayBtb2RhbFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgbmV0d29yayBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV0d29ya0J1dHRvbnMoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldWydmaW5pc2hlZCddKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29ya3MtaGllcmFyY2hpZXMtdGFibGUgdGJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzx0cj48dGQ+JyArIGRhdGFbaV1bJ25hbWUnXSArICc8L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJsb2NrXCIgZGF0YT0nICsgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJyBuYW1lPScgKyBkYXRhW2ldWyduYW1lJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnIDx0ZD48bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3ggaGllYXJjaHktY2hlY2tib3hcIj48aW5wdXQgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dCBoaWRkZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhPScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduZXR3b3JrX2lkJ10gKyAnIG5hbWU9JyArIGRhdGFbaV1bJ25hbWUnXSArICc+PHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbmRpY2F0b3JcIj48L3NwYW4+PC9sYWJlbD48L3RkPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHRkPjxsYWJlbCBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jaGVja2JveCBuZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveFwiPjxpbnB1dCBjbGFzcz1cImN1c3RvbS1jb250cm9sLWlucHV0IGhpZGRlblwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGE9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJ1wiPjxzcGFuIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yXCI+PC9zcGFuPjwvbGFiZWw+PC90ZD4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI25ldHdvcmtzLWhpZXJhcmNoaWVzLXRhYmxlJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbmV0d29yayBkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGF1dG8gdmFsdWUgLSBpZiB0cnVlIHRoYW4gdGhlIG5ldHdvcmsgbGltaXQgaXMgc2V0IHRvIHRoZSAwLjk1IHBlcmNlbnRpbGUgb2YgYWxsIHZhbHVlc1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0F1dG8odmFsdWUpIHtcclxuICAgIG5ldHdvcmtBdXRvID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbGltaXQgd2l0aCB0aGUgc3BlY2lmaWMgbmV0d29yayBzbGlkZXIgLSBjdXN0b21cclxuICogMCA9IHNpbWlsYXIgYW5kIDEgdW5zaW1pbGFyIGZvciB0aGUgc3BlY2lmaWMgdGltZSBtb21lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gYmV0d2VlbiAwIGFuZCAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29yTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtMaW1pdCA9IDEgLSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBpbiBoaWVyYXJjaHkgKGUuZy4gaDApIGZpbHRlclxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGllcmFyY2h5IC0gZS5nLiAwLW5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrSGllcmFyY2h5KHZhbHVlKSB7XHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIG5ldHdvcmsgaWQgLSBuZWVkZWQgZm9yIGhpZXJhcmNoeSBzdGFuZGFyZCBkZXZpYXRpb24gY29sb3JpbmdcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gZS5nLiAwLW5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrSUQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtJRCA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IG5ldHdvcmsgY29sb3Igc2NhbGUgcmFuZ2VcclxuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCAtIGlkIG9mIHRoZSBuZXR3b3JrXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0bmV0d29ya0NvbG9yKG5ldHdvcmtfaWQpIHtcclxuICAgIC8vIGlmIGlkID0gLTEgc2V0IHRoZSBjb2xvciB0byBub3RoaW5nXHJcbiAgICBpZiAobmV0d29ya19pZCA+PSAwKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgY29sb3Igb2YgdGhlIGVkZ2VzXHJcbiAgICAgICAgbmV0d29ya0NvbG9yID0ge307XHJcblxyXG4gICAgICAgIC8vIGhpZXJhcmNoeSBjb2xvcnMgd2hpY2ggYXJlIGFscmVhZHkgaW4gdXNhZ2VcclxuICAgICAgICBsZXQgdG1wQ29sb3IgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb2xvclxyXG4gICAgICAgIC8vIHNlYXJjaCBpbiB0aGUgaGllcmFyeUNvbG9ycyBpZiBhIGNvbG9yIHdhcyBkZWZpbmVkIGZvciB0aGUgbmV0d29yayBpZFxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBoaWVyYXJjaHlDb2xvcnMpIHtcclxuICAgICAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAoJ2gnICsgbmV0d29ya19pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF0gPSBoaWVyYXJjaHlDb2xvcnNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wQ29sb3IucHVzaChoaWVyYXJjaHlDb2xvcnNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhlIHRoZSBuZXR3b3JrQ29sb3IgaXMgc3RpbGwgZW1wdHkgY2hvb3NlIGEgY29sb3JcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY29sb3IgaXMgYWxyZWFkeSBpbiB1c2FnZSwgaWYgc28gc2tpcFxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRtcENvbG9yLmluZGV4T2YoY29sb3JzW2ldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBjb2xvciBzY2FsZVxyXG4gICAgICAgIGxldCB0bXAgPSBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF07XHJcbiAgICAgICAgbmV0d29ya0NvbG9yU2NhbGVcclxuICAgICAgICAgICAgLnJhbmdlKFtkMy5jb2xvcih0bXApLmRhcmtlcihbNV0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbNF0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbM10pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbMl0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbMV0pLFxyXG4gICAgICAgICAgICAgICAgZDMuY29sb3IodG1wKSwgZDMuY29sb3IodG1wKS5icmlnaHRlcihbMV0pLCBkMy5jb2xvcih0bXApLmJyaWdodGVyKFsyXSksIGQzLmNvbG9yKHRtcCkuYnJpZ2h0ZXIoWzNdKSwgZDMuY29sb3IodG1wKS5icmlnaHRlcihbXSlcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBuZXR3b3JrQ29sb3IgPSB7fTtcclxuICAgIH1cclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZCgpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL25ldHdvcmsuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZHJhd1xyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0UGxheUJvb2xlYW5cclxufSBmcm9tICcuL2xpc3RlbmVyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0VHJlbmRDaGFydExpc3RlbmVyXHJcbn0gZnJvbSAnLi9saW5lX2NoYXJ0LmpzJztcclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIHBsYXkgYnV0dG9uIC0tPiBMb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHRoZSBwbGF5IGJ1dHRvbiByZW1vdmUgbG9hZGluZyBzeW1ib2xcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4odHJ1ZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5QbGF5Jyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gIC4wNSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlcyhhcnIpIHtcclxuICAgIGxldCBwID0gMC4wNTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcDtcclxuICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSBhcnJbbG93ZXJdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMSAtIChhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIDA1LCAyNSwgNTAsIDc1LCA5NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlc0xpbmVDaGFydChhcnIpIHtcclxuICAgIGxldCBwID0gWzAuMDUsIDAuMjUsIDAuNSwgMC43NSwgMC45NV07XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgIH0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHBbaV07XHJcbiAgICAgICAgbGV0IGxvd2VyID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICAgICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICAgICAgaWYgKHVwcGVyID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2xvd2VyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGFic29sdXRlIGZlYXR1cmUgY2hlY2tib3hlcyBpbiB0aGUgZmVhdHVyZSBwYW5lbFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnMoZGF0YVNldFBlcmNlbnRpbGUpIHtcclxuICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgb2JqZWN0XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YVNldFBlcmNlbnRpbGUpIHtcclxuICAgICAgICBpZiAoZGF0YVNldFBlcmNlbnRpbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0ZXh0IGZvciB0aGUgZGlzcGxheWVkIGJ1dHRvblxyXG4gICAgICAgICAgICBsZXQgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBrZXkuc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgICAgIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5zbGljZSgxKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBidXR0b25cclxuICAgICAgICAgICAgJCgnI2Fic29sdXRlLWZlYXR1cmUtY2hlY2tib3hlcycpLmFmdGVyKCc8ZGl2IGNsYXNzPVwiZmVhdHVyZS1jaGVjay1ib3gtZGVmYXVsdFwiPiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImNoZWNrYm94XCIgaWQ9XCJkcmF3LScgKyBrZXkgK1xyXG4gICAgICAgICAgICAgICAgJ1wiLz48bGFiZWwgZm9yPVwiZHJhdy0nICsga2V5ICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArXHJcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJkcmF3LScgKyBrZXkgK1xyXG4gICAgICAgICAgICAgICAgJy1kZXRhaWxzXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBoaWRkZW4gZHJhdy1kZXRhaWxzXCIgZGF0YS10b2dnbGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9XCJmYWxzZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IDwvYnV0dG9uPiA8L2xhYmVsPiA8L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaW5pdCB0aGUgbGlzdGVybmVyc1xyXG4gICAgaW5pdFRyZW5kQ2hhcnRMaXN0ZW5lcigpO1xyXG5cclxufVxyXG5cclxuLy8gZ2VuZXJhdGUgaGFzaCBjb2RlcyBmcm9tIHN0cmluZ3NcclxuLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83NjE2NDYxL2dlbmVyYXRlLWEtaGFzaC1mcm9tLXN0cmluZy1pbi1qYXZhc2NyaXB0LWpxdWVyeVxyXG5TdHJpbmcucHJvdG90eXBlLmhhc2hDb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaGFzaCA9IDAsXHJcbiAgICAgICAgaSwgY2hyO1xyXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gaGFzaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hyID0gdGhpcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcclxuICAgICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc2g7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBzdGFuZGFyZERldmlhdGlvbiBvZiBhbiBhcnJheSBvZiBudW1iZXJzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciAtIGFycmF5IG9mIG51bWJlcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZERldmlhdGlvbihhcnIpIHtcclxuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGxldCBtZWFuID0gYXJyLnJlZHVjZShmdW5jdGlvbihwdiwgY3YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHB2ICsgY3Y7XHJcbiAgICAgICAgfSwgMCkgLyBhcnIubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0bXAgPSBhcnIubWFwKGZ1bmN0aW9uKG51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5wb3cobnVtIC0gbWVhbiwgMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0bXAucmVkdWNlKGZ1bmN0aW9uKHB2LCBjdikge1xyXG4gICAgICAgICAgICByZXR1cm4gcHYgKyBjdjtcclxuICAgICAgICB9LCAwKSAvIHRtcC5sZW5ndGgpO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCBkMywgUG9seUJvb2wqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxuICAgIGFycmF5QW5pbWFscyxcclxuICAgIHNldEFjdGl2ZUFuaW1hbHMsXHJcbiAgICBkZWNJbmRleFRpbWUsXHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeSxcclxuICAgIG5ldHdvcmtDb2xvclxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3RhbmRhcmREZXZpYXRpb25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxubGV0IHpvb21Hcm91cDsgLy8gem9vbSBncm91cCBmb3IgdGhlIHNwZWNpZmljIGRlbmRyb2dyYW1cclxubGV0IHRyZWVtYXA7XHJcbmxldCB0b29sdGlwRGl2O1xyXG5sZXQgc3BhdGlhbFZpZXc7IC8vIGdldCB0aGUgc3BhdGlhbCB2aWV3IHN2ZyBmcm9tIHRoZSBtYWluIHZpc1xyXG5sZXQgc3ZnTGVnZW5kO1xyXG5sZXQgaGllcmFyY2h5TGV2ZWxzID0ge307XHJcbmxldCBzZXRPcGVyYXRpb24gPSAndW5pb24nO1xyXG5sZXQgaWQ7IC8vIG5lZWRlZCBmb3IgdGhlIGNvbGxhcHNlIGZ1bmN0aW9uXHJcbi8vU3RhdGljIGNvbG9yIHNjYWxlIGZvciB0aGUgZGVuZHJvZ3JhbSB2YXJpYWNuZSBjb2xvcmluZ1xyXG5sZXQgc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgLmRvbWFpbihcclxuICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgIClcclxuICAgIC5yYW5nZShbJyNmN2ZiZmYnLCAnI2RlZWJmNycsICcjYzZkYmVmJywgJyM5ZWNhZTEnLCAnIzZiYWVkNicsICcjNDI5MmM2JywgJyMyMTcxYjUnLCAnIzA4NTE5YycsICcjMDgzMDZiJ10pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1heE51bWJlckhpZXJhcmNoaWVzID0gNDtcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5SWRzID0gW107XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5Q29sb3JzID0ge307XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5R3JvdXBTdGRldiA9IHt9O1xyXG4vLyBUT0RPIGFkZCBtb3JlIGNvbG9yc1xyXG5leHBvcnQgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjMzg2Y2IwJywgJyNlNzI5OGEnLCAnI2ZmOTkwMCddO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGRlbmRyb2dyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGNvbnN0YW5jdCBmYWN0b3JzIGZvciB0aGUgZGVuZGdyb2dyYW1cclxuICAgIGxldCBtYXJnaW4gPSAyMCxcclxuICAgICAgICB3aWR0aCA9IDUwMDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gNTAwMDtcclxuXHJcbiAgICAvLyB6b29tIGZ1bmN0aW9uIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDEwXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgd2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHdpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcblxyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIGhlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoaGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgYW5kIHNjYWxlXHJcbiAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS1wYW5lbCcpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHdpZHRoICsgJyAnICsgaGVpZ2h0KVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbScsIHRydWUpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG4gICAgaW5pdERlbmRyb2dyYW1MZWdlbmQoKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIHpvb20gZ3JvdXAgdG8gdGhlIHN2Z1xyXG4gICAgem9vbUdyb3VwID0gc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbiArICcsJyArIG1hcmdpbiArICcpJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIC8vIGQzIHRyZWVcclxuICAgIHRyZWVtYXAgPSBkMy50cmVlKCkgLy9kMy5jbHVzdGVyKClcclxuICAgICAgICAuc2l6ZShbKGhlaWdodCAtIDEwICogbWFyZ2luKSwgKHdpZHRoIC0gMTAgKiBtYXJnaW4pXSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBzcGF0aWFsIHZpZXcgLSBuZWVkZWQgdG8gYWRkIHRoZSBjbHVzdGVyaW5nIHRvIHRoZSBzcGF0aWFsIHZpZXcgd2luZG93XHJcbiAgICBzcGF0aWFsVmlldyA9IGQzLnNlbGVjdCgnLnRhbmsnKTtcclxuXHJcbiAgICAvLyBpbml0IGRlbmRyb2dyYW0gc2xpZGVyXHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBOZXR3b3JrIHNsaWRlclxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICBtaW46IDIsXHJcbiAgICAgICAgICAgIG1heDogMixcclxuICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgdmFsdWU6IGhpZXJhcmNoeUxldmVsc1snaDAnXSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeUxldmVsKGlkLCB1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIG5ldyBjbHVzdGVyaW5nIGFuZCBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBkZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGluaXQgdGhlIHRvb2x0aXAgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICB0b29sdGlwRGl2ID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS10b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBEaXZcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdCB0aGUgaGllcmFyY2h5IGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gbWF4TnVtYmVySGllcmFyY2hpZXMgKiAxMDA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2hpZXJhcmNoeS1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGFkZCBwYXR0ZXJuIGZvciBzdHJpcGVkIGJhY2tncm91bmQgb2YgaW50ZXJzZWN0aW9ucyBldGMuXHJcbiAgICBzcGF0aWFsVmlldy5hcHBlbmQoJ2RlZnMnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXR0ZXJuJylcclxuICAgICAgICAuYXR0cignaWQnLCAnc3RyaXBlZCcpXHJcbiAgICAgICAgLmF0dHIoJ3BhdHRlcm5Vbml0cycsICd1c2VyU3BhY2VPblVzZScpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzIwJylcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgJzUnKVxyXG4gICAgICAgIC5hdHRyKCdwYXR0ZXJuVHJhbnNmb3JtJywgJ3JvdGF0ZSg2MCknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIDUpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsMCknKVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsICcjNjcwMDBkJyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgZGVuZGdyb2dyYW0gZm9yIG9uZSBzdGVwXHJcbiAqIEZ1cnRoZXIgY2FsbHMgdGhlIGRyYXdIaWVyYXJjaHkgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGdldCB0aGUgYWN0aXZlIGRlbmRyb2dyYW1cclxuICAgIGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgIC8vIGlmIGRhdGEgaXMgYXZhaWFibGUgZHJhdyBoaWVyYXJjaHkgY2x1c3RlcnMgYW5kIGEgYnV0dG9uIGlzIGFjdGl2ZSBzZWxjdGVkXHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSAmJiBpZCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YSBhbmQgdHJhbnNmb3JtIGl0XHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBpZF1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gc2tpcCB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgbm9kZXMgPSBub2Rlcy5jaGlsZHJlblswXTtcclxuICAgICAgICAvLyBjb2xsYXBzZSB0aGUgdHJlZVxyXG4gICAgICAgIG5vZGVzLmNoaWxkcmVuLmZvckVhY2goY29sbGFwc2UpO1xyXG5cclxuICAgICAgICAvLyBtYXBzIHRoZSBub2RlIGRhdGEgdG8gdGhlIHRyZWUgbGF5b3V0XHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBpZiBubyBuZXR3b3JrIGlzIGNob29zZW5cclxuICAgICAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgc2xpZGVyIG1heFxyXG4gICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlcignb3B0aW9uJywgJ21heCcsIChub2Rlc1snaGVpZ2h0J10gLSAxKSlcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ3ZhbHVlJywgaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBsaW5rcyAoZWRnZXMpXHJcbiAgICAgICAgICAgIGxldCBsaW5rID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKS5zbGljZSgxKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFTlRFUlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBsaW5rcyB0byB0aGVpciBuZXcgcG9zaXRpb24uXHJcbiAgICAgICAgICAgIGxpbmtcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIGxpbmsuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBub2Rlc1xyXG4gICAgICAgICAgICAvLyBhZGRzIGVhY2ggbm9kZSBhcyBhIGdyb3VwXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubm9kZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBzIHRvIHRoZSBkZW5kZ3JvZ3JhbVxyXG4gICAgICAgICAgICB2YXIgbm9kZUVudGVyID0gbm9kZS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vZGUnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGQuY2hpbGRyZW4gPyAnIG5vZGUtLWludGVybmFsJyA6ICcgbm9kZS0tbGVhZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVIgLSBhcHBlbmQgZm9yIGVhY2ggZ3JvdXAgYSBub2RlIChjaXJjbGUpXHJcbiAgICAgICAgICAgIC8vIHdpdGggaGlnaGxpZ2h0aW5nIGZvciB0aGUgYWN0aXZlIGNob29zZW4gbGV2ZWxcclxuICAgICAgICAgICAgbm9kZUVudGVyLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA0MCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gZmluZCBhIG5pY2UgZnVuY3Rpb24gZm9yIHRoZSBvbiBjbGljayBtZXRob2RcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGljaylcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvb2x0aXAgcG9zaXRpb24gYW5kIHRleHRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYuc2VsZWN0KCcudG9vbHRpcC1zcGFuJykuaHRtbChkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaGlnaGxpZ2h0IGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdW5kaW9uIG9mIHRoZSBwYXRocyBtYWtlcyB0aGlzIGNvbXBsaWNhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSGlnaGxpZ2h0U3BhdGlhbFZpZXcoZFsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2LnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaGlnaGxpZ2h0IGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVIaWdobGlnaHRTcGF0aWFsVmlldygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVUERBVEUgLS0gdXBkYXRlIHRoZSBncm91cHNcclxuICAgICAgICAgICAgbm9kZUVudGVyXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGFlIHRoZSBub2RlIGFuZCBjaXJjbGVzXHJcbiAgICAgICAgICAgIC8vIHdpdGggYWN0aXZlLWxldmVsIGZ1bmN0aW9uIHRvIGhpZ2hsaWdodCB3aGljaCBsZXZlbCBpcyBjaG9zZW5cclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zZWxlY3QoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FjdGl2ZS1sZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYWN0aXZlLWxldmVsJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIG5vZGUuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb2xvciB0aGUgZGVuZHJvZ3JhbSBub2RlcyB1c2luZyB0aGUgc3RhbmRhcmREZXZpYXRpb24gaW4gdGhlIGNsdXN0ZXJcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGhpZXJhcmNoeUdyb3VwU3RkZXYpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgbGVnZW5kIGZvciB0aGUgY29sb3JpbmdcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhpZXJhcmNoeUdyb3VwU3RkZXYpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBsZWdlbmQgaGVyZVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0pVTVBTIEhFUkUnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJTVBPUlRBTlQgLSBhc3luYyBwcm9ibGVtc1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBzb2x2ZSB0aGlzIC0gdmVyeSBzbG93XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoaWVyYXJjaHlHcm91cFN0ZGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpIGluIGhpZXJhcmNoeUdyb3VwU3RkZXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvciB0aGUgbm9kZXMgYnkgY2FsY3VsYXRpbmcgdGhlIHN0YW5kYXJkRGV2aWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBjbHVzdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFjdGl2ZSBpcyBzaG93IGluIGNsdXN0ZXIgaXMgY2hvb3NlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpIGluIGhpZXJhcmNoeUdyb3VwU3RkZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVsbG8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGFuZGFyZERldmlhdGlvbihoaWVyYXJjaHlHcm91cFN0ZGV2WygnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFuZGFyZERldmlhdGlvbkNvbG9yU2NhbGUoc3RhbmRhcmREZXZpYXRpb24oaGllcmFyY2h5R3JvdXBTdGRldlsoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZFsnZGVwdGgnXSAhPT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQoJyNkZW5kcm9ncmFtLWxlZ2VuZCcpLmNzcygnZGlzcGxheScpICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWxlZ2VuZCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG5ldHdvcmtIaWVyYXJjaHkpKSB7XHJcbiAgICAgICAgLy8gZHJhdyB0aGUgaGllcmFyY2h5IGluIHNwYXRpYWwgdmlld1xyXG4gICAgICAgIGRyYXdIaWVyYXJjaHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxhcHNlIGZ1bmN0aW9uIC0gb25seSBzaG93IHRoZSBhY3RpdmUgbGV2ZWwgYW5kIG9uZSBzdWIgbGV2ZWxcclxuICovXHJcbmZ1bmN0aW9uIGNvbGxhcHNlKGQpIHtcclxuICAgIGlmIChkLmNoaWxkcmVuICYmIGQuZGVwdGggPD0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgIGQuX2NoaWxkcmVuID0gZC5jaGlsZHJlbjtcclxuICAgICAgICBkLl9jaGlsZHJlbi5mb3JFYWNoKGNvbGxhcHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZC5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3IHRoZSBhbGwgaGllcmFyY2hpZXMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBhZGQgYSBncm91cCB3aXRoIHRoZSBpZHMgb2YgdGhlIGFuaW1hbHMgaW4gaXQgdG8gdGhlIHZpZXdcclxuICogd2l0aCBwYXRoIGNoaWxkIGVsZW1lbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiBkcmF3SGllcmFyY2h5KCkge1xyXG4gICAgLy8gaWQgb2YgdGhlIGhpZXJhcmNoeSBlLmcuIFsxLDUsM11cclxuICAgIGxldCBoaWVyYXJjaHlJZHMgPSBPYmplY3Qua2V5cyhuZXR3b3JrSGllcmFyY2h5KS5tYXAoZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4LnJlcGxhY2UoJ2gnLCAnJyk7XHJcbiAgICB9KTtcclxuICAgIC8vICBUaGUgY2x1c3RlcmluZyBpbiBhbiAyRCBhcnJheSB3aXRoIHdoaWNoIGFuaW1hbCBpZCBiZWxvbmdzIHRvIHdoaWNoIGdyb3VwXHJcbiAgICBsZXQgaGllcmFyY2h5VmVydGljZXMgPSBbXTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoeSBkYXRhIHRvIGdldCB0aGUgaGllcmFyY2h5IGFuaW1hbCBpZHMgcGVyIGNsdXN0ZXJpbmcgYW5kIGdyb3VwaW5nXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpZXJhcmNoeUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0cmVlRGF0YSA9IG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgaGllcmFyY2h5SWRzW2ldXVtpbmRleFRpbWVdO1xyXG4gICAgICAgIGxldCBub2RlcyA9IGQzLmhpZXJhcmNoeSh0cmVlRGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5jaGlsZHJlbjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuICAgICAgICBsZXQgcm9vdCA9IG5vZGVzWydjaGlsZHJlbiddWzBdO1xyXG4gICAgICAgIGlmIChzaG93TmV0d29ya0hpZXJhcmNoeSA9PT0gaGllcmFyY2h5SWRzW2ldKSB7XHJcbiAgICAgICAgICAgIG5ldHdvcmtIaWVyYXJjaHlJZHMgPSBnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHlJZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhZGQgdGhlIHZlcnRpY2VzIGludG8gdGhlIGFycmF5XHJcbiAgICAgICAgaGllcmFyY2h5VmVydGljZXMucHVzaChnZXRIaWVyYXJjaHlWZXJ0aWNlcyhnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHlJZHNbaV0pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbW9yZSB0aGFuIDIgaGllcmFyY2hpZXMgYXJlIGRyYXduXHJcbiAgICBpZiAoaGllcmFyY2h5VmVydGljZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHVuaW9uIHRoZSBsaXN0IG9mIHBvbHlnb25zIHRvIG9uZSBwb2x5Z29uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXNbaV0gPSB1bmlvblBvbHlnb25zKGhpZXJhcmNoeVZlcnRpY2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSBhbmQgY2FsY3VsYXRlIHRoZSBpbnRlcnNlY3Rpb24gcG9seWdvbnMgb2YgdGhlIG4gaGllcmFyY2hpZXNcclxuICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyB0ZW1wIHNvbHV0aW9uIG9mIHR3byBpbnRlcnNlY3Rpb25zXHJcbiAgICAgICAgICAgIGxldCB0bXBJbnRlcnNlY3Rpb24gPSBoaWVyYXJjaHlWZXJ0aWNlc1swXTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaGllcyBhbmQgaW50ZXJzZWN0IGFsbCBvZiB0aGVtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gUG9seUJvb2wuaW50ZXJzZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBJbnRlcnNlY3Rpb24sIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogaGllcmFyY2h5VmVydGljZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IHRtcEludGVyc2VjdGlvblsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXN1bHRcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXMgPSBbdG1wSW50ZXJzZWN0aW9uXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJhbnNmb3JtIGFuZCBjYWxjdWxhdGUgdGhlIHN5bW1ldHJpYyBkaWZmZXJlbmNlIHBvbHlnb25zIG9mIHRoZSBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgIC8vIHhvciA9IFVuaW9uIG9mIGFsbCBoaWVyYXJjaGllcyAtIGludGVyc2VjdGlvbiBvZiBhbGwgaGllcmFyY2hpZXNcclxuICAgICAgICAgICAgLy8gdGVtcCBzb2x1dGlvbiBvZiB0d28gaW50ZXJzZWN0aW9uc1xyXG4gICAgICAgICAgICBsZXQgdG1wSW50ZXJzZWN0aW9uID0gaGllcmFyY2h5VmVydGljZXNbMF07XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2hpZXMgYW5kIGludGVyc2VjdCBhbGwgb2YgdGhlbVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IFBvbHlCb29sLmludGVyc2VjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogdG1wSW50ZXJzZWN0aW9uLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSB0bXBJbnRlcnNlY3Rpb25bJ3JlZ2lvbnMnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb24gcmVzdWx0XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb25IaWVyYXJjaHlQb2x5Z29ucyA9IHRtcEludGVyc2VjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIC8vIHVuaW9uXHJcbiAgICAgICAgICAgIGxldCB0bXBVbmlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0bXBVbmlvbiA9IFBvbHlCb29sLnVuaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBVbmlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgdG1wVW5pb24gPSB0bXBVbmlvblsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB1bmlvbkhpZXJhcmNoeVBvbHlnb25zID0gdG1wVW5pb247XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgICAgICAgICAgbGV0IHRtcERpZmZlcmVuY2UgPSBQb2x5Qm9vbC54b3Ioe1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uczogdW5pb25IaWVyYXJjaHlQb2x5Z29ucywgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICByZWdpb25zOiBpbnRlcnNlY3Rpb25IaWVyYXJjaHlQb2x5Z29ucyxcclxuICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICB0bXBEaWZmZXJlbmNlID0gdG1wRGlmZmVyZW5jZVsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICAvLyByZXN1bHRcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXMgPSBbdG1wRGlmZmVyZW5jZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERBVEEgSm9pblxyXG4gICAgbGV0IGhpZXJhcmNoaWVzID0gc3BhdGlhbFZpZXdcclxuICAgICAgICAuc2VsZWN0QWxsKCdnLmhpZXJhcmNoeS1ncm91cCcpXHJcbiAgICAgICAgLmRhdGEoaGllcmFyY2h5VmVydGljZXMpO1xyXG5cclxuICAgIC8vIEVOVEVSIHRoZSBncm91cHMgLSBhZGRzIGEgc3BlY2lmaWMgaWQgYW5kIGNvbG9yXHJcbiAgICBoaWVyYXJjaGllc1xyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaW50ZXJzZWN0aW9uJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGgnICsgaGllcmFyY2h5SWRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBVUERBVEUgLSB0aGUgY2xhc3MgbmVlZGVkIGZvciBpbnRlcnNlY3Rpb24gYW5kIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICBoaWVyYXJjaGllcy5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBpbnRlcnNlY3Rpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBoJyArIGhpZXJhcmNoeUlkc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJjaGllcy5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gSGllcmFjaHkgaHVsbHMgYWRkZWQgdG8gdGhlIHNwYXRpYWwgdmlldyAtIGdldCB0aGUgcG9pbnRzIGZvciBlYWNoIGFuaW1hbCBpbiB0aGVcclxuICAgIC8vIHNwYXRpYWwgdmlldyBzbyB0aGF0IGEgY29udmV4IGh1bGwgY2FuIGJlIGNhbGN1bGF0ZWRcclxuICAgIGxldCBoaWVyYXJ5SHVsbHMgPSBoaWVyYXJjaGllcy5zZWxlY3RBbGwoJ3BhdGguaGllcmFyY2h5LWh1bGwtcGF0aCcpXHJcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFTlRFUiBhbmQgY2FsY3VsYXRlIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAvLyAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiAnaHAnICsgZC5qb2luKCcnKS5yZXBsYWNlKC8sL2csICcnKTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWVyYXJjaHktaHVsbC1wYXRoJylcclxuICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGRyYXdMaW5lKGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCdMJykgKyAnWic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gVVBEQVRFIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBkcmF3TGluZShkKTtcclxuICAgICAgICAgICAgcmV0dXJuICdNJyArIGQuam9pbignTCcpICsgJ1onO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgLy8gcmV0dXJuICdocCcgKyBkLmpvaW4oJycpLnJlcGxhY2UoLywvZywgJycpO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJ5SHVsbHMuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVuaW9uIG11bHRpcGxlIHBvbHlnb25zIHRvZ2V0aGVyIC0gbmVlZGVkIG9yIGVsc2UgdGhlcmUgd2lsbCBiZSBob2xlcyBpbiB0aGUgaW50ZXJzZWN0aW9uc1xyXG4gKiBAcGFyYW0ge2FycmF5fSBwb2x5Z29ucyAtIGFycmF5IG9mIGFycmF5IG9mIHBvaW50c1xyXG4gKi9cclxuZnVuY3Rpb24gdW5pb25Qb2x5Z29ucyhwb2x5Z29ucykge1xyXG4gICAgLy8gY29uc29sZS5sb2cocG9seWdvbnMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2x5Z29ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBvbHlnb25zW2ldID0ge1xyXG4gICAgICAgICAgICByZWdpb25zOiBbcG9seWdvbnNbaV1dLFxyXG4gICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyB1bmlvbiBhIGxpc3Qgb2YgcG9seWdvbnMgdG9nZXRoZXJcclxuICAgIGxldCBzZWdtZW50cyA9IFBvbHlCb29sLnNlZ21lbnRzKHBvbHlnb25zWzBdKTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9seWdvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc2VnMiA9IFBvbHlCb29sLnNlZ21lbnRzKHBvbHlnb25zW2ldKTtcclxuICAgICAgICBsZXQgY29tYiA9IFBvbHlCb29sLmNvbWJpbmUoc2VnbWVudHMsIHNlZzIpO1xyXG4gICAgICAgIHNlZ21lbnRzID0gUG9seUJvb2wuc2VsZWN0VW5pb24oY29tYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUG9seUJvb2wucG9seWdvbihzZWdtZW50cylbJ3JlZ2lvbnMnXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVkZ2UgZHJhd2luZyBtZXRob2Qgb2YgdGhlIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtvYmplY3R9IGQgLSBUcmVlbWFwIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGRpYWdvbmFsTGluZXMoZCkge1xyXG4gICAgcmV0dXJuICdNJyArIGQueCArICcsJyArIGQueSArXHJcbiAgICAgICAgJ1YnICsgZC5wYXJlbnQueSArICdIJyArIGQucGFyZW50Lng7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjbGljayBmdW5jdGlvbiAtIGhpZ2hsaWdodCB0aGUgZWxlbWVudHMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZCAtIFRyZWVtYXAgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY2xpY2soZCkge1xyXG4gICAgc2V0QWN0aXZlQW5pbWFscyhkWydkYXRhJ11bJ25hbWUnXSk7XHJcbiAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIGRyYXcgb25lIHN0ZXBcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IGFsbCB0aGUgY2x1c3RlcmluZyBvZiBhIHNwZWNpZmljIGxldmVsIGluIHRoZSBkZW5kcm9ncmFtIHRyZWVcclxuICogRm9yIGluc3RhbmNlIGFsbCBjbHVzdGVycyBmcm9tIGxldmVsIDVcclxuICogQHBhcmFtIHtvYmplY3R9IHJvb3QgLSBSb290IG9mIHRoZSB0cmVlbWFwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVhcmNoeSAtIE51bWJlciBvZiBoaWVyYXJjaHkgZnJvbSBbMC0zXVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5KSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBsZXQgbGV2ZWwgPSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XTtcclxuXHJcbiAgICAvLyBzZWNvbmQgbGV2ZWwgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgdG1wX25vZGVzID0gcm9vdFsnY2hpbGRyZW4nXTtcclxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0aGUgdHJlZVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByb290WydoZWlnaHQnXTsgaSsrKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGF0IHRoZSBzZWFyY2hlZCBsZXZlbFxyXG4gICAgICAgIGlmICh0bXBfbm9kZXNbMF0gJiYgdG1wX25vZGVzWzBdWydkZXB0aCddID09PSBsZXZlbCkge1xyXG4gICAgICAgICAgICAvLyBhZGQgZWFjaCBjbHVzdGVyIHRvIHRoZSByZXN1bHQgc2V0XHJcbiAgICAgICAgICAgIHRtcF9ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnZGF0YSddWyduYW1lJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZVsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gb2YgYSBzcGVjaWZpYyBsZXZlbCBpbiB0aGUgdHJlZVxyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICB0bXBfbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnY2hpbGRyZW4nXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHRtcC5jb25jYXQobm9kZVsnY2hpbGRyZW4nXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0bXBfbm9kZXMgPSB0bXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzcGVjaWZpYyB2ZXJ0aWNlcyBvZiBhIGNsdXN0ZXJpbmcgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgcG9pbnRzIFtbeCx5XVt4LHldLi4uXVxyXG4gKiBAcGFyYW0ge0FycmF5fSBoaWVyYXJjaGllcyAtIEFycmF5IG9mIGFycmF5cyB3aXRoIGVhY2ggYXJyYXkgY29udGFpbnMgYWxsIHRoZSBpZHMgZm9yIGEgc3BlY2lmaWMgY2x1c3RlcmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5VmVydGljZXMoaGllcmFyY2hpZXMpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTsgLy8gcmVzdWx0IHNldFxyXG4gICAgaGllcmFyY2hpZXMuZm9yRWFjaChmdW5jdGlvbihjbHVzdGVyKSB7XHJcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gW107IC8vIHZlcnRpY2VzIG9mIHRoZSBjbHVzdGVycyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjbHVzdGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBncm91cE1lbWJlciA9IGFycmF5QW5pbWFscy5maW5kKGQgPT4gZFsnYSddID09PSBjbHVzdGVyW2pdKTtcclxuICAgICAgICAgICAgaWYgKGdyb3VwTWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFtncm91cE1lbWJlclsncCddWzBdLCAtZ3JvdXBNZW1iZXJbJ3AnXVsxXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFuZHJldyBtb250b25lIGNoYWluIGFsZ29yaXRobSByZXV0cm5zIGZvciBwb2ludHMgZmV3ZXIgdGhhbiAzIG51bGxcclxuICAgICAgICBpZiAodmVydGljZXMubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZDMucG9seWdvbkh1bGwodmVydGljZXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGFjdGl2ZSBsZXZlbCBmb3IgYSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHkgY2FuIGJlIGZyb20gWzAtM11cclxuICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIC0gTmV3IGFjdGl2ZSBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeUxldmVsKGhpZXJhcmNoeSwgbGV2ZWwpIHtcclxuICAgIC8vIFRPRE8gY2F0Y2ggY2FzZXMgPCAwIGFuZCBiaWdnZXIgdGhhbiBvdmVyYWxsIGhlaWdodFxyXG4gICAgaGllcmFyY2h5TGV2ZWxzWydoJyArIGhpZXJhcmNoeV0gPSBsZXZlbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZW50cnkgZm9yIHRoZSBoaWVyYXJjaCBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGllcmFyY2h5TGV2ZWwoaGllcmFyY2h5KSB7XHJcbiAgICAvLyBUT0RPIGNhdGNoIGNhc2VzIDwgMCBhbmQgYmlnZ2VyIHRoYW4gb3ZlcmFsbCBoZWlnaHRcclxuICAgIGRlbGV0ZSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYWN0aXZlIGNvbG9yIGZvciBhIHNwZWNpZmljIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeSBjYW4gYmUgZnJvbSBbMC0zXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeUNvbG9yKGhpZXJhcmNoeSkge1xyXG4gICAgLy8gY2hlY2sgaWYgdGhlIGhpZXJhcmNoeSBpcyBhbHJlYWR5IHNob3duIGFzIG5ldHdvcmtcclxuICAgIC8vIHRha2UgdGhlIHNhbWUgY29sb3JcclxuICAgIGZvciAobGV0IGtleSBpbiBuZXR3b3JrQ29sb3IpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAoJ2gnICsgaGllcmFyY2h5KSkge1xyXG4gICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IG5ldHdvcmtDb2xvcltrZXldO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaGllcmFyY2h5IGlzIG5vdCB2aXN1YWxpemVkIGFscmVhZHkgYXMgYSBuZXR3b3JrXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0bXBfYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGhpZXJhcmNoeUNvbG9ycykge1xyXG4gICAgICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnNba2V5XSA9PT0gY29sb3JzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX2Jvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG1wX2Jvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSBuZXR3b3JrIGlzIGRlcGljdGVkXHJcbiAgICAgICAgICAgIC8vIGlmIHNvIHNraXAgdGhlIGNvbG9yIHdoaWNoIGlzIGFscmVhZHkgY2hvb3NlbiBmb3IgdGhlIG5ldHdvcmtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ldHdvcmtDb2xvcikubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV0d29ya0NvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtDb2xvcltrZXldICE9PSBjb2xvcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IGNvbG9yc1tpXTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGNvbG9yIGZvciB0aGUgaGllcmFyY2ggbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUNvbG9yKGhpZXJhcmNoeSkge1xyXG4gICAgZGVsZXRlIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBoaWVyYXJjaHkgYnV0dG9uIHRvIHRoZSBkaXZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gSGllcmFyY2h5IG9mIHRoZSBpZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5ldyBhY3RpdmUgbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRIaWVyYXJjaHlCdXR0b24oaWQsIG5hbWUpIHtcclxuICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoIDwgbWF4TnVtYmVySGllcmFyY2hpZXMpIHtcclxuICAgICAgICAkKCcjZGVuZHJvZ3JhbS1idXR0b25zLWRpdicpLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaG93LWRlbmRyb2dyYW0tJyArIGlkICsgJ1wiIGRhdGE9JyArIGlkICsgJyBuYW1lPScgKyBuYW1lICtcclxuICAgICAgICAgICAgJyBjbGFzcz1cInNob3ctZGVuZHJvZ3JhbSBidG4gYnRuLWJsb2NrXCIgZGF0YS10b2dnbGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9XCJmYWxzZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPicgK1xyXG4gICAgICAgICAgICAnIDxzcGFuIGNsYXNzPVwiYnRuLWxhYmVsXCIgaWQ9XCJidG4tbGVmdFwiPiA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCI+PC9pPiZuYnNwJm5ic3AgU2hvdyAnICsgbmFtZSArICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJ0bi1sYWJlbCBoaWRkZW5cIiBpZD1cImJ0bi1yaWdodFwiPiA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiPjwvaT4mbmJzcCZuYnNwIEhpZGUgJyArIG5hbWUgKyAnIDwvc3Bhbj48L2J1dHRvbj4gPGJyPidcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgc3BlY2lmaWMgaGllcmFyY2h5IGJ1dHRvbiB0byB0aGUgZGl2XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEhpZXJhcmNoeSBvZiB0aGUgaWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlCdXR0b24oaWQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgZm9sbG93aW5nIGxpbmUgYnJlYWsgYW5kIGVsZW1lbnRcclxuICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5uZXh0KCkucmVtb3ZlKCk7XHJcbiAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkucmVtb3ZlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgc2xpZGVyIGFuZCB0ZXh0IGluIHRoZSBkZW5kcm9ncmFtIHBhbmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGdldCB0aGUgaW1wb3J0YW50IGluZm9cclxuICAgIGxldCBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICBsZXQgbmFtZSA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCduYW1lJyk7XHJcbiAgICAvLyBzZXQgdGhlIG5hbWUgb2YgdGhlIGRpc3BsYXllZCBoaWVyYXJjaHlcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLW5hbWUnKS50ZXh0KG5hbWUpO1xyXG5cclxuICAgIC8vIHNldCBzbGlkZXIgYW5kICB0ZXh0IHZhbHVlXHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKS52YWwoaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC10ZXh0JykudGV4dChoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgaGllcmFyY2h5IGxlZ2VuZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZCgpIHtcclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgLy8gU2hvdyBvciBoaWRlIHRoZSBzdmcgZWxlbWVudFxyXG4gICAgaWYgKE9iamVjdC5rZXlzKGhpZXJhcmNoeUNvbG9ycykubGVuZ3RoICE9PSAwIHx8IE9iamVjdC5rZXlzKG5ldHdvcmtDb2xvcikubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgJCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2Jykuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxlZ2VuZERhdGEgPSBbXTtcclxuICAgIGxldCBsZWdlbmRUZXh0RGF0YSA9IFtdO1xyXG4gICAgLy8gZ2V0IHRoZSByZXF1aXJlZCBkYXRhXHJcbiAgICAkKCcuc2hvdy1kZW5kcm9ncmFtJykuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBkYXRhIGlzIG5vdCB1bmRlZmluZWRcclxuICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzWydoJyArICQob2JqKS5hdHRyKCdkYXRhJyldICE9IG51bGwgJiYgJChvYmopLmF0dHIoJ25hbWUnKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxlZ2VuZERhdGEucHVzaChoaWVyYXJjaHlDb2xvcnNbJ2gnICsgJChvYmopLmF0dHIoJ2RhdGEnKV0pO1xyXG4gICAgICAgICAgICBsZWdlbmRUZXh0RGF0YS5wdXNoKCQob2JqKS5hdHRyKCduYW1lJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIHRoZSBuZXR3b3JrIGNvbG9yXHJcbiAgICBpZiAoT2JqZWN0LmtleXMobmV0d29ya0NvbG9yKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV0d29ya0NvbG9yKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWdlbmREYXRhLmluZGV4T2YobmV0d29ya0NvbG9yW2tleV0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kRGF0YS5wdXNoKG5ldHdvcmtDb2xvcltrZXldKTtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZFRleHREYXRhLnB1c2goJ05ldHdvcmsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERBVEEgSk9JTlxyXG4gICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZERhdGEpO1xyXG4gICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZFRleHREYXRhKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyAyLjUgKiBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC10ZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyAyLjUgKiBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgZGVuZHJvZ3JhbSBsZWdlbmRcclxuICovXHJcbmZ1bmN0aW9uIGluaXREZW5kcm9ncmFtTGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gNTUwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDYwO1xyXG5cclxuICAgIGxldCBkZW5kcm9ncmFtTGVnZW5kID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS1wYW5lbCcpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZGVuZHJvZ3JhbS1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG5cclxuICAgICQoJyNkZW5kcm9ncmFtLWxlZ2VuZCcpLmhpZGUoKTtcclxuXHJcbiAgICBsZXQgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hXaWR0aCA9IDUwO1xyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaEhlaWdodCA9IDIwO1xyXG5cclxuICAgIGxldCBsZWdlbmREYXRhID0gc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlLnJhbmdlKCk7XHJcbiAgICAvL1RPRE8gY2hhbmdlIHRoaXMgdG8gYmV0dGVyIHNvbHV0aW9uXHJcbiAgICBsZXQgbGVnZW5kVGV4dERhdGEgPSBbJ2xvdycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnaGlnaCddO1xyXG5cclxuICAgIGxlZ2VuZCA9IGRlbmRyb2dyYW1MZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kRGF0YSk7XHJcbiAgICBsZWdlbmRUZXh0ID0gZGVuZHJvZ3JhbUxlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZFRleHREYXRhKTtcclxuXHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRTd2F0Y2hXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIFRleHQgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc2V0IG9wZXJhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3BlcmF0aW9uIC0gZS5nLiBcInVuaW9uXCIgXCJpbnRlcnNlY3Rpb25cIiBcInN5bS1kaWZmZXJlbmNlXCJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTZXRPcGVyYXRpb24odmFsdWUpIHtcclxuICAgIHNldE9wZXJhdGlvbiA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBoaWVyYXJjaHkgZ3JvdXAgc3RhbmRhcmQgZGV2aWF0aW9uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSB1bmlxdWUgaGFzaCBpZCBmb3IgdGhlIGdyb3VwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHVuaXF1ZSBoYXNoIGlkIGZvciB0aGUgZ3JvdXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRoaWVyYXJjaHlHcm91cFN0ZGV2KGtleSwgdmFsdWUpIHtcclxuICAgIGlmIChrZXkgaW4gaGllcmFyY2h5R3JvdXBTdGRldikge1xyXG4gICAgICAgIGhpZXJhcmNoeUdyb3VwU3RkZXZba2V5XS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGllcmFyY2h5R3JvdXBTdGRldltrZXldID0gW3ZhbHVlXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc2V0IGhpZXJhcmNoeSBncm91cCBzdGFuZGFyZCBkZXZpYXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXYoKSB7XHJcbiAgICBoaWVyYXJjaHlHcm91cFN0ZGV2ID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWdobGlnaHQgYSBzdWJzZXQgb2YgYW5pbWFscyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFuaW1hbHMgLSBhcnJheSBvZiBhbmltYWwgaWRzIHdoaWNoIGhhdmUgdG8gYmUgaGlnaGxpZ2h0ZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRIaWdobGlnaHRTcGF0aWFsVmlldyhhbmltYWxzKSB7XHJcbiAgICAvLyBwb2ludHMgdG8gY2FsY3VsYXRlIHRoZSBjb252ZXggaHVsbCBvZiB0aGUgaGlnaGxpZ2h0IGNsdXN0ZXJcclxuICAgIGxldCB2ZXJ0aWNlcyA9IFtdO1xyXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSBvYmplY3RzIGluIHRoZSBjbHVzdGVyXHJcbiAgICAvLyBnZXQgdGhlIHBvaW50cyBhbmQgaGlnaGxpZ2h0IHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1hbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgdG1wQW5pbWFsID0gc3BhdGlhbFZpZXcuc2VsZWN0KCcjYW5pbWFsLScgKyBhbmltYWxzW2ldKTtcclxuICAgICAgICBsZXQgcG9pbnQgPSB0bXBBbmltYWwuZGF0YSgpWzBdWydwJ107XHJcbiAgICAgICAgdmVydGljZXMucHVzaChbcG9pbnRbMF0sIC1wb2ludFsxXV0pO1xyXG5cclxuICAgICAgICB0bXBBbmltYWwuY2xhc3NlZCgnYW5pbWFsLWhpZ2hsaWdodCcsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgLy8gYWRkIGEgcG9seWdvbiBodWxsIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgIHNwYXRpYWxWaWV3LmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZ2hsaWdodC1oaWVyYXJjaHknKVxyXG4gICAgICAgIC5hdHRyKCdkJywgKCdNJyArIGQzLnBvbHlnb25IdWxsKHZlcnRpY2VzKS5qb2luKCdMJykgKyAnWicpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgaGlnaGxpZ2h0IGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWdobGlnaHRTcGF0aWFsVmlldygpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgY29sb3JpbmcgYW5kIHRoZSBoaWVyYXJjaHkgaGlnaGxpZ2h0IGh1bGxcclxuICAgIGQzLnNlbGVjdEFsbCgnLmFuaW1hbCcpLmNsYXNzZWQoJ2FuaW1hbC1oaWdobGlnaHQnLCBmYWxzZSk7XHJcbiAgICBkMy5zZWxlY3RBbGwoJy5oaWdobGlnaHQtaGllcmFyY2h5JykucmVtb3ZlKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGllcmFyY2h5LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsIHBhcmFtZXRlcnMgKi9cclxuXHJcbmxldCBKU09OQVBJX01JTUVUWVBFID0gJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbic7XHJcbnZhciBzb3VyY2U7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkVG9EYXRhc2V0LFxyXG4gICAgc2V0RGF0YVNldFBlcmNlbnRpbGUsXHJcbiAgICBzZXRTd2FybURhdGEsXHJcbiAgICBzZXRNZXRhRGF0YSxcclxuICAgIHNldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgc2V0TmV0d29ya0RhdGEsXHJcbiAgICBzZXRIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGROZXR3b3JrQnV0dG9ucyxcclxuICAgIHNldE5ldHdvcmtJRFxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZW5hYmxlUGxheUJ1dHRvbixcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uLFxyXG4gICAgYWRkQWJzb2x1dGVGZWF0dXJlQnV0dG9uc1xyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3BhdGlhbFZpZXdJbml0XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICByZXNwb25zZVBhcmFtZXRlcnNcclxufSBmcm9tICcuL3Zpc3VhbF9wYXJhbWV0ZXIuanMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdHJlYW0gdGhlIG1vdmVtZW50IGRhdGEgZnJvbSB0aGUgQVBJXHJcbiAqIExvYWRzIG9ubHkgdGhlIGV4cGxpY2l0IG1vdmVtZW50IGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1Nb3ZlbWVudERhdGEoKSB7XHJcbiAgICBpZiAod2luZG93LkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvYXBpL21vdmVtZW50X29ubHkvJyArIHBhcmFtZXRlcnNbJ2lkJ10pO1xyXG4gICAgICAgIHNvdXJjZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRhdGEgPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGFqYXggcXVlcmllcyBhcmUgY29tcGVsdGUgaW5pdGlhbGl6ZVxyXG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrUGVuZGluZ1JlcXVlc3QoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmFjdGl2ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGF0aWFsVmlld0luaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZFRvRGF0YXNldChKU09OLnBhcnNlKGUuZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5yZWFkeVN0YXRlID09IEV2ZW50U291cmNlLkNMT1NFRCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1N0cmVhbWluZyBlcnJvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnV2ViYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0cmVhbWluZycpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwZXJjZW50aWxlIGRhdGEgZnJvbSB0aGUgYXBpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGVyY2VudGlsZSgpIHtcclxuICAgIGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL3BlcmNlbnRpbGUvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZGF0YVNldFBlcmNlbnRpbGUgaW50byBhbiBhcnJheVxyXG4gICAgICAgICAgICAvLyBbbWluLCBwZXJjZW50aWxlXzEsLi4uLHBlcmNlbnRpbGVfOSxtYXhdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbZGF0YVtpXVsnZmVhdHVyZSddXSA9IFtkYXRhW2ldWydtaW4nXSwgZGF0YVtpXVsncDEnXSwgZGF0YVtpXVsncDInXSwgZGF0YVtpXVsncDMnXSwgZGF0YVtpXVsncDUnXSwgZGF0YVtpXVsncDcnXSwgZGF0YVtpXVsncDgnXSwgZGF0YVtpXVsncDknXSwgZGF0YVtpXVsnbWF4J11dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldERhdGFTZXRQZXJjZW50aWxlKGRhdGFTZXRQZXJjZW50aWxlKTtcclxuICAgICAgICAgICAgYWRkQWJzb2x1dGVGZWF0dXJlQnV0dG9ucyhkYXRhU2V0UGVyY2VudGlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnQgZnJvbSB0aGUgYXBpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1GZWF0dXJlcygpIHtcclxuICAgIGNvbnN0IHN3YXJtX2ZlYXR1cmVzID0gWydzd2FybV90aW1lJywgJ3N3YXJtX3NwZWVkJywgJ3N3YXJtX2FjY2VsZXJhdGlvbicsICdzd2FybV9jb252ZXhfaHVsbF9hcmVhJyxcclxuICAgICAgICAnc3dhcm1fZGlzdGFuY2VfY2VudHJvaWQnLCAnc3dhcm1fZGlyZWN0aW9uJywgJ3N3YXJtX3BvbGFyaXNhdGlvbidcclxuICAgIF07XHJcblxyXG4gICAgLy8gZ2V0IGFsbCB0aGUgb3RoZXIgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgc3dhcm1fZmVhdHVyZXNbaV0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZSA9IHN3YXJtX2ZlYXR1cmVzW2ldLnJlcGxhY2UoJ3N3YXJtXycsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbWVhZGF0YSBpbmZvcm1hdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1ldGFEYXRhKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL21ldGFkYXRhLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHNldE1ldGFEYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGRhdGFzZXRzIGZvciB0aGUgYnV0dG9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtEYXRhQnV0dG9uKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29ya3MvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgYWRkTmV0d29ya0J1dHRvbnMoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNwZWNpZmMgZmVhdHVyZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmVhdHVyZSAtIGZvciBpbnN0YW5jZSBzcGVlZCwgYWNjZWxlcmF0aW9uIGV0Yy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIGZlYXR1cmUsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNwZWNpZmMgc3dhcm0gZmVhdHVyZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmVhdHVyZSAtIGZvciBpbnN0YW5jZSBjZW50cm9pZCwgbWVkb2lkIGV0Yy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybURhdGFzZXRGZWF0dXJlKGZlYXR1cmUpIHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIGZlYXR1cmUsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5ldHdvcmsgZm9yIHRoZSBzcGVjaWZpYyBuZXR3b3JrX2lkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXR3b3JrX2lkIC0gdW5pcXVlIG5ldHdvcmsgaWQgb2YgYSBkYXRhc2V0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtEYXRhKG5ldHdvcmtfaWQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmsvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBuZXR3b3JrX2lkLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2V0TmV0d29ya0RhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydkYXRhJ10pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBuZWVkZWQgZm9yIHN0YW5kYXJkIERldmlhdGlvbiBpbiBkZW5kcm9ncmFtXHJcbiAgICBzZXROZXR3b3JrSUQobmV0d29ya19pZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5ldHdvcmsgaGllcmFyY2h5IGZvciB0aGUgc3BlY2lmaWMgbmV0d29ya19pZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV0d29ya19pZCAtIHVuaXF1ZSBuZXR3b3JrIGlkIG9mIGEgZGF0YXNldC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrSGllcmFyY2h5RGF0YShuZXR3b3JrX2lkKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3JrL2hpZXJhcmNoeS8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIG5ldHdvcmtfaWQsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWVyYXJjaHlEYXRhKEpTT04ucGFyc2UoZGF0YVswXVsnaGllcmFyY2h5J10pLCBuZXR3b3JrX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFZpc3VhbCBwYXJhbWV0ZXIgc3VnZ2VzdGlvbiBhamF4IHF1ZXJ5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHRyYWNrZWREYXRhIC0gdHJhY2tlZCBkYXRhIHdpdGggLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1Z2dlc3RlZFBhcmFtZXRlcnModHJhY2tlZERhdGEpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L3Zpc3VhbF9wYXJhbWV0ZXIvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlUGFyYW1ldGVycyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHRyYWNrZWREYXRhXHJcbiAgICB9KTtcclxuXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBTZXQqL1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGlzYWJsZVBsYXlCdXR0b25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGJydXNoZW5kLFxyXG4gICAgc2xpZGVyXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZCxcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3IsXHJcbiAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSxcclxuICAgIGNvbG9yTWV0YWRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0TmV0d29ya0F1dG8sXHJcbiAgICBzZXROZXR3b3JMaW1pdCxcclxuICAgIHNldE5ldHdvcmtIaWVyYXJjaHksXHJcbiAgICBzZXRuZXR3b3JrQ29sb3IsXHJcbiAgICBzZXROZXR3b3JrSURcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXQsXHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBkYXRhc2V0TWV0YWRhdGEsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldEhpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGdldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0RhdGEsXHJcbiAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0hpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sb3JTY2FsZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlcic7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkSGllcmFyY2h5QnV0dG9uLFxyXG4gICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uLFxyXG4gICAgZHJhd0RlbmRyb2dyYW0sXHJcbiAgICBtYXhOdW1iZXJIaWVyYXJjaGllcyxcclxuICAgIHNldFNldE9wZXJhdGlvblxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRUcmFja2luZ0Jvb2xlYW4sXHJcbiAgICByZXNldFRyYWNrZWREYXRhLFxyXG4gICAgc2VuZFRyYWNrZWREYXRhXHJcbn0gZnJvbSAnLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcbmxldCBicnVzaDsgLy8gYnJ1c2hpbmcgdmFyaWFibGVcclxuZXhwb3J0IGxldCBwbGF5Qm9vbGVhbiA9IHRydWU7IC8vIHBhdXNlIGFuZCBwbGF5IGJvb2xlYW5cclxuXHJcbi8qKlxyXG4gKiBJbml0IGFsbCB0aGUgbGlzdGVuZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcclxuICAgIGNwX2xpc3RlbmVyKCk7XHJcbiAgICBzZl9saXN0ZW5lcnMoKTtcclxuICAgIGFmX2xpc3RlbmVycygpO1xyXG4gICAgbWRfbGlzdGVuZXJzKCk7XHJcbiAgICBuX2xpc3RlbmVycygpO1xyXG4gICAgaF9saXN0ZW5lcnMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgY29udHJvbCBwYW5lbCBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGNwX2xpc3RlbmVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSBvciBzdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgU1BWLnNldEluZGV4VGltZShzbGlkZXIuc2xpZGVyKCd2YWx1ZScpKTtcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZSB0aGUgYW5pbWF0aW9uIGFuZCBzaG93IG9ubHkgdGhlIG5leHQgZnJhbWVcclxuICAgICAqL1xyXG4gICAgJCgnI25leHQtZnJhbWUtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJ1c2hpbmcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAvL3N0b3AgdGhlIGFuaW1hdGlvblxyXG4gICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmICghJCgnI2JydXNoaW5nLWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2RlZmluZSB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgYnJ1c2ggPSBkMy5icnVzaCgpXHJcbiAgICAgICAgICAgICAgICAuZXh0ZW50KFtcclxuICAgICAgICAgICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1NQVi50YW5rV2lkdGgsIFNQVi50YW5rSGVpZ2h0XVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgIC5vbignZW5kJywgYnJ1c2hlbmQpO1xyXG4gICAgICAgICAgICAvL2FkZCB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjbWFpbi12aXMtc3ZnJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JydXNoJylcclxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgICQoJy5icnVzaCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5zZWxlY3QgYWxsIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlQW5pbWFscyhbXSk7XHJcbiAgICAgICAgICAgIC8vIHRyYWNraW5nIG9mIGRhdGEgZm9yIHZpc3VhbCBwYXJhbWV0ZXIgc3VnZ2VzdGlvblxyXG4gICAgICAgICAgICByZXNldFRyYWNrZWREYXRhKCk7XHJcbiAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcblxyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhY2sgdmlzdWFsIHBhcmFtZXRlciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzZXRUcmFja2luZ0Jvb2xlYW4oZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFRyYWNraW5nQm9vbGVhbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgdGhlIHRyYWNrZWQgdmlhIGEgYWpheCBxdWVyeSB0byB0aGUgc2VydmVyIHRvIGNhbGN1bGF0ZSB0aGUgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBzZXRUcmFja2luZ0Jvb2xlYW4oZmFsc2UpO1xyXG4gICAgICAgICAgICBzZW5kVHJhY2tlZERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRpc2FibGUgYm90aCBidXR0b25zIGFuZCByZW1vdmUgdGhlIGFjdGl2ZSBvbmVcclxuICAgICAgICAgICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGF0aWFsIHZpZXcgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICovXHJcbiAgICAkKCcjYmFja2dyb3VuZC1jb2xvcicpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtYmFja2dyb3VuZDpjaGVja2VkJykudmFsKCk7XHJcbiAgICAgICAgJCgnI21haW4tdmlzLXN2ZycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgc3BhdGlhbCB2aWV3IGF4aXMgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWF4aXMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBmcmFtZSAodGltZSkgbnVtYmVyIGluIHRoZSBzcGF0aWFsIHZpZXcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRpbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lLXRleHQnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIC5mcmFtZS10ZXh0JykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sb3IgU2NhbGUgRnVuY3Rpb24gUmFkaW8gYnV0dG9uc1xyXG4gICAgICovXHJcbiAgICAkKCcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybSBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvclNjYWxlWyd0eXBlJ10gPSAkKCdpbnB1dFtuYW1lPWNvbG9yLXNjYWxlLXJhZGlvXTpjaGVja2VkJywgJyNjb2xvci1zY2FsZS1yYWRpby1mb3JtJykudmFsKCk7XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IHN3YXJtIGZlYXR1cmVzIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gc2ZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBkaXJlY3Rpb24gYXJyb3cgb2YgdGhlIGFuaW1hbFxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXJlY3Rpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2RpcmVjdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCBkaXJlY3Rpb24gZGF0YVxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2RpcmVjdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmFycm93JylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbWVkb2lkIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1tZWRvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWVkb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghKCdtZWRvaWQnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ21lZG9pZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKHN3YXJtRGF0YVtTUFYuaW5kZXhUaW1lXVsnbWVkb2lkJ10pO1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBtZWRvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBkaXNwbGF5IHRoZSBtZWRvaWQgZmlzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIFNQVi5tZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdjZW50cm9pZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBoaWRlIHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2NpcmNsZS5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnY2lyY2xlLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNvbnZleCBodWxsIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jb252ZXgtaHVsbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jb252ZXgtaHVsbCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdodWxsJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdjb252ZXhfaHVsbCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdHJpYW5ndWxhdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10cmlhbmd1bGF0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndHJpYW5ndWxhdGlvbicgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgndHJpYW5ndWxhdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHZvcm9ub2lcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdm9yb25vaScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy12b3Jvbm9pJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ3Zvcm9ub2knIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ3Zvcm9ub2knKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgYWJzb2x1dGUgZmVhdHVyZSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGFmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgU3BlZWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXNwZWVkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXNwZWVkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnc3BlZWQnIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgc3BlZWRcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdzcGVlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkLWRldGFpbHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ3NwZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYWNjZWxlcmF0aW9uIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvbiBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2FjY2VsZXJhdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBhY2NlbGVyYXRpb25cclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlzdGFuY2UgdG8gY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnZGlzdGFuY2VfY2VudHJvaWQnIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgZGlzdGFuY2VfY2VudHJvaWRcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdkaXN0YW5jZV9jZW50cm9pZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkLWRldGFpbHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2Rpc3RhbmNlX2NlbnRyb2lkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQtZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbWlkbGluZSBvZmZzZXRcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgZHJhdy1taWRsaW5lX29mZnNldCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2RyYXctbWlkbGluZV9vZmZzZXQnIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgbWlkbGluZV9vZmZzZXRcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdtaWRsaW5lX29mZnNldCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0LWRldGFpbHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ21pZGxpbmVfb2Zmc2V0Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQtZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG5ldHdvcmsgbGlzdGVlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbl9saXN0ZW5lcnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYnV0dG9ucyBjbGlja2VkIC0gZ2V0IHRoZSBkYXRhXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3Jrcy1tb2RhbC1ib2R5IGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBuZXR3b3JrX2lkID0gJCh0aGlzKS5hdHRyKCdkYXRhJyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgbmFtZSBvZiB0aGUgY2hvb3NlbiBuZXR3b3JrIHRvIHRoZSBOZXR3b3JrIG1vZGFsXHJcbiAgICAgICAgJCgnI2FjdGl2ZS1uZXR3b3JrLW5hbWUnKS50ZXh0KCQodGhpcykuYXR0cignbmFtZScpKTtcclxuXHJcbiAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICBnZXROZXR3b3JrRGF0YShuZXR3b3JrX2lkKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBuZXR3b3JrXHJcbiAgICAgICAgc2V0bmV0d29ya0NvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICQoJyNuZXR3b3JrLWRpdicpLm1vZGFsKCd0b2dnbGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBidXR0b25zIGNsaWNrZWQgLSBnZXQgdGhlIGRhdGFcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstcmVtb3ZlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0TmV0d29ya0RhdGEoe30pO1xyXG4gICAgICAgIHNldE5ldHdvcmtJRCgtMSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBuZXR3b3JrIGNvbG9yXHJcbiAgICAgICAgc2V0bmV0d29ya0NvbG9yKC0xKTtcclxuICAgICAgICAkKCcjYWN0aXZlLW5ldHdvcmstbmFtZScpLnRleHQoJycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGF1dG8gYnV0dG9uIHNldCBhY2l2ZSBvciByZW1vdmVcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYXV0by1zdWdnZXN0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQtcCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstc2xpZGVyJykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgc2V0TmV0d29ya0F1dG8odHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQtcCcpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstc2xpZGVyJykuc2hvdygpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byhmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBsaW1pdCA9ICQoJyNuZXR3b3JrLXNsaWRlcicpLnNsaWRlcigndmFsdWUnKTtcclxuICAgICAgICAgICAgc2V0TmV0d29yTGltaXQobGltaXQpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdCcpLnZhbChsaW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBtZXRhZGF0YSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIG1kX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgc3dhdGNoIGZ1bmN0aW9ucyBjb2xvcmluZyBpbmRpdmlkdWFsIGFuaW1hbHNcclxuICAgICAqL1xyXG4gICAgJCgnLm1ldGFkYXRhLXN3YXRjaC5tZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCBjb2xvclJHQiA9ICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjb2xvciBvZiB0aGUgc3dhdGNoIHByZXZpZXdcclxuICAgICAgICAkKCcjbWV0YWRhdGEtcm93LScgKyBpZCArICcgI3ByZXZpZXcnKVxyXG4gICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3JSR0IpO1xyXG4gICAgICAgIC8vIGlmIHdoaXRlIHRoYW4gcmVzZXQgdGhlIGNvbG9yXHJcbiAgICAgICAgaWYgKGNvbG9yUkdCID09PSAncmdiKDI1NSwgMjU1LCAyNTUpJykge1xyXG4gICAgICAgICAgICBpZiAobWV0YWRhdGFDb2xvcltpZF0pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZXRhZGF0YUNvbG9yW2lkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbaWRdID0gY29sb3JSR0I7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBncm91cCBtZXRhZGF0YSBmdW5jdGlvbnMgZm9yIGluc3RhbmNlIGNvbG9yIHNleFxyXG4gICAgICovXHJcbiAgICAkKCcjZ3JvdXAtbWV0YWRhdGEgOmlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHJlc2V0IHRoZSBtZXRhZGF0IGFjb2xvcmluZ1xyXG4gICAgICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgdG1wID0gW107XHJcblxyXG4gICAgICAgIC8vIG1ldGFkYXRhIHNleCBpcyBjaG9vc2VuIC0gY29sb3JpbmcgYmFzZWQgb24gbSBhbmQgZlxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NleCcpIHtcclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWRpdicpLm1vZGFsKCd0b2dnbGUnKTtcclxuICAgICAgICAgICAgLy8gY2xvc2UgYW5kIGNvbG9yIGhlcmVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2V0IG9mIGluZGl2aWR1YWwgc3RyaW5ncyBpbiBzZXhcclxuICAgICAgICAgICAgdG1wID0gQXJyYXkuZnJvbShuZXcgU2V0KHRtcCkpO1xyXG4gICAgICAgICAgICBsZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyMzODZjYjAnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdLnRvTG93ZXJDYXNlKCkgPT09IHRtcFtqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGNvbG9yaW5nIHRvIHRoZSBtZXRhZGF0YWNvbG9yIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAvLyBzZXQgdmFsdWVzIG9mIGlucHV0c1xyXG4gICAgICAgICAgICAvLyBoZXJlIGFyZSBhdXRvbWF0aWNhbGx5IGlucHV0IHZhbHVlcyBjYWxjdWxhdGVkXHJcbiAgICAgICAgICAgIC8vIC4yNSBhbmQgLjc1IHBlcmNlbnRpbGVzIGFyZSB1c2VkXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYmxBdmcgPSBkMy5xdWFudGlsZSh0bXAsIDAuMjUpOyAvLyBiZWxvdyBhdmVyYWdlIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBhYkF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC43NSk7IC8vIGFib3ZlIGF2ZXJhZ2VcclxuICAgICAgICAgICAgJCgnI2JsLWF2ZycpLnZhbChibEF2Zyk7XHJcbiAgICAgICAgICAgICQoJyNhYi1hdmcnKS52YWwoYWJBdmcpO1xyXG4gICAgICAgICAgICAvLyBjb2xvciB0aGUgYW5pbWFsc1xyXG4gICAgICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBncm91cCBtZXRhZGF0YSBpbnB1dCBzcGlubmVyXHJcbiAgICAgKiArLy0gMC4xIHRvIHRoZSBpbnB1dCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIG9sZFZhbHVlID0gYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKCkudHJpbSgpLFxyXG4gICAgICAgICAgICBuZXdWYWwgPSAwO1xyXG5cclxuICAgICAgICBpZiAoYnRuLmF0dHIoJ2RhdGEtZGlyJykgPT0gJ3VwJykge1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSArIDAuMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSAtIDAuMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZChuZXdWYWwgKiAxMDApIC8gMTAwOyAtXHJcbiAgICAgICAgYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBjb2xvcmluZ1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgaW5wdXQgZmllbGRzIGNoYW5nZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgaW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBhbGwgbWV0YWRhdGEgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICAkKCcjbWV0YWRhdGEtcmVzZXQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBoaWVyYXJjaHkvZGVuZGdyb2dyYW0gbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBoX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBkZW5kZ3JvZ3JhbSBzbGlkaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0U2hvd0RlbmRyb2dyYW1MaXN0ZW5lcihpZCkge1xyXG5cclxuICAgICAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGlja2VkQnV0dG9uSUQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgYnV0dG9ucyBhbmQgY3VzdG9tIGhpZ2hsaWdodCBqdXN0IG9uZSBvciBub25lXHJcbiAgICAgICAgICAgICQoJy5zaG93LWRlbmRyb2dyYW0nKS5lYWNoKGZ1bmN0aW9uKGksIGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gYWN0aXZlIGZvdW5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoYnV0dG9uKS5hdHRyKCdpZCcpID09PSBjbGlja2VkQnV0dG9uSUQgJiYgJChidXR0b24pLmhhc0NsYXNzKCdidG4tcHJpbWFyeScpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1sZWZ0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gYWRkIGhlcmUgYSByZXNpemUgb2YgdGhlIG1haW4gdmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5pbnNlcnRBZnRlcigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0gLy8gcmVtb3ZlIGhpZ2hsaWdodFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLWxlZnQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tcmlnaHQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvdyBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZXJhcmNoeSBidXR0b24gaW4gbmV0d29yayBtb2RhbCBvbiBjaGFuZ2VcclxuICAgICAqIExvYWQgZGF0YSBvciByZW1vdmUgaXRcclxuICAgICAqL1xyXG4gICAgJCgnLmhpZWFyY2h5LWNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjaGVja2JveCA9ICQodGhpcykuZmluZCgnaW5wdXQ6aGlkZGVuJyk7XHJcblxyXG4gICAgICAgIGxldCBpZCA9IGNoZWNrYm94LmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBsZXQgbmFtZSA9IGNoZWNrYm94LmF0dHIoJ25hbWUnKTtcclxuICAgICAgICBsZXQgY2hlY2tlZCA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChjaGVja2VkICYmICQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPCBtYXhOdW1iZXJIaWVyYXJjaGllcykge1xyXG4gICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICBnZXROZXR3b3JrSGllcmFyY2h5RGF0YShpZCk7XHJcblxyXG4gICAgICAgICAgICBhZGRIaWVyYXJjaHlCdXR0b24oaWQsIG5hbWUpO1xyXG4gICAgICAgICAgICBpbml0U2hvd0RlbmRyb2dyYW1MaXN0ZW5lcihpZCk7XHJcbiAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlbHNlIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoID09PSBtYXhOdW1iZXJIaWVyYXJjaGllcykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYXggbnVtYmVyIG9mIGhpZXJhcmNoaWVzIGlzOiAnICsgbWF4TnVtYmVySGllcmFyY2hpZXMpO1xyXG4gICAgICAgIC8vVE9ETyBpbXBsZW1lbnQgdGhpcyBoZXJlXHJcbiAgICAgICAgLy8gbm90aWNlIHVzZXIgdGhhdCBpdCBpcyBub3QgcG9zc2libGUgdG8gc2hvdyBtb3JlIHRoYW4gbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIC8vICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgLy8gICA8c3Ryb25nPkluZm8hPC9zdHJvbmc+IEF0dGVudGlvbiB1c2VyIC5cclxuICAgICAgICAvLyA8L2Rpdj5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRtcCB2YXJpYWJsZSB0byBzYXZlIGlmIHRoZSBidXR0b24gd2hpY2ggaXMgZ29pbmcgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICAvLyB3YXMgYWN0aXZlXHJcbiAgICAgICAgICAgIGxldCB0bXBBY3RpdmUgPSAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkuaGFzQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoe30sIGlkKTtcclxuXHJcbiAgICAgICAgICAgIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbihpZCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gZmluZCBiZXR0ZXIgd2F5IGhlcmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdnLmgnICsgaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRlbmRyb2dyYW0gYW5kIHRoZSBwYW5lbCBpZiB0aGUgcmVtb3ZlZCBlbGVtZW50IHdhcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICh0bXBBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1idXR0b25zLWRpdicpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzaXplIHRoZSBtYWluIHN2Z1xyXG4gICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMtZGl2JykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC04Jyk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWxpemUgdGhlIG5ldHdvcmsgb25seSBpbiB0aGUgY2hvb3NlbiBoaWVyYXJjaHlcclxuICAgICAqL1xyXG4gICAgJCgnLm5ldHdvcmstaGllcmFyY2h5LWNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgaW5mbyBmb3IgdGhlIGNsaWNrZWQgYnV0dG9uXHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKTtcclxuICAgICAgICBsZXQgaWQgPSBjaGVja2JveC5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWQgPSBjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgIC8vIHJlc2V0IGFsbCB0aGUgb3RoZXIgYWN0aXZlIGNoZWNrYm94ZXNcclxuICAgICAgICAkKCcubmV0d29yay1oaWVyYXJjaHktY2hlY2tib3gnKS5lYWNoKGZ1bmN0aW9uKGksIGJ1dHRvbikge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKS5wcm9wKCdjaGVja2VkJykgJiYgJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKS5wcm9wKCdkYXRhJykgIT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAkKGJ1dHRvbikudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjaGVja2VkKSB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV0d29yayBpZFxyXG4gICAgICAgICAgICBzZXROZXR3b3JrSGllcmFyY2h5KGlkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrSGllcmFyY2h5KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWVyYXJjaHkgc2V0IHRoZW9yeSBidXR0b25zIC0gdW5pb24sIGludGVyc2VjdGlvbiwgc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgICAqL1xyXG4gICAgJCgnLnNldC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZmluZCgnaW5wdXQnKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgc2V0U2V0T3BlcmF0aW9uKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vID0gO1xyXG5cclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgcGxheSBib29sZWFuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWUgLSBwYXVzZSAoZmFsc2UpIG9yIHBsYXkgKHRydWUpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0UGxheUJvb2xlYW4odmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHBsYXlCb29sZWFuID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGlzdGVuZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFjdGl2ZVNjYWxlXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHJldHVybkNvbG9yU2NhbGVcclxufSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG5sZXQgc3ZnTGVnZW5kOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgbGVnZW5kXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBncm91cCB0byB0aGUgc3ZnIHdoZXJlIHRoZSBsZWdlbmQgZm9yIHRoZSBjb2xvciBsZWdlbmQgaXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRTcGF0aWFsVmlld0dyb3VwKCkge1xyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gNTUwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDYwO1xyXG5cclxuICAgIHN2Z0xlZ2VuZCA9IGQzLnNlbGVjdCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLWxlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIGNvbG9yIGxlZ2VuZFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUxlZ2VuZCgpIHtcclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcbiAgICAvLyBsZXQgZGlmZmVyZW50Q29sb3JzID0gMDtcclxuXHJcbiAgICAvLyBTaG93IHRoZSBzdmcgZmlyc3Qgb2YgYWxsXHJcbiAgICAkKCcjbWFpbi12aXMtbGVnZW5kLWRpdicpLnNob3coKTtcclxuXHJcbiAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBhbmltYWxzXHJcbiAgICBpZiAoYWN0aXZlU2NhbGUgIT09ICdibGFjaycpIHtcclxuICAgICAgICB2YXIgdG1wU2NhbGUgPSByZXR1cm5Db2xvclNjYWxlKCk7XHJcbiAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUucmFuZ2UoKSk7XHJcblxyXG4gICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUuZG9tYWluKCkpO1xyXG4gICAgICAgIC8vIGRpZmZlcmVudENvbG9ycyA9IHRtcFNjYWxlLnJhbmdlKClcclxuICAgICAgICAvLyAubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAvLyBoaWRlIHRoZSBkaXYgYWdhaW5cclxuICAgICAgICAkKCcjbWFpbi12aXMtbGVnZW5kLWRpdicpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDUgaGFzIHRvIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCArIDUpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgY29sb3JicmV3ZXIqL1xyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhU2V0UGVyY2VudGlsZVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuZXhwb3J0IGxldCBjb2xvclNjYWxlID0ge1xyXG4gICAgdHlwZTogJ0xpbmVhcicsXHJcbiAgICBjb2xvcjogY29sb3JicmV3ZXIuQnVZbEJ1XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY29sb3Igc2NhbGVcclxuICogQHJldHVybiB7Y29sb3JTY2FsZX0gYWN0aXZlIGNvbG9yIHNjYWxlIGlzIGluIGxpbmVhciBvciB0aHJlc2hvbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5Db2xvclNjYWxlKCkge1xyXG4gICAgLy9pZiBsaW5lYXIgaXMgY2hvb3NlblxyXG4gICAgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ0xpbmVhcicpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH0gLy9UaHJlc2hvbGQgY29sb3Igc2NhbGVcclxuICAgIGVsc2UgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGNvbG9yIHBpY2tlclxyXG4gKiB3aXRoIGFsbCBsaXN0ZW5lcnMgaW5jbHVkZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sb3JQaWNrZXIoKSB7XHJcbiAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnBhbGV0dGUnKVxyXG4gICAgICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JicmV3ZXIpKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhbGV0dGUnKVxyXG4gICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQua2V5O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gaGlnaHRsaWdodCB0aGUgcmlnaHQgcGFsZXR0ZVxyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIicgKyBkLmtleSArICdcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgY29sb3JTY2FsZS5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VsZWN0QWxsKCcuc3dhdGNoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3dhdGNoJylcclxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgY29sb3Igc2NoZW1lXHJcbiAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIkJ1WWxCdVwiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsICovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuXHJcbi8qKlxyXG4gKiBJbml0IE1ldGFkYXRhIGJ1dHRvbnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIGxldCBjb2xvcnMgPSBbJyNmZmYnLCAnI2U0MWExYycsICcjMzc3ZWI4JywgJyM0ZGFmNGEnLCAnIzk4NGVhMycsICcjZmY3ZjAwJywgJyNmZmZmMzMnLCAnI2E2NTYyOCddO1xyXG4gICAgLy8gYWRkIHRoZSBkYXRhIHRvIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaWYgKGRhdGFzZXRNZXRhZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dHIgaWQ9XCJtZXRhZGF0YS1yb3ctJyArIGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10gKyAnXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdCBidG4tY29sb3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2aWV3XCIgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3ItZmllbGRcIiB2YWx1ZT1cIldoaXRlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgKz0gJzxkaXYgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2ggbWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY29sb3JzW2ldICsgJ1wiIHZhbHVlPVwiJyArIGlkICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbWV0YWRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNpemUgYW5kIHdlaWdodCBjb2xvcmluZyBmb3IgdGhlIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNZXRhZGF0YSgpIHtcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAvLyBnZXQgdGhlIGlucHV0IHZhbHVlc1xyXG4gICAgbGV0IHZhbHVlID0gJCgnI2dyb3VwLW1ldGFkYXRhIC5idG4uYnRuLWRlZmF1bHQuYWN0aXZlIGlucHV0JylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGxldCBibEF2ZyA9ICQoJyNibC1hdmcnKS52YWwoKTtcclxuICAgIGxldCBhYkF2ZyA9ICQoJyNhYi1hdmcnKS52YWwoKTtcclxuICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjZmRjMDg2JywgJyMzODZjYjAnXTtcclxuICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdIDwgYmxBdmcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPiBhYkF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGFkYXRhIHJlc2V0IGFsbCBpbmRpdmlkdWFsIG1ldGFkYXRhIGlucHV0IGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCkge1xyXG4gICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgJCgnLmRyb3Bkb3duICNwcmV2aWV3JylcclxuICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9tZXRhZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBwYXJhbWV0ZXJzICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgZ2V0U3VnZ2VzdGVkUGFyYW1ldGVyc1xyXG59IGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgdHJhY2tpbmdCb29sZWFuID0gZmFsc2U7IC8vIGJvb2xlYW4gZm9yIGFjdGl2ZSB0cmFja2luZ1xyXG5sZXQgdHJhY2tlZERhdGEgPSBbXTtcclxuXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBib29sZWFuIHZhbHVlIGlmIHRyYWNraW5nIHNob3VsZCBiZSBhY3RpdmF0ZWRcclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIEJvb2xlYW4gZm9yIGFjdGl2ZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRyYWNraW5nQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgdHJhY2tpbmdCb29sZWFuID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNldHMgdGhlIHRyYWNrZWQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VHJhY2tlZERhdGEoKSB7XHJcbiAgICB0cmFja2VkRGF0YSA9IFtdO1xyXG4gICAgdHJhY2tpbmdCb29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyBkaXNhYmxlIHRoZSBzZW5kIGJ1dHRvblxyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBkYXRhIHRvIHRyYWNrZWREYXRhXHJcbiAqIEBwYXJhbSB7TnVtZXJpY30gdGltZSAtIHRpbWUgb2YgdGhlIGZyYW1lXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBBcnJheSBvZiBhbmltYWxzIGlkcyBmb3IgdGhlIHNwZWNpZmljIGZyYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVHJhY2tlZERhdGEodGltZSwgaWRzKSB7XHJcbiAgICB0cmFja2VkRGF0YS5wdXNoKHtcclxuICAgICAgICBbdGltZV06IEpTT04uc3RyaW5naWZ5KGlkcylcclxuICAgIH0pO1xyXG4gICAgLy8gZW5hYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b25cclxuICAgIGlmICgkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5pcygnOmRpc2FibGVkJykgJiYgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuYXR0cignZGF0YScpID09IDApIHtcclxuICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTZW5kIGRhdGEgd2l0aCBhIGFqYXggcXVlcnkgdG8gdGhlIHNlcnZlciBhbmQgd2FpdCBmb3IgdGhlIGFuc3dlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRUcmFja2VkRGF0YSgpIHtcclxuICAgIGRpc2FibGVDYWxjdWxhdGlvbkJ1dHRvbigpO1xyXG4gICAgZ2V0U3VnZ2VzdGVkUGFyYW1ldGVycyhKU09OLnN0cmluZ2lmeSh0cmFja2VkRGF0YSkpO1xyXG4gICAgcmVzZXRUcmFja2VkRGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVzcG9uc2Ugb2YgdGhlIGFqYXggcXVlcnkgLSBvcGVuIG5ldyB0YWIgd2l0aCB2YWx1ZXMgdG8gY3JlYXRlIG5ldHdvcmtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZVBhcmFtZXRlcnMoZGF0YSkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgLy8gb3BlbiBuZXR3b3JrIGNyZWF0ZSB1cmxcclxuICAgIGxldCB1cmwgPSAnLi4vLi4vbmV0d29yay9uZXc/ZGF0YXNldF9pZD0nICsgcGFyYW1ldGVyc1snaWQnXSArICcmJyArICQucGFyYW0oZGF0YVsnZGF0YSddWydtYXhfcGFyYW1zJ10pO1xyXG4gICAgLy8gY3JlYXRlIG5ldyB0YWIgd2l0aCB0aGUgcmVzdWx0IHBhcmFtZXRlclxyXG4gICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICBlbmFibGVDYWxjdWxhdGlvbkJ1dHRvbigpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIGNhbGN1bGF0aW9uIGJ1dHRvbiAtPiBsb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUNhbGN1bGF0aW9uQnV0dG9uKCkge1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuYXR0cignZGF0YScsIDEpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uIHJlbW92ZSBsb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlQ2FsY3VsYXRpb25CdXR0b24oKSB7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdGFza3NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Q2FsY3VsYXRlJyk7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJywgMCk7XHJcblxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3Zpc3VhbF9wYXJhbWV0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBwYXJhbWV0ZXJzKi9cclxuaW1wb3J0IHtcclxuICAgIHNldEluZGV4VGltZSxcclxuICAgIGFuaW1hbF9pZHNcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHN3YXJtRGF0YSxcclxuICAgIGRhdGFzZXRcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHBlcmNlbnRpbGVzTGluZUNoYXJ0XHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbmRleFRpbWUsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcblxyXG5leHBvcnQgbGV0IHpvb21GdW5jdGlvbjtcclxuXHJcbmxldCB0cmVuZENoYXJ0c1pvb20gPSB7fTtcclxubGV0IHRyZW5kQ2hhcnRzRWxlbSA9IFsnbG93ZXItb3V0ZXItYXJlYScsICdsb3dlci1pbm5lci1hcmVhJywgJ21lZGlhbi1saW5lJywgJ3VwcGVyLWlubmVyLWFyZWEnLCAndXBwZXItb3V0ZXItYXJlYSddO1xyXG5sZXQgbGluZUNoYXJ0V2lkdGggPSA1MDAwO1xyXG5sZXQgcmF0aW8gPSAxO1xyXG5sZXQgem9vbUdyb3VwO1xyXG5sZXQgeDtcclxubGV0IHk7XHJcblxyXG4vKipcclxuICogaW5pdCB0aGUgbGluZSBjaGFydCBhbmQgYWxzbyB0aGUgdHJlbmQgY2hhcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lQ2hhcnQoKSB7XHJcblxyXG4gICAgcmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAvLyBTd2FybSBmZWF0dXJlcyBsaW5lIGNoYXJ0XHJcbiAgICBsZXQgbGluZUNoYXJ0SGVpZ2h0ID0gNTAwOyAvLyB0aGUgbGluZSBjaGFydCBoZWlnaHRcclxuICAgIGxldCBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiAxMCxcclxuICAgICAgICByaWdodDogMCxcclxuICAgICAgICBib3R0b206IDEwMCxcclxuICAgICAgICBsZWZ0OiAxMFxyXG4gICAgfTtcclxuICAgIGxldCBtYXJnaW5Ub0xlZ2VuZCA9IDUwO1xyXG5cclxuICAgIGxldCBzd2FybV9mZWF0dXJlcyA9IE9iamVjdC5rZXlzKHN3YXJtRGF0YVswXSk7XHJcbiAgICAvLyByZW1vdmUgdGhlIHRpbWUga2V5XHJcbiAgICBsZXQgaW5kZXggPSBzd2FybV9mZWF0dXJlcy5pbmRleE9mKCd0aW1lJyk7XHJcbiAgICBzd2FybV9mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcuZmVhdHVyZS1jaGVjay1ib3gnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJmZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGxpbmUtY2hhcnQtY2hlY2stYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArIGBcIiBjbGFzcz1cImxpbmVDaGFydEJ1dHRvblwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArIGA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgLy8gYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSBzd2FybSBkYXRhIHRvIGxpbmVDaGFydFdpZHRoIHBvaW50cyBpbiB0aGUgbGluZSBjaGFydFxyXG4gICAgaWYgKHN3YXJtRGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIC8vIHRtcCBhcnJheSBmb3IgdGhlIGFnZ3JlZ2F0ZWQgYW5kIGF2ZXJhZ2VkIGZlYXR1cmVzXHJcbiAgICAgICAgbGV0IHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZSB0aGUgZmVhdHVyZXMgaW4gdGhlIHRlbXAgYXJyYXlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdG1wW2pdICs9IHN3YXJtRGF0YVtpXVtzd2FybV9mZWF0dXJlc1tqXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHJhdGlvIGlzIHplcm8gdGhlbiBhdmVyYWdlIGl0IGFuZCBzZXQgaXQgdG8gemVyb1xyXG4gICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX29iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGltZSc6IGkgLyByYXRpb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gdG1wW2pdIC8gcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX29iamVjdFtzd2FybV9mZWF0dXJlc1tqXV0gPSB0bXBbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZUNoYXJ0RGF0YS5wdXNoKHRtcF9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gbmV3IEFycmF5KHN3YXJtX2ZlYXR1cmVzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGluZUNoYXJ0RGF0YSA9IHN3YXJtRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB6b29tRnVuY3Rpb24gPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuXHJcblxyXG4gICAgLy8geCBheGlzIHNjYWxlIC0gbWludXMgbWFyZ2luTGluZUNoYXJ0ICBuZWVkZWRcclxuICAgIHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxyXG4gICAgICAgIC5yYW5nZShbbGluZUNoYXJ0SGVpZ2h0LCAwXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KVxyXG4gICAgICAgIC50aWNrcygwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IGRyYWdnZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkcmFnZ2VkIGZ1bmN0aW9uIGdldCB0aGUgY29vcmRpbmF0ZXMgYW5kIGNhbGN1bGF0ZSB0aGUgdGltZSBtb21lbnQgZnJvbSB0aGlzXHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMpO1xyXG4gICAgICAgIGlmIChjb29yZHNbMF0gPCBtYXJnaW4ubGVmdCB8fCBjb29yZHNbMF0gPiBsaW5lQ2hhcnRXaWR0aCB8fCBjb29yZHNbMV0gPCAwIHx8IGNvb3Jkc1sxXSA+IGxpbmVDaGFydEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRtcCBzY2FsZSB0byBpbmNsdWRlIHRoZSB6b29tIGZhY3RvclxyXG4gICAgICAgIGxldCB0bXBTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbih6b29tRnVuY3Rpb24ucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKHpvb21GdW5jdGlvbi5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgdGltZVxyXG4gICAgICAgIHNldEluZGV4VGltZShNYXRoLmZsb29yKCh0bXBTY2FsZShjb29yZHNbMF0gLSBtYXJnaW4ubGVmdCkpICogcmF0aW8pKTtcclxuICAgIH07XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICB6b29tRnVuY3Rpb24gPSB4LmRvbWFpbih0LnJlc2NhbGVYKHgyKS5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIC8vIHpvb20gZWFjaCBhdmFpYWJsZSBsaW5lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBsaW5lcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXAuc2VsZWN0KCgnIycgKyBrZXkgKyAnTGluZScpKS5hdHRyKCdkJywgbGluZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gem9vbSB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0cmVuZENoYXJ0c1pvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0c1pvb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgoJyMnICsga2V5ICsgJ1RyZW5kQ2hhcnQgLicgKyB0cmVuZENoYXJ0c0VsZW1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0cmVuZENoYXJ0c1pvb21ba2V5XVt0cmVuZENoYXJ0c0VsZW1baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3ZnIHJlc2l6YWJsZVxyXG4gICAgbGV0IHN3YXJtTGluZUNoYXJ0ID0gZDMuc2VsZWN0KCcjc3dhcm0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzLWxpbmUtY2hhcnQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGxpbmVDaGFydEhlaWdodCArICcpJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgLy8gYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSB5IGF4aXNcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMtbGluZS1jaGFydCcpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuXHJcbiAgICAvLyB0aGUgdGltZSBsaW5lIGFwcGVuZCB0aGUgbGluZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbWUtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAuYXR0cigneDEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gyJywgMClcclxuICAgICAgICAuYXR0cigneTInLCBsaW5lQ2hhcnRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGNvbG9ycyBmb3IgdGhlIGxpbmVzXHJcbiAgICBsZXQgbGluZV9jb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XHJcbiAgICBsZXQgbGluZXMgPSB7fTtcclxuICAgIC8vIGFkZCB0aGUgbGluZXMgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWluID0gZDMubWluKGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgobGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZFsndGltZSddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbc3dhcm1fZmVhdHVyZXNbaV1dKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmVzW3N3YXJtX2ZlYXR1cmVzW2ldXSA9IGxpbmU7XHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIGxpbmUgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgICAgICB6b29tR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmRhdGEoW2xpbmVDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBsaW5lQ2hhcnRMaW5lJylcclxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBsaW5lX2NvbG9ycyhpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgICAgICAuYXR0cignbmFtZScsIHN3YXJtX2ZlYXR1cmVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd6b29tJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsaW5lQ2hhcnRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGluZUNoYXJ0SGVpZ2h0KVxyXG4gICAgICAgIC5jYWxsKHpvb20pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGRyYWdnZWQpXHJcbiAgICAgICAgLmNhbGwoZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5vbignZHJhZycsIGRyYWdnZWQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIGxlZ2VuZCBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvL3NlbGVjdCBhbGwgdGhlIGxpbmVzXHJcbiAgICBsZXQgY2hhcnRMaW5lcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmUnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoY2hhcnRMaW5lcy5fZ3JvdXBzWzBdKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQuc3R5bGUuc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgKyAnOiAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgdmFsdWUgb2YgdGhlIGxpbmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGV4cHJlc3Npb24gZ2V0cyB0aGUgdGV4dCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyMnICsgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJykubm9kZSgpLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICtcclxuICAgICAgICAgICAgICAgICAgICAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJzAuMCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgbGVnZW5kIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd0cmVuZENoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKFsnNSUgLSA5NSUnLCAnMjUlIC0gNzUlJywgJ01lZGlhbiddKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzc0YTljZic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzA0NWE4ZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNTI1MjUyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkKTtcclxuICAgICAgICB9KTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBsaW5lIGNoYXJ0IGJ1dHRvbiBsaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCgnI2RyYXdTd2FybScgKyBzd2FybV9mZWF0dXJlc1tpXSkpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgoJyMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKSB7XHJcbiAgICAkKCcuZHJhdy1kZXRhaWxzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgICAgIGFkZFRyZW5kQ2hhcnQodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlVHJlbmRDaGFydCgpO1xyXG4gICAgICAgICAgICBlbmFibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJy5saW5lLWNoYXJ0LWNoZWNrLWJveCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVUcmVuZENoYXJ0KCkge1xyXG4gICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgdHJlbmQgY2hhcnQgc2hvd2luZyBtZWRpYW4gYW5kIHBlcmNlbnRpbGVzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gd2hpY2ggZmVhdHVyZVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAvLyBjaGVjayB3aGljaCBmZWF0dXJlIHRvIGRpc3BsYXkgaW4gdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICBsZXQgZmVhdHVyZSA9ICcnO1xyXG4gICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnc3BlZWQnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FjY2VsZXJhdGlvbicpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rpc3RhbmNlX2NlbnRyb2lkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2Rpc3RhbmNlX2NlbnRyb2lkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtaWRsaW5lX29mZnNldCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdtaWRsaW5lX29mZnNldCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNldGlsZXMgZm9yIGV2ZXJ5IHRpbWUgc3RlcFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXNMaW5lQ2hhcnQodG1wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSB0cmVuZENoYXJ0RGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICBsZXQgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdncmVnYXRlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0cmVuZENoYXJ0RGF0YVtpXVtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRpdmlkZVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgdG8gdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wVHJlbmRDaGFydERhdGEucHVzaCh0bXApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0RGF0YSA9IHRtcFRyZW5kQ2hhcnREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgbWluIGFuZCBtYXggZm9yIHRoZSBub3JtYWxpemF0aW9uXHJcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbih0cmVuZENoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFswXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWF4ID0gZDMubWF4KHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydCA9IHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoZmVhdHVyZSArICdUcmVuZENoYXJ0JykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0cmVuZENoYXJ0RGF0YScpO1xyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGUgYWdhaW4gdG8gdGhlIGVuZCBvZiB0aGUgZ3JvdXBcclxuICAgICAgICAkKCcuem9vbScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgIC8vIHZhciB0byBzYXZlIHRoZSBmdW5jdGlvbnMgZm9yIHRoZSB6b29tXHJcbiAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9ucyBmb3IgdGhlIHVwcGVyIGFuZCBpbm5lciBhcmVhcyBhbmQgdGhlIG1lZGlhblxyXG4gICAgICAgICAgICBsZXQgdGVtcDtcclxuICAgICAgICAgICAgLy8gbG93ZXIgb3V0ZXIgYXJlYSBhbmQgbG93ZXIgaW5uZXIgYXJlYVxyXG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5hcmVhKClcclxuICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgKyAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbWVkaWFuIGxpbmVcclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdXBwZXIgaW5uZXIgYXJlYSBhbmQgdXBwZXIgb3V0ZXIgYXJlYVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgLSAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzYXZlIHRoaXMgZm9yIHRoZSBsYXRlciB6b29tXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXVt0cmVuZENoYXJ0c0VsZW1baV1dID0gdGVtcDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIGl0IHRvIHRoZSBwYXRoXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnQuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKFt0cmVuZENoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCB0cmVuZENoYXJ0c0VsZW1baV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gc2hvdyB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICAkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIHRoZSBsaW5lIGNoYXJ0IGZpZWxkcyBhbmQgdGhlIGxpbmUgY2hhcnQgdGltZSBsaW5lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTGluZUNoYXJ0KCkge1xyXG4gICAgaWYgKGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJykgJiYgc3dhcm1EYXRhW01hdGguY2VpbChpbmRleFRpbWUgLyByYXRpbyldKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IE1hdGguY2VpbChpbmRleFRpbWUgLyByYXRpbyk7XHJcbiAgICAgICAgLy91cGRhdGUgdGhlIGxpbmUgY2hhcnQgbGVnZW5kIHRleHQgdmFsdWVzIHBlciBzZWNvbmRcclxuICAgICAgICBpZiAoaW5kZXhUaW1lICUgMjUgPT09IDApIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBjaGFuZ2UgdGhpcyB0byBhIG1vcmUgbW9kdWxhciB3YXlcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjY29udmV4X2h1bGxfYXJlYUxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgoc3dhcm1EYXRhW3RtcF1bJ2NvbnZleF9odWxsX2FyZWEnXSkgKyAnbW3CsicpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNzcGVlZExpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnc3BlZWQnXSArICdtbS9zJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2FjY2VsZXJhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnYWNjZWxlcmF0aW9uJ10gKyAnbW0vc8KyJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2Rpc3RhbmNlX2NlbnRyb2lkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydkaXN0YW5jZV9jZW50cm9pZCddICsgJ21tJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RpcmVjdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlyZWN0aW9uJ10gKyAnwrAnKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjcG9sYXJpc2F0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydwb2xhcmlzYXRpb24nXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHpvb21GdW5jdGlvbih0bXApICsgJywwKScpO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2xpbmVfY2hhcnQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSxcclxuICAgIHN3YXJtRGF0YVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCAqIGFzIE5ldHdvcmsgZnJvbSAnLi4vbmV0d29yay5qcyc7XHJcblxyXG5leHBvcnQgbGV0IHNsaWRlcjsgLy8gdGltZSBzbGlkZXIgb2YgdGhlIGFwcFxyXG5leHBvcnQgbGV0IHRvb2x0aXA7IC8vIHRvb2x0aXAgZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBCcnVzaCBlbmQgZnVuY3Rpb25cclxuICogYWRkIGFjdGl2ZSBhbmltYWxzIHRvIHRoZSBhcnJheSBvciByZW1vdmUgdGhlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgbGV0IGFycmF5QW5pbWFscyA9IFNQVi5hcnJheUFuaW1hbHM7XHJcbiAgICBsZXQgYWN0aXZlQW5pbWFscyA9IFNQVi5hY3RpdmVBbmltYWxzO1xyXG4gICAgdmFyIHJlY3QgPSBkMy5ldmVudC5zZWxlY3Rpb247XHJcbiAgICAvL2l0ZXJhdGUgb3ZlciB0aGUgMTUxIGZpc2ggdG8gY2hlY2sgd2hpY2ggYXJlIGluIHRoZSBicnVzaFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTUFYuYW5pbWFsX2lkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwb2ludCA9IFthcnJheUFuaW1hbHNbaV1bJ3AnXVswXSwgYXJyYXlBbmltYWxzW2ldWydwJ11bMV1dO1xyXG4gICAgICAgIC8vY2hlY2sgd2hpY2ggZmlzaCBhcmUgaW4gIHRoZSBicnVzaGVkIGFyZWFcclxuICAgICAgICBpZiAoKHJlY3RbMF1bMF0gPD0gcG9pbnRbMF0pICYmIChwb2ludFswXSA8PSByZWN0WzFdWzBdKSAmJlxyXG4gICAgICAgICAgICAocmVjdFswXVsxXSA8PSBwb2ludFsxXSkgJiYgKHBvaW50WzFdIDw9IHJlY3RbMV1bMV0pKSB7XHJcbiAgICAgICAgICAgIC8vIFBvaW50IGlzIGluIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goYXJyYXlBbmltYWxzW2ldWydhJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKGFjdGl2ZUFuaW1hbHMpO1xyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH1cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAkKCcuYnJ1c2gnKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRvb2x0aXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcCgpIHtcclxuICAgIHRvb2x0aXAgPSBkMy5zZWxlY3QoJ2Rpdi50b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVG9vbHRpcCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gZCAtIGQzIGRhdGEgb2JqZWN0IHdpdGggdGhlIG1ldGFkYXRhIGluZm9ybWF0aW9uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9vbHRpcEZ1bmN0aW9uKGQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRbJ2EnXSA9PT0gZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIG1vZHVsYXJcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLWFuaW1hbC1pZCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNwZWNpZXMnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2V4JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2l6ZScpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC13ZWlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRpbWUgc2xpZGVyIGFuZCB0aGUgZHluYW1pYyBuZXR3b3JrIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXJzKCkge1xyXG4gICAgLy8gdGltZSBzbGlkZXJcclxuICAgIHNsaWRlciA9ICQoJyNzbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogc3dhcm1EYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RlcDogMjUsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgcGF1c2VkIGFwcGx5IGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIE5ldHdvcmsgc2xpZGVyXHJcbiAgICAkKCcjbmV0d29yay1zbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICB2YWx1ZTogMC41LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBOZXR3b3JrLnNldE5ldHdvckxpbWl0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gc2V0IHRleHQgZm9yIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBcclxuICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKDAuNSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtYXggZnJvbSB0aGUgc2xpZGVyIHRoaXMgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGlja3NcclxuICAgIGxldCBtYXggPSBzbGlkZXIuc2xpZGVyKCdvcHRpb24nLCAnbWF4Jyk7XHJcbiAgICBsZXQgc3BhY2UgPSAxMDAgLyBtYXg7XHJcbiAgICAvL2FwcGVuZCB0aGUgbWludXRlIHRpY2tzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSA9IGkgKyAxNTAwKSB7XHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ1aS1zbGlkZXItdGlja1wiPjwvc3Bhbj4nKVxyXG4gICAgICAgICAgICAuY3NzKCdsZWZ0JywgKHNwYWNlICogaSkgKyAnJScpXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aW1lIHNsaWRlciB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdmFsdWUgZm9yIHRoZSB0aW1lIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVTbGlkZXIodmFsdWUpIHtcclxuICAgIHNsaWRlci5zbGlkZXIoJ3ZhbHVlJywgdmFsdWUpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmVhdHVyZXMgY2hlY2tib3ggYW5kIHJhZGlvIGJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggZGl2IHtcXHJcXG4gICAgY2xlYXI6IGJvdGg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBsYWJlbCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5LCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xcclxcbiAgICB0ZXh0LWluZGVudDogM2VtO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICB3aWR0aDogMi41ZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogI0MyQzJDMjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjNzc3O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4ICM5OTk7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogU1ZHIGVsZW1lbnRzIGFuZCB0ZXh0ICovXFxyXFxuXFxyXFxuI21haW4tdmlzIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxyXFxufVxcclxcblxcclxcbiNtYWluLXZpcy1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZCB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNoaWVyYXJjaHktbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG4gICAgdG9wOiAxMHB4O1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1saW5lLWNoYXJ0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTclO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5zdmctZGVuZHJvZ3JhbS1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgcGF0aCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5heGlzIGxpbmUge1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4zO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi54IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi55IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5heGlzLWxpbmUtY2hhcnQgcGF0aCBsaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi5saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRpbWUgICovXFxyXFxuXFxyXFxuLmZyYW1lLXRleHQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTbGlkZXIgdGlja3MgICovXFxyXFxuXFxyXFxuLnVpLXNsaWRlci10aWNrIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjMzM3YWI3O1xcclxcbiAgICBoZWlnaHQ6IDAuOGVtO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbi8qIExhb2RpbmcgZ2lmICAgKi9cXHJcXG5cXHJcXG4jbG9hZGluZyB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGxlZ2VuZCAgICAqL1xcclxcblxcclxcbi5sZWdlbmQge1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZ2VuZC10ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi50aW1lLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKnN3YXJtIGZlYXR1cmVzICovXFxyXFxuXFxyXFxuLmNlbnRyb2lkIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkb2lkIHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmh1bGwtcGF0aCB7XFxyXFxuICAgIGZpbGw6ICNmZmY7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5oaWVyYXJjaHktZ3JvdXAge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDEwO1xcclxcbiAgICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xcclxcbiAgICBvcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi5kZWxhdW5heS10cmlhbmd1bGF0aW9uIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNDtcXHJcXG59XFxyXFxuXFxyXFxuLmdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGUge1xcclxcbiAgICAtYW5pbWF0aW9uOiBzcGluIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluMiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbn1cXHJcXG5cXHJcXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbjIge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5idG4ge1xcclxcbiAgICBib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5hY3RpdmUgc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkxIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Q5ZDlkOTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MiB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5Njk2OTY7XFxyXFxufVxcclxcblxcclxcbiNidG4tZGFyayB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM0ZDRkNGQ7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGJyZXdlciBwaWNrZXIgZGl2ICovXFxyXFxuXFxyXFxuLnBhbGV0dGUge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcclxcbiAgICBtYXJnaW46IDRweCAwIDRweCA0cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNhYWE7XFxyXFxufVxcclxcblxcclxcbi5zd2F0Y2gge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIHdpZHRoOiAyMnB4O1xcclxcbiAgICBoZWlnaHQ6IDIycHg7XFxyXFxufVxcclxcblxcclxcbi52b3Jvbm9pIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDZweCAwO1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQyOTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUuYnRuLWxnIHtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgcGFkZGluZzogMTNweCAxM3B4O1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjMzO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUb29sdGlwICovXFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAge1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjMWI4MDllICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XFxyXFxuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB0YWJsZSB0ZDpudGgtY2hpbGQoMikge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4udG9vbHRpcC1zcGFuIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1jaGVjay1ib3guZGlzYWJsZWQge1xcclxcbiAgICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyLW91dGVyLWFyZWEsIC5sb3dlci1vdXRlci1hcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjNzRhOWNmO1xcclxcbiAgICBzdHJva2U6ICMzNjkwYzA7XFxyXFxufVxcclxcblxcclxcbi51cHBlci1pbm5lci1hcmVhLCAubG93ZXItaW5uZXItYXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzA0NWE4ZDtcXHJcXG4gICAgc3Ryb2tlOiAjMDIzODU4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFuLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICM1MjUyNTI7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk5OTtcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgIzRkNGQ0ZDtcXHJcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLnpvb20ge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4ueC5heGlzLWxpbmUtY2hhcnQ+Zz50ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3Qge1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQge1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IHRoaWNrIHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgc3BhbiB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlcjogdGhpY2sgc29saWQgd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgbWFyZ2luLXRvcDogLTYwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODYwOTA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgaDIge1xcclxcbiAgICBtYXJnaW4tdG9wOiA3cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAudDIgLm1vZC1oZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5jbG9zZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWhlYWRlciB7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZTVlNWU1O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI21ldGFkYXRhLWlucHV0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQge1xcclxcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIGxpIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCBzcGFuIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzY2NjtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmJsLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZmM5N2Y7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGMwODY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmFiLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODZjYjA7XFxyXFxufVxcclxcblxcclxcbi5uZXR3b3JrLWVkZ2VzIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxufVxcclxcblxcclxcbi5ub2RlIHRleHQge1xcclxcbiAgICBmb250OiAxMnB4IHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbi5ub2RlLS1pbnRlcm5hbCB0ZXh0IHtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4IDAgI2ZmZiwgMCAtMXB4IDAgI2ZmZiwgMXB4IDAgMCAjZmZmLCAtMXB4IDAgMCAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluayB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzYzNjM2MztcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3gge1xcclxcbiAgICBtaW4taGVpZ2h0OiAxcmVtO1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbmRpY2F0b3Ige1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MTgxODE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW46IDAgMTZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogMThweDtcXHJcXG4gICAgaGVpZ2h0OiAxOHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcXHJcXG4gICAgbGVmdDogLTJweDtcXHJcXG4gICAgdG9wOiAtNHB4O1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxuICAgIHRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWR+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4NGM3YzE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZH4uY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg0YzdjMTtcXHJcXG4gICAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXN+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2FjdGl2ZS1uZXR3b3JrLW5hbWUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICMyOTYyOTI7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUtbGV2ZWwge1xcclxcbiAgICBmaWxsOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmVcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZ2hsaWdodC1oaWVyYXJjaHkge1xcclxcbiAgICBmaWxsOiAjMjUyNTI1O1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTA7XFxyXFxuICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG59XFxyXFxuXFxyXFxuLmFuaW1hbC1oaWdobGlnaHQge1xcclxcbiAgICBmaWxsOiAjYzUxYjdkICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IC5idG4gc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1idXR0b25zLWRpdiAuYnRuLmFjdGl2ZSBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgI0QxRDNENDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1sZWdlbmQge1xcclxcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmludGVyc2VjdGlvbiB7XFxyXFxuICAgIGZpbGw6IHVybCgjc3RyaXBlZCkgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjNjcwMDBkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ltLWRpZmZlcmVuY2Uge1xcclxcbiAgICBmaWxsOiB1cmwoI3N0cmlwZWQpICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogIzY3MDAwZDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9