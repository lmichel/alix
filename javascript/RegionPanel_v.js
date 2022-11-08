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
	@param {function} handler
	@param {Frame} defaultRegion
	 */
    constructor(aladinLite_V, aladinLiteDivId, contextDivId, handler, /* points,*/ defaultRegion) {
        this.aladinLiteDivId = aladinLiteDivId;
        this.editorContainer = null;
        this.drawCanvas = null; // canvas where the polygon is drawn
        this.drawContext = null;
        this.lineCanvas = null; // canvas where the moving lines are drawn
        this.lineContext = null;
        this.controller = null;
        this.points = null; // Initial values
        this.clientHandler = (handler == null) ? function() { alert("No client handler registered"); } : handler;
        this.contextDivId = contextDivId;
        this.contextDiv = null;
        this.sousContextDiv = null;
        this.aladinLiteDiv = null;
        this.aladinLite_V = aladinLite_V;
        //this.defaultRegion = defaultRegion;
        this.editionFrame = defaultRegion;
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
            
			/*************************************************************
			**************** Region Editor Registration ******************
			**************************************************************/
			
			const foregroundRegionEditorId = "foreground-region-editor"
            const foregroundRegionEditorDiv = $(`<div id="${foregroundRegionEditorId}" class="region-editor"></div>`);
            this.editorContainer.append(foregroundRegionEditorDiv);
			const foregroundRegionEditor = new RegionEditor_mVc(
				"Foreground region editor",
				this.aladinLite_V,
				this.aladinLiteDivId,
				foregroundRegionEditorId,
				this.clientHandler,
				this.editionFrame,
				"red"
			);
			
			const backgroundRegionEditorId = "background-region-editor"
            const backgroundRegionEditorDiv = $(`<div id="${backgroundRegionEditorId}" class="region-editor"></div>`);
            this.editorContainer.append(backgroundRegionEditorDiv);
			const backgroundRegionEditor = new RegionEditor_mVc(
				"Background region editor",
				this.aladinLite_V,
				this.aladinLiteDivId,
				backgroundRegionEditorId,
				this.clientHandler,
				this.editionFrame,
				"orange"
			);
			console.log(foregroundRegionEditor,backgroundRegionEditor);
        }
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
            this.controller.almacenar();
            this.controller.recuperar();
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
            var pts = [];
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
                    Alix_Modalinfo.error(`${this.points.value} does not look like a SaadaQL statment`);
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
            this.controller.setPoligon(pts);
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
    }
    /**
    @description Method to let the user enter edition mode. In this mode, the user manipulates the nodes.
     */
    setEditMode() {
        this.browseBtn.removeAttr('disabled');
        this.editBtn.attr('disabled', 'disabled');
        this.deleteBtn.removeAttr('disabled');
        this.lineCanvas.show();
        this.drawCanvas.show();
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

