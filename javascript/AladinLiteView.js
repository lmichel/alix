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

function AladinLiteView  (){
	this.name = null;
	this.ra = null;
	this.dec = null; 
	this.fov = null;
	this.survey = null;
	this.region = null;
	this.amoraSession = null;
	this.id = null;
	this.img = null;
	this.XMM = false;
	this.catalogTab = null;
	this.masterResource;
	this.target = [];
	this.comment = null;
	this.key = null;
	this.colorMap = null;
	this.reverseColor = null;
	this.sourceSelected = {
			x: null,
			y: null
	}
}
var objs = [];
//create a aladinliteview for the bookmarks in localstorage
var setAladinLiteView = function(params,key) {
		objs[params.id] = new AladinLiteView();
		var obj = objs[params.id];
		obj.name =params.name;
		obj.ra = params.ra;
		obj.dec = params.dec; 
		obj.fov = params.fov;
		obj.survey = params.survey;
		obj.region = params.region;
		obj.amoraSession = params.amoraSession;
		obj.id = params.id;
		obj.img = params.img;
		obj.XMM = params.XMM;
		obj.catalogTab =params.catalogTab;
		obj.masterResource = new MasterResource(localConf.masterResource);//to not lose the external functions in the origin configuration
		//obj.masterResource = new MasterResource(params.masterResource);
		//obj.masterResource = localConf.masterResource;
		obj.target = params.target;
		obj.comment = params.comment;
		obj.key = key;
		obj.colorMap = params.colorMap;
		obj.reverseColor = params.reverseColor;
		obj.sourceSelected = params.sourceSelected;
		objs[params.id] = obj;
		
		return obj;
		
}
var getAladinLiteView = function(id){
	if (objs[id] != undefined )
	return objs[id];
};
var deleteAllObjs = function(){
	objs = [];
}
AladinLiteView.prototype = {
	
		/*
		 * création de la vue de liste, si region existe, la liste affiche le logo R
		 */
	getHTMLTitle: function() {
		return `
			<div title="replay the stored view"
				id="${this.id}"
				class="bookmark-element"
			>
				<img id="${this.id}_snapShot_img" 
					src="${this.img}"
					onclick="AladinLiteX_mVc.restoreViewById(&quot;${this.id}&quot;);"
					class="snapshot-picture"
				>
				</img>
				<a title="download the snapshot" href="${this.img}"	download ="ALIX snapshot ${this.id}">
					<i class="glyphicon glyphicon-download-alt" style="vertical-align: top;color:black" ></i>
				</a>
				<!-- store the id in the div -->
				<i id="${this.id}_link"  style="vertical-align: top;font-weight:800;">
					${this.name} | ${this.survey.ID}
				</i>
				${this.regionIcon()}${this.targetIcon()}${this.amoraButton()}
				<div class="alix-bookmark-edit-menu">
					<button id="${this.id}_menu" 
						type="edit list"
						title="menu"
						class="alix_btn alix_btn-color-his alix_btn-edit"
					>
						<i class="glyphicon glyphicon-record" style="font-size:19px;position:relative;top:-4px;"></i>
					</button>
					<button id="${this.id}_menu_close_img"
						title="delete"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
						onclick="AladinLiteX_mVc.deleteHistory(&quot;${this.id}&quot;);"
					>
						<i class="glyphicon glyphicon-remove-sign" style="font-size:15px;"></i>
					</button>
					<button id="${this.id}_menu_commit" 
						title="remark"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
					>
						<i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i>
					</button>
					<button id="${this.id}_menu_show_description"
						title="description"
						class="alix_btn alix_btn-color-his alix_btn-in-edit"
					>
						<i class="glyphicon glyphicon-info-sign" style="font-size:15px;"></i>
					</button>
					<div class="add-commit-text" id="${this.id}-menu-commit-menu" style="display: none;">
						<textarea id="${this.id}_menu_commit_text" class="alix_text-commit"></textarea>
						<button id="${this.id}_menu_commit_text_confirm"
							class="alix_btn alix_btn-text-ok alix_btn-color-ok"
						>
							<i class="glyphicon glyphicon-ok" style="font-size:11px;"></i>
						</button>
						<button id="${this.id}_menu_commit_text_delete"
							class="alix_btn alix_btn-text-remove alix_btn-color-remove"
						>
							<i class="glyphicon glyphicon-remove" style="font-size:11px;"></i>
						</button>
					</div>
				</div>
				<div id="${this.id}_menu_commit_text_display" class="alix_menu_commit_text_display" style="">
					${this.displayComment()}
				</div>
			</div>
		`
	},
	
	regionIcon: function(){
		if( this.region == null){
			return "";
		} else {
			return '<i  title="bookmark with region" class="glyphicon glyphicon-registration-mark" style="font-size:18;vertical-align: top;"></i>';
		}
	},
	
	amoraButton: function() {
		if( this.amoraSession === null) {
			return "";
		} else {
			return `<button id="${this.id}-amora-button" class="amora-btn"></button>`;
		}
	},
	
	targetIcon: function(){
		if( this.target.length == 0){
			return "";
		} else {
			return '<i class="glyphicon glyphicon-star" style="vertical-align: top;color:red"></i>';
		}
	},
	
	displayComment: function(){
		if( this.comment == null){
			return "";
		}else{
				return this.comment;
		}
	},

	
	/*
	 * actions of mouse change the states of img red cross
	 */
	setHandlers: function() {
		/*
		 * operation on button edit and his son buttons
		 */
		var self = this;
		var statue = false;
		/*
		 * operation on image
		 */
		 
		$("#" + this.id+ "_snapShot_img").mouseover(function(event){
			/*
			$("#" + this.id).css("width", "100px");
			$("#" + this.id).css("height", "100px");
			*/
			$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
		});
		$("#"+this.id+ "_snapShot_img").mouseout(function(event){
			/*
			$("#" + this.id).css("width", "18px");
			$("#" + this.id).css("height", "18px");
			*/
			if(statue == true){
				$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
			}else{
				$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
			}
		});
		
		/*
		 * show the son buttons
		 */
		
		$("#"+this.id+ "_menu").click(function(event){
			if(statue == false){
				$("#"+ this.id+ "_close_img").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_close_img").css("transform","translate3d(-15px,25.98px,0px)");
				$("#"+ this.id+ "_close_img").css("transition-duration","100ms");
			
				$("#"+ this.id+ "_commit").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_commit").css("transform","translate3d(15px,25.98px,0px)");
				$("#"+ this.id+ "_commit").css("transition-duration","200ms");
			
				$("#"+ this.id+ "_show_description").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
				$("#"+ this.id+ "_show_description").css("transform","translate3d(27px,0px,0px)");
				$("#"+ this.id+ "_show_description").css("transition-duration","300ms");
				
				statue = true;
			}else{
				$("#"+ this.id+ "_close_img").css("transition-timing-function","ease-out");
				$("#"+ this.id+ "_close_img").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_close_img").css("transition-duration","200ms");
				
				$("#"+ this.id+ "_commit").css("transition-timing-function","ease-out)");
				$("#"+ this.id+ "_commit").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_commit").css("transition-duration","200ms");
				
				$("#"+ this.id+ "_show_description").css("transition-timing-function","ease-out");
				$("#"+ this.id+ "_show_description").css("transform","translate3d(0px,0px,0px)");
				$("#"+ this.id+ "_show_description").css("transition-duration","200ms");
				statue = false;
			}
		});
		
		/*
		 * fonction of son buttons
		 */
		/*var hide = this.id;
		
		$("body").click(function(event){
			$("#"+hide+"_menu_commit_text").css("display", "none");
			$("#"+hide+"_commit_confirm").css("display", "none");
			$("#"+hide+"_commit_delete").css("display", "none");
		});*/
		
		
		/****************************************************************
		******************* Manage the edit commits button **************
		****************************************************************/
		$("#"+this.id+ "_menu_commit").click(function(event){
			$(`#${self.id}_text`).val(self.comment);
			$(`#${self.id}-menu-commit-menu`).toggle();
		});
		$("#"+this.id+ "_menu_commit_text_delete").click(function(event){
			$(`#${self.id}-menu-commit-menu`).toggle();
			
		});
		$("#"+this.id+ "_menu_commit_text_confirm").click(function(event){
			$(`#${self.id}-menu-commit-menu`).toggle();
			self.comment = $("#"+$(this).attr('id').replace("_confirm","")).val();
			$("#"+$(this).attr('id').replace("_confirm","_display")).html(self.comment);
			//when the message is confirmed, restore the aladinview locally
			restoreLocal(self);
		});
		
	},
	
	clean: function() {
		this.name = null;
		this.ra = null;
		this.dec = null; 
		this.fov = null;
		this.region = null;
		this.id = null;
		this.img = null;
		this.catalogTab = null;
		this.XMM = false;
	}
}
//Restore the bookmark when it is modified.
var restoreLocal = function(params){
	var key;
	var positionCopy = jQuery.extend(true, {}, params);
	//var positionCopyStr = JSON.stringify(positionCopy);
	var positionCopyClone = deepClone(positionCopy);//transform the function to string 
	var positionCopyStr = JSON.stringify(positionCopyClone);
	if(params.key != undefined){
		key = params.key;
	}else{
		key = new date();
	}
	    localStorage.setItem(key,positionCopyStr);
}

//module.exports.AladinLiteView=AladinLiteView;



