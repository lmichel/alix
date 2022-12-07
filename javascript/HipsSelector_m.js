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

/**
 * 
 * parentDivId="aladin-lite-div"
 * 
 */
//"use strict"
function HipsSelector_Mvc (parentDivId, aladinLite_V){
	this.tapSchemaQuery = "SELECT  TOP 100  tap_schema.tables.schema_name as schema, "
		+ "tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd "
		+ "FROM tap_schema.columns "
		+ "JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name "
		+ "WHERE tap_schema.columns.table_name = '{$CATID}'";
	this.productType = null;
	this.baseUrl = null
	this.imageIdPattern 	= new RegExp(/.*\/C\/.*/);
	this.imageTilePattern 	= new RegExp(/.*((jpeg)|(png)).*/);
	this.view = new HipsSelector_mVc(parentDivId, this);
	this.hips_dict = {};
	this.cata_dict = {};// les catalog trouveés 
	this.cata_tab = [];//pour stoker obs_id et afficher dans le panneau
	this.cata_created = {}; //tous les catalog qui a été crée par A.cata... et afficher dans aladin sont stoker comme objet cata 
	this.color = {};
	this.aladinLite_V = aladinLite_V;
}

HipsSelector_Mvc.prototype = {	
		searchHips : function(mask,aladinLiteView){
			var that = this;
			
			/**
			 * créer le lien url pour acces au serveur
			 */
			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			
			/**
			 * afficher le panel de la liste
			 */
			//that.view.displaylistepanel();
			that.productType = "image";
			var url = this.baseUrl;
			if( mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
						if( that.productType == "image" ){
							for(var i = jsondata.length - 1; i >= 0; i--) {
								var keepIt = 0;
									if(  $.isArray(jsondata[i].hips_tile_format)) {
										for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
											if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
												keepIt = 1;
												break;
											}
										}
									} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
										keepIt = 1;
									}
								if( keepIt == 0 ){
									jsondata.splice(i, 1);
								}
							}
						}
					}

					that.storeHips(jsondata);
					that.view.displayHipsList(jsondata);
			});
		},
		
		storeHips : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.hips_dict[jsondata[i].ID]= jsondata[i];
			}
		},
		buildHipsTab: function(aladinLiteView){
			var that = this;
			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			that.productType = "image";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
				if( that.productType != undefined ){
					for(var i = jsondata.length - 1; i >= 0; i--) {
						if(jsondata[i].dataproduct_type != that.productType ) {
							jsondata.splice(i, 1);
						}
					}
					if( that.productType == "image" ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							var keepIt = 0;
								if(  $.isArray(jsondata[i].hips_tile_format)) {
									for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
										if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
											keepIt = 1;
											break;
										}
									}
								} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
									keepIt = 1;
								}
							if( keepIt == 0 ){
								jsondata.splice(i, 1);
							}
						}
					}
				}
				that.storeHips(jsondata);
		});
			
		},
		getSelectedHips: function(ID){
			return this.hips_dict[ID];
		},
		
		/**
		 * la différence entre le cataloge et le hips est le 'productType'
		 */
		searchCataloge: function(mask,aladinLiteView){
			var that = this;

			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=100";

			//that.view.displaylistepanel();
			that.productType = "catalog";
			var url = this.baseUrl;
			if( mask != undefined &&mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					that.storeCatalog(jsondata);
					that.view.displayCatalogeList(jsondata);
			});
		},
		//create the data_dict for the catalogs in the bookmarks and restore the catalogs in vizier_list
		buildCataTab : function(aladinLiteView){
			var that = this;

			this.baseUrl ="https://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=200";

			that.productType = "catalog";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					for(var i=0 ; i<jsondata.length ; i++){
						that.cata_dict[jsondata[i].obs_id]= jsondata[i];
					}
					//restore the catalogs : display in current view + display in vizier_list
					that.restoreCatalog(aladinLiteView);
					
			});
		},
		
		storeCatalog : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.cata_dict[jsondata[i].obs_id]= jsondata[i];
			}
		},
		
		builTapQuery : function(obs_id){
			/*
			 * SELECT  TOP 100  tap_schema.tables.schema_name as schema, tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd
FROM tap_schema.columns
JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name
WHERE      tap_schema.columns.table_name = 'II/306/sdss8' 
			 */
			var query = this.tapSchemaQuery.replace('{$CATID}', obs_id);
		    $.ajax({
		        url: 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync',
		        data: {"lang": "adql",
		        	"request" : "doQuery",
		        	"format": "json",
		        	"query": query},
		        method: 'GET',
		        async: false, // Mode synchrone

		        dataType: 'json',
		        success: function(response) {
		        	var schema = response.data[0][0] + ".'" + obs_id + "'";
		        	for( var i=0 ; i<response.data.length ; i++){
		        		if( response.data[i][3].startsWith('phot.mag;em')) {
		    				var mag_col = response.data[i][2];
		    				var query = "SELECT TOP 500 * FROM " + schema 
		    				+ " WHERE " + mag_col + " IS NOT NULL AND CONTAINS(POINT('ICRS', RAJ2000, DEJ2000), BOX('ICRS', @ra@, @$dec@, @$fov@, @$fov@)) = 1 " 
		    				+ " ORDER BY " + mag_col + " asc";
		    				query = 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync?lang=adql&request=doQuery&' 
		    					+ encodeURI(query).replace(/@ra@/g, '{$ra}').replace(/@dec@/g, '{$dec}').replace(/@fov@/g, '{$fov}');
		    				cata_dict[obs_id].tapProgUrl = query;
		    				break;
		        		}
		        				
		        	}
		        },
		        error: function(xhr, status, error) {
		        	WaitingPanel.warn(xhr.responseText);
		        }
		    });
		},
		
		getSelectedCatalog: function(obs_id){
			return this.cata_dict[obs_id];
		},
		
		/*storeCurrentCatalog:function(obs_id){
			var state=false;
			for(var i=0;i<this.cata_tab.length;i++){
				if(this.cata_tab[i]==obs_id){
					state = true
					break;
				}
			}
			if(state==false){
				//this.builTapQuery(obs_id)
				this.cata_tab.push(obs_id);
			}
		},*/
		
		deleteCatalogInTab: function(i){
			this.cata_tab.splice(i, 1);			
		},
		
		createCatalogSelect: function(obs_id){
			var self=this;
			return this.view.createCatalogSelect(obs_id,self.cata_dict);
		},
		
		displaySimbadCatalog: function(){
			return this.view.displaySimbadCatalog();
		},
		
		displayNedCatalog: function(aladinLiteView){
			return this.view.displayNedCatalog(aladinLiteView);
		},
		
		currentCatalogTab: function(catalogsDisplayed){

			var self = this;
			var tab = [];
			//var hasNumber = /\d/;
			//create list(tab) of catalog displayed in the current view
			for(var i=0;i<catalogsDisplayed.length;i++){
				var element = {catalog:null, color: null,obs_id: null};
				var nameTemp = catalogsDisplayed[i].name;
				element.catalog = nameTemp;
				element.color = catalogsDisplayed[i].color;
				for(var name in LibraryCatalog.catalogs){
					if(LibraryCatalog.catalogs[name].nameTemp == nameTemp){
						element.catalog = LibraryCatalog.catalogs[name].name;
						element.color = LibraryCatalog.catalogs[name].color;
					}
				}
				if(element.catalog.startsWith('VizieR') ){
					//Seperate the obs_id from vizier name
					element.obs_id = element.catalog.split(":")[1];
				}
				tab.push(element);
			}
			return tab;			
		},
		//For bookmark :  display the catalogs in current view and  display the names in vizier_list
		restoreCatalog: function(aladinLiteView){
			var self =this;
			var map = {};
			for(var i=0; i<aladinLiteView.catalogTab.length; i++){
				var x;
				self.view.libraryMap.setCatalogByColor(aladinLiteView.catalogTab[i]);
				if(aladinLiteView.catalogTab[i].catalog=='Simbad'){
					self.displaySimbadCatalog();
				}else if(aladinLiteView.catalogTab[i].catalog=='NED'){
					self.displayNedCatalog(aladinLiteView);
				}
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id] && aladinLiteView.catalogTab[i].obs_id){
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url==undefined){
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable');
				}else{
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable', self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url);
				}
				//self.storeCurrentCatalog(aladinLiteView.catalogTab[i].obs_id);
				//map[aladinLiteView.catalogTab[i].obs_id] = x;
				}
			}
			this.view.redrawCatalogSelector(aladinLiteView,self.cata_dict);
		},
		
		displayDataXml: function(aladinLiteView){
			
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.displayDataXml(aladinLiteView,url);
		},
		
		updateCatalogs: function(aladinLiteView,state){
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.updateCatalogs(aladinLiteView,url,state);
		}
}