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