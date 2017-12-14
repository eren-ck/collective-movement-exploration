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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hierarchy_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css__ = __webpack_require__(12);
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
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["i" /* streamMovementData */]();

    // get the dataSetPercentile
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["f" /* getPercentile */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["h" /* getSwarmFeatures */]();

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interaction_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(7);
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
    Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["a" /* lineChart */])();
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
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["e" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["c" /* percentiles */])(tmpArray));
                }

                network = network.filter(function(d) {
                    return d['val'] >= __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkLimit */];
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
                        return d['val'];
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

            if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][Math.ceil(indexTime / __WEBPACK_IMPORTED_MODULE_2__line_chart__["b" /* lineChartRatio */])]) {
                let tmp = Math.ceil(indexTime / __WEBPACK_IMPORTED_MODULE_2__line_chart__["b" /* lineChartRatio */]);
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
                    .attr('transform', 'translate(' + Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["c" /* zoomFunction */])(tmp) + ',0)');
            }


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
let networkLimit = 0;
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
    .range(['#ffffff', '#dfdfdf', '#c0c0c0', '#a3a3a3', '#858585', '#696969', '#4e4e4e', '#353535', '#1d1d1d', '#000000']);


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
 * @param {Number} value - between 0 and 1
 */
function setNetworLimit(value) {
    networkLimit = value;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = disablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["b"] = enablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["c"] = percentiles;
/* harmony export (immutable) */ __webpack_exports__["d"] = percentilesLineChart;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(10);
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
 * Return  .95 percentiles of the array
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

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorScale; });
/* harmony export (immutable) */ __webpack_exports__["c"] = returnColorScale;
/* harmony export (immutable) */ __webpack_exports__["b"] = initColorPicker;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__legend_js__ = __webpack_require__(6);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addSpatialViewGroup;
/* harmony export (immutable) */ __webpack_exports__["b"] = changeLegend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_js__ = __webpack_require__(5);
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
/* 7 */
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

// for the concave hull
let concaveHull = d3.concaveHull();
// which level of the hierarchy is visualized

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
        .size([(height - margin), (width - margin)]);

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
}

/**
 * Draw the dendgrogram for one step
 * Further calls the drawHierarchy function
 */
function drawDendrogram() {
    // get the active dendrogram
    let id = $('.show-dendrogram.btn-primary').attr('data');

    // if data is avaiable draw hierarchy clusters and a button is active selcted
    if (!$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]) && id) {

        // get the data and transform it
        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"]['h' + id][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["g" /* indexTime */]];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

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
                        return 40;
                    } else {
                        return 20;
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
                        return 40;
                    } else {
                        return 20;
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
        // console.log(hierarchyVertices);
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
            // temp solution of the symmetric difference
            let tmpDifference = hierarchyVertices[0];
            // iterate over the hierarchies
            for (let i = 1; i < hierarchyVertices.length; i++) {
                // symmetric difference
                tmpDifference = PolyBool.xor({
                    regions: tmpDifference, // list of regions
                    inverted: false // is this polygon inverted?
                }, {
                    regions: hierarchyVertices[i],
                    inverted: false
                });
                // convert it again
                tmpDifference = tmpDifference['regions'];
            }
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
        // console.log(vertices);
        if (vertices.length >= 3) {
            // result.push(d3.polygonHull(vertices));
            concaveHull(vertices).forEach(function(hull) {
                result.push(hull);
            });
        }
    });
    // console.log(result);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["f"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["h"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkDataButton;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["g"] = getSwarmDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNetworkData;
/* harmony export (immutable) */ __webpack_exports__["e"] = getNetworkHierarchyData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_spatial_view_js__ = __webpack_require__(1);
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* enablePlayButton */])();
        }
    });
}

/**
 * Get the specifc swarm feature
 * @param {String} feature - for instance centroid, medoid etc.
 */
function getSwarmDatasetFeature(feature) {
    Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* disablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* enablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* enablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* enablePlayButton */])();
        }
    });

}

/***/ }),
/* 9 */
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
            value: 0,
            slide: function(event, ui) {
                __WEBPACK_IMPORTED_MODULE_2__network_js__["e" /* setNetworLimit */](ui.value);
                $('#network-limit').val(ui.value);
            }
        });

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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playBoolean; });
/* harmony export (immutable) */ __webpack_exports__["a"] = initListeners;
/* harmony export (immutable) */ __webpack_exports__["c"] = setPlayBoolean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(7);
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
            if (!$('#play-button').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes

                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* decIndexTime */]();
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["f" /* draw */]();
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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["g" /* getSwarmDatasetFeature */])('medoid');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["g" /* getSwarmDatasetFeature */])('centroid');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["g" /* getSwarmDatasetFeature */])('convex_hull');

            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-triangulation').click(function() {
        if ($('#draw-triangulation').is(':checked')) {
            if (!('triangulation' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["g" /* getSwarmDatasetFeature */])('triangulation');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["g" /* getSwarmDatasetFeature */])('voronoi');

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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                // ajax query to get the absolute feature speed
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('speed');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-speed-details').removeClass('hidden');
            $('#draw-acceleration').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                // ajax query to get the absolute feature acceleration
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('acceleration');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-acceleration-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-distance-centroid').prop('checked', false);
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
    $('#draw-distance-centroid').click(function() {
        if ($('#draw-distance-centroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["dataset"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                // ajax query to get the absolute feature distance_centroid
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["a" /* getDatasetFeature */])('distance_centroid');
            }
            $('.draw-details').addClass('hidden');
            $('#draw-distance-centroid-details').removeClass('hidden');
            $('#draw-speed').prop('checked', false);
            $('#draw-acceleration').prop('checked', false);
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["j" /* setActiveScale */]('distance_centroid');
        } else {
            $('#draw-distance-centroid-details').addClass('hidden');
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

        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
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
            Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return zoomFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lineChartRatio; });
/* harmony export (immutable) */ __webpack_exports__["a"] = lineChart;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
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
        .range([0, __WEBPACK_IMPORTED_MODULE_1__explore_js__["swarmData"].length]);

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
    } else if (elem['id'].toLowerCase().includes('distance-centroid')) {
        feature = 'distance_centroid';
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
            trendChartData.push(Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* percentilesLineChart */])(tmp));
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(undefined);
// imports


// module
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.line-chart-check-box.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n.custom-checkbox {\r\n    min-height: 1rem;\r\n    padding-left: 0;\r\n    margin-right: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator {\r\n    content: \"\";\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 30px;\r\n    height: 10px;\r\n    background-color: #818181;\r\n    border-radius: 15px;\r\n    margin-right: 10px;\r\n    -webkit-transition: background .3s ease;\r\n    transition: background .3s ease;\r\n    vertical-align: middle;\r\n    margin: 0 16px;\r\n    box-shadow: none;\r\n}\r\n\r\n.custom-checkbox .custom-control-indicator:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    display: inline-block;\r\n    width: 18px;\r\n    height: 18px;\r\n    background-color: #f1f1f1;\r\n    border-radius: 21px;\r\n    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);\r\n    left: -2px;\r\n    top: -4px;\r\n    -webkit-transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n    transition: left .3s ease, background .3s ease, box-shadow .1s ease;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator {\r\n    background-color: #84c7c1;\r\n    background-image: none;\r\n    box-shadow: none !important;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:checked~.custom-control-indicator:after {\r\n    background-color: #84c7c1;\r\n    left: 15px;\r\n}\r\n\r\n.custom-checkbox .custom-control-input:focus~.custom-control-indicator {\r\n    box-shadow: none !important;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n.intersection {\r\n    fill: red !important;\r\n    stroke: red;\r\n}\r\n\r\n.sym-difference {\r\n    fill: red !important;\r\n    stroke: red;\r\n}", ""]);

// exports


/***/ }),
/* 14 */
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
/* 15 */
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

var	fixUrls = __webpack_require__(16);

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
/* 16 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNkNmY3NjYwMjEyY2U3OTUzZmMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2hpZXJhcmNoeS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGluZV9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2V4cGxvcmUuY3NzP2RlNGMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7OztBQ2p6QkE7QUFBQTtBQUNBOztBQUVBLHdCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDckVBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUNBO0FBQ0E7O0FBSUM7OztBQUdELHVCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUVBQTRCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRztBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxtQkFBbUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5RUFBNEI7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRCxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNHQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7QUFRQTs7QUFJQTs7QUFFRCxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDhCQUE4QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDhCQUE4QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSUE7QUFBQTtBQUNBOztBQUVBOztBQUlDOztBQUtBOztBQUlBOztBQU1BOzs7QUFPQTs7QUFRQTs7QUFPQTs7QUFJQTs7QUFRQTs7QUFFRCxVQUFVO0FBQ1YsdUJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDRCQUE0QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckI7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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJleHBsb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWNkNmY3NjYwMjEyY2U3OTUzZmMiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkICovXHJcbi8vIGltcG9ydCBhbGwganNcclxuaW1wb3J0ICogYXMgcXVlcmllcyBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YVxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldEhpZXJhcmNoeUxldmVsLFxyXG4gICAgcmVtb3ZlSGllcmFyY2h5TGV2ZWwsXHJcbiAgICBzZXRIaWVyYXJjaHlDb2xvcixcclxuICAgIHJlbW92ZUhpZXJhcmNoeUNvbG9yLFxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kXHJcbn0gZnJvbSAnLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuLy8gaW1wb3J0IGNzc1xyXG5pbXBvcnQgJy4vZXhwbG9yZS5jc3MnO1xyXG5cclxuZXhwb3J0IGxldCBkYXRhc2V0ID0gW107IC8vIG1haW4gZGF0YXNldCB3aXRoIHZhbHVlcyBmb3IgZWFjaCBpbmRpdmlkdWFsIGFuaW1hbFxyXG5leHBvcnQgbGV0IGRhdGFzZXRNZXRhZGF0YSA9IFtdOyAvLyBtZXRhZGF0YXNldCBmb3IgZWFjaCBpbmRpdmlkdWFsIGZpc2hcclxuZXhwb3J0IGxldCBzd2FybURhdGEgPSBbXTsgLy8gc3dhcm1kYXRhIGZvciBsaW5lY2hhcnQgYW5kIGFsc28gb3RoZXIgc3dhcm0gZmVhdHVyZXNcclxuZXhwb3J0IGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IHt9OyAvLyBwZWNlbnRpbGVzIG5lZWRlZCBmb3IgdGhlIGNvbG9yIG1hcHBpbmdcclxuZXhwb3J0IGxldCBuZXR3b3JrRGF0YSA9IHt9OyAvLyBuZXR3b3JrIGRhdGFcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5ID0ge307IC8vIG5ldHdvcmsgaGllcmFyY2h5IGRhdGFcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgYmFzaWMgZGF0YSB0byBnZXQgdGhlIHRvb2wgcnVubmluZy5cclxuICogYWZ0ZXIgdGhlIHBlbmRpbmcgYWpheCBxdWVyaWVzIGFyZSBmaW5pc2hlZFxyXG4gKiB0aGUgdG9vbCBpcyBkcmF3blxyXG4gKi9cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1vdmVtZW50IGRhdGFcclxuICAgIHF1ZXJpZXMuc3RyZWFtTW92ZW1lbnREYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBkYXRhU2V0UGVyY2VudGlsZVxyXG4gICAgcXVlcmllcy5nZXRQZXJjZW50aWxlKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIHF1ZXJpZXMuZ2V0U3dhcm1GZWF0dXJlcygpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbWV0YWRhdGEgYW5kIGluaXRpYWxpemUgdGhlIG1ldGFkYSB3aW5kb3dcclxuICAgIHF1ZXJpZXMuZ2V0TWV0YURhdGEoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGluZm9ybWF0aW9uIGlmIHRoZXJlIGFyZSBhbHJlYWR5IG5ldHdvcmtzIGNyZWF0ZWQgZm9yIHRoaXMgZGFzdGFzZXRcclxuICAgIHF1ZXJpZXMuZ2V0TmV0d29ya0RhdGFCdXR0b24oKTtcclxuXHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQ29uY2FjdCB0byB0aGUgbWFpbiBkYXRhc2V0XHJcbiAqIHRoZSBpZGVhIGlzIHRvIHVzZSB0aGlzIG9uZSBkYXkgZm9yIGxhenkgbG9hZGluZ1xyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIG1vdmVtZW50IGRhdGFzZXRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRhc2V0KHZhbHVlKSB7XHJcbiAgICBkYXRhc2V0ID0gZGF0YXNldC5jb25jYXQodmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGRhdGFzZXQgcGVyY2VudGlsZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIGFycmFyeXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhU2V0UGVyY2VudGlsZSh2YWx1ZSkge1xyXG4gICAgZGF0YVNldFBlcmNlbnRpbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IG1ldGFkYXRhXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZXRhRGF0YSh2YWx1ZSkge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhID0gdmFsdWU7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBzd2FybSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBzd2FybSB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIHN3YXJtRGF0YVtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3dhcm1EYXRhLnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaW50ZWdlciBvciBmbG9hdFxyXG4gICAgICAgIGlmIChkYXRhW2ldICYmICEoaXNOYU4oZGF0YVtpXSkpKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YVtpXVtmZWF0dXJlXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlzIHN0cmluZ1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSBkYXRhW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBuZXcgZmVhdHVyZSBkaW1lbnNpb24gdG8gdGhlIGRhdGFzZXRcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIGZlYXR1cmVzIHZhbHVlcyBjb25zaXN0aW5nIG9mIFtmZWF0dXJlXzAsIGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YXNldEZlYXR1cmUoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gYWRkIHRoZSB0aGUgb2JqZWN0IHRvIHRoZSBhcnJheSBpZiB0aGVyZSBpcyBubyBlbGVtZW50IHlldFxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YXNldFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGFyc2UgdGhlIGludFxyXG4gICAgICAgIGRhdGFzZXRbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHRoZSBjYWxjdWxhdGVkIGFkamFjZW5jeSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrRGF0YSh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0RhdGEgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBoaWVhcmhjeSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeURhdGEodmFsdWUsIG5ldHdvcmtfaWQpIHtcclxuICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGVtcHR5IHJlbW92ZSB0aGUgZWxlbWVudCBmcm9tIHRoZSBuZXR3cm9rSGllcmFyY2h5IG9iamVjdFxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDAgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgIGRlbGV0ZSBuZXR3b3JrSGllcmFyY2h5WydoJyArIG5ldHdvcmtfaWRdO1xyXG4gICAgICAgIHJlbW92ZUhpZXJhcmNoeUxldmVsKG5ldHdvcmtfaWQpO1xyXG4gICAgICAgIHJlbW92ZUhpZXJhcmNoeUNvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgfSAvLyBhZGQgaXQgdG8gdGhlIG5ldHdvcmsgaGllcmFyY2h5XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBuZXR3b3JrSGllcmFyY2h5WydoJyArIG5ldHdvcmtfaWRdID0gdmFsdWU7XHJcbiAgICAgICAgc2V0SGllcmFyY2h5TGV2ZWwobmV0d29ya19pZCwgMik7XHJcbiAgICAgICAgc2V0SGllcmFyY2h5Q29sb3IobmV0d29ya19pZCk7XHJcbiAgICB9IC8vIHRvbyBtYW55IGVsZW1lbnRzIGNhbnQgYmUgYWRkZWRcclxuXHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsZDMsIHBhcmFtZXRlcnMsIFNldCAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgbmV0d29ya0RhdGEsXHJcbiAgICBzd2FybURhdGFcclxufSBmcm9tICcuLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBuZXR3b3JrQ29sb3JTY2FsZSxcclxuICAgIG5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBuZXR3b3JrTGltaXQsXHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeVxyXG59IGZyb20gJy4uL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGxpbmVDaGFydCxcclxuICAgIGxpbmVDaGFydFJhdGlvLFxyXG4gICAgem9vbUZ1bmN0aW9uXHJcbn0gZnJvbSAnLi4vbGluZV9jaGFydCc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXNcclxufSBmcm9tICcuLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRUaW1lU2xpZGVyLFxyXG4gICAgaW5pdFRvb2x0aXAsXHJcbiAgICB0b29sdGlwRnVuY3Rpb24sXHJcbiAgICBpbml0U2xpZGVycyxcclxuICAgIHRvb2x0aXBcclxufSBmcm9tICcuL2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yXHJcbn0gZnJvbSAnLi4vbWV0YWRhdGEuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRDb2xvclBpY2tlcixcclxuICAgIHJldHVybkNvbG9yU2NhbGVcclxufSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdExpc3RlbmVycyxcclxuICAgIHBsYXlCb29sZWFuXHJcbn0gZnJvbSAnLi4vbGlzdGVuZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZFNwYXRpYWxWaWV3R3JvdXBcclxufSBmcm9tICcuL2xlZ2VuZC5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdERlbmRyb2dyYW0sXHJcbiAgICBkcmF3RGVuZHJvZ3JhbSxcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlJZHNcclxufSBmcm9tICcuLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuZXhwb3J0IGxldCBpbmRleFRpbWUgPSAwOyAvLyBhY3R1YWwgdGltZSBtb21lbnQgaW4gdGhlIGFuaW1hdGlvblxyXG5leHBvcnQgbGV0IHRhbmtXaWR0aDtcclxuZXhwb3J0IGxldCB0YW5rSGVpZ2h0O1xyXG5leHBvcnQgbGV0IGFjdGl2ZVNjYWxlID0gJ2JsYWNrJzsgLy8gY2FuIGJlIHNwZWVkLCBhY2NlbGVyYXRpb24sIC4uIGFuZCBibGFjayAobWVhbmluZyBubyBhY3RpdmUgc2NhbGUpXHJcbmV4cG9ydCBsZXQgbWVkb2lkQW5pbWFsID0gLTE7IC8vIHdoaWNoIGFuaW1hbCBpcyB0aGUgbWVkb2lkICgtMSBpcyBubyBhbmltYWwpXHJcbmV4cG9ydCBsZXQgYWN0aXZlQW5pbWFscyA9IFtdOyAvLyBhY3RpdmUgc2VsZWN0ZWQgYW5pbWFsc1xyXG5leHBvcnQgbGV0IGFycmF5QW5pbWFsczsgLy8gYXJyYXkgb2YgYW5pbWFscyBmb3IgdGhlIHNwZWNpZmljIHRpbWUgZnJhbWVcclxuZXhwb3J0IGxldCBhbmltYWxfaWRzOyAvLyBhcnJheSBvZiB1bmlxdWUgYW5pbWFsIGlkc1xyXG5cclxubGV0IHN2Z0NvbnRhaW5lcjsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIHNwYXRpYWwgdmlld1xyXG5sZXQgdGFuazsgLy8gc3ZnIGdyb3VwIGZvciB0aGUgc3BhdGlhbCB2aWV3IHRhbmtcclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgc3BhdGlhbCB2aWV3IHdpdGggYWxsIHRoZSBpbXBvcnRhbnQgZmFjdG9yc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwYXRpYWxWaWV3SW5pdCgpIHtcclxuXHJcbiAgICBsZXQgbWluUG9pbnQgPSBwYXJhbWV0ZXJzWydtaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIGxldCBtYXhQb2ludCA9IHBhcmFtZXRlcnNbJ21heCddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gbGV0IGNvb3JkaW5hdGVPcmlnaW4gPSBwYXJhbWV0ZXJzWydjb29yZGluYXRlX29yaWdpbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gd2lkdGggPSB3aWR0aCAqMS4wMiAtLT4gc28gdGhlcmUgaXMgYSBtYXJnaW4gaW4gdGhlIHNwYXRpYWwgdmlldyB3aGVyZSBubyBhbmltYWwgaXMgZXZlclxyXG4gICAgdGFua1dpZHRoID0gKG1heFBvaW50WzBdIC0gbWluUG9pbnRbMF0pICogMS4wMjtcclxuICAgIHRhbmtIZWlnaHQgPSAobWF4UG9pbnRbMV0gLSBtaW5Qb2ludFsxXSkgKiAxLjAyO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIHZpZXcgcmVzaXphYmxlXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtYWluLXZpcycpLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb250YWlubWVudDogJ3BhcmVudCdcclxuICAgICAgICAgICAgfSkucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6ICQoJyNtYWluLXZpcy1kaXYnKS53aWR0aCgpXHJcbiAgICAgICAgICAgIH0pLmhlaWdodCh0YW5rSGVpZ2h0ICogMC42KVxyXG4gICAgICAgICAgICAud2lkdGgodGFua1dpZHRoICogMC42KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vcmVzZXQgYWxsIGNoZWNrYm94ZXNcclxuICAgICQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuICAgICAgICAuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgIC8vc2V0IHRoZSBjb2xvciBzY2FsZSBmdW5jdGlvbiB0byBsaW5lYXJcclxuICAgICQoJyNjb2xvci1zY2FsZS1saW5lYXInKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjZ3JvdXAtc2l6ZS1tJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI2JhY2tncm91bmQtd2hpdGUnKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjc2V0dGluZ3MtZGl2IGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgLy9oaWRlIHRoZSBsb2FkaW5nIGdpZlxyXG4gICAgJCgnI2xvYWRpbmcnKVxyXG4gICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgLy8gZ2V0ICBudW1iZXIgb2YgZGlzdGluY3QgYW5pbWFsIGlkc1xyXG4gICAgbGV0IG51bV9hbmltYWxzID0gbmV3IFNldCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzZXRbaV1bJ3QnXSA9PT0gZGF0YXNldFswXVsndCddKSB7XHJcbiAgICAgICAgICAgIG51bV9hbmltYWxzLmFkZChkYXRhc2V0W2ldWydhJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgPSBkYXRhc2V0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmltYWxfaWRzID0gQXJyYXkuZnJvbShudW1fYW5pbWFscykuc29ydCgpO1xyXG5cclxuICAgIC8vWCBhbmQgWSBheGlzXHJcbiAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKVxyXG4gICAgICAgIC5yYW5nZShbbWluUG9pbnRbMF0sIG1heFBvaW50WzBdXSk7XHJcblxyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFsxXSwgbWF4UG9pbnRbMV1dKTtcclxuXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzUmlnaHQoeSlcclxuICAgICAgICAudGlja3MoNylcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIC8vIFpPT01JTkcgQU5EIFBBTk5JTkcgU1RVRkZcclxuICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgZnJvbSBoZXJlIHRvIGludGVyYWN0aW9uXHJcbiAgICBsZXQgem9vbUdyb3VwO1xyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDZdKVxyXG4gICAgICAgIC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2NvbnN0cmFpbmVkIHpvb21pbmdcclxuICAgICAgICAgICAgLy8gbW9kaWZ5IHRoZSB0cmFuc2xhdGUgc28gdGhhdCBpdCBuZXZlciBleGl0cyB0aGUgdGFua1xyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHRhbmtXaWR0aCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua1dpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcblxyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIHRhbmtIZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHRhbmtIZWlnaHQgKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLnkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBhbmQgc2NhbGVcclxuICAgICAgICAgICAgem9vbUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWCh4KSkpO1xyXG4gICAgICAgICAgICBnWWF4aXMuY2FsbCh5QXhpcy5zY2FsZShkMy5ldmVudC50cmFuc2Zvcm0ucmVzY2FsZVkoeSkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL3RoZSBzdmcgY29udGFpbmVyXHJcbiAgICBzdmdDb250YWluZXIgPSBkMy5zZWxlY3QoJyNtYWluLXZpcycpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC8vIHRvIG1ha2UgaXQgcmVzcG9uc2l2ZSB3aXRoIGNzc1xyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB0YW5rV2lkdGggKyAnICcgKyB0YW5rSGVpZ2h0KVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuXHJcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbywgZm9yICAxMjQwLzE5MDAgPSAwLjY1IHNvIHBhZGRpbmctYm90dG9tID0gNjUlICovXHJcbiAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguY2VpbCgodGFua0hlaWdodCAvIHRhbmtXaWR0aCkgKiAxMDApO1xyXG4gICAgJCgnI21haW4tdmlzJykuYXBwZW5kKCQoJzxzdHlsZT4jbWFpbi12aXM6OmFmdGVyIHtwYWRkaW5nLXRvcDogJyArIHBlcmNlbnRhZ2UgKyAnJTtkaXNwbGF5OiBibG9jaztjb250ZW50OiBcIlwiO308L3N0eWxlPiAnKSk7XHJcblxyXG4gICAgem9vbUdyb3VwID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnc3ZnOmcnKTtcclxuXHJcbiAgICBpZiAocGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKSB7XHJcbiAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltYWdlJylcclxuICAgICAgICAgICAgLy8gIC5hdHRyKCdkJyxwYXRoKVxyXG4gICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcvJyArIHBhcmFtZXRlcnMuYmFja2dyb3VuZF9pbWFnZSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhY2tncm91bmRJbWFnZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0YW5rSGVpZ2h0KVxyXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0YW5rV2lkdGgpXHJcbiAgICAgICAgICAgIC8vIHdoaWxlIGFkZGluZyBhbiBpbWFnZSB0byBhbiBzdmcgdGhlc2UgYXJlIHRoZSBjb29yZGluYXRlcyBpIHRoaW5rIG9mIHRoZSB0b3AgbGVmdFxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAnMCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCdiYWNrZ3JvdW5kJywgJyNmZmYnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9hcHBlbmQgdGhlIHRhbmsgZ3JvdXAgd2l0aCBhIHRyYW5zZm9ybWF0aW9uIHdoaWNoIHJvdGF0ZXMgdGhlIHkgYXhpc1xyXG4gICAgdGFuayA9IHpvb21Hcm91cC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGFuaycpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgeCA9IDE7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeCkge1xyXG4gICAgICAgICAgICAgICAgeCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmludmVydGVkX3kpIHtcclxuICAgICAgICAgICAgICAgIHkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJ3NjYWxlKCcgKyB4ICsgJywnICsgeSArICcpJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL2FkZCB0aGUgY2VudHJvaWRcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2VudHJvaWQgaGlkZGVuJylcclxuICAgICAgICAuYXR0cigncicsIDYpXHJcbiAgICAgICAgLmF0dHIoJ2N4JywgMClcclxuICAgICAgICAuYXR0cignY3knLCAwKTtcclxuXHJcbiAgICAvLyBhcnJvdyBmb3IgdGhlIGNlbnRyb2lkIGRpcmVjdGlvblxyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2NlbnRyb2lkLWFycm93JylcclxuICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgLmF0dHIoJ3JlZlknLCA2KVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAvLyBBcHBlbmQgdGhlIGxpbmUgZm9yIHRoZSBkaXJlY3Rpb24gYXJyb3dcclxuICAgIHRhbmsuc2VsZWN0KCcjZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgJ3VybCgjY2VudHJvaWQtYXJyb3cpJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgbmV0d29yayAgZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbmV0d29ya0dyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgZGVsYXVuYXktdHJpYW5ndWxhdGlvbiBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdm9yb25vaSBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd2b3Jub2lHcm91cCcpO1xyXG5cclxuICAgIC8vYXBwZW5kIHRoZSBmcmFtZSB0aW1lIHRleHRcclxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdmcmFtZS10ZXh0JylcclxuICAgICAgICAuYXR0cigneCcsIDMwKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMzApXHJcbiAgICAgICAgLnRleHQoJy0tIDogLS0gOiAtLSAnKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgbGV0IGdZYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxyXG4gICAgICAgIC5jYWxsKHlBeGlzKTtcclxuXHJcbiAgICAvLyBpbml0IHN0dWZmIGZyb20gb3RoZXIgbW9kdWxlc1xyXG4gICAgaW5pdFRvb2x0aXAoKTtcclxuICAgIGluaXRTbGlkZXJzKCk7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwKCk7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIoKTtcclxuICAgIGxpbmVDaGFydCgpO1xyXG4gICAgaW5pdExpc3RlbmVycygpO1xyXG4gICAgaW5pdERlbmRyb2dyYW0oKTtcclxuICAgIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXdpbmcgZnVuY3Rpb24gLSBpcyBjYWxsZWQgZm9yIGVhY2ggdGltZXN0ZXBcclxuICogaW5kZXhUaW1lIHNhdmVzIHRoZSBjdXJyZW50IHRpbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lIG9mIGZ1bmN0aW9uIGRyYXdcclxuICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIC8vdXBkYXRlIHRpbWUgdG8gd2FpdCBha2Egc3BlZWQgb2YgcmVwbGF5XHJcbiAgICBsZXQgdGltZVRvV2FpdCA9ICQoJ2lucHV0W25hbWU9Z3JvdXAxXTpjaGVja2VkJywgJyNncm91cDEnKVxyXG4gICAgICAgIC52YWwoKTtcclxuICAgIC8vc2NhbGUgdGhlIHNpemUgYnkgdGhpcyBudW1iZXJcclxuICAgIGxldCBhbmltYWxTY2FsZSA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1zaXplOmNoZWNrZWQnKVxyXG4gICAgICAgIC52YWwoKTtcclxuXHJcbiAgICAvL2dldCB0aGUgbmV4dCBhbmltYWxzXHJcbiAgICBhcnJheUFuaW1hbHMgPSBkYXRhc2V0LnNsaWNlKGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lLCBhbmltYWxfaWRzLmxlbmd0aCAqIGluZGV4VGltZSArIGFuaW1hbF9pZHMubGVuZ3RoKTtcclxuXHJcbiAgICAvL3RoZSB0aW1lb3V0IGlzIHNldCBhZnRlciBvbmUgdXBkYXRlIDMwIG1zXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBkcmF3IGhpZXJhcmNoeVxyXG4gICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgdGltZSBmcmFtZSB0ZXh0XHJcbiAgICAgICAgICAgIHN2Z0NvbnRhaW5lci5zZWxlY3QoJy5mcmFtZS10ZXh0JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gMTUwMCkgJSA2MCArICc6JyArIE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10pO1xyXG4gICAgICAgICAgICAvLyBpZiBhIHNlY29uZCBoYXMgY2hhbmdlZCBtb3ZlIHRoZSBzbGlkZXJcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lU2xpZGVyKGluZGV4VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdmdBbmltYWxzID0gdGFuay5zZWxlY3RBbGwoJ2cuYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGFycmF5QW5pbWFscyk7XHJcblxyXG4gICAgICAgICAgICAvLyBOZXR3b3JrIHZpc1xyXG4gICAgICAgICAgICBsZXQgbmV0d29ya1ZpcztcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSBpbiBuZXR3b3JrRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmsgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBuZXR3b3JrRGF0YVtpbmRleFRpbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0bXBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgd2hvbGUgbmV0d29ya1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dOZXR3b3JrSGllcmFyY2h5ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhcnJheUFuaW1hbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUxJzogYXJyYXlBbmltYWxzW2ldWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUyJzogYXJyYXlBbmltYWxzW2pdWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IGFycmF5QW5pbWFsc1tqXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWwnOiB0bXBbdG1wX2luZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBfaW5kZXggPSB0bXBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAvLyBkaXNwbGF5IHRoZSBuZXR3b3JrIG9ubHkgaW4gdGhlIGNsdXN0ZXJpbmdcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBuZXR3b3JrSGllcmFyY2h5SWRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtIaWVyYXJjaHlJZHNba10uaW5jbHVkZXMoYXJyYXlBbmltYWxzW2ldWydhJ10pICYmIG5ldHdvcmtIaWVyYXJjaHlJZHNba10uaW5jbHVkZXMoYXJyYXlBbmltYWxzW2pdWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wX2luZGV4ID0gdG1wX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoKCcjbWMtJyArIGRbJ25vZGUxJ10gKyAnLScgKyBkWydub2RlMiddKSkuY3NzKCdmaWxsJywgbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMiddICsgJy0nICsgZFsnbm9kZTEnXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV0d29ya0F1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldHdvcmsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyYXkucHVzaChuZXR3b3JrW2ldWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldE5ldHdvckxpbWl0KHBlcmNlbnRpbGVzKHRtcEFycmF5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV0d29yayA9IG5ldHdvcmsuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ10gPj0gbmV0d29ya0xpbWl0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXMgPSB0YW5rLnNlbGVjdCgnI25ldHdvcmtHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnbGluZS5uZXR3b3JrLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShuZXR3b3JrKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVJcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gbmV0d29ya1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsYXVuYXkgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsndHJpYW5ndWxhdGlvbiddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9yb25vaVxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFua1xyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShzd2FybURhdGFbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Zvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2b3Jvbm9pLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9FTlRFUiAtIGFwcGVuZCB0aGUgYW5pbWFsIGdyb3Vwc1xyXG4gICAgICAgICAgICBsZXQgYW5pbWFsR3JvdXBpbmdzID0gc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhbmltYWwtJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBjaXJjbGVzIGZvciBlYWNoIGFuaW1hbCB0byB0aGUgYW5pbWFsZ3JvdXBcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgMS41ICogYW5pbWFsU2NhbGUpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEZ1bmN0aW9uKGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIG9uIGNsaWNrIGZvciB0aGUgYWN0aXZlIGZpc2hzXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQW5pbWFscyA9IGFjdGl2ZUFuaW1hbHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVQREFURSAtIGFuaW1hbHMgY2lyY2xlc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGFuaW1hbFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBmb3IgZWFjaCBncm91cCB0aGUgYXJyb3csIG5lZWRlZCBmb3IgY29sb3JpbmdcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJvdy1tYXJrZXItJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3NcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCNhcnJvdy1tYXJrZXItJyArIGRbJ2EnXSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9leGVjdXRlIG9ubHkgd2hlbiBkcmF3IGRpcmVjdGlvbiBidXR0b24gaXMgY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ3AnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ3AnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLWRbJ2RpcmVjdGlvbiddICsgJyAnICsgZFsncCddWzBdICsgJyAnICsgLWRbJ3AnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdyBoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHRoZSBncm91cHNcclxuICAgICAgICAgICAgc3ZnQW5pbWFscy5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29udmV4IGh1bGxcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gcGF0aHNcclxuICAgICAgICAgICAgICAgIHZhciBodWxsUGF0aCA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmh1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW3N3YXJtRGF0YVtpbmRleFRpbWVdWydjb252ZXhfaHVsbCddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gaHVsbCBwYXRoXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFTlRFUiAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgICAgIGh1bGxQYXRoLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaHVsbC1wYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBubyBodWxsXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aCA9IHRhbmsuc2VsZWN0KCdwYXRoLmh1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgIGh1bGxQYXRoLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGNvbG9ycyBvZiB0aGUgZmlzaFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlU2NhbGUgIT09ICdibGFjaycpIHtcclxuICAgICAgICAgICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICAgICAgICAgIHZhciB0bXBTY2FsZSA9IHJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBTY2FsZShkW2FjdGl2ZVNjYWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yIGV2ZXJ5IGZpc2ggYmxhY2tcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnIzAwMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICcjMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QobWV0YWRhdGFDb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YUNvbG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2FuaW1hbC0nICsga2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgbWV0YWRhdGFDb2xvcltrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG1ldGFkYXRhQ29sb3Jba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY2hhbmdlIG9wYWN0aXkgaWYgdGhlIGZpc2ggaXMgc2VsZWN0ZWRcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5pbmNsdWRlcyhkWydhJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjI1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG5vcm1hbCBvcGFjaXR5XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZHJhdyBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpICYmXHJcbiAgICAgICAgICAgICAgICBzd2FybURhdGFbaW5kZXhUaW1lXS5jZW50cm9pZCAmJlxyXG4gICAgICAgICAgICAgICAgJCgnI2RyYXctY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSBhbmltYWwgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnZGlyZWN0aW9uJ10gKyAnICcgKyBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXSArICcgJyArIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtZWRvaWRcclxuICAgICAgICAgICAgaWYgKG1lZG9pZEFuaW1hbCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtZWRvaWRBbmltYWwgPSBzd2FybURhdGFbaW5kZXhUaW1lXVsnbWVkb2lkJ107XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICBpbmRleFRpbWUrKztcclxuXHJcbiAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoJyNsaW5lQ2hhcnRUaW1lTGluZScpICYmIHN3YXJtRGF0YVtNYXRoLmNlaWwoaW5kZXhUaW1lIC8gbGluZUNoYXJ0UmF0aW8pXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IE1hdGguY2VpbChpbmRleFRpbWUgLyBsaW5lQ2hhcnRSYXRpbyk7XHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgbGluZSBjaGFydCBsZWdlbmQgdGV4dCB2YWx1ZXMgcGVyIHNlY29uZFxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4VGltZSAlIDI1ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBjaGFuZ2UgdGhpcyB0byBhIG1vcmUgbW9kdWxhciB3YXlcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjb252ZXhfaHVsbF9hcmVhTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKHN3YXJtRGF0YVt0bXBdWydjb252ZXhfaHVsbF9hcmVhJ10pICsgJ21twrInKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNzcGVlZExpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydzcGVlZCddICsgJ21tL3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNhY2NlbGVyYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnYWNjZWxlcmF0aW9uJ10gKyAnbW0vc8KyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlzdGFuY2VfY2VudHJvaWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlzdGFuY2VfY2VudHJvaWQnXSArICdtbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RpcmVjdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydkaXJlY3Rpb24nXSArICfCsCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI3BvbGFyaXNhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHN3YXJtRGF0YVt0bXBdWydwb2xhcmlzYXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB6b29tRnVuY3Rpb24odG1wKSArICcsMCknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgcGxheSBidXR0b24gaXMgYWN0aXZlIGFuZCBpZiB0aGUgYW5pbWF0aW9uIGlzIG5vdCBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lID49IHN3YXJtRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vc3RhcnQgYWdhaW4gZnJvbSB0aGUgc3RhcnRcclxuICAgICAgICAgICAgICAgIGluZGV4VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheUJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZVxyXG4gICAgICAgICAgICAgICAgLy8gICBsZXQgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2codDEgLSB0MCk7IC8vIGluIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lVG9XYWl0KTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgaW5kZXggdGltZSB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdGltZSBzdGVwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5kZXhUaW1lKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAoaW5kZXhUaW1lIDw9IHN3YXJtRGF0YS5sZW5ndGgpKSB7XHJcbiAgICAgICAgaW5kZXhUaW1lID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluZGV4VGltZSA9IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNyZWFzZSB0aW1lIGJ5IDFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNJbmRleFRpbWUoKSB7XHJcbiAgICBpbmRleFRpbWUgPSBpbmRleFRpbWUgLSAxO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aGUgbmV3IGFjdGl2ZSBzY2FsZSAtIGUuZy4gc3BlZWQsIGFjY2VsZXJhdGlvbiwgYmxhY2sgZXRjLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgLSBhY3RpdmUgc2NhbGUgZm9yIHRoZSBpbmRpdmlkdWFsIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVTY2FsZSh2YWx1ZSkge1xyXG4gICAgYWN0aXZlU2NhbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV3IG1lZG9pZCBhbmltYWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVW5pcXVlIGlkIG9mIHRoZSBhbmltYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZWRvaWRBbmltYWwodmFsdWUpIHtcclxuICAgIG1lZG9pZEFuaW1hbCA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzZWxlY3RlZCBhbmQgaGlnaGxpZ2h0ZWQgYW5pbWFsc1xyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIHVucWl1ZSBpZCBvZiB0aGUgYW5pbWFsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZUFuaW1hbHModmFsdWUpIHtcclxuICAgIGFjdGl2ZUFuaW1hbHMgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsIGQzICovXHJcblxyXG5leHBvcnQgbGV0IG5ldHdvcmtBdXRvID0gZmFsc2U7IC8vIGlmIHRydWUgdGhlIG5ldHdvcmsgZWRnZSBsaW1pdCBpcyBhdXRvbWF0aWNhbGx5IHN1Z2dlc3RlZFxyXG5leHBvcnQgbGV0IG5ldHdvcmtMaW1pdCA9IDA7XHJcbmV4cG9ydCBsZXQgc2hvd05ldHdvcmtIaWVyYXJjaHk7XHJcbi8vIGZpeGVkIGNvbG9yIHNjYWxlIGZvciB0aGUgbmV0d29ya1xyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBjb2xvciBzY2FsZSBmb3IgdGhlIG5ldHdvcmsgY29sb3JpbmdcclxuICogVE9ETyBjaGFuZ2UgdGhpcyBzb21ldGltZVxyXG4gKi9cclxuZXhwb3J0IGxldCBuZXR3b3JrQ29sb3JTY2FsZSA9IGQzLnNjYWxlVGhyZXNob2xkKClcclxuICAgIC5kb21haW4oXHJcbiAgICAgICAgWzAsIC4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOCwgLjksIDFdXHJcbiAgICApXHJcbiAgICAucmFuZ2UoWycjZmZmZmZmJywgJyNkZmRmZGYnLCAnI2MwYzBjMCcsICcjYTNhM2EzJywgJyM4NTg1ODUnLCAnIzY5Njk2OScsICcjNGU0ZTRlJywgJyMzNTM1MzUnLCAnIzFkMWQxZCcsICcjMDAwMDAwJ10pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIG5ldHdvcmsgIHNlbGVjdCBidXR0b25zIGFuZCBoaWVyYXJjaHkgY2hlY2tib3hlcyB0byB0aGUgbmV0d29yayBtb2RhbFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgbmV0d29yayBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV0d29ya0J1dHRvbnMoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldWydmaW5pc2hlZCddKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29ya3MtaGllcmFyY2hpZXMtdGFibGUgdGJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzx0cj48dGQ+JyArIGRhdGFbaV1bJ25hbWUnXSArICc8L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJsb2NrXCIgZGF0YT0nICsgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJyBuYW1lPScgKyBkYXRhW2ldWyduYW1lJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnIDx0ZD48bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3ggaGllYXJjaHktY2hlY2tib3hcIj48aW5wdXQgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dCBoaWRkZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhPScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduZXR3b3JrX2lkJ10gKyAnIG5hbWU9JyArIGRhdGFbaV1bJ25hbWUnXSArICc+PHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbmRpY2F0b3JcIj48L3NwYW4+PC9sYWJlbD48L3RkPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHRkPjxsYWJlbCBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jaGVja2JveCBuZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveFwiPjxpbnB1dCBjbGFzcz1cImN1c3RvbS1jb250cm9sLWlucHV0IGhpZGRlblwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGE9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJ1wiPjxzcGFuIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yXCI+PC9zcGFuPjwvbGFiZWw+PC90ZD4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI25ldHdvcmtzLWhpZXJhcmNoaWVzLXRhYmxlJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbmV0d29yayBkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGF1dG8gdmFsdWUgLSBpZiB0cnVlIHRoYW4gdGhlIG5ldHdvcmsgbGltaXQgaXMgc2V0IHRvIHRoZSAwLjk1IHBlcmNlbnRpbGUgb2YgYWxsIHZhbHVlc1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0F1dG8odmFsdWUpIHtcclxuICAgIG5ldHdvcmtBdXRvID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbGltaXQgd2l0aCB0aGUgc3BlY2lmaWMgbmV0d29yayBzbGlkZXIgLSBjdXN0b21cclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gYmV0d2VlbiAwIGFuZCAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29yTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtMaW1pdCA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGluIGhpZXJhcmNoeSAoZS5nLiBoMCkgZmlsdGVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWVyYXJjaHkgLSBlLmcuIDAtblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtIaWVyYXJjaHkodmFsdWUpIHtcclxuICAgIHNob3dOZXR3b3JrSGllcmFyY2h5ID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbmV0d29yay5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCQsKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIHBsYXkgYnV0dG9uIC0tPiBMb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHRoZSBwbGF5IGJ1dHRvbiByZW1vdmUgbG9hZGluZyBzeW1ib2xcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4odHJ1ZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5QbGF5Jyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gIC45NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlcyhhcnIpIHtcclxuICAgIGxldCBwID0gMC45NTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcDtcclxuICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycltsb3dlcl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgMDUsIDI1LCA1MCwgNzUsIDk1IHBlcmNlbnRpbGVzIG9mIHRoZSBhcnJheVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcmNlbnRpbGVzTGluZUNoYXJ0KGFycikge1xyXG4gICAgbGV0IHAgPSBbMC4wNSwgMC4yNSwgMC41LCAwLjc1LCAwLjk1XTtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcFtpXTtcclxuICAgICAgICBsZXQgbG93ZXIgPSBNYXRoLmZsb29yKGluZGV4KTtcclxuICAgICAgICBsZXQgdXBwZXIgPSBsb3dlciArIDE7XHJcbiAgICAgICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgICAgICBpZiAodXBwZXIgPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnJbbG93ZXJdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsICovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuXHJcbi8qKlxyXG4gKiBJbml0IE1ldGFkYXRhIGJ1dHRvbnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIGxldCBjb2xvcnMgPSBbJyNmZmYnLCAnI2U0MWExYycsICcjMzc3ZWI4JywgJyM0ZGFmNGEnLCAnIzk4NGVhMycsICcjZmY3ZjAwJywgJyNmZmZmMzMnLCAnI2E2NTYyOCddO1xyXG4gICAgLy8gYWRkIHRoZSBkYXRhIHRvIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaWYgKGRhdGFzZXRNZXRhZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dHIgaWQ9XCJtZXRhZGF0YS1yb3ctJyArIGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10gKyAnXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdCBidG4tY29sb3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2aWV3XCIgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3ItZmllbGRcIiB2YWx1ZT1cIldoaXRlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgKz0gJzxkaXYgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2ggbWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY29sb3JzW2ldICsgJ1wiIHZhbHVlPVwiJyArIGlkICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbWV0YWRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNpemUgYW5kIHdlaWdodCBjb2xvcmluZyBmb3IgdGhlIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNZXRhZGF0YSgpIHtcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAvLyBnZXQgdGhlIGlucHV0IHZhbHVlc1xyXG4gICAgbGV0IHZhbHVlID0gJCgnI2dyb3VwLW1ldGFkYXRhIC5idG4uYnRuLWRlZmF1bHQuYWN0aXZlIGlucHV0JylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGxldCBibEF2ZyA9ICQoJyNibC1hdmcnKS52YWwoKTtcclxuICAgIGxldCBhYkF2ZyA9ICQoJyNhYi1hdmcnKS52YWwoKTtcclxuICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjZmRjMDg2JywgJyMzODZjYjAnXTtcclxuICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdIDwgYmxBdmcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPiBhYkF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGFkYXRhIHJlc2V0IGFsbCBpbmRpdmlkdWFsIG1ldGFkYXRhIGlucHV0IGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCkge1xyXG4gICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgJCgnLmRyb3Bkb3duICNwcmV2aWV3JylcclxuICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9tZXRhZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgY29sb3JicmV3ZXIqL1xyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhU2V0UGVyY2VudGlsZVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuZXhwb3J0IGxldCBjb2xvclNjYWxlID0ge1xyXG4gICAgdHlwZTogJ0xpbmVhcicsXHJcbiAgICBjb2xvcjogY29sb3JicmV3ZXIuQnVZbEJ1XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY29sb3Igc2NhbGVcclxuICogQHJldHVybiB7Y29sb3JTY2FsZX0gYWN0aXZlIGNvbG9yIHNjYWxlIGlzIGluIGxpbmVhciBvciB0aHJlc2hvbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5Db2xvclNjYWxlKCkge1xyXG4gICAgLy9pZiBsaW5lYXIgaXMgY2hvb3NlblxyXG4gICAgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ0xpbmVhcicpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH0gLy9UaHJlc2hvbGQgY29sb3Igc2NhbGVcclxuICAgIGVsc2UgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGNvbG9yIHBpY2tlclxyXG4gKiB3aXRoIGFsbCBsaXN0ZW5lcnMgaW5jbHVkZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sb3JQaWNrZXIoKSB7XHJcbiAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnBhbGV0dGUnKVxyXG4gICAgICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JicmV3ZXIpKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhbGV0dGUnKVxyXG4gICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQua2V5O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gaGlnaHRsaWdodCB0aGUgcmlnaHQgcGFsZXR0ZVxyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIicgKyBkLmtleSArICdcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgY29sb3JTY2FsZS5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VsZWN0QWxsKCcuc3dhdGNoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3dhdGNoJylcclxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgY29sb3Igc2NoZW1lXHJcbiAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIkJ1WWxCdVwiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBhY3RpdmVTY2FsZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxubGV0IHN2Z0xlZ2VuZDsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIGxlZ2VuZFxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ3JvdXAgdG8gdGhlIHN2ZyB3aGVyZSB0aGUgbGVnZW5kIGZvciB0aGUgY29sb3IgbGVnZW5kIGlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkU3BhdGlhbFZpZXdHcm91cCgpIHtcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDU1MDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA2MDtcclxuXHJcbiAgICBzdmdMZWdlbmQgPSBkMy5zZWxlY3QoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdtYWluLXZpcy1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBjb2xvciBsZWdlbmRcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VMZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hXaWR0aCA9IDUwO1xyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaEhlaWdodCA9IDIwO1xyXG4gICAgLy8gbGV0IGRpZmZlcmVudENvbG9ycyA9IDA7XHJcblxyXG4gICAgLy8gU2hvdyB0aGUgc3ZnIGZpcnN0IG9mIGFsbFxyXG4gICAgJCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKS5zaG93KCk7XHJcblxyXG4gICAgLy9jaGFuZ2UgdGhlIGNvbG9ycyBvZiB0aGUgYW5pbWFsc1xyXG4gICAgaWYgKGFjdGl2ZVNjYWxlICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLnJhbmdlKCkpO1xyXG5cclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBkaWZmZXJlbnRDb2xvcnMgPSB0bXBTY2FsZS5yYW5nZSgpXHJcbiAgICAgICAgLy8gLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgLy8gaGlkZSB0aGUgZGl2IGFnYWluXHJcbiAgICAgICAgJCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIExlZ2VuZCBzd2F0Y2hlcyAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFN3YXRjaFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gVGV4dCAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMiAqIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgLy8gcGx1cyA1IGhhcyB0byBiZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyBpICogbGVnZW5kU3dhdGNoV2lkdGggKyA1KSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZCAqIDIpIC8gMjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9sZWdlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCBkMywgUG9seUJvb2wqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxuICAgIGFycmF5QW5pbWFscyxcclxuICAgIHNldEFjdGl2ZUFuaW1hbHMsXHJcbiAgICBkZWNJbmRleFRpbWUsXHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeVxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5sZXQgem9vbUdyb3VwOyAvLyB6b29tIGdyb3VwIGZvciB0aGUgc3BlY2lmaWMgZGVuZHJvZ3JhbVxyXG5sZXQgdHJlZW1hcDtcclxubGV0IHRvb2x0aXBEaXY7XHJcbmxldCBzcGF0aWFsVmlldzsgLy8gZ2V0IHRoZSBzcGF0aWFsIHZpZXcgc3ZnIGZyb20gdGhlIG1haW4gdmlzXHJcbmxldCBzdmdMZWdlbmQ7XHJcblxyXG5leHBvcnQgY29uc3QgbWF4TnVtYmVySGllcmFyY2hpZXMgPSA0O1xyXG5leHBvcnQgbGV0IG5ldHdvcmtIaWVyYXJjaHlJZHMgPSBbXTtcclxuXHJcbmxldCBoaWVyYXJjaHlMZXZlbHMgPSB7fTtcclxubGV0IGhpZXJhcmNoeUNvbG9ycyA9IHt9O1xyXG5cclxubGV0IHNldE9wZXJhdGlvbiA9ICd1bmlvbic7XHJcblxyXG4vLyBUT0RPIGFkZCBtb3JlIGNvbG9yc1xyXG5sZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyNlNzI5OGEnLCAnI2ZmOTkwMCcsICcjMzg2Y2IwJ107XHJcblxyXG4vLyBmb3IgdGhlIGNvbmNhdmUgaHVsbFxyXG5sZXQgY29uY2F2ZUh1bGwgPSBkMy5jb25jYXZlSHVsbCgpO1xyXG4vLyB3aGljaCBsZXZlbCBvZiB0aGUgaGllcmFyY2h5IGlzIHZpc3VhbGl6ZWRcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBkZW5kcm9ncmFtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdERlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBjb25zdGFuY3QgZmFjdG9ycyBmb3IgdGhlIGRlbmRncm9ncmFtXHJcbiAgICBsZXQgbWFyZ2luID0gMjAsXHJcbiAgICAgICAgd2lkdGggPSA1MDAwLFxyXG4gICAgICAgIGhlaWdodCA9IDUwMDA7XHJcblxyXG4gICAgLy8gem9vbSBmdW5jdGlvbiBmb3IgdGhlIGRlbmRyb2dyYW1cclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCAxMF0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueCA9IE1hdGgubWluKDAsIHdpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh3aWR0aCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueCkpO1xyXG5cclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnkgPSBNYXRoLm1pbigwLCBoZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KGhlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tcGFuZWwnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctZGVuZHJvZ3JhbS1jb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50LWRlbmRyb2dyYW0nLCB0cnVlKVxyXG4gICAgICAgIC5jYWxsKHpvb20pO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSBncm91cCB0byB0aGUgc3ZnXHJcbiAgICB6b29tR3JvdXAgPSBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luICsgJywnICsgbWFyZ2luICsgJyknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJyk7XHJcblxyXG4gICAgLy8gZDMgdHJlZVxyXG4gICAgdHJlZW1hcCA9IGQzLnRyZWUoKSAvL2QzLmNsdXN0ZXIoKVxyXG4gICAgICAgIC5zaXplKFsoaGVpZ2h0IC0gbWFyZ2luKSwgKHdpZHRoIC0gbWFyZ2luKV0pO1xyXG5cclxuICAgIC8vIHNldCB0aGUgc3BhdGlhbCB2aWV3IC0gbmVlZGVkIHRvIGFkZCB0aGUgY2x1c3RlcmluZyB0byB0aGUgc3BhdGlhbCB2aWV3IHdpbmRvd1xyXG4gICAgc3BhdGlhbFZpZXcgPSBkMy5zZWxlY3QoJy50YW5rJyk7XHJcblxyXG4gICAgLy8gaW5pdCBkZW5kcm9ncmFtIHNsaWRlclxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgTmV0d29yayBzbGlkZXJcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLWxldmVsLXNsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiAnbWF4JyxcclxuICAgICAgICAgICAgbWluOiAyLFxyXG4gICAgICAgICAgICBtYXg6IDIsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIHZhbHVlOiBoaWVyYXJjaHlMZXZlbHNbJ2gwJ10sXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWVyYXJjaHlMZXZlbChpZCwgdWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gYW5pbWF0aW9uIGlzIGFjdGl2ZSBkcmF3IHRoZSBuZXcgY2x1c3RlcmluZyBhbmQgZGVuZHJvZ3JhbVxyXG4gICAgICAgICAgICAgICAgLy8gZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBpbml0IHRoZSB0b29sdGlwIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgdG9vbHRpcERpdiA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tdG9vbHRpcCcpXHJcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMCArICdweCcpXHJcbiAgICAgICAgLnN0eWxlKCd0b3AnLCAwICsgJ3B4JylcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXQgdGhlIGhpZXJhcmNoeSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IG1heE51bWJlckhpZXJhcmNoaWVzICogMTAwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDYwO1xyXG5cclxuICAgIHN2Z0xlZ2VuZCA9IGQzLnNlbGVjdCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2JylcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdoaWVyYXJjaHktbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXcgdGhlIGRlbmRncm9ncmFtIGZvciBvbmUgc3RlcFxyXG4gKiBGdXJ0aGVyIGNhbGxzIHRoZSBkcmF3SGllcmFyY2h5IGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0RlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBnZXQgdGhlIGFjdGl2ZSBkZW5kcm9ncmFtXHJcbiAgICBsZXQgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG5cclxuICAgIC8vIGlmIGRhdGEgaXMgYXZhaWFibGUgZHJhdyBoaWVyYXJjaHkgY2x1c3RlcnMgYW5kIGEgYnV0dG9uIGlzIGFjdGl2ZSBzZWxjdGVkXHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSAmJiBpZCkge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgYW5kIHRyYW5zZm9ybSBpdFxyXG4gICAgICAgIGxldCB0cmVlRGF0YSA9IG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgaWRdW2luZGV4VGltZV07XHJcbiAgICAgICAgbGV0IG5vZGVzID0gZDMuaGllcmFyY2h5KHRyZWVEYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBtYXBzIHRoZSBub2RlIGRhdGEgdG8gdGhlIHRyZWUgbGF5b3V0XHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZSBpZiBubyBuZXR3b3JrIGlzIGNob29zZW5cclxuICAgICAgICBpZiAoJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgc2xpZGVyIG1heFxyXG4gICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlcignb3B0aW9uJywgJ21heCcsIChub2Rlc1snaGVpZ2h0J10gLSAxKSlcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ3ZhbHVlJywgaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBsaW5rcyAoZWRnZXMpXHJcbiAgICAgICAgICAgIGxldCBsaW5rID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKS5zbGljZSgxKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFTlRFUlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBsaW5rcyB0byB0aGVpciBuZXcgcG9zaXRpb24uXHJcbiAgICAgICAgICAgIGxpbmtcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIGxpbmsuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBub2Rlc1xyXG4gICAgICAgICAgICAvLyBhZGRzIGVhY2ggbm9kZSBhcyBhIGdyb3VwXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubm9kZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZ3JvdXBzIHRvIHRoZSBkZW5kZ3JvZ3JhbVxyXG4gICAgICAgICAgICB2YXIgbm9kZUVudGVyID0gbm9kZS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vZGUnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGQuY2hpbGRyZW4gPyAnIG5vZGUtLWludGVybmFsJyA6ICcgbm9kZS0tbGVhZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVIgLSBhcHBlbmQgZm9yIGVhY2ggZ3JvdXAgYSBub2RlIChjaXJjbGUpXHJcbiAgICAgICAgICAgIC8vIHdpdGggaGlnaGxpZ2h0aW5nIGZvciB0aGUgYWN0aXZlIGNob29zZW4gbGV2ZWxcclxuICAgICAgICAgICAgbm9kZUVudGVyLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA0MDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gZmluZCBhIG5pY2UgZnVuY3Rpb24gZm9yIHRoZSBvbiBjbGljayBtZXRob2RcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGljaylcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvb2x0aXAgcG9zaXRpb24gYW5kIHRleHRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYuc2VsZWN0KCcudG9vbHRpcC1zcGFuJykuaHRtbChkWydkYXRhJ11bJ25hbWUnXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyBtYWtlIHRoaXMgd29yayBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcjaHAnICsgZFsnZGF0YSddWyduYW1lJ10uam9pbignJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2hwJyArIGRbJ2RhdGEnXVsnbmFtZSddLmpvaW4oJycpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC5jbGFzc2VkKCdoaWdobGlnaHQtaGllcmFyY2h5JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGVhY2ggYW5pbWFsIGluIHRoZSBjbHVzdGVyIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRbJ2RhdGEnXVsnbmFtZSddLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2FuaW1hbC0nICsgZFsnZGF0YSddWyduYW1lJ11baV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnI2M1MWI3ZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBEaXYudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBoaWdobGlnaHQgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIHdvcmsgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzcGF0aWFsVmlldy5zZWxlY3QoJyNocCcgKyBkWydkYXRhJ11bJ25hbWUnXS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuY2xhc3NlZCgnaGlnaGxpZ2h0LWhpZXJhcmNoeScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaGlnaGxpZ2h0IGVhY2ggYW5pbWFsIGluIHRoZSBjbHVzdGVyIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRbJ2RhdGEnXVsnbmFtZSddLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3LnNlbGVjdCgnI2FuaW1hbC0nICsgZFsnZGF0YSddWyduYW1lJ11baV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnIzAwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0tIHVwZGF0ZSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIG5vZGVFbnRlclxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhZSB0aGUgbm9kZSBhbmQgY2lyY2xlc1xyXG4gICAgICAgICAgICAvLyB3aXRoIGFjdGl2ZS1sZXZlbCBmdW5jdGlvbiB0byBoaWdobGlnaHQgd2hpY2ggbGV2ZWwgaXMgY2hvc2VuXHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDQwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYWN0aXZlLWxldmVsJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgICAgIG5vZGUuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCEkLmlzRW1wdHlPYmplY3QobmV0d29ya0hpZXJhcmNoeSkpIHtcclxuICAgICAgICAvLyBkcmF3IHRoZSBoaWVyYXJjaHkgaW4gc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgZHJhd0hpZXJhcmNoeSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgYWxsIGhpZXJhcmNoaWVzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogYWRkIGEgZ3JvdXAgd2l0aCB0aGUgaWRzIG9mIHRoZSBhbmltYWxzIGluIGl0IHRvIHRoZSB2aWV3XHJcbiAqIHdpdGggcGF0aCBjaGlsZCBlbGVtZW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZHJhd0hpZXJhcmNoeSgpIHtcclxuICAgIC8vIGlkIG9mIHRoZSBoaWVyYXJjaHkgZS5nLiBbMSw1LDNdXHJcbiAgICBsZXQgaGllcmFyY2h5SWRzID0gT2JqZWN0LmtleXMobmV0d29ya0hpZXJhcmNoeSkubWFwKGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICByZXR1cm4geC5yZXBsYWNlKCdoJywgJycpO1xyXG4gICAgfSk7XHJcbiAgICAvLyAgVGhlIGNsdXN0ZXJpbmcgaW4gYW4gMkQgYXJyYXkgd2l0aCB3aGljaCBhbmltYWwgaWQgYmVsb25ncyB0byB3aGljaCBncm91cFxyXG4gICAgbGV0IGhpZXJhcmNoeVZlcnRpY2VzID0gW107XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaHkgZGF0YSB0byBnZXQgdGhlIGhpZXJhcmNoeSBhbmltYWwgaWRzIHBlciBjbHVzdGVyaW5nIGFuZCBncm91cGluZ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgdHJlZURhdGEgPSBuZXR3b3JrSGllcmFyY2h5WydoJyArIGhpZXJhcmNoeUlkc1tpXV1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBub2Rlc1snY2hpbGRyZW4nXVswXTtcclxuICAgICAgICBpZiAoc2hvd05ldHdvcmtIaWVyYXJjaHkgPT09IGhpZXJhcmNoeUlkc1tpXSkge1xyXG4gICAgICAgICAgICBuZXR3b3JrSGllcmFyY2h5SWRzID0gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIHRoZSB2ZXJ0aWNlcyBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzLnB1c2goZ2V0SGllcmFyY2h5VmVydGljZXMoZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIG1vcmUgdGhhbiAyIGhpZXJhcmNoaWVzIGFyZSBkcmF3blxyXG4gICAgaWYgKGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhoaWVyYXJjaHlWZXJ0aWNlcyk7XHJcbiAgICAgICAgLy8gdHJhbnNmb3JtIGFuZCBjYWxjdWxhdGUgdGhlIGludGVyc2VjdGlvbiBwb2x5Z29ucyBvZiB0aGUgbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vIHRlbXAgc29sdXRpb24gb2YgdHdvIGludGVyc2VjdGlvbnNcclxuICAgICAgICAgICAgbGV0IHRtcEludGVyc2VjdGlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSBQb2x5Qm9vbC5pbnRlcnNlY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IHRtcEludGVyc2VjdGlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gdG1wSW50ZXJzZWN0aW9uWydyZWdpb25zJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzdWx0XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzID0gW3RtcEludGVyc2VjdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSBhbmQgY2FsY3VsYXRlIHRoZSBzeW1tZXRyaWMgZGlmZmVyZW5jZSBwb2x5Z29ucyBvZiB0aGUgbiBoaWVyYXJjaGllc1xyXG4gICAgICAgIGVsc2UgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ3N5bS1kaWZmZXJlbmNlJykge1xyXG4gICAgICAgICAgICAvLyB0ZW1wIHNvbHV0aW9uIG9mIHRoZSBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICAgICAgICBsZXQgdG1wRGlmZmVyZW5jZSA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICAgICAgICAgICAgICB0bXBEaWZmZXJlbmNlID0gUG9seUJvb2wueG9yKHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpb25zOiB0bXBEaWZmZXJlbmNlLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICB0bXBEaWZmZXJlbmNlID0gdG1wRGlmZmVyZW5jZVsncmVnaW9ucyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJlc3VsdFxyXG4gICAgICAgICAgICBoaWVyYXJjaHlWZXJ0aWNlcyA9IFt0bXBEaWZmZXJlbmNlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIERBVEEgSm9pblxyXG4gICAgbGV0IGhpZXJhcmNoaWVzID0gc3BhdGlhbFZpZXdcclxuICAgICAgICAuc2VsZWN0QWxsKCdnLmhpZXJhcmNoeS1ncm91cCcpXHJcbiAgICAgICAgLmRhdGEoaGllcmFyY2h5VmVydGljZXMpO1xyXG5cclxuICAgIC8vIEVOVEVSIHRoZSBncm91cHMgLSBhZGRzIGEgc3BlY2lmaWMgaWQgYW5kIGNvbG9yXHJcbiAgICBoaWVyYXJjaGllc1xyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaW50ZXJzZWN0aW9uJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIGgnICsgaGllcmFyY2h5SWRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5SWRzW2ldXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBVUERBVEUgLSB0aGUgY2xhc3MgbmVlZGVkIGZvciBpbnRlcnNlY3Rpb24gYW5kIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICBoaWVyYXJjaGllcy5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBpbnRlcnNlY3Rpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBoJyArIGhpZXJhcmNoeUlkc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJjaGllcy5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gSGllcmFjaHkgaHVsbHMgYWRkZWQgdG8gdGhlIHNwYXRpYWwgdmlldyAtIGdldCB0aGUgcG9pbnRzIGZvciBlYWNoIGFuaW1hbCBpbiB0aGVcclxuICAgIC8vIHNwYXRpYWwgdmlldyBzbyB0aGF0IGEgY29udmV4IGh1bGwgY2FuIGJlIGNhbGN1bGF0ZWRcclxuICAgIGxldCBoaWVyYXJ5SHVsbHMgPSBoaWVyYXJjaGllcy5zZWxlY3RBbGwoJ3BhdGguaGllcmFyY2h5LWh1bGwtcGF0aCcpXHJcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFTlRFUiBhbmQgY2FsY3VsYXRlIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAvLyAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiAnaHAnICsgZC5qb2luKCcnKS5yZXBsYWNlKC8sL2csICcnKTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWVyYXJjaHktaHVsbC1wYXRoJylcclxuICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGRyYXdMaW5lKGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCdMJykgKyAnWic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gVVBEQVRFIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBkcmF3TGluZShkKTtcclxuICAgICAgICAgICAgcmV0dXJuICdNJyArIGQuam9pbignTCcpICsgJ1onO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgLy8gcmV0dXJuICdocCcgKyBkLmpvaW4oJycpLnJlcGxhY2UoLywvZywgJycpO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJ5SHVsbHMuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVkZ2UgZHJhd2luZyBtZXRob2Qgb2YgdGhlIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtvYmplY3R9IGQgLSBUcmVlbWFwIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGRpYWdvbmFsTGluZXMoZCkge1xyXG4gICAgcmV0dXJuICdNJyArIGQueCArICcsJyArIGQueSArXHJcbiAgICAgICAgJ1YnICsgZC5wYXJlbnQueSArICdIJyArIGQucGFyZW50Lng7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjbGljayBmdW5jdGlvbiAtIGhpZ2hsaWdodCB0aGUgZWxlbWVudHMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZCAtIFRyZWVtYXAgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY2xpY2soZCkge1xyXG4gICAgc2V0QWN0aXZlQW5pbWFscyhkWydkYXRhJ11bJ25hbWUnXSk7XHJcbiAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIGRyYXcgb25lIHN0ZXBcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IGFsbCB0aGUgY2x1c3RlcmluZyBvZiBhIHNwZWNpZmljIGxldmVsIGluIHRoZSBkZW5kcm9ncmFtIHRyZWVcclxuICogRm9yIGluc3RhbmNlIGFsbCBjbHVzdGVycyBmcm9tIGxldmVsIDVcclxuICogQHBhcmFtIHtvYmplY3R9IHJvb3QgLSBSb290IG9mIHRoZSB0cmVlbWFwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVhcmNoeSAtIE51bWJlciBvZiBoaWVyYXJjaHkgZnJvbSBbMC0zXVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5KSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBsZXQgbGV2ZWwgPSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XTtcclxuXHJcbiAgICAvLyBzZWNvbmQgbGV2ZWwgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgdG1wX25vZGVzID0gcm9vdFsnY2hpbGRyZW4nXTtcclxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0aGUgdHJlZVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByb290WydoZWlnaHQnXTsgaSsrKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGF0IHRoZSBzZWFyY2hlZCBsZXZlbFxyXG4gICAgICAgIGlmICh0bXBfbm9kZXNbMF0gJiYgdG1wX25vZGVzWzBdWydkZXB0aCddID09PSBsZXZlbCkge1xyXG4gICAgICAgICAgICAvLyBhZGQgZWFjaCBjbHVzdGVyIHRvIHRoZSByZXN1bHQgc2V0XHJcbiAgICAgICAgICAgIHRtcF9ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnZGF0YSddWyduYW1lJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZVsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gb2YgYSBzcGVjaWZpYyBsZXZlbCBpbiB0aGUgdHJlZVxyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICB0bXBfbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnY2hpbGRyZW4nXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHRtcC5jb25jYXQobm9kZVsnY2hpbGRyZW4nXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0bXBfbm9kZXMgPSB0bXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzcGVjaWZpYyB2ZXJ0aWNlcyBvZiBhIGNsdXN0ZXJpbmcgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgcG9pbnRzIFtbeCx5XVt4LHldLi4uXVxyXG4gKiBAcGFyYW0ge0FycmF5fSBoaWVyYXJjaGllcyAtIEFycmF5IG9mIGFycmF5cyB3aXRoIGVhY2ggYXJyYXkgY29udGFpbnMgYWxsIHRoZSBpZHMgZm9yIGEgc3BlY2lmaWMgY2x1c3RlcmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5VmVydGljZXMoaGllcmFyY2hpZXMpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTsgLy8gcmVzdWx0IHNldFxyXG4gICAgaGllcmFyY2hpZXMuZm9yRWFjaChmdW5jdGlvbihjbHVzdGVyKSB7XHJcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gW107IC8vIHZlcnRpY2VzIG9mIHRoZSBjbHVzdGVycyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjbHVzdGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBncm91cE1lbWJlciA9IGFycmF5QW5pbWFscy5maW5kKGQgPT4gZFsnYSddID09PSBjbHVzdGVyW2pdKTtcclxuICAgICAgICAgICAgaWYgKGdyb3VwTWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFtncm91cE1lbWJlclsncCddWzBdLCAtZ3JvdXBNZW1iZXJbJ3AnXVsxXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFuZHJldyBtb250b25lIGNoYWluIGFsZ29yaXRobSByZXV0cm5zIGZvciBwb2ludHMgZmV3ZXIgdGhhbiAzIG51bGxcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh2ZXJ0aWNlcyk7XHJcbiAgICAgICAgaWYgKHZlcnRpY2VzLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIC8vIHJlc3VsdC5wdXNoKGQzLnBvbHlnb25IdWxsKHZlcnRpY2VzKSk7XHJcbiAgICAgICAgICAgIGNvbmNhdmVIdWxsKHZlcnRpY2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGh1bGwpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGh1bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBhY3RpdmUgbGV2ZWwgZm9yIGEgc3BlY2lmaWMgZGVuZHJvZ3JhbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5IGNhbiBiZSBmcm9tIFswLTNdXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCAtIE5ldyBhY3RpdmUgbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlMZXZlbChoaWVyYXJjaHksIGxldmVsKSB7XHJcbiAgICAvLyBUT0RPIGNhdGNoIGNhc2VzIDwgMCBhbmQgYmlnZ2VyIHRoYW4gb3ZlcmFsbCBoZWlnaHRcclxuICAgIGhpZXJhcmNoeUxldmVsc1snaCcgKyBoaWVyYXJjaHldID0gbGV2ZWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGVudHJ5IGZvciB0aGUgaGllcmFyY2ggbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUxldmVsKGhpZXJhcmNoeSkge1xyXG4gICAgLy8gVE9ETyBjYXRjaCBjYXNlcyA8IDAgYW5kIGJpZ2dlciB0aGFuIG92ZXJhbGwgaGVpZ2h0XHJcbiAgICBkZWxldGUgaGllcmFyY2h5TGV2ZWxzWydoJyArIGhpZXJhcmNoeV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGFjdGl2ZSBjb2xvciBmb3IgYSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHkgY2FuIGJlIGZyb20gWzAtM11cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIaWVyYXJjaHlDb2xvcihoaWVyYXJjaHkpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRtcF9ib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaGllcmFyY2h5Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9yc1trZXldID09PSBjb2xvcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0bXBfYm9vbGVhbikge1xyXG4gICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IGNvbG9yc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGNvbG9yIGZvciB0aGUgaGllcmFyY2ggbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUNvbG9yKGhpZXJhcmNoeSkge1xyXG4gICAgZGVsZXRlIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBoaWVyYXJjaHkgYnV0dG9uIHRvIHRoZSBkaXZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gSGllcmFyY2h5IG9mIHRoZSBpZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5ldyBhY3RpdmUgbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRIaWVyYXJjaHlCdXR0b24oaWQsIG5hbWUpIHtcclxuICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoIDwgbWF4TnVtYmVySGllcmFyY2hpZXMpIHtcclxuICAgICAgICAkKCcjZGVuZHJvZ3JhbS1idXR0b25zLWRpdicpLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaG93LWRlbmRyb2dyYW0tJyArIGlkICsgJ1wiIGRhdGE9JyArIGlkICsgJyBuYW1lPScgKyBuYW1lICtcclxuICAgICAgICAgICAgJyBjbGFzcz1cInNob3ctZGVuZHJvZ3JhbSBidG4gYnRuLWJsb2NrXCIgZGF0YS10b2dnbGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9XCJmYWxzZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPicgK1xyXG4gICAgICAgICAgICAnIDxzcGFuIGNsYXNzPVwiYnRuLWxhYmVsXCIgaWQ9XCJidG4tbGVmdFwiPiA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCI+PC9pPiZuYnNwJm5ic3AgU2hvdyAnICsgbmFtZSArICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJ0bi1sYWJlbCBoaWRkZW5cIiBpZD1cImJ0bi1yaWdodFwiPiA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiPjwvaT4mbmJzcCZuYnNwIEhpZGUgJyArIG5hbWUgKyAnIDwvc3Bhbj48L2J1dHRvbj4gPGJyPidcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgc3BlY2lmaWMgaGllcmFyY2h5IGJ1dHRvbiB0byB0aGUgZGl2XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEhpZXJhcmNoeSBvZiB0aGUgaWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWVyYXJjaHlCdXR0b24oaWQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgZm9sbG93aW5nIGxpbmUgYnJlYWsgYW5kIGVsZW1lbnRcclxuICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5uZXh0KCkucmVtb3ZlKCk7XHJcbiAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkucmVtb3ZlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgc2xpZGVyIGFuZCB0ZXh0IGluIHRoZSBkZW5kcm9ncmFtIHBhbmVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGdldCB0aGUgaW1wb3J0YW50IGluZm9cclxuICAgIGxldCBpZCA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCdkYXRhJyk7XHJcbiAgICBsZXQgbmFtZSA9ICQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5hdHRyKCduYW1lJyk7XHJcbiAgICAvLyBzZXQgdGhlIG5hbWUgb2YgdGhlIGRpc3BsYXllZCBoaWVyYXJjaHlcclxuICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsLW5hbWUnKS50ZXh0KG5hbWUpO1xyXG5cclxuICAgIC8vIHNldCBzbGlkZXIgYW5kICB0ZXh0IHZhbHVlXHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC1zbGlkZXInKS52YWwoaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1sZXZlbC10ZXh0JykudGV4dChoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgaGllcmFyY2h5IGxlZ2VuZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZCgpIHtcclxuICAgIGxldCBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaFdpZHRoID0gNTA7XHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoSGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgLy8gU2hvdyBvciBoaWRlIHRoZSBzdmcgZWxlbWVudFxyXG4gICAgaWYgKE9iamVjdC5rZXlzKGhpZXJhcmNoeUNvbG9ycykubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgJCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2Jykuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxlZ2VuZERhdGEgPSBbXTtcclxuICAgIGxldCBsZWdlbmRUZXh0RGF0YSA9IFtdO1xyXG4gICAgLy8gZ2V0IHRoZSByZXF1aXJlZCBkYXRhXHJcbiAgICAkKCcuc2hvdy1kZW5kcm9ncmFtJykuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBkYXRhIGlzIG5vdCB1bmRlZmluZWRcclxuICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzWydoJyArICQob2JqKS5hdHRyKCdkYXRhJyldICE9IG51bGwgJiYgJChvYmopLmF0dHIoJ25hbWUnKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxlZ2VuZERhdGEucHVzaChoaWVyYXJjaHlDb2xvcnNbJ2gnICsgJChvYmopLmF0dHIoJ2RhdGEnKV0pO1xyXG4gICAgICAgICAgICBsZWdlbmRUZXh0RGF0YS5wdXNoKCQob2JqKS5hdHRyKCduYW1lJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERBVEEgSk9JTlxyXG4gICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZERhdGEpO1xyXG4gICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZFRleHREYXRhKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyAyLjUgKiBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC10ZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyAyLjUgKiBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNldCBvcGVyYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdGlvbiAtIGUuZy4gXCJ1bmlvblwiIFwiaW50ZXJzZWN0aW9uXCIgXCJzeW0tZGlmZmVyZW5jZVwiXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2V0T3BlcmF0aW9uKHZhbHVlKSB7XHJcbiAgICBzZXRPcGVyYXRpb24gPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oaWVyYXJjaHkuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxudmFyIHNvdXJjZTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRUb0RhdGFzZXQsXHJcbiAgICBzZXREYXRhU2V0UGVyY2VudGlsZSxcclxuICAgIHNldFN3YXJtRGF0YSxcclxuICAgIHNldE1ldGFEYXRhLFxyXG4gICAgc2V0RGF0YXNldEZlYXR1cmUsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldEhpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE5ldHdvcmtCdXR0b25zXHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBlbmFibGVQbGF5QnV0dG9uLFxyXG4gICAgZGlzYWJsZVBsYXlCdXR0b25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNwYXRpYWxWaWV3SW5pdFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0cmVhbSB0aGUgbW92ZW1lbnQgZGF0YSBmcm9tIHRoZSBBUElcclxuICogTG9hZHMgb25seSB0aGUgZXhwbGljaXQgbW92ZW1lbnQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbU1vdmVtZW50RGF0YSgpIHtcclxuICAgIGlmICh3aW5kb3cuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9hcGkvbW92ZW1lbnRfb25seS8nICsgcGFyYW1ldGVyc1snaWQnXSk7XHJcbiAgICAgICAgc291cmNlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gJ2Nsb3NlJykge1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgYWpheCBxdWVyaWVzIGFyZSBjb21wZWx0ZSBpbml0aWFsaXplXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tQZW5kaW5nUmVxdWVzdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuYWN0aXZlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWxWaWV3SW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkVG9EYXRhc2V0KEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnJlYWR5U3RhdGUgPT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdXZWJicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RyZWFtaW5nJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnRpbGUgZGF0YSBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJjZW50aWxlKCkge1xyXG4gICAgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcGVyY2VudGlsZS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRhU2V0UGVyY2VudGlsZSBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vIFttaW4sIHBlcmNlbnRpbGVfMSwuLi4scGVyY2VudGlsZV85LG1heF1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtkYXRhW2ldWydmZWF0dXJlJ11dID0gW2RhdGFbaV1bJ21pbiddLCBkYXRhW2ldWydwMSddLCBkYXRhW2ldWydwMiddLCBkYXRhW2ldWydwMyddLCBkYXRhW2ldWydwNSddLCBkYXRhW2ldWydwNyddLCBkYXRhW2ldWydwOCddLCBkYXRhW2ldWydwOSddLCBkYXRhW2ldWydtYXgnXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RGF0YVNldFBlcmNlbnRpbGUoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0IGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRmVhdHVyZXMoKSB7XHJcbiAgICBjb25zdCBzd2FybV9mZWF0dXJlcyA9IFsnc3dhcm1fdGltZScsICdzd2FybV9zcGVlZCcsICdzd2FybV9hY2NlbGVyYXRpb24nLCAnc3dhcm1fY29udmV4X2h1bGxfYXJlYScsXHJcbiAgICAgICAgJ3N3YXJtX2Rpc3RhbmNlX2NlbnRyb2lkJywgJ3N3YXJtX2RpcmVjdGlvbicsICdzd2FybV9wb2xhcmlzYXRpb24nXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGdldCBhbGwgdGhlIG90aGVyIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIHN3YXJtX2ZlYXR1cmVzW2ldLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlYXR1cmUgPSBzd2FybV9mZWF0dXJlc1tpXS5yZXBsYWNlKCdzd2FybV8nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG1lYWRhdGEgaW5mb3JtYXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhRGF0YSgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9tZXRhZGF0YS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRNZXRhRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBkYXRhc2V0cyBmb3IgdGhlIGJ1dHRvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YUJ1dHRvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmtzLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2Ugc3BlZWQsIGFjY2VsZXJhdGlvbiBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YXNldEZlYXR1cmUoZmVhdHVyZSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIHN3YXJtIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2UgY2VudHJvaWQsIG1lZG9pZCBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGZvciB0aGUgc3BlY2lmaWMgbmV0d29ya19pZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV0d29ya19pZCAtIHVuaXF1ZSBuZXR3b3JrIGlkIG9mIGEgZGF0YXNldC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YShuZXR3b3JrX2lkKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3JrLycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldE5ldHdvcmtEYXRhKEpTT04ucGFyc2UoZGF0YVswXVsnZGF0YSddKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBoaWVyYXJjaHkgZm9yIHRoZSBzcGVjaWZpYyBuZXR3b3JrX2lkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXR3b3JrX2lkIC0gdW5pcXVlIG5ldHdvcmsgaWQgb2YgYSBkYXRhc2V0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKG5ldHdvcmtfaWQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmsvaGllcmFyY2h5LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeURhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSksIG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSxcclxuICAgIHN3YXJtRGF0YVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCAqIGFzIE5ldHdvcmsgZnJvbSAnLi4vbmV0d29yay5qcyc7XHJcblxyXG5leHBvcnQgbGV0IHNsaWRlcjsgLy8gdGltZSBzbGlkZXIgb2YgdGhlIGFwcFxyXG5leHBvcnQgbGV0IHRvb2x0aXA7IC8vIHRvb2x0aXAgZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBCcnVzaCBlbmQgZnVuY3Rpb25cclxuICogYWRkIGFjdGl2ZSBhbmltYWxzIHRvIHRoZSBhcnJheSBvciByZW1vdmUgdGhlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgbGV0IGFycmF5QW5pbWFscyA9IFNQVi5hcnJheUFuaW1hbHM7XHJcbiAgICBsZXQgYWN0aXZlQW5pbWFscyA9IFNQVi5hY3RpdmVBbmltYWxzO1xyXG4gICAgdmFyIHJlY3QgPSBkMy5ldmVudC5zZWxlY3Rpb247XHJcbiAgICAvL2l0ZXJhdGUgb3ZlciB0aGUgMTUxIGZpc2ggdG8gY2hlY2sgd2hpY2ggYXJlIGluIHRoZSBicnVzaFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTUFYuYW5pbWFsX2lkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwb2ludCA9IFthcnJheUFuaW1hbHNbaV1bJ3AnXVswXSwgYXJyYXlBbmltYWxzW2ldWydwJ11bMV1dO1xyXG4gICAgICAgIC8vY2hlY2sgd2hpY2ggZmlzaCBhcmUgaW4gIHRoZSBicnVzaGVkIGFyZWFcclxuICAgICAgICBpZiAoKHJlY3RbMF1bMF0gPD0gcG9pbnRbMF0pICYmIChwb2ludFswXSA8PSByZWN0WzFdWzBdKSAmJlxyXG4gICAgICAgICAgICAocmVjdFswXVsxXSA8PSBwb2ludFsxXSkgJiYgKHBvaW50WzFdIDw9IHJlY3RbMV1bMV0pKSB7XHJcbiAgICAgICAgICAgIC8vIFBvaW50IGlzIGluIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goYXJyYXlBbmltYWxzW2ldWydhJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKGFjdGl2ZUFuaW1hbHMpO1xyXG4gICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH1cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAkKCcuYnJ1c2gnKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRvb2x0aXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcCgpIHtcclxuICAgIHRvb2x0aXAgPSBkMy5zZWxlY3QoJ2Rpdi50b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVG9vbHRpcCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gZCAtIGQzIGRhdGEgb2JqZWN0IHdpdGggdGhlIG1ldGFkYXRhIGluZm9ybWF0aW9uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9vbHRpcEZ1bmN0aW9uKGQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRbJ2EnXSA9PT0gZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIG1vZHVsYXJcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLWFuaW1hbC1pZCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNwZWNpZXMnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2V4JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2l6ZScpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC13ZWlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHRpbWUgc2xpZGVyIGFuZCB0aGUgZHluYW1pYyBuZXR3b3JrIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXJzKCkge1xyXG4gICAgLy8gdGltZSBzbGlkZXJcclxuICAgIHNsaWRlciA9ICQoJyNzbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogc3dhcm1EYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RlcDogMjUsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgcGF1c2VkIGFwcGx5IGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIE5ldHdvcmsgc2xpZGVyXHJcbiAgICAkKCcjbmV0d29yay1zbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgTmV0d29yay5zZXROZXR3b3JMaW1pdCh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdCcpLnZhbCh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1heCBmcm9tIHRoZSBzbGlkZXIgdGhpcyBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSB0aWNrc1xyXG4gICAgbGV0IG1heCA9IHNsaWRlci5zbGlkZXIoJ29wdGlvbicsICdtYXgnKTtcclxuICAgIGxldCBzcGFjZSA9IDEwMCAvIG1heDtcclxuICAgIC8vYXBwZW5kIHRoZSBtaW51dGUgdGlja3NcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpID0gaSArIDE1MDApIHtcclxuICAgICAgICAkKCc8c3BhbiBjbGFzcz1cInVpLXNsaWRlci10aWNrXCI+PC9zcGFuPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2xlZnQnLCAoc3BhY2UgKiBpKSArICclJylcclxuICAgICAgICAgICAgLmFwcGVuZFRvKHNsaWRlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHRpbWUgc2xpZGVyIHRvIGEgbmV3IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB2YWx1ZSBmb3IgdGhlIHRpbWUgc2xpZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZVNsaWRlcih2YWx1ZSkge1xyXG4gICAgc2xpZGVyLnNsaWRlcigndmFsdWUnLCB2YWx1ZSk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgU2V0Ki9cclxuXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBicnVzaGVuZCxcclxuICAgIHNsaWRlclxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmQsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yLFxyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEsXHJcbiAgICBjb2xvck1ldGFkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldE5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBzZXROZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc2V0TmV0d29ya0RhdGEsXHJcbiAgICBzZXRIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBnZXREYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtEYXRhLFxyXG4gICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSxcclxuICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhXHJcbn0gZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNvbG9yU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZEhpZXJhcmNoeUJ1dHRvbixcclxuICAgIHJlbW92ZUhpZXJhcmNoeUJ1dHRvbixcclxuICAgIGRyYXdEZW5kcm9ncmFtLFxyXG4gICAgbWF4TnVtYmVySGllcmFyY2hpZXMsXHJcbiAgICBzZXRTZXRPcGVyYXRpb25cclxufSBmcm9tICcuL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5sZXQgYnJ1c2g7IC8vIGJydXNoaW5nIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgcGxheUJvb2xlYW4gPSB0cnVlOyAvLyBwYXVzZSBhbmQgcGxheSBib29sZWFuXHJcblxyXG4vKipcclxuICogSW5pdCBhbGwgdGhlIGxpc3RlbmVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjcF9saXN0ZW5lcigpO1xyXG4gICAgc2ZfbGlzdGVuZXJzKCk7XHJcbiAgICBhZl9saXN0ZW5lcnMoKTtcclxuICAgIG1kX2xpc3RlbmVycygpO1xyXG4gICAgbl9saXN0ZW5lcnMoKTtcclxuICAgIGhfbGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGNvbnRyb2wgcGFuZWwgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBjcF9saXN0ZW5lcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgb3Igc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUoc2xpZGVyLnNsaWRlcigndmFsdWUnKSk7XHJcbiAgICAgICAgICAgICQoJy5icnVzaCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGF1c2UgdGhlIGFuaW1hdGlvbiBhbmQgc2hvdyBvbmx5IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXh0LWZyYW1lLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcnVzaGluZyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vc3RvcCB0aGUgYW5pbWF0aW9uXHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKCEkKCcjYnJ1c2hpbmctYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZGVmaW5lIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBicnVzaCA9IGQzLmJydXNoKClcclxuICAgICAgICAgICAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbU1BWLnRhbmtXaWR0aCwgU1BWLnRhbmtIZWlnaHRdXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdlbmQnLCBicnVzaGVuZCk7XHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSBicnVzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoYnJ1c2gpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbnNlbGVjdCBhbGwgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVBbmltYWxzKFtdKTtcclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcblxyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BhdGlhbCB2aWV3IGJhY2tncm91bmQgY29sb3JcclxuICAgICAqL1xyXG4gICAgJCgnI2JhY2tncm91bmQtY29sb3InKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLWJhY2tncm91bmQ6Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgICQoJyNtYWluLXZpcy1zdmcnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIHNwYXRpYWwgdmlldyBheGlzIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1heGlzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgZnJhbWUgKHRpbWUpIG51bWJlciBpbiB0aGUgc3BhdGlhbCB2aWV3IGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10aW1lJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIC5mcmFtZS10ZXh0Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWUtdGV4dCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIFNjYWxlIEZ1bmN0aW9uIFJhZGlvIGJ1dHRvbnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0gaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JTY2FsZVsndHlwZSddID0gJCgnaW5wdXRbbmFtZT1jb2xvci1zY2FsZS1yYWRpb106Y2hlY2tlZCcsICcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybScpLnZhbCgpO1xyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBzd2FybSBmZWF0dXJlcyBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIHNmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlyZWN0aW9uIGFycm93IG9mIHRoZSBhbmltYWxcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlyZWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdkaXJlY3Rpb24nIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgZGlyZWN0aW9uIGRhdGFcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdkaXJlY3Rpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5hcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmFycm93JylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IG1lZG9pZCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctbWVkb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LW1lZG9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoISgnbWVkb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdtZWRvaWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbChzd2FybURhdGFbU1BWLmluZGV4VGltZV1bJ21lZG9pZCddKTtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgbWVkb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgU1BWLm1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgZGlzcGxheSB0aGUgbWVkb2lkIGZpc2hcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldE1lZG9pZEFuaW1hbCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnY2VudHJvaWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaGlkZSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2NpcmNsZS5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBjb252ZXggaHVsbCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctY29udmV4LWh1bGwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnaHVsbCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnY29udmV4X2h1bGwnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRyaWFuZ3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy10cmlhbmd1bGF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ3RyaWFuZ3VsYXRpb24nIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ3RyaWFuZ3VsYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB2b3Jvbm9pXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXZvcm9ub2knKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdm9yb25vaScpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd2b3Jvbm9pJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCd2b3Jvbm9pJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IGFic29sdXRlIGZlYXR1cmUgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBhZl9saXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IFNwZWVkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1zcGVlZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1zcGVlZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ3NwZWVkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnc3BlZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnc3BlZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhY2NlbGVyYXRpb24gYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgYWNjZWxlcmF0aW9uIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnYWNjZWxlcmF0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2FjY2VsZXJhdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlzdGFuY2UgdG8gY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnZGlzdGFuY2VfY2VudHJvaWQnIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgZGlzdGFuY2VfY2VudHJvaWRcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdkaXN0YW5jZV9jZW50cm9pZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5kcmF3LWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkLWRldGFpbHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdkaXN0YW5jZV9jZW50cm9pZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlLWNlbnRyb2lkLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBuZXR3b3JrIGxpc3RlZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIG5fbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keSBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV0d29ya19pZCA9ICQodGhpcykuYXR0cignZGF0YScpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIG5hbWUgb2YgdGhlIGNob29zZW4gbmV0d29yayB0byB0aGUgTmV0d29yayBtb2RhbFxyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgkKHRoaXMpLmF0dHIoJ25hbWUnKSk7XHJcblxyXG4gICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCk7XHJcbiAgICAgICAgJCgnI25ldHdvcmstZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXROZXR3b3JrRGF0YSh7fSk7XHJcblxyXG4gICAgICAgICQoJyNhY3RpdmUtbmV0d29yay1uYW1lJykudGV4dCgnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYXV0byBidXR0b24gc2V0IGFjaXZlIG9yIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGxpbWl0ID0gJCgnI25ldHdvcmstc2xpZGVyJykuc2xpZGVyKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JMaW1pdChsaW1pdCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG1ldGFkYXRhIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbWRfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBzd2F0Y2ggZnVuY3Rpb25zIGNvbG9yaW5nIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gICAgICovXHJcbiAgICAkKCcubWV0YWRhdGEtc3dhdGNoLm1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IGNvbG9yUkdCID0gJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBzd2F0Y2ggcHJldmlld1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1yb3ctJyArIGlkICsgJyAjcHJldmlldycpXHJcbiAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvclJHQik7XHJcbiAgICAgICAgLy8gaWYgd2hpdGUgdGhhbiByZXNldCB0aGUgY29sb3JcclxuICAgICAgICBpZiAoY29sb3JSR0IgPT09ICdyZ2IoMjU1LCAyNTUsIDI1NSknKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YUNvbG9yW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhQ29sb3JbaWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltpZF0gPSBjb2xvclJHQjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGZ1bmN0aW9ucyBmb3IgaW5zdGFuY2UgY29sb3Igc2V4XHJcbiAgICAgKi9cclxuICAgICQoJyNncm91cC1tZXRhZGF0YSA6aW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIG1ldGFkYXQgYWNvbG9yaW5nXHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gbWV0YWRhdGEgc2V4IGlzIGNob29zZW4gLSBjb2xvcmluZyBiYXNlZCBvbiBtIGFuZCBmXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnc2V4Jykge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBhbmQgY29sb3IgaGVyZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXQgb2YgaW5kaXZpZHVhbCBzdHJpbmdzIGluIHNleFxyXG4gICAgICAgICAgICB0bXAgPSBBcnJheS5mcm9tKG5ldyBTZXQodG1wKSk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSA9PT0gdG1wW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgY29sb3JpbmcgdG8gdGhlIG1ldGFkYXRhY29sb3Igb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIC8vIHNldCB2YWx1ZXMgb2YgaW5wdXRzXHJcbiAgICAgICAgICAgIC8vIGhlcmUgYXJlIGF1dG9tYXRpY2FsbHkgaW5wdXQgdmFsdWVzIGNhbGN1bGF0ZWRcclxuICAgICAgICAgICAgLy8gLjI1IGFuZCAuNzUgcGVyY2VudGlsZXMgYXJlIHVzZWRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBibEF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC4yNSk7IC8vIGJlbG93IGF2ZXJhZ2UgdmFsdWVcclxuICAgICAgICAgICAgbGV0IGFiQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjc1KTsgLy8gYWJvdmUgYXZlcmFnZVxyXG4gICAgICAgICAgICAkKCcjYmwtYXZnJykudmFsKGJsQXZnKTtcclxuICAgICAgICAgICAgJCgnI2FiLWF2ZycpLnZhbChhYkF2Zyk7XHJcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICAgICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGlucHV0IHNwaW5uZXJcclxuICAgICAqICsvLSAwLjEgdG8gdGhlIGlucHV0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgb2xkVmFsdWUgPSBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwoKS50cmltKCksXHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChidG4uYXR0cignZGF0YS1kaXInKSA9PSAndXAnKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpICsgMC4xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpIC0gMC4xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKG5ld1ZhbCAqIDEwMCkgLyAxMDA7IC1cclxuICAgICAgICBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwobmV3VmFsKTtcclxuICAgICAgICAvLyBjaGFuZ2UgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBpbnB1dCBmaWVsZHMgY2hhbmdlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBtZXRhZGF0YSBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNtZXRhZGF0YS1yZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG59XHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGhpZXJhcmNoeS9kZW5kZ3JvZ3JhbSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGhfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRlbmRncm9ncmFtIHNsaWRpbmcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKSB7XHJcblxyXG4gICAgICAgICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRCdXR0b25JRCA9ICQodGhpcykuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBidXR0b25zIGFuZCBjdXN0b20gaGlnaGxpZ2h0IGp1c3Qgb25lIG9yIG5vbmVcclxuICAgICAgICAgICAgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhY3RpdmUgZm91bmQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpZiAoJChidXR0b24pLmF0dHIoJ2lkJykgPT09IGNsaWNrZWRCdXR0b25JRCAmJiAkKGJ1dHRvbikuaGFzQ2xhc3MoJ2J0bi1wcmltYXJ5JykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLWxlZnQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tcmlnaHQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBhZGQgaGVyZSBhIHJlc2l6ZSBvZiB0aGUgbWFpbiB2aXNcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLmluc2VydEFmdGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSAvLyByZW1vdmUgaGlnaGxpZ2h0XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tbGVmdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1yaWdodCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG93IGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGllcmFyY2h5IGJ1dHRvbiBpbiBuZXR3b3JrIG1vZGFsIG9uIGNoYW5nZVxyXG4gICAgICogTG9hZCBkYXRhIG9yIHJlbW92ZSBpdFxyXG4gICAgICovXHJcbiAgICAkKCcuaGllYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gJCh0aGlzKS5maW5kKCdpbnB1dDpoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gY2hlY2tib3guYXR0cignZGF0YScpO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2hlY2tib3guYXR0cignbmFtZScpO1xyXG4gICAgICAgIGxldCBjaGVja2VkID0gY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGFkZEhpZXJhcmNoeUJ1dHRvbihpZCwgbmFtZSk7XHJcbiAgICAgICAgICAgIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKTtcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01heCBudW1iZXIgb2YgaGllcmFyY2hpZXMgaXM6ICcgKyBtYXhOdW1iZXJIaWVyYXJjaGllcyk7XHJcbiAgICAgICAgLy9UT0RPIGltcGxlbWVudCB0aGlzIGhlcmVcclxuICAgICAgICAvLyBub3RpY2UgdXNlciB0aGF0IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBzaG93IG1vcmUgdGhhbiBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLy8gICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAvLyAgIDxzdHJvbmc+SW5mbyE8L3N0cm9uZz4gQXR0ZW50aW9uIHVzZXIgLlxyXG4gICAgICAgIC8vIDwvZGl2PlxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdG1wIHZhcmlhYmxlIHRvIHNhdmUgaWYgdGhlIGJ1dHRvbiB3aGljaCBpcyBnb2luZyB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIC8vIHdhcyBhY3RpdmVcclxuICAgICAgICAgICAgbGV0IHRtcEFjdGl2ZSA9ICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5oYXNDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgc2V0SGllcmFyY2h5RGF0YSh7fSwgaWQpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBmaW5kIGJldHRlciB3YXkgaGVyZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2cuaCcgKyBpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZGVuZHJvZ3JhbSBhbmQgdGhlIHBhbmVsIGlmIHRoZSByZW1vdmVkIGVsZW1lbnQgd2FzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKHRtcEFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNpemUgdGhlIG1haW4gc3ZnXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbGl6ZSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjaG9vc2VuIGhpZXJhcmNoeVxyXG4gICAgICovXHJcbiAgICAkKCcubmV0d29yay1oaWVyYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmZvIGZvciB0aGUgY2xpY2tlZCBidXR0b25cclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpO1xyXG4gICAgICAgIGxldCBpZCA9IGNoZWNrYm94LmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBsZXQgY2hlY2tlZCA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgYWxsIHRoZSBvdGhlciBhY3RpdmUgY2hlY2tib3hlc1xyXG4gICAgICAgICQoJy5uZXR3b3JrLWhpZXJhcmNoeS1jaGVja2JveCcpLmVhY2goZnVuY3Rpb24oaSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2NoZWNrZWQnKSAmJiAkKHRoaXMpLmZpbmQoJ2lucHV0OmhpZGRlbicpLnByb3AoJ2RhdGEnKSAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICQoYnV0dG9uKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXR3b3JrIGlkXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkodW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZXJhcmNoeSBzZXQgdGhlb3J5IGJ1dHRvbnMgLSB1bmlvbiwgaW50ZXJzZWN0aW9uLCBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICovXHJcbiAgICAkKCcuc2V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBzZXRTZXRPcGVyYXRpb24oZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gPSA7XHJcblxyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCBwbGF5IGJvb2xlYW5cclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIHBhdXNlIChmYWxzZSkgb3IgcGxheSAodHJ1ZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRQbGF5Qm9vbGVhbih2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saXN0ZW5lci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIHBhcmFtZXRlcnMqL1xyXG5pbXBvcnQge1xyXG4gICAgc2V0SW5kZXhUaW1lLFxyXG4gICAgYW5pbWFsX2lkc1xyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldFxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXNMaW5lQ2hhcnRcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuZXhwb3J0IGxldCB6b29tRnVuY3Rpb247XHJcbmV4cG9ydCBsZXQgbGluZUNoYXJ0UmF0aW8gPSAwO1xyXG5cclxubGV0IHRyZW5kQ2hhcnRzWm9vbSA9IHt9O1xyXG5sZXQgdHJlbmRDaGFydHNFbGVtID0gWydsb3dlci1vdXRlci1hcmVhJywgJ2xvd2VyLWlubmVyLWFyZWEnLCAnbWVkaWFuLWxpbmUnLCAndXBwZXItaW5uZXItYXJlYScsICd1cHBlci1vdXRlci1hcmVhJ107XHJcbmxldCBsaW5lQ2hhcnRXaWR0aCA9IDUwMDA7XHJcbmxldCByYXRpbyA9IDE7XHJcbmxldCB6b29tR3JvdXA7XHJcbmxldCB4O1xyXG5sZXQgeTtcclxuXHJcbi8qKlxyXG4gKiBpbml0IHRoZSBsaW5lIGNoYXJ0IGFuZCBhbHNvIHRoZSB0cmVuZCBjaGFydFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVDaGFydCgpIHtcclxuXHJcbiAgICB6b29tRnVuY3Rpb24gPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgc3dhcm1EYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBzd2FybURhdGEubGVuZ3RoXSk7XHJcblxyXG4gICAgbGluZUNoYXJ0UmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAvLyBTd2FybSBmZWF0dXJlcyBsaW5lIGNoYXJ0XHJcbiAgICBsZXQgbGluZUNoYXJ0SGVpZ2h0ID0gNTAwOyAvLyB0aGUgbGluZSBjaGFydCBoZWlnaHRcclxuICAgIGxldCBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiAxMCxcclxuICAgICAgICByaWdodDogMCxcclxuICAgICAgICBib3R0b206IDEwMCxcclxuICAgICAgICBsZWZ0OiAxMFxyXG4gICAgfTtcclxuICAgIGxldCBtYXJnaW5Ub0xlZ2VuZCA9IDUwO1xyXG5cclxuICAgIGxldCBzd2FybV9mZWF0dXJlcyA9IE9iamVjdC5rZXlzKHN3YXJtRGF0YVswXSk7XHJcbiAgICAvLyByZW1vdmUgdGhlIHRpbWUga2V5XHJcbiAgICBsZXQgaW5kZXggPSBzd2FybV9mZWF0dXJlcy5pbmRleE9mKCd0aW1lJyk7XHJcbiAgICBzd2FybV9mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcuZmVhdHVyZS1jaGVjay1ib3gnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJmZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGxpbmUtY2hhcnQtY2hlY2stYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArIGBcIiBjbGFzcz1cImxpbmVDaGFydEJ1dHRvblwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArIGA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgLy8gYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSBzd2FybSBkYXRhIHRvIGxpbmVDaGFydFdpZHRoIHBvaW50cyBpbiB0aGUgbGluZSBjaGFydFxyXG4gICAgaWYgKHN3YXJtRGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIHJhdGlvID0gTWF0aC5jZWlsKHN3YXJtRGF0YS5sZW5ndGggLyBsaW5lQ2hhcnRXaWR0aCk7XHJcbiAgICAgICAgLy8gdG1wIGFycmF5IGZvciB0aGUgYWdncmVnYXRlZCBhbmQgYXZlcmFnZWQgZmVhdHVyZXNcclxuICAgICAgICBsZXQgdG1wID0gbmV3IEFycmF5KHN3YXJtX2ZlYXR1cmVzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYWdncmVnYXRlIHRoZSBmZWF0dXJlcyBpbiB0aGUgdGVtcCBhcnJheVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBbal0gKz0gc3dhcm1EYXRhW2ldW3N3YXJtX2ZlYXR1cmVzW2pdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmF0aW8gaXMgemVybyB0aGVuIGF2ZXJhZ2UgaXQgYW5kIHNldCBpdCB0byB6ZXJvXHJcbiAgICAgICAgICAgIGlmIChpICUgcmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBfb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0aW1lJzogaSAvIHJhdGlvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB0bXBfb2JqZWN0W3N3YXJtX2ZlYXR1cmVzW2pdXSA9IHRtcFtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lQ2hhcnREYXRhLnB1c2godG1wX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsaW5lQ2hhcnREYXRhID0gc3dhcm1EYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8geCBheGlzIHNjYWxlIC0gbWludXMgbWFyZ2luTGluZUNoYXJ0ICBuZWVkZWRcclxuICAgIHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxyXG4gICAgICAgIC5yYW5nZShbbGluZUNoYXJ0SGVpZ2h0LCAwXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KVxyXG4gICAgICAgIC50aWNrcygwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IGRyYWdnZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkcmFnZ2VkIGZ1bmN0aW9uIGdldCB0aGUgY29vcmRpbmF0ZXMgYW5kIGNhbGN1bGF0ZSB0aGUgdGltZSBtb21lbnQgZnJvbSB0aGlzXHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMpO1xyXG4gICAgICAgIGlmIChjb29yZHNbMF0gPCBtYXJnaW4ubGVmdCB8fCBjb29yZHNbMF0gPiBsaW5lQ2hhcnRXaWR0aCB8fCBjb29yZHNbMV0gPCAwIHx8IGNvb3Jkc1sxXSA+IGxpbmVDaGFydEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRtcCBzY2FsZSB0byBpbmNsdWRlIHRoZSB6b29tIGZhY3RvclxyXG4gICAgICAgIGxldCB0bXBTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbih6b29tRnVuY3Rpb24ucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKHpvb21GdW5jdGlvbi5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgdGltZVxyXG4gICAgICAgIHNldEluZGV4VGltZShNYXRoLmZsb29yKCh0bXBTY2FsZShjb29yZHNbMF0gLSBtYXJnaW4ubGVmdCkpICogcmF0aW8pKTtcclxuICAgIH07XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICB6b29tRnVuY3Rpb24gPSB4LmRvbWFpbih0LnJlc2NhbGVYKHgyKS5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIC8vIHpvb20gZWFjaCBhdmFpYWJsZSBsaW5lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBsaW5lcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXAuc2VsZWN0KCgnIycgKyBrZXkgKyAnTGluZScpKS5hdHRyKCdkJywgbGluZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gem9vbSB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0cmVuZENoYXJ0c1pvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0c1pvb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgoJyMnICsga2V5ICsgJ1RyZW5kQ2hhcnQgLicgKyB0cmVuZENoYXJ0c0VsZW1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0cmVuZENoYXJ0c1pvb21ba2V5XVt0cmVuZENoYXJ0c0VsZW1baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3ZnIHJlc2l6YWJsZVxyXG4gICAgbGV0IHN3YXJtTGluZUNoYXJ0ID0gZDMuc2VsZWN0KCcjc3dhcm0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzLWxpbmUtY2hhcnQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGxpbmVDaGFydEhlaWdodCArICcpJylcclxuICAgICAgICAuY2FsbCh4QXhpcyk7XHJcblxyXG4gICAgLy8gYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSB5IGF4aXNcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMtbGluZS1jaGFydCcpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuXHJcbiAgICAvLyB0aGUgdGltZSBsaW5lIGFwcGVuZCB0aGUgbGluZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbWUtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAuYXR0cigneDEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gyJywgMClcclxuICAgICAgICAuYXR0cigneTInLCBsaW5lQ2hhcnRIZWlnaHQpO1xyXG5cclxuICAgIC8vICoqXHJcbiAgICAvLyBjb2xvcnMgZm9yIHRoZSBsaW5lc1xyXG4gICAgbGV0IGxpbmVfY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xyXG4gICAgbGV0IGxpbmVzID0ge307XHJcbiAgICAvLyBhZGQgdGhlIGxpbmVzIHRvIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbihsaW5lQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkW3N3YXJtX2ZlYXR1cmVzW2ldXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWF4ID0gZDMubWF4KGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbm9ybWFsaXphdGlvblNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oW21pbiwgbWF4XSkucmFuZ2UoWzAsIDEwMF0pO1xyXG4gICAgICAgIGxldCBsaW5lID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4KGRbJ3RpbWUnXSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW3N3YXJtX2ZlYXR1cmVzW2ldXSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsaW5lc1tzd2FybV9mZWF0dXJlc1tpXV0gPSBsaW5lO1xyXG4gICAgICAgIC8vYXBwZW5kIHRoZSBsaW5lIHRvIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICAgICAgem9vbUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtsaW5lQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgKHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUgbGluZUNoYXJ0TGluZScpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgbGluZV9jb2xvcnMoaSkpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSlcclxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCBzd2FybV9mZWF0dXJlc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAvLyBhcHBlbmQgdGhlIHpvb20gcmVjdGFuZ2xlXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGluZUNoYXJ0V2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxpbmVDaGFydEhlaWdodClcclxuICAgICAgICAuY2FsbCh6b29tKVxyXG4gICAgICAgIC5vbignY2xpY2snLCBkcmFnZ2VkKVxyXG4gICAgICAgIC5jYWxsKGQzLmRyYWcoKVxyXG4gICAgICAgICAgICAub24oJ2RyYWcnLCBkcmFnZ2VkKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBsZWdlbmQgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSAxMDA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgLy9zZWxlY3QgYWxsIHRoZSBsaW5lc1xyXG4gICAgbGV0IGNoYXJ0TGluZXMgPSBkMy5zZWxlY3RBbGwoJy5saW5lJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgYSBncm91cCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKGNoYXJ0TGluZXMuX2dyb3Vwc1swXSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSB3aG9sZSBsZWdlbmQgaW4gYSBlYWNoIGZ1bmN0aW9uXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc3BhY2luZyA9IDYwMDtcclxuICAgICAgICAgICAgbGV0IHRleHRTcGFjZSA9IDQwO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHJlY3RhbmdsZXMgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkLnN0eWxlLnN0cm9rZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHRleHQgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnTGVnZW5kVGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICsgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGQuYXR0cmlidXRlcy5uYW1lLnZhbHVlICsgJzogJyk7XHJcblxyXG4gICAgICAgICAgICAvL2FwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIHZhbHVlIG9mIHRoZSBsaW5lXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ1ZhbHVlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBleHByZXNzaW9uIGdldHMgdGhlIHRleHQgbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjJyArIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpLm5vZGUoKS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KCcwLjAnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGxlZ2VuZCBncm91cCBmb3IgdGhlIHRyZW5kIGNoYXJ0c1xyXG4gICAgc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAndHJlbmRDaGFydExlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5ib3R0b20gKyAnLCcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luVG9MZWdlbmQpICsgJyknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShbJzUlIC0gOTUlJywgJzI1JSAtIDc1JScsICdNZWRpYW4nXSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSB3aG9sZSBsZWdlbmQgaW4gYSBlYWNoIGZ1bmN0aW9uXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc3BhY2luZyA9IDgwMDtcclxuICAgICAgICAgICAgbGV0IHRleHRTcGFjZSA9IDQwO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHJlY3RhbmdsZXMgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyM3NGE5Y2YnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyMwNDVhOGQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzUyNTI1Mic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHRleHQgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbGluZSBjaGFydCBidXR0b24gbGlzdGVuZXJzXHJcbiAgICAgKi9cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAkKCgnI2RyYXdTd2FybScgKyBzd2FybV9mZWF0dXJlc1tpXSkpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgoJyNkcmF3U3dhcm0nICsgc3dhcm1fZmVhdHVyZXNbaV0pKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCgoJyMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoKCcjJyArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbi8qKlxyXG4gKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICovXHJcbiQoJy5kcmF3LWRldGFpbHMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICBkaXNhYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgYWRkVHJlbmRDaGFydCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVtb3ZlVHJlbmRDaGFydCgpO1xyXG4gICAgICAgIGVuYWJsZUxpbmVDaGFydCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICovXHJcbmZ1bmN0aW9uIGRpc2FibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnLmxpbmUtY2hhcnQtY2hlY2stYm94JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkKCcubGluZUNoYXJ0TGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICovXHJcbmZ1bmN0aW9uIGVuYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIHRoZSB0cmVuZCBjaGFydFxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlVHJlbmRDaGFydCgpIHtcclxuICAgICQoJy50cmVuZENoYXJ0RGF0YScpLmhpZGUoKTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI2xpbmVDaGFydExlZ2VuZCcpLnNob3coKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIHRyZW5kIGNoYXJ0IHNob3dpbmcgbWVkaWFuIGFuZCBwZXJjZW50aWxlc1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gZWxlbSAtIHdoaWNoIGZlYXR1cmVcclxuICovXHJcbmZ1bmN0aW9uIGFkZFRyZW5kQ2hhcnQoZWxlbSkge1xyXG4gICAgLy8gY2hlY2sgd2hpY2ggZmVhdHVyZSB0byBkaXNwbGF5IGluIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgbGV0IGZlYXR1cmUgPSAnJztcclxuICAgIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NwZWVkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ3NwZWVkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhY2NlbGVyYXRpb24nKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnYWNjZWxlcmF0aW9uJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdkaXN0YW5jZS1jZW50cm9pZCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdkaXN0YW5jZV9jZW50cm9pZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNldGlsZXMgZm9yIGV2ZXJ5IHRpbWUgc3RlcFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXNMaW5lQ2hhcnQodG1wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSB0cmVuZENoYXJ0RGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwodHJlbmRDaGFydERhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2dyZWdhdGVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRyZW5kQ2hhcnREYXRhW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZGl2aWRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICB0bXBUcmVuZENoYXJ0RGF0YS5wdXNoKHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhID0gdG1wVHJlbmRDaGFydERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBtaW4gYW5kIG1heCBmb3IgdGhlIG5vcm1hbGl6YXRpb25cclxuICAgICAgICBsZXQgbWluID0gZDMubWluKHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgodHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbNF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCB0cmVuZENoYXJ0ID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyZW5kQ2hhcnREYXRhJyk7XHJcbiAgICAgICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZSBhZ2FpbiB0byB0aGUgZW5kIG9mIHRoZSBncm91cFxyXG4gICAgICAgICQoJy56b29tJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgLy8gdmFyIHRvIHNhdmUgdGhlIGZ1bmN0aW9ucyBmb3IgdGhlIHpvb21cclxuICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV0gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIGZvciB0aGUgdXBwZXIgYW5kIGlubmVyIGFyZWFzIGFuZCB0aGUgbWVkaWFuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBsb3dlciBvdXRlciBhcmVhIGFuZCBsb3dlciBpbm5lciBhcmVhXHJcbiAgICAgICAgICAgIGlmIChpIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSArIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtZWRpYW4gbGluZVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1cHBlciBpbm5lciBhcmVhIGFuZCB1cHBlciBvdXRlciBhcmVhXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSAtIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNhdmUgdGhpcyBmb3IgdGhlIGxhdGVyIHpvb21cclxuICAgICAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdW3RyZW5kQ2hhcnRzRWxlbVtpXV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhdGhcclxuICAgICAgICAgICAgdHJlbmRDaGFydC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoW3RyZW5kQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHRyZW5kQ2hhcnRzRWxlbVtpXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBzaG93IHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICQoKCcjJyArIGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGluZV9jaGFydC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmVhdHVyZXMgY2hlY2tib3ggYW5kIHJhZGlvIGJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggZGl2IHtcXHJcXG4gICAgY2xlYXI6IGJvdGg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBsYWJlbCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5LCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xcclxcbiAgICB0ZXh0LWluZGVudDogM2VtO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICB3aWR0aDogMi41ZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogI0MyQzJDMjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjNzc3O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4ICM5OTk7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogU1ZHIGVsZW1lbnRzIGFuZCB0ZXh0ICovXFxyXFxuXFxyXFxuI21haW4tdmlzIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxyXFxufVxcclxcblxcclxcbiNtYWluLXZpcy1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQtZGl2IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZCB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNoaWVyYXJjaHktbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG4gICAgdG9wOiAxMHB4O1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1saW5lLWNoYXJ0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTclO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5zdmctZGVuZHJvZ3JhbS1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgcGF0aCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5heGlzIGxpbmUge1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4zO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi54IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi55IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5heGlzLWxpbmUtY2hhcnQgcGF0aCBsaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi5saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRpbWUgICovXFxyXFxuXFxyXFxuLmZyYW1lLXRleHQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTbGlkZXIgdGlja3MgICovXFxyXFxuXFxyXFxuLnVpLXNsaWRlci10aWNrIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjMzM3YWI3O1xcclxcbiAgICBoZWlnaHQ6IDAuOGVtO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbi8qIExhb2RpbmcgZ2lmICAgKi9cXHJcXG5cXHJcXG4jbG9hZGluZyB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGxlZ2VuZCAgICAqL1xcclxcblxcclxcbi5sZWdlbmQge1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZ2VuZC10ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi50aW1lLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKnN3YXJtIGZlYXR1cmVzICovXFxyXFxuXFxyXFxuLmNlbnRyb2lkIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkb2lkIHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmh1bGwtcGF0aCB7XFxyXFxuICAgIGZpbGw6ICNmZmY7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5oaWVyYXJjaHktZ3JvdXAge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDEwO1xcclxcbiAgICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xcclxcbiAgICBvcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi5kZWxhdW5heS10cmlhbmd1bGF0aW9uIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNDtcXHJcXG59XFxyXFxuXFxyXFxuLmdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGUge1xcclxcbiAgICAtYW5pbWF0aW9uOiBzcGluIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluMiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbn1cXHJcXG5cXHJcXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbjIge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5idG4ge1xcclxcbiAgICBib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5hY3RpdmUgc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkxIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Q5ZDlkOTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MiB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5Njk2OTY7XFxyXFxufVxcclxcblxcclxcbiNidG4tZGFyayB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM0ZDRkNGQ7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGJyZXdlciBwaWNrZXIgZGl2ICovXFxyXFxuXFxyXFxuLnBhbGV0dGUge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcclxcbiAgICBtYXJnaW46IDRweCAwIDRweCA0cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNhYWE7XFxyXFxufVxcclxcblxcclxcbi5zd2F0Y2gge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIHdpZHRoOiAyMnB4O1xcclxcbiAgICBoZWlnaHQ6IDIycHg7XFxyXFxufVxcclxcblxcclxcbi52b3Jvbm9pIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDZweCAwO1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQyOTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUuYnRuLWxnIHtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgcGFkZGluZzogMTNweCAxM3B4O1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjMzO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUb29sdGlwICovXFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAge1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjMWI4MDllICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XFxyXFxuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB0YWJsZSB0ZDpudGgtY2hpbGQoMikge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4udG9vbHRpcC1zcGFuIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1jaGVjay1ib3guZGlzYWJsZWQge1xcclxcbiAgICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyLW91dGVyLWFyZWEsIC5sb3dlci1vdXRlci1hcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjNzRhOWNmO1xcclxcbiAgICBzdHJva2U6ICMzNjkwYzA7XFxyXFxufVxcclxcblxcclxcbi51cHBlci1pbm5lci1hcmVhLCAubG93ZXItaW5uZXItYXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzA0NWE4ZDtcXHJcXG4gICAgc3Ryb2tlOiAjMDIzODU4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFuLWxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICM1MjUyNTI7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk5OTtcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgIzRkNGQ0ZDtcXHJcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLnpvb20ge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4ueC5heGlzLWxpbmUtY2hhcnQ+Zz50ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3Qge1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQge1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IHRoaWNrIHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgc3BhbiB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlcjogdGhpY2sgc29saWQgd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgbWFyZ2luLXRvcDogLTYwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODYwOTA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgaDIge1xcclxcbiAgICBtYXJnaW4tdG9wOiA3cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAudDIgLm1vZC1oZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5jbG9zZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWhlYWRlciB7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZTVlNWU1O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI21ldGFkYXRhLWlucHV0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQge1xcclxcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIGxpIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCBzcGFuIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzY2NjtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmJsLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZmM5N2Y7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGMwODY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmFiLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODZjYjA7XFxyXFxufVxcclxcblxcclxcbi5uZXR3b3JrLWVkZ2VzIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxufVxcclxcblxcclxcbi5ub2RlIHRleHQge1xcclxcbiAgICBmb250OiAxMnB4IHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbi5ub2RlLS1pbnRlcm5hbCB0ZXh0IHtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4IDAgI2ZmZiwgMCAtMXB4IDAgI2ZmZiwgMXB4IDAgMCAjZmZmLCAtMXB4IDAgMCAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluayB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzYzNjM2MztcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3gge1xcclxcbiAgICBtaW4taGVpZ2h0OiAxcmVtO1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbmRpY2F0b3Ige1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MTgxODE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4zcyBlYXNlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW46IDAgMTZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogMThweDtcXHJcXG4gICAgaGVpZ2h0OiAxOHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcXHJcXG4gICAgbGVmdDogLTJweDtcXHJcXG4gICAgdG9wOiAtNHB4O1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxuICAgIHRyYW5zaXRpb246IGxlZnQgLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgLjFzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWR+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4NGM3YzE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZH4uY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yOmFmdGVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg0YzdjMTtcXHJcXG4gICAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXN+LmN1c3RvbS1jb250cm9sLWluZGljYXRvciB7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2FjdGl2ZS1uZXR3b3JrLW5hbWUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICMyOTYyOTI7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUtbGV2ZWwge1xcclxcbiAgICBmaWxsOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmVcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZ2hsaWdodC1oaWVyYXJjaHkge1xcclxcbiAgICBmaWxsOiAjMjUyNTI1O1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTA7XFxyXFxuICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYgLmJ0biBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IC5idG4uYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5pbnRlcnNlY3Rpb24ge1xcclxcbiAgICBmaWxsOiByZWQgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiByZWQ7XFxyXFxufVxcclxcblxcclxcbi5zeW0tZGlmZmVyZW5jZSB7XFxyXFxuICAgIGZpbGw6IHJlZCAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6IHJlZDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9