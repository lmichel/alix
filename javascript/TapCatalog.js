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
		/*
		if(url_query.indexOf("public")!=-1){
			var a = '\\"';
			url_query=url_query.replace(/"/g,a);
			var b = "\\'";
			url_query=url_query.replace(/'/g,b);
		}*/
		var RUNID = bag.RUNID;
		var format = bag.format;
		var label = bag.label;
		console.log(url_query);
		masterResource={
				affichage :{
					location :{
						//url_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",
						//url_base: "http://simbad.u-strasbg.fr/simbad/sim-tap/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?query={$query}&format={$format}&lang=ADQL&request=doQuery",
						//url_base: "http://vao.stsci.edu/CAOMTAP/TapService.aspx/sync?RUNID={$RUNID}&REQUEST=doQuery&lang=ADQL&query={$query}",
						url_base : url_base,
						
						//url_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}",
						//url_query: "SELECT TOP 10000 * FROM \"public\".basic WHERE CONTAINS(POINT(\'ICRS\', ra, dec), CIRCLE(\'ICRS\', {$ra}, {$dec}, {$fov})) = 1",
						//url_query: "SELECT  TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
						//url_query:  "SELECT TOP 100 * FROM ivoa.obscore WHERE CONTAINS(POINT('ICRS', s_ra, s_dec), CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1",
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
   		AladinLiteX_mVc.changeMasterResource(masterResource);
	}
	var retour = {
			setTapTableAsMaster:setTapTableAsMaster	
	}
	
	return retour;
	
}();