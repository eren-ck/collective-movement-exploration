/*eslint-disable no-unused-lets*/
/*global window, $,d3, parameters, colorbrewer, Set */
'use strict';
import {
    dataset,
    networkData,
    swarmData,
    animalIds,
    datasetMetadata,
    setNetworkData,
    //setHierarchyData,
    dataSetPercentile,
    networkHierarchy
} from '../explore.js';

import {
    networkColorScale,
    networkAuto,
    setNetworLimit,
    networkLimit,
    showNetworkHierarchy,
    setnetworkColor,
    //setNetworkID
    // networkID,
    // networkBackground,
    // networkBackgroundLimit
} from '../network.js';



import {
    percentiles,
    makeResizable,
    defaultConfig,
    disablePlayButton,
    enablePlayButton,
    percentilesLineChart
} from '../helpers.js';

import {
    setTimeSlider,
    initTooltip,
    tooltipFunction,
    initSliders,
    tooltip,
    slider
} from './interaction.js';

import {
    metadataColor
} from '../metadata.js';



import {
    initListeners,

} from '../listener.js';

import {
    addSpatialViewGroup
} from './legend.js';

import {
    initDendrogramLegend,
    addHierarchyButton,
    removeHierarchyButton,
    colors,
    resethierarchyGroupStdev,
    hierarchyGroupStdev,
    maxNumberHierarchies,
    treemap,
    setOperation,
    //collapse,
    hierarchyLevels,
    diagonalLines,

} from '../hierarchy.js';

import {
    trackingBoolean,
    addTrackedData
} from '../visual_parameter.js';


import {
    getDatasetFeature,
    getNetworkData,
    getSwarmDatasetFeature
} from '../ajax_queries.js';

import {
    LineChart,
    TrendChart
} from '../line_chart.js'

import {
    Drawer
} from './drawer.js'

// Drawer Setup


// Chart
let trendChartsZoom = {};

// Linechart Setup
let ratio = 1;
let zoomGroup;
let x;
let y;
export let zoomFunction;






export class SpatialView extends Drawer{
  constructor(){
    super();
    this.firststeps();
    this.spatialViewInit();
    //this.cp_listener();
  }
  cp_listener() {

      /**
       * Play or stop the animation
       */
      $('#play-button').click(()=>{
          if ($('#play-button').hasClass('active') === true) {
              this.playBoolean = false;
              $('.mdi-pause').hide();
              $('.mdi-play').show();
          } else {
              this.playBoolean = true;
              $('.mdi-play').hide();
              $('.mdi-pause').show();
              this.setIndexTime(slider.slider('value'));
              $('.brush').remove();
              this.draw();
          }
      });

      /**
       * Pause the animation and show only the next frame
       */
      $('#next-frame-button').click(()=>{
          if ($('#play-button').hasClass('active') === true) {
              this.playBoolean = false;
          }
          $('#play-button').removeClass('active');
          this.draw();
      });

      /**
       * Brushing button
       */
      $('#brushing-button').click(()=>{
          //stop the animation

          this.playBoolean = false;
          $('#play-button').removeClass('active');
          if (!$('#brushing-button').hasClass('active')) {
              //define the brush
              this.brush = d3.brush()
                  .extent([
                      [0, 0],
                      [this.tankWidth, this.tankHeight]
                  ])
                  .on('end', ()=>{
                         //let arrayAnimals = this.arrayAnimals;
                         //let activeAnimals = this.activeAnimals;
                         var rect = d3.event.selection;
                         this.activeAnimals = [];

                         //iterate over the 151 fish to check which are in the brush

                         this.arrayAnimals.map((animal)=>{
                           var point = [animal['p'][0], animal['p'][1]];
                           //check which fish are in  the brushed area
                           if ((rect[0][0] <= point[0]) && (point[0] <= rect[1][0]) &&
                               (rect[0][1] <= point[1]) && (point[1] <= rect[1][1])) {
                               // Point is in the brush
                               this.activeAnimals.push(animal['a']);
                         }})
                         //setActiveAnimals(activeAnimals);



                         //this.setActiveAnimals(this.activeAnimals);
                         if (!$('#play-button')
                             .hasClass('active')) {
                             //go back one second and draw the next frame
                             //this applys the changes
                             //this.decIndexTime();
                             //SPV.draw();
                         }
                         $('#brushing-button')
                             .removeClass('active');
                         // remove the brush
                         $('.brush')
                             .remove();
                     });
              //add the brush
              d3.select('#main-vis-svg')
                  .append('g')
                  .attr('class', 'brush')
                  .call(this.brush);
          } else {
              // remove the brush
              $('.brush').remove();
          }
      });

      /**
       * Unselect all button
       */
      $('#remove-active-selected-button').click(()=>{
          if (!$('#remove-active-selected-button').is(':disabled')) {
              $('#remove-active-selected-button').prop('disabled', true);
              this.setActiveAnimals([]);
              // tracking of data for visual parameter suggestion
              resetTrackedData();
              $('#visual-parameter-button').prop('disabled', true).removeClass('active');

              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes

                  this.decIndexTime();
                  this.draw();
              }
          }
      });

      /**
       * Track visual parameter button
       */
      $('#visual-parameter-button').click(()=>{
          if ($('#visual-parameter-button').hasClass('active') === true) {
              setTrackingBoolean(false);
          } else {
              setTrackingBoolean(true);
          }
      });

      /**
       * Send the tracked via a ajax query to the server to calculate the parameters
       */
      $('#calculate-parameter-button').click(()=>{
          if (!$('#calculate-parameter-button').hasClass('active')) {
              setTrackingBoolean(false);
              sendTrackedData();

              // disable both buttons and remove the active one
              $('#calculate-parameter-button').prop('disabled', true);
              $('#calculate-parameter-button').removeClass('active');
              $('#visual-parameter-button').removeClass('active');
          }
      });

      /**
       * Spatial view background color
       */
      $('#background-color').change(()=>{
          let color = $('input[type="radio"].group-background:checked').val();
          $('#main-vis-svg').css('background-color', color);
      });

      /**
       * Show the spatial view axis button
       */
      $('#draw-axis').on('change', ()=> {
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
      $('#draw-time').on('change', ()=>{
          if (this.checked) {
              $('#main-vis .frame-text').show();
          } else {
              $('#main-vis .frame-text').hide();
          }
      });

      /**
       * Draw the network background color
       */
      $('#network-background').on('change', ()=> {
          if (this.checked) {
              setNetworkBackground(true);
          } else {
              setNetworkBackground(false);
          }
      });

      /**
       * Set the network background edge limit
       */
      $('#network-background-limit').val(1);
      $('#network-background-limit').on('change', ()=>{
          let val = $(this).val();
          if ($.isNumeric(val) && val > 0) {
              setNetworkBackgroundLimit(val);
          } else {
              $(this).val(1);
          }
      });

      /**
       * Color Scale Function Radio buttons
       */
      $('#color-scale-radio-form input').on('change', ()=>{
          this.colorScale['type'] = $('input[name=color-scale-radio]:checked', '#color-scale-radio-form').val();
          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              this.draw();
          }
      });
  }
  sf_listeners() {

      /**
       * Draw direction arrow of the animal
       */
      $('#draw-direction').click(()=>{
          if ($('#draw-direction').is(':checked')) {
              if (!('direction' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get direction data
                  getDatasetFeature('direction');
              }
              $('.arrow').show();
          } else {
              $('.arrow').hide();
          }
          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw medoid in color button
       */
      $('#draw-medoid').click(() => {
          if ($('#draw-medoid').is(':checked')) {

              if (!('medoid' in swarmData[0])) {
                  getSwarmDatasetFeature('medoid');

              }
              this.setMedoidAnimal(swarmData[this.indexTime]['medoid']);
              // display the medoid
              d3.selectAll('#animal-' + this.medoidAnimal)
                  .classed('medoid', true);
          } else {
              // do not display the medoid fish
              d3.selectAll('#animal-' + this.medoidAnimal)
                  .classed('medoid', false);
              this.setMedoidAnimal(-1);
          }
      });

      /**
       * Draw centroid button
       */
      $('#draw-centroid').click(()=>{
          if ($('#draw-centroid').is(':checked')) {
              if (!('centroid' in swarmData[0])) {
                  getSwarmDatasetFeature('centroid');
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
      $('#draw-convex-hull').click(()=>{
          if ($('#draw-convex-hull').is(':checked')) {
              if (!('hull' in swarmData[0])) {
                  getSwarmDatasetFeature('convex_hull');

              }
          }
      });


      /**
       * Draw triangulation
       */
      $('#draw-triangulation').click(()=>{
          if ($('#draw-triangulation').is(':checked')) {
              if (!('triangulation' in swarmData[0])) {
                  //console.log('ere');
                  getSwarmDatasetFeature('triangulation');
                  //console.log(swarmData[this.indexTime]['triangulation']);

              }
              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes
                  this.decIndexTime();
                  //this.draw();


              }
          }
      });


      /**
       * Draw voronoi
       */
      $('#draw-voronoi').click(()=>{
          if ($('#draw-voronoi').is(':checked')) {
              if (!('voronoi' in swarmData[0])) {
                  getSwarmDatasetFeature('voronoi');
              }
              if (!$('#play-button').hasClass('active')) {
                  //go back one second and draw the next frame
                  //this applys the changes
                  this.decIndexTime();
                  //this.draw();
              }

          }
      });


  }
  af_listeners() {

      /**
       * Draw Speed button
       */
      $('#draw-speed').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-speed').is(':checked')) {
              // load absolute feature speed data once
              if (!('speed' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature speed
                  getDatasetFeature('speed');
              }
              // $('.draw-details').hide();
              $('#draw-speed-details').show();
              $('#draw-acceleration').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('speed');
          } else {
              $('#draw-speed-details').hide();
              this.setActiveScale('black');
          }
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw acceleration button
       */
      $('#draw-acceleration').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-acceleration').is(':checked')) {
              // load absolute feature acceleration data once
              if (!('acceleration' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature acceleration
                  getDatasetFeature('acceleration');
              }
              $('#draw-acceleration-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('acceleration');
          } else {
              $('#draw-acceleration-details').hide();
              this.setActiveScale('black');
          }
          $('.draw-details.active').click();
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw distance to centroid button
       */
      $('#draw-distance_centroid').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-distance_centroid').is(':checked')) {
              // load absolute feature distance_centroid data once
              if (!('distance_centroid' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature distance_centroid
                  getDatasetFeature('distance_centroid');
              }
              $('#draw-distance_centroid-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-acceleration').prop('checked', false);
              $('#draw-midline_offset').prop('checked', false);
              this.setActiveScale('distance_centroid');
          } else {
              $('#draw-distance_centroid-details').hide();
              this.setActiveScale('black');

          }
          $('.draw-details.active').click();

          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              //this.draw();
          }
      });

      /**
       * Draw midline offset
       */
      $('#draw-midline_offset').click(()=>{
          $('.draw-details').hide()
              .find('input:checkbox').prop('checked', true).click();
          if ($('#draw-midline_offset').is(':checked')) {
              // load absolute feature draw-midline_offset data once
              if (!('draw-midline_offset' in dataset[0])) {
                  disablePlayButton();
                  // ajax query to get the absolute feature midline_offset
                  getDatasetFeature('midline_offset');
              }
              $('#draw-midline_offset-details').show();
              $('#draw-speed').prop('checked', false);
              $('#draw-acceleration').prop('checked', false);
              $('#draw-distance_centroid').prop('checked', false);
              setActiveScale('midline_offset');
          } else {
              setActiveScale('black');
          }
          $('.draw-details.active').click();
          //change color legend
          d3.selectAll('.colorLegend *').remove();
          this.changelegend();

          if (!$('#play-button').hasClass('active')) {
              //go back one second and draw the next frame
              //this applys the changes
              this.decIndexTime();
              this.draw();
          }
      });

  }
  md_listeners() {
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
      $('#group-metadata :input').change(function() {
          // reset the metadat acoloring
          resetIndividualMetadata();

          let value = $(this).attr('value');
          let tmp = [];

          // metadata sex is choosen - coloring based on m and f
          if (value === 'sex') {
              $('#metadata-div').modal('toggle');
              // close and color here
              for (let i = 0; i < datasetMetadata.length; i++) {
                  tmp.push(datasetMetadata[i][value].toLowerCase());
              }
              // create a set of individual strings in sex
              tmp = Array.from(new Set(tmp));
              let colors = ['#7fc97f', '#386cb0'];

              for (let i = 0; i < datasetMetadata.length; i++) {
                  for (let j = 0; j < tmp.length; j++) {
                      if (datasetMetadata[i][value].toLowerCase() === tmp[j]) {
                          // add the coloring to the metadatacolor object
                          metadataColor[datasetMetadata[i]['animal_id']] = colors[j];
                      }
                  }
              }
              $('#metadata-input').hide();
          } else {
              $('#metadata-input').show();
              // set values of inputs
              // here are automatically input values calculated
              // .25 and .75 percentiles are used
              for (let i = 0; i < datasetMetadata.length; i++) {
                  tmp.push(datasetMetadata[i][value]);
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
          $('#metadata-input').hide();
          resetIndividualMetadata();
      });

  }
  initShowDendrogramListener(id) {

      $('#show-dendrogram-' + id).click(function(){
          let clickedButtonID = $(this).attr('id');
          // iterate over all buttons and custom highlight just one or none
          $('.show-dendrogram').each(function(i, button){
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
              this.decIndexTime();
              this.draw();
              this.drawDendrogram();
          }
      });
  }
  h_listeners() {
      var checkbox;

      // Store given checkbox in variable
      $('.hiearchy-checkbox').on('change', function() {
          checkbox = $(this);
        });

      // Use checkbox to draw dendrogram
      $('.hiearchy-checkbox').on('change', ()=>{

          let id = checkbox.attr('data');
          let name = checkbox.attr('name');
          let checked = checkbox.prop('checked');

          if (checked && $('.show-dendrogram').length < maxNumberHierarchies) {
              disablePlayButton();
              this.getNetworkHierarchyData(id);

              addHierarchyButton(id, name);
              this.initShowDendrogramListener(id);
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
              this.setHierarchyData({}, id);

              removeHierarchyButton(id);
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
      $('.network-hierarchy-checkbox').on('change', ()=>{
          // get the info for the clicked button
          let checkbox = $(this);

          // reset all the other active checkboxes
          $('.network-hierarchy-checkbox').prop('checked', false);
          checkbox.prop('checked', true);

          if (checkbox.prop('checked')) {
              // set the network id
              setNetworkHierarchy(checkbox.attr('data'));
          } else {
              setNetworkHierarchy(undefined);
          }
      });

}
  n_listeners() {
    /**
     * Network buttons clicked - get the data
     */
    var network_id;

    $('#networks-modal-body button').click(function() {
        network_id = $(this).attr('data');
      });

    $('#networks-modal-body button').click(()=>{
        // add the name of the choosen network to the Network modal
        $('#active-network-name').text($(this).attr('name'));

        disablePlayButton();
        getNetworkData(network_id);
        // set the color of the network
        this.setnetworkColor(network_id);
        $('#network-div').modal('toggle');
    });

    /**
     * Network buttons clicked - get the data
     */
    $('#network-remove').click(()=>{
        setNetworkData({});
        this.setNetworkID(-1);
        // remove the network color
        this.setnetworkColor(-1);
        $('#active-network-name').text('');
    });

    /**
     * Network auto button set acive or remove
     */
    $('#network-auto-suggest').click(function() {
        if (!$('#network-auto-suggest').hasClass('active')) {
            $('#network-limit-p').hide();
            $('#network-slider').hide();

            setNetworkAuto(true);
        } else {
            $('#network-limit-p').show();
            $('#network-slider').show();
            setNetworkAuto(false);
            let limit = $('#network-slider').slider('value');
            setNetworLimit(limit);
            $('#network-limit').val(limit);
        }
    });

}

firststeps(){
       console.log('firststeps');

        let minPoint = parameters['min']['geometry']['coordinates'];
        let maxPoint = parameters['max']['geometry']['coordinates'];
        // let coordinateOrigin = parameters['coordinate_origin']['geometry']['coordinates'];
        // width = width *1.02 --> so there is a margin in the spatial view where no animal is ever
        this.tankWidth = (maxPoint[0] - minPoint[0]) * 1.02;
        this.tankHeight = (maxPoint[1] - minPoint[1]) * 1.02;
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


        //the svg container



        //this.zoomGroup = this.svgContainer.append('svg:g');

        /* depends on svg ratio, for e.g 1240/1900 = 0.65 so padding-bottom = 65% */
        let percentage = Math.ceil((this.tankHeight / this.tankWidth) * 100);
        $('#main-vis').append($('<style>#main-vis::after {padding-top: ' + percentage + '%;display: block;content: "";}</style> '));

        //this.zoomGroup = this.svgContainer.append('svg:g');

        // Visualize the background image if it is uploaded
        if (parameters.background_image) {
            this.zoomGroup
                .append('image')
                .attr('xlink:href', '/' + parameters.background_image)
                .attr('class', 'background-image')
                .attr('height', this.tankHeight)
                .attr('width', this.tankWidth)
                .attr('x', '0')
                .attr('y', '0');
        }

        //append the tank group with a transformation which rotates the y axis
        this.tank = this.zoomGroup.append('svg:g')
            .attr('class', 'tank')
            .attr('transform', ()=>{
                let x = parameters.inverted_x ? -1 : 1;
                let y = parameters.inverted_y ? -1 : 1;
                return 'scale(' + x + ',' + y + ')';
            });

        //add the centroid
        this.tank.append('g')
            .attr('id', 'g-centroid')
            .append('circle')
            .attr('class', 'centroid')
            .attr('r', 6)
            .attr('cx', 0)
            .attr('cy', 0);

        // arrow for the centroid direction
        this.tank.select('#g-centroid')
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
        this.tank.select('#g-centroid')
            .append('line')
            .attr('id', 'centroid-line')
            .attr('marker-end', 'url(#centroid-arrow)');

        //append network  group
        this.tank.append('g')
            .attr('id', 'network-group');

        //append delaunay-triangulation group
        this.tank.append('g')
            .attr('id', 'delaunay-triangulation-group');

        //append voronoi group
        this.tank.append('g')
            .attr('id', 'vornoi-group');

        //append the frame time text
        this.svgContainer.append('text')
            .attr('class', 'frame-text')
            .attr('x', 30)
            .attr('y', 30)
            .text('-- : -- : -- ');



}
  spatialViewInit(){


      // init stuff from other modules
      initTooltip();
      initSliders();

      this.initColorPicker();
      var linechart = new LineChart(swarmData);
      this.cp_listener();
      this.sf_listeners();
      this.af_listeners();
      this.md_listeners();
      this.n_listeners();
      this.h_listeners();
      //var dendrogram = new Dendrogram();
//findinit
      this.initDendrogram();
      makeResizable(this.tankHeight, this.tankWidth);
      defaultConfig();
      // start the animation
      this.draw();
  };
  setMedoidAnimal(value) {
      this.medoidAnimal = value;
  }

}
