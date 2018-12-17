/***********************************************************************************************
 * Javascript classes common to all Web application supported by LM
 * These classes do not refer to any application-specific resource
 * 
 * Content:
 * - String utilities (not a class but extensions of the String class )
 * - Printer   : printout any div
 * - Modalinfo : open any kind of dialog boxes
 * - Processing: Progress bar open while Ajax calls
 * - Out       : Print message in the console with or without stack trace
 * - Location  : to be called to process data downloading
 * 
 * Required external resources 
 * - jquery-ui
 * - jquery.alerts
 * - jquery.datatables
 * - jquery.simplemodal
 * - jquery.prints
 * 
 * Laurent Michel 20/12/2012
 */

/**
 * A dummy function handling the Web access log
 * This function must be override in public applications
 */
RecordAction = function(action){

}
/**
 * Adding some useful String methods
 */
if(!String.prototype.startsWith){
	String.prototype.startsWith = function (str) {
		return !this.indexOf(str);
	};
};
if(!String.prototype.endsWith){
	String.prototype.endsWith = function(suffix) {
		return (this.indexOf(suffix, this.length - suffix.length) !== -1);
	};
};

if(!String.prototype.hashCode){
	String.prototype.hashCode = function(){
		var hash = 0;
		if (this.length == 0) return code;
		for (var i= 0; i < this.length; i++) {
			charac = this.charCodeAt(i);
			hash = 31*hash+charac;
			hash = hash & hash; 
		}
		return hash;
	};
};
if(!String.prototype.trim){
	String.prototype.trim = function(){
	} ;
};

//Gets an url parameter by name
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

function isNumber(val) {
	var exp = new RegExp("^[+-]?[0-9]*[.]?[0-9]*([eE][+-]?[0-9]+)?$","m"); 
	return exp.test(val);
}

var decimaleRegexp = new RegExp("^[+-]?[0-9]*[.][0-9]*([eE][+-]?[0-9]+)?$","m");
var bibcodeRegexp  = new RegExp(/^[12][089]\d{2}[A-Za-z][A-Za-z0-9&][A-Za-z0-9&.]{2}[A-Za-z0-9.][0-9.][0-9.BCRU][0-9.]{2}[A-Za-z0-9.][0-9.]{4}[A-Z:.]$/);

/**
 * return the last node of file pathname
 */
if(!String.prototype.xtractFilename){
	String.prototype.xtractFilename = function(){
		var re = new RegExp(/(\w:)?([\/\\].*)*([\/\\](.*))/);
		var m = this.match(re);
		if( m == null ) {
			return {path: "", filename: this};
		}
		else {
			return {path: m[1], filename: m[m.length-1]};
		}
	} ;
}

/**
 * Quotes the element of a data treepath which cannot be understood by SQL
 * e.g. 
 * test:
 * 
  alert(
	    'vizls.II/306/sdss8'.quotedTableName() + '\n' +
	    'vizls.II/306/sdss8.OBS'.quotedTableName() + '\n' +
	    'viz2.J/other/KFNT/15.483/jovsat'.quotedTableName() + '\n' +
	    'viz2.J/other/KFNT/15.483/jovsat.OBS'.quotedTableName()+ '\n' +
	    'viz2."J/other/KFNT/15.483/jovsat.OBS"'.quotedTableName()+ '\n' +
	    '"viz2"."J/other/KFNT/15.483/jovsat.OBS"'.quotedTableName()+ '\n' +
	    'J/other/KFNT/15.483/jovsat.OBS'.quotedTableName()+ '\n' +
	    'ivoa.obcore.s_ra'.quotedTableName()

);
 * Return an object {qualifiedName, tableName}
 */

if (!String.prototype.quotedTableName) {
	String.prototype.quotedTableName = function () {
		/*
		 * Node without schema (astrogrid) may have en empty schema name 
		 */
		var thisValue;
		if( this.startsWith(".") ) {
			thisValue = this.substring(1);
		} else {
			thisValue = this;
		}
		/*
		 * already quoted, nothing to do
		 */
		if( thisValue.indexOf("\"") >= 0  ){
			return {qualifiedName: thisValue, tableName: thisValue};
		}
		var results = thisValue.split(".");
		var tbl = new Array();
		/*
		 * One element: take it as as whole
		 */
		if( results.length == 1 ) {
			tbl.push(thisValue);
		} 
		/*
		 * a.b could be either schema.table or just a table name including a dot.
		 */
		else if( results.length == 2 ) {
			/*
			 * If the dot is followed by number, it cannot be a separator since a table name cannot start with number
			 */
			if (results[1].match(/^[0-9].*/)) {
				tbl.push(thisValue);
			}
			/*
			 * Otherwise there is no way to determine the matter, but we can suppose that we are dealing with Vizier
			 * So, if both path elements contain a / we are having to do with a simple table name
			 */
			else if( !results[0].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
				tbl.push(thisValue);
			} else {
				tbl.push(results[0]);
				tbl.push(results[1]);				
			}
			/*
			 * In this case, we have to know if the first element is a schema or the first part of a table name
			 * We suppose that schemas have regular names 
			 */
		} else if (results.length > 2 ) {
			/*
			 * Gamble on a schema name 
			 */
			if(results[0].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
				tbl.push(results[0]);
				tbl.push(results[1]);
				var last = results[results.length -1];
				/*
				 * The last one is certainly a field name
				 */
				if( last.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
					for (var i = 2; i < (results.length -1); i++) {
						tbl[tbl.length - 1] += "." +results[i];
					}	
					tbl.push(last);
				} else {
					for (var i = 2; i < results.length; i++) {
						tbl[tbl.length - 1] += "." +results[i];
					}
				}
			} else {
				tbl.push(thisValue);
			}
		}  
		for (var j = 0; j < tbl.length; j++) {
			if (!tbl[j].match(/^[a-zA-Z0-9][a-zA-Z0-9_]*$/)) {
				tbl[j] = '"' + tbl[j] + '"';
			}
		}		
		return {qualifiedName: tbl.join("."), tableName: tbl[tbl.length - 1]};
	};
}
/**
 * Quotes the element of a data treepath which cannot be understood by SQL
 * e.g. No longer used
 * test:
 * 
   alert(
	    JSON.stringify('vizls.II/306/sdss8'.getTreepath()) + '\n' +
	    JSON.stringify('vizls.II/306/sdss8.OBS'.getTreepath()) + '\n' +
	    JSON.stringify('viz2.J/other/KFNT/15.483/jovsat'.getTreepath()) + '\n' +
	    JSON.stringify('viz2.J/other/KFNT/15.483/jovsat.OBS'.getTreepath())+ '\n' +
	    JSON.stringify('viz2."J/other/KFNT/15.483/jovsat.OBS"'.getTreepath())+ '\n' +
	    JSON.stringify('"viz2"."J/other/KFNT/15.483/jovsat.OBS"'.getTreepath())+ '\n' +
	    JSON.stringify( 'J/other/KFNT/15.483/jovsat.OBS'.getTreepath())+ '\n' +
	    JSON.stringify('ivoa.obcore.s_ra'.getTreepath())
        );
);
 */
if (!String.prototype.getTreepath) {
	String.prototype.getTreepath = function () {
		var retour = {
				schema: ''
					, tableorg: this.valueOf()
					, table: ''};
		var results = this.split(".");
		var tbl = new Array();
		/*
		 * One element: assumed to a table
		 */
		if( results.length == 1 ) {
			retour.table = this.valueOf();			
		}

		/*
		 * a.b could be either schema.table or just a table name including a dot.
		 */
		else if( results.length == 2 ) {
			/*
			 * If the dot is followed by number, it cannot be a separator since a table name cannot start with number
			 */
			if (results[1].match(/^[0-9].*/)) {
				retour.table = this.valueOf();
			}
			/*
			 * Otherwise there is no way to determine the matter, but we can suppose that we are dealing with Vizier
			 * So, if both path elements contain a / we are having to do with a simple table name
			 */
			else if( !results[0].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
				retour.table = this.valueOf();
			} else {
				retour.schema = results[0];
				retour.table = results[1];
			}
			/*
			 * In this case, we have to know if the first element is a schema or the first part of a table name
			 * We suppose that schemas have regular names 
			 */
		} else if (results.length > 2 ) {
			/*
			 * Gamble on a schema name 
			 */
			if(results[0].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
				retour.schema = results[0];
				retour.table = results[1];
				var last = results[results.length -1];
				/*
				 * The last one is certainly a field name
				 */
				if( last.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ) {
					for (var i = 2; i < (results.length -1); i++) {
						retour.table += "." +results[i];
					}	
				} else {
					for (var i = 2; i < results.length; i++) {
						retour.table += "." +results[i];
					}
				}
			} else {
				retour.table = this.valueOf();
			}
		}
		return retour;
	};
}

/**
 * Basic sky geometry functions
 */
SkyGeometry = function() {
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

/*****************************************************
 * Some global variables
 */

var rootUrl = "http://" + window.location.hostname +  (location.port?":"+location.port:"") + window.location.pathname;

/*
 * make sure that Modalinfo are on top of modals
 * and that Processing widows are on top of Modalinfo
 */
var zIndexModalinfo = 3000;
var zIndexProcessing = 4000;

/*
 * Types supported by the previewer based on iframes
 */
var previewTypes = ['text', 'ascii', 'html', 'gif', 'png', 'jpeg', 'jpg', 'pdf'];
var imageTypes = ['gif', 'png', 'jpeg', 'jpg'];

/**
 * @returns {___anonymous_Modalinfo}
 */
Modalinfo = 
	function(){
	var divId = "modaldiv";
	var divSelect = '#' + divId;
	/**
	 * Resources used by 
	 */
	var aladin = null;
	var divAladinContainer = "aladin-lite-container";
	var divAladin = "aladin-lite-catdiv";
	var divInfoAladin = "aladin-lite-catdiv-info";

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
		var z_modal = $("#"+id).parent(".ui-dialog").zIndex();
		if($("#shadow").length == 0) {
			$('body').append('<div id="shadow" pos="'+id+'"></div>');
			$('#shadow').zIndex(z_modal-1);
		}
		else {
			$('body').append('<div class="shadow" pos="'+id+'"></div>');
			$('div[pos="'+id+'"]').zIndex(z_modal-1);
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
		Out.infoTrace(content);
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
				if( Processing.jsonError(e, "Upload Position List Failure") ) {
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
					Modalinfo.close(id_modal);
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
			PageLocation.changeLocation(url);
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
				PageLocation.changeLocation(url);
			});
			setShadow(id_modal);
			whenClosed(id_modal);	
		} else {
			PageLocation.changeLocation(url);
		}
	};


	// Create a simbad dialog
	var simbad = function (pos) {
		Processing.show("Waiting on Simbad Response");
		$.getJSON("simbadtooltip", {pos: pos}, function(jsdata) {
			Processing.hide();
			if( Processing.jsonError(jsdata, "Simbad Tooltip Failure") ) {
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

				CustomDataTable.create("simbadtable", options, position);

				// Put the filter just above the table
				$("#"+id_modal).find(".dataTables_filter").css("margin-top","34%");
				$("#"+id_modal).dialog( "option", "position", { my: "center", at: "center", of: window } );
			}
		});
	};

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
		fluidDialog();
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
			if (dialog.options.maxWidth && dialog.options.width) {
				// fix maxWidth bug
				$this.css("max-width", dialog.options.maxWidth);
				//reposition dialog
				dialog.option("position", dialog.options.position);
			}

			if (dialog.options.fluid) {
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
	pblc.addIconTitle=addIconTitle
	return pblc;

}();

/**************************************************************************************************
 * Open Aladin inj a Dialog
 * Designed to avoid as much as possible having multiple running instances of Aladin
 * All widget work with the same ID 
 * TODO: connect with the region editor
 * @returns {___anonymous_ModalAladin}
 */
/**
 * @returns {___anonymous_ModalAladin}
 */
/**
 * @returns {___anonymous_ModalAladin}
 */
ModalAladin = function(){
	/**
	 * Resources used by 
	 */
	var aladin = null;
	var divAladinContainer = "aladin-lite-container";
	var divAladin          = "aladin-lite-catdiv";
	var divInfoAladin      = "aladin-lite-catdiv-info";
	var divInfoSider       = "aladin-lite-sider";
	var jqAladinContainer;
	var jqAladin;
	var divInfoAladin;
	var colorMap = new Object();
	colorMap["Vizier"] = {bg: "green", fg : "white"};
	colorMap["Simbad"] = {bg:"blue", fg : "white"};
	colorMap["NED"]    = {bg:"orange", fg : "black"};
	colorMap["target"] = {bg:"red", fg : "white"};
	colorMap["service_0"] = {bg:"#00ffff", fg : "black"};// Aqua 
	colorMap["service_1"] = {bg:"#66ff33", fg : "black"}; // vert pomme
	colorMap["service_2"] = {bg:"#ff9966", fg : "black"}; //salmon
	colorMap["service_3"] = {bg:"yellow", fg : "black"}; 
	var initialTarget;
	var initialFoV;
	var initialSwarm=null;

	/**
	 * Starts Aladin in an hidden panel
	 */
	var init = function (){
		if( aladin == null ){
			/*
			 * Attach the panel components to the body.
			 */
			$('body').append("<div id=" + divAladinContainer + " style='visibility: hidden;'>"
					+ "<div  id=" + divInfoSider + " style='display: block;float: left;width: 200px; height: 100%; padding-right: 5px;'></div>"
					+ "<div style='position: relative; display: block;float:left;width: 400px'>"
					//    + "   <div id='" + divInfoAladin + "'  readonly style='background-color: red; ; height: 100px; width:400px;' >Click to get source info</div>"
					+ "   <div id='" + divAladin + "' style='width: 400px; height: 400px'></div>"
					+ "   <div id='itemList' style='background-color: #f2f2f2; border-radius: 5px; padding: 5px; margin: 5px; display: none; overflow:auto;position: absolute; left: 0px; top: 0px; width: 390px; height: 90%;'></div>"
					+ "</div></div>");
			
			
			/*
			 * Starts Aladin without target or survey to make sure it can immedialtely handle API callbacks
			 */
			aladin = A.aladin('#' + divAladin , {
				showLayersControl : true,
				showGotoControl: true,
				showZoomControl: true,
				showFullscreenControl: false,
				showReticle: true,
				showFrame: true,
				cooFrame : "ICRS"}
			);		
			jqAladinContainer = $("#" + divAladinContainer);
			jqAladin          = $("#" + jqAladin);
			jqInfoAladin      = $("#" + divInfoAladin);
		}
	};
	/**
	 * Hide info panel on the top o AL
	 */
	var hideInfo = function() {
		jqInfoAladin.text("").attr("rows", 1).css("visibility", "hidden");
	}
	/**
	 * Show info panel on the top o AL
	 */
	var showInfo = function() {
		jqInfoAladin.text("Click to get source info").attr("rows", 6).css("visibility", "visible");
	}
	/**
	 * 
	 */
	var hideSidePanel = function(){
		$("#" + divInfoSider).css("visibility", "hidden");
	}
	/**
	 * 
	 */
	var showSidePanel = function(){
		$("#" + divInfoSider).css("visibility", "visible");
	}

	/**
	 * Display the message into the info panel.
	 * Mesage can be either an objct (then dumped) or an atomic value
	 */
	var displayInfo = function(message){
		if( message instanceof Object ) {
			jqInfoAladin.text(Modalinfo.dumpAscii(message, '   '));
		} else {
			jqInfoAladin.text(message);
		}
	}
	/**
	 * Set the black shadow for a dialog
	 * The same is used by modalinfo
	 * @id: id of the dialog
	 */
	var setShadow = function(id){
		var z_modal = $("#"+id).parent(".ui-dialog").zIndex();
		if($("#shadow").length == 0) {
			$('body').append('<div id="shadow" pos="'+id+'"></div>');
			$('#shadow').zIndex(z_modal-1);
		}
		else {
			$('body').append('<div class="shadow" pos="'+id+'"></div>');
			$('div[pos="'+id+'"]').zIndex(z_modal-1);
		}
		jqShadow = $('div[pos="'+divAladinContainer+'"]')

	};

	/**
	 * Make te dialog component no longer visible
	 */
	var closeHandler = function() {
		/*
		 * Class all Aladin popup 
		 */
		$('#' + divAladin + ' .aladin-popup-container').hide();
		/*
		 * Make sure Aladin won't be displayed on the page bottom
		 */
		jqAladinContainer.css("visibility", "hidden")
		jqAladinContainer.dialog('destroy');
		jqShadow.remove();
	}
	/**
	 * Open the dialog windows with Aladin and setup the close prcoedure 
	 */
	var buildAladinDialog = function (title){ 
		ModalAladin.init();	
		aladin.removeLayers();
		var theA=$("#" + divAladinContainer);
		jqAladinContainer.css("visibility", "visible")
		jqAladinContainer.dialog();
		jqAladinContainer.dialog({resizable: false
			, width: 'auto'
				, title: title
				, close: function(event,obj){
					closeHandler();
				}
		});
		setShadow(divAladinContainer);
		jqShadow.click(function() {
			closeHandler();
		});
		jqAladinContainer.prev("div").find("a.ui-dialog-titlebar-close.ui-corner-all").click(function() {
			closeHandler();
		});
	};

	/**
	 * Open a modal panel with AL. The image is overlayed with a catalogue given either as an URL or as an array of points
	 * A handler can, be given to process mousover events
	 * data:
	 * {
	 * label: ....
	 * target:
	 * fov: 
	 * url: ....
	 * (or) points : [{ra, dec, name, description}..]
	 * }
	 */
	var showSourcesInAladinLite = function (data) {	
		buildAladinDialog(data.label);
		showInfo();
		hideSidePanel();
		if( aladin.view.imageSurvey == null ||  aladin.view.imageSurvey.id == null ) {
			aladin.setImageSurvey('P/XMM/PN/color');
			aladin.gotoObject(data.target);
			aladin.setZoom(data.fov);
		}
		var objClicked;
		if( data.url ) {
			var cat = A.catalogFromURL(data.url, {sourceSize:8, color: 'red', onClick:"showTable"});
			aladin.addCatalog(cat);
			/*
			aladin.on('objectClicked', function(object) {
				var msg;
				if( objClicked ) {
					objClicked.deselect();
				}
				if (object) {
					objClicked = object;
					object.select();
					msg = "Position: " + object.ra + ', ' + object.dec +  Modalinfo.dumpAscii(object.data, '  ');
				} else {
					msg = "Click to get source info";
				}
				$('#' + divInfoAladin).text(msg);
			});
			 */
		} else if( data.points ) {
			var cat = A.catalog({name: 'Source List', sourceSize: 8});
			aladin.addCatalog(cat);
			for( var i=0 ; i<data.points.length ; i++ ){
				var point =  data.points[i];
				cat.addSources([A.marker(point.ra, point.dec, {popupTitle: point.name, popupDesc: point.description})]);
			}
		}
	};


	/** 
	 * Open aladin lite and marks the position given in params
	 * A popup is displayed on the Aladin Screen when th mark is clicked
	 * params:{
	 * ra 
	 * dec 
	 * name 
	 * description }
	 * */
	var showSourceInAladinLite = function (params) {
		showSourcesInAladinLite({target: params.ra + " " + params.dec
			, label: params.name
			, fov: ((params.fov)? patrams.fov: 0.5)
			, points: [{ra: params.ra, dec: params.dec, name: params.name, description: params.description}]});
		hideInfo();
		hideSidePanel();
	}

	/**	
	 * Get a list of points through and AJAX call and display it in Aladin  Lite
	 * data:
	 * {
	 * label: ... panel titke
	 * target: .. central position (can be a name)
	 * fov: .. fov size in deg
	 * url: .. must return an array point points like;  [{ra, dec, name, description}..]
	 * }
	 */
	var showAsyncSourcesInAladinLite = function (data) {				
		Processing.show("Fetching data");
		$.getJSON(data.url, function(jsondata) {
			Processing.hide();
			if( Processing.jsonError(jsondata, data.url) ) {
				return;
			} else {
				showSourcesInAladinLite({
					label: data.label,
					target: data.target,
					fov: data.fov,
					points : jsondata
				})
			}
		});
	}

	var center = function() {
		aladin.setZoom(initialFov);
		aladin.gotoObject(initialTarget);
	}
	/**
	 * position { surveyKeyword: surveyKeyword,
	 *          { target: '13:05:44.90+17:53:28.9', fov: 0.016, title:'3XMM J130544.8+175328', surveyKeyword: surveyKeyword} or
	 *          { swarm: 'http:/something....',title:'3XMM J130544.8+175328', surveyKeyword: surveyKeyword} or
	 *          { region: stcregion title:'3XMM J130544.8+175328', surveyKeyword: surveyKeyword}
	 * stcregion: {"stcString":"Polygon ICRS UNKNOWNREFPOS SPHERICAL2 48.08864682613741 -43.34294001968425 48.04499151548045 -45.25890768286587 50.76739411109153 -45.25886082596674 50.72361221832557 -43.34289619542031"
	 *            ,"size":2.7224025956110793
	 *            ,"raCenter":49.40619281328598,"decCenter":-44.30090193914309
	 *            ,"points":[[48.08864682613741,-43.34294001968425],[48.04499151548045,-45.25890768286587],[50.76739411109153,-45.25886082596674],[50.72361221832557,-43.34289619542031],[48.08864682613741,-43.34294001968425]]}
	 * services : [{type: 'json', name: 'ACDS', url: 'http://xcatdb.unistra.fr/3xmmdr5//getarchesdetail/acdslinks?oid=581249378845461815&mode=aladinlite'}, {type: 'json', name: 'Photometric points', url: 'http://xcatdb.unistra.fr/3xmmdr5/getarchesxmatchpoints?oid=581249378845461815'}, {type: 'votable', name: 'Cluster components', url: 'http://xcatdb.unistra.fr/3xmmdr5/download?oid=294989349005558113'}]
	 * 
	 */
	var aladinExplorer = function(position, services) {
		initialSwarm=null;
		if( position == undefined || (position.swarm != null && position.swarm.indexOf("localhost") != -1) ){
			Modalinfo.info("Aladin Lite cannot operate services running on localhost<br>It can only work with services accessible from the CDS server", "Access denied");
			return;
		} 
		if( services != null ){
			for(var s=0 ; s<services.length ; s++ ){
				if( services[s].url.indexOf("localhost") != -1 ){
					Modalinfo.info("Aladin Lite cannot operate services running on localhost<br>It can only work with services accessible from the CDS server", "Access denied");
					return;
				} 			
			}
		}
		ModalAladin.init();	
		showSidePanel();
		aladin.removeLayers();
		var theA=$("#" + divAladinContainer);
		var theS=$("#" + divInfoSider);
		theS.html("");
		jqAladinContainer.css("visibility", "visible")
		jqAladinContainer.dialog();
		jqAladinContainer.dialog({
			resizable: false
			, width: 'auto'
				, title: ((position.title)? position.title: 'Aladin Explorer')
				, close: function(event,obj){
					closeHandler();
				}
		});
		var RaDec ;
		/*
		 * Insert target anchor
		 */
		theS.html("");
		theS.append("<p id='service_target' title='Show&center/hide the target' class='datahelp' style='cursor: pointer;'>Target</p>");
		/*
		 * The ref prosition is given as a simple position
		 */
		if( position.target != undefined ) {
			aladin.gotoObject(position.target);
			aladin.setZoom(position.fov);
			initialTarget = position.target;
			initialFov = position.fov;
			RaDec = aladin.getRaDec();
			addServices(position, services, theS, RaDec);
		} else if( position.region != undefined ) {
			if( position.region.points.length > 6) {
				aladin.gotoObject(position.region.raCenter + ' ' + position.region.decCenter);
				aladin.setZoom((position.region.size == 0)? 0.016: 2*position.region.size);
				var overlay = A.graphicOverlay({color: 'red', lineWidth: 2});
				aladin.addOverlay(overlay);
				overlay.addFootprints(A.polygon(position.region.points));  
			} else {
				position.target = position.region.raCenter + ' ' + position.region.decCenter;
				aladin.gotoObject(position.target);
				aladin.setZoom(position.fov);
				initialTarget = position.target;
				initialFov = position.fov;
				position.fov = (position.region.size == 0)? 0.016: 2*position.region.size;
			}
			RaDec = aladin.getRaDec();
			addServices(position, services, theS, RaDec);		
		} else if( position.swarm != undefined ) {
			Processing.showWithTO("Fetching Data", 5000);
			var cat = A.catalogFromURL(position.swarm, {name: 'Swarm', sourceSize:8, shape: 'plus', color: 'red', onClick:"showTable", }
			, function(sources) {
				/*
				 * Defines the field enclosing the data selection
				 * which is supposed to be smaller that 180deg along RA
				 */
				var raMin = 1000 ; raMax = -1;
				var decMin = 90 ; decMax = -90;
				for( var s=0 ; s<sources.length ; s++){
					source = sources[s];
					if( source.ra > raMax)  raMax = source.ra;
					if( source.ra < raMin) raMin = source.ra;
					if( source.dec > decMax) decMax = source.dec;
					if( source.dec < decMin) decMin = source.dec;
				}
				var decFov = decMax - decMin
				var decCenter = (decMax + decMin)/2;
				
				/*
				 * Takes the smallest fov along of RA
				 */
				var raFov = Math.abs(raMin - raMax);
				if( raFov > 180 ) raFov = 360 - raFov;
				var raCenter = (raMax + raMin)/2;
				if( Math.abs(raMax - raCenter) > 90 ) raCenter += 180;
				if( raCenter > 360 ) raCenter -= 360;
				var fov = (decFov > raFov)? decFov: raFov;
							
				aladin.gotoRaDec(raCenter , decCenter);
				aladin.setZoom(fov);
				RaDec = aladin.getRaDec();
				initialTarget = (decCenter > 0)? (raCenter + " +" +  decCenter): (raCenter + " -" +  decCenter);
				initialFov = fov;
				initialSwarm = position.swarm
				Processing.hide();
				addServices(position, services, theS, RaDec);		
				});
			aladin.addCatalog(cat);
			var caller = $("#service_target");
			caller.attr("class", "selecteddatahelp");
			caller.css("color", colorMap['target'].fg);
			caller.css("background-color", colorMap['target'].bg);
		}
	}
	/**
	 * Add all service but the targer (internal use)
	 */
	var addServices = function(position, services, theS, RaDec) {
		/*
		 * Insert user services
		 */
		for( var s=0 ; s<services.length; s++){
			var id = "service_" + s;
			theS.append("<p id='" + id + "' title='Show/hide data overlay' class='datahelp' style='cursor: pointer;'>" + services[s].name + "</p>");
			services[s].color = colorMap['service_' + s];
			$("#" + id).data(services[s]);
		}
		/*
		 * Activate user services. Must be done before inserting standards services
		 * which are served by specific methods
		 */
		$("#" + divInfoSider + " p").click(function(){
			var caller = $(this);
			var data = $(this).data(); 
			if( caller.attr("class") == "selecteddatahelp"){
				caller.css("color", "");
				caller.css("background-color", "white");
				caller.attr("class", "datahelp");
				for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
					// a surveiller console.log(c + " " + aladin.view.catalogs[c].name + " "  + data.name)
					if( aladin.view.catalogs[c].name == "Target" || aladin.view.catalogs[c].name == "Swarm" ||aladin.view.catalogs[c].name.startsWith(data.name))  {
						aladin.view.catalogs.splice(c, 1);
						aladin.view.mustClearCatalog = true;
						aladin.view.requestRedraw(); 
						break;
					}
				}
				return;
			} else {
				var color = (caller.attr("id") == 'service_target')? colorMap['target']: data.color;
				caller.attr("class", "selecteddatahelp");
				caller.css("color", color.fg);
				caller.css("background-color", color.bg);
				/*
				 *  popup target
				 */
				if( caller.attr("id") == 'service_target'){
					caller.css("color", color.fg);
					caller.css("background-color", color.bg);
					/*
					 * target is an URL: reload the catalog
					 */
					if( initialSwarm != null ){
						Processing.showWithTO("Fetching Data", 5000);
						aladin.gotoObject(initialTarget);
						var cat = A.catalogFromURL(position.swarm
								, {name: 'Swarm', sourceSize:8, shape: 'plus', color: 'red', onClick:"showTable", }
								, function(){Processing.hide();});
						aladin.addCatalog(cat);
					/*
					 * Otherewise, juste show the position 
					 */
					} else {
						var cat = A.catalog({name: "Target"});
						aladin.gotoObject(initialTarget);
						aladin.addCatalog(cat);
						cat.addSources([A.marker(RaDec[0], RaDec[1], {popupTitle: position.title, /*popupDesc: ''*/})]);
					}
				/*
				 *  Other user service: consider fisrt the VOTable which can be read by AL
				 */
				} else	if( data.type == 'votable') {
					Processing.showWithTO("Fetching Data", 5000);
					var cat = A.catalogFromURL(data.url
							, {name: data.name, sourceSize:8, shape: 'plus', color: data.color.bg, onClick:"showTable"}
							, function(){Processing.hide();});
					aladin.addCatalog(cat);
				/*
				 * Then consider JSON files for which the catalog point mustr be created one by one to feed AL
				 */
				} else {
					$.getJSON(data.url, function(jsondata) {
						Processing.hide();
						if( Processing.jsonError(jsondata, data.url) ) {
							return;
						} else {
							var objClicked;
							var cat = A.catalog({name: data.name, sourceSize: 8, color: data.color.bg, shape: 'plus', onClick:"showTable"});
							aladin.addCatalog(cat);
							for( var i=0 ; i<jsondata.length ; i++ ){
								var point =  jsondata[i];
								cat.addSources([A.source(point.ra, point.dec, {ra: Numbers.toSexagesimal(point.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.dec, 7, true), Name: point.name, Description: point.description})]);
							}
						}
					});
				}
			}
		});
		/*
		 * Adding simbad selector
		 */
		var s=services.length;
		id = "service_simbad";
		theS.append("<hr><p id='" + id + "' title='Show/hide Simbad sources' class='datahelp' style='cursor: pointer;' "
				+ "onclick='ModalAladin.displaySimbadCatalog();'>Simbad</p>");
		$("#" + id).data({name: 'Simbad'});
		/*
		 * Adding NED selector
		 */
		s++;
		id = "service_ned";
		theS.append("<p id='" + id + "' title='Show/hide NED sources' class='datahelp' style='cursor: pointer;' "
				+ "onclick='ModalAladin.displayNedCatalog();'>NED</p>");
		$("#" + id).data({name: 'NED'});

		/*
		 * Adding Vizier selector
		 */
		s++;
		id = "service_vizier";
		theS.append("<p id='" + id + "' title='Show/hide selected catalog sources' class='datahelp' style='cursor: pointer;' onclick='ModalAladin.toggleSelectedVizierCatalog();'>Vizier...</p><div id='AladinHipsCatalogs'></div>");
		$("#" + id).data({name: 'VizieR'});
		var he = new HipsExplorer_mVc({
			aladinInstance: aladin,
			parentDivId: "AladinHipsCatalogs", 
			formName   : "AladinHipsCatalogsExplorer", 
			target     : {ra: RaDec[0], dec : RaDec[1], fov: position.fov},
			productType: "catalog",
			handler    : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong>" + jsondata.length + " matching Catalogues</span>"
						+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					itemList.append("<br><span class=datahelp style='cursor: pointer' "
							+ "onclick='ModalAladin.displaySelectedVizierCatalog(&quot;" + jsondata[i].obs_id + "&quot);'>"  
							+ jsondata[i].obs_title + "</span><br>"
							+ "<span class=blackhelp>"
							+ jsondata[i]. obs_regime + "</span><br>"
							+ "<span class=blackhelp>"
							+ jsondata[i].obs_description + "</span>");
				}
			}
		});
		he.draw();
		/*
		 * Adding Hips survey selector
		 */
		id = "service_aladin";
		theS.append("<hr><p id='" + id + "' title='Change image survey' class='datahelp' style='cursor: pointer;'>Images...</p><div id='AladinHipsImages'></div>");
		var he = new HipsExplorer_mVc({
			aladinInstance: aladin,
			parentDivId: "AladinHipsImages", 
			formName   : "AladinHipsImagesExplorer", 
			target     : {ra: RaDec[0], dec : RaDec[1], fov: position.fov},
			productType: "image",
			handler    : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong>" + jsondata.length + " matching Hips images</span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					itemList.append("<br><span class=datahelp style='cursor: pointer' onclick='ModalAladin.displaySelectedHips(&quot;" + jsondata[i].obs_title 
							+ "&quot;, &quot;" + jsondata[i].hips_service_url
							+ "&quot;, &quot;" + jsondata[i].hips_frame
							+ "&quot;, &quot;" + jsondata[i].hips_order
							+ "&quot;, &quot;" + jsondata[i].hips_tile_format
							+ "&quot;)'>"  + jsondata[i].obs_title + "</span><br>"
							+ "<span class=blackhelp>"
							+ jsondata[i].publisher_did + "</span><br>"
							+ "<span class=blackhelp>"
							+ jsondata[i]. obs_regime + "</span><br>"
							+ "<span class=blackhelp>"
							+ jsondata[i].obs_description + "</span>");
				}
			}
		});
		he.draw();
		/*
		 * Popup setup
		 */
		setShadow(divAladinContainer);
		jqShadow.click(function() {
			closeHandler();
		});
		jqAladinContainer.prev("div").find("a.ui-dialog-titlebar-close.ui-corner-all").click(function() {
			closeHandler();
		});
		/*
		 * Display DSS color by default
		 */
		var survey = {desc: "DSS2 optical HEALPix survey, color (R=red[~0.6um]/G=average/B=blue[~0.4um])"
			, url:"http://alasky.u-strasbg.fr/DSS/DSSColor", sys: 'equatorial', order: 9 , format:"jpeg"};
		var surveykw;
		
		if( (surveykw = position.surveyKeyword) ) {
			surveykw = surveykw.toLowerCase();
			if( surveykw == 'mars' ) {
				survey = {desc: "Mars MOLA Shaded Relief / Colorised Elevation"
					, url:"http://alasky.u-strasbg.fr/Planets/Mars_MOLA/", sys: 'mars', order: 5 , format:"jpeg"};
			} else if( surveykw == 'moon' ) {
				survey = {desc: "Moon Kaguya-Evening-V04-474m"
					, url:"http://alasky.u-strasbg.fr/Planets/CDS_P_Moon_Kaguya-Evening-V04-474m", sys: 'moon', order: 3 , format:"png"};
			} else if( surveykw == 'venus' ) {
				survey = {desc: "Venus Magellan C3-MDIR-ClrTopo-6600m-color"
					, url:"http://alasky.u-strasbg.fr/Planets/CDS_P_Venus_Magellan_C3-MDIR-ClrTopo-6600m-color", sys: 'venus', order: 5 , format:"jpeg"};
			} else if( surveykw == 'mercury' ) {
				survey = {desc: "Mercury MESSENGER-MDIS-LOI-166m"
					, url:"http://alasky.u-strasbg.fr/Planets/CDS_P_Mercury_MESSENGER-MDIS-LOI-166m", sys: 'mercury', order: 5 , format:"jpeg"};
			}
		}
		displaySelectedHips(survey.desc, survey.url, survey.sys, survey.order, survey.format);
	}
	/**
	 * 
	 */
	var displaySelectedHips = function (obs_title, hips_service_url, hips_frame, moc_order, hips_tile_format) {	
		var cmdNode = $("#service_aladin");
		$("#itemList").css("display", "none");
		cmdNode.html(obs_title);
		var fmt = "";
		if(hips_tile_format.indexOf("png") >=0  ){
			fmt = "png";
		} else {
			fmt = "jpg";
		}
		if( fmt != "")
			aladin.setImageSurvey(aladin.createImageSurvey(obs_title, obs_title, hips_service_url, hips_frame, moc_order, {imgFormat: fmt})  );
		else 
			aladin.setImageSurvey(aladin.createImageSurvey(obs_title, obs_title, hips_service_url, hips_frame, moc_order)  );
	}
	var displaySelectedVizierCatalog = function (obs_id) {	
		if( obs_id == undefined ||  obs_id == "" || obs_id.startsWith("Vizier...")) {
			Modalinfo.info("you must first select a catalogue");
			var cmdNode = $("#service_vizier");
			cmdNode.css("color", "");
			cmdNode.css("background-color", "white");
			return;
		}
		var cmdNode = $("#service_vizier");
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith("VizieR"))  {
				aladin.view.catalogs.splice(c, 1);
				aladin.view.mustClearCatalog = true;
				aladin.view.requestRedraw(); 
				break;
			}
		}
		$("#itemList").css("display", "none");
		cmdNode.attr("class", "selecteddatahelp");
		cmdNode.css("color", colorMap['Vizier'].fg);
		cmdNode.css("background-color", colorMap['Vizier'].bg);
		cmdNode.html(obs_id);
		var fov =  limitFov();
		Processing.show("Fetching Vizier data");
		aladin.addCatalog(A.catalogFromVizieR(obs_id
				, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, fov
				, {onClick: 'showTable', color: colorMap['Vizier'].bg}
				, function() {Processing.hide(); }
		));
	}
	var toggleSelectedVizierCatalog = function () {	
		var cmdNode = $("#service_vizier");
		$("#itemList").css("display", "none");
		if( cmdNode.attr("class") == "selecteddatahelp" ) {
			cmdNode.css("color", "");
			cmdNode.css("background-color", "white");
			cmdNode.attr("class", "datahelp");
			for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
				if( aladin.view.catalogs[c].name.startsWith("VizieR"))  {
					aladin.view.catalogs.splice(c, 1);
					aladin.view.mustClearCatalog = true;
					aladin.view.requestRedraw(); 
					break;
				}
			}

		} else {
			cmdNode.attr("class", "selecteddatahelp");
			displaySelectedVizierCatalog($("#service_vizier").html());
		}
	}
	var displaySimbadCatalog = function () {	
		var cmdNode = $("#service_simbad");
		if( cmdNode.attr("class") == "selecteddatahelp" ) {
			cmdNode.css("color", "");
			cmdNode.css("background-color", "white");
			cmdNode.attr("class", "datahelp");
			for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
				if( aladin.view.catalogs[c].name.startsWith("Simbad"))  {
					aladin.view.catalogs.splice(c, 1);
					aladin.view.mustClearCatalog = true;
					aladin.view.requestRedraw(); 
					break;
				}
			}
		} else {
			var fov =  limitFov();
			cmdNode.attr("class", "selecteddatahelp");
			cmdNode.css("color", colorMap['Simbad'].fg);
			cmdNode.css("background-color", colorMap['Simbad'].bg);
			Processing.show("Fetching Simbad data");
			aladin.addCatalog(A.catalogFromSimbad(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
			, fov
			, {onClick: 'showTable', color: colorMap['Simbad'].bg}
			, function() {Processing.hide(); }
			));
		}
	}
	var displayNedCatalog = function () {	
		var cmdNode = $("#service_ned");
		if( cmdNode.attr("class") == "selecteddatahelp" ) {
			cmdNode.css("color", "");
			cmdNode.css("background-color", "white");
			cmdNode.attr("class", "datahelp");
			for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
				if( aladin.view.catalogs[c].name.startsWith("NED"))  {
					aladin.view.catalogs.splice(c, 1);
					aladin.view.mustClearCatalog = true;
					aladin.view.requestRedraw(); 
					break;
				}
			}
		} else {
			cmdNode.attr("class", "selecteddatahelp");
			cmdNode.css("color", colorMap['NED'].fg);
			cmdNode.css("background-color", colorMap['NED'].bg);
			var fov =  limitFov();
			Processing.show("Fetching Ned data");
			aladin.addCatalog(A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
			, fov
			, {onClick: 'showTable', color: colorMap['NED'].bg}
			, function() {Processing.hide(); }
			));
		}
	}
	var limitFov = function () {
		var fov = aladin.getFov()[0];
		if( fov > 0.5 ) {
			Modalinfo.info("Search radius limted to 1/4deg", "Warning")
			fov = 0.25;
		}
		return fov;
	}

	/**
	 * Create a STC Region dialog
	 * data format
	 * stcString: "POLYGON ICRS 213.8925 44.575 213.8925 45.295 214.6125 45.295 214.6125 44.575"
   		size: 0.7199999999999989
   		raCenter: 214.2525
   		decCenter: 44.935
   		points: [[..., ...] .... ]
	 */
	var showSTCRegion = function (stcRegion) {	
		ModalAladin.init();	
		buildAladinDialog("STC Region Viewer");
		aladin.setImageSurvey("P/DSS2/color");
		aladin.gotoObject(stcRegion.raCenter + ' ' + stcRegion.decCenter);
		aladin.setZoom(2*stcRegion.size);
		displayInfo(stcRegion.stcString);
		var overlay = A.graphicOverlay({color: 'red', lineWidth: 2});
		aladin.addOverlay(overlay);
		overlay.addFootprints(A.polygon(stcRegion.points));             
	};

	/**
	 * Public part of the object
	 */ 
	var pblc = {};
	pblc.init = init;
	pblc.showSourcesInAladinLite = showSourcesInAladinLite;
	pblc.showSourceInAladinLite = showSourceInAladinLite;
	pblc.showAsyncSourcesInAladinLite = showAsyncSourcesInAladinLite;
	pblc.showSTCRegion = showSTCRegion;
	pblc.aladinExplorer = aladinExplorer;
	pblc.displaySelectedHips = displaySelectedHips;
	pblc.displaySelectedVizierCatalog = displaySelectedVizierCatalog;
	pblc.toggleSelectedVizierCatalog = toggleSelectedVizierCatalog;
	pblc.displaySimbadCatalog = displaySimbadCatalog;
	pblc.displayNedCatalog = displayNedCatalog;

	return pblc;
}();

ModalResult = function() {
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
		$("#"+id).prev("div").find("span.ui-dialog-title").prepend('<a id="qhistoleft" href="javascript:void(0);" onclick="ModalResult.prevHisto()" class=greyhistoleft></a>'
				+ '<span class="nbpages"></span>'
				+ '<a id="qhistoright" href="javascript:void(0);" onclick="ModalResult.nextHisto()" class=greyhistoright></a>');
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
			Out.info("Can't open chapter " + chapter);
			return;
		}
		if (div.html().length > 0) {
			div.slideToggle(500);
			switchArrow(chapter.id);
		} else if(chapter.url != null ){
			Processing.show("Fetching data");
			$.getJSON(chapter.url, chapter.params , function(data) {
				Processing.hide();
				if( Processing.jsonError(data, chapter.url) ) {
					return;
				} else {
					showDataArray(chapter.id, data, chapter.searchable);
					switchArrow(chapter.id);
					Modalinfo.center();
				}
			});
		} else if (chapter.data != undefined && chapter.data != null) {
			showDataArray(chapter.id, chapter.data, chapter.searchable);	
			switchArrow(chapter.id);
			ModalResult.center();
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

				CustomDataTable.create(id, options, positions);
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

			CustomDataTable.create(id, options, positions);
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
			var id_modal = Modalinfo.nextId();
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
							Modalinfo.close(Modalinfo.findLastModal());
						}
					}
			, width: 'auto' // overcomes width:'auto' and maxWidth bug
				, maxWidth: 1000
				, fluid: true
				, open: function(event, ui){
					// Put the content in the history
					addToHisto(content, content.chapters[0].params.oid);
					Modalinfo.fluidDialog();
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
					Modalinfo.fluidDialog();
				}
			}

			// Set the handler wanted to be executed when the panel is closed
			$('div[pos="'+$(resultSelect).attr("id")+'"]').on("click", chdl);

			Modalinfo.setShadow(id_modal);
			Modalinfo.whenClosed(id_modal);
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

Modalcommand = function() {
	var divId     = 'modalcommanddiv';
	var divSelect = '#' + divId;
	/*
	 * Privates functions
	 */
	var initDiv = function() {
		if( $(divSelect).length != 0){		
			$(divSelect).remove();
		}		
		$(document.documentElement).append("<div id=" + divId + " style='display: none; width: auto; hight: auto;'></div>");
	}; 
	/*
	 * Public functions
	 */
	var commandPanel = function (title, htmlContent, closeHandler) {
		initDiv();
		var chdl = ( closeHandler == null )? function(ev, ui)  {}: closeHandler;
		$(divSelect).html(htmlContent);
		$(divSelect).dialog({resizable: false
			, width: 'auto'
				, title: title 			                      
				, zIndex: (zIndexModalinfo -1)
				, close: chdl});
	};
	/**
	 * Open a modal dialog with an handler called once the html is attached to the DOM
	 */
	var commandPanelAsync = function (title, htmlContent, openHandler, closeHandler) {
		initDiv();
		var chdl = ( closeHandler == null )? function(ev, ui)  {}: closeHandler;
		var ohdl = ( openHandler == null )? function(ev, ui)  {}: openHandler;
		$(divSelect).html(htmlContent);
		$(divSelect).dialog({resizable: false
			, width: 'auto'
				, title: title 			                      
				, zIndex: (zIndexModalinfo -1)
				, close: chdl
				, open: ohdl
		});
	};
	var setDivToggling = function(handler) {
		$(divSelect + " fieldset legend").click(function() {
			$(this).parent().find("div").first().toggle(handler);		  
		});
	};
	/**
	 * Collapse or expand all top div in fieldsets
	 */
	var collapseDiv= function(handler) {
		$(divSelect + " fieldset legend").each(function() {
			$(this).parent().find("div").first().toggle(handler);		  
		});
	};
	/*
	 * exports
	 */
	var pblc = {};
	pblc.commandPanel = commandPanel;
	pblc.commandPanelAsync = commandPanelAsync;
	pblc.setDivToggling = setDivToggling;
	pblc.collapseDiv = collapseDiv;
	return pblc;
}();

/*****************************************************************************************************
 * Object showing AJAX callback progress
 */
Processing  = function() {
	/*
	 * public functions
	 */
	var openTime = -1;	
	var jsonError = function (jsondata, msg, custom_msg) {
		if( jsondata == undefined || jsondata == null ) {
			Modalinfo.error("JSON ERROR: " + msg + ": no data returned" );
			return true;
		}
		else if( jsondata.errormsg != null) {
			if (custom_msg == undefined) {
				Modalinfo.error(jsondata.errormsg, msg );
			}
			else {
				Modalinfo.error(custom_msg);
			}
			return true;
		}	
		return false;
	};
	var showAndHide = function(message){
		Out.debug("PROCESSSING (show and hide) " + message);
		show(message);
		setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");', 500);		
	};
	var showWithTO = function(message, timeout){
		Out.debug("PROCESSSING (show and hide) " + message);
		show(message +" (automatically closed after " + (timeout/1000.) + "s)");
		setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");', timeout);		
	};

	var show = function (message) {
		/*
		 * String is, duplcated because if it comes from aJSON.stringify, the content of the JSON object may be altered
		 */
		var m = message;
		m = m.replace(/"/g, '');
		Out.info("PROCESSSING " + m);
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
		Out.debug("close processing");
		var msg = $("#saadaworkingContentText").text();
		var seconds = new Date().getTime() ;
		/*
		 * Make sure the progress windows remains open at least 700ms: avoids blinking
		 */
		if( (seconds - openTime) < 700 ) {
			setTimeout('Processing.closeIfNoChange("' + msg + '" )', 700);
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
			Out.debug("The content of the progress dialog has changed: not closing it");
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

/*****************************************************************************************************
 * Console functions:
 * -Msg(): print out a message with the caller stacl position
 * -Trace(): print out a message with the caller stack trace
 */
Out = function() {
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
			console.log(level + ": " + msg);
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
					console.log(ls[i]);
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
				Out.info("Set debug on and trace off");
				Out.debugModeOn();
				Out.traceOff();
			} else if( debug == "withtrace" ) {
				Out.info("Set debug on and trace on");
				Out.debugModeOn();
				Out.traceOn();
			} else if( debug == "traceonly" ) {
				Out.info("Set debug off and trace on");
				Out.debugModeOff();
				Out.traceOn();
			} else {
				Modalinfo.info("debug parameter must be either on, withtrace or traceonly. It is ignored for this session.");
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

/*****************************************************************************************************
 * Object managing printer features
 */
Printer = function() {
	/*
	 * Public functions
	 */
	var getPrintButton = function(divToPrint) {
		var retour =  "<a href='#' onclick='Printer.printDiv(\"" + divToPrint + "\");' class='printer'></a>";
		return retour;
	};
	var getSmallPrintButton = function(divToPrint) {
		var retour =  "<a href='#' onclick='Printer.printDiv(\"" + divToPrint + "\");' class='dlprinter'></a>";
		return retour;
	};
	var insertPrintButton = function(divToPrint, divHost) {
		$("#" + divHost).append(printer.getPrintButton(divToPrint));
	};
	var printDiv = function(divSelect) {
		var ele = $('#' + divSelect);
		if( !ele ) {
			Modalinfo.error("PRINT: the element " + divSelect +" doesn't exist");
		} else {
			Out.infoMsg(ele);
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

/*****************************************************************************************************
 * Download class 
 * Location had to be renamed PageLocation to avoid a conflict with AladinLite
 */
PageLocation = function () {
	var that = this;
	var downloadIframe = null;
	/*
	/*
	 * Public functions
	 */
	var changeLocation = function (url, title){
		Out.info("changeLocation to " + url);
		authOK = true;
		var t = ( title )? title: '_blank';
		window.open (url, t);
	};
	var download = function (url){
		authOK = true;
		if( !url.startsWith("http")) {
			url = window.location.protocol + "//" + window.location.hostname +  (location.port?":"+location.port:"") + window.location.pathname + "/" + url; 
		}
		Out.info("Download " + url);
		if( downloadIframe == null ) {
			$(document.body).append('<iframe id="downloadIframe" src="' + url + '" style="display: hiddden;">Waitng for server response...</iframe>');
			this.downloadIframe =  $("#downloadIframe");
		} else {
			this.downloadIframe.attr("src", url);
		}
	};
	var confirmBeforeUnlaod = function() {
		Out.info("Prompt user before to leave");
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


