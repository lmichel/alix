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
						+ "<a class=simbad target=blank href=\"https://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
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
				+ "<a class=simbad target=blank href=\"https://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
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
		var url = "https://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
		url += encodeURIComponent("format object \"%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)\"\n" + pos + " radius=1m", "ISO-8859-1");
		//Alix_Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			//url:'https://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=format+object+%22%25IDLIST%5B%25-30*%5D%7C-%25COO%28A%29%7C%25COO%28D%29%7C%25OTYPELIST%28S%29%22%0A01+33+50.904+%2B30+39+35.79+radius%3D1m',
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
							+ "<a class=simbad target=blank href=\"https://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
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
			AladinLiteX_mVc.setRegion("",1);
		}
		if(position!=undefined)
			AladinLiteX_mVc.gotoPositionByName(position);
	};
	
	var changeRefBlue = function(value){
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
		if(value!=undefined){
			var region = {
				type:"array",
	        	value:value
			}
			var defaultView={
				defaultSurvey: "DSS colored",
			}	
			//AladinLiteX_mVc.setReferenceView(defaultView);
			//AladinLiteX_mVc.cleanPolygon();
			AladinLiteX_mVc.setRegion(region,2);
			var view = BasicGeometry.getEnclosingView(x);
			var strlon = Numbers.toSexagesimal(view.center.ra/15, 8, false);
			var strlat = Numbers.toSexagesimal(view.center.dec, 7, false);
			var position = strlon + " " +  strlat
			AladinLiteX_mVc.gotoPositionByName(position);
		}
			
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
	pblc.addIconTitle=addIconTitle;
	pblc.SimbadCatalog=SimbadCatalog;
	pblc.showPopup = showPopup;
	pblc.changeRefBlue = changeRefBlue;
	return pblc;

}();;console.log('=============== >  Alix_Modalinfo.js ');
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
}();;console.log('=============== >  Alix_Out.js ');
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
}();;console.log('=============== >  Alix_PageLocation.js ');
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
}();;console.log('=============== >  Alix_Printer.js ');
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
}();;console.log('=============== >  Alix_Processing.js ');
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

}();;console.log('=============== >  Alix_SkyGeometry.js ');
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
;console.log('=============== >  Segment.js ');
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
     * @description Returns a distance ranging from 0 to 180deg
     * @param {Array<number,number>} node1 Nodes are arrays with 2 elements
     * @param {Array<number,number>} node2 Nodes are arrays with 2 elements
     * @returns {number} The distance between node1 & node2
     */
    function distanceBetweenNodes(node1, node2){
    	var coo1 = new Coo(node1[0], node1[1]);
    	var coo2 = new Coo(node2[0], node2[1]);
    	return coo1.distance(coo2)
    }
    /**
     * @description Return the geometric definition of the view enclosing the skyPositions polygon
     * @param {Array<Array<number,number>>} skyPositions Array of points: [[ra,dec], ...]
     * @returns {{center: {ra: number, dec: number}, size: number}} size is in deg
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
;console.log('=============== >  AstroCoo.js ');
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
		
};console.log('=============== >  LibraryMap.js ');
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

		var pblc = {}
		pblc.catalogs = catalogs;
		pblc.addCatalog = addCatalog;
		pblc.getCatalog = getCatalog;
		pblc.delCatalog = delCatalog;
		pblc.updCatalog = updCatalog;
		//pblc.setAttribut = setAttribut;
		return pblc;

} ();
;console.log('=============== >  LibraryCatalog.js ');
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
			if(!this.filtered && aladinLiteView.fov>0.15){
				if(affichage.progressiveMode == true){
					fov = aladinLiteView.fov
				}else{
					fov = 0.15;
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
				//if RUNID exists in the base url, replace it with RUNID
				if(base.includes('{$RUNID}')){
					var query = location.url_query;
					var progressiveLimit = "";
					if(affichage.progressiveMode == true &&  affichage.location.url_limit != undefined){
						progressiveLimit = affichage.location.url_limit;
					}
					var RUNIDEncode = encodeURI(affichage.RUNID);
					query = query.replace(/\{\$limitQuery\}/g,progressiveLimit);
					query = query.replace(/\{\$ra\}/g,'($ra)');
					query = query.replace(/\{\$dec\}/g,'($dec)');
					query = query.replace(/\{\$fov\}/g,'($fov)');
					var queryEncoded = encodeURI(query);
					queryEncoded = queryEncoded.replace(/\'/g,'%27'); 
					url = base.replace(/\{\$query\}/g,queryEncoded);
					url = url.replace(/\{\$RUNID\}/g,RUNIDEncode);
					url = url.replace(/\{\$format\}/g,affichage.format);
					url = url.replace(/\(\$ra\)/g,aladinLiteView.ra);
					url = url.replace(/\(\$dec\)/g,aladinLiteView.dec);
					url = url.replace(/\(\$fov\)/g,size);
				}
				else{
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
					queryEncoded = queryEncoded.replace(/\'/g,'%27');
					//var queryEncoded = encodeURIComponent(query);
					//var queryEncoded = escape(query);
					url = base.replace(/\{\$query\}/g,queryEncoded);
					url = url.replace(/\{\$format\}/g,affichage.format);
					url = url.replace(/\(\$ra\)/g,aladinLiteView.ra);
					url = url.replace(/\(\$dec\)/g,aladinLiteView.dec);
					url = url.replace(/\(\$fov\)/g,size);
				}
			}else{
				url = this.url.replace(/\{\$ra\}/g,aladinLiteView.ra);
				url = url.replace(/\{\$dec\}/g,aladinLiteView.dec);
				url = url.replace(/\{\$fov\}/g,size);
				url = url.replace(/\{\$format\}/g,affichage.format);
			}
			return url;
		},
		
		cleanTab: function(){
			this.tab=[];
		}

};console.log('=============== >  MasterResource.js ');
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
	this.amoraSession = null;
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
		obj.amoraSession = params.amoraSession;
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
		return `
			<div title="replay the stored view"
				id="${this.id}"
				class="bookmark-element"
			>
				<img id="${this.id}_snapShot_img" 
					src="${this.img}"
					onclick="AladinLiteX_mVc.restoreViewById(&quot;${this.id}&quot;);"
					class="snapshot-picture"
				>
				</img>
				<a title="download the snapshot" href="${this.img}"	download ="ALIX snapshot ${this.id}">
					<i class="glyphicon glyphicon-download-alt" style="vertical-align: top;color:black" ></i>
				</a>
				<!-- store the id in the div -->
				<i id="${this.id}_link"  style="vertical-align: top;font-weight:800;">
					${this.name} | ${this.survey.ID}
				</i>
				${this.regionIcon()}${this.targetIcon()}${this.amoraButton()}
				<div class="alix-bookmark-edit-menu">
					<button id="${this.id}_menu" 
						type="edit list"
						title="menu"
						class="alix_btn alix_btn-color-his alix_btn-edit"
					>
						<i class="glyphicon glyphicon-record" style="font-size:19px;position:relative;top:-4px;"></i>
					</button>
					<button id="${this.id}_menu_close_img"
						title="delete"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
						onclick="AladinLiteX_mVc.deleteHistory(&quot;${this.id}&quot;);"
					>
						<i class="glyphicon glyphicon-remove-sign" style="font-size:15px;"></i>
					</button>
					<button id="${this.id}_menu_commit" 
						title="remark"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
					>
						<i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i>
					</button>
					<button id="${this.id}_menu_show_description"
						title="description"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
					>
						<i class="glyphicon glyphicon-info-sign" style="font-size:15px;"></i>
					</button>
					<div class="add-commit-text" id="${this.id}-menu-commit-menu" style="display: none;">
						<textarea id="${this.id}_menu_commit_text" class="alix_text-commit"></textarea>
						<button id="${this.id}_menu_commit_text_confirm"
							class="alix_btn alix_btn-text-ok alix_btn-color-ok"
						>
							<i class="glyphicon glyphicon-ok" style="font-size:11px;"></i>
						</button>
						<button id="${this.id}_menu_commit_text_delete"
							class="alix_btn alix_btn-text-remove alix_btn-color-remove"
						>
							<i class="glyphicon glyphicon-remove" style="font-size:11px;"></i>
						</button>
					</div>
				</div>
				<div id="${this.id}_menu_commit_text_display" class="alix_menu_commit_text_display" style="">
					${this.displayComment()}
				</div>
			</div>
		`
	},
	
	regionIcon: function(){
		if( this.region == null){
			return "";
		} else {
			return '<i  title="bookmark with region" class="glyphicon glyphicon-registration-mark" style="font-size:18;vertical-align: top;"></i>';
		}
	},
	
	amoraButton: function() {
		if( this.amoraSession === null) {
			return "";
		} else {
			return `<button id="${this.id}-amora-button" class="amora-btn" title="restore AMORA session (${this.amoraSession})"></button>`;
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
		
		/**
		 * Operation with the AMORA session stored
		 */
		$(`#${this.id}-amora-button`).on('click', () => {
			Modalinfo.iframePanel(
				{
					url: `https://xcatdb.unistra.fr/onlinesas/${self.amoraSession}/processing/init`,
					title: "Processing"
				}
			);
		});
		
		/*
		 * operation on image
		 */
		$("#" + this.id+ "_snapShot_img").mouseover(function(event){
			/*
			$("#" + this.id).css("width", "100px");
			$("#" + this.id).css("height", "100px");
			*/
			$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
		});
		$("#"+this.id+ "_snapShot_img").mouseout(function(event){
			/*
			$("#" + this.id).css("width", "18px");
			$("#" + this.id).css("height", "18px");
			*/
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
				statue = false;
			}
		});
		
		/****************************************************************
		**************** Manage the remove bookmark button **************
		****************************************************************/
		
		$("#"+this.id+ "_menu_close_img").click(() => {
			fetch(`https://xcatdb.unistra.fr/onlinesas/job/${this.amoraSession}/delete`, {
	            method: 'DELETE', 
	            cache: 'no-cache',
	            redirect: 'follow',
	            referrerPolicy: 'no-referrer'
	        });
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
		
		
		/****************************************************************
		******************* Manage the edit commits button **************
		****************************************************************/
		$("#"+this.id+ "_menu_commit").click(function(event){
			$(`#${self.id}_text`).val(self.comment);
			$(`#${self.id}-menu-commit-menu`).toggle();
		});
		$("#"+this.id+ "_menu_commit_text_delete").click(function(event){
			$(`#${self.id}-menu-commit-menu`).toggle();
			
		});
		$("#"+this.id+ "_menu_commit_text_confirm").click(function(event){
			$(`#${self.id}-menu-commit-menu`).toggle();
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



;console.log('=============== >  AladinLiteView.js ');
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

/**
@description Function to convert the right ascension and the declination of a point
into a sexadecimal string.
@param {Number} ra - The right ascencion of the point
@param {Number} dec - The declination of the point
@return {String} The string combining the right ascension and the declination
 */
var getSexadecimalString = function(ra, dec){
	var strlon = Numbers.toSexagesimal(ra/15, 8, false);
    var strlat = Numbers.toSexagesimal(dec, 7, false);
    return strlon + " " + strlat;
}

var alix_width =  $("#aladin-lite-div").width() ;
var alix_height =  $("#aladin-lite-div").height() ;

var WaitingPanel = function(){
	var callers = {};

	/**
	@description Method to show the AladinLite interface
	 */
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
		         + '<div class="alix_alert_fov_msg" >Search radius limited to 0.3deg;</div>');
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
	//Reference to the AladinLiteX_mVc instance to be used into the event listeners
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
	var parameters = null;
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
	  	},
	  	regionEditorHandler: 
	   }
	*/
	var init = function(params){
		/*
		 * Set ids for sub panels
		 */
		parameters = params;
		parentDivId = params.parentDivId;
		aladinDivId = `${params.parentDivId}-main`;
		menuDivId   = `${params.parentDivId}-menu`;
		contextDivId = `${params.parentDivId}-context`;
		targetDivId  = `${params.parentDivId}-target`;
		selectDivId  = `${params.parentDivId}-select`;
		var showAssociated = params.showAssociated;
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
			/****************** @WARNING temporary comment 
			params.controllers.regionEditor.view = new RegionEditor_mVc(
					this
					, parentDivId
					,'panel_region'//, contextDivId
					, params.regionEditorHandler
					//, aladinLiteView.points
					, params.defaultView.defaultRegion);
			*/
			params.controllers.regionEditor.view = new RegionPanelV(
				this,
				parentDivId,
				'panel_region',
				params.regionEditorHandlers,
				params.defaultView.defaultRegion
			)
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
		if(aladinLiteView.masterResource != undefined && aladinLiteView.masterResource.actions.showAssociated.handlerDeleteSource == true){
		//The function can be configured chosen or not in the configuration.
			cleanCatalog("oid");
			for(var i=0;i<5;i++){
		    $("#plus").trigger("click");
		    }
		    closeContext();
		}
		if(aladinLiteView.masterResource != undefined && aladinLiteView.masterResource.actions.externalProcessing.handlerDeselect){
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
		var button_locate = 
			`<button id="button_locate" class="alix_btn alix_btn-circle alix_btn-grey" title ="search a position" >
				<i id="" class="glyphicon glyphicon-map-marker " style="font-size:18px;"></i>
			</button>`
		var button_center = 
			`<button 
				id="button_center"
				class="alix_btn alix_btn-circle alix_btn-red"
				title ="back to center"
				onclick="AladinLiteX_mVc.returnCenter();"
			>
				<i id="" class="glyphicon glyphicon-screenshot " style="font-size:18px;"></i>
			</button>`
		var button_bookmark = 
			`<button 
				id="button_bookmark" 
				class="alix_btn alix_btn-circle alix_btn-orange"
				title ="save a bookmark"
				onclick="AladinLiteX_mVc.bookMark();"
			>
				<i id="" class="glyphicon glyphicon-heart " style="font-size:18px;"></i>
			</button>`
		var button_history  = 
			`<button 
				id="button_history"
				class="alix_btn alix_btn-circle alix_btn-yellow"
				title ="history of bookmark"
				onclick="AladinLiteX_mVc.getHistory()"
			>
				<i id="" class="glyphicon glyphicon-book " style="font-size:18px;"></i>
			</button>`
		var button_region = 
			`<button
				id="button_region"
				class="alix_btn alix_btn-circle alix_btn-green"
				title ="region editor"
				onclick="AladinLiteX_mVc.regionEditor();"
			>
				<i id="" class="glyphicon glyphicon-edit" style="font-size:18px;"></i>
			</button>`
		var button_image = 
		`<button 
			id="button_image"
			class="alix_btn alix_btn-circle alix_btn-blue"
			title ="search an image"
			onclick="AladinLiteX_mVc.showColorMap();"
		>
			<i id="" class="glyphicon glyphicon-picture" style="font-size:18px;"></i>
		</button>`
		var button_catalog = 
			`<button 
				id="button_catalog"
				class="alix_btn alix_btn-circle alix_btn-purple"
				title ="search a catalog"
			>
				<i id="" class="glyphicon glyphicon-list " style="font-size:18px;"></i>
			</button>`
		
			//<span id="search" title="search" class="alix_search glyphicon glyphicon-search" onclick="AladinLiteX_mVc.searchPosition();"></span>
			
		var panel_locate = 
			`<div style="z-index:100"><input id="${targetDivId}" placeholder="target" class="alix_target" onfocus="this.select()">
				<select  id ="${selectDivId}" class="alix_select">
					<option id="${defaultView.field.position}">${defaultView.field.position}</option>
				</select>
				<button id="targetNote" title="Note" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:absolute;left:392px;top:8px;" >
					<i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i>
				</button>
			</div>`
		var panel_history = '<div id="panel_history" class="alix_right_panels"></div>'
		var panel_region = '<div id="panel_region" class="alix_right_panels"></div>'
		var panel_image = 
			`<div id="panel_image" class="alix_right_panels">
			    <p class="alix_titlle_image ">
			    	Image
			    </p>
			    <input type="text" id="${maskId}"  placeholder="Survey" size=11 class=" alix_img_explorer"></input>
			    <select id="status-select" class ="alix_selector_hips ">
			    	<option selected="selected">
			    		CDS/P/DSS2/color
			    	</option>
			    </select>
			    <button id="detail"  type="detail" class=" alix_button_detail" onclick="AladinLiteX_mVc.showDetailByID();">
			    	Detail
			    </button>
				<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: auto; height: 50px; color: black;">
					<b>Color Map : </b>
					<select class="aladin-cmSelection"></select>
					<button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">
						Reverse
					</button>
				</div>
				<div id="panel_image_detail"></div>
			</div>`
			
		var panel_catalog = 
			`<div id="panel_catalog" class="alix_right_panels">
			    <div class="alix_catalog_panel" >
			    	<b class="alix_titlle_catalog ">
			    		Catalogs
			    	</b>
			    	<div id="minus" style="cursor: pointer;" class="alix_minus  " title = "Fade out">
			    		-
			    	</div></b>
			    	<i id="fade" title = "fade" class=" glyphicon glyphicon-lamp"></i>
			    	<div id="plus" style="cursor: pointer;" class=" alix_plus  " title = "Fade in">
			    		+
			    	</div>
			    	<div>
			    		</br>
			    		<b  id="XMM" title="Show/hide master sources"
			    			class="alix_XMM_in_menu  alix_datahelp" 
			    			style="cursor: pointer;" 
			    			onclick="AladinLiteX_mVc.displayDataXml();"
			    		>
			    			${XMM}
			    		</b>
					    ${descriptionXMM()}
					    ${configurationXMM()}
					    ${hideXMMFlash()}
			    		<!--XMM sources can be configured in the configuration which decide if the buttons of '3XMM catalog' exists or not-->
			    	</div>
			    	</br>
			    	<div>
			    		<b id="ACDS" class = "alix_acds" >
			    			${ACDS}  
			    		</b>
			    		<div style = "">
			    			<b id="Simbad" 
				    			title="Show/hide Simbad sources" 
				    			class="alix_simbad_in_menu alix_datahelp" 
				    			style="cursor: pointer;" 
				    			onclick="AladinLiteX_mVc.displaySimbadCatalog();"
			    			>
			    			Simbad
			    		</b>
			    		<i id="btn-Simbad-configure"
				    		title="configure" 
				    		class="glyphicon 
				    		glyphicon-cog alix_btn-operate-catalog" 
				    		style="color:#888a85 ;cursor: pointer;" 
				    		onclick="AladinLiteX_mVc.configureCatalog(\'Simbad\',this.style.color)"
			    		>
			    		</i>
			    		<i id="btn-Simbad-flash"
				    		title = "flash" 
				    		class="glyphicon glyphicon-flash"
				    		style="color:#888a85 ;cursor: pointer;"
				    		onclick="AladinLiteX_mVc.SimbadFlash();"
			    		>
			    		</i>
			    		<b>
			    			<span title="Click to activate the source type selector" 
				    			id="SearchTypeNot"
				    			style="color: rgb(136, 138, 133);"
			    			>
			    				all
			    			</span>
			    			<input type="text"
				    			id="SearchType"
				    			class="alix_cataloge_explorer "
				    			placeholder="Search Type"
				    			style="display:none; width: 120px;"
			    			>
			    		</b>
			    	</div>
			    	<div style = "">
			    		<b id="NED" 
				    		title="Show/hide Ned sources" 
				    		class="alix_ned_in_menu  alix_datahelp"
				    		style="cursor: pointer;"
				    		onclick="AladinLiteX_mVc.displayNedCatalog();"
			    		>
			    			NED
			    		</b>
			    		<i id="btn-NED-configure"
				    		title="configure"
				    		class="glyphicon glyphicon-cog alix_btn-operate-catalog"
				    		style="color:#888a85 ;cursor: pointer;"
				    		onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"
			    		>
			    		</i>
			    		<i id="btn-NED-flash"
				    		title = "flash"
				    		class="glyphicon glyphicon-flash"
				    		style="color:#888a85 ;cursor: pointer;"
				    		onclick="AladinLiteX_mVc.NEDFlash();"
			    		>
			    		</i>
		    		</div>
		    		<br>
			    	<div>
			    		<input type="text" 
				    		id="${catalogeId}"
				    		placeholder="Find other Catalog"
				    		size=11
				    		class=" alix_cataloge_explorer "
			    		>
			    		</input>
			    		<select id="select_vizier" class="alix_selector_vizier ">
			    			<option selected="select">
			    				--select--
			    			</option>
			    		</select>
			    		<div id="vizier" class="alix_vizier">
			    			<ul id="vizier_list">
			    			</ul>
			    		</div>
			    	</div>
					<div id="panel_catalog_detail"></div>
				</div>`
			
			
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
			AlixLogger.trackAction("button_locate");
			panel_check(id);
		});	
		$('#button_bookmark').click(function(event){
			AlixLogger.trackAction("bookmark");
			alert("Saved successfully! You can click the history(yellow) button to check your bookmarks.");
			});	
		$('#button_history').click(function(event){
			AlixLogger.trackAction("history");
			var id ='#panel_history'
			panel_check(id);
			});	
		$('#button_region').click(function(event){
			AlixLogger.trackAction("region");
			var id = '#panel_region';
			panel_check(id);
			});	
		$('#button_image').click(function(event){
			AlixLogger.trackAction("image selector");
			var id ='#panel_image';
			panel_check(id);
			});	
		$('#button_catalog').click(function(event){
			AlixLogger.trackAction("catalogue selector");
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

		setReferenceView(defaultView);
		storeCurrentState();
		
		aladin.on('click',function(){
			targetDiv.blur();
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
		});

		aladin.on('zoomChanged', function(newFoV) {
			var fovValue = aladinLiteView.fov;
			storeCurrentState();
		    if(newFoV >= fovValue){
		    	if(aladinLiteView.masterResource != undefined){
		    		controller.updateCatalogs(aladinLiteView,'zoom');
		    	}
		    }
		});	
				
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
					controller.cleanShape();
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
			AlixLogger.trackAction("annotate target");
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
		
		SimbadCatalog.activateControle();
   
		/////Filter the sources /////////////////////////
		if(masterResource != undefined&&masterResource.actions.externalProcessing.handlerInitial){
			masterResource.actions.externalProcessing.handlerInitial();
		}
		if(masterResource != undefined&&masterResource.affichage.display == true){
			setTimeout( function() {AladinLiteX_mVc.displayDataXml();},1000)	
		}

	}
	var setDefaultSurvey = function(defaultView){
		
		Sesame.resolve(defaultPosition,
                 function(data) { // success callback
  					   var ra = data.Target.Resolver.jradeg;
  					   var dec = data.Target.Resolver.jdedeg;
  					   console.log("Take " + defaultPosition + "(" + ra + " " + dec + ") as default position");
  					   console.log(ra + " " + dec)
  					   setDefaultSurveyForPosition(ra, dec)

                  },
                 function(data) { // errror callback
 					   console.log(defaultPosition + "(" + ra + " " + dec + ") could ben resolved, take (23. 33)");
 					   setDefaultSurveyForPosition(23, 33);
                 });

	}
	
	var setDefaultSurveyForPosition = function(ra, dec){
		var fil =  aladin.getFov();

		var baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
			+ ra + "&DEC=" + dec 
		+ "&SR=" + fil[0] 
		+ "&fmt=json&get=record&casesensitive=false";
		var productType = "image";
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
				let overlay = A.graphicOverlay({color: 'blue', name: "Reference Frame"});
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
				console.log(defaultSurvey)
				console.log(defaultFov)
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
		controller.cleanShape();
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
		for( let c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith("Swarm")) {
				aladinLiteView.XMM = true;
			}
		}
		
        storeCurrentState().then(() => {
			controller.bookMark(aladinLiteView);	
		});
		
	}
    var checkBrowseSaved = function(){
    	if(browseSaved === false){
			var answer = confirm("Do you want to save your shape?") ;
			if(answer){
				$("#regionEditor_a").trigger("click");
			}else{
				browseSaved = null;
				controller.cleanShape();
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
			} else {
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
		if(aladinLiteView != null){
			controller.cleanShape();
		}
		aladinLiteView = jQuery.extend(true, {}, storedView);
		targetDiv.val(aladinLiteView.name);
	    aladin.gotoRaDec(aladinLiteView.ra,aladinLiteView.dec);
        aladin.setFoV(aladinLiteView.fov);
        displaySelectedHips(aladinLiteView.survey.ID);
        selectHipsDiv.val(aladinLiteView.survey.ID);
        console.log(aladinLiteView.region);
        if(aladinLiteView.region != null){
	        if(!regionEditorInit){
	        	//create the editregion environment (if it hasn't been created )for the polygon in the localstorage
	        	controller.editRegion();
	    	}
	        	//var points = {type: null, value: []};
	        	//points.type = aladinLiteView.region.format;
	        	//points.value = aladinLiteView.region.points;
	        	controller.restore(aladinLiteView.region);
	        	
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
	 * Store the current 'aladinLiteView' object
	 */
	var storeCurrentState = async function(){
		var radec = aladin.getRaDec();
		aladinLiteView.region = parameters.controllers.regionEditor.view.storeData();
		if (parameters.controllers.regionEditor.view.sourceRegionEditor) {			
			aladinLiteView.amoraSession = parameters
				.controllers
				.regionEditor
				.view
				.sourceRegionEditor
				.controller
				.amoraSession;
		} else {
			aladinLiteView.amoraSession = null;
		}
		
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
	var regionEditorInit = false;//To judge if regioneditor is already initialized
	var regionEditor = function(){
		//if(aladinLiteView.region != null){
			//controller.cleanPolygon();
		//}
		checkBrowseSaved();
		storeCurrentState();
		$("#SourceDiv").css("display","none");
		contextDiv.css("max-height", "200px");
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
		var cleanedPosName = posName.replaceAll("_SpAcE_", " ")
		targetDiv.val(cleanedPosName);
        aladin.gotoObject(cleanedPosName,{
        	success: function(pos){
        		aladinLiteView.name = targetDiv.val();
        		aladinLiteView.ra = pos[0];
        		aladinLiteView.dec = pos[1];
    			var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
    			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);
        		var l = aladin.getFov();
        		aladinLiteView.fov = l[0];
    			controller.updateCatalogs(aladinLiteView,'position');
    			var re = /^[0-9a-zA-Z_\s]*$/;        //determine if it is a name
    			if(re.test(posName)) {
    				addPositionInSelector(posName);
				} else {
    				if (/^(\+|\-)/.test(strlat)) {
	    				addPositionInSelector(strlon+" "+strlat);
					} else {
						addPositionInSelector(strlon+" +"+strlat);
					}
				}
        		if(posthandler){
        			posthandler();
        		}
        	}
        	,error: function(){alert("Object " + posName + ' cannot be resolved');}
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
		if($("#bookMark")[0])
			$("#bookMark")[0].disabled=false;
		if($("history")[0])
			$("#history")[0].disabled=false;
		if($("#center")[0])
			$("#center")[0].disabled=false;
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
		AlixLogger.trackAction("Display Hips " + hips.obs_title);

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
			var pos_select = '<option id="'+pos.replaceAll(' ', "_SpAcE_")+'">'+pos+'</option>';
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
			controller.cleanShape();
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
	
	var getAladinImg = function(width, height) {
		return aladin.getViewDataURL({width: width, height: height});
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
			AlixLogger.trackAction("Display Simbad");
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
			catalog = A.catalogHiPS(url, {onClick: SimbadCatalog.simbad,name: name,color: color,sourceSize:sourceSize 
					, shape: shape
					, filter:SimbadCatalog.sourceFilter}
				    , WaitingPanel.hide(name)
				    );
			aladin.addCatalog(catalog);	
			LibraryCatalog.addCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
			SimbadCatalog.setCatalog(catalog);
			
		}else if(name == 'NED'){
			AlixLogger.trackAction("Display Ned");
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
		if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: name,color: color, shape :shape ,fade : "", al_refs: catalog});
			} else{
			LibraryCatalog.updCatalog({url:url, name: name ,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };
		}else if(name == 'Swarm'){
			AlixLogger.trackAction("Display SWARM");
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
								} else{
									$("#ACDS").css("color","rgb(50, 255, 236)")
									if(aladinLiteView.masterResource.actions.showAssociated.active == true) {
									$("#XMM").attr("class", "alix_XMM_in_menu  alix_datahelp");//to freeze the view , and don't reload the XMM source when position is changed unless we use 'keypress' to go far away
									$('#'+ idvalue).css("color","#32FFEC");
									Processing.show("Fetching Data");
									$.getJSON(lien, function(jsondata) {
											Processing.hide()
											var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:VizierCatalogue.showSourceData});
											aladin.addCatalog(cat);
											for( var i=0 ; i<jsondata.CounterParts.length ; i++ ){
												var point=jsondata.CounterParts[i].source;
												//cat.addSources([A.source(point.position.ra, point.position.dec, {ra: Numbers.toSexagesimal(point.position.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.position.dec, 7, true), Name: point.name, CatalogName: jsondata.CounterParts[i].catalogue.name})]);
												cat.addSources([A.source(point.position.ra, point.position.dec, 
														point)]);
											}
											if(aladinLiteView.masterResource.actions.showAssociated.handlerFadeOut == true){
												AladinLiteX_mVc.fadeOutAuto()
											}
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
		AlixLogger.trackAction("Display Vizier " + obs_id);
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
	var setRegion = function(region,id){
		if(id==1){
			aladin.removeLayers();
		}
		else if( region != undefined ) {
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
				if(view.size==0)
					defaultFov=0.9;
				else
					defaultFov = 2.5*view.size;
				if( aladin == null ) {
					aladin = A.aladin(parentDiv
						, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
					parentDiv.append();
				}
				setZoom(defaultFov);
				gotoPosition(view.center.ra,view.center.dec);
				aladin.removeLayers();
				overlay = A.graphicOverlay({color: 'blue', name: "Reference Frame"});
				aladin.addOverlay(overlay);
				overlay.addFootprints([A.polygon(x)]);
			}

		}
	}
	
	var cleanShape = function(){
		//console.log(controller);
		//aladinLiteView.clean();
		controller.cleanShape();
	}
	//in order to display de query from taphandle
	var changeMasterResource = function(masterResource){
		//aladinLiteView.masterResource=masterResource;
		aladinLiteView.masterResource = new MasterResource(masterResource);
		AladinLiteX_mVc.displayDataXml();
		
	}
	/**
	@param {string} amoraSession
	@return {boolean}
	 */
	var amoraSessionBelongTo = function(amoraSession) {
		return parameters.controllers.historic.model.view.amoraSessionBelongTo(amoraSession);
	}
	var retour = {
			amoraSessionBelongTo: amoraSessionBelongTo,
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
			getAladinImg: getAladinImg,
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
			setRegion : setRegion,
			cleanShape : cleanShape,
			changeMasterResource : changeMasterResource
	};
	return retour
	
}();



//<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>


;console.log('=============== >  AladinLite_v.js ');
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
		
		restore: function(region){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.restoreEditors(region);
			else
				return null;
		},
		
		
		cleanShape: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.clean();
			else
				return null;
		},
		
		setPolygon: function(region){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setPolygon(region);
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
		
		
};console.log('=============== >  AladinLite_c.js ');
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
			var date = `alix:bookmark-${Date.now()}`//as the unique key for each bookmark in localstorage
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



;console.log('=============== >  Historique_m.js ');
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
			var html = `
				<b class="alix_titlle_image" style=" margin-left: 15px;">Bookmarks:</b>
				<div style="height:230px;overflow:auto;"><ul id = "history_ul" style="padding-left:18px;">`;
			deleteAllObjs();
			let k=0;
			for (let key in localStorage) {
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:bookmark')){
					let Item = JSON.parse(localStorage.getItem(key));
					Item.id = k;
					//Create the new aladinliteview according to the bookmark to have the functions in the prototype 
					let ItemFinal = setAladinLiteView(Item,key);
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
				k++;
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
			for(let k=0 ; k<localStorage.length; k++){
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
			
		},
		/**
		@param {string} targetedAmoraSession
		 */
		amoraSessionBelongTo(targetedAmoraSession) {
			for (let key in localStorage) {
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:bookmark')){
					let item = JSON.parse(localStorage.getItem(key));
					if ('amoraSession' in item && item.amoraSession === targetedAmoraSession) {
						return true;
					}
				}
			}
			return false;
		}
}





;console.log('=============== >  Historique_v.js ');
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
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */ 

class RegionEditor_mVc {
	/**
	@brief View of the RegionEditor service
	@param {string} regionEditorName - The name of the region editor
	@param {AladinLiteX_mVc} aladinLite_V - The aladin lite view that will handle the result of the selection
	@param {Element}  aladinLiteDivId
	@param {Element} contextDivId
	@param {function} handler
	@param {Frame} defaultRegion
	@param {Element} tabHeader
	@param {string} color - color of the shape once it was validated
	 */
    constructor(regionEditorName, aladinLite_V, aladinLiteDivId, contextDivId, handler, /* points,*/ defaultRegion, tabHeader, color) {
		this.regionEditorName = regionEditorName;
        this.aladinLiteDivId = aladinLiteDivId;
        this.tabHeader = tabHeader;
        
        this.buttonGrid = null;
        
        this.drawCanvas = null; // canvas where the polygon is drawn
        this.drawContext = null;
        this.lineCanvas = null; // canvas where the moving lines are drawn
        this.lineContext = null;
        
        this.controller = null;
        this.points = null; // Initial values
        
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        this.editionFrame = defaultRegion;
        
        this.color = color;
        this.clientHandler = (handler == null) ? function() { alert("No client handler registered"); } : handler;
        
        this.isEditMode = false;
        
        this.init();
    }
    init() {
        this.aladinLiteDiv = this.aladinLiteDiv == null ? $(`#${this.aladinLiteDivId}`) : this.aladinLiteDiv;
        this.contextDiv = this.contextDiv == null ? $(`#${this.contextDivId}`) : this.contextDiv;
        // création du canvas pour éditeur régions
        /*
         * Be cautious: the canvas context must be taken before the canvas is appended to the parent div, otherwise the geometry is wrong.
         */
        var that = this;
        this.lineCanvas = $("<canvas id='RegionCanvasTemp' class='editor-canvas'></canvas>");

        this.lineCanvas[0].width = this.aladinLiteDiv.width();
        this.lineCanvas[0].height = this.aladinLiteDiv.height();
        this.lineContext = this.lineCanvas[0].getContext('2d');
        this.aladinLiteDiv.append(this.lineCanvas);
        this.lineCanvas.css({
			'z-index': '100',
			'position': 'absolute'
		});
        this.lineCanvas.hide();

        /*
         * Canvas for the temporary drawings
         */
        this.drawCanvas = $("<canvas id='RegionCanvas' class='editor-canvas' ></canvas>");
        this.drawCanvas[0].width = this.aladinLiteDiv.width();
        this.drawCanvas[0].height = this.aladinLiteDiv.height();
        this.drawContext = this.drawCanvas[0].getContext('2d');
        this.aladinLiteDiv.append(this.drawCanvas);
        this.drawCanvas.css({
			'z-index': '101',
			'position': 'absolute',
			'top': '0px'
		});
        this.drawCanvas.hide();


        this.controller = new RegionEditor_mvC({
			"handler": this.clientHandler,
			"drawCanvas": this.drawCanvas,
			"staticCanvas": this.lineCanvas,
			"aladinView": this.aladinLite_V,
			"color": this.color
		});
        /*
         * The controller function is wrapped in a function in order to make it working in the context of the controller object
         * and not of he HTML widget
         */
        this.drawCanvas[0].addEventListener('mousemove', (event,regionEditorView=this) => {
			regionEditorView.controller.mouseMove(event);
		}, false);
        this.drawCanvas[0].addEventListener('mousedown', (event, regionEditorView=this) => {
			if (event.which === 1) {			
				regionEditorView.controller.mouseDown(event);
			}
		}, false);
        this.drawCanvas[0].addEventListener('mouseup', (event,regionEditorView=this) => {
			if (event.which === 1) {			
				regionEditorView.controller.mouseUp(event);
			}
		}, false);
		
		/***********************************************************
		************* Layout & title creation **********************
		************************************************************/
		const divTitle = $(`<h4>${this.regionEditorName}</h4>`);
		this.buttonGrid = $(`<div class="btn-grid"></div>`);
		this.contextDiv.append(divTitle,this.buttonGrid);
		
		/***********************************************************
		************* Initialize the header button *****************
		************************************************************/
		let header_title = this.regionEditorName.split(' ')[0].toLowerCase();
		this.headerButton = $(`<button class="tab-header-btn" id="tab-header-${header_title}">${header_title}</button>`);
		
		this.tabHeader.append(this.headerButton);		

        /***********************************************************
		************* Button creation using JQuery *****************
		************************************************************/
		
		const styleToApply = {
			'margin-top': '10px',
			'margin-left': '5px',
			'font-weight': ' bold',
		}
		
		/***********************************************************
        ******************** Edit Button ***************************
        ************************************************************/
        this.editBtn = $(
			`<button id='${this.contextDivId}-regionEditor_e' class='alix_edt_btn alix_btn alix_region_btns'>
				Edit&nbsp;
				<i class='glyphicon glyphicon-pencil'></i>
			</button>`
		);
        this.buttonGrid.append(this.editBtn);
        this.editBtn.css(styleToApply);
        this.editBtn.click(function(event) {
            that.setEditMode();
            that.controller.DeleteOverlay();
            that.lineContext.clearRect(0, 0, that.lineCanvas[0].width, that.lineCanvas[0].height);
            that.drawContext.clearRect(0, 0, that.drawCanvas.width, that.drawCanvas.height);
            that.controller.store();
            event.stopPropagation();
        });
		
        /***********************************************************
        ******************** Browse Button *************************
        ************************************************************/
        this.browseBtn = $(
			`<button id='${this.contextDivId}-regionEditor_b' class='alix_browse_btn alix_btn alix_region_btns'>
				Pan&nbsp;
				<i class='glyphicon glyphicon-check'></i>
			</button>`
		);
        this.buttonGrid.append(this.browseBtn);
        this.browseBtn.css(styleToApply);
        this.browseBtn.attr('disabled', 'disabled');
        this.browseBtn.click(function(event) {
            if (!that.controller.isPolygonClosed()) {
                that.controller.CleanCanvas();
            } else {
                that.controller.get();
            }
            that.setBrowseMode();
            browseSaved = false;
            event.stopPropagation();
        });


        
        /***********************************************************
        ******************** Delete Button *************************
        ************************************************************/
        this.deleteBtn = $(
			`<button id='${this.contextDivId}-regionEditor_c' class=' alix_clear_btn alix_btn alix_region_btns'>
				Clear&nbsp;
				<i class='glyphicon glyphicon-trash'></i>
			</button>`
		);
        this.buttonGrid.append(this.deleteBtn);
        this.deleteBtn.css(styleToApply);
        this.deleteBtn.click(function(event) {
            that.controller.CleanCanvas();
            that.setBrowseMode();
            browseSaved = false;
            event.stopPropagation();
            
        });
        this.deleteBtn.attr('disabled', 'disabled');

		/***********************************************************
        ******************** Accept Button ****************************
        ************************************************************/
        this.setBtn = $(
			`<button id='${this.contextDivId}-regionEditor_a' class=' alix_accept_btn alix_btn alix_region_btns'>
        		Accept&nbsp;
        		<i class='glyphicon glyphicon-share'></i>
        	</button>`
        );
        this.buttonGrid.append(this.setBtn);
        this.setBtn.css(styleToApply);

        this.setBtn.on('click', function(event) {
			if(!that.isEditMode) {			
				that.controller.store();
			}
            that.controller.get();
            that.setBrowseMode();
            that.aladinLite_V.reabledButton();
            if ($("#region")[0])
                $("#region")[0].disabled = false;
            browseSaved = true;
            event.stopPropagation();
        });
        
        
        /***********************************************************
        ******************** Switch button ************************
        ************************************************************/
        this.switchModeBtn = $(
			`<button id='${this.contextDivId}-switchEditor' class='alix_swi_btn alix_btn alix_region_btns'>
        	</button>`
        );
        this.switchBtnText = $(`<div class="text">Polygon&nbsp;</div>`);
        this.switchModeBtn.append(this.switchBtnText);
        
        this.switchBtnIcon = $(`<div class="button-img polygon"></div>`);
        this.switchModeBtn.append(this.switchBtnIcon);
        
        this.switchBtnTooltip = $(`<span class="tooltiptext">Switch to Cone</span>`);
        this.switchModeBtn.append(this.switchBtnTooltip);
        
        this.buttonGrid.append(this.switchModeBtn);
        this.switchModeBtn.css(styleToApply);
        
        this.switchModeBtn.on('click', (event, regionEditorView=this) => {
			regionEditorView.setEditMode();
            regionEditorView.controller.DeleteOverlay();
            regionEditorView.lineContext.clearRect(0, 0, regionEditorView.lineCanvas[0].width, regionEditorView.lineCanvas[0].height);
            regionEditorView.drawContext.clearRect(0, 0, regionEditorView.drawCanvas.width, regionEditorView.drawCanvas.height);
            regionEditorView.controller.switchModel();
            
            if (regionEditorView.controller.focusedModel === Models.Polygon) {
				this.switchBtnText.html(`Polygon&nbsp;`);
				this.switchBtnTooltip.text(`Switch to Cone`);
				this.switchBtnIcon.removeClass("circle");
				this.switchBtnIcon.addClass("polygon");
			} else {
				this.switchBtnText.html(`Cone&nbsp;`);
				this.switchBtnTooltip.text(`Switch to Polygon`);
				this.switchBtnIcon.removeClass("polygon");
				this.switchBtnIcon.addClass("circle");
			}
            event.stopPropagation();
		});
        
                
        
        if (!AladinLiteX_mVc.regionEditorInit) {
            this.setInitialValue(this.defaultRegion);
            if (this.editionFrame) {
                this.setEditionFrame(this.editionFrame);
                this.setEditMode();
            }
            AladinLiteX_mVc.regionEditorInit = true;
            /**!!! To note the region editor has been initialized.
             * Avoid it being initialized the second time,
             *which make us can't edit the old polygon when we leave the regioneditor for a while .*/
        }

    }
    
    focusEditor() {
		this.headerButton.css({
			"border-bottom": "none",
			"background-color": "rgba(245, 245, 245,.5)"
		});
		this.contextDiv.css({"display": "block"});
	}
	
	hideEditor() {
		this.headerButton.css({
			"border-bottom": "#545244 solid 2px",
			"background-color": "rgba(150,150,150,.5)"
		});
		this.contextDiv.css({"display": "none"});
		if (!this.controller.isPolygonClosed()) {
            this.controller.CleanCanvas();
        } else if (this.isEditMode) {
            this.controller.get();
        }
        this.setBrowseMode();
        this.emitCanvasHideMessage();
	}
    
    /**
     * @description Operate the drawing removal from outside of the class scope
     */
    clean() {
        //can be called from another button before the editor has been init 
        if (this.controller) {
            this.controller.CleanCanvas();
            this.controller.DeleteOverlay();
            this.setEditMode();
            this.lineContext.clearRect(0, 0, this.lineCanvas[0].width, this.lineCanvas[0].height);
            this.drawContext.clearRect(0, 0, this.drawCanvas[0].width, this.drawCanvas[0].height);
            this.controller.store();
            this.controller.get();
            this.setBrowseMode();
        }

    }
    /**
     * @description Draws the editable frame in blue and center the view on it
     * @param {Array<Array<Number>>} points - An array of sky positions
     * @return {void}
     */
    setEditionFrame(points) {
        if (points) {
            this.editionFrame = points;
        }
        var x = null;
        if (this.editionFrame) {
            /*
             * Extract region or position from SaadaQL statement
             */
            if (this.editionFrame.type == "array") {
                x = this.parseArrayPolygon(this.editionFrame.value);
            } else if (this.editionFrame.type == "soda") {
                x = this.parseSodaPolygon(this.editionFrame.value);
            } else {
                alert("Polygon format " + points.type + " not understood");
            }
            if (x) {
                var view = BasicGeometry.getEnclosingView(x);
                this.aladinLite_V.gotoPosition(view.center.ra, view.center.dec);
                this.aladinLite_V.setZoom(1.2 * view.size);
                if (this.editionFrameOverlay == null) {
                    this.editionFrameOverlay = A.graphicOverlay({ color: 'blue', name: "Editable Frame" });
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
    }
    /**
     * @description
     * Initalize the draw with the default parameter. If points contains a region, it is drawn,
     * if it just contain a position, AladinLite is centered on that position
     * @param {Array<Array<Number>>} points  object denoting the initial value of the polygon : {type: ... value:} type is format of the
     * value (saadaql or array) and value is the data string wich will be parsed
     */
    setInitialValue(points) {
        /*
         * Set the region passed by the client if it exists
         */
        this.points = points;
        //this.controller.CleanCanvas();
        if (this.points) {
            var pts = [];
            /*
             * Extract region or position from SaadaQL statement
             */
            if (this.points.type == "saadaql") {
                var s = /"(.*)"/.exec(this.points.value);
                if (s.length != 2) {
                    Alix_Modalinfo.error(this.points.value + " does not look like a SaadaQL statment");
                    return;
                } else {
                    if (this.points.value.startsWith("isInRegion")) {
                        var ss = s[1].split(/[\s,;]/);
                        for (var i = 0; i < ss.length; i++) {
                            pts.push(parseFloat(ss[i]));
                        }
                    } else {
                        var pos = s[1].replace(/:/g, " ");
                        this.posField.val(pos);
                        this.aladin.setZoom(0.55);
                        this.aladin.gotoObject(pos);
                    }
                }
            } else if (this.points.type == "array2dim") {
                pts = this.points.value;
            } else {
                alert("Polygon format " + this.points.type + " not understood");
                return;
            }

            this.setBrowseMode();
            this.controller.DeleteOverlay();
            this.controller.setPolygon(pts);
        }
        /*
         * Fix for the errors when we open a new region editor
         */
        //			var that = this;
        //	           setTimeout(function() {
        //                   that.aladin.increaseZoom();
        //                   that.aladin.decreaseZoom();
        //                   }, 500);
    }
    /**
    @description Method that let the user enter browse mode. In this mode, the user do not manipulate the shape.
     */
    setBrowseMode() {
		this.isEditMode = false;
        this.editBtn.removeAttr('disabled');
        this.browseBtn.attr('disabled', 'disabled');
        this.deleteBtn.attr('disabled', 'disabled');
        this.lineCanvas.hide();
        this.drawCanvas.hide();
        this.emitCanvasHideMessage();
    }
    /**
    @description Method to let the user enter edition mode. In this mode, the user manipulates the nodes.
     */
    setEditMode() {
		this.isEditMode = true;
        this.editBtn.attr('disabled', 'disabled');
        this.browseBtn.removeAttr('disabled');
        this.deleteBtn.removeAttr('disabled');
        this.lineCanvas.show();
        this.drawCanvas.show();
        this.emitCanvasShownMessage();
    }
    /**
    @description Method to send a signal, saying that the editor is shown,
    to the RegionPanel by using the context div
    */
	emitCanvasShownMessage() {
		this.contextDiv.trigger("canvas-shown");
	}
	/**
    @description Method to send a signal, saying that the editor is hidden,
    to the RegionPanel by using the context div
    */
	emitCanvasHideMessage() {
		this.contextDiv.trigger("canvas-hidden");
	}
    
    /**
    @description Method to let the program mute the RegionEditor when another RegionEditor is used
     */
    muteRegionEditor() {
		this.editBtn.attr('disabled', 'disabled');
		this.setBtn.attr('disabled', 'disabled');
		this.switchModeBtn.attr('disabled', 'disabled');
	}
	
	/**
    @description Method to let the program unmute the RegionEditor when another RegionEditor is no longer used
     */
	unmuteRegionEditor() {
		this.editBtn.removeAttr('disabled');
		this.setBtn.removeAttr('disabled');
		this.switchModeBtn.removeAttr('disabled');
	}
    /**
    @description Method to parse a SODA polygon that is represented by a string
    @example "POLYGON 1.2 1.3 4.5 1.2 4.3 4.3"
    @param {String} value - string polygon to convert
    @return {Array<Float32Array>} an array containing all the points parsed
     */
    parseSodaPolygon(value) {
        let s = value.split(/\s+/);
        let x = null;
        if (s[0].toUpperCase() != "POLYGON") {
            alert("Only SODA POLYGON are supported");
        } else {
            s.shift();
            if (!s || (s.length % 2) != 0 || s.length < 6) {
                alert("Even number of coordinates required (" + s.length + " values read)");
            } else {
                x = [];
                for (let i = 0; i < (s.length / 2); i++) {
                    x.push([parseFloat(s[2 * i]), parseFloat(s[(2 * i) + 1])]);
                }
                x.push(x[0]);
            }
        }
        return x;
    }
    /**
    @description Method to parse a polygon that is represented by a contiguous array
    @example [1.2, 1.3, 4.5, 1.2, 4.3, 4.3]
    @param {Float32Array} value - contiguous array representing the polygon to convert
    @return {Array<Float32Array>} an array containing all the points parsed
     */
    parseArrayPolygon(value) {
        var x = null;
        if (!value || (value.length % 2) != 0 || value.length < 6) {
            alert("Even number of coordinates required");
        } else {
            x = [];
            for (var i = 0; i < (value.length / 2); i++) {
                x.push([value[2 * i], value[(2 * i) + 1]]);
            }
            x.push(x[0]);
        }
        return x;
    }
    
    /**
    @description Method to restore a region
     */
    restore(region) {
		if (region.format === "cone" && this.controller.focusedModel === Models.Polygon) {
			this.controller.switchModel();
			this.switchBtnText.html(`Cone&nbsp;`);
			this.switchBtnTooltip.text(`Switch to Polygon`);
			this.switchBtnIcon.removeClass("polygon");
			this.switchBtnIcon.addClass("circle");
		} else if (region.format === "array2dim" && this.controller.focusedModel === Models.Cone) {
			this.controller.switchModel();
			this.switchBtnText.html(`Polygon&nbsp;`);
			this.switchBtnTooltip.text(`Switch to Cone`);
			this.switchBtnIcon.removeClass("circle");
			this.switchBtnIcon.addClass("polygon");
		}
		this.controller.restore(region);
	}
} 
var browseSaved = null;

;console.log('=============== >  RegionEditor_v.js ');
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
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */

class PolygonModel {
    constructor(points, handler, drawCanvas, staticCanvas, aladinView, colorValidated) {
        console.log(colorValidated);
        this.node = [];
        this.drawCanvas = drawCanvas[0];
        this.staticCanvas = staticCanvas[0];
        this.context = this.drawCanvas.getContext('2d');
        this.staticContext = this.staticCanvas.getContext('2d');
        this.overlay = null;
        this.skyPositions = null;
        this.aladinView = aladinView;
        this.points = points;
        this.color = colorValidated;
    }
    DrawNode(data) {
        for (var i in data) {
            this.context.beginPath();
            this.context.arc(data[i].cx, data[i].cy, data[i].r, 0, Math.PI * 2, true);
            this.context.fillStyle = "blue";
            this.context.fill();
            this.context.strokeStyle="black"
            this.context.stroke();
            this.context.closePath();
        }
    }
    //Drawn Line
    DrawnLine(startingNode, x, y, result) {
        if (result != null) {
            this.context.beginPath();
            this.context.lineCap = "round";

            for (var i in this.node) {
                if (this.node[result.N] == i)
                    this.context.moveTo(this.node[result.N].cx, this.node[result.N].cy);

                this.context.lineTo(this.node[i].cx, this.node[i].cy);
            }
        }

        else {
            this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
            this.context.beginPath();
            this.context.lineCap = "round";
            this.context.moveTo(this.node[startingNode].cx, this.node[startingNode].cy);
            this.context.lineTo(x, y);
        }
        this.context.closePath();
        this.context.strokeStyle = 'lime';
        this.context.stroke();
    }
    
    /**
    @description Draw again the lines and the nodes stored
    @param {*} result
     */
    Redraw(result) {
        this.CanvasUpdate();
        for (var i in this.node) {
            this.context.beginPath();
            this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
        }

        this.DrawnLine(0, 0, 0, result);
    }
    
    /**
    @description Clean the draw Canvas
     */
    CanvasUpdate() {
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
    }
    /**
    @description Convert an Array of Array representing nodes to an array of Object
    @param {Array<Array<number>>} data An array of nodes represented by arrays
    */
    ArrayToObject(data) {
        var NodeTemp = [];
        for (let [cx,cy] of data) {
            NodeTemp.push(
                {
                    cx: cx,
                    cy: cy,
                    r: 5
                }
            );
        }

        this.node = NodeTemp;
    }
    //Fuction pour obtenir le hautor du polygon
    /*
    GetHeight(array) {
        var Ramax = null, Ramin = null;
        var finaltemp;
        var largeur;

        for (var i in array) {
            temp = array[i][0];

            if (Ramax == null) {
                Ramax = temp;
            }
            else if (temp >= Ramax) {
                Ramax = temp;
            }

            if (Ramin == null) {
                Ramin = temp;
            }
            else if (temp <= Ramin) {
                Ramin = temp;
            }
        }

        largeur = (Ramax - Ramin);

        if (largeur > 180) {
            largeur = 360 - largeur;
        }

        return { ramax: Ramax, ramin: Ramin, largeur: largeur };
    }
    */
    //function pour obtenir le numero de segment et construir un segment
    NumeroSegmen() {
        var TotalNodes = this.node.length;
        var segmentoini, segmentofin;
        var total = [];

        for (var j = 0; j < this.node.length; j++) {
            if (segmentoini == undefined)
                segmentoini = j;
            else if (segmentofin == undefined) {
                segmentofin = j;
            }

            if (segmentoini != undefined && segmentofin != undefined) {
                total.push({
                    A: segmentoini,
                    B: segmentofin
                });

                segmentoini = segmentofin;
                segmentofin = undefined;
            }
        }

        total.push({
            A: (this.node.length - 1),
            B: 0
        });

        //console.log('total: ' + total.length);
        return total;
    }
    //function pour obtenir le hauteur de un polygone
    /**
    @description Function get the width (height ?) of a polygon
    @param {Array<Array<number>>} array - an array of nodes forming a polygon
    @return {{decmax: number, decmin: number, width: number}}
     */
    GetWidth(array) {
        var Decmax = null, Decmin = null;
        var temp;
        var width;

        for (var i in array) {
            temp = (array[i][1]);

            if (Decmax == null) {
                Decmax = temp;
            }
            else if (temp >= Decmax) {
                Decmax = temp;
            }

            if (Decmin == null) {
                Decmin = temp;
            }
            else if (temp <= Decmin) {
                Decmin = temp;
            }
        }

        width = (Decmax - Decmin);

        if (width > 180) {
            width = 360 - width;
        }

        return { decmax: Decmax, decmin: Decmin, width: width };
    }
    
    //function para crear una grafica en el this.drawCanvas
    /**
    @description Function to create a graph on the drawCanvas (this.drawCanvas)
    @param {Element} canvas1 - The drawCanvas on which one will draw
     */
    DrawGrafic(canvas1) {
        var canvasgraf = canvas1;
        var ancho = canvasgraf.width;
        var alto = canvasgraf.height;

        var contextGrafic = canvasgraf.getContext('2d');
        var contador = 20;
        var contador2 = 20;

        //console.log("ancho: " + ancho);
        //console.log("alto: " + alto);
        for (var i = 0; i < alto; i++) {

            this.contextGrafic.beginPath();

            if (i === 0) {
                this.contextGrafic.moveTo(i + 20, 10);
                this.contextGrafic.lineTo(i + 20, alto);
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillText("0", i + 15, 20);
            }

            else {
                this.contextGrafic.moveTo(i + contador, 20);
                this.contextGrafic.lineTo(i + contador, alto);
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillText(i, (i + contador) - 3, 20);
            }

            this.contextGrafic.closePath();
            this.contextGrafic.strokeStyle = 'yellow';
            //this.context.lineWidth = 3;
            this.contextGrafic.stroke();

            contador = parseInt(contador + 20);

        }

        for (var i = 0; i < ancho; i++) {

            this.contextGrafic.beginPath();
            this.contextGrafic.lineCap = "round";

            if (i === 0) {
                this.contextGrafic.moveTo(12, i + 20);
                this.contextGrafic.lineTo(ancho, i + 20);
            }

            else {
                this.contextGrafic.moveTo(12, 0 + contador2);
                this.contextGrafic.lineTo(ancho, 0 + contador2);
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.fillText(i, 3, (0 + contador2) + 3);
            }

            this.contextGrafic.closePath();
            this.contextGrafic.strokeStyle = 'brown';
            //this.context.lineWidth = 3;
            this.contextGrafic.stroke();
            contador2 = parseInt(contador2 + 20);
        }
    }
    isEmpty() {
        if (this.node.length == 0)
            return true;

        else
            return false;
    }
    /**
    @description Function to add node to this.node
    @param {number} x
    @param {number} y
    @param {Array<number>} startingNode
    @param {boolean} polygonstatus
     */
    addNode(x, y, startingNode, polygontatus) {
        if (polygontatus) {
            let newNode = {};
            let lastnode = {};
            let position = parseInt(startingNode[0].position);

            newNode.cx = startingNode[0].cx;
            newNode.cy = startingNode[0].cy;
            newNode.r = startingNode[0].r;

            lastnode.r = 5;
            if (this.node.length === position) {
                lastnode.cx = this.node[(this.node.length - 1)].cx;
                lastnode.cy = this.node[(this.node.length - 1)].cy;

                //add the node
                this.node.splice((this.node.length - 1), 1, lastnode, newNode);
            } else {
                lastnode.cx = this.node[startingNode[0].position].cx;
                lastnode.cy = this.node[startingNode[0].position].cy;

                //add the node
                this.node.splice(startingNode[0].position, 1, newNode, lastnode);
            }
            this.Redraw(0);
        }

        else {
            let flag = typeof (startingNode);
            if (flag != "object") {
                if (startingNode == 0 && this.node.length > 1) {
                    this.node.unshift(
                        {
                            cx: x,
                            cy: y,
                            r: 5
                        }
                    );
                }

                else {
                    this.node.push(
                        {
                            cx: x,
                            cy: y,
                            r: 5
                        }
                    );
                }
                this.DrawNode(this.node);
            }

            else {

                if (startingNode != undefined /*&& startingNode.B != undefined*/) {
                    let addnode = {};
                    let preview = {};

                    preview.cx = startingNode.segmento.xA;
                    preview.cy = startingNode.segmento.yA;
                    preview.r = 5;

                    addnode.cx = x;
                    addnode.cy = y;
                    addnode.r = 5;

                    this.node.splice(startingNode.segmento.segmento, 1, preview, addnode);
                    this.Redraw(0);

                }
            }
        }

        //console.log('this.node add: ' + this.node.length);        
    }
    //function que permet obtener le numero de this.node
    /**
    @description Function that let us obtain the index of this.node considering x & y coordinates
    @param {number} x - x coordinate of the clicked point
    @param {number} y - y coordinate of the clicked point
   	@returns {number} The index of the clicked point, -1 otherwise
     */
    getNode(x, y) {
        var dx = 0;
        var dy = 0;
        var result = 0;

        for (var i in this.node) {
            dx = x - this.node[i].cx;
            dy = y - this.node[i].cy;
            //var result =Math.sqrt(dx * dx + dy * dy);
            var result = dx * dx + dy * dy;

            if (result <= 25) {
                //console.log('i: ' + i);
                return i;
            }
        }
        return -1;
    }

    /**
    @description Function to get the 2 nodes that shape the segment
    @param {number} clickedNode - the position on a segment that has been clicked
    @returns {{A: number, B:number, N: number}} An object containing the position of:
    	- the beginning of the sub segment A
    	- the end of the sub segment B
    	- the point clicked N
     */
    getSegment(clickedNode) {
        var pointA = 0, pointB = 0;

        if (clickedNode == 0) {
            //console.log('nodo 0');
            pointA = (parseInt(clickedNode) + 1);
            pointB = (this.node.length - 1);
        }
        else if (clickedNode == (this.node.length - 1)) {
            //console.log('nodo final:' + (this.node.length -1));
            pointA = parseInt((this.node.length - 1) - 1);
            pointB = 0;
        }
        else {
            pointA = (parseInt(clickedNode) + 1);
            pointB = (parseInt(clickedNode) - 1);
        }
        return { A: pointA, B: pointB, N: clickedNode };
    }
    /**
    @description Function to erase the drawCanvas
     */
    canvasUpdate() {
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    }
    /**
    @brief Function to draw lines
    @param {Array<Number>} startingNode the node from which the path begin
    @param {number} x the x endpoint coordinate
    @param {number} y the y endpoint coordinate
     */
    drawHashline(startingNode, x, y) {
        this.DrawnLine(startingNode, x, y);
    }
    /**
    @brief Function to delete a line from the polygon
    @return {void}
     */
    CleanLine() {
        //this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    }
    /**
    @brief Function to know if the current node {this.node} is an endpoint
    @param {Array<Number>} clickedNode - The node that has been clicked
    @return {Boolean} true if the current node is an extremety, false otherwise
     */
    isExtremity(clickedNode) {
        if (clickedNode == 0 || clickedNode == (this.node.length - 1)) {
            return true;
        }
        return false;

    }
    /**
    @brief Function that check if the user close a polygon
    @param {Array<Number>} clickedNode - The node clicked by the user
    @param {Array<Number>} startingNode - The node that started the polygon
    @return {Boolean} true if the polygon has been closed, false otherwise
     */
    closePolygone(clickedNode, startingNode) {
        if (clickedNode == startingNode) {
            return false;
        }
        else if (clickedNode == 0 && startingNode == (this.node.length - 1)) {
            for (var i in this.node) {
                this.context.beginPath();
                this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
                this.context.fillStyle = this.color;
                this.context.fill();
                this.context.stroke();
                this.context.closePath();
            }
            return true;
        }
        else if (clickedNode == (this.node.length - 1) && startingNode == 0) {
            for (var i in this.node) {
                this.context.beginPath();
                this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
                this.context.fillStyle = this.color;
                this.context.fill();
                this.context.stroke();
                this.context.closePath();
            }
            return true;
        }
        return false;
    }
    /**
    @brief Method to move a node (this.node) and the 2 segments linked to it
    @param {Array<Number>} clickedNode - The node we want to drag
    @param {Number} x - The x position we want tot se to the node
    @param {Number} y - The y position we want to set to the node
    @param {} result - The result of the operation
    
    @return {void}
     */
    Drag(clickedNode, x, y, result) {


        //set new values
        this.node[clickedNode].cx = x;
        this.node[clickedNode].cy = y;

        this.node[result.N].cx = x;
        this.node[result.N].cy = y;

        this.Redraw(result);
    }
    /**
    @brief function to keep values from aladin lite & then convert them into drawCanvas values (this.drawCanvas("pixel"))
    @return {void} nothing
     */
    store() {
        //console.log('mesage this.almacenar');
        //console.log('this.skyPositions: ' + this.skyPositions);
        if (this.skyPositions != null) {
            //console.log('this.skyPositions' + this.skyPositions);
            //console.log('this.node' + this.node);					
            this.node = [];
            this.skyPositions.pop();

            for (var k = 0; k < this.skyPositions.length; k++) {
                this.node.push(this.aladinView.world2pix(
                    this.skyPositions[k][0],
                    this.skyPositions[k][1]
                ));
            }

            this.ArrayToObject(this.node);

            this.Redraw(this.node);
        }

    }
    
    restore(points) {
		if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
		this.skyPositions = points;
		this.overlay.addFootprints([A.polygon(this.skyPositions)]);
	}
    /**
    @brief Function to delete polygons from this.aladin lite when one enter the edition mode
    @return {void} nothing
     */
    DeleteOverlay() {
        if (this.overlay != null) {
            //console.log('this.skyPositions: ' + this.skyPositions);
            //console.log('A: ' + typeof(A));
            this.overlay.addFootprints(A.polygon(this.skyPositions));
            this.overlay.removeAll();
            this.overlay.overlays = [];
            //console.log('this.overlay' + this.overlay);			           
        }
    }
    /**
    @brief Function to obtain values from a polygon and create it in aladin lite
    @return {void} nothing
     */
    get() {
        /*
         * When the position are set from outside, the node remains empty while there is edition action.
         *  So if the user want to get back the polygoene without editing it, we have to cancel this method
         */
        if (this.node && this.node.length == 0 && this.skyPositions && this.skyPositions.length > 0) {
            return;
        }
        this.skyPositions = [];
        for (var k = 0; k < this.node.length; k++) {
            this.skyPositions.push(this.aladinView.pix2world(this.node[k].cx, this.node[k].cy));
        }
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });

            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints([A.polygon(this.skyPositions)]);
    }
    /**
    @brief Function to obtain values from polygon and then create this polygon in aladin lite
    @param {Array<Array<Number>>} points - An array of points representing the vertices of our polygon
    @return {void}
     */
    setPolygon(points) {
        this.skyPositions = [];
        for (var k = 0; k < points.length; k++) {
            this.skyPositions.push(points[k]);
        }
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints([A.polygon(this.skyPositions)]); //créer la polygon

        //this.PolygonCenter();
    }
    /**
    @description Function to set an overlay
    @param
     */
    setOverlay(points) {
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
    }
    /**
    @description Function to erase the polygon from drawCanvas 
     */
    CleanPolygon() {
        this.CanvasUpdate();
        this.node = [];
        this.skyPositions = [];		
    }
    /**
    @description Find the polygon in aladin lite if we cannot visualize it on the screen
    */
    PolygonCenter() {
        var view = BasicGeometry.getEnclosingView(this.skyPositions);
        this.aladin.gotoPosition(view.center.ra, view.center.dec);
        this.aladin.setZoom(1.2 * view.size);
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
    }
    /**
    @description Erase node if it is on another node
    @param {number} nodevalue
    @param {boolean} status
    @returns {void}
     */
    //effacer un this.node de le polygone si se trouve sûr autre this.node
    RemoveNode(nodevalue, status) {
        var index = this.node[nodevalue];

        if (this.node.length >= 4) {
            this.node.splice(nodevalue, 1);
            if (status) {
                this.DrawNode(this.node);
            }
            else {
                this.Redraw(0);
            }

        }
    }
    /**
    @description function to obtain the initial & final node of the polygon
    @param {number} x
    @param {number} y
    @returns {{a: Array<number>, b: Array<number>}} The initial node (a) and the final node (b) of the polygon
     */
    GetXYNode(x, y) {
        let nodes = {};

        let dx;
        let dy;

        for (var i in this.node) {
            dx = x - this.node[i].cx;
            dy = y - this.node[i].cy;
            var result = dx * dx + dy * dy;

            if (result <= 25) {
                if (nodes.a == undefined) {
                    nodes.a = i;
                }

                else {
                    nodes.b = i;
                }
            }
        }

        return nodes;
    }
    //metodo que debuelve el numero de nodos del poligono
    GetNodelength() {
        return this.node;
    }
    //crear la grafica
    createGrafic(parametre) {
        this.DrawGrafic(parametre);
    }
    //indicar cuando serrar poligono
    cuadradoIndicador(x, y) {
        this.context.beginPath();
        this.context.fillRect(x, y, 10, 10);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
    stokeNode(nodeposition) {
        if (nodeposition != undefined) {
            let stocknode = [];
            stocknode.push({
                position: nodeposition,
                cx: this.node[nodeposition].cx,
                cy: this.node[nodeposition].cy,
                r: 5
            });

            return stocknode;
        }
        return null;

    }
    getSkyPositions() {
        return this.skyPositions;
    }
    
    handleMouseUpPolygon(event, buttondown, canvas, startingNode, closed, movestart, startdrag, storedNode) {
    	let clickedNode = -1;
		let finalnode;
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		//Ask if the element pressed is a node
		if (buttondown === true && (clickedNode = this.getNode(x, y)) !== -1) {
		    //Ask is the node is a polygon's endpoint
		    if (this.isExtremity(clickedNode) == false) {
		        this.CleanLine();
		        buttondown = false;
		    }
		
		    if (this.closePolygone(clickedNode, startingNode) === true) {					
		        buttondown = false;
		        closed = true;						
		    }
		}
		
		if (closed === true && (finalnode = this.GetXYNode(x, y)) !== null) {
		    if (finalnode.a != undefined && finalnode.b != undefined) {
		        if (startingNode == finalnode.a)
		            this.RemoveNode(finalnode.a, false);
		        else if (startingNode == finalnode.b)
		            this.RemoveNode(finalnode.b, false);
		    }
		}
		
		if (buttondown === true && movestart === true) {
		    if (clickedNode == startingNode && (clickedNode = this.getNode(x, y) != -1))
		    {
		        buttondown = false;
		        movestart = false;
		        this.CleanLine();
		    }
		
		    else {
		        this.addNode(x, y, startingNode);
		        buttondown = false;
		        movestart = false;
		
		        let nodes = this.GetNodelength();
		        let segment = new Segment(nodes);
		
		        let inter = segment.Itersection(this.startingNode, false);
		
		        if (inter !== -1 && inter != undefined) {
		            //poligono abierto = true
		            if (startingNode != 0)
		                this.RemoveNode(inter.nB, true);
		            else
		                this.RemoveNode(inter.nA, true);
		
		            this.CleanLine();
		        }
		    }
		
		}
		else if (buttondown === true && movestart === false) {
		    buttondown = false;
		    movestart = false;
		}
		
		if (startdrag === true) {
		    //console.log('this.startdrag fin');
		    startdrag = false;
		    canvas.css('cursor', 'default');
		
		    //store the node number pushed			
		    let nodes = this.GetNodelength();
		    let segment = new Segment(nodes);
		    let inter = segment.Itersection(startingNode, true);
		    if (inter !== -1 && inter != undefined) {
		        this.RemoveNode(startingNode, false);
		        this.addNode(x, y, storedNode, true);
		    }
		}
		this.canvasUpdate();
		
		return {
			buttondown: buttondown,
			canvas: canvas,
			startingNode: startingNode,
			closed: closed,
			movestart: movestart,
			startdrag: startdrag
		}
	}
	
	handleMouseDownPolygon(event, closed, canvas) {
		let clickedNode = -1;
        let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
        let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
        
        const resultObject = {
			closed: closed,
			canvas: canvas
		};

        //ask if the polygon is empty
        if (this.isEmpty()) {
            this.addNode(x, y);
        }
        //Get segment
        //start the this.drag of the node	
        else if (resultObject.closed == true && (clickedNode = this.getNode(x, y)) != -1) {
            resultObject.result = this.getSegment(clickedNode);
            resultObject.storedNode = this.stokeNode(clickedNode);
            resultObject.startdrag = true;
            resultObject.drag = clickedNode;
            resultObject.startingNode = clickedNode;
            resultObject.canvas.css('cursor', 'move');
        }
        //ask if the focused space is a node 
        else if ((clickedNode = this.getNode(x, y)) != -1) {
            //Ask if the node is an end point of the polygon
            if (this.isExtremity(clickedNode) /*opened polygon*/) {
                //Ask if the polygon is open
                if (closed == true) {
                    resultObject.startingNode = -1;
                    resultObject.buttondown = false;
                }

                else {
                    resultObject.startingNode = clickedNode;
                    resultObject.buttondown = true;
                    resultObject.closed = false;
                }
            }
        }
        //Ask if the point is on a segment
        if (resultObject.closed && clickedNode == -1) {
            let nodes = this.GetNodelength();

            let segment = new Segment(nodes);
            let option = segment.IsCursorOn(x, y);

            if (option != undefined) {
				switch(option.flag) {
					case "vertical": {
						this.addNode(x, y, option);
						break;
					}
					case "horizontal": {
						this.addNode(x, y, option);
						break;
					}
					case "distancia": {
						this.addNode(x, y, option);
						break;
					}
					default: {
						console.error(`Flag ${option.flag} not recognized!`);
					}
				}
            }
        }
        return resultObject;
	}
	
	handleMouseMove(event, canvas, buttondown, startingNode, drag, result, startdrag) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
        let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
        //console.log(`x:${x}, y:${y}`);
        let movestart = null;

        //Ask if a node was pressed
        if (buttondown == true && startingNode != -1) {
            movestart = true;
            this.drawHashline(startingNode, x, y, result);
        }
        else if (startdrag) {
            this.Drag(drag, x, y, result);	
        }
        return movestart;
	}
}
;console.log('=============== >  PolygonModel.js ');
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
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */

class ConeModel {
    constructor(drawCanvas, staticCanvas, aladinView, tolerance, colorValidated) {
        this.centerNode = {};
        this.radiusNode = {};
        this.drawCanvas = drawCanvas[0];
        this.staticCanvas = staticCanvas[0];
        this.context = this.drawCanvas.getContext('2d');
        this.staticContext = this.staticCanvas.getContext('2d');
        this.overlay = null;
        this.skyConeDescriptor = null;
        this.aladinView = aladinView;
        this.color = colorValidated;
        
        this.isCursorOnCircle = false;
        this.isCursorOnCenter = false;
        
        this.tolerance = tolerance;

		/**************************************
		************* Some tests **************
		***************************************/
		
		/*
        this.centerNode = {cx: 608, cy: 232};
        this.radius = 100;
        this.get();
        */
    }
    /**
    @description Function to draw the central node of the cone on the canvas
    @param {number} centerX
    @param {number} centerY
     */
    DrawCentralNode(centerX, centerY, color) {
        this.context.beginPath();
        this.context.arc(centerX, centerY, 5, 0, Math.PI * 2, true);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.strokeStyle="black";
        this.context.stroke();
        this.context.closePath();
    }
    /**
    @description Function to draw the circle once it was validated by the user
    @param {number} centerX
    @param {number} centerY
    @param {number} radius
     */
    DrawCompletedCircle(centerX,centerY,radius) {
		this.drawCircle(centerX, centerY, radius, "lime");
	}
	/**
	@description Function to draw the circle during the setting
	@param {number} centerX
    @param {number} centerY
    @param {number} radius
	 */
    DrawGuidelineCircle(centerX,centerY,radius) {
		this.drawCircle(centerX, centerY, radius, "lime");
	}
	/**
	@description Function to draw a circle with a focused color
	@param {number} centerX
    @param {number} centerY
    @param {number} radius
    @param {string} color
	 */
    drawCircle(centerX, centerY, radius, color) {
		if (radius < 0) {
			radius = Math.abs(radius);
			console.error("The radius is negative!");
		}
		this.context.beginPath();
		this.context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		this.context.strokeStyle = color;
		this.context.stroke();
		this.context.closePath();
	}
	
	/**
	@description Function to place the center of the circle
	@param {number} centerX The x coordinate of the center placed on the canvas
	@param {number} centerY The y coordinate of the center placed on the canvas
	 */
	placeCenter(centerX,centerY) {
		this.centerNode = {
			cx: centerX,
			cy: centerY
		}
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy, "blue");
	}
	
	/**
	@description Function to update the size of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	 */
	updateCircleSize(cursorX,cursorY) {
		let radiusSquared = Math.pow(cursorX-this.centerNode.cx,2) + Math.pow(cursorY-this.centerNode.cy,2);
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy,"blue");
		this.DrawGuidelineCircle(this.centerNode.cx,this.centerNode.cy,Math.sqrt(radiusSquared));
	}
	
	/**
	@description Function to set the size of the circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	 */
	setCircleSize(cursorX,cursorY) {
		this.radiusNode = {
			cx: cursorX,
			cy: cursorY
		}
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy,this.color);
		this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
	}
	
	/**
	@description Function to update the position of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	@param {number} radius The radius of the circle one are trying to move
	 */
	updateCirclePosition(cursorX,cursorY,radius) {
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawGuidelineCircle(cursorX,cursorY,radius);
		this.DrawCentralNode(cursorX,cursorY,"blue");
	}
	
	/**
	@description Function to set the position of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	@param {number} radius The radius of the circle one are trying to move
	 */
	setCirclePosition(cursorX,cursorY) {
		let variationVector = {
			vx: cursorX-this.centerNode.cx,
			vy: cursorY-this.centerNode.cy
		};
		
		this.radiusNode = {
			cx: this.radiusNode.cx+variationVector.vx,
			cy: this.radiusNode.cy+variationVector.vy
		}
		
		this.centerNode = {
			cx: cursorX,
			cy: cursorY
		}
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy,this.color);
		this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
	}
	/**
	@description Method to verify that the cone has a center node set & a radius set
	@returns {boolean} True if the cone is complete, false in other cases
	 */
	isConeComplete() {
		return this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& this.radiusNode !== null
			&& Object.keys(this.radiusNode).length === 2
			&& this.skyConeDescriptor !== null;
	}
	
	/**
	@description Method to check if user has, at least, started to draw a cone.
	@return {boolean} True if a cone was drawn, false in other cases.
	 */
	isConeDrawn() {
		return this.centerNode !== null && Object.keys(this.centerNode).length === 2;
	}
	
	/**
    @brief Function to obtain values from a cone and create it in aladin lite
    @return {void}
     */
    get() {
        /*
         * When the position are set from outside, the node remains empty while there is edition action.
         *  So if the user want to get back the cone without editing it, we have to cancel this method
         */
        if (this.centerNode && Object.keys(this.centerNode).length == 0 && this.skyConeDescriptor && this.skyConeDescriptor.length > 0)
            return;
            
        this.skyConeDescriptor = this.buildSkyConeDescriptor(this.centerNode,this.radiusNode);
        //this.testSuccessiveConversion(this.centerNode.cx,this.centerNode.cy, 20);

        if (this.overlay === null) {
            this.overlay = A.graphicOverlay({ color: this.color });

            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints(
			[A.circle(
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1],
				this.skyConeDescriptor.radius
			)]
		);
    }
    
    /**
    @description Small function to simulate the shift of the polygon
     */
    testSuccessiveConversion(pixX,pixY, iterations) {
		let pixObject = {cx: pixX, cy: pixY};
		let skyObject = {};
		console.log("============== TESTS BEGINS ==============");
		for (let  i = 0; i < iterations; ++i) {
			console.log("pixObject : ",pixObject);
			let skyToConvert = this.aladinView.pix2world(pixObject.cx, pixObject.cy);
			skyObject = {cx: skyToConvert[0], cy: skyToConvert[1]};
			
			console.log("skyObject : ", skyObject);
			let pixToConvert = this.aladinView.world2pix(skyObject.cx, skyObject.cy);
			pixObject = {cx: pixToConvert[0], cy: pixToConvert[1]};
		}
		console.log("================ END TESTS ================");
	}
    /**
    @description Function to erase the polygon from drawCanvas 
     */
    CleanCone() {
        this.CanvasUpdate();
        this.centerNode = {};
        this.radiusNode = {};
        this.skyConeDescriptor = null;
    }
    /*
    /**
    @description Function to get an enclosing view from BasicGeometry of the cone
    @returns {*} An enclosing view of the cone

    getView() {
		let skyPositions = [this.skyConeDescriptor];
		if (this.skyConeDescriptor.skyNode[1] > 0) {
			// One takes a radius that point to the south
			skyPositions.push([
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1] - this.radius
			]);
		} else {
			// Else, one takes a radius that point to the north
			skyPositions.push([
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1] + this.radius
			]);
		}
        
        return BasicGeometry.getEnclosingView(skyPositions);
	}
	*/
    /**
    @description Find the cone in aladin lite if we cannot visualize it on the screen
    */
    ConeCenter() {
		let view  = this.getView();
		
        this.aladin.gotoPosition(view.center.ra, view.center.dec);
        this.aladin.setZoom(1.2 * view.size);
    }
    
    /**
    @description Function to build the skyConeDescriptor property
    @param {{cx: number, cy: number}} centerNode The central node of the cone
    @param {{cx: number, cy: number}} radiusNode A node on the cone
    @returns {{skyNode: Array<number>, radius: number}} A sky cone descriptor object describing the cone
     */
    buildSkyConeDescriptor(centerNode, radiusNode) {
		//console.log("Before pix2world: ", centerNode, radiusNode);
		let skyPositionsCenterNode = this.aladinView.pix2world(centerNode.cx, centerNode.cy);
		let skyPositionsRadiusNode = this.aladinView.pix2world(radiusNode.cx, radiusNode.cy);
		//let pointBelongCircle;
		// If dec > 0 i.e. If one is in the north hemisphere
		/*
		if (skyPositionsCenterNode[1] > 0) {
			// One takes a radius that point to the south
			pointBelongCircle = centerNode.cy - radius;
		} else {
			// Else, one takes a radius that point to the north
			pointBelongCircle = centerNode.cy + radius;
		}
		*/
		
		//let skyPositionPointBelongCircle = this.aladinView.pix2world(centerNode.cx,pointBelongCircle);
		//let skyRadius = skyPositionPointBelongCircle[1] - skyPositionsCenterNode[1];
		let skyRadius = BasicGeometry.distanceBetweenNodes(skyPositionsRadiusNode,skyPositionsCenterNode);

        let skyConeDescriptor = {
			skyNode: skyPositionsCenterNode,
			skyRadiusNode: skyPositionsRadiusNode,
			radius: skyRadius
		}
		
		return skyConeDescriptor;
	}
    
    /**
    @description Function to obtain values from cone and then create this cone in aladin lite
     */
    setCone(centerX,centerY,radiusX,radiusY) {
        this.skyConeDescriptor = this.buildSkyConeDescriptor({cx: centerX, cy: centerY},{cx: radiusX, cy: radiusY});
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints(
			[A.circle(
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1],
				this.skyConeDescriptor.radius
			)]
		); //Create a circle

    }
    
    /**
    @description Function to delete cones from this.aladinlite when one enter the edition mode
     */
    DeleteOverlay() {
        if (this.overlay != null) {
			if (this.skyConeDescriptor) {
	            this.overlay.addFootprints(
					A.circle(
						this.skyConeDescriptor.skyNode[0],
						this.skyConeDescriptor.skyNode[1],
						this.skyConeDescriptor.radius
					)
				);
			}
			
            this.overlay.removeAll();
            this.overlay.overlays = [];		           
        }
    }
    
    /**
    @description Function to avoid that an unfinished circle stay stored
     */
    killStoring() {
		this.skyConeDescriptor = null;
		this.overlay = null;
	}
	
	convertSkyNodes(skyNode,skyRadiusNode) {
		let convertedCenterNode = this.aladinView.world2pix(
            skyNode[0],
            skyNode[1]
        );
        let convertedRadiusNode = this.aladinView.world2pix(
			skyRadiusNode[0],
			skyRadiusNode[1]
		);
		//console.log("After world2pix: ",convertedCenterNode,convertedRadiusNode);
		/** 
		@tofix
		/!\ Adding +1 to the coordinates is an awful solution but it is the simplest
			one that we can implement for now.
			AladinLite make a floor operation to convert the world coordinate into 
			integer/pixel coordinates. It should at least use a round function
			to avoid the continuous shift.
			The best solution would be to have a world2float function in aladin instead.
			In this case we could avoid these shifts and keep a constant value.
		*/
		this.centerNode = {cx: convertedCenterNode[0]+1, cy: convertedCenterNode[1]+1};
		this.radiusNode = {cx: convertedRadiusNode[0]+1, cy:convertedRadiusNode[1]+1};
	}
    
    /**
    @description function to keep values from aladin lite & then convert them into canvas values (this.canvas("pixel"))
     */
    store() {
        if (this.skyConeDescriptor !== null && this.skyConeDescriptor.skyNode !== null && !isNaN(this.skyConeDescriptor.skyRadiusNode[0])) {
			this.convertSkyNodes(this.skyConeDescriptor.skyNode,this.skyConeDescriptor.skyRadiusNode);
			
			//console.log("Call redraw");
            this.Redraw();
        } else {
			this.CleanCone();
		}

    }
    
    restore(ra,dec,radius,skyRadiusNode) {
		let localSkyRadiusNode = null;
		
		// Compatibility feature
		if (!skyRadiusNode) {
			localSkyRadiusNode = [ra+radius,dec];
		} else {
			localSkyRadiusNode = skyRadiusNode;
		}
		this.skyConeDescriptor = {
			skyNode: [ra,dec],
			skyRadiusNode: localSkyRadiusNode,
			radius:radius
		}
		
		this.convertSkyNodes(this.skyConeDescriptor.skyNode,this.skyConeDescriptor.skyRadiusNode);
		
		if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints(
			[A.circle(
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1],
				this.skyConeDescriptor.radius
			)]
		); //Create a circle
	}
    
    /**
    @description Method to compute a circle radius in pixels given the 
    center and a point that belong to the circle
    @param {{cx: number, cy: number}} centerNode The central node of the circle
    @param {{cx: number, cy: number}} radiusNode A node on the circle
    @return {number} the radius of the circle
     */
    computeRadius(centerNode,radiusNode) {
		return Math.sqrt(
			Math.pow(centerNode.cx-radiusNode.cx,2) +
			Math.pow(centerNode.cy-radiusNode.cy,2)
		)
	}
    
    /**
    @description Draw again the lines and the nodes stored
     */
    Redraw() {
        this.CanvasUpdate();
        this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy,this.color);
        this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
    }

    /**
    @description Clean the draw Canvas
     */
    CanvasUpdate() {
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
    }
    
    /**
    @description Method to calculate the distance of the point Point(x,y)
    from the center of the point this.centerNode.
    @param {number} x - x coordinate of the point we want to know the distance from center
    @param {number} y - y coordinate of the point we want to know the distance from center
    @returns {number} The distance of Point(x,y) to the center of the circle
     */
    computeCenterDistanceTo(x,y) {
			let centerX = this.centerNode.cx;
			let centerY = this.centerNode.cy;
			let distToCenter = Math.sqrt(Math.pow(centerX-x,2)+Math.pow(centerY-y,2));
			
			return distToCenter;
	}
    
    /**
    @description Method to handle the movement of the mouse
    @param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
     */
    handleMouseMove(event,canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		//Modify size of the circle while the user is moving his/her cursor
		if ( this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& (this.radiusNode === null
			|| Object.keys(this.radiusNode).length === 0)
		) {
			this.updateCircleSize(x,y);
		// Modify position of the circle if the user is holding the center
		} else if (this.isCursorOnCenter) {
			this.updateCirclePosition(x,y,this.computeRadius(this.centerNode,this.radiusNode));
		// Modify size of the circle if the user is holding the edge of the circle
		} else if (this.isCursorOnCircle) {
			this.updateCircleSize(x,y);
		} else {
			let radius = this.computeRadius(this.centerNode,this.radiusNode);
			let distToCenter = this.computeCenterDistanceTo(x,y);
			
			if (distToCenter < this.tolerance) {
				this.drawCanvas.style.cursor = "pointer";
			} else if (Math.abs(distToCenter-radius) < this.tolerance) {
				this.drawCanvas.style.cursor = "pointer";
			} else {
				this.drawCanvas.style.cursor = "unset";
			}
		}
	}
	
	/**
	@description Method to handle the end of a mouse click on the canvas
	@param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
	 */
	handleMouseUp(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		// Place the point if no other point has been placed
		if (this.centerNode === null || Object.keys(this.centerNode).length === 0) {
			this.placeCenter(x,y);
		} else if (
			this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& (
				this.radiusNode === null
				|| Object.keys(this.radiusNode).length === 0
			)
		) {
			this.setCircleSize(x,y);
		} else if (this.isCursorOnCircle) {
			this.setCircleSize(x,y);
			this.drawCanvas.style.cursor = "unset";
		} else if (this.isCursorOnCenter) {
			this.setCirclePosition(x,y);
			this.drawCanvas.style.cursor = "unset";
		}
		this.isCursorOnCenter = false;
		this.isCursorOnCircle = false;
	}
	
	/**
	@description Method to handle the beginning of a mouse click on the canvas
	@param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
	 */
	handleMouseDown(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		if (this.isConeComplete()) {
			let radius = this.computeRadius(this.centerNode,this.radiusNode);
			let distToCenter = this.computeCenterDistanceTo(x,y);
			
			if (distToCenter < this.tolerance) {
				this.drawCanvas.style.cursor = "grabbing";
				this.isCursorOnCenter = true;
			} else if (Math.abs(distToCenter-radius) < this.tolerance) {
				this.drawCanvas.style.cursor = "grabbing";
				this.isCursorOnCircle = true;
			}
		}
	}
}

;console.log('=============== >  ConeModel.js ');
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
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */
/**
 * @author michel
 *
 */
 
const Models = {
	Polygon: Symbol("polygon"),
	Cone: Symbol("cone")
}

class RegionEditor_mvC {
    constructor(params) {
	
		this.editorState = "empty";
	
		this.tolerance = 8; //Tolerance in pixels
		this.color = params.color;

        this.polygonModel = new PolygonModel(
			params.points,
			params.handler,
			params.drawCanvas,
			params.staticCanvas,
			params.aladinView,
			this.color
		);

        this.coneModel = new ConeModel(
			params.drawCanvas,
			params.staticCanvas,
			params.aladinView,
			this.tolerance,
			this.color
		);
		this.aladinLite_V = params.aladinView;
        this.focusedModel = Models.Polygon;
        
        this.canvas = params.drawCanvas;
        this.clientHandler = params.handler;
        this.startingNode = -1;
        this.buttondown = false;
        this.closed = false;
        this.movestart = false;
        this.startdrag = false;
        this.drag = null;
        this.result = -1;
        this.storedNode;
        
        this.data = null;
    }
    /**
    @description Method to siwtch between the two provided models
     */
    switchModel() {
		this.CleanCanvas();
		if (this.focusedModel === Models.Polygon) {
			this.focusedModel = Models.Cone;
		} else {
			this.focusedModel = Models.Polygon;
		}
	}
	
	/**
	@description Function to get the status of this controller
	@returns {string} some useful data about the controller
	 */
    getStatus() {
        return `startingNode=${this.startingNode}
        	 buttondown=${this.buttondown}
        	 closed=${this.closed}
        	 movestart=${this.movestart}
        	 startdrag=${this.startdrag}
        	 drag=${this.drag}
        	 result=${this.result}
        	 storedNode=${this.storedNode}`;
    }
    /**
     @description Method to handle the beginning of a mouse click on the drawing canvas
     @param {Event} event event containing the position of the cursor
     */
    mouseDown(event) {

		if (this.focusedModel === Models.Polygon) {
	        const modelReturn = 
	        	this.polygonModel.
	        	handleMouseDownPolygon(event, this.closed, this.canvas);
			
	        this.closed = modelReturn.closed;
			this.canvas = modelReturn.canvas;
			
	        this.buttondown = "buttondown" in modelReturn ? modelReturn.buttondown : this.buttondown;
	        this.result = "result" in modelReturn ? modelReturn.result : this.result;
			this.storedNode = "storedNode" in modelReturn ? modelReturn.storedNode : null;
			this.startdrag = "startdrag" in modelReturn ? modelReturn.startdrag : this.startdrag;
			this.drag = "drag" in modelReturn ? modelReturn.drag : this.drag;
			this.startingNode = "startingNode" in modelReturn ? modelReturn.startingNode : this.startingNode;
		} else if (this.focusedModel === Models.Cone) {
			this.coneModel.handleMouseDown(event,this.canvas);
		}
    }
    
    
    /**
     @description Method to handle the movement of the mouse on the drawing canvas
     @param {Event} event event containing the position of the cursor
     */
    mouseMove(event) {
		if (this.focusedModel === Models.Polygon) {
			let resultHandler = this.polygonModel.handleMouseMove(
				event,
				this.canvas,
				this.buttondown,
				this.startingNode,
				this.drag,
				this.result,
				this.startdrag
			);
			this.movestart = resultHandler ? resultHandler : this.movestart;
		} else if (this.focusedModel === Models.Cone) {
			this.coneModel.handleMouseMove(event,this.canvas);
		}
    }
    
    /**
     @description Method to handle the end of a mouse click on the drawing canvas
     @param {Event} event event containing the position of the cursor
     */
    mouseUp(event) {
		if (this.focusedModel === Models.Polygon) {
			const modelReturn = 
				this.polygonModel.
				handleMouseUpPolygon(
					event,
					this.buttondown,
					this.canvas,
					this.startingNode,
					this.closed,
					this.movestart,
					this.startdrag,
					this.storedNode
				);
			
			this.buttondown = modelReturn.buttondown;
			this.canvas = modelReturn.canvas;
			this.startingNode = modelReturn.startingNode;
			this.closed = modelReturn.closed;
			this.movestart = modelReturn.movestart;
			this.startdrag = modelReturn.startdrag;
		} else if (this.focusedModel === Models.Cone) {
			this.coneModel.handleMouseUp(event,this.canvas);
		}
		this.editorState = "modified";
    }
    
    /**
    @description Method to store a shape in memory to get it again when one laucnh the drawing canvas again
     */
    store() {
		if (this.focusedModel === Models.Polygon) {
	        this.polygonModel.store();
        } else if (this.focusedModel === Models.Cone) {
			this.coneModel.store();
		}
    }
    
    /**
    @description Function to obtain values from a shape and create it in aladin lite
     */
    get() {
        if (this.focusedModel === Models.Polygon) {
	        this.polygonModel.get();
        } else if (this.focusedModel === Models.Cone) {
			this.coneModel.get();
		}
    }
    /**
    @description Function to delete an overlay
     */
    DeleteOverlay() {
	    this.polygonModel.DeleteOverlay();
		this.coneModel.DeleteOverlay();
    }
    /**
    @description Function to clean the canvas
     */
    CleanCanvas() {
        if (this.focusedModel === Models.Polygon) {
	        this.polygonModel.CleanPolygon();
        } else if (this.focusedModel === Models.Cone) {
			this.coneModel.CleanCone();
		}
		this.editorState = "erased";
        this.closed = false;
    }
    
    /**
    @description Function to center the figure on the screen
     */
    ShapeCenter() {
        if (this.focusedModel === Models.Polygon) {
	        this.polygonModel.PolygonCenter();
        } else if (this.focusedModel === Models.Cone) {
			this.coneModel.ConeCenter();
		}
    }
    
    /**
    @description Method to send an alert with all the useful informations
     */
    show() {
        if (this.focusedModel === Models.Polygon) {
	        alert(this.polygonModel.getSkyPositions());
        } else if (this.focusedModel === Models.Cone) {
			alert(this.coneModel.skyConeDescriptor);
		}
    }
    /**
     * Set the polygon with points. Points is a simple array. It must have at
     * least 6 values (3pts) and an even number of points
     * @param {Array} points  [a,b,c,.....]
     * @returns {Boolean} true if the polygon is OK
     */
    setPolygon(points) {
        this.polygonModel.setPolygon(points);
        this.closed = true;
        this.invokeHandler(false);
        return true;
    }
    
    storeData(userAction,background = null) {
		if (this.focusedModel === Models.Polygon) {
			if (this.isPolygonClosed()) {
				//Compute the region size in degrees
				//let view = BasicGeometry.getEnclosingView(this.polygonModel.skyPositions);
				if (!this.polygonModel.skyPositions || !this.polygonModel.skyPositions.length) {
					this.data = null;
				} else {
					this.data = {
					    isReady: true,
					    userAction: userAction,
					    editorState: this.editorState,
					    img: this.aladinLite_V.getAladinImg(400,400),
					    region: {
					        format: "array2dim",
					        color: this.color,
					        points: this.polygonModel.skyPositions
					    }
					}
					if (background) {
						this.data.background = background;					
					} else if (background in this.data) {
						delete this.data.background;
					}
				}
	        } else {
	            console.error("Polygon not closed");
	        }
		} else if (this.focusedModel === Models.Cone) {
			if (this.coneModel.isConeComplete() && this.coneModel.isConeDrawn()) {
				//let view = this.coneModel.getView();
				this.data = {
				    isReady: true,
				    userAction: userAction,
				    editorState: this.editorState,
				    img: this.aladinLite_V.getAladinImg(400,400),
				    region: {
				        format: "cone",
				        color: this.color,
				        ra: this.coneModel.skyConeDescriptor.skyNode[0],
				        dec: this.coneModel.skyConeDescriptor.skyNode[1],
				        radius: this.coneModel.skyConeDescriptor.radius,
				        skyRadiusNode: this.coneModel.skyRadiusNode
				    }
				}
				if (background) {
					this.data.background = background;
				} else if (background in this.data) {
					delete this.data.background;
				}
			} else {
				this.data = null;
				this.coneModel.killStoring();
				if (this.coneModel.isConeDrawn()) {
					console.error("Cone is not finished!");
				}
				this.CleanCanvas();
			}
		}
		this.editorState = "accepted";
		//console.log("data in RegionEditor_c",this.data);
		return JSON.parse(JSON.stringify(this.data));
	}
    /**
        @description Call the client handler when the polygon is close or when the user click on accept
     
        @description
        The data passed to the user handler look like that:
        <pre><code>
        {
            isReady: true,             // true if the polygone is closed
            userAction: userAction,     // handler called after the user have clicked on Accept
            region : {
                format: "array2dim",    // The only one suported yet [[x, y]....]
                points: this.polygonModel.skyPositions  // array with structure matching the format
                size: {x: , y:} // regions size in deg
            }
        }
        </code></pre>
        @param {Boolean} userAction - Tell the Handler if it is required that he made an action
        @param {object} background - An object sharing the same aspect as `this.data`
        @return {void}
     */
    invokeHandler(userAction,background) {
		this.storeData(userAction,background);
		if (this.data) {
			this.clientHandler(this.data);
		}
    }
    
    /**
    @description Method to check if a polygon is closed
    @returns True if the polygon is closed, false else
     */
    isPolygonClosed() {
        return (this.closed || (this.polygonModel.node == undefined || this.polygonModel.node.length == 0));
    }
    
    restore(region) {
		if (region.format === "array2dim") {
			this.polygonModel.restore(region.points);
		} else {
			this.coneModel.restore(region.ra,region.dec,region.radius,region.skyRadiusNode);
		}
	}
}

;console.log('=============== >  RegionEditor_c.js ');
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
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */ 

class RegionPanelV {
	/**
	@brief View of the RegionEditor service
	@param {AladinLiteX_mVc} aladinLite_V - The aladin lite view that will handle the result of the selection
	@param {Element}  aladinLiteDivId
	@param {Element} contextDivId
	@param {Array<{name: string, divId: string, color: string, isSource: boolean, handler: function}>} regionEditorHandlers - Handlers of the shapes drawn
	@param {Frame} defaultRegion
	 */
    constructor(aladinLite_V, aladinLiteDivId, contextDivId, regionEditorHandlers, defaultRegion) {
        this.aladinLiteDivId = aladinLiteDivId;
        this.editorContainer = null;
        this.editorDescriptors = regionEditorHandlers;
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        this.editionFrame = defaultRegion;
		this.currentData = null;
		this.cutButton = null;
        
        this.sourceRegionEditor = null;
        this.backgroundRegionEditors = [];
        
        this.regionEditors = []
    }
    init() {
		this.aladinLiteDiv = this.aladinLiteDiv == null ? $(`#${this.aladinLiteDivId}`) : this.aladinLiteDiv;
        this.contextDiv = this.contextDiv == null ? $(`#${this.contextDivId}`) : this.contextDiv;
        
        if (!AladinLiteX_mVc.regionEditorInit && this.editorDescriptors.length !== 0) {
            
            /***********************************************************
            ************ Button to cut the region editor ***************
            ************************************************************/
            
            this.cutButton = $('<button class="alix_btn cut-region-editor" onclick="AladinLiteX_mVc.regionEditor();"></button>');            
            this.contextDiv.append(this.cutButton);
            
            this.cutButton.on('click', () => {
				this.contextDiv.css("display","none");
			});
            
            /***********************************************************
            ******** Header & container Region Editors creation ********
            ************************************************************/

            this.contextDiv.append('<h3 class="widget-title">Region Editor Mode</h3>');
            
            this.contextDiv.append('<div class="editor-container" id="region-editors"></div>');
            this.editorContainer = $('#region-editors.editor-container');
            
            /************************************************************
            ******* Label to show in which mode the user is *************
            *************************************************************/
            
            this.modeDisplayer = $(`<div class="editor-mode-shower">Browse Mode</div>`);
            this.aladinLiteDiv.append(this.modeDisplayer);
            
            /************************************************************
            ************ Panels for the different editors ***************
            *************************************************************/
            
            this.panelsDisplayer = $(`<div class="panel-tabs-container"></div>`);
            this.panelHeaders = $(`<div class="panel-header"></div>`);
            this.panelBody = $(`<div class="panel-body"></div>`);
            
            this.panelsDisplayer.append(this.panelHeaders,this.panelBody);
            this.editorContainer.append(this.panelsDisplayer);
            
			/*************************************************************
			**************** Region Editor Registration ******************
			**************************************************************/
			//console.log(this.editorDescriptors);
			for (let regionEditor of this.editorDescriptors) {
	            const editorDiv = $(`<div id="${regionEditor.divId}" class="region-editor"></div>`);
	            this.panelBody.append(editorDiv);
	            
	            const newEditor = new RegionEditor_mVc(
					regionEditor.name,
					this.aladinLite_V,
					this.aladinLiteDivId,
					regionEditor.divId,
					regionEditor.handler,
					this.editionFrame,
					this.panelHeaders,
					regionEditor.color
				)
				if (regionEditor.isSource) {
					this.sourceRegionEditor = newEditor;
				} else {
					editorDiv.css({"display": "none"});
					this.backgroundRegionEditors.push(newEditor);
				}
				this.regionEditors.push(newEditor);				
			}
			
			this.focusRegionEditor(this.sourceRegionEditor);
			this.initHeaderTabBtnListeners();
			this.manageButtonActivated();
			this.controlAcceptation();
        }
    }
    
    initHeaderTabBtnListeners() {
		for (const regionEditor of this.regionEditors) {
			regionEditor.headerButton.on("click", (event,regionPanelInstance=this) => {
				regionPanelInstance.focusRegionEditor(regionEditor);
			});
		}
	}
    
    /**
    @param {RegionEditor_mVc} regionEditor
     */
    focusRegionEditor(focusedRegionEditor) {
		focusedRegionEditor.focusEditor();
		for (const regionEditor of this.regionEditors) {
			if (regionEditor !== focusedRegionEditor) {
				regionEditor.hideEditor();
			}
		}
	}
	
	/**
	@description Method to clean all the shapes on the region editors
	 */
	clean() {
		for (let regionEditor of this.regionEditors) {
			console.log(regionEditor.regionEditorName,"cleaned");
			regionEditor.controller.CleanCanvas();
            regionEditor.controller.DeleteOverlay();
		}
	}
    
    /**
    @todo
    */
    manageButtonActivated() {
		for (const regionEditor of this.regionEditors) {
			regionEditor.contextDiv.on(
				"canvas-shown",(event, regionPanel=this) => {
					regionPanel.modeDisplayer.html(`Edition Mode`);
					for (const editor of regionPanel.regionEditors) {
						if (editor !== regionEditor) {
							editor.muteRegionEditor();
						}
					}
				}
			);
			regionEditor.contextDiv.on(
				"canvas-hidden",(event, regionPanel=this) => {
					regionPanel.modeDisplayer.html(`Browse Mode`);
					for (const editor of regionPanel.regionEditors) {
						if (editor !== regionEditor) {
							editor.unmuteRegionEditor();
						}
					}
				}
			);
		}
	}
	
	controlAcceptation() {
		const sourceRegionEditor = this.sourceRegionEditor;
        const backgroundRegionEditors = this.backgroundRegionEditors;
        
		this.sourceRegionEditor.setBtn.on('click', (event) => {
			event.stopPropagation();
			let data_array = [];
			for (const regionEditor of backgroundRegionEditors) {
				if (regionEditor.controller.data) {
					data_array.push(regionEditor.controller.data);
				}
			}
			sourceRegionEditor.controller.invokeHandler(true,data_array);
			//console.log(sourceRegionEditor.controller.data,data_array);
        });
        for (const regionEditor of this.backgroundRegionEditors) {	
			regionEditor.setBtn.on('click', (event) => {
				if (regionEditor.controller.editorState === "erased") {					
		            sourceRegionEditor.controller.editorState = "modified";
				} else if (regionEditor.controller.editorState !== "empty") {
					sourceRegionEditor.controller.editorState = regionEditor.controller.editorState;
				}
	            regionEditor.controller.invokeHandler(true);
	            event.stopPropagation();
	        });
	        regionEditor.deleteBtn.on('click', (event) => {
				sourceRegionEditor.controller.editorState = "modified";
			});
		}
		
	}
	
	storeData() {
		if (this.sourceRegionEditor) {
			let data_array = [];
			for (const regionEditor of this.backgroundRegionEditors) {
				regionEditor.setBrowseMode();
				regionEditor.controller.storeData(true);
				if (regionEditor.controller.data) {
					data_array.push(regionEditor.controller.data);
				}
			}
			this.sourceRegionEditor.setBrowseMode();
			return this.sourceRegionEditor.controller.storeData(true, data_array);
		}
		return null;
	}
	
	/**
	@description Method to restore all the regionEditors state
	@param {{isReady: bool, userAction: bool, region: object, background: Array}} data - The data to restore the editor
	 */
	restoreEditors(data) {
		if (this.editorContainer === null) {
			this.init();
		}
		this.clean();
		if ("region" in data) {
			this.sourceRegionEditor.restore(data.region);
		}
		if ("background" in data) {
			let i = 0;
			for(let background of data.background) {
				if("region" in background) {					
					this.backgroundRegionEditors[i].restore(background.region);
				}
			}
		}	
	}
}

var browseSaved = null;

;console.log('=============== >  RegionPanel_v.js ');
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
			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
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
			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
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

			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
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

			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
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
};console.log('=============== >  HipsSelector_m.js ');
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
			if(cmdNode.attr("class") == "alix_simbad_in_menu  alix_datahelp" ){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_simbad_in_menu  alix_datahelp_selected");
				cmdNode.css("color", color);
				 $("#btn-Simbad-configure").css("color", color);
				 $("#btn-Simbad-flash").css("color", color);
				self.model.aladinLite_V.displayCatalog(name, color, VizierCatalogue.showSourceData, url);
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
			var label = aladinLiteView.masterResource.affichage.label;
			var self = this;
			var name = 'Swarm';
			var cmdNode = $("#XMM");
			var clickType = 'handler';
			var color= '#ff0000';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			if(!cmdNode.text().includes(label)){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");
				cmdNode.css("color", color);
				$("#btn-XMM-description").css("color" , color);
				$("#btn-XMM-flash").css("color" ,color);
				$("#btn-XMM-configure").css("color" ,color);
				if(cmdNode.text().includes("3XMM Catalogue"))
					$("#ACDS").css("display" , "inline");
				self.model.aladinLite_V.displayCatalog(name, "#ff0000", clickType, url);
			}
			else if(cmdNode.attr("class") == "alix_XMM_in_menu  alix_datahelp"){
//				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false){
//					WaitingPanel.warnFov();
//				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-XMM-description").css("color" , color);
					$("#btn-XMM-flash").css("color" ,color);
					$("#btn-XMM-configure").css("color" ,color);
					if(cmdNode.text().includes("3XMM Catalogue"))
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
				SimbadCatalog.displayCatalogFiltered();
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
};console.log('=============== >  HipsSelector_v.js ');
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
}();console.log('=============== >  SwarmDynamicFilter.js ');
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

/**
@brief Handler to handle the seection of a particular shape
@param {Object} data - The data containing all the needed informations to send back a message to the user.
It has the following shape :
<pre><code>
{
	isReady: Boolean,             // true if the polygone is closed
    userAction: userAction,     // handler called after the user have clicked on Accept
    region : {
        format: {"array2dim","cone"},    // The only one suported yet [[x, y]....]
        points: Array<Array<Number>>  // array with structure matching the format
        size: {x: , y:} // regions size in deg
	}
}
</code></pre>
 */
var regionEditorHandlers = [];

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
	},
	regionEditorHandlers: regionEditorHandlers
	
}

var externalConf;
var mixConf = function(localData,externalData) {   
	
	for(let key in externalData){
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
		localConf = mixConf(localConf,externalConf);
	}
	AladinLiteX_mVc.init(localConf);
} /////!!!Cant't add () ,cause configureALIX is called later by external project, not by himself











;console.log('=============== >  ConfigureALiX.js ');
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
		var name = (data.data) ? data.catalog.name : "Alix Master Catalogue"
		var source_label = ""
		if (data.data ) {
			if(data.data.CatalogName){
				name = data.data.CatalogName;
			}
			if(data.data.name){
				source_label = "<span class=strong style='font-size: 15px;'><center><strong>" + data.data.name + "</center></strong></span>";
			}
		}
		 SourceDiv.html("<span class=strong style='font-size: 15px;'><center><strong>" + name + "</center></strong></span>\n"
					+ '<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
					+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
					+ '<span class="glyphicon_SourceClose glyphicon-remove"></span></a>'
					+ source_label
					+ "<span class=strong style='font-size: 15px;'><center><strong>" + '    '+strlon + ' ' +strlat + "</center></strong></span><br>");
		 //var header = '<thead><tr>';
	     var content = '<thead>';
	     if( data.data != undefined){
	    	 for (var key in data.data){
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
}();;console.log('=============== >  VizierCatalog.js ');
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
}();;console.log('=============== >  MessageBox.js ');
var SimbadCatalog = function(){
	var sources;
	var sourceType = "";
	var aladinCatalog = null;
	var filterMode= "all";
	var longname;
	var firstCall = true;

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
			for (var key in data.data){
				//if(key=="main_type"){
					//if(longname!=undefined&&longname!=""&&longname.indexOf("[")!=-1)
						//content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+'  '+longname+'</td></tr>';
					//else
						content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data.data[key]+'</td></tr>';
				//}
				//else if(data.data[key])
				//	content+='<tr style="background-color:#f2f2f2;"><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
			}
		} else{
			for (key in data){
				if(data[key])
					content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
			}
		}
		content += '</table></div></div>';
		/**
		 * Translate SimbadTooltip.java
		 */
		var url = "https://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
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
							/**if( datasize >= 15 ) {
								var darray = [];
								darray.push("truncated to 15");
								darray.push("");
								darray.push("");
								dataarray.push(darray);
								datasize++;									
							} **/
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
							+ "<a class=simbad target=blank href=\"https://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
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
	
	var activateControle = function() {

		if( firstCall ) {
			firstCall = false;
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
			// Put the pop list in front (does not work sometime)
			$("[id^=ui-id-]").css("z-index","1000000");
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
					sourceType = j;
					displayCatalogFiltered();
				} else {
					sourceType="";
					$("#SearchTypeNot").text("all");				
					filterMode = "all";
					$(this).css("display","none");
					displayCatalogFiltered();
				}
			}}).css('z-index', 10000);
			
			$("#SearchType").keyup(function(e){
				var key = e.which;
				$("[id^=ui-id-]").css("z-index","1000000");

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
						sourceType = j;
						displayCatalogFiltered();
					} else {
						sourceType="";
						$("#SearchTypeNot").text("all");				
						filterMode = "all";
						$(this).css("display","none");
						displayCatalogFiltered();

					}
				}
			})

			$("#SearchTypeNot").click(function() {
				var text = $(this).text();
				if( text == "all" ) {
					$(this).text("only");
					$(this).attr("title", "Only display sources matching the type (click to change)");
					filterMode = "only";
					displayCatalogFiltered();
					$("#SearchType").css("display","inline");
				} else if( text == "only" ) {
					$(this).text("not");				
					$(this).attr("title", "Only display sources not matching the type (click to change)");
					filterMode = "not";
					$("#SearchType").css("display","inline");
					displayCatalogFiltered();
				} else {
					$(this).text("all");				
					$(this).attr("title", "Display all sources (click to change)");
					filterMode = "all";
					$("#SearchType").css("display","none");
					displayCatalogFiltered();
				}
			});
		}
	};

	var setCatalog = function(catalog){
		aladinCatalog = catalog
	};
	
	var sourceFilter = function(source){
		var filterCondition  = (source.data.other_types.indexOf(sourceType)!=-1 || source.data.main_type.startsWith(sourceType));
		if( filterMode == "all" ) {
			return true;
		} else if( (filterMode == "not" && !filterCondition ) || (filterMode == "only" && filterCondition) ){
				return true
		} else {
			return false;
		}

	};
	
	var displayCatalogFiltered = function(){
		sources = aladinCatalog.getSources();
		for(var i=0;i<sources.length;i++){
			let source = sources[i];
			if( sourceFilter(source) ) {
				source.show();
			} else {
				source.hide();
			}
		}
		return;
	}


	/*
	 * These 2 functions are designed to get the data from https://simbad.u-strasbg.fr/simbad/sim-tap/sync
	 */
	function Query(adql){
		//var site= "https://simbad.u-strasbg.fr/simbad/sim-tap/sync";
		var reTable;
		reTable = $.ajax({
			url: '${site}',
			type: "GET",
			data: {query: "${adql}", format: 'text', lang: 'ADQL', request :'doQuery'},
			async:false
		})
		.done(function(result){
			return result;
		});
		return reTable;
	}
	var getTable = function(){
		var adql = "SELECT  distinct \"public\".otypedef.otype_longname, \"public\".otypedef.otype_shortname FROM \"public\".otypedef order by otype_longname" ;
		var obj = Query(adql);
		var content = obj.responseText;
		var list = content.split("|");
		var result=[];
		for(let i = 2;i<list.length;i++){
			var temp = list[i].split("\n");
			for(var j=0;j<temp.length;j++){
				result.push(temp[j]);
			}
		}
		var json={};
		for(let i =0;i<result.length;i++){
			result[i]=result[i+1]
		}
		for(var h=0;h<result.length-2;h=h+2){
			json[result[h]]=result[h+1];
		}
	}
	var retour = {
			simbad : simbad,
			setCatalog : setCatalog,
			displayCatalogFiltered :displayCatalogFiltered,
			getTable : getTable,
			sourceFilter : sourceFilter,
			activateControle: activateControle
	};
	return retour;
}();;console.log('=============== >  SimbadCatalog.js ');
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
}();;console.log('=============== >  Alix_CustomDataTable.js ');
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
}();;console.log('=============== >  Alix_ModalResult.js ');
var TapCatalog = function(){
	var setTapTableAsMaster = function(bag){
		var url_base = bag.url_base+"sync?RUNID={$RUNID}&REQUEST=doQuery&format={$format}&lang=ADQL&query={$query}";
		var index = bag.url_query.indexOf("CIRCLE");
		bag.url_query = bag.url_query.slice(0,index);
		bag.url_query = bag.url_query+" CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1";
		var leftbracket = bag.url_query.match(/[(]/g).length;
		var rightbracket = bag.url_query.match(/[)]/g).length;
		if(leftbracket!=rightbracket)
			bag.url_query = bag.url_query+")";
		var url_query = bag.url_query;
		var RUNID = bag.RUNID;
		var format = bag.format;
		var label = bag.label;
		masterResource={
				affichage :{
					location :{
						url_base : url_base,
						url_query : url_query
						
					},
					progressiveMode: false,
					RUNID : RUNID,
					radiusUnit : 'deg',
					format : format,
					label : label,
					description: "Texte plus complet qui donne plus d'informations",
					display:true
				},
				actions : {
					showAssociated :{
						active:false,
						handlerFadeOut: true,
						handlerDeleteSource: true
						//This function is to delete the associated blue sources and unselect the source when we click the empty part of AladinLite.  
					},
					showPanel :{
						active:true
						//It's to show or hide the panel of detail. 
					},
					externalProcessing : {
						label: "Show details",
						description: "The function is called when we click a source. We can import other scripts to show more details about the source selected",	
						handlerSelect: function(data,showPanel){
							VizierCatalogue.showSourceData(data);
						},
						handlerDeselect : function(){
							
						},
						handlerInitial: function(){//SourceFilter_mVc.draw();
						}//The handlerFilter function will be called in the beginning when the web is loaded.
					}
				}
			}
   		AladinLiteX_mVc.changeMasterResource(masterResource);
	}
	var retour = {
			setTapTableAsMaster:setTapTableAsMaster	
	}
	
	return retour;
	
}();;console.log('=============== >  TapCatalog.js ');
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
/*View.prototype.addOverlay = function(overlay) {
        this.overlays=[];
        this.allOverlayLayers=[];
        overlay.name = this.makeUniqLayerName(overlay.name);
        this.overlays.push(overlay);
        this.allOverlayLayers.push(overlay);
        overlay.setView(this);
    };*/
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
	

;console.log('=============== >  AladinUpdate.js ');
