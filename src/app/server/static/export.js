!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);let a="application/vnd.api+json",r=[],o=[];var i;$(document).ready((function(){$.ajax({error:function(){alert("Dataset does not exist")},url:"/api/dataset/"+dataset_id,dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){$("#export-title").text("Export: "+e[0].name)}})})),$("#download-movement-data").click((function(){function e(){$("#metric-distance").is(":checked")&&!("metric_distance"in r[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/metric_distance",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<r.length;t++)r[t].metric_distance=+e[t]}}),$("#speed").is(":checked")&&!("speed"in r[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/speed",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<r.length;t++)r[t].speed=+e[t]}}),$("#acceleration").is(":checked")&&!("acceleration"in r[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/acceleration",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<r.length;t++)r[t].acceleration=+e[t]}}),$("#distance-centroid").is(":checked")&&!("distance_centroid"in r[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/distance_centroid",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<r.length;t++)r[t].distance_centroid=+e[t]}}),$("#direction").is(":checked")&&!("direction"in r[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/direction",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<r.length;t++)r[t].direction=+e[t]}}),$.ajax()}$("#download-movement-data").html('<i class="mdi mdi-spin mdi-loading"></i>Loading'),$("#download-movement-data").prop("disabled",!0),$("#download-group-data").prop("disabled",!0),0===r.length?window.EventSource?((i=new EventSource("/api/movement_only/"+dataset_id)).onmessage=function(t){if("close"===t.data)i.close(),e();else{var n=JSON.parse(t.data);r=r.concat(n)}},i.addEventListener("error",(function(e){e.readyState==EventSource.CLOSED&&alert("Streaming error")}),!1)):alert("Webbrowser does not support streaming"):e(),$(document).one("ajaxStop",(function(){let e=[],t=$("#position").is(":checked"),n=$("#metric-distance").is(":checked"),a=$("#speed").is(":checked"),o=$("#acceleration").is(":checked"),i=$("#distance-centroid").is(":checked"),c=$("#direction").is(":checked");for(let s=0;s<r.length;s++)e[s]={},e[s].time=r[s].t,e[s].animal_id=r[s].a,t?(e[s].x=r[s].p[0],e[s].y=r[s].p[1]):e[s].position="("+r[s].p+")",n&&(e[s].metric_distance=r[s].metric_distance),a&&(e[s].speed=r[s].speed),o&&(e[s].acceleration=r[s].acceleration),i&&(e[s].distance_centroid=r[s].distance_centroid),c&&(e[s].direction=r[s].direction);let s=Papa.unparse(e),d=document.createElement("a");d.setAttribute("href","data:text/csv;charset=utf-8,"+escape(s)),d.setAttribute("download","animal_absolute_features.csv"),document.body.appendChild(d),d.click(),$("#download-movement-data").html('<i class="mdi mdi-cloud-download"></i> Download'),$("#download-movement-data").prop("disabled",!1),$("#download-group-data").prop("disabled",!1)}))})),$("#download-group-data").click((function(){function e(){$("#group-speed").is(":checked")&&!("speed"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_speed",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].speed=+e[t]}}),$("#group-acceleration").is(":checked")&&!("acceleration"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_acceleration",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].acceleration=+e[t]}}),$("#group-convex-hull-area").is(":checked")&&!("convex_hull_area"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_convex_hull_area",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].convex_hull_area=+e[t]}}),$("#group-medoid").is(":checked")&&!("medoid"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/medoid",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].medoid=+e[t]}}),$("#group-direction").is(":checked")&&!("direction"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_direction",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].direction=+e[t]}}),$("#group-distance_centroid").is(":checked")&&!("distance_centroid"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_distance_centroid",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].distance_centroid=+e[t]}}),$("#group-polarisation").is(":checked")&&!("polarisation"in o[0])&&$.ajax({url:"/api/dataset/"+dataset_id+"/swarm_polarisation",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(e){for(let t=0;t<o.length;t++)o[t].polarisation=+e[t]}}),$.ajax()}$("#download-group-data").html('<i class="mdi mdi-spin mdi-loading"></i>Loading'),$("#download-movement-data").prop("disabled",!0),$("#download-group-data").prop("disabled",!0),0===o.length?$.ajax({url:"/api/dataset/"+dataset_id+"/centroid",dataType:"json",type:"GET",contentType:"application/json; charset=utf-8",headers:{Accept:a},success:function(t){for(let e=0;e<t.length;e++)o.push({time:e,centroid:t[e]});e()}}):e(),$(document).one("ajaxStop",(function(){let e=[],t=$("#group-speed").is(":checked"),n=$("#group-acceleration").is(":checked"),a=$("#group-convex-hull-area").is(":checked"),r=($("#group-medoid").is(":checked"),$("#group-direction").is(":checked")),i=$("#group-distance_centroid").is(":checked"),c=$("#group-polarisation").is(":checked");for(let s=0;s<o.length;s++)e[s]={},e[s].time=o[s].time,t&&(e[s].speed=o[s].speed),n&&(e[s].acceleration=o[s].acceleration),a&&(e[s].convex_hull_area=o[s].convex_hull_area),t&&(e[s].medoid=o[s].medoid),r&&(e[s].direction=o[s].direction),i&&(e[s].distance_centroid=o[s].distance_centroid),c&&(e[s].polarisation=o[s].polarisation);let s=Papa.unparse(e),d=document.createElement("a");d.setAttribute("href","data:text/csv;charset=utf-8,"+escape(s)),d.setAttribute("download","animal_group_features.csv"),document.body.appendChild(d),d.click(),$("#download-group-data").html('<i class="mdi mdi-cloud-download"></i>Download'),$("#download-movement-data").prop("disabled",!1),$("#download-group-data").prop("disabled",!1)}))}))},function(e,t,n){var a=n(2);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(4)(a,r);a.locals&&(e.exports=a.locals)},function(e,t,n){(t=n(3)(!1)).push([e.i,'.material-switch>input[type="checkbox"] {\r\n    display: none;\r\n}\r\n\r\n.material-switch>label {\r\n    cursor: pointer;\r\n    height: 0px;\r\n    position: relative;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::before {\r\n    background: rgb(0, 0, 0);\r\n    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\r\n    border-radius: 8px;\r\n    content: \'\';\r\n    height: 16px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    opacity: 0.3;\r\n    transition: all 0.4s ease-in-out;\r\n    width: 40px;\r\n}\r\n\r\n.material-switch>label::after {\r\n    background: rgb(255, 255, 255);\r\n    border-radius: 16px;\r\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\r\n    content: \'\';\r\n    height: 24px;\r\n    left: -4px;\r\n    margin-top: -8px;\r\n    position: absolute;\r\n    top: -4px;\r\n    transition: all 0.3s ease-in-out;\r\n    width: 24px;\r\n}\r\n\r\n.material-switch>input[type="checkbox"]:checked+label::before {\r\n    background: inherit;\r\n    opacity: 0.5;\r\n}\r\n\r\n.material-switch>input[type="checkbox"]:checked+label::after {\r\n    background: #31a354 !important;\r\n    background: inherit;\r\n    left: 20px;\r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}',""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var r=(i=a,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(s," */")),o=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([r]).join("\n")}var i,c,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,a){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(a)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var c=0;c<e.length;c++){var s=[].concat(e[c]);a&&r[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},function(e,t,n){var a,r,o={},i=(a=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=a.apply(this,arguments)),r}),c=function(e){return document.querySelector(e)},s=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=c.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),d=null,p=0,l=[],u=n(5);function f(e,t){for(var n=0;n<e.length;n++){var a=e[n],r=o[a.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](a.parts[i]);for(;i<a.parts.length;i++)r.parts.push(g(a.parts[i],t))}else{var c=[];for(i=0;i<a.parts.length;i++)c.push(g(a.parts[i],t));o[a.id]={id:a.id,refs:1,parts:c}}}}function h(e,t){for(var n=[],a={},r=0;r<e.length;r++){var o=e[r],i=t.base?o[0]+t.base:o[0],c={css:o[1],media:o[2],sourceMap:o[3]};a[i]?a[i].parts.push(c):n.push(a[i]={id:i,parts:[c]})}return n}function m(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=l[l.length-1];if("top"===e.insertAt)a?a.nextSibling?n.insertBefore(t,a.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,r)}}function y(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function b(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),v(t,e.attrs),m(e,t),t}function v(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}function g(e,t){var n,a,r,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var i=p++;n=d||(d=b(t)),a=w.bind(null,n,i,!1),r=w.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",v(t,e.attrs),m(e,t),t}(t),a=_.bind(null,n,t),r=function(){y(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(t),a=$.bind(null,n),r=function(){y(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=h(e,t);return f(n,t),function(e){for(var a=[],r=0;r<n.length;r++){var i=n[r];(c=o[i.id]).refs--,a.push(c)}e&&f(h(e,t),t);for(r=0;r<a.length;r++){var c;if(0===(c=a[r]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete o[c.id]}}}};var x,j=(x=[],function(e,t){return x[e]=t,x.filter(Boolean).join("\n")});function w(e,t,n,a){var r=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=j(t,r);else{var o=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function $(e,t){var n=t.css,a=t.media;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function _(e,t,n){var a=n.css,r=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||o)&&(a=u(a)),r&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([a],{type:"text/css"}),c=e.href;e.href=URL.createObjectURL(i),c&&URL.revokeObjectURL(c)}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,a=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var r,o=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:a+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")}))}}]);