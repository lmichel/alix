cds.Catalog.prototype._doMakeFlash=function(e,a,c,b){if(c){this.show()
}else{this.hide()}var d=this;if(e<a){setTimeout(function(){d._doMakeFlash(e+1,a,!c,b)
},b)}};cds.Catalog.prototype.makeFlash=function(){this._doMakeFlash(1,2*5,false,200)
};cds.Source.prototype.actionClicked=function(){if(this.catalog&&this.catalog.onClick){AladinLiteX_mVc.setLastSelectedPosition(this.catalog.name,this.ra,this.dec);
var b=this.catalog.view;if(this.catalog.onClick=="showTable"){b.aladin.measurementTable.showMeasurement(this);
this.select()}else{if(this.catalog.onClick=="showPopup"){b.popup.setTitle("<br><br>");
var a='<div class="aladin-marker-measurement">';a+="<table>";
for(var c in this.data){a+="<tr><td>"+c+"</td><td>"+this.data[c]+"</td></tr>"
}a+="</table>";a+="</div>";b.popup.setText(a);b.popup.setSource(this);
b.popup.show()}else{if(typeof this.catalog.onClick==="function"){this.catalog.onClick(this);
b.lastClickedObject=this;this.select()}}}}};MeasurementTable.prototype.hide=function(){this.divEl.hide();
$("#SourceDiv").css("display","none");AladinLiteX_mVc.deleteSourceAuto();
AladinLiteX_mVc.deleteLastSelectedPosition();$("#ACDS").css("color","#888a85")
};cds.Source.prototype.actionOtherObjectClicked=function(){if(this.catalog&&this.catalog.onClick){this.deselect();
$("#SourceDiv").css("display","none");AladinLiteX_mVc.cleanCatalog("Target");
AladinLiteX_mVc.deleteLastSelectedPosition();$("#ACDS").css("color","#888a85")
}};ProgressiveCat.prototype._doMakeFlash=function(e,a,c,b){if(c){this.show()
}else{this.hide()}var d=this;if(e<a){setTimeout(function(){d._doMakeFlash(e+1,a,!c,b)
},b)}};ProgressiveCat.prototype.makeFlash=function(){this._doMakeFlash(1,2*5,false,200)
};URLBuilder.buildVizieRCSURL=function(b,d,c){if(d&&(typeof d==="object")){if("ra" in d&&"dec" in d){var a=new Coo(d.ra,d.dec,7);
d=a.format("s")}}return"http://vizier.unistra.fr/viz-bin/votable?-source="+b+"&-c="+encodeURIComponent(d)+"&-out.max=20000&-c.rd="+c
};var Location=(function(){Location=function(a){this.$div=$(a)
};Location.prototype.update=function(f,e,d,c){c=(c&&c===true)||false;
var a=new Coo(f,e,7);var b=$("#aladin-lite-div-target");
if(d==CooFrameEnum.J2000){this.$div.html(a.format("s/"));
b.val(a.format("s/"))}else{if(d==CooFrameEnum.J2000d){this.$div.html(a.format("d/"));
b.val(a.format("d/"))}else{this.$div.html(a.format("d/"));
b.val(a.format("d/"))}}this.$div.toggleClass("aladin-reticleColor",c);
b.toggleClass("aladin-reticleColor",c)};return Location
})();console.log("=============== >  AladinUpdate.js ");
let Alix_Modalinfo=function(){var n="modaldiv";var C="#"+n;
var s=null;var f="aladin-lite-container";var aa="aladin-lite-catdiv";
var q="aladin-lite-catdiv-info";var t;var H=function(af,ag){if(ag==undefined){return af
}else{return ag}};var p=function(af){var ag="<p>"+af.replace(/\n/g,"<BR>")+"</p>";
return ag};var Q=function(ag,af){var af=af||"";var ai="";
if(Array.isArray(ag)){ai+="[";for(var ah=0;ah<ag.length;
ah++){ai+=Q(ag[ah],af)}ai+=af+"]"}else{if(ag===null){ai="NULL"
}else{switch(typeof ag){case"undefined":ai+="UNDEFINED";
break;case"object":var ak=true;for(var aj in ag){if(!ak){if(aj!="id"&&aj!="$"){ai+=af
}else{ai+=" "}}else{ai+="\n"+af}ai+="<b>"+aj+"</b>: ";
ai+=Q(ag[aj],af+"  ");if(aj!="id"&&aj!="$"){ai+="\n"
}ak=false}break;case"boolean":ai+=(ag)?"TRUE":"FALSE";
break;case"number":ai+=ag;break;case"string":if(ag.lastIndexOf("http",0)===0){ag=decodeURIComponent(ag)
}if(ag.match(/\s/)){ai+='"'+ag+'"'}else{ai+=ag}break;
case"function":ai+="<FUNCTION>";break;default:ai+=ag.replace(/</g,"&lt;").replace(/>/g,"&gt;");
break}}}return ai};var E=function(ag,af){var af=af||"";
var ai="";if(Array.isArray(ag)){ai+="[";for(var ah=0;
ah<ag.length;ah++){ai+=Q(ag[ah],af)}ai+=af+"]"}else{if(ag===null){ai="NULL"
}else{switch(typeof ag){case"undefined":ai+="UNDEFINED";
break;case"object":var ak=true;for(var aj in ag){if(!ak){if(aj!="id"&&aj!="$"){ai+=af
}else{ai+=" "}}else{ai+="\n"+af}ai+=aj+": ";ai+=Q(ag[aj],af+"  ");
if(aj!="id"&&aj!="$"){ai+="\n"}ak=false}break;case"boolean":ai+=(ag)?"TRUE":"FALSE";
break;case"number":ai+=ag;break;case"string":if(ag.lastIndexOf("http",0)===0){ag=decodeURIComponent(ag)
}if(ag.match(/\s/)){ai+='"'+ag+'"'}else{ai+=ag}break;
case"function":ai+="<FUNCTION>";break;default:ai+=ag;
break;exit}}}return ai};var h=0;var e=function(){h++;
return"modal-"+h};var u=function(ag){var af=$("#"+ag).parent(".ui-dialog").css("z-index");
if($("#shadow").length==0){$("body").append('<div id="shadow" pos="'+ag+'"></div>');
$("#shadow").css("z-index",(af-1))}else{$("body").append('<div class="shadow" pos="'+ag+'"></div>');
$('div[pos="'+ag+'"]').css("z-index",(af-1))}};var o=function(aj,af,ai,ag,ah){if(ag==undefined){$("body").append("<div id='"+aj+"' title='"+ai+"' class='custom-modal'> </div>")
}else{$("body").append("<div id='"+aj+"' title='"+ai+"' class='custom-modal'>"+ag+"</div>")
}if(af){$("#"+aj).dialog()}else{if(ah!=undefined){$("#"+aj).dialog({resizable:false,minWidth:ah,position:{my:"center",at:"top",of:window}})
}else{$("#"+aj).dialog({resizable:false,width:"auto",height:"auto"})
}}};var g=function(){var af=-1;$("div[id^='modal-']").each(function(){var ag=$(this).attr("id").substring(6);
if(ag>af&&isNumber(ag)){af=$(this).attr("id").substring(6)
}});if(af!=-1){return"modal-"+af}else{af=undefined;
return af}};var d=function(af){$('div[pos="'+af+'"]').remove()
};var D=function(af){$("#"+af).remove()};var T=function(af){if(af!=undefined){d(af);
D(af);I(af)}else{}};var I=function(af){$('div[btndialog="'+af+'"]').remove()
};var F=function(af){$('div[pos="'+af+'"]').click(function(){T(af)
});$("#"+af).prev("div").find("a.ui-dialog-titlebar-close.ui-corner-all").click(function(){T(af)
})};$(document).keydown(function(af){if(af.keyCode==27){if($("#shadow").length!=0){T(g())
}}});var J=function(af){$("#"+af).append('<div class="btn-dialog" btndialog="'+af+'"></div>')
};var ae=function(ag,af){$("#"+ag).prev("div").find("span").prepend(af)
};var ac=function(ah,af,ag){$("#"+ah).prev("div").find("span").prepend(' <a href="'+ag+'" target="_blank"><img src="'+af+'" alt="Img" class="img-title"></a>')
};var j=function(ah,ag,af){$("#"+ah).prev("div").find("span").append(' <a href="'+af+'" target="_blank" class="'+ag+'"></a>')
};var P=function(ah,ag,af){$("#"+ah).prev("div").find("span").prepend('<a href="'+af+'" target="_blank" class="'+ag+'"></a>')
};var B=function(ah,ag){if(ag==undefined){var af=function(){alert("No attached Handler")
}}else{var af=ag}$('div[btndialog="'+ah+'"]').append($('<a class="btn btn-sm btn-default">Ok</a>').click(function(){T(ah);
af()}))};var S=function(af){$('div[btndialog="'+af+'"]').append($('<a class="btn btn-sm btn-warning">Cancel</a>').click(function(){T(af)
}))};var Z=function(ag,ah){var af=e();o(af,false,H("Information",ah),p(ag));
u(af);F(af)};var k=function(ag,ah){var af=e();o(af,false,H("INFO",ah),"<pre>"+Q(ag,"  ").replace(/[\n]+/g,"<br />")+"</pre>");
ae(af,'<span class="glyphicon glyphicon-info-sign"></span>');
u(af);F(af)};var U=function(ah,ag,ai){var af=e();
o(af,false,H("Confirmation",ai),p(ah));ae(af,'<span class="glyphicon glyphicon-ok-sign"></span>');
J(af);B(af,ag);S(af);u(af);F(af)};var G=function(ag,ah){var af=e();
Alix_Out.infoTrace(ag);if(jQuery.isPlainObject({})){o(af,false,H("Error",ah),Q(ag,"&nbsp;&nbsp;").replace(/\n[\n\s]*/g,"<br />"))
}else{o(af,false,H("Error",ah),p(ag))}ae(af,'<span class="glyphicon glyphicon-remove-sign"></span>');
u(af);F(af)};var ad=function(am,af,an,ap,aj,ao,ah){var ag=e();
var ak='<form id="upload-form" class="form-horizontal" target="_sblank" action="'+af+'" method="post"enctype="multipart/form-data">';
if(ao!=null){for(var ai=0;ai<ao.length;ai++){ak+="<input type='hidden'  name='"+ao[ai].name+"'  value='"+ao[ai].value+"'>"
}}ak+="<input type='hidden'  name='fileName'  value=''>";
ak+='<div class="align-center"><input class="stdinput custom-file" id="uploadPanel_filename" type="file" name="file"/><p class="overflow info-upload"></p><p id="upload_status"></p><p class="form-description"></p></div><p id="infos"></p><div class="align-center"><input disabled type="submit" value="Upload" class="custom-submit"/></div></form>';
o(ag,false,am,ak);ae(ag,'<span class="glyphicon glyphicon-file"></span>');
u(ag);F(ag);$("#"+ag).find(".custom-file").on("dragover drop",function(aq){aq.preventDefault()
}).on("drop",function(aq){$("#"+ag).find(".custom-file").prop("files",aq.originalEvent.dataTransfer.files).closest("form");
$("input").prop("disabled",false)});var al=(an!=null)?an:"";
if(ah!=null&&ah.length>0){al+="<br>Preloaded files: <select id=preloadedFiles ><option/>";
for(var ai=0;ai<ah.length;ai++){al+="<option>_Goodies_"+ah[ai]
}al+="</select>"}$("#"+ag).find(".form-description").html(al);
$("#"+ag).find(".custom-file").change(function(){$("#"+ag).find(".custom-file").fadeTo("slow",0.3,function(){}).delay(800).fadeTo("slow",1);
$("input[value=Upload]").prop("disabled",false);var aq=this.value.xtractFilename().filename;
$("#"+ag).find(".info-upload").text(aq);$("input[name=fileName]").val(aq);
$("#preloadedFiles").prop("disabled",true)});$("#preloadedFiles").change(function(){var aq=$(this).val();
if(aq.length>0){$("input[value=Upload]").prop("disabled",false);
$("#uploadPanel_filename").prop("disabled",true)}else{$("input[value=Upload]").prop("disabled",true);
$("#uploadPanel_filename").prop("disabled",false)
}$("input[name=fileName]").val(aq)});$("#"+ag).find("#upload-form").ajaxForm({beforeSubmit:function(){if(aj!=null){aj()
}},success:function(ar){if(Alix_Processing.jsonError(ar,"Upload Position List Failure")){T(ag);
return}else{$("#upload_status").html("Uploaded");
$("#upload_status").css("color","green");var aq=$("#preloadedFiles option:selected").val();
if(aq==null||aq.length==0){aq=$("#"+ag).find("#uploadPanel_filename").val()
}obj_retour={retour:ar,path:aq.xtractFilename()};
if(ap!=null){ap(obj_retour)}else{var at=Q(obj_retour).replace(/\n/g,"<br />");
at=at.replace(/^<br\s*\/?>|<br\s*\/?>$/g,"");$("#infos").html(at)
}Alix_Modalinfo.close(ag)}}})};var X=function(ah,af,ag){if(ag!=undefined){$("body").append("<div id='"+ah+"' title='"+ag+"' class='custom-modal'> </div>")
}else{$("body").append("<div id='"+ah+"' title='Preview of "+af+"' class='custom-modal'> </div>")
}$("#"+ah).dialog({resizable:false});$("#"+ah).append('<iframe src="'+af+'" iframeid="'+ah+'">Waiting on server response...</iframe>');
$("#"+ah).dialog("option","height",$(window).height());
$("#"+ah).dialog("option","width","80%");$("#"+ah).dialog("option","position",{my:"center",at:"center",of:window})
};var R=function(ah,af,ag){if(ag!=undefined){$("body").append("<div id='"+ah+"' title='"+ag+"' class='custom-modal'> </div>")
}else{$("body").append("<div id='"+ah+"' title='Preview of "+af+"' class='custom-modal'> </div>")
}$("#"+ah).dialog({resizable:false});$("#"+ah).append('<div id="'+ah+'">Waiting on server response...</iframe>');
$("#"+ah).dialog("option","width","80%");$("#"+ah).dialog("option","position",{my:"center",at:"center",of:window});
$("#"+ah).load(af)};var y=function(ah,af,ag){if(ag!=undefined){$("body").append("<div id='"+ah+"' title='"+ag+"' class='custom-modal img-panel'> </div>")
}else{$("body").append("<div id='"+ah+"' title='Preview of "+af+"' class='custom-modal img-panel'> </div>")
}$("#"+ah).dialog({resizable:false});$("#"+ah).append('<img imgpanelid="'+ah+'" src="'+af+'">');
$('img[imgpanelid="'+ah+'"]').load(function(){O(ah)
})};var O=function(aj){var ai=$("#"+aj).prop("scrollHeight");
var ag=$("#"+aj).prop("scrollWidth");var ah=ag+30;
var af=ai+60;$("#"+aj).dialog("option","height",af);
$("#"+aj).dialog("option","width",ah);$("#"+aj).dialog("option","position",{my:"center",at:"center",of:window})
};function N(ag){var ah=window.location;var af=document.createElement("a");
af.href=ag;return af.hostname==ah.hostname&&af.port==ah.port&&af.protocol==ah.protocol
}var z=function(ai,ag){var af=e();if(ai.url!=undefined){var ah=ai.url;
var aj=ai.title}else{var ah=ai;var aj=undefined}if(ag!=undefined&&ag==true){y(af,ah,aj)
}else{X(af,ah,aj)}j(af,"floppy",ah);$("#"+af).prev("div").find("span").find(".img-title").click(function(){Alix_PageLocation.changeLocation(ah)
});u(af);F(af)};var ab=function(ai,ag){var af=e();
if(ai.url!=undefined){var ah=ai.url;var aj=ai.title
}else{var ah=ai;var aj=undefined}if(N(ah)){if(ag!=undefined&&ag==true){y(af,ah,aj)
}else{R(af,ah,aj)}j(af,"floppy",ah);$("#"+af).prev("div").find("span").find(".img-title").click(function(){Alix_PageLocation.changeLocation(ah)
});u(af);F(af)}else{Alix_PageLocation.changeLocation(ah)
}};var r=function(af){Alix_Processing.show("Waiting on Simbad Response");
$.getJSON("simbadtooltip",{pos:af},function(an){Alix_Processing.hide();
if(Alix_Processing.jsonError(an,"Simbad Tooltip Failure")){return
}else{var al="";al+='<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
var ai=e();o(ai,false,"Simbad Summary for Position "+af+'<a class=simbad target=blank href="http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord='+encodeURIComponent(af)+'"></a>',al,1000);
u(ai);F(ai);$("#"+ai).css("overflow","hidden");var ak={aoColumns:an.aoColumns,aaData:an.aaData,bPaginate:true,sPaginationType:"full_numbers",aaSorting:[],bSort:false,bFilter:true,bAutoWidth:true,bDestroy:true};
var aj;if(an.aaData.length>0){aj='<img src="http://alasky.u-strasbg.fr/cgi/simbad-thumbnails/get-thumbnail.py?name='+encodeURIComponent((an.aaData[0])[0])+'"/>'
}else{var am="aladin-lite-catdiv";var ah="aladin-lite-catdiv-info";
aj='<span class="help">No vignette available</span>'
}var ag=[{name:aj,pos:"top-left"},{name:"filter",pos:"top-right"},{name:"information",pos:"bottom-left"},{name:"pagination",pos:"bottom-center"},{name:" ",pos:"bottom-right"}];
Alix_CustomDataTable.create("simbadtable",ak,ag);
$("#"+ai).find(".dataTables_filter").css("margin-top","34%");
$("#"+ai).dialog("option","position",{my:"center",at:"center",of:window})
}})};var w=function(ak){var ai="";ai+='<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
var af=e();o(af,false,"Simbad Summary for Position "+am+'<a class=simbad target=blank href="http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord='+encodeURIComponent(am)+'"></a>',ai,1000);
u(af);F(af);var al=(ak.ra)?Numbers.toSexagesimal(ak.ra/15,8,false):" ";
var aj=(ak.dec)?"+"+Numbers.toSexagesimal(ak.dec,7,false):"";
var am=al+" "+aj;var ah='<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
if(ak.data!=undefined){for(key in ak.data){if(ak.data[key]){ah+='<tr style="background-color:#ffeded;"><th style="text-align:right">'+key+":</th><td>  "+ak.data[key]+"</td></tr>"
}}}else{for(key in ak){if(ak[key]){ah+='<tr><th style="text-align:right">'+key+':&nbsp;</th><td style="text-align:justify">'+ak[key]+"</td></tr>"
}}}ah+="</table></div></div>";var ag="http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
ag+=encodeURIComponent('format object "%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)"\n'+am+" radius=1m","ISO-8859-1");
$.ajax({url:ag,method:"GET",async:true,dataType:"text",success:function(aM){var az;
var av=false;var aJ={};var aG=[];var aw=[];var aq={};
aq.sTitle="ID";aw.push(aq);var ap={};ap.sTitle="Position";
aw.push(ap);var an={};an.sTitle="Type";aw.push(an);
aJ.aoColumns=aw;var aK=0;var ao=aM.split("\n");var aH=0;
while((az=ao[aH])!=undefined){if(av){var aE=az.trim().split("|",-1);
let am=aE.length-1;if(am>=3){var at=aE[am];am--;var aB=aE[am];
am--;var aF=aE[am];var aC=aE[0].split(/\s{2,}/)[0].trim();
var aA=[];aA.push(aC.trim());aA.push(aF+" "+aB);aA.push(at.trim());
aG.push(aA);aK++;if(aK>=15){var aA=[];aA.push("truncated to 15");
aA.push("");aA.push("");aG.push(aA);aK++}}}else{if(az.startsWith("::data")){av=true
}}aH++}aJ.aaData=aG;aJ.iTotalRecords=aK;aJ.iTotalDisplayRecords=aK;
if(Alix_Processing.jsonError(aJ,"Simbad Tooltip Failure")){return
}else{var aI="";aI+='<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
var aL=e();o(aL,false,"Simbad Summary for Position "+am+'<a class=simbad target=blank href="http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord='+encodeURIComponent(am)+'"></a>',aI,1000);
u(aL);F(aL);$("#"+aL).css("overflow","hidden");var ar={aoColumns:aJ.aoColumns,aaData:aJ.aaData,bPaginate:true,sPaginationType:"full_numbers",aaSorting:[],bSort:false,bFilter:true,bAutoWidth:true,bDestroy:true};
var aO;var aN=[{name:aO,pos:"top-left"},{name:"filter",pos:"top-right"},{name:"information",pos:"bottom-left"},{name:"pagination",pos:"bottom-center"},{name:" ",pos:"bottom-right"}];
Alix_CustomDataTable.create("simbadtable",ar,aN);
$("#simbadtable_next").text("&nbsp;&nbsp;&nbsp;");
$("#simbadtable_previous").text("&nbsp;&nbsp;&nbsp;");
$("#simbadtable_paginate").css("left","250px");$(".txt-left").remove();
$("#"+aL).find(".dataTables_filter").css("margin-top","34%");
$("#"+aL).find(".dataTables_filter").css("position","absolute");
$("#"+aL).find(".dataTables_filter").css("left","1000px");
$("#"+aL).find(".dataTables_filter").css("top","-394px");
$("#"+aL).find(".dataTables_filter").css("z-index","1");
var aD=$("#"+aL).find(".dataTables_filter");var ay='<div id="simbadtable_search" style="font-size:15px;font-family:sans-serif;position:relative;right:180px;bottom:22px">search: </div>';
$("#simbadtable_filter").append(ay);$("#"+aL).dialog("option","position",{my:"center",at:"center",of:window});
var ax=$("#"+aL).parent("div");ax.append(ah);ax.append(aD);
ax.css("width","1300px");ax.css("height","390px");
$("#"+aL).css("width","1000px");$("#"+aL).css("left","298px");
$("#"+aL).css("top","15px");var au=$("#SimbadSourceDiv");
au.css("display","block");au.css("position","absolute");
au.css("top","70px");au.css("left","0px");au.css("background-color","#ffeded")
}}})};this.regionEditor=null;region=function(ah,ag){var af=e();
$(document.documentElement).append('<div id="'+af+'" class="aladin-lite-div" style="width: 400px; height: 400px"></div>');
this.regionEditor=new RegionEditor_mVc(af,ah,ag);
this.regionEditor.init();$("#"+af).dialog({width:"auto",dialogClass:"d-maxsize",title:"Sky Region Editor (beta)",zIndex:zIndexModalinfo});
u(af);F(af);$(".aladin-box").css("z-index",(9999));
this.regionEditor.setInitialValue(ag)};var M=function(){$('div[pos="'+$(".aladin-lite-div").attr("id")+'"]').remove();
$(".aladin-lite-div").remove()};var W=function(ak,al,ag,aj){var af=e();
$("body").append("<div id='"+af+"' class='aladin-lite-stcdiv'></div>");
var ai=(aj==null)?function(am,an){}:aj;var ah=(ag==null)?function(am,an){}:ag;
$("#"+af).html(al);$("#"+af).dialog({resizable:false,width:"auto",title:ak,close:ai,open:ah});
u(af);F(af)};var b="modalinfodiv";var C="."+b;var V=function(al,ag){if($(C).length!=0){$(C).html("");
$(C).load(ag);var ai=function(am,an){$(C).html("")
};$(C).on("dialogclose",ai);$('div[pos="'+$(C).attr("id")+'"]').on("click",ai);
var ah=$(C).attr("id");var aj=g();$(document).on("keydown",function(am){if(am.keyCode==27){if(aj==ah){ai()
}}})}else{var ak=9999;if($(".modalresult").length!=0){ak=$(".modalresult").zIndex()+10
}var af=e();$(document.documentElement).append('<div id="'+af+'" class="'+b+'" style="display: none; width: auto; hight: auto;"></div>');
var ai=function(am,an){$("#"+af).html("")};$("#"+af).load(ag);
$("#"+af).dialog({width:"auto",dialogClass:"d-maxsize",title:al,fluid:true,close:ai,resizable:false});
if($("#"+af).find("h4").find("#detailhisto").length){if($(window).width()>=1000){$("#"+af).dialog("option","width",1000);
a()}else{L()}}$("#"+af).zIndex(ak);$('div[pos="'+$(C).attr("id")+'"]').on("click",ai);
var ah=$(C).attr("id");var aj=g();$(document).on("keydown",function(am){if(am.keyCode==27){if(aj==ah){ai()
}}});u(af);F(af)}};var K=function(ak,aj,ag,an){if($(C).length!=0){$(C).html("");
$(C).html(aj);$(C).css("background-color",an);var ai=(ag==null)?function(ao,ap){$(C).html("")
}:ag;$(C).on("dialogclose",ai);$('div[pos="'+$(C).attr("id")+'"]').on("click",ai);
var am=$(C).attr("id");var al=g();$(document).on("keydown",function(ao){if(ao.keyCode==27){if(al==am){ai()
}}})}else{var af=9999;if($(".modalresult").length!=0){af=$(".modalresult").zIndex()+10
}var ah=e();$(document.documentElement).append('<div id="'+ah+'" class="'+b+'" style="display: none; width: auto; hight: auto;"></div>');
var ai=(ag==null)?function(ao,ap){$("#"+ah).html("")
}:ag;if(an!=null){$("#"+ah).css("background-color",an)
}$("#"+ah).html(aj);$("#"+ah).dialog({width:"auto",dialogClass:"d-maxsize",title:ak,fluid:true,close:ai,resizable:false});
if($("#"+ah).find("h4").find("#detailhisto").length){if($(window).width()>=1000){$("#"+ah).dialog("option","width",1000);
a()}else{L()}}$("#"+ah).zIndex(af);$('div[pos="'+$(C).attr("id")+'"]').on("click",ai);
var am=$(C).attr("id");var al=g();$(document).on("keydown",function(ao){if(ao.keyCode==27){if(al==am){ai()
}}});u(ah);F(ah)}};var Y=function(){T($(C).attr("id"))
};$(document).on("dialogopen",".ui-dialog",function(af,ag){});
$(document).on("dialogclose",".ui-dialog",function(af,ag){$(window).off("resize.responsive")
});var L=function L(){var af=$(".ui-dialog:visible");
af.each(function(){var ah=$(this);var ag=ah.find(".ui-dialog-content").data("dialog");
if(ag&&ag.options.maxWidth&&ag.options.width){ah.css("max-width",ag.options.maxWidth);
ag.option("position",ag.options.position)}if(ag&&ag.options.fluid){$(window).on("resize.responsive",function(){var ai=$(window).width();
if(ai<ag.options.maxWidth+50){ah.css("width","90%")
}ag.option("position",ag.options.position)})}})};
var c=function(){return $(C).html()};var a=function(){var af=$(C).parent();
af.css("position","absolute");af.css("top",Math.max(0,(($(window).height()-af.outerHeight())/2)+$(window).scrollTop())+"px");
af.css("left",Math.max(0,(($(window).width()-af.outerWidth())/2)+$(window).scrollLeft())+"px")
};var m=function(af){if($("#aladin-lite-div").length<=0){$("body").append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
var ag={defaultView:{defaultSurvey:"DSS colored"}};
configureALIX(ag);AladinLiteX_mVc.popup()}else{if(!$("#aladin-lite-div").dialog("isOpen")){AladinLiteX_mVc.popup();
AladinLiteX_mVc.setRegion("",1)}}if(af!=undefined){AladinLiteX_mVc.gotoPositionByName(af)
}};var l=function(aj){if($("#aladin-lite-div").length<=0){$("body").append('<div id="aladin-lite-div" style="width:500px;height:500px;padding:5px;display:none;overflow:hidden"></div>');
var am={defaultView:{defaultSurvey:"DSS colored"}};
configureALIX(am);AladinLiteX_mVc.popup()}else{if(!$("#aladin-lite-div").dialog("isOpen")){AladinLiteX_mVc.popup()
}}if(aj!=undefined){var al={type:"array",value:aj};
var ah={defaultSurvey:"DSS colored"};AladinLiteX_mVc.setRegion(al,2);
var ag=BasicGeometry.getEnclosingView(x);var ak=Numbers.toSexagesimal(ag.center.ra/15,8,false);
var ai=Numbers.toSexagesimal(ag.center.dec,7,false);
var af=ak+" "+ai;AladinLiteX_mVc.gotoPositionByName(af)
}};var v={};v.dump=Q;v.dumpAscii=E;v.nextId=e;v.findLastModal=g;
v.setShadow=u;v.whenClosed=F;v.setModal=o;v.close=T;
v.info=Z;v.infoObject=k;v.confirm=U;v.error=G;v.uploadForm=ad;
v.openIframePanel=z;v.openIframeCrossDomainPanel=ab;
v.iframePanel=z;v.simbad=r;v.region=region;v.closeRegion=M;
v.dataPanel=K;v.closeDataPanel=Y;v.fluidDialog=L;
v.getHtml=c;v.center=a;v.addIconTitle=ae;v.SimbadCatalog=w;
v.showPopup=m;v.changeRefBlue=l;return v}();console.log("=============== >  Alix_Modalinfo.js ");
let Alix_Out=function(){var r=false;var n=false;var o=false;
var m=function(z,y,w){if(!o){var v=new Error("dummy");
var u;if(w&&(u=v.stack)!=null){var s=u.split("\n");
for(var t=3;t<s.length;t++){if(t>3&&!w){break}}}}};
var j=function(){l();traceModeOff();o=true};var k=function(){o=false;
n=true};var b=function(){n=false};var g=function(){o=false;
r=true};var l=function(){r=false};var d=function(s){if(r){m("DEBUG",s,false)
}};var p=function(s){if(r){m("DEBUG",s,true)}};var c=function(s){if(r){m("DEBUG",s,n)
}};var a=function a(s){m(" INFO",s,false)};var h=function(s){m(" INFO",s,true)
};var f=function(s){m(" INFO",s,n)};var q=function(){var s=(RegExp("debug=(.+?)(&|$)").exec(location.search)||[,null])[1];
l();b();if(s!=null){if(s=="on"){Alix_Out.info("Set debug on and trace off");
Alix_Out.debugModeOn();Alix_Out.traceOff()}else{if(s=="withtrace"){Alix_Out.info("Set debug on and trace on");
Alix_Out.debugModeOn();Alix_Out.traceOn()}else{if(s=="traceonly"){Alix_Out.info("Set debug off and trace on");
Alix_Out.debugModeOff();Alix_Out.traceOn()}else{Alix_Modalinfo.info("debug parameter must be either on, withtrace or traceonly. It is ignored for this session.")
}}}}};var e={};e.debugMsg=d;e.debugTrace=p;e.infoMsg=a;
e.infoTrace=h;e.info=f;e.debugModeOn=g;e.debugModeOff=l;
e.debug=c;e.traceOn=k;e.traceOff=b;e.setPackedMode=j;
e.setdebugModeFromUrl=q;return e}();console.log("=============== >  Alix_Out.js ");
let Alix_PageLocation=function(){var e=this;var b=null;
var d=function(g,j){Alix_Out.info("changeLocation to "+g);
authOK=true;var h=(j)?j:"_blank";window.open(g,h)
};var a=function(g){authOK=true;if(!g.startsWith("http")){g=window.location.protocol+"//"+window.location.hostname+(location.port?":"+location.port:"")+window.location.pathname+"/"+g
}Alix_Out.info("Download "+g);if(b==null){$(document.body).append('<iframe id="downloadIframe" src="'+g+'" style="display: hiddden;">Waitng for server response...</iframe>');
this.downloadIframe=$("#downloadIframe")}else{this.downloadIframe.attr("src",g)
}};var f=function(){Alix_Out.info("Prompt user before to leave");
window.onbeforeunload=function(){if(!e.authOK){if(WebSamp_mVc.fireIsConnected()){WebSamp_mVc.fireUnregister()
}return"WARNING: Reloading or leaving this page will lost the current session"
}else{e.authOK=false}}};var c={};c.download=a;c.changeLocation=d;
c.confirmBeforeUnlaod=f;c.confirmBeforeUnload=f;return c
}();console.log("=============== >  Alix_PageLocation.js ");
let Alix_Printer=function(){var c=function(f){var g="<a href='#' onclick='Alix_Printer.printDiv(\""+f+"\");' class='printer'></a>";
return g};var e=function(f){var g="<a href='#' onclick='Alix_Printer.printDiv(\""+f+"\");' class='dlprinter'></a>";
return g};var b=function(f,g){$("#"+g).append(printer.getPrintButton(f))
};var a=function(f){var g=$("#"+f);if(!g){Alix_Modalinfo.error("PRINT: the element "+f+" doesn't exist")
}else{Alix_Out.infoMsg(g);g.print()}};var d={};d.getPrintButton=c;
d.getSmallPrintButton=e;d.insertPrintButton=b;d.printDiv=a;
return d}();console.log("=============== >  Alix_Printer.js ");
var zIndexProcessing=4000;let Alix_Processing=function(){var g=-1;
var b=function(k,l,j){if(k==undefined||k==null){Alix_Modalinfo.error("JSON ERROR: "+l+": no data returned");
return true}else{if(k.errormsg!=null){if(j==undefined){Alix_Modalinfo.error(k.errormsg,l)
}else{Alix_Modalinfo.error(j)}return true}}return false
};var a=function(j){Alix_Out.debug("PROCESSSING (show and hide) "+j);
d(j);setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");',500)
};var h=function(j,k){Alix_Out.debug("PROCESSSING (show and hide) "+j);
d(j+" (automatically closed after "+(k/1000)+"s)");
setTimeout('$("#saadaworking").css("display", "none");$("#saadaworkingContent").css("display", "none");',k)
};var d=function(k){var j=k;j=j.replace(/"/g,"");
Alix_Out.info("PROCESSSING "+j);stillToBeOpen=true;
if($("#saadaworking").length==0){$(document.body).append('<div id="saadaworking" style="margin: auto;padding: 5px; display: none;z-index: '+zIndexProcessing+';opacity: 0.5;top: 0; right: 0; bottom: 0; left: 0;background-color: black;position: fixed;"></div><div id="saadaworkingContent" style="position:absolute; top:50%;margin-top:-22px; width: 300px;  margin-left: -150px; left: 50%; background-color: white; opacity: 1;z-index: '+(zIndexProcessing+1)+'; border:5px solid #DDD; border-radius: 5px"></div>')
}$("#saadaworkingContent").html("<div class=progresslogo></div><div id=saadaworkingContentText class=help style='margin-top: 8px; display: inline; width: 240px; float:left; padding: 5px;font-size: small;'>"+j+"</div>");
$("#saadaworking").css("display","inline");$("#saadaworkingContent").css("display","inline");
g=new Date().getTime()};var f=function(){Alix_Out.debug("close processing");
var k=$("#saadaworkingContentText").text();var j=new Date().getTime();
if((j-g)<700){setTimeout('Alix_Processing.closeIfNoChange("'+k+'" )',700)
}else{$("#saadaworking").css("display","none");$("#saadaworkingContent").css("display","none")
}};var c=function(k){var j=$("#saadaworkingContentText").text();
if(j==k){$("#saadaworking").css("display","none");
$("#saadaworkingContent").css("display","none")}else{Alix_Out.debug("The content of the progress dialog has changed: not closing it")
}};var e={};e.show=d;e.hide=f;e.closeIfNoChange=c;
e.jsonError=b;e.showWithTO=h;e.showAndHide=a;return e
}();console.log("=============== >  Alix_Processing.js ");
let Alix_SkyGeometry=function(){var c=function(e){return e*Math.PI/180
};var d=function(e){return e*180/Math.PI};var a=function(m,j,l,g){var k=c(m);
var h=c(l);var f=c(j);var e=c(g);return d(Math.acos((Math.sin(f)*Math.sin(e))+(Math.cos(f)*Math.cos(e)*Math.cos(k-h))))
};var b={};b.toRadians=c;b.toDegrees=d;b.distanceDegrees=a;
return b}();console.log("=============== >  Alix_SkyGeometry.js ");
function Segment(h){var g;var m;var e=[];e=h;var d;
this.IsCursorOn=function(r,s){var q;d=f(e);if(seg=p(r,s)){q=n(seg,r,s);
return q}};function p(B,z){var E=parseInt(B);var D=parseInt(z);
var t={};var q,G,C,w;for(var v in d){var r,u;var F,s;
q=e[d[v].A].cx;C=e[d[v].A].cy;G=e[d[v].B].cx;w=e[d[v].B].cy;
r=(parseInt(q)>parseInt(G))?G:q;u=(parseInt(q)>parseInt(G))?q:G;
F=(parseInt(C)>parseInt(w))?w:C;s=(parseInt(C)>parseInt(w))?C:w;
if(E>=r&&E<=u){if(D>=F&&D<=s){seg={xA:q,yA:C,xB:G,yB:w,segmento:v};
if((dis=n(seg,E,D))!=-1){return{xA:q,yA:C,xB:G,yB:w,segmento:v}
}}}if(u===r){if(D>=F&&D<=s){seg={xA:q,yA:C,xB:G,yB:w,segmento:v};
if((dis=n(seg,E,D))!=-1){return{xA:q,yA:C,xB:G,yB:w,segmento:v}
}}}if(F===s){if(E>r&&E<u){seg={xA:q,yA:C,xB:G,yB:w,segmento:v};
if((dis=n(seg,E,D))!=-1){return{xA:q,yA:C,xB:G,yB:w,segmento:v}
}}}}}function n(r,z,w){var u;var q;var t,C;if((C=a(r,z))!=-1){return{flag:"vertical",segmento:r}
}else{if((t=k(r,w))!=-1){return{flag:"horizontal",segmento:r}
}else{if(C==-1&&t==-1){var s=j(r);var B=c(r);u=Math.abs(((s*parseInt(z))+parseInt(w)+B));
q=(u/Math.sqrt(((s*s)+1)));if(q<=2&&q>=0){return{flag:"distancia",segmento:r,alfa:s,beta:B}
}}}}return -1}function f(v){var s=[];var r;var u,q;
for(var t in v){if(u==undefined){u=t}else{if(q==undefined){q=t
}}if(u!=undefined&&q!=undefined){s.push({A:u,B:q});
u=q;q=undefined}if(parseInt(e.length-1)==t){s.push({A:(e.length-1),B:0})
}}return s}function o(){context.beginPath();context.moveTo(125,158);
context.lineTo(250,158);context.moveTo(250,158);context.lineTo(250,100);
context.moveTo(250,100);context.lineTo(125,158);context.stroke();
context.closePath();for(var q in e){context.beginPath();
context.arc(e[q].cx,e[q].cy,5,0,Math.PI*2,true);context.fillStyle="blue";
context.fill();context.stroke();context.closePath()
}}function j(q){g=-((q.yB-q.yA)/(q.xB-q.xA));return g
}function c(q){m=-(g*q.xA)-q.yA;return m}function k(s,t){var r;
var q=parseInt(t);r=Math.abs(s.yA-q);if(r<=1&&r>=0){return r
}else{return -1}}function a(s,q){var t;var r=parseInt(q);
t=Math.abs(s.xA-r);if(t<=1&&t>=0){return t}else{return -1
}}this.Itersection=function(P,M){var N=f(e);var V=N.length-2;
var G=0;var F,D;var S=-1;var B,z,y,w;var L,K,J,I;
var U,T,R,Q;var v,t,s,r;P=parseInt(P);if(M===false){if(N.length>3){if(P!=0){B=e[N[V].A].cx;
U=e[N[V].A].cy;K=e[N[V].B].cx;t=e[N[V].B].cy;var E=parseInt(N[V].A);
var C=parseInt(N[V].B);for(var O in N){y=e[N[O].A].cx;
R=e[N[O].A].cy;I=e[N[O].B].cx;r=e[N[O].B].cy;S=b(B,U,K,t,y,R,I,r);
if(S!=-1){F=((y-I)*(B*t-U*K)-(B-K)*(y*r-R*I))/S;D=((R-r)*(B*t-U*K)-(U-t)*(y*r-R*I))/S;
var W=l(B,U,K,t,y,R,I,r,F,D);if(W!=-1){if(O!=(N.length-1)){if(I!=B&&r!=U){return{x1:B,y1:U,x2:K,y2:t,seginit:V,segfin:O,nA:E,nB:C}
}}}}}}else{if(P===0){B=e[N[G].A].cx;U=e[N[G].A].cy;
K=e[N[G].B].cx;t=e[N[G].B].cy;var E=parseInt(N[G].A);
var C=parseInt(N[G].B);N.reverse();for(var O in N){if(O!=0){y=e[N[O].A].cx;
R=e[N[O].A].cy;I=e[N[O].B].cx;r=e[N[O].B].cy;S=b(B,U,K,t,y,R,I,r);
if(S!=-1){F=((y-I)*(B*t-U*K)-(B-K)*(y*r-R*I))/S;D=((R-r)*(B*t-U*K)-(U-t)*(y*r-R*I))/S;
var W=l(B,U,K,t,y,R,I,r,F,D);if(W!=-1){if(O!=(N.length-1)){if(K!=y&&t!=R){return{x1:B,y1:U,x2:K,y2:t,seginit:V,segfin:O,nA:E,nB:C}
}}}}}}}}}}else{if(M){var q={},X={};var H;var u=[];
if(N.length>3){if(P===0){q.xA=e.length-1;q.xB=P;X.xA=P;
X.xB=P+1}else{if(P===(e.length-1)){q.xA=P-1;q.xB=P;
X.xA=P;X.xB=0}else{q.xA=P-1;q.xB=P;X.xA=P;X.xB=P+1
}}for(var O in N){if(parseInt(N[O].A)===q.xA&&parseInt(N[O].B)==q.xB){continue
}else{if(parseInt(N[O].A)===X.xA&&parseInt(N[O].B)==X.xB){continue
}else{B=e[q.xA].cx;U=e[q.xA].cy;K=e[q.xB].cx;t=e[q.xB].cy;
y=e[N[O].A].cx;R=e[N[O].A].cy;I=e[N[O].B].cx;r=e[N[O].B].cy;
S=b(B,U,K,t,y,R,I,r);if(S!=-1){F=((y-I)*(B*t-U*K)-(B-K)*(y*r-R*I))/S;
D=((R-r)*(B*t-U*K)-(U-t)*(y*r-R*I))/S;var W=l(B,U,K,t,y,R,I,r,F,D);
if(W!=-1){if(B!=I&&U!=r){u.push({x1:B,y1:U,x2:K,y2:t})
}}}B=e[X.xA].cx;U=e[X.xA].cy;K=e[X.xB].cx;t=e[X.xB].cy;
S=b(B,U,K,t,y,R,I,r);if(S!=-1){F=((y-I)*(B*t-U*K)-(B-K)*(y*r-R*I))/S;
D=((R-r)*(B*t-U*K)-(U-t)*(y*r-R*I))/S;var W=l(B,U,K,t,y,R,I,r,F,D);
if(W!=-1){if(B!=I&&U!=r){u.push({x1:B,y1:U,x2:K,y2:t})
}}}if(u.length>1){return u}}}}}}}return -1};function b(s,y,r,w,q,v,z,u){var t=((s-r)*(v-u))-((y-w)*(q-z));
if(t==0){return -1}else{return t}}function l(s,B,r,w,q,u,C,t,z,v){if(v<Math.min(B,w)||v>Math.max(B,w)){return -1
}if(v<Math.min(u,t)||v>Math.max(u,t)){return -1}if(z<Math.min(s,r)||z>Math.max(s,r)){return -1
}if(z<Math.min(q,C)||z>Math.max(q,C)){return -1}return 2
}}console.log("=============== >  Segment.js ");var BasicGeometry=function(){function b(f,d){var g=new Coo(f[0],f[1]);
var e=new Coo(d[0],d[1]);return g.distance(e)}function c(D){var n=0;
var o=new Coo();var F=360;var I=0;var r=+90;var u=-90;
var E;var C;var g,e;var y,w;for(var k=0;k<D.length;
k++){E=D[k];g=E[0];y=E[1];if(g>I){I=g}if(g<F){F=g
}if(y>u){u=y}if(y<r){r=y}for(var h=D.length/2;h<D.length;
h++){C=D[Math.floor(h)];e=C[0];w=C[1];var J;if(n<(J=BasicGeometry.distanceBetweenNodes(E,C))){n=J
}}}var s=[];for(var k=0;k<(D.length-1);k++){E=D[k];
s.push(new Coo(E[0],E[1]))}var l=0,j=0,f=0;for(var k=0;
k<s.length;k++){var G=s[k];l+=G.x;j+=G.y;f+=G.z}l=l/s.length;
j=j/s.length;f=f/s.length;var t=1/Math.sqrt(l*l+j*j+f*f);
l*=t;j*=t;f*=t;var o=new Coo();o.x=l;o.y=j;o.z=f;
o.computeLonLat();var z=0;var H=0;for(var k=0;k<s.length;
k++){var G=s[k];var p=[o.lon-n/2,G.lat];if(p[0]<0){p[0]=360+p[0]
}if(p[0]>360){p[0]=p[0]-360}var K=[o.lon+n/2,G.lat];
if(K[0]<0){K[0]=360+K[0]}if(K[0]>360){K[0]=K[0]-360
}var m=BasicGeometry.distanceBetweenNodes(K,[G.lon,G.lat]);
if(n<m){z=m-n}var q=BasicGeometry.distanceBetweenNodes(p,[G.lon,G.lat]);
if(n<q){z=q-n}var B=[G.lon,o.lat+n/2];if(B[1]>90){B[1]=180-B[1]
}var v=[G.lon,o.lat-n/2];if(v[1]<-90){v[1]=-180+v[1]
}if(G.lat<v[1]){H=v[1]-G.lat}else{if(G.lat>B[1]){H=G.lat-B[1]
}}}return{center:{ra:(o.lon-z),dec:(o.lat-H)},size:n}
}var a={};a.distanceBetweenNodes=b;a.getEnclosingView=c;
return a}();console.log("=============== >  AstroCoo.js ");
var LibraryMap=function(){this.colorMap={};this.colorMap.Simbad={color:"#d66199",catalog:"Simbad",dot:""};
this.colorMap.NED={color:"orange",catalog:"NED",dot:""};
this.colorMap.green_apple={color:"#00ff02",catalog:"",dot:""};
this.colorMap.purple={color:"#7f00d4",catalog:"",dot:""};
this.colorMap.salmon={color:"#ff9966",catalog:"",dot:""};
this.colorMap.dark_bleu={color:"#0034f1",catalog:"",dot:""};
this.colorMap.red_apple={color:"#ff0000",catalog:"",dot:""};
this.colorMap.sky_bleu={color:"#03fffc",catalog:"",dot:""};
this.colorMap.brown={color:"#975200",catalog:"",dot:""};
this.colorMap.yellow={color:"#faff00",catalog:"",dot:""};
this.colorMap.argent={color:"#f3f3f3",catalog:"",dot:""}
};LibraryMap.prototype={getNextFreeColor:function(a){for(var b in this.colorMap){if(this.colorMap[b].catalog==""){this.colorMap[b].catalog=a;
return this.colorMap[b]}}return null},freeColor:function(a){for(var b in this.colorMap){if(this.colorMap[b].catalog==a){this.colorMap[b].catalog=""
}}},getColorByCatalog:function(a){for(var b in this.colorMap){if(this.colorMap[b].catalog==a){return this.colorMap[b];
break}}},setCatalogByColor:function(b){for(var a in this.colorMap){if(this.colorMap[a].color==b.color){this.colorMap[a].catalog=b.catalog
}}}};console.log("=============== >  LibraryMap.js ");
var LibraryCatalogItem=function(a){this.id=a.id;this.url=a.url;
this.name=a.name;this.nameTemp=a.nameTemp;this.color=a.color;
this.shape=a.shape;this.size=a.size;this.obs_id=a.obs_id;
this.fade=a.fade;this.al_refs=a.al_refs};var LibraryCatalog=function(){var h=[];
var a=0;function f(){for(var j in h){if(h[j].id>a){a=h[j].id
}}return a+1}function g(k){h[k.name]=new LibraryCatalogItem(k);
h[k.name].id=f();for(var j in h){}}function c(j){if(h[j]==undefined){}return h[j]
}function d(j){delete h[j];for(var j in h){}}function b(k){var j=k.name;
if(k.url){h[j].url=k.url}if(k.color){h[j].color=k.color
}if(k.shape){h[j].shape=k.shape}if(k.size){h[j].size=k.size
}if(k.fade){h[j].fade=k.fade}if(k.al_refs){h[j].al_refs=k.al_refs
}if(k.obs_id){h[j].obs_id=k.obs_id}if(k.nameTemp){h[j].nameTemp=k.nameTemp
}if(k.name=="Swarm"){SwarmDynamicFilter.runConstraint()
}}var e={};e.catalogs=h;e.addCatalog=g;e.getCatalog=c;
e.delCatalog=d;e.updCatalog=b;return e}();console.log("=============== >  LibraryCatalog.js ");
var MasterResource=function(a){if(a){this.actions=a.actions;
this.affichage=a.affichage;this.parseLocation(a.affichage);
this.tab=[];this.filtered=(a.filtered==undefined||a.filtered!=true)?false:true
}};MasterResource.prototype={parseLocation:function(b){var a=b.location;
if(a&&a.url_base){this.url=a.url_base}else{if(a&&a.service){if(a.url_query){var c=a.query.replace(/\{\$ra\}/g,"@@ra@@").replace(/\{\$dec\}/g,"@@dec@@").replace(/\{\$fov\}/g,"@@fov@@").replace(/\{\$format\}/g,"@@format@@");
this.url=a.service+encodeURI(c).replace(/@@ra@@/g,"{$ra}").replace(/@@dec@@/g,"{$dec}").replace(/@@fov@@/g,"{$fov}").replace(/@@format@@/g,"{$format}")
}}else{alert("master resource malformed");this.url=null
}}},setParamsInUrl:function(k){var p=this;var a=null;
var b;var h;if(k.masterResource.affichage.radiusUnit=="arcmin"){a=60
}else{if(k.masterResource.affichage.radiusUnit=="arcsec"){a=3600
}else{a=1}}var q=parseInt(1000*h*a)/1000+1;var g=k.ra/15;
var j=Numbers.toSexagesimal(g,8,false);var d=Numbers.toSexagesimal(k.dec,7,false);
var f=k.masterResource.affichage;var o=f.location;
if(!this.filtered&&k.fov>0.15){if(f.progressiveMode==true){h=k.fov
}else{h=0.15;WaitingPanel.warnFov()}}else{h=k.fov
}q=h*a;var c=o.url_base;if(c.includes("{$query}")){if(c.includes("{$RUNID}")){var l=o.url_query;
var n="";if(f.progressiveMode==true&&f.location.url_limit!=undefined){n=f.location.url_limit
}var m=encodeURI(f.RUNID);l=l.replace(/\{\$limitQuery\}/g,n);
l=l.replace(/\{\$ra\}/g,"($ra)");l=l.replace(/\{\$dec\}/g,"($dec)");
l=l.replace(/\{\$fov\}/g,"($fov)");var e=encodeURI(l);
e=e.replace(/\'/g,"%27");b=c.replace(/\{\$query\}/g,e);
b=b.replace(/\{\$RUNID\}/g,m);b=b.replace(/\{\$format\}/g,f.format);
b=b.replace(/\(\$ra\)/g,k.ra);b=b.replace(/\(\$dec\)/g,k.dec);
b=b.replace(/\(\$fov\)/g,q)}else{var l=o.url_query;
var n="";if(f.progressiveMode==true&&f.location.url_limit!=undefined){n=f.location.url_limit
}l=l.replace(/\{\$limitQuery\}/g,n);l=l.replace(/\{\$ra\}/g,"($ra)");
l=l.replace(/\{\$dec\}/g,"($dec)");l=l.replace(/\{\$fov\}/g,"($fov)");
var e=encodeURI(l);e=e.replace(/\'/g,"%27");b=c.replace(/\{\$query\}/g,e);
b=b.replace(/\{\$format\}/g,f.format);b=b.replace(/\(\$ra\)/g,k.ra);
b=b.replace(/\(\$dec\)/g,k.dec);b=b.replace(/\(\$fov\)/g,q)
}}else{b=this.url.replace(/\{\$ra\}/g,k.ra);b=b.replace(/\{\$dec\}/g,k.dec);
b=b.replace(/\{\$fov\}/g,q);b=b.replace(/\{\$format\}/g,f.format)
}return b},cleanTab:function(){this.tab=[]}};console.log("=============== >  MasterResource.js ");
function AladinLiteView(){this.name=null;this.ra=null;
this.dec=null;this.fov=null;this.survey=null;this.region=null;
this.id=null;this.img=null;this.XMM=false;this.catalogTab=null;
this.masterResource;this.target=[];this.comment=null;
this.key=null;this.colorMap=null;this.reverseColor=null;
this.sourceSelected={x:null,y:null}}var objs=[];var setAladinLiteView=function(c,a){objs[c.id]=new AladinLiteView();
var b=objs[c.id];b.name=c.name;b.ra=c.ra;b.dec=c.dec;
b.fov=c.fov;b.survey=c.survey;b.region=c.region;b.id=c.id;
b.img=c.img;b.XMM=c.XMM;b.catalogTab=c.catalogTab;
b.masterResource=new MasterResource(localConf.masterResource);
b.target=c.target;b.comment=c.comment;b.key=a;b.colorMap=c.colorMap;
b.reverseColor=c.reverseColor;b.sourceSelected=c.sourceSelected;
objs[c.id]=b;return b};var getAladinLiteView=function(a){if(objs[a]!=undefined){return objs[a]
}};var deleteAllObjs=function(){objs=[]};AladinLiteView.prototype={getHTMLTitle:function(){return'<div  title="replay the stored view" id="'+this.id+'" style="height:auto; overflow: auto; width: 600px; height: 55px;"><img id="'+this.id+'_snapShot_img" src="'+this.img+'" onclick="AladinLiteX_mVc.restoreViewById(&quot;'+this.id+'&quot;);" style= "height: 18px;width: 18px;">&nbsp;&nbsp;&nbsp;</img><a title="download the snapshot" href="'+this.img+'" download ="ALIX snapshot '+this.id+'"><i class="glyphicon glyphicon-download-alt" style="vertical-align: top;color:black" ></i>   </a><i id="'+this.id+'_link"  style="vertical-align: top;font-weight:800;">'+this.name+" | "+this.survey.ID+"</i>&nbsp;"+this.regionIcon()+"&nbsp;"+this.targetIcon()+'<button id="'+this.id+'_menu" type="edit list" title="menu" class="alix_btn alix_btn-color-his alix_btn-edit"><i class="glyphicon glyphicon-record" style="font-size:19px;position:relative;top:-4px;"></i></button><button id="'+this.id+'_menu_close_img" title="delete" class="alix_btn alix_btn-color-his alix_btn-in-edit" onclick="AladinLiteX_mVc.deleteHistory(&quot;'+this.id+'&quot;);"><i class="glyphicon glyphicon-remove-sign" style="font-size:15px;"></i></button><button id="'+this.id+'_menu_commit" title="remark" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-35px;" ><i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i></button><button id="'+this.id+'_menu_show_description" title="description" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:relative;left:-57px;"><i class="glyphicon glyphicon-info-sign" style="font-size:15px;"></i></button><textarea id="'+this.id+'_menu_commit_text" class="alix_text-commit" style="display:none;"></textarea><button id="'+this.id+'_menu_commit_text_confirm" class="alix_btn alix_btn-text-ok alix_btn-color-ok" style="display:none;"><i class="glyphicon glyphicon-ok" style="font-size:11px;"></i></button><button id="'+this.id+'_menu_commit_text_delete" class="alix_btn alix_btn-text-remove alix_btn-color-remove" style="display:none;"><i class="glyphicon glyphicon-remove" style="font-size:11px;"></i></button><div id="'+this.id+'_menu_commit_text_display" class="alix_menu_commit_text_display" style="">'+this.displayComment()+"</div></div>"
},regionIcon:function(){if(this.region==null){return""
}else{return'<i  title="bookmark with region" class="glyphicon glyphicon-registration-mark" style="font-size:18;vertical-align: top;"></i>'
}},targetIcon:function(){if(this.target.length==0){return""
}else{return'<i class="glyphicon glyphicon-star" style="vertical-align: top;color:red"></i>'
}},displayComment:function(){if(this.comment==null){return""
}else{return this.comment}},setHandlers:function(){var a=this;
var b=false;$("#"+this.id+"_snapShot_img").mouseover(function(c){$("#"+this.id).css("width","100px");
$("#"+this.id).css("height","100px");$("#"+$(this).attr("id").replace("_snapShot_img","")).css("height","auto")
});$("#"+this.id+"_snapShot_img").mouseout(function(c){$("#"+this.id).css("width","18px");
$("#"+this.id).css("height","18px");if(b==true){$("#"+$(this).attr("id").replace("_snapShot_img","")).css("height","auto")
}else{$("#"+$(this).attr("id").replace("_snapShot_img","")).css("height","auto")
}});$("#"+this.id+"_menu").click(function(c){if(b==false){$("#"+this.id+"_close_img").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#"+this.id+"_close_img").css("transform","translate3d(-15px,25.98px,0px)");
$("#"+this.id+"_close_img").css("transition-duration","100ms");
$("#"+this.id+"_commit").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#"+this.id+"_commit").css("transform","translate3d(15px,25.98px,0px)");
$("#"+this.id+"_commit").css("transition-duration","200ms");
$("#"+this.id+"_show_description").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#"+this.id+"_show_description").css("transform","translate3d(27px,0px,0px)");
$("#"+this.id+"_show_description").css("transition-duration","300ms");
$("#"+$(this).attr("id").replace("_menu","")).css("height","55px");
b=true}else{$("#"+this.id+"_close_img").css("transition-timing-function","ease-out");
$("#"+this.id+"_close_img").css("transform","translate3d(0px,0px,0px)");
$("#"+this.id+"_close_img").css("transition-duration","200ms");
$("#"+this.id+"_commit").css("transition-timing-function","ease-out)");
$("#"+this.id+"_commit").css("transform","translate3d(0px,0px,0px)");
$("#"+this.id+"_commit").css("transition-duration","200ms");
$("#"+this.id+"_show_description").css("transition-timing-function","ease-out");
$("#"+this.id+"_show_description").css("transform","translate3d(0px,0px,0px)");
$("#"+this.id+"_show_description").css("transition-duration","200ms");
$("#"+$(this).attr("id").replace("_menu","")).css("height","auto");
b=false}});$("#"+this.id+"_menu_commit").click(function(c){$("#"+this.id+"_text").val(a.comment);
$("#"+this.id+"_text").css("display","inline");$("#"+this.id+"_text_confirm").css("display","inline");
$("#"+this.id+"_text_delete").css("display","inline")
});$("#"+this.id+"_menu_commit_text").click(function(c){$("#"+this.id+"_confirm").css("display","inline");
$("#"+this.id+"_delete").css("display","inline")});
$("#"+this.id+"_menu_commit_text_delete").click(function(c){$(this).css("display","none");
$("#"+$(this).attr("id").replace("_delete","_confirm")).css("display","none");
$("#"+$(this).attr("id").replace("_delete","")).css("display","none")
});$("#"+this.id+"_menu_commit_text_confirm").click(function(c){$(this).css("display","none");
$("#"+$(this).attr("id").replace("_confirm","_delete")).css("display","none");
$("#"+$(this).attr("id").replace("_confirm","")).css("display","none");
a.comment=$("#"+$(this).attr("id").replace("_confirm","")).val();
$("#"+$(this).attr("id").replace("_confirm","_display")).html(a.comment);
restoreLocal(a)})},clean:function(){this.name=null;
this.ra=null;this.dec=null;this.fov=null;this.region=null;
this.id=null;this.img=null;this.catalogTab=null;this.XMM=false
}};var restoreLocal=function(e){var c;var b=jQuery.extend(true,{},e);
var d=deepClone(b);var a=JSON.stringify(d);if(e.key!=undefined){c=e.key
}else{c=new date()}localStorage.setItem(c,a)};console.log("=============== >  AladinLiteView.js ");
var getSexadecimalString=function(c,d){var b=Numbers.toSexagesimal(c/15,8,false);
var a=Numbers.toSexagesimal(d,7,false);return b+" "+a
};var alix_width=$("#aladin-lite-div").width();var alix_height=$("#aladin-lite-div").height();
var WaitingPanel=function(){var f={};var b=function(h){$("#fetchingMessage").html("Fetching data from "+h);
$("#waiting_interface").css("height","100%");$("#waiting_interface").css("width","100%");
$("#waiting_interface").css("display","inline");f[h]=true
};var c=function(h){delete f[h];for(var j in f){$("#fetchingMessage").html("Fetching data from "+j);
return}$("#waiting_interface").css("display","none")
};var a=function(){var h=$("#alert");h.html('<div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div><div class="alix_alert_fov_msg" >Search radius limited to 0.3deg;</div>');
$("#alert").fadeIn(100);setTimeout("$('#alert').fadeOut('slow')",1300)
};var d=function(){WaitingPanel.warn("Number of displayed sources limited to 999")
};var g=function(h){var j=$("#alert");j.html('<div class="alix_alert_fov_msg">'+h+"</div>");
$("#alert").fadeIn(100);setTimeout("$('#alert').fadeOut('slow')",1300)
};var e={show:b,hide:c,warnNbSources:d,warnFov:a,warn:g};
return e}();var AladinLiteX_mVc=function(){var V=this;
var aC;var E;var aX;var aB;var j;var ao;var aZ;var aT;
var T;var a4;var aH;var ax;var ab;var L;var aQ;var m;
var a0;var bm;var bj;var ag;var aO;var n;var bl="AladinHipsImagesExplorer_mask";
var aE="status-select";var aK="Aladin-Cataloge";var bk="detail-cata";
var a9="vizier";var bd=new AladinLiteView();var a=null;
var a6;var ac=null;var aq={name:null,ra:null,dec:null};
var aL=false;var ap=false;var aF=function(bo){T=bo.parentDivId;
aZ=bo.parentDivId+"-main";aH=bo.parentDivId+"-menu";
aQ=bo.parentDivId+"-context";ab=bo.parentDivId+"-target";
a0=bo.parentDivId+"-select";var bn=bo.showAssociated;
var bp=bo.showPanel;if(bo.masterResource!=undefined){bd.masterResource=new MasterResource(bo.masterResource)
}else{bd.masterResource=null}if(bo.controllers.historic!=undefined){bo.controllers.historic.model=new Historique_Mvc("panel_history",this)
}if(bo.controllers.regionEditor!=undefined||(bo.defaultView!=undefined&&bo.defaultView.region!=undefined)){bo.controllers.regionEditor.view=new RegionEditor_mVc(this,T,"panel_region",function(bq){if(bq.userAction){AladinLiteX_mVc.storePolygon(bq.region);
alert(JSON.stringify(bq))}},bo.defaultView.defaultRegion)
}if(bo.controllers.hipsSelector!=undefined){bo.controllers.hipsSelector.model=new HipsSelector_Mvc(T,this)
}aC=bo.controllers;E=new AladinLite_mvC(V,bo.controllers);
aI(bo.defaultView,bo.controllers,bo.masterResource);
$(".aladin-reticleCanvas").click(function(){$(ac).css("display","none");
$("#itemList").css("display","none")});if(bo.masterResource!=undefined){XMMorALIX=true
}};var aj=function(){$("#minus").trigger("click")
};var aa=function(){if(bd.masterResource!=undefined&&bd.masterResource.actions.showAssociated.handlerDeleteSource==true){R("oid");
for(var bn=0;bn<5;bn++){$("#plus").trigger("click")
}ae()}if(bd.masterResource!=undefined&&bd.masterResource.actions.externalProcessing.handlerDeselect){bd.masterResource.actions.externalProcessing.handlerDeselect()
}bd.sourceSelected.x=null;bd.sourceSelected.y=null;
$("#XMM").attr("class","alix_XMM_in_menu  alix_datahelp_selected")
};var H=function(){aa();if(a6){a6.deselectAll()}};
var f=function(){aJ();var bn=bj.val();k(bn)};var aI=function(by,bo,bw){var br;
if(bw!=undefined){br=bw.affichage.label}else{br=""
}var bp;if(bw!=undefined&&bw.actions.showAssociated){bp=bw.actions.showAssociated.label
}else{bp=""}aT=$("#"+T);aT.html('<div id="'+aZ+'" class="alix_aladin_div"></div>');
aT.append('<div id="newMenu" class="alix_menu_panel"></div><div id="itemList" class="alix_hips_panel"></div>');
aT.append('<div id="SourceDiv" class="alix_source_panels"></div>');
VizierCatalogue.SourceDataMove();var bu=$("#newMenu");
var bs='<button id="button_locate" class="alix_btn alix_btn-circle alix_btn-grey" title ="search a position" ><i id="" class="glyphicon glyphicon-map-marker " style="font-size:18px;"></i></button>';
var bz='<button id="button_center" class="alix_btn alix_btn-circle alix_btn-red" title ="back to center" onclick="AladinLiteX_mVc.returnCenter();"><i id="" class="glyphicon glyphicon-screenshot " style="font-size:18px;"></i></button>';
var bB='<button id="button_bookmark" class="alix_btn alix_btn-circle alix_btn-orange" title ="save a bookmark" onclick="AladinLiteX_mVc.bookMark();"><i id="" class="glyphicon glyphicon-heart " style="font-size:18px;"></i></button>';
var bD='<button id="button_history" class="alix_btn alix_btn-circle alix_btn-yellow" title ="history of bookmark" ><i id="" class="glyphicon glyphicon-book " style="font-size:18px;"onclick="AladinLiteX_mVc.getHistory();"></i></button>';
var bE='<button id="button_region" class="alix_btn alix_btn-circle alix_btn-green" title ="region editor" onclick="AladinLiteX_mVc.regionEditor();" ><i id="" class="glyphicon glyphicon-edit" style="font-size:18px;"></i></button>';
var bn='<button id="button_image" class="alix_btn alix_btn-circle alix_btn-blue" title ="search an image" onclick="AladinLiteX_mVc.showColorMap();" ><i id="" class="glyphicon glyphicon-picture" style="font-size:18px;"></i></button>';
var bx='<button id="button_catalog" class="alix_btn alix_btn-circle alix_btn-purple" title ="search a catalog" ><i id="" class="glyphicon glyphicon-list " style="font-size:18px;"></i></button>';
var bC='<div style="z-index:100"><input id="'+ab+'" placeholder="target" class="alix_target" onfocus="this.select()"><select  id ="'+a0+'" class="alix_select"><option id="'+by.field.position+'">'+by.field.position+'</option></select><button id="targetNote" title="Note" class="alix_btn alix_btn-color-his alix_btn-in-edit" style="position:absolute;left:392px;top:8px;" ><i class="glyphicon glyphicon-pencil" style="font-size:15px;"></i></button></div>';
var bt='<div id="panel_history" class="alix_right_panels"></div>';
var bv='<div id="panel_region" class="alix_right_panels"></div>';
var bA='<div id="panel_image" class="alix_right_panels"><p class="alix_titlle_image ">Image</p><input type="text" id="'+bl+'"  placeholder="Survey" size=11 class=" alix_img_explorer"></input><select id="status-select" class ="alix_selector_hips "><option selected="selected">CDS/P/DSS2/color</option></select><button id="detail"  type="detail" class=" alix_button_detail" onclick="AladinLiteX_mVc.showDetailByID();">Detail</button><div id = "color_map_box" class="alix_colorMapBox" style = "z-index: 20;position: absolute; width: auto; height: 50px; color: black;"><b>Color Map : </b><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div><div id="panel_image_detail"></div></div>';
var bq='<div id="panel_catalog" class="alix_right_panels"><div class="alix_catalog_panel" ><b class="alix_titlle_catalog ">Catalogs</b><div id="minus" style="cursor: pointer;" class="alix_minus  " title = "Fade out">-</div></b><i id="fade" title = "fade" class=" glyphicon glyphicon-lamp"></i><div id="plus" style="cursor: pointer;" class=" alix_plus  " title = "Fade in">+</div><div></br><b id="XMM" title="Show/hide master sources" class="alix_XMM_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayDataXml();">'+br+"</b>"+P()+u()+B()+'</div></br><div><b id="ACDS" class = "alix_acds" >'+bp+'  </b><div style = ""><b id="Simbad" title="Show/hide Simbad sources" class="alix_simbad_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displaySimbadCatalog();">Simbad</b><i id="btn-Simbad-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'Simbad\',this.style.color)"></i><i id="btn-Simbad-flash" title = "flash" class="  glyphicon glyphicon-flash"style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.SimbadFlash();"></i><b><span title="Click to activate the source type selector" id="SearchTypeNot"  style="color: rgb(136, 138, 133);">all</span> <input type="text" id="SearchType" class=" alix_cataloge_explorer " placeholder="Search Type" style="display:none; width: 120px;"></b></div><div style = ""><b id="NED" title="Show/hide Ned sources" class="alix_ned_in_menu  alix_datahelp" style="cursor: pointer;" onclick="AladinLiteX_mVc.displayNedCatalog();">NED</b><i id="btn-NED-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'NED\',this.style.color)"></i><i id="btn-NED-flash" title = "flash" class="  glyphicon glyphicon-flash" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.NEDFlash();"></i></div><br><div><input type="text" id="'+aK+'"  placeholder="Find other Catalog" size=11 class=" alix_cataloge_explorer "></input><select id="select_vizier" class="alix_selector_vizier "><option selected="select">--select--</option></select><div id="vizier" class="alix_vizier"><ul id="vizier_list"></ul></div></div><div id="panel_catalog_detail"></div></div>';
aT.append(bC);bu.append('<div id="alix_left_menu"><ul id="alix_left_menu_ul" style="list-style-type:none; padding: 5px;"><li>'+bz+"</li><li>"+bB+"</li><li>"+bD+"</li><li>"+bE+"</li><li>"+bn+"</li><li>"+bx+'</li></ul></div><div id="alix_right_menu">'+bt+bv+bA+bq+"<div>");
$("#button_locate").click(function(bG){var bH="#panel_locate";
AlixLogger.trackAction("button_locate");bF(bH)});
$("#button_bookmark").click(function(bG){AlixLogger.trackAction("bookmark");
alert("Saved successfully! You can click the history(yellow) button to check your bookmarks.")
});$("#button_history").click(function(bG){AlixLogger.trackAction("history");
var bH="#panel_history";bF(bH)});$("#button_region").click(function(bG){AlixLogger.trackAction("region");
var bH="#panel_region";bF(bH)});$("#button_image").click(function(bG){AlixLogger.trackAction("image selector");
var bH="#panel_image";bF(bH)});$("#button_catalog").click(function(bG){AlixLogger.trackAction("catalogue selector");
$("#SourceDiv").css("display","none");var bH="#panel_catalog";
bF(bH)});var bF=function(bG){$(bG).toggle();if(ac!=bG){$(ac).css("display","none")
}ac=bG};a4=$("#"+aH);aT.append('<div id="'+aQ+'" class="alix_context_panel" ><b class="alix_context" style="display: none;"> context </b></div>');
aT.append('<div id="waiting_interface" class="alix_waiting_interface" style="display:none;"><div class="alix_grey_bg"></div><div class="alix_fetching_data"><input type="button" id="closeWaitingPanel" value="x"><div class="alix_fetching_img"></div><div id="fetchingMessage" class="alix_fetching_message">fetching data...</div></div></div>');
aT.append('<div id="alert" class="alix_alert_fov" style="display:none;"><div class="alix_alert_fov_img"><i class="glyphicon glyphicon-alert" style="font-size:16px;padding:3px;"></i></div><div class="alix_alert_fov_msg">Search radius limited to 1&deg;</div></div>');
aT.append('<div class="alix_tester" id="tester"><ul></ul></div>');
L=$("#"+aQ);ax=$("#"+ab);m=$("#"+a0);bm=$("#"+bl);
bj=$("#"+aE);ag=$("#"+aK);aO=$("#"+bk);n=$("#"+a9);
aT=$("#"+aZ);bg(by);ay();ao.on("click",function(){ax.blur()
});ao.on("positionChanged",function(bG){if(bG.dragging==false){ay();
ax.val(bG.ra.toFixed(4)+","+bG.dec.toFixed(4));if(bd.masterResource!=undefined){E.updateCatalogs(bd,"position")
}}});ao.on("zoomChanged",function(bG){var bH=bd.fov;
ay();if(bG>=bH){if(bd.masterResource!=undefined){E.updateCatalogs(bd,"zoom")
}}});$("#closeWaitingPanel").click(function(bG){document.getElementById("waiting_interface").style.display="none"
});$("#open_all").click(function(bG){bG.stopPropagation();
K();ae()});if(by.panelState==true){K()}ax.val(by.field.position);
ax.click(function(bG){bG.stopPropagation()});ax.bind("keypress",function(bG){if(bG.which==13){if(bd.region!=null){E.cleanPolygon()
}bd.clean();H();bG.preventDefault();aA(ax.val())}});
$("#input_target").bind("keypress",function(bG){if(bG.which==13){bf()
}});m.click(function(bG){bG.stopPropagation()});$("#targetNote").click(function(bI){AlixLogger.trackAction("annotate target");
var bG=m.children("option:selected").attr("id");var bH=/\[(.+?)\]/g;
var bJ=m.children("option:selected").val();var bK=bJ.match(bH);
if(bK){MessageBox.inputBox("Write your note on this target",bK[0].replace(/\[|]/g,""));
$("#target_note").val(bK[0].replace(/\[|]/g,""))}else{MessageBox.inputBox("Write your note on this target","");
$("#target_note").val("")}});m.change(function(){if($(this).val()=="--select--"){return
}ak($(this).children("option:selected").attr("id"));
event.stopPropagation()});bm.click(function(bG){bG.stopPropagation()
});bm.keyup(function(bG){if($(this).val().length>=3||bG.which==13){aV($(this).val())
}});bj.change(function(){if($(this).val()=="--select--"){return
}h($(this).val());f($(this).val())});bj.click(function(bG){bG.stopPropagation()
});$("#select_vizier").change(function(){var bG=$(this).val();
if(bG=="--select--"){return}var bH=bG.match(/^([^\s]*)\s\[(.*)\]$/);
aw(bH[1],bH[2])});ag.keyup(function(bG){if($(this).val().length>=2||bG.which==13){al($(this).val())
}});$("#menuDiv").on("click",".alix_btn_open",function(bG){bG.stopPropagation();
$("#center").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#center").css("transform","translate3d(45px,0px,0px)");
$("#center").css("transition-duration","100ms");$("#bookMark").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#bookMark").css("transform","translate3d(90px,0px,0px)");
$("#bookMark").css("transition-duration","200ms");
$("#history").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#history").css("transform","translate3d(135px,0px,0px)");
$("#history").css("transition-duration","300ms");
$("#region").css("transition-timing-function","cubic-bezier(0.8,0.84,0.44,1.3)");
$("#region").css("transform","translate3d(180px,0px,0px)");
$("#region").css("transition-duration","400ms");$("#menu").addClass("alix_btn_open_2");
$("#menu").removeClass("alix_btn_open");$("#icon_open").addClass("glyphicon-remove");
$("#icon_open").removeClass("glyphicon-list");$("#credit").css("display","none")
});$("#menuDiv").on("click",".alix_btn_open_2",function(bG){bG.stopPropagation();
$("#center").css("transition-timing-function","ease-out");
$("#center").css("transform","translate3d(0px,0px,0px)");
$("#center").css("transition-duration","100ms");$("#bookMark").css("transition-timing-function","ease-out");
$("#bookMark").css("transform","translate3d(0px,0px,0px)");
$("#bookMark").css("transition-duration","200ms");
$("#history").css("transition-timing-function","ease-out");
$("#history").css("transform","translate3d(0px,0px,0px)");
$("#history").css("transition-duration","300ms");
$("#region").css("transition-timing-function","ease-out");
$("#region").css("transform","translate3d(0px,0px,0px)");
$("#region").css("transition-duration","400ms");$("#menu").addClass("alix_btn_open");
$("#menu").removeClass("alix_btn_open_2");$("#icon_open").addClass("glyphicon-list");
$("#icon_open").removeClass("glyphicon-remove");$("#credit").css("display","inline")
});$("#vizier").click(function(bG){bG.stopPropagation()
});$(".alix_target_selecte").click(function(bI){if($(this).attr("class")=="alix_target_selecte alix_unselected"){for(var bH=0;
bH<bd.target.length;bH++){var bJ=bH;var bG=bd.target[bH].ct;
var bK=bd.target[bH].ra;var bL=bd.target[bH].dec;
ao.addCatalog(bG);bG.addSources([A.marker(bK,bL,{popupTitle:"target"},bJ)])
}$(this).attr("class","alix_target_selecte alix_selected");
$(this).css("color","#87F6FF")}else{R("target");$(this).attr("class","alix_target_selecte alix_unselected");
$(this).css("color","#888a85")}});$(".alix_select_trash").click(function(bG){$(".alix_target_selecte").css("display","none");
$(this).css("display","none");$(".alix_select_flash").css("display","none");
R("target")});$(".alix_select_flash").click(function(bH){for(var bG=0;
bG<bd.target.length;bG++){bd.target[bG].ct.makeFlash()
}});$("#credit").click(function(bG){aJ();L.css("max-height","200px");
if(L.height()<100){L.animate({height:"200px"},"fast");
L.css("border-width","0.2px")}else{L.animate({height:"0px"},"fast");
L.css("border-width","0px")}$.getJSON("http://saada.unistra.fr/alix/licences/credit.json",function(bH){L.html("<pre>"+JSON.stringify(bH,null,2)+"</pre>")
})});SimbadCatalog.activateControle();if(bw!=undefined&&bw.actions.externalProcessing.handlerInitial){bw.actions.externalProcessing.handlerInitial()
}if(bw!=undefined&&bw.affichage.display==true){setTimeout(function(){AladinLiteX_mVc.displayDataXml()
},1000)}};var U=function(bn){Sesame.resolve(j,function(bo){var bp=bo.Target.Resolver.jradeg;
var bq=bo.Target.Resolver.jdedeg;console.log("Take "+j+"("+bp+" "+bq+") as default position");
console.log(bp+" "+bq);a1(bp,bq)},function(bo){console.log(j+"("+ra+" "+dec+") could ben resolved, take (23. 33)");
a1(23,33)})};var a1=function(br,bs){var bn=ao.getFov();
var bp="http://alasky.unistra.fr/MocServer/query?RA="+br+"&DEC="+bs+"&SR="+bn[0]+"&fmt=json&get=record&casesensitive=false";
var bq="image";var bo=new RegExp(/.*((jpeg)|(png)).*/);
$.getJSON(bp,function(bw){if(bq!=undefined){for(var bu=bw.length-1;
bu>=0;bu--){if(bw[bu].dataproduct_type!=bq){bw.splice(bu,1)
}}if(bq=="image"){for(var bu=bw.length-1;bu>=0;bu--){var by=0;
if($.isArray(bw[bu].hips_tile_format)){for(var bt=0;
bt<bw[bu].hips_tile_format.length;bt++){if(bo.test(bw[bu].hips_tile_format[bt])){by=1;
break}}}else{if(bo.test(bw[bu].hips_tile_format)){by=1
}}if(by==0){bw.splice(bu,1)}}}E.modules.hipsSelectorModel.storeHips(bw);
var bv=false;for(var bu=0;bu<bw.length;bu++){var bx=bw[bu].ID;
if(bx==aX){h(bx);au(bx,"DSS colored");bv=true}}if(!bv){h("CDS/P/DSS2/color");
au("CDS/P/DSS2/color","DSS colored")}}})};var bg=function(bp){if(ao!=null){for(var bo=0;
bo<ao.view.overlays.length;bo++){if(ao.view.overlays[bo].name=="Reference Frame"){ao.view.overlays[bo].removeAll();
break}}}if(bp.defaultSurvey!=undefined){aX=bp.defaultSurvey;
E.modules.historicModel.hips_tab.push("CDS/P/DSS2/color")
}if(bp.region!=undefined){var bq=[];if(bp.region.type=="array"){x=aC.regionEditor.view.parseArrayPolygon(bp.region.value)
}else{if(aC.regionEditor.view.editionFrame.type=="soda"){x=this.controllers.regionEditor.view.parseSodaPolygon(bp.region.value)
}else{alert("Polygone format "+points.type+" not understood")
}}if(x){var bn=BasicGeometry.getEnclosingView(x);
j=bn.center.ra+" "+bn.center.dec;aB=1.2*bn.size;if(ao==null){ao=A.aladin(aT,{survey:aX,fov:aB,showLayersControl:false,showFullscreenControl:false,showFrame:false,showGotoControl:false});
aT.append()}aN(aB);aG(bn.center.ra,bn.center.dec);
let overlay=A.graphicOverlay({color:"blue",name:"Reference Frame"});
ao.addOverlay(overlay);overlay.addFootprints([A.polygon(x)])
}}else{if(bp.field!=undefined){if(bp.field.defaultFov!=undefined){aB=bp.field.defaultFov
}else{aB=0.9}if(bp.field.position!=undefined){j=bp.field.position
}else{j="M51"}}else{j="M51";aB=0.9}if(ao==null){console.log(aX);
console.log(aB);ao=A.aladin(aT,{survey:aX,fov:aB,showLayersControl:false,showFullscreenControl:false,showFrame:false,showGotoControl:false});
aT.append()}Z(j);setTimeout(function(){ao.setZoom(aB)
},200)}U()};var ba=false;var aM=function(){if(ba==true){$("#aladin-lite-div").closest(".ui-dialog-content").dialog("close");
ba=false}else{if(a4.width()<100){$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:900,close:function(bn,bo){ba=false
}})}else{if(L.height()<100){$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:900,close:function(bn,bo){ba=false
}})}else{$("#aladin-lite-div").dialog({title:"AladinLiteX",height:650,width:900,close:function(bn,bo){ba=false
}})}}ba=true}};var aY=function(){aA(j);ao.setFov(aB);
$("#aladin-lite-div").dialog({title:"AladinLiteX",height:450,width:440})
};var a2=function(bn){ao.addOverlay(bn)};var aG=function(bn,bo){ao.gotoPosition(bn,bo)
};var M=function(bn,bo){return ao.world2pix(bn,bo)
};var aN=function(bn){ao.setZoom(bn)};var S=function(){ao.increaseZoom()
};var an=function(){ao.decreaseZoom()};var aS=function(bn,bo){return ao.pix2world(bn,bo)
};var G=function(bn,bo){return ao.setImageSurvey(bn,bo)
};var v=function(bs,bq,bo,br,bn,bp){return ao.createImageSurvey(bs,bq,bo,br,bn,bp)
};var s=function(){aL=false;aq.name=null;aq.ra=null;
aq.dec=null};var p=function(bn){if(bn!=undefined&&aL){var bo=bn.length;
if(aq.name.slice(0,bo)==bn){aL=false}}};var be=function(bn,bp,bq){if(bn!=undefined&&bp!=undefined&&bq!=undefined){aL=true;
var bo=/[:]/g;bn=bn.split(bo);aq.name=bn[1];aq.ra=bp;
aq.dec=bq}else{aL=false}};var am=function(){aJ();
$("#SourceDiv").css("display","none");if(aL){bd.clean();
H();aA(aq.ra+" "+aq.dec)}else{Alix_Modalinfo.info("You haven't chose a source!")
}E.cleanPolygon()};var z=false;var af=false;var e=function(){aJ();
$("#SourceDiv").css("display","none");L.css("max-height","200px");
if(L.height()<200){L.css("height","auto");L.css("border-width","0.2px");
height_ul=$("#history_ul").height()+80}bd.XMM=false;
for(var bn=0;bn<ao.view.catalogs.length;bn++){if(ao.view.catalogs[bn].name.startsWith("Swarm")){bd.XMM=true
}}ay();E.bookMark(bd)};var aJ=function(){if(browseSaved==false){var bn=confirm("Do you want to save your polygon?");
if(bn==true){$("#regionEditor_a").trigger("click")
}else{browseSaved=null;E.cleanPolygon()}}};var y=function(){aJ();
$("#SourceDiv").css("display","none");L.css("max-height","200px");
E.getHistory();if(L.height()<10){L.css("height","auto");
L.css("border-width","0.2px");z=true;af=false}else{if(L.height()>10){if(z){L.animate({height:0},"fast");
z=false;af=false}else{L.css("height","auto");L.css("border-width","0.2px");
z=true;af=false}}}};var D=function(bn){if(bd.region!=null){E.cleanPolygon()
}bd=jQuery.extend(true,{},bn);ax.val(bd.name);ao.gotoRaDec(bd.ra,bd.dec);
ao.setFoV(bd.fov);h(bd.survey.ID);bj.val(bd.survey.ID);
if(bd.region!=null){if(!g){E.editRegion()}var bo={type:null,value:[]};
bo.type=bd.region.format;bo.value=bd.region.points;
E.setInitialValue(bo)}};var W=function(bv){R("all");
var bt=E.restoreViewById(bv);D(bt);if(bt.catalogTab!=null){E.buildCataTab(bt)
}if(bd.XMM==true){E.displayDataXml(bd)}var bp='<select id="status" class ="alix_selector_hips ">';
bp+="<option value='"+bd.survey.ID+"'>"+bd.survey.ID+"</option>";
for(var bw=0;bw<E.modules.historicModel.hips_tab.length;
bw++){if(E.modules.historicModel.hips_tab[bw]!=bd.survey.ID){bp+="<option value='"+E.modules.historicModel.hips_tab[bw]+"'>"+E.modules.historicModel.hips_tab[bw]+"</option>"
}}bp+="</select>";bj.html(bp);if(bd.target.length>0){for(var bq=0;
bq<bd.target.length;bq++){var bn=bd.target[bq].ra;
var bo=bd.target[bq].dec;var br=A.catalog({name:"target",color:"green"});
ao.addCatalog(br);br.addSources([A.marker(bn,bo,{popupTitle:"target"})])
}}ao.view.imageSurvey.getColorMap().update(bd.colorMap);
if(bd.reverseColor){ao.view.imageSurvey.getColorMap().reverse()
}if(bd.sourceSelected.x&&bd.sourceSelected.y){WaitingPanel.show("the selected source");
var bu=bd.sourceSelected.x;var bs=bd.sourceSelected.y;
setTimeout(function(){a3(bu,bs);WaitingPanel.hide("the selected source")
},2500)}};var a3=function(bn,br){var bq=ao.view.closestObjects(bn,br,5);
if(bq){var bp=bq[0];if(bp instanceof Footprint||bp instanceof Circle){bp.dispatchClickEvent()
}else{if(bp.marker){ao.view.popup.setTitle(bp.popupTitle);
ao.view.popup.setText(bp.popupDesc);ao.view.popup.setSource(bp);
ao.view.popup.show()}else{if(ao.view.lastClickedObject){ao.view.lastClickedObject.actionOtherObjectClicked&&ao.view.lastClickedObject.actionOtherObjectClicked()
}bp.actionClicked()}}ao.view.lastClickedObject=bp;
var bo=ao.view.aladin.callbacksByEventName.objectClicked;
(typeof bo==="function")&&bo(bp)}else{if(ao.view.lastClickedObject){ao.view.aladin.measurementTable.hide();
ao.view.popup.hide();if(ao.view.lastClickedObject instanceof Footprint){}else{ao.view.lastClickedObject.actionOtherObjectClicked()
}ao.view.lastClickedObject=null;var bo=ao.view.aladin.callbacksByEventName.objectClicked;
(typeof bo==="function")&&bo(null)}}};var ay=function(){var bp=ao.getRaDec();
bd.name=ax.val();bd.ra=bp[0];bd.dec=bp[1];var bn=ao.getFov();
bd.fov=bn[0];bd.img=ao.getViewDataURL({width:400,height:400});
bd.catalogTab=E.currentCatalogTab(ao.view.catalogs);
bd.colorMap=ao.view.imageSurvey.getColorMap().mapName;
bd.reverseColor=ao.view.imageSurvey.getColorMap().reversed;
var bq=Numbers.toSexagesimal(bd.ra/15,8,false);var bo=Numbers.toSexagesimal(bd.dec,7,false)
};var av=function(bn){bd.region=bn};var g=false;var Q=function(){aJ();
$("#SourceDiv").css("display","none");L.css("max-height","200px");
ay();if(!g){E.editRegion()}z=false;af=true};var aA=function(bo,bn){m.val($("#"+bo).val());
var bp=bo.replace("_SpAcE_"," ");ax.val(bp);ao.gotoObject(bp,{success:function(bu){bd.name=ax.val();
bd.ra=bu[0];bd.dec=bu[1];var bt=Numbers.toSexagesimal(bd.ra/15,8,false);
var bs=Numbers.toSexagesimal(bd.dec,7,false);var bq=ao.getFov();
bd.fov=bq[0];E.updateCatalogs(bd,"position");var br=/^[0-9a-zA-Z_\s]*$/;
if(br.test(bo)){bi(bo)}else{bi(bt+" +"+bs)}if(bn){bn()
}},error:function(){alert("Object "+bo+" cannot be resolved")
}})};var K=function(){if(a4.width()<100){a4.animate({width:"+=250px"},"fast");
$(".alix_menu_item").css("display","inline");$("#open_all").animate({left:"+=250px"},"fast");
$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-left")
}else{a4.animate({width:"-=250px"},"fast");$(".alix_menu_item").css("display","none");
$("#open_all").animate({left:"-=250px"},"fast");$("#open_all").attr("class","alix_open_all glyphicon glyphicon-chevron-right")
}};var ae=function(){aJ();L.css("max-height","200px");
if(L.height()>99){L.animate({height:"0px"},"fast");
L.css("border-width","0px");$(".alix_context").css("display","none");
L.html("");ax.val(bd.name)}};var C=function(){document.getElementById("bookMark").disabled=true;
document.getElementById("history").disabled=true;
document.getElementById("center").disabled=true};
var X=function(){document.getElementById("bookMark").disabled=false;
document.getElementById("history").disabled=false;
document.getElementById("center").disabled=false};
var F=function(bn){E.deleteHistory(bn)};var aV=function(bn){E.searchHips(bn,bd)
};var a5=function(bn,bo){h(bn);au(bn,bo);J(bn)};var aw=function(bp,bq){var bo=(bq)?" ["+bq+"]":" [No title]";
if(!LibraryCatalog.getCatalog("VizieR:"+bp)){E.createCatalogSelect(bp);
bb(bp,bo)}else{var bn=false;$("#vizier_list").find("li").each(function(){if($(this).hasClass(bp)){bn=true
}});if(bn==false){E.createCatalogSelect(bp)}}$("#itemList").css("display","none")
};var h=function(bn){var bp=E.getSelectedHips(bn);
AlixLogger.trackAction("Display Hips "+bp.obs_title);
bd.survey=bp;if(bp===undefined){console.error("unknown HiPS");
return}$("#itemList").css("display","none");var bo="";
if(bp.hips_tile_format.indexOf("png")>=0){bo="png"
}else{bo="jpg"}if(bo!=""){G(v(bp.obs_title,bp.obs_title,bp.hips_service_url,bp.hips_frame,bp.hips_order,{imgFormat:bo}))
}else{G(v(bp.obs_title,bp.obs_title,bp.hips_service_url,bp.hips_frame,bp.hips_order))
}};var au=function(br,bu){var bv=document.getElementById(aE);
var bo=bv.options.length;for(var bq=0;bq<bo;bq++){if(bv.options[bq].text==br){return false
}}E.modules.historicModel.hips_tab.push(br);var bn=(bu)?" ["+bu+"]":" [no title]";
var bp='<select id="status" class ="alix_selector_hips ">';
bp+="<option value='"+br+"'>"+br+bn+"</option>";for(var bw=0;
bw<E.modules.historicModel.hips_tab.length;bw++){if(E.modules.historicModel.hips_tab[bw]!=br){var bs=E.getSelectedHips(E.modules.historicModel.hips_tab[bw]);
var bt=(bs.obs_title)?" ["+bs.obs_title+"]":" [no title]";
bp+="<option value='"+E.modules.historicModel.hips_tab[bw]+"'>"+E.modules.historicModel.hips_tab[bw]+bt+"</option>"
}}bp+="</select>";bj.html(bp)};var bi=function(br){var bo=document.getElementById("aladin-lite-div-select");
var bp=bo.options.length;for(var bn=0;bn<bp;bn++){if(bo.options[bn].id==br){return false
}}if(br!=""){var bq='<option id="'+br.replace(" ","_SpAcE_")+'">'+br+"</option>";
m.append(bq);m.val(br)}};var bb=function(bq,bp){var bs=document.getElementById("select_vizier");
var br=bs.options.length;$("#select_vizier").val(bq);
for(var bo=0;bo<br;bo++){if(bs.options[bo].text.startsWith(bq+" ")){return false
}}var bn="<option>"+bq+bp+"</option>";$("#select_vizier").append(bn)
};var J=function(bn){var bo=E.getSelectedHips(bn);
if(bo!=undefined){var bp='<p style="color:#4D36DC;margin:10px;" >';
bp+=bo.obs_title+"</p><span style='font-size:small;color : #727371;margin:10px;'>"+bn+"</span><p style='font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;'>&nbsp;&nbsp;"+bo.obs_description+"<br>";
bp+="</p>";$("#panel_image_detail").html(bp);$("#panel_image_detail").toggle()
}};var k=function(bn){aJ();L.css("max-height","200px");
if(L.height()>100){L.animate({height:"0px"},"fast");
L.css("border-width","0px")}else{J(bn)}};var r=function(br,bn){var bs=E.getSelectedCatalog(br);
var bo=br.split("/");bo.pop();bo=bo.join("/");var bq=bo.length-1;
if(bs!=undefined){var bp='<div style="background-color:'+bn+';border-radius: 5px;box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);"><a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;float: right; margin-right: 8px; margin-top: 2px;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="glyphicon glyphicon-remove" style="color: white;"></span></a><br></div><iframe id = "cds_iframe"  name="content_frame" marginwidth=0 marginheight=0 width=100% height=100% src="http://cdsarc.u-strasbg.fr/viz-bin/ReadMe/'+bo+'/?format=html&tex=true" frameborder="0"style = "" ></iframe>';
$("#itemList").html(bp);$("#itemList").css("display","block");
L.html(bp)}else{alert("Please choose a catalog")}};
var c=function(br,bw){var br=br;var bp;var by;var bs;
var bx;var bA;if(br=="XMM"){if(LibraryCatalog.getCatalog("Swarm")){bx=LibraryCatalog.getCatalog("Swarm").al_refs
}by=br;if(bw=="red"){bA="rgb(255,0,0)"}else{bA=bw
}}else{if(br=="Simbad"||br=="NED"){if(LibraryCatalog.getCatalog(br)){bx=LibraryCatalog.getCatalog(br).al_refs
}by=br;if(bw=="red"){bA="rgb(255,0,0)"}else{if(bw=="orange"){bA="rgb(255,165,0)"
}else{bA=bw}}}else{by=$("#cata_operate_"+br).text();
bp=$("#cata_operate_"+br).text();bx=LibraryCatalog.getCatalog("VizieR:"+bp).al_refs;
bA=document.getElementById("cata_operate_"+br).style.color
}}var bq=bA.substring(4,bA.length-1);bq=bq.split(",");
function bo(bB){var bC=Number(bB).toString(16);if(bC.length<2){bC="0"+bC
}return bC}function bv(bD,bC,bB){return"#"+bo(bD)+bo(bC)+bo(bB)
}var bn=bq[0];var bu=bq[1];var bz=bq[2];bs=bv(bn,bu,bz);
if(bx!=undefined){var bt='<div id="'+by+'"class="'+br+'" style = "box-shadow: 0 0 20px 2px '+bs+' ;height=140px; margin-left: 5px; height: 140px;"><div class="alix_configurationShape" ><b>Shape:</b><i id="shape_plus" title="plus" class="glyphicon glyphicon-plus alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i><i id="shape_cross" title="cross" class="glyphicon glyphicon-remove alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i><i id="shape_circle" title="circle" class="glyphicon glyphicon-record alix_shapeChoice " style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i><i id="shape_triangle" title="triangle" class="glyphicon glyphicon-triangle-top alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i><i id="shape_rhomb" title="rhomb" class="glyphicon glyphicon-unchecked alix_shapeChoice " style="cursor: pointer;transform: rotate(45deg);" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i><i id="shape_square" title="square" class="glyphicon glyphicon-stop alix_shapeChoice" style="cursor: pointer;" onclick="AladinLiteX_mVc.updateShapeOfCatalog(this.title,this.id)"></i></div><div class="alix_configurationShape"><b>Size:</b><div id="sliderBox"><span class="alix_min-value">1</span><input id="slider_Shape" class=" alix_slider_Shape"  type="range" step="1" value="8" min="1" max="50" oninput="AladinLiteX_mVc.updateSizeOfCatalog(this.value,this.id)"><span class="alix_max-value">50</span><span class="range-value" id="range-value0"></span></div></div><div class="alix_configurationShape"><b>Color:  </b><input id="colorSelect" type = "text" style = "margin-left: 15px;"></input></div></div>';
$("#panel_catalog_detail").html(bt);$("#panel_catalog_detail").toggle();
$("#colorSelect").spectrum({color:bs,preferredFormat:"hex3",showInput:true,showPalette:true,palette:[["red","rgba(0, 255, 0, .5)","rgb(0, 0, 255)"]],change:function(bB){AladinLiteX_mVc.updateColorOfCatalog(bB.toHexString(),"colorSelect")
}})}else{alert("Please choose a catalog")}};var a8=function(bp,br){var bq=document.getElementById(br).parentNode.parentNode;
var bn=bq.className;bq.style.boxShadow="0 0 20px 2px "+bp;
if(bn=="XMM"){catalog=LibraryCatalog.getCatalog("Swarm").al_refs;
$("#"+bn).css("color",bp);$("#btn-"+bn+"-description").css("color",bp);
$("#btn-"+bn+"-configure").css("color",bp);$("#btn-"+bn+"-flash").css("color",bp);
LibraryCatalog.updCatalog({name:"Swarm",color:bp})
}else{if(bn=="Simbad"||bn=="NED"){catalog=LibraryCatalog.getCatalog(bn).al_refs;
$("#"+bn).css("color",bp);$("#btn-"+bn+"-configure").css("color",bp);
$("#btn-"+bn+"-flash").css("color",bp);LibraryCatalog.updCatalog({name:bn,color:bp})
}else{var bo=$("#cata_operate_"+bn).text();catalog=LibraryCatalog.getCatalog("VizieR:"+bo).al_refs;
$("#cata_operate_"+bn).css("color",bp);$("#btn_detail_catalog_"+bn).css("color",bp);
$("#btn_flash_catalog_"+bn).css("color",bp);$("#btn_configure_catalog_"+bn).css("color",bp);
$("#btn_delete_catalog_"+bn).css("color",bp);LibraryCatalog.updCatalog({name:"VizieR:"+bo,color:bp})
}}catalog.updateShape({color:bp})};var d=function(bo,bq){var bp=document.getElementById(bq).parentNode.parentNode.id;
var bn;if(bp=="XMM"){bn=LibraryCatalog.getCatalog("Swarm").al_refs
}else{if(bp=="Simbad"||bp=="NED"){bn=LibraryCatalog.getCatalog(bp).al_refs
}else{bn=LibraryCatalog.getCatalog("VizieR:"+bp).al_refs
}}bn.updateShape({shape:bo})};var l=function(bo,bq){var bp=document.getElementById(bq).parentNode.parentNode.parentNode.id;
var bn;if(bp=="XMM"){bn=LibraryCatalog.getCatalog("Swarm").al_refs
}else{if(bp=="Simbad"||bp=="NED"){bn=LibraryCatalog.getCatalog(bp).al_refs
}else{bn=LibraryCatalog.getCatalog("VizieR:"+bp).al_refs
}}bn.updateShape({sourceSize:Number(bo)})};var bc=function(bo){var bn=E.getSelectedHips(bo);
return bn.obs_description};var al=function(bn){E.searchCataloge(bn,bd)
};var ak=function(bo){var bn;if(bo){bn=bo}else{bn=ax.val()
}if(bd.region!=null){E.cleanPolygon()}bd.clean();
aA(bn)};var Y=function(){E.displaySimbadCatalog()
};var az=function(){ay();E.displayNedCatalog(bd)};
var O=function(bn){aJ();var bp=$("#cata_operate_"+bn).text();
var bo=document.getElementById("cata_operate_"+bn).style.color;
r(bp,bo)};var q=function(){aJ();ay();L.html("");ae();
E.displayDataXml(bd)};var aP=function(){if(a!=null){a.makeFlash()
}};var aW=function(){if(LibraryCatalog.getCatalog("Simbad")){var bn=LibraryCatalog.getCatalog("Simbad").al_refs
}if(bn!=null){bn.makeFlash()}};var o=function(){if(LibraryCatalog.getCatalog("NED")){var bn=LibraryCatalog.getCatalog("NED").al_refs
}if(bn!=null){bn.makeFlash()}};var ar=function(bn){aJ();
L.css("max-height","200px");if(L.height()>39){L.css("height","101px");
L.html(bn)}else{L.animate({height:"101px"},"fast");
L.css("border-width","0.2px");L.html(bn)}};var ad=function(bn){$(".catalogMerged").css("display","none")
};var aU=function(){var bn=null;var bq=new Array();
var bo;var bp;$("#minus").unbind("click").click(function(bw){for(var bt in LibraryCatalog.catalogs){if(bt.startsWith("Swarm")){bt="Swarm"
}if(bt.startsWith("Simbad")){bt="Simbad"}if(bt.startsWith("NED")){bt="NED"
}var bs=LibraryCatalog.getCatalog(bt);var bx=bs.color;
var bu=bs.al_refs;var br=bu.color;if(br=="orange"){br="#ffa500"
}if(br=="red"){br="#ff0000"}var bv=t(br);bu.updateShape({color:bv})
}});$("#plus").unbind("click").click(function(bw){for(var bt in LibraryCatalog.catalogs){var bs=LibraryCatalog.catalogs[bt];
if(bt.startsWith("Swarm")){bt="Swarm"}if(bt.startsWith("Simbad")){bt="Simbad"
}if(bt.startsWith("NED")){bt="NED"}var bs=LibraryCatalog.getCatalog(bt);
var bx=bs.color;var bu=bs.al_refs;var br=bu.color;
if(br=="orange"){br="#ffa500"}if(br=="red"){br="#ff0000"
}if(bx=="orange"){bx="#ffa500"}if(bx=="red"){bx="#ff0000"
}var bv=ai(br,bx);bu.updateShape({color:bv})}})};
var I=function(bo,bq,bt,bp,bu){var br;var bv=this;
var bn=8;bt=VizierCatalogue.showSourceData;if(bo=="Simbad"){AlixLogger.trackAction("Display Simbad");
var bs="square";if(LibraryCatalog.getCatalog(bo)){bq=LibraryCatalog.getCatalog(bo).color;
bn=LibraryCatalog.getCatalog(bo).al_refs.sourceSize;
bs=LibraryCatalog.getCatalog(bo).al_refs.shape}br=A.catalogHiPS(bp,{onClick:SimbadCatalog.simbad,name:bo,color:bq,sourceSize:bn,shape:bs,filter:SimbadCatalog.sourceFilter},WaitingPanel.hide(bo));
ao.addCatalog(br);LibraryCatalog.addCatalog({url:bp,name:bo,nameTemp:ao.view.catalogs[ao.view.catalogs.length-1].name,color:bq,shape:bs,fade:"",al_refs:br});
SimbadCatalog.setCatalog(br)}else{if(bo=="NED"){AlixLogger.trackAction("Display Ned");
var bs="square";if(LibraryCatalog.getCatalog(bo)){bq=LibraryCatalog.getCatalog(bo).color;
bn=LibraryCatalog.getCatalog(bo).al_refs.sourceSize;
bs=LibraryCatalog.getCatalog(bo).al_refs.shape}if(ao.getFov()[0]>0.02){br=A.catalogFromNED(ao.getRaDec()[0]+" "+ao.getRaDec()[1],0.02,{onClick:bt,name:bo,color:bq,sourceSize:bn,shape:bs},function(){WaitingPanel.hide(bo)
});ao.addCatalog(br)}else{br=A.catalogFromNED(ao.getRaDec()[0]+" "+ao.getRaDec()[1],ao.getFov()[0],{onClick:bt,name:bo,color:bq,sourceSize:bn,shape:bs},function(){WaitingPanel.hide(bo)
});ao.addCatalog(br)}if(!LibraryCatalog.getCatalog(bo)){LibraryCatalog.addCatalog({url:bp,name:bo,color:bq,shape:bs,fade:"",al_refs:br})
}else{LibraryCatalog.updCatalog({url:bp,name:bo,color:bq,shape:bs,fade:"",al_refs:br})
}}else{if(bo=="Swarm"){AlixLogger.trackAction("Display SWARM");
if(bd.masterResource){bd.masterResource.cleanTab()
}R("Target");R("Swarm");var bs="plus";if(LibraryCatalog.getCatalog(bo)){bq=LibraryCatalog.getCatalog(bo).al_refs.color;
bn=LibraryCatalog.getCatalog(bo).al_refs.sourceSize;
bs=LibraryCatalog.getCatalog(bo).al_refs.shape}if(bp!=undefined){br=a=A.catalogFromURL(bp,{name:bo,sourceSize:bn,shape:bs,color:bq,onClick:function(by){a6=this;
bd.sourceSelected.x=by.x;bd.sourceSelected.y=by.y;
var bx=by.data;var bz=bd.masterResource.actions.showPanel.active;
if(bd.masterResource&&typeof(bd.masterResource.actions.externalProcessing.handlerSelect)=="function"){bd.masterResource.actions.externalProcessing.handlerSelect(bx,bz)
}if(bu!=undefined&&!bd.masterResource.actions.showAssociated){ar(html)
}else{R("Target");R("oid");var bw=A.catalog({name:"Target"});
ao.addCatalog(bw);$("#ACDS").off("click");$("#ACDS").click(function(bE){var bH=/\{\$(.*)\}/g;
var bB=bH.exec(bd.masterResource.actions.showAssociated.url);
var bA=bB[1];var bG=bx[bA];var bD=new RegExp("\\{\\$"+bA+"\\}","g");
var bF=bd.masterResource.actions.showAssociated.url.replace(bD,bG);
var bC=$("#ACDS").css("color");if(bC=="rgb(50, 255, 236)"||bC=="#32FFEC"){$("#ACDS").css("color","#888a85");
AladinLiteX_mVc.deleteSourceAuto();AladinLiteX_mVc.deleteLastSelectedPosition()
}else{$("#ACDS").css("color","rgb(50, 255, 236)");
if(bd.masterResource.actions.showAssociated.active==true){$("#XMM").attr("class","alix_XMM_in_menu  alix_datahelp");
$("#"+bG).css("color","#32FFEC");Processing.show("Fetching Data");
$.getJSON(bF,function(bL){Processing.hide();var bJ=A.catalog({name:bA+" "+bG,sourceSize:bn,color:"#32FFEC",shape:bs,onClick:VizierCatalogue.showSourceData});
ao.addCatalog(bJ);for(var bK=0;bK<bL.CounterParts.length;
bK++){var bI=bL.CounterParts[bK].source;bJ.addSources([A.source(bI.position.ra,bI.position.dec,bI)])
}if(bd.masterResource.actions.showAssociated.handlerFadeOut==true){AladinLiteX_mVc.fadeOutAuto()
}})}}})}return true}},function(){SwarmDynamicFilter.runConstraint(bd);
WaitingPanel.hide("Swarm")});aU();ao.addCatalog(br);
R("oid");if(!LibraryCatalog.getCatalog(bo)){LibraryCatalog.addCatalog({url:bp,name:bo,nameTemp:ao.view.catalogs[ao.view.catalogs.length-1].name,color:bq,shape:bs,fade:"",al_refs:br})
}else{LibraryCatalog.updCatalog({url:bp,name:bo,nameTemp:ao.view.catalogs[ao.view.catalogs.length-1].name,color:bq,shape:bs,fade:"",al_refs:br})
}}else{WaitingPanel.hide("Swarm")}}}}};var bh=function(bo,bp,bt,bu){var br;
var bq;var bv=this;var bn=8;var bs="square";AlixLogger.trackAction("Display Vizier "+bo);
if(LibraryCatalog.getCatalog("VizieR:"+bo)){bp=LibraryCatalog.getCatalog("VizieR:"+bo).al_refs.color;
bn=LibraryCatalog.getCatalog("VizieR:"+bo).al_refs.sourceSize;
bs=LibraryCatalog.getCatalog("VizieR:"+bo).al_refs.shape
}if(bu!=undefined){br=A.catalogHiPS(bu,{onClick:VizierCatalogue.showSourceData,name:"VizieR:"+bo,color:bp,sourceSize:bn,shape:bs},WaitingPanel.hide(bo))
}else{var br=null;$.ajax({url:"http://alasky.u-strasbg.fr/footprints/estimate-nbrows/estimate-radius",data:{viz_table_id:bo,ra:ao.getRaDec()[0],dec:ao.getRaDec()[1],nb_min:1000,nb_max:2000},method:"GET",async:false,dataType:"text",success:function(bx){var by=Math.sqrt((ao.getFov()[0]*ao.getFov()[0])+(ao.getFov()[1]*ao.getFov()[1]))/2;
var bw=parseFloat(bx);if(by<0){alert("displayVizierCatalog : Sorry, rayon AL is negative = "+by+"radius estime: "+bw);
return false}if(bw>by){bw=by}else{WaitingPanel.warn("Search radius reduced to "+(Math.round(bw*600)/10)+"arcmin to get less than 2000 sources")
}WaitingPanel.show(bo);br=A.catalogFromVizieR(bo,ao.getRaDec()[0]+" "+ao.getRaDec()[1],bw,{onClick:VizierCatalogue.showSourceData,color:bp,sourceSize:bn,shape:bs},function(bz){WaitingPanel.hide(bo)
})},error:function(by,bw,bx){WaitingPanel.warn(by.responseText)
}})}ao.addCatalog(br);if(!LibraryCatalog.getCatalog("VizieR:"+bo)){LibraryCatalog.addCatalog({url:bu,name:"VizieR:"+bo,nameTemp:ao.view.catalogs[ao.view.catalogs.length-1].name,obs_id:bo,color:bp,shape:bs,fade:"",al_refs:br})
}else{LibraryCatalog.updCatalog({url:bu,name:"VizieR:"+bo,nameTemp:ao.view.catalogs[ao.view.catalogs.length-1].name,obs_id:bo,color:bp,shape:bs,fade:"",al_refs:br})
}aU();return br};var R=function(bn){if(bn=="all"){for(var bo=0;
bo<ao.view.catalogs.length;bo++){ao.view.catalogs.splice(bo,1);
ao.view.mustClearCatalog=true;bo--}ao.view.requestRedraw();
$("#XMM").attr("class","alix_XMM_in_menu  alix_datahelp");
$("#XMM").css("color","#888a85");$("#btn-XMM-flash").css("color","#888a85");
$("#btn-XMM-description").css("color","#888a85");
$("#btn-XMM-configure").css("color","#888a85");$("#ACDS").css("display","none");
$("#Simbad").attr("class","alix_simbad_in_menu  alix_datahelp");
$("#Simbad").css("color","#888a85");$("#btn-Simbad-flash").css("color","#888a85");
$("#btn-Simbad-configure").css("color","#888a85");
$("#NED").attr("class","alix_ned_in_menu  alix_datahelp");
$("#NED").css("color","#888a85");$("#btn-NED-flash").css("color","#888a85");
$("#btn-NED-configure").css("color","#888a85")}for(var bo=0;
bo<ao.view.catalogs.length;bo++){if(ao.view.catalogs[bo].name.startsWith(bn)){ao.view.catalogs.splice(bo,1);
ao.view.mustClearCatalog=true;ao.view.requestRedraw();
bo--}}};var N=function(bn){for(var bo=0;bo<ao.view.catalogs.length;
bo++){if(ao.view.catalogs[bo].name==bn){return ao.view.catalogs[bo]
}}return null};var t=function(bt){var bp=bt.replace(/\#/g,"");
var bq=bp.match(/.{2}/g);var bs=[3];for(var bn=0;
bn<bq.length;bn++){if(parseInt(bq[bn],16)>1){bs[bn]=parseInt(parseInt(bq[bn],16)/2)
}else{bs[bn]=1}}var br="#";for(var bo=0;bo<bs.length;
bo++){if(bs[bo].toString(16).length==1){br+="0"+bs[bo].toString(16)
}else{br+=bs[bo].toString(16)}}return br};var ai=function(bo,bv){var bt=bo.replace(/\#/g,"");
var bu=bt.match(/.{2}/g);var bs=[3];bs[0]=parseInt(parseInt(bu[0],16)*2);
bs[1]=parseInt(parseInt(bu[1],16)*2);bs[2]=parseInt(parseInt(bu[2],16)*2);
var bq=bv.replace(/\#/g,"");var bn=bq.match(/.{2}/g);
var bw=[3];bw[0]=parseInt(bn[0],16);bw[1]=parseInt(bn[1],16);
bw[2]=parseInt(bn[2],16);var bp="#";for(var br=0;
br<bs.length;br++){if(bs[br]>bw[br]){bs[br]=bw[br]
}if(bs[br].toString(16).length==1){bp+="0"+bs[br].toString(16)
}else{bp+=bs[br].toString(16)}}return bp};var bf=function(bn){var bo=$("#input_target").val();
aA(bo,function(){var bp;if((bp=N("target"))==null){bp=A.catalog({name:"target",color:"green"});
ao.addCatalog(bp)}var bq=ao.getRaDec();bp.addSources([A.marker(bq[0],bq[1],{popupTitle:"target: "+bq[0]+", "+bq[1]})]);
bd.target.push({ra:bq[0],dec:bq[1],ct:bp});E.updateCatalogs(bd,"position");
$(".alix_target_selecte").css("display","inline");
$(".alix_target_selecte").css("color","#87F6FF");
$(".alix_target_selecte").attr("class","alix_target_selecte alix_selected");
$(".alix_select_flash").css("display","inline");$(".alix_select_trash").css("display","inline");
if(bn!=null){bn(bq[0],bq[1])}})};var B=function(){if(bd.masterResource!=undefined){return'<i id="btn-XMM-flash" title = "flash" class="alix_btn-XMM-flash  glyphicon glyphicon-flash" onclick="AladinLiteX_mVc.XMMFlash(); "></i>'
}else{return""}};var P=function(){if(bd.masterResource!=undefined){return'<i id="btn-XMM-description" title="detail" class="alix_btn-XMM-description  glyphicon glyphicon-info-sign alix_btn-operate-catalog" style = "color: #888a85;" onclick="AladinLiteX_mVc.showXMMDesciption();"></i>'
}else{return""}};var u=function(){if(bd.masterResource!=undefined){return'<i id="btn-XMM-configure" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:#888a85 ;cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog(\'XMM\',this.style.color)"></i>'
}else{return""}};var w=function(){var bn="No description";
if(bd.masterResource!=undefined&&bd.masterResource.affichage.description){bn=bd.masterResource.affichage.description
}html='<p style="color:#4D36DC;margin:10px;">XMM-Newton Catalog</p><p style="font-size:small;margin:10px;font-weight:200;line-height:1.5;color:#000000;">'+bn+"</p>";
$("#panel_catalog_detail").html(html);$("#panel_catalog_detail").toggle()
};var ah=function(){return bd};var Z=function(bn){bi(bn);
ax.val(bn);Sesame.resolve(bn,function(bo){var bp=bo.Target.Resolver.jradeg;
var bq=bo.Target.Resolver.jdedeg;aG(bp,bq)},function(bo){if(console){}(typeof errorCallback==="function")&&errorCallback()
})};var aD=function(){$("#SourceDiv").css("display","none");
var bp=$(".alix_colorMapBox");var bo=bp.find(".aladin-cmSelection");
for(var bn=0;bn<ColorMap.MAPS_NAMES.length;bn++){bo.append($("<option />").text(ColorMap.MAPS_NAMES[bn]))
}bo.val(ao.view.imageSurvey.getColorMap().mapName);
bp.find(".aladin-cmSelection").change(function(){var bq=$(this).find(":selected").val();
ao.view.imageSurvey.getColorMap().update(bq);ay()
});bp.find(".aladin-reverseCm").click(function(){ao.view.imageSurvey.getColorMap().reverse();
ay()})};var a7=function(bo,bq){if(bq==1){ao.removeLayers()
}else{if(bo!=undefined){var bp=[];if(bo.type=="array"){x=aC.regionEditor.view.parseArrayPolygon(bo.value)
}else{if(aC.regionEditor.view.editionFrame.type=="soda"){x=this.controllers.regionEditor.view.parseSodaPolygon(bo.value)
}else{alert("Polygone format "+points.type+" not understood")
}}if(x){var bn=BasicGeometry.getEnclosingView(x);
j=bn.center.ra+" "+bn.center.dec;if(bn.size==0){aB=0.9
}else{aB=2.5*bn.size}if(ao==null){ao=A.aladin(aT,{survey:aX,fov:aB,showLayersControl:false,showFullscreenControl:false,showFrame:false,showGotoControl:false});
aT.append()}aN(aB);aG(bn.center.ra,bn.center.dec);
ao.removeLayers();overlay=A.graphicOverlay({color:"blue",name:"Reference Frame"});
ao.addOverlay(overlay);overlay.addFootprints([A.polygon(x)])
}}}};var at=function(){this.controller.cleanPolygon()
};var b=function(bn){bd.masterResource=new MasterResource(bn);
AladinLiteX_mVc.displayDataXml()};var aR={popup:aM,refresh:aY,init:aF,showDetailByID:f,fadeOutAuto:aj,deleteSourceAuto:aa,deselectSource:H,closeContext:ae,returnCenter:am,bookMark:e,getHistory:y,restoreView:D,regionEditor:Q,addOverlayer:a2,world2pix:M,pix2world:aS,disabledButton:C,reabledButton:X,storePolygon:av,deleteHistory:F,restoreViewById:W,hipsFunction:a5,searchCataloge:al,searchPosition:ak,catalogFunction:aw,displayCatalogDetailInContext:r,displaySimbadCatalog:Y,displayNedCatalog:az,detailCatalogOperator:O,configureCatalog:c,displayDataXml:q,XMMFlash:aP,SimbadFlash:aW,NEDFlash:o,showXMMDesciption:w,bindToFade:aU,displayCatalog:I,cleanCatalog:R,displayVizierCatalog:bh,showDetail:k,storeCurrentState:ay,colorFadeOut:t,colorFadeIn:ai,displayTarget:bf,getCurrentView:ah,setReferenceView:bg,updateColorOfCatalog:a8,updateShapeOfCatalog:d,updateSizeOfCatalog:l,showColorMap:aD,reselectSource:a3,setLastSelectedPosition:be,deleteLastSelectedPosition:s,deleteLastSelectedPositionByCatalog:p,gotoObject:aA,gotoPositionByName:Z,setRegion:a7,cleanPolygon:at,changeMasterResource:b};
return aR}();console.log("=============== >  AladinLite_v.js ");
function AladinLite_mvC(a,b){this.modules={};this.aladinView=a;
if(b.historic!=undefined){this.modules.historicModel=b.historic.model
}if(b.regionEditor!=undefined){this.modules.regionEditorView=b.regionEditor.view
}if(b.hipsSelector!=undefined){this.modules.hipsSelectorModel=b.hipsSelector.model
}}AladinLite_mvC.prototype={bookMark:function(a){if(this.modules.historicModel!=undefined){return this.modules.historicModel.bookMark(a)
}else{return null}},deleteHistory:function(a){if(this.modules.historicModel!=undefined){return this.modules.historicModel.deleteHistory(a)
}else{return null}},getHistory:function(a){if(this.modules.historicModel!=undefined){return this.modules.historicModel.getHistory(a)
}else{return null}},editRegion:function(){if(this.modules.regionEditorView!=undefined){return this.modules.regionEditorView.init()
}else{return null}},closeEditor:function(){if(this.modules.regionEditorView!=undefined){this.modules.regionEditorView.setBrowseMode()
}else{return null}},setInitialValue:function(a){if(this.modules.regionEditorView!=undefined){return this.modules.regionEditorView.setInitialValue(a)
}else{return null}},cleanPolygon:function(){if(this.modules.regionEditorView!=undefined){return this.modules.regionEditorView.clean()
}else{return null}},setPoligon:function(a){if(this.modules.regionEditorView!=undefined){return this.modules.regionEditorView.setPoligon(a)
}else{return null}},restoreViewById:function(a){if(this.modules.historicModel!=undefined){return this.modules.historicModel.restoreViewById(a)
}else{return null}},searchHips:function(a,b){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.searchHips(a,b)
}else{return null}},buildHipsTab:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.buildHipsTab(a)
}else{return null}},getSelectedHips:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.getSelectedHips(a)
}else{return null}},searchCataloge:function(a,b){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.searchCataloge(a,b)
}else{return null}},buildCataTab:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.buildCataTab(a)
}else{return null}},getSelectedCatalog:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.getSelectedCatalog(a)
}else{return null}},storeCurrentCatalog:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.storeCurrentCatalog(a)
}else{return null}},deleteCatalogInTab:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.deleteCatalogInTab(a)
}else{return null}},createCatalogSelect:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.createCatalogSelect(a)
}else{return null}},displaySimbadCatalog:function(){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.displaySimbadCatalog()
}else{return null}},displayNedCatalog:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.displayNedCatalog(a)
}else{return null}},restoreCatalog:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.restoreCatalog(a)
}else{return null}},currentCatalogTab:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.currentCatalogTab(a)
}else{return null}},displayDataXml:function(a){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.displayDataXml(a)
}else{return null}},updateCatalogs:function(a,b){if(this.modules.hipsSelectorModel!=undefined){return this.modules.hipsSelectorModel.updateCatalogs(a,b)
}else{return null}}};console.log("=============== >  AladinLite_c.js ");
function Historique_Mvc(b,a){this.that=this;this.aladinLite_V=a;
this.mark_tab=[];this.view=new Historique_mVc(this,b,a);
this.contextDivId=b;this.contextDiv=null;this.idCounter=0;
this.hips_tab=[];this.position_tab=[]}Historique_Mvc.prototype={bookMark:function(f){var k=jQuery.extend(true,{},f);
k.comment="";if(k.target.length>0){for(var e=0;e<k.target.length;
e++){k.target[e].ct=null}}var j=JSON.stringify(k);
var b="alix:"+new Date();try{localStorage.setItem(b,j)
}catch(g){var d=0,a,h;var c=[];var l="Sorry. There's no more memory to save the new bookmark,you can delete some bookmarks in the list,or do you want to clear all the storage?";
c.push(l);for(h in localStorage){a=(((localStorage[h].length||0)+(h.length||0))*2);
d+=a;c.push(h.substr(0,50)+" = "+(a/1024).toFixed(2)+" KB")
}c.push("Total = "+(d/1024).toFixed(2)+" KB");if(confirm(c.join("\n"))){if(confirm("Do you really want to delete all the storage?")){localStorage.clear()
}}}this.mark_tab.unshift(k);if(this.contextDiv==null){this.contextDiv=$("#"+this.contextDivId)
}return this.view.drawContext(f)},cleanRepetition:function(c){var e=[];
for(var b=0;b<c.length;b++){var d=false;for(var a=0;
a<e.length;a++){if(e[a]==c[b].survey.ID){d=true;break
}}if(d!=true){e.push(c[b].survey.ID)}}return e},getHistory:function(){return this.view.drawContext()
},restoreView:function(a){return this.aladinLite_V.restoreView(a)
},deleteHistory:function(a){var b=localStorage.key(a);
localStorage.removeItem(b);return this.view.drawContext()
},restoreViewById:function(b){var a=getAladinLiteView(b);
return a},findIdPosition:function(b){for(var a=0;
a<this.mark_tab.length;a++){if(this.mark_tab[a].id==b){break
}}return a}};var deepClone=function(e){var d=judgeType(e);
var f;if(d==="array"){f=[]}else{if(d==="object"){f={}
}else{return e}}if(d==="array"){for(var c=0,a=e.length;
c<a;c++){f.push(deepClone(e[c]))}}else{if(d==="object"){for(var b in e){if(judgeType(e[b])=="function"){f[b]=e[b].toString()
}else{f[b]=deepClone(e[b])}}}}return f};var judgeType=function(c){var b=Object.prototype.toString;
var a={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regExp","[object Undefined]":"undefined","[object Null]":"null","[object Object]":"object"};
if(c instanceof Element){return"element"}return a[b.call(c)]
};console.log("=============== >  Historique_m.js ");
var Historique_mVc=function(c,b,a){this.that=this;
this.model=c;this.contextDivId=b;this.contextDiv=null;
this.aladinLite_V=a};Historique_mVc.prototype={drawContext:function(){var c=this;
var g=true;if(this.contextDiv==null){this.contextDiv=$("#"+this.contextDivId)
}var f='<b class="alix_titlle_image" style=" margin-left: 15px;">Bookmarks:</b><div style="height:230px;overflow:auto;"><ul id = "history_ul" style="padding-left:18px;">';
for(var e in localStorage){}deleteAllObjs();for(var b=0;
b<localStorage.length;b++){var e=localStorage.key(b);
if(e.startsWith("alix:")){var a=localStorage.getItem(e);
var d=JSON.parse(a);d.id=b;var h=setAladinLiteView(d,e);
if(h.survey!=undefined){f+="<li style='position:relative;list-style-type: none;padding-top:5px;'>"+h.getHTMLTitle()+"</li>";
f+="<div id='description_"+b+"' style='display: none;'><span>Position: "+h.ra+", "+h.dec+"</span><br><span>Fov: "+h.fov+"</span><br><span>Survey: "+h.survey.obs_title+"</span><p style='font-size:small;line-height: 1em;font-weight:100;color:#000000;'>"+h.survey.obs_description+"</p>"+this.displayCataDescription(h.catalogTab)+"</div>";
g=false}}}if(g==true){f+="<p style='color:#1f252b;text-align:center'>No bookmark restored</p>"
}f+="</ul></div>";this.contextDiv.html(f);for(var b=0;
b<localStorage.length;b++){var h=getAladinLiteView(b);
if(h){h.setHandlers();$("#"+b+"_menu_show_description").click(function(j){$("#description_"+this.id.replace("_menu_show_description","")).slideToggle();
j.stopPropagation()})}}},displayCataDescription:function(a){var c="";
if(a.length>0){c+="<span>Catalog: <br>";for(var b=0;
b<a.length;b++){c+=a[b].catalog+",  "}c+="</span>"
}return c}};console.log("=============== >  Historique_v.js ");
function RegionEditor_mVc(b,a,c,e,d){this.parentDivId=a;
this.drawCanvas=null;this.drawContext=null;this.lineCanvas=null;
this.lineContext=null;this.controller=null;this.points=null;
this.clientHandler=(e==null)?function(){alert("No client handler registered")
}:e;this.contextDivId=c;this.contextDiv=null;this.sousContextDiv=null;
this.parentDiv=null;this.aladinLite_V=b;this.editionFrame=d
}var browseSaved=null;RegionEditor_mVc.prototype={init:function(){var a=this;
if(this.parentDiv==null){this.parentDiv=$("#"+this.parentDivId)
}if(this.contextDiv==null){this.contextDiv=$("#"+this.contextDivId)
}var c=this;if(!AladinLiteX_mVc.regionEditorInit){this.lineCanvas=$("<canvas id='RegionCanvasTemp' class='editor-canvas'></canvas>");
this.lineCanvas[0].width=this.parentDiv.width();this.lineCanvas[0].height=this.parentDiv.height();
this.lineContext=this.lineCanvas[0].getContext("2d");
this.parentDiv.append(this.lineCanvas);this.lineCanvas.css("z-index","100");
this.lineCanvas.css("position","absolute");this.lineCanvas.hide();
this.drawCanvas=$("<canvas id='RegionCanvas' class='editor-canvas' ></canvas>");
this.drawCanvas[0].width=this.parentDiv.width();this.drawCanvas[0].height=this.parentDiv.height();
this.drawContext=this.drawCanvas[0].getContext("2d");
this.parentDiv.append(this.drawCanvas);this.drawCanvas.css("z-index","101");
this.drawCanvas.css("position","absolute");this.drawCanvas.css("top","0px");
this.drawCanvas.hide();this.controller=new RegionEditor_mvC({handler:this.clientHandler,canvas:this.drawCanvas,canvaso:this.lineCanvas,aladinView:this.aladinLite_V});
this.drawCanvas[0].addEventListener("mousedown",function(d){console.log("down");
c.controller.mouseDown(d)},false);this.drawCanvas[0].addEventListener("mousemove",function(d){c.controller.mouseMove(d)
},false);this.drawCanvas[0].addEventListener("mouseup",function(d){c.controller.mouseUp(d)
},false);this.contextDiv.append('<p style="color:#1f252b;text-align:center">Region Editor Mode</p>');
this.browseBtn=$("<button id='regionEditor_b' class='alix_browse_btn alix_btn'>Browse&nbsp;<i class='glyphicon glyphicon-check'></i></button>");
this.contextDiv.append(this.browseBtn);this.browseBtn.css("margin-top","10px");
this.browseBtn.css("margin-left","5px");this.browseBtn.css("font-weight"," bold");
this.browseBtn.attr("disabled","disabled");this.browseBtn.click(function(d){if(!c.controller.isPolygonClosed()){c.controller.CleanPoligon()
}else{c.controller.recuperar()}c.setBrowseMode();
browseSaved=false;d.stopPropagation()});this.editBtn=$("<button id='regionEditor_e' class='alix_edt_btn alix_btn'>Edit&nbsp;<i class='glyphicon glyphicon-pencil'></i></button>");
this.contextDiv.append(this.editBtn);this.editBtn.css("margin-top","10px");
this.editBtn.css("margin-left","5px");this.editBtn.css("font-weight"," bold");
this.editBtn.click(function(d){c.setEditMode();c.controller.DeleteOverlay();
c.lineContext.clearRect(0,0,c.lineCanvas[0].width,c.lineCanvas[0].height);
c.drawContext.clearRect(0,0,c.drawCanvas[0].width,c.drawCanvas[0].height);
c.controller.almacenar();d.stopPropagation()});this.effacerBtn=$("<button id='regionEditor_c' class=' alix_clear_btn alix_btn'>Clear&nbsp;<i class='glyphicon glyphicon-trash'></i></button>");
this.contextDiv.append(this.effacerBtn);this.effacerBtn.css("margin-top","10px");
this.effacerBtn.css("margin-left","5px");this.effacerBtn.css("font-weight"," bold");
this.effacerBtn.click(function(d){c.controller.CleanPoligon();
d.stopPropagation()});this.setBrowseMode();var b=$("<button id='regionEditor_a' class=' alix_accept_btn alix_btn'>Accept&nbsp;<i class='glyphicon glyphicon-share'></i></button>");
this.contextDiv.append(b);b.css("margin-top","10px");
b.css("margin-left","5px");b.css("font-weight"," bold");
b.click(function(d){c.controller.recuperar();c.setBrowseMode();
c.controller.invokeHandler(true);c.aladinLite_V.reabledButton();
document.getElementById("region").disabled=false;
browseSaved=true;d.stopPropagation()})}if(!AladinLiteX_mVc.regionEditorInit){this.setInitialValue(a.defaultRegion);
if(this.editionFrame){this.setEditionFrame(this.editionFrame);
this.setEditMode()}AladinLiteX_mVc.regionEditorInit=true
}},clean:function(){if(this.controller){this.controller.CleanPoligon();
this.setEditMode();this.controller.DeleteOverlay();
this.lineContext.clearRect(0,0,this.lineCanvas[0].width,this.lineCanvas[0].height);
this.drawContext.clearRect(0,0,this.drawCanvas[0].width,this.drawCanvas[0].height);
this.controller.almacenar();this.controller.recuperar();
this.setBrowseMode()}},setEditionFrame:function(c){if(c){this.editionFrame=c
}var a=null;if(this.editionFrame){var d=[];if(this.editionFrame.type=="array"){a=this.parseArrayPolygon(this.editionFrame.value)
}else{if(this.editionFrame.type=="soda"){a=this.parseSodaPolygon(this.editionFrame.value)
}else{alert("Polygone format "+c.type+" not understood")
}}if(a){var b=BasicGeometry.getEnclosingView(a);this.aladinLite_V.gotoPosition(b.center.ra,b.center.dec);
this.aladinLite_V.setZoom(1.2*b.size);if(this.editionFrameOverlay==null){this.editionFrameOverlay=A.graphicOverlay({color:"blue",name:"Editable Frame"});
this.aladinLite_V.addOverlayer(this.editionFrameOverlay)
}this.editionFrameOverlay.removeAll();this.editionFrameOverlay.addFootprints([A.polygon(a)]);
$("#center").val("Ed. Frame").attr("title","Center the view on the editable frame")
}else{this.editionFrame=null;$("#center").val("Center").attr("title","Center on the current drawing")
}}},setInitialValue:function(d){this.points=d;if(this.points){var e=[];
if(this.points.type=="saadaql"){var c=/"(.*)"/.exec(this.points.value);
if(c.length!=2){Alix_Modalinfo.error(this.points.value+" does not look like a SaadaQL statment");
return}else{if(this.points.value.startsWith("isInRegion")){var b=c[1].split(/[\s,;]/);
for(var a=0;a<b.length;a++){e.push(parseFloat(b[a]))
}}else{var f=c[1].replace(/:/g," ");this.posField.val(f);
this.aladin.setZoom(0.55);this.aladin.gotoObject(f)
}}}else{if(this.points.type=="array2dim"){e=this.points.value
}else{alert("Polygone format "+this.points.type+" not understood");
return}}this.setBrowseMode();this.controller.DeleteOverlay();
this.controller.setPoligon(e)}},setBrowseMode:function(){this.editBtn.removeAttr("disabled");
this.browseBtn.attr("disabled","disabled");this.effacerBtn.attr("disabled","disabled");
this.lineCanvas.hide();this.drawCanvas.hide()},setEditMode:function(){this.browseBtn.removeAttr("disabled");
this.editBtn.attr("disabled","disabled");this.effacerBtn.removeAttr("disabled");
this.lineCanvas.show();this.drawCanvas.show()},parseSodaPolygon:function(d){var c=d.split(/\s+/);
var a=null;if(c[0].toUpperCase()!="POLYGON"){alert("Only SODA POLYGON are supported")
}else{c.shift();if(!c||(c.length%2)!=0||c.length<6){alert("Even number of coordinates required ("+c.length+" values read)")
}else{a=[];for(var b=0;b<(c.length/2);b++){a[a.length]=[parseFloat(c[2*b]),parseFloat(c[(2*b)+1])]
}a.push(a[0])}}return a},parseArrayPolygon:function(c){var a=null;
if(!c||(c.length%2)!=0||c.length<6){alert("Even number of coordinates required")
}else{a=[];for(var b=0;b<(c.length/2);b++){a[a.length]=[c[2*b],c[(2*b)+1]]
}a.push(a[0])}return a}};console.log("=============== >  RegionEditor_v.js ");
function RegionEditor_Mvc(e,d,c,a,b){this.node=[];
this.canvas=c[0];this.canvaso=a[0];this.context=this.canvas.getContext("2d");
this.contexto=this.canvaso.getContext("2d");this.overlay=null;
this.skyPositions=null;this.aladinView=b;this.points=e
}RegionEditor_Mvc.prototype={DrawNode:function(b){for(var a in b){this.context.beginPath();
this.context.arc(b[a].cx,b[a].cy,b[a].r,0,Math.PI*2,true);
this.context.fillStyle="blue";this.context.fill();
this.context.stroke();this.context.closePath()}},DrawnLine:function(c,b,e,a){if(a!=null){this.context.beginPath();
this.context.lineCap="round";for(var d in this.node){if(this.node[a.N]==d){this.context.moveTo(this.node[a.N].cx,this.node[a.N].cy)
}this.context.lineTo(this.node[d].cx,this.node[d].cy)
}this.context.closePath();this.context.strokeStyle="lime";
this.context.stroke()}else{this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
this.context.beginPath();this.context.lineCap="round";
this.context.moveTo(this.node[c].cx,this.node[c].cy);
this.context.lineTo(b,e);this.context.closePath();
this.context.strokeStyle="lime";this.context.stroke()
}},Redrawn:function(a){this.CanvasUpdate();for(var b in this.node){this.context.beginPath();
this.context.arc(this.node[b].cx,this.node[b].cy,this.node[b].r,0,Math.PI*2,true);
this.context.fillStyle="red";this.context.fill();
this.context.stroke();this.context.closePath()}this.DrawnLine(0,0,0,a)
},CanvasUpdate:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
this.contexto.drawImage(this.canvas,0,0)},ArrayToObject:function(b){var c=[];
for(var a in b){c.push({cx:b[a][0],cy:b[a][1],r:5})
}this.node=[];this.node=c},GetHeight:function(f){var b=null,d=null;
var e;var a;for(var c in f){temp=f[c][0];if(b==null){b=temp
}else{if(temp>=b){b=temp}}if(d==null){d=temp}else{if(temp<=d){d=temp
}}}a=(b-d);if(a>180){a=360-a}return{ramax:b,ramin:d,largeur:a}
},NumeroSegmen:function(){var c=this.node.length;
var d,a;var e=[];for(var b=0;b<this.node.length;b++){if(d==undefined){d=b
}else{if(a==undefined){a=b}}if(d!=undefined&&a!=undefined){e.push({A:d,B:a});
d=a;a=undefined}}e.push({A:(this.node.length-1),B:0});
return e},GetWidth:function(f){var e=null,b=null;
var a;var d;for(var c in f){a=(f[c][1]);if(e==null){e=a
}else{if(a>=e){e=a}}if(b==null){b=a}else{if(a<=b){b=a
}}}d=(e-b);if(d>180){d=360-d}return{decmax:e,decmin:b,width:d}
},DrawGrafic:function(h){var g=h;var f=g.width;var a=g.height;
var e=g.getContext("2d");var d=20;var b=20;for(var c=0;
c<a;c++){this.contextGrafic.beginPath();if(c===0){this.contextGrafic.moveTo(c+20,10);
this.contextGrafic.lineTo(c+20,a);this.contextGrafic.fillStyle="black";
this.contextGrafic.font="bold 8px sans-serif";this.contextGrafic.fillText("0",c+15,20)
}else{this.contextGrafic.moveTo(c+d,20);this.contextGrafic.lineTo(c+d,a);
this.contextGrafic.fillStyle="black";this.contextGrafic.font="bold 8px sans-serif";
this.contextGrafic.fillText(c,(c+d)-3,20)}this.contextGrafic.closePath();
this.contextGrafic.strokeStyle="yellow";this.contextGrafic.stroke();
d=parseInt(d+20)}for(var c=0;c<f;c++){this.contextGrafic.beginPath();
this.contextGrafic.lineCap="round";if(c===0){this.contextGrafic.moveTo(12,c+20);
this.contextGrafic.lineTo(f,c+20)}else{this.contextGrafic.moveTo(12,0+b);
this.contextGrafic.lineTo(f,0+b);this.contextGrafic.font="bold 8px sans-serif";
this.contextGrafic.fillStyle="black";this.contextGrafic.fillText(c,3,(0+b)+3)
}this.contextGrafic.closePath();this.contextGrafic.strokeStyle="brown";
this.contextGrafic.stroke();b=parseInt(b+20)}},isEmpty:function(){if(this.node.length==0){return true
}else{return false}},addNode:function(j,g,a,e){if(e){var k={};
var h={};var c=parseInt(a[0].position);k.cx=a[0].cx;
k.cy=a[0].cy;k.r=a[0].r;if(this.node.length===c){h.cx=this.node[(this.node.length-1)].cx;
h.cy=this.node[(this.node.length-1)].cy;h.r=5;this.node.splice((this.node.length-1),1,h,k)
}else{h.cx=this.node[a[0].position].cx;h.cy=this.node[a[0].position].cy;
h.r=5;this.node.splice(a[0].position,1,k,h)}this.Redrawn(0)
}else{var f=typeof(a);if(f!="object"){if(a==0&&this.node.length>1){this.node.unshift({cx:j,cy:g,r:5})
}else{this.node.push({cx:j,cy:g,r:5})}this.DrawNode(this.node)
}else{if(a!=undefined){var l={};var d={};d.cx=a.segmento.xA;
d.cy=a.segmento.yA;d.r=5;l.cx=j;l.cy=g;l.r=5;this.node.splice(a.segmento.segmento,1,d,l);
var b=this.node;this.Redrawn(0)}}}},getNode:function(b,f){var d=0;
var c=0;var a=0;for(var e in this.node){d=b-this.node[e].cx;
c=f-this.node[e].cy;var a=d*d+c*c;if(a<=25){return e
}}return -1},getSegment:function(b){var a=0,c=0;if(b==0){a=(parseInt(b)+1);
c=(this.node.length-1)}else{if(b==(this.node.length-1)){a=parseInt((this.node.length-1)-1);
c=0}else{if(b!=0&&b!=(this.node.length-1)){a=(parseInt(b)+1);
c=(parseInt(b)-1)}}}return{A:a,B:c,N:b}},canvasUpdate:function(){this.contexto.drawImage(this.canvas,0,0);
this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
},drawHashline:function(b,a,c){this.DrawnLine(b,a,c)
},CleanLine:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
},isExtremity:function(a){if(a==0||a==(this.node.length-1)){return true
}return false},closePolygone:function(b,a){if(b==a){return false
}else{if(b==0&&a==(this.node.length-1)){for(var c in this.node){this.context.beginPath();
this.context.arc(this.node[c].cx,this.node[c].cy,this.node[c].r,0,Math.PI*2,true);
this.context.fillStyle="red";this.context.fill();
this.context.stroke();this.context.closePath()}return true
}else{if(b==(this.node.length-1)&&a==0){for(var c in this.node){this.context.beginPath();
this.context.arc(this.node[c].cx,this.node[c].cy,this.node[c].r,0,Math.PI*2,true);
this.context.fillStyle="red";this.context.fill();
this.context.stroke();this.context.closePath()}return true
}}}return false},Drag:function(e,b,h,a){var g;var d;
var c;var f=[];this.node[e].cx=b;this.node[e].cy=h;
this.node[a.N].cx=b;this.node[a.N].cy=h;this.Redrawn(a)
},almacenar:function(){if(this.skyPositions!=null){this.node=[];
this.skyPositions.pop();for(var a=0;a<this.skyPositions.length;
a++){this.node.push(this.aladinView.world2pix(this.skyPositions[a][0],this.skyPositions[a][1]))
}this.ArrayToObject(this.node);this.Redrawn(this.node)
}},DeleteOverlay:function(){if(this.overlay!=null){this.overlay.addFootprints(A.polygon(this.skyPositions));
this.overlay.removeAll();this.overlay.overlays=[]
}},recuperar:function(){if(this.node&&this.node.length==0&&this.skyPositions&&this.skyPositions.length>0){return
}this.skyPositions=[];for(var a=0;a<this.node.length;
a++){this.skyPositions.push(this.aladinView.pix2world(this.node[a].cx,this.node[a].cy))
}if(this.overlay==null){this.overlay=A.graphicOverlay({color:"red"});
this.aladinView.addOverlayer(this.overlay)}this.overlay.removeAll();
this.overlay.addFootprints([A.polygon(this.skyPositions)])
},setPolygon:function(b){this.skyPositions=[];for(var a=0;
a<b.length;a++){this.skyPositions.push(b[a])}if(this.overlay==null){this.overlay=A.graphicOverlay({color:"red"});
this.aladinView.addOverlayer(this.overlay)}this.overlay.removeAll();
this.overlay.addFootprints([A.polygon(this.skyPositions)])
},setOverlay:function(a){if(this.overlay==null){this.overlay=A.graphicOverlay({color:"red"});
this.aladinView.addOverlayer(this.overlay)}this.overlay.removeAll()
},CleanPoligon:function(){this.CanvasUpdate();this.node=[];
this.skyPositions=[]},PolygonCenter:function(){var a=BasicGeometry.getEnclosingView(this.skyPositions);
this.aladin.gotoPosition(a.center.ra,a.center.dec);
this.aladin.setZoom(1.2*a.size)},RemoveNode:function(c,a){var b=this.node[c];
if(this.node.length>=4){this.node.splice(c,1);if(a){this.DrawNode(this.node)
}else{this.Redrawn(0)}}},GetXYNode:function(b,g){var e={};
var d;var c;for(var f in this.node){d=b-this.node[f].cx;
c=g-this.node[f].cy;var a=d*d+c*c;if(a<=25){if(e.a==undefined){e.a=f
}else{e.b=f}}}return e},GetNodelength:function(){return this.node
},createGrafic:function(a){this.DrawGrafic(a)},cuadradoIndicador:function(a,b){this.context.beginPath();
this.context.fillRect(a,b,10,10);this.context.fillStyle="red";
this.context.fill();this.context.stroke();this.context.closePath()
},stokeNode:function(b){if(b!=undefined){var a=[]
}a.push({position:b,cx:this.node[b].cx,cy:this.node[b].cy,r:5});
return a},getSkyPositions:function(){return this.skyPositions
}};console.log("=============== >  RegionEditor_m.js ");
function RegionEditor_mvC(b){this.polygonModel=new RegionEditor_Mvc(b.points,b.handler,b.canvas,b.canvaso,b.aladinView);
this.canvas=b.canvas;this.clientHandler=b.handler;
this.startingNode=-1;this.buttondown=false;this.closed=false;
this.movestart=false;this.startdrag=false;this.drag=null;
this.result=-1;this.stokeNode;var a=this}RegionEditor_mvC.prototype={getStatus:function(){return"startingNode="+this.startingNode+" buttondown="+this.buttondown+" closed="+this.closed+" movestart="+this.movestart+" startdrag="+this.startdrag+" drag="+this.drag+" result="+this.result+" stokeNode="+this.stokeNode
},checkPolygon:function(a){return true},mouseDown:function(e){var b=-1;
var g=-1;var a=parseInt(e.pageX)-parseInt(this.canvas.offset().left).toFixed(1);
var h=parseInt(e.pageY)-parseInt(this.canvas.offset().top).toFixed(1);
if(this.polygonModel.isEmpty()){this.polygonModel.addNode(a,h)
}else{if(this.closed==true&&(b=this.polygonModel.getNode(a,h))!=-1){this.result=this.polygonModel.getSegment(b);
this.stokeNode=this.polygonModel.stokeNode(b);this.startdrag=true;
this.drag=b;this.startingNode=b;this.canvas.css("cursor","move")
}else{if((b=this.polygonModel.getNode(a,h))!=-1){if(this.polygonModel.isExtremity(b)){if(this.closed==true){this.startingNode=-1;
this.buttondown=false}else{this.startingNode=b;this.buttondown=true;
this.closed=false}}}}}if(this.closed&&b==-1){var d=this.polygonModel.GetNodelength();
var f=new Segment(d);var c=f.IsCursorOn(a,h);if(c!=undefined){if(c.flag=="vertical"){this.polygonModel.addNode(a,h,c)
}else{if(c.flag=="horizontal"){this.polygonModel.addNode(a,h,c)
}else{if(c.flag=="distancia"){this.polygonModel.addNode(a,h,c)
}}}}}},mouseMove:function(b){var a=parseInt(b.pageX)-parseInt(this.canvas.offset().left).toFixed(1);
var c=parseInt(b.pageY)-parseInt(this.canvas.offset().top).toFixed(1);
if(this.buttondown==true&&this.startingNode!=-1){this.movestart=true;
this.polygonModel.drawHashline(this.startingNode,a,c,this.result)
}else{if(this.startdrag){this.polygonModel.Drag(this.drag,a,c,this.result)
}}},mouseUp:function(a){var j=-1;var e;var g=parseInt(a.pageX)-parseInt(this.canvas.offset().left).toFixed(1);
var f=parseInt(a.pageY)-parseInt(this.canvas.offset().top).toFixed(1);
if(this.buttondown==true&&(j=this.polygonModel.getNode(g,f))!=-1){if(this.polygonModel.isExtremity(j)==false){this.polygonModel.CleanLine();
this.buttondown=false}if(this.polygonModel.closePolygone(j,this.startingNode)==true){this.buttondown=false;
this.closed=true}}if(this.closed==true&&(e=this.polygonModel.GetXYNode(g,f))!=null){if(e.a!=undefined&&e.b!=undefined){if(this.startingNode==e.a){this.polygonModel.RemoveNode(e.a,false)
}else{if(this.startingNode==e.b){this.polygonModel.RemoveNode(e.b,false)
}}}}if(this.buttondown==true&&this.movestart==true){if(j==this.startingNode&&(j=this.polygonModel.getNode(g,f)!=-1)){this.buttondown=false;
this.movestart=false;this.polygonModel.CleanLine()
}else{this.polygonModel.addNode(g,f,this.startingNode);
this.buttondown=false;this.movestart=false;var d=this.polygonModel.GetNodelength();
var c=new Segment(d);var h;var b=c.Itersection(this.startingNode,false);
if(b!=-1&&b!=undefined){if(this.startingNode!=0){this.polygonModel.RemoveNode(b.nB,true)
}else{this.polygonModel.RemoveNode(b.nA,true)}this.polygonModel.CleanLine()
}}}else{if(this.buttondown==true&&this.movestart==false){this.buttondown=false;
this.movestart=false}}if(this.startdrag==true){this.startdrag=false;
this.canvas.css("cursor","default");var d=this.polygonModel.GetNodelength();
var c=new Segment(d);var b=c.Itersection(this.startingNode,true);
if(b!=-1&&b!=undefined){this.polygonModel.RemoveNode(this.startingNode,false);
this.polygonModel.addNode(g,f,this.stokeNode,true)
}}this.polygonModel.canvasUpdate()},almacenar:function(){this.polygonModel.almacenar()
},recuperar:function(){this.polygonModel.recuperar()
},DeleteOverlay:function(){this.polygonModel.DeleteOverlay()
},CleanPoligon:function(){this.polygonModel.CleanPoligon();
this.closed=false},PolygonCenter:function(){this.polygonModel.PolygonCenter()
},CreateGrafic:function(a){this.polygonModel.createGrafic(this.canvas)
},show:function(){alert(this.polygonModel.getSkyPositions())
},setPoligon:function(a){this.polygonModel.setPolygon(a);
this.closed=true;this.invokeHandler(false);return true
},invokeHandler:function(b){if(this.isPolygonClosed()){var a=BasicGeometry.getEnclosingView(this.polygonModel.skyPositions);
this.clientHandler({isReady:true,userAction:b,region:{format:"array2dim",points:this.polygonModel.skyPositions,size:{x:a.size,y:a.size}}})
}else{alert("Polygon not closed")}},isPolygonClosed:function(){return(this.closed||(this.polygonModel.node==undefined||this.polygonModel.node.length==0))
}};console.log("=============== >  RegionEditor_c.js ");
function HipsSelector_Mvc(a,b){this.tapSchemaQuery="SELECT  TOP 100  tap_schema.tables.schema_name as schema, tap_schema.columns.table_name as table,tap_schema.columns.column_name as column ,tap_schema.columns.ucd as ucd FROM tap_schema.columns JOIN tap_schema.tables ON tap_schema.columns.table_name = tap_schema.tables.table_name WHERE tap_schema.columns.table_name = '{$CATID}'";
this.productType=null;this.baseUrl=null;this.imageIdPattern=new RegExp(/.*\/C\/.*/);
this.imageTilePattern=new RegExp(/.*((jpeg)|(png)).*/);
this.view=new HipsSelector_mVc(a,this);this.hips_dict={};
this.cata_dict={};this.cata_tab=[];this.cata_created={};
this.color={};this.aladinLite_V=b}HipsSelector_Mvc.prototype={searchHips:function(a,c){var d=this;
this.baseUrl="http://alasky.unistra.fr/MocServer/query?RA="+c.ra+"&DEC="+c.dec+"&SR="+c.fov+"&fmt=json&get=record&casesensitive=false";
d.productType="image";var b=this.baseUrl;if(a!=""){b+="&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"+a+"*"
}$.getJSON(b,function(g){if(d.productType!=undefined){for(var f=g.length-1;
f>=0;f--){if(g[f].dataproduct_type!=d.productType){g.splice(f,1)
}}if(d.productType=="image"){for(var f=g.length-1;
f>=0;f--){var h=0;if($.isArray(g[f].hips_tile_format)){for(var e=0;
e<g[f].hips_tile_format.length;e++){if(d.imageTilePattern.test(g[f].hips_tile_format[e])){h=1;
break}}}else{if(d.imageTilePattern.test(g[f].hips_tile_format)){h=1
}}if(h==0){g.splice(f,1)}}}}d.storeHips(g);d.view.displayHipsList(g)
})},storeHips:function(c){var a=this;for(var b=0;
b<c.length;b++){a.hips_dict[c[b].ID]=c[b]}},buildHipsTab:function(b){var c=this;
this.baseUrl="http://alasky.unistra.fr/MocServer/query?RA="+b.ra+"&DEC="+b.dec+"&SR="+b.fov+"&fmt=json&get=record&casesensitive=false";
c.productType="image";var a=this.baseUrl;$.getJSON(a,function(f){if(c.productType!=undefined){for(var e=f.length-1;
e>=0;e--){if(f[e].dataproduct_type!=c.productType){f.splice(e,1)
}}if(c.productType=="image"){for(var e=f.length-1;
e>=0;e--){var g=0;if($.isArray(f[e].hips_tile_format)){for(var d=0;
d<f[e].hips_tile_format.length;d++){if(c.imageTilePattern.test(f[e].hips_tile_format[d])){g=1;
break}}}else{if(c.imageTilePattern.test(f[e].hips_tile_format)){g=1
}}if(g==0){f.splice(e,1)}}}}c.storeHips(f)})},getSelectedHips:function(a){return this.hips_dict[a]
},searchCataloge:function(a,c){var d=this;this.baseUrl="http://alasky.unistra.fr/MocServer/query?RA="+c.ra+"&DEC="+c.dec+"&SR="+c.fov+"&fmt=json&get=record&casesensitive=false&MAXREC=100";
d.productType="catalog";var b=this.baseUrl;if(a!=undefined&&a!=""){b+="&publisher_id,creator_did,publisher_did,obs_id,obs_title,obs_regime=*"+a+"*"
}$.getJSON(b,function(f){if(d.productType!=undefined){for(var e=f.length-1;
e>=0;e--){if(f[e].dataproduct_type!=d.productType){f.splice(e,1)
}}}d.storeCatalog(f);d.view.displayCatalogeList(f)
})},buildCataTab:function(b){var c=this;this.baseUrl="http://alasky.unistra.fr/MocServer/query?RA="+b.ra+"&DEC="+b.dec+"&SR="+b.fov+"&fmt=json&get=record&casesensitive=false&MAXREC=200";
c.productType="catalog";var a=this.baseUrl;$.getJSON(a,function(e){if(c.productType!=undefined){for(var d=e.length-1;
d>=0;d--){if(e[d].dataproduct_type!=c.productType){e.splice(d,1)
}}}for(var d=0;d<e.length;d++){c.cata_dict[e[d].obs_id]=e[d]
}c.restoreCatalog(b)})},storeCatalog:function(c){var a=this;
for(var b=0;b<c.length;b++){a.cata_dict[c[b].obs_id]=c[b]
}},builTapQuery:function(a){var b=this.tapSchemaQuery.replace("{$CATID}",a);
$.ajax({url:"http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync",data:{lang:"adql",request:"doQuery",format:"json",query:b},method:"GET",async:false,dataType:"json",success:function(c){var e=c.data[0][0]+".'"+a+"'";
for(var d=0;d<c.data.length;d++){if(c.data[d][3].startsWith("phot.mag;em")){var g=c.data[d][2];
var f="SELECT TOP 500 * FROM "+e+" WHERE "+g+" IS NOT NULL AND CONTAINS(POINT('ICRS', RAJ2000, DEJ2000), BOX('ICRS', @ra@, @$dec@, @$fov@, @$fov@)) = 1  ORDER BY "+g+" asc";
f="http://tapvizier.u-strasbg.fr/TAPVizieR/tap/sync?lang=adql&request=doQuery&"+encodeURI(f).replace(/@ra@/g,"{$ra}").replace(/@dec@/g,"{$dec}").replace(/@fov@/g,"{$fov}");
cata_dict[a].tapProgUrl=f;break}}},error:function(e,c,d){WaitingPanel.warn(e.responseText)
}})},getSelectedCatalog:function(a){return this.cata_dict[a]
},deleteCatalogInTab:function(a){this.cata_tab.splice(a,1)
},createCatalogSelect:function(b){var a=this;return this.view.createCatalogSelect(b,a.cata_dict)
},displaySimbadCatalog:function(){return this.view.displaySimbadCatalog()
},displayNedCatalog:function(a){return this.view.displayNedCatalog(a)
},currentCatalogTab:function(a){var b=this;var g=[];
for(var f=0;f<a.length;f++){var e={catalog:null,color:null,obs_id:null};
var d=a[f].name;e.catalog=d;e.color=a[f].color;for(var c in LibraryCatalog.catalogs){if(LibraryCatalog.catalogs[c].nameTemp==d){e.catalog=LibraryCatalog.catalogs[c].name;
e.color=LibraryCatalog.catalogs[c].color}}if(e.catalog.startsWith("VizieR")){e.obs_id=e.catalog.split(":")[1]
}g.push(e)}return g},restoreCatalog:function(d){var b=this;
var e={};for(var c=0;c<d.catalogTab.length;c++){var a;
b.view.libraryMap.setCatalogByColor(d.catalogTab[c]);
if(d.catalogTab[c].catalog=="Simbad"){b.displaySimbadCatalog()
}else{if(d.catalogTab[c].catalog=="NED"){b.displayNedCatalog(d)
}}if(b.cata_dict[d.catalogTab[c].obs_id]&&d.catalogTab[c].obs_id){if(b.cata_dict[d.catalogTab[c].obs_id].hips_service_url==undefined){b.aladinLite_V.displayVizierCatalog(d.catalogTab[c].obs_id,d.catalogTab[c].color,"showTable")
}else{b.aladinLite_V.displayVizierCatalog(d.catalogTab[c].obs_id,d.catalogTab[c].color,"showTable",b.cata_dict[d.catalogTab[c].obs_id].hips_service_url)
}}}this.view.redrawCatalogSelector(d,b.cata_dict)
},displayDataXml:function(c){var a=this;if(c.masterResource!=undefined&&c.masterResource.setParamsInUrl){var b=c.masterResource.setParamsInUrl(c)
}return this.view.displayDataXml(c,b)},updateCatalogs:function(c,d){var a=this;
if(c.masterResource!=undefined&&c.masterResource.setParamsInUrl){var b=c.masterResource.setParamsInUrl(c)
}return this.view.updateCatalogs(c,b,d)}};console.log("=============== >  HipsSelector_m.js ");
function HipsSelector_mVc(a,b){this.parentDivId=a;
this.parentDiv=null;this.libraryMap=new LibraryMap();
this.model=b}HipsSelector_mVc.prototype={displaylistepanel:function(){},displayHipsList:function(c){var a=$("#itemList");
if(a.css("display")=="none"){a.css("display","block");
a.css("z-index","10000")}a.html("<span class=strong style='color:#2e3436;style='font-size: 15px;'>"+c.length+' matching Hips images</span>\n<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);"style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="glyphicon glyphicon-remove"></span></a><br><br>');
for(var b=0;b<c.length;b++){a.append("<div id = 'panel_"+c[b].ID+"' class='alix_liste_item' ><bn class='alix_title_in_liste'>"+c[b].obs_title+" | "+c[b].ID+"</bn></div><div id='"+c[b].ID.replace(/\./g,"")+"' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.hipsFunction(&quot;"+c[b].ID+"&quot,  &quot;"+c[b].obs_title.replace(/["']/," ")+"&quot)'>"+c[b].obs_title+"</span><br><br><span style='font-size:small;color : #727371'>"+c[b].ID+"</span><br><span class=blackhelp style='font-size:small;'>"+c[b].obs_regime+"</span><br><span class=blackhelp style='font-size:small;'>"+c[b].obs_description+"</span></div>");
$(document.getElementById("panel_"+c[b].ID)).click(function(){var d=$(this).attr("id").replace("panel_","").replace(/\//g,"\\/").replace(/\./g,"");
$("#"+d).slideToggle();$(this).toggleClass("alix_liste_item_close")
})}},displayCatalogeList:function(c){var a=$("#itemList");
if(a.css("display")=="none"){a.css("display","block");
a.css("z-index","10000")}a.html("<span class=strong style='font-size: 15px;'>"+c.length+' matching Catalogues <b>*catalogue progressive</b></span>\n<a href="#" onclick="$(&quot;#itemList&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="glyphicon glyphicon-remove"></span></a><br><br>');
for(var b=0;b<c.length;b++){if(c[b].hips_service_url==undefined){a.append("<div id = 'catalog_"+c[b].ID+"' class='alix_liste_item' ><span class='alix_title_in_liste' >"+c[b].obs_title+"</span></div><div id='cata_"+c[b].ID+"' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.catalogFunction(&quot;"+c[b].obs_id+"&quot,  &quot;"+c[b].obs_title.replace(/["']/," ")+"&quot);'>"+c[b].obs_title+"</span><i id='btn_detail_catalog_"+c[b].obs_id+"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+c[b].obs_id+"&quot;)'></i>&nbsp;<br><span style='font-size:small;color : #727371'>"+c[b].obs_id+"</span><br><span class=blackhelp style='font-size:small;'>"+c[b].obs_description+"</span></div>")
}else{a.append("<div id = 'catalog_"+c[b].ID+"' class='alix_liste_item' ><span class='alix_title_in_liste' style='font-weight: bold;'>"+c[b].obs_title+"</span><i class='glyphicon glyphicon-asterisk' style='font-size:8px;'></i></div><div id='cata_"+c[b].ID+"' class='alix_description_panel'><span class=alix_datahelp style='cursor: pointer;color:#4D36DC;font-size: medium;' onclick='AladinLiteX_mVc.catalogFunction(&quot;"+c[b].obs_id+"&quot,  &quot;"+c[b].obs_title.replace(/["']/," ")+"&quot);'>"+c[b].obs_title+"</span><i id='btn_detail_catalog_"+c[b].obs_id+"' title='detail' class='glyphicon glyphicon-info-sign alix_btn-operate-catalog' style='cursor: pointer;' onclick='AladinLiteX_mVc.displayCatalogDetailInContext(&quot;"+c[b].obs_id+"&quot;)'></i>&nbsp;<br><span style='font-size:small;color : #727371'>"+c[b].obs_id+"</span><br><span class=blackhelp style='font-size:small;'>"+c[b].obs_description+"</span><br><span style='font-size:small;'>"+c[b].hips_service_url+"</span></div>")
}$(document.getElementById("catalog_"+c[b].ID)).click(function(){var d=$(this).attr("id").replace("catalog_","cata_").replace(/\//g,"\\/").replace(/\+/g,"\\+");
$("#"+d).slideToggle();$(this).toggleClass("alix_liste_item_close")
})}},createCatalogSelect:function(c,a){var j=this;
$("#itemList").css("display","none");var h="VizieR:"+c;
var e=null;var f=a[c];var d;if(LibraryCatalog.getCatalog(h)){d=LibraryCatalog.getCatalog(h).color
}else{d=this.libraryMap.getNextFreeColor(c).color
}WaitingPanel.show(c);if(f.hips_service_url!=undefined){e=j.model.aladinLite_V.displayVizierCatalog(c,d,"showTable",f.hips_service_url)
}else{e=j.model.aladinLite_V.displayVizierCatalog(c,d,"showTable")
}var b=LibraryCatalog.getCatalog(h).id;$("#vizier_list").append('<li id="cata_list_'+b+'" class = "'+c+'"style="list-style-type: none;height:auto;"><div id="cata_operate_'+b+'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+d+';" >'+a[c].obs_id+'</div>&nbsp;<i id="btn_detail_catalog_'+b+'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+b+')"></i>&nbsp;<i id="btn_flash_catalog_'+b+'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;"></i>&nbsp;<i id="btn_configure_catalog_'+b+'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+b+')"></i><i id="btn_delete_catalog_'+b+'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;"></i></li>');
var g=b;$("#cata_operate_"+b).unbind("click").click(function(m){m.stopPropagation();
var l=$(this).text();var n="VizieR:"+l;var k=LibraryCatalog.getCatalog(n).color;
var o=a[l];if($(this).attr("class")!="alix_vizier_chosen "){$(this).attr("class","alix_vizier_chosen ");
$(this).css("color",k);WaitingPanel.show(l);$("#itemList").css("display","none");
if(o.hips_service_url!=undefined){e=j.model.aladinLite_V.displayVizierCatalog(l,k,"showTable",o.hips_service_url)
}else{e=j.model.aladinLite_V.displayVizierCatalog(l,k,"showTable")
}}else{$(this).attr("class","alix_vizier_in_menu ");
$(this).css("color","#888a85");j.model.aladinLite_V.cleanCatalog(n)
}});$("#vizier").on("click","#btn_delete_catalog_"+b,function(l){l.stopPropagation();
var k=this.parentNode.className;var m="VizieR:"+k;
AladinLiteX_mVc.deleteLastSelectedPositionByCatalog(k);
j.model.aladinLite_V.cleanCatalog(m);j.libraryMap.freeColor(k);
LibraryCatalog.delCatalog(m);this.parentNode.remove();
AladinLiteX_mVc.closeContext();return false});$("#vizier").on("click","#btn_flash_catalog_"+b,function(l){l.stopPropagation();
var k=$("#cata_operate_"+g).text();var m="VizieR:"+k;
LibraryCatalog.getCatalog(m).al_refs.makeFlash()})
},displaySimbadCatalog:function(){var b=this;var d="Simbad";
var e=$("#"+d);var a=this.libraryMap.colorMap[d].color;
if(LibraryCatalog.getCatalog(d)){a=LibraryCatalog.getCatalog(d).color
}var c="http://axel.u-strasbg.fr/HiPSCatService/Simbad";
if(e.attr("class")=="alix_simbad_in_menu  alix_datahelp"){WaitingPanel.show(d);
e.attr("class","alix_simbad_in_menu  alix_datahelp_selected");
e.css("color",a);$("#btn-Simbad-configure").css("color",a);
$("#btn-Simbad-flash").css("color",a);b.model.aladinLite_V.displayCatalog(d,a,VizierCatalogue.showSourceData,c)
}else{e.attr("class","alix_simbad_in_menu  alix_datahelp");
e.css("color","#888a85");$("#btn-Simbad-configure").css("color","#888a85");
$("#btn-Simbad-flash").css("color","#888a85");b.model.aladinLite_V.cleanCatalog(d);
if(LibraryCatalog.getCatalog(d)){LibraryCatalog.delCatalog(d)
}AladinLiteX_mVc.closeContext();$("#SearchType").css("display","none")
}},displayNedCatalog:function(d){var b=this;var c="NED";
var e=$("#"+c);var a=this.libraryMap.colorMap[c].color;
if(LibraryCatalog.getCatalog(c)){a=LibraryCatalog.getCatalog(c).color
}var f="showTable";if(e.attr("class")=="alix_ned_in_menu  alix_datahelp"){if(d.fov>=1&&d.masterResource.affichage.progressiveMode==false){WaitingPanel.warnFov()
}else{WaitingPanel.show(c);e.attr("class","alix_ned_in_menu  alix_datahelp_selected");
e.css("color",a);$("#btn-NED-configure").css("color",a);
$("#btn-NED-flash").css("color",a);b.model.aladinLite_V.displayCatalog(c,a,VizierCatalogue.showSourceData)
}}else{e.attr("class","alix_ned_in_menu  alix_datahelp");
e.css("color","#888a85");$("#btn-NED-configure").css("color","#888a85");
$("#btn-NED-flash").css("color","#888a85");b.model.aladinLite_V.cleanCatalog(c);
if(LibraryCatalog.getCatalog(c)){LibraryCatalog.delCatalog(c)
}AladinLiteX_mVc.closeContext()}},redrawCatalogSelector:function(g,a){var k=this;
var f="";$("#vizier_list").html(f);for(var e=0;e<g.catalogTab.length;
e++){var h=g.catalogTab[e].catalog;var c=g.catalogTab[e].obs_id;
if(c!=undefined){if(LibraryCatalog.getCatalog(h)){var d=LibraryCatalog.getCatalog(h).color;
var b=LibraryCatalog.getCatalog(h).id}else{var d=g.catalogTab[e].color
}$("#vizier_list").append('<li style="list-style-type: none;height:24px;" class="'+c+'"><div id="cata_operate_'+b+'" title="Show/hide Vizier sources" class="alix_vizier_chosen " style="display:inline; cursor: pointer;color:'+d+';" >'+c+'</div>&nbsp;<i id="btn_detail_catalog_'+b+'" title="detail" class="glyphicon glyphicon-info-sign alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;" onclick="AladinLiteX_mVc.detailCatalogOperator('+b+')"></i>&nbsp;<i id="btn_configure_catalog_'+b+'" title="configure" class="glyphicon glyphicon-cog alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;" onclick="AladinLiteX_mVc.configureCatalog('+b+')"></i><i id="btn_flash_catalog_'+b+'" title="flash" class="glyphicon glyphicon-flash alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;"></i>&nbsp;<i id="btn_delete_catalog_'+b+'" title="delete" class="glyphicon glyphicon-trash alix_btn-operate-catalog" style="color:'+d+';cursor: pointer;"></i></li>');
$("#cata_operate_"+b).unbind("click").click(function(m){m.stopPropagation();
var l=$(this).text();var n="VizieR:"+l;var j=LibraryCatalog.getCatalog(n).color;
var o=a[l];if($(this).attr("class")!="alix_vizier_chosen "){$(this).attr("class","alix_vizier_chosen ");
$(this).css("color",j);WaitingPanel.show(l);$("#itemList").css("display","none");
if(o.hips_service_url!=undefined){cataInit=k.model.aladinLite_V.displayVizierCatalog(l,j,"showTable",o.hips_service_url)
}else{cataInit=k.model.aladinLite_V.displayVizierCatalog(l,j,"showTable")
}}else{$(this).attr("class","alix_vizier_in_menu ");
$(this).css("color","#888a85");k.model.aladinLite_V.cleanCatalog(n)
}});$("#vizier").on("click","#btn_delete_catalog_"+b,function(l){l.stopPropagation();
var j=this.parentNode.className;var m="VizieR:"+j;
k.model.aladinLite_V.cleanCatalog(m);k.libraryMap.freeColor(j);
LibraryCatalog.delCatalog(m);this.parentNode.remove();
AladinLiteX_mVc.closeContext();return false});$("#vizier").on("click","#btn_flash_catalog_"+b,function(l){l.stopPropagation();
var j=this.parentNode.className;var m="VizieR:"+j;
LibraryCatalog.getCatalog(m).al_refs.makeFlash()})
}}},displayDataXml:function(f,e){var d=f.masterResource.affichage.label;
var b=this;var c="Swarm";var g=$("#XMM");var h="handler";
var a="#ff0000";if(LibraryCatalog.getCatalog(c)){a=LibraryCatalog.getCatalog(c).color
}if(g.html()!=d){WaitingPanel.show(c);g.attr("class","alix_XMM_in_menu  alix_datahelp_selected");
g.css("color",a);$("#btn-XMM-description").css("color",a);
$("#btn-XMM-flash").css("color",a);$("#btn-XMM-configure").css("color",a);
if(g.html()=="3XMM Catalogue"){$("#ACDS").css("display","inline")
}b.model.aladinLite_V.displayCatalog(c,"#ff0000",h,e)
}else{if(g.attr("class")=="alix_XMM_in_menu  alix_datahelp"){WaitingPanel.show(c);
g.attr("class","alix_XMM_in_menu  alix_datahelp_selected");
g.css("color",a);$("#btn-XMM-description").css("color",a);
$("#btn-XMM-flash").css("color",a);$("#btn-XMM-configure").css("color",a);
if(g.html()=="3XMM Catalogue"){$("#ACDS").css("display","inline")
}b.model.aladinLite_V.displayCatalog(c,"#ff0000",h,e)
}else{g.attr("class","alix_XMM_in_menu  alix_datahelp");
g.css("color","#888a85");$("#btn-XMM-flash").css("color","#888a85");
$("#btn-XMM-description").css("color","#888a85");
$("#btn-XMM-configure").css("color","#888a85");$("#ACDS").css("display","none");
b.model.aladinLite_V.cleanCatalog(c);b.model.aladinLite_V.cleanCatalog("Target");
if(LibraryCatalog.getCatalog(c)){LibraryCatalog.delCatalog(c)
}}}AladinLiteX_mVc.closeContext()},updateCatalogs:function(k,b,a){var n=this;
if($(document.getElementById("XMM")).attr("class")=="alix_XMM_in_menu  alix_datahelp_selected"){n.model.aladinLite_V.storeCurrentState();
if(a=="zoom"){if(k.fov>=1&&k.masterResource.filtered==false&&k.masterResource.affichage.progressiveMode==false){WaitingPanel.warnFov()
}else{n.model.aladinLite_V.cleanCatalog("Swarm");
WaitingPanel.show("Swarm");n.model.aladinLite_V.displayCatalog("Swarm","red","handler",b)
}}else{if(a=="position"){if(k.fov>=1&&k.masterResource.filtered==false&&k.masterResource.affichage.progressiveMode==false){WaitingPanel.warnFov()
}n.model.aladinLite_V.cleanCatalog("Swarm");WaitingPanel.show("Swarm");
n.model.aladinLite_V.displayCatalog("Swarm","red","handler",b)
}}}if($(document.getElementById("NED")).attr("class")=="alix_ned_in_menu  alix_datahelp_selected"){n.model.aladinLite_V.storeCurrentState();
var c="NED";var f=this.libraryMap.colorMap[c].color;
var l="showTable";n.model.aladinLite_V.cleanCatalog(c);
if(k.fov>=1&&k.masterResource.affichage.progressiveMode==false){WaitingPanel.warnFov()
}else{WaitingPanel.show(c);n.model.aladinLite_V.displayCatalog(c,f,l)
}}if($(document.getElementById("Simbad")).attr("class")=="alix_simbad_in_menu  alix_datahelp_selected"){n.model.aladinLite_V.storeCurrentState();
var b="http://axel.u-strasbg.fr/HiPSCatService/Simbad";
var c="Simbad";var f=this.libraryMap.colorMap[c].color;
var l="showTable";n.model.aladinLite_V.cleanCatalog(c);
WaitingPanel.show(c);n.model.aladinLite_V.displayCatalog(c,f,l,b);
SimbadCatalog.displayCatalogFiltered()}if(LibraryCatalog.catalogs!=null){n.model.aladinLite_V.storeCurrentState();
var m=null;if(a=="zoom"){for(var c in LibraryCatalog.catalogs){if(c.startsWith("VizieR:")){var h=null;
var j=LibraryCatalog.catalogs[c];var g=LibraryCatalog.catalogs[c].al_refs;
var d=j.id;var e=j.obs_id;if($(document.getElementById("cata_operate_"+d)).attr("class")=="alix_vizier_chosen "){if(j.url!=undefined){n.model.aladinLite_V.cleanCatalog(c);
h=n.model.aladinLite_V.displayVizierCatalog(e,j.color,"showTable",j.url)
}else{n.model.aladinLite_V.cleanCatalog(c);h=n.model.aladinLite_V.displayVizierCatalog(e,j.color,"showTable")
}}}}}else{if(a=="position"){for(var c in LibraryCatalog.catalogs){if(c.startsWith("VizieR:")){var h=null;
var j=LibraryCatalog.catalogs[c];var g=LibraryCatalog.catalogs[c].al_refs;
var d=j.id;var e=j.obs_id;var h=null;if($(document.getElementById("cata_operate_"+d)).attr("class")=="alix_vizier_chosen "){if(j.url==undefined){n.model.aladinLite_V.cleanCatalog(c);
h=n.model.aladinLite_V.displayVizierCatalog(e,j.color,"showTable")
}else{n.model.aladinLite_V.cleanCatalog(c);h=n.model.aladinLite_V.displayVizierCatalog(e,j.color,"showTable",j.url)
}}}}}}}}};console.log("=============== >  HipsSelector_v.js ");
var SwarmDynamicFilter=function(){var j=[];var b;
var a;var h;var c=function(k){if(!j[k.element]){j.length++
}j[k.element]=k;f()};var g=function(k){if(j!=null&&j[k]){delete j[k];
j.length--}f()};var f=function(k){h=k;b=LibraryCatalog.getCatalog("Swarm");
a=b.al_refs.getSources();if(j.length==0){e()}else{for(var l in j){e(j[l])
}}};var e=function(q){if(q!=undefined){var o=q.value;
var m=q.element;var k=q.comparator;var n=q.type;var p=[];
j[m]=q}for(var l=0;l<a.length;l++){source=a[l];if(n=="num"){if(k==">"){if(parseFloat(source.data[m])>parseFloat(o)){source.show();
p.push(source)}else{source.hide()}}else{if(k=="="){if(parseFloat(source.data[m])>=parseFloat(o)&&parseFloat(source.data[m])<(parseFloat(o)+1)){source.show();
p.push(source)}else{source.hide()}}else{if(k=="<"){if(parseFloat(source.data[m])<parseFloat(o)){source.show();
p.push(source)}else{source.hide()}}}}}else{if(n=="boolean"){if(source.data[m]==o){source.show();
p.push(source)}else{source.hide()}}else{if(n=="String"){if(k=="LIKE"){if(source.data[m].startsWith(o)){source.show();
p.push(source)}else{source.hide()}}else{if(k=="NOT LIKE"){if(source.data[m].startsWith(o)){source.hide()
}else{source.show();p.push(source)}}else{if(k=="IS NULL"){if(source.data[m]==null){source.show();
p.push(source)}else{source.hide()}}else{if(k=="IS NOT NULL"){if(source.data[m]==null){source.hide()
}else{source.show();p.push(source)}}else{if(k=="CONTAINS"){if(source.data[m].indexOf(o)!=-1){source.show();
p.push(source)}else{source.hide()}}}}}}}else{if(q==undefined){source.show()
}}}}}a=p};var d={runConstraint:f,addConstraint:c,delConstraint:g,displayCatalogFiltered:e};
return d}();console.log("=============== >  SwarmDynamicFilter.js ");
var localConf={parentDivId:"aladin-lite-div",defaultView:{defaultSurvey:"DSS colored",field:{position:"M33",defaultFov:"0.5"},panelState:true},controllers:{historic:{},regionEditor:{},hipsSelector:{}}};
var externalConf;var mixConf=function(c,b){for(var a in b){if(typeof(b[a])=="object"&&c[a]){b[a]=mixConf(c[a],b[a])
}}return Object.assign(c,b)};var configureALIX=function(a){if(a){externalConf=a;
localConf=mixConf(localConf,a)}AladinLiteX_mVc.init(localConf)
};console.log("=============== >  ConfigureALiX.js ");
var VizierCatalogue=function(){var a=function(k){var n=event||window.event;
var h=$("#aladin-lite-div").width();var j=$("#aladin-lite-div").height();
var r=n.clientX;var q=n.clientY;var l=(k.ra)?Numbers.toSexagesimal(k.ra/15,8,false):" ";
var g=(k.dec)?"+"+Numbers.toSexagesimal(k.dec,7,false):"";
var o=$("#SourceDiv");if(o.css("display")=="none"){o.css("display","block");
o.css("position","center");if(r+300>h){o.css("left",h-400)
}else{o.css("left",r)}if(q+300>j){o.css("top",j-400)
}else{o.css("top",q)}}var f=(k.data)?k.catalog.name:"Alix Master Catalogue";
var t="";if(k.data){if(k.data.CatalogName){f=k.data.CatalogName
}if(k.data.name){t="<span class=strong style='font-size: 15px;'><center><strong>"+k.data.name+"</center></strong></span>"
}}o.html("<span class=strong style='font-size: 15px;'><center><strong>"+f+'</center></strong></span>\n<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="glyphicon_SourceClose glyphicon-remove"></span></a>'+t+"<span class=strong style='font-size: 15px;'><center><strong>    "+l+" "+g+"</center></strong></span><br>");
var m="<thead>";if(k.data!=undefined){for(var s in k.data){if(k.data[s]){m+='<tr><th style="text-align:right">'+s+":</th><td>  "+k.data[s]+"</td></tr>"
}}}else{for(s in k){if(k[s]){m+='<tr><th style="text-align:right">'+s+':&nbsp;</th><td style="text-align:justify">'+k[s]+"</td></tr>"
}}}m+="<thead>";o.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">'+m+"</table></div>");
if(k.ra&&f=="Simbad"){var p=l+" "+g;SimbadCatalog.simbad(p,k)
}};var c=function(j){var m=event||window.event;var g=$("#aladin-lite-div").width();
var h=$("#aladin-lite-div").height();var p=m.clientX;
var o=m.clientY;var k=Numbers.toSexagesimal(j.ra/15,8,false);
var f=Numbers.toSexagesimal(j.dec,7,false);var n=$("#SourceDiv");
if(n.css("display")=="none"){n.css("display","block");
n.css("position","center");if(p+300>g){n.css("left",g-400)
}else{n.css("left",p)}if(o+300>h){n.css("top",h-400)
}else{n.css("top",o)}}n.html('<span class=strong style=\'font-size: 18px;\'><center><strong>XMM</center></strong></span>\n<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="glyphicon_SourceClose glyphicon-remove"></span></a><span class=strong style=\'font-size: 15px;\'><center><strong>    '+k+" +"+f+"</center></strong></span><br>");
var l="<thead>";for(key in j){if(j[key]){l+='<tr><th style="text-align:right">'+key+":</th><td>  "+j[key]+"</td></tr>"
}}l+="<thead>";n.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">'+l+"</table></div>")
};var b=function(){var e=false;var g,f;$("#SourceDiv").mousedown(function(h){e=true;
g=h.pageX-$("#SourceDiv").position().left;f=h.pageY-$("#SourceDiv").position().top
});$("#SourceDiv").mousemove(function(j){if(e){var h=j.pageX-g;
var k=j.pageY-f;$("#SourceDiv").css("left",h);$("#SourceDiv").css("top",k)
}}).mouseup(function(){e=false}).mouseleave(function(){e=false
})};var d={showSourceData:a,SourceDataMove:b,showXMMSourceData:c};
return d}();console.log("=============== >  VizierCatalog.js ");
var MessageBox=function(){var c=function(g){var h="";
h+='<div id="alert_box" style="display:block"><br><span class=strong style="font-size: 15px;"><center><strong>'+g+'</center></strong></span><br><center><input type="button" value="OK" class="aladin-btn aladin-btn-small aladin-reverseCm" onclick="MessageBox.closeAlertBox()"></center></div>';
$("#aladin-lite-div").append(h)};var b=function(j,h){var g="";
g+='<div id="input_box" style="display:block"><br><span class=strong style="font-size: 15px;"><center><strong>'+j+'</center></strong></span><br><center><input type="text" id="target_note" onfocus="this.select()"></center><br><input type="button" value="Cancel" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;right:90px;font-weight:900" onclick="MessageBox.closeInputBox()"><input type="button" value="Commit" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;left:90px;font-weight:900" onclick="MessageBox.returnInputMessage()"></div>';
$("#aladin-lite-div").append(g)};var a=function(){if($("#alert_box").css("display")=="block"){$("#alert_box").css("display","none")
}$("#alert_box").remove()};var f=function(){if($("#input_box").css("display")=="block"){$("#input_box").css("display","none")
}$("#input_box").remove()};var e=function(){if($("#input_box").css("display")=="block"){$("#input_box").css("display","none")
}var h=$("#target_note").val();$("#input_box").remove();
var g=$("#aladin-lite-div-select").children("option:selected").attr("id");
if(h==""){$("#aladin-lite-div-select").children("option:selected").html(g+" [null] ")
}else{$("#aladin-lite-div-select").children("option:selected").html(g+" ["+h+"] ")
}};var d={alertBox:c,inputBox:b,closeAlertBox:a,closeInputBox:f,returnInputMessage:e};
return d}();console.log("=============== >  MessageBox.js ");
var SimbadCatalog=function(){var a;var h="";var o=null;
var m="all";var l;var k=true;var n=function(t){Alix_Processing.show("Waiting on Simbad Response");
var u=(t.ra)?Numbers.toSexagesimal(t.ra/15,8,false):" ";
var s=(t.dec)?"+"+Numbers.toSexagesimal(t.dec,7,false):"";
var v=u+" "+s;var r='<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
if(t.data!=undefined){for(var q in t.data){r+='<tr><th style="text-align:right">'+q+':&nbsp;</th><td style="text-align:justify">'+t.data[q]+"</td></tr>"
}}else{for(q in t){if(t[q]){r+='<tr><th style="text-align:right">'+q+':&nbsp;</th><td style="text-align:justify">'+t[q]+"</td></tr>"
}}}r+="</table></div></div>";var p="http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
p+=encodeURIComponent('format object "%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)"\n'+v+" radius=1m","ISO-8859-1");
$.ajax({url:p,method:"GET",async:true,dataType:"text",success:function(V){Alix_Processing.hide();
var I;var F=false;var S={};var P=[];var G=[];var B={};
B.sTitle="ID";G.push(B);var z={};z.sTitle="Position";
G.push(z);var w={};w.sTitle="Type";G.push(w);S.aoColumns=G;
var T=0;var y=V.split("\n");var Q=0;while((I=y[Q])!=undefined){if(F){var N=I.trim().split("|",-1);
let v=N.length-1;if(v>=3){var D=N[v];v--;var K=N[v];
v--;var O=N[v];var L=N[0].split(/\s{2,}/)[0].trim();
var J=[];J.push(L.trim());J.push(O+" "+K);J.push(D.trim());
P.push(J);T++}}else{if(I.startsWith("::data")){F=true
}}Q++}S.aaData=P;S.iTotalRecords=T;S.iTotalDisplayRecords=T;
if(Alix_Processing.jsonError(S,"Simbad Tooltip Failure")){return
}else{var R="";R+='<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
var U=Alix_Modalinfo.nextId();Alix_Modalinfo.setModal(U,false,"Simbad Summary for Position "+v+'<a class=simbad target=blank href="http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord='+encodeURIComponent(v)+'"></a>',R);
Alix_Modalinfo.setShadow(U);Alix_Modalinfo.whenClosed(U);
$("#"+U).css("overflow","hidden");var C={aoColumns:S.aoColumns,aaData:S.aaData,bPaginate:true,sPaginationType:"full_numbers",aaSorting:[],bSort:false,bFilter:true,bAutoWidth:true,bDestroy:true};
var X;var W=[{name:X,pos:"top-left"},{name:"filter",pos:"top-right"},{name:"information",pos:"bottom-left"},{name:"pagination",pos:"bottom-center"},{name:" ",pos:"bottom-right"}];
Alix_CustomDataTable.create("simbadtable",C,W);$("#simbadtable_paginate").css("left","250px");
$(".txt-left").remove();$("#"+U).find(".dataTables_filter").css("margin-top","34%");
$("#"+U).find(".dataTables_filter").css("position","absolute");
$("#"+U).find(".dataTables_filter").css("left","1000px");
$("#"+U).find(".dataTables_filter").css("top","-394px");
$("#"+U).find(".dataTables_filter").css("z-index","1");
var M=$("#"+U).find(".dataTables_filter");M.css("top","-275px");
M.css("left","767px");$("#"+U).dialog("option","position",{my:"center",at:"center",of:window});
var H=$("#"+U).parent("div");H.append(r);H.append(M);
H.css("width","950px");H.css("height","400px");$("#"+U).css("width","650px");
$("#"+U).css("left","298px");$("#"+U).css("height","auto");
$("#"+U).css("top","15px");$("#"+U).css("min-height","93.16px");
var E=$("#SimbadSourceDiv");E.css("display","block");
E.css("position","absolute");E.css("top","70px");
E.css("left","0px");E.css("background-color","#ffeded");
$("#simbadtable_next").html("&nbsp;&nbsp;&nbsp;");
$("#simbadtable_previous").html("&nbsp;&nbsp;&nbsp;")
}}});Alix_Processing.hide()};var j=function(){if(k){k=false;
var p=["(Micro)Lensing Event [Lev]","Absorption Line system [ALS]","Active Galaxy Nucleus [AGN]","Association of Stars [As*]","Asymptotic Giant Branch Star (He-burning) [AB*]","Asymptotic Giant Branch Star candidate [AB?]","BL Lac - type object [BLL]","Be Star [Be*]","Black Hole Candidate [BH?]","Blazar [Bla]","Blue Straggler Star [BS*]","Blue compact Galaxy [bCG]","Blue object [blu]","Blue supergiant star [s*b]","Bright Nebula [BNe]","Brightest galaxy in a Cluster (BCG) [BiC]","Broad Absorption Line system [BAL]","Brown Dwarf (M<0.08solMass) [BD*]","Brown Dwarf Candidate [BD?]","Bubble [bub]","CV DQ Her type (intermediate polar) [DQ*]","CV of AM Her type (polar) [AM*]","Candidate blue Straggler Star [BS?]","Candidate objects [..?]","Carbon Star [C*]","Cataclysmic Binary Candidate [CV?]","Cataclysmic Variable Star [CV*]","Cepheid variable Star [Ce*]","Classical Cepheid (delta Cep type) [cC*]","Cloud [Cld]","Cluster of Galaxies [ClG]","Cluster of Stars [Cl*]","Cometary Globule [CGb]","Compact Group of Galaxies [CGG]","Composite object [mul]","Confirmed Neutron Star [N*]","Damped Ly-alpha Absorption Line system [DLA]","Dark Cloud (nebula) [DNe]","Dense core [cor]","Double or multiple star [**]","Dwarf Nova [DN*]","Eclipsing Binary Candidate [EB?]","Eclipsing binary of Algol type (detached) [Al*]","Eclipsing binary of W UMa type (contact binary) [WU*]","Eclipsing binary of beta Lyr type (semi-detached)[bL*]","Eclipsing binary [EB*]","Ellipsoidal variable Star [El*]","Emission Object [EmO]","Emission-line Star [Em*]","Emission-line galaxy [EmG]","Eruptive variable Star [Er*]","Evolved supergiant star [sg*]","Extra-solar Confirmed Planet [Pl]","Extra-solar Planet Candidate [Pl?]","Extremely Red Object [ERO]","Far-IR source (lambda >= 30 {mu}m) [FIR]","Flare Star [Fl*]","Galactic Nebula [GNe]","Galaxy in Cluster of Galaxies [GiC]","Galaxy in Group of Galaxies [GiG]","Galaxy in Pair of Galaxies [GiP]","Galaxy with high redshift [HzG]","Galaxy [G]","Globular Cluster [GlC]","Globule (low-mass dark cloud) [glb]","Gravitational Lens System (lens+images) [gLS]","Gravitational Lens [gLe]","Gravitational Source [grv]","Gravitational Wave Event [GWE]","Gravitationally Lensed Image of a Galaxy [LeG]","Gravitationally Lensed Image of a Quasar [LeQ]","Gravitationally Lensed Image [LeI]","Group of Galaxies [GrG]","HI (21cm) source [HI]","HI shell [sh]","HII (ionized) region [HII]","HII Galaxy [H2G]","Herbig Ae/Be star [Ae*]","Herbig-Haro Object [HH]","High Mass X-ray Binary [HXB]","High proper-motion Star [PM*]","High-Mass X-ray binary Candidate [HX?]","High-velocity Cloud [HVC]","High-velocity Star [HV*]","Horizontal Branch Star [HB*]","Hot subdwarf candidate [HS?]","Hot subdwarf [HS*]","Infra-Red source [IR]","Interacting Galaxies [IG]","Interstellar matter [ISM]","LINER-type Active Galaxy Nucleus [LIN]","Long Period Variable candidate [LP?]","Long-period variable star [LP*]","Low Mass X-ray Binary [LXB]","Low Surface Brightness Galaxy [LSB]","Low-Mass X-ray binary Candidate [LX?]","Low-mass star (M<1solMass) [LM*]","Low-mass star candidate [LM?]","Ly alpha Absorption Line system [LyA]","Lyman limit system [LLS]","Maser [Mas]","Mira candidate [Mi?]","Molecular Cloud [MoC]","Moving Group [MGr]","Near-IR source (lambda < 10 {mu}m) [NIR]","Neutron Star Candidate [N*?]","Not an object (error, artefact, ...) [err]","Nova Candidate [No?]","Nova [No*]","Nova-like Star [NL*]","OH/IR star [OH*]","Object of unknown nature [?]","Open (galactic) Cluster [OpC]","Optically Violently Variable object [OVV]","Outflow candidate [of?]","Outflow [out]","Pair of Galaxies [PaG]","Part of Cloud [PoC]","Part of a Galaxy [PoG]","Peculiar Star [Pe*]","Physical Binary Candidate [**?]","Planetary Nebula [PN]","Possible (open) star cluster [C?*]","Possible Active Galaxy Nucleus [AG?]","Possible BL Lac [BL?]","Possible Be Star [Be?]","Possible Blazar [Bz?]","Possible Blue supergiant star [s?b]","Possible Carbon Star [C*?]","Possible Cepheid [Ce?]","Possible Cluster of Galaxies [C?G]","Possible Galaxy [G?]","Possible Globular Cluster [Gl?]","Possible Group of Galaxies [Gr?]","Possible Herbig Ae/Be Star [Ae?]","Possible Horizontal Branch Star [HB?]","Possible Peculiar Star [Pec?]","Possible Planetary Nebula [PN?]","Possible Quasar [Q?]","Possible Red Giant Branch star [RB?]","Possible Red supergiant star [s?r]","Possible S Star [S*?]","Possible Star of RR Lyr type [RR?]","Possible Star with envelope of CH type [CH?]","Possible Star with envelope of OH/IR type [OH?]","Possible Supercluster of Galaxies [SC?]","Possible Supergiant star [sg?]","Possible Wolf-Rayet Star [WR?]","Possible Yellow supergiant star [s?y]","Possible gravitational lens System [LS?]","Possible gravitational lens [Le?]","Possible gravitationally lensed image [LI?]","Post-AGB Star (proto-PN) [pA*]","Post-AGB Star Candidate [pA?]","Pre-main sequence Star Candidate [pr?]","Pre-main sequence Star [pr*]","Pulsar [Psr]","Pulsating White Dwarf [ZZ*]","Pulsating variable Star [Pu*]","Quasar [QSO]","Radio Galaxy [rG]","Radio-source [Rad]","Red Giant Branch star [RG*]","Red supergiant star [s*r]","Reflection Nebula [RNe]","Region defined in the sky [reg]","Rotationally variable Star [Ro*]","S Star [S*]","Semi-regular pulsating Star [sr*]","Semi-regular variable candidate [sv?]","Seyfert 1 Galaxy [Sy1]","Seyfert 2 Galaxy [Sy2]","Seyfert Galaxy [SyG]","Spectroscopic binary [SB*]","Star forming region [SFR]","Star in Association [*iA]","Star in Cluster [*iC]","Star in Nebula [*iN]","Star in double system [*i*]","Star showing eclipses by its planet [EP*]","Star suspected of Variability [V*?]","Star with envelope of CH type [CH*]","Star [*]","Starburst Galaxy [SBG]","Stellar Stream [St*]","Sub-stellar object [su*]","SuperNova Candidate [SN?]","SuperNova Remnant Candidate [SR?]","SuperNova Remnant [SNR]","SuperNova [SN*]","Supercluster of Galaxies [SCG]","Symbiotic Star Candidate [Sy?]","Symbiotic Star [Sy*]","T Tau star Candidate [TT?]","T Tau-type Star [TT*]","UV-emission source [UV]","Ultra-luminous X-ray candidate [UX?]","Ultra-luminous X-ray source [ULX]","Underdense region of the Universe [vid]","Variable Star of FU Ori type [FU*]","Variable Star of Mira Cet type [Mi*]","Variable Star of Orion Type [Or*]","Variable Star of R CrB type candiate [RC?]","Variable Star of R CrB type [RC*]","Variable Star of RR Lyr type [RR*]","Variable Star of RV Tau type [RV*]","Variable Star of SX Phe type (subdwarf) [SX*]","Variable Star of W Vir type [WV*]","Variable Star of alpha2 CVn type [a2*]","Variable Star of beta Cep type [bC*]","Variable Star of delta Sct type [dS*]","Variable Star of gamma Dor type [gD*]","Variable Star of irregular type [Ir*]","Variable Star with rapid variations [RI*]","Variable Star [V*]","Variable of BY Dra type [BY*]","Variable of RS CVn type [RS*]","Very red source [red]","White Dwarf Candidate [WD?]","White Dwarf [WD*]","Wolf-Rayet Star [WR*]","X-ray Binary [XB*]","X-ray binary Candidate [XB?]","X-ray source [X]","Yellow supergiant star [s*y]","Young Stellar Object Candidate [Y*?]","Young Stellar Object [Y*O]","centimetric Radio-source [cm]","gamma-ray Burst [gB]","gamma-ray source [gam]","metallic Absorption Line system [mAL]","metric Radio-source [mR]","millimetric Radio-source [mm]","radio Burst [rB]","sub-millimetric source [smm]","transient event [ev]"];
$("[id^=ui-id-]").css("z-index","1000000");$("#SearchType").autocomplete({source:p,select:function(r,q){$(this).val(q.item.value);
l=$("#SearchType").val();if(p.indexOf(l)==-1&&l!=""){MessageBox.alertBox("This type doesn't exist");
return}var u=/\[(.+?)\]/g;var t=$("#SearchType").val().match(u);
if(t!=undefined){var s=t[0].substring(1,t[0].length-1);
h=s;d()}else{h="";$("#SearchTypeNot").text("all");
m="all";$(this).css("display","none");d()}}}).css("z-index",10000);
$("#SearchType").keyup(function(u){var s=u.which;
$("[id^=ui-id-]").css("z-index","1000000");if(s==13){l=$("#SearchType").val();
if(p.indexOf(l)==-1&&l!=""){MessageBox.alertBox("This type doesn't exist");
return}var t=/\[(.+?)\]/g;var r=$("#SearchType").val().match(t);
if(r!=undefined){var q=r[0].substring(1,r[0].length-1);
h=q;d()}else{h="";$("#SearchTypeNot").text("all");
m="all";$(this).css("display","none");d()}}});$("#SearchTypeNot").click(function(){var q=$(this).text();
if(q=="all"){$(this).text("only");$(this).attr("title","Only display sources matching the type (click to change)");
m="only";d();$("#SearchType").css("display","inline")
}else{if(q=="only"){$(this).text("not");$(this).attr("title","Only display sources not matching the type (click to change)");
m="not";$("#SearchType").css("display","inline");
d()}else{$(this).text("all");$(this).attr("title","Display all sources (click to change)");
m="all";$("#SearchType").css("display","none");d()
}}})}};var b=function(p){o=p};var e=function(q){var p=(q.data.other_types.indexOf(h)!=-1||q.data.main_type.startsWith(h));
if(m=="all"){return true}else{if((m=="not"&&!p)||(m=="only"&&p)){return true
}else{return false}}};var d=function(){a=o.getSources();
for(var p=0;p<a.length;p++){let source=a[p];if(e(source)){source.show()
}else{source.hide()}}return};function f(q){var p;
p=$.ajax({url:"${site}",type:"GET",data:{query:"${adql}",format:"text",lang:"ADQL",request:"doQuery"},async:false}).done(function(r){return r
});return p}var g=function(){var q='SELECT  distinct "public".otypedef.otype_longname, "public".otypedef.otype_shortname FROM "public".otypedef order by otype_longname';
var r=f(q);var u=r.responseText;var t=u.split("|");
var y=[];for(let i=2;i<t.length;i++){var v=t[i].split("\n");
for(var p=0;p<v.length;p++){y.push(v[p])}}var w={};
for(let i=0;i<y.length;i++){y[i]=y[i+1]}for(var s=0;
s<y.length-2;s=s+2){w[y[s]]=y[s+1]}};var c={simbad:n,setCatalog:b,displayCatalogFiltered:d,getTable:g,sourceFilter:e,activateControle:j};
return c}();console.log("=============== >  SimbadCatalog.js ");
let Alix_CustomDataTable=function(){var g=0;var f=[];
var c=function(l,j,h){if(j.sPaginationType!=undefined){if(j.sPaginationType==="full_numbers"){j=a(j,"oLanguage",{sSearch:""})
}}else{j=a(j,"oLanguage",{sSearch:"",oPaginate:{sNext:"",sPrevious:""}})
}if(h!=undefined){j=a(j,"sDom",e(h))}var k=$("#"+l).dataTable(j);
if(h!=undefined){f.forEach(function(m){$("div.custom"+m.pos).html(m.content)
});Alix_ModalResult.changeFilter(l)}$("#"+l+"_wrapper").css("overflow","inherit");
return k};var a=function(h,k,j){h[k]=j;return h};
var e=function(q){var p="";var r=[];var m=[];var l=[];
var k=[];var h=[];var o=[];q.forEach(function(s){switch(s.pos){case"top-left":r.push(d(s.name));
break;case"top-center":m.push(d(s.name));break;case"top-right":l.push(d(s.name));
break;case"bottom-left":k.push(d(s.name));break;case"bottom-center":h.push(d(s.name));
break;case"bottom-right":o.push(d(s.name));break}});
var n=0;if(r.length>0){n++}if(m.length>0){n++}if(l.length>0){n++
}n=Math.floor(12/n);var j=0;if(k.length>0){j++}if(h.length>0){j++
}if(o.length>0){j++}j=Math.floor(12/j);if(n>0){p+='<"row"'
}if(r.length>0){p+='<"txt-left col-xs-'+n+'"';r.forEach(function(s){p+='<"side-div"'+s+">"
});p+=">"}if(m.length>0){p+='<"txt-center col-xs-'+n+'"';
m.forEach(function(s){p+='<"side-div"'+s+">"});p+=">"
}if(l.length>0){p+='<"txt-right col-xs-'+n+'"';l.forEach(function(s){p+='<"side-div"'+s+">"
});p+=">"}if(n>0){p+=">"}p+='<"custom-dt" rt>';if(j>0){p+='<"row"'
}if(k.length>0){p+='<"txt-left col-xs-'+j+'"';k.forEach(function(s){p+='<"side-div"'+s+">"
});p+=">"}if(h.length>0){p+='<"txt-center col-xs-'+j+'"';
h.forEach(function(s){p+='<"side-div"'+s+">"});p+=">"
}if(o.length>0){p+='<"txt-right col-xs-'+j+'"';o.forEach(function(s){p+='<"side-div"'+s+">"
});p+=">"}if(j>0){p+=">"}return p};var d=function(h){var j;
switch(h){case"filter":j="f";break;case"pagination":j="p";
break;case"information":j="i";break;case"length":j="l";
break;case"processing":j="r";break;default:j='<"custom'+g+'">';
f.push({content:h,pos:g});g++;break}return j};var b={};
b.create=c;return b}();console.log("=============== >  Alix_CustomDataTable.js ");
let Alix_ModalResult=function(){var s="modalresult";
var d="."+s;var l=new Array();var c={};var e=0;var g=function(v){var w="";
if(v.title!=undefined){if(v.icon!=undefined){w+='<div class="col-xs-11">'+v.title.label+'</div><div class="col-xs-1"><a onclick="'+v.icon.handler+'" class='+v.icon.classIcon+"></a></div>"
}else{w+='<div class="col-xs-12">'+v.title.label+"</div>"
}}else{if(v.icon!=undefined){w+='<div class="col-xs-11">Details</div><div class="col-xs-1"><a onclick="'+v.icon.handler+'" class='+v.icon.classIcon+"></a></div>"
}else{w+='<div class="col-xs-12">Details</div>'}}return w
};var j=function(v){$("#"+v).prev("div").find("span.ui-dialog-title").prepend('<a id="qhistoleft" href="javascript:void(0);" onclick="Alix_ModalResult.prevHisto()" class=greyhistoleft></a><span class="nbpages"></span><a id="qhistoright" href="javascript:void(0);" onclick="Alix_ModalResult.nextHisto()" class=greyhistoright></a>')
};var a=function(v,y){for(i=0;i<y.chapters.length;
i++){$(v).append('<p class="chapter" id="'+y.chapters[i].id+'"><img src="images/tright.png">'+y.chapters[i].label+'</p><div class="detaildata"></div>');
var w=y.chapters[i];$("#"+y.chapters[i].id).click({content_click:w},function(z){n(z.data.content_click)
})}};function f(w){var v=$("#"+w+"").find("img").attr("src");
if(v=="images/tdown.png"){$("#"+w+"").find("img").attr("src","images/tright.png")
}else{if(v=="images/tright.png"){$("#"+w+"").find("img").attr("src","images/tdown.png")
}}}var n=function(v){var w=$("#"+v.id).next(".detaildata");
if(w.length==0){Alix_Out.info("Can't open chapter "+v);
return}if(w.html().length>0){w.slideToggle(500);f(v.id)
}else{if(v.url!=null){Alix_Processing.show("Fetching data");
$.getJSON(v.url,v.params,function(y){Alix_Processing.hide();
if(Alix_Processing.jsonError(y,v.url)){return}else{p(v.id,y,v.searchable);
f(v.id);Alix_Modalinfo.center()}})}else{if(v.data!=undefined&&v.data!=null){p(v.id,v.data,v.searchable);
f(v.id);Alix_ModalResult.center()}}}};var p=function(D,E,w){if(E.length!=undefined){var v=($("#"+D).next(".detaildata"));
var z=(w)?'<"top"f>rt':"rt";for(var C=0;C<E.length;
C++){var y="detail"+C+D+"table";v.append("<table id="+y+'  width=100% cellpadding="0" cellspacing="0" border="0"  class="display"></table>');
var F={aoColumns:E[C].aoColumns,aaData:E[C].aaData,sDom:z,bPaginate:false,aaSorting:[],bSort:false,bFilter:w};
var B=[{name:"filter",pos:"top-left"}];Alix_CustomDataTable.create(y,F,B);
if(E[C].label!=undefined){($("#"+D).next(".detaildata")).append(E[C].label)
}}v.slideToggle(0)}else{var y="detail"+D+"table";
var v=$("#"+D).next(".detaildata");var z=(w)?'<"top"f>rt':"rt";
v.html("<table id="+y+'  width=100% cellpadding="0" cellspacing="0" border="0"  class="display"></table>');
var F={aoColumns:E.aoColumns,aaData:E.aaData,sDom:z,bPaginate:false,aaSorting:[],bSort:false,bFilter:w};
var B=[{name:"filter",pos:"top-left"}];Alix_CustomDataTable.create(y,F,B);
if(E.label!=undefined){($("#"+D).next(".detaildata")).append(E.label)
}v.slideToggle(0)}};var t=function(w){var v=$('input[aria-controls="'+w+'"]').parent("label");
v.each(function(){$(this).prepend('<div class="form-group no-mg-btm">');
$(this).find(".form-group").append('<div class="input-group">');
$(this).find(".input-group").append('<div class="input-group-addon input-sm"><span class="glyphicon glyphicon-search"></span></div>');
$(this).find("input").appendTo($(this).find(".input-group"));
$(this).find("input").addClass("form-control filter-result input-sm");
$(this).find("input").attr("placeholder","Search")
})};var b=function(w,v){var z=false;var y;if(l.length==0){l.push({place:e,id:v,content:w});
c={place:e,id:v,content:w};e++}else{if(l[l.length-1].id!=v){l.push({place:e,id:v,content:w});
c={place:e,id:v,content:w};e++}}};var m=function(){if(c.place<=0){c=l[l.length-1];
r(c.content,null,"white")}else{var v=c.place-1;c=l[v];
r(c.content,null,"white")}h();return};var o=function(){if(c.place>=(l.length-1)){c=l[0];
r(c.content,null,"white")}else{var v=c.place+1;c=l[v];
r(c.content,null,"white")}h();return};var h=function(){var w=c.place+1;
var v=w+"/"+l.length;$("#qhistoleft").next("span").html(v)
};var r=function(B,z,w,C){if($(d).length!=0){$(d).html("");
if(w!=null){$("#"+v).css("background-color",w)}var y=(z==null)?function(D,E){$(d).html("")
}:z;$(d).on("dialogclose",function(D,E){if(D.originalEvent){y()
}});$('div[pos="'+$(d).attr("id")+'"]').on("click",y);
$(d).append('<h4><div id="detailhisto" class="row">'+g(B.header)+"</div></h4>");
a(d,B);if(C){b(B,B.chapters[0].params.oid)}if(B.header.histo!=undefined){j(v,B.header.histo.prev,B.header.histo.next);
h()}B.chapters.forEach(function(D){t(D.id)});jQuery(".detaildata").each(function(D){$(this).hide()
})}else{var v=Alix_Modalinfo.nextId();$(document.documentElement).append('<div id="'+v+'" class="'+s+'" style="display: none; width: auto; hight: auto;"></div>');
var y=(z==null)?function(D,E){$("#"+v).html("")}:z;
if(w!=null){$("#"+v).css("background-color",w)}$("#"+v).append('<h4><div id="detailhisto" class="row">'+g(B.header)+"</div></h4>");
a("#"+v,B);$("#"+v).dialog({width:"auto",dialogClass:"d-maxsize",resizable:false,closeOnEscape:true,close:function(D,E){if(D.originalEvent){y();
Alix_Modalinfo.close(Alix_Modalinfo.findLastModal())
}},width:"auto",maxWidth:1000,fluid:true,open:function(D,E){b(B,B.chapters[0].params.oid);
Alix_Modalinfo.fluidDialog()}});jQuery(".detaildata").each(function(D){$(this).hide()
});if(B.header.histo!=undefined){j(v,B.header.histo.prev,B.header.histo.next);
h()}B.chapters.forEach(function(D){t(D.id)});if($("#"+v).find("h4").find("#detailhisto").length){if($(window).width()>=1000){$("#"+v).dialog("option","width",1000);
q()}else{Alix_Modalinfo.fluidDialog()}}$('div[pos="'+$(d).attr("id")+'"]').on("click",y);
Alix_Modalinfo.setShadow(v);Alix_Modalinfo.whenClosed(v)
}};var u=function(){return $(d).html()};var q=function(){var v=$(d).parent();
v.css("position","absolute");v.css("top",Math.max(0,(($(window).height()-v.outerHeight())/3)+$(window).scrollTop())+"px");
v.css("left",Math.max(0,(($(window).width()-v.outerWidth())/2)+$(window).scrollLeft())+"px")
};var k={};k.prevHisto=m;k.nextHisto=o;k.changeFilter=t;
k.resultPanel=r;k.getHtml=u;k.center=q;k.openChapterPanel=n;
return k}();console.log("=============== >  Alix_ModalResult.js ");
var TapCatalog=function(){var b=function(c){var k=c.url_base+"sync?RUNID={$RUNID}&REQUEST=doQuery&format={$format}&lang=ADQL&query={$query}";
var g=c.url_query.indexOf("CIRCLE");c.url_query=c.url_query.slice(0,g);
c.url_query=c.url_query+" CIRCLE('ICRS', {$ra}, {$dec}, {$fov})) = 1";
var f=c.url_query.match(/[(]/g).length;var l=c.url_query.match(/[)]/g).length;
if(f!=l){c.url_query=c.url_query+")"}var e=c.url_query;
var d=c.RUNID;var j=c.format;var h=c.label;masterResource={affichage:{location:{url_base:k,url_query:e},progressiveMode:false,RUNID:d,radiusUnit:"deg",format:j,label:h,description:"Texte plus complet qui donne plus d'informations",display:true},actions:{showAssociated:{active:false,handlerFadeOut:true,handlerDeleteSource:true},showPanel:{active:true},externalProcessing:{label:"Show details",description:"The function is called when we click a source. We can import other scripts to show more details about the source selected",handlerSelect:function(m,n){VizierCatalogue.showSourceData(m)
},handlerDeselect:function(){},handlerInitial:function(){}}}};
AladinLiteX_mVc.changeMasterResource(masterResource)
};var a={setTapTableAsMaster:b};return a}();console.log("=============== >  TapCatalog.js ");