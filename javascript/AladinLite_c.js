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
"use strict"
function AladinLite_mvC(aladinView, controllers){
	this.modules = {};
	this.aladinView = aladinView;
	if (controllers.historic != undefined ){
		this.modules.historicModel = controllers.historic.model;
	}
    if (controllers.regionEditor != undefined ){
	    this.modules.regionEditorView = controllers.regionEditor.view;
    }
    if (controllers.hipsSelector != undefined ){
	    this.modules.hipsSelectorModel = controllers.hipsSelector.model;
    }


}

AladinLite_mvC.prototype = {
		
		bookMark: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.bookMark(aladinLiteView);
			else 
				return null;
		},
		
		deleteHistory : function(id){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.deleteHistory(id );
			else
				return null;
		},
		
		getHistory: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.getHistory(aladinLiteView);
			else 
				return null;
		},

		
		editRegion: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.init();
			else
				return null;
		},
		
		closeEditor: function(){
			if(this.modules.regionEditorView != undefined) 
				this.modules.regionEditorView.setBrowseMode();
			 else
				return null;
		},
		
		setInitialValue: function(points){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setInitialValue(points);
			else
				return null;
		},
		
		cleanPolygon: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.clean();
			else
				return null;
		},
		
		setPoligon: function(region){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setPoligon(region);
			else
				return null;
		},
		
		restoreViewById: function(viewId){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.restoreViewById(viewId);
			else
				return null;
		},
		
		searchHips: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchHips(mask, aladinLiteView);
			else
				return null;			
		},
		
		getSelectedHips: function(ID){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedHips(ID);
			else
				return null;
		},

		searchCataloge: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchCataloge(mask, aladinLiteView);
			else
				return null;
		},
		
		buildCataTab: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getDataFromUrl(aladinLiteView);
			else
				return null;
		},
		
		getSelectedCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedCatalog(obs_id);
			else
				return null;
		},
		storeCurrentCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.storeCurrentCatalog(obs_id);
			else
				return null;
		},

		deleteCatalogInTab: function(i){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.deleteCatalogInTab(i);
			else
				return null;
		},
		createCatalogSelect: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.createCatalogSelect(obs_id);
			else
				return null;
		},
		
		displaySimbadCatalog: function(){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displaySimbadCatalog();
			else
				return null;
		},
		
		displayNedCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayNedCatalog(aladinLiteView);
			else
				return null;
		},
		
		restoreCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.restoreCatalog(aladinLiteView);
			else
				return null;
		},
		
		currentCatalogTab: function(catalogDisplayed){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.currentCatalogTab(catalogDisplayed);
			else
				return null;
		},
		
		displayDataXml: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayDataXml(aladinLiteView);
			else
				return null;
		},
		
		
		updateCatalogs: function(aladinLiteView, state){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.updateCatalogs(aladinLiteView,state);
			else
				return null;
		}
		
		
}