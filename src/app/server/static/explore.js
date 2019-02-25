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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata_js__ = __webpack_require__(7);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["h" /* removeHierarchyLevel */])(network_id);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["g" /* removeHierarchyColor */])(network_id);
    } // add it to the network hierarchy
    else {
        networkHierarchy['h' + network_id] = value;
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["k" /* setHierarchyLevel */])(network_id, 2);
        Object(__WEBPACK_IMPORTED_MODULE_2__hierarchy_js__["j" /* setHierarchyColor */])(network_id);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interaction_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__ = __webpack_require__(12);
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
// let networkBakData = {};

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
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["c" /* initTooltip */])();
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["b" /* initSliders */])();
    Object(__WEBPACK_IMPORTED_MODULE_8__legend_js__["a" /* addSpatialViewGroup */])();
    Object(__WEBPACK_IMPORTED_MODULE_6__color_picker_js__["b" /* initColorPicker */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["b" /* lineChart */])();
    Object(__WEBPACK_IMPORTED_MODULE_7__listener_js__["a" /* initListeners */])();
    Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["d" /* initDendrogram */])();
    Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["e" /* makeResizable */])(tankHeight, tankWidth);
    Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["b" /* defaultConfig */])();
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
            // let networkVisBak;
            if (indexTime in __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"]) {
                let network = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkData"][indexTime];
                // reset the group standard deviation for the hierarhcy
                // needed for coloring of the dendrogram nodes (variacne)
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["i" /* resethierarchyGroupStdev */])();

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
                    $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']));
                    $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])(d['val']));
                });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["b" /* networkAuto */]) {
                    let tmpArray = [];
                    for (let i = 0; i < network.length; i++) {
                        tmpArray.push(network[i]['val']);
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["f" /* setNetworLimit */])(Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* percentiles */])(tmpArray));
                }
                network = network.filter(function(d) {
                    return d['val'] <= (1 - __WEBPACK_IMPORTED_MODULE_1__network_js__["e" /* networkLimit */]);
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */])((1 - d['val']));
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
                    .select('#vornoi-group')
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return networkLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return showNetworkHierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return networkColor; });
/* unused harmony export networkID */
/* unused harmony export networkBackground */
/* unused harmony export networkBackgroundLimit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["g"] = setNetworkAuto;
/* harmony export (immutable) */ __webpack_exports__["f"] = setNetworLimit;
/* harmony export (immutable) */ __webpack_exports__["j"] = setNetworkHierarchy;
/* harmony export (immutable) */ __webpack_exports__["k"] = setNetworkID;
/* harmony export (immutable) */ __webpack_exports__["l"] = setnetworkColor;
/* harmony export (immutable) */ __webpack_exports__["h"] = setNetworkBackground;
/* harmony export (immutable) */ __webpack_exports__["i"] = setNetworkBackgroundLimit;
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
    ).range(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']);


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
                        '<td>---</td>'
                        // '<td><div class="pretty p-switch p-fill"><input type="checkbox" class="network-hierarchy-checkbox" data="' +
                        // data[i]['network_id'] + '"><div class="state p-success"><label></label></div></div></td>'
                    );
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
    networkLimit = value;
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
        networkColor['h' + network_id] = '#08306b';
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart_js__ = __webpack_require__(9);
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
    $('#g-centroid').hide();
    //check line chart draw all lines
    $('#line-chart-feature-checkboxes input[type=checkbox]')
        .prop('checked', true);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export networkHierarchyIds */
/* unused harmony export hierarchyColors */
/* unused harmony export hierarchyGroupStdev */
/* unused harmony export colors */
/* harmony export (immutable) */ __webpack_exports__["d"] = initDendrogram;
/* harmony export (immutable) */ __webpack_exports__["c"] = drawDendrogram;
/* harmony export (immutable) */ __webpack_exports__["k"] = setHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["h"] = removeHierarchyLevel;
/* harmony export (immutable) */ __webpack_exports__["j"] = setHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeHierarchyColor;
/* harmony export (immutable) */ __webpack_exports__["a"] = addHierarchyButton;
/* harmony export (immutable) */ __webpack_exports__["f"] = removeHierarchyButton;
/* unused harmony export updateDendrogram */
/* harmony export (immutable) */ __webpack_exports__["b"] = changeHierarchyLegend;
/* harmony export (immutable) */ __webpack_exports__["l"] = setSetOperation;
/* unused harmony export sethierarchyGroupStdev */
/* harmony export (immutable) */ __webpack_exports__["i"] = resethierarchyGroupStdev;
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
/* harmony export (immutable) */ __webpack_exports__["e"] = maxNumberHierarchies;

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
        if (__WEBPACK_IMPORTED_MODULE_2__network_js__["m" /* showNetworkHierarchy */] === hierarchyIds[i]) {
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorScale; });
/* harmony export (immutable) */ __webpack_exports__["c"] = returnColorScale;
/* harmony export (immutable) */ __webpack_exports__["b"] = initColorPicker;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__legend_js__ = __webpack_require__(5);
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
/* 7 */
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
/* 8 */
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
    Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["k" /* setNetworkID */])(network_id);
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playBoolean; });
/* harmony export (immutable) */ __webpack_exports__["a"] = initListeners;
/* harmony export (immutable) */ __webpack_exports__["c"] = setPlayBoolean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visual_parameter_js__ = __webpack_require__(12);
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
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["h" /* setNetworkBackground */])(true);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["h" /* setNetworkBackground */])(false);
        }
    });

    /**
     * Set the network background edge limit
     */
    $('#network-background-limit').val(1);
    $('#network-background-limit').on('change', function() {
        let val = $(this).val();
        if ($.isNumeric(val) && val > 0) {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["i" /* setNetworkBackgroundLimit */])(val);
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
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["l" /* setnetworkColor */])(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["k" /* setNetworkID */])(-1);
        // remove the network color
        Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["l" /* setnetworkColor */])(-1);
        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["g" /* setNetworkAuto */])(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["g" /* setNetworkAuto */])(false);
            let limit = $('#network-slider').slider('value');
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["f" /* setNetworLimit */])(limit);
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
                Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["c" /* drawDendrogram */])();
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

        if (checked && $('.show-dendrogram').length < __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["e" /* maxNumberHierarchies */]) {
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

            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["f" /* removeHierarchyButton */])(id);
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
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["j" /* setNetworkHierarchy */])(checkbox.attr('data'));
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_5__network_js__["j" /* setNetworkHierarchy */])(undefined);
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
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["d" /* decIndexTime */]();
            __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__["e" /* draw */]();
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
                __WEBPACK_IMPORTED_MODULE_2__network_js__["f" /* setNetworLimit */](ui.value);
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
/* 12 */
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
exports.push([module.i, "/* Icons for bootstrap 4 */\r\n\r\n.mdi::before {\r\n    font-size: 24px;\r\n    line-height: 14px;\r\n}\r\n\r\n.btn .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.btn-xs .mdi::before {\r\n    font-size: 18px;\r\n    top: 3px;\r\n}\r\n\r\n.btn-sm .mdi::before {\r\n    font-size: 18px;\r\n    top: 3px;\r\n}\r\n\r\n.dropdown-menu .mdi {\r\n    width: 18px;\r\n}\r\n\r\n.dropdown-menu .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    left: -8px;\r\n}\r\n\r\n.nav .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.navbar .navbar-toggle .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    color: #FFF;\r\n}\r\n\r\n.breadcrumb .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n}\r\n\r\n.breadcrumb a:hover {\r\n    text-decoration: none;\r\n}\r\n\r\n.breadcrumb a:hover span {\r\n    text-decoration: underline;\r\n}\r\n\r\n.alert .mdi::before {\r\n    position: relative;\r\n    top: 4px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.input-group-addon .mdi::before {\r\n    position: relative;\r\n    top: 3px;\r\n}\r\n\r\n.navbar-brand .mdi::before {\r\n    position: relative;\r\n    top: 2px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.list-group-item .mdi::before {\r\n    position: relative;\r\n    top: 3px;\r\n    left: -3px\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n#main-vis {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n#main-vis-legend-div {\r\n    display: none;\r\n}\r\n\r\n#hierarchy-legend-div {\r\n    display: none;\r\n}\r\n\r\n#main-vis-legend {\r\n    float: right;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n#hierarchy-legend {\r\n    float: left;\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: visible;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-content-dendrogram {\r\n    display: inline-block;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-line-chart-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogram-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axis-line-chart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frame-text {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legend-text {\r\n    font-size: 1.2em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.line-chart-legend-text {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.time-line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hull-path {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.hierarchy-group {\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.2;\r\n}\r\n\r\n.delaunay-triangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.tooltip-span {\r\n    display: block;\r\n    width: 150px;\r\n    word-wrap: break-word;\r\n    font-size: 1.5em;\r\n}\r\n\r\n.upper-outer-area, .lower-outer-area {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upper-inner-area, .lower-inner-area {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.median-line {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axis-line-chart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.network-edges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.network-background-edges {\r\n    fill-opacity: 0;\r\n    stroke-opacity: 0.25;\r\n    stroke: #737373;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n#active-network-name {\r\n    font-weight: bold;\r\n    color: #296292;\r\n}\r\n\r\n.active-level {\r\n    fill: #386cb0;\r\n}\r\n\r\n#dendrogram-panel {\r\n    position: initial;\r\n}\r\n\r\n#dendrogram-panel {\r\n    display: none\r\n}\r\n\r\n.show-dendrogram {\r\n    float: right;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.show-dendrogram:hover {\r\n    background: #D1D3D4;\r\n}\r\n\r\n.dendrogram-text {\r\n    font-size: 10em !important;\r\n}\r\n\r\n.highlight-hierarchy {\r\n    fill: #252525;\r\n    stroke: #252525;\r\n    stroke-width: 10;\r\n    stroke-linejoin: round;\r\n    opacity: 0.3;\r\n}\r\n\r\n.animal-highlight {\r\n    fill: #c51b7d !important;\r\n}\r\n\r\n#dendrogram-buttons-div .btn span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#dendrogram-buttons-div .btn.active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#dendrogram-buttons-div {\r\n    border: 2px solid #D1D3D4;\r\n    border-radius: 5px;\r\n}\r\n\r\n#dendrogram-legend {\r\n    margin-left: 20px;\r\n}\r\n\r\n.intersection {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.sym-difference {\r\n    fill: url(#striped) !important;\r\n    stroke: #67000d;\r\n}\r\n\r\n.modal-lg {\r\n    max-width: 80%;\r\n}\r\n\r\n.background-image {\r\n    background: #fff;\r\n}", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWExMjBkMzZlMGQ5Y2RhZWIzYjQiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3Zpc3VhbF9wYXJhbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcz9kZTRjIiwid2VicGFjazovLy8uL2V4cGxvcmUvZXhwbG9yZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxtQ0FBbUMsb0JBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtHQUFrRTs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsdkJBO0FBQUE7QUFDQTtBQUtDOzs7O0FBSUQsd0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEhBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUlBO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL01BO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQVFBOztBQUtBOztBQUlBOztBQUVELGNBQWM7QUFDZDtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUVBQXNCO0FBQzdDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0EsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDRCQUE0QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pqQkE7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7O0FBSUM7O0FBS0E7O0FBSUE7O0FBTUE7OztBQVdBOztBQVFBOztBQU9BOztBQUlBOztBQVFBOztBQU1BOztBQUVELFVBQVU7QUFDVix1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FB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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6ImV4cGxvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1YTEyMGQzNmUwZDljZGFlYjNiNCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQgKi9cclxuLy8gaW1wb3J0IGFsbCBqc1xyXG5pbXBvcnQgKiBhcyBxdWVyaWVzIGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplTWV0YWRkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0SGllcmFyY2h5TGV2ZWwsXHJcbiAgICByZW1vdmVIaWVyYXJjaHlMZXZlbCxcclxuICAgIHNldEhpZXJhcmNoeUNvbG9yLFxyXG4gICAgcmVtb3ZlSGllcmFyY2h5Q29sb3IsXHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmRcclxufSBmcm9tICcuL2hpZXJhcmNoeS5qcyc7XHJcblxyXG4vLyBpbXBvcnQgY3NzXHJcbmltcG9ydCAnLi9leHBsb3JlLmNzcyc7XHJcblxyXG5leHBvcnQgbGV0IGRhdGFzZXQgPSBbXTsgLy8gbWFpbiBkYXRhc2V0IHdpdGggdmFsdWVzIGZvciBlYWNoIGluZGl2aWR1YWwgYW5pbWFsXHJcbmV4cG9ydCBsZXQgZGF0YXNldE1ldGFkYXRhID0gW107IC8vIG1ldGFkYXRhc2V0IGZvciBlYWNoIGluZGl2aWR1YWwgZmlzaFxyXG5leHBvcnQgbGV0IHN3YXJtRGF0YSA9IFtdOyAvLyBzd2FybWRhdGEgZm9yIGxpbmVjaGFydCBhbmQgYWxzbyBvdGhlciBzd2FybSBmZWF0dXJlc1xyXG5leHBvcnQgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0ge307IC8vIHBlY2VudGlsZXMgbmVlZGVkIGZvciB0aGUgY29sb3IgbWFwcGluZ1xyXG5leHBvcnQgbGV0IG5ldHdvcmtEYXRhID0ge307IC8vIG5ldHdvcmsgZGF0YVxyXG5leHBvcnQgbGV0IG5ldHdvcmtIaWVyYXJjaHkgPSB7fTsgLy8gbmV0d29yayBoaWVyYXJjaHkgZGF0YVxyXG5leHBvcnQgbGV0IGFuaW1hbElkcyA9IHt9OyAvLyBkaXN0aW5jdCBhbmltYWwgaWRzXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGJhc2ljIGRhdGEgdG8gZ2V0IHRoZSB0b29sIHJ1bm5pbmcuXHJcbiAqIGFmdGVyIHRoZSBwZW5kaW5nIGFqYXggcXVlcmllcyBhcmUgZmluaXNoZWRcclxuICogdGhlIHRvb2wgaXMgZHJhd25cclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGlzdGluY3QgYW5pbWFsIGlkcyBmb3IgdGhlIHdob2xlIGRhdGFzZXRcclxuICAgIHF1ZXJpZXMuZ2V0QW5pbWFsSWRzKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIHF1ZXJpZXMuZ2V0U3dhcm1GZWF0dXJlcygpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbWV0YWRhdGEgYW5kIGluaXRpYWxpemUgdGhlIG1ldGFkYSB3aW5kb3dcclxuICAgIHF1ZXJpZXMuZ2V0TWV0YURhdGEoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGluZm9ybWF0aW9uIGlmIHRoZXJlIGFyZSBhbHJlYWR5IG5ldHdvcmtzIGNyZWF0ZWQgZm9yIHRoaXMgZGFzdGFzZXRcclxuICAgIHF1ZXJpZXMuZ2V0TmV0d29ya0RhdGFCdXR0b24oKTtcclxufSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBDb25jYWN0IHRvIHRoZSBtYWluIGRhdGFzZXRcclxuICogdGhlIGlkZWEgaXMgdG8gdXNlIHRoaXMgb25lIGRheSBmb3IgbGF6eSBsb2FkaW5nXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXkgb2YgbW92ZW1lbnQgZGF0YXNldHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0RhdGFzZXQodmFsdWUpIHtcclxuICAgIGRhdGFzZXQgPSBkYXRhc2V0LmNvbmNhdCh2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBwZXJjZW50aWxlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXkgb2YgYXJyYXJ5c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFTZXRQZXJjZW50aWxlKHZhbHVlKSB7XHJcbiAgICBkYXRhU2V0UGVyY2VudGlsZSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGRhdGFzZXQgbWV0YWRhdGFcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1ldGFEYXRhKHZhbHVlKSB7XHJcbiAgICBkYXRhc2V0TWV0YWRhdGEgPSB2YWx1ZTtcclxuICAgIC8vIGluaXRpYWxpemUgdGhlIG1ldGFkYXRhIG1vZGFsXHJcbiAgICBpbml0aWFsaXplTWV0YWRkYXRhKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBuZXcgZmVhdHVyZSBkaW1lbnNpb24gdG8gdGhlIHN3YXJtIGRhdGFzZXRcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIHN3YXJtIHZhbHVlcyBjb25zaXN0aW5nIG9mIFtmZWF0dXJlXzAsZmVhdHVyZV8xLC4uLl1cclxuICogQHBhcmFtIHtzdHJpbmd9IGZlYXR1cmUgLSBzdHJpbmcgYXJyYXkgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gYWRkIHRoZSB0aGUgb2JqZWN0IHRvIHRoZSBhcnJheSBpZiB0aGVyZSBpcyBubyBlbGVtZW50IHlldFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3dhcm1EYXRhW2ldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBzd2FybURhdGEucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBpbnRlZ2VyIG9yIGZsb2F0XHJcbiAgICAgICAgaWYgKGRhdGFbaV0gJiYgIShpc05hTihkYXRhW2ldKSkpIHtcclxuICAgICAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHN3YXJtRGF0YVtpXVtmZWF0dXJlXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgZmVhdHVyZXMgdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCwgZmVhdHVyZV8xLC4uLl1cclxuICogQHBhcmFtIHtzdHJpbmd9IGZlYXR1cmUgLSBzdHJpbmcgYXJyYXkgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBhZGQgdGhlIHRoZSBvYmplY3QgdG8gdGhlIGFycmF5IGlmIHRoZXJlIGlzIG5vIGVsZW1lbnQgeWV0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhc2V0W2ldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkYXRhc2V0LnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwYXJzZSB0aGUgaW50XHJcbiAgICAgICAgZGF0YXNldFtpXVtmZWF0dXJlXSA9ICtkYXRhW2ldO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIHZhbHVlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gQXJyYXkgb2Ygb2YgYXJyYXlzIHdpdGggYWxsIHZhbHVlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gdGhlIGNhbGN1bGF0ZWQgYWRqYWNlbmN5IG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtEYXRhKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrRGF0YSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGhpZWFyaGN5IHZhbHVlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gQXJyYXkgb2Ygb2YgYXJyYXlzIHdpdGggYWxsIHZhbHVlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggaGllcmFyY2h5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGllcmFyY2h5RGF0YSh2YWx1ZSwgbmV0d29ya19pZCkge1xyXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgZW1wdHkgcmVtb3ZlIHRoZSBlbGVtZW50IGZyb20gdGhlIG5ldHdyb2tIaWVyYXJjaHkgb2JqZWN0XHJcbiAgICBpZiAoT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgZGVsZXRlIG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgbmV0d29ya19pZF07XHJcbiAgICAgICAgcmVtb3ZlSGllcmFyY2h5TGV2ZWwobmV0d29ya19pZCk7XHJcbiAgICAgICAgcmVtb3ZlSGllcmFyY2h5Q29sb3IobmV0d29ya19pZCk7XHJcbiAgICB9IC8vIGFkZCBpdCB0byB0aGUgbmV0d29yayBoaWVyYXJjaHlcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG5ldHdvcmtIaWVyYXJjaHlbJ2gnICsgbmV0d29ya19pZF0gPSB2YWx1ZTtcclxuICAgICAgICBzZXRIaWVyYXJjaHlMZXZlbChuZXR3b3JrX2lkLCAyKTtcclxuICAgICAgICBzZXRIaWVyYXJjaHlDb2xvcihuZXR3b3JrX2lkKTtcclxuICAgIH0gLy8gdG9vIG1hbnkgZWxlbWVudHMgY2FudCBiZSBhZGRlZFxyXG5cclxuICAgIGNoYW5nZUhpZXJhcmNoeUxlZ2VuZCgpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGFuaW1hbCBpZHMgZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBpZHMgLSBBcnJheSBvZiBhbGwgZGlzdGluY3QgYW5pbWFsIGlkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFuaW1hbElkcyh2YWx1ZSkge1xyXG4gICAgYW5pbWFsSWRzID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLGQzLCBwYXJhbWV0ZXJzLCBTZXQgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldCxcclxuICAgIG5ldHdvcmtEYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbmV0d29ya0NvbG9yU2NhbGUsXHJcbiAgICBuZXR3b3JrQXV0byxcclxuICAgIHNldE5ldHdvckxpbWl0LFxyXG4gICAgbmV0d29ya0xpbWl0LFxyXG4gICAgLy8gc2hvd05ldHdvcmtIaWVyYXJjaHksXHJcbiAgICAvLyBuZXR3b3JrSUQsXHJcbiAgICAvLyBuZXR3b3JrQmFja2dyb3VuZCxcclxuICAgIC8vIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXRcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICB1cGRhdGVMaW5lQ2hhcnRcclxufSBmcm9tICcuLi9saW5lX2NoYXJ0JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlcyxcclxuICAgIG1ha2VSZXNpemFibGUsXHJcbiAgICBkZWZhdWx0Q29uZmlnXHJcbn0gZnJvbSAnLi4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VGltZVNsaWRlcixcclxuICAgIGluaXRUb29sdGlwLFxyXG4gICAgdG9vbHRpcEZ1bmN0aW9uLFxyXG4gICAgaW5pdFNsaWRlcnMsXHJcbiAgICB0b29sdGlwXHJcbn0gZnJvbSAnLi9pbnRlcmFjdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbWV0YWRhdGFDb2xvclxyXG59IGZyb20gJy4uL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIsXHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRMaXN0ZW5lcnMsXHJcbiAgICBwbGF5Qm9vbGVhblxyXG59IGZyb20gJy4uL2xpc3RlbmVyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXREZW5kcm9ncmFtLFxyXG4gICAgZHJhd0RlbmRyb2dyYW0sXHJcbiAgICAvLyBuZXR3b3JrSGllcmFyY2h5SWRzLFxyXG4gICAgLy8gc2V0aGllcmFyY2h5R3JvdXBTdGRldixcclxuICAgIHJlc2V0aGllcmFyY2h5R3JvdXBTdGRldlxyXG59IGZyb20gJy4uL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgdHJhY2tpbmdCb29sZWFuLFxyXG4gICAgYWRkVHJhY2tlZERhdGFcclxufSBmcm9tICcuLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IGluZGV4VGltZSA9IDA7IC8vIGFjdHVhbCB0aW1lIG1vbWVudCBpbiB0aGUgYW5pbWF0aW9uXHJcbmV4cG9ydCBsZXQgdGFua1dpZHRoO1xyXG5leHBvcnQgbGV0IHRhbmtIZWlnaHQ7XHJcbmV4cG9ydCBsZXQgYWN0aXZlU2NhbGUgPSAnYmxhY2snOyAvLyBjYW4gYmUgc3BlZWQsIGFjY2VsZXJhdGlvbiwgLi4gYW5kIGJsYWNrIChtZWFuaW5nIG5vIGFjdGl2ZSBzY2FsZSlcclxuZXhwb3J0IGxldCBtZWRvaWRBbmltYWwgPSAtMTsgLy8gd2hpY2ggYW5pbWFsIGlzIHRoZSBtZWRvaWQgKC0xIGlzIG5vIGFuaW1hbClcclxuZXhwb3J0IGxldCBhY3RpdmVBbmltYWxzID0gW107IC8vIGFjdGl2ZSBzZWxlY3RlZCBhbmltYWxzXHJcbmV4cG9ydCBsZXQgYXJyYXlBbmltYWxzOyAvLyBhcnJheSBvZiBhbmltYWxzIGZvciB0aGUgc3BlY2lmaWMgdGltZSBmcmFtZVxyXG5cclxubGV0IHN2Z0NvbnRhaW5lcjsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIHNwYXRpYWwgdmlld1xyXG5sZXQgdGFuazsgLy8gc3ZnIGdyb3VwIGZvciB0aGUgc3BhdGlhbCB2aWV3IHRhbmtcclxuLy8gbGV0IG5ldHdvcmtCYWtEYXRhID0ge307XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgc3BhdGlhbCB2aWV3IHdpdGggYWxsIHRoZSBpbXBvcnRhbnQgZmFjdG9yc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwYXRpYWxWaWV3SW5pdCgpIHtcclxuXHJcbiAgICBsZXQgbWluUG9pbnQgPSBwYXJhbWV0ZXJzWydtaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgIGxldCBtYXhQb2ludCA9IHBhcmFtZXRlcnNbJ21heCddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gbGV0IGNvb3JkaW5hdGVPcmlnaW4gPSBwYXJhbWV0ZXJzWydjb29yZGluYXRlX29yaWdpbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgLy8gd2lkdGggPSB3aWR0aCAqMS4wMiAtLT4gc28gdGhlcmUgaXMgYSBtYXJnaW4gaW4gdGhlIHNwYXRpYWwgdmlldyB3aGVyZSBubyBhbmltYWwgaXMgZXZlclxyXG4gICAgdGFua1dpZHRoID0gKG1heFBvaW50WzBdIC0gbWluUG9pbnRbMF0pICogMS4wMjtcclxuICAgIHRhbmtIZWlnaHQgPSAobWF4UG9pbnRbMV0gLSBtaW5Qb2ludFsxXSkgKiAxLjAyO1xyXG4gICAgLy9YIGFuZCBZIGF4aXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKTtcclxuXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgIC50aWNrcyg3KVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgLy8gWk9PTUlORyBBTkQgUEFOTklORyBTVFVGRlxyXG4gICAgbGV0IHpvb21Hcm91cDtcclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCA2XSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIC8vIG1vZGlmeSB0aGUgdHJhbnNsYXRlIHNvIHRoYXQgaXQgbmV2ZXIgZXhpdHMgdGhlIHRhbmtcclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnggPSBNYXRoLm1pbigwLCB0YW5rV2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHRhbmtXaWR0aCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueCkpO1xyXG5cclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnkgPSBNYXRoLm1pbigwLCB0YW5rSGVpZ2h0ICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rSGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgYW5kIHNjYWxlXHJcbiAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcy5zY2FsZShkMy5ldmVudC50cmFuc2Zvcm0ucmVzY2FsZVgoeCkpKTtcclxuICAgICAgICAgICAgZ1lheGlzLmNhbGwoeUF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVZKHkpKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy90aGUgc3ZnIGNvbnRhaW5lclxyXG4gICAgc3ZnQ29udGFpbmVyID0gZDMuc2VsZWN0KCcjbWFpbi12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG4gICAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgMCAnICsgdGFua1dpZHRoICsgJyAnICsgdGFua0hlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSlcclxuICAgICAgICAuYXR0cignaWQnLCAnbWFpbi12aXMtc3ZnJylcclxuICAgICAgICAuY2FsbCh6b29tKTtcclxuXHJcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbywgZm9yIGUuZyAxMjQwLzE5MDAgPSAwLjY1IHNvIHBhZGRpbmctYm90dG9tID0gNjUlICovXHJcbiAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguY2VpbCgodGFua0hlaWdodCAvIHRhbmtXaWR0aCkgKiAxMDApO1xyXG4gICAgJCgnI21haW4tdmlzJykuYXBwZW5kKCQoJzxzdHlsZT4jbWFpbi12aXM6OmFmdGVyIHtwYWRkaW5nLXRvcDogJyArIHBlcmNlbnRhZ2UgKyAnJTtkaXNwbGF5OiBibG9jaztjb250ZW50OiBcIlwiO308L3N0eWxlPiAnKSk7XHJcblxyXG4gICAgem9vbUdyb3VwID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnc3ZnOmcnKTtcclxuXHJcbiAgICAvLyBWaXN1YWxpemUgdGhlIGJhY2tncm91bmQgaW1hZ2UgaWYgaXQgaXMgdXBsb2FkZWRcclxuICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAuYXR0cigneGxpbms6aHJlZicsICcvJyArIHBhcmFtZXRlcnMuYmFja2dyb3VuZF9pbWFnZSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhY2tncm91bmQtaW1hZ2UnKVxyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGFua0hlaWdodClcclxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGFua1dpZHRoKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAnMCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYXBwZW5kIHRoZSB0YW5rIGdyb3VwIHdpdGggYSB0cmFuc2Zvcm1hdGlvbiB3aGljaCByb3RhdGVzIHRoZSB5IGF4aXNcclxuICAgIHRhbmsgPSB6b29tR3JvdXAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RhbmsnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBwYXJhbWV0ZXJzLmludmVydGVkX3ggPyAtMSA6IDE7XHJcbiAgICAgICAgICAgIGxldCB5ID0gcGFyYW1ldGVycy5pbnZlcnRlZF95ID8gLTEgOiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gJ3NjYWxlKCcgKyB4ICsgJywnICsgeSArICcpJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL2FkZCB0aGUgY2VudHJvaWRcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZy1jZW50cm9pZCcpXHJcbiAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2VudHJvaWQnKVxyXG4gICAgICAgIC5hdHRyKCdyJywgNilcclxuICAgICAgICAuYXR0cignY3gnLCAwKVxyXG4gICAgICAgIC5hdHRyKCdjeScsIDApO1xyXG5cclxuICAgIC8vIGFycm93IGZvciB0aGUgY2VudHJvaWQgZGlyZWN0aW9uXHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtYXJyb3cnKVxyXG4gICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNjZW50cm9pZC1hcnJvdyknKTtcclxuXHJcbiAgICAvL2FwcGVuZCBuZXR3b3JrICBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICduZXR3b3JrLWdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgZGVsYXVuYXktdHJpYW5ndWxhdGlvbiBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdm9yb25vaSBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd2b3Jub2ktZ3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgZnJhbWUgdGltZSB0ZXh0XHJcbiAgICBzdmdDb250YWluZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnZnJhbWUtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAzMClcclxuICAgICAgICAuYXR0cigneScsIDMwKVxyXG4gICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIGxldCBnWWF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG4gICAgLy8gaW5pdCBzdHVmZiBmcm9tIG90aGVyIG1vZHVsZXNcclxuICAgIGluaXRUb29sdGlwKCk7XHJcbiAgICBpbml0U2xpZGVycygpO1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cCgpO1xyXG4gICAgaW5pdENvbG9yUGlja2VyKCk7XHJcbiAgICBsaW5lQ2hhcnQoKTtcclxuICAgIGluaXRMaXN0ZW5lcnMoKTtcclxuICAgIGluaXREZW5kcm9ncmFtKCk7XHJcbiAgICBtYWtlUmVzaXphYmxlKHRhbmtIZWlnaHQsIHRhbmtXaWR0aCk7XHJcbiAgICBkZWZhdWx0Q29uZmlnKCk7XHJcbiAgICAvLyBzdGFydCB0aGUgYW5pbWF0aW9uXHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3aW5nIGZ1bmN0aW9uIC0gaXMgY2FsbGVkIGZvciBlYWNoIHRpbWVzdGVwXHJcbiAqIGluZGV4VGltZSBzYXZlcyB0aGUgY3VycmVudCB0aW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhdygpIHtcclxuICAgIC8vbWVhc3VyZSBleGVjdXRpb24gdGltZSBvZiBmdW5jdGlvbiBkcmF3XHJcbiAgICAvLyBsZXQgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICAvL3VwZGF0ZSB0aW1lIHRvIHdhaXQgYWthIHNwZWVkIG9mIHJlcGxheVxyXG4gICAgbGV0IHRpbWVUb1dhaXQgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtcGxheWJhY2stcmF0ZTpjaGVja2VkJylcclxuICAgICAgICAudmFsKCk7XHJcbiAgICAvL3NjYWxlIHRoZSBzaXplIGJ5IHRoaXMgbnVtYmVyXHJcbiAgICBsZXQgYW5pbWFsU2NhbGUgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtc2l6ZTpjaGVja2VkJylcclxuICAgICAgICAudmFsKCk7XHJcblxyXG4gICAgLy9nZXQgdGhlIG5leHQgYW5pbWFsc1xyXG4gICAgYXJyYXlBbmltYWxzID0gZGF0YXNldC5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkWyd0J10gPT09IGluZGV4VGltZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vdGhlIHRpbWVvdXQgaXMgc2V0IGFmdGVyIG9uZSB1cGRhdGUgMzAgbXNcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGRyYXcgaGllcmFyY2h5XHJcbiAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSB0aW1lIGZyYW1lIHRleHRcclxuICAgICAgICAgICAgc3ZnQ29udGFpbmVyLnNlbGVjdCgnLmZyYW1lLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoTWF0aC5mbG9vcihpbmRleFRpbWUgLyAxNTAwKSAlIDYwICsgJzonICsgTWF0aC5mbG9vcihpbmRleFRpbWUgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyBpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGEgc2Vjb25kIGhhcyBjaGFuZ2VkIG1vdmUgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVTbGlkZXIoaW5kZXhUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN2Z0FuaW1hbHMgPSB0YW5rLnNlbGVjdEFsbCgnZy5hbmltYWwnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoYXJyYXlBbmltYWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5ldHdvcmsgdmlzXHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVmlzO1xyXG4gICAgICAgICAgICAvLyBsZXQgbmV0d29ya1Zpc0JhaztcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSBpbiBuZXR3b3JrRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmsgPSBuZXR3b3JrRGF0YVtpbmRleFRpbWVdO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGdyb3VwIHN0YW5kYXJkIGRldmlhdGlvbiBmb3IgdGhlIGhpZXJhcmhjeVxyXG4gICAgICAgICAgICAgICAgLy8gbmVlZGVkIGZvciBjb2xvcmluZyBvZiB0aGUgZGVuZHJvZ3JhbSBub2RlcyAodmFyaWFjbmUpXHJcbiAgICAgICAgICAgICAgICByZXNldGhpZXJhcmNoeUdyb3VwU3RkZXYoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSB3aG9sZSBuZXR3b3JrXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrID0gbmV0d29yay5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmltYWwxID0gYXJyYXlBbmltYWxzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialsnYSddID09PSBpdGVtWydzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hbDIgPSBhcnJheUFuaW1hbHMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqWydhJ10gPT09IGl0ZW1bJ2UnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhbmltYWwxWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFuaW1hbDJbJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYW5pbWFsMVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYW5pbWFsMlsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogaXRlbVsndiddXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTEnXSArICctJyArIGRbJ25vZGUyJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoKCcjbWMtJyArIGRbJ25vZGUyJ10gKyAnLScgKyBkWydub2RlMSddKSkuY3NzKCdmaWxsJywgbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV0d29yay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKG5ldHdvcmtbaV1bJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV0d29yTGltaXQocGVyY2VudGlsZXModG1wQXJyYXkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBuZXR3b3JrLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3ZhbCddIDw9ICgxIC0gbmV0d29ya0xpbWl0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrLWdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmstZWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKG5ldHdvcmspO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnc3RhcnQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydzdGFydCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsnZW5kJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnZW5kJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoKDEgLSBkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGRbJ3ZhbCddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUlxyXG5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrLWVkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydlbmQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydlbmQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3RBbGwoJ2xpbmUubmV0d29yay1lZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gbmV0d29ya1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsYXVuYXkgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heS10cmlhbmd1bGF0aW9uLWdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsndHJpYW5ndWxhdGlvbiddXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVsYXVuYXktdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9yb25vaVxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFua1xyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyN2b3Jub2ktZ3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoc3dhcm1EYXRhW2luZGV4VGltZV1bJ3Zvcm9ub2knXS5zcGxpdCgnOycpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUiAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFuay5zZWxlY3QoJyN2b3Jub2ktZ3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZvcm9ub2kuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0VOVEVSIC0gYXBwZW5kIHRoZSBhbmltYWwgZ3JvdXBzXHJcbiAgICAgICAgICAgIGxldCBhbmltYWxHcm91cGluZ3MgPSBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FuaW1hbC0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIGNpcmNsZXMgZm9yIGVhY2ggYW5pbWFsIHRvIHRoZSBhbmltYWxncm91cFxyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCAxLjUgKiBhbmltYWxTY2FsZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRnVuY3Rpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgb24gY2xpY2sgZm9yIHRoZSBhY3RpdmUgZmlzaHNcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzID0gYWN0aXZlQW5pbWFscy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0gYW5pbWFscyBjaXJjbGVzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYW5pbWFsU2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGZvciBlYWNoIGdyb3VwIHRoZSBhcnJvdywgbmVlZGVkIGZvciBjb2xvcmluZ1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fycm93LW1hcmtlci0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5nc1xyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoI2Fycm93LW1hcmtlci0nICsgZFsnYSddICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2V4ZWN1dGUgb25seSB3aGVuIGRyYXcgZGlyZWN0aW9uIGJ1dHRvbiBpcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsncCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsncCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtZFsnZGlyZWN0aW9uJ10gKyAnICcgKyBkWydwJ11bMF0gKyAnICcgKyAtZFsncCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICAkKCcuYXJyb3cnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnZleCBodWxsXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1jb252ZXgtaHVsbCcpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTiAtIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2YXIgaHVsbFBhdGggPSB0YW5rLnNlbGVjdEFsbCgncGF0aC5odWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsnY29udmV4X2h1bGwnXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGhcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRU5URVIgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2h1bGwtcGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGRyYXcgbm8gaHVsbFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGggPSB0YW5rLnNlbGVjdCgncGF0aC5odWxsLXBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gaHVsbCBwYXRoc1xyXG4gICAgICAgICAgICBodWxsUGF0aC5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGZpc2hcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZVNjYWxlICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgICAgICAgICB2YXIgdG1wU2NhbGUgPSByZXR1cm5Db2xvclNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigxMClcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXBTY2FsZShkW2FjdGl2ZVNjYWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9jb2xvciBldmVyeSBmaXNoIGJsYWNrXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJyMwMDAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnIzAwMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KG1ldGFkYXRhQ29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGFDb2xvcikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNhbmltYWwtJyArIGtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIG1ldGFkYXRhQ29sb3Jba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBtZXRhZGF0YUNvbG9yW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSBvcGFjdGl5IGlmIHRoZSBmaXNoIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMC4yNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0cmFja2luZyBpcyBvblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYWNraW5nQm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFRyYWNrZWREYXRhKGFycmF5QW5pbWFsc1swXVsndCddLCBhY3RpdmVBbmltYWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBub3JtYWwgb3BhY2l0eVxyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2RyYXcgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdjZW50cm9pZCcgaW4gc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKS5pcygnOmNoZWNrZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgc3dhcm1EYXRhW2luZGV4VGltZV0uY2VudHJvaWQgJiZcclxuICAgICAgICAgICAgICAgICQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAyICogYW5pbWFsU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2RpcmVjdGlvbiddICsgJyAnICsgc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF0gKyAnICcgKyAtc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV0gKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBhcnJvd3NcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbWVkb2lkXHJcbiAgICAgICAgICAgIGlmIChtZWRvaWRBbmltYWwgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbWVkb2lkQW5pbWFsID0gc3dhcm1EYXRhW2luZGV4VGltZV1bJ21lZG9pZCddO1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL25leHQgZnJhbWVcclxuICAgICAgICAgICAgaW5kZXhUaW1lKys7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVMaW5lQ2hhcnQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSA+PSBzd2FybURhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvL3N0YXJ0IGFnYWluIGZyb20gdGhlIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXlCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWVcclxuICAgICAgICAgICAgICAgIC8vICAgbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHQxIC0gdDApOyAvLyBpbiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZVRvV2FpdCk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGluZGV4IHRpbWUgdG8gYSBuZXcgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gbmV3IHRpbWUgc3RlcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKGluZGV4VGltZSA8PSBzd2FybURhdGEubGVuZ3RoKSkge1xyXG4gICAgICAgIGluZGV4VGltZSA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVjcmVhc2UgdGltZSBieSAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVjSW5kZXhUaW1lKCkge1xyXG4gICAgaW5kZXhUaW1lID0gaW5kZXhUaW1lIC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGhlIG5ldyBhY3RpdmUgc2NhbGUgLSBlLmcuIHNwZWVkLCBhY2NlbGVyYXRpb24sIGJsYWNrIGV0Yy5cclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIC0gYWN0aXZlIHNjYWxlIGZvciB0aGUgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2NhbGUodmFsdWUpIHtcclxuICAgIGFjdGl2ZVNjYWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldyBtZWRvaWQgYW5pbWFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFVuaXF1ZSBpZCBvZiB0aGUgYW5pbWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWVkb2lkQW5pbWFsKHZhbHVlKSB7XHJcbiAgICBtZWRvaWRBbmltYWwgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc2VsZWN0ZWQgYW5kIGhpZ2hsaWdodGVkIGFuaW1hbHNcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiB1bnFpdWUgaWQgb2YgdGhlIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVBbmltYWxzKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVBbmltYWxzID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBkMyAqL1xyXG5pbXBvcnQge1xyXG4gICAgaGllcmFyY2h5Q29sb3JzLFxyXG4gICAgY29sb3JzLFxyXG4gICAgY2hhbmdlSGllcmFyY2h5TGVnZW5kXHJcbn0gZnJvbSAnLi9oaWVyYXJjaHkuanMnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgbGV0IG5ldHdvcmtBdXRvID0gZmFsc2U7IC8vIGlmIHRydWUgdGhlIG5ldHdvcmsgZWRnZSBsaW1pdCBpcyBhdXRvbWF0aWNhbGx5IHN1Z2dlc3RlZFxyXG5leHBvcnQgbGV0IG5ldHdvcmtMaW1pdCA9IDAuNTtcclxuZXhwb3J0IGxldCBzaG93TmV0d29ya0hpZXJhcmNoeTtcclxuZXhwb3J0IGxldCBuZXR3b3JrQ29sb3IgPSB7fTtcclxuZXhwb3J0IGxldCBuZXR3b3JrSUQ7XHJcbmV4cG9ydCBsZXQgbmV0d29ya0JhY2tncm91bmQgPSB0cnVlO1xyXG5leHBvcnQgbGV0IG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQgPSAxOyAvL2RyYXcgYmFja2dyb3VuZCBsaW5lIGlmIGxpbWl0IGlzIGV4Y2VlZGVkXHJcbi8vIGZpeGVkIGNvbG9yIHNjYWxlIGZvciB0aGUgbmV0d29ya1xyXG5cclxuLyoqXHJcbiAqIGNvbG9yIHNjYWxlIGZvciBuZXR3b3JrIC0gcmFuZ2UgaXMgZGVmaW5lZCBkeW5hbWljIGJhc2VkIG9uIHRoZSBoaWVyYXJoY3kgY29sb3JcclxuICovXHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAuZG9tYWluKFxyXG4gICAgICAgIFswLCAuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjgsIC45LCAxXVxyXG4gICAgKS5yYW5nZShbJyNmN2ZiZmYnLCAnI2RlZWJmNycsICcjYzZkYmVmJywgJyM5ZWNhZTEnLCAnIzZiYWVkNicsICcjNDI5MmM2JywgJyMyMTcxYjUnLCAnIzA4NTE5YycsICcjMDgzMDZiJ10pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIG5ldHdvcmsgIHNlbGVjdCBidXR0b25zIGFuZCBoaWVyYXJjaHkgY2hlY2tib3hlcyB0byB0aGUgbmV0d29yayBtb2RhbFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgbmV0d29yayBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV0d29ya0J1dHRvbnMoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldWydmaW5pc2hlZCddKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29ya3MtaGllcmFyY2hpZXMtdGFibGUgdGJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzx0cj48dGQ+JyArIGRhdGFbaV1bJ25hbWUnXSArICc8L3RkPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzx0ZD4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhPScgKyBkYXRhW2ldWyduZXR3b3JrX2lkJ10gKyAnIG5hbWU9JyArIGRhdGFbaV1bJ25hbWUnXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc+PHNwYW4gY2xhc3M9XCJtZGkgbWRpLWdyYXBocWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9idXR0b24+PC90ZD4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8dGQ+PGRpdiBjbGFzcz1cInByZXR0eSBwLXN3aXRjaCBwLWZpbGxcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJoaWVhcmNoeS1jaGVja2JveFwiIGRhdGE9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICsgJ1wiIG5hbWU9XCInICsgZGF0YVtpXVsnbmFtZSddICsgJ1wiPjxkaXYgY2xhc3M9XCJzdGF0ZSBwLXN1Y2Nlc3NcIj48bGFiZWw+PC9sYWJlbD48L2Rpdj48L2Rpdj48L3RkPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHRkPi0tLTwvdGQ+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAnPHRkPjxkaXYgY2xhc3M9XCJwcmV0dHkgcC1zd2l0Y2ggcC1maWxsXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibmV0d29yay1oaWVyYXJjaHktY2hlY2tib3hcIiBkYXRhPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGFbaV1bJ25ldHdvcmtfaWQnXSArICdcIj48ZGl2IGNsYXNzPVwic3RhdGUgcC1zdWNjZXNzXCI+PGxhYmVsPjwvbGFiZWw+PC9kaXY+PC9kaXY+PC90ZD4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI25ldHdvcmtzLWhpZXJhcmNoaWVzLXRhYmxlJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbmV0d29yayBkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGF1dG8gdmFsdWUgLSBpZiB0cnVlIHRoYW4gdGhlIG5ldHdvcmsgbGltaXQgaXMgc2V0IHRvIHRoZSAwLjk1IHBlcmNlbnRpbGUgb2YgYWxsIHZhbHVlc1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0F1dG8odmFsdWUpIHtcclxuICAgIG5ldHdvcmtBdXRvID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbGltaXQgd2l0aCB0aGUgc3BlY2lmaWMgbmV0d29yayBzbGlkZXIgLSBjdXN0b21cclxuICogMCA9IHNpbWlsYXIgYW5kIDEgdW5zaW1pbGFyIGZvciB0aGUgc3BlY2lmaWMgdGltZSBtb21lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gYmV0d2VlbiAwIGFuZCAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29yTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtMaW1pdCA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGluIGhpZXJhcmNoeSAoZS5nLiBoMCkgZmlsdGVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWVyYXJjaHkgLSBlLmcuIDAtblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtIaWVyYXJjaHkodmFsdWUpIHtcclxuICAgIHNob3dOZXR3b3JrSGllcmFyY2h5ID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbmV0d29yayBpZCAtIG5lZWRlZCBmb3IgaGllcmFyY2h5IHN0YW5kYXJkIGRldmlhdGlvbiBjb2xvcmluZ1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBlLmcuIDAtblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtJRCh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0lEID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgbmV0d29yayBjb2xvciBzY2FsZSByYW5nZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgLSBpZCBvZiB0aGUgbmV0d29ya1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldG5ldHdvcmtDb2xvcihuZXR3b3JrX2lkKSB7XHJcbiAgICAvLyBpZiBpZCA9IC0xIHNldCB0aGUgY29sb3IgdG8gbm90aGluZ1xyXG4gICAgaWYgKG5ldHdvcmtfaWQgPj0gMCkge1xyXG4gICAgICAgIG5ldHdvcmtDb2xvclsnaCcgKyBuZXR3b3JrX2lkXSA9ICcjMDgzMDZiJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV0d29ya0NvbG9yID0ge307XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYm9vbGVhbiB2YWx1ZSBmb3IgdGhlIG5ldHdvcmsgYmFja2dyb3VuZCBjb2xvclxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gdHJ1ZSBvciBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtCYWNrZ3JvdW5kKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrQmFja2dyb3VuZCA9IHZhbHVlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBiYWNrZ3JvdW5kIGNvbG9yIGxpbWl0IC0gZHJhdyBiYWNrZ3JvdW5kIGxpbmUgaWYgbGltaXQgaXMgZXhjZWVkZWRcclxuICogQHBhcmFtIHtJbnRlZ2VyfSB2YWx1ZSAtIG5ldyBsaW1pdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtCYWNrZ3JvdW5kTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtCYWNrZ3JvdW5kTGltaXQgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9uZXR3b3JrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwgZDMsKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRUcmVuZENoYXJ0TGlzdGVuZXJcclxufSBmcm9tICcuL2xpbmVfY2hhcnQuanMnO1xyXG4vKipcclxuICogRGlzYWJsZSB0aGUgcGxheSBidXR0b24gLS0+IExvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVBsYXlCdXR0b24oKSB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhbihmYWxzZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnI3BsYXktaWNvbnMnKS5oaWRlKCk7XHJcbiAgICAkKCcjcGxheS1sb2FkaW5nJykuc2hvdygpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSB0aGUgcGxheSBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUGxheUJ1dHRvbigpIHtcclxuICAgIHNldFBsYXlCb29sZWFuKHRydWUpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcjcGxheS1sb2FkaW5nJykuaGlkZSgpO1xyXG4gICAgJCgnI3BsYXktaWNvbnMnKS5zaG93KCk7XHJcbiAgICBkcmF3KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gIC4wNSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlcyhhcnIpIHtcclxuICAgIGxldCBwID0gMC4wNTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcDtcclxuICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSBhcnJbbG93ZXJdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMSAtIChhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIDA1LCAyNSwgNTAsIDc1LCA5NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlc0xpbmVDaGFydChhcnIpIHtcclxuICAgIGxldCBwID0gWzAuMDUsIDAuMjUsIDAuNSwgMC43NSwgMC45NV07XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgIH0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gKGFyci5sZW5ndGggLSAxKSAqIHBbaV07XHJcbiAgICAgICAgbGV0IGxvd2VyID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICAgICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSBpbmRleCAlIDE7XHJcbiAgICAgICAgaWYgKHVwcGVyID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2xvd2VyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGFic29sdXRlIGZlYXR1cmUgY2hlY2tib3hlcyBpbiB0aGUgZmVhdHVyZSBwYW5lbFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnMoZGF0YVNldFBlcmNlbnRpbGUpIHtcclxuICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgb2JqZWN0XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YVNldFBlcmNlbnRpbGUpIHtcclxuICAgICAgICBpZiAoZGF0YVNldFBlcmNlbnRpbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0ZXh0IGZvciB0aGUgZGlzcGxheWVkIGJ1dHRvblxyXG4gICAgICAgICAgICBsZXQgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBrZXkuc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgICAgIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5zbGljZSgxKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBidXR0b25cclxuICAgICAgICAgICAgJCgnI2Fic29sdXRlLWZlYXR1cmUtY2hlY2tib3hlcycpLmFwcGVuZCgnPHRyPjx0aD4nICtcclxuICAgICAgICAgICAgICAgICcgPGRpdiBjbGFzcz1cInByZXR0eSBwLXN3aXRjaCBwLWZpbGwgcC1iaWdnZXJcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJkcmF3LScgKyBrZXkgK1xyXG4gICAgICAgICAgICAgICAgJ1wiLz48ZGl2IGNsYXNzPVwic3RhdGVcIj48bGFiZWw+JyArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nICsgJzwvbGFiZWw+PC9kaXY+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAvLyBxdWFudGlsZSBncmFwaFxyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmbG9hdC1yaWdodCBkcmF3LWRldGFpbHNcIiBpZD1cImRyYXctJyArIGtleSArICctZGV0YWlsc1wiPjxkaXYgY2xhc3M9XCJwcmV0dHkgcC1pY29uIHAtdG9nZ2xlIHAtcGxhaW5cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJkcmF3LScgKyBrZXkgKyAnLWlucHV0XCIgLz4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic3RhdGUgcC1zdWNjZXNzLW8gcC1vblwiPjxpIGNsYXNzPVwibWRpIG1kaS1pbWFnZS1hcmVhXCI+PC9pPjxsYWJlbD48L2xhYmVsPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0ZSBwLW9mZlwiPjxpIGNsYXNzPVwibWRpIG1kaS1pbWFnZS1vZmZcIj48L2k+PGxhYmVsPjwvbGFiZWw+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+PC90aD48L3RyPicpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBoaWRlIHRoZSBlbGVtZW50c1xyXG4gICAgJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKTtcclxuICAgIC8vIGluaXQgdGhlIGxpc3Rlcm5lcnNcclxuICAgIGluaXRUcmVuZENoYXJ0TGlzdGVuZXIoKTtcclxuXHJcbn1cclxuXHJcbi8vIGdlbmVyYXRlIGhhc2ggY29kZXMgZnJvbSBzdHJpbmdzXHJcbi8vIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzYxNjQ2MS9nZW5lcmF0ZS1hLWhhc2gtZnJvbS1zdHJpbmctaW4tamF2YXNjcmlwdC1qcXVlcnlcclxuU3RyaW5nLnByb3RvdHlwZS5oYXNoQ29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhhc2ggPSAwLFxyXG4gICAgICAgIGksIGNocjtcclxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGhhc2g7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNociA9IHRoaXMuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaHI7XHJcbiAgICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgc3RhbmRhcmREZXZpYXRpb24gb2YgYW4gYXJyYXkgb2YgbnVtYmVyc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBhcnJheSBvZiBudW1iZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RhbmRhcmREZXZpYXRpb24oYXJyKSB7XHJcbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBsZXQgbWVhbiA9IGFyci5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwdiArIGN2O1xyXG4gICAgICAgIH0sIDApIC8gYXJyLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG1wID0gYXJyLm1hcChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KG51bSAtIG1lYW4sIDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodG1wLnJlZHVjZShmdW5jdGlvbihwdiwgY3YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHB2ICsgY3Y7XHJcbiAgICAgICAgfSwgMCkgLyB0bXAubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vdmUgZWxlbWVudCBpbiBTVkcgaW50byBiYWNrZ3JvdW5kIGRvbmUgYnkgbW92aW5nIGl0IHRvIGZpcnN0IGVsZW1lbnRcclxuICovXHJcbmQzLnNlbGVjdGlvbi5wcm90b3R5cGUubW92ZVRvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlyc3RDaGlsZCA9IHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkO1xyXG4gICAgICAgIGlmIChmaXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSB0aGUgbWFpbiB2aXMgc3BhdGlhbCB2aWV3IHJlc2l6YWJsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZXNpemFibGUoaGVpZ2h0LCB3aWR0aCkge1xyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbWFpbi12aXMnKVxyXG4gICAgICAgICAgICAuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6ICQoJyNtYWluLXZpcy1kaXYnKS53aWR0aCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5oZWlnaHQoaGVpZ2h0ICogMC42KVxyXG4gICAgICAgICAgICAud2lkdGgod2lkdGggKiAwLjYpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNldCB0aGUgYnV0dG9ucyBhbmQgY2hlY2tib3hlc1xyXG4gKiBIaWRlIGljb25zIC0gbmVlZGVkIGJlY2F1c2Ugb2YgYm9vdHN0cmFwIGJ1Z1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDb25maWcoKSB7XHJcbiAgICAkKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAvL3NldCB0aGUgY29sb3Igc2NhbGUgZnVuY3Rpb24gdG8gbGluZWFyXHJcbiAgICAkKCcjY29sb3Itc2NhbGUtbGluZWFyJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI2dyb3VwLXNpemUtbScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNiYWNrZ3JvdW5kLXdoaXRlJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnI3NldHRpbmdzLWRpdiBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgIC8vaGlkZSB0aGUgbG9hZGluZyBnaWZcclxuICAgICQoJyNsb2FkaW5nJylcclxuICAgICAgICAuaGlkZSgpO1xyXG4gICAgLy8gbmVlZGVkIGR1ZSB0byBqUXVlcnkgaW5jb21wYXRpYmlsaXR5XHJcbiAgICAkKCcjcGxheS1sb2FkaW5nJykuaGlkZSgpO1xyXG4gICAgJCgnLm1kaS1wbGF5JykuaGlkZSgpO1xyXG4gICAgJCgnI21ldGFkYXRhLWlucHV0JykuaGlkZSgpO1xyXG4gICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5oaWRlKCk7XHJcbiAgICAkKCcjZy1jZW50cm9pZCcpLmhpZGUoKTtcclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnI2xpbmUtY2hhcnQtZmVhdHVyZS1jaGVja2JveGVzIGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywkLCBkMywgUG9seUJvb2wqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxuICAgIGFycmF5QW5pbWFscyxcclxuICAgIHNldEFjdGl2ZUFuaW1hbHMsXHJcbiAgICBkZWNJbmRleFRpbWUsXHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzaG93TmV0d29ya0hpZXJhcmNoeSxcclxuICAgIG5ldHdvcmtDb2xvclxyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3RhbmRhcmREZXZpYXRpb25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxubGV0IHpvb21Hcm91cDsgLy8gem9vbSBncm91cCBmb3IgdGhlIHNwZWNpZmljIGRlbmRyb2dyYW1cclxubGV0IHRyZWVtYXA7XHJcbmxldCB0b29sdGlwRGl2O1xyXG5sZXQgc3BhdGlhbFZpZXc7IC8vIGdldCB0aGUgc3BhdGlhbCB2aWV3IHN2ZyBmcm9tIHRoZSBtYWluIHZpc1xyXG5sZXQgc3ZnTGVnZW5kO1xyXG5sZXQgaGllcmFyY2h5TGV2ZWxzID0ge307XHJcbmxldCBzZXRPcGVyYXRpb24gPSAndW5pb24nO1xyXG5sZXQgaWQ7IC8vIG5lZWRlZCBmb3IgdGhlIGNvbGxhcHNlIGZ1bmN0aW9uXHJcbi8vU3RhdGljIGNvbG9yIHNjYWxlIGZvciB0aGUgZGVuZHJvZ3JhbSB2YXJpYWNuZSBjb2xvcmluZ1xyXG5sZXQgc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgLmRvbWFpbihcclxuICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgIClcclxuICAgIC5yYW5nZShbJyNmN2ZiZmYnLCAnI2RlZWJmNycsICcjYzZkYmVmJywgJyM5ZWNhZTEnLCAnIzZiYWVkNicsICcjNDI5MmM2JywgJyMyMTcxYjUnLCAnIzA4NTE5YycsICcjMDgzMDZiJ10pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1heE51bWJlckhpZXJhcmNoaWVzID0gNDtcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5SWRzID0gW107XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5Q29sb3JzID0ge307XHJcbmV4cG9ydCBsZXQgaGllcmFyY2h5R3JvdXBTdGRldiA9IHt9O1xyXG4vLyBUT0RPIGFkZCBtb3JlIGNvbG9yc1xyXG5leHBvcnQgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjMzg2Y2IwJywgJyNlNzI5OGEnLCAnI2ZmOTkwMCddO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGRlbmRyb2dyYW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGNvbnN0YW5jdCBmYWN0b3JzIGZvciB0aGUgZGVuZGdyb2dyYW1cclxuICAgIGxldCBtYXJnaW4gPSAyMCxcclxuICAgICAgICB3aWR0aCA9IDUwMDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gNTAwMDtcclxuXHJcbiAgICAvLyB6b29tIGZ1bmN0aW9uIGZvciB0aGUgZGVuZHJvZ3JhbVxyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDEwXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgd2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHdpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcblxyXG4gICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIGhlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoaGVpZ2h0ICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS55KSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgYW5kIHNjYWxlXHJcbiAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS1wYW5lbCcpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHdpZHRoICsgJyAnICsgaGVpZ2h0KVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQtZGVuZHJvZ3JhbScsIHRydWUpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG4gICAgaW5pdERlbmRyb2dyYW1MZWdlbmQoKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIHpvb20gZ3JvdXAgdG8gdGhlIHN2Z1xyXG4gICAgem9vbUdyb3VwID0gc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbiArICcsJyArIG1hcmdpbiArICcpJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIC8vIGQzIHRyZWVcclxuICAgIHRyZWVtYXAgPSBkMy50cmVlKCkgLy9kMy5jbHVzdGVyKClcclxuICAgICAgICAuc2l6ZShbKGhlaWdodCAtIDEwICogbWFyZ2luKSwgKHdpZHRoIC0gMTAgKiBtYXJnaW4pXSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBzcGF0aWFsIHZpZXcgLSBuZWVkZWQgdG8gYWRkIHRoZSBjbHVzdGVyaW5nIHRvIHRoZSBzcGF0aWFsIHZpZXcgd2luZG93XHJcbiAgICBzcGF0aWFsVmlldyA9IGQzLnNlbGVjdCgnLnRhbmsnKTtcclxuXHJcbiAgICAvLyBpbml0IGRlbmRyb2dyYW0gc2xpZGVyXHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBOZXR3b3JrIHNsaWRlclxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICBtaW46IDIsXHJcbiAgICAgICAgICAgIG1heDogMixcclxuICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgdmFsdWU6IGhpZXJhcmNoeUxldmVsc1snaDAnXSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgIHNldEhpZXJhcmNoeUxldmVsKGlkLCB1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIG5ldyBjbHVzdGVyaW5nIGFuZCBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3RGVuZHJvZ3JhbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBkZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGluaXQgdGhlIHRvb2x0aXAgZm9yIHRoZSBkZW5kcm9ncmFtXHJcbiAgICB0b29sdGlwRGl2ID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS10b29sdGlwJylcclxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCAwICsgJ3B4JylcclxuICAgICAgICAuc3R5bGUoJ3RvcCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBEaXZcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdCB0aGUgaGllcmFyY2h5IGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gbWF4TnVtYmVySGllcmFyY2hpZXMgKiAxMDA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjaGllcmFyY2h5LWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2hpZXJhcmNoeS1sZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpO1xyXG5cclxuICAgIC8vIGFkZCBwYXR0ZXJuIGZvciBzdHJpcGVkIGJhY2tncm91bmQgb2YgaW50ZXJzZWN0aW9ucyBldGMuXHJcbiAgICBzcGF0aWFsVmlldy5hcHBlbmQoJ2RlZnMnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXR0ZXJuJylcclxuICAgICAgICAuYXR0cignaWQnLCAnc3RyaXBlZCcpXHJcbiAgICAgICAgLmF0dHIoJ3BhdHRlcm5Vbml0cycsICd1c2VyU3BhY2VPblVzZScpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzIwJylcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgJzUnKVxyXG4gICAgICAgIC5hdHRyKCdwYXR0ZXJuVHJhbnNmb3JtJywgJ3JvdGF0ZSg2MCknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIDUpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsMCknKVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsICcjNjcwMDBkJyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgZGVuZGdyb2dyYW0gZm9yIG9uZSBzdGVwXHJcbiAqIEZ1cnRoZXIgY2FsbHMgdGhlIGRyYXdIaWVyYXJjaHkgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3RGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGdldCB0aGUgYWN0aXZlIGRlbmRyb2dyYW1cclxuICAgIGlkID0gJCgnLnNob3ctZGVuZHJvZ3JhbS5idG4tcHJpbWFyeScpLmF0dHIoJ2RhdGEnKTtcclxuICAgIC8vIGlmIGRhdGEgaXMgYXZhaWFibGUgZHJhdyBoaWVyYXJjaHkgY2x1c3RlcnMgYW5kIGEgYnV0dG9uIGlzIGFjdGl2ZSBzZWxjdGVkXHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSAmJiBpZCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YSBhbmQgdHJhbnNmb3JtIGl0XHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVsnaCcgKyBpZF1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gc2tpcCB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgbm9kZXMgPSBub2Rlcy5jaGlsZHJlblswXTtcclxuICAgICAgICAvLyBjb2xsYXBzZSB0aGUgdHJlZVxyXG4gICAgICAgIG5vZGVzLmNoaWxkcmVuLmZvckVhY2goY29sbGFwc2UpO1xyXG5cclxuICAgICAgICAvLyBtYXBzIHRoZSBub2RlIGRhdGEgdG8gdGhlIHRyZWUgbGF5b3V0XHJcbiAgICAgICAgbm9kZXMgPSB0cmVlbWFwKG5vZGVzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhub2Rlcyk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgaWYgbm8gbmV0d29yayBpcyBjaG9vc2VuXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0uYnRuLXByaW1hcnknKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV3IHNsaWRlciBtYXhcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJylcclxuICAgICAgICAgICAgICAgIC5zbGlkZXIoJ29wdGlvbicsICdtYXgnLCAobm9kZXNbJ2hlaWdodCddIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAuc2xpZGVyKCd2YWx1ZScsIGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gbGlua3MgKGVkZ2VzKVxyXG4gICAgICAgICAgICBsZXQgbGluayA9IHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC5saW5rJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKG5vZGVzLmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gRU5URVJcclxuICAgICAgICAgICAgbGlua1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBkaWFnb25hbExpbmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyYW5zaXRpb24gbGlua3MgdG8gdGhlaXIgbmV3IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGRpYWdvbmFsTGluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gRVhJVFxyXG4gICAgICAgICAgICBsaW5rLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gbm9kZXNcclxuICAgICAgICAgICAgLy8gYWRkcyBlYWNoIG5vZGUgYXMgYSBncm91cFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLm5vZGUnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGdyb3VwcyB0byB0aGUgZGVuZGdyb2dyYW1cclxuICAgICAgICAgICAgdmFyIG5vZGVFbnRlciA9IG5vZGUuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdub2RlJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkLmNoaWxkcmVuID8gJyBub2RlLS1pbnRlcm5hbCcgOiAnIG5vZGUtLWxlYWYnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVOVEVSIC0gYXBwZW5kIGZvciBlYWNoIGdyb3VwIGEgbm9kZSAoY2lyY2xlKVxyXG4gICAgICAgICAgICAvLyB3aXRoIGhpZ2hsaWdodGluZyBmb3IgdGhlIGFjdGl2ZSBjaG9vc2VuIGxldmVsXHJcbiAgICAgICAgICAgIG5vZGVFbnRlci5hcHBlbmQoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZFsnZGVwdGgnXSA9PT0gaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDAgKyBkLmRhdGEubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhY3RpdmUtbGV2ZWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGZpbmQgYSBuaWNlIGZ1bmN0aW9uIGZvciB0aGUgb24gY2xpY2sgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgY2xpY2spXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0b29sdGlwIHBvc2l0aW9uIGFuZCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcERpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyA1KSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZICsgNSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRGl2LnNlbGVjdCgnLnRvb2x0aXAtc3BhbicpLmh0bWwoZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGhpZ2hsaWdodCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHVuZGlvbiBvZiB0aGUgcGF0aHMgbWFrZXMgdGhpcyBjb21wbGljYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEhpZ2hsaWdodFNwYXRpYWxWaWV3KGRbJ2RhdGEnXVsnbmFtZSddKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcERpdi50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGhpZ2hsaWdodCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0U3BhdGlhbFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0ZXh0IC0gIyBudW1iZXIgb2YgYW5pbWFscyBpbiB0aGUgY2x1c3RlclxyXG4gICAgICAgICAgICBub2RlRW50ZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZW5kcm9ncmFtLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAxNTApXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIC0xNTApXHJcbiAgICAgICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0tIHVwZGF0ZSB0aGUgZ3JvdXBzXHJcbiAgICAgICAgICAgIG5vZGVFbnRlclxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhZSB0aGUgbm9kZSBhbmQgY2lyY2xlc1xyXG4gICAgICAgICAgICAvLyB3aXRoIGFjdGl2ZS1sZXZlbCBmdW5jdGlvbiB0byBoaWdobGlnaHQgd2hpY2ggbGV2ZWwgaXMgY2hvc2VuXHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRbJ2RlcHRoJ10gPT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDQwICsgZC5kYXRhLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyMCArIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkWydkZXB0aCddID09PSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhY3RpdmUtbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKCdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGl2ZS1sZXZlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0ZXh0IG9mIG51bWJlciBvZiBlbnRpdGllc1xyXG4gICAgICAgICAgICBub2RlLnNlbGVjdCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRVhJVFxyXG4gICAgICAgICAgICBub2RlLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29sb3IgdGhlIGRlbmRyb2dyYW0gbm9kZXMgdXNpbmcgdGhlIHN0YW5kYXJkRGV2aWF0aW9uIGluIHRoZSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhoaWVyYXJjaHlHcm91cFN0ZGV2KS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGxlZ2VuZCBmb3IgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoaWVyYXJjaHlHcm91cFN0ZGV2KTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gbGVnZW5kIGhlcmVcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdKVU1QUyBIRVJFJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuY3NzKCdkaXNwbGF5JykgPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tbGVnZW5kJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSU1QT1JUQU5UIC0gYXN5bmMgcHJvYmxlbXNcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gc29sdmUgdGhpcyAtIHZlcnkgc2xvd1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGllcmFyY2h5R3JvdXBTdGRldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3IgdGhlIG5vZGVzIGJ5IGNhbGN1bGF0aW5nIHRoZSBzdGFuZGFyZERldmlhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggY2x1c3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBhY3RpdmUgaXMgc2hvdyBpbiBjbHVzdGVyIGlzIGNob29zZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKSBpbiBoaWVyYXJjaHlHcm91cFN0ZGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hlbGxvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RhbmRhcmREZXZpYXRpb24oaGllcmFyY2h5R3JvdXBTdGRldlsoJ2gnICsgZFsnZGF0YSddWyduYW1lJ10udG9TdHJpbmcoKS5oYXNoQ29kZSgpKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhbmRhcmREZXZpYXRpb25Db2xvclNjYWxlKHN0YW5kYXJkRGV2aWF0aW9uKGhpZXJhcmNoeUdyb3VwU3RkZXZbKCdoJyArIGRbJ2RhdGEnXVsnbmFtZSddLnRvU3RyaW5nKCkuaGFzaENvZGUoKSldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRbJ2RlcHRoJ10gIT09IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5jc3MoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSkge1xyXG4gICAgICAgIC8vIGRyYXcgdGhlIGhpZXJhcmNoeSBpbiBzcGF0aWFsIHZpZXdcclxuICAgICAgICBkcmF3SGllcmFyY2h5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2xsYXBzZSBmdW5jdGlvbiAtIG9ubHkgc2hvdyB0aGUgYWN0aXZlIGxldmVsIGFuZCBvbmUgc3ViIGxldmVsXHJcbiAqL1xyXG5mdW5jdGlvbiBjb2xsYXBzZShkKSB7XHJcbiAgICBpZiAoZC5jaGlsZHJlbiAmJiBkLmRlcHRoIDw9IGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pIHtcclxuICAgICAgICBkLl9jaGlsZHJlbiA9IGQuY2hpbGRyZW47XHJcbiAgICAgICAgZC5fY2hpbGRyZW4uZm9yRWFjaChjb2xsYXBzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyB0aGUgYWxsIGhpZXJhcmNoaWVzIGluIHRoZSBzcGF0aWFsIHZpZXdcclxuICogYWRkIGEgZ3JvdXAgd2l0aCB0aGUgaWRzIG9mIHRoZSBhbmltYWxzIGluIGl0IHRvIHRoZSB2aWV3XHJcbiAqIHdpdGggcGF0aCBjaGlsZCBlbGVtZW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZHJhd0hpZXJhcmNoeSgpIHtcclxuICAgIC8vIGlkIG9mIHRoZSBoaWVyYXJjaHkgZS5nLiBbMSw1LDNdXHJcbiAgICBsZXQgaGllcmFyY2h5SWRzID0gT2JqZWN0LmtleXMobmV0d29ya0hpZXJhcmNoeSkubWFwKGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICByZXR1cm4geC5yZXBsYWNlKCdoJywgJycpO1xyXG4gICAgfSk7XHJcbiAgICAvLyAgVGhlIGNsdXN0ZXJpbmcgaW4gYW4gMkQgYXJyYXkgd2l0aCB3aGljaCBhbmltYWwgaWQgYmVsb25ncyB0byB3aGljaCBncm91cFxyXG4gICAgbGV0IGhpZXJhcmNoeVZlcnRpY2VzID0gW107XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaHkgZGF0YSB0byBnZXQgdGhlIGhpZXJhcmNoeSBhbmltYWwgaWRzIHBlciBjbHVzdGVyaW5nIGFuZCBncm91cGluZ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgdHJlZURhdGEgPSBuZXR3b3JrSGllcmFyY2h5WydoJyArIGhpZXJhcmNoeUlkc1tpXV1baW5kZXhUaW1lXTtcclxuICAgICAgICBsZXQgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW47XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBub2Rlc1snY2hpbGRyZW4nXVswXTtcclxuICAgICAgICBpZiAoc2hvd05ldHdvcmtIaWVyYXJjaHkgPT09IGhpZXJhcmNoeUlkc1tpXSkge1xyXG4gICAgICAgICAgICBuZXR3b3JrSGllcmFyY2h5SWRzID0gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIHRoZSB2ZXJ0aWNlcyBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgIGhpZXJhcmNoeVZlcnRpY2VzLnB1c2goZ2V0SGllcmFyY2h5VmVydGljZXMoZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5SWRzW2ldKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIG1vcmUgdGhhbiAyIGhpZXJhcmNoaWVzIGFyZSBkcmF3blxyXG4gICAgaWYgKGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyB1bmlvbiB0aGUgbGlzdCBvZiBwb2x5Z29ucyB0byBvbmUgcG9seWdvblxyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgaGllcmFyY2h5SWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGhpZXJhcmNoeVZlcnRpY2VzW2ldID0gdW5pb25Qb2x5Z29ucyhoaWVyYXJjaHlWZXJ0aWNlc1tpXSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyB0cmFuc2Zvcm0gYW5kIGNhbGN1bGF0ZSB0aGUgaW50ZXJzZWN0aW9uIHBvbHlnb25zIG9mIHRoZSBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLy8gaWYgKHNldE9wZXJhdGlvbiA9PT0gJ2ludGVyc2VjdGlvbicpIHtcclxuICAgICAgICAvLyAgICAgLy8gdGVtcCBzb2x1dGlvbiBvZiB0d28gaW50ZXJzZWN0aW9uc1xyXG4gICAgICAgIC8vICAgICBsZXQgdG1wSW50ZXJzZWN0aW9uID0gaGllcmFyY2h5VmVydGljZXNbMF07XHJcbiAgICAgICAgLy8gICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgaGllcmFyY2hpZXMgYW5kIGludGVyc2VjdCBhbGwgb2YgdGhlbVxyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhpZXJhcmNoeVZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAvLyAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IFBvbHlCb29sLmludGVyc2VjdCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVnaW9uczogdG1wSW50ZXJzZWN0aW9uLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAvLyAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4gICAgICAgIC8vICAgICAgICAgfSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJlZ2lvbnM6IGhpZXJhcmNoeVZlcnRpY2VzW2ldLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgLy8gICAgICAgICB0bXBJbnRlcnNlY3Rpb24gPSB0bXBJbnRlcnNlY3Rpb25bJ3JlZ2lvbnMnXTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIC8vIHJlc3VsdFxyXG4gICAgICAgIC8vICAgICBoaWVyYXJjaHlWZXJ0aWNlcyA9IFt0bXBJbnRlcnNlY3Rpb25dO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvLyB0cmFuc2Zvcm0gYW5kIGNhbGN1bGF0ZSB0aGUgc3ltbWV0cmljIGRpZmZlcmVuY2UgcG9seWdvbnMgb2YgdGhlIG4gaGllcmFyY2hpZXNcclxuICAgICAgICAvLyBlbHNlIGlmIChzZXRPcGVyYXRpb24gPT09ICdzeW0tZGlmZmVyZW5jZScpIHtcclxuICAgICAgICAvLyAgICAgLy8geG9yID0gVW5pb24gb2YgYWxsIGhpZXJhcmNoaWVzIC0gaW50ZXJzZWN0aW9uIG9mIGFsbCBoaWVyYXJjaGllc1xyXG4gICAgICAgIC8vICAgICAvLyB0ZW1wIHNvbHV0aW9uIG9mIHR3byBpbnRlcnNlY3Rpb25zXHJcbiAgICAgICAgLy8gICAgIGxldCB0bXBJbnRlcnNlY3Rpb24gPSBoaWVyYXJjaHlWZXJ0aWNlc1swXTtcclxuICAgICAgICAvLyAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBoaWVyYXJjaGllcyBhbmQgaW50ZXJzZWN0IGFsbCBvZiB0aGVtXHJcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaGllcmFyY2h5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGludGVyc2VjdGlvblxyXG4gICAgICAgIC8vICAgICAgICAgdG1wSW50ZXJzZWN0aW9uID0gUG9seUJvb2wuaW50ZXJzZWN0KHtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZWdpb25zOiB0bXBJbnRlcnNlY3Rpb24sIC8vIGxpc3Qgb2YgcmVnaW9uc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgLy8gICAgICAgICB9LCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVnaW9uczogaGllcmFyY2h5VmVydGljZXNbaV0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnZlcnQgaXQgYWdhaW5cclxuICAgICAgICAvLyAgICAgICAgIHRtcEludGVyc2VjdGlvbiA9IHRtcEludGVyc2VjdGlvblsncmVnaW9ucyddO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIC8vIGludGVyc2VjdGlvbiByZXN1bHRcclxuICAgICAgICAvLyAgICAgbGV0IGludGVyc2VjdGlvbkhpZXJhcmNoeVBvbHlnb25zID0gdG1wSW50ZXJzZWN0aW9uO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIC8vIHVuaW9uXHJcbiAgICAgICAgLy8gICAgIGxldCB0bXBVbmlvbiA9IGhpZXJhcmNoeVZlcnRpY2VzWzBdO1xyXG4gICAgICAgIC8vICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGhpZXJhcmNoaWVzIGFuZCBpbnRlcnNlY3QgYWxsIG9mIHRoZW1cclxuICAgICAgICAvLyAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoaWVyYXJjaHlWZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgLy8gICAgICAgICB0bXBVbmlvbiA9IFBvbHlCb29sLnVuaW9uKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZWdpb25zOiB0bXBVbmlvbiwgLy8gbGlzdCBvZiByZWdpb25zXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlIC8vIGlzIHRoaXMgcG9seWdvbiBpbnZlcnRlZD9cclxuICAgICAgICAvLyAgICAgICAgIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZWdpb25zOiBoaWVyYXJjaHlWZXJ0aWNlc1tpXSxcclxuICAgICAgICAvLyAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcclxuICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29udmVydCBpdCBhZ2FpblxyXG4gICAgICAgIC8vICAgICAgICAgdG1wVW5pb24gPSB0bXBVbmlvblsncmVnaW9ucyddO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCB1bmlvbkhpZXJhcmNoeVBvbHlnb25zID0gdG1wVW5pb247XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAvLyBzeW1tZXRyaWMgZGlmZmVyZW5jZVxyXG4gICAgICAgIC8vICAgICBsZXQgdG1wRGlmZmVyZW5jZSA9IFBvbHlCb29sLnhvcih7XHJcbiAgICAgICAgLy8gICAgICAgICByZWdpb25zOiB1bmlvbkhpZXJhcmNoeVBvbHlnb25zLCAvLyBsaXN0IG9mIHJlZ2lvbnNcclxuICAgICAgICAvLyAgICAgICAgIGludmVydGVkOiBmYWxzZSAvLyBpcyB0aGlzIHBvbHlnb24gaW52ZXJ0ZWQ/XHJcbiAgICAgICAgLy8gICAgIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgIHJlZ2lvbnM6IGludGVyc2VjdGlvbkhpZXJhcmNoeVBvbHlnb25zLFxyXG4gICAgICAgIC8vICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAvLyBjb252ZXJ0IGl0IGFnYWluXHJcbiAgICAgICAgLy8gICAgIHRtcERpZmZlcmVuY2UgPSB0bXBEaWZmZXJlbmNlWydyZWdpb25zJ107XHJcbiAgICAgICAgLy8gICAgIC8vIHJlc3VsdFxyXG4gICAgICAgIC8vICAgICBoaWVyYXJjaHlWZXJ0aWNlcyA9IFt0bXBEaWZmZXJlbmNlXTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gREFUQSBKb2luXHJcbiAgICBsZXQgaGllcmFyY2hpZXMgPSBzcGF0aWFsVmlld1xyXG4gICAgICAgIC5zZWxlY3RBbGwoJ2cuaGllcmFyY2h5LWdyb3VwJylcclxuICAgICAgICAuZGF0YShoaWVyYXJjaHlWZXJ0aWNlcyk7XHJcblxyXG4gICAgLy8gRU5URVIgdGhlIGdyb3VwcyAtIGFkZHMgYSBzcGVjaWZpYyBpZCBhbmQgY29sb3JcclxuICAgIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXRPcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBpbnRlcnNlY3Rpb24nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldE9wZXJhdGlvbiA9PT0gJ3N5bS1kaWZmZXJlbmNlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgc3ltLWRpZmZlcmVuY2UnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWVyYXJjaHktZ3JvdXAgaCcgKyBoaWVyYXJjaHlJZHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHlJZHNbaV1dO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHlJZHNbaV1dO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm1vdmVUb0JhY2soKTtcclxuXHJcbiAgICAvLyBVUERBVEUgLSB0aGUgY2xhc3MgbmVlZGVkIGZvciBpbnRlcnNlY3Rpb24gYW5kIHN5bW1ldHJpYyBkaWZmZXJlbmNlXHJcbiAgICBoaWVyYXJjaGllcy5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICBpZiAoc2V0T3BlcmF0aW9uID09PSAnaW50ZXJzZWN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBpbnRlcnNlY3Rpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2V0T3BlcmF0aW9uID09PSAnc3ltLWRpZmZlcmVuY2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGllcmFyY2h5LWdyb3VwIHN5bS1kaWZmZXJlbmNlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2hpZXJhcmNoeS1ncm91cCBoJyArIGhpZXJhcmNoeUlkc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJjaGllcy5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gSGllcmFjaHkgaHVsbHMgYWRkZWQgdG8gdGhlIHNwYXRpYWwgdmlldyAtIGdldCB0aGUgcG9pbnRzIGZvciBlYWNoIGFuaW1hbCBpbiB0aGVcclxuICAgIC8vIHNwYXRpYWwgdmlldyBzbyB0aGF0IGEgY29udmV4IGh1bGwgY2FuIGJlIGNhbGN1bGF0ZWRcclxuICAgIGxldCBoaWVyYXJ5SHVsbHMgPSBoaWVyYXJjaGllcy5zZWxlY3RBbGwoJ3BhdGguaGllcmFyY2h5LWh1bGwtcGF0aCcpXHJcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFTlRFUiBhbmQgY2FsY3VsYXRlIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAvLyAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiAnaHAnICsgZC5qb2luKCcnKS5yZXBsYWNlKC8sL2csICcnKTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWVyYXJjaHktaHVsbC1wYXRoJylcclxuICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGRyYXdMaW5lKGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCdMJykgKyAnWic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gVVBEQVRFIHRoZSBjb252ZXggaHVsbFxyXG4gICAgaGllcmFyeUh1bGxzXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBkcmF3TGluZShkKTtcclxuICAgICAgICAgICAgcmV0dXJuICdNJyArIGQuam9pbignTCcpICsgJ1onO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgLy8gcmV0dXJuICdocCcgKyBkLmpvaW4oJycpLnJlcGxhY2UoLywvZywgJycpO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBFWElUXHJcbiAgICBoaWVyYXJ5SHVsbHMuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVuaW9uIG11bHRpcGxlIHBvbHlnb25zIHRvZ2V0aGVyIC0gbmVlZGVkIG9yIGVsc2UgdGhlcmUgd2lsbCBiZSBob2xlcyBpbiB0aGUgaW50ZXJzZWN0aW9uc1xyXG4gKiBAcGFyYW0ge2FycmF5fSBwb2x5Z29ucyAtIGFycmF5IG9mIGFycmF5IG9mIHBvaW50c1xyXG4gKi9cclxuLy8gZnVuY3Rpb24gdW5pb25Qb2x5Z29ucyhwb2x5Z29ucykge1xyXG4vLyAgICAgLy8gY29uc29sZS5sb2cocG9seWdvbnMpO1xyXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2x5Z29ucy5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgIHBvbHlnb25zW2ldID0ge1xyXG4vLyAgICAgICAgICAgICByZWdpb25zOiBbcG9seWdvbnNbaV1dLFxyXG4vLyAgICAgICAgICAgICBpbnZlcnRlZDogZmFsc2UgLy8gaXMgdGhpcyBwb2x5Z29uIGludmVydGVkP1xyXG4vLyAgICAgICAgIH07XHJcbi8vICAgICB9XHJcbi8vICAgICAvLyB1bmlvbiBhIGxpc3Qgb2YgcG9seWdvbnMgdG9nZXRoZXJcclxuLy8gICAgIGxldCBzZWdtZW50cyA9IFBvbHlCb29sLnNlZ21lbnRzKHBvbHlnb25zWzBdKTtcclxuLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9seWdvbnMubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICBsZXQgc2VnMiA9IFBvbHlCb29sLnNlZ21lbnRzKHBvbHlnb25zW2ldKTtcclxuLy8gICAgICAgICBsZXQgY29tYiA9IFBvbHlCb29sLmNvbWJpbmUoc2VnbWVudHMsIHNlZzIpO1xyXG4vLyAgICAgICAgIHNlZ21lbnRzID0gUG9seUJvb2wuc2VsZWN0VW5pb24oY29tYik7XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gUG9seUJvb2wucG9seWdvbihzZWdtZW50cylbJ3JlZ2lvbnMnXTtcclxuLy8gfVxyXG5cclxuLyoqXHJcbiAqIEVkZ2UgZHJhd2luZyBtZXRob2Qgb2YgdGhlIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtvYmplY3R9IGQgLSBUcmVlbWFwIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGRpYWdvbmFsTGluZXMoZCkge1xyXG4gICAgcmV0dXJuICdNJyArIGQueCArICcsJyArIGQueSArXHJcbiAgICAgICAgJ1YnICsgZC5wYXJlbnQueSArICdIJyArIGQucGFyZW50Lng7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjbGljayBmdW5jdGlvbiAtIGhpZ2hsaWdodCB0aGUgZWxlbWVudHMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZCAtIFRyZWVtYXAgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY2xpY2soZCkge1xyXG4gICAgc2V0QWN0aXZlQW5pbWFscyhkWydkYXRhJ11bJ25hbWUnXSk7XHJcbiAgICAvLyBpZiBubyBhbmltYXRpb24gaXMgYWN0aXZlIGRyYXcgdGhlIGRyYXcgb25lIHN0ZXBcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IGFsbCB0aGUgY2x1c3RlcmluZyBvZiBhIHNwZWNpZmljIGxldmVsIGluIHRoZSBkZW5kcm9ncmFtIHRyZWVcclxuICogRm9yIGluc3RhbmNlIGFsbCBjbHVzdGVycyBmcm9tIGxldmVsIDVcclxuICogQHBhcmFtIHtvYmplY3R9IHJvb3QgLSBSb290IG9mIHRoZSB0cmVlbWFwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVhcmNoeSAtIE51bWJlciBvZiBoaWVyYXJjaHkgZnJvbSBbMC0zXVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5TGV2ZWwocm9vdCwgaGllcmFyY2h5KSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBsZXQgbGV2ZWwgPSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XTtcclxuXHJcbiAgICAvLyBzZWNvbmQgbGV2ZWwgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgdG1wX25vZGVzID0gcm9vdFsnY2hpbGRyZW4nXTtcclxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0aGUgdHJlZVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByb290WydoZWlnaHQnXTsgaSsrKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGF0IHRoZSBzZWFyY2hlZCBsZXZlbFxyXG4gICAgICAgIGlmICh0bXBfbm9kZXNbMF0gJiYgdG1wX25vZGVzWzBdWydkZXB0aCddID09PSBsZXZlbCkge1xyXG4gICAgICAgICAgICAvLyBhZGQgZWFjaCBjbHVzdGVyIHRvIHRoZSByZXN1bHQgc2V0XHJcbiAgICAgICAgICAgIHRtcF9ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnZGF0YSddWyduYW1lJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZVsnZGF0YSddWyduYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gb2YgYSBzcGVjaWZpYyBsZXZlbCBpbiB0aGUgdHJlZVxyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICB0bXBfbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVsnY2hpbGRyZW4nXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHRtcC5jb25jYXQobm9kZVsnY2hpbGRyZW4nXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0bXBfbm9kZXMgPSB0bXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzcGVjaWZpYyB2ZXJ0aWNlcyBvZiBhIGNsdXN0ZXJpbmcgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgcG9pbnRzIFtbeCx5XVt4LHldLi4uXVxyXG4gKiBAcGFyYW0ge0FycmF5fSBoaWVyYXJjaGllcyAtIEFycmF5IG9mIGFycmF5cyB3aXRoIGVhY2ggYXJyYXkgY29udGFpbnMgYWxsIHRoZSBpZHMgZm9yIGEgc3BlY2lmaWMgY2x1c3RlcmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SGllcmFyY2h5VmVydGljZXMoaGllcmFyY2hpZXMpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTsgLy8gcmVzdWx0IHNldFxyXG4gICAgaGllcmFyY2hpZXMuZm9yRWFjaChmdW5jdGlvbihjbHVzdGVyKSB7XHJcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gW107IC8vIHZlcnRpY2VzIG9mIHRoZSBjbHVzdGVycyBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjbHVzdGVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBncm91cE1lbWJlciA9IGFycmF5QW5pbWFscy5maW5kKGQgPT4gZFsnYSddID09PSBjbHVzdGVyW2pdKTtcclxuICAgICAgICAgICAgaWYgKGdyb3VwTWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFtncm91cE1lbWJlclsncCddWzBdLCAtZ3JvdXBNZW1iZXJbJ3AnXVsxXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFuZHJldyBtb250b25lIGNoYWluIGFsZ29yaXRobSByZXV0cm5zIGZvciBwb2ludHMgZmV3ZXIgdGhhbiAzIG51bGxcclxuICAgICAgICBpZiAodmVydGljZXMubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZDMucG9seWdvbkh1bGwodmVydGljZXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGFjdGl2ZSBsZXZlbCBmb3IgYSBzcGVjaWZpYyBkZW5kcm9ncmFtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWVyYXJjaHkgLSBIaWVyYXJjaHkgY2FuIGJlIGZyb20gWzAtM11cclxuICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIC0gTmV3IGFjdGl2ZSBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeUxldmVsKGhpZXJhcmNoeSwgbGV2ZWwpIHtcclxuICAgIC8vIFRPRE8gY2F0Y2ggY2FzZXMgPCAwIGFuZCBiaWdnZXIgdGhhbiBvdmVyYWxsIGhlaWdodFxyXG4gICAgaGllcmFyY2h5TGV2ZWxzWydoJyArIGhpZXJhcmNoeV0gPSBsZXZlbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZW50cnkgZm9yIHRoZSBoaWVyYXJjaCBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGllcmFyY2h5IC0gSGllcmFyY2h5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGllcmFyY2h5TGV2ZWwoaGllcmFyY2h5KSB7XHJcbiAgICAvLyBUT0RPIGNhdGNoIGNhc2VzIDwgMCBhbmQgYmlnZ2VyIHRoYW4gb3ZlcmFsbCBoZWlnaHRcclxuICAgIGRlbGV0ZSBoaWVyYXJjaHlMZXZlbHNbJ2gnICsgaGllcmFyY2h5XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgYWN0aXZlIGNvbG9yIGZvciBhIHNwZWNpZmljIGRlbmRyb2dyYW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeSBjYW4gYmUgZnJvbSBbMC0zXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpZXJhcmNoeUNvbG9yKGhpZXJhcmNoeSkge1xyXG4gICAgLy8gY2hlY2sgaWYgdGhlIGhpZXJhcmNoeSBpcyBhbHJlYWR5IHNob3duIGFzIG5ldHdvcmtcclxuICAgIC8vIHRha2UgdGhlIHNhbWUgY29sb3JcclxuICAgIGZvciAobGV0IGtleSBpbiBuZXR3b3JrQ29sb3IpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAoJ2gnICsgaGllcmFyY2h5KSkge1xyXG4gICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IG5ldHdvcmtDb2xvcltrZXldO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaGllcmFyY2h5IGlzIG5vdCB2aXN1YWxpemVkIGFscmVhZHkgYXMgYSBuZXR3b3JrXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0bXBfYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGhpZXJhcmNoeUNvbG9ycykge1xyXG4gICAgICAgICAgICBpZiAoaGllcmFyY2h5Q29sb3JzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoaWVyYXJjaHlDb2xvcnNba2V5XSA9PT0gY29sb3JzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wX2Jvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG1wX2Jvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSBuZXR3b3JrIGlzIGRlcGljdGVkXHJcbiAgICAgICAgICAgIC8vIGlmIHNvIHNraXAgdGhlIGNvbG9yIHdoaWNoIGlzIGFscmVhZHkgY2hvb3NlbiBmb3IgdGhlIG5ldHdvcmtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ldHdvcmtDb2xvcikubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV0d29ya0NvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtDb2xvcltrZXldICE9PSBjb2xvcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5Q29sb3JzWydoJyArIGhpZXJhcmNoeV0gPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWVyYXJjaHlDb2xvcnNbJ2gnICsgaGllcmFyY2h5XSA9IGNvbG9yc1tpXTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGNvbG9yIGZvciB0aGUgaGllcmFyY2ggbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZXJhcmNoeSAtIEhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhpZXJhcmNoeUNvbG9yKGhpZXJhcmNoeSkge1xyXG4gICAgZGVsZXRlIGhpZXJhcmNoeUNvbG9yc1snaCcgKyBoaWVyYXJjaHldO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBoaWVyYXJjaHkgYnV0dG9uIHRvIHRoZSBkaXZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gSGllcmFyY2h5IG9mIHRoZSBpZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5ldyBhY3RpdmUgbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRIaWVyYXJjaHlCdXR0b24oaWQsIG5hbWUpIHtcclxuICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtJykubGVuZ3RoIDwgbWF4TnVtYmVySGllcmFyY2hpZXMpIHtcclxuICAgICAgICAkKCcjZGVuZHJvZ3JhbS1idXR0b25zLWRpdicpLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaG93LWRlbmRyb2dyYW0tJyArIGlkICsgJ1wiIGRhdGE9JyArIGlkICsgJyBuYW1lPScgKyBuYW1lICtcclxuICAgICAgICAgICAgJyBjbGFzcz1cInNob3ctZGVuZHJvZ3JhbSBidG4gYnRuLWJsb2NrXCIgZGF0YS10b2dnbGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9XCJmYWxzZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPicgK1xyXG4gICAgICAgICAgICAnIDxzcGFuIGNsYXNzPVwiYnRuLWxhYmVsXCIgaWQ9XCJidG4tbGVmdFwiPiA8aSBjbGFzcz1cIm1kaSBtZGktYXJyb3ctY29sbGFwc2UtbGVmdFwiPjwvaT4mbmJzcCZuYnNwIFNob3cgJyArIG5hbWUgKyAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJidG4tbGFiZWxcIiBpZD1cImJ0bi1yaWdodFwiPiA8aSBjbGFzcz1cIm1kaSBtZGktYXJyb3ctY29sbGFwc2UtcmlnaHRcIj48L2k+Jm5ic3AmbmJzcCBIaWRlICcgKyBuYW1lICsgJyA8L3NwYW4+PC9idXR0b24+IDxicj4nXHJcbiAgICAgICAgKTtcclxuICAgICAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkuZmluZCgnI2J0bi1yaWdodCcpLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHNwZWNpZmljIGhpZXJhcmNoeSBidXR0b24gdG8gdGhlIGRpdlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgLSBIaWVyYXJjaHkgb2YgdGhlIGlkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGZvbGxvd2luZyBsaW5lIGJyZWFrIGFuZCBlbGVtZW50XHJcbiAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkubmV4dCgpLnJlbW92ZSgpO1xyXG4gICAgJCgnI3Nob3ctZGVuZHJvZ3JhbS0nICsgaWQpLnJlbW92ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIHNsaWRlciBhbmQgdGV4dCBpbiB0aGUgZGVuZHJvZ3JhbSBwYW5lbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURlbmRyb2dyYW0oKSB7XHJcbiAgICAvLyBnZXQgdGhlIGltcG9ydGFudCBpbmZvXHJcbiAgICBsZXQgaWQgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignZGF0YScpO1xyXG4gICAgbGV0IG5hbWUgPSAkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykuYXR0cignbmFtZScpO1xyXG4gICAgLy8gc2V0IHRoZSBuYW1lIG9mIHRoZSBkaXNwbGF5ZWQgaGllcmFyY2h5XHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbC1uYW1lJykudGV4dChuYW1lKTtcclxuXHJcbiAgICAvLyBzZXQgc2xpZGVyIGFuZCAgdGV4dCB2YWx1ZVxyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtc2xpZGVyJykudmFsKGhpZXJhcmNoeUxldmVsc1snaCcgKyBpZF0pO1xyXG4gICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwtbGV2ZWwtdGV4dCcpLnRleHQoaGllcmFyY2h5TGV2ZWxzWydoJyArIGlkXSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIGhpZXJhcmNoeSBsZWdlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VIaWVyYXJjaHlMZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hXaWR0aCA9IDUwO1xyXG4gICAgbGV0IGxlZ2VuZFN3YXRjaEhlaWdodCA9IDIwO1xyXG5cclxuICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgc3ZnIGVsZW1lbnRcclxuICAgIGlmIChPYmplY3Qua2V5cyhoaWVyYXJjaHlDb2xvcnMpLmxlbmd0aCAhPT0gMCB8fCBPYmplY3Qua2V5cyhuZXR3b3JrQ29sb3IpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICQoJyNoaWVyYXJjaHktbGVnZW5kLWRpdicpLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI2hpZXJhcmNoeS1sZWdlbmQtZGl2JykuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsZWdlbmREYXRhID0gW107XHJcbiAgICBsZXQgbGVnZW5kVGV4dERhdGEgPSBbXTtcclxuICAgIC8vIGdldCB0aGUgcmVxdWlyZWQgZGF0YVxyXG4gICAgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGF0YSBpcyBub3QgdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKGhpZXJhcmNoeUNvbG9yc1snaCcgKyAkKG9iaikuYXR0cignZGF0YScpXSAhPSBudWxsICYmICQob2JqKS5hdHRyKCduYW1lJykgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZWdlbmREYXRhLnB1c2goaGllcmFyY2h5Q29sb3JzWydoJyArICQob2JqKS5hdHRyKCdkYXRhJyldKTtcclxuICAgICAgICAgICAgbGVnZW5kVGV4dERhdGEucHVzaCgkKG9iaikuYXR0cignbmFtZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGFkZCB0aGUgbmV0d29yayBjb2xvclxyXG4gICAgaWYgKE9iamVjdC5rZXlzKG5ldHdvcmtDb2xvcikubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ldHdvcmtDb2xvcikge1xyXG4gICAgICAgICAgICBpZiAobGVnZW5kRGF0YS5pbmRleE9mKG5ldHdvcmtDb2xvcltrZXldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZERhdGEucHVzaChuZXR3b3JrQ29sb3Jba2V5XSk7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmRUZXh0RGF0YS5wdXNoKCdOZXR3b3JrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEQVRBIEpPSU5cclxuICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShsZWdlbmREYXRhKTtcclxuICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAuZGF0YShsZWdlbmRUZXh0RGF0YSk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIExlZ2VuZCBzd2F0Y2hlcyAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFN3YXRjaFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRTd2F0Y2hIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgMi41ICogaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gRVhJVCAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLmV4aXQoKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gVGV4dCAgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGxlZ2VuZFN3YXRjaFdpZHRoICsgMi41ICogaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGRlbmRyb2dyYW0gbGVnZW5kXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0RGVuZHJvZ3JhbUxlZ2VuZCgpIHtcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDU1MDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA2MDtcclxuXHJcbiAgICBsZXQgZGVuZHJvZ3JhbUxlZ2VuZCA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tcGFuZWwnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2RlbmRyb2dyYW0tbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KTtcclxuXHJcbiAgICAkKCcjZGVuZHJvZ3JhbS1sZWdlbmQnKS5oaWRlKCk7XHJcblxyXG4gICAgbGV0IGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoV2lkdGggPSA1MDtcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hIZWlnaHQgPSAyMDtcclxuXHJcbiAgICBsZXQgbGVnZW5kRGF0YSA9IHN0YW5kYXJkRGV2aWF0aW9uQ29sb3JTY2FsZS5yYW5nZSgpO1xyXG4gICAgLy9UT0RPIGNoYW5nZSB0aGlzIHRvIGJldHRlciBzb2x1dGlvblxyXG4gICAgbGV0IGxlZ2VuZFRleHREYXRhID0gWydsb3cnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJ2hpZ2gnXTtcclxuXHJcbiAgICBsZWdlbmQgPSBkZW5kcm9ncmFtTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKGxlZ2VuZERhdGEpO1xyXG4gICAgbGVnZW5kVGV4dCA9IGRlbmRyb2dyYW1MZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAuZGF0YShsZWdlbmRUZXh0RGF0YSk7XHJcblxyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaSAqIGxlZ2VuZFN3YXRjaFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXRleHQnKVxyXG4gICAgICAgIC5hdHRyKCd5JywgMiAqIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNldCBvcGVyYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdGlvbiAtIGUuZy4gXCJ1bmlvblwiIFwiaW50ZXJzZWN0aW9uXCIgXCJzeW0tZGlmZmVyZW5jZVwiXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2V0T3BlcmF0aW9uKHZhbHVlKSB7XHJcbiAgICBzZXRPcGVyYXRpb24gPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgaGllcmFyY2h5IGdyb3VwIHN0YW5kYXJkIGRldmlhdGlvblxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gdW5pcXVlIGhhc2ggaWQgZm9yIHRoZSBncm91cFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB1bmlxdWUgaGFzaCBpZCBmb3IgdGhlIGdyb3VwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0aGllcmFyY2h5R3JvdXBTdGRldihrZXksIHZhbHVlKSB7XHJcbiAgICBpZiAoa2V5IGluIGhpZXJhcmNoeUdyb3VwU3RkZXYpIHtcclxuICAgICAgICBoaWVyYXJjaHlHcm91cFN0ZGV2W2tleV0ucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhpZXJhcmNoeUdyb3VwU3RkZXZba2V5XSA9IFt2YWx1ZV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNldCBoaWVyYXJjaHkgZ3JvdXAgc3RhbmRhcmQgZGV2aWF0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRoaWVyYXJjaHlHcm91cFN0ZGV2KCkge1xyXG4gICAgaGllcmFyY2h5R3JvdXBTdGRldiA9IHt9O1xyXG59XHJcblxyXG4vKipcclxuICogSGlnaGxpZ2h0IGEgc3Vic2V0IG9mIGFuaW1hbHMgaW4gdGhlIHNwYXRpYWwgdmlld1xyXG4gKiBAcGFyYW0ge2FycmF5fSBhbmltYWxzIC0gYXJyYXkgb2YgYW5pbWFsIGlkcyB3aGljaCBoYXZlIHRvIGJlIGhpZ2hsaWdodGVkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkSGlnaGxpZ2h0U3BhdGlhbFZpZXcoYW5pbWFscykge1xyXG4gICAgLy8gcG9pbnRzIHRvIGNhbGN1bGF0ZSB0aGUgY29udmV4IGh1bGwgb2YgdGhlIGhpZ2hsaWdodCBjbHVzdGVyXHJcbiAgICBsZXQgdmVydGljZXMgPSBbXTtcclxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0aGUgb2JqZWN0cyBpbiB0aGUgY2x1c3RlclxyXG4gICAgLy8gZ2V0IHRoZSBwb2ludHMgYW5kIGhpZ2hsaWdodCB0aGUgYW5pbWFsc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRtcEFuaW1hbCA9IHNwYXRpYWxWaWV3LnNlbGVjdCgnI2FuaW1hbC0nICsgYW5pbWFsc1tpXSk7XHJcbiAgICAgICAgbGV0IHBvaW50ID0gdG1wQW5pbWFsLmRhdGEoKVswXVsncCddO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goW3BvaW50WzBdLCAtcG9pbnRbMV1dKTtcclxuXHJcbiAgICAgICAgdG1wQW5pbWFsLmNsYXNzZWQoJ2FuaW1hbC1oaWdobGlnaHQnLCB0cnVlKTtcclxuICAgIH1cclxuICAgIC8vIGFkZCBhIHBvbHlnb24gaHVsbCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAgICBzcGF0aWFsVmlldy5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWdobGlnaHQtaGllcmFyY2h5JylcclxuICAgICAgICAuYXR0cignZCcsICgnTScgKyBkMy5wb2x5Z29uSHVsbCh2ZXJ0aWNlcykuam9pbignTCcpICsgJ1onKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGhpZ2hsaWdodCBpbiB0aGUgc3BhdGlhbCB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGlnaGxpZ2h0U3BhdGlhbFZpZXcoKSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGNvbG9yaW5nIGFuZCB0aGUgaGllcmFyY2h5IGhpZ2hsaWdodCBodWxsXHJcbiAgICBkMy5zZWxlY3RBbGwoJy5hbmltYWwnKS5jbGFzc2VkKCdhbmltYWwtaGlnaGxpZ2h0JywgZmFsc2UpO1xyXG4gICAgZDMuc2VsZWN0QWxsKCcuaGlnaGxpZ2h0LWhpZXJhcmNoeScpLnJlbW92ZSgpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2hpZXJhcmNoeS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWN0aXZlU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcmV0dXJuQ29sb3JTY2FsZVxyXG59IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmxldCBzdmdMZWdlbmQ7IC8vIHN2ZyBjb250YWluZXIgZm9yIHRoZSBsZWdlbmRcclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGdyb3VwIHRvIHRoZSBzdmcgd2hlcmUgdGhlIGxlZ2VuZCBmb3IgdGhlIGNvbG9yIGxlZ2VuZCBpc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNwYXRpYWxWaWV3R3JvdXAoKSB7XHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSA1NTA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNjA7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjbWFpbi12aXMtbGVnZW5kLWRpdicpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbWFpbi12aXMtbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgY29sb3IgbGVnZW5kXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlTGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kU3dhdGNoV2lkdGggPSA1MDtcclxuICAgIGxldCBsZWdlbmRTd2F0Y2hIZWlnaHQgPSAyMDtcclxuICAgIC8vIGxldCBkaWZmZXJlbnRDb2xvcnMgPSAwO1xyXG5cclxuICAgIC8vIFNob3cgdGhlIHN2ZyBmaXJzdCBvZiBhbGxcclxuICAgICQoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGFuaW1hbHNcclxuICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgIHZhciB0bXBTY2FsZSA9IHJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5yYW5nZSgpKTtcclxuXHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gZGlmZmVyZW50Q29sb3JzID0gdG1wU2NhbGUucmFuZ2UoKVxyXG4gICAgICAgIC8vIC5sZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxlZ2VuZCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgIC8vIGhpZGUgdGhlIGRpdiBhZ2FpblxyXG4gICAgICAgICQoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0gTGVnZW5kIHN3YXRjaGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0pO1xyXG4gICAgLy8gRU5URVIgLSBsZWdlbmRcclxuICAgIGxlZ2VuZFxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kU3dhdGNoV2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZFN3YXRjaEhlaWdodClcclxuICAgICAgICAuYXR0cigneScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobGVnZW5kU3dhdGNoV2lkdGggKyBpICogbGVnZW5kU3dhdGNoV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBUZXh0ICAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBVUERBVEUgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGQgKiAyKSAvIDI7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kU3dhdGNoSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDUgaGFzIHRvIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuIChsZWdlbmRTd2F0Y2hXaWR0aCArIGkgKiBsZWdlbmRTd2F0Y2hXaWR0aCArIDUpICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgY29sb3JicmV3ZXIqL1xyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZFxyXG59IGZyb20gJy4vbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhU2V0UGVyY2VudGlsZVxyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuZXhwb3J0IGxldCBjb2xvclNjYWxlID0ge1xyXG4gICAgdHlwZTogJ0xpbmVhcicsXHJcbiAgICBjb2xvcjogY29sb3JicmV3ZXIuQnVZbEJ1XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY29sb3Igc2NhbGVcclxuICogQHJldHVybiB7Y29sb3JTY2FsZX0gYWN0aXZlIGNvbG9yIHNjYWxlIGlzIGluIGxpbmVhciBvciB0aHJlc2hvbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5Db2xvclNjYWxlKCkge1xyXG4gICAgLy9pZiBsaW5lYXIgaXMgY2hvb3NlblxyXG4gICAgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ0xpbmVhcicpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH0gLy9UaHJlc2hvbGQgY29sb3Igc2NhbGVcclxuICAgIGVsc2UgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbU1BWLmFjdGl2ZVNjYWxlXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGNvbG9yIHBpY2tlclxyXG4gKiB3aXRoIGFsbCBsaXN0ZW5lcnMgaW5jbHVkZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sb3JQaWNrZXIoKSB7XHJcbiAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnBhbGV0dGUnKVxyXG4gICAgICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JicmV3ZXIpKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhbGV0dGUnKVxyXG4gICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQua2V5O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gaGlnaHRsaWdodCB0aGUgcmlnaHQgcGFsZXR0ZVxyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIicgKyBkLmtleSArICdcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgY29sb3JTY2FsZS5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VsZWN0QWxsKCcuc3dhdGNoJylcclxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3dhdGNoJylcclxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgY29sb3Igc2NoZW1lXHJcbiAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIkJ1WWxCdVwiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsICovXHJcbi8vIGltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcblxyXG5leHBvcnQgbGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuXHJcbi8qKlxyXG4gKiBJbml0IE1ldGFkYXRhIGJ1dHRvbnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIGxldCBjb2xvcnMgPSBbJyNmZmYnLCAnI2U0MWExYycsICcjMzc3ZWI4JywgJyM0ZGFmNGEnLCAnIzk4NGVhMycsICcjZmY3ZjAwJywgJyNmZmZmMzMnLCAnI2E2NTYyOCddO1xyXG4gICAgLy8gYWRkIHRoZSBkYXRhIHRvIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaWYgKGRhdGFzZXRNZXRhZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dHIgaWQ9XCJtZXRhZGF0YS1yb3ctJyArIGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10gKyAnXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdCBidG4tY29sb3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2aWV3XCIgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3ItZmllbGRcIiB2YWx1ZT1cIldoaXRlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgKz0gJzxkaXYgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2ggbWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY29sb3JzW2ldICsgJ1wiIHZhbHVlPVwiJyArIGlkICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbWV0YWRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNpemUgYW5kIHdlaWdodCBjb2xvcmluZyBmb3IgdGhlIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNZXRhZGF0YSgpIHtcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAvLyBnZXQgdGhlIGlucHV0IHZhbHVlc1xyXG4gICAgbGV0IHZhbHVlID0gJCgnI2dyb3VwLW1ldGFkYXRhIC5idG4uYnRuLWRlZmF1bHQuYWN0aXZlIGlucHV0JylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGxldCBibEF2ZyA9ICQoJyNibC1hdmcnKS52YWwoKTtcclxuICAgIGxldCBhYkF2ZyA9ICQoJyNhYi1hdmcnKS52YWwoKTtcclxuICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjZmRjMDg2JywgJyMzODZjYjAnXTtcclxuICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdIDwgYmxBdmcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPiBhYkF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGFkYXRhIHJlc2V0IGFsbCBpbmRpdmlkdWFsIG1ldGFkYXRhIGlucHV0IGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCkge1xyXG4gICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgJCgnLmRyb3Bkb3duICNwcmV2aWV3JylcclxuICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9tZXRhZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBwYXJhbWV0ZXJzICovXHJcblxyXG5sZXQgSlNPTkFQSV9NSU1FVFlQRSA9ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nO1xyXG52YXIgc291cmNlO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZFRvRGF0YXNldCxcclxuICAgIHNldERhdGFTZXRQZXJjZW50aWxlLFxyXG4gICAgc2V0U3dhcm1EYXRhLFxyXG4gICAgc2V0TWV0YURhdGEsXHJcbiAgICBzZXREYXRhc2V0RmVhdHVyZSxcclxuICAgIHNldE5ldHdvcmtEYXRhLFxyXG4gICAgc2V0SGllcmFyY2h5RGF0YSxcclxuICAgIHNldEFuaW1hbElkc1xyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkTmV0d29ya0J1dHRvbnMsXHJcbiAgICBzZXROZXR3b3JrSURcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGVuYWJsZVBsYXlCdXR0b24sXHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbixcclxuICAgIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnNcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNwYXRpYWxWaWV3SW5pdFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG4vLyBpbXBvcnQge1xyXG4vLyAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzXHJcbi8vIH0gZnJvbSAnLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcblxyXG4vKipcclxuICogU3RyZWFtIHRoZSBtb3ZlbWVudCBkYXRhIGZyb20gdGhlIEFQSVxyXG4gKiBMb2FkcyBvbmx5IHRoZSBleHBsaWNpdCBtb3ZlbWVudCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtTW92ZW1lbnREYXRhKCkge1xyXG4gICAgaWYgKHdpbmRvdy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9tb3ZlbWVudF9vbmx5LycgKyBwYXJhbWV0ZXJzWydpZCddKTtcclxuICAgICAgICBzb3VyY2Uub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSAnY2xvc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBhamF4IHF1ZXJpZXMgYXJlIGNvbXBlbHRlIGluaXRpYWxpemVcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1BlbmRpbmdSZXF1ZXN0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5hY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhdGlhbFZpZXdJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUb0RhdGFzZXQoSlNPTi5wYXJzZShlLmRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUucmVhZHlTdGF0ZSA9PSBFdmVudFNvdXJjZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdTdHJlYW1pbmcgZXJyb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ1dlYmJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBzdHJlYW1pbmcnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcGVyY2VudGlsZSBkYXRhIGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcmNlbnRpbGUoKSB7XHJcbiAgICBsZXQgZGF0YVNldFBlcmNlbnRpbGUgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9wZXJjZW50aWxlLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIGRhdGFTZXRQZXJjZW50aWxlIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgLy8gW21pbiwgcGVyY2VudGlsZV8xLC4uLixwZXJjZW50aWxlXzksbWF4XVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXRQZXJjZW50aWxlW2RhdGFbaV1bJ2ZlYXR1cmUnXV0gPSBbZGF0YVtpXVsnbWluJ10sIGRhdGFbaV1bJ3AxJ10sIGRhdGFbaV1bJ3AyJ10sIGRhdGFbaV1bJ3AzJ10sIGRhdGFbaV1bJ3A1J10sIGRhdGFbaV1bJ3A3J10sIGRhdGFbaV1bJ3A4J10sIGRhdGFbaV1bJ3A5J10sIGRhdGFbaV1bJ21heCddXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXREYXRhU2V0UGVyY2VudGlsZShkYXRhU2V0UGVyY2VudGlsZSk7XHJcbiAgICAgICAgICAgIGFkZEFic29sdXRlRmVhdHVyZUJ1dHRvbnMoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnQgZnJvbSB0aGUgYXBpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1GZWF0dXJlcygpIHtcclxuICAgIGNvbnN0IHN3YXJtX2ZlYXR1cmVzID0gWydzd2FybV90aW1lJywgJ3N3YXJtX3NwZWVkJywgJ3N3YXJtX2FjY2VsZXJhdGlvbicsICdzd2FybV9jb252ZXhfaHVsbF9hcmVhJyxcclxuICAgICAgICAnc3dhcm1fZGlzdGFuY2VfY2VudHJvaWQnLCAnc3dhcm1fZGlyZWN0aW9uJywgJ3N3YXJtX3BvbGFyaXNhdGlvbidcclxuICAgIF07XHJcblxyXG4gICAgLy8gZ2V0IGFsbCB0aGUgb3RoZXIgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgc3dhcm1fZmVhdHVyZXNbaV0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZSA9IHN3YXJtX2ZlYXR1cmVzW2ldLnJlcGxhY2UoJ3N3YXJtXycsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbWVhZGF0YSBpbmZvcm1hdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1ldGFEYXRhKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL21ldGFkYXRhLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHNldE1ldGFEYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGRhdGFzZXRzIGZvciB0aGUgYnV0dG9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtEYXRhQnV0dG9uKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29ya3MvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgYWRkTmV0d29ya0J1dHRvbnMoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNwZWNpZmMgZmVhdHVyZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmVhdHVyZSAtIGZvciBpbnN0YW5jZSBzcGVlZCwgYWNjZWxlcmF0aW9uIGV0Yy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIGZlYXR1cmUsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNwZWNpZmMgc3dhcm0gZmVhdHVyZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmVhdHVyZSAtIGZvciBpbnN0YW5jZSBjZW50cm9pZCwgbWVkb2lkIGV0Yy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybURhdGFzZXRGZWF0dXJlKGZlYXR1cmUpIHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIGZlYXR1cmUsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGZvciB0aGUgc3BlY2lmaWMgbmV0d29ya19pZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV0d29ya19pZCAtIHVuaXF1ZSBuZXR3b3JrIGlkIG9mIGEgZGF0YXNldC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YShuZXR3b3JrX2lkKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3JrLycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy8nICsgbmV0d29ya19pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNldE5ldHdvcmtEYXRhKEpTT04ucGFyc2UoZGF0YVswXVsnZGF0YSddKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gbmVlZGVkIGZvciBzdGFuZGFyZCBEZXZpYXRpb24gaW4gZGVuZHJvZ3JhbVxyXG4gICAgc2V0TmV0d29ya0lEKG5ldHdvcmtfaWQpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGhpZXJhcmNoeSBmb3IgdGhlIHNwZWNpZmljIG5ldHdvcmtfaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ldHdvcmtfaWQgLSB1bmlxdWUgbmV0d29yayBpZCBvZiBhIGRhdGFzZXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0hpZXJhcmNoeURhdGEobmV0d29ya19pZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29yay9oaWVyYXJjaHkvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBuZXR3b3JrX2lkLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2V0SGllcmFyY2h5RGF0YShKU09OLnBhcnNlKGRhdGFbMF1bJ2hpZXJhcmNoeSddKSwgbmV0d29ya19pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBkaXN0aW5jdCBhbmltYWwgaWRzIGZvciBhIHNwZWNpZmMgZGF0YXNldFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuaW1hbElkcygpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy9hbmltYWxfaWRzJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRBbmltYWxJZHMoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBWaXN1YWwgcGFyYW1ldGVyIHN1Z2dlc3Rpb24gYWpheCBxdWVyeVxyXG4vLyAgKiBAcGFyYW0ge0FycmF5fSB0cmFja2VkRGF0YSAtIHRyYWNrZWQgZGF0YSB3aXRoIC5cclxuLy8gICovXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRTdWdnZXN0ZWRQYXJhbWV0ZXJzKHRyYWNrZWREYXRhKSB7XHJcbi8vICAgICAkLmFqYXgoe1xyXG4vLyAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC92aXN1YWxfcGFyYW1ldGVyLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbi8vICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbi8vICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4vLyAgICAgICAgICAgICByZXNwb25zZVBhcmFtZXRlcnMoZGF0YSk7XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBkYXRhOiB0cmFja2VkRGF0YVxyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBwYXJhbWV0ZXJzKi9cclxuaW1wb3J0IHtcclxuICAgIHNldEluZGV4VGltZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldCxcclxuICAgIGFuaW1hbElkc1xyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXNMaW5lQ2hhcnRcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZSxcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgem9vbUZ1bmN0aW9uO1xyXG5cclxubGV0IHRyZW5kQ2hhcnRzWm9vbSA9IHt9O1xyXG5sZXQgdHJlbmRDaGFydHNFbGVtID0gWydsb3dlci1vdXRlci1hcmVhJywgJ2xvd2VyLWlubmVyLWFyZWEnLCAnbWVkaWFuLWxpbmUnLCAndXBwZXItaW5uZXItYXJlYScsICd1cHBlci1vdXRlci1hcmVhJ107XHJcbmxldCBsaW5lQ2hhcnRXaWR0aCA9IDUwMDA7XHJcbmxldCByYXRpbyA9IDE7XHJcbmxldCB6b29tR3JvdXA7XHJcbmxldCB4O1xyXG5sZXQgeTtcclxuXHJcbi8qKlxyXG4gKiBpbml0IHRoZSBsaW5lIGNoYXJ0IGFuZCBhbHNvIHRoZSB0cmVuZCBjaGFydFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVDaGFydCgpIHtcclxuXHJcbiAgICByYXRpbyA9IE1hdGguY2VpbChzd2FybURhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgIC8vIFN3YXJtIGZlYXR1cmVzIGxpbmUgY2hhcnRcclxuICAgIGxldCBsaW5lQ2hhcnRIZWlnaHQgPSA1MDA7IC8vIHRoZSBsaW5lIGNoYXJ0IGhlaWdodFxyXG4gICAgbGV0IG1hcmdpbiA9IHtcclxuICAgICAgICB0b3A6IDEwLFxyXG4gICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgIGJvdHRvbTogMTAwLFxyXG4gICAgICAgIGxlZnQ6IDEwXHJcbiAgICB9O1xyXG4gICAgbGV0IG1hcmdpblRvTGVnZW5kID0gNTA7XHJcblxyXG4gICAgbGV0IHN3YXJtX2ZlYXR1cmVzID0gT2JqZWN0LmtleXMoc3dhcm1EYXRhWzBdKTtcclxuICAgIC8vIHJlbW92ZSB0aGUgdGltZSBrZXlcclxuICAgIGxldCBpbmRleCA9IHN3YXJtX2ZlYXR1cmVzLmluZGV4T2YoJ3RpbWUnKTtcclxuICAgIHN3YXJtX2ZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgbGV0IGxpbmVDaGFydERhdGEgPSBbXTtcclxuICAgIC8vIGFnZ3JlZ2F0ZSBhbmQgYXZlcmFnZSB0aGUgc3dhcm0gZGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBwb2ludHMgaW4gdGhlIGxpbmUgY2hhcnRcclxuICAgIGlmIChzd2FybURhdGEubGVuZ3RoID4gbGluZUNoYXJ0V2lkdGgpIHtcclxuICAgICAgICAvLyB0bXAgYXJyYXkgZm9yIHRoZSBhZ2dyZWdhdGVkIGFuZCBhdmVyYWdlZCBmZWF0dXJlc1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhZ2dyZWdhdGUgdGhlIGZlYXR1cmVzIGluIHRoZSB0ZW1wIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzd2FybURhdGFbaV1bc3dhcm1fZmVhdHVyZXNbal1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSByYXRpbyBpcyB6ZXJvIHRoZW4gYXZlcmFnZSBpdCBhbmQgc2V0IGl0IHRvIHplcm9cclxuICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9vYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpbWUnOiBpIC8gcmF0aW9cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF9vYmplY3Rbc3dhcm1fZmVhdHVyZXNbal1dID0gdG1wW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVDaGFydERhdGEucHVzaCh0bXBfb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpbmVDaGFydERhdGEgPSBzd2FybURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgem9vbUZ1bmN0aW9uID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIGxpbmVDaGFydERhdGEubGVuZ3RoXSlcclxuICAgICAgICAucmFuZ2UoWzAsIGxpbmVDaGFydFdpZHRoXSk7XHJcblxyXG5cclxuICAgIC8vIHggYXhpcyBzY2FsZSAtIG1pbnVzIG1hcmdpbkxpbmVDaGFydCAgbmVlZGVkXHJcbiAgICB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIGxpbmVDaGFydERhdGEubGVuZ3RoXSlcclxuICAgICAgICAucmFuZ2UoWzAsIGxpbmVDaGFydFdpZHRoXSk7XHJcbiAgICBsZXQgeDIgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIC8vIGRlZmluZSB3aGVyZSB0aGUgYXhpcyBpcyBldGNcclxuICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeClcclxuICAgICAgICAudGlja3MoMTApXHJcbiAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgIC50aWNrUGFkZGluZyg1KVxyXG4gICAgICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGQgKiByYXRpbykgLyAxNTAwKSAlIDYwICsgJzonICsgTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIHBhcmFtZXRlcnNbJ2ZwcyddKSAlIDYwICsgJzo6JyArIChkICogcmF0aW8pICUgcGFyYW1ldGVyc1snZnBzJ107XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8geSBheGlzIHNjYWxlIHdoaWNoIGlzIG5vcm1hbGl6ZWRcclxuICAgIHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgMTAwXSlcclxuICAgICAgICAucmFuZ2UoW2xpbmVDaGFydEhlaWdodCwgMF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeSlcclxuICAgICAgICAudGlja3MoMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIGxldCBkcmFnZ2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZHJhZ2dlZCBmdW5jdGlvbiBnZXQgdGhlIGNvb3JkaW5hdGVzIGFuZCBjYWxjdWxhdGUgdGhlIHRpbWUgbW9tZW50IGZyb20gdGhpc1xyXG4gICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzKTtcclxuICAgICAgICBpZiAoY29vcmRzWzBdIDwgbWFyZ2luLmxlZnQgfHwgY29vcmRzWzBdID4gbGluZUNoYXJ0V2lkdGggfHwgY29vcmRzWzFdIDwgMCB8fCBjb29yZHNbMV0gPiBsaW5lQ2hhcnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0bXAgc2NhbGUgdG8gaW5jbHVkZSB0aGUgem9vbSBmYWN0b3JcclxuICAgICAgICBsZXQgdG1wU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oem9vbUZ1bmN0aW9uLnJhbmdlKCkpXHJcbiAgICAgICAgICAgIC5yYW5nZSh6b29tRnVuY3Rpb24uZG9tYWluKCkpO1xyXG4gICAgICAgIC8vIHNldCB0aGUgbmV3IHRpbWVcclxuICAgICAgICBzZXRJbmRleFRpbWUoTWF0aC5mbG9vcigodG1wU2NhbGUoY29vcmRzWzBdIC0gbWFyZ2luLmxlZnQpKSAqIHJhdGlvKSk7XHJcbiAgICB9O1xyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDIwXSlcclxuICAgICAgICAudHJhbnNsYXRlRXh0ZW50KFtcclxuICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICBbbGluZUNoYXJ0V2lkdGgsIGxpbmVDaGFydEhlaWdodF1cclxuICAgICAgICBdKVxyXG4gICAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgdHJhbnNmb3JtIGZhY3RvclxyXG4gICAgICAgICAgICBsZXQgdCA9IGQzLmV2ZW50LnRyYW5zZm9ybTtcclxuICAgICAgICAgICAgLy8gY2hhbmdlIHNjYWxpbmcgZnVuY3Rpb25cclxuICAgICAgICAgICAgem9vbUZ1bmN0aW9uID0geC5kb21haW4odC5yZXNjYWxlWCh4MikuZG9tYWluKCkpO1xyXG4gICAgICAgICAgICAvLyB6b29tIGVhY2ggYXZhaWFibGUgbGluZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbGluZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgem9vbUdyb3VwLnNlbGVjdCgoJyMnICsga2V5ICsgJ0xpbmUnKSkuYXR0cignZCcsIGxpbmVzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHpvb20gdGhlIHRyZW5kIGNoYXJ0c1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdHJlbmRDaGFydHNab29tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJlbmRDaGFydHNab29tLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnRzRWxlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoKCcjJyArIGtleSArICdUcmVuZENoYXJ0IC4nICsgdHJlbmRDaGFydHNFbGVtW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdHJlbmRDaGFydHNab29tW2tleV1bdHJlbmRDaGFydHNFbGVtW2ldXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIHN2ZyByZXNpemFibGVcclxuICAgIGxldCBzd2FybUxpbmVDaGFydCA9IGQzLnNlbGVjdCgnI3N3YXJtLXZpcycpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1saW5lLWNoYXJ0LWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyBsaW5lQ2hhcnRXaWR0aCArICcgJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW4uYm90dG9tKSlcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSk7XHJcblxyXG4gICAgem9vbUdyb3VwID0gc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFpvb20nKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4ubGVmdCArICcsMCknKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgYSBncm91cCBmb3IgdGhlIHggYXhpc1xyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcy1saW5lLWNoYXJ0JylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBsaW5lQ2hhcnRIZWlnaHQgKyAnKScpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeSBheGlzXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzLWxpbmUtY2hhcnQnKVxyXG4gICAgICAgIC5jYWxsKHlBeGlzKTtcclxuXHJcblxyXG4gICAgLy8gdGhlIHRpbWUgbGluZSBhcHBlbmQgdGhlIGxpbmVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0aW1lLWxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRUaW1lTGluZScpXHJcbiAgICAgICAgLmF0dHIoJ3gxJywgMClcclxuICAgICAgICAuYXR0cigneTEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4MicsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kyJywgbGluZUNoYXJ0SGVpZ2h0KTtcclxuXHJcbiAgICAvLyBjb2xvcnMgZm9yIHRoZSBsaW5lc1xyXG4gICAgbGV0IGxpbmVfY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xyXG4gICAgbGV0IGxpbmVzID0ge307XHJcbiAgICAvLyBhZGQgdGhlIGxpbmVzIHRvIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbihsaW5lQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkW3N3YXJtX2ZlYXR1cmVzW2ldXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWF4ID0gZDMubWF4KGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbm9ybWFsaXphdGlvblNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oW21pbiwgbWF4XSkucmFuZ2UoWzAsIDEwMF0pO1xyXG4gICAgICAgIGxldCBsaW5lID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4KGRbJ3RpbWUnXSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW3N3YXJtX2ZlYXR1cmVzW2ldXSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsaW5lc1tzd2FybV9mZWF0dXJlc1tpXV0gPSBsaW5lO1xyXG4gICAgICAgIC8vYXBwZW5kIHRoZSBsaW5lIHRvIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICAgICAgem9vbUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtsaW5lQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgKHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUgbGluZUNoYXJ0TGluZScpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgbGluZV9jb2xvcnMoaSkpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSlcclxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCBzd2FybV9mZWF0dXJlc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAvLyBhcHBlbmQgdGhlIHpvb20gcmVjdGFuZ2xlXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGluZUNoYXJ0V2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxpbmVDaGFydEhlaWdodClcclxuICAgICAgICAuY2FsbCh6b29tKVxyXG4gICAgICAgIC5vbignY2xpY2snLCBkcmFnZ2VkKVxyXG4gICAgICAgIC5jYWxsKGQzLmRyYWcoKVxyXG4gICAgICAgICAgICAub24oJ2RyYWcnLCBkcmFnZ2VkKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBsZWdlbmQgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICBsZXQgbGVnZW5kV2lkdGggPSAxMDA7XHJcbiAgICBsZXQgbGVnZW5kSGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgLy9zZWxlY3QgYWxsIHRoZSBsaW5lc1xyXG4gICAgbGV0IGNoYXJ0TGluZXMgPSBkMy5zZWxlY3RBbGwoJy5saW5lJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgYSBncm91cCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKGNoYXJ0TGluZXMuX2dyb3Vwc1swXSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSB3aG9sZSBsZWdlbmQgaW4gYSBlYWNoIGZ1bmN0aW9uXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc3BhY2luZyA9IDYwMDtcclxuICAgICAgICAgICAgbGV0IHRleHRTcGFjZSA9IDQwO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHJlY3RhbmdsZXMgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkLnN0eWxlLnN0cm9rZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHRleHQgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnTGVnZW5kVGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtY2hhcnQtbGVnZW5kLXRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICsgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGQuYXR0cmlidXRlcy5uYW1lLnZhbHVlICsgJzogJyk7XHJcblxyXG4gICAgICAgICAgICAvL2FwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIHZhbHVlIG9mIHRoZSBsaW5lXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ1ZhbHVlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLWNoYXJ0LWxlZ2VuZC10ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBleHByZXNzaW9uIGdldHMgdGhlIHRleHQgbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjJyArIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpLm5vZGUoKS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KCcwLjAnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGxlZ2VuZCBncm91cCBmb3IgdGhlIHRyZW5kIGNoYXJ0c1xyXG4gICAgc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAndHJlbmRDaGFydExlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5ib3R0b20gKyAnLCcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luVG9MZWdlbmQpICsgJyknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShbJzUlIC0gOTUlJywgJzI1JSAtIDc1JScsICdNZWRpYW4nXSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSB3aG9sZSBsZWdlbmQgaW4gYSBlYWNoIGZ1bmN0aW9uXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICBsZXQgc3BhY2luZyA9IDgwMDtcclxuICAgICAgICAgICAgbGV0IHRleHRTcGFjZSA9IDQwO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHJlY3RhbmdsZXMgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGxlZ2VuZEhlaWdodClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyM3NGE5Y2YnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyMwNDVhOGQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzUyNTI1Mic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHRleHQgZm9yIHRoZSBsZWdlbmRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1jaGFydC1sZWdlbmQtdGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuXHJcbiAgICBpbml0TGluZUNoYXJ0QnV0dG9ucyhzd2FybV9mZWF0dXJlcyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBsaW5lIGNoYXJ0IGJ1dHRvbiBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGluaXRMaW5lQ2hhcnRCdXR0b25zKHN3YXJtX2ZlYXR1cmVzKSB7XHJcbiAgICAvLyBhZGQgdGhlIExpbmUgY2hhcnQgYnV0dG9ucyB0byB0aGUgZmVhdHVyZSBwYW5lbFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IHN3YXJtX2ZlYXR1cmVzW2ldLnNwbGl0KCdfJykuam9pbignICcpO1xyXG4gICAgICAgIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5zbGljZSgxKTtcclxuXHJcbiAgICAgICAgJCgnI2xpbmUtY2hhcnQtZmVhdHVyZS1jaGVja2JveGVzJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnPHRyPjx0aD4gPGRpdiBjbGFzcz1cInByZXR0eSBwLXN3aXRjaCBwLWZpbGwgcC1iaWdnZXJcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJsaW5lLWNoYXJ0LWNoZWNrLWJveFwiIGlkPVwiZHJhdy0nICtcclxuICAgICAgICAgICAgICAgIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiIGRhdGE9XCIjJyArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmVcIiAvPjxkaXYgY2xhc3M9XCJzdGF0ZVwiPjxsYWJlbD4nICtcclxuICAgICAgICAgICAgICAgIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nICsgJzwvbGFiZWw+PC9kaXY+PC9kaXY+PC90aD48L3RyPicpO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy5saW5lLWNoYXJ0LWNoZWNrLWJveCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmIChjaGVja2JveC5wcm9wKCdjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgJChjaGVja2JveC5hdHRyKCdkYXRhJykpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKGNoZWNrYm94LmF0dHIoJ2RhdGEnKSkuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRyZW5kQ2hhcnRMaXN0ZW5lcigpIHtcclxuICAgICQoJy5kcmF3LWRldGFpbHMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dDpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTGluZUNoYXJ0KCk7XHJcbiAgICAgICAgICAgIGFkZFRyZW5kQ2hhcnQodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlVHJlbmRDaGFydCgpO1xyXG4gICAgICAgICAgICBlbmFibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcubGluZS1jaGFydC1jaGVjay1ib3gnKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG59XHJcblxyXG4vKipcclxuICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmFibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgJCgnLmxpbmUtY2hhcnQtY2hlY2stYm94JykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcubGluZUNoYXJ0TGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG59XHJcblxyXG4vKipcclxuICogSGlkZSB0aGUgdHJlbmQgY2hhcnRcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZVRyZW5kQ2hhcnQoKSB7XHJcbiAgICAkKCcudHJlbmRDaGFydERhdGEnKS5oaWRlKCk7XHJcbiAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuICAgICQoJyNsaW5lQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSB0cmVuZCBjaGFydCBzaG93aW5nIG1lZGlhbiBhbmQgcGVyY2VudGlsZXNcclxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW0gLSB3aGljaCBmZWF0dXJlXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRUcmVuZENoYXJ0KGVsZW0pIHtcclxuICAgIC8vIGNoZWNrIHdoaWNoIGZlYXR1cmUgdG8gZGlzcGxheSBpbiB0aGUgdHJlbmQgY2hhcnRcclxuICAgIGxldCBmZWF0dXJlID0gJyc7XHJcbiAgICBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzcGVlZCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdzcGVlZCc7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWNjZWxlcmF0aW9uJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2FjY2VsZXJhdGlvbic7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZGlzdGFuY2VfY2VudHJvaWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnZGlzdGFuY2VfY2VudHJvaWQnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ21pZGxpbmVfb2Zmc2V0JykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ21pZGxpbmVfb2Zmc2V0JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gZGF0YSBpcyBub3QgbG9hZGVkIGZ1bGx5IC0tIHJldHVyblxyXG4gICAgaWYgKCFkYXRhc2V0WzBdW2ZlYXR1cmVdKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gY2hhbmdlIHRvIHRoZSB0cmVuZCBjaGFydCBsZWdlbmRcclxuICAgICQoJyNsaW5lQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLnNob3coKTtcclxuICAgIC8vIGNoZWNrIGlmIGFscmVhZHkgY29tcHV0ZWQgYW5kIG9ubHkgaGlkZGVuXHJcbiAgICBpZiAoISQoKCcjJyArIGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKS5sZW5ndGgpIHtcclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCB0cmVuZENoYXJ0RGF0YSA9IFtdO1xyXG4gICAgICAgIGxldCBudW1fYW5pbWFscyA9IGFuaW1hbElkcy5sZW5ndGg7XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJjZXRpbGVzIGZvciBldmVyeSB0aW1lIHN0ZXBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtX2FuaW1hbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0W2kgKiBudW1fYW5pbWFscyArIGpdW2ZlYXR1cmVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0RGF0YS5wdXNoKHBlcmNlbnRpbGVzTGluZUNoYXJ0KHRtcCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FnZ3JlZ2F0ZSBhbmQgYXZlcmFnZSB0aGUgdHJlbmRDaGFydERhdGEgdG8gbGluZUNoYXJ0V2lkdGggZGF0YSBwb2ludHNcclxuICAgICAgICBpZiAodHJlbmRDaGFydERhdGEubGVuZ3RoID4gbGluZUNoYXJ0V2lkdGgpIHtcclxuICAgICAgICAgICAgbGV0IHRtcFRyZW5kQ2hhcnREYXRhID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBbcGVyYzA1LHBlcmMyNSxwZXJjNTAscGVyYzc1LHBlcmM5NV1cclxuICAgICAgICAgICAgbGV0IHRtcCA9IFswLCAwLCAwLCAwLCAwXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBbal0gKz0gdHJlbmRDaGFydERhdGFbaV1bal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkaXZpZGVcclxuICAgICAgICAgICAgICAgIGlmIChpICUgcmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gKz0gdG1wW2pdIC8gcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWRkIHRvIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgIHRtcFRyZW5kQ2hhcnREYXRhLnB1c2godG1wKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbcGVyYzA1LHBlcmMyNSxwZXJjNTAscGVyYzc1LHBlcmM5NV1cclxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJlbmRDaGFydERhdGEgPSB0bXBUcmVuZENoYXJ0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IGZvciB0aGUgbm9ybWFsaXphdGlvblxyXG4gICAgICAgIGxldCBtaW4gPSBkMy5taW4odHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbMF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1heCA9IGQzLm1heCh0cmVuZENoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFs0XTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbm9ybWFsaXphdGlvblNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oW21pbiwgbWF4XSkucmFuZ2UoWzAsIDEwMF0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgYSBncm91cCBmb3IgdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICAgICAgbGV0IHRyZW5kQ2hhcnQgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndHJlbmRDaGFydERhdGEnKTtcclxuICAgICAgICAvLyBhcHBlbmQgdGhlIHpvb20gcmVjdGFuZ2xlIGFnYWluIHRvIHRoZSBlbmQgb2YgdGhlIGdyb3VwXHJcbiAgICAgICAgJCgnLnpvb20nKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgICAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgICAgICAvLyB2YXIgdG8gc2F2ZSB0aGUgZnVuY3Rpb25zIGZvciB0aGUgem9vbVxyXG4gICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXSA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnRzRWxlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbnMgZm9yIHRoZSB1cHBlciBhbmQgaW5uZXIgYXJlYXMgYW5kIHRoZSBtZWRpYW5cclxuICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAgICAgICAgIC8vIGxvd2VyIG91dGVyIGFyZWEgYW5kIGxvd2VyIGlubmVyIGFyZWFcclxuICAgICAgICAgICAgaWYgKGkgPCAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkWyhpICsgMSldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG1lZGlhbiBsaW5lXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHVwcGVyIGlubmVyIGFyZWEgYW5kIHVwcGVyIG91dGVyIGFyZWFcclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5hcmVhKClcclxuICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkWyhpIC0gMSldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2F2ZSB0aGlzIGZvciB0aGUgbGF0ZXIgem9vbVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV1bdHJlbmRDaGFydHNFbGVtW2ldXSA9IHRlbXA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCBpdCB0byB0aGUgcGF0aFxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0LmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShbdHJlbmRDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgdHJlbmRDaGFydHNFbGVtW2ldKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHNob3cgdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICAgICAgJCgoJyMnICsgZmVhdHVyZSArICdUcmVuZENoYXJ0JykpLnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSB0aGUgbGluZSBjaGFydCBmaWVsZHMgYW5kIHRoZSBsaW5lIGNoYXJ0IHRpbWUgbGluZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxpbmVDaGFydCgpIHtcclxuICAgIGlmIChkMy5zZWxlY3QoJyNsaW5lQ2hhcnRUaW1lTGluZScpICYmIHN3YXJtRGF0YVtNYXRoLmNlaWwoaW5kZXhUaW1lIC8gcmF0aW8pXSkge1xyXG4gICAgICAgIGxldCB0bXAgPSBNYXRoLmNlaWwoaW5kZXhUaW1lIC8gcmF0aW8pO1xyXG4gICAgICAgIC8vdXBkYXRlIHRoZSBsaW5lIGNoYXJ0IGxlZ2VuZCB0ZXh0IHZhbHVlcyBwZXIgc2Vjb25kXHJcbiAgICAgICAgaWYgKGluZGV4VGltZSAlIDI1ID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gY2hhbmdlIHRoaXMgdG8gYSBtb3JlIG1vZHVsYXIgd2F5XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NvbnZleF9odWxsX2FyZWFMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoKHN3YXJtRGF0YVt0bXBdWydjb252ZXhfaHVsbF9hcmVhJ10pICsgJ21twrInKTtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjc3BlZWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ3NwZWVkJ10gKyAnbW0vcycpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNhY2NlbGVyYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2FjY2VsZXJhdGlvbiddICsgJ21tL3PCsicpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNkaXN0YW5jZV9jZW50cm9pZExpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlzdGFuY2VfY2VudHJvaWQnXSArICdtbScpO1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNkaXJlY3Rpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2RpcmVjdGlvbiddICsgJ8KwJyk7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI3BvbGFyaXNhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsncG9sYXJpc2F0aW9uJ10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkMy5zZWxlY3QoJyNsaW5lQ2hhcnRUaW1lTGluZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB6b29tRnVuY3Rpb24odG1wKSArICcsMCknKTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saW5lX2NoYXJ0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBTZXQqL1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGlzYWJsZVBsYXlCdXR0b25cclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGJydXNoZW5kLFxyXG4gICAgc2xpZGVyXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNoYW5nZUxlZ2VuZCxcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG1ldGFkYXRhQ29sb3IsXHJcbiAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSxcclxuICAgIGNvbG9yTWV0YWRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0TmV0d29ya0F1dG8sXHJcbiAgICBzZXROZXR3b3JMaW1pdCxcclxuICAgIHNldE5ldHdvcmtIaWVyYXJjaHksXHJcbiAgICBzZXRuZXR3b3JrQ29sb3IsXHJcbiAgICBzZXROZXR3b3JrSUQsXHJcbiAgICBzZXROZXR3b3JrQmFja2dyb3VuZCxcclxuICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kTGltaXRcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXQsXHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBkYXRhc2V0TWV0YWRhdGEsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldEhpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGdldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0RhdGEsXHJcbiAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0hpZXJhcmNoeURhdGFcclxufSBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sb3JTY2FsZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlcic7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkSGllcmFyY2h5QnV0dG9uLFxyXG4gICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uLFxyXG4gICAgZHJhd0RlbmRyb2dyYW0sXHJcbiAgICBtYXhOdW1iZXJIaWVyYXJjaGllcyxcclxuICAgIHNldFNldE9wZXJhdGlvblxyXG59IGZyb20gJy4vaGllcmFyY2h5LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRUcmFja2luZ0Jvb2xlYW4sXHJcbiAgICByZXNldFRyYWNrZWREYXRhLFxyXG4gICAgc2VuZFRyYWNrZWREYXRhXHJcbn0gZnJvbSAnLi92aXN1YWxfcGFyYW1ldGVyLmpzJztcclxuXHJcbmxldCBicnVzaDsgLy8gYnJ1c2hpbmcgdmFyaWFibGVcclxuZXhwb3J0IGxldCBwbGF5Qm9vbGVhbiA9IHRydWU7IC8vIHBhdXNlIGFuZCBwbGF5IGJvb2xlYW5cclxuXHJcbi8qKlxyXG4gKiBJbml0IGFsbCB0aGUgbGlzdGVuZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcclxuICAgIGNwX2xpc3RlbmVyKCk7XHJcbiAgICBzZl9saXN0ZW5lcnMoKTtcclxuICAgIGFmX2xpc3RlbmVycygpO1xyXG4gICAgbWRfbGlzdGVuZXJzKCk7XHJcbiAgICBuX2xpc3RlbmVycygpO1xyXG4gICAgaF9saXN0ZW5lcnMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgY29udHJvbCBwYW5lbCBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGNwX2xpc3RlbmVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSBvciBzdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKCcubWRpLXBhdXNlJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcubWRpLXBsYXknKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAkKCcubWRpLXBsYXknKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5tZGktcGF1c2UnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRJbmRleFRpbWUoc2xpZGVyLnNsaWRlcigndmFsdWUnKSk7XHJcbiAgICAgICAgICAgICQoJy5icnVzaCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGF1c2UgdGhlIGFuaW1hdGlvbiBhbmQgc2hvdyBvbmx5IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXh0LWZyYW1lLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJydXNoaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy9zdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoISQoJyNicnVzaGluZy1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9kZWZpbmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGJydXNoID0gZDMuYnJ1c2goKVxyXG4gICAgICAgICAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtTUFYudGFua1dpZHRoLCBTUFYudGFua0hlaWdodF1cclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsIGJydXNoZW5kKTtcclxuICAgICAgICAgICAgLy9hZGQgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpXHJcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2VsZWN0IGFsbCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZUFuaW1hbHMoW10pO1xyXG4gICAgICAgICAgICAvLyB0cmFja2luZyBvZiBkYXRhIGZvciB2aXN1YWwgcGFyYW1ldGVyIHN1Z2dlc3Rpb25cclxuICAgICAgICAgICAgcmVzZXRUcmFja2VkRGF0YSgpO1xyXG4gICAgICAgICAgICAkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG5cclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNrIHZpc3VhbCBwYXJhbWV0ZXIgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyN2aXN1YWwtcGFyYW1ldGVyLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjdmlzdWFsLXBhcmFtZXRlci1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUcmFja2luZ0Jvb2xlYW4odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIHRoZSB0cmFja2VkIHZpYSBhIGFqYXggcXVlcnkgdG8gdGhlIHNlcnZlciB0byBjYWxjdWxhdGUgdGhlIHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgc2V0VHJhY2tpbmdCb29sZWFuKGZhbHNlKTtcclxuICAgICAgICAgICAgc2VuZFRyYWNrZWREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGJvdGggYnV0dG9ucyBhbmQgcmVtb3ZlIHRoZSBhY3RpdmUgb25lXHJcbiAgICAgICAgICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnI3Zpc3VhbC1wYXJhbWV0ZXItYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BhdGlhbCB2aWV3IGJhY2tncm91bmQgY29sb3JcclxuICAgICAqL1xyXG4gICAgJCgnI2JhY2tncm91bmQtY29sb3InKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLWJhY2tncm91bmQ6Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgICQoJyNtYWluLXZpcy1zdmcnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIHNwYXRpYWwgdmlldyBheGlzIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1heGlzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueC5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy55LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgZnJhbWUgKHRpbWUpIG51bWJlciBpbiB0aGUgc3BhdGlhbCB2aWV3IGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10aW1lJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIC5mcmFtZS10ZXh0Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWUtdGV4dCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdGhlIG5ldHdvcmsgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1iYWNrZ3JvdW5kJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgc2V0TmV0d29ya0JhY2tncm91bmQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0TmV0d29ya0JhY2tncm91bmQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBuZXR3b3JrIGJhY2tncm91bmQgZWRnZSBsaW1pdFxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1iYWNrZ3JvdW5kLWxpbWl0JykudmFsKDEpO1xyXG4gICAgJCgnI25ldHdvcmstYmFja2dyb3VuZC1saW1pdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdmFsID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBpZiAoJC5pc051bWVyaWModmFsKSAmJiB2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtCYWNrZ3JvdW5kTGltaXQodmFsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIFNjYWxlIEZ1bmN0aW9uIFJhZGlvIGJ1dHRvbnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0gaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JTY2FsZVsndHlwZSddID0gJCgnaW5wdXRbbmFtZT1jb2xvci1zY2FsZS1yYWRpb106Y2hlY2tlZCcsICcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybScpLnZhbCgpO1xyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBzd2FybSBmZWF0dXJlcyBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIHNmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlyZWN0aW9uIGFycm93IG9mIHRoZSBhbmltYWxcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlyZWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdkaXJlY3Rpb24nIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgZGlyZWN0aW9uIGRhdGFcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdkaXJlY3Rpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuYXJyb3cnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmFycm93JykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbWVkb2lkIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1tZWRvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWVkb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghKCdtZWRvaWQnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ21lZG9pZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKHN3YXJtRGF0YVtTUFYuaW5kZXhUaW1lXVsnbWVkb2lkJ10pO1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBtZWRvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBkaXNwbGF5IHRoZSBtZWRvaWQgZmlzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIFNQVi5tZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCdjZW50cm9pZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgICQoJyNnLWNlbnRyb2lkJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGhpZGUgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgICQoJyNnLWNlbnRyb2lkJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY29udmV4IGh1bGwgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNvbnZleC1odWxsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2h1bGwnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ2NvbnZleF9odWxsJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0cmlhbmd1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd0cmlhbmd1bGF0aW9uJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCd0cmlhbmd1bGF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdm9yb25vaVxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy12b3Jvbm9pJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndm9yb25vaScgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgndm9yb25vaScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBhYnNvbHV0ZSBmZWF0dXJlIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gYWZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBTcGVlZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctc3BlZWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuaGlkZSgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dDpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5jbGljaygpO1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1zcGVlZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ3NwZWVkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnc3BlZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAkKCcuZHJhdy1kZXRhaWxzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZC1kZXRhaWxzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdzcGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkLWRldGFpbHMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYWNjZWxlcmF0aW9uIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuaGlkZSgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dDpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5jbGljaygpO1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgYWNjZWxlcmF0aW9uIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnYWNjZWxlcmF0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2FjY2VsZXJhdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2FjY2VsZXJhdGlvbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbi1kZXRhaWxzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBkaXN0YW5jZSB0byBjZW50cm9pZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuaGlkZSgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dDpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5jbGljaygpO1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2Rpc3RhbmNlX2NlbnRyb2lkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZV9jZW50cm9pZC1kZXRhaWxzJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdkaXN0YW5jZV9jZW50cm9pZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWRpc3RhbmNlX2NlbnRyb2lkLWRldGFpbHMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IG1pZGxpbmUgb2Zmc2V0XHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmhpZGUoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuY2xpY2soKTtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWlkbGluZV9vZmZzZXQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgZHJhdy1taWRsaW5lX29mZnNldCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2RyYXctbWlkbGluZV9vZmZzZXQnIGluIGRhdGFzZXRbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWpheCBxdWVyeSB0byBnZXQgdGhlIGFic29sdXRlIGZlYXR1cmUgbWlkbGluZV9vZmZzZXRcclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdtaWRsaW5lX29mZnNldCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNkcmF3LW1pZGxpbmVfb2Zmc2V0LWRldGFpbHMnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwZWVkJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2VfY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ21pZGxpbmVfb2Zmc2V0Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG5ldHdvcmsgbGlzdGVlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbl9saXN0ZW5lcnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYnV0dG9ucyBjbGlja2VkIC0gZ2V0IHRoZSBkYXRhXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3Jrcy1tb2RhbC1ib2R5IGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBuZXR3b3JrX2lkID0gJCh0aGlzKS5hdHRyKCdkYXRhJyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgbmFtZSBvZiB0aGUgY2hvb3NlbiBuZXR3b3JrIHRvIHRoZSBOZXR3b3JrIG1vZGFsXHJcbiAgICAgICAgJCgnI2FjdGl2ZS1uZXR3b3JrLW5hbWUnKS50ZXh0KCQodGhpcykuYXR0cignbmFtZScpKTtcclxuXHJcbiAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICBnZXROZXR3b3JrRGF0YShuZXR3b3JrX2lkKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBuZXR3b3JrXHJcbiAgICAgICAgc2V0bmV0d29ya0NvbG9yKG5ldHdvcmtfaWQpO1xyXG4gICAgICAgICQoJyNuZXR3b3JrLWRpdicpLm1vZGFsKCd0b2dnbGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBidXR0b25zIGNsaWNrZWQgLSBnZXQgdGhlIGRhdGFcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstcmVtb3ZlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0TmV0d29ya0RhdGEoe30pO1xyXG4gICAgICAgIHNldE5ldHdvcmtJRCgtMSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBuZXR3b3JrIGNvbG9yXHJcbiAgICAgICAgc2V0bmV0d29ya0NvbG9yKC0xKTtcclxuICAgICAgICAkKCcjYWN0aXZlLW5ldHdvcmstbmFtZScpLnRleHQoJycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGF1dG8gYnV0dG9uIHNldCBhY2l2ZSBvciByZW1vdmVcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmstYXV0by1zdWdnZXN0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQtcCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstc2xpZGVyJykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgc2V0TmV0d29ya0F1dG8odHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQtcCcpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstc2xpZGVyJykuc2hvdygpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byhmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBsaW1pdCA9ICQoJyNuZXR3b3JrLXNsaWRlcicpLnNsaWRlcigndmFsdWUnKTtcclxuICAgICAgICAgICAgc2V0TmV0d29yTGltaXQobGltaXQpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdCcpLnZhbChsaW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBtZXRhZGF0YSBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIG1kX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgc3dhdGNoIGZ1bmN0aW9ucyBjb2xvcmluZyBpbmRpdmlkdWFsIGFuaW1hbHNcclxuICAgICAqL1xyXG4gICAgJCgnLm1ldGFkYXRhLXN3YXRjaC5tZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCBjb2xvclJHQiA9ICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjb2xvciBvZiB0aGUgc3dhdGNoIHByZXZpZXdcclxuICAgICAgICAkKCcjbWV0YWRhdGEtcm93LScgKyBpZCArICcgI3ByZXZpZXcnKVxyXG4gICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3JSR0IpO1xyXG4gICAgICAgIC8vIGlmIHdoaXRlIHRoYW4gcmVzZXQgdGhlIGNvbG9yXHJcbiAgICAgICAgaWYgKGNvbG9yUkdCID09PSAncmdiKDI1NSwgMjU1LCAyNTUpJykge1xyXG4gICAgICAgICAgICBpZiAobWV0YWRhdGFDb2xvcltpZF0pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZXRhZGF0YUNvbG9yW2lkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbaWRdID0gY29sb3JSR0I7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBncm91cCBtZXRhZGF0YSBmdW5jdGlvbnMgZm9yIGluc3RhbmNlIGNvbG9yIHNleFxyXG4gICAgICovXHJcbiAgICAkKCcjZ3JvdXAtbWV0YWRhdGEgOmlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHJlc2V0IHRoZSBtZXRhZGF0IGFjb2xvcmluZ1xyXG4gICAgICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgdG1wID0gW107XHJcblxyXG4gICAgICAgIC8vIG1ldGFkYXRhIHNleCBpcyBjaG9vc2VuIC0gY29sb3JpbmcgYmFzZWQgb24gbSBhbmQgZlxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NleCcpIHtcclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWRpdicpLm1vZGFsKCd0b2dnbGUnKTtcclxuICAgICAgICAgICAgLy8gY2xvc2UgYW5kIGNvbG9yIGhlcmVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2V0IG9mIGluZGl2aWR1YWwgc3RyaW5ncyBpbiBzZXhcclxuICAgICAgICAgICAgdG1wID0gQXJyYXkuZnJvbShuZXcgU2V0KHRtcCkpO1xyXG4gICAgICAgICAgICBsZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyMzODZjYjAnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdLnRvTG93ZXJDYXNlKCkgPT09IHRtcFtqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGNvbG9yaW5nIHRvIHRoZSBtZXRhZGF0YWNvbG9yIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAvLyBzZXQgdmFsdWVzIG9mIGlucHV0c1xyXG4gICAgICAgICAgICAvLyBoZXJlIGFyZSBhdXRvbWF0aWNhbGx5IGlucHV0IHZhbHVlcyBjYWxjdWxhdGVkXHJcbiAgICAgICAgICAgIC8vIC4yNSBhbmQgLjc1IHBlcmNlbnRpbGVzIGFyZSB1c2VkXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYmxBdmcgPSBkMy5xdWFudGlsZSh0bXAsIDAuMjUpOyAvLyBiZWxvdyBhdmVyYWdlIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBhYkF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC43NSk7IC8vIGFib3ZlIGF2ZXJhZ2VcclxuICAgICAgICAgICAgJCgnI2JsLWF2ZycpLnZhbChibEF2Zyk7XHJcbiAgICAgICAgICAgICQoJyNhYi1hdmcnKS52YWwoYWJBdmcpO1xyXG4gICAgICAgICAgICAvLyBjb2xvciB0aGUgYW5pbWFsc1xyXG4gICAgICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBncm91cCBtZXRhZGF0YSBpbnB1dCBzcGlubmVyXHJcbiAgICAgKiArLy0gMC4xIHRvIHRoZSBpbnB1dCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIG9sZFZhbHVlID0gYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKCkudHJpbSgpLFxyXG4gICAgICAgICAgICBuZXdWYWwgPSAwO1xyXG5cclxuICAgICAgICBpZiAoYnRuLmF0dHIoJ2RhdGEtZGlyJykgPT0gJ3VwJykge1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSArIDAuMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBwYXJzZUZsb2F0KG9sZFZhbHVlKSAtIDAuMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZChuZXdWYWwgKiAxMDApIC8gMTAwOyAtXHJcbiAgICAgICAgYnRuLmNsb3Nlc3QoJy5udW1iZXItc3Bpbm5lcicpLmZpbmQoJ2lucHV0JykudmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBjb2xvcmluZ1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgaW5wdXQgZmllbGRzIGNoYW5nZVxyXG4gICAgICovXHJcbiAgICAkKCcubnVtYmVyLXNwaW5uZXIgaW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBhbGwgbWV0YWRhdGEgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICAkKCcjbWV0YWRhdGEtcmVzZXQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5oaWRlKCk7XHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBoaWVyYXJjaHkvZGVuZGdyb2dyYW0gbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBoX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBkZW5kZ3JvZ3JhbSBzbGlkaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0U2hvd0RlbmRyb2dyYW1MaXN0ZW5lcihpZCkge1xyXG5cclxuICAgICAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLScgKyBpZCkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGlja2VkQnV0dG9uSUQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgYnV0dG9ucyBhbmQgY3VzdG9tIGhpZ2hsaWdodCBqdXN0IG9uZSBvciBub25lXHJcbiAgICAgICAgICAgICQoJy5zaG93LWRlbmRyb2dyYW0nKS5lYWNoKGZ1bmN0aW9uKGksIGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gYWN0aXZlIGZvdW5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoYnV0dG9uKS5hdHRyKCdpZCcpID09PSBjbGlja2VkQnV0dG9uSUQgJiYgJChidXR0b24pLmhhc0NsYXNzKCdidG4tcHJpbWFyeScpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGJ1dHRvbikuZmluZCgnI2J0bi1sZWZ0JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLXJpZ2h0Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gYWRkIGhlcmUgYSByZXNpemUgb2YgdGhlIG1haW4gdmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5pbnNlcnRBZnRlcigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0gLy8gcmVtb3ZlIGhpZ2hsaWdodFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKCcjYnRuLWxlZnQnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChidXR0b24pLmZpbmQoJyNidG4tcmlnaHQnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvdyBkZW5kcm9ncmFtXHJcbiAgICAgICAgICAgIGlmICgkKCcuc2hvdy1kZW5kcm9ncmFtLmJ0bi1wcmltYXJ5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS1wYW5lbCcpLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGRyYXdEZW5kcm9ncmFtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZXJhcmNoeSBidXR0b24gaW4gbmV0d29yayBtb2RhbCBvbiBjaGFuZ2VcclxuICAgICAqIExvYWQgZGF0YSBvciByZW1vdmUgaXRcclxuICAgICAqL1xyXG4gICAgJCgnLmhpZWFyY2h5LWNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjaGVja2JveCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBpZCA9IGNoZWNrYm94LmF0dHIoJ2RhdGEnKTtcclxuICAgICAgICBsZXQgbmFtZSA9IGNoZWNrYm94LmF0dHIoJ25hbWUnKTtcclxuICAgICAgICBsZXQgY2hlY2tlZCA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgJCgnLnNob3ctZGVuZHJvZ3JhbScpLmxlbmd0aCA8IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGdldE5ldHdvcmtIaWVyYXJjaHlEYXRhKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGFkZEhpZXJhcmNoeUJ1dHRvbihpZCwgbmFtZSk7XHJcbiAgICAgICAgICAgIGluaXRTaG93RGVuZHJvZ3JhbUxpc3RlbmVyKGlkKTtcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYnKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IG1heE51bWJlckhpZXJhcmNoaWVzKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01heCBudW1iZXIgb2YgaGllcmFyY2hpZXMgaXM6ICcgKyBtYXhOdW1iZXJIaWVyYXJjaGllcyk7XHJcbiAgICAgICAgLy9UT0RPIGltcGxlbWVudCB0aGlzIGhlcmVcclxuICAgICAgICAvLyBub3RpY2UgdXNlciB0aGF0IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBzaG93IG1vcmUgdGhhbiBuIGhpZXJhcmNoaWVzXHJcbiAgICAgICAgLy8gICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAvLyAgIDxzdHJvbmc+SW5mbyE8L3N0cm9uZz4gQXR0ZW50aW9uIHVzZXIgLlxyXG4gICAgICAgIC8vIDwvZGl2PlxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdG1wIHZhcmlhYmxlIHRvIHNhdmUgaWYgdGhlIGJ1dHRvbiB3aGljaCBpcyBnb2luZyB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIC8vIHdhcyBhY3RpdmVcclxuICAgICAgICAgICAgbGV0IHRtcEFjdGl2ZSA9ICQoJyNzaG93LWRlbmRyb2dyYW0tJyArIGlkKS5oYXNDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgc2V0SGllcmFyY2h5RGF0YSh7fSwgaWQpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlSGllcmFyY2h5QnV0dG9uKGlkKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBmaW5kIGJldHRlciB3YXkgaGVyZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2cuaCcgKyBpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZGVuZHJvZ3JhbSBhbmQgdGhlIHBhbmVsIGlmIHRoZSByZW1vdmVkIGVsZW1lbnQgd2FzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKHRtcEFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICQoJyNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2JykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNpemUgdGhlIG1haW4gc3ZnXHJcbiAgICAgICAgaWYgKCQoJy5zaG93LWRlbmRyb2dyYW0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzLWRpdicpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbGl6ZSB0aGUgbmV0d29yayBvbmx5IGluIHRoZSBjaG9vc2VuIGhpZXJhcmNoeVxyXG4gICAgICovXHJcbiAgICAkKCcubmV0d29yay1oaWVyYXJjaHktY2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmZvIGZvciB0aGUgY2xpY2tlZCBidXR0b25cclxuICAgICAgICBsZXQgY2hlY2tib3ggPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyByZXNldCBhbGwgdGhlIG90aGVyIGFjdGl2ZSBjaGVja2JveGVzXHJcbiAgICAgICAgJCgnLm5ldHdvcmstaGllcmFyY2h5LWNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICBjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmIChjaGVja2JveC5wcm9wKCdjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXR3b3JrIGlkXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoY2hlY2tib3guYXR0cignZGF0YScpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXROZXR3b3JrSGllcmFyY2h5KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWVyYXJjaHkgc2V0IHRoZW9yeSBidXR0b25zIC0gdW5pb24sIGludGVyc2VjdGlvbiwgc3ltbWV0cmljIGRpZmZlcmVuY2VcclxuICAgICAqL1xyXG4gICAgJCgnLnNldC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZmluZCgnaW5wdXQnKS5hdHRyKCdkYXRhJyk7XHJcbiAgICAgICAgc2V0U2V0T3BlcmF0aW9uKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgZHJhd0RlbmRyb2dyYW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vID0gO1xyXG5cclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgcGxheSBib29sZWFuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWUgLSBwYXVzZSAoZmFsc2UpIG9yIHBsYXkgKHRydWUpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0UGxheUJvb2xlYW4odmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHBsYXlCb29sZWFuID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGlzdGVuZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkKi9cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSxcclxuICAgIHN3YXJtRGF0YSxcclxuICAgIGFuaW1hbElkc1xyXG59IGZyb20gJy4uL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCAqIGFzIE5ldHdvcmsgZnJvbSAnLi4vbmV0d29yay5qcyc7XHJcblxyXG5leHBvcnQgbGV0IHNsaWRlcjsgLy8gdGltZSBzbGlkZXIgb2YgdGhlIGFwcFxyXG5leHBvcnQgbGV0IHRvb2x0aXA7IC8vIHRvb2x0aXAgZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBCcnVzaCBlbmQgZnVuY3Rpb25cclxuICogYWRkIGFjdGl2ZSBhbmltYWxzIHRvIHRoZSBhcnJheSBvciByZW1vdmUgdGhlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgbGV0IGFycmF5QW5pbWFscyA9IFNQVi5hcnJheUFuaW1hbHM7XHJcbiAgICBsZXQgYWN0aXZlQW5pbWFscyA9IFNQVi5hY3RpdmVBbmltYWxzO1xyXG4gICAgdmFyIHJlY3QgPSBkMy5ldmVudC5zZWxlY3Rpb247XHJcbiAgICAvL2l0ZXJhdGUgb3ZlciB0aGUgMTUxIGZpc2ggdG8gY2hlY2sgd2hpY2ggYXJlIGluIHRoZSBicnVzaFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbmltYWxJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcG9pbnQgPSBbYXJyYXlBbmltYWxzW2ldWydwJ11bMF0sIGFycmF5QW5pbWFsc1tpXVsncCddWzFdXTtcclxuICAgICAgICAvL2NoZWNrIHdoaWNoIGZpc2ggYXJlIGluICB0aGUgYnJ1c2hlZCBhcmVhXHJcbiAgICAgICAgaWYgKChyZWN0WzBdWzBdIDw9IHBvaW50WzBdKSAmJiAocG9pbnRbMF0gPD0gcmVjdFsxXVswXSkgJiZcclxuICAgICAgICAgICAgKHJlY3RbMF1bMV0gPD0gcG9pbnRbMV0pICYmIChwb2ludFsxXSA8PSByZWN0WzFdWzFdKSkge1xyXG4gICAgICAgICAgICAvLyBQb2ludCBpcyBpbiB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgYWN0aXZlQW5pbWFscy5wdXNoKGFycmF5QW5pbWFsc1tpXVsnYSddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTUFYuc2V0QWN0aXZlQW5pbWFscyhhY3RpdmVBbmltYWxzKTtcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgJCgnLmJydXNoJylcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB0b29sdGlwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRvb2x0aXAoKSB7XHJcbiAgICB0b29sdGlwID0gZDMuc2VsZWN0KCdkaXYudG9vbHRpcCcpXHJcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMCArICdweCcpXHJcbiAgICAgICAgLnN0eWxlKCd0b3AnLCAwICsgJ3B4JylcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvb2x0aXAgZnVuY3Rpb25cclxuICogQHBhcmFtIHtPYmplY3R9IGQgLSBkMyBkYXRhIG9iamVjdCB3aXRoIHRoZSBtZXRhZGF0YSBpbmZvcm1hdGlvblxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvb2x0aXBGdW5jdGlvbihkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkWydhJ10gPT09IGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pIHtcclxuICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAxMDApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyBUT0RPIG1ha2UgdGhpcyBtb2R1bGFyXHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1hbmltYWwtaWQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zcGVjaWVzJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc3BlY2llcyddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNleCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNpemUnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzaXplJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtd2VpZ2h0JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnd2VpZ2h0J10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB0aW1lIHNsaWRlciBhbmQgdGhlIGR5bmFtaWMgbmV0d29yayBzbGlkZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U2xpZGVycygpIHtcclxuICAgIC8vIHRpbWUgc2xpZGVyXHJcbiAgICBzbGlkZXIgPSAkKCcjc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IHN3YXJtRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHN0ZXA6IDI1LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBTUFYuc2V0SW5kZXhUaW1lKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHBhdXNlZCBhcHBseSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBOZXR3b3JrIHNsaWRlclxyXG4gICAgJCgnI25ldHdvcmstc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICAgICAgdmFsdWU6IDAuNSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgTmV0d29yay5zZXROZXR3b3JMaW1pdCh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdCcpLnZhbCh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vIHNldCB0ZXh0IGZvciB0aGUgZmlyc3QgaW5pdGlhbGl6YXRpb25cclxuICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKDAuNSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtYXggZnJvbSB0aGUgc2xpZGVyIHRoaXMgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGlja3NcclxuICAgIGxldCBtYXggPSBzbGlkZXIuc2xpZGVyKCdvcHRpb24nLCAnbWF4Jyk7XHJcbiAgICBsZXQgc3BhY2UgPSAxMDAgLyBtYXg7XHJcbiAgICAvL2FwcGVuZCB0aGUgbWludXRlIHRpY2tzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSA9IGkgKyAxNTAwKSB7XHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ1aS1zbGlkZXItdGlja1wiPjwvc3Bhbj4nKVxyXG4gICAgICAgICAgICAuY3NzKCdsZWZ0JywgKHNwYWNlICogaSkgKyAnJScpXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aW1lIHNsaWRlciB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdmFsdWUgZm9yIHRoZSB0aW1lIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVTbGlkZXIodmFsdWUpIHtcclxuICAgIHNsaWRlci5zbGlkZXIoJ3ZhbHVlJywgdmFsdWUpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8vIC8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG4vL1xyXG4vLyBpbXBvcnQge1xyXG4vLyAgICAgZ2V0U3VnZ2VzdGVkUGFyYW1ldGVyc1xyXG4vLyB9IGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuLy8gXHJcbi8vIGltcG9ydCB7XHJcbi8vICAgICBzZXRQbGF5Qm9vbGVhblxyXG4vLyB9IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG4vL1xyXG4vL1xyXG4vLyBleHBvcnQgbGV0IHRyYWNraW5nQm9vbGVhbiA9IGZhbHNlOyAvLyBib29sZWFuIGZvciBhY3RpdmUgdHJhY2tpbmdcclxuLy8gbGV0IHRyYWNrZWREYXRhID0gW107XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiBTZXQgdGhlIGJvb2xlYW4gdmFsdWUgaWYgdHJhY2tpbmcgc2hvdWxkIGJlIGFjdGl2YXRlZFxyXG4vLyAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gQm9vbGVhbiBmb3IgYWN0aXZlIHZhbHVlXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gc2V0VHJhY2tpbmdCb29sZWFuKHZhbHVlKSB7XHJcbi8vICAgICB0cmFja2luZ0Jvb2xlYW4gPSB2YWx1ZTtcclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICogUmVzZXRzIHRoZSB0cmFja2VkIGRhdGFcclxuLy8gICovXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiByZXNldFRyYWNrZWREYXRhKCkge1xyXG4vLyAgICAgdHJhY2tlZERhdGEgPSBbXTtcclxuLy8gICAgIHRyYWNraW5nQm9vbGVhbiA9IGZhbHNlO1xyXG4vLyAgICAgLy8gZGlzYWJsZSB0aGUgc2VuZCBidXR0b25cclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbi8vIH1cclxuLy9cclxuLy8gLyoqXHJcbi8vICAqIEFkZCBkYXRhIHRvIHRyYWNrZWREYXRhXHJcbi8vICAqIEBwYXJhbSB7TnVtZXJpY30gdGltZSAtIHRpbWUgb2YgdGhlIGZyYW1lXHJcbi8vICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBBcnJheSBvZiBhbmltYWxzIGlkcyBmb3IgdGhlIHNwZWNpZmljIGZyYW1lXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gYWRkVHJhY2tlZERhdGEodGltZSwgaWRzKSB7XHJcbi8vICAgICB0cmFja2VkRGF0YS5wdXNoKHtcclxuLy8gICAgICAgICBbdGltZV06IEpTT04uc3RyaW5naWZ5KGlkcylcclxuLy8gICAgIH0pO1xyXG4vLyAgICAgLy8gZW5hYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b25cclxuLy8gICAgIGlmICgkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5pcygnOmRpc2FibGVkJykgJiYgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykuYXR0cignZGF0YScpID09IDApIHtcclxuLy8gICAgICAgICAkKCcjY2FsY3VsYXRlLXBhcmFtZXRlci1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vL1xyXG4vL1xyXG4vLyAvKipcclxuLy8gICogU2VuZCBkYXRhIHdpdGggYSBhamF4IHF1ZXJ5IHRvIHRoZSBzZXJ2ZXIgYW5kIHdhaXQgZm9yIHRoZSBhbnN3ZXJcclxuLy8gICovXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kVHJhY2tlZERhdGEoKSB7XHJcbi8vICAgICBkaXNhYmxlQ2FsY3VsYXRpb25CdXR0b24oKTtcclxuLy8gICAgIGdldFN1Z2dlc3RlZFBhcmFtZXRlcnMoSlNPTi5zdHJpbmdpZnkodHJhY2tlZERhdGEpKTtcclxuLy8gICAgIHJlc2V0VHJhY2tlZERhdGEoKTtcclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICogUmVzcG9uc2Ugb2YgdGhlIGFqYXggcXVlcnkgLSBvcGVuIG5ldyB0YWIgd2l0aCB2YWx1ZXMgdG8gY3JlYXRlIG5ldHdvcmtcclxuLy8gICovXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiByZXNwb25zZVBhcmFtZXRlcnMoZGF0YSkge1xyXG4vLyAgICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4vLyAgICAgLy8gb3BlbiBuZXR3b3JrIGNyZWF0ZSB1cmxcclxuLy8gICAgIGxldCB1cmwgPSAnLi4vLi4vbmV0d29yay9uZXc/ZGF0YXNldF9pZD0nICsgcGFyYW1ldGVyc1snaWQnXSArICcmJyArICQucGFyYW0oZGF0YVsnZGF0YSddWydtYXhfcGFyYW1zJ10pO1xyXG4vLyAgICAgLy8gY3JlYXRlIG5ldyB0YWIgd2l0aCB0aGUgcmVzdWx0IHBhcmFtZXRlclxyXG4vLyAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbi8vICAgICBlbmFibGVDYWxjdWxhdGlvbkJ1dHRvbigpO1xyXG4vLyB9XHJcbi8vXHJcbi8vXHJcbi8vIC8qKlxyXG4vLyAgKiBEaXNhYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b24gLT4gbG9hZGluZyBzeW1ib2xcclxuLy8gICovXHJcbi8vIGZ1bmN0aW9uIGRpc2FibGVDYWxjdWxhdGlvbkJ1dHRvbigpIHtcclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZWZyZXNoIGdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGVcIj48L3NwYW4+TG9hZGluZycpO1xyXG4vLyAgICAgJCgnI2NhbGN1bGF0ZS1wYXJhbWV0ZXItYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmF0dHIoJ2RhdGEnLCAxKTtcclxuLy9cclxuLy8gfVxyXG4vL1xyXG4vLyAvKipcclxuLy8gICogRW5hYmxlIHRoZSBjYWxjdWxhdGlvbiBidXR0b24gcmVtb3ZlIGxvYWRpbmcgc3ltYm9sXHJcbi8vICAqL1xyXG4vLyBmdW5jdGlvbiBlbmFibGVDYWxjdWxhdGlvbkJ1dHRvbigpIHtcclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10YXNrc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5DYWxjdWxhdGUnKTtcclxuLy8gICAgICQoJyNjYWxjdWxhdGUtcGFyYW1ldGVyLWJ1dHRvbicpLmF0dHIoJ2RhdGEnLCAwKTtcclxuLy9cclxuLy8gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS92aXN1YWxfcGFyYW1ldGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBJY29ucyBmb3IgYm9vdHN0cmFwIDQgKi9cXHJcXG5cXHJcXG4ubWRpOjpiZWZvcmUge1xcclxcbiAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiA0cHg7XFxyXFxufVxcclxcblxcclxcbi5idG4teHMgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1zbSAubWRpOjpiZWZvcmUge1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIHRvcDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZHJvcGRvd24tbWVudSAubWRpIHtcXHJcXG4gICAgd2lkdGg6IDE4cHg7XFxyXFxufVxcclxcblxcclxcbi5kcm9wZG93bi1tZW51IC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiA0cHg7XFxyXFxuICAgIGxlZnQ6IC04cHg7XFxyXFxufVxcclxcblxcclxcbi5uYXYgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciAubmF2YmFyLXRvZ2dsZSAubWRpOjpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogNHB4O1xcclxcbiAgICBjb2xvcjogI0ZGRjtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgYTpob3ZlciB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJyZWFkY3J1bWIgYTpob3ZlciBzcGFuIHtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5hbGVydCAubWRpOjpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogNHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uIC5tZGk6OmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXItYnJhbmQgLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDJweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XFxyXFxufVxcclxcblxcclxcbi5saXN0LWdyb3VwLWl0ZW0gLm1kaTo6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDNweDtcXHJcXG4gICAgbGVmdDogLTNweFxcclxcbn1cXHJcXG5cXHJcXG4vKiBTVkcgZWxlbWVudHMgYW5kIHRleHQgKi9cXHJcXG5cXHJcXG4jbWFpbi12aXMge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW4tdmlzLWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jaGllcmFyY2h5LWxlZ2VuZC1kaXYge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbi12aXMtbGVnZW5kIHtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxuICAgIHRvcDogMTBweDtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2hpZXJhcmNoeS1sZWdlbmQge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudC1kZW5kcm9ncmFtIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWxpbmUtY2hhcnQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvICovXFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiAxNyU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1kZW5kcm9ncmFtLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBwYXRoIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgbGluZSB7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjM7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLngge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnkge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMtbGluZS1jaGFydCBwYXRoIGxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVGltZSAgKi9cXHJcXG5cXHJcXG4uZnJhbWUtdGV4dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2xpZGVyIHRpY2tzICAqL1xcclxcblxcclxcbi51aS1zbGlkZXItdGljayB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgd2lkdGg6IDNweDtcXHJcXG4gICAgYmFja2dyb3VuZDogIzMzN2FiNztcXHJcXG4gICAgaGVpZ2h0OiAwLjhlbTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBMYW9kaW5nIGdpZiAgICovXFxyXFxuXFxyXFxuI2xvYWRpbmcge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBsZWdlbmQgICAgKi9cXHJcXG5cXHJcXG4ubGVnZW5kIHtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZS1jaGFydC1sZWdlbmQtdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpbWUtbGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qc3dhcm0gZmVhdHVyZXMgKi9cXHJcXG5cXHJcXG4uY2VudHJvaWQge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5tZWRvaWQge1xcclxcbiAgICBmaWxsOiAjZTcyOThhICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaHVsbC1wYXRoIHtcXHJcXG4gICAgZmlsbDogI2ZmZjtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZXJhcmNoeS1ncm91cCB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTA7XFxyXFxuICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XFxyXFxuICAgIG9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGF1bmF5LXRyaWFuZ3VsYXRpb24ge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC40O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBicmV3ZXIgcGlja2VyIGRpdiAqL1xcclxcblxcclxcbi5wYWxldHRlIHtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZTtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXHJcXG4gICAgbWFyZ2luOiA0cHggMCA0cHggNHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYWFhO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhdGNoIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICB3aWR0aDogMjJweDtcXHJcXG4gICAgaGVpZ2h0OiAyMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udm9yb25vaSB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi8qIFRvb2x0aXAgKi9cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDI1NSkgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICMxYjgwOWUgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXHJcXG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbmRpdi50b29sdGlwIHRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi50b29sdGlwLXNwYW4ge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxufVxcclxcblxcclxcbi51cHBlci1vdXRlci1hcmVhLCAubG93ZXItb3V0ZXItYXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzc0YTljZjtcXHJcXG4gICAgc3Ryb2tlOiAjMzY5MGMwO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXItaW5uZXItYXJlYSwgLmxvd2VyLWlubmVyLWFyZWEge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIGZpbGw6ICMwNDVhOGQ7XFxyXFxuICAgIHN0cm9rZTogIzAyMzg1ODtcXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhbi1saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNTI1MjUyO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDU7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5OTk7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkICM0ZDRkNGQ7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMXB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuNCk7XFxyXFxufVxcclxcblxcclxcbi56b29tIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLnguYXhpcy1saW5lLWNoYXJ0Pmc+dGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgbGkge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHNwYW4ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYmwtYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzdmYzk3ZjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYzA4NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYWItYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM4NmNiMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmstZWRnZXMge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmstYmFja2dyb3VuZC1lZGdlcyB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjU7XFxyXFxuICAgIHN0cm9rZTogIzczNzM3MztcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUgdGV4dCB7XFxyXFxuICAgIGZvbnQ6IDEycHggc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vZGUtLWludGVybmFsIHRleHQge1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggMCAjZmZmLCAwIC0xcHggMCAjZmZmLCAxcHggMCAwICNmZmYsIC0xcHggMCAwICNmZmY7XFxyXFxufVxcclxcblxcclxcbi5saW5rIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNjM2MzYzO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FjdGl2ZS1uZXR3b3JrLW5hbWUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICMyOTYyOTI7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUtbGV2ZWwge1xcclxcbiAgICBmaWxsOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4jZGVuZHJvZ3JhbS1wYW5lbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmVcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctZGVuZHJvZ3JhbSB7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1kZW5kcm9ncmFtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbmRyb2dyYW0tdGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTBlbSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlnaGxpZ2h0LWhpZXJhcmNoeSB7XFxyXFxuICAgIGZpbGw6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxMDtcXHJcXG4gICAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcbn1cXHJcXG5cXHJcXG4uYW5pbWFsLWhpZ2hsaWdodCB7XFxyXFxuICAgIGZpbGw6ICNjNTFiN2QgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYgLmJ0biBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWJ1dHRvbnMtZGl2IC5idG4uYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tYnV0dG9ucy1kaXYge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNkZW5kcm9ncmFtLWxlZ2VuZCB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaW50ZXJzZWN0aW9uIHtcXHJcXG4gICAgZmlsbDogdXJsKCNzdHJpcGVkKSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICM2NzAwMGQ7XFxyXFxufVxcclxcblxcclxcbi5zeW0tZGlmZmVyZW5jZSB7XFxyXFxuICAgIGZpbGw6IHVybCgjc3RyaXBlZCkgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjNjcwMDBkO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtbGcge1xcclxcbiAgICBtYXgtd2lkdGg6IDgwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhY2tncm91bmQtaW1hZ2Uge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=