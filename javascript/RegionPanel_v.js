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
 * Manager of the view of the region editor
 * 
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */ 

class RegionPanelV {
	/**
	@brief View of the RegionEditor service
	@param {AladinLiteX_mVc} aladinLite_V - The aladin lite view that will handle the result of the selection
	@param {Element}  aladinLiteDivId
	@param {Element} contextDivId
	@param {Array<{name: string, divId: string, color: string, isSource: boolean, handler: function}>} regionEditorHandlers - Handlers of the shapes drawn
	@param {Frame} defaultRegion
	 */
    constructor(aladinLite_V, aladinLiteDivId, contextDivId, regionEditorHandlers, defaultRegion) {
        this.aladinLiteDivId = aladinLiteDivId;
        this.editorContainer = null;
        this.editorDescriptors = regionEditorHandlers;
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        this.editionFrame = defaultRegion;
        this.amoraSession = null;
		this.currentData = null;
        
        this.sourceRegionEditor = null;
        this.backgroundRegionEditors = [];
        
        this.regionEditors = []
    }
    init() {
		this.aladinLiteDiv = this.aladinLiteDiv == null ? $(`#${this.aladinLiteDivId}`) : this.aladinLiteDiv;
        this.contextDiv = this.contextDiv == null ? $(`#${this.contextDivId}`) : this.contextDiv;
        
        if (!AladinLiteX_mVc.regionEditorInit && this.editorDescriptors.length !== 0) {
            
            /***********************************************************
            ******** Header & container Region Editors creation ********
            ************************************************************/

            this.contextDiv.append('<h3 class="widget-title">Region Editor Mode</h3>');
            
            this.contextDiv.append('<div class="editor-container" id="region-editors"></div>');
            this.editorContainer = $('#region-editors.editor-container');
            
            /************************************************************
            ******* Label to show in which mode the user is *************
            *************************************************************/
            
            this.modeDisplayer = $(`<div class="editor-mode-shower">Browse Mode</div>`);
            this.aladinLiteDiv.append(this.modeDisplayer);
            
            /************************************************************
            ************ Panels for the different editors ***************
            *************************************************************/
            
            this.panelsDisplayer = $(`<div class="panel-tabs-container"></div>`);
            this.panelHeaders = $(`<div class="panel-header"></div>`);
            this.panelBody = $(`<div class="panel-body"></div>`);
            
            this.panelsDisplayer.append(this.panelHeaders,this.panelBody);
            this.editorContainer.append(this.panelsDisplayer);
            
			/*************************************************************
			**************** Region Editor Registration ******************
			**************************************************************/
			console.log(this.editorDescriptors);
			for (let regionEditor of this.editorDescriptors) {
	            const editorDiv = $(`<div id="${regionEditor.divId}" class="region-editor"></div>`);
	            this.panelBody.append(editorDiv);
	            
	            const newEditor = new RegionEditor_mVc(
					regionEditor.name,
					this.aladinLite_V,
					this.aladinLiteDivId,
					regionEditor.divId,
					regionEditor.handler,
					this.editionFrame,
					this.panelHeaders,
					regionEditor.color
				)
				if (regionEditor.isSource) {
					this.sourceRegionEditor = newEditor;
				} else {
					editorDiv.css({"display": "none"});
					this.backgroundRegionEditors.push(newEditor);
				}
				this.regionEditors.push(newEditor);				
			}
			
			this.focusRegionEditor(this.sourceRegionEditor);
			this.initHeaderTabBtnListeners();
			this.manageButtonActivated();
			this.controlAcceptation();
        }
    }
    
    initHeaderTabBtnListeners() {
		for (const regionEditor of this.regionEditors) {
			regionEditor.headerButton.on("click", (event,regionPanelInstance=this) => {
				regionPanelInstance.focusRegionEditor(regionEditor);
			});
		}
	}
    
    /**
    @param {RegionEditor_mVc} regionEditor
     */
    focusRegionEditor(focusedRegionEditor) {
		focusedRegionEditor.focusEditor();
		for (const regionEditor of this.regionEditors) {
			if (regionEditor !== focusedRegionEditor) {
				regionEditor.hideEditor();
			}
		}
	}
	
	/**
	@description Method to clean all the shapes on the region editors
	 */
	clean() {
		for (let regionEditor of this.regionEditors) {
			console.log(regionEditor.regionEditorName,"cleaned");
			regionEditor.controller.CleanCanvas();
            regionEditor.controller.DeleteOverlay();
		}
	}
    
    /**
    @todo
    */
    manageButtonActivated() {
		for (const regionEditor of this.regionEditors) {
			regionEditor.contextDiv.on(
				"canvas-shown",(event, regionPanel=this) => {
					regionPanel.modeDisplayer.html(`Edition Mode`);
					for (const editor of regionPanel.regionEditors) {
						if (editor !== regionEditor) {
							editor.muteRegionEditor();
						}
					}
				}
			);
			regionEditor.contextDiv.on(
				"canvas-hidden",(event, regionPanel=this) => {
					regionPanel.modeDisplayer.html(`Browse Mode`);
					for (const editor of regionPanel.regionEditors) {
						if (editor !== regionEditor) {
							editor.unmuteRegionEditor();
						}
					}
				}
			);
		}
	}
	
	controlAcceptation() {
		const sourceRegionEditor = this.sourceRegionEditor;
        const backgroundRegionEditors = this.backgroundRegionEditors;
        
		this.sourceRegionEditor.setBtn.on('click', (event) => {
			let data_array = [];
			for (const regionEditor of backgroundRegionEditors) {
				if (regionEditor.controller.data) {
					data_array.push(regionEditor.controller.data);
				}
			}
			
            sourceRegionEditor.controller.invokeHandler(true,data_array);
			//console.log(sourceRegionEditor.controller.data,data_array);
        });
        for (const regionEditor of this.backgroundRegionEditors) {	
			regionEditor.setBtn.on('click', (event) => {
	            regionEditor.controller.invokeHandler(true);
	            event.stopPropagation();
	        });
		}
	}
	
	storeData() {
		if (this.sourceRegionEditor) {
			let data_array = [];
			for (const regionEditor of this.backgroundRegionEditors) {
				regionEditor.setBrowseMode();
				regionEditor.controller.storeData(true);
				if (regionEditor.controller.data) {
					data_array.push(regionEditor.controller.data);
				}
			}
			this.sourceRegionEditor.setBrowseMode();
			return this.sourceRegionEditor.controller.storeData(true, data_array);
		}
		return null;
	}
	
	/**
	@description Method to restore all the regionEditors state
	@param {{isReady: bool, userAction: bool, region: object, background: Array}} data - The data to restore the editor
	 */
	restoreEditors(data) {
		if (this.editorContainer === null) {
			this.init();
		}
		this.clean();
		if ("region" in data) {
			this.sourceRegionEditor.restore(data.region);
		}
		if ("background" in data) {
			let i = 0;
			for(let background of data.background) {
				if("region" in background) {					
					this.backgroundRegionEditors[i].restore(background.region);
				}
			}
		}	
	}
	
	async generateAmoraSession(data,url="https://xcatdb.unistra.fr/onlinesas/job/") {
		const responsePostRequest = await fetch(url, {
            method: 'POST', 
            cache: 'no-cache', 
            headers: {
	            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const responseContent = await responsePostRequest.text();
        return responseContent;
	}
	
	async getAmoraSession() {
		if (this.sourceRegionEditor) {
			if (this.amoraSession === null) {
				this.currentData = JSON.parse(JSON.stringify(this.storeData()));
				this.amoraSession = await this.generateAmoraSession(this.currentData);
				return this.amoraSession;
			}
			let newData = this.storeData();
			if (newData !== null) {
				console.log(newData,this.currentData);
				if (!this.isEqualShapeObj(newData,this.currentData)) {
					this.currentData = newData;
					this.amoraSession = await this.generateAmoraSession(newData)
				}
			}
		}
		return this.amoraSession;
	}

	isEqualShapeObj(shape1,shape2) {
		console.log(shape1,shape2);
		if (shape1.region.format === "array2dim" && shape2.region.format === "array2dim") {
			console.log(shape1.region.points,shape2.region.points);
			for(let i = 0; i < shape1.region.points.length; ++i) {
				if (!shape2.region.points[i]
					|| shape1.region.points[i][0] !== shape2.region.points[i][0]
					|| shape1.region.points[i][1] !== shape2.region.points[i][1]
				) {
					console.log("1.",shape1.region.points[i],shape2.region.points[i]);
					return false;
				}
			}
		} else if (shape1.region.format === "cone" && shape2.region.format === "cone") {
			if (Math.round(shape1.region.ra*Math.pow(10,14)) !== Math.round(shape2.region.ra*Math.pow(10,14))
				|| Math.round(shape1.region.dec*Math.pow(10,14)) !== Math.round(shape2.region.dec*Math.pow(10,14))
				|| Math.round(shape1.region.radius*Math.pow(10,14)) !== Math.round(shape2.region.radius*Math.pow(10,14))
			) {
				console.log("2.");
				return false;
			}
		} else {
			console.log("3.");
			return false
		}
		if (shape1.background && shape2.background && shape1.background.background === shape2.background.length) {
			for (let i = 0; i < shape1.background.length; ++i) {
				if (!this.isEqualShapeObj(shape1.background[i],shape2.background[i])) {
					console.log("4.");
					return false;
				}
			}
		}
		return true;
	}
}

var browseSaved = null;

