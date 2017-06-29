/*eslint-disable no-unused-lets*/
/*global window, animalNameSpace, d3, $*/

'use strict';

/**
 * Create a namespace to minimize global variables
 * Code is in a closure and manually expose only those
 * variables that need to be global.
 */
animalNameSpace.lineChart = function() {

    let self = this;
    /**
     * Draw the line chart for the averaged swarm features
     *
     */
    let swarm_features = Object.keys(self.swarmData[0]);
    // remove the time key
    let index = swarm_features.indexOf('time');
    swarm_features.splice(index, 1);

    // add the Line chart buttons to the feature panel
    for (let i = 0; i < swarm_features.length; i++) {
        let capitalized_feature_string = swarm_features[i].split('_').join(' ');
        capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

        $('.featureCheckBox').append(`<div class="featureCheckBox-default lineChartCheckBox">
                                       <input id="drawSwarm` + swarm_features[i] + `" class="lineChartButton" type="checkbox">
                                       <label for="drawSwarm` + swarm_features[i] + '">' + capitalized_feature_string + `</label>
                     </div>`);
    }
    //check line chart draw all lines
    $('.lineChartButton')
        .prop('checked', true);

    let lineChartData = [];
    let ratio = 1;
    // aggregate and average the swarm data to 5000 points in the line chart
    if (self.swarmData.length > 5000) {
        ratio = Math.ceil(self.swarmData.length / 5000);
        // tmp array for the aggregated and averaged features
        let tmp = new Array(swarm_features.length).fill(0);

        for (let i = 0; i < self.swarmData.length; i++) {
            // aggregate the features in the temp array
            for (let j = 0; j < swarm_features.length; j++) {
                tmp[j] += self.swarmData[i][swarm_features[j]];
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
        lineChartData = self.swarmData;
    }

    // Swarm features line chart
    let lineChartHeight = 500; // the line chart height
    let margin = {
        top: 10,
        right: 0,
        bottom: 100,
        left: 10
    };
    let marginToLegend = 50;

    // x axis scale - minus marginLineChart  needed
    let x = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartData.length]);
    let x2 = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartData.length]);
    // define where the axis is etc
    let xAxis = d3.axisBottom(x)
        .ticks(function() {
            if (ratio === 1 && self.swarmData.length < 1000) {
                return 0;
            } else if (ratio === 1 && self.swarmData.length < 3000) {
                return 5;
            }
            return 10;
        }())
        .tickSize(10)
        .tickPadding(5);

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
        if (coords[0] < margin.left || coords[0] > lineChartData.length || coords[1] < 0 || coords[1] > lineChartHeight) {
            return;
        }
        // tmp scale to include the zoom factor
        let tmpScale = d3.scaleLinear()
            .domain(self.zoomFunction.range())
            .range(self.zoomFunction.domain());
        // set the new time
        self.indexTime = Math.floor((tmpScale(coords[0] - margin.left)) * ratio);
    };
    let trendChartsZoom = {};
    let zoomGroup;
    let zoom = d3.zoom()
        .scaleExtent([1, 20])
        .translateExtent([
            [0, 0],
            [lineChartData.length, lineChartHeight]
        ])
        .extent([
            [0, 0],
            [lineChartData.length, lineChartHeight]
        ])
        .on('zoom', function() {
            // get the transform factor
            let t = d3.event.transform;
            // change scaling function
            self.zoomFunction = x.domain(t.rescaleX(x2).domain());
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
    let swarmLineChart = d3.select('#swarmVis')
        .classed('svg-LineChartContainer', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')

        .attr('viewBox', function() {
            if (lineChartData.length < 4000) {
                return '0 0 ' + 4000 + ' ' + (lineChartHeight + margin.bottom);
            } else {
                return '0 0 ' + lineChartData.length + ' ' + (lineChartHeight + margin.bottom);
            }
        })
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
        .attr('width', lineChartData.length)
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
            let spacing = 800;
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
        } else if (elem['id'].toLowerCase().includes('distancecentroid')) {
            feature = 'distance_centroid';
        } else {
            return;
        }
        // data is not loaded fully -- return
        if (!self.dataset[0][feature]) {
            return;
        }
        // change to the trend chart legend
        $('#lineChartLegend').hide();
        $('#trendChartLegend').show();
        // check if already computed and only hidden
        if (!$(('#' + feature + 'TrendChart')).length) {
            // get the data for the trend chart
            let trendChartData = [];
            // calculate the percetiles for every time step
            for (let i = 0; i < self.swarmData.length; i++) {
                let tmp = [];
                for (let j = 0; j < self.num_animals; j++) {
                    if (self.dataset[i * self.num_animals + j]) {
                        tmp.push(self.dataset[i * self.num_animals + j][feature]);
                    }
                }
                trendChartData.push(percentiles(tmp));
            }
            //aggregate and average the trendChartData to 500 data points
            if (trendChartData.length > 5000) {
                let tmpTrendChartData = [];
                ratio = Math.ceil(trendChartData.length / 5000);

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

};
