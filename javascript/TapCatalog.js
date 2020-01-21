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
		console.log(url_query);
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
	
}();