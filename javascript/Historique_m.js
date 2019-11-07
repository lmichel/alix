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
function Historique_Mvc(contextDivId, aladinLite_V){
	this.that = this;
	this.aladinLite_V = aladinLite_V;
	this.mark_tab = [];
	this.view = new Historique_mVc(this, contextDivId,aladinLite_V);
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.idCounter=0;
	this.hips_tab = [];
	this.position_tab = [];
}

Historique_Mvc.prototype = {
		bookMark : function(position){
			// we create a copy of the position object, as its attributes might be updated
			var positionCopy = jQuery.extend(true, {}, position);
			positionCopy.comment = "";
			if(positionCopy.target.length > 0){
				for(var i = 0;i<positionCopy.target.length;i++){
					positionCopy.target[i].ct = null//To save locally, we need to take off the ct reference because it's a circular structure
				}
			}
		//	var positionCopyClone = deepClone(positionCopy);//transform the function to string by deepClone, without this the functions can't be transported by stringify
			var positionCopyStr = JSON.stringify(positionCopy);
			var date = 'alix:'+new Date();//as the unique key for each bookmark in localstorage
			try{
				//save an bookmark locally
			localStorage.setItem(date,positionCopyStr);}
			//When the memory is not enough for another bookmark ,alert and propose to clear all the bookmarks
			catch(error){
				var _lsTotal = 0, _xLen, _x; var log = [];
				var message = 'Sorry. There\'s no more memory to save the new bookmark,you can delete some bookmarks in the list,or do you want to clear all the storage?'
				log.push(message);
				for (_x in localStorage) { 
					_xLen = (((localStorage[_x].length || 0) + (_x.length || 0)) * 2); 
					_lsTotal += _xLen; log.push(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
				}; 
					log.push("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
				if(confirm(log.join("\n"))){
					if(confirm("Do you really want to delete all the storage?")){
							localStorage.clear();
						}
					}
				}
		  
			this.mark_tab.unshift(positionCopy);    //add the element at top of the list
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//if(this.contextDiv.height() > 100){
			return this.view.drawContext(position);
			//}
		},
		
		/**
		 * clean the repetition of the elements in a list and return the list organized
		 */
		cleanRepetition : function(tab){
			var new_tab = [];
			for(var i=0 ; i<tab.length; i++) {
				var repeat = false;
				for(var j=0 ; j<new_tab.length; j++){
					if(new_tab[j] == tab[i].survey.ID){
						repeat = true;
						break;
					}
				}
			if(repeat!=true){
				new_tab.push(tab[i].survey.ID)
			}
			}
			return new_tab;
		},
		
		getHistory : function(){
			return this.view.drawContext();			
		},
		
		restoreView : function(aladinLiteView){
			return this.aladinLite_V.restoreView(aladinLiteView);
		},
		/*
		 * delete the element of the list , we find the position of element by its attribute id
		 */
		deleteHistory : function(htmlId){		
			//this.mark_tab.splice(this.findIdPosition(htmlId), 1);
			var key = localStorage.key(htmlId);
			localStorage.removeItem(key);
			return this.view.drawContext();
		},
		
		restoreViewById : function(htmlId){
			var view = getAladinLiteView(htmlId);
			return view;
			//return this.mark_tab[this.findIdPosition(htmlId)];		
		},	
		findIdPosition : function(id){
			for(var i=0;i<this.mark_tab.length;i++){
				if(this.mark_tab[i].id == id){
					break;
				}
			}
			return i;
		}
		/*getKeyById : function(id){
			var key = localStorage.key(id);
			return key;
		}*/
	
		
}
//deep clone an object who contains the object and transform the functions into string
var deepClone = function(data) { //avoid error : "Historique_m.js:42 Uncaught TypeError: Converting circular structure to JSON"
	var type = judgeType(data);      
	var obj;      
	if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {    // No deeper clone
    return data;
  }  ;
 if (type === 'array') {        // eslint-disable-next-line
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {        // Copy the functions of prototype
    // eslint-disable-next-line
    for (var key in data) {
     if (judgeType(data[key]) == 'function') {        // eslint-disable-next-line
    	  obj[key] = data[key].toString();
    	  }else{
    		  obj[key] = deepClone(data[key]);
    	  }
    }
  } ;     return obj;
};
var judgeType = function(obj) {  
  var toString = Object.prototype.toString;  
  var map = {        '[object Boolean]': 'boolean',        '[object Number]': 'number',        '[object String]': 'string',        '[object Function]': 'function',        '[object Array]': 'array',        '[object Date]': 'date',        '[object RegExp]': 'regExp',        '[object Undefined]': 'undefined',        '[object Null]': 'null',        '[object Object]': 'object'
  };      if (obj instanceof Element) {        return 'element';
  }      return map[toString.call(obj)];
}



