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
    constructor(drawCanvas, staticCanvas, aladinView, tolerance, colorValidated) {
        this.centerNode = {};
        this.radiusNode = {};
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
        
        this.tolerance = tolerance;

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
        this.context.strokeStyle="black";
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
		this.drawCircle(centerX, centerY, radius, "black");
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
		this.radiusNode = {
			cx: cursorX,
			cy: cursorY
		}
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
		this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
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
	setCirclePosition(cursorX,cursorY) {
		let variationVector = {
			vx: cursorX-this.centerNode.cx,
			vy: cursorY-this.centerNode.cy
		};
		
		this.radiusNode = {
			cx: this.radiusNode.cx+variationVector.vx,
			cy: this.radiusNode.cy+variationVector.vy
		}
		
		this.centerNode = {
			cx: cursorX,
			cy: cursorY
		}
		
		this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
		this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
		this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
	}
	/**
	@description Method to verify that the cone has a center node set & a radius set
	@returns {boolean} True if the cone is complete, false in other cases
	 */
	isConeComplete() {
		return this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& this.radiusNode !== null
			&& Object.keys(this.radiusNode).length === 2
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
        if (this.centerNode && Object.keys(this.centerNode).length == 0 && this.skyConeDescriptor && this.skyConeDescriptor.length > 0)
            return;
            
        this.skyConeDescriptor = this.buildSkyConeDescriptor(this.centerNode,this.radiusNode);
        //this.testSuccessiveConversion(this.centerNode.cx,this.centerNode.cy, 20);

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
    @description Small function to simulate the shift of the polygon
     */
    testSuccessiveConversion(pixX,pixY, iterations) {
		let pixObject = {cx: pixX, cy: pixY};
		let skyObject = {};
		console.log("============== TESTS BEGINS ==============");
		for (let  i = 0; i < iterations; ++i) {
			console.log("pixObject : ",pixObject);
			let skyToConvert = this.aladinView.pix2world(pixObject.cx, pixObject.cy);
			skyObject = {cx: skyToConvert[0], cy: skyToConvert[1]};
			
			console.log("skyObject : ", skyObject);
			let pixToConvert = this.aladinView.world2pix(skyObject.cx, skyObject.cy);
			pixObject = {cx: pixToConvert[0], cy: pixToConvert[1]};
		}
		console.log("================ END TESTS ================");
	}
    /**
    @description Function to erase the polygon from drawCanvas 
     */
    CleanCone() {
        this.CanvasUpdate();
        this.centerNode = {};
        this.radiusNode = {};	
    }
    /*
    /**
    @description Function to get an enclosing view from BasicGeometry of the cone
    @returns {*} An enclosing view of the cone

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
	*/
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
    @param {{cx: number, cy: number}} centerNode The central node of the cone
    @param {{cx: number, cy: number}} radiusNode A node on the cone
    @returns {{skyNode: Array<number>, radius: number}} A sky cone descriptor object describing the cone
     */
    buildSkyConeDescriptor(centerNode, radiusNode) {
		console.log("Before pix2world: ", centerNode, radiusNode);
		let skyPositionsCenterNode = this.aladinView.pix2world(centerNode.cx, centerNode.cy);
		let skyPositionsRadiusNode = this.aladinView.pix2world(radiusNode.cx, radiusNode.cy);
		//let pointBelongCircle;
		// If dec > 0 i.e. If one is in the north hemisphere
		/*
		if (skyPositionsCenterNode[1] > 0) {
			// One takes a radius that point to the south
			pointBelongCircle = centerNode.cy - radius;
		} else {
			// Else, one takes a radius that point to the north
			pointBelongCircle = centerNode.cy + radius;
		}
		*/
		
		//let skyPositionPointBelongCircle = this.aladinView.pix2world(centerNode.cx,pointBelongCircle);
		//let skyRadius = skyPositionPointBelongCircle[1] - skyPositionsCenterNode[1];
		let skyRadius = BasicGeometry.distanceBetweenNodes(skyPositionsRadiusNode,skyPositionsCenterNode);

        let skyConeDescriptor = {
			skyNode: skyPositionsCenterNode,
			skyRadiusNode: skyPositionsRadiusNode,
			radius: skyRadius
		}
		
		return skyConeDescriptor;
	}
    
    /**
    @description Function to obtain values from cone and then create this cone in aladin lite
     */
    setCone(centerX,centerY,radiusX,radiusY) {
        this.skyConeDescriptor = this.buildSkyConeDescriptor({cx: centerX, cy: centerY},{cx: radiusX, cy: radiusY});
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
    @description Function to delete cones from this.aladinlite when one enter the edition mode
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
    @description function to keep values from aladin lite & then convert them into canvas values (this.canvas("pixel"))
     */
    store() {
        if (this.skyConeDescriptor !== null && this.skyConeDescriptor.skyNode !== null && !isNaN(this.skyConeDescriptor.skyRadiusNode[0])) {
			let skyNode = this.skyConeDescriptor.skyNode;
			let skyRadiusNode = this.skyConeDescriptor.skyRadiusNode;
			
			let convertedCenterNode = this.aladinView.world2pix(
                skyNode[0],
                skyNode[1]
            );
            let convertedRadiusNode = this.aladinView.world2pix(
				skyRadiusNode[0],
				skyRadiusNode[1]
			);
			console.log("After world2pix: ",convertedCenterNode,convertedRadiusNode);
						
			/** 
			@tofix
			/!\ Adding +1 to the coordinates is an awful solution but it is the simplest
				one that we can implement for now.
				AladinLite make a floor operation to convert the world coordinate into 
				integer/pixel coordinates. It should at least use a round function
				to avoid the continuous shift.
				The best solution would be to have a world2float function in aladin instead.
				In this case we could avoid these shifts and keep a constant value.
			*/
			this.centerNode = {cx: convertedCenterNode[0]+1, cy: convertedCenterNode[1]+1};
			this.radiusNode = {cx: convertedRadiusNode[0]+1, cy:convertedRadiusNode[1]+1};
			console.log("Call redraw");
            this.Redraw();
        } else {
			this.CleanCone();
		}

    }
    
    /**
    @description Method to compute a circle radius in pixels given the 
    center and a point that belong to the circle
    @param {{cx: number, cy: number}} centerNode The central node of the circle
    @param {{cx: number, cy: number}} radiusNode A node on the circle
    @return {number} the radius of the circle
     */
    computeRadius(centerNode,radiusNode) {
		return Math.sqrt(
			Math.pow(centerNode.cx-radiusNode.cx,2) +
			Math.pow(centerNode.cy-radiusNode.cy,2)
		)
	}
    
    /**
    @description Draw again the lines and the nodes stored
     */
    Redraw() {
        this.CanvasUpdate();
        this.DrawCentralNode(this.centerNode.cx,this.centerNode.cy);
        this.DrawCompletedCircle(
			this.centerNode.cx,
			this.centerNode.cy,
			this.computeRadius(this.centerNode,this.radiusNode)
		);
    }

    /**
    @description Clean the draw Canvas
     */
    CanvasUpdate() {
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
    }
    
    /**
    @description Method to calculate the distance of the point Point(x,y)
    from the center of the point this.centerNode.
    @param {number} x - x coordinate of the point we want to know the distance from center
    @param {number} y - y coordinate of the point we want to know the distance from center
    @returns {number} The distance of Point(x,y) to the center of the circle
     */
    computeCenterDistanceTo(x,y) {
			let centerX = this.centerNode.cx;
			let centerY = this.centerNode.cy;
			let distToCenter = Math.sqrt(Math.pow(centerX-x,2)+Math.pow(centerY-y,2));
			
			return distToCenter;
	}
    
    /**
    @description Method to handle the movement of the mouse
    @param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
     */
    handleMouseMove(event,canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		//Modify size of the circle while the user is moving his/her cursor
		if ( this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& (this.radiusNode === null
			|| Object.keys(this.radiusNode).length === 0)
		) {
			this.updateCircleSize(x,y);
		// Modify position of the circle if the user is holding the center
		} else if (this.isCursorOnCenter) {
			this.updateCirclePosition(x,y,this.computeRadius(this.centerNode,this.radiusNode));
		// Modify size of the circle if the user is holding the edge of the circle
		} else if (this.isCursorOnCircle) {
			this.updateCircleSize(x,y);
		} else {
			let radius = this.computeRadius(this.centerNode,this.radiusNode);
			let distToCenter = this.computeCenterDistanceTo(x,y);
			
			if (distToCenter < this.tolerance) {
				this.drawCanvas.style.cursor = "pointer";
			} else if (Math.abs(distToCenter-radius) < this.tolerance) {
				this.drawCanvas.style.cursor = "pointer";
			} else {
				this.drawCanvas.style.cursor = "unset";
			}
		}
	}
	
	/**
	@description Method to handle the end of a mouse click on the canvas
	@param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
	 */
	handleMouseUp(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		// Place the point if no other point has been placed
		if (this.centerNode === null || Object.keys(this.centerNode).length === 0) {
			this.placeCenter(x,y);
		} else if (
			this.centerNode !== null
			&& Object.keys(this.centerNode).length === 2
			&& (
				this.radiusNode === null
				|| Object.keys(this.radiusNode).length === 0
			)
		) {
			this.setCircleSize(x,y);
		} else if (this.isCursorOnCircle) {
			this.setCircleSize(x,y);
			this.drawCanvas.style.cursor = "unset";
		} else if (this.isCursorOnCenter) {
			this.setCirclePosition(x,y);
			this.drawCanvas.style.cursor = "unset";
		}
		this.isCursorOnCenter = false;
		this.isCursorOnCircle = false;
	}
	
	/**
	@description Method to handle the beginning of a mouse click on the canvas
	@param {Event} event event containing the position of the cursor
    @param {Element} canvas drawCanvas on which the user will draw
	 */
	handleMouseDown(event, canvas) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		
		if (this.isConeComplete()) {
			let radius = this.computeRadius(this.centerNode,this.radiusNode);
			let distToCenter = this.computeCenterDistanceTo(x,y);
			
			if (distToCenter < this.tolerance) {
				this.drawCanvas.style.cursor = "grabbing";
				this.isCursorOnCenter = true;
			} else if (Math.abs(distToCenter-radius) < this.tolerance) {
				this.drawCanvas.style.cursor = "grabbing";
				this.isCursorOnCircle = true;
			}
		}
	}
}

