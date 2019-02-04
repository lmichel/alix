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
//"use strict"
function Segment(polygoneNodes /*canvas*/)
{
	var alfa;
	var beta;	
	var node = [];
	node = polygoneNodes;
	var nodesegmentos;

	this.IsCursorOn = function(x,y)
	{
		var result;
		
		//crear los segmentos:
		nodesegmentos = NumSegment(node);
		
		//si es un rectangulo
		if(seg = IsRectangle(x,y))
		{
			//calcular la distancia
			result = Distance(seg,x,y);
			return result;
		}			
			
	};
	
	//funcion para saber si se crea el rectangulo
	function IsRectangle(coorx, coory)	
	{	
		
		var x = parseInt(coorx);
		var y = parseInt(coory);
		var nodeXtremity = {};			
		
		var xa,xb,ya,yb;				
		
		for(var i in nodesegmentos)
		{				
			var xmin, xmax;
			var ymin, ymax;
			
			xa = node[nodesegmentos[i].A].cx;
			ya = node[nodesegmentos[i].A].cy;			
			xb = node[nodesegmentos[i].B].cx;
			yb = node[nodesegmentos[i].B].cy;
					
			xmin = (parseInt(xa) > parseInt(xb) )? xb:xa;
			xmax = (parseInt(xa) > parseInt(xb) )? xa:xb;
			
			ymin = (parseInt(ya) > parseInt(yb) )? yb:ya;
			ymax = (parseInt(ya) > parseInt(yb) )? ya:yb;

			if(x >= xmin && x <= xmax)
			{				
				if(y >= ymin && y <= ymax )
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}
					
				}
			}
			if(xmax === xmin)
			{
				if(y >= ymin && y <= ymax )
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}
				}
			}
			if(ymin === ymax)
			{	
				if(x > xmin && x < xmax)
				{
					seg = {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};
					if( ( dis = Distance(seg,x,y) ) != -1)
					{
					return {xA:xa, yA:ya, xB:xb, yB:yb, segmento:i};	
					}	
				}				
			}
		}	
	}

	//funcion para calcular la distancia del punto M(x,y) de los segmentos: A(xa,ya) y B(xb,yb)
	function Distance(seg,x,y)
	{
		//console.log('puedes calcular distancia');	
		var recta;
		var distancia;
		
		var h,v;
		
		if((v = Vertical(seg, x)) != -1)
		{
			return {flag: "vertical", segmento: seg};
			
		}else if((h = Horizontale(seg, y)) != -1)
		{		
			return {flag: "horizontal", segmento: seg};
		}
		else if(v == -1 && h == -1)
		{
			
			var alfa = CalculerAlfa(seg);
			var beta = Beta(seg);			
			
			recta = Math.abs( ( (alfa * parseInt(x)) + parseInt(y) + beta) );
			distancia = (recta / Math.sqrt(((alfa * alfa)+1)));
			
			//if(distancia <= 3 && distancia >= 0)
			if(distancia <= 2 && distancia >= 0)
			{
				return {flag: "distancia", segmento: seg, alfa: alfa, beta: beta};
			}
		}

		return -1;
		
	}
	
	//function para crear los segmentos a partir de los nodos
	function NumSegment(array)
	{
		var numsegmentos = []; //variable para almacenar el numero de segmentos
		var temp; //variable para contar los nodos "i"
		var segmentoini, segmentofin;
		
		//recorrer los nodos
		for(var i in array)
		{
			if(segmentoini == undefined)
			{
				segmentoini = i;
			}			
			else if(segmentofin == undefined)
			{
				segmentofin = i;
			}				
			
			//almacenar segmentos
			if(segmentoini != undefined && segmentofin != undefined)
			{
				numsegmentos.push
				({
					A: segmentoini,
					B: segmentofin
				});
				
				segmentoini = segmentofin;
				segmentofin = undefined;
			}
			
			if(parseInt(node.length - 1) == i)
			{				
				numsegmentos.push
				({
					A: (node.length -1),
					B: 0
				});
			}
			
		}				
		return numsegmentos;
	}
	
	//dibujar el segmento
	function DrawnLine()
	{
		context.beginPath();
		context.moveTo(125,158);
		context.lineTo(250,158);
	
		
		context.moveTo(250,158);		
		context.lineTo(250,100);
		
		context.moveTo(250,100);		
		context.lineTo(125,158);
		
		context.stroke();
		context.closePath();		
		
		for(var i in node)
		{
			context.beginPath();
			context.arc(node[i].cx,node[i].cy,5, 0, Math.PI * 2,true);
			context.fillStyle = "blue";
		    context.fill();
			context.stroke();
			context.closePath();
		}
	}
	
	//Obtener el valor alfa
	function CalculerAlfa(seg)
	{		
		alfa = -((seg.yB - seg.yA) / (seg.xB - seg.xA));
		
		return alfa;
	}
	
	//Obtener el valor beta
	function Beta(seg)
	{		
		beta = -(alfa *  seg.xA)- seg.yA;
		
		return beta;
	}
	
	//Calcular la distancia de un segmento horizontal
	function Horizontale(seg, y)
	{
		var horizontal;
		var coory = parseInt(y);
		
		horizontal = Math.abs(seg.yA - coory);
		
		if(horizontal <= 1 && horizontal >= 0)		
			return horizontal;
			else
				return -1;	
	}
	
	//Calcular la distancia de un segmento vertical
	function Vertical(seg, x)
	{
		var vertical;
		var coorx = parseInt(x);
		vertical =  Math.abs(seg.xA - coorx);				
		
		if(vertical <= 1 && vertical >= 0)		
		return vertical;
		else
			return -1;		
	}

	//intersertion de segments
	this.Itersection = function(nodeselected,status)
	{
		var numseg = NumSegment(node);
		var lastseg = numseg.length - 2;
		var firstnode = 0;
		var dx,dy;		
		var d=-1;
		var xa1,xa2,xa3,xa4;
		var xb1,xb2,xb3,xb4;
		var ya1,ya2,ya3,ya4;
		var yb1,yb2,yb3,yb4;
		
		nodeselected = parseInt(nodeselected);
		
		if(status === false)
		{
			
			if(numseg.length > 3)
			{
				if(nodeselected != 0)
				{
					xa1 = node[numseg[lastseg].A].cx;
					ya1 = node[numseg[lastseg].A].cy;			
					xb2 = node[numseg[lastseg].B].cx;
					yb2 = node[numseg[lastseg].B].cy;
					var nodenumberA =  parseInt(numseg[lastseg].A); 
					var nodenumberB =  parseInt(numseg[lastseg].B);
					
					for(var i in numseg)
					{					
						xa3 = node[numseg[i].A].cx;
						ya3 = node[numseg[i].A].cy;			
						xb4 = node[numseg[i].B].cx;
						yb4 = node[numseg[i].B].cy;						
						
						d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);									
						
						if( d != -1)
						{
							//  ((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
							dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
							//   ((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
							dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																										
							var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);									
							
							//si es diferente de nulo hay una interseccion
							if(resultado != -1)
							{
								if(i != (numseg.length -1))
								{
									if(xb4 != xa1 && yb4 != ya1)
									{
										//if(xa1 != xa3 && ya1 != ya3)
											return { x1:xa1, y1:ya1 , x2:xb2 , y2:yb2 , seginit:lastseg, segfin:i, nA:nodenumberA, nB:nodenumberB};
									}
										
								}													
							}					
						}
					
					}
				}
				else if(nodeselected === 0)
				{
					xa1 = node[numseg[firstnode].A].cx;
					ya1 = node[numseg[firstnode].A].cy;			
					xb2 = node[numseg[firstnode].B].cx;
					yb2 = node[numseg[firstnode].B].cy;
					var nodenumberA =  parseInt(numseg[firstnode].A); 
					var nodenumberB =  parseInt(numseg[firstnode].B);
					
					//invertir el orden de los segmentos
					numseg.reverse();
					
					for(var i in numseg)
					{												
						if(i != 0)
						{

							xa3 = node[numseg[i].A].cx;
							ya3 = node[numseg[i].A].cy;			
							xb4 = node[numseg[i].B].cx;
							yb4 = node[numseg[i].B].cy;						
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);									
							
							if( d != -1)
							{
								//  ((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//   ((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);									
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{
									if(i != (numseg.length -1))
									{
										if(xb2 != xa3 && yb2 != ya3)
										{
											return { x1:xa1, y1:ya1 , x2:xb2 , y2:yb2 , seginit:lastseg, segfin:i, nA:nodenumberA, nB:nodenumberB};
										}
											
									}													
								}					
							}
						}					
					
					}
				}
			}
		}
		else if(status)
		{
			var seg1 ={} , seg2 = {};
			var option;
			var resseg = [];
			
			if(numseg.length > 3)
			{				
				if(nodeselected === 0)
				{
					//segmento 1
					seg1.xA = node.length - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = nodeselected + 1;
				}
				else if(nodeselected === (node.length - 1) )
				{
					//segmento 1
					seg1.xA = nodeselected - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = 0;
				}
				else
				{
					//segmento 1
					seg1.xA = nodeselected - 1;
					seg1.xB = nodeselected;
					//segmento 2
					seg2.xA = nodeselected;
					seg2.xB = nodeselected + 1;
				}														
				
				for(var i in numseg)
				{																			
					if(parseInt(numseg[i].A) === seg1.xA && parseInt(numseg[i].B) == seg1.xB)
					{
						continue;
						//console.log('algo');
						
					}else if(parseInt(numseg[i].A) === seg2.xA && parseInt(numseg[i].B) == seg2.xB)
					{
						continue;
					}
					else
					{	
							//comparar con el segmento 1						
							xa1 = node[seg1.xA].cx;
							ya1 = node[seg1.xA].cy;			
							xb2 = node[seg1.xB].cx;
							yb2 = node[seg1.xB].cy;
							
							xa3 = node[numseg[i].A].cx;
							ya3 = node[numseg[i].A].cy;			
							xb4 = node[numseg[i].B].cx;
							yb4 = node[numseg[i].B].cy;
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);												
							
							
							if(d != -1)
							{
								//((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{									
										if(xa1 != xb4 && ya1 != yb4)
										{											
											resseg.push
											(
												{
													x1:xa1,												
													y1:ya1 , 
													x2:xb2 , 
													y2:yb2
												}
											);
										}																							
								}				
							}							
							
							//comparar con el segmento 2							
							xa1 = node[seg2.xA].cx;
							ya1 = node[seg2.xA].cy;			
							xb2 = node[seg2.xB].cx;
							yb2 = node[seg2.xB].cy;
							
							d = distance(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4);												
							
							if(d != -1)
							{
								//((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
								dx = ((xa3-xb4)*(xa1*yb2-ya1*xb2)-(xa1-xb2)*(xa3*yb4-ya3*xb4))/d;
								//((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
								dy = ((ya3-yb4)*(xa1*yb2-ya1*xb2)-(ya1-yb2)*(xa3*yb4-ya3*xb4))/d; 
																																											
								var resultado = ResultadoSegmento(xa1,ya1,xb2,yb2,xa3,ya3,xb4,yb4 , dx , dy);
								
								//si es diferente de -1 hay una interseccion
								if(resultado != -1)
								{
										if(xa1 != xb4 && ya1 != yb4)
										{											
											resseg.push
											(
												{
													x1:xa1,												
													y1:ya1 , 
													x2:xb2 , 
													y2:yb2
												}
											);
										}																							
								}				
							}							
						
						if(resseg.length > 1)
						{
							return resseg;
						}						
					}
				}				
			}						
		}
			
			return -1;
	};	
	
	function distance(x1,y1, x2,y2, x3,y3, x4,y4)
	{
		// (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
		var d = ((x1-x2)*(y3-y4)) - ((y1-y2)*(x3-x4));
		
		if (d == 0)
		{
		 return -1;
		} 			 
		else
		{
		 return d; 
		} 	
	}
	
	function ResultadoSegmento(x1,y1,x2,y2,x3,y3,x4,y4 , x , y)
	{
		//valida que los segmentos no sean verticales
		if (y < Math.min(y1,y2) || y > Math.max(y1,y2)) return -1;
		if (y < Math.min(y3,y4) || y > Math.max(y3,y4)) return -1;
		
		//valida que los segmentos no sean paralelos
		if (x < Math.min(x1,x2) || x > Math.max(x1,x2)) return -1;
		if (x < Math.min(x3,x4) || x > Math.max(x3,x4)) return -1;
		
		return 2;
	}
};

console.log('=============== >  Segment.js ');

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
 * A few geometric functions necessary to deal with the poles and the shtitling. 
 * These functions make use of the Coo class defined with the AladinLite core 
 * (http://aladin.u-strasbg.fr/AladinLite/)
 * 
 * Author:  laurent.michel@astro.unistra.fr
 */

var BasicGeometry = function () {
    /**
     * Nodes are 2 arrays with 2 elements
     * Returns a distance ranging from 0 to 180deg
     */
    function distanceBetweenNodes(node1, node2){
    	var coo1 = new Coo(node1[0], node1[1]);
    	var coo2 = new Coo(node2[0], node2[1]);
    	return coo1.distance(coo2)
    }
    /**
     * Return the geometric definition of the view enclosing the skyPositions polygon
     * skyPositions: Array of points: [[ra,dec], ...]
     * return : {center: {ra: .., dec: ..}, size: ..} size is in deg
     */
    function getEnclosingView(skyPositions) {
		var maxSize=0;
		var coo = new Coo();
		var raMin=360;
		var raMax=0;
		var decMin=+90
		var decMax=-90;
		var posNode1;
		var posNode2;
		var ra1,ra2;
		var dec1,dec2;
		/*
		 * Take the the biggest distance between 2 vertices as polygon size
		 * 
		 */
		for( var node1=0 ; node1<skyPositions.length ; node1++) {
			 posNode1 = skyPositions[node1];
			ra1 = posNode1[0];
			dec1 = posNode1[1];
			if( ra1 > raMax) raMax = ra1;
			if( ra1 < raMin) raMin = ra1;
			if( dec1 > decMax) decMax = dec1;
			if( dec1 < decMin) decMin = dec1;

			for( var node2=skyPositions.length/2 ; node2<skyPositions.length ; node2++) {
				posNode2 = skyPositions[Math.floor(node2)];
				ra2 = posNode2[0];
				dec2 = posNode2[1];
				var d;
				if( maxSize < ( d = BasicGeometry.distanceBetweenNodes(posNode1, posNode2))){
					maxSize = d;
				}
			}
		}
		/*
		 * Transform the polygon a an array of Coo instance
		 * This will made the further computation easier
		 */
		var vertices = [];
		for( var node1=0 ; node1<(skyPositions.length - 1) ; node1++) {
			posNode1 = skyPositions[node1];
			vertices.push(new Coo(posNode1[0], posNode1[1]));
		}
		/*
		 * Compute the average position as rough view center 
		 */
		var sumX=0 , sumY=0, sumZ=0;
		/*
		 * Compute first the average of the Euclidian coordinates
		 */
		for( var node1=0 ; node1<vertices.length  ; node1++) {
			var vertex = vertices[node1];
			sumX += vertex.x;
			sumY += vertex.y;
			sumZ += vertex.z;
		}
		sumX = sumX/vertices.length;
		sumY = sumY/vertices.length;
		sumZ = sumZ/vertices.length;
		/*
		 * The normalize to R=1 
		 */
		var ratio = 1/Math.sqrt(sumX*sumX + sumY*sumY +sumZ*sumZ);
		sumX *= ratio;
		sumY *= ratio;
		sumZ *= ratio;
		/*
		 * Convert Euclidian to sky coords 
		 */
		var coo = new Coo();
		coo.x = sumX;
		coo.y = sumY;
		coo.z = sumZ;
		coo.computeLonLat();
		/*
		 * Adjust the view to make sure that all vertices are visible 
		 */
		var deltaRA = 0;
		var deltaDEC = 0;
		for( var node1=0 ; node1<vertices.length  ; node1++) {
			var vertex = vertices[node1];

			var left = [coo.lon  - maxSize/2, vertex.lat];
			if( left[0] < 0 ) left[0]  = 360 + left[0];
			if( left[0] > 360) left[0] = left[0] -360;
			
			var right = [coo.lon  + maxSize/2, vertex.lat]
			if( right[0] < 0 ) right[0]  = 360 + right[0];
			if( right[0] > 360) right[0] = right[0] -360;
			
			var rightDistance = BasicGeometry.distanceBetweenNodes(right, [vertex.lon, vertex.lat])
			if( maxSize  < rightDistance) {
				deltaRA =rightDistance - maxSize;
			}
			var leftDistance = BasicGeometry.distanceBetweenNodes(left, [vertex.lon, vertex.lat])
			if( maxSize  < leftDistance) {
				deltaRA =leftDistance - maxSize;
			}

			
			var top = [vertex.lon, coo.lat  + maxSize/2];
			if( top[1] > 90 ) top[1]  = 180  - top[1];
			
			var bottom = [vertex.lon, coo.lat  - maxSize/2];
			if( bottom[1] < -90 ) bottom[1]  = -180 + bottom[1];
			
			if( vertex.lat < bottom[1] ){
				deltaDEC = bottom[1] -  vertex.lat;
			} else if( vertex.lat > top[1] ){
				deltaDEC = vertex.lat - top[1];
			}			
		}
    	return {center: {ra: (coo.lon - deltaRA), dec: (coo.lat - deltaDEC)}, size: maxSize};
    }
    
	var pblc = {};
	pblc.distanceBetweenNodes = distanceBetweenNodes;
	pblc.getEnclosingView = getEnclosingView;
	return pblc;
}();

console.log('=============== >  AstroCoo.js ');

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

var LibraryMap = function(){
	this.colorMap = {};
	this.colorMap["Simbad"] = {color:"#d66199", catalog:"Simbad", dot:""};
	this.colorMap["NED"]    = {color:"orange", catalog:"NED", dot:""};
	
	this.colorMap["green_apple"] = {color:"#00ff02", catalog:"", dot:""};
	this.colorMap["purple"] = {color:"#7f00d4", catalog:"", dot:""};
	this.colorMap["salmon"] = {color:"#ff9966", catalog:"", dot:""};
	this.colorMap["dark_bleu"] = {color:"#0034f1", catalog:"", dot:""}; 
	this.colorMap["red_apple"] = {color:"#ff0000", catalog:"", dot:""}; 
	this.colorMap["sky_bleu"] = {color:"#03fffc", catalog:"", dot:""}; 
	this.colorMap["brown"] = {color:"#975200", catalog:"", dot:""}; 
	this.colorMap["yellow"] = {color:"#faff00", catalog:"", dot:""}; 
	this.colorMap["argent"] = {color:"#f3f3f3", catalog:"", dot:""}; 
 
 
}

LibraryMap.prototype = {

		getNextFreeColor: function(catalog){
			
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == "") {
					this.colorMap[key].catalog = catalog;
					return this.colorMap[key];
				}
			}	

			return null;
		},
		
		
		freeColor: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					this.colorMap[key].catalog = "";
				}
			}	
			
		},
		
		getColorByCatalog: function(catalog){
			for(var key in this.colorMap) {
				if( this.colorMap[key].catalog == catalog) {
					return this.colorMap[key];
					break;
				}

			}	
		},
	
		/*
		 * help history to rebuild the table colorMap
		 */
		setCatalogByColor: function(tab){  //tab={catalog, color}
			for(var key in this.colorMap) {
				if( this.colorMap[key].color == tab.color) {
					this.colorMap[key].catalog = tab.catalog;
				}
			}
			
		}
		
}
console.log('=============== >  LibraryMap.js ');

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


var LibraryCatalogItem = function(params){
	  /**
	   * params JSON like {url, name,color, shape,fade; al_ref}
	   */
		    this.id = params.id;
			this.url = params.url;
			this.name = params.name;
			this.nameTemp = params.nameTemp;
			this.color = params.color;
			this.shape = params.shape;
			this.size = params.size;
			this.obs_id = params.obs_id;
			/**
			 * O = black 1= full color
			 */
			this.fade = params.fade;
			/**
			 * reference to the AL object
			 */
			this.al_refs =  params.al_refs;
	};

var LibraryCatalog  = function() {
	    /**
	     * Map name->LibraryCatalogItem
	     */
		var catalogs = [];
		/**
		 * make sure to never reuse the catalog ID, always take a larger one
		 */
		var max = 0;
		function getUniqueID(){
			
			for( var name in catalogs){
				if( catalogs[name].id > max){
					max = catalogs[name].id;
				}
		}
		return max +1;
		}
		/**
		 * params JSON like {url, name,color, shape,fade; al_ref}
		 */
		function addCatalog(params){
			catalogs[params.name] = new LibraryCatalogItem(params);
			catalogs[params.name].id = getUniqueID();
			console.log("#####id>"+catalogs[params.name].id+"<catalog>"+params.name+"<saved successfully");
			for(var name in catalogs){
				console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name+">>>>name temporary:"+catalogs[name].nameTemp);
			}
		};
		
		function getCatalog(name){
			if ( catalogs[name] == undefined )
				console.log("catalogue >"+ name + "< not found");
			return catalogs[name];
		};
		function delCatalog(name){
			delete catalogs[name];
			console.log("catalog>"+name+"<deleted successfully")
			for(var name in catalogs){
				console.log("library>>>>>>>>>"+catalogs[name].id+":"+catalogs[name].name);
			}
			
		};
		
		function updCatalog(params){
			var name = params.name;
			if(params.url)catalogs[name].url = params.url ;
			if(params.color)catalogs[name].color=params.color;
			if(params.shape)catalogs[name].shape=params.shape;
			if(params.size)catalogs[name].size=params.size;
			if(params.fade)catalogs[name].fade=params.fade;
			if(params.al_refs)catalogs[name].al_refs=params.al_refs;
			if(params.obs_id)catalogs[name].obs_id=params.obs_id;
			if(params.nameTemp)catalogs[name].nameTemp=params.nameTemp;
			console.log("#####"+params.name+" updated successfully");
			if(params.name == "Swarm"){
				SwarmDynamicFilter.runConstraint();
			}
			//cata.
		};
	/*	function updCatalog(params){
			var name = params.name;
			var c = catalogs[name];
			if(params.url)setAttribut(name,"url",params.url);
			if(params.color)setAttribut(name,"color",params.color);
			if(params.shape)setAttribut(name,"shape",params.shape);
			if(params.size)setAttribut(name,"size",params.size);
			if(params.fade)setAttribut(name,"fade",params.fade);
			if(params.al_refs)setAttribut(name,"al_refs",params.al_refs);
			if(params.obs_id)setAttribut(name,"obs_id",params.obs_id);
			console.log("#####"+params.name+" updated successfully");
			catalogs[name] =c;
			//cata.
		};
		function setAttribut(name,type,value){
			var c = catalogs[name];
			c.type = value;
			catalogs[name] =c;
			console.log("#####"+name+" "+type+" updated successfully");
		}
		
		*/
	/*	function updCatalog(params){
			var name = params.name;
			if(params.url)setUrl(name,params.url);
			if(params.color)setColor(name,params.color);
			if(params.shape)setShape(name,params.shape);
			if(params.size)setSize(name,params.size);
			if(params.fade)setFade(name,params.fade);
			if(params.al_refs)setObsid(name,params.al_refs);
			if(params.obs_id)setRef(name,params.obs_id);
			console.log("#####"+params.name+" updated successfully");
			
			//cata.
		};
		function setUrl(name,url){
			var c = catalogs[name];
			c.url=url;
			console.log("#####"+name+"url updated successfully");
		}
		function setColor(name,color){
			//var c = catalogs[name];
			catalogs[name].color=color;
			console.log("#####"+name+"color updated successfully");
		}
		function setShape(name,shape){
			var c = catalogs[name];
			c.shape=shape;
			console.log("#####"+name+"name updated successfully");
		}
		function setSize(name,size){
			var c = catalogs[name];
			c.size=size;
			console.log("#####"+name+"size updated successfully");
		}
		function setFade(name,fade){
			var c = catalogs[name];
			c.fade=fade;
			console.log("#####"+name+"fade updated successfully");
		}
        function setObsid(name,obs_id){
        	var c = catalogs[name];
        	c.obs_id=obs_id;
        	console.log("#####"+name+"obsid updated successfully");
		}
		function setRef(name,ref){
			var c = catalogs[name];
			catalogs[name].al_refs=ref;
			console.log("#####"+name+"reference updated successfully");
		}*/

		var pblc = {}
		pblc.catalogs = catalogs;
		pblc.addCatalog = addCatalog;
		pblc.getCatalog = getCatalog;
		pblc.delCatalog = delCatalog;
		pblc.updCatalog = updCatalog;
		//pblc.setAttribut = setAttribut;
		return pblc;

} ();

console.log('=============== >  LibraryCatalog.js ');

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
//"use strict"

var MasterResource = function(resource){
if(resource){
	this.actions = resource.actions;
	this.affichage = resource.affichage;
	this.parseLocation(resource.affichage);
	this.tab = [];
	//this.actions = resource.actions;
	// If filtered, the FOV area is not limited
	this.filtered = (resource.filtered == undefined || resource.filtered != true)? false: true;
}
}

MasterResource.prototype = {
		
		parseLocation: function(affichage){
			var location = affichage.location ;
			if( location&&location.url_base  ){
				this.url = location.url_base
			}else if(location&&location.service){
				if( location.url_query){
					var tmpq = location.query.replace(/\{\$ra\}/g,'@@ra@@')
					.replace(/\{\$dec\}/g,'@@dec@@')
					.replace(/\{\$fov\}/g,'@@fov@@')
					.replace(/\{\$format\}/g,'@@format@@');
					this.url = location.service +  encodeURI(tmpq).replace(/@@ra@@/g,'{$ra}')
					.replace(/@@dec@@/g,'{$dec}')
					.replace(/@@fov@@/g,'{$fov}')
					.replace(/@@format@@/g,'{$format}');
				}
				
			} else {
				alert("master resource malformed");
				this.url = null;
			}
			
		},
		setParamsInUrl: function(aladinLiteView){
			var self = this;
			var times = null;
			var url;
			var fov;
			if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcmin'){
				times = 60;
			}else if(aladinLiteView.masterResource.affichage.radiusUnit == 'arcsec'){
				times = 3600;
			}else{
				times = 1;
			}
			if(!this.filtered && aladinLiteView.fov>1){
				fov = 1;
				WaitingPanel.warnFov();
			}else{
				fov = aladinLiteView.fov
			}
			var size = parseInt(1000*fov*times)/1000 + 1
			var hloan = aladinLiteView.ra/15.0;
			var strlon = Numbers.toSexagesimal(hloan, 8, false);
			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);
			var affichage = aladinLiteView.masterResource.affichage;
			var location = affichage.location;
			console.log(aladinLiteView.fov + " size = "  + size + " " + strlon + " " + strlat);
			//size = 1;
			size = fov*times;
			//if {$query} exists in the base url, replace it with the url_query, if not, replace only fov ra dec format. 
			var base = location.url_base;
			if(base.includes('{$query}')){
				var query = location.url_query;
				var progressiveLimit = "";
				if(affichage.progressiveMode == true &&  affichage.progressiveLimit != undefined){
					progressiveLimit = affichage.location.url_limit;
					query = query.replace('WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)}','');
				}
				query = query.replace(/\{\$limitQuery\}/g,progressiveLimit);
				query = query.replace(/\{\$ra\}/g,'($ra)');
				query = query.replace(/\{\$dec\}/g,'($dec)');
				query = query.replace(/\{\$fov\}/g,'($fov)');
				var queryEncoded = encodeURI(query);
				url = base.replace(/\{\$query\}/g,queryEncoded);
				url = url.replace(/\{\$format\}/g,affichage.format);
				url = url.replace(/\(\$ra\)/g,'%22'+aladinLiteView.ra);
				url = url.replace(/\(\$dec\)/g,aladinLiteView.dec+'%22');
				url = url.replace(/\(\$fov\)/g,size);
				console.log("######queryMode for XMM sources");
				console.log("######queryEncoded>"+queryEncoded);
			}else{
				url = this.url.replace(/\{\$ra\}/g,aladinLiteView.ra);
				url = url.replace(/\{\$dec\}/g,aladinLiteView.dec);
				url = url.replace(/\{\$fov\}/g,size);
				url = url.replace(/\{\$format\}/g,affichage.format);
			}
			console.log(url);
			return url;
		},
		
		cleanTab: function(){
			this.tab=[];
		}

}
console.log('=============== >  MasterResource.js ');

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
	//	console.log("!!!!!!getHTMLTitle run"+this);
		return '<div  title="replay the stored view" id="' + this.id + '" style="height:auto;"><img id="' + this.id + '_snapShot_img" src="' 
			+ this.img
			//+ '" onclick="AladinLiteX_mVc.restoreViewByIdTest(&quot;' + this.id + '&quot;);" '
			+ '" onclick="AladinLiteX_mVc.restoreViewById(&quot;' + this.id + '&quot;);" '
			+ 'style= "height: 18px;width: 18px;">&nbsp;&nbsp;&nbsp;</img>'
			+'<a title="download the snapshot" href="'+this.img+'" download ="ALIX snapshot ' + this.id + '"><i class="glyphicon glyphicon-download-alt" style="vertical-align: top;color:black" ></i>   </a>'
			+'<i id="' + this.id + '_link"  style="vertical-align: top;font-weight:800;">'  //stoker le id dans la div
			+ this.name 
			+ ' | '
			+ this.survey.ID
			+ '</i>&nbsp;'
			+ this.regionIcon()
			+ '&nbsp;'
			+ this.targetIcon()
			+ '<button id="' + this.id + '_menu" type="edit list" title="menu" class="alix_btn alix_btn-color-his alix_btn-edit"><i class="glyphicon glyphicon-record" style="font-size:19px;position:relative;top:-4px;"></i></button>'
			+ '<button id="' + this.id +'_menu_close_img" title="delete" class="alix_btn alix_btn-color-his alix_btn-in-edit" ' 
			+ 'onclick="AladinLiteX_mVc.deleteHistory(&quot;' + this.id + '&quot;);"><i class="glyphicon glyphicon-remove-sign" style="font-size:15px;"></i></button>'
			+ '<button id="' + this.id +'_menu_commit" title="remark" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-35px;" ><i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i></button>'
			+ '<button id="' + this.id +'_menu_show_description" title="description" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-57px;"><i class="glyphicon glyphicon-info-sign" style="font-size:15px;"></i></button>'
			+ '<textarea id="' + this.id +'_menu_commit_text" class="alix_text-commit" style="display:none;"></textarea>'
			+ '<button id="' + this.id +'_menu_commit_text_confirm" class="alix_btn alix_btn-text-ok alix_btn-color-ok" style="display:none;"><i class="glyphicon glyphicon-ok" style="font-size:11px;"></i></button>'
			+ '<button id="' + this.id +'_menu_commit_text_delete" class="alix_btn alix_btn-text-remove alix_btn-color-remove" style="display:none;"><i class="glyphicon glyphicon-remove" style="font-size:11px;"></i></button>'
			+ '<div id="' + this.id +'_menu_commit_text_display" class="alix_menu_commit_text_display" style="">'+ this.displayComment() +'</div></div>';
	},
	
	regionIcon: function(){
		if( this.region == null){
			return "";
		} else {
			return '<i  title="bookmark with region" class="glyphicon glyphicon-registration-mark" style="font-size:18;vertical-align: top;"></i>';
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
		console.log("setHandlers run");
		var self = this;
		var statue = false;
		/*
		 * operation on image
		 */
		$("#" + this.id+ "_snapShot_img").mouseover(function(event){
			$("#" + this.id).css("width", "100px");
			$("#" + this.id).css("height", "100px");
			$("#"+$(this).attr('id').replace("_snapShot_img","")).css("height", "auto");
		});
		$("#"+this.id+ "_snapShot_img").mouseout(function(event){
			$("#" + this.id).css("width", "18px");
			$("#" + this.id).css("height", "18px");
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
				
				$("#" + $(this).attr('id').replace("_menu", "")).css("height", "55px");
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
				$("#" + $(this).attr('id').replace("_menu", "")).css("height", "auto");
				statue = false;
			}
		});
		
		/*
		 * fonction of son buttons
		 */
		/*var hide = this.id;
		
		$("body").click(function(event){
			console.log("test");
			$("#"+hide+"_menu_commit_text").css("display", "none");
			$("#"+hide+"_commit_confirm").css("display", "none");
			$("#"+hide+"_commit_delete").css("display", "none");
		});*/
		
		$("#"+this.id+ "_menu_commit").click(function(event){
			$("#"+this.id+"_text").val(self.comment);
			$("#"+this.id+"_text").css("display", "inline");
			$("#"+this.id+"_text_confirm").css("display", "inline");
			
			$("#"+this.id+"_text_delete").css("display", "inline");
			console.log(self.comment);
			//$("#"+this.id+"_text").html(self.comment);
		});
		
		$("#"+this.id+ "_menu_commit_text").click(function(event){
			$("#"+this.id+"_confirm").css("display", "inline");
			$("#"+this.id+"_delete").css("display", "inline");
		});
		$("#"+this.id+ "_menu_commit_text_delete").click(function(event){
			$(this).css("display", "none");
			$("#"+$(this).attr('id').replace("_delete","_confirm")).css("display", "none");
			$("#"+$(this).attr('id').replace("_delete","")).css("display", "none");
			
		});
		$("#"+this.id+ "_menu_commit_text_confirm").click(function(event){
			$(this).css("display", "none");
			$("#"+$(this).attr('id').replace("_confirm","_delete")).css("display", "none");
			$("#"+$(this).attr('id').replace("_confirm","")).css("display", "none");
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




console.log('=============== >  AladinLiteView.js ');

/**
f * @preserve LICENSE
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
//"use strict"
//require('../javascript/AladinLiteView.js');
//var t = require('../javascript/AladinLiteView.js');
//var CircularJSON = import 'circular-json';

var getSexadecimalString = function(ra, dec){
	var strlon = Numbers.toSexagesimal(ra/15, 8, false);
    var strlat = Numbers.toSexagesimal(dec, 7, false);
    return strlon + " " + strlat;
}


var WaitingPanel = function(){
	var callers = {};

	var show = function(label){
		console.log("SHOW " + label);
		$("#fetchingMessage").html("Fetching data from " + label);
		$("#waiting_interface").css("display","inline");
		callers[label] = true;
	}
	var hide = function(label){
		console.log("HIDE " + label);

		delete callers[label];
		for( var c in callers){
			$("#fetchingMessage").html("Fetching data from " + c);
			return;
		}
		$("#waiting_interface").css("display","none");
	}
	var warnFov = function() {
		console.error("warnFov");

		var alert = $("#alert");
		alert.html('<div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div>'
		         + '<div class="alix_alert_fov_msg">Search radius limited to 1&deg;</div>');
		$("#alert").fadeIn(100);
		setTimeout("$('#alert').fadeOut('slow')",1300);
	}
	var warnNbSources = function() {
		WaitingPanel.warn("Number of displayed sources limited to 999");
	}
	var warn = function(message) {
		console.log("warn " + message)
		var alert = $("#alert");
		alert.html('<div class="alix_alert_fov_msg">' + message + '</div>');
		$("#alert").fadeIn(100);
		setTimeout("$('#alert').fadeOut('slow')",1300);
	}

	var retour = {
			show: show,
			hide: hide,
			warnNbSources: warnNbSources,
			warnFov: warnFov,
			warn: warn
	};
	return retour;

}();

var AladinLiteX_mVc = function(){
	var that = this;
	var controllers ;
	var controller;
	var defaultSurvey ;
	var defaultFov ;
	var defaultPosition;
	var aladin;
	var aladinDivId;
	var parentDiv;
	var parentDivId;
	var menuDiv;
	var menuDivId;
	var targetDiv;
	var targetDivId;
	var contextDiv;
	var contextDivId;
	var selectDiv;
	var selectDivId;
	var maskDiv	;
	var selectHipsDiv;
	var catalogeDiv;
	var selectCataBtn ;
	var vizierDiv;
	var maskId = "AladinHipsImagesExplorer_mask";
	var selectHipsDivId = "status-select";
	var catalogeId = "Aladin-Cataloge";
	var selectCataBtnId = "detail-cata";
	var vizierDivId = "vizier";
	var aladinLiteView = new AladinLiteView();
	var XMMcata = null;
	var sourceSelected;
	
	/**
	 * var params = {
	    parentDivId: "aladin-lite-div",
	    defaultView: {
	        defaultSurvey: "P/DSS2/color",
	        position: "",
	        defaultFov: "30"
	    },
	    controllers: {
	      historic: {
	      },
	      regionEdit:{
	      },
	      hipsSelector: {
	      }
	      catalogSelector: {
	      }
	  	}
	   }
	*/
	var init = function(params){
		/*
		 * Set ids for sub panels
		 */
		parentDivId = params.parentDivId;
		aladinDivId = params.parentDivId + "-main";
		menuDivId   = params.parentDivId + "-menu";
		contextDivId = params.parentDivId + "-context";
		targetDivId  = params.parentDivId + "-target";
		selectDivId  = params.parentDivId + "-select";
		//showAssociated = params.actions.showAssociated;
		var showAssociated = params.showAssociated;
		//showPanel = params.actions.showPanel;
		var showPanel = params.showPanel;
		
		if(params.masterResource != undefined){
			aladinLiteView.masterResource = new MasterResource(params.masterResource);
		}else{
			aladinLiteView.masterResource = null;
		}

		/*
		 * Test if historic model is required, if yes make an instance and give it to the controller
		 * draw the tool
		 */
		
		if(params.controllers.historic != undefined){
			params.controllers.historic.model = new Historique_Mvc(contextDivId, this);
		}
		if(params.controllers.regionEditor != undefined || (params.defaultView != undefined && params.defaultView.region != undefined)){
			params.controllers.regionEditor.view = new RegionEditor_mVc(this
					, parentDivId
					, contextDivId
					, function(data){ if( data.userAction ){ AladinLiteX_mVc.storePolygon(data.region) ;alert(JSON.stringify(data));}}
					//, aladinLiteView.points
					, params.defaultView.defaultRegion); 
		}
		if(params.controllers.hipsSelector != undefined){
			params.controllers.hipsSelector.model = new HipsSelector_Mvc(parentDivId, this);
		}
		controllers = params.controllers;
		controller = new AladinLite_mvC(that, params.controllers);		
		draw(params.defaultView,params.controllers,params.masterResource);
		
	}

	var fadeOutAuto = function(){
		$("#minus").trigger("click");
		//Once a source is selected, all other sources fade out automatically. 
		}
	  // maximize control
	var deleteSourceAuto = function(){
		//When we click the part without source, we deselect the source selected automatically. 
		if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.showAssociated.handlerDeleteSource == true){
		//The function can be configured chosen or not in the configuration.
			cleanCatalog("oid");
			for(var i=0;i<5;i++){
		    $("#plus").trigger("click");
		    }
		    closeContext();
		}
		if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.externalProcessing.handlerDeselect){
			aladinLiteView.masterResource.actions.externalProcessing.handlerDeselect();
			   // $(".CatalogMerged").css("display","none");
		}
		aladinLiteView.sourceSelected.x = null;
		aladinLiteView.sourceSelected.y = null;
    	$("#XMM").attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp_selected");//to make the master resource can be reloaded

	}
	var deselectSource = function(){
		deleteSourceAuto();//delete related source and fade in 
		if(sourceSelected){
			sourceSelected.deselectAll();//make cds.source deselect the source
		}
	}
	var showDetailByID = function(){
		checkBrowseSaved();
		var selectHipsDiv_val=selectHipsDiv.val();
		showDetail(selectHipsDiv_val);
	}
	var draw = function(defaultView, controllers, masterResource) {
		/*
		 * Draw sub panels
		 */
		var XMM;
		if(masterResource != undefined){
			XMM=masterResource.affichage.label;
		}else{
			XMM="";
		}
		var ACDS;
		if(masterResource != undefined&& masterResource.actions.showAssociated){
			ACDS=masterResource.actions.showAssociated.label;
		}else{
			ACDS="";
		}
		parentDiv = $('#' + parentDivId);
		parentDiv.html('<div id="' + aladinDivId + '" class="alix_aladin_div"></div>');
		parentDiv.append('<div id="' + menuDivId + '" class="alix_menu_panel">'
				+'<input id="' + targetDivId + '" placeholder="target" class="alix_target  alix_menu_item" ><span id="search" title="search" class="alix_search alix_menu_item glyphicon glyphicon-search" onclick="AladinLiteX_mVc.searchPosition();"></span>'
				+'<select  id ="' + selectDivId + '" class="alix_menu_item alix_select">'
				+'<option value="'+defaultView.field.position+'">'+defaultView.field.position+'</option>'
			//	+'<option value="ICRS">ICRS</option>'
			//	+'<option value="Galactic">Galactic</option>
				+'</select>'
				+'<div id="menuDiv"><button id="menu" type="menu" title="open menu" class=" alix_btn_open alix_btn alix_btn-color-menu alix_menu_item " ><i id="icon_open" class="glyphicon glyphicon-list" style="font-size:18px;"></i></button>'
				+'<i id="credit" title="copyright-mark" class="alix_credit alix_menu_item glyphicon glyphicon-copyright-mark"></i>'
				+'<button id="center" type="center" title="center" class="alix_btn alix_btn-circle alix_btn-primary alix_menu_item alix_button_center" onclick="AladinLiteX_mVc.returnCenter();"><i class="glyphicon glyphicon-screenshot" style="font-size:15px;"></i></button>'
			    +'<button id="bookMark" type="bookMark" title="bookMark" class="alix_btn alix_btn-circle alix_btn-danger alix_menu_item alix_button_bookMark" onclick="AladinLiteX_mVc.bookMark();"><i class="glyphicon glyphicon-heart" style="font-size:15px;"></i></button>'
			    +'<button id="history" type="history" title="history" class="alix_btn alix_btn-circle alix_btn-green alix_menu_item alix_button_history alix_unselected" onclick="AladinLiteX_mVc.getHistory();"><i class="glyphicon glyphicon-book" style="font-size:15px;"></i></button>'
			    +'<button id="region"  type="region" title="edit region" class="alix_btn alix_btn-circle alix_btn-warning alix_menu_item alix_button_region alix_unselected" onclick="AladinLiteX_mVc.regionEditor();"><i class="glyphicon glyphicon-edit" style="font-size:15px;"></i></button></div>'
			    +'<form method = "post" onsubmit="return false;"><fieldset class="alix_image_panel alix_menu_item alix_fieldset">'
			    +'<legend class="alix_titlle_image alix_menu_item">Image'
			    +'<i id="color_map" title = "color map" style="cursor: pointer; opacity: .3;font-size: 14px; margin:8px"class="alix_menu_item glyphicon glyphicon-sunglasses" onclick = "AladinLiteX_mVc.showColorMap()"></i>'
			  //  +'<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: 150px; height: 50px; color: black;"><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>'
			    //+'<select id="color_map_select" class ="alix_selector_cm alix_menu_item"></select>'
			    +'</legend>'
			    //+'<div id = "color_map_box" style = "z-index: 20;position: absolute; width: 150px; height: 50px; color: black;">testetetetet</div>'
			    +'<input type="text" id="'+ maskId + '"  placeholder="Survey" size=11 class="alix_menu_item alix_img_explorer"></input>'
			    +'<select id="status-select" class ="alix_selector_hips alix_menu_item"></select>'
			    +'<button id="detail"  type="detail" class="alix_menu_item alix_button_detail" onclick="AladinLiteX_mVc.showDetailByID();">Detail</button></fieldset></form>'
			    +'<form method = "post" onsubmit="return false;"><fieldset class="alix_catalog_panel alix_menu_item alix_fieldset" >'
			    +'<legend class="alix_titlle_catalog alix_menu_item">Catalogs'
			    +'<div id="minus" style="cursor: pointer;" class="alix_minus  alix_menu_item" title = "Fade out">-</div>'
				+'<i id="fade" title = "fade" class="alix_menu_item glyphicon glyphicon-lamp"></i>'
			    +'<div id="plus" style="cursor: pointer;" class=" alix_plus  alix_menu_item" title = "Fade in">+</div>'
				+'</legend>' 
			    +'<div><p id="XMM" title="Show/hide master sources" class="alix_XMM_in_menu alix_menu_item alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayDataXml();">'+ XMM +'</p>'
			    + descriptionXMM()
			    + configurationXMM()
			    + hideXMMFlash()
			    //XMM sources can be configured in the configuration which decide if the buttons of '3XMM catalog' exists or not. 
			    +'</div>'
			    +'<div><p id="ACDS" class = "alix_acds" >'+ACDS+'  </p>'
			    +'<div style = ""><p id="Simbad" title="Show/hide Simbad sources" class="alix_simbad_in_menu alix_menu_item alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displaySimbadCatalog();">Simbad</p>'
			    +'<i id="btn-Simbad-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'Simbad\',this.style.color)"></i>'
			    +'<i id="btn-Simbad-flash" title = "flash" class=" alix_menu_item glyphicon glyphicon-flash"style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.SimbadFlash();"></i>'
			    +'<p id="NED" title="Show/hide Ned sources" class="alix_ned_in_menu alix_menu_item alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayNedCatalog();">NED</p>'
			    +'<i id="btn-NED-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"></i>'
			    +'<i id="btn-NED-flash" title = "flash" class=" alix_menu_item glyphicon glyphicon-flash" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.NEDFlash();"></i></div>'
			    //+'<p class="alix_target_selecte alix_unselected" style="display:none;">S&eacute;lections</p>'
			    //+'<i id="fal" title="flash" class="glyphicon glyphicon-flash alix_select_flash" style="cursor: pointer;display:none;"></i>'
			    //+'<i id="del" title="delete" class="glyphicon glyphicon-trash alix_select_trash" style="cursor: pointer;display:none;"></i><br></div<'
			    +'<div><input type="text" id="'+ catalogeId + '"  placeholder="Find other Catalog" size=11 class="alix_menu_item alix_cataloge_explorer "></input>'
			    +'<select id="select_vizier" class="alix_selector_vizier alix_menu_item"></select>'
			    +'<div id="vizier" class="alix_vizier">'
			    +'<ul id="vizier_list"></ul></div></fieldset></form></div>'
			    +'</div>')
		parentDiv.append('<div id="open_all" class="alix_open_all glyphicon glyphicon-chevron-right"></div>');	 
		
		menuDiv   = $('#' + menuDivId);
		parentDiv.append('<div id="' + contextDivId + '" class="alix_context_panel" >'
				+'<b class="alix_context" style="display: none;"> context </b></div>');
		parentDiv.append('<div id="waiting_interface" class="alix_waiting_interface" style="display:none;">'
				+'<div class="alix_grey_bg"></div>'
				+'<div class="alix_fetching_data">'
				+'<div class="alix_fetching_img"></div>'
				+'<div id="fetchingMessage" class="alix_fetching_message">fetching data...</div></div></div>');
		parentDiv.append('<div id="alert" class="alix_alert_fov" style="display:none;">'
				+'<div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div>'
				+'<div class="alix_alert_fov_msg">Search radius limited to 1&deg;</div>'
				+'</div>');
		parentDiv.append('<div class="alix_tester" id="tester"><ul></ul></div>');
		
	
		contextDiv  = $('#' + contextDivId);
		targetDiv   = $('#' + targetDivId);
		selectDiv   = $('#' + selectDivId);
	    maskDiv		= $('#' + maskId);
		selectHipsDiv=$('#' + selectHipsDivId);
		catalogeDiv = $('#' + catalogeId);
		selectCataBtn = $('#' + selectCataBtnId);
		vizierDiv = $('#' + vizierDivId);
		parentDiv = $("#" + aladinDivId);

		
		setReferenceView(defaultView);
		storeCurrentState();
		

		aladin.on('positionChanged', function(newPosition){
			if(newPosition.dragging==false){
				storeCurrentState();
				targetDiv.val(newPosition.ra.toFixed(4) + "," + newPosition.dec.toFixed(4));
				if(aladinLiteView.masterResource != undefined){
					controller.updateCatalogs(aladinLiteView,'position');
				}
			}
		});

		aladin.on('zoomChanged', function(newFoV) {
			var fovValue = aladinLiteView.fov;
			storeCurrentState();
		    if(newFoV >= fovValue){
		    	if(aladinLiteView.masterResource != undefined){
		    		controller.updateCatalogs(aladinLiteView,'zoom');
		    	}
		    }	    
		});

		/*if(aladinLiteView.masterResource.affichage.display == true){
			AladinLiteX_mVc.displayDataXml();
		}
		*/
		$("#open_all").click(function(event){
			event.stopPropagation();
			switchPanel();
			closeContext();
			
		})
		if(defaultView.panelState == true ){
			switchPanel();
		}
		if(masterResource != undefined&&masterResource.affichage.display == true){
			setTimeout( function() {AladinLiteX_mVc.displayDataXml();},1000)	
		}
		/*
		 * Set the default position
		 */	        
        targetDiv.val(defaultView.field.position);
		/*
		 * Set event handlers de la texte target
		 */
		targetDiv.click(function(event){
			event.stopPropagation();
		})
		targetDiv.bind("keypress", function(event) {
		    if(event.which == 13) {
		    	if(aladinLiteView.region != null){
					controller.cleanPolygon();
				}
		    	aladinLiteView.clean();
		    	deselectSource();
				event.preventDefault();
		        gotoObject(targetDiv.val());
		    }
		});
		$('#input_target').bind("keypress", function(event) {
			if(event.which == 13) {
				displayTarget();
			}
		});
		selectDiv.click(function(event){
			event.stopPropagation();
		});
		selectDiv.change(function(){
			console.log("selectdiv&&&&&&&");
			searchPosition($(this).val());
		});
		maskDiv.click(function(event){
			event.stopPropagation();
		});
		maskDiv.keyup(function(e) {
			if( $(this).val().length >= 2 || e.which == 13) {
				searchHips($(this).val());
			}
		});
		selectHipsDiv.change(function(){
			displaySelectedHips($(this).val());
		});
		selectHipsDiv.click(function(event){
			event.stopPropagation();
		});
		
		$("#select_vizier").change(function(){
			console.log($(this).val()+"<<<<<add again");
			var oid = $(this).val();
			catalogFunction(oid);
		});
		
		catalogeDiv.keyup(function(e) {
			if( $(this).val().length >= 2 || e.which == 13) {
				searchCataloge($(this).val());
			}
		});
		
		$("#menuDiv").on("click",".alix_btn_open", function(event){
			event.stopPropagation();
			$("#center").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#center").css("transform","translate3d(45px,0px,0px)");
			$("#center").css("transition-duration","100ms");
			
			$("#bookMark").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#bookMark").css("transform","translate3d(90px,0px,0px)");			
			$("#bookMark").css("transition-duration","200ms");
			
			$("#history").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#history").css("transform","translate3d(135px,0px,0px)");
			$("#history").css("transition-duration","300ms");
			
			$("#region").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
			$("#region").css("transform","translate3d(180px,0px,0px)");
			$("#region").css("transition-duration","400ms");
			
			$("#menu").addClass("alix_btn_open_2");
			$("#menu").removeClass("alix_btn_open");
			$("#icon_open").addClass("glyphicon-remove");
			$("#icon_open").removeClass("glyphicon-list");
			
			$("#credit").css("display","none");
		});
		$("#menuDiv").on("click",".alix_btn_open_2", function(event){
			event.stopPropagation();
			$("#center").css("transition-timing-function","ease-out");
			$("#center").css("transform","translate3d(0px,0px,0px)");
			$("#center").css("transition-duration","100ms");
			
			$("#bookMark").css("transition-timing-function","ease-out");
			$("#bookMark").css("transform","translate3d(0px,0px,0px)");			
			$("#bookMark").css("transition-duration","200ms");
			
			$("#history").css("transition-timing-function","ease-out");
			$("#history").css("transform","translate3d(0px,0px,0px)");
			$("#history").css("transition-duration","300ms");
			
			$("#region").css("transition-timing-function","ease-out");
			$("#region").css("transform","translate3d(0px,0px,0px)");
			$("#region").css("transition-duration","400ms");
			
			$("#menu").addClass("alix_btn_open");
			$("#menu").removeClass("alix_btn_open_2");
			$("#icon_open").addClass("glyphicon-list");
			$("#icon_open").removeClass("glyphicon-remove")

			$("#credit").css("display","inline");
		});
		
		$("#vizier").click(function(event){
			event.stopPropagation();
		});
		$('.alix_target_selecte').click(function(event){
			if($(this).attr("class")=="alix_target_selecte alix_unselected"){
				for(var i=0;i<aladinLiteView.target.length;i++){
					var data=i;
					var ct = aladinLiteView.target[i].ct;
					var ra = aladinLiteView.target[i].ra;
					var dec = aladinLiteView.target[i].dec;
					aladin.addCatalog(ct);
					ct.addSources([A.marker(ra, dec, {popupTitle:'target'}, data)]);
				}
				$(this).attr("class","alix_target_selecte alix_selected");
				$(this).css("color","#87F6FF");
			}else{
				cleanCatalog("target");
				$(this).attr("class","alix_target_selecte alix_unselected");
				$(this).css("color","#888a85");
			}
			
		});
		$('.alix_select_trash').click(function(event){
			$('.alix_target_selecte').css("display","none");
			$(this).css("display","none");
			$('.alix_select_flash').css("display","none");
			cleanCatalog("target");
		});
		
		$('.alix_select_flash').click(function(event){
			for(var i=0;i<aladinLiteView.target.length;i++){
				aladinLiteView.target[i].ct.makeFlash();
			}
		});
		
		$("#credit").click(function(event){
			checkBrowseSaved();
			contextDiv.css("max-height", "200px");
			if( contextDiv.height() < 100 ){
				contextDiv.animate({height:'200px'},"fast");
				contextDiv.css("border-width", "0.2px");
				//$(".ui-dialog").animate({height:'200px'},"fast");
				
			}else{
				contextDiv.animate({height:'0px'},"fast");
				contextDiv.css("border-width", "0px");
				////$(".ui-dialog").animate({height:'0px'},"fast");
			}
			$.getJSON("http://saada.unistra.fr/alix/licences/credit.json", function(jsondata) {
				contextDiv.html("<pre>" + JSON.stringify(jsondata, null, 2) + "</pre>");
			});
		});
   
		/////Filter the sources /////////////////////////
		if(masterResource != undefined&&masterResource.actions.externalProcessing.handlerInitial){
			console.log("handlerInitial");
			masterResource.actions.externalProcessing.handlerInitial();
		}
	}
	var setDefaultSurvey = function(defaultView){
		var lieu = aladin.getRaDec();
		var fil =  aladin.getFov();

		var baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
			+ '23' + "&DEC=" + '33' 
		+ "&SR=" + fil[0] 
		+ "&fmt=json&get=record&casesensitive=false";
		var productType = "image";
		var imageIdPattern 	= new RegExp(/.*\/C\/.*/);
		var imageTilePattern = new RegExp(/.*((jpeg)|(png)).*/);
		$.getJSON(baseUrl, function(jsondata) {
			if( productType != undefined ){
				for(var i = jsondata.length - 1; i >= 0; i--) {
					if(jsondata[i].dataproduct_type != productType ) {
						jsondata.splice(i, 1);
					}
				}
				if( productType == "image" ){
					for(var i = jsondata.length - 1; i >= 0; i--) {
						var keepIt = 0;
						if(  $.isArray(jsondata[i].hips_tile_format)) {
							for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
								if( imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
									keepIt = 1;
									break;
								}
							}
						} else if(  imageTilePattern.test(jsondata[i].hips_tile_format) ){
							keepIt = 1;
						}
						if( keepIt == 0 ){
							jsondata.splice(i, 1);
						}
					}
				}
				controller.modules.hipsSelectorModel.storeHips(jsondata);
				/*
				 * Check if the default request survey cover the position.
				 * Take it if yes and take DSS2 color if not
				 */
				var found = false;
				for( var i=0 ; i<jsondata.length ; i++){
					var id = jsondata[i].ID ;
					if( id == defaultSurvey){
						displaySelectedHips(id);
						createHipsSelect(id);
						found = true;
					}
				}
				if( !found ){
					displaySelectedHips("CDS/P/DSS2/color");
					createHipsSelect("CDS/P/DSS2/color");
				}
			}
		});
	}
	var setReferenceView = function(defaultView){
		/*
		 * Set the aladinView according to the configuration data of defautView.
		 * Can be tested in demo alixapi. (button 'change reference')
		 *  
		 */
		if( aladin != null ) {
			for( var i =0; i<aladin.view.overlays.length ; i++){
				if( aladin.view.overlays[i].name ==  "Reference Frame" ){
					aladin.view.overlays[i].removeAll();
					break;
				}
			}
		}
		/*
		 * Parse config
		 */
		if( defaultView.defaultSurvey != undefined )
			defaultSurvey = defaultView.defaultSurvey;
		if( defaultView.region != undefined ) {
			var pts = [];
			/*
			 * Extract region or position from SaadaQL statement
			 */
			if (defaultView.region.type == "array") {
				x = controllers.regionEditor.view.parseArrayPolygon(defaultView.region.value);
			} else if (controllers.regionEditor.view.editionFrame.type == "soda") {
				x = this.controllers.regionEditor.view.parseSodaPolygon(defaultView.region.value);
			} else {
				alert("Polygone format " + points.type + " not understood");
			}
			if( x ){
				var view = BasicGeometry.getEnclosingView(x);
				defaultPosition = view.center.ra + " " +  view.center.dec
				defaultFov = 1.2*view.size;
				if( aladin == null ) {
					aladin = A.aladin(parentDiv
						, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
					parentDiv.append();
				}
				//gotoObject(defaultPosition);
				/*
				 * setZoom and gotoObject can't be called at the same time, cause there will be the collision on charging the X sources.
				 *  
				 */
				setZoom(defaultFov);
				gotoPosition(view.center.ra,view.center.dec);
				overlay = A.graphicOverlay({color: 'blue', name: "Reference Frame"});
				aladin.addOverlay(overlay);
				overlay.addFootprints([A.polygon(x)]);
			}

		} else {
			if( defaultView.field != undefined ) {
				if( defaultView.field.defaultFov != undefined )
					defaultFov = defaultView.field.defaultFov;
				else defaultFov = 0.9;

				if( defaultView.field.position != undefined )
					defaultPosition = defaultView.field.position;
				else
					defaultPosition = "M51";
			} else {
				defaultPosition = "M51";
				defaultFov = 0.9;
			}
			if( aladin == null ) {
				aladin = A.aladin(parentDiv
					, {survey: defaultSurvey, fov: defaultFov, showLayersControl: false, showFullscreenControl: false, showFrame: false, showGotoControl: false});
				parentDiv.append();
			}
			//gotoObject(defaultPosition);
			//setZoom(defaultFov);
			
			//gotoPosition(positionRef.ra,positionRef.dec);
			gotoPositionByName(defaultPosition);
			// Use that is because gotoObject() and setZoom() will have the conflicts of charging XMM sources. So we need to use aladin.gotoPosition. And we create a function to get the ra dec by the name of the position.
			setTimeout(function(){ aladin.setZoom(defaultFov);}, 200);

		}
		setDefaultSurvey();
	}
	var positionRef;
	var ifpopup = false;
	var popup = function(){
		if(ifpopup == true){
			$("#aladin-lite-div").closest('.ui-dialog-content').dialog('close'); 
			ifpopup = false;
		}else{
		if(menuDiv.width()<100){
			$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:440});
		}else{
			if(contextDiv.height()<100){
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:680});
			}else{
				$("#aladin-lite-div").dialog({title:"AladinLiteX",height:650,width:680});
			}
		}
		ifpopup = true;
		}
		//$("#popup").css("display", "none");
		//$("#closeAll").css("display", "inline");
	}



	var refresh = function(){
		gotoObject(defaultPosition);
		aladin.setFov(defaultFov);
		$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:440});
	}
	
	var addOverlayer = function(overlay){
		aladin.addOverlay(overlay);
	}
	
	var gotoPosition = function(ra, dec){
		aladin.gotoPosition(ra,dec);
	}
	
	var world2pix = function(ra, dec){
		return aladin.world2pix(ra, dec);
	}
	
	var setZoom = function(zoom){
		aladin.setZoom(zoom);
	}
	
	var increaseZoom = function(){
		aladin.increaseZoom();
	}
	
	var decreaseZoom = function(){
		aladin.decreaseZoom();
	}
	
	var pix2world = function(cx,cy){
		return aladin.pix2world(cx,cy);
	}
	
	var setImageSurvey = function(imageSurvey, callback){
		return aladin.setImageSurvey(imageSurvey, callback);
	}
	
	var createImageSurvey = function(id, name, rootUrl, cooFrame, maxOrder, options){
		return aladin.createImageSurvey(id, name, rootUrl, cooFrame, maxOrder, options);
	}
	/**
	 * les interfaces pour acces à aladin.js
	 */	

	
	var returnCenter = function(){
		checkBrowseSaved();
		gotoObject(defaultPosition);
		//aladin.gotoPosition(aladinLiteView.ra,aladinLiteView.dec);
		controller.cleanPolygon();
        //event.stopPropagation();
	}
	var historySelected = false;
	var regionSelected = false;
	var bookMark = function(){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		//set height_ul to the height of context panel. _shan
		if( contextDiv.height() < 200 ){
			//$(".ui-dialog").animate({height:'200px'},"fast");
			contextDiv.css("height","auto");
			contextDiv.css("border-width", "0.2px");
			height_ul = $("#history_ul").height() + 80;
			
		}
		console.log(height_ul);
		aladinLiteView.XMM = false;
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith("Swarm")) {
				aladinLiteView.XMM = true;
			}
		}
		
        storeCurrentState();
		controller.bookMark(aladinLiteView);
	}
    var checkBrowseSaved = function(){
    	if(browseSaved == false){
			var a = confirm("Do you want to save your polygon?") ;
			if(a == true){
				$("#regionEditor_a").trigger("click");
			}else{
				browseSaved = null;
				controller.cleanPolygon();
			}
		}
    }
	var getHistory = function(){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		controller.getHistory();
		console.log("hello"+$("#history_ul").height());
		if(contextDiv.height() < 10 /*&& $("#history").attr("class")=="alix_btn alix_btn-circle alix_btn-green alix_menu_item alix_button_history alix_unselected"*/){
			contextDiv.css("height","auto");//set height_ul to the height of context panel. _shan
			contextDiv.css("border-width", "0.2px");
			 historySelected = true;
			 regionSelected = false;
		}else if(contextDiv.height() > 10 ){
			if(historySelected){
				contextDiv.animate({height:0},"fast");
				 historySelected = false;
				 regionSelected = false;
		}else {
			contextDiv.css("height","auto");//set height_ul to the height of context panel. _shan
			contextDiv.css("border-width", "0.2px");
			 historySelected = true;
			 regionSelected = false;
		}
		}
		//event.stopPropagation();
	}
	
	/**
	 * revenir dans la situation de l'historic
	 */
	var restoreView = function(storedView) {
		if(aladinLiteView.region != null){
			controller.cleanPolygon();
		}
		aladinLiteView = jQuery.extend(true, {}, storedView);
		targetDiv.val(aladinLiteView.name);
	    aladin.gotoRaDec(aladinLiteView.ra,aladinLiteView.dec);
        aladin.setFoV(aladinLiteView.fov);
        displaySelectedHips(aladinLiteView.survey.ID);
        selectHipsDiv.val(aladinLiteView.survey.ID);
        if(aladinLiteView.region != null){
        if(!regionEditorInit){
        	//create the editregion environment (if it hasn't been created )for the polygon in the localstorage
        	controller.editRegion();
    			}
        	var points = {type: null, value: []};
        	points.type = aladinLiteView.region.format;
        	points.value = aladinLiteView.region.points;
        	controller.setInitialValue(points);
        }
        
        //event.stopPropagation();
    }	
	
	var restoreViewById = function(viewId) {
		cleanCatalog("all");//clean all the catalogs in the aladin.view
		var storedView = controller.restoreViewById(viewId);
		//controller.buildHipsTab(storedView);
		restoreView(storedView);
		if(storedView.catalogTab != null){
		   controller.buildCataTab(storedView);//This also includes restoreCatalog(storedView).
		   //controller.restoreCatalog(storedView);
			//give the data to cata_dict(catalog dictionary) for the bookmarks saved in localstorage and call the restorecatalog when cata_dict is built.  
			
		}
		//11/10/2018 To avoid the data sources being loading for the second time which create the problem for the historic target dispalying
		if(aladinLiteView.XMM == true){
				//if the xmm already exists, don't change it
				controller.displayDataXml(aladinLiteView);
		}
		
		var html_option = '<select id="status" class ="alix_selector_hips alix_menu_item">'
		html_option += "<option value='"+ aladinLiteView.survey.ID +"'>"+ aladinLiteView.survey.ID +"</option>";
			for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
				if(controller.modules.historicModel.hips_tab[s]!=aladinLiteView.survey.ID){
					html_option += "<option value='" 
					+ controller.modules.historicModel.hips_tab[s] 
					+ "'>"
					+ controller.modules.historicModel.hips_tab[s] +"</option>"
				}
			}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
		if(aladinLiteView.target.length > 0){
			//consoloe.log("#####"+aladinLiteView.target.length);
			for(var i = 0;i<aladinLiteView.target.length;i++){
				var ra = aladinLiteView.target[i].ra;
				var dec = aladinLiteView.target[i].dec;
				var ct = A.catalog({name: "target", color:"green"});
				aladin.addCatalog(ct);
				ct.addSources([A.marker(ra, dec,  {popupTitle:'target'})]);
			}
        }
		 aladin.view.imageSurvey.getColorMap().update(aladinLiteView.colorMap);
		 if(aladinLiteView.reverseColor){
    	 aladin.view.imageSurvey.getColorMap().reverse(); 
		 }
		 if(aladinLiteView.sourceSelected.x && aladinLiteView.sourceSelected.y){
			 WaitingPanel.show("the selected source");
	    	 var x = aladinLiteView.sourceSelected.x;
	    	 var y = aladinLiteView.sourceSelected.y;
	    	 setTimeout(function(){reselectSource(x,y); WaitingPanel.hide("the selected source")}, 2500);
	    	 //Not well done. Wait 3 seconds for all sources displaying in the view and then reselect
		}
    }
	var reselectSource = function(x,y){
		  var objs = aladin.view.closestObjects(x, y, 5);
          if (objs) {
              var o = objs[0];

              // footprint selection code adapted from Fabrizzio Giordano dev. from Serco for ESA/ESDC
              if (o instanceof Footprint || o instanceof Circle) {
                  o.dispatchClickEvent();
              }

              // display marker
              else if (o.marker) {
                  // could be factorized in Source.actionClicked
                  aladin.view.popup.setTitle(o.popupTitle);
                  aladin.view.popup.setText(o.popupDesc);
                  aladin.view.popup.setSource(o);
                  aladin.view.popup.show();
              }
              // show measurements
              else {
                  if (aladin.view.lastClickedObject) {
                      aladin.view.lastClickedObject.actionOtherObjectClicked && aladin.view.lastClickedObject.actionOtherObjectClicked();
                  }
                  o.actionClicked();
              }
              aladin.view.lastClickedObject = o;
              var objClickedFunction = aladin.view.aladin.callbacksByEventName['objectClicked'];
              (typeof objClickedFunction === 'function') && objClickedFunction(o);
          }
          else {
              if (aladin.view.lastClickedObject) {
                  aladin.view.aladin.measurementTable.hide();
                  aladin.view.popup.hide();

                  if (aladin.view.lastClickedObject instanceof Footprint) {
                      //aladin.view.lastClickedObject.deselect();
                  }
                  else {
                      aladin.view.lastClickedObject.actionOtherObjectClicked();
                  }

                  aladin.view.lastClickedObject = null;
                  var objClickedFunction = aladin.view.aladin.callbacksByEventName['objectClicked'];
                  (typeof objClickedFunction === 'function') && objClickedFunction(null);
              }
          }
	}
	
	/**
	 * stoker le 'aladinLiteView' courant
	 */
	var storeCurrentState = function(){
		var radec = aladin.getRaDec();

		aladinLiteView.name = targetDiv.val();
		aladinLiteView.ra = radec[0];
		aladinLiteView.dec = radec[1];
		var l = aladin.getFov();
		aladinLiteView.fov = l[0];
		aladinLiteView.img = aladin.getViewDataURL({width: 400, height: 400});
		aladinLiteView.catalogTab = controller.currentCatalogTab(aladin.view.catalogs);
		aladinLiteView.colorMap = aladin.view.imageSurvey.getColorMap().mapName;
		aladinLiteView.reverseColor = aladin.view.imageSurvey.getColorMap().reversed;
		var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
		var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);

		console.log("@@@@@@@@@@@@@@ storeCurrentState " + strlon + " " + strlat);

	}
	
	/**
	 * stoker le region courant
	 */
	var storePolygon = function(region){
		aladinLiteView.region = region;
	}
	
	/**
	 * click function 'region'
	 */
	var regionEditorInit = false;//To judge if regioneditor is already initialled
	var regionEditor = function(){
		//if(aladinLiteView.region != null){
			//controller.cleanPolygon();
		//}
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		storeCurrentState();
		contextDiv.html("");
		//console.log(">>>>>"+contextDiv.height() + " " + regionSelected);
		if(contextDiv.height() < 10){
			// open the region  editor
			//if(!regionEditorInit){
			controller.editRegion();
		
			//controller.cleanPolygon();
			contextDiv.animate({height:'101px'},"fast");//change the context height from 200px to 101px. _shan
			contextDiv.css("border-width", "0.2px");
			historySelected = false;
			regionSelected = true;
			regionEditorInit = true;
		}else if(contextDiv.height() >= 50){
			// contextDiv.height() >= 50 BECAUSE in the browser firefox, the height has some strange way to calculate , 101px maybe will be calculated as "99"
			if(regionSelected){
			// close the region  editor
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			regionSelected = false;
			historySelected = false;
			//controller.cleanPolygon();
			//controller.closeEditor();
		}else{
			//open region editor from while history page is open
			//controller.cleanPolygon();
			controller.editRegion();
			contextDiv.animate({height:'101px'},"fast");
			regionSelected = true;
			historySelected = false;
			regionEditorInit = true;
		}
	}
	}
	

	/**
	 * go to the object by enter its name 
	 */
	var gotoObject = function(posName, posthandler){
		selectDiv.val(posName);
		targetDiv.val(posName);
        aladin.gotoObject(posName,{
        	success: function(pos){
        		aladinLiteView.name = targetDiv.val();
        		aladinLiteView.ra = pos[0];
        		aladinLiteView.dec = pos[1];
        		
    			var strlon = Numbers.toSexagesimal(aladinLiteView.ra/15, 8, false);
    			var strlat = Numbers.toSexagesimal(aladinLiteView.dec, 7, false);

    			console.log("@@@@@@@@@@@@@@ gotoObject " + strlon + " " + strlat);

        		var l = aladin.getFov();
        		aladinLiteView.fov = l[0];
    			controller.updateCatalogs(aladinLiteView,'position');
    			addPositionInSelector(posName);

        		if(posthandler){
        			posthandler();
        		}
        		//console.log(targetDiv.val() +"  "+ 'position' +" : "+ pos[0] + " " + pos[1]);
        	}
        	,error: function(){alert('pas connu');}
        	});		        		
	}
	
	/**
	 * Change states of panel
	 */
	var switchPanel = function() {
		if( menuDiv.width() < 100 ){
			menuDiv.animate({width:'+=240px'},"fast");
			$(".alix_menu_item").css("display", "inline");
			$("#open_all").animate({left:'+=240px'},"fast");
			$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-left");
			//$(".ui-dialog").animate({width:'+=240px'},"fast");
		} else {
			menuDiv.animate({width:'-=240px'},"fast");
			$(".alix_menu_item").css("display", "none");
			//$("#vizier").css("display","none");
			$("#open_all").animate({left:'-=240px'},"fast");
			$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-right");
			//$(".ui-dialog").animate({width:'-=240px'},"fast");
		}
	}
	
	var closeContext = function() {
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 99 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			$(".alix_context").css("display", "none");
			contextDiv.html("");
			////$(".ui-dialog").animate({height:'0px'},"fast");
			targetDiv.val(aladinLiteView.name);
		}
	}
	
	/**
	 * utiliser quand clique sur button edit , pour disable bookMark et history
	 */
	var disabledButton = function(){
		document.getElementById("bookMark").disabled=true;
		document.getElementById("history").disabled=true;
		document.getElementById("center").disabled=true;
	}
	
	/**
	 * utiliser quand clique sur button browse , pour reable bookMark et history
	 */
	var reabledButton = function(){
		document.getElementById("bookMark").disabled=false;
		document.getElementById("history").disabled=false;
		document.getElementById("center").disabled=false;
	}
	
	/**
	 * suprrimer l'élement dans l'historic, id se correspont à le id du croix et de la liste 
	 */
	var deleteHistory = function(id){
		controller.deleteHistory(id);
		//event.stopPropagation();
	}
		
	var searchHips = function(hips_mask){
		controller.searchHips(hips_mask,aladinLiteView);
	}
	
	var hipsFunction = function(ID){
		displaySelectedHips(ID);
		createHipsSelect(ID);
		displayDetailInContext(ID);
	}
	
	var catalogFunction = function(obs_id){
	//	if(controller.modules.hipsSelectorModel.cata_tab.indexOf(obs_id)<0){
		if(!LibraryCatalog.getCatalog("VizieR:"+obs_id)){
			console.log("catalogfunction"+obs_id);
		//	controller.storeCurrentCatalog(obs_id);
			controller.createCatalogSelect(obs_id);
			addCatalogInSelector(obs_id);
		}
		else{
			var shown = false;
			$("#vizier_list").find("li").each(function() {
				   if ($(this).hasClass(obs_id)) {
					   console.log("VizieR:"+obs_id+"exists already in library Catalog and is shown");
					   shown = true;
				   }
			})
			if(shown == false){
				controller.createCatalogSelect(obs_id);
				console.log("VizieR:"+obs_id+"exists already in library Catalog but not shown");
			}
		}
		$("#itemList").css("display", "none");
	}

	var displaySelectedHips = function(ID) {
		var hips = controller.getSelectedHips(ID);
		aladinLiteView.survey = hips;
		if (hips === undefined) {
			console.error('unknown HiPS');
			return;
		}
		$("#itemList").css("display", "none");
		var fmt = "";
		if(hips.hips_tile_format.indexOf("png") >=0  ){
			fmt = "png";
		} else {
			fmt = "jpg";
		}
		if( fmt != ""){
			setImageSurvey(createImageSurvey(hips.obs_title, hips.obs_title, hips.hips_service_url, hips.hips_frame, hips.hips_order, {imgFormat: fmt})  );
		}else{ 
			setImageSurvey(createImageSurvey(hips.obs_title, hips.obs_title, hips.hips_service_url, hips.hips_frame, hips.hips_order)  );
		}
	}
	
	var createHipsSelect = function(ID){
		var select_hips = document.getElementById(selectHipsDivId);
		var lengthOption = select_hips.options.length;
		for(var i=0;i<lengthOption;i++){
			if(select_hips.options[i].text == ID)
				return false;
		}
		controller.modules.historicModel.hips_tab.push(ID);
		var html_option = '<select id="status" class ="alix_selector_hips alix_menu_item">'
			html_option += "<option value='"+ ID +"'>"+ ID +"</option>";
				for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
					if(controller.modules.historicModel.hips_tab[s]!=ID){
						html_option += "<option value='" 
						+ controller.modules.historicModel.hips_tab[s] 
						+ "'>"
						+ controller.modules.historicModel.hips_tab[s] +"</option>"
					}
				}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
	}
	

/*	var createPositionSelect = function(ID){

		controller.modules.historicModel.hips_tab.push(ID);
		var html_option = '<select id="status" class ="alix_selector_hips alix_menu_item">'
			html_option += "<option value='"+ ID +"'>"+ ID +"</option>";
				for(var s=0 ; s<controller.modules.historicModel.hips_tab.length; s++){
					if(controller.modules.historicModel.hips_tab[s]!=ID){
						html_option += "<option value='" 
						+ controller.modules.historicModel.hips_tab[s] 
						+ "'>"
						+ controller.modules.historicModel.hips_tab[s] +"</option>"
					}
				}
		html_option += '</select>';
		selectHipsDiv.html(html_option);
	}*/
	
	
	var addPositionInSelector = function(pos){
		//To avoid adding the same catalog obs_id again
		var select_position = document.getElementById("aladin-lite-div-select")
		var lengthOption = select_position.options.length;
		for(var i=0;i<lengthOption;i++){
			if(select_position.options[i].text == pos)
				return false;
		}
		if(pos != ""){
		var pos_select = '<option>'
			+pos
			+'</option>';
		selectDiv.append(pos_select);
		selectDiv.val(pos)}
	}
	
	var addCatalogInSelector = function(obs_id){
		//To avoid adding the same catalog obs_id again
		var select_vizier = document.getElementById("select_vizier")
		var lengthOption = select_vizier.options.length;
		$("#select_vizier").val(obs_id);
		for(var i=0;i<lengthOption;i++){
			if(select_vizier.options[i].text == obs_id)
				return false;
		}
		var cata_select = '<option>'
			+obs_id
			+'</option>';
		$("#select_vizier").append(cata_select);
	}
	
	var displayDetailInContext = function(ID){
		contextDiv.css("max-height", "200px");
		var hips = controller.getSelectedHips(ID);
		if(hips != undefined){
			var html = '<p style="color:#4D36DC;margin:10px;" >';
			html +=  hips.obs_title +"</p>"
			+"<span style='font-size:small;color : #727371;margin:10px;'>"+ID +"</span>"
			+"<p style='font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;'>&nbsp;&nbsp;" + hips.obs_description + "<br>";
			html += '</p>';
			if(contextDiv.height() > 100){
				contextDiv.html(html);
			}else{
				contextDiv.animate({height:'200px'},"fast");
				contextDiv.css("border-width", "0.2px");
				contextDiv.html(html);
			//	//$(".ui-dialog").animate({height:'200px'},"fast");
			}
		}else{
			alert("Please enter a survey ID");
		}
		//event.stopPropagation();
		
	}
	
	var showDetail = function(ID){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("border-width", "0px");
			//////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{
			displayDetailInContext(ID);
		}
		//event.stopPropagation();
	}
	// display the  especial detail site for each catalog . buttuon 'i' .
	var displayCatalogDetailInContext = function(obs_id,color){
		console.log("displayCatalogDetailInContext");
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
			////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{
			var cata = controller.getSelectedCatalog(obs_id);
			var index = obs_id.split("/");
			index.pop();
			index=index.join("/");
			console.log("obs_id="+obs_id);
			console.log("index="+index);
			var length=index.length-1;
			if(cata != undefined){
			var html ='<iframe id = "cds_iframe"  name="content_frame" marginwidth=0 marginheight=0 width=100% height=400 src="http://cdsarc.u-strasbg.fr/viz-bin/ReadMe/'+index+'/?format=html&tex=true" frameborder="0"'
				+'style = "box-shadow: 0 0 20px 2px '+color+'; margin-left: 5px;" ></iframe>'
			/*	var html = '<p style="color:#4D36DC;margin:10px;" >';
				html +=  cata.obs_title + "</p><p style='font-size:small;margin:10px;'>" + cata.obs_description + "<br>";
				html += '</p>';*/  
				if(contextDiv.height() > 100){
					contextDiv.html(html);
				}else{
					contextDiv.animate({height:'400px'},"fast");
					contextDiv.css("max-height", "400px");
					contextDiv.css("border-width", "0.2px");
					contextDiv.html(html);
					//$(".ui-dialog").animate({height:'400px'},"fast");
				}
			}else{
				alert("Please choose a catalog");
			}
			
		}
		//event.stopPropagation();		
	}
	
	//catalog = A.catalogHiPS(url, {onClick: clickType,name: name,color: color}, WaitingPanel.hide(name))
	var configureCatalog = function(i,c){
		console.log("obs_id="+i);
		var i = i;
		var obs_id;
		var obs_id_use;
		var colorHex;
		var cata;
		var colorRgb;
		if(i=="XMM"){
			console.log("XMMplay");
			if(LibraryCatalog.getCatalog("Swarm")){
			cata = LibraryCatalog.getCatalog("Swarm").al_refs;}//else{alert("Please choose a catalog")};
			obs_id_use= i;
			if(c=="red"){
				colorRgb="rgb(255,0,0)";
				}else{
				colorRgb=c;
			};
		}else if(i=="Simbad"||i=="NED"){
			console.log("SNplay");
			console.log("NEDcolor"+c);
			if(LibraryCatalog.getCatalog(i)){
			cata = LibraryCatalog.getCatalog(i).al_refs;}//else{alert("Please choose a catalog")};
			obs_id_use= i;
			if(c=="red"){
				colorRgb="rgb(255,0,0)";
				}else if(c=="orange"){
				colorRgb="rgb(255,165,0)";
				}else{
				colorRgb=c;
			};
		}else{
			console.log("Vizierplay");
			 obs_id_use=$("#cata_operate_"+ i).text();
			 obs_id=$("#cata_operate_"+ i).text();
			 cata= LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
			// cata = controller.getSelectedCatalog(obs_id);
		    colorRgb= document.getElementById("cata_operate_"+ i).style.color;		
		}
		//Transform color rgb(0,0,0)to color Hex
		var color= colorRgb.substring(4,colorRgb.length-1);
		color= color.split(",");
		function componentToHex(rgb) {
			var hex = Number(rgb).toString(16);
			  if (hex.length < 2) {
			       hex = "0" + hex;
			  }
			  return hex;
		}
		function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		var r = color[0];var g = color[1];var b = color[2];
		colorHex = rgbToHex(r, g, b);
		
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
			////$(".ui-dialog").animate({height:'0px'},"fast");
		}else{
			if(cata != undefined){
			var html ='<div id="'+obs_id_use+'"class="'+i+'" style = "box-shadow: 0 0 20px 2px '+colorHex+' ;height=140px; margin-left: 5px; height: 140px;">'
				+'<div class="alix_configurationShape" ><b>Shape:</b>'
				+'<i id="shape_plus" title="plus" class="glyphicon glyphicon-plus alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_cross" title="cross" class="glyphicon glyphicon-remove alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_circle" title="circle" class="glyphicon glyphicon-record alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_triangle" title="triangle" class="glyphicon glyphicon-triangle-top alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_rhomb" title="rhomb" class="glyphicon glyphicon-unchecked alix_shapeChoice " style="cursor: pointer;transform: rotate(45deg);" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'<i id="shape_square" title="square" class="glyphicon glyphicon-stop alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i>'
				+'</div>'
				+'<div class="alix_configurationShape"><b>Size:</b>'
				+'<div id="sliderBox"><span class="alix_min-value">1</span><input id="slider_Shape" class=" alix_slider_Shape"  type="range" step="1" value="8" min="1" max="50" oninput="AladinLiteX_mVc.updateSizeOfCatalog(this.value,this.id)"><span class="alix_max-value">50</span>'
				+'<span class="range-value" id="range-value0"></span>'
				+'</div></div>'
				+'<div class="alix_configurationShape"><b>Color:  </b><input id="colorSelect" type = "text" style = "margin-left: 15px;"></input></div>'
				//+'<div class="alix_configurationShape"><b>Color:</b><input id="colorSelect" type="color" style = "margin-left: 15px;" value="'+colorHex+'" oninput="AladinLiteX_mVc.updateColorOfCatalog(colorSelect.value,this.id)"></input></div>'
				+'</div>' 
				if(contextDiv.height() > 100){
					/*contextDiv.html(html);
					$("#colorSelect").spectrum({
					    color: colorHex,
					    change: function(color) {
					    	AladinLiteX_mVc.updateColorOfCatalog(color,'colorSelect')
					        }
					    });*/
				}else{
					contextDiv.animate({height:'150px'},"fast");
					contextDiv.css("max-height", "200px");
					contextDiv.css("border-width", "0.2px");
					//contextDiv.html(html);
					//$(".ui-dialog").animate({height:'150px'},"fast");
				}
			contextDiv.html(html);
			//Define the color select
			$("#colorSelect").spectrum({
			    color: colorHex,
			    preferredFormat: "hex3",
			   // flat: true,
			    showInput: true,
			    showPalette: true,
			    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
			    change: function(color) {
			    	AladinLiteX_mVc.updateColorOfCatalog(color.toHexString(),'colorSelect')
			        }
			    });
			}else{
				alert("Please choose a catalog");
			}
		}
	}
	
	var updateColorOfCatalog =function(hex,id){
		var boxDiv = document.getElementById(id).parentNode.parentNode;
		var i=boxDiv.className;
		boxDiv.style.boxShadow ='0 0 20px 2px '+hex;
		if(i=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
			$("#"+ i).css("color",hex);
			$("#btn-"+ i+"-description").css("color",hex);
			$("#btn-"+ i+"-configure").css("color",hex);
			$("#btn-"+ i+"-flash").css("color",hex);
			LibraryCatalog.updCatalog({ name:"Swarm" ,color: hex});
			//Save the configuration in library catalog
		}else if(i=="Simbad"||i=="NED"){
			catalog = LibraryCatalog.getCatalog(i).al_refs;
			$("#"+ i).css("color",hex);
			$("#btn-"+ i+"-configure").css("color",hex);
			$("#btn-"+ i+"-flash").css("color",hex);
			LibraryCatalog.updCatalog({ name:i ,color: hex});
		}else{
		var obs_id=$("#cata_operate_"+ i).text();
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		$("#cata_operate_"+ i).css("color",hex);
		$("#btn_detail_catalog_"+ i).css("color",hex);
		$("#btn_flash_catalog_"+ i).css("color",hex);
		$("#btn_configure_catalog_"+ i).css("color",hex);
		$("#btn_delete_catalog_"+ i).css("color",hex);
		LibraryCatalog.updCatalog({ name: 'VizieR:'+obs_id ,color: hex});
		}
		catalog.updateShape({color:hex});
	}
	var updateShapeOfCatalog =function(shape,id){
		var obs_id = document.getElementById(id).parentNode.parentNode.id;
		var catalog;
		if(obs_id=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
		}else if(obs_id=="Simbad"||obs_id=="NED"){
			catalog = LibraryCatalog.getCatalog(obs_id).al_refs;
		}else{
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		}
		catalog.updateShape({shape:shape});
	}
	var updateSizeOfCatalog =function(size,id){
		var obs_id = document.getElementById(id).parentNode.parentNode.parentNode.id;
		var catalog;
		if(obs_id=="XMM"){
			catalog = LibraryCatalog.getCatalog("Swarm").al_refs;
		}else if(obs_id=="Simbad"||obs_id=="NED"){
			catalog = LibraryCatalog.getCatalog(obs_id).al_refs;
		}else{
		catalog = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs;
		}
		catalog.updateShape({sourceSize:Number(size)});
	}
	
	var findSurveyDescriptionById = function(id){
		var hips = controller.getSelectedHips(id);
		return hips.obs_description;
	}
	
	var searchCataloge = function(cataloge_mask){
		controller.searchCataloge(cataloge_mask,aladinLiteView)
	}
	
	var searchPosition= function(pos){
		var position;
		if(pos){
			position = pos;
		}else{
			position = targetDiv.val();
		}
		if(aladinLiteView.region != null){
			controller.cleanPolygon();
		}
		aladinLiteView.clean();
		gotoObject(position);
		//event.stopPropagation();
	}
	
	
	var displaySimbadCatalog = function(){
		//event.stopPropagation();
		controller.displaySimbadCatalog();		
	}
	
	var displayNedCatalog = function () {
		//event.stopPropagation();
		storeCurrentState();
		controller.displayNedCatalog(aladinLiteView);
	}
		
	var detailCatalogOperator = function(i){
		//event.stopPropagation();
		checkBrowseSaved();
		var p_text=$("#cata_operate_"+ i).text();
		var p_color= document.getElementById("cata_operate_"+ i).style.color;
		console.log("gggg"+p_color);
		displayCatalogDetailInContext(p_text,p_color);
	}
	
	
	var displayDataXml = function(){		
		//event.stopPropagation();
		checkBrowseSaved();
		storeCurrentState();
		contextDiv.html("");
		closeContext();
		controller.displayDataXml(aladinLiteView);
	}
	
	var XMMFlash = function(){
		//event.stopPropagation();
		if(XMMcata != null){
			XMMcata.makeFlash();
		}
	}
	var SimbadFlash = function(){
		//event.stopPropagation();
		if(LibraryCatalog.getCatalog("Simbad")){
		var Simbadcata = LibraryCatalog.getCatalog("Simbad").al_refs};
		if(Simbadcata != null){
			Simbadcata.makeFlash();
		}
	}
	var NEDFlash = function(){
		//event.stopPropagation();
		if(LibraryCatalog.getCatalog("NED")){
		var NEDcata = LibraryCatalog.getCatalog("NED").al_refs};
		if(NEDcata != null){
			NEDcata.makeFlash();
		}
	}
		
	var openContextPanel = function(html){
		checkBrowseSaved();
		contextDiv.css("max-height", "200px");
		if(contextDiv.height() > 39){
			contextDiv.css("height", "101px");
			contextDiv.html(html);
		}else{
			contextDiv.animate({height:'101px'},"fast");
			contextDiv.css("border-width", "0.2px");
			contextDiv.html(html);
			//$(".ui-dialog").animate({height:'101px'},"fast");
		}
	}

	var closeCatalogMerged = function(e){
		$(".catalogMerged").css("display","none");
	}
	
	
	/*var displayCatalogFiltered = function(champ,limit,range){
		alixCat = LibraryCatalog.getCatalog("Swarm");
		var sources = alixCat.al_refs.getSources();
		console.log("testalixcat"+alixCat);
		for(var i=0;i<sources.length;i++){
			source =sources[i];
			console.log(source.data[champ]);
		if(range==">"){
			if(parseFloat(source.data[champ])>limit){
				console.log("show");	
				source.show();		
			}else{
				console.log("hide");
				source.hide();			
			}
		}else if(range=="="){
			if(parseFloat(source.data[champ])==limit){
				console.log("show");	
				source.show();		
			}else{
				console.log("hide");
				source.hide();			
			}
		
		}else if(range=="<"){
			if(parseFloat(source.data[champ])< limit){
				console.log("show");	
				source.show();		
			}else{
				console.log("hide");
				source.hide();			
			}
		}else if(range== null){
			source.show();
		}
		}
	}*/
	
	var bindToFade = function(){
		var currentColor=null; //XMM
		var currentVizierColor= new Array(); //Vizier
		var catalog;
		var color;

		$("#minus").unbind("click").click(function(e){
			    console.log("minus");
			    for(var name in LibraryCatalog.catalogs){
					if(name.startsWith('Swarm'))name = 'Swarm';
					if(name.startsWith('Simbad'))name = 'Simbad';
					if(name.startsWith('NED'))name = 'NED';
					var catalog =  LibraryCatalog.getCatalog(name);
					//var catalog = LibraryCatalog.catalogs[name];
					var originColor = catalog.color;
					var catalogRef = catalog.al_refs;
					var currentColor = catalogRef.color;
					console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
					if(currentColor=="orange")currentColor="#ffa500";
					if(currentColor=="red")currentColor = "#ff0000";//To avoid the color take the value"red" sometimes.
					var hex = colorFadeOut(currentColor);
					catalogRef.updateShape({color:hex});
					}
			});
		$("#plus").unbind("click").click(function(e){
			    console.log("plus");
			    for(var name in LibraryCatalog.catalogs){
			    	var catalog = LibraryCatalog.catalogs[name];
					if(name.startsWith('Swarm'))name = 'Swarm';
					if(name.startsWith('Simbad'))name = 'Simbad';
					if(name.startsWith('NED'))name = 'NED';
					var catalog =  LibraryCatalog.getCatalog(name);
					var originColor = catalog.color;
					var catalogRef = catalog.al_refs;
					var currentColor = catalogRef.color;
					console.log("catalog:" + name +",original color:"+ originColor + ",current color:"+currentColor);
					if(currentColor=="orange")currentColor="#ffa500";
					if(currentColor=="red")currentColor = "#ff0000";
					if(originColor=="orange")originColor="#ffa500";
					if(originColor=="red")originColor = "#ff0000";//To avoid the color take the value"red" sometimes.
					var hex = colorFadeIn(currentColor,originColor);
					catalogRef.updateShape({color:hex});
					}
		});
	}
	
	var displayCatalog = function(name, color, clickType, url,masterResource){
		var catalog;
		var self = this;
		var sourceSize=8;
		if(name == 'Simbad'){
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
				catalog = A.catalogHiPS(url, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}, WaitingPanel.hide(name));
				
		}else if(name == 'NED'){
			var shape="square";
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			 }
			if(aladin.getFov()[0]>0.02){
				catalog = A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, 0.02
				, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}
				, function() {WaitingPanel.hide(name)});
			}else{
				catalog = A.catalogFromNED(aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
				, aladin.getFov()[0]
				, {onClick: clickType,name: name,color: color,sourceSize:sourceSize ,shape: shape}
				, function() {WaitingPanel.hide(name)});
			}
		/*	if(!LibraryCatalog.getCatalog(name)){
			LibraryCatalog.addCatalog({url:url, name: name,color: color, shape :shape ,fade : "", al_refs: catalog});
			} else{
			LibraryCatalog.updCatalog({url:url, name: name ,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };*/
		}else if(name == 'Swarm'){
			aladinLiteView.masterResource.cleanTab();
			cleanCatalog("Target");
			cleanCatalog("Swarm");
			console.log("@@@@@@@@@ " + url);
			var shape = 'plus';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).al_refs.color;
				sourceSize = LibraryCatalog.getCatalog(name).al_refs.sourceSize;
				shape = LibraryCatalog.getCatalog(name).al_refs.shape;
			}
			
			catalog = XMMcata = A.catalogFromURL(url, {name: name, sourceSize:sourceSize, shape: shape , color: color, onClick:function(params) {
				/*
				 * function click for the source in catalog XMM
				 */
				sourceSelected = this;//save the reference of selected source as an global var in order to allow us deselect it easilier in the deselectSource();
				aladinLiteView.sourceSelected.x = params.x;
				aladinLiteView.sourceSelected.y = params.y;
				var data = params.data;
				console.log(params);
				var showPanel = aladinLiteView.masterResource.actions.showPanel.active;
				console.log("&&&&&&"+aladinLiteView.masterResource+"and"+typeof( aladinLiteView.masterResource.actions.externalProcessing))
				if( aladinLiteView.masterResource&&typeof( aladinLiteView.masterResource.actions.externalProcessing.handlerSelect)=="function") {
					aladinLiteView.masterResource.actions.externalProcessing.handlerSelect(data,showPanel);
				}
				var r1="", r2="";
				for( var k  in data){
					r1 += "<td >" + k + "</td>";
					r2 += "<td >" + data[k] + "</td>";
				}
				var html = "<table class='dataTable' border=1 style='font-size: small;display:none;'><tr style='font-weight: bold;'>" + r1 + "</tr><tr align=center>" + r2 + "</tr></table>"					
				
		
				if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.actions.showPanel.active == true ) {
					openContextPanel(html);
					$(".dataTable").css("display","table");
				}else{
					console.log("none");
					$(".dataTable").css("display","none");
				};
				
				
				if( masterResource != undefined&&!aladinLiteView.masterResource.actions.showAssociated) {
					openContextPanel(html);
				} else {
					/*
					 * draw the point target of the cata XMM chosen to large circle
					 */
					cleanCatalog("Target");
					cleanCatalog("oid");
					var ct = A.catalog({name: "Target"});
					aladin.addCatalog(ct);
					//Take off the circle on the catalog alix_selected
					//ct.addSources([A.marker(data.pos_ra_csa, data.pos_dec_csa,  {popupTitle:'oid: '+data.oidsaada})]);
					//aladinLiteView.target.push({ra:data.pos_ra_csa, dec:data.pos_dec_csa, ct:ct});
					/*
					 * draw oid and url corresponded in context panel
					 */
					var myRegexp = /\{\$(.*)\}/g;
					var match = myRegexp.exec(aladinLiteView.masterResource.actions.showAssociated.url);
					var idField = match[1];
					var idvalue = data[idField];
					var re =  new RegExp("\\{\\$" + idField + "\\}", 'g');
					var lien = aladinLiteView.masterResource.actions.showAssociated.url.replace(re ,idvalue);
					console.log(re + " " + idField + " " + idvalue  + " " + lien);
					//make the associated source shown directly
					if(aladinLiteView.masterResource.actions.showAssociated.active == true) {
					
					$("#XMM").attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp");//to freeze the view , and don't reload the XMM source when position is changed unless we use 'keypress' to go far away
					$('#'+ idvalue).css("color","#32FFEC");
					$.getJSON(lien, function(jsondata) {
						var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:"showTable"});
						aladin.addCatalog(cat);
						for( var i=0 ; i<jsondata.CounterParts.length ; i++ ){
							var point=jsondata.CounterParts[i].source;
							cat.addSources([A.source(point.position.ra, point.position.dec, {ra: Numbers.toSexagesimal(point.position.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.position.dec, 7, true), Name: point.name, Description: point.description})]);
							//cat.addSources([A.source(point.ra, point.dec, {ra: Numbers.toSexagesimal(point.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.dec, 7, true), Name: point.name, Description: point.description})]);
						};
						if(aladinLiteView.masterResource.actions.showAssociated.handlerFadeOut == true){
							AladinLiteX_mVc.fadeOutAuto()
						};
					});
					}
					/*
					 * if its the first time of choosing a cata XMM...
					 */
				/*	if(aladinLiteView.masterResource.tab.indexOf(idvalue)<0){		
						aladinLiteView.masterResource.tab.push(idvalue);
						contextDiv.on('click','#'+ idvalue, function(){
							if($(this).attr("class")=="alix_resource_around alix_dataunselected"){
								$("#plus").css("display","inline");
								$("#minus").css("display","inline");
								$("#fade").css("display","inline");

							$("#XMM").attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp");
								//$("#XMM").css("color", "#888a85");
								//$("#btn-XMM-flash").css("color" , "#888a85");

								//$(this).attr("class","alix_resource_around dataselected");
								$(this).css("color","#32FFEC");
								$.getJSON(lien, function(jsondata) {
									var cat = A.catalog({name: idField + " " + idvalue, sourceSize: sourceSize, color: '#32FFEC', shape: shape, onClick:"showTable"});
									aladin.addCatalog(cat);
									for( var i=0 ; i<jsondata.length ; i++ ){
										var point =  jsondata[i];
										cat.addSources([A.source(point.ra, point.dec, {ra: Numbers.toSexagesimal(point.ra/15, 7, false), dec:  Numbers.toSexagesimal(point.dec, 7, true), Name: point.name, Description: point.description})]);
									}

								});
							}
						});

						contextDiv.on('click','#label_init_btn', function(){
							if($('#label_init_description').css("display")=="none"){
							$('#label_init_description').css("display","inline");}
							else{$('#label_init_description').css("display","none");}
						});
					}*/
				}
			return true;
			}
			}
			, function() {
			SwarmDynamicFilter.runConstraint(aladinLiteView);
			WaitingPanel.hide("Swarm");
			//When the XMM sources is updated by changing the position or zoom, recall the filter
			} /*WaitingPanel.hide()*/);
			/*if(!LibraryCatalog.getCatalog(name)){
				console.log("here is"+catalog);
			LibraryCatalog.addCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
		} else{
			LibraryCatalog.updCatalog({url:url, name: "Swarm",color: color, shape :shape,fade : "", al_refs: catalog});
			
	    };*///if name == SWARM
		bindToFade();
		}
		aladin.addCatalog(catalog);
		cleanCatalog("oid");
		if(!LibraryCatalog.getCatalog(name)){
			 LibraryCatalog.addCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
			} else{
				 LibraryCatalog.updCatalog({url:url, name: name ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,color: color, shape :shape ,fade :"", al_refs: catalog});
		    };
	}
	
	var displayVizierCatalog = function(obs_id, color, clickType, hips_service_url){
		var catalog;
		var fov;
		var self=this;
		var sourceSize =8;
		var shape ="square";
		if(LibraryCatalog.getCatalog('VizieR:'+obs_id)){
			color = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.color;
			sourceSize = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.sourceSize;
			shape = LibraryCatalog.getCatalog('VizieR:'+obs_id).al_refs.shape;
		 }
		if(hips_service_url != undefined){
			catalog = A.catalogHiPS(hips_service_url, {onClick: clickType,name: 'VizieR:'+obs_id,color:color, sourceSize: sourceSize,shape: shape },WaitingPanel.hide(obs_id));
			
		}else{
				var catalog = null;
				
			 $.ajax({
			        url: 'http://alasky.u-strasbg.fr/footprints/estimate-nbrows/estimate-radius',
			        data: {viz_table_id: obs_id,
			        	   ra : aladin.getRaDec()[0],
			        	   dec : aladin.getRaDec()[1] ,
			        	   nb_min : 1000,
			        	   nb_max : 2000
			        	},
			        method: 'GET',
			        async: false, // Mode synchrone

			        dataType: 'text',
			        success: function(response) {
			        	console.log("reponse serveur " + response);

			        	var viewRadius = Math.sqrt((aladin.getFov()[0]*aladin.getFov()[0]) + (aladin.getFov()[1]*aladin.getFov()[1]))/2;
			        	var radius = parseFloat(response);
			        	console.log("radius estime: " + radius + " rayon AL: " + viewRadius);
			        	if(viewRadius<0){
			        		alert("displayVizierCatalog : Sorry, rayon AL is negative = "+ viewRadius+"radius estime: " + radius );
			        		return false;
			        	}
			        	if( radius > viewRadius ) {
			        		radius = viewRadius
			        	} else {
							WaitingPanel.warn("Search radius reduced to " 
									+ (Math.round(radius*600.)/10) + "arcmin to get less than 2000 sources");
			        	}
			        	console.log("radius pris " +  radius);
	
			        	console.log("querying " + obs_id + " " + getSexadecimalString(aladin.getRaDec()[0] , aladin.getRaDec()[1]) + " over " + radius);
						WaitingPanel.show(obs_id);
					
						catalog = A.catalogFromVizieR(obs_id
								, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
								, radius
								, {onClick: 'showTable', color:color,sourceSize: sourceSize,shape: shape }
								, function(sources) {
									console.log(" En direct depuis AL: " + sources.length + " sources affichees")
									WaitingPanel.hide(obs_id);
//									if( sources.length >= 999) {
//										WaitingPanel.warnNbSources();
//									}
								});
						
			        },
			        error: function(xhr, status, error) {
			        	WaitingPanel.warn(xhr.responseText);
			        }
			    }); 
		/*********
			fov = aladin.getFov()[0];

			catalog = A.catalogFromVizieR(obs_id
					, aladin.getRaDec()[0] + " " + aladin.getRaDec()[1]
					, fov
					, {onClick: 'showTable', color: color}
					, function(sources) {
						WaitingPanel.hide(obs_id);
						if( sources.length >= 999) {
							WaitingPanel.warnNbSources();
						}
					});
		}
		****************/
		
		}
		aladin.addCatalog(catalog);
		if(!LibraryCatalog.getCatalog('VizieR:'+obs_id)){
			
		    LibraryCatalog.addCatalog({url:hips_service_url, name:'VizieR:'+obs_id,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,obs_id :obs_id,color: color, shape :shape,fade : "", al_refs: catalog}) 
		    }else{
		    	 LibraryCatalog.updCatalog({url:hips_service_url, name:  'VizieR:'+obs_id ,nameTemp:aladin.view.catalogs[aladin.view.catalogs.length-1].name,obs_id :obs_id, color: color, shape :shape,fade : "", al_refs: catalog})
		    };
				bindToFade();
		for(var i=0;i<aladin.view.catalogs.length;i++){
			console.log("aladinview>>>>>>>>>>>>>"+i+":"+aladin.view.catalogs[i].name);
		}
		return catalog;
		
	}
	
	
	var cleanCatalog = function(name){
		//clean all the catalogs in the current view
		if(name == "all"){
			for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
				aladin.view.catalogs.splice(c, 1);
				aladin.view.mustClearCatalog = true;
				c--;
			}
			aladin.view.requestRedraw(); 
			//!Important: when we clean the catalog XMM,NED,Simbad , change the class of the name in the panel too for the right judge in displaydataXml.
 			$("#XMM").attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp");
			$("#XMM").css("color", "#888a85");
			$("#btn-XMM-flash").css("color" , "#888a85");
			$("#btn-XMM-description").css("color" , "#888a85");
			$("#btn-XMM-configure").css("color" , "#888a85");
			$("#ACDS").css("display" , "none");
			$("#Simbad").attr("class", "alix_simbad_in_menu alix_menu_item alix_datahelp");
			$("#Simbad").css("color" , "#888a85");
			$("#btn-Simbad-flash").css("color" , "#888a85");
			$("#btn-Simbad-configure").css("color" , "#888a85");
			$("#NED").attr("class", "alix_ned_in_menu alix_menu_item alix_datahelp");
			$("#NED").css("color" , "#888a85");
			$("#btn-NED-flash").css("color" , "#888a85");
			$("#btn-NED-configure").css("color" , "#888a85");
			//$("#aladin-lite-div-context").html("");
		}
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name.startsWith(name))  {
				aladin.view.catalogs.splice(c, 1);
				aladin.view.mustClearCatalog = true;
				aladin.view.requestRedraw(); 
				//break;
				c--;
			}
		}
		
	}

	var getAladinCatalogue = function(name) {
		for( var c=0 ; c<aladin.view.catalogs.length ; c++) {
			if( aladin.view.catalogs[c].name == name) {
				return aladin.view.catalogs[c]
			}
		}
		return null
	}

	var colorFadeOut = function(str_color){
		console.log("fadeout"+str_color);
		var str_nb = str_color.replace(/\#/g,"");
		var tab_rgb_str = str_nb.match(/.{2}/g);
		
		var tab_rgb_int=[3];
		for(var j=0;j<tab_rgb_str.length;j++){
				if(parseInt(tab_rgb_str[j],16) > 1){
					tab_rgb_int[j] = parseInt(parseInt(tab_rgb_str[j],16)/2);
					
				}else{
					tab_rgb_int[j] = 1;
				}
		}

		var hex="#"
		for(var i=0;i<tab_rgb_int.length;i++){
			if(tab_rgb_int[i].toString(16).length == 1){
				hex += "0" + tab_rgb_int[i].toString(16);
			}else{
				hex += tab_rgb_int[i].toString(16);
			}
		}
		
		return hex;
	}
	
	var colorFadeIn = function(str_color, org_color){
		console.log("fadein"+str_color);
		var str_nb = str_color.replace(/\#/g,"");
		var tab_rgb_str = str_nb.match(/.{2}/g);
		
		var tab_rgb_int=[3];
		
		tab_rgb_int[0] = parseInt(parseInt(tab_rgb_str[0],16)*2);
		tab_rgb_int[1] = parseInt(parseInt(tab_rgb_str[1],16)*2);
		tab_rgb_int[2] = parseInt(parseInt(tab_rgb_str[2],16)*2);
		
		var org_nb = org_color.replace(/\#/g,"");
		var tab_rgb_org = org_nb.match(/.{2}/g);
		
		var tab_org_int = [3];
		tab_org_int[0] = parseInt(tab_rgb_org[0],16);
		tab_org_int[1] = parseInt(tab_rgb_org[1],16);
		tab_org_int[2] = parseInt(tab_rgb_org[2],16);
		var hex="#";
		for(var i=0;i<tab_rgb_int.length;i++){
			if(tab_rgb_int[i]>tab_org_int[i]){
				tab_rgb_int[i] = tab_org_int[i];
			}
			if(tab_rgb_int[i].toString(16).length == 1){
				hex += "0" + tab_rgb_int[i].toString(16);
			}else{
				hex += tab_rgb_int[i].toString(16);
			}
		}
		return hex;
	}
	
	var displayTarget = function(handler){
		var pos = $('#input_target').val();
		gotoObject(pos, function() {
			var ct ;
			if( (ct = getAladinCatalogue("target")) == null ) {
				ct = A.catalog({name: "target", color: "green"});
				aladin.addCatalog(ct);
			}
			var radec = aladin.getRaDec();
			ct.addSources([A.marker(radec[0],radec[1],  {popupTitle:'target: '+radec[0]+ ', ' +radec[1]})]);
			aladinLiteView.target.push({ra:radec[0], dec:radec[1], ct:ct});
			controller.updateCatalogs(aladinLiteView,'position');
			$('.alix_target_selecte').css("display","inline");
			$('.alix_target_selecte').css("color","#87F6FF");
			$('.alix_target_selecte').attr("class","alix_target_selecte alix_selected");
			$('.alix_select_flash').css("display","inline");
			$('.alix_select_trash').css("display","inline");
			if( handler != null ){
				handler(radec[0],radec[1]);
			}
		});
	}

	var hideXMMFlash = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-flash" title = "flash" class="alix_btn-XMM-flash alix_menu_item glyphicon glyphicon-flash" onclick="AladinLiteX_mVc.XMMFlash(); "></i>'
		}else{
			return '';
		}
	}
	var descriptionXMM = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-description" title="detail" class="alix_btn-XMM-description alix_menu_item glyphicon glyphicon-info-sign alix_btn-operate-catalog" style = "color: #888a85;" onclick="AladinLiteX_mVc.showXMMDesciption();"></i>'
		}else{
			return '';
		}
	}
	var configurationXMM = function(){
		if(aladinLiteView.masterResource != undefined){
			return '<i id="btn-XMM-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'XMM\',this.style.color)"></i>'
		}else{
			return '';
		}
	}
	var showXMMDesciption = function(){
		var des = "No description";
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.affichage.description){
				des = aladinLiteView.masterResource.affichage.description;
			}
			html = '<p style="color:#4D36DC;margin:10px;">XMM-Newton Catalog</p>'
				+'<p style="font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;">'+des+'</p>';
			if(contextDiv.height() > 100 ){
				contextDiv.animate({height:'0px'},"fast");
				contextDiv.css("border-width", "0px");
				////$(".ui-dialog").animate({height:'0px'},"fast");
			}else{
				openContextPanel(html);
			}	
	}
	
	var getCurrentView = function() {
		return aladinLiteView;
	}
	/*
	 * (There'll be the xml collisions if setzoom() and gotoObject() are called at the same time)
	 * setzoom(): input zoom ---> change zoom + replay the XMM catalogs
	 * gotoObject(): input coordinates or name ---> gotoPostion + replay the XMM catalogs
	 * gotoPosition(): input coordinates  ---> gotoPostion
	 * gotoPositionByName(): input name ---> gotoPostion
	 * */
	var gotoPositionByName = function(targetName){
		addPositionInSelector(targetName);
		targetDiv.val(targetName);
		 Sesame.resolve(targetName,
                 function(data) { // success callback
  					   var ra = data.Target.Resolver.jradeg;
  					   var dec = data.Target.Resolver.jdedeg;
  					  gotoPosition(ra,dec);
  					  setDefaultSurvey();//when the defaut ra dec is set, set default survey and build hips tab.
                        // (typeof successCallback === 'function') && successCallback();
                 },
                 function(data) { // errror callback
                      if (console) {
                          console.log("Could not resolve object name " + targetName);
                          console.log(data);
                      }
                      (typeof errorCallback === 'function') && errorCallback();
                 });
	}
	var showColorMap = function(){
		if(contextDiv.height() > 100 ){
			contextDiv.animate({height:'0px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0px");
		}else{
			var html = '<div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: auto; height: 50px; color: black;">'
				+'<b>Color Map : </b>'
				+'<select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>'
			contextDiv.animate({height:'101px'},"fast");
			contextDiv.css("max-height", "200px");
			contextDiv.css("border-width", "0.2px");
			contextDiv.html(html);
		}
		 //// COLOR MAP management ////////////////////////////////////////////
		var cmDiv = $('.alix_colorMapBox');
		var cmSelect = cmDiv.find('.aladin-cmSelection');
         for (var k=0; k<ColorMap.MAPS_NAMES.length; k++) {
             cmSelect.append($("<option />").text(ColorMap.MAPS_NAMES[k]));
         }
         cmSelect.val(aladin.view.imageSurvey.getColorMap().mapName);
         // update color map
         cmDiv.find('.aladin-cmSelection').change(function() {
             var cmName = $(this).find(':selected').val();
             aladin.view.imageSurvey.getColorMap().update(cmName);
             storeCurrentState();
         }); 
         // reverse color map
         cmDiv.find('.aladin-reverseCm').click(function() {
        	 aladin.view.imageSurvey.getColorMap().reverse(); 
        	 storeCurrentState();
         });
	}
	
	var retour = {
			popup : popup,
			refresh : refresh,
			init: init,
			showDetailByID: showDetailByID,
			//draw : draw
			fadeOutAuto : fadeOutAuto,
			deleteSourceAuto : deleteSourceAuto,
			deselectSource : deselectSource,
			//switchPanel : switchPanel,
			closeContext : closeContext,
			returnCenter : returnCenter,
			bookMark : bookMark,
			getHistory : getHistory,
			restoreView: restoreView,
			regionEditor: regionEditor,
			addOverlayer : addOverlayer,
			//gotoPosition : gotoPosition,
			world2pix : world2pix,
			//setZoom : setZoom,
			//increaseZoom : increaseZoom,
			//decreaseZoom : decreaseZoom,
			pix2world : pix2world,
			disabledButton : disabledButton,
			reabledButton : reabledButton,
			storePolygon : storePolygon,
			deleteHistory : deleteHistory,
			restoreViewById :restoreViewById,
			//searchHips :searchHips,
			//displaySelectedHips : displaySelectedHips,
			//createImageSurvey : createImageSurvey,
			//setImageSurvey : setImageSurvey,
			//displayDetailInContext : displayDetailInContext,
			hipsFunction : hipsFunction,
			//findSurveyDescriptionById : findSurveyDescriptionById,
			//createHipsSelect : createHipsSelect,
			searchCataloge : searchCataloge,
			searchPosition : searchPosition,
			catalogFunction : catalogFunction,
			displayCatalogDetailInContext : displayCatalogDetailInContext,
			displaySimbadCatalog : displaySimbadCatalog,
			displayNedCatalog : displayNedCatalog,
			detailCatalogOperator : detailCatalogOperator,
			configureCatalog :configureCatalog,
			displayDataXml : displayDataXml,
			XMMFlash : XMMFlash,
			SimbadFlash :SimbadFlash,
			NEDFlash : NEDFlash,
			showXMMDesciption : showXMMDesciption,
			bindToFade :bindToFade,
			displayCatalog : displayCatalog,
			cleanCatalog : cleanCatalog,
			displayVizierCatalog : displayVizierCatalog,
			showDetail : showDetail,
			storeCurrentState : storeCurrentState,
			colorFadeOut : colorFadeOut,
			colorFadeIn : colorFadeIn,
			displayTarget : displayTarget,
			//addCatalogInSelector : addCatalogInSelector,
			//addPositionInSelector : addPositionInSelector,
			//hideXMMFlash : hideXMMFlash,
			getCurrentView: getCurrentView,
			setReferenceView: setReferenceView,
			//displayCatalogFiltered:  displayCatalogFiltered,
			updateColorOfCatalog :updateColorOfCatalog,
			updateShapeOfCatalog :updateShapeOfCatalog,
			updateSizeOfCatalog :updateSizeOfCatalog,
			showColorMap : showColorMap,
			reselectSource : reselectSource
	};
	return retour
	
}();



//<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div>



console.log('=============== >  AladinLite_v.js ');

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

function AladinLite_mvC(aladinView, controllers){
	this.modules = {};
	this.aladinView = aladinView;
	if (controllers.historic != undefined ){
		this.modules.historicModel = controllers.historic.model;
	}
    if (controllers.regionEditor != undefined ){
	    this.modules.regionEditorView = controllers.regionEditor.view;
    }
    if (controllers.hipsSelector != undefined ){
	    this.modules.hipsSelectorModel = controllers.hipsSelector.model;
    }


}

AladinLite_mvC.prototype = {
		
		bookMark: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.bookMark(aladinLiteView);
			else 
				return null;
		},
		
		deleteHistory : function(id){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.deleteHistory(id );
			else
				return null;
		},
		
		getHistory: function(aladinLiteView){
			if( this.modules.historicModel != undefined )
				return this.modules.historicModel.getHistory(aladinLiteView);
			else 
				return null;
		},

		
		editRegion: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.init();
			else
				return null;
		},
		
		closeEditor: function(){
			if(this.modules.regionEditorView != undefined) 
				this.modules.regionEditorView.setBrowseMode();
			 else
				return null;
		},
		
		setInitialValue: function(points){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setInitialValue(points);
			else
				return null;
		},
		
		cleanPolygon: function(){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.clean();
			else
				return null;
		},
		
		setPoligon: function(region){
			if(this.modules.regionEditorView != undefined)
				return this.modules.regionEditorView.setPoligon(region);
			else
				return null;
		},
		
		restoreViewById: function(viewId){
			if(this.modules.historicModel != undefined)
				return this.modules.historicModel.restoreViewById(viewId);
			else
				return null;
		},
		
		searchHips: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchHips(mask, aladinLiteView);
			else
				return null;			
		},
		buildHipsTab: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.buildHipsTab(aladinLiteView);
			else
				return null;
		},
		
		getSelectedHips: function(ID){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedHips(ID);
			else
				return null;
		},

		searchCataloge: function(mask, aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.searchCataloge(mask, aladinLiteView);
			else
				return null;
		},
		
		buildCataTab: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.buildCataTab(aladinLiteView);
			else
				return null;
		},
		
		getSelectedCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.getSelectedCatalog(obs_id);
			else
				return null;
		},
		storeCurrentCatalog: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.storeCurrentCatalog(obs_id);
			else
				return null;
		},

		deleteCatalogInTab: function(i){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.deleteCatalogInTab(i);
			else
				return null;
		},
		createCatalogSelect: function(obs_id){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.createCatalogSelect(obs_id);
			else
				return null;
		},
		
		displaySimbadCatalog: function(){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displaySimbadCatalog();
			else
				return null;
		},
		
		displayNedCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayNedCatalog(aladinLiteView);
			else
				return null;
		},
		
		restoreCatalog: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.restoreCatalog(aladinLiteView);
			else
				return null;
		},
		
		currentCatalogTab: function(catalogDisplayed){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.currentCatalogTab(catalogDisplayed);
			else
				return null;
		},
		
		displayDataXml: function(aladinLiteView){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.displayDataXml(aladinLiteView);
			else
				return null;
		},
		
		
		updateCatalogs: function(aladinLiteView, state){
			if(this.modules.hipsSelectorModel != undefined)
				return this.modules.hipsSelectorModel.updateCatalogs(aladinLiteView,state);
			else
				return null;
		}
		
		
}
console.log('=============== >  AladinLite_c.js ');

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
function Historique_Mvc(contextDivId, aladinLite_V){
	this.that = this;
	this.aladinLite_V = aladinLite_V;
	this.mark_tab = [];
	this.view = new Historique_mVc(this, contextDivId,aladinLite_V);
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.idCounter=0;
	this.hips_tab = [];
	this.position_tab = [];
}

Historique_Mvc.prototype = {
		bookMark : function(position){
			// we create a copy of the position object, as its attributes might be updated
			var positionCopy = jQuery.extend(true, {}, position);
			positionCopy.comment = "";
			if(positionCopy.target.length > 0){
				for(var i = 0;i<positionCopy.target.length;i++){
					positionCopy.target[i].ct = null//To save locally, we need to take off the ct reference because it's a circular structure
				}
			}
		//	var positionCopyClone = deepClone(positionCopy);//transform the function to string by deepClone, without this the functions can't be transported by stringify
			var positionCopyStr = JSON.stringify(positionCopy);
			var date = 'alix:'+new Date();//as the unique key for each bookmark in localstorage
			try{
				//save an bookmark locally
			localStorage.setItem(date,positionCopyStr);}
			//When the memory is not enough for another bookmark ,alert and propose to clear all the bookmarks
			catch(error){
				var _lsTotal = 0, _xLen, _x; var log = [];
				var message = 'Sorry. There\'s no more memory to save the new bookmark,you can delete some bookmarks in the list,or do you want to clear all the storage?'
				log.push(message);
				for (_x in localStorage) { 
					_xLen = (((localStorage[_x].length || 0) + (_x.length || 0)) * 2); 
					_lsTotal += _xLen; log.push(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
				}; 
					log.push("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
				if(confirm(log.join("\n"))){
					if(confirm("Do you really want to delete all the storage?")){
							localStorage.clear();
						}
					}
				}
		  
			console.log("@@@@@@@@@Item storaged locally");
			this.mark_tab.unshift(positionCopy);    //add the element at top of the list
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//if(this.contextDiv.height() > 100){
			return this.view.drawContext(position);
			//}
		},
		
		/**
		 * clean the repetition of the elements in a list and return the list organized
		 */
		cleanRepetition : function(tab){
			var new_tab = [];
			for(var i=0 ; i<tab.length; i++) {
				var repeat = false;
				for(var j=0 ; j<new_tab.length; j++){
					if(new_tab[j] == tab[i].survey.ID){
						repeat = true;
						break;
					}
				}
			if(repeat!=true){
				new_tab.push(tab[i].survey.ID)
			}
			}
			return new_tab;
		},
		
		getHistory : function(){
			return this.view.drawContext();			
		},
		
		restoreView : function(aladinLiteView){
			return this.aladinLite_V.restoreView(aladinLiteView);
		},
		/*
		 * delete the element of the list , we find the position of element by its attribute id
		 */
		deleteHistory : function(htmlId){		
			//this.mark_tab.splice(this.findIdPosition(htmlId), 1);
			var key = localStorage.key(htmlId);
			localStorage.removeItem(key);
			return this.view.drawContext();
		},
		
		restoreViewById : function(htmlId){
			var view = getAladinLiteView(htmlId);
			return view;
			//return this.mark_tab[this.findIdPosition(htmlId)];		
		},	
		findIdPosition : function(id){
			for(var i=0;i<this.mark_tab.length;i++){
				if(this.mark_tab[i].id == id){
					break;
				}
			}
			return i;
		}
		/*getKeyById : function(id){
			var key = localStorage.key(id);
			return key;
		}*/
	
		
}
//deep clone an object who contains the object and transform the functions into string
var deepClone = function(data) { //avoid error : "Historique_m.js:42 Uncaught TypeError: Converting circular structure to JSON"
	var type = judgeType(data);      
	var obj;      
	if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {    // No deeper clone
    return data;
  }  ;
 if (type === 'array') {        // eslint-disable-next-line
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {        // Copy the functions of prototype
    // eslint-disable-next-line
    for (var key in data) {
     if (judgeType(data[key]) == 'function') {        // eslint-disable-next-line
    	  obj[key] = data[key].toString();
    	  }else{
    		  obj[key] = deepClone(data[key]);
    	  }
    }
  } ;     return obj;
};
var judgeType = function(obj) {  
  var toString = Object.prototype.toString;  
  var map = {        '[object Boolean]': 'boolean',        '[object Number]': 'number',        '[object String]': 'string',        '[object Function]': 'function',        '[object Array]': 'array',        '[object Date]': 'date',        '[object RegExp]': 'regExp',        '[object Undefined]': 'undefined',        '[object Null]': 'null',        '[object Object]': 'object'
  };      if (obj instanceof Element) {        return 'element';
  }      return map[toString.call(obj)];
}




console.log('=============== >  Historique_m.js ');

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


var Historique_mVc = function(model, contextDivId,aladinLite_V){
	this.that = this;
	this.model = model;
	this.contextDivId = contextDivId;
	this.contextDiv = null;
	this.aladinLite_V = aladinLite_V;
}

Historique_mVc.prototype = {
		drawContext : function(){
			var self = this;
			var vide = true;
			if( this.contextDiv == null ) {
				this.contextDiv  = $('#' + this.contextDivId);
			}
			//take the data in localstorage and show the list of marked history  
			var html = '<ul id = "history_ul" style="padding-left:18px;">';
			console.log("@@@@@@@@localStorage.length="+localStorage.length);
			for(var key in localStorage){
				console.log("Localstorage key="+key)	
			}
			deleteAllObjs();
			for (var k=0 ; k<localStorage.length; k++) {
				var key = localStorage.key(k);
				//the unique key is the time and date when the bookmark is saved
				if(key.startsWith('alix:')){		
				var ItemStr = localStorage.getItem(key);
				var Item = JSON.parse(ItemStr);
				Item.id = k;
				//Create the new aladinliteview according to the bookmark to have the functions in the prototype 
				var ItemFinal = setAladinLiteView(Item,key);
				if(ItemFinal.survey!= undefined){
					//localStorage.setItem(key,Item);
					console.log("//"+ItemFinal.survey.obs_title);
				//var obs_title = Item.survey.obs_title;
					
				//version1//html += "<li style='list-style-type: none;padding-top:5px;'>"+Item.getHTMLTitle(k,Item)+ "</li>";
				//version2//html += "<li style='list-style-type: none;padding-top:5px;'>"+eval('('+Item.getHTMLTitle+')').call(Item)+ "</li>";
				html += "<li style='list-style-type: none;padding-top:5px;'>"+ItemFinal.getHTMLTitle()+ "</li>";
				html += "<div id='description_"+ k + "' style='display: none;'><span>Position: "
					  + ItemFinal.ra + ", " 
					  + ItemFinal.dec + "</span><br><span>Fov: " 
					  + ItemFinal.fov + "</span><br><span>Survey: "
					  + ItemFinal.survey.obs_title + "</span><p style='font-size:small;line-height: 1em;font-weight:100;color:#000000;'>"
					  + ItemFinal.survey.obs_description + "</p>"
					  + this.displayCataDescription(ItemFinal.catalogTab) +"</div>";
				vide = false;
			
			}}
			}
			if(vide == true){
				html += "<p style='color:#1f252b;text-align:center'>No bookmark restored</p>";
			}
			html += '</ul>';
			this.contextDiv.html(html);
			
//			this.contextDiv.find('ul').on('click', 'li', function(e) {
//				e.stopPropagation(); 
//				
//				var idx = $(this).index();
//				var aladinLiteView= new AladinLiteView();
//				aladinLiteView.name = self.model.mark_tab[idx].name;
//				aladinLiteView.ra = self.model.mark_tab[idx].ra;
//				aladinLiteView.dec = self.model.mark_tab[idx].dec;
//				aladinLiteView.fov = self.model.mark_tab[idx].fov;
//				aladinLiteView.survey = self.model.mark_tab[idx].survey;
//				aladinLiteView.region = self.model.mark_tab[idx].region;
//				self.model.restoreView(aladinLiteView);	
//				
//				
//			});
			
			//Add handlers for each bookmark  
			for(var k=0 ; k<localStorage.length; k++){
				var ItemFinal = getAladinLiteView(k);
				if( ItemFinal){
				ItemFinal.setHandlers();
				$("#" + k +"_menu_show_description").click(function(e){
					$("#description_" + this.id.replace("_menu_show_description","")).slideToggle();
					e.stopPropagation();
				});
				}
			}
			
			
		},
		
		displayCataDescription: function(catalogTab){
			var str = "";
			if(catalogTab.length > 0){
				str += "<span>Catalog: <br>"
				for(var i=0;i<catalogTab.length;i++){
					str+=catalogTab[i].catalog + ",  ";
				}
				str +="</span>";
			}
			return str;
			
		}
}






console.log('=============== >  Historique_v.js ');

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
 * Author Gerardo Irvin Campos yah
 */

function RegionEditor_Mvc(points, handler, canvas, canvaso, aladinView){

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
}

RegionEditor_Mvc.prototype = {

		DrawNode: function (data){
			for(var i in data)
			{
				this.context.beginPath();
				this.context.arc(data[i].cx, data[i].cy, data[i].r, 0, Math.PI * 2,true);     	      
				this.context.fillStyle = "blue";
				this.context.fill();
				this.context.stroke();	 
				this.context.closePath();	  
			} 	     
		},

		//Drawn Line
		DrawnLine: function (startingNode,x,y,result) {
			if(result != null)
			{					
				this.context.beginPath();
				this.context.lineCap="round";

				for(var i in this.node)
				{
					if(this.node[result.N] == i)
						this.context.moveTo(this.node[result.N].cx,this.node[result.N].cy);

					this.context.lineTo(this.node[i].cx,this.node[i].cy);				
				}					

				this.context.closePath(); 
				this.context.strokeStyle = 'lime';
				// this.context.lineWidth = 3;
				this.context.stroke();	
			}
			else
			{
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
				this.context.beginPath();
				this.context.lineCap="round";
				this.context.moveTo(this.node[startingNode].cx,this.node[startingNode].cy);		
				this.context.lineTo(x,y);
				this.context.closePath(); 
				this.context.strokeStyle = 'lime';
				//this.context.lineWidth = 3;
				this.context.stroke();
			}
		},

		//this.Redrawn line and this.node
		Redrawn : function (result)
		{				
			this.CanvasUpdate();
			for(var i in this.node)
			{
				this.context.beginPath();
				this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
				this.context.fillStyle = "red";
				this.context.fill();
				this.context.stroke();	 
				this.context.closePath();	        	    
			} 		

			this.DrawnLine(0,0,0,result);
		},	

		//Clean the this.canvas
		CanvasUpdate : function ()
		{
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.contexto.drawImage(this.canvas, 0, 0);
		},

		//Convert a Array to Object
		ArrayToObject: function (data)
		{
			var NodeTemp = [];
			for( var i in data)
			{
				NodeTemp.push
				(
						{
							cx: data[i][0],
							cy: data[i][1],
							r:5
						}
				);
			}

			this.node=[];
			this.node = NodeTemp;
		},

		//Fuction pour obtenir le hautor du polygon
		GetHeight: function (array)
		{		
			var Ramax = null, Ramin = null;
			var finaltemp;
			var largeur;

			for( var i in array)
			{
				temp = array[i][0];        	

				if(Ramax == null)
				{
					Ramax = temp;
				}
				else if(temp >= Ramax)
				{
					Ramax = temp;
				}

				if(Ramin == null)
				{
					Ramin = temp;
				}
				else if(temp <= Ramin )
				{
					Ramin = temp;
				}
			}

			largeur = (Ramax -Ramin);

			if(largeur > 180)
			{
				largeur = 360 - largeur;
			}

			return { ramax: Ramax, ramin: Ramin , largeur: largeur  };
		},

		//function pour obtenir le numero de segment et construir un segment
		NumeroSegmen : function ()
		{	
			var TotalNodes = this.node.length;		
			var segmentoini, segmentofin;	
			var total = [];

			for(var j=0; j<this.node.length; j++)
			{
				if(segmentoini == undefined)
					segmentoini = j;
				else if(segmentofin == undefined){
					segmentofin = j; 
				}

				if(segmentoini != undefined && segmentofin != undefined)
				{
					total.push
					({
						A: segmentoini,
						B: segmentofin
					});

					segmentoini = segmentofin;
					segmentofin = undefined;
				}
			}

			total.push
			({
				A: (this.node.length  - 1),
				B: 0
			});

			//console.log('total: ' + total.length);
			return total;
		},

		//function pour obtenir le hauteur de un polygone
		GetWidth: function (array)
		{		
			var Decmax = null, Decmin = null;	
			var temp;
			var width;

			for( var i in array)
			{
				temp = (array[i][1]);        	

				if(Decmax == null)
				{
					Decmax = temp;
				}
				else if(temp >= Decmax)
				{
					Decmax = temp;
				}

				if(Decmin == null)
				{
					Decmin = temp;
				}
				else if(temp <= Decmin )
				{
					Decmin = temp;
				}
			}

			width = (Decmax - Decmin);

			if(width > 180)
			{
				width = 360 - width;
				//console.log('width 360');
			}

			return { decmax: Decmax, decmin: Decmin , width: width  };
		},

		//function para crear una grafica en el this.canvas
		DrawGrafic: function (canvas1)
		{
			var canvasgraf =  canvas1;
			var ancho = canvasgraf.width;
			var alto = canvasgraf.height;

			var contextGrafic = canvasgraf.getContext('2d');
			var contador = 20;
			var contador2 = 20;

			//console.log("ancho: " + ancho);
			//console.log("alto: " + alto);

			for(var i =0; i < alto ; i++)
			{

				this.contextGrafic.beginPath();

				if(i === 0)
				{
					this.contextGrafic.moveTo( i + 20 , 10);
					this.contextGrafic.lineTo( i + 20, alto);
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.font = "bold 8px sans-serif";
					this.contextGrafic.fillText("0",i + 15 , 20);
				}
				else 
				{
					this.contextGrafic.moveTo( i + contador , 20);
					this.contextGrafic.lineTo( i + contador , alto);
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.font = "bold 8px sans-serif";
					this.contextGrafic.fillText(i,(i+contador)-3 , 20);
				}

				this.contextGrafic.closePath(); 
				this.contextGrafic.strokeStyle = 'yellow';
				//this.context.lineWidth = 3;
				this.contextGrafic.stroke();	

				contador = parseInt( contador + 20);

			}

			for(var i =0; i < ancho ; i++)
			{

				this.contextGrafic.beginPath();
				this.contextGrafic.lineCap="round";

				if(i === 0)
				{
					this.contextGrafic.moveTo( 12 , i + 20 );
					this.contextGrafic.lineTo( ancho , i + 20);	
				}
				else 
				{
					this.contextGrafic.moveTo( 12  , 0 + contador2);
					this.contextGrafic.lineTo( ancho , 0 + contador2);
					this.contextGrafic.font = "bold 8px sans-serif";		     
					this.contextGrafic.fillStyle="black";
					this.contextGrafic.fillText(i, 3, (0+ contador2)+3);
				}

				this.contextGrafic.closePath(); 
				this.contextGrafic.strokeStyle = 'brown';
				//this.context.lineWidth = 3;
				this.contextGrafic.stroke();	
				contador2 = parseInt( contador2 + 20);	    	       
			}  
		},

		isEmpty: function()
		{
			if(this.node.length == 0)
				return true;		
			else
				return false;
		},

		//function que permet de ajouter this.nodes
		addNode: function(x, y,startingNode,polygonestatus)
		{					
			if(polygonestatus)
			{
				var newNode = {};
				var lastnode = {};
				var position = parseInt(startingNode[0].position);

				newNode.cx = startingNode[0].cx;
				newNode.cy = startingNode[0].cy;
				newNode.r = startingNode[0].r;

				if(this.node.length === position)
				{				
					lastnode.cx = this.node[(this.node.length -1)].cx;
					lastnode.cy = this.node[(this.node.length -1)].cy;
					lastnode.r = 5;

					//agregar el nodo
					this.node.splice((this.node.length -1), 1 , lastnode,newNode);				
				}
				else
				{
					lastnode.cx = this.node[startingNode[0].position].cx;
					lastnode.cy = this.node[startingNode[0].position].cy;
					lastnode.r = 5;

					//agregar el nodo
					this.node.splice(startingNode[0].position, 1 ,newNode, lastnode);
				}														
				this.Redrawn(0);
			}
			else
			{
				var flag = typeof(startingNode);
				if(flag != "object")
				{
					if(startingNode == 0 && this.node.length > 1)
					{		
						this.node.unshift
						(
								{
									cx: x,
									cy: y,
									r: 5	                            
								}
						);
					}
					else
					{
						this.node.push
						(
								{
									cx: x,
									cy: y,
									r: 5            
								}
						);
					}
					this.DrawNode(this.node);
				}	
				else
				{

					if(startingNode != undefined /*&& startingNode.B != undefined*/)
					{					
						var addnode ={};
						var preview ={};					

						preview.cx = startingNode.segmento.xA;
						preview.cy = startingNode.segmento.yA;
						preview.r = 5;

						addnode.cx = x;
						addnode.cy = y;
						addnode.r = 5;

						this.node.splice(startingNode.segmento.segmento, 1 , preview , addnode);
						var renode =  this.node;
						this.Redrawn(0);

					}
				}			          		         
			}

			//console.log('this.node add: ' + this.node.length);        
		},

		//function que permet obtener le numero de this.node
		getNode: function(x,y)
		{
			var dx=0 ;
			var dy=0 ;
			var result = 0;

			for(var i in this.node)
			{	             
				dx = x - this.node[i].cx;
				dy = y - this.node[i].cy;  
				//var result =Math.sqrt(dx * dx + dy * dy);
				var result = dx * dx + dy * dy;

				if(result <= 25)
				{	    
					//console.log('i: ' + i);
					return i;	
				}
			}
			return -1;
		},

		//function pour obtenir les deux this.nodes qui forme un segment
		getSegment: function(clickedNode)
		{		
			var pointA=0 ,pointB=0;

			if(clickedNode == 0)
			{		
				//console.log('nodo 0');
				pointA = (parseInt(clickedNode) +1);
				pointB = (this.node.length -1);
			}
			else if(clickedNode == (this.node.length -1))
			{			
				//console.log('nodo final:' + (this.node.length -1));
				pointA = parseInt((this.node.length -1) -1);
				pointB = 0;			
			}
			else if(clickedNode != 0 && clickedNode != (this.node.length -1))
			{	
				//console.log('otro this.node');
				pointA = (parseInt(clickedNode)+1);
				pointB = (parseInt(clickedNode)-1);			
			}
			return {A :pointA, B:pointB, N:clickedNode};
		},

		//function pour effacer le this.canvas
		canvasUpdate: function()
		{		
			this.contexto.drawImage(this.canvas, 0, 0);
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		},

		//function pour diseigner les lignes
		drawHashline: function(startingNode,x,y)
		{						
			this.DrawnLine(startingNode,x,y);	   	   					
		},	

		//function pour effacer un ligne
		CleanLine: function()
		{	
			//this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		//function pour savoire si un this.node es un extemite
		isExtremity: function(clickedNode)
		{
			if(clickedNode == 0 || clickedNode == (this.node.length -1))
			{		
				return true;								
			}				
			return false;

		},

		//function que permet de fermer un polygon
		closePolygone: function(clickedNode , startingNode)
		{		
			if(clickedNode == startingNode)
			{
				return false;	
			}
			else if(clickedNode == 0 && startingNode == (this.node.length -1))
			{		
				for(var i in this.node)
				{
					this.context.beginPath();
					this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
					this.context.fillStyle = "red";
					this.context.fill();
					this.context.stroke();	 
					this.context.closePath();	  		        
				}  
				return true;
			}
			else if(clickedNode == (this.node.length -1) && startingNode == 0 )
			{			
				for(var i in this.node)
				{
					this.context.beginPath();
					this.context.arc(this.node[i].cx, this.node[i].cy, this.node[i].r, 0, Math.PI * 2,true);     	      
					this.context.fillStyle = "red";
					this.context.fill();
					this.context.stroke();	 
					this.context.closePath();	  		        
				} 
				return true;
			}			
			return false;
		},

		//function pour bouger un this.node et ses deux segments de le poligone
		Drag: function(clickedNode, x,y,result)
		{
			var segmentfirst;
			var segmentlast;
			var flag;
			var resultado = [];								

			//set new values
			this.node[clickedNode].cx = x;
			this.node[clickedNode].cy = y;	

			this.node[result.N].cx = x;
			this.node[result.N].cy = y;					

			this.Redrawn(result);		
		},

		//function pour garder les valeur de alafin lite et les convertir en valeurs de this.canvas("pixel")
		almacenar: function()
		{			
			//console.log('mesage this.almacenar');
			//console.log('this.skyPositions: ' + this.skyPositions);
			if(this.skyPositions != null)
			{
				//console.log('this.skyPositions' + this.skyPositions);
				//console.log('this.node' + this.node);					
				this.node = [];
				this.skyPositions.pop();

				for (var k=0; k<this.skyPositions.length; k++) 
				{
					this.node.push(this.aladinView.world2pix
							(
									this.skyPositions[k][0], 
									this.skyPositions[k][1]								
							));								
				}	

				this.ArrayToObject(this.node);

				//console.log('this.node: ' + typeof(this.node));
				/*for( var i in this.node)
				{	
					console.log('i : ' + i);
					console.log('this.node x: ' + this.node[i].cx);
					console.log('this.node y: ' + this.node[i].cy);				
				}*/

				this.Redrawn(this.node);	
			}

		},		

		//function pour effacer le poligone de this.aladin lite quand passe a mode edition
		DeleteOverlay :  function()
		{
			if (this.overlay != null) 
			{			 	      
				//console.log('this.skyPositions: ' + this.skyPositions);
				//console.log('A: ' + typeof(A));
				this.overlay.addFootprints(A.polygon(this.skyPositions));
				this.overlay.removeAll();
				this.overlay.overlays = [];
				//console.log('this.overlay' + this.overlay);			           
			}	        	 
		},

		//function pour obtenir les valeurs de le polygon et creer le polygon en adalin lite
		recuperar: function()
		{
			/*
			 * When the position are set from outside, the node remains empty while there is edition action.
			 *  So if the user want to get back the polygoene without editing it, we have to cancel this method
			 */
			if( this.node && this.node.length == 0 && this.skyPositions && this.skyPositions.length > 0 ) {
				return ;
			}
			//console.log('this.node1: ' + this.node.length);

			//console.log('this.node.length: ' + this.node.length);
			this.skyPositions = [];		 
			for (var k=0; k<this.node.length; k++) {
				//this.skyPositions.push(this.aladin.pix2world(this.node[k][0], this.node[k][1]));
				this.skyPositions.push(this.aladinView.pix2world(this.node[k].cx, this.node[k].cy));
			};
			//finalthis.node
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});

				this.aladinView.addOverlayer(this.overlay);
        }
			this.overlay.removeAll();	
			this.overlay.addFootprints([A.polygon(this.skyPositions)]);
		},

		//function pour obtenir les valeurs de le polygon et creer le polygon en adalin lite
		setPolygon: function(points)
		{
			this.skyPositions = [];		 
			for( var k=0 ; k<points.length ; k++){
				this.skyPositions.push(points[k]);			
			}
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});
				this.aladinView.addOverlayer(this.overlay);
			}
			this.overlay.removeAll();	  
			this.overlay.addFootprints([A.polygon(this.skyPositions)]);//créer la polygon
			//this.PolygonCenter();
		},
		setOverlay: function(points)
		{
			if (this.overlay==null) {
				this.overlay = A.graphicOverlay({color: 'red'});
				this.aladinView.addOverlayer(this.overlay);
			}
			this.overlay.removeAll();	  
		},
		//function pour effacer le poligone de this.canvas
		CleanPoligon: function()
		{
			this.CanvasUpdate();
			this.node = [];
			this.skyPositions= [];
			//console.log('this.node delete: ' + this.node.length);		
		},

		//trouver le polygon en adalin lite si on se trouve en otre part du universe
		PolygonCenter: function()
		{	
			var view = BasicGeometry.getEnclosingView(this.skyPositions);
			this.aladin.gotoPosition(view.center.ra, view.center.dec);
			this.aladin.setZoom( 1.2*view.size );
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
		},

		//effacer un this.node de le polygone si se trouve sûr autre this.node
		RemoveNode: function(nodevalue,status)
		{
			var index = this.node[nodevalue];

			if(this.node.length >= 4)
			{			
				this.node.splice(nodevalue,1);
				if(status)
				{
					this.DrawNode(this.node);
				}else
				{
					this.Redrawn(0);
				}

			}
		},

		//function pour obtenir le this.node initial et final du polygon
		GetXYNode: function(x,y)
		{
			var nodes={};        

			var dx;
			var dy;
			
			for(var i in this.node)
			{	         
				//console.log('this.nodenum:  ' + i);
				//console.log('cx: ' + this.node[i].cx);
				//console.log('cy: ' + this.node[i].cy);
				dx = x - this.node[i].cx;
				dy = y - this.node[i].cy;  
				//var result =Math.sqrt(dx * dx + dy * dy);
				var result = dx * dx + dy * dy;

				if(result <= 25)
				{	                	
					if(nodes.a == undefined)
					{
						nodes.a = i;
					}
					else 
					{
						nodes.b = i;
					}            		            		
				}                      
			}

			return nodes;
		},

		//metodo que debuelve el numero de nodos del poligono
		GetNodelength: function()
		{
			return this.node;
		},

		//crear la grafica
		createGrafic: function(parametre)
		{
			this.DrawGrafic(parametre);
		},

		//indicar cuando serrar poligono
		cuadradoIndicador: function(x,y)
		{	
			this.context.beginPath();
			this.context.fillRect(x,y,10,10);     	      
			this.context.fillStyle = "red";
			this.context.fill();
			this.context.stroke();	 
			this.context.closePath();
		},

		stokeNode: function(nodeposition)
		{
			if(nodeposition != undefined) 
				var stocknode = [];
				stocknode.push
				({
					position: nodeposition,
					cx:this.node[nodeposition].cx,
					cy:this.node[nodeposition].cy,
					r:5
				});

				return stocknode;
			
		},
		getSkyPositions: function() {
			return this.skyPositions;
		}
}

console.log('=============== >  RegionEditor_m.js ');

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
 * Author Gerardo Irvin Campos yah
 */ 

function RegionEditor_mVc(aladinLite_V, parentDivId, contextDivId, handler,/* points,*/ defaultRegion){
	this.parentDivId = parentDivId;
	this.drawCanvas = null; // canvas where the polygon is drawn
	this.drawContext = null;
	this.lineCanvas = null; // canvas where the moving lines are drawn
	this.lineContext = null;
	this.controller = null;
	this.points = null // Initial values
	this.clientHandler = (handler == null) ? function(){alert("No client handler registered");}: handler;
	this.contextDivId = contextDivId;
	this.contextDiv  = null;
	this.sousContextDiv = null;
	this.parentDiv  = null;
	this.aladinLite_V = aladinLite_V;
	//this.defaultRegion = defaultRegion;
	this.editionFrame = defaultRegion;
} 
var browseSaved = null;
RegionEditor_mVc.prototype = {
		init: function (){	
			
			var self = this;
			if( this.parentDiv == null )
				this.parentDiv = $('#' + this.parentDivId);
		 	if( this.contextDiv == null )
				this.contextDiv  = $('#' + this.contextDivId);	
			this.contextDiv.append('<div id= "RE_context" style = "display:inline"></div>');
			/*if( this.sousContextDiv == null ){
				this.sousContextDiv  = $('#RE_context');
			}*/
			//this.parentDiv.css("position", "relative");
			// création du canvas pour éditeur régions
			/*
			 * Be cautious: the canvas context must be taken before the canvas is appended to the parent div, otherwise the geometry is wrong. 
			 */
			var that = this;
			if(!AladinLiteX_mVc.regionEditorInit){
			this.lineCanvas = $("<canvas id='RegionCanvasTemp' class='editor-canvas'></canvas>");
			this.lineCanvas[0].width = this.parentDiv.width();
			this.lineCanvas[0].height = this.parentDiv.height();
			this.lineContext = this.lineCanvas[0].getContext('2d');	        
			this.parentDiv.append(this.lineCanvas);
			this.lineCanvas.css('z-index', '100');
			this.lineCanvas.css('position', 'absolute');
			this.lineCanvas.hide(); 

			/*
			 * Canvas pour les traces temporaires
			 */
			this.drawCanvas = $("<canvas id='RegionCanvas' class='editor-canvas' ></canvas>");
			this.drawCanvas[0].width = this.parentDiv.width();
			this.drawCanvas[0].height = this.parentDiv.height();
			this.drawContext = this.drawCanvas[0].getContext('2d');
			this.parentDiv.append(this.drawCanvas);
			this.drawCanvas.css('z-index', '101');
			this.drawCanvas.css('position', 'absolute');
			this.drawCanvas.hide(); 


			this.controller = new RegionEditor_mvC({/* "points": this.points,*/ "handler": this.clientHandler, "canvas": this.drawCanvas, "canvaso": this.lineCanvas, "aladinView": this.aladinLite_V});
			/*
			 * The controller function is wrapped in a function in order to make it working in the context of the controller object
			 * and not of he HTML widget
			 */
			this.drawCanvas[0].addEventListener('mousedown', function(event) {/*console.log("down");*/ that.controller.mouseDown(event);}, false);
			this.drawCanvas[0].addEventListener('mousemove',  function(event) {that.controller.mouseMove(event);}, false);
			this.drawCanvas[0].addEventListener('mouseup', function(event) {/*console.log("up");*/ that.controller.mouseUp(event);}, false);
			}
			/*----crear botones con jquery----*/
			/*var divButtons = $("<div id='RegionButtons' style=' width:"+ this.parentDiv.width() +'px' +" ';' '><div/>").appendTo("#" + this.parentDivId + "_button");        
			divButtons.css('background', 'gray');//'height:' "+ 200 +'px' +"';'
			divButtons.css('height', '70px');*/
			this.contextDiv.append('<p style="color:#1f252b;text-align:center">Region Editor Mode</p>')
			this.browseBtn = $("<button id='regionEditor_b' class='alix_browse_btn alix_btn'>Browse&nbsp;<i class='glyphicon glyphicon-check'></i></button>");
			this.contextDiv.append(this.browseBtn);
			this.browseBtn.css('margin-top','10px');
			this.browseBtn.css('margin-left','5px');
			this.browseBtn.css('font-weight',' bold');
			this.browseBtn.attr('disabled', 'disabled');
			this.browseBtn.click(function(event) {    
				if( !that.controller.isPolygonClosed() ){
					that.controller.CleanPoligon();
				} else {
					that.controller.recuperar();  
				}
				that.setBrowseMode();
				browseSaved = false;
				event.stopPropagation();
				that.aladinLite_V.reabledButton();

			});
			
			this.editBtn = $("<button id='regionEditor_e' class='alix_edt_btn alix_btn'>Edit&nbsp;<i class='glyphicon glyphicon-pencil'></i></button>");
			this.contextDiv.append(this.editBtn);
			this.editBtn.css('margin-top','10px');
			this.editBtn.css('margin-left','5px');
			this.editBtn.css('font-weight',' bold');
			this.editBtn.click(function(event) { 
				that.setEditMode();
				that.controller.DeleteOverlay()
				that.lineContext.clearRect(0, 0, that.lineCanvas[0].width, that.lineCanvas[0].height);            
				that.drawContext.clearRect(0, 0, that.drawCanvas[0].width, that.drawCanvas[0].height);
				that.controller.almacenar();
				that.aladinLite_V.disabledButton();
				event.stopPropagation();
			});

			this.effacerBtn = $("<button id='regionEditor_c' class=' alix_clear_btn alix_btn'>Clear&nbsp;<i class='glyphicon glyphicon-trash'></i></button>");
			this.contextDiv.append(this.effacerBtn);
			this.effacerBtn.css('margin-top','10px');
			this.effacerBtn.css('margin-left','5px');
			this.effacerBtn.css('font-weight',' bold');
			this.effacerBtn.click(function(event) {        	 
				that.controller.CleanPoligon();
				event.stopPropagation();
			});
			this.setBrowseMode();

			var buttonSet = $("<button id='regionEditor_a' class=' alix_accept_btn alix_btn'>Accept&nbsp;<i class='glyphicon glyphicon-share'></i></button>");
			this.contextDiv.append(buttonSet);
			buttonSet.css('margin-top','10px');
			buttonSet.css('margin-left','5px');
			buttonSet.css('font-weight',' bold');
			buttonSet.click(function(event) {
				that.controller.recuperar();  
				that.setBrowseMode();
				that.controller.invokeHandler(true);
				that.aladinLite_V.reabledButton();
//				if(that.contextDiv.height() > 100 ){
//					that.contextDiv.animate({height:'-=200px'},"fast");
//				}
				document.getElementById("region").disabled=false;
				browseSaved = true;
				event.stopPropagation();
			});
			if(!AladinLiteX_mVc.regionEditorInit){
			this.setInitialValue(self.defaultRegion);
			if( this.editionFrame ){
				this.setEditionFrame(this.editionFrame);
				this.setEditMode();
			}
			AladinLiteX_mVc.regionEditorInit = true;
			/**!!! To note the region editor has been initialized. 
			 * Avoid it being initialized the second time, 
			 *which make us can't edit the old polygon when we leave the regioneditor for a while .*/
			}

		},
		/**
		 * Operate the drawing removal from outside 
		 */
		clean: function() {
			//can be called from another button before the editor has been init 
			if( this.controller ) {
				this.controller.CleanPoligon();				
				this.setEditMode();
				this.controller.DeleteOverlay()
				this.lineContext.clearRect(0, 0, this.lineCanvas[0].width, this.lineCanvas[0].height);            
				this.drawContext.clearRect(0, 0, this.drawCanvas[0].width, this.drawCanvas[0].height);
				this.controller.almacenar();	       
				this.controller.recuperar();   
				this.setBrowseMode();
			}

		},
		/**
		 * Draws the editable frame in blue and center the view on it 
		 */
		setEditionFrame: function(points){
			if( points){
				this.editionFrame = points;
			}
			var x = null;
			if( this.editionFrame ){
				var pts = [];
				/*
				 * Extract region or position from SaadaQL statement
				 */
				if (this.editionFrame.type == "array") {
					x = this.parseArrayPolygon(this.editionFrame.value);
				} else if (this.editionFrame.type == "soda") {
					x = this.parseSodaPolygon(this.editionFrame.value);
				} else {
					alert("Polygone format " + points.type + " not understood");
				}
				if( x ){
					var view = BasicGeometry.getEnclosingView(x);
					this.aladinLite_V.gotoPosition(view.center.ra, view.center.dec);
					this.aladinLite_V.setZoom( 1.2*view.size );
					if( this.editionFrameOverlay == null ) {
						this.editionFrameOverlay = A.graphicOverlay({color: 'blue', name: "Editable Frame"});
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

		},
		/**
		 * Initalize the darw with the default parameter. If points contains a region, it is drawn, 
		 * if it just contain a position, AladinLite is centered on that position
		 * @param points  object denoting the initial value of the polygone : {type: ... value:} type is format of the 
		 * value (saadaql or array) and value is the data string wich will be parsed
		 */
		setInitialValue: function (points){
			/*
			 * Set the region passed by the client if it exists
			 */
			console.log(points)
			this.points = points;
			//this.controller.CleanPoligon();
			if( this.points ){
				var pts = [];
				/*
				 * Extract region or position from SaadaQL statement
				 */
				if( this.points.type == "saadaql") {
					var s = /"(.*)"/.exec(this.points.value);
					if( s.length != 2 ) {
						Modalinfo.error(this.points.value + " does not look like a SaadaQL statment");
						return;
					} else {
						if( this.points.value.startsWith("isInRegion")) {
							var ss = s[1].split(/[\s,;]/);
							for( var i=0 ; i<ss.length ; i++ ) {
								pts.push(parseFloat(ss[i]));
							}
						} else {
							var pos = s[1].replace(/:/g , " ");
							this.posField.val(pos);
							this.aladin.setZoom(0.55);
							this.aladin.gotoObject(pos);
						}
					}
				} else if (this.points.type == "array2dim") {
					pts = this.points.value;
				} else {
					alert("Polygone format " + this.points.type + " not understood");
					return;
				}

				this.setBrowseMode();
				this.controller.DeleteOverlay()
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

		},
		setBrowseMode: function() {
			this.editBtn.removeAttr('disabled');
			this.browseBtn.attr('disabled', 'disabled');   
			this.effacerBtn.attr('disabled', 'disabled');                      
			this.lineCanvas.hide();
			this.drawCanvas.hide();
		},
		setEditMode: function() {
			this.browseBtn.removeAttr('disabled');
			this.editBtn.attr('disabled', 'disabled');   
			this.effacerBtn.removeAttr('disabled');                
			this.lineCanvas.show();
			this.drawCanvas.show();
		},
		parseSodaPolygon: function (value){
		    var s = value.split(/\s+/);
			var x = null;
		    if( s[0].toUpperCase() != "POLYGON"){
				alert("Only SODA POLYGON are supported");
		    } else {
		    	s.shift();
				if( !s || (s.length%2) != 0 || s.length < 6 ) {
					alert("Even number of coordinates required (" + s.length + " values read)");
				} else {
					x = [];
					for(var i=0 ; i<(s.length/2) ; i++){
						x[x.length] = [parseFloat(s[2*i]), parseFloat(s[(2*i)+1])];
					}
					x.push(x[0]);
				}
		    }
		    return x;
		},
		parseArrayPolygon: function (value){
			var x = null;
			if( !value || (value.length%2) != 0 || value.length < 6 ) {
				alert("Even number of coordinates required");
			} else {
				x = [];
				for(var i=0 ; i<(value.length/2) ; i++){
					x[x.length] = [value[2*i], value[(2*i)+1]];
				}
				x.push(x[0]);
			}
		    return x;
		}


}


console.log('=============== >  RegionEditor_v.js ');

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
 * Author Gerardo Irvin Campos yah
 */
/**
 * @author michel
 *
 */

function  RegionEditor_mvC(params){

	this.polygonModel =  new RegionEditor_Mvc(params.points, params.handler, params.canvas, params.canvaso, params.aladinView);
	this.canvas = params.canvas; 	
	this.clientHandler = params.handler;
	this.startingNode= -1; 
	this.buttondown = false; 
	this.closed = false;	
	this.movestart = false;
	this.startdrag = false;
	this.drag = null;
	this.result = -1;
	this.stokeNode;
	var that = this;
}

RegionEditor_mvC.prototype = {
		getStatus: function() {
			 return "startingNode=" 
			        +this.startingNode + " buttondown=" 
			  		+ this.buttondown+ " closed=" 
			  		+ this.closed+ " movestart=" 
			  		+ this.movestart + " startdrag=" 
			  		+ this.startdrag + " drag=" 
			  		+ this.drag  + " result=" 
			  		+ this.result + " stokeNode=" 
			  		+ this.stokeNode
			  		;
		},
		/**
		 * TODO to be implemented
		 */
		checkPolygon : function(points) {
			return true;
		},
		/**
		 * 
		 */
		mouseDown : function(event) {
			var clickedNode = -1;
			var clickedSegment = -1;
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);
					
			//pregunta si el pologono esta vacio
			if( this.polygonModel.isEmpty()) 
			{
				this.polygonModel.addNode(x,y);			 
			}
			//obtener segmento
			
			//comenzar el this.drag del nodo		
			else if(this.closed == true && (clickedNode = this.polygonModel.getNode(x,y)) != -1)
			{
				//console.log('start this.drag');
				//console.log('clickedNode: ' + clickedNode);
				this.result = this.polygonModel.getSegment(clickedNode);
				this.stokeNode = this.polygonModel.stokeNode(clickedNode);
				this.startdrag = true;		
				this.drag = clickedNode;
				this.startingNode = clickedNode;		
				this.canvas.css('cursor','move');
			}
			//pregunta si el espacio presionado es un nodo 
			else if((clickedNode = this.polygonModel.getNode(x,y)) != -1 )
			{
				//pregunta si es una extremidad
				if(this.polygonModel.isExtremity(clickedNode) /*poligono abierto*/) 
				{			
					//pregunta estas abierto
					if(this.closed == true)
					{
						this.startingNode = -1;
						this.buttondown = false;	
					}
					else
					{
						this.startingNode = clickedNode;
						this.buttondown = true;					
						this.closed = false;
					}
				}							
			} 		
			
			//saber si estoy sobre un segmento
			if(this.closed && clickedNode == -1)
			{						
				var node = this.polygonModel.GetNodelength();	
						
				var Segmentos = new Segment(node);	
				var option = Segmentos.IsCursorOn(x,y);
				
				if(option != undefined)
				{
					if(option.flag == "vertical")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
					else if(option.flag == "horizontal")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
					else if(option.flag == "distancia")
					{
						//console.log("option: " + option.flag);
						this.polygonModel.addNode(x, y, option);
					}
				}						
			
			}
			
		},
		/**
		 * 
		 */
		mouseMove : function(event) {
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);
			//console.log("mouse move " + this.getStatus());
			//pregunta si el nodo fue presionado y si es un nodo
			if(this.buttondown == true  && this.startingNode != -1 )
			{
				//console.log ('this.drag');
				//console.log ('this.startingNode' + this.startingNode);
				this.movestart = true;
				this.polygonModel.drawHashline(this.startingNode,x,y,this.result);		
			}		
			else if(this.startdrag)
			{
				this.polygonModel.Drag(this.drag, x, y , this.result);
				
				//console.log('this.startdrag move');		
			}
			
//			var h2x = document.getElementById("idcoor");
//			h2x.innerHTML = 'X coords: '+x+', Y coords: '+y;
		},
		
		mouseUp: function(event) {
			var clickedNode = -1;
			var finalnode;
			var x = parseInt(event.pageX) - parseInt( this.canvas.offset().left).toFixed(1);
			var y = parseInt(event.pageY) - parseInt( this.canvas.offset().top).toFixed(1);		
		//pregunta nodo es presionado y es si es un nodo
			if(this.buttondown == true && (clickedNode = this.polygonModel.getNode(x,y)) != -1 )
			{		
				//pregunta si es un extremo
				if( this.polygonModel.isExtremity(clickedNode) == false) 
				{				
					this.polygonModel.CleanLine();				
					this.buttondown = false;
				}	
				
				//console.log('clickedNode: ' + clickedNode + ' this.startingNode: ' +  this.startingNode);
				if(this.polygonModel.closePolygone(clickedNode , this.startingNode) == true)
				{
					//console.log('this.closed polygon');					
					this.buttondown = false;	
					this.closed = true;
					//this.invokeHandler(false); if add this the length of skyPosition[] will be null
				
					//console.log('clickedNode: ' + clickedNode + ' this.startingNode: ' +  this.startingNode);							
				}
			} 
			
			if(this.closed == true && (finalnode = this.polygonModel.GetXYNode(x, y) ) != null)			
			{
				if(finalnode.a != undefined && finalnode.b != undefined)
				{
					//console.log('finalnode a: ' + finalnode.a + ' finalnode b: ' + finalnode.b);
					
					if(this.startingNode ==  finalnode.a)
						this.polygonModel.RemoveNode(finalnode.a,false);
					else if(this.startingNode ==  finalnode.b)
						this.polygonModel.RemoveNode(finalnode.b,false);
				}			
			}
					
			if(this.buttondown == true && this.movestart == true)
			{		
				if( clickedNode == this.startingNode && (clickedNode = this.polygonModel.getNode(x,y) != -1) )
				//if((clickedNode = this.polygonModel.getNode(x,y)) != -1)
				{											
					this.buttondown = false;		
					this.movestart = false;	
					this.polygonModel.CleanLine();							
				}				
				else
				{						
						this.polygonModel.addNode(x,y,this.startingNode);
						this.buttondown = false;		
						this.movestart = false;	
						
						var nodos = this.polygonModel.GetNodelength();					
						var Segmentos = new Segment(nodos);	
						var temp;
						
						var inter = Segmentos.Itersection(this.startingNode,false);
						
						if(inter != -1 && inter != undefined)
						{			
							//poligono abierto = true
							if(this.startingNode != 0)
								this.polygonModel.RemoveNode(inter.nB,true);
							else
								this.polygonModel.RemoveNode(inter.nA,true);
							
							this.polygonModel.CleanLine();
						}												
				}			
				
			}
			else if(this.buttondown == true && this.movestart == false)
			{			
				this.buttondown = false;		
				this.movestart = false;	
			}
			
			if(this.startdrag == true)
			{
				//console.log('this.startdrag fin');
				this.startdrag = false;
				this.canvas.css('cursor','default');
				
				//stoke le numero de noeud appuyer
				//this.startingNode;			
				
				var nodos = this.polygonModel.GetNodelength();					
				var Segmentos = new Segment(nodos);	
				var inter = Segmentos.Itersection(this.startingNode,true);			
				if(inter != -1 && inter != undefined)
				{						
					this.polygonModel.RemoveNode(this.startingNode, false);
					this.polygonModel.addNode(x, y, this.stokeNode,true);
					//console.log(inter.length);
				}
			}
			this.polygonModel.canvasUpdate();
		},
		
		almacenar : function()
		{
			this.polygonModel.almacenar();
		},
		
		recuperar : function()
		{
			this.polygonModel.recuperar();
		},
		
		DeleteOverlay : function() {
			this.polygonModel.DeleteOverlay();
		},
		
		CleanPoligon : function(){
			this.polygonModel.CleanPoligon();
			this.closed = false;
		},
		
		PolygonCenter : function(){
			this.polygonModel.PolygonCenter();
		},
	
		CreateGrafic : function(canvas){
			this.polygonModel.createGrafic(this.canvas);
		},
		
		show : function() {
			alert(this.polygonModel.getSkyPositions());
		},
		/**
		 * Set the polygone with points. Points is a simple array. It must have at 
		 * least 6 values (3pts) and an even number of points
		 * @param points  [a,b,c,.....]
		 * @returns {Boolean} true if the polygone is OK
		 */
		setPoligon : function(points) {
			this.polygonModel.setPolygon(points);
			this.closed = true;
			this.invokeHandler(false);
			return true;
		},
		/**
		 * Call the client handler when the polygine is close or when the user click on accept
		 * The data passed to the user handler look like that:
		    {isReady: true,             // true if the polygone is closed
		    userAction: userAction,     // handler called after the user have clicked on Accept
		    region : {
		        format: "array2dim",    // The only one suported yet [[x, y]....]
		        points: this.polygonModel.skyPositions  // array with structire matching the format
		        size: {x: , y:} // regiosn size in deg
		        }
		 */
		invokeHandler : function(userAction){
			if( this.isPolygonClosed() ){
				/*
				 * Compute the region size in degrees
				 */
				var view = BasicGeometry.getEnclosingView(this.polygonModel.skyPositions);
				this.clientHandler({isReady: true
					, userAction: userAction
					, region : {format: "array2dim"
						       , points: this.polygonModel.skyPositions
							   , size: {x: view.size, y: view.size}}});
			} else {
				alert("Polygon not closed");
			}
		},
		
		isPolygonClosed: function() {
			return ( this.closed || ( this.polygonModel.node == undefined || this.polygonModel.node.length == 0) );
		}
}

console.log('=============== >  RegionEditor_c.js ');

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
 * 
 * parentDivId="aladin-lite-div"
 * 
 */
//"use strict"
function HipsSelector_Mvc (parentDivId, aladinLite_V){
	this.tapSchemaQuery = "SELECT  TOP 100  tap_schema.tables.schema_name as schema, "
		+ "tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd "
		+ "FROM tap_schema.columns "
		+ "JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name "
		+ "WHERE tap_schema.columns.table_name = '{$CATID}'";
	this.productType = null;
	this.baseUrl = null
	this.imageIdPattern 	= new RegExp(/.*\/C\/.*/);
	this.imageTilePattern 	= new RegExp(/.*((jpeg)|(png)).*/);
	this.view = new HipsSelector_mVc(parentDivId, this);
	this.hips_dict = {};
	this.cata_dict = {};// les catalog trouveés 
	this.cata_tab = [];//pour stoker obs_id et afficher dans le panneau
	this.cata_created = {}; //tous les catalog qui a été crée par A.cata... et afficher dans aladin sont stoker comme objet cata 
	this.color = {};
	this.aladinLite_V = aladinLite_V;
}

HipsSelector_Mvc.prototype = {	
		searchHips : function(mask,aladinLiteView){
			var that = this;
			
			/**
			 * créer le lien url pour acces au serveur
			 */
			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			
			/**
			 * afficher le panel de la liste
			 */
			that.view.displaylistepanel();
			that.productType = "image";
			var url = this.baseUrl;
			if( mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
						if( that.productType == "image" ){
							for(var i = jsondata.length - 1; i >= 0; i--) {
								var keepIt = 0;
									if(  $.isArray(jsondata[i].hips_tile_format)) {
										for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
											if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
												keepIt = 1;
												break;
											}
										}
									} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
										keepIt = 1;
									}
								if( keepIt == 0 ){
									jsondata.splice(i, 1);
								}
							}
						}
					}

					that.storeHips(jsondata);
					that.view.displayHipsList(jsondata);
			});
		},
		
		storeHips : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.hips_dict[jsondata[i].ID]= jsondata[i];
			}
		},
		buildHipsTab: function(aladinLiteView){
			var that = this;
			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false";
			that.productType = "image";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
				if( that.productType != undefined ){
					for(var i = jsondata.length - 1; i >= 0; i--) {
						if(jsondata[i].dataproduct_type != that.productType ) {
							jsondata.splice(i, 1);
						}
					}
					if( that.productType == "image" ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							var keepIt = 0;
								if(  $.isArray(jsondata[i].hips_tile_format)) {
									for( var j=0 ; j<jsondata[i].hips_tile_format.length ; j++){
										if( that.imageTilePattern.test(jsondata[i].hips_tile_format[j]) ){
											keepIt = 1;
											break;
										}
									}
								} else if(  that.imageTilePattern.test(jsondata[i].hips_tile_format) ){
									keepIt = 1;
								}
							if( keepIt == 0 ){
								jsondata.splice(i, 1);
							}
						}
					}
				}
				that.storeHips(jsondata);
		});
			
		},
		getSelectedHips: function(ID){
			return this.hips_dict[ID];
		},
		
		/**
		 * la différence entre le cataloge et le hips est le 'productType'
		 */
		searchCataloge: function(mask,aladinLiteView){
			var that = this;

			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=100";

			that.view.displaylistepanel();
			that.productType = "catalog";
			var url = this.baseUrl;
			if( mask != undefined &&mask != "" ){
				url += "&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"  + mask + "*";
			}
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					that.storeCatalog(jsondata);
					that.view.displayCatalogeList(jsondata);
			});
		},
		//create the data_dict for the catalogs in the bookmarks and restore the catalogs in vizier_list
		buildCataTab : function(aladinLiteView){
			var that = this;

			this.baseUrl ="http://alasky.unistra.fr/MocServer/query?RA=" 
				+ aladinLiteView.ra + "&DEC=" + aladinLiteView.dec 
				+ "&SR=" + aladinLiteView.fov + "&fmt=json&get=record&casesensitive=false&MAXREC=200";

			that.productType = "catalog";
			var url = this.baseUrl;
			$.getJSON(url, function(jsondata) {
					if( that.productType != undefined ){
						for(var i = jsondata.length - 1; i >= 0; i--) {
							if(jsondata[i].dataproduct_type != that.productType ) {
								jsondata.splice(i, 1);
							}
						}
					}
					for(var i=0 ; i<jsondata.length ; i++){
						that.cata_dict[jsondata[i].obs_id]= jsondata[i];
					}
					//restore the catalogs : display in current view + display in vizier_list
					that.restoreCatalog(aladinLiteView);
					
			});
		},
		
		storeCatalog : function(jsondata){
			var self = this;
			for(var i=0 ; i<jsondata.length ; i++){
				self.cata_dict[jsondata[i].obs_id]= jsondata[i];
			}
			console.log(">>>>>>>>>>>>>>>>>getDataFromUrl"+self.cata_dict);
		},
		
		builTapQuery : function(obs_id){
			/*
			 * SELECT  TOP 100  tap_schema.tables.schema_name as schema, tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd
FROM tap_schema.columns
JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name
WHERE      tap_schema.columns.table_name = 'II/306/sdss8' 
			 */
			console.log(obs_id)
			var query = this.tapSchemaQuery.replace('{$CATID}', obs_id);
			console.log(query);
		    $.ajax({
		        url: 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync',
		        data: {"lang": "adql",
		        	"request" : "doQuery",
		        	"format": "json",
		        	"query": query},
		        method: 'GET',
		        async: false, // Mode synchrone

		        dataType: 'json',
		        success: function(response) {
		        	var schema = response.data[0][0] + ".'" + obs_id + "'";
		        	for( var i=0 ; i<response.data.length ; i++){
		        		if( response.data[i][3].startsWith('phot.mag;em')) {
		    				var mag_col = response.data[i][2];
		    				var query = "SELECT TOP 500 * FROM " + schema 
		    				+ " WHERE " + mag_col + " IS NOT NULL AND CONTAINS(POINT('ICRS', RAJ2000, DEJ2000), BOX('ICRS', @ra@, @$dec@, @$fov@, @$fov@)) = 1 " 
		    				+ " ORDER BY " + mag_col + " asc";
		    				query = 'http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync?lang=adql&request=doQuery&' 
		    					+ encodeURI(query).replace(/@ra@/g, '{$ra}').replace(/@dec@/g, '{$dec}').replace(/@fov@/g, '{$fov}');
		    				cata_dict[obs_id].tapProgUrl = query;
		    				break;
		        		}
		        				
		        	}
		        	console.log(response);
		        },
		        error: function(xhr, status, error) {
		        	WaitingPanel.warn(xhr.responseText);
		        }
		    });
		},
		
		getSelectedCatalog: function(obs_id){
			return this.cata_dict[obs_id];
		},
		
		/*storeCurrentCatalog:function(obs_id){
			var state=false;
			for(var i=0;i<this.cata_tab.length;i++){
				if(this.cata_tab[i]==obs_id){
					state = true
					break;
				}
			}
			if(state==false){
				//this.builTapQuery(obs_id)
				this.cata_tab.push(obs_id);
			}
		},*/
		
		deleteCatalogInTab: function(i){
			this.cata_tab.splice(i, 1);			
		},
		
		createCatalogSelect: function(obs_id){
			var self=this;
			return this.view.createCatalogSelect(obs_id,self.cata_dict);
		},
		
		displaySimbadCatalog: function(){
			return this.view.displaySimbadCatalog();
		},
		
		displayNedCatalog: function(aladinLiteView){
			return this.view.displayNedCatalog(aladinLiteView);
		},
		
		currentCatalogTab: function(catalogsDisplayed){

			var self = this;
			var tab = [];
			//var hasNumber = /\d/;
			//create list(tab) of catalog displayed in the current view
			for(var i=0;i<catalogsDisplayed.length;i++){
				var element = {catalog:null, color: null,obs_id: null};
				var nameTemp = catalogsDisplayed[i].name;
				element.catalog = nameTemp;
				element.color = catalogsDisplayed[i].color;
				for(var name in LibraryCatalog.catalogs){
					if(LibraryCatalog.catalogs[name].nameTemp == nameTemp){
						element.catalog = LibraryCatalog.catalogs[name].name;
						element.color = LibraryCatalog.catalogs[name].color;
					}
				}
				if(element.catalog.startsWith('VizieR') ){
					//Seperate the obs_id from vizier name
					element.obs_id = element.catalog.split(":")[1];
				}
				tab.push(element);
			}
			return tab;			
		},
		//For bookmark :  display the catalogs in current view and  display the names in vizier_list
		restoreCatalog: function(aladinLiteView){
			var self =this;
			var map = {};
			for(var i=0; i<aladinLiteView.catalogTab.length; i++){
				var x;
				self.view.libraryMap.setCatalogByColor(aladinLiteView.catalogTab[i]);
				if(aladinLiteView.catalogTab[i].catalog=='Simbad'){
					self.displaySimbadCatalog();
				}else if(aladinLiteView.catalogTab[i].catalog=='NED'){
					self.displayNedCatalog(aladinLiteView);
				}
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id] && aladinLiteView.catalogTab[i].obs_id){
				if(self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url==undefined){
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable');
				}else{
					 self.aladinLite_V.displayVizierCatalog(aladinLiteView.catalogTab[i].obs_id, aladinLiteView.catalogTab[i].color, 'showTable', self.cata_dict[aladinLiteView.catalogTab[i].obs_id].hips_service_url);
				}
				//self.storeCurrentCatalog(aladinLiteView.catalogTab[i].obs_id);
				//map[aladinLiteView.catalogTab[i].obs_id] = x;
				}
			}
			this.view.redrawCatalogSelector(aladinLiteView,self.cata_dict);
		},
		
		displayDataXml: function(aladinLiteView){
			
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.displayDataXml(aladinLiteView,url);
		},
		
		updateCatalogs: function(aladinLiteView,state){
			var self = this;
			if(aladinLiteView.masterResource != undefined&&aladinLiteView.masterResource.setParamsInUrl){
				var url = aladinLiteView.masterResource.setParamsInUrl(aladinLiteView);
			}
			return this.view.updateCatalogs(aladinLiteView,url,state);
		}
}
console.log('=============== >  HipsSelector_m.js ');

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
 * 
 * @param parentDivId:  "aladin-lite-div"
 * @param model: HipsSelector_Mvc()
 * @returns
 */
//"use strict"
function HipsSelector_mVc(parentDivId, model){
	this.parentDivId = parentDivId;
	this.parentDiv = null;
	this.libraryMap = new LibraryMap();
//	this.idCounter = 0;
	this.model = model;
}

HipsSelector_mVc.prototype = {
		/**
		 * afficher le panneau de la liste sur aladin
		 */
		displaylistepanel : function(){
			if( this.parentDiv == null )
				this.parentDiv = $('#' + this.parentDivId);
			this.parentDiv.append('<div id="itemList" class="alix_hips_panel"></div>');
		},
		
		/**
		 * afficher la liste de surveys
		 */
		displayHipsList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='color:#2e3436;style='font-size: 15px;'>" + jsondata.length + " matching Hips images</span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);"'
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					itemList.append("<div id = 'panel_"
							+ jsondata[i].ID + "' class='alix_liste_item' ><bn class='alix_title_in_liste'>"
							+ jsondata[i].obs_title +" | "+jsondata[i].ID+"</bn></div><div id='" 
							+ jsondata[i].ID 
							+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.hipsFunction(&quot;" + jsondata[i].ID
							+ "&quot;)'>"  + jsondata[i].obs_title +"</span><br><br>"
							+"<span style='font-size:small;color : #727371'>"+jsondata[i].ID +"</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_regime + "</span><br>"
							+ "<span class=blackhelp style='font-size:small;'>"
							+ jsondata[i].obs_description + "</span></div>");
					$(document.getElementById("panel_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id')	.replace('panel_','').replace(/\//g, "\\/");
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		displayCatalogeList : function(jsondata){
				var itemList = $("#itemList");
				if( itemList.css("display") == "none"){
					itemList.css("display", "block");
					itemList.css("z-index", "10000");
				}
				itemList.html("<span class=strong style='font-size: 15px;'>" + jsondata.length + " matching Catalogues <b>*catalogue progressive</b></span>\n"
				+ '<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
				+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
				+ '<span class="glyphicon glyphicon-remove"></span></a><br><br>');
				for(var i=0 ; i<jsondata.length ; i++){
					if(jsondata[i].hips_service_url == undefined){
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' >"
								+ jsondata[i].obs_title +"</span></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot);'>"  
								+ jsondata[i].obs_title
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span></div>");
					}else{
						itemList.append("<div id = 'catalog_"
								+ jsondata[i].ID + "' class='alix_liste_item' ><span class='alix_title_in_liste' style='font-weight: bold;'>"
								+ jsondata[i].obs_title+"</span><i class='glyphicon glyphicon-asterisk' style='font-size:8px;'></i></div><div id='cata_" 
								+ jsondata[i].ID 
								+ "' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' "
								+ "onclick='AladinLiteX_mVc.catalogFunction(&quot;" + jsondata[i].obs_id + "&quot);'>"  
								+ jsondata[i].obs_title 
								+ "</span>"
								+"<i id='btn_detail_catalog_"+ jsondata[i].obs_id +"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+ jsondata[i].obs_id +"&quot;)'></i>&nbsp;<br>"
								+"<span style='font-size:small;color : #727371'>"+jsondata[i].obs_id +"</span><br>"
								+ "<span class=blackhelp style='font-size:small;'>"
								+ jsondata[i].obs_description + "</span><br>"
								+ "<span style='font-size:small;'>"
								+ jsondata[i].hips_service_url+"</span></div>");
					}
					$(document.getElementById("catalog_"+jsondata[i].ID)).click(function(){
						var id = $(this).attr('id').replace('catalog_','cata_').replace(/\//g, "\\/").replace(/\+/g,"\\+");
						$("#" + id).slideToggle();	
						$(this).toggleClass("alix_liste_item_close");
					});
				}
		},
		
		/**
		 * display the catalog list in panel
		 */
		createCatalogSelect : function(obs_id,cata_dict){
			/*
			 * draw the initial cata in AL
			 */	
			var self=this;
			$("#itemList").css("display", "none");
			//var obs_id=obs_id_list[obs_id_list.length-1];
			var cata_name = 'VizieR:'+obs_id;
			var cataInit = null;
			var catadata = cata_dict[obs_id];
			var color;
			if(LibraryCatalog.getCatalog(cata_name)){
				color = LibraryCatalog.getCatalog(cata_name).color;
				//if catalog exists already in library catalog,we take the color from libraryCatalog
			}else{
			    color = this.libraryMap.getNextFreeColor(obs_id).color;
			}//if not ,we take a color from color map
			WaitingPanel.show(obs_id);
			if(catadata.hips_service_url!=undefined){
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color,'showTable', catadata.hips_service_url);
				//self.model.cata_created[obs_id] = cataInit;
			}else{
				//self.model.builTapQuery(catad.obs_id)
				cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, color, 'showTable');
				//self.model.cata_created[obs_id] = cataInit;
			}
			/*
			 * draw the list of cata in panel 
			 */
			var id = LibraryCatalog.getCatalog(cata_name).id;
			console.log(">>>>>>>>>id:"+id);
			$("#vizier_list").append('<li id="cata_list_'+ id +'" class = "'+obs_id+'"style="list-style-type: none;height:auto;">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen alix_menu_item" style="display:inline; cursor: pointer;color:'+color+';" >' + cata_dict[obs_id].obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_flash_catalog_'+id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_delete_catalog_'+id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');		
			var x = id;
			// show or hide the catalog		
			$('#cata_operate_'+id).unbind("click").click(function(event){	
					event.stopPropagation();
					var obs_id = $(this).text();
					var cata_name = 'VizieR:'+obs_id;
					var cataColor = LibraryCatalog.getCatalog(cata_name).color;
					var catadata = cata_dict[obs_id];
					
					if($(this).attr("class") != "alix_vizier_chosen alix_menu_item"){					
						$(this).attr("class", "alix_vizier_chosen alix_menu_item");
						$(this).css("color", cataColor);
						
						WaitingPanel.show(obs_id);

						$("#itemList").css("display", "none");
						if(catadata.hips_service_url != undefined){
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
					}else{
						$(this).attr("class", "alix_vizier_in_menu alix_menu_item");
						$(this).css("color", "#888a85");
						self.model.aladinLite_V.cleanCatalog(cata_name);
					}				
			});
			// delete the catalog in the current view and library catalog and free the color in library map
			$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
				event.stopPropagation();
				console.log("!!!!!!!!!!deleteonetime"+this.parentNode.className);
				
				//var obs_id =$("#cata_operate_"+ x).text();
				var obs_id = this.parentNode.className;
				var cata_name = 'VizieR:'+obs_id;
				//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
				//var catadata = cata_dict[obs_id];
				console.log("delete"+obs_id);
			    self.model.aladinLite_V.cleanCatalog(cata_name);
			    self.libraryMap.freeColor(obs_id);
				LibraryCatalog.delCatalog(cata_name);
				this.parentNode.remove();
				AladinLiteX_mVc.closeContext();
				
			    return false ;
			});
			//catalog flash
			$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
				event.stopPropagation();
				var obs_id =$("#cata_operate_"+ x).text();
				var cata_name = 'VizieR:'+obs_id;
				LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
				//self.model.cata_created[obs_id].makeFlash();
			});
			
			
	
		},

		displaySimbadCatalog : function(){
			var self=this;
			var name = 'Simbad';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
				console.log("Simbadshowcolor"+color);
			}
			var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
			var clickType = 'showTable';
			if(cmdNode.attr("class") == "alix_simbad_in_menu alix_menu_item alix_datahelp" ){
				WaitingPanel.show(name);
				cmdNode.attr("class", "alix_simbad_in_menu alix_menu_item alix_datahelp_selected");
				cmdNode.css("color", color);
				 $("#btn-Simbad-configure").css("color", color);
				 $("#btn-Simbad-flash").css("color", color);
				self.model.aladinLite_V.displayCatalog(name, color, clickType, url);
			}else{
				cmdNode.attr("class", "alix_simbad_in_menu alix_menu_item alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-Simbad-configure").css("color", "#888a85");
				 $("#btn-Simbad-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
				AladinLiteX_mVc.closeContext();
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		displayNedCatalog: function(aladinLiteView){
			var self= this;
			var name = 'NED';
			var cmdNode = $("#" + name);
			var color= this.libraryMap.colorMap[name].color;
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
			var clickType = 'showTable';
			if(cmdNode.attr("class") == "alix_ned_in_menu alix_menu_item alix_datahelp" ){
				if(aladinLiteView.fov>=1){
					WaitingPanel.warnFov();
				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_ned_in_menu alix_menu_item alix_datahelp_selected");
					cmdNode.css("color", color);
					$("#btn-NED-configure").css("color", color);
					$("#btn-NED-flash").css("color", color);
					self.model.aladinLite_V.displayCatalog(name, color, clickType);
				}
			}else{
				cmdNode.attr("class", "alix_ned_in_menu alix_menu_item alix_datahelp");
				cmdNode.css("color", "#888a85");
				 $("#btn-NED-configure").css("color", "#888a85");
				 $("#btn-NED-flash").css("color", "#888a85");
				self.model.aladinLite_V.cleanCatalog(name);
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);//delete the Ned in library
				AladinLiteX_mVc.closeContext();
			}
			//AladinLiteX_mVc.bindToFade();
		},
		
		/**
		 * aladinLiteView = {
			this.name = null;
			this.ra = null;
			this.dec = null; 
			this.fov = null;
			this.survey = null;
			this.region = null;
			this.id = null;
			this.img = null;
			this.XMM = false;
			this.catalogTab = null;
			}
		 */
		//redraw vizier list when a bookmark in the history is selected and replayed
		redrawCatalogSelector: function(aladinLiteView,cata_dict){
			//console.log(aladinLiteView.catalogTab)
			console.log("redrawCatalogSelector!!!!!!!!!")
			var self = this;
			var html='';
			//if(map.length != 0){	
			$("#vizier_list").html(html);
				for(var j=0;j<aladinLiteView.catalogTab.length;j++){
					var catalog = aladinLiteView.catalogTab[j].catalog;
					var obs_id = aladinLiteView.catalogTab[j].obs_id;
					if(obs_id != undefined){
						if(LibraryCatalog.getCatalog(catalog)){
							var color = LibraryCatalog.getCatalog(catalog).color;
							var id = LibraryCatalog.getCatalog(catalog).id;
						}else{
							var color = aladinLiteView.catalogTab[j].color;
							
						}
						$("#vizier_list").append( '<li style="list-style-type: none;height:24px;" class="'+ obs_id + '">'
						+'<div id="cata_operate_'+ id +'" title="Show/hide Vizier sources" class="alix_vizier_chosen alix_menu_item" style="display:inline; cursor: pointer;color:'+color+';" >' + obs_id + '</div>&nbsp;'
						+'<i id="btn_detail_catalog_'+ id +'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+ id +')"></i>&nbsp;'
						+'<i id="btn_configure_catalog_'+ id +'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+ id +')"></i>'
						+'<i id="btn_flash_catalog_'+ id +'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i>&nbsp;'
						+'<i id="btn_delete_catalog_'+ id +'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+color+';cursor: pointer;"></i></li>');
						
					//$('#vizier').on('click','#cata_operate_'+id,function(event){		
						$('#cata_operate_'+id).unbind("click").click(function(event){		
							event.stopPropagation();
							var obs_id = $(this).text();
							var cata_name = 'VizieR:'+obs_id;
							var cataColor = LibraryCatalog.getCatalog(cata_name).color;
							var catadata = cata_dict[obs_id];
							
							if($(this).attr("class") != "alix_vizier_chosen alix_menu_item"){					
								$(this).attr("class", "alix_vizier_chosen alix_menu_item");
								$(this).css("color", cataColor);
								
								WaitingPanel.show(obs_id);

								$("#itemList").css("display", "none");
								if(catadata.hips_service_url != undefined){
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable', catadata.hips_service_url)
									//self.model.cata_created[obs_id] = cataInit;
								}else{
									cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, cataColor, 'showTable');
									//self.model.cata_created[obs_id] = cataInit;
								}
							}else{
								$(this).attr("class", "alix_vizier_in_menu alix_menu_item");
								$(this).css("color", "#888a85");
								self.model.aladinLite_V.cleanCatalog(cata_name);
							}				
					});
						//add handlers for each catalog in the vizier list
					$('#vizier').on('click','#btn_delete_catalog_'+id,function(event){
						event.stopPropagation();
						console.log("!!!!!!!!!!deleteonetime"+this.parentNode.className);
						
						//var obs_id =$("#cata_operate_"+ x).text();
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						//var cataColor = LibraryCatalog.getCatalog(cata_name).color;
						//var catadata = cata_dict[obs_id];
						console.log("delete"+obs_id);
					    self.model.aladinLite_V.cleanCatalog(cata_name);
					    self.libraryMap.freeColor(obs_id);
						LibraryCatalog.delCatalog(cata_name);
						this.parentNode.remove();
						AladinLiteX_mVc.closeContext();
						return false ;
					});
					$('#vizier').on('click','#btn_flash_catalog_'+id,function(event){
						event.stopPropagation();
						var obs_id = this.parentNode.className;
						var cata_name = 'VizieR:'+obs_id;
						LibraryCatalog.getCatalog(cata_name).al_refs.makeFlash();
					//	map[obs_id].makeFlash();
						
					});
						
				}
				}
			//}
		
		},
		
		/**
		 * dataXML={position, service}
		 */
		//display local catalog such as 3XMM
		displayDataXml: function(aladinLiteView,url){
			var self = this;
			var name = 'Swarm';
			var cmdNode = $("#XMM");
			var clickType = 'handler';
			var color= '#ff0000';
			if(LibraryCatalog.getCatalog(name)){
				color = LibraryCatalog.getCatalog(name).color;
			}
				if(cmdNode.attr("class") == "alix_XMM_in_menu alix_menu_item alix_datahelp"){
//				if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false){
//					WaitingPanel.warnFov();
//				}else{
					WaitingPanel.show(name);
					cmdNode.attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp_selected");
					console.log("displaydataxml");
					cmdNode.css("color", color);
					$("#btn-XMM-description").css("color" , color);
					$("#btn-XMM-flash").css("color" ,color);
					$("#btn-XMM-configure").css("color" ,color);
					$("#ACDS").css("display" , "inline");
					self.model.aladinLite_V.displayCatalog(name, "#ff0000", clickType, url);
//				}
				/*}else if(cmdNode.attr("class") == "alix_XMM_in_menu alix_menu_item alix_datahelp_nochange"){
				cmdNode.attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp_selected");*/
				//to avoid" when we display a view in the bookmark who contains XMM, it will recall displaydataxml(), and if xmm has been already showed ,function displaydataxml will lead to delete the XMM."	
			}else{
				cmdNode.attr("class", "alix_XMM_in_menu alix_menu_item alix_datahelp");
				cmdNode.css("color", "#888a85");
				$("#btn-XMM-flash").css("color" , "#888a85");
				$("#btn-XMM-description").css("color" , "#888a85");
				$("#btn-XMM-configure").css("color" , "#888a85");
				$("#ACDS").css("display" , "none");
				self.model.aladinLite_V.cleanCatalog(name);
				//$("#aladin-lite-div-context").html("");
				self.model.aladinLite_V.cleanCatalog("Target");
				if(LibraryCatalog.getCatalog(name))LibraryCatalog.delCatalog(name);
			}
				AladinLiteX_mVc.closeContext();
		},
		
		//update each catalog shown in current view when we change the position or zoom 		
		updateCatalogs: function(aladinLiteView,url,state){
			var self = this;
			//Check if the catalog is displayed
			if($(document.getElementById("XMM")).attr("class") == "alix_XMM_in_menu alix_menu_item alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				if(state == 'zoom'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false ){
						WaitingPanel.warnFov();
					}else{
						self.model.aladinLite_V.cleanCatalog('Swarm');
						WaitingPanel.show('Swarm');
						self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
					}
				}else if(state == 'position'){
					if(aladinLiteView.fov>=1 && aladinLiteView.masterResource.filtered == false ){
						WaitingPanel.warnFov();
					}
					self.model.aladinLite_V.cleanCatalog('Swarm');
					WaitingPanel.show('Swarm');
					self.model.aladinLite_V.displayCatalog('Swarm', 'red', 'handler', url);
				}
			}
			if($(document.getElementById("NED")).attr("class") == "alix_ned_in_menu alix_menu_item alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var name ='NED'
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
					if(aladinLiteView.fov>=1){
						WaitingPanel.warnFov();
					}else{
						WaitingPanel.show(name);
						self.model.aladinLite_V.displayCatalog(name, color, clickType);
					}
			}
			if($(document.getElementById("Simbad")).attr("class") == "alix_simbad_in_menu alix_menu_item alix_datahelp_selected"){
				self.model.aladinLite_V.storeCurrentState();
				var url = 'http://axel.u-strasbg.fr/HiPSCatService/Simbad';
				var name ='Simbad';
				var color= this.libraryMap.colorMap[name].color;
				var clickType = 'showTable';
				self.model.aladinLite_V.cleanCatalog(name);
					WaitingPanel.show(name);
					self.model.aladinLite_V.displayCatalog(name, color, clickType, url);
			}
			//Update the vizier catalogs
			if(LibraryCatalog.catalogs != null){
				self.model.aladinLite_V.storeCurrentState();
				var cata = null;
				//When we zoom
				if(state == 'zoom'){
					//for(var i=0;i<self.model.cata_tab.length;i++){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen alix_menu_item"){
						if(catalog.url!=undefined){
							console.log("Progressive Vizier:"+name+"<<<url>>>"+catalog.url)
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
							//self.model.cata_created[obs_id] = cataInit;
						}else{
							console.log("Unprogressive Vizier:"+name+"<<<no url>>>")
							self.model.aladinLite_V.cleanCatalog(name);
							cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable');
							//self.model.cata_created[obs_id] = cataInit;
						}
//							if(aladinLiteView.fov>=1){
//								WaitingPanel.warnFov();
//							}else{
//								if($(document.getElementById("cata_operate_"+i)).attr("class") == "alix_vizier_chosen alix_menu_item"){
//									self.model.aladinLite_V.cleanCatalog("VizieR:"+self.model.cata_tab[i]);
//									cataInit = self.model.aladinLite_V.displayVizierCatalog(self.model.cata_tab[i] , self.libraryMap.getColorByCatalog(self.model.cata_tab[i]).color, 'showTable');
//									self.model.cata_created[self.model.cata_tab[i]] = cataInit;
//								}
//							}
						}
					  }
					}
					//when we change the position
				}else if(state == 'position'){
					for(var name in LibraryCatalog.catalogs){
						if(name.startsWith("VizieR:")){
						var cataInit = null;
						var catalog = LibraryCatalog.catalogs[name];
						var catalogRef = LibraryCatalog.catalogs[name].al_refs;
						var id = catalog.id;
						var obs_id =catalog.obs_id;
						var cataInit = null;
						if($(document.getElementById("cata_operate_"+id)).attr("class") == "alix_vizier_chosen alix_menu_item"){
							if(catalog.url==undefined){
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id , catalog.color, 'showTable');
								//self.model.cata_created[obs_id] = cataInit;
							}else{
								// catalogue porgressifs
								self.model.aladinLite_V.cleanCatalog(name);
								cataInit = self.model.aladinLite_V.displayVizierCatalog(obs_id, catalog.color, 'showTable', catalog.url);
								//self.model.cata_created[obs_id] = cataInit;
								}
							
						}
						}
					}
				}
			}
		}
}
console.log('=============== >  HipsSelector_v.js ');

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
var SwarmDynamicFilter = function(){
	var ConstraintList = [];
	var alixCat;
	var sources;
	var aladinLiteView;
// add constraint in the list and apply the constraint list _xs.
var addConstraint  = function(constraint){	
	if(!ConstraintList[constraint.element]){
		ConstraintList.length++;
	}
	ConstraintList[constraint.element]= constraint;
	runConstraint();
}
//delete constraint in the list	and apply the constraint list _xs.
var delConstraint  = function(element){
	if(ConstraintList != null&&ConstraintList[element]){
	delete ConstraintList[element];
	ConstraintList.length--;
	}
	runConstraint();
}
var runConstraint = function(ALV){
	aladinLiteView = ALV;
	alixCat = LibraryCatalog.getCatalog("Swarm");
	sources = alixCat.al_refs.getSources();
	if (ConstraintList.length == 0 ){
		displayCatalogFiltered();
		console.log("@@@@@@@@No constraint for 3XMM Sources")//When there's no constraint _xs.
	}else{
	for(var element in ConstraintList){
		displayCatalogFiltered(ConstraintList[element]);//apply every constraint in the list _xs.
	}
	}
}
var displayCatalogFiltered = function(constraint){	
	if(constraint != undefined){
		var value = constraint.value;
		var element = constraint.element;
		var comparator = constraint.comparator;
		var type = constraint.type;
		var sourcesShown = [];
		ConstraintList[element]= constraint;
	}
	
	for(var i=0;i<sources.length;i++){
		source =sources[i];
		console.log(source.data[element]);
	//for constraint numeric _xs.
	if(type=="num"){
		if(comparator==">"){
			if(parseFloat(source.data[element])>parseFloat(value)){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		}else if(comparator=="="){// if = 6.2 means 6<= x <7
			if(parseFloat(source.data[element])>=parseFloat(value)&&parseFloat(source.data[element])<(parseFloat(value)+1)){
				console.log("show");	
				source.show();
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		
		}else if(comparator=="<"){
			if(parseFloat(source.data[element])< parseFloat(value)){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		}
		
	}else if(type=="boolean"){
	//for constraint boolean _xs.
			if(source.data[element]==value){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
	}else if(type=="String"){
		//for constraint String _xs.	
		if(comparator=="LIKE"){
			if(source.data[element].startsWith(value)){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
		}else if(comparator=="NOT LIKE"){
			if(source.data[element].startsWith(value)){
					console.log("hide");
					source.hide();	
				}else{
					console.log("show");	
					source.show();	
					sourcesShown.push(source);		
				}
		}else if(comparator=="IS NULL"){
			if(source.data[element]==null){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
		}else if(comparator=="IS NOT NULL"){
			if(source.data[element]==null){
				console.log("hide");
				source.hide();	
			}else{
				console.log("show");	
				source.show();	
				sourcesShown.push(source);		
			}
		}
	}else if(constraint == undefined){
		source.show();//show all the sources _xs.
	}
	}
	sources = sourcesShown;//Give the sources selected to the next constraint to select again _xs.
  }
	
   var retour =  {
		   runConstraint : runConstraint
		   ,addConstraint :addConstraint
		   ,delConstraint : delConstraint
		,displayCatalogFiltered : displayCatalogFiltered
   };

	return retour;
}()
console.log('=============== >  SwarmDynamicFilter.js ');

/**
f * @preserve LICENSE
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

var localConf = {
		parentDivId: "aladin-lite-div",
		defaultView: {
			defaultSurvey: "DSS colored",
			field: {
				position: "M33",
				defaultFov: "0.5"
			},
			panelState: true
		},
		controllers: {
			historic: { },
			regionEditor: { },
			hipsSelector: { }
		}
}
var externalConf;
var mixConf = function(localData,externalData) {   
	
for(var key in externalData){
	if(typeof(externalData[key])== "object" && localData[key])
		{
		externalData[key] = mixConf(localData[key],externalData[key])
		}
}
return Object.assign(localData,externalData)
}

var configureALIX = function(externalData){
	if(externalData){
	externalConf = externalData;
	localConf = mixConf(localConf,externalData);
	}
	AladinLiteX_mVc.init(localConf);
} /////!!!Cant't add () ,cause configureALIX is called later by external project, not by himself












console.log('=============== >  ConfigureALiX.js ');

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

cds.Catalog.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

cds.Catalog.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};

// function called when a source is clicked. Called by the View object
cds.Source.prototype.actionClicked = function() {
    if (this.catalog && this.catalog.onClick) {
        var view = this.catalog.view;
        if (this.catalog.onClick=='showTable') {
            view.aladin.measurementTable.showMeasurement(this);
            this.select();
        }
        else if (this.catalog.onClick=='showPopup') {
            view.popup.setTitle('<br><br>');
            var m = '<div class="aladin-marker-measurement">';
            m += '<table>';
            for (var key in this.data) {
                m += '<tr><td>' + key + '</td><td>' + this.data[key] + '</td></tr>';
            }
            m += '</table>';
            m += '</div>';
            view.popup.setText(m);
            view.popup.setSource(this);
            view.popup.show();
        }
        else if (typeof this.catalog.onClick === 'function') {
            this.catalog.onClick(this);
            view.lastClickedObject = this;
            this.select();

        }

    }
};

//The sources selected will be unselected when the empty part of aladin clicked.But the sources selected keep selected when we check one of the related sources,
MeasurementTable.prototype.hide = function() {
    this.divEl.hide();
    AladinLiteX_mVc.deleteSourceAuto();
};
//To clean the target when we click the empty part of aladin
cds.Source.prototype.actionOtherObjectClicked = function() {
    if (this.catalog && this.catalog.onClick) {
        this.deselect();
        AladinLiteX_mVc.cleanCatalog("Target");
	}
};


ProgressiveCat.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

ProgressiveCat.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};
/**
 * Limit he number of sources at 999
 */
URLBuilder.buildVizieRCSURL = function(vizCatId, target, radiusDegrees) {
    if (target && (typeof target  === "object")) {
        if ('ra' in target && 'dec' in target) {
            var coo = new Coo(target.ra, target.dec, 7);
            target = coo.format('s');
        }
    }
    return 'http://vizier.unistra.fr/viz-bin/votable?-source=' + vizCatId + '&-c=' + encodeURIComponent(target) + '&-out.max=20000&-c.rd=' + radiusDegrees;
};



	


console.log('=============== >  AladinUpdate.js ');

