/*eslint-disable no-unused-lets*/
/*global window, d3, $, parameters*/
import {
    setIndexTime,
} from './spatial_view/spatial_view.js';

import {
   Drawer
} from './spatial_view/drawer.js'

import {
    swarmData,
    dataset,
    animalIds
} from './explore.js';

import {
    percentilesLineChart
} from './helpers.js';

import {
    indexTime,
} from './spatial_view/spatial_view';

// Chart
let trendChartsZoom = {};

// Linechart Setup
let ratio = 1;
let zoomGroup;
let x;
let y;
export let zoomFunction;


class Chart extends Drawer {

    constructor(data) {
    super()
      // load in arguments from config object
    this.swarmData = data;
    this.swarm_features = Object.keys(this.swarmData[0]);
    this.lineChartWidth = 5000;
    this.trendChartsElem = ['lower-outer-area', 'lower-inner-area', 'median-line', 'upper-inner-area', 'upper-outer-area'];
    }


        /**
     * init the line chart and also the trend chart
     */


}

export class LineChart extends Chart {
    constructor(data){
    super(data)
    this.lineChart();

    }

    lineChart() {

      ratio = Math.ceil(this.swarmData.length / this.lineChartWidth);

      // Swarm features line chart
      let lineChartHeight = 500; // the line chart height
      let margin = {
          top: 10,
          right: 0,
          bottom: 100,
          left: 10
      };
      let marginToLegend = 50;

      let swarm_features = this.swarm_features;
      // remove the time key
      let index = swarm_features.indexOf('time');
      swarm_features.splice(index, 1);

      let lineChartData = [];
      // aggregate and average the swarm data to this.lineChartWidth points in the line chart
      if (this.swarmData.length > this.lineChartWidth) {
          // tmp array for the aggregated and averaged features
          let tmp = new Array(swarm_features.length).fill(0);

          for (let i = 0; i < this.swarmData.length; i++) {
              // aggregate the features in the temp array
              for (let j = 0; j < swarm_features.length; j++) {
                  tmp[j] += this.swarmData[i][swarm_features[j]];
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
          lineChartData = this.swarmData;
      }
      //console.log(lineChartData);
      zoomFunction = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);


      // x axis scale - minus marginLineChart  needed
      x = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);
      let x2 = d3.scaleLinear()
          .domain([0, lineChartData.length])
          .range([0, this.lineChartWidth]);
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

      let dragged = ()=>{
          // dragged function get the coordinates and calculate the time moment from this
          let coords = d3.mouse(this);
          if (coords[0] < margin.left || coords[0] > this.lineChartWidth || coords[1] < 0 || coords[1] > lineChartHeight) {
              return;
          }
          // tmp scale to include the zoom factor
          let tmpScale = d3.scaleLinear()
              .domain(zoomFunction.range())
              .range(zoomFunction.domain());
          // set the new time
          this.setIndexTime(Math.floor((tmpScale(coords[0] - margin.left)) * ratio));
      };
      let zoom = d3.zoom()
          .scaleExtent([1, 20])
          .translateExtent([
              [0, 0],
              [this.lineChartWidth, lineChartHeight]
          ])
          .extent([
              [0, 0],
              [this.lineChartWidth, lineChartHeight]
          ])
          .on('zoom', ()=>{
              console.log('zooms');
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
                      for (let i = 0; i < this.trendChartsElem.length; i++) {
                          zoomGroup
                              .select(('#' + key + 'TrendChart .' + this.trendChartsElem[i]))
                              .attr('d', trendChartsZoom[key][this.trendChartsElem[i]]);
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

          .attr('viewBox', '0 0 ' + this.lineChartWidth + ' ' + (lineChartHeight + margin.bottom))
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
              .attr('width', this.lineChartWidth)
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

      this.initLineChartButtons()


  }

  /**
   * Init line chart button listeners
   */
  initLineChartButtons() {
      // add the Line chart buttons to the feature panel
      for (let i = 0; i < this.swarm_features.length; i++) {
          let capitalized_feature_string = this.swarm_features[i].split('_').join(' ');
          capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);

          $('#line-chart-feature-checkboxes')
              .append('<tr><th> <div class="pretty p-switch p-fill p-bigger"><input type="checkbox" class="line-chart-check-box" id="draw-' +
                  this.swarm_features[i] + '" data="#' + this.swarm_features[i] + 'Line" /><div class="state"><label>' +
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


}

/**
 * Add a trend chart showing median and percentiles
 * // - which feature
 */
export class TrendChart extends Chart{
    constructor(elem, swarmData){
      super(swarmData);
      this.elem = elem;

      this.trendchart();
      //this.disableLineChart();

    }

    disableLineChart() {
        $('.lineChartButton').prop('checked', false).prop('disabled', true);
        $('.line-chart-check-box').attr('disabled', true);
        $('.lineChartLine').attr('visibility', 'hidden');
    }


    trendchart(){
    // check which feature to display in the trend chart
    let feature = '';
    if (this.elem['id'].toLowerCase().includes('speed')) {
        feature = 'speed';
    } else if (this.elem['id'].toLowerCase().includes('acceleration')) {
        feature = 'acceleration';
    } else if (this.elem['id'].toLowerCase().includes('distance_centroid')) {
        feature = 'distance_centroid';
    } else if (this.elem['id'].toLowerCase().includes('midline_offset')) {
        feature = 'midline_offset';
    } else {
        return;
    }
    // data is not loaded fully -- return
    //if (!dataset[0][feature]) {
    //    return;
    //}
    // change to the trend chart legend
    $('#lineChartLegend').hide();
    $('#trendChartLegend').show();
    // check if already computed and only hidden
    if (!$(('#' + feature + 'TrendChart')).length) {
        // get the data for the trend chart
        let trendChartData = [];
        let num_animals = animalIds.length;
        // calculate the percetiles for every time step
        for (let i = 0; i < swarmData.length; i++) {
            let tmp = [];
            for (let j = 0; j < num_animals; j++) {
                if (dataset[i * num_animals + j]) {
                    tmp.push(dataset[i * num_animals + j][feature]);
                }
            }
            trendChartData.push(percentilesLineChart(tmp));
        }
        //aggregate and average the trendChartData to this.lineChartWidth data points
        if (trendChartData.length > this.lineChartWidth) {
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

        for (let i = 0; i < this.trendChartsElem.length; i++) {
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
            trendChartsZoom[feature][this.trendChartsElem[i]] = temp;
            // append it to the path
            trendChart.append('path')
                .data([trendChartData])
                .attr('class', this.trendChartsElem[i])
                .attr('d', temp);
        }
    } else {
        // show the trend chart
        $(('#' + feature + 'TrendChart')).show();
    }
}
}
