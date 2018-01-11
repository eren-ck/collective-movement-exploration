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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_css__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__upload_css__);
/*eslint-disable no-unused-lets*/
/*global $, Set*/



//disable the submit button
disableSubmitButton();
$('#metadata').val('');
$('#movement').val('');

/**
 * Upload form movement file
 */
$('#movement').on('change', function() {
    //reset the movement alert fields
    changeAlertWarning('#movement-is-csv');
    changeAlertWarning('#movement-correct-fields');
    changeAlertWarning('#movement-file-correct');
    changeAlertWarning('#movement-primary-key');
    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        //disable the submit button
        disableSubmitButton();
        changeAlertDanger('#movement-is-csv');
        return;
    }

    // Enable submit button
    enableSubmitButton();

    //check if csv file input is correct
    $('#movement').parse({
        config: {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            //  The callback to execute when parsing is complete
            complete: function completeFn(results) {
                // check if the header is correct
                // needed fields : id,time,x,y
                if (results.meta.fields.length >= 4) {
                    //needed fields
                    let needed_fields = ['animal_id', 'time', 'x', 'y'];
                    //fields of the csv file
                    let fields = results.meta.fields;
                    // compare the fields - this is case insensitive
                    for (let i = 0; i < needed_fields.length; i++) {
                        let query = needed_fields[i];
                        //if the field is missing
                        if (fields.findIndex(item => query === item) < 0) {
                            alert('The Movement CSV file is missing the field: ' + query);
                            disableSubmitButton();
                            changeAlertDanger('#movement-correct-fields');
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    changeAlertDanger('#movement-correct-fields');
                    disableSubmitButton();
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    alert('ERROR:' + results.errors[0]['message']);
                    disableSubmitButton();
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    changeAlertDanger('#movement-is-csv');
                    disableSubmitButton();
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    if (!isNumber(results.data[i])) {
                        alert('Something is wrong in CSV line ' + (i + 2));
                        disableSubmitButton();
                        changeAlertDanger('#movement-file-correct');
                        return;
                    }
                }
                // get min max values for environment
                let minValues = [results.data[0]['x'], results.data[0]['y']];
                let maxValues = [results.data[0]['x'], results.data[0]['y']];
                //set min max values in the environment form fields
                for (let i = 0; i < results.data.length; i++) {
                    if (minValues[0] > results.data[i]['x']) {
                        minValues[0] = results.data[i]['x'];
                    }
                    if (minValues[1] > results.data[i]['y']) {
                        minValues[1] = results.data[i]['y'];
                    }
                    if (maxValues[0] < results.data[i]['x']) {
                        maxValues[0] = results.data[i]['x'];
                    }
                    if (maxValues[1] < results.data[i]['y']) {
                        maxValues[1] = results.data[i]['y'];
                    }
                }
                $('#min_x').val(minValues[0]);
                $('#min_y').val(minValues[1]);
                $('#max_x').val(maxValues[0]);
                $('#max_y').val(maxValues[1]);

                // check for duplicate entries
                let seen = new Set();
                let hasDuplicates = results.data.some(function(current) {
                    return seen.size === seen.add(JSON.stringify({
                        pk1: current['time'],
                        pk2: current['animal_id']
                    })).size;
                });
                if (hasDuplicates) {
                    changeAlertDanger('#movement-primary-key');
                    disableSubmitButton();
                    return;
                }

                // great success
                changeAlertSuccess('#movement-is-csv');
                changeAlertSuccess('#movement-correct-fields');
                changeAlertSuccess('#movement-file-correct');
                changeAlertSuccess('#movement-primary-key');
            },
            beforeFirstChunk: function(chunk) {
                //change the header to lowercase to make it case insensitive
                let rows = chunk.split(/\r\n|\r|\n/);
                let headings = rows[0].toLowerCase();
                rows[0] = headings;
                return rows.join('\r\n');
            },
        }
    });

});

/**
 * Upload form metadata file
 */
$('#metadata').on('change', function() {
    //reset the movement alert fields
    changeAlertWarning('#metadata-is-csv');
    changeAlertWarning('#metadata-correct-fields');
    changeAlertWarning('#metadata-file-correct');
    changeAlertWarning('#metadata-primary-key');
    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        //disable the submit button
        disableSubmitButton();
        changeAlertDanger('#metadata-is-csv');
        return;
    }

    if ($('#movement').val()) {
        // Enable submit button
        enableSubmitButton();
    }

    //check if csv file input is correct
    $('#metadata').parse({
        config: {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            //  The callback to execute when parsing is complete
            complete: function completeFn(results) {
                //needed fields
                let needed_fields = ['animal_id', 'species', 'sex', 'size', 'weight'];
                //fields of the csv file
                let fields = results.meta.fields;
                // check if the header is correct
                // needed fields : id,time,x,y
                if (results.meta.fields.length >= 5) {
                    // compare the fields - this is case insensitive
                    for (let i = 0; i < needed_fields.length; i++) {
                        let query = needed_fields[i];
                        //if the field is missing
                        if (fields.findIndex(item => query === item) < 0) {
                            alert('The metadata CSV file is missing the field: ' + query);
                            disableSubmitButton();
                            changeAlertDanger('#metadata-correct-fields');
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    changeAlertDanger('#metadata-correct-fields');
                    disableSubmitButton();
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    alert('ERROR:' + results.errors[0]['message']);
                    disableSubmitButton();
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    changeAlertDanger('#metadata-is-csv');
                    disableSubmitButton();
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    //check if the id is a number
                    if (!letIsNumber(results.data[i]['animal_id'])) {
                        alert('Something is wrong in CSV line ' + (i + 2));
                        disableSubmitButton();
                        changeAlertDanger('#metadata-file-correct');
                        return;
                    }
                    //check if there are also no empty or null values
                    for (let key in results.data[i]) {
                        if (results.data[i].hasOwnProperty(key)) {
                            if (!results.data[i][key]) {
                                alert('Something is wrong in CSV line ' + (i + 2));
                                disableSubmitButton();
                                changeAlertDanger('#metadata-file-correct');
                                return;
                            }
                        }

                    }
                }
                // check for duplicate entries
                let seen = new Set();
                let hasDuplicates = results.data.some(function(current) {
                    return seen.size === seen.add(current['animal_id']).size;
                });
                if (hasDuplicates) {
                    changeAlertDanger('#metadata-primary-key');
                    disableSubmitButton();
                    return;
                }

                // great success
                changeAlertSuccess('#metadata-is-csv');
                changeAlertSuccess('#metadata-correct-fields');
                changeAlertSuccess('#metadata-file-correct');
                changeAlertSuccess('#metadata-primary-key');
            },
            beforeFirstChunk: function(chunk) {
                //change the header to lowercase to make it case insensitive
                let rows = chunk.split(/\r\n|\r|\n/);
                let headings = rows[0].toLowerCase();
                rows[0] = headings;
                return rows.join('\r\n');
            },
        }
    });
});

/**
 * Enable sumbit button
 */
function enableSubmitButton() {
    $('input[type="submit"]').prop('disabled', false);
}

/**
 * Enable sumbit button
 */
function disableSubmitButton() {
    $('input[type="submit"]').prop('disabled', true);
}

/**
 * Check if all object items are numbers and not NaN
 */
function isNumber(obj) {
    let solution = true;
    Object.keys(obj).forEach(function(key) {
        if (isNaN(parseFloat(obj[key]))) {
            solution = false;
        }
    });
    return solution;
}

/**
 * Check if object is number and not NaN
 */
function letIsNumber(obj) {
    return !isNaN(parseFloat(obj));
}

/**
 * Drag and drop effects - still minor issues
 * gets stuck sometimes
 */
let dropCounter = 0;
$('.drop').bind({
    dragenter: function(ev) {
        dropCounter++;
        $(this).addClass('blue');
        ev.preventDefault();
    },

    dragleave: function() {
        dropCounter--;
        if (dropCounter === 0) {
            $(this).removeClass('blue');
        }
    },
    drop: function() {
        $(this).find('span').addClass('dropped');
        dropCounter = 0;
        $(this).removeClass('blue');
    }
});

/**
 * Drag and drop movement input
 */
$('#movement').change(function() {
    $('#movement-drop-text').text(this.files[0].name);
    $('#movement + span').addClass('dropped');
});


/**
 * Drag and drop metadata input
 */
$('#metadata').change(function() {
    $('#metadata-drop-text').text(this.files[0].name);
    $('#metadata + span').addClass('dropped');
});

/**
 * Change alert to Warning
 */
function changeAlertWarning(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-warning');
}

/**
 * Change alert to danger
 */
function changeAlertDanger(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-danger');
}

/**
 * Change alert to success
 */
function changeAlertSuccess(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-success');
}

/**
 * Show the uploading icon after clicking on submit
 */
$('#submit').click(function() {
    $(this).hide();
    $('#submit-button').removeClass('hidden');
});


// upload from upload-wizard using tab
$(document).ready(function() {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //upload-wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

        let $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $('.next-step').click(function() {

        let $active = $('.upload-wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $('.prev-step').click(function() {

        let $active = $('.upload-wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!./upload.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./upload.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "    /* Drag and drop upload */\r\n\r\n    .drop {\r\n        position: relative;\r\n        width: 300px;\r\n        height: 200px;\r\n        border: 4px dashed #E0E0E0;\r\n    }\r\n\r\n    .drop:hover {\r\n        box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);\r\n        border: 4px dashed #737373;\r\n    }\r\n\r\n    .drop p {\r\n        width: 100%;\r\n        text-align: center;\r\n        line-height: 130px;\r\n        color: #333;\r\n    }\r\n\r\n    .drop span {\r\n        top: 50px;\r\n        width: 100%;\r\n        font-size: 2.5em;\r\n        text-align: center;\r\n        color: #D9D9D9;\r\n    }\r\n\r\n    .drop input {\r\n        position: absolute;\r\n        margin: 0;\r\n        padding: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        outline: none;\r\n        opacity: 0;\r\n    }\r\n\r\n    .blue {\r\n        box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);\r\n        border: 4px dashed #337ab7;\r\n    }\r\n\r\n    .dropped {\r\n        color: #333 !important;\r\n    }\r\n\r\n    .panel-heading .accordion-toggle:after {\r\n        font-family: 'Glyphicons Halflings';\r\n        content: \"\\E114\";\r\n        float: right;\r\n        color: grey;\r\n    }\r\n\r\n    .panel-heading .accordion-toggle.collapsed:after {\r\n        content: \"\\E080\";\r\n    }\r\n\r\n    .required:after {\r\n        content: \"*\";\r\n        color: #cb181d;\r\n    }\r\n\r\n    .upload-wizard {\r\n        margin: 20px auto;\r\n        background: #fff;\r\n    }\r\n\r\n    .upload-wizard .nav-tabs {\r\n        position: relative;\r\n        margin: 40px auto;\r\n        margin-bottom: 0;\r\n        border-bottom-color: #e0e0e0;\r\n    }\r\n\r\n    .upload-wizard>div.upload-wizard-inner {\r\n        position: relative;\r\n    }\r\n\r\n    .connecting-line {\r\n        height: 2px;\r\n        background: #e0e0e0;\r\n        position: absolute;\r\n        width: 80%;\r\n        margin: 0 auto;\r\n        left: 0;\r\n        right: 0;\r\n        top: 50%;\r\n        z-index: 1;\r\n    }\r\n\r\n    .upload-wizard .nav-tabs>li.active>a, .upload-wizard .nav-tabs>li.active>a:hover, .upload-wizard .nav-tabs>li.active>a:focus {\r\n        color: #555555;\r\n        cursor: default;\r\n        border: 0;\r\n        border-bottom-color: transparent;\r\n    }\r\n\r\n    span.round-tab {\r\n        width: 70px;\r\n        height: 70px;\r\n        line-height: 70px;\r\n        display: inline-block;\r\n        border-radius: 100px;\r\n        background: #fff;\r\n        border: 2px solid #e0e0e0;\r\n        z-index: 2;\r\n        position: absolute;\r\n        left: 0;\r\n        text-align: center;\r\n        font-size: 25px;\r\n    }\r\n\r\n    span.round-tab i {\r\n        color: #555555;\r\n    }\r\n\r\n    .upload-wizard li.active span.round-tab {\r\n        background: #fff;\r\n        border: 2px solid #337ab7;\r\n    }\r\n\r\n    .upload-wizard li.active span.round-tab i {\r\n        color: #337ab7;\r\n    }\r\n\r\n    span.round-tab:hover {\r\n        color: #333;\r\n        border: 2px solid #333;\r\n    }\r\n\r\n    .upload-wizard .nav-tabs>li {\r\n        width: 25%;\r\n    }\r\n\r\n    .upload-wizard li:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 46%;\r\n        opacity: 0;\r\n        margin: 0 auto;\r\n        bottom: 0px;\r\n        border: 5px solid transparent;\r\n        border-bottom-color: #337ab7;\r\n        transition: 0.1s ease-in-out;\r\n    }\r\n\r\n    .upload-wizard li.active:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 46%;\r\n        opacity: 1;\r\n        margin: 0 auto;\r\n        bottom: 0px;\r\n        border: 10px solid transparent;\r\n        border-bottom-color: #337ab7;\r\n    }\r\n\r\n    .upload-wizard .nav-tabs>li a {\r\n        width: 70px;\r\n        height: 70px;\r\n        margin: 20px auto;\r\n        border-radius: 100%;\r\n        padding: 0;\r\n    }\r\n\r\n    .upload-wizard .nav-tabs>li a:hover {\r\n        background: transparent;\r\n    }\r\n\r\n    .upload-wizard .tab-pane {\r\n        position: relative;\r\n        padding-top: 50px;\r\n        border: 1px solid #ccc;\r\n        border-radius: 5px;\r\n        padding: 50px;\r\n    }\r\n\r\n    .upload-wizard h3 {\r\n        margin-top: 0;\r\n    }\r\n\r\n    @media( max-width: 585px) {\r\n        .upload-wizard {\r\n            width: 90%;\r\n            height: auto !important;\r\n        }\r\n        span.round-tab {\r\n            font-size: 16px;\r\n            width: 50px;\r\n            height: 50px;\r\n            line-height: 50px;\r\n        }\r\n        .upload-wizard .nav-tabs>li a {\r\n            width: 50px;\r\n            height: 50px;\r\n            line-height: 50px;\r\n        }\r\n        .upload-wizard li.active:after {\r\n            content: \" \";\r\n            position: absolute;\r\n            left: 35%;\r\n        }\r\n    }\r\n\r\n    body.modal-open .main-container {\r\n        filter: blur(3px);\r\n        -webkit-filter: blur(3px);\r\n        -ms-filter: blur(3px);\r\n        filter: url(\"data:image/svg+xml;utf9,<svg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'><filter%20id='blur'><feGaussianBlur%20stdDeviation='3'%20/></filter></svg>#blur\");\r\n        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');\r\n    }\r\n\r\n    .glyphicon-refresh-animate {\r\n        -animation: spin .7s infinite linear;\r\n        -webkit-animation: spin2 .7s infinite linear;\r\n    }\r\n\r\n    @-webkit-keyframes spin2 {\r\n        from {\r\n            -webkit-transform: rotate(0deg);\r\n        }\r\n        to {\r\n            -webkit-transform: rotate(360deg);\r\n        }\r\n    }\r\n\r\n    @keyframes spin {\r\n        from {\r\n            transform: scale(1) rotate(0deg);\r\n        }\r\n        to {\r\n            transform: scale(1) rotate(360deg);\r\n        }\r\n    }\r\n", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTcxNmFmNWFhY2YwY2RiZGRiOWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi91cGxvYWQvdXBsb2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vdXBsb2FkL3VwbG9hZC5jc3M/OGQyMyIsIndlYnBhY2s6Ly8vLi91cGxvYWQvdXBsb2FkLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywwQkFBMEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IseUJBQXlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseUJBQXlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNuYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7OztBQ3hGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBLDBFQUEyRSwrQkFBK0IseUJBQXlCLDBCQUEwQix1Q0FBdUMsU0FBUyx5QkFBeUIsOERBQThELHVDQUF1QyxTQUFTLHFCQUFxQix3QkFBd0IsK0JBQStCLCtCQUErQix3QkFBd0IsU0FBUyx3QkFBd0Isc0JBQXNCLHdCQUF3Qiw2QkFBNkIsK0JBQStCLDJCQUEyQixTQUFTLHlCQUF5QiwrQkFBK0Isc0JBQXNCLHVCQUF1Qix3QkFBd0IseUJBQXlCLDBCQUEwQix1QkFBdUIsU0FBUyxtQkFBbUIsOERBQThELHVDQUF1QyxTQUFTLHNCQUFzQixtQ0FBbUMsU0FBUyxvREFBb0QsZ0RBQWdELGdDQUFnQyx5QkFBeUIsd0JBQXdCLFNBQVMsOERBQThELGdDQUFnQyxTQUFTLDZCQUE2QiwyQkFBMkIsMkJBQTJCLFNBQVMsNEJBQTRCLDhCQUE4Qiw2QkFBNkIsU0FBUyxzQ0FBc0MsK0JBQStCLDhCQUE4Qiw2QkFBNkIseUNBQXlDLFNBQVMsb0RBQW9ELCtCQUErQixTQUFTLDhCQUE4Qix3QkFBd0IsZ0NBQWdDLCtCQUErQix1QkFBdUIsMkJBQTJCLG9CQUFvQixxQkFBcUIscUJBQXFCLHVCQUF1QixTQUFTLDBJQUEwSSwyQkFBMkIsNEJBQTRCLHNCQUFzQiw2Q0FBNkMsU0FBUyw0QkFBNEIsd0JBQXdCLHlCQUF5Qiw4QkFBOEIsa0NBQWtDLGlDQUFpQyw2QkFBNkIsc0NBQXNDLHVCQUF1QiwrQkFBK0Isb0JBQW9CLCtCQUErQiw0QkFBNEIsU0FBUyw4QkFBOEIsMkJBQTJCLFNBQVMscURBQXFELDZCQUE2QixzQ0FBc0MsU0FBUyx1REFBdUQsMkJBQTJCLFNBQVMsa0NBQWtDLHdCQUF3QixtQ0FBbUMsU0FBUyx5Q0FBeUMsdUJBQXVCLFNBQVMscUNBQXFDLDJCQUEyQiwrQkFBK0Isc0JBQXNCLHVCQUF1QiwyQkFBMkIsd0JBQXdCLDBDQUEwQyx5Q0FBeUMseUNBQXlDLFNBQVMsNENBQTRDLDJCQUEyQiwrQkFBK0Isc0JBQXNCLHVCQUF1QiwyQkFBMkIsd0JBQXdCLDJDQUEyQyx5Q0FBeUMsU0FBUywyQ0FBMkMsd0JBQXdCLHlCQUF5Qiw4QkFBOEIsZ0NBQWdDLHVCQUF1QixTQUFTLGlEQUFpRCxvQ0FBb0MsU0FBUyxzQ0FBc0MsK0JBQStCLDhCQUE4QixtQ0FBbUMsK0JBQStCLDBCQUEwQixTQUFTLCtCQUErQiwwQkFBMEIsU0FBUyx1Q0FBdUMsNEJBQTRCLDJCQUEyQix3Q0FBd0MsYUFBYSw0QkFBNEIsZ0NBQWdDLDRCQUE0Qiw2QkFBNkIsa0NBQWtDLGFBQWEsMkNBQTJDLDRCQUE0Qiw2QkFBNkIsa0NBQWtDLGFBQWEsNENBQTRDLCtCQUErQixtQ0FBbUMsMEJBQTBCLGFBQWEsU0FBUyw2Q0FBNkMsOEJBQThCLHNDQUFzQyxrQ0FBa0MsNkNBQTZDLGtKQUFrSiw0RUFBNEUsU0FBUyx3Q0FBd0MsaURBQWlELHlEQUF5RCxTQUFTLHNDQUFzQyxrQkFBa0IsZ0RBQWdELGFBQWEsZ0JBQWdCLGtEQUFrRCxhQUFhLFNBQVMsNkJBQTZCLGtCQUFrQixpREFBaUQsYUFBYSxnQkFBZ0IsbURBQW1ELGFBQWEsU0FBUzs7QUFFNXlMIiwiZmlsZSI6InVwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNzE2YWY1YWFjZjBjZGJkZGI5YyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtbGV0cyovXHJcbi8qZ2xvYmFsICQsIFNldCovXHJcbid1c2Ugc3RyaWN0JztcclxuaW1wb3J0ICcuL3VwbG9hZC5jc3MnO1xyXG5cclxuLy9kaXNhYmxlIHRoZSBzdWJtaXQgYnV0dG9uXHJcbmRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuJCgnI21ldGFkYXRhJykudmFsKCcnKTtcclxuJCgnI21vdmVtZW50JykudmFsKCcnKTtcclxuXHJcbi8qKlxyXG4gKiBVcGxvYWQgZm9ybSBtb3ZlbWVudCBmaWxlXHJcbiAqL1xyXG4kKCcjbW92ZW1lbnQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvL3Jlc2V0IHRoZSBtb3ZlbWVudCBhbGVydCBmaWVsZHNcclxuICAgIGNoYW5nZUFsZXJ0V2FybmluZygnI21vdmVtZW50LWlzLWNzdicpO1xyXG4gICAgY2hhbmdlQWxlcnRXYXJuaW5nKCcjbW92ZW1lbnQtY29ycmVjdC1maWVsZHMnKTtcclxuICAgIGNoYW5nZUFsZXJ0V2FybmluZygnI21vdmVtZW50LWZpbGUtY29ycmVjdCcpO1xyXG4gICAgY2hhbmdlQWxlcnRXYXJuaW5nKCcjbW92ZW1lbnQtcHJpbWFyeS1rZXknKTtcclxuICAgIC8vIGFsbG93ZWQgZXh0ZW5zaW9uc1xyXG4gICAgbGV0IGZpbGVFeHRlbnNpb24gPSBbJ2NzdiddO1xyXG4gICAgLy8gY2hlY2sgaWYgZXh0ZW5zaW9uIGlzIGNzdiwgaWYgbm90IG1ha2UgYW4gYWxlcnRcclxuICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS52YWwoKS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCksIGZpbGVFeHRlbnNpb24pID09IC0xKSB7XHJcbiAgICAgICAgLy9kaXNhYmxlIHRoZSBzdWJtaXQgYnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbW92ZW1lbnQtaXMtY3N2Jyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVuYWJsZSBzdWJtaXQgYnV0dG9uXHJcbiAgICBlbmFibGVTdWJtaXRCdXR0b24oKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGNzdiBmaWxlIGlucHV0IGlzIGNvcnJlY3RcclxuICAgICQoJyNtb3ZlbWVudCcpLnBhcnNlKHtcclxuICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgZGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgZHluYW1pY1R5cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgc2tpcEVtcHR5TGluZXM6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICBUaGUgY2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIHBhcnNpbmcgaXMgY29tcGxldGVcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlRm4ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGhlYWRlciBpcyBjb3JyZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBuZWVkZWQgZmllbGRzIDogaWQsdGltZSx4LHlcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLm1ldGEuZmllbGRzLmxlbmd0aCA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uZWVkZWQgZmllbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lZWRlZF9maWVsZHMgPSBbJ2FuaW1hbF9pZCcsICd0aW1lJywgJ3gnLCAneSddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmllbGRzIG9mIHRoZSBjc3YgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZHMgPSByZXN1bHRzLm1ldGEuZmllbGRzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhcmUgdGhlIGZpZWxkcyAtIHRoaXMgaXMgY2FzZSBpbnNlbnNpdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcXVlcnkgPSBuZWVkZWRfZmllbGRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSBmaWVsZCBpcyBtaXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZHMuZmluZEluZGV4KGl0ZW0gPT4gcXVlcnkgPT09IGl0ZW0pIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1RoZSBNb3ZlbWVudCBDU1YgZmlsZSBpcyBtaXNzaW5nIHRoZSBmaWVsZDogJyArIHF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbW92ZW1lbnQtY29ycmVjdC1maWVsZHMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IC8vIG5vdCB0aGUgY29ycmVjdCBudW1iZXIgb2YgZmllbGRzIGluIHRoZSBjc3YgZmlsZVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlQWxlcnREYW5nZXIoJyNtb3ZlbWVudC1jb3JyZWN0LWZpZWxkcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGFyZSBlcnJvcnNcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLmVycm9ycy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRVJST1I6JyArIHJlc3VsdHMuZXJyb3JzWzBdWydtZXNzYWdlJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGVtcHR5XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbW92ZW1lbnQtaXMtY3N2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUganVzdCBudW1iZXJzIGluIHRoZSBjc3ZcclxuICAgICAgICAgICAgICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgbm8gZW1wdHkgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIocmVzdWx0cy5kYXRhW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnU29tZXRoaW5nIGlzIHdyb25nIGluIENTViBsaW5lICcgKyAoaSArIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VBbGVydERhbmdlcignI21vdmVtZW50LWZpbGUtY29ycmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IG1pbiBtYXggdmFsdWVzIGZvciBlbnZpcm9ubWVudFxyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbHVlcyA9IFtyZXN1bHRzLmRhdGFbMF1bJ3gnXSwgcmVzdWx0cy5kYXRhWzBdWyd5J11dO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlcyA9IFtyZXN1bHRzLmRhdGFbMF1bJ3gnXSwgcmVzdWx0cy5kYXRhWzBdWyd5J11dO1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgbWluIG1heCB2YWx1ZXMgaW4gdGhlIGVudmlyb25tZW50IGZvcm0gZmllbGRzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW5WYWx1ZXNbMF0gPiByZXN1bHRzLmRhdGFbaV1bJ3gnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZXNbMF0gPSByZXN1bHRzLmRhdGFbaV1bJ3gnXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pblZhbHVlc1sxXSA+IHJlc3VsdHMuZGF0YVtpXVsneSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblZhbHVlc1sxXSA9IHJlc3VsdHMuZGF0YVtpXVsneSddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4VmFsdWVzWzBdIDwgcmVzdWx0cy5kYXRhW2ldWyd4J10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWVzWzBdID0gcmVzdWx0cy5kYXRhW2ldWyd4J107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhWYWx1ZXNbMV0gPCByZXN1bHRzLmRhdGFbaV1bJ3knXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZXNbMV0gPSByZXN1bHRzLmRhdGFbaV1bJ3knXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKCcjbWluX3gnKS52YWwobWluVmFsdWVzWzBdKTtcclxuICAgICAgICAgICAgICAgICQoJyNtaW5feScpLnZhbChtaW5WYWx1ZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgJCgnI21heF94JykudmFsKG1heFZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjbWF4X3knKS52YWwobWF4VmFsdWVzWzFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlIGVudHJpZXNcclxuICAgICAgICAgICAgICAgIGxldCBzZWVuID0gbmV3IFNldCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhc0R1cGxpY2F0ZXMgPSByZXN1bHRzLmRhdGEuc29tZShmdW5jdGlvbihjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlZW4uc2l6ZSA9PT0gc2Vlbi5hZGQoSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwazE6IGN1cnJlbnRbJ3RpbWUnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGsyOiBjdXJyZW50WydhbmltYWxfaWQnXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzRHVwbGljYXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbW92ZW1lbnQtcHJpbWFyeS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdyZWF0IHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0U3VjY2VzcygnI21vdmVtZW50LWlzLWNzdicpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQWxlcnRTdWNjZXNzKCcjbW92ZW1lbnQtY29ycmVjdC1maWVsZHMnKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0U3VjY2VzcygnI21vdmVtZW50LWZpbGUtY29ycmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQWxlcnRTdWNjZXNzKCcjbW92ZW1lbnQtcHJpbWFyeS1rZXknKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmVmb3JlRmlyc3RDaHVuazogZnVuY3Rpb24oY2h1bmspIHtcclxuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBoZWFkZXIgdG8gbG93ZXJjYXNlIHRvIG1ha2UgaXQgY2FzZSBpbnNlbnNpdGl2ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd3MgPSBjaHVuay5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkaW5ncyA9IHJvd3NbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHJvd3NbMF0gPSBoZWFkaW5ncztcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dzLmpvaW4oJ1xcclxcbicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4vKipcclxuICogVXBsb2FkIGZvcm0gbWV0YWRhdGEgZmlsZVxyXG4gKi9cclxuJCgnI21ldGFkYXRhJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy9yZXNldCB0aGUgbW92ZW1lbnQgYWxlcnQgZmllbGRzXHJcbiAgICBjaGFuZ2VBbGVydFdhcm5pbmcoJyNtZXRhZGF0YS1pcy1jc3YnKTtcclxuICAgIGNoYW5nZUFsZXJ0V2FybmluZygnI21ldGFkYXRhLWNvcnJlY3QtZmllbGRzJyk7XHJcbiAgICBjaGFuZ2VBbGVydFdhcm5pbmcoJyNtZXRhZGF0YS1maWxlLWNvcnJlY3QnKTtcclxuICAgIGNoYW5nZUFsZXJ0V2FybmluZygnI21ldGFkYXRhLXByaW1hcnkta2V5Jyk7XHJcbiAgICAvLyBhbGxvd2VkIGV4dGVuc2lvbnNcclxuICAgIGxldCBmaWxlRXh0ZW5zaW9uID0gWydjc3YnXTtcclxuICAgIC8vIGNoZWNrIGlmIGV4dGVuc2lvbiBpcyBjc3YsIGlmIG5vdCBtYWtlIGFuIGFsZXJ0XHJcbiAgICBpZiAoJC5pbkFycmF5KCQodGhpcykudmFsKCkuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpLCBmaWxlRXh0ZW5zaW9uKSA9PSAtMSkge1xyXG4gICAgICAgIC8vZGlzYWJsZSB0aGUgc3VibWl0IGJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICBjaGFuZ2VBbGVydERhbmdlcignI21ldGFkYXRhLWlzLWNzdicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJCgnI21vdmVtZW50JykudmFsKCkpIHtcclxuICAgICAgICAvLyBFbmFibGUgc3VibWl0IGJ1dHRvblxyXG4gICAgICAgIGVuYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgaWYgY3N2IGZpbGUgaW5wdXQgaXMgY29ycmVjdFxyXG4gICAgJCgnI21ldGFkYXRhJykucGFyc2Uoe1xyXG4gICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBkeW5hbWljVHlwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICBza2lwRW1wdHlMaW5lczogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gIFRoZSBjYWxsYmFjayB0byBleGVjdXRlIHdoZW4gcGFyc2luZyBpcyBjb21wbGV0ZVxyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGVGbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAvL25lZWRlZCBmaWVsZHNcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkZWRfZmllbGRzID0gWydhbmltYWxfaWQnLCAnc3BlY2llcycsICdzZXgnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuICAgICAgICAgICAgICAgIC8vZmllbGRzIG9mIHRoZSBjc3YgZmlsZVxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkcyA9IHJlc3VsdHMubWV0YS5maWVsZHM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgaGVhZGVyIGlzIGNvcnJlY3RcclxuICAgICAgICAgICAgICAgIC8vIG5lZWRlZCBmaWVsZHMgOiBpZCx0aW1lLHgseVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMubWV0YS5maWVsZHMubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYXJlIHRoZSBmaWVsZHMgLSB0aGlzIGlzIGNhc2UgaW5zZW5zaXRpdmVcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRlZF9maWVsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gbmVlZGVkX2ZpZWxkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGUgZmllbGQgaXMgbWlzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRzLmZpbmRJbmRleChpdGVtID0+IHF1ZXJ5ID09PSBpdGVtKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUaGUgbWV0YWRhdGEgQ1NWIGZpbGUgaXMgbWlzc2luZyB0aGUgZmllbGQ6ICcgKyBxdWVyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VBbGVydERhbmdlcignI21ldGFkYXRhLWNvcnJlY3QtZmllbGRzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSAvLyBub3QgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGZpZWxkcyBpbiB0aGUgY3N2IGZpbGVcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbWV0YWRhdGEtY29ycmVjdC1maWVsZHMnKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aGVyZSBhcmUgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5lcnJvcnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0VSUk9SOicgKyByZXN1bHRzLmVycm9yc1swXVsnbWVzc2FnZSddKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBlbXB0eVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VBbGVydERhbmdlcignI21ldGFkYXRhLWlzLWNzdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGp1c3QgbnVtYmVycyBpbiB0aGUgY3N2XHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgaWYgdGhlcmUgYXJlIG5vIGVtcHR5IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRoZSBpZCBpcyBhIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbGV0SXNOdW1iZXIocmVzdWx0cy5kYXRhW2ldWydhbmltYWxfaWQnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1NvbWV0aGluZyBpcyB3cm9uZyBpbiBDU1YgbGluZSAnICsgKGkgKyAyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQWxlcnREYW5nZXIoJyNtZXRhZGF0YS1maWxlLWNvcnJlY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGFyZSBhbHNvIG5vIGVtcHR5IG9yIG51bGwgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHJlc3VsdHMuZGF0YVtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5kYXRhW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0cy5kYXRhW2ldW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnU29tZXRoaW5nIGlzIHdyb25nIGluIENTViBsaW5lICcgKyAoaSArIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQWxlcnREYW5nZXIoJyNtZXRhZGF0YS1maWxlLWNvcnJlY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGR1cGxpY2F0ZSBlbnRyaWVzXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VlbiA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNEdXBsaWNhdGVzID0gcmVzdWx0cy5kYXRhLnNvbWUoZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWVuLnNpemUgPT09IHNlZW4uYWRkKGN1cnJlbnRbJ2FuaW1hbF9pZCddKS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzRHVwbGljYXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0RGFuZ2VyKCcjbWV0YWRhdGEtcHJpbWFyeS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdyZWF0IHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0U3VjY2VzcygnI21ldGFkYXRhLWlzLWNzdicpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQWxlcnRTdWNjZXNzKCcjbWV0YWRhdGEtY29ycmVjdC1maWVsZHMnKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUFsZXJ0U3VjY2VzcygnI21ldGFkYXRhLWZpbGUtY29ycmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQWxlcnRTdWNjZXNzKCcjbWV0YWRhdGEtcHJpbWFyeS1rZXknKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmVmb3JlRmlyc3RDaHVuazogZnVuY3Rpb24oY2h1bmspIHtcclxuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBoZWFkZXIgdG8gbG93ZXJjYXNlIHRvIG1ha2UgaXQgY2FzZSBpbnNlbnNpdGl2ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd3MgPSBjaHVuay5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkaW5ncyA9IHJvd3NbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHJvd3NbMF0gPSBoZWFkaW5ncztcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dzLmpvaW4oJ1xcclxcbicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBFbmFibGUgc3VtYml0IGJ1dHRvblxyXG4gKi9cclxuZnVuY3Rpb24gZW5hYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgJCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlIHN1bWJpdCBidXR0b25cclxuICovXHJcbmZ1bmN0aW9uIGRpc2FibGVTdWJtaXRCdXR0b24oKSB7XHJcbiAgICAkKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGFsbCBvYmplY3QgaXRlbXMgYXJlIG51bWJlcnMgYW5kIG5vdCBOYU5cclxuICovXHJcbmZ1bmN0aW9uIGlzTnVtYmVyKG9iaikge1xyXG4gICAgbGV0IHNvbHV0aW9uID0gdHJ1ZTtcclxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBpZiAoaXNOYU4ocGFyc2VGbG9hdChvYmpba2V5XSkpKSB7XHJcbiAgICAgICAgICAgIHNvbHV0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc29sdXRpb247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBvYmplY3QgaXMgbnVtYmVyIGFuZCBub3QgTmFOXHJcbiAqL1xyXG5mdW5jdGlvbiBsZXRJc051bWJlcihvYmopIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYWcgYW5kIGRyb3AgZWZmZWN0cyAtIHN0aWxsIG1pbm9yIGlzc3Vlc1xyXG4gKiBnZXRzIHN0dWNrIHNvbWV0aW1lc1xyXG4gKi9cclxubGV0IGRyb3BDb3VudGVyID0gMDtcclxuJCgnLmRyb3AnKS5iaW5kKHtcclxuICAgIGRyYWdlbnRlcjogZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICBkcm9wQ291bnRlcisrO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2JsdWUnKTtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcmFnbGVhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRyb3BDb3VudGVyLS07XHJcbiAgICAgICAgaWYgKGRyb3BDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2JsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHJvcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCdzcGFuJykuYWRkQ2xhc3MoJ2Ryb3BwZWQnKTtcclxuICAgICAgICBkcm9wQ291bnRlciA9IDA7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYmx1ZScpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBEcmFnIGFuZCBkcm9wIG1vdmVtZW50IGlucHV0XHJcbiAqL1xyXG4kKCcjbW92ZW1lbnQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcjbW92ZW1lbnQtZHJvcC10ZXh0JykudGV4dCh0aGlzLmZpbGVzWzBdLm5hbWUpO1xyXG4gICAgJCgnI21vdmVtZW50ICsgc3BhbicpLmFkZENsYXNzKCdkcm9wcGVkJyk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBEcmFnIGFuZCBkcm9wIG1ldGFkYXRhIGlucHV0XHJcbiAqL1xyXG4kKCcjbWV0YWRhdGEnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcjbWV0YWRhdGEtZHJvcC10ZXh0JykudGV4dCh0aGlzLmZpbGVzWzBdLm5hbWUpO1xyXG4gICAgJCgnI21ldGFkYXRhICsgc3BhbicpLmFkZENsYXNzKCdkcm9wcGVkJyk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSBhbGVydCB0byBXYXJuaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBjaGFuZ2VBbGVydFdhcm5pbmcoc2VsKSB7XHJcbiAgICAkKHNlbClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gKGNzcy5tYXRjaCgvKF58XFxzKWFsZXJ0LVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hZGRDbGFzcygnYWxlcnQtd2FybmluZycpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhbmdlIGFsZXJ0IHRvIGRhbmdlclxyXG4gKi9cclxuZnVuY3Rpb24gY2hhbmdlQWxlcnREYW5nZXIoc2VsKSB7XHJcbiAgICAkKHNlbClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gKGNzcy5tYXRjaCgvKF58XFxzKWFsZXJ0LVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hZGRDbGFzcygnYWxlcnQtZGFuZ2VyJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgYWxlcnQgdG8gc3VjY2Vzc1xyXG4gKi9cclxuZnVuY3Rpb24gY2hhbmdlQWxlcnRTdWNjZXNzKHNlbCkge1xyXG4gICAgJChzZWwpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChjc3MubWF0Y2goLyhefFxccylhbGVydC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNob3cgdGhlIHVwbG9hZGluZyBpY29uIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdFxyXG4gKi9cclxuJCgnI3N1Ym1pdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxufSk7XHJcblxyXG5cclxuLy8gdXBsb2FkIGZyb20gdXBsb2FkLXdpemFyZCB1c2luZyB0YWJcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvL0luaXRpYWxpemUgdG9vbHRpcHNcclxuICAgICQoJy5uYXYtdGFicyA+IGxpIGFbdGl0bGVdJykudG9vbHRpcCgpO1xyXG5cclxuICAgIC8vdXBsb2FkLXdpemFyZFxyXG4gICAgJCgnYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScpLm9uKCdzaG93LmJzLnRhYicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKCR0YXJnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5uZXh0LXN0ZXAnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRhY3RpdmUgPSAkKCcudXBsb2FkLXdpemFyZCAubmF2LXRhYnMgbGkuYWN0aXZlJyk7XHJcbiAgICAgICAgJGFjdGl2ZS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgbmV4dFRhYigkYWN0aXZlKTtcclxuXHJcbiAgICB9KTtcclxuICAgICQoJy5wcmV2LXN0ZXAnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRhY3RpdmUgPSAkKCcudXBsb2FkLXdpemFyZCAubmF2LXRhYnMgbGkuYWN0aXZlJyk7XHJcbiAgICAgICAgcHJldlRhYigkYWN0aXZlKTtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBuZXh0VGFiKGVsZW0pIHtcclxuICAgICQoZWxlbSkubmV4dCgpLmZpbmQoJ2FbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKS5jbGljaygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmV2VGFiKGVsZW0pIHtcclxuICAgICQoZWxlbSkucHJldigpLmZpbmQoJ2FbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKS5jbGljaygpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXBsb2FkL3VwbG9hZC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi91cGxvYWQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3VwbG9hZC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vdXBsb2FkLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91cGxvYWQvdXBsb2FkLmNzc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiICAgIC8qIERyYWcgYW5kIGRyb3AgdXBsb2FkICovXFxyXFxuXFxyXFxuICAgIC5kcm9wIHtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMjAwcHg7XFxyXFxuICAgICAgICBib3JkZXI6IDRweCBkYXNoZWQgI0UwRTBFMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuZHJvcDpob3ZlciB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcclxcbiAgICAgICAgYm9yZGVyOiA0cHggZGFzaGVkICM3MzczNzM7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmRyb3AgcCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMzBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5kcm9wIHNwYW4ge1xcclxcbiAgICAgICAgdG9wOiA1MHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBmb250LXNpemU6IDIuNWVtO1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgY29sb3I6ICNEOUQ5RDk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmRyb3AgaW5wdXQge1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgICAgcGFkZGluZzogMDtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmJsdWUge1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXHJcXG4gICAgICAgIGJvcmRlcjogNHB4IGRhc2hlZCAjMzM3YWI3O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5kcm9wcGVkIHtcXHJcXG4gICAgICAgIGNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBhbmVsLWhlYWRpbmcgLmFjY29yZGlvbi10b2dnbGU6YWZ0ZXIge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwiXFxcXEUxMTRcXFwiO1xcclxcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICAgICAgY29sb3I6IGdyZXk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBhbmVsLWhlYWRpbmcgLmFjY29yZGlvbi10b2dnbGUuY29sbGFwc2VkOmFmdGVyIHtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCJcXFxcRTA4MFxcXCI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnJlcXVpcmVkOmFmdGVyIHtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCIqXFxcIjtcXHJcXG4gICAgICAgIGNvbG9yOiAjY2IxODFkO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC51cGxvYWQtd2l6YXJkIHtcXHJcXG4gICAgICAgIG1hcmdpbjogMjBweCBhdXRvO1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCAubmF2LXRhYnMge1xcclxcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICAgICAgbWFyZ2luOiA0MHB4IGF1dG87XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2UwZTBlMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZD5kaXYudXBsb2FkLXdpemFyZC1pbm5lciB7XFxyXFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmNvbm5lY3RpbmctbGluZSB7XFxyXFxuICAgICAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgICAgIGJhY2tncm91bmQ6ICNlMGUwZTA7XFxyXFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICB3aWR0aDogODAlO1xcclxcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgICAgICBsZWZ0OiAwO1xcclxcbiAgICAgICAgcmlnaHQ6IDA7XFxyXFxuICAgICAgICB0b3A6IDUwJTtcXHJcXG4gICAgICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnVwbG9hZC13aXphcmQgLm5hdi10YWJzPmxpLmFjdGl2ZT5hLCAudXBsb2FkLXdpemFyZCAubmF2LXRhYnM+bGkuYWN0aXZlPmE6aG92ZXIsIC51cGxvYWQtd2l6YXJkIC5uYXYtdGFicz5saS5hY3RpdmU+YTpmb2N1cyB7XFxyXFxuICAgICAgICBjb2xvcjogIzU1NTU1NTtcXHJcXG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcXHJcXG4gICAgICAgIGJvcmRlcjogMDtcXHJcXG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIHNwYW4ucm91bmQtdGFiIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDcwcHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcXHJcXG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTBlMGUwO1xcclxcbiAgICAgICAgei1pbmRleDogMjtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIGxlZnQ6IDA7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBmb250LXNpemU6IDI1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgc3Bhbi5yb3VuZC10YWIgaSB7XFxyXFxuICAgICAgICBjb2xvcjogIzU1NTU1NTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCBsaS5hY3RpdmUgc3Bhbi5yb3VuZC10YWIge1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzdhYjc7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnVwbG9hZC13aXphcmQgbGkuYWN0aXZlIHNwYW4ucm91bmQtdGFiIGkge1xcclxcbiAgICAgICAgY29sb3I6ICMzMzdhYjc7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgc3Bhbi5yb3VuZC10YWI6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6ICMzMzM7XFxyXFxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjMzMzO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC51cGxvYWQtd2l6YXJkIC5uYXYtdGFicz5saSB7XFxyXFxuICAgICAgICB3aWR0aDogMjUlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC51cGxvYWQtd2l6YXJkIGxpOmFmdGVyIHtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIGxlZnQ6IDQ2JTtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgICAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgICAgIGJvdHRvbTogMHB4O1xcclxcbiAgICAgICAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxyXFxuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogMC4xcyBlYXNlLWluLW91dDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCBsaS5hY3RpdmU6YWZ0ZXIge1xcclxcbiAgICAgICAgY29udGVudDogXFxcIiBcXFwiO1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgbGVmdDogNDYlO1xcclxcbiAgICAgICAgb3BhY2l0eTogMTtcXHJcXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgICAgICAgYm90dG9tOiAwcHg7XFxyXFxuICAgICAgICBib3JkZXI6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxyXFxuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC51cGxvYWQtd2l6YXJkIC5uYXYtdGFicz5saSBhIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcclxcbiAgICAgICAgcGFkZGluZzogMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCAubmF2LXRhYnM+bGkgYTpob3ZlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCAudGFiLXBhbmUge1xcclxcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDUwcHg7XFxyXFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgICAgcGFkZGluZzogNTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudXBsb2FkLXdpemFyZCBoMyB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIEBtZWRpYSggbWF4LXdpZHRoOiA1ODVweCkge1xcclxcbiAgICAgICAgLnVwbG9hZC13aXphcmQge1xcclxcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICBzcGFuLnJvdW5kLXRhYiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIC51cGxvYWQtd2l6YXJkIC5uYXYtdGFicz5saSBhIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAudXBsb2FkLXdpemFyZCBsaS5hY3RpdmU6YWZ0ZXIge1xcclxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXHJcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgbGVmdDogMzUlO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGJvZHkubW9kYWwtb3BlbiAubWFpbi1jb250YWluZXIge1xcclxcbiAgICAgICAgZmlsdGVyOiBibHVyKDNweCk7XFxyXFxuICAgICAgICAtd2Via2l0LWZpbHRlcjogYmx1cigzcHgpO1xcclxcbiAgICAgICAgLW1zLWZpbHRlcjogYmx1cigzcHgpO1xcclxcbiAgICAgICAgZmlsdGVyOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY5LDxzdmclMjB2ZXJzaW9uPScxLjEnJTIweG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyJTIwaWQ9J2JsdXInPjxmZUdhdXNzaWFuQmx1ciUyMHN0ZERldmlhdGlvbj0nMyclMjAvPjwvZmlsdGVyPjwvc3ZnPiNibHVyXFxcIik7XFxyXFxuICAgICAgICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CbHVyKFBpeGVsUmFkaXVzPSczJyk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmdseXBoaWNvbi1yZWZyZXNoLWFuaW1hdGUge1xcclxcbiAgICAgICAgLWFuaW1hdGlvbjogc3BpbiAuN3MgaW5maW5pdGUgbGluZWFyO1xcclxcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4yIC43cyBpbmZpbml0ZSBsaW5lYXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4yIHtcXHJcXG4gICAgICAgIGZyb20ge1xcclxcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICB0byB7XFxyXFxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICAgICAgICBmcm9tIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIHRvIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3VwbG9hZC91cGxvYWQuY3NzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9