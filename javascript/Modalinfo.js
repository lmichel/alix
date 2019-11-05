//take out from jsStuff

Modalinfo = function(){
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
		//Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			//url:'http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=format+object+%22%25IDLIST%5B%25-30*%5D%7C-%25COO%28A%29%7C%25COO%28D%29%7C%25OTYPELIST%28S%29%22%0A01+33+50.904+%2B30+39+35.79+radius%3D1m',
			url: url,
			method: 'GET',
	        async: true,
	        dataType: 'text',
	        success: function(jsdata){
				//Processing.hide();
				
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
				
				if( Processing.jsonError(json, "Simbad Tooltip Failure") ) {
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

					CustomDataTable.create("simbadtable", options, position);
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
			console.log($this.find(".ui-dialog-content"))
			console.log($this.find(".ui-dialog-content").data("dialog"))
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
	pblc.SimbadCatalog=SimbadCatalog
	return pblc;

}();