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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__metadata_js__ = __webpack_require__(4);
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
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["g" /* streamMovementData */]();

    // get the dataSetPercentile
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["e" /* getPercentile */]();

    // get the swarm features for the line chart
    __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__["f" /* getSwarmFeatures */]();

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interaction_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__color_picker_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__listener_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__legend_js__ = __webpack_require__(6);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listener_js__ = __webpack_require__(9);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["e"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["f"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkDataButton;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDatasetFeature;
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
 * @param {String} feature - for instance speed, swarm_convex_hull_area etc.
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
                console.log(data[0]['hierarchy']);
                console.log(JSON.parse(data[0]['hierarchy']));
                Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["setNetworkHierarchy"])(JSON.parse(data[0]['hierarchy']));
            }
        }
    });

}


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playBoolean; });
/* harmony export (immutable) */ __webpack_exports__["a"] = initListeners;
/* harmony export (immutable) */ __webpack_exports__["c"] = setPlayBoolean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_spatial_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spatial_view_interaction_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spatial_view_legend_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ajax_queries_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__spatial_view_color_picker__ = __webpack_require__(5);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters, Set*/




















let JSONAPI_MIMETYPE = 'application/vnd.api+json';
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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/medoid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][i]['medoid'] = data[i];
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* enablePlayButton */])();
                    }
                });

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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/centroid',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][i]['centroid'] = [Math.round(data[i][0] * 100) / 100, Math.round(data[i][1] * 100) / 100];
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* enablePlayButton */])();
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
            if (!('hull' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/convex_hull',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setSwarmData"])(data, 'hull');
                        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* enablePlayButton */])();
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
            if (!('triangulation' in __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][0])) {
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/triangulation',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setSwarmData"])(data, 'triangulation');
                        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* enablePlayButton */])();
                    }
                });
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
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* disablePlayButton */])();
                $.ajax({
                    url: '/api/dataset/' + parameters['id'] + '/voronoi',
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Accept': JSONAPI_MIMETYPE
                    },
                    success: function(data) {
                        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"].length; i++) {
                            __WEBPACK_IMPORTED_MODULE_6__explore_js__["swarmData"][i]['voronoi'] = data[i];
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* enablePlayButton */])();
                    }
                });
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
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(function() {
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkData"])({});
        Object(__WEBPACK_IMPORTED_MODULE_6__explore_js__["setNetworkHierarchy"])({});
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
/* harmony export (immutable) */ __webpack_exports__["a"] = draw_dendrogram;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window,$, d3*/
// import * as spv from './spatial_view.js';





let margin = {
        top: 20,
        right: 90,
        bottom: 30,
        left: 90
    },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

function draw_dendrogram() {
    // console.log(networkHierarchy);

    // console.log(networkHierarchy[indexTime]);
    // hide if no network is choosen
    if (!$.isEmptyObject(__WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"])) {
        $('#dendrogram-vis').show();

        let treemap = d3.tree()
            .size([height, width]);

        let treeData = __WEBPACK_IMPORTED_MODULE_0__explore_js__["networkHierarchy"][__WEBPACK_IMPORTED_MODULE_1__spatial_view_spatial_view__["g" /* indexTime */]];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = d3.select('#dendrogram-vis').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom),
            g = svg.append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        // adds the links between the nodes
        let link = g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', function(d) {
                return 'M' + d.y + ',' + d.x +
                    'C' + (d.y + d.parent.y) / 2 + ',' + d.x +
                    ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x +
                    ' ' + d.parent.y + ',' + d.parent.x;
            });

        // adds each node as a group
        let node = g.selectAll('.node')
            .data(nodes.descendants())
            .enter().append('g')
            .attr('class', function(d) {
                return 'node' +
                    (d.children ? ' node--internal' : ' node--leaf');
            })
            .attr('transform', function(d) {
                return 'translate(' + d.y + ',' + d.x + ')';
            });

        // adds the circle to the node
        node.append('circle')
            .attr('r', 10);

        // adds the text to the node
        node.append('text')
            .attr('dy', '.35em')
            .attr('x', function(d) {
                return d.children ? -13 : 13;
            })
            .style('text-anchor', function(d) {
                return d.children ? 'end' : 'start';
            })
            .text(function(d) {
                return d.data.name;
            });


    } else {
        $('#dendrogram-vis').hide();
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
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-content-legend {\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-legendContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 10%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: hidden;\r\n}\r\n\r\n.svg-LineChartContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axisLineChart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frameText {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legendText {\r\n    font-size: 1.5em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.lineChartlegendText {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.timeLine {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hullPath {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.delaunayTriangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.lineChartCheckBox.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upperOuterArea, .lowerOuterArea {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upperInnerArea, .lowerInnerArea {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.medianLine {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axisLineChart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.networkEdges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmRkZDliNzI5NDMxOTRlOWJhYWEiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL25ldHdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcvY29sb3JfcGlja2VyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3L2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL3NwYXRpYWxfdmlldy9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbGluZV9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2hpZXJhcmNoeS5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2V4cGxvcmUuY3NzP2RlNGMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdDOztBQUlBOztBQUVEO0FBQ0E7O0FBRUEsaUJBQXdCO0FBQ3hCLHlCQUFnQztBQUNoQyxtQkFBMEI7QUFDMUIsMkJBQWtDO0FBQ2xDLHFCQUE0QjtBQUM1QiwwQkFBaUM7Ozs7QUFJakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCOztBQUVwQztBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSkE7QUFBQTtBQUNBO0FBQ0E7QUFLQzs7QUFPQTs7QUFNQTs7QUFJQTs7QUFRQTs7QUFJQTs7QUFLQTs7QUFLQTs7QUFJQTs7QUFJQTs7QUFFRCxrQkFBeUI7QUFDekI7QUFDQTtBQUNBLDBCQUFpQztBQUNqQyxzQkFBNkI7QUFDN0IsdUJBQThCO0FBQzlCLGlCQUF3QjtBQUN4QixlQUFzQjs7QUFFdEIsaUJBQWlCO0FBQ2pCLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpRUFBb0I7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHNEQUFzRCxpQ0FBaUMsZUFBZSxhQUFhOztBQUVuSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHlCQUF5QjtBQUN4RCx1Q0FBdUMseUJBQXlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxtQ0FBbUMsb0JBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0dBQWtFOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeHhCQTtBQUFBO0FBQ0E7O0FBRUEsd0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REE7QUFBQTtBQUNBO0FBQ0E7O0FBSUM7O0FBSUE7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REE7QUFBQTtBQUNBO0FBQ0E7O0FBSUM7OztBQUdELHVCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUVBQTRCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRztBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxtQkFBbUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5RUFBNEI7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQ0E7QUFDQTs7QUFJQzs7QUFJQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFDQTs7QUFFQTs7QUFJQzs7QUFFRCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSUE7QUFBQTtBQUNBOztBQUVBOztBQUtDOztBQUtBOztBQUlBOztBQU1BOzs7QUFNQTs7QUFTQTs7QUFLQTs7QUFJQTs7QUFFRDtBQUNBLFVBQVU7QUFDVix1QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1FQUFzQjtBQUM3QztBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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O0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6ImV4cGxvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZGRkOWI3Mjk0MzE5NGU5YmFhYSIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQgKi9cclxuLy8gaW1wb3J0IGFsbCBqc1xyXG5pbXBvcnQgKiBhcyBxdWVyaWVzIGZyb20gJy4vYWpheF9xdWVyaWVzLmpzJztcclxuaW1wb3J0IHtcclxuICAgIHNwYXRpYWxWaWV3SW5pdFxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgaW5pdGlhbGl6ZU1ldGFkZGF0YVxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuLy8gaW1wb3J0IGNzc1xyXG5pbXBvcnQgJy4vZXhwbG9yZS5jc3MnO1xyXG5cclxuZXhwb3J0IGxldCBkYXRhc2V0ID0gW107IC8vIG1haW4gZGF0YXNldCB3aXRoIHZhbHVlcyBmb3IgZWFjaCBpbmRpdmlkdWFsIGFuaW1hbFxyXG5leHBvcnQgbGV0IGRhdGFzZXRNZXRhZGF0YSA9IFtdOyAvLyBtZXRhZGF0YXNldCBmb3IgZWFjaCBpbmRpdmlkdWFsIGZpc2hcclxuZXhwb3J0IGxldCBzd2FybURhdGEgPSBbXTsgLy8gc3dhcm1kYXRhIGZvciBsaW5lY2hhcnQgYW5kIGFsc28gb3RoZXIgc3dhcm0gZmVhdHVyZXNcclxuZXhwb3J0IGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IHt9OyAvLyBwZWNlbnRpbGVzIG5lZWRlZCBmb3IgdGhlIGNvbG9yIG1hcHBpbmdcclxuZXhwb3J0IGxldCBuZXR3b3JrRGF0YSA9IHt9OyAvLyBuZXR3b3JrIGRhdGFcclxuZXhwb3J0IGxldCBuZXR3b3JrSGllcmFyY2h5ID0ge307IC8vIG5ldHdvcmsgZGF0YVxyXG5cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBiYXNpYyBkYXRhIHRvIGdldCB0aGUgdG9vbCBydW5uaW5nLlxyXG4gKiBhZnRlciB0aGUgcGVuZGluZyBhamF4IHF1ZXJpZXMgYXJlIGZpbmlzaGVkXHJcbiAqIHRoZSB0b29sIGlzIGRyYXduXHJcbiAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbW92ZW1lbnQgZGF0YVxyXG4gICAgcXVlcmllcy5zdHJlYW1Nb3ZlbWVudERhdGEoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGRhdGFTZXRQZXJjZW50aWxlXHJcbiAgICBxdWVyaWVzLmdldFBlcmNlbnRpbGUoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgcXVlcmllcy5nZXRTd2FybUZlYXR1cmVzKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtZXRhZGF0YSBhbmQgaW5pdGlhbGl6ZSB0aGUgbWV0YWRhIHdpbmRvd1xyXG4gICAgcXVlcmllcy5nZXRNZXRhRGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgaW5mb3JtYXRpb24gaWYgdGhlcmUgYXJlIGFscmVhZHkgbmV0d29ya3MgY3JlYXRlZCBmb3IgdGhpcyBkYXN0YXNldFxyXG4gICAgcXVlcmllcy5nZXROZXR3b3JrRGF0YUJ1dHRvbigpO1xyXG5cclxuICAgIC8vIGlmIGFsbCBhamF4IHF1ZXJpZXMgYXJlIGNvbXBlbHRlIGluaXRpYWxpemVcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBjaGVja1BlbmRpbmdSZXF1ZXN0KCkge1xyXG4gICAgICAgICAgICBpZiAoJC5hY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BhdGlhbFZpZXdJbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgIH0pKCk7XHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENvbmNhY3QgdG8gdGhlIG1haW4gZGF0YXNldFxyXG4gKiB0aGUgaWRlYSBpcyB0byB1c2UgdGhpcyBvbmUgZGF5IGZvciBsYXp5IGxvYWRpbmdcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBtb3ZlbWVudCBkYXRhc2V0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0YXNldCh2YWx1ZSkge1xyXG4gICAgZGF0YXNldCA9IGRhdGFzZXQuY29uY2F0KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IHBlcmNlbnRpbGVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBhcnJhcnlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVNldFBlcmNlbnRpbGUodmFsdWUpIHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWV0YURhdGEodmFsdWUpIHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSA9IHZhbHVlO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGEoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgc3dhcm0gZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCxmZWF0dXJlXzEsLi4uXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSAtIHN0cmluZyBhcnJheSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSB0aGUgb2JqZWN0IHRvIHRoZSBhcnJheSBpZiB0aGVyZSBpcyBubyBlbGVtZW50IHlldFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3dhcm1EYXRhW2ldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBzd2FybURhdGEucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBpbnRlZ2VyIG9yIGZsb2F0XHJcbiAgICAgICAgaWYgKGRhdGFbaV0gJiYgIShpc05hTihkYXRhW2ldKSkpIHtcclxuICAgICAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHN3YXJtRGF0YVtpXVtmZWF0dXJlXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBmZWF0dXJlIGRpbWVuc2lvbiB0byB0aGUgZGF0YXNldFxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2YgZmVhdHVyZXMgdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW2ZlYXR1cmVfMCwgZmVhdHVyZV8xLC4uLl1cclxuICogQHBhcmFtIHtzdHJpbmd9IGZlYXR1cmUgLSBzdHJpbmcgYXJyYXkgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhc2V0RmVhdHVyZShkYXRhLCBmZWF0dXJlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBhZGQgdGhlIHRoZSBvYmplY3QgdG8gdGhlIGFycmF5IGlmIHRoZXJlIGlzIG5vIGVsZW1lbnQgeWV0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhc2V0W2ldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkYXRhc2V0LnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwYXJzZSB0aGUgaW50XHJcbiAgICAgICAgZGF0YXNldFtpXVtmZWF0dXJlXSA9ICtkYXRhW2ldO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIHZhbHVlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gQXJyYXkgb2Ygb2YgYXJyYXlzIHdpdGggYWxsIHZhbHVlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gdGhlIGNhbGN1bGF0ZWQgYWRqYWNlbmN5IG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtEYXRhKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrRGF0YSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGhpZWFyaGN5IHZhbHVlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC0gQXJyYXkgb2Ygb2YgYXJyYXlzIHdpdGggYWxsIHZhbHVlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggaGllcmFyY2h5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TmV0d29ya0hpZXJhcmNoeSh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0hpZXJhcmNoeSA9IHZhbHVlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9leHBsb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csICQsZDMsIHBhcmFtZXRlcnMsIFNldCAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCB7XHJcbiAgICBkYXRhc2V0LFxyXG4gICAgbmV0d29ya0RhdGEsXHJcbiAgICBzd2FybURhdGFcclxufSBmcm9tICcuLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBuZXR3b3JrQ29sb3JTY2FsZSxcclxuICAgIG5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXQsXHJcbiAgICBuZXR3b3JrTGltaXRcclxufSBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBsaW5lQ2hhcnQsXHJcbiAgICBsaW5lQ2hhcnRSYXRpbyxcclxuICAgIHpvb21GdW5jdGlvblxyXG59IGZyb20gJy4uL2xpbmVfY2hhcnQnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHBlcmNlbnRpbGVzXHJcbn0gZnJvbSAnLi4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VGltZVNsaWRlcixcclxuICAgIGluaXRUb29sdGlwLFxyXG4gICAgdG9vbHRpcEZ1bmN0aW9uLFxyXG4gICAgaW5pdFNsaWRlcnMsXHJcbiAgICB0b29sdGlwXHJcbn0gZnJvbSAnLi9pbnRlcmFjdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgbWV0YWRhdGFDb2xvclxyXG59IGZyb20gJy4uL21ldGFkYXRhLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBpbml0Q29sb3JQaWNrZXIsXHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRMaXN0ZW5lcnMsXHJcbiAgICBwbGF5Qm9vbGVhblxyXG59IGZyb20gJy4uL2xpc3RlbmVyLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRTcGF0aWFsVmlld0dyb3VwXHJcbn0gZnJvbSAnLi9sZWdlbmQuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRyYXdfZGVuZHJvZ3JhbVxyXG59IGZyb20gJy4uL2hpZXJhcmNoeS5qcyc7XHJcblxyXG5leHBvcnQgbGV0IGluZGV4VGltZSA9IDA7IC8vIGFjdHVhbCB0aW1lIG1vbWVudCBpbiB0aGUgYW5pbWF0aW9uXHJcbmV4cG9ydCBsZXQgdGFua1dpZHRoO1xyXG5leHBvcnQgbGV0IHRhbmtIZWlnaHQ7XHJcbmV4cG9ydCBsZXQgYWN0aXZlU2NhbGUgPSAnYmxhY2snOyAvLyBjYW4gYmUgc3BlZWQsIGFjY2VsZXJhdGlvbiwgLi4gYW5kIGJsYWNrIChtZWFuaW5nIG5vIGFjdGl2ZSBzY2FsZSlcclxuZXhwb3J0IGxldCBtZWRvaWRBbmltYWwgPSAtMTsgLy8gd2hpY2ggYW5pbWFsIGlzIHRoZSBtZWRvaWQgKC0xIGlzIG5vIGFuaW1hbClcclxuZXhwb3J0IGxldCBhY3RpdmVBbmltYWxzID0gW107IC8vIGFjdGl2ZSBzZWxlY3RlZCBhbmltYWxzXHJcbmV4cG9ydCBsZXQgYXJyYXlBbmltYWxzOyAvLyBhcnJheSBvZiBhbmltYWxzIGZvciB0aGUgc3BlY2lmaWMgdGltZSBmcmFtZVxyXG5leHBvcnQgbGV0IGFuaW1hbF9pZHM7IC8vIGFycmF5IG9mIHVuaXF1ZSBhbmltYWwgaWRzXHJcblxyXG5sZXQgc3ZnQ29udGFpbmVyOyAvLyBzdmcgY29udGFpbmVyIGZvciB0aGUgc3BhdGlhbCB2aWV3XHJcbmxldCB0YW5rOyAvLyBzdmcgZ3JvdXAgZm9yIHRoZSBzcGF0aWFsIHZpZXcgdGFua1xyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBzcGF0aWFsIHZpZXcgd2l0aCBhbGwgdGhlIGltcG9ydGFudCBmYWN0b3JzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3BhdGlhbFZpZXdJbml0KCkge1xyXG5cclxuICAgIGxldCBtaW5Qb2ludCA9IHBhcmFtZXRlcnNbJ21pbiddWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddO1xyXG4gICAgbGV0IG1heFBvaW50ID0gcGFyYW1ldGVyc1snbWF4J11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyBsZXQgY29vcmRpbmF0ZU9yaWdpbiA9IHBhcmFtZXRlcnNbJ2Nvb3JkaW5hdGVfb3JpZ2luJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAvLyB3aWR0aCA9IHdpZHRoICoxLjAyIC0tPiBzbyB0aGVyZSBpcyBhIG1hcmdpbiBpbiB0aGUgc3BhdGlhbCB2aWV3IHdoZXJlIG5vIGFuaW1hbCBpcyBldmVyXHJcbiAgICB0YW5rV2lkdGggPSAobWF4UG9pbnRbMF0gLSBtaW5Qb2ludFswXSkgKiAxLjAyO1xyXG4gICAgdGFua0hlaWdodCA9IChtYXhQb2ludFsxXSAtIG1pblBvaW50WzFdKSAqIDEuMDI7XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgdmlldyByZXNpemFibGVcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21haW4tdmlzJykuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50J1xyXG4gICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJCgnI21haW4tdmlzLWRpdicpLndpZHRoKClcclxuICAgICAgICAgICAgfSkuaGVpZ2h0KHRhbmtIZWlnaHQgKiAwLjUpXHJcbiAgICAgICAgICAgIC53aWR0aCh0YW5rV2lkdGggKiAwLjUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9yZXNldCBhbGwgY2hlY2tib3hlc1xyXG4gICAgJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgLy9zZXQgdGhlIGNvbG9yIHNjYWxlIGZ1bmN0aW9uIHRvIGxpbmVhclxyXG4gICAgJCgnI2NvbG9yLXNjYWxlLWxpbmVhcicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNncm91cC1zaXplLW0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJyNzZXR0aW5ncy1kaXYgaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAvL2hpZGUgdGhlIGxvYWRpbmcgZ2lmXHJcbiAgICAkKCcjbG9hZGluZycpXHJcbiAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAvLyBnZXQgIG51bWJlciBvZiBkaXN0aW5jdCBhbmltYWwgaWRzXHJcbiAgICBsZXQgbnVtX2FuaW1hbHMgPSBuZXcgU2V0KCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YXNldFtpXVsndCddID09PSBkYXRhc2V0WzBdWyd0J10pIHtcclxuICAgICAgICAgICAgbnVtX2FuaW1hbHMuYWRkKGRhdGFzZXRbaV1bJ2EnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSA9IGRhdGFzZXQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFuaW1hbF9pZHMgPSBBcnJheS5mcm9tKG51bV9hbmltYWxzKS5zb3J0KCk7XHJcblxyXG4gICAgLy9YIGFuZCBZIGF4aXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pXHJcbiAgICAgICAgLnJhbmdlKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKTtcclxuXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbbWluUG9pbnRbMV0sIG1heFBvaW50WzFdXSlcclxuICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNSaWdodCh5KVxyXG4gICAgICAgIC50aWNrcyg3KVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgLy8gWk9PTUlORyBBTkQgUEFOTklORyBTVFVGRlxyXG4gICAgLy8gVE9ETyByZW1vdmUgdGhpcyBmcm9tIGhlcmUgdG8gaW50ZXJhY3Rpb25cclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgNl0pXHJcbiAgICAgICAgLm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICAvLyBtb2RpZnkgdGhlIHRyYW5zbGF0ZSBzbyB0aGF0IGl0IG5ldmVyIGV4aXRzIHRoZSB0YW5rXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS54ID0gTWF0aC5taW4oMCwgdGFua1dpZHRoICogKGQzLmV2ZW50LnRyYW5zZm9ybS5rIC0gMSksXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0YW5rV2lkdGggKiAoMSAtIGQzLmV2ZW50LnRyYW5zZm9ybS5rKSwgZDMuZXZlbnQudHJhbnNmb3JtLngpKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnRyYW5zZm9ybS55ID0gTWF0aC5taW4oMCwgdGFua0hlaWdodCAqIChkMy5ldmVudC50cmFuc2Zvcm0uayAtIDEpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgodGFua0hlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGFuZCBzY2FsZVxyXG4gICAgICAgICAgICB6b29tR3JvdXAuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgZ1hheGlzLmNhbGwoeEF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVYKHgpKSk7XHJcbiAgICAgICAgICAgIGdZYXhpcy5jYWxsKHlBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWSh5KSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vdGhlIHN2ZyBjb250YWluZXJcclxuICAgIHN2Z0NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI21haW4tdmlzJylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjbGFzcyBzdmctY29udGVudFxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgLmNhbGwoem9vbSk7XHJcblxyXG5cclxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvLCBmb3IgIDEyNDAvMTkwMCA9IDAuNjUgc28gcGFkZGluZy1ib3R0b20gPSA2NSUgKi9cclxuICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCh0YW5rSGVpZ2h0IC8gdGFua1dpZHRoKSAqIDEwMCk7XHJcbiAgICAkKCcjbWFpbi12aXMnKS5hcHBlbmQoJCgnPHN0eWxlPiNtYWluLXZpczo6YWZ0ZXIge3BhZGRpbmctdG9wOiAnICsgcGVyY2VudGFnZSArICclO2Rpc3BsYXk6IGJsb2NrO2NvbnRlbnQ6IFwiXCI7fTwvc3R5bGU+ICcpKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzdmdDb250YWluZXIuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgIGlmIChwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpIHtcclxuICAgICAgICB6b29tR3JvdXBcclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAvLyAgLmF0dHIoJ2QnLHBhdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4bGluazpocmVmJywgJy8nICsgcGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFja2dyb3VuZEltYWdlJylcclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRhbmtIZWlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRhbmtXaWR0aClcclxuICAgICAgICAgICAgLy8gd2hpbGUgYWRkaW5nIGFuIGltYWdlIHRvIGFuIHN2ZyB0aGVzZSBhcmUgdGhlIGNvb3JkaW5hdGVzIGkgdGhpbmsgb2YgdGhlIHRvcCBsZWZ0XHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAuYXR0cigneScsICcwJylcclxuICAgICAgICAgICAgLmF0dHIoJ2JhY2tncm91bmQnLCAnI2ZmZicpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2FwcGVuZCB0aGUgdGFuayBncm91cCB3aXRoIGEgdHJhbnNmb3JtYXRpb24gd2hpY2ggcm90YXRlcyB0aGUgeSBheGlzXHJcbiAgICB0YW5rID0gem9vbUdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0YW5rJylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gMTtcclxuICAgICAgICAgICAgbGV0IHkgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF94KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuaW52ZXJ0ZWRfeSkge1xyXG4gICAgICAgICAgICAgICAgeSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnc2NhbGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vYWRkIHRoZSBjZW50cm9pZFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjZW50cm9pZCBoaWRkZW4nKVxyXG4gICAgICAgIC5hdHRyKCdyJywgNilcclxuICAgICAgICAuYXR0cignY3gnLCAwKVxyXG4gICAgICAgIC5hdHRyKCdjeScsIDApO1xyXG5cclxuICAgIC8vIGFycm93IGZvciB0aGUgY2VudHJvaWQgZGlyZWN0aW9uXHJcbiAgICB0YW5rLnNlbGVjdCgnI2ctY2VudHJvaWQnKVxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcclxuICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtYXJyb3cnKVxyXG4gICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgMTMpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxyXG4gICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNjZW50cm9pZC1hcnJvdyknKTtcclxuXHJcbiAgICAvL2FwcGVuZCBuZXR3b3JrICBncm91cFxyXG4gICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICduZXR3b3JrR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCBkZWxhdW5heVRyaWFuZ3VsYXRpb24gZ3JvdXBcclxuICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnZGVsYXVuYXlUcmlhbmd1bGF0aW9uR3JvdXAnKTtcclxuXHJcbiAgICAvL2FwcGVuZCB2b3Jvbm9pIGdyb3VwXHJcbiAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3Zvcm5vaUdyb3VwJyk7XHJcblxyXG4gICAgLy9hcHBlbmQgdGhlIGZyYW1lIHRpbWUgdGV4dFxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZyYW1lVGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAzMClcclxuICAgICAgICAuYXR0cigneScsIDMwKVxyXG4gICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBheGlzXHJcbiAgICBsZXQgZ1hheGlzID0gc3ZnQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIGxldCBnWWF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG4gICAgLy8gaW5pdCBzdHVmZiBmcm9tIG90aGVyIG1vZHVsZXNcclxuICAgIGluaXRUb29sdGlwKCk7XHJcbiAgICBpbml0U2xpZGVycygpO1xyXG4gICAgYWRkU3BhdGlhbFZpZXdHcm91cCgpO1xyXG4gICAgaW5pdENvbG9yUGlja2VyKCk7XHJcbiAgICBsaW5lQ2hhcnQoKTtcclxuICAgIGluaXRMaXN0ZW5lcnMoKTtcclxuICAgIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXdpbmcgZnVuY3Rpb24gLSBpcyBjYWxsZWQgZm9yIGVhY2ggdGltZXN0ZXBcclxuICogaW5kZXhUaW1lIHNhdmVzIHRoZSBjdXJyZW50IHRpbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lIG9mIGZ1bmN0aW9uIGRyYXdcclxuICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIC8vdXBkYXRlIHRpbWUgdG8gd2FpdCBha2Egc3BlZWQgb2YgcmVwbGF5XHJcbiAgICBsZXQgdGltZVRvV2FpdCA9ICQoJ2lucHV0W25hbWU9Z3JvdXAxXTpjaGVja2VkJywgJyNncm91cDEnKVxyXG4gICAgICAgIC52YWwoKTtcclxuICAgIC8vc2NhbGUgdGhlIHNpemUgYnkgdGhpcyBudW1iZXJcclxuICAgIGxldCBhbmltYWxTY2FsZSA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXS5ncm91cC1zaXplOmNoZWNrZWQnKVxyXG4gICAgICAgIC52YWwoKTtcclxuXHJcbiAgICAvL2dldCB0aGUgbmV4dCBhbmltYWxzXHJcbiAgICBhcnJheUFuaW1hbHMgPSBkYXRhc2V0LnNsaWNlKGFuaW1hbF9pZHMubGVuZ3RoICogaW5kZXhUaW1lLCBhbmltYWxfaWRzLmxlbmd0aCAqIGluZGV4VGltZSArIGFuaW1hbF9pZHMubGVuZ3RoKTtcclxuXHJcbiAgICAvL3RoZSB0aW1lb3V0IGlzIHNldCBhZnRlciBvbmUgdXBkYXRlIDMwIG1zXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgdGltZSBmcmFtZSB0ZXh0XHJcbiAgICAgICAgICAgIHN2Z0NvbnRhaW5lci5zZWxlY3QoJy5mcmFtZVRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoTWF0aC5mbG9vcihpbmRleFRpbWUgLyAxNTAwKSAlIDYwICsgJzonICsgTWF0aC5mbG9vcihpbmRleFRpbWUgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyBpbmRleFRpbWUgJSBwYXJhbWV0ZXJzWydmcHMnXSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGEgc2Vjb25kIGhhcyBjaGFuZ2VkIG1vdmUgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVTbGlkZXIoaW5kZXhUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN2Z0FuaW1hbHMgPSB0YW5rLnNlbGVjdEFsbCgnZy5hbmltYWwnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoYXJyYXlBbmltYWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5ldHdvcmsgdmlzXHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVmlzO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhUaW1lIGluIG5ldHdvcmtEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29yayA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IG5ldHdvcmtEYXRhW2luZGV4VGltZV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5QW5pbWFscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vZGUxJzogYXJyYXlBbmltYWxzW2ldWydhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTInOiBhcnJheUFuaW1hbHNbal1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGFydCc6IGFycmF5QW5pbWFsc1tpXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IGFycmF5QW5pbWFsc1tqXVsncCddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHRtcFt0bXBfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBfaW5kZXggPSB0bXBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldHdvcmsuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTEnXSArICctJyArIGRbJ25vZGUyJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoKCcjbWMtJyArIGRbJ25vZGUyJ10gKyAnLScgKyBkWydub2RlMSddKSkuY3NzKCdmaWxsJywgbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXR3b3JrQXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV0d29yay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKG5ldHdvcmtbaV1bJ3ZhbCddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV0d29yTGltaXQocGVyY2VudGlsZXModG1wQXJyYXkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrID0gbmV0d29yay5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXSA+PSBuZXR3b3JrTGltaXQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIERBVEEgSk9JTlxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0KCcjbmV0d29ya0dyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmtFZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEobmV0d29yayk7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEVcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzXHJcbiAgICAgICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydzdGFydCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3N0YXJ0J11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsnZW5kJ11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC1kWydlbmQnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0NvbG9yU2NhbGUoZFsndmFsJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV0d29ya1ZpcyA9IHRhbmsuc2VsZWN0QWxsKCdsaW5lLm5ldHdvcmtFZGdlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSBuZXR3b3JrXHJcbiAgICAgICAgICAgIG5ldHdvcmtWaXMuZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWxhdW5heSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIHZhciB0cmlhbmd1bGF0aW9uO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctdHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24gPSB0YW5rLnNlbGVjdCgnI2RlbGF1bmF5VHJpYW5ndWxhdGlvbkdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW3N3YXJtRGF0YVtpbmRleFRpbWVdWyd0cmlhbmd1bGF0aW9uJ11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUiAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZWxhdW5heVRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24gPSB0YW5rLnNlbGVjdEFsbCgncGF0aC5kZWxhdW5heVRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB0cmlhbmd1bGF0aW9uLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9yb25vaVxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2YXIgdm9yb25vaTtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGUgZ3JvdXAgZm9yIHRoZSB2b3Jvbm9pIHBhdGhzXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFua1xyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShzd2FybURhdGFbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdm9yb25vaVxyXG4gICAgICAgICAgICAgICAgdm9yb25vaS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Zvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdm9yb25vaVxyXG4gICAgICAgICAgICB2b3Jvbm9pLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9FTlRFUiAtIGFwcGVuZCB0aGUgYW5pbWFsIGdyb3Vwc1xyXG4gICAgICAgICAgICBsZXQgYW5pbWFsR3JvdXBpbmdzID0gc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FuaW1hbCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhbmltYWwtJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBjaXJjbGVzIGZvciBlYWNoIGFuaW1hbCB0byB0aGUgYW5pbWFsZ3JvdXBcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgMS41ICogYW5pbWFsU2NhbGUpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEZ1bmN0aW9uKGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIG9uIGNsaWNrIGZvciB0aGUgYWN0aXZlIGZpc2hzXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQW5pbWFscyA9IGFjdGl2ZUFuaW1hbHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzLnB1c2goZFsnYSddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUaW1lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVQREFURSAtIGFuaW1hbHMgY2lyY2xlc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnY2lyY2xlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGFuaW1hbFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBmb3IgZWFjaCBncm91cCB0aGUgYXJyb3csIG5lZWRlZCBmb3IgY29sb3JpbmdcclxuICAgICAgICAgICAgYW5pbWFsR3JvdXBpbmdzLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJvdy1tYXJrZXItJyArIGRbJ2EnXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWCcsIDIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignbWFya2VyV2lkdGgnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCAxMylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsICdNMiwyIEwyLDExIEwxMCw2IEwyLDInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3NcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCNhcnJvdy1tYXJrZXItJyArIGRbJ2EnXSArICcpJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9leGVjdXRlIG9ubHkgd2hlbiBkcmF3IGRpcmVjdGlvbiBidXR0b24gaXMgY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdsaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRbJ3AnXVswXSArIDIgKiBhbmltYWxTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ3AnXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLWRbJ2RpcmVjdGlvbiddICsgJyAnICsgZFsncCddWzBdICsgJyAnICsgLWRbJ3AnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdyBoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHRoZSBncm91cHNcclxuICAgICAgICAgICAgc3ZnQW5pbWFscy5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29udmV4IGh1bGxcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LWNvbnZleC1odWxsJylcclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOIC0gcGF0aHNcclxuICAgICAgICAgICAgICAgIHZhciBodWxsUGF0aCA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmh1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbc3dhcm1EYXRhW2luZGV4VGltZV1bJ2h1bGwnXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGhcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRU5URVIgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2h1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBubyBodWxsXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aCA9IHRhbmsuc2VsZWN0KCdwYXRoLmh1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBmaXNoXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgZXZlcnkgZmlzaCBibGFja1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChtZXRhZGF0YUNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhQ29sb3IpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjYW5pbWFsLScgKyBrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBtZXRhZGF0YUNvbG9yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgbWV0YWRhdGFDb2xvcltrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHN3YXJtRGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctZGlyZWN0aW9uJykuaXMoJzpjaGVja2VkJykgJiZcclxuICAgICAgICAgICAgICAgIHN3YXJtRGF0YVtpbmRleFRpbWVdLmNlbnRyb2lkICYmXHJcbiAgICAgICAgICAgICAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3dhcm1EYXRhW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zd2FybURhdGFbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydkaXJlY3Rpb24nXSArICcgJyArIHN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgJyAnICsgLXN3YXJtRGF0YVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1lZG9pZFxyXG4gICAgICAgICAgICBpZiAobWVkb2lkQW5pbWFsICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBtZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1lZG9pZEFuaW1hbCA9IHN3YXJtRGF0YVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBoaWVyYXJjaHlcclxuICAgICAgICAgICAgZHJhd19kZW5kcm9ncmFtKCk7XHJcblxyXG4gICAgICAgICAgICAvL25leHQgZnJhbWVcclxuICAgICAgICAgICAgaW5kZXhUaW1lKys7XHJcblxyXG4gICAgICAgICAgICBpZiAoZDMuc2VsZWN0KCcjbGluZUNoYXJ0VGltZUxpbmUnKSAmJiBzd2FybURhdGFbTWF0aC5jZWlsKGluZGV4VGltZSAvIGxpbmVDaGFydFJhdGlvKV0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBNYXRoLmNlaWwoaW5kZXhUaW1lIC8gbGluZUNoYXJ0UmF0aW8pO1xyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGxpbmUgY2hhcnQgbGVnZW5kIHRleHQgdmFsdWVzIHBlciBzZWNvbmRcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gY2hhbmdlIHRoaXMgdG8gYSBtb3JlIG1vZHVsYXIgd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY29udmV4X2h1bGxfYXJlYUxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KChzd2FybURhdGFbdG1wXVsnY29udmV4X2h1bGxfYXJlYSddKSArICdtbcKyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjc3BlZWRMaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnc3BlZWQnXSArICdtbS9zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjYWNjZWxlcmF0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2FjY2VsZXJhdGlvbiddICsgJ21tL3PCsicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2Rpc3RhbmNlX2NlbnRyb2lkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc3dhcm1EYXRhW3RtcF1bJ2Rpc3RhbmNlX2NlbnRyb2lkJ10gKyAnbW0nKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkaXJlY3Rpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsnZGlyZWN0aW9uJ10gKyAnwrAnKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNwb2xhcmlzYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzd2FybURhdGFbdG1wXVsncG9sYXJpc2F0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgem9vbUZ1bmN0aW9uKHRtcCkgKyAnLDApJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSA+PSBzd2FybURhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvL3N0YXJ0IGFnYWluIGZyb20gdGhlIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXlCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWVcclxuICAgICAgICAgICAgICAgIC8vICAgbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHQxIC0gdDApOyAvLyBpbiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZVRvV2FpdCk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIFNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGluZGV4IHRpbWUgdG8gYSBuZXcgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gbmV3IHRpbWUgc3RlcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKGluZGV4VGltZSA8PSBzd2FybURhdGEubGVuZ3RoKSkge1xyXG4gICAgICAgIGluZGV4VGltZSA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleFRpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVjcmVhc2UgdGltZSBieSAxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVjSW5kZXhUaW1lKCkge1xyXG4gICAgaW5kZXhUaW1lID0gaW5kZXhUaW1lIC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGhlIG5ldyBhY3RpdmUgc2NhbGUgLSBlLmcuIHNwZWVkLCBhY2NlbGVyYXRpb24sIGJsYWNrIGV0Yy5cclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIC0gYWN0aXZlIHNjYWxlIGZvciB0aGUgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2NhbGUodmFsdWUpIHtcclxuICAgIGFjdGl2ZVNjYWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldyBtZWRvaWQgYW5pbWFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFVuaXF1ZSBpZCBvZiB0aGUgYW5pbWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWVkb2lkQW5pbWFsKHZhbHVlKSB7XHJcbiAgICBtZWRvaWRBbmltYWwgPSB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc2VsZWN0ZWQgYW5kIGhpZ2hsaWdodGVkIGFuaW1hbHNcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiB1bnFpdWUgaWQgb2YgdGhlIGFuaW1hbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3RpdmVBbmltYWxzKHZhbHVlKSB7XHJcbiAgICBhY3RpdmVBbmltYWxzID0gdmFsdWU7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9zcGF0aWFsX3ZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgZDMgKi9cclxuXHJcbmV4cG9ydCBsZXQgbmV0d29ya0F1dG8gPSBmYWxzZTsgLy8gaWYgdHJ1ZSB0aGUgbmV0d29yayBlZGdlIGxpbWl0IGlzIGF1dG9tYXRpY2FsbHkgc3VnZ2VzdGVkXHJcbmV4cG9ydCBsZXQgbmV0d29ya0xpbWl0ID0gMDtcclxuLy8gZml4ZWQgY29sb3Igc2NhbGUgZm9yIHRoZSBuZXR3b3JrXHJcblxyXG4vKipcclxuICogU3RhdGljIGNvbG9yIHNjYWxlIGZvciB0aGUgbmV0d29yayBjb2xvcmluZ1xyXG4gKiBUT0RPIGNoYW5nZSB0aGlzIHNvbWV0aW1lXHJcbiAqL1xyXG5leHBvcnQgbGV0IG5ldHdvcmtDb2xvclNjYWxlID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgLmRvbWFpbihcclxuICAgICAgICBbMCwgLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44LCAuOSwgMV1cclxuICAgIClcclxuICAgIC5yYW5nZShbJyNmZmZmZmYnLCAnI2RmZGZkZicsICcjYzBjMGMwJywgJyNhM2EzYTMnLCAnIzg1ODU4NScsICcjNjk2OTY5JywgJyM0ZTRlNGUnLCAnIzM1MzUzNScsICcjMWQxZDFkJywgJyMwMDAwMDAnXSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgbmV0d29yayBzZWxlY3QgYnV0dG9ucyB0byB0aGUgd2ViaW50ZXJmYWNlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgLSBBcnJheSBvZiBuZXR3b3JrIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGROZXR3b3JrQnV0dG9ucyhkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFbaV1bJ2ZpbmlzaGVkJ10pIHtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3Jrcy1tb2RhbC1ib2R5JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tbGcgYnRuLWJsb2NrXCIgZGF0YT0nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmV0d29ya19pZCddICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJz48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVsnbmFtZSddICsgJzwvYnV0dG9uPicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjbmV0d29ya3MtbW9kYWwtYm9keScpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ1RoZXJlIGlzIG5vIG5ldHdvcmsgZGF0YSBmb3IgdGhpcyBkYXRhc2V0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV0d29yayBhdXRvIHZhbHVlIC0gaWYgdHJ1ZSB0aGFuIHRoZSBuZXR3b3JrIGxpbWl0IGlzIHNldCB0byB0aGUgMC45NSBwZXJjZW50aWxlIG9mIGFsbCB2YWx1ZXNcclxuICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvcmtBdXRvKHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrQXV0byA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXR3b3JrIGxpbWl0IHdpdGggdGhlIHNwZWNpZmljIG5ldHdvcmsgc2xpZGVyIC0gY3VzdG9tXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIGJldHdlZW4gMCBhbmQgMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvckxpbWl0KHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrTGltaXQgPSB2YWx1ZTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbmV0d29yay5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCQsKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkcmF3XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRQbGF5Qm9vbGVhblxyXG59IGZyb20gJy4vbGlzdGVuZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIHBsYXkgYnV0dG9uIC0tPiBMb2FkaW5nIHN5bWJvbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHRoZSBwbGF5IGJ1dHRvbiByZW1vdmUgbG9hZGluZyBzeW1ib2xcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4odHJ1ZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5QbGF5Jyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gIC45NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlcyhhcnIpIHtcclxuICAgIGxldCBwID0gMC45NTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcDtcclxuICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycltsb3dlcl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCAqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGxldCBtZXRhZGF0YUNvbG9yID0ge307IC8vIHNhdmUgdGhlIG1ldGFkYXRhIGNvbG9yaW5nXHJcblxyXG4vKipcclxuICogSW5pdCBNZXRhZGF0YSBidXR0b25zIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVNZXRhZGRhdGEoKSB7XHJcbiAgICBsZXQgY29sb3JzID0gWycjZmZmJywgJyNlNDFhMWMnLCAnIzM3N2ViOCcsICcjNGRhZjRhJywgJyM5ODRlYTMnLCAnI2ZmN2YwMCcsICcjZmZmZjMzJywgJyNhNjU2MjgnXTtcclxuICAgIC8vIGFkZCB0aGUgZGF0YSB0byB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGlmIChkYXRhc2V0TWV0YWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRyIGlkPVwibWV0YWRhdGEtcm93LScgKyBkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddICsgJ1wiPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc3BlY2llcyddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzaXplJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWyd3ZWlnaHQnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChgPGRpdiBjbGFzcz1cImRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBidG4gYnRuLWRlZmF1bHQgYnRuLWNvbG9yXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicHJldmlld1wiIGNsYXNzPVwibWV0YWRhdGEtc3dhdGNoXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9yLWZpZWxkXCIgdmFsdWU9XCJXaGl0ZVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+IGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0U3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U3RyaW5nICs9ICc8ZGl2IGNsYXNzPVwibWV0YWRhdGEtc3dhdGNoIG1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArIGNvbG9yc1tpXSArICdcIiB2YWx1ZT1cIicgKyBpZCArICdcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfShkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC91bD48L2Rpdj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjbWV0YWRhdGEtdGFibGUnKS5maW5kKCd0Ym9keScpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ1RoZXJlIGlzIG5vIG1ldGFkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaXplIGFuZCB3ZWlnaHQgY29sb3JpbmcgZm9yIHRoZSBtZXRhZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yTWV0YWRhdGEoKSB7XHJcbiAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG4gICAgLy8gZ2V0IHRoZSBpbnB1dCB2YWx1ZXNcclxuICAgIGxldCB2YWx1ZSA9ICQoJyNncm91cC1tZXRhZGF0YSAuYnRuLmJ0bi1kZWZhdWx0LmFjdGl2ZSBpbnB1dCcpXHJcbiAgICAgICAgLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICBsZXQgYmxBdmcgPSAkKCcjYmwtYXZnJykudmFsKCk7XHJcbiAgICBsZXQgYWJBdmcgPSAkKCcjYWItYXZnJykudmFsKCk7XHJcbiAgICAvLyBjb2xvciBzY2hlbWUgZm9yIHRoZSBpbnB1dHNcclxuICAgIGxldCBjb2xvcnMgPSBbJyM3ZmM5N2YnLCAnI2ZkYzA4NicsICcjMzg2Y2IwJ107XHJcbiAgICAvLyBjb2xvciB0aGUgYW5pbWFsc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA8IGJsQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3JbZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdID4gYWJBdmcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1syXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2RhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ11dID0gY29sb3JzWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNZXRhZGF0YSByZXNldCBhbGwgaW5kaXZpZHVhbCBtZXRhZGF0YSBpbnB1dCBmaWVsZHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpIHtcclxuICAgIG1ldGFkYXRhQ29sb3IgPSB7fTtcclxuICAgICQoJy5kcm9wZG93biAjcHJldmlldycpXHJcbiAgICAgICAgLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICdyZ2IoMjU1LCAyNTUsIDI1NSknKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbWV0YWRhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQsIGNvbG9yYnJld2VyKi9cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmRcclxufSBmcm9tICcuL2xlZ2VuZC5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZGF0YVNldFBlcmNlbnRpbGVcclxufSBmcm9tICcuLi9leHBsb3JlLmpzJztcclxuXHJcbmV4cG9ydCBsZXQgY29sb3JTY2FsZSA9IHtcclxuICAgIHR5cGU6ICdMaW5lYXInLFxyXG4gICAgY29sb3I6IGNvbG9yYnJld2VyLkJ1WWxCdVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGNvbG9yIHNjYWxlXHJcbiAqIEByZXR1cm4ge2NvbG9yU2NhbGV9IGFjdGl2ZSBjb2xvciBzY2FsZSBpcyBpbiBsaW5lYXIgb3IgdGhyZXNob2xkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmV0dXJuQ29sb3JTY2FsZSgpIHtcclxuICAgIC8vaWYgbGluZWFyIGlzIGNob29zZW5cclxuICAgIGlmIChjb2xvclNjYWxlWyd0eXBlJ10gPT09ICdMaW5lYXInKSB7XHJcbiAgICAgICAgcmV0dXJuIGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbihcclxuICAgICAgICAgICAgICAgIGRhdGFTZXRQZXJjZW50aWxlW1NQVi5hY3RpdmVTY2FsZV1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAucmFuZ2UoY29sb3JTY2FsZVsnY29sb3InXSk7XHJcbiAgICB9IC8vVGhyZXNob2xkIGNvbG9yIHNjYWxlXHJcbiAgICBlbHNlIGlmIChjb2xvclNjYWxlWyd0eXBlJ10gPT09ICdUaHJlc2hvbGQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGQzLnNjYWxlVGhyZXNob2xkKClcclxuICAgICAgICAgICAgLmRvbWFpbihcclxuICAgICAgICAgICAgICAgIGRhdGFTZXRQZXJjZW50aWxlW1NQVi5hY3RpdmVTY2FsZV1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAucmFuZ2UoY29sb3JTY2FsZVsnY29sb3InXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBjb2xvciBwaWNrZXJcclxuICogd2l0aCBhbGwgbGlzdGVuZXJzIGluY2x1ZGVkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbG9yUGlja2VyKCkge1xyXG4gICAgZDMuc2VsZWN0KCcuY29sb3JzLWJvZHknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJy5wYWxldHRlJylcclxuICAgICAgICAuZGF0YShkMy5lbnRyaWVzKGNvbG9yYnJld2VyKSlcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3NwYW4nKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwYWxldHRlJylcclxuICAgICAgICAuYXR0cigndGl0bGUnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLmtleTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIC8vIGhpZ2h0bGlnaHQgdGhlIHJpZ2h0IHBhbGV0dGVcclxuICAgICAgICAgICAgJCgnLnBhbGV0dGUnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgJCgnLnBhbGV0dGVbdGl0bGU9XCInICsgZC5rZXkgKyAnXCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGNvbG9yU2NhbGUuY29sb3IgPSBjb2xvcmJyZXdlcltkLmtleV07XHJcbiAgICAgICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnN3YXRjaCcpXHJcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N3YXRjaCcpXHJcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBoaWdobGlnaHQgdGhlIHNlbGVjdGVkIGNvbG9yIHNjaGVtZVxyXG4gICAgJCgnLnBhbGV0dGVbdGl0bGU9XCJCdVlsQnVcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywqL1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICByZXR1cm5Db2xvclNjYWxlXHJcbn0gZnJvbSAnLi9jb2xvcl9waWNrZXIuanMnO1xyXG5cclxubGV0IHN2Z0xlZ2VuZDsgLy8gc3ZnIGNvbnRhaW5lciBmb3IgdGhlIGxlZ2VuZFxyXG5sZXQgdGFua1dpZHRoOyAvLyBzcGF0aWFsIHZpZXcgd2lkdGhcclxubGV0IHRhbmtIZWlnaHQ7IC8vIHNwYXRpYWwgdmlldyBoZWlnaHQgXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBncm91cCB0byB0aGUgc3ZnIHdoZXJlIHRoZSBsZWdlbmQgZm9yIHRoZSBjb2xvciBsZWdlbmQgaXNcclxuICogVE9ETyBjaGFuZ2UgdGhpcyAtIHNvIHRoYXQgdGhlIGxlZ2VuZCBpcyBhbHNvIHJlc3BvbnNpdmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRTcGF0aWFsVmlld0dyb3VwKCkge1xyXG4gICAgdGFua1dpZHRoID0gU1BWLnRhbmtXaWR0aDtcclxuICAgIHRhbmtIZWlnaHQgPSBTUFYudGFua0hlaWdodDtcclxuXHJcbiAgICBzdmdMZWdlbmQgPSBkMy5zZWxlY3QoJyNtYWluLXZpcy1sZWdlbmQtZGl2JylcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWxlZ2VuZENvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgLy8gdG8gbWFrZSBpdCByZXNwb25zaXZlIHdpdGggY3NzXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIHRhbmtXaWR0aCArICcgJyArIDEwMClcclxuICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgLmNsYXNzZWQoJ3N2Zy1jb250ZW50LWxlZ2VuZCcsIHRydWUpXHJcbiAgICAgICAgLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjb2xvckxlZ2VuZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBjb2xvciBsZWdlbmRcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VMZWdlbmQoKSB7XHJcbiAgICB2YXIgbGVnZW5kOyAvLyB0aGUgY29sb3IgbGVnZW5kXHJcbiAgICB2YXIgbGVnZW5kVGV4dDsgLy8gY29sb3IgbGVnZW5kIHRleHRcclxuICAgIC8vIHZhcnMgZm9yIHRoZSBsZWdlbmRcclxuICAgIHZhciBsZWdlbmRXaWR0aCA9IHRhbmtXaWR0aCAqIDAuMDg7XHJcbiAgICB2YXIgbGVnZW5kSGVpZ2h0ID0gdGFua0hlaWdodCAqIDAuMDQ7XHJcbiAgICB2YXIgZGlmZmVyZW50Q29sb3JzID0gMDtcclxuXHJcbiAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBhbmltYWxzXHJcbiAgICBpZiAoU1BWLmFjdGl2ZVNjYWxlICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgIC8vIG9uY2UgdGhlIGZpbGwgZm9yIHRoZSBoZWFkcyBhbmQgdGhlIHN0cm9rZSBmb3IgdGhlIHBhdGhcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKHRtcFNjYWxlLnJhbmdlKCkpO1xyXG4gICAgICAgIGxlZ2VuZFRleHQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCd0ZXh0LmxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5kb21haW4oKSk7XHJcbiAgICAgICAgZGlmZmVyZW50Q29sb3JzID0gdG1wU2NhbGUucmFuZ2UoKVxyXG4gICAgICAgICAgICAubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZWdlbmQgPSBzdmdMZWdlbmQuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgfVxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kXHJcbiAgICBsZWdlbmRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxlZ2VuZFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCh0YW5rV2lkdGggLSBkaWZmZXJlbnRDb2xvcnMgKiBsZWdlbmRXaWR0aCkgKyBpICogbGVnZW5kV2lkdGggLSAzMCkgKyAncHgnO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuICAgIC8vIEVYSVQgLSBsZWdlbmRcclxuICAgIGxlZ2VuZC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gVVBEQVRFIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIC8vIEVOVEVSIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHRcclxuICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmRUZXh0JylcclxuICAgICAgICAuYXR0cigneScsIDIgKiBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgICAgIC8vIHBsdXMgMTUgaGFzIHRvIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuICgodGFua1dpZHRoIC0gZGlmZmVyZW50Q29sb3JzICogbGVnZW5kV2lkdGgpICsgaSAqIGxlZ2VuZFdpZHRoIC0gMTApICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkICogMikgLyAyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVYSVQgLSBsZWdlbmQgdGV4dFxyXG4gICAgbGVnZW5kVGV4dC5leGl0KClcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL3NwYXRpYWxfdmlldy9sZWdlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgcGFyYW1ldGVycyAqL1xyXG5cclxubGV0IEpTT05BUElfTUlNRVRZUEUgPSAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJztcclxudmFyIHNvdXJjZTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhZGRUb0RhdGFzZXQsXHJcbiAgICBzZXREYXRhU2V0UGVyY2VudGlsZSxcclxuICAgIHNldFN3YXJtRGF0YSxcclxuICAgIHNldE1ldGFEYXRhLFxyXG4gICAgc2V0RGF0YXNldEZlYXR1cmUsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldE5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE5ldHdvcmtCdXR0b25zXHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBlbmFibGVQbGF5QnV0dG9uLFxyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG4vKipcclxuICogU3RyZWFtIHRoZSBtb3ZlbWVudCBkYXRhIGZyb20gdGhlIEFQSVxyXG4gKiBMb2FkcyBvbmx5IHRoZSBleHBsaWNpdCBtb3ZlbWVudCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtTW92ZW1lbnREYXRhKCkge1xyXG4gICAgaWYgKHdpbmRvdy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9tb3ZlbWVudF9vbmx5LycgKyBwYXJhbWV0ZXJzWydpZCddKTtcclxuICAgICAgICBzb3VyY2Uub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSAnY2xvc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZFRvRGF0YXNldChKU09OLnBhcnNlKGUuZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5yZWFkeVN0YXRlID09IEV2ZW50U291cmNlLkNMT1NFRCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1N0cmVhbWluZyBlcnJvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnV2ViYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0cmVhbWluZycpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwZXJjZW50aWxlIGRhdGEgZnJvbSB0aGUgYXBpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGVyY2VudGlsZSgpIHtcclxuICAgIGxldCBkYXRhU2V0UGVyY2VudGlsZSA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL3BlcmNlbnRpbGUvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZGF0YVNldFBlcmNlbnRpbGUgaW50byBhbiBhcnJheVxyXG4gICAgICAgICAgICAvLyBbbWluLCBwZXJjZW50aWxlXzEsLi4uLHBlcmNlbnRpbGVfOSxtYXhdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVNldFBlcmNlbnRpbGVbZGF0YVtpXVsnZmVhdHVyZSddXSA9IFtkYXRhW2ldWydtaW4nXSwgZGF0YVtpXVsncDEnXSwgZGF0YVtpXVsncDInXSwgZGF0YVtpXVsncDMnXSwgZGF0YVtpXVsncDUnXSwgZGF0YVtpXVsncDcnXSwgZGF0YVtpXVsncDgnXSwgZGF0YVtpXVsncDknXSwgZGF0YVtpXVsnbWF4J11dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldERhdGFTZXRQZXJjZW50aWxlKGRhdGFTZXRQZXJjZW50aWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydCBmcm9tIHRoZSBhcGlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybUZlYXR1cmVzKCkge1xyXG4gICAgY29uc3Qgc3dhcm1fZmVhdHVyZXMgPSBbJ3N3YXJtX3RpbWUnLCAnc3dhcm1fc3BlZWQnLCAnc3dhcm1fYWNjZWxlcmF0aW9uJywgJ3N3YXJtX2NvbnZleF9odWxsX2FyZWEnLFxyXG4gICAgICAgICdzd2FybV9kaXN0YW5jZV9jZW50cm9pZCcsICdzd2FybV9kaXJlY3Rpb24nLCAnc3dhcm1fcG9sYXJpc2F0aW9uJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvLyBnZXQgYWxsIHRoZSBvdGhlciBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBzd2FybV9mZWF0dXJlc1tpXSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlID0gc3dhcm1fZmVhdHVyZXNbaV0ucmVwbGFjZSgnc3dhcm1fJywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBtZWFkYXRhIGluZm9ybWF0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0YURhdGEoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvbWV0YWRhdGEvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgc2V0TWV0YURhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5ldHdvcmsgZGF0YXNldHMgZm9yIHRoZSBidXR0b25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGFCdXR0b24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC9uZXR3b3Jrcy8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBhZGROZXR3b3JrQnV0dG9ucyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3BlY2lmYyBmZWF0dXJlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmZWF0dXJlIC0gZm9yIGluc3RhbmNlIHNwZWVkLCBzd2FybV9jb252ZXhfaHVsbF9hcmVhIGV0Yy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhc2V0RmVhdHVyZShmZWF0dXJlKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvJyArIGZlYXR1cmUsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldERhdGFzZXRGZWF0dXJlKGRhdGEsIGZlYXR1cmUpO1xyXG4gICAgICAgICAgICBlbmFibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZXR3b3JrIGFuZCBuZXR3b3JrIGhpZXJhcmNoeSBmb3IgdGhlIHNwZWNpZmljIG5ldHdvcmtfaWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ldHdvcmtfaWQgLSB1bmlxdWUgbmV0d29yayBpZCBvZiBhIGRhdGFzZXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29ya3MvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBuZXR3b3JrX2lkLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2V0TmV0d29ya0RhdGEoSlNPTi5wYXJzZShkYXRhWzBdWydkYXRhJ10pKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF1bJ2hpZXJhcmNoeSddKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoZGF0YVswXVsnaGllcmFyY2h5J10pKTtcclxuICAgICAgICAgICAgICAgIHNldE5ldHdvcmtIaWVyYXJjaHkoSlNPTi5wYXJzZShkYXRhWzBdWydoaWVyYXJjaHknXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9hamF4X3F1ZXJpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgZDMsICQqL1xyXG5pbXBvcnQge1xyXG4gICAgZGF0YXNldE1ldGFkYXRhLFxyXG4gICAgc3dhcm1EYXRhXHJcbn0gZnJvbSAnLi4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBTUFYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgTmV0d29yayBmcm9tICcuLi9uZXR3b3JrLmpzJztcclxuXHJcbmV4cG9ydCBsZXQgc2xpZGVyOyAvLyB0aW1lIHNsaWRlciBvZiB0aGUgYXBwXHJcbmV4cG9ydCBsZXQgdG9vbHRpcDsgLy8gdG9vbHRpcCBmdW5jdGlvblxyXG5cclxuLyoqXHJcbiAqIEJydXNoIGVuZCBmdW5jdGlvblxyXG4gKiBhZGQgYWN0aXZlIGFuaW1hbHMgdG8gdGhlIGFycmF5IG9yIHJlbW92ZSB0aGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XHJcbiAgICBsZXQgYXJyYXlBbmltYWxzID0gU1BWLmFycmF5QW5pbWFscztcclxuICAgIGxldCBhY3RpdmVBbmltYWxzID0gU1BWLmFjdGl2ZUFuaW1hbHM7XHJcbiAgICB2YXIgcmVjdCA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcclxuICAgIC8vaXRlcmF0ZSBvdmVyIHRoZSAxNTEgZmlzaCB0byBjaGVjayB3aGljaCBhcmUgaW4gdGhlIGJydXNoXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFNQVi5hbmltYWxfaWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvaW50ID0gW2FycmF5QW5pbWFsc1tpXVsncCddWzBdLCBhcnJheUFuaW1hbHNbaV1bJ3AnXVsxXV07XHJcbiAgICAgICAgLy9jaGVjayB3aGljaCBmaXNoIGFyZSBpbiAgdGhlIGJydXNoZWQgYXJlYVxyXG4gICAgICAgIGlmICgocmVjdFswXVswXSA8PSBwb2ludFswXSkgJiYgKHBvaW50WzBdIDw9IHJlY3RbMV1bMF0pICYmXHJcbiAgICAgICAgICAgIChyZWN0WzBdWzFdIDw9IHBvaW50WzFdKSAmJiAocG9pbnRbMV0gPD0gcmVjdFsxXVsxXSkpIHtcclxuICAgICAgICAgICAgLy8gUG9pbnQgaXMgaW4gdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChhcnJheUFuaW1hbHNbaV1bJ2EnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU1BWLnNldEFjdGl2ZUFuaW1hbHMoYWN0aXZlQW5pbWFscyk7XHJcbiAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgfVxyXG4gICAgJCgnI2JydXNoaW5nLWJ1dHRvbicpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIC8vIHJlbW92ZSB0aGUgYnJ1c2hcclxuICAgICQoJy5icnVzaCcpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgdG9vbHRpcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUb29sdGlwKCkge1xyXG4gICAgdG9vbHRpcCA9IGQzLnNlbGVjdCgnZGl2LnRvb2x0aXAnKVxyXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5zdHlsZSgndG9wJywgMCArICdweCcpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb29sdGlwIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkIC0gZDMgZGF0YSBvYmplY3Qgd2l0aCB0aGUgbWV0YWRhdGEgaW5mb3JtYXRpb25cclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b29sdGlwRnVuY3Rpb24oZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0TWV0YWRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZFsnYSddID09PSBkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMTAwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXNcclxuICAgICAgICAgICAgLy8gVE9ETyBtYWtlIHRoaXMgbW9kdWxhclxyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtYW5pbWFsLWlkJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc3BlY2llcycpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zZXgnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zaXplJylcclxuICAgICAgICAgICAgICAgIC5odG1sKGRhdGFzZXRNZXRhZGF0YVtpXVsnc2l6ZSddKTtcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLXdlaWdodCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgdGltZSBzbGlkZXIgYW5kIHRoZSBkeW5hbWljIG5ldHdvcmsgc2xpZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcbiAgICAvLyB0aW1lIHNsaWRlclxyXG4gICAgc2xpZGVyID0gJCgnI3NsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiBzd2FybURhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdGVwOiAyNSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgU1BWLnNldEluZGV4VGltZSh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBwYXVzZWQgYXBwbHkgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgTmV0d29yayBzbGlkZXJcclxuICAgICQoJyNuZXR3b3JrLXNsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiAnbWF4JyxcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBOZXR3b3JrLnNldE5ldHdvckxpbWl0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbWF4IGZyb20gdGhlIHNsaWRlciB0aGlzIGlzIG5lZWRlZCB0byBjYWxjdWxhdGUgdGhlIHRpY2tzXHJcbiAgICBsZXQgbWF4ID0gc2xpZGVyLnNsaWRlcignb3B0aW9uJywgJ21heCcpO1xyXG4gICAgbGV0IHNwYWNlID0gMTAwIC8gbWF4O1xyXG4gICAgLy9hcHBlbmQgdGhlIG1pbnV0ZSB0aWNrc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgPSBpICsgMTUwMCkge1xyXG4gICAgICAgICQoJzxzcGFuIGNsYXNzPVwidWktc2xpZGVyLXRpY2tcIj48L3NwYW4+JylcclxuICAgICAgICAgICAgLmNzcygnbGVmdCcsIChzcGFjZSAqIGkpICsgJyUnKVxyXG4gICAgICAgICAgICAuYXBwZW5kVG8oc2xpZGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgU2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGltZSBzbGlkZXIgdG8gYSBuZXcgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gbmV3IHZhbHVlIGZvciB0aGUgdGltZSBzbGlkZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lU2xpZGVyKHZhbHVlKSB7XHJcbiAgICBzbGlkZXIuc2xpZGVyKCd2YWx1ZScsIHZhbHVlKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBwYXJhbWV0ZXJzLCBTZXQqL1xyXG5cclxuaW1wb3J0ICogYXMgU1BWIGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZW5hYmxlUGxheUJ1dHRvbixcclxuICAgIGRpc2FibGVQbGF5QnV0dG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBicnVzaGVuZCxcclxuICAgIHNsaWRlclxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2ludGVyYWN0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBjaGFuZ2VMZWdlbmQsXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvbGVnZW5kLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBtZXRhZGF0YUNvbG9yLFxyXG4gICAgcmVzZXRJbmRpdmlkdWFsTWV0YWRhdGEsXHJcbiAgICBjb2xvck1ldGFkYXRhXHJcbn0gZnJvbSAnLi9tZXRhZGF0YS5qcyc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIHNldE5ldHdvcmtBdXRvLFxyXG4gICAgc2V0TmV0d29yTGltaXRcclxufSBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXQsXHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBzZXRTd2FybURhdGEsXHJcbiAgICBkYXRhc2V0TWV0YWRhdGEsXHJcbiAgICBzZXROZXR3b3JrRGF0YSxcclxuICAgIHNldE5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGdldERhdGFzZXRGZWF0dXJlLFxyXG4gICAgZ2V0TmV0d29ya0RhdGFcclxufSBmcm9tICcuL2FqYXhfcXVlcmllcy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sb3JTY2FsZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L2NvbG9yX3BpY2tlcic7XHJcblxyXG5sZXQgSlNPTkFQSV9NSU1FVFlQRSA9ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nO1xyXG5sZXQgYnJ1c2g7IC8vIGJydXNoaW5nIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgcGxheUJvb2xlYW4gPSB0cnVlOyAvLyBwYXVzZSBhbmQgcGxheSBib29sZWFuXHJcblxyXG4vKipcclxuICogSW5pdCBhbGwgdGhlIGxpc3RlbmVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjcF9saXN0ZW5lcigpO1xyXG4gICAgc2ZfbGlzdGVuZXJzKCk7XHJcbiAgICBhZl9saXN0ZW5lcnMoKTtcclxuICAgIG1kX2xpc3RlbmVycygpO1xyXG4gICAgbl9saXN0ZW5lcnMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgY29udHJvbCBwYW5lbCBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIGNwX2xpc3RlbmVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSBvciBzdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCb29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgU1BWLnNldEluZGV4VGltZShzbGlkZXIuc2xpZGVyKCd2YWx1ZScpKTtcclxuICAgICAgICAgICAgJCgnLmJydXNoJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZSB0aGUgYW5pbWF0aW9uIGFuZCBzaG93IG9ubHkgdGhlIG5leHQgZnJhbWVcclxuICAgICAqL1xyXG4gICAgJCgnI25leHQtZnJhbWUtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcjcGxheS1idXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJydXNoaW5nIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjYnJ1c2hpbmctYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy9zdG9wIHRoZSBhbmltYXRpb25cclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICQoJyNwbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoISQoJyNicnVzaGluZy1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9kZWZpbmUgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGJydXNoID0gZDMuYnJ1c2goKVxyXG4gICAgICAgICAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtTUFYudGFua1dpZHRoLCBTUFYudGFua0hlaWdodF1cclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsIGJydXNoZW5kKTtcclxuICAgICAgICAgICAgLy9hZGQgdGhlIGJydXNoXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI21haW4tdmlzLXN2ZycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpXHJcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBicnVzaFxyXG4gICAgICAgICAgICAkKCcuYnJ1c2gnKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2VsZWN0IGFsbCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKS5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgJCgnI3JlbW92ZS1hY3RpdmUtc2VsZWN0ZWQtYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZUFuaW1hbHMoW10pO1xyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuXHJcbiAgICAgICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGF0aWFsIHZpZXcgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICovXHJcbiAgICAkKCcjYmFja2dyb3VuZC1jb2xvcicpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0uZ3JvdXAtYmFja2dyb3VuZDpjaGVja2VkJykudmFsKCk7XHJcbiAgICAgICAgJCgnI21haW4tdmlzLXN2ZycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgc3BhdGlhbCB2aWV3IGF4aXMgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWF4aXMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgZy54LmF4aXMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcyBnLnkuYXhpcycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBmcmFtZSAodGltZSkgbnVtYmVyIGluIHRoZSBzcGF0aWFsIHZpZXcgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LXRpbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lVGV4dCcpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbWFpbi12aXMgLmZyYW1lVGV4dCcpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIFNjYWxlIEZ1bmN0aW9uIFJhZGlvIGJ1dHRvbnNcclxuICAgICAqL1xyXG4gICAgJCgnI2NvbG9yLXNjYWxlLXJhZGlvLWZvcm0gaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JTY2FsZVsndHlwZSddID0gJCgnaW5wdXRbbmFtZT1jb2xvci1zY2FsZS1yYWRpb106Y2hlY2tlZCcsICcjY29sb3Itc2NhbGUtcmFkaW8tZm9ybScpLnZhbCgpO1xyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBzd2FybSBmZWF0dXJlcyBsaXN0ZW5lcnNcclxuICovXHJcbmZ1bmN0aW9uIHNmX2xpc3RlbmVycygpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgZGlyZWN0aW9uIGFycm93IG9mIHRoZSBhbmltYWxcclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctZGlyZWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWRpcmVjdGlvbicpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2RpcmVjdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCBkaXJlY3Rpb24gZGF0YVxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ2RpcmVjdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmFycm93JylcclxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgbWVkb2lkIGluIGNvbG9yIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1tZWRvaWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctbWVkb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghKCdtZWRvaWQnIGluIHN3YXJtRGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgcGFyYW1ldGVyc1snaWQnXSArICcvbWVkb2lkJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhcm1EYXRhW2ldWydtZWRvaWQnXSA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKHN3YXJtRGF0YVtTUFYuaW5kZXhUaW1lXVsnbWVkb2lkJ10pO1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBtZWRvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcjYW5pbWFsLScgKyBTUFYubWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ21lZG9pZCcsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBkaXNwbGF5IHRoZSBtZWRvaWQgZmlzaFxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIFNQVi5tZWRvaWRBbmltYWwpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0TWVkb2lkQW5pbWFsKC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgY2VudHJvaWQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgICQoJyNkcmF3LWNlbnRyb2lkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LWNlbnRyb2lkJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ2NlbnRyb2lkJyBpbiBzd2FybURhdGFbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnL2NlbnRyb2lkJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhcm1EYXRhW2ldWydjZW50cm9pZCddID0gW01hdGgucm91bmQoZGF0YVtpXVswXSAqIDEwMCkgLyAxMDAsIE1hdGgucm91bmQoZGF0YVtpXVsxXSAqIDEwMCkgLyAxMDBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaGlkZSB0aGUgY2VudHJvaWRcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCdjaXJjbGUuY2VudHJvaWQnKVxyXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjZW50cm9pZFxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2NpcmNsZS5jZW50cm9pZCcpXHJcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBjb252ZXggaHVsbCBpbiBjb2xvciBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctY29udmV4LWh1bGwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgnaHVsbCcgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy9jb252ZXhfaHVsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3dhcm1EYXRhKGRhdGEsICdodWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdHJpYW5ndWxhdGlvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy10cmlhbmd1bGF0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndHJpYW5ndWxhdGlvbicgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy90cmlhbmd1bGF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTd2FybURhdGEoZGF0YSwgJ3RyaWFuZ3VsYXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdm9yb25vaVxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy12b3Jvbm9pJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJyNkcmF3LXZvcm9ub2knKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAoISgndm9yb25vaScgaW4gc3dhcm1EYXRhWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBwYXJhbWV0ZXJzWydpZCddICsgJy92b3Jvbm9pJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhcm1EYXRhW2ldWyd2b3Jvbm9pJ10gPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogSW5pdCBhYnNvbHV0ZSBmZWF0dXJlIGxpc3RlbmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gYWZfbGlzdGVuZXJzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBTcGVlZCBidXR0b25cclxuICAgICAqL1xyXG4gICAgJCgnI2RyYXctc3BlZWQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctc3BlZWQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIGFic29sdXRlIGZlYXR1cmUgc3BlZWQgZGF0YSBvbmNlXHJcbiAgICAgICAgICAgIGlmICghKCdzcGVlZCcgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YXNldEZlYXR1cmUoJ3NwZWVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLmRyYXctZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctZGlzdGFuY2UtY2VudHJvaWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ3NwZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQtZGV0YWlscycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgU1BWLnNldEFjdGl2ZVNjYWxlKCdibGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuZHJhdy1kZXRhaWxzLmFjdGl2ZScpLmNsaWNrKCk7XHJcbiAgICAgICAgLy9jaGFuZ2UgY29sb3IgbGVnZW5kXHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuY29sb3JMZWdlbmQgKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNoYW5nZUxlZ2VuZCgpO1xyXG5cclxuICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAvL2dvIGJhY2sgb25lIHNlY29uZCBhbmQgZHJhdyB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgIFNQVi5kZWNJbmRleFRpbWUoKTtcclxuICAgICAgICAgICAgU1BWLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYWNjZWxlcmF0aW9uIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnI2RyYXctYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgLy8gbG9hZCBhYnNvbHV0ZSBmZWF0dXJlIGFjY2VsZXJhdGlvbiBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2FjY2VsZXJhdGlvbicgaW4gZGF0YXNldFswXSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhamF4IHF1ZXJ5IHRvIGdldCB0aGUgYWJzb2x1dGUgZmVhdHVyZSBhY2NlbGVyYXRpb25cclxuICAgICAgICAgICAgICAgIGdldERhdGFzZXRGZWF0dXJlKCdhY2NlbGVyYXRpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1hY2NlbGVyYXRpb24tZGV0YWlscycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BlZWQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYWNjZWxlcmF0aW9uJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctYWNjZWxlcmF0aW9uLWRldGFpbHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnYmxhY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmRyYXctZGV0YWlscy5hY3RpdmUnKS5jbGljaygpO1xyXG4gICAgICAgIC8vY2hhbmdlIGNvbG9yIGxlZ2VuZFxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmNvbG9yTGVnZW5kIConKS5yZW1vdmUoKTtcclxuICAgICAgICBjaGFuZ2VMZWdlbmQoKTtcclxuXHJcbiAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICBTUFYuZGVjSW5kZXhUaW1lKCk7XHJcbiAgICAgICAgICAgIFNQVi5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGRpc3RhbmNlIHRvIGNlbnRyb2lkIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYWJzb2x1dGUgZmVhdHVyZSBkaXN0YW5jZV9jZW50cm9pZCBkYXRhIG9uY2VcclxuICAgICAgICAgICAgaWYgKCEoJ2Rpc3RhbmNlX2NlbnRyb2lkJyBpbiBkYXRhc2V0WzBdKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGFqYXggcXVlcnkgdG8gZ2V0IHRoZSBhYnNvbHV0ZSBmZWF0dXJlIGRpc3RhbmNlX2NlbnRyb2lkXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhc2V0RmVhdHVyZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcuZHJhdy1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGVlZCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LWFjY2VsZXJhdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIFNQVi5zZXRBY3RpdmVTY2FsZSgnZGlzdGFuY2VfY2VudHJvaWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1kaXN0YW5jZS1jZW50cm9pZC1kZXRhaWxzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBTUFYuc2V0QWN0aXZlU2NhbGUoJ2JsYWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5kcmF3LWRldGFpbHMuYWN0aXZlJykuY2xpY2soKTtcclxuICAgICAgICAvL2NoYW5nZSBjb2xvciBsZWdlbmRcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5jb2xvckxlZ2VuZCAqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcblxyXG4gICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIC8vdGhpcyBhcHBseXMgdGhlIGNoYW5nZXNcclxuICAgICAgICAgICAgU1BWLmRlY0luZGV4VGltZSgpO1xyXG4gICAgICAgICAgICBTUFYuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgbmV0d29yayBsaXN0ZWVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBuX2xpc3RlbmVycygpIHtcclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBidXR0b25zIGNsaWNrZWQgLSBnZXQgdGhlIGRhdGFcclxuICAgICAqL1xyXG4gICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHkgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ldHdvcmtfaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEnKTtcclxuXHJcbiAgICAgICAgZ2V0TmV0d29ya0RhdGEobmV0d29ya19pZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgYnV0dG9ucyBjbGlja2VkIC0gZ2V0IHRoZSBkYXRhXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3JrLXJlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldE5ldHdvcmtEYXRhKHt9KTtcclxuICAgICAgICBzZXROZXR3b3JrSGllcmFyY2h5KHt9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBhdXRvIGJ1dHRvbiBzZXQgYWNpdmUgb3IgcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgICQoJyNuZXR3b3JrLWF1dG8tc3VnZ2VzdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCgnI25ldHdvcmstYXV0by1zdWdnZXN0JykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0LXAnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLXNsaWRlcicpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHNldE5ldHdvcmtBdXRvKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0LXAnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJyNuZXR3b3JrLXNsaWRlcicpLnNob3coKTtcclxuICAgICAgICAgICAgc2V0TmV0d29ya0F1dG8oZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgbGltaXQgPSAkKCcjbmV0d29yay1zbGlkZXInKS5zbGlkZXIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIHNldE5ldHdvckxpbWl0KGxpbWl0KTtcclxuICAgICAgICAgICAgJCgnI25ldHdvcmstbGltaXQnKS52YWwobGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXQgbWV0YWRhdGEgbGlzdGVuZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBtZF9saXN0ZW5lcnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIHN3YXRjaCBmdW5jdGlvbnMgY29sb3JpbmcgaW5kaXZpZHVhbCBhbmltYWxzXHJcbiAgICAgKi9cclxuICAgICQoJy5tZXRhZGF0YS1zd2F0Y2gubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBsZXQgY29sb3JSR0IgPSAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIC8vIHNldCB0aGUgY29sb3Igb2YgdGhlIHN3YXRjaCBwcmV2aWV3XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLXJvdy0nICsgaWQgKyAnICNwcmV2aWV3JylcclxuICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yUkdCKTtcclxuICAgICAgICAvLyBpZiB3aGl0ZSB0aGFuIHJlc2V0IHRoZSBjb2xvclxyXG4gICAgICAgIGlmIChjb2xvclJHQiA9PT0gJ3JnYigyNTUsIDI1NSwgMjU1KScpIHtcclxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhQ29sb3JbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbWV0YWRhdGFDb2xvcltpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW2lkXSA9IGNvbG9yUkdCO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgZ3JvdXAgbWV0YWRhdGEgZnVuY3Rpb25zIGZvciBpbnN0YW5jZSBjb2xvciBzZXhcclxuICAgICAqL1xyXG4gICAgJCgnI2dyb3VwLW1ldGFkYXRhIDppbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyByZXNldCB0aGUgbWV0YWRhdCBhY29sb3JpbmdcclxuICAgICAgICByZXNldEluZGl2aWR1YWxNZXRhZGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG5cclxuICAgICAgICAvLyBtZXRhZGF0YSBzZXggaXMgY2hvb3NlbiAtIGNvbG9yaW5nIGJhc2VkIG9uIG0gYW5kIGZcclxuICAgICAgICBpZiAodmFsdWUgPT09ICdzZXgnKSB7XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1kaXYnKS5tb2RhbCgndG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIC8vIGNsb3NlIGFuZCBjb2xvciBoZXJlXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAucHVzaChkYXRhc2V0TWV0YWRhdGFbaV1bdmFsdWVdLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNldCBvZiBpbmRpdmlkdWFsIHN0cmluZ3MgaW4gc2V4XHJcbiAgICAgICAgICAgIHRtcCA9IEFycmF5LmZyb20obmV3IFNldCh0bXApKTtcclxuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjMzg2Y2IwJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXS50b0xvd2VyQ2FzZSgpID09PSB0bXBbal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBjb2xvcmluZyB0byB0aGUgbWV0YWRhdGFjb2xvciBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFDb2xvcltkYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNtZXRhZGF0YS1pbnB1dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgLy8gc2V0IHZhbHVlcyBvZiBpbnB1dHNcclxuICAgICAgICAgICAgLy8gaGVyZSBhcmUgYXV0b21hdGljYWxseSBpbnB1dCB2YWx1ZXMgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgICAvLyAuMjUgYW5kIC43NSBwZXJjZW50aWxlcyBhcmUgdXNlZFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJsQXZnID0gZDMucXVhbnRpbGUodG1wLCAwLjI1KTsgLy8gYmVsb3cgYXZlcmFnZSB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgYWJBdmcgPSBkMy5xdWFudGlsZSh0bXAsIDAuNzUpOyAvLyBhYm92ZSBhdmVyYWdlXHJcbiAgICAgICAgICAgICQoJyNibC1hdmcnKS52YWwoYmxBdmcpO1xyXG4gICAgICAgICAgICAkKCcjYWItYXZnJykudmFsKGFiQXZnKTtcclxuICAgICAgICAgICAgLy8gY29sb3IgdGhlIGFuaW1hbHNcclxuICAgICAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0YWRhdGEgZ3JvdXAgbWV0YWRhdGEgaW5wdXQgc3Bpbm5lclxyXG4gICAgICogKy8tIDAuMSB0byB0aGUgaW5wdXQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgJCgnLm51bWJlci1zcGlubmVyIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBidG4gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBvbGRWYWx1ZSA9IGJ0bi5jbG9zZXN0KCcubnVtYmVyLXNwaW5uZXInKS5maW5kKCdpbnB1dCcpLnZhbCgpLnRyaW0oKSxcclxuICAgICAgICAgICAgbmV3VmFsID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGJ0bi5hdHRyKCdkYXRhLWRpcicpID09ICd1cCcpIHtcclxuICAgICAgICAgICAgbmV3VmFsID0gcGFyc2VGbG9hdChvbGRWYWx1ZSkgKyAwLjE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG9sZFZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsID0gcGFyc2VGbG9hdChvbGRWYWx1ZSkgLSAwLjE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQobmV3VmFsICogMTAwKSAvIDEwMDsgLVxyXG4gICAgICAgIGJ0bi5jbG9zZXN0KCcubnVtYmVyLXNwaW5uZXInKS5maW5kKCdpbnB1dCcpLnZhbChuZXdWYWwpO1xyXG4gICAgICAgIC8vIGNoYW5nZSB0aGUgY29sb3JpbmdcclxuICAgICAgICBjb2xvck1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGFkYXRhIGlucHV0IGZpZWxkcyBjaGFuZ2VcclxuICAgICAqL1xyXG4gICAgJCgnLm51bWJlci1zcGlubmVyIGlucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29sb3JNZXRhZGF0YSgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYWxsIG1ldGFkYXRhIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgJCgnI21ldGFkYXRhLXJlc2V0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21ldGFkYXRhLWlucHV0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogU2V0IHBsYXkgYm9vbGVhblxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIC0gcGF1c2UgKGZhbHNlKSBvciBwbGF5ICh0cnVlKVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlCb29sZWFuKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9saXN0ZW5lci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCwgcGFyYW1ldGVycyovXHJcbmltcG9ydCB7XHJcbiAgICBzZXRJbmRleFRpbWUsXHJcbiAgICBhbmltYWxfaWRzXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcvc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzd2FybURhdGEsXHJcbiAgICBkYXRhc2V0XHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc1xyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG5leHBvcnQgbGV0IHpvb21GdW5jdGlvbjtcclxuZXhwb3J0IGxldCBsaW5lQ2hhcnRSYXRpbyA9IDA7XHJcblxyXG5sZXQgdHJlbmRDaGFydHNab29tID0ge307XHJcbmxldCB0cmVuZENoYXJ0c0VsZW0gPSBbJ2xvd2VyT3V0ZXJBcmVhJywgJ2xvd2VySW5uZXJBcmVhJywgJ21lZGlhbkxpbmUnLCAndXBwZXJJbm5lckFyZWEnLCAndXBwZXJPdXRlckFyZWEnXTtcclxubGV0IGxpbmVDaGFydFdpZHRoID0gNTAwMDtcclxubGV0IHJhdGlvID0gMTtcclxubGV0IHpvb21Hcm91cDtcclxubGV0IHg7XHJcbmxldCB5O1xyXG5cclxuLyoqXHJcbiAqIGluaXQgdGhlIGxpbmUgY2hhcnQgYW5kIGFsc28gdGhlIHRyZW5kIGNoYXJ0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGluZUNoYXJ0KCkge1xyXG5cclxuICAgIHpvb21GdW5jdGlvbiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBzd2FybURhdGEubGVuZ3RoXSlcclxuICAgICAgICAucmFuZ2UoWzAsIHN3YXJtRGF0YS5sZW5ndGhdKTtcclxuXHJcbiAgICBsaW5lQ2hhcnRSYXRpbyA9IE1hdGguY2VpbChzd2FybURhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgIC8vIFN3YXJtIGZlYXR1cmVzIGxpbmUgY2hhcnRcclxuICAgIGxldCBsaW5lQ2hhcnRIZWlnaHQgPSA1MDA7IC8vIHRoZSBsaW5lIGNoYXJ0IGhlaWdodFxyXG4gICAgbGV0IG1hcmdpbiA9IHtcclxuICAgICAgICB0b3A6IDEwLFxyXG4gICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgIGJvdHRvbTogMTAwLFxyXG4gICAgICAgIGxlZnQ6IDEwXHJcbiAgICB9O1xyXG4gICAgbGV0IG1hcmdpblRvTGVnZW5kID0gNTA7XHJcblxyXG4gICAgbGV0IHN3YXJtX2ZlYXR1cmVzID0gT2JqZWN0LmtleXMoc3dhcm1EYXRhWzBdKTtcclxuICAgIC8vIHJlbW92ZSB0aGUgdGltZSBrZXlcclxuICAgIGxldCBpbmRleCA9IHN3YXJtX2ZlYXR1cmVzLmluZGV4T2YoJ3RpbWUnKTtcclxuICAgIHN3YXJtX2ZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBMaW5lIGNoYXJ0IGJ1dHRvbnMgdG8gdGhlIGZlYXR1cmUgcGFuZWxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBzd2FybV9mZWF0dXJlc1tpXS5zcGxpdCgnXycpLmpvaW4oJyAnKTtcclxuICAgICAgICBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyA9IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcuc2xpY2UoMSk7XHJcblxyXG4gICAgICAgICQoJy5mZWF0dXJlLWNoZWNrLWJveCcpLmFwcGVuZChgPGRpdiBjbGFzcz1cImZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgbGluZUNoYXJ0Q2hlY2tCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgYFwiIGNsYXNzPVwibGluZUNoYXJ0QnV0dG9uXCIgdHlwZT1cImNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkcmF3U3dhcm1gICsgc3dhcm1fZmVhdHVyZXNbaV0gKyAnXCI+JyArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nICsgYDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmApO1xyXG4gICAgfVxyXG4gICAgLy9jaGVjayBsaW5lIGNoYXJ0IGRyYXcgYWxsIGxpbmVzXHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJylcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgIGxldCBsaW5lQ2hhcnREYXRhID0gW107XHJcbiAgICAvLyBhZ2dyZWdhdGUgYW5kIGF2ZXJhZ2UgdGhlIHN3YXJtIGRhdGEgdG8gbGluZUNoYXJ0V2lkdGggcG9pbnRzIGluIHRoZSBsaW5lIGNoYXJ0XHJcbiAgICBpZiAoc3dhcm1EYXRhLmxlbmd0aCA+IGxpbmVDaGFydFdpZHRoKSB7XHJcbiAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwoc3dhcm1EYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuICAgICAgICAvLyB0bXAgYXJyYXkgZm9yIHRoZSBhZ2dyZWdhdGVkIGFuZCBhdmVyYWdlZCBmZWF0dXJlc1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBhZ2dyZWdhdGUgdGhlIGZlYXR1cmVzIGluIHRoZSB0ZW1wIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzd2FybURhdGFbaV1bc3dhcm1fZmVhdHVyZXNbal1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSByYXRpbyBpcyB6ZXJvIHRoZW4gYXZlcmFnZSBpdCBhbmQgc2V0IGl0IHRvIHplcm9cclxuICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcF9vYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpbWUnOiBpIC8gcmF0aW9cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF9vYmplY3Rbc3dhcm1fZmVhdHVyZXNbal1dID0gdG1wW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVDaGFydERhdGEucHVzaCh0bXBfb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRtcCA9IG5ldyBBcnJheShzd2FybV9mZWF0dXJlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpbmVDaGFydERhdGEgPSBzd2FybURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyB4IGF4aXMgc2NhbGUgLSBtaW51cyBtYXJnaW5MaW5lQ2hhcnQgIG5lZWRlZFxyXG4gICAgeCA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgbGV0IHgyID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIGxpbmVDaGFydERhdGEubGVuZ3RoXSlcclxuICAgICAgICAucmFuZ2UoWzAsIGxpbmVDaGFydFdpZHRoXSk7XHJcbiAgICAvLyBkZWZpbmUgd2hlcmUgdGhlIGF4aXMgaXMgZXRjXHJcbiAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgLnRpY2tzKDEwKVxyXG4gICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAudGlja1BhZGRpbmcoNSlcclxuICAgICAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gMTUwMCkgJSA2MCArICc6JyArIE1hdGguZmxvb3IoKGQgKiByYXRpbykgLyBwYXJhbWV0ZXJzWydmcHMnXSkgJSA2MCArICc6OicgKyAoZCAqIHJhdGlvKSAlIHBhcmFtZXRlcnNbJ2ZwcyddO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHkgYXhpcyBzY2FsZSB3aGljaCBpcyBub3JtYWxpemVkXHJcbiAgICB5ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4oWzAsIDEwMF0pXHJcbiAgICAgICAgLnJhbmdlKFtsaW5lQ2hhcnRIZWlnaHQsIDBdKTtcclxuICAgIC8vIGRlZmluZSB3aGVyZSB0aGUgYXhpcyBpcyBldGNcclxuICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHkpXHJcbiAgICAgICAgLnRpY2tzKDApXHJcbiAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgIC50aWNrUGFkZGluZyg1KTtcclxuXHJcbiAgICBsZXQgZHJhZ2dlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGRyYWdnZWQgZnVuY3Rpb24gZ2V0IHRoZSBjb29yZGluYXRlcyBhbmQgY2FsY3VsYXRlIHRoZSB0aW1lIG1vbWVudCBmcm9tIHRoaXNcclxuICAgICAgICBsZXQgY29vcmRzID0gZDMubW91c2UodGhpcyk7XHJcbiAgICAgICAgaWYgKGNvb3Jkc1swXSA8IG1hcmdpbi5sZWZ0IHx8IGNvb3Jkc1swXSA+IGxpbmVDaGFydFdpZHRoIHx8IGNvb3Jkc1sxXSA8IDAgfHwgY29vcmRzWzFdID4gbGluZUNoYXJ0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdG1wIHNjYWxlIHRvIGluY2x1ZGUgdGhlIHpvb20gZmFjdG9yXHJcbiAgICAgICAgbGV0IHRtcFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKHpvb21GdW5jdGlvbi5yYW5nZSgpKVxyXG4gICAgICAgICAgICAucmFuZ2Uoem9vbUZ1bmN0aW9uLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBzZXQgdGhlIG5ldyB0aW1lXHJcbiAgICAgICAgc2V0SW5kZXhUaW1lKE1hdGguZmxvb3IoKHRtcFNjYWxlKGNvb3Jkc1swXSAtIG1hcmdpbi5sZWZ0KSkgKiByYXRpbykpO1xyXG4gICAgfTtcclxuICAgIGxldCB6b29tID0gZDMuem9vbSgpXHJcbiAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCAyMF0pXHJcbiAgICAgICAgLnRyYW5zbGF0ZUV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAuZXh0ZW50KFtcclxuICAgICAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgICAgICBbbGluZUNoYXJ0V2lkdGgsIGxpbmVDaGFydEhlaWdodF1cclxuICAgICAgICBdKVxyXG4gICAgICAgIC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHRyYW5zZm9ybSBmYWN0b3JcclxuICAgICAgICAgICAgbGV0IHQgPSBkMy5ldmVudC50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZSBzY2FsaW5nIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHpvb21GdW5jdGlvbiA9IHguZG9tYWluKHQucmVzY2FsZVgoeDIpLmRvbWFpbigpKTtcclxuICAgICAgICAgICAgLy8gem9vbSBlYWNoIGF2YWlhYmxlIGxpbmVcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGxpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cC5zZWxlY3QoKCcjJyArIGtleSArICdMaW5lJykpLmF0dHIoJ2QnLCBsaW5lc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB6b29tIHRoZSB0cmVuZCBjaGFydHNcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRyZW5kQ2hhcnRzWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyZW5kQ2hhcnRzWm9vbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCgnIycgKyBrZXkgKyAnVHJlbmRDaGFydCAuJyArIHRyZW5kQ2hhcnRzRWxlbVtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRyZW5kQ2hhcnRzWm9vbVtrZXldW3RyZW5kQ2hhcnRzRWxlbVtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBzdmcgcmVzaXphYmxlXHJcbiAgICBsZXQgc3dhcm1MaW5lQ2hhcnQgPSBkMy5zZWxlY3QoJyNzd2FybS12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctTGluZUNoYXJ0Q29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBsaW5lQ2hhcnRIZWlnaHQgKyAnKScpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeSBheGlzXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG5cclxuICAgIC8vIHRoZSB0aW1lIGxpbmUgYXBwZW5kIHRoZSBsaW5lXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGltZUxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRUaW1lTGluZScpXHJcbiAgICAgICAgLmF0dHIoJ3gxJywgMClcclxuICAgICAgICAuYXR0cigneTEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4MicsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kyJywgbGluZUNoYXJ0SGVpZ2h0KTtcclxuXHJcbiAgICAvLyAqKlxyXG4gICAgLy8gY29sb3JzIGZvciB0aGUgbGluZXNcclxuICAgIGxldCBsaW5lX2NvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVDYXRlZ29yeTEwKTtcclxuICAgIGxldCBsaW5lcyA9IHt9O1xyXG4gICAgLy8gYWRkIHRoZSBsaW5lcyB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtaW4gPSBkMy5taW4obGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1heCA9IGQzLm1heChsaW5lQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkW3N3YXJtX2ZlYXR1cmVzW2ldXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuICAgICAgICBsZXQgbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geChkWyd0aW1lJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtzd2FybV9mZWF0dXJlc1tpXV0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGluZXNbc3dhcm1fZmVhdHVyZXNbaV1dID0gbGluZTtcclxuICAgICAgICAvL2FwcGVuZCB0aGUgbGluZSB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgICAgIHpvb21Hcm91cC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuZGF0YShbbGluZUNoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lIGxpbmVDaGFydExpbmUnKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGxpbmVfY29sb3JzKGkpKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpXHJcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgc3dhcm1fZmVhdHVyZXNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3pvb20nKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxpbmVDaGFydFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsaW5lQ2hhcnRIZWlnaHQpXHJcbiAgICAgICAgLmNhbGwoem9vbSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZHJhZ2dlZClcclxuICAgICAgICAuY2FsbChkMy5kcmFnKClcclxuICAgICAgICAgICAgLm9uKCdkcmFnJywgZHJhZ2dlZClcclxuICAgICAgICApO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbGVnZW5kIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gMTAwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDUwO1xyXG5cclxuICAgIC8vc2VsZWN0IGFsbCB0aGUgbGluZXNcclxuICAgIGxldCBjaGFydExpbmVzID0gZDMuc2VsZWN0QWxsKCcubGluZScpO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSBsZWdlbmRcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydExlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5ib3R0b20gKyAnLCcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luVG9MZWdlbmQpICsgJyknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShjaGFydExpbmVzLl9ncm91cHNbMF0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA2MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZC5zdHlsZS5zdHJva2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lQ2hhcnRsZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSArICc6ICcpO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBlbmQgdGhlIHRleHQgZm9yIHRoZSB2YWx1ZSBvZiB0aGUgbGluZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0bGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggK1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgZXhwcmVzc2lvbiBnZXRzIHRoZSB0ZXh0IGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnIycgKyBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnTGVnZW5kVGl0bGUnKS5ub2RlKCkuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgK1xyXG4gICAgICAgICAgICAgICAgICAgIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgnMC4wJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy9hcHBlbmQgYSBsZWdlbmQgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydHNcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RyZW5kQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoWyc1JSAtIDk1JScsICcyNSUgLSA3NSUnLCAnTWVkaWFuJ10pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA4MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNzRhOWNmJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjMDQ1YThkJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyM1MjUyNTInO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydGxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICsgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGxpbmUgY2hhcnQgYnV0dG9uIGxpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJCgoJyNkcmF3U3dhcm0nICsgc3dhcm1fZmVhdHVyZXNbaV0pKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICQoKCcjJyArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4vKipcclxuICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAqL1xyXG4kKCcuZHJhdy1kZXRhaWxzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZGlzYWJsZUxpbmVDaGFydCgpO1xyXG4gICAgICAgIGFkZFRyZW5kQ2hhcnQodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlbW92ZVRyZW5kQ2hhcnQoKTtcclxuICAgICAgICBlbmFibGVMaW5lQ2hhcnQoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBkaXNhYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJy5saW5lQ2hhcnRDaGVja0JveCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG59XHJcblxyXG4vKipcclxuICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmFibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAkKCcubGluZUNoYXJ0QnV0dG9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgJCgnLmxpbmVDaGFydENoZWNrQm94JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAkKCcubGluZUNoYXJ0TGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG59XHJcblxyXG4vKipcclxuICogSGlkZSB0aGUgdHJlbmQgY2hhcnRcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZVRyZW5kQ2hhcnQoKSB7XHJcbiAgICAkKCcudHJlbmRDaGFydERhdGEnKS5oaWRlKCk7XHJcbiAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuICAgICQoJyNsaW5lQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSB0cmVuZCBjaGFydCBzaG93aW5nIG1lZGlhbiBhbmQgcGVyY2VudGlsZXNcclxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW0gLSB3aGljaCBmZWF0dXJlICBcclxuICovXHJcbmZ1bmN0aW9uIGFkZFRyZW5kQ2hhcnQoZWxlbSkge1xyXG4gICAgLy8gY2hlY2sgd2hpY2ggZmVhdHVyZSB0byBkaXNwbGF5IGluIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgbGV0IGZlYXR1cmUgPSAnJztcclxuICAgIGlmIChlbGVtWydpZCddLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NwZWVkJykpIHtcclxuICAgICAgICBmZWF0dXJlID0gJ3NwZWVkJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhY2NlbGVyYXRpb24nKSkge1xyXG4gICAgICAgIGZlYXR1cmUgPSAnYWNjZWxlcmF0aW9uJztcclxuICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdkaXN0YW5jZS1jZW50cm9pZCcpKSB7XHJcbiAgICAgICAgZmVhdHVyZSA9ICdkaXN0YW5jZV9jZW50cm9pZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGRhdGEgaXMgbm90IGxvYWRlZCBmdWxseSAtLSByZXR1cm5cclxuICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAkKCcjbGluZUNoYXJ0TGVnZW5kJykuaGlkZSgpO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5zaG93KCk7XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgaWYgKCEkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkYXRhIGZvciB0aGUgdHJlbmQgY2hhcnRcclxuICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBhbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNldGlsZXMgZm9yIGV2ZXJ5IHRpbWUgc3RlcFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal1bZmVhdHVyZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhLnB1c2gocGVyY2VudGlsZXModG1wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWdncmVnYXRlIGFuZCBhdmVyYWdlIHRoZSB0cmVuZENoYXJ0RGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmICh0cmVuZENoYXJ0RGF0YS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgcmF0aW8gPSBNYXRoLmNlaWwodHJlbmRDaGFydERhdGEubGVuZ3RoIC8gbGluZUNoYXJ0V2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgIGxldCB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyZW5kQ2hhcnREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2dyZWdhdGVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRyZW5kQ2hhcnREYXRhW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZGl2aWRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIHJhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICB0bXBUcmVuZENoYXJ0RGF0YS5wdXNoKHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW3BlcmMwNSxwZXJjMjUscGVyYzUwLHBlcmM3NSxwZXJjOTVdXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnREYXRhID0gdG1wVHJlbmRDaGFydERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBtaW4gYW5kIG1heCBmb3IgdGhlIG5vcm1hbGl6YXRpb25cclxuICAgICAgICBsZXQgbWluID0gZDMubWluKHRyZW5kQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXggPSBkMy5tYXgodHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRbNF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCB0cmVuZENoYXJ0ID0gem9vbUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyZW5kQ2hhcnREYXRhJyk7XHJcbiAgICAgICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZSBhZ2FpbiB0byB0aGUgZW5kIG9mIHRoZSBncm91cFxyXG4gICAgICAgICQoJy56b29tJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgLy8gdmFyIHRvIHNhdmUgdGhlIGZ1bmN0aW9ucyBmb3IgdGhlIHpvb21cclxuICAgICAgICB0cmVuZENoYXJ0c1pvb21bZmVhdHVyZV0gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIGZvciB0aGUgdXBwZXIgYW5kIGlubmVyIGFyZWFzIGFuZCB0aGUgbWVkaWFuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBsb3dlciBvdXRlciBhcmVhIGFuZCBsb3dlciBpbm5lciBhcmVhXHJcbiAgICAgICAgICAgIGlmIChpIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSArIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtZWRpYW4gbGluZVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55KGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1cHBlciBpbm5lciBhcmVhIGFuZCB1cHBlciBvdXRlciBhcmVhXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLngoZnVuY3Rpb24oZCwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC55MChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAueTEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSAtIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNhdmUgdGhpcyBmb3IgdGhlIGxhdGVyIHpvb21cclxuICAgICAgICAgICAgdHJlbmRDaGFydHNab29tW2ZlYXR1cmVdW3RyZW5kQ2hhcnRzRWxlbVtpXV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgaXQgdG8gdGhlIHBhdGhcclxuICAgICAgICAgICAgdHJlbmRDaGFydC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoW3RyZW5kQ2hhcnREYXRhXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHRyZW5kQ2hhcnRzRWxlbVtpXSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBzaG93IHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICQoKCcjJyArIGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2xpbmVfY2hhcnQuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csJCwgZDMqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIG5ldHdvcmtIaWVyYXJjaHlcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluZGV4VGltZVxyXG59IGZyb20gJy4vc3BhdGlhbF92aWV3L3NwYXRpYWxfdmlldyc7XHJcblxyXG5sZXQgbWFyZ2luID0ge1xyXG4gICAgICAgIHRvcDogMjAsXHJcbiAgICAgICAgcmlnaHQ6IDkwLFxyXG4gICAgICAgIGJvdHRvbTogMzAsXHJcbiAgICAgICAgbGVmdDogOTBcclxuICAgIH0sXHJcbiAgICB3aWR0aCA9IDY2MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxyXG4gICAgaGVpZ2h0ID0gNTAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd19kZW5kcm9ncmFtKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2cobmV0d29ya0hpZXJhcmNoeSk7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2cobmV0d29ya0hpZXJhcmNoeVtpbmRleFRpbWVdKTtcclxuICAgIC8vIGhpZGUgaWYgbm8gbmV0d29yayBpcyBjaG9vc2VuXHJcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChuZXR3b3JrSGllcmFyY2h5KSkge1xyXG4gICAgICAgICQoJyNkZW5kcm9ncmFtLXZpcycpLnNob3coKTtcclxuXHJcbiAgICAgICAgbGV0IHRyZWVtYXAgPSBkMy50cmVlKClcclxuICAgICAgICAgICAgLnNpemUoW2hlaWdodCwgd2lkdGhdKTtcclxuXHJcbiAgICAgICAgbGV0IHRyZWVEYXRhID0gbmV0d29ya0hpZXJhcmNoeVtpbmRleFRpbWVdO1xyXG4gICAgICAgIGxldCBub2RlcyA9IGQzLmhpZXJhcmNoeSh0cmVlRGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5jaGlsZHJlbjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gbWFwcyB0aGUgbm9kZSBkYXRhIHRvIHRoZSB0cmVlIGxheW91dFxyXG4gICAgICAgIG5vZGVzID0gdHJlZW1hcChub2Rlcyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgc3ZnIG9iamVjdCB0byB0aGUgYm9keSBvZiB0aGUgcGFnZVxyXG4gICAgICAgIC8vIGFwcGVuZHMgYSAnZ3JvdXAnIGVsZW1lbnQgdG8gJ3N2ZydcclxuICAgICAgICAvLyBtb3ZlcyB0aGUgJ2dyb3VwJyBlbGVtZW50IHRvIHRoZSB0b3AgbGVmdCBtYXJnaW5cclxuICAgICAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcjZGVuZHJvZ3JhbS12aXMnKS5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSksXHJcbiAgICAgICAgICAgIGcgPSBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyBtYXJnaW4ubGVmdCArICcsJyArIG1hcmdpbi50b3AgKyAnKScpO1xyXG5cclxuICAgICAgICAvLyBhZGRzIHRoZSBsaW5rcyBiZXR3ZWVuIHRoZSBub2Rlc1xyXG4gICAgICAgIGxldCBsaW5rID0gZy5zZWxlY3RBbGwoJy5saW5rJylcclxuICAgICAgICAgICAgLmRhdGEobm9kZXMuZGVzY2VuZGFudHMoKS5zbGljZSgxKSlcclxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmsnKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnTScgKyBkLnkgKyAnLCcgKyBkLnggK1xyXG4gICAgICAgICAgICAgICAgICAgICdDJyArIChkLnkgKyBkLnBhcmVudC55KSAvIDIgKyAnLCcgKyBkLnggK1xyXG4gICAgICAgICAgICAgICAgICAgICcgJyArIChkLnkgKyBkLnBhcmVudC55KSAvIDIgKyAnLCcgKyBkLnBhcmVudC54ICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgKyBkLnBhcmVudC55ICsgJywnICsgZC5wYXJlbnQueDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGFkZHMgZWFjaCBub2RlIGFzIGEgZ3JvdXBcclxuICAgICAgICBsZXQgbm9kZSA9IGcuc2VsZWN0QWxsKCcubm9kZScpXHJcbiAgICAgICAgICAgIC5kYXRhKG5vZGVzLmRlc2NlbmRhbnRzKCkpXHJcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnbm9kZScgK1xyXG4gICAgICAgICAgICAgICAgICAgIChkLmNoaWxkcmVuID8gJyBub2RlLS1pbnRlcm5hbCcgOiAnIG5vZGUtLWxlYWYnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnkgKyAnLCcgKyBkLnggKyAnKSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGRzIHRoZSBjaXJjbGUgdG8gdGhlIG5vZGVcclxuICAgICAgICBub2RlLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3InLCAxMCk7XHJcblxyXG4gICAgICAgIC8vIGFkZHMgdGhlIHRleHQgdG8gdGhlIG5vZGVcclxuICAgICAgICBub2RlLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcuMzVlbScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRyZW4gPyAtMTMgOiAxMztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuID8gJ2VuZCcgOiAnc3RhcnQnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNkZW5kcm9ncmFtLXZpcycpLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGllcmFyY2h5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBsb3JlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBGZWF0dXJlcyBjaGVja2JveCBhbmQgcmFkaW8gYnV0dG9ucyAqL1xcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBkaXYge1xcclxcbiAgICBjbGVhcjogYm90aDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGxhYmVsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QxRDNENDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHksIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmVtcHR5IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHl+bGFiZWwsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmVtcHR5fmxhYmVsIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBsaW5lLWhlaWdodDogMi41ZW07XFxyXFxuICAgIHRleHQtaW5kZW50OiAzZW07XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06ZW1wdHl+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTplbXB0eX5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHdpZHRoOiAyLjVlbTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0QxRDNENDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWwsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWwge1xcclxcbiAgICBjb2xvcjogIzg4ODtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06aG92ZXI6bm90KDpjaGVja2VkKX5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmhvdmVyOm5vdCg6Y2hlY2tlZCl+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJ1xcXFwyNzE0JztcXHJcXG4gICAgdGV4dC1pbmRlbnQ6IC45ZW07XFxyXFxuICAgIGNvbG9yOiAjQzJDMkMyO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsIHtcXHJcXG4gICAgY29sb3I6ICM3Nzc7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWR+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICdcXFxcMjcxNCc7XFxyXFxuICAgIHRleHQtaW5kZW50OiAuOWVtO1xcclxcbiAgICBjb2xvcjogIzMzMztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Zm9jdXN+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpmb2N1c35sYWJlbDpiZWZvcmUge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggIzk5OTtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94LWRlZmF1bHQgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTVkcgZWxlbWVudHMgYW5kIHRleHQgKi9cXHJcXG5cXHJcXG4uc3ZnLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1jb250ZW50LWxlZ2VuZCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDEwcHg7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdmctbGVnZW5kQ29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvICovXFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiAxMCU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLUxpbmVDaGFydENvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICAvKiBkZXBlbmRzIG9uIHN2ZyByYXRpbyAqL1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMTclO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5heGlzIHBhdGgge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpcyBsaW5lIHtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMztcXHJcXG4gICAgc2hhcGUtcmVuZGVyaW5nOiBjcmlzcEVkZ2VzO1xcclxcbn1cXHJcXG5cXHJcXG4ueCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG4ueSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG4uYXhpc0xpbmVDaGFydCBwYXRoIGxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVGltZSAgKi9cXHJcXG5cXHJcXG4uZnJhbWVUZXh0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2xpZGVyIHRpY2tzICAqL1xcclxcblxcclxcbi51aS1zbGlkZXItdGljayB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgd2lkdGg6IDNweDtcXHJcXG4gICAgYmFja2dyb3VuZDogIzMzN2FiNztcXHJcXG4gICAgaGVpZ2h0OiAwLjhlbTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBMYW9kaW5nIGdpZiAgICovXFxyXFxuXFxyXFxuI2xvYWRpbmcge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb2xvciBsZWdlbmQgICAgKi9cXHJcXG5cXHJcXG4ubGVnZW5kIHtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi5sZWdlbmRUZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZUNoYXJ0bGVnZW5kVGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi50aW1lTGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbiAgICBzdHJva2U6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qc3dhcm0gZmVhdHVyZXMgKi9cXHJcXG5cXHJcXG4uY2VudHJvaWQge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5tZWRvaWQge1xcclxcbiAgICBmaWxsOiAjZTcyOThhICFpbXBvcnRhbnQ7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YSAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uaHVsbFBhdGgge1xcclxcbiAgICBmaWxsOiAjZmZmO1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMztcXHJcXG4gICAgc3Ryb2tlOiAjMjUyNTI1O1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC41O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsYXVuYXlUcmlhbmd1bGF0aW9uIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuNDtcXHJcXG59XFxyXFxuXFxyXFxuLmdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGUge1xcclxcbiAgICAtYW5pbWF0aW9uOiBzcGluIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluMiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbn1cXHJcXG5cXHJcXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbjIge1xcclxcbiAgICBmcm9tIHtcXHJcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgdG8ge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZC1jb2xvciBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5idG4ge1xcclxcbiAgICBib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIC5hY3RpdmUgc3Bhbi5nbHlwaGljb24ge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkxIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Q5ZDlkOTtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1ncmV5MiB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM5Njk2OTY7XFxyXFxufVxcclxcblxcclxcbiNidG4tZGFyayB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICM0ZDRkNGQ7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGJyZXdlciBwaWNrZXIgZGl2ICovXFxyXFxuXFxyXFxuLnBhbGV0dGUge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcclxcbiAgICBtYXJnaW46IDRweCAwIDRweCA0cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNhYWE7XFxyXFxufVxcclxcblxcclxcbi5zd2F0Y2gge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIHdpZHRoOiAyMnB4O1xcclxcbiAgICBoZWlnaHQ6IDIycHg7XFxyXFxufVxcclxcblxcclxcbi52b3Jvbm9pIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDM7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc3Ryb2tlLW9wYWNpdHk6IDAuMjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDZweCAwO1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQyOTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaXJjbGUuYnRuLWxnIHtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgcGFkZGluZzogMTNweCAxM3B4O1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjMzO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUb29sdGlwICovXFxyXFxuXFxyXFxuZGl2LnRvb2x0aXAge1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjMWI4MDllICFpbXBvcnRhbnQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XFxyXFxuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB0YWJsZSB0ZDpudGgtY2hpbGQoMikge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZUNoYXJ0Q2hlY2tCb3guZGlzYWJsZWQge1xcclxcbiAgICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyT3V0ZXJBcmVhLCAubG93ZXJPdXRlckFyZWEge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIGZpbGw6ICM3NGE5Y2Y7XFxyXFxuICAgIHN0cm9rZTogIzM2OTBjMDtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVySW5uZXJBcmVhLCAubG93ZXJJbm5lckFyZWEge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIGZpbGw6ICMwNDVhOGQ7XFxyXFxuICAgIHN0cm9rZTogIzAyMzg1ODtcXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhbkxpbmUge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBzdHJva2U6ICM1MjUyNTI7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk5OTtcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgIzRkNGQ0ZDtcXHJcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLnpvb20ge1xcclxcbiAgICBmaWxsOiBub25lO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4ueC5heGlzTGluZUNoYXJ0Pmc+dGV4dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi5hcnJvdyB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG59XFxyXFxuXFxyXFxuI2NlbnRyb2lkLWxpbmUge1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDE7XFxyXFxuICAgIHN0cm9rZTogI2U3Mjk4YTtcXHJcXG59XFxyXFxuXFxyXFxuI2NlbnRyb2lkLWFycm93IHtcXHJcXG4gICAgZmlsbDogI2U3Mjk4YTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogLTVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAtMTBweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLm1vZC1oZWFkIHtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBib3JkZXItYm90dG9tOiB0aGljayBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweCA1cHggMCAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLm1vZC1oZWFkIHNwYW4ge1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICBib3JkZXI6IHRoaWNrIHNvbGlkIHdoaXRlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIG1hcmdpbi10b3A6IC02MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjg2MDkwO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLm1vZC1oZWFkIGgyIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogN3B4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogNzAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3QgLnQyIC5tb2QtaGVhZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAuY2xvc2Uge1xcclxcbiAgICBmb250LXNpemU6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1oZWFkZXIge1xcclxcbiAgICBib3JkZXItYm90dG9tOiAwcHggc29saWQgI2U1ZTVlNTtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLXN3YXRjaCB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzY2NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLXN3YXRjaC1jbGlja2FibGU6aG92ZXIge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMDAwO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5kcm9wZG93bi1tZW51IHtcXHJcXG4gICAgbWluLXdpZHRoOiA0MHB4O1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNtZXRhZGF0YS1pbnB1dCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMDAwMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCBsaSB7XFxyXFxuICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgc3BhbiB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XFxyXFxuICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIC5ibC1hdmcge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2ZjOTdmO1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIC5hdmcge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRjMDg2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIC5hYi1hdmcge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzg2Y2IwO1xcclxcbn1cXHJcXG5cXHJcXG4ubmV0d29ya0VkZ2VzIHtcXHJcXG4gICAgZmlsbC1vcGFjaXR5OiAwO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDI7XFxyXFxufVxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9leHBsb3JlL2V4cGxvcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==