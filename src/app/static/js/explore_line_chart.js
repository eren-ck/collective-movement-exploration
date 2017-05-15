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
    let lineChartData = [];
    let ratio = 1;
    // aggregate and average the swarm data to 5000 points in the line chart
    if (self.swarmData.length > 5000) {
        ratio = Math.ceil(self.swarmData.length / 5000);
        // tmp array with index 0 = acceleration, 1= convex_hull_area, 2 = speed
        let tmp = [0, 0, 0];

        for (let i = 0; i < self.swarmData.length; i++) {
            tmp[0] += self.swarmData[i]['acceleration'];
            tmp[1] += self.swarmData[i]['convex_hull_area'];
            tmp[2] += self.swarmData[i]['speed'];
            if (i % ratio === 0) {
                tmp[0] = tmp[0] / ratio;
                tmp[1] = tmp[1] / ratio;
                tmp[2] = tmp[2] / ratio;

                lineChartData.push({
                    'acceleration': tmp[0],
                    'convex_hull_area': tmp[1],
                    'speed': tmp[2],
                    'time': i / ratio
                });
                tmp[0] = 0;
                tmp[1] = 0;
                tmp[2] = 0;
            }
        }
    } else {
        lineChartData = self.swarmData;
    }

    // Swarm features line chart
    let lineChartHeight = 500; // the line chart height
    let marginLineChart = 60; // the margin to the right side

    // x axis scale - minus marginLineChart  needed
    let xLineChart = d3.scaleLinear()
        .domain([0, lineChartData.length])
        .range([0, lineChartData.length - marginLineChart]);
    // define where the axis is etc
    let xAxisLineChart = d3.axisBottom(xLineChart)
        .ticks(0)
        .tickSize(10)
        .tickPadding(5);

    // y axis scale which is normalized
    let yLineChart = d3.scaleLinear()
        .domain([0, 100])
        .range([lineChartHeight, 0]);
    // define where the axis is etc
    let yAxisLineChart = d3.axisLeft(yLineChart)
        .ticks(0)
        .tickSize(10)
        .tickPadding(5);

    let dragged = function() {
        let coords = d3.mouse(this);
        if (coords[0] < marginLineChart || coords[0] > lineChartData.length || coords[1] < 0 || coords[1] > lineChartHeight) {
            return;
        }
        self.indexTime = Math.floor((coords[0] - marginLineChart) * ratio);
        // if (!$('#playButton').hasClass('active')) {
        //     //this applys the changes
        //     draw();
        // }
    };
    // make the svg resizable
    let swarmLineChart = d3.select('#swarmVis')
        .classed('svg-LineChartContainer', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')

        .attr('viewBox', function() {
            if (lineChartData.length < 3000) {
                return '0 0 ' + 3000 + ' ' + (lineChartHeight + marginLineChart);
            } else {
                return '0 0 ' + lineChartData.length + ' ' + (lineChartHeight + marginLineChart);
            }
        })
        // add the class svg-content
        .classed('svg-content', true)
        .on('click', dragged)
        .call(d3.drag()
            .on('drag', dragged)
        );

    //append a group for the x axis
    swarmLineChart.append('g')
        .attr('class', 'x axisLineChart')
        .attr('transform', 'translate(' + marginLineChart + ',' + lineChartHeight + ')')
        .call(xAxisLineChart);

    // append a group for the y axis
    swarmLineChart.append('g')
        .attr('class', 'y axisLineChart')
        .attr('transform', 'translate(' + marginLineChart + ',0)')
        .call(yAxisLineChart);


    // the time line append the line
    swarmLineChart.append('line')
        .attr('class', 'timeLine')
        .attr('id', 'lineChartTimeLine')
        .attr('x1', marginLineChart)
        .attr('y1', 0)
        .attr('x2', marginLineChart)
        .attr('y2', lineChartHeight);

    // **
    // convexHullArea
    let min = d3.min(lineChartData, function(d) {
        return d['convex_hull_area'];
    });
    let max = d3.max(lineChartData, function(d) {
        return d['convex_hull_area'];
    });

    let normalizationScale = d3.scaleLinear().domain([min, max]).range([0, 100]);
    let line = d3.line()
        .x(function(d) {
            return xLineChart(d['time']);
        })
        .y(function(d) {
            return yLineChart(normalizationScale(d['convex_hull_area']));
        });
    //append the first line Convex Hull Area line
    swarmLineChart.append('path')
        .data([lineChartData])
        .attr('id', 'convexHullAreaLine')
        .attr('class', 'line lineChartLine')
        .attr('transform', 'translate(' + marginLineChart + ',0)')
        .style('stroke', '#1f78b4')
        .attr('d', line)
        .attr('name', 'Convex Hull Area');

    // **
    //second line speed
    min = d3.min(lineChartData, function(d) {
        return d['speed'];
    });
    max = d3.max(lineChartData, function(d) {
        return d['speed'];
    });

    normalizationScale = d3.scaleLinear().domain([min, max]).range([0, 100]);
    line = d3.line()
        .x(function(d) {
            return xLineChart(d['time']);
        })
        .y(function(d) {
            return yLineChart(normalizationScale(d['speed']));
        });

    swarmLineChart.append('path')
        .data([lineChartData])
        .attr('id', 'speedLine')
        .attr('class', 'line lineChartLine')
        .attr('transform', 'translate(' + marginLineChart + ',0)')
        .style('stroke', '#33a02c')
        .attr('d', line)
        .attr('name', 'Averaged Speed');

    // **
    // thrid line acceleration line
    min = d3.min(lineChartData, function(d) {
        return d['acceleration'];
    });
    max = d3.max(lineChartData, function(d) {
        return d['acceleration'];
    });

    normalizationScale = d3.scaleLinear().domain([min, max]).range([0, 100]);
    line = d3.line()
        .x(function(d) {
            return xLineChart(d['time']);
        })
        .y(function(d) {
            return yLineChart(normalizationScale(d['acceleration']));
        });

    swarmLineChart.append('path')
        .data([lineChartData])
        .attr('id', 'accelerationLine')
        .attr('class', 'line lineChartLine')
        .attr('transform', 'translate(' + marginLineChart + ',0)')
        .style('stroke', '#ff7f00')
        .attr('d', line)
        .attr('name', 'Averaged Acceleration');

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
        .attr('transform', 'translate(' + marginLineChart + ',' + lineChartHeight + ')')
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
        .attr('transform', 'translate(' + marginLineChart + ',' + lineChartHeight + ')')
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
     * Draw line chart convex hull area line
     */
    $('#drawSwarmConvexHullArea').click(function() {
        if ($('#drawSwarmConvexHullArea').is(':checked')) {
            $('#convexHullAreaLine')
                .attr('visibility', 'visible');
        } else {
            $('#convexHullAreaLine')
                .attr('visibility', 'hidden');
        }

    });

    /**
     * Draw line chart speed averaged line
     */
    $('#drawSwarmSpeed').click(function() {
        if ($('#drawSwarmSpeed').is(':checked')) {
            $('#speedLine')
                .attr('visibility', 'visible');
        } else {
            $('#speedLine')
                .attr('visibility', 'hidden');
        }
    });

    /**
     * Draw line chart acceleration averaged line
     */
    $('#drawSwarmAcceleration').click(function() {
        if ($('#drawSwarmAcceleration').is(':checked')) {
            $('#accelerationLine')
                .attr('visibility', 'visible');
        } else {
            $('#accelerationLine')
                .attr('visibility', 'hidden');
        }
    });
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
            let trendChart = swarmLineChart.append('g')
                .attr('id', (feature + 'TrendChart'))
                .attr('class', 'trendChartData')
                .attr('transform', 'translate(' + marginLineChart + ',0)');
            // functions for the upper and inner areas and the median
            var upperOuterArea = d3.area()
                .x(function(d, i) {
                    return xLineChart(i);
                })
                .y0(function(d) {
                    return yLineChart(normalizationScale(d[4]));
                })
                .y1(function(d) {
                    return yLineChart(normalizationScale(d[3]));
                });

            var upperInnerArea = d3.area()
                .x(function(d, i) {
                    return xLineChart(i);
                })
                .y0(function(d) {
                    return yLineChart(normalizationScale(d[3]));
                })
                .y1(function(d) {
                    return yLineChart(normalizationScale(d[2]));
                });

            var medianLine = d3.line()
                .x(function(d, i) {
                    return xLineChart(i);
                })
                .y(function(d) {
                    return yLineChart(normalizationScale(d[2]));
                });

            var lowerInnerArea = d3.area()
                .x(function(d, i) {
                    return xLineChart(i);
                })
                .y0(function(d) {
                    return yLineChart(normalizationScale(d[2]));
                })
                .y1(function(d) {
                    return yLineChart(normalizationScale(d[1]));
                });

            var lowerOuterArea = d3.area()
                .x(function(d, i) {
                    return xLineChart(i);
                })
                .y0(function(d) {
                    return yLineChart(normalizationScale(d[1]));
                })
                .y1(function(d) {
                    return yLineChart(normalizationScale(d[0]));
                });

            // add the paths to the line chart
            trendChart.append('path')
                .data([trendChartData])
                .attr('class', 'area upper outer')
                .attr('d', upperOuterArea);

            trendChart.append('path')
                .data([trendChartData])
                .attr('class', 'area lower outer')
                .attr('d', lowerOuterArea);

            trendChart.append('path')
                .data([trendChartData])
                .attr('class', 'area upper inner')
                .attr('d', upperInnerArea);

            trendChart.append('path')
                .data([trendChartData])
                .attr('class', 'area lower inner')
                .attr('d', lowerInnerArea);

            trendChart.append('path')
                .data([trendChartData])
                .attr('class', 'median-line')
                .attr('d', medianLine);

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
