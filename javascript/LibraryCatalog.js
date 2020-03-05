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
 * This is the function used to search an catalog
 */

var LibraryCatalogItem = function(params){
	  /**
	   * params JSON like {url, name,color, shape,fade; al_ref}
	   */
		    this.id = params.id;
			this.url = params.url;
			this.name = params.name;
			this.nameTemp = params.nameTemp;
			this.color = params.color;
			this.shape = params.shape;
			this.size = params.size;
			this.obs_id = params.obs_id;
			/**
			 * O = black 1= full color
			 */
			this.fade = params.fade;
			/**
			 * reference to the AL object
			 */
			this.al_refs =  params.al_refs;
	};

var LibraryCatalog  = function() {
	    /**
	     * Map name->LibraryCatalogItem
	     */
		var catalogs = [];
		/**
		 * make sure to never reuse the catalog ID, always take a larger one
		 */
		var max = 0;
		function getUniqueID(){
			
			for( var name in catalogs){
				if( catalogs[name].id > max){
					max = catalogs[name].id;
				}
		}
		return max +1;
		}
		/**
		 * params JSON like {url, name,color, shape,fade; al_ref}
		 */
		function addCatalog(params){
			catalogs[params.name] = new LibraryCatalogItem(params);
			catalogs[params.name].id = getUniqueID();
			for(var name in catalogs){
				//console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name+">>>>name temporary:"+catalogs[name].nameTemp);
			}
		};
		
		function getCatalog(name){
			if ( catalogs[name] == undefined )
				//console.log("catalogue >"+ name + "< not found");
			//console.log(catalogs)
				;
			return catalogs[name];
		};
		function delCatalog(name){
			delete catalogs[name];
			//console.log("catalog>"+name+"<deleted successfully")
			for(var name in catalogs){
				//console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name);
			}
			
		};
		
		function updCatalog(params){
			var name = params.name;
			if(params.url)catalogs[name].url = params.url ;
			if(params.color)catalogs[name].color=params.color;
			if(params.shape)catalogs[name].shape=params.shape;
			if(params.size)catalogs[name].size=params.size;
			if(params.fade)catalogs[name].fade=params.fade;
			if(params.al_refs)catalogs[name].al_refs=params.al_refs;
			if(params.obs_id)catalogs[name].obs_id=params.obs_id;
			if(params.nameTemp)catalogs[name].nameTemp=params.nameTemp;
			if(params.name == "Swarm"){
				SwarmDynamicFilter.runConstraint();
			}
		};

		var pblc = {}
		pblc.catalogs = catalogs;
		pblc.addCatalog = addCatalog;
		pblc.getCatalog = getCatalog;
		pblc.delCatalog = delCatalog;
		pblc.updCatalog = updCatalog;
		//pblc.setAttribut = setAttribut;
		return pblc;

} ();
