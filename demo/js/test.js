masterResource: {\n\taffichage :{\n\t\t...\n\t\tprogressiveMode: true\n\t\tprogressiveLimit: "Order By _n_detections desc Limit 15",\n\t\t...\n\t}\n\t...\n}



configureALIX (externalConfiguration)

{
	if(externalData){
	confData = mixConf(confData,externalData);
	}
	AladinLiteX_mVc.init(confData);
}


    $("#addTarget").click(function() {\n\tAladinLiteX_mVc.displayTarget(function(ra,dec){alert([ra, dec]);});\n});\n$("#getView").click(function() {\nalert(JSON.stringify(AladinLiteX_mVc.getCurrentView()))\n});\n$("#changeRef").click(function() {\n\tdefaultView = {\n\tdefaultSurvey: "CDS/P/DSS2/color",\n\t\tfield: {\n\t\tposition: "M33",\n\t\tdefaultFov: "0.9",\n\t\t}\n\t };\nAladinLiteX_mVc.setReferenceView(defaultView);\n});\n$("#changeRefBlue").click(function() {\n\tdefaultView = {\n\t\tdefaultSurvey: "ESAVO/P/XMM/EPIC-RGB",\n\t\t\tregion: {\n\t\t\ttype:"array",\n\t\t\tvalue:[\n\t\t\t\t202.86460559637285,47.508903373646355,\n\t\t\t\t202.9658591997302,46.884383185785104,\n\t\t\t\t202.00061058533635,47.16490427482837\n\t\t\t]   \n\t\t\t}\n\t};\nAladinLiteX_mVc.setReferenceView(defaultView);\n});\n$("#center").click(function() {\nAladinLiteX_mVc.returnCenter();\n});
    
	,code2:'masterResource: {\n\taffichage :{\n\t\tlocation :{\n\t\t\turl_base: "http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",\n\t\t\turl_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle(($ra) ($dec), ($fov),-, ICRS)} {$limitQuery}"\n\t\t\turl_limit:  "Order By _n_detections desc Limit 15"\n\t\t},\n\t\tprogressiveMode: true,\n\t\tqueryMode: true,\n\t\tradiusUnit : "arcmin",\n\t\tformat : "votable",\n\t\tlabel : "3XMM Catalogue",\n\t\tdescription: "Texte plus complet qui donne plus d\'informations",\n\t\tdisplay:true\n\t}'

    
    
    masterResource: {\n\taffichage :{\n\t\tlocation :{\n\t\t\turl:"http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query=Select%20ENTRY%20From%20MergedEntry%20In%20MERGEDCATALOGUE%0AWherePosition%20%7B%0A%20%20%20%20isInCircle(%22{$ra}%20{$dec}%22%2C%20{$fov}%2C%20-%2C%20ICRS)%0A%7D&format={$format}&protocol=auto",\n\t\t\turl_base: "http://obs-stage-c11:8080/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",\n\t\t\turl_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle(($ra) ($dec), ($fov),-, ICRS)} {$limitQuery}"\n\t\t},\n\t\tprogressiveMode: true,\n\t\tprogressiveLimit: "Order By _n_detections desc Limit 15",\n\t\tqueryMode: true,\n\t\tradiusUnit : 'arcmin',\n\t\tformat : 'votable',\n\t\tlabel : "3XMM Catalogue",\n\t\tdescription: "Texte plus complet qui donne plus d'informations",\n\t\tdisplay:true\n\t}
	
	
	

	}
	
	
	
	
	
	
	
	
	configureALiX()