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