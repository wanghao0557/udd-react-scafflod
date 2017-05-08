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
/******/ 	var hotCurrentHash = "24c5baae9aac1aa2169e"; // eslint-disable-line no-unused-vars
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

	__webpack_require__(18);
	module.exports = __webpack_require__(55);


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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames() {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if ("function" === 'function' && _typeof(__webpack_require__(14)) === 'object' && __webpack_require__(14)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};

/***/ },
/* 6 */
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
	     } else {
	          this.months_num = 6;
	          this.display_num = 1;
	          this.initial_time = null;
	          this.direction = "after"; //affter向前，before之后
	          this.selected = null;
	          this.start_time = null;
	          this.end_time = null;
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
	     this.creat_calendar();
	};
	CalendarMob.prototype.num = 0;
	CalendarMob.prototype.creat_calendar = function () {
	     var _this2 = this;
	
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
	          var _this;
	
	          (function () {
	               var timearea_style = function timearea_style() {
	                    var flag = false;
	                    _this.trigger.find(".active").each(function () {
	                         if (flag) {
	                              $(this).addClass("section_time");
	                         }
	                         if ($(this).hasClass("start_time")) {
	                              flag = true;
	                         }
	                         if ($(this).hasClass("end_time")) {
	                              flag = false;
	                              $(this).removeClass("section_time");
	                         }
	                    });
	               };
	
	               _this2.click_num = 0;
	               _this = _this2;
	
	               _this2.trigger.find(".active").on("click", function () {
	                    var dataDate = $(this).attr("data-date");
	                    if (_this.click_num == 0) {
	                         _this.trigger.find(".active").removeClass("start_time end_time section_time");
	                         $(this).addClass("start_time");
	                         _this.click_num++;
	                         _this.start_time = dataDate;
	                         _this.end_time = null;
	                         $(this).find("p").text("入住");
	                    } else if (_this.click_num == 1) {
	                         if (Date.parse(new Date(dataDate.replace(/\-/g, "/"))) <= Date.parse(new Date(_this.start_time.replace(/\-/g, "/")))) {
	                              _this.trigger.find(".active").removeClass("start_time");
	                              $(this).addClass("start_time");
	                              _this.start_time = dataDate;
	                              $(this).find("p").text("入住");
	                         } else {
	                              $(this).addClass("end_time");
	                              $(this).find("p").text("离店");
	                              _this.end_time = dataDate;
	                              //渲染选中区块样式
	                              timearea_style();
	                              //alert("渲染完成，请刷新页面");   //todo
	                              if (_this.callback) {
	                                   _this.callback();
	                              }
	                         }
	                    }
	               });
	          })();
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
	//绘画日历小元素，同时监听点击事件
	CalendarMob.prototype.painting = function ($a, time) {
	     var sortTime = Date.parse(new Date(time.replace(/\-/g, "/")));
	     if (this.start_timestamp && this.start_timestamp == sortTime) {
	          $a.addClass("start_time");
	          $a.find("p").text("入住");
	     }
	     if (this.end_timestamp && this.end_timestamp == sortTime) {
	          $a.addClass("end_time");
	          $a.find("p").text("离店");
	     }
	     if (this.start_timestamp && this.end_timestamp && sortTime > this.start_timestamp && sortTime < this.end_timestamp) {
	          $a.addClass("section_time");
	     }
	     if (this.direction == "after") {
	          if (this.initial_timestamp <= sortTime) {
	               $a.addClass("active");
	               $a.attr("data-date", time);
	          } else {
	               $a.addClass("disable");
	          }
	          return;
	     }
	     $a.addClass("active");
	};
	
	exports.default = CalendarMob;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var defaultProps = {
	    className: '',
	    accessibility: true,
	    adaptiveHeight: false,
	    arrows: true,
	    autoplay: false,
	    autoplaySpeed: 3000,
	    centerMode: false,
	    centerPadding: '50px',
	    cssEase: 'ease',
	    dots: false,
	    dotsClass: 'slick-dots',
	    draggable: true,
	    easing: 'linear',
	    edgeFriction: 0.35,
	    fade: false,
	    focusOnSelect: false,
	    infinite: true,
	    initialSlide: 0,
	    lazyLoad: false,
	    pauseOnHover: true,
	    responsive: null,
	    rtl: false,
	    slide: 'div',
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    speed: 500,
	    swipe: true,
	    swipeToSlide: false,
	    touchMove: true,
	    touchThreshold: 5,
	    useCSS: true,
	    variableWidth: false,
	    vertical: false,
	    waitForAnimate: true,
	    afterChange: null,
	    beforeChange: null,
	    edgeEvent: null,
	    init: null,
	    swipeEvent: null,
	    // nextArrow, prevArrow are react componets
	    nextArrow: null,
	    prevArrow: null
	};
	
	module.exports = defaultProps;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(33);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(15);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _trackHelper = __webpack_require__(10);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var helpers = {
	  initialize: function initialize(props) {
	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = this.getWidth(_reactDom2.default.findDOMNode(this.list));
	    var trackWidth = this.getWidth(_reactDom2.default.findDOMNode(this.track));
	    var slideWidth = trackWidth / props.slidesToShow;
	
	    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;
	
	    this.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth,
	      currentSlide: currentSlide
	    }, function () {
	
	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));
	
	      this.setState({ trackStyle: trackStyle });
	
	      this.autoPlay(); // once we're set up, trigger the initial autoplay.
	    });
	  },
	  update: function update(props) {
	    // This method has mostly same code as initialize method.
	    // Refactor it
	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = this.getWidth(_reactDom2.default.findDOMNode(this.list));
	    var trackWidth = this.getWidth(_reactDom2.default.findDOMNode(this.track));
	    var slideWidth = this.getWidth(_reactDom2.default.findDOMNode(this)) / props.slidesToShow;
	
	    // pause slider if autoplay is set to false
	    if (!props.autoplay) this.pause();
	
	    this.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth
	    }, function () {
	
	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));
	
	      this.setState({ trackStyle: trackStyle });
	    });
	  },
	  getWidth: function getWidth(elem) {
	    return elem.getBoundingClientRect().width || elem.offsetWidth;
	  },
	  adaptHeight: function adaptHeight() {
	    if (this.props.adaptiveHeight) {
	      var selector = '[data-index="' + this.state.currentSlide + '"]';
	      if (this.list) {
	        var slickList = _reactDom2.default.findDOMNode(this.list);
	        slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
	      }
	    }
	  },
	  slideHandler: function slideHandler(index) {
	    var _this = this;
	
	    // Functionality of animateSlide and postSlide is merged into this function
	    // console.log('slideHandler', index);
	    var targetSlide, currentSlide;
	    var targetLeft, currentLeft;
	    var callback;
	
	    if (this.props.waitForAnimate && this.state.animating) {
	      return;
	    }
	
	    if (this.props.fade) {
	      currentSlide = this.state.currentSlide;
	
	      // Don't change slide if it's not infite and current slide is the first or last slide.
	      if (this.props.infinite === false && (index < 0 || index >= this.state.slideCount)) {
	        return;
	      }
	
	      //  Shifting targetSlide back into the range
	      if (index < 0) {
	        targetSlide = index + this.state.slideCount;
	      } else if (index >= this.state.slideCount) {
	        targetSlide = index - this.state.slideCount;
	      } else {
	        targetSlide = index;
	      }
	
	      if (this.props.lazyLoad && this.state.lazyLoadedList.indexOf(targetSlide) < 0) {
	        this.setState({
	          lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)
	        });
	      }
	
	      callback = function callback() {
	        _this.setState({
	          animating: false
	        });
	        if (_this.props.afterChange) {
	          _this.props.afterChange(targetSlide);
	        }
	        delete _this.animationEndCallback;
	      };
	
	      this.setState({
	        animating: true,
	        currentSlide: targetSlide
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });
	
	      if (this.props.beforeChange) {
	        this.props.beforeChange(this.state.currentSlide, targetSlide);
	      }
	
	      this.autoPlay();
	      return;
	    }
	
	    targetSlide = index;
	    if (targetSlide < 0) {
	      if (this.props.infinite === false) {
	        currentSlide = 0;
	      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
	        currentSlide = this.state.slideCount - this.state.slideCount % this.props.slidesToScroll;
	      } else {
	        currentSlide = this.state.slideCount + targetSlide;
	      }
	    } else if (targetSlide >= this.state.slideCount) {
	      if (this.props.infinite === false) {
	        currentSlide = this.state.slideCount - this.props.slidesToShow;
	      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
	        currentSlide = 0;
	      } else {
	        currentSlide = targetSlide - this.state.slideCount;
	      }
	    } else {
	      currentSlide = targetSlide;
	    }
	
	    targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: targetSlide,
	      trackRef: this.track
	    }, this.props, this.state));
	
	    currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: currentSlide,
	      trackRef: this.track
	    }, this.props, this.state));
	
	    if (this.props.infinite === false) {
	      targetLeft = currentLeft;
	    }
	
	    if (this.props.beforeChange) {
	      this.props.beforeChange(this.state.currentSlide, currentSlide);
	    }
	
	    if (this.props.lazyLoad) {
	      var loaded = true;
	      var slidesToLoad = [];
	      for (var i = targetSlide; i < targetSlide + this.props.slidesToShow; i++) {
	        loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;
	        if (!loaded) {
	          slidesToLoad.push(i);
	        }
	      }
	      if (!loaded) {
	        this.setState({
	          lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
	        });
	      }
	    }
	
	    // Slide Transition happens here.
	    // animated transition happens to target Slide and
	    // non - animated transition happens to current Slide
	    // If CSS transitions are false, directly go the current slide.
	
	    if (this.props.useCSS === false) {
	
	      this.setState({
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state))
	      }, function () {
	        if (this.props.afterChange) {
	          this.props.afterChange(currentSlide);
	        }
	      });
	    } else {
	
	      var nextStateChanges = {
	        animating: false,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state)),
	        swipeLeft: null
	      };
	
	      callback = function callback() {
	        _this.setState(nextStateChanges);
	        if (_this.props.afterChange) {
	          _this.props.afterChange(currentSlide);
	        }
	        delete _this.animationEndCallback;
	      };
	
	      this.setState({
	        animating: true,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: targetLeft }, this.props, this.state))
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });
	    }
	
	    this.autoPlay();
	  },
	  swipeDirection: function swipeDirection(touchObject) {
	    var xDist, yDist, r, swipeAngle;
	
	    xDist = touchObject.startX - touchObject.curX;
	    yDist = touchObject.startY - touchObject.curY;
	    r = Math.atan2(yDist, xDist);
	
	    swipeAngle = Math.round(r * 180 / Math.PI);
	    if (swipeAngle < 0) {
	      swipeAngle = 360 - Math.abs(swipeAngle);
	    }
	    if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
	      return this.props.rtl === false ? 'left' : 'right';
	    }
	    if (swipeAngle >= 135 && swipeAngle <= 225) {
	      return this.props.rtl === false ? 'right' : 'left';
	    }
	
	    return 'vertical';
	  },
	  autoPlay: function autoPlay() {
	    var _this2 = this;
	
	    if (this.state.autoPlayTimer) {
	      return;
	    }
	    var play = function play() {
	      if (_this2.state.mounted) {
	        var nextIndex = _this2.props.rtl ? _this2.state.currentSlide - _this2.props.slidesToScroll : _this2.state.currentSlide + _this2.props.slidesToScroll;
	        _this2.slideHandler(nextIndex);
	      }
	    };
	    if (this.props.autoplay) {
	      this.setState({
	        autoPlayTimer: window.setInterval(play, this.props.autoplaySpeed)
	      });
	    }
	  },
	  pause: function pause() {
	    if (this.state.autoPlayTimer) {
	      window.clearInterval(this.state.autoPlayTimer);
	      this.setState({
	        autoPlayTimer: null
	      });
	    }
	  }
	};
	
	exports.default = helpers;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = undefined;
	
	var _reactDom = __webpack_require__(15);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
	  return keysArray.reduce(function (value, key) {
	    return value && spec.hasOwnProperty(key);
	  }, true) ? null : console.error('Keys Missing', spec);
	};
	
	var getTrackCSS = exports.getTrackCSS = function getTrackCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);
	
	  var trackWidth;
	
	  if (spec.variableWidth) {
	    trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	  } else if (spec.centerMode) {
	    trackWidth = (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;
	  } else {
	    trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	  }
	
	  var style = {
	    opacity: 1,
	    width: trackWidth,
	    WebkitTransform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
	    transform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
	    transition: '',
	    WebkitTransition: '',
	    msTransform: 'translateX(' + spec.left + 'px)'
	  };
	
	  // Fallback for IE8
	  if (!window.addEventListener && window.attachEvent) {
	    style.marginLeft = spec.left + 'px';
	  }
	
	  return style;
	};
	
	var getTrackAnimateCSS = exports.getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);
	
	  var style = getTrackCSS(spec);
	  // useCSS is true by default so it can be undefined
	  style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
	  style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
	  return style;
	};
	
	var getTrackLeft = exports.getTrackLeft = function getTrackLeft(spec) {
	
	  checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth']);
	
	  var slideOffset = 0;
	  var targetLeft;
	  var targetSlide;
	
	  if (spec.fade) {
	    return 0;
	  }
	
	  if (spec.infinite) {
	    if (spec.slideCount > spec.slidesToShow) {
	      slideOffset = spec.slideWidth * spec.slidesToShow * -1;
	    }
	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        if (spec.slideIndex > spec.slideCount) {
	          slideOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideWidth * -1;
	        } else {
	          slideOffset = spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;
	        }
	      }
	    }
	  } else {
	
	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        var slidesToOffset = spec.slidesToShow - spec.slideCount % spec.slidesToScroll;
	        slideOffset = slidesToOffset * spec.slideWidth;
	      }
	    }
	  }
	
	  if (spec.centerMode) {
	    if (spec.infinite) {
	      slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    } else {
	      slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    }
	  }
	
	  targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;
	
	  if (spec.variableWidth === true) {
	    var targetSlideIndex;
	    if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[spec.slideIndex];
	    } else {
	      targetSlideIndex = spec.slideIndex + spec.slidesToShow;
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[targetSlideIndex];
	    }
	    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
	    if (spec.centerMode === true) {
	      if (spec.infinite === false) {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex];
	      } else {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex + spec.slidesToShow + 1];
	      }
	
	      targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
	      targetLeft += (spec.listWidth - targetSlide.offsetWidth) / 2;
	    }
	  }
	
	  return targetLeft;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var camel2hyphen = __webpack_require__(35);
	
	var isDimension = function isDimension(feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};
	
	var obj2mq = function obj2mq(obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length - 1) {
	      mq += ' and ';
	    }
	  });
	  return mq;
	};
	
	var json2mq = function json2mq(query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length - 1) {
	        mq += ', ';
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};
	
	module.exports = json2mq;

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Debug = React.createClass({
		displayName: 'Debug',
	
		getInitialState: function getInitialState() {
			return {
				logs: [],
				shown: true
			};
		},
		componentDidMount: function componentDidMount() {
			var b = 1 + 2;
			var logs = [];
			//console.resourlog=console.log;
			console.log = function (str) {
				//console.resourlog(str);
				if ((typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object') {
					str = JSON.stringify(str);
				} else if (typeof str === 'undefined') {
					str = str + '';
				} else {
					str = str.toString();
				}
				logs.push(str);
			};
			if (this.isMounted()) {
				this.setState({
					logs: logs
				});
			}
		},
		toggleClick: function toggleClick() {
			this.setState({
				shown: !this.state.shown
			});
		},
		render: function render() {
			var logs = this.state.logs;
			return React.createElement(
				'div',
				{ className: "debug-footer " + (this.state.shown ? '' : 'close') },
				React.createElement(
					'a',
					{ className: 'toggle-btn', onClick: this.toggleClick, href: 'javascript: void(0)' },
					this.state.shown ? 'Hide' : 'Show'
				),
				React.createElement(
					'ol',
					null,
					$.map(logs, function (elem, index) {
						return React.createElement(
							'li',
							{ key: index },
							elem
						);
					}.bind(this))
				)
			);
		}
	});
	
	exports.default = Debug;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _room = __webpack_require__(25);
	
	var _room2 = _interopRequireDefault(_room);
	
	var _room_info = __webpack_require__(26);
	
	var _room_info2 = _interopRequireDefault(_room_info);
	
	var _hotelOrder = __webpack_require__(23);
	
	var _hotelOrder2 = _interopRequireDefault(_hotelOrder);
	
	var _hotelDetail = __webpack_require__(21);
	
	var _hotelDetail2 = _interopRequireDefault(_hotelDetail);
	
	var _dianping = __webpack_require__(19);
	
	var _dianping2 = _interopRequireDefault(_dianping);
	
	var _hotelInfo = __webpack_require__(22);
	
	var _hotelInfo2 = _interopRequireDefault(_hotelInfo);
	
	var _share = __webpack_require__(27);
	
	var _share2 = _interopRequireDefault(_share);
	
	var _hotelCalendar = __webpack_require__(20);
	
	var _hotelCalendar2 = _interopRequireDefault(_hotelCalendar);
	
	var _quhao = __webpack_require__(24);
	
	var _quhao2 = _interopRequireDefault(_quhao);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(54);
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
				_react2.default.createElement(_reactRouter.Route, { path: '/room', name: 'room', component: _room2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/roominfo', name: 'roominfo', component: _room_info2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/order/:id/:roomid/:productid', name: 'order', component: _hotelOrder2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/detail/:id', name: 'detail', component: _hotelDetail2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/dianping', name: 'dianping', component: _dianping2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/info/:id', name: 'info', component: _hotelInfo2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/share', name: 'share', component: _share2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/calendar', name: 'calendar', component: _hotelCalendar2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: '/quhao', name: 'quhao', component: _quhao2.default })
			)
		);
		ReactDOM.render(routes, document.getElementById('hotel'));
	}
	init();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _debug = __webpack_require__(17);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(53);
	
	
	var FooterPlaceholer = _react2.default.createClass({
	  displayName: 'FooterPlaceholer',
	
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'footer-placeholder dp-placeholder' });
	  }
	});
	
	var DpOverview = _react2.default.createClass({
	  displayName: 'DpOverview',
	
	  render: function render() {
	    var commentavg = this.props.commentavg;
	    var presult = commentavg / 5 * 100;
	    return _react2.default.createElement(
	      'div',
	      { className: 'dp-overview' },
	      _react2.default.createElement(
	        'div',
	        { className: 'score absolute-middle' },
	        _react2.default.createElement(
	          'em',
	          null,
	          _react2.default.createElement(
	            'strong',
	            null,
	            commentavg
	          ),
	          '\u5206'
	        ),
	        _react2.default.createElement(
	          'em',
	          null,
	          _react2.default.createElement(
	            'strong',
	            null,
	            presult + "%"
	          ),
	          '\u7528\u6237\u6EE1\u610F\u5EA6'
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'subscore' },
	        $.map(this.props.awards, function (elem, index) {
	          return _react2.default.createElement(
	            'em',
	            { key: index },
	            elem.Provider,
	            ': ',
	            elem.Rating
	          );
	        })
	      )
	    );
	  }
	});
	
	var DpAction = _react2.default.createClass({
	  displayName: 'DpAction',
	
	  render: function render() {
	    var comments = this.props.comment;
	    var icons = ['icon-zan1', 'icon-yiban', 'icon-chaping'];
	    return _react2.default.createElement(
	      'ul',
	      { className: 'dp-action clearfix' },
	      _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'p',
	          null,
	          '\u5168\u90E8'
	        )
	      ),
	      $.map(comments, function (elem, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: index },
	          _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement('i', { className: "hotel-icon left-icon " + icons[index] }),
	            elem.title,
	            ' ',
	            elem.num
	          )
	        );
	      })
	    );
	  }
	});
	
	var DpItems = _react2.default.createClass({
	  displayName: 'DpItems',
	
	  getInitialState: function getInitialState() {
	    return {
	      limit: 106,
	      showMoreBtn: true
	    };
	  },
	  showMore: function showMore(e) {
	    this.setState({
	      limit: this.props.description.length,
	      showMoreBtn: false
	    });
	  },
	  hideMore: function hideMore() {
	    this.setState({
	      limit: 106,
	      showMoreBtn: true
	    });
	  },
	
	  renderMoreBtn: function renderMoreBtn() {
	    if (!this.state.showMoreBtn) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'more' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.hideMore },
	          _react2.default.createElement('i', { className: 'hotel-icon icon-upup cicon-gray' })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'more' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript: void(0)', onClick: this.showMore },
	        _react2.default.createElement('i', { className: 'hotel-icon icon-downdown cicon-gray' })
	      )
	    );
	  },
	  render: function render() {
	    var limitDescription = this.state.limit,
	        description = this.props.description.substring(0, this.state.limit),
	        descriptionLen = this.props.description.length;
	    return _react2.default.createElement(
	      'ul',
	      { className: 'dp-items' },
	      _react2.default.createElement(
	        'li',
	        { className: this.state.toggleClass },
	        _react2.default.createElement(
	          'a',
	          { className: 'room-name hide', href: 'javascript:void(0)' },
	          '\u5546\u52A1\u5927\u5E8A\u623F',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-youyou' })
	        ),
	        _react2.default.createElement(
	          'h4',
	          null,
	          'M83****32'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'dp-stars' },
	          _react2.default.createElement('i', { className: 'hotel-icon icon-star1' }),
	          _react2.default.createElement('i', { className: 'hotel-icon icon-star1' }),
	          _react2.default.createElement('i', { className: 'hotel-icon icon-star1' }),
	          _react2.default.createElement('i', { className: 'hotel-icon icon-star1' }),
	          _react2.default.createElement('i', { className: 'hotel-icon icon-star2' }),
	          _react2.default.createElement(
	            'div',
	            { className: 'star-result' },
	            _react2.default.createElement('em', { className: 'caret' }),
	            _react2.default.createElement(
	              'span',
	              null,
	              this.props.commentavg,
	              '\u5206'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'date' },
	          '206-03-01\u5165\u4F4F\uFF0C2016-04-01\u53D1\u5E03'
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'description' },
	          descriptionLen != limitDescription ? description + '...' : description
	        ),
	        this.renderMoreBtn(),
	        _react2.default.createElement(
	          'a',
	          { className: 'dp-btn hide', href: 'javascript:void(0)' },
	          _react2.default.createElement('i', { className: 'h\r el-icon icon-zan1' }),
	          '\u6709\u7528 3'
	        )
	      )
	    );
	  }
	});
	
	var DpChoose = _react2.default.createClass({
	  displayName: 'DpChoose',
	
	  toggleNative: function toggleNative() {
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "10112"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      console.log(data);
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'dp-choose' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.toggleNative },
	        _react2.default.createElement('i', { className: 'hotel-icon icon-shaixuan2 left-icon' }),
	        '\u7B5B\u9009'
	      )
	    );
	  }
	});
	
	var DianPing = _react2.default.createClass({
	  displayName: 'DianPing',
	
	  getInitialState: function getInitialState() {
	    return {
	      commentavg: '4',
	      awards: [{ Provider: "周边环境", Rating: "4.6" }, { Provider: "酒店服务", Rating: "4.6" }, { Provider: "酒店设施", Rating: "4.6" }, { Provider: "房间卫生", Rating: "4.6" }],
	      comment: [{ title: "满意", num: "0" }, { title: "一般", num: "0" }, { title: "待改善", num: "0" }],
	      description: '酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获。 酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获。'
	
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "c10102",
	        title: "房型评论"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(DpOverview, { commentavg: this.state.commentavg, awards: this.state.awards }),
	      _react2.default.createElement(DpAction, { comment: this.state.comment }),
	      _react2.default.createElement(DpItems, { commentavg: this.state.commentavg, description: this.state.description }),
	      _react2.default.createElement(DpChoose, null),
	      _react2.default.createElement(FooterPlaceholer, null)
	    );
	  }
	});
	
	exports.default = DianPing;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _calendar = __webpack_require__(6);
	
	var _calendar2 = _interopRequireDefault(_calendar);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(13);
	
	
	var CalendarContent = _react2.default.createClass({
	  displayName: "CalendarContent",
	
	  render: function render() {
	    return _react2.default.createElement("div", { className: "calendar-con", id: "calendar-con" });
	  }
	});
	
	var HotelCalendar = _react2.default.createClass({
	  displayName: "HotelCalendar",
	
	  componentDidMount: function componentDidMount() {
	    var st = _common2.default.location.queryKey("starttime");
	    var et = _common2.default.location.queryKey("endtime");
	    if (!st) {
	      st = null;
	    }
	    if (!et) {
	      et = null;
	    }
	    var time = new _calendar2.default("calendar-con", {
	      //initial_time:"2016-8-30",
	      direction: "after",
	      //offsety:6
	      start_time: st,
	      end_time: et
	    });
	    time.init();
	    time.callback = function () {
	      console.log("开始时间：" + time.start_time);
	      console.log("结束时间：" + time.end_time);
	      //与app的交互
	      var requestHybrid = {
	        tagname: 'forward',
	        topage: 'detail',
	        type: "native",
	        param: {
	          typeId: "10103",
	          starttime: time.start_time,
	          endtime: time.end_time
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
	      param: {
	        typeId: "c10103",
	        title: "选择入住/离店时间"
	      }
	    };
	    var callback = function callback(data) {};
	    _common2.default.bridge(callback, setTitle);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(CalendarContent, null)
	    );
	  }
	});
	
	exports.default = HotelCalendar;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _calendar = __webpack_require__(6);
	
	var _calendar2 = _interopRequireDefault(_calendar);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(13);
	var HotelIntro = _react2.default.createClass({
	  displayName: 'HotelIntro',
	
	  getInitialState: function getInitialState() {
	    return {
	      hotelId: '',
	      generalFacilitiesName: '',
	      activityFacilitiesName: '',
	      serviceItemName: '',
	      introduction: ''
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var hotelid = _common2.default.location.queryHash().split("/")[2];
	    $.post('/gethotelfacinfo', { id: hotelid }, function (data) {
	      var data = data.data;
	      if (this.isMounted()) {
	        this.setState({
	          hotelId: data.hotelId,
	          generalFacilitiesName: data.generalFacilitiesName,
	          activityFacilitiesName: data.activityFacilitiesName,
	          serviceItemName: data.serviceItemName,
	          introduction: data.introduction
	        });
	      }
	    }.bind(this));
	  },
	  toggleRoomList: function toggleRoomList() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'roomlist',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10110",
	        id: this.props.hotelId
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    var sheshi = this.state.generalFacilitiesName + this.state.activityFacilitiesName + this.state.serviceItemName;
	    var introduction = this.state.introduction.replace(/<[^<>]+>/g, '');
	    return _react2.default.createElement(
	      'div',
	      { className: 'hotel-intro' },
	      _react2.default.createElement(
	        'div',
	        { className: 'hi-img' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript:void(0)', onClick: this.toggleRoomList },
	          _react2.default.createElement('img', { src: this.props.hotelHeadPic }),
	          _react2.default.createElement(
	            'div',
	            { className: 'caption' },
	            this.props.hotelname,
	            ' ',
	            _react2.default.createElement(
	              'em',
	              null,
	              '[',
	              this.props.star,
	              ']'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'hi-content' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { className: 'intro item', to: { pathname: "/info/" + _common2.default.location.queryHash().split("/")[2], query: { starttime: this.props.starttime, endtime: this.props.endtime } } },
	          _react2.default.createElement(
	            'div',
	            { className: 'xq-info' },
	            _react2.default.createElement(
	              'p',
	              null,
	              introduction.substring(0, 15) + '...'
	            ),
	            _react2.default.createElement(
	              'p',
	              { className: 'icons' },
	              sheshi.indexOf('免费停车场') !== -1 ? _react2.default.createElement('i', { className: 'hotel-icon icon-parking' }) : '',
	              sheshi.indexOf('健身室') !== -1 ? _react2.default.createElement('i', { className: 'hotel-icon icon-fitness' }) : '',
	              sheshi.indexOf('前台贵重物品保险柜') !== -1 ? _react2.default.createElement('i', { className: 'hotel-icon icon-lock' }) : '',
	              sheshi.indexOf('叫醒服务') !== -1 ? _react2.default.createElement('i', { className: 'hotel-icon icon-clock' }) : ''
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'fixed-item' },
	            '\u8BE6\u60C5',
	            _react2.default.createElement('i', { className: 'hotel-icon icon-youyou cicon-gray right-icon' })
	          )
	        )
	      )
	    );
	  }
	});
	
	var HotelAside = _react2.default.createClass({
	  displayName: 'HotelAside',
	
	  toggleLonLat: function toggleLonLat() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10111",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        detailAddress: this.props.detailAddress,
	        name: this.props.hotelname,
	        commentavg: this.props.commentavg,
	        stattprice: this.props.price
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  jiaoTong: function jiaoTong() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10114",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        id: "1"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	
	  meiShi: function meiShi() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10114",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        id: "2"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  jingDian: function jingDian() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10114",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        id: "3"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  yuLe: function yuLe() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10114",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        id: "4"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  gouWu: function gouWu() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'map',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10114",
	        lon: this.props.lon,
	        lat: this.props.lat,
	        id: "5"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'hotel-aside' },
	      _react2.default.createElement(
	        'a',
	        { className: 'item', href: 'javascript:void(0)', onClick: this.toggleLonLat },
	        _react2.default.createElement(
	          'div',
	          { className: 'address' },
	          _react2.default.createElement('i', { className: 'left-icon hotel-icon icon-location3 cicon-gray' }),
	          _react2.default.createElement(
	            'span',
	            null,
	            this.props.detailAddress
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'map fixed-item' },
	          '\u5730\u56FE',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-youyou cicon-gray right-icon' })
	        )
	      )
	    );
	  }
	});
	
	var RoomList = _react2.default.createClass({
	  displayName: 'RoomList',
	
	  getInitialState: function getInitialState() {
	    return {
	      //typeRoom: this.props.roomType
	    };
	  },
	  ToggleClick: function ToggleClick(elem) {
	    // if(elem.open){
	    //     elem.open=false;
	    // }else{
	    //     elem.open=true; 
	    // }
	    // this.setState({});
	    var target = $(event.target);
	    var roomItem = target.closest('.room-item');
	    roomItem.toggleClass('open');
	  },
	  clickToRoom: function clickToRoom(productId) {
	    //与app的交互--跳转到room
	    //jump=/room?productId=123&starttime=2016-09-10&endtime=2016-09-15
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'room',
	      type: "webview",
	      item: "hotel",
	      param: {
	        typeId: "10123",
	        productId: productId,
	        starttime: this.props.starttime,
	        endtime: this.props.endtime
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  gotoLogin: function gotoLogin() {
	    var that = this;
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'login',
	      type: "app",
	      item: "hotel",
	      param: {
	        typeId: "10152"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      that.props.getLogin(data.tokenId);
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    var _this = this;
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-list' },
	      $.map(this.props.roomType, function (elem, index) {
	        return _react2.default.createElement(
	          'div',
	          { id: 'roomlist_' + index, key: index, className: index == 0 ? 'room-item open' : 'room-item' },
	          _react2.default.createElement(
	            'div',
	            { className: 'room-info clearfix' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'media pull-left', to: { pathname: "/roominfo", query: { productId: elem.hotelProduct[0].productId, starttime: this.props.starttime, endtime: this.props.endtime } } },
	              _react2.default.createElement(
	                'div',
	                { className: 'media-left pull-left' },
	                _react2.default.createElement('img', { className: 'media-object', src: !!elem.picurl ? elem.picurl.split(',')[0] : '' })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'media-body' },
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  elem.roomTypeName
	                ),
	                _react2.default.createElement(
	                  'p',
	                  { className: 'size' },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    elem.buildingArea,
	                    'm',
	                    _react2.default.createElement(
	                      'sup',
	                      null,
	                      '2'
	                    )
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'room-book absolute-middle', onClick: this.ToggleClick.bind(this, elem) },
	              _react2.default.createElement(
	                'div',
	                { className: 'price' },
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'currency' },
	                    '\uFFE5'
	                  ),
	                  _react2.default.createElement(
	                    'strong',
	                    null,
	                    elem.stattprice
	                  ),
	                  '\u8D77'
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'absolute-middle' },
	                _react2.default.createElement('i', { className: 'hotel-icon icon-up' }),
	                _react2.default.createElement('i', { className: 'hotel-icon icon-down' })
	              )
	            )
	          ),
	          $.map(elem.hotelProduct, function (item, num) {
	            return _react2.default.createElement(
	              'div',
	              { key: num, className: 'sub-room padding-inner clearfix' },
	              _react2.default.createElement(
	                'div',
	                { className: 'media pull-left', onClick: this.clickToRoom.bind(this, item.productId) },
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: { pathname: "/room", query: { productId: item.productId, starttime: this.props.starttime, endtime: this.props.endtime } } },
	                    item.productName
	                  )
	                ),
	                _react2.default.createElement(
	                  'p',
	                  { className: 'size cicon-gray' },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    item.includingbreakfastNane == "不含" ? "无早" : item.includingbreakfastNane,
	                    ' ',
	                    elem.bedType
	                  )
	                ),
	                _react2.default.createElement(
	                  'p',
	                  { className: 'size black' },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    item.refundPolicyName,
	                    '  ',
	                    item.refundRuleName
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'room-book clearfix absolute-middle' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'price-box' },
	                  _react2.default.createElement(
	                    'p',
	                    { className: 'price' },
	                    _react2.default.createElement(
	                      'span',
	                      { className: 'currency' },
	                      '\uFFE5'
	                    ),
	                    _react2.default.createElement(
	                      'strong',
	                      null,
	                      item.productPrice
	                    )
	                  ),
	                  _react2.default.createElement(
	                    'p',
	                    { className: 'size' },
	                    ' '
	                  )
	                ),
	                item.issell == 1 ? _react2.default.createElement(
	                  'div',
	                  { className: 'order-btn yellow-btn' },
	                  this.props.isLogin ? _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: { pathname: "/order/" + _common2.default.location.queryHash().split("/")[2] + "/" + elem.roomTypeId + "/" + item.productId, query: { starttime: this.props.starttime, endtime: this.props.endtime } } },
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u9884\u8BA2'
	                    ),
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u5728\u7EBF\u652F\u4ED8'
	                    )
	                  ) : _react2.default.createElement(
	                    'a',
	                    { href: 'javascript:void(0)', onClick: this.gotoLogin },
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u9884\u8BA2'
	                    ),
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u5728\u7EBF\u652F\u4ED8'
	                    )
	                  )
	                ) : _react2.default.createElement(
	                  'div',
	                  { className: 'order-btn gray-btn' },
	                  _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u8BA2\u5B8C'
	                    ),
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      '\u5728\u7EBF\u652F\u4ED8'
	                    )
	                  )
	                )
	              )
	            );
	          }.bind(_this))
	        );
	      }.bind(this))
	    );
	  }
	});
	
	var RoomFilter = _react2.default.createClass({
	  displayName: 'RoomFilter',
	
	  getInitialState: function getInitialState() {
	    return {
	      hotelid: null,
	      startM: "",
	      startD: "",
	      endM: "",
	      endD: "",
	      dDay: 0,
	      roomType: []
	    };
	  },
	  setCalandar: function setCalandar(obj) {
	    var st = obj.starttime;
	    var et = obj.endtime;
	
	    var id = _common2.default.location.queryHash().split("/")[2];
	    if (!st || !et) {
	      return false;
	    }
	    var day = _common2.default.date.gitDiffDay(et, st);
	    this.setState({
	      hotelid: id,
	      startM: st.split("-")[1],
	      startD: st.split("-")[2],
	      endM: et.split("-")[1],
	      endD: et.split("-")[2],
	      dDay: day
	    });
	    this.getRoomtype(id, st, et);
	  },
	  componentDidMount: function componentDidMount() {
	    var obj = {};
	    obj.starttime = this.props.starttime;
	    obj.endtime = this.props.endtime;
	    this.setCalandar(obj);
	  },
	  getRoomtype: function getRoomtype(hotelid, starttime, endtime) {
	    var _this = this;
	    $.post('/getapphotelroomtype', { hotelId: hotelid, startDate: starttime, endDate: endtime }, function (data) {
	      var roomlist = data.data.roomType;
	      if (this.isMounted()) {
	        this.setState({
	          roomType: roomlist
	        });
	      }
	    }.bind(_this));
	  },
	  handerClick: function handerClick() {
	    //var jump=location.origin+location.pathname+"#/calendar?starttime="+this.state.starttime+"&endtime="+this.state.endtime;
	    //与app的交互
	    var _this = this;
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'calendar',
	      type: "webview",
	      item: "hotel",
	      param: {
	        typeId: "10122",
	        starttime: this.props.starttime,
	        endtime: this.props.endtime
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      var st = data.starttime;
	      var et = data.endtime;
	      var day = _common2.default.date.gitDiffDay(et, st);
	      _this.setState({
	        starttime: st,
	        endtime: et,
	        startM: st.split("-")[1],
	        startD: st.split("-")[2],
	        endM: et.split("-")[1],
	        endD: et.split("-")[2],
	        dDay: day
	      });
	      _this.props.getTime(st, et);
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'room-filter' },
	        _react2.default.createElement(
	          'div',
	          { className: 'rdate item', onClick: this.handerClick },
	          _react2.default.createElement(
	            'div',
	            { className: 'rdate-calendar' },
	            _react2.default.createElement('i', { className: 'cicon-gray left-icon  hotel-icon icon-calendar' }),
	            this.state.startM,
	            '\u6708',
	            this.state.startD,
	            '\u65E5-',
	            this.state.endM,
	            '\u6708',
	            this.state.endD,
	            '\u65E5'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'rdate-result fixed-item' },
	            _react2.default.createElement(
	              'span',
	              null,
	              '\u5171',
	              this.state.dDay,
	              '\u5929'
	            ),
	            _react2.default.createElement('i', { className: 'hotel-icon icon-youyou cicon-gray right-icon' })
	          )
	        )
	      ),
	      _react2.default.createElement(RoomList, { isLogin: this.props.isLogin, roomType: this.state.roomType, starttime: this.props.starttime, endtime: this.props.endtime, hotelname: this.props.hotelname, getLogin: this.props.getLogin })
	    );
	  }
	});
	
	var HotelDetail = _react2.default.createClass({
	  displayName: 'HotelDetail',
	
	  getInitialState: function getInitialState() {
	    return {
	      hotelname: '',
	      star: '',
	      commentSum: '',
	      commentavg: '',
	      hotelHeadPic: '',
	      hotelPic: '',
	      sheshi: [],
	      roomType: [],
	      hotelId: '',
	      lon: '',
	      lat: '',
	      detailAddress: '',
	      price: '',
	      one: false,
	      isLogin: false,
	      isCollection: '',
	      starttime: _common2.default.location.queryKey('starttime'),
	      endtime: _common2.default.location.queryKey('endtime')
	    };
	  },
	  getLogin: function getLogin(id) {
	    this.setState({
	      isLogin: !!id ? true : false
	    });
	  },
	  getTime: function getTime(start, end) {
	    this.setState({
	      starttime: start,
	      endtime: end
	    });
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (!this.state.one) {
	      $.post('/getapphotelroomtype', { hotelId: _common2.default.location.queryHash().split("/")[2], startDate: this.state.starttime, endDate: this.state.endtime }, function (data) {
	
	        var stattprice = !!data.data.roomType.length ? data.data.roomType[0].stattprice : '';
	        if (this.isMounted()) {
	          this.setState({
	            price: stattprice,
	            one: true
	          });
	        }
	        //与app的交互 categoryId:7=>酒店收藏
	        var that = this;
	        var requestHybrid = {
	          tagname: 'forward',
	          topage: 'title',
	          type: "native",
	          param: {
	            typeId: "c10101",
	            title: this.state.hotelname,
	            currentData: _common2.default.date.getCurrentdate(),
	            imgUrl: this.state.hotelHeadPic,
	            price: stattprice,
	            productId: _common2.default.location.queryHash().split("/")[2],
	            categoryId: "7",
	            isCollection: this.state.isCollection
	          }
	        };
	        var native_callback = function native_callback(data) {
	          var data = JSON.parse(data);
	          data = data.param;
	          that.getLogin(data.tokenId);
	        };
	        _common2.default.bridge(native_callback, requestHybrid);
	      }.bind(this));
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    var tokenId = _common2.default.getCookie('tokenId');
	    $.post('/gethotelbasisinfo', { id: _common2.default.location.queryHash().split("/")[2], userId: _common2.default.getCookie('userId') }, function (data) {
	      var data = data.data;
	      if (this.isMounted()) {
	        this.setState({
	          hotelname: data.hotelName,
	          star: data.hotelClassName,
	          commentSum: data.commentNum,
	          commentavg: data.hotelScore,
	          hotelHeadPic: data.hotelHeadPic,
	          hotelPic: data.hotelPicNum,
	          //sheshi: data.Services.Service,  //todo酒店设施没有返回
	          //roomType: data.roomType,
	          hotelId: data.hotelId,
	          lon: !!data.location ? data.location.lon : '',
	          lat: !!data.location ? data.location.lat : '',
	          detailAddress: data.detailAddress,
	          isLogin: !!tokenId ? true : false,
	          isCollection: data.iscollection
	        });
	      }
	    }.bind(this));
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'hotel-info-inner' },
	      _react2.default.createElement(HotelIntro, { commentSum: this.state.commentSum, commentavg: this.state.commentavg, hotelHeadPic: this.state.hotelHeadPic, hotelPic: this.state.hotelPic, hotelId: this.state.hotelId, hotelname: this.state.hotelname, star: this.state.star, starttime: this.state.starttime, endtime: this.state.endtime }),
	      _react2.default.createElement(HotelAside, { lon: this.state.lon, lat: this.state.lat, detailAddress: this.state.detailAddress, hotelname: this.state.hotelname, commentavg: this.state.commentavg, price: this.state.price }),
	      _react2.default.createElement(RoomFilter, { isLogin: this.state.isLogin, getLogin: this.getLogin, getTime: this.getTime, starttime: this.state.starttime, endtime: this.state.endtime })
	    );
	  }
	});
	exports.default = HotelDetail;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SellSheShi = _react2.default.createClass({
	  displayName: 'SellSheShi',
	
	  getInitialState: function getInitialState() {
	    return {
	      limit: 6,
	      more: true
	    };
	  },
	  showMore: function showMore(e) {
	    e.preventDefault();
	    this.setState({
	      more: false,
	      limit: this.props.sheshi.length
	    });
	  },
	  hideMore: function hideMore() {
	    this.setState({
	      limit: 6,
	      more: true
	    });
	  },
	  renderMoreBtn: function renderMoreBtn() {
	    if (!this.state.more) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'more' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.hideMore },
	          '\u6536\u8D77',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-upup right-icon' })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'more' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript: void(0)', onClick: this.showMore },
	        '\u67E5\u770B\u66F4\u591A',
	        _react2.default.createElement('i', { className: 'hotel-icon icon-downdown right-icon' })
	      )
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'sell-hd' },
	      _react2.default.createElement(
	        'h2',
	        null,
	        '\u9152\u5E97\u8BBE\u65BD'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'sell-bd sell-boxshadow' },
	        _react2.default.createElement(
	          'div',
	          { className: 'sell-icon clearfix' },
	          _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement(
	              'b',
	              null,
	              '\u901A\u7528\u8BBE\u65BD\uFF1A'
	            ),
	            this.props.generalFacilitiesName
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement(
	              'b',
	              null,
	              '\u6D3B\u52A8\u8BBE\u65BD\uFF1A'
	            ),
	            this.props.activityFacilitiesName
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement(
	              'b',
	              null,
	              '\u670D\u52A1\u9879\u76EE\u8BBE\u65BD\uFF1A'
	            ),
	            this.props.serviceItemName
	          )
	        )
	      )
	    );
	  }
	});
	var AsideList = _react2.default.createClass({
	  displayName: 'AsideList',
	
	  getInitialState: function getInitialState() {
	    return {
	      one: false,
	      zhoubians: []
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (this.state.one == false) {
	      this.getAround();
	    } else {
	      return;
	    }
	  },
	  getAround: function getAround() {
	    if (!!this.props.lan) {
	      $.post('/getaroundpoilist', { type: 5, longitude: this.props.lon, latitude: this.props.lan, distance: 10, number: 3 }, function (data) {
	        var data = data.data;
	        this.setState({
	          zhoubians: data
	        });
	      }.bind(this));
	      this.setState({
	        one: true
	      });
	    } else {
	      return;
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'sell-boxshadow' },
	      _react2.default.createElement(
	        'ul',
	        null,
	        $.map(this.state.zhoubians, function (elem, index) {
	          return _react2.default.createElement(
	            'li',
	            { key: index, className: 'expand' },
	            _react2.default.createElement(
	              'p',
	              null,
	              _react2.default.createElement(
	                'b',
	                null,
	                elem.name
	              ),
	              _react2.default.createElement(
	                'a',
	                { className: 'pull-right' },
	                _react2.default.createElement('i', { className: 'hotel-icon icon-downdown right-icon cicon-gray icon-youyou' })
	              )
	            ),
	            _react2.default.createElement('p', { className: 'expand-text' })
	          );
	        })
	      )
	    );
	  }
	});
	// var SellAside=React.createClass({
	//   getInitialState: function(){
	//     return {
	//       limit: 3,
	//       showMoreBtn: true,
	//       open: false,
	//       stattprice: ''
	//     }
	//   },
	//   componentDidMount: function(){
	//     $.post('/getapphotelroomtype', {hotelId:hotelid, startDate:starttime, endDate:endtime}, function(data){
	//         var stattprice=!!data.data.roomType.length? data.data.roomType[0].stattprice : '';
	//         if(this.isMounted()){
	//               this.setState({
	//                   stattprice: stattprice
	//               });
	//         }
	
	//     }.bind(this))
	//   },
	//   showMore: function(){
	//     this.setState({
	//       limit: this.props.zhoubian.length,
	//       showMoreBtn: false
	//     });
	//   },
	//   hideMore: function(){
	//     this.setState({
	//       limit: 3,
	//       showMoreBtn: true
	//     });
	//   },
	//   // renderMoreBtn: function(){
	//   //  if(!this.state.showMoreBtn){
	//   //    return (
	//   //        <div className="more">
	//   //          <a href="javascript: void(0)" onClick={this.hideMore}>收起<i className="hotel-icon icon-upup right-icon"></i></a>
	//   //        </div>
	//   //      );
	//   //  }
	//   //  return (
	//   //      <div className="more">
	//   //        <a href="javascript: void(0)" onClick={this.showMore}>查看更多<i className="hotel-icon icon-downdown right-icon"></i></a>
	//   //      </div>
	//   //  );
	//   // },
	//   Togglecollapsed: function(elem){
	//     this.setState({
	//       curItem: elem,
	//       open: !this.state.open
	//     });
	//   },
	//   toggleLonLat: function(){
	//     $.post('/gethotelbasisinfo', {id: hotelid}, function(data){
	//       var data=data;
	//       if(data.code == 1){
	//       //与app的交互
	//        var requestHybrid={
	//           tagname: 'forward',
	//           topage:'detail',
	//           type:"native",
	//           param: {
	//               typeId: "10111",
	//               lon: this.props.lon,
	//               lat: this.props.lat,
	//               detailAddress: data.data.detailAddress,
	//               name: data.data.hotelName,
	//               commentavg: data.data.hotelScore,
	//               stattprice: this.state.stattprice
	//           }
	//        }
	//        var native_callback=function(data){
	
	//        }
	//        uddh5.bridge(native_callback,requestHybrid);
	//       }
	//     }.bind(this))
	//   },
	//   render: function(){
	//     //var zhoubians=this.props.zhoubian.slice(0, this.state.limit);
	//     return (
	//       <div className="sell-hd sell-aside">
	//         <h2>周边信息</h2>
	//         <a className="extra" href="javascript:void(0)" onClick={this.toggleLonLat}>在地图上显示</a>
	//         <AsideList lon={this.props.lon} lan={this.props.lat}/>
	//       </div>
	//     );
	//   }
	// });
	
	var SellJieShao = _react2.default.createClass({
	  displayName: 'SellJieShao',
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'sell-hd' },
	      _react2.default.createElement(
	        'h2',
	        null,
	        '\u9152\u5E97\u4ECB\u7ECD'
	      ),
	      _react2.default.createElement(
	        'span',
	        { className: 'extra' },
	        '\u8054\u7CFB\u9152\u5E97\uFF1A',
	        _react2.default.createElement(
	          'a',
	          { href: "tel:" + this.props.tel },
	          this.props.tel
	        )
	      ),
	      _react2.default.createElement('div', { className: 'sell-bd sell-boxshadow intro', dangerouslySetInnerHTML: { __html: this.props.introduction } })
	    );
	  }
	});
	
	var HotelInfo = _react2.default.createClass({
	  displayName: 'HotelInfo',
	
	  getInitialState: function getInitialState() {
	    return {
	      hotelId: '',
	      lat: '',
	      lon: '',
	      generalFacilitiesName: '',
	      activityFacilitiesName: '',
	      serviceItemName: '',
	      phone: '',
	      introduction: ''
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var hotelid = _common2.default.location.queryHash().split("/")[2];
	    console.log(hotelid);
	    $.post('/gethotelfacinfo', { id: hotelid }, function (data) {
	      var data = data.data;
	      if (this.isMounted()) {
	        this.setState({
	          hotelId: data.hotelId,
	          lat: !!data.location ? data.location.lat : '',
	          lon: !!data.location ? data.location.lon : '',
	          generalFacilitiesName: data.generalFacilitiesName,
	          activityFacilitiesName: data.activityFacilitiesName,
	          serviceItemName: data.serviceItemName,
	          phone: data.phone,
	          introduction: data.introduction
	        });
	      }
	    }.bind(this));
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "c10104",
	        title: "酒店详情"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'hotel-sellp' },
	        _react2.default.createElement(SellSheShi, { generalFacilitiesName: this.state.generalFacilitiesName, activityFacilitiesName: this.state.activityFacilitiesName, serviceItemName: this.state.serviceItemName }),
	        _react2.default.createElement(SellJieShao, { introduction: this.state.introduction, tel: this.state.phone })
	      )
	    );
	  }
	});
	
	exports.default = HotelInfo;

/***/ },
/* 23 */
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
	
	var _alert = __webpack_require__(16);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(52);
	var HotelHeader = _react2.default.createClass({
	  displayName: 'HotelHeader',
	
	  componentDidMount: function componentDidMount() {
	    $.post('/getuuid', function (data) {
	      this.props.getuuid({ uuid: data.data });
	    }.bind(this));
	  },
	  openModal: function openModal() {
	    this.props.openModal();
	  },
	  render: function render() {
	    var starttime = _common2.default.location.queryKey('starttime'),
	        endtime = _common2.default.location.queryKey('endtime'),
	        startM = starttime ? starttime.split("-")[1] : '',
	        startD = starttime ? starttime.split("-")[2] : '',
	        endM = endtime ? endtime.split("-")[1] : '',
	        endD = endtime ? endtime.split("-")[2] : '',
	        dDay = !!starttime && !!endtime ? _common2.default.date.gitDiffDay(endtime, starttime) : '';
	    return _react2.default.createElement(
	      'div',
	      { className: 'order-header' },
	      _react2.default.createElement(
	        'div',
	        { className: 'padding-inner' },
	        _react2.default.createElement(
	          'div',
	          { className: 'room-intro' },
	          _react2.default.createElement(
	            'h2',
	            null,
	            this.props.roomTypeName,
	            ' (',
	            this.props.hotelProduct.productName,
	            ') (',
	            this.props.hotelProduct.includingbreakfastNane == "不含" ? "无早" : this.props.hotelProduct.includingbreakfastNane,
	            ')'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u5165\u4F4F',
	            startM,
	            '\u6708',
	            startD,
	            '\u65E5  \u79BB\u5E97',
	            endM,
	            '\u6708',
	            endD,
	            '  \u5171',
	            dDay,
	            '\u5929'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            this.props.bedType,
	            ' ',
	            this.props.broadBandName,
	            ' ',
	            this.props.hotelProduct.includingbreakfastNane == "不含" ? "无早" : this.props.hotelProduct.includingbreakfastNane
	          ),
	          _react2.default.createElement(
	            'a',
	            { className: 'absolute-middle', href: 'javascript:void(0)', onClick: this.openModal },
	            '\u623F\u578B\u8BE6\u60C5'
	          )
	        )
	      )
	    );
	  }
	});
	var OrderBooker = _react2.default.createClass({
	  displayName: 'OrderBooker',
	
	  getInitialState: function getInitialState() {
	    return {
	      open: false,
	      curItem: '1',
	      checkexNum: 1,
	      rooms: [{
	        name: ""
	      }],
	      tel: "",
	      users: [],
	      telephone: '',
	      quhao: '+86',
	      booker: ''
	    };
	  },
	  toggleClick: function toggleClick() {
	    this.setState({
	      open: !this.state.open
	    });
	  },
	  changeItem: function changeItem(item) {
	    // this.props.getReserveNum({reserveNum: item})
	    // this.setState({
	    //   curItem: item
	    // });
	    // if(item<roomslen){ //del
	    //     this.delRoom(item,roomslen)
	    // }else if(item>roomslen){  //add
	    //     this.addRoom(item,roomslen);
	    // }else{
	    //     return;
	    // }
	    $.post('/checkapphotelresouce', { checkInDate: _common2.default.location.queryKey('starttime'), checkOutDate: _common2.default.location.queryKey('endtime'), resourceId: this.props.resourceId, reserveNum: item + '' }, function (data) {
	      if (data.data == 1) {
	        var roomslen = this.state.rooms.length;
	        this.props.getReserveNum({ reserveNum: item });
	        this.setState({
	          curItem: item
	        });
	        if (item < roomslen) {
	          //del
	          this.delRoom(item, roomslen);
	        } else if (item > roomslen) {
	          //add
	          this.addRoom(item, roomslen);
	        } else {
	          return;
	        }
	      } else {
	        this.props.openAlert('库存不足!');
	      }
	    }.bind(this));
	  },
	  addRoom: function addRoom(item, len) {
	    for (var i = len; i < item; i++) {
	      var obj = { name: "" };
	      this.state.rooms.push(obj);
	    }
	    this.setState({
	      rooms: this.state.rooms
	    });
	  },
	  delRoom: function delRoom(item, len) {
	    for (var i = len; i > item; i--) {
	      this.state.rooms.pop();
	    }
	    this.setState({
	      rooms: this.state.rooms
	    });
	  },
	  concatClick: function concatClick(index) {
	    var self = this;
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10115",
	        index: index
	      }
	    };
	    var native_callback = function native_callback(data) {
	      console.log(data);
	      var data = JSON.parse(data);
	      data = data.param;
	      var users = self.state.users;
	      users[parseInt(data.index)] = data.userName;
	      self.setState({
	        users: users
	      });
	      self.props.getLiveName({ liveName: users });
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  phoneNative: function phoneNative() {
	    var self = this;
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10120"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      self.setState({
	        telephone: data.telephone
	      });
	      self.props.getMobile({ mobile: data.telephone });
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  quhaoNative: function quhaoNative() {
	    var self = this;
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10125"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      self.setState({
	        quhao: data.quhao
	      });
	      self.props.getQuhao({ quhao: data.quhao });
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  bookerChange: function bookerChange(index, event) {
	    var users = this.state.users;
	    users[parseInt(index)] = event.target.value;
	    this.setState({
	      users: users
	    });
	    this.props.getLiveName({ liveName: users });
	  },
	  mobileChange: function mobileChange(event) {
	    this.setState({
	      telephone: event.target.value
	    });
	    this.props.getMobile({ mobile: event.target.value });
	  },
	  render: function render() {
	    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	    return _react2.default.createElement(
	      'div',
	      { className: 'order-booker form-section' },
	      _react2.default.createElement(
	        'div',
	        { className: "roomnum-list-wrapper " + (this.state.open ? 'open' : '') },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group', onClick: this.toggleClick },
	          _react2.default.createElement(
	            'label',
	            { forHtml: 'roomnum' },
	            '\u623F\u95F4\u6570'
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'form-control' },
	            this.state.curItem + '间'
	          ),
	          _react2.default.createElement('i', { className: "hotel-icon pull-right cicon-gray " + (this.state.open ? 'icon-upup' : 'icon-downdown') })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'roomnum-list clearfix' },
	          $.map(nums, function (elem, index) {
	            return _react2.default.createElement(
	              'a',
	              { key: index, href: 'javascript: void(0)', onClick: this.changeItem.bind(this, elem), className: elem == this.state.curItem ? 'active' : '' },
	              _react2.default.createElement(
	                'span',
	                null,
	                elem
	              )
	            );
	          }.bind(this))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'person-group' },
	        _react2.default.createElement(
	          'label',
	          { className: 'absolute-middle', forHtml: 'booker' },
	          '\u5165\u4F4F\u4EBA',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-point cicon-blue hide' })
	        ),
	        $.map(this.state.rooms, function (elem, index) {
	          return _react2.default.createElement(
	            'div',
	            { key: index, className: 'form-group' },
	            _react2.default.createElement('input', { name: 'username', type: 'text', className: 'form-control', placeholder: '\u59D3\u540D\uFF0C1\u95F4\u623F\u586B1\u4E2A\u4EBA', value: this.state.users[index], onChange: this.bookerChange.bind(this, index) }),
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript: void(0)', onClick: this.concatClick.bind(this, index) },
	              _react2.default.createElement('i', { className: 'hotel-icon icon-jiaren right-icon absolute-middle' })
	            )
	          );
	        }.bind(this))
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'form-group phone-group' },
	        _react2.default.createElement(
	          'label',
	          { forHtml: 'bookerphone' },
	          '\u624B\u673A'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'quhao-box', onClick: this.quhaoNative },
	          _react2.default.createElement(
	            'div',
	            { className: 'form-control quhao' },
	            this.state.quhao
	          )
	        ),
	        _react2.default.createElement('input', { name: 'phone', type: 'number', className: 'form-control', placeholder: '\u7528\u4E8E\u63A5\u6536\u901A\u77E5', onChange: this.mobileChange, value: this.state.telephone }),
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.phoneNative },
	          _react2.default.createElement('i', { className: 'hotel-icon icon-book right-icon absolute-middle' })
	        )
	      )
	    );
	  }
	});
	
	var BuChong = _react2.default.createClass({
	  displayName: 'BuChong',
	
	  getInitialState: function getInitialState() {
	    return {
	      yaoqiu: '无'
	    };
	  },
	  toggleNative: function toggleNative() {
	    var self = this;
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10121"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      self.setState({
	        yaoqiu: data.message
	      });
	      self.props.getYaoQiu({ yaoqiu: data.message });
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'buchong form-section' },
	      _react2.default.createElement(
	        'div',
	        { className: 'notice' },
	        _react2.default.createElement(
	          'p',
	          null,
	          _react2.default.createElement(
	            'strong',
	            null,
	            '\u7279\u522B\u63D0\u793A\uFF1A'
	          ),
	          '\u8BE5\u9152\u5E97\u7684\u5165\u4F4F\u65F6\u95F4\u662F14:00\uFF0C\u9000\u623F\u6807\u51C6\u7ED3\u7B97\u65F6\u95F4\u4E3A12:00\u3002\u5982\u63D0\u524D\u5165\u4F4F\u6216\u63A8\u8FDF\u79BB\u5E97\uFF0C\u5747\u9700\u914C\u60C5\u589E\u52A0\u70B9\u8D39\u7528\u3002'
	        )
	      )
	    );
	  }
	});
	var FooterPlaceholer = _react2.default.createClass({
	  displayName: 'FooterPlaceholer',
	
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'footer-placeholder' });
	  }
	});
	
	var RoomBanner = _react2.default.createClass({
	  displayName: 'RoomBanner',
	
	  render: function render() {
	    var imgItems = !!this.props.picurl ? this.props.picurl.split(',') : [];
	    var settings = {
	      dots: true,
	      infinite: true,
	      speed: 1000,
	      arrows: false,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      initialSlide: 0,
	      autoplay: true
	    };
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-banner' },
	      _react2.default.createElement(
	        'div',
	        { className: 'room-img' },
	        _react2.default.createElement(
	          Slider,
	          settings,
	          $.map(imgItems, function (elem, index) {
	            return _react2.default.createElement(
	              'a',
	              { key: index, href: 'javascript: void(0)' },
	              _react2.default.createElement('img', { src: elem })
	            );
	          })
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'line' },
	          '/'
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'indicate' },
	          imgItems.length
	        )
	      ),
	      _react2.default.createElement(
	        'ul',
	        { className: 'statistics clearfix' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '11'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u623F\u578B\u70B9\u8BC4'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '12'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u63A8\u8350'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '13'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u5F85\u6539\u5584'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              imgItems.length
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u6709\u56FE'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	var RoomOffer = _react2.default.createClass({
	  displayName: 'RoomOffer',
	
	  getInitialState: function getInitialState() {
	    return {
	      showMoreBtn: true,
	      limit: 6
	    };
	  },
	  showMore: function showMore(e) {
	    this.setState({
	      showMoreBtn: false,
	      limit: this.state.sheshi
	    });
	  },
	  hideMore: function hideMore() {
	    this.setState({
	      showMoreBtn: true,
	      limit: 6
	    });
	  },
	  renderMoreBtn: function renderMoreBtn() {
	    if (!this.state.showMoreBtn) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'more' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.hideMore },
	          '\u6536\u8D77',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-upup right-icon' })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'more' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript: void(0)', onClick: this.showMore },
	        '\u67E5\u770B\u66F4\u591A\u623F\u578B\u8BBE\u65BD',
	        _react2.default.createElement('i', { className: 'hotel-icon icon-downdown right-icon' })
	      )
	    );
	  },
	  render: function render() {
	    var sheshis = this.props.sheshi.slice(0, this.state.limit);
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-offer' },
	      _react2.default.createElement(
	        'div',
	        { ref: 'roomSheshis', className: 'room-offer-inner' },
	        $.map(sheshis, function (elem, index) {
	          return _react2.default.createElement(
	            'dl',
	            { key: index, className: 'clearfix' },
	            _react2.default.createElement(
	              'dt',
	              null,
	              _react2.default.createElement('i', { className: "hotel-icon left-icon " + elem.icon })
	            ),
	            _react2.default.createElement(
	              'dd',
	              null,
	              elem.text
	            )
	          );
	        })
	      ),
	      this.renderMoreBtn()
	    );
	  }
	});
	var RoomFeedback = _react2.default.createClass({
	  displayName: 'RoomFeedback',
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-feedback' },
	      _react2.default.createElement(
	        'h4',
	        null,
	        _react2.default.createElement('i', { className: 'hotel-icon icon-smile1 left-icon' }),
	        '\u9884\u5B9A\u6EE1\u610F\u5EA692%'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement('i', { className: 'hotel-icon icon-sth left-icon absolute-middle' }),
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u4F1A\u6839\u636E\u4F60\u7684\u62C5\u4FDD\u65B9\u5F0F\uFF0C\u9884\u6388\u6743\u6216\u6682\u65F6\u6263\u9664\uFFE5258\u5143\u7528\u4E8E\u62C5\u4FDD\uFF0C\u8BE5\u8BA2\u5355\u88AB\u786E\u8BA4\u540E\u4E0D\u53EF\u88AB\u53D6\u6D88\u4FEE\u6539\uFF0C\u82E5\u672A\u5165\u4F4F\uFF0C\u62C5\u4FDD\u8D39\u7528\u4E0D\u9000\u8FD8'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement('i', { className: 'hotel-icon icon-ringing left-icon absolute-middle' }),
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u8BE5\u9152\u5E97\u7684\u5165\u4F4F\u65F6\u95F4\u662F',
	            this.props.checkinTime,
	            ',\u9000\u623F\u6807\u51C6\u7ED3\u7B97\u65F6\u95F4\u4E3A',
	            this.props.departureTime,
	            '\u3002\u5982\u63D0\u524D\u5165\u4F4F\u6216\u5EF6\u957F\u9000\u623F\uFF0C\u914C\u60C5\u6536\u5165\u4E00\u5B9A\u8D39\u7528\u3002'
	          )
	        )
	      )
	    );
	  }
	});
	
	var ModalRoom = _react2.default.createClass({
	  displayName: 'ModalRoom',
	
	  closeModal: function closeModal() {
	    console.log(111);
	    this.props.closeModal();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement('div', { className: 'modal-bg', onClick: this.closeModal }),
	      _react2.default.createElement(
	        'div',
	        { className: 'modal', ref: 'modalRoot' },
	        _react2.default.createElement(RoomBanner, { picurl: this.props.picurl }),
	        _react2.default.createElement(RoomOffer, { sheshi: this.props.sheshi }),
	        _react2.default.createElement(RoomFeedback, { checkinTime: this.props.checkinTime, departureTime: this.props.departureTime })
	      )
	    );
	  }
	});
	
	// 费用明细弹框
	var PriceDetail = _react2.default.createClass({
	  displayName: 'PriceDetail',
	
	  getInitialState: function getInitialState() {
	    return {
	      items: []
	    };
	  },
	  closeFeiYong: function closeFeiYong() {
	    this.props.closeFeiYong();
	  },
	  render: function render() {
	    var reserveNums = this.props.reserveNum;
	    var starttime = _common2.default.location.queryKey('starttime'),
	        endtime = _common2.default.location.queryKey('endtime'),
	        dDay = !!starttime && !!endtime ? _common2.default.date.gitDiffDay(endtime, starttime) : '';
	    if (reserveNums <= 0) {
	      return;
	    } else {
	      for (var i = 1; i <= reserveNums; i++) {
	        this.state.items.push(_react2.default.createElement(
	          'li',
	          { key: "feiyon" + i, className: 'clearfix' },
	          _react2.default.createElement(
	            'span',
	            { className: 'pull-left' },
	            '\u8D39\u7528',
	            i
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'pull-right' },
	            _react2.default.createElement(
	              'strong',
	              null,
	              '\uFFE5',
	              this.props.productPrice * dDay
	            ),
	            'x',
	            _react2.default.createElement(
	              'em',
	              null,
	              '1'
	            ),
	            '\u4EBA'
	          )
	        ));
	      }
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'price_detail_cont' },
	      _react2.default.createElement('div', { className: 'shade', onClick: this.closeFeiYong }),
	      _react2.default.createElement(
	        'div',
	        { className: 'price_detail', ref: 'modalRoot' },
	        _react2.default.createElement(
	          'h5',
	          { className: 'titel' },
	          '\u4EF7\u683C\u8BE6\u60C5'
	        ),
	        _react2.default.createElement(
	          'ul',
	          { className: 'price_detail_list' },
	          this.state.items
	        )
	      )
	    );
	  }
	});
	
	var HotelOrder = _react2.default.createClass({
	  displayName: 'HotelOrder',
	
	  getInitialState: function getInitialState() {
	    return {
	      bookMethod: '',
	      reserveNum: "1",
	      liveName: [],
	      mobile: '',
	      yaoqiu: '',
	      roomTypeName: '',
	      hotelProduct: {},
	      bedType: '',
	      broadBandName: '',
	      productPrice: '',
	      issell: '',
	      resourceId: '',
	      orderAmount: '',
	      productName: '',
	      hotelName: '',
	      picurl: '',
	      quhao: '+86',
	      showModal: false,
	      uuid: '',
	      opened: false,
	      sheshi: [],
	      includingbreakfastNane: '',
	      disabled: false,
	      messageShow: false,
	      textMessage: ''
	    };
	  },
	  getReserveNum: function getReserveNum(obj) {
	    if (!obj.reserveNum) {
	      console.log(obj.reserveNum);
	      return;
	    }
	    this.setState({
	      reserveNum: obj.reserveNum
	    });
	  },
	  getLiveName: function getLiveName(obj) {
	    if (!obj.liveName) {
	      return;
	    }
	    this.setState({
	      liveName: obj.liveName.length > this.state.reserveNum ? obj.liveName.splice(this.state.reserveNum) : obj.liveName
	    });
	  },
	  getMobile: function getMobile(obj) {
	    if (!obj.mobile) {
	      return;
	    }
	    this.setState({
	      mobile: obj.mobile
	    });
	  },
	  getYaoQiu: function getYaoQiu(obj) {
	    if (!obj.yaoqiu) {
	      return;
	    }
	    this.setState({
	      yaoqiu: obj.yaoqiu
	    });
	  },
	  getQuhao: function getQuhao(obj) {
	    this.setState({
	      quhao: obj.quhao
	    });
	  },
	  getuuid: function getuuid(obj) {
	    this.setState({
	      uuid: obj.uuid
	    });
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
	    var hotelid = _common2.default.location.queryHash().split('/')[2];
	    var roomid = _common2.default.location.queryHash().split('/')[3];
	    var productid = _common2.default.location.queryHash().split('/')[4];
	    if (this.state.reserveNum == '') {
	      this.openAlert("房间数量不能为空！");
	      return;
	    }
	    if (this.state.liveName == '') {
	      this.openAlert("入住人不能为空！");
	      return;
	    }
	    if ($.grep(this.state.liveName.slice(0, this.state.reserveNum), function (elem, index) {
	      return elem != undefined && elem != '';
	    }).length < this.state.reserveNum) {
	      this.openAlert("入住人不能为空！");
	      return;
	    }
	    if (this.state.mobile == '') {
	      this.openAlert("手机号不能为空！");
	      return;
	    }
	    if (!/^1[0-9]\d{9}$/.test($.trim(this.state.mobile))) {
	      this.openAlert("手机号不合法！");
	      return;
	    }
	    var starttime = _common2.default.location.queryKey('starttime'),
	        endtime = _common2.default.location.queryKey('endtime'),
	        dDay = !!starttime && !!endtime ? _common2.default.date.gitDiffDay(endtime, starttime) : '';
	    var forms = { productId: productid, resourceId: this.state.resourceId, hotelId: hotelid, roomTypeId: roomid, userId: _common2.default.getCookie('userId'), orderAmount: this.state.productPrice * $.trim(this.state.reserveNum) * dDay, payAmount: this.state.productPrice * $.trim(this.state.reserveNum) * dDay, reserveNum: this.state.reserveNum, liveName: this.state.liveName.join(','), mobile: this.state.mobile, checkInDate: starttime, checkOutDate: endtime, email: 'uddtrip@uddtrip.com', productName: this.state.productName, hotelName: this.state.hotelName, roomName: this.state.roomTypeName, uuid: this.state.uuid };
	    console.log(forms);
	    // if(isPay){
	    //   this.togglePayNative();
	    // }else{
	    //   this.toggleNative();
	    // }
	    // /stockType是否现询(1是0不是)
	    $.post("/addapphotelorder", forms, function (data) {
	      this.setState({
	        disabled: true
	      });
	      if (data.code == 1) {
	        var data = data.data;
	        data.stockType == 0 ? this.togglePayNative(data) : this.toggleNative(data);
	      } else {
	        this.openAlert("提交订单失败！");
	      }
	    }.bind(this));
	  },
	
	  //去支付
	  togglePayNative: function togglePayNative(obj) {
	    //与app的交互支付
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10119",
	        stockType: obj.stockType,
	        orderId: obj.productOrderId
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  //去咨询
	  toggleNative: function toggleNative(obj) {
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "10118",
	        stockType: obj.stockType,
	        orderId: obj.productOrderId
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  componentDidMount: function componentDidMount() {
	    var hotelid = _common2.default.location.queryHash().split('/')[2];
	    var roomid = _common2.default.location.queryHash().split('/')[3];
	    var productid = _common2.default.location.queryHash().split('/')[4];
	    var sheshis = [];
	    $.post('/gethotelproductinfo', { hotelId: hotelid, roomTypeId: roomid, productId: productid, startDate: _common2.default.location.queryKey('starttime'), endDate: _common2.default.location.queryKey('endtime') }, function (data) {
	      if (data.code == 1) {
	        var data = data.data;
	        if (!!data.hotelProduct.includingbreakfastNane) {
	          sheshis.push({ text: data.hotelProduct.includingbreakfastNane, icon: "icon-chazi" });
	        }
	        if (!!data.buildingArea) {
	          sheshis.push({ text: data.buildingArea + "平方米", icon: "icon-pingfang" });
	        }
	        if (!!data.maxPerson) {
	          sheshis.push({ text: data.maxPerson, icon: "icon-person" });
	        }
	        if (!!data.isAddBedName) {
	          sheshis.push({ text: data.isAddBedName, icon: "icon-zushu" }); //icon is none
	        }
	        if (!!data.bedSize) {
	          sheshis.push({ text: data.bedSize, icon: "icon-zushu" });
	        }
	        if (!!data.broadBandName) {
	          sheshis.push({ text: data.broadBandName, icon: "icon-wifi" });
	        }
	        if (!!data.bathRoomName) {
	          sheshis.push({ text: data.bathRoomName, icon: "icon-shower" });
	        }
	        if (!!data.foodName) {
	          sheshis.push({ text: data.foodName, icon: "icon-mianfeipingzhuangshui" });
	        }
	        if (!!data.mediaFacilitiesName) {
	          sheshis.push({ text: data.mediaFacilitiesName, icon: "icon-fangjianwifi" });
	        }
	        if (!!data.facilitiesName) {
	          sheshis.push({ text: data.facilitiesName, icon: "icon-110vdianyachazuo" });
	        }
	        if (this.isMounted()) {
	          this.setState({
	            roomTypeName: !!data.roomTypeName.length ? data.roomTypeName : '',
	            hotelProduct: data.hotelProduct,
	            bedType: data.bedType,
	            broadBandName: data.broadBandName,
	            productPrice: data.hotelProduct.productPrice,
	            stockType: data.hotelProduct.stockType,
	            resourceId: data.hotelProduct.resouceId,
	            productName: data.hotelProduct.productName,
	            picurl: data.picurl,
	            hotelName: data.hotelName,
	            issell: data.hotelProduct.issell,
	            checkinTime: data.checkinTime,
	            departureTime: data.departureTime,
	            sheshi: sheshis
	          });
	        }
	      }
	    }.bind(this));
	    //与app的交互
	    var that = this;
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "c10106",
	        title: "酒店订单填写"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  openModal: function openModal() {
	    this.setState({
	      opened: true
	    });
	  },
	  closeModal: function closeModal() {
	    this.setState({
	      opened: false
	    });
	  },
	  openFeiYong: function openFeiYong(e) {
	    $(e.target).addClass('disabled');
	    this.setState({
	      showModal: true
	    });
	  },
	  closeFeiYong: function closeFeiYong() {
	    $(this.refs.feiyongToggle).removeClass('disabled');
	    this.setState({
	      showModal: false
	    });
	  },
	  render: function render() {
	    var stockType = !!this.state.stockType;
	    var starttime = _common2.default.location.queryKey('starttime'),
	        endtime = _common2.default.location.queryKey('endtime'),
	        dDay = !!starttime && !!endtime ? _common2.default.date.gitDiffDay(endtime, starttime) : '';
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(HotelHeader, { roomTypeName: this.state.roomTypeName, hotelProduct: this.state.hotelProduct, bedType: this.state.bedType, broadBandName: this.state.broadBandName, openModal: this.openModal, getuuid: this.getuuid }),
	      _react2.default.createElement(
	        'form',
	        { onSubmit: this.handleSubmit, className: 'hotel-forms-order' },
	        _react2.default.createElement(OrderBooker, { getReserveNum: this.getReserveNum, getLiveName: this.getLiveName, getMobile: this.getMobile, getQuhao: this.getQuhao, resourceId: this.state.resourceId, hotelName: this.state.hotelName, openAlert: this.openAlert }),
	        _react2.default.createElement(BuChong, { getYaoQiu: this.getYaoQiu }),
	        _react2.default.createElement(FooterPlaceholer, null),
	        _react2.default.createElement(
	          'footer',
	          { className: 'clearfix' },
	          _react2.default.createElement(
	            'div',
	            { className: 'total pull-left' },
	            '\u603B\u989D\uFF1A\uFFE5',
	            _react2.default.createElement(
	              'strong',
	              null,
	              this.state.productPrice * $.trim(this.state.reserveNum) * dDay
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'btns pull-right' },
	            _react2.default.createElement(
	              'a',
	              { ref: 'feiyongToggle', href: 'javascript:void(0)', onClick: this.openFeiYong },
	              '\u8D39\u7528\u660E\u7EC6'
	            ),
	            this.state.disabled ? _react2.default.createElement(
	              'button',
	              { className: 'btn btn-orange', type: 'submit', disabled: true, style: { backgroundColor: "#bbb" } },
	              stockType ? '去预定' : '去支付'
	            ) : _react2.default.createElement(
	              'button',
	              { className: 'btn btn-orange', type: 'submit' },
	              stockType ? '去预定' : '去支付'
	            )
	          )
	        )
	      ),
	      this.state.opened ? _react2.default.createElement(ModalRoom, { picurl: this.state.picurl, closeModal: this.closeModal, checkinTime: this.state.checkinTime, sheshi: this.state.sheshi, departureTime: this.state.departureTime }) : '',
	      this.state.showModal ? _react2.default.createElement(PriceDetail, { productPrice: this.state.productPrice, reserveNum: this.state.reserveNum, closeFeiYong: this.closeFeiYong }) : '',
	      this.state.messageShow ? _react2.default.createElement(_alert2.default, { textMessage: this.state.textMessage }) : ''
	    );
	  }
	});
	exports.default = HotelOrder;

/***/ },
/* 24 */
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
	
	var countries = [{
	  "key": "热门",
	  "arrays": [{
	    "country": "中国大陆",
	    "code": "+86"
	  }, {
	    "country": "日本",
	    "code": "+81"
	  }, {
	    "country": "美国",
	    "code": "+1"
	  }, {
	    "country": "韩国",
	    "code": "+82"
	  }, {
	    "country": "澳大利亚",
	    "code": "+61"
	  }, {
	    "country": "新加坡",
	    "code": "+65"
	  }, {
	    "country": "加拿大",
	    "code": "+1"
	  }, {
	    "country": "法国",
	    "code": "+33"
	  }, {
	    "country": "马来西亚",
	    "code": "+60"
	  }, {
	    "country": "俄罗斯",
	    "code": "+7"
	  }, {
	    "country": "德国 ",
	    "code": "+49"
	  }, {
	    "country": "泰国",
	    "code": "+66"
	  }]
	}, {
	  "key": "A",
	  "arrays": [{
	    "country": "阿尔巴尼亚",
	    "code": "+355"
	  }, {
	    "country": "阿尔及利亚",
	    "code": "+213"
	  }, {
	    "country": "阿富汗",
	    "code": "+93"
	  }, {
	    "country": "阿根廷",
	    "code": "+54"
	  }, {
	    "country": "阿拉伯联合酋长国",
	    "code": "+971"
	  }, {
	    "country": "阿曼",
	    "code": "+968"
	  }, {
	    "country": "阿塞拜疆",
	    "code": "+994"
	  }, {
	    "country": "阿森松",
	    "code": "+247"
	  }, {
	    "country": "埃及",
	    "code": "+20"
	  }, {
	    "country": "埃塞俄比亚",
	    "code": "+251"
	  }, {
	    "country": "爱尔兰",
	    "code": "+353"
	  }, {
	    "country": "爱沙尼亚",
	    "code": "+372"
	  }, {
	    "country": "安道尔共和国",
	    "code": "+376"
	  }, {
	    "country": "安哥拉",
	    "code": "+244"
	  }, {
	    "country": "安圭拉岛",
	    "code": "+1264"
	  }, {
	    "country": "安提瓜和巴布达",
	    "code": "+1268"
	  }, {
	    "country": "奥地利",
	    "code": "+43"
	  }, {
	    "country": "澳大利亚",
	    "code": "+61"
	  }, {
	    "country": "澳门",
	    "code": "+853"
	  }]
	}, {
	  "key": "B",
	  "arrays": [{
	    "country": "巴巴多斯",
	    "code": "+1246"
	  }, {
	    "country": "巴布亚新几内亚",
	    "code": "+675"
	  }, {
	    "country": "巴哈马",
	    "code": "+1242"
	  }, {
	    "country": "巴基斯坦",
	    "code": "+92"
	  }, {
	    "country": "巴拉圭",
	    "code": "+595"
	  }, {
	    "country": "巴林",
	    "code": "+973"
	  }, {
	    "country": "巴拿马",
	    "code": "+507"
	  }, {
	    "country": "巴西",
	    "code": "+55"
	  }, {
	    "country": "白俄罗斯",
	    "code": "+375"
	  }, {
	    "country": "百慕大群岛",
	    "code": "+1441"
	  }, {
	    "country": "保加利亚",
	    "code": "+359"
	  }, {
	    "country": "贝宁",
	    "code": "+229"
	  }, {
	    "country": "比利时",
	    "code": "+32"
	  }, {
	    "country": "冰岛",
	    "code": "+354"
	  }, {
	    "country": "波多黎各",
	    "code": "+1787"
	  }, {
	    "country": "波兰",
	    "code": "+48"
	  }, {
	    "country": "玻利维亚",
	    "code": "+591"
	  }, {
	    "country": "伯利兹",
	    "code": "+501"
	  }, {
	    "country": "博茨瓦纳",
	    "code": "+267"
	  }, {
	    "country": "布基纳法索",
	    "code": "+226"
	  }, {
	    "country": "布隆迪",
	    "code": "+257"
	  }]
	}, {
	  "key": "C",
	  "arrays": [{
	    "country": "朝鲜",
	    "code": "+850"
	  }]
	}, {
	  "key": "D",
	  "arrays": [{
	    "country": "丹麦",
	    "code": "+45"
	  }, {
	    "country": "德国",
	    "code": "+49"
	  }, {
	    "country": "东萨摩亚(美)",
	    "code": "+684"
	  }, {
	    "country": "多哥",
	    "code": "+228"
	  }, {
	    "country": "多米尼加共和国",
	    "code": "+1890"
	  }]
	}, {
	  "key": "E",
	  "arrays": [{
	    "country": "俄罗斯",
	    "code": "+7"
	  }, {
	    "country": "厄瓜多尔",
	    "code": "+593"
	  }]
	}, {
	  "key": "F",
	  "arrays": [{
	    "country": "法国",
	    "code": "+33"
	  }, {
	    "country": "法属玻利尼西亚",
	    "code": "+689"
	  }, {
	    "country": "法属圭亚那",
	    "code": "+594"
	  }, {
	    "country": "菲律宾",
	    "code": "+63"
	  }, {
	    "country": "斐济",
	    "code": "+679"
	  }, {
	    "country": "芬兰",
	    "code": "+358"
	  }]
	}, {
	  "key": "G",
	  "arrays": [{
	    "country": "冈比亚",
	    "code": "+220"
	  }, {
	    "country": "刚果",
	    "code": "+242"
	  }, {
	    "country": "哥伦比亚",
	    "code": "+57"
	  }, {
	    "country": "哥斯达黎加",
	    "code": "+506"
	  }, {
	    "country": "格林纳达",
	    "code": "+1809"
	  }, {
	    "country": "格鲁吉亚",
	    "code": "+995"
	  }, {
	    "country": "古巴",
	    "code": "+53"
	  }, {
	    "country": "关岛",
	    "code": "+1671"
	  }, {
	    "country": "圭亚那",
	    "code": "+592"
	  }]
	}, {
	  "key": "H",
	  "arrays": [{
	    "country": "哈萨克斯坦",
	    "code": "+327"
	  }, {
	    "country": "海地",
	    "code": "+509"
	  }, {
	    "country": "韩国",
	    "code": "+82"
	  }, {
	    "country": "荷兰",
	    "code": "+31"
	  }, {
	    "country": "荷属安的列斯",
	    "code": "+599"
	  }, {
	    "country": "洪都拉斯",
	    "code": "+504"
	  }]
	}, {
	  "key": "J",
	  "arrays": [{
	    "country": "吉布提",
	    "code": "+253"
	  }, {
	    "country": "吉尔吉斯坦",
	    "code": "+331"
	  }, {
	    "country": "几内亚",
	    "code": "+224"
	  }, {
	    "country": "加拿大",
	    "code": "+1"
	  }, {
	    "country": "加纳",
	    "code": "+233"
	  }, {
	    "country": "加蓬",
	    "code": "+241"
	  }, {
	    "country": "柬埔寨",
	    "code": "+855"
	  }, {
	    "country": "捷克",
	    "code": "+420"
	  }, {
	    "country": "津巴布韦",
	    "code": "+263"
	  }]
	}, {
	  "key": "K",
	  "arrays": [{
	    "country": "喀麦隆",
	    "code": "+237"
	  }, {
	    "country": "卡塔尔",
	    "code": "+974"
	  }, {
	    "country": "开曼群岛",
	    "code": "+1345"
	  }, {
	    "country": "科特迪瓦",
	    "code": "+225"
	  }, {
	    "country": "科威特",
	    "code": "+965"
	  }, {
	    "country": "肯尼亚",
	    "code": "+254"
	  }, {
	    "country": "库克群岛",
	    "code": "+682"
	  }]
	}, {
	  "key": "L",
	  "arrays": [{
	    "country": "拉脱维亚",
	    "code": "+371"
	  }, {
	    "country": "莱索托",
	    "code": "+266"
	  }, {
	    "country": "老挝",
	    "code": "+856"
	  }, {
	    "country": "黎巴嫩",
	    "code": "+961"
	  }, {
	    "country": "立陶宛",
	    "code": "+370"
	  }, {
	    "country": "利比里亚",
	    "code": "+231"
	  }, {
	    "country": "利比亚",
	    "code": "+218"
	  }, {
	    "country": "列支敦士登",
	    "code": "+423"
	  }, {
	    "country": "留尼旺",
	    "code": "+262"
	  }, {
	    "country": "卢森堡",
	    "code": "+352"
	  }, {
	    "country": "罗马尼亚",
	    "code": "+40"
	  }]
	}, {
	  "key": "M",
	  "arrays": [{
	    "country": "马达加斯加",
	    "code": "+261"
	  }, {
	    "country": "马尔代夫",
	    "code": "+960"
	  }, {
	    "country": "马耳他",
	    "code": "+356"
	  }, {
	    "country": "马拉维",
	    "code": "+265"
	  }, {
	    "country": "马来西亚",
	    "code": "+60"
	  }, {
	    "country": "马里",
	    "code": "+223"
	  }, {
	    "country": "马里亚那群岛",
	    "code": "+1670"
	  }, {
	    "country": "马提尼克",
	    "code": "+596"
	  }, {
	    "country": "毛里求斯",
	    "code": "+230"
	  }, {
	    "country": "美国",
	    "code": "+1"
	  }, {
	    "country": "蒙古",
	    "code": "+976"
	  }, {
	    "country": "蒙特塞拉特岛",
	    "code": "+1664"
	  }, {
	    "country": "孟加拉国",
	    "code": "+880"
	  }, {
	    "country": "秘鲁",
	    "code": "+51"
	  }, {
	    "country": "缅甸",
	    "code": "+95"
	  }, {
	    "country": "摩尔多瓦",
	    "code": "+373"
	  }, {
	    "country": "摩洛哥",
	    "code": "+212"
	  }, {
	    "country": "摩纳哥",
	    "code": "+377"
	  }, {
	    "country": "莫桑比克",
	    "code": "+258"
	  }, {
	    "country": "墨西哥",
	    "code": "+52"
	  }]
	}, {
	  "key": "N",
	  "arrays": [{
	    "country": "纳米比亚",
	    "code": "+264"
	  }, {
	    "country": "南非",
	    "code": "+27"
	  }, {
	    "country": "南斯拉夫",
	    "code": "+381"
	  }, {
	    "country": "瑙鲁",
	    "code": "+674"
	  }, {
	    "country": "尼泊尔",
	    "code": "+977"
	  }, {
	    "country": "尼加拉瓜",
	    "code": "+505"
	  }, {
	    "country": "尼日尔",
	    "code": "+227"
	  }, {
	    "country": "尼日利亚",
	    "code": "+234"
	  }, {
	    "country": "挪威",
	    "code": "+47"
	  }]
	}, {
	  "key": "P",
	  "arrays": [{
	    "country": "葡萄牙",
	    "code": "+351"
	  }]
	}, {
	  "key": "R",
	  "arrays": [{
	    "country": "日本",
	    "code": "+81"
	  }, {
	    "country": "瑞典",
	    "code": "+46"
	  }, {
	    "country": "瑞士",
	    "code": "+41"
	  }]
	}, {
	  "key": "S",
	  "arrays": [{
	    "country": "萨尔瓦多",
	    "code": "+503"
	  }, {
	    "country": "塞拉利昂",
	    "code": "+232"
	  }, {
	    "country": "塞内加尔",
	    "code": "+221"
	  }, {
	    "country": "塞浦路斯",
	    "code": "+357"
	  }, {
	    "country": "塞舌尔",
	    "code": "+248"
	  }, {
	    "country": "沙特阿拉伯",
	    "code": "+966"
	  }, {
	    "country": "圣多美和普林西比",
	    "code": "+239"
	  }, {
	    "country": "圣卢西亚",
	    "code": "+1758"
	  }, {
	    "country": "圣马力诺",
	    "code": "+378"
	  }, {
	    "country": "圣文森特",
	    "code": "+1784"
	  }, {
	    "country": "圣文森特岛",
	    "code": "+1784"
	  }, {
	    "country": "斯里兰卡",
	    "code": "+94"
	  }, {
	    "country": "斯洛伐克",
	    "code": "+421"
	  }, {
	    "country": "斯洛文尼亚",
	    "code": "+386"
	  }, {
	    "country": "斯威士兰",
	    "code": "+268"
	  }, {
	    "country": "苏丹",
	    "code": "+249"
	  }, {
	    "country": "苏里南",
	    "code": "+597"
	  }, {
	    "country": "所罗门群岛",
	    "code": "+677"
	  }, {
	    "country": "索马里",
	    "code": "+252"
	  }]
	}, {
	  "key": "T",
	  "arrays": [{
	    "country": "塔吉克斯坦",
	    "code": "+992"
	  }, {
	    "country": "台湾省",
	    "code": "+886"
	  }, {
	    "country": "泰国",
	    "code": "+66"
	  }, {
	    "country": "坦桑尼亚",
	    "code": "+255"
	  }, {
	    "country": "汤加",
	    "code": "+676"
	  }, {
	    "country": "特立尼达和多巴哥",
	    "code": "+1809"
	  }, {
	    "country": "突尼斯",
	    "code": "+216"
	  }, {
	    "country": "土耳其",
	    "code": "+90"
	  }, {
	    "country": "土库曼斯坦",
	    "code": "+993"
	  }]
	}, {
	  "key": "W",
	  "arrays": [{
	    "country": "危地马拉",
	    "code": "+502"
	  }, {
	    "country": "委内瑞拉",
	    "code": "+58"
	  }, {
	    "country": "文莱",
	    "code": "+673"
	  }, {
	    "country": "乌干达",
	    "code": "+256"
	  }, {
	    "country": "乌克兰",
	    "code": "+380"
	  }, {
	    "country": "乌拉圭",
	    "code": "+598"
	  }, {
	    "country": "乌兹别克斯坦",
	    "code": "+233"
	  }]
	}, {
	  "key": "X",
	  "arrays": [{
	    "country": "西班牙",
	    "code": "+34"
	  }, {
	    "country": "西萨摩亚",
	    "code": "+685"
	  }, {
	    "country": "希腊",
	    "code": "+30"
	  }, {
	    "country": "香港",
	    "code": "+852"
	  }, {
	    "country": "新加坡",
	    "code": "+65"
	  }, {
	    "country": "新西兰",
	    "code": "+64"
	  }, {
	    "country": "匈牙利",
	    "code": "+36"
	  }, {
	    "country": "叙利亚",
	    "code": "+963"
	  }]
	}, {
	  "key": "Y",
	  "arrays": [{
	    "country": "牙买加",
	    "code": "+1876"
	  }, {
	    "country": "亚美尼亚",
	    "code": "+374"
	  }, {
	    "country": "也门",
	    "code": "+967"
	  }, {
	    "country": "伊拉克",
	    "code": "+964"
	  }, {
	    "country": "伊朗",
	    "code": "+98"
	  }, {
	    "country": "以色列",
	    "code": "+972"
	  }, {
	    "country": "意大利",
	    "code": "+39"
	  }, {
	    "country": "印度",
	    "code": "+91"
	  }, {
	    "country": "印度尼西亚",
	    "code": "+62"
	  }, {
	    "country": "英国",
	    "code": "+44"
	  }, {
	    "country": "约旦",
	    "code": "+962"
	  }, {
	    "country": "越南",
	    "code": "+84"
	  }]
	}, {
	  "key": "Z",
	  "arrays": [{
	    "country": "赞比亚",
	    "code": "+260"
	  }, {
	    "country": "扎伊尔",
	    "code": "+243"
	  }, {
	    "country": "乍得",
	    "code": "+235"
	  }, {
	    "country": "直布罗陀",
	    "code": "+350"
	  }, {
	    "country": "智利",
	    "code": "+56"
	  }, {
	    "country": "中非共和国",
	    "code": "+236"
	  }, {
	    "country": "中国大陆",
	    "code": "+86"
	  }]
	}];
	var CountryList = _react2.default.createClass({
	  displayName: 'CountryList',
	
	  getInitialState: function getInitialState() {
	    return {
	      quhao: ''
	    };
	  },
	  quhaoNative: function quhaoNative(code) {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      item: "hotel",
	      param: {
	        typeId: "10124",
	        quhao: code
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    var arrays = this.props.arrays;
	    return _react2.default.createElement(
	      'ul',
	      { className: 'country-list' },
	      $.map(arrays, function (elem, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: 'country' + index, onClick: this.quhaoNative.bind(this, elem.code) },
	          elem.country,
	          _react2.default.createElement(
	            'div',
	            { className: 'absolute-middle country-code' },
	            elem.code
	          )
	        );
	      }.bind(this))
	    );
	  }
	});
	var Countries = _react2.default.createClass({
	  displayName: 'Countries',
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      $.map(this.props.countries, function (elem, index) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'padding-inner item', key: 'label' + index },
	          _react2.default.createElement(
	            'h2',
	            null,
	            _react2.default.createElement(
	              'a',
	              { id: "key" + index },
	              elem.key
	            )
	          ),
	          _react2.default.createElement(CountryList, { key: 'countrylist' + index, arrays: elem.arrays })
	        );
	      }.bind(this))
	    );
	  }
	});
	var JianSuoAside = _react2.default.createClass({
	  displayName: 'JianSuoAside',
	
	  scrollTarget: function scrollTarget(index) {
	    var top = $('#key' + index).offset().top;
	    $(window).scrollTop(top);
	  },
	  showSearchBox: function showSearchBox() {
	    this.props.toggleSearchbox();
	  },
	  render: function render() {
	    var capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
	    return _react2.default.createElement(
	      'div',
	      { className: 'absolute-middle jiansuo-aside' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.showSearchBox },
	        _react2.default.createElement('i', { className: 'hotel-icon icon-search' })
	      ),
	      $.map(capitalLetters, function (elem, index) {
	        return _react2.default.createElement(
	          'a',
	          { id: 'letter_' + (index + 1), href: 'javascript:void(0)', key: 'letter' + index, onClick: this.scrollTarget.bind(this, index + 1) },
	          elem
	        );
	      }.bind(this))
	    );
	  }
	});
	
	var SearchList = _react2.default.createClass({
	  displayName: 'SearchList',
	
	  render: function render() {
	    var countries = this.props.countries.slice(1);
	    return _react2.default.createElement(
	      'div',
	      { className: 'searchlist' },
	      $.map(countries, function (elem, index) {
	        var arrays = $.grep(elem.arrays, function (element) {
	          return element.country.indexOf(this.props.filterText) > -1;
	        }.bind(this));
	        return _react2.default.createElement(
	          'div',
	          { className: 'padding-inner item', key: 'label' + index },
	          _react2.default.createElement(CountryList, { key: 'countrylist' + index, arrays: arrays })
	        );
	      }.bind(this))
	    );
	  }
	});
	
	var SearchBar = _react2.default.createClass({
	  displayName: 'SearchBar',
	
	  componentDidMount: function componentDidMount() {
	    this.refs.filterTextInput.focus();
	  },
	  handleChange: function handleChange() {
	    this.props.onUserInput(this.refs.filterTextInput.value);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'search-box' },
	      _react2.default.createElement('i', { className: 'hotel-icon icon-search absolute-middle' }),
	      _react2.default.createElement('input', { type: 'search', ref: 'filterTextInput', onChange: this.handleChange, placeholder: '\u8F93\u5165\u56FD\u5BB6\u540D\u79F0', value: this.props.filterText })
	    );
	  }
	});
	
	var UddQuhao = _react2.default.createClass({
	  displayName: 'UddQuhao',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      countries: countries
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      shown: false,
	      filterText: ''
	    };
	  },
	  handleUserInput: function handleUserInput(filterText) {
	    this.setState({
	      filterText: filterText
	    });
	  },
	  shown: function shown() {
	    this.setState({
	      shown: true
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'order',
	      type: "native",
	      param: {
	        typeId: "c10123",
	        title: "选择国家或地区区号"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'quhao-component' },
	      this.state.shown ? _react2.default.createElement(SearchBar, { filterText: this.state.filterText, onUserInput: this.handleUserInput }) : '',
	      !!this.state.filterText ? _react2.default.createElement(SearchList, { countries: this.props.countries, filterText: this.state.filterText }) : _react2.default.createElement(Countries, { countries: this.props.countries }),
	      _react2.default.createElement(JianSuoAside, { toggleSearchbox: this.shown })
	    );
	  }
	});
	exports.default = UddQuhao;

/***/ },
/* 25 */
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
	
	var _reactSlick = __webpack_require__(8);
	
	var _reactSlick2 = _interopRequireDefault(_reactSlick);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FooterPlaceholer = _react2.default.createClass({
	  displayName: 'FooterPlaceholer',
	
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'footer-placeholder' });
	  }
	});
	
	var RoomBanner = _react2.default.createClass({
	  displayName: 'RoomBanner',
	
	  render: function render() {
	    var total = this.props.imgItems.length;
	    var settings = {
	      customPaging: function customPaging(i) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'indicate' },
	          i + 1 + ' / ' + total
	        );
	      },
	      dots: true,
	      infinite: true,
	      speed: 1000,
	      arrows: false,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      initialSlide: 0,
	      autoplay: true
	    };
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-banner' },
	      _react2.default.createElement(
	        'div',
	        { className: 'room-img' },
	        !!this.props.imgItems ? _react2.default.createElement(
	          _reactSlick2.default,
	          settings,
	          $.map(this.props.imgItems, function (elem, index) {
	            return _react2.default.createElement(
	              'a',
	              { key: index, href: 'javascript: void(0)' },
	              _react2.default.createElement('img', { src: elem })
	            );
	          })
	        ) : ''
	      ),
	      _react2.default.createElement(
	        'ul',
	        { className: 'statistics clearfix' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '0'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u623F\u578B\u70B9\u8BC4'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '11'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u63A8\u8350'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              '11'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u5F85\u6539\u5584'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'p',
	              null,
	              this.props.imgItems.length
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              '\u6709\u56FE'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	var RoomOffer = _react2.default.createClass({
	  displayName: 'RoomOffer',
	
	  getInitialState: function getInitialState() {
	    return {
	      showMoreBtn: true,
	      limit: 6
	    };
	  },
	  showMore: function showMore(e) {
	    this.setState({
	      showMoreBtn: false,
	      limit: this.state.sheshi
	    });
	  },
	  hideMore: function hideMore() {
	    this.setState({
	      showMoreBtn: true,
	      limit: 6
	    });
	  },
	  renderMoreBtn: function renderMoreBtn() {
	    if (!this.state.showMoreBtn) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'more' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.hideMore },
	          '\u6536\u8D77',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-upup right-icon' })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'more' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript: void(0)', onClick: this.showMore },
	        '\u67E5\u770B\u66F4\u591A\u623F\u578B\u8BBE\u65BD',
	        _react2.default.createElement('i', { className: 'hotel-icon icon-downdown right-icon' })
	      )
	    );
	  },
	  render: function render() {
	    var sheshis = this.props.sheshi.slice(0, this.state.limit);
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-offer' },
	      _react2.default.createElement(
	        'div',
	        { ref: 'roomSheshis', className: 'room-offer-inner' },
	        $.map(sheshis, function (elem, index) {
	          return _react2.default.createElement(
	            'dl',
	            { key: index, className: 'clearfix' },
	            _react2.default.createElement(
	              'dt',
	              null,
	              _react2.default.createElement('i', { className: "hotel-icon left-icon " + elem.icon })
	            ),
	            _react2.default.createElement(
	              'dd',
	              null,
	              elem.text
	            )
	          );
	        })
	      ),
	      this.renderMoreBtn()
	    );
	  }
	});
	
	var RoomFeedback = _react2.default.createClass({
	  displayName: 'RoomFeedback',
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-feedback' },
	      _react2.default.createElement(
	        'h4',
	        null,
	        _react2.default.createElement('i', { className: 'hotel-icon icon-smile1 left-icon' }),
	        '\u9884\u5B9A\u6EE1\u610F\u5EA692%'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement('i', { className: 'hotel-icon icon-sth left-icon absolute-middle' }),
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u4F1A\u6839\u636E\u4F60\u7684\u62C5\u4FDD\u65B9\u5F0F\uFF0C\u9884\u6388\u6743\u6216\u6682\u65F6\u6263\u9664\uFFE5258\u5143\u7528\u4E8E\u62C5\u4FDD\uFF0C\u8BE5\u8BA2\u5355\u88AB\u786E\u8BA4\u540E\u4E0D\u53EF\u88AB\u53D6\u6D88\u4FEE\u6539\uFF0C\u82E5\u672A\u5165\u4F4F\uFF0C\u62C5\u4FDD\u8D39\u7528\u4E0D\u9000\u8FD8'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement('i', { className: 'hotel-icon icon-ringing left-icon absolute-middle' }),
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u8BE5\u9152\u5E97\u7684\u5165\u4F4F\u65F6\u95F4\u662F',
	            this.props.checkinTime,
	            ',\u9000\u623F\u6807\u51C6\u7ED3\u7B97\u65F6\u95F4\u4E3A',
	            this.props.departureTime,
	            '\u3002\u5982\u63D0\u524D\u5165\u4F4F\u6216\u5EF6\u957F\u9000\u623F\uFF0C\u914C\u60C5\u6536\u5165\u4E00\u5B9A\u8D39\u7528\u3002'
	          )
	        )
	      )
	    );
	  }
	});
	
	var Footer = _react2.default.createClass({
	  displayName: 'Footer',
	
	  gotoLogin: function gotoLogin() {
	    var that = this;
	    var requestHybrid = {
	      tagname: 'jump',
	      topage: 'login',
	      type: "app",
	      item: "hotel",
	      param: {
	        typeId: "10152"
	      }
	    };
	    var native_callback = function native_callback(data) {
	      var data = JSON.parse(data);
	      data = data.param;
	      that.props.getLogin(data.tokenId);
	    };
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  handleClick: function handleClick(e) {
	    console.log(this.props.issell);
	    if (!this.props.isLogin && this.props.issell != 0) {
	      e.preventDefault();
	      this.gotoLogin();
	    } else if (this.props.issell == 0) {
	      e.preventDefault();
	    }
	  },
	  render: function render() {
	    var starttime = _common2.default.location.queryKey('starttime');
	    var endtime = _common2.default.location.queryKey('endtime');
	    var dDay = !!starttime && !!endtime ? _common2.default.date.gitDiffDay(endtime, starttime) : '';
	    return _react2.default.createElement(
	      'footer',
	      { className: 'clearfix' },
	      _react2.default.createElement(
	        'div',
	        { className: 'total pull-left' },
	        '\u603B\u989D\uFF1A\uFFE5',
	        _react2.default.createElement(
	          'strong',
	          null,
	          this.props.productPrice * dDay
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'btns pull-right' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { onClick: this.handleClick, className: "btn" + (this.props.issell == 0 ? " " + "gary" : ""), to: { pathname: "/order/" + this.props.hotelId + "/" + this.props.roomTypeId + "/" + this.props.productId, query: { starttime: _common2.default.location.queryKey('starttime'), endtime: _common2.default.location.queryKey('endtime') } } },
	          this.props.issell == 0 ? "订完" : "去预订"
	        )
	      )
	    );
	  }
	});
	
	var Room = _react2.default.createClass({
	  displayName: 'Room',
	
	  getInitialState: function getInitialState() {
	    return {
	      isLogin: false,
	      hotelId: null,
	      roomTypeId: null,
	      productId: null,
	      name: '',
	      imgItems: '',
	      awards: {
	        dianping: 0,
	        tuijian: 0,
	        gaishan: 0
	      },
	      sheshi: [],
	      facilities: [],
	      checkinTime: "",
	      departureTime: "",
	      productName: "",
	      productPrice: null,
	      issell: 0,
	      includingbreakfastNane: ''
	    };
	  },
	  getLogin: function getLogin(id) {
	    this.setState({
	      isLogin: !!id ? true : false
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    var proid = _common2.default.location.queryKey("productId");
	    var st = _common2.default.location.queryKey("starttime");
	    var et = _common2.default.location.queryKey("endtime");
	    var tokenId = _common2.default.getCookie('tokenId');
	    var sheshis = [];
	    $.post('/gethotelproductinfo', { productId: proid, startDate: st, endDate: et }, function (data) {
	      var data = data.data;
	      console.log(data);
	      if (!!data.hotelProduct.includingbreakfastNane) {
	        sheshis.push({ text: data.hotelProduct.includingbreakfastNane, icon: "icon-chazi" });
	      }
	      if (!!data.buildingArea) {
	        sheshis.push({ text: data.buildingArea + "平方米", icon: "icon-pingfang" });
	      }
	      if (!!data.maxPerson) {
	        sheshis.push({ text: data.maxPerson, icon: "icon-person" });
	      }
	      if (!!data.isAddBedName) {
	        sheshis.push({ text: data.isAddBedName, icon: "icon-zushu" }); //icon is none
	      }
	      if (!!data.bedSize) {
	        sheshis.push({ text: data.bedSize, icon: "icon-zushu" });
	      }
	      if (!!data.broadBandName) {
	        sheshis.push({ text: data.broadBandName, icon: "icon-wifi" });
	      }
	      if (!!data.bathRoomName) {
	        sheshis.push({ text: data.bathRoomName, icon: "icon-shower" });
	      }
	      if (!!data.foodName) {
	        sheshis.push({ text: data.foodName, icon: "icon-mianfeipingzhuangshui" });
	      }
	      if (!!data.mediaFacilitiesName) {
	        sheshis.push({ text: data.mediaFacilitiesName, icon: "icon-fangjianwifi" });
	      }
	      if (!!data.facilitiesName) {
	        sheshis.push({ text: data.facilitiesName, icon: "icon-110vdianyachazuo" });
	      }
	      if (this.isMounted()) {
	        this.setState({
	          isLogin: !!tokenId ? true : false,
	          hotelId: data.hotelId,
	          roomTypeId: data.roomTypeId,
	          productId: proid,
	          imgItems: data.picurl == null ? '' : data.picurl.split(","),
	          productName: data.roomTypeName,
	          productPrice: data.hotelProduct.productPrice,
	          issell: data.hotelProduct.issell,
	          sheshi: sheshis,
	          checkinTime: data.checkinTime,
	          departureTime: data.departureTime
	        });
	        //与app的交互
	        var requestHybrid = {
	          tagname: 'forward',
	          topage: 'detail',
	          type: "native",
	          param: {
	            typeId: "c10105",
	            title: this.state.productName
	          }
	        };
	        var native_callback = function native_callback(data) {};
	        _common2.default.bridge(native_callback, requestHybrid);
	      }
	    }.bind(this));
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(RoomBanner, { imgItems: this.state.imgItems, awards: this.state.awards }),
	      _react2.default.createElement(RoomOffer, { sheshi: this.state.sheshi, includingbreakfastNane: this.state.includingbreakfastNane }),
	      _react2.default.createElement(RoomFeedback, { checkinTime: this.state.checkinTime, departureTime: this.state.departureTime }),
	      _react2.default.createElement(FooterPlaceholer, null),
	      _react2.default.createElement(Footer, { productPrice: this.state.productPrice, issell: this.state.issell, hotelId: this.state.hotelId, roomTypeId: this.state.roomTypeId, productId: this.state.productId, isLogin: this.state.isLogin, getLogin: this.getLogin })
	    );
	  }
	});
	
	exports.default = Room;

/***/ },
/* 26 */
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
	
	var _reactSlick = __webpack_require__(8);
	
	var _reactSlick2 = _interopRequireDefault(_reactSlick);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FooterPlaceholer = _react2.default.createClass({
	  displayName: 'FooterPlaceholer',
	
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'footer-placeholder' });
	  }
	});
	
	var RoomBanner = _react2.default.createClass({
	  displayName: 'RoomBanner',
	
	  render: function render() {
	    var total = this.props.imgItems.length;
	    var settings = {
	      customPaging: function customPaging(i) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'indicate' },
	          i + 1 + ' / ' + total
	        );
	      },
	      dots: true,
	      infinite: true,
	      speed: 1000,
	      arrows: false,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      initialSlide: 0,
	      autoplay: true
	    };
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-banner' },
	      _react2.default.createElement(
	        'div',
	        { className: 'room-img' },
	        !!this.props.imgItems ? _react2.default.createElement(
	          _reactSlick2.default,
	          settings,
	          $.map(this.props.imgItems, function (elem, index) {
	            return _react2.default.createElement(
	              'a',
	              { key: index, href: 'javascript: void(0)' },
	              _react2.default.createElement('img', { src: elem })
	            );
	          })
	        ) : ''
	      )
	    );
	  }
	});
	
	var RoomOffer = _react2.default.createClass({
	  displayName: 'RoomOffer',
	
	  getInitialState: function getInitialState() {
	    return {
	      showMoreBtn: true,
	      limit: 6
	    };
	  },
	  showMore: function showMore(e) {
	    this.setState({
	      showMoreBtn: false,
	      limit: this.state.sheshi
	    });
	  },
	  hideMore: function hideMore() {
	    this.setState({
	      showMoreBtn: true,
	      limit: 6
	    });
	  },
	  renderMoreBtn: function renderMoreBtn() {
	    if (!this.state.showMoreBtn) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'more' },
	        _react2.default.createElement(
	          'a',
	          { href: 'javascript: void(0)', onClick: this.hideMore },
	          '\u6536\u8D77',
	          _react2.default.createElement('i', { className: 'hotel-icon icon-upup right-icon' })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'more' },
	      _react2.default.createElement(
	        'a',
	        { href: 'javascript: void(0)', onClick: this.showMore },
	        '\u67E5\u770B\u66F4\u591A\u623F\u578B\u8BBE\u65BD',
	        _react2.default.createElement('i', { className: 'hotel-icon icon-downdown right-icon' })
	      )
	    );
	  },
	  render: function render() {
	    var sheshis = this.props.sheshi.slice(0, this.state.limit);
	    return _react2.default.createElement(
	      'div',
	      { className: 'room-offer room_info' },
	      _react2.default.createElement(
	        'div',
	        { ref: 'roomSheshis', className: 'room-offer-inner' },
	        $.map(sheshis, function (elem, index) {
	          return _react2.default.createElement(
	            'dl',
	            { key: index, className: 'clearfix' },
	            _react2.default.createElement(
	              'dt',
	              null,
	              _react2.default.createElement('i', { className: "hotel-icon left-icon " + elem.icon })
	            ),
	            _react2.default.createElement(
	              'dd',
	              null,
	              elem.text
	            )
	          );
	        })
	      ),
	      this.renderMoreBtn()
	    );
	  }
	});
	
	var Footer = _react2.default.createClass({
	  displayName: 'Footer',
	
	  componentDidMount: function componentDidMount() {},
	  render: function render() {
	    return _react2.default.createElement(
	      'footer',
	      { className: 'clearfix' },
	      _react2.default.createElement(
	        'div',
	        { className: 'total pull-left' },
	        '\u603B\u989D\uFF1A\uFFE5',
	        _react2.default.createElement(
	          'strong',
	          null,
	          this.props.productPrice
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'btns pull-right' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { className: 'btn btn-orange', to: { pathname: "/order", query: { hotelId: 123, roomId: 2 } } },
	          '\u53BB\u9884\u8BA2'
	        )
	      )
	    );
	  }
	});
	
	var RoomInfo = _react2.default.createClass({
	  displayName: 'RoomInfo',
	
	  getInitialState: function getInitialState() {
	    return {
	      name: '',
	      imgItems: '',
	      awards: {
	        dianping: 0,
	        tuijian: 0,
	        gaishan: 0
	      },
	      sheshi: [],
	      facilities: [],
	      checkinTime: "",
	      departureTime: "",
	      productName: "",
	      productPrice: null,
	      issell: 0,
	      includingbreakfastNane: ''
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var proid = _common2.default.location.queryKey("productId");
	    var st = _common2.default.location.queryKey("starttime");
	    var et = _common2.default.location.queryKey("endtime");
	    var sheshis = [];
	    $.post('/gethotelproductinfo', { productId: proid, startDate: st, endDate: et }, function (data) {
	      var data = data.data;
	      console.log(data);
	      if (!!data.hotelProduct.includingbreakfastNane) {
	        sheshis.push({ text: data.hotelProduct.includingbreakfastNane, icon: "icon-chazi" });
	      }
	      if (!!data.buildingArea) {
	        sheshis.push({ text: data.buildingArea + "平方米", icon: "icon-pingfang" });
	      }
	      if (!!data.maxPerson) {
	        sheshis.push({ text: data.maxPerson, icon: "icon-person" });
	      }
	      if (!!data.isAddBedName) {
	        sheshis.push({ text: data.isAddBedName, icon: "icon-zushu" }); //icon is none
	      }
	      if (!!data.bedSize) {
	        sheshis.push({ text: data.bedSize, icon: "icon-zushu" });
	      }
	      if (!!data.broadBandName) {
	        sheshis.push({ text: data.broadBandName, icon: "icon-wifi" });
	      }
	      if (!!data.bathRoomName) {
	        sheshis.push({ text: data.bathRoomName, icon: "icon-shower" });
	      }
	      if (!!data.foodName) {
	        sheshis.push({ text: data.foodName, icon: "icon-mianfeipingzhuangshui" });
	      }
	      if (!!data.mediaFacilitiesName) {
	        sheshis.push({ text: data.mediaFacilitiesName, icon: "icon-fangjianwifi" });
	      }
	      if (!!data.facilitiesName) {
	        sheshis.push({ text: data.facilitiesName, icon: "icon-110vdianyachazuo" });
	      }
	      if (this.isMounted()) {
	        this.setState({
	          imgItems: data.picurl == null ? '' : data.picurl.split(","),
	          productName: data.roomTypeName,
	          productPrice: data.hotelProduct.productPrice,
	          issell: data.hotelProduct.issell,
	          sheshi: sheshis,
	          checkinTime: data.checkinTime,
	          departureTime: data.departureTime
	        });
	        //与app的交互
	        var requestHybrid = {
	          tagname: 'forward',
	          topage: 'detail',
	          type: "native",
	          param: {
	            typeId: "c10105",
	            title: this.state.productName
	          }
	        };
	        var native_callback = function native_callback(data) {};
	        _common2.default.bridge(native_callback, requestHybrid);
	      }
	    }.bind(this));
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(RoomBanner, { imgItems: this.state.imgItems, awards: this.state.awards }),
	      _react2.default.createElement(RoomOffer, { sheshi: this.state.sheshi, includingbreakfastNane: this.state.includingbreakfastNane })
	    );
	  }
	});
	
	exports.default = RoomInfo;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _common = __webpack_require__(2);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var XingCheng = _react2.default.createClass({
	  displayName: 'XingCheng',
	
	  toggleNative: function toggleNative() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "10117",
	        text: "游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址",
	        url: "http://m.uddctrip.com/app/"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'trip-share' },
	      _react2.default.createElement(
	        'h2',
	        null,
	        '\u884C\u7A0B\u4FE1\u606F'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          { className: 'item' },
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u65C5\u884C\u5BA2\u6237\u7AEF\u5E2E\u6211\u9884\u5B9A\u4E86\u4E0A\u6D77\u5E0C\u5C14\u987F\u9152\u5E97\uFFE5898\u7684\u4E00\u95F4\u4E0A\u5348\u7279\u4EF7\u623F\uFF0C\u53CC\u65E9\u3002\u5730\u5740\uFF1A\u534E\u5C71\u8DEF888\u53F7 \u65E5\u671F\uFF1A05-26\u81F305-21\u3002\u5FEB\u6765@\u6E38\u5927\u5927\u65C5\u884C \u5F00\u542F\u81EA\u5DF1\u7684\u65C5\u7A0B\u5427\uFF01\u5BA2\u6237\u7AEF\u4E0B\u8F7D\u5730\u5740http://m.uddctrip.com/app/'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'absolute-middle share-btn' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: this.toggleNative },
	              '\u5206\u4EAB'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          { className: 'item' },
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u65C5\u884C\u5BA2\u6237\u7AEF\u5E2E\u6211\u9884\u5B9A\u4E86\u4E0A\u6D77\u5E0C\u5C14\u987F\u9152\u5E97\uFFE5898\u7684\u4E00\u95F4\u4E0A\u5348\u7279\u4EF7\u623F\uFF0C\u53CC\u65E9\u3002\u5730\u5740\uFF1A\u534E\u5C71\u8DEF888\u53F7 \u65E5\u671F\uFF1A05-26\u81F305-21\u3002\u5FEB\u6765@\u6E38\u5927\u5927\u65C5\u884C \u5F00\u542F\u81EA\u5DF1\u7684\u65C5\u7A0B\u5427\uFF01\u5BA2\u6237\u7AEF\u4E0B\u8F7D\u5730\u5740http://m.uddctrip.com/app/'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'absolute-middle share-btn' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: this.toggleNative },
	              '\u5206\u4EAB'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	var JiuDian = _react2.default.createClass({
	  displayName: 'JiuDian',
	
	  toggleNative: function toggleNative() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "10117",
	        text: "游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址",
	        url: "http://m.uddctrip.com/app/"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'trip-share' },
	      _react2.default.createElement(
	        'h2',
	        null,
	        '\u9152\u5E97\u4FE1\u606F'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          { className: 'item' },
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u65C5\u884C\u5BA2\u6237\u7AEF\u5E2E\u6211\u9884\u5B9A\u4E86\u4E0A\u6D77\u5E0C\u5C14\u987F\u9152\u5E97\uFFE5898\u7684\u4E00\u95F4\u4E0A\u5348\u7279\u4EF7\u623F\uFF0C\u53CC\u65E9\u3002\u5730\u5740\uFF1A\u534E\u5C71\u8DEF888\u53F7 \u65E5\u671F\uFF1A05-26\u81F305-21\u3002\u5FEB\u6765@\u6E38\u5927\u5927\u65C5\u884C \u5F00\u542F\u81EA\u5DF1\u7684\u65C5\u7A0B\u5427\uFF01\u5BA2\u6237\u7AEF\u4E0B\u8F7D\u5730\u5740http://m.uddctrip.com/app/'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'absolute-middle share-btn' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: this.toggleNative },
	              '\u5206\u4EAB'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          { className: 'item' },
	          _react2.default.createElement(
	            'p',
	            null,
	            '\u6E38\u5927\u5927\u65C5\u884C\u5BA2\u6237\u7AEF\u5E2E\u6211\u9884\u5B9A\u4E86\u4E0A\u6D77\u5E0C\u5C14\u987F\u9152\u5E97\uFFE5898\u7684\u4E00\u95F4\u4E0A\u5348\u7279\u4EF7\u623F\uFF0C\u53CC\u65E9\u3002\u5730\u5740\uFF1A\u534E\u5C71\u8DEF888\u53F7 \u65E5\u671F\uFF1A05-26\u81F305-21\u3002\u5FEB\u6765@\u6E38\u5927\u5927\u65C5\u884C \u5F00\u542F\u81EA\u5DF1\u7684\u65C5\u7A0B\u5427\uFF01\u5BA2\u6237\u7AEF\u4E0B\u8F7D\u5730\u5740http://m.uddctrip.com/app/'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'absolute-middle share-btn' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: this.toggleNative },
	              '\u5206\u4EAB'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	var HotelShare = _react2.default.createClass({
	  displayName: 'HotelShare',
	
	  componentDidMount: function componentDidMount() {
	    //与app的交互
	    var requestHybrid = {
	      tagname: 'forward',
	      topage: 'detail',
	      type: "native",
	      param: {
	        typeId: "c10107",
	        title: "分享行程"
	      }
	    };
	    var native_callback = function native_callback(data) {};
	    _common2.default.bridge(native_callback, requestHybrid);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(XingCheng, null),
	      _react2.default.createElement(JiuDian, null)
	    );
	  }
	});
	exports.default = HotelShare;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.NextArrow = exports.PrevArrow = undefined;
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var PrevArrow = exports.PrevArrow = _react2.default.createClass({
	  displayName: 'PrevArrow',
	
	  clickHandler: function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  },
	  render: function render() {
	    var prevClasses = { 'slick-arrow': true, 'slick-prev': true };
	    var prevHandler = this.clickHandler.bind(this, { message: 'previous' });
	
	    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
	      prevClasses['slick-disabled'] = true;
	      prevHandler = null;
	    }
	
	    var prevArrowProps = {
	      key: '0',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(prevClasses),
	      style: { display: 'block' },
	      onClick: prevHandler
	    };
	    var prevArrow;
	
	    if (this.props.prevArrow) {
	      prevArrow = _react2.default.cloneElement(this.props.prevArrow, prevArrowProps);
	    } else {
	      prevArrow = _react2.default.createElement('button', _extends({ key: '0', type: 'button' }, prevArrowProps), ' Previous');
	    }
	
	    return prevArrow;
	  }
	});
	
	var NextArrow = exports.NextArrow = _react2.default.createClass({
	  displayName: 'NextArrow',
	
	  clickHandler: function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  },
	  render: function render() {
	    var nextClasses = { 'slick-arrow': true, 'slick-next': true };
	    var nextHandler = this.clickHandler.bind(this, { message: 'next' });
	
	    if (!this.props.infinite) {
	      if (this.props.centerMode && this.props.currentSlide >= this.props.slideCount - 1) {
	        nextClasses['slick-disabled'] = true;
	        nextHandler = null;
	      } else {
	        if (this.props.currentSlide >= this.props.slideCount - this.props.slidesToShow) {
	          nextClasses['slick-disabled'] = true;
	          nextHandler = null;
	        }
	      }
	
	      if (this.props.slideCount <= this.props.slidesToShow) {
	        nextClasses['slick-disabled'] = true;
	        nextHandler = null;
	      }
	    }
	
	    var nextArrowProps = {
	      key: '1',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(nextClasses),
	      style: { display: 'block' },
	      onClick: nextHandler
	    };
	
	    var nextArrow;
	
	    if (this.props.nextArrow) {
	      nextArrow = _react2.default.cloneElement(this.props.nextArrow, nextArrowProps);
	    } else {
	      nextArrow = _react2.default.createElement('button', _extends({ key: '1', type: 'button' }, nextArrowProps), ' Next');
	    }
	
	    return nextArrow;
	  }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Dots = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var getDotCount = function getDotCount(spec) {
	  var dots;
	  dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
	  return dots;
	};
	
	var Dots = exports.Dots = _react2.default.createClass({
	  displayName: 'Dots',
	
	  clickHandler: function clickHandler(options, e) {
	    // In Autoplay the focus stays on clicked button even after transition
	    // to next slide. That only goes away by click somewhere outside
	    e.preventDefault();
	    this.props.clickHandler(options);
	  },
	  render: function render() {
	    var _this = this;
	
	    var dotCount = getDotCount({
	      slideCount: this.props.slideCount,
	      slidesToScroll: this.props.slidesToScroll
	    });
	
	    // Apply join & split to Array to pre-fill it for IE8
	    //
	    // Credit: http://stackoverflow.com/a/13735425/1849458
	    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {
	
	      var leftBound = i * _this.props.slidesToScroll;
	      var rightBound = i * _this.props.slidesToScroll + (_this.props.slidesToScroll - 1);
	      var className = (0, _classnames2.default)({
	        'slick-active': _this.props.currentSlide >= leftBound && _this.props.currentSlide <= rightBound
	      });
	
	      var dotOptions = {
	        message: 'dots',
	        index: i,
	        slidesToScroll: _this.props.slidesToScroll,
	        currentSlide: _this.props.currentSlide
	      };
	
	      return _react2.default.createElement('li', { key: i, className: className }, _react2.default.createElement('button', { onClick: _this.clickHandler.bind(_this, dotOptions) }, i + 1));
	    });
	
	    return _react2.default.createElement('ul', { className: this.props.dotsClass, style: { display: 'block' } }, dots);
	  }
	});

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	var initialState = {
	    animating: false,
	    dragging: false,
	    autoPlayTimer: null,
	    currentDirection: 0,
	    currentLeft: null,
	    currentSlide: 0,
	    direction: 1,
	    // listWidth: null,
	    // listHeight: null,
	    // loadIndex: 0,
	    slideCount: null,
	    slideWidth: null,
	    // sliding: false,
	    // slideOffset: 0,
	    swipeLeft: null,
	    touchObject: {
	        startX: 0,
	        startY: 0,
	        curX: 0,
	        curY: 0
	    },
	
	    lazyLoadedList: [],
	
	    // added for react
	    initialized: false,
	    edgeDragged: false,
	    swiped: false, // used by swipeEvent. differentites between touch and swipe.
	    trackStyle: {},
	    trackWidth: 0
	
	    // Removed
	    // transformsEnabled: false,
	    // $nextArrow: null,
	    // $prevArrow: null,
	    // $dots: null,
	    // $list: null,
	    // $slideTrack: null,
	    // $slides: null,
	};
	
	module.exports = initialState;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.InnerSlider = undefined;
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _eventHandlers = __webpack_require__(32);
	
	var _eventHandlers2 = _interopRequireDefault(_eventHandlers);
	
	var _helpers = __webpack_require__(9);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _initialState = __webpack_require__(30);
	
	var _initialState2 = _interopRequireDefault(_initialState);
	
	var _defaultProps = __webpack_require__(7);
	
	var _defaultProps2 = _interopRequireDefault(_defaultProps);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _track = __webpack_require__(34);
	
	var _dots = __webpack_require__(29);
	
	var _arrows = __webpack_require__(28);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var InnerSlider = exports.InnerSlider = _react2.default.createClass({
	  displayName: 'InnerSlider',
	
	  mixins: [_helpers2.default, _eventHandlers2.default],
	  list: null,
	  track: null,
	  listRefHandler: function listRefHandler(ref) {
	    this.list = ref;
	  },
	  trackRefHandler: function trackRefHandler(ref) {
	    this.track = ref;
	  },
	  getInitialState: function getInitialState() {
	    return _extends({}, _initialState2.default, {
	      currentSlide: this.props.initialSlide
	    });
	  },
	  getDefaultProps: function getDefaultProps() {
	    return _defaultProps2.default;
	  },
	  componentWillMount: function componentWillMount() {
	    if (this.props.init) {
	      this.props.init();
	    }
	    this.setState({
	      mounted: true
	    });
	    var lazyLoadedList = [];
	    for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
	      if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
	        lazyLoadedList.push(i);
	      }
	    }
	
	    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
	      this.setState({
	        lazyLoadedList: lazyLoadedList
	      });
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    // Hack for autoplay -- Inspect Later
	    this.initialize(this.props);
	    this.adaptHeight();
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.onWindowResized);
	    } else {
	      window.attachEvent('onresize', this.onWindowResized);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationEndCallback) {
	      clearTimeout(this.animationEndCallback);
	    }
	    if (window.addEventListener) {
	      window.removeEventListener('resize', this.onWindowResized);
	    } else {
	      window.detachEvent('onresize', this.onWindowResized);
	    }
	    if (this.state.autoPlayTimer) {
	      window.clearInterval(this.state.autoPlayTimer);
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.slickGoTo != nextProps.slickGoTo) {
	      if (process.env.NODE_ENV !== 'production') {
	        console.warn('react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead');
	      }
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.slickGoTo,
	        currentSlide: this.state.currentSlide
	      });
	    } else if (this.state.currentSlide >= nextProps.children.length) {
	      this.update(nextProps);
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.children.length - nextProps.slidesToShow,
	        currentSlide: this.state.currentSlide
	      });
	    } else {
	      this.update(nextProps);
	    }
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.adaptHeight();
	  },
	  onWindowResized: function onWindowResized() {
	    this.update(this.props);
	    // animating state should be cleared while resizing, otherwise autoplay stops working
	    this.setState({
	      animating: false
	    });
	  },
	  slickPrev: function slickPrev() {
	    this.changeSlide({ message: 'previous' });
	  },
	  slickNext: function slickNext() {
	    this.changeSlide({ message: 'next' });
	  },
	  slickGoTo: function slickGoTo(slide) {
	    typeof slide === 'number' && this.changeSlide({
	      message: 'index',
	      index: slide,
	      currentSlide: this.state.currentSlide
	    });
	  },
	  render: function render() {
	    var className = (0, _classnames2.default)('slick-initialized', 'slick-slider', this.props.className);
	
	    var trackProps = {
	      fade: this.props.fade,
	      cssEase: this.props.cssEase,
	      speed: this.props.speed,
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : new Function(),
	      currentSlide: this.state.currentSlide,
	      lazyLoad: this.props.lazyLoad,
	      lazyLoadedList: this.state.lazyLoadedList,
	      rtl: this.props.rtl,
	      slideWidth: this.state.slideWidth,
	      slidesToShow: this.props.slidesToShow,
	      slidesToScroll: this.props.slidesToScroll,
	      slideCount: this.state.slideCount,
	      trackStyle: this.state.trackStyle,
	      variableWidth: this.props.variableWidth
	    };
	
	    var dots;
	
	    if (this.props.dots === true && this.state.slideCount >= this.props.slidesToShow) {
	      var dotProps = {
	        dotsClass: this.props.dotsClass,
	        slideCount: this.state.slideCount,
	        slidesToShow: this.props.slidesToShow,
	        currentSlide: this.state.currentSlide,
	        slidesToScroll: this.props.slidesToScroll,
	        clickHandler: this.changeSlide
	      };
	
	      dots = _react2.default.createElement(_dots.Dots, dotProps);
	    }
	
	    var prevArrow, nextArrow;
	
	    var arrowProps = {
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      currentSlide: this.state.currentSlide,
	      slideCount: this.state.slideCount,
	      slidesToShow: this.props.slidesToShow,
	      prevArrow: this.props.prevArrow,
	      nextArrow: this.props.nextArrow,
	      clickHandler: this.changeSlide
	    };
	
	    if (this.props.arrows) {
	      prevArrow = _react2.default.createElement(_arrows.PrevArrow, arrowProps);
	      nextArrow = _react2.default.createElement(_arrows.NextArrow, arrowProps);
	    }
	
	    var centerPaddingStyle = null;
	
	    if (this.props.vertical === false) {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: '0px ' + this.props.centerPadding
	        };
	      }
	    } else {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: this.props.centerPadding + ' 0px'
	        };
	      }
	    }
	
	    return _react2.default.createElement('div', { className: className, onMouseEnter: this.onInnerSliderEnter, onMouseLeave: this.onInnerSliderLeave }, prevArrow, _react2.default.createElement('div', {
	      ref: this.listRefHandler,
	      className: 'slick-list',
	      style: centerPaddingStyle,
	      onMouseDown: this.swipeStart,
	      onMouseMove: this.state.dragging ? this.swipeMove : null,
	      onMouseUp: this.swipeEnd,
	      onMouseLeave: this.state.dragging ? this.swipeEnd : null,
	      onTouchStart: this.swipeStart,
	      onTouchMove: this.state.dragging ? this.swipeMove : null,
	      onTouchEnd: this.swipeEnd,
	      onTouchCancel: this.state.dragging ? this.swipeEnd : null,
	      onKeyDown: this.props.accessibility ? this.keyHandler : null }, _react2.default.createElement(_track.Track, _extends({ ref: this.trackRefHandler }, trackProps), this.props.children)), nextArrow, dots);
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _trackHelper = __webpack_require__(10);
	
	var _helpers = __webpack_require__(9);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var EventHandlers = {
	  // Event handler for previous and next
	  changeSlide: function changeSlide(options) {
	    var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
	    var _props = this.props;
	    var slidesToScroll = _props.slidesToScroll;
	    var slidesToShow = _props.slidesToShow;
	    var _state = this.state;
	    var slideCount = _state.slideCount;
	    var currentSlide = _state.currentSlide;
	
	    unevenOffset = slideCount % slidesToScroll !== 0;
	    indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;
	
	    if (options.message === 'previous') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
	      targetSlide = currentSlide - slideOffset;
	      if (this.props.lazyLoad) {
	        previousInt = currentSlide - slideOffset;
	        targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
	      }
	    } else if (options.message === 'next') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
	      targetSlide = currentSlide + slideOffset;
	      if (this.props.lazyLoad) {
	        targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
	      }
	    } else if (options.message === 'dots' || options.message === 'children') {
	      // Click on dots
	      targetSlide = options.index * options.slidesToScroll;
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    } else if (options.message === 'index') {
	      targetSlide = parseInt(options.index);
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    }
	
	    this.slideHandler(targetSlide);
	  },
	
	  // Accessiblity handler for previous and next
	  keyHandler: function keyHandler(e) {
	    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
	    if (!e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
	      if (e.keyCode === 37 && this.props.accessibility === true) {
	        this.changeSlide({
	          message: this.props.rtl === true ? 'next' : 'previous'
	        });
	      } else if (e.keyCode === 39 && this.props.accessibility === true) {
	        this.changeSlide({
	          message: this.props.rtl === true ? 'previous' : 'next'
	        });
	      }
	    }
	  },
	  // Focus on selecting a slide (click handler on track)
	  selectHandler: function selectHandler(options) {
	    this.changeSlide(options);
	  },
	  swipeStart: function swipeStart(e) {
	    var touches, posX, posY;
	
	    if (this.props.swipe === false || 'ontouchend' in document && this.props.swipe === false) {
	      return;
	    } else if (this.props.draggable === false && e.type.indexOf('mouse') !== -1) {
	      return;
	    }
	    posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
	    posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
	    this.setState({
	      dragging: true,
	      touchObject: {
	        startX: posX,
	        startY: posY,
	        curX: posX,
	        curY: posY
	      }
	    });
	  },
	  swipeMove: function swipeMove(e) {
	    if (!this.state.dragging) {
	      e.preventDefault();
	      return;
	    }
	    if (this.state.animating) {
	      return;
	    }
	    var swipeLeft;
	    var curLeft, positionOffset;
	    var touchObject = this.state.touchObject;
	
	    curLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: this.state.currentSlide,
	      trackRef: this.track
	    }, this.props, this.state));
	    touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
	    touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
	    touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
	
	    positionOffset = (this.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
	
	    var currentSlide = this.state.currentSlide;
	    var dotCount = Math.ceil(this.state.slideCount / this.props.slidesToScroll);
	    var swipeDirection = this.swipeDirection(this.state.touchObject);
	    var touchSwipeLength = touchObject.swipeLength;
	
	    if (this.props.infinite === false) {
	      if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left') {
	        touchSwipeLength = touchObject.swipeLength * this.props.edgeFriction;
	
	        if (this.state.edgeDragged === false && this.props.edgeEvent) {
	          this.props.edgeEvent(swipeDirection);
	          this.setState({ edgeDragged: true });
	        }
	      }
	    }
	
	    if (this.state.swiped === false && this.props.swipeEvent) {
	      this.props.swipeEvent(swipeDirection);
	      this.setState({ swiped: true });
	    }
	
	    swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    this.setState({
	      touchObject: touchObject,
	      swipeLeft: swipeLeft,
	      trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: swipeLeft }, this.props, this.state))
	    });
	
	    if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
	      return;
	    }
	    if (touchObject.swipeLength > 4) {
	      e.preventDefault();
	    }
	  },
	  swipeEnd: function swipeEnd(e) {
	    if (!this.state.dragging) {
	      e.preventDefault();
	      return;
	    }
	    var touchObject = this.state.touchObject;
	    var minSwipe = this.state.listWidth / this.props.touchThreshold;
	    var swipeDirection = this.swipeDirection(touchObject);
	
	    // reset the state of touch related state variables.
	    this.setState({
	      dragging: false,
	      edgeDragged: false,
	      swiped: false,
	      swipeLeft: null,
	      touchObject: {}
	    });
	    // Fix for #13
	    if (!touchObject.swipeLength) {
	      return;
	    }
	    if (touchObject.swipeLength > minSwipe) {
	      e.preventDefault();
	      if (swipeDirection === 'left') {
	        this.slideHandler(this.state.currentSlide + this.props.slidesToScroll);
	      } else if (swipeDirection === 'right') {
	        this.slideHandler(this.state.currentSlide - this.props.slidesToScroll);
	      } else {
	        this.slideHandler(this.state.currentSlide);
	      }
	    } else {
	      // Adjust the track back to it's original position.
	      var currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, this.props, this.state));
	
	      this.setState({
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state))
	      });
	    }
	  },
	  onInnerSliderEnter: function onInnerSliderEnter(e) {
	    if (this.props.autoplay && this.props.pauseOnHover) {
	      this.pause();
	    }
	  },
	  onInnerSliderLeave: function onInnerSliderLeave(e) {
	    if (this.props.autoplay && this.props.pauseOnHover) {
	      this.autoPlay();
	    }
	  }
	};
	
	exports.default = EventHandlers;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _innerSlider = __webpack_require__(31);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _json2mq = __webpack_require__(11);
	
	var _json2mq2 = _interopRequireDefault(_json2mq);
	
	var _reactResponsiveMixin = __webpack_require__(36);
	
	var _reactResponsiveMixin2 = _interopRequireDefault(_reactResponsiveMixin);
	
	var _defaultProps = __webpack_require__(7);
	
	var _defaultProps2 = _interopRequireDefault(_defaultProps);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var Slider = _react2.default.createClass({
	  displayName: 'Slider',
	
	  mixins: [_reactResponsiveMixin2.default],
	  innerSlider: null,
	  innerSliderRefHandler: function innerSliderRefHandler(ref) {
	    this.innerSlider = ref;
	  },
	  getInitialState: function getInitialState() {
	    return {
	      breakpoint: null
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    if (this.props.responsive) {
	      var breakpoints = this.props.responsive.map(function (breakpt) {
	        return breakpt.breakpoint;
	      });
	      breakpoints.sort(function (x, y) {
	        return x - y;
	      });
	
	      breakpoints.forEach(function (breakpoint, index) {
	        var bQuery;
	        if (index === 0) {
	          bQuery = (0, _json2mq2.default)({ minWidth: 0, maxWidth: breakpoint });
	        } else {
	          bQuery = (0, _json2mq2.default)({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });
	        }
	        _this.media(bQuery, function () {
	          _this.setState({ breakpoint: breakpoint });
	        });
	      });
	
	      // Register media query for full screen. Need to support resize from small to large
	      var query = (0, _json2mq2.default)({ minWidth: breakpoints.slice(-1)[0] });
	
	      this.media(query, function () {
	        _this.setState({ breakpoint: null });
	      });
	    }
	  },
	
	  slickPrev: function slickPrev() {
	    this.innerSlider.slickPrev();
	  },
	
	  slickNext: function slickNext() {
	    this.innerSlider.slickNext();
	  },
	
	  slickGoTo: function slickGoTo(slide) {
	    this.innerSlider.slickGoTo(slide);
	  },
	
	  render: function render() {
	    var _this2 = this;
	
	    var settings;
	    var newProps;
	    if (this.state.breakpoint) {
	      newProps = this.props.responsive.filter(function (resp) {
	        return resp.breakpoint === _this2.state.breakpoint;
	      });
	      settings = newProps[0].settings === 'unslick' ? 'unslick' : (0, _objectAssign2.default)({}, this.props, newProps[0].settings);
	    } else {
	      settings = (0, _objectAssign2.default)({}, _defaultProps2.default, this.props);
	    }
	
	    var children = this.props.children;
	    if (!Array.isArray(children)) {
	      children = [children];
	    }
	
	    // Children may contain false or null, so we should filter them
	    children = children.filter(function (child) {
	      return !!child;
	    });
	
	    if (settings === 'unslick') {
	      // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
	      return _react2.default.createElement('div', null, children);
	    } else {
	      return _react2.default.createElement(_innerSlider.InnerSlider, _extends({ ref: this.innerSliderRefHandler }, settings), children);
	    }
	  }
	});
	
	module.exports = Slider;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Track = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var getSlideClasses = function getSlideClasses(spec) {
	  var slickActive, slickCenter, slickCloned;
	  var centerOffset, index;
	
	  if (spec.rtl) {
	    index = spec.slideCount - 1 - spec.index;
	  } else {
	    index = spec.index;
	  }
	
	  slickCloned = index < 0 || index >= spec.slideCount;
	  if (spec.centerMode) {
	    centerOffset = Math.floor(spec.slidesToShow / 2);
	    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
	    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
	      slickActive = true;
	    }
	  } else {
	    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
	  }
	  return (0, _classnames2.default)({
	    'slick-slide': true,
	    'slick-active': slickActive,
	    'slick-center': slickCenter,
	    'slick-cloned': slickCloned
	  });
	};
	
	var getSlideStyle = function getSlideStyle(spec) {
	  var style = {};
	
	  if (spec.variableWidth === undefined || spec.variableWidth === false) {
	    style.width = spec.slideWidth;
	  }
	
	  if (spec.fade) {
	    style.position = 'relative';
	    style.left = -spec.index * spec.slideWidth;
	    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
	    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	  }
	
	  return style;
	};
	
	var getKey = function getKey(child, fallbackKey) {
	  // key could be a zero
	  return child.key === null || child.key === undefined ? fallbackKey : child.key;
	};
	
	var renderSlides = function renderSlides(spec) {
	  var key;
	  var slides = [];
	  var preCloneSlides = [];
	  var postCloneSlides = [];
	  var count = _react2.default.Children.count(spec.children);
	
	  _react2.default.Children.forEach(spec.children, function (elem, index) {
	    var child = void 0;
	    var childOnClickOptions = {
	      message: 'children',
	      index: index,
	      slidesToScroll: spec.slidesToScroll,
	      currentSlide: spec.currentSlide
	    };
	
	    if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
	      child = elem;
	    } else {
	      child = _react2.default.createElement('div', null);
	    }
	    var childStyle = getSlideStyle((0, _objectAssign2.default)({}, spec, { index: index }));
	    var slickClasses = getSlideClasses((0, _objectAssign2.default)({ index: index }, spec));
	    var cssClasses;
	
	    if (child.props.className) {
	      cssClasses = (0, _classnames2.default)(slickClasses, child.props.className);
	    } else {
	      cssClasses = slickClasses;
	    }
	
	    var onClick = function onClick(e) {
	      child.props && child.props.onClick && child.props.onClick(e);
	      spec.focusOnSelect(childOnClickOptions);
	    };
	
	    slides.push(_react2.default.cloneElement(child, {
	      key: 'original' + getKey(child, index),
	      'data-index': index,
	      className: cssClasses,
	      tabIndex: '-1',
	      style: (0, _objectAssign2.default)({ outline: 'none' }, child.props.style || {}, childStyle),
	      onClick: onClick
	    }));
	
	    // variableWidth doesn't wrap properly.
	    if (spec.infinite && spec.fade === false) {
	      var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;
	
	      if (index >= count - infiniteCount) {
	        key = -(count - index);
	        preCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'precloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }
	
	      if (index < infiniteCount) {
	        key = count + index;
	        postCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'postcloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }
	    }
	  });
	
	  if (spec.rtl) {
	    return preCloneSlides.concat(slides, postCloneSlides).reverse();
	  } else {
	    return preCloneSlides.concat(slides, postCloneSlides);
	  }
	};
	
	var Track = exports.Track = _react2.default.createClass({
	  displayName: 'Track',
	
	  render: function render() {
	    var slides = renderSlides.call(this, this.props);
	    return _react2.default.createElement('div', { className: 'slick-track', style: this.props.trackStyle }, slides);
	  }
	});

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	var camel2hyphen = function camel2hyphen(str) {
	  return str.replace(/[A-Z]/g, function (match) {
	    return '-' + match.toLowerCase();
	  }).toLowerCase();
	};
	
	module.exports = camel2hyphen;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var canUseDOM = __webpack_require__(37);
	var enquire = canUseDOM && __webpack_require__(38);
	var json2mq = __webpack_require__(11);
	
	var ResponsiveMixin = {
	  media: function media(query, handler) {
	    query = json2mq(query);
	    if (typeof handler === 'function') {
	      handler = {
	        match: handler
	      };
	    }
	    canUseDOM && enquire.register(query, handler);
	
	    // Queue the handlers to unregister them at unmount  
	    if (!this._responsiveMediaHandlers) {
	      this._responsiveMediaHandlers = [];
	    }
	    this._responsiveMediaHandlers.push({ query: query, handler: handler });
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._responsiveMediaHandlers) {
	      this._responsiveMediaHandlers.forEach(function (obj) {
	        canUseDOM && enquire.unregister(obj.query, obj.handler);
	      });
	    }
	  }
	};
	
	module.exports = ResponsiveMixin;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	module.exports = canUseDOM;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/*!
	 * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
	 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */
	
	;(function (name, context, factory) {
	    var matchMedia = window.matchMedia;
	
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = factory(matchMedia);
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return context[name] = factory(matchMedia);
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        context[name] = factory(matchMedia);
	    }
	})('enquire', undefined, function (matchMedia) {
	
	    'use strict';
	
	    /*jshint unused:false */
	    /**
	     * Helper function for iterating over a collection
	     *
	     * @param collection
	     * @param fn
	     */
	
	    function each(collection, fn) {
	        var i = 0,
	            length = collection.length,
	            cont;
	
	        for (i; i < length; i++) {
	            cont = fn(collection[i], i);
	            if (cont === false) {
	                break; //allow early exit
	            }
	        }
	    }
	
	    /**
	     * Helper function for determining whether target object is an array
	     *
	     * @param target the object under test
	     * @return {Boolean} true if array, false otherwise
	     */
	    function isArray(target) {
	        return Object.prototype.toString.apply(target) === '[object Array]';
	    }
	
	    /**
	     * Helper function for determining whether target object is a function
	     *
	     * @param target the object under test
	     * @return {Boolean} true if function, false otherwise
	     */
	    function isFunction(target) {
	        return typeof target === 'function';
	    }
	
	    /**
	     * Delegate to handle a media query being matched and unmatched.
	     *
	     * @param {object} options
	     * @param {function} options.match callback for when the media query is matched
	     * @param {function} [options.unmatch] callback for when the media query is unmatched
	     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	     * @constructor
	     */
	    function QueryHandler(options) {
	        this.options = options;
	        !options.deferSetup && this.setup();
	    }
	    QueryHandler.prototype = {
	
	        /**
	         * coordinates setup of the handler
	         *
	         * @function
	         */
	        setup: function setup() {
	            if (this.options.setup) {
	                this.options.setup();
	            }
	            this.initialised = true;
	        },
	
	        /**
	         * coordinates setup and triggering of the handler
	         *
	         * @function
	         */
	        on: function on() {
	            !this.initialised && this.setup();
	            this.options.match && this.options.match();
	        },
	
	        /**
	         * coordinates the unmatch event for the handler
	         *
	         * @function
	         */
	        off: function off() {
	            this.options.unmatch && this.options.unmatch();
	        },
	
	        /**
	         * called when a handler is to be destroyed.
	         * delegates to the destroy or unmatch callbacks, depending on availability.
	         *
	         * @function
	         */
	        destroy: function destroy() {
	            this.options.destroy ? this.options.destroy() : this.off();
	        },
	
	        /**
	         * determines equality by reference.
	         * if object is supplied compare options, if function, compare match callback
	         *
	         * @function
	         * @param {object || function} [target] the target for comparison
	         */
	        equals: function equals(target) {
	            return this.options === target || this.options.match === target;
	        }
	
	    };
	    /**
	     * Represents a single media query, manages it's state and registered handlers for this query
	     *
	     * @constructor
	     * @param {string} query the media query string
	     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	     */
	    function MediaQuery(query, isUnconditional) {
	        this.query = query;
	        this.isUnconditional = isUnconditional;
	        this.handlers = [];
	        this.mql = matchMedia(query);
	
	        var self = this;
	        this.listener = function (mql) {
	            self.mql = mql;
	            self.assess();
	        };
	        this.mql.addListener(this.listener);
	    }
	    MediaQuery.prototype = {
	
	        /**
	         * add a handler for this query, triggering if already active
	         *
	         * @param {object} handler
	         * @param {function} handler.match callback for when query is activated
	         * @param {function} [handler.unmatch] callback for when query is deactivated
	         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	         */
	        addHandler: function addHandler(handler) {
	            var qh = new QueryHandler(handler);
	            this.handlers.push(qh);
	
	            this.matches() && qh.on();
	        },
	
	        /**
	         * removes the given handler from the collection, and calls it's destroy methods
	         * 
	         * @param {object || function} handler the handler to remove
	         */
	        removeHandler: function removeHandler(handler) {
	            var handlers = this.handlers;
	            each(handlers, function (h, i) {
	                if (h.equals(handler)) {
	                    h.destroy();
	                    return !handlers.splice(i, 1); //remove from array and exit each early
	                }
	            });
	        },
	
	        /**
	         * Determine whether the media query should be considered a match
	         * 
	         * @return {Boolean} true if media query can be considered a match, false otherwise
	         */
	        matches: function matches() {
	            return this.mql.matches || this.isUnconditional;
	        },
	
	        /**
	         * Clears all handlers and unbinds events
	         */
	        clear: function clear() {
	            each(this.handlers, function (handler) {
	                handler.destroy();
	            });
	            this.mql.removeListener(this.listener);
	            this.handlers.length = 0; //clear array
	        },
	
	        /*
	         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	         */
	        assess: function assess() {
	            var action = this.matches() ? 'on' : 'off';
	
	            each(this.handlers, function (handler) {
	                handler[action]();
	            });
	        }
	    };
	    /**
	     * Allows for registration of query handlers.
	     * Manages the query handler's state and is responsible for wiring up browser events
	     *
	     * @constructor
	     */
	    function MediaQueryDispatch() {
	        if (!matchMedia) {
	            throw new Error('matchMedia not present, legacy browsers require a polyfill');
	        }
	
	        this.queries = {};
	        this.browserIsIncapable = !matchMedia('only all').matches;
	    }
	
	    MediaQueryDispatch.prototype = {
	
	        /**
	         * Registers a handler for the given media query
	         *
	         * @param {string} q the media query
	         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	         * @param {function} options.match fired when query matched
	         * @param {function} [options.unmatch] fired when a query is no longer matched
	         * @param {function} [options.setup] fired when handler first triggered
	         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	         */
	        register: function register(q, options, shouldDegrade) {
	            var queries = this.queries,
	                isUnconditional = shouldDegrade && this.browserIsIncapable;
	
	            if (!queries[q]) {
	                queries[q] = new MediaQuery(q, isUnconditional);
	            }
	
	            //normalise to object in an array
	            if (isFunction(options)) {
	                options = { match: options };
	            }
	            if (!isArray(options)) {
	                options = [options];
	            }
	            each(options, function (handler) {
	                queries[q].addHandler(handler);
	            });
	
	            return this;
	        },
	
	        /**
	         * unregisters a query and all it's handlers, or a specific handler for a query
	         *
	         * @param {string} q the media query to target
	         * @param {object || function} [handler] specific handler to unregister
	         */
	        unregister: function unregister(q, handler) {
	            var query = this.queries[q];
	
	            if (query) {
	                if (handler) {
	                    query.removeHandler(handler);
	                } else {
	                    query.clear();
	                    delete this.queries[q];
	                }
	            }
	
	            return this;
	        }
	    };
	
	    return new MediaQueryDispatch();
	});

/***/ },
/* 39 */
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
	
	var ansiHTML = __webpack_require__(40);
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
	
	var Entities = __webpack_require__(41).AllHtmlEntities;
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  XmlEntities: __webpack_require__(43),
	  Html4Entities: __webpack_require__(42),
	  Html5Entities: __webpack_require__(12),
	  AllHtmlEntities: __webpack_require__(12)
	};

/***/ },
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(44);
	exports.encode = exports.stringify = __webpack_require__(45);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ansiRegex = __webpack_require__(48)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
		);
	};

/***/ },
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 53 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 55 */
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
	  var querystring = __webpack_require__(46);
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
	  var strip = __webpack_require__(47);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(39);
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
	
	var processUpdate = __webpack_require__(49);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true", __webpack_require__(50)(module)))

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map