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

/**
@brief Handler to handle the seection of a particular shape
@param {Object} data - The data containing all the needed informations to send back a message to the user.
It has the following shape :
<pre><code>
{
	isReady: Boolean,             // true if the polygone is closed
    userAction: userAction,     // handler called after the user have clicked on Accept
    region : {
        format: {"array2dim","cone"},    // The only one suported yet [[x, y]....]
        points: Array<Array<Number>>  // array with structure matching the format
        size: {x: , y:} // regions size in deg
	}
}
</code></pre>
 */
var regionEditorHandler = function(data) {
	if( data.userAction )
	{
		//AladinLiteX_mVc.storePolygon(data.region);
		alert(JSON.stringify(data));
	}
}

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
	},
	regionEditorHandler: regionEditorHandler
	
}

var externalConf;
var mixConf = function(localData,externalData) {   
	
	for(let key in externalData){
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
		localConf = mixConf(localConf,externalConf);
	}
	AladinLiteX_mVc.init(localConf);
} /////!!!Cant't add () ,cause configureALIX is called later by external project, not by himself











