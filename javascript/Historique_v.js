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


var Historique_mVc = function(model, contextDivId,aladinLite_V){
	this.that = this;
	this.model = model;
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.aladinLite_V = aladinLite_V;
}

Historique_mVc.prototype = {
		drawContext : function(){
			var self = this;
			var vide = true;
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//take the data in localstorage and show the list of marked history  
			var html = `
				<b class="alix_titlle_image" style=" margin-left: 15px;">Bookmarks:</b>
				<div style="height:230px;overflow:auto;"><ul id = "history_ul" style="padding-left:18px;">`;
			deleteAllObjs();
			let k=0;
			for (let key in localStorage) {
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:bookmark')){
					let Item = JSON.parse(localStorage.getItem(key));
					Item.id = k;
					//Create the new aladinliteview according to the bookmark to have the functions in the prototype 
					let ItemFinal = setAladinLiteView(Item,key);
					if(ItemFinal.survey!= undefined){
						//localStorage.setItem(key,Item);
						//var obs_title = Item.survey.obs_title;

						//version1//html += "<li style='list-style-type: none;padding-top:5px;'>"+Item.getHTMLTitle(k,Item)+ "</li>";
						//version2//html += "<li style='list-style-type: none;padding-top:5px;'>"+eval('('+Item.getHTMLTitle+')').call(Item)+ "</li>";
						html += "<li style='position:relative;list-style-type: none;padding-top:5px;'>"+ItemFinal.getHTMLTitle()+ "</li>";
						html += "<div id='description_"+ k + "' style='display: none;'><span>Position: "
						+ ItemFinal.ra + ", " 
						+ ItemFinal.dec + "</span><br><span>Fov: " 
						+ ItemFinal.fov + "</span><br><span>Survey: "
						+ ItemFinal.survey.obs_title + "</span><p style='font-size:small;line-height: 1em;font-weight:100;color:#000000;'>"
						+ ItemFinal.survey.obs_description + "</p>"
						+ this.displayCataDescription(ItemFinal.catalogTab) +"</div>";
						vide = false;
					}
				}
				k++;
			}
			if(vide == true){
				html += "<p style='color:#1f252b;text-align:center'>No bookmark restored</p>";
			}
			html += '</ul></div>';
			this.contextDiv.html(html);
			
//			this.contextDiv.find('ul').on('click', 'li', function(e) {
//				e.stopPropagation(); 
//				
//				var idx = $(this).index();
//				var aladinLiteView= new AladinLiteView();
//				aladinLiteView.name = self.model.mark_tab[idx].name;
//				aladinLiteView.ra = self.model.mark_tab[idx].ra;
//				aladinLiteView.dec = self.model.mark_tab[idx].dec;
//				aladinLiteView.fov = self.model.mark_tab[idx].fov;
//				aladinLiteView.survey = self.model.mark_tab[idx].survey;
//				aladinLiteView.region = self.model.mark_tab[idx].region;
//				self.model.restoreView(aladinLiteView);	
//				
//				
//			});
			
			//Add handlers for each bookmark  
			for(let k=0 ; k<localStorage.length; k++){
				var ItemFinal = getAladinLiteView(k);
				if( ItemFinal){
				ItemFinal.setHandlers();
				$("#" + k +"_menu_show_description").click(function(e){
					$("#description_" + this.id.replace("_menu_show_description","")).slideToggle();
					e.stopPropagation();
				});
				}
			}
			
			
		},
		
		displayCataDescription: function(catalogTab){
			var str = "";
			if(catalogTab.length > 0){
				str += "<span>Catalog: <br>"
				for(var i=0;i<catalogTab.length;i++){
					str+=catalogTab[i].catalog + ",  ";
				}
				str +="</span>";
			}
			return str;
			
		},
		/**
		@param {string} targetedAmoraSession
		 */
		amoraSessionBelongTo(targetedAmoraSession) {
			for (let key in localStorage) {
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:bookmark')){
					let item = JSON.parse(localStorage.getItem(key));
					if ('amoraSession' in item && item.amoraSession === targetedAmoraSession) {
						return true;
					}
				}
			}
			return false;
		}
}





