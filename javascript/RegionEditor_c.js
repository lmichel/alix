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
 * Controller handling the user actions in connection with the model 
 * 
 *  params = {canvas,canvaso, aladin}
 * 
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */
/**
 * @author michel
 *
 */
 
const Models = {
	Polygon: Symbol("polygon"),
	Cone: Symbol("cone")
}

class RegionEditor_mvC {
    constructor(params) {
		this.color = params.color;

        this.polygonModel = new PolygonModel(
			params.points,
			params.handler,
			params.drawCanvas,
			params.staticCanvas,
			params.aladinView,
			this.color
		);

        this.coneModel = new ConeModel(
			params.points,
			params.handler,
			params.drawCanvas,
			params.staticCanvas,
			params.aladinView,
			this.color
		);

        this.focusedModel = Models.Polygon;
        
        this.canvas = params.drawCanvas;
        this.clientHandler = params.handler;
        this.startingNode = -1;
        this.buttondown = false;
        this.closed = false;
        this.movestart = false;
        this.startdrag = false;
        this.drag = null;
        this.result = -1;
        this.stokeNode;
        
        this.data = null;
    }
    /**
    @description Method to siwtch between the two provided models
     */
    switchModel() {
		this.CleanPoligon();
		if (this.focusedModel === Models.Polygon) {
			this.focusedModel = Models.Cone;
		} else {
			this.focusedModel = Models.Polygon;
		}
	}
    getStatus() {
        return `startingNode=${this.startingNode}
        	 buttondown=${this.buttondown}
        	 closed=${this.closed}
        	 movestart=${this.movestart}
        	 startdrag=${this.startdrag}
        	 drag=${this.drag}
        	 result=${this.result}
        	 stokeNode=${this.stokeNode}`;
    }
    /**
     *
     */
    mouseDown(event) {

		if (this.focusedModel === Models.Polygon) {
	        const modelReturn = 
	        	this.polygonModel.
	        	handleMouseDownPolygon(event, this.closed, this.canvas);
			
	        this.closed = modelReturn.closed;
			this.canvas = modelReturn.canvas;
			
	        this.buttondown = "buttondown" in modelReturn ? modelReturn.buttondown : this.buttondown;
	        this.result = "result" in modelReturn ? modelReturn.result : this.result;
			this.stokeNode = "storeNode" in modelReturn ? modelReturn.storeNode : this.stokeNode;
			this.startdrag = "startdrag" in modelReturn ? modelReturn.startdrag : this.startdrag;
			this.drag = "drag" in modelReturn ? modelReturn.drag : this.drag;
			this.startingNode = "startingNode" in modelReturn ? modelReturn.startingNode : this.startingNode;
		}
    }
    
    
    /**
     *
     */
    mouseMove(event) {
		if (this.focusedModel === Models.Polygon) {
			let resultHandler = this.polygonModel.handleMouseMove(
				event,
				this.canvas,
				this.buttondown,
				this.startingNode,
				this.drag,
				this.result,
				this.startdrag
			);
			this.movestart = resultHandler ? resultHandler : this.movestart;
		}
    }
    mouseUp(event) {
		if (this.focusedModel === Models.Polygon) {
			const modelReturn = 
				this.polygonModel.
				handleMouseUpPolygon(
					event,
					this.buttondown,
					this.canvas,
					this.startingNode,
					this.closed,
					this.movestart,
					this.startdrag
				);
			
			this.buttondown = modelReturn.buttondown;
			this.canvas = modelReturn.canvas;
			this.startingNode = modelReturn.startingNode;
			this.closed = modelReturn.closed;
			this.movestart = modelReturn.movestart;
			this.startdrag = modelReturn.startdrag;
		}
    }
    
    
    store() {
        this.polygonModel.store();
    }
    get() {
        this.polygonModel.get();
    }
    DeleteOverlay() {
        this.polygonModel.DeleteOverlay();
    }
    CleanPoligon() {
        this.polygonModel.CleanPoligon();
        this.closed = false;
    }
    PolygonCenter() {
        this.polygonModel.PolygonCenter();
    }
    CreateGrafic(canvas) {
        this.polygonModel.createGrafic(this.canvas);
    }
    show() {
        alert(this.polygonModel.getSkyPositions());
    }
    /**
     * Set the polygon with points. Points is a simple array. It must have at
     * least 6 values (3pts) and an even number of points
     * @param {Array} points  [a,b,c,.....]
     * @returns {Boolean} true if the polygon is OK
     */
    setPolygon(points) {
        this.polygonModel.setPolygon(points);
        this.closed = true;
        this.invokeHandler(false);
        return true;
    }
    /**
        @brief Call the client handler when the polygon is close or when the user click on accept
     
        @description
        The data passed to the user handler look like that:
        <pre><code>
        {
            isReady: true,             // true if the polygone is closed
            userAction: userAction,     // handler called after the user have clicked on Accept
            region : {
                format: "array2dim",    // The only one suported yet [[x, y]....]
                points: this.polygonModel.skyPositions  // array with structure matching the format
                size: {x: , y:} // regions size in deg
            }
        }
        </code></pre>
        @param {Boolean} userAction - Tell the Handler if it is required that he made an action
        @param {object} background - An object sharing the same aspect as `this.data`
        @return {void}
     */
    invokeHandler(userAction,background) {
		if (this.isPolygonClosed()) {
			//Compute the region size in degrees
			let view = BasicGeometry.getEnclosingView(this.polygonModel.skyPositions);
			if (!this.polygonModel.skyPositions.length) {
				this.data = null;
			} else {
				this.data = {
				    isReady: true,
				    userAction: userAction,
				    region: {
				        format: "array2dim",
				        points: this.polygonModel.skyPositions,
				        size: { x: view.size, y: view.size }
				    }
				}
				if (background) {
					this.data.background = background;					
				} else if (background in this.data) {
					delete this.data.background;
				}
	            this.clientHandler(this.data);
			}
        } else {
            alert("Polygon not closed");
        }
    }
    isPolygonClosed() {
        return (this.closed || (this.polygonModel.node == undefined || this.polygonModel.node.length == 0));
    }
}

