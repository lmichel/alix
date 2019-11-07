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
//"use strict"

var MasterResource = function(resource){
if(resource){
	this.actions = resource.actions;
	this.affichage = resource.affichage;
	this.parseLocation(resource.affichage);
	this.tab = [];
	//this.actions = resource.actions;
	// If filtered, the FOV area is not limited
	this.filtered = (resource.filtered == undefined || resource.filtered != true)? false: true;
}
}

MasterResource.prototype = {
		
		parseLocation: function(affichage){
			var location = affichage.location ;
			if( location&&location.url_base  ){
				this.url = location.url_base
			}else if(location&&location.service){
				if( location.url_query){
					var tmpq = location.query.replace(/\{\$ra\}/g,'@@ra@@')
					.replace(/\{\$dec\}/g,'@@dec@@')
					.replace(/\{\$fov\}/g,'@@fov@@')
					.replace(/\{\$format\}/g,'@@format@@');
					this.url = location.service +  encodeURI(tmpq).replace(/@@ra@@/g,'{$ra}')
					.replace(/@@dec@@/g,'{$dec}')
					.replace(/@@fov@@/g,'{$fov}')
					.replace(/@@format@@/g,'{$format}');
				}
				
			} else {
				alert("master resource malformed");
				this.url = null;
			}
			
		},
		setParamsInUrl: function(aladinLiteView){
			var self = this;
			var times = null;
			var url;
			var fov;
			if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcmin'){
				times = 60;
			}else if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcsec'){
				times = 3600;
			}else{
				times = 1;
			}
			var size = parseInt(1000*fov*times)/1000 + 1
			var hloan = aladinLiteView.ra/15.0;
			var strlon = Numbers.toSexagesimal(hloan, 8, false);
			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);
			var affichage = aladinLiteView.masterResource.affichage;
			var location = affichage.location;
			if(!this.filtered && aladinLiteView.fov>1){
				if(affichage.progressiveMode == true){
					fov = aladinLiteView.fov
				}else{
					fov = 1;
					WaitingPanel.warnFov();	
				}
			}else{
				fov = aladinLiteView.fov
			}
			//size = 1;
			size = fov*times;
			//if {$query} exists in the base url, replace it with the url_query, if not, replace only fov ra dec format. 
			var base = location.url_base;
			if(base.includes('{$query}')){
				var query = location.url_query;
				var progressiveLimit = "";
				if(affichage.progressiveMode == true &&  affichage.location.url_limit != undefined){
					progressiveLimit = affichage.location.url_limit;
				}
				query = query.replace(/\{\$limitQuery\}/g,progressiveLimit);
				query = query.replace(/\{\$ra\}/g,'($ra)');
				query = query.replace(/\{\$dec\}/g,'($dec)');
				query = query.replace(/\{\$fov\}/g,'($fov)');
				var queryEncoded = encodeURI(query);
				url = base.replace(/\{\$query\}/g,queryEncoded);
				url = url.replace(/\{\$format\}/g,affichage.format);
				url = url.replace(/\(\$ra\)/g,'%22'+aladinLiteView.ra);
				url = url.replace(/\(\$dec\)/g,aladinLiteView.dec+'%22');
				url = url.replace(/\(\$fov\)/g,size);
			}else{
				url = this.url.replace(/\{\$ra\}/g,aladinLiteView.ra);
				url = url.replace(/\{\$dec\}/g,aladinLiteView.dec);
				url = url.replace(/\{\$fov\}/g,size);
				url = url.replace(/\{\$format\}/g,affichage.format);
			}
			console.log(url);
			return url;
		},
		
		cleanTab: function(){
			this.tab=[];
		}

}