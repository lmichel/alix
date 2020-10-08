/*
var AlixAPI = Class ({
	
	displayTarget:function (){
		
			AladinLiteX_mVc.displayTarget(function(ra,dec){  alert([ra, dec]);});
			
			}
	
})

*/




var alixapi = function(){
	
var a="ivoa.ObsCore"
var u="http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/tap/sync";
var param ="PHASE=RUN&REQUEST=doQuery&LANG=ADQL&QUERY={$query}";
	
	// functon to display current position coordonate	
	var demo_displayTarget =function(){
		AladinLiteX_mVc.displayTarget(function(ra,dec){  alert([ra, dec]);});
	}
	
	// function to change reference of alix view
	var demo_changeRef = function(){
		 defaultView = {
	        defaultSurvey: "CDS/P/DSS2/color",
     	        field: {
	       		position: "WR101",
	        	defaultFov: "1",
	        }
  	    };
		AladinLiteX_mVc.setReferenceView(defaultView);
	}
	
	// the function to draw in blue figure by the position parse in the region	
	
	var demo_changeRefBlue = function(){
		defaultView = {
    	       // defaultSurvey: "ESAVO/P/XMM/EPIC-RGB",
     	        field: {
     	        	defaultFov: "0.00009",
     	        	//position: "M33"
     	        	position:"23.46,30.66"
     	        },
				region: {
	        		type:"array",
	        		value:[
	        			202.86460559637285,47.508903373646355,
	        			202.9658591997302,46.884383185785104,
	        			202.00061058533635,47.16490427482837,
	        		]   
 				}
  	    };
  	   defaultView = mixConf(confData.defaultView,defaultView);
  	   AladinLiteX_mVc.setReferenceView(defaultView);
	}	
	
	
	// the fonction to draw the region of the position
	
	
	//function to display alix in center position
	var demo_center = function(){
		AladinLiteX_mVc.returnCenter();
	}	
	
	//this function is use to display position of choosed url and table	
	var displayDataTab = function(url_base,table,query,param){
		 defaultView = {
	      //  defaultSurvey: "CDS/P/DSS2/color",
     	        field: {
	       		position: "83.635209 22.01175",
				defaultFov: "0.5"
	        }
		
			
  	    };

		AladinLiteX_mVc.setReferenceView(defaultView);
		if(table==""||url_base==""){
			alert("the fields are required")
		}else {
		
		masTest.masterResource.affichage.location.url_base=url_base+"?"+param;
		masTest.masterResource.affichage.location.url_query=query;
		alert(masTest.masterResource.affichage.location.url_query+" "+masTest.masterResource.affichage.location.url_base);
		AladinLiteX_mVc.displayDataXml();
		}
	}
	
	var displayTest = function(){
		alert(masTest.masterResource.affichage.location.url_base)
		masTest.masterResource.affichage.location.url_base=u+"?"+param;
		masTest.masterResource.affichage.location.url_query=quer(a);
		alert(masTest.masterResource.affichage.location.url_query+" "+masTest.masterResource.affichage.location.url_base);
		configureALIX(masTest);
		AladinLiteX_mVc.displayDataXml();
		//displayDataTab(u,a,quer(a),param);
		
	}
	
	// function to connect different service and display data of each sevices
	var demo_setConnectTapService = function (bd,url_base,table,query,position){
	switch(bd){
		case "3XMMDR8":
			url_base = $("#xmm_url").val();
			table    = $("#xmm_table").val();
			query    = $("#xmm_query").val();
			position = $("#xmm_position").val();
			defaultView = defaulDisplayView(position);   
			AladinLiteX_mVc.setReferenceView(defaultView);
			if(table==""||query==""||url_base==""){
				alert("the fields are required")
			}else {
			resetParameterView(url_base,query,param);
			AladinLiteX_mVc.displayDataXml();
			}
			break;
		
		case "CACD":
			url_base = $("#cacd_url").val();
			table    = $("#cacd_table").val();
			query    = $("#cacd_query").val();
			position = $("#cacd_position").val();
			defaultView = defaulDisplayView(position);
		    AladinLiteX_mVc.setReferenceView(defaultView);
			if(table==""||query==""||url_base==""){
				alert("the fields are required")
			}else {
			
			resetParameterView(url_base,query,param);
			AladinLiteX_mVc.displayDataXml();
			}
			break;
			
		case "GAVO":
		    
			url_base = $("#gavo_url").val();
			table    = $("#gavo_table").val();
			query    = $("#gavo_query").val();
			position = $("#gavo_position").val();
			defaultView = defaulDisplayView(position);
			alert ("sorry but the base 64 doesn't work yet !!! '");
		    AladinLiteX_mVc.setReferenceView(defaultView);
			if(table==""||query==""||url_base==""){
				alert("the fields are required")
			}else {
			
			resetParameterView(url_base,query,param);
			AladinLiteX_mVc.displayDataXml();
			}
			break;
			
		case "SIMBAD":
		    param="forma=votable/td&PHASE=RUN&REQUEST=doQuery&LANG=ADQL&QUERY={$query}";
			url_base = $("#simbad_url").val();
			table    = $("#simbad_table").val();
			query    = $("#simbad_query").val();
			query = "SELECT TOP 100 * FROM \"public\".basic WHERE CONTAINS(POINT('ICRS',ra,dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1"
			
			position = $("#simbad_position").val();
			
			//alert ("sorry but the base 64 doesn't work yet !!! '");
			defaultView = defaulDisplayView(position);
		    AladinLiteX_mVc.setReferenceView(defaultView);
			if(table==""||query==""||url_base==""){
				alert("the fields are required")
			}else {
			alert(url_base+"? "+param+""+query)
			resetParameterView(url_base,"","");
			AladinLiteX_mVc.displayDataXml();
			}
			break;
			
		default :
		   url_base = $("#xmm_url").val();
			table    = $("#xmm_table").val();
			query    = $("#xmm_query").val();
			position = $("#xmm_position").val();
			defaultView = defaulDisplayView(position);
		    AladinLiteX_mVc.setReferenceView(defaultView);
			if(table==""||query==""||url_base==""){
				alert("the fields are required")
			}else {
			
			resetParameterView(url_base,query,param);
			AladinLiteX_mVc.displayDataXml();
			}
	}
	};
	
	var quer = function(tab){
		tab = a
		var req="";
		if(tab=="ivoa.ObsCore" || tab=="ivoa.ObsCore10"){
		req ="SELECT TOP 100 * FROM "+tab+" WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
	
		}else if(tab=="caom2.SIAv1"){
			req ="SELECT TOP 100 * FROM "+tab+" WHERE CONTAINS(POINT('ICRS', position_center_ra, position_center_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
	
		}else{
			req ="SELECT TOP 100 * FROM "+tab+" WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
		}
		
					
	return req;

}
	
	
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
}
	
	
	
var masTest = {
				defaultView: {
			defaultSurvey: "DSS colored",
			
			field: {
				position: "83.635209 22.01175",
				defaultFov: "0.5"
			},
			panelState: true

		},
		masterResource: {
			affichage :{
				location :{
					
						url_base:""+u+"?"+param,
					    url_query:" "+quer(a)+" ",	
						//url_base: "http://xcatdb.unistra.fr/3xmmdr8/tap/sync?REQUEST=doQuery&LANG=ADQL&QUERY=SSELECT TOP 1000 * FROM ivoa.ObsCore10 WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS',0, 0, 0.016)) = 1",
						//url_query:"SELECT TOP 1000 * FROM ivoa.ObsCore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1",
						/*url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
						url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle(\"{$ra} {$dec}\", {$fov},-, ICRS)} {$limitQuery}",
						url_limit:  "Order By _n_detections desc Limit 15",
						*/
					},
				progressiveMode: false,
				//httpMethod: POST, //POST or GET
				radiusUnit : 'arcmin',
				format : 'votable',
				label : "3XMM Catalogue",
				description: "Texte plus complet qui donne plus d'informations",
				display:false
			},	
			actions :{
				showAssociated :{
					active:false,
					name:'',
					id : '',
					format : {},
					label:"ACDS Sources",
					url : 'http://saada.unistra.fr/3xmmdr8/getalixassocie/acdslinks?oid={$oidsaada}&mode=aladinlite',
					description: "Show original data panel",
					handlerFadeOut: true,
					handlerDeleteSource: true
					//This function is to delete the associated blue sources and unselect the source when we click the empty part of AladinLite.  
				},
				showPanel :{
					active:false
					//It's to show or hide the panel of detail. 
				},
				externalProcessing : {
					label: "Show details",
					description: "The function is called when we click a source. We can import other scripts to show more details about the source selected",	
				 handlerSelect: function(data,showPanel){
						VizierCatalogue.showSourceData(data);
						//CatalogMerged_mVc.draw(data,showPanel);
						//The callback is called when we click a source. We can import other scripts to show more details about the source selected.
					},
					handlerDeselect : function(){
						
					},
					handlerInitial: function(){
						//SourceFilter_mVc.draw();
					}//The handlerFilter function will be called in the beginning when the web is loaded.
				}
			}
		}			
			};

// functions to load all XmlData 
	function refresh()  {
	SwarmDynamicFilter.runConstraint(this);
	WaitingPanel.hide("Swarm");
			
	}
	var loadData = function(){
		var position="83.635209 22.01175";
		$("#active_data").click(function(){
			
			masTest.masterResource.affichage.display = true
			if(masTest.masterResource != undefined&&masTest.masterResource.affichage.display == true){
				
			setTimeout( function() 
			{
				refresh();
			AladinLiteX_mVc.displayDataXml();
			},1000)	
		
		}});
			
	};
	
	var showPopup = function(position){
		// mettre la position donnees en parametre	
		//Cas 1 Div n'existe pas, creer la div et demarrer Alix dedans
		if($("#aladin-lite-div").length<=0){
			$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
			
			configureALIX (masTest);
			AladinLiteX_mVc.popup("Click Display or Hide Data");
			// autrement sir le dialog est ferme, la rendre visible
		} else if( !$("#aladin-lite-div").dialog("isOpen")){
			AladinLiteX_mVc.popup("Click Display or Hide Data");
			AladinLiteX_mVc.setRegion("",1);
		}
		if(position!=undefined)
			AladinLiteX_mVc.gotoPositionByName(position);
			//AladinLiteX_mVc.displayDataXml();
	};
	
	var initilizedata = function(url,table,ra_name,dec_name){
		var requete;
		a=table;
		u=url+"sync";    
		requete ="SELECT TOP 100 * FROM "+table+" WHERE CONTAINS(POINT('ICRS', "+ra_name+", "+dec_name+"), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
	    return requete
	}
	
		/*var showPopupData = function(position,url,tabl,ra_name,dec_name){
		// mettre la position donnees en parametre
		
		 var initQuery = initilizedata(url,tabl,ra_name,dec_name);
		//alert(initQuery+" => ")
		masTest.masterResource.affichage.location.url_base=u+"?"+param;
		masTest.masterResource.affichage.location.url_query=initQuery;
		//Cas 1 Div n'existe pas, creer la div et demarrer Alix dedans
		if($("#aladin-lite-div").length<=0){
			$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
			
			
			configureALIX (masTest);
			AladinLiteX_mVc.popup();
			// autrement sir le dialog est ferme, la rendre visible
		} else if( !$("#aladin-lite-div").dialog("isOpen")){
			AladinLiteX_mVc.popup();
			AladinLiteX_mVc.setRegion("",1);
		}
		if(position!=undefined)
			//position=position.sub
			AladinLiteX_mVc.gotoPositionByName(position);
			//AladinLiteX_mVc.displayDataXml();
	};
	*/
	

	var showPopupData = function(params){
		alixapi.removePolygone();
		if( params.master ){
			alixapi.connectToMaster(params.master)
		}
		if( params.stcRegion ){
			masTest.masterResource.affichage.label=params.label;
			drawPolygone(params.region,params.stcRegion)
		}
 }
				
	var connectToMaster = function(master){
		     	 var isGoodTitle=false;
				 var initQuery = initilizedata(master.urlPath,master.tablePath,master.raColumn,master.decColumn);
			     var position=master.raCenter+" "+master.decCenter
				masTest.masterResource.affichage.location.url_base=u+"?"+param;
				masTest.masterResource.affichage.location.url_query=initQuery;
				masTest.masterResource.affichage.label=master.label;
				//Cas 1 Div n'existe pas, creer la div et demarrer Alix dedans
				if($("#aladin-lite-div").length<=0){
					$('body').append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
					
					configureALIX (masTest);
					AladinLiteX_mVc.popup("Click Display or Hide Data");
					// autrement sir le dialog est ferme, la rendre visible
				} else if( !$("#aladin-lite-div").dialog("isOpen")){
					AladinLiteX_mVc.popup("Click Display or Hide Data");
					AladinLiteX_mVc.setRegion("",1);
				}
				if(position!=undefined){
						AladinLiteX_mVc.gotoPositionByName(position);
				}
				alixapi.getMessage=alixapi.getFetchingMessage(master.label);	
		}					
								
	var isCirle = false;
	var testFigure = function(stRegion){
		var tableRegion = stRegion.split(" ");
		for(i=0;i<tableRegion.length;i++){
			if(isNaN(tableRegion[i])){
				tableRegion.splice(i,1);
			}
		}
		if(tableRegion.length==3){
			isCirle=true;
			return isCirle;
		}else if(tableRegion.length>3){
			isCirle =false;
			return isCirle;
		}
		return isCirle;
	}
	
	var getCoords = function(stcRegion){
		
		var coords = stcRegion.split(/\s+/);;
		var removed = false;
		var j =0;
		do {
			removed = false
			for(i=0;i<coords.length;i++){
				if(isNaN(coords[i])){
					coords.splice(i,1);
					removed = true;
					break
				}
				coords[i] = Number(coords[i]);
				coords[i] = coords[i].toFixed(6);
				coords[i] = Number(coords[i]);
			}	
		} while ( removed == true);
			return coords;
	}
	
	
	var getPoints = function(region){
		var points = region.points;
			return points;
		}
		
	var getCenter = function(region){
		 var view = BasicGeometry.getEnclosingView(getPoints(region));
		var ra = view.center.ra.toFixed(6);
		var dec = view.center.dec.toFixed(6);
		
			return ra+" "+dec;
		}
		
		var getSize = function(region){
			return region.size;	
		}
		
		/* a voir pour lundi pour faire un remouve de overlay et retirer le polygone*/
		
		var removePolygone = function(){
			AladinLiteX_mVc.removeAllLayers();
		   	if( AladinLiteX_mVc.aladin != null ) {
			for( var i =0; i<AladinLiteX_mVc.aladin.view.overlays.length ; i++){
				if( aladin.view.overlays[i].name ==  "Reference Frame" ){
					aladin.view.overlays[i].removeAll();
					break;
				}
			}
		}
	}
		
	var drawPolygone = function(region,stcRegion){
		//RegionEditor_mVc.setEditionFrame(arrayTab)
	  var arrayTab = alixapi.getCoords(stcRegion);	
	  if(arrayTab.length===3){
		alixapi.showPopup(region.raCenter+" "+region.decCenter);
		AladinLiteX_mVc.drawCircle(region.raCenter,region.decCenter,region.size,{color: 'blue'});
		
	  }else{
		   arrayTab.push(arrayTab[0]);
			arrayTab.push(arrayTab[1]);
			alixapi.showPopup(alixapi.getCenter(region));
			//console.log(getSize());
			defaultView = {
	    	       // defaultSurvey: "ESAVO/P/XMM/EPIC-RGB",
	     	       
					region: {
		        		type:"array",
		        		value:arrayTab
	 				}
	  	    };
	  	   defaultView = mixConf(confData.defaultView,defaultView);
	  	   AladinLiteX_mVc.setReferenceView(defaultView);
	}
}
	
	var getXmmId=function(name){
		var title = document.getElementById("XMM");
		title.insertAdjacentHTML("beforeend","TAP "+name+"");
	}
	
	var getFetchingMessage = function(name){
		var message = document.getElementById("fetchingMessage");
		message.insertAdjacentHTML("beforeend","<b>"+name+"</b>")
		return name;
	}
	
	var getMessage ="";
	//var popupTitle = "Click Display or Hide Data 2";
	var getCircleData = function(values){
		var table = values.split(/\s+/);
		var removed = false;
		var j =0;
		do {
			removed = false
			for(i=0;i<table.length;i++){
				if(isNaN(table[i]) || table[i]==0 ){
					table.splice(i,1);
					removed = true;
					break
				}
				table[i] = Number(table[i]);
			}	
		} while ( removed == true);
	return table;	
	}
			
	var retour = {
	displayTarget : demo_displayTarget,
	changeRef     : demo_changeRef,
	changeRefBlue : demo_changeRefBlue,
	center        : demo_center,
	displayDataTab: displayDataTab,
	connectTapService:demo_setConnectTapService,
	confData      :confData,	
	requete       : quer,
	displayTest   : displayTest,
	masTest       : masTest	,
	showPopup     :showPopup,
	showPopupData :showPopupData,
	initilizedata :initilizedata,
	drawPolygone  :drawPolygone,
	loadData:loadData,
	testFigure : testFigure,
	getCoords : getCoords,
	getPoints :getPoints,
	getCenter: getCenter,
	removePolygone : removePolygone,
	getSize : getSize,
	getXmmId : getXmmId,
	getFetchingMessage : getFetchingMessage,
	getMessage : getMessage,
	connectToMaster :connectToMaster,
	getCircleData : getCircleData,
	//popupTitle : popupTitle
	
	
	};
	return retour
	
			
;}();
	