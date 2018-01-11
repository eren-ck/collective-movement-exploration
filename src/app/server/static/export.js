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
<<<<<<< HEAD
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

var	fixUrls = __webpack_require__(2);

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
=======
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__export_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__export_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__export_css__);
/*eslint-disable no-unused-lets*/
/*global $,Papa, dataset_id, window*/



let JSONAPI_MIMETYPE = 'application/vnd.api+json';

// result data array for absolute feature movement ajax query
let resultMovement = [];
// result data array for group feature ajax query
let resultGroup = [];
var source;

$(document).ready(function() {
    $.ajax({
        error: function() {
            alert('Dataset does not exist');
        },
        url: '/api/dataset/' + dataset_id,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            $('#export-title').text('Dataset: ' + data[0].name);
        }
    });
});


/**
 * Download the movement data
 */
$('#download-movement-data').click(function() {
    // change the button text and icon (loading)
    $('#download-movement-data').html('Loading... <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    // if the movement data set is empty
    // if downloaded again it is not queried again from the db
    if (resultMovement.length === 0) {
        if (window.EventSource) {
            source = new EventSource('/api/movement_only/' + dataset_id);
            source.onmessage = function(e) {
                if (e.data === 'close') {
                    source.close();
                    getAbsoluteFeatures();
                } else {
                    var data = JSON.parse(e.data);
                    resultMovement = resultMovement.concat(data);
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
    } else {
        getAbsoluteFeatures();
    }


    /**
     * Download the needed absolute features
     */
    function getAbsoluteFeatures() {
        // get what should be included in the csv file
        // get metric distance if checked
        if ($('#metric-distance').is(':checked') && !('metric_distance' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/metric_distance',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the metric distance feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['metric_distance'] = +data[i];
                    }
                }
            });
        }
        // get speed if checked
        if ($('#speed').is(':checked') && !('speed' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#acceleration').is(':checked') && !('acceleration' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the acceleration feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // check if distance centroid is checked
        if ($('#distance-centroid').is(':checked') && !('distance_centroid' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/distance_centroid',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the distance centroid feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['distance_centroid'] = +data[i];
                    }
                }
            });
        }
        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }


    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];
        // get what should be included in the csv file
        let position = $('#position').is(':checked');
        let metric = $('#metric-distance').is(':checked');
        let speed = $('#speed').is(':checked');
        let acceleration = $('#acceleration').is(':checked');
        let distanceCentroid = $('#distance-centroid').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultMovement.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultMovement[i]['t'];
            csletray[i]['animal_id'] = resultMovement[i]['a'];
            // deceide if the position is in one column (x,y) or in two columns x,y
            if (position) {
                csletray[i]['x'] = resultMovement[i]['p'][0];
                csletray[i]['y'] = resultMovement[i]['p'][1];
            } else {
                csletray[i]['position'] = '(' + resultMovement[i]['p'] + ')';
            }
            // metric distance checked
            if (metric) {
                csletray[i]['metric_distance'] = resultMovement[i]['metric_distance'];
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultMovement[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultMovement[i]['acceleration'];
            }
            // distance centroid checked
            if (distanceCentroid) {
                csletray[i]['distance_centroid'] = resultMovement[i]['distance_centroid'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_absolute_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-movement-data').html('Download <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);
    });

});


/**
 * Download the goup data
 */
$('#download-group-data').click(function() {
    // change the button text and icon (loading)
    $('#download-group-data').html('Loading... <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    if (resultGroup.length === 0) {
        $.ajax({
            url: '/api/dataset/' + dataset_id + '/centroid',
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    resultGroup.push({
                        'time': i,
                        'centroid': data[i]
                    });
                }
                getGroupFeatures();
            }
        });
    } else {
        getGroupFeatures();
    }

    /**
     * Download the needed group features
     */
    function getGroupFeatures() {
        // get speed if checked
        if ($('#group-speed').is(':checked') && !('speed' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#group-acceleration').is(':checked') && !('acceleration' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // get convex_hull_area if checked
        if ($('#group-convex-hull-area').is(':checked') && !('convex_hull_area' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_convex_hull_area',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['convex_hull_area'] = +data[i];
                    }
                }
            });
        }

        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }

    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];

        // get what should be included in the csv file
        let centroid = $('#centroid').is(':checked');
        let speed = $('#group-speed').is(':checked');
        let acceleration = $('#group-acceleration').is(':checked');
        let convexHull = $('#group-convex-hull-area').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultGroup.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultGroup[i]['time'];
            // centroid is checked
            if (centroid) {
                csletray[i]['centroid'] = '(' + resultGroup[i]['centroid'] + ')';
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultGroup[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultGroup[i]['acceleration'];
            }
            // distance centroid checked
            if (convexHull) {
                csletray[i]['convex_hull_area'] = resultGroup[i]['convex_hull_area'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_group_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-group-data').html('Download <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);

    });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./export.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./export.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".material-switch>input[type=\"checkbox\"] {\r\n    display: none;\r\n}\r\n\r\n.material-switch>label {\r\n    cursor: pointer;\r\n    height: 0px;\r\n    position: relative;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::before {\r\n    background: rgb(0, 0, 0);\r\n    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\r\n    border-radius: 8px;\r\n    content: '';\r\n    height: 16px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    opacity: 0.3;\r\n    transition: all 0.4s ease-in-out;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::after {\r\n    background: rgb(255, 255, 255);\r\n    border-radius: 16px;\r\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\r\n    content: '';\r\n    height: 24px;\r\n    left: -4px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    top: -4px;\r\n    transition: all 0.3s ease-in-out;\r\n    width: 24px;\r\n}\r\n\r\n.material-switch>input[type=\"checkbox\"]:checked+label::before {\r\n    background: inherit;\r\n    opacity: 0.5;\r\n}\r\n\r\n.material-switch>input[type=\"checkbox\"]:checked+label::after {\r\n    background: inherit;\r\n    left: 20px;\r\n}\r\n\r\n.border-between>[class*='col-']:before {\r\n    background: #e3e3e3;\r\n    bottom: 0;\r\n    content: \" \";\r\n    left: 0;\r\n    position: absolute;\r\n    width: 1px;\r\n    top: 0;\r\n}\r\n\r\n.border-between>[class*='col-']:first-child:before {\r\n    display: none;\r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}\r\n\r\n.glyphicon-refresh-animate {\r\n    -animation: spin .7s infinite linear;\r\n    -webkit-animation: spin2 .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes spin2 {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: scale(1) rotate(0deg);\r\n    }\r\n    to {\r\n        transform: scale(1) rotate(360deg);\r\n    }\r\n}\r\n", ""]);

// exports


/***/ }),
/* 3 */
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
/* 4 */
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

var	fixUrls = __webpack_require__(5);

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
>>>>>>> 128267a6187bd01be0233ae813e28b6e75a733ad

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
<<<<<<< HEAD
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

/***/ 2:
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


/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__export_css__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__export_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__export_css__);
/*eslint-disable no-unused-lets*/
/*global $,Papa, dataset_id, window*/



let JSONAPI_MIMETYPE = 'application/vnd.api+json';

// result data array for absolute feature movement ajax query
let resultMovement = [];
// result data array for group feature ajax query
let resultGroup = [];
var source;

$(document).ready(function() {
    $.ajax({
        error: function() {
            alert('Dataset does not exist');
        },
        url: '/api/dataset/' + dataset_id,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            $('#export-title').text('Dataset: ' + data[0].name);
        }
    });
});


/**
 * Download the movement data
 */
$('#download-movement-data').click(function() {
    // change the button text and icon (loading)
    $('#download-movement-data').html('Loading... <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    // if the movement data set is empty
    // if downloaded again it is not queried again from the db
    if (resultMovement.length === 0) {
        if (window.EventSource) {
            source = new EventSource('/api/movement_only/' + dataset_id);
            source.onmessage = function(e) {
                if (e.data === 'close') {
                    source.close();
                    getAbsoluteFeatures();
                } else {
                    var data = JSON.parse(e.data);
                    resultMovement = resultMovement.concat(data);
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
    } else {
        getAbsoluteFeatures();
    }


    /**
     * Download the needed absolute features
     */
    function getAbsoluteFeatures() {
        // get what should be included in the csv file
        // get metric distance if checked
        if ($('#metric-distance').is(':checked') && !('metric_distance' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/metric_distance',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the metric distance feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['metric_distance'] = +data[i];
                    }
                }
            });
        }
        // get speed if checked
        if ($('#speed').is(':checked') && !('speed' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#acceleration').is(':checked') && !('acceleration' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the acceleration feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // check if distance centroid is checked
        if ($('#distance-centroid').is(':checked') && !('distance_centroid' in resultMovement[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/distance_centroid',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the distance centroid feature to the dataset
                    for (let i = 0; i < resultMovement.length; i++) {
                        resultMovement[i]['distance_centroid'] = +data[i];
                    }
                }
            });
        }
        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }


    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];
        // get what should be included in the csv file
        let position = $('#position').is(':checked');
        let metric = $('#metric-distance').is(':checked');
        let speed = $('#speed').is(':checked');
        let acceleration = $('#acceleration').is(':checked');
        let distanceCentroid = $('#distance-centroid').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultMovement.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultMovement[i]['t'];
            csletray[i]['animal_id'] = resultMovement[i]['a'];
            // deceide if the position is in one column (x,y) or in two columns x,y
            if (position) {
                csletray[i]['x'] = resultMovement[i]['p'][0];
                csletray[i]['y'] = resultMovement[i]['p'][1];
            } else {
                csletray[i]['position'] = '(' + resultMovement[i]['p'] + ')';
            }
            // metric distance checked
            if (metric) {
                csletray[i]['metric_distance'] = resultMovement[i]['metric_distance'];
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultMovement[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultMovement[i]['acceleration'];
            }
            // distance centroid checked
            if (distanceCentroid) {
                csletray[i]['distance_centroid'] = resultMovement[i]['distance_centroid'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_absolute_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-movement-data').html('Download <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);
    });

});


/**
 * Download the goup data
 */
$('#download-group-data').click(function() {
    // change the button text and icon (loading)
    $('#download-group-data').html('Loading... <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    $('#download-movement-data').prop('disabled', true);
    $('#download-group-data').prop('disabled', true);

    if (resultGroup.length === 0) {
        $.ajax({
            url: '/api/dataset/' + dataset_id + '/centroid',
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    resultGroup.push({
                        'time': i,
                        'centroid': data[i]
                    });
                }
                getGroupFeatures();
            }
        });
    } else {
        getGroupFeatures();
    }

    /**
     * Download the needed group features
     */
    function getGroupFeatures() {
        // get speed if checked
        if ($('#group-speed').is(':checked') && !('speed' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_speed',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['speed'] = +data[i];
                    }
                }
            });
        }
        // get acceleration if checked
        if ($('#group-acceleration').is(':checked') && !('acceleration' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_acceleration',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['acceleration'] = +data[i];
                    }
                }
            });
        }
        // get convex_hull_area if checked
        if ($('#group-convex-hull-area').is(':checked') && !('convex_hull_area' in resultGroup[0])) {
            $.ajax({
                url: '/api/dataset/' + dataset_id + '/swarm_convex_hull_area',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                headers: {
                    'Accept': JSONAPI_MIMETYPE
                },
                success: function(data) {
                    // add the speed feature to the dataset
                    for (let i = 0; i < resultGroup.length; i++) {
                        resultGroup[i]['convex_hull_area'] = +data[i];
                    }
                }
            });
        }

        // empty ajax query to call start the ajaxStop callback
        $.ajax();
    }

    $(document).one('ajaxStop', function() {
        // Objects in the csv file
        let csletray = [];

        // get what should be included in the csv file
        let centroid = $('#centroid').is(':checked');
        let speed = $('#group-speed').is(':checked');
        let acceleration = $('#group-acceleration').is(':checked');
        let convexHull = $('#group-convex-hull-area').is(':checked');
        // create the export CSV array of objects
        for (let i = 0; i < resultGroup.length; i++) {
            csletray[i] = {};
            csletray[i]['time'] = resultGroup[i]['time'];
            // centroid is checked
            if (centroid) {
                csletray[i]['centroid'] = '(' + resultGroup[i]['centroid'] + ')';
            }
            // speed checked
            if (speed) {
                csletray[i]['speed'] = resultGroup[i]['speed'];
            }
            // acceleration checked
            if (acceleration) {
                csletray[i]['acceleration'] = resultGroup[i]['acceleration'];
            }
            // distance centroid checked
            if (convexHull) {
                csletray[i]['convex_hull_area'] = resultGroup[i]['convex_hull_area'];
            }
        }
        // parse the csv this is multithreaded
        let csv = Papa.unparse(csletray);
        // create a hidden <a> DOM node to download the csv file
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + escape(csv));
        link.setAttribute('download', 'animal_group_features.csv');
        document.body.appendChild(link);
        //download the csv file
        link.click();
        // activate the buttons and change the text again
        $('#download-group-data').html('Download <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);

    });
});


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./export.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./export.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Eren\\Desktop\\GitHub Projects\\collective-movement-exploration\\src\\app\\front-end\\export\\export.css'\n    at Error (native)");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjMzOTA1MjhhM2IxZjFhYzFkM2UiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vZXhwb3J0L2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9leHBvcnQvZXhwb3J0LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hGQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQkFBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7QUMzVkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEMiLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIzMzkwNTI4YTNiMWYxYWMxZDNlIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiA0IiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDQiLCIvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1sZXRzKi9cclxuLypnbG9iYWwgJCxQYXBhLCBkYXRhc2V0X2lkLCB3aW5kb3cqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCAnLi9leHBvcnQuY3NzJztcclxuXHJcbmxldCBKU09OQVBJX01JTUVUWVBFID0gJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbic7XHJcblxyXG4vLyByZXN1bHQgZGF0YSBhcnJheSBmb3IgYWJzb2x1dGUgZmVhdHVyZSBtb3ZlbWVudCBhamF4IHF1ZXJ5XHJcbmxldCByZXN1bHRNb3ZlbWVudCA9IFtdO1xyXG4vLyByZXN1bHQgZGF0YSBhcnJheSBmb3IgZ3JvdXAgZmVhdHVyZSBhamF4IHF1ZXJ5XHJcbmxldCByZXN1bHRHcm91cCA9IFtdO1xyXG52YXIgc291cmNlO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0RhdGFzZXQgZG9lcyBub3QgZXhpc3QnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgZGF0YXNldF9pZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjZXhwb3J0LXRpdGxlJykudGV4dCgnRGF0YXNldDogJyArIGRhdGFbMF0ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBEb3dubG9hZCB0aGUgbW92ZW1lbnQgZGF0YVxyXG4gKi9cclxuJCgnI2Rvd25sb2FkLW1vdmVtZW50LWRhdGEnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgYW5kIGljb24gKGxvYWRpbmcpXHJcbiAgICAkKCcjZG93bmxvYWQtbW92ZW1lbnQtZGF0YScpLmh0bWwoJ0xvYWRpbmcuLi4gPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj4nKTtcclxuICAgICQoJyNkb3dubG9hZC1tb3ZlbWVudC1kYXRhJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJyNkb3dubG9hZC1ncm91cC1kYXRhJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICAvLyBpZiB0aGUgbW92ZW1lbnQgZGF0YSBzZXQgaXMgZW1wdHlcclxuICAgIC8vIGlmIGRvd25sb2FkZWQgYWdhaW4gaXQgaXMgbm90IHF1ZXJpZWQgYWdhaW4gZnJvbSB0aGUgZGJcclxuICAgIGlmIChyZXN1bHRNb3ZlbWVudC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBpZiAod2luZG93LkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9tb3ZlbWVudF9vbmx5LycgKyBkYXRhc2V0X2lkKTtcclxuICAgICAgICAgICAgc291cmNlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEgPT09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBYnNvbHV0ZUZlYXR1cmVzKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdE1vdmVtZW50ID0gcmVzdWx0TW92ZW1lbnQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUucmVhZHlTdGF0ZSA9PSBFdmVudFNvdXJjZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnU3RyZWFtaW5nIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgnV2ViYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0cmVhbWluZycpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2V0QWJzb2x1dGVGZWF0dXJlcygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERvd25sb2FkIHRoZSBuZWVkZWQgYWJzb2x1dGUgZmVhdHVyZXNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVGZWF0dXJlcygpIHtcclxuICAgICAgICAvLyBnZXQgd2hhdCBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgLy8gZ2V0IG1ldHJpYyBkaXN0YW5jZSBpZiBjaGVja2VkXHJcbiAgICAgICAgaWYgKCQoJyNtZXRyaWMtZGlzdGFuY2UnKS5pcygnOmNoZWNrZWQnKSAmJiAhKCdtZXRyaWNfZGlzdGFuY2UnIGluIHJlc3VsdE1vdmVtZW50WzBdKSkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBkYXRhc2V0X2lkICsgJy9tZXRyaWNfZGlzdGFuY2UnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIG1ldHJpYyBkaXN0YW5jZSBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRNb3ZlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRNb3ZlbWVudFtpXVsnbWV0cmljX2Rpc3RhbmNlJ10gPSArZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgc3BlZWQgaWYgY2hlY2tlZFxyXG4gICAgICAgIGlmICgkKCcjc3BlZWQnKS5pcygnOmNoZWNrZWQnKSAmJiAhKCdzcGVlZCcgaW4gcmVzdWx0TW92ZW1lbnRbMF0pKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIGRhdGFzZXRfaWQgKyAnL3NwZWVkJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBzcGVlZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRNb3ZlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRNb3ZlbWVudFtpXVsnc3BlZWQnXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBhY2NlbGVyYXRpb24gaWYgY2hlY2tlZFxyXG4gICAgICAgIGlmICgkKCcjYWNjZWxlcmF0aW9uJykuaXMoJzpjaGVja2VkJykgJiYgISgnYWNjZWxlcmF0aW9uJyBpbiByZXN1bHRNb3ZlbWVudFswXSkpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgZGF0YXNldF9pZCArICcvYWNjZWxlcmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBhY2NlbGVyYXRpb24gZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0TW92ZW1lbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0TW92ZW1lbnRbaV1bJ2FjY2VsZXJhdGlvbiddID0gK2RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGlzdGFuY2UgY2VudHJvaWQgaXMgY2hlY2tlZFxyXG4gICAgICAgIGlmICgkKCcjZGlzdGFuY2UtY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKSAmJiAhKCdkaXN0YW5jZV9jZW50cm9pZCcgaW4gcmVzdWx0TW92ZW1lbnRbMF0pKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2RhdGFzZXQvJyArIGRhdGFzZXRfaWQgKyAnL2Rpc3RhbmNlX2NlbnRyb2lkJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6IEpTT05BUElfTUlNRVRZUEVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBkaXN0YW5jZSBjZW50cm9pZCBmZWF0dXJlIHRvIHRoZSBkYXRhc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRNb3ZlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRNb3ZlbWVudFtpXVsnZGlzdGFuY2VfY2VudHJvaWQnXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVtcHR5IGFqYXggcXVlcnkgdG8gY2FsbCBzdGFydCB0aGUgYWpheFN0b3AgY2FsbGJhY2tcclxuICAgICAgICAkLmFqYXgoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub25lKCdhamF4U3RvcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIE9iamVjdHMgaW4gdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGV0IGNzbGV0cmF5ID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHdoYXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBjc3YgZmlsZVxyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICQoJyNwb3NpdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgIGxldCBtZXRyaWMgPSAkKCcjbWV0cmljLWRpc3RhbmNlJykuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgbGV0IHNwZWVkID0gJCgnI3NwZWVkJykuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgbGV0IGFjY2VsZXJhdGlvbiA9ICQoJyNhY2NlbGVyYXRpb24nKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICBsZXQgZGlzdGFuY2VDZW50cm9pZCA9ICQoJyNkaXN0YW5jZS1jZW50cm9pZCcpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZXhwb3J0IENTViBhcnJheSBvZiBvYmplY3RzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRNb3ZlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjc2xldHJheVtpXSA9IHt9O1xyXG4gICAgICAgICAgICBjc2xldHJheVtpXVsndGltZSddID0gcmVzdWx0TW92ZW1lbnRbaV1bJ3QnXTtcclxuICAgICAgICAgICAgY3NsZXRyYXlbaV1bJ2FuaW1hbF9pZCddID0gcmVzdWx0TW92ZW1lbnRbaV1bJ2EnXTtcclxuICAgICAgICAgICAgLy8gZGVjZWlkZSBpZiB0aGUgcG9zaXRpb24gaXMgaW4gb25lIGNvbHVtbiAoeCx5KSBvciBpbiB0d28gY29sdW1ucyB4LHlcclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjc2xldHJheVtpXVsneCddID0gcmVzdWx0TW92ZW1lbnRbaV1bJ3AnXVswXTtcclxuICAgICAgICAgICAgICAgIGNzbGV0cmF5W2ldWyd5J10gPSByZXN1bHRNb3ZlbWVudFtpXVsncCddWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NsZXRyYXlbaV1bJ3Bvc2l0aW9uJ10gPSAnKCcgKyByZXN1bHRNb3ZlbWVudFtpXVsncCddICsgJyknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG1ldHJpYyBkaXN0YW5jZSBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmIChtZXRyaWMpIHtcclxuICAgICAgICAgICAgICAgIGNzbGV0cmF5W2ldWydtZXRyaWNfZGlzdGFuY2UnXSA9IHJlc3VsdE1vdmVtZW50W2ldWydtZXRyaWNfZGlzdGFuY2UnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzcGVlZCBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmIChzcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgY3NsZXRyYXlbaV1bJ3NwZWVkJ10gPSByZXN1bHRNb3ZlbWVudFtpXVsnc3BlZWQnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhY2NlbGVyYXRpb24gY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoYWNjZWxlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjc2xldHJheVtpXVsnYWNjZWxlcmF0aW9uJ10gPSByZXN1bHRNb3ZlbWVudFtpXVsnYWNjZWxlcmF0aW9uJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZGlzdGFuY2UgY2VudHJvaWQgY2hlY2tlZFxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VDZW50cm9pZCkge1xyXG4gICAgICAgICAgICAgICAgY3NsZXRyYXlbaV1bJ2Rpc3RhbmNlX2NlbnRyb2lkJ10gPSByZXN1bHRNb3ZlbWVudFtpXVsnZGlzdGFuY2VfY2VudHJvaWQnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2IHRoaXMgaXMgbXVsdGl0aHJlYWRlZFxyXG4gICAgICAgIGxldCBjc3YgPSBQYXBhLnVucGFyc2UoY3NsZXRyYXkpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGhpZGRlbiA8YT4gRE9NIG5vZGUgdG8gZG93bmxvYWQgdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBlc2NhcGUoY3N2KSk7XHJcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2FuaW1hbF9hYnNvbHV0ZV9mZWF0dXJlcy5jc3YnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgIC8vZG93bmxvYWQgdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBidXR0b25zIGFuZCBjaGFuZ2UgdGhlIHRleHQgYWdhaW5cclxuICAgICAgICAkKCcjZG93bmxvYWQtbW92ZW1lbnQtZGF0YScpLmh0bWwoJ0Rvd25sb2FkIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1kb3dubG9hZC1hbHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jyk7XHJcbiAgICAgICAgJCgnI2Rvd25sb2FkLW1vdmVtZW50LWRhdGEnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAkKCcjZG93bmxvYWQtZ3JvdXAtZGF0YScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICogRG93bmxvYWQgdGhlIGdvdXAgZGF0YVxyXG4gKi9cclxuJCgnI2Rvd25sb2FkLWdyb3VwLWRhdGEnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgYW5kIGljb24gKGxvYWRpbmcpXHJcbiAgICAkKCcjZG93bmxvYWQtZ3JvdXAtZGF0YScpLmh0bWwoJ0xvYWRpbmcuLi4gPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlZnJlc2ggZ2x5cGhpY29uLXJlZnJlc2gtYW5pbWF0ZVwiPjwvc3Bhbj4nKTtcclxuICAgICQoJyNkb3dubG9hZC1tb3ZlbWVudC1kYXRhJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJyNkb3dubG9hZC1ncm91cC1kYXRhJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcbiAgICBpZiAocmVzdWx0R3JvdXAubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBkYXRhc2V0X2lkICsgJy9jZW50cm9pZCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RpbWUnOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2VudHJvaWQnOiBkYXRhW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXRHcm91cEZlYXR1cmVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2V0R3JvdXBGZWF0dXJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRG93bmxvYWQgdGhlIG5lZWRlZCBncm91cCBmZWF0dXJlc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRHcm91cEZlYXR1cmVzKCkge1xyXG4gICAgICAgIC8vIGdldCBzcGVlZCBpZiBjaGVja2VkXHJcbiAgICAgICAgaWYgKCQoJyNncm91cC1zcGVlZCcpLmlzKCc6Y2hlY2tlZCcpICYmICEoJ3NwZWVkJyBpbiByZXN1bHRHcm91cFswXSkpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgZGF0YXNldF9pZCArICcvc3dhcm1fc3BlZWQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdEdyb3VwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEdyb3VwW2ldWydzcGVlZCddID0gK2RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IGFjY2VsZXJhdGlvbiBpZiBjaGVja2VkXHJcbiAgICAgICAgaWYgKCQoJyNncm91cC1hY2NlbGVyYXRpb24nKS5pcygnOmNoZWNrZWQnKSAmJiAhKCdhY2NlbGVyYXRpb24nIGluIHJlc3VsdEdyb3VwWzBdKSkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9kYXRhc2V0LycgKyBkYXRhc2V0X2lkICsgJy9zd2FybV9hY2NlbGVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogSlNPTkFQSV9NSU1FVFlQRVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHNwZWVkIGZlYXR1cmUgdG8gdGhlIGRhdGFzZXRcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdEdyb3VwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEdyb3VwW2ldWydhY2NlbGVyYXRpb24nXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBjb252ZXhfaHVsbF9hcmVhIGlmIGNoZWNrZWRcclxuICAgICAgICBpZiAoJCgnI2dyb3VwLWNvbnZleC1odWxsLWFyZWEnKS5pcygnOmNoZWNrZWQnKSAmJiAhKCdjb252ZXhfaHVsbF9hcmVhJyBpbiByZXN1bHRHcm91cFswXSkpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvZGF0YXNldC8nICsgZGF0YXNldF9pZCArICcvc3dhcm1fY29udmV4X2h1bGxfYXJlYScsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiBKU09OQVBJX01JTUVUWVBFXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgc3BlZWQgZmVhdHVyZSB0byB0aGUgZGF0YXNldFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0R3JvdXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0R3JvdXBbaV1bJ2NvbnZleF9odWxsX2FyZWEnXSA9ICtkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlbXB0eSBhamF4IHF1ZXJ5IHRvIGNhbGwgc3RhcnQgdGhlIGFqYXhTdG9wIGNhbGxiYWNrXHJcbiAgICAgICAgJC5hamF4KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChkb2N1bWVudCkub25lKCdhamF4U3RvcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIE9iamVjdHMgaW4gdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGV0IGNzbGV0cmF5ID0gW107XHJcblxyXG4gICAgICAgIC8vIGdldCB3aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgY3N2IGZpbGVcclxuICAgICAgICBsZXQgY2VudHJvaWQgPSAkKCcjY2VudHJvaWQnKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICBsZXQgc3BlZWQgPSAkKCcjZ3JvdXAtc3BlZWQnKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICBsZXQgYWNjZWxlcmF0aW9uID0gJCgnI2dyb3VwLWFjY2VsZXJhdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgIGxldCBjb252ZXhIdWxsID0gJCgnI2dyb3VwLWNvbnZleC1odWxsLWFyZWEnKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGV4cG9ydCBDU1YgYXJyYXkgb2Ygb2JqZWN0c1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0R3JvdXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3NsZXRyYXlbaV0gPSB7fTtcclxuICAgICAgICAgICAgY3NsZXRyYXlbaV1bJ3RpbWUnXSA9IHJlc3VsdEdyb3VwW2ldWyd0aW1lJ107XHJcbiAgICAgICAgICAgIC8vIGNlbnRyb2lkIGlzIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKGNlbnRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjc2xldHJheVtpXVsnY2VudHJvaWQnXSA9ICcoJyArIHJlc3VsdEdyb3VwW2ldWydjZW50cm9pZCddICsgJyknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNwZWVkIGNoZWNrZWRcclxuICAgICAgICAgICAgaWYgKHNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICBjc2xldHJheVtpXVsnc3BlZWQnXSA9IHJlc3VsdEdyb3VwW2ldWydzcGVlZCddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFjY2VsZXJhdGlvbiBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmIChhY2NlbGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNzbGV0cmF5W2ldWydhY2NlbGVyYXRpb24nXSA9IHJlc3VsdEdyb3VwW2ldWydhY2NlbGVyYXRpb24nXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBkaXN0YW5jZSBjZW50cm9pZCBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmIChjb252ZXhIdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjc2xldHJheVtpXVsnY29udmV4X2h1bGxfYXJlYSddID0gcmVzdWx0R3JvdXBbaV1bJ2NvbnZleF9odWxsX2FyZWEnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2IHRoaXMgaXMgbXVsdGl0aHJlYWRlZFxyXG4gICAgICAgIGxldCBjc3YgPSBQYXBhLnVucGFyc2UoY3NsZXRyYXkpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGhpZGRlbiA8YT4gRE9NIG5vZGUgdG8gZG93bmxvYWQgdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBlc2NhcGUoY3N2KSk7XHJcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2FuaW1hbF9ncm91cF9mZWF0dXJlcy5jc3YnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgIC8vZG93bmxvYWQgdGhlIGNzdiBmaWxlXHJcbiAgICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBidXR0b25zIGFuZCBjaGFuZ2UgdGhlIHRleHQgYWdhaW5cclxuICAgICAgICAkKCcjZG93bmxvYWQtZ3JvdXAtZGF0YScpLmh0bWwoJ0Rvd25sb2FkIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1kb3dubG9hZC1hbHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jyk7XHJcbiAgICAgICAgJCgnI2Rvd25sb2FkLW1vdmVtZW50LWRhdGEnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAkKCcjZG93bmxvYWQtZ3JvdXAtZGF0YScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBvcnQvZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9leHBvcnQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2V4cG9ydC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZXhwb3J0LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9leHBvcnQvZXhwb3J0LmNzc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sInNvdXJjZVJvb3QiOiIifQ==
=======
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
/* 5 */
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
>>>>>>> 128267a6187bd01be0233ae813e28b6e75a733ad
