
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
var u="http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/tap/sync";
var param ="PHASE=RUN&REQUEST=doQuery&LANG=ADQL&QUERY={$query}";

$().ready(function() {
   	$("#addTarget").click(
	
	function() {
      alixapi.displayTarget();
//var position =83.6352092+" "+22.054
		//	alixapi.showPopup(position)
    	});
   	$("#getView").click(function() {
		alert(JSON.stringify(AladinLiteX_mVc.getCurrentView()))
	});
   	$("#changeRef").click(function() {
		alixapi.changeRef();
	});
   	$("#changeRefBlue").click(function() {
	     alixapi.changeRefBlue();
	});
   	$("#center").click(function() {
		alixapi.center();
		//AladinLiteX_mVc.returnCenter();
   	});
 })



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

//this function is use to display position of choosed table went";
var tab="";
$().ready(function() {
   	$("#addTarget2").click(function() {
   		//AladinLiteX_mVc.displayTarget(function(ra,dec){a=quer(ra);alert([a, dec]);});
  		tab = $('#input_target2').val();
		var u =$('#input_url').val();
		var a=quer(tab)
		alixapi.displayDataTab(u,tab,a,param);
	
    	});
		$('#xmm_result').click(function(bd,url_base,table,query,position){
			bd=$("#xmm_bd").val();
			alixapi.connectTapService(bd,url_base,table,query,position);
		});
		$('#cacd_result').click(function(bd,url_base,table,query,position){
			bd=$("#cacd_bd").val();
			alixapi.connectTapService(bd,url_base,table,query,position);
		});
		$('#gavo_result').click(function(bd,url_base,table,query,position){
			bd=$("#gavo_bd").val();
			alixapi.connectTapService(bd,url_base,table,query,position);
				});
		$('#simbad_result').click(function(bd,url_base,table,query,position){
			bd=$("#simbad_bd").val();
			alixapi.connectTapService(bd,url_base,table,query,position);
		});
		$("#deletePolygone").click(function(){
		
		alixapi.removePolygone();
	
	})
   
 })

// function to create query went choosing a table
 function quer(table){
	var req="";
	if(tab=="ivoa.ObsCore" || tab=="ivoa.ObsCore10"){
	req ="SELECT TOP 100 * FROM "+table+" WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";

	}else if(tab=="caom2.SIAv1"){
		req ="SELECT TOP 100 * FROM "+table+" WHERE CONTAINS(POINT('ICRS', position_center_ra, position_center_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";

	}else{
		req ="SELECT TOP 100 * FROM "+table+" WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, 0.016))=1";
	}
	
					
	return req;

}

function defaulDisplayView(position){
	defaultView = {
	        defaultSurvey: "CDS/P/DSS2/color",
     	        field: {
	       		position: position,
				defaultFov: "0.5"
	        }
		};
		
		return defaultView;
}

function resetParameterView(url_base,query,parameter){
	masTest.masterResource.affichage.location.url_base=url_base+"?"+parameter;
	masTest.masterResource.affichage.location.url_query=query;
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













