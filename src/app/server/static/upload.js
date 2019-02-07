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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__upload_css__);
/*eslint-disable no-unused-lets*/
/*global $, Set*/



let inputVariablesBool = false;
let inputFilesBool = false;

//disable the submit button
triggerSubmitButton();
$('#upload-form').trigger('reset');

/**
 * Check input variables form card
 */
$('#input-variables-card').on('change', function() {
    let empty = $('#input-variables-card').find('input').filter(function() {
        return this.value === '';
    });
    // check if input is emtpy
    if (empty.length) {
        inputVariablesBool = false;
        $('#input-variables-card').removeClass('border-success');
        $('#input-variables-card').addClass('border-warning');
    } else {
        $('#input-variables-card').removeClass('border-warning');
        $('#input-variables-card').addClass('border-success');
        inputVariablesBool = true;
    }
    triggerSubmitButton();
});

/**
 * Upload form movement file
 */
$('#movement').on('change', function() {
    inputFilesBool = false;
    $('#movement-file-card').removeClass('border-success');
    $('#movement-file-card').addClass('border-warning');

    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Movement File', 'The file extension is not csv');
        return;
    }

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
                            appendAlertWarning('Movement File', 'The file is missing the the header field ' + query);
                            return;
                        }
                    }
                } // not the correct number of fields in the csv file
                else {
                    appendAlertWarning('Movement File', 'The number of header fields is not correct');
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    appendAlertWarning('Movement File', 'ERROR:' + results.errors[0]['message']);
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    appendAlertWarning('Movement File', 'File seems to be emtpy');
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    if (!isNumber(results.data[i])) {
                        appendAlertWarning('Movement File', 'Something is wrong in CSV line ' + (i + 2));
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

                // great success
                $('#file-alerts').empty();
                inputFilesBool = true;
                $('#movement-file-card').removeClass('border-warning');
                $('#movement-file-card').addClass('border-success');
                $('#input-variables-card').change();
                triggerSubmitButton();
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
    $('#reference-file-card').removeClass('border-success');
    $('#reference-file-card').addClass('border-warning');

    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Reference File', 'The file extension is not csv');
        return;
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
                            appendAlertWarning('Reference File', 'The file is missing the header field: ' + query);
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    appendAlertWarning('Reference File', 'The file has not the correct number of header fields');
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    appendAlertWarning('Reference File', 'ERROR:' + results.errors[0]['message']);
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    appendAlertWarning('Reference File', 'The file seems to be empty');
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    //check if the id is a number
                    if (!letIsNumber(results.data[i]['animal_id'])) {
                        appendAlertWarning('Reference File', 'Something is wrong in CSV line ' + (i + 2));
                        return;
                    }
                    //check if there are also no empty or null values
                    for (let key in results.data[i]) {
                        if (results.data[i].hasOwnProperty(key)) {
                            if (!results.data[i][key]) {
                                appendAlertWarning('Reference File', 'Something is wrong in CSV line ' + (i + 2));
                                return;
                            }
                        }

                    }
                }

                // great success
                $('#file-alerts').empty();
                $('#reference-file-card').removeClass('border-warning');
                $('#reference-file-card').addClass('border-success');
                $('#input-variables-card').change();
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
 * Check if the image has the right img extension
 */
$('#background_image').on('change', function() {
    $('#background-image-card').removeClass('border-success');
    $('#background-image-card').addClass('border-warning');

    let fileExtension = ['png', 'jpg', 'jpeg'];
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Background image', 'Only formats are allowed : ' + fileExtension.join(', '));
    } else {
        $('#background-image-card').removeClass('border-warning');
        $('#background-image-card').addClass('border-success');
    }
});

/**
 * Trigger the sumbit button if all required inputs are correct
 */
function triggerSubmitButton() {
    if (inputVariablesBool && inputFilesBool) {
        $('input[type="submit"]').prop('disabled', false);
        $('input[type="submit"]').removeClass('btn-secondary');
        $('input[type="submit"]').addClass('btn-success');
    } else {
        $('input[type="submit"]').prop('disabled', true);
        $('input[type="submit"]').removeClass('btn-success');
        $('input[type="submit"]').addClass('btn-secondary');
    }
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
 * Append alert to the alert div
 * @param {String} file - the file which contains the error
 * @param {String} text - alert text
 */
function appendAlertWarning(file, text) {
    $('#file-alerts').empty();
    $('#file-alerts').append('<div class="alert alert-warning" role="alert"><strong>' + file + ' :</strong> ' + text + ' </div>');
}

/**
 * Show the uploading icon after clicking on submit
 */
$('#submit').click(function() {
    $(this).hide();
    $('.submit-row').append('Please wait - files are upoaded');
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".required:after {\r\n    content: \"*\";\r\n    color: #cb181d;\r\n}", ""]);

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