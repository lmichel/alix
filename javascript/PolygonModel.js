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

class PolygonModel {
    constructor(points, handler, drawCanvas, staticCanvas, aladinView, colorValidated) {
        console.log(colorValidated);
        this.node = [];
        this.drawCanvas = drawCanvas[0];
        this.staticCanvas = staticCanvas[0];
        this.context = this.drawCanvas.getContext('2d');
        this.staticContext = this.staticCanvas.getContext('2d');
        this.overlay = null;
        this.skyPositions = null;
        this.aladinView = aladinView;
        this.points = points;
        this.color = colorValidated;
    }
    DrawNode(data) {
        for (var i in data) {
			console.log(data);
            this.context.beginPath();
            this.context.arc(data[i].cx, data[i].cy, data[i].r, 0, Math.PI * 2, true);
            this.context.fillStyle = "blue";
            this.context.fill();
            this.context.strokeStyle="black"
            this.context.stroke();
            this.context.closePath();
        }
    }
    //Drawn Line
    DrawnLine(startingNode, x, y, result) {
        if (result != null) {
            this.context.beginPath();
            this.context.lineCap = "round";

            for (var i in this.node) {
                if (this.node[result.N] == i)
                    this.context.moveTo(this.node[result.N].cx, this.node[result.N].cy);

                this.context.lineTo(this.node[i].cx, this.node[i].cy);
            }
        }

        else {
            this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
            this.context.beginPath();
            this.context.lineCap = "round";
            this.context.moveTo(this.node[startingNode].cx, this.node[startingNode].cy);
            this.context.lineTo(x, y);
        }
        this.context.closePath();
        this.context.strokeStyle = 'lime';
        this.context.stroke();
    }
    
    /**
    @description Draw again the lines and the nodes stored
    @param {*} result
     */
    Redraw(result) {
        this.CanvasUpdate();
        for (var i in this.node) {
            this.context.beginPath();
            this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
        }

        this.DrawnLine(0, 0, 0, result);
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
    @description Convert an Array of Array representing nodes to an array of Object
    @param {Array<Array<number>>} data An array of nodes represented by arrays
    */
    ArrayToObject(data) {
	console.log("data",data);
        var NodeTemp = [];
        for (let [cx,cy] of data) {
            NodeTemp.push(
                {
                    cx: cx,
                    cy: cy,
                    r: 5
                }
            );
        }

        this.node = NodeTemp;
    }
    //Fuction pour obtenir le hautor du polygon
    /*
    GetHeight(array) {
        var Ramax = null, Ramin = null;
        var finaltemp;
        var largeur;

        for (var i in array) {
            temp = array[i][0];

            if (Ramax == null) {
                Ramax = temp;
            }
            else if (temp >= Ramax) {
                Ramax = temp;
            }

            if (Ramin == null) {
                Ramin = temp;
            }
            else if (temp <= Ramin) {
                Ramin = temp;
            }
        }

        largeur = (Ramax - Ramin);

        if (largeur > 180) {
            largeur = 360 - largeur;
        }

        return { ramax: Ramax, ramin: Ramin, largeur: largeur };
    }
    */
    //function pour obtenir le numero de segment et construir un segment
    NumeroSegmen() {
        var TotalNodes = this.node.length;
        var segmentoini, segmentofin;
        var total = [];

        for (var j = 0; j < this.node.length; j++) {
            if (segmentoini == undefined)
                segmentoini = j;
            else if (segmentofin == undefined) {
                segmentofin = j;
            }

            if (segmentoini != undefined && segmentofin != undefined) {
                total.push({
                    A: segmentoini,
                    B: segmentofin
                });

                segmentoini = segmentofin;
                segmentofin = undefined;
            }
        }

        total.push({
            A: (this.node.length - 1),
            B: 0
        });

        //console.log('total: ' + total.length);
        return total;
    }
    //function pour obtenir le hauteur de un polygone
    /**
    @description Function get the width (height ?) of a polygon
    @param {Array<Array<number>>} array - an array of nodes forming a polygon
    @return {{decmax: number, decmin: number, width: number}}
     */
    GetWidth(array) {
        var Decmax = null, Decmin = null;
        var temp;
        var width;

        for (var i in array) {
            temp = (array[i][1]);

            if (Decmax == null) {
                Decmax = temp;
            }
            else if (temp >= Decmax) {
                Decmax = temp;
            }

            if (Decmin == null) {
                Decmin = temp;
            }
            else if (temp <= Decmin) {
                Decmin = temp;
            }
        }

        width = (Decmax - Decmin);

        if (width > 180) {
            width = 360 - width;
        }

        return { decmax: Decmax, decmin: Decmin, width: width };
    }
    
    //function para crear una grafica en el this.drawCanvas
    /**
    @description Function to create a graph on the drawCanvas (this.drawCanvas)
    @param {Element} canvas1 - The drawCanvas on which one will draw
     */
    DrawGrafic(canvas1) {
        var canvasgraf = canvas1;
        var ancho = canvasgraf.width;
        var alto = canvasgraf.height;

        var contextGrafic = canvasgraf.getContext('2d');
        var contador = 20;
        var contador2 = 20;

        //console.log("ancho: " + ancho);
        //console.log("alto: " + alto);
        for (var i = 0; i < alto; i++) {

            this.contextGrafic.beginPath();

            if (i === 0) {
                this.contextGrafic.moveTo(i + 20, 10);
                this.contextGrafic.lineTo(i + 20, alto);
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillText("0", i + 15, 20);
            }

            else {
                this.contextGrafic.moveTo(i + contador, 20);
                this.contextGrafic.lineTo(i + contador, alto);
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillText(i, (i + contador) - 3, 20);
            }

            this.contextGrafic.closePath();
            this.contextGrafic.strokeStyle = 'yellow';
            //this.context.lineWidth = 3;
            this.contextGrafic.stroke();

            contador = parseInt(contador + 20);

        }

        for (var i = 0; i < ancho; i++) {

            this.contextGrafic.beginPath();
            this.contextGrafic.lineCap = "round";

            if (i === 0) {
                this.contextGrafic.moveTo(12, i + 20);
                this.contextGrafic.lineTo(ancho, i + 20);
            }

            else {
                this.contextGrafic.moveTo(12, 0 + contador2);
                this.contextGrafic.lineTo(ancho, 0 + contador2);
                this.contextGrafic.font = "bold 8px sans-serif";
                this.contextGrafic.fillStyle = "black";
                this.contextGrafic.fillText(i, 3, (0 + contador2) + 3);
            }

            this.contextGrafic.closePath();
            this.contextGrafic.strokeStyle = 'brown';
            //this.context.lineWidth = 3;
            this.contextGrafic.stroke();
            contador2 = parseInt(contador2 + 20);
        }
    }
    isEmpty() {
        if (this.node.length == 0)
            return true;

        else
            return false;
    }
    /**
    @description Function to add node to this.node
    @param {number} x
    @param {number} y
    @param {Array<number>} startingNode
    @param {boolean} polygonstatus
     */
    addNode(x, y, startingNode, polygontatus) {
        if (polygontatus) {
            let newNode = {};
            let lastnode = {};
            let position = parseInt(startingNode[0].position);

            newNode.cx = startingNode[0].cx;
            newNode.cy = startingNode[0].cy;
            newNode.r = startingNode[0].r;

            lastnode.r = 5;
            if (this.node.length === position) {
                lastnode.cx = this.node[(this.node.length - 1)].cx;
                lastnode.cy = this.node[(this.node.length - 1)].cy;

                //add the node
                this.node.splice((this.node.length - 1), 1, lastnode, newNode);
            } else {
                lastnode.cx = this.node[startingNode[0].position].cx;
                lastnode.cy = this.node[startingNode[0].position].cy;

                //add the node
                this.node.splice(startingNode[0].position, 1, newNode, lastnode);
            }
            this.Redraw(0);
        }

        else {
            let flag = typeof (startingNode);
            if (flag != "object") {
                if (startingNode == 0 && this.node.length > 1) {
                    this.node.unshift(
                        {
                            cx: x,
                            cy: y,
                            r: 5
                        }
                    );
                }

                else {
                    this.node.push(
                        {
                            cx: x,
                            cy: y,
                            r: 5
                        }
                    );
                }
                this.DrawNode(this.node);
            }

            else {

                if (startingNode != undefined /*&& startingNode.B != undefined*/) {
                    let addnode = {};
                    let preview = {};

                    preview.cx = startingNode.segmento.xA;
                    preview.cy = startingNode.segmento.yA;
                    preview.r = 5;

                    addnode.cx = x;
                    addnode.cy = y;
                    addnode.r = 5;

                    this.node.splice(startingNode.segmento.segmento, 1, preview, addnode);
                    this.Redraw(0);

                }
            }
        }

        //console.log('this.node add: ' + this.node.length);        
    }
    //function que permet obtener le numero de this.node
    /**
    @description Function that let us obtain the index of this.node considering x & y coordinates
    @param {number} x - x coordinate of the clicked point
    @param {number} y - y coordinate of the clicked point
   	@returns {number} The index of the clicked point, -1 otherwise
     */
    getNode(x, y) {
        var dx = 0;
        var dy = 0;
        var result = 0;

        for (var i in this.node) {
            dx = x - this.node[i].cx;
            dy = y - this.node[i].cy;
            //var result =Math.sqrt(dx * dx + dy * dy);
            var result = dx * dx + dy * dy;

            if (result <= 25) {
                //console.log('i: ' + i);
                return i;
            }
        }
        return -1;
    }

    /**
    @description Function to get the 2 nodes that shape the segment
    @param {number} clickedNode - the position on a segment that has been clicked
    @returns {{A: number, B:number, N: number}} An object containing the position of:
    	- the beginning of the sub segment A
    	- the end of the sub segment B
    	- the point clicked N
     */
    getSegment(clickedNode) {
        var pointA = 0, pointB = 0;

        if (clickedNode == 0) {
            //console.log('nodo 0');
            pointA = (parseInt(clickedNode) + 1);
            pointB = (this.node.length - 1);
        }
        else if (clickedNode == (this.node.length - 1)) {
            //console.log('nodo final:' + (this.node.length -1));
            pointA = parseInt((this.node.length - 1) - 1);
            pointB = 0;
        }
        else {
            pointA = (parseInt(clickedNode) + 1);
            pointB = (parseInt(clickedNode) - 1);
        }
        return { A: pointA, B: pointB, N: clickedNode };
    }
    /**
    @description Function to erase the drawCanvas
     */
    canvasUpdate() {
        this.staticContext.drawImage(this.drawCanvas, 0, 0);
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    }
    /**
    @brief Function to draw lines
    @param {Array<Number>} startingNode the node from which the path begin
    @param {number} x the x endpoint coordinate
    @param {number} y the y endpoint coordinate
     */
    drawHashline(startingNode, x, y) {
        this.DrawnLine(startingNode, x, y);
    }
    /**
    @brief Function to delete a line from the polygon
    @return {void}
     */
    CleanLine() {
        //this.staticContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    }
    /**
    @brief Function to know if the current node {this.node} is an endpoint
    @param {Array<Number>} clickedNode - The node that has been clicked
    @return {Boolean} true if the current node is an extremety, false otherwise
     */
    isExtremity(clickedNode) {
        if (clickedNode == 0 || clickedNode == (this.node.length - 1)) {
            return true;
        }
        return false;

    }
    /**
    @brief Function that check if the user close a polygon
    @param {Array<Number>} clickedNode - The node clicked by the user
    @param {Array<Number>} startingNode - The node that started the polygon
    @return {Boolean} true if the polygon has been closed, false otherwise
     */
    closePolygone(clickedNode, startingNode) {
        if (clickedNode == startingNode) {
            return false;
        }
        else if (clickedNode == 0 && startingNode == (this.node.length - 1)) {
            for (var i in this.node) {
                this.context.beginPath();
                this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
                this.context.fillStyle = this.color;
                this.context.fill();
                this.context.stroke();
                this.context.closePath();
            }
            return true;
        }
        else if (clickedNode == (this.node.length - 1) && startingNode == 0) {
            for (var i in this.node) {
                this.context.beginPath();
                this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2, true);
                this.context.fillStyle = this.color;
                this.context.fill();
                this.context.stroke();
                this.context.closePath();
            }
            return true;
        }
        return false;
    }
    /**
    @brief Method to move a node (this.node) and the 2 segments linked to it
    @param {Array<Number>} clickedNode - The node we want to drag
    @param {Number} x - The x position we want tot se to the node
    @param {Number} y - The y position we want to set to the node
    @param {} result - The result of the operation
    
    @return {void}
     */
    Drag(clickedNode, x, y, result) {


        //set new values
        this.node[clickedNode].cx = x;
        this.node[clickedNode].cy = y;

        this.node[result.N].cx = x;
        this.node[result.N].cy = y;

        this.Redraw(result);
    }
    /**
    @brief function to keep values from aladin lite & then convert them into drawCanvas values (this.drawCanvas("pixel"))
    @return {void} nothing
     */
    store() {
        //console.log('mesage this.almacenar');
        //console.log('this.skyPositions: ' + this.skyPositions);
        if (this.skyPositions != null) {
            //console.log('this.skyPositions' + this.skyPositions);
            //console.log('this.node' + this.node);					
            this.node = [];
            this.skyPositions.pop();

            for (var k = 0; k < this.skyPositions.length; k++) {
                this.node.push(this.aladinView.world2pix(
                    this.skyPositions[k][0],
                    this.skyPositions[k][1]
                ));
            }

            this.ArrayToObject(this.node);

            this.Redraw(this.node);
        }

    }
    
    restore(points) {
		if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
		this.skyPositions = points;
		this.overlay.addFootprints([A.polygon(this.skyPositions)]);
	}
    /**
    @brief Function to delete polygons from this.aladin lite when one enter the edition mode
    @return {void} nothing
     */
    DeleteOverlay() {
        if (this.overlay != null) {
            //console.log('this.skyPositions: ' + this.skyPositions);
            //console.log('A: ' + typeof(A));
            this.overlay.addFootprints(A.polygon(this.skyPositions));
            this.overlay.removeAll();
            this.overlay.overlays = [];
            //console.log('this.overlay' + this.overlay);			           
        }
    }
    /**
    @brief Function to obtain values from a polygon and create it in aladin lite
    @return {void} nothing
     */
    get() {
        /*
         * When the position are set from outside, the node remains empty while there is edition action.
         *  So if the user want to get back the polygoene without editing it, we have to cancel this method
         */
        if (this.node && this.node.length == 0 && this.skyPositions && this.skyPositions.length > 0) {
            return;
        }
        this.skyPositions = [];
        for (var k = 0; k < this.node.length; k++) {
            this.skyPositions.push(this.aladinView.pix2world(this.node[k].cx, this.node[k].cy));
        }
        console.log(this.skyPositions)
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });

            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints([A.polygon(this.skyPositions)]);
    }
    /**
    @brief Function to obtain values from polygon and then create this polygon in aladin lite
    @param {Array<Array<Number>>} points - An array of points representing the vertices of our polygon
    @return {void}
     */
    setPolygon(points) {
        this.skyPositions = [];
        for (var k = 0; k < points.length; k++) {
            this.skyPositions.push(points[k]);
        }
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints([A.polygon(this.skyPositions)]); //créer la polygon

        //this.PolygonCenter();
    }
    /**
    @description Function to set an overlay
    @param
     */
    setOverlay(points) {
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
    }
    /**
    @description Function to erase the polygon from drawCanvas 
     */
    CleanPolygon() {
        this.CanvasUpdate();
        this.node = [];
        this.skyPositions = [];		
    }
    /**
    @description Find the polygon in aladin lite if we cannot visualize it on the screen
    */
    PolygonCenter() {
        var view = BasicGeometry.getEnclosingView(this.skyPositions);
        this.aladin.gotoPosition(view.center.ra, view.center.dec);
        this.aladin.setZoom(1.2 * view.size);
        // LM patch
        //			var Height = this.GetHeight(this.skyPositions);		
        //			var width = this.GetWidth(this.skyPositions);
        //			if( Height.largeur == 0 || width.largeur == 0 ) {
        //				return;
        //			}
        //			var center = {};
        //			center.ra = ((Height.ramax +  Height.ramin)/2);
        //			center.dec =  ((width.decmax + width.decmin)/2);
        //			this.aladinView.gotoPosition(center.ra, center.dec);
        //			this.aladinView.setZoom( (width.width + Height.largeur) );
    }
    /**
    @description Erase node if it is on another node
    @param {number} nodevalue
    @param {boolean} status
    @returns {void}
     */
    //effacer un this.node de le polygone si se trouve sûr autre this.node
    RemoveNode(nodevalue, status) {
        var index = this.node[nodevalue];

        if (this.node.length >= 4) {
            this.node.splice(nodevalue, 1);
            if (status) {
                this.DrawNode(this.node);
            }
            else {
                this.Redraw(0);
            }

        }
    }
    /**
    @description function to obtain the initial & final node of the polygon
    @param {number} x
    @param {number} y
    @returns {{a: Array<number>, b: Array<number>}} The initial node (a) and the final node (b) of the polygon
     */
    GetXYNode(x, y) {
        let nodes = {};

        let dx;
        let dy;

        for (var i in this.node) {
            dx = x - this.node[i].cx;
            dy = y - this.node[i].cy;
            var result = dx * dx + dy * dy;

            if (result <= 25) {
                if (nodes.a == undefined) {
                    nodes.a = i;
                }

                else {
                    nodes.b = i;
                }
            }
        }

        return nodes;
    }
    //metodo que debuelve el numero de nodos del poligono
    GetNodelength() {
        return this.node;
    }
    //crear la grafica
    createGrafic(parametre) {
        this.DrawGrafic(parametre);
    }
    //indicar cuando serrar poligono
    cuadradoIndicador(x, y) {
        this.context.beginPath();
        this.context.fillRect(x, y, 10, 10);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
    stokeNode(nodeposition) {
        if (nodeposition != undefined) {
            let stocknode = [];
            stocknode.push({
                position: nodeposition,
                cx: this.node[nodeposition].cx,
                cy: this.node[nodeposition].cy,
                r: 5
            });

            return stocknode;
        }
        return null;

    }
    getSkyPositions() {
        return this.skyPositions;
    }
    
    handleMouseUpPolygon(event, buttondown, canvas, startingNode, closed, movestart, startdrag, storeNode) {
    	let clickedNode = -1;
		let finalnode;
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
		let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
		//Ask if the element pressed is a node
		if (buttondown == true && (clickedNode = this.getNode(x, y)) != -1) {
		    //Ask is the node is a polygon's endpoint
		    if (this.isExtremity(clickedNode) == false) {
		        this.CleanLine();
		        buttondown = false;
		    }
		
		    if (this.closePolygone(clickedNode, startingNode) == true) {					
		        buttondown = false;
		        closed = true;
		        //this.invokeHandler(false); if one add this then the length of skyPosition[] will be null						
		    }
		}
		
		if (closed == true && (finalnode = this.GetXYNode(x, y)) != null) {
		    if (finalnode.a != undefined && finalnode.b != undefined) {
		        if (startingNode == finalnode.a)
		            this.RemoveNode(finalnode.a, false);
		        else if (startingNode == finalnode.b)
		            this.RemoveNode(finalnode.b, false);
		    }
		}
		
		if (buttondown == true && movestart == true) {
		    if (clickedNode == startingNode && (clickedNode = this.getNode(x, y) != -1))
		    {
		        buttondown = false;
		        movestart = false;
		        this.CleanLine();
		    }
		
		    else {
		        this.addNode(x, y, startingNode);
		        buttondown = false;
		        movestart = false;
		
		        let nodes = this.GetNodelength();
		        let segment = new Segment(nodes);
		
		        let inter = segment.Itersection(this.startingNode, false);
		
		        if (inter != -1 && inter != undefined) {
		            //poligono abierto = true
		            if (startingNode != 0)
		                this.RemoveNode(inter.nB, true);
		
		            else
		                this.RemoveNode(inter.nA, true);
		
		            this.CleanLine();
		        }
		    }
		
		}
		else if (buttondown == true && movestart == false) {
		    buttondown = false;
		    movestart = false;
		}
		
		if (startdrag == true) {
		    //console.log('this.startdrag fin');
		    startdrag = false;
		    canvas.css('cursor', 'default');
		
		    //store the node number pushed			
		    let nodes = this.GetNodelength();
		    let segment = new Segment(nodes);
		    let inter = segment.Itersection(startingNode, true);
		    if (inter != -1 && inter != undefined) {
		        this.RemoveNode(this.startingNode, false);
		        this.addNode(x, y, storeNode, true);
		    }
		}
		this.canvasUpdate();
		
		return {
			buttondown: buttondown,
			canvas: canvas,
			startingNode: startingNode,
			closed: closed,
			movestart: movestart,
			startdrag: startdrag
		}
	}
	
	handleMouseDownPolygon(event, closed, canvas) {
		let clickedNode = -1;
        let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
        let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
        
        const resultObject = {
			closed: closed,
			canvas: canvas
		};        

        //ask if the polygon is empty
        if (this.isEmpty()) {
            this.addNode(x, y);
        }
        //Get segment
        //start the this.drag of the node	
        else if (resultObject.closed == true && (clickedNode = this.getNode(x, y)) != -1) {
            resultObject.result = this.getSegment(clickedNode);
            resultObject.storeNode = this.stokeNode(clickedNode);
            resultObject.startdrag = true;
            resultObject.drag = clickedNode;
            resultObject.startingNode = clickedNode;
            resultObject.canvas.css('cursor', 'move');
        }
        //ask if the focused space is a node 
        else if ((clickedNode = this.getNode(x, y)) != -1) {
            //Ask if the node is an end point of the polygon
            if (this.isExtremity(clickedNode) /*opened polygon*/) {
                //Ask if the polygon is open
                if (closed == true) {
                    resultObject.startingNode = -1;
                    resultObject.buttondown = false;
                }

                else {
                    resultObject.startingNode = clickedNode;
                    resultObject.buttondown = true;
                    resultObject.closed = false;
                }
            }
        }
        //Ask if the point is on a segment
        if (resultObject.closed && clickedNode == -1) {
            let nodes = this.GetNodelength();

            let segment = new Segment(nodes);
            let option = segment.IsCursorOn(x, y);

            if (option != undefined) {
				switch(option.flag) {
					case "vertical": {
						this.addNode(x, y, option);
						break;
					}
					case "horizontal": {
						this.addNode(x, y, option);
						break;
					}
					case "distancia": {
						this.addNode(x, y, option);
						break;
					}
					default: {
						console.error(`Flag ${option.flag} not recognized!`);
					}
				}
            }
        }
        return resultObject;
	}
	
	handleMouseMove(event, canvas, buttondown, startingNode, drag, result, startdrag) {
		let x = parseInt(event.pageX) - parseInt(canvas.offset().left).toFixed(1);
        let y = parseInt(event.pageY) - parseInt(canvas.offset().top).toFixed(1);
        //console.log(`x:${x}, y:${y}`);
        let movestart = null;

        //Ask if a node was pressed
        if (buttondown == true && startingNode != -1) {
            movestart = true;
            this.drawHashline(startingNode, x, y, result);
        }
        else if (startdrag) {
            this.Drag(drag, x, y, result);	
        }
        return movestart;
	}
}
