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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return animal_ids; });
/* harmony export (immutable) */ __webpack_exports__["o"] = spatialViewInit;
/* harmony export (immutable) */ __webpack_exports__["c"] = draw;
/* unused harmony export getPlayBoolean */
/* harmony export (immutable) */ __webpack_exports__["m"] = setPlayBoolean;
/* harmony export (immutable) */ __webpack_exports__["g"] = getIndexTime;
/* harmony export (immutable) */ __webpack_exports__["l"] = setIndexTime;
/* harmony export (immutable) */ __webpack_exports__["j"] = getZoomFunction;
/* harmony export (immutable) */ __webpack_exports__["n"] = setZoomFunction;
/* harmony export (immutable) */ __webpack_exports__["i"] = getTankWidth;
/* harmony export (immutable) */ __webpack_exports__["h"] = getTankHeight;
/* harmony export (immutable) */ __webpack_exports__["e"] = getActiveScale;
/* unused harmony export setActiveScale */
/* unused harmony export getMedoidAnimal */
/* unused harmony export setMedoidAnimal */
/* harmony export (immutable) */ __webpack_exports__["d"] = getActiveAnimals;
/* harmony export (immutable) */ __webpack_exports__["k"] = setActiveAnimals;
/* harmony export (immutable) */ __webpack_exports__["f"] = getArrayAnimals;
/* unused harmony export setArrayAnimals */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_chart__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spatial_view_interaction_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__spatial_view_color_picker_js__ = __webpack_require__(4);
/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set */

















// Global namespace variables
let zoomFunction;
let indexTime = 0;

let svgContainer;
let tank;
let tooltip; // the tooltip
let playBoolean = true; // pause and play boolean
var activeScale = 'black'; // no color scales
let tankWidth;
let tankHeight;
let medoidAnimal = -1;
let arrayAnimals;
let activeAnimals = []; // active selected animals
let animal_ids;


/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
function spatialViewInit() {



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
        Object(__WEBPACK_IMPORTED_MODULE_4__spatial_view_interaction_js__["b" /* initTooltip */])();
        Object(__WEBPACK_IMPORTED_MODULE_4__spatial_view_interaction_js__["a" /* initSliders */])();

        //definte the line chart time scale
        zoomFunction = d3.scaleLinear()
            .domain([0, __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]().length])
            .range([0, __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]().length]);

        Object(__WEBPACK_IMPORTED_MODULE_6__spatial_view_color_picker_js__["a" /* initColorPicker */])();

        //Draw the fish swarm line chart
        Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["b" /* lineChart */])();

        draw();

    }

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
                Object(__WEBPACK_IMPORTED_MODULE_4__spatial_view_interaction_js__["c" /* setTimeSlider */])(indexTime);
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
                    $(('#mc-' + d['node1'] + '-' + d['node2'])).css('fill', __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */](d['val']));
                    $(('#mc-' + d['node2'] + '-' + d['node1'])).css('fill', __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */](d['val']));
                });

                if (__WEBPACK_IMPORTED_MODULE_1__network_js__["c" /* getNetworkAuto */]()) {
                    let tmpArray = [];
                    for (let i = 0; i < network.length; i++) {
                        tmpArray.push(network[i]['val']);
                    }
                    __WEBPACK_IMPORTED_MODULE_1__network_js__["e" /* setNetworLimit */](Object(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["a" /* percentiles */])(tmpArray));
                }

                network = network.filter(function(d) {
                    return d['val'] >= __WEBPACK_IMPORTED_MODULE_1__network_js__["b" /* getNetworLimit */]();
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
                        return __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */](d['val']);
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
                        return __WEBPACK_IMPORTED_MODULE_1__network_js__["d" /* networkColorScale */](d['val']);
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
                    .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['triangulation']]);

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
                    .data(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['voronoi'].split(';'));


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
                    Object(__WEBPACK_IMPORTED_MODULE_4__spatial_view_interaction_js__["d" /* tooltipFunction */])(d);
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
                    .data([__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['hull']]);

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
                var tmpScale = Object(__WEBPACK_IMPORTED_MODULE_6__spatial_view_color_picker_js__["b" /* returnColorScale */])();
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

                if (!$.isEmptyObject(Object(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["a" /* getMetadataColor */])())) {
                    Object.keys(Object(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["a" /* getMetadataColor */])()).forEach(function(key) {
                        d3
                            .select('#animal-' + key)
                            .style('fill', Object(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["a" /* getMetadataColor */])()[key])
                            .attr('stroke', Object(__WEBPACK_IMPORTED_MODULE_5__metadata_js__["a" /* getMetadataColor */])()[key]);
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
                        return __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][0];
                    } else {
                        return 0;
                    }
                })
                .attr('cy', function() {
                    if ('centroid' in __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[0]) {
                        return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][1];
                    } else {
                        return 0;
                    }
                });
            if ($('#draw-direction').is(':checked') &&
                __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime].centroid &&
                $('#draw-centroid').is(':checked')) {
                d3.select('#centroid-line')
                    .classed('hidden', false);
                // UPDATE animal direction arrow
                d3.select('#centroid-line')
                    .attr('x1', function() {
                        return __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][0];
                    })
                    .attr('y1', function() {
                        return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][1];
                    })
                    .attr('x2', function() {
                        return (__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][0] + 2 * animalScale);
                    })
                    .attr('y2', function() {
                        return -__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][1];
                    })
                    .attr('transform', function() {
                        return 'rotate(' + -__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['direction'] + ' ' + __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][0] + ' ' + -__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['centroid'][1] + ')';
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
                medoidAnimal = __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[indexTime]['medoid'];
                d3.selectAll('#animal-' + medoidAnimal)
                    .classed('medoid', true);
            }

            //next frame
            indexTime++;

            if (d3.select('#lineChartTimeLine') && __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[Math.ceil(indexTime / Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["a" /* getLineChartRatio */])())]) {
                let tmp = Math.ceil(indexTime / Object(__WEBPACK_IMPORTED_MODULE_2__line_chart__["a" /* getLineChartRatio */])());
                //update the line chart legend text values per second
                if (indexTime % 25 === 0) {
                    // TODO change this to a more modular way
                    d3.select('#convex_hull_areaLineValue')
                        .text((__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['convex_hull_area']) + 'mm²');
                    d3.select('#speedLineValue')
                        .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['speed'] + 'mm/s');
                    d3.select('#accelerationLineValue')
                        .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['acceleration'] + 'mm/s²');
                    d3.select('#distance_centroidLineValue')
                        .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['distance_centroid'] + 'mm');
                    d3.select('#directionLineValue')
                        .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['direction'] + '°');
                    d3.select('#polarisationLineValue')
                        .text(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]()[tmp]['polarisation']);
                }

                d3.select('#lineChartTimeLine')
                    .attr('transform', 'translate(' + zoomFunction(tmp) + ',0)');
            }


            //check if play button is active and if the animation is not finished
            if (indexTime >= __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]().length) {
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

/************************************************
    Getter and setter
 *************************************************/

function getPlayBoolean() {
    return playBoolean;
}

function setPlayBoolean(value) {
    if (typeof value === 'boolean') {
        playBoolean = value;
    } else {
        playBoolean = false;
    }
}

function getIndexTime() {
    return indexTime;
}

function setIndexTime(value) {
    if (typeof value === 'number' && (indexTime <= __WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]().length)) {
        indexTime = value;
    } else {
        indexTime = 0;
    }
}

function getZoomFunction() {
    return zoomFunction;
}

function setZoomFunction(value) {
    zoomFunction = value;
}

function getTankWidth() {
    return tankWidth;
}

function getTankHeight() {
    return tankHeight;
}

function getActiveScale() {
    return activeScale;
}

function setActiveScale(value) {
    activeScale = value;
}

function getMedoidAnimal() {
    return medoidAnimal;
}

function setMedoidAnimal(value) {
    medoidAnimal = value;
}

function getActiveAnimals() {
    return activeAnimals;
}

function setActiveAnimals(value) {
    activeAnimals = value;
}

function getArrayAnimals() {
    return arrayAnimals;
}

function setArrayAnimals(value) {
    arrayAnimals = value;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataset", function() { return dataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datasetMetadata", function() { return datasetMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "swarmData", function() { return swarmData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataSetPercentile", function() { return dataSetPercentile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomFunction", function() { return zoomFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "networkData", function() { return networkData; });
/* harmony export (immutable) */ __webpack_exports__["addToDataset"] = addToDataset;
/* harmony export (immutable) */ __webpack_exports__["setDataSetPercentile"] = setDataSetPercentile;
/* harmony export (immutable) */ __webpack_exports__["setMetaData"] = setMetaData;
/* harmony export (immutable) */ __webpack_exports__["getSwarmData"] = getSwarmData;
/* harmony export (immutable) */ __webpack_exports__["setSwarmData"] = setSwarmData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_queries_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__metadata_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explore_css__ = __webpack_require__(10);
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
                Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["o" /* spatialViewInit */])();
            }
        }
        window.setTimeout(checkPendingRequest, 100);
    })();

});

/************************************************
    Getter and setter
 *************************************************/

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
    Object(__WEBPACK_IMPORTED_MODULE_2__metadata_js__["b" /* initializeMetaddata */])();
}


function getSwarmData() {
    return swarmData;
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return networkColorScale; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addNetworkButtons;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNetworkAuto;
/* unused harmony export setNetworkAuto */
/* harmony export (immutable) */ __webpack_exports__["b"] = getNetworLimit;
/* harmony export (immutable) */ __webpack_exports__["e"] = setNetworLimit;
/*eslint-disable no-unused-lets*/
/*global window, $, d3 */


let networkAuto = false; // if true the network edge limit is automatically suggested
let networkLimit = 0;
// fixed color scale for the network

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
    Getter and setter
 *************************************************/

function getNetworkAuto() {
    return networkAuto;
}

function setNetworkAuto(value) {
    networkAuto = value;
}

function getNetworLimit() {
    return networkLimit;
}

function setNetworLimit(value) {
    networkLimit = value;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = initializeMetaddata;
/* unused harmony export colorMetadata */
/* unused harmony export resetIndividualMetadata */
/* harmony export (immutable) */ __webpack_exports__["a"] = getMetadataColor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(1);
/*eslint-disable no-unused-lets*/
/*global window, $, */
// import * as spv from './spatial_view.js';




let metadataColor = {}; // save the metadata coloring


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
    for (let i = 0; i < self.datasetMetadata.length; i++) {
        if (self.datasetMetadata[i][value] < blAvg) {
            metadataColor[self.datasetMetadata[i]['animal_id']] = colors[0];
        } else if (self.datasetMetadata[i][value] > abAvg) {
            metadataColor[self.datasetMetadata[i]['animal_id']] = colors[2];
        } else {
            metadataColor[self.datasetMetadata[i]['animal_id']] = colors[1];
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

/************************************************
    Getter and setter
 *************************************************/

function getMetadataColor() {
    return metadataColor;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = returnColorScale;
/* harmony export (immutable) */ __webpack_exports__["a"] = initColorPicker;
/* unused harmony export getColorScale */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_legend_js__ = __webpack_require__(9);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, colorbrewer*/





let colorScale = {
    type: 'Linear',
    color: colorbrewer.BuYlBu
};


/**
 * Returns the color scale
 *
 */
function returnColorScale() {
    //if linear is choosen
    if (colorScale['type'] === 'Linear') {
        return d3.scaleLinear()
            .domain(
                self.dataSetPercentile[__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["e" /* getActiveScale */]()]
            )
            .range(colorScale['color']);
    } //Threshold color scale
    else if (colorScale['type'] === 'Threshold') {
        return d3.scaleThreshold()
            .domain(
                self.dataSetPercentile[__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["e" /* getActiveScale */]()]
            )
            .range(colorScale['color']);
    }
}

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
            Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_legend_js__["a" /* changeLegend */])();
            if (!$('#play-button')
                .hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["l" /* setIndexTime */](__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["g" /* getIndexTime */]() - 1);
                __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["c" /* draw */]();
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

/************************************************
    Getter and setter
 *************************************************/

function getColorScale() {
    return colorScale;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = streamMovementData;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPercentile;
/* harmony export (immutable) */ __webpack_exports__["d"] = getSwarmFeatures;
/* harmony export (immutable) */ __webpack_exports__["a"] = getMetaData;
/* harmony export (immutable) */ __webpack_exports__["b"] = getNetworkData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__network_js__ = __webpack_require__(2);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lineChart;
/* harmony export (immutable) */ __webpack_exports__["a"] = getLineChartRatio;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(0);
/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/








let lineChartRatio = 0;


/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
function lineChart() {
    let lineChartWidth = 5000;

    lineChartRatio = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"]().length / lineChartWidth);

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

    let swarm_features = Object.keys(Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])()[0]);
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
    if (Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])().length > lineChartWidth) {
        ratio = Math.ceil(Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])().length / lineChartWidth);
        // tmp array for the aggregated and averaged features
        let tmp = new Array(swarm_features.length).fill(0);

        for (let i = 0; i < Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])().length; i++) {
            // aggregate the features in the temp array
            for (let j = 0; j < swarm_features.length; j++) {
                tmp[j] += Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])()[i][swarm_features[j]];
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
        lineChartData = Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])();
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
            .domain(Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["j" /* getZoomFunction */])().range())
            .range(Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["j" /* getZoomFunction */])().domain());
        // set the new time
        Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["l" /* setIndexTime */])(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
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
            Object(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["n" /* setZoomFunction */])(x.domain(t.rescaleX(x2).domain()));
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
            let num_animals = __WEBPACK_IMPORTED_MODULE_0__explore_js__["animal_ids"].length;
            // calculate the percetiles for every time step
            for (let i = 0; i < Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])().length; i++) {
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


/************************************************
    Getter and setter
 *************************************************/

function getLineChartRatio() {
    return lineChartRatio;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export disablePlayButton */
/* unused harmony export enablePlayButton */
/* harmony export (immutable) */ __webpack_exports__["a"] = percentiles;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(0);
/*eslint-disable no-unused-lets*/
/*global window,$,*/
// import * as spv from './spatial_view.js';




/**
 * Disable the play button --> Loading symbol
 *
 */
function disablePlayButton() {
    Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["m" /* setPlayBoolean */])(false);
    $('#play-button').removeClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
    $('#play-button').prop('disabled', true);
}

/**
 * Enable the play button remove loading symbol
 *
 */
function enablePlayButton() {
    Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["m" /* setPlayBoolean */])(true);
    $('#play-button').addClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>Play');
    $('#play-button').prop('disabled', false);
    Object(__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["c" /* draw */])();
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export brushend */
/* harmony export (immutable) */ __webpack_exports__["b"] = initTooltip;
/* harmony export (immutable) */ __webpack_exports__["d"] = tooltipFunction;
/* harmony export (immutable) */ __webpack_exports__["a"] = initSliders;
/* unused harmony export getTimeSlider */
/* harmony export (immutable) */ __webpack_exports__["c"] = setTimeSlider;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_js__ = __webpack_require__(2);
/*eslint-disable no-unused-lets*/
/*global window, d3, $*/






let slider;
let tooltip;

/**
 * Brush end function
 * Add the fish in the brush to the active fish and remove the brush again
 *
 */
function brushend() {
    let arrayAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["f" /* getArrayAnimals */]();
    let activeAnimals = __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["d" /* getActiveAnimals */]();
    var rect = d3.event.selection;
    //iterate over the 151 fish to check which are in the brush
    for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["a" /* animal_ids */].length; i++) {
        var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
        //check which fish are in  the brushed area
        if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
            (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
            // Point is in the brush
            activeAnimals.push(arrayAnimals[i]['a']);
        }
    }
    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["k" /* setActiveAnimals */](activeAnimals);
    if (!$('#play-button')
        .hasClass('active')) {
        //go back one second and draw the next frame
        //this applys the changes

        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["l" /* setIndexTime */](__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["g" /* getIndexTime */]() - 1);
        __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["c" /* draw */]();
    }
    $('#brushing-button')
        .removeClass('active');
    // remove the brush
    $('.brush')
        .remove();
}

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
 *
 */
function tooltipFunction(d) {
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"].length; i++) {
        if (d['a'] === __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['animal_id']) {
            tooltip
                .style('left', (d3.event.pageX + 5) + 'px')
                .style('top', (d3.event.pageY - 100) + 'px')
                .style('opacity', 1);
            // set the values
            tooltip.select('#tooltip-animal-id')
                .html(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['animal_id']);
            tooltip.select('#tooltip-species')
                .html(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['species']);
            tooltip.select('#tooltip-sex')
                .html(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['sex']);
            tooltip.select('#tooltip-size')
                .html(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['size']);
            tooltip.select('#tooltip-weight')
                .html(__WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["datasetMetadata"][i]['weight']);
        }
    }

}

function initSliders() {
    // initialize the slider
    slider = $('#slider')
        .slider({
            min: 0,
            max: Object(__WEBPACK_IMPORTED_MODULE_0__explore_js__["getSwarmData"])().length,
            step: 25,
            slide: function(event, ui) {
                __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["l" /* setIndexTime */](ui.value);
                // if paused apply changes
                if (!$('#play-button').hasClass('active')) {
                    //this applys the changes
                    __WEBPACK_IMPORTED_MODULE_1__spatial_view_js__["c" /* draw */]();
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
    Getter and setter
 *************************************************/

function getTimeSlider() {
    return slider;
}

function setTimeSlider(value) {
    slider.slider('value', value);
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addSpatialViewGroup */
/* harmony export (immutable) */ __webpack_exports__["a"] = changeLegend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spatial_view_color_picker_js__ = __webpack_require__(4);
/*eslint-disable no-unused-lets*/
/*global window, d3,*/





let svgLegend;


// group for the legend
function addSpatialViewGroup() {
    let tankWidth = __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["i" /* getTankWidth */]();

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
 */
function changeLegend() {
    let tankWidth = __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["i" /* getTankWidth */]();
    let tankHeight = __WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["h" /* getTankHeight */]();
    var legend; // the color legend
    var legendText; // color legend text
    // vars for the legend
    var legendWidth = tankWidth * 0.08;
    var legendHeight = tankHeight * 0.04;
    var differentColors = 0;

    //change the colors of the animals
    if (__WEBPACK_IMPORTED_MODULE_0__spatial_view_js__["e" /* getActiveScale */]() !== 'black') {
        var tmpScale = __WEBPACK_IMPORTED_MODULE_1__spatial_view_color_picker_js__["b" /* returnColorScale */]();
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, "/* Features checkbox and radio buttons */\r\n\r\n.feature-check-box div {\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n\r\n.feature-check-box label {\r\n    width: 100%;\r\n    border-radius: 3px;\r\n    border: 1px solid #D1D3D4;\r\n    font-weight: normal;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty, .feature-check-box input[type=\"checkbox\"]:empty {\r\n    display: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label, .feature-check-box input[type=\"checkbox\"]:empty~label {\r\n    position: relative;\r\n    line-height: 2.5em;\r\n    text-indent: 3em;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:empty~label:before, .feature-check-box input[type=\"checkbox\"]:empty~label:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    content: '';\r\n    width: 2.5em;\r\n    background: #D1D3D4;\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label {\r\n    color: #888;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:hover:not(:checked)~label:before, .feature-check-box input[type=\"checkbox\"]:hover:not(:checked)~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #C2C2C2;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label, .feature-check-box input[type=\"checkbox\"]:checked~label {\r\n    color: #777;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:checked~label:before, .feature-check-box input[type=\"checkbox\"]:checked~label:before {\r\n    content: '\\2714';\r\n    text-indent: .9em;\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n.feature-check-box input[type=\"radio\"]:focus~label:before, .feature-check-box input[type=\"checkbox\"]:focus~label:before {\r\n    box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.feature-check-box-default input[type=\"radio\"]:checked~label:before, .feature-check-box-default input[type=\"checkbox\"]:checked~label:before {\r\n    color: #333;\r\n    background-color: #ccc;\r\n}\r\n\r\n/* SVG elements and text */\r\n\r\n.svg-container {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.svg-content {\r\n    display: inline-block;\r\n    position: absolute;\r\n    border: 1px solid #000;\r\n}\r\n\r\n.svg-content-legend {\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 10px;\r\n}\r\n\r\n.svg-legendContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 10%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: hidden;\r\n}\r\n\r\n.svg-LineChartContainer {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 100%;\r\n    height: auto;\r\n    /* depends on svg ratio */\r\n    padding-bottom: 17%;\r\n    /* aspect ratio */\r\n    vertical-align: top;\r\n    overflow: visible;\r\n}\r\n\r\n.axis path {\r\n    display: none;\r\n}\r\n\r\n.axis line {\r\n    stroke-opacity: 0.3;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.x {\r\n    font-size: 1em;\r\n}\r\n\r\n.y {\r\n    font-size: 1em;\r\n}\r\n\r\n.axisLineChart path line {\r\n    fill: none;\r\n    stroke: #000;\r\n    shape-rendering: crispEdges;\r\n}\r\n\r\n.line {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n}\r\n\r\n/* Time  */\r\n\r\n.frameText {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    font-weight: 500;\r\n    line-height: 1.1;\r\n}\r\n\r\n/* Slider ticks  */\r\n\r\n.ui-slider-tick {\r\n    display: inline-block;\r\n    width: 3px;\r\n    background: #337ab7;\r\n    height: 0.8em;\r\n    position: absolute;\r\n}\r\n\r\n/* Laoding gif   */\r\n\r\n#loading {\r\n    display: block;\r\n    text-align: center;\r\n}\r\n\r\n/* Color legend    */\r\n\r\n.legend {\r\n    font-size: 12px;\r\n    stroke: #000;\r\n}\r\n\r\n.legendText {\r\n    font-size: 1.5em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.lineChartlegendText {\r\n    font-size: 2em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.timeLine {\r\n    fill: none;\r\n    stroke-width: 5px;\r\n    stroke: #000;\r\n}\r\n\r\n/*swarm features */\r\n\r\n.centroid {\r\n    fill-opacity: 0;\r\n    stroke: #e7298a;\r\n    stroke-width: 3px;\r\n}\r\n\r\n.medoid {\r\n    fill: #e7298a !important;\r\n    stroke: #e7298a !important;\r\n}\r\n\r\n.hullPath {\r\n    fill: #fff;\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #252525;\r\n    stroke-opacity: 0.5;\r\n}\r\n\r\n.delaunayTriangulation {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n    stroke: #000;\r\n    stroke-opacity: 0.4;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n\r\n#background-color span.glyphicon {\r\n    opacity: 0;\r\n}\r\n\r\n#background-color .btn {\r\n    border-color: #bdbdbd;\r\n}\r\n\r\n#background-color .active span.glyphicon {\r\n    opacity: 1;\r\n}\r\n\r\n#btn-grey1 {\r\n    background: #d9d9d9;\r\n}\r\n\r\n#btn-grey2 {\r\n    background: #969696;\r\n}\r\n\r\n#btn-dark {\r\n    background: #4d4d4d;\r\n}\r\n\r\n/* Color brewer picker div */\r\n\r\n.palette {\r\n    cursor: pointer;\r\n    display: table;\r\n    vertical-align: bottom;\r\n    margin: 4px 0 4px 4px;\r\n    background: #fff;\r\n    border: solid 1px #aaa;\r\n}\r\n\r\n.swatch {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    width: 22px;\r\n    height: 22px;\r\n}\r\n\r\n.voronoi {\r\n    fill-opacity: 0;\r\n    stroke-width: 3;\r\n    stroke: #000;\r\n    stroke-opacity: 0.2;\r\n}\r\n\r\n.btn-circle {\r\n    width: 30px;\r\n    height: 30px;\r\n    text-align: center;\r\n    padding: 6px 0;\r\n    font-size: 12px;\r\n    line-height: 1.428571429;\r\n    border-radius: 15px;\r\n}\r\n\r\n.btn-circle.btn-lg {\r\n    width: 50px;\r\n    height: 50px;\r\n    padding: 13px 13px;\r\n    font-size: 18px;\r\n    line-height: 1.33;\r\n    border-radius: 25px;\r\n}\r\n\r\n/* Tooltip */\r\n\r\ndiv.tooltip {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    background: rgb(255, 255, 255) !important;\r\n    border-left-color: #1b809e !important;\r\n    border: 1px solid #eee;\r\n    border-left-width: 5px;\r\n    border-radius: 3px;\r\n    position: absolute;\r\n}\r\n\r\ndiv.tooltip table td:nth-child(2) {\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n\r\n.lineChartCheckBox.disabled {\r\n    color: #ccc;\r\n}\r\n\r\n.upperOuterArea, .lowerOuterArea {\r\n    stroke-width: 1;\r\n    fill: #74a9cf;\r\n    stroke: #3690c0;\r\n}\r\n\r\n.upperInnerArea, .lowerInnerArea {\r\n    stroke-width: 1;\r\n    fill: #045a8d;\r\n    stroke: #023858;\r\n}\r\n\r\n.medianLine {\r\n    fill: none;\r\n    stroke: #525252;\r\n    stroke-width: 5;\r\n}\r\n\r\n.selected {\r\n    background: #999;\r\n    border: 4px solid #4d4d4d;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    box-shadow: 1px 2px 4px rgba(0, 0, 0, .4);\r\n}\r\n\r\n.zoom {\r\n    fill: none;\r\n    pointer-events: all;\r\n}\r\n\r\n.x.axisLineChart>g>text {\r\n    font-size: 3em;\r\n    color: inherit;\r\n    font-family: inherit;\r\n    line-height: 1.1;\r\n}\r\n\r\n.arrow {\r\n    stroke-width: 1;\r\n}\r\n\r\n#centroid-line {\r\n    stroke-width: 1;\r\n    stroke: #e7298a;\r\n}\r\n\r\n#centroid-arrow {\r\n    fill: #e7298a;\r\n}\r\n\r\n.mod-list {\r\n    margin-top: -5px;\r\n    margin-right: -10px;\r\n    margin-left: -10px;\r\n}\r\n\r\n.mod-list .mod-head {\r\n    color: white;\r\n    border-bottom: thick solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 5px 5px 0 0;\r\n}\r\n\r\n.mod-list .mod-head span {\r\n    color: white;\r\n    font-size: 3em;\r\n    padding: 15px;\r\n    border: thick solid white;\r\n    border-radius: 50%;\r\n    margin-top: -60px;\r\n    background-color: #286090;\r\n}\r\n\r\n.mod-list .mod-head h2 {\r\n    margin-top: 7px;\r\n    margin-bottom: 5px;\r\n    font-size: 2em;\r\n    font-weight: 700;\r\n}\r\n\r\n.mod-list .t2 .mod-head {\r\n    background-color: #337ab7;\r\n}\r\n\r\n.mod-list .close {\r\n    font-size: 40px;\r\n}\r\n\r\n.modal-header {\r\n    border-bottom: 0px solid #e5e5e5;\r\n}\r\n\r\n.metadata-swatch {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 3px;\r\n    border: 2px solid #666;\r\n}\r\n\r\n.metadata-swatch-clickable:hover {\r\n    border: 2px solid #000;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n    min-width: 40px;\r\n    padding: 5px;\r\n}\r\n\r\n#metadata-input {\r\n    margin-top: 10px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    -moz-border-radius: 5px 5px 5px 5px;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border: 2px solid #000000;\r\n}\r\n\r\n.metadata-legend {\r\n    list-style: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n.metadata-legend li {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.metadata-legend span {\r\n    border: 2px solid #666;\r\n    float: left;\r\n    width: 30px;\r\n    height: 30px;\r\n}\r\n\r\n.metadata-legend .bl-avg {\r\n    background-color: #7fc97f;\r\n}\r\n\r\n.metadata-legend .avg {\r\n    background-color: #fdc086;\r\n}\r\n\r\n.metadata-legend .ab-avg {\r\n    background-color: #386cb0;\r\n}\r\n\r\n.networkEdges {\r\n    fill-opacity: 0;\r\n    stroke-width: 2;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 12 */
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
/* 13 */
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

var	fixUrls = __webpack_require__(14);

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
/* 14 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY2ZGQ1OTNlOWVkYzE3MWY2YTEiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvbmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL21ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3X2NvbG9yX3BpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2FqYXhfcXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2xpbmVfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3X2ludGVyYWN0aW9uLmpzIiwid2VicGFjazovLy8uL2V4cGxvcmUvc3BhdGlhbF92aWV3X2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9leHBsb3JlL2V4cGxvcmUuY3NzP2RlNGMiLCJ3ZWJwYWNrOi8vLy4vZXhwbG9yZS9leHBsb3JlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QUEyQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGdGQUEyQjtBQUNsRDtBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDJCQUEyQjtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdGQUEyQjtBQUN0RDtBQUNBLCtCQUErQixpQkFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0IsMkJBQTJCO0FBQzFEO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxnQkFBZ0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLDRCQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5akJBO0FBQUE7QUFDQTtBQUNBOztBQUtDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFBQTtBQUNBO0FBR0M7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpRkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsOEVBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJleHBsb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmY2ZGQ1OTNlOWVkYzE3MWY2YTEiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLGQzLCBwYXJhbWV0ZXJzLCBTZXQgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgKiBhcyBzZWxmIGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBuZXR3b3JrcyBmcm9tICcuL25ldHdvcmsuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGxpbmVDaGFydCxcclxuICAgIGdldExpbmVDaGFydFJhdGlvXHJcbn0gZnJvbSAnLi9saW5lX2NoYXJ0JztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBwZXJjZW50aWxlc1xyXG59IGZyb20gJy4vaGVscGVycy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgc2V0VGltZVNsaWRlcixcclxuICAgIGluaXRUb29sdGlwLFxyXG4gICAgdG9vbHRpcEZ1bmN0aW9uLFxyXG4gICAgaW5pdFNsaWRlcnNcclxufSBmcm9tICcuL3NwYXRpYWxfdmlld19pbnRlcmFjdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZ2V0TWV0YWRhdGFDb2xvclxyXG59IGZyb20gJy4vbWV0YWRhdGEuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRDb2xvclBpY2tlcixcclxuICAgIHJldHVybkNvbG9yU2NhbGVcclxufSBmcm9tICcuL3NwYXRpYWxfdmlld19jb2xvcl9waWNrZXIuanMnO1xyXG5cclxuXHJcblxyXG4vLyBHbG9iYWwgbmFtZXNwYWNlIHZhcmlhYmxlc1xyXG5sZXQgem9vbUZ1bmN0aW9uO1xyXG5sZXQgaW5kZXhUaW1lID0gMDtcclxuXHJcbmxldCBzdmdDb250YWluZXI7XHJcbmxldCB0YW5rO1xyXG5sZXQgdG9vbHRpcDsgLy8gdGhlIHRvb2x0aXBcclxubGV0IHBsYXlCb29sZWFuID0gdHJ1ZTsgLy8gcGF1c2UgYW5kIHBsYXkgYm9vbGVhblxyXG52YXIgYWN0aXZlU2NhbGUgPSAnYmxhY2snOyAvLyBubyBjb2xvciBzY2FsZXNcclxubGV0IHRhbmtXaWR0aDtcclxubGV0IHRhbmtIZWlnaHQ7XHJcbmxldCBtZWRvaWRBbmltYWwgPSAtMTtcclxubGV0IGFycmF5QW5pbWFscztcclxubGV0IGFjdGl2ZUFuaW1hbHMgPSBbXTsgLy8gYWN0aXZlIHNlbGVjdGVkIGFuaW1hbHNcclxuZXhwb3J0IGxldCBhbmltYWxfaWRzO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuYW1lc3BhY2UgdG8gbWluaW1pemUgZ2xvYmFsIHZhcmlhYmxlc1xyXG4gKiBDb2RlIGlzIGluIGEgY2xvc3VyZSBhbmQgbWFudWFsbHkgZXhwb3NlIG9ubHkgdGhvc2VcclxuICogdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBnbG9iYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3BhdGlhbFZpZXdJbml0KCkge1xyXG5cclxuXHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB2YXJpb3VzIGNvbXBvbmVudHM6XHJcbiAgICAgKiAgICAgIFNWRyBhbmQgQW5pbWFsIFRhbmtcclxuICAgICAqICAgICAgWm9vbVxyXG4gICAgICogICAgICBUb29sdGlwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgbWluUG9pbnQgPSBwYXJhbWV0ZXJzWydtaW4nXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgICAgICBsZXQgbWF4UG9pbnQgPSBwYXJhbWV0ZXJzWydtYXgnXVsnZ2VvbWV0cnknXVsnY29vcmRpbmF0ZXMnXTtcclxuICAgICAgICAvLyBsZXQgY29vcmRpbmF0ZU9yaWdpbiA9IHBhcmFtZXRlcnNbJ2Nvb3JkaW5hdGVfb3JpZ2luJ11bJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ107XHJcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAqMS4wMiAtLT4gc28gdGhlcmUgaXMgYSBtYXJnaW4gaW4gdGhlIHNwYXRpYWwgdmlldyB3aGVyZSBubyBhbmltYWwgaXMgZXZlclxyXG4gICAgICAgIHRhbmtXaWR0aCA9IChtYXhQb2ludFswXSAtIG1pblBvaW50WzBdKSAqIDEuMDI7XHJcbiAgICAgICAgdGFua0hlaWdodCA9IChtYXhQb2ludFsxXSAtIG1pblBvaW50WzFdKSAqIDEuMDI7XHJcblxyXG4gICAgICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNtYWluLXZpcycpLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAkKCcjbWFpbi12aXMtZGl2Jykud2lkdGgoKVxyXG4gICAgICAgICAgICAgICAgfSkuaGVpZ2h0KHRhbmtIZWlnaHQgKiAwLjUpXHJcbiAgICAgICAgICAgICAgICAud2lkdGgodGFua1dpZHRoICogMC41KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vcmVzZXQgYWxsIGNoZWNrYm94ZXNcclxuICAgICAgICAkKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIC8vc2V0IHRoZSBjb2xvciBzY2FsZSBmdW5jdGlvbiB0byBsaW5lYXJcclxuICAgICAgICAkKCcjY29sb3Itc2NhbGUtbGluZWFyJylcclxuICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAkKCcjZ3JvdXAtc2l6ZS1tJylcclxuICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAkKCcjYmFja2dyb3VuZC13aGl0ZScpXHJcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgJCgnI3NldHRpbmdzLWRpdiBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgLy9oaWRlIHRoZSBsb2FkaW5nIGdpZlxyXG4gICAgICAgICQoJyNsb2FkaW5nJylcclxuICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgLy8gbnVtYmVyIG9mIGRpc3RpbmN0IGFuaW1hbCBpZHNcclxuICAgICAgICBsZXQgbnVtX2FuaW1hbHMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YXNldFtpXVsndCddID09PSBzZWxmLmRhdGFzZXRbMF1bJ3QnXSkge1xyXG4gICAgICAgICAgICAgICAgbnVtX2FuaW1hbHMuYWRkKHNlbGYuZGF0YXNldFtpXVsnYSddKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGkgPSBzZWxmLmRhdGFzZXQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFuaW1hbF9pZHMgPSBBcnJheS5mcm9tKG51bV9hbmltYWxzKS5zb3J0KCk7XHJcblxyXG5cclxuICAgICAgICAvL1ggYW5kIFkgYXhpc1xyXG4gICAgICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW5Qb2ludFswXSwgbWF4UG9pbnRbMF1dKVxyXG4gICAgICAgICAgICAucmFuZ2UoW21pblBvaW50WzBdLCBtYXhQb2ludFswXV0pO1xyXG5cclxuICAgICAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgpXHJcbiAgICAgICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAgICAgLnRpY2tTaXplKDEwKVxyXG4gICAgICAgICAgICAudGlja1BhZGRpbmcoNSk7XHJcblxyXG4gICAgICAgIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW5Qb2ludFsxXSwgbWF4UG9pbnRbMV1dKVxyXG4gICAgICAgICAgICAucmFuZ2UoW21pblBvaW50WzFdLCBtYXhQb2ludFsxXV0pO1xyXG5cclxuICAgICAgICBsZXQgeUF4aXMgPSBkMy5heGlzUmlnaHQoeSlcclxuICAgICAgICAgICAgLnRpY2tzKDcpXHJcbiAgICAgICAgICAgIC50aWNrU2l6ZSgxMClcclxuICAgICAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgICAgICAvLyBaT09NSU5HIEFORCBQQU5OSU5HIFNUVUZGXHJcbiAgICAgICAgbGV0IHpvb21Hcm91cDtcclxuICAgICAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIDZdKVxyXG4gICAgICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc3RyYWluZWQgem9vbWluZ1xyXG4gICAgICAgICAgICAgICAgLy8gbW9kaWZ5IHRoZSB0cmFuc2xhdGUgc28gdGhhdCBpdCBuZXZlciBleGl0cyB0aGUgdGFua1xyXG4gICAgICAgICAgICAgICAgZDMuZXZlbnQudHJhbnNmb3JtLnggPSBNYXRoLm1pbigwLCB0YW5rV2lkdGggKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSwgTWF0aC5tYXgodGFua1dpZHRoICogKDEgLSBkMy5ldmVudC50cmFuc2Zvcm0uayksIGQzLmV2ZW50LnRyYW5zZm9ybS54KSk7XHJcbiAgICAgICAgICAgICAgICBkMy5ldmVudC50cmFuc2Zvcm0ueSA9IE1hdGgubWluKDAsIHRhbmtIZWlnaHQgKiAoZDMuZXZlbnQudHJhbnNmb3JtLmsgLSAxKSwgTWF0aC5tYXgodGFua0hlaWdodCAqICgxIC0gZDMuZXZlbnQudHJhbnNmb3JtLmspLCBkMy5ldmVudC50cmFuc2Zvcm0ueSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBhbmQgc2NhbGVcclxuICAgICAgICAgICAgICAgIHpvb21Hcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlc2NhbGUgdGhlIGF4aXNcclxuICAgICAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzLnNjYWxlKGQzLmV2ZW50LnRyYW5zZm9ybS5yZXNjYWxlWCh4KSkpO1xyXG4gICAgICAgICAgICAgICAgZ1lheGlzLmNhbGwoeUF4aXMuc2NhbGUoZDMuZXZlbnQudHJhbnNmb3JtLnJlc2NhbGVZKHkpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3RoZSBzdmcgY29udGFpbmVyXHJcbiAgICAgICAgc3ZnQ29udGFpbmVyID0gZDMuc2VsZWN0KCcjbWFpbi12aXMnKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXHJcbiAgICAgICAgICAgIC8vIHRvIG1ha2UgaXQgcmVzcG9uc2l2ZSB3aXRoIGNzc1xyXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcclxuICAgICAgICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB0YW5rV2lkdGggKyAnICcgKyB0YW5rSGVpZ2h0KVxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGNsYXNzIHN2Zy1jb250ZW50XHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzdmctY29udGVudCcsIHRydWUpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdtYWluLXZpcy1zdmcnKVxyXG4gICAgICAgICAgICAuY2FsbCh6b29tKTtcclxuXHJcblxyXG4gICAgICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvLCBmb3IgIDEyNDAvMTkwMCA9IDAuNjUgc28gcGFkZGluZy1ib3R0b20gPSA2NSUgKi9cclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguY2VpbCgodGFua0hlaWdodCAvIHRhbmtXaWR0aCkgKiAxMDApO1xyXG4gICAgICAgICQoJyNtYWluLXZpcycpLmFwcGVuZCgkKCc8c3R5bGU+I21haW4tdmlzOjphZnRlciB7cGFkZGluZy10b3A6ICcgKyBwZXJjZW50YWdlICsgJyU7ZGlzcGxheTogYmxvY2s7Y29udGVudDogXCJcIjt9PC9zdHlsZT4gJykpO1xyXG5cclxuICAgICAgICB6b29tR3JvdXAgPSBzdmdDb250YWluZXIuYXBwZW5kKCdzdmc6ZycpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1ldGVycy5iYWNrZ3JvdW5kX2ltYWdlKSB7XHJcbiAgICAgICAgICAgIHpvb21Hcm91cFxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLy8gIC5hdHRyKCdkJyxwYXRoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCAnLycgKyBwYXJhbWV0ZXJzLmJhY2tncm91bmRfaW1hZ2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFja2dyb3VuZEltYWdlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0YW5rSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGFua1dpZHRoKVxyXG4gICAgICAgICAgICAgICAgLy8gd2hpbGUgYWRkaW5nIGFuIGltYWdlIHRvIGFuIHN2ZyB0aGVzZSBhcmUgdGhlIGNvb3JkaW5hdGVzIGkgdGhpbmsgb2YgdGhlIHRvcCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsICcwJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgJzAnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2JhY2tncm91bmQnLCAnI2ZmZicpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSB0YW5rIGdyb3VwIHdpdGggYSB0cmFuc2Zvcm1hdGlvbiB3aGljaCByb3RhdGVzIHRoZSB5IGF4aXNcclxuICAgICAgICB0YW5rID0gem9vbUdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGFuaycpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gMTtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmludmVydGVkX3gpIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1ldGVycy5pbnZlcnRlZF95KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzY2FsZSgnICsgeCArICcsJyArIHkgKyAnKSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2FkZCB0aGUgY2VudHJvaWRcclxuICAgICAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdnLWNlbnRyb2lkJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NlbnRyb2lkIGhpZGRlbicpXHJcbiAgICAgICAgICAgIC5hdHRyKCdyJywgNilcclxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgMCk7XHJcblxyXG4gICAgICAgIC8vIGFycm93IGZvciB0aGUgY2VudHJvaWQgZGlyZWN0aW9uXHJcbiAgICAgICAgdGFuay5zZWxlY3QoJyNnLWNlbnRyb2lkJylcclxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NlbnRyb2lkLWFycm93JylcclxuICAgICAgICAgICAgLmF0dHIoJ3JlZlgnLCAyKVxyXG4gICAgICAgICAgICAuYXR0cigncmVmWScsIDYpXHJcbiAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgMTMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTIsMiBMMiwxMSBMMTAsNiBMMiwyJyk7XHJcblxyXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgbGluZSBmb3IgdGhlIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgIHRhbmsuc2VsZWN0KCcjZy1jZW50cm9pZCcpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCdtYXJrZXItZW5kJywgJ3VybCgjY2VudHJvaWQtYXJyb3cpJyk7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIG5ldHdvcmsgIGdyb3VwXHJcbiAgICAgICAgdGFuay5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnbmV0d29ya0dyb3VwJyk7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIGRlbGF1bmF5VHJpYW5ndWxhdGlvbiBncm91cFxyXG4gICAgICAgIHRhbmsuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2RlbGF1bmF5VHJpYW5ndWxhdGlvbkdyb3VwJyk7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHZvcm9ub2kgZ3JvdXBcclxuICAgICAgICB0YW5rLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICd2b3Jub2lHcm91cCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHRoZSBmcmFtZSB0aW1lIHRleHRcclxuICAgICAgICBzdmdDb250YWluZXIuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZyYW1lVGV4dCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMzApXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMzApXHJcbiAgICAgICAgICAgIC50ZXh0KCctLSA6IC0tIDogLS0gJyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgYXhpc1xyXG4gICAgICAgIGxldCBnWGF4aXMgPSBzdmdDb250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXHJcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGdZYXhpcyA9IHN2Z0NvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcclxuICAgICAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG5cclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBpbml0VG9vbHRpcCgpO1xyXG4gICAgICAgIGluaXRTbGlkZXJzKCk7XHJcblxyXG4gICAgICAgIC8vZGVmaW50ZSB0aGUgbGluZSBjaGFydCB0aW1lIHNjYWxlXHJcbiAgICAgICAgem9vbUZ1bmN0aW9uID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFswLCBzZWxmLmdldFN3YXJtRGF0YSgpLmxlbmd0aF0pXHJcbiAgICAgICAgICAgIC5yYW5nZShbMCwgc2VsZi5nZXRTd2FybURhdGEoKS5sZW5ndGhdKTtcclxuXHJcbiAgICAgICAgaW5pdENvbG9yUGlja2VyKCk7XHJcblxyXG4gICAgICAgIC8vRHJhdyB0aGUgZmlzaCBzd2FybSBsaW5lIGNoYXJ0XHJcbiAgICAgICAgbGluZUNoYXJ0KCk7XHJcblxyXG4gICAgICAgIGRyYXcoKTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogRHJhd2luZyBmdW5jdGlvbiAtIGlzIGNhbGxlZCBmb3IgZWFjaCB0aW1lc3RlcFxyXG4gKiBpbmRleFRpbWUgc2F2ZXMgdGhlIGN1cnJlbnQgdGltZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoKSB7XHJcbiAgICAvL21lYXN1cmUgZXhlY3V0aW9uIHRpbWUgb2YgZnVuY3Rpb24gZHJhd1xyXG4gICAgLy8gbGV0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgLy91cGRhdGUgdGltZSB0byB3YWl0IGFrYSBzcGVlZCBvZiByZXBsYXlcclxuICAgIGxldCB0aW1lVG9XYWl0ID0gJCgnaW5wdXRbbmFtZT1ncm91cDFdOmNoZWNrZWQnLCAnI2dyb3VwMScpXHJcbiAgICAgICAgLnZhbCgpO1xyXG4gICAgLy9zY2FsZSB0aGUgc2l6ZSBieSB0aGlzIG51bWJlclxyXG4gICAgbGV0IGFuaW1hbFNjYWxlID0gJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLmdyb3VwLXNpemU6Y2hlY2tlZCcpXHJcbiAgICAgICAgLnZhbCgpO1xyXG5cclxuICAgIC8vZ2V0IHRoZSBuZXh0IGFuaW1hbHNcclxuICAgIGFycmF5QW5pbWFscyA9IHNlbGYuZGF0YXNldC5zbGljZShhbmltYWxfaWRzLmxlbmd0aCAqIGluZGV4VGltZSwgYW5pbWFsX2lkcy5sZW5ndGggKiBpbmRleFRpbWUgKyBhbmltYWxfaWRzLmxlbmd0aCk7XHJcblxyXG4gICAgLy90aGUgdGltZW91dCBpcyBzZXQgYWZ0ZXIgb25lIHVwZGF0ZSAzMCBtc1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIHRpbWUgZnJhbWUgdGV4dFxyXG4gICAgICAgICAgICBzdmdDb250YWluZXIuc2VsZWN0KCcuZnJhbWVUZXh0JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gMTUwMCkgJSA2MCArICc6JyArIE1hdGguZmxvb3IoaW5kZXhUaW1lIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgaW5kZXhUaW1lICUgcGFyYW1ldGVyc1snZnBzJ10pO1xyXG4gICAgICAgICAgICAvLyBpZiBhIHNlY29uZCBoYXMgY2hhbmdlZCBtb3ZlIHRoZSBzbGlkZXJcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSAlIHBhcmFtZXRlcnNbJ2ZwcyddID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lU2xpZGVyKGluZGV4VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdmdBbmltYWxzID0gdGFuay5zZWxlY3RBbGwoJ2cuYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGFycmF5QW5pbWFscyk7XHJcblxyXG4gICAgICAgICAgICAvLyBOZXR3b3JrIHZpc1xyXG4gICAgICAgICAgICBsZXQgbmV0d29ya1ZpcztcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSBpbiBzZWxmLm5ldHdvcmtEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29yayA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IHNlbGYubmV0d29ya0RhdGFbaW5kZXhUaW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXlBbmltYWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9kZTEnOiBhcnJheUFuaW1hbHNbaV1bJ2EnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub2RlMic6IGFycmF5QW5pbWFsc1tqXVsnYSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0JzogYXJyYXlBbmltYWxzW2ldWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogYXJyYXlBbmltYWxzW2pdWydwJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsJzogdG1wW3RtcF9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcF9pbmRleCA9IHRtcF9pbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV0d29yay5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCgnI21jLScgKyBkWydub2RlMSddICsgJy0nICsgZFsnbm9kZTInXSkpLmNzcygnZmlsbCcsIG5ldHdvcmtzLm5ldHdvcmtDb2xvclNjYWxlKGRbJ3ZhbCddKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgoJyNtYy0nICsgZFsnbm9kZTInXSArICctJyArIGRbJ25vZGUxJ10pKS5jc3MoJ2ZpbGwnLCBuZXR3b3Jrcy5uZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtzLmdldE5ldHdvcmtBdXRvKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ldHdvcmsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyYXkucHVzaChuZXR3b3JrW2ldWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtzLnNldE5ldHdvckxpbWl0KHBlcmNlbnRpbGVzKHRtcEFycmF5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV0d29yayA9IG5ldHdvcmsuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsndmFsJ10gPj0gbmV0d29ya3MuZ2V0TmV0d29yTGltaXQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gREFUQSBKT0lOXHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrVmlzID0gdGFuay5zZWxlY3QoJyNuZXR3b3JrR3JvdXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpbmUubmV0d29ya0VkZ2VzJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShuZXR3b3JrKTtcclxuICAgICAgICAgICAgICAgIC8vIFVQREFURVxyXG4gICAgICAgICAgICAgICAgbmV0d29ya1Zpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3Jrcy5uZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vRU5URVJcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXNcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICduZXR3b3JrRWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3N0YXJ0J11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsnc3RhcnQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkWydlbmQnXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLWRbJ2VuZCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXR3b3Jrcy5uZXR3b3JrQ29sb3JTY2FsZShkWyd2YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkWyd2YWwnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ldHdvcmtWaXMgPSB0YW5rLnNlbGVjdEFsbCgnbGluZS5uZXR3b3JrRWRnZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFWElUIC0gbmV0d29ya1xyXG4gICAgICAgICAgICBuZXR3b3JrVmlzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsYXVuYXkgdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAvLyBEQVRBIEpPSU4gIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICB2YXIgdHJpYW5ndWxhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCQoJyNkcmF3LXRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uID0gdGFuay5zZWxlY3QoJyNkZWxhdW5heVRyaWFuZ3VsYXRpb25Hcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC5kZWxhdW5heVRyaWFuZ3VsYXRpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzZWxmLmdldFN3YXJtRGF0YSgpW2luZGV4VGltZV1bJ3RyaWFuZ3VsYXRpb24nXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgIHRyaWFuZ3VsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0VOVEVSIC0gdHJpYW5ndWxhdGlvblxyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbi5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvbiA9IHRhbmsuc2VsZWN0QWxsKCdwYXRoLmRlbGF1bmF5VHJpYW5ndWxhdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVYSVQgLSB0cmlhbmd1bGF0aW9uXHJcbiAgICAgICAgICAgIHRyaWFuZ3VsYXRpb24uZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBWb3Jvbm9pXHJcbiAgICAgICAgICAgIC8vIERBVEEgSk9JTiAgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgIHZhciB2b3Jvbm9pO1xyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctdm9yb25vaScpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vYXBwZW5kIHRoZSBncm91cCBmb3IgdGhlIHZvcm9ub2kgcGF0aHNcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kgPSB0YW5rXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI3Zvcm5vaUdyb3VwJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnZvcm9ub2knKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKHNlbGYuZ2V0U3dhcm1EYXRhKClbaW5kZXhUaW1lXVsndm9yb25vaSddLnNwbGl0KCc7JykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgLSB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9FTlRFUiAtIHZvcm9ub2lcclxuICAgICAgICAgICAgICAgIHZvcm9ub2kuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2b3Jvbm9pID0gdGFuay5zZWxlY3QoJyN2b3Jub2lHcm91cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC52b3Jvbm9pJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIHZvcm9ub2lcclxuICAgICAgICAgICAgdm9yb25vaS5leGl0KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL0VOVEVSIC0gYXBwZW5kIHRoZSBhbmltYWwgZ3JvdXBzXHJcbiAgICAgICAgICAgIGxldCBhbmltYWxHcm91cGluZ3MgPSBzdmdBbmltYWxzXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYW5pbWFsJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FuaW1hbC0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIGNpcmNsZXMgZm9yIGVhY2ggYW5pbWFsIHRvIHRoZSBhbmltYWxncm91cFxyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCAxLjUgKiBhbmltYWxTY2FsZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFsncCddWzBdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWRbJ3AnXVsxXTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRnVuY3Rpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgb24gY2xpY2sgZm9yIHRoZSBhY3RpdmUgZmlzaHNcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuaW1hbHMuaW5jbHVkZXMoZFsnYSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBbmltYWxzID0gYWN0aXZlQW5pbWFscy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuaW1hbHMucHVzaChkWydhJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJyNwbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIGFwcGx5cyB0aGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRpbWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVVBEQVRFIC0gYW5pbWFscyBjaXJjbGVzXHJcbiAgICAgICAgICAgIHN2Z0FuaW1hbHMuc2VsZWN0KCdjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkWydwJ11bMF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtZFsncCddWzFdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYW5pbWFsU2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGZvciBlYWNoIGdyb3VwIHRoZSBhcnJvdywgbmVlZGVkIGZvciBjb2xvcmluZ1xyXG4gICAgICAgICAgICBhbmltYWxHcm91cGluZ3MuYXBwZW5kKCdzdmc6ZGVmcycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fycm93LW1hcmtlci0nICsgZFsnYSddO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZYJywgMilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyZWZZJywgNilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDEzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgJ00yLDIgTDIsMTEgTDEwLDYgTDIsMicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBsaW5lIGZvciB0aGUgZGlyZWN0aW9uIGFycm93XHJcbiAgICAgICAgICAgIGFuaW1hbEdyb3VwaW5nc1xyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ21hcmtlci1lbmQnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoI2Fycm93LW1hcmtlci0nICsgZFsnYSddICsgJyknO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2V4ZWN1dGUgb25seSB3aGVuIGRyYXcgZGlyZWN0aW9uIGJ1dHRvbiBpcyBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVUERBVEUgYW5pbWFsIGRpcmVjdGlvbiBhcnJvd1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFscy5zZWxlY3QoJ2xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRbJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1kWydwJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZFsncCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgtZFsncCddWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAtZFsnZGlyZWN0aW9uJ10gKyAnICcgKyBkWydwJ11bMF0gKyAnICcgKyAtZFsncCddWzFdICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBzdmdBbmltYWxzLnNlbGVjdCgnbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93IGhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFWElUIC0gdGhlIGdyb3Vwc1xyXG4gICAgICAgICAgICBzdmdBbmltYWxzLmV4aXQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9Db252ZXggaHVsbFxyXG4gICAgICAgICAgICBpZiAoJCgnI2RyYXctY29udmV4LWh1bGwnKVxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEQVRBIEpPSU4gLSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgdmFyIGh1bGxQYXRoID0gdGFuay5zZWxlY3RBbGwoJ3BhdGguaHVsbFBhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFtzZWxmLmdldFN3YXJtRGF0YSgpW2luZGV4VGltZV1bJ2h1bGwnXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVQREFURSAtIGh1bGwgcGF0aFxyXG4gICAgICAgICAgICAgICAgaHVsbFBhdGhcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRU5URVIgLSBodWxsIHBhdGhzXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2h1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBubyBodWxsXHJcbiAgICAgICAgICAgICAgICBodWxsUGF0aCA9IHRhbmsuc2VsZWN0KCdwYXRoLmh1bGxQYXRoJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRVhJVCAtIGh1bGwgcGF0aHNcclxuICAgICAgICAgICAgaHVsbFBhdGguZXhpdCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY29sb3JzIG9mIHRoZSBmaXNoXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTY2FsZSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgICAgICAgICAgLy8gb25jZSB0aGUgZmlsbCBmb3IgdGhlIGhlYWRzIGFuZCB0aGUgc3Ryb2tlIGZvciB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNjYWxlID0gcmV0dXJuQ29sb3JTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wU2NhbGUoZFthY3RpdmVTY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcFNjYWxlKGRbYWN0aXZlU2NhbGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgZXZlcnkgZmlzaCBibGFja1xyXG4gICAgICAgICAgICAgICAgc3ZnQW5pbWFsc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICcjMDAwJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChnZXRNZXRhZGF0YUNvbG9yKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZ2V0TWV0YWRhdGFDb2xvcigpKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2FuaW1hbC0nICsga2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZ2V0TWV0YWRhdGFDb2xvcigpW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZ2V0TWV0YWRhdGFDb2xvcigpW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jaGFuZ2Ugb3BhY3RpeSBpZiB0aGUgZmlzaCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQW5pbWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBbmltYWxzLmluY2x1ZGVzKGRbJ2EnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWFjdGl2ZS1zZWxlY3RlZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtYWN0aXZlLXNlbGVjdGVkLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHN2Z0FuaW1hbHNcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGNlbnRyb2lkXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmNlbnRyb2lkJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHNlbGYuc3dhcm1EYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmdldFN3YXJtRGF0YSgpW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2VudHJvaWQnIGluIHNlbGYuZ2V0U3dhcm1EYXRhKClbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1zZWxmLmdldFN3YXJtRGF0YSgpW2luZGV4VGltZV1bJ2NlbnRyb2lkJ11bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICgkKCcjZHJhdy1kaXJlY3Rpb24nKS5pcygnOmNoZWNrZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdLmNlbnRyb2lkICYmXHJcbiAgICAgICAgICAgICAgICAkKCcjZHJhdy1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNjZW50cm9pZC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gVVBEQVRFIGFuaW1hbCBkaXJlY3Rpb24gYXJyb3dcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2NlbnRyb2lkLWxpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdWydjZW50cm9pZCddWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgMiAqIGFuaW1hbFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXNlbGYuZ2V0U3dhcm1EYXRhKClbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1zZWxmLmdldFN3YXJtRGF0YSgpW2luZGV4VGltZV1bJ2RpcmVjdGlvbiddICsgJyAnICsgc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdWydjZW50cm9pZCddWzBdICsgJyAnICsgLXNlbGYuZ2V0U3dhcm1EYXRhKClbaW5kZXhUaW1lXVsnY2VudHJvaWQnXVsxXSArICcpJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFycm93c1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY2VudHJvaWQtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gbWVkb2lkXHJcbiAgICAgICAgICAgIGlmIChtZWRvaWRBbmltYWwgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJyNhbmltYWwtJyArIG1lZG9pZEFuaW1hbClcclxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbWVkb2lkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbWVkb2lkQW5pbWFsID0gc2VsZi5nZXRTd2FybURhdGEoKVtpbmRleFRpbWVdWydtZWRvaWQnXTtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnI2FuaW1hbC0nICsgbWVkb2lkQW5pbWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdtZWRvaWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9uZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIGluZGV4VGltZSsrO1xyXG5cclxuICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJykgJiYgc2VsZi5nZXRTd2FybURhdGEoKVtNYXRoLmNlaWwoaW5kZXhUaW1lIC8gZ2V0TGluZUNoYXJ0UmF0aW8oKSldKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gTWF0aC5jZWlsKGluZGV4VGltZSAvIGdldExpbmVDaGFydFJhdGlvKCkpO1xyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGxpbmUgY2hhcnQgbGVnZW5kIHRleHQgdmFsdWVzIHBlciBzZWNvbmRcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleFRpbWUgJSAyNSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gY2hhbmdlIHRoaXMgdG8gYSBtb3JlIG1vZHVsYXIgd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjY29udmV4X2h1bGxfYXJlYUxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KChzZWxmLmdldFN3YXJtRGF0YSgpW3RtcF1bJ2NvbnZleF9odWxsX2FyZWEnXSkgKyAnbW3CsicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI3NwZWVkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5nZXRTd2FybURhdGEoKVt0bXBdWydzcGVlZCddICsgJ21tL3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNhY2NlbGVyYXRpb25MaW5lVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChzZWxmLmdldFN3YXJtRGF0YSgpW3RtcF1bJ2FjY2VsZXJhdGlvbiddICsgJ21tL3PCsicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2Rpc3RhbmNlX2NlbnRyb2lkTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5nZXRTd2FybURhdGEoKVt0bXBdWydkaXN0YW5jZV9jZW50cm9pZCddICsgJ21tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZGlyZWN0aW9uTGluZVZhbHVlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoc2VsZi5nZXRTd2FybURhdGEoKVt0bXBdWydkaXJlY3Rpb24nXSArICfCsCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI3BvbGFyaXNhdGlvbkxpbmVWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHNlbGYuZ2V0U3dhcm1EYXRhKClbdG1wXVsncG9sYXJpc2F0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2xpbmVDaGFydFRpbWVMaW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgem9vbUZ1bmN0aW9uKHRtcCkgKyAnLDApJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXkgYnV0dG9uIGlzIGFjdGl2ZSBhbmQgaWYgdGhlIGFuaW1hdGlvbiBpcyBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKGluZGV4VGltZSA+PSBzZWxmLmdldFN3YXJtRGF0YSgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9zdGFydCBhZ2FpbiBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5Qm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgLy9tZWFzdXJlIGV4ZWN1dGlvbiB0aW1lXHJcbiAgICAgICAgICAgICAgICAvLyAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0MSAtIHQwKTsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICBkcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWVUb1dhaXQpO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5Qm9vbGVhbigpIHtcclxuICAgIHJldHVybiBwbGF5Qm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlCb29sZWFuKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwbGF5Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5kZXhUaW1lKCkge1xyXG4gICAgcmV0dXJuIGluZGV4VGltZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluZGV4VGltZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKGluZGV4VGltZSA8PSBzZWxmLmdldFN3YXJtRGF0YSgpLmxlbmd0aCkpIHtcclxuICAgICAgICBpbmRleFRpbWUgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaW1lID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFpvb21GdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB6b29tRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRab29tRnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHpvb21GdW5jdGlvbiA9IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFua1dpZHRoKCkge1xyXG4gICAgcmV0dXJuIHRhbmtXaWR0aDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhbmtIZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGFua0hlaWdodDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVNjYWxlKCkge1xyXG4gICAgcmV0dXJuIGFjdGl2ZVNjYWxlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2NhbGUodmFsdWUpIHtcclxuICAgIGFjdGl2ZVNjYWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZWRvaWRBbmltYWwoKSB7XHJcbiAgICByZXR1cm4gbWVkb2lkQW5pbWFsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWVkb2lkQW5pbWFsKHZhbHVlKSB7XHJcbiAgICBtZWRvaWRBbmltYWwgPSB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZUFuaW1hbHMoKSB7XHJcbiAgICByZXR1cm4gYWN0aXZlQW5pbWFscztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZUFuaW1hbHModmFsdWUpIHtcclxuICAgIGFjdGl2ZUFuaW1hbHMgPSB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFycmF5QW5pbWFscygpIHtcclxuICAgIHJldHVybiBhcnJheUFuaW1hbHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBcnJheUFuaW1hbHModmFsdWUpIHtcclxuICAgIGFycmF5QW5pbWFscyA9IHZhbHVlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCAqL1xyXG4vLyBpbXBvcnQgYWxsIGpzXHJcbmltcG9ydCAqIGFzIHF1ZXJpZXMgZnJvbSAnLi9hamF4X3F1ZXJpZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gICAgc3BhdGlhbFZpZXdJbml0XHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGFcclxufSBmcm9tICcuL21ldGFkYXRhLmpzJztcclxuXHJcbi8vIGltcG9ydCBjc3NcclxuaW1wb3J0ICcuL2V4cGxvcmUuY3NzJztcclxuXHJcbmV4cG9ydCBsZXQgZGF0YXNldCA9IFtdO1xyXG5leHBvcnQgbGV0IGRhdGFzZXRNZXRhZGF0YSA9IFtdO1xyXG5leHBvcnQgbGV0IHN3YXJtRGF0YSA9IFtdO1xyXG5leHBvcnQgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0ge307XHJcbmV4cG9ydCBsZXQgem9vbUZ1bmN0aW9uO1xyXG5leHBvcnQgbGV0IG5ldHdvcmtEYXRhID0ge307XHJcblxyXG5cclxuLyoqXHJcbiAqIExvYWQgdGhlIG1vdmVtZW50IGRhdGEgd2l0aCBhamF4IHF1ZXJpZXNcclxuICogQWZ0ZXJ3YXJkcyBpZiBhbGwgYWpheCBxdWVyaWVzIGFyZSBmaW5pc2hlZFxyXG4gKiBkcmF3IHRoZSBncm91cCB2aWV3XHJcbiAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbW92ZW1lbnQgZGF0YVxyXG4gICAgcXVlcmllcy5zdHJlYW1Nb3ZlbWVudERhdGEoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGRhdGFTZXRQZXJjZW50aWxlXHJcbiAgICBxdWVyaWVzLmdldFBlcmNlbnRpbGUoKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIHN3YXJtIGZlYXR1cmVzIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgcXVlcmllcy5nZXRTd2FybUZlYXR1cmVzKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBtZXRhZGF0YSBhbmQgaW5pdGlhbGl6ZSB0aGUgbWV0YWRhIHdpbmRvd1xyXG4gICAgcXVlcmllcy5nZXRNZXRhRGF0YSgpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgaW5mb3JtYXRpb24gaWYgdGhlcmUgYXJlIGFscmVhZHkgbmV0d29ya3MgY3JlYXRlZCBmb3IgdGhpcyBkYXN0YXNldFxyXG4gICAgcXVlcmllcy5nZXROZXR3b3JrRGF0YSgpO1xyXG5cclxuICAgIC8vIGlmIGFsbCBhamF4IHF1ZXJpZXMgYXJlIGNvbXBlbHRlIGluaXRpYWxpemVcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBjaGVja1BlbmRpbmdSZXF1ZXN0KCkge1xyXG4gICAgICAgICAgICBpZiAoJC5hY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja1BlbmRpbmdSZXF1ZXN0LCAxMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BhdGlhbFZpZXdJbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2hlY2tQZW5kaW5nUmVxdWVzdCwgMTAwKTtcclxuICAgIH0pKCk7XHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENvbmNhY3QgdG8gdGhlIGRhdGFzZXRcclxuICogdGhlIGlkZWEgaXMgdG8gdXNlIHRoaXMgb25lIGRheSBmb3IgbGF6eSBsb2FkaW5nXHJcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlIC1hcnJheSBvZiBtb3ZlbWVudCBkYXRhc2V0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0YXNldCh2YWx1ZSkge1xyXG4gICAgZGF0YXNldCA9IGRhdGFzZXQuY29uY2F0KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBkYXRhc2V0IHBlcmNlbnRpbGVcclxuICogQHBhcmFtIHthcnJheX0gdmFsdWUgLSBhcnJheSBvZiBhcnJhcnlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVNldFBlcmNlbnRpbGUodmFsdWUpIHtcclxuICAgIGRhdGFTZXRQZXJjZW50aWxlID0gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgZGF0YXNldCBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZSAtIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWV0YURhdGEodmFsdWUpIHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YSA9IHZhbHVlO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGEgbW9kYWxcclxuICAgIGluaXRpYWxpemVNZXRhZGRhdGEoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTd2FybURhdGEoKSB7XHJcbiAgICByZXR1cm4gc3dhcm1EYXRhO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGZlYXR1cmUgZGltZW5zaW9uIHRvIHRoZSBzd2FybSBkYXRhc2V0XHJcbiAqIG1ha2VzIHRoaXMgbW9kdWxhclxyXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhIC0gQXJyYXkgb2Ygc3dhcm0gdmFsdWVzIGNvbnNpc3Rpbmcgb2YgW3t0aW1lOi4uLCBmZWF0dXJlOi4ufSx7Li4ufS4uLl1cclxuICogQHBhcmFtIHtzdHJpbmd9IGZlYXR1cmUgLSBzdHJpbmcgYXJyYXkgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTd2FybURhdGEoZGF0YSwgZmVhdHVyZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2FybURhdGFbaV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN3YXJtRGF0YS5wdXNoKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dhcm1EYXRhW2ldW2ZlYXR1cmVdID0gK2RhdGFbaV07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL2V4cGxvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsIHdpbmRvdywgJCwgZDMgKi9cclxuXHJcblxyXG5sZXQgbmV0d29ya0F1dG8gPSBmYWxzZTsgLy8gaWYgdHJ1ZSB0aGUgbmV0d29yayBlZGdlIGxpbWl0IGlzIGF1dG9tYXRpY2FsbHkgc3VnZ2VzdGVkXHJcbmxldCBuZXR3b3JrTGltaXQgPSAwO1xyXG4vLyBmaXhlZCBjb2xvciBzY2FsZSBmb3IgdGhlIG5ldHdvcmtcclxuXHJcbmV4cG9ydCBsZXQgbmV0d29ya0NvbG9yU2NhbGUgPSBkMy5zY2FsZVRocmVzaG9sZCgpXHJcbiAgICAuZG9tYWluKFxyXG4gICAgICAgIFswLCAuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjgsIC45LCAxXVxyXG4gICAgKVxyXG4gICAgLnJhbmdlKFsnI2ZmZmZmZicsICcjZGZkZmRmJywgJyNjMGMwYzAnLCAnI2EzYTNhMycsICcjODU4NTg1JywgJyM2OTY5NjknLCAnIzRlNGU0ZScsICcjMzUzNTM1JywgJyMxZDFkMWQnLCAnIzAwMDAwMCddKTtcclxuXHJcblxyXG4vKipcclxuICogQWRkIHRoZSBuZXR3b3JrIHNlbGVjdCBidXR0b25zIHRvIHRoZSB3ZWJpbnRlcmZhY2VcclxuICogQHBhcmFtIHthcnJheX0gZGF0YSAtIEFycmF5IG9mIG5ldHdvcmsgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ldHdvcmtCdXR0b25zKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXVsnZmluaXNoZWQnXSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI25ldHdvcmtzLW1vZGFsLWJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1sZyBidG4tYmxvY2tcIiBkYXRhPScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduZXR3b3JrX2lkJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldWyduYW1lJ10gKyAnPC9idXR0b24+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNuZXR3b3Jrcy1tb2RhbC1ib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbmV0d29yayBkYXRhIGZvciB0aGlzIGRhdGFzZXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV0d29ya0F1dG8oKSB7XHJcbiAgICByZXR1cm4gbmV0d29ya0F1dG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXR3b3JrQXV0byh2YWx1ZSkge1xyXG4gICAgbmV0d29ya0F1dG8gPSB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvckxpbWl0KCkge1xyXG4gICAgcmV0dXJuIG5ldHdvcmtMaW1pdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE5ldHdvckxpbWl0KHZhbHVlKSB7XHJcbiAgICBuZXR3b3JrTGltaXQgPSB2YWx1ZTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbmV0d29yay5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCAqL1xyXG4vLyBpbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGRhdGFzZXRNZXRhZGF0YVxyXG59IGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5cclxubGV0IG1ldGFkYXRhQ29sb3IgPSB7fTsgLy8gc2F2ZSB0aGUgbWV0YWRhdGEgY29sb3JpbmdcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU1ldGFkZGF0YSgpIHtcclxuICAgIGxldCBjb2xvcnMgPSBbJyNmZmYnLCAnI2U0MWExYycsICcjMzc3ZWI4JywgJyM0ZGFmNGEnLCAnIzk4NGVhMycsICcjZmY3ZjAwJywgJyNmZmZmMzMnLCAnI2E2NTYyOCddO1xyXG4gICAgLy8gYWRkIHRoZSBkYXRhIHRvIHRoZSBtZXRhZGF0YSBtb2RhbFxyXG4gICAgaWYgKGRhdGFzZXRNZXRhZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgJCgnI21ldGFkYXRhLXRhYmxlJykuZmluZCgndGJvZHknKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dHIgaWQ9XCJtZXRhZGF0YS1yb3ctJyArIGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10gKyAnXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzcGVjaWVzJ10pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoZGF0YXNldE1ldGFkYXRhW2ldWydzZXgnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3NpemUnXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChkYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdCBidG4tY29sb3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2aWV3XCIgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3ItZmllbGRcIiB2YWx1ZT1cIldoaXRlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgKz0gJzxkaXYgY2xhc3M9XCJtZXRhZGF0YS1zd2F0Y2ggbWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY29sb3JzW2ldICsgJ1wiIHZhbHVlPVwiJyArIGlkICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGRhdGFzZXRNZXRhZGF0YVtpXVsnYW5pbWFsX2lkJ10pICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNtZXRhZGF0YS10YWJsZScpLmZpbmQoJ3Rib2R5JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnVGhlcmUgaXMgbm8gbWV0YWRhdGEgZm9yIHRoaXMgZGF0YXNldCcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNpemUgYW5kIHdlaWdodCBjb2xvcmluZyBmb3IgdGhlIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNZXRhZGF0YSgpIHtcclxuICAgIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCk7XHJcbiAgICAvLyBnZXQgdGhlIGlucHV0IHZhbHVlc1xyXG4gICAgbGV0IHZhbHVlID0gJCgnI2dyb3VwLW1ldGFkYXRhIC5idG4uYnRuLWRlZmF1bHQuYWN0aXZlIGlucHV0JylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGxldCBibEF2ZyA9ICQoJyNibC1hdmcnKS52YWwoKTtcclxuICAgIGxldCBhYkF2ZyA9ICQoJyNhYi1hdmcnKS52YWwoKTtcclxuICAgIC8vIGNvbG9yIHNjaGVtZSBmb3IgdGhlIGlucHV0c1xyXG4gICAgbGV0IGNvbG9ycyA9IFsnIzdmYzk3ZicsICcjZmRjMDg2JywgJyMzODZjYjAnXTtcclxuICAgIC8vIGNvbG9yIHRoZSBhbmltYWxzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuZGF0YXNldE1ldGFkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA8IGJsQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3Jbc2VsZi5kYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYuZGF0YXNldE1ldGFkYXRhW2ldW3ZhbHVlXSA+IGFiQXZnKSB7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhQ29sb3Jbc2VsZi5kYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddXSA9IGNvbG9yc1syXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YUNvbG9yW3NlbGYuZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXV0gPSBjb2xvcnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1ldGFkYXRhIHJlc2V0IGFsbCBpbmRpdmlkdWFsIG1ldGFkYXRhIGlucHV0IGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0SW5kaXZpZHVhbE1ldGFkYXRhKCkge1xyXG4gICAgbWV0YWRhdGFDb2xvciA9IHt9O1xyXG4gICAgJCgnLmRyb3Bkb3duICNwcmV2aWV3JylcclxuICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhZGF0YUNvbG9yKCkge1xyXG4gICAgcmV0dXJuIG1ldGFkYXRhQ29sb3I7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBsb3JlL21ldGFkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBjb2xvcmJyZXdlciovXHJcbmltcG9ydCAqIGFzIHNwdiBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY2hhbmdlTGVnZW5kXHJcbn0gZnJvbSAnLi9zcGF0aWFsX3ZpZXdfbGVnZW5kLmpzJztcclxuXHJcblxyXG5sZXQgY29sb3JTY2FsZSA9IHtcclxuICAgIHR5cGU6ICdMaW5lYXInLFxyXG4gICAgY29sb3I6IGNvbG9yYnJld2VyLkJ1WWxCdVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBzY2FsZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJldHVybkNvbG9yU2NhbGUoKSB7XHJcbiAgICAvL2lmIGxpbmVhciBpcyBjaG9vc2VuXHJcbiAgICBpZiAoY29sb3JTY2FsZVsndHlwZSddID09PSAnTGluZWFyJykge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oXHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGFTZXRQZXJjZW50aWxlW3Nwdi5nZXRBY3RpdmVTY2FsZSgpXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclNjYWxlWydjb2xvciddKTtcclxuICAgIH0gLy9UaHJlc2hvbGQgY29sb3Igc2NhbGVcclxuICAgIGVsc2UgaWYgKGNvbG9yU2NhbGVbJ3R5cGUnXSA9PT0gJ1RocmVzaG9sZCcpIHtcclxuICAgICAgICByZXR1cm4gZDMuc2NhbGVUaHJlc2hvbGQoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhU2V0UGVyY2VudGlsZVtzcHYuZ2V0QWN0aXZlU2NhbGUoKV1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAucmFuZ2UoY29sb3JTY2FsZVsnY29sb3InXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sb3JQaWNrZXIoKSB7XHJcbiAgICBkMy5zZWxlY3QoJy5jb2xvcnMtYm9keScpXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnBhbGV0dGUnKVxyXG4gICAgICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JicmV3ZXIpKVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhbGV0dGUnKVxyXG4gICAgICAgIC5hdHRyKCd0aXRsZScsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQua2V5O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgLy8gaGlnaHRsaWdodCB0aGUgcmlnaHQgcGFsZXR0ZVxyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAkKCcucGFsZXR0ZVt0aXRsZT1cIicgKyBkLmtleSArICdcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgY29sb3JTY2FsZS5jb2xvciA9IGNvbG9yYnJld2VyW2Qua2V5XTtcclxuICAgICAgICAgICAgY2hhbmdlTGVnZW5kKCk7XHJcbiAgICAgICAgICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gYmFjayBvbmUgc2Vjb25kIGFuZCBkcmF3IHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICBzcHYuc2V0SW5kZXhUaW1lKHNwdi5nZXRJbmRleFRpbWUoKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgc3B2LmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNlbGVjdEFsbCgnLnN3YXRjaCcpXHJcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N3YXRjaCcpXHJcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBoaWdobGlnaHQgdGhlIHNlbGVjdGVkIGNvbG9yIHNjaGVtZVxyXG4gICAgJCgnLnBhbGV0dGVbdGl0bGU9XCJCdVlsQnVcIl0nKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIEdldHRlciBhbmQgc2V0dGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yU2NhbGUoKSB7XHJcbiAgICByZXR1cm4gY29sb3JTY2FsZTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3X2NvbG9yX3BpY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCAkLCBwYXJhbWV0ZXJzICovXHJcblxyXG5sZXQgSlNPTkFQSV9NSU1FVFlQRSA9ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nO1xyXG52YXIgc291cmNlO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZFRvRGF0YXNldCxcclxuICAgIHNldERhdGFTZXRQZXJjZW50aWxlLFxyXG4gICAgc2V0U3dhcm1EYXRhLFxyXG4gICAgc2V0TWV0YURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFkZE5ldHdvcmtCdXR0b25zXHJcbn0gZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbi8qKlxyXG4gKiBTdHJlYW0gdGhlIG1vdmVtZW50IGRhdGEgZnJvbSB0aGUgQVBJXHJcbiAqIExvYWRzIG9ubHkgdGhlIGV4cGxpY2l0IG1vdmVtZW50IGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1Nb3ZlbWVudERhdGEoKSB7XHJcbiAgICBpZiAod2luZG93LkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvYXBpL21vdmVtZW50X29ubHkvJyArIHBhcmFtZXRlcnNbJ2lkJ10pO1xyXG4gICAgICAgIHNvdXJjZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRhdGEgPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkVG9EYXRhc2V0KEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnJlYWR5U3RhdGUgPT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdXZWJicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RyZWFtaW5nJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnRpbGUgZGF0YSBmcm9tIHRoZSBhcGlcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJjZW50aWxlKCkge1xyXG4gICAgbGV0IGRhdGFTZXRQZXJjZW50aWxlID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcGVyY2VudGlsZS8nICsgcGFyYW1ldGVyc1snaWQnXSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRhU2V0UGVyY2VudGlsZSBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vIFttaW4sIHBlcmNlbnRpbGVfMSwuLi4scGVyY2VudGlsZV85LG1heF1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0UGVyY2VudGlsZVtkYXRhW2ldWydmZWF0dXJlJ11dID0gW2RhdGFbaV1bJ21pbiddLCBkYXRhW2ldWydwMSddLCBkYXRhW2ldWydwMiddLCBkYXRhW2ldWydwMyddLCBkYXRhW2ldWydwNSddLCBkYXRhW2ldWydwNyddLCBkYXRhW2ldWydwOCddLCBkYXRhW2ldWydwOSddLCBkYXRhW2ldWydtYXgnXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RGF0YVNldFBlcmNlbnRpbGUoZGF0YVNldFBlcmNlbnRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3dhcm0gZmVhdHVyZXMgZm9yIHRoZSBsaW5lIGNoYXJ0IGZyb20gdGhlIGFwaVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN3YXJtRmVhdHVyZXMoKSB7XHJcbiAgICBsZXQgc3dhcm1fZmVhdHVyZXMgPSBbJ3N3YXJtX3RpbWUnLCAnc3dhcm1fc3BlZWQnLCAnc3dhcm1fYWNjZWxlcmF0aW9uJywgJ3N3YXJtX2NvbnZleF9odWxsX2FyZWEnLFxyXG4gICAgICAgICdzd2FybV9kaXN0YW5jZV9jZW50cm9pZCcsICdzd2FybV9kaXJlY3Rpb24nLCAnc3dhcm1fcG9sYXJpc2F0aW9uJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvLyBnZXQgYWxsIHRoZSBvdGhlciBzd2FybSBmZWF0dXJlcyBmb3IgdGhlIGxpbmUgY2hhcnRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIHBhcmFtZXRlcnNbJ2lkJ10gKyAnLycgKyBzd2FybV9mZWF0dXJlc1tpXSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlID0gc3dhcm1fZmVhdHVyZXNbaV0ucmVwbGFjZSgnc3dhcm1fJywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFN3YXJtRGF0YShkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8vXHJcbi8vXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhRGF0YSgpIHtcclxuICAgIC8vZ2V0IG1ldGFkYXRhIGluZm9ybWF0aW9uXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvbWV0YWRhdGEvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgIHNldE1ldGFEYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ldHdvcmtEYXRhKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvbmV0d29ya3MvJyArIHBhcmFtZXRlcnNbJ2lkJ10sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgYWRkTmV0d29ya0J1dHRvbnMoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gYWEoKSB7fVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvYWpheF9xdWVyaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCAkLCBwYXJhbWV0ZXJzKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHtcclxuICAgIGdldFN3YXJtRGF0YSxcclxuICAgIGRhdGFzZXQsXHJcbn0gZnJvbSAnLi9leHBsb3JlLmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBzZXRJbmRleFRpbWUsXHJcbiAgICBnZXRab29tRnVuY3Rpb24sXHJcbiAgICBzZXRab29tRnVuY3Rpb25cclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBzZWxmIGZyb20gJy4vZXhwbG9yZS5qcyc7XHJcblxyXG5sZXQgbGluZUNoYXJ0UmF0aW8gPSAwO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuYW1lc3BhY2UgdG8gbWluaW1pemUgZ2xvYmFsIHZhcmlhYmxlc1xyXG4gKiBDb2RlIGlzIGluIGEgY2xvc3VyZSBhbmQgbWFudWFsbHkgZXhwb3NlIG9ubHkgdGhvc2VcclxuICogdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBnbG9iYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGluZUNoYXJ0KCkge1xyXG4gICAgbGV0IGxpbmVDaGFydFdpZHRoID0gNTAwMDtcclxuXHJcbiAgICBsaW5lQ2hhcnRSYXRpbyA9IE1hdGguY2VpbChzZWxmLmdldFN3YXJtRGF0YSgpLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdGhlIGxpbmUgY2hhcnQgZm9yIHRoZSBhdmVyYWdlZCBzd2FybSBmZWF0dXJlc1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgLy8gU3dhcm0gZmVhdHVyZXMgbGluZSBjaGFydFxyXG4gICAgbGV0IGxpbmVDaGFydEhlaWdodCA9IDUwMDsgLy8gdGhlIGxpbmUgY2hhcnQgaGVpZ2h0XHJcbiAgICBsZXQgbWFyZ2luID0ge1xyXG4gICAgICAgIHRvcDogMTAsXHJcbiAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgYm90dG9tOiAxMDAsXHJcbiAgICAgICAgbGVmdDogMTBcclxuICAgIH07XHJcbiAgICBsZXQgbWFyZ2luVG9MZWdlbmQgPSA1MDtcclxuXHJcbiAgICBsZXQgc3dhcm1fZmVhdHVyZXMgPSBPYmplY3Qua2V5cyhnZXRTd2FybURhdGEoKVswXSk7XHJcbiAgICAvLyByZW1vdmUgdGhlIHRpbWUga2V5XHJcbiAgICBsZXQgaW5kZXggPSBzd2FybV9mZWF0dXJlcy5pbmRleE9mKCd0aW1lJyk7XHJcbiAgICBzd2FybV9mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgTGluZSBjaGFydCBidXR0b25zIHRvIHRoZSBmZWF0dXJlIHBhbmVsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nID0gc3dhcm1fZmVhdHVyZXNbaV0uc3BsaXQoJ18nKS5qb2luKCcgJyk7XHJcbiAgICAgICAgY2FwaXRhbGl6ZWRfZmVhdHVyZV9zdHJpbmcgPSBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhcGl0YWxpemVkX2ZlYXR1cmVfc3RyaW5nLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICAkKCcuZmVhdHVyZS1jaGVjay1ib3gnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJmZWF0dXJlLWNoZWNrLWJveC1kZWZhdWx0IGxpbmVDaGFydENoZWNrQm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImRyYXdTd2FybWAgKyBzd2FybV9mZWF0dXJlc1tpXSArIGBcIiBjbGFzcz1cImxpbmVDaGFydEJ1dHRvblwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJhd1N3YXJtYCArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ1wiPicgKyBjYXBpdGFsaXplZF9mZWF0dXJlX3N0cmluZyArIGA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuICAgIC8vY2hlY2sgbGluZSBjaGFydCBkcmF3IGFsbCBsaW5lc1xyXG4gICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpXHJcbiAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IFtdO1xyXG4gICAgbGV0IHJhdGlvID0gMTtcclxuICAgIC8vIGFnZ3JlZ2F0ZSBhbmQgYXZlcmFnZSB0aGUgc3dhcm0gZGF0YSB0byBsaW5lQ2hhcnRXaWR0aCBwb2ludHMgaW4gdGhlIGxpbmUgY2hhcnRcclxuICAgIGlmIChnZXRTd2FybURhdGEoKS5sZW5ndGggPiBsaW5lQ2hhcnRXaWR0aCkge1xyXG4gICAgICAgIHJhdGlvID0gTWF0aC5jZWlsKGdldFN3YXJtRGF0YSgpLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuICAgICAgICAvLyB0bXAgYXJyYXkgZm9yIHRoZSBhZ2dyZWdhdGVkIGFuZCBhdmVyYWdlZCBmZWF0dXJlc1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldFN3YXJtRGF0YSgpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZSB0aGUgZmVhdHVyZXMgaW4gdGhlIHRlbXAgYXJyYXlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdG1wW2pdICs9IGdldFN3YXJtRGF0YSgpW2ldW3N3YXJtX2ZlYXR1cmVzW2pdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmF0aW8gaXMgemVybyB0aGVuIGF2ZXJhZ2UgaXQgYW5kIHNldCBpdCB0byB6ZXJvXHJcbiAgICAgICAgICAgIGlmIChpICUgcmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBfb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0aW1lJzogaSAvIHJhdGlvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3dhcm1fZmVhdHVyZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSB0bXBbal0gLyByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB0bXBfb2JqZWN0W3N3YXJtX2ZlYXR1cmVzW2pdXSA9IHRtcFtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lQ2hhcnREYXRhLnB1c2godG1wX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSBuZXcgQXJyYXkoc3dhcm1fZmVhdHVyZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsaW5lQ2hhcnREYXRhID0gZ2V0U3dhcm1EYXRhKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyB4IGF4aXMgc2NhbGUgLSBtaW51cyBtYXJnaW5MaW5lQ2hhcnQgIG5lZWRlZFxyXG4gICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgbGluZUNoYXJ0RGF0YS5sZW5ndGhdKVxyXG4gICAgICAgIC5yYW5nZShbMCwgbGluZUNoYXJ0V2lkdGhdKTtcclxuICAgIGxldCB4MiA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKFswLCBsaW5lQ2hhcnREYXRhLmxlbmd0aF0pXHJcbiAgICAgICAgLnJhbmdlKFswLCBsaW5lQ2hhcnRXaWR0aF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgIC50aWNrcygxMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpXHJcbiAgICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZCAqIHJhdGlvKSAvIDE1MDApICUgNjAgKyAnOicgKyBNYXRoLmZsb29yKChkICogcmF0aW8pIC8gcGFyYW1ldGVyc1snZnBzJ10pICUgNjAgKyAnOjonICsgKGQgKiByYXRpbykgJSBwYXJhbWV0ZXJzWydmcHMnXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB5IGF4aXMgc2NhbGUgd2hpY2ggaXMgbm9ybWFsaXplZFxyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbihbMCwgMTAwXSlcclxuICAgICAgICAucmFuZ2UoW2xpbmVDaGFydEhlaWdodCwgMF0pO1xyXG4gICAgLy8gZGVmaW5lIHdoZXJlIHRoZSBheGlzIGlzIGV0Y1xyXG4gICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeSlcclxuICAgICAgICAudGlja3MoMClcclxuICAgICAgICAudGlja1NpemUoMTApXHJcbiAgICAgICAgLnRpY2tQYWRkaW5nKDUpO1xyXG5cclxuICAgIGxldCBkcmFnZ2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZHJhZ2dlZCBmdW5jdGlvbiBnZXQgdGhlIGNvb3JkaW5hdGVzIGFuZCBjYWxjdWxhdGUgdGhlIHRpbWUgbW9tZW50IGZyb20gdGhpc1xyXG4gICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzKTtcclxuICAgICAgICBpZiAoY29vcmRzWzBdIDwgbWFyZ2luLmxlZnQgfHwgY29vcmRzWzBdID4gbGluZUNoYXJ0V2lkdGggfHwgY29vcmRzWzFdIDwgMCB8fCBjb29yZHNbMV0gPiBsaW5lQ2hhcnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0bXAgc2NhbGUgdG8gaW5jbHVkZSB0aGUgem9vbSBmYWN0b3JcclxuICAgICAgICBsZXQgdG1wU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ2V0Wm9vbUZ1bmN0aW9uKCkucmFuZ2UoKSlcclxuICAgICAgICAgICAgLnJhbmdlKGdldFpvb21GdW5jdGlvbigpLmRvbWFpbigpKTtcclxuICAgICAgICAvLyBzZXQgdGhlIG5ldyB0aW1lXHJcbiAgICAgICAgc2V0SW5kZXhUaW1lKE1hdGguZmxvb3IoKHRtcFNjYWxlKGNvb3Jkc1swXSAtIG1hcmdpbi5sZWZ0KSkgKiByYXRpbykpO1xyXG4gICAgfTtcclxuICAgIGxldCB0cmVuZENoYXJ0c1pvb20gPSB7fTtcclxuICAgIGxldCB6b29tR3JvdXA7XHJcbiAgICBsZXQgem9vbSA9IGQzLnpvb20oKVxyXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgMjBdKVxyXG4gICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1xyXG4gICAgICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgICAgIFtsaW5lQ2hhcnRXaWR0aCwgbGluZUNoYXJ0SGVpZ2h0XVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgICAgW2xpbmVDaGFydFdpZHRoLCBsaW5lQ2hhcnRIZWlnaHRdXHJcbiAgICAgICAgXSlcclxuICAgICAgICAub24oJ3pvb20nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0cmFuc2Zvcm0gZmFjdG9yXHJcbiAgICAgICAgICAgIGxldCB0ID0gZDMuZXZlbnQudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2Ugc2NhbGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICBzZXRab29tRnVuY3Rpb24oeC5kb21haW4odC5yZXNjYWxlWCh4MikuZG9tYWluKCkpKTtcclxuICAgICAgICAgICAgLy8gem9vbSBlYWNoIGF2YWlhYmxlIGxpbmVcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGxpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb21Hcm91cC5zZWxlY3QoKCcjJyArIGtleSArICdMaW5lJykpLmF0dHIoJ2QnLCBsaW5lc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB6b29tIHRoZSB0cmVuZCBjaGFydHNcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRyZW5kQ2hhcnRzWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyZW5kQ2hhcnRzWm9vbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbUdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCgnIycgKyBrZXkgKyAnVHJlbmRDaGFydCAuJyArIHRyZW5kQ2hhcnRzRWxlbVtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIHRyZW5kQ2hhcnRzWm9vbVtrZXldW3RyZW5kQ2hhcnRzRWxlbVtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXNjYWxlIHRoZSBheGlzXHJcbiAgICAgICAgICAgIGdYYXhpcy5jYWxsKHhBeGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBzdmcgcmVzaXphYmxlXHJcbiAgICBsZXQgc3dhcm1MaW5lQ2hhcnQgPSBkMy5zZWxlY3QoJyNzd2FybS12aXMnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctTGluZUNoYXJ0Q29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG5cclxuICAgICAgICAuYXR0cigndmlld0JveCcsICcwIDAgJyArIGxpbmVDaGFydFdpZHRoICsgJyAnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpbi5ib3R0b20pKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQnLCB0cnVlKTtcclxuXHJcbiAgICB6b29tR3JvdXAgPSBzd2FybUxpbmVDaGFydFxyXG4gICAgICAgIC5hcHBlbmQoJ3N2ZzpnJylcclxuICAgICAgICAuYXR0cignaWQnLCAnbGluZUNoYXJ0Wm9vbScpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywwKScpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeCBheGlzXHJcbiAgICAvLyBhZGQgdGhlIGF4aXNcclxuICAgIGxldCBnWGF4aXMgPSB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBsaW5lQ2hhcnRIZWlnaHQgKyAnKScpXHJcbiAgICAgICAgLmNhbGwoeEF4aXMpO1xyXG5cclxuICAgIC8vIGFwcGVuZCBhIGdyb3VwIGZvciB0aGUgeSBheGlzXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdnJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzTGluZUNoYXJ0JylcclxuICAgICAgICAuY2FsbCh5QXhpcyk7XHJcblxyXG5cclxuICAgIC8vIHRoZSB0aW1lIGxpbmUgYXBwZW5kIHRoZSBsaW5lXHJcbiAgICB6b29tR3JvdXAuYXBwZW5kKCdsaW5lJylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGltZUxpbmUnKVxyXG4gICAgICAgIC5hdHRyKCdpZCcsICdsaW5lQ2hhcnRUaW1lTGluZScpXHJcbiAgICAgICAgLmF0dHIoJ3gxJywgMClcclxuICAgICAgICAuYXR0cigneTEnLCAwKVxyXG4gICAgICAgIC5hdHRyKCd4MicsIDApXHJcbiAgICAgICAgLmF0dHIoJ3kyJywgbGluZUNoYXJ0SGVpZ2h0KTtcclxuXHJcbiAgICAvLyAqKlxyXG4gICAgLy8gY29sb3JzIGZvciB0aGUgbGluZXNcclxuICAgIGxldCBsaW5lX2NvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVDYXRlZ29yeTEwKTtcclxuICAgIGxldCBsaW5lcyA9IHt9O1xyXG4gICAgLy8gYWRkIHRoZSBsaW5lcyB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2FybV9mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtaW4gPSBkMy5taW4obGluZUNoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZFtzd2FybV9mZWF0dXJlc1tpXV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1heCA9IGQzLm1heChsaW5lQ2hhcnREYXRhLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkW3N3YXJtX2ZlYXR1cmVzW2ldXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5vcm1hbGl6YXRpb25TY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFttaW4sIG1heF0pLnJhbmdlKFswLCAxMDBdKTtcclxuICAgICAgICBsZXQgbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geChkWyd0aW1lJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtzd2FybV9mZWF0dXJlc1tpXV0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGluZXNbc3dhcm1fZmVhdHVyZXNbaV1dID0gbGluZTtcclxuICAgICAgICAvL2FwcGVuZCB0aGUgbGluZSB0byB0aGUgbGluZSBjaGFydFxyXG4gICAgICAgIHpvb21Hcm91cC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuZGF0YShbbGluZUNoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lIGxpbmVDaGFydExpbmUnKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGxpbmVfY29sb3JzKGkpKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpXHJcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgc3dhcm1fZmVhdHVyZXNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJyNsaW5lQ2hhcnRUaW1lTGluZScpLmFwcGVuZFRvKCcjbGluZUNoYXJ0Wm9vbScpO1xyXG4gICAgLy8gYXBwZW5kIHRoZSB6b29tIHJlY3RhbmdsZVxyXG4gICAgem9vbUdyb3VwLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3pvb20nKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGxpbmVDaGFydFdpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsaW5lQ2hhcnRIZWlnaHQpXHJcbiAgICAgICAgLmNhbGwoem9vbSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZHJhZ2dlZClcclxuICAgICAgICAuY2FsbChkMy5kcmFnKClcclxuICAgICAgICAgICAgLm9uKCdkcmFnJywgZHJhZ2dlZClcclxuICAgICAgICApO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbGVnZW5kIGZvciB0aGUgbGluZSBjaGFydFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgbGV0IGxlZ2VuZFdpZHRoID0gMTAwO1xyXG4gICAgbGV0IGxlZ2VuZEhlaWdodCA9IDUwO1xyXG5cclxuICAgIC8vc2VsZWN0IGFsbCB0aGUgbGluZXNcclxuICAgIGxldCBjaGFydExpbmVzID0gZDMuc2VsZWN0QWxsKCcubGluZScpO1xyXG5cclxuICAgIC8vYXBwZW5kIGEgZ3JvdXAgZm9yIHRoZSBsZWdlbmRcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2xpbmVDaGFydExlZ2VuZCcpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5ib3R0b20gKyAnLCcgKyAobGluZUNoYXJ0SGVpZ2h0ICsgbWFyZ2luVG9MZWdlbmQpICsgJyknKVxyXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QubGVnZW5kJylcclxuICAgICAgICAuZGF0YShjaGFydExpbmVzLl9ncm91cHNbMF0pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA2MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZC5zdHlsZS5zdHJva2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgZC5hdHRyaWJ1dGVzLmlkLnZhbHVlICsgJ0xlZ2VuZFRpdGxlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lQ2hhcnRsZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGV4dFNwYWNlKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoc3BhY2luZyAqIGkgKyBsZWdlbmRXaWR0aCArIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dChkLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSArICc6ICcpO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBlbmQgdGhlIHRleHQgZm9yIHRoZSB2YWx1ZSBvZiB0aGUgbGluZVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQuYXR0cmlidXRlcy5pZC52YWx1ZSArICdWYWx1ZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0bGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRleHRTcGFjZSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHNwYWNpbmcgKiBpICsgbGVnZW5kV2lkdGggK1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgZXhwcmVzc2lvbiBnZXRzIHRoZSB0ZXh0IGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnIycgKyBkLmF0dHJpYnV0ZXMuaWQudmFsdWUgKyAnTGVnZW5kVGl0bGUnKS5ub2RlKCkuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgK1xyXG4gICAgICAgICAgICAgICAgICAgIDEwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgnMC4wJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy9hcHBlbmQgYSBsZWdlbmQgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydHNcclxuICAgIHN3YXJtTGluZUNoYXJ0XHJcbiAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RyZW5kQ2hhcnRMZWdlbmQnKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBtYXJnaW4uYm90dG9tICsgJywnICsgKGxpbmVDaGFydEhlaWdodCArIG1hcmdpblRvTGVnZW5kKSArICcpJylcclxuICAgICAgICAuc2VsZWN0QWxsKCdyZWN0LmxlZ2VuZCcpXHJcbiAgICAgICAgLmRhdGEoWyc1JSAtIDk1JScsICcyNSUgLSA3NSUnLCAnTWVkaWFuJ10pXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAvL2FwcGVuZCB0aGUgd2hvbGUgbGVnZW5kIGluIGEgZWFjaCBmdW5jdGlvblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNpbmcgPSA4MDA7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3BhY2UgPSA0MDtcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSByZWN0YW5nbGVzIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3JlY3QnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBsZWdlbmRIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjNzRhOWNmJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjMDQ1YThkJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyM1MjUyNTInO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSB0ZXh0IGZvciB0aGUgbGVnZW5kXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydGxlZ2VuZFRleHQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0ZXh0U3BhY2UpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIChzcGFjaW5nICogaSArIGxlZ2VuZFdpZHRoICsgMTApICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGxpbmUgY2hhcnQgYnV0dG9uIGxpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3YXJtX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJCgoJyNkcmF3U3dhcm0nICsgc3dhcm1fZmVhdHVyZXNbaV0pKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoKCcjZHJhd1N3YXJtJyArIHN3YXJtX2ZlYXR1cmVzW2ldKSkuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICQoKCcjJyArIHN3YXJtX2ZlYXR1cmVzW2ldICsgJ0xpbmUnKSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCgnIycgKyBzd2FybV9mZWF0dXJlc1tpXSArICdMaW5lJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaW5lIGNoYXJ0IGRldGFpbHMgY2xpY2sgbGlzdGVuZXJcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgICQoJy5kcmF3LWRldGFpbHMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVMaW5lQ2hhcnQoKTtcclxuICAgICAgICAgICAgYWRkVHJlbmRDaGFydCh0aGlzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW1vdmVUcmVuZENoYXJ0KCk7XHJcbiAgICAgICAgICAgIGVuYWJsZUxpbmVDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkaXNhYmxlTGluZUNoYXJ0KCkge1xyXG4gICAgICAgICQoJy5saW5lQ2hhcnRCdXR0b24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydENoZWNrQm94JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydExpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGluZSBjaGFydCBkZXRhaWxzIGNsaWNrIGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBlbmFibGVMaW5lQ2hhcnQoKSB7XHJcbiAgICAgICAgJCgnLmxpbmVDaGFydEJ1dHRvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAkKCcubGluZUNoYXJ0Q2hlY2tCb3gnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAkKCcubGluZUNoYXJ0TGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRyZW5kIGNoYXJ0IGVsZW1lbnRzXHJcbiAgICBsZXQgdHJlbmRDaGFydHNFbGVtID0gWydsb3dlck91dGVyQXJlYScsICdsb3dlcklubmVyQXJlYScsICdtZWRpYW5MaW5lJywgJ3VwcGVySW5uZXJBcmVhJywgJ3VwcGVyT3V0ZXJBcmVhJ107XHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRyZW5kIGNoYXJ0IHNob3dpbmcgbWVkaWFuIGFuZCBwZXJjZW50aWxlc1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkVHJlbmRDaGFydChlbGVtKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggZmVhdHVyZSB0byBkaXNwbGF5IGluIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgIGxldCBmZWF0dXJlID0gJyc7XHJcbiAgICAgICAgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3BlZWQnKSkge1xyXG4gICAgICAgICAgICBmZWF0dXJlID0gJ3NwZWVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1bJ2lkJ10udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWNjZWxlcmF0aW9uJykpIHtcclxuICAgICAgICAgICAgZmVhdHVyZSA9ICdhY2NlbGVyYXRpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbVsnaWQnXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdkaXN0YW5jZS1jZW50cm9pZCcpKSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmUgPSAnZGlzdGFuY2VfY2VudHJvaWQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZGF0YSBpcyBub3QgbG9hZGVkIGZ1bGx5IC0tIHJldHVyblxyXG4gICAgICAgIGlmICghZGF0YXNldFswXVtmZWF0dXJlXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoYW5nZSB0byB0aGUgdHJlbmQgY2hhcnQgbGVnZW5kXHJcbiAgICAgICAgJCgnI2xpbmVDaGFydExlZ2VuZCcpLmhpZGUoKTtcclxuICAgICAgICAkKCcjdHJlbmRDaGFydExlZ2VuZCcpLnNob3coKTtcclxuICAgICAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGNvbXB1dGVkIGFuZCBvbmx5IGhpZGRlblxyXG4gICAgICAgIGlmICghJCgoJyMnICsgZmVhdHVyZSArICdUcmVuZENoYXJ0JykpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGRhdGEgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICAgICBsZXQgdHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgbGV0IG51bV9hbmltYWxzID0gc2VsZi5hbmltYWxfaWRzLmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJjZXRpbGVzIGZvciBldmVyeSB0aW1lIHN0ZXBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRTd2FybURhdGEoKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1fYW5pbWFsczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFzZXRbaSAqIG51bV9hbmltYWxzICsgal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goZGF0YXNldFtpICogbnVtX2FuaW1hbHMgKyBqXVtmZWF0dXJlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdHJlbmRDaGFydERhdGEucHVzaChwZXJjZW50aWxlcyh0bXApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2FnZ3JlZ2F0ZSBhbmQgYXZlcmFnZSB0aGUgdHJlbmRDaGFydERhdGEgdG8gbGluZUNoYXJ0V2lkdGggZGF0YSBwb2ludHNcclxuICAgICAgICAgICAgaWYgKHRyZW5kQ2hhcnREYXRhLmxlbmd0aCA+IGxpbmVDaGFydFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wVHJlbmRDaGFydERhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIHJhdGlvID0gTWF0aC5jZWlsKHRyZW5kQ2hhcnREYXRhLmxlbmd0aCAvIGxpbmVDaGFydFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbcGVyYzA1LHBlcmMyNSxwZXJjNTAscGVyYzc1LHBlcmM5NV1cclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFnZ3JlZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSB0cmVuZENoYXJ0RGF0YVtpXVtqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGl2aWRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJSByYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHRtcFtqXSAvIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkIHRvIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBUcmVuZENoYXJ0RGF0YS5wdXNoKHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtwZXJjMDUscGVyYzI1LHBlcmM1MCxwZXJjNzUscGVyYzk1XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdHJlbmRDaGFydERhdGEgPSB0bXBUcmVuZENoYXJ0RGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBnZXQgbWluIGFuZCBtYXggZm9yIHRoZSBub3JtYWxpemF0aW9uXHJcbiAgICAgICAgICAgIGxldCBtaW4gPSBkMy5taW4odHJlbmRDaGFydERhdGEsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkWzBdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1heCA9IGQzLm1heCh0cmVuZENoYXJ0RGF0YSwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbNF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsaXphdGlvblNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oW21pbiwgbWF4XSkucmFuZ2UoWzAsIDEwMF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICAgICBsZXQgdHJlbmRDaGFydCA9IHpvb21Hcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGZlYXR1cmUgKyAnVHJlbmRDaGFydCcpKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyZW5kQ2hhcnREYXRhJyk7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgem9vbSByZWN0YW5nbGUgYWdhaW4gdG8gdGhlIGVuZCBvZiB0aGUgZ3JvdXBcclxuICAgICAgICAgICAgJCgnLnpvb20nKS5hcHBlbmRUbygnI2xpbmVDaGFydFpvb20nKTtcclxuICAgICAgICAgICAgJCgnI2xpbmVDaGFydFRpbWVMaW5lJykuYXBwZW5kVG8oJyNsaW5lQ2hhcnRab29tJyk7XHJcbiAgICAgICAgICAgIC8vIHZhciB0byBzYXZlIHRoZSBmdW5jdGlvbnMgZm9yIHRoZSB6b29tXHJcbiAgICAgICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmVuZENoYXJ0c0VsZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9ucyBmb3IgdGhlIHVwcGVyIGFuZCBpbm5lciBhcmVhcyBhbmQgdGhlIG1lZGlhblxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAgICAgICAgICAgICAvLyBsb3dlciBvdXRlciBhcmVhIGFuZCBsb3dlciBpbm5lciBhcmVhXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gZDMuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueTAoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkobm9ybWFsaXphdGlvblNjYWxlKGRbKGkgKyAxKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnkxKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbWVkaWFuIGxpbmVcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uKGQsIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4KGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHVwcGVyIGlubmVyIGFyZWEgYW5kIHVwcGVyIG91dGVyIGFyZWFcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbihkLCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geChqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnkwKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5KG5vcm1hbGl6YXRpb25TY2FsZShkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC55MShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geShub3JtYWxpemF0aW9uU2NhbGUoZFsoaSAtIDEpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhpcyBmb3IgdGhlIGxhdGVyIHpvb21cclxuICAgICAgICAgICAgICAgIHRyZW5kQ2hhcnRzWm9vbVtmZWF0dXJlXVt0cmVuZENoYXJ0c0VsZW1baV1dID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBpdCB0byB0aGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgdHJlbmRDaGFydC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKFt0cmVuZENoYXJ0RGF0YV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgdHJlbmRDaGFydHNFbGVtW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgdGVtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICAgICAgICAkKCgnIycgKyBmZWF0dXJlICsgJ1RyZW5kQ2hhcnQnKSkuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgMDUsIDI1LCA1MCwgNzUsIDk1IHBlcmNlbnRpbGVzIG9mIHRoZSBhcnJheVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGVyY2VudGlsZXMoYXJyKSB7XHJcbiAgICAgICAgbGV0IHAgPSBbMC4wNSwgMC4yNSwgMC41LCAwLjc1LCAwLjk1XTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcFtpXTtcclxuICAgICAgICAgICAgbGV0IGxvd2VyID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCB1cHBlciA9IGxvd2VyICsgMTtcclxuICAgICAgICAgICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgICAgICAgICAgaWYgKHVwcGVyID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycltsb3dlcl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2xvd2VyXSAqICgxIC0gd2VpZ2h0KSArIGFyclt1cHBlcl0gKiB3ZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIHRoZSB0cmVuZCBjaGFydFxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlVHJlbmRDaGFydCgpIHtcclxuICAgICAgICAkKCcudHJlbmRDaGFydERhdGEnKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI3RyZW5kQ2hhcnRMZWdlbmQnKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xpbmVDaGFydExlZ2VuZCcpLnNob3coKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBHZXR0ZXIgYW5kIHNldHRlclxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5lQ2hhcnRSYXRpbygpIHtcclxuICAgIHJldHVybiBsaW5lQ2hhcnRSYXRpbztcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvbGluZV9jaGFydC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCQsKi9cclxuLy8gaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBkcmF3LFxyXG4gICAgc2V0UGxheUJvb2xlYW5cclxufSBmcm9tICcuL3NwYXRpYWxfdmlldy5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgdGhlIHBsYXkgYnV0dG9uIC0tPiBMb2FkaW5nIHN5bWJvbFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4oZmFsc2UpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnI3BsYXktYnV0dG9uJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj5Mb2FkaW5nJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHRoZSBwbGF5IGJ1dHRvbiByZW1vdmUgbG9hZGluZyBzeW1ib2xcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVQbGF5QnV0dG9uKCkge1xyXG4gICAgc2V0UGxheUJvb2xlYW4odHJ1ZSk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5odG1sKCc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5QbGF5Jyk7XHJcbiAgICAkKCcjcGxheS1idXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIGRyYXcoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gIC45NSBwZXJjZW50aWxlcyBvZiB0aGUgYXJyYXlcclxuICpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50aWxlcyhhcnIpIHtcclxuICAgIGxldCBwID0gMC45NTtcclxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaW5kZXggPSAoYXJyLmxlbmd0aCAtIDEpICogcDtcclxuICAgIGxldCBsb3dlciA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgbGV0IHVwcGVyID0gbG93ZXIgKyAxO1xyXG4gICAgbGV0IHdlaWdodCA9IGluZGV4ICUgMTtcclxuICAgIGlmICh1cHBlciA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycltsb3dlcl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBhcnJbbG93ZXJdICogKDEgLSB3ZWlnaHQpICsgYXJyW3VwcGVyXSAqIHdlaWdodDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgd2luZG93LCBkMywgJCovXHJcbmltcG9ydCB7XHJcbiAgICBnZXRTd2FybURhdGFcclxufSBmcm9tICcuL2V4cGxvcmUuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgc3B2IGZyb20gJy4vc3BhdGlhbF92aWV3LmpzJztcclxuXHJcbmltcG9ydCAqIGFzIG5ldHdvcmsgZnJvbSAnLi9uZXR3b3JrLmpzJztcclxuXHJcbmxldCBzbGlkZXI7XHJcbmxldCB0b29sdGlwO1xyXG5cclxuLyoqXHJcbiAqIEJydXNoIGVuZCBmdW5jdGlvblxyXG4gKiBBZGQgdGhlIGZpc2ggaW4gdGhlIGJydXNoIHRvIHRoZSBhY3RpdmUgZmlzaCBhbmQgcmVtb3ZlIHRoZSBicnVzaCBhZ2FpblxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgbGV0IGFycmF5QW5pbWFscyA9IHNwdi5nZXRBcnJheUFuaW1hbHMoKTtcclxuICAgIGxldCBhY3RpdmVBbmltYWxzID0gc3B2LmdldEFjdGl2ZUFuaW1hbHMoKTtcclxuICAgIHZhciByZWN0ID0gZDMuZXZlbnQuc2VsZWN0aW9uO1xyXG4gICAgLy9pdGVyYXRlIG92ZXIgdGhlIDE1MSBmaXNoIHRvIGNoZWNrIHdoaWNoIGFyZSBpbiB0aGUgYnJ1c2hcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3B2LmFuaW1hbF9pZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcG9pbnQgPSBbYXJyYXlBbmltYWxzW2ldWydwJ11bMF0sIGFycmF5QW5pbWFsc1tpXVsncCddWzFdXTtcclxuICAgICAgICAvL2NoZWNrIHdoaWNoIGZpc2ggYXJlIGluICB0aGUgYnJ1c2hlZCBhcmVhXHJcbiAgICAgICAgaWYgKChyZWN0WzBdWzBdIDw9IHBvaW50WzBdKSAmJiAocG9pbnRbMF0gPD0gcmVjdFsxXVswXSkgJiZcclxuICAgICAgICAgICAgKHJlY3RbMF1bMV0gPD0gcG9pbnRbMV0pICYmIChwb2ludFsxXSA8PSByZWN0WzFdWzFdKSkge1xyXG4gICAgICAgICAgICAvLyBQb2ludCBpcyBpbiB0aGUgYnJ1c2hcclxuICAgICAgICAgICAgYWN0aXZlQW5pbWFscy5wdXNoKGFycmF5QW5pbWFsc1tpXVsnYSddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzcHYuc2V0QWN0aXZlQW5pbWFscyhhY3RpdmVBbmltYWxzKTtcclxuICAgIGlmICghJCgnI3BsYXktYnV0dG9uJylcclxuICAgICAgICAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgLy9nbyBiYWNrIG9uZSBzZWNvbmQgYW5kIGRyYXcgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcblxyXG4gICAgICAgIHNwdi5zZXRJbmRleFRpbWUoc3B2LmdldEluZGV4VGltZSgpIC0gMSk7XHJcbiAgICAgICAgc3B2LmRyYXcoKTtcclxuICAgIH1cclxuICAgICQoJyNicnVzaGluZy1idXR0b24nKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyByZW1vdmUgdGhlIGJydXNoXHJcbiAgICAkKCcuYnJ1c2gnKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUb29sdGlwKCkge1xyXG4gICAgdG9vbHRpcCA9IGQzLnNlbGVjdCgnZGl2LnRvb2x0aXAnKVxyXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsIDAgKyAncHgnKVxyXG4gICAgICAgIC5zdHlsZSgndG9wJywgMCArICdweCcpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb29sdGlwIGZ1bmN0aW9uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9vbHRpcEZ1bmN0aW9uKGQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3B2LmRhdGFzZXRNZXRhZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChkWydhJ10gPT09IHNwdi5kYXRhc2V0TWV0YWRhdGFbaV1bJ2FuaW1hbF9pZCddKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDUpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMTAwKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXNcclxuICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJyN0b29sdGlwLWFuaW1hbC1pZCcpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChzcHYuZGF0YXNldE1ldGFkYXRhW2ldWydhbmltYWxfaWQnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zcGVjaWVzJylcclxuICAgICAgICAgICAgICAgIC5odG1sKHNwdi5kYXRhc2V0TWV0YWRhdGFbaV1bJ3NwZWNpZXMnXSk7XHJcbiAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCcjdG9vbHRpcC1zZXgnKVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoc3B2LmRhdGFzZXRNZXRhZGF0YVtpXVsnc2V4J10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtc2l6ZScpXHJcbiAgICAgICAgICAgICAgICAuaHRtbChzcHYuZGF0YXNldE1ldGFkYXRhW2ldWydzaXplJ10pO1xyXG4gICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgnI3Rvb2x0aXAtd2VpZ2h0JylcclxuICAgICAgICAgICAgICAgIC5odG1sKHNwdi5kYXRhc2V0TWV0YWRhdGFbaV1bJ3dlaWdodCddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBzbGlkZXJcclxuICAgIHNsaWRlciA9ICQoJyNzbGlkZXInKVxyXG4gICAgICAgIC5zbGlkZXIoe1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogZ2V0U3dhcm1EYXRhKCkubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdGVwOiAyNSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgc3B2LnNldEluZGV4VGltZSh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBwYXVzZWQgYXBwbHkgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKCcjcGxheS1idXR0b24nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYXBwbHlzIHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgc3B2LmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbmV0d29yayBzbGlkZXJcclxuICAgICQoJyNuZXR3b3JrLXNsaWRlcicpXHJcbiAgICAgICAgLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiAnbWF4JyxcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXR3b3JrLnNldE5ldHdvckxpbWl0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNuZXR3b3JrLWxpbWl0JykudmFsKHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIGdldCB0aGUgbWF4IGZyb20gdGhlIHNsaWRlciB0aGlzIGlzIG5lZWRlZCB0byBjYWxjdWxhdGUgdGhlIHRpY2tzXHJcbiAgICBsZXQgbWF4ID0gc2xpZGVyLnNsaWRlcignb3B0aW9uJywgJ21heCcpO1xyXG4gICAgbGV0IHNwYWNlID0gMTAwIC8gbWF4O1xyXG4gICAgLy9hcHBlbmQgdGhlIG1pbnV0ZSB0aWNrc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgPSBpICsgMTUwMCkge1xyXG4gICAgICAgICQoJzxzcGFuIGNsYXNzPVwidWktc2xpZGVyLXRpY2tcIj48L3NwYW4+JylcclxuICAgICAgICAgICAgLmNzcygnbGVmdCcsIChzcGFjZSAqIGkpICsgJyUnKVxyXG4gICAgICAgICAgICAuYXBwZW5kVG8oc2xpZGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgR2V0dGVyIGFuZCBzZXR0ZXJcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVNsaWRlcigpIHtcclxuICAgIHJldHVybiBzbGlkZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lU2xpZGVyKHZhbHVlKSB7XHJcbiAgICBzbGlkZXIuc2xpZGVyKCd2YWx1ZScsIHZhbHVlKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvc3BhdGlhbF92aWV3X2ludGVyYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWxldHMqL1xyXG4vKmdsb2JhbCB3aW5kb3csIGQzLCovXHJcblxyXG5pbXBvcnQgKiBhcyBzcHYgZnJvbSAnLi9zcGF0aWFsX3ZpZXcuanMnO1xyXG5cclxuaW1wb3J0ICogYXMgY29sb3JwaWNrZXIgZnJvbSAnLi9zcGF0aWFsX3ZpZXdfY29sb3JfcGlja2VyLmpzJztcclxuXHJcbmxldCBzdmdMZWdlbmQ7XHJcblxyXG5cclxuLy8gZ3JvdXAgZm9yIHRoZSBsZWdlbmRcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNwYXRpYWxWaWV3R3JvdXAoKSB7XHJcbiAgICBsZXQgdGFua1dpZHRoID0gc3B2LmdldFRhbmtXaWR0aCgpO1xyXG5cclxuICAgIHN2Z0xlZ2VuZCA9IGQzLnNlbGVjdCgnI21haW4tdmlzLWxlZ2VuZC1kaXYnKVxyXG4gICAgICAgIC5jbGFzc2VkKCdzdmctbGVnZW5kQ29udGFpbmVyJywgdHJ1ZSlcclxuICAgICAgICAvLyB0byBtYWtlIGl0IHJlc3BvbnNpdmUgd2l0aCBjc3NcclxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxyXG4gICAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgMCAnICsgdGFua1dpZHRoICsgJyAnICsgMTAwKVxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2xhc3Mgc3ZnLWNvbnRlbnRcclxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRlbnQtbGVnZW5kJywgdHJ1ZSlcclxuICAgICAgICAuYXBwZW5kKCdzdmc6ZycpXHJcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvbG9yTGVnZW5kJyk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgY29sb3IgbGVnZW5kXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlTGVnZW5kKCkge1xyXG4gICAgbGV0IHRhbmtXaWR0aCA9IHNwdi5nZXRUYW5rV2lkdGgoKTtcclxuICAgIGxldCB0YW5rSGVpZ2h0ID0gc3B2LmdldFRhbmtIZWlnaHQoKTtcclxuICAgIHZhciBsZWdlbmQ7IC8vIHRoZSBjb2xvciBsZWdlbmRcclxuICAgIHZhciBsZWdlbmRUZXh0OyAvLyBjb2xvciBsZWdlbmQgdGV4dFxyXG4gICAgLy8gdmFycyBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgdmFyIGxlZ2VuZFdpZHRoID0gdGFua1dpZHRoICogMC4wODtcclxuICAgIHZhciBsZWdlbmRIZWlnaHQgPSB0YW5rSGVpZ2h0ICogMC4wNDtcclxuICAgIHZhciBkaWZmZXJlbnRDb2xvcnMgPSAwO1xyXG5cclxuICAgIC8vY2hhbmdlIHRoZSBjb2xvcnMgb2YgdGhlIGFuaW1hbHNcclxuICAgIGlmIChzcHYuZ2V0QWN0aXZlU2NhbGUoKSAhPT0gJ2JsYWNrJykge1xyXG4gICAgICAgIHZhciB0bXBTY2FsZSA9IGNvbG9ycGlja2VyLnJldHVybkNvbG9yU2NhbGUoKTtcclxuICAgICAgICAvLyBvbmNlIHRoZSBmaWxsIGZvciB0aGUgaGVhZHMgYW5kIHRoZSBzdHJva2UgZm9yIHRoZSBwYXRoXHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YSh0bXBTY2FsZS5yYW5nZSgpKTtcclxuICAgICAgICBsZWdlbmRUZXh0ID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgndGV4dC5sZWdlbmRUZXh0JylcclxuICAgICAgICAgICAgLmRhdGEodG1wU2NhbGUuZG9tYWluKCkpO1xyXG4gICAgICAgIGRpZmZlcmVudENvbG9ycyA9IHRtcFNjYWxlLnJhbmdlKClcclxuICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGVnZW5kID0gc3ZnTGVnZW5kLnNlbGVjdEFsbCgncmVjdC5sZWdlbmQnKVxyXG4gICAgICAgICAgICAuZGF0YShbXSk7XHJcbiAgICAgICAgbGVnZW5kVGV4dCA9IHN2Z0xlZ2VuZC5zZWxlY3RBbGwoJ3RleHQubGVnZW5kVGV4dCcpXHJcbiAgICAgICAgICAgIC5kYXRhKFtdKTtcclxuICAgIH1cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZFxyXG4gICAgbGVnZW5kXHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAuYXR0cignd2lkdGgnLCBsZWdlbmRXaWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgodGFua1dpZHRoIC0gZGlmZmVyZW50Q29sb3JzICogbGVnZW5kV2lkdGgpICsgaSAqIGxlZ2VuZFdpZHRoIC0gMzApICsgJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvLyBFWElUIC0gbGVnZW5kXHJcbiAgICBsZWdlbmQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIFVQREFURSAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0LnRleHQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFTlRFUiAtIGxlZ2VuZCB0ZXh0XHJcbiAgICBsZWdlbmRUZXh0XHJcbiAgICAgICAgLmVudGVyKClcclxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kVGV4dCcpXHJcbiAgICAgICAgLmF0dHIoJ3knLCAyICogbGVnZW5kSGVpZ2h0KVxyXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xyXG4gICAgICAgICAgICAvLyBwbHVzIDE1IGhhcyB0byBiZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIHJldHVybiAoKHRhbmtXaWR0aCAtIGRpZmZlcmVudENvbG9ycyAqIGxlZ2VuZFdpZHRoKSArIGkgKiBsZWdlbmRXaWR0aCAtIDEwKSArICdweCc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZCAqIDIpIC8gMjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBFWElUIC0gbGVnZW5kIHRleHRcclxuICAgIGxlZ2VuZFRleHQuZXhpdCgpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZXhwbG9yZS9zcGF0aWFsX3ZpZXdfbGVnZW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cGxvcmUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEZlYXR1cmVzIGNoZWNrYm94IGFuZCByYWRpbyBidXR0b25zICovXFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGRpdiB7XFxyXFxuICAgIGNsZWFyOiBib3RoO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggbGFiZWwge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDFEM0Q0O1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTplbXB0eSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHkge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTplbXB0eX5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06ZW1wdHl+bGFiZWwge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAyLjVlbTtcXHJcXG4gICAgdGV4dC1pbmRlbnQ6IDNlbTtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTplbXB0eX5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmVtcHR5fmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgd2lkdGg6IDIuNWVtO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRDFEM0Q0O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzcHggMCAwIDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06aG92ZXI6bm90KDpjaGVja2VkKX5sYWJlbCwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06aG92ZXI6bm90KDpjaGVja2VkKX5sYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAjODg4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpob3Zlcjpub3QoOmNoZWNrZWQpfmxhYmVsOmJlZm9yZSwgLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06aG92ZXI6bm90KDpjaGVja2VkKX5sYWJlbDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnXFxcXDI3MTQnO1xcclxcbiAgICB0ZXh0LWluZGVudDogLjllbTtcXHJcXG4gICAgY29sb3I6ICNDMkMyQzI7XFxyXFxufVxcclxcblxcclxcbi5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWR+bGFiZWwsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmNoZWNrZWR+bGFiZWwge1xcclxcbiAgICBjb2xvcjogIzc3NztcXHJcXG59XFxyXFxuXFxyXFxuLmZlYXR1cmUtY2hlY2stYm94IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZH5sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmNoZWNrZWR+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJ1xcXFwyNzE0JztcXHJcXG4gICAgdGV4dC1pbmRlbnQ6IC45ZW07XFxyXFxuICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3ggaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpmb2N1c35sYWJlbDpiZWZvcmUsIC5mZWF0dXJlLWNoZWNrLWJveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmZvY3VzfmxhYmVsOmJlZm9yZSB7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCAjOTk5O1xcclxcbn1cXHJcXG5cXHJcXG4uZmVhdHVyZS1jaGVjay1ib3gtZGVmYXVsdCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWR+bGFiZWw6YmVmb3JlLCAuZmVhdHVyZS1jaGVjay1ib3gtZGVmYXVsdCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmNoZWNrZWR+bGFiZWw6YmVmb3JlIHtcXHJcXG4gICAgY29sb3I6ICMzMzM7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi8qIFNWRyBlbGVtZW50cyBhbmQgdGV4dCAqL1xcclxcblxcclxcbi5zdmctY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAvKiBhc3BlY3QgcmF0aW8gKi9cXHJcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5zdmctY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3ZnLWNvbnRlbnQtbGVnZW5kIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMTBweDtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN2Zy1sZWdlbmRDb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgLyogZGVwZW5kcyBvbiBzdmcgcmF0aW8gKi9cXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDEwJTtcXHJcXG4gICAgLyogYXNwZWN0IHJhdGlvICovXFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5zdmctTGluZUNoYXJ0Q29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIC8qIGRlcGVuZHMgb24gc3ZnIHJhdGlvICovXFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiAxNyU7XFxyXFxuICAgIC8qIGFzcGVjdCByYXRpbyAqL1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF4aXMgcGF0aCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5heGlzIGxpbmUge1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4zO1xcclxcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XFxyXFxufVxcclxcblxcclxcbi54IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi55IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5heGlzTGluZUNoYXJ0IHBhdGggbGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG4gICAgc2hhcGUtcmVuZGVyaW5nOiBjcmlzcEVkZ2VzO1xcclxcbn1cXHJcXG5cXHJcXG4ubGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUaW1lICAqL1xcclxcblxcclxcbi5mcmFtZVRleHQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4xO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTbGlkZXIgdGlja3MgICovXFxyXFxuXFxyXFxuLnVpLXNsaWRlci10aWNrIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjMzM3YWI3O1xcclxcbiAgICBoZWlnaHQ6IDAuOGVtO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbi8qIExhb2RpbmcgZ2lmICAgKi9cXHJcXG5cXHJcXG4jbG9hZGluZyB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIENvbG9yIGxlZ2VuZCAgICAqL1xcclxcblxcclxcbi5sZWdlbmQge1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZ2VuZFRleHQge1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxyXFxufVxcclxcblxcclxcbi5saW5lQ2hhcnRsZWdlbmRUZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLnRpbWVMaW5lIHtcXHJcXG4gICAgZmlsbDogbm9uZTtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1cHg7XFxyXFxuICAgIHN0cm9rZTogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLypzd2FybSBmZWF0dXJlcyAqL1xcclxcblxcclxcbi5jZW50cm9pZCB7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbiAgICBzdHJva2Utd2lkdGg6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1lZG9pZCB7XFxyXFxuICAgIGZpbGw6ICNlNzI5OGEgIWltcG9ydGFudDtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5odWxsUGF0aCB7XFxyXFxuICAgIGZpbGw6ICNmZmY7XFxyXFxuICAgIGZpbGwtb3BhY2l0eTogMDtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAzO1xcclxcbiAgICBzdHJva2U6ICMyNTI1MjU7XFxyXFxuICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5kZWxhdW5heVRyaWFuZ3VsYXRpb24ge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC40O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZSB7XFxyXFxuICAgIC1hbmltYXRpb246IHNwaW4gLjdzIGluZmluaXRlIGxpbmVhcjtcXHJcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4yIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxufVxcclxcblxcclxcbkAtd2Via2l0LWtleWZyYW1lcyBzcGluMiB7XFxyXFxuICAgIGZyb20ge1xcclxcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICB0byB7XFxyXFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBzcGluIHtcXHJcXG4gICAgZnJvbSB7XFxyXFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICB0byB7XFxyXFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kLWNvbG9yIHNwYW4uZ2x5cGhpY29uIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3IgLmJ0biB7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogI2JkYmRiZDtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tncm91bmQtY29sb3IgLmFjdGl2ZSBzcGFuLmdseXBoaWNvbiB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVxcclxcblxcclxcbiNidG4tZ3JleTEge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZDlkOWQ5O1xcclxcbn1cXHJcXG5cXHJcXG4jYnRuLWdyZXkyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzk2OTY5NjtcXHJcXG59XFxyXFxuXFxyXFxuI2J0bi1kYXJrIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzRkNGQ0ZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29sb3IgYnJld2VyIHBpY2tlciBkaXYgKi9cXHJcXG5cXHJcXG4ucGFsZXR0ZSB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgZGlzcGxheTogdGFibGU7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxyXFxuICAgIG1hcmdpbjogNHB4IDAgNHB4IDRweDtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTtcXHJcXG59XFxyXFxuXFxyXFxuLnN3YXRjaCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gICAgd2lkdGg6IDIycHg7XFxyXFxuICAgIGhlaWdodDogMjJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnZvcm9ub2kge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMztcXHJcXG4gICAgc3Ryb2tlOiAjMDAwO1xcclxcbiAgICBzdHJva2Utb3BhY2l0eTogMC4yO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNpcmNsZSB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNnB4IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDI5O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNpcmNsZS5idG4tbGcge1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBwYWRkaW5nOiAxM3B4IDEzcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMzM7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi8qIFRvb2x0aXAgKi9cXHJcXG5cXHJcXG5kaXYudG9vbHRpcCB7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDI1NSkgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICMxYjgwOWUgIWltcG9ydGFudDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXHJcXG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcblxcclxcbmRpdi50b29sdGlwIHRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi5saW5lQ2hhcnRDaGVja0JveC5kaXNhYmxlZCB7XFxyXFxuICAgIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJPdXRlckFyZWEsIC5sb3dlck91dGVyQXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzc0YTljZjtcXHJcXG4gICAgc3Ryb2tlOiAjMzY5MGMwO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJJbm5lckFyZWEsIC5sb3dlcklubmVyQXJlYSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgZmlsbDogIzA0NWE4ZDtcXHJcXG4gICAgc3Ryb2tlOiAjMDIzODU4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFuTGluZSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHN0cm9rZTogIzUyNTI1MjtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiA1O1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0ZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjOTk5O1xcclxcbiAgICBib3JkZXI6IDRweCBzb2xpZCAjNGQ0ZDRkO1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDFweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjQpO1xcclxcbn1cXHJcXG5cXHJcXG4uem9vbSB7XFxyXFxuICAgIGZpbGw6IG5vbmU7XFxyXFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxyXFxufVxcclxcblxcclxcbi54LmF4aXNMaW5lQ2hhcnQ+Zz50ZXh0IHtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcXHJcXG59XFxyXFxuXFxyXFxuLmFycm93IHtcXHJcXG4gICAgc3Ryb2tlLXdpZHRoOiAxO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtbGluZSB7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMTtcXHJcXG4gICAgc3Ryb2tlOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4jY2VudHJvaWQtYXJyb3cge1xcclxcbiAgICBmaWxsOiAjZTcyOThhO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kLWxpc3Qge1xcclxcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQge1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IHRoaWNrIHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgc3BhbiB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAzZW07XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlcjogdGhpY2sgc29saWQgd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgbWFyZ2luLXRvcDogLTYwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODYwOTA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAubW9kLWhlYWQgaDIge1xcclxcbiAgICBtYXJnaW4tdG9wOiA3cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxyXFxufVxcclxcblxcclxcbi5tb2QtbGlzdCAudDIgLm1vZC1oZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZC1saXN0IC5jbG9zZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWhlYWRlciB7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZTVlNWU1O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtc3dhdGNoLWNsaWNrYWJsZTpob3ZlciB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRyb3Bkb3duLW1lbnUge1xcclxcbiAgICBtaW4td2lkdGg6IDQwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI21ldGFkYXRhLWlucHV0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweCA1cHggNXB4O1xcclxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDVweCA1cHggNXB4IDVweDtcXHJcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQge1xcclxcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWV0YWRhdGEtbGVnZW5kIGxpIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1ldGFkYXRhLWxlZ2VuZCBzcGFuIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzY2NjtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmJsLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZmM5N2Y7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGMwODY7XFxyXFxufVxcclxcblxcclxcbi5tZXRhZGF0YS1sZWdlbmQgLmFiLWF2ZyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODZjYjA7XFxyXFxufVxcclxcblxcclxcbi5uZXR3b3JrRWRnZXMge1xcclxcbiAgICBmaWxsLW9wYWNpdHk6IDA7XFxyXFxuICAgIHN0cm9rZS13aWR0aDogMjtcXHJcXG59XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL2V4cGxvcmUvZXhwbG9yZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9