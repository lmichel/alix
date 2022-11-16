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
 * Model processing the draw canvas
 * 
 * Author Gerardo Irvin Campos yah, Alexandre Viala
 */

class ConeModel {
    constructor(points, handler, drawCanvas, staticCanvas, aladinView, colorValidated) {
        console.log(colorValidated);
        this.centerNode = {};
        this.radius = null;
        this.drawCanvas = drawCanvas[0];
        this.staticCanvas = staticCanvas[0];
        this.context = this.drawCanvas.getContext('2d');
        this.staticContext = this.staticCanvas.getContext('2d');
        this.overlay = null;
        this.skyConeDescriptor = null;
        this.aladinView = aladinView;
        this.color = colorValidated;
        
        this.isCursorOnCircle = false;
        this.isCursorOnCenter = false;

		/**************************************
		************* Some tests **************
		***************************************/
		
		/*
        this.centerNode = {cx: 608, cy: 232};
        this.radius = 100;
        this.get();
        */
    }
    /**
    @description Function to draw the central node of the cone on the canvas
    @param {number} centerX
    @param {number} centerY
     */
    DrawCentralNode(centerX, centerY) {
        this.context.beginPath();
        this.context.arc(centerX, centerY, 5, 0, Math.PI * 2, true);
        this.context.fillStyle = "blue";
        this.context.fill();
        this.context.strokeStyle="blue";
        this.context.stroke();
        this.context.closePath();
    }
    /**
    @description Function to draw the circle once it was validated by the user
    @param {number} centerX
    @param {number} centerY
    @param {number} radius
     */
    DrawCompletedCircle(centerX,centerY,radius) {
		this.drawCircle(centerX, centerY, radius, "lime");
	}
	/**
	@description Function to draw the circle during the setting
	@param {number} centerX
    @param {number} centerY
    @param {number} radius
	 */
    DrawGuidelineCircle(centerX,centerY,radius) {
		this.drawCircle(centerX, centerY, radius, "gray");
	}
	/**
	@description Function to draw a circle with a focused color
	@param {number} centerX
    @param {number} centerY
    @param {number} radius
    @param {string} color
	 */
    drawCircle(centerX, centerY, radius, color) {
		if (radius < 0) {
			radius = Math.abs(radius);
			console.error("The radius is negative!");
		}
		this.context.beginPath();
		this.context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		this.context.strokeStyle = color;
		this.context.stroke();
		this.context.closePath();
	}
	
	/**
	@description Function to place the center of the circle
	@param {number} centerX The x coordinate of the center placed on the canvas
	@param {number} centerY The y coordinate of the center placed on the canvas
	 */
	placeCenter(centerX,centerY) {
		this.centerNode = {
			cx: centerX,
			cy: centerY
		}
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
	}
	
	/**
	@description Function to update the size of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	 */
	updateCircleSize(cursorX,cursorY) {
		let radiusSquared = Math.pow(cursorX-this.centerNode.cx,2) + Math.pow(cursorY-this.centerNode.cy,2);
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
		this.DrawGuidelineCircle(this.centerNode.cx,this.centerNode.cy,Math.sqrt(radiusSquared));
	}
	
	/**
	@description Function to set the size of the circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	 */
	setCircleSize(cursorX,cursorY) {
		let radiusSquared = Math.pow(cursorX-this.centerNode.cx,2) + Math.pow(cursorY-this.centerNode.cy,2);
		this.radius = Math.sqrt(radiusSquared); 
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
		this.DrawCompletedCircle(this.centerNode.cx,this.centerNode.cy,this.radius);
	}
	
	/**
	@description Function to update the position of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	@param {number} radius The radius of the circle one are trying to move
	 */
	updateCirclePosition(cursorX,cursorY,radius) {
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawGuidelineCircle(cursorX,cursorY,radius);
		this.DrawCentralNode(cursorX,cursorY);
	}
	
	/**
	@description Function to set the position of the construction circle
	@param {number} cursorX The current x coordinate of the cursor
	@param {number} cursorY The current y coordinate of the cursor
	@param {number} radius The radius of the circle one are trying to move
	 */
	setCirclePosition(cursorX,cursorY,radius) {
		this.centerNode = {
			cx: cursorX,
			cy: cursorY
		}
		this.radius = radius;
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
		this.DrawCompletedCircle(this.centerNode.cx,this.centerNode.cy,this.radius);
	}
	
	isConeComplete() {
		return this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& this.radius !== null
	}
	
	/**
    @brief Function to obtain values from a cone and create it in aladin lite
    @return {void}
     */
    get() {
        /*
         * When the position are set from outside, the node remains empty while there is edition action.
         *  So if the user want to get back the cone without editing it, we have to cancel this method
         */
        if (this.centerNode && Object.keys(this.centerNode).length == 0 && this.skyPositions && this.skyPositions.length > 0)
            return;

        this.skyConeDescriptor = this.buildSkyConeDescriptor(this.centerNode,this.radius);

        if (this.overlay === null) {
            this.overlay = A.graphicOverlay({ color: this.color });

            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints(
			[A.circle(
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1],
				this.skyConeDescriptor.radius
			)]
		);
    }
    /**
    @description Function to erase the polygon from drawCanvas 
     */
    CleanCone() {
        this.CanvasUpdate();
        this.centerNode = {};
        this.radius = null;		
    }
    
    getView() {
		let skyPositions = [this.skyConeDescriptor];
		if (this.skyConeDescriptor.skyNode[1] > 0) {
			// One takes a radius that point to the south
			skyPositions.push([
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1] - this.radius
			]);
		} else {
			// Else, one takes a radius that point to the north
			skyPositions.push([
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1] + this.radius
			]);
		}
        
        return BasicGeometry.getEnclosingView(skyPositions);
	}
    /**
    @description Find the cone in aladin lite if we cannot visualize it on the screen
    */
    ConeCenter() {
		let view  = this.getView();
		
        this.aladin.gotoPosition(view.center.ra, view.center.dec);
        this.aladin.setZoom(1.2 * view.size);
    }
    
    /**
    @description Function to build the skyConeDescriptor property
    @param {{cx: number, cy: number}} centerNode
    @param {number} radius
    @returns {{skyNode: Array<number>, radius: number}}
     */
    buildSkyConeDescriptor(centerNode, radius) {
		let skyPositionsCenterNode = this.aladinView.pix2world(centerNode.cx, centerNode.cy);
		
		let pointBelongCircle;
		// If dec > 0 i.e. If one is in the north hemisphere
		if (skyPositionsCenterNode[1] > 0) {
			// One takes a radius that point to the south
			pointBelongCircle = centerNode.cy - radius;
		} else {
			// Else, one takes a radius that point to the north
			pointBelongCircle = centerNode.cy + radius;
		}
		
		let skyPositionPointBelongCircle = this.aladinView.pix2world(centerNode.cx,pointBelongCircle);
		let skyRadius = skyPositionPointBelongCircle[1] - skyPositionsCenterNode[1];

        let skyConeDescriptor = {
			skyNode: skyPositionsCenterNode,
			radius: skyRadius
		}
		return skyConeDescriptor;
	}
    
    /**
    @brief Function to obtain values from polygon and then create this polygon in aladin lite
    @return {void}
     */
    setCone(centerX,centerY,radius) {
        this.skyConeDescriptor = this.buildSkyConeDescriptor({cx: centerX, cy: centerY},radius);
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints(
			[A.circle(
				this.skyConeDescriptor.skyNode[0],
				this.skyConeDescriptor.skyNode[1],
				this.skyConeDescriptor.radius
			)]
		); //Create a circle

    }
    
    /**
    @brief Function to delete polygons from this.aladin lite when one enter the edition mode
    @return {void} nothing
     */
    DeleteOverlay() {
        if (this.overlay !== null) {
            this.overlay.addFootprints(
				A.circle(
					this.skyConeDescriptor.skyNode[0],
					this.skyConeDescriptor.skyNode[1],
					this.skyConeDescriptor.radius
				)
			);
            this.overlay.removeAll();
            this.overlay.overlays = [];		           
        }
    }
    
    /**
    @description Function to avoid that an unfinished circle stay stored
     */
    killStoring() {
		this.skyConeDescriptor = null;
		this.overlay = null;
	}
    
    /**
    @brief function to keep values from aladin lite & then convert them into canvas values (this.canvas("pixel"))
    @return {void} nothing
     */
    store() {
        if (this.skyConeDescriptor !== null) {
			let skyNode = this.skyConeDescriptor.skyNode;
			let skyRadius = this.skyConeDescriptor.radius;
			
			let convertedNode = this.aladinView.world2pix(
                skyNode[0],
                skyNode[1]
            );
            let pointBelongCircle;
            if (skyNode[1] > 0) {
				// One takes a radius that point to the south
				pointBelongCircle = skyNode[1] - skyRadius;
			} else {
				// Else, one takes a radius that point to the north
				pointBelongCircle = skyNode[1] + skyRadius;
			}
            
			let skyPositionPointBelongCircle = this.aladinView.world2pix(skyNode[0],pointBelongCircle);
			
			let convertedRadius = skyPositionPointBelongCircle[1] - convertedNode[1];
			
			this.centerNode = {cx: convertedNode[0], cy: convertedNode[1]};
			this.radius = convertedRadius;

            this.Redraw();
        }

    }
    
    /**
    @description Draw again the lines and the nodes stored
     */
    Redraw() {
        this.CanvasUpdate();
        this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
        this.DrawCompletedCircle(this.centerNode.cx,this.centerNode.cy,this.radius);
    }

    /**
    @description Clean the draw Canvas
     */
    CanvasUpdate() {
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
    }
    
    handleMouseMove(event,canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		//Modify size of the circle while the user is moving his/her cursor
		if ( this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& this.radius === null
		) {
			this.updateCircleSize(x,y);
		// Modify position of the circle if the user is holding the center
		} else if (this.isCursorOnCenter) {
			this.updateCirclePosition(x,y,this.radius);
		// Modify size of the circle if the user is holding the edge of the circle
		} else if (this.isCursorOnCircle) {
			this.updateCircleSize(x,y);
		}
	}
	
	handleMouseUp(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		// Place the point if no other point has been placed
		if (this.centerNode === null || Object.keys(this.centerNode).length === 0) {
			this.placeCenter(x,y);
		} else if (
			this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& this.radius === null
		) {
			this.setCircleSize(x,y);
		} else if (this.isCursorOnCircle) {
			this.setCircleSize(x,y);
			document.body.style.cursor = "unset";
		} else if (this.isCursorOnCenter) {
			this.setCirclePosition(x,y,this.radius);
			document.body.style.cursor = "unset";
		}
		this.isCursorOnCenter = false;
		this.isCursorOnCircle = false;
	}
	
	handleMouseDown(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		if (this.isConeComplete()) {
			let tolerance = 8; // Tolerance in pixels
			let centerX = this.centerNode.cx;
			let centerY = this.centerNode.cy;
			let radius = this.radius;
			let distToCenter = Math.sqrt(Math.pow(centerX-x,2)+Math.pow(centerY-y,2));
			
			if (distToCenter < tolerance) {
				document.body.style.cursor = "grabbing";
				this.isCursorOnCenter = true;
			} else if (Math.abs(distToCenter-radius) < tolerance) {
				document.body.style.cursor = "grabbing";
				this.isCursorOnCircle = true;
			}
		}
	}
}

