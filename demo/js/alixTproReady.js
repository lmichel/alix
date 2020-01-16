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
$().ready(function() {
	$("#showSimbad").click(function() {
   		//$("#aladin-lite-div").html("");
		masterResource={
				affichage :{
					location :{
						//url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
						url_base: "http://simbad.u-strasbg.fr/simbad/sim-tap/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?RUNID={$RUNID}&REQUEST=doQuery&lang=ADQL&query={$query}",
						
						//url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}",
						url_query: "SELECT TOP 10000 * FROM \"public\".basic WHERE CONTAINS(POINT(\'ICRS\', ra, dec), CIRCLE(\'ICRS\', {$ra}, {$dec}, {$fov})) = 1",
						//url_query: "SELECT  TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
						//url_query:  "SELECT TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
						
					},
					progressiveMode: false,
					RUNID : 'TapHandle-archivestsciedu-caomtap;ivoa;obscore',
					radiusUnit : 'deg',
					format : 'votable/td',
					label : "Simbad TAP",
					description: "Texte plus complet qui donne plus d'informations",
					display:true
				}
			}
		/*TapCatalog.setTapTableAsMaster({url_base: "http://simbad.u-strasbg.fr/simbad/sim-tap/",
			url_query: "SELECT  TOP 100  * FROM \"public\".basic WHERE CONTAINS(POINT(\'ICRS\', ra, dec), CIRCLE(\'ICRS\', 23.462083, +30.659917, 0.016666666666666666)) = 1 ",
			format: "votable/td",
			RUNID : 'TapHandle-cadcnrcca-argus;ivoa;ObsCore',
			label : "CADC TAP"});*/
   		AladinLiteX_mVc.changeMasterResource(masterResource);
		$("#XMM").html("Simbad TAP");
		
    });
	
	$("#showCaom").click(function(){
		TapCatalog.setTapTableAsMaster({url_base: "https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/argus/",
				url_query: "SELECT  TOP 100  * FROM ivoa.ObsCore WHERE (ivoa.ObsCore.facility_name LIKE 'OM%') AND(CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', 10.684667, +41.268750, 0.016666666666666666)) = 1)",
				format: "votable/td",
				RUNID : 'TapHandle-cadcnrcca-argus;ivoa;ObsCore',
				label : "CADC TAP"});
		$("#XMM").html("CADC TAP");		
		/*masterResource={
				affichage :{
					location :{
						//url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
						//url_base: "http://simbad.u-strasbg.fr/simbad/sim-tap/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?RUNID={$RUNID}&REQUEST=doQuery&lang=ADQL&query={$query}",
						
						//url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}",
						//url_query: "SELECT TOP 10000 * FROM \"public\".basic WHERE CONTAINS(POINT(\'ICRS\', ra, dec), CIRCLE(\'ICRS\', {$ra}, {$dec}, {$fov})) = 1",
						//url_query: "SELECT  TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
						url_query:  "SELECT TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
						
					},
					progressiveMode: false,
					RUNID : 'TapHandle-archivestsciedu-caomtap;ivoa;obscore',
					radiusUnit : 'deg',
					format : 'votable/td',
					label : "Caom TAP",
					description: "Texte plus complet qui donne plus d'informations",
					display:true
				}
			}
   		AladinLiteX_mVc.changeMasterResource(masterResource);
		$("#XMM").html("Caom Tap");*/
	});
	
	
});



var masTest = {
		defaultView: {
			defaultSurvey: "DSS colored",
		},
		masterResource: {
			affichage :{
				location :{
					//url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
					url_base: "http://simbad.u-strasbg.fr/simbad/sim-tap/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
					//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
					//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?RUNID={$RUNID}&REQUEST=doQuery&lang=ADQL&query={$query}",
					
					//url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}",
					url_query: "SELECT TOP 10000 * FROM \"public\".basic WHERE CONTAINS(POINT(\'ICRS\', ra, dec), CIRCLE(\'ICRS\', {$ra}, {$dec}, {$fov})) = 1",
					//url_query: "SELECT  TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
					//url_query:  "SELECT TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
					//url_limit:  "Order By _n_detections desc Limit 15",
				},
				progressiveMode: false,
				RUNID : 'TapHandle-archivestsciedu-caomtap;ivoa;obscore',
				//radiusUnit :'arcmin',
				radiusUnit : 'deg',
				//format : 'votable',
				format : 'votable/td',
				label : "Simbad TAP",
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
					active:true
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













