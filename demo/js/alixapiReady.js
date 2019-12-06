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
$().ready(function() {
   	$("#addTarget").click(function() {
   		AladinLiteX_mVc.displayTarget(function(ra,dec){alert([ra, dec]);});
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
   	$("#changeRefBlue").click(function() {
  	  defaultView = {
    	       // defaultSurvey: "ESAVO/P/XMM/EPIC-RGB",
     	        field: {
     	        	defaultFov: "0.9",
     	        	//position: "M33"
     	        	position:"23.46,30.66"
     	        },
				region: {
	        		type:"array",
	        		value:[
	        			202.86460559637285,47.508903373646355,
	        			202.9658591997302,46.884383185785104,
	        			202.00061058533635,47.16490427482837
	        		]   
 				}
  	    };
  	   defaultView = mixConf(confData.defaultView,defaultView);
  	   AladinLiteX_mVc.setReferenceView(defaultView);
	});
   	$("#center").click(function() {
		AladinLiteX_mVc.returnCenter();
   	});
 })


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
		},
		masterResource: {
			affichage :{
				location :{
					//url_base:"http://saada.unistra.fr/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%22{$ra}%20{$dec}%22%2C%20{$fov}%2C%20-%2C%20ICRS)%0A%7D&format={$format}&protocol=auto",
					url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
					url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}",
					url_limit:  "Order By _n_detections desc Limit 15",
					//url_base:"http://saada.unistra.fr/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWhereAttributeSaada%20%7B%0A%20%20%20%20%20_n_detections%20%3C%2010%0A%7D%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%2223.4621%2030.6599417%22%2C%2029.92462264081761%2C%20-%2C%20ICRS)%0A%7D&format=votable&protocol=auto"
				},
				progressiveMode: false,
				radiusUnit : 'arcmin',
				format : 'votable',
				label : "3XMM Catalogue",
				description: "Texte plus complet qui donne plus d'informations",
				display:false
			},	
			actions :{
				showAssociated :{
					active:true,
					name:'',
					id : '',
					format : {},
					label:"ACDS Sources",
					url : 'http://saada.unistra.fr/3xmmdr8xinyu/getalixassocie/acdslinks?oid={$oidsaada}&mode=aladinlite',
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
 
 var mixConf = function(localData,externalData) {      
for(var key in externalData){
	if(typeof(externalData[key])== "object" && localData[key])
		{
		externalData[key] = mixConf(localData[key],externalData[key])
		}
}
return Object.assign(localData,externalData)
}

var configureALIX = function(){
	if(masTest){
	confData = mixConf(confData,masTest);
	}
	AladinLiteX_mVc.init(confData);
}
 configureALIX(masTest);













