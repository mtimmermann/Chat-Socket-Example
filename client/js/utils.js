'use strict';

var app = app || {};
app.utils = app.utils || {};

app.utils = $.extend({},
	(function ($) {

		return {

			/**
			 * Alternative to setTimeout, will execute callback in true time based on a timestamp;
			 * as some browsers timing varies w/ setTimeout
			 * @param {number} interval Time to wait in milliseconds
			 * @param {function} callback() The callback function
			 */
			timeout: function(interval, callback) {
			  var start = Date.now();
			  (function f() {
			  	/*jshint bitwise: false*/
			    var diff = Date.now()-start, ns = (((interval - diff)/1e3)>>0), m = (ns/60)>>0, s = ns-m*60;
			    /*jshint bitwise: true*/
			    //console.log('Callback in '+ m +':'+ ((''+s).length>1?'':'0')+s);
			    if (diff > interval) {
			      callback();
			      return void 0;
			    }
			    //setTimeout(f,1e3);
			    setTimeout(f,10); // Pass the function in to window.setTimeout
			  })();
			},

			// Find the first input to set focus to
			focusFirstInput: function() {
				 $('form:first *:input[type!=hidden]:first').focus();
			}
		};

	}(jQuery))
);