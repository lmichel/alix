// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



// cds namespace

var cds = cds || {};

var A = A || {};
/*
    json2.js
    2012-10-08

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



// log 
Logger = {};

Logger.log = function(action, params) {
    try {
        var logUrl = "//alasky.unistra.fr/cgi/AladinLiteLogger/log.py";
        var paramStr = "";
        if (params) {
            paramStr = JSON.stringify(params);
        }
        
        $.ajax({
            url: logUrl,
            data: {"action": action, "params": paramStr, "pageUrl": window.location.href, "referer": document.referrer ? document.referrer : ""},
            method: 'GET',
            dataType: 'json' // as alasky supports CORS, we do not need JSONP any longer
        });
        
    }
    catch(e) {
        window.console && console.log('Exception: ' + e);
    }

};
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();// stats.js r6 - http://github.com/mrdoob/stats.js
var Stats=function(){function s(a,g,d){var f,c,e;for(c=0;c<30;c++)for(f=0;f<73;f++)e=(f+c*74)*4,a[e]=a[e+4],a[e+1]=a[e+5],a[e+2]=a[e+6];for(c=0;c<30;c++)e=(73+c*74)*4,c<g?(a[e]=b[d].bg.r,a[e+1]=b[d].bg.g,a[e+2]=b[d].bg.b):(a[e]=b[d].fg.r,a[e+1]=b[d].fg.g,a[e+2]=b[d].fg.b)}var r=0,t=2,g,u=0,j=(new Date).getTime(),F=j,v=j,l=0,w=1E3,x=0,k,d,a,m,y,n=0,z=1E3,A=0,f,c,o,B,p=0,C=1E3,D=0,h,i,q,E,b={fps:{bg:{r:16,g:16,b:48},fg:{r:0,g:255,b:255}},ms:{bg:{r:16,g:48,b:16},fg:{r:0,g:255,b:0}},mb:{bg:{r:48,g:16,
b:26},fg:{r:255,g:0,b:128}}};g=document.createElement("div");g.style.cursor="pointer";g.style.width="80px";g.style.opacity="0.9";g.style.zIndex="10001";g.addEventListener("click",function(){r++;r==t&&(r=0);k.style.display="none";f.style.display="none";h.style.display="none";switch(r){case 0:k.style.display="block";break;case 1:f.style.display="block";break;case 2:h.style.display="block"}},!1);k=document.createElement("div");k.style.backgroundColor="rgb("+Math.floor(b.fps.bg.r/2)+","+Math.floor(b.fps.bg.g/
2)+","+Math.floor(b.fps.bg.b/2)+")";k.style.padding="2px 0px 3px 0px";g.appendChild(k);d=document.createElement("div");d.style.fontFamily="Helvetica, Arial, sans-serif";d.style.textAlign="left";d.style.fontSize="9px";d.style.color="rgb("+b.fps.fg.r+","+b.fps.fg.g+","+b.fps.fg.b+")";d.style.margin="0px 0px 1px 3px";d.innerHTML='<span style="font-weight:bold">FPS</span>';k.appendChild(d);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";k.appendChild(a);
m=a.getContext("2d");m.fillStyle="rgb("+b.fps.bg.r+","+b.fps.bg.g+","+b.fps.bg.b+")";m.fillRect(0,0,a.width,a.height);y=m.getImageData(0,0,a.width,a.height);f=document.createElement("div");f.style.backgroundColor="rgb("+Math.floor(b.ms.bg.r/2)+","+Math.floor(b.ms.bg.g/2)+","+Math.floor(b.ms.bg.b/2)+")";f.style.padding="2px 0px 3px 0px";f.style.display="none";g.appendChild(f);c=document.createElement("div");c.style.fontFamily="Helvetica, Arial, sans-serif";c.style.textAlign="left";c.style.fontSize=
"9px";c.style.color="rgb("+b.ms.fg.r+","+b.ms.fg.g+","+b.ms.fg.b+")";c.style.margin="0px 0px 1px 3px";c.innerHTML='<span style="font-weight:bold">MS</span>';f.appendChild(c);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";f.appendChild(a);o=a.getContext("2d");o.fillStyle="rgb("+b.ms.bg.r+","+b.ms.bg.g+","+b.ms.bg.b+")";o.fillRect(0,0,a.width,a.height);B=o.getImageData(0,0,a.width,a.height);try{performance&&performance.memory&&performance.memory.totalJSHeapSize&&
(t=3)}catch(G){}h=document.createElement("div");h.style.backgroundColor="rgb("+Math.floor(b.mb.bg.r/2)+","+Math.floor(b.mb.bg.g/2)+","+Math.floor(b.mb.bg.b/2)+")";h.style.padding="2px 0px 3px 0px";h.style.display="none";g.appendChild(h);i=document.createElement("div");i.style.fontFamily="Helvetica, Arial, sans-serif";i.style.textAlign="left";i.style.fontSize="9px";i.style.color="rgb("+b.mb.fg.r+","+b.mb.fg.g+","+b.mb.fg.b+")";i.style.margin="0px 0px 1px 3px";i.innerHTML='<span style="font-weight:bold">MB</span>';
h.appendChild(i);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";h.appendChild(a);q=a.getContext("2d");q.fillStyle="#301010";q.fillRect(0,0,a.width,a.height);E=q.getImageData(0,0,a.width,a.height);return{domElement:g,update:function(){u++;j=(new Date).getTime();n=j-F;z=Math.min(z,n);A=Math.max(A,n);s(B.data,Math.min(30,30-n/200*30),"ms");c.innerHTML='<span style="font-weight:bold">'+n+" MS</span> ("+z+"-"+A+")";o.putImageData(B,0,0);F=j;if(j>
v+1E3){l=Math.round(u*1E3/(j-v));w=Math.min(w,l);x=Math.max(x,l);s(y.data,Math.min(30,30-l/100*30),"fps");d.innerHTML='<span style="font-weight:bold">'+l+" FPS</span> ("+w+"-"+x+")";m.putImageData(y,0,0);if(t==3)p=performance.memory.usedJSHeapSize*9.54E-7,C=Math.min(C,p),D=Math.max(D,p),s(E.data,Math.min(30,30-p/2),"mb"),i.innerHTML='<span style="font-weight:bold">'+Math.round(p)+" MB</span> ("+Math.round(C)+"-"+Math.round(D)+")",q.putImageData(E,0,0);v=j;u=0}}}};

Constants={},Constants.PI=Math.PI,Constants.C_PR=Math.PI/180,Constants.VLEV=2,Constants.EPS=1e-7,Constants.c=.105,Constants.LN10=Math.log(10),Constants.PIOVER2=Math.PI/2,Constants.TWOPI=2*Math.PI,Constants.TWOTHIRD=2/3,Constants.ARCSECOND_RADIAN=484813681109536e-20,SpatialVector=function(){function t(t,s,i){"use strict";this.x=t,this.y=s,this.z=i,this.ra_=0,this.dec_=0,this.okRaDec_=!1}return t.prototype.setXYZ=function(t,s,i){this.x=t,this.y=s,this.z=i,this.okRaDec_=!1},t.prototype.length=function(){"use strict";return Math.sqrt(this.lengthSquared())},t.prototype.lengthSquared=function(){"use strict";return this.x*this.x+this.y*this.y+this.z*this.z},t.prototype.normalized=function(){"use strict";var t=this.length();this.x/=t,this.y/=t,this.z/=t},t.prototype.set=function(t,s){"use strict";this.ra_=t,this.dec_=s,this.okRaDec_=!0,this.updateXYZ()},t.prototype.angle=function(t){"use strict";var s=this.y*t.z-this.z*t.y,i=this.z*t.x-this.x*t.z,n=this.x*t.y-this.y*t.x,a=Math.sqrt(s*s+i*i+n*n);return Math.abs(Math.atan2(a,dot(t)))},t.prototype.get=function(){"use strict";return[x,y,z]},t.prototype.toString=function(){"use strict";return"SpatialVector["+this.x+", "+this.y+", "+this.z+"]"},t.prototype.cross=function(s){"use strict";return new t(this.y*s.z-s.y*this.z,this.z*s.x-s.z*this.x,this.x*s.y-s.x()*this.y)},t.prototype.equal=function(t){"use strict";return this.x==t.x&&this.y==t.y&&this.z==t.z()?!0:!1},t.prototype.mult=function(s){"use strict";return new t(s*this.x,s*this.y,s*this.z)},t.prototype.dot=function(t){"use strict";return this.x*t.x+this.y*t.y+this.z*t.z},t.prototype.add=function(s){"use strict";return new t(this.x+s.x,this.y+s.y,this.z+s.z)},t.prototype.sub=function(s){"use strict";return new t(this.x-s.x,this.y-s.y,this.z-s.z)},t.prototype.dec=function(){"use strict";return this.okRaDec_||(this.normalized(),this.updateRaDec()),this.dec_},t.prototype.ra=function(){"use strict";return this.okRaDec_||(this.normalized(),this.updateRaDec()),this.ra_},t.prototype.updateXYZ=function(){"use strict";var t=Math.cos(this.dec_*Constants.C_PR);this.x=Math.cos(this.ra_*Constants.C_PR)*t,this.y=Math.sin(this.ra_*Constants.C_PR)*t,this.z=Math.sin(this.dec_*Constants.C_PR)},t.prototype.updateRaDec=function(){"use strict";this.dec_=Math.asin(this.z)/Constants.C_PR;var t=Math.cos(this.dec_*Constants.C_PR);this.ra_=t>Constants.EPS||-Constants.EPS>t?this.y>Constants.EPS||this.y<-Constants.EPS?0>this.y?360-Math.acos(this.x/t)/Constants.C_PR:Math.acos(this.x/t)/Constants.C_PR:0>this.x?180:0:0,this.okRaDec_=!0},t.prototype.toRaRadians=function(){"use strict";var t=0;return(0!=this.x||0!=this.y)&&(t=Math.atan2(this.y,this.x)),0>t&&(t+=2*Math.PI),t},t.prototype.toDeRadians=function(){var t=z/this.length(),s=Math.acos(t);return Math.PI/2-s},t}(),AngularPosition=function(){return AngularPosition=function(t,s){"use strict";this.theta=t,this.phi=s},AngularPosition.prototype.toString=function(){"use strict";return"theta: "+this.theta+", phi: "+this.phi},AngularPosition}(),LongRangeSetBuilder=function(){function t(){this.items=[]}return t.prototype.appendRange=function(t,s){for(var i=t;s>=i;i++)i in this.items||this.items.push(i)},t}(),HealpixIndex=function(){function t(t){"use strict";this.nside=t}return t.NS_MAX=8192,t.ORDER_MAX=13,t.NSIDELIST=[1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192],t.JRLL=[2,2,2,2,3,3,3,3,4,4,4,4],t.JPLL=[1,3,5,7,0,2,4,6,1,3,5,7],t.XOFFSET=[-1,-1,0,1,1,1,0,-1],t.YOFFSET=[0,1,1,1,0,-1,-1,-1],t.FACEARRAY=[[8,9,10,11,-1,-1,-1,-1,10,11,8,9],[5,6,7,4,8,9,10,11,9,10,11,8],[-1,-1,-1,-1,5,6,7,4,-1,-1,-1,-1],[4,5,6,7,11,8,9,10,11,8,9,10],[0,1,2,3,4,5,6,7,8,9,10,11],[1,2,3,0,0,1,2,3,5,6,7,4],[-1,-1,-1,-1,7,4,5,6,-1,-1,-1,-1],[3,0,1,2,3,0,1,2,4,5,6,7],[2,3,0,1,-1,-1,-1,-1,0,1,2,3]],t.SWAPARRAY=[[0,0,0,0,0,0,0,0,3,3,3,3],[0,0,0,0,0,0,0,0,6,6,6,6],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,5,5,5,5],[0,0,0,0,0,0,0,0,0,0,0,0],[5,5,5,5,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[6,6,6,6,0,0,0,0,0,0,0,0],[3,3,3,3,0,0,0,0,0,0,0,0]],t.Z0=Constants.TWOTHIRD,t.prototype.init=function(){"use strict";var s=256;this.ctab=Array(s),this.utab=Array(s);for(var i=0;256>i;++i)this.ctab[i]=1&i|(2&i)<<7|(4&i)>>1|(8&i)<<6|(16&i)>>2|(32&i)<<5|(64&i)>>3|(128&i)<<4,this.utab[i]=1&i|(2&i)<<1|(4&i)<<2|(8&i)<<3|(16&i)<<4|(32&i)<<5|(64&i)<<6|(128&i)<<7;this.nl2=2*this.nside,this.nl3=3*this.nside,this.nl4=4*this.nside,this.npface=this.nside*this.nside,this.ncap=2*this.nside*(this.nside-1),this.npix=12*this.npface,this.fact2=4/this.npix,this.fact1=(this.nside<<1)*this.fact2,this.order=t.nside2order(this.nside)},t.calculateNSide=function(s){for(var i=0,n=s*s,a=180/Constants.PI,e=3600*3600*4*Constants.PI*a*a,h=Utils.castToInt(e/n),r=h/12,o=Math.sqrt(r),c=t.NS_MAX,u=0,p=0;t.NSIDELIST.length>p;p++)if(c>=Math.abs(o-t.NSIDELIST[p])&&(c=Math.abs(o-t.NSIDELIST[p]),i=t.NSIDELIST[p],u=p),o>i&&t.NS_MAX>o&&(i=t.NSIDELIST[u+1]),o>t.NS_MAX)return console.log("nside cannot be bigger than "+t.NS_MAX),t.NS_MAX;return i},t.nside2order=function(s){"use strict";return(s&s-1)>0?-1:Utils.castToInt(t.log2(s))},t.log2=function(t){"use strict";return Math.log(t)/Math.log(2)},t.prototype.ang2pix_nest=function(s,i){"use strict";var n,a,e,h,r,o,c,u,p,l,d,f,I;if(i>=Constants.TWOPI&&(i-=Constants.TWOPI),0>i&&(i+=Constants.TWOPI),s>Constants.PI||0>s)throw{name:"Illegal argument",message:"theta must be between 0 and "+Constants.PI};if(i>Constants.TWOPI||0>i)throw{name:"Illegal argument",message:"phi must be between 0 and "+Constants.TWOPI};if(a=Math.cos(s),e=Math.abs(a),h=i/Constants.PIOVER2,t.Z0>=e){var M=this.nside*(.5+h),y=this.nside*.75*a,u=M-y,p=M+y;o=u>>this.order,c=p>>this.order,d=o==c?4==o?4:o+4:c>o?o:c+8,f=Utils.castToInt(p&this.nside-1),I=Utils.castToInt(this.nside-(u&this.nside-1)-1)}else{l=Utils.castToInt(h),l>=4&&(l=3),r=h-l;var g=this.nside*Math.sqrt(3*(1-e));u=Utils.castToInt(r*g),p=Utils.castToInt((1-r)*g),u=Math.min(t.NS_MAX-1,u),p=Math.min(t.NS_MAX-1,p),a>=0?(d=l,f=Utils.castToInt(this.nside-p-1),I=Utils.castToInt(this.nside-u-1)):(d=l+8,f=u,I=p)}return n=this.xyf2nest(f,I,d)},t.prototype.xyf2nest=function(t,s,i){"use strict";return(i<<2*this.order)+(this.utab[255&t]|this.utab[255&t>>8]<<16|this.utab[255&t>>16]<<32|this.utab[255&t>>24]<<48|this.utab[255&s]<<1|this.utab[255&s>>8]<<17|this.utab[255&s>>16]<<33|this.utab[255&s>>24]<<49)},t.prototype.nest2xyf=function(t){"use strict";var s={};s.face_num=t>>2*this.order;var i=t&this.npface-1,n=(93823560581120&i)>>16|(614882086624428e4&i)>>31|21845&i|(1431633920&i)>>15;return s.ix=this.ctab[255&n]|this.ctab[255&n>>8]<<4|this.ctab[255&n>>16]<<16|this.ctab[255&n>>24]<<20,i>>=1,n=(93823560581120&i)>>16|(614882086624428e4&i)>>31|21845&i|(1431633920&i)>>15,s.iy=this.ctab[255&n]|this.ctab[255&n>>8]<<4|this.ctab[255&n>>16]<<16|this.ctab[255&n>>24]<<20,s},t.prototype.pix2ang_nest=function(s){"use strict";if(0>s||s>this.npix-1)throw{name:"Illegal argument",message:"ipix out of range"};var i,n,a,e=this.nest2xyf(s),h=e.ix,r=e.iy,o=e.face_num,c=(t.JRLL[o]<<this.order)-h-r-1;this.nside>c?(i=c,n=1-i*i*this.fact2,a=0):c>this.nl3?(i=this.nl4-c,n=i*i*this.fact2-1,a=0):(i=this.nside,n=(this.nl2-c)*this.fact1,a=1&c-this.nside);var u=Math.acos(n),p=(t.JPLL[o]*i+h-r+1+a)/2;p>this.nl4&&(p-=this.nl4),1>p&&(p+=this.nl4);var l=(p-.5*(a+1))*(Constants.PIOVER2/i);return{theta:u,phi:l}},t.nside2Npix=function(s){"use strict";if(0>s||(s&-s)!=s||s>t.NS_MAX)throw{name:"Illegal argument",message:"nside should be >0, power of 2, <"+t.NS_MAX};var i=12*s*s;return i},t.prototype.xyf2ring=function(s,i,n){"use strict";var a,e,h,r=t.JRLL[n]*this.nside-s-i-1;this.nside>r?(a=r,h=2*a*(a-1),e=0):r>3*this.nside?(a=this.nl4-r,h=this.npix-2*(a+1)*a,e=0):(a=this.nside,h=this.ncap+(r-this.nside)*this.nl4,e=1&r-this.nside);var o=(t.JPLL[n]*a+s-i+1+e)/2;return o>this.nl4?o-=this.nl4:1>o&&(o+=this.nl4),h+o-1},t.prototype.nest2ring=function(t){"use strict";var s=this.nest2xyf(t),i=this.xyf2ring(s.ix,s.iy,s.face_num);return i},t.prototype.corners_nest=function(t,s){"use strict";var i=this.nest2ring(t);return this.corners_ring(i,s)},t.prototype.pix2ang_ring=function(t){"use strict";var s,i,n,a,e,h,r,o,c;if(0>t||t>this.npix-1)throw{name:"Illegal argument",message:"ipix out of range"};return h=t+1,this.ncap>=h?(o=h/2,c=Utils.castToInt(o),n=Utils.castToInt(Math.sqrt(o-Math.sqrt(c)))+1,a=h-2*n*(n-1),s=Math.acos(1-n*n*this.fact2),i=(a-.5)*Constants.PI/(2*n)):this.npix-this.ncap>t?(e=t-this.ncap,n=e/this.nl4+this.nside,a=e%this.nl4+1,r=(1&n+this.nside)>0?1:.5,s=Math.acos((this.nl2-n)*this.fact1),i=(a-r)*Constants.PI/this.nl2):(e=this.npix-t,n=Utils.castToInt(.5*(1+Math.sqrt(2*e-1))),a=4*n+1-(e-2*n*(n-1)),s=Math.acos(-1+Math.pow(n,2)*this.fact2),i=(a-.5)*Constants.PI/(2*n)),[s,i]},t.prototype.ring=function(t){"use strict";var s,i,n=0,a=t+1,e=0;return this.ncap>=a?(i=a/2,e=Utils.castToInt(i),n=Utils.castToInt(Math.sqrt(i-Math.sqrt(e)))+1):this.nl2*(5*this.nside+1)>=a?(s=Utils.castToInt(a-this.ncap-1),n=Utils.castToInt(s/this.nl4+this.nside)):(s=this.npix-a+1,i=s/2,e=Utils.castToInt(i),n=Utils.castToInt(Math.sqrt(i-Math.sqrt(e)))+1,n=this.nl4-n),n},t.prototype.integration_limits_in_costh=function(t){"use strict";var s,i,n,a;return a=1*this.nside,this.nside>=t?(i=1-Math.pow(t,2)/3/this.npface,n=1-Math.pow(t-1,2)/3/this.npface,s=t==this.nside?2*(this.nside-1)/3/a:1-Math.pow(t+1,2)/3/this.npface):this.nl3>t?(i=2*(2*this.nside-t)/3/a,n=2*(2*this.nside-t+1)/3/a,s=2*(2*this.nside-t-1)/3/a):(n=t==this.nl3?2*(-this.nside+1)/3/a:-1+Math.pow(4*this.nside-t+1,2)/3/this.npface,s=-1+Math.pow(this.nl4-t-1,2)/3/this.npface,i=-1+Math.pow(this.nl4-t,2)/3/this.npface),[n,i,s]},t.prototype.pixel_boundaries=function(t,s,i,n){var a,e,h,r,o,c,u,p,l=1*this.nside;if(Math.abs(n)>=1-1/3/this.npface)return u=i*Constants.PIOVER2,p=(i+1)*Constants.PIOVER2,[u,p];if(1.5*n>=1)a=Math.sqrt(3*(1-n)),e=1/l/a,h=s,r=h-1,o=t-s,c=o+1,u=Constants.PIOVER2*(Math.max(r*e,1-c*e)+i),p=Constants.PIOVER2*(Math.min(1-o*e,h*e)+i);else if(1.5*n>-1){var d=.5*(1-1.5*n),f=d+1,I=this.nside+t%2;h=s-(I-t)/2,r=h-1,o=(I+t)/2-s,c=o+1,u=Constants.PIOVER2*(Math.max(f-c/l,-d+r/l)+i),p=Constants.PIOVER2*(Math.min(f-o/l,-d+h/l)+i)}else{a=Math.sqrt(3*(1+n)),e=1/l/a;var M=2*this.nside;h=t-M+s,r=h-1,o=M-s,c=o+1,u=Constants.PIOVER2*(Math.max(1-(M-r)*e,(M-c)*e)+i),p=Constants.PIOVER2*(Math.min(1-(M-h)*e,(M-o)*e)+i)}return[u,p]},t.vector=function(t,s){"use strict";var i=1*Math.sin(t)*Math.cos(s),n=1*Math.sin(t)*Math.sin(s),a=1*Math.cos(t);return new SpatialVector(i,n,a)},t.prototype.corners_ring=function(s,i){"use strict";var n=2*i+2,a=Array(n),e=this.pix2ang_ring(s),h=Math.cos(e[0]),r=e[0],o=e[1],c=Utils.castToInt(o/Constants.PIOVER2),u=this.ring(s),p=Math.min(u,Math.min(this.nside,this.nl4-u)),l=0,d=Constants.PIOVER2/p;l=u>=this.nside&&this.nl3>=u?Utils.castToInt(o/d+u%2/2)+1:Utils.castToInt(o/d)+1,l-=c*p;var f=n/2,I=this.integration_limits_in_costh(u),M=Math.acos(I[0]),y=Math.acos(I[2]),g=this.pixel_boundaries(u,l,c,I[0]);if(a[0]=l>p/2?t.vector(M,g[1]):t.vector(M,g[0]),g=this.pixel_boundaries(u,l,c,I[2]),a[f]=l>p/2?t.vector(y,g[1]):t.vector(y,g[0]),1==i){var P=Math.acos(I[1]);g=this.pixel_boundaries(u,l,c,I[1]),a[1]=t.vector(P,g[0]),a[3]=t.vector(P,g[1])}else for(var x=I[2]-I[0],C=x/(i+1),v=1;i>=v;v++)h=I[0]+C*v,r=Math.acos(h),g=this.pixel_boundaries(u,l,c,h),a[v]=t.vector(r,g[0]),a[n-v]=t.vector(r,g[1]);return a},t.vec2Ang=function(t){"use strict";var s=t.z/t.length(),i=Math.acos(s),n=0;return(0!=t.x||0!=t.y)&&(n=Math.atan2(t.y,t.x)),0>n&&(n+=2*Math.PI),[i,n]},t.prototype.queryDisc=function(s,i,n,a){"use strict";if(0>i||i>Constants.PI)throw{name:"Illegal argument",message:"angular radius is in RADIAN and should be in [0,pi]"};var e,h,r,o,c,u,p,l,d,f,I,M,y,g,P,x,C,v,_,R=new LongRangeSetBuilder,T=null,c=i;if(a&&(c+=Constants.PI/this.nl4),T=t.vec2Ang(s),u=T[0],p=T[1],I=this.fact2,M=this.fact1,o=Math.cos(u),_=1/Math.sqrt((1-o)*(1+o)),g=u-c,P=u+c,l=Math.cos(c),C=Math.cos(g),e=this.ringAbove(C)+1,x=Math.cos(P),h=this.ringAbove(x),e>h&&0==h&&(h=e),0>=g)for(var m=1;e>m;++m)this.inRing(m,0,Math.PI,R);for(r=e;h>=r;++r)v=this.nside>r?1-r*r*I:this.nl3>=r?(this.nl2-r)*M:-1+(this.nl4-r)*(this.nl4-r)*I,d=(l-v*o)*_,f=1-v*v-d*d,y=Math.atan2(Math.sqrt(f),d),isNaN(y)&&(y=c),this.inRing(r,p,y,R);if(P>=Math.PI)for(var m=h+1;this.nl4>m;++m)this.inRing(m,0,Math.PI,R,!1);var b;if(n){for(var S=R.items,U=[],A=0;S.length>A;A++){var O=this.ring2nest(S[A]);U.indexOf(O)>=0||U.push(O)}b=U}else b=R.items;return b},t.prototype.inRing=function(t,s,i,n,a){"use strict";var e,h,r,o,c=!1,u=!1,p=1e-12,l=0,d=0,f=0,I=0,M=(s-i)%Constants.TWOPI-p,y=s+i+p,g=(s+i)%Constants.TWOPI+p;if(p>Math.abs(i-Constants.PI)&&(c=!0),t>=this.nside&&this.nl3>=t?(d=t-this.nside+1,r=this.ncap+this.nl4*(d-1),o=r+this.nl4-1,e=d%2,h=this.nl4):(this.nside>t?(d=t,r=2*d*(d-1),o=r+4*d-1):(d=4*this.nside-t,r=this.npix-2*d*(d+1),o=r+4*d-1),h=4*d,e=1),c)return n.appendRange(r,o),void 0;if(l=e/2,a)f=Math.round(h*M/Constants.TWOPI-l),I=Math.round(h*y/Constants.TWOPI-l),f%=h,I>h&&(I%=h);else{if(f=Math.ceil(h*M/Constants.TWOPI-l),I=Utils.castToInt(h*g/Constants.TWOPI-l),f>I&&1==t&&(I=Utils.castToInt(h*y/Constants.TWOPI-l)),f==I+1&&(f=I),1==f-I&&Constants.PI>i*h)return console.log("the interval is too small and avay from center"),void 0;f=Math.min(f,h-1),I=Math.max(I,0)}if(f>I&&(u=!0),u)f+=r,I+=r,n.appendRange(r,I),n.appendRange(f,o);else{if(0>f)return f=Math.abs(f),n.appendRange(r,r+I),n.appendRange(o-f+1,o),void 0;f+=r,I+=r,n.appendRange(f,I)}},t.prototype.ringAbove=function(t){"use strict";var s=Math.abs(t);if(s>Constants.TWOTHIRD){var i=Utils.castToInt(this.nside*Math.sqrt(3*(1-s)));return t>0?i:4*this.nside-i-1}return Utils.castToInt(this.nside*(2-1.5*t))},t.prototype.ring2nest=function(t){"use strict";var s=this.ring2xyf(t);return this.xyf2nest(s.ix,s.iy,s.face_num)},t.prototype.ring2xyf=function(s){"use strict";var i,n,a,e,h={};if(this.ncap>s){i=Utils.castToInt(.5*(1+Math.sqrt(1+2*s))),n=s+1-2*i*(i-1),a=0,e=i,h.face_num=0;var r=n-1;r>=2*i&&(h.face_num=2,r-=2*i),r>=i&&++h.face_num}else if(this.npix-this.ncap>s){var o=s-this.ncap;this.order>=0?(i=(o>>this.order+2)+this.nside,n=(o&this.nl4-1)+1):(i=o/this.nl4+this.nside,n=o%this.nl4+1),a=1&i+this.nside,e=this.nside;var c,u,p=i-this.nside+1,l=this.nl2+2-p;this.order>=0?(c=n-Utils.castToInt(p/2)+this.nside-1>>this.order,u=n-Utils.castToInt(l/2)+this.nside-1>>this.order):(c=(n-Utils.castToInt(p/2)+this.nside-1)/this.nside,u=(n-Utils.castToInt(l/2)+this.nside-1)/this.nside),h.face_num=u==c?4==u?4:Utils.castToInt(u)+4:c>u?Utils.castToInt(u):Utils.castToInt(c)+8}else{var o=this.npix-s;i=Utils.castToInt(.5*(1+Math.sqrt(2*o-1))),n=4*i+1-(o-2*i*(i-1)),a=0,e=i,i=2*this.nl2-i,h.face_num=8;var r=n-1;r>=2*e&&(h.face_num=10,r-=2*e),r>=e&&++h.face_num}var d=i-t.JRLL[h.face_num]*this.nside+1,f=2*n-t.JPLL[h.face_num]*e-a-1;return f>=this.nl2&&(f-=8*this.nside),h.ix=f-d>>1,h.iy=-(f+d)>>1,h},t}(),Utils=function(){},Utils.radecToPolar=function(t,s){return{theta:Math.PI/2-s/180*Math.PI,phi:t/180*Math.PI}},Utils.polarToRadec=function(t,s){return{ra:180*s/Math.PI,dec:180*(Math.PI/2-t)/Math.PI}},Utils.castToInt=function(t){return t>0?Math.floor(t):Math.ceil(t)};//=================================
//            AstroMath
//=================================

// Class AstroMath having 'static' methods
function AstroMath() {}

// Constant for conversion Degrees => Radians (rad = deg*AstroMath.D2R)
AstroMath.D2R = Math.PI/180.0;
// Constant for conversion Radians => Degrees (deg = rad*AstroMath.R2D)
AstroMath.R2D = 180.0/Math.PI;
/**
 * Function sign
 * @param x value for checking the sign
 * @return -1, 0, +1 respectively if x < 0, = 0, > 0
 */
AstroMath.sign = function(x) { return x > 0 ? 1 : (x < 0 ? -1 : 0 ); };

/**
 * Function cosd(degrees)
 * @param x angle in degrees
 * @returns the cosine of the angle
 */
AstroMath.cosd = function(x) {
	if (x % 90 == 0) {
		var i = Math.abs(Math.floor(x / 90 + 0.5)) % 4;
		switch (i) {
			case 0:	return 1;
			case 1:	return 0;
			case 2:	return -1;
			case 3:	return 0;
		}
	}
	return Math.cos(x*AstroMath.D2R);
};

/**
 * Function sind(degrees)
 * @param x angle in degrees
 * @returns the sine of the angle
 */
AstroMath.sind = function(x) {
	if (x % 90 === 0) {
		var i = Math.abs(Math.floor(x / 90 - 0.5)) % 4;
		switch (i) {
			case 0:	return 1;
			case 1:	return 0;
			case 2:	return -1;
			case 3:	return 0;
		}
	}

	return Math.sin(x*AstroMath.D2R);
};

/**
 * Function tand(degrees)
 * @param x angle in degrees
 * @returns the tangent of the angle
 */
AstroMath.tand = function(x) {
	var resid;

	resid = x % 360;
	if (resid == 0 || Math.abs(resid) == 180) {
		return 0;
	} else if (resid == 45 || resid == 225) {
		return 1;
	} else if (resid == -135 || resid == -315) {
		return -1
	}

	return Math.tan(x * AstroMath.D2R);
};

/**
 * Function asin(degrees)
 * @param sine value [0,1]
 * @return the angle in degrees
 */
AstroMath.asind = function(x) { return Math.asin(x)*AstroMath.R2D; };

/**
 * Function acos(degrees)
 * @param cosine value [0,1]
 * @return the angle in degrees
 */
AstroMath.acosd = function(x) { return Math.acos(x)*AstroMath.R2D; };

/**
 * Function atan(degrees)
 * @param tangent value
 * @return the angle in degrees
 */
AstroMath.atand = function(x) { return Math.atan(x)*AstroMath.R2D; };

/**
 * Function atan2(y,x)
 * @param y y component of the vector
 * @param x x component of the vector
 * @return the angle in radians
 */
AstroMath.atan2 = function(y,x) {
	if (y != 0.0) {
		var sgny = AstroMath.sign(y);
		if (x != 0.0) {
			var phi = Math.atan(Math.abs(y/x));
			if (x > 0.0) return phi*sgny;
			else if (x < 0) return (Math.PI-phi)*sgny;
		} else return (Math.PI/2)*sgny;
	} else {
		return x > 0.0 ? 0.0 : (x < 0 ? Math.PI : 0.0/0.0);
	}
}  

/**
 * Function atan2d(y,x)
 * @param y y component of the vector
 * @param x x component of the vector
 * @return the angle in degrees
 */
AstroMath.atan2d = function(y,x) {
	return AstroMath.atan2(y,x)*AstroMath.R2D;
}

/*=========================================================================*/
/**
 * Computation of hyperbolic cosine
 * @param x argument
 */
AstroMath.cosh = function(x) {
	return (Math.exp(x)+Math.exp(-x))/2;
}

/**
 * Computation of hyperbolic sine
 * @param x argument
 */
AstroMath.sinh = function(x) {
	return (Math.exp(x)-Math.exp(-x))/2;
}

/**
 * Computation of hyperbolic tangent
 * @param x argument
 */
AstroMath.tanh = function(x) {
	return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x));
}

/**
 * Computation of Arg cosh
 * @param x argument in degrees. Must be in the range [ 1, +infinity ]
 */
AstroMath.acosh = function(x) {
	return(Math.log(x+Math.sqrt(x*x-1.0)));
}

/**
 * Computation of Arg sinh
 * @param x argument in degrees
 */
AstroMath.asinh = function(x) {
	return(Math.log(x+Math.sqrt(x*x+1.0)));
}

/**
 * Computation of Arg tanh
 * @param x argument in degrees. Must be in the range ] -1, +1 [
 */
AstroMath.atanh = function(x) {
	return(0.5*Math.log((1.0+x)/(1.0-x)));
}

//=============================================================================
//      Special Functions using trigonometry
//=============================================================================
/**
 * Computation of sin(x)/x
 *	@param x in degrees.
 * For small arguments x <= 0.001, use approximation 
 */
AstroMath.sinc = function(x) {
	var ax = Math.abs(x);
	var y;

	if (ax <= 0.001) {
		ax *= ax;
		y = 1 - ax*(1.0-ax/20.0)/6.0;
	} else {
		y = Math.sin(ax)/ax;
	}

	return y;
}

/**
 * Computes asin(x)/x
 * @param x in degrees.
 * For small arguments x <= 0.001, use an approximation
 */
AstroMath.asinc = function(x) {
	var ax = Math.abs(x);
	var y;

	if (ax <= 0.001) {
		ax *= ax; 
		y = 1 + ax*(6.0 + ax*(9.0/20.0))/6.0;
	} else {
		y = Math.asin(ax)/ax;	// ???? radians ???
	}

	return (y);
}


//=============================================================================
/**
 * Computes the hypotenuse of x and y
 * @param x value
 * @param y value
 * @return sqrt(x*x+y*y)
 */
AstroMath.hypot = function(x,y) {
	return Math.sqrt(x*x+y*y);
}

/** Generate the rotation matrix from the Euler angles
 * @param z	Euler angle
 * @param theta	Euler angle
 * @param zeta	Euler angles
 * @return R [3][3]		the rotation matrix
 * The rotation matrix is defined by:<pre>
 *    R =      R_z(-z)      *        R_y(theta)     *     R_z(-zeta)
 *   |cos.z -sin.z  0|   |cos.the  0 -sin.the|   |cos.zet -sin.zet 0|
 * = |sin.z  cos.z  0| x |   0     1     0   | x |sin.zet  cos.zet 0|
 *   |   0      0   1|   |sin.the  0  cos.the|   |   0        0    1|
 * </pre>
 */
AstroMath.eulerMatrix = function(z, theta, zeta) {
	var R = new Array(3);
	R[0] = new Array(3);
	R[1] = new Array(3);
	R[2] = new Array(3);
	var cosdZ = AstroMath.cosd(z);
	var sindZ = AstroMath.sind(z);
	var cosdTheta = AstroMath.cosd(theta);
	var w = AstroMath.sind(theta) ;
	var cosdZeta = AstroMath.cosd(zeta);
	var sindZeta = AstroMath.sind(zeta);

	R[0][0] = cosdZeta*cosdTheta*cosdZ - sindZeta*sindZ;
	R[0][1] = -sindZeta*cosdTheta*cosdZ - cosdZeta*sindZ;
	R[0][2] = -w*cosdZ;

	R[1][0] = cosdZeta*cosdTheta*sindZ + sindZeta*cosdZ;
	R[1][1] = -sindZeta*cosdTheta*sindZ + cosdZeta*cosdZ;
	R[1][2] = -w*sindZ;

	R[2][0] = -w*cosdZeta;
	R[2][1] = -w*cosdZ;
	R[2][2] = cosdTheta;
	return R ;
};


AstroMath.displayMatrix = function(m) {
	// Number of rows
	var nbrows = m.length;
	// Max column count
	var nbcols = 0
	for (var i=0; i<nbrows; i++) {
		if (m[i].length > nbcols) nbcols = m[i].length;
	}
	var str = '<table>\n';
	for (var i=0; i<nbrows; i++) {
		str += '<tr>';
		for (var j=0; j<nbrows; j++) {
			str += '<td>';
			if (i < m[i].length)
				str += (m[i][j]).toString();
			str += '</td>';
		}
		str += '</td>\n';
	}
	str += '</table>\n';

	return str;
}
function Projection(lon0, lat0) {
	this.PROJECTION = Projection.PROJ_TAN;
	this.ROT = this.tr_oR(lon0, lat0);

    this.longitudeIsReversed = false;
}

//var ROT;
//var PROJECTION = Projection.PROJ_TAN;	// Default projection


Projection.PROJ_TAN = 1;	/* Gnomonic projection*/
Projection.PROJ_TAN2 = 2;	/* Stereographic projection*/
Projection.PROJ_STG = 2;	
Projection.PROJ_SIN = 3;	/* Orthographic		*/
Projection.PROJ_SIN2 = 4;	/* Equal-area 		*/
Projection.PROJ_ZEA = 4;	/* Zenithal Equal-area 	*/
Projection.PROJ_ARC = 5;	/* For Schmidt plates	*/
Projection.PROJ_SCHMIDT = 5;	/* For Schmidt plates	*/
Projection.PROJ_AITOFF = 6;	/* Aitoff Projection	*/
Projection.PROJ_AIT = 6;	/* Aitoff Projection	*/
Projection.PROJ_GLS = 7;	/* Global Sin (Sanson)	*/
Projection.PROJ_MERCATOR = 8;
Projection.PROJ_MER = 8;	
Projection.PROJ_LAM = 9;	/* Lambert Projection	*/
Projection.PROJ_LAMBERT = 9;	
Projection.PROJ_TSC = 10;	/* Tangent Sph. Cube	*/
Projection.PROJ_QSC = 11;	/* QuadCube Sph. Cube	*/

Projection.PROJ_LIST = [
	"Mercator",Projection.PROJ_MERCATOR,
	"Gnomonic",Projection.PROJ_TAN,
	"Stereographic",Projection.PROJ_TAN2,
	"Orthographic",Projection.PROJ_SIN,
	"Zenithal",Projection.PROJ_ZEA,
	"Schmidt",Projection.PROJ_SCHMIDT,
	"Aitoff",Projection.PROJ_AITOFF,
	"Lambert",Projection.PROJ_LAMBERT,
//	"Tangential",Projection.PROJ_TSC,
//	"Quadrilaterized",Projection.PROJ_QSC,
];
Projection.PROJ_NAME = [
	'-', 'Gnomonic', 'Stereographic', 'Orthographic', 'Equal-area', 'Schmidt plates',
	'Aitoff', 'Global sin', 'Mercator', 'Lambert'
];

Projection.prototype = { 
	
	/** Set the center of the projection
	 * 
	 * (ajout T. Boch, 19/02/2013)
	 * 
	 * */
	setCenter: function(lon0, lat0) {
		this.ROT = this.tr_oR(lon0, lat0);
	},

    /** Reverse the longitude
      * If set to true, longitudes will increase from left to right
      *
      * */
    reverseLongitude: function(b) {
        this.longitudeIsReversed = b;
    },
	
	/**
	 * Set the projection to use
	 * p = projection code
	 */
	setProjection: function(p) {
		this.PROJECTION = p;
	},


	/**
	 * Computes the projection of 1 point : ra,dec => X,Y
	 * alpha, delta = longitude, lattitude
	 */
	project: function(alpha, delta) {
        var u1 = this.tr_ou(alpha, delta);	// u1[3]
		var u2 = this.tr_uu(u1, this.ROT);	// u2[3]
		var P = this.tr_up(this.PROJECTION, u2);	// P[2] = [X,Y]
		if (P == null) {
			return null;
		}

		if( this.longitudeIsReversed) {
            return { X: P[0], Y: -P[1] };
        }
        else {
		    return { X: -P[0], Y: -P[1] };
        }
        //return { X: -P[0], Y: -P[1] };
	},

	/**
	 * Computes the coordinates from a projection point : X,Y => ra,dec
	 * return o = [ ra, dec ]
	 */
	unproject: function(X,Y) {
		if ( ! this.longitudeIsReversed) {
            X = -X;
        }
		Y = -Y;
		var u1 = this.tr_pu(this.PROJECTION, X, Y);	// u1[3]
		var u2 = this.tr_uu1(u1, this.ROT);	// u2[3]
		var o = this.tr_uo(u2);	// o[2]

/*
		if (this.longitudeIsReversed) {
            return { ra: 360-o[0], dec: o[1] };
        }
        else {
		    return { ra: o[0], dec: o[1] };
        }
*/
        return { ra: o[0], dec: o[1] };
	},

	/**
	 * Compute projections from unit vector
	 * The center of the projection correspond to u = [1, 0, 0)
	 * proj = projection system (integer code like _PROJ_MERCATOR_
	 * u[3] = unit vector
	 * return: an array [x,y] or null
	 */
	tr_up: function(proj, u) {
		var x = u[0]; var y = u[1]; var z = u[2];
		var r, den;
		var pp;
		var X,Y;

		r = AstroMath.hypot(x,y);			// r = cos b
		if (r == 0.0 && z == 0.0) return null;

		switch(proj) {
			default:
				pp = null;
				break;

			case Projection.PROJ_AITOFF:
				den = Math.sqrt(r*(r+x)/2.0); 		// cos b . cos l/2
				X = Math.sqrt(2.0*r*(r-x));
				den = Math.sqrt((1.0 + den)/2.0); 
				X = X / den;
				Y = z / den;
				if (y < 0.0) X = -X;
				pp = [ X, Y];
				break;

			case Projection.PROJ_GLS:
				Y = Math.asin(z);				// sin b
				X = (r != 0) ? Math.atan2(y,x)*r : 0.0;
				pp = [ X, Y];
				break;

			case Projection.PROJ_MERCATOR:
				if (r != 0) {
					X = Math.atan2(y,x);
					Y = AstroMath.atanh(z);
					pp = [ X, Y];
				} else {
					pp = null;
				}
				break;

			case Projection.PROJ_TAN:
				if (x > 0.0) {
					X = y/x;
					Y = z/x;
					pp = [ X, Y ];
				} else {
					pp = null;
				}
				break;

			case Projection.PROJ_TAN2:
				den = (1.0 + x)/2.0;
				if (den > 0.0)	{
					X = y/den;
					Y = z/den;
					pp = [ X, Y ];
				} else {
					pp = null;
				}
			 	break;

			case Projection.PROJ_ARC:
				if (x <= -1.0) {
					// Distance of 180 degrees
					X = Math.PI
					Y = 0.0;
				} else {
					// Arccos(x) = Arcsin(r)
					r = AstroMath.hypot(y,z);
					if (x > 0.0) den = AstroMath.asinc(r);
					else den = Math.acos(x)/r;
					X = y * den;
					Y = z * den;
				}
				pp = [ X, Y ];
				break;

			case Projection.PROJ_SIN:
				if (x >= 0.0) {
					X = y;
					Y = z;
					pp = [ X, Y ];
				} else {
					pp = null;
				}
				break;

			case Projection.PROJ_SIN2:	// Always possible
				den = Math.sqrt((1.0 + x)/2.0);
				if (den != 0)	{
					X = y / den;
					Y = z / den;
				} else {
					// For x = -1
					X = 2.0;
					Y = 0.0;
				}
				pp = [ X, Y ];
				break;

			case Projection.PROJ_LAMBERT:	// Always possible
				Y = z;
				X = 0;
				if (r != 0)	X = Math.atan2(y,x);
				pp = [ X, Y ];
				break;
	  }
	  return pp;
	},

	/**
	 * Computes Unit vector from a position in projection centered at position (0,0).
	 * proj = projection code
	 * X,Y : coordinates of the point in the projection
	 * returns : the unit vector u[3] or a face number for cube projection. 
	 *           null if the point is outside the limits, or if the projection is unknown.
	 */
	tr_pu: function( proj, X, Y ) {
		var r,s,x,y,z;

		switch(proj) {
			default:
			return null;

			case Projection.PROJ_AITOFF:
				// Limit is ellipse with axises 
				// a = 2 * sqrt(2) ,  b = sqrt(2)
				// Compute dir l/2, b
				r = X*X/8.e0 + Y*Y/2.e0; 	// 1 - cos b . cos l/2
				if (r > 1.0) {
	  				// Test outside domain */
					return null;
				}
				x = 1.0 - r ;	// cos b . cos l/2
				s = Math.sqrt(1.0 - r/2.0) ;	// sqrt(( 1 + cos b . cos l/2)/2)
				y = X * s / 2.0;
				z = Y * s ;
				// From (l/2,b) to (l,b)
				r = AstroMath.hypot( x, y ) ;	// cos b
				if (r != 0.0) {
					s = x;
					x = (s*s - y*y) /r;
					y = 2.0 * s * y/r;
				}
				break;

			case Projection.PROJ_GLS:
				// Limit is |Y| <= pi/2
				z = Math.sin(Y);
				r = 1 - z*z;		// cos(b) ** 2
				if (r < 0.0) {
					return null;
				}
				r = Math.sqrt(r);		// cos b
				if (r != 0.0) {
					s = X/r;	// Longitude
				} else {
					s = 0.0;	// For poles
				}
				x = r * Math.cos(s);
				y = r * Math.sin(s);
				break;

			case Projection.PROJ_MERCATOR:
				z = AstroMath.tanh(Y);
				r = 1.0/AstroMath.cosh(Y);
				x = r * Math.cos(X);
				y = r * Math.sin(X);
				break;

			case Projection.PROJ_LAMBERT:
				// Always possible
				z = Y;
				r = 1 - z*z;		// cos(b) ** 2
				if (r < 0.0) {
					return null;
				}
				r = Math.sqrt(r);		// cos b
				x = r * Math.cos(X);
				y = r * Math.sin(X);
				break;
	
			case Projection.PROJ_TAN:
				// No limit
				x = 1.0 / Math.sqrt(1.0 + X*X + Y*Y);
				y = X * x;
				z = Y * x;
				break;

			case Projection.PROJ_TAN2:
				// No limit
				r = (X*X + Y*Y)/4.0;
				s = 1.0 + r;
				x = (1.0 - r)/s;
				y = X / s;
				z = Y / s;
				break;

			case Projection.PROJ_ARC:
				// Limit is circle, radius PI
				r = AstroMath.hypot(X, Y);
				if (r > Math.PI) {
					return null;
				}
				s = AstroMath.sinc(r);
				x = Math.cos(r);
				y = s * X;
				z = s * Y;
				break;

			case Projection.PROJ_SIN:
				// Limit is circle, radius 1
				s = 1.0 - X*X - Y*Y;
				if (s < 0.0) {
					return null;
				}
				x = Math.sqrt(s);
				y = X;
				z = Y;
				break;

			case Projection.PROJ_SIN2:
				// Limit is circle, radius 2	*/
				r = (X*X + Y*Y)/4.e0;
				if (r > 1.0) {
					return null;
				}
				s = Math.sqrt(1.0 - r);
				x = 1.0 - 2.0 * r;
				y = s * X;
				z = s * Y;
				break;
	  }
	  return [ x,y,z ];
	},

	/**
	 * Creates the rotation matrix R[3][3] defined as
	 * R[0] (first row) = unit vector towards Zenith
	 * R[1] (second row) = unit vector towards East
	 * R[2] (third row) = unit vector towards North
	 * o[2] original angles
	 * @return rotation matrix
	 */
	tr_oR: function(lon, lat) {
		var R = new Array(3);
		R[0] = new Array(3);
		R[1] = new Array(3);
		R[2] = new Array(3);
		R[2][2] =  AstroMath.cosd(lat);
		R[0][2] =  AstroMath.sind(lat);
		R[1][1] =  AstroMath.cosd(lon);
		R[1][0] =  -AstroMath.sind(lon);
		R[1][2] =  0.0;
		R[0][0] =  R[2][2] * R[1][1];  
		R[0][1] = -R[2][2] * R[1][0];
		R[2][0] = -R[0][2] * R[1][1];
		R[2][1] =  R[0][2] * R[1][0];
		return R;
	},

	/**
	 * Transformation from polar coordinates to Unit vector
	 * @return U[3]
	 */
	tr_ou: function(ra, dec) {
		var u = new Array(3);
		var cosdec = AstroMath.cosd(dec);

		u[0] = cosdec * AstroMath.cosd(ra);
		u[1] = cosdec * AstroMath.sind(ra);
		u[2] = AstroMath.sind(dec);

		return u;
	},

	/**
	 * Rotates the unit vector u1 using the rotation matrix
	 * u1[3] unit vector
	 * R[3][3] rotation matrix
	 * return resulting unit vector u2[3]
	 */
	tr_uu: function( u1, R ) {
		var u2 = new Array(3);
		var x = u1[0];
		var y = u1[1];
		var z = u1[2];

		u2[0] = R[0][0]*x + R[0][1]*y + R[0][2]*z ;
		u2[1] = R[1][0]*x + R[1][1]*y + R[1][2]*z ;
		u2[2] = R[2][0]*x + R[2][1]*y + R[2][2]*z ;

		return u2;
	},

	/**
	 * reverse rotation the unit vector u1 using the rotation matrix
	 * u1[3] unit vector
	 * R[3][3] rotation matrix
	 * return resulting unit vector u2[3]
	 */
	tr_uu1: function( u1 , R) {
		var u2 = new Array(3);
		var x = u1[0];
		var y = u1[1];
		var z = u1[2];

		u2[0] = R[0][0]*x + R[1][0]*y + R[2][0]*z;
		u2[1] = R[0][1]*x + R[1][1]*y + R[2][1]*z;
		u2[2] = R[0][2]*x + R[1][2]*y + R[2][2]*z;

		return u2;
	},

	/**
	 * Computes angles from direction cosines
	 * u[3] = direction cosines vector
	 * return o = [ ra, dec ]
	 */
	tr_uo: function(u) {
		var x = u[0]; var y = u[1]; var z = u[2];  
		var r2 = x*x + y*y;
		var ra, dec;
		if (r2  == 0.0) {
	 		// in case of poles
			if (z == 0.0) {
				return null;
			}
			ra = 0.0;
			dec = z > 0.0 ? 90.0 : -90.0;
		} else {
			dec = AstroMath.atand( z / Math.sqrt(r2));
			ra  = AstroMath.atan2d (y , x );
			if (ra < 0.0) ra += 360.0;
		}

		return [ ra, dec ];
	}
}
//=================================
// Class Coo
//=================================

/**
 * Constructor
 * @param longitude longitude (decimal degrees)
 * @param latitude latitude (decimal degrees)
 * @param prec precision
 * (8: 1/1000th sec, 7: 1/100th sec, 6: 1/10th sec, 5: sec, 4: 1/10th min, 3: min, 2: 1/10th deg, 1: deg
 */
function Coo(longitude, latitude, prec) {
	this.lon = longitude;
	this.lat = latitude;
	this.prec = prec;
	this.frame = null;

	this.computeDirCos();
}

Coo.factor = [ 3600.0, 60.0, 1.0 ];
Coo.prototype = {
	setFrame: function(astroframe) {
		this.frame = astroframe;
	},
	computeDirCos: function() {
		var coslat = AstroMath.cosd(this.lat);

		this.x = coslat*AstroMath.cosd(this.lon);
		this.y = coslat*AstroMath.sind(this.lon);
		this.z = AstroMath.sind(this.lat);	
	}, 
	computeLonLat: function() {
		var r2 = this.x*this.x+this.y*this.y;
		this.lon = 0.0;
		if (r2 == 0.0) {
			// In case of poles
			if (this.z == 0.0) {
				this.lon = 0.0/0.0;
				this.lat = 0.0/0.0;
			} else {
				this.lat = (this.z > 0.0) ? 90.0 : -90.0;
			}
		} else {
			this.lon = AstroMath.atan2d(this.y, this.x);
			this.lat = AstroMath.atan2d(this.z, Math.sqrt(r2));
			if (this.lon < 0) this.lon += 360.0;
		}
	},

  /**
    * Squared distance between 2 points (= 4.sin<sup>2</sup>(r/2))
    * @param  pos      another position on the sphere
    * @return ||pos-this||<sup>2</sup> = 4.sin<sup>2</sup>(r/2)
   **/
   dist2: function(pos) {
//    	if ((this.x==0)&&(this.y==0)&&(this.z==0)) return(0./0.);
//    	if ((pos.x==0)&&(pos.y==0)&&(pos.z==0)) return(0./0.);
	var w = pos.x - this.x;
	var r2 = w * w;
	w = pos.y - this.y; r2 += w * w;
	w = pos.z - this.z; r2 += w * w;
	return r2;
   },

   /**
    * Distance between 2 points on the sphere.
    * @param  pos another position on the sphere
    * @return distance in degrees in range [0, 180]
   **/
    distance: function(pos) {
      // Take care of NaN:
    	if ((pos.x==0)&&(pos.y==0)&&(pos.z==0)) return(0./0.);
    	if ((this.x==0)&&(this.y==0)&&(this.z==0)) return(0./0.);
      return (2. * AstroMath.asind(0.5 * Math.sqrt(this.dist2(pos))));
    },

   /**
    * Transform the position into another frame.
    * @param new_frame	The frame of the resulting position.
   **/
   convertTo: function(new_frame) {
		// Verify first if frames identical -- then nothing to do !
		if (this.frame.equals(new_frame)) {
	    		return;
		}

		// Move via ICRS
		this.frame.toICRS(this.coo);	// Position now in ICRS
		new_frame.fromICRS(this.coo);	// Position now in new_frame
		this.frame = new_frame;
		this.lon = this.lat = 0./0.;	// Actual angles not recomputed
   },

    /**
     * Rotate a coordinate (apply a rotation to the position).
     * @param R [3][3] Rotation Matrix
     */
    rotate: function(R) {
      var X, Y, Z;
		if (R == Umatrix3) return;
		X = R[0][0]*this.x + R[0][1]*this.y + R[0][2]*this.z;
		Y = R[1][0]*this.x + R[1][1]*this.y + R[1][2]*this.z;
		Z = R[2][0]*this.x + R[2][1]*this.y + R[2][2]*this.z;
    	// this.set(X, Y, Z); Not necessary to compute positions each time.
		this.x = X; this.y = Y; this.z = Z;
		this.lon = this.lat = 0./0.;
    },

    /**
     * Rotate a coordinate (apply a rotation to the position) in reverse direction.
     * The method is the inverse of rotate.
     * @param R [3][3] Rotation Matrix
     */
    rotate_1: function(R) {
      var X, Y, Z;
      if (R == Umatrix3) return;
		X = R[0][0]*this.x + R[1][0]*this.y + R[2][0]*this.z;
		Y = R[0][1]*this.x + R[1][1]*this.y + R[2][1]*this.z;
		Z = R[0][2]*this.x + R[1][2]*this.y + R[2][2]*this.z;
    	// this.set(X, Y, Z); Not necessary to compute positions each time.
		this.x = X; this.y = Y; this.z = Z;
		this.lon = this.lat = 0./0.;
    },


    /**
     * Test equality of Coo.
     * @param coo Second coordinate to compare with
     * @return  True if the two coordinates are equal
     */
    equals: function(coo) {
		return this.x == coo.x && this.y == coo.y && this.z == coo.z;
    },

	/**
	 * parse a coordinate string. The coordinates can be in decimal or sexagesimal
	 * @param str string to parse
	 * @return true if the parsing succeded, false otherwise
	 */
	parse: function(str) {
		var p = str.indexOf('+');
		if (p < 0) p = str.indexOf('-');
		if (p < 0) p = str.indexOf(' ');
		if (p < 0) {
			this.lon = 0.0/0.0;
			this.lat = 0.0/0.0;
			this.prec = 0;
			return false;
		}
		var strlon = str.substring(0,p);
		var strlat = str.substring(p);
	
		this.lon = this.parseLon(strlon);	// sets the precision parameter
		this.lat = this.parseLat(strlat);	// sets the precision parameter
		return true;
	},

	parseLon: function(str) {
		var str = str.trim();
        str = str.replace(/:/g, ' ');

		if (str.indexOf(' ') < 0) {
			// The longitude is a integer or decimal number
			var p = str.indexOf('.');
			this.prec = p < 0 ? 0 : str.length - p - 1;
			return parseFloat(str);
		} else {
			var stok = new Tokenizer(str,' ');
			var i = 0;
			var l = 0;
			var pr = 0;
			while (stok.hasMore()) {
				var tok = stok.nextToken();
				var dec = tok.indexOf('.');
				l += parseFloat(tok)*Coo.factor[i];
//				pr = dec < 0 ? 1 : 2;
				switch (i) {
					case 0: pr = dec < 0 ? 1 : 2; break;
					case 1: pr = dec < 0 ? 3 : 4; break;
					case 2: pr = dec < 0 ? 5 : 4+tok.length-dec;
					default: break;
				}
				i++;
			}
			this.prec = pr;
			return l*15/3600.0;	
		}
	},
			
	parseLat: function(str) {
		var str = str.trim();
        str = str.replace(/:/g, ' ');

		var sign;
		if (str.charAt(0) == '-') {
			sign = -1;
			str = str.substring(1);
		} else if (str.charAt(0) == '-') {
			sign = 1;
			str = str.substring(1);
		} else {
			// No sign specified
			sign = 1;
		}
		if (str.indexOf(' ') < 0) {
			// The longitude is a integer or decimal number
			var p = str.indexOf('.');
			this.prec = p < 0 ? 0 : str.length - p - 1;
			return parseFloat(str)*sign;
		} else {
			var stok = new Tokenizer(str,' ');
			var i = 0;
			var l = 0;
			var pr = 0;
			while (stok.hasMore()) {
				var tok = stok.nextToken();
				var dec = tok.indexOf('.');
				l += parseFloat(tok)*Coo.factor[i];
				switch (i) {
					case 0: pr = dec < 0 ? 1 : 2; break;
					case 1: pr = dec < 0 ? 3 : 4; break;
					case 2: pr = dec < 0 ? 5 : 4+tok.length-dec;
					default: break;
				}
				i++;
			}
			this.prec = pr;
			return l*sign/3600.0;	
		}
	},

	/**
	 * Format coordinates according to the options
	 * @param options 'd': decimal, 's': sexagÃ©simal, '/': space separated, '2': return [ra,dec] in an array
	 * @return the formatted coordinates
	 */
	format: function(options) {
		if (isNaN(this.lon)) this.computeLonLat();
		var strlon = "", strlat = "";
		if (options.indexOf('d') >= 0) {
			// decimal display
			strlon = Numbers.format(this.lon, this.prec);
			strlat = Numbers.format(this.lat, this.prec);
		} else {
			// sexagesimal display
			var hlon = this.lon/15.0;
			var strlon = Numbers.toSexagesimal(hlon, this.prec+1, false);
			var strlat = Numbers.toSexagesimal(this.lat, this.prec, false);
		}
		if (this.lat > 0) strlat = '+'+strlat;

		if (options.indexOf('/') >= 0) {
			return strlon+' '+strlat;
		} else if (options.indexOf('2') >= 0) {
			return [strlon, strlat];
		}
		return strlon+strlat;
	}
		
}

/**
 * Distance between 2 points on the sphere.
 * @param coo1 firs	var coslat = AstroMath.cosd(this.lat);

	this.x = coslat*AstroMath.cosd(this.lon);
	this.y = coslat*AstroMath.sind(this.lon);
	this.z = AstroMath.sind(this.lat);
t coordinates point
 * @param coo2 second coordinates point
 * @return distance in degrees in range [0, 180]
**/
/*
Coo.distance = function(Coo coo1, Coo coo2) {
	return Coo.distance(coo1.lon, coo1.lat, coo2.lon, coo2.lat);
}
*/
/**
 * Distance between 2 points on the sphere.
 * @param lon1 longitude of first point in degrees
 * @param lat1 latitude of first point in degrees
 * @param lon2 longitude of second point in degrees
 * @param lat2 latitude of second point in degrees
 * @return distance in degrees in range [0, 180]
**/
/*
Coo.distance = function(lon1, lat1, lon2, lat2) {
	var c1 = AstroMath.cosd(lat1);
	var c2 = AstroMath.cosd(lat2);

	var w, r2;
	w = c1 * AstroMath.cosd(lon1) - c2 * AstroMath.cosd(lon2);
	r2 = w*w;
	w = c1 * AstroMath.sind(lon1) - c2 * AstroMath.sind(lon2);
	r2 += w*w;
	w = AstroMath.sind(lat1) - AstroMath.sind(lat2);
	r2 += w*w;

	return 2. * AstroMath.asind(0.5 * Math.sqrt(r2));
}


//===================================
// Class Tokenizer (similar to Java)
//===================================

/**
 * Constructor
 * @param str String to tokenize
 * @param sep token separator char
 */
function Tokenizer(str, sep) {
	this.string = Strings.trim(str, sep);
	this.sep = sep;
	this.pos = 0;
}

Tokenizer.prototype = {
	/**
	 * Check if the string has more tokens
	 * @return true if a token remains (read with nextToken())
	 */
	hasMore: function() {
		return this.pos < this.string.length;
	},

	/**
	 * Returns the next token (as long as hasMore() is true)
	 * @return the token string
	 */
	nextToken: function() {
		// skip all the separator chars
		var p0 = this.pos;
		while (p0 < this.string.length && this.string.charAt(p0) == this.sep) p0++;
		var p1 = p0;
		// get the token
		while (p1 < this.string.length && this.string.charAt(p1) != this.sep) p1++;
		this.pos = p1;
		return this.string.substring(p0, p1);
	},
}

//================================
// Class Strings (static methods)
//================================
function Strings() {}

/**
 * Removes a given char at the beginning and the end of a string
 * @param str string to trim
 * @param c char to remove
 * @return the trimmed string
 */

Strings.trim = function(str, c) {
	var p0=0, p1=str.length-1;
	while (p0 < str.length && str.charAt(p0) == c) p0++;
	if (p0 == str.length) return "";
	while (p1 > p0 && str.charAt(p1) == c) p1--;
	return str.substring(p0, p1+1);
}

//================================
// Class Numbers (static methods)
//================================
function Numbers() {}
//                0  1   2    3     4      5       6        7         8          9
Numbers.pow10 = [ 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000,
//      10           11            12             13              14
	10000000000, 100000000000, 1000000000000, 10000000000000, 100000000000000 ];
//                 0    1     2      3       4        5         6          7
Numbers.rndval = [ 0.5, 0.05, 0.005, 0.0005, 0.00005, 0.000005, 0.0000005, 0.00000005,
//      8            9             10             11              12
	0.000000005, 0.0000000005, 0.00000000005, 0.000000000005, 0.0000000000005,
//      13                14
	0.00000000000005, 0.00000000000005 ];
/**
 * Format a integer or decimal number, adjusting the value with 'prec' decimal digits
 * @param num number (integer or decimal)
 * @param prec precision (= number of decimal digit to keep or append)
 * @return a string with the formatted number
 */
Numbers.format = function(num, prec) {
		if (prec <= 0) {
			// Return an integer number
			return (Math.round(num)).toString();
		}
		var str = num.toString();
		var p = str.indexOf('.');
		var nbdec = p >= 0 ? str.length-p-1 : 0;
		if (prec >= nbdec) {
			if (p < 0) str += '.';
			for (var i=0; i<prec-nbdec; i++)
				str += '0';
			return str;
		}
		// HERE: prec > 0 and prec < nbdec
		str = (num+Numbers.rndval[prec]).toString();
		return str.substr(0, p+prec+1);
}


/**
 * Convert a decimal coordinate into sexagesimal string, according to the given precision<br>
 * 8: 1/1000th sec, 7: 1/100th sec, 6: 1/10th sec, 5: sec, 4: 1/10th min, 3: min, 2: 1/10th deg, 1: deg
 * @param num number (integer or decimal)
 * @param prec precision (= number of decimal digit to keep or append)
 * @param plus if true, the '+' sign is displayed
 * @return a string with the formatted sexagesimal number
 */
Numbers.toSexagesimal = function(num, prec, plus) {
	var resu = "";
	var sign = num < 0 ? '-' : (plus ? '+' : '');
	var n = Math.abs(num);

	switch (prec) {
		case 1:	// deg
			var n1 = Math.round(n);
			return sign+n1.toString();
		case 2:	// deg.d
			return sign+Numbers.format(n, 1);
		case 3:	// deg min
			var n1 = Math.floor(n);
			var n2 = Math.round((n-n1)*60);
			return sign+n1+' '+n2;
		case 4:	// deg min.d
			var n1 = Math.floor(n);
			var n2 = (n-n1)*60;
			return sign+n1+' '+Numbers.format(n2, 1);
		case 5:	// deg min sec
			var n1 = Math.floor(n);	// d
			var n2 = (n-n1)*60;		// M.d
			var n3 = Math.floor(n2);// M
			var n4 = Math.round((n2-n3)*60);	// S
			return sign+n1+' '+n3+' '+n4;
		case 6:	// deg min sec.d
		case 7:	// deg min sec.dd
		case 8:	// deg min sec.ddd
			var n1 = Math.floor(n);	// d
			if (n1<10) n1 = '0' + n1;
			var n2 = (n-n1)*60;		// M.d
			var n3 = Math.floor(n2);// M
			if (n3<10) n3 = '0' + n3;
			var n4 = (n2-n3)*60;		// S.ddd
			return sign+n1+' '+n3+' '+Numbers.format(n4, prec-5);
		default:
			return sign+Numbers.format(n, 1);
	}
}
// Copyright 2018 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File SimbadPointer.js
 *
 * The SIMBAD pointer will query Simbad for a given position and radius and
 * return information on the object with 
 *  
 * Author: Thomas Boch [CDS]
 * 
 *****************************************************************************/

SimbadPointer = (function() {
    
    
    SimbadPointer = {};

    SimbadPointer.MIRRORS = ['https://alasky.u-strasbg.fr/cgi/simbad-flat/simbad-quick.py', 'https://alaskybis.u-strasbg.fr/cgi/simbad-flat/simbad-quick.py']; // list of base URL for Simbad pointer service

    
    SimbadPointer.query = function(ra, dec, radiusDegrees, aladinInstance) {
        var coo = new Coo(ra, dec, 7);
        var params = {Ident: coo.format('s/'), SR: radiusDegrees}
        var successCallback = function(result) {
            aladinInstance.view.setCursor('pointer');

            var regexp = /(.*?)\/(.*?)\((.*?),(.*?)\)/g;
            var match = regexp.exec(result);
            if (match) {
                var objCoo = new Coo();
                objCoo.parse(match[1]);
                var objName = match[2];
                var title = '<div class="aladin-sp-title"><a target="_blank" href="http://simbad.u-strasbg.fr/simbad/sim-id?Ident=' + encodeURIComponent(objName) + '">' + objName + '</a></div>';
                var content = '<div class="aladin-sp-content">';
                content += '<em>Type: </em>' + match[4] + '<br>';
                var magnitude = match[3];
                if (Utils.isNumber(magnitude)) {
                    content += '<em>Mag: </em>' + magnitude + '<br>';
                }
                content += '<br><a target="_blank" href="http://cdsportal.u-strasbg.fr/?target=' + encodeURIComponent(objName) + '">Query in CDS portal</a>';
                content += '</div>';
                aladinInstance.showPopup(objCoo.lon, objCoo.lat, title, content);
            }
            else {
                aladinInstance.hidePopup();
            }
        };
        var failureCallback = function() {
            aladinInstance.view.setCursor('pointer');
            aladinInstance.hidePopup();
        };
        Utils.loadFromMirrors(SimbadPointer.MIRRORS, {data: params, onSuccess: successCallback, onFailure: failureCallback, timeout: 5});

    };

    return SimbadPointer;
})();
    
// Copyright 2013-2017 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Box
 *
 * A Box instance is a GUI element providing a div nested
 * in Aladin Lite parent div
 * 
 * Author: Thomas Boch [CDS]
 * 
 *****************************************************************************/
Box = (function() {

    // constructor
    var Box = function(properties) {

        this.$parentDiv = $('<div>');
        this.$parentDiv.addClass('aladin-box');

        properties = properties || {};

        this.css = properties.css || {padding: '4px'};

        this.position = properties.position || 'bottom'; // position can be bottom, left, top or right
        if (this.position=='right') {
            this.css['left'] = 'unset';
        }
        this.css[this.position] = '4px';

        this.contentCss = properties.contentCss || {};

        this.title = properties.title || undefined;

        this.content = properties.content || undefined;

        this.showHandler = properties.showHandler !== undefined ? properties.showHandler : true;

        this.openCallback = properties.openCallback || undefined; // callback called when the user opens the panel
        this.closeCallback = properties.closeCallback || undefined; // callback called when the user closes the panel

        this.changingDim = 'width';
        if (this.position=='top' || this.position=='bottom') {
            this.changingDim = 'height';
        }


        this.open = false;
        this._render();
        this.$parentDiv.show();
        this.open = true;
        this.hide();
    };

    Box.prototype = {

        show: function() {
            if (this.open) {
                return;
            }

            this.open = true;
            this.$parentDiv.show();
            this._updateChevron();

            if (this.changingDim=='width') {
                this.$parentDiv.find('.aladin-box-title-label').show();
            }
            var self = this;
            var options = {};
            options[this.changingDim] = 'show';
            var delay = this.changingDim=='width' ? 0 : 400;
            this.$parentDiv.find('.aladin-box-content').animate(options, delay, function() {
                self.css[self.position] = '4px';
                self.updateStyle(self.css);

                typeof self.openCallback === 'function' && self.openCallback();
            });

        },

        hide: function() {
            if (! this.open) {
                return;
            }

            this.open = false;
            this._updateChevron();

            if (this.changingDim=='width') {
                this.$parentDiv.find('.aladin-box-title-label').hide();
            }
            var self = this;
            var options = {};
            options[this.changingDim] = 'hide';
            var delay = this.changingDim=='width' ? 0 : 400;
            this.$parentDiv.find('.aladin-box-content').animate(options, delay, function() {
                self.css[self.position] = '0px';
                self.updateStyle(self.css);

                typeof self.closeCallback === 'function' && self.closeCallback();
            });
        },

        // complety hide parent div
        realHide: function() {
            this.open = false;
            this.$parentDiv.hide();
        },

        updateStyle: function(css) {
            this.css = css;
            this.$parentDiv.css(css);
        },

        setContent: function(content) {
            this.content = content;
            this._render();
        },

        setTitle: function(title) {
            this.title = title;
            this._render();
        },

        enable: function() {
            this.$parentDiv.enable();
        },

        disable: function() {
            this.$parentDiv.disable();
        },

        // fill $parentDiv with HTML corresponding to current state
        _render: function() {
            var self = this;

            this.$parentDiv.empty();
            this.$parentDiv.off();

            var titleDiv = $('<div class="aladin-box-title">');
            if (this.showHandler) {
                var chevron = $('<span class="aladin-chevron">');
                titleDiv.append(chevron);
            }
            if (this.title) {
                titleDiv.append(' <span class="aladin-box-title-label">' + this.title + '</span>');
            }
            this.$parentDiv.append(titleDiv);
            var $content = $('<div class="aladin-box-content">' + (this.content?this.content:'') + '</div>');
            $content.css(this.contentCss);
            this.$parentDiv.append($content);

            this._updateChevron();
            this.updateStyle(this.css);

            titleDiv.on('click', function() {
                if (self.open) {
                    self.hide();
                }
                else {
                    self.show();
                }
            });
        },

        _updateChevron: function() {
            this.$parentDiv.find('.aladin-chevron').removeClass().addClass('aladin-chevron ' + getChevronClass(this.position, this.open))
                                                        .attr('title', 'Click to ' + (this.open?'hide ':'show ') + (this.title?this.title:'') + ' panel');
        }
    };

    // return the jquery object corresponding to the given position and open/close state
    var getChevronClass = function(position, isOpen) {
        if (position=='top' && isOpen || position=='bottom' && !isOpen) {
            return 'aladin-chevron-up';
        }
        if (position=='bottom' && isOpen || position=='top' && !isOpen) {
            return 'aladin-chevron-down';
        }
        if (position=='right' && isOpen || position=='left' && !isOpen) {
            return 'aladin-chevron-right';
        }
        if (position=='left' && isOpen || position=='right' && !isOpen) {
            return 'aladin-chevron-left';
        }
        return '';
    };

    


    return Box;

})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



CooConversion = (function() {

    var CooConversion = {};
    
    CooConversion.GALACTIC_TO_J2000 = [
       -0.0548755604024359,  0.4941094279435681, -0.8676661489811610,
       -0.8734370902479237, -0.4448296299195045, -0.1980763734646737,
       -0.4838350155267381,  0.7469822444763707,  0.4559837762325372 ];
    
    CooConversion.J2000_TO_GALACTIC = [
        -0.0548755604024359, -0.873437090247923, -0.4838350155267381,
         0.4941094279435681, -0.4448296299195045, 0.7469822444763707,
        -0.8676661489811610, -0.1980763734646737, 0.4559837762325372 ];
    
    // adapted from www.robertmartinayers.org/tools/coordinates.html
    // radec : array of ra, dec in degrees
    // return coo in degrees
    CooConversion.Transform = function( radec, matrix ) {// returns a radec array of two elements
        radec[0] = radec[0]*Math.PI/180;
        radec[1] = radec[1]*Math.PI/180;
      var r0 = new Array ( 
       Math.cos(radec[0]) * Math.cos(radec[1]),
       Math.sin(radec[0]) * Math.cos(radec[1]),
       Math.sin(radec[1]) );
        
     var s0 = new Array (
       r0[0]*matrix[0] + r0[1]*matrix[1] + r0[2]*matrix[2], 
       r0[0]*matrix[3] + r0[1]*matrix[4] + r0[2]*matrix[5], 
       r0[0]*matrix[6] + r0[1]*matrix[7] + r0[2]*matrix[8] ); 
     
      var r = Math.sqrt ( s0[0]*s0[0] + s0[1]*s0[1] + s0[2]*s0[2] ); 
    
      var result = new Array ( 0.0, 0.0 );
      result[1] = Math.asin ( s0[2]/r ); // New dec in range -90.0 -- +90.0 
      // or use sin^2 + cos^2 = 1.0  
      var cosaa = ( (s0[0]/r) / Math.cos(result[1] ) );
      var sinaa = ( (s0[1]/r) / Math.cos(result[1] ) );
      result[0] = Math.atan2 (sinaa,cosaa);
      if ( result[0] < 0.0 ) result[0] = result[0] + 2*Math.PI;
    
        result[0] = result[0]*180/Math.PI;
        result[1] = result[1]*180/Math.PI;
      return result;
    };
    
    // coo : array of lon, lat in degrees
    CooConversion.GalacticToJ2000 = function(coo) {
        return CooConversion.Transform(coo, CooConversion.GALACTIC_TO_J2000);
    };
    // coo : array of lon, lat in degrees
    CooConversion.J2000ToGalactic = function(coo) {
        return CooConversion.Transform(coo, CooConversion.J2000_TO_GALACTIC);
    };
    return CooConversion;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Sesame.js
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Sesame = (function() {
    Sesame = {};
    
    Sesame.cache = {};

    Sesame.SESAME_URL = "http://cds.u-strasbg.fr/cgi-bin/nph-sesame.jsonp";

    /** find RA, DEC for any target (object name or position)
     *  if successful, callback is called with an object {ra: <ra-value>, dec: <dec-value>}
     *  if not successful, errorCallback is called
     */
    Sesame.getTargetRADec = function(target, callback, errorCallback) {
        if (!callback) {
            return;
        }
        var isObjectName = /[a-zA-Z]/.test(target);

        // try to parse as a position
        if ( ! isObjectName) {
            var coo = new Coo();

            coo.parse(target);
            if (callback) {
                callback({ra: coo.lon, dec: coo.lat});
            }
        }
        // ask resolution by Sesame
        else {
            Sesame.resolve(target,
                   function(data) { // success callback
                       callback({ra:  data.Target.Resolver.jradeg,
                                 dec: data.Target.Resolver.jdedeg});
                   },

                   function(data) { // error callback
                       if (errorCallback) {
                           errorCallback();
                       }
                   }
           );
        }
    };
    
    Sesame.resolve = function(objectName, callbackFunctionSuccess, callbackFunctionError) {
        var sesameUrl = Sesame.SESAME_URL;
        if (Utils.isHttpsContext()) {
            sesameUrl = sesameUrl.replace('http://', 'https://')
        }
            

        $.ajax({
            url: sesameUrl ,
            data: {"object": objectName},
            method: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                if (data.Target && data.Target.Resolver && data.Target.Resolver) {
                    callbackFunctionSuccess(data);
                }
                else {
                    callbackFunctionError(data);
                }
            },
            error: callbackFunctionError
            });
    };
    
    return Sesame;
})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File HealpixCache
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

// class holding some HEALPix computations for better performances
//
// it is made of :
// - a static cache for HEALPix corners at nside=8 
// - a dynamic cache for 
HealpixCache = (function() {

    var HealpixCache = {};
    
    HealpixCache.staticCache = {corners: {nside8: []}};
    // TODO : utilisation du dynamicCache
    HealpixCache.dynamicCache = {};
    
    HealpixCache.lastNside = 8;
    
    HealpixCache.hpxIdxCache = null;
    
    // TODO : conserver en cache le dernier rÃ©sultat ?
    
    HealpixCache.init = function() {
    	// pre-compute corners position for nside=8
    	var hpxIdx = new HealpixIndex(8);
    	hpxIdx.init();
    	var npix = HealpixIndex.nside2Npix(8);
        var corners;
    	for (var ipix=0; ipix<npix; ipix++) {
            corners =  hpxIdx.corners_nest(ipix, 1);
    		HealpixCache.staticCache.corners.nside8.push(corners);
    	}
    	
    	HealpixCache.hpxIdxCache = hpxIdx;
    };

    HealpixCache.init();
    
    HealpixCache.corners_nest = function(ipix, nside) {
    	if (nside==8) {
    		return HealpixCache.staticCache.corners.nside8[ipix];
    	}
    	
    	if (nside != HealpixCache.lastNside) {
    		HealpixCache.hpxIdxCache = new HealpixIndex(nside);
    		HealpixCache.hpxIdxCache.init();
    		HealpixCache.lastNside = nside;
    	}
    	
    	return HealpixCache.hpxIdxCache.corners_nest(ipix, 1);
    	
    };
    
    return HealpixCache;
})();
	
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//




/******************************************************************************
 * Aladin Lite project
 * 
 * File Utils
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Utils = Utils || {};

Utils.cssScale = undefined;
// adding relMouseCoords to HTMLCanvasElement prototype (see http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element ) 
function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;
   
    if (event.offsetX) {
        return {x: event.offsetX, y:event.offsetY};
    } 
    else {
        if (!Utils.cssScale) {
            var st = window.getComputedStyle(document.body, null);
            var tr = st.getPropertyValue("-webkit-transform") ||
                    st.getPropertyValue("-moz-transform") ||
                    st.getPropertyValue("-ms-transform") ||
                    st.getPropertyValue("-o-transform") ||
                    st.getPropertyValue("transform");
            var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
            var matches = tr.match(matrixRegex);
            if (matches) {
                Utils.cssScale = parseFloat(matches[1]);
            }
            else {
                Utils.cssScale = 1;
            }
        }
        var e = event;
        var canvas = e.target;
        // http://www.jacklmoore.com/notes/mouse-position/
        var target = e.target || e.srcElement;
        var style = target.currentStyle || window.getComputedStyle(target, null);
        var borderLeftWidth = parseInt(style['borderLeftWidth'], 10);
        var borderTopWidth = parseInt(style['borderTopWidth'], 10);
        var rect = target.getBoundingClientRect();

        var clientX = e.clientX;
        var clientY = e.clientY;
        if (e.clientX) {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        else {
            clientX = e.originalEvent.changedTouches[0].clientX;
            clientY = e.originalEvent.changedTouches[0].clientY;
        }

        var offsetX = clientX - borderLeftWidth - rect.left;
        var offsetY = clientY - borderTopWidth - rect.top

        return {x: parseInt(offsetX/Utils.cssScale), y: parseInt(offsetY/Utils.cssScale)};
    }
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;



//Function.prototype.bind polyfill from 
//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var slice = [].slice,
        args = slice.call(arguments, 1),
        self = this,
        nop = function () { },
        bound = function () {
            return self.apply(this instanceof nop ? this : (obj || {}),
                    args.concat(slice.call(arguments)));
        };

        bound.prototype = this.prototype;

        return bound;
    };
}








$ = $ || jQuery;

/* source : http://stackoverflow.com/a/8764051 */
$.urlParam = function(name, queryString){
    if (queryString===undefined) {
        queryString = location.search;
    }
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(queryString)||[,""])[1].replace(/\+/g, '%20'))||null;
};

/* source: http://stackoverflow.com/a/1830844 */
Utils.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

Utils.isInt = function(n) {
    return Utils.isNumber(n) && Math.floor(n)==n;
};

/* a debounce function, used to prevent multiple calls to the same function if less than delay milliseconds have passed */
Utils.debounce = function(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
};

/* return a throttled function, to rate limit the number of calls (by default, one call every 250 milliseconds) */
Utils.throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


/* A LRU cache, inspired by https://gist.github.com/devinus/409353#file-gistfile1-js */
// TODO : utiliser le LRU cache pour les tuiles images
Utils.LRUCache = function (maxsize) {
    this._keys = [];
    this._items = {};
    this._expires = {};
    this._size = 0;
    this._maxsize = maxsize || 1024;
};
   
Utils.LRUCache.prototype = {
        set: function (key, value) {
            var keys = this._keys,
                items = this._items,
                expires = this._expires,
                size = this._size,
                maxsize = this._maxsize;

            if (size >= maxsize) { // remove oldest element when no more room
                keys.sort(function (a, b) {
                    if (expires[a] > expires[b]) return -1;
                    if (expires[a] < expires[b]) return 1;
                    return 0;
                });

                size--;
                delete expires[keys[size]];
                delete items[keys[size]];
            }

            keys[size] = key;
            items[key] = value;
            expires[key] = Date.now();
            size++;

            this._keys = keys;
            this._items = items;
            this._expires = expires;
            this._size = size;
        },

        get: function (key) {
            var item = this._items[key];
            if (item) this._expires[key] = Date.now();
            return item;
        },
        
        keys: function() {
            return this._keys;
        }
};

////////////////////////////////////////////////////////////////////////////:

/**
  Make an AJAX call, given a list of potential mirrors
  First successful call will result in options.onSuccess being called back
  If all calls fail, onFailure is called back at the end

  This method assumes the URL are CORS-compatible, no proxy will be used
 */
Utils.loadFromMirrors = function(urls, options) {
    var data    = options && options.data || null;
    var method = options && options.method || 'GET';
    var dataType = options && options.dataType || null;
    var timeout = options && options.timeout || 20;

    var onSuccess = options && options.onSuccess || null;
    var onFailure = options && options.onFailure || null;

    if (urls.length === 0) {
        (typeof onFailure === 'function') && onFailure();
    }
    else {
        var ajaxOptions = {
            url: urls[0],
            data: data
        }
        if (dataType) {
            ajaxOptions.dataType = dataType;
        }

        $.ajax(ajaxOptions)
        .done(function(data) {
            (typeof onSuccess === 'function') && onSuccess(data);
        })
        .fail(function() {
             Utils.loadFromMirrors(urls.slice(1), options);
        });
    }
} 

// return the jquery ajax object configured with the requested parameters
// by default, we use the proxy (safer, as we don't know if the remote server supports CORS)
Utils.getAjaxObject = function(url, method, dataType, useProxy) {
        if (useProxy!==false) {
            useProxy = true;
        }

        if (useProxy===true) {
            var urlToRequest = Aladin.JSONP_PROXY + '?url=' + encodeURIComponent(url);
        }
        else {
            urlToRequest = url;
        }
        method = method || 'GET';
        dataType = dataType || null;

        return $.ajax({
            url: urlToRequest,
            method: method,
            dataType: dataType
        }); 
};

// return true if script is executed in a HTTPS context
// return false otherwise
Utils.isHttpsContext = function() {
    return ( window.location.protocol === 'https:' );
};

// generate an absolute URL from a relative URL
// example: getAbsoluteURL('foo/bar/toto') return http://cds.unistra.fr/AL/foo/bar/toto if executed from page http://cds.unistra.fr/AL/
Utils.getAbsoluteURL = function(url) {
    var a = document.createElement('a');
    a.href = url;

    return a.href;
};

// generate a valid v4 UUID
Utils.uuidv4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File URLBuilder
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/


URLBuilder = (function() {    

    URLBuilder = {
        buildSimbadCSURL: function(target, radiusDegrees) {
            if (target && (typeof target  === "object")) {
                if ('ra' in target && 'dec' in target) {
                    var coo = new Coo(target.ra, target.dec, 7);
                    target = coo.format('s');
                }
            }
            return 'https://alasky.unistra.fr/cgi/simbad-flat/simbad-cs.py?target=' + encodeURIComponent(target) + '&SR=' + radiusDegrees + '&format=votable&SRUNIT=deg&SORTBY=nbref';
        },

        buildNEDPositionCSURL: function(ra, dec, radiusDegrees) {
                return 'https://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?search_type=Near+Position+Search&of=xml_main&RA=' + ra + '&DEC=' + dec + '&SR=' + radiusDegrees;
        },

        buildNEDObjectCSURL: function(object, radiusDegrees) {
                return 'https://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?search_type=Near+Name+Search&radius=' + (60 * radiusDegrees) + '&of=xml_main&objname=' + object;
        },

        buildVizieRCSURL: function(vizCatId, target, radiusDegrees, options) {
            if (target && (typeof target  === "object")) {
                if ('ra' in target && 'dec' in target) {
                    var coo = new Coo(target.ra, target.dec, 7);
                    target = coo.format('s');
                }
            }
            
            var maxNbSources = 1e5;
            if (options && options.hasOwnProperty('limit') && Utils.isNumber(options.limit)) {
                maxNbSources = parseInt(options.limit);
            }
            return 'https://vizier.unistra.fr/viz-bin/votable?-source=' + vizCatId + '&-c=' + encodeURIComponent(target) + '&-out.max=' + maxNbSources + '&-c.rd=' + radiusDegrees;
        },

        buildSkyBotCSURL: function(ra, dec, radius, epoch, queryOptions) {
            var url = 'http://vo.imcce.fr/webservices/skybot/skybotconesearch_query.php?-from=AladinLite';
            url += '&RA=' + encodeURIComponent(ra);
            url += '&DEC=' + encodeURIComponent(dec);
            url += '&SR=' + encodeURIComponent(radius);
            url += '&EPOCH=' + encodeURIComponent(epoch);

            if (queryOptions) {
                for (var key in queryOptions) {
                    if (queryOptions.hasOwnProperty(key)) {
                            url += '&' + key + '=' + encodeURIComponent(queryOptions[key]);
                    }
                }
            }

            return url;
        }
    

    };

    return URLBuilder;
    
})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File MeasurementTable
 *
 * Graphic object showing measurement of a catalog
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

MeasurementTable = (function() {


    // constructor
    MeasurementTable = function(aladinLiteDiv) {
        this.isShowing = false;

        this.divEl = $('<div class="aladin-measurement-div"></div>');
        
        $(aladinLiteDiv).append(this.divEl);
    }

    // show measurement associated with a given source
    MeasurementTable.prototype.showMeasurement = function(source) {
        this.divEl.empty();
        var header = '<thead><tr>';
        var content = '<tr>';
        for (key in source.data) {
            header += '<th>' + key + '</th>';
            content += '<td>' + source.data[key] + '</td>';
        }
        header += '</tr></thead>';
        content += '</tr>';
        this.divEl.append('<table>' + header + content + '</table>');
        this.show();
    };

    MeasurementTable.prototype.show = function() {
        this.divEl.show();
    };
    
    MeasurementTable.prototype.hide = function() {
        this.divEl.hide();
    };
    
    
    return MeasurementTable;
})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Color
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Color = (function() {


    Color = {};
    
    Color.curIdx = 0;
    Color.colors = ['#ff0000', '#0000ff', '#99cc00', '#ffff00','#000066', '#00ffff', '#9900cc', '#0099cc', '#cc9900', '#cc0099', '#00cc99', '#663333', '#ffcc9a', '#ff9acc', '#ccff33', '#660000', '#ffcc33', '#ff00ff', '#00ff00', '#ffffff'];

    
    Color.getNextColor = function() {
        var c = Color.colors[Color.curIdx % (Color.colors.length)];
        Color.curIdx++;
        return c;
    };

    /** return most suited (ie readable) color for a label, given a background color
     * bkgdColor: color, given as a 'rgb(<r value>, <g value>, <v value>)' . This is returned by $(<element>).css('background-color')
     * 
     * example call: Color.getLabelColorForBackground('rgb(3, 123, 42)')
     * adapted from http://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
     */
    Color.getLabelColorForBackground = function(rgbBkgdColor) {
        var lightLabel = '#eee' 
        var darkLabel = '#111' 
        rgb = rgbBkgdColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (rgb==null) {
            // we return the dark label color if we can't parse the color
            return darkLabel
        }
        r = parseInt(rgb[1]);
        g = parseInt(rgb[2]);
        b = parseInt(rgb[3]);
        
        var d = 0;
        // Counting the perceptive luminance - human eye favors green color... 
        var a = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (a < 0.5) {
            return darkLabel; // bright color --> dark font
        }
        else {
            return lightLabel; // dark color --> light font
        }
    };
    
    return Color;
})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File AladinUtils
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/
AladinUtils = (function() {

    return {
    	/**
    	 * passage de xy projection Ã  xy dans la vue Ã©cran 
    	 * @param x
    	 * @param y
    	 * @param width
    	 * @param height
    	 * @param largestDim largest dimension of the view
    	 * @returns position in the view
    	 */
    	xyToView: function(x, y, width, height, largestDim, zoomFactor, round) {
    	    if (round==undefined) {
                // we round by default
    	        round = true;
    	    }

    	    if (round) {
    	        // we round the result for potential performance gains
    	        return {vx: AladinUtils.myRound(largestDim/2*(1+zoomFactor*x)-(largestDim-width)/2), vy: AladinUtils.myRound(largestDim/2*(1+zoomFactor*y)-(largestDim-height)/2)};

    	    }
    	    else {
                return {vx: largestDim/2*(1+zoomFactor*x)-(largestDim-width)/2, vy: largestDim/2*(1+zoomFactor*y)-(largestDim-height)/2};
    	    }
    	},
    	
    	/**
    	 * passage de xy dans la vue Ã©cran Ã  xy projection
    	 * @param vx
    	 * @param vy
    	 * @param width
    	 * @param height
    	 * @param largestDim
    	 * @param zoomFactor
    	 * @returns position in xy projection
    	 */
    	viewToXy: function(vx, vy, width, height, largestDim, zoomFactor) {
    		return {x: ((2*vx+(largestDim-width))/largestDim-1)/zoomFactor, y: ((2*vy+(largestDim-height))/largestDim-1)/zoomFactor};
    	},

    	/**
    	 * convert a 
    	 * @returns position x,y in the view. Null if projection is impossible
    	 */
        radecToViewXy: function(ra, dec, currentProjection, currentFrame, width, height, largestDim, zoomFactor) {
            var xy;
            if (currentFrame.system != CooFrameEnum.SYSTEMS.J2000) {
                var lonlat = CooConversion.J2000ToGalactic([ra, dec]);
                xy = currentProjection.project(lonlat[0], lonlat[1]);
            }
            else {
                xy = currentProjection.project(ra, dec);
            }
            if (!xy) {
                return null;
            }
            
            return AladinUtils.xyToView(xy.X, xy.Y, width, height, largestDim, zoomFactor, false);
        },

    	
    	myRound: function(a) {
    		if (a<0) {
    			return -1*( (-a) | 0);
    		}
    		else {
    			return a | 0;
    		}
    	},
    	
    	
    	
    	/**
    	 * tests whether a healpix pixel is visible or not
    	 * @param pixCorners array of position (xy view) of the corners of the pixel
    	 * @param viewW
    	 */
    	isHpxPixVisible: function(pixCorners, viewWidth, viewHeight) {
    		for (var i = 0; i<pixCorners.length; i++) {
    			if ( pixCorners[i].vx>=-20 && pixCorners[i].vx<(viewWidth+20) &&
    				 pixCorners[i].vy>=-20 && pixCorners[i].vy<(viewHeight+20) ) {
    				return true;
    			}
    		}
    		return false;
    	},
    	
    	ipixToIpix: function(npixIn, norderIn, norderOut) {
    		var npixOut = [];
    		if (norderIn>=norderOut) {
    		}
    	},
        
        getZoomFactorForAngle: function(angleInDegrees, projectionMethod) {
            var p1 = {ra: 0, dec: 0};
            var p2 = {ra: angleInDegrees, dec: 0};
            var projection = new Projection(angleInDegrees/2, 0);
            projection.setProjection(projectionMethod);
            var p1Projected = projection.project(p1.ra, p1.dec);
            var p2Projected = projection.project(p2.ra, p2.dec);
           
            var zoomFactor = 1/Math.abs(p1Projected.X - p2Projected.Y);

            return zoomFactor;
        },

        // grow array b of vx,vy view positions by *val* pixels
        grow2: function(b, val) {
            var j=0;
            for ( var i=0; i<4; i++ ) {
                if ( b[i]==null ) {
                    j++;
                }
            }

            if( j>1 ) {
                return b;
            }

            var b1 = [];
            for ( var i=0; i<4; i++ ) {
                b1.push( {vx: b[i].vx, vy: b[i].vy} );
            }
    
            for ( var i=0; i<2; i++ ) {
                var a = i==1 ? 1 : 0;
                var c = i==1 ? 3 : 2;

                if ( b1[a]==null ) {
                    var d,g;
                    if ( a==0 || a==3 ) {
                        d=1;
                        g=2;
                    }
                    else {
                        d=0;
                        g=3;
                    }
                    b1[a] = {vx: (b1[d].vx+b1[g].vx)/2, vy: (b1[d].vy+b1[g].vy)/2};
                }
                if ( b1[c]==null ) {
                    var d,g;
                    if ( c==0 || c==3 ) {
                        d=1;
                        g=2;
                    }
                    else {
                        d=0;
                        g=3;
                    }
                    b1[c] = {vx: (b1[d].vx+b1[g].vx)/2, vy: (b1[d].vy+b1[g].vy)/2};
                }
                if( b1[a]==null || b1[c]==null ) {
                    continue;
                }

                var angle = Math.atan2(b1[c].vy-b1[a].vy, b1[c].vx-b1[a].vx);
                var chouilla = val*Math.cos(angle);
                b1[a].vx -= chouilla;
                b1[c].vx += chouilla;
                chouilla = val*Math.sin(angle);
                b1[a].vy-=chouilla;
                b1[c].vy+=chouilla;
            }
            return b1;
        },

        // SVG icons templates are stored here rather than in a CSS, as to allow
        // to dynamically change the fill color
        // Pretty ugly, haven't found a prettier solution yet
        //
        // TODO: store this in the Stack class once it will exist
        //
        SVG_ICONS: {
            CATALOG: '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="1,0,5,0,5,3,1,3"  fill="FILLCOLOR" /><polygon points="7,0,9,0,9,3,7,3"  fill="FILLCOLOR" /><polygon points="10,0,12,0,12,3,10,3"  fill="FILLCOLOR" /><polygon points="13,0,15,0,15,3,13,3"  fill="FILLCOLOR" /><polyline points="1,5,5,9"  stroke="FILLCOLOR" /><polyline points="1,9,5,5" stroke="FILLCOLOR" /><line x1="7" y1="7" x2="15" y2="7" stroke="FILLCOLOR" stroke-width="2" /><polyline points="1,11,5,15"  stroke="FILLCOLOR" /><polyline points="1,15,5,11"  stroke="FILLCOLOR" /><line x1="7" y1="13" x2="15" y2="13" stroke="FILLCOLOR" stroke-width="2" /></svg>',
            MOC: '<svg xmlns="http://www.w3.org/2000/svg"><polyline points="0.5,7,2.5,7,2.5,5,7,5,7,3,10,3,10,5,13,5,13,7,15,7,15,9,13,9,13,12,10,12,10,14,7,14,7,12,2.5,12,2.5,10,0.5,10,0.5,7" stroke-width="1" stroke="FILLCOLOR" fill="transparent" /><line x1="1" y1="10" x2="6" y2="5" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="2" y1="12" x2="10" y2="4" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="5" y1="12" x2="12" y2="5" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="7" y1="13" x2="13" y2="7" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="10" y1="13" x2="13" y2="10" stroke="FILLCOLOR" stroke-width="0.5" /></svg>',
            OVERLAY: '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="10,5,10,1,14,1,14,14,2,14,2,9,6,9,6,5" fill="transparent" stroke="FILLCOLOR" stroke-width="2"/></svg>'
        }
 
    };

})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File CooFrameEnum
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/
 
 ProjectionEnum = {
    SIN: Projection.PROJ_SIN,
    AITOFF:  Projection.PROJ_AITOFF
 };
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File CooFrameEnum
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/
 
CooFrameEnum = (function() {

    var systems = {J2000: 'J2000', GAL: 'Galactic'};
    return {
        SYSTEMS: systems,

        J2000: {label: "J2000", system: systems.J2000},
        J2000d: {label: "J2000d", system: systems.J2000},
        GAL:  {label: "Galactic", system: systems.GAL}
    };
 
})();



CooFrameEnum.fromString = function(str, defaultValue) {
    if (! str) {
        return defaultValue ? defaultValue : null;
    }
    
    str = str.toLowerCase().replace(/^\s+|\s+$/g, ''); // convert to lowercase and trim
    
    if (str.indexOf('j2000d')==0 || str.indexOf('icrsd')==0) {
        return CooFrameEnum.J2000d;
    }
    else if (str.indexOf('j2000')==0 || str.indexOf('icrs')==0) {
        return CooFrameEnum.J2000;
    }
    else if (str.indexOf('gal')==0) {
        return CooFrameEnum.GAL;
    }
    else {
        return defaultValue ? defaultValue : null;
    }
};

// Copyright 2013-2017 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File HiPSDefinition
 * 
 * Author: Thomas Boch [CDS]
 * 
 *****************************************************************************/
HiPSDefinition = (function() {

    // constructor
    var HiPSDefinition = function(properties) {
        this.properties = properties; // key-value object corresponding to the properties file

        this.id = this.getID();
        this.obsTitle = properties['obs_title'];
        this.frame = properties['hips_frame'];
        this.order = parseInt(properties['hips_order']);
        this.clientSortKey = properties['client_sort_key'];
        this.tileFormats = properties.hasOwnProperty('hips_tile_format') && properties['hips_tile_format'].split(' ');
        this.urls = [];
        this.urls.push(properties['hips_service_url']);
        var k = 1;
        while (properties.hasOwnProperty('hips_service_url_' + k)) {
            this.urls.push(properties['hips_service_url_' + k]);
            k++;
        }

        this.clientApplications = properties['client_application'];
    };

    HiPSDefinition.prototype = {

        getServiceURLs: function(httpsOnly) {
            httpsOnly = httpsOnly === true;

            // TODO: TO BE COMPLETED
        },

        // return the ID according to the properties
        getID: function() {
            // ID is explicitely given
            if (this.properties.hasOwnProperty('ID')) {
                return this.properties['ID'];
            }

            var id = null;
            // ID might be built from different fields
            if (this.properties.hasOwnProperty('creator_did')) {
                id = this.properties['creator_did'];
            }
            if (id==null && this.properties.hasOwnProperty('publisher_did')) {
                id = this.properties['publisher_did'];
            }

            if (id != null) {
                // remove ivo:// prefix
                if (id.slice(0, 6) === 'ivo://') {
                    id = id.slice(6);
                }

                // '?' are replaced by '/'
                id = id.replace(/\?/g, '/')
            }

            return id;
        }



    };

    // cache (at the source code level) of the list of HiPS
    // this is the result to a query to http://alasky.u-strasbg.fr/MocServer/query?dataproduct_type=image&client_application=AladinLite&fmt=json&fields=ID,obs_title,client_sort_key,client_application,hips_service_url*,hips_order,hips_tile_format,hips_frame
    var AL_CACHE_CLASS_LEVEL = [{
    "ID": "CDS/P/2MASS/color",
    "obs_title": "2MASS color J (1.23 microns), H (1.66 microns), K (2.16 microns)",
    "client_sort_key": "04-001-00",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/2MASS/Color",
    "hips_service_url_1": "http://alaskybis.unistra.fr/2MASS/Color",
    "hips_service_url_2": "https://alaskybis.unistra.fr/2MASS/Color"
    }, {
    "ID": "CDS/P/AKARI/FIS/Color",
    "obs_title": "AKARI Far-infrared All-Sky Survey - color composition WideL/WideS/N60",
    "client_sort_key": "04-05-00",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "5",
    "hips_frame": "equatorial",
    "hips_tile_format": "png jpeg",
    "hips_service_url": "http://alasky.unistra.fr/AKARI-FIS/ColorLSN60",
    "hips_service_url_1": "http://alaskybis.unistra.fr/AKARI-FIS/ColorLSN60",
    "hips_service_url_2": "https://alaskybis.unistra.fr/AKARI-FIS/ColorLSN60"
    }, {
    "ID": "CDS/P/DECaLS/DR3/color",
    "obs_title": "DECaLS DR3 color",
    "hips_frame": "equatorial",
    "hips_order": "11",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/DECaLS/DR3/color"
}, {
    "ID": "CDS/P/DSS2/blue",
    "obs_title": "DSS2 Blue (XJ+S)",
    "client_sort_key": "03-01-03",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg fits",
    "hips_service_url": "http://alasky.unistra.fr/DSS/DSS2-blue-XJ-S",
    "hips_service_url_1": "http://alaskybis.unistra.fr/DSS/DSS2-blue-XJ-S",
    "hips_service_url_2": "https://alaskybis.unistra.fr/DSS/DSS2-blue-XJ-S",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/DSS2Blue"
}, {
    "ID": "CDS/P/DSS2/color",
    "obs_title": "DSS colored",
    "client_sort_key": "03-00",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/DSS/DSSColor",
    "hips_service_url_1": "http://alaskybis.unistra.fr/DSS/DSSColor",
    "hips_service_url_2": "https://alaskybis.unistra.fr/DSS/DSSColor",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/DSSColorNew",
    "hips_service_url_4": "http://skies.esac.esa.int/DSSColor/"
}, {
    "ID": "CDS/P/DSS2/red",
    "obs_title": "DSS2 Red (F+R)",
    "client_sort_key": "03-01-02",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg fits",
    "hips_service_url": "http://alasky.unistra.fr/DSS/DSS2Merged",
    "hips_service_url_1": "http://alaskybis.unistra.fr/DSS/DSS2Merged",
    "hips_service_url_2": "https://alaskybis.unistra.fr/DSS/DSS2Merged",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/DSS2Merged"
}, {
    "ID": "P/PanSTARRS/DR1/g",
    "hips_service_url": "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/g",
    "obs_title": "PanSTARRS DR1 g",
    "hips_order": 11,
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg fits"
}, {
    "ID": "CDS/P/Fermi/color",
    "obs_title": "Fermi Color HEALPix survey",
    "client_sort_key": "00-01-01",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "3",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/Fermi/Color",
    "hips_service_url_1": "http://alaskybis.unistra.fr/Fermi/Color",
    "hips_service_url_2": "https://alaskybis.unistra.fr/Fermi/Color"
}, {
    "ID": "CDS/P/Finkbeiner",
    "obs_title": "Finkbeiner Halpha composite survey",
    "client_sort_key": "06-01",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "3",
    "hips_frame": "galactic",
    "hips_tile_format": "jpeg fits",
    "hips_service_url": "http://alasky.unistra.fr/FinkbeinerHalpha",
    "hips_service_url_1": "http://alaskybis.unistra.fr/FinkbeinerHalpha",
    "hips_service_url_2": "https://alaskybis.unistra.fr/FinkbeinerHalpha"
}, {
    "ID": "CDS/P/GALEXGR6/AIS/color",
    "obs_title": "GALEX GR6 AIS (until March 2014)- Color composition",
    "client_sort_key": "02-01-01",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "8",
    "hips_frame": "equatorial",
    "hips_tile_format": "png jpeg",
    "hips_service_url": "http://alasky.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
    "hips_service_url_1": "http://alaskybis.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
    "hips_service_url_2": "https://alaskybis.unistra.fr/GALEX/GR6-03-2014/AIS-Color"
}, {
    "ID": "CDS/P/IRIS/color",
    "obs_title": "IRAS-IRIS HEALPix survey, color",
    "client_sort_key": "04-02-01",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "3",
    "hips_frame": "galactic",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/IRISColor",
    "hips_service_url_1": "http://alaskybis.unistra.fr/IRISColor",
    "hips_service_url_2": "https://alaskybis.unistra.fr/IRISColor",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/IRISColor",
    "hips_service_url_4": "http://skies.esac.esa.int/IRISColor/"
}, {
    "ID": "CDS/P/Mellinger/color",
    "obs_title": "Mellinger optical survey, color",
    "client_sort_key": "03-03",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "4",
    "hips_frame": "galactic",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/MellingerRGB",
    "hips_service_url_1": "http://alaskybis.unistra.fr/MellingerRGB",
    "hips_service_url_2": "https://alaskybis.unistra.fr/MellingerRGB"
}, {
    "ID": "CDS/P/SDSS9/color",
    "obs_title": "SDSS 9 color",
    "client_sort_key": "03-02-01",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "10",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/SDSS/DR9/color",
    "hips_service_url_1": "http://alaskybis.unistra.fr/SDSS/DR9/color",
    "hips_service_url_2": "https://alaskybis.unistra.fr/SDSS/DR9/color",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/SDSS9Color",
    "hips_service_url_4": "http://skies.esac.esa.int/SDSS9Color/"
}, {
    "ID": "CDS/P/SPITZER/color",
    "obs_title": "IRAC HEALPix survey, color",
    "client_sort_key": "04-03-00",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "galactic",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/SpitzerI1I2I4color",
    "hips_service_url_1": "http://alaskybis.unistra.fr/SpitzerI1I2I4color",
    "hips_service_url_2": "https://alaskybis.unistra.fr/SpitzerI1I2I4color",
    "hips_service_url_3": "http://healpix.ias.u-psud.fr/SPITZERColor"
}, {
    "ID": "CDS/P/allWISE/color",
    "obs_title": "AllWISE color  Red (W4) , Green (W2) , Blue (W1) from raw Atlas Images",
    "client_sort_key": "04-003-00",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "8",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://alasky.unistra.fr/AllWISE/RGB-W4-W2-W1",
    "hips_service_url_1": "http://alaskybis.unistra.fr/AllWISE/RGB-W4-W2-W1",
    "hips_service_url_2": "https://alaskybis.unistra.fr/AllWISE/RGB-W4-W2-W1"
}, {
    "ID": "IPAC/P/GLIMPSE360",
    "obs_title": "GLIMPSE360: Spitzer's Infrared Milky Way",
    "client_sort_key": "04-03-0",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "9",
    "hips_frame": "equatorial",
    "hips_tile_format": "jpeg",
    "hips_service_url": "http://www.spitzer.caltech.edu/glimpse360/aladin/data"
}, {
    "ID": "JAXA/P/MAXI_SSC_SUM",
    "hips_tile_format": "png",
    "hips_frame": "equatorial",
    "obs_title": "MAXI SSC all-sky image integrated for 4.5 years",
    "hips_order": "6",
    "hips_service_url": "http://darts.isas.jaxa.jp/pub/judo2/HiPS/maxi_ssc_sum",
    "hips_service_url_1": "http://alasky.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM",
    "hips_service_url_2": "http://alaskybis.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM",
    "hips_service_url_3": "https://alaskybis.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM"
}, {
    "ID": "JAXA/P/SWIFT_BAT_FLUX",
    "hips_tile_format": "png",
    "hips_frame": "equatorial",
    "obs_title": "Swift-BAT 70-month all-sray hard X-ray survey image",
    "hips_order": "6",
    "hips_service_url": "http://darts.isas.jaxa.jp/pub/judo2/HiPS/swift_bat_flux/",
    "hips_service_url_1": "http://alasky.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX",
    "hips_service_url_2": "http://alaskybis.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX",
    "hips_service_url_3": "https://alaskybis.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX"
}, {
    "ID": "ov-gso/P/VTSS/Ha",
    "obs_title": "Virginia Tech Spectral-Line Survey (VTSS) - Halpha image",
    "client_sort_key": "06-xx",
    "client_application":[ "AladinLite", "AladinDesktop"],
    "hips_order": "3",
    "hips_frame": ["galactic", "galactic"],
    "hips_tile_format": "png jpeg fits",
    "hips_service_url": "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/VTSS",
    "hips_service_url_1": "http://alasky.unistra.fr/IRAP/VTSS",
    "hips_service_url_2": "http://alaskybis.unistra.fr/IRAP/VTSS",
    "hips_service_url_3": "https://alaskybis.unistra.fr/IRAP/VTSS"
}, {
    "ID": "xcatdb/P/XMM/EPIC",
    "obs_title": "XMM-Newton stacked EPIC images",
    "hips_frame": "equatorial",
    "hips_order": "7",
    "hips_service_url": "http://saada.u-strasbg.fr/xmmallsky",
    "hips_tile_format": "png fits",
    "hips_service_url_1": "http://alasky.unistra.fr/SSC/xmmallsky",
    "hips_service_url_2": "http://alaskybis.unistra.fr/SSC/xmmallsky",
    "hips_service_url_3": "https://alaskybis.unistra.fr/SSC/xmmallsky"
}, {
    "ID": "xcatdb/P/XMM/PN/color",
    "obs_title": "False color X-ray images (Red=0.5-1 Green=1-2 Blue=2-4.5)Kev",
    "hips_order": "7",
    "hips_frame": "equatorial",
    "hips_tile_format": "png jpeg",
    "hips_service_url": "http://saada.unistra.fr/PNColor",
    "hips_service_url_1": "http://alasky.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color",
    "hips_service_url_2": "http://alaskybis.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color",
    "hips_service_url_3": "https://alaskybis.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color"
}];

    var listHipsProperties = []; // this variable stores our current knowledge

    HiPSDefinition.LOCAL_STORAGE_KEY = 'aladin:hips-list';
    
    var RETRIEVAL_TIMESTAMP_KEY = '_timestamp_retrieved';
    var LAST_URL_KEY = '_last_used_url'; // URL previousy used to retrieve data from this HiPS
    // retrieve definitions previousy stored in local storage
    // @return an array with the HiPS definitions, empty array if nothing found or if an error occured
    HiPSDefinition.getLocalStorageDefinitions = function() {
        try {
            var defs = window.localStorage.getItem(HiPSDefinition.LOCAL_STORAGE_KEY);
            return defs === null ? [] : window.JSON.parse(defs);
        }
        catch(e) {
            console.error(e);
            return [];
        }
    };

    // store in local storage a list of HiPSDefinition objects
    // @return true if storage was successful
    HiPSDefinition.storeInLocalStorage = function(properties) {
        try {
            window.localStorage.setItem(HiPSDefinition.LOCAL_STORAGE_KEY, window.JSON.stringify(properties));
        }
        catch(e) {
            console.error(e);
            return false;
        }

        return true;
    };

    var MOCSERVER_MIRRORS_HTTP = ['http://alasky.u-strasbg.fr/MocServer/query', 'http://alaskybis.u-strasbg.fr/MocServer/query']; // list of base URL for MocServer mirrors, available in HTTP
    var MOCSERVER_MIRRORS_HTTPS = ['https://alasky.u-strasbg.fr/MocServer/query', 'https://alaskybis.unistra.fr/MocServer/query']; // list of base URL for MocServer mirrors, available in HTTPS

    // get HiPS definitions, by querying the MocServer
    // return data as dict-like objects
    HiPSDefinition.getRemoteDefinitions = function(params, successCallbackFn, failureCallbackFn) {
        var params = params || {client_application: 'AladinLite'}; // by default, retrieve only HiPS tagged "Aladin Lite"

        params['fmt'] = 'json';
        params['fields'] = 'ID,obs_title,client_sort_key,client_application,hips_service_url*,hips_order,hips_tile_format,hips_frame';

        var urls = Utils.isHttpsContext() ? MOCSERVER_MIRRORS_HTTPS : MOCSERVER_MIRRORS_HTTP;

        var successCallback = function(data) {
            (typeof successCallbackFn === 'function') && successCallbackFn(data);
        };
        var failureCallback = function() {
            console.error('Could not load HiPS definitions from urls ' + urls);
            (typeof failureCallbackFn === 'function') && failureCallbackFn();
        };

        Utils.loadFromMirrors(urls, {data: params, onSuccess: successCallback, onFailure: failureCallback, timeout: 5});
    };

    // complement the baseList with the items in newList
    var merge = function(baseList, newList) {
        var updatedList = [];
        var newListById = {};
        for (var k=0; k<newList.length; k++) {
            var item = newList[k];
            newListById[item.ID] = item;
        }

        for (var k=0; k<baseList.length; k++) {
            var item = baseList[k];
            var id = item.ID;
            if (newListById.hasOwnProperty(id)) {
                var itemToAdd = newListById[id];
                // we keep the last used URL property
                if (item.hasOwnProperty(LAST_URL_KEY) && ! itemToAdd.hasOwnProperty(LAST_URL_KEY)) {
                    itemToAdd[LAST_URL_KEY] = item[LAST_URL_KEY];
                }
                updatedList.push(itemToAdd);
            }
            else {
                updatedList.push(item);
            }
        }

        return updatedList;
    };

    HiPSDefinition.CACHE_RETENTION_TIME_SECONDS = 7 * 86400; // definitions can be kept 7 days
    HiPSDefinition.init = function() {
        // first, merge local definitions at class level with definitions in local storage
        listHipsProperties = AL_CACHE_CLASS_LEVEL;

        // second, remove old definitions (client != AladinLite and timestamp older than CACHE_RETENTION_TIME_SECONDS) and merge
        var localDefs = HiPSDefinition.getLocalStorageDefinitions();
        // 2.1 remove old defs
        var now = new Date().getTime();
        var indicesToRemove = [];
        for (var k=0; k<localDefs.length; k++) {
            var def = localDefs[k];
            if (def.hasOwnProperty(RETRIEVAL_TIMESTAMP_KEY) && (now - def[RETRIEVAL_TIMESTAMP_KEY]) > 1000 * HiPSDefinition.CACHE_RETENTION_TIME_SECONDS) {
                indicesToRemove.push(k);
            }
        }
        // we have to browse the array in reverse order in order not to mess up indices
        for (var k = indicesToRemove.length - 1; k >= 0; k--) {
            localDefs.splice(indicesToRemove[k],1);
        }
        // 2.2 merge
        listHipsProperties = merge(listHipsProperties, localDefs);

        // third, retrieve remote definitions, merge and save
        HiPSDefinition.getRemoteDefinitions({dataproduct_type: 'image', client_application: 'AladinLite'}, function(remoteDefs) {
            // adding timestamp of retrieval
            var now = new Date().getTime();
            for (var k=0; k<remoteDefs.length; k++) {
                remoteDefs[k][RETRIEVAL_TIMESTAMP_KEY] = now;
            }
            listHipsProperties = merge(listHipsProperties, remoteDefs);
            HiPSDefinition.storeInLocalStorage(listHipsProperties);
        });

    };

    // return list of HiPSDefinition objects, filtering out definitions whose client_application is not AladinLite
    HiPSDefinition.getALDefaultHiPSDefinitions = function() {
        // filter out definitions with client_application != 'AladinLite'
        var ret = [];
        for (var k=0; k<listHipsProperties.length; k++) {
            var properties = listHipsProperties[k];
            if ( ! properties.hasOwnProperty('client_application') || properties['client_application'].indexOf('AladinLite')<0) {
                continue;
            }

            ret.push(new HiPSDefinition(properties));
        }

        return ret;
    };

    // return list of known HiPSDefinition objects
    HiPSDefinition.getDefinitions = function() {
        var ret = [];
        for (var k=0; k<listHipsProperties.length; k++) {
            var properties = listHipsProperties[k];
            ret.push(new HiPSDefinition(properties));
        }

        return ret;
    };

    // parse a HiPS properties and return a dict-like object with corresponding key-values
    // return null if parsing failed
    HiPSDefinition.parseHiPSProperties = function(propertiesStr) {
        if (propertiesStr==null) {
            return null;
        }

        var propertiesDict = {};
        // remove CR characters
        propertiesStr = propertiesStr.replace(/[\r]/g, '');
        // split on LF
        var lines = propertiesStr.split('\n');
        for (var k=0; k<lines.length; k++)  {
            var l = $.trim(lines[k]);
            // ignore comments lines
            if (l.slice(0, 1)==='#') {
                continue;
            }
            var idx = l.indexOf('=');
            if (idx<0) {
                continue;
            }
            var key = $.trim(l.slice(0, idx));
            var value = $.trim(l.slice(idx+1));

            propertiesDict[key] = value;
        }

        return propertiesDict;
    };


    // find a HiPSDefinition by id.
    // look first locally, and remotely only if local search was unsuccessful
    //
    // call callback function with a list of HiPSDefinition candidates, empty array if nothing found

    HiPSDefinition.findByID = function(id, callback) {
        // look first locally
        var candidates = findByIDLocal(id);
        if (candidates.length>0) {
            (typeof callback === 'function') && callback(candidates);
            return;
        }

        // then remotely
        findByIDRemote(id, callback);
    };

    // find a HiPSDefinition by id.
    // search is done on the local knowledge of HiPSDefinitions
    HiPSDefinition.findByIDLocal = function(id2search, callback) {
        var candidates = [];
        for (var k=0; k<listHipsProperties.length; k++) {
            var properties = listHipsProperties[k];
            var id = properties['ID'];
            if (id.match(id2search) != null ) {
                candidates.push(new HiPSDefinition(properties));
            }
        }

        return candidates;
    };

    // find remotely a HiPSDefinition by ID
    HiPSDefinition.findByIDRemote = function(id, callback) {
        HiPSDefinition.findHiPSRemote({ID: '*' + id + '*'}, callback);
    };

    // search a HiPS according to some criteria
    HiPSDefinition.findHiPSRemote = function(searchOptions, callback) {
        searchOptions = searchOptions || {};
        if (! searchOptions.hasOwnProperty('dataproduct_type')) {
            searchOptions['dataproduct_type'] = 'image';
        }
        HiPSDefinition.getRemoteDefinitions(searchOptions, function(candidates) {
            var defs = [];
            for (var k=0; k<candidates.length; k++) {
                defs.push(new HiPSDefinition(candidates[k]));
            }
            (typeof callback === 'function') && callback(defs);
        });
    };


    // Create a HiPSDefinition object from a URL
    //
    // If the URL ends with 'properties', it is assumed to be the URL of the properties file
    // else, it is assumed to be the base URL of the HiPS
    //
    // return a HiPSDefinition if successful, null if it failed
    HiPSDefinition.fromURL = function(url, callback) {
        var hipsUrl, propertiesUrl;
        if (url.slice(-10) === 'properties') {
            propertiesUrl = url;
            hipsUrl = propertiesUrl.slice(0, -11);
        }
        else {
            if (url.slice(-1) === '/') {
                url = url.slice(0, -1);
            }
            hipsUrl = url;
            propertiesUrl = hipsUrl + '/properties';
        }

        var callbackWhenPropertiesLoaded = function(properties) {
            // Sometimes, hips_service_url is missing. That can happen for instance Hipsgen does not set the hips_service_url keyword
            // --> in that case, we add as an attribyte the URL that was given as input parameter
            var hipsPropertiesDict = HiPSDefinition.parseHiPSProperties(properties);
            if (! hipsPropertiesDict.hasOwnProperty('hips_service_url')) {
                hipsPropertiesDict['hips_service_url'] = hipsUrl;
            }
            (typeof callback === 'function') && callback(new HiPSDefinition(hipsPropertiesDict));
        };

        // try first without proxy
        var ajax = Utils.getAjaxObject(propertiesUrl, 'GET', 'text', false);
        ajax
            .done(function(data) {
                callbackWhenPropertiesLoaded(data);
            })
            .fail(function() {
                // if not working, try with the proxy
                var ajax = Utils.getAjaxObject(propertiesUrl, 'GET', 'text', true);
                ajax
                    .done(function(data) {
                        callbackWhenPropertiesLoaded(data);
                    })
                    .fail(function() {
                        (typeof callback === 'function') && callback(null);
                    })
            });
    };

    // HiPSDefinition generation from a properties dict-like object
    HiPSDefinition.fromProperties = function(properties) {
        return new HiPSDefinition(properties);
    };




    HiPSDefinition.init();

    return HiPSDefinition;

})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Downloader
 * Queue downloading for image elements
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Downloader = (function() {
	var NB_MAX_SIMULTANEOUS_DL = 4;
	// TODO : le fading ne marche pas bien actuellement
	var FADING_ENABLED = false;
	var FADING_DURATION = 700; // in milliseconds
	
	
	var Downloader = function(view) {
		this.view = view; // reference to the view to be able to request redraw
		this.nbDownloads = 0; // number of current downloads
		this.dlQueue = []; // queue of items being downloaded
        this.urlsInQueue = {};
	};

	Downloader.prototype.emptyQueue = function() {
		this.dlQueue = [];
        this.urlsInQueue = {};
    };
	
	Downloader.prototype.requestDownload = function(img, url, cors) {
        // first check if url already in queue
        if (url in this.urlsInQueue)  {
            return;
        }
		// put in queue
		this.dlQueue.push({img: img, url: url, cors: cors});
		this.urlsInQueue[url] = 1;
		
		this.tryDownload();
	};
	
	// try to download next items in queue if possible
	Downloader.prototype.tryDownload = function() {
	    //if (this.dlQueue.length>0 && this.nbDownloads<NB_MAX_SIMULTANEOUS_DL) {
		while (this.dlQueue.length>0 && this.nbDownloads<NB_MAX_SIMULTANEOUS_DL) {
			this.startDownloadNext();
		}
	};
	
	Downloader.prototype.startDownloadNext = function() {
		// get next in queue
		var next = this.dlQueue.shift();
		if ( ! next) {
			return;
		}

		this.nbDownloads++;
		var downloaderRef = this;
		next.img.onload = function() {
			downloaderRef.completeDownload(this, true); // in this context, 'this' is the Image
		};
			
		next.img.onerror = function(e) {
			downloaderRef.completeDownload(this, false); // in this context, 'this' is the Image
		};
		if (next.cors) {
		    next.img.crossOrigin = 'anonymous';
		}
		
		else {
		    if (next.img.crossOrigin !== undefined) {
		        delete next.img.crossOrigin;
		    }
		}
		
		
		next.img.src = next.url;
	};
	
	Downloader.prototype.completeDownload = function(img, success) {
        delete this.urlsInQueue[img.src];
		img.onerror = null;
		img.onload = null;
		this.nbDownloads--;
		if (success) {
			if (FADING_ENABLED) {
				var now = new Date().getTime();
				img.fadingStart = now;
				img.fadingEnd = now + FADING_DURATION;
			}
			this.view.requestRedraw();
		}
		else {
		    img.dlError = true;
		}
		
		this.tryDownload();
	};
	
	
	
	return Downloader;
})();
// Generated by CoffeeScript 1.6.3
(function() {
  var Base, BinaryTable, CompressedImage, DataUnit, Decompress, FITS, HDU, Header, HeaderVerify, Image, ImageUtils, Parser, Table, Tabular, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (this.astro == null) {
    this.astro = {};
  }

  Base = (function() {
    function Base() {}

    Base.include = function(obj) {
      var key, value;
      for (key in obj) {
        value = obj[key];
        this.prototype[key] = value;
      }
      return this;
    };

    Base.extend = function(obj) {
      var key, value;
      for (key in obj) {
        value = obj[key];
        this[key] = value;
      }
      return this;
    };

    Base.prototype.proxy = function(func) {
      var _this = this;
      return function() {
        return func.apply(_this, arguments);
      };
    };

    Base.prototype.invoke = function(callback, opts, data) {
      var context;
      context = (opts != null ? opts.context : void 0) != null ? opts.context : this;
      if (callback != null) {
        return callback.call(context, data, opts);
      }
    };

    return Base;

  })();

  Parser = (function(_super) {
    __extends(Parser, _super);

    Parser.prototype.LINEWIDTH = 80;

    Parser.prototype.BLOCKLENGTH = 2880;

    File.prototype.slice = File.prototype.slice || File.prototype.webkitSlice;

    Blob.prototype.slice = Blob.prototype.slice || Blob.prototype.webkitSlice;

    function Parser(arg, callback, opts) {
      var xhr,
        _this = this;
      this.arg = arg;
      this.callback = callback;
      this.opts = opts;
      this.hdus = [];
      this.blockCount = 0;
      this.begin = 0;
      this.end = this.BLOCKLENGTH;
      this.offset = 0;
      this.headerStorage = new Uint8Array();
      if (typeof this.arg === 'string') {
        this.readNextBlock = this._readBlockFromBuffer;
        xhr = new XMLHttpRequest();
        xhr.open('GET', this.arg);
        xhr.responseType = 'arraybuffer';

        // the onerror handling has been added wrt the original fitsjs library as retrieved on the astrojs github repo
        // if an error occurs, we return an empty object
        xhr.onerror = function() {
          _this.invoke(_this.callback, _this.opts);
        }

        xhr.onload = function() {
          if (xhr.status !== 200) {
            _this.invoke(_this.callback, _this.opts);
            return;
          }
          _this.arg = xhr.response;
          _this.length = _this.arg.byteLength;
          return _this.readFromBuffer();
        };
        xhr.send();
      } else {
        this.length = this.arg.size;
        this.readNextBlock = this._readBlockFromFile;
        this.readFromFile();
      }
    }

    Parser.prototype.readFromBuffer = function() {
      var block;
      block = this.arg.slice(this.begin + this.offset, this.end + this.offset);
      return this.readBlock(block);
    };

    Parser.prototype.readFromFile = function() {
      var block,
        _this = this;
      this.reader = new FileReader();
      this.reader.onloadend = function(e) {
        return _this.readBlock(e.target.result);
      };
      block = this.arg.slice(this.begin + this.offset, this.end + this.offset);
      return this.reader.readAsArrayBuffer(block);
    };

    Parser.prototype.readBlock = function(block) {
      var arr, dataLength, dataunit, header, rowIndex, rows, s, slice, tmp, value, _i, _len, _ref;
      arr = new Uint8Array(block);
      tmp = new Uint8Array(this.headerStorage);
      this.headerStorage = new Uint8Array(this.end);
      this.headerStorage.set(tmp, 0);
      this.headerStorage.set(arr, this.begin);
      rows = this.BLOCKLENGTH / this.LINEWIDTH;
      while (rows--) {
        rowIndex = rows * this.LINEWIDTH;
        if (arr[rowIndex] === 32) {
          continue;
        }
        if (arr[rowIndex] === 69 && arr[rowIndex + 1] === 78 && arr[rowIndex + 2] === 68 && arr[rowIndex + 3] === 32) {
          s = '';
          _ref = this.headerStorage;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            value = _ref[_i];
            s += String.fromCharCode(value);
          }
          header = new Header(s);
          this.start = this.end + this.offset;
          dataLength = header.getDataLength();
          slice = this.arg.slice(this.start, this.start + dataLength);
          if (header.hasDataUnit()) {
            dataunit = this.createDataUnit(header, slice);
          }
          this.hdus.push(new HDU(header, dataunit));
          this.offset += this.end + dataLength + this.excessBytes(dataLength);
          if (this.offset === this.length) {
            this.headerStorage = null;
            this.invoke(this.callback, this.opts, this);
            return;
          }
          this.blockCount = 0;
          this.begin = this.blockCount * this.BLOCKLENGTH;
          this.end = this.begin + this.BLOCKLENGTH;
          this.headerStorage = new Uint8Array();
          block = this.arg.slice(this.begin + this.offset, this.end + this.offset);
          this.readNextBlock(block);
          return;
        }
        break;
      }
      this.blockCount += 1;
      this.begin = this.blockCount * this.BLOCKLENGTH;
      this.end = this.begin + this.BLOCKLENGTH;
      block = this.arg.slice(this.begin + this.offset, this.end + this.offset);
      this.readNextBlock(block);
    };

    Parser.prototype._readBlockFromBuffer = function(block) {
      return this.readBlock(block);
    };

    Parser.prototype._readBlockFromFile = function(block) {
      return this.reader.readAsArrayBuffer(block);
    };

    Parser.prototype.createDataUnit = function(header, blob) {
      var type;
      type = header.getDataType();
      return new astro.FITS[type](header, blob);
    };

    Parser.prototype.excessBytes = function(length) {
      return (this.BLOCKLENGTH - (length % this.BLOCKLENGTH)) % this.BLOCKLENGTH;
    };

    Parser.prototype.isEOF = function() {
      if (this.offset === this.length) {
        return true;
      } else {
        return false;
      }
    };

    return Parser;

  })(Base);

  FITS = (function(_super) {
    __extends(FITS, _super);

    function FITS(arg, callback, opts) {
      var parser,
        _this = this;
      this.arg = arg;
      parser = new Parser(this.arg, function(fits) {
        _this.hdus = parser.hdus;
        return _this.invoke(callback, opts, _this);
      });
    }

    FITS.prototype.getHDU = function(index) {
      var hdu, _i, _len, _ref;
      if ((index != null) && (this.hdus[index] != null)) {
        return this.hdus[index];
      }
      _ref = this.hdus;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hdu = _ref[_i];
        if (hdu.hasData()) {
          return hdu;
        }
      }
    };

    FITS.prototype.getHeader = function(index) {
      return this.getHDU(index).header;
    };

    FITS.prototype.getDataUnit = function(index) {
      return this.getHDU(index).data;
    };

    return FITS;

  })(Base);

  FITS.version = '0.6.5';

  this.astro.FITS = FITS;

  DataUnit = (function(_super) {
    __extends(DataUnit, _super);

    DataUnit.swapEndian = {
      B: function(value) {
        return value;
      },
      I: function(value) {
        return (value << 8) | (value >> 8);
      },
      J: function(value) {
        return ((value & 0xFF) << 24) | ((value & 0xFF00) << 8) | ((value >> 8) & 0xFF00) | ((value >> 24) & 0xFF);
      }
    };

    DataUnit.swapEndian[8] = DataUnit.swapEndian['B'];

    DataUnit.swapEndian[16] = DataUnit.swapEndian['I'];

    DataUnit.swapEndian[32] = DataUnit.swapEndian['J'];

    function DataUnit(header, data) {
      if (data instanceof ArrayBuffer) {
        this.buffer = data;
      } else {
        this.blob = data;
      }
    }

    return DataUnit;

  })(Base);

  this.astro.FITS.DataUnit = DataUnit;

  HeaderVerify = {
    verifyOrder: function(keyword, order) {
      if (order !== this.cardIndex) {
        return console.warn("" + keyword + " should appear at index " + this.cardIndex + " in the FITS header");
      }
    },
    verifyBetween: function(keyword, value, lower, upper) {
      if (!(value >= lower && value <= upper)) {
        throw "The " + keyword + " value of " + value + " is not between " + lower + " and " + upper;
      }
    },
    verifyBoolean: function(value) {
      if (value === "T") {
        return true;
      } else {
        return false;
      }
    },
    VerifyFns: {
      SIMPLE: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = arguments[0];
        this.primary = true;
        this.verifyOrder("SIMPLE", 0);
        return this.verifyBoolean(value);
      },
      XTENSION: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.extension = true;
        this.extensionType = arguments[0];
        this.verifyOrder("XTENSION", 0);
        return this.extensionType;
      },
      BITPIX: function() {
        var args, key, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        key = "BITPIX";
        value = parseInt(arguments[0]);
        this.verifyOrder(key, 1);
        if (value !== 8 && value !== 16 && value !== 32 && value !== (-32) && value !== (-64)) {
          throw "" + key + " value " + value + " is not permitted";
        }
        return value;
      },
      NAXIS: function() {
        var args, array, key, required, value, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        key = "NAXIS";
        value = parseInt(arguments[0]);
        array = arguments[1];
        if (!array) {
          this.verifyOrder(key, 2);
          this.verifyBetween(key, value, 0, 999);
          if (this.isExtension()) {
            if ((_ref = this.extensionType) === "TABLE" || _ref === "BINTABLE") {
              required = 2;
              if (value !== required) {
                throw "" + key + " must be " + required + " for TABLE and BINTABLE extensions";
              }
            }
          }
        }
        return value;
      },
      PCOUNT: function() {
        var args, key, order, required, value, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        key = "PCOUNT";
        value = parseInt(arguments[0]);
        order = 1 + 1 + 1 + this.get("NAXIS");
        this.verifyOrder(key, order);
        if (this.isExtension()) {
          if ((_ref = this.extensionType) === "IMAGE" || _ref === "TABLE") {
            required = 0;
            if (value !== required) {
              throw "" + key + " must be " + required + " for the " + this.extensionType + " extensions";
            }
          }
        }
        return value;
      },
      GCOUNT: function() {
        var args, key, order, required, value, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        key = "GCOUNT";
        value = parseInt(arguments[0]);
        order = 1 + 1 + 1 + this.get("NAXIS") + 1;
        this.verifyOrder(key, order);
        if (this.isExtension()) {
          if ((_ref = this.extensionType) === "IMAGE" || _ref === "TABLE" || _ref === "BINTABLE") {
            required = 1;
            if (value !== required) {
              throw "" + key + " must be " + required + " for the " + this.extensionType + " extensions";
            }
          }
        }
        return value;
      },
      EXTEND: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = arguments[0];
        if (!this.isPrimary()) {
          throw "EXTEND must only appear in the primary header";
        }
        return this.verifyBoolean(value);
      },
      BSCALE: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseFloat(arguments[0]);
      },
      BZERO: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseFloat(arguments[0]);
      },
      BLANK: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = arguments[0];
        if (!(this.get("BITPIX") > 0)) {
          console.warn("BLANK is not to be used for BITPIX = " + (this.get('BITPIX')));
        }
        return parseInt(value);
      },
      DATAMIN: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseFloat(arguments[0]);
      },
      DATAMAX: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseFloat(arguments[0]);
      },
      EXTVER: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      },
      EXTLEVEL: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      },
      TFIELDS: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = parseInt(arguments[0]);
        this.verifyBetween("TFIELDS", value, 0, 999);
        return value;
      },
      TBCOL: function() {
        var args, index, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = arguments[0];
        index = arguments[2];
        this.verifyBetween("TBCOL", index, 0, this.get("TFIELDS"));
        return value;
      },
      ZIMAGE: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.verifyBoolean(arguments[0]);
      },
      ZCMPTYPE: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = arguments[0];
        if (value !== 'GZIP_1' && value !== 'RICE_1' && value !== 'PLIO_1' && value !== 'HCOMPRESS_1') {
          throw "ZCMPTYPE value " + value + " is not permitted";
        }
        if (value !== 'RICE_1') {
          throw "Compress type " + value + " is not yet implement";
        }
        return value;
      },
      ZBITPIX: function() {
        var args, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = parseInt(arguments[0]);
        if (value !== 8 && value !== 16 && value !== 32 && value !== 64 && value !== (-32) && value !== (-64)) {
          throw "ZBITPIX value " + value + " is not permitted";
        }
        return value;
      },
      ZNAXIS: function() {
        var args, array, value;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = parseInt(arguments[0]);
        array = arguments[1];
        value = value;
        if (!array) {
          this.verifyBetween("ZNAXIS", value, 0, 999);
        }
        return value;
      },
      ZTILE: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      },
      ZSIMPLE: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (arguments[0] === "T") {
          return true;
        } else {
          return false;
        }
      },
      ZPCOUNT: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      },
      ZGCOUNT: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      },
      ZDITHER0: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return parseInt(arguments[0]);
      }
    }
  };

  this.astro.FITS.HeaderVerify = HeaderVerify;

  Header = (function(_super) {
    __extends(Header, _super);

    Header.include(HeaderVerify);

    Header.prototype.arrayPattern = /(\D+)(\d+)/;

    Header.prototype.maxLines = 600;

    function Header(block) {
      var method, name, _ref;
      this.primary = false;
      this.extension = false;
      this.verifyCard = {};
      _ref = this.VerifyFns;
      for (name in _ref) {
        method = _ref[name];
        this.verifyCard[name] = this.proxy(method);
      }
      this.cards = {};
      this.cards["COMMENT"] = [];
      this.cards["HISTORY"] = [];
      this.cardIndex = 0;
      this.block = block;
      this.readBlock(block);
    }

    Header.prototype.get = function(key) {
      if (this.contains(key)) {
        return this.cards[key].value;
      } else {
        return null;
      }
    };

    Header.prototype.set = function(key, value, comment) {
      comment = comment || '';
      this.cards[key] = {
        index: this.cardIndex,
        value: value,
        comment: comment
      };
      return this.cardIndex += 1;
    };

    Header.prototype.contains = function(key) {
      return this.cards.hasOwnProperty(key);
    };

    Header.prototype.readLine = function(l) {
      var blank, comment, firstByte, indicator, key, value, _ref;
      key = l.slice(0, 8).trim();
      blank = key === '';
      if (blank) {
        return;
      }
      indicator = l.slice(8, 10);
      value = l.slice(10);
      if (indicator !== "= ") {
        if (key === 'COMMENT' || key === 'HISTORY') {
          this.cards[key].push(value.trim());
        }
        return;
      }
      _ref = value.split(' /'), value = _ref[0], comment = _ref[1];
      value = value.trim();
      firstByte = value[0];
      if (firstByte === "'") {
        value = value.slice(1, -1).trim();
      } else {
        if (value !== 'T' && value !== 'F') {
          value = parseFloat(value);
        }
      }
      value = this.validate(key, value);
      return this.set(key, value, comment);
    };

    Header.prototype.validate = function(key, value) {
      var baseKey, index, isArray, match, _ref;
      index = null;
      baseKey = key;
      isArray = this.arrayPattern.test(key);
      if (isArray) {
        match = this.arrayPattern.exec(key);
        _ref = match.slice(1), baseKey = _ref[0], index = _ref[1];
      }
      if (baseKey in this.verifyCard) {
        value = this.verifyCard[baseKey](value, isArray, index);
      }
      return value;
    };

    Header.prototype.readBlock = function(block) {
      var i, line, lineWidth, nLines, _i, _ref, _results;
      lineWidth = 80;
      nLines = block.length / lineWidth;
      nLines = nLines < this.maxLines ? nLines : this.maxLines;
      _results = [];
      for (i = _i = 0, _ref = nLines - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        line = block.slice(i * lineWidth, (i + 1) * lineWidth);
        _results.push(this.readLine(line));
      }
      return _results;
    };

    Header.prototype.hasDataUnit = function() {
      if (this.get("NAXIS") === 0) {
        return false;
      } else {
        return true;
      }
    };

    Header.prototype.getDataLength = function() {
      var i, length, naxis, _i, _ref;
      if (!this.hasDataUnit()) {
        return 0;
      }
      naxis = [];
      for (i = _i = 1, _ref = this.get("NAXIS"); 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        naxis.push(this.get("NAXIS" + i));
      }
      length = naxis.reduce(function(a, b) {
        return a * b;
      }) * Math.abs(this.get("BITPIX")) / 8;
      length += this.get("PCOUNT");
      return length;
    };

    Header.prototype.getDataType = function() {
      switch (this.extensionType) {
        case 'BINTABLE':
          if (this.contains('ZIMAGE')) {
            return 'CompressedImage';
          }
          return 'BinaryTable';
        case 'TABLE':
          return 'Table';
        default:
          if (this.hasDataUnit()) {
            return 'Image';
          } else {
            return null;
          }
      }
    };

    Header.prototype.isPrimary = function() {
      return this.primary;
    };

    Header.prototype.isExtension = function() {
      return this.extension;
    };

    return Header;

  })(Base);

  this.astro.FITS.Header = Header;

  ImageUtils = {
    getExtent: function(arr) {
      var index, max, min, value;
      index = arr.length;
      while (index--) {
        value = arr[index];
        if (isNaN(value)) {
          continue;
        }
        min = max = value;
        break;
      }
      if (index === -1) {
        return [NaN, NaN];
      }
      while (index--) {
        value = arr[index];
        if (isNaN(value)) {
          continue;
        }
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }
      return [min, max];
    },
    getPixel: function(arr, x, y) {
      return arr[y * this.width + x];
    }
  };

  this.astro.FITS.ImageUtils = ImageUtils;

  Image = (function(_super) {
    __extends(Image, _super);

    Image.include(ImageUtils);

    Image.prototype.allocationSize = 16777216;

    function Image(header, data) {
      var begin, frame, i, naxis, _i, _j, _ref;
      Image.__super__.constructor.apply(this, arguments);
      naxis = header.get("NAXIS");
      this.bitpix = header.get("BITPIX");
      this.naxis = [];
      for (i = _i = 1; 1 <= naxis ? _i <= naxis : _i >= naxis; i = 1 <= naxis ? ++_i : --_i) {
        this.naxis.push(header.get("NAXIS" + i));
      }
      this.width = header.get("NAXIS1");
      this.height = header.get("NAXIS2") || 1;
      this.depth = header.get("NAXIS3") || 1;
      this.bzero = header.get("BZERO") || 0;
      this.bscale = header.get("BSCALE") || 1;
      this.bytes = Math.abs(this.bitpix) / 8;
      this.length = this.naxis.reduce(function(a, b) {
        return a * b;
      }) * Math.abs(this.bitpix) / 8;
      this.frame = 0;
      this.frameOffsets = [];
      this.frameLength = this.bytes * this.width * this.height;
      this.nBuffers = this.buffer != null ? 1 : 2;
      for (i = _j = 0, _ref = this.depth - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
        begin = i * this.frameLength;
        frame = {
          begin: begin
        };
        if (this.buffer != null) {
          frame.buffers = [this.buffer.slice(begin, begin + this.frameLength)];
        }
        this.frameOffsets.push(frame);
      }
    }

    Image.prototype._getFrame = function(buffer, bitpix, bzero, bscale) {
      var arr, bytes, dataType, i, nPixels, swapEndian, tmp, value;
      bytes = Math.abs(bitpix) / 8;
      nPixels = i = buffer.byteLength / bytes;
      dataType = Math.abs(bitpix);
      if (bitpix > 0) {
        switch (bitpix) {
          case 8:
            tmp = new Uint8Array(buffer);
            tmp = new Uint16Array(tmp);
            swapEndian = function(value) {
              return value;
            };
            break;
          case 16:
            tmp = new Int16Array(buffer);
            swapEndian = function(value) {
              return ((value & 0xFF) << 8) | ((value >> 8) & 0xFF);
            };
            break;
          case 32:
            tmp = new Int32Array(buffer);
            swapEndian = function(value) {
              return ((value & 0xFF) << 24) | ((value & 0xFF00) << 8) | ((value >> 8) & 0xFF00) | ((value >> 24) & 0xFF);
            };
        }
        if (!(parseInt(bzero) === bzero && parseInt(bscale) === bscale)) {
          arr = new Float32Array(tmp.length);
        } else {
          arr = tmp;
        }
        while (nPixels--) {
          tmp[nPixels] = swapEndian(tmp[nPixels]);
          arr[nPixels] = bzero + bscale * tmp[nPixels];
        }
      } else {
        arr = new Uint32Array(buffer);
        swapEndian = function(value) {
          return ((value & 0xFF) << 24) | ((value & 0xFF00) << 8) | ((value >> 8) & 0xFF00) | ((value >> 24) & 0xFF);
        };
        while (i--) {
          value = arr[i];
          arr[i] = swapEndian(value);
        }
        arr = new Float32Array(buffer);
        while (nPixels--) {
          arr[nPixels] = bzero + bscale * arr[nPixels];
        }
      }
      return arr;
    };

    Image.prototype._getFrameAsync = function(buffers, callback, opts) {
      var URL, blobGetFrame, blobOnMessage, fn1, fn2, i, mime, msg, onmessage, pixels, start, urlGetFrame, urlOnMessage, worker,
        _this = this;
      onmessage = function(e) {
        var arr, bitpix, bscale, buffer, bzero, data, url;
        data = e.data;
        buffer = data.buffer;
        bitpix = data.bitpix;
        bzero = data.bzero;
        bscale = data.bscale;
        url = data.url;
        importScripts(url);
        arr = _getFrame(buffer, bitpix, bzero, bscale);
        return postMessage(arr);
      };
      fn1 = onmessage.toString().replace('return postMessage', 'postMessage');
      fn1 = "onmessage = " + fn1;
      fn2 = this._getFrame.toString();
      fn2 = fn2.replace('function', 'function _getFrame');
      mime = "application/javascript";
      blobOnMessage = new Blob([fn1], {
        type: mime
      });
      blobGetFrame = new Blob([fn2], {
        type: mime
      });
      URL = window.URL || window.webkitURL;
      urlOnMessage = URL.createObjectURL(blobOnMessage);
      urlGetFrame = URL.createObjectURL(blobGetFrame);
      worker = new Worker(urlOnMessage);
      msg = {
        buffer: buffers[0],
        bitpix: this.bitpix,
        bzero: this.bzero,
        bscale: this.bscale,
        url: urlGetFrame
      };
      i = 0;
      pixels = null;
      start = 0;
      worker.onmessage = function(e) {
        var arr;
        arr = e.data;
        if (pixels == null) {
          pixels = new arr.constructor(_this.width * _this.height);
        }
        pixels.set(arr, start);
        start += arr.length;
        i += 1;
        if (i === _this.nBuffers) {
          _this.invoke(callback, opts, pixels);
          URL.revokeObjectURL(urlOnMessage);
          URL.revokeObjectURL(urlGetFrame);
          return worker.terminate();
        } else {
          msg.buffer = buffers[i];
          return worker.postMessage(msg, [buffers[i]]);
        }
      };
      worker.postMessage(msg, [buffers[0]]);
    };

    Image.prototype.getFrame = function(frame, callback, opts) {
      var begin, blobFrame, blobs, buffers, bytesPerBuffer, frameInfo, i, nRowsPerBuffer, reader, start, _i, _ref,
        _this = this;
      this.frame = frame || this.frame;
      frameInfo = this.frameOffsets[this.frame];
      buffers = frameInfo.buffers;
      if ((buffers != null ? buffers.length : void 0) === this.nBuffers) {
        return this._getFrameAsync(buffers, callback, opts);
      } else {
        this.frameOffsets[this.frame].buffers = [];
        begin = frameInfo.begin;
        blobFrame = this.blob.slice(begin, begin + this.frameLength);
        blobs = [];
        nRowsPerBuffer = Math.floor(this.height / this.nBuffers);
        bytesPerBuffer = nRowsPerBuffer * this.bytes * this.width;
        for (i = _i = 0, _ref = this.nBuffers - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          start = i * bytesPerBuffer;
          if (i === this.nBuffers - 1) {
            blobs.push(blobFrame.slice(start));
          } else {
            blobs.push(blobFrame.slice(start, start + bytesPerBuffer));
          }
        }
        buffers = [];
        reader = new FileReader();
        reader.frame = this.frame;
        i = 0;
        reader.onloadend = function(e) {
          var buffer;
          frame = e.target.frame;
          buffer = e.target.result;
          _this.frameOffsets[frame].buffers.push(buffer);
          i += 1;
          if (i === _this.nBuffers) {
            return _this.getFrame(frame, callback, opts);
          } else {
            return reader.readAsArrayBuffer(blobs[i]);
          }
        };
        return reader.readAsArrayBuffer(blobs[0]);
      }
    };

    Image.prototype.getFrames = function(frame, number, callback, opts) {
      var cb,
        _this = this;
      cb = function(arr, opts) {
        _this.invoke(callback, opts, arr);
        number -= 1;
        frame += 1;
        if (!number) {
          return;
        }
        return _this.getFrame(frame, cb, opts);
      };
      return this.getFrame(frame, cb, opts);
    };

    Image.prototype.isDataCube = function() {
      if (this.naxis.length > 2) {
        return true;
      } else {
        return false;
      }
    };

    return Image;

  })(DataUnit);

  this.astro.FITS.Image = Image;

  Tabular = (function(_super) {
    __extends(Tabular, _super);

    Tabular.prototype.maxMemory = 1048576;

    function Tabular(header, data) {
      Tabular.__super__.constructor.apply(this, arguments);
      this.rowByteSize = header.get("NAXIS1");
      this.rows = header.get("NAXIS2");
      this.cols = header.get("TFIELDS");
      this.length = this.rowByteSize * this.rows;
      this.heapLength = header.get("PCOUNT");
      this.columns = this.getColumns(header);
      if (this.buffer != null) {
        this.rowsInMemory = this._rowsInMemoryBuffer;
        this.heap = this.buffer.slice(this.length, this.length + this.heapLength);
      } else {
        this.rowsInMemory = this._rowsInMemoryBlob;
        this.firstRowInBuffer = this.lastRowInBuffer = 0;
        this.nRowsInBuffer = Math.floor(this.maxMemory / this.rowByteSize);
      }
      this.accessors = [];
      this.descriptors = [];
      this.elementByteLengths = [];
      this.setAccessors(header);
    }

    Tabular.prototype._rowsInMemoryBuffer = function() {
      return true;
    };

    Tabular.prototype._rowsInMemoryBlob = function(firstRow, lastRow) {
      if (firstRow < this.firstRowInBuffer) {
        return false;
      }
      if (lastRow > this.lastRowInBuffer) {
        return false;
      }
      return true;
    };

    Tabular.prototype.getColumns = function(header) {
      var columns, i, key, _i, _ref;
      columns = [];
      for (i = _i = 1, _ref = this.cols; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        key = "TTYPE" + i;
        if (!header.contains(key)) {
          return null;
        }
        columns.push(header.get(key));
      }
      return columns;
    };

    Tabular.prototype.getColumn = function(name, callback, opts) {
      var accessor, cb, column, descriptor, elementByteLength, elementByteOffset, factor, i, index, iterations, rowsPerIteration,
        _this = this;
      if (this.blob != null) {
        index = this.columns.indexOf(name);
        descriptor = this.descriptors[index];
        accessor = this.accessors[index];
        elementByteLength = this.elementByteLengths[index];
        elementByteOffset = this.elementByteLengths.slice(0, index);
        if (elementByteOffset.length === 0) {
          elementByteOffset = 0;
        } else {
          elementByteOffset = elementByteOffset.reduce(function(a, b) {
            return a + b;
          });
        }
        column = this.typedArray[descriptor] != null ? new this.typedArray[descriptor](this.rows) : [];
        rowsPerIteration = ~~(this.maxMemory / this.rowByteSize);
        rowsPerIteration = Math.min(rowsPerIteration, this.rows);
        factor = this.rows / rowsPerIteration;
        iterations = Math.floor(factor) === factor ? factor : Math.floor(factor) + 1;
        i = 0;
        index = 0;
        cb = function(buffer, opts) {
          var nRows, offset, startRow, view;
          nRows = buffer.byteLength / _this.rowByteSize;
          view = new DataView(buffer);
          offset = elementByteOffset;
          while (nRows--) {
            column[i] = accessor(view, offset)[0];
            i += 1;
            offset += _this.rowByteSize;
          }
          iterations -= 1;
          index += 1;
          if (iterations) {
            startRow = index * rowsPerIteration;
            return _this.getTableBuffer(startRow, rowsPerIteration, cb, opts);
          } else {
            _this.invoke(callback, opts, column);
          }
        };
        return this.getTableBuffer(0, rowsPerIteration, cb, opts);
      } else {
        cb = function(rows, opts) {
          column = rows.map(function(d) {
            return d[name];
          });
          return _this.invoke(callback, opts, column);
        };
        return this.getRows(0, this.rows, cb, opts);
      }
    };

    Tabular.prototype.getTableBuffer = function(row, number, callback, opts) {
      var begin, blobRows, end, reader,
        _this = this;
      number = Math.min(this.rows - row, number);
      begin = row * this.rowByteSize;
      end = begin + number * this.rowByteSize;
      blobRows = this.blob.slice(begin, end);
      reader = new FileReader();
      reader.row = row;
      reader.number = number;
      reader.onloadend = function(e) {
        return _this.invoke(callback, opts, e.target.result);
      };
      return reader.readAsArrayBuffer(blobRows);
    };

    Tabular.prototype.getRows = function(row, number, callback, opts) {
      var begin, blobRows, buffer, end, reader, rows,
        _this = this;
      if (this.rowsInMemory(row, row + number)) {
        if (this.blob != null) {
          buffer = this.buffer;
        } else {
          begin = row * this.rowByteSize;
          end = begin + number * this.rowByteSize;
          buffer = this.buffer.slice(begin, end);
        }
        rows = this._getRows(buffer, number);
        this.invoke(callback, opts, rows);
        return rows;
      } else {
        begin = row * this.rowByteSize;
        end = begin + Math.max(this.nRowsInBuffer * this.rowByteSize, number * this.rowByteSize);
        blobRows = this.blob.slice(begin, end);
        reader = new FileReader();
        reader.row = row;
        reader.number = number;
        reader.onloadend = function(e) {
          var target;
          target = e.target;
          _this.buffer = target.result;
          _this.firstRowInBuffer = _this.lastRowInBuffer = target.row;
          _this.lastRowInBuffer += target.number;
          return _this.getRows(row, number, callback, opts);
        };
        return reader.readAsArrayBuffer(blobRows);
      }
    };

    return Tabular;

  })(DataUnit);

  this.astro.FITS.Tabular = Tabular;

  Table = (function(_super) {
    __extends(Table, _super);

    function Table() {
      _ref = Table.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Table.prototype.dataAccessors = {
      A: function(value) {
        return value.trim();
      },
      I: function(value) {
        return parseInt(value);
      },
      F: function(value) {
        return parseFloat(value);
      },
      E: function(value) {
        return parseFloat(value);
      },
      D: function(value) {
        return parseFloat(value);
      }
    };

    Table.prototype.setAccessors = function(header) {
      var descriptor, form, i, match, pattern, type, _i, _ref1, _results,
        _this = this;
      pattern = /([AIFED])(\d+)\.*(\d+)*/;
      _results = [];
      for (i = _i = 1, _ref1 = this.cols; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
        form = header.get("TFORM" + i);
        type = header.get("TTYPE" + i);
        match = pattern.exec(form);
        descriptor = match[1];
        _results.push((function(descriptor) {
          var accessor;
          accessor = function(value) {
            return _this.dataAccessors[descriptor](value);
          };
          return _this.accessors.push(accessor);
        })(descriptor));
      }
      return _results;
    };

    Table.prototype._getRows = function(buffer) {
      var accessor, arr, begin, end, i, index, line, nRows, row, rows, subarray, value, _i, _j, _k, _len, _len1, _ref1, _ref2;
      nRows = buffer.byteLength / this.rowByteSize;
      arr = new Uint8Array(buffer);
      rows = [];
      for (i = _i = 0, _ref1 = nRows - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        begin = i * this.rowByteSize;
        end = begin + this.rowByteSize;
        subarray = arr.subarray(begin, end);
        line = '';
        for (_j = 0, _len = subarray.length; _j < _len; _j++) {
          value = subarray[_j];
          line += String.fromCharCode(value);
        }
        line = line.trim().split(/\s+/);
        row = {};
        _ref2 = this.accessors;
        for (index = _k = 0, _len1 = _ref2.length; _k < _len1; index = ++_k) {
          accessor = _ref2[index];
          value = line[index];
          row[this.columns[index]] = accessor(value);
        }
        rows.push(row);
      }
      return rows;
    };

    return Table;

  })(Tabular);

  this.astro.FITS.Table = Table;

  BinaryTable = (function(_super) {
    __extends(BinaryTable, _super);

    function BinaryTable() {
      _ref1 = BinaryTable.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BinaryTable.prototype.typedArray = {
      B: Uint8Array,
      I: Uint16Array,
      J: Uint32Array,
      E: Float32Array,
      D: Float64Array,
      1: Uint8Array,
      2: Uint16Array,
      4: Uint32Array
    };

    BinaryTable.offsets = {
      L: 1,
      B: 1,
      I: 2,
      J: 4,
      K: 8,
      A: 1,
      E: 4,
      D: 8,
      C: 8,
      M: 16
    };

    BinaryTable.prototype.dataAccessors = {
      L: function(view, offset) {
        var val, x;
        x = view.getInt8(offset);
        offset += 1;
        val = x === 84 ? true : false;
        return [val, offset];
      },
      B: function(view, offset) {
        var val;
        val = view.getUint8(offset);
        offset += 1;
        return [val, offset];
      },
      I: function(view, offset) {
        var val;
        val = view.getInt16(offset);
        offset += 2;
        return [val, offset];
      },
      J: function(view, offset) {
        var val;
        val = view.getInt32(offset);
        offset += 4;
        return [val, offset];
      },
      K: function(view, offset) {
        var factor, highByte, lowByte, mod, val;
        highByte = Math.abs(view.getInt32(offset));
        offset += 4;
        lowByte = Math.abs(view.getInt32(offset));
        offset += 4;
        mod = highByte % 10;
        factor = mod ? -1 : 1;
        highByte -= mod;
        val = factor * ((highByte << 32) | lowByte);
        return [val, offset];
      },
      A: function(view, offset) {
        var val;
        val = view.getUint8(offset);
        val = String.fromCharCode(val);
        offset += 1;
        return [val, offset];
      },
      E: function(view, offset) {
        var val;
        val = view.getFloat32(offset);
        offset += 4;
        return [val, offset];
      },
      D: function(view, offset) {
        var val;
        val = view.getFloat64(offset);
        offset += 8;
        return [val, offset];
      },
      C: function(view, offset) {
        var val, val1, val2;
        val1 = view.getFloat32(offset);
        offset += 4;
        val2 = view.getFloat32(offset);
        offset += 4;
        val = [val1, val2];
        return [val, offset];
      },
      M: function(view, offset) {
        var val, val1, val2;
        val1 = view.getFloat64(offset);
        offset += 8;
        val2 = view.getFloat64(offset);
        offset += 8;
        val = [val1, val2];
        return [val, offset];
      }
    };

    BinaryTable.prototype.toBits = function(byte) {
      var arr, i;
      arr = [];
      i = 128;
      while (i >= 1) {
        arr.push((byte & i ? 1 : 0));
        i /= 2;
      }
      return arr;
    };

    BinaryTable.prototype.getFromHeap = function(view, offset, descriptor) {
      var arr, heapOffset, heapSlice, i, length;
      length = view.getInt32(offset);
      offset += 4;
      heapOffset = view.getInt32(offset);
      offset += 4;
      heapSlice = this.heap.slice(heapOffset, heapOffset + length);
      arr = new this.typedArray[descriptor](heapSlice);
      i = arr.length;
      while (i--) {
        arr[i] = this.constructor.swapEndian[descriptor](arr[i]);
      }
      return [arr, offset];
    };

    BinaryTable.prototype.setAccessors = function(header) {
      var count, descriptor, form, i, isArray, match, pattern, type, _i, _ref2, _results,
        _this = this;
      pattern = /(\d*)([P|Q]*)([L|X|B|I|J|K|A|E|D|C|M]{1})/;
      _results = [];
      for (i = _i = 1, _ref2 = this.cols; 1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; i = 1 <= _ref2 ? ++_i : --_i) {
        form = header.get("TFORM" + i);
        type = header.get("TTYPE" + i);
        match = pattern.exec(form);
        count = parseInt(match[1]) || 1;
        isArray = match[2];
        descriptor = match[3];
        _results.push((function(descriptor, count) {
          var accessor, nBytes;
          _this.descriptors.push(descriptor);
          _this.elementByteLengths.push(_this.constructor.offsets[descriptor] * count);
          if (isArray) {
            switch (type) {
              case "COMPRESSED_DATA":
                accessor = function(view, offset) {
                  var arr, pixels, _ref3;
                  _ref3 = _this.getFromHeap(view, offset, descriptor), arr = _ref3[0], offset = _ref3[1];
                  pixels = new _this.typedArray[_this.algorithmParameters["BYTEPIX"]](_this.ztile[0]);
                  Decompress.Rice(arr, _this.algorithmParameters["BLOCKSIZE"], _this.algorithmParameters["BYTEPIX"], pixels, _this.ztile[0], Decompress.RiceSetup);
                  return [pixels, offset];
                };
                break;
              case "GZIP_COMPRESSED_DATA":
                accessor = function(view, offset) {
                  var arr;
                  arr = new Float32Array(_this.width);
                  i = arr.length;
                  while (i--) {
                    arr[i] = NaN;
                  }
                  return [arr, offset];
                };
                break;
              default:
                accessor = function(view, offset) {
                  return _this.getFromHeap(view, offset, descriptor);
                };
            }
          } else {
            if (count === 1) {
              accessor = function(view, offset) {
                var value, _ref3;
                _ref3 = _this.dataAccessors[descriptor](view, offset), value = _ref3[0], offset = _ref3[1];
                return [value, offset];
              };
            } else {
              if (descriptor === 'X') {
                nBytes = Math.log(count) / Math.log(2);
                accessor = function(view, offset) {
                  var arr, bits, buffer, byte, bytes, _j, _len;
                  buffer = view.buffer.slice(offset, offset + nBytes);
                  bytes = new Uint8Array(buffer);
                  bits = [];
                  for (_j = 0, _len = bytes.length; _j < _len; _j++) {
                    byte = bytes[_j];
                    arr = _this.toBits(byte);
                    bits = bits.concat(arr);
                  }
                  offset += nBytes;
                  return [bits.slice(0, +(count - 1) + 1 || 9e9), offset];
                };
              } else if (descriptor === 'A') {
                accessor = function(view, offset) {
                  var arr, buffer, s, value, _j, _len;
                  buffer = view.buffer.slice(offset, offset + count);
                  arr = new Uint8Array(buffer);
                  s = '';
                  for (_j = 0, _len = arr.length; _j < _len; _j++) {
                    value = arr[_j];
                    s += String.fromCharCode(value);
                  }
                  s = s.trim();
                  offset += count;
                  return [s, offset];
                };
              } else {
                accessor = function(view, offset) {
                  var data, value, _ref3;
                  i = count;
                  data = [];
                  while (i--) {
                    _ref3 = _this.dataAccessors[descriptor](view, offset), value = _ref3[0], offset = _ref3[1];
                    data.push(value);
                  }
                  return [data, offset];
                };
              }
            }
          }
          return _this.accessors.push(accessor);
        })(descriptor, count));
      }
      return _results;
    };

    BinaryTable.prototype._getRows = function(buffer, nRows) {
      var accessor, index, offset, row, rows, value, view, _i, _len, _ref2, _ref3;
      view = new DataView(buffer);
      offset = 0;
      rows = [];
      while (nRows--) {
        row = {};
        _ref2 = this.accessors;
        for (index = _i = 0, _len = _ref2.length; _i < _len; index = ++_i) {
          accessor = _ref2[index];
          _ref3 = accessor(view, offset), value = _ref3[0], offset = _ref3[1];
          row[this.columns[index]] = value;
        }
        rows.push(row);
      }
      return rows;
    };

    return BinaryTable;

  })(Tabular);

  this.astro.FITS.BinaryTable = BinaryTable;

  Decompress = {
    RiceSetup: {
      1: function(array) {
        var fsbits, fsmax, lastpix, pointer;
        pointer = 1;
        fsbits = 3;
        fsmax = 6;
        lastpix = array[0];
        return [fsbits, fsmax, lastpix, pointer];
      },
      2: function(array) {
        var bytevalue, fsbits, fsmax, lastpix, pointer;
        pointer = 2;
        fsbits = 4;
        fsmax = 14;
        lastpix = 0;
        bytevalue = array[0];
        lastpix = lastpix | (bytevalue << 8);
        bytevalue = array[1];
        lastpix = lastpix | bytevalue;
        return [fsbits, fsmax, lastpix, pointer];
      },
      4: function(array) {
        var bytevalue, fsbits, fsmax, lastpix, pointer;
        pointer = 4;
        fsbits = 5;
        fsmax = 25;
        lastpix = 0;
        bytevalue = array[0];
        lastpix = lastpix | (bytevalue << 24);
        bytevalue = array[1];
        lastpix = lastpix | (bytevalue << 16);
        bytevalue = array[2];
        lastpix = lastpix | (bytevalue << 8);
        bytevalue = array[3];
        lastpix = lastpix | bytevalue;
        return [fsbits, fsmax, lastpix, pointer];
      }
    },
    Rice: function(array, blocksize, bytepix, pixels, nx, setup) {
      var b, bbits, diff, fs, fsbits, fsmax, i, imax, k, lastpix, nbits, nonzeroCount, nzero, pointer, _ref2, _ref3;
      bbits = 1 << fsbits;
      _ref2 = setup[bytepix](array), fsbits = _ref2[0], fsmax = _ref2[1], lastpix = _ref2[2], pointer = _ref2[3];
      nonzeroCount = new Uint8Array(256);
      nzero = 8;
      _ref3 = [128, 255], k = _ref3[0], i = _ref3[1];
      while (i >= 0) {
        while (i >= k) {
          nonzeroCount[i] = nzero;
          i -= 1;
        }
        k = k / 2;
        nzero -= 1;
      }
      nonzeroCount[0] = 0;
      b = array[pointer++];
      nbits = 8;
      i = 0;
      while (i < nx) {
        nbits -= fsbits;
        while (nbits < 0) {
          b = (b << 8) | array[pointer++];
          nbits += 8;
        }
        fs = (b >> nbits) - 1;
        b &= (1 << nbits) - 1;
        imax = i + blocksize;
        if (imax > nx) {
          imax = nx;
        }
        if (fs < 0) {
          while (i < imax) {
            pixels[i] = lastpix;
            i += 1;
          }
        } else if (fs === fsmax) {
          while (i < imax) {
            k = bbits - nbits;
            diff = b << k;
            k -= 8;
            while (k >= 0) {
              b = array[pointer++];
              diff |= b << k;
              k -= 8;
            }
            if (nbits > 0) {
              b = array[pointer++];
              diff |= b >> (-k);
              b &= (1 << nbits) - 1;
            } else {
              b = 0;
            }
            if ((diff & 1) === 0) {
              diff = diff >> 1;
            } else {
              diff = ~(diff >> 1);
            }
            pixels[i] = diff + lastpix;
            lastpix = pixels[i];
            i++;
          }
        } else {
          while (i < imax) {
            while (b === 0) {
              nbits += 8;
              b = array[pointer++];
            }
            nzero = nbits - nonzeroCount[b];
            nbits -= nzero + 1;
            b ^= 1 << nbits;
            nbits -= fs;
            while (nbits < 0) {
              b = (b << 8) | array[pointer++];
              nbits += 8;
            }
            diff = (nzero << fs) | (b >> nbits);
            b &= (1 << nbits) - 1;
            if ((diff & 1) === 0) {
              diff = diff >> 1;
            } else {
              diff = ~(diff >> 1);
            }
            pixels[i] = diff + lastpix;
            lastpix = pixels[i];
            i++;
          }
        }
      }
      return pixels;
    }
  };

  this.astro.FITS.Decompress = Decompress;

  CompressedImage = (function(_super) {
    __extends(CompressedImage, _super);

    CompressedImage.include(ImageUtils);

    CompressedImage.extend(Decompress);

    CompressedImage.randomGenerator = function() {
      var a, i, m, random, seed, temp, _i;
      a = 16807;
      m = 2147483647;
      seed = 1;
      random = new Float32Array(10000);
      for (i = _i = 0; _i <= 9999; i = ++_i) {
        temp = a * seed;
        seed = temp - m * parseInt(temp / m);
        random[i] = seed / m;
      }
      return random;
    };

    CompressedImage.randomSequence = CompressedImage.randomGenerator();

    function CompressedImage(header, data) {
      var i, key, value, ztile, _i, _ref2;
      CompressedImage.__super__.constructor.apply(this, arguments);
      this.zcmptype = header.get("ZCMPTYPE");
      this.zbitpix = header.get("ZBITPIX");
      this.znaxis = header.get("ZNAXIS");
      this.zblank = header.get("ZBLANK");
      this.blank = header.get("BLANK");
      this.zdither = header.get('ZDITHER0') || 0;
      this.ztile = [];
      for (i = _i = 1, _ref2 = this.znaxis; 1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; i = 1 <= _ref2 ? ++_i : --_i) {
        ztile = header.contains("ZTILE" + i) ? header.get("ZTILE" + i) : i === 1 ? header.get("ZNAXIS1") : 1;
        this.ztile.push(ztile);
      }
      this.width = header.get("ZNAXIS1");
      this.height = header.get("ZNAXIS2") || 1;
      this.algorithmParameters = {};
      if (this.zcmptype === 'RICE_1') {
        this.algorithmParameters["BLOCKSIZE"] = 32;
        this.algorithmParameters["BYTEPIX"] = 4;
      }
      i = 1;
      while (true) {
        key = "ZNAME" + i;
        if (!header.contains(key)) {
          break;
        }
        value = "ZVAL" + i;
        this.algorithmParameters[header.get(key)] = header.get(value);
        i += 1;
      }
      this.zmaskcmp = header.get("ZMASKCMP");
      this.zquantiz = header.get("ZQUANTIZ") || "LINEAR_SCALING";
      this.bzero = header.get("BZERO") || 0;
      this.bscale = header.get("BSCALE") || 1;
    }

    CompressedImage.prototype._getRows = function(buffer, nRows) {
      var accessor, arr, blank, data, i, index, nTile, offset, r, rIndex, row, scale, seed0, seed1, value, view, zero, _i, _j, _len, _len1, _ref2, _ref3;
      view = new DataView(buffer);
      offset = 0;
      arr = new Float32Array(this.width * this.height);
      while (nRows--) {
        row = {};
        _ref2 = this.accessors;
        for (index = _i = 0, _len = _ref2.length; _i < _len; index = ++_i) {
          accessor = _ref2[index];
          _ref3 = accessor(view, offset), value = _ref3[0], offset = _ref3[1];
          row[this.columns[index]] = value;
        }
        data = row['COMPRESSED_DATA'] || row['UNCOMPRESSED_DATA'] || row['GZIP_COMPRESSED_DATA'];
        blank = row['ZBLANK'] || this.zblank;
        scale = row['ZSCALE'] || this.bscale;
        zero = row['ZZERO'] || this.bzero;
        nTile = this.height - nRows;
        seed0 = nTile + this.zdither - 1;
        seed1 = (seed0 - 1) % 10000;
        rIndex = parseInt(this.constructor.randomSequence[seed1] * 500);
        for (index = _j = 0, _len1 = data.length; _j < _len1; index = ++_j) {
          value = data[index];
          i = (nTile - 1) * this.width + index;
          if (value === -2147483647) {
            arr[i] = NaN;
          } else if (value === -2147483646) {
            arr[i] = 0;
          } else {
            r = this.constructor.randomSequence[rIndex];
            arr[i] = (value - r + 0.5) * scale + zero;
          }
          rIndex += 1;
          if (rIndex === 10000) {
            seed1 = (seed1 + 1) % 10000;
            rIndex = parseInt(this.randomSequence[seed1] * 500);
          }
        }
      }
      return arr;
    };

    CompressedImage.prototype.getFrame = function(nFrame, callback, opts) {
      var heapBlob, reader,
        _this = this;
      if (this.heap) {
        this.frame = nFrame || this.frame;
        return this.getRows(0, this.rows, callback, opts);
      } else {
        heapBlob = this.blob.slice(this.length, this.length + this.heapLength);
        reader = new FileReader();
        reader.onloadend = function(e) {
          _this.heap = e.target.result;
          return _this.getFrame(nFrame, callback, opts);
        };
        return reader.readAsArrayBuffer(heapBlob);
      }
    };

    return CompressedImage;

  })(BinaryTable);

  this.astro.FITS.CompressedImage = CompressedImage;

  HDU = (function() {
    function HDU(header, data) {
      this.header = header;
      this.data = data;
    }

    HDU.prototype.hasData = function() {
      if (this.data != null) {
        return true;
      } else {
        return false;
      }
    };

    return HDU;

  })();

  this.astro.FITS.HDU = HDU;

}).call(this);
/******************************************************************************
 * Aladin Lite project
 * 
 * File MOC
 *
 * This class represents a MOC (Multi Order Coverage map) layer
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

MOC = (function() {
    MOC = function(options) {
        this.order = undefined;

        this.type = 'moc';

        // TODO homogenize options parsing for all kind of overlay (footprints, catalog, MOC)
        options = options || {};
        this.name = options.name || "MOC";
        this.color = options.color || Color.getNextColor();
        this.opacity = options.opacity || 1;
        this.opacity = Math.max(0, Math.min(1, this.opacity)); // 0 <= this.opacity <= 1
        this.lineWidth = options["lineWidth"] || 1;
        this.adaptativeDisplay = options['adaptativeDisplay'] !== false;

        this.proxyCalled = false; // this is a flag to check whether we already tried to load the MOC through the proxy

        // index of MOC cells at high and low resolution
        this._highResIndexOrder3 = new Array(768);
        this._lowResIndexOrder3 = new Array(768);
        for (var k=0; k<768; k++) {
            this._highResIndexOrder3[k] = {};
            this._lowResIndexOrder3[k] = {};
        }

        this.nbCellsDeepestLevel = 0; // needed to compute the sky fraction of the MOC

        this.isShowing = true;
        this.ready = false;
    }

    
    function log2(val) {
        return Math.log(val) / Math.LN2;
    }

    // max norder we can currently handle (limitation of healpix.js)
    MOC.MAX_NORDER = 13; // NSIDE = 8192

    MOC.LOWRES_MAXORDER = 6; // 5 or 6 ??
    MOC.HIGHRES_MAXORDER = 11; // ??

    // TODO: options to modifiy this ?
    MOC.PIVOT_FOV = 30; // when do we switch from low res cells to high res cells (fov in degrees)

    // at end of parsing, we need to remove duplicates from the 2 indexes
    MOC.prototype._removeDuplicatesFromIndexes = function() {
        var a, aDedup;
        for (var k=0; k<768; k++) {
            for (var key in this._highResIndexOrder3[k]) {
                a = this._highResIndexOrder3[k][key];
                aDedup = uniq(a);
                this._highResIndexOrder3[k][key] = aDedup;
            }
            for (var key in this._lowResIndexOrder3[k]) {
                a = this._lowResIndexOrder3[k][key];
                aDedup = uniq(a);
                this._lowResIndexOrder3[k][key] = aDedup;
            }
        }
        
    }

    // add pixel (order, ipix)
    MOC.prototype._addPix = function(order, ipix) {
        var ipixOrder3 = Math.floor( ipix * Math.pow(4, (3 - order)) );
        // fill low and high level cells
        // 1. if order <= LOWRES_MAXORDER, just store value in low and high res cells
        if (order<=MOC.LOWRES_MAXORDER) {
            if (! (order in this._lowResIndexOrder3[ipixOrder3])) {
                this._lowResIndexOrder3[ipixOrder3][order] = [];
                this._highResIndexOrder3[ipixOrder3][order] = [];
            }
            this._lowResIndexOrder3[ipixOrder3][order].push(ipix);
            this._highResIndexOrder3[ipixOrder3][order].push(ipix);
        }
        // 2. if LOWRES_MAXORDER < order <= HIGHRES_MAXORDER , degrade ipix for low res cells
        else if (order<=MOC.HIGHRES_MAXORDER) {
            if (! (order in this._highResIndexOrder3[ipixOrder3])) {
                this._highResIndexOrder3[ipixOrder3][order] = [];
            }
            this._highResIndexOrder3[ipixOrder3][order].push(ipix);
            
            var degradedOrder = MOC.LOWRES_MAXORDER; 
            var degradedIpix  = Math.floor(ipix / Math.pow(4, (order - degradedOrder)));
            var degradedIpixOrder3 = Math.floor( degradedIpix * Math.pow(4, (3 - degradedOrder)) );
            if (! (degradedOrder in this._lowResIndexOrder3[degradedIpixOrder3])) {
                this._lowResIndexOrder3[degradedIpixOrder3][degradedOrder]= [];
            }
            this._lowResIndexOrder3[degradedIpixOrder3][degradedOrder].push(degradedIpix);
        }
        // 3. if order > HIGHRES_MAXORDER , degrade ipix for low res and high res cells
        else {
            // low res cells
            var degradedOrder = MOC.LOWRES_MAXORDER; 
            var degradedIpix  = Math.floor(ipix / Math.pow(4, (order - degradedOrder)));
            var degradedIpixOrder3 = Math.floor(degradedIpix * Math.pow(4, (3 - degradedOrder)) );
            if (! (degradedOrder in this._lowResIndexOrder3[degradedIpixOrder3])) {
                this._lowResIndexOrder3[degradedIpixOrder3][degradedOrder]= [];
            }
            this._lowResIndexOrder3[degradedIpixOrder3][degradedOrder].push(degradedIpix);

            
            // high res cells
            degradedOrder = MOC.HIGHRES_MAXORDER; 
            degradedIpix  = Math.floor(ipix / Math.pow(4, (order - degradedOrder)));
            var degradedIpixOrder3 = Math.floor(degradedIpix * Math.pow(4, (3 - degradedOrder)) );
            if (! (degradedOrder in this._highResIndexOrder3[degradedIpixOrder3])) {
                this._highResIndexOrder3[degradedIpixOrder3][degradedOrder]= [];
            }
            this._highResIndexOrder3[degradedIpixOrder3][degradedOrder].push(degradedIpix);
        }

        this.nbCellsDeepestLevel += Math.pow(4, (this.order - order));
    };


    /**
     *  Return a value between 0 and 1 denoting the fraction of the sky
     *  covered by the MOC
     */
    MOC.prototype.skyFraction = function() {
        return this.nbCellsDeepestLevel / (12 * Math.pow(4, this.order));
    };

    /**
     * set MOC data by parsing a MOC serialized in JSON
     * (as defined in IVOA MOC document, section 3.1.1)
     */
    MOC.prototype.dataFromJSON = function(jsonMOC) {
        var order, ipix;
        for (var orderStr in jsonMOC) {
            if (jsonMOC.hasOwnProperty(orderStr)) {
                order = parseInt(orderStr);
                if (this.order===undefined || order > this.order) {
                    this.order = order;
                }
                for (var k=0; k<jsonMOC[orderStr].length; k++) {
                    ipix = jsonMOC[orderStr][k];
                    this._addPix(order, ipix);
                }
            }
        }

        this.reportChange();
        this.ready = true;
    };

    /**
     * set MOC data by parsing a URL pointing to a FITS MOC file
     */
    MOC.prototype.dataFromFITSURL = function(mocURL, successCallback) {
        var self = this;
        var callback = function() {
            // note: in the callback, 'this' refers to the FITS instance

            // first, let's find MOC norder
            var hdr0;
            try {
                // A zero-length hdus array might mean the served URL does not have CORS header
                // --> let's try again through the proxy
                if (this.hdus.length == 0) {
                    if (self.proxyCalled !== true) {
                        self.proxyCalled = true;
                        var proxiedURL = Aladin.JSONP_PROXY + '?url=' + encodeURIComponent(self.dataURL);
                        new astro.FITS(proxiedURL, callback);
                    }

                    return;
                }
                hdr0 = this.getHeader(0);
            }
            catch (e) {
                console.error('Could not get header of extension #0');
                return;
            }
            var hdr1 = this.getHeader(1);

            if (hdr0.contains('HPXMOC')) {
                self.order = hdr0.get('HPXMOC')
            }
            else if (hdr0.contains('MOCORDER')) {
                self.order = hdr0.get('MOCORDER')
            }
            else if (hdr1.contains('HPXMOC')) {
                self.order = hdr1.get('HPXMOC')
            }
            else if (hdr1.contains('MOCORDER')) {
                self.order = hdr1.get('MOCORDER')
            }
            else {
                console.error('Can not find MOC order in FITS file');
                return;
            }


            var data = this.getDataUnit(1);
            var colName = data.columns[0];
            data.getRows(0, data.rows, function(rows) {
                for (var k=0; k<rows.length; k++) {
                    var uniq = rows[k][colName];
                    var order = Math.floor(Math.floor(log2(Math.floor(uniq/4))) / 2);
                    var ipix = uniq - 4 *(Math.pow(4, order));



                    self._addPix(order, ipix);
                }

            });
            data = null; // this helps releasing memory

            self._removeDuplicatesFromIndexes();

            if (successCallback) {
                successCallback();
            }

            self.reportChange();
            self.ready = true;
        }; // end of callback function

        this.dataURL = mocURL;

        // instantiate the FITS object which will fetch the URL passed as parameter
        new astro.FITS(this.dataURL, callback);
    };

    MOC.prototype.setView = function(view) {
        this.view = view;
        this.reportChange();
    };
    
    MOC.prototype.draw = function(ctx, projection, viewFrame, width, height, largestDim, zoomFactor, fov) {
        if (! this.isShowing || ! this.ready) {
            return;
        }

        var mocCells = fov > MOC.PIVOT_FOV && this.adaptativeDisplay ? this._lowResIndexOrder3 : this._highResIndexOrder3;

        this._drawCells(ctx, mocCells, fov, projection, viewFrame, CooFrameEnum.J2000, width, height, largestDim, zoomFactor);
    };

    MOC.prototype._drawCells = function(ctx, mocCellsIdxOrder3, fov, projection, viewFrame, surveyFrame, width, height, largestDim, zoomFactor) {
        ctx.lineWidth = this.lineWidth;
        // if opacity==1, we draw solid lines, else we fill each HEALPix cell
        if (this.opacity==1) {
            ctx.strokeStyle = this.color;
        }
        else {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
        }


        ctx.beginPath();

        var orderedKeys = [];
        for (var k=0; k<768; k++) {
            var mocCells = mocCellsIdxOrder3[k];
            for (key in mocCells) {
                orderedKeys.push(parseInt(key));
            }
        }
        orderedKeys.sort(function(a, b) {return a - b;});
        var norderMax = orderedKeys[orderedKeys.length-1];

        var nside, xyCorners, ipix;
        var potentialVisibleHpxCellsOrder3 = this.view.getVisiblePixList(3, CooFrameEnum.J2000);
        var visibleHpxCellsOrder3 = [];
        // let's test first all potential visible cells and keep only the one with a projection inside the view
        for (var k=0; k<potentialVisibleHpxCellsOrder3.length; k++) {
            var ipix = potentialVisibleHpxCellsOrder3[k];
            xyCorners = getXYCorners(8, ipix, viewFrame, surveyFrame, width, height, largestDim, zoomFactor, projection); 
            if (xyCorners) {
                visibleHpxCellsOrder3.push(ipix);
            }
        }

        var counter = 0;
        var mocCells;
        for (var norder=0; norder<=norderMax; norder++) {
            nside = 1 << norder;

            for (var i=0; i<visibleHpxCellsOrder3.length; i++) {
                var ipixOrder3 = visibleHpxCellsOrder3[i];
                mocCells = mocCellsIdxOrder3[ipixOrder3];
                if (typeof mocCells[norder]==='undefined') {
                    continue;
                }
            
                if (norder<=3) {
                    for (var j=0; j<mocCells[norder].length; j++) {
                        ipix = mocCells[norder][j];
                        var factor = Math.pow(4, (3-norder));
                        var startIpix = ipix * factor;
                        for (var k=0; k<factor; k++) {
                            norder3Ipix = startIpix + k;
                            xyCorners = getXYCorners(8, norder3Ipix, viewFrame, surveyFrame, width, height, largestDim, zoomFactor, projection);
                            if (xyCorners) {
                                drawCorners(ctx, xyCorners);
                            }
                        }
                    }
                }
                else {
                    for (var j=0; j<mocCells[norder].length; j++) {
                        ipix = mocCells[norder][j];
                        var parentIpixOrder3 = Math.floor(ipix/Math.pow(4, norder-3));
                        xyCorners = getXYCorners(nside, ipix, viewFrame, surveyFrame, width, height, largestDim, zoomFactor, projection);
                        if (xyCorners) {
                            drawCorners(ctx, xyCorners);
                        }
                    }
                }
            }
        }


        if (this.opacity==1) {
            ctx.stroke();
        }
        else {
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    };

    var drawCorners = function(ctx, xyCorners) {
        ctx.moveTo(xyCorners[0].vx, xyCorners[0].vy);
        ctx.lineTo(xyCorners[1].vx, xyCorners[1].vy);
        ctx.lineTo(xyCorners[2].vx, xyCorners[2].vy);
        ctx.lineTo(xyCorners[3].vx, xyCorners[3].vy);
        ctx.lineTo(xyCorners[0].vx, xyCorners[0].vy);
    }

    // remove duplicate items from array a
    var uniq = function(a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = a[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
            }
        }

        return out;
    };


    // TODO: merge with what is done in View.getVisibleCells
    var _spVec = new SpatialVector();
    var getXYCorners = function(nside, ipix, viewFrame, surveyFrame, width, height, largestDim, zoomFactor, projection) {
        var cornersXYView = [];
        var cornersXY = [];

        var spVec = _spVec;

        var corners = HealpixCache.corners_nest(ipix, nside);
        for (var k=0; k<4; k++) {
            spVec.setXYZ(corners[k].x, corners[k].y, corners[k].z);

            // need for frame transformation ?
            if (surveyFrame && surveyFrame.system != viewFrame.system) {
                if (surveyFrame.system == CooFrameEnum.SYSTEMS.J2000) {
                    var radec = CooConversion.J2000ToGalactic([spVec.ra(), spVec.dec()]);
                    lon = radec[0];
                    lat = radec[1];
                }
                else if (surveyFrame.system == CooFrameEnum.SYSTEMS.GAL) {
                    var radec = CooConversion.GalacticToJ2000([spVec.ra(), spVec.dec()]);
                    lon = radec[0];
                    lat = radec[1];
                }
            }
            else {
                lon = spVec.ra();
                lat = spVec.dec();
            }

            cornersXY[k] = projection.project(lon, lat);
        }


        if (cornersXY[0] == null ||  cornersXY[1] == null  ||  cornersXY[2] == null ||  cornersXY[3] == null ) {
            return null;
        }

        for (var k=0; k<4; k++) {
            cornersXYView[k] = AladinUtils.xyToView(cornersXY[k].X, cornersXY[k].Y, width, height, largestDim, zoomFactor);
        }

        var indulge = 10;
        // detect pixels outside view. Could be improved !
        // we minimize here the number of cells returned
        if( cornersXYView[0].vx<0 && cornersXYView[1].vx<0 && cornersXYView[2].vx<0 &&cornersXYView[3].vx<0) {
            return null;
        }
        if( cornersXYView[0].vy<0 && cornersXYView[1].vy<0 && cornersXYView[2].vy<0 &&cornersXYView[3].vy<0) {
            return null;
        }
        if( cornersXYView[0].vx>=width && cornersXYView[1].vx>=width && cornersXYView[2].vx>=width &&cornersXYView[3].vx>=width) {
            return null;
        }
        if( cornersXYView[0].vy>=height && cornersXYView[1].vy>=height && cornersXYView[2].vy>=height &&cornersXYView[3].vy>=height) {
            return null;
        }

        cornersXYView = AladinUtils.grow2(cornersXYView, 1);
        return cornersXYView;
    };

    MOC.prototype.reportChange = function() {
        this.view && this.view.requestRedraw();
    };

    MOC.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        this.reportChange();
    };

    MOC.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        this.reportChange();
    };

    // Tests whether a given (ra, dec) point on the sky is within the current MOC object
    //
    // returns true if point is contained, false otherwise
    MOC.prototype.contains = function(ra, dec) {
        var hpxIdx = new HealpixIndex(Math.pow(2, this.order));
        hpxIdx.init();
        var polar = Utils.radecToPolar(ra, dec);
        var ipix = hpxIdx.ang2pix_nest(polar.theta, polar.phi);
        var ipixMapByOrder = {};
        for (var curOrder=0; curOrder<=this.order; curOrder++) {
            ipixMapByOrder[curOrder] = Math.floor(ipix / Math.pow(4, this.order - curOrder));
        }

        // first look for large HEALPix cells (order<3)
        for (var ipixOrder3=0; ipixOrder3<768; ipixOrder3++) {
            var mocCells = this._highResIndexOrder3[ipixOrder3];
            for (var order in mocCells) {
                if (order<3) {
                    for (var k=mocCells[order].length; k>=0; k--) {
                        if (ipixMapByOrder[order] == mocCells[order][k]) {
                            return true;
                        }   
                    }
                }
            }
        }

        // look for finer cells
        var ipixOrder3 = ipixMapByOrder[3];
        var mocCells = this._highResIndexOrder3[ipixOrder3];
        for (var order in mocCells) {
            for (var k=mocCells[order].length; k>=0; k--) {
                if (ipixMapByOrder[order] == mocCells[order][k]) {
                    return true;
                }   
            }
        }

        return false;
    };



    return MOC;

})();

    
// Copyright 2015 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File CooGrid
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

CooGrid = (function() {
    var CooGrid = function() {
    };
    
    function viewxy2lonlat(projection, vx, vy, width, height, largestDim, zoomFactor) {
        var xy = AladinUtils.viewToXy(vx, vy, width, height, largestDim, zoomFactor);
        var lonlat;
        try {
            lonlat = projection.unproject(xy.x, xy.y);
        }
        catch(err) {
            return null;
        }
        return {lon: lonlat.ra, lat: lonlat.dec};
    };
    
    var NB_STEPS = 10;
    var NB_LINES = 10;
    
    CooGrid.prototype.redraw = function(ctx, projection, frame, width, height, largestDim, zoomFactor, fov) {
        if (fov>60) { // currently not supported
            return; 
        }
        
        var lonMax = 0, lonMin = 359.9999, latMax = -90, latMin = 90;
        var lonlat1 = viewxy2lonlat(projection, 0, 0, width, height, largestDim, zoomFactor);
        var lonlat2 = viewxy2lonlat(projection, width-1, height-1, width, height, largestDim, zoomFactor);
        lonMin = Math.min(lonlat1.lon, lonlat2.lon);
        lonMax = Math.max(lonlat1.lon, lonlat2.lon);
        latMin = Math.min(lonlat1.lat, lonlat2.lat);
        latMax = Math.max(lonlat1.lat, lonlat2.lat);
        
        var lonlat3 = viewxy2lonlat(projection, 0, height-1, width, height, largestDim, zoomFactor);
        lonMin = Math.min(lonMin, lonlat3.lon);
        lonMax = Math.max(lonMax, lonlat3.lon);
        latMin = Math.min(latMin, lonlat3.lat);
        latMax = Math.max(latMax, lonlat3.lat);
        
        var lonlat4 = viewxy2lonlat(projection, width-1, 0, width, height, largestDim, zoomFactor);
        lonMin = Math.min(lonMin, lonlat4.lon);
        lonMax = Math.max(lonMax, lonlat4.lon);
        latMin = Math.min(latMin, lonlat4.lat);
        latMax = Math.max(latMax, lonlat4.lat);
        

        
        var lonDiff = lonMax - lonMin;
        var latDiff = latMax - latMin;
        
        var LON_STEP, LAT_STEP;
        if (fov>10) {
            LON_STEP = 4;
            LAT_STEP = 4;
        }
        else if (fov>1) {
            LON_STEP = 1;
            LAT_STEP = 1;
        }
        else if (fov>0.1) {
            LON_STEP = 0.1;
            LAT_STEP = 0.1;
        }
        else {
            LON_STEP = 0.01;
            LAT_STEP = 0.01;
        }
        
        var lonStart = Math.round(lonMin % LON_STEP) * (LON_STEP);
        var latStart = Math.round(latMin % LAT_STEP) * (LAT_STEP);
        
        
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(120,120,255)";
        // draw iso-latitudes lines
        for (var lat=latStart; lat<latMax+LAT_STEP; lat+=LAT_STEP) {
            ctx.beginPath();
            
            var vxy;
            vxy = AladinUtils.radecToViewXy(lonMin, lat, projection, CooFrameEnum.J2000, width, height, largestDim, zoomFactor);
            if (!vxy) {
                continue;
            }
            ctx.moveTo(vxy.vx, vxy.vy);
            var k = 0;
            for (var lon=lonMin; lon<lonMax+LON_STEP; lon+=lonDiff/10) {
                k++;
                vxy = AladinUtils.radecToViewXy(lon, lat, projection, CooFrameEnum.J2000, width, height, largestDim, zoomFactor);
                ctx.lineTo(vxy.vx, vxy.vy);
                if (k==3 ) {
                    ctx.strokeText(lat.toFixed(2), vxy.vx, vxy.vy-2);
                }
                
            }
            ctx.stroke();
        }
        
        for (var lon=lonStart; lon<lonMax+LON_STEP; lon+=LON_STEP) {
            ctx.beginPath();
            
            var vxy;
            vxy = AladinUtils.radecToViewXy(lon, latMin, projection, CooFrameEnum.J2000, width, height, largestDim, zoomFactor);
            if (!vxy) {
                continue;
            }
            ctx.moveTo(vxy.vx, vxy.vy);
            var k = 0;
            for (var lat=latMin; lat<latMax+LAT_STEP; lat+=latDiff/10) {
                k++;
                vxy = AladinUtils.radecToViewXy(lon, lat, projection, CooFrameEnum.J2000, width, height, largestDim, zoomFactor);
                ctx.lineTo(vxy.vx, vxy.vy);
                if (k==3 ) {
                    ctx.strokeText(lon.toFixed(2), vxy.vx, vxy.vy-2);
                }
            }
            ctx.stroke();
        }
        
        
        
    };

    
    
    return CooGrid;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Footprint
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Footprint = (function() {
    // constructor
    Footprint = function(polygons) {
        this.polygons = polygons;
    	this.overlay = null;

        // TODO : all graphic overlays should have an id
        this.id = 'footprint-' + Utils.uuidv4();
    	
    	this.isShowing = true;
    	this.isSelected = false;
    };
    
    Footprint.prototype.setOverlay = function(overlay) {
        this.overlay = overlay;
    };
    
    Footprint.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Footprint.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };

    Footprint.prototype.dispatchClickEvent = function() {
        if (this.overlay) {
            // footprint selection code adapted from Fabrizio Giordano dev. from Serco for ESA/ESDC
            //window.dispatchEvent(new CustomEvent("footprintClicked", {
            this.overlay.view.aladinDiv.dispatchEvent(new CustomEvent("footprintClicked", {
                detail: {
                    footprintId: this.id,
                    overlayName: this.overlay.name
                }
            }));
        }
    };
    
    Footprint.prototype.select = function() {
        if (this.isSelected) {
            return;
        }
        this.isSelected = true;
        if (this.overlay) {
/*
            // footprint selection code adapted from Fabrizio Giordano dev. from Serco for ESA/ESDC
            //window.dispatchEvent(new CustomEvent("footprintClicked", {
            this.overlay.view.aladinDiv.dispatchEvent(new CustomEvent("footprintClicked", {
                detail: {
                    footprintId: this.id,
                    overlayName: this.overlay.name
                }
            }));
*/

            this.overlay.reportChange();
        }
    };

    Footprint.prototype.deselect = function() {
        if (! this.isSelected) {
            return;
        }
        this.isSelected = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    return Footprint;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Popup.js
 * 
 * Author: Thomas Boch [CDS]
 * 
 *****************************************************************************/

Popup = (function() {
    
    
    // constructor
    Popup = function(parentDiv, view) {
        this.domEl = $('<div class="aladin-popup-container"><div class="aladin-popup"><a class="aladin-closeBtn">&times;</a><div class="aladin-popupTitle"></div><div class="aladin-popupText"></div></div><div class="aladin-popup-arrow"></div></div>');
        this.domEl.appendTo(parentDiv);

        this.view = view;


        var self = this;
        // close popup
        this.domEl.find('.aladin-closeBtn').click(function() {self.hide();});
        
    };
    
    Popup.prototype.hide = function() {
        this.domEl.hide();

        this.view.mustClearCatalog=true;
        this.view.catalogForPopup.hide();
    };

    Popup.prototype.show = function() {
        this.domEl.show();
    };

    Popup.prototype.setTitle = function(title) {
        this.domEl.find('.aladin-popupTitle').html(title || '');
    };

    Popup.prototype.setText = function(text) {
        this.domEl.find('.aladin-popupText').html(text || '');
        this.w = this.domEl.outerWidth();
        this.h = this.domEl.outerHeight();
    };

    Popup.prototype.setSource = function(source) {
        // remove reference to popup for previous source
        if (this.source) {
            this.source.popup = null;
        }
        source.popup = this;
        this.source = source;
        this.setPosition(source.x, source.y);
    };

    Popup.prototype.setPosition = function(x, y) {
        var newX = x - this.w/2;
        var newY = y - this.h;
        if (this.source) {
            newY += this.source.catalog.sourceSize/2;
        }

        this.domEl[0].style.left = newX + 'px';
        this.domEl[0].style.top  = newY + 'px';
    };
    
    return Popup;
})();

// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Circle
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

// TODO : Circle and Footprint should inherit from the same root object
Circle = (function() {
    // constructor
    Circle = function(centerRaDec, radiusDegrees, options) {
        options = options || {};
        
        this.color = options['color'] || undefined;

        // TODO : all graphic overlays should have an id
        this.id = 'circle-' + Utils.uuidv4();

        this.setCenter(centerRaDec);
        this.setRadius(radiusDegrees);
    	this.overlay = null;
    	
    	this.isShowing = true;
    	this.isSelected = false;
    };

    Circle.prototype.setOverlay = function(overlay) {
        this.overlay = overlay;
    };
    
    Circle.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Circle.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Circle.prototype.dispatchClickEvent = function() {
        if (this.overlay) {
            // footprint selection code adapted from Fabrizio Giordano dev. from Serco for ESA/ESDC
            //window.dispatchEvent(new CustomEvent("footprintClicked", {
            this.overlay.view.aladinDiv.dispatchEvent(new CustomEvent("footprintClicked", {
                detail: {
                    footprintId: this.id,
                    overlayName: this.overlay.name
                }
            }));
        }
    };
    
    Circle.prototype.select = function() {
        if (this.isSelected) {
            return;
        }
        this.isSelected = true;
        if (this.overlay) {
/*
            this.overlay.view.aladinDiv.dispatchEvent(new CustomEvent("footprintClicked", {
                detail: {
                    footprintId: this.id,
                    overlayName: this.overlay.name
                }
            }));
*/

            this.overlay.reportChange();
        }
    };

    Circle.prototype.deselect = function() {
        if (! this.isSelected) {
            return;
        }
        this.isSelected = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };


    
    Circle.prototype.setCenter = function(centerRaDec) {
        this.centerRaDec = centerRaDec;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };

    Circle.prototype.setRadius = function(radiusDegrees) {
        this.radiusDegrees = radiusDegrees;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };

    // TODO
    Circle.prototype.draw = function(ctx, projection, frame, width, height, largestDim, zoomFactor, noStroke) {
        if (! this.isShowing) {
            return;
        }


        noStroke = noStroke===true || false;

        var centerXy;
        if (frame.system != CooFrameEnum.SYSTEMS.J2000) {
            var lonlat = CooConversion.J2000ToGalactic([this.centerRaDec[0], this.centerRaDec[1]]);
            centerXy = projection.project(lonlat[0], lonlat[1]);
        }
        else {
            centerXy = projection.project(this.centerRaDec[0], this.centerRaDec[1]);
        }
        if (!centerXy) {
            return;
        }
        var centerXyview = AladinUtils.xyToView(centerXy.X, centerXy.Y, width, height, largestDim, zoomFactor, false);

        // compute value of radius in pixels in current projection
        var circlePtXy;
        var ra = this.centerRaDec[0];
        var dec = this.centerRaDec[1] + (ra>0 ? - this.radiusDegrees : this.radiusDegrees);
        if (frame.system != CooFrameEnum.SYSTEMS.J2000) {
            var lonlat = CooConversion.J2000ToGalactic([ra, dec]);
            circlePtXy = projection.project(lonlat[0], lonlat[1]);
        }
        else {
            circlePtXy = projection.project(ra, dec);
        }
        if (!circlePtXy) {
            return;
        }
        var circlePtXyView = AladinUtils.xyToView(circlePtXy.X, circlePtXy.Y, width, height, largestDim, zoomFactor, false);
        var dx = circlePtXyView.vx - centerXyview.vx;
        var dy = circlePtXyView.vy - centerXyview.vy;
        var radiusInPix = Math.sqrt(dx*dx + dy*dy);

        // TODO : check each 4 point until show
        var baseColor = this.color;
        if (! baseColor && this.overlay) {
            baseColor = this.overlay.color;
        }
        if (! baseColor) {
            baseColor = '#ff0000';
        }
        
        if (this.isSelected) {
            ctx.strokeStyle= Overlay.increaseBrightness(baseColor, 50);
        }
        else {
            ctx.strokeStyle= baseColor;
        }

        ctx.beginPath();
        ctx.arc(centerXyview.vx, centerXyview.vy, radiusInPix, 0, 2*Math.PI, false);
        if (!noStroke) {
            ctx.stroke();
        }
    }; 
    
    return Circle;
})();
// Copyright 2015 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * Class Polyline
 * 
 * A Polyline is a graphical overlay made of several connected points
 * 
 * TODO: Polyline and Circle should derive from a common base class
 * TODO: index polyline, Circle in HEALPix pixels to avoid unneeded calls to draw 
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Polyline= (function() {
    // constructor
    Polyline = function(radecArray, options) {
        options = options || {};
        this.color = options['color'] || undefined;
        
        this.radecArray = radecArray;
        this.overlay = null;
    	
    	this.isShowing = true;
    	this.isSelected = false;
    };
    
    Polyline.prototype.setOverlay = function(overlay) {
        this.overlay = overlay;
    };
    
    Polyline.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Polyline.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Polyline.prototype.select = function() {
        if (this.isSelected) {
            return;
        }
        this.isSelected = true;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Polyline.prototype.deselect = function() {
        if (! this.isSelected) {
            return;
        }
        this.isSelected = false;
        if (this.overlay) {
            this.overlay.reportChange();
        }
    };
    
    Polyline.prototype.draw = function(ctx, projection, frame, width, height, largestDim, zoomFactor) {
        if (! this.isShowing) {
            return;
        }

        if (! this.radecArray || this.radecArray.length<2) {
            return;
        }
        
        if (this.color) {
            ctx.strokeStyle= this.color;
        }
        var start = AladinUtils.radecToViewXy(this.radecArray[0][0], this.radecArray[0][1], projection, frame, width, height, largestDim, zoomFactor);
        if (! start) {
            return;
        }
        
        ctx.moveTo(start.vx, start.vy);
        var pt;
        for (var k=1; k<this.radecArray.length; k++) {
            pt = AladinUtils.radecToViewXy(this.radecArray[k][0], this.radecArray[k][1], projection, frame, width, height, largestDim, zoomFactor);
            if (!pt) {
                break;
            }
            ctx.lineTo(pt.vx, pt.vy);
        }
        
        
        ctx.stroke();
    };
    
    return Polyline;
})();
// Copyright 2015 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Overlay
 *
 * Description: a plane holding overlays (footprints, polylines, circles)
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Overlay = (function() {
   Overlay = function(options) {
        options = options || {};

        this.type = 'overlay';

    	this.name = options.name || "overlay";
    	this.color = options.color || Color.getNextColor();
        
    	this.lineWidth = options["lineWidth"] || 2;
    	
    	//this.indexationNorder = 5; // at which level should we index overlays?
    	this.overlays = [];
    	this.overlay_items = []; // currently Circle or Polyline
    	//this.hpxIdx = new HealpixIndex(this.indexationNorder);
    	//this.hpxIdx.init();
    	
    	this.isShowing = true;
    };
    

    // TODO : show/hide methods should be integrated in a parent class 
    Overlay.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        this.reportChange();
    };
    
    Overlay.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        this.reportChange();
    };
    
    // return an array of Footprint from a STC-S string
    Overlay.parseSTCS = function(stcs) {
        var footprints = [];
        var parts = stcs.match(/\S+/g);
        var k = 0, len = parts.length;
        while(k<len) {
            var s = parts[k].toLowerCase();
            if(s=='polygon') {
                var curPolygon = [];
                k++;
                frame = parts[k].toLowerCase();
                if (frame=='icrs' || frame=='j2000' || frame=='fk5') {
                    while(k+2<len) {
                        var ra = parseFloat(parts[k+1]);
                        if (isNaN(ra)) {
                            break;
                        }
                        var dec = parseFloat(parts[k+2]);
                        curPolygon.push([ra, dec]);
                        k += 2;
                    }
                    curPolygon.push(curPolygon[0]);
                    footprints.push(new Footprint(curPolygon));
                }
            }
            else if (s=='circle') {
                var frame;
                k++;
                frame = parts[k].toLowerCase();

                if (frame=='icrs' || frame=='j2000' || frame=='fk5') {
                    var ra, dec, radiusDegrees;

                    ra = parseFloat(parts[k+1]);
                    dec = parseFloat(parts[k+2]);
                    radiusDegrees = parseFloat(parts[k+3]);

                    footprints.push(A.circle(ra, dec, radiusDegrees)); 

                    k += 3;
                }
            }

            k++;
        }

        return footprints;
    };
    
    // ajout d'un tableau d'overlays (= objets Footprint, Circle ou Polyline)
    Overlay.prototype.addFootprints = function(overlaysToAdd) {
    	for (var k=0, len=overlaysToAdd.length; k<len; k++) {
            this.add(overlaysToAdd[k], false);
        }

        this.view.requestRedraw();
    };

    // TODO : item doit pouvoir prendre n'importe quoi en param (footprint, circle, polyline)
    Overlay.prototype.add = function(item, requestRedraw) {
        requestRedraw = requestRedraw !== undefined ? requestRedraw : true;

        if (item instanceof Footprint) {
            this.overlays.push(item);
        }
        else {
            this.overlay_items.push(item);
        }
        item.setOverlay(this);
        
        if (requestRedraw) {
            this.view.requestRedraw();
        }
    };

    
    // return a footprint by index
   Overlay.prototype.getFootprint = function(idx) {
        if (idx<this.footprints.length) {
            return this.footprints[idx];
        }
        else {
            return null;
        }
    };
    
    Overlay.prototype.setView = function(view) {
        this.view = view;
    };
    
    Overlay.prototype.removeAll = function() {
        // TODO : RAZ de l'index
        this.overlays = [];
        this.overlay_items = [];
    };
    
    Overlay.prototype.draw = function(ctx, projection, frame, width, height, largestDim, zoomFactor) {
        if (!this.isShowing) {
            return;
        }
        
        // simple drawing
        ctx.strokeStyle= this.color;

        // 1. Drawing polygons
        
        // TODO: les overlay polygons devrait se tracer lui meme (methode draw)
        ctx.lineWidth = this.lineWidth;
    	ctx.beginPath();
    	xyviews = [];
    	for (var k=0, len = this.overlays.length; k<len; k++) {
    		xyviews.push(this.drawFootprint(this.overlays[k], ctx, projection, frame, width, height, largestDim, zoomFactor));
    	}
        ctx.stroke();

    	// selection drawing
        ctx.strokeStyle= Overlay.increaseBrightness(this.color, 50);
        ctx.beginPath();
        for (var k=0, len = this.overlays.length; k<len; k++) {
            if (! this.overlays[k].isSelected) {
                continue;
            }
            this.drawFootprintSelected(ctx, xyviews[k]);
            
        }
    	ctx.stroke();
    	
        // 2. Circle and polylines drawing
    	for (var k=0; k<this.overlay_items.length; k++) {
    	    this.overlay_items[k].draw(ctx, projection, frame, width, height, largestDim, zoomFactor);
    	}
    };

    Overlay.increaseBrightness = function(hex, percent){
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if(hex.length == 3){
            hex = hex.replace(/(.)/g, '$1$1');
        }

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return '#' +
                ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    };
    
    
    Overlay.prototype.drawFootprint = function(f, ctx, projection, frame, width, height, largestDim, zoomFactor) {
        if (! f.isShowing) {
            return null;
        }
        var xyviewArray = [];
        var show = false;
        var radecArray = f.polygons;
        // for
            for (var k=0, len=radecArray.length; k<len; k++) {
                var xy;
                if (frame.system != CooFrameEnum.SYSTEMS.J2000) {
                    var lonlat = CooConversion.J2000ToGalactic([radecArray[k][0], radecArray[k][1]]);
                    xy = projection.project(lonlat[0], lonlat[1]);
                }
                else {
                    xy = projection.project(radecArray[k][0], radecArray[k][1]);
                }
                if (!xy) {
                    return null;
                }
                var xyview = AladinUtils.xyToView(xy.X, xy.Y, width, height, largestDim, zoomFactor);
                xyviewArray.push(xyview);
                if (!show && xyview.vx<width  && xyview.vx>=0 && xyview.vy<=height && xyview.vy>=0) {
                    show = true;
                }
            }

            if (show) {
                ctx.moveTo(xyviewArray[0].vx, xyviewArray[0].vy);
                for (var k=1, len=xyviewArray.length; k<len; k++) {
                    ctx.lineTo(xyviewArray[k].vx, xyviewArray[k].vy);
                }
            }
            else {
                //return null;
            }
        // end for

        return xyviewArray;



    };

    Overlay.prototype.drawFootprintSelected = function(ctx, xyview) {
        if (!xyview) {
            return;
        }

        var xyviewArray = xyview;
        ctx.moveTo(xyviewArray[0].vx, xyviewArray[0].vy);
        for (var k=1, len=xyviewArray.length; k<len; k++) {
            ctx.lineTo(xyviewArray[k].vx, xyviewArray[k].vy);
        }
    };


    
    // callback function to be called when the status of one of the footprints has changed
    Overlay.prototype.reportChange = function() {
        this.view.requestRedraw();
    };

    return Overlay;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Source
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

cds.Source = (function() {
    // constructor
    cds.Source = function(ra, dec, data, options) {
    	this.ra = ra;
    	this.dec = dec;
    	this.data = data;
    	this.catalog = null;
    	
        this.marker = (options && options.marker) || false;
        if (this.marker) {
            this.popupTitle = (options && options.popupTitle) ? options.popupTitle : '';
            this.popupDesc = (options && options.popupDesc) ? options.popupDesc : '';
            this.useMarkerDefaultIcon = (options && options.useMarkerDefaultIcon!==undefined) ? options.useMarkerDefaultIcon : true;
        }

    	this.isShowing = true;
    	this.isSelected = false;
    };
    
    cds.Source.prototype.setCatalog = function(catalog) {
        this.catalog = catalog;
    };
    
    cds.Source.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        if (this.catalog) {
            this.catalog.reportChange();
        }
    };
    
    cds.Source.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        if (this.catalog) {
            this.catalog.reportChange();
        }
    };
    
    cds.Source.prototype.select = function() {
        if (this.isSelected) {
            return;
        }
        this.isSelected = true;
        if (this.catalog) {
            this.catalog.reportChange();
        }
    };
    
    cds.Source.prototype.deselect = function() {
        if (! this.isSelected) {
            return;
        }
        this.isSelected = false;
        if (this.catalog) {
            this.catalog.reportChange();
        }
    };

    // function called when a source is clicked. Called by the View object
    cds.Source.prototype.actionClicked = function() {
        if (this.catalog && this.catalog.onClick) {
            var view = this.catalog.view;
            if (this.catalog.onClick=='showTable') {
                view.aladin.measurementTable.showMeasurement(this);
                this.select();
            }
            else if (this.catalog.onClick=='showPopup') {
                view.popup.setTitle('<br><br>');
                var m = '<div class="aladin-marker-measurement">';
                m += '<table>';
                for (var key in this.data) {
                    m += '<tr><td>' + key + '</td><td>' + this.data[key] + '</td></tr>';
                }
                m += '</table>';
                m += '</div>';
                view.popup.setText(m);
                view.popup.setSource(this);
                view.popup.show();
            }
            else if (typeof this.catalog.onClick === 'function') {
                this.catalog.onClick(this);
                view.lastClickedObject = this;
            }

        }
    };

    
    cds.Source.prototype.actionOtherObjectClicked = function() {
        if (this.catalog && this.catalog.onClick) {
            this.deselect();
        }
    };
    
    return cds.Source;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//




/******************************************************************************
 * Aladin Lite project
 * 
 * File Catalog
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

// TODO : harmoniser parsing avec classe ProgressiveCat
cds.Catalog = (function() {
   cds.Catalog = function(options) {
        options = options || {};

        this.type = 'catalog';    	this.name = options.name || "catalog";
    	this.color = options.color || Color.getNextColor();
    	this.sourceSize = options.sourceSize || 8;
    	this.markerSize = options.sourceSize || 12;
    	this.shape = options.shape || "square";
        this.maxNbSources = options.limit || undefined;
        this.onClick = options.onClick || undefined;

        this.raField = options.raField || undefined; // ID or name of the field holding RA
        this.decField = options.decField || undefined; // ID or name of the field holding dec

    	this.indexationNorder = 5; // Ã  quel niveau indexe-t-on les sources
    	this.sources = [];
    	this.hpxIdx = new HealpixIndex(this.indexationNorder);
    	this.hpxIdx.init();

        this.displayLabel = options.displayLabel || false;
        this.labelColor = options.labelColor || this.color;
        this.labelFont = options.labelFont || '10px sans-serif';
        if (this.displayLabel) {
            this.labelColumn = options.labelColumn;
            if (!this.labelColumn) {
                this.displayLabel = false;
            }
        }
    	
        if (this.shape instanceof Image || this.shape instanceof HTMLCanvasElement) {
            this.sourceSize = this.shape.width;
        }
        this._shapeIsFunction = false; // if true, the shape is a function drawing on the canvas
        if ($.isFunction(this.shape)) {
            this._shapeIsFunction = true;
        }
        
    	this.selectionColor = '#00ff00';
    	

        // create this.cacheCanvas    	
    	// cacheCanvas permet de ne crÃ©er le path de la source qu'une fois, et de le rÃ©utiliser (cf. http://simonsarris.com/blog/427-increasing-performance-by-caching-paths-on-canvas)
        this.updateShape(options);

        this.cacheMarkerCanvas = document.createElement('canvas');
        this.cacheMarkerCanvas.width = this.markerSize;
        this.cacheMarkerCanvas.height = this.markerSize;
        var cacheMarkerCtx = this.cacheMarkerCanvas.getContext('2d');
        cacheMarkerCtx.fillStyle = this.color;
        cacheMarkerCtx.beginPath();
        var half = (this.markerSize)/2.;
        cacheMarkerCtx.arc(half, half, half-2, 0, 2 * Math.PI, false);
        cacheMarkerCtx.fill();
        cacheMarkerCtx.lineWidth = 2;
        cacheMarkerCtx.strokeStyle = '#ccc';
        cacheMarkerCtx.stroke();
        

        this.isShowing = true;
    };
    
    cds.Catalog.createShape = function(shapeName, color, sourceSize) {
        if (shapeName instanceof Image || shapeName instanceof HTMLCanvasElement) { // in this case, the shape is already created
            return shapeName;
        }
        var c = document.createElement('canvas');
        c.width = c.height = sourceSize;
        var ctx= c.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.0;
        if (shapeName=="plus") {
            ctx.moveTo(sourceSize/2., 0);
            ctx.lineTo(sourceSize/2., sourceSize);
            ctx.stroke();
            
            ctx.moveTo(0, sourceSize/2.);
            ctx.lineTo(sourceSize, sourceSize/2.);
            ctx.stroke();
        }
        else if (shapeName=="cross") {
            ctx.moveTo(0, 0);
            ctx.lineTo(sourceSize-1, sourceSize-1);
            ctx.stroke();
            
            ctx.moveTo(sourceSize-1, 0);
            ctx.lineTo(0, sourceSize-1);
            ctx.stroke();
        }
        else if (shapeName=="rhomb") {
            ctx.moveTo(sourceSize/2, 0);
            ctx.lineTo(0, sourceSize/2);
            ctx.lineTo(sourceSize/2, sourceSize);
            ctx.lineTo(sourceSize, sourceSize/2);
            ctx.lineTo(sourceSize/2, 0);
            ctx.stroke();
        }
        else if (shapeName=="triangle") {
            ctx.moveTo(sourceSize/2, 0);
            ctx.lineTo(0, sourceSize-1);
            ctx.lineTo(sourceSize-1, sourceSize-1);
            ctx.lineTo(sourceSize/2, 0);
            ctx.stroke();
        }
        else if (shapeName=="circle") {
            ctx.arc(sourceSize/2, sourceSize/2, sourceSize/2 - 1, 0, 2*Math.PI, true);
            ctx.stroke();
        }
        else { // default shape: square
            ctx.moveTo(1, 0);
            ctx.lineTo(1,  sourceSize-1);
            ctx.lineTo( sourceSize-1,  sourceSize-1);
            ctx.lineTo( sourceSize-1, 1);
            ctx.lineTo(1, 1);
            ctx.stroke();
        }
        
        return c;
        
    };
    

        // find RA, Dec fields among the given fields
        //
        // @param fields: list of objects with ucd, unit, ID, name attributes
        // @param raField:  index or name of right ascension column (might be undefined)
        // @param decField: index or name of declination column (might be undefined)
        //
        function findRADecFields(fields, raField, decField) {
            var raFieldIdx,  decFieldIdx;
            raFieldIdx = decFieldIdx = null;

            // first, look if RA/DEC fields have been already given
            if (raField) { // ID or name of RA field given at catalogue creation
                for (var l=0, len=fields.length; l<len; l++) {
                    var field = fields[l];
                    if (Utils.isInt(raField) && raField<fields.length) { // raField can be given as an index
                        raFieldIdx = raField;
                        break;
                    } 
                    if ( (field.ID && field.ID===raField) || (field.name && field.name===raField)) {
                        raFieldIdx = l;
                        break;
                    }
                }
            }
            if (decField) { // ID or name of dec field given at catalogue creation
                for (var l=0, len=fields.length; l<len; l++) {
                    var field = fields[l];
                    if (Utils.isInt(decField) && decField<fields.length) { // decField can be given as an index
                        decFieldIdx = decField;
                        break;
                    } 
                    if ( (field.ID && field.ID===decField) || (field.name && field.name===decField)) {
                        decFieldIdx = l;
                        break;
                    }
                }
            }
            // if not already given, let's guess position columns on the basis of UCDs
            for (var l=0, len=fields.length; l<len; l++) {
                if (raFieldIdx!=null && decFieldIdx!=null) {
                    break;
                }

                var field = fields[l];
                if ( ! raFieldIdx) {
                    if (field.ucd) {
                        var ucd = $.trim(field.ucd.toLowerCase());
                        if (ucd.indexOf('pos.eq.ra')==0 || ucd.indexOf('pos_eq_ra')==0) {
                            raFieldIdx = l;
                            continue;
                        }
                    }
                }
                    
                if ( ! decFieldIdx) {
                    if (field.ucd) {
                        var ucd = $.trim(field.ucd.toLowerCase());
                        if (ucd.indexOf('pos.eq.dec')==0 || ucd.indexOf('pos_eq_dec')==0) {
                            decFieldIdx = l;
                            continue;
                        }
                    }
                }
            }

            // still not found ? try some common names for RA and Dec columns
            if (raFieldIdx==null && decFieldIdx==null) {
                for (var l=0, len=fields.length; l<len; l++) {
                    var field = fields[l];
                    var name = field.name || field.ID || '';
                    name = name.toLowerCase();
                    
                    if ( ! raFieldIdx) {
                        if (name.indexOf('ra')==0 || name.indexOf('_ra')==0 || name.indexOf('ra(icrs)')==0 || name.indexOf('_ra')==0 || name.indexOf('alpha')==0) {
                            raFieldIdx = l;
                            continue;
                        }
                    }

                    if ( ! decFieldIdx) {
                        if (name.indexOf('dej2000')==0 || name.indexOf('_dej2000')==0 || name.indexOf('de')==0 || name.indexOf('de(icrs)')==0 || name.indexOf('_de')==0 || name.indexOf('delta')==0) {
                            decFieldIdx = l;
                            continue;
                        }
                    }
                    
                }
            }

            // last resort: take two first fieds
            if (raFieldIdx==null || decFieldIdx==null) {
                raFieldIdx  = 0;
                decFieldIdx = 1
            }

            return [raFieldIdx, decFieldIdx];
        };
        
    
    
    // return an array of Source(s) from a VOTable url
    // callback function is called each time a TABLE element has been parsed
    cds.Catalog.parseVOTable = function(url, callback, maxNbSources, useProxy, raField, decField) {

        // adapted from votable.js
        function getPrefix($xml) {
            var prefix;
            // If Webkit chrome/safari/... (no need prefix)
            if($xml.find('RESOURCE').length>0) {
                prefix = '';
            }
            else {
                // Select all data in the document
                prefix = $xml.find("*").first();

                if (prefix.length==0) {
                    return '';
                }

                // get name of the first tag
                prefix = prefix.prop("tagName");

                var idx = prefix.indexOf(':');

                prefix = prefix.substring(0, idx) + "\\:";


            }

            return prefix;
        }

        function doParseVOTable(xml, callback) {
            xml = xml.replace(/^\s+/g, ''); // we need to trim whitespaces at start of document
            var attributes = ["name", "ID", "ucd", "utype", "unit", "datatype", "arraysize", "width", "precision"];
            
            var fields = [];
            var k = 0;
            var $xml = $($.parseXML(xml));
            var prefix = getPrefix($xml);
            $xml.find(prefix + "FIELD").each(function() {
                var f = {};
                for (var i=0; i<attributes.length; i++) {
                    var attribute = attributes[i];
                    if ($(this).attr(attribute)) {
                        f[attribute] = $(this).attr(attribute);
                    }
                }
                if ( ! f.ID) {
                    f.ID = "col_" + k;
                }
                fields.push(f);
                k++;
            });
                
            var raDecFieldIdxes = findRADecFields(fields, raField, decField);
            var raFieldIdx,  decFieldIdx;
            raFieldIdx = raDecFieldIdxes[0];
            decFieldIdx = raDecFieldIdxes[1];

            var sources = [];
            
            var coo = new Coo();
            var ra, dec;
            $xml.find(prefix + "TR").each(function() {
               var mesures = {};
               var k = 0;
               $(this).find(prefix + "TD").each(function() {
                   var key = fields[k].name ? fields[k].name : fields[k].id;
                   mesures[key] = $(this).text();
                   k++;
               });
               var keyRa = fields[raFieldIdx].name ? fields[raFieldIdx].name : fields[raFieldIdx].id;
               var keyDec = fields[decFieldIdx].name ? fields[decFieldIdx].name : fields[decFieldIdx].id;

               if (Utils.isNumber(mesures[keyRa]) && Utils.isNumber(mesures[keyDec])) {
                   ra = parseFloat(mesures[keyRa]);
                   dec = parseFloat(mesures[keyDec]);
               }
               else {
                   coo.parse(mesures[keyRa] + " " + mesures[keyDec]);
                   ra = coo.lon;
                   dec = coo.lat;
               }
               sources.push(new cds.Source(ra, dec, mesures));
               if (maxNbSources && sources.length==maxNbSources) {
                   return false; // break the .each loop
               }
                
            });
            if (callback) {
                callback(sources);
            }
        }
        
        var ajax = Utils.getAjaxObject(url, 'GET', 'text', useProxy);
        ajax.done(function(xml) {
            doParseVOTable(xml, callback);
        });
    };

    // API
    cds.Catalog.prototype.updateShape = function(options) {
        options = options || {};
    	this.color = options.color || this.color || Color.getNextColor();
    	this.sourceSize = options.sourceSize || this.sourceSize || 6;
    	this.shape = options.shape || this.shape || "square";

        this.selectSize = this.sourceSize + 2;

        this.cacheCanvas = cds.Catalog.createShape(this.shape, this.color, this.sourceSize); 
        this.cacheSelectCanvas = cds.Catalog.createShape('square', this.selectionColor, this.selectSize);

        this.reportChange();
    };
    
    // API
    cds.Catalog.prototype.addSources = function(sourcesToAdd) {
        sourcesToAdd = [].concat(sourcesToAdd); // make sure we have an array and not an individual source
    	this.sources = this.sources.concat(sourcesToAdd);
    	for (var k=0, len=sourcesToAdd.length; k<len; k++) {
    	    sourcesToAdd[k].setCatalog(this);
    	}
        this.reportChange();
    };

    // API
    //
    // create sources from a 2d array and add them to the catalog
    //
    // @param columnNames: array with names of the columns
    // @array: 2D-array, each item being a 1d-array with the same number of items as columnNames
    cds.Catalog.prototype.addSourcesAsArray = function(columnNames, array) {
        var fields = [];
        for (var colIdx=0 ; colIdx<columnNames.length; colIdx++) {
            fields.push({name: columnNames[colIdx]});
        }
        var raDecFieldIdxes = findRADecFields(fields, this.raField, this.decField);
        var raFieldIdx,  decFieldIdx;
        raFieldIdx = raDecFieldIdxes[0];
        decFieldIdx = raDecFieldIdxes[1];


        var newSources = [];
        var coo = new Coo();
        var ra, dec, row, dataDict;
        for (var rowIdx=0 ; rowIdx<array.length ; rowIdx++) {
            row = array[rowIdx];
            if (Utils.isNumber(row[raFieldIdx]) && Utils.isNumber(row[decFieldIdx])) {
                   ra = parseFloat(row[raFieldIdx]);
                   dec = parseFloat(row[decFieldIdx]);
            }
               else {
                   coo.parse(row[raFieldIdx] + " " + row[decFieldIdx]);
                   ra = coo.lon;
                   dec = coo.lat;
               }

            dataDict = {};
            for (var colIdx=0 ; colIdx<columnNames.length; colIdx++) {
                dataDict[columnNames[colIdx]] = row[colIdx];
            }

            newSources.push(A.source(ra, dec, dataDict));
        }

        this.addSources(newSources);
    };
    
    // return the current list of Source objects
    cds.Catalog.prototype.getSources = function() {
        return this.sources;
    };
    
    // TODO : fonction gÃ©nÃ©rique traversant la liste des sources
    cds.Catalog.prototype.selectAll = function() {
        if (! this.sources) {
            return;
        }
        
        for (var k=0; k<this.sources.length; k++) {
            this.sources[k].select();
        }
    };
    
    cds.Catalog.prototype.deselectAll = function() {
        if (! this.sources) {
            return;
        }
        
        for (var k=0; k<this.sources.length; k++) {
            this.sources[k].deselect();
        }
    };
    
    // return a source by index
    cds.Catalog.prototype.getSource = function(idx) {
        if (idx<this.sources.length) {
            return this.sources[idx];
        }
        else {
            return null;
        }
    };
    
    cds.Catalog.prototype.setView = function(view) {
        this.view = view;
        this.reportChange();
    };
    
    cds.Catalog.prototype.removeAll = cds.Catalog.prototype.clear = function() {
        // TODO : RAZ de l'index
        this.sources = [];
    };
    
    cds.Catalog.prototype.draw = function(ctx, projection, frame, width, height, largestDim, zoomFactor) {
        if (! this.isShowing) {
            return;
        }
        // tracÃ© simple
        //ctx.strokeStyle= this.color;

        //ctx.lineWidth = 1;
    	//ctx.beginPath();
        if (this._shapeIsFunction) {
            ctx.save();
        }
        var sourcesInView = [];
 	    for (var k=0, len = this.sources.length; k<len; k++) {
		    var inView = cds.Catalog.drawSource(this, this.sources[k], ctx, projection, frame, width, height, largestDim, zoomFactor);
            if (inView) {
                sourcesInView.push(this.sources[k]);
            }
        }
        if (this._shapeIsFunction) {
            ctx.restore();
        }
        //ctx.stroke();

    	// tracÃ© sÃ©lection
        ctx.strokeStyle= this.selectionColor;
        //ctx.beginPath();
        var source;
        for (var k=0, len = sourcesInView.length; k<len; k++) {
            source = sourcesInView[k];
            if (! source.isSelected) {
                continue;
            }
            cds.Catalog.drawSourceSelection(this, source, ctx);
            
        }
        // NEEDED ?
    	//ctx.stroke();

        // tracÃ© label
        if (this.displayLabel) {
            ctx.fillStyle = this.labelColor;
            ctx.font = this.labelFont;
            for (var k=0, len = sourcesInView.length; k<len; k++) {
                cds.Catalog.drawSourceLabel(this, sourcesInView[k], ctx);
            }
        }
    };
    
    
    
    cds.Catalog.drawSource = function(catalogInstance, s, ctx, projection, frame, width, height, largestDim, zoomFactor) {
        if (! s.isShowing) {
            return false;
        }
        var sourceSize = catalogInstance.sourceSize;
        // TODO : we could factorize this code with Aladin.world2pix
        var xy;
        if (frame.system != CooFrameEnum.SYSTEMS.J2000) {
            var lonlat = CooConversion.J2000ToGalactic([s.ra, s.dec]);
            xy = projection.project(lonlat[0], lonlat[1]);
        }
        else {
            xy = projection.project(s.ra, s.dec);
        }

        if (xy) {
            var xyview = AladinUtils.xyToView(xy.X, xy.Y, width, height, largestDim, zoomFactor, true);
            var max = s.popup ? 100 : s.sourceSize;
            if (xyview) {
                // TODO : index sources by HEALPix cells at level 3, 4 ?

                // check if source is visible in view
                if (xyview.vx>(width+max)  || xyview.vx<(0-max) ||
                    xyview.vy>(height+max) || xyview.vy<(0-max)) {
                    s.x = s.y = undefined;
                    return false;
                }
                
                s.x = xyview.vx;
                s.y = xyview.vy;
                if (catalogInstance._shapeIsFunction) {
                    catalogInstance.shape(s, ctx, catalogInstance.view.getViewParams());
                }
                else if (s.marker && s.useMarkerDefaultIcon) {
                    ctx.drawImage(catalogInstance.cacheMarkerCanvas, s.x-sourceSize/2, s.y-sourceSize/2);
                }
                else {
                    ctx.drawImage(catalogInstance.cacheCanvas, s.x-catalogInstance.cacheCanvas.width/2, s.y-catalogInstance.cacheCanvas.height/2);
                }


                // has associated popup ?
                if (s.popup) {
                    s.popup.setPosition(s.x, s.y);
                }
                
                
            }
            return true;
        }
        else {
            return false;
        }

        
    };
    
    cds.Catalog.drawSourceSelection = function(catalogInstance, s, ctx) {
        if (!s || !s.isShowing || !s.x || !s.y) {
            return;
        }
        var sourceSize = catalogInstance.selectSize;
        
        ctx.drawImage(catalogInstance.cacheSelectCanvas, s.x-sourceSize/2, s.y-sourceSize/2);
    };

    cds.Catalog.drawSourceLabel = function(catalogInstance, s, ctx) {
        if (!s || !s.isShowing || !s.x || !s.y) {
            return;
        }

        var label = s.data[catalogInstance.labelColumn];
        if (!label) {
            return;
        }

        ctx.fillText(label, s.x, s.y);
    };

    
    // callback function to be called when the status of one of the sources has changed
    cds.Catalog.prototype.reportChange = function() {
        this.view && this.view.requestRedraw();
    };
    
    cds.Catalog.prototype.show = function() {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        this.reportChange();
    };
    
    cds.Catalog.prototype.hide = function() {
        if (! this.isShowing) {
            return;
        }
        this.isShowing = false;
        if (this.view && this.view.popup && this.view.popup.source && this.view.popup.source.catalog==this) {
            this.view.popup.hide();
        }

        this.reportChange();
    };

    return cds.Catalog;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File ProgressiveCat.js
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

// TODO: index sources according to their HEALPix ipix
// TODO : merge parsing with class Catalog
ProgressiveCat = (function() {
    
    // TODO : test if CORS support. If no, need to pass through a proxy
    // currently, we suppose CORS is supported
    
    // constructor
    ProgressiveCat = function(rootUrl, frameStr, maxOrder, options) {
        options = options || {};

        this.type = 'progressivecat';
        
        this.rootUrl = rootUrl; // TODO: method to sanitize rootURL (absolute, no duplicate slashes, remove end slash if existing)
        // fast fix for HTTPS support --> will work for all HiPS served by CDS
        if (Utils.isHttpsContext() && ( /u-strasbg.fr/i.test(this.rootUrl) || /unistra.fr/i.test(this.rootUrl)  ) ) {
            this.rootUrl = this.rootUrl.replace('http://', 'https://');
        }

        this.frameStr = frameStr;
        this.frame = CooFrameEnum.fromString(frameStr) || CooFrameEnum.J2000;
        this.maxOrder = maxOrder;
        this.isShowing = true; // TODO : inherit from catalogue

        this.name = options.name || "progressive-cat";
        this.color = options.color || Color.getNextColor();
        this.shape = options.shape || "square";
        this.sourceSize = options.sourceSize || 6;
        this.selectSize = this.sourceSize + 2;
        this.selectionColor = '#00ff00'; // TODO: to be merged with Catalog

        // allows for filtering of sources
        this.filterFn = options.filter || undefined; // TODO: do the same for catalog


        this.onClick = options.onClick || undefined; // TODO: inherit from catalog

        

        // we cache the list of sources in each healpix tile. Key of the cache is norder+'-'+npix
        this.sourcesCache = new Utils.LRUCache(100);

        this.updateShape(options);




        this.maxOrderAllsky = 2;
        this.isReady = false;
    };

    // TODO: to be put higher in the class diagram, in a HiPS generic class
    ProgressiveCat.readProperties = function(rootUrl, successCallback, errorCallback) {
        if (! successCallback) {
            return;
        }

        var propertiesURL = rootUrl + '/properties';
        $.ajax({
            url: propertiesURL,
            method: 'GET',
            dataType: 'text',
            success: function(propertiesTxt) {
                var props = {};
                var lines = propertiesTxt.split('\n');
                for (var k=0; k<lines.length; k++) {
                    var line = lines[k];
                    var idx = line.indexOf('=');
                    var propName  = $.trim(line.substring(0, idx));
                    var propValue = $.trim(line.substring(idx + 1));
                    
                    props[propName] = propValue;
                }
    
                successCallback(props);
                
            },
            error: function(err) { // TODO : which parameters should we put in the error callback
                errorCallback && errorCallback(err);
            }
        });




        
    };

    function getFields(instance, xml) {
        var attributes = ["name", "ID", "ucd", "utype", "unit", "datatype", "arraysize", "width", "precision"];

        var fields = [];
        var k = 0;
        instance.keyRa = instance.keyDec = null;
        $(xml).find("FIELD").each(function() {
            var f = {};
            for (var i=0; i<attributes.length; i++) {
                var attribute = attributes[i];
                if ($(this).attr(attribute)) {
                    f[attribute] = $(this).attr(attribute);
                }
                
            }
            if ( ! f.ID) {
                f.ID = "col_" + k;
            }
            
            if (!instance.keyRa && f.ucd && (f.ucd.indexOf('pos.eq.ra')==0 || f.ucd.indexOf('POS_EQ_RA')==0)) {
                if (f.name) {
                    instance.keyRa = f.name;
                }
                else {
                    instance.keyRa = f.ID;
                }
            }
            if (!instance.keyDec && f.ucd && (f.ucd.indexOf('pos.eq.dec')==0 || f.ucd.indexOf('POS_EQ_DEC')==0)) {
                if (f.name) {
                    instance.keyDec = f.name;
                }
                else {
                    instance.keyDec = f.ID;
                }
            }
            
            fields.push(f);
            k++;
        });

        return fields;
    }

    function getSources(instance, csv, fields) {
        // TODO : find ra and dec key names (see in Catalog)
        if (!instance.keyRa || ! instance.keyDec) {
            return [];
        }
        lines = csv.split('\n');
        var mesureKeys = [];
        for (var k=0; k<fields.length; k++) {
            if (fields[k].name) {
                mesureKeys.push(fields[k].name);
            }
            else {
                mesureKeys.push(fields[k].ID);
            }
        }
        

        var sources = [];
        var coo = new Coo();
        var newSource;
        // start at i=1, as first line repeat the fields names
        for (var i=2; i<lines.length; i++) {
            var mesures = {};
            var data = lines[i].split('\t');
            if (data.length<mesureKeys.length) {
                continue;
            }
            for (var j=0; j<mesureKeys.length; j++) {
                mesures[mesureKeys[j]] = data[j];
            }
            var ra, dec;
            if (Utils.isNumber(mesures[instance.keyRa]) && Utils.isNumber(mesures[instance.keyDec])) {
                ra = parseFloat(mesures[instance.keyRa]);
                dec = parseFloat(mesures[instance.keyDec]);
            }
            else {
                coo.parse(mesures[instance.keyRa] + " " + mesures[instance.keyDec]);
                ra = coo.lon;
                dec = coo.lat;
            }
            newSource = new cds.Source(ra, dec, mesures);
            sources.push(newSource);
            newSource.setCatalog(instance);
        }
        return sources;
    };

    //ProgressiveCat.prototype.updateShape = cds.Catalog.prototype.updateShape;

    ProgressiveCat.prototype = {

        init: function(view) {
            var self = this;
            this.view = view;

            if (this.maxOrder && this.frameStr) {
                this._loadMetadata();
            }

            else {
                ProgressiveCat.readProperties(self.rootUrl,
                    function (properties) {
                        self.properties = properties;
                        self.maxOrder = self.properties['hips_order'];
                        self.frame = CooFrameEnum.fromString(self.properties['hips_frame']);

                        self._loadMetadata();
                    }, function(err) {
                        console.log('Could not find properties for HiPS ' + self.rootUrl);
                    }
                );
            }
        },

        updateShape: cds.Catalog.prototype.updateShape,

        _loadMetadata: function() {
            var self = this;
            $.ajax({
                url: self.rootUrl + '/' + 'Metadata.xml',
                method: 'GET',
                success: function(xml) {
                    self.fields = getFields(self, xml);
                    self._loadAllskyNewMethod();
                },
                error: function(err) {
                    self._loadAllskyOldMethod();
                }
            });
        },

        _loadAllskyNewMethod: function() {
            var self = this;
            $.ajax({
                url: self.rootUrl + '/' + 'Norder1/Allsky.tsv',
                method: 'GET',
                success: function(tsv) {
                    self.order1Sources = getSources(self, tsv, self.fields);

                    if (self.order2Sources) {
                        self.isReady = true;
                        self._finishInitWhenReady();
                    }
                },
                error: function(err) {
                    console.log('Something went wrong: ' + err);
                }
            });

            $.ajax({
                url: self.rootUrl + '/' + 'Norder2/Allsky.tsv',
                method: 'GET',
                success: function(tsv) {
                    self.order2Sources = getSources(self, tsv, self.fields);

                    if (self.order1Sources) {
                        self.isReady = true;
                        self._finishInitWhenReady();
                    }
                },
                error: function(err) {
                    console.log('Something went wrong: ' + err);
                }
            });

        },

        _loadAllskyOldMethod: function() {
            this.maxOrderAllsky = 3;
            this._loadLevel2Sources();
            this._loadLevel3Sources();
        },

        _loadLevel2Sources: function() {
            var self = this;
            $.ajax({
                url: self.rootUrl + '/' + 'Norder2/Allsky.xml',
                method: 'GET',
                success: function(xml) {
                    self.fields = getFields(self, xml);
                    self.order2Sources = getSources(self, $(xml).find('CSV').text(), self.fields);
                    if (self.order3Sources) {
                        self.isReady = true;
                        self._finishInitWhenReady();
                    }
                },
                error: function(err) {
                    console.log('Something went wrong: ' + err);
                }
            });
        },

        _loadLevel3Sources: function() {
            var self = this;
            $.ajax({
                url: self.rootUrl + '/' + 'Norder3/Allsky.xml',
                method: 'GET',
                success: function(xml) {
                    self.order3Sources = getSources(self, $(xml).find('CSV').text(), self.fields);
                    if (self.order2Sources) {
                        self.isReady = true;
                        self._finishInitWhenReady();
                    }
                },
                error: function(err) {
                    console.log('Something went wrong: ' + err);
                }
            });
        },

        _finishInitWhenReady: function() {
            this.view.requestRedraw();
            this.loadNeededTiles();
        },

        draw: function(ctx, projection, frame, width, height, largestDim, zoomFactor) {
            if (! this.isShowing || ! this.isReady) {
                return;
            }
            this.drawSources(this.order1Sources, ctx, projection, frame, width, height, largestDim, zoomFactor);
            this.drawSources(this.order2Sources, ctx, projection, frame, width, height, largestDim, zoomFactor);
            this.drawSources(this.order3Sources, ctx, projection, frame, width, height, largestDim, zoomFactor);
            
            if (!this.tilesInView) {
                return;
            }
            var sources, key, t;
            for (var k=0; k<this.tilesInView.length; k++) {
                t = this.tilesInView[k];
                key = t[0] + '-' + t[1];
                sources = this.sourcesCache.get(key);
                if (sources) {
                    this.drawSources(sources, ctx, projection, frame, width, height, largestDim, zoomFactor);
                }
            }
            
            
            
        },
        drawSources: function(sources, ctx, projection, frame, width, height, largestDim, zoomFactor) {
            if (! sources) {
                return;
            }
            var s;
            for (var k=0, len = sources.length; k<len; k++) {
                s = sources[k];
                if (!this.filterFn || this.filterFn(s)) {
                    cds.Catalog.drawSource(this, sources[k], ctx, projection, frame, width, height, largestDim, zoomFactor);
                }
            }
            for (var k=0, len = sources.length; k<len; k++) {
                if (! sources[k].isSelected) {
                    continue;
                }
                if (!this.filterFn || this.filterFn(s)) {
                    cds.Catalog.drawSourceSelection(this, sources[k], ctx);
                }
            }
        },

        getSources: function() {
            var ret = [];
            if (this.order1Sources) {
                ret = ret.concat(this.order1Sources);
            }
            if (this.order2Sources) {
                ret = ret.concat(this.order2Sources);
            }
            if (this.order3Sources) {
                ret = ret.concat(this.order3Sources);
            }
            if (this.tilesInView) {
                var sources, key, t;
                for (var k=0; k<this.tilesInView.length; k++) {
                    t = this.tilesInView[k];
                    key = t[0] + '-' + t[1];
                    sources = this.sourcesCache.get(key);
                    if (sources) {
                        ret = ret.concat(sources);
                    }
                }
            }
            
            return ret;
        },


        
        deselectAll: function() {
            if (this.order1Sources) {
                for (var k=0; k<this.order1Sources.length; k++) {
                    this.order1Sources[k].deselect();
                }
            }

            if (this.order2Sources) {
                for (var k=0; k<this.order2Sources.length; k++) {
                    this.order2Sources[k].deselect();
                }
            }

            if (this.order3Sources) {
                for (var k=0; k<this.order3Sources.length; k++) {
                    this.order3Sources[k].deselect();
                }
            }
            var keys = this.sourcesCache.keys();
            for (key in keys) {
                if ( ! this.sourcesCache[key]) {
                    continue;
                }
                var sources = this.sourcesCache[key];
                for (var k=0; k<sources.length; k++) {
                    sources[k].deselect();
                }
            }
        },

        show: function() {
            if (this.isShowing) {
                return;
            }
            this.isShowing = true;
            this.loadNeededTiles();
            this.reportChange();
        },
        hide: function() {
            if (! this.isShowing) {
                return;
            }
            this.isShowing = false;
            this.reportChange();
        },
        reportChange: function() {
            this.view.requestRedraw();
        },
        
        getTileURL: function(norder, npix) {
            var dirIdx = Math.floor(npix/10000)*10000;
            return this.rootUrl + "/" + "Norder" + norder + "/Dir" + dirIdx + "/Npix" + npix + ".tsv";
        },
    
        loadNeededTiles: function() {
            if ( ! this.isShowing) {
                return;
            }
            this.tilesInView = [];
            
            var norder = this.view.realNorder;
            if (norder>this.maxOrder) {
                norder = this.maxOrder;
            }
            if (norder<=this.maxOrderAllsky) {
                return; // nothing to do, hurrayh !
            }
            var cells = this.view.getVisibleCells(norder, this.frame);
            var ipixList, ipix;
            for (var curOrder=3; curOrder<=norder; curOrder++) {
                ipixList = [];
                for (var k=0; k<cells.length; k++) {
                    ipix = Math.floor(cells[k].ipix / Math.pow(4, norder - curOrder));
                    if (ipixList.indexOf(ipix)<0) {
                        ipixList.push(ipix);
                    }
                }
                
                // load needed tiles
                for (var i=0; i<ipixList.length; i++) {
                    this.tilesInView.push([curOrder, ipixList[i]]);
                }
            }
            
            var t, key;
            var self = this;
            for (var k=0; k<this.tilesInView.length; k++) {
                t = this.tilesInView[k];
                key = t[0] + '-' + t[1]; // t[0] is norder, t[1] is ipix
                if (!this.sourcesCache.get(key)) {
                    (function(self, norder, ipix) { // wrapping function is needed to be able to retrieve norder and ipix in ajax success function
                        var key = norder + '-' + ipix;
                        $.ajax({
                            /*
                            url: Aladin.JSONP_PROXY,
                            data: {"url": self.getTileURL(norder, ipix)},
                            */
                            // ATTENTIOn : je passe en JSON direct, car je n'arrive pas a choper les 404 en JSONP
                            url: self.getTileURL(norder, ipix),
                            method: 'GET',
                            //dataType: 'jsonp',
                            success: function(tsv) {
                                self.sourcesCache.set(key, getSources(self, tsv, self.fields));
                                self.view.requestRedraw();
                            },
                            error: function() {
                                // on suppose qu'il s'agit d'une erreur 404
                                self.sourcesCache.set(key, []);
                            }
                        });
                    })(this, t[0], t[1]);
                }
            }
        },

        reportChange: function() { // TODO: to be shared with Catalog
            this.view && this.view.requestRedraw();
        }
    

    }; // END OF .prototype functions
    
    
    return ProgressiveCat;
})();
    
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Tile
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Tile = (function() {
    // constructor
	function Tile(img, url) {
		this.img = img;
		this.url = url;
	};
	
	// check whether the image corresponding to the tile is loaded and ready to be displayed
	//
	// source : http://www.sajithmr.me/javascript-check-an-image-is-loaded-or-not
	Tile.isImageOk = function(img) {
		if (img.allSkyTexture) {
			return true;
		}
		
        if (!img.src) {
            return false;
        }

	    // During the onload event, IE correctly identifies any images that
	    // werenâ€™t downloaded as not complete. Others should too. Gecko-based
	    // browsers act like NS4 in that they report this incorrectly.
	    if (!img.complete) {
	        return false;
	    }

	    // However, they do have two very useful properties: naturalWidth and
	    // naturalHeight. These give the true size of the image. If it failed
	    // to load, either of these should be zero.

	    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
	        return false;
	    }

	    // No other way of checking: assume itâ€™s ok.
	    return true;
	};
	

	return Tile;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File TileBuffer
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

TileBuffer = (function() {
	var NB_MAX_TILES = 800; // buffer size
	
	// constructor
	function TileBuffer() {
		this.pointer = 0;
		this.tilesMap = {};
		this.tilesArray = new Array(NB_MAX_TILES);

		for (var i=0; i<NB_MAX_TILES; i++) {
			this.tilesArray[i] = new Tile(new Image(), null);
		}
	};
	
	TileBuffer.prototype.addTile = function(url) {
	    // return null if already in buffer
        if (this.getTile(url)) {
            return null;
        }

        // delete existing tile
        var curTile = this.tilesArray[this.pointer];
        if (curTile.url != null) {
            curTile.img.src = null;
            delete this.tilesMap[curTile.url];
        }

        this.tilesArray[this.pointer].url = url;
        this.tilesMap[url] = this.tilesArray[this.pointer];

        this.pointer++;
        if (this.pointer>=NB_MAX_TILES) {
            this.pointer = 0;
        }

        return this.tilesMap[url];
	};
	
	TileBuffer.prototype.getTile = function(url) {
        return this.tilesMap[url];
	};

	return TileBuffer;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File ColorMap.js
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

ColorMap = (function() {
    
    
    // constructor
    ColorMap = function(view) {
        this.view = view;
        this.reversed = false;
        this.mapName = 'native';
        this.sig = this.signature();
    };
    
ColorMap.MAPS = {};
    
    ColorMap.MAPS['eosb'] = {
            name: 'Eos B',
            r: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,9,18,27,36,45,49,57,72,81,91,100,109,118,127,
                136,131,139,163,173,182,191,200,209,218,227,213,221,255,255,255,255,255,
                255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,255,255,
                255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,
                255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
                229,255,255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,
                255,229,229,255,255,255,255,255,255,255,255,229,229,255,253,251,249,247,
                245,243,241,215,214,235,234,232,230,228,226,224,222,198,196,216,215,213,
                211,209,207,205,203,181,179,197,196,194,192,190,188,186,184,164,162,178,
                176,175,173,171,169,167,165,147,145,159,157,156,154,152,150,148,146,130,
                128,140,138,137,135,133,131,129,127,113,111,121,119,117,117],
            g: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,15,23,31,39,47,55,57,64,79,87,95,
                103,111,119,127,135,129,136,159,167,175,183,191,199,207,215,200,207,239,
                247,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
                229,255,255,255,255,255,255,255,255,229,229,255,250,246,242,238,233,229,
                225,198,195,212,208,204,199,195,191,187,182,160,156,169,165,161,157,153,
                148,144,140,122,118,127,125,123,121,119,116,114,112,99,97,106,104,102,
                99,97,95,93,91,80,78,84,82,80,78,76,74,72,70,61,59,63,61,59,57,55,53,50,
                48,42,40,42,40,38,36,33,31,29,27,22,21,21,19,16,14,12,13,8,6,3,1,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            b: [116,121,127,131,136,140,144,148,153,
                157,145,149,170,174,178,182,187,191,195,199,183,187,212,216,221,225,229,
                233,238,242,221,225,255,247,239,231,223,215,207,199,172,164,175,167,159,
                151,143,135,127,119,100,93,95,87,79,71,63,55,47,39,28,21,15,7,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0]
    };
    ColorMap.MAPS['rainbow'] = {
            name: 'Rainbow',
            r: [0,4,9,13,18,22,27,31,36,40,45,50,54,
                58,61,64,68,69,72,74,77,79,80,82,83,85,84,86,87,88,86,87,87,87,85,84,84,
                84,83,79,78,77,76,71,70,68,66,60,58,55,53,46,43,40,36,33,25,21,16,12,4,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,8,12,21,25,29,33,42,
                46,51,55,63,67,72,76,80,89,93,97,101,110,114,119,123,131,135,140,144,153,
                157,161,165,169,178,182,187,191,199,203,208,212,221,225,229,233,242,246,
                250,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255],
            g: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,4,8,16,21,25,29,38,42,46,51,55,63,67,72,76,84,89,93,97,
                106,110,114,119,127,131,135,140,144,152,157,161,165,174,178,182,187,195,
                199,203,208,216,220,225,229,233,242,246,250,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,250,242,238,233,229,221,216,212,208,199,195,191,187,178,174,170,165,
                161,153,148,144,140,131,127,123,119,110,106,102,97,89,85,80,76,72,63,59,
                55,51,42,38,34,29,21,17,12,8,0],
            b: [0,3,7,10,14,19,23,28,32,38,43,48,53,
                59,63,68,72,77,81,86,91,95,100,104,109,113,118,122,127,132,136,141,145,
                150,154,159,163,168,173,177,182,186,191,195,200,204,209,214,218,223,227,
                232,236,241,245,250,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,246,242,238,233,225,220,216,212,203,199,195,191,
                187,178,174,170,165,157,152,148,144,135,131,127,123,114,110,106,102,97,
                89,84,80,76,67,63,59,55,46,42,38,34,25,21,16,12,8,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    };
    ColorMap.MAPS['cubehelix'] = {
            name: 'Cubehelix',
            r: [0,1,3,4,6,8,9,10,12,13,14,15,17,18,
                19,20,20,21,22,23,23,24,24,25,25,25,26,26,26,26,26,26,26,26,26,26,26,25,
                25,25,25,24,24,24,23,23,23,23,22,22,22,21,21,21,21,21,21,20,20,20,21,21,
                21,21,21,22,22,22,23,23,24,25,26,27,27,28,30,31,32,33,35,36,38,39,41,43,
                45,47,49,51,53,55,57,60,62,65,67,70,72,75,78,81,83,86,89,92,95,98,101,104,
                107,110,113,116,120,123,126,129,132,135,138,141,144,147,150,153,155,158,
                161,164,166,169,171,174,176,178,181,183,185,187,189,191,193,194,196,198,
                199,201,202,203,204,205,206,207,208,209,209,210,211,211,211,212,212,212,
                212,212,212,212,212,211,211,211,210,210,210,209,208,208,207,207,206,205,
                205,204,203,203,202,201,201,200,199,199,198,197,197,196,196,195,195,194,
                194,194,193,193,193,193,193,193,193,193,193,193,194,194,195,195,196,196,
                197,198,199,200,200,202,203,204,205,206,208,209,210,212,213,215,217,218,
                220,222,223,225,227,229,231,232,234,236,238,240,242,244,245,247,249,251,
                253,255],
            g: [0,0,1,1,2,2,3,4,4,5,6,6,7,8,9,10,
                11,11,12,13,14,15,17,18,19,20,21,22,24,25,26,28,29,31,32,34,35,37,38,40,
                41,43,45,46,48,50,52,53,55,57,58,60,62,64,66,67,69,71,73,74,76,78,79,81,
                83,84,86,88,89,91,92,94,95,97,98,99,101,102,103,104,106,107,108,109,110,
                111,112,113,114,114,115,116,116,117,118,118,119,119,120,120,120,121,121,
                121,121,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,121,
                121,121,121,121,121,121,121,121,120,120,120,120,120,120,120,120,120,120,
                121,121,121,121,121,122,122,122,123,123,124,124,125,125,126,127,127,128,
                129,130,131,131,132,133,135,136,137,138,139,140,142,143,144,146,147,149,
                150,152,154,155,157,158,160,162,164,165,167,169,171,172,174,176,178,180,
                182,183,185,187,189,191,193,194,196,198,200,202,203,205,207,208,210,212,
                213,215,216,218,219,221,222,224,225,226,228,229,230,231,232,233,235,236,
                237,238,239,240,240,241,242,243,244,244,245,246,247,247,248,248,249,250,
                250,251,251,252,252,253,253,254,255],
            b: [0,1,3,4,6,8,9,11,13,15,17,19,21,23,
                25,27,29,31,33,35,37,39,41,43,45,47,48,50,52,54,56,57,59,60,62,63,65,66,
                67,69,70,71,72,73,74,74,75,76,76,77,77,77,78,78,78,78,78,78,78,77,77,77,
                76,76,75,75,74,73,73,72,71,70,69,68,67,66,66,65,64,63,61,60,59,58,58,57,
                56,55,54,53,52,51,51,50,49,49,48,48,47,47,47,46,46,46,46,46,47,47,47,48,
                48,49,50,50,51,52,53,55,56,57,59,60,62,64,65,67,69,71,74,76,78,81,83,86,
                88,91,94,96,99,102,105,108,111,114,117,120,124,127,130,133,136,140,143,
                146,149,153,156,159,162,165,169,172,175,178,181,184,186,189,192,195,197,
                200,203,205,207,210,212,214,216,218,220,222,224,226,227,229,230,231,233,
                234,235,236,237,238,239,239,240,241,241,242,242,242,243,243,243,243,243,
                243,243,243,243,243,242,242,242,242,241,241,241,241,240,240,240,239,239,
                239,239,239,238,238,238,238,238,238,238,238,239,239,239,240,240,240,241,
                242,242,243,244,245,246,247,248,249,250,252,253,255]
    };


    
    ColorMap.MAPS_CUSTOM = ['cubehelix', 'eosb', 'rainbow'];
    ColorMap.MAPS_NAMES = ['native', 'grayscale'].concat(ColorMap.MAPS_CUSTOM);
    
    ColorMap.prototype.reverse = function(val) {
        if (val) {
            this.reversed = val;
        }
        else {
            this.reversed = ! this.reversed;
        }
        this.sig = this.signature();
        this.view.requestRedraw();
    };
    
    
    ColorMap.prototype.signature = function() {
        var s = this.mapName;
        
        if (this.reversed) {
            s += ' reversed';
        }
        
        return s;
    };
    
    ColorMap.prototype.update = function(mapName) {
        this.mapName = mapName;
        this.sig = this.signature();
        this.view.requestRedraw();
    };
    
    ColorMap.prototype.apply = function(img) {
        if ( this.sig=='native' ) {
            return img;
        }
        
        if (img.cmSig==this.sig) {
            return img.cmImg; // return cached pixels
        }
        
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixelData = imageData.data;
        var length = pixelData.length;
        var a, b, c;
        var switchCase = 3;
        if (this.mapName=='grayscale') {
            switchCase = 1;
        }
        else if (ColorMap.MAPS_CUSTOM.indexOf(this.mapName)>=0) {
            switchCase = 2;
        }
        for (var i = 0; i < length; i+= 4) {
            switch(switchCase) {
                case 1:
                    a = b = c = AladinUtils.myRound((pixelData[i]+pixelData[i+1]+pixelData[i+2])/3);
                    break;
                case 2:
                    if (this.reversed) {
                        a = ColorMap.MAPS[this.mapName].r[255-pixelData[i]];
                        b = ColorMap.MAPS[this.mapName].g[255-pixelData[i+1]];
                        c = ColorMap.MAPS[this.mapName].b[255-pixelData[i+2]];
                    }
                    else {
                        a = ColorMap.MAPS[this.mapName].r[pixelData[i]];
                        b = ColorMap.MAPS[this.mapName].g[pixelData[i+1]];
                        c = ColorMap.MAPS[this.mapName].b[pixelData[i+2]];
                    }
                    break;
                default:
                    a = pixelData[i];
                    b = pixelData[i + 1];
                    c = pixelData[i + 2];
                    
            }
            if (switchCase!=2 && this.reversed) {
                a = 255-a;
                b = 255-b;
                c = 255-c;
              
            }
            pixelData[i]     = a;
            pixelData[i + 1] = b;
            pixelData[i + 2] = c;
            
        }
        imageData.data = pixelData;
        ctx.putImageData(imageData, 0, 0);
        
        // cache image with color map applied
        img.cmSig = this.sig;
        img.cmImg = canvas;

        return img.cmImg;
    };
    
    return ColorMap;
})();
    
// Copyright 2016 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File HpxKey
 * This class represents a HEALPix cell
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

HpxKey = (function() {

    "use strict";

    /** Constructor
     *  
     */
    var HpxKey = function(norder, npix, hips, width, height, dx, dy, allskyTexture, allskyTextureSize) {
        this.norder = norder;
        this.npix = npix;

        this.nside = Math.pow(2, norder);

        this.hips = hips; // survey to which this HpxKey is attached
        this.frame = hips.cooFrame; // coordinate frame of the survey to which this HpxKey is attached

        this.width = width; // width of the tile
        this.height = height; // height of the tile

        this.dx = dx || 0; // shift in x (for all-sky tiles)
        this.dy = dy || 0; // shift in y (for all-sky tiles)

        this.allskyTexture = allskyTexture || undefined;
        this.allskyTextureSize = allskyTextureSize;

        this.parente = 0; // if this key comes from an ancestor, length of the filiation

        this.children = null; 
        this.ancestor = null; // ancestor having the pixels
    }

    // "static" methods
    HpxKey.createHpxKeyfromAncestor = function(father, childNb) {
        var hpxKey = new HpxKey(father.norder+1, father.npix*4 + childNb, father.hips, father.width/2, father.height/2,
                                childNb==2 || childNb==3 ? father.dx+father.width/2 : father.dx, childNb==1 || childNb==3 ? father.dy+father.height/2 : father.dy, father.allskyTexture, father.allskyTextureSize);
        hpxKey.parente = father.parente + 1;
        hpxKey.ancestor = father.ancestor || father;


        return hpxKey;
    };

    var MAX_PARENTE = 4;

    HpxKey.prototype = {

        draw: function(ctx, view) {
//console.log('Drawing ', this.norder, this.npix);
            var n = 0; // number of traced triangles
            var corners = this.getProjViewCorners(view);

            if (corners==null) {
                return 0;
            }
     

            var now = new Date().getTime();
            var updateNeededTiles = this.ancestor==null && this.norder>=3 && (now-this.hips.lastUpdateDateNeededTiles) > 0.1;

            try {
                if (isTooLarge(corners)) {
//console.log('too large');
                    var m = this.drawChildren(ctx, view, MAX_PARENTE);

                    // Si aucun sous-losange n'a pu Ãªtre dessinÃ©, je trace tout de mÃªme le pÃ¨re
                    if( m>0 ) {
                        return m;
                    }
                }
            }
            catch(e) {
                return 0;
            }


            // actual drawing
            var norder = this.ancestor==null ? this.norder : this.ancestor.norder;
            var npix = this.ancestor==null ? this.npix : this.ancestor.npix;

            //console.log(corners);
            //corners = AladinUtils.grow2(corners, 1); // grow by 1 pixel in each direction
            //console.log(corners);
            var url = this.hips.getTileURL(norder, npix);
            var tile = this.hips.tileBuffer.getTile(url);
            if (tile && Tile.isImageOk(tile.img) || this.allskyTexture) {
                if (!this.allskyTexture && !this.hips.tileSize) {
                    this.hips.tileSize = tile.img.width;
                }
                var img = this.allskyTexture || tile.img;
                var w = this.allskyTextureSize || img.width;
                if (this.parente) {
                    w = w / Math.pow(2, this.parente);
                } 

                this.hips.drawOneTile2(ctx, img, corners, w, null, this.dx, this.dy, true, norder);
                n += 2;
            }
            else if (updateNeededTiles && ! tile) {
                tile = this.hips.tileBuffer.addTile(url);
                view.downloader.requestDownload(tile.img, tile.url, this.hips.useCors);
                this.hips.lastUpdateDateNeededTiles = now;
                view.requestRedrawAtDate(now+HpxImageSurvey.UPDATE_NEEDED_TILES_DELAY+10);
            }


            return n;
        },

        drawChildren: function(ctx, view, maxParente) {
            var n=0;
            var limitOrder = 13; // corresponds to NSIDE=8192, current HealpixJS limit
            if ( this.width>1 && this.norder<limitOrder && this.parente<maxParente ) {
                var children = this.getChildren();
                if ( children!=null ) {
                    for ( var i=0; i<4; i++ ) {
//console.log(i);
                        if ( children[i]!=null ) {
                            n += children[i].draw(ctx , view, maxParente);
                        }
                    }
                }
            }

            return n;
        },


        // returns the 4 HpxKey children
        getChildren: function() {
            if (this.children!=null) {
                return this.children;
            }

            var children = [];
            for ( var childNb=0; childNb<4; childNb++ ) {
                var child = HpxKey.createHpxKeyfromAncestor(this, childNb);
                children[childNb] = child;
            }
            this.children = children;


            return this.children;
        },



        getProjViewCorners: function(view) {
            var cornersXY = [];
            var cornersXYView = [];
            var spVec = new SpatialVector();

            corners = HealpixCache.corners_nest(this.npix, this.nside);

            var lon, lat;
            for (var k=0; k<4; k++) {
                spVec.setXYZ(corners[k].x, corners[k].y, corners[k].z);

                // need for frame transformation ?
                if (this.frame.system != view.cooFrame.system) {
                    if (this.frame.system == CooFrameEnum.SYSTEMS.J2000) {
                        var radec = CooConversion.J2000ToGalactic([spVec.ra(), spVec.dec()]);
                        lon = radec[0];
                        lat = radec[1];
                    }
                    else if (this.frame.system == CooFrameEnum.SYSTEMS.GAL) {
                        var radec = CooConversion.GalacticToJ2000([spVec.ra(), spVec.dec()]);
                        lon = radec[0];
                        lat = radec[1];
                    }
                }
                else {
                    lon = spVec.ra();
                    lat = spVec.dec();
                }
                cornersXY[k] = view.projection.project(lon, lat);
            }


            if (cornersXY[0] == null ||  cornersXY[1] == null  ||  cornersXY[2] == null ||  cornersXY[3] == null ) {
                return null;
            }



            for (var k=0; k<4; k++) {
                cornersXYView[k] = AladinUtils.xyToView(cornersXY[k].X, cornersXY[k].Y, view.width, view.height, view.largestDim, view.zoomFactor);
            }

            return cornersXYView;
        }

    } // end of HpxKey.prototype




    /** Returns the squared distance for points in array c at indexes g and d
     */
    var dist = function(c, g, d) {
        var dx=c[g].vx-c[d].vx;
        var dy=c[g].vy-c[d].vy;
        return  dx*dx + dy*dy;
    }


    var M = 280*280;
    var N = 150*150;
    var RAP=0.7;

    /** Returns true if the HEALPix rhomb described by its 4 corners (array c)
     * is too large to be drawn in one pass ==> need to be subdivided */
    var isTooLarge = function(c) {

        var d1,d2;
        if ( (d1=dist(c,0,2))>M || (d2=dist(c,2,1))>M ) {
            return true;
        }
        if ( d1==0 || d2==0 ) {
            throw "Rhomb error";
        }
        var diag1 = dist(c,0,3);
        var diag2 = dist(c,1,2);
        if ( diag2==0 || diag2==0 ) {
            throw "Rhomb error";
        }
        var rap = diag2>diag1 ? diag1/diag2 : diag2/diag1;

        return rap<RAP && (diag1>N || diag2>N);
    }


    return HpxKey;

})();


// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File HpxImageSurvey
 * 
 * Author: Thomas Boch [CDS]
 * 
 *****************************************************************************/

HpxImageSurvey = (function() {


    /** Constructor
     * cooFrame and maxOrder can be set to null
     * They will be determined by reading the properties file
     *  
     */
    var HpxImageSurvey = function(idOrHiPSDefinition, name, rootUrl, cooFrame, maxOrder, options) {
        // new way
        if (idOrHiPSDefinition instanceof HiPSDefinition) {
            this.hipsDefinition = idOrHiPSDefinition;

        }

        else {
// REPRENDRE LA,  EN CREANT l'OBJET HiPSDefinition ou FAIRE dans l'autre sens
            // old way, we retrofit parameters into a HiPSDefinition object
            var hipsDefProps = {};

            this.id = idOrHiPSDefinition;
            hipsDefProps['ID'] = this.id;

    	    this.name = name;
            hipsDefProps['obs_title'] = this.name;

            // remove final slash
    	    if (rootUrl.slice(-1) === '/') {
    	        this.rootUrl = rootUrl.substr(0, rootUrl.length-1);
    	    }
    	    else {
    	        this.rootUrl = rootUrl;
    	    }
            this.additionalParams = (options && options.additionalParams) || null; // parameters for cut, stretch, etc

            // make URL absolute
            this.rootUrl = Utils.getAbsoluteURL(this.rootUrl);

            // fast fix for HTTPS support --> will work for all HiPS served by CDS
            if (Utils.isHttpsContext() && ( /u-strasbg.fr/i.test(this.rootUrl) || /unistra.fr/i.test(this.rootUrl)  ) ) {
                this.rootUrl = this.rootUrl.replace('http://', 'https://');
            }

            // temporary fix when alasky is under maintenance
            //this.rootUrl = this.rootUrl.replace('alasky.', 'alaskybis.');
    	
    	    options = options || {};
    	    // TODO : support PNG
    	    this.imgFormat = options.imgFormat || 'jpg';

            // permet de forcer l'affichage d'un certain niveau
            this.minOrder = options.minOrder || null;


            // TODO : lire depuis fichier properties
            this.cooFrame = CooFrameEnum.fromString(cooFrame, CooFrameEnum.J2000);

            this.longitudeReversed = options.longitudeReversed || false;
        
            // force coo frame for Glimpse 360
            if (this.rootUrl.indexOf('/glimpse360/aladin/data')>=0) {
                this.cooFrame = CooFrameEnum.J2000;
            }
            // TODO : lire depuis fichier properties
            this.maxOrder = maxOrder;

            this.hipsDefinition = HiPSDefinition.fromProperties(hipsDefProps);
        }

        this.ascendingLongitude = false;
    	
        this.tileSize = undefined;
    	this.allskyTexture = null;
    	this.alpha = 0.0; // opacity value between 0 and 1 (if this layer is an opacity layer)
    	this.allskyTextureSize = 0;
        this.lastUpdateDateNeededTiles = 0;

        var found = false;
        for (var k=0; k<HpxImageSurvey.SURVEYS.length; k++) {
            if (HpxImageSurvey.SURVEYS[k].id==this.id) {
                found = true;
            }
        }
        if (! found) {
            HpxImageSurvey.SURVEYS.push({
                 "id": this.id,
                 "url": this.rootUrl,
                 "name": this.name,
                 "maxOrder": this.maxOrder,
                 "frame": this.cooFrame
            });
        }
        HpxImageSurvey.SURVEYS_OBJECTS[this.id] = this;
    };



    HpxImageSurvey.UPDATE_NEEDED_TILES_DELAY = 1000; // in milliseconds
    
    HpxImageSurvey.prototype.init = function(view, callback) {
    	this.view = view;
    	
        if (!this.cm) {
            this.cm = new ColorMap(this.view);
        }
    	
    	// tileBuffer is now shared across different image surveys
    	//this.tileBuffer = new TileBuffer();
    	this.tileBuffer = this.view.tileBuffer;
    	
    	this.useCors = false;
    	var self = this;
        if ($.support.cors) {
            // testing if server supports CORS ( http://www.html5rocks.com/en/tutorials/cors/ )
            $.ajax({
                type: 'GET',
                url: this.rootUrl + '/properties'  + (this.additionalParams ? ('?' + this.additionalParams) : ''),
                dataType: 'text',
                xhrFields: {
                },
                headers: {
                },
                success: function() {
                    // CORS is supported
                    self.useCors = true;
                    
                    self.retrieveAllskyTextures();
                    if (callback) {
                        callback();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // CORS is not supported
                    self.retrieveAllskyTextures();
                    if (callback) {
                        callback();
                    }
                }
              });
        }
        else {
            this.retrieveAllskyTextures();
            callback();
        }
    	
    };
    
    HpxImageSurvey.DEFAULT_SURVEY_ID = "P/DSS2/color";
    
    HpxImageSurvey.SURVEYS_OBJECTS = {};
    HpxImageSurvey.SURVEYS = [
     {
        "id": "P/2MASS/color",
        "url": "http://alasky.u-strasbg.fr/2MASS/Color",
        "name": "2MASS colored",
        "maxOrder": 9,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/DSS2/color",
        "url": "http://alasky.u-strasbg.fr/DSS/DSSColor",
        "name": "DSS colored",
        "maxOrder": 9,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/DSS2/red",
        "url": "http://alasky.u-strasbg.fr/DSS/DSS2Merged",
        "name": "DSS2 Red (F+R)",
        "maxOrder": 9,
        "frame": "equatorial",
        "format": "jpeg fits"
     },
     {
        "id": "P/PanSTARRS/DR1/g",
        "url": "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/g",
        "name": "PanSTARRS DR1 g",
        "maxOrder": 11,
        "frame": "equatorial",
        "format": "jpeg fits"
     },
     {
        "id": "P/PanSTARRS/DR1/color-z-zg-g",
        "url": "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/color-z-zg-g",
        "name": "PanSTARRS DR1 color",
        "maxOrder": 11,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/DECaPS/DR1/color",
        "url": "http://alasky.u-strasbg.fr/DECaPS/DR1/color",
        "name": "DECaPS DR1 color",
        "maxOrder": 11,
        "frame": "equatorial",
        "format": "jpeg png"
     },
     {
        "id": "P/Fermi/color",
        "url": "http://alasky.u-strasbg.fr/Fermi/Color",
        "name": "Fermi color",
        "maxOrder": 3,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/Finkbeiner",
        "url": "http://alasky.u-strasbg.fr/FinkbeinerHalpha",
        "maxOrder": 3,
        "frame": "galactic",
        "format": "jpeg fits",
        "name": "Halpha"
     },
     {
        "id": "P/GALEXGR6/AIS/color",
        "url": "http://alasky.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
        "name": "GALEX Allsky Imaging Survey colored",
        "maxOrder": 8,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/IRIS/color",
        "url": "http://alasky.u-strasbg.fr/IRISColor",
        "name": "IRIS colored",
        "maxOrder": 3,
        "frame": "galactic",
        "format": "jpeg"
     },
     {
        "id": "P/Mellinger/color",
        "url": "http://alasky.u-strasbg.fr/MellingerRGB",
        "name": "Mellinger colored",
        "maxOrder": 4,
        "frame": "galactic",
        "format": "jpeg"
     },
     {
        "id": "P/SDSS9/color",
        "url": "http://alasky.u-strasbg.fr/SDSS/DR9/color",
        "name": "SDSS9 colored",
        "maxOrder": 10,
        "frame": "equatorial",
        "format": "jpeg"
     },
     {
        "id": "P/SPITZER/color",
        "url": "http://alasky.u-strasbg.fr/SpitzerI1I2I4color",
        "name": "IRAC color I1,I2,I4 - (GLIMPSE, SAGE, SAGE-SMC, SINGS)",
        "maxOrder": 9,
        "frame": "galactic",
        "format": "jpeg"
     },
     {
        "id": "P/VTSS/Ha",
        "url": "http://alasky.u-strasbg.fr/VTSS/Ha",
        "maxOrder": 3,
        "frame": "galactic",
        "format": "png jpeg fits",
        "name": "VTSS-Ha"
     },
     {
        "id": "P/XMM/EPIC",
        "url": "http://saada.u-strasbg.fr/xmmallsky",
        "name": "XMM-Newton stacked EPIC images (no phot. normalization)",
        "maxOrder": 7,
        "frame": "equatorial",
        "format": "png fits"
     },
     {
         "id": "P/XMM/PN/color",
          "url": "http://saada.unistra.fr/PNColor",
          "name": "XMM PN colored",
          "maxOrder": 7,
          "frame": "equatorial",
          "format": "png jpeg"
     },
     {
         "id": "P/allWISE/color",
         "url": "http://alasky.u-strasbg.fr/AllWISE/RGB-W4-W2-W1/",
         "name": "AllWISE color",
         "maxOrder": 8,
         "frame": "equatorial",
         "format": "jpeg"
     },
     {
         "id": "P/GLIMPSE360",
         "url": "http://www.spitzer.caltech.edu/glimpse360/aladin/data",
         "name": "GLIMPSE360",
         "maxOrder": 9,
         "frame": "equatorial",
         "format": "jpeg"
     }
  ];


    
    HpxImageSurvey.getAvailableSurveys = function() {
    	return HpxImageSurvey.SURVEYS;
    };
    
    HpxImageSurvey.getSurveyInfoFromId = function(id) {
        var surveys = HpxImageSurvey.getAvailableSurveys();
        for (var i=0; i<surveys.length; i++) {
            if (surveys[i].id==id) {
                return surveys[i];
            }
        }
        return null;
    };

    HpxImageSurvey.getSurveyFromId = function(id) {
        if (HpxImageSurvey.SURVEYS_OBJECTS[id]) {
            return HpxImageSurvey.SURVEYS_OBJECTS[id];
        }
        var surveyInfo = HpxImageSurvey.getSurveyInfoFromId(id);
        if (surveyInfo) {
            var options = {};
            if ( surveyInfo.format && surveyInfo.format.indexOf('jpeg')<0 && surveyInfo.format.indexOf('png')>=0 ) {
                options.imgFormat = 'png';
            }
            return new HpxImageSurvey(surveyInfo.id, surveyInfo.name, surveyInfo.url, surveyInfo.frame, surveyInfo.maxOrder, options);
        }

        return null;
    }
   
    
    HpxImageSurvey.prototype.getTileURL = function(norder, npix) {
    	var dirIdx = Math.floor(npix/10000)*10000;
    	return this.rootUrl + "/" + "Norder" + norder + "/Dir" + dirIdx + "/Npix" + npix + "." + this.imgFormat  + (this.additionalParams ? ('?' + this.additionalParams) : '');;
    };
    
    HpxImageSurvey.prototype.retrieveAllskyTextures = function() {
    	// start loading of allsky
    	var img = new Image();
    	if (this.useCors) {
            img.crossOrigin = 'anonymous';
        }
    	var self = this;
    	img.onload = function() {
    		// sur ipad, le fichier qu'on rÃ©cupÃ¨re est 2 fois plus petit. Il faut donc dÃ©terminer la taille de la texture dynamiquement
    	    self.allskyTextureSize = img.width/27;
            self.allskyTexture = img;
   
            /* 
    		// rÃ©cupÃ©ration des 768 textures (NSIDE=4)
    		for (var j=0; j<29; j++) {
    			for (var i=0; i<27; i++) {
    				var c = document.createElement('canvas');
    				c.width = c.height = self.allskyTextureSize;
    				c.allSkyTexture = true;
    				var context = c.getContext('2d');
    				context.drawImage(img, i*self.allskyTextureSize, j*self.allskyTextureSize, self.allskyTextureSize, self.allskyTextureSize, 0, 0, c.width, c.height);
    				self.allskyTextures.push(c);
    			}
    		}
            */
    		self.view.requestRedraw();
    	};
    	img.src = this.rootUrl + '/Norder3/Allsky.' + this.imgFormat + (this.additionalParams ? ('?' + this.additionalParams) : '');
    
    };

    // Nouvelle mÃ©thode pour traitement des DEFORMATIONS
    /**
     * Draw the image survey according 
     *
     * @param ctx: canvas context where to draw
     * @param view
     * @param subdivide: should
     *
     */
    HpxImageSurvey.prototype.draw = function(ctx, view, subdivide, curOverlayNorder) {
        subdivide = (subdivide===undefined) ? false: subdivide;

        var cornersXYViewMapAllsky = view.getVisibleCells(3, this.cooFrame);
        var cornersXYViewMapHighres = null;



        var norder4Display = Math.min(curOverlayNorder, this.maxOrder);
        if (curOverlayNorder>=3) {
            if (curOverlayNorder==3) {
                cornersXYViewMapHighres = cornersXYViewMapAllsky;
            }
            else {
                cornersXYViewMapHighres = view.getVisibleCells(norder4Display, this.cooFrame);
            }
        }

        // new way of drawing
        if (subdivide) {

            if (curOverlayNorder<=4) {
                this.drawAllsky(ctx, cornersXYViewMapAllsky, norder4Display, view);
            }

            if (curOverlayNorder>=3) {
                this.drawHighres(ctx, cornersXYViewMapHighres, norder4Display, view);
            }
/*
            else {
                this.drawAllsky(ctx, cornersXYViewMapAllsky, norder4Display, view);
            }
*/

            return;
        }

        // regular way of drawing
        // TODO : a t on besoin de dessiner le allsky si norder>=3 ?
        // TODO refactoring : devrait Ãªtre une mÃ©thode de HpxImageSurvey
        if (view.curNorder>=3) {
            this.redrawHighres(ctx, cornersXYViewMapHighres, view.curNorder);
        }
        else {
            this.redrawAllsky(ctx, cornersXYViewMapAllsky, view.fov, view.curNorder);
        }

    };

    HpxImageSurvey.prototype.drawHighres = function(ctx, cornersXYViewMap, norder, view) {
//////////////////////////////
        var parentTilesToDraw = [];
        var parentTilesToDrawIndex = {};
        var parentTilesMissingIndex = {};
        for (var k=0; k<cornersXYViewMap.length; k++) {
            var ipix = cornersXYViewMap[k].ipix
            var tileURL = this.getTileURL(norder, ipix);
            var tile = this.tileBuffer.getTile(tileURL);
            var tileAvailable = tile && Tile.isImageOk(tile.img);
            if (! tileAvailable) { // if tile is not available, search if upper level tiles can be drawn
                var MAX_UPPER_LEVELS = 4; // we search parent tiles up to 4 levels
                for (var parentOrder = norder -1 ; parentOrder>=3 && parentOrder >= norder-MAX_UPPER_LEVELS ; parentOrder--) {
                    var parentIpix = ~~(ipix / Math.pow(4, norder - parentOrder));
                    var key = parentOrder + '-' + parentIpix;
                    if (parentTilesToDrawIndex[key]===true || parentTilesMissingIndex===true) {
                        break;
                    }
                    var parentTileURL = this.getTileURL(parentOrder, parentIpix);
                    var parentTile = this.tileBuffer.getTile(parentTileURL);
                    var parentTileAvailable = parentTile && Tile.isImageOk(parentTile.img);
                    if (parentTileAvailable) {
                        parentTilesToDraw.push({ipix: parentIpix, order: parentOrder});
                        parentTilesToDrawIndex[key] = true;

                        break;
                    }
                    else {
                        parentTilesMissingIndex[key] = true;
                    }
                }
            }
        }
        // sort to draw lower norder first
        parentTilesToDraw = parentTilesToDraw.sort(function(itemA, itemB) {
            return itemA.order - itemB.order;
        });

//////////////////////////////

        var tSize = this.tileSize || 512;
        // draw parent tiles
        for (var k=0; k<parentTilesToDraw.length; k++) {
            var t = parentTilesToDraw[k];
            new HpxKey(t.order, t.ipix, this, tSize, tSize).draw(ctx, view);
        }

        // TODO : we could have a pool of HpxKey to prevent object re-creation at each frame
        // draw tiles
        for (var k=0; k<cornersXYViewMap.length; k++) {
            new HpxKey(norder, cornersXYViewMap[k].ipix, this, tSize, tSize).draw(ctx, view);
        }
    };

    HpxImageSurvey.prototype.drawAllsky = function(ctx, cornersXYViewMap, norder, view) {
        // for norder deeper than 6, we think it brings nothing to draw the all-sky
        if (this.view.curNorder>6) {
            return;
        }

        if ( ! this.allskyTexture || !Tile.isImageOk(this.allskyTexture) ) {
            return;
        }

        var hpxKeys = [];
    	var cornersXYView;
        var ipix;
        var dx, dy;
        for (var k=0; k<cornersXYViewMap.length; k++) {
    		cornersXYView = cornersXYViewMap[k];
    		ipix = cornersXYView.ipix;
            dy = this.allskyTextureSize * Math.floor(ipix/27);
            dx = this.allskyTextureSize * (ipix - 27*Math.floor(ipix/27));
            hpxKeys.push(new HpxKey(3, cornersXYViewMap[k].ipix, this, this.allskyTextureSize, this.allskyTextureSize, dx, dy, this.allskyTexture, this.allskyTextureSize));
        }

        for (var k=0; k<hpxKeys.length; k++) {
            hpxKeys[k].draw(ctx, view);
        }
    };

    
    HpxImageSurvey.prototype.redrawAllsky = function(ctx, cornersXYViewMap, fov, norder) {
    	// for norder deeper than 6, we think it brings nothing to draw the all-sky
    	if (this.view.curNorder>6) {
    		return;
    	}
    	
    	if ( ! this.allskyTexture ) {
    		return;
    	}
    	

    	var cornersXYView;
        var coeff = 0;
        var center;
        var ipix;
    	for (var k=0, len=cornersXYViewMap.length; k<len; k++) {
    		cornersXYView = cornersXYViewMap[k];
    		ipix = cornersXYView.ipix;


    		
            if ( ! this.allskyTexture || !Tile.isImageOk(this.allskyTexture) ) {
                continue;
            }

            var dy = this.allskyTextureSize * Math.floor(ipix/27);
            var dx = this.allskyTextureSize * (ipix - 27*Math.floor(ipix/27));

    		
    
    		// TODO : plutot agrandir le clip ?
    	    // grow cornersXYView
    	    if (fov>40) {
    			coeff = 0.02;
                coeff = 0.0;
    	        center = {x: (cornersXYView[0].vx+cornersXYView[2].vx)/2, y: (cornersXYView[0].vy+cornersXYView[2].vy)/2};
    	        for (var i=0; i<4; i++) {
    	            var diff = {x: cornersXYView[i].vx-center.x, y: cornersXYView[i].vy-center.y};
    	            cornersXYView[i].vx += coeff*diff.x;
    	            cornersXYView[i].vy += coeff*diff.y;
    	        }
    	    }
    			
    	    this.drawOneTile(ctx, this.allskyTexture, cornersXYView, this.allskyTextureSize, null, dx, dy, true);
    	}
    };
    
    HpxImageSurvey.prototype.getColorMap = function() {
        return this.cm;
    };
    
    var drawEven = true;
    // TODO: avoir un mode oÃ¹ on ne cherche pas Ã  dessiner d'abord les tuiles parentes (pour gÃ©nÃ©ration vignettes cÃ´tÃ© serveur)
    HpxImageSurvey.prototype.redrawHighres = function(ctx, cornersXYViewMap, norder) {
        
        // DOES THAT FIX THE PROBLEM ???
        if (cornersXYViewMap.length==0) {
            return;
        }
        
        drawEven = ! drawEven;
        var now = new Date().getTime();
        var updateNeededTiles = (now-this.lastUpdateDateNeededTiles) > HpxImageSurvey.UPDATE_NEEDED_TILES_DELAY;
        var tile, url, parentTile, parentUrl;
        var parentNorder = norder - 1;
        var cornersXYView, parentCornersXYView;
        var tilesToDraw = [];
        var parentTilesToDraw = [];
        var parentTilesToDrawIpix = {};
        var missingTiles = false;
        
        var tilesToDownload = [];
        var parentTilesToDownload = [];
        
        var parentIpix;
        var ipix;
        
        // tri des tuiles selon la distance
        if (updateNeededTiles) {
            var center = [(cornersXYViewMap[0][0].vx+cornersXYViewMap[0][1].vx)/2, (cornersXYViewMap[0][0].vy+cornersXYViewMap[0][1].vy)/2];
            var newCornersXYViewMap = cornersXYViewMap.sort(function(a, b) {
                var cA = [(a[0].vx+a[2].vx)/2, (a[0].vy+a[2].vy)/2];
                var cB = [(b[0].vx+b[2].vx)/2, (b[0].vy+b[2].vy)/2]; 

                var distA = (cA[0]-center[0])*(cA[0]-center[0]) + (cA[1]-center[1])*(cA[1]-center[1]);
                var distB = (cB[0]-center[0])*(cB[0]-center[0]) + (cB[1]-center[1])*(cB[1]-center[1]);
                
                return distA-distB;
                    
            });
            cornersXYViewMap = newCornersXYViewMap;
        }

        
    	for (var k=0, len=cornersXYViewMap.length; k<len; k++) {
    		cornersXYView = cornersXYViewMap[k];
    		ipix = cornersXYView.ipix;
            
            // on demande Ã  charger le parent (cas d'un zoomOut)
            // TODO : mettre prioritÃ© plus basse
            parentIpix = ~~(ipix/4);
        	parentUrl = this.getTileURL(parentNorder, parentIpix);
            if (updateNeededTiles && parentNorder>=3) {
            	parentTile = this.tileBuffer.addTile(parentUrl);
                if (parentTile) {
                    parentTilesToDownload.push({img: parentTile.img, url: parentUrl});
                }
            }
            
            url = this.getTileURL(norder, ipix);
            tile = this.tileBuffer.getTile(url);
            
            if ( ! tile ) {
                missingTiles = true;
                
                if (updateNeededTiles) {
                    var tile = this.tileBuffer.addTile(url);
                    if (tile) {
                        tilesToDownload.push({img: tile.img, url: url});
                    }
                }
                
                // is the parent tile available ?
                if (parentNorder>=3 && ! parentTilesToDrawIpix[parentIpix]) {
                	parentTile = this.tileBuffer.getTile(parentUrl);
                	if (parentTile && Tile.isImageOk(parentTile.img)) {
                		parentCornersXYView = this.view.getPositionsInView(parentIpix, parentNorder);
                		if (parentCornersXYView) {
                			parentTilesToDraw.push({img: parentTile.img, corners: parentCornersXYView, ipix: parentIpix});
                		}
                	}
                	parentTilesToDrawIpix[parentIpix] = 1;
                }
    
                continue;
            }
            else if ( ! Tile.isImageOk(tile.img)) {
                missingTiles = true;
                if (updateNeededTiles && ! tile.img.dlError) {
                    tilesToDownload.push({img: tile.img, url: url});
                }
                
                // is the parent tile available ?
                if (parentNorder>=3 && ! parentTilesToDrawIpix[parentIpix]) {
                	parentTile = this.tileBuffer.getTile(parentUrl);
                	if (parentTile && Tile.isImageOk(parentTile.img)) {
                		parentCornersXYView = this.view.getPositionsInView(parentIpix, parentNorder);
                		if (parentCornersXYView) {
                			parentTilesToDraw.push({img: parentTile.img, corners: parentCornersXYView, ipix: parentIpix});
                		}
                	}
                	parentTilesToDrawIpix[parentIpix] = 1;
                }
                
                continue;
            }
            tilesToDraw.push({img: tile.img, corners: cornersXYView});
        }
    	
    
    
        // draw parent tiles
        for (var k=0, len = parentTilesToDraw.length; k<len; k++) {
        	this.drawOneTile(ctx, parentTilesToDraw[k].img, parentTilesToDraw[k].corners, parentTilesToDraw[k].img.width);
        }
        
        // draw tiles
        ///*
        for (var k=0, len = tilesToDraw.length; k<len; k++) {
        	var alpha = null;
        	var img = tilesToDraw[k].img;
        	if (img.fadingStart) {
        		if (img.fadingEnd && now<img.fadingEnd) {
        			alpha = 0.2 + (now - img.fadingStart)/(img.fadingEnd - img.fadingStart)*0.8;
                    this.requestRedraw();
        		}
        	}
        	this.drawOneTile(ctx, img, tilesToDraw[k].corners, img.width, alpha);
        }
        //*/
    

        // demande de chargement des tuiles manquantes et mise Ã  jour lastUpdateDateNeededTiles
        if (updateNeededTiles) {
            // demande de chargement des tuiles
            for (var k=0, len = tilesToDownload.length; k<len; k++) {
                this.view.downloader.requestDownload(tilesToDownload[k].img, tilesToDownload[k].url, this.useCors);
            }
            //demande de chargement des tuiles parentes
            for (var k=0, len = parentTilesToDownload.length; k<len; k++) {
                this.view.downloader.requestDownload(parentTilesToDownload[k].img, parentTilesToDownload[k].url, this.useCors);
            }
            this.lastUpdateDateNeededTiles = now;
        }
        if (missingTiles) {
            // callback pour redemander un display dans 1000ms
            this.view.requestRedrawAtDate(now+HpxImageSurvey.UPDATE_NEEDED_TILES_DELAY+10);
        }
    };
    
    function dist2(x1,y1,x2,y2) {
    	return Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2);
    }
    
    HpxImageSurvey.prototype.drawOneTile = function(ctx, img, cornersXYView, textureSize, alpha, dx, dy, applyCorrection) {
        
        // apply CM
        var newImg = this.useCors ? this.cm.apply(img) : img;
        
        
    	// is the tile a diamond ?
    //	var round = AladinUtils.myRound;
    //	var b = cornersXYView;
    //	var flagDiamond =  round(b[0].vx - b[2].vx) == round(b[1].vx - b[3].vx)
    //    				&& round(b[0].vy - b[2].vy) == round(b[1].vy - b[3].vy); 
    	
    	drawTexturedTriangle(ctx, newImg,
                cornersXYView[0].vx, cornersXYView[0].vy,
                cornersXYView[1].vx, cornersXYView[1].vy,
    	        cornersXYView[3].vx, cornersXYView[3].vy,
    	        textureSize-1, textureSize-1,
    	        textureSize-1, 0,
    	        0, textureSize-1,
    	        alpha,
                dx, dy, applyCorrection);
        drawTexturedTriangle(ctx, newImg,
        		cornersXYView[1].vx, cornersXYView[1].vy,
        		cornersXYView[3].vx, cornersXYView[3].vy,
        		cornersXYView[2].vx, cornersXYView[2].vy,
        		textureSize-1, 0,
        		0, textureSize-1,
        		0, 0,
        		alpha,
                dx, dy, applyCorrection);
    };
    
       HpxImageSurvey.prototype.drawOneTile2 = function(ctx, img, cornersXYView, textureSize, alpha, dx, dy, applyCorrection, norder) {

        // apply CM
        var newImg = this.useCors ? this.cm.apply(img) : img;


        // is the tile a diamond ?
    //  var round = AladinUtils.myRound;
    //  var b = cornersXYView;
    //  var flagDiamond =  round(b[0].vx - b[2].vx) == round(b[1].vx - b[3].vx)
    //                  && round(b[0].vy - b[2].vy) == round(b[1].vy - b[3].vy); 

        var delta = norder<=3 ? (textureSize<100 ? 0.5 : 0.2) : 0;
        drawTexturedTriangle2(ctx, newImg,
                cornersXYView[0].vx, cornersXYView[0].vy,
                cornersXYView[1].vx, cornersXYView[1].vy,
                cornersXYView[3].vx, cornersXYView[3].vy,
                textureSize-delta, textureSize-delta,
                textureSize-delta, 0+delta,
                0+delta, textureSize-delta,
                alpha,
                dx, dy, applyCorrection, norder);
        drawTexturedTriangle2(ctx, newImg,
                cornersXYView[1].vx, cornersXYView[1].vy,
                cornersXYView[3].vx, cornersXYView[3].vy,
                cornersXYView[2].vx, cornersXYView[2].vy,
                textureSize-delta, 0+delta,
                0+delta, textureSize-delta,
                0+delta, 0+delta,
                alpha,
                dx, dy, applyCorrection, norder);
    };
 
    function drawTexturedTriangle2(ctx, img, x0, y0, x1, y1, x2, y2,
                                        u0, v0, u1, v1, u2, v2, alpha,
                                        dx, dy, applyCorrection, norder) {

        dx = dx || 0;
        dy = dy || 0;

        if (!applyCorrection) {
            applyCorrection = false;
        }

        u0 += dx;
        u1 += dx;
        u2 += dx;
        v0 += dy;
        v1 += dy;
        v2 += dy;
        var xc = (x0 + x1 + x2) / 3;
        var yc = (y0 + y1 + y2) / 3;


        // ---- centroid ----
        var xc = (x0 + x1 + x2) / 3;
        var yc = (y0 + y1 + y2) / 3;
        ctx.save();
        if (alpha) {
            ctx.globalAlpha = alpha;
        }

/*
        var coeff = 0.01; // default value
        if (applyCorrection) {
            coeff = 0.01;
        }
        if (norder<3) {
            coeff = 0.02; // TODO ???? 
        }
*/
coeff = 0.02;

        // ---- scale triangle by (1 + coeff) to remove anti-aliasing and draw ----
        ctx.beginPath();
        ctx.moveTo(((1+coeff) * x0 - xc * coeff), ((1+coeff) * y0 - yc * coeff));
        ctx.lineTo(((1+coeff) * x1 - xc * coeff), ((1+coeff) * y1 - yc * coeff));
        ctx.lineTo(((1+coeff) * x2 - xc * coeff), ((1+coeff) * y2 - yc * coeff));
        ctx.closePath();
        ctx.clip();

        // this is needed to prevent to see some lines between triangles
        if (applyCorrection) {
            coeff = 0.01;
            x0 = ((1+coeff) * x0 - xc * coeff), y0 = ((1+coeff) * y0 - yc * coeff);
            x1 = ((1+coeff) * x1 - xc * coeff), y1 = ((1+coeff) * y1 - yc * coeff);
            x2 = ((1+coeff) * x2 - xc * coeff), y2 = ((1+coeff) * y2 - yc * coeff);
        }

        // ---- transform texture ----
        var d_inv = 1/ (u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0);
        ctx.transform(
            -(v0 * (x2 - x1) -  v1 * x2  + v2 *  x1 + (v1 - v2) * x0) * d_inv, // m11
             (v1 *  y2 + v0  * (y1 - y2) - v2 *  y1 + (v2 - v1) * y0) * d_inv, // m12
             (u0 * (x2 - x1) -  u1 * x2  + u2 *  x1 + (u1 - u2) * x0) * d_inv, // m21
            -(u1 *  y2 + u0  * (y1 - y2) - u2 *  y1 + (u2 - u1) * y0) * d_inv, // m22
             (u0 * (v2 * x1  -  v1 * x2) + v0 * (u1 *  x2 - u2  * x1) + (u2 * v1 - u1 * v2) * x0) * d_inv, // dx
             (u0 * (v2 * y1  -  v1 * y2) + v0 * (u1 *  y2 - u2  * y1) + (u2 * v1 - u1 * v2) * y0) * d_inv  // dy
        );
        ctx.drawImage(img, 0, 0);
        //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height); 

    //    ctx.globalAlpha = 1.0;

        ctx.restore();
    }

 
    // uses affine texture mapping to draw a textured triangle
    // at screen coordinates [x0, y0], [x1, y1], [x2, y2] from
    // img *pixel* coordinates [u0, v0], [u1, v1], [u2, v2]
    // code from http://www.dhteumeuleu.com/lab/image3D.html
    function drawTexturedTriangle(ctx, img, x0, y0, x1, y1, x2, y2,
                                        u0, v0, u1, v1, u2, v2, alpha,
                                        dx, dy, applyCorrection) {

        dx = dx || 0;
        dy = dy || 0;

        if (!applyCorrection) {
            applyCorrection = false;
        }

        u0 += dx;
        u1 += dx;
        u2 += dx;
        v0 += dy;
        v1 += dy;
        v2 += dy;
        var xc = (x0 + x1 + x2) / 3;
        var yc = (y0 + y1 + y2) / 3;


        // ---- centroid ----
        var xc = (x0 + x1 + x2) / 3;
        var yc = (y0 + y1 + y2) / 3;
        ctx.save();
        if (alpha) {
        	ctx.globalAlpha = alpha;
        }
    
        var coeff = 0.01; // default value
        if (applyCorrection) {
            coeff = 0.01;
        }
        // ---- scale triangle by (1 + coeff) to remove anti-aliasing and draw ----
        ctx.beginPath();
        ctx.moveTo(((1+coeff) * x0 - xc * coeff), ((1+coeff) * y0 - yc * coeff));
        ctx.lineTo(((1+coeff) * x1 - xc * coeff), ((1+coeff) * y1 - yc * coeff));
        ctx.lineTo(((1+coeff) * x2 - xc * coeff), ((1+coeff) * y2 - yc * coeff));
        ctx.closePath();
        ctx.clip();


        // this is needed to prevent to see some lines between triangles
        if (applyCorrection) {
            coeff = 0.03;
            x0 = ((1+coeff) * x0 - xc * coeff), y0 = ((1+coeff) * y0 - yc * coeff);
            x1 = ((1+coeff) * x1 - xc * coeff), y1 = ((1+coeff) * y1 - yc * coeff);
            x2 = ((1+coeff) * x2 - xc * coeff), y2 = ((1+coeff) * y2 - yc * coeff);
        }

        // ---- transform texture ----
        var d_inv = 1/ (u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0);
        ctx.transform(
            -(v0 * (x2 - x1) -  v1 * x2  + v2 *  x1 + (v1 - v2) * x0) * d_inv, // m11
             (v1 *  y2 + v0  * (y1 - y2) - v2 *  y1 + (v2 - v1) * y0) * d_inv, // m12
             (u0 * (x2 - x1) -  u1 * x2  + u2 *  x1 + (u1 - u2) * x0) * d_inv, // m21
            -(u1 *  y2 + u0  * (y1 - y2) - u2 *  y1 + (u2 - u1) * y0) * d_inv, // m22
             (u0 * (v2 * x1  -  v1 * x2) + v0 * (u1 *  x2 - u2  * x1) + (u2 * v1 - u1 * v2) * x0) * d_inv, // dx
             (u0 * (v2 * y1  -  v1 * y2) + v0 * (u1 *  y2 - u2  * y1) + (u2 * v1 - u1 * v2) * y0) * d_inv  // dy
        );
        ctx.drawImage(img, 0, 0);
        //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height); 
        
    //    ctx.globalAlpha = 1.0;
    
        ctx.restore();
    }
    
    /*
    function drawTexturedTriangle4Points(ctx, img, x0, y0, x1, y1, x2, y2,
            u0, v0, u1, v1, u2, v2) {
    
    	var x3 = x1+x2-x0;
    	var y3 = y1+y2-y0;
    // ---- centroid ----
    var xc = (x0 + x1 + x2 + x3) / 4;
    var yc = (y0 + y1 + y2 + y3) / 4;
    ctx.save();
    ctx.beginPath();
    // ---- scale triagle by 1.05 to remove anti-aliasing and draw ----
    ctx.moveTo((1.05 * x0 - xc * 0.05), (1.05 * y0 - yc * 0.05));
    ctx.lineTo((1.05 * x1 - xc * 0.05), (1.05 * y1 - yc * 0.05));
    ctx.lineTo((1.05 * x3 - xc * 0.05), (1.05 * y3 - yc * 0.05));
    ctx.lineTo((1.05 * x2 - xc * 0.05), (1.05 * y2 - yc * 0.05));
    ctx.closePath();
    ctx.clip();
    // ---- transform texture ----
    var d_inv = 1/ (u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0);
    ctx.transform(
    -(v0 * (x2 - x1) -  v1 * x2  + v2 *  x1 + (v1 - v2) * x0) * d_inv, // m11
    (v1 *  y2 + v0  * (y1 - y2) - v2 *  y1 + (v2 - v1) * y0) * d_inv, // m12
    (u0 * (x2 - x1) -  u1 * x2  + u2 *  x1 + (u1 - u2) * x0) * d_inv, // m21
    -(u1 *  y2 + u0  * (y1 - y2) - u2 *  y1 + (u2 - u1) * y0) * d_inv, // m22
    (u0 * (v2 * x1  -  v1 * x2) + v0 * (u1 *  x2 - u2  * x1) + (u2 * v1 - u1 * v2) * x0) * d_inv, // dx
    (u0 * (v2 * y1  -  v1 * y2) + v0 * (u1 *  y2 - u2  * y1) + (u2 * v1 - u1 * v2) * y0) * d_inv  // dy
    );
    //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height); // faster ??
    ctx.drawImage(img, 0, 0); // slower ??
    
    ctx.restore();
    }
    */
    
    
    // @api
    HpxImageSurvey.prototype.setAlpha = function(alpha) {
        alpha = +alpha; // coerce to number
        this.alpha = Math.max(0, Math.min(alpha, 1));
        this.view.requestRedraw();
    };
    
    // @api
    HpxImageSurvey.prototype.getAlpha = function() {
        return this.alpha;
    }

    return HpxImageSurvey;
})();
// Copyright 2015 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File HealpixGrid
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

HealpixGrid = (function() {
	var HealpixGrid = function() {
	};
	
	HealpixGrid.prototype.redraw = function(ctx, cornersXYViewMap, fov, norder) {
		// on dessine les lignes
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgb(150,150,220)";
		ctx.beginPath();
		var cornersXYView;
		for (var k=0, len=cornersXYViewMap.length; k<len; k++) {
			cornersXYView = cornersXYViewMap[k];
			ipix = cornersXYView.ipix;
			
			// draw pixel
			ctx.moveTo(cornersXYView[0].vx, cornersXYView[0].vy);
			ctx.lineTo(cornersXYView[1].vx, cornersXYView[1].vy);
			ctx.lineTo(cornersXYView[2].vx, cornersXYView[2].vy);
			//ctx.lineTo(cornersXYView[3].vx, cornersXYView[3].vy);
			

            //ctx.strokeText(ipix, (cornersXYView[0].vx + cornersXYView[2].vx)/2, (cornersXYView[0].vy + cornersXYView[2].vy)/2);
		}
		ctx.stroke();
		
		// on dessine les numÃ©ros de pixel HEALpix
        ctx.strokeStyle="#FFDDDD";
		ctx.beginPath();
		for (var k=0, len=cornersXYViewMap.length; k<len; k++) {
			cornersXYView = cornersXYViewMap[k];
			ipix = cornersXYView.ipix;

            ctx.strokeText(norder + '/' + ipix, (cornersXYView[0].vx + cornersXYView[2].vx)/2, (cornersXYView[0].vy + cornersXYView[2].vy)/2);
		}
		ctx.stroke();
	};

	
	
	return HealpixGrid;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 * 
 * File Location.js
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Location = (function() {
    // constructor
    Location = function(locationDiv) {
    		this.$div = $(locationDiv);
    	};
	
	Location.prototype.update = function(lon, lat, cooFrame, isViewCenterPosition) {
        isViewCenterPosition = (isViewCenterPosition && isViewCenterPosition===true) || false;
		var coo = new Coo(lon, lat, 7);
		if (cooFrame==CooFrameEnum.J2000) {
            this.$div.html(coo.format('s/'));
        }
		else if (cooFrame==CooFrameEnum.J2000d) {
            this.$div.html(coo.format('d/'));
        }
        else {
            this.$div.html(coo.format('d/'));
        }

        this.$div.toggleClass('aladin-reticleColor', isViewCenterPosition);
	};
	
	return Location;
})();
	
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//




/******************************************************************************
 * Aladin Lite project
 * 
 * File View.js
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

View = (function() {

    /** Constructor */
    function View (aladin, location, fovDiv, cooFrame, zoom) {
            this.aladin = aladin;
            this.options = aladin.options;
            this.aladinDiv = this.aladin.aladinDiv;
            this.popup = new Popup(this.aladinDiv, this);

            this.createCanvases();
            this.location = location;
            this.fovDiv = fovDiv;
            this.mustClearCatalog = true;
            this.mustRedrawReticle = true;
            
            this.mode = View.PAN;
            
            this.minFOV = this.maxFOV = null; // by default, no restriction
            
            this.healpixGrid = new HealpixGrid(this.imageCanvas);
            if (cooFrame) {
                this.cooFrame = cooFrame;
            }
            else {
                this.cooFrame = CooFrameEnum.GAL;
            }
            
            var lon, lat;
            lon = lat = 0;
            
            this.projectionMethod = ProjectionEnum.SIN;
            this.projection = new Projection(lon, lat);
            this.projection.setProjection(this.projectionMethod);
            this.zoomLevel = 0;
            this.zoomFactor = this.computeZoomFactor(this.zoomLevel);
    
            this.viewCenter = {lon: lon, lat: lat}; // position of center of view
            
            if (zoom) {
                this.setZoom(zoom);
            }
            
            // current reference image survey displayed
            this.imageSurvey = null;
            // current catalogs displayed
            this.catalogs = [];
            // a dedicated catalog for the popup
            var c = document.createElement('canvas');
            c.width = c.height = 24;
            var ctx= c.getContext('2d');
            ctx.lineWidth = 6.0;
            ctx.beginPath();
            ctx.strokeStyle = '#eee';
            ctx.arc(12, 12, 8, 0, 2*Math.PI, true);
            ctx.stroke();
            ctx.lineWidth = 3.0;
            ctx.beginPath();
            ctx.strokeStyle = '#c38';
            ctx.arc(12, 12, 8, 0, 2*Math.PI, true);
            ctx.stroke();
            this.catalogForPopup = A.catalog({shape: c, sourceSize: 24});
            //this.catalogForPopup = A.catalog({sourceSize: 18, shape: 'circle', color: '#c38'});
            this.catalogForPopup.hide();
            this.catalogForPopup.setView(this);
            // overlays (footprints for instance)
            this.overlays = [];
            // MOCs
            this.mocs = [];
            // reference to all overlay layers (= catalogs + overlays + mocs)
            this.allOverlayLayers = []
            
    
            
            this.tileBuffer = new TileBuffer(); // tile buffer is shared across different image surveys
            this.fixLayoutDimensions();
            
    
            this.curNorder = 1;
            this.realNorder = 1;
            this.curOverlayNorder = 1;
            
            // some variables for mouse handling
            this.dragging = false;
            this.dragx = null;
            this.dragy = null;
            this.needRedraw = true;

            // zoom pinching
            this.pinchZoomParameters = {
                isPinching: false, // true if a pinch zoom is ongoing
                initialFov: undefined,
                initialDistance: undefined
            };
    
            this.downloader = new Downloader(this); // the downloader object is shared across all HpxImageSurveys
            this.flagForceRedraw = false;
    
            this.fadingLatestUpdate = null;
            
            this.dateRequestRedraw = null;
            
            this.showGrid = false; // coordinates grid
            
            init(this);
            

            // listen to window resize and reshape canvases
            this.resizeTimer = null;
            var self = this;
            $(window).resize(function() {
                clearTimeout(self.resizeTimer);
                self.resizeTimer = setTimeout(function() {self.fixLayoutDimensions(self)}, 100);
            });


            // in some contexts (Jupyter notebook for instance), the parent div changes little time after Aladin Lite creation
            // this results in canvas dimension to be incorrect.
            // The following line tries to fix this issue
            setTimeout(function() {
                var computedWidth = $(self.aladinDiv).width();
                var computedHeight = $(self.aladinDiv).height();

                if (self.width!==computedWidth || self.height===computedHeight) {
                    self.fixLayoutDimensions();
                    self.setZoomLevel(self.zoomLevel); // needed to force recomputation of displayed FoV
                }
           }, 1000);
        };
    
    // different available modes
    View.PAN = 0;
    View.SELECT = 1;
    View.TOOL_SIMBAD_POINTER = 2;
        
    
    // TODO: should be put as an option at layer level    
    View.DRAW_SOURCES_WHILE_DRAGGING = true;
    View.DRAW_MOCS_WHILE_DRAGGING = true;

    View.CALLBACKS_THROTTLE_TIME_MS = 100; // minimum time between two consecutive callback calls

    
    // (re)create needed canvases
    View.prototype.createCanvases = function() {
        var a = $(this.aladinDiv);
        a.find('.aladin-imageCanvas').remove();
        a.find('.aladin-catalogCanvas').remove();
        a.find('.aladin-reticleCanvas').remove();
        
        // canvas to draw the images
        this.imageCanvas = $("<canvas class='aladin-imageCanvas'></canvas>").appendTo(this.aladinDiv)[0];
        // canvas to draw the catalogs
        this.catalogCanvas = $("<canvas class='aladin-catalogCanvas'></canvas>").appendTo(this.aladinDiv)[0];
        // canvas to draw the reticle
        this.reticleCanvas = $("<canvas class='aladin-reticleCanvas'></canvas>").appendTo(this.aladinDiv)[0];
    };
    
    
    // called at startup and when window is resized
    View.prototype.fixLayoutDimensions = function() {
        Utils.cssScale = undefined;
        
        var computedWidth = $(this.aladinDiv).width();
        var computedHeight = $(this.aladinDiv).height();

        this.width = Math.max(computedWidth, 1);
        this.height = Math.max(computedHeight, 1); // this prevents many problems when div size is equal to 0
        
        
        this.cx = this.width/2;
        this.cy = this.height/2;
        
        this.largestDim = Math.max(this.width, this.height);
        this.smallestDim = Math.min(this.width, this.height);
        this.ratio = this.largestDim/this.smallestDim;

        
        this.mouseMoveIncrement = 160/this.largestDim;

        // reinitialize 2D context
        this.imageCtx = this.imageCanvas.getContext("2d");
        this.catalogCtx = this.catalogCanvas.getContext("2d");
        this.reticleCtx = this.reticleCanvas.getContext("2d");
        
        this.imageCtx.canvas.width = this.width;
        this.catalogCtx.canvas.width = this.width;
        this.reticleCtx.canvas.width = this.width;

        
        this.imageCtx.canvas.height = this.height;
        this.catalogCtx.canvas.height = this.height;
        this.reticleCtx.canvas.height = this.height;

        pixelateCanvasContext(this.imageCtx, this.aladin.options.pixelateCanvas);

        // change logo
        if (!this.logoDiv) {
            this.logoDiv = $(this.aladinDiv).find('.aladin-logo')[0];
        }
        if (this.width>800) {
            $(this.logoDiv).removeClass('aladin-logo-small');
            $(this.logoDiv).addClass('aladin-logo-large');
            $(this.logoDiv).css('width', '90px');
        }
        else {
            $(this.logoDiv).addClass('aladin-logo-small');
            $(this.logoDiv).removeClass('aladin-logo-large');
            $(this.logoDiv).css('width', '32px');
        }

        
        this.computeNorder();
        this.requestRedraw();
    };

    var pixelateCanvasContext = function(ctx, pixelateFlag) {
        var enableSmoothing = ! pixelateFlag;
        ctx.imageSmoothingEnabled = enableSmoothing;
        ctx.webkitImageSmoothingEnabled = enableSmoothing;
        ctx.mozImageSmoothingEnabled = enableSmoothing;
        ctx.msImageSmoothingEnabled = enableSmoothing;
        ctx.oImageSmoothingEnabled = enableSmoothing;
    }
    

    View.prototype.setMode = function(mode) {
        this.mode = mode;
        if (this.mode==View.SELECT) {
            this.setCursor('crosshair');
        }
        else if (this.mode==View.TOOL_SIMBAD_POINTER) {
            this.popup.hide();
            this.reticleCanvas.style.cursor = '';
            $(this.reticleCanvas).addClass('aladin-sp-cursor');
        }
        else {
            this.setCursor('default');
        }
    };
    
    View.prototype.setCursor = function(cursor) {
        if (this.reticleCanvas.style.cursor==cursor) {
            return;
        }
        if (this.mode==View.TOOL_SIMBAD_POINTER) {
            return;
        }
        this.reticleCanvas.style.cursor = cursor;
    };

    
    
    /**
     * return dataURL string corresponding to the current view
     */
    View.prototype.getCanvasDataURL = function(imgType, width, height) {
        imgType = imgType || "image/png"; 
        var c = document.createElement('canvas');
        width = width ||this.width;
        height = height ||this.height;
        c.width = width;
        c.height = height;
        var ctx = c.getContext('2d');
        ctx.drawImage(this.imageCanvas, 0, 0, c.width, c.height);
        ctx.drawImage(this.catalogCanvas, 0, 0, c.width, c.height);
        ctx.drawImage(this.reticleCanvas, 0, 0, c.width, c.height);
        
        return c.toDataURL(imgType);
        //return c.toDataURL("image/jpeg", 0.01); // setting quality only works for JPEG (?)
    };


    /**
     * Compute the FoV in degrees of the view and update mouseMoveIncrement
     * 
     * @param view
     * @returns FoV (array of 2 elements : width and height) in degrees
     */
    computeFov = function(view) {
        var fov = doComputeFov(view, view.zoomFactor);
        
        
        view.mouseMoveIncrement = fov/view.imageCanvas.width;
            
        return fov;
    };
    
    doComputeFov = function(view, zoomFactor) {
        // if zoom factor < 1, we view 180Â°
        var fov;
        if (view.zoomFactor<1) {
            fov = 180;
        }
        else {
            // TODO : fov sur les 2 dimensions !!
            // to compute FoV, we first retrieve 2 points at coordinates (0, view.cy) and (width-1, view.cy)
            var xy1 = AladinUtils.viewToXy(0, view.cy, view.width, view.height, view.largestDim, zoomFactor);
            var lonlat1 = view.projection.unproject(xy1.x, xy1.y);
            
            var xy2 = AladinUtils.viewToXy(view.imageCanvas.width-1, view.cy, view.width, view.height, view.largestDim, zoomFactor);
            var lonlat2 = view.projection.unproject(xy2.x, xy2.y);
            
            
            fov = new Coo(lonlat1.ra, lonlat1.dec).distance(new Coo(lonlat2.ra, lonlat2.dec));
        }
        
        return fov;
    };
    
    updateFovDiv = function(view) {
        if (isNaN(view.fov)) {
            view.fovDiv.html("FoV:");
            return;
        }
        // update FoV value
        var fovStr;
        if (view.fov>1) {
            fovStr = Math.round(view.fov*100)/100 + "Â°";
        }
        else if (view.fov*60>1) {
            fovStr = Math.round(view.fov*60*100)/100 + "'";
        }
        else {
            fovStr = Math.round(view.fov*3600*100)/100 + '"';
        }
        view.fovDiv.html("FoV: " + fovStr);
    };
    
    
    createListeners = function(view) {
        var hasTouchEvents = false;
        if ('ontouchstart' in window) {
            hasTouchEvents = true;
        }
        
        // various listeners
        onDblClick = function(e) {
            var xymouse = view.imageCanvas.relMouseCoords(e);
            var xy = AladinUtils.viewToXy(xymouse.x, xymouse.y, view.width, view.height, view.largestDim, view.zoomFactor);
            try {
                var lonlat = view.projection.unproject(xy.x, xy.y);
            }
            catch(err) {
                return;
            }
            radec = [];
            // convert to J2000 if needed
            if (view.cooFrame.system==CooFrameEnum.SYSTEMS.GAL) {
                radec = CooConversion.GalacticToJ2000([lonlat.ra, lonlat.dec]);
            }
            else {
                radec = [lonlat.ra, lonlat.dec];
            }

            view.pointTo(radec[0], radec[1]);
        };
        if (! hasTouchEvents) {
            $(view.reticleCanvas).dblclick(onDblClick);
        }
        
        
        $(view.reticleCanvas).bind("mousedown touchstart", function(e) {
            // zoom pinching
            if (e.type==='touchstart' && e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches.length==2) {
                view.dragging = false;

                view.pinchZoomParameters.isPinching = true;
                var fov = view.aladin.getFov();
                view.pinchZoomParameters.initialFov = Math.max(fov[0], fov[1]);
                view.pinchZoomParameters.initialDistance = Math.sqrt(Math.pow(e.originalEvent.targetTouches[0].clientX - e.originalEvent.targetTouches[1].clientX, 2) + Math.pow(e.originalEvent.targetTouches[0].clientY - e.originalEvent.targetTouches[1].clientY, 2));

                return;
            }

            var xymouse = view.imageCanvas.relMouseCoords(e);
            if (e.originalEvent && e.originalEvent.targetTouches) {
                view.dragx = e.originalEvent.targetTouches[0].clientX;
                view.dragy = e.originalEvent.targetTouches[0].clientY;
            }
            else {
                /*
                view.dragx = e.clientX;
                view.dragy = e.clientY;
                */
                view.dragx = xymouse.x;
                view.dragy = xymouse.y;
            }


            view.dragging = true;
            if (view.mode==View.PAN) {
                view.setCursor('move');
            }
            else if (view.mode==View.SELECT) {
                view.selectStartCoo = {x: view.dragx, y: view.dragy};
            }
            return false; // to disable text selection
        });

        //$(view.reticleCanvas).bind("mouseup mouseout touchend", function(e) {
        $(view.reticleCanvas).bind("click mouseout touchend", function(e) { // reacting on 'click' rather on 'mouseup' is more reliable when panning the view
            if (e.type==='touchend' && view.pinchZoomParameters.isPinching) {
                view.pinchZoomParameters.isPinching = false;
                view.pinchZoomParameters.initialFov = view.pinchZoomParameters.initialDistance = undefined;
    
                return;
            }


            var wasDragging = view.realDragging === true;
            var selectionHasEnded = view.mode===View.SELECT && view.dragging;

            if (view.dragging) { // if we were dragging, reset to default cursor
                view.setCursor('default');
                view.dragging = false;

                if (wasDragging) {
                    view.realDragging = false;
                
                    // call positionChanged one last time after dragging, with dragging: false
                    var posChangedFn = view.aladin.callbacksByEventName['positionChanged'];
                    if (typeof posChangedFn === 'function') {
                        var pos = view.aladin.pix2world(view.width/2, view.height/2);
                        if (pos !== undefined) {
                            posChangedFn({ra: pos[0], dec: pos[1], dragging: false});
                        }
                    }
                }
            } // end of "if (view.dragging) ... "

            if (selectionHasEnded) {
                view.aladin.fire('selectend', 
                                 view.getObjectsInBBox(view.selectStartCoo.x, view.selectStartCoo.y,
                                                       view.dragx-view.selectStartCoo.x, view.dragy-view.selectStartCoo.y));    

                view.mustRedrawReticle = true; // pour effacer selection bounding box
                view.requestRedraw();

                return;
            }



            view.mustClearCatalog = true;
            view.mustRedrawReticle = true; // pour effacer selection bounding box
            view.dragx = view.dragy = null;



            if (e.type==="mouseout" || e.type==="touchend") {
                view.requestRedraw(true);
                updateLocation(view, view.width/2, view.height/2, true);


                if (e.type==="mouseout") {
                    if (view.mode===View.TOOL_SIMBAD_POINTER) {
                        view.setMode(View.PAN);
                    }

                    return;
                }
            }

            var xymouse = view.imageCanvas.relMouseCoords(e);

            if (view.mode==View.TOOL_SIMBAD_POINTER) {
                var radec = view.aladin.pix2world(xymouse.x, xymouse.y);

                view.setMode(View.PAN);
                view.setCursor('wait');

                SimbadPointer.query(radec[0], radec[1], Math.min(1, 15 * view.fov / view.largestDim), view.aladin);

                return; // when in TOOL_SIMBAD_POINTER mode, we do not call the listeners
            }

            // popup to show ?
            var objs = view.closestObjects(xymouse.x, xymouse.y, 5);
            if (! wasDragging && objs) {
                var o = objs[0];

                // footprint selection code adapted from Fabrizio Giordano dev. from Serco for ESA/ESDC
                if (o instanceof Footprint || o instanceof Circle) {
                    o.dispatchClickEvent();
                }

                // display marker
                else if (o.marker) {
                    // could be factorized in Source.actionClicked
                    view.popup.setTitle(o.popupTitle);
                    view.popup.setText(o.popupDesc);
                    view.popup.setSource(o);
                    view.popup.show();
                }
                // show measurements
                else {
                    if (view.lastClickedObject) {
                        view.lastClickedObject.actionOtherObjectClicked && view.lastClickedObject.actionOtherObjectClicked();
                    }
                    o.actionClicked();
                }
                view.lastClickedObject = o;
                var objClickedFunction = view.aladin.callbacksByEventName['objectClicked'];
                (typeof objClickedFunction === 'function') && objClickedFunction(o);
            }
            else {
                if (view.lastClickedObject && ! wasDragging) {
                    view.aladin.measurementTable.hide();
                    view.popup.hide();

                    if (view.lastClickedObject instanceof Footprint) {
                        //view.lastClickedObject.deselect();
                    }
                    else {
                        view.lastClickedObject.actionOtherObjectClicked();
                    }

                    view.lastClickedObject = null;
                    var objClickedFunction = view.aladin.callbacksByEventName['objectClicked'];
                    (typeof objClickedFunction === 'function') && objClickedFunction(null);
                }
            }

            // call listener of 'click' event
            var onClickFunction = view.aladin.callbacksByEventName['click'];
            if (typeof onClickFunction === 'function') {
                var pos = view.aladin.pix2world(xymouse.x, xymouse.y);
                if (pos !== undefined) {
                    onClickFunction({ra: pos[0], dec: pos[1], x: xymouse.x, y: xymouse.y, isDragging: wasDragging});
                }
            }


            // TODO : remplacer par mecanisme de listeners
            // on avertit les catalogues progressifs
            view.refreshProgressiveCats();

            view.requestRedraw(true);
        });
        var lastHoveredObject; // save last object hovered by mouse
        var lastMouseMovePos = null;
        $(view.reticleCanvas).bind("mousemove touchmove", function(e) {
            e.preventDefault();

            if (e.type==='touchmove' && view.pinchZoomParameters.isPinching && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length==2) {
                var dist = Math.sqrt(Math.pow(e.originalEvent.touches[0].clientX - e.originalEvent.touches[1].clientX, 2) + Math.pow(e.originalEvent.touches[0].clientY - e.originalEvent.touches[1].clientY, 2));
                view.setZoom(view.pinchZoomParameters.initialFov * view.pinchZoomParameters.initialDistance / dist);

                return;
            }

            var xymouse = view.imageCanvas.relMouseCoords(e);
            if (!view.dragging || hasTouchEvents) {
                // update location box
                updateLocation(view, xymouse.x, xymouse.y);
                // call listener of 'mouseMove' event
                var onMouseMoveFunction = view.aladin.callbacksByEventName['mouseMove'];
                if (typeof onMouseMoveFunction === 'function') {
                    var pos = view.aladin.pix2world(xymouse.x, xymouse.y);
                    if (pos !== undefined) {
                        onMouseMoveFunction({ra: pos[0], dec: pos[1], x: xymouse.x, y: xymouse.y});
                    }
                    // send null ra and dec when we go out of the "sky"
                    else if (lastMouseMovePos != null) {
                        onMouseMoveFunction({ra: null, dec: null, x: xymouse.x, y: xymouse.y});
                    }
                    lastMouseMovePos = pos;
                }


                if (!view.dragging && ! view.mode==View.SELECT) {
                    // objects under the mouse ?
                    var closest = view.closestObjects(xymouse.x, xymouse.y, 5);
                    if (closest) {
                        view.setCursor('pointer');
                        var objHoveredFunction = view.aladin.callbacksByEventName['objectHovered'];
                        if (typeof objHoveredFunction === 'function' && closest[0]!=lastHoveredObject) {
                            var ret = objHoveredFunction(closest[0]);
                        }
                        lastHoveredObject = closest[0];
        
                    }
                    else {
                        view.setCursor('default');
                        var objHoveredFunction = view.aladin.callbacksByEventName['objectHovered'];
                        if (typeof objHoveredFunction === 'function' && lastHoveredObject) {
                            lastHoveredObject = null;
                            // call callback function to notify we left the hovered object
                            var ret = objHoveredFunction(null);
                        }
                    }
                }
                if (!hasTouchEvents) {
                    return;
                }
            }

            if (! view.dragging) {
                return;
            }

            var xoffset, yoffset;
            var pos1, pos2;
            
            if (e.originalEvent && e.originalEvent.targetTouches) {
                // ???
                xoffset = e.originalEvent.targetTouches[0].clientX-view.dragx;
                yoffset = e.originalEvent.targetTouches[0].clientY-view.dragy;
                var xy1 = AladinUtils.viewToXy(e.originalEvent.targetTouches[0].clientX, e.originalEvent.targetTouches[0].clientY, view.width, view.height, view.largestDim, view.zoomFactor);
                var xy2 = AladinUtils.viewToXy(view.dragx, view.dragy, view.width, view.height, view.largestDim, view.zoomFactor);

                pos1 = view.projection.unproject(xy1.x, xy1.y);
                pos2 = view.projection.unproject(xy2.x, xy2.y);
            }
            else {
                /*
                xoffset = e.clientX-view.dragx;
                yoffset = e.clientY-view.dragy;
                */
                xoffset = xymouse.x-view.dragx;
                yoffset = xymouse.y-view.dragy;
                
                var xy1 = AladinUtils.viewToXy(xymouse.x, xymouse.y, view.width, view.height, view.largestDim, view.zoomFactor);
                var xy2 = AladinUtils.viewToXy(view.dragx, view.dragy, view.width, view.height, view.largestDim, view.zoomFactor);

                
                pos1 = view.projection.unproject(xy1.x, xy1.y);
                pos2 = view.projection.unproject(xy2.x, xy2.y);
                
            }
            
            // TODO : faut il faire ce test ??
//            var distSquared = xoffset*xoffset+yoffset*yoffset;
//            if (distSquared<3) {
//                return;
//            }
            if (e.originalEvent && e.originalEvent.targetTouches) {
                view.dragx = e.originalEvent.targetTouches[0].clientX;
                view.dragy = e.originalEvent.targetTouches[0].clientY;
            }
            else {
                view.dragx = xymouse.x;
                view.dragy = xymouse.y;
                /*
                view.dragx = e.clientX;
                view.dragy = e.clientY;
                */
            }
            
            if (view.mode==View.SELECT) {
                  view.requestRedraw();
                  return;
            }

            //view.viewCenter.lon += xoffset*view.mouseMoveIncrement/Math.cos(view.viewCenter.lat*Math.PI/180.0);
            /*
            view.viewCenter.lon += xoffset*view.mouseMoveIncrement;
            view.viewCenter.lat += yoffset*view.mouseMoveIncrement;
            */
            view.viewCenter.lon += pos2.ra -  pos1.ra;
            view.viewCenter.lat += pos2.dec - pos1.dec;
            

            
            // can not go beyond poles
            if (view.viewCenter.lat>90) {
                view.viewCenter.lat = 90;
            }
            else if (view.viewCenter.lat < -90) {
                view.viewCenter.lat = -90;
            }
            
            // limit lon to [0, 360]
            if (view.viewCenter.lon < 0) {
                view.viewCenter.lon = 360 + view.viewCenter.lon;
            }
            else if (view.viewCenter.lon > 360) {
                view.viewCenter.lon = view.viewCenter.lon % 360;
            }
            view.realDragging = true;
            view.requestRedraw();
        }); //// endof mousemove ////
        
        // disable text selection on IE
        $(view.aladinDiv).onselectstart = function () { return false; }

        $(view.reticleCanvas).on('mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var level = view.zoomLevel;

             var delta = event.deltaY;
            // this seems to happen in context of Jupyter notebook --> we have to invert the direction of scroll
            // hope this won't trigger some side effects ...
            if (event.hasOwnProperty('originalEvent')) {
                delta = -event.originalEvent.deltaY;
            } 
            if (delta>0) {
                level += 1;
            }
            else {
                level -= 1;
            }
            view.setZoomLevel(level);
            
            return false;
        });

    };
    
    var init = function(view) {
        var stats = new Stats();
        stats.domElement.style.top = '50px';
        if ($('#aladin-statsDiv').length>0) {
            $('#aladin-statsDiv')[0].appendChild( stats.domElement );
        }
        
        view.stats = stats;

        createListeners(view);

        view.executeCallbacksThrottled = Utils.throttle(
            function() {
                var pos = view.aladin.pix2world(view.width/2, view.height/2);
                var fov = view.fov;
                if (pos===undefined || fov===undefined) {
                    return;
                }

                var ra = pos[0];
                var dec = pos[1];
                // trigger callback only if position has changed !
                if (ra!==this.ra || dec!==this.dec) {
                    var posChangedFn = view.aladin.callbacksByEventName['positionChanged'];
                    (typeof posChangedFn === 'function') && posChangedFn({ra: ra, dec: dec, dragging: true});
    
                    // finally, save ra and dec value
                    this.ra = ra;
                    this.dec = dec;
                }

                // trigger callback only if FoV (zoom) has changed !
                if (fov!==this.old_fov) {
                    var fovChangedFn = view.aladin.callbacksByEventName['zoomChanged'];
                    (typeof fovChangedFn === 'function') && fovChangedFn(fov);
    
                    // finally, save fov value
                    this.old_fov = fov;
                }

            },
            View.CALLBACKS_THROTTLE_TIME_MS);


        view.displayHpxGrid = false;
        view.displaySurvey = true;
        view.displayCatalog = false;
        view.displayReticle = true;
        
        // initial draw
        view.fov = computeFov(view);
        updateFovDiv(view);
        
        view.redraw();
    };

    function updateLocation(view, x, y, isViewCenterPosition) {
        if (!view.projection) {
            return;
        }
        var xy = AladinUtils.viewToXy(x, y, view.width, view.height, view.largestDim, view.zoomFactor);
        var lonlat;
        try {
            lonlat = view.projection.unproject(xy.x, xy.y);
        }
        catch(err) {
        }
        if (lonlat) {
            view.location.update(lonlat.ra, lonlat.dec, view.cooFrame, isViewCenterPosition);
        }
    }
    
    View.prototype.requestRedrawAtDate = function(date) {
        this.dateRequestDraw = date;
    };

    /**
     * Return the color of the lowest intensity pixel 
     * in teh current color map of the current background image HiPS
     */
    View.prototype.getBackgroundColor = function() {
        var white = 'rgb(255, 255, 255)';
        var black = 'rgb(0, 0, 0)';

        if (! this.imageSurvey) {
            return black;
        }

        var cm = this.imageSurvey.getColorMap();
        if (!cm) {
            return black;
        }
        if (cm.mapName == 'native' || cm.mapName == 'grayscale') {
            return cm.reversed ? white : black;
        }

        var idx = cm.reversed ? 255 : 0;
        var r = ColorMap.MAPS[cm.mapName].r[idx];
        var g = ColorMap.MAPS[cm.mapName].g[idx];
        var b = ColorMap.MAPS[cm.mapName].b[idx];

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

    View.prototype.getViewParams = function() {
        var resolution = this.width > this.height ? this.fov / this.width : this.fov / this.height;
        return {
            fov: [this.width * resolution, this.height * resolution],   
            width: this.width,   
            height: this.height   
        };
    };
    
    

    /**
     * redraw the whole view
     */
    View.prototype.redraw = function() {
        var saveNeedRedraw = this.needRedraw;
        requestAnimFrame(this.redraw.bind(this));

        var now = new Date().getTime();
        
        if (this.dateRequestDraw && now>this.dateRequestDraw) {
            this.dateRequestDraw = null;
        } 
        else if (! this.needRedraw) {
            if ( ! this.flagForceRedraw) {
                return;
            }
            else {
                this.flagForceRedraw = false;
            }
        }
        this.stats.update();


        var imageCtx = this.imageCtx;
        //////// 1. Draw images ////////
        if (imageCtx.start2D) {
            imageCtx.start2D();
        }
        //// clear canvas ////
        // TODO : do not need to clear if fov small enough ?
        imageCtx.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
        ////////////////////////
    
        var bkgdColor = this.getBackgroundColor();    
        // fill with background of the same color than the first color map value (lowest intensity)
        if (this.projectionMethod==ProjectionEnum.SIN) {
            if (this.fov>=60) {
                imageCtx.fillStyle = bkgdColor;
                imageCtx.beginPath();
                var maxCxCy = this.cx>this.cy ? this.cx : this.cy;
                imageCtx.arc(this.cx, this.cy, maxCxCy * this.zoomFactor, 0, 2*Math.PI, true);
                imageCtx.fill();
            }
            // pour eviter les losanges blancs qui apparaissent quand les tuiles sont en attente de chargement
            else {
                imageCtx.fillStyle = bkgdColor;
                imageCtx.fillRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
            }
        }
        else if (this.projectionMethod==ProjectionEnum.AITOFF) {
            if (imageCtx.ellipse) {
                imageCtx.fillStyle = bkgdColor;
                imageCtx.beginPath();
                imageCtx.ellipse(this.cx, this.cy, 2.828*this.cx*this.zoomFactor, this.cx*this.zoomFactor*1.414, 0, 0, 2*Math.PI);
                imageCtx.fill();
            }
        }
        if (imageCtx.finish2D) {
            imageCtx.finish2D();
        }

        
        this.projection.setCenter(this.viewCenter.lon, this.viewCenter.lat);
        // do we have to redo that every time? Probably not
        this.projection.setProjection(this.projectionMethod);
    

        // ************* Draw allsky tiles (low resolution) *****************

        var cornersXYViewMapHighres = null;
        // Pour traitement des DEFORMATIONS --> TEMPORAIRE, draw deviendra la methode utilisee systematiquement
        if (this.imageSurvey && this.imageSurvey.isReady && this.displaySurvey) {
                if (this.aladin.reduceDeformations==null) {
                    this.imageSurvey.draw(imageCtx, this, !this.dragging, this.curNorder);
                }

                else {
                    this.imageSurvey.draw(imageCtx, this, this.aladin.reduceDeformations, this.curNorder);
                }
        }
        /*
        else {
            var cornersXYViewMapAllsky = this.getVisibleCells(3);
            var cornersXYViewMapHighres = null;
            if (this.curNorder>=3) {
                if (this.curNorder==3) {
                    cornersXYViewMapHighres = cornersXYViewMapAllsky;
                }
                else {
                    cornersXYViewMapHighres = this.getVisibleCells(this.curNorder);
                }
            }

            // redraw image survey
            if (this.imageSurvey && this.imageSurvey.isReady && this.displaySurvey) {
                // TODO : a t on besoin de dessiner le allsky si norder>=3 ?
                // TODO refactoring : should be a method of HpxImageSurvey
                this.imageSurvey.redrawAllsky(imageCtx, cornersXYViewMapAllsky, this.fov, this.curNorder);
                if (this.curNorder>=3) {
                    this.imageSurvey.redrawHighres(imageCtx, cornersXYViewMapHighres, this.curNorder);
                }
            }
        }
        */
        

        // redraw overlay image survey
        // TODO : does not work if different frames 
        // TODO: use HpxImageSurvey.draw method !!
        if (this.overlayImageSurvey && this.overlayImageSurvey.isReady) {
            imageCtx.globalAlpha = this.overlayImageSurvey.getAlpha();

            if (this.aladin.reduceDeformations==null) {
                this.overlayImageSurvey.draw(imageCtx, this, !this.dragging, this.curOverlayNorder);
            }

            else {
                this.overlayImageSurvey.draw(imageCtx, this, this.aladin.reduceDeformations, this.curOverlayNorder);
            }
            /*
            if (this.fov>50) {
                this.overlayImageSurvey.redrawAllsky(imageCtx, cornersXYViewMapAllsky, this.fov, this.curOverlayNorder);
            }
            if (this.curOverlayNorder>=3) {
                var norderOverlay = Math.min(this.curOverlayNorder, this.overlayImageSurvey.maxOrder);
                if ( cornersXYViewMapHighres==null || norderOverlay != this.curNorder ) {
                    cornersXYViewMapHighres = this.getVisibleCells(norderOverlay);
                }
                this.overlayImageSurvey.redrawHighres(imageCtx, cornersXYViewMapHighres, norderOverlay);
            }
            */

           imageCtx.globalAlpha = 1.0;

        }
        
        
        // redraw HEALPix grid
        if( this.displayHpxGrid) {
            var cornersXYViewMapAllsky = this.getVisibleCells(3);
            var cornersXYViewMapHighres = null;
            if (this.curNorder>=3) {
                if (this.curNorder==3) {
                    cornersXYViewMapHighres = cornersXYViewMapAllsky;
                }
                else {
                    cornersXYViewMapHighres = this.getVisibleCells(this.curNorder);
                }
            }
            if (cornersXYViewMapHighres && this.curNorder>3) {
                this.healpixGrid.redraw(imageCtx, cornersXYViewMapHighres, this.fov, this.curNorder);
            }
            else {
                this.healpixGrid.redraw(imageCtx, cornersXYViewMapAllsky, this.fov, 3);
            }
        }
        
        // redraw coordinates grid
        if (this.showGrid) {
            if (this.cooGrid==null) {
                this.cooGrid = new CooGrid();
            }
            
            this.cooGrid.redraw(imageCtx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor, this.fov);
        }
         


        
        ////// 2. Draw catalogues////////
        var catalogCtx = this.catalogCtx;

        var catalogCanvasCleared = false;
        if (this.mustClearCatalog) {
            catalogCtx.clearRect(0, 0, this.width, this.height);
            catalogCanvasCleared = true;
            this.mustClearCatalog = false;
        }
        if (this.catalogs && this.catalogs.length>0 && this.displayCatalog && (! this.dragging  || View.DRAW_SOURCES_WHILE_DRAGGING)) {
              // TODO : do not clear every time
            //// clear canvas ////
            if (! catalogCanvasCleared) {
                catalogCtx.clearRect(0, 0, this.width, this.height);
                catalogCanvasCleared = true;
            }
            for (var i=0; i<this.catalogs.length; i++) {
                var cat = this.catalogs[i];
                cat.draw(catalogCtx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor);
            }
        }
        // draw popup catalog
        if (this.catalogForPopup.isShowing && this.catalogForPopup.sources.length>0) {
            if (! catalogCanvasCleared) {
                catalogCtx.clearRect(0, 0, this.width, this.height);
                catalogCanvasCleared = true;
            }
            this.catalogForPopup.draw(catalogCtx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor);
        }

        ////// 3. Draw overlays////////
        var overlayCtx = this.catalogCtx;
        if (this.overlays && this.overlays.length>0 && (! this.dragging  || View.DRAW_SOURCES_WHILE_DRAGGING)) {
            if (! catalogCanvasCleared) {
                catalogCtx.clearRect(0, 0, this.width, this.height);
                catalogCanvasCleared = true;
            }
            for (var i=0; i<this.overlays.length; i++) {
                this.overlays[i].draw(overlayCtx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor);
            }
        }
        

        // draw MOCs
        var mocCtx = this.catalogCtx;
        if (this.mocs && this.mocs.length>0 && (! this.dragging  || View.DRAW_MOCS_WHILE_DRAGGING)) {
            if (! catalogCanvasCleared) {
                catalogCtx.clearRect(0, 0, this.width, this.height);
                catalogCanvasCleared = true;
            }
            for (var i=0; i<this.mocs.length; i++) {
                this.mocs[i].draw(mocCtx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor, this.fov);
            }
        }


        if (this.mode==View.SELECT) {
            mustRedrawReticle = true;
        }
        ////// 4. Draw reticle ///////
        // TODO: reticle should be placed in a static DIV, no need to waste a canvas
        var reticleCtx = this.reticleCtx;
        if (this.mustRedrawReticle || this.mode==View.SELECT) {
            reticleCtx.clearRect(0, 0, this.width, this.height);
        }
        if (this.displayReticle) {
            
            if (! this.reticleCache) {
                // build reticle image
                var c = document.createElement('canvas');
                var s = this.options.reticleSize;
                c.width = s;
                c.height = s;
                var ctx = c.getContext('2d');
                ctx.lineWidth = 2;
                ctx.strokeStyle = this.options.reticleColor;
                ctx.beginPath();
                ctx.moveTo(s/2, s/2+(s/2-1));
                ctx.lineTo(s/2, s/2+2);
                ctx.moveTo(s/2, s/2-(s/2-1));
                ctx.lineTo(s/2, s/2-2);
                
                ctx.moveTo(s/2+(s/2-1), s/2);
                ctx.lineTo(s/2+2,  s/2);
                ctx.moveTo(s/2-(s/2-1), s/2);
                ctx.lineTo(s/2-2,  s/2);
                
                ctx.stroke();
                
                this.reticleCache = c;
            }
                
            reticleCtx.drawImage(this.reticleCache, this.width/2 - this.reticleCache.width/2, this.height/2 - this.reticleCache.height/2);
            
            
            this.mustRedrawReticle = false;
        }

        ////// 5. Draw all-sky ring /////
        if (this.projectionMethod==ProjectionEnum.SIN && this.fov>=60 && this.aladin.options['showAllskyRing'] === true) {
                    imageCtx.strokeStyle = this.aladin.options['allskyRingColor'];
                    var ringWidth = this.aladin.options['allskyRingWidth'];
                    imageCtx.lineWidth = ringWidth;
                    imageCtx.beginPath();
                    var maxCxCy = this.cx>this.cy ? this.cx : this.cy;
                    imageCtx.arc(this.cx, this.cy, (maxCxCy-(ringWidth/2.0)+1) * this.zoomFactor, 0, 2*Math.PI, true);
                    imageCtx.stroke();
        }

        
        // draw selection box
        if (this.mode==View.SELECT && this.dragging) {
            reticleCtx.fillStyle = "rgba(100, 240, 110, 0.25)";
            var w = this.dragx - this.selectStartCoo.x;
            var h =  this.dragy - this.selectStartCoo.y;
            
            reticleCtx.fillRect(this.selectStartCoo.x, this.selectStartCoo.y, w, h);
        }
        
        
         // TODO : is this the right way?
         if (saveNeedRedraw==this.needRedraw) {
             this.needRedraw = false;
         }


        // objects lookup
        if (!this.dragging) {
            this.updateObjectsLookup();
        } 

        // execute 'positionChanged' and 'zoomChanged' callbacks
        this.executeCallbacksThrottled();

    };

    View.prototype.forceRedraw = function() {
        this.flagForceRedraw = true;
    };
    
    View.prototype.refreshProgressiveCats = function() {
        if (! this.catalogs) {
            return;
        }
        for (var i=0; i<this.catalogs.length; i++) {
            if (this.catalogs[i].type=='progressivecat') {
                this.catalogs[i].loadNeededTiles();
            }
        }
    };

    View.prototype.getVisiblePixList = function(norder, frameSurvey) {
        var nside = Math.pow(2, norder);

        var pixList;
        var npix = HealpixIndex.nside2Npix(nside);
        if (this.fov>80) {
            pixList = [];
            for (var ipix=0; ipix<npix; ipix++) {
                pixList.push(ipix);
            }
        }
        else {
            var hpxIdx = new HealpixIndex(nside);
            hpxIdx.init();
            var spatialVector = new SpatialVector();
            // if frame != frame image survey, we need to convert to survey frame system
            var xy = AladinUtils.viewToXy(this.cx, this.cy, this.width, this.height, this.largestDim, this.zoomFactor);
            var radec = this.projection.unproject(xy.x, xy.y);
            var lonlat = [];
            if (frameSurvey && frameSurvey.system != this.cooFrame.system) {
                if (frameSurvey.system==CooFrameEnum.SYSTEMS.J2000) {
                    lonlat = CooConversion.GalacticToJ2000([radec.ra, radec.dec]);
                }
                else if (frameSurvey.system==CooFrameEnum.SYSTEMS.GAL) {
                    lonlat = CooConversion.J2000ToGalactic([radec.ra, radec.dec]);
                }
            }
            else {
                lonlat = [radec.ra, radec.dec];
            }
            if (this.imageSurvey && this.imageSurvey.longitudeReversed===true) {
                spatialVector.set(lonlat[0], lonlat[1]);
            }
            else {
                spatialVector.set(lonlat[0], lonlat[1]);
            }
            var radius = this.fov*0.5*this.ratio;
            // we need to extend the radius
            if (this.fov>60) {
                radius *= 1.6;
            }
            else if (this.fov>12) {
                radius *=1.45;
            }
            else {
                radius *= 1.1;
            }



            pixList = hpxIdx.queryDisc(spatialVector, radius*Math.PI/180.0, true, true);
            // add central pixel at index 0
            var polar = Utils.radecToPolar(lonlat[0], lonlat[1]);
            ipixCenter = hpxIdx.ang2pix_nest(polar.theta, polar.phi);
            pixList.unshift(ipixCenter);

        }

        return pixList;
    };
    
    // TODO: optimize this method !!
    View.prototype.getVisibleCells = function(norder, frameSurvey) {
        if (! frameSurvey && this.imageSurvey) {
            frameSurvey = this.imageSurvey.cooFrame;
        }
        var cells = []; // array to be returned
        var cornersXY = [];
        var spVec = new SpatialVector();
        var nside = Math.pow(2, norder); // TODO : to be modified
        var npix = HealpixIndex.nside2Npix(nside);
        var ipixCenter = null;
        
        // build list of pixels
        // TODO: pixList can be obtained from getVisiblePixList
        var pixList;
        if (this.fov>80) {
            pixList = [];
            for (var ipix=0; ipix<npix; ipix++) {
                pixList.push(ipix);
            }
        }
        else {
            var hpxIdx = new HealpixIndex(nside);
            hpxIdx.init();
            var spatialVector = new SpatialVector();
            // if frame != frame image survey, we need to convert to survey frame system
            var xy = AladinUtils.viewToXy(this.cx, this.cy, this.width, this.height, this.largestDim, this.zoomFactor);
            var radec = this.projection.unproject(xy.x, xy.y);
            var lonlat = [];
            if (frameSurvey && frameSurvey.system != this.cooFrame.system) {
                if (frameSurvey.system==CooFrameEnum.SYSTEMS.J2000) {
                    lonlat = CooConversion.GalacticToJ2000([radec.ra, radec.dec]); 
                }
                else if (frameSurvey.system==CooFrameEnum.SYSTEMS.GAL) {
                    lonlat = CooConversion.J2000ToGalactic([radec.ra, radec.dec]);
                }
            }
            else {
                lonlat = [radec.ra, radec.dec];
            }
            if (this.imageSurvey && this.imageSurvey.longitudeReversed===true) {
                spatialVector.set(lonlat[0], lonlat[1]);
            }
            else {
                spatialVector.set(lonlat[0], lonlat[1]);
            }
            var radius = this.fov*0.5*this.ratio;
            // we need to extend the radius
            if (this.fov>60) {
                radius *= 1.6;
            }
            else if (this.fov>12) {
                radius *=1.45;
            }
            else {
                radius *= 1.1;
            }
            
            
                
            pixList = hpxIdx.queryDisc(spatialVector, radius*Math.PI/180.0, true, true);
            // add central pixel at index 0
            var polar = Utils.radecToPolar(lonlat[0], lonlat[1]);
            ipixCenter = hpxIdx.ang2pix_nest(polar.theta, polar.phi);
            pixList.unshift(ipixCenter);
        }
        
        
        var ipix;
        var lon, lat;
        for (var ipixIdx=0, len=pixList.length; ipixIdx<len; ipixIdx++) {
            ipix = pixList[ipixIdx];
            if (ipix==ipixCenter && ipixIdx>0) { 
                continue;
            }
            var cornersXYView = [];
            corners = HealpixCache.corners_nest(ipix, nside);

            for (var k=0; k<4; k++) {
                spVec.setXYZ(corners[k].x, corners[k].y, corners[k].z);
                
                // need for frame transformation ?
                if (frameSurvey && frameSurvey.system != this.cooFrame.system) {
                    if (frameSurvey.system == CooFrameEnum.SYSTEMS.J2000) {
                        var radec = CooConversion.J2000ToGalactic([spVec.ra(), spVec.dec()]); 
                        lon = radec[0];
                        lat = radec[1];
                    }
                    else if (frameSurvey.system == CooFrameEnum.SYSTEMS.GAL) {
                        var radec = CooConversion.GalacticToJ2000([spVec.ra(), spVec.dec()]); 
                        lon = radec[0];
                        lat = radec[1];
                    }
                }
                else {
                    lon = spVec.ra();
                    lat = spVec.dec();
                }
                
                cornersXY[k] = this.projection.project(lon, lat);
            }


            if (cornersXY[0] == null ||  cornersXY[1] == null  ||  cornersXY[2] == null ||  cornersXY[3] == null ) {
                continue;
            }



            for (var k=0; k<4; k++) {
                cornersXYView[k] = AladinUtils.xyToView(cornersXY[k].X, cornersXY[k].Y, this.width, this.height, this.largestDim, this.zoomFactor);
            }

            var indulge = 10;
            // detect pixels outside view. Could be improved !
            // we minimize here the number of cells returned
            if( cornersXYView[0].vx<0 && cornersXYView[1].vx<0 && cornersXYView[2].vx<0 &&cornersXYView[3].vx<0) {
                continue;
            }
            if( cornersXYView[0].vy<0 && cornersXYView[1].vy<0 && cornersXYView[2].vy<0 &&cornersXYView[3].vy<0) {
                continue;
            }
            if( cornersXYView[0].vx>=this.width && cornersXYView[1].vx>=this.width && cornersXYView[2].vx>=this.width &&cornersXYView[3].vx>=this.width) {
                continue;
            }
            if( cornersXYView[0].vy>=this.height && cornersXYView[1].vy>=this.height && cornersXYView[2].vy>=this.height &&cornersXYView[3].vy>=this.height) {
                continue;
            }


            // check if pixel is visible
//            if (this.fov<160) { // don't bother checking if fov is large enough
//                if ( ! AladinUtils.isHpxPixVisible(cornersXYView, this.width, this.height) ) {
//                    continue;
//                }
//            }
            // check if we have a pixel at the edge of the view in AITOFF --> TO BE MODIFIED
            if (this.projection.PROJECTION==ProjectionEnum.AITOFF) {
                var xdiff = cornersXYView[0].vx-cornersXYView[2].vx;
                var ydiff = cornersXYView[0].vy-cornersXYView[2].vy;
                var distDiag = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
                if (distDiag>this.largestDim/5) {
                    continue;
                }
                xdiff = cornersXYView[1].vx-cornersXYView[3].vx;
                ydiff = cornersXYView[1].vy-cornersXYView[3].vy;
                distDiag = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
                if (distDiag>this.largestDim/5) {
                    continue;
                }
            }
            
            cornersXYView.ipix = ipix;
            cells.push(cornersXYView);
        }
        
        return cells;
    };
    
    
    
    // get position in view for a given HEALPix cell
    View.prototype.getPositionsInView = function(ipix, norder) {
        var cornersXY = [];
        var lon, lat;
        var spVec = new SpatialVector();
        var nside = Math.pow(2, norder); // TODO : to be modified
        
        
        var cornersXYView = [];  // will be returned
        var corners = HealpixCache.corners_nest(ipix, nside);

        for (var k=0; k<4; k++) {
            spVec.setXYZ(corners[k].x, corners[k].y, corners[k].z);
                
            // need for frame transformation ?
            if (this.imageSurvey && this.imageSurvey.cooFrame.system != this.cooFrame.system) {
                if (this.imageSurvey.cooFrame.system == CooFrameEnum.SYSTEMS.J2000) {
                    var radec = CooConversion.J2000ToGalactic([spVec.ra(), spVec.dec()]); 
                    lon = radec[0];
                    lat = radec[1];
                }
                else if (this.imageSurvey.cooFrame.system == CooFrameEnum.SYSTEMS.GAL) {
                    var radec = CooConversion.GalacticToJ2000([spVec.ra(), spVec.dec()]); 
                    lon = radec[0];
                    lat = radec[1];
                }
            }
            else {
                lon = spVec.ra();
                lat = spVec.dec();
            }
                
            cornersXY[k] = this.projection.project(lon, lat);
        }
        
        if (cornersXY[0] == null ||  cornersXY[1] == null  ||  cornersXY[2] == null ||  cornersXY[3] == null ) {
            return null;
        }


        for (var k=0; k<4; k++) {
            cornersXYView[k] = AladinUtils.xyToView(cornersXY[k].X, cornersXY[k].Y, this.width, this.height, this.largestDim, this.zoomFactor);
        }

        return cornersXYView;
    };
    
    
    View.prototype.computeZoomFactor = function(level) {
        if (level>0) {
            return AladinUtils.getZoomFactorForAngle(180/Math.pow(1.15, level), this.projectionMethod);
        }
        else {
            return 1 + 0.1*level;
        }
    };
    
    View.prototype.setZoom = function(fovDegrees) {
        if (fovDegrees<0 || fovDegrees>180) {
            return;
        }
        var zoomLevel = Math.log(180/fovDegrees)/Math.log(1.15);
        this.setZoomLevel(zoomLevel);
    };
    
    View.prototype.setShowGrid = function(showGrid) {
        this.showGrid = showGrid;
        this.requestRedraw();
    };

    
    View.prototype.setZoomLevel = function(level) {
        if (this.minFOV || this.maxFOV) {
            var newFov = doComputeFov(this, this.computeZoomFactor(Math.max(-2, level)));
            if (this.maxFOV && newFov>this.maxFOV  ||  this.minFOV && newFov<this.minFOV)  {
                return;
            }
        }
        
        if (this.projectionMethod==ProjectionEnum.SIN) {
            if (this.aladin.options.allowFullZoomout === true) {
                // special case for Andreas Wicenec until I fix the problem
                if (this.width/this.height>2) {
                    this.zoomLevel = Math.max(-7, level); // TODO : canvas freezes in firefox when max level is small
                }
                else if (this.width/this.height<0.5) {
                    this.zoomLevel = Math.max(-2, level); // TODO : canvas freezes in firefox when max level is small
                }
                else {
                    this.zoomLevel = Math.max(-6, level); // TODO : canvas freezes in firefox when max level is small
                }
            }
            else {
                this.zoomLevel = Math.max(-2, level); // TODO : canvas freezes in firefox when max level is small
            }
        }
        else {
            this.zoomLevel = Math.max(-7, level); // TODO : canvas freezes in firefox when max level is small
        }
        
        
        this.zoomFactor = this.computeZoomFactor(this.zoomLevel);
        
        var oldFov = this.fov;
        this.fov = computeFov(this);


        // TODO: event/listener should be better
        updateFovDiv(this);
        
        this.computeNorder();
        
        this.forceRedraw();
        this.requestRedraw();
        
        // on avertit les catalogues progressifs
        if (! this.debounceProgCatOnZoom) {
            var self = this;
            this.debounceProgCatOnZoom = Utils.debounce(function() {self.refreshProgressiveCats();}, 300);
        }
        this.debounceProgCatOnZoom();
        
    };
    
    /**
     * compute and set the norder corresponding to the current view resolution
     */
    View.prototype.computeNorder = function() {
        var resolution = this.fov / this.largestDim; // in degree/pixel
        var tileSize = 512; // TODO : read info from HpxImageSurvey.tileSize
        var nside = HealpixIndex.calculateNSide(3600*tileSize*resolution); // 512 = size of a "tile" image
        var norder = Math.log(nside)/Math.log(2);
        norder = Math.max(norder, 1);
        this.realNorder = norder;

            
        // here, we force norder to 3 (otherwise, the display is "blurry" for too long when zooming in)
        if (this.fov<=50 && norder<=2) {
            norder = 3;
        }
           

        // that happens if we do not wish to display tiles coming from Allsky.[jpg|png]
        if (this.imageSurvey && norder<=2 && this.imageSurvey.minOrder>2) {
            norder = this.imageSurvey.minOrder;
        }

        var overlayNorder  = norder;
        if (this.imageSurvey && norder>this.imageSurvey.maxOrder) {
            norder = this.imageSurvey.maxOrder;
        }
        if (this.overlayImageSurvey && overlayNorder>this.overlayImageSurvey.maxOrder) {
            overlayNorder = this.overlayImageSurvey.maxOrder;
        }
        // should never happen, as calculateNSide will return something <=HealpixIndex.ORDER_MAX
        if (norder>HealpixIndex.ORDER_MAX) {
            norder = HealpixIndex.ORDER_MAX;
        }
        if (overlayNorder>HealpixIndex.ORDER_MAX) {
            overlayNorder = HealpixIndex.ORDER_MAX;
        }
            
        this.curNorder = norder;
        this.curOverlayNorder = overlayNorder;
    };
    
    View.prototype.untaintCanvases = function() {
        this.createCanvases();
        createListeners(this);
        this.fixLayoutDimensions();
    };
    
    View.prototype.setOverlayImageSurvey = function(overlayImageSurvey, callback) {
        if (! overlayImageSurvey) {
            this.overlayImageSurvey = null;
            this.requestRedraw();
            return;
        }
        
        // reset canvas to "untaint" canvas if needed
        // we test if the previous base image layer was using CORS or not
        if ($.support.cors && this.overlayImageSurvey && ! this.overlayImageSurvey.useCors) {
            this.untaintCanvases();
        }
        
        var newOverlayImageSurvey;
        if (typeof overlayImageSurvey == "string") {
            newOverlayImageSurvey = HpxImageSurvey.getSurveyFromId(overlayImageSurvey);
            if ( ! newOverlayImageSurvey) {
                newOverlayImageSurvey = HpxImageSurvey.getSurveyFromId(HpxImageSurvey.DEFAULT_SURVEY_ID);
            }
        }
        else {
            newOverlayImageSurvey = overlayImageSurvey;
        }
        newOverlayImageSurvey.isReady = false;
        this.overlayImageSurvey = newOverlayImageSurvey;
        
        var self = this;
        newOverlayImageSurvey.init(this, function() {
            //self.imageSurvey = newImageSurvey;
            self.computeNorder();
            newOverlayImageSurvey.isReady = true;
            self.requestRedraw();
            self.updateObjectsLookup();
            
            if (callback) {
                callback();
            }
        });
    };

    View.prototype.setUnknownSurveyIfNeeded = function() {
        if (unknownSurveyId) {
            this.setImageSurvey(unknownSurveyId);
            unknownSurveyId = undefined;
        }
    }
    
    var unknownSurveyId = undefined;
    // @param imageSurvey : HpxImageSurvey object or image survey identifier
    View.prototype.setImageSurvey = function(imageSurvey, callback) {
        if (! imageSurvey) {
            return;
        }
        
        // reset canvas to "untaint" canvas if needed
        // we test if the previous base image layer was using CORS or not
        if ($.support.cors && this.imageSurvey && ! this.imageSurvey.useCors) {
            this.untaintCanvases();
        }
        
        var newImageSurvey;
        if (typeof imageSurvey == "string") {
            newImageSurvey = HpxImageSurvey.getSurveyFromId(imageSurvey);
            if ( ! newImageSurvey) {
                newImageSurvey = HpxImageSurvey.getSurveyFromId(HpxImageSurvey.DEFAULT_SURVEY_ID);
                unknownSurveyId = imageSurvey;
            }
        }
        else {
            newImageSurvey = imageSurvey;
        }
 
        // TODO: this is a temporary fix for issue https://github.com/cds-astro/aladin-lite/issues/16
        // ideally, instead of creating a new TileBuffer object,
        //  one should remove from TileBuffer all Tile objects still in the download queue qui sont encore dans la download queue
        this.tileBuffer = new TileBuffer();

        this.downloader.emptyQueue();
        
        newImageSurvey.isReady = false;
        this.imageSurvey = newImageSurvey;

        this.projection.reverseLongitude(this.imageSurvey.longitudeReversed); 
        
        var self = this;
        newImageSurvey.init(this, function() {
            //self.imageSurvey = newImageSurvey;
            self.computeNorder();
            newImageSurvey.isReady = true;
            self.requestRedraw();
            self.updateObjectsLookup();
            
            if (callback) {
                callback();
            }
        });
    };
    
    View.prototype.requestRedraw = function() {
        this.needRedraw = true;
    };
    
    View.prototype.changeProjection = function(projectionMethod) {
        this.projectionMethod = projectionMethod;
        this.requestRedraw();
    };

    View.prototype.changeFrame = function(cooFrame) {
        var oldCooFrame = this.cooFrame;
        this.cooFrame = cooFrame;
        // recompute viewCenter
        if (this.cooFrame.system == CooFrameEnum.SYSTEMS.GAL && this.cooFrame.system != oldCooFrame.system) {
            var lb = CooConversion.J2000ToGalactic([this.viewCenter.lon, this.viewCenter.lat]);
            this.viewCenter.lon = lb[0];
            this.viewCenter.lat = lb[1]; 
        }
        else if (this.cooFrame.system == CooFrameEnum.SYSTEMS.J2000 && this.cooFrame.system != oldCooFrame.system) {
            var radec = CooConversion.GalacticToJ2000([this.viewCenter.lon, this.viewCenter.lat]);
            this.viewCenter.lon = radec[0];
            this.viewCenter.lat = radec[1]; 
        }

        this.location.update(this.viewCenter.lon, this.viewCenter.lat, this.cooFrame, true);

        this.requestRedraw();
    };

    View.prototype.showHealpixGrid = function(show) {
        this.displayHpxGrid = show;
        this.requestRedraw();
    };
    
    View.prototype.showSurvey = function(show) {
        this.displaySurvey = show;

        this.requestRedraw();
    };
    
    View.prototype.showCatalog = function(show) {
        this.displayCatalog = show;

        if (!this.displayCatalog) {
            this.mustClearCatalog = true;
        }
        this.requestRedraw();
    };
    
    View.prototype.showReticle = function(show) {
        this.displayReticle = show;

        this.mustRedrawReticle = true;
        this.requestRedraw();
    };

    View.prototype.pointTo = function(ra, dec) {
        ra = parseFloat(ra);
        dec = parseFloat(dec);
        if (isNaN(ra) || isNaN(dec)) {
            return;
        }
        if (this.cooFrame.system==CooFrameEnum.SYSTEMS.J2000) {
            this.viewCenter.lon = ra;
            this.viewCenter.lat = dec;
        }
        else if (this.cooFrame.system==CooFrameEnum.SYSTEMS.GAL) {
            var lb = CooConversion.J2000ToGalactic([ra, dec]);
            this.viewCenter.lon = lb[0];
            this.viewCenter.lat = lb[1];
        }

        this.location.update(this.viewCenter.lon, this.viewCenter.lat, this.cooFrame, true);

        this.forceRedraw();
        this.requestRedraw();
        var self = this;
        setTimeout(function() {self.refreshProgressiveCats();}, 1000);

    };
    View.prototype.makeUniqLayerName = function(name) {
        if (! this.layerNameExists(name)) {
            return name;
        }
        for (var k=1;;++k) {
            var newName = name + '_' + k;
            if ( ! this.layerNameExists(newName)) {
                return newName;
            }
        }
    };
    View.prototype.layerNameExists = function(name) {
        var c = this.allOverlayLayers;
        for (var k=0; k<c.length; k++) {
            if (name==c[k].name) {
                return true;
            }
        }
        return false;
    };

    View.prototype.removeLayers = function() {
        this.catalogs = [];
        this.overlays = [];
        this.mocs = [];
        this.allOverlayLayers = [];
        this.requestRedraw();
    };

    View.prototype.addCatalog = function(catalog) {
        catalog.name = this.makeUniqLayerName(catalog.name);
        this.allOverlayLayers.push(catalog);
        this.catalogs.push(catalog);
        if (catalog.type=='catalog') {
            catalog.setView(this);
        }
        else if (catalog.type=='progressivecat') {
            catalog.init(this);
        }
    };
    View.prototype.addOverlay = function(overlay) {
        overlay.name = this.makeUniqLayerName(overlay.name);
        this.overlays.push(overlay);
        this.allOverlayLayers.push(overlay);
        overlay.setView(this);
    };
    
    View.prototype.addMOC = function(moc) {
        moc.name = this.makeUniqLayerName(moc.name);
        this.mocs.push(moc);
        this.allOverlayLayers.push(moc);
        moc.setView(this);
    };
    
    View.prototype.getObjectsInBBox = function(x, y, w, h) {
        if (w<0) {
            x = x+w;
            w = -w;
        }
        if (h<0) {
            y = y+h;
            h = -h;
        }
        var objList = [];
        var cat, sources, s;
        if (this.catalogs) {
            for (var k=0; k<this.catalogs.length; k++) {
                cat = this.catalogs[k];
                if (!cat.isShowing) {
                    continue;
                }
                sources = cat.getSources();
                for (var l=0; l<sources.length; l++) {
                    s = sources[l];
                    if (!s.isShowing || !s.x || !s.y) {
                        continue;
                    }
                    if (s.x>=x && s.x<=x+w && s.y>=y && s.y<=y+h) {
                        objList.push(s);
                    }
                }
            }
        }
        return objList;
        
    };

    // update objLookup, lookup table 
    View.prototype.updateObjectsLookup = function() {
        this.objLookup = [];

        var cat, sources, s, x, y;
        if (this.catalogs) {
            for (var k=0; k<this.catalogs.length; k++) {
                cat = this.catalogs[k];
                if (!cat.isShowing) {
                    continue;
                }
                sources = cat.getSources();
                for (var l=0; l<sources.length; l++) {
                    s = sources[l];
                    if (!s.isShowing || !s.x || !s.y) {
                        continue;
                    }

                    x = s.x;
                    y = s.y;

                    if (typeof this.objLookup[x] === 'undefined') {
                        this.objLookup[x] = [];
                    }
                    if (typeof this.objLookup[x][y] === 'undefined') {
                        this.objLookup[x][y] = [];
                    }
                    this.objLookup[x][y].push(s);
                }       
            }           
        }     
    };

    // return closest object within a radius of maxRadius pixels. maxRadius is an integer
    View.prototype.closestObjects = function(x, y, maxRadius) {

        // footprint selection code adapted from Fabrizio Giordano dev. from Serco for ESA/ESDC
        var overlay;
        var canvas=this.catalogCanvas;
        var ctx = canvas.getContext("2d");
        // this makes footprint selection easier as the catch-zone is larger
        ctx.lineWidth = 6;

        if (this.overlays) {
            for (var k=0; k<this.overlays.length; k++) {
                overlay = this.overlays[k];
                for (var i=0; i<overlay.overlays.length;i++){

                    // test polygons first
                    var footprint = overlay.overlays[i];
                    var pointXY = [];
                    for(var j=0;j<footprint.polygons.length;j++){

                        var xy = AladinUtils.radecToViewXy(footprint.polygons[j][0], footprint.polygons[j][1],
                                this.projection,
                                this.cooFrame,
                                this.width, this.height,
                                this.largestDim,
                                this.zoomFactor);
                        if (! xy) {
                            continue;
                        }
                        pointXY.push({
                            x: xy.vx,
                            y: xy.vy
                        });
                    }
                    for(var l=0; l<pointXY.length-1;l++){

                        ctx.beginPath();                        // new segment
                        ctx.moveTo(pointXY[l].x, pointXY[l].y);     // start is current point
                        ctx.lineTo(pointXY[l+1].x, pointXY[l+1].y); // end point is next
                        if (ctx.isPointInStroke(x, y)) {        // x,y is on line?
                            closest = footprint;
                            return [closest];
                        }
                    }
                }

                // test Circles
                for (var i=0; i<overlay.overlay_items.length; i++) {
                    if (overlay.overlay_items[i] instanceof Circle) {
                        overlay.overlay_items[i].draw(ctx, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor, true);

                        if (ctx.isPointInStroke(x, y)) {
                            closest = overlay.overlay_items[i];
                            return [closest];
                        }
                    }
                }
            }
        }






        if (!this.objLookup) {
            return null;
        }
        var closest, dist;
        for (var r=0; r<=maxRadius; r++) {
            closest = dist = null;
            for (var dx=-maxRadius; dx<=maxRadius; dx++) {
                if (! this.objLookup[x+dx]) {
                    continue;
                }
                for (var dy=-maxRadius; dy<=maxRadius; dy++) {
                    if (this.objLookup[x+dx][y+dy]) {
                        var d = dx*dx + dy*dy;
                        if (!closest) {
                            closest = this.objLookup[x+dx][y+dy];
                            dist = d;
                        }
                        else if (d<dist) {
                            dist = d;
                            closest = this.objLookup[x+dx][y+dy];
                        }
                    }
                }
            }
            if (closest) {
                return closest;
            }
        }
        return null;
    };
    
    return View;
})();
// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//


/******************************************************************************
 * Aladin Lite project
 * 
 * File Aladin.js (main class)
 * Facade to expose Aladin Lite methods
 * 
 * Author: Thomas Boch[CDS]
 * 
 *****************************************************************************/

Aladin = (function() {
    
    // Constructor
    var Aladin = function(aladinDiv, requestedOptions) {
        // check that aladinDiv exists, stop immediately otherwise
        if ($(aladinDiv).length==0) {
            console.log('Could not find div ' + aladinDiv + '. Aborting creation of Aladin Lite instance');
            return;
        }


	    var self = this;
	    
	    // if not options was set, try to retrieve them from the query string
	    if (requestedOptions===undefined) {
	        requestedOptions = this.getOptionsFromQueryString();
	    }
	    requestedOptions = requestedOptions || {};
	    
	    
	    // 'fov' option was previsouly called 'zoom'
	    if ('zoom' in requestedOptions) {
	        var fovValue = requestedOptions.zoom;
	        delete requestedOptions.zoom;
	        requestedOptions.fov = fovValue;
	    }
	    // merge with default options
	    var options = {};
	    for (var key in Aladin.DEFAULT_OPTIONS) {
	        if (requestedOptions[key] !== undefined) {
	            options[key] = requestedOptions[key];
	        }
	        else {
	            options[key] = Aladin.DEFAULT_OPTIONS[key];
	        }
	    }
	    for (var key in requestedOptions) {
	        if (Aladin.DEFAULT_OPTIONS[key]===undefined) {
	            options[key] = requestedOptions[key];
	        }
	    }
	    
        this.options = options;

        $("<style type='text/css'> .aladin-reticleColor { color: " + this.options.reticleColor + "; font-weight:bold;} </style>").appendTo(aladinDiv);

	    

		this.aladinDiv = aladinDiv;

        this.reduceDeformations = true;

		// parent div
		$(aladinDiv).addClass("aladin-container");
		
	      
		var cooFrame = CooFrameEnum.fromString(options.cooFrame, CooFrameEnum.J2000);
		// locationDiv is the div where we write the position
		var locationDiv = $('<div class="aladin-location">'
		                    + (options.showFrame ? '<select class="aladin-frameChoice"><option value="' + CooFrameEnum.J2000.label + '" '
		                    + (cooFrame==CooFrameEnum.J2000 ? 'selected="selected"' : '') + '>J2000</option><option value="' + CooFrameEnum.J2000d.label + '" '
		                    + (cooFrame==CooFrameEnum.J2000d ? 'selected="selected"' : '') + '>J2000d</option><option value="' + CooFrameEnum.GAL.label + '" '
		                    + (cooFrame==CooFrameEnum.GAL ? 'selected="selected"' : '') + '>GAL</option></select>' : '')
		                    + '<span class="aladin-location-text"></span></div>')
		                    .appendTo(aladinDiv);
		// div where FoV value is written
		var fovDiv = $('<div class="aladin-fov"></div>').appendTo(aladinDiv);
		
		
		// zoom control
        if (options.showZoomControl) {
	          $('<div class="aladin-zoomControl"><a href="#" class="zoomPlus" title="Zoom in">+</a><a href="#" class="zoomMinus" title="Zoom out">&ndash;</a></div>').appendTo(aladinDiv);
	    }
        
        // maximize control
        if (options.showFullscreenControl) {
            $('<div class="aladin-fullscreenControl aladin-maximize" title="Full screen"></div>')
                .appendTo(aladinDiv);
        }
        this.fullScreenBtn = $(aladinDiv).find('.aladin-fullscreenControl')
        this.fullScreenBtn.click(function() {
            self.toggleFullscreen(self.options.realFullscreen);
        });
        // react to fullscreenchange event to restore initial width/height (if user pressed ESC to go back from full screen)
        $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(e) {
            var fullscreenElt = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (fullscreenElt===null || fullscreenElt===undefined) {
                self.fullScreenBtn.removeClass('aladin-restore');
                self.fullScreenBtn.addClass('aladin-maximize');
                self.fullScreenBtn.attr('title', 'Full screen');
                $(self.aladinDiv).removeClass('aladin-fullscreen');
        
                var fullScreenToggledFn = self.callbacksByEventName['fullScreenToggled'];
                var isInFullscreen = self.fullScreenBtn.hasClass('aladin-restore');
                (typeof fullScreenToggledFn === 'function') && fullScreenToggledFn(isInFullscreen);
            }
        });

        



		// Aladin logo
		$("<div class='aladin-logo-container'><a href='http://aladin.unistra.fr/' title='Powered by Aladin Lite' target='_blank'><div class='aladin-logo'></div></a></div>").appendTo(aladinDiv);
		
		
		// we store the boxes
		this.boxes = [];

        // measurement table
        this.measurementTable = new MeasurementTable(aladinDiv);

		
		
		var location = new Location(locationDiv.find('.aladin-location-text'));
        
		// set different options
		this.view = new View(this, location, fovDiv, cooFrame, options.fov);
		this.view.setShowGrid(options.showCooGrid);

	    // retrieve available surveys
        // TODO: replace call with MocServer
	    $.ajax({
	        url: "//aladin.unistra.fr/java/nph-aladin.pl",
	        data: {"frame": "aladinLiteDic"},
	        method: 'GET',
	        dataType: 'jsonp', // could this be repaced by json ??
	        success: function(data) {
                var map = {};
                for (var k=0; k<data.length; k++) {
                    map[data[k].id] = true;
                }
                // retrieve existing surveys
                for (var k=0; k<HpxImageSurvey.SURVEYS.length; k++) {
                    if (! map[HpxImageSurvey.SURVEYS[k].id]) {
                        data.push(HpxImageSurvey.SURVEYS[k]);
                    }
                }
	            HpxImageSurvey.SURVEYS = data;
                self.view.setUnknownSurveyIfNeeded();
	        },
	        error: function() {
	        }
	    });
		
	      // layers control panel
        // TODO : valeur des checkbox en fonction des options
		// TODO : classe LayerBox
        if (options.showLayersControl) {
            var d = $('<div class="aladin-layersControl-container" title="Manage layers"><div class="aladin-layersControl"></div></div>');
            d.appendTo(aladinDiv);
            
            var layerBox = $('<div class="aladin-box aladin-layerBox aladin-cb-list"></div>');
            layerBox.appendTo(aladinDiv);
            
            this.boxes.push(layerBox);
            
            // we return false so that the default event is not submitted, and to prevent event bubbling
            d.click(function() {self.hideBoxes();self.showLayerBox();return false;});

        }

        
        // goto control panel
        if (options.showGotoControl) {
            var d = $('<div class="aladin-gotoControl-container" title="Go to position"><div class="aladin-gotoControl"></div></div>');
            d.appendTo(aladinDiv);
            
            var gotoBox = 
                $('<div class="aladin-box aladin-gotoBox">' +
                  '<a class="aladin-closeBtn">&times;</a>' +
                  '<div style="clear: both;"></div>' +
                  '<form class="aladin-target-form">Go to: <input type="text" placeholder="Object name/position" /></form></div>');
            gotoBox.appendTo(aladinDiv);
            this.boxes.push(gotoBox);
            
            var input = gotoBox.find('.aladin-target-form input');
            input.on("paste keydown", function() {
                $(this).removeClass('aladin-unknownObject'); // remove red border
            });
            
            // TODO : classe GotoBox
            d.click(function() {
                self.hideBoxes();
                input.val('');
                input.removeClass('aladin-unknownObject');
                gotoBox.show();
                input.focus();
                
                
                return false;
            });
            gotoBox.find('.aladin-closeBtn').click(function() {self.hideBoxes();return false;});
        }
        
        // simbad pointer tool
        if (options.showSimbadPointerControl) {
            var d = $('<div class="aladin-simbadPointerControl-container" title="SIMBAD pointer"><div class="aladin-simbadPointerControl"></div></div>');
            d.appendTo(aladinDiv);

            d.click(function() {
                self.view.setMode(View.TOOL_SIMBAD_POINTER);
            });
        }

        // share control panel
        if (options.showShareControl) {
            var d = $('<div class="aladin-shareControl-container" title="Get link for current view"><div class="aladin-shareControl"></div></div>');
            d.appendTo(aladinDiv);
            
            var shareBox = 
                $('<div class="aladin-box aladin-shareBox">' +
                  '<a class="aladin-closeBtn">&times;</a>' +
                  '<div style="clear: both;"></div>' +
                  'Link to previewer: <span class="info"></span>' +
                  '<input type="text" class="aladin-shareInput" />' +
                  '</div>');
            shareBox.appendTo(aladinDiv);
            this.boxes.push(shareBox);
            
            
            // TODO : classe GotoBox, GenericBox
            d.click(function() {
                self.hideBoxes();
                shareBox.show();
                var url = self.getShareURL();
                shareBox.find('.aladin-shareInput').val(url).select();
                document.execCommand('copy');
                
                return false;
            });
            shareBox.find('.aladin-closeBtn').click(function() {self.hideBoxes();return false;});
        }
		
		
        this.gotoObject(options.target);

        if (options.log) {
            var params = requestedOptions;
            params['version'] = Aladin.VERSION;
            Logger.log("startup", params);
        }
        
		this.showReticle(options.showReticle);
		
		if (options.catalogUrls) {
		    for (var k=0, len=options.catalogUrls.length; k<len; k++) {
		        this.createCatalogFromVOTable(options.catalogUrls[k]);
		    }
		}
		
		this.setImageSurvey(options.survey);
		this.view.showCatalog(options.showCatalog);
		
	    
    	var aladin = this;
    	$(aladinDiv).find('.aladin-frameChoice').change(function() {
    		aladin.setFrame($(this).val());
    	});
    	$('#projectionChoice').change(function() {
    		aladin.setProjection($(this).val());
    	});
        

        $(aladinDiv).find('.aladin-target-form').submit(function() {
            aladin.gotoObject($(this).find('input').val(), function() {
                $(aladinDiv).find('.aladin-target-form input').addClass('aladin-unknownObject');
            });
            return false;
        });
        
        var zoomPlus = $(aladinDiv).find('.zoomPlus');
        zoomPlus.click(function() {
        	aladin.increaseZoom();
        	return false;
        });
        zoomPlus.bind('mousedown', function(e) {
            e.preventDefault(); // to prevent text selection
        });
        
        var zoomMinus = $(aladinDiv).find('.zoomMinus');
        zoomMinus.click(function() {
            aladin.decreaseZoom();
            return false;
        });
        zoomMinus.bind('mousedown', function(e) {
            e.preventDefault(); // to prevent text selection
        });
        
        // go to full screen ?
        if (options.fullScreen) {
            window.setTimeout(function() {self.toggleFullscreen(self.options.realFullscreen);}, 1000);
        }


        this.callbacksByEventName = {}; // we store the callback functions (on 'zoomChanged', 'positionChanged', ...) here
	};
	
    /**** CONSTANTS ****/
    Aladin.VERSION = "2019-11-22"; // will be filled by the build.sh script
    
    Aladin.JSONP_PROXY = "https://alasky.unistra.fr/cgi/JSONProxy";
    //Aladin.JSONP_PROXY = "https://alaskybis.unistra.fr/cgi/JSONProxy";


    
    Aladin.DEFAULT_OPTIONS = {
        target:                   "0 +0",
        cooFrame:                 "J2000",
        survey:                   "P/DSS2/color",
        fov:                      60,
        showReticle:              true,
        showZoomControl:          true,
        showFullscreenControl:    true,
        showLayersControl:        true,
        showGotoControl:          true,
        showSimbadPointerControl: false,
        showShareControl:         false,
        showCatalog:              true, // TODO: still used ??
        showFrame:                true,
        showCooGrid:              false,
        fullScreen:               false,
        reticleColor:             "rgb(178, 50, 178)",
        reticleSize:              22,
        log:                      true,
        allowFullZoomout:         false,
        realFullscreen:           false,
        showAllskyRing:           false,
        allskyRingColor:          '#c8c8ff',
        allskyRingWidth:          8,
        pixelateCanvas:           true
    };

   
    // realFullscreen: AL div expands not only to the size of its parent, but takes the whole available screen estate 
    Aladin.prototype.toggleFullscreen = function(realFullscreen) {
        realFullscreen = Boolean(realFullscreen);

        this.fullScreenBtn.toggleClass('aladin-maximize aladin-restore');
        var isInFullscreen = this.fullScreenBtn.hasClass('aladin-restore');
        this.fullScreenBtn.attr('title', isInFullscreen ? 'Restore original size' : 'Full screen');
        $(this.aladinDiv).toggleClass('aladin-fullscreen');

        if (realFullscreen) {
            // go to "real" full screen mode
            if (isInFullscreen) {
                var d = this.aladinDiv;

                if (d.requestFullscreen) {
                    d.requestFullscreen();
                }
                else if (d.webkitRequestFullscreen) {
                    d.webkitRequestFullscreen();
                }
                else if (d.mozRequestFullScreen) { // notice the difference in capitalization for Mozilla functions ...
                    d.mozRequestFullScreen();
                }
                else if (d.msRequestFullscreen) {
                    d.msRequestFullscreen();
                }
            }
            // exit from "real" full screen mode
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
        
        this.view.fixLayoutDimensions();

        // force call to zoomChanged callback
        var fovChangedFn = this.callbacksByEventName['zoomChanged'];
        (typeof fovChangedFn === 'function') && fovChangedFn(this.view.fov);

        var fullScreenToggledFn = this.callbacksByEventName['fullScreenToggled'];
        (typeof fullScreenToggledFn === 'function') && fullScreenToggledFn(isInFullscreen);
    };
    
    Aladin.prototype.updateSurveysDropdownList = function(surveys) {
        surveys = surveys.sort(function(a, b) {
            if (! a.order) {
                return a.id > b.id;
            }
            return a.order && a.order > b.order ? 1 : -1;
        });
        var select = $(this.aladinDiv).find('.aladin-surveySelection');
        select.empty();
        for (var i=0; i<surveys.length; i++) {
            var isCurSurvey = this.view.imageSurvey.id==surveys[i].id;
            select.append($("<option />").attr("selected", isCurSurvey).val(surveys[i].id).text(surveys[i].name));
        };
    };
    
    Aladin.prototype.getOptionsFromQueryString = function() {
        var options = {};
        var requestedTarget = $.urlParam('target');
        if (requestedTarget) {
            options.target = requestedTarget;
        }
        var requestedFrame = $.urlParam('frame');
        if (requestedFrame && CooFrameEnum[requestedFrame] ) {
            options.frame = requestedFrame;
        }
        var requestedSurveyId = $.urlParam('survey');
        if (requestedSurveyId && HpxImageSurvey.getSurveyInfoFromId(requestedSurveyId)) {
            options.survey = requestedSurveyId;
        }
        var requestedZoom = $.urlParam('zoom');
        if (requestedZoom && requestedZoom>0 && requestedZoom<180) {
            options.zoom = requestedZoom;
        }
        
        var requestedShowreticle = $.urlParam('showReticle');
        if (requestedShowreticle) {
            options.showReticle = requestedShowreticle.toLowerCase()=='true';
        }
        
        var requestedCooFrame =  $.urlParam('cooFrame');
        if (requestedCooFrame) {
            options.cooFrame = requestedCooFrame;
        }
        
        var requestedFullscreen =  $.urlParam('fullScreen');
        if (requestedFullscreen !== undefined) {
            options.fullScreen = requestedFullscreen;
        }
        
        return options;
    };
	
    // TODO: rename to setFoV
    //@oldAPI
	Aladin.prototype.setZoom = function(fovDegrees) {
		this.view.setZoom(fovDegrees);
	};

	// @API
	Aladin.prototype.setFoV = Aladin.prototype.setFov = function(fovDegrees) {
		this.view.setZoom(fovDegrees);
	};

    // @API
    // (experimental) try to adjust the FoV to the given object name. Does nothing if object is not known from Simbad
	Aladin.prototype.adjustFovForObject = function(objectName) {
        var self = this;
		this.getFovForObject(objectName, function(fovDegrees) {
            self.setFoV(fovDegrees);
        });
	};

    
	Aladin.prototype.getFovForObject = function(objectName, callback) {
        var query = "SELECT galdim_majaxis, V FROM basic JOIN ident ON oid=ident.oidref JOIN allfluxes ON oid=allfluxes.oidref WHERE id='" + objectName + "'";
        var url = '//simbad.u-strasbg.fr/simbad/sim-tap/sync?query=' + encodeURIComponent(query) + '&request=doQuery&lang=adql&format=json&phase=run';

        var ajax = Utils.getAjaxObject(url, 'GET', 'json', false)
        ajax.done(function(result) {
            var defaultFov = 4 / 60; // 4 arcmin
            var fov = defaultFov;

            if ( 'data' in result && result.data.length>0) {
                var galdimMajAxis = Utils.isNumber(result.data[0][0]) ? result.data[0][0] / 60.0 : null; // result gives galdim in arcmin
                var magV = Utils.isNumber(result.data[0][1]) ? result.data[0][1] : null;

                if (galdimMajAxis !== null) {
                    fov = 2 * galdimMajAxis;
                }
                else if (magV !== null) {
                    if (magV<10) {
                        fov = 2 * Math.pow(2.0, (6-magV/2.0)) / 60;
                    }
                }
            }

            (typeof callback === 'function') && callback(fov);
        });
    };
	
    Aladin.prototype.setFrame = function(frameName) {
        if (! frameName) {
            return;
        }
        var newFrame = CooFrameEnum.fromString(frameName, CooFrameEnum.J2000);
        if (newFrame==this.view.cooFrame)  {
            return;
        }

        this.view.changeFrame(newFrame);
        // mÃ j select box
        $(this.aladinDiv).find('.aladin-frameChoice').val(newFrame.label);
    };

	Aladin.prototype.setProjection = function(projectionName) {
		if (! projectionName) {
			return;
		}
		projectionName = projectionName.toLowerCase();
		switch(projectionName) {
			case "aitoff":
				this.view.changeProjection(ProjectionEnum.AITOFF);
				break;
			case "sinus":
			default:
				this.view.changeProjection(ProjectionEnum.SIN);
		}
	};
    
    /** point view to a given object (resolved by Sesame) or position
     * @api
     *
     * @param: target; object name or position
     * @callbackOptions: (optional) the object with key 'success' and/or 'error' containing the success and error callback functions.
     *
     */
    Aladin.prototype.gotoObject = function(targetName, callbackOptions) {
        var successCallback = errorCallback = undefined;
        if (typeof callbackOptions === 'object') {
            if (callbackOptions.hasOwnProperty('success')) {
                successCallback = callbackOptions.success;
            }
            if (callbackOptions.hasOwnProperty('error')) {
                errorCallback = callbackOptions.error;
            }
        }
        // this is for compatibility reason with the previous method signature which was function(targetName, errorCallback)
        else if (typeof callbackOptions === 'function') {
            errorCallback = callbackOptions;
        }


    	var isObjectName = /[a-zA-Z]/.test(targetName);
    	
    	// try to parse as a position
    	if ( ! isObjectName) {
    		var coo = new Coo();

			coo.parse(targetName);
			var lonlat = [coo.lon, coo.lat];
			if (this.view.cooFrame == CooFrameEnum.GAL) {
				lonlat = CooConversion.GalacticToJ2000(lonlat);
			}
    		this.view.pointTo(lonlat[0], lonlat[1]);
            
            (typeof successCallback === 'function') && successCallback(this.getRaDec());
    	}
    	// ask resolution by Sesame
    	else {
	        var self = this;
	        Sesame.resolve(targetName,
	                       function(data) { // success callback
	        					   var ra = data.Target.Resolver.jradeg;
	        					   var dec = data.Target.Resolver.jdedeg;
	        					   self.view.pointTo(ra, dec);

                                   (typeof successCallback === 'function') && successCallback(self.getRaDec());
	                       },
	                       function(data) { // errror callback
	                            if (console) {
	                                console.log("Could not resolve object name " + targetName);
	                                console.log(data);
	                            }
                                (typeof errorCallback === 'function') && errorCallback();
	                       });
    	}
    };
    
    
    
    /**
     * go to a given position, expressed in the current coordinate frame
     * 
     * @API
     */
    Aladin.prototype.gotoPosition = function(lon, lat) {
        var radec;
        // first, convert to J2000 if needed
        if (this.view.cooFrame==CooFrameEnum.GAL) {
            radec = CooConversion.GalacticToJ2000([lon, lat]);
        }
        else {
            radec = [lon, lat];
        }
    	this.view.pointTo(radec[0], radec[1]);
    };
    
    
    var doAnimation = function(aladin) {
        var params = aladin.animationParams;
        if (params==null) {
            return;
        }
        var now = new Date().getTime();
        // this is the animation end: set the view to the end position, and call complete callback 
        if (now>params['end']) {
            aladin.gotoRaDec(params['raEnd'], params['decEnd']);
            
            if (params['complete']) {
                params['complete']();
            }
            
            return;
        }
        
        // compute current position
        var fraction =  (now-params['start']) / (params['end'] - params['start']);
        var curPos = intermediatePoint(params['raStart'], params['decStart'], params['raEnd'], params['decEnd'], fraction);
        curRa =  curPos[0];
        curDec = curPos[1];
        //var curRa =  params['raStart'] + (params['raEnd'] - params['raStart']) * (now-params['start']) / (params['end'] - params['start']);
        //var curDec = params['decStart'] + (params['decEnd'] - params['decStart']) * (now-params['start']) / (params['end'] - params['start']);
        
        aladin.gotoRaDec(curRa, curDec);
        
        setTimeout(function() {doAnimation(aladin);}, 50);
        
    };
    /*
     * animate smoothly from the current position to the given ra, dec
     * 
     * the total duration (in seconds) of the animation can be given (otherwise set to 5 seconds by default)
     * 
     * complete: a function to call once the animation has completed
     * 
     * @API
     * 
     */
    Aladin.prototype.animateToRaDec = function(ra, dec, duration, complete) {
        duration = duration || 5;
        
        this.animationParams = null;
        
        var animationParams = {};
        animationParams['start'] = new Date().getTime();
        animationParams['end'] = new Date().getTime() + 1000*duration;
        var raDec = this.getRaDec();
        animationParams['raStart'] = raDec[0];
        animationParams['decStart'] = raDec[1];
        animationParams['raEnd'] = ra;
        animationParams['decEnd'] = dec;
        animationParams['complete'] = complete;
        
        this.animationParams = animationParams;
        
        doAnimation(this);
    };
    
    var doZoomAnimation = function(aladin) {
        var params = aladin.zoomAnimationParams;
        if (params==null) {
            return;
        }
        var now = new Date().getTime();
        // this is the zoom animation end: set the view to the end fov, and call complete callback 
        if (now>params['end']) {
            aladin.setFoV(params['fovEnd']);
            
            if (params['complete']) {
                params['complete']();
            }
            
            return;
        }
        
        // compute current position
        var fraction = (now-params['start']) / (params['end'] - params['start']);
        var curFov =  params['fovStart'] + (params['fovEnd'] - params['fovStart']) * Math.sqrt(fraction);
        
        aladin.setFoV(curFov);
        
        setTimeout(function() {doZoomAnimation(aladin);}, 50);
        
    };
    /*
     * zoom smoothly from the current FoV to the given new fov to the given ra, dec
     * 
     * the total duration (in seconds) of the animation can be given (otherwise set to 5 seconds by default)
     * 
     * complete: a function to call once the animation has completed
     * 
     * @API
     * 
     */
    Aladin.prototype.zoomToFoV = function(fov, duration, complete) {
        duration = duration || 5;
        
        this.zoomAnimationParams = null;
        
        var zoomAnimationParams = {};
        zoomAnimationParams['start'] = new Date().getTime();
        zoomAnimationParams['end'] = new Date().getTime() + 1000*duration;
        var fovArray = this.getFov();
        zoomAnimationParams['fovStart'] = Math.max(fovArray[0], fovArray[1]);
        zoomAnimationParams['fovEnd'] = fov;
        zoomAnimationParams['complete'] = complete;

        console.log(zoomAnimationParams);
        
        this.zoomAnimationParams = zoomAnimationParams;
        doZoomAnimation(this);
    };



    /**
     *  Compute intermediate point between points (lng1, lat1) and (lng2, lat2)
     *  at distance fraction times the total distance (fraction between 0 and 1)
     *
     *  Return intermediate points in degrees
     *
     */
    function intermediatePoint(lng1, lat1, lng2, lat2, fraction) {
        function degToRad(d) {
            return d * Math.PI / 180;
        }
        function radToDeg(r) {
            return r * 180 / Math.PI;
        }
        var lat1=degToRad(lat1);
        var lng1=degToRad(lng1);
        var lat2=degToRad(lat2);
        var lng2=degToRad(lng2);
        var d = 2 * Math.asin(
                    Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)),
                    2) +
                    Math.cos(lat1) * Math.cos(lat2) *
                    Math.pow(Math.sin((lng1-lng2) / 2), 2)));
        var A = Math.sin((1 - fraction) * d) / Math.sin(d);
        var B = Math.sin(fraction * d) / Math.sin(d);
        var x = A * Math.cos(lat1) * Math.cos(lng1) + B *
            Math.cos(lat2) * Math.cos(lng2);
        var y = A * Math.cos(lat1) * Math.sin(lng1) + B *
            Math.cos(lat2) * Math.sin(lng2);
        var z = A * Math.sin(lat1) + B * Math.sin(lat2);
        var lon = Math.atan2(y, x);
        var lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) +
             Math.pow(y, 2)));

        return [radToDeg(lon), radToDeg(lat)];
    };



    
    /**
     * get current [ra, dec] position of the center of the view
     * 
     * @API
     */
    Aladin.prototype.getRaDec = function() {
        if (this.view.cooFrame.system==CooFrameEnum.SYSTEMS.J2000) {
            return [this.view.viewCenter.lon, this.view.viewCenter.lat];
        }
        else {
            var radec = CooConversion.GalacticToJ2000([this.view.viewCenter.lon, this.view.viewCenter.lat]);
            return radec;
            
        }
    };
    
    
    /**
     * point to a given position, expressed as a ra,dec coordinate
     * 
     * @API
     */
    Aladin.prototype.gotoRaDec = function(ra, dec) {
        this.view.pointTo(ra, dec);
    };

    Aladin.prototype.showHealpixGrid = function(show) {
        this.view.showHealpixGrid(show);
    };
    
    Aladin.prototype.showSurvey = function(show) {
        this.view.showSurvey(show);
    };
    Aladin.prototype.showCatalog = function(show) {
        this.view.showCatalog(show);
    };
    Aladin.prototype.showReticle = function(show) {
        this.view.showReticle(show);
        $('#displayReticle').attr('checked', show);
    };
    Aladin.prototype.removeLayers = function() {
        this.view.removeLayers();
    };

    // these 3 methods should be merged into a unique "add" method
    Aladin.prototype.addCatalog = function(catalog) {
        this.view.addCatalog(catalog);
    };
    Aladin.prototype.addOverlay = function(overlay) {
        this.view.addOverlay(overlay);
    };
    Aladin.prototype.addMOC = function(moc) {
        this.view.addMOC(moc);
    };
    

  
    // @oldAPI
    Aladin.prototype.createImageSurvey = function(id, name, rootUrl, cooFrame, maxOrder, options) {
        return new HpxImageSurvey(id, name, rootUrl, cooFrame, maxOrder, options);        
    };


 
    // @api
    Aladin.prototype.getBaseImageLayer = function() {
        return this.view.imageSurvey;
    };
    // @param imageSurvey : HpxImageSurvey object or image survey identifier
    // @api
    // @old
    Aladin.prototype.setImageSurvey = function(imageSurvey, callback) {
        this.view.setImageSurvey(imageSurvey, callback);
        this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys());
        if (this.options.log) {
            var id = imageSurvey;
            if (typeof imageSurvey !== "string") {
                id = imageSurvey.rootUrl;
            }

            Logger.log("changeImageSurvey", id);
        }
    };
    // @api
    Aladin.prototype.setBaseImageLayer = Aladin.prototype.setImageSurvey;
    
    // @api
    Aladin.prototype.getOverlayImageLayer = function() {
        return this.view.overlayImageSurvey;
    };
    // @api
    Aladin.prototype.setOverlayImageLayer = function(imageSurvey, callback) {
        this.view.setOverlayImageSurvey(imageSurvey, callback);
    };
    

    Aladin.prototype.increaseZoom = function(step) {
        if (!step) {
            step = 5;
        }
    	this.view.setZoomLevel(this.view.zoomLevel+step);
    };
    
    Aladin.prototype.decreaseZoom = function(step) {
        if (!step) {
            step = 5;
        }
    	this.view.setZoomLevel(this.view.zoomLevel-step);
    };
    
    // @oldAPI
    Aladin.prototype.createCatalog = function(options) {
        return A.catalog(options);
    };


    Aladin.prototype.createProgressiveCatalog = function(url, frame, maxOrder, options) {
        return new ProgressiveCat(url, frame, maxOrder, options);
    };
    
    // @oldAPI
    Aladin.prototype.createSource = function(ra, dec, data) {
        return new cds.Source(ra, dec, data);
    };
    // @oldAPI
    Aladin.prototype.createMarker = function(ra, dec, options, data) {
        options = options || {};
        options['marker'] = true;
        return new cds.Source(ra, dec, data, options);
    };

    Aladin.prototype.createOverlay = function(options) {
        return new Overlay(options);
    };

    // @oldAPI
    Aladin.prototype.createFootprintsFromSTCS = function(stcs) {
        return A.footprintsFromSTCS(stcs);
    };

    // API
    A.footprintsFromSTCS = function(stcs) {
        var footprints = Overlay.parseSTCS(stcs);

        return footprints;
    }

    // API
    A.MOCFromURL = function(url, options, successCallback) {
        var moc = new MOC(options);
        moc.dataFromFITSURL(url, successCallback);

        return moc;
    };

    // API
    A.MOCFromJSON = function(jsonMOC, options) {
        var moc = new MOC(options);
        moc.dataFromJSON(jsonMOC);

        return moc;
    };

    
    // @oldAPI
    Aladin.prototype.createCatalogFromVOTable = function(url, options) {
        return A.catalogFromURL(url, options);
    };

    // TODO: try first without proxy, and then with, if param useProxy not set
    // API
    A.catalogFromURL = function(url, options, successCallback, useProxy) {
        var catalog = A.catalog(options);
        // TODO: should be self-contained in Catalog class
        cds.Catalog.parseVOTable(url, function(sources) {
                catalog.addSources(sources);
                if (successCallback) {
                    successCallback(sources);
                }
            },
            catalog.maxNbSources, useProxy,
            catalog.raField, catalog.decField
        );

        return catalog;
    };

    // API
    // @param target: can be either a string representing a position or an object name, or can be an object with keys 'ra' and 'dec' (values being in decimal degrees)
    A.catalogFromSimbad = function(target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'Simbad';
        }
        var url = URLBuilder.buildSimbadCSURL(target, radius);
        return A.catalogFromURL(url, options, successCallback, false);
    };
     
    // API
    A.catalogFromNED = function(target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'NED';
        }
        var url;
        if (target && (typeof target  === "object")) {
            if ('ra' in target && 'dec' in target) {
                url = URLBuilder.buildNEDPositionCSURL(target.ra, target.dec, radius);
            }
        }
        else {
    	    var isObjectName = /[a-zA-Z]/.test(target);
            if (isObjectName)  {
                url = URLBuilder.buildNEDObjectCSURL(target, radius);
            }
            else {
                var coo = new Coo();
                coo.parse(target);
                url = URLBuilder.buildNEDPositionCSURL(coo.lon, coo.lat, radius);
            }
        }

        return A.catalogFromURL(url, options, successCallback);
    };

    // API
    A.catalogFromVizieR = function(vizCatId, target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'VizieR:' + vizCatId;
        }
        var url = URLBuilder.buildVizieRCSURL(vizCatId, target, radius, options);

        return A.catalogFromURL(url, options, successCallback, false);
    };

    // API
    A.catalogFromSkyBot = function(ra, dec, radius, epoch, queryOptions, options, successCallback) {
        queryOptions = queryOptions || {};
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'SkyBot';
        }
        var url = URLBuilder.buildSkyBotCSURL(ra, dec, radius, epoch, queryOptions);
        return A.catalogFromURL(url, options, successCallback, false);
    };

     Aladin.AVAILABLE_CALLBACKS = ['select', 'objectClicked', 'objectHovered', 'footprintClicked', 'footprintHovered', 'positionChanged', 'zoomChanged', 'click', 'mouseMove', 'fullScreenToggled']; 
     // API
     //
     // setting callbacks
     Aladin.prototype.on = function(what, myFunction) {
         if (Aladin.AVAILABLE_CALLBACKS.indexOf(what)<0) {
            return; 
         }

         this.callbacksByEventName[what] = myFunction;
     };
     
     Aladin.prototype.select = function() {
         this.fire('selectstart');
     };
     
     Aladin.prototype.fire = function(what, params) {
         if (what==='selectstart') {
             this.view.setMode(View.SELECT);
         }
         else if (what==='selectend') {
             this.view.setMode(View.PAN);
             var callbackFn = this.callbacksByEventName['select'];
             (typeof callbackFn === 'function') && callbackFn(params);
         }
     };
     
     Aladin.prototype.hideBoxes = function() {
         if (this.boxes) {
             for (var k=0; k<this.boxes.length; k++) {
                 this.boxes[k].hide();
             }
         }
     };
     
     // ?
     Aladin.prototype.updateCM = function() {
         
     };
     
     // TODO : LayerBox (or Stack?) must be extracted as a separate object
     Aladin.prototype.showLayerBox = function() {
         var self = this;
         
         // first, update
         var layerBox = $(this.aladinDiv).find('.aladin-layerBox');
         layerBox.empty();
         layerBox.append('<a class="aladin-closeBtn">&times;</a>' +
                 '<div style="clear: both;"></div>' +
                 '<div class="aladin-label">Base image layer</div>' +
                 '<select class="aladin-surveySelection"></select>' +
                 '<div class="aladin-cmap">Color map:' +
                 '<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div></div>' +
                 '<div class="aladin-box-separator"></div>' +
                 '<div class="aladin-label">Overlay layers</div>');
         
         var cmDiv = layerBox.find('.aladin-cmap');
         
         // fill color maps options
         var cmSelect = layerBox.find('.aladin-cmSelection');
         for (var k=0; k<ColorMap.MAPS_NAMES.length; k++) {
             cmSelect.append($("<option />").text(ColorMap.MAPS_NAMES[k]));
         }
         cmSelect.val(self.getBaseImageLayer().getColorMap().mapName);

         
         // loop over all overlay layers
         var layers = this.view.allOverlayLayers;
         var str = '<ul>';
         for (var k=layers.length-1; k>=0; k--) {
             var layer = layers[k];
             var name = layer.name;
             var checked = '';
             if (layer.isShowing) {
                 checked = 'checked="checked"';
             }

             var tooltipText = '';
             var iconSvg = '';
             if (layer.type=='catalog' || layer.type=='progressivecat') {
                var nbSources = layer.getSources().length;
                tooltipText = nbSources + ' source' + ( nbSources>1 ? 's' : '');

                iconSvg = AladinUtils.SVG_ICONS.CATALOG;
            }
            else if (layer.type=='moc') {
                tooltipText = 'Coverage: ' + (100*layer.skyFraction()).toFixed(3) + ' % of sky';

                iconSvg = AladinUtils.SVG_ICONS.MOC;
            }
            else if (layer.type=='overlay') {
                iconSvg = AladinUtils.SVG_ICONS.OVERLAY;
            }

             var rgbColor = $('<div></div>').css('color', layer.color).css('color'); // trick to retrieve the color as 'rgb(,,)' - does not work for named colors :(
             var labelColor = Color.getLabelColorForBackground(rgbColor);

             // retrieve SVG icon, and apply the layer color
             var svgBase64 = window.btoa(iconSvg.replace(/FILLCOLOR/g, layer.color));
             str += '<li><div class="aladin-stack-icon" style=\'background-image: url("data:image/svg+xml;base64,' + svgBase64 + '");\'></div>';
            str += '<input type="checkbox" ' + checked + ' id="aladin_lite_' + name + '"></input><label for="aladin_lite_' + name + '" class="aladin-layer-label" style="background: ' + layer.color + '; color:' + labelColor + ';" title="' + tooltipText + '">' + name + '</label></li>';
         }
         str += '</ul>';
         layerBox.append(str);
         
         layerBox.append('<div class="aladin-blank-separator"></div>');
         
         // gestion du rÃ©ticule
         var checked = '';
         if (this.view.displayReticle) {
             checked = 'checked="checked"';
         }
         var reticleCb = $('<input type="checkbox" ' + checked + ' id="displayReticle" />');
         layerBox.append(reticleCb).append('<label for="displayReticle">Reticle</label><br/>');
         reticleCb.change(function() {
             self.showReticle($(this).is(':checked'));
         });
         
         // Gestion grille Healpix
         checked = '';
         if (this.view.displayHpxGrid) {
             checked = 'checked="checked"';
         }
         var hpxGridCb = $('<input type="checkbox" ' + checked + ' id="displayHpxGrid"/>');
         layerBox.append(hpxGridCb).append('<label for="displayHpxGrid">HEALPix grid</label><br/>');
         hpxGridCb.change(function() {
             self.showHealpixGrid($(this).is(':checked'));
         });
         
         
         layerBox.append('<div class="aladin-box-separator"></div>' +
              '<div class="aladin-label">Tools</div>');
         var exportBtn = $('<button class="aladin-btn" type="button">Export view as PNG</button>');
         layerBox.append(exportBtn);
         exportBtn.click(function() {
             self.exportAsPNG();
         });
                 
                 /*
                 '<div class="aladin-box-separator"></div>' +
                 '<div class="aladin-label">Projection</div>' +
                 '<select id="projectionChoice"><option>SINUS</option><option>AITOFF</option></select><br/>'
                 */

         layerBox.find('.aladin-closeBtn').click(function() {self.hideBoxes();return false;});
         
         // update list of surveys
         this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys());
         var surveySelection = $(this.aladinDiv).find('.aladin-surveySelection');
         surveySelection.change(function() {
             var survey = HpxImageSurvey.getAvailableSurveys()[$(this)[0].selectedIndex];
             self.setImageSurvey(survey.id, function() {
                 var baseImgLayer = self.getBaseImageLayer();
                 
                 if (baseImgLayer.useCors) {
                     // update color map list with current value color map
                     cmSelect.val(baseImgLayer.getColorMap().mapName);
                     cmDiv.show();
                     
                     exportBtn.show();
                 }
                 else {
                     cmDiv.hide();
                     
                     exportBtn.hide();
                 }
             });

             
             
         });
         
         //// COLOR MAP management ////////////////////////////////////////////
         // update color map
         cmDiv.find('.aladin-cmSelection').change(function() {
             var cmName = $(this).find(':selected').val();
             self.getBaseImageLayer().getColorMap().update(cmName);
         });
         
         // reverse color map
         cmDiv.find('.aladin-reverseCm').click(function() {
             self.getBaseImageLayer().getColorMap().reverse(); 
         });
         if (this.getBaseImageLayer().useCors) {
             cmDiv.show();
             exportBtn.show();
         }
         else {
             cmDiv.hide();
             exportBtn.hide();
         }
         layerBox.find('.aladin-reverseCm').parent().attr('disabled', true);
         //////////////////////////////////////////////////////////////////////
         
         
         // handler to hide/show overlays
         $(this.aladinDiv).find('.aladin-layerBox ul input').change(function() {
             var layerName = ($(this).attr('id').substr(12));
             var layer = self.layerByName(layerName);
             if ($(this).is(':checked')) {
                 layer.show();
             }
             else {
                 layer.hide();
             }
         });
         
         // finally show
         layerBox.show();
         
     };
     
     Aladin.prototype.layerByName = function(name) {
         var c = this.view.allOverlayLayers;
         for (var k=0; k<c.length; k++) {
             if (name==c[k].name) {
                 return c[k];
             }
         }
         return null;
     };
     
     // TODO : integrate somehow into API ?
     Aladin.prototype.exportAsPNG = function(imgFormat) {
         var w = window.open();
         w.document.write('<img src="' + this.getViewDataURL() + '">');
         w.document.title = 'Aladin Lite snapshot';
     };

    /**
     * Return the current view as a data URL (base64-formatted string)
     * Parameters:
     * - options (optional): object with attributs
     *     * format (optional): 'image/png' or 'image/jpeg'
     *     * width: width in pixels of the image to output
     *     * height: height in pixels of the image to output
     *
     * @API
    */
    Aladin.prototype.getViewDataURL = function(options) {
        var options = options || {};
        // support for old API signature
        if (typeof options !== 'object') {
            var imgFormat = options;
            options = {format: imgFormat};
        }

        return this.view.getCanvasDataURL(options.format, options.width, options.height);
    }

    /**
     * Return the current view WCS as a key-value dictionary
     * Can be useful in coordination with getViewDataURL
     *
     * @API
    */
    Aladin.prototype.getViewWCS = function(options) {
        var raDec = this.getRaDec();
        var fov   = this.getFov();
        // TODO: support for other projection methods than SIN
        return {
            NAXIS:     2,
            NAXIS1:    this.view.width,
            NAXIS2:    this.view.height,
            RADECSYS: 'ICRS',
            CRPIX1:    this.view.width  / 2,
            CRPIX2:    this.view.height / 2,
            CRVAL1:    raDec[0],
            CRVAL2:    raDec[1],
            CTYPE1:    'RA---SIN',
            CTYPE2:    'DEC--SIN',
            CD1_1:     fov[0] / this.view.width,
            CD1_2:     0.0,
            CD2_1:     0.0,
            CD2_2:     fov[1] / this.view.height
        }
    }
     
     /** restrict FOV range
      * @API
      * @param minFOV in degrees when zoom in at max
      * @param maxFOV in degreen when zoom out at max
     */
     Aladin.prototype.setFovRange = Aladin.prototype.setFOVRange = function(minFOV, maxFOV) {
         if (minFOV>maxFOV) {
             var tmp = minFOV;
             minFOV = maxFOV;
             maxFOV = tmp;
         }
         
         this.view.minFOV = minFOV;
         this.view.maxFOV = maxFOV;
         
     };
     
     /**
      * Transform pixel coordinates to world coordinates
      * 
      * Origin (0,0) of pixel coordinates is at top left corner of Aladin Lite view
      * 
      * @API
      * 
      * @param x
      * @param y
      * 
      * @return a [ra, dec] array with world coordinates in degrees. Returns undefined is something went wrong
      * 
      */
     Aladin.prototype.pix2world = function(x, y) {
         // this might happen at early stage of initialization
         if (!this.view) {
            return undefined;
         }

         var xy = AladinUtils.viewToXy(x, y, this.view.width, this.view.height, this.view.largestDim, this.view.zoomFactor);
         
         var radec;
         try {
            radec = this.view.projection.unproject(xy.x, xy.y);
         }
         catch(e) {
            return undefined;
         }
         
         var res;
         if (this.view.cooFrame==CooFrameEnum.GAL) {
             res = CooConversion.GalacticToJ2000([radec.ra, radec.dec]);
         }
         else {
             res =  [radec.ra, radec.dec];
         }
             
         return res;
     };
     
     /**
      * Transform world coordinates to pixel coordinates in the view
      * 
      * @API
      * 
      * @param ra  
      * @param dec
      * 
      * @return a [x, y] array with pixel coordinates in the view. Returns null if the projection failed somehow
      *   
      */
     Aladin.prototype.world2pix = function(ra, dec) {
         // this might happen at early stage of initialization
         if (!this.view) {
            return;
         }

         var xy;
         if (this.view.cooFrame==CooFrameEnum.GAL) {
             var lonlat = CooConversion.J2000ToGalactic([ra, dec]);
             xy = this.view.projection.project(lonlat[0], lonlat[1]);
         }
         else {
             xy = this.view.projection.project(ra, dec);
         }
         if (xy) {
             var xyview = AladinUtils.xyToView(xy.X, xy.Y, this.view.width, this.view.height, this.view.largestDim, this.view.zoomFactor);
             return [xyview.vx, xyview.vy];
         }
         else {
             return null;
         }
     };
     
     /**
      * 
      * @API
      * 
      * @param ra  
      * @param nbSteps the number of points to return along each side (the total number of points returned is 4*nbSteps)
      * 
      * @return set of points along the current FoV with the following format: [[ra1, dec1], [ra2, dec2], ..., [ra_n, dec_n]]
      *   
      */
     Aladin.prototype.getFovCorners = function(nbSteps) {
         // default value: 1
         if (!nbSteps || nbSteps<1) {
             nbSteps = 1;
         }
         
         var points = [];
         var x1, y1, x2, y2;
         for (var k=0; k<4; k++) {
             x1 = (k==0 || k==3) ? 0 : this.view.width-1;
             y1 = (k<2) ? 0 : this.view.height-1;
             x2 = (k<2) ? this.view.width-1 : 0;
             y2 = (k==1 || k==2) ? this.view.height-1 :0;
             
             for (var step=0; step<nbSteps; step++) {
                 points.push(this.pix2world(x1 + step/nbSteps * (x2-x1), y1 + step/nbSteps * (y2-y1)));
             }
         }
         
         return points;
         
     };
     
     /**
      * @API
      * 
      * @return the current FoV size in degrees as a 2-elements array
      */
     Aladin.prototype.getFov = function() {
         var fovX = this.view.fov;
         var s = this.getSize();
         var fovY = s[1] / s[0] * fovX;
         // TODO : take into account AITOFF projection where fov can be larger than 180
         fovX = Math.min(fovX, 180);
         fovY = Math.min(fovY, 180);
         
         return [fovX, fovY];
     };
     
     /**
      * @API
      * 
      * @return the size in pixels of the Aladin Lite view
      */
     Aladin.prototype.getSize = function() {
         return [this.view.width, this.view.height];
     };
     
     /**
      * @API
      * 
      * @return the jQuery object representing the DIV element where the Aladin Lite instance lies
      */
     Aladin.prototype.getParentDiv = function() {
         return $(this.aladinDiv);
     };
    
	return Aladin;
})();

//// New API ////
// For developers using Aladin lite: all objects should be created through the API, 
// rather than creating directly the corresponding JS objects
// This facade allows for more flexibility as objects can be updated/renamed harmlessly

//@API
A.aladin = function(divSelector, options) {
  return new Aladin($(divSelector)[0], options);
};

//@API
// TODO : lecture de properties
A.imageLayer = function(id, name, rootUrl, options) {
    return new HpxImageSurvey(id, name, rootUrl, null, null, options);
};

// @API
A.source = function(ra, dec, data, options) {
    return new cds.Source(ra, dec, data, options);
};

// @API
A.marker = function(ra, dec, options, data) {
    options = options || {};
    options['marker'] = true;
    return A.source(ra, dec, data, options);
};

// @API
A.polygon = function(raDecArray) {
    var l = raDecArray.length;
    if (l>0) {
        // close the polygon if needed
        if (raDecArray[0][0]!=raDecArray[l-1][0] || raDecArray[0][1]!=raDecArray[l-1][1]) {
            raDecArray.push([raDecArray[0][0], raDecArray[0][1]]);
        }
    }
    return new Footprint(raDecArray);
};

//@API
A.polyline = function(raDecArray, options) {
    return new Polyline(raDecArray, options);
};


// @API
A.circle = function(ra, dec, radiusDeg, options) {
    return new Circle([ra, dec], radiusDeg, options);
};

// @API
A.graphicOverlay = function(options) {
    return new Overlay(options);
};

// @API
A.catalog = function(options) {
    return new cds.Catalog(options);
};

// @API
A.catalogHiPS = function(rootURL, options) {
    return new ProgressiveCat(rootURL, null, null, options);
};

// @API
/*
 * return a Box GUI element to insert content
 */
Aladin.prototype.box = function(options) {
    var box = new Box(options);
    box.$parentDiv.appendTo(this.aladinDiv);

    return box;
};

// @API
/*
 * show popup at ra, dec position with given title and content
 */
Aladin.prototype.showPopup = function(ra, dec, title, content) {
    this.view.catalogForPopup.removeAll();
    var marker = A.marker(ra, dec, {popupTitle: title, popupDesc: content, useMarkerDefaultIcon: false});
    this.view.catalogForPopup.addSources(marker);
    this.view.catalogForPopup.show();

    this.view.popup.setTitle(title);
    this.view.popup.setText(content);
    this.view.popup.setSource(marker);
    this.view.popup.show();
};

// @API
/*
 * hide popup
 */
Aladin.prototype.hidePopup = function() {
    this.view.popup.hide();
};

// @API
/*
 * return a URL allowing to share the current view
 */
Aladin.prototype.getShareURL = function() {
    var radec = this.getRaDec();
    var coo = new Coo();
    coo.prec = 7;
    coo.lon = radec[0];
    coo.lat = radec[1];

    return 'http://aladin.unistra.fr/AladinLite/?target=' + encodeURIComponent(coo.format('s')) +
           '&fov=' + this.getFov()[0].toFixed(2) + '&survey=' + encodeURIComponent(this.getBaseImageLayer().id || this.getBaseImageLayer().rootUrl);
};

// @API
/*
 * return, as a string, the HTML embed code
 */
Aladin.prototype.getEmbedCode = function() {
    var radec = this.getRaDec();
    var coo = new Coo();
    coo.prec = 7;
    coo.lon = radec[0];
    coo.lat = radec[1];

    var survey = this.getBaseImageLayer().id;
    var fov = this.getFov()[0];
    var s = '';
    s += '<link rel="stylesheet" href="http://aladin.unistra.fr/AladinLite/api/v2/latest/aladin.min.css" />\n';
    s += '<script type="text/javascript" src="//code.jquery.com/jquery-1.9.1.min.js" charset="utf-8"></script>\n';
    s += '<div id="aladin-lite-div" style="width:400px;height:400px;"></div>\n';
    s += '<script type="text/javascript" src="http://aladin.unistra.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>\n';
    s += '<script type="text/javascript">\n';
    s += 'var aladin = A.aladin("#aladin-lite-div", {survey: "' + survey + 'P/DSS2/color", fov: ' + fov.toFixed(2) + ', target: "' + coo.format('s') + '"});\n';
    s += '</script>';
    return s;
};

// @API
/*
 * Creates remotely a HiPS from a FITS image URL and displays it
 */
Aladin.prototype.displayFITS = function(url, options, successCallback, errorCallback) {
    options = options || {};
    var data = {url: url};
    if (options.color) {
        data.color = true;
    }
    if (options.outputFormat) {
        data.format = options.outputFormat;
    }
    if (options.order) {
        data.order = options.order;
    }
    if (options.nocache) {
        data.nocache = options.nocache;
    }
    var self = this;
    $.ajax({
        url: 'https://alasky.unistra.fr/cgi/fits2HiPS',
        data: data,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.status!='success') {
                console.error('An error occured: ' + response.message);
                if (errorCallback) {
                    errorCallback(response.message);
                }
                return;
            }
            var label = options.label || "FITS image"; 
            var meta = response.data.meta;
            self.setOverlayImageLayer(self.createImageSurvey(label, label, response.data.url, "equatorial", meta.max_norder, {imgFormat: 'png'}));
            var transparency = (options && options.transparency) || 1.0;
            self.getOverlayImageLayer().setAlpha(transparency);

            var executeDefaultSuccessAction = true;
            if (successCallback) {
                executeDefaultSuccessAction = successCallback(meta.ra, meta.dec, meta.fov);
            }
            if (executeDefaultSuccessAction===true) {
                self.gotoRaDec(meta.ra, meta.dec);
                self.setFoV(meta.fov);
            }

        }
    });

};

// @API
/*
 * Creates remotely a HiPS from a JPEG or PNG image with astrometry info
 * and display it
 */
Aladin.prototype.displayJPG = Aladin.prototype.displayPNG = function(url, options, successCallback, errorCallback) {
    options = options || {};
    options.color = true;
    options.label = "JPG/PNG image";
    options.outputFormat = 'png';
    this.displayFITS(url, options, successCallback, errorCallback);
};

Aladin.prototype.setReduceDeformations = function(reduce) {
    this.reduceDeformations = reduce;
    this.view.requestRedraw();
}



// conservÃ© pour compatibilitÃ© avec existant
// @oldAPI
if ($) {
    $.aladin = A.aladin;
}

// TODO: callback function onAladinLiteReady
console.log('=============== >  aladin.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

cds.Catalog.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

cds.Catalog.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};

// function called when a source is clicked. Called by the View object
cds.Source.prototype.actionClicked = function() {
    if (this.catalog && this.catalog.onClick) {
    	AladinLiteX_mVc.setLastSelectedPosition(this.catalog.name,this.ra, this.dec)
        var view = this.catalog.view;
        if (this.catalog.onClick=='showTable') {
            view.aladin.measurementTable.showMeasurement(this);
            this.select();
        }
        else if (this.catalog.onClick=='showPopup') {
            view.popup.setTitle('<br><br>');
            var m = '<div class="aladin-marker-measurement">';
            m += '<table>';
            for (var key in this.data) {
                m += '<tr><td>' + key + '</td><td>' + this.data[key] + '</td></tr>';
            }
            m += '</table>';
            m += '</div>';
            view.popup.setText(m);
            view.popup.setSource(this);
            view.popup.show();
        }
        else if (typeof this.catalog.onClick === 'function' ) {
            this.catalog.onClick(this);
            view.lastClickedObject = this;
            this.select();

        }
    }
};

//The sources selected will be unselected when the empty part of aladin clicked.But the sources selected keep selected when we check one of the related sources,
MeasurementTable.prototype.hide = function() {
    this.divEl.hide();
    $("#SourceDiv").css("display","none");
    AladinLiteX_mVc.deleteSourceAuto();
    AladinLiteX_mVc.deleteLastSelectedPosition();
    $("#ACDS").css("color","#888a85");
};
//To clean the target when we click the empty part of aladin
cds.Source.prototype.actionOtherObjectClicked = function() {
    if (this.catalog && this.catalog.onClick) {
        this.deselect();
        $("#SourceDiv").css("display","none");
        AladinLiteX_mVc.cleanCatalog("Target");
        AladinLiteX_mVc.deleteLastSelectedPosition();
        $("#ACDS").css("color","#888a85");
	}
};


ProgressiveCat.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

ProgressiveCat.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};
/**
 * Limit he number of sources at 999
 */
URLBuilder.buildVizieRCSURL = function(vizCatId, target, radiusDegrees) {
    if (target && (typeof target  === "object")) {
        if ('ra' in target && 'dec' in target) {
            var coo = new Coo(target.ra, target.dec, 7);
            target = coo.format('s');
        }
    }
    return 'http://vizier.unistra.fr/viz-bin/votable?-source=' + vizCatId + '&-c=' + encodeURIComponent(target) + '&-out.max=20000&-c.rd=' + radiusDegrees;
};

/*Aladin.prototype.increaseZoom = function(step) {
    if (!step) {
        step = 5;
    }
	this.view.setZoomLevel(this.view.zoomLevel+step);
	
};

Aladin.prototype.decreaseZoom = function(step) {
    if (!step) {
        step = 5;
    }
	this.view.setZoomLevel(this.view.zoomLevel-step);
	SimbadCatalog.displayCatalogFiltered();
};*/

var Location = (function() {
    // constructor
    Location = function(locationDiv) {
    		this.$div = $(locationDiv);
    	};
	
	Location.prototype.update = function(lon, lat, cooFrame, isViewCenterPosition) {
        isViewCenterPosition = (isViewCenterPosition && isViewCenterPosition===true) || false;
		var coo = new Coo(lon, lat, 7);
		var updateDiv = $("#aladin-lite-div-target")
		if (cooFrame==CooFrameEnum.J2000) {
            this.$div.html(coo.format('s/'));
            updateDiv.val(coo.format('s/'));
        }
		else if (cooFrame==CooFrameEnum.J2000d) {
            this.$div.html(coo.format('d/'));
            updateDiv.val(coo.format('d/'));
        }
        else {
            this.$div.html(coo.format('d/'));
            updateDiv.val(coo.format('d/'));
        }
        this.$div.toggleClass('aladin-reticleColor', isViewCenterPosition);
        updateDiv.toggleClass('aladin-reticleColor', isViewCenterPosition);
	};
	
	return Location;
})();
	


console.log('=============== >  AladinUpdate.js ');

//take out from jsStuff

let Alix_Modalinfo = function(){
	var divId = "modaldiv";
	var divSelect = '#' + divId;
	/**
	 * Resources used by 
	 */
	var aladin = null;
	var divAladinContainer = "aladin-lite-container";
	var divAladin = "aladin-lite-catdiv";
	var divInfoAladin = "aladin-lite-catdiv-info";
	var newWindow;

	var getTitle = function (replacement, title){
		if( title == undefined ) {
			return replacement;
		} else {
			return title;
		}
	};

	var formatMessage = function(message) {
		var retour = "<p>" + message.replace(/\n/g, "<BR>") + "</p>";
		return retour;
	};

	/**
	 * Return the content of the object x as a user readable HTML string
	 */
	var dump = function (x, indent) {
		var indent = indent || '';
		var s = '';
		if (Array.isArray(x)) {
			s += '[';
			for (var i=0; i<x.length; i++) {
				s += dump(x[i], indent);
				//if (i < x.length-1) s += indent +', ';
			}
			s +=indent + ']';
		} else if (x === null) {
			s = 'NULL';
		} else switch(typeof x) {
		case 'undefined':
			s += 'UNDEFINED';
			break;
		case 'object':
			//s += "{ ";
			var first = true;
			for (var p in x) {
				if (!first) {
					if( p != "id" && p != "$" ) s += indent;
					else s += " ";
				} else s += "\n" + indent;
				/*if( p != "id" && p != "$" )*/ s += '<b>'+ p + '</b>: ';
				s += dump(x[p], indent + "  ");
//				s += "\n";
				if( p != "id" && p != "$" ) s += "\n";
//				else s += " " ;
				first = false;
			}
			//s += indent +'}';
			break;
		case 'boolean':
			s += (x) ? 'TRUE' : 'FALSE';
			break;
		case 'number':
			s += x;
			break;
		case 'string':
			if( x.lastIndexOf("http", 0) === 0 ) 
				x = decodeURIComponent(x);
			if( x.match(/\s/))
				s += '"' + x + '"';
			else 
				s += x;
			break;
		case 'function':
			s += '<FUNCTION>';
			break;
		default:
			s += x.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		break;
		}
//		s = s.replace(/{/g,'');
//		s = s.replace(/}/g,'');
		return s;
	};

	/**
	 * Return the content of the object x as a user readable ASCII string
	 */
	var dumpAscii = function (x, indent) {
		var indent = indent || '';
		var s = '';
		if (Array.isArray(x)) {
			s += '[';
			for (var i=0; i<x.length; i++) {
				s += dump(x[i], indent);
				//if (i < x.length-1) s += indent +', ';
			}
			s +=indent + ']';
		} else if (x === null) {
			s = 'NULL';
		} else switch(typeof x) {
		case 'undefined':
			s += 'UNDEFINED';
			break;
		case 'object':
			//s += "{ ";
			var first = true;
			for (var p in x) {
				if (!first) {
					if( p != "id" && p != "$" ) s += indent;
					else s += " ";
				} else s += "\n" + indent;
				/*if( p != "id" && p != "$" )*/ s +=  p + ': ';
				s += dump(x[p], indent + "  ");
//				s += "\n";
				if( p != "id" && p != "$" ) s += "\n";
//				else s += " " ;
				first = false;
			}
			//s += indent +'}';
			break;
		case 'boolean':
			s += (x) ? 'TRUE' : 'FALSE';
			break;
		case 'number':
			s += x;
			break;
		case 'string':
			if( x.lastIndexOf("http", 0) === 0 ) 
				x = decodeURIComponent(x);
			if( x.match(/\s/))
				s += '"' + x + '"';
			else 
				s += x;
			break;
		case 'function':
			s += '<FUNCTION>';
			break;
		default:
			s += x;
		break;		exit;
		}
//		s = s.replace(/{/g,'');
//		s = s.replace(/}/g,'');
		return s;
	};

	// Permits to generate id for the various dialogs
	var last_id = 0;

	var nextId = function(){
		last_id++;
		return "modal-"+last_id;
	};

	/**
	 * Set the black shadow for a dialog
	 * @id: id of the dialog
	 */
	var setShadow = function(id){
		//var z_modal = $("#"+id).parent(".ui-dialog").zIndex();
		var z_modal = $("#"+id).parent(".ui-dialog").css('z-index');
		if($("#shadow").length == 0) {
			$('body').append('<div id="shadow" pos="'+id+'"></div>');
			//$('#shadow').zIndex(z_modal-1);
			$('#shadow').css('z-index', (z_modal-1));
		}
		else {
			$('body').append('<div class="shadow" pos="'+id+'"></div>');
			//$('div[pos="'+id+'"]').zIndex(z_modal-1);
			$('div[pos="'+id+'"]').css('z-index', (z_modal-1));
		}
	};

	/**
	 * Create the dialog
	 * @id: id of the dialog
	 * @resizable: boolean, tell if the dialog can be resizable
	 * @title: string, title of the dialog
	 * @content: string, content of the dialog
	 * @min_size: integer, set a minimal size for the dialog if defined
	 */
	var setModal = function(id, resizable, title, content, min_size){
		if (content == undefined) {
			$('body').append("<div id='"+id+"' title='" + title + "' class='custom-modal'> </div>");
		}
		else {
			$('body').append("<div id='"+id+"' title='" + title + "' class='custom-modal'>" + content + "</div>");
		}

		if (resizable){
			$("#"+id).dialog();
		}
		else {
			if (min_size != undefined) {
				$("#"+id).dialog({
					resizable: false,
					minWidth: min_size,
					position: { my: "center", at: "top", of: window }
				});
			}
			else {
				$("#"+id).dialog({
					resizable: false,
					width: "auto",
					height: "auto"
				});
			}
		}
	};
	// Return the id of the last modal in the page
	var findLastModal = function(){
		
		var id_last_modal = -1;
		$("div[id^='modal-']").each(function() {
			var tmp = $(this).attr('id').substring(6);
			if (tmp > id_last_modal && isNumber(tmp)){
				id_last_modal = $(this).attr('id').substring(6);
			}
		});
		if (id_last_modal != -1) {
			return "modal-"+id_last_modal;
		} else {
			id_last_modal = undefined;
			return id_last_modal;
		}
	};

	/**
	 * Remove the shadow of a dialog
	 * @id: id of the dialog
	 */
	var removeShadow = function(id){
		$('div[pos="'+id+'"]').remove();
	};

	/**
	 * Remove the dialog
	 * @id: id of the dialog
	 */
	var removeModal = function(id){
		$("#"+id).remove();
	};

	/**
	 * When dialog is closed, remove it and its shadow and buttons
	 * @id: id of the dialog
	 */
	var close = function(id){
		if (id != undefined) {
			removeShadow(id);
			removeModal(id);
			removeBtn(id);
		} else {
			// Provoque un stack overflow
			//Modalinfo.close(Modalinfo.findLastModal());
		}

	};

	/**
	 * Remove the div of buttons with the class btndialog
	 * @id: id of the dialog
	 */
	var removeBtn = function(id){
		$('div[btndialog="'+id+'"]').remove();
	};

	/**
	 * Permits to call the function close when we click on the shadow of a dialog or click on its cross
	 * @id: id of the dialog
	 */
	var whenClosed = function(id){
		$('div[pos="'+id+'"]').click(function() {
			close(id);
		});
		$("#"+id).prev("div").find("a.ui-dialog-titlebar-close.ui-corner-all").click(function() {
			close(id);
		});
	};

	// Permits to close a dialog when we press escape
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			if($("#shadow").length != 0) {
				close(findLastModal());
			}
		}
	});

	/**
	 * Add the div of buttons with the class btndialog
	 * @id: id of the dialog
	 */
	var addBtnDialog = function(id) {
		$("#"+id).append('<div class="btn-dialog" btndialog="'+id+'"></div>');
	};

	/**
	 * Add html before the title, used for add glyphicon
	 * @id: id of the dialog
	 * @icon: html content
	 */
	var addIconTitle = function(id, icon) {
		$("#"+id).prev("div").find("span").prepend(icon);
	};

	/**
	 * Add img before the title with a predefined size
	 * @id: id of the dialog
	 * @img: url of the img
	 * @url: link to follow when img is clicked
	 */
	var addImgIconTitle = function(id, img, url) {
		$("#"+id).prev("div").find("span").prepend(' <a href="'+url+'" target="_blank"><img src="'+img+'" alt="Img" class="img-title"></a>');
	};

	/**
	 * Add img after the title with a predefined class
	 * @id: id of the dialog
	 * @class_img: class to display the img
	 * @url: link to follow when img is clicked
	 */
	var addImgLinkTitle = function(id, class_img, url) {
		$("#"+id).prev("div").find("span").append(' <a href="'+url+'" target="_blank" class="'+class_img+'"></a>');
	};

	/**
	 * Add img before the title with personalized size
	 * @id: id of the dialog
	 * @class_img: class to display the img
	 * @url: link to follow when img is clicked
	 */
	var addLogoTitle = function(id, class_img, url) {
		$("#"+id).prev("div").find("span").prepend('<a href="'+url+'" target="_blank" class="'+class_img+'"></a>');
	};

	/**
	 * Add a button "Ok" with a handler in the buttons div
	 * @id: id of the dialog
	 * @handler: handler of the button
	 */
	var addBtnOk = function(id, handler) {
		if (handler == undefined ) {
			var hdl = function(){
				alert("No attached Handler");
			}
		}
		else {
			var hdl = handler;
		}
		$('div[btndialog="'+id+'"]').append(
				$('<a class="btn btn-sm btn-default">Ok</a>').click(function() {
					close(id);
					hdl();
				})
		);
	};

	/**
	 * Add a button "Cancel" which close the dialog in the buttons div
	 * @id: id of the dialog
	 */
	var addBtnCancel = function(id) {
		$('div[btndialog="'+id+'"]').append(
				$('<a class="btn btn-sm btn-warning">Cancel</a>').click(function() {
					close(id);
				})
		);
	};

	/**
	 * Create an info dialog
	 * @content: string, content of the dialog
	 * @title: string, title of the dialog
	 */
	var info = function(content, title) {
		var id_modal = nextId();
		setModal(id_modal, false, getTitle("Information", title), formatMessage(content));
		//addIconTitle(id_modal, '<span class="glyphicon glyphicon-info-sign"></span>');
		setShadow(id_modal);
		whenClosed(id_modal);
	};

	/**
	 * Create an info object dialog
	 * @content: string, content of the dialog
	 * @title: string, title of the dialog
	 */
	var infoObject = function (object, title) {
		var id_modal = nextId();
		setModal(id_modal, false, getTitle("INFO", title), '<pre>' + dump(object, '  ').replace(/[\n]+/g, "<br />") + '</pre>');
		addIconTitle(id_modal, '<span class="glyphicon glyphicon-info-sign"></span>');
		setShadow(id_modal);
		whenClosed(id_modal);
	};

	/**
	 * Create a confirm dialog with buttons ok and cancel
	 * @content: string, content of the dialog
	 * @title: string, title of the dialog
	 */
	var confirm = function (content, handler, title) {
		var id_modal = nextId();
		setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
		addIconTitle(id_modal, '<span class="glyphicon glyphicon-ok-sign"></span>');
		addBtnDialog(id_modal);
		addBtnOk(id_modal, handler);
		addBtnCancel(id_modal);
		setShadow(id_modal);
		whenClosed(id_modal);
	};

	/**
	 * Create an error dialog
	 * @content: string, content of the dialog
	 * @title: string, title of the dialog
	 */
	var error = function(content, title) {
		var id_modal = nextId();
		Alix_Out.infoTrace(content);
		if( jQuery.isPlainObject({}) ) {
			setModal(id_modal, false, getTitle("Error", title), dump(content, '&nbsp;&nbsp;').replace(/\n[\n\s]*/g, "<br />"));//.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
		} else {
			setModal(id_modal, false, getTitle("Error", title), formatMessage(content));
		}
		addIconTitle(id_modal, '<span class="glyphicon glyphicon-remove-sign"></span>');
		setShadow(id_modal);
		whenClosed(id_modal);
	};

	/**
	 * Create an upload dialog
	 * Files can be added with the normal way and with drag & drop 
	 * @title: string, title of the dialog
	 * @url: url of the form
	 * @description: string, description of the form
	 * @handler: action to do if file upload success
	 * @beforehandler: action to do before submit the form
	 * @extraParamers: table, hidden input to add to the form
	 * @preloadedFiles: list of preloaded files which can be reused: to be display as a popup
	 */
	var uploadForm = function (title, url, description, handler, beforeHandler, extraParamers, preloadedFiles) {
		var id_modal = nextId();
		var htmlForm = '<form id="upload-form" class="form-horizontal" target="_sblank" action="' + url + '" method="post"'
		+  'enctype="multipart/form-data">';
		if( extraParamers != null) {
			for( var i=0 ; i<extraParamers.length ; i++ ) 
				htmlForm += "<input type='hidden'  name='" + extraParamers[i].name + "'  value='" + extraParamers[i].value + "'>";
		}
		/*
		 * Set with the filename to upload, allows to keep trace Goodie files which content is not uploaded
		 */
		htmlForm += "<input type='hidden'  name='fileName'  value=''>";
		htmlForm += '<div class="align-center">'
			+'<input class="stdinput custom-file" id="uploadPanel_filename" type="file" name="file"/>'
			+ '<p class="overflow info-upload"></p>'
			+ '<p id="upload_status"></p>'
			+ '<p class="form-description"></p>'
			+ '</div>'
			+ '<p id="infos"></p>'
			+ '<div class="align-center">'
			+ '<input disabled type="submit" value="Upload" class="custom-submit"/>'
			+ '</div>'
			+ '</form>';
		setModal(id_modal, false, title, htmlForm);
		addIconTitle(id_modal,'<span class="glyphicon glyphicon-file"></span>');
		setShadow(id_modal);
		whenClosed(id_modal);
		// Permits drag & drop
		$("#"+id_modal).find(".custom-file").on("dragover drop", function(e) {
			e.preventDefault();
		}).on("drop", function(e) {
			$("#"+id_modal).find(".custom-file")
			.prop("files", e.originalEvent.dataTransfer.files)
			.closest("form");
			$("input").prop('disabled', false);
		});
		/*
		 * Write out description + goodies
		 */
		var fullDesc = (description != null)? description: "";
		if( preloadedFiles != null && preloadedFiles.length > 0) {
			fullDesc += "<br>Preloaded files: <select id=preloadedFiles ><option/>";
			for( var i=0 ; i<preloadedFiles.length ; i++){
				fullDesc += "<option>_Goodies_" + preloadedFiles[i];
			}
			fullDesc += "</select>";
		}
		$("#"+id_modal).find(".form-description").html(fullDesc);
		/*
		 * File upload handler: For security reasons, the visible path is c:/fakepath/filename pas de panique
		 */
		$("#"+id_modal).find(".custom-file").change(function() {            
			$("#"+id_modal).find(".custom-file").fadeTo('slow', 0.3, function(){}).delay(800).fadeTo('slow', 1);
			$("input[value=Upload]").prop('disabled', false);
			var filename = this.value.xtractFilename().filename;
			$("#"+id_modal).find(".info-upload").text(filename);     
			$("input[name=fileName]").val(filename);     
			$("#preloadedFiles").prop('disabled', true);
		});
		/*
		 * Goodies selection handler
		 */
		$("#preloadedFiles").change(function() {
			var si = $( this ).val();
			if( si.length > 0 ){
				$("input[value=Upload]").prop('disabled', false);
				$("#uploadPanel_filename").prop('disabled', true);
			} else {
				$("input[value=Upload]").prop('disabled', true);
				$("#uploadPanel_filename").prop('disabled', false);
			}
			$("input[name=fileName]").val(si);     
		});
		/*
		 * Upload button handler: priority to the goodies
		 */
		$("#"+id_modal).find('#upload-form').ajaxForm({
			beforeSubmit: function() {
				if(beforeHandler != null ) {
					beforeHandler();
				}
			},
			success: function(e) {
				if( Alix_Processing.jsonError(e, "Upload Position List Failure") ) {
					close(id_modal);
					return;
				} else {
					
					$("#upload_status").html("Uploaded");
					$("#upload_status").css("color","green");
					/*
					 * Take the goodies if there are
					 */
					var retour = $( "#preloadedFiles option:selected" ).val();
					/*
					 * Take the file upload otherwise
					 */
					if( retour == null || retour.length == 0 ) {
						retour = $("#"+id_modal).find('#uploadPanel_filename').val();
					}
					/*
					 * @TODO xtractFilename does not return a correct path.
					 */
					obj_retour = {retour: e, path : retour.xtractFilename()};


					if( handler != null) {
						handler(obj_retour);
					}
					// If no handler, displays infos in the dialog
					else {
						var display_retour = dump(obj_retour).replace(/\n/g, "<br />");
						display_retour = display_retour.replace(/^<br\s*\/?>|<br\s*\/?>$/g,'');
						$("#infos").html(display_retour);	
					}
					Alix_Modalinfo.close(id_modal);
				}
			}
		});
	};


	/**
	 * Create an Iframe dialog
	 * @id: id of the dialog
	 * @url: url of the content we want to display
	 */
	var setIframePanel = function (id, url, title) {
		if (title != undefined) {
			$('body').append("<div id='"+id+"' title='" + title + "' class='custom-modal'> </div>");
		} else {
			$('body').append("<div id='"+id+"' title='Preview of " + url + "' class='custom-modal'> </div>");
		}
		$("#"+id).dialog({
			resizable: false
		});

		$("#"+id).append('<iframe src="'+url+'" iframeid="'+id+'">Waiting on server response...</iframe>');		

		$("#"+id).dialog( "option", "height", $(window).height());
		$("#"+id).dialog( "option", "width", "80%");	
		$("#"+id).dialog( "option", "position", { my: "center", at: "center", of: window } );	
	};
	/**
	 * Create an  dialog showing a local
	 * @id: id of the dialog
	 * @url: url of the content we want to display
	 */
	var setURLPanel = function (id, url, title) {
		if (title != undefined) {
			$('body').append("<div id='"+id+"' title='" + title + "' class='custom-modal'> </div>");
		} else {
			$('body').append("<div id='"+id+"' title='Preview of " + url + "' class='custom-modal'> </div>");
		}
		$("#"+id).dialog({
			resizable: false
		});

		$("#"+id).append('<div id="'+id+'">Waiting on server response...</iframe>');		

//		$("#"+id).dialog( "option", "height", $(window).height());
		$("#"+id).dialog( "option", "width", "80%");	
		$("#"+id).dialog( "option", "position", { my: "center", at: "center", of: window } );	
		$("#"+id).load(url);
	};

	/**
	 * Used to display an img in the iframe dialog if the iframe content is an img
	 * @id: id of the dialog
	 * @url: url of the img we want to display
	 */
	var setImagePanel = function (id, url, title) {
		if (title != undefined) {
			$('body').append("<div id='"+id+"' title='" + title + "' class='custom-modal img-panel'> </div>");
		} else {
			$('body').append("<div id='"+id+"' title='Preview of " + url + "' class='custom-modal img-panel'> </div>");
		}

		$("#"+id).dialog({
			resizable: false
		});

		$("#"+id).append('<img imgpanelid="'+id+'" src="'+url+'"\>');

		$('img[imgpanelid="'+id+'"]').load(function(){
			setSize(id);
		});

	};

	// Used to adjust the size of the dialog with the image's size
	var setSize = function(id) {
		var h = $("#"+id).prop("scrollHeight");
		var w = $("#"+id).prop("scrollWidth");
		var width = w+30;
		var height = h+60;
		$("#"+id).dialog( "option", "height", height);
		$("#"+id).dialog( "option", "width", width);
		$("#"+id).dialog( "option", "position", { my: "center", at: "center", of: window } );	
	};

	/**
	 * Test if an url comes from the same domain
	 * @url: url we want to test
	 */
	function testSameOrigin(url) {
		var loc = window.location;
		var a = document.createElement('a');

		a.href = url;

		return a.hostname == loc.hostname &&
		a.port == loc.port &&
		a.protocol == loc.protocol;
	};

	/**
	 * You cannot catch errors that occur in an iframe with a different origin. 
	 * Those errors are occurring in a different context which is not your parent page.
	 */

	/**
	 * Create an iframe dialog
	 * @url: string, the url content we want to show
	 * @img: boolean, tell if the content is an img
	 */
	var openIframePanel = function (content, img) {
		var id_modal = nextId();

		if (content.url != undefined) {
			var url = content.url;
			var title = content.title;
		} else {
			var url = content;
			var title = undefined;
		}

		/*
		 * Open an iframe with an adpated size if img is defined
		 */
		if (img != undefined && img == true) {
			setImagePanel(id_modal, url, title);
		}
		else {
			setIframePanel(id_modal, url, title);
		}
		addImgLinkTitle(id_modal, 'floppy', url);
		$("#"+id_modal).prev("div").find("span").find(".img-title").click(function() {
			Alix_PageLocation.changeLocation(url);
		});

		setShadow(id_modal);
		whenClosed(id_modal);
	};

	/**
	 * Create an iframe dialog if the url comes from the same domain
	 * Otherwise, open a new page
	 * @url: string, the url content we want to show
	 * @img: boolean, tell if the content is an img
	 */
	var openIframeCrossDomainPanel = function(content, img) {
		var id_modal = nextId();

		if (content.url != undefined) {
			var url = content.url;
			var title = content.title;
		} else {
			var url = content;
			var title = undefined;
		}

		if (testSameOrigin(url)) {
			/*
			 * Open an iframe with an adpated size if img is defined
			 */
			if (img != undefined && img == true) {
				setImagePanel(id_modal, url, title);
			}
			else {
				//setIframePanel(id_modal, url, title);
				setURLPanel(id_modal, url, title)
			}
			addImgLinkTitle(id_modal, 'floppy', url);
			$("#"+id_modal).prev("div").find("span").find(".img-title").click(function() {
				Alix_PageLocation.changeLocation(url);
			});
			setShadow(id_modal);
			whenClosed(id_modal);	
		} else {
			Alix_PageLocation.changeLocation(url);
		}
	};


	// Create a simbad dialog
	var simbad = function (pos) {
		Alix_Processing.show("Waiting on Simbad Response");
		$.getJSON("simbadtooltip", {pos: pos}, function(jsdata) {
			Alix_Processing.hide();
			if( Alix_Processing.jsonError(jsdata, "Simbad Tooltip Failure") ) {
				return;
			} else {
				var table = "";
				table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
				var id_modal = nextId();
				//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
				setModal(id_modal, false, "Simbad Summary for Position " 
						+ pos 
						+ "<a class=simbad target=blank href=\"http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
						+ encodeURIComponent(pos) + "\"></a>"
						, table, 1000);
				setShadow(id_modal);
				whenClosed(id_modal);

				$("#"+id_modal).css("overflow","hidden");

				var options = {
						"aoColumns" : jsdata.aoColumns,
						"aaData" : jsdata.aaData,
						"bPaginate" : true,
						"sPaginationType": "full_numbers",
						"aaSorting" : [],
						"bSort" : false,
						"bFilter" : true,
						"bAutoWidth" : true,
						"bDestroy" : true
				};

				var img;

				if( jsdata.aaData.length > 0 ) {
					img = '<img src="http://alasky.u-strasbg.fr/cgi/simbad-thumbnails/get-thumbnail.py?name=' 
						+ encodeURIComponent((jsdata.aaData[0])[0]) + '"/>';
				} else {		var divAladin = "aladin-lite-catdiv";
				var divInfoAladin = "aladin-lite-catdiv-info";

				img = '<span class="help">No vignette available</span>';
				}

				var position = [
				                { "name": img,
				                	"pos": "top-left"
				                },
				                { "name": "filter",
				                	"pos": "top-right"
				                },
				                { "name": 'information',
				                	"pos" : "bottom-left"
				                },
				                { "name": "pagination",
				                	"pos" : "bottom-center"
				                },
				                { "name": " ",
				                	"pos" : "bottom-right"
				                }
				                ];

				Alix_CustomDataTable.create("simbadtable", options, position);

				// Put the filter just above the table
				$("#"+id_modal).find(".dataTables_filter").css("margin-top","34%");
				$("#"+id_modal).dialog( "option", "position", { my: "center", at: "center", of: window } );
			}
		});
	};
	
	var SimbadCatalog = function (data) {
		var table = "";
		table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
		var id_modal = nextId();
		//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
		setModal(id_modal, false, "Simbad Summary for Position " 
				+ pos 
				+ "<a class=simbad target=blank href=\"http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
				+ encodeURIComponent(pos) + "\"></a>"
				, table, 1000);
		setShadow(id_modal);
		whenClosed(id_modal);
		/**
		 ** part of VizierCatalog
		 */
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var pos = strlon+" " +strlat;
		var content = '<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
		if( data.data != undefined){
	    	for (key in data.data){
		    	if(data.data[key])
		    		content+='<tr style="background-color:#ffeded;"><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
		    }
	    }
	    else{
	    	for (key in data){
		    	if(data[key])
		    		content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
		    }
	    }
	    content += '</table></div></div>';
		/**
		 * Translate SimbadTooltip.java
		 */
		var url = "http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
		url += encodeURIComponent("format object \"%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)\"\n" + pos + " radius=1m", "ISO-8859-1");
		//Alix_Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			//url:'http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=format+object+%22%25IDLIST%5B%25-30*%5D%7C-%25COO%28A%29%7C%25COO%28D%29%7C%25OTYPELIST%28S%29%22%0A01+33+50.904+%2B30+39+35.79+radius%3D1m',
			url: url,
			method: 'GET',
	        async: true,
	        dataType: 'text',
	        success: function(jsdata){
				//Alix_Processing.hide();
				
				var boeuf;
				var data_found = false;
				var json = {};
				var dataarray = [];
				var colarray = [];
				var jsloc1 = {};
				jsloc1["sTitle"]="ID";
				colarray.push(jsloc1);
				var jsloc2 = {};
				jsloc2["sTitle"]="Position";
				colarray.push(jsloc2);
				var jsloc3 = {};
				jsloc3["sTitle"]="Type";
				colarray.push(jsloc3);
				json["aoColumns"]=colarray;
				var datasize = 0;
				var lines = jsdata.split("\n");
				var i = 0;
				while ((boeuf = lines[i]) != undefined){
					if(data_found){
						var fields = boeuf.trim().split("|", -1);
						let pos = fields.length - 1;
						if( pos >= 3 ) {
							var type = fields[pos]; pos--;
							var dec = fields[pos]; pos--;
							var ra = fields[pos];
							/*
							 * Takes the first alias
							 */
							var id =  fields[0].split(/\s{2,}/)[0].trim();
							var darray = [];
							darray.push(id.trim());
							darray.push(ra + " " + dec);
							darray.push(type.trim());
							dataarray.push(darray);
							datasize++;
							if( datasize >= 15 ) {
								var darray = [];
								darray.push("truncated to 15");
								darray.push("");
								darray.push("");
								dataarray.push(darray);
								datasize++;									
							}
						}
					}
					else if(boeuf.startsWith("::data")){
						data_found = true;
					}
					i++;
				}
				json["aaData"] = dataarray;
				json["iTotalRecords"]= datasize;
				json["iTotalDisplayRecords"] = datasize;
				
				if( Alix_Processing.jsonError(json, "Simbad Tooltip Failure") ) {
					return;
				} else {
					var table = "";
					table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
					var id_modal = nextId();
					//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
					setModal(id_modal, false, "Simbad Summary for Position " 
							+ pos 
							+ "<a class=simbad target=blank href=\"http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
							+ encodeURIComponent(pos) + "\"></a>"
							, table, 1000);
					setShadow(id_modal);
					whenClosed(id_modal);

					$("#"+id_modal).css("overflow","hidden");

					var options = {
							"aoColumns" : json.aoColumns,
							"aaData" : json.aaData,
							"bPaginate" : true,
							"sPaginationType": "full_numbers",
							"aaSorting" : [],
							"bSort" : false,
							"bFilter" : true,
							"bAutoWidth" : true,
							"bDestroy" : true
					};

					var img;

					/*if( json.aaData.length > 0 ) {
						img = '<img src="http://alasky.u-strasbg.fr/cgi/simbad-thumbnails/get-thumbnail.py?name=' 
							+ encodeURIComponent((json.aaData[0])[0]) + '"/>';
					} else {		var divAladin = "aladin-lite-catdiv";
					var divInfoAladin = "aladin-lite-catdiv-info";

					img = '<span class="help">No vignette available</span>';
					}*/

					var position = [
					                { "name": img,
					                	"pos": "top-left"
					                },
					                { "name": "filter",
					                	"pos": "top-right"
					                },
					                { "name": 'information',
					                	"pos" : "bottom-left"
					                },
					                { "name": "pagination",
					                	"pos" : "bottom-center"
					                },
					                { "name": " ",
					                	"pos" : "bottom-right"
					                }
					                ];

					Alix_CustomDataTable.create("simbadtable", options, position);
					$("#simbadtable_next").text("&nbsp;&nbsp;&nbsp;");
					$("#simbadtable_previous").text("&nbsp;&nbsp;&nbsp;");
					$("#simbadtable_paginate").css("left","250px");
					$(".txt-left").remove();	
					// Put the filter just above the table
					$("#"+id_modal).find(".dataTables_filter").css("margin-top","34%");
					$("#"+id_modal).find(".dataTables_filter").css("position","absolute");
					$("#"+id_modal).find(".dataTables_filter").css("left","1000px");
					$("#"+id_modal).find(".dataTables_filter").css("top","-394px");
					$("#"+id_modal).find(".dataTables_filter").css("z-index","1");
					var dataFilter = $("#"+id_modal).find(".dataTables_filter");
					var search = '<div id="simbadtable_search" style="font-size:15px;font-family:sans-serif;position:relative;right:180px;bottom:22px">search: </div>';
					$("#simbadtable_filter").append(search);
					$("#"+id_modal).dialog( "option", "position", { my: "center", at: "center", of: window } );
					//add the SourceDiv to SimbadCatalog and adjust the css
					var parent = $("#"+id_modal).parent("div");
					parent.append(content);
					parent.append(dataFilter);
					parent.css("width","1300px");
					parent.css("height","390px");
					$("#"+id_modal).css("width","1000px");
					$("#"+id_modal).css("left","298px");
					$("#"+id_modal).css("top","15px");
					var SourceDiv = $("#SimbadSourceDiv");
				    SourceDiv.css("display","block");
				    SourceDiv.css("position","absolute");
				    SourceDiv.css("top","70px");
				    SourceDiv.css("left","0px");
				    SourceDiv.css("background-color","#ffeded");
				}
	        }
		});
	}
	
	this.regionEditor = null;
	
	// Create a region dialog
	region = function (handler, points) {
		var id_modal = nextId();
		$(document.documentElement).append('<div id="'+id_modal+'" class="aladin-lite-div" style="width: 400px; height: 400px"></div>');
		this.regionEditor = new RegionEditor_mVc  (id_modal, handler, points); 
		this.regionEditor.init();
		$('#'+id_modal).dialog({ width: 'auto'
			, dialogClass: 'd-maxsize'
				, title: "Sky Region Editor (beta)" 		  
					, zIndex: zIndexModalinfo
		});
		setShadow(id_modal);
		whenClosed(id_modal);
		/*
		 * For the Aladin command panel to be on the top layer: so it is enable to get all events
		 */
		$(".aladin-box").css("z-index", (9999));
		this.regionEditor.setInitialValue(points);
	}

	// Close the region dialog
	var closeRegion  = function (){
		$('div[pos="'+$('.aladin-lite-div').attr("id")+'"]').remove();
		$('.aladin-lite-div').remove();
	}

	// Used by the stc region dialog to create it
	var commandPanelAsync = function (title, htmlContent, openHandler, closeHandler) {
		var id_modal = nextId();
		$('body').append("<div id='"+id_modal+"' class='aladin-lite-stcdiv'></div>");
		var chdl = ( closeHandler == null )? function(ev, ui)  {}: closeHandler;
		var ohdl = ( openHandler == null )? function(ev, ui)  {}: openHandler;
		$("#"+id_modal).html(htmlContent);
		$("#"+id_modal).dialog({resizable: false
			, width: 'auto'
				, title: title
				, close: chdl
				, open: ohdl
		});
		setShadow(id_modal);
		whenClosed(id_modal);
	};


	// Class for the datapanel
	var divClass        = 'modalinfodiv';
	var divSelect = '.' + divClass;

	// @@@@@@@@@@@@@@@@@@
	var dataURLPanel = function (title, url) {		
		if($(divSelect).length != 0){
			$(divSelect).html('');
			$(divSelect).load(url);


			var chdl =  function(ev, ui)  {$(divSelect).html("");};
			$(divSelect).on( "dialogclose", chdl);
			$('div[pos="'+$(divSelect).attr("id")+'"]').on("click", chdl);

			var ii = $(divSelect).attr("id");
			var last = findLastModal();
			$(document).on("keydown", function(e) { 
				if (e.keyCode == 27) { 
					if (last == ii) {
						chdl();
					}
				} 
			});
		} else {
			// Permits to the dialog to be in foreground
			var new_zindex = 9999;
			if ($(".modalresult").length != 0) {
				new_zindex = $(".modalresult").zIndex() + 10;
			}
			var id_modal = nextId();
			$(document.documentElement).append('<div id="'+id_modal+'" class="'+divClass+'" style="display: none; width: auto; hight: auto;"></div>');

			var chdl = function(ev, ui)  {$("#"+id_modal).html("");};
			$("#"+id_modal).load(url);
			$("#"+id_modal).dialog({ width: 'auto'
				, dialogClass: 'd-maxsize'
					, title: title
					, fluid: true
					, close: chdl
					, resizable: false});


			// Adjust the size of the panel to be responsive
			if ($("#"+id_modal).find("h4").find("#detailhisto").length) {
				if ($(window).width() >= 1000) {
					$("#"+id_modal).dialog( "option", "width", 1000 );
					center();
				} else {
					fluidDialog();
				}
			}

			$("#"+id_modal).zIndex(new_zindex);	
			$('div[pos="'+$(divSelect).attr("id")+'"]').on("click", chdl);

			var ii = $(divSelect).attr("id");
			var last = findLastModal();
			$(document).on("keydown", function(e) { 
				if (e.keyCode == 27) {
					if (last == ii) {
						chdl();
					}
				} 
			});
			setShadow(id_modal);
			whenClosed(id_modal);
		}
	};

	// Create a dialog which can display html and have personalized handler on close
	var dataPanel = function (title, htmlContent, closeHandler, bgcolor) {		
		if($(divSelect).length != 0){
			$(divSelect).html('');
			$(divSelect).html(htmlContent);

			$(divSelect).css("background-color", bgcolor);

			var chdl = ( closeHandler == null )? function(ev, ui)  {$(divSelect).html("");}: closeHandler;
			$(divSelect).on( "dialogclose", chdl);
			$('div[pos="'+$(divSelect).attr("id")+'"]').on("click", chdl);

			var ii = $(divSelect).attr("id");
			var last = findLastModal();
			$(document).on("keydown", function(e) { 
				if (e.keyCode == 27) { 
					if (last == ii) {
						chdl();
					}
				} 
			});
		}
		else {
			// Permits to the dialog to be in foreground
			var new_zindex = 9999;
			if ($(".modalresult").length != 0) {
				new_zindex = $(".modalresult").zIndex() + 10;
			}
			var id_modal = nextId();
			$(document.documentElement).append('<div id="'+id_modal+'" class="'+divClass+'" style="display: none; width: auto; hight: auto;"></div>');

			var chdl = ( closeHandler == null )? function(ev, ui)  {$("#"+id_modal).html("");}: closeHandler;
			if( bgcolor != null ) {
				$("#"+id_modal).css("background-color", bgcolor);
			}
			$("#"+id_modal).html(htmlContent);
			$("#"+id_modal).dialog({ width: 'auto'
				, dialogClass: 'd-maxsize'
					, title: title
					, fluid: true
					, close: chdl
					, resizable: false});


			// Adjust the size of the panel to be responsive
			if ($("#"+id_modal).find("h4").find("#detailhisto").length) {
				if ($(window).width() >= 1000) {
					$("#"+id_modal).dialog( "option", "width", 1000 );
					center();
				}
				else {
					fluidDialog();
				}
			}

			$("#"+id_modal).zIndex(new_zindex);	
			$('div[pos="'+$(divSelect).attr("id")+'"]').on("click", chdl);

			var ii = $(divSelect).attr("id");
			var last = findLastModal();
			$(document).on("keydown", function(e) { 
				if (e.keyCode == 27) {
					if (last == ii) {
						chdl();
					}
				} 
			});
			setShadow(id_modal);
			whenClosed(id_modal);
		}
	};

	var closeDataPanel = function() {
		close($(divSelect).attr("id"));
	};

	/**
	 * These next functions are used to make a panel responsive
	 **/

	// Run function on all dialog opens
	$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
		// TODO Alix_Modalinfo.fluidDialog();
	});

	// Remove window resize namespace
	$(document).on("dialogclose", ".ui-dialog", function (event, ui) {
		$(window).off("resize.responsive");
	});

	// Manage the responsive side of some dialogs
	var fluidDialog = function fluidDialog() {
		var $visible = $(".ui-dialog:visible");
		// each open dialog
		$visible.each(function () {
			var $this = $(this);
			var dialog = $this.find(".ui-dialog-content").data("dialog");
			// if fluid option == true
			if (dialog && dialog.options.maxWidth && dialog.options.width) {
				// fix maxWidth bug
				$this.css("max-width", dialog.options.maxWidth);
				//reposition dialog
				dialog.option("position", dialog.options.position);
			}

			if (dialog && dialog.options.fluid) {
				// namespace window resize
				$(window).on("resize.responsive", function () {
					var wWidth = $(window).width();
					// check window width against dialog width
					if (wWidth < dialog.options.maxWidth + 50) {
						// keep dialog from filling entire screen
						$this.css("width", "90%");
					}
					//reposition dialog
					dialog.option("position", dialog.options.position);
				});
			}

		});
	}

	var getHtml = function() {
		return $(divSelect).html();
	};

	// Puts the datapanel in the center of the window
	var center = function() {
		var parent = $(divSelect).parent();
		parent.css("position","absolute");
		parent.css("top", Math.max(0, (($(window).height() - parent.outerHeight()) / 2) + 
				$(window).scrollTop()) + "px");
		parent.css("left", Math.max(0, (($(window).width() - parent.outerWidth()) / 2) + 
				$(window).scrollLeft()) + "px");
	};

	var showPopup = function(position){
		// mettre la position donnees en parametre
		
		//Cas 1 Div n'existe pas, creer la div et demarrer Alix dedans
		if($("#aladin-lite-div").length<=0){
			$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
			var masTest = {
					defaultView: {
						defaultSurvey: "DSS colored",
					}	
			};
			configureALIX (masTest);
			AladinLiteX_mVc.popup();
			// autrement sir le dialog est ferme, la rendre visible
		} else if( !$("#aladin-lite-div").dialog("isOpen")){
			AladinLiteX_mVc.popup();
		}
		if(position!=undefined)
			AladinLiteX_mVc.gotoPositionByName(position);
	};
	
	var changeRefBlue = function(position,value){
		if($("#aladin-lite-div").length<=0){
			$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
			var masTest = {
					defaultView: {
						defaultSurvey: "DSS colored",
					}	
			};
			configureALIX (masTest);
			AladinLiteX_mVc.popup();
			// autrement sir le dialog est ferme, la rendre visible
		} else if( !$("#aladin-lite-div").dialog("isOpen")){
			/*$("#aladin-lite-div").closest('.ui-dialog-content').dialog('close'); 
			$("#aladin-lite-div").remove();
			$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
			var masTest = {
					defaultView : {
		    	        defaultSurvey: "DSS colored",
		     	        field: {
		     	        	position:"01 33 50.904 +30 39 35.79",
		     	        	defaultFov: "0.5"
		     	        },
						region: {
			        		type:"array",
			        		value:value
		 				}
					}		
			};
			configureALIX (masTest);*/
			AladinLiteX_mVc.popup();
		}
		if(value!=undefined){
			var region = {
				type:"array",
	        	value:value
			}
			AladinLiteX_mVc.setRegion(region);
			AladinLiteX_mVc.gotoPositionByName(position);
		}
			
	};
	var confData = {
			parentDivId: "aladin-lite-div",
			defaultView: {
				defaultSurvey: "DSS colored",
				field: {
					position: "M33",
					defaultFov: "0.5",
				},
				panelState: true
			},
			controllers: {
				historic: { },
				regionEditor: { },
				hipsSelector: { }
			}
	};
	 var mixConf = function(localData,externalData) {      
		 for(var key in externalData){
		 	if(typeof(externalData[key])== "object" && localData[key])
		 		{
		 			externalData[key] = mixConf(localData[key],externalData[key])
		 		}
		 }
		return Object.assign(localData,externalData)
	}
	
	var pblc = {};
	pblc.dump = dump;
	pblc.dumpAscii = dumpAscii;
	pblc.nextId = nextId;
	pblc.findLastModal = findLastModal;
	pblc.setShadow = setShadow;
	pblc.whenClosed = whenClosed;
	pblc.setModal = setModal;
	pblc.close = close;
	pblc.info = info;
	pblc.infoObject = infoObject;
	pblc.confirm = confirm;
	pblc.error = error;
	pblc.uploadForm = uploadForm;
	pblc.openIframePanel = openIframePanel;
	pblc.openIframeCrossDomainPanel = openIframeCrossDomainPanel;
	pblc.iframePanel = openIframePanel;
	pblc.simbad = simbad;
	pblc.region = region;
	pblc.closeRegion = closeRegion;
	pblc.dataPanel = dataPanel;
	pblc.closeDataPanel = closeDataPanel;
	pblc.fluidDialog = fluidDialog;
	pblc.getHtml = getHtml;
	pblc.center = center;
	pblc.addIconTitle=addIconTitle;
	pblc.SimbadCatalog=SimbadCatalog;
	pblc.showPopup = showPopup;
	pblc.changeRefBlue = changeRefBlue;
	return pblc;

}();
console.log('=============== >  Alix_Modalinfo.js ');

//take out from jsStuff

let Alix_Out = function() {
	var debugMode = false;
	var trace = false;
	var packedMode = false;
	/*
	 * Privates functions
	 */
	var printMsg = function (level, msg, withTrace) {
		if( !packedMode ){
			var e = new Error('dummy');	
			var stk;
			//console.log(level + ": " + msg);
			/*
			 * IE ignore the stack property of the object Error
			 */
			if( withTrace && (stk = e.stack) != null ) {
				var ls = stk.split("\n");
				/*
				 * Always display the 4th lines of the stack
				 * The 3rd is the current line : not relevant
				 * The 4th refers to the caller
				 */
				for( var i=3 ; i<ls.length ; i++ ) {
					//if( i == 3) continue;
					//console.log(ls[i]);
					if( i > 3 && ! withTrace) break;
				}
			}
		}
	};
	/*
	 * Public functions
	 */
	var setPackedMode = function() {
		debugModeOff();
		traceModeOff();
		packedMode = true;
	};
	var traceOn = function() {
		packedMode = false;
		trace = true;
	};
	var traceOff = function() {
		trace = false;
	};
	var debugModeOn = function() {
		packedMode = false;
		debugMode = true;
	};
	var debugModeOff = function() {
		debugMode = false;
	};
	var debugMsg = function (msg) {
		if( debugMode ) printMsg("DEBUG", msg, false);
	};
	var debugTrace = function (msg) {
		if( debugMode ) printMsg("DEBUG", msg, true);
	};
	var debug = function (msg) {
		if( debugMode ) printMsg("DEBUG", msg, trace);
	};
	var infoMsg = function infoMsg(msg) {
		printMsg(" INFO", msg, false);
	};
	var infoTrace  =function (msg) {
		printMsg(" INFO", msg, true);
	};
	var info  =function (msg) {
		printMsg(" INFO", msg, trace);
	};
	var setdebugModeFromUrl = function() {
		/*
		 * Set the debug mode from the debug parameters
		 */
		var debug  =  (RegExp('debug=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
		debugModeOff();
		traceOff();

		if( debug != null ) {
			if( debug == "on" ) {
				Alix_Out.info("Set debug on and trace off");
				Alix_Out.debugModeOn();
				Alix_Out.traceOff();
			} else if( debug == "withtrace" ) {
				Alix_Out.info("Set debug on and trace on");
				Alix_Out.debugModeOn();
				Alix_Out.traceOn();
			} else if( debug == "traceonly" ) {
				Alix_Out.info("Set debug off and trace on");
				Alix_Out.debugModeOff();
				Alix_Out.traceOn();
			} else {
				Alix_Modalinfo.info("debug parameter must be either on, withtrace or traceonly. It is ignored for this session.");
			}
		}
	};

	/*
	 * Exports
	 */
	var pblc = {};
	pblc.debugMsg     = debugMsg;
	pblc.debugTrace   = debugTrace;
	pblc.infoMsg      = infoMsg;
	pblc.infoTrace    = infoTrace;
	pblc.info         = info;
	pblc.debugModeOn  = debugModeOn;
	pblc.debugModeOff = debugModeOff;
	pblc.debug        = debug;
	pblc.traceOn      = traceOn;
	pblc.traceOff     = traceOff;
	pblc.setPackedMode = setPackedMode;
	pblc.setdebugModeFromUrl = setdebugModeFromUrl;
	return pblc;
}();
console.log('=============== >  Alix_Out.js ');

/**
 * Loads automatically all css scripts used by saadahsbasics
 * Files are loaded one by one keeping that wy the initial order.
 * That make sure not to  break dependencies or style rules overriding
 * 
 * This class is a JS singleton.
 */
packedResourceLoader = function() {
	if( !productionMode ) return;
	/*
	 * JS directories and files
	 */

	var js = new Array();  // global list of JS to load


	var css = new Array();// global list of CSS to load
	var CssOver = false; // true when all CSS are loaded (can start JS loading)

	
	/**
	 * Recursive function loading the first script of the list
	 */
	var loadNextScript = function() {
		var script = document.createElement("script");
		var head = document.getElementsByTagName('HEAD').item(0);
		script.onload = script.onreadystatechange = function() {
			console.log(js[0] + " script loaded " + CssOver);
			js.shift();
			if( js.length > 0 ) loadNextScript();
		};
		script.src = js[0];
		script.type = "text/javascript";
		head.appendChild( script);
	};
	/**
	 * Recursive function loading the first CSS of the list
	 */
	loadNextCss = function() {
		var  href = css[0];
		$.ajax({
			url: href,
			dataType: 'text',
			success: function(){        
				$('<link rel="stylesheet" type="text/css" href="'+href+'" />').appendTo("head");
				console.log(href + " CSS loaded " + CssOver);
				css.shift();
				if( css.length > 0 ) loadNextCss();
				else {
					CssOver = true;
				}
			},
			error : function(jqXHR, textStatus,errorThrown) {
				console.log("Error loading " +  href + " "  + textStatus);

			}
		});

	};
	/**
	 * Start to load JS scripts after the CSS loading is completed
	 */
	var loadScripts = function() {
		if( !CssOver) {
			setTimeout(function() {loadScripts();}, 100);
			return;
		}	else {	
			loadNextScript();
		}
	};

	/***************
	 * externalscripts: array of scripts to be loaded after jsresources 
	 */
	/**
	 * Stores the list of user JS scripts to load
	 * and build the global list of resource to load
	 */
	var setScripts = function(externalscripts) {
		js.push.apply(js, externalscripts);
	};
	/**
	 * Stores the list of client CSS files to load
	 * and build the global list of resource to load
	 */
	var setCss = function(externalcss) {
		js.push.apply(css, externalcss);
	};
	/**
	 * Load all resources: must be invoked from the HTML page
	 */
	var loadAll = function() {
		loadNextCss();
		loadScripts();
	};

	var jss = {};
	jss.loadAll = loadAll;
	jss.setScripts = setScripts;
	jss.setCss = setCss;
	return jss;
}();
console.log('=============== >  packedLoader.js ');

//take out from jsStuff

let Alix_PageLocation = function () {
	var that = this;
	var downloadIframe = null;
	/*
	/*
	 * Public functions
	 */
	var changeLocation = function (url, title){
		Alix_Out.info("changeLocation to " + url);
		authOK = true;
		var t = ( title )? title: '_blank';
		window.open (url, t);
	};
	var download = function (url){
		authOK = true;
		if( !url.startsWith("http")) {
			url = window.location.protocol + "//" + window.location.hostname +  (location.port?":"+location.port:"") + window.location.pathname + "/" + url; 
		}
		Alix_Out.info("Download " + url);
		if( downloadIframe == null ) {
			$(document.body).append('<iframe id="downloadIframe" src="' + url + '" style="display: hiddden;">Waitng for server response...</iframe>');
			this.downloadIframe =  $("#downloadIframe");
		} else {
			this.downloadIframe.attr("src", url);
		}
	};
	var confirmBeforeUnlaod = function() {
		Alix_Out.info("Prompt user before to leave");
		window.onbeforeunload = function() {
			if( !that.authOK) {
				if( WebSamp_mVc.fireIsConnected() ) {
					WebSamp_mVc.fireUnregister();
				}
				return  'WARNING: Reloading or leaving this page will lost the current session';
			} else {
				that.authOK = false;
			}
		};
	};
	/*
	 * exports
	 */
	var pblc = {};
	pblc.download   = download;
	pblc.changeLocation   = changeLocation;
	pblc.confirmBeforeUnlaod   = confirmBeforeUnlaod; // oupps type
	pblc.confirmBeforeUnload   = confirmBeforeUnlaod;
	return pblc;
}();
console.log('=============== >  Alix_PageLocation.js ');

//take out from jsStuff

let Alix_Printer = function() {
	/*
	 * Public functions
	 */
	var getPrintButton = function(divToPrint) {
		var retour =  "<a href='#' onclick='Alix_Printer.printDiv(\"" + divToPrint + "\");' class='printer'></a>";
		return retour;
	};
	var getSmallPrintButton = function(divToPrint) {
		var retour =  "<a href='#' onclick='Alix_Printer.printDiv(\"" + divToPrint + "\");' class='dlprinter'></a>";
		return retour;
	};
	var insertPrintButton = function(divToPrint, divHost) {
		$("#" + divHost).append(printer.getPrintButton(divToPrint));
	};
	var printDiv = function(divSelect) {
		var ele = $('#' + divSelect);
		if( !ele ) {
			Alix_Modalinfo.error("PRINT: the element " + divSelect +" doesn't exist");
		} else {
			Alix_Out.infoMsg(ele);
			ele.print();
		}		
	};
	/*
	 * exports
	 */
	var pblc = {};
	pblc.getPrintButton  = getPrintButton;
	pblc.getSmallPrintButton  = getSmallPrintButton;
	pblc.insertPrintButton = insertPrintButton;
	pblc.printDiv = printDiv;
	return pblc;
}();
console.log('=============== >  Alix_Printer.js ');

//take out from jsStuff
var zIndexProcessing = 4000;
let Alix_Processing  = function() {
	/*
	 * public functions
	 */
	var openTime = -1;	
	var jsonError = function (jsondata, msg, custom_msg) {
		if( jsondata == undefined || jsondata == null ) {
			Alix_Modalinfo.error("JSON ERROR: " + msg + ": no data returned" );
			return true;
		}
		else if( jsondata.errormsg != null) {
			if (custom_msg == undefined) {
				Alix_Modalinfo.error(jsondata.errormsg, msg );
			}
			else {
				Alix_Modalinfo.error(custom_msg);
			}
			return true;
		}	
		return false;
	};
	var showAndHide = function(message){
		Alix_Out.debug("PROCESSSING (show and hide) " + message);
		show(message);
		setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");', 500);		
	};
	var showWithTO = function(message, timeout){
		Alix_Out.debug("PROCESSSING (show and hide) " + message);
		show(message +" (automatically closed after " + (timeout/1000.) + "s)");
		setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");', timeout);		
	};

	var show = function (message) {
		/*
		 * String is, duplcated because if it comes from aJSON.stringify, the content of the JSON object may be altered
		 */
		var m = message;
		m = m.replace(/"/g, '');
		Alix_Out.info("PROCESSSING " + m);
		stillToBeOpen = true;
		if( $('#saadaworking').length == 0){	
			$(document.body).append(
					'<div id="saadaworking" style="margin: auto;padding: 5px; display: none;z-index: ' + zIndexProcessing 
					+ ';opacity: 0.5;top: 0; right: 0; bottom: 0; left: 0;background-color: black;position: fixed;"></div>'
					+ '<div id="saadaworkingContent" style="position:absolute; top:50%;margin-top:-22px;'
					+ ' width: 300px;  margin-left: -150px; left: 50%; background-color: white; opacity: 1;z-index: ' 
					+ (zIndexProcessing+1) + ';'
					+ ' border:5px solid #DDD; border-radius: 5px"></div>');
		}
		$('#saadaworkingContent').html("<div class=progresslogo>" 
				+ "</div><div id=saadaworkingContentText class=help style='margin-top: 8px; display: inline; width: 240px; float:left; padding: 5px;font-size: small;'>" 
				+ m + "</div>");
		$('#saadaworking').css("display", "inline");
		$('#saadaworkingContent').css("display", "inline");
		openTime = new Date().getTime() ;
	};
	var hide = function () {
		Alix_Out.debug("close processing");
		var msg = $("#saadaworkingContentText").text();
		var seconds = new Date().getTime() ;
		/*
		 * Make sure the progress windows remains open at least 700ms: avoids blinking
		 */
		if( (seconds - openTime) < 700 ) {
			setTimeout('Alix_Processing.closeIfNoChange("' + msg + '" )', 700);
		} else    {
			$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");
		}
	};
	var closeIfNoChange = function(lastMsg){
		var currentMsg = $("#saadaworkingContentText").text();
		if( currentMsg == lastMsg) {
			$('#saadaworking').css("display", "none");
			$('#saadaworkingContent').css("display", "none");	
		} else {
			Alix_Out.debug("The content of the progress dialog has changed: not closing it");
		}
	};
	/*
	 * exports
	 */
	var pblc = {};
	pblc.show   = show;
	pblc.hide   = hide;
	pblc.closeIfNoChange   = closeIfNoChange;
	pblc.jsonError   = jsonError;
	pblc.showWithTO = showWithTO;
	pblc.showAndHide = showAndHide;
	return pblc;
}();
console.log('=============== >  Alix_Processing.js ');

//take out from jsStuff

let Alix_SkyGeometry = function() {
	/**
	 * 
	 */
	var toRadians = function(alpha){
		return alpha*Math.PI/180;
	}
	/**
	 * 
	 */
	var toDegrees = function(alpha){
		return alpha*180/Math.PI;
	}
	/**
	 * 
	 */
	var  distanceDegrees = function(ra0, de0, ra1, de1){
		var  rra0 = toRadians(ra0);
		var  rra1 = toRadians(ra1);
		var  rde0 = toRadians(de0);
		var  rde1 = toRadians(de1);
		return toDegrees(Math.acos((Math.sin(rde0)*Math.sin(rde1)) +
				(Math.cos(rde0)*Math.cos(rde1) * Math.cos(rra0-rra1))));
	}
	/*
	 * exports
	 */
	var pblc = {};
	pblc.toRadians = toRadians;
	pblc.toDegrees = toDegrees;
	pblc.distanceDegrees = distanceDegrees;
	return pblc;

}();
console.log('=============== >  Alix_SkyGeometry.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
//"use strict"
function Segment(polygoneNodes /*canvas*/)
{
	var alfa;
	var beta;	
	var node = [];
	node = polygoneNodes;
	var nodesegmentos;

	this.IsCursorOn = function(x,y)
	{
		var result;
		
		//crear los segmentos:
		nodesegmentos = NumSegment(node);
		
		//si es un rectangulo
		if(seg = IsRectangle(x,y))
		{
			//calcular la distancia
			result = Distance(seg,x,y);
			return result;
		}			
			
	};
	
	//funcion para saber si se crea el rectangulo
	function IsRectangle(coorx, coory)	
	{	
		
		var x = parseInt(coorx);
		var y = parseInt(coory);
		var nodeXtremity = {};			
		
		var xa,xb,ya,yb;				
		
		for(var i in nodesegmentos)
		{				
			var xmin, xmax;
			var ymin, ymax;
			
			xa = node[nodesegmentos[i].A].cx;
			ya = node[nodesegmentos[i].A].cy;			
			xb = node[nodesegmentos[i].B].cx;
			yb = node[nodesegmentos[i].B].cy;
					
			xmin = (parseInt(xa) > parseInt(xb) )? xb:xa;
			xmax = (parseInt(xa) > parseInt(xb) )? xa:xb;
			
			ymin = (parseInt(ya) > parseInt(yb) )? yb:ya;
			ymax = (parseInt(ya) > parseInt(yb) )? ya:yb;

			if(x >= xmin && x <= xmax)
			{				
				if(y >= ymin && y <= ymax )
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}
					
				}
			}
			if(xmax === xmin)
			{
				if(y >= ymin && y <= ymax )
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}
				}
			}
			if(ymin === ymax)
			{	
				if(x > xmin && x < xmax)
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}	
				}				
			}
		}	
	}

	//funcion para calcular la distancia del punto M(x,y) de los segmentos: A(xa,ya) y B(xb,yb)
	function Distance(seg,x,y)
	{
		//console.log('puedes calcular distancia');	
		var recta;
		var distancia;
		
		var h,v;
		
		if((v = Vertical(seg, x)) != -1)
		{
			return {flag: "vertical", segmento: seg};
			
		}else if((h = Horizontale(seg, y)) != -1)
		{		
			return {flag: "horizontal", segmento: seg};
		}
		else if(v == -1 && h == -1)
		{
			
			var alfa = CalculerAlfa(seg);
			var beta = Beta(seg);			
			
			recta = Math.abs( ( (alfa * parseInt(x)) + parseInt(y) + beta) );
			distancia = (recta / Math.sqrt(((alfa * alfa)+1)));
			
			//if(distancia <= 3 && distancia >= 0)
			if(distancia <= 2 && distancia >= 0)
			{
				return {flag: "distancia", segmento: seg, alfa: alfa, beta: beta};
			}
		}

		return -1;
		
	}
	
	//function para crear los segmentos a partir de los nodos
	function NumSegment(array)
	{
		var numsegmentos = []; //variable para almacenar el numero de segmentos
		var temp; //variable para contar los nodos "i"
		var segmentoini, segmentofin;
		
		//recorrer los nodos
		for(var i in array)
		{
			if(segmentoini == undefined)
			{
				segmentoini = i;
			}			
			else if(segmentofin == undefined)
			{
				segmentofin = i;
			}				
			
			//almacenar segmentos
			if(segmentoini != undefined && segmentofin != undefined)
			{
				numsegmentos.push
				({
					A: segmentoini,
					B: segmentofin
				});
				
				segmentoini = segmentofin;
				segmentofin = undefined;
			}
			
			if(parseInt(node.length - 1) == i)
			{				
				numsegmentos.push
				({
					A: (node.length -1),
					B: 0
				});
			}
			
		}				
		return numsegmentos;
	}
	
	//dibujar el segmento
	function DrawnLine()
	{
		context.beginPath();
		context.moveTo(125,158);
		context.lineTo(250,158);
	
		
		context.moveTo(250,158);		
		context.lineTo(250,100);
		
		context.moveTo(250,100);		
		context.lineTo(125,158);
		
		context.stroke();
		context.closePath();		
		
		for(var i in node)
		{
			context.beginPath();
			context.arc(node[i].cx,node[i].cy,5, 0, Math.PI * 2,true);
			context.fillStyle = "blue";
		    context.fill();
			context.stroke();
			context.closePath();
		}
	}
	
	//Obtener el valor alfa
	function CalculerAlfa(seg)
	{		
		alfa = -((seg.yB - seg.yA) / (seg.xB - seg.xA));
		
		return alfa;
	}
	
	//Obtener el valor beta
	function Beta(seg)
	{		
		beta = -(alfa *  seg.xA)- seg.yA;
		
		return beta;
	}
	
	//Calcular la distancia de un segmento horizontal
	function Horizontale(seg, y)
	{
		var horizontal;
		var coory = parseInt(y);
		
		horizontal = Math.abs(seg.yA - coory);
		
		if(horizontal <= 1 && horizontal >= 0)		
			return horizontal;
			else
				return -1;	
	}
	
	//Calcular la distancia de un segmento vertical
	function Vertical(seg, x)
	{
		var vertical;
		var coorx = parseInt(x);
		vertical =  Math.abs(seg.xA - coorx);				
		
		if(vertical <= 1 && vertical >= 0)		
		return vertical;
		else
			return -1;		
	}

	//intersertion de segments
	this.Itersection = function(nodeselected,status)
	{
		var numseg = NumSegment(node);
		var lastseg = numseg.length - 2;
		var firstnode = 0;
		var dx,dy;		
		var d=-1;
		var xa1,xa2,xa3,xa4;
		var xb1,xb2,xb3,xb4;
		var ya1,ya2,ya3,ya4;
		var yb1,yb2,yb3,yb4;
		
		nodeselected = parseInt(nodeselected);
		
		if(status === false)
		{
			
			if(numseg.length > 3)
			{
				if(nodeselected != 0)
				{
					xa1 = node[numseg[lastseg].A].cx;
					ya1 = node[numseg[lastseg].A].cy;			
					xb2 = node[numseg[lastseg].B].cx;
					yb2 = node[numseg[lastseg].B].cy;
					var nodenumberA =  parseInt(numseg[lastseg].A); 
					var nodenumberB =  parseInt(numseg[lastseg].B);
					
					for(var i in numseg)
					{					
						xa3 = node[numseg[i].A].cx;
						ya3 = node[numseg[i].A].cy;			
						xb4 = node[numseg[i].B].cx;
						yb4 = node[numseg[i].B].cy;						
						
						d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);									
						
						if( d != -1)
						{
							//  ((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
							dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
							//   ((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
							dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																										
							var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);									
							
							//si es diferente de nulo hay una interseccion
							if(resultado != -1)
							{
								if(i != (numseg.length -1))
								{
									if(xb4 != xa1 && yb4 != ya1)
									{
										//if(xa1 != xa3 && ya1 != ya3)
											return { x1:xa1, y1:ya1 , x2:xb2 , y2:yb2 , seginit:lastseg, segfin:i, nA:nodenumberA, nB:nodenumberB};
									}
										
								}													
							}					
						}
					
					}
				}
				else if(nodeselected === 0)
				{
					xa1 = node[numseg[firstnode].A].cx;
					ya1 = node[numseg[firstnode].A].cy;			
					xb2 = node[numseg[firstnode].B].cx;
					yb2 = node[numseg[firstnode].B].cy;
					var nodenumberA =  parseInt(numseg[firstnode].A); 
					var nodenumberB =  parseInt(numseg[firstnode].B);
					
					//invertir el orden de los segmentos
					numseg.reverse();
					
					for(var i in numseg)
					{												
						if(i != 0)
						{

							xa3 = node[numseg[i].A].cx;
							ya3 = node[numseg[i].A].cy;			
							xb4 = node[numseg[i].B].cx;
							yb4 = node[numseg[i].B].cy;						
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);									
							
							if( d != -1)
							{
								//  ((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//   ((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);									
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{
									if(i != (numseg.length -1))
									{
										if(xb2 != xa3 && yb2 != ya3)
										{
											return { x1:xa1, y1:ya1 , x2:xb2 , y2:yb2 , seginit:lastseg, segfin:i, nA:nodenumberA, nB:nodenumberB};
										}
											
									}													
								}					
							}
						}					
					
					}
				}
			}
		}
		else if(status)
		{
			var seg1 ={} , seg2 = {};
			var option;
			var resseg = [];
			
			if(numseg.length > 3)
			{				
				if(nodeselected === 0)
				{
					//segmento 1
					seg1.xA = node.length - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = nodeselected + 1;
				}
				else if(nodeselected === (node.length - 1) )
				{
					//segmento 1
					seg1.xA = nodeselected - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = 0;
				}
				else
				{
					//segmento 1
					seg1.xA = nodeselected - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = nodeselected + 1;
				}														
				
				for(var i in numseg)
				{																			
					if(parseInt(numseg[i].A) === seg1.xA && parseInt(numseg[i].B) == seg1.xB)
					{
						continue;
						//console.log('algo');
						
					}else if(parseInt(numseg[i].A) === seg2.xA && parseInt(numseg[i].B) == seg2.xB)
					{
						continue;
					}
					else
					{	
							//comparar con el segmento 1						
							xa1 = node[seg1.xA].cx;
							ya1 = node[seg1.xA].cy;			
							xb2 = node[seg1.xB].cx;
							yb2 = node[seg1.xB].cy;
							
							xa3 = node[numseg[i].A].cx;
							ya3 = node[numseg[i].A].cy;			
							xb4 = node[numseg[i].B].cx;
							yb4 = node[numseg[i].B].cy;
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);												
							
							
							if(d != -1)
							{
								//((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{									
										if(xa1 != xb4 && ya1 != yb4)
										{											
											resseg.push
											(
												{
													x1:xa1,												
													y1:ya1 , 
													x2:xb2 , 
													y2:yb2
												}
											);
										}																							
								}				
							}							
							
							//comparar con el segmento 2							
							xa1 = node[seg2.xA].cx;
							ya1 = node[seg2.xA].cy;			
							xb2 = node[seg2.xB].cx;
							yb2 = node[seg2.xB].cy;
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);												
							
							if(d != -1)
							{
								//((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{
										if(xa1 != xb4 && ya1 != yb4)
										{											
											resseg.push
											(
												{
													x1:xa1,												
													y1:ya1 , 
													x2:xb2 , 
													y2:yb2
												}
											);
										}																							
								}				
							}							
						
						if(resseg.length > 1)
						{
							return resseg;
						}						
					}
				}				
			}						
		}
			
			return -1;
	};	
	
	function distance(x1,y1, x2,y2, x3,y3, x4,y4)
	{
		// (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
		var d = ((x1-x2)*(y3-y4)) - ((y1-y2)*(x3-x4));
		
		if (d == 0)
		{
		 return -1;
		} 			 
		else
		{
		 return d; 
		} 	
	}
	
	function ResultadoSegmento(x1,y1,x2,y2,x3,y3,x4,y4 , x , y)
	{
		//valida que los segmentos no sean verticales
		if (y < Math.min(y1,y2) || y > Math.max(y1,y2)) return -1;
		if (y < Math.min(y3,y4) || y > Math.max(y3,y4)) return -1;
		
		//valida que los segmentos no sean paralelos
		if (x < Math.min(x1,x2) || x > Math.max(x1,x2)) return -1;
		if (x < Math.min(x3,x4) || x > Math.max(x3,x4)) return -1;
		
		return 2;
	}
};

console.log('=============== >  Segment.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * A few geometric functions necessary to deal with the poles and the shtitling. 
 * These functions make use of the Coo class defined with the AladinLite core 
 * (http://aladin.u-strasbg.fr/AladinLite/)
 * 
 * Author:  laurent.michel@astro.unistra.fr
 */

var BasicGeometry = function () {
    /**
     * Nodes are 2 arrays with 2 elements
     * Returns a distance ranging from 0 to 180deg
     */
    function distanceBetweenNodes(node1, node2){
    	var coo1 = new Coo(node1[0], node1[1]);
    	var coo2 = new Coo(node2[0], node2[1]);
    	return coo1.distance(coo2)
    }
    /**
     * Return the geometric definition of the view enclosing the skyPositions polygon
     * skyPositions: Array of points: [[ra,dec], ...]
     * return : {center: {ra: .., dec: ..}, size: ..} size is in deg
     */
    function getEnclosingView(skyPositions) {
		var maxSize=0;
		var coo = new Coo();
		var raMin=360;
		var raMax=0;
		var decMin=+90
		var decMax=-90;
		var posNode1;
		var posNode2;
		var ra1,ra2;
		var dec1,dec2;
		/*
		 * Take the the biggest distance between 2 vertices as polygon size
		 * 
		 */
		for( var node1=0 ; node1<skyPositions.length ; node1++) {
			 posNode1 = skyPositions[node1];
			ra1 = posNode1[0];
			dec1 = posNode1[1];
			if( ra1 > raMax) raMax = ra1;
			if( ra1 < raMin) raMin = ra1;
			if( dec1 > decMax) decMax = dec1;
			if( dec1 < decMin) decMin = dec1;

			for( var node2=skyPositions.length/2 ; node2<skyPositions.length ; node2++) {
				posNode2 = skyPositions[Math.floor(node2)];
				ra2 = posNode2[0];
				dec2 = posNode2[1];
				var d;
				if( maxSize < ( d = BasicGeometry.distanceBetweenNodes(posNode1, posNode2))){
					maxSize = d;
				}
			}
		}
		/*
		 * Transform the polygon a an array of Coo instance
		 * This will made the further computation easier
		 */
		var vertices = [];
		for( var node1=0 ; node1<(skyPositions.length - 1) ; node1++) {
			posNode1 = skyPositions[node1];
			vertices.push(new Coo(posNode1[0], posNode1[1]));
		}
		/*
		 * Compute the average position as rough view center 
		 */
		var sumX=0 , sumY=0, sumZ=0;
		/*
		 * Compute first the average of the Euclidian coordinates
		 */
		for( var node1=0 ; node1<vertices.length  ; node1++) {
			var vertex = vertices[node1];
			sumX += vertex.x;
			sumY += vertex.y;
			sumZ += vertex.z;
		}
		sumX = sumX/vertices.length;
		sumY = sumY/vertices.length;
		sumZ = sumZ/vertices.length;
		/*
		 * The normalize to R=1 
		 */
		var ratio = 1/Math.sqrt(sumX*sumX + sumY*sumY +sumZ*sumZ);
		sumX *= ratio;
		sumY *= ratio;
		sumZ *= ratio;
		/*
		 * Convert Euclidian to sky coords 
		 */
		var coo = new Coo();
		coo.x = sumX;
		coo.y = sumY;
		coo.z = sumZ;
		coo.computeLonLat();
		/*
		 * Adjust the view to make sure that all vertices are visible 
		 */
		var deltaRA = 0;
		var deltaDEC = 0;
		for( var node1=0 ; node1<vertices.length  ; node1++) {
			var vertex = vertices[node1];

			var left = [coo.lon  - maxSize/2, vertex.lat];
			if( left[0] < 0 ) left[0]  = 360 + left[0];
			if( left[0] > 360) left[0] = left[0] -360;
			
			var right = [coo.lon  + maxSize/2, vertex.lat]
			if( right[0] < 0 ) right[0]  = 360 + right[0];
			if( right[0] > 360) right[0] = right[0] -360;
			
			var rightDistance = BasicGeometry.distanceBetweenNodes(right, [vertex.lon, vertex.lat])
			if( maxSize  < rightDistance) {
				deltaRA =rightDistance - maxSize;
			}
			var leftDistance = BasicGeometry.distanceBetweenNodes(left, [vertex.lon, vertex.lat])
			if( maxSize  < leftDistance) {
				deltaRA =leftDistance - maxSize;
			}

			
			var top = [vertex.lon, coo.lat  + maxSize/2];
			if( top[1] > 90 ) top[1]  = 180  - top[1];
			
			var bottom = [vertex.lon, coo.lat  - maxSize/2];
			if( bottom[1] < -90 ) bottom[1]  = -180 + bottom[1];
			
			if( vertex.lat < bottom[1] ){
				deltaDEC = bottom[1] -  vertex.lat;
			} else if( vertex.lat > top[1] ){
				deltaDEC = vertex.lat - top[1];
			}			
		}
    	return {center: {ra: (coo.lon - deltaRA), dec: (coo.lat - deltaDEC)}, size: maxSize};
    }
    
	var pblc = {};
	pblc.distanceBetweenNodes = distanceBetweenNodes;
	pblc.getEnclosingView = getEnclosingView;
	return pblc;
}();

console.log('=============== >  AstroCoo.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

var LibraryMap = function(){
	this.colorMap = {};
	this.colorMap["Simbad"] = {color:"#d66199", catalog:"Simbad", dot:""};
	this.colorMap["NED"]    = {color:"orange", catalog:"NED", dot:""};
	
	this.colorMap["green_apple"] = {color:"#00ff02", catalog:"", dot:""};
	this.colorMap["purple"] = {color:"#7f00d4", catalog:"", dot:""};
	this.colorMap["salmon"] = {color:"#ff9966", catalog:"", dot:""};
	this.colorMap["dark_bleu"] = {color:"#0034f1", catalog:"", dot:""}; 
	this.colorMap["red_apple"] = {color:"#ff0000", catalog:"", dot:""}; 
	this.colorMap["sky_bleu"] = {color:"#03fffc", catalog:"", dot:""}; 
	this.colorMap["brown"] = {color:"#975200", catalog:"", dot:""}; 
	this.colorMap["yellow"] = {color:"#faff00", catalog:"", dot:""}; 
	this.colorMap["argent"] = {color:"#f3f3f3", catalog:"", dot:""}; 
 
 
}

LibraryMap.prototype = {

		getNextFreeColor: function(catalog){
			
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == "") {
					this.colorMap[key].catalog = catalog;
					return this.colorMap[key];
				}
			}	

			return null;
		},
		
		
		freeColor: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					this.colorMap[key].catalog = "";
				}
			}	
			
		},
		
		getColorByCatalog: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					return this.colorMap[key];
					break;
				}

			}	
		},
	
		/*
		 * help history to rebuild the table colorMap
		 */
		setCatalogByColor: function(tab){  //tab={catalog, color}
			for(var key in this.colorMap) {
				if( this.colorMap[key].color == tab.color) {
					this.colorMap[key].catalog = tab.catalog;
				}
			}
			
		}
		
}
console.log('=============== >  LibraryMap.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * This is the function used to search an catalog
 */

var LibraryCatalogItem = function(params){
	  /**
	   * params JSON like {url, name,color, shape,fade; al_ref}
	   */
		    this.id = params.id;
			this.url = params.url;
			this.name = params.name;
			this.nameTemp = params.nameTemp;
			this.color = params.color;
			this.shape = params.shape;
			this.size = params.size;
			this.obs_id = params.obs_id;
			/**
			 * O = black 1= full color
			 */
			this.fade = params.fade;
			/**
			 * reference to the AL object
			 */
			this.al_refs =  params.al_refs;
	};

var LibraryCatalog  = function() {
	    /**
	     * Map name->LibraryCatalogItem
	     */
		var catalogs = [];
		/**
		 * make sure to never reuse the catalog ID, always take a larger one
		 */
		var max = 0;
		function getUniqueID(){
			
			for( var name in catalogs){
				if( catalogs[name].id > max){
					max = catalogs[name].id;
				}
		}
		return max +1;
		}
		/**
		 * params JSON like {url, name,color, shape,fade; al_ref}
		 */
		function addCatalog(params){
			catalogs[params.name] = new LibraryCatalogItem(params);
			catalogs[params.name].id = getUniqueID();
			for(var name in catalogs){
				//console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name+">>>>name temporary:"+catalogs[name].nameTemp);
			}
		};
		
		function getCatalog(name){
			if ( catalogs[name] == undefined )
				//console.log("catalogue >"+ name + "< not found");
			//console.log(catalogs)
				;
			return catalogs[name];
		};
		function delCatalog(name){
			delete catalogs[name];
			//console.log("catalog>"+name+"<deleted successfully")
			for(var name in catalogs){
				//console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name);
			}
			
		};
		
		function updCatalog(params){
			var name = params.name;
			if(params.url)catalogs[name].url = params.url ;
			if(params.color)catalogs[name].color=params.color;
			if(params.shape)catalogs[name].shape=params.shape;
			if(params.size)catalogs[name].size=params.size;
			if(params.fade)catalogs[name].fade=params.fade;
			if(params.al_refs)catalogs[name].al_refs=params.al_refs;
			if(params.obs_id)catalogs[name].obs_id=params.obs_id;
			if(params.nameTemp)catalogs[name].nameTemp=params.nameTemp;
			if(params.name == "Swarm"){
				SwarmDynamicFilter.runConstraint();
			}
		};
	/*	function updCatalog(params){
			var name = params.name;
			var c = catalogs[name];
			if(params.url)setAttribut(name,"url",params.url);
			if(params.color)setAttribut(name,"color",params.color);
			if(params.shape)setAttribut(name,"shape",params.shape);
			if(params.size)setAttribut(name,"size",params.size);
			if(params.fade)setAttribut(name,"fade",params.fade);
			if(params.al_refs)setAttribut(name,"al_refs",params.al_refs);
			if(params.obs_id)setAttribut(name,"obs_id",params.obs_id);
			console.log("#####"+params.name+" updated successfully");
			catalogs[name] =c;
			//cata.
		};
		function setAttribut(name,type,value){
			var c = catalogs[name];
			c.type = value;
			catalogs[name] =c;
			console.log("#####"+name+" "+type+" updated successfully");
		}
		
		*/
	/*	function updCatalog(params){
			var name = params.name;
			if(params.url)setUrl(name,params.url);
			if(params.color)setColor(name,params.color);
			if(params.shape)setShape(name,params.shape);
			if(params.size)setSize(name,params.size);
			if(params.fade)setFade(name,params.fade);
			if(params.al_refs)setObsid(name,params.al_refs);
			if(params.obs_id)setRef(name,params.obs_id);
			console.log("#####"+params.name+" updated successfully");
			
			//cata.
		};
		function setUrl(name,url){
			var c = catalogs[name];
			c.url=url;
			console.log("#####"+name+"url updated successfully");
		}
		function setColor(name,color){
			//var c = catalogs[name];
			catalogs[name].color=color;
			console.log("#####"+name+"color updated successfully");
		}
		function setShape(name,shape){
			var c = catalogs[name];
			c.shape=shape;
			console.log("#####"+name+"name updated successfully");
		}
		function setSize(name,size){
			var c = catalogs[name];
			c.size=size;
			console.log("#####"+name+"size updated successfully");
		}
		function setFade(name,fade){
			var c = catalogs[name];
			c.fade=fade;
			console.log("#####"+name+"fade updated successfully");
		}
        function setObsid(name,obs_id){
        	var c = catalogs[name];
        	c.obs_id=obs_id;
        	console.log("#####"+name+"obsid updated successfully");
		}
		function setRef(name,ref){
			var c = catalogs[name];
			catalogs[name].al_refs=ref;
			console.log("#####"+name+"reference updated successfully");
		}*/

		var pblc = {}
		pblc.catalogs = catalogs;
		pblc.addCatalog = addCatalog;
		pblc.getCatalog = getCatalog;
		pblc.delCatalog = delCatalog;
		pblc.updCatalog = updCatalog;
		//pblc.setAttribut = setAttribut;
		return pblc;

} ();

console.log('=============== >  LibraryCatalog.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
//"use strict"

var MasterResource = function(resource){
if(resource){
	this.actions = resource.actions;
	this.affichage = resource.affichage;
	this.parseLocation(resource.affichage);
	this.tab = [];
	//this.actions = resource.actions;
	// If filtered, the FOV area is not limited
	this.filtered = (resource.filtered == undefined || resource.filtered != true)? false: true;
}
}

MasterResource.prototype = {
		
		parseLocation: function(affichage){
			var location = affichage.location ;
			if( location&&location.url_base  ){
				this.url = location.url_base
			}else if(location&&location.service){
				if( location.url_query){
					var tmpq = location.query.replace(/\{\$ra\}/g,'@@ra@@')
					.replace(/\{\$dec\}/g,'@@dec@@')
					.replace(/\{\$fov\}/g,'@@fov@@')
					.replace(/\{\$format\}/g,'@@format@@');
					this.url = location.service +  encodeURI(tmpq).replace(/@@ra@@/g,'{$ra}')
					.replace(/@@dec@@/g,'{$dec}')
					.replace(/@@fov@@/g,'{$fov}')
					.replace(/@@format@@/g,'{$format}');
				}
				
			} else {
				alert("master resource malformed");
				this.url = null;
			}
			
		},
		setParamsInUrl: function(aladinLiteView){
			var self = this;
			var times = null;
			var url;
			var fov;
			if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcmin'){
				times = 60;
			}else if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcsec'){
				times = 3600;
			}else{
				times = 1;
			}
			var size = parseInt(1000*fov*times)/1000 + 1
			var hloan = aladinLiteView.ra/15.0;
			var strlon = Numbers.toSexagesimal(hloan, 8, false);
			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);
			var affichage = aladinLiteView.masterResource.affichage;
			var location = affichage.location;
			if(!this.filtered && aladinLiteView.fov>1){
				if(affichage.progressiveMode == true){
					fov = aladinLiteView.fov
				}else{
					fov = 1;
					WaitingPanel.warnFov();	
				}
			}else{
				fov = aladinLiteView.fov
			}
			//size = 1;
			size = fov*times;
			//if {$query} exists in the base url, replace it with the url_query, if not, replace only fov ra dec format. 
			var base = location.url_base;
			if(base.includes('{$query}')){
				var query = location.url_query;
				var progressiveLimit = "";
				if(affichage.progressiveMode == true &&  affichage.location.url_limit != undefined){
					progressiveLimit = affichage.location.url_limit;
				}
				query = query.replace(/\{\$limitQuery\}/g,progressiveLimit);
				query = query.replace(/\{\$ra\}/g,'($ra)');
				query = query.replace(/\{\$dec\}/g,'($dec)');
				query = query.replace(/\{\$fov\}/g,'($fov)');
				var queryEncoded = encodeURI(query);
				url = base.replace(/\{\$query\}/g,queryEncoded);
				url = url.replace(/\{\$format\}/g,affichage.format);
				url = url.replace(/\(\$ra\)/g,'%22'+aladinLiteView.ra);
				url = url.replace(/\(\$dec\)/g,aladinLiteView.dec+'%22');
				url = url.replace(/\(\$fov\)/g,size);
			}else{
				url = this.url.replace(/\{\$ra\}/g,aladinLiteView.ra);
				url = url.replace(/\{\$dec\}/g,aladinLiteView.dec);
				url = url.replace(/\{\$fov\}/g,size);
				url = url.replace(/\{\$format\}/g,affichage.format);
			}
			//console.log(url);
			return url;
		},
		
		cleanTab: function(){
			this.tab=[];
		}

}
console.log('=============== >  MasterResource.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

function AladinLiteView  (){
	this.name = null;
	this.ra = null;
	this.dec = null; 
	this.fov = null;
	this.survey = null;
	this.region = null;
	this.id = null;
	this.img = null;
	this.XMM = false;
	this.catalogTab = null;
	this.masterResource;
	this.target = [];
	this.comment = null;
	this.key = null;
	this.colorMap = null;
	this.reverseColor = null;
	this.sourceSelected = {
			x: null,
			y: null
	}
}
var objs = [];
//create a aladinliteview for the bookmarks in localstorage
var setAladinLiteView = function(params,key) {
		objs[params.id] = new AladinLiteView();
		var obj = objs[params.id];
		obj.name =params.name;
		obj.ra = params.ra;
		obj.dec = params.dec; 
		obj.fov = params.fov;
		obj.survey = params.survey;
		obj.region = params.region;
		obj.id = params.id;
		obj.img = params.img;
		obj.XMM = params.XMM;
		obj.catalogTab =params.catalogTab;
		obj.masterResource = new MasterResource(localConf.masterResource);//to not lose the external functions in the origin configuration
		//obj.masterResource = new MasterResource(params.masterResource);
		//obj.masterResource = localConf.masterResource;
		obj.target = params.target;
		obj.comment = params.comment;
		obj.key = key;
		obj.colorMap = params.colorMap;
		obj.reverseColor = params.reverseColor;
		obj.sourceSelected = params.sourceSelected;
		objs[params.id] = obj;
		
		return obj;
		
}
var getAladinLiteView = function(id){
	if (objs[id] != undefined )
	return objs[id];
};
var deleteAllObjs = function(){
	objs = [];
}
AladinLiteView.prototype = {
	
		/*
		 * création de la vue de liste, si region existe, la liste affiche le logo R
		 */
	getHTMLTitle: function() {
		return '<div  title="replay the stored view" id="' + this.id + '" style="height:auto; overflow: auto; width: 600px; height: 55px;"><img id="' + this.id + '_snapShot_img" src="' 
			+ this.img
			//+ '" onclick="AladinLiteX_mVc.restoreViewByIdTest(&quot;' + this.id + '&quot;);" '
			+ '" onclick="AladinLiteX_mVc.restoreViewById(&quot;' + this.id + '&quot;);" '
			+ 'style= "height: 18px;width: 18px;">&nbsp;&nbsp;&nbsp;</img>'
			+'<a title="download the snapshot" href="'+this.img+'" download ="ALIX snapshot ' + this.id + '"><i class="glyphicon glyphicon-download-alt" style="vertical-align: top;color:black" ></i>   </a>'
			+'<i id="' + this.id + '_link"  style="vertical-align: top;font-weight:800;">'  //stoker le id dans la div
			+ this.name 
			+ ' | '
			+ this.survey.ID
			+ '</i>&nbsp;'
			+ this.regionIcon()
			+ '&nbsp;'
			+ this.targetIcon()
			+ '<button id="' + this.id + '_menu" type="edit list" title="menu" class="alix_btn alix_btn-color-his alix_btn-edit"><i class="glyphicon glyphicon-record" style="font-size:19px;position:relative;top:-4px;"></i></button>'
			+ '<button id="' + this.id +'_menu_close_img" title="delete" class="alix_btn alix_btn-color-his alix_btn-in-edit" ' 
			+ 'onclick="AladinLiteX_mVc.deleteHistory(&quot;' + this.id + '&quot;);"><i class="glyphicon glyphicon-remove-sign" style="font-size:15px;"></i></button>'
			+ '<button id="' + this.id +'_menu_commit" title="remark" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-35px;" ><i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i></button>'
			+ '<button id="' + this.id +'_menu_show_description" title="description" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-57px;"><i class="glyphicon glyphicon-info-sign" style="font-size:15px;"></i></button>'
			+ '<textarea id="' + this.id +'_menu_commit_text" class="alix_text-commit" style="display:none;"></textarea>'
			+ '<button id="' + this.id +'_menu_commit_text_confirm" class="alix_btn alix_btn-text-ok alix_btn-color-ok" style="display:none;"><i class="glyphicon glyphicon-ok" style="font-size:11px;"></i></button>'
			+ '<button id="' + this.id +'_menu_commit_text_delete" class="alix_btn alix_btn-text-remove alix_btn-color-remove" style="display:none;"><i class="glyphicon glyphicon-remove" style="font-size:11px;"></i></button>'
			+ '<div id="' + this.id +'_menu_commit_text_display" class="alix_menu_commit_text_display" style="">'+ this.displayComment() +'</div></div>';
	},
	
	regionIcon: function(){
		if( this.region == null){
			return "";
		} else {
			return '<i  title="bookmark with region" class="glyphicon glyphicon-registration-mark" style="font-size:18;vertical-align: top;"></i>';
		}
	},
	
	targetIcon: function(){
		if( this.target.length == 0){
			return "";
		} else {
			return '<i class="glyphicon glyphicon-star" style="vertical-align: top;color:red"></i>';
		}
	},
	
	displayComment: function(){
		if( this.comment == null){
			return "";
		}else{
				return this.comment;
		}
	},

	
	/*
	 * actions of mouse change the states of img red cross
	 */
	setHandlers: function() {
		/*
		 * operation on button edit and his son buttons
		 */
		var self = this;
		var statue = false;
		/*
		 * operation on image
		 */
		$("#" + this.id+ "_snapShot_img").mouseover(function(event){
			$("#" + this.id).css("width", "100px");
			$("#" + this.id).css("height", "100px");
			$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
		});
		$("#"+this.id+ "_snapShot_img").mouseout(function(event){
			$("#" + this.id).css("width", "18px");
			$("#" + this.id).css("height", "18px");
			if(statue == true){
				$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
			}else{
				$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
			}
		});
		
		/*
		 * show the son buttons
		 */
		
		$("#"+this.id+ "_menu").click(function(event){
			if(statue == false){
				$("#"+ this.id+ "_close_img").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_close_img").css("transform","translate3d(-15px,25.98px,0px)");
				$("#"+ this.id+ "_close_img").css("transition-duration","100ms");
			
				$("#"+ this.id+ "_commit").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_commit").css("transform","translate3d(15px,25.98px,0px)");
				$("#"+ this.id+ "_commit").css("transition-duration","200ms");
			
				$("#"+ this.id+ "_show_description").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_show_description").css("transform","translate3d(27px,0px,0px)");
				$("#"+ this.id+ "_show_description").css("transition-duration","300ms");
				
				$("#" + $(this).attr('id').replace("_menu", "")).css("height", "55px");
				statue = true;
			}else{
				$("#"+ this.id+ "_close_img").css("transition-timing-function","ease-out");
				$("#"+ this.id+ "_close_img").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_close_img").css("transition-duration","200ms");
				
				$("#"+ this.id+ "_commit").css("transition-timing-function","ease-out)");
				$("#"+ this.id+ "_commit").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_commit").css("transition-duration","200ms");
				
				$("#"+ this.id+ "_show_description").css("transition-timing-function","ease-out");
				$("#"+ this.id+ "_show_description").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_show_description").css("transition-duration","200ms");
				$("#" + $(this).attr('id').replace("_menu", "")).css("height", "auto");
				statue = false;
			}
		});
		
		/*
		 * fonction of son buttons
		 */
		/*var hide = this.id;
		
		$("body").click(function(event){
			$("#"+hide+"_menu_commit_text").css("display", "none");
			$("#"+hide+"_commit_confirm").css("display", "none");
			$("#"+hide+"_commit_delete").css("display", "none");
		});*/
		
		$("#"+this.id+ "_menu_commit").click(function(event){
			$("#"+this.id+"_text").val(self.comment);
			$("#"+this.id+"_text").css("display", "inline");
			$("#"+this.id+"_text_confirm").css("display", "inline");
			
			$("#"+this.id+"_text_delete").css("display", "inline");
			//$("#"+this.id+"_text").html(self.comment);
		});
		
		$("#"+this.id+ "_menu_commit_text").click(function(event){
			$("#"+this.id+"_confirm").css("display", "inline");
			$("#"+this.id+"_delete").css("display", "inline");
		});
		$("#"+this.id+ "_menu_commit_text_delete").click(function(event){
			$(this).css("display", "none");
			$("#"+$(this).attr('id').replace("_delete","_confirm")).css("display", "none");
			$("#"+$(this).attr('id').replace("_delete","")).css("display", "none");
			
		});
		$("#"+this.id+ "_menu_commit_text_confirm").click(function(event){
			$(this).css("display", "none");
			$("#"+$(this).attr('id').replace("_confirm","_delete")).css("display", "none");
			$("#"+$(this).attr('id').replace("_confirm","")).css("display", "none");
			self.comment = $("#"+$(this).attr('id').replace("_confirm","")).val();
			$("#"+$(this).attr('id').replace("_confirm","_display")).html(self.comment);
			//when the message is confirmed, restore the aladinview locally
			restoreLocal(self);
		});
	},
	
	clean: function() {
		this.name = null;
		this.ra = null;
		this.dec = null; 
		this.fov = null;
		this.region = null;
		this.id = null;
		this.img = null;
		this.catalogTab = null;	
		this.XMM = false;
	}
}
//Restore the bookmark when it is modified.
var restoreLocal = function(params){
	var key;
	var positionCopy = jQuery.extend(true, {}, params);
	//var positionCopyStr = JSON.stringify(positionCopy);
	var positionCopyClone = deepClone(positionCopy);//transform the function to string 
	var positionCopyStr = JSON.stringify(positionCopyClone);
	if(params.key != undefined){
		key = params.key;
	}else{
		key = new date();
	}
	    localStorage.setItem(key,positionCopyStr);
}

//module.exports.AladinLiteView=AladinLiteView;




console.log('=============== >  AladinLiteView.js ');

/**
f * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
//"use strict"
//require('../javascript/AladinLiteView.js');
//var t = require('../javascript/AladinLiteView.js');
//var CircularJSON = import 'circular-json';

var getSexadecimalString = function(ra, dec){
	var strlon = Numbers.toSexagesimal(ra/15, 8, false);
    var strlat = Numbers.toSexagesimal(dec, 7, false);
    return strlon + " " + strlat;
}

var alix_width =  $("#aladin-lite-div").width() ;
var alix_height =  $("#aladin-lite-div").height() ;

var WaitingPanel = function(){
	var callers = {};

	var show = function(label){
		$("#fetchingMessage").html("Fetching data from " + label);
		$("#waiting_interface").css("height","100%");
		$("#waiting_interface").css("width","100%");
		$("#waiting_interface").css("display","inline");
		callers[label] = true;
	}
	var hide = function(label){

		delete callers[label];
		for( var c in callers){
			$("#fetchingMessage").html("Fetching data from " + c);
			return;
		}
		$("#waiting_interface").css("display","none");
	}
	var warnFov = function() {
		//console.error("warnFov");

		var alert = $("#alert");
		alert.html('<div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div>'
		         + '<div class="alix_alert_fov_msg">Search radius limited to 1&deg;</div>');
		$("#alert").fadeIn(100);
		setTimeout("$('#alert').fadeOut('slow')",1300);
	}
	var warnNbSources = function() {
		WaitingPanel.warn("Number of displayed sources limited to 999");
	}
	var warn = function(message) {
		var alert = $("#alert");
		alert.html('<div class="alix_alert_fov_msg">' + message + '</div>');
		$("#alert").fadeIn(100);
		setTimeout("$('#alert').fadeOut('slow')",1300);
	}

	var retour = {
			show: show,
			hide: hide,
			warnNbSources: warnNbSources,
			warnFov: warnFov,
			warn: warn
	};
	return retour;

}();

var AladinLiteX_mVc = function(){
	var that = this;
	var controllers ;
	var controller;
	var defaultSurvey ;
	var defaultFov ;
	var defaultPosition;
	var aladin;
	var aladinDivId;
	var parentDiv;
	var parentDivId;
	var menuDiv;
	var menuDivId;
	var targetDiv;
	var targetDivId;
	var contextDiv;
	var contextDivId;
	var selectDiv;
	var selectDivId;
	var maskDiv	;
	var selectHipsDiv;
	var catalogeDiv;
	var selectCataBtn ;
	var vizierDiv;
	var maskId = "AladinHipsImagesExplorer_mask";
	var selectHipsDivId = "status-select";
	var catalogeId = "Aladin-Cataloge";
	var selectCataBtnId = "detail-cata";
	var vizierDivId = "vizier";
	var aladinLiteView = new AladinLiteView();
	var XMMcata = null;
	var sourceSelected;
	var panel_last = null;
	var lastSelectedSourcePosition={name:null,ra:null,dec:null};//save the coordonnes of the last selected source
	var isSourceSelected=false;//Juge whether there is a source being selected
	var isMove=false;
	/**
	 * var params = {
	    parentDivId: "aladin-lite-div",
	    defaultView: {
	        defaultSurvey: "P/DSS2/color",
	        position: "",
	        defaultFov: "30"
	    },
	    controllers: {
	      historic: {
	      },
	      regionEdit:{
	      },
	      hipsSelector: {
	      }
	      catalogSelector: {
	      }
	  	}
	   }
	*/
	var init = function(params){
		/*
		 * Set ids for sub panels
		 */
		parentDivId = params.parentDivId;
		aladinDivId = params.parentDivId + "-main";
		menuDivId   = params.parentDivId + "-menu";
		contextDivId = params.parentDivId + "-context";
		targetDivId  = params.parentDivId + "-target";
		selectDivId  = params.parentDivId + "-select";
		//showAssociated = params.actions.showAssociated;
		var showAssociated = params.showAssociated;
		//showPanel = params.actions.showPanel;
		var showPanel = params.showPanel;
		
		if(params.masterResource != undefined){
			aladinLiteView.masterResource = new MasterResource(params.masterResource);
		}else{
			aladinLiteView.masterResource = null;
		}

		/*
		 * Test if historic model is required, if yes make an instance and give it to the controller
		 * draw the tool
		 */
		if(params.controllers.historic != undefined){
			params.controllers.historic.model = new Historique_Mvc('panel_history', this);
		}
		if(params.controllers.regionEditor != undefined || (params.defaultView != undefined && params.defaultView.region != undefined)){
			params.controllers.regionEditor.view = new RegionEditor_mVc(this
					, parentDivId
					,'panel_region'//, contextDivId
					, function(data){ if( data.userAction ){ AladinLiteX_mVc.storePolygon(data.region) ;alert(JSON.stringify(data));}}
					//, aladinLiteView.points
					, params.defaultView.defaultRegion); 
		}
		if(params.controllers.hipsSelector != undefined){
			params.controllers.hipsSelector.model = new HipsSelector_Mvc(parentDivId, this);
		}
		controllers = params.controllers;
		controller = new AladinLite_mvC(that, params.controllers);	//that=this	
		draw(params.defaultView,params.controllers,params.masterResource);
		$(".aladin-reticleCanvas").click(function(){
			$(panel_last).css("display","none");
			$("#itemList").css("display","none");
		})//click fond then close all the panels
		
		if(params.masterResource!=undefined)
			XMMorALIX=true;
		
	}
	var fadeOutAuto = function(){
		$("#minus").trigger("click");
		//Once a source is selected, all other sources fade out automatically. 
		}
	  // maximize control
	var deleteSourceAuto = function(){
		//When we click the part without source, we deselect the source selected automatically. 
		if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.showAssociated.handlerDeleteSource == true){
		//The function can be configured chosen or not in the configuration.
			cleanCatalog("oid");
			for(var i=0;i<5;i++){
		    $("#plus").trigger("click");
		    }
		    closeContext();
		}
		if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.externalProcessing.handlerDeselect){
			aladinLiteView.masterResource.actions.externalProcessing.handlerDeselect();
			   // $(".CatalogMerged").css("display","none");
		}
		aladinLiteView.sourceSelected.x = null;
		aladinLiteView.sourceSelected.y = null;
    	$("#XMM").attr("class", "alix_XMM_in_menu  alix_datahelp_selected");//to make the master resource can be reloaded

	}
	var deselectSource = function(){
		deleteSourceAuto();//delete related source and fade in 
		if(sourceSelected){
			sourceSelected.deselectAll();//make cds.source deselect the source
		}
	}
	var showDetailByID = function(){
		checkBrowseSaved();
		var selectHipsDiv_val=selectHipsDiv.val();
		showDetail(selectHipsDiv_val);
	}
	var draw = function(defaultView, controllers, masterResource) {
		/*
		 * Draw sub panels
		 */
		var XMM;
		if(masterResource != undefined){
			XMM=masterResource.affichage.label;
		}else{
			XMM="";
		}
		var ACDS;
		if(masterResource != undefined&& masterResource.actions.showAssociated){
			ACDS=masterResource.actions.showAssociated.label;
		}else{
			ACDS="";
		}
		parentDiv = $('#' + parentDivId);
		parentDiv.html('<div id="' + aladinDivId + '" class="alix_aladin_div"></div>');

		parentDiv.append('<div id="newMenu" class="alix_menu_panel"></div><div id="itemList" class="alix_hips_panel"></div>')
		parentDiv.append('<div id="SourceDiv" class="alix_source_panels"></div>')
		VizierCatalogue.SourceDataMove();
		
		var newMenu = $('#newMenu')	;
		var button_locate = '<button id="button_locate" class="alix_btn alix_btn-circle alix_btn-grey" title ="search a position" ><i id="" class="glyphicon glyphicon-map-marker " style="font-size:18px;"></i></button>'
		var button_center = '<button id="button_center" class="alix_btn alix_btn-circle alix_btn-red" title ="back to center" onclick="AladinLiteX_mVc.returnCenter();"><i id="" class="glyphicon glyphicon-screenshot " style="font-size:18px;"></i></button>'
		var button_bookmark = '<button id="button_bookmark" class="alix_btn alix_btn-circle alix_btn-orange" title ="save a bookmark" onclick="AladinLiteX_mVc.bookMark();"><i id="" class="glyphicon glyphicon-heart " style="font-size:18px;"></i></button>'
		var button_history  = '<button id="button_history" class="alix_btn alix_btn-circle alix_btn-yellow" title ="history of bookmark" ><i id="" class="glyphicon glyphicon-book " style="font-size:18px;"onclick="AladinLiteX_mVc.getHistory();"></i></button>'
		var button_region = '<button id="button_region" class="alix_btn alix_btn-circle alix_btn-green" title ="region editor" onclick="AladinLiteX_mVc.regionEditor();" ><i id="" class="glyphicon glyphicon-edit" style="font-size:18px;"></i></button>'
		var button_image = '<button id="button_image" class="alix_btn alix_btn-circle alix_btn-blue" title ="search an image" onclick="AladinLiteX_mVc.showColorMap();" ><i id="" class="glyphicon glyphicon-picture" style="font-size:18px;"></i></button>'
		var button_catalog = '<button id="button_catalog" class="alix_btn alix_btn-circle alix_btn-purple" title ="search a catalog" ><i id="" class="glyphicon glyphicon-list " style="font-size:18px;"></i></button>'
		
			//<span id="search" title="search" class="alix_search glyphicon glyphicon-search" onclick="AladinLiteX_mVc.searchPosition();"></span>
			
		var panel_locate = 
			'<div style="z-index:100"><input id="' + targetDivId + '" placeholder="target" class="alix_target" onfocus="this.select()">'
			+'<select  id ="' + selectDivId + '" class="alix_select">'
			//+'<option id="select">--select--</option>'
			+'<option id="'+defaultView.field.position+'">'+defaultView.field.position+'</option>'
			+'</select>'
			//+'<input id="MyButton" style="margin-left:500px;margin-top:500px" type=button color="red" z-index=2000 display=true>'
			+'<button id="targetNote" title="Note" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:absolute;left:392px;top:8px;" ><i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i></button></div>'
			//+'</div>'
		var panel_history = '<div id="panel_history" class="alix_right_panels">'
			+'</div>'
		var panel_region = '<div id="panel_region" class="alix_right_panels">'
			+'</div>'
		var panel_image = '<div id="panel_image" class="alix_right_panels">'
		    +'<p class="alix_titlle_image ">Image'
		    +'</p>'
		    +'<input type="text" id="'+ maskId + '"  placeholder="Survey" size=11 class=" alix_img_explorer"></input>'
		    +'<select id="status-select" class ="alix_selector_hips "><option selected="selected">CDS/P/DSS2/color</option></select>'
		    +'<button id="detail"  type="detail" class=" alix_button_detail" onclick="AladinLiteX_mVc.showDetailByID();">Detail</button>'
			+'<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: auto; height: 50px; color: black;">'
			+'<b>Color Map : </b>'
			+'<select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>'
			+'<div id="panel_image_detail"></div>'
			+'</div>'
		var panel_catalog = '<div id="panel_catalog" class="alix_right_panels">'
			    +'<div class="alix_catalog_panel" >'
			    +'<b class="alix_titlle_catalog ">Catalogs</b>' 
			    +'<div id="minus" style="cursor: pointer;" class="alix_minus  " title = "Fade out">-</div>'
			    +'<i id="fade" title = "fade" class=" glyphicon glyphicon-lamp"></i>'
			    +'<div id="plus" style="cursor: pointer;" class=" alix_plus  " title = "Fade in">+</div>'
			    +'<div><b id="XMM" title="Show/hide master sources" class="alix_XMM_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayDataXml();">'+ XMM +'</b>'
			    + descriptionXMM()
			    + configurationXMM()
			    + hideXMMFlash()
			    //XMM sources can be configured in the configuration which decide if the buttons of '3XMM catalog' exists or not. 
			    +'</div>'
			    +'<div><b id="ACDS" class = "alix_acds" >'+ACDS+'  </b>'
			    +'<div style = ""><b id="Simbad" title="Show/hide Simbad sources" class="alix_simbad_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displaySimbadCatalog();">Simbad</b>'
			    +'<i id="btn-Simbad-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'Simbad\',this.style.color)"></i>'
			    +'<i id="btn-Simbad-flash" title = "flash" class="  glyphicon glyphicon-flash"style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.SimbadFlash();"></i>'
			    +'<b><input type="text" id="SearchType" class=" alix_cataloge_explorer " placeholder="Search Type" style="display:none;"></b></div>'
			    +'<div style = ""><b id="NED" title="Show/hide Ned sources" class="alix_ned_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayNedCatalog();">NED</b>'
			    +'<i id="btn-NED-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"></i>'
			    +'<i id="btn-NED-flash" title = "flash" class="  glyphicon glyphicon-flash" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.NEDFlash();"></i></div><br>'
			    +'<div><input type="text" id="'+ catalogeId + '"  placeholder="Find other Catalog" size=11 class=" alix_cataloge_explorer "></input>'
			    +'<select id="select_vizier" class="alix_selector_vizier "><option selected="select">--select--</option></select>'
			    +'<div id="vizier" class="alix_vizier">'
			    +'<ul id="vizier_list"></ul></div></div>'
				+'<div id="panel_catalog_detail"></div>'
			+'</div>'
			
			
			parentDiv.append(panel_locate); // replace the orignial position block by the updated one
			
		newMenu.append('<div id="alix_left_menu"><ul id="alix_left_menu_ul" style="list-style-type:none; padding: 5px;">'
				//+'<li >'+button_locate+'</li>'
				+'<li>'+button_center+'</li>'
				+'<li>'+button_bookmark+'</li>'
				+'<li>'+button_history+'</li>'
				+'<li>'+button_region+'</li>'
				+'<li>'+button_image+'</li>'
				+'<li>'+button_catalog+'</li>'
				+'</ul></div>'
				+'<div id="alix_right_menu">'
				//+panel_locate
				+panel_history
				+panel_region
				+panel_image
				+panel_catalog
				+'<div>')
		$('#button_locate').click(function(event){
			var id = '#panel_locate';
			panel_check(id);
		});	
		$('#button_bookmark').click(function(event){
			alert("Saved successfully! You can click the history(yellow) button to check your bookmarks.");
			});	
		$('#button_history').click(function(event){
			var id ='#panel_history'
			panel_check(id);
			});	
		$('#button_region').click(function(event){
			var id = '#panel_region';
				panel_check(id);
			});	
		$('#button_image').click(function(event){
			var id ='#panel_image';
			panel_check(id);
			});	
		$('#button_catalog').click(function(event){
			$("#SourceDiv").css("display","none");
			var id ='#panel_catalog';
			panel_check(id);
			});
		var panel_check = function(id){
			$(id).toggle();
			if(panel_last!=id){
			$(panel_last).css("display","none");}
			panel_last =id;
		}			
		
		menuDiv  = $('#' + menuDivId);
		parentDiv.append('<div id="' + contextDivId + '" class="alix_context_panel" >'
				+'<b class="alix_context" style="display: none;"> context </b></div>');
		parentDiv.append('<div id="waiting_interface" class="alix_waiting_interface" style="display:none;">'
				+'<div class="alix_grey_bg"></div>'
				+'<div class="alix_fetching_data">'
				+'<input type="button" id="closeWaitingPanel" value="x">'
				+'<div class="alix_fetching_img"></div>'
				+'<div id="fetchingMessage" class="alix_fetching_message">fetching data...</div></div></div>');
		parentDiv.append('<div id="alert" class="alix_alert_fov" style="display:none;">'
				+'<div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div>'
				+'<div class="alix_alert_fov_msg">Search radius limited to 1&deg;</div>'
				+'</div>');
		parentDiv.append('<div class="alix_tester" id="tester"><ul></ul></div>');
		
		contextDiv  = $('#' + contextDivId);
		targetDiv   = $('#' + targetDivId);
		selectDiv   = $('#' + selectDivId);
	    maskDiv		= $('#' + maskId);
		selectHipsDiv=$('#' + selectHipsDivId);
		catalogeDiv = $('#' + catalogeId);
		selectCataBtn = $('#' + selectCataBtnId);
		vizierDiv = $('#' + vizierDivId);
		parentDiv = $("#" + aladinDivId);

		console.log(" selectDiv " + selectDiv.length)
		setReferenceView(defaultView);
		storeCurrentState();
		
		aladin.on('click',function(){
			targetDiv.blur();
			//SimbadCatalog.resetFilter();
		});
		aladin.on('positionChanged', function(newPosition){
			//targetDiv.blur();
			if(newPosition.dragging==false){
				storeCurrentState();
				targetDiv.val(newPosition.ra.toFixed(4) + "," + newPosition.dec.toFixed(4));
				if(aladinLiteView.masterResource != undefined){
					controller.updateCatalogs(aladinLiteView,'position');
				}
			}
			//SimbadCatalog.resetFilter();
		});

		aladin.on('zoomChanged', function(newFoV) {
			var fovValue = aladinLiteView.fov;
			storeCurrentState();
		    if(newFoV >= fovValue){
		    	if(aladinLiteView.masterResource != undefined){
		    		controller.updateCatalogs(aladinLiteView,'zoom');
		    	}
		    }
		    /*if(SimbadCatalog.getType()!=undefined)
		    	SimbadCatalog.displayCatalogFiltered();*/
		    //SimbadCatalog.resetFilter();
		});	
		
		/*if(aladinLiteView.masterResource.affichage.display == true){
			AladinLiteX_mVc.displayDataXml();
		}
		*/
		/*function closeWaitingInterface(){
			document.getElementById("waiting_interface").style.display;
		}*/
		
		//add a button for closing the waiting panel
		$("#closeWaitingPanel").click(function(event){
			document.getElementById("waiting_interface").style.display="none";
		})
		$("#open_all").click(function(event){
			event.stopPropagation();
			switchPanel();
			closeContext();
			
		})
		if(defaultView.panelState == true ){
			switchPanel();
		}
		if(masterResource != undefined&&masterResource.affichage.display == true){
			setTimeout( function() {AladinLiteX_mVc.displayDataXml();},1000)	
		}
		/*
		 * Set the default position
		 */	        
        targetDiv.val(defaultView.field.position);
		/*
		 * Set event handlers de la texte target
		 */
		targetDiv.click(function(event){
			event.stopPropagation();
		})
		targetDiv.bind("keypress", function(event) {
		    if(event.which == 13) {
		    	if(aladinLiteView.region != null){
					controller.cleanPolygon();
				}
		    	aladinLiteView.clean();
		    	deselectSource();
				event.preventDefault();
		        gotoObject(targetDiv.val());
		    }
		});
		$('#input_target').bind("keypress", function(event) {
			if(event.which == 13) {
				displayTarget();
			}
		});
		selectDiv.click(function(event){
			event.stopPropagation();
		});
		//add the note to the target
		$("#targetNote").click(function(event){
			var targetName=selectDiv.children('option:selected').attr('id');
			var regex=/\[(.+?)\]/g;
			var strs=selectDiv.children('option:selected').val();
			var defaultNote=strs.match(regex);
			if(defaultNote){
				MessageBox.inputBox("Write your note on this target",defaultNote[0].replace(/\[|]/g,''));
				$("#target_note").val(defaultNote[0].replace(/\[|]/g,''));
			}
			else{
				MessageBox.inputBox("Write your note on this target","");
				$("#target_note").val("");
			}
		})
		selectDiv.change(function(){
			if($(this).val()=="--select--")
				return;
			searchPosition($(this).children('option:selected').attr('id'));
			event.stopPropagation();
		});
		maskDiv.click(function(event){
			event.stopPropagation();
		});
		maskDiv.keyup(function(e) {
			if( $(this).val().length >= 3 || e.which == 13) {
				searchHips($(this).val());
			}
		});
		selectHipsDiv.change(function(){
			if($(this).val()=="--select--")
				return;
			displaySelectedHips($(this).val());
			showDetailByID($(this).val());
		});
		selectHipsDiv.click(function(event){
			event.stopPropagation();
		});
		
		$("#select_vizier").change(function(){
			var oid = $(this).val();
			if(oid=="--select--")
				return;
			var strs=oid.match(/^([^\s]*)\s\[(.*)\]$/);
			catalogFunction(strs[1],strs[2]);
		});
		
		catalogeDiv.keyup(function(e) {
			if( $(this).val().length >= 2 || e.which == 13) {
				searchCataloge($(this).val());
			}
		});
		$("#menuDiv").on("click",".alix_btn_open", function(event){
			event.stopPropagation();
			$("#center").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#center").css("transform","translate3d(45px,0px,0px)");
			$("#center").css("transition-duration","100ms");
			
			$("#bookMark").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#bookMark").css("transform","translate3d(90px,0px,0px)");			
			$("#bookMark").css("transition-duration","200ms");
			
			$("#history").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#history").css("transform","translate3d(135px,0px,0px)");
			$("#history").css("transition-duration","300ms");
			
			$("#region").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#region").css("transform","translate3d(180px,0px,0px)");
			$("#region").css("transition-duration","400ms");
			
			$("#menu").addClass("alix_btn_open_2");
			$("#menu").removeClass("alix_btn_open");
			$("#icon_open").addClass("glyphicon-remove");
			$("#icon_open").removeClass("glyphicon-list");
			
			$("#credit").css("display","none");
		});
		$("#menuDiv").on("click",".alix_btn_open_2", function(event){
			event.stopPropagation();
			$("#center").css("transition-timing-function","ease-out");
			$("#center").css("transform","translate3d(0px,0px,0px)");
			$("#center").css("transition-duration","100ms");
			
			$("#bookMark").css("transition-timing-function","ease-out");
			$("#bookMark").css("transform","translate3d(0px,0px,0px)");			
			$("#bookMark").css("transition-duration","200ms");
			
			$("#history").css("transition-timing-function","ease-out");
			$("#history").css("transform","translate3d(0px,0px,0px)");
			$("#history").css("transition-duration","300ms");
			
			$("#region").css("transition-timing-function","ease-out");
			$("#region").css("transform","translate3d(0px,0px,0px)");
			$("#region").css("transition-duration","400ms");
			
			$("#menu").addClass("alix_btn_open");
			$("#menu").removeClass("alix_btn_open_2");
			$("#icon_open").addClass("glyphicon-list");
			$("#icon_open").removeClass("glyphicon-remove")

			$("#credit").css("display","inline");
		});
		
		$("#vizier").click(function(event){
			event.stopPropagation();
		});
		$('.alix_target_selecte').click(function(event){
			if($(this).attr("class")=="alix_target_selecte alix_unselected"){
				for(var i=0;i<aladinLiteView.target.length;i++){
					var data=i;
					var ct = aladinLiteView.target[i].ct;
					var ra = aladinLiteView.target[i].ra;
					var dec = aladinLiteView.target[i].dec;
					aladin.addCatalog(ct);
					ct.addSources([A.marker(ra, dec, {popupTitle:'target'}, data)]);
				}
				$(this).attr("class","alix_target_selecte alix_selected");
				$(this).css("color","#87F6FF");
			}else{
				cleanCatalog("target");
				$(this).attr("class","alix_target_selecte alix_unselected");
				$(this).css("color","#888a85");
			}
			
		});
		$('.alix_select_trash').click(function(event){
			$('.alix_target_selecte').css("display","none");
			$(this).css("display","none");
			$('.alix_select_flash').css("display","none");
			cleanCatalog("target");
		});
		
		$('.alix_select_flash').click(function(event){
			for(var i=0;i<aladinLiteView.target.length;i++){
				aladinLiteView.target[i].ct.makeFlash();
			}
		});
		
		$("#credit").click(function(event){
			checkBrowseSaved();
			contextDiv.css("max-height", "200px");
			if( contextDiv.height() < 100 ){
				contextDiv.animate({height:'200px'},"fast");
				contextDiv.css("border-width", "0.2px");
				//$(".ui-dialog").animate({height:'200px'},"fast");
				
			}else{
				contextDiv.animate({height:'0px'},"fast");
				contextDiv.css("border-width", "0px");
				////$(".ui-dialog").animate({height:'0px'},"fast");
			}
			$.getJSON("http://saada.unistra.fr/alix/licences/credit.json", function(jsondata) {
				contextDiv.html("<pre>" + JSON.stringify(jsondata, null, 2) + "</pre>");
			});
		});
   
		/////Filter the sources /////////////////////////
		if(masterResource != undefined&&masterResource.actions.externalProcessing.handlerInitial){
			masterResource.actions.externalProcessing.handlerInitial();
		}
	}
	var setDefaultSurvey = function(defaultView){
		var lieu = aladin.getRaDec();
		var fil =  aladin.getFov();

		var baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
			+ '23' + "&DEC=" + '33' 
		+ "&SR=" + fil[0] 
		+ "&fmt=json&get=record&casesensitive=false";
		var productType = "image";
		var imageIdPattern 	= new RegExp(/.*\/C\/.*/);
		var imageTilePattern = new RegExp(/.*((jpeg)|(png)).*/);
		$.getJSON(baseUrl, function(jsondata) {
			if( productType != undefined ){
				for(var i = jsondata.length - 1; i >= 0; i--) {
					if(jsondata[i].dataproduct_type != productType ) {
						jsondata.splice(i, 1);
					}
				}
				if( productType == "image" ){
					for(var i = jsondata.length - 1; i >= 0; i--) {
						var keepIt = 0;
						if(  $.isArray(jsondata[i].hips_tile_format)) {
							for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
								if( imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
									keepIt = 1;
									break;
								}
							}
						} else if(  imageTilePattern.test(jsondata[i].hips_tile_format) ){
							keepIt = 1;
						}
						if( keepIt == 0 ){
							jsondata.splice(i, 1);
						}
					}
				}
				controller.modules.hipsSelectorModel.storeHips(jsondata);
				/*
				 * Check if the default request survey cover the position.
				 * Take it if yes and take DSS2 color if not
				 */
				var found = false;
				for( var i=0 ; i<jsondata.length ; i++){
					var id = jsondata[i].ID ;
					if( id == defaultSurvey){
						displaySelectedHips(id);
						createHipsSelect(id,"DSS colored");
						found = true;
					}
				}
				if( !found ){
					displaySelectedHips("CDS/P/DSS2/color");
					createHipsSelect("CDS/P/DSS2/color", "DSS colored");
				}
			}
		});
	}
	var setReferenceView = function(defaultView){
		/*
		 * Set the aladinView according to the configuration data of defautView.
		 * Can be tested in demo alixapi. (button 'change reference')
		 *  
		 */
		if( aladin != null ) {
			for( var i =0; i<aladin.view.overlays.length ; i++){
				if( aladin.view.overlays[i].name ==  "Reference Frame" ){
					aladin.view.overlays[i].removeAll();
					break;
				}
			}
		}
		/*
		 * Parse config
		 */
		if( defaultView.defaultSurvey != undefined ){
			defaultSurvey = defaultView.defaultSurvey;
			controller.modules.historicModel.hips_tab.push("CDS/P/DSS2/color");
		}
		if( defaultView.region != undefined ) {
			var pts = [];
			/*
			 * Extract region or position from SaadaQL statement
			 */
			if (defaultView.region.type == "array") {
				x = controllers.regionEditor.view.parseArrayPolygon(defaultView.region.value);
			} else if (controllers.regionEditor.view.editionFrame.type == "soda") {
				x = this.controllers.regionEditor.view.parseSodaPolygon(defaultView.region.value);
			} else {
				alert("Polygone format " + points.type + " not understood");
			}
			if( x ){
				var view = BasicGeometry.getEnclosingView(x);
				defaultPosition = view.center.ra + " " +  view.center.dec
				defaultFov = 1.2*view.size;
				if( aladin == null ) {
					aladin = A.aladin(parentDiv
						, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
					parentDiv.append();
				}
				//gotoObject(defaultPosition);
				/*
				 * setZoom and gotoObject can't be called at the same time, cause there will be the collision on charging the X sources.
				 *  
				 */
				setZoom(defaultFov);
				gotoPosition(view.center.ra,view.center.dec);
				overlay = A.graphicOverlay({color: 'blue', name: "Reference Frame"});
				aladin.addOverlay(overlay);
				overlay.addFootprints([A.polygon(x)]);
			}

		} else {
			if( defaultView.field != undefined ) {
				if( defaultView.field.defaultFov != undefined )
					defaultFov = defaultView.field.defaultFov;
				else defaultFov = 0.9;

				if( defaultView.field.position != undefined )
					defaultPosition = defaultView.field.position;
				else
					defaultPosition = "M51";
			} else {
				defaultPosition = "M51";
				defaultFov = 0.9;
			}
			if( aladin == null ) {
				aladin = A.aladin(parentDiv
					, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
				parentDiv.append();
			}
			//gotoObject(defaultPosition);
			//setZoom(defaultFov);
			
			//gotoPosition(positionRef.ra,positionRef.dec);
			gotoPositionByName(defaultPosition);
			// Use that is because gotoObject() and setZoom() will have the conflicts of charging XMM sources. So we need to use aladin.gotoPosition. And we create a function to get the ra dec by the name of the position.
			setTimeout(function(){ aladin.setZoom(defaultFov);}, 200);

		}
		setDefaultSurvey();
	}
	var positionRef;
	var ifpopup = false;
	var popup = function(){
		if(ifpopup == true){
			$("#aladin-lite-div").closest('.ui-dialog-content').dialog('close'); 
			ifpopup = false;
		}else{
		if(menuDiv.width()<100){
			$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:900,close: function(event,obj){
				ifpopup = false;
			}});
		}else{
			if(contextDiv.height()<100){
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:900,close: function(event,obj){
					ifpopup = false;
				}});
			}else{
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:650,width:900,close: function(event,obj){
					ifpopup = false;
				}});
			}
		}
		ifpopup = true;
		}
		//$("#popup").css("display", "none");
		//$("#closeAll").css("display", "inline");
	}



	var refresh = function(){
		gotoObject(defaultPosition);
		aladin.setFov(defaultFov);
		$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:440});
	}
	
	var addOverlayer = function(overlay){
		aladin.addOverlay(overlay);
	}
	
	var gotoPosition = function(ra, dec){
		aladin.gotoPosition(ra,dec);
	}
	
	var world2pix = function(ra, dec){
		return aladin.world2pix(ra, dec);
	}
	
	var setZoom = function(zoom){
		aladin.setZoom(zoom);
	}
	
	var increaseZoom = function(){
		aladin.increaseZoom();
	}
	
	var decreaseZoom = function(){
		aladin.decreaseZoom();
	}
	
	var pix2world = function(cx,cy){
		return aladin.pix2world(cx,cy);
	}
	
	var setImageSurvey = function(imageSurvey, callback){
		return aladin.setImageSurvey(imageSurvey, callback);
	}
	
	var createImageSurvey = function(id, name, rootUrl, cooFrame, maxOrder, options){
		return aladin.createImageSurvey(id, name, rootUrl, cooFrame, maxOrder, options);
	}
	/**
	 * les interfaces pour acces à aladin.js
	 */	
	var deleteLastSelectedPosition=function(){
		isSourceSelected=false;
		lastSelectedSourcePosition.name=null;
		lastSelectedSourcePosition.ra=null;
		lastSelectedSourcePosition.dec=null;
	}
	var deleteLastSelectedPositionByCatalog=function(name){
		if(name!=undefined&&isSourceSelected){
			var length=name.length;
			if(lastSelectedSourcePosition.name.slice(0,length)==name)
				isSourceSelected=false;
		}
	}
	var setLastSelectedPosition=function(name,ra,dec){
		if( name != undefined && ra != undefined && dec != undefined){
			isSourceSelected=true;
			var reg=/[:]/g;
			name=name.split(reg);
			lastSelectedSourcePosition.name=name[1];
			lastSelectedSourcePosition.ra=ra;
			lastSelectedSourcePosition.dec=dec;
		} else {
			isSourceSelected=false;
		}
	}
	
    /**
     * called when center button is clicked
     */
	var returnCenter = function(){
		checkBrowseSaved();
		$("#SourceDiv").css("display","none");
		if(isSourceSelected){
	    	aladinLiteView.clean();
	    	deselectSource();
			//event.preventDefault();
	        gotoObject(lastSelectedSourcePosition.ra +" " +lastSelectedSourcePosition.dec);

			//aladin.gotoRaDec(lastSelectedSourcePosition.ra,lastSelectedSourcePosition.dec)
		}
		else{
			//MessageBox.alertBox("You haven't chose a source!");
			Alix_Modalinfo.info("You haven't chose a source!");
			
		}
		//gotoObject(defaultPosition);
		//aladin.gotoPosition(aladinLiteView.ra,aladinLiteView.dec);
		controller.cleanPolygon();
        //event.stopPropagation();
	}
	var historySelected = false;
	var regionSelected = false;
	var bookMark = function(){
		checkBrowseSaved();
		$("#SourceDiv").css("display","none");
		contextDiv.css("max-height", "200px");
		//set height_ul to the height of context panel. _shan
		if( contextDiv.height() < 200 ){
			//$(".ui-dialog").animate({height:'200px'},"fast");
			contextDiv.css("height","auto");
			contextDiv.css("border-width", "0.2px");
			height_ul = $("#history_ul").height() + 80;
			
		}
		aladinLiteView.XMM = false;
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith("Swarm")) {
				aladinLiteView.XMM = true;
			}
		}
		
        storeCurrentState();
		controller.bookMark(aladinLiteView);
		
	}
    var checkBrowseSaved = function(){
    	if(browseSaved == false){
			var a = confirm("Do you want to save your polygon?") ;
			if(a == true){
				$("#regionEditor_a").trigger("click");
			}else{
				browseSaved = null;
				controller.cleanPolygon();
			}
		}
    }
	var getHistory = function(){
		checkBrowseSaved();
		$("#SourceDiv").css("display","none");
		contextDiv.css("max-height", "200px");
		controller.getHistory();
		if(contextDiv.height() < 10 /*&& $("#history").attr("class")=="alix_btn alix_btn-circle alix_btn-green  alix_button_history alix_unselected"*/){
			contextDiv.css("height","auto");//set height_ul to the height of context panel. _shan
			contextDiv.css("border-width", "0.2px");
			 historySelected = true;
			 regionSelected = false;
		}else if(contextDiv.height() > 10 ){
			if(historySelected){
				contextDiv.animate({height:0},"fast");
				 historySelected = false;
				 regionSelected = false;
		}else {
			contextDiv.css("height","auto");//set height_ul to the height of context panel. _shan
			contextDiv.css("border-width", "0.2px");
			 historySelected = true;
			 regionSelected = false;
		}
		}
		//event.stopPropagation();
	}
	
	/**
	 * revenir dans la situation de l'historic
	 */
	var restoreView = function(storedView) {
		if(aladinLiteView.region != null){
			controller.cleanPolygon();
		}
		aladinLiteView = jQuery.extend(true, {}, storedView);
		targetDiv.val(aladinLiteView.name);
	    aladin.gotoRaDec(aladinLiteView.ra,aladinLiteView.dec);
        aladin.setFoV(aladinLiteView.fov);
        displaySelectedHips(aladinLiteView.survey.ID);
        selectHipsDiv.val(aladinLiteView.survey.ID);
        if(aladinLiteView.region != null){
        if(!regionEditorInit){
        	//create the editregion environment (if it hasn't been created )for the polygon in the localstorage
        	controller.editRegion();
    			}
        	var points = {type: null, value: []};
        	points.type = aladinLiteView.region.format;
        	points.value = aladinLiteView.region.points;
        	controller.setInitialValue(points);
        }
        
        //event.stopPropagation();
    }	
	
	var restoreViewById = function(viewId) {
		cleanCatalog("all");//clean all the catalogs in the aladin.view
		var storedView = controller.restoreViewById(viewId);
		//controller.buildHipsTab(storedView);
		restoreView(storedView);
		if(storedView.catalogTab != null){
		   controller.buildCataTab(storedView);//This also includes restoreCatalog(storedView).
		   //controller.restoreCatalog(storedView);
			//give the data to cata_dict(catalog dictionary) for the bookmarks saved in localstorage and call the restorecatalog when cata_dict is built.  
			
		}
		//11/10/2018 To avoid the data sources being loading for the second time which create the problem for the historic target dispalying
		if(aladinLiteView.XMM == true){
				//if the xmm already exists, don't change it
				controller.displayDataXml(aladinLiteView);
		}
		
		var html_option = '<select id="status" class ="alix_selector_hips ">'
		html_option += "<option value='"+ aladinLiteView.survey.ID +"'>"+ aladinLiteView.survey.ID +"</option>";
			for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
				if(controller.modules.historicModel.hips_tab[s]!=aladinLiteView.survey.ID){
					html_option += "<option value='" 
					+ controller.modules.historicModel.hips_tab[s] 
					+ "'>"
					+ controller.modules.historicModel.hips_tab[s] +"</option>"
				}
			}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
		if(aladinLiteView.target.length > 0){
			//consoloe.log("#####"+aladinLiteView.target.length);
			for(var i = 0;i<aladinLiteView.target.length;i++){
				var ra = aladinLiteView.target[i].ra;
				var dec = aladinLiteView.target[i].dec;
				var ct = A.catalog({name: "target", color:"green"});
				aladin.addCatalog(ct);
				ct.addSources([A.marker(ra, dec,  {popupTitle:'target'})]);
			}
        }
		 aladin.view.imageSurvey.getColorMap().update(aladinLiteView.colorMap);
		 if(aladinLiteView.reverseColor){
    	 aladin.view.imageSurvey.getColorMap().reverse(); 
		 }
		 if(aladinLiteView.sourceSelected.x && aladinLiteView.sourceSelected.y){
			 WaitingPanel.show("the selected source");
	    	 var x = aladinLiteView.sourceSelected.x;
	    	 var y = aladinLiteView.sourceSelected.y;
	    	 setTimeout(function(){reselectSource(x,y); WaitingPanel.hide("the selected source")}, 2500);
	    	 //Not well done. Wait 3 seconds for all sources displaying in the view and then reselect
		}
    }
	var reselectSource = function(x,y){
		  var objs = aladin.view.closestObjects(x, y, 5);
          if (objs) {
              var o = objs[0];

              // footprint selection code adapted from Fabrizzio Giordano dev. from Serco for ESA/ESDC
              if (o instanceof Footprint || o instanceof Circle) {
                  o.dispatchClickEvent();
              }

              // display marker
              else if (o.marker) {
                  // could be factorized in Source.actionClicked
                  aladin.view.popup.setTitle(o.popupTitle);
                  aladin.view.popup.setText(o.popupDesc);
                  aladin.view.popup.setSource(o);
                  aladin.view.popup.show();
              }
              // show measurements
              else {
                  if (aladin.view.lastClickedObject) {
                      aladin.view.lastClickedObject.actionOtherObjectClicked && aladin.view.lastClickedObject.actionOtherObjectClicked();
                  }
                  o.actionClicked();
              }
              aladin.view.lastClickedObject = o;
              var objClickedFunction = aladin.view.aladin.callbacksByEventName['objectClicked'];
              (typeof objClickedFunction === 'function') && objClickedFunction(o);
          }
          else {
              if (aladin.view.lastClickedObject) {
                  aladin.view.aladin.measurementTable.hide();
                  aladin.view.popup.hide();

                  if (aladin.view.lastClickedObject instanceof Footprint) {
                      //aladin.view.lastClickedObject.deselect();
                  }
                  else {
                      aladin.view.lastClickedObject.actionOtherObjectClicked();
                  }

                  aladin.view.lastClickedObject = null;
                  var objClickedFunction = aladin.view.aladin.callbacksByEventName['objectClicked'];
                  (typeof objClickedFunction === 'function') && objClickedFunction(null);
              }
          }
	}
	
	/**
	 * stoker le 'aladinLiteView' courant
	 */
	var storeCurrentState = function(){
		var radec = aladin.getRaDec();
		
		aladinLiteView.name = targetDiv.val();
		aladinLiteView.ra = radec[0];
		aladinLiteView.dec = radec[1];
		var l = aladin.getFov();
		aladinLiteView.fov = l[0];
		aladinLiteView.img = aladin.getViewDataURL({width: 400, height: 400});
		aladinLiteView.catalogTab = controller.currentCatalogTab(aladin.view.catalogs);
		aladinLiteView.colorMap = aladin.view.imageSurvey.getColorMap().mapName;
		aladinLiteView.reverseColor = aladin.view.imageSurvey.getColorMap().reversed;
		var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
		var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);

	}
	
	/**
	 * stoker le region courant
	 */
	var storePolygon = function(region){
		aladinLiteView.region = region;
	}
	
	/**
	 * click function 'region'
	 */
	var regionEditorInit = false;//To judge if regioneditor is already initialled
	var regionEditor = function(){
		//if(aladinLiteView.region != null){
			//controller.cleanPolygon();
		//}
		checkBrowseSaved();
		$("#SourceDiv").css("display","none");
		contextDiv.css("max-height", "200px");
		storeCurrentState();
		//contextDiv.html("");
		//if(contextDiv.height() < 10){
			// open the region  editor
			if(!regionEditorInit){
			controller.editRegion();
			}
			//controller.cleanPolygon();
			//contextDiv.animate({height:'101px'},"fast");//change the context height from 200px to 101px. _shan
			//contextDiv.css("border-width", "0.2px");
			historySelected = false;
			regionSelected = true;
			//regionEditorInit = true;
	/*	}else if(contextDiv.height() >= 50){
			// contextDiv.height() >= 50 BECAUSE in the browser firefox, the height has some strange way to calculate , 101px maybe will be calculated as "99"
			if(regionSelected){
			// close the region  editor
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			regionSelected = false;
			historySelected = false;
			//controller.cleanPolygon();
			//controller.closeEditor();
		}else{
			//open region editor from while history page is open
			//controller.cleanPolygon();
			controller.editRegion();
			contextDiv.animate({height:'101px'},"fast");
			regionSelected = true;
			historySelected = false;
			regionEditorInit = true;
		}*/
	//}
	}
	

	/**
	 * go to the object by enter its name 
	 */
	var gotoObject = function(posName, posthandler){
		selectDiv.val($('#'+posName).val());
		targetDiv.val(posName);
        aladin.gotoObject(posName,{
        	success: function(pos){
        		aladinLiteView.name = targetDiv.val();
        		aladinLiteView.ra = pos[0];
        		aladinLiteView.dec = pos[1];
    			var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
    			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);
        		var l = aladin.getFov();
        		aladinLiteView.fov = l[0];
    			controller.updateCatalogs(aladinLiteView,'position');
    			var re = /^[0-9a-zA-Z]*$/;        //determine if it is a name
    			if(re.test(posName))
    				addPositionInSelector(posName);
    			else
    				addPositionInSelector(strlon+" +"+strlat);
        		if(posthandler){
        			posthandler();
        		}
        	}
        	,error: function(){alert('It\'s not a correct position');}
        	});		        		
	}
	
	/**
	 * Change states of panel
	 */
	var switchPanel = function() {
		if( menuDiv.width() < 100 ){
			menuDiv.animate({width:'+=250px'},"fast");
			$(".alix_menu_item").css("display", "inline");
			$("#open_all").animate({left:'+=250px'},"fast");
			$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-left");
			//$(".ui-dialog").animate({width:'+=250px'},"fast");
		} else {
			menuDiv.animate({width:'-=250px'},"fast");
			$(".alix_menu_item").css("display", "none");
			//$("#vizier").css("display","none");
			$("#open_all").animate({left:'-=250px'},"fast");
			$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-right");
			//$(".ui-dialog").animate({width:'-=250px'},"fast");
		}
	}
	
	var closeContext = function() {
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 99 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			$(".alix_context").css("display", "none");
			contextDiv.html("");
			////$(".ui-dialog").animate({height:'0px'},"fast");
			targetDiv.val(aladinLiteView.name);
		}
	}
	
	/**
	 * utiliser quand clique sur button edit , pour disable bookMark et history
	 */
	var disabledButton = function(){
		document.getElementById("bookMark").disabled=true;
		document.getElementById("history").disabled=true;
		document.getElementById("center").disabled=true;
	}
	
	/**
	 * utiliser quand clique sur button browse , pour reable bookMark et history
	 */
	var reabledButton = function(){
		document.getElementById("bookMark").disabled=false;
		document.getElementById("history").disabled=false;
		document.getElementById("center").disabled=false;
	}
	
	/**
	 * suprrimer l'élement dans l'historic, id se correspont à le id du croix et de la liste 
	 */
	var deleteHistory = function(id){
		controller.deleteHistory(id);
		//event.stopPropagation();
	}
		
	var searchHips = function(hips_mask){
		controller.searchHips(hips_mask,aladinLiteView);
	}
	
	var hipsFunction = function(ID,title){
		displaySelectedHips(ID);
		createHipsSelect(ID,title);
		displayDetailInContext(ID);
	}
	
	/**
	 * obs_id: catalogue identifier
	 * title: catalogue full name, just for user information
	 */
	var catalogFunction = function(obs_id, title){
		var stitle = (title)? " [" + title + "]": " [No title]"
		if(!LibraryCatalog.getCatalog("VizieR:"+obs_id)){
			controller.createCatalogSelect(obs_id);
			addCatalogInSelector(obs_id, stitle);
		}
		else{
			var shown = false;
			$("#vizier_list").find("li").each(function() {
				   if ($(this).hasClass(obs_id)) {
					   //console.log("VizieR:"+obs_id+"exists already in library Catalog and is shown");
					   shown = true;
				   }
			})
			if(shown == false){
				controller.createCatalogSelect(obs_id);
				//console.log("VizieR:"+obs_id+"exists already in library Catalog but not shown");
			}
		}
		$("#itemList").css("display", "none");
	}

	var displaySelectedHips = function(ID) {
		var hips = controller.getSelectedHips(ID);
		aladinLiteView.survey = hips;
		if (hips === undefined) {
			console.error('unknown HiPS');
			return;
		}
		$("#itemList").css("display", "none");
		var fmt = "";
		if(hips.hips_tile_format.indexOf("png") >=0  ){
			fmt = "png";
		} else {
			fmt = "jpg";
		}
		if( fmt != ""){
			setImageSurvey(createImageSurvey(hips.obs_title, hips.obs_title, hips.hips_service_url, hips.hips_frame, hips.hips_order, {imgFormat: fmt})  );
		}else{ 
			setImageSurvey(createImageSurvey(hips.obs_title, hips.obs_title, hips.hips_service_url, hips.hips_frame, hips.hips_order)  );
		}
	}
	
	var createHipsSelect = function(ID,title){
		var select_hips = document.getElementById(selectHipsDivId);
		var lengthOption = select_hips.options.length;
		//if(lengthOption==0)
			//controller.modules.historicModel.hips_tab.push("CDS/P/DSS2/color");
		for(var i=0;i<lengthOption;i++){
			if(select_hips.options[i].text == ID)
				return false;
		}
		controller.modules.historicModel.hips_tab.push(ID);
		var stitle = (title)? " ["+title+"]":" [no title]";
		var html_option = '<select id="status" class ="alix_selector_hips ">'
			html_option += "<option value='"+ ID +"'>"+ ID +stitle+"</option>";
				for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
					if(controller.modules.historicModel.hips_tab[s]!=ID){
						var hips = controller.getSelectedHips(controller.modules.historicModel.hips_tab[s]);
						var subtitle = (hips.obs_title)? " ["+hips.obs_title+"]":" [no title]";
						html_option += "<option value='" 
						+ controller.modules.historicModel.hips_tab[s] 
						+ "'>"
						+ controller.modules.historicModel.hips_tab[s] +subtitle+"</option>"
					}
				}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
	}
	/*var addHipsSelect = function(ID)
	var addCatalogInSelector = function(obs_id, stitle){//add the catalog to the selector
		//To avoid adding the same catalog obs_id again
		var select_vizier = document.getElementById("select_vizier")
		var lengthOption = select_vizier.options.length;
		$("#select_vizier").val(obs_id);
		for(var i=0;i<lengthOption;i++){
			if(select_vizier.options[i].text.startsWith(obs_id + " "))
				return false;
		}
		var cata_select = '<option>'
			+obs_id + stitle
			+'</option>';
		$("#select_vizier").append(cata_select);
	}*/
	

/*	var createPositionSelect = function(ID){

		controller.modules.historicModel.hips_tab.push(ID);
		var html_option = '<select id="status" class ="alix_selector_hips alix_menu_item">'
			html_option += "<option value='"+ ID +"'>"+ ID +"</option>";
				for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
					if(controller.modules.historicModel.hips_tab[s]!=ID){
						html_option += "<option value='" 
						+ controller.modules.historicModel.hips_tab[s] 
						+ "'>"
						+ controller.modules.historicModel.hips_tab[s] +"</option>"
					}
				}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
	}*/
	
	
	var addPositionInSelector = function(pos){
		//To avoid adding the same catalog obs_id again
		var select_position = document.getElementById("aladin-lite-div-select")
		var lengthOption = select_position.options.length;
		for(var i=0;i<lengthOption;i++){
			if(select_position.options[i].id == pos)
				return false;
		}
		if(pos != ""){
			var pos_select = '<option id="'+pos+'">'+pos+'</option>';
			selectDiv.append(pos_select);
			selectDiv.val(pos);
		}
	}
	
	/**
	 * obs-id: catalogue identifier
	 * stitle: catalogue full name, just for user information
	 */
	var addCatalogInSelector = function(obs_id, stitle){//add the catalog to the selector
		//To avoid adding the same catalog obs_id again
		var select_vizier = document.getElementById("select_vizier")
		var lengthOption = select_vizier.options.length;
		$("#select_vizier").val(obs_id);
		for(var i=0;i<lengthOption;i++){
			if(select_vizier.options[i].text.startsWith(obs_id + " "))
				return false;
		}
		var cata_select = '<option>'
			+obs_id + stitle
			+'</option>';
		$("#select_vizier").append(cata_select);
	}
	
	var displayDetailInContext = function(ID){
		//contextDiv.css("max-height", "200px");
		var hips = controller.getSelectedHips(ID);
		if(hips != undefined){
			var html = '<p style="color:#4D36DC;margin:10px;" >';
			html +=  hips.obs_title +"</p>"
			+"<span style='font-size:small;color : #727371;margin:10px;'>"+ID +"</span>"
			+"<p style='font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;'>&nbsp;&nbsp;" + hips.obs_description + "<br>";
			html += '</p>';
			$("#panel_image_detail").html(html);
			$("#panel_image_detail").toggle();
		}
		/*	if(contextDiv.height() > 100){
				contextDiv.html(html);
			}else{
				contextDiv.animate({height:'200px'},"fast");
				contextDiv.css("border-width", "0.2px");
				contextDiv.html(html);
			//	//$(".ui-dialog").animate({height:'200px'},"fast");
			}
		}else{
			alert("Please enter a survey ID");
		}*/
		//event.stopPropagation();
		
	}
	
	var showDetail = function(ID){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			//////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{
			displayDetailInContext(ID);
		}
		//event.stopPropagation();
	}
	// display the  especial detail site for each catalog . buttuon 'i' .
	var displayCatalogDetailInContext = function(obs_id,color){
		/*if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
			////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{*/
			var cata = controller.getSelectedCatalog(obs_id);
			var index = obs_id.split("/");
			index.pop();
			index=index.join("/");
			var length=index.length-1;
			if(cata != undefined){
			var html ='<div style="background-color:'+color+';border-radius: 5px;box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);"><a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
			+ 'style="top: 18px;float: right; margin-right: 8px; margin-top: 2px;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
			+ '<span class="glyphicon glyphicon-remove" style="color: white;"></span></a><br></div>'
				+'<iframe id = "cds_iframe"  name="content_frame" marginwidth=0 marginheight=0 width=100% height=100% src="http://cdsarc.u-strasbg.fr/viz-bin/ReadMe/'+index+'/?format=html&tex=true" frameborder="0"'
				+'style = "" ></iframe>'
			/*	var html = '<p style="color:#4D36DC;margin:10px;" >';
				html +=  cata.obs_title + "</p><p style='font-size:small;margin:10px;'>" + cata.obs_description + "<br>";
				html += '</p>';*/  
				$("#itemList").html(html);
				$("#itemList").css("display","block");
				contextDiv.html(html);
				//$(".ui-dialog").animate({height:'400px'},"fast");
				
			}else{
				alert("Please choose a catalog");
			}
			
		//}
		//event.stopPropagation();		
	}
	
	//catalog = A.catalogHiPS(url, {onClick: clickType,name: name,color: color}, WaitingPanel.hide(name))
	var configureCatalog = function(i,c){
		var i = i;
		var obs_id;
		var obs_id_use;
		var colorHex;
		var cata;
		var colorRgb;
		if(i=="XMM"){
			if(LibraryCatalog.getCatalog("Swarm")){
			cata = LibraryCatalog.getCatalog("Swarm").al_refs;}//else{alert("Please choose a catalog")};
			obs_id_use= i;
			if(c=="red"){
				colorRgb="rgb(255,0,0)";
				}else{
				colorRgb=c;
			};
		}else if(i=="Simbad"||i=="NED"){
			if(LibraryCatalog.getCatalog(i)){
			cata = LibraryCatalog.getCatalog(i).al_refs;}//else{alert("Please choose a catalog")};
			obs_id_use= i;
			if(c=="red"){
				colorRgb="rgb(255,0,0)";
				}else if(c=="orange"){
				colorRgb="rgb(255,165,0)";
				}else{
				colorRgb=c;
			};
		}else{
			 obs_id_use=$("#cata_operate_"+ i).text();
			 obs_id=$("#cata_operate_"+ i).text();
			 cata= LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
			// cata = controller.getSelectedCatalog(obs_id);
		    colorRgb= document.getElementById("cata_operate_"+ i).style.color;		
		}
		//Transform color rgb(0,0,0)to color Hex
		var color= colorRgb.substring(4,colorRgb.length-1);
		color= color.split(",");
		function componentToHex(rgb) {
			var hex = Number(rgb).toString(16);
			  if (hex.length < 2) {
			       hex = "0" + hex;
			  }
			  return hex;
		}
		function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		var r = color[0];var g = color[1];var b = color[2];
		colorHex = rgbToHex(r, g, b);
		
		/*if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
			////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{*/
			if(cata != undefined){
			var html ='<div id="'+obs_id_use+'"class="'+i+'" style = "box-shadow: 0 0 20px 2px '+colorHex+' ;height=140px; margin-left: 5px; height: 140px;">'
				+'<div class="alix_configurationShape" ><b>Shape:</b>'
				+'<i id="shape_plus" title="plus" class="glyphicon glyphicon-plus alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_cross" title="cross" class="glyphicon glyphicon-remove alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_circle" title="circle" class="glyphicon glyphicon-record alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_triangle" title="triangle" class="glyphicon glyphicon-triangle-top alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_rhomb" title="rhomb" class="glyphicon glyphicon-unchecked alix_shapeChoice " style="cursor: pointer;transform: rotate(45deg);" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_square" title="square" class="glyphicon glyphicon-stop alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'</div>'
				+'<div class="alix_configurationShape"><b>Size:</b>'
				+'<div id="sliderBox"><span class="alix_min-value">1</span><input id="slider_Shape" class=" alix_slider_Shape"  type="range" step="1" value="8" min="1" max="50" oninput="AladinLiteX_mVc.updateSizeOfCatalog(this.value,this.id)"><span class="alix_max-value">50</span>'
				+'<span class="range-value" id="range-value0"></span>'
				+'</div></div>'
				+'<div class="alix_configurationShape"><b>Color:  </b><input id="colorSelect" type = "text" style = "margin-left: 15px;"></input></div>'
				//+'<div class="alix_configurationShape"><b>Color:</b><input id="colorSelect" type="color" style = "margin-left: 15px;" value="'+colorHex+'" oninput="AladinLiteX_mVc.updateColorOfCatalog(colorSelect.value,this.id)"></input></div>'
				+'</div>' 
				/*if(contextDiv.height() > 100){
					/*contextDiv.html(html);
					$("#colorSelect").spectrum({
					    color: colorHex,
					    change: function(color) {
					    	AladinLiteX_mVc.updateColorOfCatalog(color,'colorSelect')
					        }
					    });*/
				/*}else{
					contextDiv.animate({height:'150px'},"fast");
					contextDiv.css("max-height", "200px");
					contextDiv.css("border-width", "0.2px");
					//contextDiv.html(html);
					//$(".ui-dialog").animate({height:'150px'},"fast");
				}*/
				$('#panel_catalog_detail').html(html);
			$('#panel_catalog_detail').toggle();
		//	contextDiv.html(html);
			//Define the color select
			$("#colorSelect").spectrum({
			    color: colorHex,
			    preferredFormat: "hex3",
			   // flat: true,
			    showInput: true,
			    showPalette: true,
			    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
			    change: function(color) {
			    	AladinLiteX_mVc.updateColorOfCatalog(color.toHexString(),'colorSelect')
			        }
			    });
			}else{
				alert("Please choose a catalog");
			}
		//}
	}
	
	var updateColorOfCatalog =function(hex,id){
		var boxDiv = document.getElementById(id).parentNode.parentNode;
		var i=boxDiv.className;
		boxDiv.style.boxShadow ='0 0 20px 2px '+hex;
		if(i=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
			$("#"+ i).css("color",hex);
			$("#btn-"+ i+"-description").css("color",hex);
			$("#btn-"+ i+"-configure").css("color",hex);
			$("#btn-"+ i+"-flash").css("color",hex);
			LibraryCatalog.updCatalog({ name:"Swarm" ,color: hex});
			//Save the configuration in library catalog
		}else if(i=="Simbad"||i=="NED"){
			catalog = LibraryCatalog.getCatalog(i).al_refs;
			$("#"+ i).css("color",hex);
			$("#btn-"+ i+"-configure").css("color",hex);
			$("#btn-"+ i+"-flash").css("color",hex);
			LibraryCatalog.updCatalog({ name:i ,color: hex});
		}else{
		var obs_id=$("#cata_operate_"+ i).text();
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		$("#cata_operate_"+ i).css("color",hex);
		$("#btn_detail_catalog_"+ i).css("color",hex);
		$("#btn_flash_catalog_"+ i).css("color",hex);
		$("#btn_configure_catalog_"+ i).css("color",hex);
		$("#btn_delete_catalog_"+ i).css("color",hex);
		LibraryCatalog.updCatalog({ name: 'VizieR:'+obs_id ,color: hex});
		}
		catalog.updateShape({color:hex});
	}
	var updateShapeOfCatalog =function(shape,id){
		var obs_id = document.getElementById(id).parentNode.parentNode.id;
		var catalog;
		if(obs_id=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
		}else if(obs_id=="Simbad"||obs_id=="NED"){
			catalog = LibraryCatalog.getCatalog(obs_id).al_refs;
		}else{
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		}
		catalog.updateShape({shape:shape});
	}
	var updateSizeOfCatalog =function(size,id){
		var obs_id = document.getElementById(id).parentNode.parentNode.parentNode.id;
		var catalog;
		if(obs_id=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
		}else if(obs_id=="Simbad"||obs_id=="NED"){
			catalog = LibraryCatalog.getCatalog(obs_id).al_refs;
		}else{
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		}
		catalog.updateShape({sourceSize:Number(size)});
	}
	
	var findSurveyDescriptionById = function(id){
		var hips = controller.getSelectedHips(id);
		return hips.obs_description;
	}
	
	var searchCataloge = function(cataloge_mask){
		controller.searchCataloge(cataloge_mask,aladinLiteView)
	}
	
	var searchPosition= function(pos){
		var position;
		if(pos){
			position = pos;
		}else{
			position = targetDiv.val();
		}
		if(aladinLiteView.region != null){
			controller.cleanPolygon();
		}
		aladinLiteView.clean();
		gotoObject(position);
		//event.stopPropagation();
	}
	
	
	var displaySimbadCatalog = function(){
		//event.stopPropagation();
		controller.displaySimbadCatalog();	
	}
	
	var displayNedCatalog = function () {
		//event.stopPropagation();
		storeCurrentState();
		controller.displayNedCatalog(aladinLiteView);
	}
		
	var detailCatalogOperator = function(i){
		//event.stopPropagation();
		checkBrowseSaved();
		var p_text=$("#cata_operate_"+ i).text();
		var p_color= document.getElementById("cata_operate_"+ i).style.color;
		displayCatalogDetailInContext(p_text,p_color);
	}
	
	
	var displayDataXml = function(){		
		//event.stopPropagation();
		checkBrowseSaved();
		storeCurrentState();
		contextDiv.html("");
		closeContext();
		controller.displayDataXml(aladinLiteView);
	}
	
	var XMMFlash = function(){
		//event.stopPropagation();
		if(XMMcata != null){
			XMMcata.makeFlash();
		}
	}
	var SimbadFlash = function(){
		//event.stopPropagation();
		if(LibraryCatalog.getCatalog("Simbad")){
		var Simbadcata = LibraryCatalog.getCatalog("Simbad").al_refs};
		if(Simbadcata != null){
			Simbadcata.makeFlash();
		}
	}
	var NEDFlash = function(){
		//event.stopPropagation();
		if(LibraryCatalog.getCatalog("NED")){
		var NEDcata = LibraryCatalog.getCatalog("NED").al_refs};
		if(NEDcata != null){
			NEDcata.makeFlash();
		}
	}
		
	var openContextPanel = function(html){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 39){
			contextDiv.css("height", "101px");
			contextDiv.html(html);
		}else{
			contextDiv.animate({height:'101px'},"fast");
			contextDiv.css("border-width", "0.2px");
			contextDiv.html(html);
			//$(".ui-dialog").animate({height:'101px'},"fast");
		}
	}

	var closeCatalogMerged = function(e){
		$(".catalogMerged").css("display","none");
	}
	
	
	
	var bindToFade = function(){
		var currentColor=null; //XMM
		var currentVizierColor= new Array(); //Vizier
		var catalog;
		var color;

		$("#minus").unbind("click").click(function(e){
			    for(var name in LibraryCatalog.catalogs){
					if(name.startsWith('Swarm'))name = 'Swarm';
					if(name.startsWith('Simbad'))name = 'Simbad';
					if(name.startsWith('NED'))name = 'NED';
					var catalog =  LibraryCatalog.getCatalog(name);
					//var catalog = LibraryCatalog.catalogs[name];
					var originColor = catalog.color;
					var catalogRef = catalog.al_refs;
					var currentColor = catalogRef.color;
					//console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
					if(currentColor=="orange")currentColor="#ffa500";
					if(currentColor=="red")currentColor = "#ff0000";//To avoid the color take the value"red" sometimes.
					var hex = colorFadeOut(currentColor);
					catalogRef.updateShape({color:hex});
					}
			});
		$("#plus").unbind("click").click(function(e){
			    for(var name in LibraryCatalog.catalogs){
			    	var catalog = LibraryCatalog.catalogs[name];
					if(name.startsWith('Swarm'))name = 'Swarm';
					if(name.startsWith('Simbad'))name = 'Simbad';
					if(name.startsWith('NED'))name = 'NED';
					var catalog =  LibraryCatalog.getCatalog(name);
					var originColor = catalog.color;
					var catalogRef = catalog.al_refs;
					var currentColor = catalogRef.color;
					//console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
					if(currentColor=="orange")currentColor="#ffa500";
					if(currentColor=="red")currentColor = "#ff0000";
					if(originColor=="orange")originColor="#ffa500";
					if(originColor=="red")originColor = "#ff0000";//To avoid the color take the value"red" sometimes.
					var hex = colorFadeIn(currentColor,originColor);
					catalogRef.updateShape({color:hex});
					}
		});
	}
	
	var displayCatalog = function(name, color, clickType, url,masterResource){
		var catalog;
		var self = this;
		var sourceSize=8;
		clickType=VizierCatalogue.showSourceData;
		if(name == 'Simbad'){
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
				catalog = A.catalogHiPS(url, {onClick: SimbadCatalog.simbad,name: name,color: color,sourceSize:sourceSize 
					,shape: shape,filter:SimbadCatalog.filterSource}
				    , WaitingPanel.hide(name)
				    );
				aladin.addCatalog(catalog);	
				SimbadCatalog.setCatalog(catalog);
				/*if(SimbadCatalog.getisFiltered())
					SimbadCatalog.runConstraint();
				SimbadCatalog.runConstraint()
				if(SimbadCatalog.getType()!=undefined)
					SimbadCatalog.displayCatalogFiltered();*/
		}else if(name == 'NED'){
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
			if(aladin.getFov()[0]>0.02){
				catalog = A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, 0.02
				, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}
				, function() {WaitingPanel.hide(name)});
				aladin.addCatalog(catalog);
			}else{
				catalog = A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, aladin.getFov()[0]
				, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}
				, function() {WaitingPanel.hide(name)});
				aladin.addCatalog(catalog);
			}
		/*	if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: name,color: color, shape :shape ,fade : "", al_refs: catalog});
			} else{
			LibraryCatalog.updCatalog({url:url, name: name ,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };*/
		}else if(name == 'Swarm'){
			if(aladinLiteView.masterResource){
				aladinLiteView.masterResource.cleanTab();	
			}
			cleanCatalog("Target");
			cleanCatalog("Swarm");
			var shape = 'plus';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).al_refs.color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			}
			if(url!=undefined){
			  catalog = XMMcata = A.catalogFromURL(url
				,{     name: name, sourceSize:sourceSize
				    , shape: shape 
				    , color: color
				    , onClick:function(params) {
						/*
						 * function click for the source in catalog XMM
						 */
						sourceSelected = this;//save the reference of selected source as an global var in order to allow us deselect it easilier in the deselectSource();
						aladinLiteView.sourceSelected.x = params.x;
						aladinLiteView.sourceSelected.y = params.y;
						var data = params.data;
						var showPanel = aladinLiteView.masterResource.actions.showPanel.active;
						//console.log("&&&&&&"+aladinLiteView.masterResource+"and"+typeof( aladinLiteView.masterResource.actions.externalProcessing))
						if( aladinLiteView.masterResource&&typeof( aladinLiteView.masterResource.actions.externalProcessing.handlerSelect)=="function") {
							aladinLiteView.masterResource.actions.externalProcessing.handlerSelect(data,showPanel);
						}
						var r1="", r2="";
						for( var k  in data){
							r1 += "<td >" + k + "</td>";
							r2 += "<td >" + data[k] + "</td>";
						}
						var html = "<table class='dataTable' border=1 style='font-size: small;display:none;'><tr style='font-weight: bold;'>" + r1 + "</tr><tr align=center>" + r2 + "</tr></table>"					
						
				
						if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.showPanel.active == true ) {
							openContextPanel(html);
							$(".dataTable").css("display","table");
						}else{
							$(".dataTable").css("display","none");
						};
						
						if( masterResource != undefined&&!aladinLiteView.masterResource.actions.showAssociated) {
							openContextPanel(html);
						} else {
							/*
							 * draw the point target of the cata XMM chosen to large circle
							 */
							cleanCatalog("Target");
							cleanCatalog("oid");
							var ct = A.catalog({name: "Target"});
							aladin.addCatalog(ct);
							//Take off the circle on the catalog alix_selected
							//ct.addSources([A.marker(data.pos_ra_csa, data.pos_dec_csa,  {popupTitle:'oid: '+data.oidsaada})]);
							//aladinLiteView.target.push({ra:data.pos_ra_csa, dec:data.pos_dec_csa, ct:ct});
							/*
							 * draw oid and url corresponded in context panel
							 */
							/*var myRegexp = /\{\$(.*)\}/g;
							var match = myRegexp.exec(aladinLiteView.masterResource.actions.showAssociated.url);
							var idField = match[1];
							var idvalue = data[idField];
							var re =  new RegExp("\\{\\$" + idField + "\\}", 'g');
							console.log(re)
							var lien = aladinLiteView.masterResource.actions.showAssociated.url.replace(re ,idvalue);
							lienArray=[];
							lienArray.push(lien);
							console.log(re + " " + idField + " " + idvalue  + " " + lien);
							*/
							//make the associated source shown directly
							$("#ACDS").off("click");
							$("#ACDS").click(function(event){
								var myRegexp = /\{\$(.*)\}/g;
								var match = myRegexp.exec(aladinLiteView.masterResource.actions.showAssociated.url);
								var idField = match[1];
								var idvalue = data[idField];
								var re =  new RegExp("\\{\\$" + idField + "\\}", 'g');
								//console.log(re)
								var lien = aladinLiteView.masterResource.actions.showAssociated.url.replace(re ,idvalue);
								//console.log(re + " " + idField + " " + idvalue  + " " + lien);

								//console.log($("#ACDS").css("color"));
								var actualColor = $("#ACDS").css("color");
								if(actualColor == "rgb(50, 255, 236)" ||actualColor == "#32FFEC"){
									$("#ACDS").css("color","#888a85")
									AladinLiteX_mVc.deleteSourceAuto();
								    AladinLiteX_mVc.deleteLastSelectedPosition();
								}
								else{
									$("#ACDS").css("color","rgb(50, 255, 236)")
									if(aladinLiteView.masterResource.actions.showAssociated.active == true) {
									$("#XMM").attr("class", "alix_XMM_in_menu  alix_datahelp");//to freeze the view , and don't reload the XMM source when position is changed unless we use 'keypress' to go far away
									$('#'+ idvalue).css("color","#32FFEC");
										$.getJSON(lien, function(jsondata) {
											var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:VizierCatalogue.showSourceData});
											aladin.addCatalog(cat);
											for( var i=0 ; i<jsondata.CounterParts.length ; i++ ){
												var point=jsondata.CounterParts[i].source;
												cat.addSources([A.source(point.position.ra, point.position.dec, {ra: Numbers.toSexagesimal(point.position.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.position.dec, 7, true), Name: point.name, Description: point.description})]);
												//cat.addSources([A.source(point.ra, point.dec, {ra: Numbers.toSexagesimal(point.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.dec, 7, true), Name: point.name, Description: point.description})]);
											};
											if(aladinLiteView.masterResource.actions.showAssociated.handlerFadeOut == true){
												AladinLiteX_mVc.fadeOutAuto()
											};
										});
									}
								}
							});
							
						}
					return true;
					}
			
			  }
			, function() {
				SwarmDynamicFilter.runConstraint(aladinLiteView);
				WaitingPanel.hide("Swarm");
			//When the XMM sources is updated by changing the position or zoom, recall the filter
				} /*WaitingPanel.hide()*/
			);
			/*if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
		} else{
			LibraryCatalog.updCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
	    };*///if name == SWARM
			bindToFade();
			
			aladin.addCatalog(catalog);
			cleanCatalog("oid");
			if(!LibraryCatalog.getCatalog(name)){
				 LibraryCatalog.addCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
				} else{
					 LibraryCatalog.updCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
			    };
			}// if url defined 
			else {
				WaitingPanel.hide("Swarm");
			}
		} 
		

	}
	
	var displayVizierCatalog = function(obs_id, color, clickType, hips_service_url){
		var catalog;
		var fov;
		var self=this;
		var sourceSize =8;
		var shape ="square";
		if(LibraryCatalog.getCatalog('VizieR:'+obs_id)){
			color = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.color;
			sourceSize = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.sourceSize;
			shape = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.shape;
		 }
		if(hips_service_url != undefined){
			//catalog = A.catalogHiPS(hips_service_url, {onClick: clickType,name: 'VizieR:'+obs_id,color:color, sourceSize: sourceSize,shape: shape },WaitingPanel.hide(obs_id));
			//catalog = A.catalogHiPS(hips_service_url, {onClick: function(data){alert(data.catalog.name);},name: 'VizieR:'+obs_id,color:color, sourceSize: sourceSize,shape: shape },WaitingPanel.hide(obs_id));
			catalog = A.catalogHiPS(hips_service_url, {onClick: VizierCatalogue.showSourceData,name: 'VizieR:'+obs_id,color:color, sourceSize: sourceSize,shape: shape },WaitingPanel.hide(obs_id));
		}else{
				var catalog = null;
				
			 $.ajax({
			        url: 'http://alasky.u-strasbg.fr/footprints/estimate-nbrows/estimate-radius',
			        data: {viz_table_id: obs_id,
			        	   ra : aladin.getRaDec()[0],
			        	   dec : aladin.getRaDec()[1] ,
			        	   nb_min : 1000,
			        	   nb_max : 2000
			        	},
			        method: 'GET',
			        async: false, // Mode synchrone

			        dataType: 'text',
			        success: function(response) {

			        	var viewRadius = Math.sqrt((aladin.getFov()[0]*aladin.getFov()[0]) + (aladin.getFov()[1]*aladin.getFov()[1]))/2;
			        	var radius = parseFloat(response);
			        	if(viewRadius<0){
			        		alert("displayVizierCatalog : Sorry, rayon AL is negative = "+ viewRadius+"radius estime: " + radius );
			        		return false;
			        	}
			        	if( radius > viewRadius ) {
			        		radius = viewRadius
			        	} else {
							WaitingPanel.warn("Search radius reduced to " 
									+ (Math.round(radius*600.)/10) + "arcmin to get less than 2000 sources");
			        	}
	
						WaitingPanel.show(obs_id);
			
						catalog = A.catalogFromVizieR(obs_id
								, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
								, radius
								//, {onClick: function(x){alert(JSON.stringify(x.data));}, color:color,sourceSize: sourceSize,shape: shape }
						        , {onClick: VizierCatalogue.showSourceData, color:color,sourceSize: sourceSize,shape: shape }
								, function(sources) {
									WaitingPanel.hide(obs_id);
//									if( sources.length >= 999) {
//										WaitingPanel.warnNbSources();
//									}
								});
						
			        },
			        error: function(xhr, status, error) {
			        	WaitingPanel.warn(xhr.responseText);
			        }
			    }); 
		/*********
			fov = aladin.getFov()[0];

			catalog = A.catalogFromVizieR(obs_id
					, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
					, fov
					, {onClick: 'showTable', color: color}
					, function(sources) {
						WaitingPanel.hide(obs_id);
						if( sources.length >= 999) {
							WaitingPanel.warnNbSources();
						}
					});
		}
		****************/
		
		}
		aladin.addCatalog(catalog);
		if(!LibraryCatalog.getCatalog('VizieR:'+obs_id)){
			
		    LibraryCatalog.addCatalog({url:hips_service_url, name:'VizieR:'+obs_id,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,obs_id :obs_id,color: color, shape :shape,fade : "", al_refs: catalog}) 
		    }else{
		    	 LibraryCatalog.updCatalog({url:hips_service_url, name:  'VizieR:'+obs_id ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,obs_id :obs_id, color: color, shape :shape,fade : "", al_refs: catalog})
		    };
				bindToFade();
		return catalog;
		
	}
	
	
	var cleanCatalog = function(name){
		//clean all the catalogs in the current view
		if(name == "all"){
			for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
				aladin.view.catalogs.splice(c, 1);
				aladin.view.mustClearCatalog = true;
				c--;
			}
			aladin.view.requestRedraw(); 
			//!Important: when we clean the catalog XMM,NED,Simbad , change the class of the name in the panel too for the right judge in displaydataXml.
 			$("#XMM").attr("class", "alix_XMM_in_menu  alix_datahelp");
			$("#XMM").css("color", "#888a85");
			$("#btn-XMM-flash").css("color" , "#888a85");
			$("#btn-XMM-description").css("color" , "#888a85");
			$("#btn-XMM-configure").css("color" , "#888a85");
			$("#ACDS").css("display" , "none");
			$("#Simbad").attr("class", "alix_simbad_in_menu  alix_datahelp");
			$("#Simbad").css("color" , "#888a85");
			$("#btn-Simbad-flash").css("color" , "#888a85");
			$("#btn-Simbad-configure").css("color" , "#888a85");
			$("#NED").attr("class", "alix_ned_in_menu  alix_datahelp");
			$("#NED").css("color" , "#888a85");
			$("#btn-NED-flash").css("color" , "#888a85");
			$("#btn-NED-configure").css("color" , "#888a85");
			//$("#aladin-lite-div-context").html("");
		}
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith(name))  {
				aladin.view.catalogs.splice(c, 1);
				aladin.view.mustClearCatalog = true;
				aladin.view.requestRedraw(); 
				//break;
				c--;
			}
		}
		
	}

	var getAladinCatalogue = function(name) {
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name == name) {
				return aladin.view.catalogs[c]
			}
		}
		return null
	}

	var colorFadeOut = function(str_color){
		var str_nb = str_color.replace(/\#/g,"");
		var tab_rgb_str = str_nb.match(/.{2}/g);
		
		var tab_rgb_int=[3];
		for(var j=0;j<tab_rgb_str.length;j++){
				if(parseInt(tab_rgb_str[j],16) > 1){
					tab_rgb_int[j] = parseInt(parseInt(tab_rgb_str[j],16)/2);
					
				}else{
					tab_rgb_int[j] = 1;
				}
		}

		var hex="#"
		for(var i=0;i<tab_rgb_int.length;i++){
			if(tab_rgb_int[i].toString(16).length == 1){
				hex += "0" + tab_rgb_int[i].toString(16);
			}else{
				hex += tab_rgb_int[i].toString(16);
			}
		}
		
		return hex;
	}
	
	var colorFadeIn = function(str_color, org_color){
		var str_nb = str_color.replace(/\#/g,"");
		var tab_rgb_str = str_nb.match(/.{2}/g);
		
		var tab_rgb_int=[3];
		
		tab_rgb_int[0] = parseInt(parseInt(tab_rgb_str[0],16)*2);
		tab_rgb_int[1] = parseInt(parseInt(tab_rgb_str[1],16)*2);
		tab_rgb_int[2] = parseInt(parseInt(tab_rgb_str[2],16)*2);
		
		var org_nb = org_color.replace(/\#/g,"");
		var tab_rgb_org = org_nb.match(/.{2}/g);
		
		var tab_org_int = [3];
		tab_org_int[0] = parseInt(tab_rgb_org[0],16);
		tab_org_int[1] = parseInt(tab_rgb_org[1],16);
		tab_org_int[2] = parseInt(tab_rgb_org[2],16);
		var hex="#";
		for(var i=0;i<tab_rgb_int.length;i++){
			if(tab_rgb_int[i]>tab_org_int[i]){
				tab_rgb_int[i] = tab_org_int[i];
			}
			if(tab_rgb_int[i].toString(16).length == 1){
				hex += "0" + tab_rgb_int[i].toString(16);
			}else{
				hex += tab_rgb_int[i].toString(16);
			}
		}
		return hex;
	}
	
	var displayTarget = function(handler){
		var pos = $('#input_target').val();
		gotoObject(pos, function() {
			var ct ;
			if( (ct = getAladinCatalogue("target")) == null ) {
				ct = A.catalog({name: "target", color: "green"});
				aladin.addCatalog(ct);
			}
			var radec = aladin.getRaDec();
			ct.addSources([A.marker(radec[0],radec[1],  {popupTitle:'target: '+radec[0]+ ', ' +radec[1]})]);
			aladinLiteView.target.push({ra:radec[0], dec:radec[1], ct:ct});
			controller.updateCatalogs(aladinLiteView,'position');
			$('.alix_target_selecte').css("display","inline");
			$('.alix_target_selecte').css("color","#87F6FF");
			$('.alix_target_selecte').attr("class","alix_target_selecte alix_selected");
			$('.alix_select_flash').css("display","inline");
			$('.alix_select_trash').css("display","inline");
			if( handler != null ){
				handler(radec[0],radec[1]);
			}
		});
	}

	var hideXMMFlash = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-flash" title = "flash" class="alix_btn-XMM-flash  glyphicon glyphicon-flash" onclick="AladinLiteX_mVc.XMMFlash(); "></i>'
		}else{
			return '';
		}
	}
	var descriptionXMM = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-description" title="detail" class="alix_btn-XMM-description  glyphicon glyphicon-info-sign alix_btn-operate-catalog" style = "color: #888a85;" onclick="AladinLiteX_mVc.showXMMDesciption();"></i>'
		}else{
			return '';
		}
	}
	var configurationXMM = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'XMM\',this.style.color)"></i>'
		}else{
			return '';
		}
	}
	var showXMMDesciption = function(){
		var des = "No description";
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.affichage.description){
				des = aladinLiteView.masterResource.affichage.description;
			}
			html = '<p style="color:#4D36DC;margin:10px;">XMM-Newton Catalog</p>'
				+'<p style="font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;">'+des+'</p>';
			 $('#panel_catalog_detail').html(html);
			 $('#panel_catalog_detail').toggle();
			/*if(contextDiv.height() > 100 ){
				contextDiv.animate({height:'0px'},"fast");
				contextDiv.css("border-width", "0px");
				////$(".ui-dialog").animate({height:'0px'},"fast");
			}else{
				openContextPanel(html);
			}	*/
	}
	
	var getCurrentView = function() {
		return aladinLiteView;
	}
	/*
	 * (There'll be the xml collisions if setzoom() and gotoObject() are called at the same time)
	 * setzoom(): input zoom ---> change zoom + replay the XMM catalogs
	 * gotoObject(): input coordinates or name ---> gotoPostion + replay the XMM catalogs
	 * gotoPosition(): input coordinates  ---> gotoPostion
	 * gotoPositionByName(): input name ---> gotoPostion
	 * */
	var gotoPositionByName = function(targetName){
		addPositionInSelector(targetName);
		targetDiv.val(targetName);
		 Sesame.resolve(targetName,
                 function(data) { // success callback
  					   var ra = data.Target.Resolver.jradeg;
  					   var dec = data.Target.Resolver.jdedeg;
  					  gotoPosition(ra,dec);
  					  // Commented for TapHandle setDefaultSurvey();//when the defaut ra dec is set, set default survey and build hips tab.
                        // (typeof successCallback === 'function') && successCallback();
                 },
                 function(data) { // errror callback
                      if (console) {
                          //console.log("Could not resolve object name " + targetName);
                          //console.log(data);
                      }
                      (typeof errorCallback === 'function') && errorCallback();
                 });
	}
	
	var showColorMap = function(){
		 //// COLOR MAP management ////////////////////////////////////////////
		$("#SourceDiv").css("display","none");
		var cmDiv = $('.alix_colorMapBox');
		var cmSelect = cmDiv.find('.aladin-cmSelection');
         for (var k=0; k<ColorMap.MAPS_NAMES.length; k++) {
             cmSelect.append($("<option />").text(ColorMap.MAPS_NAMES[k]));
         }
         cmSelect.val(aladin.view.imageSurvey.getColorMap().mapName);
         // update color map
         cmDiv.find('.aladin-cmSelection').change(function() {
             var cmName = $(this).find(':selected').val();
             aladin.view.imageSurvey.getColorMap().update(cmName);
             storeCurrentState();
         }); 
         // reverse color map
         cmDiv.find('.aladin-reverseCm').click(function() {
        	 aladin.view.imageSurvey.getColorMap().reverse(); 
        	 storeCurrentState();        	 
         });
	};
	var setRegion = function(region){
		if( region != undefined ) {
			var pts = [];
			/*
			 * Extract region or position from SaadaQL statement
			 */
			if (region.type == "array") {
				x = controllers.regionEditor.view.parseArrayPolygon(region.value);
			} else if (controllers.regionEditor.view.editionFrame.type == "soda") {
				x = this.controllers.regionEditor.view.parseSodaPolygon(region.value);
			} else {
				alert("Polygone format " + points.type + " not understood");
			}
			if( x ){
				var view = BasicGeometry.getEnclosingView(x);
				defaultPosition = view.center.ra + " " +  view.center.dec
				defaultFov = 1.2*view.size;
				if( aladin == null ) {
					aladin = A.aladin(parentDiv
						, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
					parentDiv.append();
				}
				setZoom(defaultFov);
				gotoPosition(view.center.ra,view.center.dec);
				overlay = A.graphicOverlay({color: 'blue', name: "Reference Frame"});
				aladin.addOverlay(overlay);
				overlay.addFootprints([A.polygon(x)]);
			}

		}
	}
	
	var retour = {
			popup : popup,
			refresh : refresh,
			init: init,
			showDetailByID: showDetailByID,
			//draw : draw
			fadeOutAuto : fadeOutAuto,
			deleteSourceAuto : deleteSourceAuto,
			deselectSource : deselectSource,
			//switchPanel : switchPanel,
			closeContext : closeContext,
			returnCenter : returnCenter,
			bookMark : bookMark,
			getHistory : getHistory,
			restoreView: restoreView,
			regionEditor: regionEditor,
			addOverlayer : addOverlayer,
			//gotoPosition : gotoPosition,
			world2pix : world2pix,
			//setZoom : setZoom,
			//increaseZoom : increaseZoom,
			//decreaseZoom : decreaseZoom,
			pix2world : pix2world,
			disabledButton : disabledButton,
			reabledButton : reabledButton,
			storePolygon : storePolygon,
			deleteHistory : deleteHistory,
			restoreViewById :restoreViewById,
			//searchHips :searchHips,
			//displaySelectedHips : displaySelectedHips,
			//createImageSurvey : createImageSurvey,
			//setImageSurvey : setImageSurvey,
			//displayDetailInContext : displayDetailInContext,
			hipsFunction : hipsFunction,
			//findSurveyDescriptionById : findSurveyDescriptionById,
			//createHipsSelect : createHipsSelect,
			searchCataloge : searchCataloge,
			searchPosition : searchPosition,
			catalogFunction : catalogFunction,
			displayCatalogDetailInContext : displayCatalogDetailInContext,
			displaySimbadCatalog : displaySimbadCatalog,
			displayNedCatalog : displayNedCatalog,
			detailCatalogOperator : detailCatalogOperator,
			configureCatalog :configureCatalog,
			displayDataXml : displayDataXml,
			XMMFlash : XMMFlash,
			SimbadFlash :SimbadFlash,
			NEDFlash : NEDFlash,
			showXMMDesciption : showXMMDesciption,
			bindToFade :bindToFade,
			displayCatalog : displayCatalog,
			cleanCatalog : cleanCatalog,
			displayVizierCatalog : displayVizierCatalog,
			showDetail : showDetail,
			storeCurrentState : storeCurrentState,
			colorFadeOut : colorFadeOut,
			colorFadeIn : colorFadeIn,
			displayTarget : displayTarget,
			//addCatalogInSelector : addCatalogInSelector,
			//addPositionInSelector : addPositionInSelector,
			//hideXMMFlash : hideXMMFlash,
			getCurrentView: getCurrentView,
			setReferenceView: setReferenceView,
			//displayCatalogFiltered:  displayCatalogFiltered,
			updateColorOfCatalog :updateColorOfCatalog,
			updateShapeOfCatalog :updateShapeOfCatalog,
			updateSizeOfCatalog :updateSizeOfCatalog,
			showColorMap : showColorMap,
			reselectSource : reselectSource,
			setLastSelectedPosition : setLastSelectedPosition,
			deleteLastSelectedPosition : deleteLastSelectedPosition,
			deleteLastSelectedPositionByCatalog:deleteLastSelectedPositionByCatalog,
			gotoObject : gotoObject,
			gotoPositionByName : gotoPositionByName,
			setRegion : setRegion
	};
	return retour
	
}();



//<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>



console.log('=============== >  AladinLite_v.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

function AladinLite_mvC(aladinView, controllers){
	this.modules = {};
	this.aladinView = aladinView;
	if (controllers.historic != undefined ){
		this.modules.historicModel = controllers.historic.model;
	}
    if (controllers.regionEditor != undefined ){
	    this.modules.regionEditorView = controllers.regionEditor.view;
    }
    if (controllers.hipsSelector != undefined ){
	    this.modules.hipsSelectorModel = controllers.hipsSelector.model;
    }


}

AladinLite_mvC.prototype = {
		
		bookMark: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.bookMark(aladinLiteView);
			else 
				return null;
		},
		
		deleteHistory : function(id){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.deleteHistory(id );
			else
				return null;
		},
		
		getHistory: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.getHistory(aladinLiteView);
			else 
				return null;
		},

		
		editRegion: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.init();
			else
				return null;
		},
		
		closeEditor: function(){
			if(this.modules.regionEditorView != undefined) 
				this.modules.regionEditorView.setBrowseMode();
			 else
				return null;
		},
		
		setInitialValue: function(points){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setInitialValue(points);
			else
				return null;
		},
		
		cleanPolygon: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.clean();
			else
				return null;
		},
		
		setPoligon: function(region){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setPoligon(region);
			else
				return null;
		},
		
		restoreViewById: function(viewId){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.restoreViewById(viewId);
			else
				return null;
		},
		
		searchHips: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchHips(mask, aladinLiteView);
			else
				return null;			
		},
		buildHipsTab: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.buildHipsTab(aladinLiteView);
			else
				return null;
		},
		
		getSelectedHips: function(ID){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedHips(ID);
			else
				return null;
		},

		searchCataloge: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchCataloge(mask, aladinLiteView);
			else
				return null;
		},
		
		buildCataTab: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.buildCataTab(aladinLiteView);
			else
				return null;
		},
		
		getSelectedCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedCatalog(obs_id);
			else
				return null;
		},
		storeCurrentCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.storeCurrentCatalog(obs_id);
			else
				return null;
		},

		deleteCatalogInTab: function(i){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.deleteCatalogInTab(i);
			else
				return null;
		},
		createCatalogSelect: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.createCatalogSelect(obs_id);
			else
				return null;
		},
		
		displaySimbadCatalog: function(){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displaySimbadCatalog();
			else
				return null;
		},
		
		displayNedCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayNedCatalog(aladinLiteView);
			else
				return null;
		},
		
		restoreCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.restoreCatalog(aladinLiteView);
			else
				return null;
		},
		
		currentCatalogTab: function(catalogDisplayed){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.currentCatalogTab(catalogDisplayed);
			else
				return null;
		},
		
		displayDataXml: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayDataXml(aladinLiteView);
			else
				return null;
		},
		
		
		updateCatalogs: function(aladinLiteView, state){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.updateCatalogs(aladinLiteView,state);
			else
				return null;
		}
		
		
}
console.log('=============== >  AladinLite_c.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
function Historique_Mvc(contextDivId, aladinLite_V){
	this.that = this;
	this.aladinLite_V = aladinLite_V;
	this.mark_tab = [];
	this.view = new Historique_mVc(this, contextDivId,aladinLite_V);
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.idCounter=0;
	this.hips_tab = [];
	this.position_tab = [];
}

Historique_Mvc.prototype = {
		bookMark : function(position){
			// we create a copy of the position object, as its attributes might be updated
			var positionCopy = jQuery.extend(true, {}, position);
			positionCopy.comment = "";
			if(positionCopy.target.length > 0){
				for(var i = 0;i<positionCopy.target.length;i++){
					positionCopy.target[i].ct = null//To save locally, we need to take off the ct reference because it's a circular structure
				}
			}
		//	var positionCopyClone = deepClone(positionCopy);//transform the function to string by deepClone, without this the functions can't be transported by stringify
			var positionCopyStr = JSON.stringify(positionCopy);
			var date = 'alix:'+new Date();//as the unique key for each bookmark in localstorage
			try{
				//save an bookmark locally
			localStorage.setItem(date,positionCopyStr);}
			//When the memory is not enough for another bookmark ,alert and propose to clear all the bookmarks
			catch(error){
				var _lsTotal = 0, _xLen, _x; var log = [];
				var message = 'Sorry. There\'s no more memory to save the new bookmark,you can delete some bookmarks in the list,or do you want to clear all the storage?'
				log.push(message);
				for (_x in localStorage) { 
					_xLen = (((localStorage[_x].length || 0) + (_x.length || 0)) * 2); 
					_lsTotal += _xLen; log.push(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
				}; 
					log.push("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
				if(confirm(log.join("\n"))){
					if(confirm("Do you really want to delete all the storage?")){
							localStorage.clear();
						}
					}
				}
		  
			this.mark_tab.unshift(positionCopy);    //add the element at top of the list
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//if(this.contextDiv.height() > 100){
			return this.view.drawContext(position);
			//}
		},
		
		/**
		 * clean the repetition of the elements in a list and return the list organized
		 */
		cleanRepetition : function(tab){
			var new_tab = [];
			for(var i=0 ; i<tab.length; i++) {
				var repeat = false;
				for(var j=0 ; j<new_tab.length; j++){
					if(new_tab[j] == tab[i].survey.ID){
						repeat = true;
						break;
					}
				}
			if(repeat!=true){
				new_tab.push(tab[i].survey.ID)
			}
			}
			return new_tab;
		},
		
		getHistory : function(){
			return this.view.drawContext();			
		},
		
		restoreView : function(aladinLiteView){
			return this.aladinLite_V.restoreView(aladinLiteView);
		},
		/*
		 * delete the element of the list , we find the position of element by its attribute id
		 */
		deleteHistory : function(htmlId){		
			//this.mark_tab.splice(this.findIdPosition(htmlId), 1);
			var key = localStorage.key(htmlId);
			localStorage.removeItem(key);
			return this.view.drawContext();
		},
		
		restoreViewById : function(htmlId){
			var view = getAladinLiteView(htmlId);
			return view;
			//return this.mark_tab[this.findIdPosition(htmlId)];		
		},	
		findIdPosition : function(id){
			for(var i=0;i<this.mark_tab.length;i++){
				if(this.mark_tab[i].id == id){
					break;
				}
			}
			return i;
		}
		/*getKeyById : function(id){
			var key = localStorage.key(id);
			return key;
		}*/
	
		
}
//deep clone an object who contains the object and transform the functions into string
var deepClone = function(data) { //avoid error : "Historique_m.js:42 Uncaught TypeError: Converting circular structure to JSON"
	var type = judgeType(data);      
	var obj;      
	if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {    // No deeper clone
    return data;
  }  ;
 if (type === 'array') {        // eslint-disable-next-line
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {        // Copy the functions of prototype
    // eslint-disable-next-line
    for (var key in data) {
     if (judgeType(data[key]) == 'function') {        // eslint-disable-next-line
    	  obj[key] = data[key].toString();
    	  }else{
    		  obj[key] = deepClone(data[key]);
    	  }
    }
  } ;     return obj;
};
var judgeType = function(obj) {  
  var toString = Object.prototype.toString;  
  var map = {        '[object Boolean]': 'boolean',        '[object Number]': 'number',        '[object String]': 'string',        '[object Function]': 'function',        '[object Array]': 'array',        '[object Date]': 'date',        '[object RegExp]': 'regExp',        '[object Undefined]': 'undefined',        '[object Null]': 'null',        '[object Object]': 'object'
  };      if (obj instanceof Element) {        return 'element';
  }      return map[toString.call(obj)];
}




console.log('=============== >  Historique_m.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/


var Historique_mVc = function(model, contextDivId,aladinLite_V){
	this.that = this;
	this.model = model;
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.aladinLite_V = aladinLite_V;
}

Historique_mVc.prototype = {
		drawContext : function(){
			var self = this;
			var vide = true;
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//take the data in localstorage and show the list of marked history  
			var html = '<b class="alix_titlle_image" style=" margin-left: 15px;">Bookmarks:</b><div style="height:230px;overflow:auto;"><ul id = "history_ul" style="padding-left:18px;">';
			for(var key in localStorage){
					
			}
			deleteAllObjs();
			for (var k=0 ; k<localStorage.length; k++) {
				var key = localStorage.key(k);
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:')){		
					var ItemStr = localStorage.getItem(key);
					var Item = JSON.parse(ItemStr);
					Item.id = k;
					//Create the new aladinliteview according to the bookmark to have the functions in the prototype 
					var ItemFinal = setAladinLiteView(Item,key);
					if(ItemFinal.survey!= undefined){
						//localStorage.setItem(key,Item);
						//var obs_title = Item.survey.obs_title;

						//version1//html += "<li style='list-style-type: none;padding-top:5px;'>"+Item.getHTMLTitle(k,Item)+ "</li>";
						//version2//html += "<li style='list-style-type: none;padding-top:5px;'>"+eval('('+Item.getHTMLTitle+')').call(Item)+ "</li>";
						html += "<li style='position:relative;list-style-type: none;padding-top:5px;'>"+ItemFinal.getHTMLTitle()+ "</li>";
						html += "<div id='description_"+ k + "' style='display: none;'><span>Position: "
						+ ItemFinal.ra + ", " 
						+ ItemFinal.dec + "</span><br><span>Fov: " 
						+ ItemFinal.fov + "</span><br><span>Survey: "
						+ ItemFinal.survey.obs_title + "</span><p style='font-size:small;line-height: 1em;font-weight:100;color:#000000;'>"
						+ ItemFinal.survey.obs_description + "</p>"
						+ this.displayCataDescription(ItemFinal.catalogTab) +"</div>";
						vide = false;
					}
				}
			}
			if(vide == true){
				html += "<p style='color:#1f252b;text-align:center'>No bookmark restored</p>";
			}
			html += '</ul></div>';
			this.contextDiv.html(html);
			
//			this.contextDiv.find('ul').on('click', 'li', function(e) {
//				e.stopPropagation(); 
//				
//				var idx = $(this).index();
//				var aladinLiteView= new AladinLiteView();
//				aladinLiteView.name = self.model.mark_tab[idx].name;
//				aladinLiteView.ra = self.model.mark_tab[idx].ra;
//				aladinLiteView.dec = self.model.mark_tab[idx].dec;
//				aladinLiteView.fov = self.model.mark_tab[idx].fov;
//				aladinLiteView.survey = self.model.mark_tab[idx].survey;
//				aladinLiteView.region = self.model.mark_tab[idx].region;
//				self.model.restoreView(aladinLiteView);	
//				
//				
//			});
			
			//Add handlers for each bookmark  
			for(var k=0 ; k<localStorage.length; k++){
				var ItemFinal = getAladinLiteView(k);
				if( ItemFinal){
				ItemFinal.setHandlers();
				$("#" + k +"_menu_show_description").click(function(e){
					$("#description_" + this.id.replace("_menu_show_description","")).slideToggle();
					e.stopPropagation();
				});
				}
			}
			
			
		},
		
		displayCataDescription: function(catalogTab){
			var str = "";
			if(catalogTab.length > 0){
				str += "<span>Catalog: <br>"
				for(var i=0;i<catalogTab.length;i++){
					str+=catalogTab[i].catalog + ",  ";
				}
				str +="</span>";
			}
			return str;
			
		}
}






console.log('=============== >  Historique_v.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * Manager of the view of the region editor
 * 
 * Author Gerardo Irvin Campos yah
 */ 

function RegionEditor_mVc(aladinLite_V, parentDivId, contextDivId, handler,/* points,*/ defaultRegion){
	this.parentDivId = parentDivId;
	this.drawCanvas = null; // canvas where the polygon is drawn
	this.drawContext = null;
	this.lineCanvas = null; // canvas where the moving lines are drawn
	this.lineContext = null;
	this.controller = null;
	this.points = null // Initial values
	this.clientHandler = (handler == null) ? function(){alert("No client handler registered");}: handler;
	this.contextDivId = contextDivId;
	this.contextDiv  = null;
	this.sousContextDiv = null;
	this.parentDiv  = null;
	this.aladinLite_V = aladinLite_V;
	//this.defaultRegion = defaultRegion;
	this.editionFrame = defaultRegion;
} 
var browseSaved = null;
RegionEditor_mVc.prototype = {
		init: function (){	
			console.log("RERERE");
			var self = this;
			if( this.parentDiv == null )
				this.parentDiv = $('#' + this.parentDivId);
		 	if( this.contextDiv == null )
				this.contextDiv  = $('#' + this.contextDivId);	
			//this.contextDiv.append('<div id= "RE_context" style = "display:inline"></div>');
			/*if( this.sousContextDiv == null ){
				this.sousContextDiv  = $('#RE_context');
			}*/
			//this.parentDiv.css("position", "relative");
			// création du canvas pour éditeur régions
			/*
			 * Be cautious: the canvas context must be taken before the canvas is appended to the parent div, otherwise the geometry is wrong. 
			 */
			var that = this;
			if(!AladinLiteX_mVc.regionEditorInit){
			console.log("RERE"+this.parentDiv.id);
			this.lineCanvas = $("<canvas id='RegionCanvasTemp' class='editor-canvas'></canvas>");
			this.lineCanvas[0].width =this.parentDiv.width() ;
			this.lineCanvas[0].height = this.parentDiv.height();
			this.lineContext = this.lineCanvas[0].getContext('2d');	        
			this.parentDiv.append(this.lineCanvas);
			this.lineCanvas.css('z-index', '100');
			this.lineCanvas.css('position', 'absolute');
			this.lineCanvas.hide(); 

			/*
			 * Canvas pour les traces temporaires
			 */
			this.drawCanvas = $("<canvas id='RegionCanvas' class='editor-canvas' ></canvas>");
			this.drawCanvas[0].width = this.parentDiv.width();
			this.drawCanvas[0].height = this.parentDiv.height();
			this.drawContext = this.drawCanvas[0].getContext('2d');
			this.parentDiv.append(this.drawCanvas);
			this.drawCanvas.css('z-index', '101');
			this.drawCanvas.css('position', 'absolute');
			this.drawCanvas.css('top', '0px');
			this.drawCanvas.hide(); 


			this.controller = new RegionEditor_mvC({/* "points": this.points,*/ "handler": this.clientHandler, "canvas": this.drawCanvas, "canvaso": this.lineCanvas, "aladinView": this.aladinLite_V});
			/*
			 * The controller function is wrapped in a function in order to make it working in the context of the controller object
			 * and not of he HTML widget
			 */
			this.drawCanvas[0].addEventListener('mousedown', function(event) {console.log("down"); that.controller.mouseDown(event);}, false);
			this.drawCanvas[0].addEventListener('mousemove',  function(event) {that.controller.mouseMove(event);}, false);
			this.drawCanvas[0].addEventListener('mouseup', function(event) {/*console.log("up");*/ that.controller.mouseUp(event);}, false);
			
			/*----crear botones con jquery----*/
			/*var divButtons = $("<div id='RegionButtons' style=' width:"+ this.parentDiv.width() +'px' +" ';' '><div/>").appendTo("#" + this.parentDivId + "_button");        
			divButtons.css('background', 'gray');//'height:' "+ 200 +'px' +"';'
			divButtons.css('height', '70px');*/
			this.contextDiv.append('<p style="color:#1f252b;text-align:center">Region Editor Mode</p>')
			this.browseBtn = $("<button id='regionEditor_b' class='alix_browse_btn alix_btn'>Browse&nbsp;<i class='glyphicon glyphicon-check'></i></button>");
			this.contextDiv.append(this.browseBtn);
			this.browseBtn.css('margin-top','10px');
			this.browseBtn.css('margin-left','5px');
			this.browseBtn.css('font-weight',' bold');
			this.browseBtn.attr('disabled', 'disabled');
			this.browseBtn.click(function(event) {    
				if( !that.controller.isPolygonClosed() ){
					that.controller.CleanPoligon();
				} else {
					that.controller.recuperar();  
				}
				that.setBrowseMode();
				browseSaved = false;
				event.stopPropagation();
				//that.aladinLite_V.reabledButton();

			});
			
			this.editBtn = $("<button id='regionEditor_e' class='alix_edt_btn alix_btn'>Edit&nbsp;<i class='glyphicon glyphicon-pencil'></i></button>");
			this.contextDiv.append(this.editBtn);
			this.editBtn.css('margin-top','10px');
			this.editBtn.css('margin-left','5px');
			this.editBtn.css('font-weight',' bold');
			this.editBtn.click(function(event) { 
				that.setEditMode();
				that.controller.DeleteOverlay();
				console.log("test region editor");
				that.lineContext.clearRect(0, 0, that.lineCanvas[0].width, that.lineCanvas[0].height);            
				that.drawContext.clearRect(0, 0, that.drawCanvas[0].width, that.drawCanvas[0].height);
				that.controller.almacenar();
				//that.aladinLite_V.disabledButton();
				event.stopPropagation();
			});

			this.effacerBtn = $("<button id='regionEditor_c' class=' alix_clear_btn alix_btn'>Clear&nbsp;<i class='glyphicon glyphicon-trash'></i></button>");
			this.contextDiv.append(this.effacerBtn);
			this.effacerBtn.css('margin-top','10px');
			this.effacerBtn.css('margin-left','5px');
			this.effacerBtn.css('font-weight',' bold');
			this.effacerBtn.click(function(event) {        	 
				that.controller.CleanPoligon();
				event.stopPropagation();
			});
			this.setBrowseMode();

			var buttonSet = $("<button id='regionEditor_a' class=' alix_accept_btn alix_btn'>Accept&nbsp;<i class='glyphicon glyphicon-share'></i></button>");
			this.contextDiv.append(buttonSet);
			buttonSet.css('margin-top','10px');
			buttonSet.css('margin-left','5px');
			buttonSet.css('font-weight',' bold');
			buttonSet.click(function(event) {
				that.controller.recuperar();  
				that.setBrowseMode();
				that.controller.invokeHandler(true);
				that.aladinLite_V.reabledButton();
				document.getElementById("region").disabled=false;
				browseSaved = true;
				event.stopPropagation();
			});
			}
			if(!AladinLiteX_mVc.regionEditorInit){
			this.setInitialValue(self.defaultRegion);
			if( this.editionFrame ){
				this.setEditionFrame(this.editionFrame);
				this.setEditMode();
			}
			AladinLiteX_mVc.regionEditorInit = true;
			/**!!! To note the region editor has been initialized. 
			 * Avoid it being initialized the second time, 
			 *which make us can't edit the old polygon when we leave the regioneditor for a while .*/
			}

		},
		/**
		 * Operate the drawing removal from outside 
		 */
		clean: function() {
			//can be called from another button before the editor has been init 
			if( this.controller ) {
				this.controller.CleanPoligon();				
				this.setEditMode();
				this.controller.DeleteOverlay()
				this.lineContext.clearRect(0, 0, this.lineCanvas[0].width, this.lineCanvas[0].height);            
				this.drawContext.clearRect(0, 0, this.drawCanvas[0].width, this.drawCanvas[0].height);
				this.controller.almacenar();	       
				this.controller.recuperar();   
				this.setBrowseMode();
			}

		},
		/**
		 * Draws the editable frame in blue and center the view on it 
		 */
		setEditionFrame: function(points){
			if( points){
				this.editionFrame = points;
			}
			var x = null;
			if( this.editionFrame ){
				var pts = [];
				/*
				 * Extract region or position from SaadaQL statement
				 */
				if (this.editionFrame.type == "array") {
					x = this.parseArrayPolygon(this.editionFrame.value);
				} else if (this.editionFrame.type == "soda") {
					x = this.parseSodaPolygon(this.editionFrame.value);
				} else {
					alert("Polygone format " + points.type + " not understood");
				}
				if( x ){
					var view = BasicGeometry.getEnclosingView(x);
					this.aladinLite_V.gotoPosition(view.center.ra, view.center.dec);
					this.aladinLite_V.setZoom( 1.2*view.size );
					if( this.editionFrameOverlay == null ) {
						this.editionFrameOverlay = A.graphicOverlay({color: 'blue', name: "Editable Frame"});
						this.aladinLite_V.addOverlayer(this.editionFrameOverlay);
					}
					this.editionFrameOverlay.removeAll();	
					this.editionFrameOverlay.addFootprints([A.polygon(x)]);
					$("#center").val("Ed. Frame").attr("title", "Center the view on the editable frame");
				} else {
					this.editionFrame = null;
					$("#center").val("Center").attr("title", "Center on the current drawing");
				}
			}
			/*
			 * Fix for the errors when we open a new region editor
			 *
			var that = this;
	           setTimeout(function() {
                   that.aladin.increaseZoom();
                   that.aladin.decreaseZoom();
                   }, 500);
                   */

		},
		/**
		 * Initalize the darw with the default parameter. If points contains a region, it is drawn, 
		 * if it just contain a position, AladinLite is centered on that position
		 * @param points  object denoting the initial value of the polygone : {type: ... value:} type is format of the 
		 * value (saadaql or array) and value is the data string wich will be parsed
		 */
		setInitialValue: function (points){
			/*
			 * Set the region passed by the client if it exists
			 */
			console.log(points)
			this.points = points;
			//this.controller.CleanPoligon();
			if( this.points ){
				var pts = [];
				/*
				 * Extract region or position from SaadaQL statement
				 */
				if( this.points.type == "saadaql") {
					var s = /"(.*)"/.exec(this.points.value);
					if( s.length != 2 ) {
						Alix_Modalinfo.error(this.points.value + " does not look like a SaadaQL statment");
						return;
					} else {
						if( this.points.value.startsWith("isInRegion")) {
							var ss = s[1].split(/[\s,;]/);
							for( var i=0 ; i<ss.length ; i++ ) {
								pts.push(parseFloat(ss[i]));
							}
						} else {
							var pos = s[1].replace(/:/g , " ");
							this.posField.val(pos);
							this.aladin.setZoom(0.55);
							this.aladin.gotoObject(pos);
						}
					}
				} else if (this.points.type == "array2dim") {
					pts = this.points.value;
				} else {
					alert("Polygone format " + this.points.type + " not understood");
					return;
				}

				this.setBrowseMode();
				this.controller.DeleteOverlay()
				this.controller.setPoligon(pts);
			}
			/*
			 * Fix for the errors when we open a new region editor
			 */
//			var that = this;
//	           setTimeout(function() {
//                   that.aladin.increaseZoom();
//                   that.aladin.decreaseZoom();
//                   }, 500);

		},
		setBrowseMode: function() {
			this.editBtn.removeAttr('disabled');
			this.browseBtn.attr('disabled', 'disabled');   
			this.effacerBtn.attr('disabled', 'disabled');                      
			this.lineCanvas.hide();
			this.drawCanvas.hide();
		},
		setEditMode: function() {
			this.browseBtn.removeAttr('disabled');
			this.editBtn.attr('disabled', 'disabled');   
			this.effacerBtn.removeAttr('disabled');                
			this.lineCanvas.show();
			this.drawCanvas.show();
		},
		parseSodaPolygon: function (value){
		    var s = value.split(/\s+/);
			var x = null;
		    if( s[0].toUpperCase() != "POLYGON"){
				alert("Only SODA POLYGON are supported");
		    } else {
		    	s.shift();
				if( !s || (s.length%2) != 0 || s.length < 6 ) {
					alert("Even number of coordinates required (" + s.length + " values read)");
				} else {
					x = [];
					for(var i=0 ; i<(s.length/2) ; i++){
						x[x.length] = [parseFloat(s[2*i]), parseFloat(s[(2*i)+1])];
					}
					x.push(x[0]);
				}
		    }
		    return x;
		},
		parseArrayPolygon: function (value){
			var x = null;
			if( !value || (value.length%2) != 0 || value.length < 6 ) {
				alert("Even number of coordinates required");
			} else {
				x = [];
				for(var i=0 ; i<(value.length/2) ; i++){
					x[x.length] = [value[2*i], value[(2*i)+1]];
				}
				x.push(x[0]);
			}
		    return x;
		}


}


console.log('=============== >  RegionEditor_v.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * Model processing the draw canvas
 * 
 * Author Gerardo Irvin Campos yah
 */

function RegionEditor_Mvc(points, handler, canvas, canvaso, aladinView){

	this.node = [];	
	this.canvas = canvas[0];
	this.canvaso = canvaso[0];
	this.context = this.canvas.getContext('2d');
	this.contexto = this.canvaso.getContext('2d');
	//this.aladin parameters:
	//this.aladin = aladin;	
	this.overlay = null;
	this.skyPositions = null;
	this.aladinView = aladinView;
	this.points = points;
}

RegionEditor_Mvc.prototype = {

		DrawNode: function (data){
			for(var i in data)
			{
				this.context.beginPath();
				this.context.arc(data[i].cx, data[i].cy, data[i].r, 0, Math.PI * 2,true);     	      
				this.context.fillStyle = "blue";
				this.context.fill();
				this.context.stroke();	 
				this.context.closePath();	  
			} 	     
		},

		//Drawn Line
		DrawnLine: function (startingNode,x,y,result) {
			if(result != null)
			{					
				this.context.beginPath();
				this.context.lineCap="round";

				for(var i in this.node)
				{
					if(this.node[result.N] == i)
						this.context.moveTo(this.node[result.N].cx,this.node[result.N].cy);

					this.context.lineTo(this.node[i].cx,this.node[i].cy);				
				}					

				this.context.closePath(); 
				this.context.strokeStyle = 'lime';
				// this.context.lineWidth = 3;
				this.context.stroke();	
			}
			else
			{
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
				this.context.beginPath();
				this.context.lineCap="round";
				this.context.moveTo(this.node[startingNode].cx,this.node[startingNode].cy);		
				this.context.lineTo(x,y);
				this.context.closePath(); 
				this.context.strokeStyle = 'lime';
				//this.context.lineWidth = 3;
				this.context.stroke();
			}
		},

		//this.Redrawn line and this.node
		Redrawn : function (result)
		{				
			this.CanvasUpdate();
			for(var i in this.node)
			{
				this.context.beginPath();
				this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
				this.context.fillStyle = "red";
				this.context.fill();
				this.context.stroke();	 
				this.context.closePath();	        	    
			} 		

			this.DrawnLine(0,0,0,result);
		},	

		//Clean the this.canvas
		CanvasUpdate : function ()
		{
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.contexto.drawImage(this.canvas, 0, 0);
		},

		//Convert a Array to Object
		ArrayToObject: function (data)
		{
			var NodeTemp = [];
			for( var i in data)
			{
				NodeTemp.push
				(
						{
							cx: data[i][0],
							cy: data[i][1],
							r:5
						}
				);
			}

			this.node=[];
			this.node = NodeTemp;
		},

		//Fuction pour obtenir le hautor du polygon
		GetHeight: function (array)
		{		
			var Ramax = null, Ramin = null;
			var finaltemp;
			var largeur;

			for( var i in array)
			{
				temp = array[i][0];        	

				if(Ramax == null)
				{
					Ramax = temp;
				}
				else if(temp >= Ramax)
				{
					Ramax = temp;
				}

				if(Ramin == null)
				{
					Ramin = temp;
				}
				else if(temp <= Ramin )
				{
					Ramin = temp;
				}
			}

			largeur = (Ramax -Ramin);

			if(largeur > 180)
			{
				largeur = 360 - largeur;
			}

			return { ramax: Ramax, ramin: Ramin , largeur: largeur  };
		},

		//function pour obtenir le numero de segment et construir un segment
		NumeroSegmen : function ()
		{	
			var TotalNodes = this.node.length;		
			var segmentoini, segmentofin;	
			var total = [];

			for(var j=0; j<this.node.length; j++)
			{
				if(segmentoini == undefined)
					segmentoini = j;
				else if(segmentofin == undefined){
					segmentofin = j; 
				}

				if(segmentoini != undefined && segmentofin != undefined)
				{
					total.push
					({
						A: segmentoini,
						B: segmentofin
					});

					segmentoini = segmentofin;
					segmentofin = undefined;
				}
			}

			total.push
			({
				A: (this.node.length  - 1),
				B: 0
			});

			//console.log('total: ' + total.length);
			return total;
		},

		//function pour obtenir le hauteur de un polygone
		GetWidth: function (array)
		{		
			var Decmax = null, Decmin = null;	
			var temp;
			var width;

			for( var i in array)
			{
				temp = (array[i][1]);        	

				if(Decmax == null)
				{
					Decmax = temp;
				}
				else if(temp >= Decmax)
				{
					Decmax = temp;
				}

				if(Decmin == null)
				{
					Decmin = temp;
				}
				else if(temp <= Decmin )
				{
					Decmin = temp;
				}
			}

			width = (Decmax - Decmin);

			if(width > 180)
			{
				width = 360 - width;
				//console.log('width 360');
			}

			return { decmax: Decmax, decmin: Decmin , width: width  };
		},

		//function para crear una grafica en el this.canvas
		DrawGrafic: function (canvas1)
		{
			var canvasgraf =  canvas1;
			var ancho = canvasgraf.width;
			var alto = canvasgraf.height;

			var contextGrafic = canvasgraf.getContext('2d');
			var contador = 20;
			var contador2 = 20;

			//console.log("ancho: " + ancho);
			//console.log("alto: " + alto);

			for(var i =0; i < alto ; i++)
			{

				this.contextGrafic.beginPath();

				if(i === 0)
				{
					this.contextGrafic.moveTo( i + 20 , 10);
					this.contextGrafic.lineTo( i + 20, alto);
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.font = "bold 8px sans-serif";
					this.contextGrafic.fillText("0",i + 15 , 20);
				}
				else 
				{
					this.contextGrafic.moveTo( i + contador , 20);
					this.contextGrafic.lineTo( i + contador , alto);
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.font = "bold 8px sans-serif";
					this.contextGrafic.fillText(i,(i+contador)-3 , 20);
				}

				this.contextGrafic.closePath(); 
				this.contextGrafic.strokeStyle = 'yellow';
				//this.context.lineWidth = 3;
				this.contextGrafic.stroke();	

				contador = parseInt( contador + 20);

			}

			for(var i =0; i < ancho ; i++)
			{

				this.contextGrafic.beginPath();
				this.contextGrafic.lineCap="round";

				if(i === 0)
				{
					this.contextGrafic.moveTo( 12 , i + 20 );
					this.contextGrafic.lineTo( ancho , i + 20);	
				}
				else 
				{
					this.contextGrafic.moveTo( 12  , 0 + contador2);
					this.contextGrafic.lineTo( ancho , 0 + contador2);
					this.contextGrafic.font = "bold 8px sans-serif";		     
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.fillText(i, 3, (0+ contador2)+3);
				}

				this.contextGrafic.closePath(); 
				this.contextGrafic.strokeStyle = 'brown';
				//this.context.lineWidth = 3;
				this.contextGrafic.stroke();	
				contador2 = parseInt( contador2 + 20);	    	       
			}  
		},

		isEmpty: function()
		{
			if(this.node.length == 0)
				return true;		
			else
				return false;
		},

		//function que permet de ajouter this.nodes
		addNode: function(x, y,startingNode,polygonestatus)
		{					
			if(polygonestatus)
			{
				var newNode = {};
				var lastnode = {};
				var position = parseInt(startingNode[0].position);

				newNode.cx = startingNode[0].cx;
				newNode.cy = startingNode[0].cy;
				newNode.r = startingNode[0].r;

				if(this.node.length === position)
				{				
					lastnode.cx = this.node[(this.node.length -1)].cx;
					lastnode.cy = this.node[(this.node.length -1)].cy;
					lastnode.r = 5;

					//agregar el nodo
					this.node.splice((this.node.length -1), 1 , lastnode,newNode);				
				}
				else
				{
					lastnode.cx = this.node[startingNode[0].position].cx;
					lastnode.cy = this.node[startingNode[0].position].cy;
					lastnode.r = 5;

					//agregar el nodo
					this.node.splice(startingNode[0].position, 1 ,newNode, lastnode);
				}														
				this.Redrawn(0);
			}
			else
			{
				var flag = typeof(startingNode);
				if(flag != "object")
				{
					if(startingNode == 0 && this.node.length > 1)
					{		
						this.node.unshift
						(
								{
									cx: x,
									cy: y,
									r: 5	                            
								}
						);
					}
					else
					{
						this.node.push
						(
								{
									cx: x,
									cy: y,
									r: 5            
								}
						);
					}
					this.DrawNode(this.node);
				}	
				else
				{

					if(startingNode != undefined /*&& startingNode.B != undefined*/)
					{					
						var addnode ={};
						var preview ={};					

						preview.cx = startingNode.segmento.xA;
						preview.cy = startingNode.segmento.yA;
						preview.r = 5;

						addnode.cx = x;
						addnode.cy = y;
						addnode.r = 5;

						this.node.splice(startingNode.segmento.segmento, 1 , preview , addnode);
						var renode =  this.node;
						this.Redrawn(0);

					}
				}			          		         
			}

			//console.log('this.node add: ' + this.node.length);        
		},

		//function que permet obtener le numero de this.node
		getNode: function(x,y)
		{
			var dx=0 ;
			var dy=0 ;
			var result = 0;

			for(var i in this.node)
			{	             
				dx = x - this.node[i].cx;
				dy = y - this.node[i].cy;  
				//var result =Math.sqrt(dx * dx + dy * dy);
				var result = dx * dx + dy * dy;

				if(result <= 25)
				{	    
					//console.log('i: ' + i);
					return i;	
				}
			}
			return -1;
		},

		//function pour obtenir les deux this.nodes qui forme un segment
		getSegment: function(clickedNode)
		{		
			var pointA=0 ,pointB=0;

			if(clickedNode == 0)
			{		
				//console.log('nodo 0');
				pointA = (parseInt(clickedNode) +1);
				pointB = (this.node.length -1);
			}
			else if(clickedNode == (this.node.length -1))
			{			
				//console.log('nodo final:' + (this.node.length -1));
				pointA = parseInt((this.node.length -1) -1);
				pointB = 0;			
			}
			else if(clickedNode != 0 && clickedNode != (this.node.length -1))
			{	
				//console.log('otro this.node');
				pointA = (parseInt(clickedNode)+1);
				pointB = (parseInt(clickedNode)-1);			
			}
			return {A :pointA, B:pointB, N:clickedNode};
		},

		//function pour effacer le this.canvas
		canvasUpdate: function()
		{		
			this.contexto.drawImage(this.canvas, 0, 0);
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		},

		//function pour diseigner les lignes
		drawHashline: function(startingNode,x,y)
		{						
			this.DrawnLine(startingNode,x,y);	   	   					
		},	

		//function pour effacer un ligne
		CleanLine: function()
		{	
			//this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		//function pour savoire si un this.node es un extemite
		isExtremity: function(clickedNode)
		{
			if(clickedNode == 0 || clickedNode == (this.node.length -1))
			{		
				return true;								
			}				
			return false;

		},

		//function que permet de fermer un polygon
		closePolygone: function(clickedNode , startingNode)
		{		
			if(clickedNode == startingNode)
			{
				return false;	
			}
			else if(clickedNode == 0 && startingNode == (this.node.length -1))
			{		
				for(var i in this.node)
				{
					this.context.beginPath();
					this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
					this.context.fillStyle = "red";
					this.context.fill();
					this.context.stroke();	 
					this.context.closePath();	  		        
				}  
				return true;
			}
			else if(clickedNode == (this.node.length -1) && startingNode == 0 )
			{			
				for(var i in this.node)
				{
					this.context.beginPath();
					this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
					this.context.fillStyle = "red";
					this.context.fill();
					this.context.stroke();	 
					this.context.closePath();	  		        
				} 
				return true;
			}			
			return false;
		},

		//function pour bouger un this.node et ses deux segments de le poligone
		Drag: function(clickedNode, x,y,result)
		{
			var segmentfirst;
			var segmentlast;
			var flag;
			var resultado = [];								

			//set new values
			this.node[clickedNode].cx = x;
			this.node[clickedNode].cy = y;	

			this.node[result.N].cx = x;
			this.node[result.N].cy = y;					

			this.Redrawn(result);		
		},

		//function pour garder les valeur de alafin lite et les convertir en valeurs de this.canvas("pixel")
		almacenar: function()
		{			
			//console.log('mesage this.almacenar');
			//console.log('this.skyPositions: ' + this.skyPositions);
			if(this.skyPositions != null)
			{
				//console.log('this.skyPositions' + this.skyPositions);
				//console.log('this.node' + this.node);					
				this.node = [];
				this.skyPositions.pop();

				for (var k=0; k<this.skyPositions.length; k++) 
				{
					this.node.push(this.aladinView.world2pix
							(
									this.skyPositions[k][0], 
									this.skyPositions[k][1]								
							));								
				}	

				this.ArrayToObject(this.node);

				//console.log('this.node: ' + typeof(this.node));
				/*for( var i in this.node)
				{	
					console.log('i : ' + i);
					console.log('this.node x: ' + this.node[i].cx);
					console.log('this.node y: ' + this.node[i].cy);				
				}*/

				this.Redrawn(this.node);	
			}

		},		

		//function pour effacer le poligone de this.aladin lite quand passe a mode edition
		DeleteOverlay :  function()
		{
			if (this.overlay != null) 
			{			 	      
				//console.log('this.skyPositions: ' + this.skyPositions);
				//console.log('A: ' + typeof(A));
				this.overlay.addFootprints(A.polygon(this.skyPositions));
				this.overlay.removeAll();
				this.overlay.overlays = [];
				//console.log('this.overlay' + this.overlay);			           
			}	        	 
		},

		//function pour obtenir les valeurs de le polygon et creer le polygon en adalin lite
		recuperar: function()
		{
			/*
			 * When the position are set from outside, the node remains empty while there is edition action.
			 *  So if the user want to get back the polygoene without editing it, we have to cancel this method
			 */
			if( this.node && this.node.length == 0 && this.skyPositions && this.skyPositions.length > 0 ) {
				return ;
			}
			//console.log('this.node1: ' + this.node.length);

			//console.log('this.node.length: ' + this.node.length);
			this.skyPositions = [];		 
			for (var k=0; k<this.node.length; k++) {
				//this.skyPositions.push(this.aladin.pix2world(this.node[k][0], this.node[k][1]));
				this.skyPositions.push(this.aladinView.pix2world(this.node[k].cx, this.node[k].cy));
			};
			//finalthis.node
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});

				this.aladinView.addOverlayer(this.overlay);
        }
			this.overlay.removeAll();	
			this.overlay.addFootprints([A.polygon(this.skyPositions)]);
		},

		//function pour obtenir les valeurs de le polygon et creer le polygon en adalin lite
		setPolygon: function(points)
		{
			this.skyPositions = [];		 
			for( var k=0 ; k<points.length ; k++){
				this.skyPositions.push(points[k]);			
			}
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});
				this.aladinView.addOverlayer(this.overlay);
			}
			this.overlay.removeAll();	  
			this.overlay.addFootprints([A.polygon(this.skyPositions)]);//créer la polygon
			//this.PolygonCenter();
		},
		setOverlay: function(points)
		{
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});
				this.aladinView.addOverlayer(this.overlay);
			}
			this.overlay.removeAll();	  
		},
		//function pour effacer le poligone de this.canvas
		CleanPoligon: function()
		{
			this.CanvasUpdate();
			this.node = [];
			this.skyPositions= [];
			//console.log('this.node delete: ' + this.node.length);		
		},

		//trouver le polygon en adalin lite si on se trouve en otre part du universe
		PolygonCenter: function()
		{	
			var view = BasicGeometry.getEnclosingView(this.skyPositions);
			this.aladin.gotoPosition(view.center.ra, view.center.dec);
			this.aladin.setZoom( 1.2*view.size );
// LM patch
//			var Height = this.GetHeight(this.skyPositions);		
//			var width = this.GetWidth(this.skyPositions);
//			if( Height.largeur == 0 || width.largeur == 0 ) {
//				return;
//			}
//			var center = {};
//			center.ra = ((Height.ramax +  Height.ramin)/2);
//			center.dec =  ((width.decmax + width.decmin)/2);
//			this.aladinView.gotoPosition(center.ra, center.dec);
//			this.aladinView.setZoom( (width.width + Height.largeur) );
		},

		//effacer un this.node de le polygone si se trouve sûr autre this.node
		RemoveNode: function(nodevalue,status)
		{
			var index = this.node[nodevalue];

			if(this.node.length >= 4)
			{			
				this.node.splice(nodevalue,1);
				if(status)
				{
					this.DrawNode(this.node);
				}else
				{
					this.Redrawn(0);
				}

			}
		},

		//function pour obtenir le this.node initial et final du polygon
		GetXYNode: function(x,y)
		{
			var nodes={};        

			var dx;
			var dy;
			
			for(var i in this.node)
			{	         
				//console.log('this.nodenum:  ' + i);
				//console.log('cx: ' + this.node[i].cx);
				//console.log('cy: ' + this.node[i].cy);
				dx = x - this.node[i].cx;
				dy = y - this.node[i].cy;  
				//var result =Math.sqrt(dx * dx + dy * dy);
				var result = dx * dx + dy * dy;

				if(result <= 25)
				{	                	
					if(nodes.a == undefined)
					{
						nodes.a = i;
					}
					else 
					{
						nodes.b = i;
					}            		            		
				}                      
			}

			return nodes;
		},

		//metodo que debuelve el numero de nodos del poligono
		GetNodelength: function()
		{
			return this.node;
		},

		//crear la grafica
		createGrafic: function(parametre)
		{
			this.DrawGrafic(parametre);
		},

		//indicar cuando serrar poligono
		cuadradoIndicador: function(x,y)
		{	
			this.context.beginPath();
			this.context.fillRect(x,y,10,10);     	      
			this.context.fillStyle = "red";
			this.context.fill();
			this.context.stroke();	 
			this.context.closePath();
		},

		stokeNode: function(nodeposition)
		{
			if(nodeposition != undefined) 
				var stocknode = [];
				stocknode.push
				({
					position: nodeposition,
					cx:this.node[nodeposition].cx,
					cy:this.node[nodeposition].cy,
					r:5
				});

				return stocknode;
			
		},
		getSkyPositions: function() {
			return this.skyPositions;
		}
}

console.log('=============== >  RegionEditor_m.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * Controller handling the user actions in connection with the model 
 * 
 *  params = {canvas,canvaso, aladin}
 * 
 * Author Gerardo Irvin Campos yah
 */
/**
 * @author michel
 *
 */

function  RegionEditor_mvC(params){

	this.polygonModel =  new RegionEditor_Mvc(params.points, params.handler, params.canvas, params.canvaso, params.aladinView);
	this.canvas = params.canvas; 	
	this.clientHandler = params.handler;
	this.startingNode= -1; 
	this.buttondown = false; 
	this.closed = false;	
	this.movestart = false;
	this.startdrag = false;
	this.drag = null;
	this.result = -1;
	this.stokeNode;
	var that = this;
}

RegionEditor_mvC.prototype = {
		getStatus: function() {
			 return "startingNode=" 
			        +this.startingNode + " buttondown=" 
			  		+ this.buttondown+ " closed=" 
			  		+ this.closed+ " movestart=" 
			  		+ this.movestart + " startdrag=" 
			  		+ this.startdrag + " drag=" 
			  		+ this.drag  + " result=" 
			  		+ this.result + " stokeNode=" 
			  		+ this.stokeNode
			  		;
		},
		/**
		 * TODO to be implemented
		 */
		checkPolygon : function(points) {
			return true;
		},
		/**
		 * 
		 */
		mouseDown : function(event) {
			
			var clickedNode = -1;
			var clickedSegment = -1;
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);
					
			//pregunta si el pologono esta vacio
			if( this.polygonModel.isEmpty()) 
			{
				this.polygonModel.addNode(x,y);			 
			}
			//obtener segmento
			
			//comenzar el this.drag del nodo		
			else if(this.closed == true && (clickedNode = this.polygonModel.getNode(x,y)) != -1)
			{
				this.result = this.polygonModel.getSegment(clickedNode);
				this.stokeNode = this.polygonModel.stokeNode(clickedNode);
				this.startdrag = true;		
				this.drag = clickedNode;
				this.startingNode = clickedNode;		
				this.canvas.css('cursor','move');
			}
			//pregunta si el espacio presionado es un nodo 
			else if((clickedNode = this.polygonModel.getNode(x,y)) != -1 )
			{
				//pregunta si es una extremidad
				if(this.polygonModel.isExtremity(clickedNode) /*poligono abierto*/) 
				{			
					//pregunta estas abierto
					if(this.closed == true)
					{
						this.startingNode = -1;
						this.buttondown = false;	
					}
					else
					{
						this.startingNode = clickedNode;
						this.buttondown = true;					
						this.closed = false;
					}
				}							
			} 		
			
			//saber si estoy sobre un segmento
			if(this.closed && clickedNode == -1)
			{						
				var node = this.polygonModel.GetNodelength();	
						
				var Segmentos = new Segment(node);	
				var option = Segmentos.IsCursorOn(x,y);
				
				if(option != undefined)
				{
					if(option.flag == "vertical")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
					else if(option.flag == "horizontal")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
					else if(option.flag == "distancia")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
				}						
			
			}
			
		},
		/**
		 * 
		 */
		mouseMove : function(event) {
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);
			//console.log("mouse move " + this.getStatus());
			//pregunta si el nodo fue presionado y si es un nodo
			if(this.buttondown == true  && this.startingNode != -1 )
			{
				//console.log ('this.startingNode' + this.startingNode);
				this.movestart = true;
				this.polygonModel.drawHashline(this.startingNode,x,y,this.result);		
			}		
			else if(this.startdrag)
			{
				this.polygonModel.Drag(this.drag, x, y , this.result);
				
				//console.log('this.startdrag move');		
			}
			
//			var h2x = document.getElementById("idcoor");
//			h2x.innerHTML = 'X coords: '+x+', Y coords: '+y;
		},
		
		mouseUp: function(event) {
			var clickedNode = -1;
			var finalnode;
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);		
		//pregunta nodo es presionado y es si es un nodo
			if(this.buttondown == true && (clickedNode = this.polygonModel.getNode(x,y)) != -1 )
			{		
				//pregunta si es un extremo
				if( this.polygonModel.isExtremity(clickedNode) == false) 
				{				
					this.polygonModel.CleanLine();				
					this.buttondown = false;
				}	
				
				//console.log('clickedNode: ' + clickedNode + ' this.startingNode: ' +  this.startingNode);
				if(this.polygonModel.closePolygone(clickedNode , this.startingNode) == true)
				{
					//console.log('this.closed polygon');					
					this.buttondown = false;	
					this.closed = true;
					//this.invokeHandler(false); if add this the length of skyPosition[] will be null
				
					//console.log('clickedNode: ' + clickedNode + ' this.startingNode: ' +  this.startingNode);							
				}
			} 
			
			if(this.closed == true && (finalnode = this.polygonModel.GetXYNode(x, y) ) != null)			
			{
				if(finalnode.a != undefined && finalnode.b != undefined)
				{
					//console.log('finalnode a: ' + finalnode.a + ' finalnode b: ' + finalnode.b);
					
					if(this.startingNode ==  finalnode.a)
						this.polygonModel.RemoveNode(finalnode.a,false);
					else if(this.startingNode ==  finalnode.b)
						this.polygonModel.RemoveNode(finalnode.b,false);
				}			
			}
					
			if(this.buttondown == true && this.movestart == true)
			{		
				if( clickedNode == this.startingNode && (clickedNode = this.polygonModel.getNode(x,y) != -1) )
				//if((clickedNode = this.polygonModel.getNode(x,y)) != -1)
				{											
					this.buttondown = false;		
					this.movestart = false;	
					this.polygonModel.CleanLine();							
				}				
				else
				{						
						this.polygonModel.addNode(x,y,this.startingNode);
						this.buttondown = false;		
						this.movestart = false;	
						
						var nodos = this.polygonModel.GetNodelength();					
						var Segmentos = new Segment(nodos);	
						var temp;
						
						var inter = Segmentos.Itersection(this.startingNode,false);
						
						if(inter != -1 && inter != undefined)
						{			
							//poligono abierto = true
							if(this.startingNode != 0)
								this.polygonModel.RemoveNode(inter.nB,true);
							else
								this.polygonModel.RemoveNode(inter.nA,true);
							
							this.polygonModel.CleanLine();
						}												
				}			
				
			}
			else if(this.buttondown == true && this.movestart == false)
			{			
				this.buttondown = false;		
				this.movestart = false;	
			}
			
			if(this.startdrag == true)
			{
				//console.log('this.startdrag fin');
				this.startdrag = false;
				this.canvas.css('cursor','default');
				
				//stoke le numero de noeud appuyer
				//this.startingNode;			
				
				var nodos = this.polygonModel.GetNodelength();					
				var Segmentos = new Segment(nodos);	
				var inter = Segmentos.Itersection(this.startingNode,true);			
				if(inter != -1 && inter != undefined)
				{						
					this.polygonModel.RemoveNode(this.startingNode, false);
					this.polygonModel.addNode(x, y, this.stokeNode,true);
					//console.log(inter.length);
				}
			}
			this.polygonModel.canvasUpdate();
		},
		
		almacenar : function()
		{
			this.polygonModel.almacenar();
		},
		
		recuperar : function()
		{
			this.polygonModel.recuperar();
		},
		
		DeleteOverlay : function() {
			this.polygonModel.DeleteOverlay();
		},
		
		CleanPoligon : function(){
			this.polygonModel.CleanPoligon();
			this.closed = false;
		},
		
		PolygonCenter : function(){
			this.polygonModel.PolygonCenter();
		},
	
		CreateGrafic : function(canvas){
			this.polygonModel.createGrafic(this.canvas);
		},
		
		show : function() {
			alert(this.polygonModel.getSkyPositions());
		},
		/**
		 * Set the polygone with points. Points is a simple array. It must have at 
		 * least 6 values (3pts) and an even number of points
		 * @param points  [a,b,c,.....]
		 * @returns {Boolean} true if the polygone is OK
		 */
		setPoligon : function(points) {
			this.polygonModel.setPolygon(points);
			this.closed = true;
			this.invokeHandler(false);
			return true;
		},
		/**
		 * Call the client handler when the polygine is close or when the user click on accept
		 * The data passed to the user handler look like that:
		    {isReady: true,             // true if the polygone is closed
		    userAction: userAction,     // handler called after the user have clicked on Accept
		    region : {
		        format: "array2dim",    // The only one suported yet [[x, y]....]
		        points: this.polygonModel.skyPositions  // array with structire matching the format
		        size: {x: , y:} // regiosn size in deg
		        }
		 */
		invokeHandler : function(userAction){
			if( this.isPolygonClosed() ){
				/*
				 * Compute the region size in degrees
				 */
				var view = BasicGeometry.getEnclosingView(this.polygonModel.skyPositions);
				this.clientHandler({isReady: true
					, userAction: userAction
					, region : {format: "array2dim"
						       , points: this.polygonModel.skyPositions
							   , size: {x: view.size, y: view.size}}});
			} else {
				alert("Polygon not closed");
			}
		},
		
		isPolygonClosed: function() {
			return ( this.closed || ( this.polygonModel.node == undefined || this.polygonModel.node.length == 0) );
		}
}

console.log('=============== >  RegionEditor_c.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * 
 * parentDivId="aladin-lite-div"
 * 
 */
//"use strict"
function HipsSelector_Mvc (parentDivId, aladinLite_V){
	this.tapSchemaQuery = "SELECT  TOP 100  tap_schema.tables.schema_name as schema, "
		+ "tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd "
		+ "FROM tap_schema.columns "
		+ "JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name "
		+ "WHERE tap_schema.columns.table_name = '{$CATID}'";
	this.productType = null;
	this.baseUrl = null
	this.imageIdPattern 	= new RegExp(/.*\/C\/.*/);
	this.imageTilePattern 	= new RegExp(/.*((jpeg)|(png)).*/);
	this.view = new HipsSelector_mVc(parentDivId, this);
	this.hips_dict = {};
	this.cata_dict = {};// les catalog trouveés 
	this.cata_tab = [];//pour stoker obs_id et afficher dans le panneau
	this.cata_created = {}; //tous les catalog qui a été crée par A.cata... et afficher dans aladin sont stoker comme objet cata 
	this.color = {};
	this.aladinLite_V = aladinLite_V;
}

HipsSelector_Mvc.prototype = {	
		searchHips : function(mask,aladinLiteView){
			var that = this;
			
			/**
			 * créer le lien url pour acces au serveur
			 */
			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			
			/**
			 * afficher le panel de la liste
			 */
			//that.view.displaylistepanel();
			that.productType = "image";
			var url = this.baseUrl;
			if( mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
						if( that.productType == "image" ){
							for(var i = jsondata.length - 1; i >= 0; i--) {
								var keepIt = 0;
									if(  $.isArray(jsondata[i].hips_tile_format)) {
										for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
											if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
												keepIt = 1;
												break;
											}
										}
									} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
										keepIt = 1;
									}
								if( keepIt == 0 ){
									jsondata.splice(i, 1);
								}
							}
						}
					}

					that.storeHips(jsondata);
					that.view.displayHipsList(jsondata);
			});
		},
		
		storeHips : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.hips_dict[jsondata[i].ID]= jsondata[i];
			}
		},
		buildHipsTab: function(aladinLiteView){
			var that = this;
			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			that.productType = "image";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
				if( that.productType != undefined ){
					for(var i = jsondata.length - 1; i >= 0; i--) {
						if(jsondata[i].dataproduct_type != that.productType ) {
							jsondata.splice(i, 1);
						}
					}
					if( that.productType == "image" ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							var keepIt = 0;
								if(  $.isArray(jsondata[i].hips_tile_format)) {
									for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
										if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
											keepIt = 1;
											break;
										}
									}
								} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
									keepIt = 1;
								}
							if( keepIt == 0 ){
								jsondata.splice(i, 1);
							}
						}
					}
				}
				that.storeHips(jsondata);
		});
			
		},
		getSelectedHips: function(ID){
			return this.hips_dict[ID];
		},
		
		/**
		 * la différence entre le cataloge et le hips est le 'productType'
		 */
		searchCataloge: function(mask,aladinLiteView){
			var that = this;

			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=100";

			//that.view.displaylistepanel();
			that.productType = "catalog";
			var url = this.baseUrl;
			if( mask != undefined &&mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					that.storeCatalog(jsondata);
					that.view.displayCatalogeList(jsondata);
			});
		},
		//create the data_dict for the catalogs in the bookmarks and restore the catalogs in vizier_list
		buildCataTab : function(aladinLiteView){
			var that = this;

			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=200";

			that.productType = "catalog";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					for(var i=0 ; i<jsondata.length ; i++){
						that.cata_dict[jsondata[i].obs_id]= jsondata[i];
					}
					//restore the catalogs : display in current view + display in vizier_list
					that.restoreCatalog(aladinLiteView);
					
			});
		},
		
		storeCatalog : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.cata_dict[jsondata[i].obs_id]= jsondata[i];
			}
		},
		
		builTapQuery : function(obs_id){
			/*
			 * SELECT  TOP 100  tap_schema.tables.schema_name as schema, tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd
FROM tap_schema.columns
JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name
WHERE      tap_schema.columns.table_name = 'II/306/sdss8' 
			 */
			var query = this.tapSchemaQuery.replace('{$CATID}', obs_id);
		    $.ajax({
		        url: 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync',
		        data: {"lang": "adql",
		        	"request" : "doQuery",
		        	"format": "json",
		        	"query": query},
		        method: 'GET',
		        async: false, // Mode synchrone

		        dataType: 'json',
		        success: function(response) {
		        	var schema = response.data[0][0] + ".'" + obs_id + "'";
		        	for( var i=0 ; i<response.data.length ; i++){
		        		if( response.data[i][3].startsWith('phot.mag;em')) {
		    				var mag_col = response.data[i][2];
		    				var query = "SELECT TOP 500 * FROM " + schema 
		    				+ " WHERE " + mag_col + " IS NOT NULL AND CONTAINS(POINT('ICRS', RAJ2000, DEJ2000), BOX('ICRS', @ra@, @$dec@, @$fov@, @$fov@)) = 1 " 
		    				+ " ORDER BY " + mag_col + " asc";
		    				query = 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync?lang=adql&request=doQuery&' 
		    					+ encodeURI(query).replace(/@ra@/g, '{$ra}').replace(/@dec@/g, '{$dec}').replace(/@fov@/g, '{$fov}');
		    				cata_dict[obs_id].tapProgUrl = query;
		    				break;
		        		}
		        				
		        	}
		        },
		        error: function(xhr, status, error) {
		        	WaitingPanel.warn(xhr.responseText);
		        }
		    });
		},
		
		getSelectedCatalog: function(obs_id){
			return this.cata_dict[obs_id];
		},
		
		/*storeCurrentCatalog:function(obs_id){
			var state=false;
			for(var i=0;i<this.cata_tab.length;i++){
				if(this.cata_tab[i]==obs_id){
					state = true
					break;
				}
			}
			if(state==false){
				//this.builTapQuery(obs_id)
				this.cata_tab.push(obs_id);
			}
		},*/
		
		deleteCatalogInTab: function(i){
			this.cata_tab.splice(i, 1);			
		},
		
		createCatalogSelect: function(obs_id){
			var self=this;
			return this.view.createCatalogSelect(obs_id,self.cata_dict);
		},
		
		displaySimbadCatalog: function(){
			return this.view.displaySimbadCatalog();
		},
		
		displayNedCatalog: function(aladinLiteView){
			return this.view.displayNedCatalog(aladinLiteView);
		},
		
		currentCatalogTab: function(catalogsDisplayed){

			var self = this;
			var tab = [];
			//var hasNumber = /\d/;
			//create list(tab) of catalog displayed in the current view
			for(var i=0;i<catalogsDisplayed.length;i++){
				var element = {catalog:null, color: null,obs_id: null};
				var nameTemp = catalogsDisplayed[i].name;
				element.catalog = nameTemp;
				element.color = catalogsDisplayed[i].color;
				for(var name in LibraryCatalog.catalogs){
					if(LibraryCatalog.catalogs[name].nameTemp == nameTemp){
						element.catalog = LibraryCatalog.catalogs[name].name;
						element.color = LibraryCatalog.catalogs[name].color;
					}
				}
				if(element.catalog.startsWith('VizieR') ){
					//Seperate the obs_id from vizier name
					element.obs_id = element.catalog.split(":")[1];
				}
				tab.push(element);
			}
			return tab;			
		},
		//For bookmark :  display the catalogs in current view and  display the names in vizier_list
		restoreCatalog: function(aladinLiteView){
			var self =this;
			var map = {};
			for(var i=0; i<aladinLiteView.catalogTab.length; i++){
				var x;
				self.view.libraryMap.setCatalogByColor(aladinLiteView.catalogTab[i]);
				if(aladinLiteView.catalogTab[i].catalog=='Simbad'){
					self.displaySimbadCatalog();
				}else if(aladinLiteView.catalogTab[i].catalog=='NED'){
					self.displayNedCatalog(aladinLiteView);
				}
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id] && aladinLiteView.catalogTab[i].obs_id){
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url==undefined){
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable');
				}else{
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable', self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url);
				}
				//self.storeCurrentCatalog(aladinLiteView.catalogTab[i].obs_id);
				//map[aladinLiteView.catalogTab[i].obs_id] = x;
				}
			}
			this.view.redrawCatalogSelector(aladinLiteView,self.cata_dict);
		},
		
		displayDataXml: function(aladinLiteView){
			
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.displayDataXml(aladinLiteView,url);
		},
		
		updateCatalogs: function(aladinLiteView,state){
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.updateCatalogs(aladinLiteView,url,state);
		}
}
console.log('=============== >  HipsSelector_m.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

/**
 * 
 * @param parentDivId:  "aladin-lite-div"
 * @param model: HipsSelector_Mvc()
 * @returns
 */
//"use strict"
function HipsSelector_mVc(parentDivId, model){
	this.parentDivId = parentDivId;
	this.parentDiv = null;
	this.libraryMap = new LibraryMap();
//	this.idCounter = 0;
	this.model = model;
}

HipsSelector_mVc.prototype = {
		/**
		 * afficher le panneau de la liste sur aladin
		 */
		displaylistepanel : function(){
			/*if( this.parentDiv == null )
				this.parentDiv = $('#' + this.parentDivId);
			this.parentDiv.append('<div id="itemList" class="alix_hips_panel"></div>');*/
			//to avoid the repetition of the creation of itemlist div 
		},
		
		/**
		 * afficher la liste de surveys
		 */
		displayHipsList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='color:#2e3436;style='font-size: 15px;'>" + jsondata.length + " matching Hips images</span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);"'
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					itemList.append("<div id = 'panel_"
							+ jsondata[i].ID + "' class='alix_liste_item' ><bn class='alix_title_in_liste'>"
							+ jsondata[i].obs_title +" | "+jsondata[i].ID+"</bn></div><div id='" 
							+ jsondata[i].ID.replace(/\./g,'') 
							+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.hipsFunction(&quot;" + jsondata[i].ID
							+ "&quot,  &quot;"+ jsondata[i].obs_title.replace(/["']/, ' ') + "&quot)'>"  + jsondata[i].obs_title +"</span><br><br>"                                                                       
							+"<span style='font-size:small;color : #727371'>"+jsondata[i].ID +"</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_regime + "</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_description + "</span></div>");
					$(document.getElementById("panel_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id')	.replace('panel_','').replace(/\//g, "\\/").replace(/\./g,'');//solve the problem that CXC can't show up
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		displayCatalogeList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='font-size: 15px;'>" + jsondata.length + " matching Catalogues <b>*catalogue progressive</b></span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					if(jsondata[i].hips_service_url == undefined){
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' >"
								+ jsondata[i].obs_title +"</span></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot,  &quot;" + jsondata[i].obs_title.replace(/["']/, ' ') + "&quot);'>"    
								+ jsondata[i].obs_title
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span></div>");
					}else{
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' style='font-weight: bold;'>"
								+ jsondata[i].obs_title+"</span><i class='glyphicon glyphicon-asterisk' style='font-size:8px;'></i></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot,  &quot;" + jsondata[i].obs_title.replace(/["']/, ' ') + "&quot);'>"  
								+ jsondata[i].obs_title 
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span><br>"
								+ "<span style='font-size:small;'>"
								+ jsondata[i].hips_service_url+"</span></div>");
					}
					$(document.getElementById("catalog_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id').replace('catalog_','cata_').replace(/\//g, "\\/").replace(/\+/g,"\\+");
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		/**
		 * display the catalog list in panel
		 */
		createCatalogSelect : function(obs_id,cata_dict){
			/*
			 * draw the initial cata in AL
			 */	
			var self=this;
			$("#itemList").css("display", "none");
			//var obs_id=obs_id_list[obs_id_list.length-1];
			var cata_name = 'VizieR:'+obs_id;
			var cataInit = null;
			var catadata = cata_dict[obs_id];
			var color;
			if(LibraryCatalog.getCatalog(cata_name)){
				color = LibraryCatalog.getCatalog(cata_name).color;
				//if catalog exists already in library catalog,we take the color from libraryCatalog
			}else{
			    color = this.libraryMap.getNextFreeColor(obs_id).color;
			}//if not ,we take a color from color map
			WaitingPanel.show(obs_id);
			if(catadata.hips_service_url!=undefined){
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color,'showTable', catadata.hips_service_url);
				//self.model.cata_created[obs_id] = cataInit;
			}else{
				//self.model.builTapQuery(catad.obs_id)
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color, 'showTable');
				//self.model.cata_created[obs_id] = cataInit;
			}
			/*
			 * draw the list of cata in panel 
			 */
			var id = LibraryCatalog.getCatalog(cata_name).id;
			$("#vizier_list").append('<li id="cata_list_'+ id +'" class = "'+obs_id+'"style="list-style-type: none;height:auto;">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+color+';" >' + cata_dict[obs_id].obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_flash_catalog_'+id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_delete_catalog_'+id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');		
			var x = id;
			// show or hide the catalog		
			$('#cata_operate_'+id).unbind("click").click(function(event){	
					event.stopPropagation();
					var obs_id = $(this).text();
					var cata_name = 'VizieR:'+obs_id;
					var cataColor = LibraryCatalog.getCatalog(cata_name).color;
					var catadata = cata_dict[obs_id];
					
					if($(this).attr("class") != "alix_vizier_chosen "){					
						$(this).attr("class", "alix_vizier_chosen ");
						$(this).css("color", cataColor);
						
						WaitingPanel.show(obs_id);

						$("#itemList").css("display", "none");
						if(catadata.hips_service_url != undefined){
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
					}else{
						$(this).attr("class", "alix_vizier_in_menu ");
						$(this).css("color", "#888a85");
						self.model.aladinLite_V.cleanCatalog(cata_name);
					}				
			});
			// delete the catalog in the current view and library catalog and free the color in library map
			$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
				event.stopPropagation();
				//var obs_id =$("#cata_operate_"+ x).text();
				var obs_id = this.parentNode.className;
				var cata_name = 'VizieR:'+obs_id;
				AladinLiteX_mVc.deleteLastSelectedPositionByCatalog(obs_id);
				//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
				//var catadata = cata_dict[obs_id];
			    self.model.aladinLite_V.cleanCatalog(cata_name);
			    self.libraryMap.freeColor(obs_id);
				LibraryCatalog.delCatalog(cata_name);
				this.parentNode.remove();
				AladinLiteX_mVc.closeContext();
				
			    return false ;
			});
			//catalog flash
			$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
				event.stopPropagation();
				var obs_id =$("#cata_operate_"+ x).text();
				var cata_name = 'VizieR:'+obs_id;
				LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
				//self.model.cata_created[obs_id].makeFlash();
			});
			
			
	
		},

		displaySimbadCatalog : function(){
			var self=this;
			var name = 'Simbad';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
			var clickType = 'showTable';
			if(cmdNode.attr("class") == "alix_simbad_in_menu  alix_datahelp" ){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_simbad_in_menu  alix_datahelp_selected");
				cmdNode.css("color", color);
				 $("#btn-Simbad-configure").css("color", color);
				 $("#btn-Simbad-flash").css("color", color);
				self.model.aladinLite_V.displayCatalog(name, color, VizierCatalogue.showSourceData, url);
				$("#SearchType").css("display","inline");
				SimbadCatalog.SearchType();
				SimbadCatalog.resetFilter();
			}else{
				cmdNode.attr("class", "alix_simbad_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-Simbad-configure").css("color", "#888a85");
				 $("#btn-Simbad-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
				AladinLiteX_mVc.closeContext();
				$("#SearchType").css("display","none");
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		displayNedCatalog: function(aladinLiteView){
			var self= this;
			var name = 'NED';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			var clickType = 'showTable';
			if(cmdNode.attr("class") == "alix_ned_in_menu  alix_datahelp" ){
				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.affichage.progressiveMode == false){
					WaitingPanel.warnFov();
				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_ned_in_menu  alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-NED-configure").css("color", color);
					$("#btn-NED-flash").css("color", color);
					self.model.aladinLite_V.displayCatalog(name, color, VizierCatalogue.showSourceData);
				}
			}else{
				cmdNode.attr("class", "alix_ned_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-NED-configure").css("color", "#888a85");
				 $("#btn-NED-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);//delete the Ned in library
				AladinLiteX_mVc.closeContext();
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		/**
		 * aladinLiteView = {
			this.name = null;
			this.ra = null;
			this.dec = null; 
			this.fov = null;
			this.survey = null;
			this.region = null;
			this.id = null;
			this.img = null;
			this.XMM = false;
			this.catalogTab = null;
			}
		 */
		//redraw vizier list when a bookmark in the history is selected and replayed
		redrawCatalogSelector: function(aladinLiteView,cata_dict){
			var self = this;
			var html='';
			//if(map.length != 0){	
			$("#vizier_list").html(html);
				for(var j=0;j<aladinLiteView.catalogTab.length;j++){
					var catalog = aladinLiteView.catalogTab[j].catalog;
					var obs_id = aladinLiteView.catalogTab[j].obs_id;
					if(obs_id != undefined){
						if(LibraryCatalog.getCatalog(catalog)){
							var color = LibraryCatalog.getCatalog(catalog).color;
							var id = LibraryCatalog.getCatalog(catalog).id;
						}else{
							var color = aladinLiteView.catalogTab[j].color;
							
						}
						$("#vizier_list").append( '<li style="list-style-type: none;height:24px;" class="'+ obs_id + '">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+color+';" >' + obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+ id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_flash_catalog_'+ id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_delete_catalog_'+ id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');
						
					//$('#vizier').on('click','#cata_operate_'+id,function(event){		
						$('#cata_operate_'+id).unbind("click").click(function(event){		
							event.stopPropagation();
							var obs_id = $(this).text();
							var cata_name = 'VizieR:'+obs_id;
							var cataColor = LibraryCatalog.getCatalog(cata_name).color;
							var catadata = cata_dict[obs_id];
							
							if($(this).attr("class") != "alix_vizier_chosen "){					
								$(this).attr("class", "alix_vizier_chosen ");
								$(this).css("color", cataColor);
								
								WaitingPanel.show(obs_id);

								$("#itemList").css("display", "none");
								if(catadata.hips_service_url != undefined){
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
									//self.model.cata_created[obs_id] = cataInit;
								}else{
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
									//self.model.cata_created[obs_id] = cataInit;
								}
							}else{
								$(this).attr("class", "alix_vizier_in_menu ");
								$(this).css("color", "#888a85");
								self.model.aladinLite_V.cleanCatalog(cata_name);
							}				
					});
						//add handlers for each catalog in the vizier list
					$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
						event.stopPropagation();
						
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
						//var catadata = cata_dict[obs_id];
					    self.model.aladinLite_V.cleanCatalog(cata_name);
					    self.libraryMap.freeColor(obs_id);
						LibraryCatalog.delCatalog(cata_name);
						this.parentNode.remove();
						AladinLiteX_mVc.closeContext();
						return false ;
					});
					$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
						event.stopPropagation();
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
					//	map[obs_id].makeFlash();
						
					});
						
				}
				}
			//}
		
		},
		
		/**
		 * dataXML={position, service}
		 */
		//display local catalog such as 3XMM
		displayDataXml: function(aladinLiteView,url){
			var self = this;
			var name = 'Swarm';
			var cmdNode = $("#XMM");
			var clickType = 'handler';
			var color= '#ff0000';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
				if(cmdNode.attr("class") == "alix_XMM_in_menu  alix_datahelp"){
//				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false){
//					WaitingPanel.warnFov();
//				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-XMM-description").css("color" , color);
					$("#btn-XMM-flash").css("color" ,color);
					$("#btn-XMM-configure").css("color" ,color);
					$("#ACDS").css("display" , "inline");
					self.model.aladinLite_V.displayCatalog(name, "#ff0000", clickType, url);
//				}
				/*}else if(cmdNode.attr("class") == "alix_XMM_in_menu  alix_datahelp_nochange"){
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");*/
				//to avoid" when we display a view in the bookmark who contains XMM, it will recall displaydataxml(), and if xmm has been already showed ,function displaydataxml will lead to delete the XMM."	
			}else{
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				$("#btn-XMM-flash").css("color" , "#888a85");
				$("#btn-XMM-description").css("color" , "#888a85");
				$("#btn-XMM-configure").css("color" , "#888a85");
				$("#ACDS").css("display" , "none");
				self.model.aladinLite_V.cleanCatalog(name);
				//$("#aladin-lite-div-context").html("");
				self.model.aladinLite_V.cleanCatalog("Target");
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
			}
				AladinLiteX_mVc.closeContext();
		},
		
		//update each catalog shown in current view when we change the position or zoom 		
		updateCatalogs: function(aladinLiteView,url,state){
			var self = this;
			//Check if the catalog is displayed
			if($(document.getElementById("XMM")).attr("class") == "alix_XMM_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				if(state == 'zoom'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}else{
						self.model.aladinLite_V.cleanCatalog('Swarm');
						WaitingPanel.show('Swarm');
						self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
					}
				}else if(state == 'position'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}
					self.model.aladinLite_V.cleanCatalog('Swarm');
					WaitingPanel.show('Swarm');
					self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
				}
			}
			if($(document.getElementById("NED")).attr("class") == "alix_ned_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var name ='NED'
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}else{
						WaitingPanel.show(name);
						self.model.aladinLite_V.displayCatalog(name, color, clickType);
					}
			}
			if($(document.getElementById("Simbad")).attr("class") == "alix_simbad_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
				var name ='Simbad';
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
				WaitingPanel.show(name);
				self.model.aladinLite_V.displayCatalog(name, color, clickType, url);
			}
			//Update the vizier catalogs
			if(LibraryCatalog.catalogs != null){
				self.model.aladinLite_V.storeCurrentState();
				var cata = null;
				//When we zoom
				if(state == 'zoom'){
					//for(var i=0;i<self.model.cata_tab.length;i++){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen "){
						if(catalog.url!=undefined){
							//console.log("Progressive Vizier:"+name+"<<<url>>>"+catalog.url)
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							//console.log("Unprogressive Vizier:"+name+"<<<no url>>>")
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
//							if(aladinLiteView.fov>=1){
//								WaitingPanel.warnFov();
//							}else{
//								if($(document.getElementById("cata_operate_"+i)).attr("class") == "alix_vizier_chosen "){
//									self.model.aladinLite_V.cleanCatalog("VizieR:"+self.model.cata_tab[i]);
//									cataInit = self.model.aladinLite_V.displayVizierCatalog(self.model.cata_tab[i] , self.libraryMap.getColorByCatalog(self.model.cata_tab[i]).color, 'showTable');
//									self.model.cata_created[self.model.cata_tab[i]] = cataInit;
//								}
//							}
						}
					  }
					}
					//when we change the position
				}else if(state == 'position'){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						var cataInit = null;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen "){
							if(catalog.url==undefined){
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id , catalog.color, 'showTable');
								//self.model.cata_created[obs_id] = cataInit;
							}else{
								// catalogue porgressifs
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
								//self.model.cata_created[obs_id] = cataInit;
								}
							
						}
						}
					}
				}
			}
		}
}
console.log('=============== >  HipsSelector_v.js ');

/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
var SwarmDynamicFilter = function(){
	var ConstraintList = [];
	var alixCat;
	var sources;
	var aladinLiteView;
// add constraint in the list and apply the constraint list _xs.
var addConstraint  = function(constraint){	
	if(!ConstraintList[constraint.element]){
		ConstraintList.length++;
	}
	ConstraintList[constraint.element]= constraint;
	runConstraint();
}
//delete constraint in the list	and apply the constraint list _xs.
var delConstraint  = function(element){
	if(ConstraintList != null&&ConstraintList[element]){
	delete ConstraintList[element];
	ConstraintList.length--;
	}
	runConstraint();
}
var runConstraint = function(ALV){
	aladinLiteView = ALV;
	alixCat = LibraryCatalog.getCatalog("Swarm");
	sources = alixCat.al_refs.getSources();
	if (ConstraintList.length == 0 ){
		displayCatalogFiltered();
	}else{
	for(var element in ConstraintList){
		displayCatalogFiltered(ConstraintList[element]);//apply every constraint in the list _xs.
	}
	}
}
var displayCatalogFiltered = function(constraint){	
	if(constraint != undefined){
		var value = constraint.value;
		var element = constraint.element;
		var comparator = constraint.comparator;
		var type = constraint.type;
		var sourcesShown = [];
		ConstraintList[element]= constraint;
	}
	
	for(var i=0;i<sources.length;i++){
		source =sources[i];
	//for constraint numeric _xs.
	if(type=="num"){
		if(comparator==">"){
			if(parseFloat(source.data[element])>parseFloat(value)){
				source.show();	
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		}else if(comparator=="="){// if = 6.2 means 6<= x <7
			if(parseFloat(source.data[element])>=parseFloat(value)&&parseFloat(source.data[element])<(parseFloat(value)+1)){
				source.show();
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		
		}else if(comparator=="<"){
			if(parseFloat(source.data[element])< parseFloat(value)){
				source.show();	
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		}
		
	}else if(type=="boolean"){
	//for constraint boolean _xs.
			if(source.data[element]==value){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
	}else if(type=="String"){
		//for constraint String _xs.	
		if(comparator=="LIKE"){
			if(source.data[element].startsWith(value)){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
		}else if(comparator=="NOT LIKE"){
			if(source.data[element].startsWith(value)){
	
					source.hide();	
				}else{
		
					source.show();	
					sourcesShown.push(source);		
				}
		}else if(comparator=="IS NULL"){
			if(source.data[element]==null){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
		}else if(comparator=="IS NOT NULL"){
			if(source.data[element]==null){

				source.hide();	
			}else{
	
				source.show();	
				sourcesShown.push(source);		
			}
		}
		else if(comparator=="CONTAINS"){
			if(source.data[element].indexOf(value)!=-1){
				source.show();	
				sourcesShown.push(source);
			}
			else
				source.hide();
		}
	}else if(constraint == undefined){
		source.show();//show all the sources _xs.
	}
	}
	sources = sourcesShown;//Give the sources selected to the next constraint to select again _xs.
  }
	
   var retour =  {
		   runConstraint : runConstraint
		   ,addConstraint :addConstraint
		   ,delConstraint : delConstraint
		,displayCatalogFiltered : displayCatalogFiltered
   };

	return retour;
}()
console.log('=============== >  SwarmDynamicFilter.js ');

/**
f * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

var localConf = {
		parentDivId: "aladin-lite-div",
		defaultView: {
			defaultSurvey: "DSS colored",
			field: {
				position: "M33",
				defaultFov: "0.5"
			},
			panelState: true
		},
		controllers: {
			historic: { },
			regionEditor: { },
			hipsSelector: { }
		}
}
var externalConf;
var mixConf = function(localData,externalData) {   
	
	for(var key in externalData){
		if(typeof(externalData[key])== "object" && localData[key])
			{
			externalData[key] = mixConf(localData[key],externalData[key])
			}
	}
	return Object.assign(localData,externalData)
}

var configureALIX = function(externalData){
	if(externalData){
	externalConf = externalData;
	localConf = mixConf(localConf,externalData);
	}
	AladinLiteX_mVc.init(localConf);
} /////!!!Cant't add () ,cause configureALIX is called later by external project, not by himself












console.log('=============== >  ConfigureALiX.js ');

var VizierCatalogue = function(){
	
	var showSourceData = function(data){
		var e = event||window.event;
		var width=$("#aladin-lite-div").width();
		var length=$("#aladin-lite-div").height();
		var x=e.clientX;
		var y=e.clientY;
		 //alert(JSON.stringify(data.data));
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var SourceDiv = $("#SourceDiv");
		if( SourceDiv.css("display") == "none"){
			SourceDiv.css("display", "block");
			SourceDiv.css("position", "center");
			if(x+300>width)
				SourceDiv.css("left",width-400);
			else
				SourceDiv.css("left",x);
			if(y+300>length)
				SourceDiv.css("top",length-400);
			else
				SourceDiv.css("top",y);
		}
		var name = (data.data) ? data.catalog.name : "XMM"
		 SourceDiv.html("<span class=strong style='font-size: 18px;'><center><strong>" + name + "</center></strong></span>\n"
					+ '<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
					+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
					+ '<span class="glyphicon_SourceClose glyphicon-remove"></span></a>'
					+"<span class=strong style='font-size: 15px;'><center><strong>" + '    '+strlon + ' ' +strlat + "</center></strong></span><br>");
		 //var header = '<thead><tr>';
	     var content = '<thead>';
	     /*for (key in data.data) {
	    	 header += '<th>' + key + '</th>';
	         content += '<td>' + data.data[key] + '</td>';
	     }*/
	     //header += '</tr></thead>';
	     //content += '</tr>';
	     //SourceDiv.append('<table>' + header + content + '</table>');
		 //$("#aladin-lite-div").append(SourceDiv);
	     if( data.data != undefined){
	    	 for (key in data.data){
		    	 if(data.data[key])
		    		 content+='<tr><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
		     }
	     }
	     else{
	    	 for (key in data){
		    	 if(data[key])
		    		 content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
		     }
	     }
	     content+='<thead>'
	     SourceDiv.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">' + content + '</table></div>');
	     if(data.ra && name == "Simbad" ){
	    	 var pos=strlon+" " +strlat;
	    	 SimbadCatalog.simbad(pos,data);
	     }
	}
	
	var showXMMSourceData = function(data){
		var e = event||window.event;
		var width=$("#aladin-lite-div").width();
		var length=$("#aladin-lite-div").height();
		var x=e.clientX;
		var y=e.clientY;
		 //alert(JSON.stringify(data.data));
		var strlon = Numbers.toSexagesimal(data.ra/15, 8, false);
		var strlat = Numbers.toSexagesimal(data.dec, 7, false);
		var SourceDiv = $("#SourceDiv");
		if( SourceDiv.css("display") == "none"){
			SourceDiv.css("display", "block");
			SourceDiv.css("position", "center");
			if(x+300>width)
				SourceDiv.css("left",width-400);
			else
				SourceDiv.css("left",x);
			if(y+300>length)
				SourceDiv.css("top",length-400);
			else
				SourceDiv.css("top",y);
		}
		 SourceDiv.html("<span class=strong style='font-size: 18px;'><center><strong>" + "XMM" + "</center></strong></span>\n"
					+ '<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
					+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
					+ '<span class="glyphicon_SourceClose glyphicon-remove"></span></a>'
					+"<span class=strong style='font-size: 15px;'><center><strong>" + '    '+strlon + ' ' + '+'+strlat + "</center></strong></span><br>");
		 //var header = '<thead><tr>';
	     var content = '<thead>';
	     /*for (key in data.data) {
	    	 header += '<th>' + key + '</th>';
	         content += '<td>' + data.data[key] + '</td>';
	     }*/
	     //header += '</tr></thead>';
	     //content += '</tr>';
	     //SourceDiv.append('<table>' + header + content + '</table>');
		 //$("#aladin-lite-div").append(SourceDiv);
	     for (key in data){
	    	 if(data[key])
	    		 content+='<tr><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data[key]+'</td></tr>';
	     }
	     content+='<thead>'
	     SourceDiv.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">' + content + '</table></div>');
	}
	
	var SourceDataMove = function(){
		
			var move=false;
			var _x,_y;
			$("#SourceDiv").mousedown(function(event){
				move=true;
				_x=event.pageX-$("#SourceDiv").position().left;
				_y=event.pageY-$("#SourceDiv").position().top;
			});
			$("#SourceDiv").mousemove(function(event){
				if(move){
					var x=event.pageX-_x;
					var y=event.pageY-_y;
					$("#SourceDiv").css("left",x);
					$("#SourceDiv").css("top",y);
				}
			}).mouseup(function(){
				move = false;
			}).mouseleave(function(){
				move = false;
			});
		
		
	}
	var retour = {
			showSourceData : showSourceData,
			SourceDataMove : SourceDataMove,
			showXMMSourceData : showXMMSourceData
			
	};
	
	return retour;
}();
console.log('=============== >  VizierCatalog.js ');

var MessageBox = function(){
	var alertBox = function(str){
		var alert_message = "";
		alert_message += '<div id="alert_box" style="display:block"><br>'
						+'<span class=strong style="font-size: 15px;"><center><strong>' + str + '</center></strong></span><br>'
						+'<center><input type="button" value="OK" class="aladin-btn aladin-btn-small aladin-reverseCm" onclick="MessageBox.closeAlertBox()"></center></div>'
		$("#aladin-lite-div").append(alert_message);
	}
	
	var inputBox = function(str,note){
		var input_message = "";
		input_message += '<div id="input_box" style="display:block"><br>'
			+'<span class=strong style="font-size: 15px;"><center><strong>' + str + '</center></strong></span><br>'
			+'<center><input type="text" id="target_note" onfocus="this.select()"></center><br>'
			+'<input type="button" value="Cancel" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;right:90px;font-weight:900" onclick="MessageBox.closeInputBox()">'
			+'<input type="button" value="Commit" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;left:90px;font-weight:900" onclick="MessageBox.returnInputMessage()"></div>';
		
		$("#aladin-lite-div").append(input_message);
		//return $("#target_note").val();
	}
	var closeAlertBox = function(){
		if($("#alert_box").css("display")=="block")
			$("#alert_box").css("display","none");
		$("#alert_box").remove();
	}
	
	var closeInputBox = function(){
		if($("#input_box").css("display")=="block")
			$("#input_box").css("display","none");
		$("#input_box").remove();
	}
	var returnInputMessage = function(){
		if($("#input_box").css("display")=="block")
			$("#input_box").css("display","none");
		var note = $("#target_note").val();
		$("#input_box").remove();
		var targetName=$("#aladin-lite-div-select").children('option:selected').attr('id');
		if(note=="")
			$("#aladin-lite-div-select").children('option:selected').html(targetName+" ["+"null"+"] ");
		else
			$("#aladin-lite-div-select").children('option:selected').html(targetName+" ["+note+"] ");
	}
	var retour = {
		alertBox : alertBox,
		inputBox : inputBox,
		closeAlertBox : closeAlertBox,
		closeInputBox : closeInputBox,
		returnInputMessage : returnInputMessage
	};
	
	return retour;
}();
console.log('=============== >  MessageBox.js ');

var SimbadCatalog = function(){
	var alixCat;
	var sources;
	var aladinLiteView;
	var sourcetype;
	var aladinCatalog = null;
	var isFiltered= false;
	var longname;
	var simbad = function (data) {
		Alix_Processing.show("Waiting on Simbad Response");
		/**
		 ** part of VizierCatalog
		 */
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var pos = strlon+" " +strlat;
		var content = '<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
		if( data.data != undefined){
	    	for (key in data.data){
	    		if(key=="main_type"){
	    			if(longname!=undefined&&longname!=""&&longname.indexOf("[")!=-1)
	    				content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+'  '+longname+'</td></tr>';
	    			else
	    				content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data.data[key]+'</td></tr>';
	    		}
	    		else if(data.data[key])
		    		content+='<tr style="background-color:#f2f2f2;"><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
		    }
	    }
	    else{
	    	for (key in data){
		    	if(data[key])
		    		content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
		    }
	    }
	    content += '</table></div></div>';
		/**
		 * Translate SimbadTooltip.java
		 */
		var url = "http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
		url += encodeURIComponent("format object \"%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)\"\n" + pos + " radius=1m", "ISO-8859-1");
		//Alix_Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			url: url,
			method: 'GET',
	        async: true,
	        dataType: 'text',
	        success: function(jsdata){
	        	Alix_Processing.hide();
				
				var boeuf;
				var data_found = false;
				var json = {};
				var dataarray = [];
				var colarray = [];
				var jsloc1 = {};
				jsloc1["sTitle"]="ID";
				colarray.push(jsloc1);
				var jsloc2 = {};
				jsloc2["sTitle"]="Position";
				colarray.push(jsloc2);
				var jsloc3 = {};
				jsloc3["sTitle"]="Type";
				colarray.push(jsloc3);
				json["aoColumns"]=colarray;
				var datasize = 0;
				var lines = jsdata.split("\n");
				var i = 0;
				while ((boeuf = lines[i]) != undefined){
					if(data_found){
						var fields = boeuf.trim().split("|", -1);
						let pos = fields.length - 1;
						if( pos >= 3 ) {
							var type = fields[pos]; pos--;
							var dec = fields[pos]; pos--;
							var ra = fields[pos];
							/*
							 * Takes the first alias
							 */
							var id =  fields[0].split(/\s{2,}/)[0].trim();
							var darray = [];
							darray.push(id.trim());
							darray.push(ra + " " + dec);
							darray.push(type.trim());
							dataarray.push(darray);
							datasize++;
							if( datasize >= 15 ) {
								var darray = [];
								darray.push("truncated to 15");
								darray.push("");
								darray.push("");
								dataarray.push(darray);
								datasize++;									
							}
						}
					}
					else if(boeuf.startsWith("::data")){
						data_found = true;
					}
					i++;
				}
				json["aaData"] = dataarray;
				json["iTotalRecords"]= datasize;
				json["iTotalDisplayRecords"] = datasize;
				
				if( Alix_Processing.jsonError(json, "Simbad Tooltip Failure") ) {
					return;
				} else {
					var table = "";
					table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
					var id_modal = Alix_Modalinfo.nextId();
					//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
					Alix_Modalinfo.setModal(id_modal, false, "Simbad Summary for Position " 
							+ pos 
							+ "<a class=simbad target=blank href=\"http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
							+ encodeURIComponent(pos) + "\"></a>"
							, table);
					Alix_Modalinfo.setShadow(id_modal);
					Alix_Modalinfo.whenClosed(id_modal);

					$("#"+id_modal).css("overflow","hidden");

					var options = {
							"aoColumns" : json.aoColumns,
							"aaData" : json.aaData,
							"bPaginate" : true,
							"sPaginationType": "full_numbers",
							"aaSorting" : [],
							"bSort" : false,
							"bFilter" : true,
							"bAutoWidth" : true,
							"bDestroy" : true
					};

					var img;

					/*if( json.aaData.length > 0 ) {
						img = '<img src="http://alasky.u-strasbg.fr/cgi/simbad-thumbnails/get-thumbnail.py?name=' 
							+ encodeURIComponent((json.aaData[0])[0]) + '"/>';
					} else {		var divAladin = "aladin-lite-catdiv";
					var divInfoAladin = "aladin-lite-catdiv-info";

					img = '<span class="help">No vignette available</span>';
					}*/

					var position = [
					                { "name": img,
					                	"pos": "top-left"
					                },
					                { "name": "filter",
					                	"pos": "top-right"
					                },
					                { "name": 'information',
					                	"pos" : "bottom-left"
					                },
					                { "name": "pagination",
					                	"pos" : "bottom-center"
					                },
					                { "name": " ",
					                	"pos" : "bottom-right"
					                }
					                ];

					Alix_CustomDataTable.create("simbadtable", options, position);
					$("#simbadtable_paginate").css("left","250px");
					$(".txt-left").remove();	
					// Put the filter just above the table
					$("#"+id_modal).find(".dataTables_filter").css("margin-top","34%");
					$("#"+id_modal).find(".dataTables_filter").css("position","absolute");
					$("#"+id_modal).find(".dataTables_filter").css("left","1000px");
					$("#"+id_modal).find(".dataTables_filter").css("top","-394px");
					$("#"+id_modal).find(".dataTables_filter").css("z-index","1");
					var dataFilter = $("#"+id_modal).find(".dataTables_filter");
					dataFilter.css("top","-275px");
					dataFilter.css("left","767px");
					$("#"+id_modal).dialog( "option", "position", { my: "center", at: "center", of: window } );
					//add the SourceDiv to SimbadCatalog and adjust the css
					var parent = $("#"+id_modal).parent("div");
					parent.append(content);
					parent.append(dataFilter);
					parent.css("width","950px");
					parent.css("height","400px");
					$("#"+id_modal).css("width","650px");
					$("#"+id_modal).css("left","298px");
					$("#"+id_modal).css("height","auto");
					$("#"+id_modal).css("top","15px");
					$("#"+id_modal).css("min-height","93.16px");
					var SourceDiv = $("#SimbadSourceDiv");
				    SourceDiv.css("display","block");
				    SourceDiv.css("position","absolute");
				    SourceDiv.css("top","70px");
				    SourceDiv.css("left","0px");
				    SourceDiv.css("background-color","#ffeded");
					$("#simbadtable_next").html("&nbsp;&nbsp;&nbsp;");
					$("#simbadtable_previous").html("&nbsp;&nbsp;&nbsp;");
				}
	        }
		});
		Alix_Processing.hide();
	}
	
	var SearchType = function(){
		var type=["LM?", "LXB", "BNe","HII", "PN", "Pec?", "ev", "GiG", "bub", "BD*", 
			      "CV*", "BY*", "WD?", "?", "Al*", "vid", "Ae?", "ULX", "El*", "LyA", "reg", "TT*", "err", "Bz?",
				  "mm", "a2*", "Em*", "WR*", "LM*", "AB*", "XB?", "RC?", "RV*", "HX?", "sg?", "HH", "**?","Le?", 
				  "DN*", "Ce*", "AM*", "LX?", "WD*", "Cl*", "*", "N*", "gLe", "GlC", "FIR", "LP*", "BiC", "WU*",
				  "AB?", "cC*", "BS?", "Ir*", "cor", "dS*", "ALS", "bL*", "C?G", "s?y", "BH?", "blu", "GrG", "Y*O",
                  "Lev", "gam", "Be*", "ERO", "Ce?", "OH*", "grv", "BS*", "Pe*", "XB*", "s?r", "Ae*", "Pl", "sg*", 
                  "N*?", "CGb", "pr?", "Pu*", "St*", "Sy?", "V*", "X", "RR?", "C*?", "SNR", "ClG", "BL?", "LeI", 
                  "GWE", "Fl*", "PoC", "GiP", "SX*","C?*","bC*","GNe","RC*","DLA","SCG","HV*","Gr?","s*y","sh","HXB",
                  "s*b", "gB", "pr*","PaG","Or*","Be?","As*","glb","SyG","RS*","NL*","pA?","Gl?","LS?", "EmG","G?","HS?",
                  "BAL", "pA*","Er*","mul","IR","DNe","CGG","HI","CV?","EB*","C*","ISM","H2G","No*","Sy1","LeG","LI?","LSB",
                  "UV", "RR*","AGN","PM*","*i*","HB*", "MoC","No?","OpC","UX?","Cld","SBG","TT?","LeQ","S*","HzG","Psr","SB*",
                  "HS*", "red","PN?","FU*","Mi?","SN?","**","BLL","s?b","WV*","of?","RB?","SN*","LP?","DQ*","LLS","EB?",
                  "GiC", "smm","LIN","cm","Sy2","S*?","Bla","IG","HB?","Ro*","V*?","Y*?","QSO","Q?","HVC","SFR","bCG","EmO",
				  "Pl?", "MGr","s*r","sv?","EP*","AG?","Mas","Mi*","PoG","gLS","SR?","Sy*","WR?","RNe","G","NIR","*iN","rG","rB",
				  "BD?", "gD*","*iC","out","Rad", "RG*"];
		var table=["(Micro)Lensing Event [Lev]",
			"Absorption Line system [ALS]",
			"Active Galaxy Nucleus [AGN]",
			"Association of Stars [As*]",
			"Asymptotic Giant Branch Star (He-burning) [AB*]",
			"Asymptotic Giant Branch Star candidate [AB?]",
			"BL Lac - type object [BLL]",
			"Be Star [Be*]",
			"Black Hole Candidate [BH?]",
			"Blazar [Bla]",
			"Blue Straggler Star [BS*]",
			"Blue compact Galaxy [bCG]",
			"Blue object [blu]",
			"Blue supergiant star [s*b]",
			"Bright Nebula [BNe]",
			"Brightest galaxy in a Cluster (BCG) [BiC]",
			"Broad Absorption Line system [BAL]",
			"Brown Dwarf (M<0.08solMass) [BD*]",
			"Brown Dwarf Candidate [BD?]",
			"Bubble [bub]",
			"CV DQ Her type (intermediate polar) [DQ*]",
			"CV of AM Her type (polar) [AM*]",
			"Candidate blue Straggler Star [BS?]",
			"Candidate objects [..?]",
			"Carbon Star [C*]",
			"Cataclysmic Binary Candidate [CV?]",
			"Cataclysmic Variable Star [CV*]",
			"Cepheid variable Star [Ce*]",
			"Classical Cepheid (delta Cep type) [cC*]",
			"Cloud [Cld]",
			"Cluster of Galaxies [ClG]",
			"Cluster of Stars [Cl*]",
			"Cometary Globule [CGb]",
			"Compact Group of Galaxies [CGG]",
			"Composite object [mul]",
			"Confirmed Neutron Star [N*]",
			"Damped Ly-alpha Absorption Line system [DLA]",
			"Dark Cloud (nebula) [DNe]",
			"Dense core [cor]",
			"Double or multiple star [**]",
			"Dwarf Nova [DN*]",
			"Eclipsing Binary Candidate [EB?]",
			"Eclipsing binary of Algol type (detached) [Al*]",
			"Eclipsing binary of W UMa type (contact binary) [WU*]",
			"Eclipsing binary of beta Lyr type (semi-detached)[bL*]",
			"Eclipsing binary [EB*]",
			"Ellipsoidal variable Star [El*]",
			"Emission Object [EmO]",
			"Emission-line Star [Em*]",
			"Emission-line galaxy [EmG]",
			"Eruptive variable Star [Er*]",
			"Evolved supergiant star [sg*]",
			"Extra-solar Confirmed Planet [Pl]",
			"Extra-solar Planet Candidate [Pl?]",
			"Extremely Red Object [ERO]",
			"Far-IR source (\lambda >= 30 {\mu}m) [FIR]",
			"Flare Star [Fl*]",
			"Galactic Nebula [GNe]",
			"Galaxy in Cluster of Galaxies [GiC]",
			"Galaxy in Group of Galaxies [GiG]",
			"Galaxy in Pair of Galaxies [GiP]",
			"Galaxy with high redshift [HzG]",
			"Galaxy [G]",
			"Globular Cluster [GlC]",
			"Globule (low-mass dark cloud) [glb]",
			"Gravitational Lens System (lens+images) [gLS]",
			"Gravitational Lens [gLe]",
			"Gravitational Source [grv]",
			"Gravitational Wave Event [GWE]",
			"Gravitationally Lensed Image of a Galaxy [LeG]",
			"Gravitationally Lensed Image of a Quasar [LeQ]",
			"Gravitationally Lensed Image [LeI]",
			"Group of Galaxies [GrG]",
			"HI (21cm) source [HI]",
			"HI shell [sh]",
			"HII (ionized) region [HII]",
			"HII Galaxy [H2G]",
			"Herbig Ae/Be star [Ae*]",
			"Herbig-Haro Object [HH]",
			"High Mass X-ray Binary [HXB]",
			"High proper-motion Star [PM*]",
			"High-Mass X-ray binary Candidate [HX?]",
			"High-velocity Cloud [HVC]",
			"High-velocity Star [HV*]",
			"Horizontal Branch Star [HB*]",
			"Hot subdwarf candidate [HS?]",
			"Hot subdwarf [HS*]",
			"Infra-Red source [IR]",
			"Interacting Galaxies [IG]",
			"Interstellar matter [ISM]",
			"LINER-type Active Galaxy Nucleus [LIN]",
			"Long Period Variable candidate [LP?]",
			"Long-period variable star [LP*]",
			"Low Mass X-ray Binary [LXB]",
			"Low Surface Brightness Galaxy [LSB]",
			"Low-Mass X-ray binary Candidate [LX?]",
			"Low-mass star (M<1solMass) [LM*]",
			"Low-mass star candidate [LM?]",
			"Ly alpha Absorption Line system [LyA]",
			"Lyman limit system [LLS]",
			"Maser [Mas]",
			"Mira candidate [Mi?]",
			"Molecular Cloud [MoC]",
			"Moving Group [MGr]",
			"Near-IR source (\lambda < 10 {\mu}m) [NIR]",
			"Neutron Star Candidate [N*?]",
			"Not an object (error, artefact, ...) [err]",
			"Nova Candidate [No?]",
			"Nova [No*]",
			"Nova-like Star [NL*]",
			"OH/IR star [OH*]",
			"Object of unknown nature [?]",
			"Open (galactic) Cluster [OpC]",
			"Optically Violently Variable object [OVV]",
			"Outflow candidate [of?]",
			"Outflow [out]",
			"Pair of Galaxies [PaG]",
			"Part of Cloud [PoC]",
			"Part of a Galaxy [PoG]",
			"Peculiar Star [Pe*]",
			"Physical Binary Candidate [**?]",
			"Planetary Nebula [PN]",
			"Possible (open) star cluster [C?*]",
			"Possible Active Galaxy Nucleus [AG?]",
			"Possible BL Lac [BL?]",
			"Possible Be Star [Be?]",
			"Possible Blazar [Bz?]",
			"Possible Blue supergiant star [s?b]",
			"Possible Carbon Star [C*?]",
			"Possible Cepheid [Ce?]",
			"Possible Cluster of Galaxies [C?G]",
			"Possible Galaxy [G?]",
			"Possible Globular Cluster [Gl?]",
			"Possible Group of Galaxies [Gr?]",
			"Possible Herbig Ae/Be Star [Ae?]",
			"Possible Horizontal Branch Star [HB?]",
			"Possible Peculiar Star [Pec?]",
			"Possible Planetary Nebula [PN?]",
			"Possible Quasar [Q?]",
			"Possible Red Giant Branch star [RB?]",
			"Possible Red supergiant star [s?r]",
			"Possible S Star [S*?]",
			"Possible Star of RR Lyr type [RR?]",
			"Possible Star with envelope of CH type [CH?]",
			"Possible Star with envelope of OH/IR type [OH?]",
			"Possible Supercluster of Galaxies [SC?]",
			"Possible Supergiant star [sg?]",
			"Possible Wolf-Rayet Star [WR?]",
			"Possible Yellow supergiant star [s?y]",
			"Possible gravitational lens System [LS?]",
			"Possible gravitational lens [Le?]",
			"Possible gravitationally lensed image [LI?]",
			"Post-AGB Star (proto-PN) [pA*]",
			"Post-AGB Star Candidate [pA?]",
			"Pre-main sequence Star Candidate [pr?]",
			"Pre-main sequence Star [pr*]",
			"Pulsar [Psr]",
			"Pulsating White Dwarf [ZZ*]",
			"Pulsating variable Star [Pu*]",
			"Quasar [QSO]",
			"Radio Galaxy [rG]",
			"Radio-source [Rad]",
			"Red Giant Branch star [RG*]",
			"Red supergiant star [s*r]",
			"Reflection Nebula [RNe]",
			"Region defined in the sky [reg]",
			"Rotationally variable Star [Ro*]",
			"S Star [S*]",
			"Semi-regular pulsating Star [sr*]",
			"Semi-regular variable candidate [sv?]",
			"Seyfert 1 Galaxy [Sy1]",
			"Seyfert 2 Galaxy [Sy2]",
			"Seyfert Galaxy [SyG]",
			"Spectroscopic binary [SB*]",
			"Star forming region [SFR]",
			"Star in Association [*iA]",
			"Star in Cluster [*iC]",
			"Star in Nebula [*iN]",
			"Star in double system [*i*]",
			"Star showing eclipses by its planet [EP*]",
			"Star suspected of Variability [V*?]",
			"Star with envelope of CH type [CH*]",
			"Star [*]",
			"Starburst Galaxy [SBG]",
			"Stellar Stream [St*]",
			"Sub-stellar object [su*]",
			"SuperNova Candidate [SN?]",
			"SuperNova Remnant Candidate [SR?]",
			"SuperNova Remnant [SNR]",
			"SuperNova [SN*]",
			"Supercluster of Galaxies [SCG]",
			"Symbiotic Star Candidate [Sy?]",
			"Symbiotic Star [Sy*]",
			"T Tau star Candidate [TT?]",
			"T Tau-type Star [TT*]",
			"UV-emission source [UV]",
			"Ultra-luminous X-ray candidate [UX?]",
			"Ultra-luminous X-ray source [ULX]",
			"Underdense region of the Universe [vid]",
			"Variable Star of FU Ori type [FU*]",
			"Variable Star of Mira Cet type [Mi*]",
			"Variable Star of Orion Type [Or*]",
			"Variable Star of R CrB type candiate [RC?]",
			"Variable Star of R CrB type [RC*]",
			"Variable Star of RR Lyr type [RR*]",
			"Variable Star of RV Tau type [RV*]",
			"Variable Star of SX Phe type (subdwarf) [SX*]",
			"Variable Star of W Vir type [WV*]",
			"Variable Star of alpha2 CVn type [a2*]",
			"Variable Star of beta Cep type [bC*]",
			"Variable Star of delta Sct type [dS*]",
			"Variable Star of gamma Dor type [gD*]",
			"Variable Star of irregular type [Ir*]",
			"Variable Star with rapid variations [RI*]",
			"Variable Star [V*]",
			"Variable of BY Dra type [BY*]",
			"Variable of RS CVn type [RS*]",
			"Very red source [red]",
			"White Dwarf Candidate [WD?]",
			"White Dwarf [WD*]",
			"Wolf-Rayet Star [WR*]",
			"X-ray Binary [XB*]",
			"X-ray binary Candidate [XB?]",
			"X-ray source [X]",
			"Yellow supergiant star [s*y]",
			"Young Stellar Object Candidate [Y*?]",
			"Young Stellar Object [Y*O]",
			"centimetric Radio-source [cm]",
			"gamma-ray Burst [gB]",
			"gamma-ray source [gam]",
			"metallic Absorption Line system [mAL]",
			"metric Radio-source [mR]",
			"millimetric Radio-source [mm]",
			"radio Burst [rB]",
			"sub-millimetric source [smm]",
			"transient event [ev]"]
		$("#ui-id-1").css("z-index","1000000");
		//$("#SearchType").autocomplete({source:table});
		$("#SearchType").autocomplete({source:table,select:function(a, b){
			$(this).val(b.item.value);
			longname=$("#SearchType").val();
			if(table.indexOf(longname)==-1&&longname!=""){
				MessageBox.alertBox("This type doesn't exist");
				return ;
			}
			var regex = /\[(.+?)\]/g;
			var i = $("#SearchType").val().match(regex);
			if(i!=undefined){
				var j = i[0].substring(1,i[0].length - 1);
				sourcetype = j;
			}
			else
				sourcetype="";
			if(sourcetype=="")
				isFiltered=false;
			else
				isFiltered=true;
			SimbadCatalog.runConstraint();
		}})
		$("#ui-id-1").css("z-index","1000000");
		$("#SearchType").keyup(function(e){
			var key = e.which;
			if(key==13){
				longname=$("#SearchType").val();
				if(table.indexOf(longname)==-1&&longname!=""){
					MessageBox.alertBox("This type doesn't exist");
					return ;
				}
				var regex = /\[(.+?)\]/g;
				var i = $("#SearchType").val().match(regex);
				if(i!=undefined){
					var j = i[0].substring(1,i[0].length - 1);
					sourcetype = j;
				}
				else
					sourcetype="";
				if(sourcetype=="")
					isFiltered=false;
				else
					isFiltered=true;
				runConstraint();
				//resetFilter();
			}
		})
	};
	
	var setCatalog = function(catalog){
		aladinCatalog = catalog
	}
	var runConstraint = function(){
		if( aladinCatalog ) {
			sources = aladinCatalog.getSources();
			displayCatalogFiltered();
	    }
	};
	var filterSource = function(source){
		if(source.data.other_types.indexOf(sourcetype)!=-1 || source.data.main_type == sourcetype || sourcetype==undefined ){
			return true;
		}
		else{
			return false;
		}
	} 
	var displayCatalogFiltered = function(){
		for(var i=0;i<sources.length;i++){
			source = sources[i];
			if(source.data.other_types.indexOf(sourcetype)!=-1 || source.data.main_type == sourcetype ){
				source.show();
			}
			else{
				source.hide();
			}
		}
	}
	
	var getType = function(){
		return sourcetype;
	}
	
	var getisFiltered = function(){
		return isFiltered;
	}
	
	var resetFilter = function(){
		$("#SearchType").val("");
	}
	
	/*
	 * These 2 functions are designed to get the data from http://simbad.u-strasbg.fr/simbad/sim-tap/sync
	 */
	function Query(adql){
	    var site= "http://simbad.u-strasbg.fr/simbad/sim-tap/sync";
	    var reTable;
	    reTable = $.ajax({
	      url: `${site}`,
	      type: "GET",
	      data: {query: `${adql}`, format: 'text', lang: 'ADQL', request :'doQuery'},
	      async:false
	      })
	    .done(function(result){
	        return result;
	    })
	  return reTable;
	}
	var getTable = function(){
		adql = "SELECT  distinct \"public\".otypedef.otype_longname, \"public\".otypedef.otype_shortname FROM \"public\".otypedef order by otype_longname" 
		       var obj = Query(adql);
		       var content = obj.responseText;
		       var list = content.split("|");
		       var result=[];
		       for(var i = 2;i<list.length;i++){
		           var temp = list[i].split("\n");
		           for(var j=0;j<temp.length;j++){
		            result.push(temp[j]);
		           }
		       }
		       var json={};
		       for(var i =0;i<result.length;i++){
		           result[i]=result[i+1]
		       }
		       for(var h=0;h<result.length-2;h=h+2){
		           json[result[h]]=result[h+1];
		       }
		       console.log(json)
	}
	var retour = {
			simbad : simbad,
			setCatalog : setCatalog,
			runConstraint : runConstraint,
			displayCatalogFiltered :displayCatalogFiltered,
			getType : getType,
			resetFilter : resetFilter,
			getisFiltered : getisFiltered,
			getTable : getTable,
			filterSource : filterSource,
			SearchType : SearchType
	};
	return retour;
}();
console.log('=============== >  SimbadCatalog.js ');

//take out from jsStuff
let Alix_CustomDataTable = function () {
	// Used to add custom content
	var custom = 0;
	var custom_array = [];

	/**
	 * Create a dataTable
	 * @param options are the parameters of the dataTable like:
	 * options = {
	 				"aoColumns" : columns,
	 				"aaData" : rows,
	 				"bPaginate" : true,
	 				"bSort" : true,
	 				"bFilter" : true
	 			  };
	 * @param position tells what components to add with the table and their position
	 * 6 positions available: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
	 * 5 basic components available: filter, length, pagination, information, processing
	 * var position = [
 			{ "name": "pagination",
 			  "pos": "top-left"
 			},
 			{ "name": "length",
 	 			  "pos": "top-center"
 	 		},
 			{ "name": "<p>DataTable</p>",
 			  "pos" : "top-center"
 			},
 			{ "name": 'filter',
 	 			  "pos" : "bottom-center"
 	 		},
 			{ "name": "information",
 	 	 		  "pos" : "bottom-right"
 	 	 	}
 	 	];
	 **/
	var create = function(id, options, position) {
		// Remove filter label and next previous label
		if (options["sPaginationType"] != undefined) {
			if (options["sPaginationType"] === "full_numbers") {
				options = addSimpleParameter(options, "oLanguage", {"sSearch": ""});
			}
		}
		else {
			options = addSimpleParameter(options, "oLanguage", {"sSearch": "", "oPaginate": { "sNext": "", "sPrevious": "" }});
		}

		// Positioning the elements
		if (position != undefined) {
			options = addSimpleParameter(options, "sDom", changePosition(position));
		}				
		var table = $('#' + id).dataTable(options);

		// Adding the custom content
		if (position != undefined) {
			custom_array.forEach(function(element) {
				$("div.custom"+element.pos).html(element.content);
			});
			Alix_ModalResult.changeFilter(id);
		}		
		$('#' + id + "_wrapper").css("overflow","inherit");
		return table;
	};

	/**
	 * Add a parameter to the @options of the dataTable
	 * @options: object, options of the dataTable
	 * @parameter: name of the parameter
	 * @value: value of the parameter
	 **/
	var addSimpleParameter = function(options, parameter, value) {
		options[parameter] = value;		
		return options;
	}

	/**
	 * Create the dom according to the components and positions asked
	 * @position: object, indicate the position of the different elements
	 **/
	var changePosition = function(position) {
		var dom = '';	
		var top_left = [];
		var top_center = [];
		var top_right = [];
		var bot_left = [];
		var bot_center = [];
		var bot_right = [];

		position.forEach(function(element) {
			switch (element.pos) {
			case "top-left":
				top_left.push(getDomName(element.name));
				break;
			case "top-center":
				top_center.push(getDomName(element.name));
				break;
			case "top-right":
				top_right.push(getDomName(element.name));
				break;
			case "bottom-left":
				bot_left.push(getDomName(element.name));
				break;
			case "bottom-center":
				bot_center.push(getDomName(element.name));
				break;
			case "bottom-right":
				bot_right.push(getDomName(element.name));
				break;
			}
		});	

		// Search the number of position asked for which row to know the size of the div columns
		var nb_top = 0;
		if (top_left.length > 0) {
			nb_top++;
		}
		if (top_center.length > 0) {
			nb_top++;
		}
		if (top_right.length > 0) {
			nb_top++;
		}
		nb_top = Math.floor(12/nb_top);

		var nb_bot = 0;
		if (bot_left.length > 0) {
			nb_bot++;
		}
		if (bot_center.length > 0) {
			nb_bot++;
		}
		if (bot_right.length > 0) {
			nb_bot++;
		}
		nb_bot = Math.floor(12/nb_bot);

		if (nb_top > 0) {
			dom += '<"row"'
		}

		if (top_left.length > 0) {
			dom += '<"txt-left col-xs-'+nb_top+'"';
			top_left.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}
		if (top_center.length > 0) {
			dom += '<"txt-center col-xs-'+nb_top+'"';
			top_center.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}
		if (top_right.length > 0) {
			dom += '<"txt-right col-xs-'+nb_top+'"';
			top_right.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}

		if (nb_top > 0) {
			dom += ">";
		}

		dom += '<"custom-dt" rt>'

			if (nb_bot > 0) {
				dom += '<"row"';
			}	

		if (bot_left.length > 0) {
			dom += '<"txt-left col-xs-'+nb_bot+'"';
			bot_left.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}
		if (bot_center.length > 0) {
			dom += '<"txt-center col-xs-'+nb_bot+'"';
			bot_center.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}
		if (bot_right.length > 0) {
			dom += '<"txt-right col-xs-'+nb_bot+'"';
			bot_right.forEach(function(element) {
				dom += '<"side-div"'+element+'>';
			});
			dom += ">";
		}

		if (nb_bot > 0) {
			dom += ">";
		}

		return dom;
	}

	/**
	 * Return the real dom name of the basic components and create div for the custom ones
	 * @name: explicit name of a basic component or name of a custom one
	 **/
	var getDomName = function(name) {
		var dom_name;

		switch (name) {
		case "filter":
			dom_name = "f";
			break;
		case "pagination":
			dom_name = "p";
			break;
		case "information":
			dom_name = "i";
			break;
		case "length":
			dom_name = "l";
			break;
		case "processing":
			dom_name = "r";
			break;
		default:
			// If it's not a basic component, create a div with a unique class
			dom_name = '<"custom'+custom+'">';
		// Push the element in an array in order to add it later thanks to its unique class
		custom_array.push({"content": name, "pos": custom});
		custom++;
		break;
		}

		return dom_name;
	}

	var pblc = {};
	pblc.create = create;

	return pblc;
}();
console.log('=============== >  Alix_CustomDataTable.js ');

//take out from jsStuff

let Alix_ModalResult = function() {
	/**
	 * These next functions are used to build a result panel
	 * The main @param "content" of these function is an object with this structure:
	 * {
	 *    header: {
	 *      histo: {
	 *        prev: handler,
	 *        next: handler
	 *      },
	 *      title: {
	 *        label: "Title"
	 *      },
	 *      icon: {
	 *        classIcon: "class",
	 *        handler: handler
	 *      }
	 *    },
	 *    chapters: [
	 *    {
	 *       id: "Observation",
	 *       label: "Observation - Unique Detection Parameters",
	 *       url: 'url',
	 *       searchable: true,
	 *       params: {
	 *         oid: "1"
	 *       }
	 *    },
	 *    ... as many as you need
	 *    ]
	 * }
	 * url can be replaced by "data" contening aaColumns and aaData for the datatable
	 *  
	 **/

	// The class of the result panel
	var resultClass = "modalresult";
	var resultSelect = '.' + resultClass;

	// Creation of the history array
	// Will be an array of objects with this structure : {place: .., id: .., content: ..}
	var histo = new Array();

	// Current element in the history the user is in
	var current_histo = {};

	// Number of elements, used to define a place for each element in the history 
	var nb = 0;

	/**
	 * Return the content which has to be displayed in the h2 of the panel: the title and the icon if necessary
	 **/
	var getTitle = function(content) {
		var title='';

		if (content.title != undefined) {
			if (content.icon != undefined) {
				title += '<div class="col-xs-11">'+content.title.label+'</div><div class="col-xs-1"><a onclick="'+content.icon.handler+'" class='+content.icon.classIcon+'></a></div>';
			}
			else {
				title += '<div class="col-xs-12">'+content.title.label+'</div>';
			}
		} else {
			if (content.icon != undefined) {
				title += '<div class="col-xs-11">Details</div><div class="col-xs-1"><a onclick="'+content.icon.handler+'" class='+content.icon.classIcon+'></a></div>';
			}
			else {
				title += '<div class="col-xs-12">Details</div>';
			}
		}

		return title;
	};

	/**
	 * Set the pagination in the title of the panel
	 * @id: if of the panel 
	 **/
	var addHistoTitle = function(id) {
		$("#"+id).prev("div").find("span.ui-dialog-title").prepend('<a id="qhistoleft" href="javascript:void(0);" onclick="Alix_ModalResult.prevHisto()" class=greyhistoleft></a>'
				+ '<span class="nbpages"></span>'
				+ '<a id="qhistoright" href="javascript:void(0);" onclick="Alix_ModalResult.nextHisto()" class=greyhistoright></a>');
	};

	/**
	 * Set the differents chapters of the panel
	 * @selector: jQuery element, element where we want to add chapters
	 * @content: object, contains the chapters
	 **/
	var getChapters = function(selector, content) {
		for (i = 0; i < content.chapters.length; i++) {
			$(selector).append('<p class="chapter" id="'+content.chapters[i].id+'"><img src=\"images/tright.png\">'
					+content.chapters[i].label+'</p>'
					+'<div class="detaildata"></div>');

			var temp = content.chapters[i];

			$("#"+content.chapters[i].id).click({content_click: temp}, function(e){
				openChapterPanel(e.data.content_click);
			});

		}
	};

	/**
	 * Change the directions of chapter arrows
	 **/
	function switchArrow(id) {
		var image = $('#'+id+'').find('img').attr('src');
		if (image == 'images/tdown.png') {
			$('#'+id+'').find('img').attr('src', 'images/tright.png');
		} else if (image == 'images/tright.png') {
			$('#'+id+'').find('img').attr('src', 'images/tdown.png');
		}
	}

	/**
	 * Make the datatable of that panel visible. If there is no datatable, the url is invoked
	 * and the datatable is created 
	 * @param chapter   : Id of H4 banner of the table
	 * @param url       : service providing the JSON data fedding the datatable
	 * @param OID       : saada oid of the considered record
	 * @param searchable: set a search field if true 
	 */
	var openChapterPanel = function(chapter) {
		var div = $('#' + chapter.id).next('.detaildata');
		if( div.length == 0 ){
			Alix_Out.info("Can't open chapter " + chapter);
			return;
		}
		if (div.html().length > 0) {
			div.slideToggle(500);
			switchArrow(chapter.id);
		} else if(chapter.url != null ){
			Alix_Processing.show("Fetching data");
			$.getJSON(chapter.url, chapter.params , function(data) {
				Alix_Processing.hide();
				if( Alix_Processing.jsonError(data, chapter.url) ) {
					return;
				} else {
					showDataArray(chapter.id, data, chapter.searchable);
					switchArrow(chapter.id);
					Alix_Modalinfo.center();
				}
			});
		} else if (chapter.data != undefined && chapter.data != null) {
			showDataArray(chapter.id, chapter.data, chapter.searchable);	
			switchArrow(chapter.id);
			Alix_ModalResult.center();
		}
	};

	/**
	 *  Build a data table from the Josn data
	 *  @param divid     : Id of H4 banner of the table
	 *  @param jsdata    : JSON data readable for the datatable
	 *  @param withFilter: set a search field if true 
	 */
	var showDataArray = function(divid, jsdata, withFilter) {
		if ( jsdata.length != undefined ){
			var div = ($('#' + divid).next('.detaildata'));
			var dom = (withFilter)?'<"top"f>rt' : 'rt';
			for (var i=0; i<jsdata.length; i++){
				var id = "detail" + i + divid + "table";
				div.append("<table id="
						+ id
						+ "  width=100% cellpadding=\"0\" cellspacing=\"0\" border=\"0\"  class=\"display\"></table>");

				var options = {
						"aoColumns" : jsdata[i].aoColumns,
						"aaData" : jsdata[i].aaData,
						"sDom" : dom,
						"bPaginate" : false,
						"aaSorting" : [],
						"bSort" : false,
						"bFilter" : withFilter
				};

				var positions = [
				                 { "name": "filter",
				                	 "pos": "top-left"
				                 }];

				Alix_CustomDataTable.create(id, options, positions);
				if( jsdata[i].label != undefined ){
					($('#' + divid).next('.detaildata')).append(jsdata[i].label);
				}

			}

			div.slideToggle(0);
		}

		else {
			var id = "detail" + divid + "table";
			var div = $('#' + divid).next('.detaildata');
			var dom = (withFilter)?'<"top"f>rt' : 'rt';
			div.html("<table id="
					+ id
					+ "  width=100% cellpadding=\"0\" cellspacing=\"0\" border=\"0\"  class=\"display\"></table>");

			var options = {
					"aoColumns" : jsdata.aoColumns,
					"aaData" : jsdata.aaData,
					"sDom" : dom,
					"bPaginate" : false,
					"aaSorting" : [],
					"bSort" : false,
					"bFilter" : withFilter
			};

			var positions = [
			                 { "name": "filter",
			                	 "pos": "top-left"
			                 }];

			Alix_CustomDataTable.create(id, options, positions);
			if( jsdata.label != undefined ){
				($('#' + divid).next('.detaildata')).append(jsdata.label);
			}
			div.slideToggle(0);
		};
	};

	/**
	 * Change the style of filter input
	 * @id: id of the chapter
	 **/
	var changeFilter = function(id) {
		var label_filter = $('input[aria-controls="'+id+'"]').parent("label");
		label_filter.each(function(){
			$(this).prepend('<div class="form-group no-mg-btm">');
			$(this).find(".form-group").append('<div class="input-group">');
			$(this).find(".input-group").append('<div class="input-group-addon input-sm"><span class="glyphicon glyphicon-search"></span></div>');
			$(this).find("input").appendTo($(this).find(".input-group"));		
			$(this).find("input").addClass("form-control filter-result input-sm");
			$(this).find("input").attr("placeholder", "Search");
		});	
	};

	/**
	 * Add the content of a result panel in the history
	 **/
	var addToHisto = function(content, oid) {
		var isIn = false;
		var current;

		if (histo.length == 0) {
			histo.push({place: nb, id: oid, content: content});
			current_histo = {place: nb, id: oid, content: content};
			nb++;
		}
		else if (histo[histo.length - 1].id != oid) {
			histo.push({place: nb, id: oid, content: content});
			current_histo = {place: nb, id: oid, content: content};
			nb++;
		}
	};

	/**
	 * Display the previous content in the history
	 * If no previous content, display the last
	 **/
	var prevHisto = function() {
		if( current_histo.place <= 0 ) {
			current_histo = histo[histo.length - 1];
			resultPanel(current_histo.content, null, "white");
		} else {
			var prev = current_histo.place - 1;
			current_histo = histo[prev];
			resultPanel(current_histo.content, null, "white");
		}
		majHisto();
		return;
	};

	/**
	 * Display the next content in the history
	 * If no next content, display the first
	 **/
	var nextHisto = function() {
		if( current_histo.place >= (histo.length - 1) ) {
			current_histo = histo[0];
			resultPanel(current_histo.content, null, "white");
		}
		else {
			var next = current_histo.place + 1;
			current_histo = histo[next];
			resultPanel(current_histo.content, null, "white");
		}
		majHisto();
		return;
	};

	/**
	 * Display the position in the histo / size of histo
	 */
	var majHisto = function() {
		var true_index = current_histo.place + 1;
		var pages = true_index+"/"+histo.length;
		$("#qhistoleft").next("span").html(pages);
	}


	/**
	 * Build the result panel
	 * @content: object, containing the infos to build a result panel
	 * @closHandler: action to do when result panel is closed 
	 * @bgcolor: background-color of the result panel
	 * @add: boolean, tells if this result panel is open for the first time
	 * @param add is false if the function is called by the history's functions
	 **/
	var resultPanel = function (content, closeHandler, bgcolor, add) {
		// If the result panel already exists, only change its content
		if($(resultSelect).length != 0){
			$(resultSelect).html('');

			if( bgcolor != null ) {
				$("#"+id_modal).css("background-color", bgcolor);
			}

			// Set the handler wanted to be exectued when the panel is closed
			var chdl = ( closeHandler == null )? function(ev, ui)  {$(resultSelect).html("");}: closeHandler;		
			$(resultSelect).on( "dialogclose", function (event, ui) {            
				if (event.originalEvent) {
					chdl();
				}
			});
			$('div[pos="'+$(resultSelect).attr("id")+'"]').on("click", chdl);

			// Set the content of the h2 of the panel
			$(resultSelect).append('<h4><div id="detailhisto" class="row">'+getTitle(content.header)+'</div></h4>');
			getChapters(resultSelect, content);

			if (add) {
				addToHisto(content, content.chapters[0].params.oid);
			};

			if (content.header.histo != undefined) {
				addHistoTitle(id_modal, content.header.histo.prev, content.header.histo.next);
				majHisto();
			}

			content.chapters.forEach(function(chap) {
				changeFilter(chap.id);
			});


			jQuery(".detaildata").each(function(i) {$(this).hide();});
		}
		// If it doesn't exist, building of a new result panel
		else {
			var id_modal = Alix_Modalinfo.nextId();
			$(document.documentElement).append('<div id="'+id_modal+'" class="'+resultClass+'" style="display: none; width: auto; hight: auto;"></div>');

			var chdl = ( closeHandler == null )? function(ev, ui)  {$("#"+id_modal).html("");}: closeHandler;
			if( bgcolor != null ) {
				$("#"+id_modal).css("background-color", bgcolor);
			}

			$("#"+id_modal).append('<h4><div id="detailhisto" class="row">'+getTitle(content.header)+'</div></h4>');
			getChapters("#"+id_modal, content);

			$("#"+id_modal).dialog({ width: 'auto'
				, dialogClass: 'd-maxsize'
					, resizable: false
					, closeOnEscape: true
					, close: function (event, ui) {            
						if (event.originalEvent) {
							chdl();
							Alix_Modalinfo.close(Alix_Modalinfo.findLastModal());
						}
					}
			, width: 'auto' // overcomes width:'auto' and maxWidth bug
				, maxWidth: 1000
				, fluid: true
				, open: function(event, ui){
					// Put the content in the history
					addToHisto(content, content.chapters[0].params.oid);
					Alix_Modalinfo.fluidDialog();
				}});

			jQuery(".detaildata").each(function(i) {$(this).hide();});
			if (content.header.histo != undefined) {
				addHistoTitle(id_modal, content.header.histo.prev, content.header.histo.next);
				majHisto();
			}

			content.chapters.forEach(function(chap) {
				changeFilter(chap.id);
			});


			// Adjust the size of the panel to be responsive
			if ($("#"+id_modal).find("h4").find("#detailhisto").length) {
				if ($(window).width() >= 1000) {
					$("#"+id_modal).dialog( "option", "width", 1000 );
					center();
				}
				else {
					Alix_Modalinfo.fluidDialog();
				}
			}

			// Set the handler wanted to be executed when the panel is closed
			$('div[pos="'+$(resultSelect).attr("id")+'"]').on("click", chdl);

			Alix_Modalinfo.setShadow(id_modal);
			Alix_Modalinfo.whenClosed(id_modal);
		}
	};

	var getHtml = function() {
		return $(resultSelect).html();
	};

	/**
	 * Puts the resultpanel in the center of the window
	 **/
	var center = function() {
		var parent = $(resultSelect).parent();
		parent.css("position","absolute");
		parent.css("top", Math.max(0, (($(window).height() - parent.outerHeight()) / 3) + 
				$(window).scrollTop()) + "px");
		parent.css("left", Math.max(0, (($(window).width() - parent.outerWidth()) / 2) + 
				$(window).scrollLeft()) + "px");
	};

	var pblc = {};
	pblc.prevHisto = prevHisto;
	pblc.nextHisto = nextHisto;
	pblc.changeFilter = changeFilter;
	pblc.resultPanel = resultPanel;
	pblc.getHtml = getHtml;
	pblc.center = center;
	pblc.openChapterPanel = openChapterPanel;

	return pblc;
}();
console.log('=============== >  Alix_ModalResult.js ');

