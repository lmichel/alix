/*var externalData;
var confData = {
		parentDivId: "aladin-lite-div",
		defaultView: {
			defaultSurvey: "DSS colored",
			field: {
				position: "M33",
				defaultFov: "0.5",
			},
			panelState: true
		},
		controllers: {
			historic: { },
			regionEditor: { },
			hipsSelector: { }
		}
}
var mixConf = function(localData,externalData) {      
for(var key in externalData){
	if(typeof(externalData[key])== "object" && localData[key])
		{
		externalData[key] = mixConf(localData[key],externalData[key])
		}
}
return Object.assign(localData,externalData)
}

var configureALIX = function(){
	if(externalData!=undefined){
	confData = mixConf(confData,externalData);
	}
	AladinLiteX_mVc.init(confData);
}()
*/
configureALIX();













