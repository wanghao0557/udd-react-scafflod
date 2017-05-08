/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "617c88dca6314803c427"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8888/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = __webpack_require__(28);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var uddh5 = {
	    // 正式环境url
	    // apihost:"https://api.uddtrip.com/uddtriph5",
	    apihost: "",
	    //location数据查询
	    location: {
	        queryHash: function queryHash() {
	            var s = location.hash.split("#")[1]; //location.hash得到网址第一个#以后的所有字符串 .split在#位置分割字符串并返回数组        
	            if (s.indexOf("?") >= 0) {
	                // indexOf 检索字符串中第一个?出现的位置 返回下标
	                s = s.split("?")[0]; // 以问号位置分割字符串 返回数组第0项
	            }
	            return s;
	        },
	        queryKey: function queryKey(key) {
	            var s = location.hash.split("#")[1];
	            var output = null;
	            if (s.indexOf("?") >= 0) {
	                s = s.split("?")[1];
	                var a = s.split("&"); // 以&符分割字符串  并返回数组 
	                for (var i = 0; i < a.length; i++) {
	                    // 循环数组a 
	                    if (a[i].indexOf(key) >= 0 && a[i].split("=")[0] == key) {
	                        // 判断key在a中出现的位置
	                        output = a[i].split("=")[1];
	                        break;
	                    }
	                }
	                return output;
	            } else {
	                return false;
	            }
	        }
	    },
	    //日期方法
	    date: {
	        getCurrentdate: function getCurrentdate() {
	            //获取当前日期
	            var date = new Date();
	            return this.getDate(date); //getDate（返回日期中的天  1-31）
	        },
	        //获取指定日期几天后的日期
	        getStartXdays: function getStartXdays(startDate, x) {
	            var date1 = new Date(startDate);
	            var date2 = new Date(date1);
	            date2.setDate(date1.getDate() + x);
	            return this.getDate(date2);
	        },
	        getXdayslater: function getXdayslater(x) {
	            //获取几天后的日期
	            var date1 = new Date();
	            var date2 = new Date(date1);
	            date2.setDate(date1.getDate() + x);
	            return this.getDate(date2);
	        },
	        getXmonthlater: function getXmonthlater(x) {
	            //获取几个月后的日期
	            var date1 = new Date();
	            var date2 = new Date(date1);
	            date2.setMonth(date1.getMonth() + x);
	            return this.getDate(date2);
	        },
	        getDate: function getDate(time) {
	            var y = time.getFullYear();
	            var m = time.getMonth() + 1;
	            if (m < 10) {
	                m = "0" + m;
	            }
	            var d = time.getDate();
	            if (d < 10) {
	                d = "0" + d;
	            }
	            return y + "-" + m + "-" + d;
	        },
	        gitDiffDay: function gitDiffDay(end, start) {
	            //获取两个日期的差值
	            var aDate, oDate1, oDate2, iDays;
	            aDate = end.split("-");
	            oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12-18-2016格式  
	            aDate = start.split("-");
	            oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
	            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	            return iDays;
	        }
	    },
	    //本地存储，项目中使用localStorage
	    stg: {
	        set: function set(key, value) {
	            var curtime = new Date().getTime();
	            localStorage.setItem(key, JSON.stringify({ val: value, time: curtime }));
	        },
	        get: function get(key, exp) {
	            var val = localStorage.getItem(key);
	            var dataobj = JSON.parse(val);
	            var output = null;
	            if (exp && dataobj.time) {
	                //设置过期时间
	                if (new Date().getTime() - dataobj.time > exp) {
	                    output = "expires"; //过期
	                    this.del(key);
	                } else {
	                    output = dataobj.val;
	                }
	            } else {
	                output = dataobj.val;
	            }
	            return output;
	        },
	        del: function del(key) {
	            localStorage.removeItem(key);
	        },
	        clearAll: function clearAll() {
	            localStorage.clear();
	        }
	    },
	    //jsbridge
	    bridgeindex: 0,
	    bridge: function bridge(fn, obj) {
	        var ua = navigator.userAgent.toLowerCase();
	        console.log(obj);
	        if (/iphone|ipad|ipod/.test(ua)) {
	            var setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {
	                if (window.WebViewJavascriptBridge) {
	                    return callback(WebViewJavascriptBridge);
	                }
	                if (window.WVJBCallbacks) {
	                    return window.WVJBCallbacks.push(callback);
	                }
	                window.WVJBCallbacks = [callback];
	                var WVJBIframe = document.createElement('iframe');
	                WVJBIframe.style.display = 'none';
	                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	                document.documentElement.appendChild(WVJBIframe);
	                setTimeout(function () {
	                    document.documentElement.removeChild(WVJBIframe);
	                }, 0);
	            };
	
	            setupWebViewJavascriptBridge(function (bridge) {
	                if (obj) {
	                    bridge.callHandler('webview_call_native', obj, function (response) {});
	                }
	                bridge.registerHandler('native_call_webview', function (data, response) {
	                    fn(data);
	                });
	            });
	        } else if (/android/.test(ua)) {
	            var connectWebViewJavascriptBridge = function connectWebViewJavascriptBridge(callback) {
	                if (window.WebViewJavascriptBridge) {
	                    return callback(WebViewJavascriptBridge);
	                } else {
	                    document.addEventListener('WebViewJavascriptBridgeReady', function () {
	                        return callback(WebViewJavascriptBridge);
	                    }, false);
	                }
	            };
	
	            connectWebViewJavascriptBridge(function (bridge) {
	                if (uddh5.bridgeindex == 0) {
	                    bridge.init(function (message, responseCallback) {});
	                    uddh5.bridgeindex++;
	                }
	
	                bridge.callHandler("webview_call_native", obj, function (responseData) {});
	                bridge.registerHandler("native_call_webview", function (data, responseCallback) {
	                    fn(data);
	                });
	            });
	        }
	    },
	
	    //{"1002040100:清迈": 5}格式的数据转换为数组格式[{id: 1002040100, name: '清迈', num: 5}]
	    separateAggObj: function separateAggObj(obj) {
	        var converts = [];
	        var objs = JSON.stringify(obj).split(',');
	        for (var i = 0; i < objs.length; i++) {
	            var subs = objs[i].replace(/\{*\"*\}*/g, '').split(':');
	            converts.push({ id: subs[0], name: subs[1], num: subs[2] });
	        }
	        return converts;
	    },
	    getCookie: function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) {
	            return unescape(arr[2]);
	        } else {
	            return;
	        }
	    }
	
	};
	exports.default = uddh5;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactRouter;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function (str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ? parseInt(entity.substr(2).toLowerCase(), 16) : parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.decode = function (str) {
	    return new Html5Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.encode = function (str) {
	    return new Html5Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.encodeNonUTF = function (str) {
	    return new Html5Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.encodeNonASCII = function (str) {
	    return new Html5Entities().encodeNonASCII(str);
	};
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = chr < 32 || chr > 126 || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Alert = React.createClass({
		displayName: "Alert",
	
		render: function render() {
			return React.createElement(
				"div",
				{ className: "notify-alert" },
				this.props.textMessage
			);
		}
	});
	
	exports.default = Alert;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _jingting = __webpack_require__(9);
	
	var _jingting2 = _interopRequireDefault(_jingting);
	
	var _order = __webpack_require__(10);
	
	var _order2 = _interopRequireDefault(_order);
	
	var _zhanzuo = __webpack_require__(11);
	
	var _zhanzuo2 = _interopRequireDefault(_zhanzuo);
	
	var _calendar = __webpack_require__(8);
	
	var _calendar2 = _interopRequireDefault(_calendar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(25);
	
	var App = _react2.default.createClass({
		displayName: 'App',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					this.props.children
				)
			);
		}
	});
	
	function init() {
		// 定义页面上的路由
		var routes = _react2.default.createElement(
			_reactRouter.Router,
			{ history: _reactRouter.hashHistory },
			_react2.default.createElement(
				_reactRouter.Route,
				{ path: '/', component: App },
				_react2.default.createElement(_reactRouter.Route, { path: '/jingting', name: 'jingting', component: _jingting2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/order', name: 'order', component: _order2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/zhanzuo/:orderId', name: 'zhanzuo', component: _zhanzuo2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/calendar', name: 'calendar', component: _calendar2.default })
			)
		);
		ReactDOM.render(routes, document.getElementById('train'));
	}
	init();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	     value: true
	});
	function Calendar(year, month, day) {
	     this.year = year ? year : this.getFullYear();
	     if (month == 0) {
	          this.month = 0;
	     } else {
	          this.month = month ? month : this.getMonth();
	     }
	     this.day = day ? day : this.getDate();
	}
	
	//获取当前年份
	Calendar.prototype.getFullYear = function () {
	     return new Date().getFullYear();
	};
	//获取当前月份
	Calendar.prototype.getMonth = function () {
	     return new Date().getMonth() + 1;
	};
	//获取当前日
	Calendar.prototype.getDate = function () {
	     return new Date().getDate();
	};
	//获取一月中的星期几
	Calendar.prototype.getDay = function () {
	     return new Date().getDay();
	};
	
	//获取一个月的天数
	Calendar.prototype.getMonthDays = function () {
	     var _this = this;
	     function isLeapyear() {
	          //闰年判断方法
	          return _this.year % 400 == 0 || _this.year % 4 == 0 && _this.year % 100 != 0;
	     }
	     function getFebruaryDays() {
	          //获取闰年的天数
	          return isLeapyear() ? 29 : 28;
	     }
	     var monthdays = [31, getFebruaryDays(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	     return monthdays[_this.month - 1];
	     //return new Date().getDay();
	};
	//获取本月第一天的星期数
	Calendar.prototype.getMonthFirstDays = function () {
	     var firstweek = new Date(this.year, this.month - 1, 1).getDay();
	     if (firstweek == 0) {
	          //将0代表的礼拜天转化为7
	          firstweek = 7;
	     }
	     return firstweek;
	};
	//计算日历行数
	Calendar.prototype.getRows = function () {
	     return (this.getMonthFirstDays() - 1 + this.getMonthDays()) / 7;
	};
	//获取月名称
	Calendar.prototype.getMonthName = function (language) {
	     this.monthn_en = ["January", "February", "March", "April", "may", "June", "July", "August", "September", "October", "November", "December"];
	     this.month_cn = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	     if (language == "en") {
	          return this.monthn_en[this.month];
	     } else {
	          return this.month_cn[this.month];
	     }
	};
	//获取日名称
	Calendar.prototype.getWeekName = function (language) {
	     this.week_en = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
	     this.week_cn = ["一", "二", "三", "四", "五", "六", "日"];
	     if (language == "en") {
	          return this.week_en[this.month];
	     } else {
	          return this.week_cn[this.month];
	     }
	};
	
	var date = new Calendar();
	
	//pc端日历调用方法
	function CalendarMob(ele, obj) {
	     //ele触发器，id元素
	     this.trigger = $("#" + ele);
	     if (obj) {
	          this.months_num = obj.months_num ? obj.months_num : 6; //一次性绘制日历的个数
	          this.display_num = obj.display_num ? obj.display_num : 1; //默认显示个数
	          this.initial_time = obj.initial_time ? obj.initial_time : null; //初始化时间，第一次打开显示时间，格式必须为yy-mm-dd字符串  
	          this.direction = obj.direction ? obj.direction : "after"; //划分不可点击区域
	          this.selected = obj.selected ? obj.selected : null;
	          this.start_time = obj.start_time ? obj.start_time : null;
	          this.end_time = obj.end_time ? obj.end_time : null;
	          this.data = obj.data ? obj.data : [];
	     } else {
	          this.months_num = 6;
	          this.display_num = 1;
	          this.initial_time = null;
	          this.direction = "after"; //affter向前，before之后
	          this.selected = null;
	          this.data = [];
	     }
	}
	CalendarMob.prototype.arr = [];
	CalendarMob.prototype.click_callback = null;
	CalendarMob.prototype.current_num = 0;
	CalendarMob.prototype.style = "style_1"; //默认样式风格
	CalendarMob.prototype.start_timestamp = null;
	CalendarMob.prototype.end_timestamp = null;
	CalendarMob.prototype.init = function () {
	     var _this = this;
	     this.panel = $("<div class='ui_calendar " + this.style + "'></div>").appendTo(this.trigger);
	     if (this.initial_time) {
	          var initial_time_arr = this.initial_time.split("-");
	          this.calendar = new Calendar(initial_time_arr[0], initial_time_arr[1], initial_time_arr[2]);
	     } else {
	          this.calendar = new Calendar();
	          this.istoday = true;
	     }
	     this.direction_a = this.calendar.year + "-" + this.calendar.month + "-" + this.calendar.day;
	
	     //console.log(this.direction_a);
	     //定义点的时间戳
	     this.initial_timestamp = Date.parse(new Date(this.direction_a.replace(/\-/g, "/")));
	     if (this.start_time) {
	          this.start_timestamp = Date.parse(new Date(this.start_time.replace(/\-/g, "/")));
	     }
	     if (this.end_time) {
	          this.end_timestamp = Date.parse(new Date(this.end_time.replace(/\-/g, "/")));
	     }
	     if (this.selected) {
	          this.selected = Date.parse(new Date(this.selected.replace(/\-/g, "/")));
	     }
	     this.creat_calendar();
	};
	CalendarMob.prototype.num = 0;
	CalendarMob.prototype.creat_calendar = function () {
	     var $div = $("<div class='calendar'></div>");
	     var title = this.calendar.year + "年" + this.calendar.month + "月";
	     var $title = $("<div class='title'>" + title + "</div>").appendTo($div);
	     var $table = $("<table class='calendartables" + this.current_num + "'></table>").appendTo($div);
	     $div.appendTo(this.panel);
	     this.creat_th($table);
	     this.creat_tr($table);
	     this.num++;
	     this.current_num++;
	     if (this.num < this.display_num) {
	          this.creat_nextcalendar();
	     }
	     if (this.current_num < this.months_num) {
	          this.creat_nextcalendar();
	     } else {
	          this.click_num = 0;
	          var _this = this;
	          this.trigger.find(".active").on("click", function () {
	               if (_this.callback) {
	                    //_this.callback 
	                    $('.active').removeClass('selected');
	                    $(this).addClass('selected');
	                    var time = $(this).attr("date-time");
	                    _this.callback(time);
	               }
	          });
	     }
	};
	CalendarMob.prototype.creat_nextcalendar = function () {
	     var month = this.calendar.month;
	     var year = this.calendar.year;
	     month++;
	     if (month > 12) {
	          month = 1;
	          year++;
	     }
	     this.calendar = new Calendar(year, month);
	     this.creat_calendar();
	};
	CalendarMob.prototype.creat_th = function ($table) {
	     var $tr = $("<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>");
	     $tr.appendTo($table);
	};
	CalendarMob.prototype.creat_tr = function ($table) {
	     var _this = this;
	     var calendar = this.calendar;
	     var rows = Math.ceil(calendar.getRows());
	     var firstdays = calendar.getMonthFirstDays();
	     var days = calendar.getMonthDays();
	     var lastdays = rows * 7 - (firstdays - 1) - days; //用于计算单月最后一行，多余的天数
	     if (firstdays == 0) {
	          firstdays = 7;
	     }
	     var str = "";
	     var len = rows * 7;
	     for (var m = 0; m < rows; m++) {
	          var $tr = $("<tr></tr>");
	          $tr.appendTo($table);
	          for (var n = 0; n < 7; n++) {
	               var $td = $("<td><a href='javascript:void(0)'><span></span><p></p></a></td>").appendTo($tr);
	               var $a = $td.find("a");
	               var day_text = m * 7 + n - firstdays + 2;
	               var mo = calendar.month;
	               var dt = day_text;
	               var date = calendar.year + "-" + mo + "-" + dt;
	               //console.log(date);  
	               if (m == 0) {
	                    if (n < firstdays - 1) {
	                         //console.log("不绘画");
	                         $a.addClass("disable");
	                    } else {
	                         $a.find("span").text(day_text);
	                         this.painting($a, date);
	                    }
	               } else if (m == rows - 1) {
	                    if (n >= 7 - lastdays) {
	                         //console.log("不绘画");
	                         $a.addClass("disable");
	                    } else {
	                         $a.find("span").text(day_text);
	                         //this.creat_price(date,$a);
	                         this.painting($a, date);
	                    }
	               } else {
	                    $a.find("span").text(day_text);
	                    //this.creat_price(date,$a);
	                    this.painting($a, date);
	               }
	          }
	     }
	};
	//绘画日历，同时监听点击事件
	CalendarMob.prototype.price_index = 0;
	CalendarMob.prototype.price_flag = false;
	CalendarMob.prototype.painting = function ($a, time) {
	     /*var sortTime=Date.parse(new Date(time.replace(/\-/g,"/")));  
	     var text = "";
	     $a.attr("date-time",time);   
	     if(this.start_timestamp && this.start_timestamp==sortTime){
	          this.price_flag=true;
	     }
	     if(this.price_flag){
	          var idx=this.price_index;
	          //判断this.data[idx]不为undefined
	          if(!!this.data[idx]){
	            var time=this.data[idx].pricedate;
	            text="￥"+this.data[idx].marketprice;
	            $a.addClass("active");
	            $a.attr("index",idx)
	            //text=this.data[this.price_index].date;
	            $a.find("p").text(text).addClass("price").attr("date-time",time);
	            this.price_index++;
	          }
	     }else{
	          $a.addClass("disable");
	     }*/
	     var sortTime = Date.parse(new Date(time.replace(/\-/g, "/")));
	     $a.attr("date-time", time);
	     if (this.start_timestamp && this.start_timestamp <= sortTime && this.end_timestamp > sortTime) {
	          $a.addClass("active");
	     } else {
	          $a.addClass("disable");
	     }
	     if (this.selected == sortTime) {
	          $a.addClass("selected");
	     }
	};
	
	exports.default = CalendarMob;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _calendar = __webpack_require__(7);
	
	var _calendar2 = _interopRequireDefault(_calendar);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(26);
	
	
	var CalendarContent = _react2.default.createClass({
	  displayName: "CalendarContent",
	
	  render: function render() {
	    return _react2.default.createElement("div", { className: "calendar-con", id: "calendar-con" });
	  }
	});
	
	var Calendar = _react2.default.createClass({
	  displayName: "Calendar",
	
	  componentDidMount: function componentDidMount() {
	    // http://127.0.0.1:8888/plane/#/calendar?selectDay=2016-11-05  selectDay选中的时间
	    var selectDay = _common2.default.location.queryKey("selectDay");
	    var nowDay = _common2.default.date.getCurrentdate();
	    var et = _common2.default.date.getStartXdays(nowDay, 30);
	    var time = new _calendar2.default("calendar-con", {
	      //initial_time:"2016-8-30",
	      months_num: 2,
	      direction: "after",
	      start_time: nowDay,
	      end_time: et,
	      selected: selectDay
	    });
	    time.init();
	    time.callback = function (time) {
	      //与app的交互
	      var requestHybrid = {
	        tagname: 'forward',
	        topage: 'detail',
	        type: "native",
	        item: 'train',
	        param: {
	          typeId: "10163",
	          time: time
	        }
	      };
	      var native_callback = function native_callback(data) {};
	      _common2.default.bridge(native_callback, requestHybrid);
	    };
	    //与app的交互
	    var setTitle = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      item: 'train',
	      param: {
	        typeId: "c10162",
	        title: "选择出发时间"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, setTitle);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(CalendarContent, null)
	    );
	  }
	});
	
	exports.default = Calendar;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//创建订单传来的URL参数: {trainCode: this.props.trainCode, fromStationCode: this.props.fromStationCode, toStationCode: this.props.toStationCode, trainNumber: this.props.trainNumber}
	var JingTing = _react2.default.createClass({
		displayName: 'JingTing',
	
		getInitialState: function getInitialState() {
			return {
				data: ''
			};
		},
		componentDidMount: function componentDidMount() {
			// http://127.0.0.1:8888/train/#/jingting?trainCode=G102&fromStationCode=AOH&toStationCode=VNP&trainNumber=5l0000G10261
			var trainCode = _common2.default.location.queryKey("trainCode");
			var fromStationCode = _common2.default.location.queryKey("fromStationCode");
			var toStationCode = _common2.default.location.queryKey("toStationCode");
			var trainNumber = _common2.default.location.queryKey("trainNumber");
			if (this.isMounted()) {
				$.post(_common2.default.apihost + '/getAppTrainInfo', { train_code: trainCode, from_station: fromStationCode, to_station: toStationCode, train_no: trainNumber }, function (data) {
					var data = data.data;
					if (data.success) {
						var data = data.data;
						this.setState({
							data: data[0].data
						});
					}
				}.bind(this));
				//与App的交互
				var requestHybrid = {
					tagname: 'forward',
					topage: 'detail',
					type: 'native',
					item: 'train',
					param: {
						typeId: "c10161",
						title: "经停站"
					}
				};
				var native_callback = function native_callback() {};
				_common2.default.bridge(native_callback, requestHybrid);
			}
		},
		render: function render() {
			var data = this.state.data;
			var dateLen = data.length - 1;
			return _react2.default.createElement(
				'div',
				{ className: 'jingting' },
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'div',
						{ className: 'title' },
						_react2.default.createElement(
							'span',
							null,
							'\u8F66\u7AD9\u540D\u79F0'
						),
						_react2.default.createElement(
							'span',
							null,
							'\u5230\u8FBE'
						),
						_react2.default.createElement(
							'span',
							null,
							'\u51FA\u53D1'
						),
						_react2.default.createElement(
							'span',
							null,
							'\u505C\u7559'
						)
					),
					_react2.default.createElement(
						'ul',
						null,
						$.map(data, function (elem, index) {
							return _react2.default.createElement(
								'li',
								{ key: index },
								_react2.default.createElement(
									'i',
									null,
									elem.station_name
								),
								_react2.default.createElement(
									'i',
									null,
									elem.arrive_time
								),
								_react2.default.createElement(
									'i',
									null,
									index == dateLen ? elem.stopover_time : elem.start_time
								),
								_react2.default.createElement(
									'i',
									null,
									elem.stopover_time
								)
							);
						}.bind(this))
					)
				)
			);
		}
	});
	
	exports.default = JingTing;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _alert = __webpack_require__(5);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(24);
	var TrainOrder = _react2.default.createClass({
		displayName: 'TrainOrder',
	
		getInitialState: function getInitialState() {
			return {
				kuaidi: false,
				baoxian: true,
				wuzuo: false,
				userInfo: [],
				trainUser: 0,
				uuid: '',
				trainNumber: 'G102',
				fromStation: '上海虹桥',
				toStation: '北京南',
				fromStationCode: 'AOH',
				toStationCode: 'VNP',
				trainDate: '2016-11-22',
				departureTime: '2016-11-22 06:39',
				arriveTime: '2016-11-22 12:18',
				ticketNumber: '1',
				banquet: '',
				banquetName: '',
				contactMobile: '',
				contactName: '',
				expressAmount: 25,
				price: 553,
				adduser: '8011',
				contactAddress: '',
				subOrderVos: [],
				loginUserName: '',
				loginUserPassword: '',
				isExpressCharge: '',
				isInsurance: '1',
				insuranceId: '1',
				isPublic: '1',
				seatList: [],
				runTime: '4小时55分钟',
				addressId: '',
				trainCode: '5l0000G10261',
				insurancePrice: 0,
				loading: false,
				sourceType: "",
				sourceId: "",
				tel: '',
				userName: ''
			};
		},
		closeAlert: function closeAlert() {
			this.setState({
				messageShow: false
			});
		},
		openAlert: function openAlert(text, duration) {
			var that = this;
			var duration = duration == undefined ? 2000 : duration;
			this.setState({
				messageShow: true,
				textMessage: text
			});
			setTimeout(function () {
				that.closeAlert();
			}, duration);
		},
		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			var userInfo = this.state.userInfo;
			if (!this.state.banquetName) {
				this.openAlert("本辆车次车票已售完,请选择其他车次");
				return;
			}
			if (!userInfo.length) {
				this.openAlert("请添加乘客");
				return;
			} else {
				var subOrderVos = $.map(userInfo, function (elem, index) {
					return { passengerMobile: elem.touristmobile, commonContacts: 0, "passengerName": elem.touristname, passengerCertificateType: elem.cardtype, passengerCertificateNo: elem.cardno, passengerType: 1, "passengerTypeName": "成人票", "ticketAmount": this.state.price, passengerBirthday: elem.birthDate, passengerCertificateTypeName: elem.cardtype == "1" ? "二代身份证" : elem.cardtype == "2" ? "护照" : elem.cardtype == "5" ? "台胞证" : elem.cardtype == "6" ? "港澳通行证" : '' };
				}.bind(this));
			}
	
			if (!this.state.userName) {
				this.openAlert("请填写联系人姓名");
				return;
			} else if (!/^[a-zA-Z\u4e00-\u9fa5\s]+$/g.test($.trim(this.state.userName))) {
				this.openAlert('请输入中文姓名或英文姓名,不能包含数字、特殊字符');
				return;
			}
	
			if (!this.state.tel) {
				this.openAlert("请填写手机号码");
				return;
			} else if (!/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test($.trim(this.state.tel))) {
				this.openAlert("手机号不合法");
				return;
			}
	
			if (this.state.kuaidi) {
				if (this.state.contactName == '') {
					this.openAlert("请添加配送信息");
					return;
				}
			}
			// 所有条件都通过以后做数据存储
			this.localStorageFn();
			// var form={
			// 	"uuid": this.state.uuid,
			// 	"form": "0-15000470092-刘策--0-1-411224199212155611-1-任少楠-1-8011-0-21-1-",
			// 	"trainNumber": "6801",
			// 	"fromStation": "太原",
			// 	"toStation": "太原东",
			// 	"fromStationCode": "TYV",
			// 	"toStationCode": "TDV",
			// 	"trainDate": "2016-11-17",
			// 	"departureTime": "2016-11-17 16:52:00",
			// 	"arriveTime": "2016-11-17 16:57:00",
			// 	"ticketNumber": 1,
			// 	"banquetName": "硬座",
			// 	"contactMobile": "15921823421",
			// 	"contactName": "刘策",
			// 	"orderAmount": 21,
			// 	"expressAmount": 0,
			// 	"price": 1,
			// 	"adduser": 8011,
			// 	"contactAddress": "",
			// 	"subOrderVos": subOrderVos,
			// 	"loginUserName": "",
			// 	"loginUserPassword": "",
			// 	"isExpressCharge": 0,
			// 	"isInsurance": 1,
			// 	"insuranceId": "1",
			// 	"insuranceAmount": 20,
			// 	"acceptStanding": false,
			// 	isCorporateTravel: 1,
			// 	isPublic: 1,
			// }
			var form = {
				"uuid": this.state.uuid,
				"form": this.state.trainNumber + "-" + this.state.fromStation + "-" + this.state.fromStationCode + "-" + this.state.toStation + "-" + this.state.toStationCode + "-" + this.state.trainDate, //字符拼接为任意内容，格式：文字-文字
				"trainNumber": this.state.trainNumber,
				"fromStation": this.state.fromStation,
				"toStation": this.state.toStation,
				"fromStationCode": this.state.fromStationCode,
				"toStationCode": this.state.toStationCode,
				"trainDate": this.state.trainDate,
				"departureTime": this.state.departureTime + ":00",
				"arriveTime": this.state.arriveTime + ":00",
				"ticketNumber": this.state.userInfo.length, //用户数目
				"banquetName": this.state.banquetName,
				"expressContactMobile": this.state.kuaidi ? this.state.contactMobile : '',
				"expressContactName": this.state.kuaidi ? this.state.contactName : '',
				"orderAmount": (parseFloat(this.state.price, 10) + parseFloat(this.state.baoxian ? this.state.insurancePrice : 0, 10)) * this.state.userInfo.length + parseFloat(this.state.kuaidi ? 20 + this.state.userInfo.length * 5 : 0, 10), //总价格
				"expressAmount": this.state.kuaidi ? 20 + this.state.userInfo.length * 5 : '',
				"price": this.state.price,
				"adduser": _common2.default.getCookie('userId') ? _common2.default.getCookie('userId') : '', //用户id测试：8011
				"contactAddress": this.state.kuaidi ? this.state.contactAddress : '',
				"subOrderVos": JSON.stringify(subOrderVos),
				"loginUserName": "",
				"loginUserPassword": "",
				"isExpressCharge": this.state.kuaidi ? 1 : 0,
				"isInsurance": this.state.baoxian ? 1 : 0,
				"insuranceAmount": this.state.baoxian ? this.state.insurancePrice * this.state.userInfo.length : '',
				"acceptStanding": this.state.wuzuo,
				sourceType: _common2.default.getCookie('isPublic') == 1 ? 4 : 5,
				sourceId: '',
				contactName: this.state.userName,
				contactMobile: this.state.tel
			};
			this.setState({
				loading: true
			});
			$.post(_common2.default.apihost + "/appaddorder", form, function (data) {
				var that = this;
				this.setState({
					loading: false
				});
				if (data.code == 1) {
					var passengers = $.map(that.state.userInfo, function (elem, index) {
						return elem.touristname;
					});
					window.location.assign("/train/#/zhanzuo/" + data.data.orderId + "?fromStation=" + this.state.fromStation + "&toStation=" + this.state.toStation + "&departureTime=" + this.state.departureTime + "&arriveTime=" + this.state.arriveTime + "&runTime=" + this.state.runTime + "&trainNumber=" + this.state.trainNumber + "&passengers=" + passengers.join('-') + "&price=" + this.state.price + "&trainCode=" + this.state.trainCode + "&fromStationCode=" + this.state.fromStationCode + "&toStationCode=" + this.state.toStationCode + "&trainDate=" + this.state.trainDate + "&banquetName=" + this.state.banquetName);
				} else {
					var msg = data.msg;
					this.openAlert(msg);
				}
			}.bind(this));
		},
		componentWillMount: function componentWillMount() {
			$.post(_common2.default.apihost + '/getuuid', function (data) {
				this.setState({
					uuid: data.data
				});
			}.bind(this));
		},
		componentDidMount: function componentDidMount() {
			var that = this;
			// 与App的交互
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type: "native",
				item: "train",
				param: {
					typeId: "c10165",
					title: "订单填写"
				}
			};
			var native_callback = function native_callback(data) {
				var data = JSON.parse(data);
				that.setState({
					trainDate: data.trainDate,
					trainNumber: data.trainNumber,
					trainCode: data.trainCode,
					fromStation: data.fromStation,
					toStation: data.toStation,
					fromStationCode: data.fromStationCode,
					toStationCode: data.toStationCode,
					departureTime: data.departureTime,
					arriveTime: data.arriveTime,
					seatList: data.seatList,
					runTime: data.runTime,
					loginUserName: data.trainUserName,
					loginUserPassword: data.trainPassword,
					trainUser: !!data.trainUserName ? '1' : '0'
				});
			};
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 乘客信息添加
		userInfoFn: function userInfoFn(arr) {
			this.setState({
				userInfo: arr
			});
		},
		// 将用户信息传入cookie
		localStorageFn: function localStorageFn() {
			localStorage.setItem("userInfo", JSON.stringify({ val: this.state.userInfo }));
			// 选择使用快递将快递地址传入cookie
			localStorage.setItem("addressInfo", JSON.stringify({ val: { addressId: this.state.addressId, name: this.state.contactName, address: this.state.contactAddress, tel: this.state.contactMobile } }));
			// 电话号码存储
			localStorage.setItem("trainMobile", JSON.stringify({ val: this.state.tel }));
			// 用户姓名存储
			localStorage.setItem("trainUserName", JSON.stringify({ val: this.state.userName }));
		},
		// 添加地址配送信息
		addressFn: function addressFn(obj) {
			this.setState({
				addressId: obj.addressId,
				contactName: obj.name,
				contactAddress: obj.address,
				contactMobile: obj.tel
			});
		},
		// 是否登录12306
		trainUserFn: function trainUserFn(name, password) {
			if (!!name) {
				this.setState({
					trainUser: 1,
					loginUserName: name,
					loginUserPassword: password
				});
			}
		},
		kuaiDiFn: function kuaiDiFn() {
			this.setState({
				kuaidi: !this.state.kuaidi
			});
		},
		// 是否加载地址填写模块
		addressTianxie: function addressTianxie() {
			if (this.state.kuaidi) {
				return _react2.default.createElement(Address, { contactAddress: this.state.contactAddress, contactName: this.state.contactName, contactMobile: this.state.contactMobile, addressFn: this.addressFn, addressId: this.state.addressId });
			}
		},
		baoXianFn: function baoXianFn() {
			this.setState({
				baoxian: !this.state.baoxian
			});
		},
		getInsurancePrice: function getInsurancePrice(price) {
			this.setState({
				insurancePrice: price
			});
		},
		wuZuoFn: function wuZuoFn() {
			this.setState({
				wuzuo: !this.state.wuzuo
			});
		},
		wuZuoFalseFn: function wuZuoFalseFn() {
			this.setState({
				wuzuo: false
			});
		},
		wuZuoTureFn: function wuZuoTureFn() {
			this.setState({
				wuzuo: true
			});
		},
		getTicketType: function getTicketType(obj) {
			this.setState({
				banquetName: obj.banquetName,
				price: obj.seatPrice
			});
		},
		// 输入手机号码
		telFn: function telFn(str) {
			this.setState({
				tel: str
			});
		},
		// 输入用户姓名
		userNameFn: function userNameFn(str) {
			this.setState({
				userName: str
			});
		},
		render: function render() {
			var loading = __webpack_require__(27);
			return _react2.default.createElement(
				'div',
				{ className: 'order' },
				_react2.default.createElement(
					'form',
					{ onSubmit: this.handleSubmit, autocomplete: 'off' },
					_react2.default.createElement(Station, { trainDate: this.state.trainDate, trainNumber: this.state.trainNumber, trainCode: this.state.trainCode, fromStation: this.state.fromStation, toStation: this.state.toStation, fromStationCode: this.state.fromStationCode, toStationCode: this.state.toStationCode, departureTime: this.state.departureTime, arriveTime: this.state.arriveTime, runTime: this.state.runTime, localStorageFn: this.localStorageFn }),
					_react2.default.createElement(TicketType, { wuzuo: this.state.wuzuo, wuZuoFn: this.wuZuoFn, wuZuoFalseFn: this.wuZuoFalseFn, wuZuoTureFn: this.wuZuoTureFn, seatList: this.state.seatList, getTicketType: this.getTicketType, openAlert: this.openAlert }),
					_react2.default.createElement(Linkman, { userInfo: this.state.userInfo, userInfoFn: this.userInfoFn, trainUser: this.state.trainUser, trainUserFn: this.trainUserFn, loginUserName: this.state.loginUserName, loginUserPassword: this.state.loginUserPassword, telFn: this.telFn, tel: this.state.tel, userNameFn: this.userNameFn, userName: this.state.userName }),
					this.addressTianxie(),
					_react2.default.createElement(Insurance, { baoxian: this.state.baoxian, baoXianFn: this.baoXianFn, getInsurancePrice: this.getInsurancePrice }),
					_react2.default.createElement(
						'div',
						{ className: 'tui_gq' },
						_react2.default.createElement(
							'strong',
							null,
							'\u9000\u6539\u89C4\u5219'
						),
						_react2.default.createElement(
							'p',
							null,
							'  \u5F00\u8F66\u524D15\u5929\uFF08\u4E0D\u542B\uFF09\u4EE5\u4E0A\u9000\u7968\u7684\uFF0C\u4E0D\u6536\u53D6\u9000\u7968\u8D39\uFF1B\u7968\u9762\u4E58\u8F66\u7AD9\u5F00\u8F66\u65F6\u95F4\u524D48\u5C0F\u65F6\u4EE5\u4E0A\u7684\u6309\u7968\u4EF75%\u8BA1\uFF0C24\u5C0F\u65F6\u4EE5\u4E0A\u3001\u4E0D\u8DB348\u5C0F\u65F6\u7684\u6309\u7968\u4EF710%\u8BA1\uFF0C\u4E0D\u8DB324\u5C0F\u65F6\u7684\u6309\u7968\u4EF720%\u8BA1\u3002 \u5F00\u8F66\u524D48\u5C0F\u65F6\uFF5E15\u5929\u671F\u95F4\u5185\uFF0C\u6539\u7B7E\u6216\u53D8\u66F4\u5230\u7AD9\u81F3\u8DDD\u5F00\u8F6615\u5929\u4EE5\u4E0A\u7684\u5176\u4ED6\u5217\u8F66\uFF0C\u53C8\u5728\u8DDD\u5F00\u8F6615\u5929\u524D\u9000\u7968\u7684\uFF0C\u4ECD\u6838\u65365%\u7684\u9000\u7968\u8D39\u3002'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'sub' },
						_react2.default.createElement('input', { type: 'submit', value: '\u63D0\u4EA4\u8BA2\u5355', className: 'submit' })
					),
					_react2.default.createElement(
						'div',
						{ className: "send-loading" + (this.state.loading ? " " + "cur" : "") },
						_react2.default.createElement(
							'div',
							{ className: 'loading-inner' },
							_react2.default.createElement('img', { src: loading }),
							_react2.default.createElement(
								'span',
								null,
								'\u6570\u636E\u63D0\u4EA4\u4E2D\uFF01'
							)
						)
					)
				),
				this.state.messageShow ? _react2.default.createElement(_alert2.default, { textMessage: this.state.textMessage }) : ''
			);
		}
	});
	// 始发站
	var Station = _react2.default.createClass({
		displayName: 'Station',
	
		localStorageFn: function localStorageFn() {
			this.props.localStorageFn();
		},
		render: function render() {
			var date = this.props.trainDate;
			return _react2.default.createElement(
				'div',
				{ className: 'station order_cont' },
				_react2.default.createElement(
					'div',
					{ className: 'train_number' },
					_react2.default.createElement(
						'span',
						{ className: 'time' },
						date.split('-')[0],
						'\u5E74',
						date.split('-')[1],
						'\u6708',
						date.split('-')[2],
						'\u65E5'
					),
					_react2.default.createElement(
						'span',
						{ className: 'num' },
						this.props.trainNumber
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'train_station clearfix' },
					_react2.default.createElement(
						'div',
						{ className: 'station_info pull-left' },
						_react2.default.createElement(
							'span',
							{ className: 'station_name' },
							this.props.fromStation
						),
						_react2.default.createElement(
							'span',
							{ className: 'time' },
							this.props.departureTime.split(' ')[1]
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'mid' },
						_react2.default.createElement(
							'span',
							{ className: 'all_time' },
							'\u9884\u8BA1\u7528\u65F6',
							this.props.runTime
						),
						_react2.default.createElement('span', { className: 'arrows' }),
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								_reactRouter.Link,
								{ onClick: this.localStorageFn, to: { pathname: "/jingting", query: { trainCode: this.props.trainNumber, fromStationCode: this.props.fromStationCode, toStationCode: this.props.toStationCode, trainDate: this.props.trainDate, trainNumber: this.props.trainCode } } },
								'\u67E5\u770B\u7ECF\u505C\u7AD9'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'station_info pull-right' },
						_react2.default.createElement(
							'span',
							{ className: 'station_name' },
							this.props.toStation
						),
						_react2.default.createElement(
							'span',
							{ className: 'time' },
							this.props.arriveTime.split(' ')[1]
						)
					)
				)
			);
		}
	});
	// 票型选择
	var TicketType = _react2.default.createClass({
		displayName: 'TicketType',
	
		getInitialState: function getInitialState() {
			return {
				index: null,
				once: false,
				showWuzuo: false,
				tips: false
			};
		},
		componentDidUpdate: function componentDidUpdate() {
			if (!this.state.once && this.props.seatList.length) {
				var seatList = $.grep(this.props.seatList, function (elem, index) {
					return elem.stockNumber != 0;
				});
				if (seatList.length) {
					this.ticketTypeFn(seatList[0].index, seatList[0]);
					if (seatList[0].banquetName == '硬座' || seatList[0].banquetName == '二等座') {
						this.setState({
							showWuzuo: true
						});
					}
				}
				this.setState({
					once: true
				});
			}
		},
		// 票型选择
		ticketTypeFn: function ticketTypeFn(index, elem, e) {
			if (elem.stockNumber != 0) {
				this.setState({
					index: index
				});
				if (elem.banquetName.indexOf("卧") != -1) {
					this.setState({
						tips: true
					});
				} else {
					this.setState({
						tips: false
					});
				}
				if (elem.banquetName == '无座') {
					this.props.getTicketType(this.props.seatList[0]);
				} else {
					this.props.getTicketType(elem);
				}
				if (elem.banquetName == '硬座' || elem.banquetName == '二等座') {
					this.setState({
						showWuzuo: true
					});
				} else if (elem.banquetName == '无座') {
					this.props.wuZuoTureFn();
					this.setState({
						showWuzuo: false
					});
				} else {
					this.props.wuZuoFalseFn();
					this.setState({
						showWuzuo: false
					});
				}
			} else {
				this.props.openAlert('没有可预订的座位！');
				return;
			}
		},
		// 是否接受无座
		handClick: function handClick() {
			this.props.wuZuoFn();
		},
		render: function render() {
			var obj = this.props.seatList;
			return _react2.default.createElement(
				'div',
				{ className: 'ticket_type' },
				_react2.default.createElement(
					'ul',
					{ className: 'type_list' },
					$.map(obj, function (elem, index) {
						return _react2.default.createElement(
							'li',
							{ className: "list" + (this.state.index == index ? " " + "cur" : ""), key: index, onClick: this.ticketTypeFn.bind(this, index, elem) },
							_react2.default.createElement(
								'span',
								{ className: 'type' },
								elem.banquetName
							),
							_react2.default.createElement(
								'span',
								{ className: 'num' },
								elem.stockNumber,
								'\u5F20'
							),
							_react2.default.createElement(
								'span',
								{ className: 'price' },
								'\uFFE5',
								elem.seatPrice
							)
						);
					}.bind(this))
				),
				_react2.default.createElement(
					'div',
					{ className: this.state.showWuzuo ? "seat order_cont" : 'seat order_cont hide' },
					_react2.default.createElement(
						'span',
						null,
						'\u662F\u5426\u63A5\u53D7\u65E0\u5EA7'
					),
					_react2.default.createElement(
						'span',
						{ className: "seat_checked" + (this.props.wuzuo ? " " + "cur" : ""), onClick: this.handClick },
						_react2.default.createElement('i', { className: 'iconfont icon-gougou' })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: this.state.tips ? "tips cur" : "tips" },
					'\u5367\u94FA\u663E\u793A\u4E3A\u4E2D\u94FA\u7968\u4EF7\u3001\u652F\u4ED8\u65F6\u663E\u793A\u4E3A\u771F\u5B9E\u7968\u4EF7\u3002\u8BF7\u77E5\u6089\u3002'
				)
			);
		}
	});
	// 联系人
	var Linkman = _react2.default.createClass({
		displayName: 'Linkman',
	
		componentDidMount: function componentDidMount() {
			if (localStorage.getItem("userInfo")) {
				var userInfoString = localStorage.getItem("userInfo");
				var userInfoArr = JSON.parse(userInfoString).val;
				this.props.userInfoFn(userInfoArr);
			}
			if (localStorage.getItem("trainMobile")) {
				var mobileStr = localStorage.getItem("trainMobile");
				var mobile = JSON.parse(mobileStr).val;
				this.props.telFn(mobile);
			}
			if (localStorage.getItem("trainUserName")) {
				var userNameStr = localStorage.getItem("trainUserName");
				var userName = JSON.parse(userNameStr).val;
				this.props.userNameFn(userName);
			}
		},
		// 删除联系人
		removeUser: function removeUser(id) {
			var newUserInfoArr = $.grep(this.props.userInfo, function (elem, index) {
				return elem.id != id;
			});
			this.props.userInfoFn(newUserInfoArr);
		},
		// 登录12306添加常用联系人
		registerFn: function registerFn() {
			var that = this;
			var requestHybrid = {
				tagname: 'forward',
				topage: 'detail',
				type: "native",
				item: 'train',
				param: {
					typeId: "10166",
					trainUserName: this.props.loginUserName,
					trainPassword: this.props.loginUserPassword
				}
			};
			var native_callback = function native_callback(data) {
				var data = JSON.parse(data);
				data = data.param;
				that.props.trainUserFn(data.trainUserName, data.trainPassword);
			};
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 添加常用联系人
		userFn: function userFn() {
			var that = this;
			var requestHybrid = {
				tagname: 'forward',
				topage: 'detail',
				type: "native",
				item: 'train',
				param: {
					typeId: "10167",
					userInfo: this.props.userInfo
				}
			};
			var native_callback = function native_callback(data) {
				var data = JSON.parse(data);
				data = data.param;
				var userArr = data.userInfo;
				that.props.userInfoFn(userArr);
			};
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 通讯录
		telFn: function telFn() {
			var requestHybrid = {
				tagname: 'forward',
				topage: 'detail',
				type: "native",
				item: 'train',
				param: {
					typeId: "10171",
					title: ''
				}
			};
			var native_callback = function (date) {
				var data = JSON.parse(date);
				var mobile = data.param.mobile;
				this.props.telFn(mobile);
			}.bind(this);
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 输入姓名和手机号码
		userNameFn: function userNameFn(event) {
			var name = event.target.value;
			this.props.userNameFn(name);
		},
		telnumberFn: function telnumberFn(event) {
			var tel = event.target.value;
			this.props.telFn(tel);
		},
		scrollFn: function scrollFn() {
			var isAnd = navigator.userAgent.toLowerCase();
			if (/android/.test(isAnd)) {
				setTimeout(function () {
					var height = $("#register").offset().top;
					$(window).scrollTop(height);
				}, 200);
			}
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'link_man' },
				_react2.default.createElement(
					'div',
					{ className: 'register', id: 'register' },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.registerFn },
						this.props.trainUser == 0 ? "登录12306添加常用联系人" : "已登录12306",
						_react2.default.createElement('i', { className: 'iconfont icon-turnright' })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'passenger' },
					_react2.default.createElement(
						'div',
						{ className: 'title clearfix' },
						_react2.default.createElement(
							'strong',
							null,
							'\u4E58\u5BA2'
						),
						_react2.default.createElement(
							'span',
							{ className: 'often pull-right', onClick: this.userFn },
							'\u6DFB\u52A0\u4E58\u5BA2 \xA0',
							_react2.default.createElement('i', { className: 'iconfont icon-plus1' })
						)
					),
					_react2.default.createElement(
						'ul',
						{ className: 'passenger_list' },
						$.map(this.props.userInfo, function (elem, index) {
							return _react2.default.createElement(
								'li',
								{ className: 'list', key: index },
								_react2.default.createElement(
									'span',
									{ className: 'name' },
									elem.touristname
								),
								_react2.default.createElement('span', { className: 'iconfont icon-waste', onClick: this.removeUser.bind(this, elem.id) })
							);
						}.bind(this))
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'userInfo' },
					_react2.default.createElement(
						'strong',
						null,
						'\u8054\u7CFB\u4EBA\u4FE1\u606F'
					),
					_react2.default.createElement(
						'div',
						{ className: 'mobile' },
						_react2.default.createElement(
							'label',
							null,
							'\u59D3\u540D'
						),
						_react2.default.createElement('input', { type: 'text', autocomplete: 'off', className: 'tel', placeholder: '\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA\u59D3\u540D', onChange: this.userNameFn, value: this.props.userName, onClick: this.scrollFn })
					),
					_react2.default.createElement(
						'div',
						{ className: 'mobile' },
						_react2.default.createElement(
							'label',
							null,
							'\u624B\u673A'
						),
						_react2.default.createElement('input', { type: 'number', autocomplete: 'off', className: 'tel', placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801', onChange: this.telnumberFn, value: this.props.tel, onClick: this.scrollFn }),
						_react2.default.createElement('i', { className: 'iconfont icon-book', onClick: this.telFn })
					)
				)
			);
		}
	});
	
	// 快递上门
	// var Ckecked = React.createClass({
	// 	handClick:function(){
	// 		this.props.kuaiDiFn();
	// 	},
	// 	render:function(){
	// 		return(
	// 				<div className="checked_cont">
	// 					<h5 className="title">快递上门</h5>
	// 					<span className="explain">送货上门</span>
	// 					<span className={"checked"+((this.props.kuaidi)?" "+"cur":"")} onClick={this.handClick}>
	// 						<em></em>
	// 					</span>
	// 				</div>
	// 			)
	// 	}
	// });
	
	// 配送地址
	var Address = _react2.default.createClass({
		displayName: 'Address',
	
		componentDidMount: function componentDidMount() {
			if (localStorage.getItem("addressInfo")) {
				var addressInfoString = localStorage.getItem("addressInfo");
				var addressInfoObj = JSON.parse(addressInfoString).val;
				this.props.addressFn(addressInfoObj);
			}
		},
		dressFn: function dressFn() {
			var that = this;
			var requestHybrid = {
				tagname: 'forward',
				topage: 'detail',
				type: "native",
				item: 'train',
				param: {
					typeId: "10168",
					addressId: this.props.addressId
				}
			};
			var native_callback = function native_callback(data) {
				var data = JSON.parse(data);
				data = data.param;
				that.setState({
					addressId: data.addressId,
					contactName: data.contactName,
					contactMobile: data.contactMobile,
					contactAddress: data.contactAddress
				});
				that.props.addressFn({ addressId: data.addressId, name: data.contactName, tel: data.contactMobile, address: data.contactAddress });
			};
			_common2.default.bridge(native_callback, requestHybrid);
			// var obj = {addressId: '11', name:"永生",tel:"18255062153",address:"宝山区泰和路2038号"};
			// this.props.addressFn(obj)
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'address', onClick: this.dressFn },
				_react2.default.createElement(
					'label',
					{ className: 'left' },
					'\u914D\u9001\u5730\u5740'
				),
				_react2.default.createElement(
					'div',
					{ className: 'right' },
					_react2.default.createElement(
						'p',
						{ className: 'user_name' },
						this.props.contactName
					),
					_react2.default.createElement(
						'p',
						{ className: 'tel' },
						this.props.contactMobile
					),
					_react2.default.createElement(
						'p',
						{ className: 'address_detail' },
						this.props.contactAddress
					)
				),
				_react2.default.createElement('i', { className: 'iconfont icon-youyou' })
			);
		}
	});
	// 保险品种
	var Insurance = _react2.default.createClass({
		displayName: 'Insurance',
	
		getInitialState: function getInitialState() {
			return {
				insuranceName: '',
				insurancePrice: ''
			};
		},
		componentDidMount: function componentDidMount() {
			$.post(_common2.default.apihost + '/gettraininsuranceinfo', {}, function (data) {
				var data = data.data;
				this.setState({
					insuranceName: data.insuranName,
					insurancePrice: data.price
				});
				this.props.getInsurancePrice(data.price);
			}.bind(this));
		},
		handClick: function handClick() {
			this.props.baoXianFn();
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'checked_cont insurance' },
				_react2.default.createElement(
					'div',
					{ className: 'top' },
					_react2.default.createElement(
						'span',
						{ className: 'title' },
						this.state.insuranceName
					),
					_react2.default.createElement(
						'span',
						{ className: 'price' },
						'\uFFE5',
						_react2.default.createElement(
							'em',
							null,
							this.state.insurancePrice
						),
						'/\u4EBA'
					)
				),
				_react2.default.createElement(
					'span',
					{ className: "checked" + (this.props.baoxian ? " cur" : ""), onClick: this.handClick },
					_react2.default.createElement('em', null)
				)
			);
		}
	});
	exports.default = TrainOrder;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var ZhanZuo = _react2.default.createClass({
		displayName: 'ZhanZuo',
	
		getInitialState: function getInitialState() {
			var _ref;
	
			return _ref = {
				orderId: "",
				fromStation: "",
				toStation: "",
				departureTime: "",
				goDate: '',
				goTime: '',
				arriveTime: "",
				runTime: "",
				trainNumber: "",
				passengers: "",
				price: "",
				result: 2,
				payamount: null,
				user: [],
				latespaymenttime: null,
				trainCode: "",
				fromStationCode: "",
				toStationCode: ""
			}, _defineProperty(_ref, 'trainNumber', ""), _defineProperty(_ref, 'banquetName', ""), _defineProperty(_ref, 'count', null), _defineProperty(_ref, 'fresh', true), _ref;
		},
		componentDidMount: function componentDidMount() {
			var that = this;
			if (this.isMounted()) {
				var orderId = decodeURI(_common2.default.location.queryHash()).split("/")[2];
				var fromStation = decodeURI(_common2.default.location.queryKey("fromStation"));
				var toStation = decodeURI(_common2.default.location.queryKey("toStation"));
				var departureTime = decodeURI(_common2.default.location.queryKey("departureTime"));
				var arriveTime = decodeURI(_common2.default.location.queryKey("arriveTime"));
				var runTime = decodeURI(_common2.default.location.queryKey("runTime"));
				var trainNumber = decodeURI(_common2.default.location.queryKey("trainNumber"));
				var passengers = decodeURI(_common2.default.location.queryKey("passengers")).split('-');
				var price = decodeURI(_common2.default.location.queryKey("price"));
				var banquetName = decodeURI(_common2.default.location.queryKey("banquetName"));
				var goDate = this.goDateFn(departureTime);
				var goTime = this.timeFn(departureTime);
				var arriveTime = this.timeFn(arriveTime);
				// 经停站参数
				var trainCode = decodeURI(_common2.default.location.queryKey("trainCode"));
				var fromStationCode = decodeURI(_common2.default.location.queryKey("fromStationCode"));
				var toStationCode = decodeURI(_common2.default.location.queryKey("toStationCode"));
				var startTime = new Date().getTime();
				this.setState({
					orderId: orderId,
					fromStation: fromStation,
					toStation: toStation,
					departureTime: departureTime,
					goDate: goDate,
					goTime: goTime,
					arriveTime: arriveTime,
					runTime: runTime,
					trainNumber: trainNumber,
					passengers: passengers,
					price: price,
					trainCode: trainCode,
					fromStationCode: fromStationCode,
					toStationCode: toStationCode,
					banquetName: banquetName
				});
				this.getTicket(orderId);
				// 与App交互
				var requestHybrid = {
					tagname: 'forward',
					topage: 'title',
					type: "native",
					item: "train",
					param: {
						typeId: "c10164",
						title: '占座'
					}
				};
				var native_callback = function native_callback(data) {};
				_common2.default.bridge(native_callback, requestHybrid);
			}
		},
		getTicket: function getTicket(orderId) {
			var that = this;
			var orderId = orderId;
			var startTime = new Date().getTime();
			var ticketPost = function ticketPost() {
				$.post(_common2.default.apihost + "/appgettrainticketseatstatus", { orderId: orderId }, function (data) {
					if (data.code == 1) {
						var data = data.data;
						if (data.result == 1) {
							this.setState({
								result: data.result,
								payamount: data.payamount,
								user: data.user,
								latespaymenttime: data.latespaymenttime,
								fresh: false
							}, function () {
								clearTimeout(this.freshPost);
							});
							// 设置倒计时
							this.fnTimeCountDown(data.latespaymenttime, {
								sec: document.getElementById("sec"),
								mini: document.getElementById("minute")
							});
						}
						if (data.result == 0 && new Date().getTime() - startTime > 2 * 60 * 1000) {
							this.setState({
								result: 2
							}, function () {
								clearTimeout(this.freshPost);
							});
						}
						if (data.result == 2) {
							this.setState({
								result: 0
							}, function () {
								clearTimeout(this.freshPost);
							});
						}
					}
				}.bind(that));
				that.freshPost = setTimeout(function () {
					ticketPost();
				}, 5000);
			};
			ticketPost();
		},
		componentWillUnmount: function componentWillUnmount() {
			clearTimeout(this.count);
			clearTimeout(this.freshPost);
		},
		goDateFn: function goDateFn(date) {
			var goDate = date.split(" ")[0];
			var goDateArr = goDate.split("-");
			var newGoDate = parseInt(goDateArr[0]) + "年" + parseInt(goDateArr[1]) + "月" + parseInt(goDateArr[2]) + "日";
			return newGoDate;
		},
		timeFn: function timeFn(time) {
			var timeStr = time.split(" ")[1];
			var timeArr = timeStr.split(":");
			var newTimeStr = timeArr[0] + ":" + timeArr[1];
			return newTimeStr;
		},
		// 去支付
		toPayFn: function toPayFn() {
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type: "native",
				item: "train",
				param: {
					typeId: "10119",
					orderId: this.state.orderId,
					payamount: this.state.payamount
	
				}
			};
			var native_callback = function native_callback(data) {};
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 重新预定
		bookFn: function bookFn() {
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type: "native",
				item: "train",
				param: {
					typeId: "10178"
				}
			};
			var native_callback = function native_callback(data) {};
			_common2.default.bridge(native_callback, requestHybrid);
		},
		// 倒计时
		fnTimeCountDown: function fnTimeCountDown(d, o) {
			var that = this; //this == ZhanZuo组件
			var f = {
				zero: function zero(n) {
					var n = parseInt(n, 10);
					if (n > 0) {
						if (n <= 9) {
							n = "0" + n;
						}
						return String(n);
					} else {
						return "00";
					}
				},
				dv: function dv(d) {
					var d = d || Date.UTC(2050, 0, 1);
					var future = new Date(d),
					    now = new Date();
					var dur = Math.round((future.getTime() - now.getTime()) / 1000),
					    pms = {
						sec: "00",
						mini: "00"
					};
					if (dur > 0) {
						pms.sec = this.zero(dur % 60);
						pms.mini = Math.floor(dur / 60) > 0 ? this.zero(Math.floor(dur / 60)) : "00";
					}
					return pms;
				},
				ui: function ui() {
					var _this = this; //this == f对象
					var pms = this.dv(d);
					if (o.sec) {
						o.sec.innerHTML = pms.sec;
					}
					if (o.mini) {
						o.mini.innerHTML = pms.mini;
					}
					that.count = setTimeout(function () {
						_this.ui.call(_this);
					}, 1000); //count 变为ZhanZuo组件的方法
					if (!parseInt(pms.sec, 10) && !parseInt(pms.mini, 10)) {
						that.setState({
							result: 0
						});
						clearTimeout(that.count);
					}
				}
			};
			f.ui();
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'zhanzuo' },
				_react2.default.createElement(
					'div',
					{ className: "loading" + (this.state.result == -1 ? " " + "cur" : "") },
					_react2.default.createElement('em', { className: 'bg' }),
					_react2.default.createElement(
						'span',
						{ className: 'tip_text' },
						'\u5360\u5EA7\u4E2D...\u8BF7\u7A0D\u7B49'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: "loading_success" + (this.state.result == 1 ? " " + "cur" : "") },
					_react2.default.createElement('i', { className: 'iconfont icon-xiao' }),
					'\xA0\u5360\u5EA7\u6210\u529F\uFF0C\u8BF7\u4E8E',
					_react2.default.createElement('i', { id: 'minute' }),
					'\u5206',
					_react2.default.createElement('i', { id: 'sec' }),
					'\u79D2\u5185\u5B8C\u6210\u652F\u4ED8'
				),
				_react2.default.createElement(
					'div',
					{ className: "loading_fail" + (this.state.result == 0 ? " " + "cur" : "") },
					_react2.default.createElement('i', { className: 'iconfont icon-ku' }),
					'\xA0\u5360\u5EA7\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u9884\u8BA2\u6216\u9009\u62E9\u5176\u4ED6\u4EA7\u54C1'
				),
				_react2.default.createElement(
					'div',
					{ className: "loading_timeout" + (this.state.result == 2 ? " " + "cur" : "") },
					_react2.default.createElement('i', { className: 'iconfont icon-ku' }),
					'\xA0\u60A8\u597D\uFF0C\u56E0\u76EE\u524D\u62A2\u7968\u4EBA\u6570\u8FC7\u591A\uFF0C\u5360\u5EA7\u8F83\u6162\u3002\u6211\u4EEC\u7CFB\u7EDF\u5C06\u7EE7\u7EED\u4E3A\u60A8\u5360\u5EA7\uFF0C\u5E76\u7B2C\u4E00\u65F6\u95F4\u77ED\u4FE1\u901A\u77E5\u60A8\u5360\u5EA7\u4FE1\u606F\u3002'
				),
				_react2.default.createElement(
					'div',
					{ className: this.state.result == -1 ? "friend_tip cur" : "friend_tip" },
					_react2.default.createElement(
						'div',
						{ className: 'tip_cont' },
						_react2.default.createElement(
							'label',
							null,
							'\u53CB\u60C5\u63D0\u793A\uFF1A'
						),
						_react2.default.createElement(
							'span',
							{ className: 'tip' },
							'\u60A8\u53EF\u4EE5\u5148\u9000\u51FA\u5360\u5EA7\u9875\u9762\u3002\u6211\u4EEC\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u5E2E\u60A8\u5360\u5EA7\uFF0C\u5E76\u7B2C\u4E00\u65F6\u95F4\u901A\u77E5\u60A8'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'station' },
					_react2.default.createElement(
						'div',
						{ className: 'train_number' },
						_react2.default.createElement(
							'span',
							{ className: 'time' },
							this.state.goDate
						),
						_react2.default.createElement(
							'span',
							{ className: 'num' },
							' ',
							this.state.trainNumber
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'train_station clearfix' },
						_react2.default.createElement(
							'div',
							{ className: 'station_info pull-left' },
							_react2.default.createElement(
								'span',
								{ className: 'station_name' },
								this.state.fromStation
							),
							_react2.default.createElement(
								'span',
								{ className: 'time' },
								this.state.goTime
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'mid' },
							_react2.default.createElement(
								'span',
								{ className: 'all_time' },
								'\u9884\u8BA1\u7528\u65F6',
								this.state.runTime
							),
							_react2.default.createElement('span', { className: 'arrows' }),
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: { pathname: "/jingting", query: { trainCode: this.state.trainNumber, fromStationCode: this.state.fromStationCode, toStationCode: this.state.toStationCode, trainNumber: this.state.trainCode } } },
									'\u67E5\u770B\u7ECF\u505C\u7AD9'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'station_info pull-right' },
							_react2.default.createElement(
								'span',
								{ className: 'station_name' },
								this.state.toStation
							),
							_react2.default.createElement(
								'span',
								{ className: 'time' },
								this.state.arriveTime
							)
						)
					),
					this.state.result != 1 ? _react2.default.createElement(NormalOrFail, { passengers: this.state.passengers, price: this.state.price, banquetName: this.state.banquetName }) : '',
					this.state.result == 1 ? _react2.default.createElement(Success, { user: this.state.user }) : '',
					_react2.default.createElement(
						'div',
						{ className: "pay_status clearfix" + (this.state.result == 1 ? " " + "cur" : "") },
						_react2.default.createElement(
							'span',
							{ className: 'pull-left' },
							'\u5F85\u652F\u4ED8'
						),
						_react2.default.createElement(
							'span',
							{ className: 'pull-right' },
							_react2.default.createElement(
								'strong',
								null,
								'\uFFE5',
								_react2.default.createElement(
									'i',
									null,
									this.state.payamount
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: "btn" + (this.state.result == 1 ? " " + "cur" : "") },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.toPayFn },
						'\u53BB\u652F\u4ED8'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: "btn" + (this.state.result == 0 ? " " + "cur" : "") },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.bookFn },
						'\u91CD\u65B0\u9884\u5B9A'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: "btn" + (this.state.result == 2 ? " " + "cur" : "") },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.bookFn },
						'\u8FD4\u56DE'
					)
				)
			);
		}
	});
	// 抢座状态+失败状态
	var NormalOrFail = _react2.default.createClass({
		displayName: 'NormalOrFail',
	
		render: function render() {
			return _react2.default.createElement(
				'ul',
				{ className: 'buy_info' },
				$.map(this.props.passengers, function (elem, index) {
					return _react2.default.createElement(
						'li',
						{ className: 'clearfix' },
						_react2.default.createElement(
							'span',
							{ className: 'pull-left' },
							elem
						),
						_react2.default.createElement(
							'span',
							{ className: 'pull-right' },
							this.props.banquetName,
							' ',
							_react2.default.createElement(
								'strong',
								null,
								'\uFFE5',
								_react2.default.createElement(
									'i',
									null,
									this.props.price
								)
							)
						)
					);
				}.bind(this))
			);
		}
	});
	// 抢座成功状态
	var Success = _react2.default.createClass({
		displayName: 'Success',
	
		render: function render() {
			return _react2.default.createElement(
				'ul',
				{ className: 'buy_info' },
				$.map(this.props.user, function (elem, index) {
					var seatnumberStr = elem.seatnumber.replace(",", '');
					return _react2.default.createElement(
						'li',
						{ className: 'clearfix' },
						_react2.default.createElement(
							'span',
							{ className: 'pull-left' },
							elem.passengername
						),
						_react2.default.createElement(
							'span',
							{ className: 'pull-right' },
							seatnumberStr
						)
					);
				})
			);
		}
	});
	exports.default = ZhanZuo;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(13);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(14).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems = function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function (msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear = function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType(type) {
	  var color = problemColors[type] || colors.red;
	  return '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' + type.slice(0, -1).toUpperCase() + '</span>';
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = ansiHTML;
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var re_ansi = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	};
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	};
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.8', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>' };
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	};
	[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>';
	});
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML(text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!re_ansi.test(text)) {
	    return text;
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = [];
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq];
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) {
	        ansiCodes.pop();
	        return '</span>';
	      }
	      // Open tag.
	      ansiCodes.push(seq);
	      return ot[0] == '<' ? ot : '<span style="' + ot + ';">';
	    }
	
	    var ct = _closeTags[seq];
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop();
	      return ct;
	    }
	    return '';
	  });
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length;
	  l > 0 && (ret += Array(l + 1).join('</span>'));
	
	  return ret;
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if ((typeof colors === 'undefined' ? 'undefined' : _typeof(colors)) != 'object') {
	    throw new Error('`colors` parameter must be an Object.');
	  }
	
	  var _finalColors = {};
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
	    if (!hex) {
	      _finalColors[key] = _defColors[key];
	      continue;
	    }
	    if ('reset' == key) {
	      if (typeof hex == 'string') {
	        hex = [hex];
	      }
	      if (!Array.isArray(hex) || hex.length == 0 || hex.some(function (h) {
	        return typeof h != 'string';
	      })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
	      }
	      var defHexColor = _defColors[key];
	      if (!hex[0]) {
	        hex[0] = defHexColor[0];
	      }
	      if (hex.length == 1 || !hex[1]) {
	        hex = [hex[0]];
	        hex.push(defHexColor[1]);
	      }
	
	      hex = hex.slice(0, 2);
	    } else if (typeof hex != 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
	    }
	    _finalColors[key] = hex;
	  }
	  _setTags(_finalColors);
	};
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function () {
	  _setTags(_defColors);
	};
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {
	  get open() {
	    return _openTags;
	  },
	  get close() {
	    return _closeTags;
	  }
	};
	
	function _setTags(colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey;
	
	  for (var code in _styles) {
	    var color = _styles[code];
	    var oriColor = colors[color] || '000';
	    _openTags[code] = 'color:#' + oriColor;
	    code = parseInt(code);
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
	  }
	}
	
	ansiHTML.reset();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  XmlEntities: __webpack_require__(16),
	  Html4Entities: __webpack_require__(15),
	  Html5Entities: __webpack_require__(4),
	  AllHtmlEntities: __webpack_require__(4)
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function (str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function (str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function (str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function (str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function (str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function (str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function (s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.encode = function (str) {
	    return new XmlEntities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function (str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ? parseInt(s.substr(3), 16) : parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.decode = function (str) {
	    return new XmlEntities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function (str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.encodeNonUTF = function (str) {
	    return new XmlEntities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function (str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.encodeNonASCII = function (str) {
	    return new XmlEntities().encodeNonASCII(str);
	};
	
	module.exports = XmlEntities;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(17);
	exports.encode = exports.stringify = __webpack_require__(18);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ansiRegex = __webpack_require__(21)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
		);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function (hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function cb(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if (!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function applyCallback(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function (outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	      result.then(function (updatedModules) {
	        cb(null, updatedModules);
	      });
	      result.catch(cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function (moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if (unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn("[HMR] The following modules couldn't be hot updated: " + "(Full reload needed)\n" + "This is usually because the modules which have changed " + "(and their parents) do not know how to hot reload themselves. " + "See " + hmrDocsUrl + " for more details.");
	        unacceptedModules.forEach(function (moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if (!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function (moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs="

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true
	};
	if (true) {
	  var querystring = __webpack_require__(19);
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = __webpack_require__.p + options.path;
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect(window.EventSource);
	}
	
	function connect(EventSource) {
	  var source = new EventSource(options.path);
	  var lastActivity = new Date();
	
	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;
	
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(function() { connect(EventSource); }, options.timeout);
	  }
	
	}
	
	var reporter;
	// the reporter needs to be a singleton on the page
	// in case the client is being used by mutliple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	if (typeof window !== 'undefined' && !window[singletonKey]) {
	  reporter = window[singletonKey] = createReporter();
	}
	
	function createReporter() {
	  var strip = __webpack_require__(20);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(12);
	  }
	
	  return {
	    problems: function(type, obj) {
	      if (options.warn) {
	        console.warn("[HMR] bundle has " + type + ":");
	        obj[type].forEach(function(msg) {
	          console.warn("[HMR] " + strip(msg));
	        });
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(22);
	
	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  switch(obj.action) {
	    case "building":
	      if (options.log) console.log("[HMR] bundle rebuilding");
	      break;
	    case "built":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? obj.name + " " : "") +
	          "rebuilt in " + obj.time + "ms"
	        );
	      }
	      // fall through
	    case "sync":
	      if (obj.errors.length > 0) {
	        if (reporter) reporter.problems('errors', obj);
	      } else {
	        if (reporter) {
	          if (obj.warnings.length > 0) reporter.problems('warnings', obj);
	          reporter.success();
	        }
	        processUpdate(obj.hash, obj.modules, options);
	      }
	      break;
	    default:
	      if (customHandler) {
	        customHandler(obj);
	      }
	  }
	
	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true", __webpack_require__(23)(module)))

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map