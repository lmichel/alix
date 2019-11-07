//take out from jsStuff

Alix_SkyGeometry = function() {
	/**
	 * 
	 */
	var toRadians = function(alpha){
		return alpha*Math.PI/180;
	}
	/**
	 * 
	 */
	var toDegrees = function(alpha){
		return alpha*180/Math.PI;
	}
	/**
	 * 
	 */
	var  distanceDegrees = function(ra0, de0, ra1, de1){
		var  rra0 = toRadians(ra0);
		var  rra1 = toRadians(ra1);
		var  rde0 = toRadians(de0);
		var  rde1 = toRadians(de1);
		return toDegrees(Math.acos((Math.sin(rde0)*Math.sin(rde1)) +
				(Math.cos(rde0)*Math.cos(rde1) * Math.cos(rra0-rra1))));
	}
	/*
	 * exports
	 */
	var pblc = {};
	pblc.toRadians = toRadians;
	pblc.toDegrees = toDegrees;
	pblc.distanceDegrees = distanceDegrees;
	return pblc;

}();