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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable no-unused-lets*/
/*global $, user_id*/



let JSONAPI_MIMETYPE = 'application/vnd.api+json';

$(document).ready(function() {

    let ajax_call = function() {
        $.ajax({
            error: function() {
                alert('Dataset does not exist');
            },
            url: '/api/dataset/user/' + user_id,
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': JSONAPI_MIMETYPE
            },
            success: function(data) {
                let datasets = data;
                for (let i = 0; i < datasets.length; i++) {
                    // change color to red if there is an error
                    if (datasets[i]['error']) {
                        $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                            .addClass('progress-bar-danger');
                    }
                    // change the status text
                    $('#dataset' + datasets[i]['id'] + ' > td:nth-child(2) > em:nth-child(1)')
                        .text(datasets[i]['status']);
                    // change the progress bar
                    if (datasets[i]['progress'] > 100) {
                        datasets[i]['progress'] = 100;
                    }
                    // change the width of the progres bar
                    $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                        .css('width', datasets[i]['progress'] + '%');
                    // change the text of the progress bar
                    $('#dataset' + datasets[i]['id'] + '> td:nth-child(3) > div:nth-child(1) > div:nth-child(1)')
                        .html(datasets[i]['progress'] + '%');
                }
            }
        });
    };
    // do the ajax call every 30 seconds
    let interval = 1000 * 30;
    setInterval(ajax_call, interval);

});


/***/ })
/******/ ]);