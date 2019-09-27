
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
* Loads automatically all css scripts used by saadahsbasics
 * Files are loaded one by one keeping that wy the initial order.
 * That make sure not to  break dependencies or style rules overriding
 * 
 * This class is a JS singleton.
 */

var resourceLoader = function() {
	if( productionMode ) return;
	/*
	 * JS directories and files
	 */
	var baseScriptDir = "";
	var jsimportsDir  = baseScriptDir + "";
	var javascriptDir = baseScriptDir + "javascript/";
	//var importsJstuffDir = "http://obs-stage-c11:8080/jsresources/saadajsbasics/javascript/";
	var local_js = [ 
		 "Segment.js"
	   	 ,"AstroCoo.js"
	   	 ,"LibraryMap.js"
	   	 ,"LibraryCatalog.js"
	   	 ,"MasterResource.js"
	   	 ,"AladinLiteView.js"
	   	 ,"AladinLite_v.js"
	   	 ,"AladinLite_c.js"
	   	 ,"Historique_m.js"
	   	 ,"Historique_v.js"	
	   	 ,"RegionEditor_v.js"
	   	 ,"RegionEditor_m.js"
	   	 ,"RegionEditor_c.js"
	   	 ,"HipsSelector_m.js"
	   	 ,"HipsSelector_v.js" 
	   	 ,"SwarmDynamicFilter.js"
	   	 ,"ConfigureALiX.js"
	   	 ,"ConfigureALiX.js"
	   	 ,"VizierCatalog.js"
	                ];
	var local_min_js = [];
	var imp_js = [ 
		 "aladinLite/aladin.js"
		 ,"jsimports/spectrum.js"
	     ,"javascript/AladinUpdate.js"//we load these 2 js files in imp_js to make sure they're the last ones to be loaded 
	   //  ,"javascript/configuration.js"//alixindex.js is for intializing the alix
	                 ];
	var imp_jsStuff_js = [
        ];
	var js = new Array();  // global list of JS to load

	/*
	 * CSS directories and files
	 */
	var baseCssDir      = "";
	var styleDir        = baseCssDir + "";
	var styleimportsDir = baseCssDir + "";
	//var styleimportJsstuffDir = "http://obs-stage-c11:8080/jsresources/saadajsbasics/styles/"
	var baseUrl = "";	
	var local_css  = [    
		"aladinLite/aladin.css"
		 ,"styles/aladinliteX.css" //!!!bug aladinliteX.css should be loaded after aladin.css. Otherwise the hips_panel won't show in the right place.
		// ,"jsimports/jquery-ui-1.12.1/jquery-ui.min.css" 
	                  ];
	var import_css = [
		"styles/packedCSS/style_bundle.css"
		/*    "bootstrap-3.3.7/bootstrap.min.css" 
		   ,"menuDemo/font-awesome.min.css"
		   ,"menuDemo/gooey.min.css"
		   ,"menuDemo/livedemo.css"	  
		   ,"datatable.css" 
		   ,"globalmodule.css"
	       ,"jquery.ui.theme.css"
	      	,"jquery.ui.dialog.css"*/
	                  ];
	var imp_jsStuff_css = [
        ];

	var css = new Array();// global list of CSS to load
	var CssOver = false; // true when all CSS are loaded (can start JS loading)

	
	/**
	 * Check if the JS/CSS resources are available on a dev server
	 * Takes the production one otherwise
	 */
	var lookForDevServer = function() {
		/*
		 * Check if saadajsbasics resources are installed locally
		 */
		baseUrl = "";
		$.ajax({
			url: baseUrl + 'javascript/loader.js',
			async: false, 
			dataType: "text",
			error: function(data) {
				baseUrl = "";
				console.log("Try " + baseUrl + " as jsresource base URL");
				$.ajax({
					url: baseUrl + 'javascript/loader.js',
					async: false, 
					dataType: "text",
					error: function(data) {
						lookForServer();						
					} ,
					success: function() {
						console.log("Take " + baseUrl + " as jsresource base URL");
					}                  
				});
			}   ,
			success: function() {
				console.log("Take ./ as jsresource base URL");
			}
		});
		console.log("jsresources will be taken from " + baseUrl);
	};

	/**
	 * Check if the JS/CSS resources are available on a production server
	 */
	var lookForServer = function() {
		/*
		 * Check if saadajsbasics resources are installed locally
		 */
		baseUrl = "";
		console.log("Try " + baseUrl + " as jsresource base URL");					
		$.ajax({
			url: 'javascript/loader.js',
			async: false, 
			dataType: "text",
			error: function(data) {					
				baseUrl = "http://saada.unistra.fr/jsresources/";
				console.log("Try " + baseUrl + " as jsresource base URL");
			},
			success: function() {
				console.log("Take " + baseUrl + " as jsresource base URL");
			}   
		});						
		console.log("jsresources will be taken from " + baseUrl);
	};
	/*
	 * Look at the best node serving the JS/CSS resources
	 */
	if( useDebugResources ) {
		lookForDevServer();
	} else {
		lookForServer();
	}
	/**
	 * Recursive function loading the first script of the list
	 */
	var loadNextScript = function() {
		var script = document.createElement("script");
		var head = document.getElementsByTagName('HEAD').item(0);
		script.onload = script.onreadystatechange = function() {
			console.log(js[0] + " script loaded " + CssOver);
			js.shift();
			if( js.length > 0 ) 
				loadNextScript() 
			else 
				//initial();
				;
		};
		script.src = js[0];
		script.type = "text/javascript";
		head.appendChild( script);
	};
	/**
	 * Recursive function loading the first CSS of the list
	 */
	var loadNextCss = function() {
		var  href = css[0];
		$.ajax({
			url: href,
			dataType: 'text',
			success: function(){        
				$('<link rel="stylesheet" type="text/css" href="'+href+'" />').appendTo("head");
				console.log(href + " CSS loaded " + !CssOver);
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
	 * Usng jquery make the log traces pointing on jsquery code instaed on my js code
	 */
	var loadNextScriptxxx = function() {
		console.log(this.baseUrl);
		$.ajax({
			url: js[0], 
			async: false, 
			dataType: "script",
			success: function(data) {
				console.log(baseUrl + js[0] + " loaded" );
				js.shift();
				if( js.length > 0 ) loadNextScript();
			} ,                
			error: function(data) {
				console.log("Cannot load " + js[0] );
				alert("Cannot load " +  js[0]);
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
		//	console.log("----------- " + that.baseUrl + " " + baseScriptDir);
		for( var i=0 ; i<local_js.length ; i++ ) {
			var jsf =  baseUrl + javascriptDir + local_js[i];
			if( ! jsf.match(/.*\.js/)  ){
				js.push(jsf + "_m.js");
				js.push(jsf + "_v.js");
				js.push(jsf + "_c.js");
			} else {
				
				js.push(jsf);

			};
		}
		for( var i=0 ; i<imp_js.length ; i++ ) {
			js.push(baseUrl + jsimportsDir + imp_js[i]);
		}
		for( var i=0 ; i<imp_jsStuff_js.length ; i++ ) {
			var jsf = importsJstuffDir + imp_jsStuff_js[i];
			if( ! jsf.match(/.*\.js/)  ){
				js.push(jsf + "_m.js");
				js.push(jsf + "_v.js");
				js.push(jsf + "_c.js");
			} else {
				
				js.push(jsf);

			};
		}
		js.push.apply(js, externalscripts);
	};
	/**
	 * Stores the list of user JS scripts to load
	 * and build the global list (with the local short list) of resource to load
	 */
	var setMinScripts = function(externalscripts) {
		for( var i=0 ; i<local_min_js.length ; i++ ) {
			var jsf =  baseUrl + baseScriptDir + local_min_js[i];
			if( ! jsf.match(/.*\.js/)  ){
				js.push(jsf + "_m.js");
				js.push(jsf + "_v.js");
				js.push(jsf + "_c.js");
			} else {
				console.log(jsf);
				js.push(jsf);

			}
		}
		for( var i=0 ; i<imp_js.length ; i++ ) {
			js.push(baseUrl + imp_js[i]);
		}
		js.push.apply(js, externalscripts);
		loadNextScript();
	};
	/**
	 * Stores the list of client CSS files to load
	 * and build the global list of resource to load
	 */
	var setCss = function(externalcss) {
		for( var i=0 ; i<import_css.length ; i++ ) {
			css.push(baseUrl + styleimportsDir+ import_css[i]);
		}
		for( var i=0 ; i<local_css.length ; i++ ) {
			css.push(baseUrl  + styleDir + local_css[i]);
		}
		for( var i=0 ; i<imp_jsStuff_css.length ; i++ ) {
			js.push(styleimportJsstuffDir + imp_jsStuff_css[i]);
		}
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
	jss.setMinScripts = setMinScripts;
	jss.setCss = setCss;
	
	return jss;
}();