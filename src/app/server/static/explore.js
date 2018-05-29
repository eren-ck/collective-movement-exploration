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
let networkBakData = {};

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
        $('#main-vis')
            .draggable({
                containment: 'parent'
            })
            .resizable({
                aspectRatio: true,
                maxWidth: $('#main-vis-div').width()
            })
            .height(tankHeight * 0.6)
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
    // console.log(dataset);
    // arrayAnimals = dataset.slice(animal_ids.length * indexTime, animal_ids.length * indexTime + animal_ids.length);
    arrayAnimals = __WEBPACK_IMPORTED_MODULE_0__explore_js__["dataset"].filter(function(d) {
        return d['t'] === indexTime;
    });


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
            let networkVisBak;
            if (indexTime in __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"]) {
                let network = [];
                let tmp = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"][indexTime];
                // reset the group standard deviation for the hierarhcy
                // needed for coloring of the dendrogram nodes (variacne )
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["l" /* resethierarchyGroupStdev */])();

                let tmp_index = 0;
                // display the whole network
                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["p" /* showNetworkHierarchy */] == null) {
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
                                    if (show_dendrogram && id === __WEBPACK_IMPORTED_MODULE_1__network_js__["g" /* networkID */]) {
                                        Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["p" /* sethierarchyGroupStdev */])('h' + __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["h" /* networkHierarchyIds */][k].toString().hashCode(), tmp[tmp_index]);
                                    }
                                }
                            }
                            tmp_index = tmp_index + 1;
                        }
                    }
                }

                network.forEach(function(d) {
                    $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* networkColorScale */])(d['val']));
                    $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* networkColorScale */])(d['val']));
                });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["b" /* networkAuto */]) {
                    let tmpArray = [];
                    for (let i = 0; i < network.length; i++) {
                        tmpArray.push(network[i]['val']);
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["i" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["d" /* percentiles */])(tmpArray));
                }
                network = network.filter(function(d) {
                    return d['val'] <= __WEBPACK_IMPORTED_MODULE_1__network_js__["h" /* networkLimit */];
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* networkColorScale */])(d['val']);
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* networkColorScale */])(d['val']);
                    })
                    .attr('stroke-opacity', function(d) {
                        return d['val'];
                    });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkBackground */]) {
                    // prepare the data
                    // get the data from the network dataset in a temp object
                    let tmp_data = {};
                    network.forEach(function(d) {
                        let key = 'd-' + d['node1'] + '-' + d['node2'];
                        tmp_data[key] = {};
                        tmp_data[key]['start'] = d['start'];
                        tmp_data[key]['end'] = d['end'];
                    });
                    // decrease the edge in networkBackground by 1
                    // delete the background edge if necessary
                    for (let key in networkBakData) {
                        if (!(key in tmp_data)) {
                            if (networkBakData[key]['stroke'] <= 3) {
                                delete networkBakData[key];
                            } else {
                                networkBakData[key]['stroke'] = networkBakData[key]['stroke'] - 1;
                                let ids = key.split('-').slice(1);
                                for (let i = 0; i < arrayAnimals.length; i++) {
                                    if (ids[0] == arrayAnimals[i]['a']) {
                                        networkBakData[key]['start'] = arrayAnimals[i]['p'];
                                    } else if (ids[1] == arrayAnimals[i]['a']) {
                                        networkBakData[key]['end'] = arrayAnimals[i]['p'];
                                    }

                                }
                            }
                        }
                    }

                    // increase the edge in networkBackground by 1
                    // longer lasting connection the background edge
                    for (let key in tmp_data) {
                        // console.log(key);
                        // console.log(key in networkBakData);
                        if (key in networkBakData) {
                            if (networkBakData[key]['stroke'] <= 10 || networkBakData[key]['stroke'] <= 2 * __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkBackgroundLimit */]) {
                                networkBakData[key]['stroke'] = networkBakData[key]['stroke'] + 1;
                            }
                            networkBakData[key]['start'] = tmp_data[key]['start'];
                            networkBakData[key]['end'] = tmp_data[key]['end'];
                            // console.log(key + " -> " + p[key]);
                        } else {
                            networkBakData[key] = {
                                'stroke': 3,
                                'start': tmp_data[key]['start'],
                                'end': tmp_data[key]['end']
                            };
                        }
                    }

                    let filteredData = Object.values(networkBakData).filter(function(d) {
                        return d['stroke'] > __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkBackgroundLimit */];
                    });

                    networkVisBak = tank.select('#networkGroup')
                        .selectAll('line.network-background-edges')
                        .data(filteredData);

                    // UPDATE
                    networkVisBak
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
                        .attr('stroke-width', function(d) {
                            // return d['stroke'];
                            let val = d['stroke'];
                            if (val > 10) {
                                return 10;
                            } else {
                                return val;
                            }
                        });

                    //ENTER
                    networkVisBak
                        .enter()
                        .append('line')
                        .attr('class', 'network-background-edges')
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
                        .attr('stroke-width', function(d) {
                            // return d['stroke'];
                            let val = d['stroke'] - __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkBackgroundLimit */];
                            if (val > 10) {
                                return 10;
                            } else {
                                return val;
                            }
                        });
                    // .attr('stroke-opacity', function(d) {
                    //     return d['val'];
                    // });
                } else {
                    networkVisBak = tank.select('#networkGroup')
                        .selectAll('line.network-background-edges')
                        .data([]);
                    networkBakData = {};
                }
            } else {
                networkVis = tank.selectAll('line.network-edges')
                    .data([]);
                networkVisBak = tank.select('#networkGroup')
                    .selectAll('line.network-background-edges')
                    .data([]);
                networkBakData = {};
            }
            // EXIT - network
            networkVis.exit()
                .remove();
            networkVisBak.exit()
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return networkLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return showNetworkHierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return networkColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return networkID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return networkBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return networkBackgroundLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["j"] = setNetworkAuto;
/* harmony export (immutable) */ __webpack_exports__["i"] = setNetworLimit;
/* harmony export (immutable) */ __webpack_exports__["m"] = setNetworkHierarchy;
/* harmony export (immutable) */ __webpack_exports__["n"] = setNetworkID;
/* harmony export (immutable) */ __webpack_exports__["o"] = setnetworkColor;
/* harmony export (immutable) */ __webpack_exports__["k"] = setNetworkBackground;
/* harmony export (immutable) */ __webpack_exports__["l"] = setNetworkBackgroundLimit;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hierarchy_js__ = __webpack_require__(4);
/*eslint-disable no-unused-lets*/
/*global window, $, d3 */




let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0.5;
let showNetworkHierarchy;
let networkColor = {};
let networkID;
let networkBackground = true;
let networkBackgroundLimit = 1; //draw background line if limit is exceeded
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

/**
 * Set the boolean value for the network background color
 * @param {Boolean} value - true or false
 */
function setNetworkBackground(value) {
    networkBackground = value;
}


/**
 * Set the network background color limit - draw background line if limit is exceeded
 * @param {Integer} value - new limit
 */
function setNetworkBackgroundLimit(value) {
    networkBackgroundLimit = value;
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
/*global window,$, d3,*/
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

/**
 * Move element in SVG into background done by moving it to first element 
 */
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

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
        if (__WEBPACK_IMPORTED_MODULE_2__network_js__["p" /* showNetworkHierarchy */] === hierarchyIds[i]) {
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
    for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]) {
        if (key === ('h' + hierarchy)) {
            hierarchyColors['h' + hierarchy] = __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */][key];
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
            if (Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]).length !== 0) {
                for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]) {
                    if (__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */][key] !== colors[i]) {
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
    if (Object.keys(hierarchyColors).length !== 0 || Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]).length !== 0) {
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
    if (Object.keys(__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]).length !== 0) {
        for (let key in __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */]) {
            if (legendData.indexOf(__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */][key]) === -1) {
                legendData.push(__WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* networkColor */][key]);
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
    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["n" /* setNetworkID */])(network_id);
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
     * Draw the network background color
     */
    $('#network-background').on('change', function() {
        if (this.checked) {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["k" /* setNetworkBackground */])(true);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["k" /* setNetworkBackground */])(false);
        }
    });

    /**
     * Set the network background edge limit
     */
    $('#network-background-limit').val(1);
    $('#network-background-limit').on('change', function() {
        let val = $(this).val();
        if ($.isNumeric(val) && val > 0) {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["l" /* setNetworkBackgroundLimit */])(val);
        } else {
            $(this).val(1);
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
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["o" /* setnetworkColor */])(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["n" /* setNetworkID */])(-1);
        // remove the network color
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["o" /* setnetworkColor */])(-1);
        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["j" /* setNetworkAuto */])(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["j" /* setNetworkAuto */])(false);
            let limit = $('#network-slider').slider('value');
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["i" /* setNetworLimit */])(limit);
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
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["m" /* setNetworkHierarchy */])(id);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["m" /* setNetworkHierarchy */])(undefined);
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
    $('#main-vis-legend-div')
        .show();

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
                __WEBPACK_IMPORTED_MODULE_2__network_js__["i" /* setNetworLimit */](ui.value);
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
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.line-chart-check-box.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.network-background-edges {\r\n    fill-opacity: 0;\r\n    stroke-opacity: 0.25;\r\n    stroke: #737373;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n.custom-checkbox {\r\n    min-height: 1rem;\r\n    padding-left: 0;\r\n    margin-right: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator {\r\n    content: \"\";\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 30px;\r\n    height: 10px;\r\n    background-color: #818181;\r\n    border-radius: 15px;\r\n    margin-right: 10px;\r\n    -webkit-transition: background .3s ease;\r\n    transition: background .3s ease;\r\n    vertical-align: middle;\r\n    margin: 0 16px;\r\n    box-shadow: none;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    display: inline-block;\r\n    width: 18px;\r\n    height: 18px;\r\n    background-color: #f1f1f1;\r\n    border-radius: 21px;\r\n    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);\r\n    left: -2px;\r\n    top: -4px;\r\n    -webkit-transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n    transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator {\r\n    background-color: #84c7c1;\r\n    background-image: none;\r\n    box-shadow: none !important;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator:after {\r\n    background-color: #84c7c1;\r\n    left: 15px;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:focus~.custom-control-indicator {\r\n    box-shadow: none !important;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.dendrogram-text {\r\n    font-size: 10em !important;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n.animal-highlight {\r\n    fill: #c51b7d !important;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n#dendrogram-legend {\r\n    margin-left: 20px;\r\n}\r\n\r\n.intersection {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.sym-difference {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2UxNzVlMWUwYTc3N2FhMzdjMGQiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL21ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcz9kZTRjIiwid2VicGFjazovLy8uL2V4cGxvcmUvZXhwbG9yZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esc0RBQXNELGlDQUFpQyxlQUFlLGFBQWE7O0FBRW5IOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQsMkNBQTJDLHlCQUF5QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFD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Z0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlFQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQix5RUFBNEI7QUFDdkQsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix5RUFBNEI7QUFDdkQ7QUFDQTtBQUNBLCtDQUErQztBQUMvQywrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7O0FDMTBCQTtBQUFBO0FBQ0E7O0FBSUM7O0FBSUE7O0FBRUQsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFDQTtBQUNBOztBQUlDOzs7QUFHRCx1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlFQUE0Qjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyR0FBMkc7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbUJBQW1CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseUVBQTRCO0FBQy9DO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQ0E7O0FBSUM7O0FBSUE7OztBQUdELDRCQUFtQztBQUNuQzs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFBQTtBQUNBO0FBSUM7O0FBS0E7O0FBSUE7O0FBSUE7OztBQUdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsbUVBQXNCO0FBQzdDO0FBQ0EsMkJBQTJCLDJCQUEyQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDRCQUE0QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7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Q0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNlMTc1ZTFlMGE3NzdhYTM3YzBkIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRIaWVyYXJjaHlMZXZlbCxcclxuICAgIHJlbW92ZUhpZXJhcmNoeUxldmVsLFxyXG4gICAgc2V0SGllcmFyY2h5Q29sb3IsXHJcbiAgICByZW1vdmVIaWVyYXJjaHlDb2xvcixcclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZFxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcbi8vIGltcG9ydCBjc3NcclxuaW1wb3J0ICcuL2V4cGxvcmUuY3NzJztcclxuXHJcbmV4cG9ydCBsZXQgZGF0YXNldCA9IFtdOyAvLyBtYWluIGRhdGFzZXQgd2l0aCB2YWx1ZXMgZm9yIGVhY2ggaW5kaXZpZHVhbCBhbmltYWxcclxuZXhwb3J0IGxldCBkYXRhc2V0TWV0YWRhdGEgPSBbXTsgLy8gbWV0YWRhdGFzZXQgZm9yIGVhY2ggaW5kaXZpZHVhbCBmaXNoXHJcbmV4cG9ydCBsZXQgc3dhcm1EYXRhID0gW107IC8vIHN3YXJtZGF0YSBmb3IgbGluZWNoYXJ0IGFuZCBhbHNvIG90aGVyIHN3YXJtIGZlYXR1cmVzXHJcbmV4cG9ydCBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSB7fTsgLy8gcGVjZW50aWxlcyBuZWVkZWQgZm9yIHRoZSBjb2xvciBtYXBwaW5nXHJcbmV4cG9ydCBsZXQgbmV0d29ya0RhdGEgPSB7fTsgLy8gbmV0d29yayBkYXRhXHJcbmV4cG9ydCBsZXQgbmV0d29ya0hpZXJhcmNoeSA9IHt9OyAvLyBuZXR3b3JrIGhpZXJhcmNoeSBkYXRhXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGJhc2ljIGRhdGEgdG8gZ2V0IHRoZSB0b29sIHJ1bm5pbmcuXHJcbiAqIGFmdGVyIHRoZSBwZW5kaW5nIGFqYXggcXVlcmllcyBhcmUgZmluaXNoZWRcclxuICogdGhlIHRvb2wgaXMgZHJhd25cclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhQnV0dG9uKCk7XHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENvbmNhY3QgdG8gdGhlIG1haW4gZGF0YXNldFxyXG4gKiB0aGUgaWRlYSBpcyB0byB1c2UgdGhpcyBvbmUgZGF5IGZvciBsYXp5IGxvYWRpbmdcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBtb3ZlbWVudCBkYXRhc2V0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0YXNldCh2YWx1ZSkge1xyXG4gICAgZGF0YXNldCA9IGRhdGFzZXQuY29uY2F0KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IHBlcmNlbnRpbGVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBhcnJhcnlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVNldFBlcmNlbnRpbGUodmFsdWUpIHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWV0YURhdGEodmFsdWUpIHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSA9IHZhbHVlO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGEoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgc3dhcm0gZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCxmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBhZGQgdGhlIHRoZSBvYmplY3QgdG8gdGhlIGFycmF5IGlmIHRoZXJlIGlzIG5vIGVsZW1lbnQgeWV0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2FybURhdGFbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YS5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGludGVnZXIgb3IgZmxvYXRcclxuICAgICAgICBpZiAoZGF0YVtpXSAmJiAhKGlzTmFOKGRhdGFbaV0pKSkge1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpcyBzdHJpbmdcclxuICAgICAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gZGF0YVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBmZWF0dXJlcyB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLCBmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGFzZXRbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGRhdGFzZXQucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBhcnNlIHRoZSBpbnRcclxuICAgICAgICBkYXRhc2V0W2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSB0aGUgY2FsY3VsYXRlZCBhZGphY2VuY3kgbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0RhdGEodmFsdWUpIHtcclxuICAgIG5ldHdvcmtEYXRhID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgaGllYXJoY3kgdmFsdWVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBBcnJheSBvZiBvZiBhcnJheXMgd2l0aCBhbGwgdmFsdWVzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBoaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlEYXRhKHZhbHVlLCBuZXR3b3JrX2lkKSB7XHJcbiAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyBlbXB0eSByZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgbmV0d3Jva0hpZXJhcmNoeSBvYmplY3RcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuICAgICAgICBkZWxldGUgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlMZXZlbChuZXR3b3JrX2lkKTtcclxuICAgICAgICByZW1vdmVIaWVyYXJjaHlDb2xvcihuZXR3b3JrX2lkKTtcclxuICAgIH0gLy8gYWRkIGl0IHRvIHRoZSBuZXR3b3JrIGhpZXJhcmNoeVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBuZXR3b3JrX2lkXSA9IHZhbHVlO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUxldmVsKG5ldHdvcmtfaWQsIDIpO1xyXG4gICAgICAgIHNldEhpZXJhcmNoeUNvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgfSAvLyB0b28gbWFueSBlbGVtZW50cyBjYW50IGJlIGFkZGVkXHJcblxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLGQzLCBwYXJhbWV0ZXJzLCBTZXQgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldCxcclxuICAgIG5ldHdvcmtEYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbmV0d29ya0NvbG9yU2NhbGUsXHJcbiAgICBuZXR3b3JrQXV0byxcclxuICAgIHNldE5ldHdvckxpbWl0LFxyXG4gICAgbmV0d29ya0xpbWl0LFxyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHksXHJcbiAgICBuZXR3b3JrSUQsXHJcbiAgICBuZXR3b3JrQmFja2dyb3VuZCxcclxuICAgIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXRcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICB1cGRhdGVMaW5lQ2hhcnRcclxufSBmcm9tICcuLi9saW5lX2NoYXJ0JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc1xyXG59IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFRpbWVTbGlkZXIsXHJcbiAgICBpbml0VG9vbHRpcCxcclxuICAgIHRvb2x0aXBGdW5jdGlvbixcclxuICAgIGluaXRTbGlkZXJzLFxyXG4gICAgdG9vbHRpcFxyXG59IGZyb20gJy4vaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3JcclxufSBmcm9tICcuLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdENvbG9yUGlja2VyLFxyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0TGlzdGVuZXJzLFxyXG4gICAgcGxheUJvb2xlYW5cclxufSBmcm9tICcuLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0RGVuZHJvZ3JhbSxcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbmV0d29ya0hpZXJhcmNoeUlkcyxcclxuICAgIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYsXHJcbiAgICByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXZcclxufSBmcm9tICcuLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHRyYWNraW5nQm9vbGVhbixcclxuICAgIGFkZFRyYWNrZWREYXRhXHJcbn0gZnJvbSAnLi4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCBpbmRleFRpbWUgPSAwOyAvLyBhY3R1YWwgdGltZSBtb21lbnQgaW4gdGhlIGFuaW1hdGlvblxyXG5leHBvcnQgbGV0IHRhbmtXaWR0aDtcclxuZXhwb3J0IGxldCB0YW5rSGVpZ2h0O1xyXG5leHBvcnQgbGV0IGFjdGl2ZVNjYWxlID0gJ2JsYWNrJzsgLy8gY2FuIGJlIHNwZWVkLCBhY2NlbGVyYXRpb24sIC4uIGFuZCBibGFjayAobWVhbmluZyBubyBhY3RpdmUgc2NhbGUpXHJcbmV4cG9ydCBsZXQgbWVkb2lkQW5pbWFsID0gLTE7IC8vIHdoaWNoIGFuaW1hbCBpcyB0aGUgbWVkb2lkICgtMSBpcyBubyBhbmltYWwpXHJcbmV4cG9ydCBsZXQgYWN0aXZlQW5pbWFscyA9IFtdOyAvLyBhY3RpdmUgc2VsZWN0ZWQgYW5pbWFsc1xyXG5leHBvcnQgbGV0IGFycmF5QW5pbWFsczsgLy8gYXJyYXkgb2YgYW5pbWFscyBmb3IgdGhlIHNwZWNpZmljIHRpbWUgZnJhbWVcclxuZXhwb3J0IGxldCBhbmltYWxfaWRzOyAvLyBhcnJheSBvZiB1bmlxdWUgYW5pbWFsIGlkc1xyXG5cclxubGV0IHN2Z0NvbnRhaW5lcjsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIHNwYXRpYWwgdmlld1xyXG5sZXQgdGFuazsgLy8gc3ZnIGdyb3VwIGZvciB0aGUgc3BhdGlhbCB2aWV3IHRhbmtcclxubGV0IG5ldHdvcmtCYWtEYXRhID0ge307XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgc3BhdGlhbCB2aWV3IHdpdGggYWxsIHRoZSBpbXBvcnRhbnQgZmFjdG9yc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwYXRpYWxWaWV3SW5pdCgpIHtcclxuXHJcbiAgICBsZXQgbWluUG9pbnQgPSBwYXJhbWV0ZXJzWydtaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIGxldCBtYXhQb2ludCA9IHBhcmFtZXRlcnNbJ21heCddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gbGV0IGNvb3JkaW5hdGVPcmlnaW4gPSBwYXJhbWV0ZXJzWydjb29yZGluYXRlX29yaWdpbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gd2lkdGggPSB3aWR0aCAqMS4wMiAtLT4gc28gdGhlcmUgaXMgYSBtYXJnaW4gaW4gdGhlIHNwYXRpYWwgdmlldyB3aGVyZSBubyBhbmltYWwgaXMgZXZlclxyXG4gICAgdGFua1dpZHRoID0gKG1heFBvaW50WzBdIC0gbWluUG9pbnRbMF0pICogMS4wMjtcclxuICAgIHRhbmtIZWlnaHQgPSAobWF4UG9pbnRbMV0gLSBtaW5Qb2ludFsxXSkgKiAxLjAyO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIHZpZXcgcmVzaXphYmxlXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtYWluLXZpcycpXHJcbiAgICAgICAgICAgIC5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJCgnI21haW4tdmlzLWRpdicpLndpZHRoKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmhlaWdodCh0YW5rSGVpZ2h0ICogMC42KVxyXG4gICAgICAgICAgICAud2lkdGgodGFua1dpZHRoICogMC42KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vcmVzZXQgYWxsIGNoZWNrYm94ZXNcclxuICAgICQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuICAgICAgICAuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgIC8vc2V0IHRoZSBjb2xvciBzY2FsZSBmdW5jdGlvbiB0byBsaW5lYXJcclxuICAgICQoJyNjb2xvci1zY2FsZS1saW5lYXInKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjZ3JvdXAtc2l6ZS1tJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI2JhY2tncm91bmQtd2hpdGUnKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjc2V0dGluZ3MtZGl2IGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgLy9oaWRlIHRoZSBsb2FkaW5nIGdpZlxyXG4gICAgJCgnI2xvYWRpbmcnKVxyXG4gICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgLy8gZ2V0ICBudW1iZXIgb2YgZGlzdGluY3QgYW5pbWFsIGlkc1xyXG4gICAgbGV0IG51bV9hbmltYWxzID0gbmV3IFNldCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzZXRbaV1bJ3QnXSA9PT0gZGF0YXNldFswXVsndCddKSB7XHJcbiAgICAgICAgICAgIG51bV9hbmltYWxzLmFkZChkYXRhc2V0W2ldWydhJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgPSBkYXRhc2V0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmltYWxfaWRzID0gQXJyYXkuZnJvbShudW1fYW5pbWFscykuc29ydCgpO1xyXG5cclxuICAgIC8vWCBhbmQgWSBheGlzXHJcbiAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKVxyXG4gICAgICAgIC5yYW5nZShbbWluUG9pbnRbMF0sIG1heFBvaW50WzBdXSk7XHJcblxyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFsxXSwgbWF4UG9pbnRbMV1dKTtcclxuXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzUmlnaHQoeSlcclxuICAgICAgICAudGlja3MoNylcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIC8vIFpPT01JTkcgQU5EIFBBTk5JTkcgU1RVRkZcclxuICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgZnJvbSBoZXJlIHRvIGludGVyYWN0aW9uXHJcbiAgICBsZXQgem9vbUdyb3VwO1xyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDZdKVxyXG4gICAgICAgIC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2NvbnN0cmFpbmVkIHpvb21pbmdcclxuICAgICAgICAgICAgLy8gbW9kaWZ5IHRoZSB0cmFuc2xhdGUgc28gdGhhdCBpdCBuZXZlciBleGl0cyB0aGUgdGFua1xyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHRhbmtXaWR0aCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua1dpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcblxyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIHRhbmtIZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHRhbmtIZWlnaHQgKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLnkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBhbmQgc2NhbGVcclxuICAgICAgICAgICAgem9vbUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWCh4KSkpO1xyXG4gICAgICAgICAgICBnWWF4aXMuY2FsbCh5QXhpcy5zY2FsZShkMy5ldmVudC50cmFuc2Zvcm0ucmVzY2FsZVkoeSkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL3RoZSBzdmcgY29udGFpbmVyXHJcbiAgICBzdmdDb250YWluZXIgPSBkMy5zZWxlY3QoJyNtYWluLXZpcycpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC8vIHRvIG1ha2UgaXQgcmVzcG9uc2l2ZSB3aXRoIGNzc1xyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB0YW5rV2lkdGggKyAnICcgKyB0YW5rSGVpZ2h0KVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuXHJcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbywgZm9yICAxMjQwLzE5MDAgPSAwLjY1IHNvIHBhZGRpbmctYm90dG9tID0gNjUlICovXHJcbiAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguY2VpbCgodGFua0hlaWdodCAvIHRhbmtXaWR0aCkgKiAxMDApO1xyXG4gICAgJCgnI21haW4tdmlzJykuYXBwZW5kKCQoJzxzdHlsZT4jbWFpbi12aXM6OmFmdGVyIHtwYWRkaW5nLXRvcDogJyArIHBlcmNlbnRhZ2UgKyAnJTtkaXNwbGF5OiBibG9jaztjb250ZW50OiBcIlwiO308L3N0eWxlPiAnKSk7XHJcblxyXG4gICAgem9vbUdyb3VwID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnc3ZnOmcnKTtcclxuXHJcbiAgICBpZiAocGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKSB7XHJcbiAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltYWdlJylcclxuICAgICAgICAgICAgLy8gIC5hdHRyKCdkJyxwYXRoKVxyXG4gICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcvJyArIHBhcmFtZXRlcnMuYmFja2dyb3VuZF9pbWFnZSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhY2tncm91bmRJbWFnZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0YW5rSGVpZ2h0KVxyXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0YW5rV2lkdGgpXHJcbiAgICAgICAgICAgIC8vIHdoaWxlIGFkZGluZyBhbiBpbWFnZSB0byBhbiBzdmcgdGhlc2UgYXJlIHRoZSBjb29yZGluYXRlcyBpIHRoaW5rIG9mIHRoZSB0b3AgbGVmdFxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAnMCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCdiYWNrZ3JvdW5kJywgJyNmZmYnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9hcHBlbmQgdGhlIHRhbmsgZ3JvdXAgd2l0aCBhIHRyYW5zZm9ybWF0aW9uIHdoaWNoIHJvdGF0ZXMgdGhlIHkgYXhpc1xyXG4gICAgdGFuayA9IHpvb21Hcm91cC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGFuaycpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgeCA9IDE7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeCkge1xyXG4gICAgICAgICAgICAgICAgeCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmludmVydGVkX3kpIHtcclxuICAgICAgICAgICAgICAgIHkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJ3NjYWxlKCcgKyB4ICsgJywnICsgeSArICcpJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL2FkZCB0aGUgY2VudHJvaWRcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2VudHJvaWQgaGlkZGVuJylcclxuICAgICAgICAuYXR0cigncicsIDYpXHJcbiAgICAgICAgLmF0dHIoJ2N4JywgMClcclxuICAgICAgICAuYXR0cignY3knLCAwKTtcclxuXHJcbiAgICAvLyBhcnJvdyBmb3IgdGhlIGNlbnRyb2lkIGRpcmVjdGlvblxyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2NlbnRyb2lkLWFycm93JylcclxuICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgLmF0dHIoJ3JlZlknLCA2KVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAvLyBBcHBlbmQgdGhlIGxpbmUgZm9yIHRoZSBkaXJlY3Rpb24gYXJyb3dcclxuICAgIHRhbmsuc2VsZWN0KCcjZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgJ3VybCgjY2VudHJvaWQtYXJyb3cpJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgbmV0d29yayAgZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbmV0d29ya0dyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgZGVsYXVuYXktdHJpYW5ndWxhdGlvbiBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdm9yb25vaSBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd2b3Jub2lHcm91cCcpO1xyXG5cclxuICAgIC8vYXBwZW5kIHRoZSBmcmFtZSB0aW1lIHRleHRcclxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdmcmFtZS10ZXh0JylcclxuICAgICAgICAuYXR0cigneCcsIDMwKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMzApXHJcbiAgICAgICAgLnRleHQoJy0tIDogLS0gOiAtLSAnKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgbGV0IGdZYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxyXG4gICAgICAgIC5jYWxsKHlBeGlzKTtcclxuXHJcbiAgICAvLyBpbml0IHN0dWZmIGZyb20gb3RoZXIgbW9kdWxlc1xyXG4gICAgaW5pdFRvb2x0aXAoKTtcclxuICAgIGluaXRTbGlkZXJzKCk7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwKCk7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIoKTtcclxuICAgIGxpbmVDaGFydCgpO1xyXG4gICAgaW5pdExpc3RlbmVycygpO1xyXG4gICAgaW5pdERlbmRyb2dyYW0oKTtcclxuICAgIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXdpbmcgZnVuY3Rpb24gLSBpcyBjYWxsZWQgZm9yIGVhY2ggdGltZXN0ZXBcclxuICogaW5kZXhUaW1lIHNhdmVzIHRoZSBjdXJyZW50IHRpbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lIG9mIGZ1bmN0aW9uIGRyYXdcclxuICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIC8vdXBkYXRlIHRpbWUgdG8gd2FpdCBha2Egc3BlZWQgb2YgcmVwbGF5XHJcbiAgICBsZXQgdGltZVRvV2FpdCA9ICQoJ2lucHV0W25hbWU9Z3JvdXAxXTpjaGVja2VkJywgJyNncm91cDEnKVxyXG4gICAgICAgIC52YWwoKTtcclxuICAgIC8vc2NhbGUgdGhlIHNpemUgYnkgdGhpcyBudW1iZXJcclxuICAgIGxldCBhbmltYWxTY2FsZSA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1zaXplOmNoZWNrZWQnKVxyXG4gICAgICAgIC52YWwoKTtcclxuXHJcbiAgICAvL2dldCB0aGUgbmV4dCBhbmltYWxzXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhc2V0KTtcclxuICAgIC8vIGFycmF5QW5pbWFscyA9IGRhdGFzZXQuc2xpY2UoYW5pbWFsX2lkcy5sZW5ndGggKiBpbmRleFRpbWUsIGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lICsgYW5pbWFsX2lkcy5sZW5ndGgpO1xyXG4gICAgYXJyYXlBbmltYWxzID0gZGF0YXNldC5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkWyd0J10gPT09IGluZGV4VGltZTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL3RoZSB0aW1lb3V0IGlzIHNldCBhZnRlciBvbmUgdXBkYXRlIDMwIG1zXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBkcmF3IGhpZXJhcmNoeVxyXG4gICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgdGltZSBmcmFtZSB0ZXh0XHJcbiAgICAgICAgICAgIHN2Z0NvbnRhaW5lci5zZWxlY3QoJy5mcmFtZS10ZXh0JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gMTUwMCkgJSA2MCArICc6JyArIE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10pO1xyXG4gICAgICAgICAgICAvLyBpZiBhIHNlY29uZCBoYXMgY2hhbmdlZCBtb3ZlIHRoZSBzbGlkZXJcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lU2xpZGVyKGluZGV4VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdmdBbmltYWxzID0gdGFuay5zZWxlY3RBbGwoJ2cuYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGFycmF5QW5pbWFscyk7XHJcblxyXG4gICAgICAgICAgICAvLyBOZXR3b3JrIHZpc1xyXG4gICAgICAgICAgICBsZXQgbmV0d29ya1ZpcztcclxuICAgICAgICAgICAgbGV0IG5ldHdvcmtWaXNCYWs7XHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgaW4gbmV0d29ya0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXR3b3JrID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gbmV0d29ya0RhdGFbaW5kZXhUaW1lXTtcclxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBncm91cCBzdGFuZGFyZCBkZXZpYXRpb24gZm9yIHRoZSBoaWVyYXJoY3lcclxuICAgICAgICAgICAgICAgIC8vIG5lZWRlZCBmb3IgY29sb3Jpbmcgb2YgdGhlIGRlbmRyb2dyYW0gbm9kZXMgKHZhcmlhY25lIClcclxuICAgICAgICAgICAgICAgIHJlc2V0aGllcmFyY2h5R3JvdXBTdGRldigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0bXBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgd2hvbGUgbmV0d29ya1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dOZXR3b3JrSGllcmFyY2h5ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUxJzogYXJyYXlBbmltYWxzW2ldWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUyJzogYXJyYXlBbmltYWxzW2pdWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IGFycmF5QW5pbWFsc1tqXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWwnOiB0bXBbdG1wX2luZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBfaW5kZXggPSB0bXBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAvLyBkaXNwbGF5IHRoZSBuZXR3b3JrIG9ubHkgaW4gdGhlIGNsdXN0ZXJpbmdcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaG93X2RlbmRyb2dyYW0gPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG5ldHdvcmtIaWVyYXJjaHlJZHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV0d29ya0hpZXJhcmNoeUlkc1trXS5pbmNsdWRlcyhhcnJheUFuaW1hbHNbaV1bJ2EnXSkgJiYgbmV0d29ya0hpZXJhcmNoeUlkc1trXS5pbmNsdWRlcyhhcnJheUFuaW1hbHNbal1bJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV0d29ya0hpZXJhcmNoeUlkc1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRydWUgZGVwaWN0IHRoZSBzdGFuZGFyZCBkZXZpYXRpb24gdmlhIGNvbG9yIGluIHRoZSBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIGZhc3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvd19kZW5kcm9ncmFtICYmIGlkID09PSBuZXR3b3JrSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYoJ2gnICsgbmV0d29ya0hpZXJhcmNoeUlkc1trXS50b1N0cmluZygpLmhhc2hDb2RlKCksIHRtcFt0bXBfaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMSddICsgJy0nICsgZFsnbm9kZTInXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTInXSArICctJyArIGRbJ25vZGUxJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtBdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXR3b3JrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2gobmV0d29ya1tpXVsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXROZXR3b3JMaW1pdChwZXJjZW50aWxlcyh0bXBBcnJheSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV0d29yayA9IG5ldHdvcmsuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ10gPD0gbmV0d29ya0xpbWl0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXMgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnbGluZS5uZXR3b3JrLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShuZXR3b3JrKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxIC0gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSXHJcblxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV0d29ya0JhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHRoZSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZyb20gdGhlIG5ldHdvcmsgZGF0YXNldCBpbiBhIHRlbXAgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcF9kYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9ICdkLScgKyBkWydub2RlMSddICsgJy0nICsgZFsnbm9kZTInXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2RhdGFba2V5XSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBfZGF0YVtrZXldWydzdGFydCddID0gZFsnc3RhcnQnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2RhdGFba2V5XVsnZW5kJ10gPSBkWydlbmQnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWNyZWFzZSB0aGUgZWRnZSBpbiBuZXR3b3JrQmFja2dyb3VuZCBieSAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBiYWNrZ3JvdW5kIGVkZ2UgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG5ldHdvcmtCYWtEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiB0bXBfZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQmFrRGF0YVtrZXldWydzdHJva2UnXSA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5ldHdvcmtCYWtEYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0cm9rZSddID0gbmV0d29ya0Jha0RhdGFba2V5XVsnc3Ryb2tlJ10gLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZHMgPSBrZXkuc3BsaXQoJy0nKS5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRzWzBdID09IGFycmF5QW5pbWFsc1tpXVsnYSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQmFrRGF0YVtrZXldWydzdGFydCddID0gYXJyYXlBbmltYWxzW2ldWydwJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWRzWzFdID09IGFycmF5QW5pbWFsc1tpXVsnYSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQmFrRGF0YVtrZXldWydlbmQnXSA9IGFycmF5QW5pbWFsc1tpXVsncCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGVkZ2UgaW4gbmV0d29ya0JhY2tncm91bmQgYnkgMVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvbmdlciBsYXN0aW5nIGNvbm5lY3Rpb24gdGhlIGJhY2tncm91bmQgZWRnZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0bXBfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXkgaW4gbmV0d29ya0Jha0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5IGluIG5ldHdvcmtCYWtEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV0d29ya0Jha0RhdGFba2V5XVsnc3Ryb2tlJ10gPD0gMTAgfHwgbmV0d29ya0Jha0RhdGFba2V5XVsnc3Ryb2tlJ10gPD0gMiAqIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQmFrRGF0YVtrZXldWydzdHJva2UnXSA9IG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0cm9rZSddICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0YXJ0J10gPSB0bXBfZGF0YVtrZXldWydzdGFydCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Jha0RhdGFba2V5XVsnZW5kJ10gPSB0bXBfZGF0YVtrZXldWydlbmQnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleSArIFwiIC0+IFwiICsgcFtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogdG1wX2RhdGFba2V5XVsnc3RhcnQnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogdG1wX2RhdGFba2V5XVsnZW5kJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBPYmplY3QudmFsdWVzKG5ldHdvcmtCYWtEYXRhKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3Ryb2tlJ10gPiBuZXR3b3JrQmFja2dyb3VuZExpbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrVmlzQmFrID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstYmFja2dyb3VuZC1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKGZpbHRlcmVkRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNCYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBkWydzdHJva2UnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBkWydzdHJva2UnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vRU5URVJcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrVmlzQmFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmV0d29yay1iYWNrZ3JvdW5kLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBkWydzdHJva2UnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBkWydzdHJva2UnXSAtIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGRbJ3ZhbCddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrVmlzQmFrID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstYmFja2dyb3VuZC1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQmFrRGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNCYWsgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnbGluZS5uZXR3b3JrLWJhY2tncm91bmQtZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIG5ldHdvcmtcclxuICAgICAgICAgICAgbmV0d29ya1Zpcy5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgbmV0d29ya1Zpc0Jhay5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlbGF1bmF5IHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOICAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgdmFyIHRyaWFuZ3VsYXRpb247XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0KCcjZGVsYXVuYXktdHJpYW5ndWxhdGlvbi1ncm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC5kZWxhdW5heS10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbc3dhcm1EYXRhW2luZGV4VGltZV1bJ3RyaWFuZ3VsYXRpb24nXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbi5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24gPSB0YW5rLnNlbGVjdEFsbCgncGF0aC5kZWxhdW5heS10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgdHJpYW5ndWxhdGlvbi5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZvcm9ub2lcclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOICAtIHZvcm9ub2lcclxuICAgICAgICAgICAgdmFyIHZvcm9ub2k7XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy12b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9hcHBlbmQgdGhlIGdyb3VwIGZvciB0aGUgdm9yb25vaSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgdm9yb25vaSA9IHRhbmtcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjdm9ybm9pR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoc3dhcm1EYXRhW2luZGV4VGltZV1bJ3Zvcm9ub2knXS5zcGxpdCgnOycpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUiAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFuay5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHZvcm9ub2lcclxuICAgICAgICAgICAgdm9yb25vaS5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vRU5URVIgLSBhcHBlbmQgdGhlIGFuaW1hbCBncm91cHNcclxuICAgICAgICAgICAgbGV0IGFuaW1hbEdyb3VwaW5ncyA9IHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhbmltYWwnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYW5pbWFsLScgKyBkWydhJ107XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgY2lyY2xlcyBmb3IgZWFjaCBhbmltYWwgdG8gdGhlIGFuaW1hbGdyb3VwXHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5ncy5hcHBlbmQoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIDEuNSAqIGFuaW1hbFNjYWxlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBGdW5jdGlvbihkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBvbiBjbGljayBmb3IgdGhlIGFjdGl2ZSBmaXNoc1xyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5pbmNsdWRlcyhkWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMgPSBhY3RpdmVBbmltYWxzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGRbJ2EnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQW5pbWFscy5wdXNoKGRbJ2EnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4VGltZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVUERBVEUgLSBhbmltYWxzIGNpcmNsZXNcclxuICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBhbmltYWxTY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgZm9yIGVhY2ggZ3JvdXAgdGhlIGFycm93LCBuZWVkZWQgZm9yIGNvbG9yaW5nXHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5ncy5hcHBlbmQoJ3N2ZzpkZWZzJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXJyb3ctbWFya2VyLScgKyBkWydhJ107XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3JlZlgnLCAyKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3JlZlknLCA2KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgMTMpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTIsMiBMMiwxMSBMMTAsNiBMMiwyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIGxpbmUgZm9yIHRoZSBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyLWVuZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjYXJyb3ctbWFya2VyLScgKyBkWydhJ10gKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vZXhlY3V0ZSBvbmx5IHdoZW4gZHJhdyBkaXJlY3Rpb24gYnV0dG9uIGlzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSBhbmltYWwgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydwJ11bMF0gKyAyICogYW5pbWFsU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydwJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1kWydkaXJlY3Rpb24nXSArICcgJyArIGRbJ3AnXVswXSArICcgJyArIC1kWydwJ11bMV0gKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBhcnJvd3NcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cgaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnZleCBodWxsXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1jb252ZXgtaHVsbCcpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTiAtIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2YXIgaHVsbFBhdGggPSB0YW5rLnNlbGVjdEFsbCgncGF0aC5odWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsnY29udmV4X2h1bGwnXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGhcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRU5URVIgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2h1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGRyYXcgbm8gaHVsbFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGggPSB0YW5rLnNlbGVjdCgncGF0aC5odWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gaHVsbCBwYXRoc1xyXG4gICAgICAgICAgICBodWxsUGF0aC5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGZpc2hcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZVNjYWxlICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgICAgICAgICB2YXIgdG1wU2NhbGUgPSByZXR1cm5Db2xvclNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigxMClcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBTY2FsZShkW2FjdGl2ZVNjYWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9jb2xvciBldmVyeSBmaXNoIGJsYWNrXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJyMwMDAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnIzAwMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG1ldGFkYXRhQ29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGFDb2xvcikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNhbmltYWwtJyArIGtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIG1ldGFkYXRhQ29sb3Jba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBtZXRhZGF0YUNvbG9yW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSBvcGFjdGl5IGlmIHRoZSBmaXNoIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMC4yNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0cmFja2luZyBpcyBvblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYWNraW5nQm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFRyYWNrZWREYXRhKGFycmF5QW5pbWFsc1swXVsndCddLCBhY3RpdmVBbmltYWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBub3JtYWwgb3BhY2l0eVxyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2RyYXcgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKS5pcygnOmNoZWNrZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgc3dhcm1EYXRhW2luZGV4VGltZV0uY2VudHJvaWQgJiZcclxuICAgICAgICAgICAgICAgICQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAyICogYW5pbWFsU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2RpcmVjdGlvbiddICsgJyAnICsgc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAnICcgKyAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV0gKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBhcnJvd3NcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbWVkb2lkXHJcbiAgICAgICAgICAgIGlmIChtZWRvaWRBbmltYWwgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbWVkb2lkQW5pbWFsID0gc3dhcm1EYXRhW2luZGV4VGltZV1bJ21lZG9pZCddO1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL25leHQgZnJhbWVcclxuICAgICAgICAgICAgaW5kZXhUaW1lKys7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVMaW5lQ2hhcnQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSA+PSBzd2FybURhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvL3N0YXJ0IGFnYWluIGZyb20gdGhlIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXlCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWVcclxuICAgICAgICAgICAgICAgIC8vICAgbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHQxIC0gdDApOyAvLyBpbiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZVRvV2FpdCk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGluZGV4IHRpbWUgdG8gYSBuZXcgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gbmV3IHRpbWUgc3RlcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKGluZGV4VGltZSA8PSBzd2FybURhdGEubGVuZ3RoKSkge1xyXG4gICAgICAgIGluZGV4VGltZSA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVjcmVhc2UgdGltZSBieSAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVjSW5kZXhUaW1lKCkge1xyXG4gICAgaW5kZXhUaW1lID0gaW5kZXhUaW1lIC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGhlIG5ldyBhY3RpdmUgc2NhbGUgLSBlLmcuIHNwZWVkLCBhY2NlbGVyYXRpb24sIGJsYWNrIGV0Yy5cclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIC0gYWN0aXZlIHNjYWxlIGZvciB0aGUgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2NhbGUodmFsdWUpIHtcclxuICAgIGFjdGl2ZVNjYWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldyBtZWRvaWQgYW5pbWFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFVuaXF1ZSBpZCBvZiB0aGUgYW5pbWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWVkb2lkQW5pbWFsKHZhbHVlKSB7XHJcbiAgICBtZWRvaWRBbmltYWwgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc2VsZWN0ZWQgYW5kIGhpZ2hsaWdodGVkIGFuaW1hbHNcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiB1bnFpdWUgaWQgb2YgdGhlIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVBbmltYWxzKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVBbmltYWxzID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBkMyAqL1xyXG5pbXBvcnQge1xyXG4gICAgaGllcmFyY2h5Q29sb3JzLFxyXG4gICAgY29sb3JzLFxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kXHJcbn0gZnJvbSAnLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgbGV0IG5ldHdvcmtBdXRvID0gZmFsc2U7IC8vIGlmIHRydWUgdGhlIG5ldHdvcmsgZWRnZSBsaW1pdCBpcyBhdXRvbWF0aWNhbGx5IHN1Z2dlc3RlZFxyXG5leHBvcnQgbGV0IG5ldHdvcmtMaW1pdCA9IDAuNTtcclxuZXhwb3J0IGxldCBzaG93TmV0d29ya0hpZXJhcmNoeTtcclxuZXhwb3J0IGxldCBuZXR3b3JrQ29sb3IgPSB7fTtcclxuZXhwb3J0IGxldCBuZXR3b3JrSUQ7XHJcbmV4cG9ydCBsZXQgbmV0d29ya0JhY2tncm91bmQgPSB0cnVlO1xyXG5leHBvcnQgbGV0IG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQgPSAxOyAvL2RyYXcgYmFja2dyb3VuZCBsaW5lIGlmIGxpbWl0IGlzIGV4Y2VlZGVkXHJcbi8vIGZpeGVkIGNvbG9yIHNjYWxlIGZvciB0aGUgbmV0d29ya1xyXG5cclxuLyoqXHJcbiAqIGNvbG9yIHNjYWxlIGZvciBuZXR3b3JrIC0gcmFuZ2UgaXMgZGVmaW5lZCBkeW5hbWljIGJhc2VkIG9uIHRoZSBoaWVyYXJoY3kgY29sb3JcclxuICovXHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAuZG9tYWluKFxyXG4gICAgICAgIFswLCAuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjgsIC45LCAxXVxyXG4gICAgKTtcclxuXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBuZXR3b3JrICBzZWxlY3QgYnV0dG9ucyBhbmQgaGllcmFyY2h5IGNoZWNrYm94ZXMgdG8gdGhlIG5ldHdvcmsgbW9kYWxcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIG5ldHdvcmsgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXVsnZmluaXNoZWQnXSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmtzLWhpZXJhcmNoaWVzLXRhYmxlIHRib2R5JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8dHI+PHRkPicgKyBkYXRhW2ldWyduYW1lJ10gKyAnPC90ZD4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8dGQ+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1ibG9ja1wiIGRhdGE9JyArIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICcgbmFtZT0nICsgZGF0YVtpXVsnbmFtZSddICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJz48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2J1dHRvbj48L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyA8dGQ+PGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLWNoZWNrYm94IGhpZWFyY2h5LWNoZWNrYm94XCI+PGlucHV0IGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXQgaGlkZGVuXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YT0nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJyBuYW1lPScgKyBkYXRhW2ldWyduYW1lJ10gKyAnPjxzcGFuIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yXCI+PC9zcGFuPjwvbGFiZWw+PC90ZD4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD48bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3ggbmV0d29yay1oaWVyYXJjaHktY2hlY2tib3hcIj48aW5wdXQgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dCBoaWRkZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICdcIj48c3BhbiBjbGFzcz1cImN1c3RvbS1jb250cm9sLWluZGljYXRvclwiPjwvc3Bhbj48L2xhYmVsPjwvdGQ+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNuZXR3b3Jrcy1oaWVyYXJjaGllcy10YWJsZScpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ1RoZXJlIGlzIG5vIG5ldHdvcmsgZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBhdXRvIHZhbHVlIC0gaWYgdHJ1ZSB0aGFuIHRoZSBuZXR3b3JrIGxpbWl0IGlzIHNldCB0byB0aGUgMC45NSBwZXJjZW50aWxlIG9mIGFsbCB2YWx1ZXNcclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtBdXRvKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrQXV0byA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGxpbWl0IHdpdGggdGhlIHNwZWNpZmljIG5ldHdvcmsgc2xpZGVyIC0gY3VzdG9tXHJcbiAqIDAgPSBzaW1pbGFyIGFuZCAxIHVuc2ltaWxhciBmb3IgdGhlIHNwZWNpZmljIHRpbWUgbW9tZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIGJldHdlZW4gMCBhbmQgMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvckxpbWl0KHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrTGltaXQgPSAxIC0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgaW4gaGllcmFyY2h5IChlLmcuIGgwKSBmaWx0ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZXJhcmNoeSAtIGUuZy4gMC1uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0hpZXJhcmNoeSh2YWx1ZSkge1xyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHkgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBuZXR3b3JrIGlkIC0gbmVlZGVkIGZvciBoaWVyYXJjaHkgc3RhbmRhcmQgZGV2aWF0aW9uIGNvbG9yaW5nXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIGUuZy4gMC1uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0lEKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrSUQgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBuZXR3b3JrIGNvbG9yIHNjYWxlIHJhbmdlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCAtIGlkIG9mIHRoZSBuZXR3b3JrXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0bmV0d29ya0NvbG9yKG5ldHdvcmtfaWQpIHtcclxuICAgIC8vIGlmIGlkID0gLTEgc2V0IHRoZSBjb2xvciB0byBub3RoaW5nXHJcbiAgICBpZiAobmV0d29ya19pZCA+PSAwKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgY29sb3Igb2YgdGhlIGVkZ2VzXHJcbiAgICAgICAgbmV0d29ya0NvbG9yID0ge307XHJcblxyXG4gICAgICAgIC8vIGhpZXJhcmNoeSBjb2xvcnMgd2hpY2ggYXJlIGFscmVhZHkgaW4gdXNhZ2VcclxuICAgICAgICBsZXQgdG1wQ29sb3IgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb2xvclxyXG4gICAgICAgIC8vIHNlYXJjaCBpbiB0aGUgaGllcmFyeUNvbG9ycyBpZiBhIGNvbG9yIHdhcyBkZWZpbmVkIGZvciB0aGUgbmV0d29yayBpZFxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBoaWVyYXJjaHlDb2xvcnMpIHtcclxuICAgICAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAoJ2gnICsgbmV0d29ya19pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF0gPSBoaWVyYXJjaHlDb2xvcnNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wQ29sb3IucHVzaChoaWVyYXJjaHlDb2xvcnNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhlIHRoZSBuZXR3b3JrQ29sb3IgaXMgc3RpbGwgZW1wdHkgY2hvb3NlIGEgY29sb3JcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY29sb3IgaXMgYWxyZWFkeSBpbiB1c2FnZSwgaWYgc28gc2tpcFxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRtcENvbG9yLmluZGV4T2YoY29sb3JzW2ldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBjb2xvciBzY2FsZVxyXG4gICAgICAgIGxldCB0bXAgPSBuZXR3b3JrQ29sb3JbJ2gnICsgbmV0d29ya19pZF07XHJcbiAgICAgICAgbmV0d29ya0NvbG9yU2NhbGVcclxuICAgICAgICAgICAgLnJhbmdlKFtkMy5jb2xvcih0bXApLmRhcmtlcihbNV0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbNF0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbM10pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbMl0pLCBkMy5jb2xvcih0bXApLmRhcmtlcihbMV0pLFxyXG4gICAgICAgICAgICAgICAgZDMuY29sb3IodG1wKSwgZDMuY29sb3IodG1wKS5icmlnaHRlcihbMV0pLCBkMy5jb2xvcih0bXApLmJyaWdodGVyKFsyXSksIGQzLmNvbG9yKHRtcCkuYnJpZ2h0ZXIoWzNdKSwgZDMuY29sb3IodG1wKS5icmlnaHRlcihbXSlcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBuZXR3b3JrQ29sb3IgPSB7fTtcclxuICAgIH1cclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZCgpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBib29sZWFuIHZhbHVlIGZvciB0aGUgbmV0d29yayBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWUgLSB0cnVlIG9yIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0JhY2tncm91bmQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtCYWNrZ3JvdW5kID0gdmFsdWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGJhY2tncm91bmQgY29sb3IgbGltaXQgLSBkcmF3IGJhY2tncm91bmQgbGluZSBpZiBsaW1pdCBpcyBleGNlZWRlZFxyXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHZhbHVlIC0gbmV3IGxpbWl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0JhY2tncm91bmRMaW1pdCh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0JhY2tncm91bmRMaW1pdCA9IHZhbHVlO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL25ldHdvcmsuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCBkMywqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRyYXdcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFBsYXlCb29sZWFuXHJcbn0gZnJvbSAnLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdFRyZW5kQ2hhcnRMaXN0ZW5lclxyXG59IGZyb20gJy4vbGluZV9jaGFydC5qcyc7XHJcbi8qKlxyXG4gKiBEaXNhYmxlIHRoZSBwbGF5IGJ1dHRvbiAtLT4gTG9hZGluZyBzeW1ib2xcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKGZhbHNlKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZWZyZXNoIGdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGVcIj48L3NwYW4+TG9hZGluZycpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgcGxheSBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKHRydWUpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+UGxheScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuICAuMDUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXMoYXJyKSB7XHJcbiAgICBsZXQgcCA9IDAuMDU7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgIH0pO1xyXG4gICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHA7XHJcbiAgICBsZXQgbG93ZXIgPSBNYXRoLmZsb29yKGluZGV4KTtcclxuICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICBpZiAodXBwZXIgPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gYXJyW2xvd2VyXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSAoYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSAwNSwgMjUsIDUwLCA3NSwgOTUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXNMaW5lQ2hhcnQoYXJyKSB7XHJcbiAgICBsZXQgcCA9IFswLjA1LCAwLjI1LCAwLjUsIDAuNzUsIDAuOTVdO1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IChhcnIubGVuZ3RoIC0gMSkgKiBwW2ldO1xyXG4gICAgICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gaW5kZXggJSAxO1xyXG4gICAgICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGNoZWNrYm94ZXMgaW4gdGhlIGZlYXR1cmUgcGFuZWxcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zKGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIG9iamVjdFxyXG4gICAgZm9yICh2YXIga2V5IGluIGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAgICAgaWYgKGRhdGFTZXRQZXJjZW50aWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGV4dCBmb3IgdGhlIGRpc3BsYXllZCBidXR0b25cclxuICAgICAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0ga2V5LnNwbGl0KCdfJykuam9pbignICcpO1xyXG4gICAgICAgICAgICBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYnV0dG9uXHJcbiAgICAgICAgICAgICQoJyNhYnNvbHV0ZS1mZWF0dXJlLWNoZWNrYm94ZXMnKS5hZnRlcignPGRpdiBjbGFzcz1cImZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHRcIj4gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjaGVja2JveFwiIGlkPVwiZHJhdy0nICsga2V5ICtcclxuICAgICAgICAgICAgICAgICdcIi8+PGxhYmVsIGZvcj1cImRyYXctJyArIGtleSArICdcIj4nICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgK1xyXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiZHJhdy0nICsga2V5ICtcclxuICAgICAgICAgICAgICAgICctZGV0YWlsc1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgaGlkZGVuIGRyYXctZGV0YWlsc1wiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiA8L2J1dHRvbj4gPC9sYWJlbD4gPC9kaXY+Jyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGluaXQgdGhlIGxpc3Rlcm5lcnNcclxuICAgIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKTtcclxuXHJcbn1cclxuXHJcbi8vIGdlbmVyYXRlIGhhc2ggY29kZXMgZnJvbSBzdHJpbmdzXHJcbi8vIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzYxNjQ2MS9nZW5lcmF0ZS1hLWhhc2gtZnJvbS1zdHJpbmctaW4tamF2YXNjcmlwdC1qcXVlcnlcclxuU3RyaW5nLnByb3RvdHlwZS5oYXNoQ29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhhc2ggPSAwLFxyXG4gICAgICAgIGksIGNocjtcclxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGhhc2g7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNociA9IHRoaXMuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaHI7XHJcbiAgICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgc3RhbmRhcmREZXZpYXRpb24gb2YgYW4gYXJyYXkgb2YgbnVtYmVyc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBhcnJheSBvZiBudW1iZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RhbmRhcmREZXZpYXRpb24oYXJyKSB7XHJcbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBsZXQgbWVhbiA9IGFyci5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwdiArIGN2O1xyXG4gICAgICAgIH0sIDApIC8gYXJyLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG1wID0gYXJyLm1hcChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KG51bSAtIG1lYW4sIDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodG1wLnJlZHVjZShmdW5jdGlvbihwdiwgY3YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHB2ICsgY3Y7XHJcbiAgICAgICAgfSwgMCkgLyB0bXAubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vdmUgZWxlbWVudCBpbiBTVkcgaW50byBiYWNrZ3JvdW5kIGRvbmUgYnkgbW92aW5nIGl0IHRvIGZpcnN0IGVsZW1lbnQgXHJcbiAqL1xyXG5kMy5zZWxlY3Rpb24ucHJvdG90eXBlLm1vdmVUb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSB0aGlzLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcclxuICAgICAgICBpZiAoZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIGZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwgZDMsIFBvbHlCb29sKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBuZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbmRleFRpbWUsXHJcbiAgICBhcnJheUFuaW1hbHMsXHJcbiAgICBzZXRBY3RpdmVBbmltYWxzLFxyXG4gICAgZGVjSW5kZXhUaW1lLFxyXG4gICAgZHJhd1xyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2hvd05ldHdvcmtIaWVyYXJjaHksXHJcbiAgICBuZXR3b3JrQ29sb3JcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHN0YW5kYXJkRGV2aWF0aW9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmxldCB6b29tR3JvdXA7IC8vIHpvb20gZ3JvdXAgZm9yIHRoZSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbmxldCB0cmVlbWFwO1xyXG5sZXQgdG9vbHRpcERpdjtcclxubGV0IHNwYXRpYWxWaWV3OyAvLyBnZXQgdGhlIHNwYXRpYWwgdmlldyBzdmcgZnJvbSB0aGUgbWFpbiB2aXNcclxubGV0IHN2Z0xlZ2VuZDtcclxubGV0IGhpZXJhcmNoeUxldmVscyA9IHt9O1xyXG5sZXQgc2V0T3BlcmF0aW9uID0gJ3VuaW9uJztcclxubGV0IGlkOyAvLyBuZWVkZWQgZm9yIHRoZSBjb2xsYXBzZSBmdW5jdGlvblxyXG4vL1N0YXRpYyBjb2xvciBzY2FsZSBmb3IgdGhlIGRlbmRyb2dyYW0gdmFyaWFjbmUgY29sb3JpbmdcclxubGV0IHN0YW5kYXJkRGV2aWF0aW9uQ29sb3JTY2FsZSA9IGQzLnNjYWxlVGhyZXNob2xkKClcclxuICAgIC5kb21haW4oXHJcbiAgICAgICAgWzAsIC4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOCwgLjksIDFdXHJcbiAgICApXHJcbiAgICAucmFuZ2UoWycjZjdmYmZmJywgJyNkZWViZjcnLCAnI2M2ZGJlZicsICcjOWVjYWUxJywgJyM2YmFlZDYnLCAnIzQyOTJjNicsICcjMjE3MWI1JywgJyMwODUxOWMnLCAnIzA4MzA2YiddKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXhOdW1iZXJIaWVyYXJjaGllcyA9IDQ7XHJcbmV4cG9ydCBsZXQgbmV0d29ya0hpZXJhcmNoeUlkcyA9IFtdO1xyXG5leHBvcnQgbGV0IGhpZXJhcmNoeUNvbG9ycyA9IHt9O1xyXG5leHBvcnQgbGV0IGhpZXJhcmNoeUdyb3VwU3RkZXYgPSB7fTtcclxuLy8gVE9ETyBhZGQgbW9yZSBjb2xvcnNcclxuZXhwb3J0IGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCcsICcjZTcyOThhJywgJyNmZjk5MDAnXTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBkZW5kcm9ncmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdERlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBjb25zdGFuY3QgZmFjdG9ycyBmb3IgdGhlIGRlbmRncm9ncmFtXHJcbiAgICBsZXQgbWFyZ2luID0gMjAsXHJcbiAgICAgICAgd2lkdGggPSA1MDAwLFxyXG4gICAgICAgIGhlaWdodCA9IDUwMDA7XHJcblxyXG4gICAgLy8gem9vbSBmdW5jdGlvbiBmb3IgdGhlIGRlbmRyb2dyYW1cclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCAxMF0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHdpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh3aWR0aCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueCkpO1xyXG5cclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnkgPSBNYXRoLm1pbigwLCBoZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KGhlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tcGFuZWwnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctZGVuZHJvZ3JhbS1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50LWRlbmRyb2dyYW0nLCB0cnVlKVxyXG4gICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuICAgIGluaXREZW5kcm9ncmFtTGVnZW5kKCk7XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSB6b29tIGdyb3VwIHRvIHRoZSBzdmdcclxuICAgIHpvb21Hcm91cCA9IHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4gKyAnLCcgKyBtYXJnaW4gKyAnKScpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmcnKTtcclxuXHJcbiAgICAvLyBkMyB0cmVlXHJcbiAgICB0cmVlbWFwID0gZDMudHJlZSgpIC8vZDMuY2x1c3RlcigpXHJcbiAgICAgICAgLnNpemUoWyhoZWlnaHQgLSAxMCAqIG1hcmdpbiksICh3aWR0aCAtIDEwICogbWFyZ2luKV0pO1xyXG5cclxuICAgIC8vIHNldCB0aGUgc3BhdGlhbCB2aWV3IC0gbmVlZGVkIHRvIGFkZCB0aGUgY2x1c3RlcmluZyB0byB0aGUgc3BhdGlhbCB2aWV3IHdpbmRvd1xyXG4gICAgc3BhdGlhbFZpZXcgPSBkMy5zZWxlY3QoJy50YW5rJyk7XHJcblxyXG4gICAgLy8gaW5pdCBkZW5kcm9ncmFtIHNsaWRlclxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgTmV0d29yayBzbGlkZXJcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXNsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiAnbWF4JyxcclxuICAgICAgICAgICAgbWluOiAyLFxyXG4gICAgICAgICAgICBtYXg6IDIsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIHZhbHVlOiBoaWVyYXJjaHlMZXZlbHNbJ2gwJ10sXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWVyYXJjaHlMZXZlbChpZCwgdWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gYW5pbWF0aW9uIGlzIGFjdGl2ZSBkcmF3IHRoZSBuZXcgY2x1c3RlcmluZyBhbmQgZGVuZHJvZ3JhbVxyXG4gICAgICAgICAgICAgICAgLy8gZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBpbml0IHRoZSB0b29sdGlwIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgdG9vbHRpcERpdiA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tdG9vbHRpcCcpXHJcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMCArICdweCcpXHJcbiAgICAgICAgLnN0eWxlKCd0b3AnLCAwICsgJ3B4JylcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXQgdGhlIGhpZXJhcmNoeSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IG1heE51bWJlckhpZXJhcmNoaWVzICogMTAwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDYwO1xyXG5cclxuICAgIHN2Z0xlZ2VuZCA9IGQzLnNlbGVjdCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2JylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdoaWVyYXJjaHktbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KTtcclxuXHJcbiAgICAvLyBhZGQgcGF0dGVybiBmb3Igc3RyaXBlZCBiYWNrZ3JvdW5kIG9mIGludGVyc2VjdGlvbnMgZXRjLlxyXG4gICAgc3BhdGlhbFZpZXcuYXBwZW5kKCdkZWZzJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6cGF0dGVybicpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3N0cmlwZWQnKVxyXG4gICAgICAgIC5hdHRyKCdwYXR0ZXJuVW5pdHMnLCAndXNlclNwYWNlT25Vc2UnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsICcyMCcpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsICc1JylcclxuICAgICAgICAuYXR0cigncGF0dGVyblRyYW5zZm9ybScsICdyb3RhdGUoNjApJylcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCA1KVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCAxMClcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLDApJylcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnIzY3MDAwZCcpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXcgdGhlIGRlbmRncm9ncmFtIGZvciBvbmUgc3RlcFxyXG4gKiBGdXJ0aGVyIGNhbGxzIHRoZSBkcmF3SGllcmFyY2h5IGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0RlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBnZXQgdGhlIGFjdGl2ZSBkZW5kcm9ncmFtXHJcbiAgICBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAvLyBpZiBkYXRhIGlzIGF2YWlhYmxlIGRyYXcgaGllcmFyY2h5IGNsdXN0ZXJzIGFuZCBhIGJ1dHRvbiBpcyBhY3RpdmUgc2VsY3RlZFxyXG4gICAgaWYgKCEkLmlzRW1wdHlPYmplY3QobmV0d29ya0hpZXJhcmNoeSkgJiYgaWQpIHtcclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgYW5kIHRyYW5zZm9ybSBpdFxyXG4gICAgICAgIGxldCB0cmVlRGF0YSA9IG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgaWRdW2luZGV4VGltZV07XHJcbiAgICAgICAgbGV0IG5vZGVzID0gZDMuaGllcmFyY2h5KHRyZWVEYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHNraXAgdGhlIHJvb3Qgbm9kZVxyXG4gICAgICAgIG5vZGVzID0gbm9kZXMuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgLy8gY29sbGFwc2UgdGhlIHRyZWVcclxuICAgICAgICBub2Rlcy5jaGlsZHJlbi5mb3JFYWNoKGNvbGxhcHNlKTtcclxuXHJcbiAgICAgICAgLy8gbWFwcyB0aGUgbm9kZSBkYXRhIHRvIHRoZSB0cmVlIGxheW91dFxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgaWYgbm8gbmV0d29yayBpcyBjaG9vc2VuXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV3IHNsaWRlciBtYXhcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJylcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ29wdGlvbicsICdtYXgnLCAobm9kZXNbJ2hlaWdodCddIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAuc2xpZGVyKCd2YWx1ZScsIGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gbGlua3MgKGVkZ2VzKVxyXG4gICAgICAgICAgICBsZXQgbGluayA9IHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC5saW5rJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKG5vZGVzLmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVJcclxuICAgICAgICAgICAgbGlua1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBkaWFnb25hbExpbmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyYW5zaXRpb24gbGlua3MgdG8gdGhlaXIgbmV3IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gRVhJVFxyXG4gICAgICAgICAgICBsaW5rLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gbm9kZXNcclxuICAgICAgICAgICAgLy8gYWRkcyBlYWNoIG5vZGUgYXMgYSBncm91cFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLm5vZGUnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGdyb3VwcyB0byB0aGUgZGVuZGdyb2dyYW1cclxuICAgICAgICAgICAgdmFyIG5vZGVFbnRlciA9IG5vZGUuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdub2RlJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkLmNoaWxkcmVuID8gJyBub2RlLS1pbnRlcm5hbCcgOiAnIG5vZGUtLWxlYWYnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVOVEVSIC0gYXBwZW5kIGZvciBlYWNoIGdyb3VwIGEgbm9kZSAoY2lyY2xlKVxyXG4gICAgICAgICAgICAvLyB3aXRoIGhpZ2hsaWdodGluZyBmb3IgdGhlIGFjdGl2ZSBjaG9vc2VuIGxldmVsXHJcbiAgICAgICAgICAgIG5vZGVFbnRlci5hcHBlbmQoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhY3RpdmUtbGV2ZWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGZpbmQgYSBuaWNlIGZ1bmN0aW9uIGZvciB0aGUgb24gY2xpY2sgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgY2xpY2spXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0b29sdGlwIHBvc2l0aW9uIGFuZCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcERpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZICsgNSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2LnNlbGVjdCgnLnRvb2x0aXAtc3BhbicpLmh0bWwoZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGhpZ2hsaWdodCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHVuZGlvbiBvZiB0aGUgcGF0aHMgbWFrZXMgdGhpcyBjb21wbGljYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEhpZ2hsaWdodFNwYXRpYWxWaWV3KGRbJ2RhdGEnXVsnbmFtZSddKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcERpdi50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGhpZ2hsaWdodCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0U3BhdGlhbFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0ZXh0IC0gIyBudW1iZXIgb2YgYW5pbWFscyBpbiB0aGUgY2x1c3RlclxyXG4gICAgICAgICAgICBub2RlRW50ZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZW5kcm9ncmFtLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAxNTApXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIC0xNTApXHJcbiAgICAgICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0tIHVwZGF0ZSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIG5vZGVFbnRlclxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhZSB0aGUgbm9kZSBhbmQgY2lyY2xlc1xyXG4gICAgICAgICAgICAvLyB3aXRoIGFjdGl2ZS1sZXZlbCBmdW5jdGlvbiB0byBoaWdobGlnaHQgd2hpY2ggbGV2ZWwgaXMgY2hvc2VuXHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDQwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyMCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhY3RpdmUtbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKCdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0ZXh0IG9mIG51bWJlciBvZiBlbnRpdGllc1xyXG4gICAgICAgICAgICBub2RlLnNlbGVjdCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRVhJVFxyXG4gICAgICAgICAgICBub2RlLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29sb3IgdGhlIGRlbmRyb2dyYW0gbm9kZXMgdXNpbmcgdGhlIHN0YW5kYXJkRGV2aWF0aW9uIGluIHRoZSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhoaWVyYXJjaHlHcm91cFN0ZGV2KS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGxlZ2VuZCBmb3IgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoaWVyYXJjaHlHcm91cFN0ZGV2KTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gbGVnZW5kIGhlcmVcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdKVU1QUyBIRVJFJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuY3NzKCdkaXNwbGF5JykgPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSU1QT1JUQU5UIC0gYXN5bmMgcHJvYmxlbXNcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gc29sdmUgdGhpcyAtIHZlcnkgc2xvd1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGllcmFyY2h5R3JvdXBTdGRldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3IgdGhlIG5vZGVzIGJ5IGNhbGN1bGF0aW5nIHRoZSBzdGFuZGFyZERldmlhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggY2x1c3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBhY3RpdmUgaXMgc2hvdyBpbiBjbHVzdGVyIGlzIGNob29zZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hlbGxvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RhbmRhcmREZXZpYXRpb24oaGllcmFyY2h5R3JvdXBTdGRldlsoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlKHN0YW5kYXJkRGV2aWF0aW9uKGhpZXJhcmNoeUdyb3VwU3RkZXZbKCdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKSldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRbJ2RlcHRoJ10gIT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5jc3MoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSkge1xyXG4gICAgICAgIC8vIGRyYXcgdGhlIGhpZXJhcmNoeSBpbiBzcGF0aWFsIHZpZXdcclxuICAgICAgICBkcmF3SGllcmFyY2h5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2xsYXBzZSBmdW5jdGlvbiAtIG9ubHkgc2hvdyB0aGUgYWN0aXZlIGxldmVsIGFuZCBvbmUgc3ViIGxldmVsXHJcbiAqL1xyXG5mdW5jdGlvbiBjb2xsYXBzZShkKSB7XHJcbiAgICBpZiAoZC5jaGlsZHJlbiAmJiBkLmRlcHRoIDw9IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICBkLl9jaGlsZHJlbiA9IGQuY2hpbGRyZW47XHJcbiAgICAgICAgZC5fY2hpbGRyZW4uZm9yRWFjaChjb2xsYXBzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgYWxsIGhpZXJhcmNoaWVzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogYWRkIGEgZ3JvdXAgd2l0aCB0aGUgaWRzIG9mIHRoZSBhbmltYWxzIGluIGl0IHRvIHRoZSB2aWV3XHJcbiAqIHdpdGggcGF0aCBjaGlsZCBlbGVtZW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZHJhd0hpZXJhcmNoeSgpIHtcclxuICAgIC8vIGlkIG9mIHRoZSBoaWVyYXJjaHkgZS5nLiBbMSw1LDNdXHJcbiAgICBsZXQgaGllcmFyY2h5SWRzID0gT2JqZWN0LmtleXMobmV0d29ya0hpZXJhcmNoeSkubWFwKGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICByZXR1cm4geC5yZXBsYWNlKCdoJywgJycpO1xyXG4gICAgfSk7XHJcbiAgICAvLyAgVGhlIGNsdXN0ZXJpbmcgaW4gYW4gMkQgYXJyYXkgd2l0aCB3aGljaCBhbmltYWwgaWQgYmVsb25ncyB0byB3aGljaCBncm91cFxyXG4gICAgbGV0IGhpZXJhcmNoeVZlcnRpY2VzID0gW107XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaHkgZGF0YSB0byBnZXQgdGhlIGhpZXJhcmNoeSBhbmltYWwgaWRzIHBlciBjbHVzdGVyaW5nIGFuZCBncm91cGluZ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgdHJlZURhdGEgPSBuZXR3b3JrSGllcmFyY2h5WydoJyArIGhpZXJhcmNoeUlkc1tpXV1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBub2Rlc1snY2hpbGRyZW4nXVswXTtcclxuICAgICAgICBpZiAoc2hvd05ldHdvcmtIaWVyYXJjaHkgPT09IGhpZXJhcmNoeUlkc1tpXSkge1xyXG4gICAgICAgICAgICBuZXR3b3JrSGllcmFyY2h5SWRzID0gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIHRoZSB2ZXJ0aWNlcyBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzLnB1c2goZ2V0SGllcmFyY2h5VmVydGljZXMoZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIG1vcmUgdGhhbiAyIGhpZXJhcmNoaWVzIGFyZSBkcmF3blxyXG4gICAgaWYgKGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyB1bmlvbiB0aGUgbGlzdCBvZiBwb2x5Z29ucyB0byBvbmUgcG9seWdvblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGllcmFyY2h5SWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzW2ldID0gdW5pb25Qb2x5Z29ucyhoaWVyYXJjaHlWZXJ0aWNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0cmFuc2Zvcm0gYW5kIGNhbGN1bGF0ZSB0aGUgaW50ZXJzZWN0aW9uIHBvbHlnb25zIG9mIHRoZSBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ2ludGVyc2VjdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gdGVtcCBzb2x1dGlvbiBvZiB0d28gaW50ZXJzZWN0aW9uc1xyXG4gICAgICAgICAgICBsZXQgdG1wSW50ZXJzZWN0aW9uID0gaGllcmFyY2h5VmVydGljZXNbMF07XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2hpZXMgYW5kIGludGVyc2VjdCBhbGwgb2YgdGhlbVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IFBvbHlCb29sLmludGVyc2VjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogdG1wSW50ZXJzZWN0aW9uLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSB0bXBJbnRlcnNlY3Rpb25bJ3JlZ2lvbnMnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmVzdWx0XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzID0gW3RtcEludGVyc2VjdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSBhbmQgY2FsY3VsYXRlIHRoZSBzeW1tZXRyaWMgZGlmZmVyZW5jZSBwb2x5Z29ucyBvZiB0aGUgbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIGVsc2UgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ3N5bS1kaWZmZXJlbmNlJykge1xyXG4gICAgICAgICAgICAvLyB4b3IgPSBVbmlvbiBvZiBhbGwgaGllcmFyY2hpZXMgLSBpbnRlcnNlY3Rpb24gb2YgYWxsIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgICAgIC8vIHRlbXAgc29sdXRpb24gb2YgdHdvIGludGVyc2VjdGlvbnNcclxuICAgICAgICAgICAgbGV0IHRtcEludGVyc2VjdGlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSBQb2x5Qm9vbC5pbnRlcnNlY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IHRtcEludGVyc2VjdGlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gdG1wSW50ZXJzZWN0aW9uWydyZWdpb25zJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uIHJlc3VsdFxyXG4gICAgICAgICAgICBsZXQgaW50ZXJzZWN0aW9uSGllcmFyY2h5UG9seWdvbnMgPSB0bXBJbnRlcnNlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAvLyB1bmlvblxyXG4gICAgICAgICAgICBsZXQgdG1wVW5pb24gPSBoaWVyYXJjaHlWZXJ0aWNlc1swXTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaGllcyBhbmQgaW50ZXJzZWN0IGFsbCBvZiB0aGVtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgdG1wVW5pb24gPSBQb2x5Qm9vbC51bmlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogdG1wVW5pb24sIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogaGllcmFyY2h5VmVydGljZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAgICAgICAgIHRtcFVuaW9uID0gdG1wVW5pb25bJ3JlZ2lvbnMnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdW5pb25IaWVyYXJjaHlQb2x5Z29ucyA9IHRtcFVuaW9uO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICAgICAgICAgIGxldCB0bXBEaWZmZXJlbmNlID0gUG9seUJvb2wueG9yKHtcclxuICAgICAgICAgICAgICAgIHJlZ2lvbnM6IHVuaW9uSGllcmFyY2h5UG9seWdvbnMsIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uczogaW50ZXJzZWN0aW9uSGllcmFyY2h5UG9seWdvbnMsXHJcbiAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAgICAgdG1wRGlmZmVyZW5jZSA9IHRtcERpZmZlcmVuY2VbJ3JlZ2lvbnMnXTtcclxuICAgICAgICAgICAgLy8gcmVzdWx0XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzID0gW3RtcERpZmZlcmVuY2VdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEQVRBIEpvaW5cclxuICAgIGxldCBoaWVyYXJjaGllcyA9IHNwYXRpYWxWaWV3XHJcbiAgICAgICAgLnNlbGVjdEFsbCgnZy5oaWVyYXJjaHktZ3JvdXAnKVxyXG4gICAgICAgIC5kYXRhKGhpZXJhcmNoeVZlcnRpY2VzKTtcclxuXHJcbiAgICAvLyBFTlRFUiB0aGUgZ3JvdXBzIC0gYWRkcyBhIHNwZWNpZmljIGlkIGFuZCBjb2xvclxyXG4gICAgaGllcmFyY2hpZXNcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ2ludGVyc2VjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGludGVyc2VjdGlvbic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBzeW0tZGlmZmVyZW5jZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBoJyArIGhpZXJhcmNoeUlkc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeUlkc1tpXV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeUlkc1tpXV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICAubW92ZVRvQmFjaygpO1xyXG5cclxuICAgIC8vIFVQREFURSAtIHRoZSBjbGFzcyBuZWVkZWQgZm9yIGludGVyc2VjdGlvbiBhbmQgc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgIGhpZXJhcmNoaWVzLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGludGVyc2VjdGlvbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgc3ltLWRpZmZlcmVuY2UnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGgnICsgaGllcmFyY2h5SWRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVRcclxuICAgIGhpZXJhcmNoaWVzLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyBIaWVyYWNoeSBodWxscyBhZGRlZCB0byB0aGUgc3BhdGlhbCB2aWV3IC0gZ2V0IHRoZSBwb2ludHMgZm9yIGVhY2ggYW5pbWFsIGluIHRoZVxyXG4gICAgLy8gc3BhdGlhbCB2aWV3IHNvIHRoYXQgYSBjb252ZXggaHVsbCBjYW4gYmUgY2FsY3VsYXRlZFxyXG4gICAgbGV0IGhpZXJhcnlIdWxscyA9IGhpZXJhcmNoaWVzLnNlbGVjdEFsbCgncGF0aC5oaWVyYXJjaHktaHVsbC1wYXRoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVOVEVSIGFuZCBjYWxjdWxhdGUgdGhlIGNvbnZleCBodWxsXHJcbiAgICBoaWVyYXJ5SHVsbHNcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgIC8vIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuICdocCcgKyBkLmpvaW4oJycpLnJlcGxhY2UoLywvZywgJycpO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZXJhcmNoeS1odWxsLXBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZHJhd0xpbmUoZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnTScgKyBkLmpvaW4oJ0wnKSArICdaJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBVUERBVEUgdGhlIGNvbnZleCBodWxsXHJcbiAgICBoaWVyYXJ5SHVsbHNcclxuICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGRyYXdMaW5lKGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCdMJykgKyAnWic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAvLyByZXR1cm4gJ2hwJyArIGQuam9pbignJykucmVwbGFjZSgvLC9nLCAnJyk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vIEVYSVRcclxuICAgIGhpZXJhcnlIdWxscy5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVW5pb24gbXVsdGlwbGUgcG9seWdvbnMgdG9nZXRoZXIgLSBuZWVkZWQgb3IgZWxzZSB0aGVyZSB3aWxsIGJlIGhvbGVzIGluIHRoZSBpbnRlcnNlY3Rpb25zXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHBvbHlnb25zIC0gYXJyYXkgb2YgYXJyYXkgb2YgcG9pbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiB1bmlvblBvbHlnb25zKHBvbHlnb25zKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwb2x5Z29ucyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvbHlnb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcG9seWdvbnNbaV0gPSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbnM6IFtwb2x5Z29uc1tpXV0sXHJcbiAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIHVuaW9uIGEgbGlzdCBvZiBwb2x5Z29ucyB0b2dldGhlclxyXG4gICAgbGV0IHNlZ21lbnRzID0gUG9seUJvb2wuc2VnbWVudHMocG9seWdvbnNbMF0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2x5Z29ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzZWcyID0gUG9seUJvb2wuc2VnbWVudHMocG9seWdvbnNbaV0pO1xyXG4gICAgICAgIGxldCBjb21iID0gUG9seUJvb2wuY29tYmluZShzZWdtZW50cywgc2VnMik7XHJcbiAgICAgICAgc2VnbWVudHMgPSBQb2x5Qm9vbC5zZWxlY3RVbmlvbihjb21iKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQb2x5Qm9vbC5wb2x5Z29uKHNlZ21lbnRzKVsncmVnaW9ucyddO1xyXG59XHJcblxyXG4vKipcclxuICogRWRnZSBkcmF3aW5nIG1ldGhvZCBvZiB0aGUgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZCAtIFRyZWVtYXAgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gZGlhZ29uYWxMaW5lcyhkKSB7XHJcbiAgICByZXR1cm4gJ00nICsgZC54ICsgJywnICsgZC55ICtcclxuICAgICAgICAnVicgKyBkLnBhcmVudC55ICsgJ0gnICsgZC5wYXJlbnQueDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNsaWNrIGZ1bmN0aW9uIC0gaGlnaGxpZ2h0IHRoZSBlbGVtZW50cyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkIC0gVHJlZW1hcCBlbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGljayhkKSB7XHJcbiAgICBzZXRBY3RpdmVBbmltYWxzKGRbJ2RhdGEnXVsnbmFtZSddKTtcclxuICAgIC8vIGlmIG5vIGFuaW1hdGlvbiBpcyBhY3RpdmUgZHJhdyB0aGUgZHJhdyBvbmUgc3RlcFxyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICBkZWNJbmRleFRpbWUoKTtcclxuICAgICAgICBkcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHRoZSBjbHVzdGVyaW5nIG9mIGEgc3BlY2lmaWMgbGV2ZWwgaW4gdGhlIGRlbmRyb2dyYW0gdHJlZVxyXG4gKiBGb3IgaW5zdGFuY2UgYWxsIGNsdXN0ZXJzIGZyb20gbGV2ZWwgNVxyXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdCAtIFJvb3Qgb2YgdGhlIHRyZWVtYXBcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZWFyY2h5IC0gTnVtYmVyIG9mIGhpZXJhcmNoeSBmcm9tIFswLTNdXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHkpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGxldCBsZXZlbCA9IGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldO1xyXG5cclxuICAgIC8vIHNlY29uZCBsZXZlbCBvZiB0aGUgYXJyYXlcclxuICAgIGxldCB0bXBfbm9kZXMgPSByb290WydjaGlsZHJlbiddO1xyXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSB0cmVlXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvb3RbJ2hlaWdodCddOyBpKyspIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgYXQgdGhlIHNlYXJjaGVkIGxldmVsXHJcbiAgICAgICAgaWYgKHRtcF9ub2Rlc1swXSAmJiB0bXBfbm9kZXNbMF1bJ2RlcHRoJ10gPT09IGxldmVsKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCBlYWNoIGNsdXN0ZXIgdG8gdGhlIHJlc3VsdCBzZXRcclxuICAgICAgICAgICAgdG1wX25vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlWydkYXRhJ11bJ25hbWUnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlWydkYXRhJ11bJ25hbWUnXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiBvZiBhIHNwZWNpZmljIGxldmVsIGluIHRoZSB0cmVlXHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG4gICAgICAgIHRtcF9ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlWydjaGlsZHJlbiddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdG1wID0gdG1wLmNvbmNhdChub2RlWydjaGlsZHJlbiddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRtcF9ub2RlcyA9IHRtcDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHNwZWNpZmljIHZlcnRpY2VzIG9mIGEgY2x1c3RlcmluZyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiBwb2ludHMgW1t4LHldW3gseV0uLi5dXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGhpZXJhcmNoaWVzIC0gQXJyYXkgb2YgYXJyYXlzIHdpdGggZWFjaCBhcnJheSBjb250YWlucyBhbGwgdGhlIGlkcyBmb3IgYSBzcGVjaWZpYyBjbHVzdGVyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIaWVyYXJjaHlWZXJ0aWNlcyhoaWVyYXJjaGllcykge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdOyAvLyByZXN1bHQgc2V0XHJcbiAgICBoaWVyYXJjaGllcy5mb3JFYWNoKGZ1bmN0aW9uKGNsdXN0ZXIpIHtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBbXTsgLy8gdmVydGljZXMgb2YgdGhlIGNsdXN0ZXJzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNsdXN0ZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyb3VwTWVtYmVyID0gYXJyYXlBbmltYWxzLmZpbmQoZCA9PiBkWydhJ10gPT09IGNsdXN0ZXJbal0pO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXBNZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goW2dyb3VwTWVtYmVyWydwJ11bMF0sIC1ncm91cE1lbWJlclsncCddWzFdXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQW5kcmV3IG1vbnRvbmUgY2hhaW4gYWxnb3JpdGhtIHJldXRybnMgZm9yIHBvaW50cyBmZXdlciB0aGFuIDMgbnVsbFxyXG4gICAgICAgIGlmICh2ZXJ0aWNlcy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChkMy5wb2x5Z29uSHVsbCh2ZXJ0aWNlcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYWN0aXZlIGxldmVsIGZvciBhIHNwZWNpZmljIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeSBjYW4gYmUgZnJvbSBbMC0zXVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgLSBOZXcgYWN0aXZlIGxldmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGllcmFyY2h5TGV2ZWwoaGllcmFyY2h5LCBsZXZlbCkge1xyXG4gICAgLy8gVE9ETyBjYXRjaCBjYXNlcyA8IDAgYW5kIGJpZ2dlciB0aGFuIG92ZXJhbGwgaGVpZ2h0XHJcbiAgICBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XSA9IGxldmVsO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBlbnRyeSBmb3IgdGhlIGhpZXJhcmNoIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlMZXZlbChoaWVyYXJjaHkpIHtcclxuICAgIC8vIFRPRE8gY2F0Y2ggY2FzZXMgPCAwIGFuZCBiaWdnZXIgdGhhbiBvdmVyYWxsIGhlaWdodFxyXG4gICAgZGVsZXRlIGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBhY3RpdmUgY29sb3IgZm9yIGEgc3BlY2lmaWMgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5IGNhbiBiZSBmcm9tIFswLTNdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGllcmFyY2h5Q29sb3IoaGllcmFyY2h5KSB7XHJcbiAgICAvLyBjaGVjayBpZiB0aGUgaGllcmFyY2h5IGlzIGFscmVhZHkgc2hvd24gYXMgbmV0d29ya1xyXG4gICAgLy8gdGFrZSB0aGUgc2FtZSBjb2xvclxyXG4gICAgZm9yIChsZXQga2V5IGluIG5ldHdvcmtDb2xvcikge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICgnaCcgKyBoaWVyYXJjaHkpKSB7XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldID0gbmV0d29ya0NvbG9yW2tleV07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBoaWVyYXJjaHkgaXMgbm90IHZpc3VhbGl6ZWQgYWxyZWFkeSBhcyBhIG5ldHdvcmtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRtcF9ib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGllcmFyY2h5Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9yc1trZXldID09PSBjb2xvcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0bXBfYm9vbGVhbikge1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBhIG5ldHdvcmsgaXMgZGVwaWN0ZWRcclxuICAgICAgICAgICAgLy8gaWYgc28gc2tpcCB0aGUgY29sb3Igd2hpY2ggaXMgYWxyZWFkeSBjaG9vc2VuIGZvciB0aGUgbmV0d29ya1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV0d29ya0NvbG9yKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBuZXR3b3JrQ29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV0d29ya0NvbG9yW2tleV0gIT09IGNvbG9yc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IGNvbG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldID0gY29sb3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgY29sb3IgZm9yIHRoZSBoaWVyYXJjaCBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGllcmFyY2h5Q29sb3IoaGllcmFyY2h5KSB7XHJcbiAgICBkZWxldGUgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGhpZXJhcmNoeSBidXR0b24gdG8gdGhlIGRpdlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgLSBIaWVyYXJjaHkgb2YgdGhlIGlkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmV3IGFjdGl2ZSBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhpZXJhcmNoeUJ1dHRvbihpZCwgbmFtZSkge1xyXG4gICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPCBtYXhOdW1iZXJIaWVyYXJjaGllcykge1xyXG4gICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuYXBwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInNob3ctZGVuZHJvZ3JhbS0nICsgaWQgKyAnXCIgZGF0YT0nICsgaWQgKyAnIG5hbWU9JyArIG5hbWUgK1xyXG4gICAgICAgICAgICAnIGNsYXNzPVwic2hvdy1kZW5kcm9ncmFtIGJ0biBidG4tYmxvY2tcIiBkYXRhLXRvZ2dsZT1cImJ1dHRvblwiIGFyaWEtcHJlc3NlZD1cImZhbHNlXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+JyArXHJcbiAgICAgICAgICAgICcgPHNwYW4gY2xhc3M9XCJidG4tbGFiZWxcIiBpZD1cImJ0bi1sZWZ0XCI+IDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcIj48L2k+Jm5ic3AmbmJzcCBTaG93ICcgKyBuYW1lICsgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYnRuLWxhYmVsIGhpZGRlblwiIGlkPVwiYnRuLXJpZ2h0XCI+IDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCI+PC9pPiZuYnNwJm5ic3AgSGlkZSAnICsgbmFtZSArICcgPC9zcGFuPjwvYnV0dG9uPiA8YnI+J1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBzcGVjaWZpYyBoaWVyYXJjaHkgYnV0dG9uIHRvIHRoZSBkaXZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gSGllcmFyY2h5IG9mIHRoZSBpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbihpZCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBmb2xsb3dpbmcgbGluZSBicmVhayBhbmQgZWxlbWVudFxyXG4gICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLm5leHQoKS5yZW1vdmUoKTtcclxuICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBzbGlkZXIgYW5kIHRleHQgaW4gdGhlIGRlbmRyb2dyYW0gcGFuZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEZW5kcm9ncmFtKCkge1xyXG4gICAgLy8gZ2V0IHRoZSBpbXBvcnRhbnQgaW5mb1xyXG4gICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgIGxldCBuYW1lID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ25hbWUnKTtcclxuICAgIC8vIHNldCB0aGUgbmFtZSBvZiB0aGUgZGlzcGxheWVkIGhpZXJhcmNoeVxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbmFtZScpLnRleHQobmFtZSk7XHJcblxyXG4gICAgLy8gc2V0IHNsaWRlciBhbmQgIHRleHQgdmFsdWVcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXNsaWRlcicpLnZhbChoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKTtcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXRleHQnKS50ZXh0KGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBoaWVyYXJjaHkgbGVnZW5kXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlSGllcmFyY2h5TGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoV2lkdGggPSA1MDtcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hIZWlnaHQgPSAyMDtcclxuXHJcbiAgICAvLyBTaG93IG9yIGhpZGUgdGhlIHN2ZyBlbGVtZW50XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoaGllcmFyY2h5Q29sb3JzKS5sZW5ndGggIT09IDAgfHwgT2JqZWN0LmtleXMobmV0d29ya0NvbG9yKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAkKCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKS5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNoaWVyYXJjaHktbGVnZW5kLWRpdicpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGVnZW5kRGF0YSA9IFtdO1xyXG4gICAgbGV0IGxlZ2VuZFRleHREYXRhID0gW107XHJcbiAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGFcclxuICAgICQoJy5zaG93LWRlbmRyb2dyYW0nKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGEgaXMgbm90IHVuZGVmaW5lZFxyXG4gICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnNbJ2gnICsgJChvYmopLmF0dHIoJ2RhdGEnKV0gIT0gbnVsbCAmJiAkKG9iaikuYXR0cignbmFtZScpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGVnZW5kRGF0YS5wdXNoKGhpZXJhcmNoeUNvbG9yc1snaCcgKyAkKG9iaikuYXR0cignZGF0YScpXSk7XHJcbiAgICAgICAgICAgIGxlZ2VuZFRleHREYXRhLnB1c2goJChvYmopLmF0dHIoJ25hbWUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBhZGQgdGhlIG5ldHdvcmsgY29sb3JcclxuICAgIGlmIChPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXR3b3JrQ29sb3IpIHtcclxuICAgICAgICAgICAgaWYgKGxlZ2VuZERhdGEuaW5kZXhPZihuZXR3b3JrQ29sb3Jba2V5XSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmREYXRhLnB1c2gobmV0d29ya0NvbG9yW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kVGV4dERhdGEucHVzaCgnTmV0d29yaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gREFUQSBKT0lOXHJcbiAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kRGF0YSk7XHJcbiAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kVGV4dERhdGEpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBMZWdlbmQgc3dhdGNoZXMgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRTd2F0Y2hXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIDIuNSAqIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuICAgIC8vIEVYSVQgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIFRleHQgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMiAqIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIDIuNSAqIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBkZW5kcm9ncmFtIGxlZ2VuZFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdERlbmRyb2dyYW1MZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSA1NTA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgbGV0IGRlbmRyb2dyYW1MZWdlbmQgPSBkMy5zZWxlY3QoJyNkZW5kcm9ncmFtLXBhbmVsJylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZW5kcm9ncmFtLWxlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodCk7XHJcblxyXG4gICAgJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgbGV0IGxlZ2VuZERhdGEgPSBzdGFuZGFyZERldmlhdGlvbkNvbG9yU2NhbGUucmFuZ2UoKTtcclxuICAgIC8vVE9ETyBjaGFuZ2UgdGhpcyB0byBiZXR0ZXIgc29sdXRpb25cclxuICAgIGxldCBsZWdlbmRUZXh0RGF0YSA9IFsnbG93JywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICdoaWdoJ107XHJcblxyXG4gICAgbGVnZW5kID0gZGVuZHJvZ3JhbUxlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShsZWdlbmREYXRhKTtcclxuICAgIGxlZ2VuZFRleHQgPSBkZW5kcm9ncmFtTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kVGV4dERhdGEpO1xyXG5cclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFN3YXRjaFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gVGV4dCAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gRU5URVIgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC10ZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzZXQgb3BlcmF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRpb24gLSBlLmcuIFwidW5pb25cIiBcImludGVyc2VjdGlvblwiIFwic3ltLWRpZmZlcmVuY2VcIlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNldE9wZXJhdGlvbih2YWx1ZSkge1xyXG4gICAgc2V0T3BlcmF0aW9uID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGhpZXJhcmNoeSBncm91cCBzdGFuZGFyZCBkZXZpYXRpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIHVuaXF1ZSBoYXNoIGlkIGZvciB0aGUgZ3JvdXBcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdW5pcXVlIGhhc2ggaWQgZm9yIHRoZSBncm91cFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGtleSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KSB7XHJcbiAgICAgICAgaGllcmFyY2h5R3JvdXBTdGRldltrZXldLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBoaWVyYXJjaHlHcm91cFN0ZGV2W2tleV0gPSBbdmFsdWVdO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVzZXQgaGllcmFyY2h5IGdyb3VwIHN0YW5kYXJkIGRldmlhdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0aGllcmFyY2h5R3JvdXBTdGRldigpIHtcclxuICAgIGhpZXJhcmNoeUdyb3VwU3RkZXYgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZ2hsaWdodCBhIHN1YnNldCBvZiBhbmltYWxzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogQHBhcmFtIHthcnJheX0gYW5pbWFscyAtIGFycmF5IG9mIGFuaW1hbCBpZHMgd2hpY2ggaGF2ZSB0byBiZSBoaWdobGlnaHRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhpZ2hsaWdodFNwYXRpYWxWaWV3KGFuaW1hbHMpIHtcclxuICAgIC8vIHBvaW50cyB0byBjYWxjdWxhdGUgdGhlIGNvbnZleCBodWxsIG9mIHRoZSBoaWdobGlnaHQgY2x1c3RlclxyXG4gICAgbGV0IHZlcnRpY2VzID0gW107XHJcbiAgICAvLyBpdGVyYXRlIHRocm91Z2ggdGhlIG9iamVjdHMgaW4gdGhlIGNsdXN0ZXJcclxuICAgIC8vIGdldCB0aGUgcG9pbnRzIGFuZCBoaWdobGlnaHQgdGhlIGFuaW1hbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0bXBBbmltYWwgPSBzcGF0aWFsVmlldy5zZWxlY3QoJyNhbmltYWwtJyArIGFuaW1hbHNbaV0pO1xyXG4gICAgICAgIGxldCBwb2ludCA9IHRtcEFuaW1hbC5kYXRhKClbMF1bJ3AnXTtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKFtwb2ludFswXSwgLXBvaW50WzFdXSk7XHJcblxyXG4gICAgICAgIHRtcEFuaW1hbC5jbGFzc2VkKCdhbmltYWwtaGlnaGxpZ2h0JywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBhZGQgYSBwb2x5Z29uIGh1bGwgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgc3BhdGlhbFZpZXcuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlnaGxpZ2h0LWhpZXJhcmNoeScpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCAoJ00nICsgZDMucG9seWdvbkh1bGwodmVydGljZXMpLmpvaW4oJ0wnKSArICdaJykpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodFNwYXRpYWxWaWV3KCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjb2xvcmluZyBhbmQgdGhlIGhpZXJhcmNoeSBoaWdobGlnaHQgaHVsbFxyXG4gICAgZDMuc2VsZWN0QWxsKCcuYW5pbWFsJykuY2xhc3NlZCgnYW5pbWFsLWhpZ2hsaWdodCcsIGZhbHNlKTtcclxuICAgIGQzLnNlbGVjdEFsbCgnLmhpZ2hsaWdodC1oaWVyYXJjaHknKS5yZW1vdmUoKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oaWVyYXJjaHkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxudmFyIHNvdXJjZTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRUb0RhdGFzZXQsXHJcbiAgICBzZXREYXRhU2V0UGVyY2VudGlsZSxcclxuICAgIHNldFN3YXJtRGF0YSxcclxuICAgIHNldE1ldGFEYXRhLFxyXG4gICAgc2V0RGF0YXNldEZlYXR1cmUsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldEhpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE5ldHdvcmtCdXR0b25zLFxyXG4gICAgc2V0TmV0d29ya0lEXHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBlbmFibGVQbGF5QnV0dG9uLFxyXG4gICAgZGlzYWJsZVBsYXlCdXR0b24sXHJcbiAgICBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzcGF0aWFsVmlld0luaXRcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHJlc3BvbnNlUGFyYW1ldGVyc1xyXG59IGZyb20gJy4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0cmVhbSB0aGUgbW92ZW1lbnQgZGF0YSBmcm9tIHRoZSBBUElcclxuICogTG9hZHMgb25seSB0aGUgZXhwbGljaXQgbW92ZW1lbnQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbU1vdmVtZW50RGF0YSgpIHtcclxuICAgIGlmICh3aW5kb3cuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9hcGkvbW92ZW1lbnRfb25seS8nICsgcGFyYW1ldGVyc1snaWQnXSk7XHJcbiAgICAgICAgc291cmNlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gJ2Nsb3NlJykge1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgYWpheCBxdWVyaWVzIGFyZSBjb21wZWx0ZSBpbml0aWFsaXplXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tQZW5kaW5nUmVxdWVzdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuYWN0aXZlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3SW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkVG9EYXRhc2V0KEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnJlYWR5U3RhdGUgPT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdXZWJicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RyZWFtaW5nJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnRpbGUgZGF0YSBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJjZW50aWxlKCkge1xyXG4gICAgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcGVyY2VudGlsZS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRhU2V0UGVyY2VudGlsZSBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vIFttaW4sIHBlcmNlbnRpbGVfMSwuLi4scGVyY2VudGlsZV85LG1heF1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtkYXRhW2ldWydmZWF0dXJlJ11dID0gW2RhdGFbaV1bJ21pbiddLCBkYXRhW2ldWydwMSddLCBkYXRhW2ldWydwMiddLCBkYXRhW2ldWydwMyddLCBkYXRhW2ldWydwNSddLCBkYXRhW2ldWydwNyddLCBkYXRhW2ldWydwOCddLCBkYXRhW2ldWydwOSddLCBkYXRhW2ldWydtYXgnXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RGF0YVNldFBlcmNlbnRpbGUoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgICAgICBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zKGRhdGFTZXRQZXJjZW50aWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydCBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybUZlYXR1cmVzKCkge1xyXG4gICAgY29uc3Qgc3dhcm1fZmVhdHVyZXMgPSBbJ3N3YXJtX3RpbWUnLCAnc3dhcm1fc3BlZWQnLCAnc3dhcm1fYWNjZWxlcmF0aW9uJywgJ3N3YXJtX2NvbnZleF9odWxsX2FyZWEnLFxyXG4gICAgICAgICdzd2FybV9kaXN0YW5jZV9jZW50cm9pZCcsICdzd2FybV9kaXJlY3Rpb24nLCAnc3dhcm1fcG9sYXJpc2F0aW9uJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvLyBnZXQgYWxsIHRoZSBvdGhlciBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBzd2FybV9mZWF0dXJlc1tpXSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlID0gc3dhcm1fZmVhdHVyZXNbaV0ucmVwbGFjZSgnc3dhcm1fJywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBtZWFkYXRhIGluZm9ybWF0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0YURhdGEoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvbWV0YWRhdGEvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgc2V0TWV0YURhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5ldHdvcmsgZGF0YXNldHMgZm9yIHRoZSBidXR0b25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGFCdXR0b24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3Jrcy8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBhZGROZXR3b3JrQnV0dG9ucyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3BlY2lmYyBmZWF0dXJlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmZWF0dXJlIC0gZm9yIGluc3RhbmNlIHNwZWVkLCBhY2NlbGVyYXRpb24gZXRjLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFzZXRGZWF0dXJlKGZlYXR1cmUpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgZmVhdHVyZSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgc2V0RGF0YXNldEZlYXR1cmUoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3BlY2lmYyBzd2FybSBmZWF0dXJlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmZWF0dXJlIC0gZm9yIGluc3RhbmNlIGNlbnRyb2lkLCBtZWRvaWQgZXRjLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoZmVhdHVyZSkge1xyXG4gICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgZmVhdHVyZSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBmb3IgdGhlIHNwZWNpZmljIG5ldHdvcmtfaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ldHdvcmtfaWQgLSB1bmlxdWUgbmV0d29yayBpZCBvZiBhIGRhdGFzZXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29yay8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIG5ldHdvcmtfaWQsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXROZXR3b3JrRGF0YShKU09OLnBhcnNlKGRhdGFbMF1bJ2RhdGEnXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIG5lZWRlZCBmb3Igc3RhbmRhcmQgRGV2aWF0aW9uIGluIGRlbmRyb2dyYW1cclxuICAgIHNldE5ldHdvcmtJRChuZXR3b3JrX2lkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBoaWVyYXJjaHkgZm9yIHRoZSBzcGVjaWZpYyBuZXR3b3JrX2lkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXR3b3JrX2lkIC0gdW5pcXVlIG5ldHdvcmsgaWQgb2YgYSBkYXRhc2V0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKG5ldHdvcmtfaWQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmsvaGllcmFyY2h5LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSksIG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVmlzdWFsIHBhcmFtZXRlciBzdWdnZXN0aW9uIGFqYXggcXVlcnlcclxuICogQHBhcmFtIHtBcnJheX0gdHJhY2tlZERhdGEgLSB0cmFja2VkIGRhdGEgd2l0aCAuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VnZ2VzdGVkUGFyYW1ldGVycyh0cmFja2VkRGF0YSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvdmlzdWFsX3BhcmFtZXRlci8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogdHJhY2tlZERhdGFcclxuICAgIH0pO1xyXG5cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9hamF4X3F1ZXJpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIFNldCovXHJcblxyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvblxyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYnJ1c2hlbmQsXHJcbiAgICBzbGlkZXJcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY2hhbmdlTGVnZW5kLFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbWV0YWRhdGFDb2xvcixcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhLFxyXG4gICAgY29sb3JNZXRhZGF0YVxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXROZXR3b3JrQXV0byxcclxuICAgIHNldE5ldHdvckxpbWl0LFxyXG4gICAgc2V0TmV0d29ya0hpZXJhcmNoeSxcclxuICAgIHNldG5ldHdvcmtDb2xvcixcclxuICAgIHNldE5ldHdvcmtJRCxcclxuICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kLFxyXG4gICAgc2V0TmV0d29ya0JhY2tncm91bmRMaW1pdFxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldCxcclxuICAgIHN3YXJtRGF0YSxcclxuICAgIGRhdGFzZXRNZXRhZGF0YSxcclxuICAgIHNldE5ldHdvcmtEYXRhLFxyXG4gICAgc2V0SGllcmFyY2h5RGF0YVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZ2V0RGF0YXNldEZlYXR1cmUsXHJcbiAgICBnZXROZXR3b3JrRGF0YSxcclxuICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUsXHJcbiAgICBnZXROZXR3b3JrSGllcmFyY2h5RGF0YVxyXG59IGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjb2xvclNjYWxlXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRIaWVyYXJjaHlCdXR0b24sXHJcbiAgICByZW1vdmVIaWVyYXJjaHlCdXR0b24sXHJcbiAgICBkcmF3RGVuZHJvZ3JhbSxcclxuICAgIG1heE51bWJlckhpZXJhcmNoaWVzLFxyXG4gICAgc2V0U2V0T3BlcmF0aW9uXHJcbn0gZnJvbSAnLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFRyYWNraW5nQm9vbGVhbixcclxuICAgIHJlc2V0VHJhY2tlZERhdGEsXHJcbiAgICBzZW5kVHJhY2tlZERhdGFcclxufSBmcm9tICcuL3Zpc3VhbF9wYXJhbWV0ZXIuanMnO1xyXG5cclxubGV0IGJydXNoOyAvLyBicnVzaGluZyB2YXJpYWJsZVxyXG5leHBvcnQgbGV0IHBsYXlCb29sZWFuID0gdHJ1ZTsgLy8gcGF1c2UgYW5kIHBsYXkgYm9vbGVhblxyXG5cclxuLyoqXHJcbiAqIEluaXQgYWxsIHRoZSBsaXN0ZW5lcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xyXG4gICAgY3BfbGlzdGVuZXIoKTtcclxuICAgIHNmX2xpc3RlbmVycygpO1xyXG4gICAgYWZfbGlzdGVuZXJzKCk7XHJcbiAgICBtZF9saXN0ZW5lcnMoKTtcclxuICAgIG5fbGlzdGVuZXJzKCk7XHJcbiAgICBoX2xpc3RlbmVycygpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBjb250cm9sIHBhbmVsIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gY3BfbGlzdGVuZXIoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IG9yIHN0b3AgdGhlIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBTUFYuc2V0SW5kZXhUaW1lKHNsaWRlci5zbGlkZXIoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhdXNlIHRoZSBhbmltYXRpb24gYW5kIHNob3cgb25seSB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV4dC1mcmFtZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcnVzaGluZyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKCEkKCcjYnJ1c2hpbmctYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZGVmaW5lIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBicnVzaCA9IGQzLmJydXNoKClcclxuICAgICAgICAgICAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbU1BWLnRhbmtXaWR0aCwgU1BWLnRhbmtIZWlnaHRdXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdlbmQnLCBicnVzaGVuZCk7XHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoYnJ1c2gpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbnNlbGVjdCBhbGwgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKFtdKTtcclxuICAgICAgICAgICAgLy8gdHJhY2tpbmcgb2YgZGF0YSBmb3IgdmlzdWFsIHBhcmFtZXRlciBzdWdnZXN0aW9uXHJcbiAgICAgICAgICAgIHJlc2V0VHJhY2tlZERhdGEoKTtcclxuICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFjayB2aXN1YWwgcGFyYW1ldGVyIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHNldFRyYWNraW5nQm9vbGVhbihmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCB0aGUgdHJhY2tlZCB2aWEgYSBhamF4IHF1ZXJ5IHRvIHRoZSBzZXJ2ZXIgdG8gY2FsY3VsYXRlIHRoZSBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHNldFRyYWNraW5nQm9vbGVhbihmYWxzZSk7XHJcbiAgICAgICAgICAgIHNlbmRUcmFja2VkRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGlzYWJsZSBib3RoIGJ1dHRvbnMgYW5kIHJlbW92ZSB0aGUgYWN0aXZlIG9uZVxyXG4gICAgICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwYXRpYWwgdmlldyBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICAgKi9cclxuICAgICQoJyNiYWNrZ3JvdW5kLWNvbG9yJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjb2xvciA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1iYWNrZ3JvdW5kOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAkKCcjbWFpbi12aXMtc3ZnJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBzcGF0aWFsIHZpZXcgYXhpcyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctYXhpcycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIGZyYW1lICh0aW1lKSBudW1iZXIgaW4gdGhlIHNwYXRpYWwgdmlldyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdGltZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWUtdGV4dCcpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lLXRleHQnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRoZSBuZXR3b3JrIGJhY2tncm91bmQgY29sb3JcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYmFja2dyb3VuZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbmV0d29yayBiYWNrZ3JvdW5kIGVkZ2UgbGltaXRcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYmFja2dyb3VuZC1saW1pdCcpLnZhbCgxKTtcclxuICAgICQoJyNuZXR3b3JrLWJhY2tncm91bmQtbGltaXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbCkgJiYgdmFsID4gMCkge1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrQmFja2dyb3VuZExpbWl0KHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvciBTY2FsZSBGdW5jdGlvbiBSYWRpbyBidXR0b25zXHJcbiAgICAgKi9cclxuICAgICQoJyNjb2xvci1zY2FsZS1yYWRpby1mb3JtIGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yU2NhbGVbJ3R5cGUnXSA9ICQoJ2lucHV0W25hbWU9Y29sb3Itc2NhbGUtcmFkaW9dOmNoZWNrZWQnLCAnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0nKS52YWwoKTtcclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgc3dhcm0gZmVhdHVyZXMgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBzZl9saXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpcmVjdGlvbiBhcnJvdyBvZiB0aGUgYW5pbWFsXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWRpcmVjdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnZGlyZWN0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IGRpcmVjdGlvbiBkYXRhXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlyZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5hcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBtZWRvaWQgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LW1lZG9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1tZWRvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoJ21lZG9pZCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnbWVkb2lkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNQVi5zZXRNZWRvaWRBbmltYWwoc3dhcm1EYXRhW1NQVi5pbmRleFRpbWVdWydtZWRvaWQnXSk7XHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIG1lZG9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIFNQVi5tZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGRpc3BsYXkgdGhlIG1lZG9pZCBmaXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgU1BWLm1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRNZWRvaWRBbmltYWwoLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBjZW50cm9pZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctY2VudHJvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ2NlbnRyb2lkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGhpZGUgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnY2lyY2xlLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY29udmV4IGh1bGwgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNvbnZleC1odWxsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2h1bGwnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ2NvbnZleF9odWxsJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0cmlhbmd1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd0cmlhbmd1bGF0aW9uJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCd0cmlhbmd1bGF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdm9yb25vaVxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy12b3Jvbm9pJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndm9yb25vaScgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgndm9yb25vaScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBhYnNvbHV0ZSBmZWF0dXJlIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gYWZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBTcGVlZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctc3BlZWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctc3BlZWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgc3BlZWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdzcGVlZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ3NwZWVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnc3BlZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhY2NlbGVyYXRpb24gYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgYWNjZWxlcmF0aW9uIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnYWNjZWxlcmF0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2FjY2VsZXJhdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2FjY2VsZXJhdGlvbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBkaXN0YW5jZSB0byBjZW50cm9pZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgZGlzdGFuY2VfY2VudHJvaWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdkaXN0YW5jZV9jZW50cm9pZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2Rpc3RhbmNlX2NlbnRyb2lkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQtZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBtaWRsaW5lIG9mZnNldFxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkcmF3LW1pZGxpbmVfb2Zmc2V0IGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnZHJhdy1taWRsaW5lX29mZnNldCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBtaWRsaW5lX29mZnNldFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ21pZGxpbmVfb2Zmc2V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQtZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnbWlkbGluZV9vZmZzZXQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgbmV0d29yayBsaXN0ZWVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBuX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBidXR0b25zIGNsaWNrZWQgLSBnZXQgdGhlIGRhdGFcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHkgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ldHdvcmtfaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEnKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBuYW1lIG9mIHRoZSBjaG9vc2VuIG5ldHdvcmsgdG8gdGhlIE5ldHdvcmsgbW9kYWxcclxuICAgICAgICAkKCcjYWN0aXZlLW5ldHdvcmstbmFtZScpLnRleHQoJCh0aGlzKS5hdHRyKCduYW1lJykpO1xyXG5cclxuICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIGdldE5ldHdvcmtEYXRhKG5ldHdvcmtfaWQpO1xyXG4gICAgICAgIC8vIHNldCB0aGUgY29sb3Igb2YgdGhlIG5ldHdvcmtcclxuICAgICAgICBzZXRuZXR3b3JrQ29sb3IobmV0d29ya19pZCk7XHJcbiAgICAgICAgJCgnI25ldHdvcmstZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXROZXR3b3JrRGF0YSh7fSk7XHJcbiAgICAgICAgc2V0TmV0d29ya0lEKC0xKTtcclxuICAgICAgICAvLyByZW1vdmUgdGhlIG5ldHdvcmsgY29sb3JcclxuICAgICAgICBzZXRuZXR3b3JrQ29sb3IoLTEpO1xyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYXV0byBidXR0b24gc2V0IGFjaXZlIG9yIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGxpbWl0ID0gJCgnI25ldHdvcmstc2xpZGVyJykuc2xpZGVyKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JMaW1pdChsaW1pdCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG1ldGFkYXRhIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbWRfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBzd2F0Y2ggZnVuY3Rpb25zIGNvbG9yaW5nIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gICAgICovXHJcbiAgICAkKCcubWV0YWRhdGEtc3dhdGNoLm1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IGNvbG9yUkdCID0gJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBzd2F0Y2ggcHJldmlld1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1yb3ctJyArIGlkICsgJyAjcHJldmlldycpXHJcbiAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvclJHQik7XHJcbiAgICAgICAgLy8gaWYgd2hpdGUgdGhhbiByZXNldCB0aGUgY29sb3JcclxuICAgICAgICBpZiAoY29sb3JSR0IgPT09ICdyZ2IoMjU1LCAyNTUsIDI1NSknKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YUNvbG9yW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhQ29sb3JbaWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltpZF0gPSBjb2xvclJHQjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGZ1bmN0aW9ucyBmb3IgaW5zdGFuY2UgY29sb3Igc2V4XHJcbiAgICAgKi9cclxuICAgICQoJyNncm91cC1tZXRhZGF0YSA6aW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIG1ldGFkYXQgYWNvbG9yaW5nXHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gbWV0YWRhdGEgc2V4IGlzIGNob29zZW4gLSBjb2xvcmluZyBiYXNlZCBvbiBtIGFuZCBmXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnc2V4Jykge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBhbmQgY29sb3IgaGVyZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXQgb2YgaW5kaXZpZHVhbCBzdHJpbmdzIGluIHNleFxyXG4gICAgICAgICAgICB0bXAgPSBBcnJheS5mcm9tKG5ldyBTZXQodG1wKSk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSA9PT0gdG1wW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgY29sb3JpbmcgdG8gdGhlIG1ldGFkYXRhY29sb3Igb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIC8vIHNldCB2YWx1ZXMgb2YgaW5wdXRzXHJcbiAgICAgICAgICAgIC8vIGhlcmUgYXJlIGF1dG9tYXRpY2FsbHkgaW5wdXQgdmFsdWVzIGNhbGN1bGF0ZWRcclxuICAgICAgICAgICAgLy8gLjI1IGFuZCAuNzUgcGVyY2VudGlsZXMgYXJlIHVzZWRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBibEF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC4yNSk7IC8vIGJlbG93IGF2ZXJhZ2UgdmFsdWVcclxuICAgICAgICAgICAgbGV0IGFiQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjc1KTsgLy8gYWJvdmUgYXZlcmFnZVxyXG4gICAgICAgICAgICAkKCcjYmwtYXZnJykudmFsKGJsQXZnKTtcclxuICAgICAgICAgICAgJCgnI2FiLWF2ZycpLnZhbChhYkF2Zyk7XHJcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICAgICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGlucHV0IHNwaW5uZXJcclxuICAgICAqICsvLSAwLjEgdG8gdGhlIGlucHV0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgb2xkVmFsdWUgPSBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwoKS50cmltKCksXHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChidG4uYXR0cignZGF0YS1kaXInKSA9PSAndXAnKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpICsgMC4xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpIC0gMC4xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKG5ld1ZhbCAqIDEwMCkgLyAxMDA7IC1cclxuICAgICAgICBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwobmV3VmFsKTtcclxuICAgICAgICAvLyBjaGFuZ2UgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBpbnB1dCBmaWVsZHMgY2hhbmdlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBtZXRhZGF0YSBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNtZXRhZGF0YS1yZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG59XHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGhpZXJhcmNoeS9kZW5kZ3JvZ3JhbSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGhfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRlbmRncm9ncmFtIHNsaWRpbmcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKSB7XHJcblxyXG4gICAgICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRCdXR0b25JRCA9ICQodGhpcykuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBidXR0b25zIGFuZCBjdXN0b20gaGlnaGxpZ2h0IGp1c3Qgb25lIG9yIG5vbmVcclxuICAgICAgICAgICAgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhY3RpdmUgZm91bmQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpZiAoJChidXR0b24pLmF0dHIoJ2lkJykgPT09IGNsaWNrZWRCdXR0b25JRCAmJiAkKGJ1dHRvbikuaGFzQ2xhc3MoJ2J0bi1wcmltYXJ5JykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLWxlZnQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tcmlnaHQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBhZGQgaGVyZSBhIHJlc2l6ZSBvZiB0aGUgbWFpbiB2aXNcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLmluc2VydEFmdGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSAvLyByZW1vdmUgaGlnaGxpZ2h0XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tbGVmdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1yaWdodCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG93IGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGllcmFyY2h5IGJ1dHRvbiBpbiBuZXR3b3JrIG1vZGFsIG9uIGNoYW5nZVxyXG4gICAgICogTG9hZCBkYXRhIG9yIHJlbW92ZSBpdFxyXG4gICAgICovXHJcbiAgICAkKCcuaGllYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gY2hlY2tib3guYXR0cignZGF0YScpO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2hlY2tib3guYXR0cignbmFtZScpO1xyXG4gICAgICAgIGxldCBjaGVja2VkID0gY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGFkZEhpZXJhcmNoeUJ1dHRvbihpZCwgbmFtZSk7XHJcbiAgICAgICAgICAgIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKTtcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01heCBudW1iZXIgb2YgaGllcmFyY2hpZXMgaXM6ICcgKyBtYXhOdW1iZXJIaWVyYXJjaGllcyk7XHJcbiAgICAgICAgLy9UT0RPIGltcGxlbWVudCB0aGlzIGhlcmVcclxuICAgICAgICAvLyBub3RpY2UgdXNlciB0aGF0IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBzaG93IG1vcmUgdGhhbiBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLy8gICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAvLyAgIDxzdHJvbmc+SW5mbyE8L3N0cm9uZz4gQXR0ZW50aW9uIHVzZXIgLlxyXG4gICAgICAgIC8vIDwvZGl2PlxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdG1wIHZhcmlhYmxlIHRvIHNhdmUgaWYgdGhlIGJ1dHRvbiB3aGljaCBpcyBnb2luZyB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIC8vIHdhcyBhY3RpdmVcclxuICAgICAgICAgICAgbGV0IHRtcEFjdGl2ZSA9ICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5oYXNDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgc2V0SGllcmFyY2h5RGF0YSh7fSwgaWQpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBmaW5kIGJldHRlciB3YXkgaGVyZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2cuaCcgKyBpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZGVuZHJvZ3JhbSBhbmQgdGhlIHBhbmVsIGlmIHRoZSByZW1vdmVkIGVsZW1lbnQgd2FzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKHRtcEFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNpemUgdGhlIG1haW4gc3ZnXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbGl6ZSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjaG9vc2VuIGhpZXJhcmNoeVxyXG4gICAgICovXHJcbiAgICAkKCcubmV0d29yay1oaWVyYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmZvIGZvciB0aGUgY2xpY2tlZCBidXR0b25cclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpO1xyXG4gICAgICAgIGxldCBpZCA9IGNoZWNrYm94LmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBsZXQgY2hlY2tlZCA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgYWxsIHRoZSBvdGhlciBhY3RpdmUgY2hlY2tib3hlc1xyXG4gICAgICAgICQoJy5uZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveCcpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2NoZWNrZWQnKSAmJiAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2RhdGEnKSAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICQoYnV0dG9uKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXR3b3JrIGlkXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkodW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZXJhcmNoeSBzZXQgdGhlb3J5IGJ1dHRvbnMgLSB1bmlvbiwgaW50ZXJzZWN0aW9uLCBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICovXHJcbiAgICAkKCcuc2V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBzZXRTZXRPcGVyYXRpb24oZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gPSA7XHJcblxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCBwbGF5IGJvb2xlYW5cclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIHBhdXNlIChmYWxzZSkgb3IgcGxheSAodHJ1ZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRQbGF5Qm9vbGVhbih2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saXN0ZW5lci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWN0aXZlU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmxldCBzdmdMZWdlbmQ7IC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBsZWdlbmRcclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGdyb3VwIHRvIHRoZSBzdmcgd2hlcmUgdGhlIGxlZ2VuZCBmb3IgdGhlIGNvbG9yIGxlZ2VuZCBpc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNwYXRpYWxWaWV3R3JvdXAoKSB7XHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSA1NTA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjbWFpbi12aXMtbGVnZW5kLWRpdicpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbWFpbi12aXMtbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgY29sb3IgbGVnZW5kXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlTGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoV2lkdGggPSA1MDtcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hIZWlnaHQgPSAyMDtcclxuICAgIC8vIGxldCBkaWZmZXJlbnRDb2xvcnMgPSAwO1xyXG5cclxuICAgIC8vIFNob3cgdGhlIHN2ZyBmaXJzdCBvZiBhbGxcclxuICAgICQoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGFuaW1hbHNcclxuICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgIHZhciB0bXBTY2FsZSA9IHJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5yYW5nZSgpKTtcclxuXHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gZGlmZmVyZW50Q29sb3JzID0gdG1wU2NhbGUucmFuZ2UoKVxyXG4gICAgICAgIC8vIC5sZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgIC8vIGhpZGUgdGhlIGRpdiBhZ2FpblxyXG4gICAgICAgICQoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDUgaGFzIHRvIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCArIDUpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgY29sb3JicmV3ZXIqL1xyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhU2V0UGVyY2VudGlsZVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuZXhwb3J0IGxldCBjb2xvclNjYWxlID0ge1xyXG4gICAgdHlwZTogJ0xpbmVhcicsXHJcbiAgICBjb2xvcjogY29sb3JicmV3ZXIuQnVZbEJ1XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY29sb3Igc2NhbGVcclxuICogQHJldHVybiB7Y29sb3JTY2FsZX0gYWN0aXZlIGNvbG9yIHNjYWxlIGlzIGluIGxpbmVhciBvciB0aHJlc2hvbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5Db2xvclNjYWxlKCkge1xyXG4gICAgLy9pZiBsaW5lYXIgaXMgY2hvb3NlblxyXG4gICAgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ0xpbmVhcicpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH0gLy9UaHJlc2hvbGQgY29sb3Igc2NhbGVcclxuICAgIGVsc2UgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGNvbG9yIHBpY2tlclxyXG4gKiB3aXRoIGFsbCBsaXN0ZW5lcnMgaW5jbHVkZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sb3JQaWNrZXIoKSB7XHJcbiAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnBhbGV0dGUnKVxyXG4gICAgICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JicmV3ZXIpKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhbGV0dGUnKVxyXG4gICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQua2V5O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gaGlnaHRsaWdodCB0aGUgcmlnaHQgcGFsZXR0ZVxyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIicgKyBkLmtleSArICdcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgY29sb3JTY2FsZS5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VsZWN0QWxsKCcuc3dhdGNoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3dhdGNoJylcclxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgY29sb3Igc2NoZW1lXHJcbiAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIkJ1WWxCdVwiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsICovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuXHJcbi8qKlxyXG4gKiBJbml0IE1ldGFkYXRhIGJ1dHRvbnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIGxldCBjb2xvcnMgPSBbJyNmZmYnLCAnI2U0MWExYycsICcjMzc3ZWI4JywgJyM0ZGFmNGEnLCAnIzk4NGVhMycsICcjZmY3ZjAwJywgJyNmZmZmMzMnLCAnI2E2NTYyOCddO1xyXG4gICAgLy8gYWRkIHRoZSBkYXRhIHRvIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaWYgKGRhdGFzZXRNZXRhZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dHIgaWQ9XCJtZXRhZGF0YS1yb3ctJyArIGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10gKyAnXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdCBidG4tY29sb3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2aWV3XCIgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3ItZmllbGRcIiB2YWx1ZT1cIldoaXRlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgKz0gJzxkaXYgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2ggbWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY29sb3JzW2ldICsgJ1wiIHZhbHVlPVwiJyArIGlkICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbWV0YWRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNpemUgYW5kIHdlaWdodCBjb2xvcmluZyBmb3IgdGhlIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNZXRhZGF0YSgpIHtcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAvLyBnZXQgdGhlIGlucHV0IHZhbHVlc1xyXG4gICAgbGV0IHZhbHVlID0gJCgnI2dyb3VwLW1ldGFkYXRhIC5idG4uYnRuLWRlZmF1bHQuYWN0aXZlIGlucHV0JylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGxldCBibEF2ZyA9ICQoJyNibC1hdmcnKS52YWwoKTtcclxuICAgIGxldCBhYkF2ZyA9ICQoJyNhYi1hdmcnKS52YWwoKTtcclxuICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjZmRjMDg2JywgJyMzODZjYjAnXTtcclxuICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdIDwgYmxBdmcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPiBhYkF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGFkYXRhIHJlc2V0IGFsbCBpbmRpdmlkdWFsIG1ldGFkYXRhIGlucHV0IGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCkge1xyXG4gICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgJCgnLmRyb3Bkb3duICNwcmV2aWV3JylcclxuICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9tZXRhZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBwYXJhbWV0ZXJzICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgZ2V0U3VnZ2VzdGVkUGFyYW1ldGVyc1xyXG59IGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgdHJhY2tpbmdCb29sZWFuID0gZmFsc2U7IC8vIGJvb2xlYW4gZm9yIGFjdGl2ZSB0cmFja2luZ1xyXG5sZXQgdHJhY2tlZERhdGEgPSBbXTtcclxuXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBib29sZWFuIHZhbHVlIGlmIHRyYWNraW5nIHNob3VsZCBiZSBhY3RpdmF0ZWRcclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIEJvb2xlYW4gZm9yIGFjdGl2ZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRyYWNraW5nQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgdHJhY2tpbmdCb29sZWFuID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNldHMgdGhlIHRyYWNrZWQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VHJhY2tlZERhdGEoKSB7XHJcbiAgICB0cmFja2VkRGF0YSA9IFtdO1xyXG4gICAgdHJhY2tpbmdCb29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyBkaXNhYmxlIHRoZSBzZW5kIGJ1dHRvblxyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBkYXRhIHRvIHRyYWNrZWREYXRhXHJcbiAqIEBwYXJhbSB7TnVtZXJpY30gdGltZSAtIHRpbWUgb2YgdGhlIGZyYW1lXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBBcnJheSBvZiBhbmltYWxzIGlkcyBmb3IgdGhlIHNwZWNpZmljIGZyYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVHJhY2tlZERhdGEodGltZSwgaWRzKSB7XHJcbiAgICB0cmFja2VkRGF0YS5wdXNoKHtcclxuICAgICAgICBbdGltZV06IEpTT04uc3RyaW5naWZ5KGlkcylcclxuICAgIH0pO1xyXG4gICAgLy8gZW5hYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b25cclxuICAgIGlmICgkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5pcygnOmRpc2FibGVkJykgJiYgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuYXR0cignZGF0YScpID09IDApIHtcclxuICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTZW5kIGRhdGEgd2l0aCBhIGFqYXggcXVlcnkgdG8gdGhlIHNlcnZlciBhbmQgd2FpdCBmb3IgdGhlIGFuc3dlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRUcmFja2VkRGF0YSgpIHtcclxuICAgIGRpc2FibGVDYWxjdWxhdGlvbkJ1dHRvbigpO1xyXG4gICAgZ2V0U3VnZ2VzdGVkUGFyYW1ldGVycyhKU09OLnN0cmluZ2lmeSh0cmFja2VkRGF0YSkpO1xyXG4gICAgcmVzZXRUcmFja2VkRGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVzcG9uc2Ugb2YgdGhlIGFqYXggcXVlcnkgLSBvcGVuIG5ldyB0YWIgd2l0aCB2YWx1ZXMgdG8gY3JlYXRlIG5ldHdvcmtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZVBhcmFtZXRlcnMoZGF0YSkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgLy8gb3BlbiBuZXR3b3JrIGNyZWF0ZSB1cmxcclxuICAgIGxldCB1cmwgPSAnLi4vLi4vbmV0d29yay9uZXc/ZGF0YXNldF9pZD0nICsgcGFyYW1ldGVyc1snaWQnXSArICcmJyArICQucGFyYW0oZGF0YVsnZGF0YSddWydtYXhfcGFyYW1zJ10pO1xyXG4gICAgLy8gY3JlYXRlIG5ldyB0YWIgd2l0aCB0aGUgcmVzdWx0IHBhcmFtZXRlclxyXG4gICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICBlbmFibGVDYWxjdWxhdGlvbkJ1dHRvbigpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIGNhbGN1bGF0aW9uIGJ1dHRvbiAtPiBsb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUNhbGN1bGF0aW9uQnV0dG9uKCkge1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuYXR0cignZGF0YScsIDEpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uIHJlbW92ZSBsb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlQ2FsY3VsYXRpb25CdXR0b24oKSB7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdGFza3NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Q2FsY3VsYXRlJyk7XHJcbiAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJywgMCk7XHJcblxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3Zpc3VhbF9wYXJhbWV0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBwYXJhbWV0ZXJzKi9cclxuaW1wb3J0IHtcclxuICAgIHNldEluZGV4VGltZSxcclxuICAgIGFuaW1hbF9pZHNcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHN3YXJtRGF0YSxcclxuICAgIGRhdGFzZXRcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHBlcmNlbnRpbGVzTGluZUNoYXJ0XHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbmRleFRpbWUsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcblxyXG5leHBvcnQgbGV0IHpvb21GdW5jdGlvbjtcclxuXHJcbmxldCB0cmVuZENoYXJ0c1pvb20gPSB7fTtcclxubGV0IHRyZW5kQ2hhcnRzRWxlbSA9IFsnbG93ZXItb3V0ZXItYXJlYScsICdsb3dlci1pbm5lci1hcmVhJywgJ21lZGlhbi1saW5lJywgJ3VwcGVyLWlubmVyLWFyZWEnLCAndXBwZXItb3V0ZXItYXJlYSddO1xyXG5sZXQgbGluZUNoYXJ0V2lkdGggPSA1MDAwO1xyXG5sZXQgcmF0aW8gPSAxO1xyXG5sZXQgem9vbUdyb3VwO1xyXG5sZXQgeDtcclxubGV0IHk7XHJcblxyXG4vKipcclxuICogaW5pdCB0aGUgbGluZSBjaGFydCBhbmQgYWxzbyB0aGUgdHJlbmQgY2hhcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lQ2hhcnQoKSB7XHJcblxyXG4gICAgcmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAvLyBTd2FybSBmZWF0dXJlcyBsaW5lIGNoYXJ0XHJcbiAgICBsZXQgbGluZUNoYXJ0SGVpZ2h0ID0gNTAwOyAvLyB0aGUgbGluZSBjaGFydCBoZWlnaHRcclxuICAgIGxldCBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiAxMCxcclxuICAgICAgICByaWdodDogMCxcclxuICAgICAgICBib3R0b206IDEwMCxcclxuICAgICAgICBsZWZ0OiAxMFxyXG4gICAgfTtcclxuICAgIGxldCBtYXJnaW5Ub0xlZ2VuZCA9IDUwO1xyXG5cclxuICAgIGxldCBzd2FybV9mZWF0dXJlcyA9IE9iamVjdC5rZXlzKHN3YXJtRGF0YVswXSk7XHJcbiAgICAvLyByZW1vdmUgdGhlIHRpbWUga2V5XHJcbiAgICBsZXQgaW5kZXggPSBzd2FybV9mZWF0dXJlcy5pbmRleE9mKCd0aW1lJyk7XHJcbiAgICBzd2FybV9mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcuZmVhdHVyZS1jaGVjay1ib3gnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJmZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGxpbmUtY2hhcnQtY2hlY2stYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArIGBcIiBjbGFzcz1cImxpbmVDaGFydEJ1dHRvblwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArIGA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgLy8gYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSBzd2FybSBkYXRhIHRvIGxpbmVDaGFydFdpZHRoIHBvaW50cyBpbiB0aGUgbGluZSBjaGFydFxyXG4gICAgaWYgKHN3YXJtRGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIC8vIHRtcCBhcnJheSBmb3IgdGhlIGFnZ3JlZ2F0ZWQgYW5kIGF2ZXJhZ2VkIGZlYXR1cmVzXHJcbiAgICAgICAgbGV0IHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZSB0aGUgZmVhdHVyZXMgaW4gdGhlIHRlbXAgYXJyYXlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdG1wW2pdICs9IHN3YXJtRGF0YVtpXVtzd2FybV9mZWF0dXJlc1tqXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHJhdGlvIGlzIHplcm8gdGhlbiBhdmVyYWdlIGl0IGFuZCBzZXQgaXQgdG8gemVyb1xyXG4gICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX29iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGltZSc6IGkgLyByYXRpb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gdG1wW2pdIC8gcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX29iamVjdFtzd2FybV9mZWF0dXJlc1tqXV0gPSB0bXBbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZUNoYXJ0RGF0YS5wdXNoKHRtcF9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gbmV3IEFycmF5KHN3YXJtX2ZlYXR1cmVzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGluZUNoYXJ0RGF0YSA9IHN3YXJtRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB6b29tRnVuY3Rpb24gPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuXHJcblxyXG4gICAgLy8geCBheGlzIHNjYWxlIC0gbWludXMgbWFyZ2luTGluZUNoYXJ0ICBuZWVkZWRcclxuICAgIHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxyXG4gICAgICAgIC5yYW5nZShbbGluZUNoYXJ0SGVpZ2h0LCAwXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KVxyXG4gICAgICAgIC50aWNrcygwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IGRyYWdnZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkcmFnZ2VkIGZ1bmN0aW9uIGdldCB0aGUgY29vcmRpbmF0ZXMgYW5kIGNhbGN1bGF0ZSB0aGUgdGltZSBtb21lbnQgZnJvbSB0aGlzXHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMpO1xyXG4gICAgICAgIGlmIChjb29yZHNbMF0gPCBtYXJnaW4ubGVmdCB8fCBjb29yZHNbMF0gPiBsaW5lQ2hhcnRXaWR0aCB8fCBjb29yZHNbMV0gPCAwIHx8IGNvb3Jkc1sxXSA+IGxpbmVDaGFydEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRtcCBzY2FsZSB0byBpbmNsdWRlIHRoZSB6b29tIGZhY3RvclxyXG4gICAgICAgIGxldCB0bXBTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbih6b29tRnVuY3Rpb24ucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKHpvb21GdW5jdGlvbi5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgdGltZVxyXG4gICAgICAgIHNldEluZGV4VGltZShNYXRoLmZsb29yKCh0bXBTY2FsZShjb29yZHNbMF0gLSBtYXJnaW4ubGVmdCkpICogcmF0aW8pKTtcclxuICAgIH07XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICB6b29tRnVuY3Rpb24gPSB4LmRvbWFpbih0LnJlc2NhbGVYKHgyKS5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIC8vIHpvb20gZWFjaCBhdmFpYWJsZSBsaW5lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBsaW5lcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXAuc2VsZWN0KCgnIycgKyBrZXkgKyAnTGluZScpKS5hdHRyKCdkJywgbGluZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gem9vbSB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0cmVuZENoYXJ0c1pvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0c1pvb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgoJyMnICsga2V5ICsgJ1RyZW5kQ2hhcnQgLicgKyB0cmVuZENoYXJ0c0VsZW1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0cmVuZENoYXJ0c1pvb21ba2V5XVt0cmVuZENoYXJ0c0VsZW1baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3ZnIHJlc2l6YWJsZVxyXG4gICAgbGV0IHN3YXJtTGluZUNoYXJ0ID0gZDMuc2VsZWN0KCcjc3dhcm0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzLWxpbmUtY2hhcnQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGxpbmVDaGFydEhlaWdodCArICcpJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgLy8gYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSB5IGF4aXNcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMtbGluZS1jaGFydCcpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuXHJcbiAgICAvLyB0aGUgdGltZSBsaW5lIGFwcGVuZCB0aGUgbGluZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbWUtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAuYXR0cigneDEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gyJywgMClcclxuICAgICAgICAuYXR0cigneTInLCBsaW5lQ2hhcnRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGNvbG9ycyBmb3IgdGhlIGxpbmVzXHJcbiAgICBsZXQgbGluZV9jb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XHJcbiAgICBsZXQgbGluZXMgPSB7fTtcclxuICAgIC8vIGFkZCB0aGUgbGluZXMgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWluID0gZDMubWluKGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgobGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZFsndGltZSddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbc3dhcm1fZmVhdHVyZXNbaV1dKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmVzW3N3YXJtX2ZlYXR1cmVzW2ldXSA9IGxpbmU7XHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIGxpbmUgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgICAgICB6b29tR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmRhdGEoW2xpbmVDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBsaW5lQ2hhcnRMaW5lJylcclxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBsaW5lX2NvbG9ycyhpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgICAgICAuYXR0cignbmFtZScsIHN3YXJtX2ZlYXR1cmVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd6b29tJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsaW5lQ2hhcnRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGluZUNoYXJ0SGVpZ2h0KVxyXG4gICAgICAgIC5jYWxsKHpvb20pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGRyYWdnZWQpXHJcbiAgICAgICAgLmNhbGwoZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5vbignZHJhZycsIGRyYWdnZWQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIGxlZ2VuZCBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvL3NlbGVjdCBhbGwgdGhlIGxpbmVzXHJcbiAgICBsZXQgY2hhcnRMaW5lcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmUnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoY2hhcnRMaW5lcy5fZ3JvdXBzWzBdKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQuc3R5bGUuc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgKyAnOiAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgdmFsdWUgb2YgdGhlIGxpbmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGV4cHJlc3Npb24gZ2V0cyB0aGUgdGV4dCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyMnICsgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJykubm9kZSgpLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICtcclxuICAgICAgICAgICAgICAgICAgICAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJzAuMCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgbGVnZW5kIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd0cmVuZENoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKFsnNSUgLSA5NSUnLCAnMjUlIC0gNzUlJywgJ01lZGlhbiddKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzc0YTljZic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzA0NWE4ZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNTI1MjUyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkKTtcclxuICAgICAgICB9KTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBsaW5lIGNoYXJ0IGJ1dHRvbiBsaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCgnI2RyYXdTd2FybScgKyBzd2FybV9mZWF0dXJlc1tpXSkpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgoJyMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKSB7XHJcbiAgICAkKCcuZHJhdy1kZXRhaWxzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgICAgIGFkZFRyZW5kQ2hhcnQodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlVHJlbmRDaGFydCgpO1xyXG4gICAgICAgICAgICBlbmFibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJy5saW5lLWNoYXJ0LWNoZWNrLWJveCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVUcmVuZENoYXJ0KCkge1xyXG4gICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgdHJlbmQgY2hhcnQgc2hvd2luZyBtZWRpYW4gYW5kIHBlcmNlbnRpbGVzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gd2hpY2ggZmVhdHVyZVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAvLyBjaGVjayB3aGljaCBmZWF0dXJlIHRvIGRpc3BsYXkgaW4gdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICBsZXQgZmVhdHVyZSA9ICcnO1xyXG4gICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnc3BlZWQnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FjY2VsZXJhdGlvbicpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rpc3RhbmNlX2NlbnRyb2lkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2Rpc3RhbmNlX2NlbnRyb2lkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtaWRsaW5lX29mZnNldCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdtaWRsaW5lX29mZnNldCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNldGlsZXMgZm9yIGV2ZXJ5IHRpbWUgc3RlcFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXNMaW5lQ2hhcnQodG1wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSB0cmVuZENoYXJ0RGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICBsZXQgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdncmVnYXRlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0cmVuZENoYXJ0RGF0YVtpXVtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRpdmlkZVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgdG8gdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wVHJlbmRDaGFydERhdGEucHVzaCh0bXApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0RGF0YSA9IHRtcFRyZW5kQ2hhcnREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgbWluIGFuZCBtYXggZm9yIHRoZSBub3JtYWxpemF0aW9uXHJcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbih0cmVuZENoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFswXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWF4ID0gZDMubWF4KHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydCA9IHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoZmVhdHVyZSArICdUcmVuZENoYXJ0JykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0cmVuZENoYXJ0RGF0YScpO1xyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGUgYWdhaW4gdG8gdGhlIGVuZCBvZiB0aGUgZ3JvdXBcclxuICAgICAgICAkKCcuem9vbScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgIC8vIHZhciB0byBzYXZlIHRoZSBmdW5jdGlvbnMgZm9yIHRoZSB6b29tXHJcbiAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9ucyBmb3IgdGhlIHVwcGVyIGFuZCBpbm5lciBhcmVhcyBhbmQgdGhlIG1lZGlhblxyXG4gICAgICAgICAgICBsZXQgdGVtcDtcclxuICAgICAgICAgICAgLy8gbG93ZXIgb3V0ZXIgYXJlYSBhbmQgbG93ZXIgaW5uZXIgYXJlYVxyXG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5hcmVhKClcclxuICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgKyAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbWVkaWFuIGxpbmVcclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdXBwZXIgaW5uZXIgYXJlYSBhbmQgdXBwZXIgb3V0ZXIgYXJlYVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgLSAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzYXZlIHRoaXMgZm9yIHRoZSBsYXRlciB6b29tXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXVt0cmVuZENoYXJ0c0VsZW1baV1dID0gdGVtcDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIGl0IHRvIHRoZSBwYXRoXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnQuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKFt0cmVuZENoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCB0cmVuZENoYXJ0c0VsZW1baV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gc2hvdyB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICAkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIHRoZSBsaW5lIGNoYXJ0IGZpZWxkcyBhbmQgdGhlIGxpbmUgY2hhcnQgdGltZSBsaW5lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTGluZUNoYXJ0KCkge1xyXG4gICAgaWYgKGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJykgJiYgc3dhcm1EYXRhW01hdGguY2VpbChpbmRleFRpbWUgLyByYXRpbyldKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IE1hdGguY2VpbChpbmRleFRpbWUgLyByYXRpbyk7XHJcbiAgICAgICAgLy91cGRhdGUgdGhlIGxpbmUgY2hhcnQgbGVnZW5kIHRleHQgdmFsdWVzIHBlciBzZWNvbmRcclxuICAgICAgICBpZiAoaW5kZXhUaW1lICUgMjUgPT09IDApIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBjaGFuZ2UgdGhpcyB0byBhIG1vcmUgbW9kdWxhciB3YXlcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjY29udmV4X2h1bGxfYXJlYUxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgoc3dhcm1EYXRhW3RtcF1bJ2NvbnZleF9odWxsX2FyZWEnXSkgKyAnbW3CsicpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNzcGVlZExpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnc3BlZWQnXSArICdtbS9zJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2FjY2VsZXJhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnYWNjZWxlcmF0aW9uJ10gKyAnbW0vc8KyJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2Rpc3RhbmNlX2NlbnRyb2lkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydkaXN0YW5jZV9jZW50cm9pZCddICsgJ21tJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RpcmVjdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlyZWN0aW9uJ10gKyAnwrAnKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjcG9sYXJpc2F0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydwb2xhcmlzYXRpb24nXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHpvb21GdW5jdGlvbih0bXApICsgJywwKScpO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2xpbmVfY2hhcnQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSxcclxuICAgIHN3YXJtRGF0YVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCAqIGFzIE5ldHdvcmsgZnJvbSAnLi4vbmV0d29yay5qcyc7XHJcblxyXG5leHBvcnQgbGV0IHNsaWRlcjsgLy8gdGltZSBzbGlkZXIgb2YgdGhlIGFwcFxyXG5leHBvcnQgbGV0IHRvb2x0aXA7IC8vIHRvb2x0aXAgZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBCcnVzaCBlbmQgZnVuY3Rpb25cclxuICogYWRkIGFjdGl2ZSBhbmltYWxzIHRvIHRoZSBhcnJheSBvciByZW1vdmUgdGhlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgbGV0IGFycmF5QW5pbWFscyA9IFNQVi5hcnJheUFuaW1hbHM7XHJcbiAgICBsZXQgYWN0aXZlQW5pbWFscyA9IFNQVi5hY3RpdmVBbmltYWxzO1xyXG4gICAgdmFyIHJlY3QgPSBkMy5ldmVudC5zZWxlY3Rpb247XHJcbiAgICAvL2l0ZXJhdGUgb3ZlciB0aGUgMTUxIGZpc2ggdG8gY2hlY2sgd2hpY2ggYXJlIGluIHRoZSBicnVzaFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTUFYuYW5pbWFsX2lkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwb2ludCA9IFthcnJheUFuaW1hbHNbaV1bJ3AnXVswXSwgYXJyYXlBbmltYWxzW2ldWydwJ11bMV1dO1xyXG4gICAgICAgIC8vY2hlY2sgd2hpY2ggZmlzaCBhcmUgaW4gIHRoZSBicnVzaGVkIGFyZWFcclxuICAgICAgICBpZiAoKHJlY3RbMF1bMF0gPD0gcG9pbnRbMF0pICYmIChwb2ludFswXSA8PSByZWN0WzFdWzBdKSAmJlxyXG4gICAgICAgICAgICAocmVjdFswXVsxXSA8PSBwb2ludFsxXSkgJiYgKHBvaW50WzFdIDw9IHJlY3RbMV1bMV0pKSB7XHJcbiAgICAgICAgICAgIC8vIFBvaW50IGlzIGluIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goYXJyYXlBbmltYWxzW2ldWydhJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKGFjdGl2ZUFuaW1hbHMpO1xyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH1cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAkKCcuYnJ1c2gnKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRvb2x0aXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcCgpIHtcclxuICAgIHRvb2x0aXAgPSBkMy5zZWxlY3QoJ2Rpdi50b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVG9vbHRpcCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gZCAtIGQzIGRhdGEgb2JqZWN0IHdpdGggdGhlIG1ldGFkYXRhIGluZm9ybWF0aW9uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9vbHRpcEZ1bmN0aW9uKGQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRbJ2EnXSA9PT0gZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIG1vZHVsYXJcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLWFuaW1hbC1pZCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNwZWNpZXMnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2V4JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2l6ZScpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC13ZWlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRpbWUgc2xpZGVyIGFuZCB0aGUgZHluYW1pYyBuZXR3b3JrIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXJzKCkge1xyXG4gICAgLy8gdGltZSBzbGlkZXJcclxuICAgIHNsaWRlciA9ICQoJyNzbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogc3dhcm1EYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RlcDogMjUsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgcGF1c2VkIGFwcGx5IGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIE5ldHdvcmsgc2xpZGVyXHJcbiAgICAkKCcjbmV0d29yay1zbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICB2YWx1ZTogMC41LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBOZXR3b3JrLnNldE5ldHdvckxpbWl0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gc2V0IHRleHQgZm9yIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBcclxuICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKDAuNSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtYXggZnJvbSB0aGUgc2xpZGVyIHRoaXMgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGlja3NcclxuICAgIGxldCBtYXggPSBzbGlkZXIuc2xpZGVyKCdvcHRpb24nLCAnbWF4Jyk7XHJcbiAgICBsZXQgc3BhY2UgPSAxMDAgLyBtYXg7XHJcbiAgICAvL2FwcGVuZCB0aGUgbWludXRlIHRpY2tzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSA9IGkgKyAxNTAwKSB7XHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ1aS1zbGlkZXItdGlja1wiPjwvc3Bhbj4nKVxyXG4gICAgICAgICAgICAuY3NzKCdsZWZ0JywgKHNwYWNlICogaSkgKyAnJScpXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aW1lIHNsaWRlciB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdmFsdWUgZm9yIHRoZSB0aW1lIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVTbGlkZXIodmFsdWUpIHtcclxuICAgIHNsaWRlci5zbGlkZXIoJ3ZhbHVlJywgdmFsdWUpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmVhdHVyZXMgY2hlY2tib3ggYW5kIHJhZGlvIGJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggZGl2IHtcXHJcXG4gICAgY2xlYXI6IGJvdGg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBsYWJlbCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5LCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xcclxcbiAgICB0ZXh0LWluZGVudDogM2VtO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICB3aWR0aDogMi41ZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogI0MyQzJDMjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjNzc3O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4ICM5OTk7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogU1ZHIGVsZW1lbnRzIGFuZCB0ZXh0ICovXFxyXFxuXFxyXFxuI21haW4tdmlzIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxyXFxufVxcclxcblxcclxcbiNtYWluLXZpcy1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZCB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNoaWVyYXJjaHktbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG4gICAgdG9wOiAxMHB4O1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1saW5lLWNoYXJ0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTclO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5zdmctZGVuZHJvZ3JhbS1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgcGF0aCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5heGlzIGxpbmUge1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4zO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi54IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi55IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5heGlzLWxpbmUtY2hhcnQgcGF0aCBsaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi5saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRpbWUgICovXFxyXFxuXFxyXFxuLmZyYW1lLXRleHQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTbGlkZXIgdGlja3MgICovXFxyXFxuXFxyXFxuLnVpLXNsaWRlci10aWNrIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjMzM3YWI3O1xcclxcbiAgICBoZWlnaHQ6IDAuOGVtO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbi8qIExhb2RpbmcgZ2lmICAgKi9cXHJcXG5cXHJcXG4jbG9hZGluZyB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGxlZ2VuZCAgICAqL1xcclxcblxcclxcbi5sZWdlbmQge1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZ2VuZC10ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi50aW1lLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKnN3YXJtIGZlYXR1cmVzICovXFxyXFxuXFxyXFxuLmNlbnRyb2lkIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkb2lkIHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmh1bGwtcGF0aCB7XFxyXFxuICAgIGZpbGw6ICNmZmY7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5oaWVyYXJjaHktZ3JvdXAge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDEwO1xcclxcbiAgICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xcclxcbiAgICBvcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi5kZWxhdW5heS10cmlhbmd1bGF0aW9uIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNDtcXHJcXG59XFxyXFxuXFxyXFxuLmdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGUge1xcclxcbiAgICAtYW5pbWF0aW9uOiBzcGluIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluMiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbn1cXHJcXG5cXHJcXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbjIge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5idG4ge1xcclxcbiAgICBib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5hY3RpdmUgc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkxIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Q5ZDlkOTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MiB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5Njk2OTY7XFxyXFxufVxcclxcblxcclxcbiNidG4tZGFyayB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM0ZDRkNGQ7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGJyZXdlciBwaWNrZXIgZGl2ICovXFxyXFxuXFxyXFxuLnBhbGV0dGUge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcclxcbiAgICBtYXJnaW46IDRweCAwIDRweCA0cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNhYWE7XFxyXFxufVxcclxcblxcclxcbi5zd2F0Y2gge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIHdpZHRoOiAyMnB4O1xcclxcbiAgICBoZWlnaHQ6IDIycHg7XFxyXFxufVxcclxcblxcclxcbi52b3Jvbm9pIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDZweCAwO1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQyOTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUuYnRuLWxnIHtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgcGFkZGluZzogMTNweCAxM3B4O1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjMzO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUb29sdGlwICovXFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAge1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjMWI4MDllICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XFxyXFxuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB0YWJsZSB0ZDpudGgtY2hpbGQoMikge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4udG9vbHRpcC1zcGFuIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1jaGVjay1ib3guZGlzYWJsZWQge1xcclxcbiAgICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyLW91dGVyLWFyZWEsIC5sb3dlci1vdXRlci1hcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjNzRhOWNmO1xcclxcbiAgICBzdHJva2U6ICMzNjkwYzA7XFxyXFxufVxcclxcblxcclxcbi51cHBlci1pbm5lci1hcmVhLCAubG93ZXItaW5uZXItYXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzA0NWE4ZDtcXHJcXG4gICAgc3Ryb2tlOiAjMDIzODU4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFuLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICM1MjUyNTI7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk5OTtcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgIzRkNGQ0ZDtcXHJcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLnpvb20ge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4ueC5heGlzLWxpbmUtY2hhcnQ+Zz50ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3Qge1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQge1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IHRoaWNrIHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgc3BhbiB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlcjogdGhpY2sgc29saWQgd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgbWFyZ2luLXRvcDogLTYwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODYwOTA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgaDIge1xcclxcbiAgICBtYXJnaW4tdG9wOiA3cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAudDIgLm1vZC1oZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5jbG9zZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWhlYWRlciB7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZTVlNWU1O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI21ldGFkYXRhLWlucHV0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQge1xcclxcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIGxpIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCBzcGFuIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzY2NjtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmJsLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZmM5N2Y7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGMwODY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmFiLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODZjYjA7XFxyXFxufVxcclxcblxcclxcbi5uZXR3b3JrLWVkZ2VzIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxufVxcclxcblxcclxcbi5uZXR3b3JrLWJhY2tncm91bmQtZWRnZXMge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjI1O1xcclxcbiAgICBzdHJva2U6ICM3MzczNzM7XFxyXFxufVxcclxcblxcclxcbi5ub2RlIHRleHQge1xcclxcbiAgICBmb250OiAxMnB4IHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbi5ub2RlLS1pbnRlcm5hbCB0ZXh0IHtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4IDAgI2ZmZiwgMCAtMXB4IDAgI2ZmZiwgMXB4IDAgMCAjZmZmLCAtMXB4IDAgMCAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluayB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzYzNjM2MztcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3gge1xcclxcbiAgICBtaW4taGVpZ2h0OiAxcmVtO1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbmRpY2F0b3Ige1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MTgxODE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW46IDAgMTZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogMThweDtcXHJcXG4gICAgaGVpZ2h0OiAxOHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcXHJcXG4gICAgbGVmdDogLTJweDtcXHJcXG4gICAgdG9wOiAtNHB4O1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxuICAgIHRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWR+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4NGM3YzE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZH4uY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg0YzdjMTtcXHJcXG4gICAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXN+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2FjdGl2ZS1uZXR3b3JrLW5hbWUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICMyOTYyOTI7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUtbGV2ZWwge1xcclxcbiAgICBmaWxsOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmVcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbmRyb2dyYW0tdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTBlbSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlnaGxpZ2h0LWhpZXJhcmNoeSB7XFxyXFxuICAgIGZpbGw6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxMDtcXHJcXG4gICAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcbn1cXHJcXG5cXHJcXG4uYW5pbWFsLWhpZ2hsaWdodCB7XFxyXFxuICAgIGZpbGw6ICNjNTFiN2QgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYgLmJ0biBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IC5idG4uYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWxlZ2VuZCB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaW50ZXJzZWN0aW9uIHtcXHJcXG4gICAgZmlsbDogdXJsKCNzdHJpcGVkKSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICM2NzAwMGQ7XFxyXFxufVxcclxcblxcclxcbi5zeW0tZGlmZmVyZW5jZSB7XFxyXFxuICAgIGZpbGw6IHVybCgjc3RyaXBlZCkgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjNjcwMDBkO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=