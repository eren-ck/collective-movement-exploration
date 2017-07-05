/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, Set, colorbrewer, animalNameSpace, JSONAPI_MIMETYPE */

'use strict';

/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
animalNameSpace.spatialView = function() {

    let self = this;
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
    let lineChartRatio = Math.ceil(self.swarmData.length / 5000);
    let arrayAnimals;
    let activeAnimals = []; // active selected animals
    let brush; // brushing variable
    let metadataColor = {}; // save the metadata coloring

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
            $('#mainVis').draggable({
                    containment: 'parent'
                }).resizable({
                    aspectRatio: true,
                }).height(tankHeight * 0.5)
                .width(tankWidth * 0.5);

        });

        //reset all checkboxes
        $('input[type=checkbox]')
            .attr('checked', false);
        //set the color scale function to linear
        $('#colorScaleLinear')
            .prop('checked', true);
        $('#group-size-m')
            .prop('checked', true);
        $('#background-white')
            .prop('checked', true);
        $('#settingsDiv input[type=checkbox]')
            .prop('checked', true);
        //hide the loading gif
        $('#loading')
            .hide();

        // number of distinct animal ids
        let num_animals = new Set();
        for (let i = 0; i < self.dataset.length; i++) {
            if (self.dataset[i]['t'] === self.dataset[0]['t']) {
                num_animals.add(self.dataset[i]['a']);
            } else {
                i = self.dataset.length;
            }
        }
        self.num_animals = num_animals.size;

        // initialize the slider
        $slider = $('#slider')
            .slider({
                min: 0,
                max: self.swarmData.length,
                step: 25,
                slide: function(event, ui) {
                    self.indexTime = ui.value;
                    // if paused apply changes
                    if (!$('#playButton').hasClass('active')) {
                        //this applys the changes
                        draw();
                    }
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
        svgContainer = d3.select('#mainVis')
            .classed('svg-container', true)
            // to make it responsive with css
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '0 0 ' + tankWidth + ' ' + tankHeight)
            // add the class svg-content
            .classed('svg-content', true)
            .attr('id', 'mainVis-svg')
            .call(zoom);


        /* depends on svg ratio, for  1240/1900 = 0.65 so padding-bottom = 65% */
        let percentage = Math.ceil((tankHeight / tankWidth) * 100);
        $('#mainVis').append($('<style>#mainVis::after {padding-top: ' + percentage + '%;display: block;content: "";}</style> '));

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

        //append delaunayTriangulation group
        tank.append('g')
            .attr('id', 'delaunayTriangulationGroup');

        //append voronoi group
        tank.append('g')
            .attr('id', 'vornoiGroup');

        // group for the legend
        svgLegend = d3.select('#divLegend')
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
        self.zoomFunction = d3.scaleLinear()
            .domain([0, self.swarmData.length])
            .range([0, self.swarmData.length]);

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
                if (!$('#playButton')
                    .hasClass('active')) {
                    //go back one second and draw the next frame
                    //this applys the changes
                    self.indexTime--;
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

        //Draw the fish swarm line chart
        self.lineChart();

        draw();

    }


    /**
     * Drawing function - is called for each timestep
     * self.indexTime saves the current time
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
        arrayAnimals = self.dataset.slice(self.num_animals * self.indexTime, self.num_animals * self.indexTime + self.num_animals);

        //the timeout is set after one update 30 ms
        setTimeout(function() {
                //change the time frame text
                svgContainer.select('.frameText')
                    .text(Math.floor(self.indexTime / 1500) % 60 + ':' + Math.floor(self.indexTime / 25) % 60 + '::' + self.indexTime % 25);
                // if a second has changed move the slider
                if (self.indexTime % parameters['fps'] === 0) {
                    $slider.slider('value', self.indexTime);
                }

                let svgAnimals = tank.selectAll('g.animal')
                    .data(arrayAnimals);

                // let svgAnimals = tank.selectAll('circle.animal')
                //     .data(arrayAnimals);

                // delaunay triangulation
                // DATA JOIN  - triangulation
                var triangulation;
                if ($('#drawTriangulation')
                    .is(':checked')) {
                    triangulation = tank.select('#delaunayTriangulationGroup')
                        .selectAll('path.delaunayTriangulation')
                        .data([self.swarmData[self.indexTime]['triangulation']]);

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
                if ($('#drawVoronoi')
                    .is(':checked')) {
                    //append the group for the voronoi paths
                    voronoi = tank
                        .select('#vornoiGroup')
                        .selectAll('path.voronoi')
                        .data(self.swarmData[self.indexTime]['voronoi'].split(';'));


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
                        if (!$('#playButton')
                            .hasClass('active')) {
                            //go back one second and draw the next frame
                            //this applys the changes
                            self.indexTime--;
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
                if ($('#drawDirection')
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
                if ($('#drawConvexHull')
                    .is(':checked')) {
                    // DATA JOIN - paths
                    var hullPath = tank.selectAll('path.hullPath')
                        .data([self.swarmData[self.indexTime]['hull']]);

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
                    if ($('#removeActiveSelectedButton')
                        .is(':disabled')) {
                        $('#removeActiveSelectedButton')
                            .prop('disabled', false);
                    }
                } else {
                    if (!$('#removeActiveSelectedButton')
                        .is(':disabled')) {
                        $('#removeActiveSelectedButton')
                            .prop('disabled', true);
                    }
                    // normal opacity
                    svgAnimals
                        .style('opacity', 1);
                }

                //draw centroid
                d3.select('.centroid')
                    .attr('cx', function() {
                        if ('centroid' in self.swarmData[0]) {
                            return self.swarmData[self.indexTime]['centroid'][0];
                        } else {
                            return 0;
                        }
                    })
                    .attr('cy', function() {
                        if ('centroid' in self.swarmData[0]) {
                            return -self.swarmData[self.indexTime]['centroid'][1];
                        } else {
                            return 0;
                        }
                    });
                if ($('#drawDirection')
                    .is(':checked') && self.swarmData[self.indexTime].centroid) {
                    d3.select('#centroid-line')
                        .classed('hidden', false);
                    // UPDATE animal direction arrow
                    d3.select('#centroid-line')
                        .attr('x1', function() {
                            return self.swarmData[self.indexTime]['centroid'][0];
                        })
                        .attr('y1', function() {
                            return -self.swarmData[self.indexTime]['centroid'][1];
                        })
                        .attr('x2', function() {
                            return (self.swarmData[self.indexTime]['centroid'][0] + 2 * animalScale);
                        })
                        .attr('y2', function() {
                            return -self.swarmData[self.indexTime]['centroid'][1];
                        })
                        .attr('transform', function() {
                            return 'rotate(' + -self.swarmData[self.indexTime]['direction'] + ' ' + self.swarmData[self.indexTime]['centroid'][0] + ' ' + -self.swarmData[self.indexTime]['centroid'][1] + ')';
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
                    medoidAnimal = self.swarmData[self.indexTime]['medoid'];
                    d3.selectAll('#animal-' + medoidAnimal)
                        .classed('medoid', true);
                }

                //next frame
                self.indexTime++;

                if (d3.select('#lineChartTimeLine') && self.swarmData[Math.ceil(self.indexTime / lineChartRatio)]) {
                    let tmp = Math.ceil(self.indexTime / lineChartRatio);
                    //update the line chart legend text values per second
                    if (self.indexTime % 25 === 0) {
                        // TODO change this to a more modular way
                        d3.select('#convex_hull_areaLineValue')
                            .text((self.swarmData[tmp]['convex_hull_area']) + 'mm²');
                        d3.select('#speedLineValue')
                            .text(self.swarmData[tmp]['speed'] + 'mm/s');
                        d3.select('#accelerationLineValue')
                            .text(self.swarmData[tmp]['acceleration'] + 'mm/s²');
                        d3.select('#distance_centroidLineValue')
                            .text(self.swarmData[tmp]['distance_centroid'] + 'mm');
                        d3.select('#directionLineValue')
                            .text(self.swarmData[tmp]['direction'] + '°');
                        d3.select('#polarisationLineValue')
                            .text(self.swarmData[tmp]['polarisation']);
                    }

                    // if () {
                    //     lineTimeScale = d3.scaleLinear()
                    //         .domain([0, self.swarmData.length])
                    //         .range([0, self.swarmData.length]);
                    // } else {
                    //     lineTimeScale = d3.scaleLinear()
                    //         .domain([0, self.swarmData.length])
                    //         .range([0, self.swarmData.length]);
                    // }
                    d3.select('#lineChartTimeLine')
                        .attr('transform', 'translate(' + self.zoomFunction(tmp) + ',0)');
                }


                //check if play button is active and if the animation is not finished
                if (self.indexTime >= self.swarmData.length) {
                    //start again from the start
                    self.indexTime = 0;
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
    $('#playButton').click(function() {
        if ($('#playButton').hasClass('active') === true) {
            playBoolean = false;
        } else {
            playBoolean = true;
            self.indexTime = $slider.slider('value');
            $('.brush').remove();
            draw();
        }
    });

    /**
     * Pause the animation and show only the next frame
     */
    $('#nextFrameButton').click(function() {
        if ($('#playButton').hasClass('active') === true) {
            playBoolean = false;
        }
        $('#playButton').removeClass('active');
        draw();
    });

    /**
     * Draw Speed button
     */
    $('#drawSpeed').click(function() {
        if ($('#drawSpeed').is(':checked')) {
            // load absolute feature speed data once
            if (!('speed' in self.dataset[0])) {
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
                        for (let i = 0; i < self.dataset.length; i++) {
                            self.dataset[i]['speed'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#drawSpeedDetails').removeClass('hidden');
            $('#drawAcceleration').prop('checked', false);
            $('#drawDistanceCentroid').prop('checked', false);
            activeScale = 'speed';
        } else {
            $('#drawSpeedDetails').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#playButton').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
            draw();
        }
    });

    /**
     * Draw acceleration button
     */
    $('#drawAcceleration').click(function() {
        if ($('#drawAcceleration').is(':checked')) {
            // load absolute feature acceleration data once
            if (!('acceleration' in self.dataset[0])) {
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
                        for (let i = 0; i < self.dataset.length; i++) {
                            self.dataset[i]['acceleration'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#drawAccelerationDetails').removeClass('hidden');
            $('#drawSpeed').prop('checked', false);
            $('#drawDistanceCentroid').prop('checked', false);
            activeScale = 'acceleration';
        } else {
            $('#drawAccelerationDetails').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#playButton').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
            draw();
        }
    });

    /**
     * Draw distance to centroid button
     */
    $('#drawDistanceCentroid').click(function() {
        if ($('#drawDistanceCentroid').is(':checked')) {
            // load absolute feature distance_centroid data once
            if (!('distance_centroid' in self.dataset[0])) {
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
                        for (let i = 0; i < self.dataset.length; i++) {
                            self.dataset[i]['distance_centroid'] = +data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            $('.draw-details').addClass('hidden');
            $('#drawDistanceCentroidDetails').removeClass('hidden');
            $('#drawSpeed').prop('checked', false);
            $('#drawAcceleration').prop('checked', false);
            activeScale = 'distance_centroid';
        } else {
            $('#drawDistanceCentroidDetails').addClass('hidden');
            activeScale = 'black';
        }
        $('.draw-details.active').click();
        //change color legend
        d3.selectAll('.colorLegend *').remove();
        changeLegend();

        if (!$('#playButton').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
            draw();
        }
    });

    /**
     * Draw direction arrow of the animal
     */
    $('#drawDirection').click(function() {
        if ($('#drawDirection').is(':checked')) {
            // load absolute feature speed data once
            if (!('direction' in self.dataset[0])) {
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
                        for (let i = 0; i < self.dataset.length; i++) {
                            self.dataset[i]['direction'] = +data[i];
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
        if (!$('#playButton').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
            draw();
        }
    });

    /**
     * Draw medoid in color button
     */
    $('#drawMedoid').click(function() {
        if ($('#drawMedoid').is(':checked')) {
            if (!('medoid' in self.swarmData[0])) {
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
                        for (let i = 0; i < self.swarmData.length; i++) {
                            self.swarmData[i]['medoid'] = data[i];
                        }
                        enablePlayButton();
                    }
                });

            }
            medoidAnimal = self.swarmData[self.indexTime]['medoid'];
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
    $('#drawCentroid').click(function() {
        if ($('#drawCentroid').is(':checked')) {
            if (!('centroid' in self.swarmData[0])) {
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
                        for (let i = 0; i < self.swarmData.length; i++) {
                            self.swarmData[i]['centroid'] = [Math.round(data[i][0] * 100) / 100, Math.round(data[i][1] * 100) / 100];
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
    $('#drawConvexHull').click(function() {
        if ($('#drawConvexHull').is(':checked')) {
            if (!('hull' in self.swarmData[0])) {
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
                        for (let i = 0; i < self.swarmData.length; i++) {
                            self.swarmData[i]['hull'] = data[i];
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
    $('#drawTriangulation').click(function() {
        if ($('#drawTriangulation').is(':checked')) {
            if (!('triangulation' in self.swarmData[0])) {
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
                        for (let i = 0; i < self.swarmData.length; i++) {
                            self.swarmData[i]['triangulation'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            if (!$('#playButton').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                self.indexTime--;
                draw();
            }
        }
    });


    /**
     * Draw triangulation
     */
    $('#drawVoronoi').click(function() {
        if ($('#drawVoronoi').is(':checked')) {
            if (!('voronoi' in self.swarmData[0])) {
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
                        for (let i = 0; i < self.swarmData.length; i++) {
                            self.swarmData[i]['voronoi'] = data[i];
                        }
                        enablePlayButton();
                    }
                });
            }
            if (!$('#playButton').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                self.indexTime--;
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
        for (var i = 0; i < self.num_animals; i++) {
            var point = [arrayAnimals[i]['p'][0], arrayAnimals[i]['p'][1]];
            //check which fish are in  the brushed area
            if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
                (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
                // Point is in the brush
                activeAnimals.push(arrayAnimals[i]['a']);
            }
        }
        if (!$('#playButton')
            .hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
            draw();
        }
        $('#brushingButton')
            .removeClass('active');
        // remove the brush
        $('.brush')
            .remove();
    }

    /**
     * Brushing button
     */
    $('#brushingButton').click(function() {
        //stop the animation
        playBoolean = false;
        $('#playButton').removeClass('active');
        if (!$('#brushingButton').hasClass('active')) {
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
    $('#removeActiveSelectedButton').click(function() {
        if (!$('#removeActiveSelectedButton').is(':disabled')) {
            $('#removeActiveSelectedButton').prop('disabled', true);
            activeAnimals = [];
            if (!$('#playButton').hasClass('active')) {
                //go back one second and draw the next frame
                //this applys the changes
                self.indexTime--;
                draw();
            }
        }
    });

    /**
     * Spatial view background color
     */
    $('#background-color').change(function() {
        let color = $('input[type="radio"].group-background:checked').val();
        $('#mainVis-svg').css('background-color', color);
    });

    /**
     * Show the spatial view axis button
     */
    $('#drawAxis').on('change', function() {
        if (this.checked) {
            $('#mainVis g.x.axis').show();
            $('#mainVis g.y.axis').show();
        } else {
            $('#mainVis g.x.axis').hide();
            $('#mainVis g.y.axis').hide();
        }

    });

    /**
     * Show the frame (time) number in the spatial view button
     */
    $('#drawTime').on('change', function() {
        if (this.checked) {
            $('#mainVis .frameText').show();
        } else {
            $('#mainVis .frameText').hide();
        }
    });

    /**
     * Tooltip function
     *
     */
    function tooltipFunction(d) {
        for (let i = 0; i < self.datasetMetadata.length; i++) {
            if (d['a'] === self.datasetMetadata[i]['animal_id']) {
                tooltip
                    .style('left', (d3.event.pageX + 5) + 'px')
                    .style('top', (d3.event.pageY - 100) + 'px')
                    .style('opacity', 1);
                // set the values
                tooltip.select('#tooltip-animal-id')
                    .html(self.datasetMetadata[i]['animal_id']);
                tooltip.select('#tooltip-species')
                    .html(self.datasetMetadata[i]['species']);
                tooltip.select('#tooltip-sex')
                    .html(self.datasetMetadata[i]['sex']);
                tooltip.select('#tooltip-size')
                    .html(self.datasetMetadata[i]['size']);
                tooltip.select('#tooltip-weight')
                    .html(self.datasetMetadata[i]['weight']);
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
                    self.dataSetPercentile[activeScale]
                )
                .range(colorScales['color']);
        } //Threshold color scale
        else if (colorScales['type'] === 'Threshold') {
            return d3.scaleThreshold()
                .domain(
                    self.dataSetPercentile[activeScale]
                )
                .range(colorScales['color']);
        }
    }

    /**
     * Color Scale Function Radio buttons
     */
    $('#colorScaleRadioForm input').on('change', function() {
        colorScales['type'] = $('input[name=colorScaleRadio]:checked', '#colorScaleRadioForm').val();
        if (!$('#playButton').hasClass('active')) {
            //go back one second and draw the next frame
            //this applys the changes
            self.indexTime--;
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
    $('#groupMetadata :input').change(function() {
        // reset the metadat acoloring
        resetIndividualMetadata();

        let value = $(this).attr('value');
        let tmp = [];

        // metadata sex is choosen - coloring based on m and f
        if (value === 'sex') {
            $('#metadataDiv').modal('toggle');
            // close and color here
            for (let i = 0; i < self.datasetMetadata.length; i++) {
                tmp.push(self.datasetMetadata[i][value].toLowerCase());
            }
            // create a set of individual strings in sex
            tmp = Array.from(new Set(tmp));
            let colors = ['#7fc97f', '#386cb0'];

            for (let i = 0; i < self.datasetMetadata.length; i++) {
                for (let j = 0; j < tmp.length; j++) {
                    if (self.datasetMetadata[i][value].toLowerCase() === tmp[j]) {
                        // add the coloring to the metadatacolor object
                        metadataColor[self.datasetMetadata[i]['animal_id']] = colors[j];
                    }
                }
            }
            $('#metadata-input').addClass('hidden');
        } else {
            $('#metadata-input').removeClass('hidden');
            // set values of inputs
            // here are automatically input values calculated
            // .25 and .75 percentiles are used
            for (let i = 0; i < self.datasetMetadata.length; i++) {
                tmp.push(self.datasetMetadata[i][value]);
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
        let value = $('#groupMetadata .btn.btn-default.active input')
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
     * Disable the play button --> Loading symbol
     *
     */
    function disablePlayButton() {
        playBoolean = false;
        $('#playButton').removeClass('active');
        $('#playButton').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
        $('#playButton').prop('disabled', true);
    }

    /**
     * Enable the play button remove loading symbol
     *
     */
    function enablePlayButton() {
        playBoolean = true;
        $('#playButton').addClass('active');
        $('#playButton').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>Play');
        $('#playButton').prop('disabled', false);
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

};
