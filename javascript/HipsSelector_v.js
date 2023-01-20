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
 * @param parentDivId:  "aladin-lite-div"
 * @param model: HipsSelector_Mvc()
 * @returns
 */
//"use strict"
function HipsSelector_mVc(parentDivId, model){
	this.parentDivId = parentDivId;
	this.parentDiv = null;
	this.libraryMap = new LibraryMap();
//	this.idCounter = 0;
	this.model = model;
}

HipsSelector_mVc.prototype = {
		/**
		 * afficher le panneau de la liste sur aladin
		 */
		displaylistepanel : function(){
			/*if( this.parentDiv == null )
				this.parentDiv = $('#' + this.parentDivId);
			this.parentDiv.append('<div id="itemList" class="alix_hips_panel"></div>');*/
			//to avoid the repetition of the creation of itemlist div 
		},
		
		/**
		 * afficher la liste de surveys
		 */
		displayHipsList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='color:#2e3436;style='font-size: 15px;'>" + jsondata.length + " matching Hips images</span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);"'
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					itemList.append("<div id = 'panel_"
							+ jsondata[i].ID + "' class='alix_liste_item' ><bn class='alix_title_in_liste'>"
							+ jsondata[i].obs_title +" | "+jsondata[i].ID+"</bn></div><div id='" 
							+ jsondata[i].ID.replace(/\./g,'') 
							+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.hipsFunction(&quot;" + jsondata[i].ID
							+ "&quot,  &quot;"+ jsondata[i].obs_title.replace(/["']/, ' ') + "&quot)'>"  + jsondata[i].obs_title +"</span><br><br>"                                                                       
							+"<span style='font-size:small;color : #727371'>"+jsondata[i].ID +"</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_regime + "</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_description + "</span></div>");
					$(document.getElementById("panel_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id')	.replace('panel_','').replace(/\//g, "\\/").replace(/\./g,'');//solve the problem that CXC can't show up
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		displayCatalogeList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='font-size: 15px;'>" + jsondata.length + " matching Catalogues <b>*catalogue progressive</b></span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					if(jsondata[i].hips_service_url == undefined){
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' >"
								+ jsondata[i].obs_title +"</span></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot,  &quot;" + jsondata[i].obs_title.replace(/["']/, ' ') + "&quot);'>"    
								+ jsondata[i].obs_title
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span></div>");
					}else{
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' style='font-weight: bold;'>"
								+ jsondata[i].obs_title+"</span><i class='glyphicon glyphicon-asterisk' style='font-size:8px;'></i></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot,  &quot;" + jsondata[i].obs_title.replace(/["']/, ' ') + "&quot);'>"  
								+ jsondata[i].obs_title 
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span><br>"
								+ "<span style='font-size:small;'>"
								+ jsondata[i].hips_service_url+"</span></div>");
					}
					$(document.getElementById("catalog_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id').replace('catalog_','cata_').replace(/\//g, "\\/").replace(/\+/g,"\\+");
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		/**
		 * display the catalog list in panel
		 */
		createCatalogSelect : function(obs_id,cata_dict){
			/*
			 * draw the initial cata in AL
			 */	
			var self=this;
			$("#itemList").css("display", "none");
			//var obs_id=obs_id_list[obs_id_list.length-1];
			var cata_name = 'VizieR:'+obs_id;
			var cataInit = null;
			var catadata = cata_dict[obs_id];
			var color;
			if(LibraryCatalog.getCatalog(cata_name)){
				color = LibraryCatalog.getCatalog(cata_name).color;
				//if catalog exists already in library catalog,we take the color from libraryCatalog
			}else{
			    color = this.libraryMap.getNextFreeColor(obs_id).color;
			}//if not ,we take a color from color map
			WaitingPanel.show(obs_id);
			if(catadata.hips_service_url!=undefined){
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color,'showTable', catadata.hips_service_url);
				//self.model.cata_created[obs_id] = cataInit;
			}else{
				//self.model.builTapQuery(catad.obs_id)
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color, 'showTable');
				//self.model.cata_created[obs_id] = cataInit;
			}
			/*
			 * draw the list of cata in panel 
			 */
			var id = LibraryCatalog.getCatalog(cata_name).id;
			$("#vizier_list").append('<li id="cata_list_'+ id +'" class = "'+obs_id+'"style="list-style-type: none;height:auto;">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+color+';" >' + cata_dict[obs_id].obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_flash_catalog_'+id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_delete_catalog_'+id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');		
			var x = id;
			// show or hide the catalog		
			$('#cata_operate_'+id).unbind("click").click(function(event){	
					event.stopPropagation();
					var obs_id = $(this).text();
					var cata_name = 'VizieR:'+obs_id;
					var cataColor = LibraryCatalog.getCatalog(cata_name).color;
					var catadata = cata_dict[obs_id];
					
					if($(this).attr("class") != "alix_vizier_chosen "){					
						$(this).attr("class", "alix_vizier_chosen ");
						$(this).css("color", cataColor);
						
						WaitingPanel.show(obs_id);

						$("#itemList").css("display", "none");
						if(catadata.hips_service_url != undefined){
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
					}else{
						$(this).attr("class", "alix_vizier_in_menu ");
						$(this).css("color", "#888a85");
						self.model.aladinLite_V.cleanCatalog(cata_name);
					}				
			});
			// delete the catalog in the current view and library catalog and free the color in library map
			$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
				event.stopPropagation();
				//var obs_id =$("#cata_operate_"+ x).text();
				var obs_id = this.parentNode.className;
				var cata_name = 'VizieR:'+obs_id;
				AladinLiteX_mVc.deleteLastSelectedPositionByCatalog(obs_id);
				//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
				//var catadata = cata_dict[obs_id];
			    self.model.aladinLite_V.cleanCatalog(cata_name);
			    self.libraryMap.freeColor(obs_id);
				LibraryCatalog.delCatalog(cata_name);
				this.parentNode.remove();
				AladinLiteX_mVc.closeContext();
				
			    return false ;
			});
			//catalog flash
			$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
				event.stopPropagation();
				var obs_id =$("#cata_operate_"+ x).text();
				var cata_name = 'VizieR:'+obs_id;
				LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
				//self.model.cata_created[obs_id].makeFlash();
			});
			
			
	
		},
		displaySimbadCatalog : function(){
			var self=this;
			var name = 'Simbad';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
			if(cmdNode.attr("class") == "alix_simbad_in_menu  alix_datahelp" ){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_simbad_in_menu  alix_datahelp_selected");
				cmdNode.css("color", color);
				 $("#btn-Simbad-configure").css("color", color);
				 $("#btn-Simbad-flash").css("color", color);
				self.model.aladinLite_V.displayCatalog(name, color, VizierCatalogue.showSourceData, url);
			}else{
				cmdNode.attr("class", "alix_simbad_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-Simbad-configure").css("color", "#888a85");
				 $("#btn-Simbad-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
				AladinLiteX_mVc.closeContext();
				$("#SearchType").css("display","none");
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		displayNedCatalog: function(aladinLiteView){
			var self= this;
			var name = 'NED';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			var clickType = 'showTable';
			if(cmdNode.attr("class") == "alix_ned_in_menu  alix_datahelp" ){
				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.affichage.progressiveMode == false){
					WaitingPanel.warnFov();
				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_ned_in_menu  alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-NED-configure").css("color", color);
					$("#btn-NED-flash").css("color", color);
					self.model.aladinLite_V.displayCatalog(name, color, VizierCatalogue.showSourceData);
				}
			}else{
				cmdNode.attr("class", "alix_ned_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-NED-configure").css("color", "#888a85");
				 $("#btn-NED-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);//delete the Ned in library
				AladinLiteX_mVc.closeContext();
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		/**
		 * aladinLiteView = {
			this.name = null;
			this.ra = null;
			this.dec = null; 
			this.fov = null;
			this.survey = null;
			this.region = null;
			this.id = null;
			this.img = null;
			this.XMM = false;
			this.catalogTab = null;
			}
		 */
		//redraw vizier list when a bookmark in the history is selected and replayed
		redrawCatalogSelector: function(aladinLiteView,cata_dict){
			var self = this;
			var html='';
			//if(map.length != 0){	
			$("#vizier_list").html(html);
				for(var j=0;j<aladinLiteView.catalogTab.length;j++){
					var catalog = aladinLiteView.catalogTab[j].catalog;
					var obs_id = aladinLiteView.catalogTab[j].obs_id;
					if(obs_id != undefined){
						if(LibraryCatalog.getCatalog(catalog)){
							var color = LibraryCatalog.getCatalog(catalog).color;
							var id = LibraryCatalog.getCatalog(catalog).id;
						}else{
							var color = aladinLiteView.catalogTab[j].color;
							
						}
						$("#vizier_list").append( '<li style="list-style-type: none;height:24px;" class="'+ obs_id + '">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+color+';" >' + obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+ id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_flash_catalog_'+ id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_delete_catalog_'+ id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');
						
					//$('#vizier').on('click','#cata_operate_'+id,function(event){		
						$('#cata_operate_'+id).unbind("click").click(function(event){		
							event.stopPropagation();
							var obs_id = $(this).text();
							var cata_name = 'VizieR:'+obs_id;
							var cataColor = LibraryCatalog.getCatalog(cata_name).color;
							var catadata = cata_dict[obs_id];
							
							if($(this).attr("class") != "alix_vizier_chosen "){					
								$(this).attr("class", "alix_vizier_chosen ");
								$(this).css("color", cataColor);
								
								WaitingPanel.show(obs_id);

								$("#itemList").css("display", "none");
								if(catadata.hips_service_url != undefined){
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
									//self.model.cata_created[obs_id] = cataInit;
								}else{
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
									//self.model.cata_created[obs_id] = cataInit;
								}
							}else{
								$(this).attr("class", "alix_vizier_in_menu ");
								$(this).css("color", "#888a85");
								self.model.aladinLite_V.cleanCatalog(cata_name);
							}				
					});
						//add handlers for each catalog in the vizier list
					$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
						event.stopPropagation();
						
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
						//var catadata = cata_dict[obs_id];
					    self.model.aladinLite_V.cleanCatalog(cata_name);
					    self.libraryMap.freeColor(obs_id);
						LibraryCatalog.delCatalog(cata_name);
						this.parentNode.remove();
						AladinLiteX_mVc.closeContext();
						return false ;
					});
					$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
						event.stopPropagation();
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
					//	map[obs_id].makeFlash();
						
					});
						
				}
				}
			//}
		
		},
		
		/**
		 * dataXML={position, service}
		 */
		//display local catalog such as 3XMM
		displayDataXml: function(aladinLiteView,url){
			var label = aladinLiteView.masterResource.affichage.label;
			var self = this;
			var name = 'Swarm';
			var cmdNode = $("#XMM");
			var clickType = 'handler';
			var color= '#ff0000';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			if(!cmdNode.text().includes(label)){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");
				cmdNode.css("color", color);
				$("#btn-XMM-description").css("color" , color);
				$("#btn-XMM-flash").css("color" ,color);
				$("#btn-XMM-configure").css("color" ,color);
				if(cmdNode.text().includes("3XMM Catalogue"))
					$("#ACDS").css("display" , "inline");
				self.model.aladinLite_V.displayCatalog(name, "#ff0000", clickType, url);
			}
			else if(cmdNode.attr("class") == "alix_XMM_in_menu  alix_datahelp"){
//				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false){
//					WaitingPanel.warnFov();
//				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-XMM-description").css("color" , color);
					$("#btn-XMM-flash").css("color" ,color);
					$("#btn-XMM-configure").css("color" ,color);
					if(cmdNode.text().includes("3XMM Catalogue"))
						$("#ACDS").css("display" , "inline");
					self.model.aladinLite_V.displayCatalog(name, "#ff0000", clickType, url);
//				}
				/*}else if(cmdNode.attr("class") == "alix_XMM_in_menu  alix_datahelp_nochange"){
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp_selected");*/
				//to avoid" when we display a view in the bookmark who contains XMM, it will recall displaydataxml(), and if xmm has been already showed ,function displaydataxml will lead to delete the XMM."	
			}else{
				cmdNode.attr("class", "alix_XMM_in_menu  alix_datahelp");
				cmdNode.css("color", "#888a85");
				$("#btn-XMM-flash").css("color" , "#888a85");
				$("#btn-XMM-description").css("color" , "#888a85");
				$("#btn-XMM-configure").css("color" , "#888a85");
				$("#ACDS").css("display" , "none");
				self.model.aladinLite_V.cleanCatalog(name);
				//$("#aladin-lite-div-context").html("");
				self.model.aladinLite_V.cleanCatalog("Target");
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
			}
				AladinLiteX_mVc.closeContext();
		},
		
		//update each catalog shown in current view when we change the position or zoom 		
		updateCatalogs: function(aladinLiteView,url,state){
			var self = this;
			//Check if the catalog is displayed
			if($(document.getElementById("XMM")).attr("class") == "alix_XMM_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				if(state == 'zoom'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}else{
						self.model.aladinLite_V.cleanCatalog('Swarm');
						WaitingPanel.show('Swarm');
						self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
					}
				}else if(state == 'position'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}
					self.model.aladinLite_V.cleanCatalog('Swarm');
					WaitingPanel.show('Swarm');
					self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
				}
			}
			if($(document.getElementById("NED")).attr("class") == "alix_ned_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var name ='NED'
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.affichage.progressiveMode == false){
						WaitingPanel.warnFov();
					}else{
						WaitingPanel.show(name);
						self.model.aladinLite_V.displayCatalog(name, color, clickType);
					}
			}
			if($(document.getElementById("Simbad")).attr("class") == "alix_simbad_in_menu  alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
				var name ='Simbad';
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
				WaitingPanel.show(name);
				self.model.aladinLite_V.displayCatalog(name, color, clickType, url);
				SimbadCatalog.displayCatalogFiltered();
			}
			//Update the vizier catalogs
			if(LibraryCatalog.catalogs != null){
				self.model.aladinLite_V.storeCurrentState();
				var cata = null;
				//When we zoom
				if(state == 'zoom'){
					//for(var i=0;i<self.model.cata_tab.length;i++){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen "){
						if(catalog.url!=undefined){
							//console.log("Progressive Vizier:"+name+"<<<url>>>"+catalog.url)
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							//console.log("Unprogressive Vizier:"+name+"<<<no url>>>")
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
//							if(aladinLiteView.fov>=1){
//								WaitingPanel.warnFov();
//							}else{
//								if($(document.getElementById("cata_operate_"+i)).attr("class") == "alix_vizier_chosen "){
//									self.model.aladinLite_V.cleanCatalog("VizieR:"+self.model.cata_tab[i]);
//									cataInit = self.model.aladinLite_V.displayVizierCatalog(self.model.cata_tab[i] , self.libraryMap.getColorByCatalog(self.model.cata_tab[i]).color, 'showTable');
//									self.model.cata_created[self.model.cata_tab[i]] = cataInit;
//								}
//							}
						}
					  }
					}
					//when we change the position
				}else if(state == 'position'){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						var cataInit = null;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen "){
							if(catalog.url==undefined){
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id , catalog.color, 'showTable');
								//self.model.cata_created[obs_id] = cataInit;
							}else{
								// catalogue porgressifs
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
								//self.model.cata_created[obs_id] = cataInit;
								}
							
						}
						}
					}
				}
			}
		}
}