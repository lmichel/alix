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

var LibraryMap = function(){
	this.colorMap = {};
	this.colorMap["Simbad"] = {color:"#d66199", catalog:"Simbad", dot:""};
	this.colorMap["NED"]    = {color:"orange", catalog:"NED", dot:""};
	
	this.colorMap["green_apple"] = {color:"#00ff02", catalog:"", dot:""};
	this.colorMap["purple"] = {color:"#7f00d4", catalog:"", dot:""};
	this.colorMap["salmon"] = {color:"#ff9966", catalog:"", dot:""};
	this.colorMap["dark_bleu"] = {color:"#0034f1", catalog:"", dot:""}; 
	this.colorMap["red_apple"] = {color:"#ff0000", catalog:"", dot:""}; 
	this.colorMap["sky_bleu"] = {color:"#03fffc", catalog:"", dot:""}; 
	this.colorMap["brown"] = {color:"#975200", catalog:"", dot:""}; 
	this.colorMap["yellow"] = {color:"#faff00", catalog:"", dot:""}; 
	this.colorMap["argent"] = {color:"#f3f3f3", catalog:"", dot:""}; 
 
 
}

LibraryMap.prototype = {

		getNextFreeColor: function(catalog){
			
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == "") {
					this.colorMap[key].catalog = catalog;
					return this.colorMap[key];
				}
			}	

			return null;
		},
		
		
		freeColor: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					this.colorMap[key].catalog = "";
				}
			}	
			
		},
		
		getColorByCatalog: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					return this.colorMap[key];
					break;
				}

			}	
		},
	
		/*
		 * help history to rebuild the table colorMap
		 */
		setCatalogByColor: function(tab){  //tab={catalog, color}
			for(var key in this.colorMap) {
				if( this.colorMap[key].color == tab.color) {
					this.colorMap[key].catalog = tab.catalog;
				}
			}
			
		}
		
}