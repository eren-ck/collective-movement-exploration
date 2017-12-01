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
/* harmony export (immutable) */ __webpack_exports__["setNetworkHierarchy"] = setNetworkHierarchy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__metadata_js__ = __webpack_require__(6);
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
let networkHierarchy = {}; // network data



/**
 * Get the basic data to get the tool running.
 * after the pending ajax queries are finished
 * the tool is drawn
 */
$(document).ready(function() {
    // console.log(parameters);

    // get the movement data
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["h" /* streamMovementData */]();

    // get the dataSetPercentile
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["e" /* getPercentile */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["g" /* getSwarmFeatures */]();

    // get the metadata and initialize the metada window
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["b" /* getMetaData */]();

    // get the information if there are already networks created for this dastaset
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["d" /* getNetworkDataButton */]();

    // if all ajax queries are compelte initialize
    (function() {
        function checkPendingRequest() {
            if ($.active > 0) {
                window.setTimeout(checkPendingRequest, 100);
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view_js__["m" /* spatialViewInit */])();
            }
        }
        window.setTimeout(checkPendingRequest, 100);
    })();

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
    Object(__WEBPACK_IMPORTED_MODULE_2__metadata_js__["b" /* initializeMetaddata */])();
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
function setNetworkHierarchy(value) {
    networkHierarchy = value;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interaction_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hierarchy_js__ = __webpack_require__(11);
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

    //append delaunayTriangulation group
    tank.append('g')
        .attr('id', 'delaunayTriangulationGroup');

    //append voronoi group
    tank.append('g')
        .attr('id', 'vornoiGroup');

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

    // init stuff from other modules
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["c" /* initTooltip */])();
    Object(__WEBPACK_IMPORTED_MODULE_4__interaction_js__["b" /* initSliders */])();
    Object(__WEBPACK_IMPORTED_MODULE_8__legend_js__["a" /* addSpatialViewGroup */])();
    Object(__WEBPACK_IMPORTED_MODULE_6__color_picker_js__["b" /* initColorPicker */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["a" /* lineChart */])();
    Object(__WEBPACK_IMPORTED_MODULE_7__listener_js__["a" /* initListeners */])();
    Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["b" /* init_dendrogram */])();
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
            //change the time frame text
            svgContainer.select('.frameText')
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']);
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
                        return Object(__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* networkColorScale */])(d['val']);
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
                var hullPath = tank.selectAll('path.hullPath')
                    .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["swarmData"][indexTime]['convex_hull']]);

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

            // draw hierarchy
            Object(__WEBPACK_IMPORTED_MODULE_9__hierarchy_js__["a" /* draw_dendrogram */])();

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["f"] = setNetworkAuto;
/* harmony export (immutable) */ __webpack_exports__["e"] = setNetworLimit;
/*eslint-disable no-unused-lets*/
/*global window, $, d3 */

let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0;
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
 * Add the network select buttons to the webinterface
 * @param {array} data - Array of network data
 */
function addNetworkButtons(data) {
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['finished']) {
                $('#networks-modal-body')
                    .append('<button type="button" class="btn btn-default btn-lg btn-block" data=' +
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = disablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["b"] = enablePlayButton;
/* harmony export (immutable) */ __webpack_exports__["c"] = percentiles;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(8);
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addSpatialViewGroup;
/* harmony export (immutable) */ __webpack_exports__["b"] = changeLegend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_js__ = __webpack_require__(5);
/*eslint-disable no-unused-lets*/
/*global window, d3,*/





let svgLegend; // svg container for the legend
let tankWidth; // spatial view width
let tankHeight; // spatial view height

/**
 * Add the group to the svg where the legend for the color legend is
 * TODO change this - so that the legend is also responsive
 */
function addSpatialViewGroup() {
    tankWidth = __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["o" /* tankWidth */];
    tankHeight = __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["n" /* tankHeight */];

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
}

/**
 * Change the color legend
 *
 */
function changeLegend() {
    var legend; // the color legend
    var legendText; // color legend text
    // vars for the legend
    var legendWidth = tankWidth * 0.08;
    var legendHeight = tankHeight * 0.04;
    var differentColors = 0;

    //change the colors of the animals
    if (__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["b" /* activeScale */] !== 'black') {
        var tmpScale = Object(__WEBPACK_IMPORTED_MODULE_1__color_picker_js__["c" /* returnColorScale */])();
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorScale; });
/* harmony export (immutable) */ __webpack_exports__["c"] = returnColorScale;
/* harmony export (immutable) */ __webpack_exports__["b"] = initColorPicker;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__legend_js__ = __webpack_require__(4);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["e"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["g"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkDataButton;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["f"] = getSwarmDatasetFeature;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNetworkData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(3);
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
 * Get the network and network hierarchy for the specific network_id
 * @param {String} network_id - unique network id of a dataset.
 */
function getNetworkData(network_id) {
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
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setNetworkData"])(JSON.parse(data[0]['data']));
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setNetworkHierarchy"])(JSON.parse(data[0]['hierarchy']));
            }
        }
    });

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(5);
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
            $('#main-vis .frameText').show();
        } else {
            $('#main-vis .frameText').hide();
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
            // load absolute feature speed data once
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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getSwarmDatasetFeature */])('medoid');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getSwarmDatasetFeature */])('centroid');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getSwarmDatasetFeature */])('convex_hull');

            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#draw-triangulation').click(function() {
        if ($('#draw-triangulation').is(':checked')) {
            if (!('triangulation' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getSwarmDatasetFeature */])('triangulation');

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
                Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["f" /* getSwarmDatasetFeature */])('voronoi');

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

        Object(__WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__["c" /* getNetworkData */])(network_id);
        $('#network-div').modal('toggle');
        $('#show-dendrogram-div').removeClass('hidden');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkHierarchy"])({});
        // remove the dendrogram if it is visualized
        $('#show-dendrogram-div').addClass('hidden');
        $('#show-dendrogram').removeClass('active');
        $('#btn-left').removeClass('hidden');
        $('#btn-right').addClass('hidden');

        $('#dendrogram-vis').hide();
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

    $('#show-dendrogram-div').hover(function() {
        $(this).stop().animate({
            'marginRight': '0px',
        }, 500);
    }, function() {
        $(this).stop().animate({
            'marginRight': '-110px',
        }, 500);
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

function h_listeners() {
    $('#show-dendrogram').click(function() {
        if ($('#show-dendrogram').hasClass('active') === true) {
            // remove the dendrogram
            $(this).find('#btn-left').removeClass('hidden');
            $(this).find('#btn-right').addClass('hidden');
            // TODO add here a resize of the main vis
            $('#dendrogram-vis').hide();
            if ($('#main-vis-div').attr('class') === 'col-md-8') {
                $('#main-vis-div').removeClass('col-md-8');
                $('#main-vis-div').addClass('col-md-12');

            }

        } else {
            // add teh dendrogram
            $(this).find('#btn-left').addClass('hidden');
            $(this).find('#btn-right').removeClass('hidden');
            // TODO add here a resize of the main vis
            $('#dendrogram-vis').show();
            if ($('#main-vis-div').attr('class') === 'col-md-12') {
                $('#main-vis-div').removeClass('col-md-12');
                $('#main-vis-div').addClass('col-md-8');

            }

        }
    });
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
let trendChartsElem = ['lowerOuterArea', 'lowerInnerArea', 'medianLine', 'upperInnerArea', 'upperOuterArea'];
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

        $('.feature-check-box').append(`<div class="feature-check-box-default lineChartCheckBox">
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
    $('.lineChartCheckBox').addClass('disabled');
    $('.lineChartLine').attr('visibility', 'hidden');
}

/**
 * Line chart details click listener
 */
function enableLineChart() {
    $('.lineChartButton').prop('checked', true).prop('disabled', false);
    $('.lineChartCheckBox').removeClass('disabled');
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
            trendChartData.push(Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* percentiles */])(tmp));
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = init_dendrogram;
/* harmony export (immutable) */ __webpack_exports__["a"] = draw_dendrogram;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window,$, d3*/
// import * as spv from './spatial_view.js';





let zoomGroup;
let treemap;

function init_dendrogram() {
    let margin = 20,
        width = 5000,
        height = 5000;
    // animal_ids.length * 30
    let zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on('zoom', function() {
            //constrained zooming
            // modify the translate so that it never exits the tank
            d3.event.transform.x = Math.min(0, width * (d3.event.transform.k - 1),
                Math.max(width * (1 - d3.event.transform.k), d3.event.transform.x));

            d3.event.transform.y = Math.min(0, height * (d3.event.transform.k - 1),
                Math.max(height * (1 - d3.event.transform.k), d3.event.transform.y));

            // translate and scale
            zoomGroup.attr('transform', d3.event.transform);
        });

    let svg = d3.select('#dendrogram-vis')
        .classed('svg-dendrogramContainer', true)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        // add the class svg-content
        .classed('svg-content', true)
        .attr('id', 'main-vis-svg')
        .call(zoom);

    zoomGroup = svg.append('g')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .append('svg:g');

    treemap = d3.tree() //d3.cluster()
        .size([(height - margin), (width - margin)]);
}


function draw_dendrogram() {
    // console.log(networkHierarchy);

    // console.log(networkHierarchy[indexTime]);
    // hide if no network is choosen
    if ($('#show-dendrogram').hasClass('active') === true && !$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"])) {
        // console.log('hey');
        // $('#dendrogram-vis').show();
        // if ($('#main-vis-div').attr('class') === 'col-md-12') {
        //     $('#main-vis-div').removeClass('col-md-12');
        //     $('#main-vis-div').addClass('col-md-8');
        // }


        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["g" /* indexTime */]];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

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
            // .transition()
            // .duration(duration)
            .attr('d', diagonalLines);
        // EXIT
        link.exit()
            .remove();


        // DATA JOIN - nodes
        // adds each node as a group
        let node = zoomGroup
            .selectAll('.node')
            .data(nodes.descendants());

        var nodeEnter = node.enter()
            .append('g')
            .attr('class', function(d) {
                return 'node' +
                    (d.children ? ' node--internal' : ' node--leaf');
            })
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        // ENTER
        nodeEnter.append('circle')
            .attr('r', 20)
            .on('click', click);

        // UPDATE
        //.transition()
        // .duration(duration)
        nodeEnter
            // .transition()
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        // .transition()
        // .duration(duration)
        node
            // .transition()
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
        // .style('opacity', 1);

        // .transition()
        // .duration(duration)
        // EXIT
        node.exit()
            .remove();


        // adds the text to the node
        // node.append('text')
        //     .attr('dy', '.35em')
        //     .attr('x', function(d) {
        //         return d.children ? -13 : 13;
        //     })
        //     .style('text-anchor', function(d) {
        //         return d.children ? 'end' : 'start';
        //     })
        //     .text(function(d) {
        //         return d.data.name;
        //     });


    }
    // else {
    // $('#dendrogram-vis').hide();
    // if ($('#main-vis-div').attr('class') === 'col-md-8') {
    //     $('#main-vis-div').removeClass('col-md-8');
    //     $('#main-vis-div').addClass('col-md-12');
    // }
    // }
}

function diagonalLines(d) {
    return 'M' + d.x + ',' + d.y +
        'V' + d.parent.y + 'H' + d.parent.x;


    // return 'M' + d.x + ',' + d.y +
    //     'C' + (d.x + d.parent.x) / 2 + ',' + d.y +
    //     ' ' + (d.x + d.parent.x) / 2 + ',' + d.parent.y +
    //     ' ' + d.parent.x + ',' + d.parent.y;
}

// Toggle children on click.
function click(d) {
    console.log('Hey there');
    console.log(d);
    // if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    // } else {
    //     d.children = d._children;
    //     d._children = null;
    // }
    // draw_dendrogram(d);
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
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-content-legend {\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-legendContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 10%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: hidden;\r\n}\r\n\r\n.svg-LineChartContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-dendrogramContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: auto;\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n#dendrogram-vis>svg:nth-child(1) {\r\n    z-index: 1;\r\n    background: white;\r\n}\r\n\r\n#dendrogram-vis {\r\n    display: none\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axisLineChart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frameText {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legendText {\r\n    font-size: 1.5em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.lineChartlegendText {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.timeLine {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hullPath {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.delaunayTriangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.lineChartCheckBox.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upperOuterArea, .lowerOuterArea {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upperInnerArea, .lowerInnerArea {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.medianLine {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axisLineChart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.networkEdges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n\r\n.node text {\r\n    font: 12px sans-serif;\r\n}\r\n\r\n.node--internal text {\r\n    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;\r\n}\r\n\r\n.link {\r\n    fill: none;\r\n    stroke: #636363;\r\n    stroke-width: 5px;\r\n}\r\n\r\n#show-dendrogram-div {\r\n    margin-right: -110px;\r\n}", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmE3NzM4ZTMyZWNmN2ViYzUzN2IiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGluZV9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2hpZXJhcmNoeS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2V4cGxvcmUuY3NzP2RlNGMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdDOztBQUlBOztBQUVEO0FBQ0E7O0FBRUEsaUJBQXdCO0FBQ3hCLHlCQUFnQztBQUNoQyxtQkFBMEI7QUFDMUIsMkJBQWtDO0FBQ2xDLHFCQUE0QjtBQUM1QiwwQkFBaUM7Ozs7QUFJakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSkE7QUFBQTtBQUNBO0FBQ0E7QUFLQzs7QUFPQTs7QUFNQTs7QUFJQTs7QUFRQTs7QUFJQTs7QUFLQTs7QUFLQTs7QUFJQTs7QUFLQTs7QUFFRCxrQkFBeUI7QUFDekI7QUFDQTtBQUNBLDBCQUFpQztBQUNqQyxzQkFBNkI7QUFDN0IsdUJBQThCO0FBQzlCLGlCQUF3QjtBQUN4QixlQUFzQjs7QUFFdEIsaUJBQWlCO0FBQ2pCLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpRUFBb0I7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHNEQUFzRCxpQ0FBaUMsZUFBZSxhQUFhOztBQUVuSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUJBQXlCO0FBQ3hELHVDQUF1Qyx5QkFBeUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLG1DQUFtQyxvQkFBb0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBa0U7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7O0FBSUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVNQTtBQUFBO0FBQ0E7O0FBRUE7O0FBSUM7O0FBS0E7O0FBSUE7O0FBTUE7OztBQU1BOztBQVFBOztBQU1BOztBQUlBOztBQUVELFVBQVU7QUFDVix1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBeUI7QUFDekIsbUZBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUVBQTRCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLHlFQUE0QjtBQUN2RCwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlFQUE0QjtBQUN2RDtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2bkJBO0FBQUE7QUFDQTtBQUlDOztBQUVEOztBQUVBOztBQUVBLFdBQWtCO0FBQ2xCLFlBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUZBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlFQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvSUE7QUFBQTtBQUNBO0FBSUM7O0FBS0E7O0FBSUE7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1FQUFzQjtBQUM3QztBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUVBQXNCO0FBQzdDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyaEJBO0FBQUE7QUFDQTtBQUNBOztBQUlDOztBQUlBOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsZ0JBQWdCOzs7QUFHaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztBQy9MQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJhNzczOGUzMmVjZjdlYmM1MzdiIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gICAgc3BhdGlhbFZpZXdJbml0XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplTWV0YWRkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG4vLyBpbXBvcnQgY3NzXHJcbmltcG9ydCAnLi9leHBsb3JlLmNzcyc7XHJcblxyXG5leHBvcnQgbGV0IGRhdGFzZXQgPSBbXTsgLy8gbWFpbiBkYXRhc2V0IHdpdGggdmFsdWVzIGZvciBlYWNoIGluZGl2aWR1YWwgYW5pbWFsXHJcbmV4cG9ydCBsZXQgZGF0YXNldE1ldGFkYXRhID0gW107IC8vIG1ldGFkYXRhc2V0IGZvciBlYWNoIGluZGl2aWR1YWwgZmlzaFxyXG5leHBvcnQgbGV0IHN3YXJtRGF0YSA9IFtdOyAvLyBzd2FybWRhdGEgZm9yIGxpbmVjaGFydCBhbmQgYWxzbyBvdGhlciBzd2FybSBmZWF0dXJlc1xyXG5leHBvcnQgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0ge307IC8vIHBlY2VudGlsZXMgbmVlZGVkIGZvciB0aGUgY29sb3IgbWFwcGluZ1xyXG5leHBvcnQgbGV0IG5ldHdvcmtEYXRhID0ge307IC8vIG5ldHdvcmsgZGF0YVxyXG5leHBvcnQgbGV0IG5ldHdvcmtIaWVyYXJjaHkgPSB7fTsgLy8gbmV0d29yayBkYXRhXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGJhc2ljIGRhdGEgdG8gZ2V0IHRoZSB0b29sIHJ1bm5pbmcuXHJcbiAqIGFmdGVyIHRoZSBwZW5kaW5nIGFqYXggcXVlcmllcyBhcmUgZmluaXNoZWRcclxuICogdGhlIHRvb2wgaXMgZHJhd25cclxuICovXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtb3ZlbWVudCBkYXRhXHJcbiAgICBxdWVyaWVzLnN0cmVhbU1vdmVtZW50RGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgZGF0YVNldFBlcmNlbnRpbGVcclxuICAgIHF1ZXJpZXMuZ2V0UGVyY2VudGlsZSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBxdWVyaWVzLmdldFN3YXJtRmVhdHVyZXMoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIG1ldGFkYXRhIGFuZCBpbml0aWFsaXplIHRoZSBtZXRhZGEgd2luZG93XHJcbiAgICBxdWVyaWVzLmdldE1ldGFEYXRhKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBpZiB0aGVyZSBhcmUgYWxyZWFkeSBuZXR3b3JrcyBjcmVhdGVkIGZvciB0aGlzIGRhc3Rhc2V0XHJcbiAgICBxdWVyaWVzLmdldE5ldHdvcmtEYXRhQnV0dG9uKCk7XHJcblxyXG4gICAgLy8gaWYgYWxsIGFqYXggcXVlcmllcyBhcmUgY29tcGVsdGUgaW5pdGlhbGl6ZVxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGVuZGluZ1JlcXVlc3QoKSB7XHJcbiAgICAgICAgICAgIGlmICgkLmFjdGl2ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrUGVuZGluZ1JlcXVlc3QsIDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzcGF0aWFsVmlld0luaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgfSkoKTtcclxuXHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQ29uY2FjdCB0byB0aGUgbWFpbiBkYXRhc2V0XHJcbiAqIHRoZSBpZGVhIGlzIHRvIHVzZSB0aGlzIG9uZSBkYXkgZm9yIGxhenkgbG9hZGluZ1xyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIG1vdmVtZW50IGRhdGFzZXRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRhc2V0KHZhbHVlKSB7XHJcbiAgICBkYXRhc2V0ID0gZGF0YXNldC5jb25jYXQodmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGRhdGFzZXQgcGVyY2VudGlsZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5IG9mIGFycmFyeXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhU2V0UGVyY2VudGlsZSh2YWx1ZSkge1xyXG4gICAgZGF0YVNldFBlcmNlbnRpbGUgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IG1ldGFkYXRhXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNZXRhRGF0YSh2YWx1ZSkge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhID0gdmFsdWU7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YSgpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBzd2FybSBkYXRhc2V0XHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBzd2FybSB2YWx1ZXMgY29uc2lzdGluZyBvZiBbZmVhdHVyZV8wLGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgdGhlIG9iamVjdCB0byB0aGUgYXJyYXkgaWYgdGhlcmUgaXMgbm8gZWxlbWVudCB5ZXRcclxuICAgICAgICBpZiAodHlwZW9mIHN3YXJtRGF0YVtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3dhcm1EYXRhLnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaW50ZWdlciBvciBmbG9hdFxyXG4gICAgICAgIGlmIChkYXRhW2ldICYmICEoaXNOYU4oZGF0YVtpXSkpKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YVtpXVtmZWF0dXJlXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlzIHN0cmluZ1xyXG4gICAgICAgICAgICBzd2FybURhdGFbaV1bZmVhdHVyZV0gPSBkYXRhW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBuZXcgZmVhdHVyZSBkaW1lbnNpb24gdG8gdGhlIGRhdGFzZXRcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIGZlYXR1cmVzIHZhbHVlcyBjb25zaXN0aW5nIG9mIFtmZWF0dXJlXzAsIGZlYXR1cmVfMSwuLi5dXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZWF0dXJlIC0gc3RyaW5nIGFycmF5IG9mIHRoZSBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YXNldEZlYXR1cmUoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gYWRkIHRoZSB0aGUgb2JqZWN0IHRvIHRoZSBhcnJheSBpZiB0aGVyZSBpcyBubyBlbGVtZW50IHlldFxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YXNldFtpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGFyc2UgdGhlIGludFxyXG4gICAgICAgIGRhdGFzZXRbaV1bZmVhdHVyZV0gPSArZGF0YVtpXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHRoZSBjYWxjdWxhdGVkIGFkamFjZW5jeSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrRGF0YSh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0RhdGEgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBoaWVhcmhjeSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIEFycmF5IG9mIG9mIGFycmF5cyB3aXRoIGFsbCB2YWx1ZXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGhpZXJhcmNoeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtIaWVyYXJjaHkodmFsdWUpIHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHkgPSB2YWx1ZTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsZDMsIHBhcmFtZXRlcnMsIFNldCAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgbmV0d29ya0RhdGEsXHJcbiAgICBzd2FybURhdGFcclxufSBmcm9tICcuLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBuZXR3b3JrQ29sb3JTY2FsZSxcclxuICAgIG5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBuZXR3b3JrTGltaXRcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICBsaW5lQ2hhcnRSYXRpbyxcclxuICAgIHpvb21GdW5jdGlvblxyXG59IGZyb20gJy4uL2xpbmVfY2hhcnQnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHBlcmNlbnRpbGVzXHJcbn0gZnJvbSAnLi4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VGltZVNsaWRlcixcclxuICAgIGluaXRUb29sdGlwLFxyXG4gICAgdG9vbHRpcEZ1bmN0aW9uLFxyXG4gICAgaW5pdFNsaWRlcnMsXHJcbiAgICB0b29sdGlwXHJcbn0gZnJvbSAnLi9pbnRlcmFjdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbWV0YWRhdGFDb2xvclxyXG59IGZyb20gJy4uL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIsXHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRMaXN0ZW5lcnMsXHJcbiAgICBwbGF5Qm9vbGVhblxyXG59IGZyb20gJy4uL2xpc3RlbmVyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRfZGVuZHJvZ3JhbSxcclxuICAgIGRyYXdfZGVuZHJvZ3JhbVxyXG59IGZyb20gJy4uL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5leHBvcnQgbGV0IGluZGV4VGltZSA9IDA7IC8vIGFjdHVhbCB0aW1lIG1vbWVudCBpbiB0aGUgYW5pbWF0aW9uXHJcbmV4cG9ydCBsZXQgdGFua1dpZHRoO1xyXG5leHBvcnQgbGV0IHRhbmtIZWlnaHQ7XHJcbmV4cG9ydCBsZXQgYWN0aXZlU2NhbGUgPSAnYmxhY2snOyAvLyBjYW4gYmUgc3BlZWQsIGFjY2VsZXJhdGlvbiwgLi4gYW5kIGJsYWNrIChtZWFuaW5nIG5vIGFjdGl2ZSBzY2FsZSlcclxuZXhwb3J0IGxldCBtZWRvaWRBbmltYWwgPSAtMTsgLy8gd2hpY2ggYW5pbWFsIGlzIHRoZSBtZWRvaWQgKC0xIGlzIG5vIGFuaW1hbClcclxuZXhwb3J0IGxldCBhY3RpdmVBbmltYWxzID0gW107IC8vIGFjdGl2ZSBzZWxlY3RlZCBhbmltYWxzXHJcbmV4cG9ydCBsZXQgYXJyYXlBbmltYWxzOyAvLyBhcnJheSBvZiBhbmltYWxzIGZvciB0aGUgc3BlY2lmaWMgdGltZSBmcmFtZVxyXG5leHBvcnQgbGV0IGFuaW1hbF9pZHM7IC8vIGFycmF5IG9mIHVuaXF1ZSBhbmltYWwgaWRzXHJcblxyXG5sZXQgc3ZnQ29udGFpbmVyOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgc3BhdGlhbCB2aWV3XHJcbmxldCB0YW5rOyAvLyBzdmcgZ3JvdXAgZm9yIHRoZSBzcGF0aWFsIHZpZXcgdGFua1xyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBzcGF0aWFsIHZpZXcgd2l0aCBhbGwgdGhlIGltcG9ydGFudCBmYWN0b3JzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3BhdGlhbFZpZXdJbml0KCkge1xyXG5cclxuICAgIGxldCBtaW5Qb2ludCA9IHBhcmFtZXRlcnNbJ21pbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgbGV0IG1heFBvaW50ID0gcGFyYW1ldGVyc1snbWF4J11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyBsZXQgY29vcmRpbmF0ZU9yaWdpbiA9IHBhcmFtZXRlcnNbJ2Nvb3JkaW5hdGVfb3JpZ2luJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyB3aWR0aCA9IHdpZHRoICoxLjAyIC0tPiBzbyB0aGVyZSBpcyBhIG1hcmdpbiBpbiB0aGUgc3BhdGlhbCB2aWV3IHdoZXJlIG5vIGFuaW1hbCBpcyBldmVyXHJcbiAgICB0YW5rV2lkdGggPSAobWF4UG9pbnRbMF0gLSBtaW5Qb2ludFswXSkgKiAxLjAyO1xyXG4gICAgdGFua0hlaWdodCA9IChtYXhQb2ludFsxXSAtIG1pblBvaW50WzFdKSAqIDEuMDI7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgdmlldyByZXNpemFibGVcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21haW4tdmlzJykuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50J1xyXG4gICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJCgnI21haW4tdmlzLWRpdicpLndpZHRoKClcclxuICAgICAgICAgICAgfSkuaGVpZ2h0KHRhbmtIZWlnaHQgKiAwLjYpXHJcbiAgICAgICAgICAgIC53aWR0aCh0YW5rV2lkdGggKiAwLjYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9yZXNldCBhbGwgY2hlY2tib3hlc1xyXG4gICAgJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgLy9zZXQgdGhlIGNvbG9yIHNjYWxlIGZ1bmN0aW9uIHRvIGxpbmVhclxyXG4gICAgJCgnI2NvbG9yLXNjYWxlLWxpbmVhcicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNncm91cC1zaXplLW0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNzZXR0aW5ncy1kaXYgaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAvL2hpZGUgdGhlIGxvYWRpbmcgZ2lmXHJcbiAgICAkKCcjbG9hZGluZycpXHJcbiAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAvLyBnZXQgIG51bWJlciBvZiBkaXN0aW5jdCBhbmltYWwgaWRzXHJcbiAgICBsZXQgbnVtX2FuaW1hbHMgPSBuZXcgU2V0KCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YXNldFtpXVsndCddID09PSBkYXRhc2V0WzBdWyd0J10pIHtcclxuICAgICAgICAgICAgbnVtX2FuaW1hbHMuYWRkKGRhdGFzZXRbaV1bJ2EnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSA9IGRhdGFzZXQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFuaW1hbF9pZHMgPSBBcnJheS5mcm9tKG51bV9hbmltYWxzKS5zb3J0KCk7XHJcblxyXG4gICAgLy9YIGFuZCBZIGF4aXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKTtcclxuXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgIC50aWNrcyg3KVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgLy8gWk9PTUlORyBBTkQgUEFOTklORyBTVFVGRlxyXG4gICAgLy8gVE9ETyByZW1vdmUgdGhpcyBmcm9tIGhlcmUgdG8gaW50ZXJhY3Rpb25cclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgNl0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICAvLyBtb2RpZnkgdGhlIHRyYW5zbGF0ZSBzbyB0aGF0IGl0IG5ldmVyIGV4aXRzIHRoZSB0YW5rXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgdGFua1dpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rV2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgdGFua0hlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua0hlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVYKHgpKSk7XHJcbiAgICAgICAgICAgIGdZYXhpcy5jYWxsKHlBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWSh5KSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vdGhlIHN2ZyBjb250YWluZXJcclxuICAgIHN2Z0NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI21haW4tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG5cclxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvLCBmb3IgIDEyNDAvMTkwMCA9IDAuNjUgc28gcGFkZGluZy1ib3R0b20gPSA2NSUgKi9cclxuICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCh0YW5rSGVpZ2h0IC8gdGFua1dpZHRoKSAqIDEwMCk7XHJcbiAgICAkKCcjbWFpbi12aXMnKS5hcHBlbmQoJCgnPHN0eWxlPiNtYWluLXZpczo6YWZ0ZXIge3BhZGRpbmctdG9wOiAnICsgcGVyY2VudGFnZSArICclO2Rpc3BsYXk6IGJsb2NrO2NvbnRlbnQ6IFwiXCI7fTwvc3R5bGU+ICcpKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzdmdDb250YWluZXIuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAvLyAgLmF0dHIoJ2QnLHBhdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4bGluazpocmVmJywgJy8nICsgcGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFja2dyb3VuZEltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRhbmtXaWR0aClcclxuICAgICAgICAgICAgLy8gd2hpbGUgYWRkaW5nIGFuIGltYWdlIHRvIGFuIHN2ZyB0aGVzZSBhcmUgdGhlIGNvb3JkaW5hdGVzIGkgdGhpbmsgb2YgdGhlIHRvcCBsZWZ0XHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ2JhY2tncm91bmQnLCAnI2ZmZicpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgdGFuayBncm91cCB3aXRoIGEgdHJhbnNmb3JtYXRpb24gd2hpY2ggcm90YXRlcyB0aGUgeSBheGlzXHJcbiAgICB0YW5rID0gem9vbUdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0YW5rJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gMTtcclxuICAgICAgICAgICAgbGV0IHkgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF94KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeSkge1xyXG4gICAgICAgICAgICAgICAgeSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnc2NhbGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYWRkIHRoZSBjZW50cm9pZFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjZW50cm9pZCBoaWRkZW4nKVxyXG4gICAgICAgIC5hdHRyKCdyJywgNilcclxuICAgICAgICAuYXR0cignY3gnLCAwKVxyXG4gICAgICAgIC5hdHRyKCdjeScsIDApO1xyXG5cclxuICAgIC8vIGFycm93IGZvciB0aGUgY2VudHJvaWQgZGlyZWN0aW9uXHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtYXJyb3cnKVxyXG4gICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNjZW50cm9pZC1hcnJvdyknKTtcclxuXHJcbiAgICAvL2FwcGVuZCBuZXR3b3JrICBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICduZXR3b3JrR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBkZWxhdW5heVRyaWFuZ3VsYXRpb24gZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZGVsYXVuYXlUcmlhbmd1bGF0aW9uR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCB2b3Jvbm9pIGdyb3VwXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3Zvcm5vaUdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdGhlIGZyYW1lIHRpbWUgdGV4dFxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZyYW1lVGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAzMClcclxuICAgICAgICAuYXR0cigneScsIDMwKVxyXG4gICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIGxldCBnWWF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG4gICAgLy8gaW5pdCBzdHVmZiBmcm9tIG90aGVyIG1vZHVsZXNcclxuICAgIGluaXRUb29sdGlwKCk7XHJcbiAgICBpbml0U2xpZGVycygpO1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cCgpO1xyXG4gICAgaW5pdENvbG9yUGlja2VyKCk7XHJcbiAgICBsaW5lQ2hhcnQoKTtcclxuICAgIGluaXRMaXN0ZW5lcnMoKTtcclxuICAgIGluaXRfZGVuZHJvZ3JhbSgpO1xyXG4gICAgLy8gc3RhcnQgdGhlIGFuaW1hdGlvblxyXG4gICAgZHJhdygpO1xyXG59XHJcblxyXG4vKipcclxuICogRHJhd2luZyBmdW5jdGlvbiAtIGlzIGNhbGxlZCBmb3IgZWFjaCB0aW1lc3RlcFxyXG4gKiBpbmRleFRpbWUgc2F2ZXMgdGhlIGN1cnJlbnQgdGltZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoKSB7XHJcbiAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWUgb2YgZnVuY3Rpb24gZHJhd1xyXG4gICAgLy8gbGV0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgLy91cGRhdGUgdGltZSB0byB3YWl0IGFrYSBzcGVlZCBvZiByZXBsYXlcclxuICAgIGxldCB0aW1lVG9XYWl0ID0gJCgnaW5wdXRbbmFtZT1ncm91cDFdOmNoZWNrZWQnLCAnI2dyb3VwMScpXHJcbiAgICAgICAgLnZhbCgpO1xyXG4gICAgLy9zY2FsZSB0aGUgc2l6ZSBieSB0aGlzIG51bWJlclxyXG4gICAgbGV0IGFuaW1hbFNjYWxlID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLXNpemU6Y2hlY2tlZCcpXHJcbiAgICAgICAgLnZhbCgpO1xyXG5cclxuICAgIC8vZ2V0IHRoZSBuZXh0IGFuaW1hbHNcclxuICAgIGFycmF5QW5pbWFscyA9IGRhdGFzZXQuc2xpY2UoYW5pbWFsX2lkcy5sZW5ndGggKiBpbmRleFRpbWUsIGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lICsgYW5pbWFsX2lkcy5sZW5ndGgpO1xyXG5cclxuICAgIC8vdGhlIHRpbWVvdXQgaXMgc2V0IGFmdGVyIG9uZSB1cGRhdGUgMzAgbXNcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHRoZSB0aW1lIGZyYW1lIHRleHRcclxuICAgICAgICAgICAgc3ZnQ29udGFpbmVyLnNlbGVjdCgnLmZyYW1lVGV4dCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChNYXRoLmZsb29yKGluZGV4VGltZSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKGluZGV4VGltZSAvIHBhcmFtZXRlcnNbJ2ZwcyddKSAlIDYwICsgJzo6JyArIGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddKTtcclxuICAgICAgICAgICAgLy8gaWYgYSBzZWNvbmQgaGFzIGNoYW5nZWQgbW92ZSB0aGUgc2xpZGVyXHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZVNsaWRlcihpbmRleFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ZnQW5pbWFscyA9IHRhbmsuc2VsZWN0QWxsKCdnLmFuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShhcnJheUFuaW1hbHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTmV0d29yayB2aXNcclxuICAgICAgICAgICAgbGV0IG5ldHdvcmtWaXM7XHJcbiAgICAgICAgICAgIGlmIChpbmRleFRpbWUgaW4gbmV0d29ya0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXR3b3JrID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gbmV0d29ya0RhdGFbaW5kZXhUaW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMSddICsgJy0nICsgZFsnbm9kZTInXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTInXSArICctJyArIGRbJ25vZGUxJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtBdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXR3b3JrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2gobmV0d29ya1tpXVsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXROZXR3b3JMaW1pdChwZXJjZW50aWxlcyh0bXBBcnJheSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsgPSBuZXR3b3JrLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3ZhbCddID49IG5ldHdvcmtMaW1pdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShuZXR3b3JrKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVJcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrRWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3RBbGwoJ2xpbmUubmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIG5ldHdvcmtcclxuICAgICAgICAgICAgbmV0d29ya1Zpcy5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlbGF1bmF5IHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgLy8gREFUQSBKT0lOICAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgdmFyIHRyaWFuZ3VsYXRpb247XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy10cmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0KCcjZGVsYXVuYXlUcmlhbmd1bGF0aW9uR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGguZGVsYXVuYXlUcmlhbmd1bGF0aW9uJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbc3dhcm1EYXRhW2luZGV4VGltZV1bJ3RyaWFuZ3VsYXRpb24nXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbi5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBWb3Jvbm9pXHJcbiAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZhciB2b3Jvbm9pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctdm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vYXBwZW5kIHRoZSBncm91cCBmb3IgdGhlIHZvcm9ub2kgcGF0aHNcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKHN3YXJtRGF0YVtpbmRleFRpbWVdWyd2b3Jvbm9pJ10uc3BsaXQoJzsnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVIgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm9yb25vaSA9IHRhbmsuc2VsZWN0KCcjdm9ybm9pR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZvcm9ub2kuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0VOVEVSIC0gYXBwZW5kIHRoZSBhbmltYWwgZ3JvdXBzXHJcbiAgICAgICAgICAgIGxldCBhbmltYWxHcm91cGluZ3MgPSBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FuaW1hbC0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIGNpcmNsZXMgZm9yIGVhY2ggYW5pbWFsIHRvIHRoZSBhbmltYWxncm91cFxyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCAxLjUgKiBhbmltYWxTY2FsZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRnVuY3Rpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgb24gY2xpY2sgZm9yIHRoZSBhY3RpdmUgZmlzaHNcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzID0gYWN0aXZlQW5pbWFscy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0gYW5pbWFscyBjaXJjbGVzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYW5pbWFsU2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGZvciBlYWNoIGdyb3VwIHRoZSBhcnJvdywgbmVlZGVkIGZvciBjb2xvcmluZ1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fycm93LW1hcmtlci0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5nc1xyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoI2Fycm93LW1hcmtlci0nICsgZFsnYSddICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2V4ZWN1dGUgb25seSB3aGVuIGRyYXcgZGlyZWN0aW9uIGJ1dHRvbiBpcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsncCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsncCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtZFsnZGlyZWN0aW9uJ10gKyAnICcgKyBkWydwJ11bMF0gKyAnICcgKyAtZFsncCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93IGhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdGhlIGdyb3Vwc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db252ZXggaHVsbFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgdmFyIGh1bGxQYXRoID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguaHVsbFBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzd2FybURhdGFbaW5kZXhUaW1lXVsnY29udmV4X2h1bGwnXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGhcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRU5URVIgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2h1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBubyBodWxsXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aCA9IHRhbmsuc2VsZWN0KCdwYXRoLmh1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBmaXNoXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgZXZlcnkgZmlzaCBibGFja1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChtZXRhZGF0YUNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhQ29sb3IpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjYW5pbWFsLScgKyBrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBtZXRhZGF0YUNvbG9yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgbWV0YWRhdGFDb2xvcltrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykgJiZcclxuICAgICAgICAgICAgICAgIHN3YXJtRGF0YVtpbmRleFRpbWVdLmNlbnRyb2lkICYmXHJcbiAgICAgICAgICAgICAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydkaXJlY3Rpb24nXSArICcgJyArIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgJyAnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1lZG9pZFxyXG4gICAgICAgICAgICBpZiAobWVkb2lkQW5pbWFsICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1lZG9pZEFuaW1hbCA9IHN3YXJtRGF0YVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBoaWVyYXJjaHlcclxuICAgICAgICAgICAgZHJhd19kZW5kcm9ncmFtKCk7XHJcblxyXG4gICAgICAgICAgICAvL25leHQgZnJhbWVcclxuICAgICAgICAgICAgaW5kZXhUaW1lKys7XHJcblxyXG4gICAgICAgICAgICBpZiAoZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKSAmJiBzd2FybURhdGFbTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKV0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBNYXRoLmNlaWwoaW5kZXhUaW1lIC8gbGluZUNoYXJ0UmF0aW8pO1xyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGxpbmUgY2hhcnQgbGVnZW5kIHRleHQgdmFsdWVzIHBlciBzZWNvbmRcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gY2hhbmdlIHRoaXMgdG8gYSBtb3JlIG1vZHVsYXIgd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY29udmV4X2h1bGxfYXJlYUxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KChzd2FybURhdGFbdG1wXVsnY29udmV4X2h1bGxfYXJlYSddKSArICdtbcKyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjc3BlZWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnc3BlZWQnXSArICdtbS9zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjYWNjZWxlcmF0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2FjY2VsZXJhdGlvbiddICsgJ21tL3PCsicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2Rpc3RhbmNlX2NlbnRyb2lkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2Rpc3RhbmNlX2NlbnRyb2lkJ10gKyAnbW0nKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkaXJlY3Rpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlyZWN0aW9uJ10gKyAnwrAnKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNwb2xhcmlzYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsncG9sYXJpc2F0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgem9vbUZ1bmN0aW9uKHRtcCkgKyAnLDApJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSA+PSBzd2FybURhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvL3N0YXJ0IGFnYWluIGZyb20gdGhlIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXlCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWVcclxuICAgICAgICAgICAgICAgIC8vICAgbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHQxIC0gdDApOyAvLyBpbiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZVRvV2FpdCk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGluZGV4IHRpbWUgdG8gYSBuZXcgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gbmV3IHRpbWUgc3RlcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKGluZGV4VGltZSA8PSBzd2FybURhdGEubGVuZ3RoKSkge1xyXG4gICAgICAgIGluZGV4VGltZSA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVjcmVhc2UgdGltZSBieSAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVjSW5kZXhUaW1lKCkge1xyXG4gICAgaW5kZXhUaW1lID0gaW5kZXhUaW1lIC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGhlIG5ldyBhY3RpdmUgc2NhbGUgLSBlLmcuIHNwZWVkLCBhY2NlbGVyYXRpb24sIGJsYWNrIGV0Yy5cclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIC0gYWN0aXZlIHNjYWxlIGZvciB0aGUgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2NhbGUodmFsdWUpIHtcclxuICAgIGFjdGl2ZVNjYWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldyBtZWRvaWQgYW5pbWFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFVuaXF1ZSBpZCBvZiB0aGUgYW5pbWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWVkb2lkQW5pbWFsKHZhbHVlKSB7XHJcbiAgICBtZWRvaWRBbmltYWwgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc2VsZWN0ZWQgYW5kIGhpZ2hsaWdodGVkIGFuaW1hbHNcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiB1bnFpdWUgaWQgb2YgdGhlIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVBbmltYWxzKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVBbmltYWxzID0gdmFsdWU7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBkMyAqL1xyXG5cclxuZXhwb3J0IGxldCBuZXR3b3JrQXV0byA9IGZhbHNlOyAvLyBpZiB0cnVlIHRoZSBuZXR3b3JrIGVkZ2UgbGltaXQgaXMgYXV0b21hdGljYWxseSBzdWdnZXN0ZWRcclxuZXhwb3J0IGxldCBuZXR3b3JrTGltaXQgPSAwO1xyXG4vLyBmaXhlZCBjb2xvciBzY2FsZSBmb3IgdGhlIG5ldHdvcmtcclxuXHJcbi8qKlxyXG4gKiBTdGF0aWMgY29sb3Igc2NhbGUgZm9yIHRoZSBuZXR3b3JrIGNvbG9yaW5nXHJcbiAqIFRPRE8gY2hhbmdlIHRoaXMgc29tZXRpbWVcclxuICovXHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAuZG9tYWluKFxyXG4gICAgICAgIFswLCAuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjgsIC45LCAxXVxyXG4gICAgKVxyXG4gICAgLnJhbmdlKFsnI2ZmZmZmZicsICcjZGZkZmRmJywgJyNjMGMwYzAnLCAnI2EzYTNhMycsICcjODU4NTg1JywgJyM2OTY5NjknLCAnIzRlNGU0ZScsICcjMzUzNTM1JywgJyMxZDFkMWQnLCAnIzAwMDAwMCddKTtcclxuXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBuZXR3b3JrIHNlbGVjdCBidXR0b25zIHRvIHRoZSB3ZWJpbnRlcmZhY2VcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIG5ldHdvcmsgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXVsnZmluaXNoZWQnXSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1sZyBidG4tYmxvY2tcIiBkYXRhPScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduZXR3b3JrX2lkJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduYW1lJ10gKyAnPC9idXR0b24+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNuZXR3b3Jrcy1tb2RhbC1ib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbmV0d29yayBkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGF1dG8gdmFsdWUgLSBpZiB0cnVlIHRoYW4gdGhlIG5ldHdvcmsgbGltaXQgaXMgc2V0IHRvIHRoZSAwLjk1IHBlcmNlbnRpbGUgb2YgYWxsIHZhbHVlc1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0F1dG8odmFsdWUpIHtcclxuICAgIG5ldHdvcmtBdXRvID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldHdvcmsgbGltaXQgd2l0aCB0aGUgc3BlY2lmaWMgbmV0d29yayBzbGlkZXIgLSBjdXN0b21cclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gYmV0d2VlbiAwIGFuZCAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29yTGltaXQodmFsdWUpIHtcclxuICAgIG5ldHdvcmtMaW1pdCA9IHZhbHVlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9uZXR3b3JrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRyYXdcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldFBsYXlCb29sZWFuXHJcbn0gZnJvbSAnLi9saXN0ZW5lci5qcyc7XHJcblxyXG4vKipcclxuICogRGlzYWJsZSB0aGUgcGxheSBidXR0b24gLS0+IExvYWRpbmcgc3ltYm9sXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVBsYXlCdXR0b24oKSB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhbihmYWxzZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBnbHlwaGljb24tcmVmcmVzaC1hbmltYXRlXCI+PC9zcGFuPkxvYWRpbmcnKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmFibGUgdGhlIHBsYXkgYnV0dG9uIHJlbW92ZSBsb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVBsYXlCdXR0b24oKSB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhbih0cnVlKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlBsYXknKTtcclxuICAgICQoJyNwbGF5LWJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgZHJhdygpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybiAgLjk1IHBlcmNlbnRpbGVzIG9mIHRoZSBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcmNlbnRpbGVzKGFycikge1xyXG4gICAgbGV0IHAgPSAwLjk1O1xyXG4gICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9KTtcclxuICAgIGxldCBpbmRleCA9IChhcnIubGVuZ3RoIC0gMSkgKiBwO1xyXG4gICAgbGV0IGxvd2VyID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICBsZXQgdXBwZXIgPSBsb3dlciArIDE7XHJcbiAgICBsZXQgd2VpZ2h0ID0gaW5kZXggJSAxO1xyXG4gICAgaWYgKHVwcGVyID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYXJyW2xvd2VyXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGFycltsb3dlcl0gKiAoMSAtIHdlaWdodCkgKyBhcnJbdXBwZXJdICogd2VpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCovXHJcblxyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHJldHVybkNvbG9yU2NhbGVcclxufSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG5sZXQgc3ZnTGVnZW5kOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgbGVnZW5kXHJcbmxldCB0YW5rV2lkdGg7IC8vIHNwYXRpYWwgdmlldyB3aWR0aFxyXG5sZXQgdGFua0hlaWdodDsgLy8gc3BhdGlhbCB2aWV3IGhlaWdodFxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ3JvdXAgdG8gdGhlIHN2ZyB3aGVyZSB0aGUgbGVnZW5kIGZvciB0aGUgY29sb3IgbGVnZW5kIGlzXHJcbiAqIFRPRE8gY2hhbmdlIHRoaXMgLSBzbyB0aGF0IHRoZSBsZWdlbmQgaXMgYWxzbyByZXNwb25zaXZlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkU3BhdGlhbFZpZXdHcm91cCgpIHtcclxuICAgIHRhbmtXaWR0aCA9IFNQVi50YW5rV2lkdGg7XHJcbiAgICB0YW5rSGVpZ2h0ID0gU1BWLnRhbmtIZWlnaHQ7XHJcblxyXG4gICAgc3ZnTGVnZW5kID0gZDMuc2VsZWN0KCcjbWFpbi12aXMtbGVnZW5kLWRpdicpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1sZWdlbmRDb250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC8vIHRvIG1ha2UgaXQgcmVzcG9uc2l2ZSB3aXRoIGNzc1xyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB0YW5rV2lkdGggKyAnICcgKyAxMDApXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudC1sZWdlbmQnLCB0cnVlKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY29sb3JMZWdlbmQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgY29sb3IgbGVnZW5kXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlTGVnZW5kKCkge1xyXG4gICAgdmFyIGxlZ2VuZDsgLy8gdGhlIGNvbG9yIGxlZ2VuZFxyXG4gICAgdmFyIGxlZ2VuZFRleHQ7IC8vIGNvbG9yIGxlZ2VuZCB0ZXh0XHJcbiAgICAvLyB2YXJzIGZvciB0aGUgbGVnZW5kXHJcbiAgICB2YXIgbGVnZW5kV2lkdGggPSB0YW5rV2lkdGggKiAwLjA4O1xyXG4gICAgdmFyIGxlZ2VuZEhlaWdodCA9IHRhbmtIZWlnaHQgKiAwLjA0O1xyXG4gICAgdmFyIGRpZmZlcmVudENvbG9ycyA9IDA7XHJcblxyXG4gICAgLy9jaGFuZ2UgdGhlIGNvbG9ycyBvZiB0aGUgYW5pbWFsc1xyXG4gICAgaWYgKFNQVi5hY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgIHZhciB0bXBTY2FsZSA9IHJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5yYW5nZSgpKTtcclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUuZG9tYWluKCkpO1xyXG4gICAgICAgIGRpZmZlcmVudENvbG9ycyA9IHRtcFNjYWxlLnJhbmdlKClcclxuICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgIH1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgodGFua1dpZHRoIC0gZGlmZmVyZW50Q29sb3JzICogbGVnZW5kV2lkdGgpICsgaSAqIGxlZ2VuZFdpZHRoIC0gMzApICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kVGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDE1IGhhcyB0byBiZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIHJldHVybiAoKHRhbmtXaWR0aCAtIGRpZmZlcmVudENvbG9ycyAqIGxlZ2VuZFdpZHRoKSArIGkgKiBsZWdlbmRXaWR0aCAtIDEwKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZCAqIDIpIC8gMjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBjb2xvcmJyZXdlciovXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY2hhbmdlTGVnZW5kXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5leHBvcnQgbGV0IGNvbG9yU2NhbGUgPSB7XHJcbiAgICB0eXBlOiAnTGluZWFyJyxcclxuICAgIGNvbG9yOiBjb2xvcmJyZXdlci5CdVlsQnVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBzY2FsZVxyXG4gKiBAcmV0dXJuIHtjb2xvclNjYWxlfSBhY3RpdmUgY29sb3Igc2NhbGUgaXMgaW4gbGluZWFyIG9yIHRocmVzaG9sZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJldHVybkNvbG9yU2NhbGUoKSB7XHJcbiAgICAvL2lmIGxpbmVhciBpcyBjaG9vc2VuXHJcbiAgICBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnTGluZWFyJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfSAvL1RocmVzaG9sZCBjb2xvciBzY2FsZVxyXG4gICAgZWxzZSBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnVGhyZXNob2xkJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtTUFYuYWN0aXZlU2NhbGVdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnJhbmdlKGNvbG9yU2NhbGVbJ2NvbG9yJ10pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgY29sb3IgcGlja2VyXHJcbiAqIHdpdGggYWxsIGxpc3RlbmVycyBpbmNsdWRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb2xvclBpY2tlcigpIHtcclxuICAgIGQzLnNlbGVjdCgnLmNvbG9ycy1ib2R5JylcclxuICAgICAgICAuc2VsZWN0QWxsKCcucGFsZXR0ZScpXHJcbiAgICAgICAgLmRhdGEoZDMuZW50cmllcyhjb2xvcmJyZXdlcikpXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGFsZXR0ZScpXHJcbiAgICAgICAgLmF0dHIoJ3RpdGxlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5rZXk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAvLyBoaWdodGxpZ2h0IHRoZSByaWdodCBwYWxldHRlXHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5wYWxldHRlW3RpdGxlPVwiJyArIGQua2V5ICsgJ1wiXScpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBjb2xvclNjYWxlLmNvbG9yID0gY29sb3JicmV3ZXJbZC5rZXldO1xyXG4gICAgICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJy5zd2F0Y2gnKVxyXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3NwYW4nKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzd2F0Y2gnKVxyXG4gICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBjb2xvciBzY2hlbWVcclxuICAgICQoJy5wYWxldHRlW3RpdGxlPVwiQnVZbEJ1XCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0TWV0YWRhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuXHJcbmV4cG9ydCBsZXQgbWV0YWRhdGFDb2xvciA9IHt9OyAvLyBzYXZlIHRoZSBtZXRhZGF0YSBjb2xvcmluZ1xyXG5cclxuLyoqXHJcbiAqIEluaXQgTWV0YWRhdGEgYnV0dG9ucyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTWV0YWRkYXRhKCkge1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnI2ZmZicsICcjZTQxYTFjJywgJyMzNzdlYjgnLCAnIzRkYWY0YScsICcjOTg0ZWEzJywgJyNmZjdmMDAnLCAnI2ZmZmYzMycsICcjYTY1NjI4J107XHJcbiAgICAvLyBhZGQgdGhlIGRhdGEgdG8gdGhlIG1ldGFkYXRhIG1vZGFsXHJcbiAgICBpZiAoZGF0YXNldE1ldGFkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtdGFibGUnKS5maW5kKCd0Ym9keScpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ciBpZD1cIm1ldGFkYXRhLXJvdy0nICsgZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSArICdcIj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnd2VpZ2h0J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoYDxkaXYgY2xhc3M9XCJkcm9wZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1jb2xvclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInByZXZpZXdcIiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojZmZmXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvci1maWVsZFwiIHZhbHVlPVwiV2hpdGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFN0cmluZyArPSAnPGRpdiBjbGFzcz1cIm1ldGFkYXRhLXN3YXRjaCBtZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvcnNbaV0gKyAnXCIgdmFsdWU9XCInICsgaWQgKyAnXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvdWw+PC9kaXY+JylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdUaGVyZSBpcyBubyBtZXRhZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2l6ZSBhbmQgd2VpZ2h0IGNvbG9yaW5nIGZvciB0aGUgbWV0YWRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvck1ldGFkYXRhKCkge1xyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuICAgIC8vIGdldCB0aGUgaW5wdXQgdmFsdWVzXHJcbiAgICBsZXQgdmFsdWUgPSAkKCcjZ3JvdXAtbWV0YWRhdGEgLmJ0bi5idG4tZGVmYXVsdC5hY3RpdmUgaW5wdXQnKVxyXG4gICAgICAgIC5hdHRyKCd2YWx1ZScpO1xyXG4gICAgbGV0IGJsQXZnID0gJCgnI2JsLWF2ZycpLnZhbCgpO1xyXG4gICAgbGV0IGFiQXZnID0gJCgnI2FiLWF2ZycpLnZhbCgpO1xyXG4gICAgLy8gY29sb3Igc2NoZW1lIGZvciB0aGUgaW5wdXRzXHJcbiAgICBsZXQgY29sb3JzID0gWycjN2ZjOTdmJywgJyNmZGMwODYnLCAnIzM4NmNiMCddO1xyXG4gICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0gPCBibEF2Zykge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA+IGFiQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1sxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWV0YWRhdGEgcmVzZXQgYWxsIGluZGl2aWR1YWwgbWV0YWRhdGEgaW5wdXQgZmllbGRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKSB7XHJcbiAgICBtZXRhZGF0YUNvbG9yID0ge307XHJcbiAgICAkKCcuZHJvcGRvd24gI3ByZXZpZXcnKVxyXG4gICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsIHBhcmFtZXRlcnMgKi9cclxuXHJcbmxldCBKU09OQVBJX01JTUVUWVBFID0gJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbic7XHJcbnZhciBzb3VyY2U7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYWRkVG9EYXRhc2V0LFxyXG4gICAgc2V0RGF0YVNldFBlcmNlbnRpbGUsXHJcbiAgICBzZXRTd2FybURhdGEsXHJcbiAgICBzZXRNZXRhRGF0YSxcclxuICAgIHNldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgc2V0TmV0d29ya0RhdGEsXHJcbiAgICBzZXROZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGROZXR3b3JrQnV0dG9uc1xyXG59IGZyb20gJy4vbmV0d29yay5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZW5hYmxlUGxheUJ1dHRvbixcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBTdHJlYW0gdGhlIG1vdmVtZW50IGRhdGEgZnJvbSB0aGUgQVBJXHJcbiAqIExvYWRzIG9ubHkgdGhlIGV4cGxpY2l0IG1vdmVtZW50IGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1Nb3ZlbWVudERhdGEoKSB7XHJcbiAgICBpZiAod2luZG93LkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvYXBpL21vdmVtZW50X29ubHkvJyArIHBhcmFtZXRlcnNbJ2lkJ10pO1xyXG4gICAgICAgIHNvdXJjZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRhdGEgPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkVG9EYXRhc2V0KEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnJlYWR5U3RhdGUgPT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdXZWJicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RyZWFtaW5nJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnRpbGUgZGF0YSBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJjZW50aWxlKCkge1xyXG4gICAgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcGVyY2VudGlsZS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRhU2V0UGVyY2VudGlsZSBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vIFttaW4sIHBlcmNlbnRpbGVfMSwuLi4scGVyY2VudGlsZV85LG1heF1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtkYXRhW2ldWydmZWF0dXJlJ11dID0gW2RhdGFbaV1bJ21pbiddLCBkYXRhW2ldWydwMSddLCBkYXRhW2ldWydwMiddLCBkYXRhW2ldWydwMyddLCBkYXRhW2ldWydwNSddLCBkYXRhW2ldWydwNyddLCBkYXRhW2ldWydwOCddLCBkYXRhW2ldWydwOSddLCBkYXRhW2ldWydtYXgnXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RGF0YVNldFBlcmNlbnRpbGUoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0IGZyb20gdGhlIGFwaVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRmVhdHVyZXMoKSB7XHJcbiAgICBjb25zdCBzd2FybV9mZWF0dXJlcyA9IFsnc3dhcm1fdGltZScsICdzd2FybV9zcGVlZCcsICdzd2FybV9hY2NlbGVyYXRpb24nLCAnc3dhcm1fY29udmV4X2h1bGxfYXJlYScsXHJcbiAgICAgICAgJ3N3YXJtX2Rpc3RhbmNlX2NlbnRyb2lkJywgJ3N3YXJtX2RpcmVjdGlvbicsICdzd2FybV9wb2xhcmlzYXRpb24nXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGdldCBhbGwgdGhlIG90aGVyIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIHN3YXJtX2ZlYXR1cmVzW2ldLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlYXR1cmUgPSBzd2FybV9mZWF0dXJlc1tpXS5yZXBsYWNlKCdzd2FybV8nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG1lYWRhdGEgaW5mb3JtYXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhRGF0YSgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9tZXRhZGF0YS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRNZXRhRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmV0d29yayBkYXRhc2V0cyBmb3IgdGhlIGJ1dHRvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXR3b3JrRGF0YUJ1dHRvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0L25ldHdvcmtzLycgKyBwYXJhbWV0ZXJzWydpZCddLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2Ugc3BlZWQsIGFjY2VsZXJhdGlvbiBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YXNldEZlYXR1cmUoZmVhdHVyZSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzcGVjaWZjIHN3YXJtIGZlYXR1cmVcclxuICogQHBhcmFtIHtTdHJpbmd9IGZlYXR1cmUgLSBmb3IgaW5zdGFuY2UgY2VudHJvaWQsIG1lZG9pZCBldGMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBmZWF0dXJlLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGFuZCBuZXR3b3JrIGhpZXJhcmNoeSBmb3IgdGhlIHNwZWNpZmljIG5ldHdvcmtfaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ldHdvcmtfaWQgLSB1bmlxdWUgbmV0d29yayBpZCBvZiBhIGRhdGFzZXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29ya3MvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBuZXR3b3JrX2lkLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2V0TmV0d29ya0RhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydkYXRhJ10pKTtcclxuICAgICAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgU2V0Ki9cclxuXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBicnVzaGVuZCxcclxuICAgIHNsaWRlclxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmQsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yLFxyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEsXHJcbiAgICBjb2xvck1ldGFkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldE5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXRcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXQsXHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBkYXRhc2V0TWV0YWRhdGEsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldE5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGdldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0RhdGEsXHJcbiAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlXHJcbn0gZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGNvbG9yU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9jb2xvcl9waWNrZXInO1xyXG5cclxubGV0IGJydXNoOyAvLyBicnVzaGluZyB2YXJpYWJsZVxyXG5leHBvcnQgbGV0IHBsYXlCb29sZWFuID0gdHJ1ZTsgLy8gcGF1c2UgYW5kIHBsYXkgYm9vbGVhblxyXG5cclxuLyoqXHJcbiAqIEluaXQgYWxsIHRoZSBsaXN0ZW5lcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xyXG4gICAgY3BfbGlzdGVuZXIoKTtcclxuICAgIHNmX2xpc3RlbmVycygpO1xyXG4gICAgYWZfbGlzdGVuZXJzKCk7XHJcbiAgICBtZF9saXN0ZW5lcnMoKTtcclxuICAgIG5fbGlzdGVuZXJzKCk7XHJcbiAgICBoX2xpc3RlbmVycygpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBjb250cm9sIHBhbmVsIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gY3BfbGlzdGVuZXIoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IG9yIHN0b3AgdGhlIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBTUFYuc2V0SW5kZXhUaW1lKHNsaWRlci5zbGlkZXIoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhdXNlIHRoZSBhbmltYXRpb24gYW5kIHNob3cgb25seSB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV4dC1mcmFtZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJ1c2hpbmcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAvL3N0b3AgdGhlIGFuaW1hdGlvblxyXG4gICAgICAgIHBsYXlCb29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmICghJCgnI2JydXNoaW5nLWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2RlZmluZSB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgYnJ1c2ggPSBkMy5icnVzaCgpXHJcbiAgICAgICAgICAgICAgICAuZXh0ZW50KFtcclxuICAgICAgICAgICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1NQVi50YW5rV2lkdGgsIFNQVi50YW5rSGVpZ2h0XVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgIC5vbignZW5kJywgYnJ1c2hlbmQpO1xyXG4gICAgICAgICAgICAvL2FkZCB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjbWFpbi12aXMtc3ZnJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JydXNoJylcclxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgICQoJy5icnVzaCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5zZWxlY3QgYWxsIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlQW5pbWFscyhbXSk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG5cclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwYXRpYWwgdmlldyBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICAgKi9cclxuICAgICQoJyNiYWNrZ3JvdW5kLWNvbG9yJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjb2xvciA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1iYWNrZ3JvdW5kOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAkKCcjbWFpbi12aXMtc3ZnJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBzcGF0aWFsIHZpZXcgYXhpcyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctYXhpcycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnguYXhpcycpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI21haW4tdmlzIGcueS5heGlzJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIGZyYW1lICh0aW1lKSBudW1iZXIgaW4gdGhlIHNwYXRpYWwgdmlldyBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctdGltZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWVUZXh0Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyAuZnJhbWVUZXh0JykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sb3IgU2NhbGUgRnVuY3Rpb24gUmFkaW8gYnV0dG9uc1xyXG4gICAgICovXHJcbiAgICAkKCcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybSBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb2xvclNjYWxlWyd0eXBlJ10gPSAkKCdpbnB1dFtuYW1lPWNvbG9yLXNjYWxlLXJhZGlvXTpjaGVja2VkJywgJyNjb2xvci1zY2FsZS1yYWRpby1mb3JtJykudmFsKCk7XHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IHN3YXJtIGZlYXR1cmVzIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gc2ZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBkaXJlY3Rpb24gYXJyb3cgb2YgdGhlIGFuaW1hbFxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXJlY3Rpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIHNwZWVkIGRhdGEgb25jZVxyXG4gICAgICAgICAgICBpZiAoISgnZGlyZWN0aW9uJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IGRpcmVjdGlvbiBkYXRhXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlyZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5hcnJvdycpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBtZWRvaWQgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LW1lZG9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1tZWRvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoJ21lZG9pZCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgnbWVkb2lkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNQVi5zZXRNZWRvaWRBbmltYWwoc3dhcm1EYXRhW1NQVi5pbmRleFRpbWVdWydtZWRvaWQnXSk7XHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIG1lZG9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIFNQVi5tZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGRpc3BsYXkgdGhlIG1lZG9pZCBmaXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgU1BWLm1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRNZWRvaWRBbmltYWwoLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBjZW50cm9pZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctY2VudHJvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ2NlbnRyb2lkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGhpZGUgdGhlIGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnY2lyY2xlLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY29udmV4IGh1bGwgaW4gY29sb3IgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNvbnZleC1odWxsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2h1bGwnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFN3YXJtRGF0YXNldEZlYXR1cmUoJ2NvbnZleF9odWxsJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0cmlhbmd1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGlmICghKCd0cmlhbmd1bGF0aW9uJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRTd2FybURhdGFzZXRGZWF0dXJlKCd0cmlhbmd1bGF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdm9yb25vaVxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy12b3Jvbm9pJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndm9yb25vaScgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3dhcm1EYXRhc2V0RmVhdHVyZSgndm9yb25vaScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBhYnNvbHV0ZSBmZWF0dXJlIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gYWZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBTcGVlZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctc3BlZWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctc3BlZWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgc3BlZWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdzcGVlZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ3NwZWVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2UtY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ3NwZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYWNjZWxlcmF0aW9uIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvbiBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2FjY2VsZXJhdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBhY2NlbGVyYXRpb25cclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYWNjZWxlcmF0aW9uJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpc3RhbmNlIHRvIGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2Rpc3RhbmNlX2NlbnRyb2lkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgbmV0d29yayBsaXN0ZWVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBuX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBidXR0b25zIGNsaWNrZWQgLSBnZXQgdGhlIGRhdGFcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHkgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ldHdvcmtfaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEnKTtcclxuXHJcbiAgICAgICAgZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCk7XHJcbiAgICAgICAgJCgnI25ldHdvcmstZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgICAgICQoJyNzaG93LWRlbmRyb2dyYW0tZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGJ1dHRvbnMgY2xpY2tlZCAtIGdldCB0aGUgZGF0YVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXROZXR3b3JrRGF0YSh7fSk7XHJcbiAgICAgICAgc2V0TmV0d29ya0hpZXJhcmNoeSh7fSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBkZW5kcm9ncmFtIGlmIGl0IGlzIHZpc3VhbGl6ZWRcclxuICAgICAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLWRpdicpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAkKCcjc2hvdy1kZW5kcm9ncmFtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNidG4tbGVmdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAkKCcjYnRuLXJpZ2h0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAkKCcjZGVuZHJvZ3JhbS12aXMnKS5oaWRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYXV0byBidXR0b24gc2V0IGFjaXZlIG9yIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICAkKCcjbmV0d29yay1hdXRvLXN1Z2dlc3QnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBzZXROZXR3b3JrQXV0byh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1saW1pdC1wJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcjbmV0d29yay1zbGlkZXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGxpbWl0ID0gJCgnI25ldHdvcmstc2xpZGVyJykuc2xpZGVyKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICBzZXROZXR3b3JMaW1pdChsaW1pdCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjc2hvdy1kZW5kcm9ncmFtLWRpdicpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAnbWFyZ2luUmlnaHQnOiAnMHB4JyxcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdtYXJnaW5SaWdodCc6ICctMTEwcHgnLFxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0IG1ldGFkYXRhIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gbWRfbGlzdGVuZXJzKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBzd2F0Y2ggZnVuY3Rpb25zIGNvbG9yaW5nIGluZGl2aWR1YWwgYW5pbWFsc1xyXG4gICAgICovXHJcbiAgICAkKCcubWV0YWRhdGEtc3dhdGNoLm1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IGNvbG9yUkdCID0gJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvbG9yIG9mIHRoZSBzd2F0Y2ggcHJldmlld1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1yb3ctJyArIGlkICsgJyAjcHJldmlldycpXHJcbiAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvclJHQik7XHJcbiAgICAgICAgLy8gaWYgd2hpdGUgdGhhbiByZXNldCB0aGUgY29sb3JcclxuICAgICAgICBpZiAoY29sb3JSR0IgPT09ICdyZ2IoMjU1LCAyNTUsIDI1NSknKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YUNvbG9yW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhQ29sb3JbaWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltpZF0gPSBjb2xvclJHQjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGZ1bmN0aW9ucyBmb3IgaW5zdGFuY2UgY29sb3Igc2V4XHJcbiAgICAgKi9cclxuICAgICQoJyNncm91cC1tZXRhZGF0YSA6aW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIG1ldGFkYXQgYWNvbG9yaW5nXHJcbiAgICAgICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICAgIGxldCB0bXAgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gbWV0YWRhdGEgc2V4IGlzIGNob29zZW4gLSBjb2xvcmluZyBiYXNlZCBvbiBtIGFuZCBmXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnc2V4Jykge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtZGl2JykubW9kYWwoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBhbmQgY29sb3IgaGVyZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXQgb2YgaW5kaXZpZHVhbCBzdHJpbmdzIGluIHNleFxyXG4gICAgICAgICAgICB0bXAgPSBBcnJheS5mcm9tKG5ldyBTZXQodG1wKSk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnIzM4NmNiMCddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0udG9Mb3dlckNhc2UoKSA9PT0gdG1wW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgY29sb3JpbmcgdG8gdGhlIG1ldGFkYXRhY29sb3Igb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWV0YWRhdGEtaW5wdXQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIC8vIHNldCB2YWx1ZXMgb2YgaW5wdXRzXHJcbiAgICAgICAgICAgIC8vIGhlcmUgYXJlIGF1dG9tYXRpY2FsbHkgaW5wdXQgdmFsdWVzIGNhbGN1bGF0ZWRcclxuICAgICAgICAgICAgLy8gLjI1IGFuZCAuNzUgcGVyY2VudGlsZXMgYXJlIHVzZWRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRNZXRhZGF0YVtpXVt2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBibEF2ZyA9IGQzLnF1YW50aWxlKHRtcCwgMC4yNSk7IC8vIGJlbG93IGF2ZXJhZ2UgdmFsdWVcclxuICAgICAgICAgICAgbGV0IGFiQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjc1KTsgLy8gYWJvdmUgYXZlcmFnZVxyXG4gICAgICAgICAgICAkKCcjYmwtYXZnJykudmFsKGJsQXZnKTtcclxuICAgICAgICAgICAgJCgnI2FiLWF2ZycpLnZhbChhYkF2Zyk7XHJcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICAgICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGdyb3VwIG1ldGFkYXRhIGlucHV0IHNwaW5uZXJcclxuICAgICAqICsvLSAwLjEgdG8gdGhlIGlucHV0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgb2xkVmFsdWUgPSBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwoKS50cmltKCksXHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChidG4uYXR0cignZGF0YS1kaXInKSA9PSAndXAnKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpICsgMC4xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHBhcnNlRmxvYXQob2xkVmFsdWUpIC0gMC4xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKG5ld1ZhbCAqIDEwMCkgLyAxMDA7IC1cclxuICAgICAgICBidG4uY2xvc2VzdCgnLm51bWJlci1zcGlubmVyJykuZmluZCgnaW5wdXQnKS52YWwobmV3VmFsKTtcclxuICAgICAgICAvLyBjaGFuZ2UgdGhlIGNvbG9yaW5nXHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRhZGF0YSBpbnB1dCBmaWVsZHMgY2hhbmdlXHJcbiAgICAgKi9cclxuICAgICQoJy5udW1iZXItc3Bpbm5lciBpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbG9yTWV0YWRhdGEoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBtZXRhZGF0YSBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgICQoJyNtZXRhZGF0YS1yZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBoX2xpc3RlbmVycygpIHtcclxuICAgICQoJyNzaG93LWRlbmRyb2dyYW0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI3Nob3ctZGVuZHJvZ3JhbScpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRlbmRyb2dyYW1cclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcjYnRuLWxlZnQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnI2J0bi1yaWdodCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBhZGQgaGVyZSBhIHJlc2l6ZSBvZiB0aGUgbWFpbiB2aXNcclxuICAgICAgICAgICAgJCgnI2RlbmRyb2dyYW0tdmlzJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBpZiAoJCgnI21haW4tdmlzLWRpdicpLmF0dHIoJ2NsYXNzJykgPT09ICdjb2wtbWQtOCcpIHtcclxuICAgICAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTgnKTtcclxuICAgICAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTEyJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0ZWggZGVuZHJvZ3JhbVxyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJyNidG4tbGVmdCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcjYnRuLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAvLyBUT0RPIGFkZCBoZXJlIGEgcmVzaXplIG9mIHRoZSBtYWluIHZpc1xyXG4gICAgICAgICAgICAkKCcjZGVuZHJvZ3JhbS12aXMnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIGlmICgkKCcjbWFpbi12aXMtZGl2JykuYXR0cignY2xhc3MnKSA9PT0gJ2NvbC1tZC0xMicpIHtcclxuICAgICAgICAgICAgICAgICQoJyNtYWluLXZpcy1kaXYnKS5yZW1vdmVDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcjbWFpbi12aXMtZGl2JykuYWRkQ2xhc3MoJ2NvbC1tZC04Jyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCBwbGF5IGJvb2xlYW5cclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZSAtIHBhdXNlIChmYWxzZSkgb3IgcGxheSAodHJ1ZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRQbGF5Qm9vbGVhbih2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxheUJvb2xlYW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saXN0ZW5lci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCovXHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0TWV0YWRhdGEsXHJcbiAgICBzd2FybURhdGFcclxufSBmcm9tICcuLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCAqIGFzIFNQViBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBOZXR3b3JrIGZyb20gJy4uL25ldHdvcmsuanMnO1xyXG5cclxuZXhwb3J0IGxldCBzbGlkZXI7IC8vIHRpbWUgc2xpZGVyIG9mIHRoZSBhcHBcclxuZXhwb3J0IGxldCB0b29sdGlwOyAvLyB0b29sdGlwIGZ1bmN0aW9uXHJcblxyXG4vKipcclxuICogQnJ1c2ggZW5kIGZ1bmN0aW9uXHJcbiAqIGFkZCBhY3RpdmUgYW5pbWFscyB0byB0aGUgYXJyYXkgb3IgcmVtb3ZlIHRoZW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBicnVzaGVuZCgpIHtcclxuICAgIGxldCBhcnJheUFuaW1hbHMgPSBTUFYuYXJyYXlBbmltYWxzO1xyXG4gICAgbGV0IGFjdGl2ZUFuaW1hbHMgPSBTUFYuYWN0aXZlQW5pbWFscztcclxuICAgIHZhciByZWN0ID0gZDMuZXZlbnQuc2VsZWN0aW9uO1xyXG4gICAgLy9pdGVyYXRlIG92ZXIgdGhlIDE1MSBmaXNoIHRvIGNoZWNrIHdoaWNoIGFyZSBpbiB0aGUgYnJ1c2hcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU1BWLmFuaW1hbF9pZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcG9pbnQgPSBbYXJyYXlBbmltYWxzW2ldWydwJ11bMF0sIGFycmF5QW5pbWFsc1tpXVsncCddWzFdXTtcclxuICAgICAgICAvL2NoZWNrIHdoaWNoIGZpc2ggYXJlIGluICB0aGUgYnJ1c2hlZCBhcmVhXHJcbiAgICAgICAgaWYgKChyZWN0WzBdWzBdIDw9IHBvaW50WzBdKSAmJiAocG9pbnRbMF0gPD0gcmVjdFsxXVswXSkgJiZcclxuICAgICAgICAgICAgKHJlY3RbMF1bMV0gPD0gcG9pbnRbMV0pICYmIChwb2ludFsxXSA8PSByZWN0WzFdWzFdKSkge1xyXG4gICAgICAgICAgICAvLyBQb2ludCBpcyBpbiB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgYWN0aXZlQW5pbWFscy5wdXNoKGFycmF5QW5pbWFsc1tpXVsnYSddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTUFYuc2V0QWN0aXZlQW5pbWFscyhhY3RpdmVBbmltYWxzKTtcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgJCgnLmJydXNoJylcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB0b29sdGlwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRvb2x0aXAoKSB7XHJcbiAgICB0b29sdGlwID0gZDMuc2VsZWN0KCdkaXYudG9vbHRpcCcpXHJcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMCArICdweCcpXHJcbiAgICAgICAgLnN0eWxlKCd0b3AnLCAwICsgJ3B4JylcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvb2x0aXAgZnVuY3Rpb25cclxuICogQHBhcmFtIHtPYmplY3R9IGQgLSBkMyBkYXRhIG9iamVjdCB3aXRoIHRoZSBtZXRhZGF0YSBpbmZvcm1hdGlvblxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvb2x0aXBGdW5jdGlvbihkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkWydhJ10gPT09IGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pIHtcclxuICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAxMDApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyBUT0RPIG1ha2UgdGhpcyBtb2R1bGFyXHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1hbmltYWwtaWQnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zcGVjaWVzJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc3BlY2llcyddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNleCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NleCddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXNpemUnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzaXplJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtd2VpZ2h0JylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnd2VpZ2h0J10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB0aW1lIHNsaWRlciBhbmQgdGhlIGR5bmFtaWMgbmV0d29yayBzbGlkZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U2xpZGVycygpIHtcclxuICAgIC8vIHRpbWUgc2xpZGVyXHJcbiAgICBzbGlkZXIgPSAkKCcjc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IHN3YXJtRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHN0ZXA6IDI1LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBTUFYuc2V0SW5kZXhUaW1lKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHBhdXNlZCBhcHBseSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBOZXR3b3JrIHNsaWRlclxyXG4gICAgJCgnI25ldHdvcmstc2xpZGVyJylcclxuICAgICAgICAuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6ICdtYXgnLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIE5ldHdvcmsuc2V0TmV0d29yTGltaXQodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwodWkudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtYXggZnJvbSB0aGUgc2xpZGVyIHRoaXMgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGlja3NcclxuICAgIGxldCBtYXggPSBzbGlkZXIuc2xpZGVyKCdvcHRpb24nLCAnbWF4Jyk7XHJcbiAgICBsZXQgc3BhY2UgPSAxMDAgLyBtYXg7XHJcbiAgICAvL2FwcGVuZCB0aGUgbWludXRlIHRpY2tzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSA9IGkgKyAxNTAwKSB7XHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ1aS1zbGlkZXItdGlja1wiPjwvc3Bhbj4nKVxyXG4gICAgICAgICAgICAuY3NzKCdsZWZ0JywgKHNwYWNlICogaSkgKyAnJScpXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBTZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0aW1lIHNsaWRlciB0byBhIG5ldyB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBuZXcgdmFsdWUgZm9yIHRoZSB0aW1lIHNsaWRlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVTbGlkZXIodmFsdWUpIHtcclxuICAgIHNsaWRlci5zbGlkZXIoJ3ZhbHVlJywgdmFsdWUpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvaW50ZXJhY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIHBhcmFtZXRlcnMqL1xyXG5pbXBvcnQge1xyXG4gICAgc2V0SW5kZXhUaW1lLFxyXG4gICAgYW5pbWFsX2lkc1xyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc3dhcm1EYXRhLFxyXG4gICAgZGF0YXNldFxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgcGVyY2VudGlsZXNcclxufSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5cclxuZXhwb3J0IGxldCB6b29tRnVuY3Rpb247XHJcbmV4cG9ydCBsZXQgbGluZUNoYXJ0UmF0aW8gPSAwO1xyXG5cclxubGV0IHRyZW5kQ2hhcnRzWm9vbSA9IHt9O1xyXG5sZXQgdHJlbmRDaGFydHNFbGVtID0gWydsb3dlck91dGVyQXJlYScsICdsb3dlcklubmVyQXJlYScsICdtZWRpYW5MaW5lJywgJ3VwcGVySW5uZXJBcmVhJywgJ3VwcGVyT3V0ZXJBcmVhJ107XHJcbmxldCBsaW5lQ2hhcnRXaWR0aCA9IDUwMDA7XHJcbmxldCByYXRpbyA9IDE7XHJcbmxldCB6b29tR3JvdXA7XHJcbmxldCB4O1xyXG5sZXQgeTtcclxuXHJcbi8qKlxyXG4gKiBpbml0IHRoZSBsaW5lIGNoYXJ0IGFuZCBhbHNvIHRoZSB0cmVuZCBjaGFydFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVDaGFydCgpIHtcclxuXHJcbiAgICB6b29tRnVuY3Rpb24gPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgc3dhcm1EYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBzd2FybURhdGEubGVuZ3RoXSk7XHJcblxyXG4gICAgbGluZUNoYXJ0UmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAvLyBTd2FybSBmZWF0dXJlcyBsaW5lIGNoYXJ0XHJcbiAgICBsZXQgbGluZUNoYXJ0SGVpZ2h0ID0gNTAwOyAvLyB0aGUgbGluZSBjaGFydCBoZWlnaHRcclxuICAgIGxldCBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiAxMCxcclxuICAgICAgICByaWdodDogMCxcclxuICAgICAgICBib3R0b206IDEwMCxcclxuICAgICAgICBsZWZ0OiAxMFxyXG4gICAgfTtcclxuICAgIGxldCBtYXJnaW5Ub0xlZ2VuZCA9IDUwO1xyXG5cclxuICAgIGxldCBzd2FybV9mZWF0dXJlcyA9IE9iamVjdC5rZXlzKHN3YXJtRGF0YVswXSk7XHJcbiAgICAvLyByZW1vdmUgdGhlIHRpbWUga2V5XHJcbiAgICBsZXQgaW5kZXggPSBzd2FybV9mZWF0dXJlcy5pbmRleE9mKCd0aW1lJyk7XHJcbiAgICBzd2FybV9mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcuZmVhdHVyZS1jaGVjay1ib3gnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJmZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGxpbmVDaGFydENoZWNrQm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArIGBcIiBjbGFzcz1cImxpbmVDaGFydEJ1dHRvblwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArIGA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgLy8gYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSBzd2FybSBkYXRhIHRvIGxpbmVDaGFydFdpZHRoIHBvaW50cyBpbiB0aGUgbGluZSBjaGFydFxyXG4gICAgaWYgKHN3YXJtRGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIHJhdGlvID0gTWF0aC5jZWlsKHN3YXJtRGF0YS5sZW5ndGggLyBsaW5lQ2hhcnRXaWR0aCk7XHJcbiAgICAgICAgLy8gdG1wIGFycmF5IGZvciB0aGUgYWdncmVnYXRlZCBhbmQgYXZlcmFnZWQgZmVhdHVyZXNcclxuICAgICAgICBsZXQgdG1wID0gbmV3IEFycmF5KHN3YXJtX2ZlYXR1cmVzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYWdncmVnYXRlIHRoZSBmZWF0dXJlcyBpbiB0aGUgdGVtcCBhcnJheVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBbal0gKz0gc3dhcm1EYXRhW2ldW3N3YXJtX2ZlYXR1cmVzW2pdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmF0aW8gaXMgemVybyB0aGVuIGF2ZXJhZ2UgaXQgYW5kIHNldCBpdCB0byB6ZXJvXHJcbiAgICAgICAgICAgIGlmIChpICUgcmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBfb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0aW1lJzogaSAvIHJhdGlvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB0bXBfb2JqZWN0W3N3YXJtX2ZlYXR1cmVzW2pdXSA9IHRtcFtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lQ2hhcnREYXRhLnB1c2godG1wX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsaW5lQ2hhcnREYXRhID0gc3dhcm1EYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8geCBheGlzIHNjYWxlIC0gbWludXMgbWFyZ2luTGluZUNoYXJ0ICBuZWVkZWRcclxuICAgIHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgeSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxyXG4gICAgICAgIC5yYW5nZShbbGluZUNoYXJ0SGVpZ2h0LCAwXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KVxyXG4gICAgICAgIC50aWNrcygwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IGRyYWdnZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkcmFnZ2VkIGZ1bmN0aW9uIGdldCB0aGUgY29vcmRpbmF0ZXMgYW5kIGNhbGN1bGF0ZSB0aGUgdGltZSBtb21lbnQgZnJvbSB0aGlzXHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMpO1xyXG4gICAgICAgIGlmIChjb29yZHNbMF0gPCBtYXJnaW4ubGVmdCB8fCBjb29yZHNbMF0gPiBsaW5lQ2hhcnRXaWR0aCB8fCBjb29yZHNbMV0gPCAwIHx8IGNvb3Jkc1sxXSA+IGxpbmVDaGFydEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRtcCBzY2FsZSB0byBpbmNsdWRlIHRoZSB6b29tIGZhY3RvclxyXG4gICAgICAgIGxldCB0bXBTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbih6b29tRnVuY3Rpb24ucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKHpvb21GdW5jdGlvbi5kb21haW4oKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgdGltZVxyXG4gICAgICAgIHNldEluZGV4VGltZShNYXRoLmZsb29yKCh0bXBTY2FsZShjb29yZHNbMF0gLSBtYXJnaW4ubGVmdCkpICogcmF0aW8pKTtcclxuICAgIH07XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICB6b29tRnVuY3Rpb24gPSB4LmRvbWFpbih0LnJlc2NhbGVYKHgyKS5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIC8vIHpvb20gZWFjaCBhdmFpYWJsZSBsaW5lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBsaW5lcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tR3JvdXAuc2VsZWN0KCgnIycgKyBrZXkgKyAnTGluZScpKS5hdHRyKCdkJywgbGluZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gem9vbSB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0cmVuZENoYXJ0c1pvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmVuZENoYXJ0c1pvb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgoJyMnICsga2V5ICsgJ1RyZW5kQ2hhcnQgLicgKyB0cmVuZENoYXJ0c0VsZW1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0cmVuZENoYXJ0c1pvb21ba2V5XVt0cmVuZENoYXJ0c0VsZW1baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzY2FsZSB0aGUgYXhpc1xyXG4gICAgICAgICAgICBnWGF4aXMuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3ZnIHJlc2l6YWJsZVxyXG4gICAgbGV0IHN3YXJtTGluZUNoYXJ0ID0gZDMuc2VsZWN0KCcjc3dhcm0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLUxpbmVDaGFydENvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyBsaW5lQ2hhcnRXaWR0aCArICcgJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW4uYm90dG9tKSlcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSk7XHJcblxyXG4gICAgem9vbUdyb3VwID0gc3dhcm1MaW5lQ2hhcnRcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydFpvb20nKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4ubGVmdCArICcsMCknKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgYSBncm91cCBmb3IgdGhlIHggYXhpc1xyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpc0xpbmVDaGFydCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgbGluZUNoYXJ0SGVpZ2h0ICsgJyknKVxyXG4gICAgICAgIC5jYWxsKHhBeGlzKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgYSBncm91cCBmb3IgdGhlIHkgYXhpc1xyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpc0xpbmVDaGFydCcpXHJcbiAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuXHJcbiAgICAvLyB0aGUgdGltZSBsaW5lIGFwcGVuZCB0aGUgbGluZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbWVMaW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0VGltZUxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCd4MScsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kxJywgMClcclxuICAgICAgICAuYXR0cigneDInLCAwKVxyXG4gICAgICAgIC5hdHRyKCd5MicsIGxpbmVDaGFydEhlaWdodCk7XHJcblxyXG4gICAgLy8gKipcclxuICAgIC8vIGNvbG9ycyBmb3IgdGhlIGxpbmVzXHJcbiAgICBsZXQgbGluZV9jb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XHJcbiAgICBsZXQgbGluZXMgPSB7fTtcclxuICAgIC8vIGFkZCB0aGUgbGluZXMgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWluID0gZDMubWluKGxpbmVDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbc3dhcm1fZmVhdHVyZXNbaV1dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgobGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lKClcclxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZFsndGltZSddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbc3dhcm1fZmVhdHVyZXNbaV1dKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmVzW3N3YXJtX2ZlYXR1cmVzW2ldXSA9IGxpbmU7XHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIGxpbmUgdG8gdGhlIGxpbmUgY2hhcnRcclxuICAgICAgICB6b29tR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmRhdGEoW2xpbmVDaGFydERhdGFdKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBsaW5lQ2hhcnRMaW5lJylcclxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBsaW5lX2NvbG9ycyhpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgICAgICAuYXR0cignbmFtZScsIHN3YXJtX2ZlYXR1cmVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcjbGluZUNoYXJ0VGltZUxpbmUnKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGVcclxuICAgIHpvb21Hcm91cC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd6b29tJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsaW5lQ2hhcnRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGluZUNoYXJ0SGVpZ2h0KVxyXG4gICAgICAgIC5jYWxsKHpvb20pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGRyYWdnZWQpXHJcbiAgICAgICAgLmNhbGwoZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5vbignZHJhZycsIGRyYWdnZWQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIGxlZ2VuZCBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIGxldCBsZWdlbmRXaWR0aCA9IDEwMDtcclxuICAgIGxldCBsZWdlbmRIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvL3NlbGVjdCBhbGwgdGhlIGxpbmVzXHJcbiAgICBsZXQgY2hhcnRMaW5lcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmUnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBhIGdyb3VwIGZvciB0aGUgbGVnZW5kXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoY2hhcnRMaW5lcy5fZ3JvdXBzWzBdKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQuc3R5bGUuc3Ryb2tlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdMZWdlbmRUaXRsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0bGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggKyAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgKyAnOiAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgdmFsdWUgb2YgdGhlIGxpbmVcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydGxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGV4cHJlc3Npb24gZ2V0cyB0aGUgdGV4dCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyMnICsgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJykubm9kZSgpLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICtcclxuICAgICAgICAgICAgICAgICAgICAxMCkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJzAuMCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgbGVnZW5kIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRzXHJcbiAgICBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICd0cmVuZENoYXJ0TGVnZW5kJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luLmJvdHRvbSArICcsJyArIChsaW5lQ2hhcnRIZWlnaHQgKyBtYXJnaW5Ub0xlZ2VuZCkgKyAnKScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgIC5kYXRhKFsnNSUgLSA5NSUnLCAnMjUlIC0gNzUlJywgJ01lZGlhbiddKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLy9hcHBlbmQgdGhlIHdob2xlIGxlZ2VuZCBpbiBhIGVhY2ggZnVuY3Rpb25cclxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjaW5nID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgdGV4dFNwYWNlID0gNDA7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgcmVjdGFuZ2xlcyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgbGVnZW5kV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzc0YTljZic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnIzA0NWE4ZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNTI1MjUyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgdGV4dCBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lQ2hhcnRsZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkKTtcclxuICAgICAgICB9KTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBsaW5lIGNoYXJ0IGJ1dHRvbiBsaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCgnI2RyYXdTd2FybScgKyBzd2FybV9mZWF0dXJlc1tpXSkpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgoJyMnICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnTGluZScpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuJCgnLmRyYXctZGV0YWlscycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGRpc2FibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICBhZGRUcmVuZENoYXJ0KHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZW1vdmVUcmVuZENoYXJ0KCk7XHJcbiAgICAgICAgZW5hYmxlTGluZUNoYXJ0KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZGlzYWJsZUxpbmVDaGFydCgpIHtcclxuICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcubGluZUNoYXJ0Q2hlY2tCb3gnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICQoJy5saW5lQ2hhcnRMaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmUgY2hhcnQgZGV0YWlscyBjbGljayBsaXN0ZW5lclxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJy5saW5lQ2hhcnRDaGVja0JveCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVUcmVuZENoYXJ0KCkge1xyXG4gICAgJCgnLnRyZW5kQ2hhcnREYXRhJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgdHJlbmQgY2hhcnQgc2hvd2luZyBtZWRpYW4gYW5kIHBlcmNlbnRpbGVzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gd2hpY2ggZmVhdHVyZSAgXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRUcmVuZENoYXJ0KGVsZW0pIHtcclxuICAgIC8vIGNoZWNrIHdoaWNoIGZlYXR1cmUgdG8gZGlzcGxheSBpbiB0aGUgdHJlbmQgY2hhcnRcclxuICAgIGxldCBmZWF0dXJlID0gJyc7XHJcbiAgICBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzcGVlZCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdzcGVlZCc7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWNjZWxlcmF0aW9uJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ2FjY2VsZXJhdGlvbic7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZGlzdGFuY2UtY2VudHJvaWQnKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnZGlzdGFuY2VfY2VudHJvaWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBkYXRhIGlzIG5vdCBsb2FkZWQgZnVsbHkgLS0gcmV0dXJuXHJcbiAgICBpZiAoIWRhdGFzZXRbMF1bZmVhdHVyZV0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBjaGFuZ2UgdG8gdGhlIHRyZW5kIGNoYXJ0IGxlZ2VuZFxyXG4gICAgJCgnI2xpbmVDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuICAgICQoJyN0cmVuZENoYXJ0TGVnZW5kJykuc2hvdygpO1xyXG4gICAgLy8gY2hlY2sgaWYgYWxyZWFkeSBjb21wdXRlZCBhbmQgb25seSBoaWRkZW5cclxuICAgIGlmICghJCgoJyMnICsgZmVhdHVyZSArICdUcmVuZENoYXJ0JykpLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgZGF0YSBmb3IgdGhlIHRyZW5kIGNoYXJ0XHJcbiAgICAgICAgbGV0IHRyZW5kQ2hhcnREYXRhID0gW107XHJcbiAgICAgICAgbGV0IG51bV9hbmltYWxzID0gYW5pbWFsX2lkcy5sZW5ndGg7XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJjZXRpbGVzIGZvciBldmVyeSB0aW1lIHN0ZXBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtX2FuaW1hbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0W2kgKiBudW1fYW5pbWFscyArIGpdW2ZlYXR1cmVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0RGF0YS5wdXNoKHBlcmNlbnRpbGVzKHRtcCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FnZ3JlZ2F0ZSBhbmQgYXZlcmFnZSB0aGUgdHJlbmRDaGFydERhdGEgdG8gbGluZUNoYXJ0V2lkdGggZGF0YSBwb2ludHNcclxuICAgICAgICBpZiAodHJlbmRDaGFydERhdGEubGVuZ3RoID4gbGluZUNoYXJ0V2lkdGgpIHtcclxuICAgICAgICAgICAgbGV0IHRtcFRyZW5kQ2hhcnREYXRhID0gW107XHJcbiAgICAgICAgICAgIHJhdGlvID0gTWF0aC5jZWlsKHRyZW5kQ2hhcnREYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICBsZXQgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdncmVnYXRlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0cmVuZENoYXJ0RGF0YVtpXVtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRpdmlkZVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgdG8gdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wVHJlbmRDaGFydERhdGEucHVzaCh0bXApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVuZENoYXJ0RGF0YSA9IHRtcFRyZW5kQ2hhcnREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgbWluIGFuZCBtYXggZm9yIHRoZSBub3JtYWxpemF0aW9uXHJcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbih0cmVuZENoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFswXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWF4ID0gZDMubWF4KHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBub3JtYWxpemF0aW9uU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbbWluLCBtYXhdKS5yYW5nZShbMCwgMTAwXSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydCA9IHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoZmVhdHVyZSArICdUcmVuZENoYXJ0JykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0cmVuZENoYXJ0RGF0YScpO1xyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGUgYWdhaW4gdG8gdGhlIGVuZCBvZiB0aGUgZ3JvdXBcclxuICAgICAgICAkKCcuem9vbScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgICAgIC8vIHZhciB0byBzYXZlIHRoZSBmdW5jdGlvbnMgZm9yIHRoZSB6b29tXHJcbiAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJlbmRDaGFydHNFbGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9ucyBmb3IgdGhlIHVwcGVyIGFuZCBpbm5lciBhcmVhcyBhbmQgdGhlIG1lZGlhblxyXG4gICAgICAgICAgICBsZXQgdGVtcDtcclxuICAgICAgICAgICAgLy8gbG93ZXIgb3V0ZXIgYXJlYSBhbmQgbG93ZXIgaW5uZXIgYXJlYVxyXG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkMy5hcmVhKClcclxuICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgKyAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbWVkaWFuIGxpbmVcclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdXBwZXIgaW5uZXIgYXJlYSBhbmQgdXBwZXIgb3V0ZXIgYXJlYVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgLSAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzYXZlIHRoaXMgZm9yIHRoZSBsYXRlciB6b29tXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXVt0cmVuZENoYXJ0c0VsZW1baV1dID0gdGVtcDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIGl0IHRvIHRoZSBwYXRoXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnQuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKFt0cmVuZENoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCB0cmVuZENoYXJ0c0VsZW1baV0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gc2hvdyB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICAkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saW5lX2NoYXJ0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCQsIGQzKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBuZXR3b3JrSGllcmFyY2h5XHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbmRleFRpbWVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcnO1xyXG5cclxubGV0IHpvb21Hcm91cDtcclxubGV0IHRyZWVtYXA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9kZW5kcm9ncmFtKCkge1xyXG4gICAgbGV0IG1hcmdpbiA9IDIwLFxyXG4gICAgICAgIHdpZHRoID0gNTAwMCxcclxuICAgICAgICBoZWlnaHQgPSA1MDAwO1xyXG4gICAgLy8gYW5pbWFsX2lkcy5sZW5ndGggKiAzMFxyXG4gICAgbGV0IHpvb20gPSBkMy56b29tKClcclxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDEwXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jb25zdHJhaW5lZCB6b29taW5nXHJcbiAgICAgICAgICAgIC8vIG1vZGlmeSB0aGUgdHJhbnNsYXRlIHNvIHRoYXQgaXQgbmV2ZXIgZXhpdHMgdGhlIHRhbmtcclxuICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnggPSBNYXRoLm1pbigwLCB3aWR0aCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgod2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgaGVpZ2h0ICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heChoZWlnaHQgKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLnkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBhbmQgc2NhbGVcclxuICAgICAgICAgICAgem9vbUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnI2RlbmRyb2dyYW0tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWRlbmRyb2dyYW1Db250YWluZXInLCB0cnVlKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50JywgdHJ1ZSlcclxuICAgICAgICAuYXR0cignaWQnLCAnbWFpbi12aXMtc3ZnJylcclxuICAgICAgICAuY2FsbCh6b29tKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbWFyZ2luICsgJywnICsgbWFyZ2luICsgJyknKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJyk7XHJcblxyXG4gICAgdHJlZW1hcCA9IGQzLnRyZWUoKSAvL2QzLmNsdXN0ZXIoKVxyXG4gICAgICAgIC5zaXplKFsoaGVpZ2h0IC0gbWFyZ2luKSwgKHdpZHRoIC0gbWFyZ2luKV0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfZGVuZHJvZ3JhbSgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKG5ldHdvcmtIaWVyYXJjaHkpO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKG5ldHdvcmtIaWVyYXJjaHlbaW5kZXhUaW1lXSk7XHJcbiAgICAvLyBoaWRlIGlmIG5vIG5ldHdvcmsgaXMgY2hvb3NlblxyXG4gICAgaWYgKCQoJyNzaG93LWRlbmRyb2dyYW0nKS5oYXNDbGFzcygnYWN0aXZlJykgPT09IHRydWUgJiYgISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZXknKTtcclxuICAgICAgICAvLyAkKCcjZGVuZHJvZ3JhbS12aXMnKS5zaG93KCk7XHJcbiAgICAgICAgLy8gaWYgKCQoJyNtYWluLXZpcy1kaXYnKS5hdHRyKCdjbGFzcycpID09PSAnY29sLW1kLTEyJykge1xyXG4gICAgICAgIC8vICAgICAkKCcjbWFpbi12aXMtZGl2JykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC0xMicpO1xyXG4gICAgICAgIC8vICAgICAkKCcjbWFpbi12aXMtZGl2JykuYWRkQ2xhc3MoJ2NvbC1tZC04Jyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVtpbmRleFRpbWVdO1xyXG4gICAgICAgIGxldCBub2RlcyA9IGQzLmhpZXJhcmNoeSh0cmVlRGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5jaGlsZHJlbjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gbWFwcyB0aGUgbm9kZSBkYXRhIHRvIHRoZSB0cmVlIGxheW91dFxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcblxyXG4gICAgICAgIC8vIERBVEEgSk9JTiAtIGxpbmtzIChlZGdlcylcclxuICAgICAgICBsZXQgbGluayA9IHpvb21Hcm91cFxyXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKVxyXG4gICAgICAgICAgICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpLnNsaWNlKDEpKTtcclxuXHJcbiAgICAgICAgLy8gRU5URVJcclxuICAgICAgICBsaW5rXHJcbiAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zaXRpb24gbGlua3MgdG8gdGhlaXIgbmV3IHBvc2l0aW9uLlxyXG4gICAgICAgIGxpbmtcclxuICAgICAgICAgICAgLy8gLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAvLyAuZHVyYXRpb24oZHVyYXRpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZGlhZ29uYWxMaW5lcyk7XHJcbiAgICAgICAgLy8gRVhJVFxyXG4gICAgICAgIGxpbmsuZXhpdCgpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcblxyXG4gICAgICAgIC8vIERBVEEgSk9JTiAtIG5vZGVzXHJcbiAgICAgICAgLy8gYWRkcyBlYWNoIG5vZGUgYXMgYSBncm91cFxyXG4gICAgICAgIGxldCBub2RlID0gem9vbUdyb3VwXHJcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5ub2RlJylcclxuICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKSk7XHJcblxyXG4gICAgICAgIHZhciBub2RlRW50ZXIgPSBub2RlLmVudGVyKClcclxuICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnbm9kZScgK1xyXG4gICAgICAgICAgICAgICAgICAgIChkLmNoaWxkcmVuID8gJyBub2RlLS1pbnRlcm5hbCcgOiAnIG5vZGUtLWxlYWYnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFTlRFUlxyXG4gICAgICAgIG5vZGVFbnRlci5hcHBlbmQoJ2NpcmNsZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdyJywgMjApXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBjbGljayk7XHJcblxyXG4gICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgIC8vLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC8vIC5kdXJhdGlvbihkdXJhdGlvbilcclxuICAgICAgICBub2RlRW50ZXJcclxuICAgICAgICAgICAgLy8gLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC50cmFuc2l0aW9uKClcclxuICAgICAgICAvLyAuZHVyYXRpb24oZHVyYXRpb24pXHJcbiAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAvLyAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuXHJcbiAgICAgICAgLy8gLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC8vIC5kdXJhdGlvbihkdXJhdGlvbilcclxuICAgICAgICAvLyBFWElUXHJcbiAgICAgICAgbm9kZS5leGl0KClcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gYWRkcyB0aGUgdGV4dCB0byB0aGUgbm9kZVxyXG4gICAgICAgIC8vIG5vZGUuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAvLyAgICAgLmF0dHIoJ2R5JywgJy4zNWVtJylcclxuICAgICAgICAvLyAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZC5jaGlsZHJlbiA/IC0xMyA6IDEzO1xyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW4gPyAnZW5kJyA6ICdzdGFydCc7XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBkLmRhdGEubmFtZTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIC8vIGVsc2Uge1xyXG4gICAgLy8gJCgnI2RlbmRyb2dyYW0tdmlzJykuaGlkZSgpO1xyXG4gICAgLy8gaWYgKCQoJyNtYWluLXZpcy1kaXYnKS5hdHRyKCdjbGFzcycpID09PSAnY29sLW1kLTgnKSB7XHJcbiAgICAvLyAgICAgJCgnI21haW4tdmlzLWRpdicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtOCcpO1xyXG4gICAgLy8gICAgICQoJyNtYWluLXZpcy1kaXYnKS5hZGRDbGFzcygnY29sLW1kLTEyJyk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpYWdvbmFsTGluZXMoZCkge1xyXG4gICAgcmV0dXJuICdNJyArIGQueCArICcsJyArIGQueSArXHJcbiAgICAgICAgJ1YnICsgZC5wYXJlbnQueSArICdIJyArIGQucGFyZW50Lng7XHJcblxyXG5cclxuICAgIC8vIHJldHVybiAnTScgKyBkLnggKyAnLCcgKyBkLnkgK1xyXG4gICAgLy8gICAgICdDJyArIChkLnggKyBkLnBhcmVudC54KSAvIDIgKyAnLCcgKyBkLnkgK1xyXG4gICAgLy8gICAgICcgJyArIChkLnggKyBkLnBhcmVudC54KSAvIDIgKyAnLCcgKyBkLnBhcmVudC55ICtcclxuICAgIC8vICAgICAnICcgKyBkLnBhcmVudC54ICsgJywnICsgZC5wYXJlbnQueTtcclxufVxyXG5cclxuLy8gVG9nZ2xlIGNoaWxkcmVuIG9uIGNsaWNrLlxyXG5mdW5jdGlvbiBjbGljayhkKSB7XHJcbiAgICBjb25zb2xlLmxvZygnSGV5IHRoZXJlJyk7XHJcbiAgICBjb25zb2xlLmxvZyhkKTtcclxuICAgIC8vIGlmIChkLmNoaWxkcmVuKSB7XHJcbiAgICAvLyAgICAgZC5fY2hpbGRyZW4gPSBkLmNoaWxkcmVuO1xyXG4gICAgLy8gICAgIGQuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgICBkLmNoaWxkcmVuID0gZC5fY2hpbGRyZW47XHJcbiAgICAvLyAgICAgZC5fY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZHJhd19kZW5kcm9ncmFtKGQpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2hpZXJhcmNoeS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwbG9yZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmVhdHVyZXMgY2hlY2tib3ggYW5kIHJhZGlvIGJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggZGl2IHtcXHJcXG4gICAgY2xlYXI6IGJvdGg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBsYWJlbCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQzRDQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5LCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xcclxcbiAgICB0ZXh0LWluZGVudDogM2VtO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICB3aWR0aDogMi41ZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNEMUQzRDQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogI0MyQzJDMjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjNzc3O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4ICM5OTk7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogU1ZHIGVsZW1lbnRzIGFuZCB0ZXh0ICovXFxyXFxuXFxyXFxuLnN2Zy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudC1sZWdlbmQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAxMHB4O1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWxlZ2VuZENvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1MaW5lQ2hhcnRDb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgLyogZGVwZW5kcyBvbiBzdmcgcmF0aW8gKi9cXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDE3JTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWRlbmRyb2dyYW1Db250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tdmlzPnN2ZzpudGgtY2hpbGQoMSkge1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuI2RlbmRyb2dyYW0tdmlzIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZVxcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBwYXRoIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgbGluZSB7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjM7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLngge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnkge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXNMaW5lQ2hhcnQgcGF0aCBsaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi5saW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRpbWUgICovXFxyXFxuXFxyXFxuLmZyYW1lVGV4dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi8qIFNsaWRlciB0aWNrcyAgKi9cXHJcXG5cXHJcXG4udWktc2xpZGVyLXRpY2sge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAzcHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICMzMzdhYjc7XFxyXFxuICAgIGhlaWdodDogMC44ZW07XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTGFvZGluZyBnaWYgICAqL1xcclxcblxcclxcbiNsb2FkaW5nIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29sb3IgbGVnZW5kICAgICovXFxyXFxuXFxyXFxuLmxlZ2VuZCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVnZW5kVGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmVDaGFydGxlZ2VuZFRleHQge1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4udGltZUxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKnN3YXJtIGZlYXR1cmVzICovXFxyXFxuXFxyXFxuLmNlbnRyb2lkIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkb2lkIHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLmh1bGxQYXRoIHtcXHJcXG4gICAgZmlsbDogI2ZmZjtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzI1MjUyNTtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGF1bmF5VHJpYW5ndWxhdGlvbiB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjQ7XFxyXFxufVxcclxcblxcclxcbi5nbHlwaGljb24tcmVmcmVzaC1hbmltYXRlIHtcXHJcXG4gICAgLWFuaW1hdGlvbjogc3BpbiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbjIgLjdzIGluZmluaXRlIGxpbmVhcjtcXHJcXG59XFxyXFxuXFxyXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4yIHtcXHJcXG4gICAgZnJvbSB7XFxyXFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgIHRvIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHNwaW4ge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgIHRvIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3Igc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciAuYnRuIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjYmRiZGJkO1xcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciAuYWN0aXZlIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MSB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNkOWQ5ZDk7XFxyXFxufVxcclxcblxcclxcbiNidG4tZ3JleTIge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjOTY5Njk2O1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWRhcmsge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjNGQ0ZDRkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBicmV3ZXIgcGlja2VyIGRpdiAqL1xcclxcblxcclxcbi5wYWxldHRlIHtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZTtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXHJcXG4gICAgbWFyZ2luOiA0cHggMCA0cHggNHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYWFhO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhdGNoIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICB3aWR0aDogMjJweDtcXHJcXG4gICAgaGVpZ2h0OiAyMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udm9yb25vaSB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjI7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2lyY2xlIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiA2cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS40Mjg1NzE0Mjk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2lyY2xlLmJ0bi1sZyB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEzcHggMTNweDtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4zMztcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVG9vbHRpcCAqL1xcclxcblxcclxcbmRpdi50b29sdGlwIHtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KSAhaW1wb3J0YW50O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogIzFiODA5ZSAhaW1wb3J0YW50O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xcclxcbiAgICBib3JkZXItbGVmdC13aWR0aDogNXB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAgdGFibGUgdGQ6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmVDaGFydENoZWNrQm94LmRpc2FibGVkIHtcXHJcXG4gICAgY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi51cHBlck91dGVyQXJlYSwgLmxvd2VyT3V0ZXJBcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjNzRhOWNmO1xcclxcbiAgICBzdHJva2U6ICMzNjkwYzA7XFxyXFxufVxcclxcblxcclxcbi51cHBlcklubmVyQXJlYSwgLmxvd2VySW5uZXJBcmVhIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBmaWxsOiAjMDQ1YThkO1xcclxcbiAgICBzdHJva2U6ICMwMjM4NTg7XFxyXFxufVxcclxcblxcclxcbi5tZWRpYW5MaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlOiAjNTI1MjUyO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDU7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5OTk7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkICM0ZDRkNGQ7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMXB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuNCk7XFxyXFxufVxcclxcblxcclxcbi56b29tIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLnguYXhpc0xpbmVDaGFydD5nPnRleHQge1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4uYXJyb3cge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1saW5lIHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbiAgICBzdHJva2U6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbiNjZW50cm9pZC1hcnJvdyB7XFxyXFxuICAgIGZpbGw6ICNlNzI5OGE7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IC01cHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogLTEwcHg7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogdGhpY2sgc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBzcGFuIHtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBmb250LXNpemU6IDNlbTtcXHJcXG4gICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgYm9yZGVyOiB0aGljayBzb2xpZCB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5tb2QtaGVhZCBoMiB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDdweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC50MiAubW9kLWhlYWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLmNsb3NlIHtcXHJcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaGVhZGVyIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICNlNWU1ZTU7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1zd2F0Y2gtY2xpY2thYmxlOmhvdmVyIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJvcGRvd24tbWVudSB7XFxyXFxuICAgIG1pbi13aWR0aDogNDBweDtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbWV0YWRhdGEtaW5wdXQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgbGkge1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHNwYW4ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbiAgICBmbG9hdDogbGVmdDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYmwtYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzdmYzk3ZjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYzA4NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCAuYWItYXZnIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM4NmNiMDtcXHJcXG59XFxyXFxuXFxyXFxuLm5ldHdvcmtFZGdlcyB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm9kZSB0ZXh0IHtcXHJcXG4gICAgZm9udDogMTJweCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG4ubm9kZS0taW50ZXJuYWwgdGV4dCB7XFxyXFxuICAgIHRleHQtc2hhZG93OiAwIDFweCAwICNmZmYsIDAgLTFweCAwICNmZmYsIDFweCAwIDAgI2ZmZiwgLTFweCAwIDAgI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmsge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICM2MzYzNjM7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jc2hvdy1kZW5kcm9ncmFtLWRpdiB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogLTExMHB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vZXhwbG9yZS9leHBsb3JlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=