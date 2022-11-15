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
    constructor(points, handler, canvas, canvaso, aladinView, colorValidated) {
        console.log(colorValidated);
        this.node = [];
        this.canvas = canvas[0];
        this.canvaso = canvaso[0];
        this.context = this.canvas.getContext('2d');
        this.contexto = this.canvaso.getContext('2d');
        //this.aladin parameters:
        //this.aladin = aladin;	
        this.overlay = null;
        this.skyPositions = null;
        this.aladinView = aladinView;
        this.points = points;
        this.color = colorValidated;
    }
    /**
    @brief function to keep values from aladin lite & then convert them into canvas values (this.canvas("pixel"))
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

            this.Redrawn(this.node);
        }

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
        //console.log('this.node1: ' + this.node.length);
        //console.log('this.node.length: ' + this.node.length);
        this.skyPositions = [];
        for (var k = 0; k < this.node.length; k++) {
            //this.skyPositions.push(this.aladin.pix2world(this.node[k][0], this.node[k][1]));
            this.skyPositions.push(this.aladinView.pix2world(this.node[k].cx, this.node[k].cy));
        };
        //finalthis.node
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });

            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
        this.overlay.addFootprints([A.polygon(this.skyPositions)]);
    }
    //function pour obtenir les valeurs de le polygon et creer le polygon en adalin lite
    /**
    @brief Function to obtain values from polygon and then create this polygon in aladin lite
    @param {Array<Array<Number>>} points - An array of points representing the vertices of our polygon
    @return {void} nothing
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
    @brief Function to set an overlay
    @param
     */
    setOverlay(points) {
        if (this.overlay == null) {
            this.overlay = A.graphicOverlay({ color: this.color });
            this.aladinView.addOverlayer(this.overlay);
        }
        this.overlay.removeAll();
    }
    //function pour effacer le poligone de this.canvas
    CleanPoligon() {
        this.CanvasUpdate();
        this.node = [];
        this.skyPositions = [];
        //console.log('this.node delete: ' + this.node.length);		
    }
    //trouver le polygon en adalin lite si on se trouve en otre part du universe
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
    //effacer un this.node de le polygone si se trouve sûr autre this.node
    RemoveNode(nodevalue, status) {
        var index = this.node[nodevalue];

        if (this.node.length >= 4) {
            this.node.splice(nodevalue, 1);
            if (status) {
                this.DrawNode(this.node);
            }
            else {
                this.Redrawn(0);
            }

        }
    }
    //function pour obtenir le this.node initial et final du polygon
    GetXYNode(x, y) {
        var nodes = {};

        var dx;
        var dy;

        for (var i in this.node) {
            //console.log('this.nodenum:  ' + i);
            //console.log('cx: ' + this.node[i].cx);
            //console.log('cy: ' + this.node[i].cy);
            dx = x - this.node[i].cx;
            dy = y - this.node[i].cy;
            //var result =Math.sqrt(dx * dx + dy * dy);
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
            var stocknode = [];
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
}

