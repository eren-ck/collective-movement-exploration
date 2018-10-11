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
            $('#export-title').text('Export: ' + data[0].name);
        }
    });
});


/**
 * Download the movement data
 */
$('#download-movement-data').click(function() {
    // change the button text and icon (loading)
    $('#download-movement-data').html('<i class="mdi mdi-spin mdi-loading"></i>Loading');
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
        $('#download-movement-data').html('<i class="mdi mdi-cloud-download"></i> Download');
        $('#download-movement-data').prop('disabled', false);
        $('#download-group-data').prop('disabled', false);
    });

});


/**
 * Download the goup data
 */
$('#download-group-data').click(function() {
    // change the button text and icon (loading)
    $('#download-group-data').html('<i class="mdi mdi-spin mdi-loading"></i>Loading');
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
        $('#download-group-data').html('<i class="mdi mdi-cloud-download"></i>Download');
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
exports.push([module.i, ".material-switch>input[type=\"checkbox\"] {\r\n    display: none;\r\n}\r\n\r\n.material-switch>label {\r\n    cursor: pointer;\r\n    height: 0px;\r\n    position: relative;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::before {\r\n    background: rgb(0, 0, 0);\r\n    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\r\n    border-radius: 8px;\r\n    content: '';\r\n    height: 16px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    opacity: 0.3;\r\n    transition: all 0.4s ease-in-out;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::after {\r\n    background: rgb(255, 255, 255);\r\n    border-radius: 16px;\r\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\r\n    content: '';\r\n    height: 24px;\r\n    left: -4px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    top: -4px;\r\n    transition: all 0.3s ease-in-out;\r\n    width: 24px;\r\n}\r\n\r\n.material-switch>input[type=\"checkbox\"]:checked+label::before {\r\n    background: inherit;\r\n    opacity: 0.5;\r\n}\r\n\r\n.material-switch>input[type=\"checkbox\"]:checked+label::after {\r\n    background: #31a354 !important;\r\n    background: inherit;\r\n    left: 20px;\r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}", ""]);

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