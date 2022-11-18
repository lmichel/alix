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
	@param {function} sourceHandler - Handler of the shape drawn for the foreground
	@param {function} backgroundHandler - Handler of the shape drawn for the background
	@param {Frame} defaultRegion
	 */
    constructor(aladinLite_V, aladinLiteDivId, contextDivId, sourceHandler, backgroundHandler, defaultRegion) {
        this.aladinLiteDivId = aladinLiteDivId;
        this.editorContainer = null;
        this.sourceHandler = (sourceHandler == null) ? function() { alert("No foreground handler registered"); } : sourceHandler;
        this.backgroundHandler = (backgroundHandler == null) ? function() { alert("No background handler registered"); } : backgroundHandler;
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        this.editionFrame = defaultRegion;
        
        this.sourceRegionEditor = null;
        this.backgroundRegionEditor = null;
        
        this.regionEditors = []
    }
    init() {
		this.aladinLiteDiv = this.aladinLiteDiv == null ? $(`#${this.aladinLiteDivId}`) : this.aladinLiteDiv;
        this.contextDiv = this.contextDiv == null ? $(`#${this.contextDivId}`) : this.contextDiv;
        
        if (!AladinLiteX_mVc.regionEditorInit) {
            
            /***********************************************************
            ******** Header & container Region Editors creation ********
            ************************************************************/

            this.contextDiv.append('<h3 class="widget-title">Region Editor Mode</h3>');
            
            this.contextDiv.append('<div class="editor-container" id="region-editors"></div>');
            this.editorContainer = $('#region-editors.editor-container');
            
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
			
			const sourceRegionEditorId = "source-region-editor"
            const sourceRegionEditorDiv = $(`<div id="${sourceRegionEditorId}" class="region-editor"></div>`);
            this.panelBody.append(sourceRegionEditorDiv);
			this.sourceRegionEditor = new RegionEditor_mVc(
				"Source region editor",
				this.aladinLite_V,
				this.aladinLiteDivId,
				sourceRegionEditorId,
				this.sourceHandler,
				this.editionFrame,
				this.panelHeaders,
				"red"
			);
			
			const backgroundRegionEditorId = "background-region-editor"
            const backgroundRegionEditorDiv = $(`<div id="${backgroundRegionEditorId}" class="region-editor"></div>`);
            backgroundRegionEditorDiv.css({"display": "none"});
            this.panelBody.append(backgroundRegionEditorDiv);
            
			this.backgroundRegionEditor = new RegionEditor_mVc(
				"Background region editor",
				this.aladinLite_V,
				this.aladinLiteDivId,
				backgroundRegionEditorId,
				this.backgroundHandler,
				this.editionFrame,
				this.panelHeaders,
				"orange"
			);
			
			
			this.regionEditors.push(this.sourceRegionEditor,this.backgroundRegionEditor);
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
    @todo
    */
    manageButtonActivated() {
		for (const regionEditor of this.regionEditors) {
			regionEditor.contextDiv.on(
				"canvas-shown",(event, editors=this.regionEditors) => {
					for (const editor of editors) {
						if (editor !== regionEditor) {
							editor.muteRegionEditor();
						}
					}
				}
			);
			regionEditor.contextDiv.on(
				"canvas-hidden",(event, editors=this.regionEditors) => {
					for (const editor of editors) {
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
        const backgroundRegionEditor = this.backgroundRegionEditor;
        
		this.sourceRegionEditor.setBtn.on('click', (event) => {
            sourceRegionEditor.controller.invokeHandler(true,backgroundRegionEditor.controller.data);
			console.log(sourceRegionEditor.controller.data,backgroundRegionEditor.controller.data);
            event.stopPropagation();
        });
		this.backgroundRegionEditor.setBtn.on('click', (event) => {
            backgroundRegionEditor.controller.invokeHandler(true);
            event.stopPropagation();
        });
	}
} 
var browseSaved = null;

