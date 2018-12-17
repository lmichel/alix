
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
			defaultSurvey: "DSS colored",/**/
		},
		masterResource: {
			affichage :{
				location :{
					//url: 'http://saada:8080/ThreeXMMdr5/getqueryreport?query=Select%20ENTRY%20From%20EnhancedEntry%20In%20Enhanced%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%22{$ra}%20{$dec}%22%2C%20{$fov}%2C%20-%2C%20ICRS)%0A%7D&format={$format}'
					url:"http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%22{$ra}%20{$dec}%22%2C%20{$fov}%2C%20-%2C%20ICRS)%0A%7D&format={$format}&protocol=auto",
					url_base: "http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
					url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle(($ra) ($dec), ($fov),-, ICRS)} {$limitQuery}",/**/
					//  url_test:"http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWhereAttributeSaada%20%7B%0A%20%20%20%20%20_n_detections%20%3C%2010%0A%7D%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%2223.4621%2030.6599417%22%2C%2029.92462264081761%2C%20-%2C%20ICRS)%0A%7D&format=votable&protocol=auto"
				},
				progressiveMode: false,/**/
				progressiveLimit: "Order By _n_detections desc Limit 15",/**/
				queryMode: true,/**/
				radiusUnit : 'arcmin',/**/
				format : 'votable',/**/
				label : "3XMM Catalogue",/**/
				description: "Texte plus complet qui donne plus d'informations",/**/
				display:true/**/
			},	
			actions :{
				showAssociated :{
					active:true,
					name:'',
					id : '',
					format : {},
					label:"ACDS Sources",
					url : 'http://obs-stage-c11:8080/3xmmdr8/getalixassocie/acdslinks?oid={$oidsaada}&mode=aladinlite',
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
					callBack: function(data,showPanel){
						//CatalogMerged_mVc.draw(data,showPanel);
						//The callback is called when we click a source. We can import other scripts to show more details about the source selected.
					},
					handlerFilter: function(){
						//SourceFilter_mVc.draw();
					}//The handlerFilter function will be called in the beginning when the web is loaded.
				}
			}
		}		
};
var mixConf = function(localData,externalData) {      
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
  return  dataL;*/
}

var configureALIX = function(){
	if(masTest){
	confData = mixConf(confData,masTest);
	}
	AladinLiteX_mVc.init(confData);
}()














