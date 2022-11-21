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

class RegionEditor_mVc {
	/**
	@brief View of the RegionEditor service
	@param {string} regionEditorName - The name of the region editor
	@param {AladinLiteX_mVc} aladinLite_V - The aladin lite view that will handle the result of the selection
	@param {Element}  aladinLiteDivId
	@param {Element} contextDivId
	@param {function} handler
	@param {Frame} defaultRegion
	@param {Element} tabHeader
	@param {string} color - color of the shape once it was validated
	 */
    constructor(regionEditorName, aladinLite_V, aladinLiteDivId, contextDivId, handler, /* points,*/ defaultRegion, tabHeader, color) {
		this.regionEditorName = regionEditorName;
        this.aladinLiteDivId = aladinLiteDivId;
        this.tabHeader = tabHeader;
        
        this.buttonGrid = null;
        
        this.drawCanvas = null; // canvas where the polygon is drawn
        this.drawContext = null;
        this.lineCanvas = null; // canvas where the moving lines are drawn
        this.lineContext = null;
        
        this.controller = null;
        this.points = null; // Initial values
        
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        this.editionFrame = defaultRegion;
        
        this.color = color;
        this.clientHandler = (handler == null) ? function() { alert("No client handler registered"); } : handler;
        this.init();
    }
    init() {
        this.aladinLiteDiv = this.aladinLiteDiv == null ? $(`#${this.aladinLiteDivId}`) : this.aladinLiteDiv;
        this.contextDiv = this.contextDiv == null ? $(`#${this.contextDivId}`) : this.contextDiv;
        // création du canvas pour éditeur régions
        /*
         * Be cautious: the canvas context must be taken before the canvas is appended to the parent div, otherwise the geometry is wrong.
         */
        var that = this;
        this.lineCanvas = $("<canvas id='RegionCanvasTemp' class='editor-canvas'></canvas>");

        this.lineCanvas[0].width = this.aladinLiteDiv.width();
        this.lineCanvas[0].height = this.aladinLiteDiv.height();
        this.lineContext = this.lineCanvas[0].getContext('2d');
        this.aladinLiteDiv.append(this.lineCanvas);
        this.lineCanvas.css({
			'z-index': '100',
			'position': 'absolute'
		});
        this.lineCanvas.hide();

        /*
         * Canvas for the temporary drawings
         */
        this.drawCanvas = $("<canvas id='RegionCanvas' class='editor-canvas' ></canvas>");
        this.drawCanvas[0].width = this.aladinLiteDiv.width();
        this.drawCanvas[0].height = this.aladinLiteDiv.height();
        this.drawContext = this.drawCanvas[0].getContext('2d');
        this.aladinLiteDiv.append(this.drawCanvas);
        this.drawCanvas.css({
			'z-index': '101',
			'position': 'absolute',
			'top': '0px'
		});
        this.drawCanvas.hide();


        this.controller = new RegionEditor_mvC({
			"handler": this.clientHandler,
			"drawCanvas": this.drawCanvas,
			"staticCanvas": this.lineCanvas,
			"aladinView": this.aladinLite_V,
			"color": this.color
		});
        /*
         * The controller function is wrapped in a function in order to make it working in the context of the controller object
         * and not of he HTML widget
         */
        this.drawCanvas[0].addEventListener('mousemove', (event,regionEditorView=this) => {
			regionEditorView.controller.mouseMove(event);
		}, false);
        this.drawCanvas[0].addEventListener('mousedown', (event, regionEditorView=this) => {
			regionEditorView.controller.mouseDown(event);
		}, false);
        this.drawCanvas[0].addEventListener('mouseup', (event,regionEditorView=this) => {
			regionEditorView.controller.mouseUp(event);
		}, false);
		
		/***********************************************************
		************* Layout & title creation **********************
		************************************************************/
		const divTitle = $(`<h4>${this.regionEditorName}</h4>`);
		this.buttonGrid = $(`<div class="btn-grid"></div>`);
		this.contextDiv.append(divTitle,this.buttonGrid);
		
		/***********************************************************
		************* Initialize the header button *****************
		************************************************************/
		let header_title = this.regionEditorName.split(' ')[0].toLowerCase();
		this.headerButton = $(`<button class="tab-header-btn" id="tab-header-${header_title}">${header_title}</button>`);
		
		this.tabHeader.append(this.headerButton);		

        /***********************************************************
		************* Button creation using JQuery *****************
		************************************************************/
		
		const styleToApply = {
			'margin-top': '10px',
			'margin-left': '5px',
			'font-weight': ' bold',
		}
		
		/***********************************************************
        ******************** Edit Button ***************************
        ************************************************************/
        this.editBtn = $(
			`<button id='${this.contextDivId}-regionEditor_e' class='alix_edt_btn alix_btn alix_region_btns'>
				Edit&nbsp;
				<i class='glyphicon glyphicon-pencil'></i>
			</button>`
		);
        this.buttonGrid.append(this.editBtn);
        this.editBtn.css(styleToApply);
        this.editBtn.click(function(event) {
            that.setEditMode();
            that.controller.DeleteOverlay();
            that.lineContext.clearRect(0, 0, that.lineCanvas[0].width, that.lineCanvas[0].height);
            that.drawContext.clearRect(0, 0, that.drawCanvas.width, that.drawCanvas.height);
            that.controller.store();
            event.stopPropagation();
        });
		
        /***********************************************************
        ******************** Browse Button *************************
        ************************************************************/
        this.browseBtn = $(
			`<button id='${this.contextDivId}-regionEditor_b' class='alix_browse_btn alix_btn alix_region_btns'>
				Browse&nbsp;
				<i class='glyphicon glyphicon-check'></i>
			</button>`
		);
        this.buttonGrid.append(this.browseBtn);
        this.browseBtn.css(styleToApply);
        this.browseBtn.attr('disabled', 'disabled');
        this.browseBtn.click(function(event) {
            if (!that.controller.isPolygonClosed()) {
                that.controller.CleanPoligon();
            } else {
                that.controller.get();
            }
            that.setBrowseMode();
            browseSaved = false;
            event.stopPropagation();
        });


        
        /***********************************************************
        ******************** Delete Button *************************
        ************************************************************/
        this.deleteBtn = $(
			`<button id='${this.contextDivId}-regionEditor_c' class=' alix_clear_btn alix_btn alix_region_btns'>
				Clear&nbsp;
				<i class='glyphicon glyphicon-trash'></i>
			</button>`
		);
        this.buttonGrid.append(this.deleteBtn);
        this.deleteBtn.css(styleToApply);
        this.deleteBtn.click(function(event) {
            that.controller.CleanCanvas();
            event.stopPropagation();
        });
        this.deleteBtn.attr('disabled', 'disabled');

		/***********************************************************
        ******************** Accept Button ****************************
        ************************************************************/
        this.setBtn = $(
			`<button id='${this.contextDivId}-regionEditor_a' class=' alix_accept_btn alix_btn alix_region_btns'>
        		Accept&nbsp;
        		<i class='glyphicon glyphicon-share'></i>
        	</button>`
        );
        this.buttonGrid.append(this.setBtn);
        this.setBtn.css(styleToApply);

        this.setBtn.on('click', function(event) {
            that.controller.get();
            that.setBrowseMode();
            that.aladinLite_V.reabledButton();
            if ($("#region")[0])
                $("#region")[0].disabled = false;
            browseSaved = true;
            event.stopPropagation();
        });
        
        
        /***********************************************************
        ******************** Switch button ************************
        ************************************************************/
        this.switchModeBtn = $(
			`<button id='${this.contextDivId}-switchEditor' class='alix_swi_btn alix_btn alix_region_btns'>
        	</button>`
        );
        this.switchBtnText = $(`<div class="text">Polygon&nbsp;</div>`);
        this.switchModeBtn.append(this.switchBtnText);
        
        this.switchBtnIcon = $(`<img src="styles/polygon_icon.svg"></img>`);
        this.switchModeBtn.append(this.switchBtnIcon);
        
        this.switchBtnTooltip = $(`<span class="tooltiptext">Switch to Cone</span>`);
        this.switchModeBtn.append(this.switchBtnTooltip);
        
        this.buttonGrid.append(this.switchModeBtn);
        this.switchModeBtn.css(styleToApply);
        
        this.switchModeBtn.on('click', (event, regionEditorView=this) => {
			regionEditorView.setEditMode();
            regionEditorView.controller.DeleteOverlay();
            regionEditorView.lineContext.clearRect(0, 0, regionEditorView.lineCanvas[0].width, regionEditorView.lineCanvas[0].height);
            regionEditorView.drawContext.clearRect(0, 0, regionEditorView.drawCanvas.width, regionEditorView.drawCanvas.height);
            regionEditorView.controller.switchModel();
            
            if (regionEditorView.controller.focusedModel === Models.Polygon) {
				this.switchBtnText.html(`Polygon&nbsp;`);
				this.switchBtnTooltip.text(`Switch to Cone`);
				this.switchBtnIcon.attr("src","styles/polygon_icon.svg");
			} else {
				this.switchBtnText.html(`Cone&nbsp;`);
				this.switchBtnTooltip.text(`Switch to Polygon`);
				this.switchBtnIcon.attr("src","styles/circle_icon.svg");
			}
            event.stopPropagation();
		});
        
                
        
        if (!AladinLiteX_mVc.regionEditorInit) {
            this.setInitialValue(this.defaultRegion);
            if (this.editionFrame) {
                this.setEditionFrame(this.editionFrame);
                this.setEditMode();
            }
            AladinLiteX_mVc.regionEditorInit = true;
            /**!!! To note the region editor has been initialized.
             * Avoid it being initialized the second time,
             *which make us can't edit the old polygon when we leave the regioneditor for a while .*/
        }

    }
    
    focusEditor() {
		this.headerButton.css({
			"border-bottom": "none",
			"background-color": "rgba(245, 245, 245,.5)"
		});
		this.contextDiv.css({"display": "block"});
	}
	
	hideEditor() {
		this.headerButton.css({
			"border-bottom": "#545244 solid 2px",
			"background-color": "rgba(150,150,150,.5)"
		});
		this.contextDiv.css({"display": "none"});
	}
    
    /**
     * @description Operate the drawing removal from outside of the class scope
     */
    clean() {
        //can be called from another button before the editor has been init 
        if (this.controller) {
            this.controller.CleanPoligon();
            this.setEditMode();
            this.controller.DeleteOverlay();
            this.lineContext.clearRect(0, 0, this.lineCanvas[0].width, this.lineCanvas[0].height);
            this.drawContext.clearRect(0, 0, this.drawCanvas[0].width, this.drawCanvas[0].height);
            this.controller.store();
            this.controller.get();
            this.setBrowseMode();
        }

    }
    /**
     * @description Draws the editable frame in blue and center the view on it
     * @param {Array<Array<Number>>} points - An array of sky positions
     * @return {void}
     */
    setEditionFrame(points) {
        if (points) {
            this.editionFrame = points;
        }
        var x = null;
        if (this.editionFrame) {
            /*
             * Extract region or position from SaadaQL statement
             */
            if (this.editionFrame.type == "array") {
                x = this.parseArrayPolygon(this.editionFrame.value);
            } else if (this.editionFrame.type == "soda") {
                x = this.parseSodaPolygon(this.editionFrame.value);
            } else {
                alert("Polygon format " + points.type + " not understood");
            }
            if (x) {
                var view = BasicGeometry.getEnclosingView(x);
                this.aladinLite_V.gotoPosition(view.center.ra, view.center.dec);
                this.aladinLite_V.setZoom(1.2 * view.size);
                if (this.editionFrameOverlay == null) {
                    this.editionFrameOverlay = A.graphicOverlay({ color: 'blue', name: "Editable Frame" });
                    this.aladinLite_V.addOverlayer(this.editionFrameOverlay);
                }
                this.editionFrameOverlay.removeAll();
                this.editionFrameOverlay.addFootprints([A.polygon(x)]);
                $("#center").val("Ed. Frame").attr("title", "Center the view on the editable frame");
            } else {
                this.editionFrame = null;
                $("#center").val("Center").attr("title", "Center on the current drawing");
            }
        }
        /*
         * Fix for the errors when we open a new region editor
         *
        var that = this;
           setTimeout(function() {
               that.aladin.increaseZoom();
               that.aladin.decreaseZoom();
               }, 500);
               */
    }
    /**
     * @description
     * Initalize the draw with the default parameter. If points contains a region, it is drawn,
     * if it just contain a position, AladinLite is centered on that position
     * @param {Array<Array<Number>>} points  object denoting the initial value of the polygon : {type: ... value:} type is format of the
     * value (saadaql or array) and value is the data string wich will be parsed
     */
    setInitialValue(points) {
        /*
         * Set the region passed by the client if it exists
         */
        this.points = points;
        //this.controller.CleanPoligon();
        if (this.points) {
            var pts = [];
            /*
             * Extract region or position from SaadaQL statement
             */
            if (this.points.type == "saadaql") {
                var s = /"(.*)"/.exec(this.points.value);
                if (s.length != 2) {
                    Alix_Modalinfo.error(this.points.value + " does not look like a SaadaQL statment");
                    return;
                } else {
                    if (this.points.value.startsWith("isInRegion")) {
                        var ss = s[1].split(/[\s,;]/);
                        for (var i = 0; i < ss.length; i++) {
                            pts.push(parseFloat(ss[i]));
                        }
                    } else {
                        var pos = s[1].replace(/:/g, " ");
                        this.posField.val(pos);
                        this.aladin.setZoom(0.55);
                        this.aladin.gotoObject(pos);
                    }
                }
            } else if (this.points.type == "array2dim") {
                pts = this.points.value;
            } else {
                alert("Polygon format " + this.points.type + " not understood");
                return;
            }

            this.setBrowseMode();
            this.controller.DeleteOverlay();
            this.controller.setPolygon(pts);
        }
        /*
         * Fix for the errors when we open a new region editor
         */
        //			var that = this;
        //	           setTimeout(function() {
        //                   that.aladin.increaseZoom();
        //                   that.aladin.decreaseZoom();
        //                   }, 500);
    }
    /**
    @description Method that let the user enter browse mode. In this mode, the user do not manipulate the shape.
     */
    setBrowseMode() {
        this.editBtn.removeAttr('disabled');
        this.browseBtn.attr('disabled', 'disabled');
        this.deleteBtn.attr('disabled', 'disabled');
        this.lineCanvas.hide();
        this.drawCanvas.hide();
        this.emitCanvasHideMessage();
    }
    /**
    @description Method to let the user enter edition mode. In this mode, the user manipulates the nodes.
     */
    setEditMode() {
        this.editBtn.attr('disabled', 'disabled');
        this.browseBtn.removeAttr('disabled');
        this.deleteBtn.removeAttr('disabled');
        this.lineCanvas.show();
        this.drawCanvas.show();
        this.emitCanvasShownMessage()
    }
    /**
    @todo
    */
	emitCanvasShownMessage() {
		this.contextDiv.trigger("canvas-shown");
	}
	/**
	@todo
	 */
	emitCanvasHideMessage() {
		this.contextDiv.trigger("canvas-hidden");
	}
    
    /**
    @description Method to let the program mute the RegionEditor when another RegionEditor is used
     */
    muteRegionEditor() {
		this.editBtn.attr('disabled', 'disabled');
		this.setBtn.attr('disabled', 'disabled');
		this.switchModeBtn.attr('disabled', 'disabled');
	}
	
	/**
    @description Method to let the program unmute the RegionEditor when another RegionEditor is no longer used
     */
	unmuteRegionEditor() {
		this.editBtn.removeAttr('disabled');
		this.setBtn.removeAttr('disabled');
		this.switchModeBtn.removeAttr('disabled');
	}
    /**
    @description Method to parse a SODA polygon that is represented by a string
    @example "POLYGON 1.2 1.3 4.5 1.2 4.3 4.3"
    @param {String} value - string polygon to convert
    @return {Array<Float32Array>} an array containing all the points parsed
     */
    parseSodaPolygon(value) {
        let s = value.split(/\s+/);
        let x = null;
        if (s[0].toUpperCase() != "POLYGON") {
            alert("Only SODA POLYGON are supported");
        } else {
            s.shift();
            if (!s || (s.length % 2) != 0 || s.length < 6) {
                alert("Even number of coordinates required (" + s.length + " values read)");
            } else {
                x = [];
                for (let i = 0; i < (s.length / 2); i++) {
                    x.push([parseFloat(s[2 * i]), parseFloat(s[(2 * i) + 1])]);
                }
                x.push(x[0]);
            }
        }
        return x;
    }
    /**
    @description Method to parse a polygon that is represented by a contiguous array
    @example [1.2, 1.3, 4.5, 1.2, 4.3, 4.3]
    @param {Float32Array} value - contiguous array representing the polygon to convert
    @return {Array<Float32Array>} an array containing all the points parsed
     */
    parseArrayPolygon(value) {
        var x = null;
        if (!value || (value.length % 2) != 0 || value.length < 6) {
            alert("Even number of coordinates required");
        } else {
            x = [];
            for (var i = 0; i < (value.length / 2); i++) {
                x.push([value[2 * i], value[(2 * i) + 1]]);
            }
            x.push(x[0]);
        }
        return x;
    }
} 
var browseSaved = null;

