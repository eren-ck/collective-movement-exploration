/*eslint-disable no-unused-lets*/
/*global window,$, d3,*/
// import * as spv from './spatial_view.js';

import {
    draw
} from './spatial_view/spatial_view.js';

import {
    setPlayBoolean
} from './listener.js';

import {
  initTrendChartListener,
  TrendChart
} from './line_chart.js';
import {
    swarmData
} from './explore.js';
/**
 * Disable the play button --> Loading symbol
 */
export function disablePlayButton() {
    setPlayBoolean(false);
    $('#play-button').removeClass('active');
    $('#play-button').prop('disabled', true);
    $('#play-icons').hide();
    $('#play-loading').show();

}

/**
 * Enable the play button remove loading symbol
 */
export function enablePlayButton() {
    setPlayBoolean(true);
    $('#play-button').addClass('active');
    $('#play-button').prop('disabled', false);
    $('#play-loading').hide();
    $('#play-icons').show();
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



/**
 * Add the absolute feature checkboxes in the feature panel export to ajax
 *
 */
export function addAbsoluteFeatureButtons(dataSetPercentile) {
    // iterate over the object
    for (var key in dataSetPercentile) {
        if (dataSetPercentile.hasOwnProperty(key)) {
            // generate text for the displayed button
            let capitalized_feature_string = key.split('_').join(' ');
            capitalized_feature_string = capitalized_feature_string.charAt(0).toUpperCase() + capitalized_feature_string.slice(1);
            // add the button
            $('#absolute-feature-checkboxes').append('<tr><th>' +
                ' <div class="pretty p-switch p-fill p-bigger"><input type="checkbox" id="draw-' + key +
                '"/><div class="state"><label>' + capitalized_feature_string + '</label></div></div>' +
                // quantile graph
                '<div class="float-right draw-details" id="draw-' + key + '-details"><div class="pretty p-icon p-toggle p-plain"><input type="checkbox" id="draw-' + key + '-input" />' +
                '<div class="state p-success-o p-on"><i class="mdi mdi-image-area"></i><label></label></div>' +
                '<div class="state p-off"><i class="mdi mdi-image-off"></i><label></label></div>' +
                '</div></div></th></tr>');

        }
    }
    // hide the elements
    $('.draw-details').hide();
    // init the listerners
  initTrendChartListener();

}

// generate hash codes from strings
// source: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/**
 * Calculate the standardDeviation of an array of numbers
 * @param {Array} arr - array of numbers
 */
export function standardDeviation(arr) {
    if (arr instanceof Array) {
        let mean = arr.reduce(function(pv, cv) {
            return pv + cv;
        }, 0) / arr.length;
        let tmp = arr.map(function(num) {
            return Math.pow(num - mean, 2);
        });
        return Math.sqrt(tmp.reduce(function(pv, cv) {
            return pv + cv;
        }, 0) / tmp.length);
    }
}

/**
 * Move element in SVG into background done by moving it to first element
 */
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

/**
 * Make the main vis spatial view resizable
 */
export function makeResizable(height, width) {
    $(function() {
        $('#main-vis')
            .draggable({
                containment: 'parent'
            })
            .resizable({
                aspectRatio: true,
                maxWidth: $('#main-vis-div').width()
            })
            .height(height * 0.6)
            .width(width * 0.6);
    });
}

/**
 * Reset the buttons and checkboxes
 * Hide icons - needed because of bootstrap bug
 */
export function defaultConfig() {
    $('input[type=checkbox]').prop('checked', false);
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
    // needed due to jQuery incompatibility
    $('#play-loading').hide();
    $('.mdi-play').hide();
    $('#metadata-input').hide();
    $('#dendrogram-buttons-div').hide();
    $('#g-centroid').hide();
    //check line chart draw all lines
    $('#line-chart-feature-checkboxes input[type=checkbox]')
        .prop('checked', true);
}
