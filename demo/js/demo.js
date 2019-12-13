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
**/  $().ready(function() {
	 drawHtml();
	  })
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
  var list =[
	  {
		  name :"demo_modalinfo"
		,title:" Modalinfo"
		,url:"alixindex.html"
		//Modalinfo.iframePanel(&quot;http://localhost/alix/alixindex.html&quot;)
		,button1 : "<button style='margin-right:10px' onclick='AladinLiteX_mVc.popup();'><i class=' glyphicon glyphicon-hand-right' style='font-size:16px;padding:3px;'></i><a href='javascript:void(0)''>Pop Up</a></button>"
		,code1:'//html\n&lt;div id="aladin-lite-div" style="width:420px;height:415px;padding:5px;display:none;overflow:auto">&lt;/div>\n//js\nconfigureALIX()'
		//,code1:'resourceLoader.setScripts([ "demo/js/alixindexReady.js"]);//html'
		,code2:'&lt;button style="margin-right:10px" onclick="AladinLiteX_mVc.popup();">\n//Pop Up\n\n\n\n'
		,description:" Pop up is the mode that allows to launch ALIX in a modalinfo window ,which don't need too much space and can be installed anywhere in the page."
	  },
	  {
		  name :"demo_popup"
		,title:" Pop up"
		,url:"alixindex.html"
		//,code1:'//html\n&lt;div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;">&lt;/div>'
		//,button1 : "<button style='margin-right:10px' onclick='Alix_Modalinfo.showPopup(&quot;01 33 50.904 +30 39 35.79&quot;);'><i class=' glyphicon glyphicon-hand-right' style='font-size:16px;padding:3px;'></i><a href='javascript:void(0)''>01 33 50.904 +30 39 35.79</a></button>"
		,button1 : "<button style='margin-right:10px' onclick='Alix_Modalinfo.showPopup(&quot;01 35 57.316 +30 14 42.99&quot;);'><i class=' glyphicon glyphicon-hand-right' style='font-size:16px;padding:3px;'></i><a href='javascript:void(0)''>01 35 57.316 +30 14 42.99</a></button>"
		,code1:'//resourceLoader.setScripts([ "demo/js/alixindexReady.js"]);'
		,code2:'Alix_Modalinfo.showPopup(position);'
		,description:" Pop up is the mode that allows to launch ALIX in a modalinfo window ,which don't need too much space and can be installed anywhere in the page."
	  },
  	  {
  		  name:"demo_simple"
  		,title:" Simple"
  		,url:"alixsimple.html"
  		,code1:'//html\n&lt;div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;">&lt;/div>\n//js\nconfigureALIX()'
  		//,code1 :'resourceLoader.setScripts([ "demo/js/alixsimpleReady.js"]);//html'
  		,code2:'//default configuration\n{"parentDivId":"aladin-lite-div",\n"defaultView":{\n\t"defaultSurvey":"DSS colored",\n\t"field":{\n\t\t"position":"M33",\n\t\t"defaultFov":"0.5"},\n\t"panelState":true},\n\t"controllers":{\n\t\t"historic":{},\n\t\t"regionEditor":{},\n\t\t"hipsSelector":{}\n\t}\n}//alixsimpleReady.js'
  		,description:" Simple is the defaut mode of ALIX , which has no configuration about the XMM sources.Nevertheless it has all other functions for sources of Simbad,Ned and other vizier catalogs. "
  	  },
  	  {
  		 name:"demo_api"
  		,title:" API"
  		,url:"alixapi.html"
  		,code1:'//html\n&lt;div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;">&lt;/div>\n//js\nconfigureALIX(user_configuration)'
  		//,code1:'resourceLoader.setScripts([ "demo/js/alixapiReady.js"]);//html'//JSON.stringify(confData)
  		,code2:'$("#addTarget").click(function() {\n\tAladinLiteX_mVc.displayTarget(function(ra,dec){alert([ra, dec]);});\n});\n$("#getView").click(function() {\nalert(JSON.stringify(AladinLiteX_mVc.getCurrentView()))\n});\n$("#changeRef").click(function() {\n\tdefaultView = {\n\tdefaultSurvey: "CDS/P/DSS2/color",\n\t\tfield: {\n\t\tposition: "M33",\n\t\tdefaultFov: "0.9",\n\t\t}\n\t };\nAladinLiteX_mVc.setReferenceView(defaultView);\n});\n$("#changeRefBlue").click(function() {\n\tdefaultView = {\n\t\tdefaultSurvey: "ESAVO/P/XMM/EPIC-RGB",\n\t\t\tregion: {\n\t\t\ttype:"array",\n\t\t\tvalue:[\n\t\t\t\t202.86460559637285,47.508903373646355,\n\t\t\t\t202.9658591997302,46.884383185785104,\n\t\t\t\t202.00061058533635,47.16490427482837\n\t\t\t]   \n\t\t\t}\n\t};\nAladinLiteX_mVc.setReferenceView(defaultView);\n});\n$("#center").click(function() {\nAladinLiteX_mVc.returnCenter();\n});//alixapiReady.js\n\n\n\n'
  		,description:""
  	  },
	  {
		  name:"demo_xmmProgressive"
		,title:" 3XMM progressive"
		,url:"alixxmmprogressive.html"
		//,code1:'resourceLoader.setScripts([ "demo/js/alixXproReady.js"]);//html'
		,code1:'//html\n&lt;div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;">&lt;/div>'
		,code2:'//js\n&lt;script>\n...\nconfigureALiX({\n\tmasterResource: {\n\taffichage :{\n\t\tlocation :{\n\t\t\turl_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",\n\t\t\turl_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)} {$limitQuery}"\n\t\t\turl_limit:  "Order By _n_detections desc Limit 15"\n\t\t},\n\t\tprogressiveMode: true,\n\t\tqueryMode: true,\n\t\tradiusUnit : "arcmin",\n\t\tformat : "votable",\n\t\tlabel : "3XMM Catalogue",\n\t\tdescription: "Texte plus complet qui donne plus d\'informations",\n\t\tdisplay:true\n\t}\n})\n&lt;/script>'
		//,code2:'masterResource: {\n\taffichage :{\n\t\t...\n\t\tprogressiveMode: true,\n\t\tprogressiveLimit: "Order By _n_detections desc Limit 15",\n\t\t...\n\t}\n\t...\n}//alixXproReady.js'
		,description:""
	  },
  	  /*{
  		 name:"demo_xmmUnprogressive"
  		,title:" 3XMM no progressive"
  		,url:"alixxmmunprogressive.html"
  		//,code1:'resourceLoader.setScripts([ "demo/js/alixXunproReady.js"]);//html'
  		,code1:'//html\n&lt;div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;">&lt;/div>'
  		,code2:'//js\n&lt;script>\n...\nconfigureALiX({\n\tmasterResource: {\n\taffichage :{\n\t\tlocation :{\n\t\t\turl_base: "http://saada.unistra.fr/3xmmdr8/getqueryreport?query={$query}&format={$format}&protocol=auto",\n\t\t\turl_query: "Select ENTRY From MergedEntry In MERGEDCATALOGUE WherePosition {isInCircle({$ra} {$dec}, {$fov},-, ICRS)}"\n\t\t\t},\n\t\tprogressiveMode: false,\n\t\tqueryMode: true,\n\t\tradiusUnit : "arcmin",\n\t\tformat : "votable",\n\t\tlabel : "3XMM Catalogue",\n\t\tdescription: "Texte plus complet qui donne plus d\'informations",\n\t\tdisplay:true\n\t}\n})\n&lt;/script>'
  		,description:""
  	  },*/
	  {
		  name:"demo_tapProgressive"
		,title:" TAP resource progressive"
		,url:"alixtaphandleprogressive.html"
		,code1:"\n\n\n\n\n\n\n"
		,code2:""
		,description:""
	  },
  	 /*{
  		 name:"demo_tapProgressive"
  		,title:" TAP resource unprogressive"
  		,url:""
  		,code1:"\n\n\n\n\n\n\n"
  		,code2:""
  		,description:""
  	  }*/

  ]
	
  var drawDemo = function(list,callback){
		  var name;
		 for(var i in list) {
			 if(!list[i].button1){
				 var button= '<button onclick="openNewTab(&quot;'+list[i].url+'&quot;,&quot;'+list[i].name+'&quot;)"><i class=" glyphicon glyphicon-hand-right" style="font-size:16px;padding:3px;"></i><a href="javascript:void(0)" >Test</a></button>'
				 }else{
					 var button=list[i].button1;
				 }
		  $('#demo_body').append('<fieldset id = "'+list[i].name+'">'
		 +' <legend class = "demo_title">'
		 +'<i class="glyphicon glyphicon-folder-close" style="font-size:16px;padding:3px;"></i>'+list[i].title+''
		 +'</legend>'
		 +'<div class = "demo_context">'
		 +'<div class = "demo_summary">'+list[i].description+'</div>'
		 +' <div class = "demo_code"><pre><code class="javascript">'+list[i].code1+'</pre></code><pre><code class="json demo_codeblock">'+list[i].code2+'</pre></code></div>'
		 +' <div class = "demo_test">'
		 +button
		 +'</div>'
		 +' </div></fieldset>'
		)}
		 callback();
		  
  }
  var drawHtml =function(){
	  drawDemo(list,addToggle);
  }
  var addToggle = function(){
	  $(".demo_title").click(function(i){
		  $(this).next('.demo_context').slideToggle(500);
		  if($(this).find('i').attr("class")=="glyphicon glyphicon-folder-close"){
			  $(this).find('i').attr("class","glyphicon glyphicon-folder-open")
		  }else{
			  $(this).find('i').attr("class","glyphicon glyphicon-folder-close")
		  }
	  })
  }
  var openNewTab = function(url,name){
	  if(name!="demo_popup"){
	  window.open(url, "_blank");}else {
		  //window.open("taphandle.html", "_blank");
		  Alix_Modalinfo.showPopup("01 35 57.316 +30 14 42.99");
	  }
  }
  
  //, "location=yes,height=1000,width=1000,scrollbars=yes,status=yes,async=false"
  
  
  //Pop up is the mode that allows to launch ALIX in a modalinfo window ,which don't need too much space and can be installed anywhere in the page. 
 // Simple is the defaut mode of ALIX , which has no configuration about the XMM sources.Nevertheless it has all other functions for sources of Simbad,Ned and other vizier catalogs. 

  
  
  
  
  
  
  
  