/*eslint-disable no-unused-lets*/
/*global window,$,*/
// import * as spv from './spatial_view.js';

import {
    draw
} from './spatial_view/spatial_view.js';

import {
    setPlayBoolean
} from './listener.js';

/**
 * Disable the play button --> Loading symbol
 */
export function disablePlayButton() {
    setPlayBoolean(false);
    $('#play-button').removeClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading');
    $('#play-button').prop('disabled', true);
}

/**
 * Enable the play button remove loading symbol
 */
export function enablePlayButton() {
    setPlayBoolean(true);
    $('#play-button').addClass('active');
    $('#play-button').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>Play');
    $('#play-button').prop('disabled', false);
    draw();
}


/**
 * Return  .05 percentiles of the array
 */
export function percentiles(arr) {
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
export function percentilesLineChart(arr) {
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