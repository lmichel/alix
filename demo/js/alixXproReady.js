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
var a="ivoa.ObsCore"
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
					//url_base:"http://saada.unistra.fr/3xmmdr8/getqueryreport?query=SELECT TOP 100 * FROM ivoa.obscore10 WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1&format={$format}&protocol=auto",
					
					// request for gavo table
					
					//url_base:"http://dc.zah.uni-heidelberg.de/__system__/tap/run/tap/sync?RUNID=TapHandle-gavo;ivoa;obscore&PHASE=RUN&REQUEST=doQuery&FORMAT=application%2Fx-votable%2Bxml%3Bserialization%3Dtabledata&LANG=ADQL&QUERY={$query}",
					//url_query:"SELECT TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1",
						//url_base:"http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/tap/sync?PHASE=RUN&REQUEST=doQuery&LANG=ADQL&QUERY={$query}",
						//url_query:" "+quer(a)+" ",
						
						url_base:"http://xcatdb.unistra.fr/3xmmdr8/tap/sync?REQUEST=doQuery&LANG=ADQL&QUERY={$query}",
						//+"SELECT%20TOP%201000%20%2A%20FROM%20ivoa.ObsCore%20%20WHERE%20%20%20%20%20%20CONTAINS%28POINT%28%27ICRS%27%2C%20s_ra%2C%20s_dec%29%2C%20CIRCLE%28%27ICRS%27%2C%2083.633042%2C%20%2B22.014500%2C%200.016666666666666666%29%29%20%3D%201"
						
						//url_base: "http://xcatdb.unistra.fr/3xmmdr8/tap/sync?REQUEST=doQuery&LANG=ADQL&QUERY={$query}",
						//url_query:"SELECT%20TOP%201000%20%2A%20FROM%20ivoa.ObsCore10%20%20WHERE%20%20%20%20%20%20CONTAINS%28POINT%28%27ICRS%27%2C%20s_ra%2C%20s_dec%29%2C%20CIRCLE%28%27ICRS%27%2C%2083.633042%2C%20%2B{$ra}%2C%{$dec}%29%29%20%3D%201",
						
						//url_query:"SELECT%20TOP%201000%20%2A%20FROM%20ivoa.ObsCore10%20%20WHERE%20%20%20%20%20%20CONTAINS%28POINT%28%27ICRS%27%2C%20s_ra%2C%20s_dec%29%2C%20CIRCLE%28%27ICRS%27%2C%2083.633042%2C%2022.014500%2C%200.016666666666666666%29%29%20%3D%201",
						//url_base: "http://xcatdb.unistra.fr/3xmmdr8/tap/sync?REQUEST=doQuery&LANG=ADQL&QUERY=SSELECT TOP 1000 * FROM ivoa.ObsCore10 WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS',0, 0, 0.016)) = 1",
						
						url_query:"SELECT TOP 1000 * FROM ivoa.ObsCore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1",
						
						
						
					/*
					url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
					url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle(\"{$ra} {$dec}\", {$fov},-, ICRS)} {$limitQuery}",
					url_limit:  "Order By _n_detections desc Limit 15",
					*/
					//url_base:"http://saada.unistra.fr/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWhereAttributeSaada%20%7B%0A%20%20%20%20%20_n_detections%20%3C%2010%0A%7D%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%2223.4621%2030.6599417%22%2C%2029.92462264081761%2C%20-%2C%20ICRS)%0A%7D&format=votable&protocol=auto"
				},
				progressiveMode: false,
				//httpMethod: POST, //POST or GET
				radiusUnit : 'arcmin',
				format : 'votable',
				label : "3XMM Catalogue",
				description: "Texte plus complet qui donne plus d'informations",
				display:true
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


//----- my function ----


 var openNewTab = function(url,name){
	  if(name!="demo_popup"){
	  window.open(url, "_blank");}else {
		  //window.open("taphandle.html", "_blank");
		  Alix_Modalinfo.showPopup("01 35 57.316 +30 14 42.99");
	  }
  }
$().ready(function() {
   	$("#addTarget").click(function() {
   		//AladinLiteX_mVc.displayTarget(function(ra,dec){a=quer(ra);alert([a, dec]);});
  		var tab = $('#input_target').val();
		var get_query=quer(tab)
		masTest.masterResource.affichage.location.url_query=get_query;
		configureALIX(masTest);

		//location.reload();
		alert(masTest.masterResource.affichage.location.url_query);
		
		
			
    	});
   	$("#getView").click(function() {
		alert(JSON.stringify(AladinLiteX_mVc.getCurrentView()))
	});
   	$("#changeRef").click(function() {
  	    defaultView = {
	        defaultSurvey: "CDS/P/DSS2/color",
     	        field: {
	       		position: "WR101",
	        	defaultFov: "1",
	        }
  	    };
		AladinLiteX_mVc.setReferenceView(defaultView);
	});
   
   	$("#center").click(function() {
		AladinLiteX_mVc.returnCenter();
   	});
 })


 function quer(table){
	var req ="SELECT TOP 10 * FROM "+table+" WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
	return req;
}

//--- end my function ----



/*var mixConf = function(localData,externalData) {      
for(var key in externalData){
	if(typeof(externalData[key])== "object" && localData[key])
		{
		externalData[key] = mixConf(localData[key],externalData[key])
		}
}
return Object.assign(localData,externalData)
/*if (type === 'object') {     
    for (var key in dataE) {
    	if(dataL[key]){
    		mixConf(dataL[key],dataE[key])
    	}else{
    		dataL[key] = dataE[key]
    	} 
    }
  } else {    // No deeper clone
   dataL = Object.assign(dataL, dataE);
  }  
  return  dataL;
}*/
configureALIX(masTest);













