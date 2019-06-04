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
		console.log("SHOW " + label);
		$("#fetchingMessage").html("Fetching data from " + label);
		$("#waiting_interface").css("height","100%");
		$("#waiting_interface").css("width","100%");
		$("#waiting_interface").css("display","inline");
		callers[label] = true;
	}
	var hide = function(label){
		console.log("HIDE " + label);

		delete callers[label];
		for( var c in callers){
			$("#fetchingMessage").html("Fetching data from " + c);
			return;
		}
		$("#waiting_interface").css("display","none");
	}
	var warnFov = function() {
		console.error("warnFov");

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
		console.log("warn " + message)
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
		controller = new AladinLite_mvC(that, params.controllers);		
		draw(params.defaultView,params.controllers,params.masterResource);
		
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
		//parentDiv.append('<div id="' + menuDivId + '" class="alix_menu_panel">'
				//+'<input id="' + targetDivId + '" placeholder="target" class="alix_target  " ><span id="search" title="search" class="alix_search  glyphicon glyphicon-search" onclick="AladinLiteX_mVc.searchPosition();"></span>'
				//+'<select  id ="' + selectDivId + '" class=" alix_select">'
				//+'<option value="'+defaultView.field.position+'">'+defaultView.field.position+'</option>'
				//+'</select>'
				//+'<div id="menuDiv"><button id="menu" type="menu" title="open menu" class=" alix_btn_open alix_btn alix_btn-grey alix_menu_item " ><i id="icon_open" class="glyphicon glyphicon-list" style="font-size:18px;"></i></button>'
				//+'<i id="credit" title="copyright-mark" class="alix_credit alix_menu_item glyphicon glyphicon-copyright-mark"></i>'
				//+'<button id="center" type="center" title="center" class="alix_btn alix_btn-circle alix_btn-blue alix_menu_item alix_button_center" onclick="AladinLiteX_mVc.returnCenter();"><i class="glyphicon glyphicon-screenshot" style="font-size:15px;"></i></button>'
			    //+'<button id="bookMark" type="bookMark" title="bookMark" class="alix_btn alix_btn-circle alix_btn-red alix_menu_item alix_button_bookMark" onclick="AladinLiteX_mVc.bookMark();"><i class="glyphicon glyphicon-heart" style="font-size:15px;"></i></button>'
			    //+'<button id="history" type="history" title="history" class="alix_btn alix_btn-circle alix_btn-green alix_menu_item alix_button_history alix_unselected" onclick="AladinLiteX_mVc.getHistory();"><i class="glyphicon glyphicon-book" style="font-size:15px;"></i></button>'
			    //+'<button id="region"  type="region" title="edit region" class="alix_btn alix_btn-circle alix_btn-yellow alix_menu_item alix_button_region alix_unselected" onclick="AladinLiteX_mVc.regionEditor();"><i class="glyphicon glyphicon-edit" style="font-size:15px;"></i></button></div>'
			   // +'<form method = "post" onsubmit="return false;"><fieldset class="alix_image_panel alix_menu_item alix_fieldset">'
			   // +'<legend class="alix_titlle_image alix_menu_item">Image'
			   // +'<i id="color_map" title = "color map" style="cursor: pointer; opacity: .3;font-size: 14px; margin:8px"class="alix_menu_item glyphicon glyphicon-sunglasses" onclick = "AladinLiteX_mVc.showColorMap()"></i>'
			  //  +'<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: 150px; height: 50px; color: black;"><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>'
			    //+'<select id="color_map_select" class ="alix_selector_cm alix_menu_item"></select>'
			    //+'</legend>'
			    //+'<div id = "color_map_box" style = "z-index: 20;position: absolute; width: 150px; height: 50px; color: black;">testetetetet</div>'
			   // +'<input type="text" id="'+ maskId + '"  placeholder="Survey" size=11 class="alix_menu_item alix_img_explorer"></input>'
			    //+'<select id="status-select" class ="alix_selector_hips alix_menu_item"></select>'
			    //+'<button id="detail"  type="detail" class="alix_menu_item alix_button_detail" onclick="AladinLiteX_mVc.showDetailByID();">Detail</button></fieldset></form>'
			    /*+'<form method = "post" onsubmit="return false;"><fieldset class="alix_catalog_panel alix_menu_item alix_fieldset" >'
			    +'<legend class="alix_titlle_catalog alix_menu_item">Catalogs'
			    +'<div id="minus" style="cursor: pointer;" class="alix_minus  alix_menu_item" title = "Fade out">-</div>'
			    +'<i id="fade" title = "fade" class="alix_menu_item glyphicon glyphicon-lamp"></i>'
			    +'<div id="plus" style="cursor: pointer;" class=" alix_plus  alix_menu_item" title = "Fade in">+</div>'
			    +'</legend>' 
			    +'<div><p id="XMM" title="Show/hide master sources" class="alix_XMM_in_menu alix_menu_item alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayDataXml();">'+ XMM +'</p>'
			    + descriptionXMM()
			    + configurationXMM()
			    + hideXMMFlash()
			    //XMM sources can be configured in the configuration which decide if the buttons of '3XMM catalog' exists or not. 
			    +'</div>'
			    +'<div><p id="ACDS" class = "alix_acds" >'+ACDS+'  </p>'
			    +'<div style = ""><p id="Simbad" title="Show/hide Simbad sources" class="alix_simbad_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displaySimbadCatalog();">Simbad</p>'
			    +'<i id="btn-Simbad-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'Simbad\',this.style.color)"></i>'
			    +'<i id="btn-Simbad-flash" title = "flash" class="  glyphicon glyphicon-flash"style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.SimbadFlash();"></i>'
			    +'<p id="NED" title="Show/hide Ned sources" class="alix_ned_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayNedCatalog();">NED</p>'
			    +'<i id="btn-NED-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"></i>'
			    +'<i id="btn-NED-flash" title = "flash" class="  glyphicon glyphicon-flash" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.NEDFlash();"></i></div>'
			    +'<div><input type="text" id="'+ catalogeId + '"  placeholder="Find other Catalog" size=11 class=" alix_cataloge_explorer "></input>'
			    +'<select id="select_vizier" class="alix_selector_vizier "></select>'
			    +'<div id="vizier" class="alix_vizier">'
			    +'<ul id="vizier_list"></ul></div></fieldset></form></div>'*/
			   // +'</div>')
		//parentDiv.append('<div id="open_all" class="alix_open_all glyphicon glyphicon-chevron-right"></div>');	 
		parentDiv.append('<div id="newMenu" class="alix_menu_panel">')
		
		var newMenu = $('#newMenu')	;
		var button_locate = '<button id="button_locate" class="alix_btn alix_btn-circle alix_btn-grey" title ="search a position" ><i id="" class="glyphicon glyphicon-map-marker " style="font-size:18px;"></i></button>'
		var button_center = '<button id="button_center" class="alix_btn alix_btn-circle alix_btn-red" title ="back to center" onclick="AladinLiteX_mVc.returnCenter();"><i id="" class="glyphicon glyphicon-screenshot " style="font-size:18px;"></i></button>'
		var button_bookmark = '<button id="button_bookmark" class="alix_btn alix_btn-circle alix_btn-orange" title ="save a bookmark" onclick="AladinLiteX_mVc.bookMark();"><i id="" class="glyphicon glyphicon-heart " style="font-size:18px;"></i></button>'
		var button_history  = '<button id="button_history" class="alix_btn alix_btn-circle alix_btn-yellow" title ="history of bookmark" ><i id="" class="glyphicon glyphicon-book " style="font-size:18px;"onclick="AladinLiteX_mVc.getHistory();"></i></button>'
		var button_region = '<button id="button_region" class="alix_btn alix_btn-circle alix_btn-green" title ="region editor" onclick="AladinLiteX_mVc.regionEditor();" ><i id="" class="glyphicon glyphicon-edit" style="font-size:18px;"></i></button>'
		var button_image = '<button id="button_image" class="alix_btn alix_btn-circle alix_btn-blue" title ="search an image" onclick="AladinLiteX_mVc.showColorMap();" ><i id="" class="glyphicon glyphicon-picture" style="font-size:18px;"></i></button>'
		var button_catalog = '<button id="button_catalog" class="alix_btn alix_btn-circle alix_btn-purple" title ="search an catalog" ><i id="" class="glyphicon glyphicon-list " style="font-size:18px;"></i></button>'
		
		var panel_locate = '<div id="panel_locate" class="alix_right_panels">'
			+'<input id="' + targetDivId + '" placeholder="target" class="alix_target" ><span id="search" title="search" class="alix_search glyphicon glyphicon-search" onclick="AladinLiteX_mVc.searchPosition();"></span>'
			+'<select  id ="' + selectDivId + '" class="alix_select">'
			+'<option value="'+defaultView.field.position+'">'+defaultView.field.position+'</option>'
			+'</select>'
			+'</div>'
		var panel_history = '<div id="panel_history" class="alix_right_panels">'
			+'</div>'
		var panel_region = '<div id="panel_region" class="alix_right_panels">'
			+'</div>'
		var panel_image = '<div id="panel_image" class="alix_right_panels">'
		    +'<p class="alix_titlle_image ">Image'
		    +'</p>'
		    +'<input type="text" id="'+ maskId + '"  placeholder="Survey" size=11 class=" alix_img_explorer"></input>'
		    +'<select id="status-select" class ="alix_selector_hips "></select>'
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
			    +'<b id="NED" title="Show/hide Ned sources" class="alix_ned_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayNedCatalog();">NED</b>'
			    +'<i id="btn-NED-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"></i>'
			    +'<i id="btn-NED-flash" title = "flash" class="  glyphicon glyphicon-flash" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.NEDFlash();"></i></div>'
			    +'<div><input type="text" id="'+ catalogeId + '"  placeholder="Find other Catalog" size=11 class=" alix_cataloge_explorer "></input>'
			    +'<select id="select_vizier" class="alix_selector_vizier "></select>'
			    +'<div id="vizier" class="alix_vizier">'
			    +'<ul id="vizier_list"></ul></div></div>'
				+'<div id="panel_catalog_detail"></div>'
			+'</div>'
			
			
			
		newMenu.append('<div id="alix_left_menu"><ul style="list-style-type:none">'
				+'<li >'+button_locate+'</li>'
				+'<li>'+button_center+'</li>'
				+'<li>'+button_bookmark+'</li>'
				+'<li>'+button_history+'</li>'
				+'<li>'+button_region+'</li>'
				+'<li>'+button_image+'</li>'
				+'<li>'+button_catalog+'</li>'
				+'</ul></div>'
				+'<div id="alix_right_menu">'
				+panel_locate
				+panel_history
				+panel_region
				+panel_image
				+panel_catalog
				+'<div>')
		var panel_last = null;
		$('#button_locate').click(function(event){
			var id = '#panel_locate';
			panel_check(id);
		});	
		$('#button_bookmark').click(function(event){
			var id ='#panel_history';
			$(id).css("display","block");
			if(panel_last!=id){
			$(panel_last).css("display","none");}
			panel_last =id;
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
			var id ='#panel_catalog';
			panel_check(id);
			});	
		var panel_check = function(id){
			$(id).toggle();
			if(panel_last!=id){
			$(panel_last).css("display","none");}
			panel_last =id;
		}		
				
				
		
		menuDiv   = $('#' + menuDivId);
		parentDiv.append('<div id="' + contextDivId + '" class="alix_context_panel" >'
				+'<b class="alix_context" style="display: none;"> context </b></div>');
		parentDiv.append('<div id="waiting_interface" class="alix_waiting_interface" style="display:none;">'
				+'<div class="alix_grey_bg"></div>'
				+'<div class="alix_fetching_data">'
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
		

		aladin.on('positionChanged', function(newPosition){
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

		/*if(aladinLiteView.masterResource.affichage.display == true){
			AladinLiteX_mVc.displayDataXml();
		}
		*/
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
		selectDiv.change(function(){
			searchPosition($(this).val());
		});
		maskDiv.click(function(event){
			event.stopPropagation();
		});
		maskDiv.keyup(function(e) {
			if( $(this).val().length >= 2 || e.which == 13) {
				searchHips($(this).val());
			}
		});
		selectHipsDiv.change(function(){
			displaySelectedHips($(this).val());
		});
		selectHipsDiv.click(function(event){
			event.stopPropagation();
		});
		
		$("#select_vizier").change(function(){
			var oid = $(this).val();
			catalogFunction(oid);
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
						createHipsSelect(id);
						found = true;
					}
				}
				if( !found ){
					displaySelectedHips("CDS/P/DSS2/color");
					createHipsSelect("CDS/P/DSS2/color");
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
		if( defaultView.defaultSurvey != undefined )
			defaultSurvey = defaultView.defaultSurvey;
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
			$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:440});
		}else{
			if(contextDiv.height()<100){
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:680});
			}else{
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:650,width:680});
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

	
	var returnCenter = function(){
		checkBrowseSaved();
		gotoObject(defaultPosition);
		//aladin.gotoPosition(aladinLiteView.ra,aladinLiteView.dec);
		controller.cleanPolygon();
        //event.stopPropagation();
	}
	var historySelected = false;
	var regionSelected = false;
	var bookMark = function(){
		checkBrowseSaved();
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

		console.log("@@@@@@@@@@@@@@ storeCurrentState " + strlon + " " + strlat);

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
		selectDiv.val(posName);
		targetDiv.val(posName);
        aladin.gotoObject(posName,{
        	success: function(pos){
        		aladinLiteView.name = targetDiv.val();
        		aladinLiteView.ra = pos[0];
        		aladinLiteView.dec = pos[1];
        		
    			var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
    			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);

    			console.log("@@@@@@@@@@@@@@ gotoObject " + strlon + " " + strlat);

        		var l = aladin.getFov();
        		aladinLiteView.fov = l[0];
    			controller.updateCatalogs(aladinLiteView,'position');
    			addPositionInSelector(posName);

        		if(posthandler){
        			posthandler();
        		}
        		//console.log(targetDiv.val() +"  "+ 'position' +" : "+ pos[0] + " " + pos[1]);
        	}
        	,error: function(){alert('pas connu');}
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
	
	var hipsFunction = function(ID){
		displaySelectedHips(ID);
		createHipsSelect(ID);
		displayDetailInContext(ID);
	}
	
	var catalogFunction = function(obs_id){
	//	if(controller.modules.hipsSelectorModel.cata_tab.indexOf(obs_id)<0){
		if(!LibraryCatalog.getCatalog("VizieR:"+obs_id)){
		//	controller.storeCurrentCatalog(obs_id);
			controller.createCatalogSelect(obs_id);
			addCatalogInSelector(obs_id);
		}
		else{
			var shown = false;
			$("#vizier_list").find("li").each(function() {
				   if ($(this).hasClass(obs_id)) {
					   console.log("VizieR:"+obs_id+"exists already in library Catalog and is shown");
					   shown = true;
				   }
			})
			if(shown == false){
				controller.createCatalogSelect(obs_id);
				console.log("VizieR:"+obs_id+"exists already in library Catalog but not shown");
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
	
	var createHipsSelect = function(ID){
		var select_hips = document.getElementById(selectHipsDivId);
		var lengthOption = select_hips.options.length;
		for(var i=0;i<lengthOption;i++){
			if(select_hips.options[i].text == ID)
				return false;
		}
		controller.modules.historicModel.hips_tab.push(ID);
		var html_option = '<select id="status" class ="alix_selector_hips ">'
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
	}
	

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
			if(select_position.options[i].text == pos)
				return false;
		}
		if(pos != ""){
		var pos_select = '<option>'
			+pos
			+'</option>';
		selectDiv.append(pos_select);
		selectDiv.val(pos)}
	}
	
	var addCatalogInSelector = function(obs_id){
		//To avoid adding the same catalog obs_id again
		var select_vizier = document.getElementById("select_vizier")
		var lengthOption = select_vizier.options.length;
		$("#select_vizier").val(obs_id);
		for(var i=0;i<lengthOption;i++){
			if(select_vizier.options[i].text == obs_id)
				return false;
		}
		var cata_select = '<option>'
			+obs_id
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
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
			////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{
			var cata = controller.getSelectedCatalog(obs_id);
			var index = obs_id.split("/");
			index.pop();
			index=index.join("/");
			var length=index.length-1;
			if(cata != undefined){
			var html ='<iframe id = "cds_iframe"  name="content_frame" marginwidth=0 marginheight=0 width=100% height=400 src="http://cdsarc.u-strasbg.fr/viz-bin/ReadMe/'+index+'/?format=html&tex=true" frameborder="0"'
				+'style = "box-shadow: 0 0 20px 2px '+color+'; margin-left: 5px;" ></iframe>'
			/*	var html = '<p style="color:#4D36DC;margin:10px;" >';
				html +=  cata.obs_title + "</p><p style='font-size:small;margin:10px;'>" + cata.obs_description + "<br>";
				html += '</p>';*/  
				if(contextDiv.height() > 100){
					contextDiv.html(html);
				}else{
					contextDiv.animate({height:'400px'},"fast");
					contextDiv.css("max-height", "400px");
					contextDiv.css("border-width", "0.2px");
					contextDiv.html(html);
					//$(".ui-dialog").animate({height:'400px'},"fast");
				}
			}else{
				alert("Please choose a catalog");
			}
			
		}
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
					console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
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
					console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
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
		if(name == 'Simbad'){
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
				catalog = A.catalogHiPS(url, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}, WaitingPanel.hide(name));
				
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
			}else{
				catalog = A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, aladin.getFov()[0]
				, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}
				, function() {WaitingPanel.hide(name)});
			}
		/*	if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: name,color: color, shape :shape ,fade : "", al_refs: catalog});
			} else{
			LibraryCatalog.updCatalog({url:url, name: name ,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };*/
		}else if(name == 'Swarm'){
			aladinLiteView.masterResource.cleanTab();
			cleanCatalog("Target");
			cleanCatalog("Swarm");
			console.log("@@@@@@@@@ " + url);
			var shape = 'plus';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).al_refs.color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			}
			
			catalog = XMMcata = A.catalogFromURL(url, {name: name, sourceSize:sourceSize, shape: shape , color: color, onClick:function(params) {
				/*
				 * function click for the source in catalog XMM
				 */
				sourceSelected = this;//save the reference of selected source as an global var in order to allow us deselect it easilier in the deselectSource();
				aladinLiteView.sourceSelected.x = params.x;
				aladinLiteView.sourceSelected.y = params.y;
				var data = params.data;
				var showPanel = aladinLiteView.masterResource.actions.showPanel.active;
				console.log("&&&&&&"+aladinLiteView.masterResource+"and"+typeof( aladinLiteView.masterResource.actions.externalProcessing))
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
					var myRegexp = /\{\$(.*)\}/g;
					var match = myRegexp.exec(aladinLiteView.masterResource.actions.showAssociated.url);
					var idField = match[1];
					var idvalue = data[idField];
					var re =  new RegExp("\\{\\$" + idField + "\\}", 'g');
					var lien = aladinLiteView.masterResource.actions.showAssociated.url.replace(re ,idvalue);
					console.log(re + " " + idField + " " + idvalue  + " " + lien);
					//make the associated source shown directly
					if(aladinLiteView.masterResource.actions.showAssociated.active == true) {
					
					$("#XMM").attr("class", "alix_XMM_in_menu  alix_datahelp");//to freeze the view , and don't reload the XMM source when position is changed unless we use 'keypress' to go far away
					$('#'+ idvalue).css("color","#32FFEC");
					$.getJSON(lien, function(jsondata) {
						var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:"showTable"});
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
					/*
					 * if its the first time of choosing a cata XMM...
					 */
				/*	if(aladinLiteView.masterResource.tab.indexOf(idvalue)<0){		
						aladinLiteView.masterResource.tab.push(idvalue);
						contextDiv.on('click','#'+ idvalue, function(){
							if($(this).attr("class")=="alix_resource_around alix_dataunselected"){
								$("#plus").css("display","inline");
								$("#minus").css("display","inline");
								$("#fade").css("display","inline");

							$("#XMM").attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp");
								//$("#XMM").css("color", "#888a85");
								//$("#btn-XMM-flash").css("color" , "#888a85");

								//$(this).attr("class","alix_resource_around dataselected");
								$(this).css("color","#32FFEC");
								$.getJSON(lien, function(jsondata) {
									var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:"showTable"});
									aladin.addCatalog(cat);
									for( var i=0 ; i<jsondata.length ; i++ ){
										var point =  jsondata[i];
										cat.addSources([A.source(point.ra, point.dec, {ra: Numbers.toSexagesimal(point.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.dec, 7, true), Name: point.name, Description: point.description})]);
									}

								});
							}
						});

						contextDiv.on('click','#label_init_btn', function(){
							if($('#label_init_description').css("display")=="none"){
							$('#label_init_description').css("display","inline");}
							else{$('#label_init_description').css("display","none");}
						});
					}*/
				}
			return true;
			}
			}
			, function() {
			SwarmDynamicFilter.runConstraint(aladinLiteView);
			WaitingPanel.hide("Swarm");
			//When the XMM sources is updated by changing the position or zoom, recall the filter
			} /*WaitingPanel.hide()*/);
			/*if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
		} else{
			LibraryCatalog.updCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
	    };*///if name == SWARM
		bindToFade();
		}
		aladin.addCatalog(catalog);
		cleanCatalog("oid");
		if(!LibraryCatalog.getCatalog(name)){
			 LibraryCatalog.addCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
			} else{
				 LibraryCatalog.updCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };
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
			catalog = A.catalogHiPS(hips_service_url, {onClick: clickType,name: 'VizieR:'+obs_id,color:color, sourceSize: sourceSize,shape: shape },WaitingPanel.hide(obs_id));
			
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
			        	console.log("reponse serveur " + response);

			        	var viewRadius = Math.sqrt((aladin.getFov()[0]*aladin.getFov()[0]) + (aladin.getFov()[1]*aladin.getFov()[1]))/2;
			        	var radius = parseFloat(response);
			        	console.log("radius estime: " + radius + " rayon AL: " + viewRadius);
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
			        	console.log("radius pris " +  radius);
	
			        	console.log("querying " + obs_id + " " + getSexadecimalString(aladin.getRaDec()[0] , aladin.getRaDec()[1]) + " over " + radius);
						WaitingPanel.show(obs_id);
					
						catalog = A.catalogFromVizieR(obs_id
								, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
								, radius
								, {onClick: 'showTable', color:color,sourceSize: sourceSize,shape: shape }
								, function(sources) {
									console.log(" En direct depuis AL: " + sources.length + " sources affichees")
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
		for(var i=0;i<aladin.view.catalogs.length;i++){
			console.log("aladinview>>>>>>>>>>>>>"+i+":"+aladin.view.catalogs[i].name);
		}
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
  					  setDefaultSurvey();//when the defaut ra dec is set, set default survey and build hips tab.
                        // (typeof successCallback === 'function') && successCallback();
                 },
                 function(data) { // errror callback
                      if (console) {
                          console.log("Could not resolve object name " + targetName);
                          console.log(data);
                      }
                      (typeof errorCallback === 'function') && errorCallback();
                 });
	}
	var showColorMap = function(){
		/*if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
		}else{
			var html = '<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: auto; height: 50px; color: black;">'
				+'<b>Color Map : </b>'
				+'<select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>'
			contextDiv.animate({height:'101px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0.2px");
			contextDiv.html(html);
		}*/
		 //// COLOR MAP management ////////////////////////////////////////////
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
			reselectSource : reselectSource
	};
	return retour
	
}();



//<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>


