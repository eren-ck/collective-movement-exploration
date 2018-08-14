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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animalIds", function() { return animalIds; });
/* harmony export (immutable) */ __webpack_exports__["addToDataset"] = addToDataset;
/* harmony export (immutable) */ __webpack_exports__["setDataSetPercentile"] = setDataSetPercentile;
/* harmony export (immutable) */ __webpack_exports__["setMetaData"] = setMetaData;
/* harmony export (immutable) */ __webpack_exports__["setSwarmData"] = setSwarmData;
/* harmony export (immutable) */ __webpack_exports__["setDatasetFeature"] = setDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["setNetworkData"] = setNetworkData;
/* harmony export (immutable) */ __webpack_exports__["setHierarchyData"] = setHierarchyData;
/* harmony export (immutable) */ __webpack_exports__["setAnimalIds"] = setAnimalIds;
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
let animalIds = {}; // distinct animal ids



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
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["g" /* getPercentile */]();

    // get the distinct animal ids for the whole dataset
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["a" /* getAnimalIds */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["i" /* getSwarmFeatures */]();

    // get the metadata and initialize the metada window
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["c" /* getMetaData */]();

    // get the information if there are already networks created for this dastaset
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["e" /* getNetworkDataButton */]();
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

/**
 * Set animal ids dataset
 * @param {array} ids - Array of all distinct animal ids
 */
function setAnimalIds(value) {
    animalIds = value;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return indexTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return tankWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return tankHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return activeScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return medoidAnimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return activeAnimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return arrayAnimals; });
/* harmony export (immutable) */ __webpack_exports__["l"] = spatialViewInit;
/* harmony export (immutable) */ __webpack_exports__["e"] = draw;
/* harmony export (immutable) */ __webpack_exports__["j"] = setIndexTime;
/* harmony export (immutable) */ __webpack_exports__["d"] = decIndexTime;
/* harmony export (immutable) */ __webpack_exports__["i"] = setActiveScale;
/* harmony export (immutable) */ __webpack_exports__["k"] = setMedoidAnimal;
/* harmony export (immutable) */ __webpack_exports__["h"] = setActiveAnimals;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__);
/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set */
























let indexTime = 0; // actual time moment in the animation
let tankWidth;
let tankHeight;
let activeScale = 'black'; // can be speed, acceleration, .. and black (meaning no active scale)
let medoidAnimal = -1; // which animal is the medoid (-1 is no animal)
let activeAnimals = []; // active selected animals
let arrayAnimals; // array of animals for the specific time frame

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
    Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["e" /* makeResizable */])();

    // reset all checkboxes and hide icons
    Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["b" /* defaultConfig */])();

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

    $('#g-centroid').hide();
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
    let timeToWait = $('input[type="radio"].group-playback-rate:checked')
        .val();
    //scale the size by this number
    let animalScale = $('input[type="radio"].group-size:checked')
        .val();

    //get the next animals
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
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["i" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* percentiles */])(tmpArray));
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
                if (__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["trackingBoolean"]) {
                    Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["addTrackedData"])(arrayAnimals[0]['t'], activeAnimals);
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
                        '<td> <button type="button" class="btn btn-default" data=' + data[i]['network_id'] + ' name=' + data[i]['name'] +
                        '><span class="mdi mdi-graphql" aria-hidden="true"></span></button></td> ' +
                        '<td><div class="pretty p-switch p-fill"><input type="checkbox" class="hiearchy-checkbox" data="' +
                        data[i]['network_id'] + '" name="' + data[i]['name'] + '"><div class="state p-success"><label></label></div></div></td>' +
                        '<td><div class="pretty p-switch p-fill"><input type="checkbox" class="network-hierarchy-checkbox" data="' +
                        data[i]['network_id'] + '"><div class="state p-success"><label></label></div></div></td>');
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
/* harmony export (immutable) */ __webpack_exports__["c"] = disablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["d"] = enablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["f"] = percentiles;
/* harmony export (immutable) */ __webpack_exports__["g"] = percentilesLineChart;
/* harmony export (immutable) */ __webpack_exports__["a"] = addAbsoluteFeatureButtons;
/* harmony export (immutable) */ __webpack_exports__["h"] = standardDeviation;
/* harmony export (immutable) */ __webpack_exports__["e"] = makeResizable;
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultConfig;
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
    $('#play-button').prop('disabled', true);
    $('#play-icons').hide();
    $('#play-loading').show();

}

/**
 * Enable the play button remove loading symbol
 */
function enablePlayButton() {
    Object(__WEBPACK_IMPORTED_MODULE_1__listener_js__["c" /* setPlayBoolean */])(true);
    $('#play-button').addClass('active');
    $('#play-button').prop('disabled', false);
    $('#play-loading').hide();
    $('#play-icons').show();
    Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */])();
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
            $('#absolute-feature-checkboxes').append('<tr><th>' +
                ' <div class="pretty p-switch p-fill p-bigger"><input type="checkbox" id="draw-' + key +
                '"/><div class="state"><label>' + capitalized_feature_string + '</label></div></div>' +
                // quantile graph
                '<div class="float-right draw-details" id="draw-' + key + '-details"><div class="pretty p-icon p-toggle p-plain"><input type="checkbox" id="draw-' + key + '-input" />' +
                '<div class="state p-success-o p-on"><i class="mdi mdi-image-area"></i><label></label></div>' +
                '<div class="state p-off"><i class="mdi mdi-image-off"></i><label></label></div>' +
                '</div></div></th></tr>');

        }
    }
    // hide the elements
    $('.draw-details').hide();
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

/**
 * Make the main vis spatial view resizable
 */
function makeResizable(height, width) {
    $(function() {
        $('#main-vis')
            .draggable({
                containment: 'parent'
            })
            .resizable({
                aspectRatio: true,
                maxWidth: $('#main-vis-div').width()
            })
            .height(height * 0.6)
            .width(width * 0.6);
    });
}

/**
 * Reset the buttons and checkboxes
 * Hide icons - needed because of bootstrap bug
 */
function defaultConfig() {
    $('input[type=checkbox]').prop('checked', false);
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
    // needed due to jQuery incompatibility
    $('#play-loading').hide();
    $('.mdi-play').hide();
    $('#metadata-input').hide();
    $('#dendrogram-buttons-div').hide();
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
                    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["d" /* decIndexTime */])();
                    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["e" /* draw */])();
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
        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]['h' + id][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["f" /* indexTime */]];
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
                                return standardDeviationColorScale(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["h" /* standardDeviation */])(hierarchyGroupStdev[('h' + d['data']['name'].toString().hashCode())]));
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
        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]['h' + hierarchyIds[i]][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["f" /* indexTime */]];
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
    Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["h" /* setActiveAnimals */])(d['data']['name']);
    // if no animation is active draw the draw one step
    if (!$('#play-button').hasClass('active')) {
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["d" /* decIndexTime */])();
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["e" /* draw */])();
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
            let groupMember = __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["c" /* arrayAnimals */].find(d => d['a'] === cluster[j]);
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
/* harmony export (immutable) */ __webpack_exports__["g"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["i"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["c"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["e"] = getNetworkDataButton;
/* harmony export (immutable) */ __webpack_exports__["b"] = getDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["h"] = getSwarmDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkData;
/* harmony export (immutable) */ __webpack_exports__["f"] = getNetworkHierarchyData;
/* harmony export (immutable) */ __webpack_exports__["a"] = getAnimalIds;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view_js__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window, $, parameters */

let JSONAPI_MIMETYPE = 'application/vnd.api+json';
var source;









// import {
//     responseParameters
// } from './visual_parameter.js';


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
                            Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view_js__["l" /* spatialViewInit */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* enablePlayButton */])();
        }
    });
}

/**
 * Get the specifc swarm feature
 * @param {String} feature - for instance centroid, medoid etc.
 */
function getSwarmDatasetFeature(feature) {
    Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* disablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* enablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* enablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* enablePlayButton */])();
        }
    });
}

/**
 * Get the distinct animal ids for a specifc dataset
 */
function getAnimalIds() {
    $.ajax({
        url: '/api/dataset/' + parameters['id'] + '/animal_ids',
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setAnimalIds"])(data);
        }
    });
}

// /**
//  * Visual parameter suggestion ajax query
//  * @param {Array} trackedData - tracked data with .
//  */
// export function getSuggestedParameters(trackedData) {
//     $.ajax({
//         url: '/api/dataset/visual_parameter/' + parameters['id'],
//         dataType: 'json',
//         type: 'POST',
//         contentType: 'application/json; charset=utf-8',
//         headers: {
//             'Accept': JSONAPI_MIMETYPE
//         },
//         success: function(data) {
//             responseParameters(data);
//         },
//         data: trackedData
//     });
//
// }

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__);
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
            $('.mdi-pause').hide();
            $('.mdi-play').show();
        } else {
            playBoolean = true;
            $('.mdi-play').hide();
            $('.mdi-pause').show();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setIndexTime */](__WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__["e" /* slider */].slider('value'));
            $('.brush').remove();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
        __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
                    [__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["n" /* tankWidth */], __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["m" /* tankHeight */]]
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["h" /* setActiveAnimals */]([]);
            // tracking of data for visual parameter suggestion
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["resetTrackedData"])();
            $('#visual-parameter-button').prop('disabled', true).removeClass('active');

            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes

                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
            }
        }
    });

    /**
     * Track visual parameter button
     */
    $('#visual-parameter-button').click(function() {
        if ($('#visual-parameter-button').hasClass('active') === true) {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["setTrackingBoolean"])(false);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["setTrackingBoolean"])(true);
        }
    });

    /**
     * Send the tracked via a ajax query to the server to calculate the parameters
     */
    $('#calculate-parameter-button').click(function() {
        if (!$('#calculate-parameter-button').hasClass('active')) {
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["setTrackingBoolean"])(false);
            Object(__WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__["sendTrackedData"])();

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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
                // ajax query to get direction data
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["b" /* getDatasetFeature */])('direction');
            }
            $('.arrow').show();
        } else {
            $('.arrow').hide();
        }
        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["k" /* setMedoidAnimal */](__WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* indexTime */]]['medoid']);
            // display the medoid
            d3.selectAll('#animal-' + __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["g" /* medoidAnimal */])
                .classed('medoid', true);
        } else {
            // do not display the medoid fish
            d3.selectAll('#animal-' + __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["g" /* medoidAnimal */])
                .classed('medoid', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["k" /* setMedoidAnimal */](-1);
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
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-speed').is(':checked')) {
            // load absolute feature speed data once
            if (!('speed' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
                // ajax query to get the absolute feature speed
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["b" /* getDatasetFeature */])('speed');
            }
            // $('.draw-details').hide();
            $('#draw-speed-details').show();
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('speed');
        } else {
            $('#draw-speed-details').hide();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('black');
        }
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
        }
    });

    /**
     * Draw acceleration button
     */
    $('#draw-acceleration').click(function() {
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-acceleration').is(':checked')) {
            // load absolute feature acceleration data once
            if (!('acceleration' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
                // ajax query to get the absolute feature acceleration
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["b" /* getDatasetFeature */])('acceleration');
            }
            $('#draw-acceleration-details').show();
            $('#draw-speed').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('acceleration');
        } else {
            $('#draw-acceleration-details').hide();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
        }
    });

    /**
     * Draw distance to centroid button
     */
    $('#draw-distance_centroid').click(function() {
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-distance_centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
                // ajax query to get the absolute feature distance_centroid
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["b" /* getDatasetFeature */])('distance_centroid');
            }
            $('#draw-distance_centroid-details').show();
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-midline_offset').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('distance_centroid');
        } else {
            $('#draw-distance_centroid-details').hide();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
        }
    });

    /**
     * Draw midline offset
     */
    $('#draw-midline_offset').click(function() {
        $('.draw-details').hide()
            .find('input:checkbox').prop('checked', true).click();
        if ($('#draw-midline_offset').is(':checked')) {
            // load absolute feature draw-midline_offset data once
            if (!('draw-midline_offset' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
                // ajax query to get the absolute feature midline_offset
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["b" /* getDatasetFeature */])('midline_offset');
            }
            $('#draw-midline_offset-details').show();
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance_centroid').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('midline_offset');
        } else {
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["i" /* setActiveScale */]('black');
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        Object(__WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__["b" /* changeLegend */])();

        if (!$('#play-button').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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

        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
        Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["d" /* getNetworkData */])(network_id);
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
            $('#metadata-input').hide();
        } else {
            $('#metadata-input').show();
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
        $('#metadata-input').hide();
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
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* drawDendrogram */])();
            }
        });
    }

    /**
     * Hierarchy button in network modal on change
     * Load data or remove it
     */
    $('.hiearchy-checkbox').on('change', function() {
        let checkbox = $(this);

        let id = checkbox.attr('data');
        let name = checkbox.attr('name');
        let checked = checkbox.prop('checked');

        if (checked && $('.show-dendrogram').length < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["g" /* maxNumberHierarchies */]) {
            Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* disablePlayButton */])();
            Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getNetworkHierarchyData */])(id);

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["a" /* addHierarchyButton */])(id, name);
            initShowDendrogramListener(id);
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
            Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setHierarchyData"])({}, id);

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["i" /* removeHierarchyButton */])(id);
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
    $('.network-hierarchy-checkbox').on('change', function() {
        // get the info for the clicked button
        let checkbox = $(this);

        // reset all the other active checkboxes
        $('.network-hierarchy-checkbox').prop('checked', false);
        checkbox.prop('checked', true);

        if (checkbox.prop('checked')) {
            // set the network id
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["m" /* setNetworkHierarchy */])(checkbox.attr('data'));
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["d" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["e" /* draw */]();
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
/***/ (function(module, exports) {

// /*eslint-disable no-unused-lets*/
// /*global window, $, parameters */
//
// import {
//     getSuggestedParameters
// } from './ajax_queries.js';
// 
// import {
//     setPlayBoolean
// } from './listener.js';
//
//
// export let trackingBoolean = false; // boolean for active tracking
// let trackedData = [];
//
//
// /**
//  * Set the boolean value if tracking should be activated
//  * @param {Boolean} value - Boolean for active value
//  */
// export function setTrackingBoolean(value) {
//     trackingBoolean = value;
// }
//
// /**
//  * Resets the tracked data
//  */
// export function resetTrackedData() {
//     trackedData = [];
//     trackingBoolean = false;
//     // disable the send button
//     $('#calculate-parameter-button').prop('disabled', true);
// }
//
// /**
//  * Add data to trackedData
//  * @param {Numeric} time - time of the frame
//  * @param {Array} data - Array of animals ids for the specific frame
//  */
// export function addTrackedData(time, ids) {
//     trackedData.push({
//         [time]: JSON.stringify(ids)
//     });
//     // enable the calculation button
//     if ($('#calculate-parameter-button').is(':disabled') && $('#calculate-parameter-button').attr('data') == 0) {
//         $('#calculate-parameter-button').prop('disabled', false);
//     }
// }
//
//
// /**
//  * Send data with a ajax query to the server and wait for the answer
//  */
// export function sendTrackedData() {
//     disableCalculationButton();
//     getSuggestedParameters(JSON.stringify(trackedData));
//     resetTrackedData();
// }
//
// /**
//  * Response of the ajax query - open new tab with values to create network
//  */
// export function responseParameters(data) {
//     setPlayBoolean(false);
//     // open network create url
//     let url = '../../network/new?dataset_id=' + parameters['id'] + '&' + $.param(data['data']['max_params']);
//     // create new tab with the result parameter
//     window.open(url, '_blank');
//     enableCalculationButton();
// }
//
//
// /**
//  * Disable the calculation button -> loading symbol
//  */
// function disableCalculationButton() {
//     $('#calculate-parameter-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
//     $('#calculate-parameter-button').prop('disabled', true);
//     $('#calculate-parameter-button').attr('data', 1);
//
// }
//
// /**
//  * Enable the calculation button remove loading symbol
//  */
// function enableCalculationButton() {
//     $('#calculate-parameter-button').html('<span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>Calculate');
//     $('#calculate-parameter-button').attr('data', 0);
//
// }

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
        Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setIndexTime */])(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
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

    initLineChartButtons(swarm_features);

}

/**
 * Init line chart button listeners
 */
function initLineChartButtons(swarm_features) {
    // add the Line chart buttons to the feature panel
    for (let i = 0; i < swarm_features.length; i++) {
        let capitalized_feature_string = swarm_features[i].split('_').join(' ');
        capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

        $('#line-chart-feature-checkboxes')
            .append('<tr><th> <div class="pretty p-switch p-fill p-bigger"><input type="checkbox" class="line-chart-check-box" id="draw-' +
                swarm_features[i] + '" data="#' + swarm_features[i] + 'Line" /><div class="state"><label>' +
                capitalized_feature_string + '</label></div></div></th></tr>');
    }
    //check line chart draw all lines
    $('#line-chart-feature-checkboxes input[type=checkbox]')
        .prop('checked', true);

    $('.line-chart-check-box').change(function() {
        let checkbox = $(this);
        if (checkbox.prop('checked')) {
            $(checkbox.attr('data')).show();
        } else {
            $(checkbox.attr('data')).hide();
        }
    });
}

/**
 * Line chart details click listener
 */
function initTrendChartListener() {
    $('.draw-details').click(function() {
        if ($(this).find('input:checkbox').prop('checked')) {
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
    $('.line-chart-check-box').attr('disabled', true);
    $('.lineChartLine').attr('visibility', 'hidden');
}

/**
 * Line chart details click listener
 */
function enableLineChart() {
    $('.lineChartButton').prop('checked', true).prop('disabled', false);
    $('.line-chart-check-box').attr('disabled', false);
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
        let num_animals = __WEBPACK_IMPORTED_MODULE_1__explore_js__["animalIds"].length;
        // calculate the percetiles for every time step
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length; i++) {
            let tmp = [];
            for (let j = 0; j < num_animals; j++) {
                if (__WEBPACK_IMPORTED_MODULE_1__explore_js__["dataset"][i * num_animals + j]) {
                    tmp.push(__WEBPACK_IMPORTED_MODULE_1__explore_js__["dataset"][i * num_animals + j][feature]);
                }
            }
            trendChartData.push(Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["g" /* percentilesLineChart */])(tmp));
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
    if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"][Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["f" /* indexTime */] / ratio)]) {
        let tmp = Math.ceil(__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["f" /* indexTime */] / ratio);
        //update the line chart legend text values per second
        if (__WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view__["f" /* indexTime */] % 25 === 0) {
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
    let arrayAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["c" /* arrayAnimals */];
    let activeAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["a" /* activeAnimals */];
    var rect = d3.event.selection;
    //iterate over the 151 fish to check which are in the brush
    for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__explore_js__["animalIds"].length; i++) {
        var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
        //check which fish are in  the brushed area
        if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
            (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
            // Point is in the brush
            activeAnimals.push(arrayAnimals[i]['a']);
        }
    }
    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["h" /* setActiveAnimals */](activeAnimals);
    if (!$('#play-button')
        .hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes
        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["d" /* decIndexTime */]();
        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["e" /* draw */]();
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
                __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["j" /* setIndexTime */](ui.value);
                // if paused apply changes
                if (!$('#play-button').hasClass('active')) {
                    //this applys the changes
                    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["e" /* draw */]();
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
exports.push([module.i, "/* Icons for bootstrap 4 */\r\n\r\n.mdi::before {\r\n    font-size: 24px;\r\n    line-height: 14px;\r\n}\r\n\r\n.btn .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.btn-xs .mdi::before {\r\n    font-size: 18px;\r\n    top: 3px;\r\n}\r\n\r\n.btn-sm .mdi::before {\r\n    font-size: 18px;\r\n    top: 3px;\r\n}\r\n\r\n.dropdown-menu .mdi {\r\n    width: 18px;\r\n}\r\n\r\n.dropdown-menu .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    left: -8px;\r\n}\r\n\r\n.nav .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.navbar .navbar-toggle .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    color: #FFF;\r\n}\r\n\r\n.breadcrumb .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.breadcrumb a:hover {\r\n    text-decoration: none;\r\n}\r\n\r\n.breadcrumb a:hover span {\r\n    text-decoration: underline;\r\n}\r\n\r\n.alert .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.input-group-addon .mdi::before {\r\n    position: relative;\r\n    top: 3px;\r\n}\r\n\r\n.navbar-brand .mdi::before {\r\n    position: relative;\r\n    top: 2px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.list-group-item .mdi::before {\r\n    position: relative;\r\n    top: 3px;\r\n    left: -3px\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.network-background-edges {\r\n    fill-opacity: 0;\r\n    stroke-opacity: 0.25;\r\n    stroke: #737373;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.dendrogram-text {\r\n    font-size: 10em !important;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n.animal-highlight {\r\n    fill: #c51b7d !important;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n#dendrogram-legend {\r\n    margin-left: 20px;\r\n}\r\n\r\n.intersection {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.sym-difference {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.modal-lg {\r\n    max-width: 80%;\r\n}", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGNjYjIyOTE0MmMwN2RmNWU3YzEiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL21ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcz9kZTRjIiwid2VicGFjazovLy8uL2V4cGxvcmUvZXhwbG9yZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQzs7QUFRQTs7QUFFRDtBQUNBOztBQUVBLGlCQUF3QjtBQUN4Qix5QkFBZ0M7QUFDaEMsbUJBQTBCO0FBQzFCLDJCQUFrQztBQUNsQyxxQkFBNEI7QUFDNUIsMEJBQWlDO0FBQ2pDLG1CQUEwQjs7OztBQUkxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25LQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBS0M7O0FBV0E7O0FBS0E7O0FBTUE7O0FBUUE7O0FBSUE7O0FBS0E7O0FBS0E7O0FBSUE7O0FBUUE7O0FBS0E7OztBQUdELGtCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsMEJBQWlDO0FBQ2pDLHNCQUE2QjtBQUM3Qix1QkFBOEI7QUFDOUIsaUJBQXdCOztBQUV4QixpQkFBaUI7QUFDakIsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxzREFBc0QsaUNBQWlDLGVBQWUsYUFBYTs7QUFFbkg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQsMkNBQTJDLHlCQUF5QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQsMkNBQTJDLHlCQUF5QjtBQUNwRSwyQ0FBMkMsdUZBQWdDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxtQ0FBbUMsb0JBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0dBQWtFOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzM1QkE7QUFBQTtBQUNBO0FBS0M7Ozs7QUFJRCx3QkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUFzQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwRUFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUlBO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TUE7QUFBQTtBQUNBO0FBQ0E7O0FBSUM7O0FBUUE7O0FBS0E7O0FBSUE7O0FBRUQsY0FBYztBQUNkO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsOEJBQThCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSwwQkFBMEI7QUFDMUIsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWU7QUFDZixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOThCQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFXQzs7QUFLQTs7QUFNQTs7QUFJQTs7QUFFRDtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxRQUFRO0FBQ1I7QUFDQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9SQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTs7QUFJQzs7QUFLQTs7QUFJQTs7QUFNQTs7O0FBV0E7O0FBUUE7O0FBT0E7O0FBSUE7O0FBUUE7O0FBTUE7O0FBRUQsVUFBVTtBQUNWLHVCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7O0FDdjBCQTtBQUFBO0FBQ0E7O0FBSUM7O0FBSUE7O0FBRUQsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFDQTtBQUNBOztBQUlDOzs7QUFHRCx1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlFQUE0Qjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyR0FBMkc7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbUJBQW1CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseUVBQTRCO0FBQy9DO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFBQTtBQUNBO0FBR0M7O0FBTUE7O0FBSUE7O0FBSUE7OztBQUdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1FQUFzQjtBQUM3QztBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFT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QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZCxrREFBa0Qsc0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJleHBsb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGNjYjIyOTE0MmMwN2RmNWU3YzEiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkICovXHJcbi8vIGltcG9ydCBhbGwganNcclxuaW1wb3J0ICogYXMgcXVlcmllcyBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YVxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldEhpZXJhcmNoeUxldmVsLFxyXG4gICAgcmVtb3ZlSGllcmFyY2h5TGV2ZWwsXHJcbiAgICBzZXRIaWVyYXJjaHlDb2xvcixcclxuICAgIHJlbW92ZUhpZXJhcmNoeUNvbG9yLFxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kXHJcbn0gZnJvbSAnLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuLy8gaW1wb3J0IGNzc1xyXG5pbXBvcnQgJy4vZXhwbG9yZS5jc3MnO1xyXG5cclxuZXhwb3J0IGxldCBkYXRhc2V0ID0gW107IC8vIG1haW4gZGF0YXNldCB3aXRoIHZhbHVlcyBmb3IgZWFjaCBpbmRpdmlkdWFsIGFuaW1hbFxyXG5leHBvcnQgbGV0IGRhdGFzZXRNZXRhZGF0YSA9IFtdOyAvLyBtZXRhZGF0YXNldCBmb3IgZWFjaCBpbmRpdmlkdWFsIGZpc2hcclxuZXhwb3J0IGxldCBzd2FybURhdGEgPSBbXTsgLy8gc3dhcm1kYXRhIGZvciBsaW5lY2hhcnQgYW5kIGFsc28gb3RoZXIgc3dhcm0gZmVhdHVyZXNcclxuZXhwb3J0IGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IHt9OyAvLyBwZWNlbnRpbGVzIG5lZWRlZCBmb3IgdGhlIGNvbG9yIG1hcHBpbmdcclxuZXhwb3J0IGxldCBuZXR3b3JrRGF0YSA9IHt9OyAvLyBuZXR3b3JrIGRhdGFcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5ID0ge307IC8vIG5ldHdvcmsgaGllcmFyY2h5IGRhdGFcclxuZXhwb3J0IGxldCBhbmltYWxJZHMgPSB7fTsgLy8gZGlzdGluY3QgYW5pbWFsIGlkc1xyXG5cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBiYXNpYyBkYXRhIHRvIGdldCB0aGUgdG9vbCBydW5uaW5nLlxyXG4gKiBhZnRlciB0aGUgcGVuZGluZyBhamF4IHF1ZXJpZXMgYXJlIGZpbmlzaGVkXHJcbiAqIHRoZSB0b29sIGlzIGRyYXduXHJcbiAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbW92ZW1lbnQgZGF0YVxyXG4gICAgcXVlcmllcy5zdHJlYW1Nb3ZlbWVudERhdGEoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGRhdGFTZXRQZXJjZW50aWxlXHJcbiAgICBxdWVyaWVzLmdldFBlcmNlbnRpbGUoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGRpc3RpbmN0IGFuaW1hbCBpZHMgZm9yIHRoZSB3aG9sZSBkYXRhc2V0XHJcbiAgICBxdWVyaWVzLmdldEFuaW1hbElkcygpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhQnV0dG9uKCk7XHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQ29uY2FjdCB0byB0aGUgbWFpbiBkYXRhc2V0XHJcbiAqIHRoZSBpZGVhIGlzIHRvIHVzZSB0aGlzIG9uZSBkYXkgZm9yIGxhenkgbG9hZGluZ1xyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIG1vdmVtZW50IGRhdGFzZXRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRhc2V0KHZhbHVlKSB7XHJcbiAgICBkYXRhc2V0ID0gZGF0YXNldC5jb25jYXQodmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGRhdGFzZXQgcGVyY2VudGlsZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIGFycmFyeXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhU2V0UGVyY2VudGlsZSh2YWx1ZSkge1xyXG4gICAgZGF0YVNldFBlcmNlbnRpbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IG1ldGFkYXRhXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZXRhRGF0YSh2YWx1ZSkge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhID0gdmFsdWU7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBzd2FybSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBzd2FybSB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIHN3YXJtRGF0YVtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3dhcm1EYXRhLnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaW50ZWdlciBvciBmbG9hdFxyXG4gICAgICAgIGlmIChkYXRhW2ldICYmICEoaXNOYU4oZGF0YVtpXSkpKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YVtpXVtmZWF0dXJlXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlzIHN0cmluZ1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSBkYXRhW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBuZXcgZmVhdHVyZSBkaW1lbnNpb24gdG8gdGhlIGRhdGFzZXRcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIGZlYXR1cmVzIHZhbHVlcyBjb25zaXN0aW5nIG9mIFtmZWF0dXJlXzAsIGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YXNldEZlYXR1cmUoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gYWRkIHRoZSB0aGUgb2JqZWN0IHRvIHRoZSBhcnJheSBpZiB0aGVyZSBpcyBubyBlbGVtZW50IHlldFxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YXNldFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGFyc2UgdGhlIGludFxyXG4gICAgICAgIGRhdGFzZXRbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHRoZSBjYWxjdWxhdGVkIGFkamFjZW5jeSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrRGF0YSh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0RhdGEgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBoaWVhcmhjeSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeURhdGEodmFsdWUsIG5ldHdvcmtfaWQpIHtcclxuICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGVtcHR5IHJlbW92ZSB0aGUgZWxlbWVudCBmcm9tIHRoZSBuZXR3cm9rSGllcmFyY2h5IG9iamVjdFxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDAgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgIGRlbGV0ZSBuZXR3b3JrSGllcmFyY2h5WydoJyArIG5ldHdvcmtfaWRdO1xyXG4gICAgICAgIHJlbW92ZUhpZXJhcmNoeUxldmVsKG5ldHdvcmtfaWQpO1xyXG4gICAgICAgIHJlbW92ZUhpZXJhcmNoeUNvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgfSAvLyBhZGQgaXQgdG8gdGhlIG5ldHdvcmsgaGllcmFyY2h5XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBuZXR3b3JrSGllcmFyY2h5WydoJyArIG5ldHdvcmtfaWRdID0gdmFsdWU7XHJcbiAgICAgICAgc2V0SGllcmFyY2h5TGV2ZWwobmV0d29ya19pZCwgMik7XHJcbiAgICAgICAgc2V0SGllcmFyY2h5Q29sb3IobmV0d29ya19pZCk7XHJcbiAgICB9IC8vIHRvbyBtYW55IGVsZW1lbnRzIGNhbnQgYmUgYWRkZWRcclxuXHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBhbmltYWwgaWRzIGRhdGFzZXRcclxuICogQHBhcmFtIHthcnJheX0gaWRzIC0gQXJyYXkgb2YgYWxsIGRpc3RpbmN0IGFuaW1hbCBpZHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbmltYWxJZHModmFsdWUpIHtcclxuICAgIGFuaW1hbElkcyA9IHZhbHVlO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCxkMywgcGFyYW1ldGVycywgU2V0ICovXHJcbid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXQsXHJcbiAgICBuZXR3b3JrRGF0YSxcclxuICAgIHN3YXJtRGF0YVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtDb2xvclNjYWxlLFxyXG4gICAgbmV0d29ya0F1dG8sXHJcbiAgICBzZXROZXR3b3JMaW1pdCxcclxuICAgIG5ldHdvcmtMaW1pdCxcclxuICAgIHNob3dOZXR3b3JrSGllcmFyY2h5LFxyXG4gICAgbmV0d29ya0lELFxyXG4gICAgbmV0d29ya0JhY2tncm91bmQsXHJcbiAgICBuZXR3b3JrQmFja2dyb3VuZExpbWl0XHJcbn0gZnJvbSAnLi4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbGluZUNoYXJ0LFxyXG4gICAgdXBkYXRlTGluZUNoYXJ0XHJcbn0gZnJvbSAnLi4vbGluZV9jaGFydCc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXMsXHJcbiAgICBtYWtlUmVzaXphYmxlLFxyXG4gICAgZGVmYXVsdENvbmZpZ1xyXG59IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFRpbWVTbGlkZXIsXHJcbiAgICBpbml0VG9vbHRpcCxcclxuICAgIHRvb2x0aXBGdW5jdGlvbixcclxuICAgIGluaXRTbGlkZXJzLFxyXG4gICAgdG9vbHRpcFxyXG59IGZyb20gJy4vaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3JcclxufSBmcm9tICcuLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdENvbG9yUGlja2VyLFxyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0TGlzdGVuZXJzLFxyXG4gICAgcGxheUJvb2xlYW5cclxufSBmcm9tICcuLi9saXN0ZW5lci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0RGVuZHJvZ3JhbSxcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbmV0d29ya0hpZXJhcmNoeUlkcyxcclxuICAgIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYsXHJcbiAgICByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXZcclxufSBmcm9tICcuLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHRyYWNraW5nQm9vbGVhbixcclxuICAgIGFkZFRyYWNrZWREYXRhXHJcbn0gZnJvbSAnLi4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCBpbmRleFRpbWUgPSAwOyAvLyBhY3R1YWwgdGltZSBtb21lbnQgaW4gdGhlIGFuaW1hdGlvblxyXG5leHBvcnQgbGV0IHRhbmtXaWR0aDtcclxuZXhwb3J0IGxldCB0YW5rSGVpZ2h0O1xyXG5leHBvcnQgbGV0IGFjdGl2ZVNjYWxlID0gJ2JsYWNrJzsgLy8gY2FuIGJlIHNwZWVkLCBhY2NlbGVyYXRpb24sIC4uIGFuZCBibGFjayAobWVhbmluZyBubyBhY3RpdmUgc2NhbGUpXHJcbmV4cG9ydCBsZXQgbWVkb2lkQW5pbWFsID0gLTE7IC8vIHdoaWNoIGFuaW1hbCBpcyB0aGUgbWVkb2lkICgtMSBpcyBubyBhbmltYWwpXHJcbmV4cG9ydCBsZXQgYWN0aXZlQW5pbWFscyA9IFtdOyAvLyBhY3RpdmUgc2VsZWN0ZWQgYW5pbWFsc1xyXG5leHBvcnQgbGV0IGFycmF5QW5pbWFsczsgLy8gYXJyYXkgb2YgYW5pbWFscyBmb3IgdGhlIHNwZWNpZmljIHRpbWUgZnJhbWVcclxuXHJcbmxldCBzdmdDb250YWluZXI7IC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBzcGF0aWFsIHZpZXdcclxubGV0IHRhbms7IC8vIHN2ZyBncm91cCBmb3IgdGhlIHNwYXRpYWwgdmlldyB0YW5rXHJcbmxldCBuZXR3b3JrQmFrRGF0YSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHNwYXRpYWwgdmlldyB3aXRoIGFsbCB0aGUgaW1wb3J0YW50IGZhY3RvcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcGF0aWFsVmlld0luaXQoKSB7XHJcblxyXG4gICAgbGV0IG1pblBvaW50ID0gcGFyYW1ldGVyc1snbWluJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICBsZXQgbWF4UG9pbnQgPSBwYXJhbWV0ZXJzWydtYXgnXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIC8vIGxldCBjb29yZGluYXRlT3JpZ2luID0gcGFyYW1ldGVyc1snY29vcmRpbmF0ZV9vcmlnaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIC8vIHdpZHRoID0gd2lkdGggKjEuMDIgLS0+IHNvIHRoZXJlIGlzIGEgbWFyZ2luIGluIHRoZSBzcGF0aWFsIHZpZXcgd2hlcmUgbm8gYW5pbWFsIGlzIGV2ZXJcclxuICAgIHRhbmtXaWR0aCA9IChtYXhQb2ludFswXSAtIG1pblBvaW50WzBdKSAqIDEuMDI7XHJcbiAgICB0YW5rSGVpZ2h0ID0gKG1heFBvaW50WzFdIC0gbWluUG9pbnRbMV0pICogMS4wMjtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSB2aWV3IHJlc2l6YWJsZVxyXG4gICAgbWFrZVJlc2l6YWJsZSgpO1xyXG5cclxuICAgIC8vIHJlc2V0IGFsbCBjaGVja2JveGVzIGFuZCBoaWRlIGljb25zXHJcbiAgICBkZWZhdWx0Q29uZmlnKCk7XHJcblxyXG4gICAgLy9YIGFuZCBZIGF4aXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKTtcclxuXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgIC50aWNrcyg3KVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgLy8gWk9PTUlORyBBTkQgUEFOTklORyBTVFVGRlxyXG4gICAgLy8gVE9ETyByZW1vdmUgdGhpcyBmcm9tIGhlcmUgdG8gaW50ZXJhY3Rpb25cclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgNl0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICAvLyBtb2RpZnkgdGhlIHRyYW5zbGF0ZSBzbyB0aGF0IGl0IG5ldmVyIGV4aXRzIHRoZSB0YW5rXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgdGFua1dpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rV2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgdGFua0hlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua0hlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVYKHgpKSk7XHJcbiAgICAgICAgICAgIGdZYXhpcy5jYWxsKHlBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWSh5KSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vdGhlIHN2ZyBjb250YWluZXJcclxuICAgIHN2Z0NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI21haW4tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG5cclxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvLCBmb3IgIDEyNDAvMTkwMCA9IDAuNjUgc28gcGFkZGluZy1ib3R0b20gPSA2NSUgKi9cclxuICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCh0YW5rSGVpZ2h0IC8gdGFua1dpZHRoKSAqIDEwMCk7XHJcbiAgICAkKCcjbWFpbi12aXMnKS5hcHBlbmQoJCgnPHN0eWxlPiNtYWluLXZpczo6YWZ0ZXIge3BhZGRpbmctdG9wOiAnICsgcGVyY2VudGFnZSArICclO2Rpc3BsYXk6IGJsb2NrO2NvbnRlbnQ6IFwiXCI7fTwvc3R5bGU+ICcpKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzdmdDb250YWluZXIuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAvLyAgLmF0dHIoJ2QnLHBhdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4bGluazpocmVmJywgJy8nICsgcGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFja2dyb3VuZEltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRhbmtXaWR0aClcclxuICAgICAgICAgICAgLy8gd2hpbGUgYWRkaW5nIGFuIGltYWdlIHRvIGFuIHN2ZyB0aGVzZSBhcmUgdGhlIGNvb3JkaW5hdGVzIGkgdGhpbmsgb2YgdGhlIHRvcCBsZWZ0XHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ2JhY2tncm91bmQnLCAnI2ZmZicpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgdGFuayBncm91cCB3aXRoIGEgdHJhbnNmb3JtYXRpb24gd2hpY2ggcm90YXRlcyB0aGUgeSBheGlzXHJcbiAgICB0YW5rID0gem9vbUdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0YW5rJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gMTtcclxuICAgICAgICAgICAgbGV0IHkgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF94KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeSkge1xyXG4gICAgICAgICAgICAgICAgeSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnc2NhbGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYWRkIHRoZSBjZW50cm9pZFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjZW50cm9pZCcpXHJcbiAgICAgICAgLmF0dHIoJ3InLCA2KVxyXG4gICAgICAgIC5hdHRyKCdjeCcsIDApXHJcbiAgICAgICAgLmF0dHIoJ2N5JywgMCk7XHJcblxyXG4gICAgLy8gYXJyb3cgZm9yIHRoZSBjZW50cm9pZCBkaXJlY3Rpb25cclxuICAgIHRhbmsuc2VsZWN0KCcjZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdjZW50cm9pZC1hcnJvdycpXHJcbiAgICAgICAgLmF0dHIoJ3JlZlgnLCAyKVxyXG4gICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCAnTTIsMiBMMiwxMSBMMTAsNiBMMiwyJyk7XHJcblxyXG4gICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdjZW50cm9pZC1saW5lJylcclxuICAgICAgICAuYXR0cignbWFya2VyLWVuZCcsICd1cmwoI2NlbnRyb2lkLWFycm93KScpO1xyXG5cclxuICAgICQoJyNnLWNlbnRyb2lkJykuaGlkZSgpO1xyXG4gICAgLy9hcHBlbmQgbmV0d29yayAgZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbmV0d29ya0dyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgZGVsYXVuYXktdHJpYW5ndWxhdGlvbiBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdm9yb25vaSBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd2b3Jub2lHcm91cCcpO1xyXG5cclxuICAgIC8vYXBwZW5kIHRoZSBmcmFtZSB0aW1lIHRleHRcclxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdmcmFtZS10ZXh0JylcclxuICAgICAgICAuYXR0cigneCcsIDMwKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMzApXHJcbiAgICAgICAgLnRleHQoJy0tIDogLS0gOiAtLSAnKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgbGV0IGdZYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxyXG4gICAgICAgIC5jYWxsKHlBeGlzKTtcclxuXHJcbiAgICAvLyBpbml0IHN0dWZmIGZyb20gb3RoZXIgbW9kdWxlc1xyXG4gICAgaW5pdFRvb2x0aXAoKTtcclxuICAgIGluaXRTbGlkZXJzKCk7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwKCk7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIoKTtcclxuICAgIGxpbmVDaGFydCgpO1xyXG4gICAgaW5pdExpc3RlbmVycygpO1xyXG4gICAgaW5pdERlbmRyb2dyYW0oKTtcclxuICAgIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXdpbmcgZnVuY3Rpb24gLSBpcyBjYWxsZWQgZm9yIGVhY2ggdGltZXN0ZXBcclxuICogaW5kZXhUaW1lIHNhdmVzIHRoZSBjdXJyZW50IHRpbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lIG9mIGZ1bmN0aW9uIGRyYXdcclxuICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIC8vdXBkYXRlIHRpbWUgdG8gd2FpdCBha2Egc3BlZWQgb2YgcmVwbGF5XHJcbiAgICBsZXQgdGltZVRvV2FpdCA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1wbGF5YmFjay1yYXRlOmNoZWNrZWQnKVxyXG4gICAgICAgIC52YWwoKTtcclxuICAgIC8vc2NhbGUgdGhlIHNpemUgYnkgdGhpcyBudW1iZXJcclxuICAgIGxldCBhbmltYWxTY2FsZSA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1zaXplOmNoZWNrZWQnKVxyXG4gICAgICAgIC52YWwoKTtcclxuXHJcbiAgICAvL2dldCB0aGUgbmV4dCBhbmltYWxzXHJcbiAgICBhcnJheUFuaW1hbHMgPSBkYXRhc2V0LmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRbJ3QnXSA9PT0gaW5kZXhUaW1lO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vdGhlIHRpbWVvdXQgaXMgc2V0IGFmdGVyIG9uZSB1cGRhdGUgMzAgbXNcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGRyYXcgaGllcmFyY2h5XHJcbiAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSB0aW1lIGZyYW1lIHRleHRcclxuICAgICAgICAgICAgc3ZnQ29udGFpbmVyLnNlbGVjdCgnLmZyYW1lLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoTWF0aC5mbG9vcihpbmRleFRpbWUgLyAxNTAwKSAlIDYwICsgJzonICsgTWF0aC5mbG9vcihpbmRleFRpbWUgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyBpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGEgc2Vjb25kIGhhcyBjaGFuZ2VkIG1vdmUgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVTbGlkZXIoaW5kZXhUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN2Z0FuaW1hbHMgPSB0YW5rLnNlbGVjdEFsbCgnZy5hbmltYWwnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoYXJyYXlBbmltYWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5ldHdvcmsgdmlzXHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVmlzO1xyXG4gICAgICAgICAgICBsZXQgbmV0d29ya1Zpc0JhaztcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSBpbiBuZXR3b3JrRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmsgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBuZXR3b3JrRGF0YVtpbmRleFRpbWVdO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGdyb3VwIHN0YW5kYXJkIGRldmlhdGlvbiBmb3IgdGhlIGhpZXJhcmhjeVxyXG4gICAgICAgICAgICAgICAgLy8gbmVlZGVkIGZvciBjb2xvcmluZyBvZiB0aGUgZGVuZHJvZ3JhbSBub2RlcyAodmFyaWFjbmUgKVxyXG4gICAgICAgICAgICAgICAgcmVzZXRoaWVyYXJjaHlHcm91cFN0ZGV2KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSB3aG9sZSBuZXR3b3JrXHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd05ldHdvcmtIaWVyYXJjaHkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTInOiBhcnJheUFuaW1hbHNbal1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhcnQnOiBhcnJheUFuaW1hbHNbaV1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHRtcFt0bXBfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IC8vIGRpc3BsYXkgdGhlIG5ldHdvcmsgb25seSBpbiB0aGUgY2x1c3RlcmluZ1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3dfZGVuZHJvZ3JhbSA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbmV0d29ya0hpZXJhcmNoeUlkcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrSGllcmFyY2h5SWRzW2tdLmluY2x1ZGVzKGFycmF5QW5pbWFsc1tpXVsnYSddKSAmJiBuZXR3b3JrSGllcmFyY2h5SWRzW2tdLmluY2x1ZGVzKGFycmF5QW5pbWFsc1tqXVsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXR3b3JrSGllcmFyY2h5SWRzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMSc6IGFycmF5QW5pbWFsc1tpXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUyJzogYXJyYXlBbmltYWxzW2pdWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhcnQnOiBhcnJheUFuaW1hbHNbaV1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbmQnOiBhcnJheUFuaW1hbHNbal1bJ3AnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWwnOiB0bXBbdG1wX2luZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdHJ1ZSBkZXBpY3QgdGhlIHN0YW5kYXJkIGRldmlhdGlvbiB2aWEgY29sb3IgaW4gdGhlIGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBtYWtlIHRoaXMgZmFzdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG93X2RlbmRyb2dyYW0gJiYgaWQgPT09IG5ldHdvcmtJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0aGllcmFyY2h5R3JvdXBTdGRldignaCcgKyBuZXR3b3JrSGllcmFyY2h5SWRzW2tdLnRvU3RyaW5nKCkuaGFzaENvZGUoKSwgdG1wW3RtcF9pbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2luZGV4ID0gdG1wX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoKCcjbWMtJyArIGRbJ25vZGUxJ10gKyAnLScgKyBkWydub2RlMiddKSkuY3NzKCdmaWxsJywgbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMiddICsgJy0nICsgZFsnbm9kZTEnXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV0d29ya0F1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldHdvcmsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyYXkucHVzaChuZXR3b3JrW2ldWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldE5ldHdvckxpbWl0KHBlcmNlbnRpbGVzKHRtcEFycmF5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrID0gbmV0d29yay5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXSA8PSBuZXR3b3JrTGltaXQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTlxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0KCcjbmV0d29ya0dyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKG5ldHdvcmspO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVJcclxuXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmV0d29yay1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3ZhbCddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgdGhlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGRhdGEgZnJvbSB0aGUgbmV0d29yayBkYXRhc2V0IGluIGEgdGVtcCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wX2RhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gJ2QtJyArIGRbJ25vZGUxJ10gKyAnLScgKyBkWydub2RlMiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBfZGF0YVtrZXldID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9kYXRhW2tleV1bJ3N0YXJ0J10gPSBkWydzdGFydCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBfZGF0YVtrZXldWydlbmQnXSA9IGRbJ2VuZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlY3JlYXNlIHRoZSBlZGdlIGluIG5ldHdvcmtCYWNrZ3JvdW5kIGJ5IDFcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhlIGJhY2tncm91bmQgZWRnZSBpZiBuZWNlc3NhcnlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV0d29ya0Jha0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRtcF9kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0cm9rZSddIDw9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbmV0d29ya0Jha0RhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Jha0RhdGFba2V5XVsnc3Ryb2tlJ10gPSBuZXR3b3JrQmFrRGF0YVtrZXldWydzdHJva2UnXSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkcyA9IGtleS5zcGxpdCgnLScpLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHNbMF0gPT0gYXJyYXlBbmltYWxzW2ldWydhJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0YXJ0J10gPSBhcnJheUFuaW1hbHNbaV1bJ3AnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpZHNbMV0gPT0gYXJyYXlBbmltYWxzW2ldWydhJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV1bJ2VuZCddID0gYXJyYXlBbmltYWxzW2ldWydwJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgZWRnZSBpbiBuZXR3b3JrQmFja2dyb3VuZCBieSAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9uZ2VyIGxhc3RpbmcgY29ubmVjdGlvbiB0aGUgYmFja2dyb3VuZCBlZGdlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRtcF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleSBpbiBuZXR3b3JrQmFrRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gbmV0d29ya0Jha0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQmFrRGF0YVtrZXldWydzdHJva2UnXSA8PSAxMCB8fCBuZXR3b3JrQmFrRGF0YVtrZXldWydzdHJva2UnXSA8PSAyICogbmV0d29ya0JhY2tncm91bmRMaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhW2tleV1bJ3N0cm9rZSddID0gbmV0d29ya0Jha0RhdGFba2V5XVsnc3Ryb2tlJ10gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Jha0RhdGFba2V5XVsnc3RhcnQnXSA9IHRtcF9kYXRhW2tleV1bJ3N0YXJ0J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrQmFrRGF0YVtrZXldWydlbmQnXSA9IHRtcF9kYXRhW2tleV1bJ2VuZCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa2V5ICsgXCIgLT4gXCIgKyBwW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Jha0RhdGFba2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlJzogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhcnQnOiB0bXBfZGF0YVtrZXldWydzdGFydCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbmQnOiB0bXBfZGF0YVtrZXldWydlbmQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IE9iamVjdC52YWx1ZXMobmV0d29ya0Jha0RhdGEpLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdHJva2UnXSA+IG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNCYWsgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1iYWNrZ3JvdW5kLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoZmlsdGVyZWREYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVVBEQVRFXHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya1Zpc0Jha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGRbJ3N0cm9rZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGRbJ3N0cm9rZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9FTlRFUlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNCYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrLWJhY2tncm91bmQtZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ2VuZCddWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsnZW5kJ11bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGRbJ3N0cm9rZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGRbJ3N0cm9rZSddIC0gbmV0d29ya0JhY2tncm91bmRMaW1pdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNCYWsgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1iYWNrZ3JvdW5kLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtCYWtEYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc0JhayA9IHRhbmsuc2VsZWN0KCcjbmV0d29ya0dyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstYmFja2dyb3VuZC1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya0Jha0RhdGEgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gbmV0d29ya1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzQmFrLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsYXVuYXkgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsndHJpYW5ndWxhdGlvbiddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9yb25vaVxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFua1xyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShzd2FybURhdGFbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Zvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2b3Jvbm9pLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9FTlRFUiAtIGFwcGVuZCB0aGUgYW5pbWFsIGdyb3Vwc1xyXG4gICAgICAgICAgICBsZXQgYW5pbWFsR3JvdXBpbmdzID0gc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhbmltYWwtJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBjaXJjbGVzIGZvciBlYWNoIGFuaW1hbCB0byB0aGUgYW5pbWFsZ3JvdXBcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgMS41ICogYW5pbWFsU2NhbGUpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEZ1bmN0aW9uKGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIG9uIGNsaWNrIGZvciB0aGUgYWN0aXZlIGZpc2hzXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQW5pbWFscyA9IGFjdGl2ZUFuaW1hbHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVQREFURSAtIGFuaW1hbHMgY2lyY2xlc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGFuaW1hbFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBmb3IgZWFjaCBncm91cCB0aGUgYXJyb3csIG5lZWRlZCBmb3IgY29sb3JpbmdcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJvdy1tYXJrZXItJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3NcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCNhcnJvdy1tYXJrZXItJyArIGRbJ2EnXSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9leGVjdXRlIG9ubHkgd2hlbiBkcmF3IGRpcmVjdGlvbiBidXR0b24gaXMgY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ3AnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ3AnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLWRbJ2RpcmVjdGlvbiddICsgJyAnICsgZFsncCddWzBdICsgJyAnICsgLWRbJ3AnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgJCgnLmFycm93JykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdGhlIGdyb3Vwc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db252ZXggaHVsbFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgdmFyIGh1bGxQYXRoID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NvbnZleF9odWxsJ11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSBodWxsIHBhdGhcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVOVEVSIC0gaHVsbCBwYXRoc1xyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGguZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdodWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3IG5vIGh1bGxcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoID0gdGFuay5zZWxlY3QoJ3BhdGguaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBmaXNoXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgZXZlcnkgZmlzaCBibGFja1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChtZXRhZGF0YUNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhQ29sb3IpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjYW5pbWFsLScgKyBrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBtZXRhZGF0YUNvbG9yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgbWV0YWRhdGFDb2xvcltrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdHJhY2tpbmcgaXMgb25cclxuICAgICAgICAgICAgICAgIGlmICh0cmFja2luZ0Jvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRUcmFja2VkRGF0YShhcnJheUFuaW1hbHNbMF1bJ3QnXSwgYWN0aXZlQW5pbWFscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykgJiZcclxuICAgICAgICAgICAgICAgIHN3YXJtRGF0YVtpbmRleFRpbWVdLmNlbnRyb2lkICYmXHJcbiAgICAgICAgICAgICAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydkaXJlY3Rpb24nXSArICcgJyArIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgJyAnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1lZG9pZFxyXG4gICAgICAgICAgICBpZiAobWVkb2lkQW5pbWFsICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1lZG9pZEFuaW1hbCA9IHN3YXJtRGF0YVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9uZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIGluZGV4VGltZSsrO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlTGluZUNoYXJ0KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jaGVjayBpZiBwbGF5IGJ1dHRvbiBpcyBhY3RpdmUgYW5kIGlmIHRoZSBhbmltYXRpb24gaXMgbm90IGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgPj0gc3dhcm1EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9zdGFydCBhZ2FpbiBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5Qm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lXHJcbiAgICAgICAgICAgICAgICAvLyAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0MSAtIHQwKTsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWVUb1dhaXQpO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBpbmRleCB0aW1lIHRvIGEgbmV3IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB0aW1lIHN0ZXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJbmRleFRpbWUodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIChpbmRleFRpbWUgPD0gc3dhcm1EYXRhLmxlbmd0aCkpIHtcclxuICAgICAgICBpbmRleFRpbWUgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlY3JlYXNlIHRpbWUgYnkgMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY0luZGV4VGltZSgpIHtcclxuICAgIGluZGV4VGltZSA9IGluZGV4VGltZSAtIDE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHRoZSBuZXcgYWN0aXZlIHNjYWxlIC0gZS5nLiBzcGVlZCwgYWNjZWxlcmF0aW9uLCBibGFjayBldGMuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSAtIGFjdGl2ZSBzY2FsZSBmb3IgdGhlIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVNjYWxlKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVTY2FsZSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXcgbWVkb2lkIGFuaW1hbFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBVbmlxdWUgaWQgb2YgdGhlIGFuaW1hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1lZG9pZEFuaW1hbCh2YWx1ZSkge1xyXG4gICAgbWVkb2lkQW5pbWFsID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNlbGVjdGVkIGFuZCBoaWdobGlnaHRlZCBhbmltYWxzXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXkgb2YgdW5xaXVlIGlkIG9mIHRoZSBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlQW5pbWFscyh2YWx1ZSkge1xyXG4gICAgYWN0aXZlQW5pbWFscyA9IHZhbHVlO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgZDMgKi9cclxuaW1wb3J0IHtcclxuICAgIGhpZXJhcmNoeUNvbG9ycyxcclxuICAgIGNvbG9ycyxcclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZFxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGxldCBuZXR3b3JrQXV0byA9IGZhbHNlOyAvLyBpZiB0cnVlIHRoZSBuZXR3b3JrIGVkZ2UgbGltaXQgaXMgYXV0b21hdGljYWxseSBzdWdnZXN0ZWRcclxuZXhwb3J0IGxldCBuZXR3b3JrTGltaXQgPSAwLjU7XHJcbmV4cG9ydCBsZXQgc2hvd05ldHdvcmtIaWVyYXJjaHk7XHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yID0ge307XHJcbmV4cG9ydCBsZXQgbmV0d29ya0lEO1xyXG5leHBvcnQgbGV0IG5ldHdvcmtCYWNrZ3JvdW5kID0gdHJ1ZTtcclxuZXhwb3J0IGxldCBuZXR3b3JrQmFja2dyb3VuZExpbWl0ID0gMTsgLy9kcmF3IGJhY2tncm91bmQgbGluZSBpZiBsaW1pdCBpcyBleGNlZWRlZFxyXG4vLyBmaXhlZCBjb2xvciBzY2FsZSBmb3IgdGhlIG5ldHdvcmtcclxuXHJcbi8qKlxyXG4gKiBjb2xvciBzY2FsZSBmb3IgbmV0d29yayAtIHJhbmdlIGlzIGRlZmluZWQgZHluYW1pYyBiYXNlZCBvbiB0aGUgaGllcmFyaGN5IGNvbG9yXHJcbiAqL1xyXG5leHBvcnQgbGV0IG5ldHdvcmtDb2xvclNjYWxlID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgLmRvbWFpbihcclxuICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgICk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgbmV0d29yayAgc2VsZWN0IGJ1dHRvbnMgYW5kIGhpZXJhcmNoeSBjaGVja2JveGVzIHRvIHRoZSBuZXR3b3JrIG1vZGFsXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBuZXR3b3JrIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGROZXR3b3JrQnV0dG9ucyhkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFbaV1bJ2ZpbmlzaGVkJ10pIHtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3Jrcy1oaWVyYXJjaGllcy10YWJsZSB0Ym9keScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPHRyPjx0ZD4nICsgZGF0YVtpXVsnbmFtZSddICsgJzwvdGQ+ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHRkPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGE9JyArIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICcgbmFtZT0nICsgZGF0YVtpXVsnbmFtZSddICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJz48c3BhbiBjbGFzcz1cIm1kaSBtZGktZ3JhcGhxbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2J1dHRvbj48L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD48ZGl2IGNsYXNzPVwicHJldHR5IHAtc3dpdGNoIHAtZmlsbFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImhpZWFyY2h5LWNoZWNrYm94XCIgZGF0YT1cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduZXR3b3JrX2lkJ10gKyAnXCIgbmFtZT1cIicgKyBkYXRhW2ldWyduYW1lJ10gKyAnXCI+PGRpdiBjbGFzcz1cInN0YXRlIHAtc3VjY2Vzc1wiPjxsYWJlbD48L2xhYmVsPjwvZGl2PjwvZGl2PjwvdGQ+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8dGQ+PGRpdiBjbGFzcz1cInByZXR0eSBwLXN3aXRjaCBwLWZpbGxcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJuZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveFwiIGRhdGE9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJ1wiPjxkaXYgY2xhc3M9XCJzdGF0ZSBwLXN1Y2Nlc3NcIj48bGFiZWw+PC9sYWJlbD48L2Rpdj48L2Rpdj48L3RkPicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjbmV0d29ya3MtaGllcmFyY2hpZXMtdGFibGUnKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdUaGVyZSBpcyBubyBuZXR3b3JrIGRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgYXV0byB2YWx1ZSAtIGlmIHRydWUgdGhhbiB0aGUgbmV0d29yayBsaW1pdCBpcyBzZXQgdG8gdGhlIDAuOTUgcGVyY2VudGlsZSBvZiBhbGwgdmFsdWVzXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrQXV0byh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0F1dG8gPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBsaW1pdCB3aXRoIHRoZSBzcGVjaWZpYyBuZXR3b3JrIHNsaWRlciAtIGN1c3RvbVxyXG4gKiAwID0gc2ltaWxhciBhbmQgMSB1bnNpbWlsYXIgZm9yIHRoZSBzcGVjaWZpYyB0aW1lIG1vbWVudFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBiZXR3ZWVuIDAgYW5kIDFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JMaW1pdCh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0xpbWl0ID0gMSAtIHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGluIGhpZXJhcmNoeSAoZS5nLiBoMCkgZmlsdGVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWVyYXJjaHkgLSBlLmcuIDAtblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtIaWVyYXJjaHkodmFsdWUpIHtcclxuICAgIHNob3dOZXR3b3JrSGllcmFyY2h5ID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbmV0d29yayBpZCAtIG5lZWRlZCBmb3IgaGllcmFyY2h5IHN0YW5kYXJkIGRldmlhdGlvbiBjb2xvcmluZ1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBlLmcuIDAtblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtJRCh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0lEID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgbmV0d29yayBjb2xvciBzY2FsZSByYW5nZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgLSBpZCBvZiB0aGUgbmV0d29ya1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldG5ldHdvcmtDb2xvcihuZXR3b3JrX2lkKSB7XHJcbiAgICAvLyBpZiBpZCA9IC0xIHNldCB0aGUgY29sb3IgdG8gbm90aGluZ1xyXG4gICAgaWYgKG5ldHdvcmtfaWQgPj0gMCkge1xyXG4gICAgICAgIC8vIHJlc2V0IGNvbG9yIG9mIHRoZSBlZGdlc1xyXG4gICAgICAgIG5ldHdvcmtDb2xvciA9IHt9O1xyXG5cclxuICAgICAgICAvLyBoaWVyYXJjaHkgY29sb3JzIHdoaWNoIGFyZSBhbHJlYWR5IGluIHVzYWdlXHJcbiAgICAgICAgbGV0IHRtcENvbG9yID0gW107XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29sb3JcclxuICAgICAgICAvLyBzZWFyY2ggaW4gdGhlIGhpZXJhcnlDb2xvcnMgaWYgYSBjb2xvciB3YXMgZGVmaW5lZCBmb3IgdGhlIG5ldHdvcmsgaWRcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaGllcmFyY2h5Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gKCdoJyArIG5ldHdvcmtfaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya0NvbG9yWydoJyArIG5ldHdvcmtfaWRdID0gaGllcmFyY2h5Q29sb3JzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcENvbG9yLnB1c2goaGllcmFyY2h5Q29sb3JzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHRoZSB0aGUgbmV0d29ya0NvbG9yIGlzIHN0aWxsIGVtcHR5IGNob29zZSBhIGNvbG9yXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNvbG9yIGlzIGFscmVhZHkgaW4gdXNhZ2UsIGlmIHNvIHNraXBcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV0d29ya0NvbG9yKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0bXBDb2xvci5pbmRleE9mKGNvbG9yc1tpXSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya0NvbG9yWydoJyArIG5ldHdvcmtfaWRdID0gY29sb3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoYW5nZSB0aGUgY29sb3Igc2NhbGVcclxuICAgICAgICBsZXQgdG1wID0gbmV0d29ya0NvbG9yWydoJyArIG5ldHdvcmtfaWRdO1xyXG4gICAgICAgIG5ldHdvcmtDb2xvclNjYWxlXHJcbiAgICAgICAgICAgIC5yYW5nZShbZDMuY29sb3IodG1wKS5kYXJrZXIoWzVdKSwgZDMuY29sb3IodG1wKS5kYXJrZXIoWzRdKSwgZDMuY29sb3IodG1wKS5kYXJrZXIoWzNdKSwgZDMuY29sb3IodG1wKS5kYXJrZXIoWzJdKSwgZDMuY29sb3IodG1wKS5kYXJrZXIoWzFdKSxcclxuICAgICAgICAgICAgICAgIGQzLmNvbG9yKHRtcCksIGQzLmNvbG9yKHRtcCkuYnJpZ2h0ZXIoWzFdKSwgZDMuY29sb3IodG1wKS5icmlnaHRlcihbMl0pLCBkMy5jb2xvcih0bXApLmJyaWdodGVyKFszXSksIGQzLmNvbG9yKHRtcCkuYnJpZ2h0ZXIoW10pXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV0d29ya0NvbG9yID0ge307XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYm9vbGVhbiB2YWx1ZSBmb3IgdGhlIG5ldHdvcmsgYmFja2dyb3VuZCBjb2xvclxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gdHJ1ZSBvciBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtCYWNrZ3JvdW5kKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrQmFja2dyb3VuZCA9IHZhbHVlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBiYWNrZ3JvdW5kIGNvbG9yIGxpbWl0IC0gZHJhdyBiYWNrZ3JvdW5kIGxpbmUgaWYgbGltaXQgaXMgZXhjZWVkZWRcclxuICogQHBhcmFtIHtJbnRlZ2VyfSB2YWx1ZSAtIG5ldyBsaW1pdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtCYWNrZ3JvdW5kTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9uZXR3b3JrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwgZDMsKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRUcmVuZENoYXJ0TGlzdGVuZXJcclxufSBmcm9tICcuL2xpbmVfY2hhcnQuanMnO1xyXG4vKipcclxuICogRGlzYWJsZSB0aGUgcGxheSBidXR0b24gLS0+IExvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVBsYXlCdXR0b24oKSB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhbihmYWxzZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnI3BsYXktaWNvbnMnKS5oaWRlKCk7XHJcbiAgICAkKCcjcGxheS1sb2FkaW5nJykuc2hvdygpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgcGxheSBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKHRydWUpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcjcGxheS1sb2FkaW5nJykuaGlkZSgpO1xyXG4gICAgJCgnI3BsYXktaWNvbnMnKS5zaG93KCk7XHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuICAuMDUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXMoYXJyKSB7XHJcbiAgICBsZXQgcCA9IDAuMDU7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgIH0pO1xyXG4gICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHA7XHJcbiAgICBsZXQgbG93ZXIgPSBNYXRoLmZsb29yKGluZGV4KTtcclxuICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICBpZiAodXBwZXIgPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gYXJyW2xvd2VyXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSAoYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSAwNSwgMjUsIDUwLCA3NSwgOTUgcGVyY2VudGlsZXMgb2YgdGhlIGFycmF5XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGlsZXNMaW5lQ2hhcnQoYXJyKSB7XHJcbiAgICBsZXQgcCA9IFswLjA1LCAwLjI1LCAwLjUsIDAuNzUsIDAuOTVdO1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IChhcnIubGVuZ3RoIC0gMSkgKiBwW2ldO1xyXG4gICAgICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gaW5kZXggJSAxO1xyXG4gICAgICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGNoZWNrYm94ZXMgaW4gdGhlIGZlYXR1cmUgcGFuZWxcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zKGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIG9iamVjdFxyXG4gICAgZm9yICh2YXIga2V5IGluIGRhdGFTZXRQZXJjZW50aWxlKSB7XHJcbiAgICAgICAgaWYgKGRhdGFTZXRQZXJjZW50aWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGV4dCBmb3IgdGhlIGRpc3BsYXllZCBidXR0b25cclxuICAgICAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0ga2V5LnNwbGl0KCdfJykuam9pbignICcpO1xyXG4gICAgICAgICAgICBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYnV0dG9uXHJcbiAgICAgICAgICAgICQoJyNhYnNvbHV0ZS1mZWF0dXJlLWNoZWNrYm94ZXMnKS5hcHBlbmQoJzx0cj48dGg+JyArXHJcbiAgICAgICAgICAgICAgICAnIDxkaXYgY2xhc3M9XCJwcmV0dHkgcC1zd2l0Y2ggcC1maWxsIHAtYmlnZ2VyXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiZHJhdy0nICsga2V5ICtcclxuICAgICAgICAgICAgICAgICdcIi8+PGRpdiBjbGFzcz1cInN0YXRlXCI+PGxhYmVsPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArICc8L2xhYmVsPjwvZGl2PjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgLy8gcXVhbnRpbGUgZ3JhcGhcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmxvYXQtcmlnaHQgZHJhdy1kZXRhaWxzXCIgaWQ9XCJkcmF3LScgKyBrZXkgKyAnLWRldGFpbHNcIj48ZGl2IGNsYXNzPVwicHJldHR5IHAtaWNvbiBwLXRvZ2dsZSBwLXBsYWluXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiZHJhdy0nICsga2V5ICsgJy1pbnB1dFwiIC8+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInN0YXRlIHAtc3VjY2Vzcy1vIHAtb25cIj48aSBjbGFzcz1cIm1kaSBtZGktaW1hZ2UtYXJlYVwiPjwvaT48bGFiZWw+PC9sYWJlbD48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic3RhdGUgcC1vZmZcIj48aSBjbGFzcz1cIm1kaSBtZGktaW1hZ2Utb2ZmXCI+PC9pPjxsYWJlbD48L2xhYmVsPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzwvZGl2PjwvZGl2PjwvdGg+PC90cj4nKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaGlkZSB0aGUgZWxlbWVudHNcclxuICAgICQoJy5kcmF3LWRldGFpbHMnKS5oaWRlKCk7XHJcbiAgICAvLyBpbml0IHRoZSBsaXN0ZXJuZXJzXHJcbiAgICBpbml0VHJlbmRDaGFydExpc3RlbmVyKCk7XHJcblxyXG59XHJcblxyXG4vLyBnZW5lcmF0ZSBoYXNoIGNvZGVzIGZyb20gc3RyaW5nc1xyXG4vLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc2MTY0NjEvZ2VuZXJhdGUtYS1oYXNoLWZyb20tc3RyaW5nLWluLWphdmFzY3JpcHQtanF1ZXJ5XHJcblN0cmluZy5wcm90b3R5cGUuaGFzaENvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBoYXNoID0gMCxcclxuICAgICAgICBpLCBjaHI7XHJcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiBoYXNoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaHIgPSB0aGlzLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hyO1xyXG4gICAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzaDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIHN0YW5kYXJkRGV2aWF0aW9uIG9mIGFuIGFycmF5IG9mIG51bWJlcnNcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gYXJyYXkgb2YgbnVtYmVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0YW5kYXJkRGV2aWF0aW9uKGFycikge1xyXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgbGV0IG1lYW4gPSBhcnIucmVkdWNlKGZ1bmN0aW9uKHB2LCBjdikge1xyXG4gICAgICAgICAgICByZXR1cm4gcHYgKyBjdjtcclxuICAgICAgICB9LCAwKSAvIGFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRtcCA9IGFyci5tYXAoZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhudW0gLSBtZWFuLCAyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRtcC5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwdiArIGN2O1xyXG4gICAgICAgIH0sIDApIC8gdG1wLmxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb3ZlIGVsZW1lbnQgaW4gU1ZHIGludG8gYmFja2dyb3VuZCBkb25lIGJ5IG1vdmluZyBpdCB0byBmaXJzdCBlbGVtZW50XHJcbiAqL1xyXG5kMy5zZWxlY3Rpb24ucHJvdG90eXBlLm1vdmVUb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSB0aGlzLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcclxuICAgICAgICBpZiAoZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIGZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1ha2UgdGhlIG1haW4gdmlzIHNwYXRpYWwgdmlldyByZXNpemFibGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlUmVzaXphYmxlKGhlaWdodCwgd2lkdGgpIHtcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21haW4tdmlzJylcclxuICAgICAgICAgICAgLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb250YWlubWVudDogJ3BhcmVudCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAkKCcjbWFpbi12aXMtZGl2Jykud2lkdGgoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuaGVpZ2h0KGhlaWdodCAqIDAuNilcclxuICAgICAgICAgICAgLndpZHRoKHdpZHRoICogMC42KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVzZXQgdGhlIGJ1dHRvbnMgYW5kIGNoZWNrYm94ZXNcclxuICogSGlkZSBpY29ucyAtIG5lZWRlZCBiZWNhdXNlIG9mIGJvb3RzdHJhcCBidWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29uZmlnKCkge1xyXG4gICAgJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgLy9zZXQgdGhlIGNvbG9yIHNjYWxlIGZ1bmN0aW9uIHRvIGxpbmVhclxyXG4gICAgJCgnI2NvbG9yLXNjYWxlLWxpbmVhcicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNncm91cC1zaXplLW0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNzZXR0aW5ncy1kaXYgaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAvL2hpZGUgdGhlIGxvYWRpbmcgZ2lmXHJcbiAgICAkKCcjbG9hZGluZycpXHJcbiAgICAgICAgLmhpZGUoKTtcclxuICAgIC8vIG5lZWRlZCBkdWUgdG8galF1ZXJ5IGluY29tcGF0aWJpbGl0eVxyXG4gICAgJCgnI3BsYXktbG9hZGluZycpLmhpZGUoKTtcclxuICAgICQoJy5tZGktcGxheScpLmhpZGUoKTtcclxuICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmhpZGUoKTtcclxuICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuaGlkZSgpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCBkMywgUG9seUJvb2wqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxuICAgIGFycmF5QW5pbWFscyxcclxuICAgIHNldEFjdGl2ZUFuaW1hbHMsXHJcbiAgICBkZWNJbmRleFRpbWUsXHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeSxcclxuICAgIG5ldHdvcmtDb2xvclxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3RhbmRhcmREZXZpYXRpb25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxubGV0IHpvb21Hcm91cDsgLy8gem9vbSBncm91cCBmb3IgdGhlIHNwZWNpZmljIGRlbmRyb2dyYW1cclxubGV0IHRyZWVtYXA7XHJcbmxldCB0b29sdGlwRGl2O1xyXG5sZXQgc3BhdGlhbFZpZXc7IC8vIGdldCB0aGUgc3BhdGlhbCB2aWV3IHN2ZyBmcm9tIHRoZSBtYWluIHZpc1xyXG5sZXQgc3ZnTGVnZW5kO1xyXG5sZXQgaGllcmFyY2h5TGV2ZWxzID0ge307XHJcbmxldCBzZXRPcGVyYXRpb24gPSAndW5pb24nO1xyXG5sZXQgaWQ7IC8vIG5lZWRlZCBmb3IgdGhlIGNvbGxhcHNlIGZ1bmN0aW9uXHJcbi8vU3RhdGljIGNvbG9yIHNjYWxlIGZvciB0aGUgZGVuZHJvZ3JhbSB2YXJpYWNuZSBjb2xvcmluZ1xyXG5sZXQgc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgLmRvbWFpbihcclxuICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgIClcclxuICAgIC5yYW5nZShbJyNmN2ZiZmYnLCAnI2RlZWJmNycsICcjYzZkYmVmJywgJyM5ZWNhZTEnLCAnIzZiYWVkNicsICcjNDI5MmM2JywgJyMyMTcxYjUnLCAnIzA4NTE5YycsICcjMDgzMDZiJ10pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1heE51bWJlckhpZXJhcmNoaWVzID0gNDtcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5SWRzID0gW107XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5Q29sb3JzID0ge307XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5R3JvdXBTdGRldiA9IHt9O1xyXG4vLyBUT0RPIGFkZCBtb3JlIGNvbG9yc1xyXG5leHBvcnQgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjMzg2Y2IwJywgJyNlNzI5OGEnLCAnI2ZmOTkwMCddO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGRlbmRyb2dyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGNvbnN0YW5jdCBmYWN0b3JzIGZvciB0aGUgZGVuZGdyb2dyYW1cclxuICAgIGxldCBtYXJnaW4gPSAyMCxcclxuICAgICAgICB3aWR0aCA9IDUwMDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gNTAwMDtcclxuXHJcbiAgICAvLyB6b29tIGZ1bmN0aW9uIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDEwXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgd2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHdpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcblxyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIGhlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoaGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgYW5kIHNjYWxlXHJcbiAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS1wYW5lbCcpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHdpZHRoICsgJyAnICsgaGVpZ2h0KVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbScsIHRydWUpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG4gICAgaW5pdERlbmRyb2dyYW1MZWdlbmQoKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIHpvb20gZ3JvdXAgdG8gdGhlIHN2Z1xyXG4gICAgem9vbUdyb3VwID0gc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbiArICcsJyArIG1hcmdpbiArICcpJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIC8vIGQzIHRyZWVcclxuICAgIHRyZWVtYXAgPSBkMy50cmVlKCkgLy9kMy5jbHVzdGVyKClcclxuICAgICAgICAuc2l6ZShbKGhlaWdodCAtIDEwICogbWFyZ2luKSwgKHdpZHRoIC0gMTAgKiBtYXJnaW4pXSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBzcGF0aWFsIHZpZXcgLSBuZWVkZWQgdG8gYWRkIHRoZSBjbHVzdGVyaW5nIHRvIHRoZSBzcGF0aWFsIHZpZXcgd2luZG93XHJcbiAgICBzcGF0aWFsVmlldyA9IGQzLnNlbGVjdCgnLnRhbmsnKTtcclxuXHJcbiAgICAvLyBpbml0IGRlbmRyb2dyYW0gc2xpZGVyXHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBOZXR3b3JrIHNsaWRlclxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICBtaW46IDIsXHJcbiAgICAgICAgICAgIG1heDogMixcclxuICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgdmFsdWU6IGhpZXJhcmNoeUxldmVsc1snaDAnXSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeUxldmVsKGlkLCB1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIG5ldyBjbHVzdGVyaW5nIGFuZCBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBkZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGluaXQgdGhlIHRvb2x0aXAgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICB0b29sdGlwRGl2ID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS10b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBEaXZcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdCB0aGUgaGllcmFyY2h5IGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gbWF4TnVtYmVySGllcmFyY2hpZXMgKiAxMDA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2hpZXJhcmNoeS1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGFkZCBwYXR0ZXJuIGZvciBzdHJpcGVkIGJhY2tncm91bmQgb2YgaW50ZXJzZWN0aW9ucyBldGMuXHJcbiAgICBzcGF0aWFsVmlldy5hcHBlbmQoJ2RlZnMnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXR0ZXJuJylcclxuICAgICAgICAuYXR0cignaWQnLCAnc3RyaXBlZCcpXHJcbiAgICAgICAgLmF0dHIoJ3BhdHRlcm5Vbml0cycsICd1c2VyU3BhY2VPblVzZScpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzIwJylcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgJzUnKVxyXG4gICAgICAgIC5hdHRyKCdwYXR0ZXJuVHJhbnNmb3JtJywgJ3JvdGF0ZSg2MCknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIDUpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsMCknKVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsICcjNjcwMDBkJyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgZGVuZGdyb2dyYW0gZm9yIG9uZSBzdGVwXHJcbiAqIEZ1cnRoZXIgY2FsbHMgdGhlIGRyYXdIaWVyYXJjaHkgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGdldCB0aGUgYWN0aXZlIGRlbmRyb2dyYW1cclxuICAgIGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgIC8vIGlmIGRhdGEgaXMgYXZhaWFibGUgZHJhdyBoaWVyYXJjaHkgY2x1c3RlcnMgYW5kIGEgYnV0dG9uIGlzIGFjdGl2ZSBzZWxjdGVkXHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSAmJiBpZCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YSBhbmQgdHJhbnNmb3JtIGl0XHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBpZF1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gc2tpcCB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgbm9kZXMgPSBub2Rlcy5jaGlsZHJlblswXTtcclxuICAgICAgICAvLyBjb2xsYXBzZSB0aGUgdHJlZVxyXG4gICAgICAgIG5vZGVzLmNoaWxkcmVuLmZvckVhY2goY29sbGFwc2UpO1xyXG5cclxuICAgICAgICAvLyBtYXBzIHRoZSBub2RlIGRhdGEgdG8gdGhlIHRyZWUgbGF5b3V0XHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBpZiBubyBuZXR3b3JrIGlzIGNob29zZW5cclxuICAgICAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgc2xpZGVyIG1heFxyXG4gICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlcignb3B0aW9uJywgJ21heCcsIChub2Rlc1snaGVpZ2h0J10gLSAxKSlcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ3ZhbHVlJywgaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBsaW5rcyAoZWRnZXMpXHJcbiAgICAgICAgICAgIGxldCBsaW5rID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKS5zbGljZSgxKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFTlRFUlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBsaW5rcyB0byB0aGVpciBuZXcgcG9zaXRpb24uXHJcbiAgICAgICAgICAgIGxpbmtcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIGxpbmsuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBub2Rlc1xyXG4gICAgICAgICAgICAvLyBhZGRzIGVhY2ggbm9kZSBhcyBhIGdyb3VwXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubm9kZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBzIHRvIHRoZSBkZW5kZ3JvZ3JhbVxyXG4gICAgICAgICAgICB2YXIgbm9kZUVudGVyID0gbm9kZS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vZGUnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGQuY2hpbGRyZW4gPyAnIG5vZGUtLWludGVybmFsJyA6ICcgbm9kZS0tbGVhZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVIgLSBhcHBlbmQgZm9yIGVhY2ggZ3JvdXAgYSBub2RlIChjaXJjbGUpXHJcbiAgICAgICAgICAgIC8vIHdpdGggaGlnaGxpZ2h0aW5nIGZvciB0aGUgYWN0aXZlIGNob29zZW4gbGV2ZWxcclxuICAgICAgICAgICAgbm9kZUVudGVyLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA0MCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gZmluZCBhIG5pY2UgZnVuY3Rpb24gZm9yIHRoZSBvbiBjbGljayBtZXRob2RcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGljaylcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvb2x0aXAgcG9zaXRpb24gYW5kIHRleHRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYuc2VsZWN0KCcudG9vbHRpcC1zcGFuJykuaHRtbChkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaGlnaGxpZ2h0IGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdW5kaW9uIG9mIHRoZSBwYXRocyBtYWtlcyB0aGlzIGNvbXBsaWNhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSGlnaGxpZ2h0U3BhdGlhbFZpZXcoZFsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2LnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaGlnaGxpZ2h0IGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVIaWdobGlnaHRTcGF0aWFsVmlldygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHRleHQgLSAjIG51bWJlciBvZiBhbmltYWxzIGluIHRoZSBjbHVzdGVyXHJcbiAgICAgICAgICAgIG5vZGVFbnRlci5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlbmRyb2dyYW0tdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIDE1MClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgLTE1MClcclxuICAgICAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVUERBVEUgLS0gdXBkYXRlIHRoZSBncm91cHNcclxuICAgICAgICAgICAgbm9kZUVudGVyXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGFlIHRoZSBub2RlIGFuZCBjaXJjbGVzXHJcbiAgICAgICAgICAgIC8vIHdpdGggYWN0aXZlLWxldmVsIGZ1bmN0aW9uIHRvIGhpZ2hsaWdodCB3aGljaCBsZXZlbCBpcyBjaG9zZW5cclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zZWxlY3QoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FjdGl2ZS1sZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYWN0aXZlLWxldmVsJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRleHQgb2YgbnVtYmVyIG9mIGVudGl0aWVzXHJcbiAgICAgICAgICAgIG5vZGUuc2VsZWN0KCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIG5vZGUuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb2xvciB0aGUgZGVuZHJvZ3JhbSBub2RlcyB1c2luZyB0aGUgc3RhbmRhcmREZXZpYXRpb24gaW4gdGhlIGNsdXN0ZXJcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGhpZXJhcmNoeUdyb3VwU3RkZXYpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgbGVnZW5kIGZvciB0aGUgY29sb3JpbmdcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhpZXJhcmNoeUdyb3VwU3RkZXYpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBsZWdlbmQgaGVyZVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0pVTVBTIEhFUkUnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJTVBPUlRBTlQgLSBhc3luYyBwcm9ibGVtc1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBzb2x2ZSB0aGlzIC0gdmVyeSBzbG93XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoaWVyYXJjaHlHcm91cFN0ZGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpIGluIGhpZXJhcmNoeUdyb3VwU3RkZXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvciB0aGUgbm9kZXMgYnkgY2FsY3VsYXRpbmcgdGhlIHN0YW5kYXJkRGV2aWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBjbHVzdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFjdGl2ZSBpcyBzaG93IGluIGNsdXN0ZXIgaXMgY2hvb3NlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpIGluIGhpZXJhcmNoeUdyb3VwU3RkZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVsbG8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGFuZGFyZERldmlhdGlvbihoaWVyYXJjaHlHcm91cFN0ZGV2WygnaCcgKyBkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpLmhhc2hDb2RlKCkpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFuZGFyZERldmlhdGlvbkNvbG9yU2NhbGUoc3RhbmRhcmREZXZpYXRpb24oaGllcmFyY2h5R3JvdXBTdGRldlsoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZFsnZGVwdGgnXSAhPT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQoJyNkZW5kcm9ncmFtLWxlZ2VuZCcpLmNzcygnZGlzcGxheScpICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWxlZ2VuZCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG5ldHdvcmtIaWVyYXJjaHkpKSB7XHJcbiAgICAgICAgLy8gZHJhdyB0aGUgaGllcmFyY2h5IGluIHNwYXRpYWwgdmlld1xyXG4gICAgICAgIGRyYXdIaWVyYXJjaHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxhcHNlIGZ1bmN0aW9uIC0gb25seSBzaG93IHRoZSBhY3RpdmUgbGV2ZWwgYW5kIG9uZSBzdWIgbGV2ZWxcclxuICovXHJcbmZ1bmN0aW9uIGNvbGxhcHNlKGQpIHtcclxuICAgIGlmIChkLmNoaWxkcmVuICYmIGQuZGVwdGggPD0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgIGQuX2NoaWxkcmVuID0gZC5jaGlsZHJlbjtcclxuICAgICAgICBkLl9jaGlsZHJlbi5mb3JFYWNoKGNvbGxhcHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZC5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3IHRoZSBhbGwgaGllcmFyY2hpZXMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBhZGQgYSBncm91cCB3aXRoIHRoZSBpZHMgb2YgdGhlIGFuaW1hbHMgaW4gaXQgdG8gdGhlIHZpZXdcclxuICogd2l0aCBwYXRoIGNoaWxkIGVsZW1lbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiBkcmF3SGllcmFyY2h5KCkge1xyXG4gICAgLy8gaWQgb2YgdGhlIGhpZXJhcmNoeSBlLmcuIFsxLDUsM11cclxuICAgIGxldCBoaWVyYXJjaHlJZHMgPSBPYmplY3Qua2V5cyhuZXR3b3JrSGllcmFyY2h5KS5tYXAoZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4LnJlcGxhY2UoJ2gnLCAnJyk7XHJcbiAgICB9KTtcclxuICAgIC8vICBUaGUgY2x1c3RlcmluZyBpbiBhbiAyRCBhcnJheSB3aXRoIHdoaWNoIGFuaW1hbCBpZCBiZWxvbmdzIHRvIHdoaWNoIGdyb3VwXHJcbiAgICBsZXQgaGllcmFyY2h5VmVydGljZXMgPSBbXTtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoeSBkYXRhIHRvIGdldCB0aGUgaGllcmFyY2h5IGFuaW1hbCBpZHMgcGVyIGNsdXN0ZXJpbmcgYW5kIGdyb3VwaW5nXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpZXJhcmNoeUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0cmVlRGF0YSA9IG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgaGllcmFyY2h5SWRzW2ldXVtpbmRleFRpbWVdO1xyXG4gICAgICAgIGxldCBub2RlcyA9IGQzLmhpZXJhcmNoeSh0cmVlRGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5jaGlsZHJlbjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuICAgICAgICBsZXQgcm9vdCA9IG5vZGVzWydjaGlsZHJlbiddWzBdO1xyXG4gICAgICAgIGlmIChzaG93TmV0d29ya0hpZXJhcmNoeSA9PT0gaGllcmFyY2h5SWRzW2ldKSB7XHJcbiAgICAgICAgICAgIG5ldHdvcmtIaWVyYXJjaHlJZHMgPSBnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHlJZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhZGQgdGhlIHZlcnRpY2VzIGludG8gdGhlIGFycmF5XHJcbiAgICAgICAgaGllcmFyY2h5VmVydGljZXMucHVzaChnZXRIaWVyYXJjaHlWZXJ0aWNlcyhnZXRIaWVyYXJjaHlMZXZlbChyb290LCBoaWVyYXJjaHlJZHNbaV0pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbW9yZSB0aGFuIDIgaGllcmFyY2hpZXMgYXJlIGRyYXduXHJcbiAgICBpZiAoaGllcmFyY2h5VmVydGljZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHVuaW9uIHRoZSBsaXN0IG9mIHBvbHlnb25zIHRvIG9uZSBwb2x5Z29uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXNbaV0gPSB1bmlvblBvbHlnb25zKGhpZXJhcmNoeVZlcnRpY2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSBhbmQgY2FsY3VsYXRlIHRoZSBpbnRlcnNlY3Rpb24gcG9seWdvbnMgb2YgdGhlIG4gaGllcmFyY2hpZXNcclxuICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyB0ZW1wIHNvbHV0aW9uIG9mIHR3byBpbnRlcnNlY3Rpb25zXHJcbiAgICAgICAgICAgIGxldCB0bXBJbnRlcnNlY3Rpb24gPSBoaWVyYXJjaHlWZXJ0aWNlc1swXTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaGllcyBhbmQgaW50ZXJzZWN0IGFsbCBvZiB0aGVtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gUG9seUJvb2wuaW50ZXJzZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBJbnRlcnNlY3Rpb24sIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogaGllcmFyY2h5VmVydGljZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IHRtcEludGVyc2VjdGlvblsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXN1bHRcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXMgPSBbdG1wSW50ZXJzZWN0aW9uXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJhbnNmb3JtIGFuZCBjYWxjdWxhdGUgdGhlIHN5bW1ldHJpYyBkaWZmZXJlbmNlIHBvbHlnb25zIG9mIHRoZSBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgIC8vIHhvciA9IFVuaW9uIG9mIGFsbCBoaWVyYXJjaGllcyAtIGludGVyc2VjdGlvbiBvZiBhbGwgaGllcmFyY2hpZXNcclxuICAgICAgICAgICAgLy8gdGVtcCBzb2x1dGlvbiBvZiB0d28gaW50ZXJzZWN0aW9uc1xyXG4gICAgICAgICAgICBsZXQgdG1wSW50ZXJzZWN0aW9uID0gaGllcmFyY2h5VmVydGljZXNbMF07XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2hpZXMgYW5kIGludGVyc2VjdCBhbGwgb2YgdGhlbVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IFBvbHlCb29sLmludGVyc2VjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uczogdG1wSW50ZXJzZWN0aW9uLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSB0bXBJbnRlcnNlY3Rpb25bJ3JlZ2lvbnMnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb24gcmVzdWx0XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb25IaWVyYXJjaHlQb2x5Z29ucyA9IHRtcEludGVyc2VjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIC8vIHVuaW9uXHJcbiAgICAgICAgICAgIGxldCB0bXBVbmlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0bXBVbmlvbiA9IFBvbHlCb29sLnVuaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBVbmlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgdG1wVW5pb24gPSB0bXBVbmlvblsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB1bmlvbkhpZXJhcmNoeVBvbHlnb25zID0gdG1wVW5pb247XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgICAgICAgICAgbGV0IHRtcERpZmZlcmVuY2UgPSBQb2x5Qm9vbC54b3Ioe1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uczogdW5pb25IaWVyYXJjaHlQb2x5Z29ucywgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICByZWdpb25zOiBpbnRlcnNlY3Rpb25IaWVyYXJjaHlQb2x5Z29ucyxcclxuICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICB0bXBEaWZmZXJlbmNlID0gdG1wRGlmZmVyZW5jZVsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICAvLyByZXN1bHRcclxuICAgICAgICAgICAgaGllcmFyY2h5VmVydGljZXMgPSBbdG1wRGlmZmVyZW5jZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERBVEEgSm9pblxyXG4gICAgbGV0IGhpZXJhcmNoaWVzID0gc3BhdGlhbFZpZXdcclxuICAgICAgICAuc2VsZWN0QWxsKCdnLmhpZXJhcmNoeS1ncm91cCcpXHJcbiAgICAgICAgLmRhdGEoaGllcmFyY2h5VmVydGljZXMpO1xyXG5cclxuICAgIC8vIEVOVEVSIHRoZSBncm91cHMgLSBhZGRzIGEgc3BlY2lmaWMgaWQgYW5kIGNvbG9yXHJcbiAgICBoaWVyYXJjaGllc1xyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaW50ZXJzZWN0aW9uJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGgnICsgaGllcmFyY2h5SWRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tb3ZlVG9CYWNrKCk7XHJcblxyXG4gICAgLy8gVVBEQVRFIC0gdGhlIGNsYXNzIG5lZWRlZCBmb3IgaW50ZXJzZWN0aW9uIGFuZCBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgaGllcmFyY2hpZXMuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ2ludGVyc2VjdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaW50ZXJzZWN0aW9uJztcclxuICAgICAgICB9IGVsc2UgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ3N5bS1kaWZmZXJlbmNlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBzeW0tZGlmZmVyZW5jZSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaCcgKyBoaWVyYXJjaHlJZHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRVhJVFxyXG4gICAgaGllcmFyY2hpZXMuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIEhpZXJhY2h5IGh1bGxzIGFkZGVkIHRvIHRoZSBzcGF0aWFsIHZpZXcgLSBnZXQgdGhlIHBvaW50cyBmb3IgZWFjaCBhbmltYWwgaW4gdGhlXHJcbiAgICAvLyBzcGF0aWFsIHZpZXcgc28gdGhhdCBhIGNvbnZleCBodWxsIGNhbiBiZSBjYWxjdWxhdGVkXHJcbiAgICBsZXQgaGllcmFyeUh1bGxzID0gaGllcmFyY2hpZXMuc2VsZWN0QWxsKCdwYXRoLmhpZXJhcmNoeS1odWxsLXBhdGgnKVxyXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gRU5URVIgYW5kIGNhbGN1bGF0ZSB0aGUgY29udmV4IGh1bGxcclxuICAgIGhpZXJhcnlIdWxsc1xyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gJ2hwJyArIGQuam9pbignJykucmVwbGFjZSgvLC9nLCAnJyk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGllcmFyY2h5LWh1bGwtcGF0aCcpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBkcmF3TGluZShkKTtcclxuICAgICAgICAgICAgcmV0dXJuICdNJyArIGQuam9pbignTCcpICsgJ1onO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIFVQREFURSB0aGUgY29udmV4IGh1bGxcclxuICAgIGhpZXJhcnlIdWxsc1xyXG4gICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZHJhd0xpbmUoZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnTScgKyBkLmpvaW4oJ0wnKSArICdaJztcclxuICAgICAgICB9KTtcclxuICAgIC8vIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgIC8vIHJldHVybiAnaHAnICsgZC5qb2luKCcnKS5yZXBsYWNlKC8sL2csICcnKTtcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gRVhJVFxyXG4gICAgaGllcmFyeUh1bGxzLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVbmlvbiBtdWx0aXBsZSBwb2x5Z29ucyB0b2dldGhlciAtIG5lZWRlZCBvciBlbHNlIHRoZXJlIHdpbGwgYmUgaG9sZXMgaW4gdGhlIGludGVyc2VjdGlvbnNcclxuICogQHBhcmFtIHthcnJheX0gcG9seWdvbnMgLSBhcnJheSBvZiBhcnJheSBvZiBwb2ludHNcclxuICovXHJcbmZ1bmN0aW9uIHVuaW9uUG9seWdvbnMocG9seWdvbnMpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBvbHlnb25zKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9seWdvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwb2x5Z29uc1tpXSA9IHtcclxuICAgICAgICAgICAgcmVnaW9uczogW3BvbHlnb25zW2ldXSxcclxuICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gdW5pb24gYSBsaXN0IG9mIHBvbHlnb25zIHRvZ2V0aGVyXHJcbiAgICBsZXQgc2VnbWVudHMgPSBQb2x5Qm9vbC5zZWdtZW50cyhwb2x5Z29uc1swXSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvbHlnb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHNlZzIgPSBQb2x5Qm9vbC5zZWdtZW50cyhwb2x5Z29uc1tpXSk7XHJcbiAgICAgICAgbGV0IGNvbWIgPSBQb2x5Qm9vbC5jb21iaW5lKHNlZ21lbnRzLCBzZWcyKTtcclxuICAgICAgICBzZWdtZW50cyA9IFBvbHlCb29sLnNlbGVjdFVuaW9uKGNvbWIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFBvbHlCb29sLnBvbHlnb24oc2VnbWVudHMpWydyZWdpb25zJ107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFZGdlIGRyYXdpbmcgbWV0aG9kIG9mIHRoZSBkZW5kcm9ncmFtXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkIC0gVHJlZW1hcCBlbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBkaWFnb25hbExpbmVzKGQpIHtcclxuICAgIHJldHVybiAnTScgKyBkLnggKyAnLCcgKyBkLnkgK1xyXG4gICAgICAgICdWJyArIGQucGFyZW50LnkgKyAnSCcgKyBkLnBhcmVudC54O1xyXG59XHJcblxyXG4vKipcclxuICogT24gY2xpY2sgZnVuY3Rpb24gLSBoaWdobGlnaHQgdGhlIGVsZW1lbnRzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogQHBhcmFtIHtvYmplY3R9IGQgLSBUcmVlbWFwIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNsaWNrKGQpIHtcclxuICAgIHNldEFjdGl2ZUFuaW1hbHMoZFsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgLy8gaWYgbm8gYW5pbWF0aW9uIGlzIGFjdGl2ZSBkcmF3IHRoZSBkcmF3IG9uZSBzdGVwXHJcbiAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgIGRyYXcoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgdGhlIGNsdXN0ZXJpbmcgb2YgYSBzcGVjaWZpYyBsZXZlbCBpbiB0aGUgZGVuZHJvZ3JhbSB0cmVlXHJcbiAqIEZvciBpbnN0YW5jZSBhbGwgY2x1c3RlcnMgZnJvbSBsZXZlbCA1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290IC0gUm9vdCBvZiB0aGUgdHJlZW1hcFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllYXJjaHkgLSBOdW1iZXIgb2YgaGllcmFyY2h5IGZyb20gWzAtM11cclxuICovXHJcbmZ1bmN0aW9uIGdldEhpZXJhcmNoeUxldmVsKHJvb3QsIGhpZXJhcmNoeSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgbGV0IGxldmVsID0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGhpZXJhcmNoeV07XHJcblxyXG4gICAgLy8gc2Vjb25kIGxldmVsIG9mIHRoZSBhcnJheVxyXG4gICAgbGV0IHRtcF9ub2RlcyA9IHJvb3RbJ2NoaWxkcmVuJ107XHJcbiAgICAvLyBpdGVyYXRlIHRocm91Z2ggdGhlIHRyZWVcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcm9vdFsnaGVpZ2h0J107IGkrKykge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBhdCB0aGUgc2VhcmNoZWQgbGV2ZWxcclxuICAgICAgICBpZiAodG1wX25vZGVzWzBdICYmIHRtcF9ub2Rlc1swXVsnZGVwdGgnXSA9PT0gbGV2ZWwpIHtcclxuICAgICAgICAgICAgLy8gYWRkIGVhY2ggY2x1c3RlciB0byB0aGUgcmVzdWx0IHNldFxyXG4gICAgICAgICAgICB0bXBfbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5vZGVbJ2RhdGEnXVsnbmFtZSddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGVbJ2RhdGEnXVsnbmFtZSddKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgYWxsIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWMgbGV2ZWwgaW4gdGhlIHRyZWVcclxuICAgICAgICBsZXQgdG1wID0gW107XHJcbiAgICAgICAgdG1wX25vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGVbJ2NoaWxkcmVuJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSB0bXAuY29uY2F0KG5vZGVbJ2NoaWxkcmVuJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdG1wX25vZGVzID0gdG1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgc3BlY2lmaWMgdmVydGljZXMgb2YgYSBjbHVzdGVyaW5nIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogUmV0dXJuIGFuIGFycmF5IG9mIHBvaW50cyBbW3gseV1beCx5XS4uLl1cclxuICogQHBhcmFtIHtBcnJheX0gaGllcmFyY2hpZXMgLSBBcnJheSBvZiBhcnJheXMgd2l0aCBlYWNoIGFycmF5IGNvbnRhaW5zIGFsbCB0aGUgaWRzIGZvciBhIHNwZWNpZmljIGNsdXN0ZXJpbmdcclxuICovXHJcbmZ1bmN0aW9uIGdldEhpZXJhcmNoeVZlcnRpY2VzKGhpZXJhcmNoaWVzKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW107IC8vIHJlc3VsdCBzZXRcclxuICAgIGhpZXJhcmNoaWVzLmZvckVhY2goZnVuY3Rpb24oY2x1c3Rlcikge1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IFtdOyAvLyB2ZXJ0aWNlcyBvZiB0aGUgY2x1c3RlcnMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2x1c3Rlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBNZW1iZXIgPSBhcnJheUFuaW1hbHMuZmluZChkID0+IGRbJ2EnXSA9PT0gY2x1c3RlcltqXSk7XHJcbiAgICAgICAgICAgIGlmIChncm91cE1lbWJlcikge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChbZ3JvdXBNZW1iZXJbJ3AnXVswXSwgLWdyb3VwTWVtYmVyWydwJ11bMV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBbmRyZXcgbW9udG9uZSBjaGFpbiBhbGdvcml0aG0gcmV1dHJucyBmb3IgcG9pbnRzIGZld2VyIHRoYW4gMyBudWxsXHJcbiAgICAgICAgaWYgKHZlcnRpY2VzLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGQzLnBvbHlnb25IdWxsKHZlcnRpY2VzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBhY3RpdmUgbGV2ZWwgZm9yIGEgc3BlY2lmaWMgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5IGNhbiBiZSBmcm9tIFswLTNdXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCAtIE5ldyBhY3RpdmUgbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlMZXZlbChoaWVyYXJjaHksIGxldmVsKSB7XHJcbiAgICAvLyBUT0RPIGNhdGNoIGNhc2VzIDwgMCBhbmQgYmlnZ2VyIHRoYW4gb3ZlcmFsbCBoZWlnaHRcclxuICAgIGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldID0gbGV2ZWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGVudHJ5IGZvciB0aGUgaGllcmFyY2ggbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUxldmVsKGhpZXJhcmNoeSkge1xyXG4gICAgLy8gVE9ETyBjYXRjaCBjYXNlcyA8IDAgYW5kIGJpZ2dlciB0aGFuIG92ZXJhbGwgaGVpZ2h0XHJcbiAgICBkZWxldGUgaGllcmFyY2h5TGV2ZWxzWydoJyArIGhpZXJhcmNoeV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGFjdGl2ZSBjb2xvciBmb3IgYSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHkgY2FuIGJlIGZyb20gWzAtM11cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlDb2xvcihoaWVyYXJjaHkpIHtcclxuICAgIC8vIGNoZWNrIGlmIHRoZSBoaWVyYXJjaHkgaXMgYWxyZWFkeSBzaG93biBhcyBuZXR3b3JrXHJcbiAgICAvLyB0YWtlIHRoZSBzYW1lIGNvbG9yXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gbmV0d29ya0NvbG9yKSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gKCdoJyArIGhpZXJhcmNoeSkpIHtcclxuICAgICAgICAgICAgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV0gPSBuZXR3b3JrQ29sb3Jba2V5XTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGhpZXJhcmNoeSBpcyBub3QgdmlzdWFsaXplZCBhbHJlYWR5IGFzIGEgbmV0d29ya1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgdG1wX2Jvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBoaWVyYXJjaHlDb2xvcnMpIHtcclxuICAgICAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzW2tleV0gPT09IGNvbG9yc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF9ib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRtcF9ib29sZWFuKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGEgbmV0d29yayBpcyBkZXBpY3RlZFxyXG4gICAgICAgICAgICAvLyBpZiBzbyBza2lwIHRoZSBjb2xvciB3aGljaCBpcyBhbHJlYWR5IGNob29zZW4gZm9yIHRoZSBuZXR3b3JrXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG5ldHdvcmtDb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQ29sb3Jba2V5XSAhPT0gY29sb3JzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldID0gY29sb3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBjb2xvciBmb3IgdGhlIGhpZXJhcmNoIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlDb2xvcihoaWVyYXJjaHkpIHtcclxuICAgIGRlbGV0ZSBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgaGllcmFyY2h5IGJ1dHRvbiB0byB0aGUgZGl2XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEhpZXJhcmNoeSBvZiB0aGUgaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOZXcgYWN0aXZlIGxldmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkSGllcmFyY2h5QnV0dG9uKGlkLCBuYW1lKSB7XHJcbiAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5hcHBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwic2hvdy1kZW5kcm9ncmFtLScgKyBpZCArICdcIiBkYXRhPScgKyBpZCArICcgbmFtZT0nICsgbmFtZSArXHJcbiAgICAgICAgICAgICcgY2xhc3M9XCJzaG93LWRlbmRyb2dyYW0gYnRuIGJ0bi1ibG9ja1wiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIiBhdXRvY29tcGxldGU9XCJvZmZcIj4nICtcclxuICAgICAgICAgICAgJyA8c3BhbiBjbGFzcz1cImJ0bi1sYWJlbFwiIGlkPVwiYnRuLWxlZnRcIj4gPGkgY2xhc3M9XCJtZGkgbWRpLWFycm93LWNvbGxhcHNlLWxlZnRcIj48L2k+Jm5ic3AmbmJzcCBTaG93ICcgKyBuYW1lICsgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYnRuLWxhYmVsXCIgaWQ9XCJidG4tcmlnaHRcIj4gPGkgY2xhc3M9XCJtZGkgbWRpLWFycm93LWNvbGxhcHNlLXJpZ2h0XCI+PC9pPiZuYnNwJm5ic3AgSGlkZSAnICsgbmFtZSArICcgPC9zcGFuPjwvYnV0dG9uPiA8YnI+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLmZpbmQoJyNidG4tcmlnaHQnKS5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBzcGVjaWZpYyBoaWVyYXJjaHkgYnV0dG9uIHRvIHRoZSBkaXZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gSGllcmFyY2h5IG9mIHRoZSBpZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbihpZCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBmb2xsb3dpbmcgbGluZSBicmVhayBhbmQgZWxlbWVudFxyXG4gICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLm5leHQoKS5yZW1vdmUoKTtcclxuICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBzbGlkZXIgYW5kIHRleHQgaW4gdGhlIGRlbmRyb2dyYW0gcGFuZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEZW5kcm9ncmFtKCkge1xyXG4gICAgLy8gZ2V0IHRoZSBpbXBvcnRhbnQgaW5mb1xyXG4gICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgIGxldCBuYW1lID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ25hbWUnKTtcclxuICAgIC8vIHNldCB0aGUgbmFtZSBvZiB0aGUgZGlzcGxheWVkIGhpZXJhcmNoeVxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbmFtZScpLnRleHQobmFtZSk7XHJcblxyXG4gICAgLy8gc2V0IHNsaWRlciBhbmQgIHRleHQgdmFsdWVcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXNsaWRlcicpLnZhbChoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKTtcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXRleHQnKS50ZXh0KGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBoaWVyYXJjaHkgbGVnZW5kXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlSGllcmFyY2h5TGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoV2lkdGggPSA1MDtcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hIZWlnaHQgPSAyMDtcclxuXHJcbiAgICAvLyBTaG93IG9yIGhpZGUgdGhlIHN2ZyBlbGVtZW50XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoaGllcmFyY2h5Q29sb3JzKS5sZW5ndGggIT09IDAgfHwgT2JqZWN0LmtleXMobmV0d29ya0NvbG9yKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAkKCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKS5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNoaWVyYXJjaHktbGVnZW5kLWRpdicpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGVnZW5kRGF0YSA9IFtdO1xyXG4gICAgbGV0IGxlZ2VuZFRleHREYXRhID0gW107XHJcbiAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGFcclxuICAgICQoJy5zaG93LWRlbmRyb2dyYW0nKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGEgaXMgbm90IHVuZGVmaW5lZFxyXG4gICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnNbJ2gnICsgJChvYmopLmF0dHIoJ2RhdGEnKV0gIT0gbnVsbCAmJiAkKG9iaikuYXR0cignbmFtZScpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGVnZW5kRGF0YS5wdXNoKGhpZXJhcmNoeUNvbG9yc1snaCcgKyAkKG9iaikuYXR0cignZGF0YScpXSk7XHJcbiAgICAgICAgICAgIGxlZ2VuZFRleHREYXRhLnB1c2goJChvYmopLmF0dHIoJ25hbWUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBhZGQgdGhlIG5ldHdvcmsgY29sb3JcclxuICAgIGlmIChPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXR3b3JrQ29sb3IpIHtcclxuICAgICAgICAgICAgaWYgKGxlZ2VuZERhdGEuaW5kZXhPZihuZXR3b3JrQ29sb3Jba2V5XSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmREYXRhLnB1c2gobmV0d29ya0NvbG9yW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kVGV4dERhdGEucHVzaCgnTmV0d29yaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gREFUQSBKT0lOXHJcbiAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kRGF0YSk7XHJcbiAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kVGV4dERhdGEpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBMZWdlbmQgc3dhdGNoZXMgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRTd2F0Y2hXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIDIuNSAqIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuICAgIC8vIEVYSVQgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIFRleHQgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMiAqIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIDIuNSAqIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBkZW5kcm9ncmFtIGxlZ2VuZFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdERlbmRyb2dyYW1MZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSA1NTA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgbGV0IGRlbmRyb2dyYW1MZWdlbmQgPSBkMy5zZWxlY3QoJyNkZW5kcm9ncmFtLXBhbmVsJylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZW5kcm9ncmFtLWxlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodCk7XHJcblxyXG4gICAgJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgbGV0IGxlZ2VuZERhdGEgPSBzdGFuZGFyZERldmlhdGlvbkNvbG9yU2NhbGUucmFuZ2UoKTtcclxuICAgIC8vVE9ETyBjaGFuZ2UgdGhpcyB0byBiZXR0ZXIgc29sdXRpb25cclxuICAgIGxldCBsZWdlbmRUZXh0RGF0YSA9IFsnbG93JywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICdoaWdoJ107XHJcblxyXG4gICAgbGVnZW5kID0gZGVuZHJvZ3JhbUxlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShsZWdlbmREYXRhKTtcclxuICAgIGxlZ2VuZFRleHQgPSBkZW5kcm9ncmFtTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmRhdGEobGVnZW5kVGV4dERhdGEpO1xyXG5cclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFN3YXRjaFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gVGV4dCAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gRU5URVIgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC10ZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzZXQgb3BlcmF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRpb24gLSBlLmcuIFwidW5pb25cIiBcImludGVyc2VjdGlvblwiIFwic3ltLWRpZmZlcmVuY2VcIlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNldE9wZXJhdGlvbih2YWx1ZSkge1xyXG4gICAgc2V0T3BlcmF0aW9uID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGhpZXJhcmNoeSBncm91cCBzdGFuZGFyZCBkZXZpYXRpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIHVuaXF1ZSBoYXNoIGlkIGZvciB0aGUgZ3JvdXBcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdW5pcXVlIGhhc2ggaWQgZm9yIHRoZSBncm91cFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldGhpZXJhcmNoeUdyb3VwU3RkZXYoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGtleSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KSB7XHJcbiAgICAgICAgaGllcmFyY2h5R3JvdXBTdGRldltrZXldLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBoaWVyYXJjaHlHcm91cFN0ZGV2W2tleV0gPSBbdmFsdWVdO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVzZXQgaGllcmFyY2h5IGdyb3VwIHN0YW5kYXJkIGRldmlhdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0aGllcmFyY2h5R3JvdXBTdGRldigpIHtcclxuICAgIGhpZXJhcmNoeUdyb3VwU3RkZXYgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZ2hsaWdodCBhIHN1YnNldCBvZiBhbmltYWxzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogQHBhcmFtIHthcnJheX0gYW5pbWFscyAtIGFycmF5IG9mIGFuaW1hbCBpZHMgd2hpY2ggaGF2ZSB0byBiZSBoaWdobGlnaHRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhpZ2hsaWdodFNwYXRpYWxWaWV3KGFuaW1hbHMpIHtcclxuICAgIC8vIHBvaW50cyB0byBjYWxjdWxhdGUgdGhlIGNvbnZleCBodWxsIG9mIHRoZSBoaWdobGlnaHQgY2x1c3RlclxyXG4gICAgbGV0IHZlcnRpY2VzID0gW107XHJcbiAgICAvLyBpdGVyYXRlIHRocm91Z2ggdGhlIG9iamVjdHMgaW4gdGhlIGNsdXN0ZXJcclxuICAgIC8vIGdldCB0aGUgcG9pbnRzIGFuZCBoaWdobGlnaHQgdGhlIGFuaW1hbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0bXBBbmltYWwgPSBzcGF0aWFsVmlldy5zZWxlY3QoJyNhbmltYWwtJyArIGFuaW1hbHNbaV0pO1xyXG4gICAgICAgIGxldCBwb2ludCA9IHRtcEFuaW1hbC5kYXRhKClbMF1bJ3AnXTtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKFtwb2ludFswXSwgLXBvaW50WzFdXSk7XHJcblxyXG4gICAgICAgIHRtcEFuaW1hbC5jbGFzc2VkKCdhbmltYWwtaGlnaGxpZ2h0JywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBhZGQgYSBwb2x5Z29uIGh1bGwgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgc3BhdGlhbFZpZXcuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlnaGxpZ2h0LWhpZXJhcmNoeScpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCAoJ00nICsgZDMucG9seWdvbkh1bGwodmVydGljZXMpLmpvaW4oJ0wnKSArICdaJykpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodFNwYXRpYWxWaWV3KCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjb2xvcmluZyBhbmQgdGhlIGhpZXJhcmNoeSBoaWdobGlnaHQgaHVsbFxyXG4gICAgZDMuc2VsZWN0QWxsKCcuYW5pbWFsJykuY2xhc3NlZCgnYW5pbWFsLWhpZ2hsaWdodCcsIGZhbHNlKTtcclxuICAgIGQzLnNlbGVjdEFsbCgnLmhpZ2hsaWdodC1oaWVyYXJjaHknKS5yZW1vdmUoKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oaWVyYXJjaHkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxudmFyIHNvdXJjZTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRUb0RhdGFzZXQsXHJcbiAgICBzZXREYXRhU2V0UGVyY2VudGlsZSxcclxuICAgIHNldFN3YXJtRGF0YSxcclxuICAgIHNldE1ldGFEYXRhLFxyXG4gICAgc2V0RGF0YXNldEZlYXR1cmUsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldEhpZXJhcmNoeURhdGEsXHJcbiAgICBzZXRBbmltYWxJZHNcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE5ldHdvcmtCdXR0b25zLFxyXG4gICAgc2V0TmV0d29ya0lEXHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBlbmFibGVQbGF5QnV0dG9uLFxyXG4gICAgZGlzYWJsZVBsYXlCdXR0b24sXHJcbiAgICBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzcGF0aWFsVmlld0luaXRcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuLy8gaW1wb3J0IHtcclxuLy8gICAgIHJlc3BvbnNlUGFyYW1ldGVyc1xyXG4vLyB9IGZyb20gJy4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0cmVhbSB0aGUgbW92ZW1lbnQgZGF0YSBmcm9tIHRoZSBBUElcclxuICogTG9hZHMgb25seSB0aGUgZXhwbGljaXQgbW92ZW1lbnQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbU1vdmVtZW50RGF0YSgpIHtcclxuICAgIGlmICh3aW5kb3cuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9hcGkvbW92ZW1lbnRfb25seS8nICsgcGFyYW1ldGVyc1snaWQnXSk7XHJcbiAgICAgICAgc291cmNlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gJ2Nsb3NlJykge1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgYWpheCBxdWVyaWVzIGFyZSBjb21wZWx0ZSBpbml0aWFsaXplXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tQZW5kaW5nUmVxdWVzdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuYWN0aXZlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3SW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkVG9EYXRhc2V0KEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnJlYWR5U3RhdGUgPT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdXZWJicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RyZWFtaW5nJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnRpbGUgZGF0YSBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJjZW50aWxlKCkge1xyXG4gICAgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcGVyY2VudGlsZS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRhU2V0UGVyY2VudGlsZSBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vIFttaW4sIHBlcmNlbnRpbGVfMSwuLi4scGVyY2VudGlsZV85LG1heF1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtkYXRhW2ldWydmZWF0dXJlJ11dID0gW2RhdGFbaV1bJ21pbiddLCBkYXRhW2ldWydwMSddLCBkYXRhW2ldWydwMiddLCBkYXRhW2ldWydwMyddLCBkYXRhW2ldWydwNSddLCBkYXRhW2ldWydwNyddLCBkYXRhW2ldWydwOCddLCBkYXRhW2ldWydwOSddLCBkYXRhW2ldWydtYXgnXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RGF0YVNldFBlcmNlbnRpbGUoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgICAgICBhZGRBYnNvbHV0ZUZlYXR1cmVCdXR0b25zKGRhdGFTZXRQZXJjZW50aWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0IGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRmVhdHVyZXMoKSB7XHJcbiAgICBjb25zdCBzd2FybV9mZWF0dXJlcyA9IFsnc3dhcm1fdGltZScsICdzd2FybV9zcGVlZCcsICdzd2FybV9hY2NlbGVyYXRpb24nLCAnc3dhcm1fY29udmV4X2h1bGxfYXJlYScsXHJcbiAgICAgICAgJ3N3YXJtX2Rpc3RhbmNlX2NlbnRyb2lkJywgJ3N3YXJtX2RpcmVjdGlvbicsICdzd2FybV9wb2xhcmlzYXRpb24nXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGdldCBhbGwgdGhlIG90aGVyIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIHN3YXJtX2ZlYXR1cmVzW2ldLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlYXR1cmUgPSBzd2FybV9mZWF0dXJlc1tpXS5yZXBsYWNlKCdzd2FybV8nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG1lYWRhdGEgaW5mb3JtYXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhRGF0YSgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9tZXRhZGF0YS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRNZXRhRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBkYXRhc2V0cyBmb3IgdGhlIGJ1dHRvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YUJ1dHRvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmtzLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2Ugc3BlZWQsIGFjY2VsZXJhdGlvbiBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YXNldEZlYXR1cmUoZmVhdHVyZSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIHN3YXJtIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2UgY2VudHJvaWQsIG1lZG9pZCBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBmb3IgdGhlIHNwZWNpZmljIG5ldHdvcmtfaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ldHdvcmtfaWQgLSB1bmlxdWUgbmV0d29yayBpZCBvZiBhIGRhdGFzZXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29yay8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIG5ldHdvcmtfaWQsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXROZXR3b3JrRGF0YShKU09OLnBhcnNlKGRhdGFbMF1bJ2RhdGEnXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIG5lZWRlZCBmb3Igc3RhbmRhcmQgRGV2aWF0aW9uIGluIGRlbmRyb2dyYW1cclxuICAgIHNldE5ldHdvcmtJRChuZXR3b3JrX2lkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBoaWVyYXJjaHkgZm9yIHRoZSBzcGVjaWZpYyBuZXR3b3JrX2lkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXR3b3JrX2lkIC0gdW5pcXVlIG5ldHdvcmsgaWQgb2YgYSBkYXRhc2V0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKG5ldHdvcmtfaWQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmsvaGllcmFyY2h5LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSksIG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZGlzdGluY3QgYW5pbWFsIGlkcyBmb3IgYSBzcGVjaWZjIGRhdGFzZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmltYWxJZHMoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvYW5pbWFsX2lkcycsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgc2V0QW5pbWFsSWRzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAvKipcclxuLy8gICogVmlzdWFsIHBhcmFtZXRlciBzdWdnZXN0aW9uIGFqYXggcXVlcnlcclxuLy8gICogQHBhcmFtIHtBcnJheX0gdHJhY2tlZERhdGEgLSB0cmFja2VkIGRhdGEgd2l0aCAuXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0U3VnZ2VzdGVkUGFyYW1ldGVycyh0cmFja2VkRGF0YSkge1xyXG4vLyAgICAgJC5hamF4KHtcclxuLy8gICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvdmlzdWFsX3BhcmFtZXRlci8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4vLyAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuLy8gICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuLy8gICAgICAgICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzKGRhdGEpO1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgZGF0YTogdHJhY2tlZERhdGFcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgU2V0Ki9cclxuXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBicnVzaGVuZCxcclxuICAgIHNsaWRlclxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmQsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yLFxyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEsXHJcbiAgICBjb2xvck1ldGFkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldE5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBzZXROZXR3b3JrSGllcmFyY2h5LFxyXG4gICAgc2V0bmV0d29ya0NvbG9yLFxyXG4gICAgc2V0TmV0d29ya0lELFxyXG4gICAgc2V0TmV0d29ya0JhY2tncm91bmQsXHJcbiAgICBzZXROZXR3b3JrQmFja2dyb3VuZExpbWl0XHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc2V0TmV0d29ya0RhdGEsXHJcbiAgICBzZXRIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBnZXREYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtEYXRhLFxyXG4gICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNvbG9yU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZEhpZXJhcmNoeUJ1dHRvbixcclxuICAgIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbixcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbWF4TnVtYmVySGllcmFyY2hpZXMsXHJcbiAgICBzZXRTZXRPcGVyYXRpb25cclxufSBmcm9tICcuL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VHJhY2tpbmdCb29sZWFuLFxyXG4gICAgcmVzZXRUcmFja2VkRGF0YSxcclxuICAgIHNlbmRUcmFja2VkRGF0YVxyXG59IGZyb20gJy4vdmlzdWFsX3BhcmFtZXRlci5qcyc7XHJcblxyXG5sZXQgYnJ1c2g7IC8vIGJydXNoaW5nIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgcGxheUJvb2xlYW4gPSB0cnVlOyAvLyBwYXVzZSBhbmQgcGxheSBib29sZWFuXHJcblxyXG4vKipcclxuICogSW5pdCBhbGwgdGhlIGxpc3RlbmVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjcF9saXN0ZW5lcigpO1xyXG4gICAgc2ZfbGlzdGVuZXJzKCk7XHJcbiAgICBhZl9saXN0ZW5lcnMoKTtcclxuICAgIG1kX2xpc3RlbmVycygpO1xyXG4gICAgbl9saXN0ZW5lcnMoKTtcclxuICAgIGhfbGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGNvbnRyb2wgcGFuZWwgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBjcF9saXN0ZW5lcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgb3Igc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgJCgnLm1kaS1wYXVzZScpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnLm1kaS1wbGF5Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgJCgnLm1kaS1wbGF5JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcubWRpLXBhdXNlJykuc2hvdygpO1xyXG4gICAgICAgICAgICBTUFYuc2V0SW5kZXhUaW1lKHNsaWRlci5zbGlkZXIoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhdXNlIHRoZSBhbmltYXRpb24gYW5kIHNob3cgb25seSB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV4dC1mcmFtZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcnVzaGluZyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKCEkKCcjYnJ1c2hpbmctYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZGVmaW5lIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBicnVzaCA9IGQzLmJydXNoKClcclxuICAgICAgICAgICAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbU1BWLnRhbmtXaWR0aCwgU1BWLnRhbmtIZWlnaHRdXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdlbmQnLCBicnVzaGVuZCk7XHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoYnJ1c2gpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbnNlbGVjdCBhbGwgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKFtdKTtcclxuICAgICAgICAgICAgLy8gdHJhY2tpbmcgb2YgZGF0YSBmb3IgdmlzdWFsIHBhcmFtZXRlciBzdWdnZXN0aW9uXHJcbiAgICAgICAgICAgIHJlc2V0VHJhY2tlZERhdGEoKTtcclxuICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFjayB2aXN1YWwgcGFyYW1ldGVyIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHNldFRyYWNraW5nQm9vbGVhbihmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCB0aGUgdHJhY2tlZCB2aWEgYSBhamF4IHF1ZXJ5IHRvIHRoZSBzZXJ2ZXIgdG8gY2FsY3VsYXRlIHRoZSBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHNldFRyYWNraW5nQm9vbGVhbihmYWxzZSk7XHJcbiAgICAgICAgICAgIHNlbmRUcmFja2VkRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGlzYWJsZSBib3RoIGJ1dHRvbnMgYW5kIHJlbW92ZSB0aGUgYWN0aXZlIG9uZVxyXG4gICAgICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwYXRpYWwgdmlldyBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICAgKi9cclxuICAgICQoJyNiYWNrZ3JvdW5kLWNvbG9yJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjb2xvciA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1iYWNrZ3JvdW5kOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAkKCcjbWFpbi12aXMtc3ZnJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBzcGF0aWFsIHZpZXcgYXhpcyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctYXhpcycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIGZyYW1lICh0aW1lKSBudW1iZXIgaW4gdGhlIHNwYXRpYWwgdmlldyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdGltZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWUtdGV4dCcpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lLXRleHQnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRoZSBuZXR3b3JrIGJhY2tncm91bmQgY29sb3JcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYmFja2dyb3VuZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbmV0d29yayBiYWNrZ3JvdW5kIGVkZ2UgbGltaXRcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYmFja2dyb3VuZC1saW1pdCcpLnZhbCgxKTtcclxuICAgICQoJyNuZXR3b3JrLWJhY2tncm91bmQtbGltaXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbCkgJiYgdmFsID4gMCkge1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrQmFja2dyb3VuZExpbWl0KHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvciBTY2FsZSBGdW5jdGlvbiBSYWRpbyBidXR0b25zXHJcbiAgICAgKi9cclxuICAgICQoJyNjb2xvci1zY2FsZS1yYWRpby1mb3JtIGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yU2NhbGVbJ3R5cGUnXSA9ICQoJ2lucHV0W25hbWU9Y29sb3Itc2NhbGUtcmFkaW9dOmNoZWNrZWQnLCAnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0nKS52YWwoKTtcclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgc3dhcm0gZmVhdHVyZXMgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBzZl9saXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpcmVjdGlvbiBhcnJvdyBvZiB0aGUgYW5pbWFsXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWRpcmVjdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnZGlyZWN0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IGRpcmVjdGlvbiBkYXRhXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlyZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmFycm93Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5hcnJvdycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IG1lZG9pZCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctbWVkb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LW1lZG9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoISgnbWVkb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdtZWRvaWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbChzd2FybURhdGFbU1BWLmluZGV4VGltZV1bJ21lZG9pZCddKTtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgbWVkb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgU1BWLm1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgZGlzcGxheSB0aGUgbWVkb2lkIGZpc2hcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnY2VudHJvaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICAkKCcjZy1jZW50cm9pZCcpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBoaWRlIHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICAkKCcjZy1jZW50cm9pZCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNvbnZleCBodWxsIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jb252ZXgtaHVsbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jb252ZXgtaHVsbCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdodWxsJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdjb252ZXhfaHVsbCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdHJpYW5ndWxhdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10cmlhbmd1bGF0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndHJpYW5ndWxhdGlvbicgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgndHJpYW5ndWxhdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHZvcm9ub2lcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdm9yb25vaScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy12b3Jvbm9pJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ3Zvcm9ub2knIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ3Zvcm9ub2knKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgYWJzb2x1dGUgZmVhdHVyZSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGFmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgU3BlZWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXNwZWVkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuY2xpY2soKTtcclxuICAgICAgICBpZiAoJCgnI2RyYXctc3BlZWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgc3BlZWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdzcGVlZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ3NwZWVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnc3BlZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGFjY2VsZXJhdGlvbiBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuY2xpY2soKTtcclxuICAgICAgICBpZiAoJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvbiBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2FjY2VsZXJhdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBhY2NlbGVyYXRpb25cclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLmhpZGUoKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlzdGFuY2UgdG8gY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuY2xpY2soKTtcclxuICAgICAgICBpZiAoJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgZGlzdGFuY2VfY2VudHJvaWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdkaXN0YW5jZV9jZW50cm9pZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2Rpc3RhbmNlX2NlbnRyb2lkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQtZGV0YWlscycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZC1kZXRhaWxzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBtaWRsaW5lIG9mZnNldFxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5oaWRlKClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0OmNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpLmNsaWNrKCk7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGRyYXctbWlkbGluZV9vZmZzZXQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdkcmF3LW1pZGxpbmVfb2Zmc2V0JyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIG1pZGxpbmVfb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnbWlkbGluZV9vZmZzZXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcjZHJhdy1taWRsaW5lX29mZnNldC1kZXRhaWxzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdtaWRsaW5lX29mZnNldCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBuZXR3b3JrIGxpc3RlZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIG5fbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keSBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV0d29ya19pZCA9ICQodGhpcykuYXR0cignZGF0YScpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIG5hbWUgb2YgdGhlIGNob29zZW4gbmV0d29yayB0byB0aGUgTmV0d29yayBtb2RhbFxyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgkKHRoaXMpLmF0dHIoJ25hbWUnKSk7XHJcblxyXG4gICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjb2xvciBvZiB0aGUgbmV0d29ya1xyXG4gICAgICAgIHNldG5ldHdvcmtDb2xvcihuZXR3b3JrX2lkKTtcclxuICAgICAgICAkKCcjbmV0d29yay1kaXYnKS5tb2RhbCgndG9nZ2xlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYnV0dG9ucyBjbGlja2VkIC0gZ2V0IHRoZSBkYXRhXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3JrLXJlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldE5ldHdvcmtEYXRhKHt9KTtcclxuICAgICAgICBzZXROZXR3b3JrSUQoLTEpO1xyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbmV0d29yayBjb2xvclxyXG4gICAgICAgIHNldG5ldHdvcmtDb2xvcigtMSk7XHJcbiAgICAgICAgJCgnI2FjdGl2ZS1uZXR3b3JrLW5hbWUnKS50ZXh0KCcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBhdXRvIGJ1dHRvbiBzZXQgYWNpdmUgb3IgcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI25ldHdvcmstYXV0by1zdWdnZXN0JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0LXAnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLXNsaWRlcicpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0LXAnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLXNsaWRlcicpLnNob3coKTtcclxuICAgICAgICAgICAgc2V0TmV0d29ya0F1dG8oZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgbGltaXQgPSAkKCcjbmV0d29yay1zbGlkZXInKS5zbGlkZXIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvckxpbWl0KGxpbWl0KTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwobGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgbWV0YWRhdGEgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBtZF9saXN0ZW5lcnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIHN3YXRjaCBmdW5jdGlvbnMgY29sb3JpbmcgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAgICAgKi9cclxuICAgICQoJy5tZXRhZGF0YS1zd2F0Y2gubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgY29sb3JSR0IgPSAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIC8vIHNldCB0aGUgY29sb3Igb2YgdGhlIHN3YXRjaCBwcmV2aWV3XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXJvdy0nICsgaWQgKyAnICNwcmV2aWV3JylcclxuICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yUkdCKTtcclxuICAgICAgICAvLyBpZiB3aGl0ZSB0aGFuIHJlc2V0IHRoZSBjb2xvclxyXG4gICAgICAgIGlmIChjb2xvclJHQiA9PT0gJ3JnYigyNTUsIDI1NSwgMjU1KScpIHtcclxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhQ29sb3JbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbWV0YWRhdGFDb2xvcltpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2lkXSA9IGNvbG9yUkdCO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgZ3JvdXAgbWV0YWRhdGEgZnVuY3Rpb25zIGZvciBpbnN0YW5jZSBjb2xvciBzZXhcclxuICAgICAqL1xyXG4gICAgJCgnI2dyb3VwLW1ldGFkYXRhIDppbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyByZXNldCB0aGUgbWV0YWRhdCBhY29sb3JpbmdcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG5cclxuICAgICAgICAvLyBtZXRhZGF0YSBzZXggaXMgY2hvb3NlbiAtIGNvbG9yaW5nIGJhc2VkIG9uIG0gYW5kIGZcclxuICAgICAgICBpZiAodmFsdWUgPT09ICdzZXgnKSB7XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1kaXYnKS5tb2RhbCgndG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIC8vIGNsb3NlIGFuZCBjb2xvciBoZXJlXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNldCBvZiBpbmRpdmlkdWFsIHN0cmluZ3MgaW4gc2V4XHJcbiAgICAgICAgICAgIHRtcCA9IEFycmF5LmZyb20obmV3IFNldCh0bXApKTtcclxuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjMzg2Y2IwJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpID09PSB0bXBbal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBjb2xvcmluZyB0byB0aGUgbWV0YWRhdGFjb2xvciBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0JykuaGlkZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLnNob3coKTtcclxuICAgICAgICAgICAgLy8gc2V0IHZhbHVlcyBvZiBpbnB1dHNcclxuICAgICAgICAgICAgLy8gaGVyZSBhcmUgYXV0b21hdGljYWxseSBpbnB1dCB2YWx1ZXMgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgICAvLyAuMjUgYW5kIC43NSBwZXJjZW50aWxlcyBhcmUgdXNlZFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJsQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjI1KTsgLy8gYmVsb3cgYXZlcmFnZSB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgYWJBdmcgPSBkMy5xdWFudGlsZSh0bXAsIDAuNzUpOyAvLyBhYm92ZSBhdmVyYWdlXHJcbiAgICAgICAgICAgICQoJyNibC1hdmcnKS52YWwoYmxBdmcpO1xyXG4gICAgICAgICAgICAkKCcjYWItYXZnJykudmFsKGFiQXZnKTtcclxuICAgICAgICAgICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgICAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgZ3JvdXAgbWV0YWRhdGEgaW5wdXQgc3Bpbm5lclxyXG4gICAgICogKy8tIDAuMSB0byB0aGUgaW5wdXQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgJCgnLm51bWJlci1zcGlubmVyIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBidG4gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBvbGRWYWx1ZSA9IGJ0bi5jbG9zZXN0KCcubnVtYmVyLXNwaW5uZXInKS5maW5kKCdpbnB1dCcpLnZhbCgpLnRyaW0oKSxcclxuICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGJ0bi5hdHRyKCdkYXRhLWRpcicpID09ICd1cCcpIHtcclxuICAgICAgICAgICAgbmV3VmFsID0gcGFyc2VGbG9hdChvbGRWYWx1ZSkgKyAwLjE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG9sZFZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gcGFyc2VGbG9hdChvbGRWYWx1ZSkgLSAwLjE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQobmV3VmFsICogMTAwKSAvIDEwMDsgLVxyXG4gICAgICAgIGJ0bi5jbG9zZXN0KCcubnVtYmVyLXNwaW5uZXInKS5maW5kKCdpbnB1dCcpLnZhbChuZXdWYWwpO1xyXG4gICAgICAgIC8vIGNoYW5nZSB0aGUgY29sb3JpbmdcclxuICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGlucHV0IGZpZWxkcyBjaGFuZ2VcclxuICAgICAqL1xyXG4gICAgJCgnLm51bWJlci1zcGlubmVyIGlucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYWxsIG1ldGFkYXRhIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgJCgnI21ldGFkYXRhLXJlc2V0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0JykuaGlkZSgpO1xyXG4gICAgICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgaGllcmFyY2h5L2RlbmRncm9ncmFtIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gaF9saXN0ZW5lcnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFNob3cgZGVuZGdyb2dyYW0gc2xpZGluZyBidXR0b25cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW5pdFNob3dEZW5kcm9ncmFtTGlzdGVuZXIoaWQpIHtcclxuXHJcbiAgICAgICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tlZEJ1dHRvbklEID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJ1dHRvbnMgYW5kIGN1c3RvbSBoaWdobGlnaHQganVzdCBvbmUgb3Igbm9uZVxyXG4gICAgICAgICAgICAkKCcuc2hvdy1kZW5kcm9ncmFtJykuZWFjaChmdW5jdGlvbihpLCBidXR0b24pIHtcclxuICAgICAgICAgICAgICAgIC8vIGFjdGl2ZSBmb3VuZCBidXR0b25cclxuICAgICAgICAgICAgICAgIGlmICgkKGJ1dHRvbikuYXR0cignaWQnKSA9PT0gY2xpY2tlZEJ1dHRvbklEICYmICQoYnV0dG9uKS5oYXNDbGFzcygnYnRuLXByaW1hcnknKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tbGVmdCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1yaWdodCcpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGFkZCBoZXJlIGEgcmVzaXplIG9mIHRoZSBtYWluIHZpc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IC8vIHJlbW92ZSBoaWdobGlnaHRcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1sZWZ0Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLXJpZ2h0JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNob3cgZGVuZHJvZ3JhbVxyXG4gICAgICAgICAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWVyYXJjaHkgYnV0dG9uIGluIG5ldHdvcmsgbW9kYWwgb24gY2hhbmdlXHJcbiAgICAgKiBMb2FkIGRhdGEgb3IgcmVtb3ZlIGl0XHJcbiAgICAgKi9cclxuICAgICQoJy5oaWVhcmNoeS1jaGVja2JveCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgaWQgPSBjaGVja2JveC5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBjaGVja2JveC5hdHRyKCduYW1lJyk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWQgPSBjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgIGlmIChjaGVja2VkICYmICQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPCBtYXhOdW1iZXJIaWVyYXJjaGllcykge1xyXG4gICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICBnZXROZXR3b3JrSGllcmFyY2h5RGF0YShpZCk7XHJcblxyXG4gICAgICAgICAgICBhZGRIaWVyYXJjaHlCdXR0b24oaWQsIG5hbWUpO1xyXG4gICAgICAgICAgICBpbml0U2hvd0RlbmRyb2dyYW1MaXN0ZW5lcihpZCk7XHJcbiAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2Jykuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlbHNlIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoID09PSBtYXhOdW1iZXJIaWVyYXJjaGllcykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYXggbnVtYmVyIG9mIGhpZXJhcmNoaWVzIGlzOiAnICsgbWF4TnVtYmVySGllcmFyY2hpZXMpO1xyXG4gICAgICAgIC8vVE9ETyBpbXBsZW1lbnQgdGhpcyBoZXJlXHJcbiAgICAgICAgLy8gbm90aWNlIHVzZXIgdGhhdCBpdCBpcyBub3QgcG9zc2libGUgdG8gc2hvdyBtb3JlIHRoYW4gbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIC8vICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgLy8gICA8c3Ryb25nPkluZm8hPC9zdHJvbmc+IEF0dGVudGlvbiB1c2VyIC5cclxuICAgICAgICAvLyA8L2Rpdj5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRtcCB2YXJpYWJsZSB0byBzYXZlIGlmIHRoZSBidXR0b24gd2hpY2ggaXMgZ29pbmcgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICAvLyB3YXMgYWN0aXZlXHJcbiAgICAgICAgICAgIGxldCB0bXBBY3RpdmUgPSAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkuaGFzQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoe30sIGlkKTtcclxuXHJcbiAgICAgICAgICAgIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbihpZCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gZmluZCBiZXR0ZXIgd2F5IGhlcmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdnLmgnICsgaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRlbmRyb2dyYW0gYW5kIHRoZSBwYW5lbCBpZiB0aGUgcmVtb3ZlZCBlbGVtZW50IHdhcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICh0bXBBY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1idXR0b25zLWRpdicpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzaXplIHRoZSBtYWluIHN2Z1xyXG4gICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMtZGl2JykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC04Jyk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWxpemUgdGhlIG5ldHdvcmsgb25seSBpbiB0aGUgY2hvb3NlbiBoaWVyYXJjaHlcclxuICAgICAqL1xyXG4gICAgJCgnLm5ldHdvcmstaGllcmFyY2h5LWNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgaW5mbyBmb3IgdGhlIGNsaWNrZWQgYnV0dG9uXHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgYWxsIHRoZSBvdGhlciBhY3RpdmUgY2hlY2tib3hlc1xyXG4gICAgICAgICQoJy5uZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV0d29yayBpZFxyXG4gICAgICAgICAgICBzZXROZXR3b3JrSGllcmFyY2h5KGNoZWNrYm94LmF0dHIoJ2RhdGEnKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0TmV0d29ya0hpZXJhcmNoeSh1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGllcmFyY2h5IHNldCB0aGVvcnkgYnV0dG9ucyAtIHVuaW9uLCBpbnRlcnNlY3Rpb24sIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICAgKi9cclxuICAgICQoJy5zZXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmZpbmQoJ2lucHV0JykuYXR0cignZGF0YScpO1xyXG4gICAgICAgIHNldFNldE9wZXJhdGlvbihkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyA9IDtcclxuXHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHBsYXkgYm9vbGVhblxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gcGF1c2UgKGZhbHNlKSBvciBwbGF5ICh0cnVlKVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlCb29sZWFuKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2xpc3RlbmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBhY3RpdmVTY2FsZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxubGV0IHN2Z0xlZ2VuZDsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIGxlZ2VuZFxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ3JvdXAgdG8gdGhlIHN2ZyB3aGVyZSB0aGUgbGVnZW5kIGZvciB0aGUgY29sb3IgbGVnZW5kIGlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkU3BhdGlhbFZpZXdHcm91cCgpIHtcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDU1MDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA2MDtcclxuXHJcbiAgICBzdmdMZWdlbmQgPSBkMy5zZWxlY3QoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdtYWluLXZpcy1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBjb2xvciBsZWdlbmRcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VMZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hXaWR0aCA9IDUwO1xyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaEhlaWdodCA9IDIwO1xyXG4gICAgLy8gbGV0IGRpZmZlcmVudENvbG9ycyA9IDA7XHJcblxyXG4gICAgLy8gU2hvdyB0aGUgc3ZnIGZpcnN0IG9mIGFsbFxyXG4gICAgJCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgLy9jaGFuZ2UgdGhlIGNvbG9ycyBvZiB0aGUgYW5pbWFsc1xyXG4gICAgaWYgKGFjdGl2ZVNjYWxlICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLnJhbmdlKCkpO1xyXG5cclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBkaWZmZXJlbnRDb2xvcnMgPSB0bXBTY2FsZS5yYW5nZSgpXHJcbiAgICAgICAgLy8gLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgLy8gaGlkZSB0aGUgZGl2IGFnYWluXHJcbiAgICAgICAgJCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBMZWdlbmQgc3dhdGNoZXMgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRTd2F0Y2hXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuICAgIC8vIEVYSVQgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIFRleHQgIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoZCAqIDIpIC8gMjtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC10ZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIC8vIHBsdXMgNSBoYXMgdG8gYmUgY2hhbmdlZFxyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgaSAqIGxlZ2VuZFN3YXRjaFdpZHRoICsgNSkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBjb2xvcmJyZXdlciovXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY2hhbmdlTGVnZW5kXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5leHBvcnQgbGV0IGNvbG9yU2NhbGUgPSB7XHJcbiAgICB0eXBlOiAnTGluZWFyJyxcclxuICAgIGNvbG9yOiBjb2xvcmJyZXdlci5CdVlsQnVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBzY2FsZVxyXG4gKiBAcmV0dXJuIHtjb2xvclNjYWxlfSBhY3RpdmUgY29sb3Igc2NhbGUgaXMgaW4gbGluZWFyIG9yIHRocmVzaG9sZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJldHVybkNvbG9yU2NhbGUoKSB7XHJcbiAgICAvL2lmIGxpbmVhciBpcyBjaG9vc2VuXHJcbiAgICBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnTGluZWFyJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfSAvL1RocmVzaG9sZCBjb2xvciBzY2FsZVxyXG4gICAgZWxzZSBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnVGhyZXNob2xkJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgY29sb3IgcGlja2VyXHJcbiAqIHdpdGggYWxsIGxpc3RlbmVycyBpbmNsdWRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb2xvclBpY2tlcigpIHtcclxuICAgIGQzLnNlbGVjdCgnLmNvbG9ycy1ib2R5JylcclxuICAgICAgICAuc2VsZWN0QWxsKCcucGFsZXR0ZScpXHJcbiAgICAgICAgLmRhdGEoZDMuZW50cmllcyhjb2xvcmJyZXdlcikpXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGFsZXR0ZScpXHJcbiAgICAgICAgLmF0dHIoJ3RpdGxlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5rZXk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyBoaWdodGxpZ2h0IHRoZSByaWdodCBwYWxldHRlXHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlW3RpdGxlPVwiJyArIGQua2V5ICsgJ1wiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBjb2xvclNjYWxlLmNvbG9yID0gY29sb3JicmV3ZXJbZC5rZXldO1xyXG4gICAgICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJy5zd2F0Y2gnKVxyXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3NwYW4nKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzd2F0Y2gnKVxyXG4gICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBjb2xvciBzY2hlbWVcclxuICAgICQoJy5wYWxldHRlW3RpdGxlPVwiQnVZbEJ1XCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0TWV0YWRhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgbWV0YWRhdGFDb2xvciA9IHt9OyAvLyBzYXZlIHRoZSBtZXRhZGF0YSBjb2xvcmluZ1xyXG5cclxuLyoqXHJcbiAqIEluaXQgTWV0YWRhdGEgYnV0dG9ucyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTWV0YWRkYXRhKCkge1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnI2ZmZicsICcjZTQxYTFjJywgJyMzNzdlYjgnLCAnIzRkYWY0YScsICcjOTg0ZWEzJywgJyNmZjdmMDAnLCAnI2ZmZmYzMycsICcjYTY1NjI4J107XHJcbiAgICAvLyBhZGQgdGhlIGRhdGEgdG8gdGhlIG1ldGFkYXRhIG1vZGFsXHJcbiAgICBpZiAoZGF0YXNldE1ldGFkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtdGFibGUnKS5maW5kKCd0Ym9keScpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ciBpZD1cIm1ldGFkYXRhLXJvdy0nICsgZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSArICdcIj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnd2VpZ2h0J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoYDxkaXYgY2xhc3M9XCJkcm9wZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1jb2xvclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInByZXZpZXdcIiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojZmZmXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvci1maWVsZFwiIHZhbHVlPVwiV2hpdGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFN0cmluZyArPSAnPGRpdiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaCBtZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvcnNbaV0gKyAnXCIgdmFsdWU9XCInICsgaWQgKyAnXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvdWw+PC9kaXY+JylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdUaGVyZSBpcyBubyBtZXRhZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2l6ZSBhbmQgd2VpZ2h0IGNvbG9yaW5nIGZvciB0aGUgbWV0YWRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvck1ldGFkYXRhKCkge1xyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuICAgIC8vIGdldCB0aGUgaW5wdXQgdmFsdWVzXHJcbiAgICBsZXQgdmFsdWUgPSAkKCcjZ3JvdXAtbWV0YWRhdGEgLmJ0bi5idG4tZGVmYXVsdC5hY3RpdmUgaW5wdXQnKVxyXG4gICAgICAgIC5hdHRyKCd2YWx1ZScpO1xyXG4gICAgbGV0IGJsQXZnID0gJCgnI2JsLWF2ZycpLnZhbCgpO1xyXG4gICAgbGV0IGFiQXZnID0gJCgnI2FiLWF2ZycpLnZhbCgpO1xyXG4gICAgLy8gY29sb3Igc2NoZW1lIGZvciB0aGUgaW5wdXRzXHJcbiAgICBsZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyNmZGMwODYnLCAnIzM4NmNiMCddO1xyXG4gICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPCBibEF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA+IGFiQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1sxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWV0YWRhdGEgcmVzZXQgYWxsIGluZGl2aWR1YWwgbWV0YWRhdGEgaW5wdXQgZmllbGRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKSB7XHJcbiAgICBtZXRhZGF0YUNvbG9yID0ge307XHJcbiAgICAkKCcuZHJvcGRvd24gI3ByZXZpZXcnKVxyXG4gICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIC8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vLyAvKmdsb2JhbCB3aW5kb3csICQsIHBhcmFtZXRlcnMgKi9cclxuLy9cclxuLy8gaW1wb3J0IHtcclxuLy8gICAgIGdldFN1Z2dlc3RlZFBhcmFtZXRlcnNcclxuLy8gfSBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcbi8vIFxyXG4vLyBpbXBvcnQge1xyXG4vLyAgICAgc2V0UGxheUJvb2xlYW5cclxuLy8gfSBmcm9tICcuL2xpc3RlbmVyLmpzJztcclxuLy9cclxuLy9cclxuLy8gZXhwb3J0IGxldCB0cmFja2luZ0Jvb2xlYW4gPSBmYWxzZTsgLy8gYm9vbGVhbiBmb3IgYWN0aXZlIHRyYWNraW5nXHJcbi8vIGxldCB0cmFja2VkRGF0YSA9IFtdO1xyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogU2V0IHRoZSBib29sZWFuIHZhbHVlIGlmIHRyYWNraW5nIHNob3VsZCBiZSBhY3RpdmF0ZWRcclxuLy8gICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIEJvb2xlYW4gZm9yIGFjdGl2ZSB2YWx1ZVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNldFRyYWNraW5nQm9vbGVhbih2YWx1ZSkge1xyXG4vLyAgICAgdHJhY2tpbmdCb29sZWFuID0gdmFsdWU7XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIFJlc2V0cyB0aGUgdHJhY2tlZCBkYXRhXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gcmVzZXRUcmFja2VkRGF0YSgpIHtcclxuLy8gICAgIHRyYWNrZWREYXRhID0gW107XHJcbi8vICAgICB0cmFja2luZ0Jvb2xlYW4gPSBmYWxzZTtcclxuLy8gICAgIC8vIGRpc2FibGUgdGhlIHNlbmQgYnV0dG9uXHJcbi8vICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4vLyB9XHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiBBZGQgZGF0YSB0byB0cmFja2VkRGF0YVxyXG4vLyAgKiBAcGFyYW0ge051bWVyaWN9IHRpbWUgLSB0aW1lIG9mIHRoZSBmcmFtZVxyXG4vLyAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gQXJyYXkgb2YgYW5pbWFscyBpZHMgZm9yIHRoZSBzcGVjaWZpYyBmcmFtZVxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGFkZFRyYWNrZWREYXRhKHRpbWUsIGlkcykge1xyXG4vLyAgICAgdHJhY2tlZERhdGEucHVzaCh7XHJcbi8vICAgICAgICAgW3RpbWVdOiBKU09OLnN0cmluZ2lmeShpZHMpXHJcbi8vICAgICB9KTtcclxuLy8gICAgIC8vIGVuYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uXHJcbi8vICAgICBpZiAoJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuaXMoJzpkaXNhYmxlZCcpICYmICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmF0dHIoJ2RhdGEnKSA9PSAwKSB7XHJcbi8vICAgICAgICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy9cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIFNlbmQgZGF0YSB3aXRoIGEgYWpheCBxdWVyeSB0byB0aGUgc2VydmVyIGFuZCB3YWl0IGZvciB0aGUgYW5zd2VyXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gc2VuZFRyYWNrZWREYXRhKCkge1xyXG4vLyAgICAgZGlzYWJsZUNhbGN1bGF0aW9uQnV0dG9uKCk7XHJcbi8vICAgICBnZXRTdWdnZXN0ZWRQYXJhbWV0ZXJzKEpTT04uc3RyaW5naWZ5KHRyYWNrZWREYXRhKSk7XHJcbi8vICAgICByZXNldFRyYWNrZWREYXRhKCk7XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIFJlc3BvbnNlIG9mIHRoZSBhamF4IHF1ZXJ5IC0gb3BlbiBuZXcgdGFiIHdpdGggdmFsdWVzIHRvIGNyZWF0ZSBuZXR3b3JrXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VQYXJhbWV0ZXJzKGRhdGEpIHtcclxuLy8gICAgIHNldFBsYXlCb29sZWFuKGZhbHNlKTtcclxuLy8gICAgIC8vIG9wZW4gbmV0d29yayBjcmVhdGUgdXJsXHJcbi8vICAgICBsZXQgdXJsID0gJy4uLy4uL25ldHdvcmsvbmV3P2RhdGFzZXRfaWQ9JyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnJicgKyAkLnBhcmFtKGRhdGFbJ2RhdGEnXVsnbWF4X3BhcmFtcyddKTtcclxuLy8gICAgIC8vIGNyZWF0ZSBuZXcgdGFiIHdpdGggdGhlIHJlc3VsdCBwYXJhbWV0ZXJcclxuLy8gICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xyXG4vLyAgICAgZW5hYmxlQ2FsY3VsYXRpb25CdXR0b24oKTtcclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogRGlzYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uIC0+IGxvYWRpbmcgc3ltYm9sXHJcbi8vICAqL1xyXG4vLyBmdW5jdGlvbiBkaXNhYmxlQ2FsY3VsYXRpb25CdXR0b24oKSB7XHJcbi8vICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBnbHlwaGljb24tcmVmcmVzaC1hbmltYXRlXCI+PC9zcGFuPkxvYWRpbmcnKTtcclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbi8vICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJywgMSk7XHJcbi8vXHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIEVuYWJsZSB0aGUgY2FsY3VsYXRpb24gYnV0dG9uIHJlbW92ZSBsb2FkaW5nIHN5bWJvbFxyXG4vLyAgKi9cclxuLy8gZnVuY3Rpb24gZW5hYmxlQ2FsY3VsYXRpb25CdXR0b24oKSB7XHJcbi8vICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdGFza3NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Q2FsY3VsYXRlJyk7XHJcbi8vICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5hdHRyKCdkYXRhJywgMCk7XHJcbi8vXHJcbi8vIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvdmlzdWFsX3BhcmFtZXRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIHBhcmFtZXRlcnMqL1xyXG5pbXBvcnQge1xyXG4gICAgc2V0SW5kZXhUaW1lXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBkYXRhc2V0LFxyXG4gICAgYW5pbWFsSWRzXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc0xpbmVDaGFydFxyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5kZXhUaW1lLFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCB6b29tRnVuY3Rpb247XHJcblxyXG5sZXQgdHJlbmRDaGFydHNab29tID0ge307XHJcbmxldCB0cmVuZENoYXJ0c0VsZW0gPSBbJ2xvd2VyLW91dGVyLWFyZWEnLCAnbG93ZXItaW5uZXItYXJlYScsICdtZWRpYW4tbGluZScsICd1cHBlci1pbm5lci1hcmVhJywgJ3VwcGVyLW91dGVyLWFyZWEnXTtcclxubGV0IGxpbmVDaGFydFdpZHRoID0gNTAwMDtcclxubGV0IHJhdGlvID0gMTtcclxubGV0IHpvb21Hcm91cDtcclxubGV0IHg7XHJcbmxldCB5O1xyXG5cclxuLyoqXHJcbiAqIGluaXQgdGhlIGxpbmUgY2hhcnQgYW5kIGFsc28gdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGluZUNoYXJ0KCkge1xyXG5cclxuICAgIHJhdGlvID0gTWF0aC5jZWlsKHN3YXJtRGF0YS5sZW5ndGggLyBsaW5lQ2hhcnRXaWR0aCk7XHJcblxyXG4gICAgLy8gU3dhcm0gZmVhdHVyZXMgbGluZSBjaGFydFxyXG4gICAgbGV0IGxpbmVDaGFydEhlaWdodCA9IDUwMDsgLy8gdGhlIGxpbmUgY2hhcnQgaGVpZ2h0XHJcbiAgICBsZXQgbWFyZ2luID0ge1xyXG4gICAgICAgIHRvcDogMTAsXHJcbiAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgYm90dG9tOiAxMDAsXHJcbiAgICAgICAgbGVmdDogMTBcclxuICAgIH07XHJcbiAgICBsZXQgbWFyZ2luVG9MZWdlbmQgPSA1MDtcclxuXHJcbiAgICBsZXQgc3dhcm1fZmVhdHVyZXMgPSBPYmplY3Qua2V5cyhzd2FybURhdGFbMF0pO1xyXG4gICAgLy8gcmVtb3ZlIHRoZSB0aW1lIGtleVxyXG4gICAgbGV0IGluZGV4ID0gc3dhcm1fZmVhdHVyZXMuaW5kZXhPZigndGltZScpO1xyXG4gICAgc3dhcm1fZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgLy8gYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSBzd2FybSBkYXRhIHRvIGxpbmVDaGFydFdpZHRoIHBvaW50cyBpbiB0aGUgbGluZSBjaGFydFxyXG4gICAgaWYgKHN3YXJtRGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIC8vIHRtcCBhcnJheSBmb3IgdGhlIGFnZ3JlZ2F0ZWQgYW5kIGF2ZXJhZ2VkIGZlYXR1cmVzXHJcbiAgICAgICAgbGV0IHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZSB0aGUgZmVhdHVyZXMgaW4gdGhlIHRlbXAgYXJyYXlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdG1wW2pdICs9IHN3YXJtRGF0YVtpXVtzd2FybV9mZWF0dXJlc1tqXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHJhdGlvIGlzIHplcm8gdGhlbiBhdmVyYWdlIGl0IGFuZCBzZXQgaXQgdG8gemVyb1xyXG4gICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX29iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGltZSc6IGkgLyByYXRpb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gdG1wW2pdIC8gcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX29iamVjdFtzd2FybV9mZWF0dXJlc1tqXV0gPSB0bXBbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZUNoYXJ0RGF0YS5wdXNoKHRtcF9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gbmV3IEFycmF5KHN3YXJtX2ZlYXR1cmVzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGluZUNoYXJ0RGF0YSA9IHN3YXJtRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB6b29tRnVuY3Rpb24gPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuXHJcblxyXG4gICAgLy8geCBheGlzIHNjYWxlIC0gbWludXMgbWFyZ2luTGluZUNoYXJ0ICBuZWVkZWRcclxuICAgIHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxyXG4gICAgICAgIC5yYW5nZShbbGluZUNoYXJ0SGVpZ2h0LCAwXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KVxyXG4gICAgICAgIC50aWNrcygwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IGRyYWdnZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkcmFnZ2VkIGZ1bmN0aW9uIGdldCB0aGUgY29vcmRpbmF0ZXMgYW5kIGNhbGN1bGF0ZSB0aGUgdGltZSBtb21lbnQgZnJvbSB0aGlzXHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMpO1xyXG4gICAgICAgIGlmIChjb29yZHNbMF0gPCBtYXJnaW4ubGVmdCB8fCBjb29yZHNbMF0gPiBsaW5lQ2hhcnRXaWR0aCB8fCBjb29yZHNbMV0gPCAwIHx8IGNvb3Jkc1sxXSA+IGxpbmVDaGFydEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRtcCBzY2FsZSB0byBpbmNsdWRlIHRoZSB6b29tIGZhY3RvclxyXG4gICAgICAgIGxldCB0bXBTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbih6b29tRnVuY3Rpb24ucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKHpvb21GdW5jdGlvbi5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgdGltZVxyXG4gICAgICAgIHNldEluZGV4VGltZShNYXRoLmZsb29yKCh0bXBTY2FsZShjb29yZHNbMF0gLSBtYXJnaW4ubGVmdCkpICogcmF0aW8pKTtcclxuICAgIH07XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICB6b29tRnVuY3Rpb24gPSB4LmRvbWFpbih0LnJlc2NhbGVYKHgyKS5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIC8vIHpvb20gZWFjaCBhdmFpYWJsZSBsaW5lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBsaW5lcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXAuc2VsZWN0KCgnIycgKyBrZXkgKyAnTGluZScpKS5hdHRyKCdkJywgbGluZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gem9vbSB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0cmVuZENoYXJ0c1pvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0c1pvb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgoJyMnICsga2V5ICsgJ1RyZW5kQ2hhcnQgLicgKyB0cmVuZENoYXJ0c0VsZW1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0cmVuZENoYXJ0c1pvb21ba2V5XVt0cmVuZENoYXJ0c0VsZW1baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3ZnIHJlc2l6YWJsZVxyXG4gICAgbGV0IHN3YXJtTGluZUNoYXJ0ID0gZDMuc2VsZWN0KCcjc3dhcm0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzLWxpbmUtY2hhcnQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGxpbmVDaGFydEhlaWdodCArICcpJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgLy8gYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSB5IGF4aXNcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMtbGluZS1jaGFydCcpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuXHJcbiAgICAvLyB0aGUgdGltZSBsaW5lIGFwcGVuZCB0aGUgbGluZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbWUtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAuYXR0cigneDEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gyJywgMClcclxuICAgICAgICAuYXR0cigneTInLCBsaW5lQ2hhcnRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGNvbG9ycyBmb3IgdGhlIGxpbmVzXHJcbiAgICBsZXQgbGluZV9jb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XHJcbiAgICBsZXQgbGluZXMgPSB7fTtcclxuICAgIC8vIGFkZCB0aGUgbGluZXMgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWluID0gZDMubWluKGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgobGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZFsndGltZSddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbc3dhcm1fZmVhdHVyZXNbaV1dKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmVzW3N3YXJtX2ZlYXR1cmVzW2ldXSA9IGxpbmU7XHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIGxpbmUgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgICAgICB6b29tR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmRhdGEoW2xpbmVDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBsaW5lQ2hhcnRMaW5lJylcclxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBsaW5lX2NvbG9ycyhpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgICAgICAuYXR0cignbmFtZScsIHN3YXJtX2ZlYXR1cmVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd6b29tJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsaW5lQ2hhcnRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGluZUNoYXJ0SGVpZ2h0KVxyXG4gICAgICAgIC5jYWxsKHpvb20pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGRyYWdnZWQpXHJcbiAgICAgICAgLmNhbGwoZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5vbignZHJhZycsIGRyYWdnZWQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIGxlZ2VuZCBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvL3NlbGVjdCBhbGwgdGhlIGxpbmVzXHJcbiAgICBsZXQgY2hhcnRMaW5lcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmUnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoY2hhcnRMaW5lcy5fZ3JvdXBzWzBdKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQuc3R5bGUuc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgKyAnOiAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgdmFsdWUgb2YgdGhlIGxpbmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGV4cHJlc3Npb24gZ2V0cyB0aGUgdGV4dCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyMnICsgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJykubm9kZSgpLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICtcclxuICAgICAgICAgICAgICAgICAgICAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJzAuMCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgbGVnZW5kIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd0cmVuZENoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKFsnNSUgLSA5NSUnLCAnMjUlIC0gNzUlJywgJ01lZGlhbiddKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzc0YTljZic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzA0NWE4ZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNTI1MjUyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkKTtcclxuICAgICAgICB9KTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIGluaXRMaW5lQ2hhcnRCdXR0b25zKHN3YXJtX2ZlYXR1cmVzKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGxpbmUgY2hhcnQgYnV0dG9uIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdExpbmVDaGFydEJ1dHRvbnMoc3dhcm1fZmVhdHVyZXMpIHtcclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcjbGluZS1jaGFydC1mZWF0dXJlLWNoZWNrYm94ZXMnKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCc8dHI+PHRoPiA8ZGl2IGNsYXNzPVwicHJldHR5IHAtc3dpdGNoIHAtZmlsbCBwLWJpZ2dlclwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImxpbmUtY2hhcnQtY2hlY2stYm94XCIgaWQ9XCJkcmF3LScgK1xyXG4gICAgICAgICAgICAgICAgc3dhcm1fZmVhdHVyZXNbaV0gKyAnXCIgZGF0YT1cIiMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZVwiIC8+PGRpdiBjbGFzcz1cInN0YXRlXCI+PGxhYmVsPicgK1xyXG4gICAgICAgICAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgKyAnPC9sYWJlbD48L2Rpdj48L2Rpdj48L3RoPjwvdHI+Jyk7XHJcbiAgICB9XHJcbiAgICAvL2NoZWNrIGxpbmUgY2hhcnQgZHJhdyBhbGwgbGluZXNcclxuICAgICQoJyNsaW5lLWNoYXJ0LWZlYXR1cmUtY2hlY2tib3hlcyBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQoY2hlY2tib3guYXR0cignZGF0YScpKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChjaGVja2JveC5hdHRyKCdkYXRhJykpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKSB7XHJcbiAgICAkKCcuZHJhdy1kZXRhaWxzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgZGlzYWJsZUxpbmVDaGFydCgpO1xyXG4gICAgICAgICAgICBhZGRUcmVuZENoYXJ0KHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRyZW5kQ2hhcnQoKTtcclxuICAgICAgICAgICAgZW5hYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICovXHJcbmZ1bmN0aW9uIGRpc2FibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnLmxpbmUtY2hhcnQtY2hlY2stYm94JykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJy5saW5lLWNoYXJ0LWNoZWNrLWJveCcpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVUcmVuZENoYXJ0KCkge1xyXG4gICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgdHJlbmQgY2hhcnQgc2hvd2luZyBtZWRpYW4gYW5kIHBlcmNlbnRpbGVzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gd2hpY2ggZmVhdHVyZVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAvLyBjaGVjayB3aGljaCBmZWF0dXJlIHRvIGRpc3BsYXkgaW4gdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICBsZXQgZmVhdHVyZSA9ICcnO1xyXG4gICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnc3BlZWQnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FjY2VsZXJhdGlvbicpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rpc3RhbmNlX2NlbnRyb2lkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2Rpc3RhbmNlX2NlbnRyb2lkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtaWRsaW5lX29mZnNldCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdtaWRsaW5lX29mZnNldCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxJZHMubGVuZ3RoO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcGVyY2V0aWxlcyBmb3IgZXZlcnkgdGltZSBzdGVwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bV9hbmltYWxzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0W2kgKiBudW1fYW5pbWFscyArIGpdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXVtmZWF0dXJlXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJlbmRDaGFydERhdGEucHVzaChwZXJjZW50aWxlc0xpbmVDaGFydCh0bXApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZ2dyZWdhdGUgYW5kIGF2ZXJhZ2UgdGhlIHRyZW5kQ2hhcnREYXRhIHRvIGxpbmVDaGFydFdpZHRoIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgaWYgKHRyZW5kQ2hhcnREYXRhLmxlbmd0aCA+IGxpbmVDaGFydFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXBUcmVuZENoYXJ0RGF0YSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2dyZWdhdGVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRyZW5kQ2hhcnREYXRhW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZGl2aWRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICB0bXBUcmVuZENoYXJ0RGF0YS5wdXNoKHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhID0gdG1wVHJlbmRDaGFydERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBtaW4gYW5kIG1heCBmb3IgdGhlIG5vcm1hbGl6YXRpb25cclxuICAgICAgICBsZXQgbWluID0gZDMubWluKHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgodHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbNF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCB0cmVuZENoYXJ0ID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyZW5kQ2hhcnREYXRhJyk7XHJcbiAgICAgICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZSBhZ2FpbiB0byB0aGUgZW5kIG9mIHRoZSBncm91cFxyXG4gICAgICAgICQoJy56b29tJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgLy8gdmFyIHRvIHNhdmUgdGhlIGZ1bmN0aW9ucyBmb3IgdGhlIHpvb21cclxuICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV0gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIGZvciB0aGUgdXBwZXIgYW5kIGlubmVyIGFyZWFzIGFuZCB0aGUgbWVkaWFuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBsb3dlciBvdXRlciBhcmVhIGFuZCBsb3dlciBpbm5lciBhcmVhXHJcbiAgICAgICAgICAgIGlmIChpIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSArIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtZWRpYW4gbGluZVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1cHBlciBpbm5lciBhcmVhIGFuZCB1cHBlciBvdXRlciBhcmVhXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSAtIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNhdmUgdGhpcyBmb3IgdGhlIGxhdGVyIHpvb21cclxuICAgICAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdW3RyZW5kQ2hhcnRzRWxlbVtpXV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhdGhcclxuICAgICAgICAgICAgdHJlbmRDaGFydC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoW3RyZW5kQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHRyZW5kQ2hhcnRzRWxlbVtpXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBzaG93IHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICQoKCcjJyArIGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgdGhlIGxpbmUgY2hhcnQgZmllbGRzIGFuZCB0aGUgbGluZSBjaGFydCB0aW1lIGxpbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMaW5lQ2hhcnQoKSB7XHJcbiAgICBpZiAoZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKSAmJiBzd2FybURhdGFbTWF0aC5jZWlsKGluZGV4VGltZSAvIHJhdGlvKV0pIHtcclxuICAgICAgICBsZXQgdG1wID0gTWF0aC5jZWlsKGluZGV4VGltZSAvIHJhdGlvKTtcclxuICAgICAgICAvL3VwZGF0ZSB0aGUgbGluZSBjaGFydCBsZWdlbmQgdGV4dCB2YWx1ZXMgcGVyIHNlY29uZFxyXG4gICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGNoYW5nZSB0aGlzIHRvIGEgbW9yZSBtb2R1bGFyIHdheVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNjb252ZXhfaHVsbF9hcmVhTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KChzd2FybURhdGFbdG1wXVsnY29udmV4X2h1bGxfYXJlYSddKSArICdtbcKyJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI3NwZWVkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydzcGVlZCddICsgJ21tL3MnKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjYWNjZWxlcmF0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydhY2NlbGVyYXRpb24nXSArICdtbS9zwrInKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlzdGFuY2VfY2VudHJvaWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2Rpc3RhbmNlX2NlbnRyb2lkJ10gKyAnbW0nKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlyZWN0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydkaXJlY3Rpb24nXSArICfCsCcpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNwb2xhcmlzYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ3BvbGFyaXNhdGlvbiddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgem9vbUZ1bmN0aW9uKHRtcCkgKyAnLDApJyk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGluZV9jaGFydC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQqL1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgYW5pbWFsSWRzXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgTmV0d29yayBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmV4cG9ydCBsZXQgc2xpZGVyOyAvLyB0aW1lIHNsaWRlciBvZiB0aGUgYXBwXHJcbmV4cG9ydCBsZXQgdG9vbHRpcDsgLy8gdG9vbHRpcCBmdW5jdGlvblxyXG5cclxuLyoqXHJcbiAqIEJydXNoIGVuZCBmdW5jdGlvblxyXG4gKiBhZGQgYWN0aXZlIGFuaW1hbHMgdG8gdGhlIGFycmF5IG9yIHJlbW92ZSB0aGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XHJcbiAgICBsZXQgYXJyYXlBbmltYWxzID0gU1BWLmFycmF5QW5pbWFscztcclxuICAgIGxldCBhY3RpdmVBbmltYWxzID0gU1BWLmFjdGl2ZUFuaW1hbHM7XHJcbiAgICB2YXIgcmVjdCA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcclxuICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSAxNTEgZmlzaCB0byBjaGVjayB3aGljaCBhcmUgaW4gdGhlIGJydXNoXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFuaW1hbElkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwb2ludCA9IFthcnJheUFuaW1hbHNbaV1bJ3AnXVswXSwgYXJyYXlBbmltYWxzW2ldWydwJ11bMV1dO1xyXG4gICAgICAgIC8vY2hlY2sgd2hpY2ggZmlzaCBhcmUgaW4gIHRoZSBicnVzaGVkIGFyZWFcclxuICAgICAgICBpZiAoKHJlY3RbMF1bMF0gPD0gcG9pbnRbMF0pICYmIChwb2ludFswXSA8PSByZWN0WzFdWzBdKSAmJlxyXG4gICAgICAgICAgICAocmVjdFswXVsxXSA8PSBwb2ludFsxXSkgJiYgKHBvaW50WzFdIDw9IHJlY3RbMV1bMV0pKSB7XHJcbiAgICAgICAgICAgIC8vIFBvaW50IGlzIGluIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goYXJyYXlBbmltYWxzW2ldWydhJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKGFjdGl2ZUFuaW1hbHMpO1xyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH1cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAkKCcuYnJ1c2gnKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRvb2x0aXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcCgpIHtcclxuICAgIHRvb2x0aXAgPSBkMy5zZWxlY3QoJ2Rpdi50b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVG9vbHRpcCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gZCAtIGQzIGRhdGEgb2JqZWN0IHdpdGggdGhlIG1ldGFkYXRhIGluZm9ybWF0aW9uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9vbHRpcEZ1bmN0aW9uKGQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRbJ2EnXSA9PT0gZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIG1vZHVsYXJcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLWFuaW1hbC1pZCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNwZWNpZXMnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2V4JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2l6ZScpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC13ZWlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRpbWUgc2xpZGVyIGFuZCB0aGUgZHluYW1pYyBuZXR3b3JrIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXJzKCkge1xyXG4gICAgLy8gdGltZSBzbGlkZXJcclxuICAgIHNsaWRlciA9ICQoJyNzbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogc3dhcm1EYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RlcDogMjUsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgcGF1c2VkIGFwcGx5IGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIE5ldHdvcmsgc2xpZGVyXHJcbiAgICAkKCcjbmV0d29yay1zbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICB2YWx1ZTogMC41LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBOZXR3b3JrLnNldE5ldHdvckxpbWl0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gc2V0IHRleHQgZm9yIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvblxyXG4gICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwoMC41KTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1heCBmcm9tIHRoZSBzbGlkZXIgdGhpcyBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSB0aWNrc1xyXG4gICAgbGV0IG1heCA9IHNsaWRlci5zbGlkZXIoJ29wdGlvbicsICdtYXgnKTtcclxuICAgIGxldCBzcGFjZSA9IDEwMCAvIG1heDtcclxuICAgIC8vYXBwZW5kIHRoZSBtaW51dGUgdGlja3NcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpID0gaSArIDE1MDApIHtcclxuICAgICAgICAkKCc8c3BhbiBjbGFzcz1cInVpLXNsaWRlci10aWNrXCI+PC9zcGFuPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2xlZnQnLCAoc3BhY2UgKiBpKSArICclJylcclxuICAgICAgICAgICAgLmFwcGVuZFRvKHNsaWRlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHRpbWUgc2xpZGVyIHRvIGEgbmV3IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB2YWx1ZSBmb3IgdGhlIHRpbWUgc2xpZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZVNsaWRlcih2YWx1ZSkge1xyXG4gICAgc2xpZGVyLnNsaWRlcigndmFsdWUnLCB2YWx1ZSk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBJY29ucyBmb3IgYm9vdHN0cmFwIDQgKi9cXHJcXG5cXHJcXG4ubWRpOjpiZWZvcmUge1xcclxcbiAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiA0cHg7XFxyXFxufVxcclxcblxcclxcbi5idG4teHMgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1zbSAubWRpOjpiZWZvcmUge1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIHRvcDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZHJvcGRvd24tbWVudSAubWRpIHtcXHJcXG4gICAgd2lkdGg6IDE4cHg7XFxyXFxufVxcclxcblxcclxcbi5kcm9wZG93bi1tZW51IC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiA0cHg7XFxyXFxuICAgIGxlZnQ6IC04cHg7XFxyXFxufVxcclxcblxcclxcbi5uYXYgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciAubmF2YmFyLXRvZ2dsZSAubWRpOjpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogNHB4O1xcclxcbiAgICBjb2xvcjogI0ZGRjtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgYTpob3ZlciB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgYTpob3ZlciBzcGFuIHtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5hbGVydCAubWRpOjpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogNHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uIC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXItYnJhbmQgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDJweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XFxyXFxufVxcclxcblxcclxcbi5saXN0LWdyb3VwLWl0ZW0gLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDNweDtcXHJcXG4gICAgbGVmdDogLTNweFxcclxcbn1cXHJcXG5cXHJcXG4vKiBTVkcgZWxlbWVudHMgYW5kIHRleHQgKi9cXHJcXG5cXHJcXG4jbWFpbi12aXMge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jaGllcmFyY2h5LWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbi12aXMtbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxuICAgIHRvcDogMTBweDtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudC1kZW5kcm9ncmFtIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvICovXFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiAxNyU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBwYXRoIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgbGluZSB7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjM7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLngge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnkge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMtbGluZS1jaGFydCBwYXRoIGxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVGltZSAgKi9cXHJcXG5cXHJcXG4uZnJhbWUtdGV4dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2xpZGVyIHRpY2tzICAqL1xcclxcblxcclxcbi51aS1zbGlkZXItdGljayB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgd2lkdGg6IDNweDtcXHJcXG4gICAgYmFja2dyb3VuZDogIzMzN2FiNztcXHJcXG4gICAgaGVpZ2h0OiAwLjhlbTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBMYW9kaW5nIGdpZiAgICovXFxyXFxuXFxyXFxuI2xvYWRpbmcge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBsZWdlbmQgICAgKi9cXHJcXG5cXHJcXG4ubGVnZW5kIHtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpbWUtbGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qc3dhcm0gZmVhdHVyZXMgKi9cXHJcXG5cXHJcXG4uY2VudHJvaWQge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5tZWRvaWQge1xcclxcbiAgICBmaWxsOiAjZTcyOThhICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaHVsbC1wYXRoIHtcXHJcXG4gICAgZmlsbDogI2ZmZjtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZXJhcmNoeS1ncm91cCB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTA7XFxyXFxuICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XFxyXFxuICAgIG9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24ge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC40O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBicmV3ZXIgcGlja2VyIGRpdiAqL1xcclxcblxcclxcbi5wYWxldHRlIHtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZTtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXHJcXG4gICAgbWFyZ2luOiA0cHggMCA0cHggNHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYWFhO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhdGNoIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICB3aWR0aDogMjJweDtcXHJcXG4gICAgaGVpZ2h0OiAyMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udm9yb25vaSB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi8qIFRvb2x0aXAgKi9cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDI1NSkgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICMxYjgwOWUgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXHJcXG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbmRpdi50b29sdGlwIHRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi50b29sdGlwLXNwYW4ge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxufVxcclxcblxcclxcbi51cHBlci1vdXRlci1hcmVhLCAubG93ZXItb3V0ZXItYXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzc0YTljZjtcXHJcXG4gICAgc3Ryb2tlOiAjMzY5MGMwO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXItaW5uZXItYXJlYSwgLmxvd2VyLWlubmVyLWFyZWEge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIGZpbGw6ICMwNDVhOGQ7XFxyXFxuICAgIHN0cm9rZTogIzAyMzg1ODtcXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhbi1saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNTI1MjUyO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDU7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5OTk7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkICM0ZDRkNGQ7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMXB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuNCk7XFxyXFxufVxcclxcblxcclxcbi56b29tIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLnguYXhpcy1saW5lLWNoYXJ0Pmc+dGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgbGkge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHNwYW4ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYmwtYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzdmYzk3ZjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYzA4NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYWItYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM4NmNiMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmstZWRnZXMge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmstYmFja2dyb3VuZC1lZGdlcyB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjU7XFxyXFxuICAgIHN0cm9rZTogIzczNzM3MztcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUgdGV4dCB7XFxyXFxuICAgIGZvbnQ6IDEycHggc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUtLWludGVybmFsIHRleHQge1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggMCAjZmZmLCAwIC0xcHggMCAjZmZmLCAxcHggMCAwICNmZmYsIC0xcHggMCAwICNmZmY7XFxyXFxufVxcclxcblxcclxcbi5saW5rIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNjM2MzYzO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FjdGl2ZS1uZXR3b3JrLW5hbWUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICMyOTYyOTI7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUtbGV2ZWwge1xcclxcbiAgICBmaWxsOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmVcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbmRyb2dyYW0tdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTBlbSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlnaGxpZ2h0LWhpZXJhcmNoeSB7XFxyXFxuICAgIGZpbGw6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxMDtcXHJcXG4gICAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcbn1cXHJcXG5cXHJcXG4uYW5pbWFsLWhpZ2hsaWdodCB7XFxyXFxuICAgIGZpbGw6ICNjNTFiN2QgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYgLmJ0biBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IC5idG4uYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWxlZ2VuZCB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaW50ZXJzZWN0aW9uIHtcXHJcXG4gICAgZmlsbDogdXJsKCNzdHJpcGVkKSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICM2NzAwMGQ7XFxyXFxufVxcclxcblxcclxcbi5zeW0tZGlmZmVyZW5jZSB7XFxyXFxuICAgIGZpbGw6IHVybCgjc3RyaXBlZCkgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjNjcwMDBkO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtbGcge1xcclxcbiAgICBtYXgtd2lkdGg6IDgwJTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9