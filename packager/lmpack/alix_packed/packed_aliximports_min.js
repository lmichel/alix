(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports=="object"&&typeof module=="object"){module.exports=a(require("jquery"))
}else{a(jQuery)}}})(function(e,g){var m={beforeShow:b,move:b,change:b,show:b,hide:b,color:false,flat:false,showInput:false,allowEmpty:false,showButtons:true,clickoutFiresChange:true,showInitial:false,showPalette:false,showPaletteOnly:false,hideAfterPaletteSelect:false,togglePaletteOnly:false,showSelectionPalette:true,localStorageKey:false,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",togglePaletteMoreText:"more",togglePaletteLessText:"less",clearText:"Clear Color Selection",noColorSelectedText:"No Color Selected",preferredFormat:false,className:"",containerClassName:"",replacerClassName:"",showAlpha:false,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:false,offset:null},d=[],h=!!/msie/i.exec(window.navigator.userAgent),l=(function(){function u(y,x){return !!~(""+y).indexOf(x)
}var w=document.createElement("div");var v=w.style;
v.cssText="background-color:rgba(0,0,0,.5)";return u(v.backgroundColor,"rgba")||u(v.backgroundColor,"hsla")
})(),q=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),p=(function(){var u="";
if(h){for(var v=1;v<=6;v++){u+="<div class='sp-"+v+"'></div>"
}}return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","<div class='sp-palette-button-container sp-cf'>","<button type='button' class='sp-palette-toggle'></button>","</div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",u,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button type='button' class='sp-choose'></button>","</div>","</div>","</div>"].join("")
})();function s(w,y,C,u){var A=[];for(var z=0;z<w.length;
z++){var B=w[z];if(B){var v=tinycolor(B);var E=v.toHsl().l<0.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";
E+=(tinycolor.equals(y,B))?" sp-thumb-active":"";
var D=v.toString(u.preferredFormat||"rgb");var x=l?("background-color:"+v.toRgbString()):"filter:"+v.toFilter();
A.push('<span title="'+D+'" data-color="'+v.toRgbString()+'" class="'+E+'"><span class="sp-thumb-inner" style="'+x+';" /></span>')
}else{var F="sp-clear-display";A.push(e("<div />").append(e('<span data-color="" style="background-color:transparent;" class="'+F+'"></span>').attr("title",u.noColorSelectedText)).html())
}}return"<div class='sp-cf "+C+"'>"+A.join("")+"</div>"
}function o(){for(var u=0;u<d.length;u++){if(d[u]){d[u].hide()
}}}function n(w,u){var v=e.extend({},m,w);v.callbacks={move:t(v.move,u),change:t(v.change,u),show:t(v.show,u),hide:t(v.hide,u),beforeShow:t(v.beforeShow,u)};
return v}function r(a7,ag){var a6=n(ag,a7),a2=a6.flat,V=a6.showSelectionPalette,w=a6.localStorageKey,aj=a6.theme,R=a6.callbacks,E=f(ac,10),O=false,ao=false,aL=0,ae=0,aM=0,ay=0,L=0,ax=0,aX=0,aq=0,X=0,P=0,aB=0,aY=1,ah=[],ak=[],a4={},aH=a6.selectionPalette.slice(0),aG=a6.maxSelectionSize,x="sp-dragging",G=null;
var W=a7.ownerDocument,N=W.body,D=e(a7),aV=false,aN=e(p,W).addClass(aj),u=aN.find(".sp-picker-container"),I=aN.find(".sp-color"),aK=aN.find(".sp-dragger"),M=aN.find(".sp-hue"),a1=aN.find(".sp-slider"),aD=aN.find(".sp-alpha-inner"),Y=aN.find(".sp-alpha"),aE=aN.find(".sp-alpha-handle"),K=aN.find(".sp-input"),Q=aN.find(".sp-palette"),a5=aN.find(".sp-initial"),ap=aN.find(".sp-cancel"),am=aN.find(".sp-clear"),H=aN.find(".sp-choose"),aP=aN.find(".sp-palette-toggle"),S=D.is("input"),B=S&&D.attr("type")==="color"&&k(),aA=S&&!a2,aT=(aA)?e(q).addClass(aj).addClass(a6.className).addClass(a6.replacerClassName):e([]),av=(aA)?aT:D,J=aT.find(".sp-preview-inner"),T=a6.color||(S&&D.val()),aO=false,at=a6.preferredFormat,F=!a6.showButtons||a6.clickoutFiresChange,C=!T,a3=a6.allowEmpty&&!B;
function v(){if(a6.showPaletteOnly){a6.showPalette=true
}aP.text(a6.showPaletteOnly?a6.togglePaletteMoreText:a6.togglePaletteLessText);
if(a6.palette){ah=a6.palette.slice(0);ak=e.isArray(ah[0])?ah:[ah];
a4={};for(var bb=0;bb<ak.length;bb++){for(var ba=0;
ba<ak[bb].length;ba++){var a9=tinycolor(ak[bb][ba]).toRgbString();
a4[a9]=true}}}aN.toggleClass("sp-flat",a2);aN.toggleClass("sp-input-disabled",!a6.showInput);
aN.toggleClass("sp-alpha-enabled",a6.showAlpha);aN.toggleClass("sp-clear-enabled",a3);
aN.toggleClass("sp-buttons-disabled",!a6.showButtons);
aN.toggleClass("sp-palette-buttons-disabled",!a6.togglePaletteOnly);
aN.toggleClass("sp-palette-disabled",!a6.showPalette);
aN.toggleClass("sp-palette-only",a6.showPaletteOnly);
aN.toggleClass("sp-initial-disabled",!a6.showInitial);
aN.addClass(a6.className).addClass(a6.containerClassName);
ac()}function aI(){if(h){aN.find("*:not(input)").attr("unselectable","on")
}v();if(aA){D.after(aT).hide()}if(!a3){am.hide()}if(a2){D.after(aN).hide()
}else{var ba=a6.appendTo==="parent"?D.parent():e(a6.appendTo);
if(ba.length!==1){ba=e("body")}ba.append(aN)}aQ();
av.bind("click.spectrum touchstart.spectrum",function(bc){if(!aV){aw()
}bc.stopPropagation();if(!e(bc.target).is("input")){bc.preventDefault()
}});if(D.is(":disabled")||(a6.disabled===true)){U()
}aN.click(j);K.change(aR);K.bind("paste",function(){setTimeout(aR,1)
});K.keydown(function(bc){if(bc.keyCode==13){aR()
}});ap.text(a6.cancelText);ap.bind("click.spectrum",function(bc){bc.stopPropagation();
bc.preventDefault();au();aF()});am.attr("title",a6.clearText);
am.bind("click.spectrum",function(bc){bc.stopPropagation();
bc.preventDefault();C=true;aJ();if(a2){an(true)}});
H.text(a6.chooseText);H.bind("click.spectrum",function(bc){bc.stopPropagation();
bc.preventDefault();if(h&&K.is(":focus")){K.trigger("change")
}if(az()){an(true);aF()}});aP.text(a6.showPaletteOnly?a6.togglePaletteMoreText:a6.togglePaletteLessText);
aP.bind("click.spectrum",function(bc){bc.stopPropagation();
bc.preventDefault();a6.showPaletteOnly=!a6.showPaletteOnly;
if(!a6.showPaletteOnly&&!a2){aN.css("left","-="+(u.outerWidth(true)+5))
}v()});c(Y,function(be,bd,bc){aY=(be/ax);C=false;
if(bc.shiftKey){aY=Math.round(aY*10)/10}aJ()},A,a8);
c(M,function(bd,bc){X=parseFloat(bc/ay);C=false;if(!a6.showAlpha){aY=1
}aJ()},A,a8);c(I,function(bj,bh,bg){if(!bg.shiftKey){G=null
}else{if(!G){var be=P*aL;var bc=ae-(aB*ae);var bd=Math.abs(bj-be)>Math.abs(bh-bc);
G=bd?"x":"y"}}var bf=!G||G==="x";var bi=!G||G==="y";
if(bf){P=parseFloat(bj/aL)}if(bi){aB=parseFloat((ae-bh)/ae)
}C=false;if(!a6.showAlpha){aY=1}aJ()},A,a8);if(!!T){ab(T);
aC();at=a6.preferredFormat||tinycolor(T).format;aU(T)
}else{aC()}if(a2){z()}function bb(bc){if(bc.data&&bc.data.ignore){ab(e(bc.target).closest(".sp-thumb-el").data("color"));
aJ()}else{ab(e(bc.target).closest(".sp-thumb-el").data("color"));
aJ();an(true);if(a6.hideAfterPaletteSelect){aF()}}return false
}var a9=h?"mousedown.spectrum":"click.spectrum touchstart.spectrum";
Q.delegate(".sp-thumb-el",a9,bb);a5.delegate(".sp-thumb-el:nth-child(1)",a9,{ignore:true},bb)
}function aQ(){if(w&&window.localStorage){try{var a9=window.localStorage[w].split(",#");
if(a9.length>1){delete window.localStorage[w];e.each(a9,function(bb,bc){aU(bc)
})}}catch(ba){}try{aH=window.localStorage[w].split(";")
}catch(ba){}}}function aU(a9){if(V){var ba=tinycolor(a9).toRgbString();
if(!a4[ba]&&e.inArray(ba,aH)===-1){aH.push(ba);while(aH.length>aG){aH.shift()
}}if(w&&window.localStorage){try{window.localStorage[w]=aH.join(";")
}catch(bb){}}}}function aW(){var bb=[];if(a6.showPalette){for(var ba=0;
ba<aH.length;ba++){var a9=tinycolor(aH[ba]).toRgbString();
if(!a4[a9]){bb.push(aH[ba])}}}return bb.reverse().slice(0,a6.maxSelectionSize)
}function aZ(){var a9=aS();var ba=e.map(ak,function(bb,bc){return s(bb,a9,"sp-palette-row sp-palette-row-"+bc,a6)
});aQ();if(aH){ba.push(s(aW(),a9,"sp-palette-row sp-palette-row-selection",a6))
}Q.html(ba.join(""))}function ar(){if(a6.showInitial){var a9=aO;
var ba=aS();a5.html(s([a9,ba],ba,"sp-palette-row-initial",a6))
}}function A(){if(ae<=0||aL<=0||ay<=0){ac()}ao=true;
aN.addClass(x);G=null;D.trigger("dragstart.spectrum",[aS()])
}function a8(){ao=false;aN.removeClass(x);D.trigger("dragstop.spectrum",[aS()])
}function aR(){var ba=K.val();if((ba===null||ba==="")&&a3){ab(null);
an(true)}else{var a9=tinycolor(ba);if(a9.isValid()){ab(a9);
an(true)}else{K.addClass("sp-validation-error")}}}function aw(){if(O){aF()
}else{z()}}function z(){var a9=e.Event("beforeShow.spectrum");
if(O){ac();return}D.trigger(a9,[aS()]);if(R.beforeShow(aS())===false||a9.isDefaultPrevented()){return
}o();O=true;e(W).bind("keydown.spectrum",ai);e(W).bind("click.spectrum",aa);
e(window).bind("resize.spectrum",E);aT.addClass("sp-active");
aN.removeClass("sp-hidden");ac();aC();aO=aS();ar();
R.show(aO);D.trigger("show.spectrum",[aO])}function ai(a9){if(a9.keyCode===27){aF()
}}function aa(a9){if(a9.button==2){return}if(ao){return
}if(F){an(true)}else{au()}aF()}function aF(){if(!O||a2){return
}O=false;e(W).unbind("keydown.spectrum",ai);e(W).unbind("click.spectrum",aa);
e(window).unbind("resize.spectrum",E);aT.removeClass("sp-active");
aN.addClass("sp-hidden");R.hide(aS());D.trigger("hide.spectrum",[aS()])
}function au(){ab(aO,true)}function ab(a9,bb){if(tinycolor.equals(a9,aS())){aC();
return}var ba,bc;if(!a9&&a3){C=true}else{C=false;
ba=tinycolor(a9);bc=ba.toHsv();X=(bc.h%360)/360;P=bc.s;
aB=bc.v;aY=bc.a}aC();if(ba&&ba.isValid()&&!bb){at=a6.preferredFormat||ba.getFormat()
}}function aS(a9){a9=a9||{};if(a3&&C){return null
}return tinycolor.fromRatio({h:X,s:P,v:aB,a:Math.round(aY*100)/100},{format:a9.format||at})
}function az(){return !K.hasClass("sp-validation-error")
}function aJ(){aC();R.move(aS());D.trigger("move.spectrum",[aS()])
}function aC(){K.removeClass("sp-validation-error");
a0();var bb=tinycolor.fromRatio({h:X,s:1,v:1});I.css("background-color",bb.toHexString());
var bg=at;if(aY<1&&!(aY===0&&bg==="name")){if(bg==="hex"||bg==="hex3"||bg==="hex6"||bg==="name"){bg="rgb"
}}var a9=aS({format:bg}),bc="";J.removeClass("sp-clear-display");
J.css("background-color","transparent");if(!a9&&a3){J.addClass("sp-clear-display")
}else{var bd=a9.toHexString(),bh=a9.toRgbString();
if(l||a9.alpha===1){J.css("background-color",bh)}else{J.css("background-color","transparent");
J.css("filter",a9.toFilter())}if(a6.showAlpha){var be=a9.toRgb();
be.a=0;var ba=tinycolor(be).toRgbString();var bf="linear-gradient(left, "+ba+", "+bd+")";
if(h){aD.css("filter",tinycolor(ba).toFilter({gradientType:1},bd))
}else{aD.css("background","-webkit-"+bf);aD.css("background","-moz-"+bf);
aD.css("background","-ms-"+bf);aD.css("background","linear-gradient(to right, "+ba+", "+bd+")")
}}bc=a9.toString(bg)}if(a6.showInput){K.val(bc)}if(a6.showPalette){aZ()
}ar()}function a0(){var bb=P;var a9=aB;if(a3&&C){aE.hide();
a1.hide();aK.hide()}else{aE.show();a1.show();aK.show();
var be=bb*aL;var bc=ae-(a9*ae);be=Math.max(-aM,Math.min(aL-aM,be-aM));
bc=Math.max(-aM,Math.min(ae-aM,bc-aM));aK.css({top:bc+"px",left:be+"px"});
var ba=aY*ax;aE.css({left:(ba-(aX/2))+"px"});var bd=(X)*ay;
a1.css({top:(bd-aq)+"px"})}}function an(ba){var a9=aS(),bc="",bb=!tinycolor.equals(a9,aO);
if(a9){bc=a9.toString(at);aU(a9)}if(S){D.val(bc)}if(ba&&bb){R.change(a9);
D.trigger("change",[a9])}}function ac(){if(!O){return
}aL=I.width();ae=I.height();aM=aK.height();L=M.width();
ay=M.height();aq=a1.height();ax=Y.width();aX=aE.width();
if(!a2){aN.css("position","absolute");if(a6.offset){aN.offset(a6.offset)
}else{aN.offset(a(aN,av))}}a0();if(a6.showPalette){aZ()
}D.trigger("reflow.spectrum")}function y(){D.show();
av.unbind("click.spectrum touchstart.spectrum");aN.remove();
aT.remove();d[ad.id]=null}function Z(a9,ba){if(a9===g){return e.extend({},a6)
}if(ba===g){return a6[a9]}a6[a9]=ba;if(a9==="preferredFormat"){at=a6.preferredFormat
}v()}function af(){aV=false;D.attr("disabled",false);
av.removeClass("sp-disabled")}function U(){aF();aV=true;
D.attr("disabled",true);av.addClass("sp-disabled")
}function al(a9){a6.offset=a9;ac()}aI();var ad={show:z,hide:aF,toggle:aw,reflow:ac,option:Z,enable:af,disable:U,offset:al,set:function(a9){ab(a9);
an()},get:aS,destroy:y,container:aN};ad.id=d.push(ad)-1;
return ad}function a(B,C){var A=0;var y=B.outerWidth();
var E=B.outerHeight();var u=C.outerHeight();var D=B[0].ownerDocument;
var v=D.documentElement;var z=v.clientWidth+e(D).scrollLeft();
var w=v.clientHeight+e(D).scrollTop();var x=C.offset();
x.top+=u;x.left-=Math.min(x.left,(x.left+y>z&&z>y)?Math.abs(x.left+y-z):0);
x.top-=Math.min(x.top,((x.top+E>w&&w>E)?Math.abs(E+u-A):A));
return x}function b(){}function j(u){u.stopPropagation()
}function t(v,w){var x=Array.prototype.slice;var u=x.call(arguments,2);
return function(){return v.apply(w,u.concat(x.call(arguments)))
}}function c(z,E,v,w){E=E||function(){};v=v||function(){};
w=w||function(){};var F=document;var H=false;var y={};
var I=0;var G=0;var B=("ontouchstart" in window);
var A={};A.selectstart=D;A.dragstart=D;A["touchmove mousemove"]=x;
A["touchend mouseup"]=C;function D(J){if(J.stopPropagation){J.stopPropagation()
}if(J.preventDefault){J.preventDefault()}J.returnValue=false
}function x(N){if(H){if(h&&F.documentMode<9&&!N.button){return C()
}var L=N.originalEvent&&N.originalEvent.touches&&N.originalEvent.touches[0];
var K=L&&L.pageX||N.pageX;var J=L&&L.pageY||N.pageY;
var O=Math.max(0,Math.min(K-y.left,G));var M=Math.max(0,Math.min(J-y.top,I));
if(B){D(N)}E.apply(z,[O,M,N])}}function u(K){var J=(K.which)?(K.which==3):(K.button==2);
if(!J&&!H){if(v.apply(z,arguments)!==false){H=true;
I=e(z).height();G=e(z).width();y=e(z).offset();e(F).bind(A);
e(F.body).addClass("sp-dragging");x(K);D(K)}}}function C(){if(H){e(F).unbind(A);
e(F.body).removeClass("sp-dragging");setTimeout(function(){w.apply(z,arguments)
},0)}H=false}e(z).bind("touchstart mousedown",u)}function f(v,x,u){var w;
return function(){var z=this,y=arguments;var A=function(){w=null;
v.apply(z,y)};if(u){clearTimeout(w)}if(u||!w){w=setTimeout(A,x)
}}}function k(){return e.fn.spectrum.inputTypeColorSupport()
}var i="spectrum.id";e.fn.spectrum=function(x,u){if(typeof x=="string"){var w=this;
var v=Array.prototype.slice.call(arguments,1);this.each(function(){var y=d[e(this).data(i)];
if(y){var z=y[x];if(!z){throw new Error("Spectrum: no such method: '"+x+"'")
}if(x=="get"){w=y.get()}else{if(x=="container"){w=y.container
}else{if(x=="option"){w=y.option.apply(y,v)}else{if(x=="destroy"){y.destroy();
e(this).removeData(i)}else{z.apply(y,v)}}}}}});return w
}return this.spectrum("destroy").each(function(){var y=e.extend({},x,e(this).data());
var z=r(this,y);e(this).data(i,z.id)})};e.fn.spectrum.load=true;
e.fn.spectrum.loadOpts={};e.fn.spectrum.draggable=c;
e.fn.spectrum.defaults=m;e.fn.spectrum.inputTypeColorSupport=function k(){if(typeof k._cachedResult==="undefined"){var u=e("<input type='color'/>")[0];
k._cachedResult=u.type==="color"&&u.value!==""}return k._cachedResult
};e.spectrum={};e.spectrum.localization={};e.spectrum.palettes={};
e.fn.spectrum.processNativeColorInputs=function(){var u=e("input[type=color]");
if(u.length&&!k()){u.spectrum({preferredFormat:"hex6"})
}};(function(){var Y=/^[\s,#]+/,K=/\s+$/,ad=0,P=Math,T=P.round,ak=P.min,M=P.max,D=P.random;
var af=function(an,ap){an=(an)?an:"";ap=ap||{};if(an instanceof af){return an
}if(!(this instanceof af)){return new af(an,ap)}var ao=ac(an);
this._originalInput=an,this._r=ao.r,this._g=ao.g,this._b=ao.b,this._a=ao.a,this._roundA=T(100*this._a)/100,this._format=ap.format||ao.format;
this._gradientType=ap.gradientType;if(this._r<1){this._r=T(this._r)
}if(this._g<1){this._g=T(this._g)}if(this._b<1){this._b=T(this._b)
}this._ok=ao.ok;this._tc_id=ad++};af.prototype={isDark:function(){return this.getBrightness()<128
},isLight:function(){return !this.isDark()},isValid:function(){return this._ok
},getOriginalInput:function(){return this._originalInput
},getFormat:function(){return this._format},getAlpha:function(){return this._a
},getBrightness:function(){var an=this.toRgb();return(an.r*299+an.g*587+an.b*114)/1000
},setAlpha:function(an){this._a=E(an);this._roundA=T(100*this._a)/100;
return this},toHsv:function(){var an=B(this._r,this._g,this._b);
return{h:an.h*360,s:an.s,v:an.v,a:this._a}},toHsvString:function(){var ao=B(this._r,this._g,this._b);
var aq=T(ao.h*360),ap=T(ao.s*100),an=T(ao.v*100);
return(this._a==1)?"hsv("+aq+", "+ap+"%, "+an+"%)":"hsva("+aq+", "+ap+"%, "+an+"%, "+this._roundA+")"
},toHsl:function(){var an=G(this._r,this._g,this._b);
return{h:an.h*360,s:an.s,l:an.l,a:this._a}},toHslString:function(){var ao=G(this._r,this._g,this._b);
var aq=T(ao.h*360),ap=T(ao.s*100),an=T(ao.l*100);
return(this._a==1)?"hsl("+aq+", "+ap+"%, "+an+"%)":"hsla("+aq+", "+ap+"%, "+an+"%, "+this._roundA+")"
},toHex:function(an){return ab(this._r,this._g,this._b,an)
},toHexString:function(an){return"#"+this.toHex(an)
},toHex8:function(){return al(this._r,this._g,this._b,this._a)
},toHex8String:function(){return"#"+this.toHex8()
},toRgb:function(){return{r:T(this._r),g:T(this._g),b:T(this._b),a:this._a}
},toRgbString:function(){return(this._a==1)?"rgb("+T(this._r)+", "+T(this._g)+", "+T(this._b)+")":"rgba("+T(this._r)+", "+T(this._g)+", "+T(this._b)+", "+this._roundA+")"
},toPercentageRgb:function(){return{r:T(ag(this._r,255)*100)+"%",g:T(ag(this._g,255)*100)+"%",b:T(ag(this._b,255)*100)+"%",a:this._a}
},toPercentageRgbString:function(){return(this._a==1)?"rgb("+T(ag(this._r,255)*100)+"%, "+T(ag(this._g,255)*100)+"%, "+T(ag(this._b,255)*100)+"%)":"rgba("+T(ag(this._r,255)*100)+"%, "+T(ag(this._g,255)*100)+"%, "+T(ag(this._b,255)*100)+"%, "+this._roundA+")"
},toName:function(){if(this._a===0){return"transparent"
}if(this._a<1){return false}return am[ab(this._r,this._g,this._b,true)]||false
},toFilter:function(aq){var ar="#"+al(this._r,this._g,this._b,this._a);
var ao=ar;var an=this._gradientType?"GradientType = 1, ":"";
if(aq){var ap=af(aq);ao=ap.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+an+"startColorstr="+ar+",endColorstr="+ao+")"
},toString:function(aq){var an=!!aq;aq=aq||this._format;
var ap=false;var ao=this._a<1&&this._a>=0;var ar=!an&&ao&&(aq==="hex"||aq==="hex6"||aq==="hex3"||aq==="name");
if(ar){if(aq==="name"&&this._a===0){return this.toName()
}return this.toRgbString()}if(aq==="rgb"){ap=this.toRgbString()
}if(aq==="prgb"){ap=this.toPercentageRgbString()}if(aq==="hex"||aq==="hex6"){ap=this.toHexString()
}if(aq==="hex3"){ap=this.toHexString(true)}if(aq==="hex8"){ap=this.toHex8String()
}if(aq==="name"){ap=this.toName()}if(aq==="hsl"){ap=this.toHslString()
}if(aq==="hsv"){ap=this.toHsvString()}return ap||this.toHexString()
},_applyModification:function(ap,ao){var an=ap.apply(null,[this].concat([].slice.call(ao)));
this._r=an._r;this._g=an._g;this._b=an._b;this.setAlpha(an._a);
return this},lighten:function(){return this._applyModification(J,arguments)
},brighten:function(){return this._applyModification(v,arguments)
},darken:function(){return this._applyModification(I,arguments)
},desaturate:function(){return this._applyModification(O,arguments)
},saturate:function(){return this._applyModification(Z,arguments)
},greyscale:function(){return this._applyModification(y,arguments)
},spin:function(){return this._applyModification(ae,arguments)
},_applyCombination:function(ao,an){return ao.apply(null,[this].concat([].slice.call(an)))
},analogous:function(){return this._applyCombination(R,arguments)
},complement:function(){return this._applyCombination(W,arguments)
},monochromatic:function(){return this._applyCombination(L,arguments)
},splitcomplement:function(){return this._applyCombination(U,arguments)
},triad:function(){return this._applyCombination(z,arguments)
},tetrad:function(){return this._applyCombination(aj,arguments)
}};af.fromRatio=function(an,aq){if(typeof an=="object"){var ao={};
for(var ap in an){if(an.hasOwnProperty(ap)){if(ap==="a"){ao[ap]=an[ap]
}else{ao[ap]=H(an[ap])}}}an=ao}return af(an,aq)};
function ac(ao){var ap={r:0,g:0,b:0};var an=1;var aq=false;
var ar=false;if(typeof ao=="string"){ao=N(ao)}if(typeof ao=="object"){if(ao.hasOwnProperty("r")&&ao.hasOwnProperty("g")&&ao.hasOwnProperty("b")){ap=A(ao.r,ao.g,ao.b);
aq=true;ar=String(ao.r).substr(-1)==="%"?"prgb":"rgb"
}else{if(ao.hasOwnProperty("h")&&ao.hasOwnProperty("s")&&ao.hasOwnProperty("v")){ao.s=H(ao.s);
ao.v=H(ao.v);ap=aa(ao.h,ao.s,ao.v);aq=true;ar="hsv"
}else{if(ao.hasOwnProperty("h")&&ao.hasOwnProperty("s")&&ao.hasOwnProperty("l")){ao.s=H(ao.s);
ao.l=H(ao.l);ap=S(ao.h,ao.s,ao.l);aq=true;ar="hsl"
}}}if(ao.hasOwnProperty("a")){an=ao.a}}an=E(an);return{ok:aq,format:ao.format||ar,r:ak(255,M(ap.r,0)),g:ak(255,M(ap.g,0)),b:ak(255,M(ap.b,0)),a:an}
}function A(ap,ao,an){return{r:ag(ap,255)*255,g:ag(ao,255)*255,b:ag(an,255)*255}
}function G(an,ar,au){an=ag(an,255);ar=ag(ar,255);
au=ag(au,255);var av=M(an,ar,au),ap=ak(an,ar,au);
var aq,aw,ao=(av+ap)/2;if(av==ap){aq=aw=0}else{var at=av-ap;
aw=ao>0.5?at/(2-av-ap):at/(av+ap);switch(av){case an:aq=(ar-au)/at+(ar<au?6:0);
break;case ar:aq=(au-an)/at+2;break;case au:aq=(an-ar)/at+4;
break}aq/=6}return{h:aq,s:aw,l:ao}}function S(at,aw,ar){var an,au,av;
at=ag(at,360);aw=ag(aw,100);ar=ag(ar,100);function aq(az,ay,ax){if(ax<0){ax+=1
}if(ax>1){ax-=1}if(ax<1/6){return az+(ay-az)*6*ax
}if(ax<1/2){return ay}if(ax<2/3){return az+(ay-az)*(2/3-ax)*6
}return az}if(aw===0){an=au=av=ar}else{var ao=ar<0.5?ar*(1+aw):ar+aw-ar*aw;
var ap=2*ar-ao;an=aq(ap,ao,at+1/3);au=aq(ap,ao,at);
av=aq(ap,ao,at-1/3)}return{r:an*255,g:au*255,b:av*255}
}function B(an,aq,at){an=ag(an,255);aq=ag(aq,255);
at=ag(at,255);var au=M(an,aq,at),ao=ak(an,aq,at);
var ap,aw,av=au;var ar=au-ao;aw=au===0?0:ar/au;if(au==ao){ap=0
}else{switch(au){case an:ap=(aq-at)/ar+(aq<at?6:0);
break;case aq:ap=(at-an)/ar+2;break;case at:ap=(an-aq)/ar+4;
break}ap/=6}return{h:ap,s:aw,v:av}}function aa(ar,az,ax){ar=ag(ar,360)*6;
az=ag(az,100);ax=ag(ax,100);var aq=P.floor(ar),au=ar-aq,ap=ax*(1-az),ao=ax*(1-au*az),ay=ax*(1-(1-au)*az),aw=aq%6,an=[ax,ao,ap,ap,ay,ax][aw],at=[ay,ax,ax,ao,ap,ap][aw],av=[ap,ap,ay,ax,ax,ao][aw];
return{r:an*255,g:at*255,b:av*255}}function ab(aq,ap,an,ar){var ao=[Q(T(aq).toString(16)),Q(T(ap).toString(16)),Q(T(an).toString(16))];
if(ar&&ao[0].charAt(0)==ao[0].charAt(1)&&ao[1].charAt(0)==ao[1].charAt(1)&&ao[2].charAt(0)==ao[2].charAt(1)){return ao[0].charAt(0)+ao[1].charAt(0)+ao[2].charAt(0)
}return ao.join("")}function al(ar,aq,an,ao){var ap=[Q(V(ao)),Q(T(ar).toString(16)),Q(T(aq).toString(16)),Q(T(an).toString(16))];
return ap.join("")}af.equals=function(ao,an){if(!ao||!an){return false
}return af(ao).toRgbString()==af(an).toRgbString()
};af.random=function(){return af.fromRatio({r:D(),g:D(),b:D()})
};function O(ao,ap){ap=(ap===0)?0:(ap||10);var an=af(ao).toHsl();
an.s-=ap/100;an.s=u(an.s);return af(an)}function Z(ao,ap){ap=(ap===0)?0:(ap||10);
var an=af(ao).toHsl();an.s+=ap/100;an.s=u(an.s);return af(an)
}function y(an){return af(an).desaturate(100)}function J(ao,ap){ap=(ap===0)?0:(ap||10);
var an=af(ao).toHsl();an.l+=ap/100;an.l=u(an.l);return af(an)
}function v(an,ap){ap=(ap===0)?0:(ap||10);var ao=af(an).toRgb();
ao.r=M(0,ak(255,ao.r-T(255*-(ap/100))));ao.g=M(0,ak(255,ao.g-T(255*-(ap/100))));
ao.b=M(0,ak(255,ao.b-T(255*-(ap/100))));return af(ao)
}function I(ao,ap){ap=(ap===0)?0:(ap||10);var an=af(ao).toHsl();
an.l-=ap/100;an.l=u(an.l);return af(an)}function ae(ap,aq){var ao=af(ap).toHsl();
var an=(T(ao.h)+aq)%360;ao.h=an<0?360+an:an;return af(ao)
}function W(ao){var an=af(ao).toHsl();an.h=(an.h+180)%360;
return af(an)}function z(ao){var an=af(ao).toHsl();
var ap=an.h;return[af(ao),af({h:(ap+120)%360,s:an.s,l:an.l}),af({h:(ap+240)%360,s:an.s,l:an.l})]
}function aj(ao){var an=af(ao).toHsl();var ap=an.h;
return[af(ao),af({h:(ap+90)%360,s:an.s,l:an.l}),af({h:(ap+180)%360,s:an.s,l:an.l}),af({h:(ap+270)%360,s:an.s,l:an.l})]
}function U(ao){var an=af(ao).toHsl();var ap=an.h;
return[af(ao),af({h:(ap+72)%360,s:an.s,l:an.l}),af({h:(ap+216)%360,s:an.s,l:an.l})]
}function R(ao,ar,at){ar=ar||6;at=at||30;var an=af(ao).toHsl();
var aq=360/at;var ap=[af(ao)];for(an.h=((an.h-(aq*ar>>1))+720)%360;
--ar;){an.h=(an.h+aq)%360;ap.push(af(an))}return ap
}function L(ap,at){at=at||6;var ar=af(ap).toHsv();
var av=ar.h,au=ar.s,ao=ar.v;var aq=[];var an=1/at;
while(at--){aq.push(af({h:av,s:au,v:ao}));ao=(ao+an)%1
}return aq}af.mix=function(ay,ax,au){au=(au===0)?0:(au||50);
var ar=af(ay).toRgb();var ap=af(ax).toRgb();var an=au/100;
var aw=an*2-1;var av=ap.a-ar.a;var at;if(aw*av==-1){at=aw
}else{at=(aw+av)/(1+aw*av)}at=(at+1)/2;var aq=1-at;
var ao={r:ap.r*at+ar.r*aq,g:ap.g*at+ar.g*aq,b:ap.b*at+ar.b*aq,a:ap.a*an+ar.a*(1-an)};
return af(ao)};af.readability=function(aw,av){var ar=af(aw);
var ap=af(av);var aq=ar.toRgb();var ao=ap.toRgb();
var at=ar.getBrightness();var an=ap.getBrightness();
var au=(Math.max(aq.r,ao.r)-Math.min(aq.r,ao.r)+Math.max(aq.g,ao.g)-Math.min(aq.g,ao.g)+Math.max(aq.b,ao.b)-Math.min(aq.b,ao.b));
return{brightness:Math.abs(at-an),color:au}};af.isReadable=function(ao,an){var ap=af.readability(ao,an);
return ap.brightness>125&&ap.color>500};af.mostReadable=function(av,au){var aq=null;
var ao=0;var aw=false;for(var at=0;at<au.length;at++){var ap=af.readability(av,au[at]);
var ar=ap.brightness>125&&ap.color>500;var an=3*(ap.brightness/125)+(ap.color/500);
if((ar&&!aw)||(ar&&aw&&an>ao)||((!ar)&&(!aw)&&an>ao)){aw=ar;
ao=an;aq=af(au[at])}}return aq};var ah=af.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};
var am=af.hexNames=ai(ah);function ai(ap){var ao={};
for(var an in ap){if(ap.hasOwnProperty(an)){ao[ap[an]]=an
}}return ao}function E(an){an=parseFloat(an);if(isNaN(an)||an<0||an>1){an=1
}return an}function ag(ap,an){if(X(ap)){ap="100%"
}var ao=F(ap);ap=ak(an,M(0,parseFloat(ap)));if(ao){ap=parseInt(ap*an,10)/100
}if((P.abs(ap-an)<0.000001)){return 1}return(ap%an)/parseFloat(an)
}function u(an){return ak(1,M(0,an))}function w(an){return parseInt(an,16)
}function X(an){return typeof an=="string"&&an.indexOf(".")!=-1&&parseFloat(an)===1
}function F(an){return typeof an==="string"&&an.indexOf("%")!=-1
}function Q(an){return an.length==1?"0"+an:""+an}function H(an){if(an<=1){an=(an*100)+"%"
}return an}function V(an){return Math.round(parseFloat(an)*255).toString(16)
}function C(an){return(w(an)/255)}var x=(function(){var ar="[-\\+]?\\d+%?";
var aq="[-\\+]?\\d*\\.\\d+%?";var an="(?:"+aq+")|(?:"+ar+")";
var ap="[\\s|\\(]+("+an+")[,|\\s]+("+an+")[,|\\s]+("+an+")\\s*\\)?";
var ao="[\\s|\\(]+("+an+")[,|\\s]+("+an+")[,|\\s]+("+an+")[,|\\s]+("+an+")\\s*\\)?";
return{rgb:new RegExp("rgb"+ap),rgba:new RegExp("rgba"+ao),hsl:new RegExp("hsl"+ap),hsla:new RegExp("hsla"+ao),hsv:new RegExp("hsv"+ap),hsva:new RegExp("hsva"+ao),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}
})();function N(ao){ao=ao.replace(Y,"").replace(K,"").toLowerCase();
var an=false;if(ah[ao]){ao=ah[ao];an=true}else{if(ao=="transparent"){return{r:0,g:0,b:0,a:0,format:"name"}
}}var ap;if((ap=x.rgb.exec(ao))){return{r:ap[1],g:ap[2],b:ap[3]}
}if((ap=x.rgba.exec(ao))){return{r:ap[1],g:ap[2],b:ap[3],a:ap[4]}
}if((ap=x.hsl.exec(ao))){return{h:ap[1],s:ap[2],l:ap[3]}
}if((ap=x.hsla.exec(ao))){return{h:ap[1],s:ap[2],l:ap[3],a:ap[4]}
}if((ap=x.hsv.exec(ao))){return{h:ap[1],s:ap[2],v:ap[3]}
}if((ap=x.hsva.exec(ao))){return{h:ap[1],s:ap[2],v:ap[3],a:ap[4]}
}if((ap=x.hex8.exec(ao))){return{a:C(ap[1]),r:w(ap[2]),g:w(ap[3]),b:w(ap[4]),format:an?"name":"hex8"}
}if((ap=x.hex6.exec(ao))){return{r:w(ap[1]),g:w(ap[2]),b:w(ap[3]),format:an?"name":"hex"}
}if((ap=x.hex3.exec(ao))){return{r:w(ap[1]+""+ap[1]),g:w(ap[2]+""+ap[2]),b:w(ap[3]+""+ap[3]),format:an?"name":"hex"}
}return false}window.tinycolor=af})();e(function(){if(e.fn.spectrum.load){e.fn.spectrum.processNativeColorInputs()
}})});console.log("=============== >  spectrum.js ");
const AlixLogger=function(){var d=null;var c=function(e){d=e
};var a=function(e){if(d){d(e)}else{console.log("track "+e)
}};var b={connectTracker:c,trackAction:a};return b
}();console.log("=============== >  Alix_Logger.js ");
/*! jQuery UI - v1.12.1 - 2016-09-14
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{a(jQuery)}}(function(ak){ak.ui=ak.ui||{};var y=ak.ui.version="1.12.1";
/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var I=0;var al=Array.prototype.slice;ak.cleanData=(function(av){return function(aw){var ay,az,ax;
for(ax=0;(az=aw[ax])!=null;ax++){try{ay=ak._data(az,"events");
if(ay&&ay.remove){ak(az).triggerHandler("remove")
}}catch(aA){}}av(aw)}})(ak.cleanData);ak.widget=function(av,aw,aD){var aB,ay,aC;
var ax={};var aA=av.split(".")[0];av=av.split(".")[1];
var az=aA+"-"+av;if(!aD){aD=aw;aw=ak.Widget}if(ak.isArray(aD)){aD=ak.extend.apply(null,[{}].concat(aD))
}ak.expr[":"][az.toLowerCase()]=function(aE){return !!ak.data(aE,az)
};ak[aA]=ak[aA]||{};aB=ak[aA][av];ay=ak[aA][av]=function(aE,aF){if(!this._createWidget){return new ay(aE,aF)
}if(arguments.length){this._createWidget(aE,aF)}};
ak.extend(ay,aB,{version:aD.version,_proto:ak.extend({},aD),_childConstructors:[]});
aC=new aw();aC.options=ak.widget.extend({},aC.options);
ak.each(aD,function(aF,aE){if(!ak.isFunction(aE)){ax[aF]=aE;
return}ax[aF]=(function(){function aG(){return aw.prototype[aF].apply(this,arguments)
}function aH(aI){return aw.prototype[aF].apply(this,aI)
}return function(){var aK=this._super;var aI=this._superApply;
var aJ;this._super=aG;this._superApply=aH;aJ=aE.apply(this,arguments);
this._super=aK;this._superApply=aI;return aJ}})()
});ay.prototype=ak.widget.extend(aC,{widgetEventPrefix:aB?(aC.widgetEventPrefix||av):av},ax,{constructor:ay,namespace:aA,widgetName:av,widgetFullName:az});
if(aB){ak.each(aB._childConstructors,function(aF,aG){var aE=aG.prototype;
ak.widget(aE.namespace+"."+aE.widgetName,ay,aG._proto)
});delete aB._childConstructors}else{aw._childConstructors.push(ay)
}ak.widget.bridge(av,ay);return ay};ak.widget.extend=function(aA){var aw=al.call(arguments,1);
var az=0;var av=aw.length;var ax;var ay;for(;az<av;
az++){for(ax in aw[az]){ay=aw[az][ax];if(aw[az].hasOwnProperty(ax)&&ay!==undefined){if(ak.isPlainObject(ay)){aA[ax]=ak.isPlainObject(aA[ax])?ak.widget.extend({},aA[ax],ay):ak.widget.extend({},ay)
}else{aA[ax]=ay}}}}return aA};ak.widget.bridge=function(aw,av){var ax=av.prototype.widgetFullName||aw;
ak.fn[aw]=function(aA){var ay=typeof aA==="string";
var az=al.call(arguments,1);var aB=this;if(ay){if(!this.length&&aA==="instance"){aB=undefined
}else{this.each(function(){var aD;var aC=ak.data(this,ax);
if(aA==="instance"){aB=aC;return false}if(!aC){return ak.error("cannot call methods on "+aw+" prior to initialization; attempted to call method '"+aA+"'")
}if(!ak.isFunction(aC[aA])||aA.charAt(0)==="_"){return ak.error("no such method '"+aA+"' for "+aw+" widget instance")
}aD=aC[aA].apply(aC,az);if(aD!==aC&&aD!==undefined){aB=aD&&aD.jquery?aB.pushStack(aD.get()):aD;
return false}})}}else{if(az.length){aA=ak.widget.extend.apply(null,[aA].concat(az))
}this.each(function(){var aC=ak.data(this,ax);if(aC){aC.option(aA||{});
if(aC._init){aC._init()}}else{ak.data(this,ax,new av(aA,this))
}})}return aB}};ak.Widget=function(){};ak.Widget._childConstructors=[];
ak.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:false,create:null},_createWidget:function(av,aw){aw=ak(aw||this.defaultElement||this)[0];
this.element=ak(aw);this.uuid=I++;this.eventNamespace="."+this.widgetName+this.uuid;
this.bindings=ak();this.hoverable=ak();this.focusable=ak();
this.classesElementLookup={};if(aw!==this){ak.data(aw,this.widgetFullName,this);
this._on(true,this.element,{remove:function(ax){if(ax.target===aw){this.destroy()
}}});this.document=ak(aw.style?aw.ownerDocument:aw.document||aw);
this.window=ak(this.document[0].defaultView||this.document[0].parentWindow)
}this.options=ak.widget.extend({},this.options,this._getCreateOptions(),av);
this._create();if(this.options.disabled){this._setOptionDisabled(this.options.disabled)
}this._trigger("create",null,this._getCreateEventData());
this._init()},_getCreateOptions:function(){return{}
},_getCreateEventData:ak.noop,_create:ak.noop,_init:ak.noop,destroy:function(){var av=this;
this._destroy();ak.each(this.classesElementLookup,function(aw,ax){av._removeClass(ax,aw)
});this.element.off(this.eventNamespace).removeData(this.widgetFullName);
this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
this.bindings.off(this.eventNamespace)},_destroy:ak.noop,widget:function(){return this.element
},option:function(ay,az){var av=ay;var aA;var ax;
var aw;if(arguments.length===0){return ak.widget.extend({},this.options)
}if(typeof ay==="string"){av={};aA=ay.split(".");
ay=aA.shift();if(aA.length){ax=av[ay]=ak.widget.extend({},this.options[ay]);
for(aw=0;aw<aA.length-1;aw++){ax[aA[aw]]=ax[aA[aw]]||{};
ax=ax[aA[aw]]}ay=aA.pop();if(arguments.length===1){return ax[ay]===undefined?null:ax[ay]
}ax[ay]=az}else{if(arguments.length===1){return this.options[ay]===undefined?null:this.options[ay]
}av[ay]=az}}this._setOptions(av);return this},_setOptions:function(av){var aw;
for(aw in av){this._setOption(aw,av[aw])}return this
},_setOption:function(av,aw){if(av==="classes"){this._setOptionClasses(aw)
}this.options[av]=aw;if(av==="disabled"){this._setOptionDisabled(aw)
}return this},_setOptionClasses:function(ay){var av,ax,aw;
for(av in ay){aw=this.classesElementLookup[av];if(ay[av]===this.options.classes[av]||!aw||!aw.length){continue
}ax=ak(aw.get());this._removeClass(aw,av);ax.addClass(this._classes({element:ax,keys:av,classes:ay,add:true}))
}},_setOptionDisabled:function(av){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!av);
if(av){this._removeClass(this.hoverable,null,"ui-state-hover");
this._removeClass(this.focusable,null,"ui-state-focus")
}},enable:function(){return this._setOptions({disabled:false})
},disable:function(){return this._setOptions({disabled:true})
},_classes:function(av){var aw=[];var ax=this;av=ak.extend({element:this.element,classes:this.options.classes||{}},av);
function ay(aA,aC){var aB,az;for(az=0;az<aA.length;
az++){aB=ax.classesElementLookup[aA[az]]||ak();if(av.add){aB=ak(ak.unique(aB.get().concat(av.element.get())))
}else{aB=ak(aB.not(av.element).get())}ax.classesElementLookup[aA[az]]=aB;
aw.push(aA[az]);if(aC&&av.classes[aA[az]]){aw.push(av.classes[aA[az]])
}}}this._on(av.element,{remove:"_untrackClassesElement"});
if(av.keys){ay(av.keys.match(/\S+/g)||[],true)}if(av.extra){ay(av.extra.match(/\S+/g)||[])
}return aw.join(" ")},_untrackClassesElement:function(aw){var av=this;
ak.each(av.classesElementLookup,function(ax,ay){if(ak.inArray(aw.target,ay)!==-1){av.classesElementLookup[ax]=ak(ay.not(aw.target).get())
}})},_removeClass:function(aw,ax,av){return this._toggleClass(aw,ax,av,false)
},_addClass:function(aw,ax,av){return this._toggleClass(aw,ax,av,true)
},_toggleClass:function(ay,az,av,aA){aA=(typeof aA==="boolean")?aA:av;
var aw=(typeof ay==="string"||ay===null),ax={extra:aw?az:av,keys:aw?ay:az,element:aw?this.element:ay,add:aA};
ax.element.toggleClass(this._classes(ax),aA);return this
},_on:function(ay,ax,aw){var az;var av=this;if(typeof ay!=="boolean"){aw=ax;
ax=ay;ay=false}if(!aw){aw=ax;ax=this.element;az=this.widget()
}else{ax=az=ak(ax);this.bindings=this.bindings.add(ax)
}ak.each(aw,function(aF,aE){function aC(){if(!ay&&(av.options.disabled===true||ak(this).hasClass("ui-state-disabled"))){return
}return(typeof aE==="string"?av[aE]:aE).apply(av,arguments)
}if(typeof aE!=="string"){aC.guid=aE.guid=aE.guid||aC.guid||ak.guid++
}var aD=aF.match(/^([\w:-]*)\s*(.*)$/);var aB=aD[1]+av.eventNamespace;
var aA=aD[2];if(aA){az.on(aB,aA,aC)}else{ax.on(aB,aC)
}})},_off:function(aw,av){av=(av||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;
aw.off(av).off(av);this.bindings=ak(this.bindings.not(aw).get());
this.focusable=ak(this.focusable.not(aw).get());this.hoverable=ak(this.hoverable.not(aw).get())
},_delay:function(ay,ax){function aw(){return(typeof ay==="string"?av[ay]:ay).apply(av,arguments)
}var av=this;return setTimeout(aw,ax||0)},_hoverable:function(av){this.hoverable=this.hoverable.add(av);
this._on(av,{mouseenter:function(aw){this._addClass(ak(aw.currentTarget),null,"ui-state-hover")
},mouseleave:function(aw){this._removeClass(ak(aw.currentTarget),null,"ui-state-hover")
}})},_focusable:function(av){this.focusable=this.focusable.add(av);
this._on(av,{focusin:function(aw){this._addClass(ak(aw.currentTarget),null,"ui-state-focus")
},focusout:function(aw){this._removeClass(ak(aw.currentTarget),null,"ui-state-focus")
}})},_trigger:function(av,aw,ax){var aA,az;var ay=this.options[av];
ax=ax||{};aw=ak.Event(aw);aw.type=(av===this.widgetEventPrefix?av:this.widgetEventPrefix+av).toLowerCase();
aw.target=this.element[0];az=aw.originalEvent;if(az){for(aA in az){if(!(aA in aw)){aw[aA]=az[aA]
}}}this.element.trigger(aw,ax);return !(ak.isFunction(ay)&&ay.apply(this.element[0],[aw].concat(ax))===false||aw.isDefaultPrevented())
}};ak.each({show:"fadeIn",hide:"fadeOut"},function(aw,av){ak.Widget.prototype["_"+aw]=function(az,ay,aB){if(typeof ay==="string"){ay={effect:ay}
}var aA;var ax=!ay?aw:ay===true||typeof ay==="number"?av:ay.effect||av;
ay=ay||{};if(typeof ay==="number"){ay={duration:ay}
}aA=!ak.isEmptyObject(ay);ay.complete=aB;if(ay.delay){az.delay(ay.delay)
}if(aA&&ak.effects&&ak.effects.effect[ax]){az[aw](ay)
}else{if(ax!==aw&&az[ax]){az[ax](ay.duration,ay.easing,aB)
}else{az.queue(function(aC){ak(this)[aw]();if(aB){aB.call(az[0])
}aC()})}}}});var l=ak.widget;
/*!
 * jQuery UI Position 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function(){var aC,aD=Math.max,aG=Math.abs,ax=/left|center|right/,aA=/top|center|bottom/,av=/[\+\-]\d+(\.[\d]+)?%?/,aE=/^\w+/,aw=/%$/,az=ak.fn.position;
function aF(aJ,aI,aH){return[parseFloat(aJ[0])*(aw.test(aJ[0])?aI/100:1),parseFloat(aJ[1])*(aw.test(aJ[1])?aH/100:1)]
}function aB(aH,aI){return parseInt(ak.css(aH,aI),10)||0
}function ay(aI){var aH=aI[0];if(aH.nodeType===9){return{width:aI.width(),height:aI.height(),offset:{top:0,left:0}}
}if(ak.isWindow(aH)){return{width:aI.width(),height:aI.height(),offset:{top:aI.scrollTop(),left:aI.scrollLeft()}}
}if(aH.preventDefault){return{width:0,height:0,offset:{top:aH.pageY,left:aH.pageX}}
}return{width:aI.outerWidth(),height:aI.outerHeight(),offset:aI.offset()}
}ak.position={scrollbarWidth:function(){if(aC!==undefined){return aC
}var aI,aH,aK=ak("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),aJ=aK.children()[0];
ak("body").append(aK);aI=aJ.offsetWidth;aK.css("overflow","scroll");
aH=aJ.offsetWidth;if(aI===aH){aH=aK[0].clientWidth
}aK.remove();return(aC=aI-aH)},getScrollInfo:function(aL){var aK=aL.isWindow||aL.isDocument?"":aL.element.css("overflow-x"),aJ=aL.isWindow||aL.isDocument?"":aL.element.css("overflow-y"),aI=aK==="scroll"||(aK==="auto"&&aL.width<aL.element[0].scrollWidth),aH=aJ==="scroll"||(aJ==="auto"&&aL.height<aL.element[0].scrollHeight);
return{width:aH?ak.position.scrollbarWidth():0,height:aI?ak.position.scrollbarWidth():0}
},getWithinInfo:function(aJ){var aK=ak(aJ||window),aH=ak.isWindow(aK[0]),aL=!!aK[0]&&aK[0].nodeType===9,aI=!aH&&!aL;
return{element:aK,isWindow:aH,isDocument:aL,offset:aI?ak(aJ).offset():{left:0,top:0},scrollLeft:aK.scrollLeft(),scrollTop:aK.scrollTop(),width:aK.outerWidth(),height:aK.outerHeight()}
}};ak.fn.position=function(aR){if(!aR||!aR.of){return az.apply(this,arguments)
}aR=ak.extend({},aR);var aS,aO,aM,aQ,aL,aH,aN=ak(aR.of),aK=ak.position.getWithinInfo(aR.within),aI=ak.position.getScrollInfo(aK),aP=(aR.collision||"flip").split(" "),aJ={};
aH=ay(aN);if(aN[0].preventDefault){aR.at="left top"
}aO=aH.width;aM=aH.height;aQ=aH.offset;aL=ak.extend({},aQ);
ak.each(["my","at"],function(){var aV=(aR[this]||"").split(" "),aU,aT;
if(aV.length===1){aV=ax.test(aV[0])?aV.concat(["center"]):aA.test(aV[0])?["center"].concat(aV):["center","center"]
}aV[0]=ax.test(aV[0])?aV[0]:"center";aV[1]=aA.test(aV[1])?aV[1]:"center";
aU=av.exec(aV[0]);aT=av.exec(aV[1]);aJ[this]=[aU?aU[0]:0,aT?aT[0]:0];
aR[this]=[aE.exec(aV[0])[0],aE.exec(aV[1])[0]]});
if(aP.length===1){aP[1]=aP[0]}if(aR.at[0]==="right"){aL.left+=aO
}else{if(aR.at[0]==="center"){aL.left+=aO/2}}if(aR.at[1]==="bottom"){aL.top+=aM
}else{if(aR.at[1]==="center"){aL.top+=aM/2}}aS=aF(aJ.at,aO,aM);
aL.left+=aS[0];aL.top+=aS[1];return this.each(function(){var aU,a3,aW=ak(this),aY=aW.outerWidth(),aV=aW.outerHeight(),aX=aB(this,"marginLeft"),aT=aB(this,"marginTop"),a2=aY+aX+aB(this,"marginRight")+aI.width,a1=aV+aT+aB(this,"marginBottom")+aI.height,aZ=ak.extend({},aL),a0=aF(aJ.my,aW.outerWidth(),aW.outerHeight());
if(aR.my[0]==="right"){aZ.left-=aY}else{if(aR.my[0]==="center"){aZ.left-=aY/2
}}if(aR.my[1]==="bottom"){aZ.top-=aV}else{if(aR.my[1]==="center"){aZ.top-=aV/2
}}aZ.left+=a0[0];aZ.top+=a0[1];aU={marginLeft:aX,marginTop:aT};
ak.each(["left","top"],function(a5,a4){if(ak.ui.position[aP[a5]]){ak.ui.position[aP[a5]][a4](aZ,{targetWidth:aO,targetHeight:aM,elemWidth:aY,elemHeight:aV,collisionPosition:aU,collisionWidth:a2,collisionHeight:a1,offset:[aS[0]+a0[0],aS[1]+a0[1]],my:aR.my,at:aR.at,within:aK,elem:aW})
}});if(aR.using){a3=function(a7){var a9=aQ.left-aZ.left,a6=a9+aO-aY,a8=aQ.top-aZ.top,a5=a8+aM-aV,a4={target:{element:aN,left:aQ.left,top:aQ.top,width:aO,height:aM},element:{element:aW,left:aZ.left,top:aZ.top,width:aY,height:aV},horizontal:a6<0?"left":a9>0?"right":"center",vertical:a5<0?"top":a8>0?"bottom":"middle"};
if(aO<aY&&aG(a9+a6)<aO){a4.horizontal="center"}if(aM<aV&&aG(a8+a5)<aM){a4.vertical="middle"
}if(aD(aG(a9),aG(a6))>aD(aG(a8),aG(a5))){a4.important="horizontal"
}else{a4.important="vertical"}aR.using.call(this,a7,a4)
}}aW.offset(ak.extend(aZ,{using:a3}))})};ak.ui.position={fit:{left:function(aL,aK){var aJ=aK.within,aN=aJ.isWindow?aJ.scrollLeft:aJ.offset.left,aP=aJ.width,aM=aL.left-aK.collisionPosition.marginLeft,aO=aN-aM,aI=aM+aK.collisionWidth-aP-aN,aH;
if(aK.collisionWidth>aP){if(aO>0&&aI<=0){aH=aL.left+aO+aK.collisionWidth-aP-aN;
aL.left+=aO-aH}else{if(aI>0&&aO<=0){aL.left=aN}else{if(aO>aI){aL.left=aN+aP-aK.collisionWidth
}else{aL.left=aN}}}}else{if(aO>0){aL.left+=aO}else{if(aI>0){aL.left-=aI
}else{aL.left=aD(aL.left-aM,aL.left)}}}},top:function(aK,aJ){var aI=aJ.within,aO=aI.isWindow?aI.scrollTop:aI.offset.top,aP=aJ.within.height,aM=aK.top-aJ.collisionPosition.marginTop,aN=aO-aM,aL=aM+aJ.collisionHeight-aP-aO,aH;
if(aJ.collisionHeight>aP){if(aN>0&&aL<=0){aH=aK.top+aN+aJ.collisionHeight-aP-aO;
aK.top+=aN-aH}else{if(aL>0&&aN<=0){aK.top=aO}else{if(aN>aL){aK.top=aO+aP-aJ.collisionHeight
}else{aK.top=aO}}}}else{if(aN>0){aK.top+=aN}else{if(aL>0){aK.top-=aL
}else{aK.top=aD(aK.top-aM,aK.top)}}}}},flip:{left:function(aN,aM){var aL=aM.within,aR=aL.offset.left+aL.scrollLeft,aU=aL.width,aJ=aL.isWindow?aL.scrollLeft:aL.offset.left,aO=aN.left-aM.collisionPosition.marginLeft,aS=aO-aJ,aI=aO+aM.collisionWidth-aU-aJ,aQ=aM.my[0]==="left"?-aM.elemWidth:aM.my[0]==="right"?aM.elemWidth:0,aT=aM.at[0]==="left"?aM.targetWidth:aM.at[0]==="right"?-aM.targetWidth:0,aK=-2*aM.offset[0],aH,aP;
if(aS<0){aH=aN.left+aQ+aT+aK+aM.collisionWidth-aU-aR;
if(aH<0||aH<aG(aS)){aN.left+=aQ+aT+aK}}else{if(aI>0){aP=aN.left-aM.collisionPosition.marginLeft+aQ+aT+aK-aJ;
if(aP>0||aG(aP)<aI){aN.left+=aQ+aT+aK}}}},top:function(aM,aL){var aK=aL.within,aT=aK.offset.top+aK.scrollTop,aU=aK.height,aH=aK.isWindow?aK.scrollTop:aK.offset.top,aO=aM.top-aL.collisionPosition.marginTop,aQ=aO-aH,aN=aO+aL.collisionHeight-aU-aH,aR=aL.my[1]==="top",aP=aR?-aL.elemHeight:aL.my[1]==="bottom"?aL.elemHeight:0,aV=aL.at[1]==="top"?aL.targetHeight:aL.at[1]==="bottom"?-aL.targetHeight:0,aJ=-2*aL.offset[1],aS,aI;
if(aQ<0){aI=aM.top+aP+aV+aJ+aL.collisionHeight-aU-aT;
if(aI<0||aI<aG(aQ)){aM.top+=aP+aV+aJ}}else{if(aN>0){aS=aM.top-aL.collisionPosition.marginTop+aP+aV+aJ-aH;
if(aS>0||aG(aS)<aN){aM.top+=aP+aV+aJ}}}}},flipfit:{left:function(){ak.ui.position.flip.left.apply(this,arguments);
ak.ui.position.fit.left.apply(this,arguments)},top:function(){ak.ui.position.flip.top.apply(this,arguments);
ak.ui.position.fit.top.apply(this,arguments)}}}})();
var ah=ak.ui.position;
/*!
 * jQuery UI :data 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var q=ak.extend(ak.expr[":"],{data:ak.expr.createPseudo?ak.expr.createPseudo(function(av){return function(aw){return !!ak.data(aw,av)
}}):function(ax,aw,av){return !!ak.data(ax,av[3])
}});
/*!
 * jQuery UI Disable Selection 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var m=ak.fn.extend({disableSelection:(function(){var av="onselectstart" in document.createElement("div")?"selectstart":"mousedown";
return function(){return this.on(av+".ui-disableSelection",function(aw){aw.preventDefault()
})}})(),enableSelection:function(){return this.off(".ui-disableSelection")
}});
/*!
 * jQuery UI Effects 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var t="ui-effects-",ad="ui-effects-style",ap="ui-effects-animated",b=ak;
ak.effects={effect:{}};
/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function(aJ,ay){var aF="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",aC=/^([\-+])=\s*(\d+\.?\d*)/,aB=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(aK){return[aK[1],aK[2],aK[3],aK[4]]
}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(aK){return[aK[1]*2.55,aK[2]*2.55,aK[3]*2.55,aK[4]]
}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(aK){return[parseInt(aK[1],16),parseInt(aK[2],16),parseInt(aK[3],16)]
}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(aK){return[parseInt(aK[1]+aK[1],16),parseInt(aK[2]+aK[2],16),parseInt(aK[3]+aK[3],16)]
}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(aK){return[aK[1],aK[2]/100,aK[3]/100,aK[4]]
}}],az=aJ.Color=function(aL,aM,aK,aN){return new aJ.Color.fn.parse(aL,aM,aK,aN)
},aE={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},aI={"byte":{floor:true,max:255},percent:{max:1},degrees:{mod:360,floor:true}},aH=az.support={},aw=aJ("<p>")[0],av,aG=aJ.each;
aw.style.cssText="background-color:rgba(1,1,1,.5)";
aH.rgba=aw.style.backgroundColor.indexOf("rgba")>-1;
aG(aE,function(aK,aL){aL.cache="_"+aK;aL.props.alpha={idx:3,type:"percent",def:1}
});function aD(aL,aN,aM){var aK=aI[aN.type]||{};if(aL==null){return(aM||!aN.def)?null:aN.def
}aL=aK.floor?~~aL:parseFloat(aL);if(isNaN(aL)){return aN.def
}if(aK.mod){return(aL+aK.mod)%aK.mod}return 0>aL?0:aK.max<aL?aK.max:aL
}function aA(aK){var aM=az(),aL=aM._rgba=[];aK=aK.toLowerCase();
aG(aB,function(aR,aS){var aP,aQ=aS.re.exec(aK),aO=aQ&&aS.parse(aQ),aN=aS.space||"rgba";
if(aO){aP=aM[aN](aO);aM[aE[aN].cache]=aP[aE[aN].cache];
aL=aM._rgba=aP._rgba;return false}});if(aL.length){if(aL.join()==="0,0,0,0"){aJ.extend(aL,av.transparent)
}return aM}return av[aK]}az.fn=aJ.extend(az.prototype,{parse:function(aQ,aO,aK,aP){if(aQ===ay){this._rgba=[null,null,null,null];
return this}if(aQ.jquery||aQ.nodeType){aQ=aJ(aQ).css(aO);
aO=ay}var aN=this,aM=aJ.type(aQ),aL=this._rgba=[];
if(aO!==ay){aQ=[aQ,aO,aK,aP];aM="array"}if(aM==="string"){return this.parse(aA(aQ)||av._default)
}if(aM==="array"){aG(aE.rgba.props,function(aR,aS){aL[aS.idx]=aD(aQ[aS.idx],aS)
});return this}if(aM==="object"){if(aQ instanceof az){aG(aE,function(aR,aS){if(aQ[aS.cache]){aN[aS.cache]=aQ[aS.cache].slice()
}})}else{aG(aE,function(aS,aT){var aR=aT.cache;aG(aT.props,function(aU,aV){if(!aN[aR]&&aT.to){if(aU==="alpha"||aQ[aU]==null){return
}aN[aR]=aT.to(aN._rgba)}aN[aR][aV.idx]=aD(aQ[aU],aV,true)
});if(aN[aR]&&aJ.inArray(null,aN[aR].slice(0,3))<0){aN[aR][3]=1;
if(aT.from){aN._rgba=aT.from(aN[aR])}}})}return this
}},is:function(aM){var aK=az(aM),aN=true,aL=this;
aG(aE,function(aO,aQ){var aR,aP=aK[aQ.cache];if(aP){aR=aL[aQ.cache]||aQ.to&&aQ.to(aL._rgba)||[];
aG(aQ.props,function(aS,aT){if(aP[aT.idx]!=null){aN=(aP[aT.idx]===aR[aT.idx]);
return aN}})}return aN});return aN},_space:function(){var aK=[],aL=this;
aG(aE,function(aM,aN){if(aL[aN.cache]){aK.push(aM)
}});return aK.pop()},transition:function(aL,aR){var aM=az(aL),aN=aM._space(),aO=aE[aN],aP=this.alpha()===0?az("transparent"):this,aQ=aP[aO.cache]||aO.to(aP._rgba),aK=aQ.slice();
aM=aM[aO.cache];aG(aO.props,function(aV,aX){var aU=aX.idx,aT=aQ[aU],aS=aM[aU],aW=aI[aX.type]||{};
if(aS===null){return}if(aT===null){aK[aU]=aS}else{if(aW.mod){if(aS-aT>aW.mod/2){aT+=aW.mod
}else{if(aT-aS>aW.mod/2){aT-=aW.mod}}}aK[aU]=aD((aS-aT)*aR+aT,aX)
}});return this[aN](aK)},blend:function(aN){if(this._rgba[3]===1){return this
}var aM=this._rgba.slice(),aL=aM.pop(),aK=az(aN)._rgba;
return az(aJ.map(aM,function(aO,aP){return(1-aL)*aK[aP]+aL*aO
}))},toRgbaString:function(){var aL="rgba(",aK=aJ.map(this._rgba,function(aM,aN){return aM==null?(aN>2?1:0):aM
});if(aK[3]===1){aK.pop();aL="rgb("}return aL+aK.join()+")"
},toHslaString:function(){var aL="hsla(",aK=aJ.map(this.hsla(),function(aM,aN){if(aM==null){aM=aN>2?1:0
}if(aN&&aN<3){aM=Math.round(aM*100)+"%"}return aM
});if(aK[3]===1){aK.pop();aL="hsl("}return aL+aK.join()+")"
},toHexString:function(aK){var aL=this._rgba.slice(),aM=aL.pop();
if(aK){aL.push(~~(aM*255))}return"#"+aJ.map(aL,function(aN){aN=(aN||0).toString(16);
return aN.length===1?"0"+aN:aN}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()
}});az.fn.parse.prototype=az.fn;function ax(aM,aL,aK){aK=(aK+1)%1;
if(aK*6<1){return aM+(aL-aM)*aK*6}if(aK*2<1){return aL
}if(aK*3<2){return aM+(aL-aM)*((2/3)-aK)*6}return aM
}aE.hsla.to=function(aM){if(aM[0]==null||aM[1]==null||aM[2]==null){return[null,null,null,aM[3]]
}var aK=aM[0]/255,aP=aM[1]/255,aQ=aM[2]/255,aS=aM[3],aR=Math.max(aK,aP,aQ),aN=Math.min(aK,aP,aQ),aT=aR-aN,aU=aR+aN,aL=aU*0.5,aO,aV;
if(aN===aR){aO=0}else{if(aK===aR){aO=(60*(aP-aQ)/aT)+360
}else{if(aP===aR){aO=(60*(aQ-aK)/aT)+120}else{aO=(60*(aK-aP)/aT)+240
}}}if(aT===0){aV=0}else{if(aL<=0.5){aV=aT/aU}else{aV=aT/(2-aU)
}}return[Math.round(aO)%360,aV,aL,aS==null?1:aS]};
aE.hsla.from=function(aO){if(aO[0]==null||aO[1]==null||aO[2]==null){return[null,null,null,aO[3]]
}var aN=aO[0]/360,aM=aO[1],aL=aO[2],aK=aO[3],aP=aL<=0.5?aL*(1+aM):aL+aM-aL*aM,aQ=2*aL-aP;
return[Math.round(ax(aQ,aP,aN+(1/3))*255),Math.round(ax(aQ,aP,aN)*255),Math.round(ax(aQ,aP,aN-(1/3))*255),aK]
};aG(aE,function(aL,aN){var aM=aN.props,aK=aN.cache,aP=aN.to,aO=aN.from;
az.fn[aL]=function(aU){if(aP&&!this[aK]){this[aK]=aP(this._rgba)
}if(aU===ay){return this[aK].slice()}var aR,aT=aJ.type(aU),aQ=(aT==="array"||aT==="object")?aU:arguments,aS=this[aK].slice();
aG(aM,function(aV,aX){var aW=aQ[aT==="object"?aV:aX.idx];
if(aW==null){aW=aS[aX.idx]}aS[aX.idx]=aD(aW,aX)});
if(aO){aR=az(aO(aS));aR[aK]=aS;return aR}else{return az(aS)
}};aG(aM,function(aQ,aR){if(az.fn[aQ]){return}az.fn[aQ]=function(aV){var aX=aJ.type(aV),aU=(aQ==="alpha"?(this._hsla?"hsla":"rgba"):aL),aT=this[aU](),aW=aT[aR.idx],aS;
if(aX==="undefined"){return aW}if(aX==="function"){aV=aV.call(this,aW);
aX=aJ.type(aV)}if(aV==null&&aR.empty){return this
}if(aX==="string"){aS=aC.exec(aV);if(aS){aV=aW+parseFloat(aS[2])*(aS[1]==="+"?1:-1)
}}aT[aR.idx]=aV;return this[aU](aT)}})});az.hook=function(aL){var aK=aL.split(" ");
aG(aK,function(aM,aN){aJ.cssHooks[aN]={set:function(aR,aS){var aP,aQ,aO="";
if(aS!=="transparent"&&(aJ.type(aS)!=="string"||(aP=aA(aS)))){aS=az(aP||aS);
if(!aH.rgba&&aS._rgba[3]!==1){aQ=aN==="backgroundColor"?aR.parentNode:aR;
while((aO===""||aO==="transparent")&&aQ&&aQ.style){try{aO=aJ.css(aQ,"backgroundColor");
aQ=aQ.parentNode}catch(aT){}}aS=aS.blend(aO&&aO!=="transparent"?aO:"_default")
}aS=aS.toRgbaString()}try{aR.style[aN]=aS}catch(aT){}}};
aJ.fx.step[aN]=function(aO){if(!aO.colorInit){aO.start=az(aO.elem,aN);
aO.end=az(aO.end);aO.colorInit=true}aJ.cssHooks[aN].set(aO.elem,aO.start.transition(aO.end,aO.pos))
}})};az.hook(aF);aJ.cssHooks.borderColor={expand:function(aL){var aK={};
aG(["Top","Right","Bottom","Left"],function(aN,aM){aK["border"+aM+"Color"]=aL
});return aK}};av=aJ.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}
})(b);(function(){var aw=["add","remove","toggle"],ax={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
ak.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(az,aA){ak.fx.step[aA]=function(aB){if(aB.end!=="none"&&!aB.setAttr||aB.pos===1&&!aB.setAttr){b.style(aB.elem,aA,aB.end);
aB.setAttr=true}}});function ay(aD){var aA,az,aB=aD.ownerDocument.defaultView?aD.ownerDocument.defaultView.getComputedStyle(aD,null):aD.currentStyle,aC={};
if(aB&&aB.length&&aB[0]&&aB[aB[0]]){az=aB.length;
while(az--){aA=aB[az];if(typeof aB[aA]==="string"){aC[ak.camelCase(aA)]=aB[aA]
}}}else{for(aA in aB){if(typeof aB[aA]==="string"){aC[aA]=aB[aA]
}}}return aC}function av(az,aB){var aD={},aA,aC;for(aA in aB){aC=aB[aA];
if(az[aA]!==aC){if(!ax[aA]){if(ak.fx.step[aA]||!isNaN(parseFloat(aC))){aD[aA]=aC
}}}}return aD}if(!ak.fn.addBack){ak.fn.addBack=function(az){return this.add(az==null?this.prevObject:this.prevObject.filter(az))
}}ak.effects.animateClass=function(az,aA,aD,aC){var aB=ak.speed(aA,aD,aC);
return this.queue(function(){var aG=ak(this),aE=aG.attr("class")||"",aF,aH=aB.children?aG.find("*").addBack():aG;
aH=aH.map(function(){var aI=ak(this);return{el:aI,start:ay(this)}
});aF=function(){ak.each(aw,function(aI,aJ){if(az[aJ]){aG[aJ+"Class"](az[aJ])
}})};aF();aH=aH.map(function(){this.end=ay(this.el[0]);
this.diff=av(this.start,this.end);return this});aG.attr("class",aE);
aH=aH.map(function(){var aK=this,aI=ak.Deferred(),aJ=ak.extend({},aB,{queue:false,complete:function(){aI.resolve(aK)
}});this.el.animate(this.diff,aJ);return aI.promise()
});ak.when.apply(ak,aH.get()).done(function(){aF();
ak.each(arguments,function(){var aI=this.el;ak.each(this.diff,function(aJ){aI.css(aJ,"")
})});aB.complete.call(aG[0])})})};ak.fn.extend({addClass:(function(az){return function(aB,aA,aD,aC){return aA?ak.effects.animateClass.call(this,{add:aB},aA,aD,aC):az.apply(this,arguments)
}})(ak.fn.addClass),removeClass:(function(az){return function(aB,aA,aD,aC){return arguments.length>1?ak.effects.animateClass.call(this,{remove:aB},aA,aD,aC):az.apply(this,arguments)
}})(ak.fn.removeClass),toggleClass:(function(az){return function(aC,aB,aA,aE,aD){if(typeof aB==="boolean"||aB===undefined){if(!aA){return az.apply(this,arguments)
}else{return ak.effects.animateClass.call(this,(aB?{add:aC}:{remove:aC}),aA,aE,aD)
}}else{return ak.effects.animateClass.call(this,{toggle:aC},aB,aA,aE)
}}})(ak.fn.toggleClass),switchClass:function(az,aB,aA,aD,aC){return ak.effects.animateClass.call(this,{add:aB,remove:az},aA,aD,aC)
}})})();(function(){if(ak.expr&&ak.expr.filters&&ak.expr.filters.animated){ak.expr.filters.animated=(function(ay){return function(az){return !!ak(az).data(ap)||ay(az)
}})(ak.expr.filters.animated)}if(ak.uiBackCompat!==false){ak.extend(ak.effects,{save:function(az,aB){var ay=0,aA=aB.length;
for(;ay<aA;ay++){if(aB[ay]!==null){az.data(t+aB[ay],az[0].style[aB[ay]])
}}},restore:function(az,aC){var aB,ay=0,aA=aC.length;
for(;ay<aA;ay++){if(aC[ay]!==null){aB=az.data(t+aC[ay]);
az.css(aC[ay],aB)}}},setMode:function(ay,az){if(az==="toggle"){az=ay.is(":hidden")?"show":"hide"
}return az},createWrapper:function(az){if(az.parent().is(".ui-effects-wrapper")){return az.parent()
}var aA={width:az.outerWidth(true),height:az.outerHeight(true),"float":az.css("float")},aD=ak("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),ay={width:az.width(),height:az.height()},aC=document.activeElement;
try{aC.id}catch(aB){aC=document.body}az.wrap(aD);
if(az[0]===aC||ak.contains(az[0],aC)){ak(aC).trigger("focus")
}aD=az.parent();if(az.css("position")==="static"){aD.css({position:"relative"});
az.css({position:"relative"})}else{ak.extend(aA,{position:az.css("position"),zIndex:az.css("z-index")});
ak.each(["top","left","bottom","right"],function(aE,aF){aA[aF]=az.css(aF);
if(isNaN(parseInt(aA[aF],10))){aA[aF]="auto"}});az.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}az.css(ay);return aD.css(aA).show()},removeWrapper:function(ay){var az=document.activeElement;
if(ay.parent().is(".ui-effects-wrapper")){ay.parent().replaceWith(ay);
if(ay[0]===az||ak.contains(ay[0],az)){ak(az).trigger("focus")
}}return ay}})}ak.extend(ak.effects,{version:"1.12.1",define:function(ay,aA,az){if(!az){az=aA;
aA="effect"}ak.effects.effect[ay]=az;ak.effects.effect[ay].mode=aA;
return az},scaledDimensions:function(az,aA,aB){if(aA===0){return{height:0,width:0,outerHeight:0,outerWidth:0}
}var ay=aB!=="horizontal"?((aA||100)/100):1,aC=aB!=="vertical"?((aA||100)/100):1;
return{height:az.height()*aC,width:az.width()*ay,outerHeight:az.outerHeight()*aC,outerWidth:az.outerWidth()*ay}
},clipToBox:function(ay){return{width:ay.clip.right-ay.clip.left,height:ay.clip.bottom-ay.clip.top,left:ay.clip.left,top:ay.clip.top}
},unshift:function(az,aB,aA){var ay=az.queue();if(aB>1){ay.splice.apply(ay,[1,0].concat(ay.splice(aB,aA)))
}az.dequeue()},saveStyle:function(ay){ay.data(ad,ay[0].style.cssText)
},restoreStyle:function(ay){ay[0].style.cssText=ay.data(ad)||"";
ay.removeData(ad)},mode:function(ay,aA){var az=ay.is(":hidden");
if(aA==="toggle"){aA=az?"show":"hide"}if(az?aA==="hide":aA==="show"){aA="none"
}return aA},getBaseline:function(az,aA){var aB,ay;
switch(az[0]){case"top":aB=0;break;case"middle":aB=0.5;
break;case"bottom":aB=1;break;default:aB=az[0]/aA.height
}switch(az[1]){case"left":ay=0;break;case"center":ay=0.5;
break;case"right":ay=1;break;default:ay=az[1]/aA.width
}return{x:ay,y:aB}},createPlaceholder:function(az){var aB,aA=az.css("position"),ay=az.position();
az.css({marginTop:az.css("marginTop"),marginBottom:az.css("marginBottom"),marginLeft:az.css("marginLeft"),marginRight:az.css("marginRight")}).outerWidth(az.outerWidth()).outerHeight(az.outerHeight());
if(/^(static|relative)/.test(aA)){aA="absolute";aB=ak("<"+az[0].nodeName+">").insertAfter(az).css({display:/^(inline|ruby)/.test(az.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:az.css("marginTop"),marginBottom:az.css("marginBottom"),marginLeft:az.css("marginLeft"),marginRight:az.css("marginRight"),"float":az.css("float")}).outerWidth(az.outerWidth()).outerHeight(az.outerHeight()).addClass("ui-effects-placeholder");
az.data(t+"placeholder",aB)}az.css({position:aA,left:ay.left,top:ay.top});
return aB},removePlaceholder:function(ay){var aA=t+"placeholder",az=ay.data(aA);
if(az){az.remove();ay.removeData(aA)}},cleanUp:function(ay){ak.effects.restoreStyle(ay);
ak.effects.removePlaceholder(ay)},setTransition:function(az,aB,ay,aA){aA=aA||{};
ak.each(aB,function(aD,aC){var aE=az.cssUnit(aC);
if(aE[0]>0){aA[aC]=aE[0]*ay+aE[1]}});return aA}});
function aw(az,ay,aA,aB){if(ak.isPlainObject(az)){ay=az;
az=az.effect}az={effect:az};if(ay==null){ay={}}if(ak.isFunction(ay)){aB=ay;
aA=null;ay={}}if(typeof ay==="number"||ak.fx.speeds[ay]){aB=aA;
aA=ay;ay={}}if(ak.isFunction(aA)){aB=aA;aA=null}if(ay){ak.extend(az,ay)
}aA=aA||ay.duration;az.duration=ak.fx.off?0:typeof aA==="number"?aA:aA in ak.fx.speeds?ak.fx.speeds[aA]:ak.fx.speeds._default;
az.complete=aB||ay.complete;return az}function ax(ay){if(!ay||typeof ay==="number"||ak.fx.speeds[ay]){return true
}if(typeof ay==="string"&&!ak.effects.effect[ay]){return true
}if(ak.isFunction(ay)){return true}if(typeof ay==="object"&&!ay.effect){return true
}return false}ak.fn.extend({effect:function(){var aG=aw.apply(this,arguments),aF=ak.effects.effect[aG.effect],aC=aF.mode,aE=aG.queue,aB=aE||"fx",ay=aG.complete,aD=aG.mode,az=[],aH=function(aK){var aJ=ak(this),aI=ak.effects.mode(aJ,aD)||aC;
aJ.data(ap,true);az.push(aI);if(aC&&(aI==="show"||(aI===aC&&aI==="hide"))){aJ.show()
}if(!aC||aI!=="none"){ak.effects.saveStyle(aJ)}if(ak.isFunction(aK)){aK()
}};if(ak.fx.off||!aF){if(aD){return this[aD](aG.duration,ay)
}else{return this.each(function(){if(ay){ay.call(this)
}})}}function aA(aK){var aL=ak(this);function aJ(){aL.removeData(ap);
ak.effects.cleanUp(aL);if(aG.mode==="hide"){aL.hide()
}aI()}function aI(){if(ak.isFunction(ay)){ay.call(aL[0])
}if(ak.isFunction(aK)){aK()}}aG.mode=az.shift();if(ak.uiBackCompat!==false&&!aC){if(aL.is(":hidden")?aD==="hide":aD==="show"){aL[aD]();
aI()}else{aF.call(aL[0],aG,aI)}}else{if(aG.mode==="none"){aL[aD]();
aI()}else{aF.call(aL[0],aG,aJ)}}}return aE===false?this.each(aH).each(aA):this.queue(aB,aH).queue(aB,aA)
},show:(function(ay){return function(aA){if(ax(aA)){return ay.apply(this,arguments)
}else{var az=aw.apply(this,arguments);az.mode="show";
return this.effect.call(this,az)}}})(ak.fn.show),hide:(function(ay){return function(aA){if(ax(aA)){return ay.apply(this,arguments)
}else{var az=aw.apply(this,arguments);az.mode="hide";
return this.effect.call(this,az)}}})(ak.fn.hide),toggle:(function(ay){return function(aA){if(ax(aA)||typeof aA==="boolean"){return ay.apply(this,arguments)
}else{var az=aw.apply(this,arguments);az.mode="toggle";
return this.effect.call(this,az)}}})(ak.fn.toggle),cssUnit:function(ay){var az=this.css(ay),aA=[];
ak.each(["em","px","%","pt"],function(aB,aC){if(az.indexOf(aC)>0){aA=[parseFloat(az),aC]
}});return aA},cssClip:function(ay){if(ay){return this.css("clip","rect("+ay.top+"px "+ay.right+"px "+ay.bottom+"px "+ay.left+"px)")
}return av(this.css("clip"),this)},transfer:function(aJ,aB){var aD=ak(this),aF=ak(aJ.to),aI=aF.css("position")==="fixed",aE=ak("body"),aG=aI?aE.scrollTop():0,aH=aI?aE.scrollLeft():0,ay=aF.offset(),aA={top:ay.top-aG,left:ay.left-aH,height:aF.innerHeight(),width:aF.innerWidth()},aC=aD.offset(),az=ak("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(aJ.className).css({top:aC.top-aG,left:aC.left-aH,height:aD.innerHeight(),width:aD.innerWidth(),position:aI?"fixed":"absolute"}).animate(aA,aJ.duration,aJ.easing,function(){az.remove();
if(ak.isFunction(aB)){aB()}})}});function av(aD,aA){var aC=aA.outerWidth(),aB=aA.outerHeight(),az=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,ay=az.exec(aD)||["",0,aC,aB,0];
return{top:parseFloat(ay[1])||0,right:ay[2]==="auto"?aC:parseFloat(ay[2]),bottom:ay[3]==="auto"?aB:parseFloat(ay[3]),left:parseFloat(ay[4])||0}
}ak.fx.step.clip=function(ay){if(!ay.clipInit){ay.start=ak(ay.elem).cssClip();
if(typeof ay.end==="string"){ay.end=av(ay.end,ay.elem)
}ay.clipInit=true}ak(ay.elem).cssClip({top:ay.pos*(ay.end.top-ay.start.top)+ay.start.top,right:ay.pos*(ay.end.right-ay.start.right)+ay.start.right,bottom:ay.pos*(ay.end.bottom-ay.start.bottom)+ay.start.bottom,left:ay.pos*(ay.end.left-ay.start.left)+ay.start.left})
}})();(function(){var av={};ak.each(["Quad","Cubic","Quart","Quint","Expo"],function(ax,aw){av[aw]=function(ay){return Math.pow(ay,ax+2)
}});ak.extend(av,{Sine:function(aw){return 1-Math.cos(aw*Math.PI/2)
},Circ:function(aw){return 1-Math.sqrt(1-aw*aw)},Elastic:function(aw){return aw===0||aw===1?aw:-Math.pow(2,8*(aw-1))*Math.sin(((aw-1)*80-7.5)*Math.PI/15)
},Back:function(aw){return aw*aw*(3*aw-2)},Bounce:function(ay){var aw,ax=4;
while(ay<((aw=Math.pow(2,--ax))-1)/11){}return 1/Math.pow(4,3-ax)-7.5625*Math.pow((aw*3-2)/22-ay,2)
}});ak.each(av,function(ax,aw){ak.easing["easeIn"+ax]=aw;
ak.easing["easeOut"+ax]=function(ay){return 1-aw(1-ay)
};ak.easing["easeInOut"+ax]=function(ay){return ay<0.5?aw(ay*2)/2:1-aw(ay*-2+2)/2
}})})();var H=ak.effects;
/*!
 * jQuery UI Effects Blind 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var E=ak.effects.define("blind","hide",function(ax,av){var aA={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},ay=ak(this),az=ax.direction||"up",aC=ay.cssClip(),aw={clip:ak.extend({},aC)},aB=ak.effects.createPlaceholder(ay);
aw.clip[aA[az][0]]=aw.clip[aA[az][1]];if(ax.mode==="show"){ay.cssClip(aw.clip);
if(aB){aB.css(ak.effects.clipToBox(aw))}aw.clip=aC
}if(aB){aB.animate(ak.effects.clipToBox(aw),ax.duration,ax.easing)
}ay.animate(aw,{queue:false,duration:ax.duration,easing:ax.easing,complete:av})
});
/*!
 * jQuery UI Effects Bounce 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var z=ak.effects.define("bounce",function(aw,aD){var az,aH,aK,av=ak(this),aC=aw.mode,aB=aC==="hide",aL=aC==="show",aM=aw.direction||"up",ax=aw.distance,aA=aw.times||5,aN=aA*2+(aL||aB?1:0),aJ=aw.duration/aN,aF=aw.easing,ay=(aM==="up"||aM==="down")?"top":"left",aE=(aM==="up"||aM==="left"),aI=0,aG=av.queue().length;
ak.effects.createPlaceholder(av);aK=av.css(ay);if(!ax){ax=av[ay==="top"?"outerHeight":"outerWidth"]()/3
}if(aL){aH={opacity:1};aH[ay]=aK;av.css("opacity",0).css(ay,aE?-ax*2:ax*2).animate(aH,aJ,aF)
}if(aB){ax=ax/Math.pow(2,aA-1)}aH={};aH[ay]=aK;for(;
aI<aA;aI++){az={};az[ay]=(aE?"-=":"+=")+ax;av.animate(az,aJ,aF).animate(aH,aJ,aF);
ax=aB?ax*2:ax/2}if(aB){az={opacity:0};az[ay]=(aE?"-=":"+=")+ax;
av.animate(az,aJ,aF)}av.queue(aD);ak.effects.unshift(av,aG,aN+1)
});
/*!
 * jQuery UI Effects Clip 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var ae=ak.effects.define("clip","hide",function(aD,az){var aw,ax={},aA=ak(this),aC=aD.direction||"vertical",aB=aC==="both",av=aB||aC==="horizontal",ay=aB||aC==="vertical";
aw=aA.cssClip();ax.clip={top:ay?(aw.bottom-aw.top)/2:aw.top,right:av?(aw.right-aw.left)/2:aw.right,bottom:ay?(aw.bottom-aw.top)/2:aw.bottom,left:av?(aw.right-aw.left)/2:aw.left};
ak.effects.createPlaceholder(aA);if(aD.mode==="show"){aA.cssClip(ax.clip);
ax.clip=aw}aA.animate(ax,{queue:false,duration:aD.duration,easing:aD.easing,complete:az})
});
/*!
 * jQuery UI Effects Drop 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var V=ak.effects.define("drop","hide",function(aF,ay){var av,az=ak(this),aB=aF.mode,aD=aB==="show",aC=aF.direction||"left",aw=(aC==="up"||aC==="down")?"top":"left",aE=(aC==="up"||aC==="left")?"-=":"+=",aA=(aE==="+=")?"-=":"+=",ax={opacity:0};
ak.effects.createPlaceholder(az);av=aF.distance||az[aw==="top"?"outerHeight":"outerWidth"](true)/2;
ax[aw]=aE+av;if(aD){az.css(ax);ax[aw]=aA+av;ax.opacity=1
}az.animate(ax,{queue:false,duration:aF.duration,easing:aF.easing,complete:ay})
});
/*!
 * jQuery UI Effects Explode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var at=ak.effects.define("explode","hide",function(aw,aI){var aL,aK,ay,aG,aF,aD,aC=aw.pieces?Math.round(Math.sqrt(aw.pieces)):3,ax=aC,av=ak(this),aE=aw.mode,aM=aE==="show",aA=av.show().css("visibility","hidden").offset(),aJ=Math.ceil(av.outerWidth()/ax),aH=Math.ceil(av.outerHeight()/aC),aB=[];
function aN(){aB.push(this);if(aB.length===aC*ax){az()
}}for(aL=0;aL<aC;aL++){aG=aA.top+aL*aH;aD=aL-(aC-1)/2;
for(aK=0;aK<ax;aK++){ay=aA.left+aK*aJ;aF=aK-(ax-1)/2;
av.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-aK*aJ,top:-aL*aH}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:aJ,height:aH,left:ay+(aM?aF*aJ:0),top:aG+(aM?aD*aH:0),opacity:aM?0:1}).animate({left:ay+(aM?0:aF*aJ),top:aG+(aM?0:aD*aH),opacity:aM?1:0},aw.duration||500,aw.easing,aN)
}}function az(){av.css({visibility:"visible"});ak(aB).remove();
aI()}});
/*!
 * jQuery UI Effects Fade 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var au=ak.effects.define("fade","toggle",function(ax,aw){var av=ax.mode==="show";
ak(this).css("opacity",av?0:1).animate({opacity:av?1:0},{queue:false,duration:ax.duration,easing:ax.easing,complete:aw})
});
/*!
 * jQuery UI Effects Fold 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var u=ak.effects.define("fold","hide",function(aL,aA){var aB=ak(this),aC=aL.mode,aI=aC==="show",aD=aC==="hide",aK=aL.size||15,aE=/([0-9]+)%/.exec(aK),aJ=!!aL.horizFirst,ay=aJ?["right","bottom"]:["bottom","right"],az=aL.duration/2,aH=ak.effects.createPlaceholder(aB),aw=aB.cssClip(),aG={clip:ak.extend({},aw)},aF={clip:ak.extend({},aw)},av=[aw[ay[0]],aw[ay[1]]],ax=aB.queue().length;
if(aE){aK=parseInt(aE[1],10)/100*av[aD?0:1]}aG.clip[ay[0]]=aK;
aF.clip[ay[0]]=aK;aF.clip[ay[1]]=0;if(aI){aB.cssClip(aF.clip);
if(aH){aH.css(ak.effects.clipToBox(aF))}aF.clip=aw
}aB.queue(function(aM){if(aH){aH.animate(ak.effects.clipToBox(aG),az,aL.easing).animate(ak.effects.clipToBox(aF),az,aL.easing)
}aM()}).animate(aG,az,aL.easing).animate(aF,az,aL.easing).queue(aA);
ak.effects.unshift(aB,ax,4)});
/*!
 * jQuery UI Effects Highlight 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var J=ak.effects.define("highlight","show",function(aw,av){var ax=ak(this),ay={backgroundColor:ax.css("backgroundColor")};
if(aw.mode==="hide"){ay.opacity=0}ak.effects.saveStyle(ax);
ax.css({backgroundImage:"none",backgroundColor:aw.color||"#ffff99"}).animate(ay,{queue:false,duration:aw.duration,easing:aw.easing,complete:av})
});
/*!
 * jQuery UI Effects Size 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var S=ak.effects.define("size",function(ay,aE){var aC,aD,aI,av=ak(this),aA=["fontSize"],aJ=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],ax=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],aB=ay.mode,aH=aB!=="effect",aM=ay.scale||"both",aK=ay.origin||["middle","center"],aL=av.css("position"),az=av.position(),aF=ak.effects.scaledDimensions(av),aG=ay.from||aF,aw=ay.to||ak.effects.scaledDimensions(av,0);
ak.effects.createPlaceholder(av);if(aB==="show"){aI=aG;
aG=aw;aw=aI}aD={from:{y:aG.height/aF.height,x:aG.width/aF.width},to:{y:aw.height/aF.height,x:aw.width/aF.width}};
if(aM==="box"||aM==="both"){if(aD.from.y!==aD.to.y){aG=ak.effects.setTransition(av,aJ,aD.from.y,aG);
aw=ak.effects.setTransition(av,aJ,aD.to.y,aw)}if(aD.from.x!==aD.to.x){aG=ak.effects.setTransition(av,ax,aD.from.x,aG);
aw=ak.effects.setTransition(av,ax,aD.to.x,aw)}}if(aM==="content"||aM==="both"){if(aD.from.y!==aD.to.y){aG=ak.effects.setTransition(av,aA,aD.from.y,aG);
aw=ak.effects.setTransition(av,aA,aD.to.y,aw)}}if(aK){aC=ak.effects.getBaseline(aK,aF);
aG.top=(aF.outerHeight-aG.outerHeight)*aC.y+az.top;
aG.left=(aF.outerWidth-aG.outerWidth)*aC.x+az.left;
aw.top=(aF.outerHeight-aw.outerHeight)*aC.y+az.top;
aw.left=(aF.outerWidth-aw.outerWidth)*aC.x+az.left
}av.css(aG);if(aM==="content"||aM==="both"){aJ=aJ.concat(["marginTop","marginBottom"]).concat(aA);
ax=ax.concat(["marginLeft","marginRight"]);av.find("*[width]").each(function(){var aQ=ak(this),aN=ak.effects.scaledDimensions(aQ),aP={height:aN.height*aD.from.y,width:aN.width*aD.from.x,outerHeight:aN.outerHeight*aD.from.y,outerWidth:aN.outerWidth*aD.from.x},aO={height:aN.height*aD.to.y,width:aN.width*aD.to.x,outerHeight:aN.height*aD.to.y,outerWidth:aN.width*aD.to.x};
if(aD.from.y!==aD.to.y){aP=ak.effects.setTransition(aQ,aJ,aD.from.y,aP);
aO=ak.effects.setTransition(aQ,aJ,aD.to.y,aO)}if(aD.from.x!==aD.to.x){aP=ak.effects.setTransition(aQ,ax,aD.from.x,aP);
aO=ak.effects.setTransition(aQ,ax,aD.to.x,aO)}if(aH){ak.effects.saveStyle(aQ)
}aQ.css(aP);aQ.animate(aO,ay.duration,ay.easing,function(){if(aH){ak.effects.restoreStyle(aQ)
}})})}av.animate(aw,{queue:false,duration:ay.duration,easing:ay.easing,complete:function(){var aN=av.offset();
if(aw.opacity===0){av.css("opacity",aG.opacity)}if(!aH){av.css("position",aL==="static"?"relative":aL).offset(aN);
ak.effects.saveStyle(av)}aE()}})});
/*!
 * jQuery UI Effects Scale 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var O=ak.effects.define("scale",function(aw,av){var ax=ak(this),aA=aw.mode,ay=parseInt(aw.percent,10)||(parseInt(aw.percent,10)===0?0:(aA!=="effect"?0:100)),az=ak.extend(true,{from:ak.effects.scaledDimensions(ax),to:ak.effects.scaledDimensions(ax,ay,aw.direction||"both"),origin:aw.origin||["middle","center"]},aw);
if(aw.fade){az.from.opacity=1;az.to.opacity=0}ak.effects.effect.size.call(this,az,av)
});
/*!
 * jQuery UI Effects Puff 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var A=ak.effects.define("puff","hide",function(aw,av){var ax=ak.extend(true,{},aw,{fade:true,percent:parseInt(aw.percent,10)||150});
ak.effects.effect.scale.call(this,ax,av)});
/*!
 * jQuery UI Effects Pulsate 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var x=ak.effects.define("pulsate","show",function(aG,ax){var az=ak(this),aA=aG.mode,aE=aA==="show",aB=aA==="hide",aF=aE||aB,aC=((aG.times||5)*2)+(aF?1:0),aw=aG.duration/aC,aD=0,ay=1,av=az.queue().length;
if(aE||!az.is(":visible")){az.css("opacity",0).show();
aD=1}for(;ay<aC;ay++){az.animate({opacity:aD},aw,aG.easing);
aD=1-aD}az.animate({opacity:aD},aw,aG.easing);az.queue(ax);
ak.effects.unshift(az,av,aC+1)});
/*!
 * jQuery UI Effects Shake 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var aj=ak.effects.define("shake",function(aJ,aC){var aD=1,aE=ak(this),aG=aJ.direction||"left",av=aJ.distance||20,aw=aJ.times||3,aH=aw*2+1,aA=Math.round(aJ.duration/aH),az=(aG==="up"||aG==="down")?"top":"left",ax=(aG==="up"||aG==="left"),aB={},aI={},aF={},ay=aE.queue().length;
ak.effects.createPlaceholder(aE);aB[az]=(ax?"-=":"+=")+av;
aI[az]=(ax?"+=":"-=")+av*2;aF[az]=(ax?"-=":"+=")+av*2;
aE.animate(aB,aA,aJ.easing);for(;aD<aw;aD++){aE.animate(aI,aA,aJ.easing).animate(aF,aA,aJ.easing)
}aE.animate(aI,aA,aJ.easing).animate(aB,aA/2,aJ.easing).queue(aC);
ak.effects.unshift(aE,ay,aH+1)});
/*!
 * jQuery UI Effects Slide 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var ai=ak.effects.define("slide","show",function(aG,aC){var az,aw,aD=ak(this),ax={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},aE=aG.mode,aF=aG.direction||"left",aA=(aF==="up"||aF==="down")?"top":"left",ay=(aF==="up"||aF==="left"),av=aG.distance||aD[aA==="top"?"outerHeight":"outerWidth"](true),aB={};
ak.effects.createPlaceholder(aD);az=aD.cssClip();
aw=aD.position()[aA];aB[aA]=(ay?-1:1)*av+aw;aB.clip=aD.cssClip();
aB.clip[ax[aF][1]]=aB.clip[ax[aF][0]];if(aE==="show"){aD.cssClip(aB.clip);
aD.css(aA,aB[aA]);aB.clip=az;aB[aA]=aw}aD.animate(aB,{queue:false,duration:aG.duration,easing:aG.easing,complete:aC})
});
/*!
 * jQuery UI Effects Transfer 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var H;if(ak.uiBackCompat!==false){H=ak.effects.define("transfer",function(aw,av){ak(this).transfer(aw,av)
})}var M=H;
/*!
 * jQuery UI Focusable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.ui.focusable=function(ay,aw){var aB,az,ax,aA,av,aC=ay.nodeName.toLowerCase();
if("area"===aC){aB=ay.parentNode;az=aB.name;if(!ay.href||!az||aB.nodeName.toLowerCase()!=="map"){return false
}ax=ak("img[usemap='#"+az+"']");return ax.length>0&&ax.is(":visible")
}if(/^(input|select|textarea|button|object)$/.test(aC)){aA=!ay.disabled;
if(aA){av=ak(ay).closest("fieldset")[0];if(av){aA=!av.disabled
}}}else{if("a"===aC){aA=ay.href||aw}else{aA=aw}}return aA&&ak(ay).is(":visible")&&o(ak(ay))
};function o(aw){var av=aw.css("visibility");while(av==="inherit"){aw=aw.parent();
av=aw.css("visibility")}return av!=="hidden"}ak.extend(ak.expr[":"],{focusable:function(av){return ak.ui.focusable(av,ak.attr(av,"tabindex")!=null)
}});var ar=ak.ui.focusable;var i=ak.fn.form=function(){return typeof this[0].form==="string"?this.closest("form"):ak(this[0].form)
};
/*!
 * jQuery UI Form Reset Mixin 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var N=ak.ui.formResetMixin={_formResetHandler:function(){var av=ak(this);
setTimeout(function(){var aw=av.data("ui-form-reset-instances");
ak.each(aw,function(){this.refresh()})})},_bindFormResetHandler:function(){this.form=this.element.form();
if(!this.form.length){return}var av=this.form.data("ui-form-reset-instances")||[];
if(!av.length){this.form.on("reset.ui-form-reset",this._formResetHandler)
}av.push(this);this.form.data("ui-form-reset-instances",av)
},_unbindFormResetHandler:function(){if(!this.form.length){return
}var av=this.form.data("ui-form-reset-instances");
av.splice(ak.inArray(this,av),1);if(av.length){this.form.data("ui-form-reset-instances",av)
}else{this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
}}};
/*!
 * jQuery UI Support for jQuery core 1.7.x 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
;
if(ak.fn.jquery.substring(0,3)==="1.7"){ak.each(["Width","Height"],function(ax,av){var aw=av==="Width"?["Left","Right"]:["Top","Bottom"],ay=av.toLowerCase(),aA={innerWidth:ak.fn.innerWidth,innerHeight:ak.fn.innerHeight,outerWidth:ak.fn.outerWidth,outerHeight:ak.fn.outerHeight};
function az(aD,aC,aB,aE){ak.each(aw,function(){aC-=parseFloat(ak.css(aD,"padding"+this))||0;
if(aB){aC-=parseFloat(ak.css(aD,"border"+this+"Width"))||0
}if(aE){aC-=parseFloat(ak.css(aD,"margin"+this))||0
}});return aC}ak.fn["inner"+av]=function(aB){if(aB===undefined){return aA["inner"+av].call(this)
}return this.each(function(){ak(this).css(ay,az(this,aB)+"px")
})};ak.fn["outer"+av]=function(aB,aC){if(typeof aB!=="number"){return aA["outer"+av].call(this,aB)
}return this.each(function(){ak(this).css(ay,az(this,aB,true,aC)+"px")
})}});ak.fn.addBack=function(av){return this.add(av==null?this.prevObject:this.prevObject.filter(av))
}}
/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var n=ak.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38};
var h=ak.ui.escapeSelector=(function(){var av=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
return function(aw){return aw.replace(av,"\\$1")}
})();
/*!
 * jQuery UI Labels 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var am=ak.fn.labels=function(){var aw,av,az,ay,ax;
if(this[0].labels&&this[0].labels.length){return this.pushStack(this[0].labels)
}ay=this.eq(0).parents("label");az=this.attr("id");
if(az){aw=this.eq(0).parents().last();ax=aw.add(aw.length?aw.siblings():this.siblings());
av="label[for='"+ak.ui.escapeSelector(az)+"']";ay=ay.add(ax.find(av).addBack(av))
}return this.pushStack(ay)};
/*!
 * jQuery UI Scroll Parent 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var Z=ak.fn.scrollParent=function(ax){var aw=this.css("position"),av=aw==="absolute",ay=ax?/(auto|scroll|hidden)/:/(auto|scroll)/,az=this.parents().filter(function(){var aA=ak(this);
if(av&&aA.css("position")==="static"){return false
}return ay.test(aA.css("overflow")+aA.css("overflow-y")+aA.css("overflow-x"))
}).eq(0);return aw==="fixed"||!az.length?ak(this[0].ownerDocument||document):az
};
/*!
 * jQuery UI Tabbable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var f=ak.extend(ak.expr[":"],{tabbable:function(ax){var aw=ak.attr(ax,"tabindex"),av=aw!=null;
return(!av||aw>=0)&&ak.ui.focusable(ax,av)}});
/*!
 * jQuery UI Unique ID 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var aa=ak.fn.extend({uniqueId:(function(){var av=0;
return function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++av)
}})}})(),removeUniqueId:function(){return this.each(function(){if(/^ui-id-\d+$/.test(this.id)){ak(this).removeAttr("id")
}})}});
/*!
 * jQuery UI Accordion 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var d=ak.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:false,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var av=this.options;
this.prevShow=this.prevHide=ak();this._addClass("ui-accordion","ui-widget ui-helper-reset");
this.element.attr("role","tablist");if(!av.collapsible&&(av.active===false||av.active==null)){av.active=0
}this._processPanels();if(av.active<0){av.active+=this.headers.length
}this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:!this.active.length?ak():this.active.next()}
},_createIcons:function(){var ax,aw,av=this.options.icons;
if(av){ax=ak("<span>");this._addClass(ax,"ui-accordion-header-icon","ui-icon "+av.header);
ax.prependTo(this.headers);aw=this.active.children(".ui-accordion-header-icon");
this._removeClass(aw,av.header)._addClass(aw,null,av.activeHeader)._addClass(this.headers,"ui-accordion-icons")
}},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons");
this.headers.children(".ui-accordion-header-icon").remove()
},_destroy:function(){var av;this.element.removeAttr("role");
this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId();
this._destroyIcons();av=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId();
if(this.options.heightStyle!=="content"){av.css("height","")
}},_setOption:function(av,aw){if(av==="active"){this._activate(aw);
return}if(av==="event"){if(this.options.event){this._off(this.headers,this.options.event)
}this._setupEvents(aw)}this._super(av,aw);if(av==="collapsible"&&!aw&&this.options.active===false){this._activate(0)
}if(av==="icons"){this._destroyIcons();if(aw){this._createIcons()
}}},_setOptionDisabled:function(av){this._super(av);
this.element.attr("aria-disabled",av);this._toggleClass(null,"ui-state-disabled",!!av);
this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!av)
},_keydown:function(ay){if(ay.altKey||ay.ctrlKey){return
}var az=ak.ui.keyCode,ax=this.headers.length,av=this.headers.index(ay.target),aw=false;
switch(ay.keyCode){case az.RIGHT:case az.DOWN:aw=this.headers[(av+1)%ax];
break;case az.LEFT:case az.UP:aw=this.headers[(av-1+ax)%ax];
break;case az.SPACE:case az.ENTER:this._eventHandler(ay);
break;case az.HOME:aw=this.headers[0];break;case az.END:aw=this.headers[ax-1];
break}if(aw){ak(ay.target).attr("tabIndex",-1);ak(aw).attr("tabIndex",0);
ak(aw).trigger("focus");ay.preventDefault()}},_panelKeyDown:function(av){if(av.keyCode===ak.ui.keyCode.UP&&av.ctrlKey){ak(av.currentTarget).prev().trigger("focus")
}},refresh:function(){var av=this.options;this._processPanels();
if((av.active===false&&av.collapsible===true)||!this.headers.length){av.active=false;
this.active=ak()}else{if(av.active===false){this._activate(0)
}else{if(this.active.length&&!ak.contains(this.element[0],this.active[0])){if(this.headers.length===this.headers.find(".ui-state-disabled").length){av.active=false;
this.active=ak()}else{this._activate(Math.max(0,av.active-1))
}}else{av.active=this.headers.index(this.active)}}}this._destroyIcons();
this._refresh()},_processPanels:function(){var aw=this.headers,av=this.panels;
this.headers=this.element.find(this.options.header);
this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default");
this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide();
this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content");
if(av){this._off(aw.not(this.headers));this._off(av.not(this.panels))
}},_refresh:function(){var ay,aw=this.options,av=aw.heightStyle,ax=this.element.parent();
this.active=this._findActive(aw.active);this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed");
this._addClass(this.active.next(),"ui-accordion-content-active");
this.active.next().show();this.headers.attr("role","tab").each(function(){var aC=ak(this),aB=aC.uniqueId().attr("id"),az=aC.next(),aA=az.uniqueId().attr("id");
aC.attr("aria-controls",aA);az.attr("aria-labelledby",aB)
}).next().attr("role","tabpanel");this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex",0)
}else{this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"})
}this._createIcons();this._setupEvents(aw.event);
if(av==="fill"){ay=ax.height();this.element.siblings(":visible").each(function(){var aA=ak(this),az=aA.css("position");
if(az==="absolute"||az==="fixed"){return}ay-=aA.outerHeight(true)
});this.headers.each(function(){ay-=ak(this).outerHeight(true)
});this.headers.next().each(function(){ak(this).height(Math.max(0,ay-ak(this).innerHeight()+ak(this).height()))
}).css("overflow","auto")}else{if(av==="auto"){ay=0;
this.headers.next().each(function(){var az=ak(this).is(":visible");
if(!az){ak(this).show()}ay=Math.max(ay,ak(this).css("height","").height());
if(!az){ak(this).hide()}}).height(ay)}}},_activate:function(av){var aw=this._findActive(av)[0];
if(aw===this.active[0]){return}aw=aw||this.active[0];
this._eventHandler({target:aw,currentTarget:aw,preventDefault:ak.noop})
},_findActive:function(av){return typeof av==="number"?this.headers.eq(av):ak()
},_setupEvents:function(aw){var av={keydown:"_keydown"};
if(aw){ak.each(aw.split(" "),function(ay,ax){av[ax]="_eventHandler"
})}this._off(this.headers.add(this.headers.next()));
this._on(this.headers,av);this._on(this.headers.next(),{keydown:"_panelKeyDown"});
this._hoverable(this.headers);this._focusable(this.headers)
},_eventHandler:function(aw){var ax,ay,aF=this.options,aA=this.active,aB=ak(aw.currentTarget),aD=aB[0]===aA[0],az=aD&&aF.collapsible,av=az?ak():aB.next(),aC=aA.next(),aE={oldHeader:aA,oldPanel:aC,newHeader:az?ak():aB,newPanel:av};
aw.preventDefault();if((aD&&!aF.collapsible)||(this._trigger("beforeActivate",aw,aE)===false)){return
}aF.active=az?false:this.headers.index(aB);this.active=aD?ak():aB;
this._toggle(aE);this._removeClass(aA,"ui-accordion-header-active","ui-state-active");
if(aF.icons){ax=aA.children(".ui-accordion-header-icon");
this._removeClass(ax,null,aF.icons.activeHeader)._addClass(ax,null,aF.icons.header)
}if(!aD){this._removeClass(aB,"ui-accordion-header-collapsed")._addClass(aB,"ui-accordion-header-active","ui-state-active");
if(aF.icons){ay=aB.children(".ui-accordion-header-icon");
this._removeClass(ay,null,aF.icons.header)._addClass(ay,null,aF.icons.activeHeader)
}this._addClass(aB.next(),"ui-accordion-content-active")
}},_toggle:function(ax){var av=ax.newPanel,aw=this.prevShow.length?this.prevShow:ax.oldPanel;
this.prevShow.add(this.prevHide).stop(true,true);
this.prevShow=av;this.prevHide=aw;if(this.options.animate){this._animate(av,aw,ax)
}else{aw.hide();av.show();this._toggleComplete(ax)
}aw.attr({"aria-hidden":"true"});aw.prev().attr({"aria-selected":"false","aria-expanded":"false"});
if(av.length&&aw.length){aw.prev().attr({tabIndex:-1,"aria-expanded":"false"})
}else{if(av.length){this.headers.filter(function(){return parseInt(ak(this).attr("tabIndex"),10)===0
}).attr("tabIndex",-1)}}av.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})
},_animate:function(av,aE,aA){var aD,aC,az,aB=this,aF=0,ay=av.css("box-sizing"),aG=av.length&&(!aE.length||(av.index()<aE.index())),ax=this.options.animate||{},aH=aG&&ax.down||ax,aw=function(){aB._toggleComplete(aA)
};if(typeof aH==="number"){az=aH}if(typeof aH==="string"){aC=aH
}aC=aC||aH.easing||ax.easing;az=az||aH.duration||ax.duration;
if(!aE.length){return av.animate(this.showProps,az,aC,aw)
}if(!av.length){return aE.animate(this.hideProps,az,aC,aw)
}aD=av.show().outerHeight();aE.animate(this.hideProps,{duration:az,easing:aC,step:function(aI,aJ){aJ.now=Math.round(aI)
}});av.hide().animate(this.showProps,{duration:az,easing:aC,complete:aw,step:function(aI,aJ){aJ.now=Math.round(aI);
if(aJ.prop!=="height"){if(ay==="content-box"){aF+=aJ.now
}}else{if(aB.options.heightStyle!=="content"){aJ.now=Math.round(aD-aE.outerHeight()-aF);
aF=0}}}})},_toggleComplete:function(ax){var av=ax.oldPanel,aw=av.prev();
this._removeClass(av,"ui-accordion-content-active");
this._removeClass(aw,"ui-accordion-header-active")._addClass(aw,"ui-accordion-header-collapsed");
if(av.length){av.parent()[0].className=av.parent()[0].className
}this._trigger("activate",null,ax)}});var j=ak.ui.safeActiveElement=function(av){var ax;
try{ax=av.activeElement}catch(aw){ax=av.body}if(!ax){ax=av.body
}if(!ax.nodeName){ax=av.body}return ax};
/*!
 * jQuery UI Menu 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var p=ak.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element;
this.mouseHandled=false;this.element.uniqueId().attr({role:this.options.role,tabIndex:0});
this._addClass("ui-menu","ui-widget ui-widget-content");
this._on({"mousedown .ui-menu-item":function(av){av.preventDefault()
},"click .ui-menu-item":function(av){var ax=ak(av.target);
var aw=ak(ak.ui.safeActiveElement(this.document[0]));
if(!this.mouseHandled&&ax.not(".ui-state-disabled").length){this.select(av);
if(!av.isPropagationStopped()){this.mouseHandled=true
}if(ax.has(".ui-menu").length){this.expand(av)}else{if(!this.element.is(":focus")&&aw.closest(".ui-menu").length){this.element.trigger("focus",[true]);
if(this.active&&this.active.parents(".ui-menu").length===1){clearTimeout(this.timer)
}}}}},"mouseenter .ui-menu-item":function(av){if(this.previousFilter){return
}var aw=ak(av.target).closest(".ui-menu-item"),ax=ak(av.currentTarget);
if(aw[0]!==ax[0]){return}this._removeClass(ax.siblings().children(".ui-state-active"),null,"ui-state-active");
this.focus(av,ax)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(ax,av){var aw=this.active||this.element.find(this.options.items).eq(0);
if(!av){this.focus(ax,aw)}},blur:function(av){this._delay(function(){var aw=!ak.contains(this.element[0],ak.ui.safeActiveElement(this.document[0]));
if(aw){this.collapseAll(av)}})},keydown:"_keydown"});
this.refresh();this._on(this.document,{click:function(av){if(this._closeOnDocumentClick(av)){this.collapseAll(av)
}this.mouseHandled=false}})},_destroy:function(){var aw=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),av=aw.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show();
av.children().each(function(){var ax=ak(this);if(ax.data("ui-menu-submenu-caret")){ax.remove()
}})},_keydown:function(az){var aw,ay,aA,ax,av=true;
switch(az.keyCode){case ak.ui.keyCode.PAGE_UP:this.previousPage(az);
break;case ak.ui.keyCode.PAGE_DOWN:this.nextPage(az);
break;case ak.ui.keyCode.HOME:this._move("first","first",az);
break;case ak.ui.keyCode.END:this._move("last","last",az);
break;case ak.ui.keyCode.UP:this.previous(az);break;
case ak.ui.keyCode.DOWN:this.next(az);break;case ak.ui.keyCode.LEFT:this.collapse(az);
break;case ak.ui.keyCode.RIGHT:if(this.active&&!this.active.is(".ui-state-disabled")){this.expand(az)
}break;case ak.ui.keyCode.ENTER:case ak.ui.keyCode.SPACE:this._activate(az);
break;case ak.ui.keyCode.ESCAPE:this.collapse(az);
break;default:av=false;ay=this.previousFilter||"";
ax=false;aA=az.keyCode>=96&&az.keyCode<=105?(az.keyCode-96).toString():String.fromCharCode(az.keyCode);
clearTimeout(this.filterTimer);if(aA===ay){ax=true
}else{aA=ay+aA}aw=this._filterMenuItems(aA);aw=ax&&aw.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):aw;
if(!aw.length){aA=String.fromCharCode(az.keyCode);
aw=this._filterMenuItems(aA)}if(aw.length){this.focus(az,aw);
this.previousFilter=aA;this.filterTimer=this._delay(function(){delete this.previousFilter
},1000)}else{delete this.previousFilter}}if(av){az.preventDefault()
}},_activate:function(av){if(this.active&&!this.active.is(".ui-state-disabled")){if(this.active.children("[aria-haspopup='true']").length){this.expand(av)
}else{this.select(av)}}},refresh:function(){var aC,ax,aA,ay,av,aB=this,az=this.options.icons.submenu,aw=this.element.find(this.options.menus);
this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length);
aA=aw.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var aF=ak(this),aD=aF.prev(),aE=ak("<span>").data("ui-menu-submenu-caret",true);
aB._addClass(aE,"ui-menu-icon","ui-icon "+az);aD.attr("aria-haspopup","true").prepend(aE);
aF.attr("aria-labelledby",aD.attr("id"))});this._addClass(aA,"ui-menu","ui-widget ui-widget-content ui-front");
aC=aw.add(this.element);ax=aC.find(this.options.items);
ax.not(".ui-menu-item").each(function(){var aD=ak(this);
if(aB._isDivider(aD)){aB._addClass(aD,"ui-menu-divider","ui-widget-content")
}});ay=ax.not(".ui-menu-item, .ui-menu-divider");
av=ay.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()});
this._addClass(ay,"ui-menu-item")._addClass(av,"ui-menu-item-wrapper");
ax.filter(".ui-state-disabled").attr("aria-disabled","true");
if(this.active&&!ak.contains(this.element[0],this.active[0])){this.blur()
}},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]
},_setOption:function(aw,ax){if(aw==="icons"){var av=this.element.find(".ui-menu-icon");
this._removeClass(av,null,this.options.icons.submenu)._addClass(av,null,ax.submenu)
}this._super(aw,ax)},_setOptionDisabled:function(av){this._super(av);
this.element.attr("aria-disabled",String(av));this._toggleClass(null,"ui-state-disabled",!!av)
},focus:function(ax,aw){var az,ay,av;this.blur(ax,ax&&ax.type==="focus");
this._scrollIntoView(aw);this.active=aw.first();ay=this.active.children(".ui-menu-item-wrapper");
this._addClass(ay,null,"ui-state-active");if(this.options.role){this.element.attr("aria-activedescendant",ay.attr("id"))
}av=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper");
this._addClass(av,null,"ui-state-active");if(ax&&ax.type==="keydown"){this._close()
}else{this.timer=this._delay(function(){this._close()
},this.delay)}az=aw.children(".ui-menu");if(az.length&&ax&&(/^mouse/.test(ax.type))){this._startOpening(az)
}this.activeMenu=aw.parent();this._trigger("focus",ax,{item:aw})
},_scrollIntoView:function(ay){var aB,ax,az,av,aw,aA;
if(this._hasScroll()){aB=parseFloat(ak.css(this.activeMenu[0],"borderTopWidth"))||0;
ax=parseFloat(ak.css(this.activeMenu[0],"paddingTop"))||0;
az=ay.offset().top-this.activeMenu.offset().top-aB-ax;
av=this.activeMenu.scrollTop();aw=this.activeMenu.height();
aA=ay.outerHeight();if(az<0){this.activeMenu.scrollTop(av+az)
}else{if(az+aA>aw){this.activeMenu.scrollTop(av+az-aw+aA)
}}}},blur:function(aw,av){if(!av){clearTimeout(this.timer)
}if(!this.active){return}this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active");
this._trigger("blur",aw,{item:this.active});this.active=null
},_startOpening:function(av){clearTimeout(this.timer);
if(av.attr("aria-hidden")!=="true"){return}this.timer=this._delay(function(){this._close();
this._open(av)},this.delay)},_open:function(aw){var av=ak.extend({of:this.active},this.options.position);
clearTimeout(this.timer);this.element.find(".ui-menu").not(aw.parents(".ui-menu")).hide().attr("aria-hidden","true");
aw.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(av)
},collapseAll:function(aw,av){clearTimeout(this.timer);
this.timer=this._delay(function(){var ax=av?this.element:ak(aw&&aw.target).closest(this.element.find(".ui-menu"));
if(!ax.length){ax=this.element}this._close(ax);this.blur(aw);
this._removeClass(ax.find(".ui-state-active"),null,"ui-state-active");
this.activeMenu=ax},this.delay)},_close:function(av){if(!av){av=this.active?this.active.parent():this.element
}av.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")
},_closeOnDocumentClick:function(av){return !ak(av.target).closest(".ui-menu").length
},_isDivider:function(av){return !/[^\-\u2014\u2013\s]/.test(av.text())
},collapse:function(aw){var av=this.active&&this.active.parent().closest(".ui-menu-item",this.element);
if(av&&av.length){this._close();this.focus(aw,av)
}},expand:function(aw){var av=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();
if(av&&av.length){this._open(av.parent());this._delay(function(){this.focus(aw,av)
})}},next:function(av){this._move("next","first",av)
},previous:function(av){this._move("prev","last",av)
},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},_move:function(ay,aw,ax){var av;if(this.active){if(ay==="first"||ay==="last"){av=this.active[ay==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1)
}else{av=this.active[ay+"All"](".ui-menu-item").eq(0)
}}if(!av||!av.length||!this.active){av=this.activeMenu.find(this.options.items)[aw]()
}this.focus(ax,av)},nextPage:function(ax){var aw,ay,av;
if(!this.active){this.next(ax);return}if(this.isLastItem()){return
}if(this._hasScroll()){ay=this.active.offset().top;
av=this.element.height();this.active.nextAll(".ui-menu-item").each(function(){aw=ak(this);
return aw.offset().top-ay-av<0});this.focus(ax,aw)
}else{this.focus(ax,this.activeMenu.find(this.options.items)[!this.active?"first":"last"]())
}},previousPage:function(ax){var aw,ay,av;if(!this.active){this.next(ax);
return}if(this.isFirstItem()){return}if(this._hasScroll()){ay=this.active.offset().top;
av=this.element.height();this.active.prevAll(".ui-menu-item").each(function(){aw=ak(this);
return aw.offset().top-ay+av>0});this.focus(ax,aw)
}else{this.focus(ax,this.activeMenu.find(this.options.items).first())
}},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")
},select:function(av){this.active=this.active||ak(av.target).closest(".ui-menu-item");
var aw={item:this.active};if(!this.active.has(".ui-menu").length){this.collapseAll(av,true)
}this._trigger("select",av,aw)},_filterMenuItems:function(ax){var av=ax.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),aw=new RegExp("^"+av,"i");
return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return aw.test(ak.trim(ak(this).children(".ui-menu-item-wrapper").text()))
})}});
/*!
 * jQuery UI Autocomplete 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var ax,av,ay,aA=this.element[0].nodeName.toLowerCase(),az=aA==="textarea",aw=aA==="input";
this.isMultiLine=az||!aw&&this._isContentEditable(this.element);
this.valueMethod=this.element[az||aw?"val":"text"];
this.isNewMenu=true;this._addClass("ui-autocomplete-input");
this.element.attr("autocomplete","off");this._on(this.element,{keydown:function(aB){if(this.element.prop("readOnly")){ax=true;
ay=true;av=true;return}ax=false;ay=false;av=false;
var aC=ak.ui.keyCode;switch(aB.keyCode){case aC.PAGE_UP:ax=true;
this._move("previousPage",aB);break;case aC.PAGE_DOWN:ax=true;
this._move("nextPage",aB);break;case aC.UP:ax=true;
this._keyEvent("previous",aB);break;case aC.DOWN:ax=true;
this._keyEvent("next",aB);break;case aC.ENTER:if(this.menu.active){ax=true;
aB.preventDefault();this.menu.select(aB)}break;case aC.TAB:if(this.menu.active){this.menu.select(aB)
}break;case aC.ESCAPE:if(this.menu.element.is(":visible")){if(!this.isMultiLine){this._value(this.term)
}this.close(aB);aB.preventDefault()}break;default:av=true;
this._searchTimeout(aB);break}},keypress:function(aB){if(ax){ax=false;
if(!this.isMultiLine||this.menu.element.is(":visible")){aB.preventDefault()
}return}if(av){return}var aC=ak.ui.keyCode;switch(aB.keyCode){case aC.PAGE_UP:this._move("previousPage",aB);
break;case aC.PAGE_DOWN:this._move("nextPage",aB);
break;case aC.UP:this._keyEvent("previous",aB);break;
case aC.DOWN:this._keyEvent("next",aB);break}},input:function(aB){if(ay){ay=false;
aB.preventDefault();return}this._searchTimeout(aB)
},focus:function(){this.selectedItem=null;this.previous=this._value()
},blur:function(aB){if(this.cancelBlur){delete this.cancelBlur;
return}clearTimeout(this.searching);this.close(aB);
this._change(aB)}});this._initSource();this.menu=ak("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance");
this._addClass(this.menu.element,"ui-autocomplete","ui-front");
this._on(this.menu.element,{mousedown:function(aB){aB.preventDefault();
this.cancelBlur=true;this._delay(function(){delete this.cancelBlur;
if(this.element[0]!==ak.ui.safeActiveElement(this.document[0])){this.element.trigger("focus")
}})},menufocus:function(aD,aE){var aB,aC;if(this.isNewMenu){this.isNewMenu=false;
if(aD.originalEvent&&/^mouse/.test(aD.originalEvent.type)){this.menu.blur();
this.document.one("mousemove",function(){ak(aD.target).trigger(aD.originalEvent)
});return}}aC=aE.item.data("ui-autocomplete-item");
if(false!==this._trigger("focus",aD,{item:aC})){if(aD.originalEvent&&/^key/.test(aD.originalEvent.type)){this._value(aC.value)
}}aB=aE.item.attr("aria-label")||aC.value;if(aB&&ak.trim(aB).length){this.liveRegion.children().hide();
ak("<div>").text(aB).appendTo(this.liveRegion)}},menuselect:function(aD,aE){var aC=aE.item.data("ui-autocomplete-item"),aB=this.previous;
if(this.element[0]!==ak.ui.safeActiveElement(this.document[0])){this.element.trigger("focus");
this.previous=aB;this._delay(function(){this.previous=aB;
this.selectedItem=aC})}if(false!==this._trigger("select",aD,{item:aC})){this._value(aC.value)
}this.term=this._value();this.close(aD);this.selectedItem=aC
}});this.liveRegion=ak("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body);
this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible");
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")
}})},_destroy:function(){clearTimeout(this.searching);
this.element.removeAttr("autocomplete");this.menu.element.remove();
this.liveRegion.remove()},_setOption:function(av,aw){this._super(av,aw);
if(av==="source"){this._initSource()}if(av==="appendTo"){this.menu.element.appendTo(this._appendTo())
}if(av==="disabled"&&aw&&this.xhr){this.xhr.abort()
}},_isEventTargetInWidget:function(av){var aw=this.menu.element[0];
return av.target===this.element[0]||av.target===aw||ak.contains(aw,av.target)
},_closeOnClickOutside:function(av){if(!this._isEventTargetInWidget(av)){this.close()
}},_appendTo:function(){var av=this.options.appendTo;
if(av){av=av.jquery||av.nodeType?ak(av):this.document.find(av).eq(0)
}if(!av||!av[0]){av=this.element.closest(".ui-front, dialog")
}if(!av.length){av=this.document[0].body}return av
},_initSource:function(){var ax,av,aw=this;if(ak.isArray(this.options.source)){ax=this.options.source;
this.source=function(az,ay){ay(ak.ui.autocomplete.filter(ax,az.term))
}}else{if(typeof this.options.source==="string"){av=this.options.source;
this.source=function(az,ay){if(aw.xhr){aw.xhr.abort()
}aw.xhr=ak.ajax({url:av,data:az,dataType:"json",success:function(aA){ay(aA)
},error:function(){ay([])}})}}else{this.source=this.options.source
}}},_searchTimeout:function(av){clearTimeout(this.searching);
this.searching=this._delay(function(){var ax=this.term===this._value(),aw=this.menu.element.is(":visible"),ay=av.altKey||av.ctrlKey||av.metaKey||av.shiftKey;
if(!ax||(ax&&!aw&&!ay)){this.selectedItem=null;this.search(null,av)
}},this.options.delay)},search:function(aw,av){aw=aw!=null?aw:this._value();
this.term=this._value();if(aw.length<this.options.minLength){return this.close(av)
}if(this._trigger("search",av)===false){return}return this._search(aw)
},_search:function(av){this.pending++;this._addClass("ui-autocomplete-loading");
this.cancelSearch=false;this.source({term:av},this._response())
},_response:function(){var av=++this.requestIndex;
return ak.proxy(function(aw){if(av===this.requestIndex){this.__response(aw)
}this.pending--;if(!this.pending){this._removeClass("ui-autocomplete-loading")
}},this)},__response:function(av){if(av){av=this._normalize(av)
}this._trigger("response",null,{content:av});if(!this.options.disabled&&av&&av.length&&!this.cancelSearch){this._suggest(av);
this._trigger("open")}else{this._close()}},close:function(av){this.cancelSearch=true;
this._close(av)},_close:function(av){this._off(this.document,"mousedown");
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.blur();this.isNewMenu=true;this._trigger("close",av)
}},_change:function(av){if(this.previous!==this._value()){this._trigger("change",av,{item:this.selectedItem})
}},_normalize:function(av){if(av.length&&av[0].label&&av[0].value){return av
}return ak.map(av,function(aw){if(typeof aw==="string"){return{label:aw,value:aw}
}return ak.extend({},aw,{label:aw.label||aw.value,value:aw.value||aw.label})
})},_suggest:function(av){var aw=this.menu.element.empty();
this._renderMenu(aw,av);this.isNewMenu=true;this.menu.refresh();
aw.show();this._resizeMenu();aw.position(ak.extend({of:this.element},this.options.position));
if(this.options.autoFocus){this.menu.next()}this._on(this.document,{mousedown:"_closeOnClickOutside"})
},_resizeMenu:function(){var av=this.menu.element;
av.outerWidth(Math.max(av.width("").outerWidth()+1,this.element.outerWidth()))
},_renderMenu:function(aw,av){var ax=this;ak.each(av,function(ay,az){ax._renderItemData(aw,az)
})},_renderItemData:function(av,aw){return this._renderItem(av,aw).data("ui-autocomplete-item",aw)
},_renderItem:function(av,aw){return ak("<li>").append(ak("<div>").text(aw.label)).appendTo(av)
},_move:function(aw,av){if(!this.menu.element.is(":visible")){this.search(null,av);
return}if(this.menu.isFirstItem()&&/^previous/.test(aw)||this.menu.isLastItem()&&/^next/.test(aw)){if(!this.isMultiLine){this._value(this.term)
}this.menu.blur();return}this.menu[aw](av)},widget:function(){return this.menu.element
},_value:function(){return this.valueMethod.apply(this.element,arguments)
},_keyEvent:function(aw,av){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(aw,av);
av.preventDefault()}},_isContentEditable:function(aw){if(!aw.length){return false
}var av=aw.prop("contentEditable");if(av==="inherit"){return this._isContentEditable(aw.parent())
}return av==="true"}});ak.extend(ak.ui.autocomplete,{escapeRegex:function(av){return av.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")
},filter:function(ax,av){var aw=new RegExp(ak.ui.autocomplete.escapeRegex(av),"i");
return ak.grep(ax,function(ay){return aw.test(ay.label||ay.value||ay)
})}});ak.widget("ui.autocomplete",ak.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(av){return av+(av>1?" results are":" result is")+" available, use up and down arrow keys to navigate."
}}},__response:function(aw){var av;this._superApply(arguments);
if(this.options.disabled||this.cancelSearch){return
}if(aw&&aw.length){av=this.options.messages.results(aw.length)
}else{av=this.options.messages.noResults}this.liveRegion.children().hide();
ak("<div>").text(av).appendTo(this.liveRegion)}});
var an=ak.ui.autocomplete;
/*!
 * jQuery UI Controlgroup 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var g=/ui-corner-([a-z]){2,6}/g;var v=ak.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:true,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()
},_enhance:function(){this.element.attr("role","toolbar");
this.refresh()},_destroy:function(){this._callChildMethod("destroy");
this.childWidgets.removeData("ui-controlgroup-data");
this.element.removeAttr("role");if(this.options.items.controlgroupLabel){this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
}},_initWidgets:function(){var aw=this,av=[];ak.each(this.options.items,function(az,ax){var aA;
var ay={};if(!ax){return}if(az==="controlgroupLabel"){aA=aw.element.find(ax);
aA.each(function(){var aB=ak(this);if(aB.children(".ui-controlgroup-label-contents").length){return
}aB.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
});aw._addClass(aA,null,"ui-widget ui-widget-content ui-state-default");
av=av.concat(aA.get());return}if(!ak.fn[az]){return
}if(aw["_"+az+"Options"]){ay=aw["_"+az+"Options"]("middle")
}else{ay={classes:{}}}aw.element.find(ax).each(function(){var aC=ak(this);
var aB=aC[az]("instance");var aD=ak.widget.extend({},ay);
if(az==="button"&&aC.parent(".ui-spinner").length){return
}if(!aB){aB=aC[az]()[az]("instance")}if(aB){aD.classes=aw._resolveClassesValues(aD.classes,aB)
}aC[az](aD);var aE=aC[az]("widget");ak.data(aE[0],"ui-controlgroup-data",aB?aB:aC[az]("instance"));
av.push(aE[0])})});this.childWidgets=ak(ak.unique(av));
this._addClass(this.childWidgets,"ui-controlgroup-item")
},_callChildMethod:function(av){this.childWidgets.each(function(){var aw=ak(this),ax=aw.data("ui-controlgroup-data");
if(ax&&ax[av]){ax[av]()}})},_updateCornerClass:function(ax,aw){var av="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";
var ay=this._buildSimpleOptions(aw,"label").classes.label;
this._removeClass(ax,null,av);this._addClass(ax,null,ay)
},_buildSimpleOptions:function(aw,ax){var ay=this.options.direction==="vertical";
var av={classes:{}};av.classes[ax]={middle:"",first:"ui-corner-"+(ay?"top":"left"),last:"ui-corner-"+(ay?"bottom":"right"),only:"ui-corner-all"}[aw];
return av},_spinnerOptions:function(av){var aw=this._buildSimpleOptions(av,"ui-spinner");
aw.classes["ui-spinner-up"]="";aw.classes["ui-spinner-down"]="";
return aw},_buttonOptions:function(av){return this._buildSimpleOptions(av,"ui-button")
},_checkboxradioOptions:function(av){return this._buildSimpleOptions(av,"ui-checkboxradio-label")
},_selectmenuOptions:function(av){var aw=this.options.direction==="vertical";
return{width:aw?"auto":false,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(aw?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(aw?"top":"left")},last:{"ui-selectmenu-button-open":aw?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(aw?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[av]}
},_resolveClassesValues:function(ax,aw){var av={};
ak.each(ax,function(ay){var az=aw.options.classes[ay]||"";
az=ak.trim(az.replace(g,""));av[ay]=(az+" "+ax[ay]).replace(/\s+/g," ")
});return av},_setOption:function(av,aw){if(av==="direction"){this._removeClass("ui-controlgroup-"+this.options.direction)
}this._super(av,aw);if(av==="disabled"){this._callChildMethod(aw?"disable":"enable");
return}this.refresh()},refresh:function(){var av,aw=this;
this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction);
if(this.options.direction==="horizontal"){this._addClass(null,"ui-helper-clearfix")
}this._initWidgets();av=this.childWidgets;if(this.options.onlyVisible){av=av.filter(":visible")
}if(av.length){ak.each(["first","last"],function(az,aA){var ax=av[aA]().data("ui-controlgroup-data");
if(ax&&aw["_"+ax.widgetName+"Options"]){var ay=aw["_"+ax.widgetName+"Options"](av.length===1?"only":aA);
ay.classes=aw._resolveClassesValues(ay.classes,ax);
ax.element[ax.widgetName](ay)}else{aw._updateCornerClass(av[aA](),aA)
}});this._callChildMethod("refresh")}}});
/*!
 * jQuery UI Checkboxradio 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.checkboxradio",[ak.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:true,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var aw,ay;
var ax=this;var av=this._super()||{};this._readType();
ay=this.element.labels();this.label=ak(ay[ay.length-1]);
if(!this.label.length){ak.error("No label found for checkboxradio widget")
}this.originalLabel="";this.label.contents().not(this.element[0]).each(function(){ax.originalLabel+=this.nodeType===3?ak(this).text():this.outerHTML
});if(this.originalLabel){av.label=this.originalLabel
}aw=this.element[0].disabled;if(aw!=null){av.disabled=aw
}return av},_create:function(){var av=this.element[0].checked;
this._bindFormResetHandler();if(this.options.disabled==null){this.options.disabled=this.element[0].disabled
}this._setOption("disabled",this.options.disabled);
this._addClass("ui-checkboxradio","ui-helper-hidden-accessible");
this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget");
if(this.type==="radio"){this._addClass(this.label,"ui-checkboxradio-radio-label")
}if(this.options.label&&this.options.label!==this.originalLabel){this._updateLabel()
}else{if(this.originalLabel){this.options.label=this.originalLabel
}}this._enhance();if(av){this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active");
if(this.icon){this._addClass(this.icon,null,"ui-state-hover")
}}this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")
},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")
}})},_readType:function(){var av=this.element[0].nodeName.toLowerCase();
this.type=this.element[0].type;if(av!=="input"||!/radio|checkbox/.test(this.type)){ak.error("Can't create checkboxradio on element.nodeName="+av+" and element.type="+this.type)
}},_enhance:function(){this._updateIcon(this.element[0].checked)
},widget:function(){return this.label},_getRadioGroup:function(){var ax;
var av=this.element[0].name;var aw="input[name='"+ak.ui.escapeSelector(av)+"']";
if(!av){return ak([])}if(this.form.length){ax=ak(this.form[0].elements).filter(aw)
}else{ax=ak(aw).filter(function(){return ak(this).form().length===0
})}return ax.not(this.element)},_toggleClasses:function(){var av=this.element[0].checked;
this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",av);
if(this.options.icon&&this.type==="checkbox"){this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",av)._toggleClass(this.icon,null,"ui-icon-blank",!av)
}if(this.type==="radio"){this._getRadioGroup().each(function(){var aw=ak(this).checkboxradio("instance");
if(aw){aw._removeClass(aw.label,"ui-checkboxradio-checked","ui-state-active")
}})}},_destroy:function(){this._unbindFormResetHandler();
if(this.icon){this.icon.remove();this.iconSpace.remove()
}},_setOption:function(av,aw){if(av==="label"&&!aw){return
}this._super(av,aw);if(av==="disabled"){this._toggleClass(this.label,null,"ui-state-disabled",aw);
this.element[0].disabled=aw;return}this.refresh()
},_updateIcon:function(aw){var av="ui-icon ui-icon-background ";
if(this.options.icon){if(!this.icon){this.icon=ak("<span>");
this.iconSpace=ak("<span> </span>");this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")
}if(this.type==="checkbox"){av+=aw?"ui-icon-check ui-state-checked":"ui-icon-blank";
this._removeClass(this.icon,null,aw?"ui-icon-blank":"ui-icon-check")
}else{av+="ui-icon-blank"}this._addClass(this.icon,"ui-checkboxradio-icon",av);
if(!aw){this._removeClass(this.icon,null,"ui-icon-check ui-state-checked")
}this.icon.prependTo(this.label).after(this.iconSpace)
}else{if(this.icon!==undefined){this.icon.remove();
this.iconSpace.remove();delete this.icon}}},_updateLabel:function(){var av=this.label.contents().not(this.element[0]);
if(this.icon){av=av.not(this.icon[0])}if(this.iconSpace){av=av.not(this.iconSpace[0])
}av.remove();this.label.append(this.options.label)
},refresh:function(){var aw=this.element[0].checked,av=this.element[0].disabled;
this._updateIcon(aw);this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",aw);
if(this.options.label!==null){this._updateLabel()
}if(av!==this.options.disabled){this._setOptions({disabled:av})
}}}]);var ao=ak.ui.checkboxradio;
/*!
 * jQuery UI Button 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:true},_getCreateOptions:function(){var aw,av=this._super()||{};
this.isInput=this.element.is("input");aw=this.element[0].disabled;
if(aw!=null){av.disabled=aw}this.originalLabel=this.isInput?this.element.val():this.element.html();
if(this.originalLabel){av.label=this.originalLabel
}return av},_create:function(){if(!this.option.showLabel&!this.options.icon){this.options.showLabel=true
}if(this.options.disabled==null){this.options.disabled=this.element[0].disabled||false
}this.hasTitle=!!this.element.attr("title");if(this.options.label&&this.options.label!==this.originalLabel){if(this.isInput){this.element.val(this.options.label)
}else{this.element.html(this.options.label)}}this._addClass("ui-button","ui-widget");
this._setOption("disabled",this.options.disabled);
this._enhance();if(this.element.is("a")){this._on({keyup:function(av){if(av.keyCode===ak.ui.keyCode.SPACE){av.preventDefault();
if(this.element[0].click){this.element[0].click()
}else{this.element.trigger("click")}}}})}},_enhance:function(){if(!this.element.is("button")){this.element.attr("role","button")
}if(this.options.icon){this._updateIcon("icon",this.options.icon);
this._updateTooltip()}},_updateTooltip:function(){this.title=this.element.attr("title");
if(!this.options.showLabel&&!this.title){this.element.attr("title",this.options.label)
}},_updateIcon:function(ax,az){var aw=ax!=="iconPosition",av=aw?this.options.iconPosition:az,ay=av==="top"||av==="bottom";
if(!this.icon){this.icon=ak("<span>");this._addClass(this.icon,"ui-button-icon","ui-icon");
if(!this.options.showLabel){this._addClass("ui-button-icon-only")
}}else{if(aw){this._removeClass(this.icon,null,this.options.icon)
}}if(aw){this._addClass(this.icon,null,az)}this._attachIcon(av);
if(ay){this._addClass(this.icon,null,"ui-widget-icon-block");
if(this.iconSpace){this.iconSpace.remove()}}else{if(!this.iconSpace){this.iconSpace=ak("<span> </span>");
this._addClass(this.iconSpace,"ui-button-icon-space")
}this._removeClass(this.icon,null,"ui-wiget-icon-block");
this._attachIconSpace(av)}},_destroy:function(){this.element.removeAttr("role");
if(this.icon){this.icon.remove()}if(this.iconSpace){this.iconSpace.remove()
}if(!this.hasTitle){this.element.removeAttr("title")
}},_attachIconSpace:function(av){this.icon[/^(?:end|bottom)/.test(av)?"before":"after"](this.iconSpace)
},_attachIcon:function(av){this.element[/^(?:end|bottom)/.test(av)?"append":"prepend"](this.icon)
},_setOptions:function(aw){var ax=aw.showLabel===undefined?this.options.showLabel:aw.showLabel,av=aw.icon===undefined?this.options.icon:aw.icon;
if(!ax&&!av){aw.showLabel=true}this._super(aw)},_setOption:function(av,aw){if(av==="icon"){if(aw){this._updateIcon(av,aw)
}else{if(this.icon){this.icon.remove();if(this.iconSpace){this.iconSpace.remove()
}}}}if(av==="iconPosition"){this._updateIcon(av,aw)
}if(av==="showLabel"){this._toggleClass("ui-button-icon-only",null,!aw);
this._updateTooltip()}if(av==="label"){if(this.isInput){this.element.val(aw)
}else{this.element.html(aw);if(this.icon){this._attachIcon(this.options.iconPosition);
this._attachIconSpace(this.options.iconPosition)}}}this._super(av,aw);
if(av==="disabled"){this._toggleClass(null,"ui-state-disabled",aw);
this.element[0].disabled=aw;if(aw){this.element.blur()
}}},refresh:function(){var av=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");
if(av!==this.options.disabled){this._setOptions({disabled:av})
}this._updateTooltip()}});if(ak.uiBackCompat!==false){ak.widget("ui.button",ak.ui.button,{options:{text:true,icons:{primary:null,secondary:null}},_create:function(){if(this.options.showLabel&&!this.options.text){this.options.showLabel=this.options.text
}if(!this.options.showLabel&&this.options.text){this.options.text=this.options.showLabel
}if(!this.options.icon&&(this.options.icons.primary||this.options.icons.secondary)){if(this.options.icons.primary){this.options.icon=this.options.icons.primary
}else{this.options.icon=this.options.icons.secondary;
this.options.iconPosition="end"}}else{if(this.options.icon){this.options.icons.primary=this.options.icon
}}this._super()},_setOption:function(av,aw){if(av==="text"){this._super("showLabel",aw);
return}if(av==="showLabel"){this.options.text=aw}if(av==="icon"){this.options.icons.primary=aw
}if(av==="icons"){if(aw.primary){this._super("icon",aw.primary);
this._super("iconPosition","beginning")}else{if(aw.secondary){this._super("icon",aw.secondary);
this._super("iconPosition","end")}}}this._superApply(arguments)
}});ak.fn.button=(function(av){return function(){if(!this.length||(this.length&&this[0].tagName!=="INPUT")||(this.length&&this[0].tagName==="INPUT"&&(this.attr("type")!=="checkbox"&&this.attr("type")!=="radio"))){return av.apply(this,arguments)
}if(!ak.ui.checkboxradio){ak.error("Checkboxradio widget missing")
}if(arguments.length===0){return this.checkboxradio({icon:false})
}return this.checkboxradio.apply(this,arguments)}
})(ak.fn.button);ak.fn.buttonset=function(){if(!ak.ui.controlgroup){ak.error("Controlgroup widget missing")
}if(arguments[0]==="option"&&arguments[1]==="items"&&arguments[2]){return this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]])
}if(arguments[0]==="option"&&arguments[1]==="items"){return this.controlgroup.apply(this,[arguments[0],"items.button"])
}if(typeof arguments[0]==="object"&&arguments[0].items){arguments[0].items={button:arguments[0].items}
}return this.controlgroup.apply(this,arguments)}}var C=ak.ui.button;
/*!
 * jQuery UI Datepicker 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.extend(ak.ui,{datepicker:{version:"1.12.1"}});
var aq;function af(aw){var av,ax;while(aw.length&&aw[0]!==document){av=aw.css("position");
if(av==="absolute"||av==="relative"||av==="fixed"){ax=parseInt(aw.css("zIndex"),10);
if(!isNaN(ax)&&ax!==0){return ax}}aw=aw.parent()}return 0
}function P(){this._curInst=null;this._keyEvent=false;
this._disabledInputs=[];this._datepickerShowing=false;
this._inDialog=false;this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};
ak.extend(this._defaults,this.regional[""]);this.regional.en=ak.extend(true,{},this.regional[""]);
this.regional["en-US"]=ak.extend(true,{},this.regional.en);
this.dpDiv=X(ak("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
}ak.extend(P.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(av){F(this._defaults,av||{});
return this},_attachDatepicker:function(ay,av){var az,ax,aw;
az=ay.nodeName.toLowerCase();ax=(az==="div"||az==="span");
if(!ay.id){this.uuid+=1;ay.id="dp"+this.uuid}aw=this._newInst(ak(ay),ax);
aw.settings=ak.extend({},av||{});if(az==="input"){this._connectDatepicker(ay,aw)
}else{if(ax){this._inlineDatepicker(ay,aw)}}},_newInst:function(aw,av){var ax=aw[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");
return{id:ax,input:aw,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:av,dpDiv:(!av?this.dpDiv:X(ak("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))}
},_connectDatepicker:function(ax,aw){var av=ak(ax);
aw.append=ak([]);aw.trigger=ak([]);if(av.hasClass(this.markerClassName)){return
}this._attachments(av,aw);av.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp);
this._autoSize(aw);ak.data(ax,"datepicker",aw);if(aw.settings.disabled){this._disableDatepicker(ax)
}},_attachments:function(ax,aA){var aw,az,av,aB=this._get(aA,"appendText"),ay=this._get(aA,"isRTL");
if(aA.append){aA.append.remove()}if(aB){aA.append=ak("<span class='"+this._appendClass+"'>"+aB+"</span>");
ax[ay?"before":"after"](aA.append)}ax.off("focus",this._showDatepicker);
if(aA.trigger){aA.trigger.remove()}aw=this._get(aA,"showOn");
if(aw==="focus"||aw==="both"){ax.on("focus",this._showDatepicker)
}if(aw==="button"||aw==="both"){az=this._get(aA,"buttonText");
av=this._get(aA,"buttonImage");aA.trigger=ak(this._get(aA,"buttonImageOnly")?ak("<img/>").addClass(this._triggerClass).attr({src:av,alt:az,title:az}):ak("<button type='button'></button>").addClass(this._triggerClass).html(!av?az:ak("<img/>").attr({src:av,alt:az,title:az})));
ax[ay?"before":"after"](aA.trigger);aA.trigger.on("click",function(){if(ak.datepicker._datepickerShowing&&ak.datepicker._lastInput===ax[0]){ak.datepicker._hideDatepicker()
}else{if(ak.datepicker._datepickerShowing&&ak.datepicker._lastInput!==ax[0]){ak.datepicker._hideDatepicker();
ak.datepicker._showDatepicker(ax[0])}else{ak.datepicker._showDatepicker(ax[0])
}}return false})}},_autoSize:function(aB){if(this._get(aB,"autoSize")&&!aB.inline){var ay,aw,ax,aA,az=new Date(2009,12-1,20),av=this._get(aB,"dateFormat");
if(av.match(/[DM]/)){ay=function(aC){aw=0;ax=0;for(aA=0;
aA<aC.length;aA++){if(aC[aA].length>aw){aw=aC[aA].length;
ax=aA}}return ax};az.setMonth(ay(this._get(aB,(av.match(/MM/)?"monthNames":"monthNamesShort"))));
az.setDate(ay(this._get(aB,(av.match(/DD/)?"dayNames":"dayNamesShort")))+20-az.getDay())
}aB.input.attr("size",this._formatDate(aB,az).length)
}},_inlineDatepicker:function(aw,av){var ax=ak(aw);
if(ax.hasClass(this.markerClassName)){return}ax.addClass(this.markerClassName).append(av.dpDiv);
ak.data(aw,"datepicker",av);this._setDate(av,this._getDefaultDate(av),true);
this._updateDatepicker(av);this._updateAlternate(av);
if(av.settings.disabled){this._disableDatepicker(aw)
}av.dpDiv.css("display","block")},_dialogDatepicker:function(aC,aw,aA,ax,aB){var av,aF,az,aE,aD,ay=this._dialogInst;
if(!ay){this.uuid+=1;av="dp"+this.uuid;this._dialogInput=ak("<input type='text' id='"+av+"' style='position: absolute; top: -100px; width: 0px;'/>");
this._dialogInput.on("keydown",this._doKeyDown);ak("body").append(this._dialogInput);
ay=this._dialogInst=this._newInst(this._dialogInput,false);
ay.settings={};ak.data(this._dialogInput[0],"datepicker",ay)
}F(ay.settings,ax||{});aw=(aw&&aw.constructor===Date?this._formatDate(ay,aw):aw);
this._dialogInput.val(aw);this._pos=(aB?(aB.length?aB:[aB.pageX,aB.pageY]):null);
if(!this._pos){aF=document.documentElement.clientWidth;
az=document.documentElement.clientHeight;aE=document.documentElement.scrollLeft||document.body.scrollLeft;
aD=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(aF/2)-100+aE,(az/2)-150+aD]}this._dialogInput.css("left",(this._pos[0]+20)+"px").css("top",this._pos[1]+"px");
ay.settings.onSelect=aA;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);if(ak.blockUI){ak.blockUI(this.dpDiv)
}ak.data(this._dialogInput[0],"datepicker",ay);return this
},_destroyDatepicker:function(ax){var ay,av=ak(ax),aw=ak.data(ax,"datepicker");
if(!av.hasClass(this.markerClassName)){return}ay=ax.nodeName.toLowerCase();
ak.removeData(ax,"datepicker");if(ay==="input"){aw.append.remove();
aw.trigger.remove();av.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)
}else{if(ay==="div"||ay==="span"){av.removeClass(this.markerClassName).empty()
}}if(aq===aw){aq=null}},_enableDatepicker:function(ay){var az,ax,av=ak(ay),aw=ak.data(ay,"datepicker");
if(!av.hasClass(this.markerClassName)){return}az=ay.nodeName.toLowerCase();
if(az==="input"){ay.disabled=false;aw.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(az==="div"||az==="span"){ax=av.children("."+this._inlineClass);
ax.children().removeClass("ui-state-disabled");ax.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",false)
}}this._disabledInputs=ak.map(this._disabledInputs,function(aA){return(aA===ay?null:aA)
})},_disableDatepicker:function(ay){var az,ax,av=ak(ay),aw=ak.data(ay,"datepicker");
if(!av.hasClass(this.markerClassName)){return}az=ay.nodeName.toLowerCase();
if(az==="input"){ay.disabled=true;aw.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(az==="div"||az==="span"){ax=av.children("."+this._inlineClass);
ax.children().addClass("ui-state-disabled");ax.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",true)
}}this._disabledInputs=ak.map(this._disabledInputs,function(aA){return(aA===ay?null:aA)
});this._disabledInputs[this._disabledInputs.length]=ay
},_isDisabledDatepicker:function(aw){if(!aw){return false
}for(var av=0;av<this._disabledInputs.length;av++){if(this._disabledInputs[av]===aw){return true
}}return false},_getInst:function(aw){try{return ak.data(aw,"datepicker")
}catch(av){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(aB,aw,aA){var ax,av,az,aC,ay=this._getInst(aB);
if(arguments.length===2&&typeof aw==="string"){return(aw==="defaults"?ak.extend({},ak.datepicker._defaults):(ay?(aw==="all"?ak.extend({},ay.settings):this._get(ay,aw)):null))
}ax=aw||{};if(typeof aw==="string"){ax={};ax[aw]=aA
}if(ay){if(this._curInst===ay){this._hideDatepicker()
}av=this._getDateDatepicker(aB,true);az=this._getMinMaxDate(ay,"min");
aC=this._getMinMaxDate(ay,"max");F(ay.settings,ax);
if(az!==null&&ax.dateFormat!==undefined&&ax.minDate===undefined){ay.settings.minDate=this._formatDate(ay,az)
}if(aC!==null&&ax.dateFormat!==undefined&&ax.maxDate===undefined){ay.settings.maxDate=this._formatDate(ay,aC)
}if("disabled" in ax){if(ax.disabled){this._disableDatepicker(aB)
}else{this._enableDatepicker(aB)}}this._attachments(ak(aB),ay);
this._autoSize(ay);this._setDate(ay,av);this._updateAlternate(ay);
this._updateDatepicker(ay)}},_changeDatepicker:function(ax,av,aw){this._optionDatepicker(ax,av,aw)
},_refreshDatepicker:function(aw){var av=this._getInst(aw);
if(av){this._updateDatepicker(av)}},_setDateDatepicker:function(ax,av){var aw=this._getInst(ax);
if(aw){this._setDate(aw,av);this._updateDatepicker(aw);
this._updateAlternate(aw)}},_getDateDatepicker:function(ax,av){var aw=this._getInst(ax);
if(aw&&!aw.inline){this._setDateFromField(aw,av)}return(aw?this._getDate(aw):null)
},_doKeyDown:function(ay){var aw,av,aA,az=ak.datepicker._getInst(ay.target),aB=true,ax=az.dpDiv.is(".ui-datepicker-rtl");
az._keyEvent=true;if(ak.datepicker._datepickerShowing){switch(ay.keyCode){case 9:ak.datepicker._hideDatepicker();
aB=false;break;case 13:aA=ak("td."+ak.datepicker._dayOverClass+":not(."+ak.datepicker._currentClass+")",az.dpDiv);
if(aA[0]){ak.datepicker._selectDay(ay.target,az.selectedMonth,az.selectedYear,aA[0])
}aw=ak.datepicker._get(az,"onSelect");if(aw){av=ak.datepicker._formatDate(az);
aw.apply((az.input?az.input[0]:null),[av,az])}else{ak.datepicker._hideDatepicker()
}return false;case 27:ak.datepicker._hideDatepicker();
break;case 33:ak.datepicker._adjustDate(ay.target,(ay.ctrlKey?-ak.datepicker._get(az,"stepBigMonths"):-ak.datepicker._get(az,"stepMonths")),"M");
break;case 34:ak.datepicker._adjustDate(ay.target,(ay.ctrlKey?+ak.datepicker._get(az,"stepBigMonths"):+ak.datepicker._get(az,"stepMonths")),"M");
break;case 35:if(ay.ctrlKey||ay.metaKey){ak.datepicker._clearDate(ay.target)
}aB=ay.ctrlKey||ay.metaKey;break;case 36:if(ay.ctrlKey||ay.metaKey){ak.datepicker._gotoToday(ay.target)
}aB=ay.ctrlKey||ay.metaKey;break;case 37:if(ay.ctrlKey||ay.metaKey){ak.datepicker._adjustDate(ay.target,(ax?+1:-1),"D")
}aB=ay.ctrlKey||ay.metaKey;if(ay.originalEvent.altKey){ak.datepicker._adjustDate(ay.target,(ay.ctrlKey?-ak.datepicker._get(az,"stepBigMonths"):-ak.datepicker._get(az,"stepMonths")),"M")
}break;case 38:if(ay.ctrlKey||ay.metaKey){ak.datepicker._adjustDate(ay.target,-7,"D")
}aB=ay.ctrlKey||ay.metaKey;break;case 39:if(ay.ctrlKey||ay.metaKey){ak.datepicker._adjustDate(ay.target,(ax?-1:+1),"D")
}aB=ay.ctrlKey||ay.metaKey;if(ay.originalEvent.altKey){ak.datepicker._adjustDate(ay.target,(ay.ctrlKey?+ak.datepicker._get(az,"stepBigMonths"):+ak.datepicker._get(az,"stepMonths")),"M")
}break;case 40:if(ay.ctrlKey||ay.metaKey){ak.datepicker._adjustDate(ay.target,+7,"D")
}aB=ay.ctrlKey||ay.metaKey;break;default:aB=false
}}else{if(ay.keyCode===36&&ay.ctrlKey){ak.datepicker._showDatepicker(this)
}else{aB=false}}if(aB){ay.preventDefault();ay.stopPropagation()
}},_doKeyPress:function(ax){var aw,av,ay=ak.datepicker._getInst(ax.target);
if(ak.datepicker._get(ay,"constrainInput")){aw=ak.datepicker._possibleChars(ak.datepicker._get(ay,"dateFormat"));
av=String.fromCharCode(ax.charCode==null?ax.keyCode:ax.charCode);
return ax.ctrlKey||ax.metaKey||(av<" "||!aw||aw.indexOf(av)>-1)
}},_doKeyUp:function(ax){var av,ay=ak.datepicker._getInst(ax.target);
if(ay.input.val()!==ay.lastVal){try{av=ak.datepicker.parseDate(ak.datepicker._get(ay,"dateFormat"),(ay.input?ay.input.val():null),ak.datepicker._getFormatConfig(ay));
if(av){ak.datepicker._setDateFromField(ay);ak.datepicker._updateAlternate(ay);
ak.datepicker._updateDatepicker(ay)}}catch(aw){}}return true
},_showDatepicker:function(aw){aw=aw.target||aw;if(aw.nodeName.toLowerCase()!=="input"){aw=ak("input",aw.parentNode)[0]
}if(ak.datepicker._isDisabledDatepicker(aw)||ak.datepicker._lastInput===aw){return
}var ay,aC,ax,aA,aB,av,az;ay=ak.datepicker._getInst(aw);
if(ak.datepicker._curInst&&ak.datepicker._curInst!==ay){ak.datepicker._curInst.dpDiv.stop(true,true);
if(ay&&ak.datepicker._datepickerShowing){ak.datepicker._hideDatepicker(ak.datepicker._curInst.input[0])
}}aC=ak.datepicker._get(ay,"beforeShow");ax=aC?aC.apply(aw,[aw,ay]):{};
if(ax===false){return}F(ay.settings,ax);ay.lastVal=null;
ak.datepicker._lastInput=aw;ak.datepicker._setDateFromField(ay);
if(ak.datepicker._inDialog){aw.value=""}if(!ak.datepicker._pos){ak.datepicker._pos=ak.datepicker._findPos(aw);
ak.datepicker._pos[1]+=aw.offsetHeight}aA=false;ak(aw).parents().each(function(){aA|=ak(this).css("position")==="fixed";
return !aA});aB={left:ak.datepicker._pos[0],top:ak.datepicker._pos[1]};
ak.datepicker._pos=null;ay.dpDiv.empty();ay.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
ak.datepicker._updateDatepicker(ay);aB=ak.datepicker._checkOffset(ay,aB,aA);
ay.dpDiv.css({position:(ak.datepicker._inDialog&&ak.blockUI?"static":(aA?"fixed":"absolute")),display:"none",left:aB.left+"px",top:aB.top+"px"});
if(!ay.inline){av=ak.datepicker._get(ay,"showAnim");
az=ak.datepicker._get(ay,"duration");ay.dpDiv.css("z-index",af(ak(aw))+1);
ak.datepicker._datepickerShowing=true;if(ak.effects&&ak.effects.effect[av]){ay.dpDiv.show(av,ak.datepicker._get(ay,"showOptions"),az)
}else{ay.dpDiv[av||"show"](av?az:null)}if(ak.datepicker._shouldFocusInput(ay)){ay.input.trigger("focus")
}ak.datepicker._curInst=ay}},_updateDatepicker:function(ay){this.maxRows=4;
aq=ay;ay.dpDiv.empty().append(this._generateHTML(ay));
this._attachHandlers(ay);var aA,av=this._getNumberOfMonths(ay),az=av[1],ax=17,aw=ay.dpDiv.find("."+this._dayOverClass+" a");
if(aw.length>0){K.apply(aw.get(0))}ay.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
if(az>1){ay.dpDiv.addClass("ui-datepicker-multi-"+az).css("width",(ax*az)+"em")
}ay.dpDiv[(av[0]!==1||av[1]!==1?"add":"remove")+"Class"]("ui-datepicker-multi");
ay.dpDiv[(this._get(ay,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
if(ay===ak.datepicker._curInst&&ak.datepicker._datepickerShowing&&ak.datepicker._shouldFocusInput(ay)){ay.input.trigger("focus")
}if(ay.yearshtml){aA=ay.yearshtml;setTimeout(function(){if(aA===ay.yearshtml&&ay.yearshtml){ay.dpDiv.find("select.ui-datepicker-year:first").replaceWith(ay.yearshtml)
}aA=ay.yearshtml=null},0)}},_shouldFocusInput:function(av){return av.input&&av.input.is(":visible")&&!av.input.is(":disabled")&&!av.input.is(":focus")
},_checkOffset:function(aA,ay,ax){var az=aA.dpDiv.outerWidth(),aD=aA.dpDiv.outerHeight(),aC=aA.input?aA.input.outerWidth():0,av=aA.input?aA.input.outerHeight():0,aB=document.documentElement.clientWidth+(ax?0:ak(document).scrollLeft()),aw=document.documentElement.clientHeight+(ax?0:ak(document).scrollTop());
ay.left-=(this._get(aA,"isRTL")?(az-aC):0);ay.left-=(ax&&ay.left===aA.input.offset().left)?ak(document).scrollLeft():0;
ay.top-=(ax&&ay.top===(aA.input.offset().top+av))?ak(document).scrollTop():0;
ay.left-=Math.min(ay.left,(ay.left+az>aB&&aB>az)?Math.abs(ay.left+az-aB):0);
ay.top-=Math.min(ay.top,(ay.top+aD>aw&&aw>aD)?Math.abs(aD+av):0);
return ay},_findPos:function(ay){var av,ax=this._getInst(ay),aw=this._get(ax,"isRTL");
while(ay&&(ay.type==="hidden"||ay.nodeType!==1||ak.expr.filters.hidden(ay))){ay=ay[aw?"previousSibling":"nextSibling"]
}av=ak(ay).offset();return[av.left,av.top]},_hideDatepicker:function(ax){var aw,aA,az,av,ay=this._curInst;
if(!ay||(ax&&ay!==ak.data(ax,"datepicker"))){return
}if(this._datepickerShowing){aw=this._get(ay,"showAnim");
aA=this._get(ay,"duration");az=function(){ak.datepicker._tidyDialog(ay)
};if(ak.effects&&(ak.effects.effect[aw]||ak.effects[aw])){ay.dpDiv.hide(aw,ak.datepicker._get(ay,"showOptions"),aA,az)
}else{ay.dpDiv[(aw==="slideDown"?"slideUp":(aw==="fadeIn"?"fadeOut":"hide"))]((aw?aA:null),az)
}if(!aw){az()}this._datepickerShowing=false;av=this._get(ay,"onClose");
if(av){av.apply((ay.input?ay.input[0]:null),[(ay.input?ay.input.val():""),ay])
}this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if(ak.blockUI){ak.unblockUI();ak("body").append(this.dpDiv)
}}this._inDialog=false}},_tidyDialog:function(av){av.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
},_checkExternalClick:function(aw){if(!ak.datepicker._curInst){return
}var av=ak(aw.target),ax=ak.datepicker._getInst(av[0]);
if(((av[0].id!==ak.datepicker._mainDivId&&av.parents("#"+ak.datepicker._mainDivId).length===0&&!av.hasClass(ak.datepicker.markerClassName)&&!av.closest("."+ak.datepicker._triggerClass).length&&ak.datepicker._datepickerShowing&&!(ak.datepicker._inDialog&&ak.blockUI)))||(av.hasClass(ak.datepicker.markerClassName)&&ak.datepicker._curInst!==ax)){ak.datepicker._hideDatepicker()
}},_adjustDate:function(az,ay,ax){var aw=ak(az),av=this._getInst(aw[0]);
if(this._isDisabledDatepicker(aw[0])){return}this._adjustInstDate(av,ay+(ax==="M"?this._get(av,"showCurrentAtPos"):0),ax);
this._updateDatepicker(av)},_gotoToday:function(ay){var av,ax=ak(ay),aw=this._getInst(ax[0]);
if(this._get(aw,"gotoCurrent")&&aw.currentDay){aw.selectedDay=aw.currentDay;
aw.drawMonth=aw.selectedMonth=aw.currentMonth;aw.drawYear=aw.selectedYear=aw.currentYear
}else{av=new Date();aw.selectedDay=av.getDate();aw.drawMonth=aw.selectedMonth=av.getMonth();
aw.drawYear=aw.selectedYear=av.getFullYear()}this._notifyChange(aw);
this._adjustDate(ax)},_selectMonthYear:function(az,av,ay){var ax=ak(az),aw=this._getInst(ax[0]);
aw["selected"+(ay==="M"?"Month":"Year")]=aw["draw"+(ay==="M"?"Month":"Year")]=parseInt(av.options[av.selectedIndex].value,10);
this._notifyChange(aw);this._adjustDate(ax)},_selectDay:function(aA,ay,av,az){var aw,ax=ak(aA);
if(ak(az).hasClass(this._unselectableClass)||this._isDisabledDatepicker(ax[0])){return
}aw=this._getInst(ax[0]);aw.selectedDay=aw.currentDay=ak("a",az).html();
aw.selectedMonth=aw.currentMonth=ay;aw.selectedYear=aw.currentYear=av;
this._selectDate(aA,this._formatDate(aw,aw.currentDay,aw.currentMonth,aw.currentYear))
},_clearDate:function(aw){var av=ak(aw);this._selectDate(av,"")
},_selectDate:function(az,av){var aw,ay=ak(az),ax=this._getInst(ay[0]);
av=(av!=null?av:this._formatDate(ax));if(ax.input){ax.input.val(av)
}this._updateAlternate(ax);aw=this._get(ax,"onSelect");
if(aw){aw.apply((ax.input?ax.input[0]:null),[av,ax])
}else{if(ax.input){ax.input.trigger("change")}}if(ax.inline){this._updateDatepicker(ax)
}else{this._hideDatepicker();this._lastInput=ax.input[0];
if(typeof(ax.input[0])!=="object"){ax.input.trigger("focus")
}this._lastInput=null}},_updateAlternate:function(az){var ay,ax,av,aw=this._get(az,"altField");
if(aw){ay=this._get(az,"altFormat")||this._get(az,"dateFormat");
ax=this._getDate(az);av=this.formatDate(ay,ax,this._getFormatConfig(az));
ak(aw).val(av)}},noWeekends:function(aw){var av=aw.getDay();
return[(av>0&&av<6),""]},iso8601Week:function(av){var aw,ax=new Date(av.getTime());
ax.setDate(ax.getDate()+4-(ax.getDay()||7));aw=ax.getTime();
ax.setMonth(0);ax.setDate(1);return Math.floor(Math.round((aw-ax)/86400000)/7)+1
},parseDate:function(aL,aG,aN){if(aL==null||aG==null){throw"Invalid arguments"
}aG=(typeof aG==="object"?aG.toString():aG+"");if(aG===""){return null
}var ay,aI,aw,aM=0,aB=(aN?aN.shortYearCutoff:null)||this._defaults.shortYearCutoff,ax=(typeof aB!=="string"?aB:new Date().getFullYear()%100+parseInt(aB,10)),aE=(aN?aN.dayNamesShort:null)||this._defaults.dayNamesShort,aP=(aN?aN.dayNames:null)||this._defaults.dayNames,av=(aN?aN.monthNamesShort:null)||this._defaults.monthNamesShort,az=(aN?aN.monthNames:null)||this._defaults.monthNames,aA=-1,aQ=-1,aK=-1,aD=-1,aJ=false,aO,aF=function(aS){var aT=(ay+1<aL.length&&aL.charAt(ay+1)===aS);
if(aT){ay++}return aT},aR=function(aU){var aS=aF(aU),aV=(aU==="@"?14:(aU==="!"?20:(aU==="y"&&aS?4:(aU==="o"?3:2)))),aX=(aU==="y"?aV:1),aW=new RegExp("^\\d{"+aX+","+aV+"}"),aT=aG.substring(aM).match(aW);
if(!aT){throw"Missing number at position "+aM}aM+=aT[0].length;
return parseInt(aT[0],10)},aC=function(aT,aU,aW){var aS=-1,aV=ak.map(aF(aT)?aW:aU,function(aY,aX){return[[aX,aY]]
}).sort(function(aY,aX){return -(aY[1].length-aX[1].length)
});ak.each(aV,function(aY,aZ){var aX=aZ[1];if(aG.substr(aM,aX.length).toLowerCase()===aX.toLowerCase()){aS=aZ[0];
aM+=aX.length;return false}});if(aS!==-1){return aS+1
}else{throw"Unknown name at position "+aM}},aH=function(){if(aG.charAt(aM)!==aL.charAt(ay)){throw"Unexpected literal at position "+aM
}aM++};for(ay=0;ay<aL.length;ay++){if(aJ){if(aL.charAt(ay)==="'"&&!aF("'")){aJ=false
}else{aH()}}else{switch(aL.charAt(ay)){case"d":aK=aR("d");
break;case"D":aC("D",aE,aP);break;case"o":aD=aR("o");
break;case"m":aQ=aR("m");break;case"M":aQ=aC("M",av,az);
break;case"y":aA=aR("y");break;case"@":aO=new Date(aR("@"));
aA=aO.getFullYear();aQ=aO.getMonth()+1;aK=aO.getDate();
break;case"!":aO=new Date((aR("!")-this._ticksTo1970)/10000);
aA=aO.getFullYear();aQ=aO.getMonth()+1;aK=aO.getDate();
break;case"'":if(aF("'")){aH()}else{aJ=true}break;
default:aH()}}}if(aM<aG.length){aw=aG.substr(aM);
if(!/^\s+/.test(aw)){throw"Extra/unparsed characters found in date: "+aw
}}if(aA===-1){aA=new Date().getFullYear()}else{if(aA<100){aA+=new Date().getFullYear()-new Date().getFullYear()%100+(aA<=ax?0:-100)
}}if(aD>-1){aQ=1;aK=aD;do{aI=this._getDaysInMonth(aA,aQ-1);
if(aK<=aI){break}aQ++;aK-=aI}while(true)}aO=this._daylightSavingAdjust(new Date(aA,aQ-1,aK));
if(aO.getFullYear()!==aA||aO.getMonth()+1!==aQ||aO.getDate()!==aK){throw"Invalid date"
}return aO},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000),formatDate:function(aE,ay,az){if(!ay){return""
}var aG,aH=(az?az.dayNamesShort:null)||this._defaults.dayNamesShort,aw=(az?az.dayNames:null)||this._defaults.dayNames,aC=(az?az.monthNamesShort:null)||this._defaults.monthNamesShort,aA=(az?az.monthNames:null)||this._defaults.monthNames,aF=function(aI){var aJ=(aG+1<aE.length&&aE.charAt(aG+1)===aI);
if(aJ){aG++}return aJ},av=function(aK,aL,aI){var aJ=""+aL;
if(aF(aK)){while(aJ.length<aI){aJ="0"+aJ}}return aJ
},aB=function(aI,aK,aJ,aL){return(aF(aI)?aL[aK]:aJ[aK])
},ax="",aD=false;if(ay){for(aG=0;aG<aE.length;aG++){if(aD){if(aE.charAt(aG)==="'"&&!aF("'")){aD=false
}else{ax+=aE.charAt(aG)}}else{switch(aE.charAt(aG)){case"d":ax+=av("d",ay.getDate(),2);
break;case"D":ax+=aB("D",ay.getDay(),aH,aw);break;
case"o":ax+=av("o",Math.round((new Date(ay.getFullYear(),ay.getMonth(),ay.getDate()).getTime()-new Date(ay.getFullYear(),0,0).getTime())/86400000),3);
break;case"m":ax+=av("m",ay.getMonth()+1,2);break;
case"M":ax+=aB("M",ay.getMonth(),aC,aA);break;case"y":ax+=(aF("y")?ay.getFullYear():(ay.getFullYear()%100<10?"0":"")+ay.getFullYear()%100);
break;case"@":ax+=ay.getTime();break;case"!":ax+=ay.getTime()*10000+this._ticksTo1970;
break;case"'":if(aF("'")){ax+="'"}else{aD=true}break;
default:ax+=aE.charAt(aG)}}}}return ax},_possibleChars:function(az){var ay,ax="",aw=false,av=function(aA){var aB=(ay+1<az.length&&az.charAt(ay+1)===aA);
if(aB){ay++}return aB};for(ay=0;ay<az.length;ay++){if(aw){if(az.charAt(ay)==="'"&&!av("'")){aw=false
}else{ax+=az.charAt(ay)}}else{switch(az.charAt(ay)){case"d":case"m":case"y":case"@":ax+="0123456789";
break;case"D":case"M":return null;case"'":if(av("'")){ax+="'"
}else{aw=true}break;default:ax+=az.charAt(ay)}}}return ax
},_get:function(aw,av){return aw.settings[av]!==undefined?aw.settings[av]:this._defaults[av]
},_setDateFromField:function(aA,ax){if(aA.input.val()===aA.lastVal){return
}var av=this._get(aA,"dateFormat"),aC=aA.lastVal=aA.input?aA.input.val():null,aB=this._getDefaultDate(aA),aw=aB,ay=this._getFormatConfig(aA);
try{aw=this.parseDate(av,aC,ay)||aB}catch(az){aC=(ax?"":aC)
}aA.selectedDay=aw.getDate();aA.drawMonth=aA.selectedMonth=aw.getMonth();
aA.drawYear=aA.selectedYear=aw.getFullYear();aA.currentDay=(aC?aw.getDate():0);
aA.currentMonth=(aC?aw.getMonth():0);aA.currentYear=(aC?aw.getFullYear():0);
this._adjustInstDate(aA)},_getDefaultDate:function(av){return this._restrictMinMax(av,this._determineDate(av,this._get(av,"defaultDate"),new Date()))
},_determineDate:function(az,aw,aA){var ay=function(aC){var aB=new Date();
aB.setDate(aB.getDate()+aC);return aB},ax=function(aI){try{return ak.datepicker.parseDate(ak.datepicker._get(az,"dateFormat"),aI,ak.datepicker._getFormatConfig(az))
}catch(aH){}var aC=(aI.toLowerCase().match(/^c/)?ak.datepicker._getDate(az):null)||new Date(),aD=aC.getFullYear(),aG=aC.getMonth(),aB=aC.getDate(),aF=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,aE=aF.exec(aI);
while(aE){switch(aE[2]||"d"){case"d":case"D":aB+=parseInt(aE[1],10);
break;case"w":case"W":aB+=parseInt(aE[1],10)*7;break;
case"m":case"M":aG+=parseInt(aE[1],10);aB=Math.min(aB,ak.datepicker._getDaysInMonth(aD,aG));
break;case"y":case"Y":aD+=parseInt(aE[1],10);aB=Math.min(aB,ak.datepicker._getDaysInMonth(aD,aG));
break}aE=aF.exec(aI)}return new Date(aD,aG,aB)},av=(aw==null||aw===""?aA:(typeof aw==="string"?ax(aw):(typeof aw==="number"?(isNaN(aw)?aA:ay(aw)):new Date(aw.getTime()))));
av=(av&&av.toString()==="Invalid Date"?aA:av);if(av){av.setHours(0);
av.setMinutes(0);av.setSeconds(0);av.setMilliseconds(0)
}return this._daylightSavingAdjust(av)},_daylightSavingAdjust:function(av){if(!av){return null
}av.setHours(av.getHours()>12?av.getHours()+2:0);
return av},_setDate:function(aB,ay,aA){var av=!ay,ax=aB.selectedMonth,az=aB.selectedYear,aw=this._restrictMinMax(aB,this._determineDate(aB,ay,new Date()));
aB.selectedDay=aB.currentDay=aw.getDate();aB.drawMonth=aB.selectedMonth=aB.currentMonth=aw.getMonth();
aB.drawYear=aB.selectedYear=aB.currentYear=aw.getFullYear();
if((ax!==aB.selectedMonth||az!==aB.selectedYear)&&!aA){this._notifyChange(aB)
}this._adjustInstDate(aB);if(aB.input){aB.input.val(av?"":this._formatDate(aB))
}},_getDate:function(aw){var av=(!aw.currentYear||(aw.input&&aw.input.val()==="")?null:this._daylightSavingAdjust(new Date(aw.currentYear,aw.currentMonth,aw.currentDay)));
return av},_attachHandlers:function(aw){var av=this._get(aw,"stepMonths"),ax="#"+aw.id.replace(/\\\\/g,"\\");
aw.dpDiv.find("[data-handler]").map(function(){var ay={prev:function(){ak.datepicker._adjustDate(ax,-av,"M")
},next:function(){ak.datepicker._adjustDate(ax,+av,"M")
},hide:function(){ak.datepicker._hideDatepicker()
},today:function(){ak.datepicker._gotoToday(ax)},selectDay:function(){ak.datepicker._selectDay(ax,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this);
return false},selectMonth:function(){ak.datepicker._selectMonthYear(ax,this,"M");
return false},selectYear:function(){ak.datepicker._selectMonthYear(ax,this,"Y");
return false}};ak(this).on(this.getAttribute("data-event"),ay[this.getAttribute("data-handler")])
})},_generateHTML:function(bb){var aO,aN,a6,aY,az,bf,a9,a2,bi,aW,bm,aG,aI,aH,aw,be,aE,aR,bh,a4,bn,aQ,aV,aF,aA,a7,a0,a3,a1,aD,aT,aJ,ba,bd,ay,bg,bk,aZ,aK,bc=new Date(),aP=this._daylightSavingAdjust(new Date(bc.getFullYear(),bc.getMonth(),bc.getDate())),bj=this._get(bb,"isRTL"),bl=this._get(bb,"showButtonPanel"),a5=this._get(bb,"hideIfNoPrevNext"),aU=this._get(bb,"navigationAsDateFormat"),aL=this._getNumberOfMonths(bb),aC=this._get(bb,"showCurrentAtPos"),aX=this._get(bb,"stepMonths"),aS=(aL[0]!==1||aL[1]!==1),ax=this._daylightSavingAdjust((!bb.currentDay?new Date(9999,9,9):new Date(bb.currentYear,bb.currentMonth,bb.currentDay))),aB=this._getMinMaxDate(bb,"min"),aM=this._getMinMaxDate(bb,"max"),av=bb.drawMonth-aC,a8=bb.drawYear;
if(av<0){av+=12;a8--}if(aM){aO=this._daylightSavingAdjust(new Date(aM.getFullYear(),aM.getMonth()-(aL[0]*aL[1])+1,aM.getDate()));
aO=(aB&&aO<aB?aB:aO);while(this._daylightSavingAdjust(new Date(a8,av,1))>aO){av--;
if(av<0){av=11;a8--}}}bb.drawMonth=av;bb.drawYear=a8;
aN=this._get(bb,"prevText");aN=(!aU?aN:this.formatDate(aN,this._daylightSavingAdjust(new Date(a8,av-aX,1)),this._getFormatConfig(bb)));
a6=(this._canAdjustMonth(bb,-1,a8,av)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+aN+"'><span class='ui-icon ui-icon-circle-triangle-"+(bj?"e":"w")+"'>"+aN+"</span></a>":(a5?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+aN+"'><span class='ui-icon ui-icon-circle-triangle-"+(bj?"e":"w")+"'>"+aN+"</span></a>"));
aY=this._get(bb,"nextText");aY=(!aU?aY:this.formatDate(aY,this._daylightSavingAdjust(new Date(a8,av+aX,1)),this._getFormatConfig(bb)));
az=(this._canAdjustMonth(bb,+1,a8,av)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+aY+"'><span class='ui-icon ui-icon-circle-triangle-"+(bj?"w":"e")+"'>"+aY+"</span></a>":(a5?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+aY+"'><span class='ui-icon ui-icon-circle-triangle-"+(bj?"w":"e")+"'>"+aY+"</span></a>"));
bf=this._get(bb,"currentText");a9=(this._get(bb,"gotoCurrent")&&bb.currentDay?ax:aP);
bf=(!aU?bf:this.formatDate(bf,a9,this._getFormatConfig(bb)));
a2=(!bb.inline?"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(bb,"closeText")+"</button>":"");
bi=(bl)?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(bj?a2:"")+(this._isInRange(bb,a9)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+bf+"</button>":"")+(bj?"":a2)+"</div>":"";
aW=parseInt(this._get(bb,"firstDay"),10);aW=(isNaN(aW)?0:aW);
bm=this._get(bb,"showWeek");aG=this._get(bb,"dayNames");
aI=this._get(bb,"dayNamesMin");aH=this._get(bb,"monthNames");
aw=this._get(bb,"monthNamesShort");be=this._get(bb,"beforeShowDay");
aE=this._get(bb,"showOtherMonths");aR=this._get(bb,"selectOtherMonths");
bh=this._getDefaultDate(bb);a4="";for(aQ=0;aQ<aL[0];
aQ++){aV="";this.maxRows=4;for(aF=0;aF<aL[1];aF++){aA=this._daylightSavingAdjust(new Date(a8,av,bb.selectedDay));
a7=" ui-corner-all";a0="";if(aS){a0+="<div class='ui-datepicker-group";
if(aL[1]>1){switch(aF){case 0:a0+=" ui-datepicker-group-first";
a7=" ui-corner-"+(bj?"right":"left");break;case aL[1]-1:a0+=" ui-datepicker-group-last";
a7=" ui-corner-"+(bj?"left":"right");break;default:a0+=" ui-datepicker-group-middle";
a7="";break}}a0+="'>"}a0+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+a7+"'>"+(/all|left/.test(a7)&&aQ===0?(bj?az:a6):"")+(/all|right/.test(a7)&&aQ===0?(bj?a6:az):"")+this._generateMonthYearHeader(bb,av,a8,aB,aM,aQ>0||aF>0,aH,aw)+"</div><table class='ui-datepicker-calendar'><thead><tr>";
a3=(bm?"<th class='ui-datepicker-week-col'>"+this._get(bb,"weekHeader")+"</th>":"");
for(bn=0;bn<7;bn++){a1=(bn+aW)%7;a3+="<th scope='col'"+((bn+aW+6)%7>=5?" class='ui-datepicker-week-end'":"")+"><span title='"+aG[a1]+"'>"+aI[a1]+"</span></th>"
}a0+=a3+"</tr></thead><tbody>";aD=this._getDaysInMonth(a8,av);
if(a8===bb.selectedYear&&av===bb.selectedMonth){bb.selectedDay=Math.min(bb.selectedDay,aD)
}aT=(this._getFirstDayOfMonth(a8,av)-aW+7)%7;aJ=Math.ceil((aT+aD)/7);
ba=(aS?this.maxRows>aJ?this.maxRows:aJ:aJ);this.maxRows=ba;
bd=this._daylightSavingAdjust(new Date(a8,av,1-aT));
for(ay=0;ay<ba;ay++){a0+="<tr>";bg=(!bm?"":"<td class='ui-datepicker-week-col'>"+this._get(bb,"calculateWeek")(bd)+"</td>");
for(bn=0;bn<7;bn++){bk=(be?be.apply((bb.input?bb.input[0]:null),[bd]):[true,""]);
aZ=(bd.getMonth()!==av);aK=(aZ&&!aR)||!bk[0]||(aB&&bd<aB)||(aM&&bd>aM);
bg+="<td class='"+((bn+aW+6)%7>=5?" ui-datepicker-week-end":"")+(aZ?" ui-datepicker-other-month":"")+((bd.getTime()===aA.getTime()&&av===bb.selectedMonth&&bb._keyEvent)||(bh.getTime()===bd.getTime()&&bh.getTime()===aA.getTime())?" "+this._dayOverClass:"")+(aK?" "+this._unselectableClass+" ui-state-disabled":"")+(aZ&&!aE?"":" "+bk[1]+(bd.getTime()===ax.getTime()?" "+this._currentClass:"")+(bd.getTime()===aP.getTime()?" ui-datepicker-today":""))+"'"+((!aZ||aE)&&bk[2]?" title='"+bk[2].replace(/'/g,"&#39;")+"'":"")+(aK?"":" data-handler='selectDay' data-event='click' data-month='"+bd.getMonth()+"' data-year='"+bd.getFullYear()+"'")+">"+(aZ&&!aE?"&#xa0;":(aK?"<span class='ui-state-default'>"+bd.getDate()+"</span>":"<a class='ui-state-default"+(bd.getTime()===aP.getTime()?" ui-state-highlight":"")+(bd.getTime()===ax.getTime()?" ui-state-active":"")+(aZ?" ui-priority-secondary":"")+"' href='#'>"+bd.getDate()+"</a>"))+"</td>";
bd.setDate(bd.getDate()+1);bd=this._daylightSavingAdjust(bd)
}a0+=bg+"</tr>"}av++;if(av>11){av=0;a8++}a0+="</tbody></table>"+(aS?"</div>"+((aL[0]>0&&aF===aL[1]-1)?"<div class='ui-datepicker-row-break'></div>":""):"");
aV+=a0}a4+=aV}a4+=bi;bb._keyEvent=false;return a4
},_generateMonthYearHeader:function(az,ax,aH,aB,aF,aI,aD,av){var aM,aw,aN,aK,aA,aJ,aG,aC,ay=this._get(az,"changeMonth"),aO=this._get(az,"changeYear"),aP=this._get(az,"showMonthAfterYear"),aE="<div class='ui-datepicker-title'>",aL="";
if(aI||!ay){aL+="<span class='ui-datepicker-month'>"+aD[ax]+"</span>"
}else{aM=(aB&&aB.getFullYear()===aH);aw=(aF&&aF.getFullYear()===aH);
aL+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
for(aN=0;aN<12;aN++){if((!aM||aN>=aB.getMonth())&&(!aw||aN<=aF.getMonth())){aL+="<option value='"+aN+"'"+(aN===ax?" selected='selected'":"")+">"+av[aN]+"</option>"
}}aL+="</select>"}if(!aP){aE+=aL+(aI||!(ay&&aO)?"&#xa0;":"")
}if(!az.yearshtml){az.yearshtml="";if(aI||!aO){aE+="<span class='ui-datepicker-year'>"+aH+"</span>"
}else{aK=this._get(az,"yearRange").split(":");aA=new Date().getFullYear();
aJ=function(aR){var aQ=(aR.match(/c[+\-].*/)?aH+parseInt(aR.substring(1),10):(aR.match(/[+\-].*/)?aA+parseInt(aR,10):parseInt(aR,10)));
return(isNaN(aQ)?aA:aQ)};aG=aJ(aK[0]);aC=Math.max(aG,aJ(aK[1]||""));
aG=(aB?Math.max(aG,aB.getFullYear()):aG);aC=(aF?Math.min(aC,aF.getFullYear()):aC);
az.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
for(;aG<=aC;aG++){az.yearshtml+="<option value='"+aG+"'"+(aG===aH?" selected='selected'":"")+">"+aG+"</option>"
}az.yearshtml+="</select>";aE+=az.yearshtml;az.yearshtml=null
}}aE+=this._get(az,"yearSuffix");if(aP){aE+=(aI||!(ay&&aO)?"&#xa0;":"")+aL
}aE+="</div>";return aE},_adjustInstDate:function(ay,aB,aA){var ax=ay.selectedYear+(aA==="Y"?aB:0),az=ay.selectedMonth+(aA==="M"?aB:0),av=Math.min(ay.selectedDay,this._getDaysInMonth(ax,az))+(aA==="D"?aB:0),aw=this._restrictMinMax(ay,this._daylightSavingAdjust(new Date(ax,az,av)));
ay.selectedDay=aw.getDate();ay.drawMonth=ay.selectedMonth=aw.getMonth();
ay.drawYear=ay.selectedYear=aw.getFullYear();if(aA==="M"||aA==="Y"){this._notifyChange(ay)
}},_restrictMinMax:function(ay,aw){var ax=this._getMinMaxDate(ay,"min"),az=this._getMinMaxDate(ay,"max"),av=(ax&&aw<ax?ax:aw);
return(az&&av>az?az:av)},_notifyChange:function(aw){var av=this._get(aw,"onChangeMonthYear");
if(av){av.apply((aw.input?aw.input[0]:null),[aw.selectedYear,aw.selectedMonth+1,aw])
}},_getNumberOfMonths:function(aw){var av=this._get(aw,"numberOfMonths");
return(av==null?[1,1]:(typeof av==="number"?[1,av]:av))
},_getMinMaxDate:function(aw,av){return this._determineDate(aw,this._get(aw,av+"Date"),null)
},_getDaysInMonth:function(av,aw){return 32-this._daylightSavingAdjust(new Date(av,aw,32)).getDate()
},_getFirstDayOfMonth:function(av,aw){return new Date(av,aw,1).getDay()
},_canAdjustMonth:function(ay,aA,ax,az){var av=this._getNumberOfMonths(ay),aw=this._daylightSavingAdjust(new Date(ax,az+(aA<0?aA:av[0]*av[1]),1));
if(aA<0){aw.setDate(this._getDaysInMonth(aw.getFullYear(),aw.getMonth()))
}return this._isInRange(ay,aw)},_isInRange:function(az,ax){var aw,aC,ay=this._getMinMaxDate(az,"min"),av=this._getMinMaxDate(az,"max"),aD=null,aA=null,aB=this._get(az,"yearRange");
if(aB){aw=aB.split(":");aC=new Date().getFullYear();
aD=parseInt(aw[0],10);aA=parseInt(aw[1],10);if(aw[0].match(/[+\-].*/)){aD+=aC
}if(aw[1].match(/[+\-].*/)){aA+=aC}}return((!ay||ax.getTime()>=ay.getTime())&&(!av||ax.getTime()<=av.getTime())&&(!aD||ax.getFullYear()>=aD)&&(!aA||ax.getFullYear()<=aA))
},_getFormatConfig:function(av){var aw=this._get(av,"shortYearCutoff");
aw=(typeof aw!=="string"?aw:new Date().getFullYear()%100+parseInt(aw,10));
return{shortYearCutoff:aw,dayNamesShort:this._get(av,"dayNamesShort"),dayNames:this._get(av,"dayNames"),monthNamesShort:this._get(av,"monthNamesShort"),monthNames:this._get(av,"monthNames")}
},_formatDate:function(ay,av,az,ax){if(!av){ay.currentDay=ay.selectedDay;
ay.currentMonth=ay.selectedMonth;ay.currentYear=ay.selectedYear
}var aw=(av?(typeof av==="object"?av:this._daylightSavingAdjust(new Date(ax,az,av))):this._daylightSavingAdjust(new Date(ay.currentYear,ay.currentMonth,ay.currentDay)));
return this.formatDate(this._get(ay,"dateFormat"),aw,this._getFormatConfig(ay))
}});function X(aw){var av="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return aw.on("mouseout",av,function(){ak(this).removeClass("ui-state-hover");
if(this.className.indexOf("ui-datepicker-prev")!==-1){ak(this).removeClass("ui-datepicker-prev-hover")
}if(this.className.indexOf("ui-datepicker-next")!==-1){ak(this).removeClass("ui-datepicker-next-hover")
}}).on("mouseover",av,K)}function K(){if(!ak.datepicker._isDisabledDatepicker(aq.inline?aq.dpDiv.parent()[0]:aq.input[0])){ak(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
ak(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!==-1){ak(this).addClass("ui-datepicker-prev-hover")
}if(this.className.indexOf("ui-datepicker-next")!==-1){ak(this).addClass("ui-datepicker-next-hover")
}}}function F(ax,aw){ak.extend(ax,aw);for(var av in aw){if(aw[av]==null){ax[av]=aw[av]
}}return ax}ak.fn.datepicker=function(aw){if(!this.length){return this
}if(!ak.datepicker.initialized){ak(document).on("mousedown",ak.datepicker._checkExternalClick);
ak.datepicker.initialized=true}if(ak("#"+ak.datepicker._mainDivId).length===0){ak("body").append(ak.datepicker.dpDiv)
}var av=Array.prototype.slice.call(arguments,1);if(typeof aw==="string"&&(aw==="isDisabled"||aw==="getDate"||aw==="widget")){return ak.datepicker["_"+aw+"Datepicker"].apply(ak.datepicker,[this[0]].concat(av))
}if(aw==="option"&&arguments.length===2&&typeof arguments[1]==="string"){return ak.datepicker["_"+aw+"Datepicker"].apply(ak.datepicker,[this[0]].concat(av))
}return this.each(function(){typeof aw==="string"?ak.datepicker["_"+aw+"Datepicker"].apply(ak.datepicker,[this].concat(av)):ak.datepicker._attachDatepicker(this,aw)
})};ak.datepicker=new P();ak.datepicker.initialized=false;
ak.datepicker.uuid=new Date().getTime();ak.datepicker.version="1.12.1";
var k=ak.datepicker;var L=ak.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
/*!
 * jQuery UI Mouse 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var ab=false;ak(document).on("mouseup",function(){ab=false
});var a=ak.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var av=this;
this.element.on("mousedown."+this.widgetName,function(aw){return av._mouseDown(aw)
}).on("click."+this.widgetName,function(aw){if(true===ak.data(aw.target,av.widgetName+".preventClickEvent")){ak.removeData(aw.target,av.widgetName+".preventClickEvent");
aw.stopImmediatePropagation();return false}});this.started=false
},_mouseDestroy:function(){this.element.off("."+this.widgetName);
if(this._mouseMoveDelegate){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)
}},_mouseDown:function(ax){if(ab){return}this._mouseMoved=false;
(this._mouseStarted&&this._mouseUp(ax));this._mouseDownEvent=ax;
var aw=this,ay=(ax.which===1),av=(typeof this.options.cancel==="string"&&ax.target.nodeName?ak(ax.target).closest(this.options.cancel).length:false);
if(!ay||av||!this._mouseCapture(ax)){return true}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){aw.mouseDelayMet=true
},this.options.delay)}if(this._mouseDistanceMet(ax)&&this._mouseDelayMet(ax)){this._mouseStarted=(this._mouseStart(ax)!==false);
if(!this._mouseStarted){ax.preventDefault();return true
}}if(true===ak.data(ax.target,this.widgetName+".preventClickEvent")){ak.removeData(ax.target,this.widgetName+".preventClickEvent")
}this._mouseMoveDelegate=function(az){return aw._mouseMove(az)
};this._mouseUpDelegate=function(az){return aw._mouseUp(az)
};this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate);
ax.preventDefault();ab=true;return true},_mouseMove:function(av){if(this._mouseMoved){if(ak.ui.ie&&(!document.documentMode||document.documentMode<9)&&!av.button){return this._mouseUp(av)
}else{if(!av.which){if(av.originalEvent.altKey||av.originalEvent.ctrlKey||av.originalEvent.metaKey||av.originalEvent.shiftKey){this.ignoreMissingWhich=true
}else{if(!this.ignoreMissingWhich){return this._mouseUp(av)
}}}}}if(av.which||av.button){this._mouseMoved=true
}if(this._mouseStarted){this._mouseDrag(av);return av.preventDefault()
}if(this._mouseDistanceMet(av)&&this._mouseDelayMet(av)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,av)!==false);
(this._mouseStarted?this._mouseDrag(av):this._mouseUp(av))
}return !this._mouseStarted},_mouseUp:function(av){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;if(av.target===this._mouseDownEvent.target){ak.data(av.target,this.widgetName+".preventClickEvent",true)
}this._mouseStop(av)}if(this._mouseDelayTimer){clearTimeout(this._mouseDelayTimer);
delete this._mouseDelayTimer}this.ignoreMissingWhich=false;
ab=false;av.preventDefault()},_mouseDistanceMet:function(av){return(Math.max(Math.abs(this._mouseDownEvent.pageX-av.pageX),Math.abs(this._mouseDownEvent.pageY-av.pageY))>=this.options.distance)
},_mouseDelayMet:function(){return this.mouseDelayMet
},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true
}});var G=ak.ui.plugin={add:function(aw,ax,az){var av,ay=ak.ui[aw].prototype;
for(av in az){ay.plugins[av]=ay.plugins[av]||[];ay.plugins[av].push([ax,az[av]])
}},call:function(av,ay,ax,aw){var az,aA=av.plugins[ay];
if(!aA){return}if(!aw&&(!av.element[0].parentNode||av.element[0].parentNode.nodeType===11)){return
}for(az=0;az<aA.length;az++){if(av.options[aA[az][0]]){aA[az][1].apply(av.element,ax)
}}}};var c=ak.ui.safeBlur=function(av){if(av&&av.nodeName.toLowerCase()!=="body"){ak(av).trigger("blur")
}};
/*!
 * jQuery UI Draggable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.draggable",ak.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false,drag:null,start:null,stop:null},_create:function(){if(this.options.helper==="original"){this._setPositionRelative()
}if(this.options.addClasses){this._addClass("ui-draggable")
}this._setHandleClassName();this._mouseInit()},_setOption:function(av,aw){this._super(av,aw);
if(av==="handle"){this._removeHandleClassName();this._setHandleClassName()
}},_destroy:function(){if((this.helper||this.element).is(".ui-draggable-dragging")){this.destroyOnClear=true;
return}this._removeHandleClassName();this._mouseDestroy()
},_mouseCapture:function(av){var aw=this.options;
if(this.helper||aw.disabled||ak(av.target).closest(".ui-resizable-handle").length>0){return false
}this.handle=this._getHandle(av);if(!this.handle){return false
}this._blurActiveElement(av);this._blockFrames(aw.iframeFix===true?"iframe":aw.iframeFix);
return true},_blockFrames:function(av){this.iframeBlocks=this.document.find(av).map(function(){var aw=ak(this);
return ak("<div>").css("position","absolute").appendTo(aw.parent()).outerWidth(aw.outerWidth()).outerHeight(aw.outerHeight()).offset(aw.offset())[0]
})},_unblockFrames:function(){if(this.iframeBlocks){this.iframeBlocks.remove();
delete this.iframeBlocks}},_blurActiveElement:function(aw){var av=ak.ui.safeActiveElement(this.document[0]),ax=ak(aw.target);
if(ax.closest(av).length){return}ak.ui.safeBlur(av)
},_mouseStart:function(av){var aw=this.options;this.helper=this._createHelper(av);
this._addClass(this.helper,"ui-draggable-dragging");
this._cacheHelperProportions();if(ak.ui.ddmanager){ak.ui.ddmanager.current=this
}this._cacheMargins();this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent(true);
this.offsetParent=this.helper.offsetParent();this.hasFixedAncestor=this.helper.parents().filter(function(){return ak(this).css("position")==="fixed"
}).length>0;this.positionAbs=this.element.offset();
this._refreshOffsets(av);this.originalPosition=this.position=this._generatePosition(av,false);
this.originalPageX=av.pageX;this.originalPageY=av.pageY;
(aw.cursorAt&&this._adjustOffsetFromHelper(aw.cursorAt));
this._setContainment();if(this._trigger("start",av)===false){this._clear();
return false}this._cacheHelperProportions();if(ak.ui.ddmanager&&!aw.dropBehaviour){ak.ui.ddmanager.prepareOffsets(this,av)
}this._mouseDrag(av,true);if(ak.ui.ddmanager){ak.ui.ddmanager.dragStart(this,av)
}return true},_refreshOffsets:function(av){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:false,parent:this._getParentOffset(),relative:this._getRelativeOffset()};
this.offset.click={left:av.pageX-this.offset.left,top:av.pageY-this.offset.top}
},_mouseDrag:function(av,ax){if(this.hasFixedAncestor){this.offset.parent=this._getParentOffset()
}this.position=this._generatePosition(av,true);this.positionAbs=this._convertPositionTo("absolute");
if(!ax){var aw=this._uiHash();if(this._trigger("drag",av,aw)===false){this._mouseUp(new ak.Event("mouseup",av));
return false}this.position=aw.position}this.helper[0].style.left=this.position.left+"px";
this.helper[0].style.top=this.position.top+"px";if(ak.ui.ddmanager){ak.ui.ddmanager.drag(this,av)
}return false},_mouseStop:function(aw){var av=this,ax=false;
if(ak.ui.ddmanager&&!this.options.dropBehaviour){ax=ak.ui.ddmanager.drop(this,aw)
}if(this.dropped){ax=this.dropped;this.dropped=false
}if((this.options.revert==="invalid"&&!ax)||(this.options.revert==="valid"&&ax)||this.options.revert===true||(ak.isFunction(this.options.revert)&&this.options.revert.call(this.element,ax))){ak(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(av._trigger("stop",aw)!==false){av._clear()
}})}else{if(this._trigger("stop",aw)!==false){this._clear()
}}return false},_mouseUp:function(av){this._unblockFrames();
if(ak.ui.ddmanager){ak.ui.ddmanager.dragStop(this,av)
}if(this.handleElement.is(av.target)){this.element.trigger("focus")
}return ak.ui.mouse.prototype._mouseUp.call(this,av)
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp(new ak.Event("mouseup",{target:this.element[0]}))
}else{this._clear()}return this},_getHandle:function(av){return this.options.handle?!!ak(av.target).closest(this.element.find(this.options.handle)).length:true
},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element;
this._addClass(this.handleElement,"ui-draggable-handle")
},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")
},_createHelper:function(aw){var ay=this.options,ax=ak.isFunction(ay.helper),av=ax?ak(ay.helper.apply(this.element[0],[aw])):(ay.helper==="clone"?this.element.clone().removeAttr("id"):this.element);
if(!av.parents("body").length){av.appendTo((ay.appendTo==="parent"?this.element[0].parentNode:ay.appendTo))
}if(ax&&av[0]===this.element[0]){this._setPositionRelative()
}if(av[0]!==this.element[0]&&!(/(fixed|absolute)/).test(av.css("position"))){av.css("position","absolute")
}return av},_setPositionRelative:function(){if(!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}},_adjustOffsetFromHelper:function(av){if(typeof av==="string"){av=av.split(" ")
}if(ak.isArray(av)){av={left:+av[0],top:+av[1]||0}
}if("left" in av){this.offset.click.left=av.left+this.margins.left
}if("right" in av){this.offset.click.left=this.helperProportions.width-av.right+this.margins.left
}if("top" in av){this.offset.click.top=av.top+this.margins.top
}if("bottom" in av){this.offset.click.top=this.helperProportions.height-av.bottom+this.margins.top
}},_isRootNode:function(av){return(/(html|body)/i).test(av.tagName)||av===this.document[0]
},_getParentOffset:function(){var aw=this.offsetParent.offset(),av=this.document[0];
if(this.cssPosition==="absolute"&&this.scrollParent[0]!==av&&ak.contains(this.scrollParent[0],this.offsetParent[0])){aw.left+=this.scrollParent.scrollLeft();
aw.top+=this.scrollParent.scrollTop()}if(this._isRootNode(this.offsetParent[0])){aw={top:0,left:0}
}return{top:aw.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:aw.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition!=="relative"){return{top:0,left:0}
}var av=this.element.position(),aw=this._isRootNode(this.scrollParent[0]);
return{top:av.top-(parseInt(this.helper.css("top"),10)||0)+(!aw?this.scrollParent.scrollTop():0),left:av.left-(parseInt(this.helper.css("left"),10)||0)+(!aw?this.scrollParent.scrollLeft():0)}
},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var aw,az,ax,ay=this.options,av=this.document[0];
this.relativeContainer=null;if(!ay.containment){this.containment=null;
return}if(ay.containment==="window"){this.containment=[ak(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,ak(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,ak(window).scrollLeft()+ak(window).width()-this.helperProportions.width-this.margins.left,ak(window).scrollTop()+(ak(window).height()||av.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
return}if(ay.containment==="document"){this.containment=[0,0,ak(av).width()-this.helperProportions.width-this.margins.left,(ak(av).height()||av.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
return}if(ay.containment.constructor===Array){this.containment=ay.containment;
return}if(ay.containment==="parent"){ay.containment=this.helper[0].parentNode
}az=ak(ay.containment);ax=az[0];if(!ax){return}aw=/(scroll|auto)/.test(az.css("overflow"));
this.containment=[(parseInt(az.css("borderLeftWidth"),10)||0)+(parseInt(az.css("paddingLeft"),10)||0),(parseInt(az.css("borderTopWidth"),10)||0)+(parseInt(az.css("paddingTop"),10)||0),(aw?Math.max(ax.scrollWidth,ax.offsetWidth):ax.offsetWidth)-(parseInt(az.css("borderRightWidth"),10)||0)-(parseInt(az.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(aw?Math.max(ax.scrollHeight,ax.offsetHeight):ax.offsetHeight)-(parseInt(az.css("borderBottomWidth"),10)||0)-(parseInt(az.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relativeContainer=az},_convertPositionTo:function(aw,ay){if(!ay){ay=this.position
}var av=aw==="absolute"?1:-1,ax=this._isRootNode(this.scrollParent[0]);
return{top:(ay.top+this.offset.relative.top*av+this.offset.parent.top*av-((this.cssPosition==="fixed"?-this.offset.scroll.top:(ax?0:this.offset.scroll.top))*av)),left:(ay.left+this.offset.relative.left*av+this.offset.parent.left*av-((this.cssPosition==="fixed"?-this.offset.scroll.left:(ax?0:this.offset.scroll.left))*av))}
},_generatePosition:function(aw,aC){var av,aD,aE,ay,ax=this.options,aB=this._isRootNode(this.scrollParent[0]),aA=aw.pageX,az=aw.pageY;
if(!aB||!this.offset.scroll){this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}
}if(aC){if(this.containment){if(this.relativeContainer){aD=this.relativeContainer.offset();
av=[this.containment[0]+aD.left,this.containment[1]+aD.top,this.containment[2]+aD.left,this.containment[3]+aD.top]
}else{av=this.containment}if(aw.pageX-this.offset.click.left<av[0]){aA=av[0]+this.offset.click.left
}if(aw.pageY-this.offset.click.top<av[1]){az=av[1]+this.offset.click.top
}if(aw.pageX-this.offset.click.left>av[2]){aA=av[2]+this.offset.click.left
}if(aw.pageY-this.offset.click.top>av[3]){az=av[3]+this.offset.click.top
}}if(ax.grid){aE=ax.grid[1]?this.originalPageY+Math.round((az-this.originalPageY)/ax.grid[1])*ax.grid[1]:this.originalPageY;
az=av?((aE-this.offset.click.top>=av[1]||aE-this.offset.click.top>av[3])?aE:((aE-this.offset.click.top>=av[1])?aE-ax.grid[1]:aE+ax.grid[1])):aE;
ay=ax.grid[0]?this.originalPageX+Math.round((aA-this.originalPageX)/ax.grid[0])*ax.grid[0]:this.originalPageX;
aA=av?((ay-this.offset.click.left>=av[0]||ay-this.offset.click.left>av[2])?ay:((ay-this.offset.click.left>=av[0])?ay-ax.grid[0]:ay+ax.grid[0])):ay
}if(ax.axis==="y"){aA=this.originalPageX}if(ax.axis==="x"){az=this.originalPageY
}}return{top:(az-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition==="fixed"?-this.offset.scroll.top:(aB?0:this.offset.scroll.top))),left:(aA-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition==="fixed"?-this.offset.scroll.left:(aB?0:this.offset.scroll.left)))}
},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging");
if(this.helper[0]!==this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;this.cancelHelperRemoval=false;
if(this.destroyOnClear){this.destroy()}},_trigger:function(av,aw,ax){ax=ax||this._uiHash();
ak.ui.plugin.call(this,av,[aw,ax,this],true);if(/^(drag|start|stop)/.test(av)){this.positionAbs=this._convertPositionTo("absolute");
ax.offset=this.positionAbs}return ak.Widget.prototype._trigger.call(this,av,aw,ax)
},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});ak.ui.plugin.add("draggable","connectToSortable",{start:function(ax,ay,av){var aw=ak.extend({},ay,{item:av.element});
av.sortables=[];ak(av.options.connectToSortable).each(function(){var az=ak(this).sortable("instance");
if(az&&!az.options.disabled){av.sortables.push(az);
az.refreshPositions();az._trigger("activate",ax,aw)
}})},stop:function(ax,ay,av){var aw=ak.extend({},ay,{item:av.element});
av.cancelHelperRemoval=false;ak.each(av.sortables,function(){var az=this;
if(az.isOver){az.isOver=0;av.cancelHelperRemoval=true;
az.cancelHelperRemoval=false;az._storedCSS={position:az.placeholder.css("position"),top:az.placeholder.css("top"),left:az.placeholder.css("left")};
az._mouseStop(ax);az.options.helper=az.options._helper
}else{az.cancelHelperRemoval=true;az._trigger("deactivate",ax,aw)
}})},drag:function(aw,ax,av){ak.each(av.sortables,function(){var ay=false,az=this;
az.positionAbs=av.positionAbs;az.helperProportions=av.helperProportions;
az.offset.click=av.offset.click;if(az._intersectsWith(az.containerCache)){ay=true;
ak.each(av.sortables,function(){this.positionAbs=av.positionAbs;
this.helperProportions=av.helperProportions;this.offset.click=av.offset.click;
if(this!==az&&this._intersectsWith(this.containerCache)&&ak.contains(az.element[0],this.element[0])){ay=false
}return ay})}if(ay){if(!az.isOver){az.isOver=1;av._parent=ax.helper.parent();
az.currentItem=ax.helper.appendTo(az.element).data("ui-sortable-item",true);
az.options._helper=az.options.helper;az.options.helper=function(){return ax.helper[0]
};aw.target=az.currentItem[0];az._mouseCapture(aw,true);
az._mouseStart(aw,true,true);az.offset.click.top=av.offset.click.top;
az.offset.click.left=av.offset.click.left;az.offset.parent.left-=av.offset.parent.left-az.offset.parent.left;
az.offset.parent.top-=av.offset.parent.top-az.offset.parent.top;
av._trigger("toSortable",aw);av.dropped=az.element;
ak.each(av.sortables,function(){this.refreshPositions()
});av.currentItem=av.element;az.fromOutside=av}if(az.currentItem){az._mouseDrag(aw);
ax.position=az.position}}else{if(az.isOver){az.isOver=0;
az.cancelHelperRemoval=true;az.options._revert=az.options.revert;
az.options.revert=false;az._trigger("out",aw,az._uiHash(az));
az._mouseStop(aw,true);az.options.revert=az.options._revert;
az.options.helper=az.options._helper;if(az.placeholder){az.placeholder.remove()
}ax.helper.appendTo(av._parent);av._refreshOffsets(aw);
ax.position=av._generatePosition(aw,true);av._trigger("fromSortable",aw);
av.dropped=false;ak.each(av.sortables,function(){this.refreshPositions()
})}}})}});ak.ui.plugin.add("draggable","cursor",{start:function(ax,ay,av){var aw=ak("body"),az=av.options;
if(aw.css("cursor")){az._cursor=aw.css("cursor")}aw.css("cursor",az.cursor)
},stop:function(aw,ax,av){var ay=av.options;if(ay._cursor){ak("body").css("cursor",ay._cursor)
}}});ak.ui.plugin.add("draggable","opacity",{start:function(ax,ay,av){var aw=ak(ay.helper),az=av.options;
if(aw.css("opacity")){az._opacity=aw.css("opacity")
}aw.css("opacity",az.opacity)},stop:function(aw,ax,av){var ay=av.options;
if(ay._opacity){ak(ax.helper).css("opacity",ay._opacity)
}}});ak.ui.plugin.add("draggable","scroll",{start:function(aw,ax,av){if(!av.scrollParentNotHidden){av.scrollParentNotHidden=av.helper.scrollParent(false)
}if(av.scrollParentNotHidden[0]!==av.document[0]&&av.scrollParentNotHidden[0].tagName!=="HTML"){av.overflowOffset=av.scrollParentNotHidden.offset()
}},drag:function(ay,az,ax){var aA=ax.options,aw=false,aB=ax.scrollParentNotHidden[0],av=ax.document[0];
if(aB!==av&&aB.tagName!=="HTML"){if(!aA.axis||aA.axis!=="x"){if((ax.overflowOffset.top+aB.offsetHeight)-ay.pageY<aA.scrollSensitivity){aB.scrollTop=aw=aB.scrollTop+aA.scrollSpeed
}else{if(ay.pageY-ax.overflowOffset.top<aA.scrollSensitivity){aB.scrollTop=aw=aB.scrollTop-aA.scrollSpeed
}}}if(!aA.axis||aA.axis!=="y"){if((ax.overflowOffset.left+aB.offsetWidth)-ay.pageX<aA.scrollSensitivity){aB.scrollLeft=aw=aB.scrollLeft+aA.scrollSpeed
}else{if(ay.pageX-ax.overflowOffset.left<aA.scrollSensitivity){aB.scrollLeft=aw=aB.scrollLeft-aA.scrollSpeed
}}}}else{if(!aA.axis||aA.axis!=="x"){if(ay.pageY-ak(av).scrollTop()<aA.scrollSensitivity){aw=ak(av).scrollTop(ak(av).scrollTop()-aA.scrollSpeed)
}else{if(ak(window).height()-(ay.pageY-ak(av).scrollTop())<aA.scrollSensitivity){aw=ak(av).scrollTop(ak(av).scrollTop()+aA.scrollSpeed)
}}}if(!aA.axis||aA.axis!=="y"){if(ay.pageX-ak(av).scrollLeft()<aA.scrollSensitivity){aw=ak(av).scrollLeft(ak(av).scrollLeft()-aA.scrollSpeed)
}else{if(ak(window).width()-(ay.pageX-ak(av).scrollLeft())<aA.scrollSensitivity){aw=ak(av).scrollLeft(ak(av).scrollLeft()+aA.scrollSpeed)
}}}}if(aw!==false&&ak.ui.ddmanager&&!aA.dropBehaviour){ak.ui.ddmanager.prepareOffsets(ax,ay)
}}});ak.ui.plugin.add("draggable","snap",{start:function(aw,ax,av){var ay=av.options;
av.snapElements=[];ak(ay.snap.constructor!==String?(ay.snap.items||":data(ui-draggable)"):ay.snap).each(function(){var aA=ak(this),az=aA.offset();
if(this!==av.element[0]){av.snapElements.push({item:this,width:aA.outerWidth(),height:aA.outerHeight(),top:az.top,left:az.left})
}})},drag:function(aH,aE,ay){var av,aM,aA,aB,aG,aD,aC,aN,aI,az,aF=ay.options,aL=aF.snapTolerance,aK=aE.offset.left,aJ=aK+ay.helperProportions.width,ax=aE.offset.top,aw=ax+ay.helperProportions.height;
for(aI=ay.snapElements.length-1;aI>=0;aI--){aG=ay.snapElements[aI].left-ay.margins.left;
aD=aG+ay.snapElements[aI].width;aC=ay.snapElements[aI].top-ay.margins.top;
aN=aC+ay.snapElements[aI].height;if(aJ<aG-aL||aK>aD+aL||aw<aC-aL||ax>aN+aL||!ak.contains(ay.snapElements[aI].item.ownerDocument,ay.snapElements[aI].item)){if(ay.snapElements[aI].snapping){(ay.options.snap.release&&ay.options.snap.release.call(ay.element,aH,ak.extend(ay._uiHash(),{snapItem:ay.snapElements[aI].item})))
}ay.snapElements[aI].snapping=false;continue}if(aF.snapMode!=="inner"){av=Math.abs(aC-aw)<=aL;
aM=Math.abs(aN-ax)<=aL;aA=Math.abs(aG-aJ)<=aL;aB=Math.abs(aD-aK)<=aL;
if(av){aE.position.top=ay._convertPositionTo("relative",{top:aC-ay.helperProportions.height,left:0}).top
}if(aM){aE.position.top=ay._convertPositionTo("relative",{top:aN,left:0}).top
}if(aA){aE.position.left=ay._convertPositionTo("relative",{top:0,left:aG-ay.helperProportions.width}).left
}if(aB){aE.position.left=ay._convertPositionTo("relative",{top:0,left:aD}).left
}}az=(av||aM||aA||aB);if(aF.snapMode!=="outer"){av=Math.abs(aC-ax)<=aL;
aM=Math.abs(aN-aw)<=aL;aA=Math.abs(aG-aK)<=aL;aB=Math.abs(aD-aJ)<=aL;
if(av){aE.position.top=ay._convertPositionTo("relative",{top:aC,left:0}).top
}if(aM){aE.position.top=ay._convertPositionTo("relative",{top:aN-ay.helperProportions.height,left:0}).top
}if(aA){aE.position.left=ay._convertPositionTo("relative",{top:0,left:aG}).left
}if(aB){aE.position.left=ay._convertPositionTo("relative",{top:0,left:aD-ay.helperProportions.width}).left
}}if(!ay.snapElements[aI].snapping&&(av||aM||aA||aB||az)){(ay.options.snap.snap&&ay.options.snap.snap.call(ay.element,aH,ak.extend(ay._uiHash(),{snapItem:ay.snapElements[aI].item})))
}ay.snapElements[aI].snapping=(av||aM||aA||aB||az)
}}});ak.ui.plugin.add("draggable","stack",{start:function(ax,ay,av){var aw,aA=av.options,az=ak.makeArray(ak(aA.stack)).sort(function(aC,aB){return(parseInt(ak(aC).css("zIndex"),10)||0)-(parseInt(ak(aB).css("zIndex"),10)||0)
});if(!az.length){return}aw=parseInt(ak(az[0]).css("zIndex"),10)||0;
ak(az).each(function(aB){ak(this).css("zIndex",aw+aB)
});this.css("zIndex",(aw+az.length))}});ak.ui.plugin.add("draggable","zIndex",{start:function(ax,ay,av){var aw=ak(ay.helper),az=av.options;
if(aw.css("zIndex")){az._zIndex=aw.css("zIndex")}aw.css("zIndex",az.zIndex)
},stop:function(aw,ax,av){var ay=av.options;if(ay._zIndex){ak(ax.helper).css("zIndex",ay._zIndex)
}}});var w=ak.ui.draggable;
/*!
 * jQuery UI Resizable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.resizable",ak.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(av){return parseFloat(av)||0
},_isNumber:function(av){return !isNaN(parseFloat(av))
},_hasScroll:function(ay,aw){if(ak(ay).css("overflow")==="hidden"){return false
}var av=(aw&&aw==="left")?"scrollLeft":"scrollTop",ax=false;
if(ay[av]>0){return true}ay[av]=1;ax=(ay[av]>0);ay[av]=0;
return ax},_create:function(){var aw,ax=this.options,av=this;
this._addClass("ui-resizable");ak.extend(this,{_aspectRatio:!!(ax.aspectRatio),aspectRatio:ax.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:ax.helper||ax.ghost||ax.animate?ax.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)){this.element.wrap(ak("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance"));
this.elementIsWrapper=true;aw={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")};
this.element.css(aw);this.originalElement.css("margin",0);
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css(aw);this._proportionallyResize()
}this._setupHandles();if(ax.autoHide){ak(this.element).on("mouseenter",function(){if(ax.disabled){return
}av._removeClass("ui-resizable-autohide");av._handles.show()
}).on("mouseleave",function(){if(ax.disabled){return
}if(!av.resizing){av._addClass("ui-resizable-autohide");
av._handles.hide()}})}this._mouseInit()},_destroy:function(){this._mouseDestroy();
var aw,av=function(ax){ak(ax).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
};if(this.elementIsWrapper){av(this.element);aw=this.element;
this.originalElement.css({position:aw.css("position"),width:aw.outerWidth(),height:aw.outerHeight(),top:aw.css("top"),left:aw.css("left")}).insertAfter(aw);
aw.remove()}this.originalElement.css("resize",this.originalResizeStyle);
av(this.originalElement);return this},_setOption:function(av,aw){this._super(av,aw);
switch(av){case"handles":this._removeHandles();this._setupHandles();
break;default:break}},_setupHandles:function(){var aA=this.options,az,aw,aB,av,ax,ay=this;
this.handles=aA.handles||(!ak(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
this._handles=ak();if(this.handles.constructor===String){if(this.handles==="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}aB=this.handles.split(",");this.handles={};for(aw=0;
aw<aB.length;aw++){az=ak.trim(aB[aw]);av="ui-resizable-"+az;
ax=ak("<div>");this._addClass(ax,"ui-resizable-handle "+av);
ax.css({zIndex:aA.zIndex});this.handles[az]=".ui-resizable-"+az;
this.element.append(ax)}}this._renderAxis=function(aG){var aD,aE,aC,aF;
aG=aG||this.element;for(aD in this.handles){if(this.handles[aD].constructor===String){this.handles[aD]=this.element.children(this.handles[aD]).first().show()
}else{if(this.handles[aD].jquery||this.handles[aD].nodeType){this.handles[aD]=ak(this.handles[aD]);
this._on(this.handles[aD],{mousedown:ay._mouseDown})
}}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)){aE=ak(this.handles[aD],this.element);
aF=/sw|ne|nw|se|n|s/.test(aD)?aE.outerHeight():aE.outerWidth();
aC=["padding",/ne|nw|n/.test(aD)?"Top":/se|sw|s/.test(aD)?"Bottom":/^e$/.test(aD)?"Right":"Left"].join("");
aG.css(aC,aF);this._proportionallyResize()}this._handles=this._handles.add(this.handles[aD])
}};this._renderAxis(this.element);this._handles=this._handles.add(this.element.find(".ui-resizable-handle"));
this._handles.disableSelection();this._handles.on("mouseover",function(){if(!ay.resizing){if(this.className){ax=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}ay.axis=ax&&ax[1]?ax[1]:"se"}});if(aA.autoHide){this._handles.hide();
this._addClass("ui-resizable-autohide")}},_removeHandles:function(){this._handles.remove()
},_mouseCapture:function(ax){var aw,ay,av=false;for(aw in this.handles){ay=ak(this.handles[aw])[0];
if(ay===ax.target||ak.contains(ay,ax.target)){av=true
}}return !this.options.disabled&&av},_mouseStart:function(aw){var aA,ax,az,ay=this.options,av=this.element;
this.resizing=true;this._renderProxy();aA=this._num(this.helper.css("left"));
ax=this._num(this.helper.css("top"));if(ay.containment){aA+=ak(ay.containment).scrollLeft()||0;
ax+=ak(ay.containment).scrollTop()||0}this.offset=this.helper.offset();
this.position={left:aA,top:ax};this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:av.width(),height:av.height()};
this.originalSize=this._helper?{width:av.outerWidth(),height:av.outerHeight()}:{width:av.width(),height:av.height()};
this.sizeDiff={width:av.outerWidth()-av.width(),height:av.outerHeight()-av.height()};
this.originalPosition={left:aA,top:ax};this.originalMousePosition={left:aw.pageX,top:aw.pageY};
this.aspectRatio=(typeof ay.aspectRatio==="number")?ay.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
az=ak(".ui-resizable-"+this.axis).css("cursor");ak("body").css("cursor",az==="auto"?this.axis+"-resize":az);
this._addClass("ui-resizable-resizing");this._propagate("start",aw);
return true},_mouseDrag:function(aA){var aB,az,aC=this.originalMousePosition,aw=this.axis,ax=(aA.pageX-aC.left)||0,av=(aA.pageY-aC.top)||0,ay=this._change[aw];
this._updatePrevProperties();if(!ay){return false
}aB=ay.apply(this,[aA,ax,av]);this._updateVirtualBoundaries(aA.shiftKey);
if(this._aspectRatio||aA.shiftKey){aB=this._updateRatio(aB,aA)
}aB=this._respectSize(aB,aA);this._updateCache(aB);
this._propagate("resize",aA);az=this._applyChanges();
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}if(!ak.isEmptyObject(az)){this._updatePrevProperties();
this._trigger("resize",aA,this.ui());this._applyChanges()
}return false},_mouseStop:function(ay){this.resizing=false;
var ax,av,aw,aB,aE,aA,aD,az=this.options,aC=this;
if(this._helper){ax=this._proportionallyResizeElements;
av=ax.length&&(/textarea/i).test(ax[0].nodeName);
aw=av&&this._hasScroll(ax[0],"left")?0:aC.sizeDiff.height;
aB=av?0:aC.sizeDiff.width;aE={width:(aC.helper.width()-aB),height:(aC.helper.height()-aw)};
aA=(parseFloat(aC.element.css("left"))+(aC.position.left-aC.originalPosition.left))||null;
aD=(parseFloat(aC.element.css("top"))+(aC.position.top-aC.originalPosition.top))||null;
if(!az.animate){this.element.css(ak.extend(aE,{top:aD,left:aA}))
}aC.helper.height(aC.size.height);aC.helper.width(aC.size.width);
if(this._helper&&!az.animate){this._proportionallyResize()
}}ak("body").css("cursor","auto");this._removeClass("ui-resizable-resizing");
this._propagate("stop",ay);if(this._helper){this.helper.remove()
}return false},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left};
this.prevSize={width:this.size.width,height:this.size.height}
},_applyChanges:function(){var av={};if(this.position.top!==this.prevPosition.top){av.top=this.position.top+"px"
}if(this.position.left!==this.prevPosition.left){av.left=this.position.left+"px"
}if(this.size.width!==this.prevSize.width){av.width=this.size.width+"px"
}if(this.size.height!==this.prevSize.height){av.height=this.size.height+"px"
}this.helper.css(av);return av},_updateVirtualBoundaries:function(ax){var az,ay,aw,aB,av,aA=this.options;
av={minWidth:this._isNumber(aA.minWidth)?aA.minWidth:0,maxWidth:this._isNumber(aA.maxWidth)?aA.maxWidth:Infinity,minHeight:this._isNumber(aA.minHeight)?aA.minHeight:0,maxHeight:this._isNumber(aA.maxHeight)?aA.maxHeight:Infinity};
if(this._aspectRatio||ax){az=av.minHeight*this.aspectRatio;
aw=av.minWidth/this.aspectRatio;ay=av.maxHeight*this.aspectRatio;
aB=av.maxWidth/this.aspectRatio;if(az>av.minWidth){av.minWidth=az
}if(aw>av.minHeight){av.minHeight=aw}if(ay<av.maxWidth){av.maxWidth=ay
}if(aB<av.maxHeight){av.maxHeight=aB}}this._vBoundaries=av
},_updateCache:function(av){this.offset=this.helper.offset();
if(this._isNumber(av.left)){this.position.left=av.left
}if(this._isNumber(av.top)){this.position.top=av.top
}if(this._isNumber(av.height)){this.size.height=av.height
}if(this._isNumber(av.width)){this.size.width=av.width
}},_updateRatio:function(ax){var ay=this.position,aw=this.size,av=this.axis;
if(this._isNumber(ax.height)){ax.width=(ax.height*this.aspectRatio)
}else{if(this._isNumber(ax.width)){ax.height=(ax.width/this.aspectRatio)
}}if(av==="sw"){ax.left=ay.left+(aw.width-ax.width);
ax.top=null}if(av==="nw"){ax.top=ay.top+(aw.height-ax.height);
ax.left=ay.left+(aw.width-ax.width)}return ax},_respectSize:function(aA){var ax=this._vBoundaries,aD=this.axis,aF=this._isNumber(aA.width)&&ax.maxWidth&&(ax.maxWidth<aA.width),aB=this._isNumber(aA.height)&&ax.maxHeight&&(ax.maxHeight<aA.height),ay=this._isNumber(aA.width)&&ax.minWidth&&(ax.minWidth>aA.width),aE=this._isNumber(aA.height)&&ax.minHeight&&(ax.minHeight>aA.height),aw=this.originalPosition.left+this.originalSize.width,aC=this.originalPosition.top+this.originalSize.height,az=/sw|nw|w/.test(aD),av=/nw|ne|n/.test(aD);
if(ay){aA.width=ax.minWidth}if(aE){aA.height=ax.minHeight
}if(aF){aA.width=ax.maxWidth}if(aB){aA.height=ax.maxHeight
}if(ay&&az){aA.left=aw-ax.minWidth}if(aF&&az){aA.left=aw-ax.maxWidth
}if(aE&&av){aA.top=aC-ax.minHeight}if(aB&&av){aA.top=aC-ax.maxHeight
}if(!aA.width&&!aA.height&&!aA.left&&aA.top){aA.top=null
}else{if(!aA.width&&!aA.height&&!aA.top&&aA.left){aA.left=null
}}return aA},_getPaddingPlusBorderDimensions:function(ax){var aw=0,ay=[],az=[ax.css("borderTopWidth"),ax.css("borderRightWidth"),ax.css("borderBottomWidth"),ax.css("borderLeftWidth")],av=[ax.css("paddingTop"),ax.css("paddingRight"),ax.css("paddingBottom"),ax.css("paddingLeft")];
for(;aw<4;aw++){ay[aw]=(parseFloat(az[aw])||0);ay[aw]+=(parseFloat(av[aw])||0)
}return{height:ay[0]+ay[2],width:ay[1]+ay[3]}},_proportionallyResize:function(){if(!this._proportionallyResizeElements.length){return
}var ax,aw=0,av=this.helper||this.element;for(;aw<this._proportionallyResizeElements.length;
aw++){ax=this._proportionallyResizeElements[aw];if(!this.outerDimensions){this.outerDimensions=this._getPaddingPlusBorderDimensions(ax)
}ax.css({height:(av.height()-this.outerDimensions.height)||0,width:(av.width()-this.outerDimensions.width)||0})
}},_renderProxy:function(){var av=this.element,aw=this.options;
this.elementOffset=av.offset();if(this._helper){this.helper=this.helper||ak("<div style='overflow:hidden;'></div>");
this._addClass(this.helper,this._helper);this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++aw.zIndex});
this.helper.appendTo("body").disableSelection()}else{this.helper=this.element
}},_change:{e:function(aw,av){return{width:this.originalSize.width+av}
},w:function(ax,av){var aw=this.originalSize,ay=this.originalPosition;
return{left:ay.left+av,width:aw.width-av}},n:function(ay,aw,av){var ax=this.originalSize,az=this.originalPosition;
return{top:az.top+av,height:ax.height-av}},s:function(ax,aw,av){return{height:this.originalSize.height+av}
},se:function(ax,aw,av){return ak.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[ax,aw,av]))
},sw:function(ax,aw,av){return ak.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[ax,aw,av]))
},ne:function(ax,aw,av){return ak.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[ax,aw,av]))
},nw:function(ax,aw,av){return ak.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[ax,aw,av]))
}},_propagate:function(aw,av){ak.ui.plugin.call(this,aw,[av,this.ui()]);
(aw!=="resize"&&this._trigger(aw,av,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});ak.ui.plugin.add("resizable","animate",{stop:function(ay){var aD=ak(this).resizable("instance"),aA=aD.options,ax=aD._proportionallyResizeElements,av=ax.length&&(/textarea/i).test(ax[0].nodeName),aw=av&&aD._hasScroll(ax[0],"left")?0:aD.sizeDiff.height,aC=av?0:aD.sizeDiff.width,az={width:(aD.size.width-aC),height:(aD.size.height-aw)},aB=(parseFloat(aD.element.css("left"))+(aD.position.left-aD.originalPosition.left))||null,aE=(parseFloat(aD.element.css("top"))+(aD.position.top-aD.originalPosition.top))||null;
aD.element.animate(ak.extend(az,aE&&aB?{top:aE,left:aB}:{}),{duration:aA.animateDuration,easing:aA.animateEasing,step:function(){var aF={width:parseFloat(aD.element.css("width")),height:parseFloat(aD.element.css("height")),top:parseFloat(aD.element.css("top")),left:parseFloat(aD.element.css("left"))};
if(ax&&ax.length){ak(ax[0]).css({width:aF.width,height:aF.height})
}aD._updateCache(aF);aD._propagate("resize",ay)}})
}});ak.ui.plugin.add("resizable","containment",{start:function(){var aD,ax,aF,av,aC,ay,aG,aE=ak(this).resizable("instance"),aB=aE.options,aA=aE.element,aw=aB.containment,az=(aw instanceof ak)?aw.get(0):(/parent/.test(aw))?aA.parent().get(0):aw;
if(!az){return}aE.containerElement=ak(az);if(/document/.test(aw)||aw===document){aE.containerOffset={left:0,top:0};
aE.containerPosition={left:0,top:0};aE.parentData={element:ak(document),left:0,top:0,width:ak(document).width(),height:ak(document).height()||document.body.parentNode.scrollHeight}
}else{aD=ak(az);ax=[];ak(["Top","Right","Left","Bottom"]).each(function(aI,aH){ax[aI]=aE._num(aD.css("padding"+aH))
});aE.containerOffset=aD.offset();aE.containerPosition=aD.position();
aE.containerSize={height:(aD.innerHeight()-ax[3]),width:(aD.innerWidth()-ax[1])};
aF=aE.containerOffset;av=aE.containerSize.height;
aC=aE.containerSize.width;ay=(aE._hasScroll(az,"left")?az.scrollWidth:aC);
aG=(aE._hasScroll(az)?az.scrollHeight:av);aE.parentData={element:az,left:aF.left,top:aF.top,width:ay,height:aG}
}},resize:function(aw){var aC,aH,aB,az,aD=ak(this).resizable("instance"),ay=aD.options,aF=aD.containerOffset,aE=aD.position,aG=aD._aspectRatio||aw.shiftKey,av={top:0,left:0},ax=aD.containerElement,aA=true;
if(ax[0]!==document&&(/static/).test(ax.css("position"))){av=aF
}if(aE.left<(aD._helper?aF.left:0)){aD.size.width=aD.size.width+(aD._helper?(aD.position.left-aF.left):(aD.position.left-av.left));
if(aG){aD.size.height=aD.size.width/aD.aspectRatio;
aA=false}aD.position.left=ay.helper?aF.left:0}if(aE.top<(aD._helper?aF.top:0)){aD.size.height=aD.size.height+(aD._helper?(aD.position.top-aF.top):aD.position.top);
if(aG){aD.size.width=aD.size.height*aD.aspectRatio;
aA=false}aD.position.top=aD._helper?aF.top:0}aB=aD.containerElement.get(0)===aD.element.parent().get(0);
az=/relative|absolute/.test(aD.containerElement.css("position"));
if(aB&&az){aD.offset.left=aD.parentData.left+aD.position.left;
aD.offset.top=aD.parentData.top+aD.position.top}else{aD.offset.left=aD.element.offset().left;
aD.offset.top=aD.element.offset().top}aC=Math.abs(aD.sizeDiff.width+(aD._helper?aD.offset.left-av.left:(aD.offset.left-aF.left)));
aH=Math.abs(aD.sizeDiff.height+(aD._helper?aD.offset.top-av.top:(aD.offset.top-aF.top)));
if(aC+aD.size.width>=aD.parentData.width){aD.size.width=aD.parentData.width-aC;
if(aG){aD.size.height=aD.size.width/aD.aspectRatio;
aA=false}}if(aH+aD.size.height>=aD.parentData.height){aD.size.height=aD.parentData.height-aH;
if(aG){aD.size.width=aD.size.height*aD.aspectRatio;
aA=false}}if(!aA){aD.position.left=aD.prevPosition.left;
aD.position.top=aD.prevPosition.top;aD.size.width=aD.prevSize.width;
aD.size.height=aD.prevSize.height}},stop:function(){var aA=ak(this).resizable("instance"),aw=aA.options,aB=aA.containerOffset,av=aA.containerPosition,ax=aA.containerElement,ay=ak(aA.helper),aD=ay.offset(),aC=ay.outerWidth()-aA.sizeDiff.width,az=ay.outerHeight()-aA.sizeDiff.height;
if(aA._helper&&!aw.animate&&(/relative/).test(ax.css("position"))){ak(this).css({left:aD.left-av.left-aB.left,width:aC,height:az})
}if(aA._helper&&!aw.animate&&(/static/).test(ax.css("position"))){ak(this).css({left:aD.left-av.left-aB.left,width:aC,height:az})
}}});ak.ui.plugin.add("resizable","alsoResize",{start:function(){var av=ak(this).resizable("instance"),aw=av.options;
ak(aw.alsoResize).each(function(){var ax=ak(this);
ax.data("ui-resizable-alsoresize",{width:parseFloat(ax.width()),height:parseFloat(ax.height()),left:parseFloat(ax.css("left")),top:parseFloat(ax.css("top"))})
})},resize:function(aw,ay){var av=ak(this).resizable("instance"),az=av.options,ax=av.originalSize,aB=av.originalPosition,aA={height:(av.size.height-ax.height)||0,width:(av.size.width-ax.width)||0,top:(av.position.top-aB.top)||0,left:(av.position.left-aB.left)||0};
ak(az.alsoResize).each(function(){var aE=ak(this),aF=ak(this).data("ui-resizable-alsoresize"),aD={},aC=aE.parents(ay.originalElement[0]).length?["width","height"]:["width","height","top","left"];
ak.each(aC,function(aG,aI){var aH=(aF[aI]||0)+(aA[aI]||0);
if(aH&&aH>=0){aD[aI]=aH||null}});aE.css(aD)})},stop:function(){ak(this).removeData("ui-resizable-alsoresize")
}});ak.ui.plugin.add("resizable","ghost",{start:function(){var aw=ak(this).resizable("instance"),av=aw.size;
aw.ghost=aw.originalElement.clone();aw.ghost.css({opacity:0.25,display:"block",position:"relative",height:av.height,width:av.width,margin:0,left:0,top:0});
aw._addClass(aw.ghost,"ui-resizable-ghost");if(ak.uiBackCompat!==false&&typeof aw.options.ghost==="string"){aw.ghost.addClass(this.options.ghost)
}aw.ghost.appendTo(aw.helper)},resize:function(){var av=ak(this).resizable("instance");
if(av.ghost){av.ghost.css({position:"relative",height:av.size.height,width:av.size.width})
}},stop:function(){var av=ak(this).resizable("instance");
if(av.ghost&&av.helper){av.helper.get(0).removeChild(av.ghost.get(0))
}}});ak.ui.plugin.add("resizable","grid",{resize:function(){var ay,aD=ak(this).resizable("instance"),aH=aD.options,aB=aD.size,aC=aD.originalSize,aE=aD.originalPosition,aM=aD.axis,av=typeof aH.grid==="number"?[aH.grid,aH.grid]:aH.grid,aK=(av[0]||1),aJ=(av[1]||1),aA=Math.round((aB.width-aC.width)/aK)*aK,az=Math.round((aB.height-aC.height)/aJ)*aJ,aF=aC.width+aA,aI=aC.height+az,ax=aH.maxWidth&&(aH.maxWidth<aF),aG=aH.maxHeight&&(aH.maxHeight<aI),aL=aH.minWidth&&(aH.minWidth>aF),aw=aH.minHeight&&(aH.minHeight>aI);
aH.grid=av;if(aL){aF+=aK}if(aw){aI+=aJ}if(ax){aF-=aK
}if(aG){aI-=aJ}if(/^(se|s|e)$/.test(aM)){aD.size.width=aF;
aD.size.height=aI}else{if(/^(ne)$/.test(aM)){aD.size.width=aF;
aD.size.height=aI;aD.position.top=aE.top-az}else{if(/^(sw)$/.test(aM)){aD.size.width=aF;
aD.size.height=aI;aD.position.left=aE.left-aA}else{if(aI-aJ<=0||aF-aK<=0){ay=aD._getPaddingPlusBorderDimensions(this)
}if(aI-aJ>0){aD.size.height=aI;aD.position.top=aE.top-az
}else{aI=aJ-ay.height;aD.size.height=aI;aD.position.top=aE.top+aC.height-aI
}if(aF-aK>0){aD.size.width=aF;aD.position.left=aE.left-aA
}else{aF=aK-ay.width;aD.size.width=aF;aD.position.left=aE.left+aC.width-aF
}}}}}});var B=ak.ui.resizable;
/*!
 * jQuery UI Dialog 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:true,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:true,closeText:"Close",draggable:true,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(aw){var av=ak(this).css(aw).offset().top;
if(av<0){ak(this).css("top",aw.top-av)}}},resizable:true,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},resizableRelatedOptions:{maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height};
this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)};
this.originalTitle=this.element.attr("title");if(this.options.title==null&&this.originalTitle!=null){this.options.title=this.originalTitle
}if(this.options.disabled){this.options.disabled=false
}this._createWrapper();this.element.show().removeAttr("title").appendTo(this.uiDialog);
this._addClass("ui-dialog-content","ui-widget-content");
this._createTitlebar();this._createButtonPane();if(this.options.draggable&&ak.fn.draggable){this._makeDraggable()
}if(this.options.resizable&&ak.fn.resizable){this._makeResizable()
}this._isOpen=false;this._trackFocus()},_init:function(){if(this.options.autoOpen){this.open()
}},_appendTo:function(){var av=this.options.appendTo;
if(av&&(av.jquery||av.nodeType)){return ak(av)}return this.document.find(av||"body").eq(0)
},_destroy:function(){var aw,av=this.originalPosition;
this._untrackInstance();this._destroyOverlay();this.element.removeUniqueId().css(this.originalCss).detach();
this.uiDialog.remove();if(this.originalTitle){this.element.attr("title",this.originalTitle)
}aw=av.parent.children().eq(av.index);if(aw.length&&aw[0]!==this.element[0]){aw.before(this.element)
}else{av.parent.append(this.element)}},widget:function(){return this.uiDialog
},disable:ak.noop,enable:ak.noop,close:function(aw){var av=this;
if(!this._isOpen||this._trigger("beforeClose",aw)===false){return
}this._isOpen=false;this._focusedElement=null;this._destroyOverlay();
this._untrackInstance();if(!this.opener.filter(":focusable").trigger("focus").length){ak.ui.safeBlur(ak.ui.safeActiveElement(this.document[0]))
}this._hide(this.uiDialog,this.options.hide,function(){av._trigger("close",aw)
})},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()
},_moveToTop:function(az,av){var ay=false,ax=this.uiDialog.siblings(".ui-front:visible").map(function(){return +ak(this).css("z-index")
}).get(),aw=Math.max.apply(null,ax);if(aw>=+this.uiDialog.css("z-index")){this.uiDialog.css("z-index",aw+1);
ay=true}if(ay&&!av){this._trigger("focus",az)}return ay
},open:function(){var av=this;if(this._isOpen){if(this._moveToTop()){this._focusTabbable()
}return}this._isOpen=true;this.opener=ak(ak.ui.safeActiveElement(this.document[0]));
this._size();this._position();this._createOverlay();
this._moveToTop(null,true);if(this.overlay){this.overlay.css("z-index",this.uiDialog.css("z-index")-1)
}this._show(this.uiDialog,this.options.show,function(){av._focusTabbable();
av._trigger("focus")});this._makeFocusTarget();this._trigger("open")
},_focusTabbable:function(){var av=this._focusedElement;
if(!av){av=this.element.find("[autofocus]")}if(!av.length){av=this.element.find(":tabbable")
}if(!av.length){av=this.uiDialogButtonPane.find(":tabbable")
}if(!av.length){av=this.uiDialogTitlebarClose.filter(":tabbable")
}if(!av.length){av=this.uiDialog}av.eq(0).trigger("focus")
},_keepFocus:function(av){function aw(){var ay=ak.ui.safeActiveElement(this.document[0]),ax=this.uiDialog[0]===ay||ak.contains(this.uiDialog[0],ay);
if(!ax){this._focusTabbable()}}av.preventDefault();
aw.call(this);this._delay(aw)},_createWrapper:function(){this.uiDialog=ak("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo());
this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front");
this._on(this.uiDialog,{keydown:function(ax){if(this.options.closeOnEscape&&!ax.isDefaultPrevented()&&ax.keyCode&&ax.keyCode===ak.ui.keyCode.ESCAPE){ax.preventDefault();
this.close(ax);return}if(ax.keyCode!==ak.ui.keyCode.TAB||ax.isDefaultPrevented()){return
}var aw=this.uiDialog.find(":tabbable"),ay=aw.filter(":first"),av=aw.filter(":last");
if((ax.target===av[0]||ax.target===this.uiDialog[0])&&!ax.shiftKey){this._delay(function(){ay.trigger("focus")
});ax.preventDefault()}else{if((ax.target===ay[0]||ax.target===this.uiDialog[0])&&ax.shiftKey){this._delay(function(){av.trigger("focus")
});ax.preventDefault()}}},mousedown:function(av){if(this._moveToTop(av)){this._focusTabbable()
}}});if(!this.element.find("[aria-describedby]").length){this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})
}},_createTitlebar:function(){var av;this.uiDialogTitlebar=ak("<div>");
this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix");
this._on(this.uiDialogTitlebar,{mousedown:function(aw){if(!ak(aw.target).closest(".ui-dialog-titlebar-close")){this.uiDialog.trigger("focus")
}}});this.uiDialogTitlebarClose=ak("<button type='button'></button>").button({label:ak("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:false}).appendTo(this.uiDialogTitlebar);
this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close");
this._on(this.uiDialogTitlebarClose,{click:function(aw){aw.preventDefault();
this.close(aw)}});av=ak("<span>").uniqueId().prependTo(this.uiDialogTitlebar);
this._addClass(av,"ui-dialog-title");this._title(av);
this.uiDialogTitlebar.prependTo(this.uiDialog);this.uiDialog.attr({"aria-labelledby":av.attr("id")})
},_title:function(av){if(this.options.title){av.text(this.options.title)
}else{av.html("&#160;")}},_createButtonPane:function(){this.uiDialogButtonPane=ak("<div>");
this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix");
this.uiButtonSet=ak("<div>").appendTo(this.uiDialogButtonPane);
this._addClass(this.uiButtonSet,"ui-dialog-buttonset");
this._createButtons()},_createButtons:function(){var aw=this,av=this.options.buttons;
this.uiDialogButtonPane.remove();this.uiButtonSet.empty();
if(ak.isEmptyObject(av)||(ak.isArray(av)&&!av.length)){this._removeClass(this.uiDialog,"ui-dialog-buttons");
return}ak.each(av,function(ax,ay){var az,aA;ay=ak.isFunction(ay)?{click:ay,text:ax}:ay;
ay=ak.extend({type:"button"},ay);az=ay.click;aA={icon:ay.icon,iconPosition:ay.iconPosition,showLabel:ay.showLabel,icons:ay.icons,text:ay.text};
delete ay.click;delete ay.icon;delete ay.iconPosition;
delete ay.showLabel;delete ay.icons;if(typeof ay.text==="boolean"){delete ay.text
}ak("<button></button>",ay).button(aA).appendTo(aw.uiButtonSet).on("click",function(){az.apply(aw.element[0],arguments)
})});this._addClass(this.uiDialog,"ui-dialog-buttons");
this.uiDialogButtonPane.appendTo(this.uiDialog)},_makeDraggable:function(){var ax=this,aw=this.options;
function av(ay){return{position:ay.position,offset:ay.offset}
}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(ay,az){ax._addClass(ak(this),"ui-dialog-dragging");
ax._blockFrames();ax._trigger("dragStart",ay,av(az))
},drag:function(ay,az){ax._trigger("drag",ay,av(az))
},stop:function(ay,az){var aB=az.offset.left-ax.document.scrollLeft(),aA=az.offset.top-ax.document.scrollTop();
aw.position={my:"left top",at:"left"+(aB>=0?"+":"")+aB+" top"+(aA>=0?"+":"")+aA,of:ax.window};
ax._removeClass(ak(this),"ui-dialog-dragging");ax._unblockFrames();
ax._trigger("dragStop",ay,av(az))}})},_makeResizable:function(){var aA=this,ay=this.options,az=ay.resizable,av=this.uiDialog.css("position"),ax=typeof az==="string"?az:"n,e,s,w,se,sw,ne,nw";
function aw(aB){return{originalPosition:aB.originalPosition,originalSize:aB.originalSize,position:aB.position,size:aB.size}
}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:ay.maxWidth,maxHeight:ay.maxHeight,minWidth:ay.minWidth,minHeight:this._minHeight(),handles:ax,start:function(aB,aC){aA._addClass(ak(this),"ui-dialog-resizing");
aA._blockFrames();aA._trigger("resizeStart",aB,aw(aC))
},resize:function(aB,aC){aA._trigger("resize",aB,aw(aC))
},stop:function(aB,aC){var aF=aA.uiDialog.offset(),aE=aF.left-aA.document.scrollLeft(),aD=aF.top-aA.document.scrollTop();
ay.height=aA.uiDialog.height();ay.width=aA.uiDialog.width();
ay.position={my:"left top",at:"left"+(aE>=0?"+":"")+aE+" top"+(aD>=0?"+":"")+aD,of:aA.window};
aA._removeClass(ak(this),"ui-dialog-resizing");aA._unblockFrames();
aA._trigger("resizeStop",aB,aw(aC))}}).css("position",av)
},_trackFocus:function(){this._on(this.widget(),{focusin:function(av){this._makeFocusTarget();
this._focusedElement=ak(av.target)}})},_makeFocusTarget:function(){this._untrackInstance();
this._trackingInstances().unshift(this)},_untrackInstance:function(){var aw=this._trackingInstances(),av=ak.inArray(this,aw);
if(av!==-1){aw.splice(av,1)}},_trackingInstances:function(){var av=this.document.data("ui-dialog-instances");
if(!av){av=[];this.document.data("ui-dialog-instances",av)
}return av},_minHeight:function(){var av=this.options;
return av.height==="auto"?av.minHeight:Math.min(av.minHeight,av.height)
},_position:function(){var av=this.uiDialog.is(":visible");
if(!av){this.uiDialog.show()}this.uiDialog.position(this.options.position);
if(!av){this.uiDialog.hide()}},_setOptions:function(ax){var ay=this,aw=false,av={};
ak.each(ax,function(az,aA){ay._setOption(az,aA);if(az in ay.sizeRelatedOptions){aw=true
}if(az in ay.resizableRelatedOptions){av[az]=aA}});
if(aw){this._size();this._position()}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option",av)
}},_setOption:function(ax,ay){var aw,az,av=this.uiDialog;
if(ax==="disabled"){return}this._super(ax,ay);if(ax==="appendTo"){this.uiDialog.appendTo(this._appendTo())
}if(ax==="buttons"){this._createButtons()}if(ax==="closeText"){this.uiDialogTitlebarClose.button({label:ak("<a>").text(""+this.options.closeText).html()})
}if(ax==="draggable"){aw=av.is(":data(ui-draggable)");
if(aw&&!ay){av.draggable("destroy")}if(!aw&&ay){this._makeDraggable()
}}if(ax==="position"){this._position()}if(ax==="resizable"){az=av.is(":data(ui-resizable)");
if(az&&!ay){av.resizable("destroy")}if(az&&typeof ay==="string"){av.resizable("option","handles",ay)
}if(!az&&ay!==false){this._makeResizable()}}if(ax==="title"){this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
}},_size:function(){var av,ax,ay,aw=this.options;
this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0});
if(aw.minWidth>aw.width){aw.width=aw.minWidth}av=this.uiDialog.css({height:"auto",width:aw.width}).outerHeight();
ax=Math.max(0,aw.minHeight-av);ay=typeof aw.maxHeight==="number"?Math.max(0,aw.maxHeight-av):"none";
if(aw.height==="auto"){this.element.css({minHeight:ax,maxHeight:ay,height:"auto"})
}else{this.element.height(Math.max(0,aw.height-av))
}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var av=ak(this);
return ak("<div>").css({position:"absolute",width:av.outerWidth(),height:av.outerHeight()}).appendTo(av.parent()).offset(av.offset())[0]
})},_unblockFrames:function(){if(this.iframeBlocks){this.iframeBlocks.remove();
delete this.iframeBlocks}},_allowInteraction:function(av){if(ak(av.target).closest(".ui-dialog").length){return true
}return !!ak(av.target).closest(".ui-datepicker").length
},_createOverlay:function(){if(!this.options.modal){return
}var av=true;this._delay(function(){av=false});if(!this.document.data("ui-dialog-overlays")){this._on(this.document,{focusin:function(aw){if(av){return
}if(!this._allowInteraction(aw)){aw.preventDefault();
this._trackingInstances()[0]._focusTabbable()}}})
}this.overlay=ak("<div>").appendTo(this._appendTo());
this._addClass(this.overlay,null,"ui-widget-overlay ui-front");
this._on(this.overlay,{mousedown:"_keepFocus"});this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)
},_destroyOverlay:function(){if(!this.options.modal){return
}if(this.overlay){var av=this.document.data("ui-dialog-overlays")-1;
if(!av){this._off(this.document,"focusin");this.document.removeData("ui-dialog-overlays")
}else{this.document.data("ui-dialog-overlays",av)
}this.overlay.remove();this.overlay=null}}});if(ak.uiBackCompat!==false){ak.widget("ui.dialog",ak.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super();
this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(av,aw){if(av==="dialogClass"){this.uiDialog.removeClass(this.options.dialogClass).addClass(aw)
}this._superApply(arguments)}})}var ac=ak.ui.dialog;
/*!
 * jQuery UI Droppable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:true,greedy:false,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var aw,ax=this.options,av=ax.accept;
this.isover=false;this.isout=true;this.accept=ak.isFunction(av)?av:function(ay){return ay.is(av)
};this.proportions=function(){if(arguments.length){aw=arguments[0]
}else{return aw?aw:aw={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}
}};this._addToManager(ax.scope);ax.addClasses&&this._addClass("ui-droppable")
},_addToManager:function(av){ak.ui.ddmanager.droppables[av]=ak.ui.ddmanager.droppables[av]||[];
ak.ui.ddmanager.droppables[av].push(this)},_splice:function(av){var aw=0;
for(;aw<av.length;aw++){if(av[aw]===this){av.splice(aw,1)
}}},_destroy:function(){var av=ak.ui.ddmanager.droppables[this.options.scope];
this._splice(av)},_setOption:function(aw,ax){if(aw==="accept"){this.accept=ak.isFunction(ax)?ax:function(ay){return ay.is(ax)
}}else{if(aw==="scope"){var av=ak.ui.ddmanager.droppables[this.options.scope];
this._splice(av);this._addToManager(ax)}}this._super(aw,ax)
},_activate:function(aw){var av=ak.ui.ddmanager.current;
this._addActiveClass();if(av){this._trigger("activate",aw,this.ui(av))
}},_deactivate:function(aw){var av=ak.ui.ddmanager.current;
this._removeActiveClass();if(av){this._trigger("deactivate",aw,this.ui(av))
}},_over:function(aw){var av=ak.ui.ddmanager.current;
if(!av||(av.currentItem||av.element)[0]===this.element[0]){return
}if(this.accept.call(this.element[0],(av.currentItem||av.element))){this._addHoverClass();
this._trigger("over",aw,this.ui(av))}},_out:function(aw){var av=ak.ui.ddmanager.current;
if(!av||(av.currentItem||av.element)[0]===this.element[0]){return
}if(this.accept.call(this.element[0],(av.currentItem||av.element))){this._removeHoverClass();
this._trigger("out",aw,this.ui(av))}},_drop:function(aw,ax){var av=ax||ak.ui.ddmanager.current,ay=false;
if(!av||(av.currentItem||av.element)[0]===this.element[0]){return false
}this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var az=ak(this).droppable("instance");
if(az.options.greedy&&!az.options.disabled&&az.options.scope===av.options.scope&&az.accept.call(az.element[0],(av.currentItem||av.element))&&s(av,ak.extend(az,{offset:az.element.offset()}),az.options.tolerance,aw)){ay=true;
return false}});if(ay){return false}if(this.accept.call(this.element[0],(av.currentItem||av.element))){this._removeActiveClass();
this._removeHoverClass();this._trigger("drop",aw,this.ui(av));
return this.element}return false},ui:function(av){return{draggable:(av.currentItem||av.element),helper:av.helper,position:av.position,offset:av.positionAbs}
},_addHoverClass:function(){this._addClass("ui-droppable-hover")
},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")
},_addActiveClass:function(){this._addClass("ui-droppable-active")
},_removeActiveClass:function(){this._removeClass("ui-droppable-active")
}});var s=ak.ui.intersect=(function(){function av(ax,aw,ay){return(ax>=aw)&&(ax<(aw+ay))
}return function(aH,aB,aF,ax){if(!aB.offset){return false
}var az=(aH.positionAbs||aH.position.absolute).left+aH.margins.left,aE=(aH.positionAbs||aH.position.absolute).top+aH.margins.top,ay=az+aH.helperProportions.width,aD=aE+aH.helperProportions.height,aA=aB.offset.left,aG=aB.offset.top,aw=aA+aB.proportions().width,aC=aG+aB.proportions().height;
switch(aF){case"fit":return(aA<=az&&ay<=aw&&aG<=aE&&aD<=aC);
case"intersect":return(aA<az+(aH.helperProportions.width/2)&&ay-(aH.helperProportions.width/2)<aw&&aG<aE+(aH.helperProportions.height/2)&&aD-(aH.helperProportions.height/2)<aC);
case"pointer":return av(ax.pageY,aG,aB.proportions().height)&&av(ax.pageX,aA,aB.proportions().width);
case"touch":return((aE>=aG&&aE<=aC)||(aD>=aG&&aD<=aC)||(aE<aG&&aD>aC))&&((az>=aA&&az<=aw)||(ay>=aA&&ay<=aw)||(az<aA&&ay>aw));
default:return false}}})();ak.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(ay,aA){var ax,aw,av=ak.ui.ddmanager.droppables[ay.options.scope]||[],az=aA?aA.type:null,aB=(ay.currentItem||ay.element).find(":data(ui-droppable)").addBack();
droppablesLoop:for(ax=0;ax<av.length;ax++){if(av[ax].options.disabled||(ay&&!av[ax].accept.call(av[ax].element[0],(ay.currentItem||ay.element)))){continue
}for(aw=0;aw<aB.length;aw++){if(aB[aw]===av[ax].element[0]){av[ax].proportions().height=0;
continue droppablesLoop}}av[ax].visible=av[ax].element.css("display")!=="none";
if(!av[ax].visible){continue}if(az==="mousedown"){av[ax]._activate.call(av[ax],aA)
}av[ax].offset=av[ax].element.offset();av[ax].proportions({width:av[ax].element[0].offsetWidth,height:av[ax].element[0].offsetHeight})
}},drop:function(av,aw){var ax=false;ak.each((ak.ui.ddmanager.droppables[av.options.scope]||[]).slice(),function(){if(!this.options){return
}if(!this.options.disabled&&this.visible&&s(av,this,this.options.tolerance,aw)){ax=this._drop.call(this,aw)||ax
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(av.currentItem||av.element))){this.isout=true;
this.isover=false;this._deactivate.call(this,aw)}});
return ax},dragStart:function(av,aw){av.element.parentsUntil("body").on("scroll.droppable",function(){if(!av.options.refreshPositions){ak.ui.ddmanager.prepareOffsets(av,aw)
}})},drag:function(av,aw){if(av.options.refreshPositions){ak.ui.ddmanager.prepareOffsets(av,aw)
}ak.each(ak.ui.ddmanager.droppables[av.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return
}var aA,ay,ax,az=s(av,this,this.options.tolerance,aw),aB=!az&&this.isover?"isout":(az&&!this.isover?"isover":null);
if(!aB){return}if(this.options.greedy){ay=this.options.scope;
ax=this.element.parents(":data(ui-droppable)").filter(function(){return ak(this).droppable("instance").options.scope===ay
});if(ax.length){aA=ak(ax[0]).droppable("instance");
aA.greedyChild=(aB==="isover")}}if(aA&&aB==="isover"){aA.isover=false;
aA.isout=true;aA._out.call(aA,aw)}this[aB]=true;this[aB==="isout"?"isover":"isout"]=false;
this[aB==="isover"?"_over":"_out"].call(this,aw);
if(aA&&aB==="isout"){aA.isout=false;aA.isover=true;
aA._over.call(aA,aw)}})},dragStop:function(av,aw){av.element.parentsUntil("body").off("scroll.droppable");
if(!av.options.refreshPositions){ak.ui.ddmanager.prepareOffsets(av,aw)
}}};if(ak.uiBackCompat!==false){ak.widget("ui.droppable",ak.ui.droppable,{options:{hoverClass:false,activeClass:false},_addActiveClass:function(){this._super();
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}},_removeActiveClass:function(){this._super();if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}},_addHoverClass:function(){this._super();if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}},_removeHoverClass:function(){this._super();if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}}})}var W=ak.ui.droppable;
/*!
 * jQuery UI Progressbar 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var Y=ak.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue();
this.element.attr({role:"progressbar","aria-valuemin":this.min});
this._addClass("ui-progressbar","ui-widget ui-widget-content");
this.valueDiv=ak("<div>").appendTo(this.element);
this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header");
this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");
this.valueDiv.remove()},value:function(av){if(av===undefined){return this.options.value
}this.options.value=this._constrainedValue(av);this._refreshValue()
},_constrainedValue:function(av){if(av===undefined){av=this.options.value
}this.indeterminate=av===false;if(typeof av!=="number"){av=0
}return this.indeterminate?false:Math.min(this.options.max,Math.max(this.min,av))
},_setOptions:function(av){var aw=av.value;delete av.value;
this._super(av);this.options.value=this._constrainedValue(aw);
this._refreshValue()},_setOption:function(av,aw){if(av==="max"){aw=Math.max(this.min,aw)
}this._super(av,aw)},_setOptionDisabled:function(av){this._super(av);
this.element.attr("aria-disabled",av);this._toggleClass(null,"ui-state-disabled",!!av)
},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)
},_refreshValue:function(){var aw=this.options.value,av=this._percentage();
this.valueDiv.toggle(this.indeterminate||aw>this.min).width(av.toFixed(0)+"%");
this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,aw===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate);
if(this.indeterminate){this.element.removeAttr("aria-valuenow");
if(!this.overlayDiv){this.overlayDiv=ak("<div>").appendTo(this.valueDiv);
this._addClass(this.overlayDiv,"ui-progressbar-overlay")
}}else{this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":aw});
if(this.overlayDiv){this.overlayDiv.remove();this.overlayDiv=null
}}if(this.oldValue!==aw){this.oldValue=aw;this._trigger("change")
}if(aw===this.options.max){this._trigger("complete")
}}});
/*!
 * jQuery UI Selectable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var r=ak.widget("ui.selectable",ak.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var av=this;
this._addClass("ui-selectable");this.dragged=false;
this.refresh=function(){av.elementPos=ak(av.element[0]).offset();
av.selectees=ak(av.options.filter,av.element[0]);
av._addClass(av.selectees,"ui-selectee");av.selectees.each(function(){var ax=ak(this),aw=ax.offset(),ay={left:aw.left-av.elementPos.left,top:aw.top-av.elementPos.top};
ak.data(this,"selectable-item",{element:this,$element:ax,left:ay.left,top:ay.top,right:ay.left+ax.outerWidth(),bottom:ay.top+ax.outerHeight(),startselected:false,selected:ax.hasClass("ui-selected"),selecting:ax.hasClass("ui-selecting"),unselecting:ax.hasClass("ui-unselecting")})
})};this.refresh();this._mouseInit();this.helper=ak("<div>");
this._addClass(this.helper,"ui-selectable-helper")
},_destroy:function(){this.selectees.removeData("selectable-item");
this._mouseDestroy()},_mouseStart:function(ax){var aw=this,av=this.options;
this.opos=[ax.pageX,ax.pageY];this.elementPos=ak(this.element[0]).offset();
if(this.options.disabled){return}this.selectees=ak(av.filter,this.element[0]);
this._trigger("start",ax);ak(av.appendTo).append(this.helper);
this.helper.css({left:ax.pageX,top:ax.pageY,width:0,height:0});
if(av.autoRefresh){this.refresh()}this.selectees.filter(".ui-selected").each(function(){var ay=ak.data(this,"selectable-item");
ay.startselected=true;if(!ax.metaKey&&!ax.ctrlKey){aw._removeClass(ay.$element,"ui-selected");
ay.selected=false;aw._addClass(ay.$element,"ui-unselecting");
ay.unselecting=true;aw._trigger("unselecting",ax,{unselecting:ay.element})
}});ak(ax.target).parents().addBack().each(function(){var ay,az=ak.data(this,"selectable-item");
if(az){ay=(!ax.metaKey&&!ax.ctrlKey)||!az.$element.hasClass("ui-selected");
aw._removeClass(az.$element,ay?"ui-unselecting":"ui-selected")._addClass(az.$element,ay?"ui-selecting":"ui-unselecting");
az.unselecting=!ay;az.selecting=ay;az.selected=ay;
if(ay){aw._trigger("selecting",ax,{selecting:az.element})
}else{aw._trigger("unselecting",ax,{unselecting:az.element})
}return false}})},_mouseDrag:function(aC){this.dragged=true;
if(this.options.disabled){return}var az,aB=this,ax=this.options,aw=this.opos[0],aA=this.opos[1],av=aC.pageX,ay=aC.pageY;
if(aw>av){az=av;av=aw;aw=az}if(aA>ay){az=ay;ay=aA;
aA=az}this.helper.css({left:aw,top:aA,width:av-aw,height:ay-aA});
this.selectees.each(function(){var aD=ak.data(this,"selectable-item"),aE=false,aF={};
if(!aD||aD.element===aB.element[0]){return}aF.left=aD.left+aB.elementPos.left;
aF.right=aD.right+aB.elementPos.left;aF.top=aD.top+aB.elementPos.top;
aF.bottom=aD.bottom+aB.elementPos.top;if(ax.tolerance==="touch"){aE=(!(aF.left>av||aF.right<aw||aF.top>ay||aF.bottom<aA))
}else{if(ax.tolerance==="fit"){aE=(aF.left>aw&&aF.right<av&&aF.top>aA&&aF.bottom<ay)
}}if(aE){if(aD.selected){aB._removeClass(aD.$element,"ui-selected");
aD.selected=false}if(aD.unselecting){aB._removeClass(aD.$element,"ui-unselecting");
aD.unselecting=false}if(!aD.selecting){aB._addClass(aD.$element,"ui-selecting");
aD.selecting=true;aB._trigger("selecting",aC,{selecting:aD.element})
}}else{if(aD.selecting){if((aC.metaKey||aC.ctrlKey)&&aD.startselected){aB._removeClass(aD.$element,"ui-selecting");
aD.selecting=false;aB._addClass(aD.$element,"ui-selected");
aD.selected=true}else{aB._removeClass(aD.$element,"ui-selecting");
aD.selecting=false;if(aD.startselected){aB._addClass(aD.$element,"ui-unselecting");
aD.unselecting=true}aB._trigger("unselecting",aC,{unselecting:aD.element})
}}if(aD.selected){if(!aC.metaKey&&!aC.ctrlKey&&!aD.startselected){aB._removeClass(aD.$element,"ui-selected");
aD.selected=false;aB._addClass(aD.$element,"ui-unselecting");
aD.unselecting=true;aB._trigger("unselecting",aC,{unselecting:aD.element})
}}}});return false},_mouseStop:function(aw){var av=this;
this.dragged=false;ak(".ui-unselecting",this.element[0]).each(function(){var ax=ak.data(this,"selectable-item");
av._removeClass(ax.$element,"ui-unselecting");ax.unselecting=false;
ax.startselected=false;av._trigger("unselected",aw,{unselected:ax.element})
});ak(".ui-selecting",this.element[0]).each(function(){var ax=ak.data(this,"selectable-item");
av._removeClass(ax.$element,"ui-selecting")._addClass(ax.$element,"ui-selected");
ax.selecting=false;ax.selected=true;ax.startselected=true;
av._trigger("selected",aw,{selected:ax.element})});
this._trigger("stop",aw);this.helper.remove();return false
}});
/*!
 * jQuery UI Selectmenu 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var e=ak.widget("ui.selectmenu",[ak.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:false,change:null,close:null,focus:null,open:null,select:null},_create:function(){var av=this.element.uniqueId().attr("id");
this.ids={element:av,button:av+"-button",menu:av+"-menu"};
this._drawButton();this._drawMenu();this._bindFormResetHandler();
this._rendered=false;this.menuItems=ak()},_drawButton:function(){var av,ax=this,aw=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);
this.labels=this.element.labels().attr("for",this.ids.button);
this._on(this.labels,{click:function(ay){this.button.focus();
ay.preventDefault()}});this.element.hide();this.button=ak("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element);
this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget");
av=ak("<span>").appendTo(this.button);this._addClass(av,"ui-selectmenu-icon","ui-icon "+this.options.icons.button);
this.buttonItem=this._renderButtonItem(aw).appendTo(this.button);
if(this.options.width!==false){this._resizeButton()
}this._on(this.button,this._buttonEvents);this.button.one("focusin",function(){if(!ax._rendered){ax._refreshMenu()
}})},_drawMenu:function(){var av=this;this.menu=ak("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu});
this.menuWrap=ak("<div>").append(this.menu);this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front");
this.menuWrap.appendTo(this._appendTo());this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(aw,ax){aw.preventDefault();
av._setSelection();av._select(ax.item.data("ui-selectmenu-item"),aw)
},focus:function(ax,ay){var aw=ay.item.data("ui-selectmenu-item");
if(av.focusIndex!=null&&aw.index!==av.focusIndex){av._trigger("focus",ax,{item:aw});
if(!av.isOpen){av._select(aw,ax)}}av.focusIndex=aw.index;
av.button.attr("aria-activedescendant",av.menuItems.eq(aw.index).attr("id"))
}}).menu("instance");this.menuInstance._off(this.menu,"mouseleave");
this.menuInstance._closeOnDocumentClick=function(){return false
};this.menuInstance._isDivider=function(){return false
}},refresh:function(){this._refreshMenu();this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{}));
if(this.options.width===null){this._resizeButton()
}},_refreshMenu:function(){var aw,av=this.element.find("option");
this.menu.empty();this._parseOptions(av);this._renderMenu(this.menu,this.items);
this.menuInstance.refresh();this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper");
this._rendered=true;if(!av.length){return}aw=this._getSelectedItem();
this.menuInstance.focus(null,aw);this._setAria(aw.data("ui-selectmenu-item"));
this._setOption("disabled",this.element.prop("disabled"))
},open:function(av){if(this.options.disabled){return
}if(!this._rendered){this._refreshMenu()}else{this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active");
this.menuInstance.focus(null,this._getSelectedItem())
}if(!this.menuItems.length){return}this.isOpen=true;
this._toggleAttr();this._resizeMenu();this._position();
this._on(this.document,this._documentClick);this._trigger("open",av)
},_position:function(){this.menuWrap.position(ak.extend({of:this.button},this.options.position))
},close:function(av){if(!this.isOpen){return}this.isOpen=false;
this._toggleAttr();this.range=null;this._off(this.document);
this._trigger("close",av)},widget:function(){return this.button
},menuWidget:function(){return this.menu},_renderButtonItem:function(aw){var av=ak("<span>");
this._setText(av,aw.label);this._addClass(av,"ui-selectmenu-text");
return av},_renderMenu:function(ax,aw){var ay=this,av="";
ak.each(aw,function(aA,aB){var az;if(aB.optgroup!==av){az=ak("<li>",{text:aB.optgroup});
ay._addClass(az,"ui-selectmenu-optgroup","ui-menu-divider"+(aB.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""));
az.appendTo(ax);av=aB.optgroup}ay._renderItemData(ax,aB)
})},_renderItemData:function(av,aw){return this._renderItem(av,aw).data("ui-selectmenu-item",aw)
},_renderItem:function(aw,ax){var av=ak("<li>"),ay=ak("<div>",{title:ax.element.attr("title")});
if(ax.disabled){this._addClass(av,null,"ui-state-disabled")
}this._setText(ay,ax.label);return av.append(ay).appendTo(aw)
},_setText:function(av,aw){if(aw){av.text(aw)}else{av.html("&#160;")
}},_move:function(az,ay){var ax,aw,av=".ui-menu-item";
if(this.isOpen){ax=this.menuItems.eq(this.focusIndex).parent("li")
}else{ax=this.menuItems.eq(this.element[0].selectedIndex).parent("li");
av+=":not(.ui-state-disabled)"}if(az==="first"||az==="last"){aw=ax[az==="first"?"prevAll":"nextAll"](av).eq(-1)
}else{aw=ax[az+"All"](av).eq(0)}if(aw.length){this.menuInstance.focus(ay,aw)
}},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
},_toggle:function(av){this[this.isOpen?"close":"open"](av)
},_setSelection:function(){var av;if(!this.range){return
}if(window.getSelection){av=window.getSelection();
av.removeAllRanges();av.addRange(this.range)}else{this.range.select()
}this.button.focus()},_documentClick:{mousedown:function(av){if(!this.isOpen){return
}if(!ak(av.target).closest(".ui-selectmenu-menu, #"+ak.ui.escapeSelector(this.ids.button)).length){this.close(av)
}}},_buttonEvents:{mousedown:function(){var av;if(window.getSelection){av=window.getSelection();
if(av.rangeCount){this.range=av.getRangeAt(0)}}else{this.range=document.selection.createRange()
}},click:function(av){this._setSelection();this._toggle(av)
},keydown:function(aw){var av=true;switch(aw.keyCode){case ak.ui.keyCode.TAB:case ak.ui.keyCode.ESCAPE:this.close(aw);
av=false;break;case ak.ui.keyCode.ENTER:if(this.isOpen){this._selectFocusedItem(aw)
}break;case ak.ui.keyCode.UP:if(aw.altKey){this._toggle(aw)
}else{this._move("prev",aw)}break;case ak.ui.keyCode.DOWN:if(aw.altKey){this._toggle(aw)
}else{this._move("next",aw)}break;case ak.ui.keyCode.SPACE:if(this.isOpen){this._selectFocusedItem(aw)
}else{this._toggle(aw)}break;case ak.ui.keyCode.LEFT:this._move("prev",aw);
break;case ak.ui.keyCode.RIGHT:this._move("next",aw);
break;case ak.ui.keyCode.HOME:case ak.ui.keyCode.PAGE_UP:this._move("first",aw);
break;case ak.ui.keyCode.END:case ak.ui.keyCode.PAGE_DOWN:this._move("last",aw);
break;default:this.menu.trigger(aw);av=false}if(av){aw.preventDefault()
}}},_selectFocusedItem:function(aw){var av=this.menuItems.eq(this.focusIndex).parent("li");
if(!av.hasClass("ui-state-disabled")){this._select(av.data("ui-selectmenu-item"),aw)
}},_select:function(aw,av){var ax=this.element[0].selectedIndex;
this.element[0].selectedIndex=aw.index;this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(aw));
this._setAria(aw);this._trigger("select",av,{item:aw});
if(aw.index!==ax){this._trigger("change",av,{item:aw})
}this.close(av)},_setAria:function(av){var aw=this.menuItems.eq(av.index).attr("id");
this.button.attr({"aria-labelledby":aw,"aria-activedescendant":aw});
this.menu.attr("aria-activedescendant",aw)},_setOption:function(av,ax){if(av==="icons"){var aw=this.button.find("span.ui-icon");
this._removeClass(aw,null,this.options.icons.button)._addClass(aw,null,ax.button)
}this._super(av,ax);if(av==="appendTo"){this.menuWrap.appendTo(this._appendTo())
}if(av==="width"){this._resizeButton()}},_setOptionDisabled:function(av){this._super(av);
this.menuInstance.option("disabled",av);this.button.attr("aria-disabled",av);
this._toggleClass(this.button,null,"ui-state-disabled",av);
this.element.prop("disabled",av);if(av){this.button.attr("tabindex",-1);
this.close()}else{this.button.attr("tabindex",0)}},_appendTo:function(){var av=this.options.appendTo;
if(av){av=av.jquery||av.nodeType?ak(av):this.document.find(av).eq(0)
}if(!av||!av[0]){av=this.element.closest(".ui-front, dialog")
}if(!av.length){av=this.document[0].body}return av
},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen);
this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen);
this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var av=this.options.width;
if(av===false){this.button.css("width","");return
}if(av===null){av=this.element.show().outerWidth();
this.element.hide()}this.button.outerWidth(av)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))
},_getCreateOptions:function(){var av=this._super();
av.disabled=this.element.prop("disabled");return av
},_parseOptions:function(av){var aw=this,ax=[];av.each(function(ay,az){ax.push(aw._parseOption(ak(az),ay))
});this.items=ax},_parseOption:function(ax,aw){var av=ax.parent("optgroup");
return{element:ax,index:aw,value:ax.val(),label:ax.text(),optgroup:av.attr("label")||"",disabled:av.prop("disabled")||ax.prop("disabled")}
},_destroy:function(){this._unbindFormResetHandler();
this.menuWrap.remove();this.button.remove();this.element.show();
this.element.removeUniqueId();this.labels.attr("for",this.ids.element)
}}]);
/*!
 * jQuery UI Slider 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var Q=ak.widget("ui.slider",ak.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:false,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=false;
this._mouseSliding=false;this._animateOff=true;this._handleIndex=null;
this._detectOrientation();this._mouseInit();this._calculateNewMax();
this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content");
this._refresh();this._animateOff=false},_refresh:function(){this._createRange();
this._createHandles();this._setupEvents();this._refreshValue()
},_createHandles:function(){var ay,av,aw=this.options,aA=this.element.find(".ui-slider-handle"),az="<span tabindex='0'></span>",ax=[];
av=(aw.values&&aw.values.length)||1;if(aA.length>av){aA.slice(av).remove();
aA=aA.slice(0,av)}for(ay=aA.length;ay<av;ay++){ax.push(az)
}this.handles=aA.add(ak(ax.join("")).appendTo(this.element));
this._addClass(this.handles,"ui-slider-handle","ui-state-default");
this.handle=this.handles.eq(0);this.handles.each(function(aB){ak(this).data("ui-slider-handle-index",aB).attr("tabIndex",0)
})},_createRange:function(){var av=this.options;if(av.range){if(av.range===true){if(!av.values){av.values=[this._valueMin(),this._valueMin()]
}else{if(av.values.length&&av.values.length!==2){av.values=[av.values[0],av.values[0]]
}else{if(ak.isArray(av.values)){av.values=av.values.slice(0)
}}}}if(!this.range||!this.range.length){this.range=ak("<div>").appendTo(this.element);
this._addClass(this.range,"ui-slider-range")}else{this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max");
this.range.css({left:"",bottom:""})}if(av.range==="min"||av.range==="max"){this._addClass(this.range,"ui-slider-range-"+av.range)
}}else{if(this.range){this.range.remove()}this.range=null
}},_setupEvents:function(){this._off(this.handles);
this._on(this.handles,this._handleEvents);this._hoverable(this.handles);
this._focusable(this.handles)},_destroy:function(){this.handles.remove();
if(this.range){this.range.remove()}this._mouseDestroy()
},_mouseCapture:function(ax){var aB,aE,aw,az,aD,aF,aA,av,aC=this,ay=this.options;
if(ay.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();aB={x:ax.pageX,y:ax.pageY};
aE=this._normValueFromMouse(aB);aw=this._valueMax()-this._valueMin()+1;
this.handles.each(function(aG){var aH=Math.abs(aE-aC.values(aG));
if((aw>aH)||(aw===aH&&(aG===aC._lastChangedValue||aC.values(aG)===ay.min))){aw=aH;
az=ak(this);aD=aG}});aF=this._start(ax,aD);if(aF===false){return false
}this._mouseSliding=true;this._handleIndex=aD;this._addClass(az,null,"ui-state-active");
az.trigger("focus");aA=az.offset();av=!ak(ax.target).parents().addBack().is(".ui-slider-handle");
this._clickOffset=av?{left:0,top:0}:{left:ax.pageX-aA.left-(az.width()/2),top:ax.pageY-aA.top-(az.height()/2)-(parseInt(az.css("borderTopWidth"),10)||0)-(parseInt(az.css("borderBottomWidth"),10)||0)+(parseInt(az.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){this._slide(ax,aD,aE)
}this._animateOff=true;return true},_mouseStart:function(){return true
},_mouseDrag:function(ax){var av={x:ax.pageX,y:ax.pageY},aw=this._normValueFromMouse(av);
this._slide(ax,this._handleIndex,aw);return false
},_mouseStop:function(av){this._removeClass(this.handles,null,"ui-state-active");
this._mouseSliding=false;this._stop(av,this._handleIndex);
this._change(av,this._handleIndex);this._handleIndex=null;
this._clickOffset=null;this._animateOff=false;return false
},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"
},_normValueFromMouse:function(aw){var av,az,ay,ax,aA;
if(this.orientation==="horizontal"){av=this.elementSize.width;
az=aw.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{av=this.elementSize.height;az=aw.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}ay=(az/av);if(ay>1){ay=1}if(ay<0){ay=0}if(this.orientation==="vertical"){ay=1-ay
}ax=this._valueMax()-this._valueMin();aA=this._valueMin()+ay*ax;
return this._trimAlignValue(aA)},_uiHash:function(ax,ay,av){var aw={handle:this.handles[ax],handleIndex:ax,value:ay!==undefined?ay:this.value()};
if(this._hasMultipleValues()){aw.value=ay!==undefined?ay:this.values(ax);
aw.values=av||this.values()}return aw},_hasMultipleValues:function(){return this.options.values&&this.options.values.length
},_start:function(aw,av){return this._trigger("start",aw,this._uiHash(av))
},_slide:function(aA,ay,ax){var aB,av,az=this.value(),aw=this.values();
if(this._hasMultipleValues()){av=this.values(ay?0:1);
az=this.values(ay);if(this.options.values.length===2&&this.options.range===true){ax=ay===0?Math.min(av,ax):Math.max(av,ax)
}aw[ay]=ax}if(ax===az){return}aB=this._trigger("slide",aA,this._uiHash(ay,ax,aw));
if(aB===false){return}if(this._hasMultipleValues()){this.values(ay,ax)
}else{this.value(ax)}},_stop:function(aw,av){this._trigger("stop",aw,this._uiHash(av))
},_change:function(aw,av){if(!this._keySliding&&!this._mouseSliding){this._lastChangedValue=av;
this._trigger("change",aw,this._uiHash(av))}},value:function(av){if(arguments.length){this.options.value=this._trimAlignValue(av);
this._refreshValue();this._change(null,0);return}return this._value()
},values:function(aw,az){var ay,av,ax;if(arguments.length>1){this.options.values[aw]=this._trimAlignValue(az);
this._refreshValue();this._change(null,aw);return
}if(arguments.length){if(ak.isArray(arguments[0])){ay=this.options.values;
av=arguments[0];for(ax=0;ax<ay.length;ax+=1){ay[ax]=this._trimAlignValue(av[ax]);
this._change(null,ax)}this._refreshValue()}else{if(this._hasMultipleValues()){return this._values(aw)
}else{return this.value()}}}else{return this._values()
}},_setOption:function(aw,ax){var av,ay=0;if(aw==="range"&&this.options.range===true){if(ax==="min"){this.options.value=this._values(0);
this.options.values=null}else{if(ax==="max"){this.options.value=this._values(this.options.values.length-1);
this.options.values=null}}}if(ak.isArray(this.options.values)){ay=this.options.values.length
}this._super(aw,ax);switch(aw){case"orientation":this._detectOrientation();
this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation);
this._refreshValue();if(this.options.range){this._refreshRange(ax)
}this.handles.css(ax==="horizontal"?"bottom":"left","");
break;case"value":this._animateOff=true;this._refreshValue();
this._change(null,0);this._animateOff=false;break;
case"values":this._animateOff=true;this._refreshValue();
for(av=ay-1;av>=0;av--){this._change(null,av)}this._animateOff=false;
break;case"step":case"min":case"max":this._animateOff=true;
this._calculateNewMax();this._refreshValue();this._animateOff=false;
break;case"range":this._animateOff=true;this._refresh();
this._animateOff=false;break}},_setOptionDisabled:function(av){this._super(av);
this._toggleClass(null,"ui-state-disabled",!!av)},_value:function(){var av=this.options.value;
av=this._trimAlignValue(av);return av},_values:function(av){var ay,ax,aw;
if(arguments.length){ay=this.options.values[av];ay=this._trimAlignValue(ay);
return ay}else{if(this._hasMultipleValues()){ax=this.options.values.slice();
for(aw=0;aw<ax.length;aw+=1){ax[aw]=this._trimAlignValue(ax[aw])
}return ax}else{return[]}}},_trimAlignValue:function(ay){if(ay<=this._valueMin()){return this._valueMin()
}if(ay>=this._valueMax()){return this._valueMax()
}var av=(this.options.step>0)?this.options.step:1,ax=(ay-this._valueMin())%av,aw=ay-ax;
if(Math.abs(ax)*2>=av){aw+=(ax>0)?av:(-av)}return parseFloat(aw.toFixed(5))
},_calculateNewMax:function(){var av=this.options.max,aw=this._valueMin(),ax=this.options.step,ay=Math.round((av-aw)/ax)*ax;
av=ay+aw;if(av>this.options.max){av-=ax}this.max=parseFloat(av.toFixed(this._precision()))
},_precision:function(){var av=this._precisionOf(this.options.step);
if(this.options.min!==null){av=Math.max(av,this._precisionOf(this.options.min))
}return av},_precisionOf:function(aw){var ax=aw.toString(),av=ax.indexOf(".");
return av===-1?0:ax.length-av-1},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.max},_refreshRange:function(av){if(av==="vertical"){this.range.css({width:"",left:""})
}if(av==="horizontal"){this.range.css({height:"",bottom:""})
}},_refreshValue:function(){var aA,az,aD,aB,aE,ay=this.options.range,ax=this.options,aC=this,aw=(!this._animateOff)?ax.animate:false,av={};
if(this._hasMultipleValues()){this.handles.each(function(aF){az=(aC.values(aF)-aC._valueMin())/(aC._valueMax()-aC._valueMin())*100;
av[aC.orientation==="horizontal"?"left":"bottom"]=az+"%";
ak(this).stop(1,1)[aw?"animate":"css"](av,ax.animate);
if(aC.options.range===true){if(aC.orientation==="horizontal"){if(aF===0){aC.range.stop(1,1)[aw?"animate":"css"]({left:az+"%"},ax.animate)
}if(aF===1){aC.range[aw?"animate":"css"]({width:(az-aA)+"%"},{queue:false,duration:ax.animate})
}}else{if(aF===0){aC.range.stop(1,1)[aw?"animate":"css"]({bottom:(az)+"%"},ax.animate)
}if(aF===1){aC.range[aw?"animate":"css"]({height:(az-aA)+"%"},{queue:false,duration:ax.animate})
}}}aA=az})}else{aD=this.value();aB=this._valueMin();
aE=this._valueMax();az=(aE!==aB)?(aD-aB)/(aE-aB)*100:0;
av[this.orientation==="horizontal"?"left":"bottom"]=az+"%";
this.handle.stop(1,1)[aw?"animate":"css"](av,ax.animate);
if(ay==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[aw?"animate":"css"]({width:az+"%"},ax.animate)
}if(ay==="max"&&this.orientation==="horizontal"){this.range.stop(1,1)[aw?"animate":"css"]({width:(100-az)+"%"},ax.animate)
}if(ay==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[aw?"animate":"css"]({height:az+"%"},ax.animate)
}if(ay==="max"&&this.orientation==="vertical"){this.range.stop(1,1)[aw?"animate":"css"]({height:(100-az)+"%"},ax.animate)
}}},_handleEvents:{keydown:function(az){var aA,ax,aw,ay,av=ak(az.target).data("ui-slider-handle-index");
switch(az.keyCode){case ak.ui.keyCode.HOME:case ak.ui.keyCode.END:case ak.ui.keyCode.PAGE_UP:case ak.ui.keyCode.PAGE_DOWN:case ak.ui.keyCode.UP:case ak.ui.keyCode.RIGHT:case ak.ui.keyCode.DOWN:case ak.ui.keyCode.LEFT:az.preventDefault();
if(!this._keySliding){this._keySliding=true;this._addClass(ak(az.target),null,"ui-state-active");
aA=this._start(az,av);if(aA===false){return}}break
}ay=this.options.step;if(this._hasMultipleValues()){ax=aw=this.values(av)
}else{ax=aw=this.value()}switch(az.keyCode){case ak.ui.keyCode.HOME:aw=this._valueMin();
break;case ak.ui.keyCode.END:aw=this._valueMax();
break;case ak.ui.keyCode.PAGE_UP:aw=this._trimAlignValue(ax+((this._valueMax()-this._valueMin())/this.numPages));
break;case ak.ui.keyCode.PAGE_DOWN:aw=this._trimAlignValue(ax-((this._valueMax()-this._valueMin())/this.numPages));
break;case ak.ui.keyCode.UP:case ak.ui.keyCode.RIGHT:if(ax===this._valueMax()){return
}aw=this._trimAlignValue(ax+ay);break;case ak.ui.keyCode.DOWN:case ak.ui.keyCode.LEFT:if(ax===this._valueMin()){return
}aw=this._trimAlignValue(ax-ay);break}this._slide(az,av,aw)
},keyup:function(aw){var av=ak(aw.target).data("ui-slider-handle-index");
if(this._keySliding){this._keySliding=false;this._stop(aw,av);
this._change(aw,av);this._removeClass(ak(aw.target),null,"ui-state-active")
}}}});
/*!
 * jQuery UI Sortable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
var T=ak.widget("ui.sortable",ak.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(aw,av,ax){return(aw>=av)&&(aw<(av+ax))
},_isFloating:function(av){return(/left|right/).test(av.css("float"))||(/inline|table-cell/).test(av.css("display"))
},_create:function(){this.containerCache={};this._addClass("ui-sortable");
this.refresh();this.offset=this.element.offset();
this._mouseInit();this._setHandleClassName();this.ready=true
},_setOption:function(av,aw){this._super(av,aw);if(av==="handle"){this._setHandleClassName()
}},_setHandleClassName:function(){var av=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle");
ak.each(this.items,function(){av._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")
})},_destroy:function(){this._mouseDestroy();for(var av=this.items.length-1;
av>=0;av--){this.items[av].item.removeData(this.widgetName+"-item")
}return this},_mouseCapture:function(ax,ay){var av=null,az=false,aw=this;
if(this.reverting){return false}if(this.options.disabled||this.options.type==="static"){return false
}this._refreshItems(ax);ak(ax.target).parents().each(function(){if(ak.data(this,aw.widgetName+"-item")===aw){av=ak(this);
return false}});if(ak.data(ax.target,aw.widgetName+"-item")===aw){av=ak(ax.target)
}if(!av){return false}if(this.options.handle&&!ay){ak(this.options.handle,av).find("*").addBack().each(function(){if(this===ax.target){az=true
}});if(!az){return false}}this.currentItem=av;this._removeCurrentsFromItems();
return true},_mouseStart:function(ay,az,aw){var ax,av,aA=this.options;
this.currentContainer=this;this.refreshPositions();
this.helper=this._createHelper(ay);this._cacheHelperProportions();
this._cacheMargins();this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
ak.extend(this.offset,{click:{left:ay.pageX-this.offset.left,top:ay.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");
this.originalPosition=this._generatePosition(ay);
this.originalPageX=ay.pageX;this.originalPageY=ay.pageY;
(aA.cursorAt&&this._adjustOffsetFromHelper(aA.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!==this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();if(aA.containment){this._setContainment()
}if(aA.cursor&&aA.cursor!=="auto"){av=this.document.find("body");
this.storedCursor=av.css("cursor");av.css("cursor",aA.cursor);
this.storedStylesheet=ak("<style>*{ cursor: "+aA.cursor+" !important; }</style>").appendTo(av)
}if(aA.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",aA.opacity)}if(aA.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",aA.zIndex)}if(this.scrollParent[0]!==this.document[0]&&this.scrollParent[0].tagName!=="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",ay,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!aw){for(ax=this.containers.length-1;ax>=0;ax--){this.containers[ax]._trigger("activate",ay,this._uiHash(this))
}}if(ak.ui.ddmanager){ak.ui.ddmanager.current=this
}if(ak.ui.ddmanager&&!aA.dropBehaviour){ak.ui.ddmanager.prepareOffsets(this,ay)
}this.dragging=true;this._addClass(this.helper,"ui-sortable-helper");
this._mouseDrag(ay);return true},_mouseDrag:function(az){var ax,ay,aw,aB,aA=this.options,av=false;
this.position=this._generatePosition(az);this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){if(this.scrollParent[0]!==this.document[0]&&this.scrollParent[0].tagName!=="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-az.pageY<aA.scrollSensitivity){this.scrollParent[0].scrollTop=av=this.scrollParent[0].scrollTop+aA.scrollSpeed
}else{if(az.pageY-this.overflowOffset.top<aA.scrollSensitivity){this.scrollParent[0].scrollTop=av=this.scrollParent[0].scrollTop-aA.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-az.pageX<aA.scrollSensitivity){this.scrollParent[0].scrollLeft=av=this.scrollParent[0].scrollLeft+aA.scrollSpeed
}else{if(az.pageX-this.overflowOffset.left<aA.scrollSensitivity){this.scrollParent[0].scrollLeft=av=this.scrollParent[0].scrollLeft-aA.scrollSpeed
}}}else{if(az.pageY-this.document.scrollTop()<aA.scrollSensitivity){av=this.document.scrollTop(this.document.scrollTop()-aA.scrollSpeed)
}else{if(this.window.height()-(az.pageY-this.document.scrollTop())<aA.scrollSensitivity){av=this.document.scrollTop(this.document.scrollTop()+aA.scrollSpeed)
}}if(az.pageX-this.document.scrollLeft()<aA.scrollSensitivity){av=this.document.scrollLeft(this.document.scrollLeft()-aA.scrollSpeed)
}else{if(this.window.width()-(az.pageX-this.document.scrollLeft())<aA.scrollSensitivity){av=this.document.scrollLeft(this.document.scrollLeft()+aA.scrollSpeed)
}}}if(av!==false&&ak.ui.ddmanager&&!aA.dropBehaviour){ak.ui.ddmanager.prepareOffsets(this,az)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!=="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!=="x"){this.helper[0].style.top=this.position.top+"px"
}for(ax=this.items.length-1;ax>=0;ax--){ay=this.items[ax];
aw=ay.item[0];aB=this._intersectsWithPointer(ay);
if(!aB){continue}if(ay.instance!==this.currentContainer){continue
}if(aw!==this.currentItem[0]&&this.placeholder[aB===1?"next":"prev"]()[0]!==aw&&!ak.contains(this.placeholder[0],aw)&&(this.options.type==="semi-dynamic"?!ak.contains(this.element[0],aw):true)){this.direction=aB===1?"down":"up";
if(this.options.tolerance==="pointer"||this._intersectsWithSides(ay)){this._rearrange(az,ay)
}else{break}this._trigger("change",az,this._uiHash());
break}}this._contactContainers(az);if(ak.ui.ddmanager){ak.ui.ddmanager.drag(this,az)
}this._trigger("sort",az,this._uiHash());this.lastPositionAbs=this.positionAbs;
return false},_mouseStop:function(ax,az){if(!ax){return
}if(ak.ui.ddmanager&&!this.options.dropBehaviour){ak.ui.ddmanager.drop(this,ax)
}if(this.options.revert){var aw=this,aA=this.placeholder.offset(),av=this.options.axis,ay={};
if(!av||av==="x"){ay.left=aA.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)
}if(!av||av==="y"){ay.top=aA.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)
}this.reverting=true;ak(this.helper).animate(ay,parseInt(this.options.revert,10)||500,function(){aw._clear(ax)
})}else{this._clear(ax,az)}return false},cancel:function(){if(this.dragging){this._mouseUp(new ak.Event("mouseup",{target:null}));
if(this.options.helper==="original"){this.currentItem.css(this._storedCSS);
this._removeClass(this.currentItem,"ui-sortable-helper")
}else{this.currentItem.show()}for(var av=this.containers.length-1;
av>=0;av--){this.containers[av]._trigger("deactivate",null,this._uiHash(this));
if(this.containers[av].containerCache.over){this.containers[av]._trigger("out",null,this._uiHash(this));
this.containers[av].containerCache.over=0}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!=="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}ak.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){ak(this.domPosition.prev).after(this.currentItem)
}else{ak(this.domPosition.parent).prepend(this.currentItem)
}}return this},serialize:function(ax){var av=this._getItemsAsjQuery(ax&&ax.connected),aw=[];
ax=ax||{};ak(av).each(function(){var ay=(ak(ax.item||this).attr(ax.attribute||"id")||"").match(ax.expression||(/(.+)[\-=_](.+)/));
if(ay){aw.push((ax.key||ay[1]+"[]")+"="+(ax.key&&ax.expression?ay[1]:ay[2]))
}});if(!aw.length&&ax.key){aw.push(ax.key+"=")}return aw.join("&")
},toArray:function(ax){var av=this._getItemsAsjQuery(ax&&ax.connected),aw=[];
ax=ax||{};av.each(function(){aw.push(ak(ax.item||this).attr(ax.attribute||"id")||"")
});return aw},_intersectsWith:function(aG){var ax=this.positionAbs.left,aw=ax+this.helperProportions.width,aE=this.positionAbs.top,aD=aE+this.helperProportions.height,ay=aG.left,av=ay+aG.width,aH=aG.top,aC=aH+aG.height,aI=this.offset.click.top,aB=this.offset.click.left,aA=(this.options.axis==="x")||((aE+aI)>aH&&(aE+aI)<aC),aF=(this.options.axis==="y")||((ax+aB)>ay&&(ax+aB)<av),az=aA&&aF;
if(this.options.tolerance==="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!=="pointer"&&this.helperProportions[this.floating?"width":"height"]>aG[this.floating?"width":"height"])){return az
}else{return(ay<ax+(this.helperProportions.width/2)&&aw-(this.helperProportions.width/2)<av&&aH<aE+(this.helperProportions.height/2)&&aD-(this.helperProportions.height/2)<aC)
}},_intersectsWithPointer:function(ax){var aw,aA,ay=(this.options.axis==="x")||this._isOverAxis(this.positionAbs.top+this.offset.click.top,ax.top,ax.height),av=(this.options.axis==="y")||this._isOverAxis(this.positionAbs.left+this.offset.click.left,ax.left,ax.width),az=ay&&av;
if(!az){return false}aw=this._getDragVerticalDirection();
aA=this._getDragHorizontalDirection();return this.floating?((aA==="right"||aw==="down")?2:1):(aw&&(aw==="down"?2:1))
},_intersectsWithSides:function(ay){var aw=this._isOverAxis(this.positionAbs.top+this.offset.click.top,ay.top+(ay.height/2),ay.height),ax=this._isOverAxis(this.positionAbs.left+this.offset.click.left,ay.left+(ay.width/2),ay.width),av=this._getDragVerticalDirection(),az=this._getDragHorizontalDirection();
if(this.floating&&az){return((az==="right"&&ax)||(az==="left"&&!ax))
}else{return av&&((av==="down"&&aw)||(av==="up"&&!aw))
}},_getDragVerticalDirection:function(){var av=this.positionAbs.top-this.lastPositionAbs.top;
return av!==0&&(av>0?"down":"up")},_getDragHorizontalDirection:function(){var av=this.positionAbs.left-this.lastPositionAbs.left;
return av!==0&&(av>0?"right":"left")},refresh:function(av){this._refreshItems(av);
this._setHandleClassName();this.refreshPositions();
return this},_connectWith:function(){var av=this.options;
return av.connectWith.constructor===String?[av.connectWith]:av.connectWith
},_getItemsAsjQuery:function(av){var ax,aw,aC,az,aA=[],ay=[],aB=this._connectWith();
if(aB&&av){for(ax=aB.length-1;ax>=0;ax--){aC=ak(aB[ax],this.document[0]);
for(aw=aC.length-1;aw>=0;aw--){az=ak.data(aC[aw],this.widgetFullName);
if(az&&az!==this&&!az.options.disabled){ay.push([ak.isFunction(az.options.items)?az.options.items.call(az.element):ak(az.options.items,az.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),az])
}}}}ay.push([ak.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):ak(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
function aD(){aA.push(this)}for(ax=ay.length-1;ax>=0;
ax--){ay[ax][0].each(aD)}return ak(aA)},_removeCurrentsFromItems:function(){var av=this.currentItem.find(":data("+this.widgetName+"-item)");
this.items=ak.grep(this.items,function(ax){for(var aw=0;
aw<av.length;aw++){if(av[aw]===ax.item[0]){return false
}}return true})},_refreshItems:function(av){this.items=[];
this.containers=[this];var az,ax,aE,aA,aD,aw,aG,aF,aB=this.items,ay=[[ak.isFunction(this.options.items)?this.options.items.call(this.element[0],av,{item:this.currentItem}):ak(this.options.items,this.element),this]],aC=this._connectWith();
if(aC&&this.ready){for(az=aC.length-1;az>=0;az--){aE=ak(aC[az],this.document[0]);
for(ax=aE.length-1;ax>=0;ax--){aA=ak.data(aE[ax],this.widgetFullName);
if(aA&&aA!==this&&!aA.options.disabled){ay.push([ak.isFunction(aA.options.items)?aA.options.items.call(aA.element[0],av,{item:this.currentItem}):ak(aA.options.items,aA.element),aA]);
this.containers.push(aA)}}}}for(az=ay.length-1;az>=0;
az--){aD=ay[az][1];aw=ay[az][0];for(ax=0,aF=aw.length;
ax<aF;ax++){aG=ak(aw[ax]);aG.data(this.widgetName+"-item",aD);
aB.push({item:aG,instance:aD,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(av){this.floating=this.items.length?this.options.axis==="x"||this._isFloating(this.items[0].item):false;
if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}var ax,ay,aw,az;for(ax=this.items.length-1;ax>=0;
ax--){ay=this.items[ax];if(ay.instance!==this.currentContainer&&this.currentContainer&&ay.item[0]!==this.currentItem[0]){continue
}aw=this.options.toleranceElement?ak(this.options.toleranceElement,ay.item):ay.item;
if(!av){ay.width=aw.outerWidth();ay.height=aw.outerHeight()
}az=aw.offset();ay.left=az.left;ay.top=az.top}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(ax=this.containers.length-1;ax>=0;ax--){az=this.containers[ax].element.offset();
this.containers[ax].containerCache.left=az.left;this.containers[ax].containerCache.top=az.top;
this.containers[ax].containerCache.width=this.containers[ax].element.outerWidth();
this.containers[ax].containerCache.height=this.containers[ax].element.outerHeight()
}}return this},_createPlaceholder:function(aw){aw=aw||this;
var av,ax=aw.options;if(!ax.placeholder||ax.placeholder.constructor===String){av=ax.placeholder;
ax.placeholder={element:function(){var az=aw.currentItem[0].nodeName.toLowerCase(),ay=ak("<"+az+">",aw.document[0]);
aw._addClass(ay,"ui-sortable-placeholder",av||aw.currentItem[0].className)._removeClass(ay,"ui-sortable-helper");
if(az==="tbody"){aw._createTrPlaceholder(aw.currentItem.find("tr").eq(0),ak("<tr>",aw.document[0]).appendTo(ay))
}else{if(az==="tr"){aw._createTrPlaceholder(aw.currentItem,ay)
}else{if(az==="img"){ay.attr("src",aw.currentItem.attr("src"))
}}}if(!av){ay.css("visibility","hidden")}return ay
},update:function(ay,az){if(av&&!ax.forcePlaceholderSize){return
}if(!az.height()){az.height(aw.currentItem.innerHeight()-parseInt(aw.currentItem.css("paddingTop")||0,10)-parseInt(aw.currentItem.css("paddingBottom")||0,10))
}if(!az.width()){az.width(aw.currentItem.innerWidth()-parseInt(aw.currentItem.css("paddingLeft")||0,10)-parseInt(aw.currentItem.css("paddingRight")||0,10))
}}}}aw.placeholder=ak(ax.placeholder.element.call(aw.element,aw.currentItem));
aw.currentItem.after(aw.placeholder);ax.placeholder.update(aw,aw.placeholder)
},_createTrPlaceholder:function(aw,av){var ax=this;
aw.children().each(function(){ak("<td>&#160;</td>",ax.document[0]).attr("colspan",ak(this).attr("colspan")||1).appendTo(av)
})},_contactContainers:function(av){var aA,ay,aE,aB,aC,aG,aH,az,aD,ax,aw=null,aF=null;
for(aA=this.containers.length-1;aA>=0;aA--){if(ak.contains(this.currentItem[0],this.containers[aA].element[0])){continue
}if(this._intersectsWith(this.containers[aA].containerCache)){if(aw&&ak.contains(this.containers[aA].element[0],aw.element[0])){continue
}aw=this.containers[aA];aF=aA}else{if(this.containers[aA].containerCache.over){this.containers[aA]._trigger("out",av,this._uiHash(this));
this.containers[aA].containerCache.over=0}}}if(!aw){return
}if(this.containers.length===1){if(!this.containers[aF].containerCache.over){this.containers[aF]._trigger("over",av,this._uiHash(this));
this.containers[aF].containerCache.over=1}}else{aE=10000;
aB=null;aD=aw.floating||this._isFloating(this.currentItem);
aC=aD?"left":"top";aG=aD?"width":"height";ax=aD?"pageX":"pageY";
for(ay=this.items.length-1;ay>=0;ay--){if(!ak.contains(this.containers[aF].element[0],this.items[ay].item[0])){continue
}if(this.items[ay].item[0]===this.currentItem[0]){continue
}aH=this.items[ay].item.offset()[aC];az=false;if(av[ax]-aH>this.items[ay][aG]/2){az=true
}if(Math.abs(av[ax]-aH)<aE){aE=Math.abs(av[ax]-aH);
aB=this.items[ay];this.direction=az?"up":"down"}}if(!aB&&!this.options.dropOnEmpty){return
}if(this.currentContainer===this.containers[aF]){if(!this.currentContainer.containerCache.over){this.containers[aF]._trigger("over",av,this._uiHash());
this.currentContainer.containerCache.over=1}return
}aB?this._rearrange(av,aB,null,true):this._rearrange(av,null,this.containers[aF].element,true);
this._trigger("change",av,this._uiHash());this.containers[aF]._trigger("change",av,this._uiHash(this));
this.currentContainer=this.containers[aF];this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[aF]._trigger("over",av,this._uiHash(this));
this.containers[aF].containerCache.over=1}},_createHelper:function(aw){var ax=this.options,av=ak.isFunction(ax.helper)?ak(ax.helper.apply(this.element[0],[aw,this.currentItem])):(ax.helper==="clone"?this.currentItem.clone():this.currentItem);
if(!av.parents("body").length){ak(ax.appendTo!=="parent"?ax.appendTo:this.currentItem[0].parentNode)[0].appendChild(av[0])
}if(av[0]===this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(!av[0].style.width||ax.forceHelperSize){av.width(this.currentItem.width())
}if(!av[0].style.height||ax.forceHelperSize){av.height(this.currentItem.height())
}return av},_adjustOffsetFromHelper:function(av){if(typeof av==="string"){av=av.split(" ")
}if(ak.isArray(av)){av={left:+av[0],top:+av[1]||0}
}if("left" in av){this.offset.click.left=av.left+this.margins.left
}if("right" in av){this.offset.click.left=this.helperProportions.width-av.right+this.margins.left
}if("top" in av){this.offset.click.top=av.top+this.margins.top
}if("bottom" in av){this.offset.click.top=this.helperProportions.height-av.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var av=this.offsetParent.offset();if(this.cssPosition==="absolute"&&this.scrollParent[0]!==this.document[0]&&ak.contains(this.scrollParent[0],this.offsetParent[0])){av.left+=this.scrollParent.scrollLeft();
av.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]===this.document[0].body||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()==="html"&&ak.ui.ie)){av={top:0,left:0}
}return{top:av.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:av.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition==="relative"){var av=this.currentItem.position();
return{top:av.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:av.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var aw,ay,av,ax=this.options;
if(ax.containment==="parent"){ax.containment=this.helper[0].parentNode
}if(ax.containment==="document"||ax.containment==="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,ax.containment==="document"?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,(ax.containment==="document"?(this.document.height()||document.body.parentNode.scrollHeight):this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(ax.containment)){aw=ak(ax.containment)[0];
ay=ak(ax.containment).offset();av=(ak(aw).css("overflow")!=="hidden");
this.containment=[ay.left+(parseInt(ak(aw).css("borderLeftWidth"),10)||0)+(parseInt(ak(aw).css("paddingLeft"),10)||0)-this.margins.left,ay.top+(parseInt(ak(aw).css("borderTopWidth"),10)||0)+(parseInt(ak(aw).css("paddingTop"),10)||0)-this.margins.top,ay.left+(av?Math.max(aw.scrollWidth,aw.offsetWidth):aw.offsetWidth)-(parseInt(ak(aw).css("borderLeftWidth"),10)||0)-(parseInt(ak(aw).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,ay.top+(av?Math.max(aw.scrollHeight,aw.offsetHeight):aw.offsetHeight)-(parseInt(ak(aw).css("borderTopWidth"),10)||0)-(parseInt(ak(aw).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(ax,az){if(!az){az=this.position
}var aw=ax==="absolute"?1:-1,av=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==this.document[0]&&ak.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,ay=(/(html|body)/i).test(av[0].tagName);
return{top:(az.top+this.offset.relative.top*aw+this.offset.parent.top*aw-((this.cssPosition==="fixed"?-this.scrollParent.scrollTop():(ay?0:av.scrollTop()))*aw)),left:(az.left+this.offset.relative.left*aw+this.offset.parent.left*aw-((this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():ay?0:av.scrollLeft())*aw))}
},_generatePosition:function(ay){var aA,az,aB=this.options,ax=ay.pageX,aw=ay.pageY,av=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==this.document[0]&&ak.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,aC=(/(html|body)/i).test(av[0].tagName);
if(this.cssPosition==="relative"&&!(this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}if(this.originalPosition){if(this.containment){if(ay.pageX-this.offset.click.left<this.containment[0]){ax=this.containment[0]+this.offset.click.left
}if(ay.pageY-this.offset.click.top<this.containment[1]){aw=this.containment[1]+this.offset.click.top
}if(ay.pageX-this.offset.click.left>this.containment[2]){ax=this.containment[2]+this.offset.click.left
}if(ay.pageY-this.offset.click.top>this.containment[3]){aw=this.containment[3]+this.offset.click.top
}}if(aB.grid){aA=this.originalPageY+Math.round((aw-this.originalPageY)/aB.grid[1])*aB.grid[1];
aw=this.containment?((aA-this.offset.click.top>=this.containment[1]&&aA-this.offset.click.top<=this.containment[3])?aA:((aA-this.offset.click.top>=this.containment[1])?aA-aB.grid[1]:aA+aB.grid[1])):aA;
az=this.originalPageX+Math.round((ax-this.originalPageX)/aB.grid[0])*aB.grid[0];
ax=this.containment?((az-this.offset.click.left>=this.containment[0]&&az-this.offset.click.left<=this.containment[2])?az:((az-this.offset.click.left>=this.containment[0])?az-aB.grid[0]:az+aB.grid[0])):az
}}return{top:(aw-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+((this.cssPosition==="fixed"?-this.scrollParent.scrollTop():(aC?0:av.scrollTop())))),left:(ax-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+((this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():aC?0:av.scrollLeft())))}
},_rearrange:function(az,ay,aw,ax){aw?aw[0].appendChild(this.placeholder[0]):ay.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction==="down"?ay.item[0]:ay.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;var av=this.counter;
this._delay(function(){if(av===this.counter){this.refreshPositions(!ax)
}})},_clear:function(aw,ay){this.reverting=false;
var av,az=[];if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;if(this.helper[0]===this.currentItem[0]){for(av in this._storedCSS){if(this._storedCSS[av]==="auto"||this._storedCSS[av]==="static"){this._storedCSS[av]=""
}}this.currentItem.css(this._storedCSS);this._removeClass(this.currentItem,"ui-sortable-helper")
}else{this.currentItem.show()}if(this.fromOutside&&!ay){az.push(function(aA){this._trigger("receive",aA,this._uiHash(this.fromOutside))
})}if((this.fromOutside||this.domPosition.prev!==this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!==this.currentItem.parent()[0])&&!ay){az.push(function(aA){this._trigger("update",aA,this._uiHash())
})}if(this!==this.currentContainer){if(!ay){az.push(function(aA){this._trigger("remove",aA,this._uiHash())
});az.push((function(aA){return function(aB){aA._trigger("receive",aB,this._uiHash(this))
}}).call(this,this.currentContainer));az.push((function(aA){return function(aB){aA._trigger("update",aB,this._uiHash(this))
}}).call(this,this.currentContainer))}}function ax(aC,aA,aB){return function(aD){aB._trigger(aC,aD,aA._uiHash(aA))
}}for(av=this.containers.length-1;av>=0;av--){if(!ay){az.push(ax("deactivate",this,this.containers[av]))
}if(this.containers[av].containerCache.over){az.push(ax("out",this,this.containers[av]));
this.containers[av].containerCache.over=0}}if(this.storedCursor){this.document.find("body").css("cursor",this.storedCursor);
this.storedStylesheet.remove()}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex==="auto"?"":this._storedZIndex)
}this.dragging=false;if(!ay){this._trigger("beforeStop",aw,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(!this.cancelHelperRemoval){if(this.helper[0]!==this.currentItem[0]){this.helper.remove()
}this.helper=null}if(!ay){for(av=0;av<az.length;av++){az[av].call(this,aw)
}this._trigger("stop",aw,this._uiHash())}this.fromOutside=false;
return !this.cancelHelperRemoval},_trigger:function(){if(ak.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(av){var aw=av||this;return{helper:aw.helper,placeholder:aw.placeholder||ak([]),position:aw.position,originalPosition:aw.originalPosition,offset:aw.positionAbs,item:aw.currentItem,sender:av?av.element:null}
}});
/*!
 * jQuery UI Spinner 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
function U(av){return function(){var aw=this.element.val();
av.apply(this,arguments);this._refresh();if(aw!==this.element.val()){this._trigger("change")
}}}ak.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:true,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max);
this._setOption("min",this.options.min);this._setOption("step",this.options.step);
if(this.value()!==""){this._value(this.element.val(),true)
}this._draw();this._on(this._events);this._refresh();
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")
}})},_getCreateOptions:function(){var av=this._super();
var aw=this.element;ak.each(["min","max","step"],function(ax,ay){var az=aw.attr(ay);
if(az!=null&&az.length){av[ay]=az}});return av},_events:{keydown:function(av){if(this._start(av)&&this._keydown(av)){av.preventDefault()
}},keyup:"_stop",focus:function(){this.previous=this.element.val()
},blur:function(av){if(this.cancelBlur){delete this.cancelBlur;
return}this._stop();this._refresh();if(this.previous!==this.element.val()){this._trigger("change",av)
}},mousewheel:function(av,aw){if(!aw){return}if(!this.spinning&&!this._start(av)){return false
}this._spin((aw>0?1:-1)*this.options.step,av);clearTimeout(this.mousewheelTimer);
this.mousewheelTimer=this._delay(function(){if(this.spinning){this._stop(av)
}},100);av.preventDefault()},"mousedown .ui-spinner-button":function(aw){var av;
av=this.element[0]===ak.ui.safeActiveElement(this.document[0])?this.previous:this.element.val();
function ax(){var ay=this.element[0]===ak.ui.safeActiveElement(this.document[0]);
if(!ay){this.element.trigger("focus");this.previous=av;
this._delay(function(){this.previous=av})}}aw.preventDefault();
ax.call(this);this.cancelBlur=true;this._delay(function(){delete this.cancelBlur;
ax.call(this)});if(this._start(aw)===false){return
}this._repeat(null,ak(aw.currentTarget).hasClass("ui-spinner-up")?1:-1,aw)
},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(av){if(!ak(av.currentTarget).hasClass("ui-state-active")){return
}if(this._start(av)===false){return false}this._repeat(null,ak(av.currentTarget).hasClass("ui-spinner-up")?1:-1,av)
},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")
},_draw:function(){this._enhance();this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content");
this._addClass("ui-spinner-input");this.element.attr("role","spinbutton");
this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",true).button({classes:{"ui-button":""}});
this._removeClass(this.buttons,"ui-corner-all");this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up");
this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down");
this.buttons.first().button({icon:this.options.icons.up,showLabel:false});
this.buttons.last().button({icon:this.options.icons.down,showLabel:false});
if(this.buttons.height()>Math.ceil(this.uiSpinner.height()*0.5)&&this.uiSpinner.height()>0){this.uiSpinner.height(this.uiSpinner.height())
}},_keydown:function(aw){var av=this.options,ax=ak.ui.keyCode;
switch(aw.keyCode){case ax.UP:this._repeat(null,1,aw);
return true;case ax.DOWN:this._repeat(null,-1,aw);
return true;case ax.PAGE_UP:this._repeat(null,av.page,aw);
return true;case ax.PAGE_DOWN:this._repeat(null,-av.page,aw);
return true}return false},_start:function(av){if(!this.spinning&&this._trigger("start",av)===false){return false
}if(!this.counter){this.counter=1}this.spinning=true;
return true},_repeat:function(aw,av,ax){aw=aw||500;
clearTimeout(this.timer);this.timer=this._delay(function(){this._repeat(40,av,ax)
},aw);this._spin(av*this.options.step,ax)},_spin:function(aw,av){var ax=this.value()||0;
if(!this.counter){this.counter=1}ax=this._adjustValue(ax+aw*this._increment(this.counter));
if(!this.spinning||this._trigger("spin",av,{value:ax})!==false){this._value(ax);
this.counter++}},_increment:function(av){var aw=this.options.incremental;
if(aw){return ak.isFunction(aw)?aw(av):Math.floor(av*av*av/50000-av*av/500+17*av/200+1)
}return 1},_precision:function(){var av=this._precisionOf(this.options.step);
if(this.options.min!==null){av=Math.max(av,this._precisionOf(this.options.min))
}return av},_precisionOf:function(aw){var ax=aw.toString(),av=ax.indexOf(".");
return av===-1?0:ax.length-av-1},_adjustValue:function(ax){var aw,ay,av=this.options;
aw=av.min!==null?av.min:0;ay=ax-aw;ay=Math.round(ay/av.step)*av.step;
ax=aw+ay;ax=parseFloat(ax.toFixed(this._precision()));
if(av.max!==null&&ax>av.max){return av.max}if(av.min!==null&&ax<av.min){return av.min
}return ax},_stop:function(av){if(!this.spinning){return
}clearTimeout(this.timer);clearTimeout(this.mousewheelTimer);
this.counter=0;this.spinning=false;this._trigger("stop",av)
},_setOption:function(av,ax){var ay,az,aw;if(av==="culture"||av==="numberFormat"){ay=this._parse(this.element.val());
this.options[av]=ax;this.element.val(this._format(ay));
return}if(av==="max"||av==="min"||av==="step"){if(typeof ax==="string"){ax=this._parse(ax)
}}if(av==="icons"){az=this.buttons.first().find(".ui-icon");
this._removeClass(az,null,this.options.icons.up);
this._addClass(az,null,ax.up);aw=this.buttons.last().find(".ui-icon");
this._removeClass(aw,null,this.options.icons.down);
this._addClass(aw,null,ax.down)}this._super(av,ax)
},_setOptionDisabled:function(av){this._super(av);
this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!av);
this.element.prop("disabled",!!av);this.buttons.button(av?"disable":"enable")
},_setOptions:U(function(av){this._super(av)}),_parse:function(av){if(typeof av==="string"&&av!==""){av=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(av,10,this.options.culture):+av
}return av===""||isNaN(av)?null:av},_format:function(av){if(av===""){return""
}return window.Globalize&&this.options.numberFormat?Globalize.format(av,this.options.numberFormat,this.options.culture):av
},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})
},isValid:function(){var av=this.value();if(av===null){return false
}return av===this._adjustValue(av)},_value:function(ax,av){var aw;
if(ax!==""){aw=this._parse(ax);if(aw!==null){if(!av){aw=this._adjustValue(aw)
}ax=this._format(aw)}}this.element.val(ax);this._refresh()
},_destroy:function(){this.element.prop("disabled",false).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow");
this.uiSpinner.replaceWith(this.element)},stepUp:U(function(av){this._stepUp(av)
}),_stepUp:function(av){if(this._start()){this._spin((av||1)*this.options.step);
this._stop()}},stepDown:U(function(av){this._stepDown(av)
}),_stepDown:function(av){if(this._start()){this._spin((av||1)*-this.options.step);
this._stop()}},pageUp:U(function(av){this._stepUp((av||1)*this.options.page)
}),pageDown:U(function(av){this._stepDown((av||1)*this.options.page)
}),value:function(av){if(!arguments.length){return this._parse(this.element.val())
}U(this._value).call(this,av)},widget:function(){return this.uiSpinner
}});if(ak.uiBackCompat!==false){ak.widget("ui.spinner",ak.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"
}})}var ag=ak.ui.spinner;
/*!
 * jQuery UI Tabs 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:false,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:(function(){var av=/#.*$/;
return function(ax){var az,ay;az=ax.href.replace(av,"");
ay=location.href.replace(av,"");try{az=decodeURIComponent(az)
}catch(aw){}try{ay=decodeURIComponent(ay)}catch(aw){}return ax.hash.length>1&&az===ay
}})(),_create:function(){var aw=this,av=this.options;
this.running=false;this._addClass("ui-tabs","ui-widget ui-widget-content");
this._toggleClass("ui-tabs-collapsible",null,av.collapsible);
this._processTabs();av.active=this._initialActive();
if(ak.isArray(av.disabled)){av.disabled=ak.unique(av.disabled.concat(ak.map(this.tabs.filter(".ui-state-disabled"),function(ax){return aw.tabs.index(ax)
}))).sort()}if(this.options.active!==false&&this.anchors.length){this.active=this._findActive(av.active)
}else{this.active=ak()}this._refresh();if(this.active.length){this.load(av.active)
}},_initialActive:function(){var aw=this.options.active,av=this.options.collapsible,ax=location.hash.substring(1);
if(aw===null){if(ax){this.tabs.each(function(ay,az){if(ak(az).attr("aria-controls")===ax){aw=ay;
return false}})}if(aw===null){aw=this.tabs.index(this.tabs.filter(".ui-tabs-active"))
}if(aw===null||aw===-1){aw=this.tabs.length?0:false
}}if(aw!==false){aw=this.tabs.index(this.tabs.eq(aw));
if(aw===-1){aw=av?false:0}}if(!av&&aw===false&&this.anchors.length){aw=0
}return aw},_getCreateEventData:function(){return{tab:this.active,panel:!this.active.length?ak():this._getPanelForTab(this.active)}
},_tabKeydown:function(ax){var aw=ak(ak.ui.safeActiveElement(this.document[0])).closest("li"),av=this.tabs.index(aw),ay=true;
if(this._handlePageNav(ax)){return}switch(ax.keyCode){case ak.ui.keyCode.RIGHT:case ak.ui.keyCode.DOWN:av++;
break;case ak.ui.keyCode.UP:case ak.ui.keyCode.LEFT:ay=false;
av--;break;case ak.ui.keyCode.END:av=this.anchors.length-1;
break;case ak.ui.keyCode.HOME:av=0;break;case ak.ui.keyCode.SPACE:ax.preventDefault();
clearTimeout(this.activating);this._activate(av);
return;case ak.ui.keyCode.ENTER:ax.preventDefault();
clearTimeout(this.activating);this._activate(av===this.options.active?false:av);
return;default:return}ax.preventDefault();clearTimeout(this.activating);
av=this._focusNextTab(av,ay);if(!ax.ctrlKey&&!ax.metaKey){aw.attr("aria-selected","false");
this.tabs.eq(av).attr("aria-selected","true");this.activating=this._delay(function(){this.option("active",av)
},this.delay)}},_panelKeydown:function(av){if(this._handlePageNav(av)){return
}if(av.ctrlKey&&av.keyCode===ak.ui.keyCode.UP){av.preventDefault();
this.active.trigger("focus")}},_handlePageNav:function(av){if(av.altKey&&av.keyCode===ak.ui.keyCode.PAGE_UP){this._activate(this._focusNextTab(this.options.active-1,false));
return true}if(av.altKey&&av.keyCode===ak.ui.keyCode.PAGE_DOWN){this._activate(this._focusNextTab(this.options.active+1,true));
return true}},_findNextTab:function(aw,ax){var av=this.tabs.length-1;
function ay(){if(aw>av){aw=0}if(aw<0){aw=av}return aw
}while(ak.inArray(ay(),this.options.disabled)!==-1){aw=ax?aw+1:aw-1
}return aw},_focusNextTab:function(av,aw){av=this._findNextTab(av,aw);
this.tabs.eq(av).trigger("focus");return av},_setOption:function(av,aw){if(av==="active"){this._activate(aw);
return}this._super(av,aw);if(av==="collapsible"){this._toggleClass("ui-tabs-collapsible",null,aw);
if(!aw&&this.options.active===false){this._activate(0)
}}if(av==="event"){this._setupEvents(aw)}if(av==="heightStyle"){this._setupHeightStyle(aw)
}},_sanitizeSelector:function(av){return av?av.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""
},refresh:function(){var aw=this.options,av=this.tablist.children(":has(a[href])");
aw.disabled=ak.map(av.filter(".ui-state-disabled"),function(ax){return av.index(ax)
});this._processTabs();if(aw.active===false||!this.anchors.length){aw.active=false;
this.active=ak()}else{if(this.active.length&&!ak.contains(this.tablist[0],this.active[0])){if(this.tabs.length===aw.disabled.length){aw.active=false;
this.active=ak()}else{this._activate(this._findNextTab(Math.max(0,aw.active-1),false))
}}else{aw.active=this.tabs.index(this.active)}}this._refresh()
},_refresh:function(){this._setOptionDisabled(this.options.disabled);
this._setupEvents(this.options.event);this._setupHeightStyle(this.options.heightStyle);
this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1});
this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"});
if(!this.active.length){this.tabs.eq(0).attr("tabIndex",0)
}else{this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0});
this._addClass(this.active,"ui-tabs-active","ui-state-active");
this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})
}},_processTabs:function(){var ax=this,ay=this.tabs,aw=this.anchors,av=this.panels;
this.tablist=this._getList().attr("role","tablist");
this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header");
this.tablist.on("mousedown"+this.eventNamespace,"> li",function(az){if(ak(this).is(".ui-state-disabled")){az.preventDefault()
}}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){if(ak(this).closest("li").is(".ui-state-disabled")){this.blur()
}});this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1});
this._addClass(this.tabs,"ui-tabs-tab","ui-state-default");
this.anchors=this.tabs.map(function(){return ak("a",this)[0]
}).attr({role:"presentation",tabIndex:-1});this._addClass(this.anchors,"ui-tabs-anchor");
this.panels=ak();this.anchors.each(function(aE,aC){var az,aA,aD,aB=ak(aC).uniqueId().attr("id"),aF=ak(aC).closest("li"),aG=aF.attr("aria-controls");
if(ax._isLocal(aC)){az=aC.hash;aD=az.substring(1);
aA=ax.element.find(ax._sanitizeSelector(az))}else{aD=aF.attr("aria-controls")||ak({}).uniqueId()[0].id;
az="#"+aD;aA=ax.element.find(az);if(!aA.length){aA=ax._createPanel(aD);
aA.insertAfter(ax.panels[aE-1]||ax.tablist)}aA.attr("aria-live","polite")
}if(aA.length){ax.panels=ax.panels.add(aA)}if(aG){aF.data("ui-tabs-aria-controls",aG)
}aF.attr({"aria-controls":aD,"aria-labelledby":aB});
aA.attr("aria-labelledby",aB)});this.panels.attr("role","tabpanel");
this._addClass(this.panels,"ui-tabs-panel","ui-widget-content");
if(ay){this._off(ay.not(this.tabs));this._off(aw.not(this.anchors));
this._off(av.not(this.panels))}},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)
},_createPanel:function(av){return ak("<div>").attr("id",av).data("ui-tabs-destroy",true)
},_setOptionDisabled:function(ay){var ax,av,aw;if(ak.isArray(ay)){if(!ay.length){ay=false
}else{if(ay.length===this.anchors.length){ay=true
}}}for(aw=0;(av=this.tabs[aw]);aw++){ax=ak(av);if(ay===true||ak.inArray(aw,ay)!==-1){ax.attr("aria-disabled","true");
this._addClass(ax,null,"ui-state-disabled")}else{ax.removeAttr("aria-disabled");
this._removeClass(ax,null,"ui-state-disabled")}}this.options.disabled=ay;
this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,ay===true)
},_setupEvents:function(aw){var av={};if(aw){ak.each(aw.split(" "),function(ay,ax){av[ax]="_eventHandler"
})}this._off(this.anchors.add(this.tabs).add(this.panels));
this._on(true,this.anchors,{click:function(ax){ax.preventDefault()
}});this._on(this.anchors,av);this._on(this.tabs,{keydown:"_tabKeydown"});
this._on(this.panels,{keydown:"_panelKeydown"});this._focusable(this.tabs);
this._hoverable(this.tabs)},_setupHeightStyle:function(av){var ax,aw=this.element.parent();
if(av==="fill"){ax=aw.height();ax-=this.element.outerHeight()-this.element.height();
this.element.siblings(":visible").each(function(){var az=ak(this),ay=az.css("position");
if(ay==="absolute"||ay==="fixed"){return}ax-=az.outerHeight(true)
});this.element.children().not(this.panels).each(function(){ax-=ak(this).outerHeight(true)
});this.panels.each(function(){ak(this).height(Math.max(0,ax-ak(this).innerHeight()+ak(this).height()))
}).css("overflow","auto")}else{if(av==="auto"){ax=0;
this.panels.each(function(){ax=Math.max(ax,ak(this).height("").height())
}).height(ax)}}},_eventHandler:function(av){var aE=this.options,az=this.active,aA=ak(av.currentTarget),ay=aA.closest("li"),aC=ay[0]===az[0],aw=aC&&aE.collapsible,ax=aw?ak():this._getPanelForTab(ay),aB=!az.length?ak():this._getPanelForTab(az),aD={oldTab:az,oldPanel:aB,newTab:aw?ak():ay,newPanel:ax};
av.preventDefault();if(ay.hasClass("ui-state-disabled")||ay.hasClass("ui-tabs-loading")||this.running||(aC&&!aE.collapsible)||(this._trigger("beforeActivate",av,aD)===false)){return
}aE.active=aw?false:this.tabs.index(ay);this.active=aC?ak():ay;
if(this.xhr){this.xhr.abort()}if(!aB.length&&!ax.length){ak.error("jQuery UI Tabs: Mismatching fragment identifier.")
}if(ax.length){this.load(this.tabs.index(ay),av)}this._toggle(av,aD)
},_toggle:function(aB,aA){var az=this,av=aA.newPanel,ay=aA.oldPanel;
this.running=true;function ax(){az.running=false;
az._trigger("activate",aB,aA)}function aw(){az._addClass(aA.newTab.closest("li"),"ui-tabs-active","ui-state-active");
if(av.length&&az.options.show){az._show(av,az.options.show,ax)
}else{av.show();ax()}}if(ay.length&&this.options.hide){this._hide(ay,this.options.hide,function(){az._removeClass(aA.oldTab.closest("li"),"ui-tabs-active","ui-state-active");
aw()})}else{this._removeClass(aA.oldTab.closest("li"),"ui-tabs-active","ui-state-active");
ay.hide();aw()}ay.attr("aria-hidden","true");aA.oldTab.attr({"aria-selected":"false","aria-expanded":"false"});
if(av.length&&ay.length){aA.oldTab.attr("tabIndex",-1)
}else{if(av.length){this.tabs.filter(function(){return ak(this).attr("tabIndex")===0
}).attr("tabIndex",-1)}}av.attr("aria-hidden","false");
aA.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})
},_activate:function(aw){var av,ax=this._findActive(aw);
if(ax[0]===this.active[0]){return}if(!ax.length){ax=this.active
}av=ax.find(".ui-tabs-anchor")[0];this._eventHandler({target:av,currentTarget:av,preventDefault:ak.noop})
},_findActive:function(av){return av===false?ak():this.tabs.eq(av)
},_getIndex:function(av){if(typeof av==="string"){av=this.anchors.index(this.anchors.filter("[href$='"+ak.ui.escapeSelector(av)+"']"))
}return av},_destroy:function(){if(this.xhr){this.xhr.abort()
}this.tablist.removeAttr("role").off(this.eventNamespace);
this.anchors.removeAttr("role tabIndex").removeUniqueId();
this.tabs.add(this.panels).each(function(){if(ak.data(this,"ui-tabs-destroy")){ak(this).remove()
}else{ak(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
}});this.tabs.each(function(){var av=ak(this),aw=av.data("ui-tabs-aria-controls");
if(aw){av.attr("aria-controls",aw).removeData("ui-tabs-aria-controls")
}else{av.removeAttr("aria-controls")}});this.panels.show();
if(this.options.heightStyle!=="content"){this.panels.css("height","")
}},enable:function(av){var aw=this.options.disabled;
if(aw===false){return}if(av===undefined){aw=false
}else{av=this._getIndex(av);if(ak.isArray(aw)){aw=ak.map(aw,function(ax){return ax!==av?ax:null
})}else{aw=ak.map(this.tabs,function(ax,ay){return ay!==av?ay:null
})}}this._setOptionDisabled(aw)},disable:function(av){var aw=this.options.disabled;
if(aw===true){return}if(av===undefined){aw=true}else{av=this._getIndex(av);
if(ak.inArray(av,aw)!==-1){return}if(ak.isArray(aw)){aw=ak.merge([av],aw).sort()
}else{aw=[av]}}this._setOptionDisabled(aw)},load:function(ay,aC){ay=this._getIndex(ay);
var aB=this,az=this.tabs.eq(ay),ax=az.find(".ui-tabs-anchor"),aw=this._getPanelForTab(az),aA={tab:az,panel:aw},av=function(aE,aD){if(aD==="abort"){aB.panels.stop(false,true)
}aB._removeClass(az,"ui-tabs-loading");aw.removeAttr("aria-busy");
if(aE===aB.xhr){delete aB.xhr}};if(this._isLocal(ax[0])){return
}this.xhr=ak.ajax(this._ajaxSettings(ax,aC,aA));if(this.xhr&&this.xhr.statusText!=="canceled"){this._addClass(az,"ui-tabs-loading");
aw.attr("aria-busy","true");this.xhr.done(function(aE,aD,aF){setTimeout(function(){aw.html(aE);
aB._trigger("load",aC,aA);av(aF,aD)},1)}).fail(function(aE,aD){setTimeout(function(){av(aE,aD)
},1)})}},_ajaxSettings:function(av,ay,ax){var aw=this;
return{url:av.attr("href").replace(/#.*$/,""),beforeSend:function(aA,az){return aw._trigger("beforeLoad",ay,ak.extend({jqXHR:aA,ajaxSettings:az},ax))
}}},_getPanelForTab:function(av){var aw=ak(av).attr("aria-controls");
return this.element.find(this._sanitizeSelector("#"+aw))
}});if(ak.uiBackCompat!==false){ak.widget("ui.tabs",ak.ui.tabs,{_processTabs:function(){this._superApply(arguments);
this._addClass(this.tabs,"ui-tab")}})}var R=ak.ui.tabs;
/*!
 * jQuery UI Tooltip 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
;
ak.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var av=ak(this).attr("title")||"";
return ak("<a>").text(av).html()},hide:true,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:true,track:false,close:null,open:null},_addDescribedBy:function(aw,ax){var av=(aw.attr("aria-describedby")||"").split(/\s+/);
av.push(ax);aw.data("ui-tooltip-id",ax).attr("aria-describedby",ak.trim(av.join(" ")))
},_removeDescribedBy:function(ax){var ay=ax.data("ui-tooltip-id"),aw=(ax.attr("aria-describedby")||"").split(/\s+/),av=ak.inArray(ay,aw);
if(av!==-1){aw.splice(av,1)}ax.removeData("ui-tooltip-id");
aw=ak.trim(aw.join(" "));if(aw){ax.attr("aria-describedby",aw)
}else{ax.removeAttr("aria-describedby")}},_create:function(){this._on({mouseover:"open",focusin:"open"});
this.tooltips={};this.parents={};this.liveRegion=ak("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body);
this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible");
this.disabledTitles=ak([])},_setOption:function(av,ax){var aw=this;
this._super(av,ax);if(av==="content"){ak.each(this.tooltips,function(az,ay){aw._updateContent(ay.element)
})}},_setOptionDisabled:function(av){this[av?"_disable":"_enable"]()
},_disable:function(){var av=this;ak.each(this.tooltips,function(ay,ax){var aw=ak.Event("blur");
aw.target=aw.currentTarget=ax.element[0];av.close(aw,true)
});this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var aw=ak(this);
if(aw.is("[title]")){return aw.data("ui-tooltip-title",aw.attr("title")).removeAttr("title")
}}))},_enable:function(){this.disabledTitles.each(function(){var av=ak(this);
if(av.data("ui-tooltip-title")){av.attr("title",av.data("ui-tooltip-title"))
}});this.disabledTitles=ak([])},open:function(aw){var av=this,ax=ak(aw?aw.target:this.element).closest(this.options.items);
if(!ax.length||ax.data("ui-tooltip-id")){return}if(ax.attr("title")){ax.data("ui-tooltip-title",ax.attr("title"))
}ax.data("ui-tooltip-open",true);if(aw&&aw.type==="mouseover"){ax.parents().each(function(){var az=ak(this),ay;
if(az.data("ui-tooltip-open")){ay=ak.Event("blur");
ay.target=ay.currentTarget=this;av.close(ay,true)
}if(az.attr("title")){az.uniqueId();av.parents[this.id]={element:this,title:az.attr("title")};
az.attr("title","")}})}this._registerCloseHandlers(aw,ax);
this._updateContent(ax,aw)},_updateContent:function(aA,az){var ay,av=this.options.content,ax=this,aw=az?az.type:null;
if(typeof av==="string"||av.nodeType||av.jquery){return this._open(az,aA,av)
}ay=av.call(aA[0],function(aB){ax._delay(function(){if(!aA.data("ui-tooltip-open")){return
}if(az){az.type=aw}this._open(az,aA,aB)})});if(ay){this._open(az,aA,ay)
}},_open:function(aw,az,aA){var av,aD,aC,ax,aB=ak.extend({},this.options.position);
if(!aA){return}av=this._find(az);if(av){av.tooltip.find(".ui-tooltip-content").html(aA);
return}if(az.is("[title]")){if(aw&&aw.type==="mouseover"){az.attr("title","")
}else{az.removeAttr("title")}}av=this._tooltip(az);
aD=av.tooltip;this._addDescribedBy(az,aD.attr("id"));
aD.find(".ui-tooltip-content").html(aA);this.liveRegion.children().hide();
ax=ak("<div>").html(aD.find(".ui-tooltip-content").html());
ax.removeAttr("name").find("[name]").removeAttr("name");
ax.removeAttr("id").find("[id]").removeAttr("id");
ax.appendTo(this.liveRegion);function ay(aE){aB.of=aE;
if(aD.is(":hidden")){return}aD.position(aB)}if(this.options.track&&aw&&/^mouse/.test(aw.type)){this._on(this.document,{mousemove:ay});
ay(aw)}else{aD.position(ak.extend({of:az},this.options.position))
}aD.hide();this._show(aD,this.options.show);if(this.options.track&&this.options.show&&this.options.show.delay){aC=this.delayedShow=setInterval(function(){if(aD.is(":visible")){ay(aB.of);
clearInterval(aC)}},ak.fx.interval)}this._trigger("open",aw,{tooltip:aD})
},_registerCloseHandlers:function(aw,ax){var av={keyup:function(ay){if(ay.keyCode===ak.ui.keyCode.ESCAPE){var az=ak.Event(ay);
az.currentTarget=ax[0];this.close(az,true)}}};if(ax[0]!==this.element[0]){av.remove=function(){this._removeTooltip(this._find(ax).tooltip)
}}if(!aw||aw.type==="mouseover"){av.mouseleave="close"
}if(!aw||aw.type==="focusin"){av.focusout="close"
}this._on(true,ax,av)},close:function(aw){var ay,av=this,az=ak(aw?aw.currentTarget:this.element),ax=this._find(az);
if(!ax){az.removeData("ui-tooltip-open");return}ay=ax.tooltip;
if(ax.closing){return}clearInterval(this.delayedShow);
if(az.data("ui-tooltip-title")&&!az.attr("title")){az.attr("title",az.data("ui-tooltip-title"))
}this._removeDescribedBy(az);ax.hiding=true;ay.stop(true);
this._hide(ay,this.options.hide,function(){av._removeTooltip(ak(this))
});az.removeData("ui-tooltip-open");this._off(az,"mouseleave focusout keyup");
if(az[0]!==this.element[0]){this._off(az,"remove")
}this._off(this.document,"mousemove");if(aw&&aw.type==="mouseleave"){ak.each(this.parents,function(aB,aA){ak(aA.element).attr("title",aA.title);
delete av.parents[aB]})}ax.closing=true;this._trigger("close",aw,{tooltip:ay});
if(!ax.hiding){ax.closing=false}},_tooltip:function(av){var ax=ak("<div>").attr("role","tooltip"),aw=ak("<div>").appendTo(ax),ay=ax.uniqueId().attr("id");
this._addClass(aw,"ui-tooltip-content");this._addClass(ax,"ui-tooltip","ui-widget ui-widget-content");
ax.appendTo(this._appendTo(av));return this.tooltips[ay]={element:av,tooltip:ax}
},_find:function(av){var aw=av.data("ui-tooltip-id");
return aw?this.tooltips[aw]:null},_removeTooltip:function(av){av.remove();
delete this.tooltips[av.attr("id")]},_appendTo:function(aw){var av=aw.closest(".ui-front, dialog");
if(!av.length){av=this.document[0].body}return av
},_destroy:function(){var av=this;ak.each(this.tooltips,function(az,ay){var ax=ak.Event("blur"),aw=ay.element;
ax.target=ax.currentTarget=aw[0];av.close(ax,true);
ak("#"+az).remove();if(aw.data("ui-tooltip-title")){if(!aw.attr("title")){aw.attr("title",aw.data("ui-tooltip-title"))
}aw.removeData("ui-tooltip-title")}});this.liveRegion.remove()
}});if(ak.uiBackCompat!==false){ak.widget("ui.tooltip",ak.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var av=this._superApply(arguments);
if(this.options.tooltipClass){av.tooltip.addClass(this.options.tooltipClass)
}return av}})}var D=ak.ui.tooltip}));console.log("=============== >  jquery-ui-1.12.1/jquery-ui.js ");
/*!
 * jQuery UI Dialog 1.8.22
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(e,f){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",b={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},d={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},a=e.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
e.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(h){var g=e(this).css(h).offset().top;
if(g<0){e(this).css("top",h.top-g)}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var o=this,p=o.options,m=p.title||"&#160;",h=e.ui.dialog.getTitleId(o.element),n=(o.uiDialog=e("<div></div>")).appendTo(document.body).hide().addClass(c+p.dialogClass).css({zIndex:p.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(q){if(p.closeOnEscape&&!q.isDefaultPrevented()&&q.keyCode&&q.keyCode===e.ui.keyCode.ESCAPE){o.close(q);
q.preventDefault()}}).attr({role:"dialog","aria-labelledby":h}).mousedown(function(q){o.moveToTop(false,q)
}),j=o.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(n),i=(o.uiDialogTitlebar=e("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(n),l=e('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){l.addClass("ui-state-hover")
},function(){l.removeClass("ui-state-hover")}).focus(function(){l.addClass("ui-state-focus")
}).blur(function(){l.removeClass("ui-state-focus")
}).click(function(q){o.close(q);return false}).appendTo(i),k=(o.uiDialogTitlebarCloseText=e("<span></span>")).addClass("ui-icon ui-icon-closethick").text(p.closeText).appendTo(l),g=e("<span></span>").addClass("ui-dialog-title").attr("id",h).html(m).prependTo(i);
if(e.isFunction(p.beforeclose)&&!e.isFunction(p.beforeClose)){p.beforeClose=p.beforeclose
}i.find("*").add(i).disableSelection();if(p.draggable&&e.fn.draggable){o._makeDraggable()
}if(p.resizable&&e.fn.resizable){o._makeResizable()
}o._createButtons(p.buttons);o._isOpen=false;if(e.fn.bgiframe){n.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var g=this;if(g.overlay){g.overlay.destroy()
}g.uiDialog.hide();g.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
g.uiDialog.remove();if(g.originalTitle){g.element.attr("title",g.originalTitle)
}return g},widget:function(){return this.uiDialog
},close:function(j){var g=this,i,h;if(false===g._trigger("beforeClose",j)){return
}if(g.overlay){g.overlay.destroy()}g.uiDialog.unbind("keypress.ui-dialog");
g._isOpen=false;if(g.options.hide){g.uiDialog.hide(g.options.hide,function(){g._trigger("close",j)
})}else{g.uiDialog.hide();g._trigger("close",j)}e.ui.dialog.overlay.resize();
if(g.options.modal){i=0;e(".ui-dialog").each(function(){if(this!==g.uiDialog[0]){h=e(this).css("z-index");
if(!isNaN(h)){i=Math.max(i,h)}}});e.ui.dialog.maxZ=i
}return g},isOpen:function(){return this._isOpen},moveToTop:function(k,j){var g=this,i=g.options,h;
if((i.modal&&!k)||(!i.stack&&!i.modal)){return g._trigger("focus",j)
}if(i.zIndex>e.ui.dialog.maxZ){e.ui.dialog.maxZ=i.zIndex
}if(g.overlay){e.ui.dialog.maxZ+=1;g.overlay.$el.css("z-index",e.ui.dialog.overlay.maxZ=e.ui.dialog.maxZ)
}h={scrollTop:g.element.scrollTop(),scrollLeft:g.element.scrollLeft()};
e.ui.dialog.maxZ+=1;g.uiDialog.css("z-index",e.ui.dialog.maxZ);
g.element.attr(h);g._trigger("focus",j);return g},open:function(){if(this._isOpen){return
}var h=this,i=h.options,g=h.uiDialog;h.overlay=i.modal?new e.ui.dialog.overlay(h):null;
h._size();h._position(i.position);g.show(i.show);
h.moveToTop(true);if(i.modal){g.bind("keydown.ui-dialog",function(l){if(l.keyCode!==e.ui.keyCode.TAB){return
}var k=e(":tabbable",this),m=k.filter(":first"),j=k.filter(":last");
if(l.target===j[0]&&!l.shiftKey){m.focus(1);return false
}else{if(l.target===m[0]&&l.shiftKey){j.focus(1);
return false}}})}e(h.element.find(":tabbable").get().concat(g.find(".ui-dialog-buttonpane :tabbable").get().concat(g.get()))).eq(0).focus();
h._isOpen=true;h._trigger("open");return h},_createButtons:function(j){var i=this,g=false,h=e("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),k=e("<div></div>").addClass("ui-dialog-buttonset").appendTo(h);
i.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof j==="object"&&j!==null){e.each(j,function(){return !(g=true)
})}if(g){e.each(j,function(l,n){n=e.isFunction(n)?{click:n,text:l}:n;
var m=e('<button type="button"></button>').click(function(){n.click.apply(i.element[0],arguments)
}).appendTo(k);e.each(n,function(o,p){if(o==="click"){return
}if(o in a){m[o](p)}else{m.attr(o,p)}});if(e.fn.button){m.button()
}});h.appendTo(i.uiDialog)}},_makeDraggable:function(){var g=this,j=g.options,k=e(document),i;
function h(l){return{position:l.position,offset:l.offset}
}g.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(l,m){i=j.height==="auto"?"auto":e(this).height();
e(this).height(e(this).height()).addClass("ui-dialog-dragging");
g._trigger("dragStart",l,h(m))},drag:function(l,m){g._trigger("drag",l,h(m))
},stop:function(l,m){j.position=[m.position.left-k.scrollLeft(),m.position.top-k.scrollTop()];
e(this).removeClass("ui-dialog-dragging").height(i);
g._trigger("dragStop",l,h(m));e.ui.dialog.overlay.resize()
}})},_makeResizable:function(l){l=(l===f?this.options.resizable:l);
var h=this,k=h.options,g=h.uiDialog.css("position"),j=(typeof l==="string"?l:"n,e,s,w,se,sw,ne,nw");
function i(m){return{originalPosition:m.originalPosition,originalSize:m.originalSize,position:m.position,size:m.size}
}h.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:h.element,maxWidth:k.maxWidth,maxHeight:k.maxHeight,minWidth:k.minWidth,minHeight:h._minHeight(),handles:j,start:function(m,n){e(this).addClass("ui-dialog-resizing");
h._trigger("resizeStart",m,i(n))},resize:function(m,n){h._trigger("resize",m,i(n))
},stop:function(m,n){e(this).removeClass("ui-dialog-resizing");
k.height=e(this).height();k.width=e(this).width();
h._trigger("resizeStop",m,i(n));e.ui.dialog.overlay.resize()
}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var g=this.options;if(g.height==="auto"){return g.minHeight
}else{return Math.min(g.minHeight,g.height)}},_position:function(h){var i=[],j=[0,0],g;
if(h){if(typeof h==="string"||(typeof h==="object"&&"0" in h)){i=h.split?h.split(" "):[h[0],h[1]];
if(i.length===1){i[1]=i[0]}e.each(["left","top"],function(l,k){if(+i[l]===i[l]){j[l]=i[l];
i[l]=k}});h={my:i.join(" "),at:i.join(" "),offset:j.join(" ")}
}h=e.extend({},e.ui.dialog.prototype.options.position,h)
}else{h=e.ui.dialog.prototype.options.position}g=this.uiDialog.is(":visible");
if(!g){this.uiDialog.show()}this.uiDialog.css({top:0,left:0}).position(e.extend({of:window},h));
if(!g){this.uiDialog.hide()}},_setOptions:function(j){var h=this,g={},i=false;
e.each(j,function(k,l){h._setOption(k,l);if(k in b){i=true
}if(k in d){g[k]=l}});if(i){this._size()}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",g)
}},_setOption:function(j,k){var h=this,g=h.uiDialog;
switch(j){case"beforeclose":j="beforeClose";break;
case"buttons":h._createButtons(k);break;case"closeText":h.uiDialogTitlebarCloseText.text(""+k);
break;case"dialogClass":g.removeClass(h.options.dialogClass).addClass(c+k);
break;case"disabled":if(k){g.addClass("ui-dialog-disabled")
}else{g.removeClass("ui-dialog-disabled")}break;case"draggable":var i=g.is(":data(draggable)");
if(i&&!k){g.draggable("destroy")}if(!i&&k){h._makeDraggable()
}break;case"position":h._position(k);break;case"resizable":var l=g.is(":data(resizable)");
if(l&&!k){g.resizable("destroy")}if(l&&typeof k==="string"){g.resizable("option","handles",k)
}if(!l&&k!==false){h._makeResizable(k)}break;case"title":e(".ui-dialog-title",h.uiDialogTitlebar).html(""+(k||"&#160;"));
break}e.Widget.prototype._setOption.apply(h,arguments)
},_size:function(){var k=this.options,h,j,g=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(k.minWidth>k.width){k.width=k.minWidth}h=this.uiDialog.css({height:"auto",width:k.width}).height();
j=Math.max(0,k.minHeight-h);if(k.height==="auto"){if(e.support.minHeight){this.element.css({minHeight:j,height:"auto"})
}else{this.uiDialog.show();var i=this.element.css("height","auto").height();
if(!g){this.uiDialog.hide()}this.element.height(Math.max(i,j))
}}else{this.element.height(Math.max(k.height-h,0))
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});e.extend(e.ui.dialog,{version:"1.8.22",uuid:0,maxZ:0,getTitleId:function(g){var h=g.attr("id");
if(!h){this.uuid+=1;h=this.uuid}return"ui-dialog-title-"+h
},overlay:function(g){this.$el=e.ui.dialog.overlay.create(g)
}});e.extend(e.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(g){return g+".dialog-overlay"
}).join(" "),create:function(h){if(this.instances.length===0){setTimeout(function(){if(e.ui.dialog.overlay.instances.length){e(document).bind(e.ui.dialog.overlay.events,function(i){if(e(i.target).zIndex()<e.ui.dialog.overlay.maxZ){return false
}})}},1);e(document).bind("keydown.dialog-overlay",function(i){if(h.options.closeOnEscape&&!i.isDefaultPrevented()&&i.keyCode&&i.keyCode===e.ui.keyCode.ESCAPE){h.close(i);
i.preventDefault()}});e(window).bind("resize.dialog-overlay",e.ui.dialog.overlay.resize)
}var g=(this.oldInstances.pop()||e("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if(e.fn.bgiframe){g.bgiframe()}this.instances.push(g);
return g},destroy:function(g){var h=e.inArray(g,this.instances);
if(h!=-1){this.oldInstances.push(this.instances.splice(h,1)[0])
}if(this.instances.length===0){e([document,window]).unbind(".dialog-overlay")
}g.remove();var i=0;e.each(this.instances,function(){i=Math.max(i,this.css("z-index"))
});this.maxZ=i},height:function(){var h,g;if(e.browser.msie&&e.browser.version<7){h=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
g=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(h<g){return e(window).height()+"px"}else{return h+"px"
}}else{return e(document).height()+"px"}},width:function(){var g,h;
if(e.browser.msie){g=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
h=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(g<h){return e(window).width()+"px"}else{return g+"px"
}}else{return e(document).width()+"px"}},resize:function(){var g=e([]);
e.each(e.ui.dialog.overlay.instances,function(){g=g.add(this)
});g.css({width:0,height:0}).css({width:e.ui.dialog.overlay.width(),height:e.ui.dialog.overlay.height()})
}});e.extend(e.ui.dialog.overlay.prototype,{destroy:function(){e.ui.dialog.overlay.destroy(this.$el)
}})}(jQuery));console.log("=============== >  jquery-ui-1.12.1/jquery.ui.dialog.js ");
(function(g){var c=g.browser.msie&&parseInt(g.browser.version)===6&&typeof window.XMLHttpRequest!=="object",a=g.browser.msie&&parseInt(g.browser.version)===7,b=null,e=[];
g.modal=function(f,d){return g.modal.impl.init(f,d)
};g.modal.close=function(){g.modal.impl.close()};
g.modal.focus=function(d){g.modal.impl.focus(d)};
g.modal.setContainerDimensions=function(){g.modal.impl.setContainerDimensions()
};g.modal.setPosition=function(){g.modal.impl.setPosition()
};g.modal.update=function(f,d){g.modal.impl.update(f,d)
};g.fn.modal=function(d){return g.modal.impl.init(this,d)
};g.modal.defaults={appendTo:"body",focus:true,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:true,overlayClose:false,position:null,persist:false,modal:true,onOpen:null,onShow:null,onClose:null};
g.modal.impl={d:{},init:function(f,d){var h=this;
if(h.d.data){return false}b=g.browser.msie&&!g.boxModel;
h.o=g.extend({},g.modal.defaults,d);h.zIndex=h.o.zIndex;
h.occb=false;if(typeof f==="object"){f=f instanceof jQuery?f:g(f);
h.d.placeholder=false;if(f.parent().parent().size()>0){f.before(g("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"}));
h.d.placeholder=true;h.display=f.css("display");if(!h.o.persist){h.d.orig=f.clone(true)
}}}else{if(typeof f==="string"||typeof f==="number"){f=g("<div></div>").html(f)
}else{alert("SimpleModal Error: Unsupported data type: "+typeof f);
return h}}h.create(f);h.open();g.isFunction(h.o.onShow)&&h.o.onShow.apply(h,[h.d]);
return h},create:function(f){var d=this;e=d.getDimensions();
if(d.o.modal&&c){d.d.iframe=g('<iframe src="javascript:false;"></iframe>').css(g.extend(d.o.iframeCss,{display:"none",opacity:0,position:"fixed",height:e[0],width:e[1],zIndex:d.o.zIndex,top:0,left:0})).appendTo(d.o.appendTo)
}d.d.overlay=g("<div></div>").attr("id",d.o.overlayId).addClass("simplemodal-overlay").css(g.extend(d.o.overlayCss,{display:"none",opacity:d.o.opacity/100,height:d.o.modal?e[0]:0,width:d.o.modal?e[1]:0,position:"fixed",left:0,top:0,zIndex:d.o.zIndex+1})).appendTo(d.o.appendTo);
d.d.container=g("<div></div>").attr("id",d.o.containerId).addClass("simplemodal-container").css(g.extend(d.o.containerCss,{display:"none",position:"fixed",zIndex:d.o.zIndex+2})).append(d.o.close&&d.o.closeHTML?g(d.o.closeHTML).addClass(d.o.closeClass):"").appendTo(d.o.appendTo);
d.d.wrap=g("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(d.d.container);
d.d.data=f.attr("id",f.attr("id")||d.o.dataId).addClass("simplemodal-data").css(g.extend(d.o.dataCss,{display:"none"})).appendTo("body");
d.setContainerDimensions();d.d.data.appendTo(d.d.wrap);
if(c||b){d.fixIE()}},bindEvents:function(){var d=this;
g("."+d.o.closeClass).bind("click.simplemodal",function(f){f.preventDefault();
d.close()});d.o.modal&&d.o.close&&d.o.overlayClose&&d.d.overlay.bind("click.simplemodal",function(f){f.preventDefault();
d.close()});g(document).bind("keydown.simplemodal",function(f){if(d.o.modal&&f.keyCode===9){d.watchTab(f)
}else{if(d.o.close&&d.o.escClose&&f.keyCode===27){f.preventDefault();
d.close()}}});g(window).bind("resize.simplemodal",function(){e=d.getDimensions();
d.o.autoResize?d.setContainerDimensions():d.o.autoPosition&&d.setPosition();
if(c||b){d.fixIE()}else{if(d.o.modal){d.d.iframe&&d.d.iframe.css({height:e[0],width:e[1]});
d.d.overlay.css({height:e[0],width:e[1]})}}})},unbindEvents:function(){g("."+this.o.closeClass).unbind("click.simplemodal");
g(document).unbind("keydown.simplemodal");g(window).unbind("resize.simplemodal");
this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var f=this,d=f.o.position;
g.each([f.d.iframe||null,!f.o.modal?null:f.d.overlay,f.d.container],function(l,i){if(i){var j=i[0].style;
j.position="absolute";if(l<2){j.removeExpression("height");
j.removeExpression("width");j.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"');
j.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"')
}else{var k;if(d&&d.constructor===Array){l=d[0]?typeof d[0]==="number"?d[0].toString():d[0].replace(/px/,""):i.css("top").replace(/px/,"");
l=l.indexOf("%")===-1?l+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(l.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"';
if(d[1]){k=typeof d[1]==="number"?d[1].toString():d[1].replace(/px/,"");
k=k.indexOf("%")===-1?k+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(k.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"'
}}else{l='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"';
k='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"'
}j.removeExpression("top");j.removeExpression("left");
j.setExpression("top",l);j.setExpression("left",k)
}}})},focus:function(f){var d=this;f=f&&g.inArray(f,["first","last"])!==-1?f:"first";
var h=g(":input:enabled:visible:"+f,d.d.wrap);setTimeout(function(){h.length>0?h.focus():d.d.wrap.focus()
},10)},getDimensions:function(){var d=g(window);return[g.browser.opera&&g.browser.version>"9.5"&&g.fn.jquery<"1.3"||g.browser.opera&&g.browser.version<"9.5"&&g.fn.jquery>"1.2.6"?d[0].innerHeight:d.height(),d.width()]
},getVal:function(f,d){return f?typeof f==="number"?f:f==="auto"?0:f.indexOf("%")>0?parseInt(f.replace(/%/,""))/100*(d==="h"?e[0]:e[1]):parseInt(f.replace(/px/,"")):null
},update:function(f,d){var h=this;if(!h.d.data){return false
}h.d.origHeight=h.getVal(f,"h");h.d.origWidth=h.getVal(d,"w");
h.d.data.hide();f&&h.d.container.css("height",f);
d&&h.d.container.css("width",d);h.setContainerDimensions();
h.d.data.show();h.o.focus&&h.focus();h.unbindEvents();
h.bindEvents()},setContainerDimensions:function(){var f=this,d=c||a,p=f.d.origHeight?f.d.origHeight:g.browser.opera?f.d.container.height():f.getVal(d?f.d.container[0].currentStyle.height:f.d.container.css("height"),"h");
d=f.d.origWidth?f.d.origWidth:g.browser.opera?f.d.container.width():f.getVal(d?f.d.container[0].currentStyle.width:f.d.container.css("width"),"w");
var m=f.d.data.outerHeight(true),n=f.d.data.outerWidth(true);
f.d.origHeight=f.d.origHeight||p;f.d.origWidth=f.d.origWidth||d;
var o=f.o.maxHeight?f.getVal(f.o.maxHeight,"h"):null,l=f.o.maxWidth?f.getVal(f.o.maxWidth,"w"):null;
o=o&&o<e[0]?o:e[0];l=l&&l<e[1]?l:e[1];var k=f.o.minHeight?f.getVal(f.o.minHeight,"h"):"auto";
p=p?f.o.autoResize&&p>o?o:p<k?k:p:m?m>o?o:f.o.minHeight&&k!=="auto"&&m<k?k:m:k;
o=f.o.minWidth?f.getVal(f.o.minWidth,"w"):"auto";
d=d?f.o.autoResize&&d>l?l:d<o?o:d:n?n>l?l:f.o.minWidth&&o!=="auto"&&n<o?o:n:o;
f.d.container.css({height:p,width:d});f.d.wrap.css({overflow:m>p||n>d?"auto":"visible"});
f.o.autoPosition&&f.setPosition()},setPosition:function(){var f=this,d,h;
d=e[0]/2-f.d.container.outerHeight(true)/2;h=e[1]/2-f.d.container.outerWidth(true)/2;
if(f.o.position&&Object.prototype.toString.call(f.o.position)==="[object Array]"){d=f.o.position[0]||d;
h=f.o.position[1]||h}else{d=d;h=h}f.d.container.css({left:h,top:d})
},watchTab:function(f){var d=this;if(g(f.target).parents(".simplemodal-container").length>0){d.inputs=g(":input:enabled:visible:first, :input:enabled:visible:last",d.d.data[0]);
if(!f.shiftKey&&f.target===d.inputs[d.inputs.length-1]||f.shiftKey&&f.target===d.inputs[0]||d.inputs.length===0){f.preventDefault();
d.focus(f.shiftKey?"last":"first")}}else{f.preventDefault();
d.focus()}},open:function(){var d=this;d.d.iframe&&d.d.iframe.show();
if(g.isFunction(d.o.onOpen)){d.o.onOpen.apply(d,[d.d])
}else{d.d.overlay.show();d.d.container.show();d.d.data.show()
}d.o.focus&&d.focus();d.bindEvents()},close:function(){var f=this;
if(!f.d.data){return false}f.unbindEvents();if(g.isFunction(f.o.onClose)&&!f.occb){f.occb=true;
f.o.onClose.apply(f,[f.d])}else{if(f.d.placeholder){var d=g("#simplemodal-placeholder");
if(f.o.persist){d.replaceWith(f.d.data.removeClass("simplemodal-data").css("display",f.display))
}else{f.d.data.hide().remove();d.replaceWith(f.d.orig)
}}else{f.d.data.hide().remove()}f.d.container.hide().remove();
f.d.overlay.hide();f.d.iframe&&f.d.iframe.hide().remove();
setTimeout(function(){if(f.d.overlay){f.d.overlay.remove()
}f.d={}},10)}}}})(jQuery);console.log("=============== >  jqueryJSStuff/jquery.simplemodal.js ");
(function(a){a.alerts={verticalOffset:-75,horizontalOffset:0,repositionOnResize:true,overlayOpacity:0.01,overlayColor:"#FFF",draggable:true,okButton:"&nbsp;OK&nbsp;",cancelButton:"&nbsp;Cancel&nbsp;",dialogClass:null,alert:function(b,c,d){if(c==null){c="Alert"
}a.alerts._show(c,b,null,"alert",function(e){if(d){d(e)
}})},confirm:function(b,c,d){if(c==null){c="Confirm"
}a.alerts._show(c,b,null,"confirm",function(e){if(d){d(e)
}})},prompt:function(b,c,d,e){if(d==null){d="Prompt"
}a.alerts._show(d,b,c,"prompt",function(f){if(e){e(f)
}})},_show:function(g,f,c,b,i){a.alerts._hide();a.alerts._overlay("show");
a("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
if(a.alerts.dialogClass){a("#popup_container").addClass(a.alerts.dialogClass)
}var h=(a.browser.msie&&parseInt(a.browser.version)<=6)?"absolute":"fixed";
a("#popup_container").css({position:h,zIndex:99999,padding:0,margin:0});
a("#popup_title").text(g);a("#popup_content").addClass(b);
a("#popup_message").text(f);a("#popup_message").html(a("#popup_message").text().replace(/\n/g,"<br />"));
a("#popup_container").css({minWidth:a("#popup_container").outerWidth(),maxWidth:a("#popup_container").outerWidth()});
a.alerts._reposition();a.alerts._maintainPosition(true);
switch(b){case"alert":a("#popup_message").after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /></div>');
a("#popup_ok").click(function(){a.alerts._hide();
i(true)});a("#popup_ok").focus().keypress(function(j){if(j.keyCode==13||j.keyCode==27){a("#popup_ok").trigger("click")
}});break;case"confirm":a("#popup_message").after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+a.alerts.cancelButton+'" id="popup_cancel" /></div>');
a("#popup_ok").click(function(){a.alerts._hide();
if(i){i(true)}});a("#popup_cancel").click(function(){a.alerts._hide();
if(i){i(false)}});a("#popup_ok").focus();a("#popup_ok, #popup_cancel").keypress(function(j){if(j.keyCode==13){a("#popup_ok").trigger("click")
}if(j.keyCode==27){a("#popup_cancel").trigger("click")
}});break;case"prompt":a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+a.alerts.cancelButton+'" id="popup_cancel" /></div>');
a("#popup_prompt").width(a("#popup_message").width());
a("#popup_ok").click(function(){var e=a("#popup_prompt").val();
a.alerts._hide();if(i){i(e)}});a("#popup_cancel").click(function(){a.alerts._hide();
if(i){i(null)}});a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(j){if(j.keyCode==13){a("#popup_ok").trigger("click")
}if(j.keyCode==27){a("#popup_cancel").trigger("click")
}});if(c){a("#popup_prompt").val(c)}a("#popup_prompt").focus().select();
break}if(a.alerts.draggable){try{a("#popup_container").draggable({handle:a("#popup_title")});
a("#popup_title").css({cursor:"move"})}catch(d){}}},_hide:function(){a("#popup_container").remove();
a.alerts._overlay("hide");a.alerts._maintainPosition(false)
},_overlay:function(b){switch(b){case"show":a.alerts._overlay("hide");
a("BODY").append('<div id="popup_overlay"></div>');
a("#popup_overlay").css({position:"absolute",zIndex:99998,top:"0px",left:"0px",width:"100%",height:a(document).height(),background:a.alerts.overlayColor,opacity:a.alerts.overlayOpacity});
break;case"hide":a("#popup_overlay").remove();break
}},_reposition:function(){var c=((a(window).height()/2)-(a("#popup_container").outerHeight()/2))+a.alerts.verticalOffset;
var b=((a(window).width()/2)-(a("#popup_container").outerWidth()/2))+a.alerts.horizontalOffset;
if(c<0){c=0}if(b<0){b=0}if(a.browser.msie&&parseInt(a.browser.version)<=6){c=c+a(window).scrollTop()
}a("#popup_container").css({top:c+"px",left:b+"px"});
a("#popup_overlay").height(a(document).height())},_maintainPosition:function(b){if(a.alerts.repositionOnResize){switch(b){case true:a(window).bind("resize",a.alerts._reposition);
break;case false:a(window).unbind("resize",a.alerts._reposition);
break}}}};jAlert=function(b,c,d){a.alerts.alert(b,c,d)
};jConfirm=function(b,c,d){a.alerts.confirm(b,c,d)
};jPrompt=function(b,c,d,e){a.alerts.prompt(b,c,d,e)
}})(jQuery);console.log("=============== >  jqueryJSStuff/jquery.alerts.js ");
/*! DataTables 1.10.11
 * ©2008-2015 SpryMedia Ltd - datatables.net/license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],function(b){return a(b,window,document)
})}else{if(typeof exports==="object"){module.exports=function(b,c){if(!b){b=window
}if(!c){c=typeof window!=="undefined"?require("jquery"):require("jquery")(b)
}return a(c,b,b.document)}}else{a(jQuery,window,document)
}}}(function(bE,a6,v,aH){var L;var G;var H;var bj;
var ay;var a7={};var U=/[\r\n]/g;var aS=/<.*?>/g;
var ak=/^[\w\+\-]/;var bu=/[\w\+\-]$/;var aA=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^","-"].join("|\\")+")","g");
var bF=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi;
var bA=function(bQ){return !bQ||bQ===true||bQ==="-"?true:false
};var D=function(bR){var bQ=parseInt(bR,10);return !isNaN(bQ)&&isFinite(bR)?bQ:null
};var bC=function(bR,bQ){if(!a7[bQ]){a7[bQ]=new RegExp(j(bQ),"g")
}return typeof bR==="string"&&bQ!=="."?bR.replace(/\./g,"").replace(a7[bQ],"."):bR
};var ah=function(bT,bQ,bS){var bR=typeof bT==="string";
if(bA(bT)){return true}if(bQ&&bR){bT=bC(bT,bQ)}if(bS&&bR){bT=bT.replace(bF,"")
}return !isNaN(parseFloat(bT))&&isFinite(bT)};var bL=function(bQ){return bA(bQ)||typeof bQ==="string"
};var g=function(bT,bQ,bS){if(bA(bT)){return true
}var bR=bL(bT);return !bR?null:ah(B(bT),bQ,bS)?true:null
};var ar=function(bR,bV,bU){var bS=[];var bT=0,bQ=bR.length;
if(bU!==aH){for(;bT<bQ;bT++){if(bR[bT]&&bR[bT][bV]){bS.push(bR[bT][bV][bU])
}}}else{for(;bT<bQ;bT++){if(bR[bT]){bS.push(bR[bT][bV])
}}}return bS};var q=function(bS,bQ,bW,bV){var bT=[];
var bU=0,bR=bQ.length;if(bV!==aH){for(;bU<bR;bU++){if(bS[bQ[bU]][bW]){bT.push(bS[bQ[bU]][bW][bV])
}}}else{for(;bU<bR;bU++){bT.push(bS[bQ[bU]][bW])}}return bT
};var bf=function(bQ,bU){var bS=[];var bR;if(bU===aH){bU=0;
bR=bQ}else{bR=bU;bU=bQ}for(var bT=bU;bT<bR;bT++){bS.push(bT)
}return bS};var ab=function(bR){var bS=[];for(var bT=0,bQ=bR.length;
bT<bQ;bT++){if(bR[bT]){bS.push(bR[bT])}}return bS
};var B=function(bQ){return bQ.replace(aS,"")};var aE=function(bW){var bT=[],bV,bU,bQ=bW.length,bS,bR=0;
again:for(bU=0;bU<bQ;bU++){bV=bW[bU];for(bS=0;bS<bR;
bS++){if(bT[bS]===bV){continue again}}bT.push(bV);
bR++}return bT};function R(bU){var bT="a aa ai ao as b fn i m o s ",bQ,bS,bR={};
bE.each(bU,function(bV,bW){bQ=bV.match(/^([^A-Z]+?)([A-Z])/);
if(bQ&&bT.indexOf(bQ[1]+" ")!==-1){bS=bV.replace(bQ[0],bQ[2].toLowerCase());
bR[bS]=bV;if(bQ[1]==="o"){R(bU[bV])}}});bU._hungarianMap=bR
}function Y(bT,bQ,bS){if(!bT._hungarianMap){R(bT)
}var bR;bE.each(bQ,function(bU,bV){bR=bT._hungarianMap[bU];
if(bR!==aH&&(bS||bQ[bR]===aH)){if(bR.charAt(0)==="o"){if(!bQ[bR]){bQ[bR]={}
}bE.extend(true,bQ[bR],bQ[bU]);Y(bT[bR],bQ[bR],bS)
}else{bQ[bR]=bQ[bU]}}})}function aQ(bT){var bS=L.defaults.oLanguage;
var bR=bT.sZeroRecords;if(!bT.sEmptyTable&&bR&&bS.sEmptyTable==="No data available in table"){P(bT,bT,"sZeroRecords","sEmptyTable")
}if(!bT.sLoadingRecords&&bR&&bS.sLoadingRecords==="Loading..."){P(bT,bT,"sZeroRecords","sLoadingRecords")
}if(bT.sInfoThousands){bT.sThousands=bT.sInfoThousands
}var bQ=bT.sDecimal;if(bQ){bq(bQ)}}var aK=function(bS,bR,bQ){if(bS[bR]!==aH){bS[bQ]=bS[bR]
}};function a2(bT){aK(bT,"ordering","bSort");aK(bT,"orderMulti","bSortMulti");
aK(bT,"orderClasses","bSortClasses");aK(bT,"orderCellsTop","bSortCellsTop");
aK(bT,"order","aaSorting");aK(bT,"orderFixed","aaSortingFixed");
aK(bT,"paging","bPaginate");aK(bT,"pagingType","sPaginationType");
aK(bT,"pageLength","iDisplayLength");aK(bT,"searching","bFilter");
if(typeof bT.sScrollX==="boolean"){bT.sScrollX=bT.sScrollX?"100%":""
}if(typeof bT.scrollX==="boolean"){bT.scrollX=bT.scrollX?"100%":""
}var bS=bT.aoSearchCols;if(bS){for(var bR=0,bQ=bS.length;
bR<bQ;bR++){if(bS[bR]){Y(L.models.oSearch,bS[bR])
}}}}function V(bR){aK(bR,"orderable","bSortable");
aK(bR,"orderData","aDataSort");aK(bR,"orderSequence","asSorting");
aK(bR,"orderDataType","sortDataType");var bQ=bR.aDataSort;
if(bQ&&!bE.isArray(bQ)){bR.aDataSort=[bQ]}}function bd(bT){if(!L.__browser){var bR={};
L.__browser=bR;var bU=bE("<div/>").css({position:"fixed",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(bE("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(bE("<div/>").css({width:"100%",height:10}))).appendTo("body");
var bS=bU.children();var bQ=bS.children();bR.barWidth=bS[0].offsetWidth-bS[0].clientWidth;
bR.bScrollOversize=bQ[0].offsetWidth===100&&bS[0].clientWidth!==100;
bR.bScrollbarLeft=Math.round(bQ.offset().left)!==1;
bR.bBounding=bU[0].getBoundingClientRect().width?true:false;
bU.remove()}bE.extend(bT.oBrowser,L.__browser);bT.oScroll.iBarWidth=L.__browser.barWidth
}function aT(bU,bW,bY,bQ,bS,bR){var bT=bQ,bX,bV=false;
if(bY!==aH){bX=bY;bV=true}while(bT!==bS){if(!bU.hasOwnProperty(bT)){continue
}bX=bV?bW(bX,bU[bT],bT,bU):bU[bT];bV=true;bT+=bR}return bX
}function M(bU,bT){var bV=L.defaults.column;var bQ=bU.aoColumns.length;
var bS=bE.extend({},L.models.oColumn,bV,{nTh:bT?bT:v.createElement("th"),sTitle:bV.sTitle?bV.sTitle:bT?bT.innerHTML:"",aDataSort:bV.aDataSort?bV.aDataSort:[bQ],mData:bV.mData?bV.mData:bQ,idx:bQ});
bU.aoColumns.push(bS);var bR=bU.aoPreSearchCols;bR[bQ]=bE.extend({},L.models.oSearch,bR[bQ]);
a0(bU,bQ,bE(bT).data())}function a0(bS,b1,b0){var bW=bS.aoColumns[b1];
var bQ=bS.oClasses;var bR=bE(bW.nTh);if(!bW.sWidthOrig){bW.sWidthOrig=bR.attr("width")||null;
var b2=(bR.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);
if(b2){bW.sWidthOrig=b2[1]}}if(b0!==aH&&b0!==null){V(b0);
Y(L.defaults.column,b0);if(b0.mDataProp!==aH&&!b0.mData){b0.mData=b0.mDataProp
}if(b0.sType){bW._sManualType=b0.sType}if(b0.className&&!b0.sClass){b0.sClass=b0.className
}bE.extend(bW,b0);P(bW,b0,"sWidth","sWidthOrig");
if(b0.iDataSort!==aH){bW.aDataSort=[b0.iDataSort]
}P(bW,b0,"aDataSort")}var bZ=bW.mData;var bV=am(bZ);
var bY=bW.mRender?am(bW.mRender):null;var bU=function(b3){return typeof b3==="string"&&b3.indexOf("@")!==-1
};bW._bAttrSrc=bE.isPlainObject(bZ)&&(bU(bZ.sort)||bU(bZ.type)||bU(bZ.filter));
bW._setter=null;bW.fnGetData=function(b5,b4,b6){var b3=bV(b5,b4,aH,b6);
return bY&&b4?bY(b3,b4,b5,b6):b3};bW.fnSetData=function(b3,b5,b4){return av(bZ)(b3,b5,b4)
};if(typeof bZ!=="number"){bS._rowReadObject=true
}if(!bS.oFeatures.bSort){bW.bSortable=false;bR.addClass(bQ.sSortableNone)
}var bT=bE.inArray("asc",bW.asSorting)!==-1;var bX=bE.inArray("desc",bW.asSorting)!==-1;
if(!bW.bSortable||(!bT&&!bX)){bW.sSortingClass=bQ.sSortableNone;
bW.sSortingClassJUI=""}else{if(bT&&!bX){bW.sSortingClass=bQ.sSortableAsc;
bW.sSortingClassJUI=bQ.sSortJUIAscAllowed}else{if(!bT&&bX){bW.sSortingClass=bQ.sSortableDesc;
bW.sSortingClassJUI=bQ.sSortJUIDescAllowed}else{bW.sSortingClass=bQ.sSortable;
bW.sSortingClassJUI=bQ.sSortJUI}}}}function aG(bU){if(bU.oFeatures.bAutoWidth!==false){var bT=bU.aoColumns;
bv(bU);for(var bS=0,bR=bT.length;bS<bR;bS++){bT[bS].nTh.style.width=bT[bS].sWidth
}}var bQ=bU.oScroll;if(bQ.sY!==""||bQ.sX!==""){i(bU)
}J(bU,null,"column-sizing",[bU])}function o(bS,bQ){var bR=m(bS,"bVisible");
return typeof bR[bQ]==="number"?bR[bQ]:null}function bI(bS,bQ){var bR=m(bS,"bVisible");
var bT=bE.inArray(bQ,bR);return bT!==-1?bT:null}function aO(bQ){return bE(ar(bQ.aoColumns,"nTh")).filter(":visible").length
}function m(bS,bR){var bQ=[];bE.map(bS.aoColumns,function(bU,bT){if(bU[bR]){bQ.push(bT)
}});return bQ}function s(bT){var bU=bT.aoColumns;
var bY=bT.aoData;var b0=L.ext.type.detect;var bZ,b3,bX,bR,bW,bV;
var bS,b1,b2,bQ;for(bZ=0,b3=bU.length;bZ<b3;bZ++){bS=bU[bZ];
bQ=[];if(!bS.sType&&bS._sManualType){bS.sType=bS._sManualType
}else{if(!bS.sType){for(bX=0,bR=b0.length;bX<bR;bX++){for(bW=0,bV=bY.length;
bW<bV;bW++){if(bQ[bW]===aH){bQ[bW]=bt(bT,bW,bZ,"type")
}b2=b0[bX](bQ[bW],bT);if(!b2&&bX!==b0.length-1){break
}if(b2==="html"){break}}if(b2){bS.sType=b2;break}}if(!bS.sType){bS.sType="string"
}}}}}function h(bR,b1,bS,b0){var bX,bT,bW,b2,bV,bZ,bQ;
var bU=bR.aoColumns;if(b1){for(bX=b1.length-1;bX>=0;
bX--){bQ=b1[bX];var bY=bQ.targets!==aH?bQ.targets:bQ.aTargets;
if(!bE.isArray(bY)){bY=[bY]}for(bW=0,b2=bY.length;
bW<b2;bW++){if(typeof bY[bW]==="number"&&bY[bW]>=0){while(bU.length<=bY[bW]){M(bR)
}b0(bY[bW],bQ)}else{if(typeof bY[bW]==="number"&&bY[bW]<0){b0(bU.length+bY[bW],bQ)
}else{if(typeof bY[bW]==="string"){for(bV=0,bZ=bU.length;
bV<bZ;bV++){if(bY[bW]=="_all"||bE(bU[bV].nTh).hasClass(bY[bW])){b0(bV,bQ)
}}}}}}}}if(bS){for(bX=0,bT=bS.length;bX<bT;bX++){b0(bX,bS[bX])
}}}function aM(bS,b1,b0,bX){var bZ=bS.aoData.length;
var bR=bE.extend(true,{},L.models.oRow,{src:b0?"dom":"data",idx:bZ});
bR._aData=b1;bS.aoData.push(bR);var bW,bU;var bV=bS.aoColumns;
for(var bY=0,bT=bV.length;bY<bT;bY++){bV[bY].sType=null
}bS.aiDisplayMaster.push(bZ);var bQ=bS.rowIdFn(b1);
if(bQ!==aH){bS.aIds[bQ]=bR}if(b0||!bS.oFeatures.bDeferRender){N(bS,bZ,b0,bX)
}return bZ}function bP(bR,bQ){var bS;if(!(bQ instanceof bE)){bQ=bE(bQ)
}return bQ.map(function(bT,bU){bS=be(bR,bU);return aM(bR,bS.data,bU,bS.cells)
})}function br(bQ,bR){return(bR._DT_RowIndex!==aH)?bR._DT_RowIndex:null
}function aY(bQ,bR,bS){return bE.inArray(bS,bQ.aoData[bR].anCells)
}function bt(bT,bQ,bU,bW){var bX=bT.iDraw;var bR=bT.aoColumns[bU];
var bS=bT.aoData[bQ]._aData;var bY=bR.sDefaultContent;
var bV=bR.fnGetData(bS,bW,{settings:bT,row:bQ,col:bU});
if(bV===aH){if(bT.iDrawError!=bX&&bY===null){aL(bT,0,"Requested unknown parameter "+(typeof bR.mData=="function"?"{function}":"'"+bR.mData+"'")+" for row "+bQ+", column "+bU,4);
bT.iDrawError=bX}return bY}if((bV===bS||bV===null)&&bY!==null&&bW!==aH){bV=bY
}else{if(typeof bV==="function"){return bV.call(bS)
}}if(bV===null&&bW=="display"){return""}return bV
}function bl(bR,bS,bV,bU){var bQ=bR.aoColumns[bV];
var bT=bR.aoData[bS]._aData;bQ.fnSetData(bT,bU,{settings:bR,row:bS,col:bV})
}var I=/\[.*?\]$/;var c=/\(\)$/;function ai(bQ){return bE.map(bQ.match(/(\\.|[^\.])+/g)||[""],function(bR){return bR.replace(/\\./g,".")
})}function am(bR){if(bE.isPlainObject(bR)){var bS={};
bE.each(bR,function(bT,bU){if(bU){bS[bT]=am(bU)}});
return function(bV,bU,bX,bW){var bT=bS[bU]||bS._;
return bT!==aH?bT(bV,bU,bX,bW):bV}}else{if(bR===null){return function(bT){return bT
}}else{if(typeof bR==="function"){return function(bU,bT,bW,bV){return bR(bU,bT,bW,bV)
}}else{if(typeof bR==="string"&&(bR.indexOf(".")!==-1||bR.indexOf("[")!==-1||bR.indexOf("(")!==-1)){var bQ=function(b1,b2,bT){var b4,bX,bZ,bW;
if(bT!==""){var b3=ai(bT);for(var b0=0,bV=b3.length;
b0<bV;b0++){b4=b3[b0].match(I);bX=b3[b0].match(c);
if(b4){b3[b0]=b3[b0].replace(I,"");if(b3[b0]!==""){b1=b1[b3[b0]]
}bZ=[];b3.splice(0,b0+1);bW=b3.join(".");if(bE.isArray(b1)){for(var bY=0,b5=b1.length;
bY<b5;bY++){bZ.push(bQ(b1[bY],b2,bW))}}var bU=b4[0].substring(1,b4[0].length-1);
b1=(bU==="")?bZ:bZ.join(bU);break}else{if(bX){b3[b0]=b3[b0].replace(c,"");
b1=b1[b3[b0]]();continue}}if(b1===null||b1[b3[b0]]===aH){return aH
}b1=b1[b3[b0]]}}return b1};return function(bU,bT){return bQ(bU,bT,bR)
}}else{return function(bU,bT){return bU[bR]}}}}}}function av(bR){if(bE.isPlainObject(bR)){return av(bR._)
}else{if(bR===null){return function(){}}else{if(typeof bR==="function"){return function(bS,bU,bT){bR(bS,"set",bU,bT)
}}else{if(typeof bR==="string"&&(bR.indexOf(".")!==-1||bR.indexOf("[")!==-1||bR.indexOf("(")!==-1)){var bQ=function(b0,bW,bS){var b3=ai(bS),b1;
var b2=b3[b3.length-1];var b4,bX,bT,bV;for(var bZ=0,bU=b3.length-1;
bZ<bU;bZ++){b4=b3[bZ].match(I);bX=b3[bZ].match(c);
if(b4){b3[bZ]=b3[bZ].replace(I,"");b0[b3[bZ]]=[];
b1=b3.slice();b1.splice(0,bZ+1);bV=b1.join(".");if(bE.isArray(bW)){for(var bY=0,b5=bW.length;
bY<b5;bY++){bT={};bQ(bT,bW[bY],bV);b0[b3[bZ]].push(bT)
}}else{b0[b3[bZ]]=bW}return}else{if(bX){b3[bZ]=b3[bZ].replace(c,"");
b0=b0[b3[bZ]](bW)}}if(b0[b3[bZ]]===null||b0[b3[bZ]]===aH){b0[b3[bZ]]={}
}b0=b0[b3[bZ]]}if(b2.match(c)){b0=b0[b2.replace(c,"")](bW)
}else{b0[b2.replace(I,"")]=bW}};return function(bS,bT){return bQ(bS,bT,bR)
}}else{return function(bS,bT){bS[bR]=bT}}}}}}function bG(bQ){return ar(bQ.aoData,"_aData")
}function bh(bQ){bQ.aoData.length=0;bQ.aiDisplayMaster.length=0;
bQ.aiDisplay.length=0;bQ.aIds={}}function a4(bR,bT,bV){var bU=-1;
for(var bS=0,bQ=bR.length;bS<bQ;bS++){if(bR[bS]==bT){bU=bS
}else{if(bR[bS]>bT){bR[bS]--}}}if(bU!=-1&&bV===aH){bR.splice(bU,1)
}}function z(bT,bR,bQ,bU){var bZ=bT.aoData[bR];var bV,bX;
var bS=function(b0,b1){while(b0.childNodes.length){b0.removeChild(b0.firstChild)
}b0.innerHTML=bt(bT,bR,b1,"display")};if(bQ==="dom"||((!bQ||bQ==="auto")&&bZ.src==="dom")){bZ._aData=be(bT,bZ,bU,bU===aH?aH:bZ._aData).data
}else{var bY=bZ.anCells;if(bY){if(bU!==aH){bS(bY[bU],bU)
}else{for(bV=0,bX=bY.length;bV<bX;bV++){bS(bY[bV],bV)
}}}}bZ._aSortData=null;bZ._aFilterData=null;var bW=bT.aoColumns;
if(bU!==aH){bW[bU].sType=null}else{for(bV=0,bX=bW.length;
bV<bX;bV++){bW[bV].sType=null}aa(bT,bZ)}}function be(b6,bU,bX,b7){var b3=[],bV=bU.firstChild,b8,bT,bZ,b4=0,b5,bQ=b6.aoColumns,bS=b6._rowReadObject;
b7=b7!==aH?b7:bS?{}:[];var b0=function(cb,cd){if(typeof cb==="string"){var ca=cb.indexOf("@");
if(ca!==-1){var b9=cb.substring(ca+1);var cc=av(cb);
cc(b7,cd.getAttribute(b9))}}};var bW=function(b9){if(bX===aH||bX===b4){bT=bQ[b4];
b5=bE.trim(b9.innerHTML);if(bT&&bT._bAttrSrc){var ca=av(bT.mData._);
ca(b7,b5);b0(bT.mData.sort,b9);b0(bT.mData.type,b9);
b0(bT.mData.filter,b9)}else{if(bS){if(!bT._setter){bT._setter=av(bT.mData)
}bT._setter(b7,b5)}else{b7[b4]=b5}}}b4++};if(bV){while(bV){b8=bV.nodeName.toUpperCase();
if(b8=="TD"||b8=="TH"){bW(bV);b3.push(bV)}bV=bV.nextSibling
}}else{b3=bU.anCells;for(var b2=0,b1=b3.length;b2<b1;
b2++){bW(b3[b2])}}var bR=bU.firstChild?bU:bU.nTr;
if(bR){var bY=bR.getAttribute("id");if(bY){av(b6.rowId)(b7,bY)
}}return{data:b7,cells:b3}}function N(bR,bY,bQ,bW){var b1=bR.aoData[bY],bU=b1._aData,b0=[],bZ,bV,bT,bX,bS;
if(b1.nTr===null){bZ=bQ||v.createElement("tr");b1.nTr=bZ;
b1.anCells=b0;bZ._DT_RowIndex=bY;aa(bR,b1);for(bX=0,bS=bR.aoColumns.length;
bX<bS;bX++){bT=bR.aoColumns[bX];bV=bQ?bW[bX]:v.createElement(bT.sCellType);
bV._DT_CellIndex={row:bY,column:bX};b0.push(bV);if((!bQ||bT.mRender||bT.mData!==bX)&&(!bE.isPlainObject(bT.mData)||bT.mData._!==bX+".display")){bV.innerHTML=bt(bR,bY,bX,"display")
}if(bT.sClass){bV.className+=" "+bT.sClass}if(bT.bVisible&&!bQ){bZ.appendChild(bV)
}else{if(!bT.bVisible&&bQ){bV.parentNode.removeChild(bV)
}}if(bT.fnCreatedCell){bT.fnCreatedCell.call(bR.oInstance,bV,bt(bR,bY,bX),bU,bY,bX)
}}J(bR,"aoRowCreatedCallback",null,[bZ,bU,bY])}b1.nTr.setAttribute("role","row")
}function aa(bR,bU){var bT=bU.nTr;var bS=bU._aData;
if(bT){var bV=bR.rowIdFn(bS);if(bV){bT.id=bV}if(bS.DT_RowClass){var bQ=bS.DT_RowClass.split(" ");
bU.__rowc=bU.__rowc?aE(bU.__rowc.concat(bQ)):bQ;bE(bT).removeClass(bU.__rowc.join(" ")).addClass(bS.DT_RowClass)
}if(bS.DT_RowAttr){bE(bT).attr(bS.DT_RowAttr)}if(bS.DT_RowData){bE(bT).data(bS.DT_RowData)
}}}function aJ(bQ){var bU,bZ,bY,b1,bT;var bV=bQ.nTHead;
var bW=bQ.nTFoot;var bX=bE("th, td",bV).length===0;
var bS=bQ.oClasses;var bR=bQ.aoColumns;if(bX){b1=bE("<tr/>").appendTo(bV)
}for(bU=0,bZ=bR.length;bU<bZ;bU++){bT=bR[bU];bY=bE(bT.nTh).addClass(bT.sClass);
if(bX){bY.appendTo(b1)}if(bQ.oFeatures.bSort){bY.addClass(bT.sSortingClass);
if(bT.bSortable!==false){bY.attr("tabindex",bQ.iTabIndex).attr("aria-controls",bQ.sTableId);
A(bQ,bT.nTh,bU)}}if(bT.sTitle!=bY[0].innerHTML){bY.html(bT.sTitle)
}Q(bQ,"header")(bQ,bY,bT,bS)}if(bX){au(bQ.aoHeader,bV)
}bE(bV).find(">tr").attr("role","row");bE(bV).find(">tr>th, >tr>td").addClass(bS.sHeaderTH);
bE(bW).find(">tr>th, >tr>td").addClass(bS.sFooterTH);
if(bW!==null){var b0=bQ.aoFooter[0];for(bU=0,bZ=b0.length;
bU<bZ;bU++){bT=bR[bU];bT.nTf=b0[bU].cell;if(bT.sClass){bE(bT.nTf).addClass(bT.sClass)
}}}}function a5(bT,b2,b5){var bY,bV,bX,b1,bW,bZ,bU,b4;
var bS=[];var b0=[];var bQ=bT.aoColumns.length;var bR,b3;
if(!b2){return}if(b5===aH){b5=false}for(bY=0,bV=b2.length;
bY<bV;bY++){bS[bY]=b2[bY].slice();bS[bY].nTr=b2[bY].nTr;
for(bX=bQ-1;bX>=0;bX--){if(!bT.aoColumns[bX].bVisible&&!b5){bS[bY].splice(bX,1)
}}b0.push([])}for(bY=0,bV=bS.length;bY<bV;bY++){b4=bS[bY].nTr;
if(b4){while((bU=b4.firstChild)){b4.removeChild(bU)
}}for(bX=0,b1=bS[bY].length;bX<b1;bX++){bR=1;b3=1;
if(b0[bY][bX]===aH){b4.appendChild(bS[bY][bX].cell);
b0[bY][bX]=1;while(bS[bY+bR]!==aH&&bS[bY][bX].cell==bS[bY+bR][bX].cell){b0[bY+bR][bX]=1;
bR++}while(bS[bY][bX+b3]!==aH&&bS[bY][bX].cell==bS[bY][bX+b3].cell){for(bW=0;
bW<bR;bW++){b0[bY+bW][bX+b3]=1}b3++}bE(bS[bY][bX].cell).attr("rowspan",bR).attr("colspan",b3)
}}}}function a1(bS){var cc=J(bS,"aoPreDrawCallback","preDraw",[bS]);
if(bE.inArray(false,cc)!==-1){t(bS,false);return}var cb,b7,b3;
var bW=[];var ce=0;var b0=bS.asStripeClasses;var b5=b0.length;
var b1=bS.aoOpenRows.length;var b6=bS.oLanguage;var b2=bS.iInitDisplayStart;
var ca=w(bS)=="ssp";var bV=bS.aiDisplay;bS.bDrawing=true;
if(b2!==aH&&b2!==-1){bS._iDisplayStart=ca?b2:b2>=bS.fnRecordsDisplay()?0:b2;
bS.iInitDisplayStart=-1}var bR=bS._iDisplayStart;
var bT=bS.fnDisplayEnd();if(bS.bDeferLoading){bS.bDeferLoading=false;
bS.iDraw++;t(bS,false)}else{if(!ca){bS.iDraw++}else{if(!bS.bDestroying&&!ad(bS)){return
}}}if(bV.length!==0){var bU=ca?0:bR;var bQ=ca?bS.aoData.length:bT;
for(var b8=bU;b8<bQ;b8++){var bY=bV[b8];var bZ=bS.aoData[bY];
if(bZ.nTr===null){N(bS,bY)}var cd=bZ.nTr;if(b5!==0){var b9=b0[ce%b5];
if(bZ._sRowStripe!=b9){bE(cd).removeClass(bZ._sRowStripe).addClass(b9);
bZ._sRowStripe=b9}}J(bS,"aoRowCallback",null,[cd,bZ._aData,ce,b8]);
bW.push(cd);ce++}}else{var b4=b6.sZeroRecords;if(bS.iDraw==1&&w(bS)=="ajax"){b4=b6.sLoadingRecords
}else{if(b6.sEmptyTable&&bS.fnRecordsTotal()===0){b4=b6.sEmptyTable
}}bW[0]=bE("<tr/>",{"class":b5?b0[0]:""}).append(bE("<td />",{valign:"top",colSpan:aO(bS),"class":bS.oClasses.sRowEmpty}).html(b4))[0]
}J(bS,"aoHeaderCallback","header",[bE(bS.nTHead).children("tr")[0],bG(bS),bR,bT,bV]);
J(bS,"aoFooterCallback","footer",[bE(bS.nTFoot).children("tr")[0],bG(bS),bR,bT,bV]);
var bX=bE(bS.nTBody);bX.children().detach();bX.append(bE(bW));
J(bS,"aoDrawCallback","draw",[bS]);bS.bSorted=false;
bS.bFiltered=false;bS.bDrawing=false}function ag(bU,bR){var bT=bU.oFeatures,bQ=bT.bSort,bS=bT.bFilter;
if(bQ){u(bU)}if(bS){r(bU,bU.oPreviousSearch)}else{bU.aiDisplay=bU.aiDisplayMaster.slice()
}if(bR!==true){bU._iDisplayStart=0}bU._drawHold=bR;
a1(bU);bU._drawHold=false}function f(bU){var b7=bU.oClasses;
var b4=bE(bU.nTable);var bW=bE("<div/>").insertBefore(b4);
var bV=bU.oFeatures;var bR=bE("<div/>",{id:bU.sTableId+"_wrapper","class":b7.sWrapper+(bU.nTFoot?"":" "+b7.sNoFooter)});
bU.nHolding=bW[0];bU.nTableWrapper=bR[0];bU.nTableReinsertBefore=bU.nTable.nextSibling;
var bX=bU.sDom.split("");var b2,bY,bT,b8,b6,b0;for(var b3=0;
b3<bX.length;b3++){b2=null;bY=bX[b3];if(bY=="<"){bT=bE("<div/>")[0];
b8=bX[b3+1];if(b8=="'"||b8=='"'){b6="";b0=2;while(bX[b3+b0]!=b8){b6+=bX[b3+b0];
b0++}if(b6=="H"){b6=b7.sJUIHeader}else{if(b6=="F"){b6=b7.sJUIFooter
}}if(b6.indexOf(".")!=-1){var b1=b6.split(".");bT.id=b1[0].substr(1,b1[0].length-1);
bT.className=b1[1]}else{if(b6.charAt(0)=="#"){bT.id=b6.substr(1,b6.length-1)
}else{bT.className=b6}}b3+=b0}bR.append(bT);bR=bE(bT)
}else{if(bY==">"){bR=bR.parent()}else{if(bY=="l"&&bV.bPaginate&&bV.bLengthChange){b2=aP(bU)
}else{if(bY=="f"&&bV.bFilter){b2=n(bU)}else{if(bY=="r"&&bV.bProcessing){b2=bz(bU)
}else{if(bY=="t"){b2=by(bU)}else{if(bY=="i"&&bV.bInfo){b2=d(bU)
}else{if(bY=="p"&&bV.bPaginate){b2=ax(bU)}else{if(L.ext.feature.length!==0){var b5=L.ext.feature;
for(var bZ=0,bQ=b5.length;bZ<bQ;bZ++){if(bY==b5[bZ].cFeature){b2=b5[bZ].fnInit(bU);
break}}}}}}}}}}}if(b2){var bS=bU.aanFeatures;if(!bS[bY]){bS[bY]=[]
}bS[bY].push(b2);bR.append(b2)}}bW.replaceWith(bR);
bU.nHolding=null}function au(bW,bR){var b3=bE(bR).children("tr");
var b2,b0;var bY,bV,bU,bS,b4,bZ,bX,b5,bQ;var b1;var bT=function(b6,b9,b8){var b7=b6[b9];
while(b7[b8]){b8++}return b8};bW.splice(0,bW.length);
for(bY=0,bS=b3.length;bY<bS;bY++){bW.push([])}for(bY=0,bS=b3.length;
bY<bS;bY++){b2=b3[bY];bX=0;b0=b2.firstChild;while(b0){if(b0.nodeName.toUpperCase()=="TD"||b0.nodeName.toUpperCase()=="TH"){b5=b0.getAttribute("colspan")*1;
bQ=b0.getAttribute("rowspan")*1;b5=(!b5||b5===0||b5===1)?1:b5;
bQ=(!bQ||bQ===0||bQ===1)?1:bQ;bZ=bT(bW,bY,bX);b1=b5===1?true:false;
for(bU=0;bU<b5;bU++){for(bV=0;bV<bQ;bV++){bW[bY+bV][bZ+bU]={cell:b0,unique:b1};
bW[bY+bV].nTr=b2}}}b0=b0.nextSibling}}}function bg(bX,bR,bV){var bS=[];
if(!bV){bV=bX.aoHeader;if(bR){bV=[];au(bV,bR)}}for(var bU=0,bQ=bV.length;
bU<bQ;bU++){for(var bT=0,bW=bV[bU].length;bT<bW;bT++){if(bV[bU][bT].unique&&(!bS[bT]||!bX.bSortCellsTop)){bS[bT]=bV[bU][bT].cell
}}}return bS}function at(bR,bS,bW){J(bR,"aoServerParams","serverParams",[bS]);
if(bS&&bE.isArray(bS)){var bT={};var bU=/(.*?)\[\]$/;
bE.each(bS,function(b3,b4){var b2=b4.name.match(bU);
if(b2){var b1=b2[0];if(!bT[b1]){bT[b1]=[]}bT[b1].push(b4.value)
}else{bT[b4.name]=b4.value}});bS=bT}var bQ;var bX=bR.ajax;
var bY=bR.oInstance;var bZ=function(b1){J(bR,null,"xhr",[bR,b1,bR.jqXHR]);
bW(b1)};if(bE.isPlainObject(bX)&&bX.data){bQ=bX.data;
var b0=bE.isFunction(bQ)?bQ(bS,bR):bQ;bS=bE.isFunction(bQ)&&b0?b0:bE.extend(true,bS,b0);
delete bX.data}var bV={data:bS,success:function(b2){var b1=b2.error||b2.sError;
if(b1){aL(bR,0,b1)}bR.json=b2;bZ(b2)},dataType:"json",cache:false,type:bR.sServerMethod,error:function(b4,b2,b3){var b1=J(bR,null,"xhr",[bR,null,bR.jqXHR]);
if(bE.inArray(true,b1)===-1){if(b2=="parsererror"){aL(bR,0,"Invalid JSON response",1)
}else{if(b4.readyState===4){aL(bR,0,"Ajax error",7)
}}}t(bR,false)}};bR.oAjaxData=bS;J(bR,null,"preXhr",[bR,bS]);
if(bR.fnServerData){bR.fnServerData.call(bY,bR.sAjaxSource,bE.map(bS,function(b2,b1){return{name:b1,value:b2}
}),bZ,bR)}else{if(bR.sAjaxSource||typeof bX==="string"){bR.jqXHR=bE.ajax(bE.extend(bV,{url:bX||bR.sAjaxSource}))
}else{if(bE.isFunction(bX)){bR.jqXHR=bX.call(bY,bS,bZ,bR)
}else{bR.jqXHR=bE.ajax(bE.extend(bV,bX));bX.data=bQ
}}}}function ad(bQ){if(bQ.bAjaxDataGet){bQ.iDraw++;
t(bQ,true);at(bQ,bK(bQ),function(bR){T(bQ,bR)});return false
}return true}function bK(bV){var bW=bV.aoColumns,b2=bW.length,bS=bV.oFeatures,bQ=bV.oPreviousSearch,b1=bV.aoPreSearchCols,bZ,bY=[],bR,bU,b4,bX=aF(bV),b6=bV._iDisplayStart,b0=bS.bPaginate!==false?bV._iDisplayLength:-1;
var bT=function(b7,b8){bY.push({name:b7,value:b8})
};bT("sEcho",bV.iDraw);bT("iColumns",b2);bT("sColumns",ar(bW,"sName").join(","));
bT("iDisplayStart",b6);bT("iDisplayLength",b0);var b3={draw:bV.iDraw,columns:[],order:[],start:b6,length:b0,search:{value:bQ.sSearch,regex:bQ.bRegex}};
for(bZ=0;bZ<b2;bZ++){bU=bW[bZ];b4=b1[bZ];bR=typeof bU.mData=="function"?"function":bU.mData;
b3.columns.push({data:bR,name:bU.sName,searchable:bU.bSearchable,orderable:bU.bSortable,search:{value:b4.sSearch,regex:b4.bRegex}});
bT("mDataProp_"+bZ,bR);if(bS.bFilter){bT("sSearch_"+bZ,b4.sSearch);
bT("bRegex_"+bZ,b4.bRegex);bT("bSearchable_"+bZ,bU.bSearchable)
}if(bS.bSort){bT("bSortable_"+bZ,bU.bSortable)}}if(bS.bFilter){bT("sSearch",bQ.sSearch);
bT("bRegex",bQ.bRegex)}if(bS.bSort){bE.each(bX,function(b7,b8){b3.order.push({column:b8.col,dir:b8.dir});
bT("iSortCol_"+b7,b8.col);bT("sSortDir_"+b7,b8.dir)
});bT("iSortingCols",bX.length)}var b5=L.ext.legacy.ajax;
if(b5===null){return bV.sAjaxSource?bY:b3}return b5?bY:b3
}function T(bQ,bY){var bV=function(bZ,b0){return bY[bZ]!==aH?bY[bZ]:bY[b0]
};var bR=bs(bQ,bY);var bT=bV("sEcho","draw");var bU=bV("iTotalRecords","recordsTotal");
var bX=bV("iTotalDisplayRecords","recordsFiltered");
if(bT){if(bT*1<bQ.iDraw){return}bQ.iDraw=bT*1}bh(bQ);
bQ._iRecordsTotal=parseInt(bU,10);bQ._iRecordsDisplay=parseInt(bX,10);
for(var bS=0,bW=bR.length;bS<bW;bS++){aM(bQ,bR[bS])
}bQ.aiDisplay=bQ.aiDisplayMaster.slice();bQ.bAjaxDataGet=false;
a1(bQ);if(!bQ._bInitComplete){az(bQ,bY)}bQ.bAjaxDataGet=true;
t(bQ,false)}function bs(bS,bR){var bQ=bE.isPlainObject(bS.ajax)&&bS.ajax.dataSrc!==aH?bS.ajax.dataSrc:bS.sAjaxDataProp;
if(bQ==="data"){return bR.aaData||bR[bQ]}return bQ!==""?am(bQ)(bR):bR
}function n(bT){var bU=bT.oClasses;var bS=bT.sTableId;
var bW=bT.oLanguage;var bV=bT.oPreviousSearch;var bR=bT.aanFeatures;
var b1='<input type="search" class="'+bU.sFilterInput+'"/>';
var b0=bW.sSearch;b0=b0.match(/_INPUT_/)?b0.replace("_INPUT_",b1):b0+b1;
var bQ=bE("<div/>",{id:!bR.f?bS+"_filter":null,"class":bU.sFilter}).append(bE("<label/>").append(b0));
var bZ=function(){var b3=bR.f;var b2=!this.value?"":this.value;
if(b2!=bV.sSearch){r(bT,{sSearch:b2,bRegex:bV.bRegex,bSmart:bV.bSmart,bCaseInsensitive:bV.bCaseInsensitive});
bT._iDisplayStart=0;a1(bT)}};var bY=bT.searchDelay!==null?bT.searchDelay:w(bT)==="ssp"?400:0;
var bX=bE("input",bQ).val(bV.sSearch).attr("placeholder",bW.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",bY?aj(bZ,bY):bZ).bind("keypress.DT",function(b2){if(b2.keyCode==13){return false
}}).attr("aria-controls",bS);bE(bT.nTable).on("search.dt.DT",function(b3,b2){if(bT===b2){try{if(bX[0]!==v.activeElement){bX.val(bV.sSearch)
}}catch(b4){}}});return bQ[0]}function r(bT,bX,bW){var bS=bT.oPreviousSearch;
var bV=bT.aoPreSearchCols;var bU=function(bY){bS.sSearch=bY.sSearch;
bS.bRegex=bY.bRegex;bS.bSmart=bY.bSmart;bS.bCaseInsensitive=bY.bCaseInsensitive
};var bR=function(bY){return bY.bEscapeRegex!==aH?!bY.bEscapeRegex:bY.bRegex
};s(bT);if(w(bT)!="ssp"){aw(bT,bX.sSearch,bW,bR(bX),bX.bSmart,bX.bCaseInsensitive);
bU(bX);for(var bQ=0;bQ<bV.length;bQ++){W(bT,bV[bQ].sSearch,bQ,bR(bV[bQ]),bV[bQ].bSmart,bV[bQ].bCaseInsensitive)
}ap(bT)}else{bU(bX)}bT.bFiltered=true;J(bT,null,"search",[bT])
}function ap(bT){var bS=L.ext.search;var bW=bT.aiDisplay;
var bY,bR;for(var bV=0,bX=bS.length;bV<bX;bV++){var bZ=[];
for(var bU=0,bQ=bW.length;bU<bQ;bU++){bR=bW[bU];bY=bT.aoData[bR];
if(bS[bV](bT,bY._aFilterData,bR,bY._aData,bU)){bZ.push(bR)
}}bW.length=0;bE.merge(bW,bZ)}}function W(bR,bQ,bV,bY,bZ,bT){if(bQ===""){return
}var bW;var bX=bR.aiDisplay;var bS=aU(bQ,bY,bZ,bT);
for(var bU=bX.length-1;bU>=0;bU--){bW=bR.aoData[bX[bU]]._aFilterData[bV];
if(!bS.test(bW)){bX.splice(bU,1)}}}function aw(bR,bZ,bQ,bY,b1,bU){var bT=aU(bZ,bY,b1,bU);
var bS=bR.oPreviousSearch.sSearch;var bW=bR.aiDisplayMaster;
var bX,b0,bV;if(L.ext.search.length!==0){bQ=true}b0=aB(bR);
if(bZ.length<=0){bR.aiDisplay=bW.slice()}else{if(b0||bQ||bS.length>bZ.length||bZ.indexOf(bS)!==0||bR.bSorted){bR.aiDisplay=bW.slice()
}bX=bR.aiDisplay;for(bV=bX.length-1;bV>=0;bV--){if(!bT.test(bR.aoData[bX[bV]]._sFilterRow)){bX.splice(bV,1)
}}}}function aU(bS,bT,bU,bQ){bS=bT?bS:j(bS);if(bU){var bR=bE.map(bS.match(/"[^"]+"|[^ ]+/g)||[""],function(bW){if(bW.charAt(0)==='"'){var bV=bW.match(/^"(.*)"$/);
bW=bV?bV[1]:bW}return bW.replace('"',"")});bS="^(?=.*?"+bR.join(")(?=.*?")+").*$"
}return new RegExp(bS,bQ?"i":"")}function j(bQ){return bQ.replace(aA,"\\$1")
}var b=bE("<div>")[0];var ao=b.textContent!==aH;function aB(bR){var bT=bR.aoColumns;
var bS;var bV,bU,bZ,bQ,bY,bW,b1;var b0=L.ext.type.search;
var bX=false;for(bV=0,bZ=bR.aoData.length;bV<bZ;bV++){b1=bR.aoData[bV];
if(!b1._aFilterData){bY=[];for(bU=0,bQ=bT.length;
bU<bQ;bU++){bS=bT[bU];if(bS.bSearchable){bW=bt(bR,bV,bU,"filter");
if(b0[bS.sType]){bW=b0[bS.sType](bW)}if(bW===null){bW=""
}if(typeof bW!=="string"&&bW.toString){bW=bW.toString()
}}else{bW=""}if(bW.indexOf&&bW.indexOf("&")!==-1){b.innerHTML=bW;
bW=ao?b.textContent:b.innerText}if(bW.replace){bW=bW.replace(/[\r\n]/g,"")
}bY.push(bW)}b1._aFilterData=bY;b1._sFilterRow=bY.join("  ");
bX=true}}return bX}function bx(bQ){return{search:bQ.sSearch,smart:bQ.bSmart,regex:bQ.bRegex,caseInsensitive:bQ.bCaseInsensitive}
}function aC(bQ){return{sSearch:bQ.search,bSmart:bQ.smart,bRegex:bQ.regex,bCaseInsensitive:bQ.caseInsensitive}
}function d(bR){var bS=bR.sTableId,bQ=bR.aanFeatures.i,bT=bE("<div/>",{"class":bR.oClasses.sInfo,id:!bQ?bS+"_info":null});
if(!bQ){bR.aoDrawCallback.push({fn:aq,sName:"information"});
bT.attr("role","status").attr("aria-live","polite");
bE(bR.nTable).attr("aria-describedby",bS+"_info")
}return bT[0]}function aq(bT){var bQ=bT.aanFeatures.i;
if(bQ.length===0){return}var bS=bT.oLanguage,bR=bT._iDisplayStart+1,bU=bT.fnDisplayEnd(),bX=bT.fnRecordsTotal(),bW=bT.fnRecordsDisplay(),bV=bW?bS.sInfo:bS.sInfoEmpty;
if(bW!==bX){bV+=" "+bS.sInfoFiltered}bV+=bS.sInfoPostFix;
bV=bo(bT,bV);var bY=bS.fnInfoCallback;if(bY!==null){bV=bY.call(bT.oInstance,bT,bR,bU,bX,bW,bV)
}bE(bQ).html(bV)}function bo(bT,bV){var bR=bT.fnFormatNumber,bW=bT._iDisplayStart+1,bQ=bT._iDisplayLength,bU=bT.fnRecordsDisplay(),bS=bQ===-1;
return bV.replace(/_START_/g,bR.call(bT,bW)).replace(/_END_/g,bR.call(bT,bT.fnDisplayEnd())).replace(/_MAX_/g,bR.call(bT,bT.fnRecordsTotal())).replace(/_TOTAL_/g,bR.call(bT,bU)).replace(/_PAGE_/g,bR.call(bT,bS?1:Math.ceil(bW/bQ))).replace(/_PAGES_/g,bR.call(bT,bS?1:Math.ceil(bU/bQ)))
}function e(bT){var bW,bS,bX=bT.iInitDisplayStart;
var bV=bT.aoColumns,bU;var bR=bT.oFeatures;var bQ=bT.bDeferLoading;
if(!bT.bInitialised){setTimeout(function(){e(bT)},200);
return}f(bT);aJ(bT);a5(bT,bT.aoHeader);a5(bT,bT.aoFooter);
t(bT,true);if(bR.bAutoWidth){bv(bT)}for(bW=0,bS=bV.length;
bW<bS;bW++){bU=bV[bW];if(bU.sWidth){bU.nTh.style.width=bJ(bU.sWidth)
}}J(bT,null,"preInit",[bT]);ag(bT);var bY=w(bT);if(bY!="ssp"||bQ){if(bY=="ajax"){at(bT,[],function(b0){var bZ=bs(bT,b0);
for(bW=0;bW<bZ.length;bW++){aM(bT,bZ[bW])}bT.iInitDisplayStart=bX;
ag(bT);t(bT,false);az(bT,b0)},bT)}else{t(bT,false);
az(bT)}}}function az(bR,bQ){bR._bInitComplete=true;
if(bQ||bR.oInit.aaData){aG(bR)}J(bR,null,"plugin-init",[bR,bQ]);
J(bR,"aoInitComplete","init",[bR,bQ])}function aR(bR,bS){var bQ=parseInt(bS,10);
bR._iDisplayLength=bQ;bk(bR);J(bR,null,"length",[bR,bQ])
}function aP(bV){var bW=bV.oClasses,bT=bV.sTableId,bS=bV.aLengthMenu,bQ=bE.isArray(bS[0]),bU=bQ?bS[0]:bS,bY=bQ?bS[1]:bS;
var bZ=bE("<select/>",{name:bT+"_length","aria-controls":bT,"class":bW.sLengthSelect});
for(var bX=0,b0=bU.length;bX<b0;bX++){bZ[0][bX]=new Option(bY[bX],bU[bX])
}var bR=bE("<div><label/></div>").addClass(bW.sLength);
if(!bV.aanFeatures.l){bR[0].id=bT+"_length"}bR.children().append(bV.oLanguage.sLengthMenu.replace("_MENU_",bZ[0].outerHTML));
bE("select",bR).val(bV._iDisplayLength).bind("change.DT",function(b1){aR(bV,bE(this).val());
a1(bV)});bE(bV.nTable).bind("length.dt.DT",function(b3,b2,b1){if(bV===b2){bE("select",bR).val(b1)
}});return bR[0]}function ax(bT){var bS=bT.sPaginationType,bV=L.ext.pager[bS],bR=typeof bV==="function",bW=function(bX){a1(bX)
},bU=bE("<div/>").addClass(bT.oClasses.sPaging+bS)[0],bQ=bT.aanFeatures;
if(!bR){bV.fnInit(bT,bU,bW)}if(!bQ.p){bU.id=bT.sTableId+"_paginate";
bT.aoDrawCallback.push({fn:function(b0){if(bR){var bX=b0._iDisplayStart,b2=b0._iDisplayLength,bY=b0.fnRecordsDisplay(),b5=b2===-1,b3=b5?0:Math.ceil(bX/b2),bZ=b5?1:Math.ceil(bY/b2),b4=bV(b3,bZ),b1,b6;
for(b1=0,b6=bQ.p.length;b1<b6;b1++){Q(b0,"pageButton")(b0,bQ.p[b1],b1,b4,b3,bZ)
}}else{bV.fnUpdate(b0,bW)}},sName:"pagination"})}return bU
}function aD(bS,bT,bW){var bV=bS._iDisplayStart,bQ=bS._iDisplayLength,bR=bS.fnRecordsDisplay();
if(bR===0||bQ===-1){bV=0}else{if(typeof bT==="number"){bV=bT*bQ;
if(bV>bR){bV=0}}else{if(bT=="first"){bV=0}else{if(bT=="previous"){bV=bQ>=0?bV-bQ:0;
if(bV<0){bV=0}}else{if(bT=="next"){if(bV+bQ<bR){bV+=bQ
}}else{if(bT=="last"){bV=Math.floor((bR-1)/bQ)*bQ
}else{aL(bS,0,"Unknown paging action: "+bT,5)}}}}}}var bU=bS._iDisplayStart!==bV;
bS._iDisplayStart=bV;if(bU){J(bS,null,"page",[bS]);
if(bW){a1(bS)}}return bU}function bz(bQ){return bE("<div/>",{id:!bQ.aanFeatures.r?bQ.sTableId+"_processing":null,"class":bQ.oClasses.sProcessing}).html(bQ.oLanguage.sProcessing).insertBefore(bQ.nTable)[0]
}function t(bR,bQ){if(bR.oFeatures.bProcessing){bE(bR.aanFeatures.r).css("display",bQ?"block":"none")
}J(bR,null,"processing",[bR,bQ])}function by(b4){var b3=bE(b4.nTable);
b3.attr("role","grid");var bQ=b4.oScroll;if(bQ.sX===""&&bQ.sY===""){return b4.nTable
}var bY=bQ.sX;var bX=bQ.sY;var b5=b4.oClasses;var b2=b3.children("caption");
var bR=b2.length?b2[0]._captionSide:null;var bU=bE(b3[0].cloneNode(false));
var b7=bE(b3[0].cloneNode(false));var bW=b3.children("tfoot");
var bZ="<div/>";var bV=function(b8){return !b8?null:bJ(b8)
};if(!bW.length){bW=null}var b1=bE(bZ,{"class":b5.sScrollWrapper}).append(bE(bZ,{"class":b5.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:bY?bV(bY):"100%"}).append(bE(bZ,{"class":b5.sScrollHeadInner}).css({"box-sizing":"content-box",width:bQ.sXInner||"100%"}).append(bU.removeAttr("id").css("margin-left",0).append(bR==="top"?b2:null).append(b3.children("thead"))))).append(bE(bZ,{"class":b5.sScrollBody}).css({position:"relative",overflow:"auto",width:bV(bY)}).append(b3));
if(bW){b1.append(bE(bZ,{"class":b5.sScrollFoot}).css({overflow:"hidden",border:0,width:bY?bV(bY):"100%"}).append(bE(bZ,{"class":b5.sScrollFootInner}).append(b7.removeAttr("id").css("margin-left",0).append(bR==="bottom"?b2:null).append(b3.children("tfoot")))))
}var bS=b1.children();var b0=bS[0];var b6=bS[1];var bT=bW?bS[2]:null;
if(bY){bE(b6).on("scroll.DT",function(b8){var b9=this.scrollLeft;
b0.scrollLeft=b9;if(bW){bT.scrollLeft=b9}})}bE(b6).css(bX&&bQ.bCollapse?"max-height":"height",bX);
b4.nScrollHead=b0;b4.nScrollBody=b6;b4.nScrollFoot=bT;
b4.aoDrawCallback.push({fn:i,sName:"scrolling"});
return b1[0]}function i(cr){var cn=cr.oScroll,bV=cn.sX,ch=cn.sXInner,bS=cn.sY,cf=cn.iBarWidth,ck=bE(cr.nScrollHead),b8=ck[0].style,bU=ck.children("div"),bR=bU[0].style,cu=bU.children("table"),b1=cr.nScrollBody,cd=bE(b1),b7=b1.style,co=bE(cr.nScrollFoot),cc=co.children("div"),b9=cc.children("table"),bZ=bE(cr.nTHead),cb=bE(cr.nTable),ce=cb[0],bX=ce.style,b6=cr.nTFoot?bE(cr.nTFoot):null,bY=cr.oBrowser,b3=bY.bScrollOversize,ca=ar(cr.aoColumns,"nTh"),bT,bW,cq,cs,b4,b2,cj=[],cl=[],cg=[],cv=[],ct,b0,cw,b5=function(cx){var cy=cx.style;
cy.paddingTop="0";cy.paddingBottom="0";cy.borderTopWidth="0";
cy.borderBottomWidth="0";cy.height=0};var cm=b1.scrollHeight>b1.clientHeight;
if(cr.scrollBarVis!==cm&&cr.scrollBarVis!==aH){cr.scrollBarVis=cm;
aG(cr);return}else{cr.scrollBarVis=cm}cb.children("thead, tfoot").remove();
if(b6){b2=b6.clone().prependTo(cb);bW=b6.find("tr");
cs=b2.find("tr")}b4=bZ.clone().prependTo(cb);bT=bZ.find("tr");
cq=b4.find("tr");b4.find("th, td").removeAttr("tabindex");
if(!bV){b7.width="100%";ck[0].style.width="100%"}bE.each(bg(cr,b4),function(cx,cy){ct=o(cr,cx);
cy.style.width=cr.aoColumns[ct].sWidth});if(b6){a8(function(cx){cx.style.width=""
},cs)}cw=cb.outerWidth();if(bV===""){bX.width="100%";
if(b3&&(cb.find("tbody").height()>b1.offsetHeight||cd.css("overflow-y")=="scroll")){bX.width=bJ(cb.outerWidth()-cf)
}cw=cb.outerWidth()}else{if(ch!==""){bX.width=bJ(ch);
cw=cb.outerWidth()}}a8(b5,cq);a8(function(cx){cg.push(cx.innerHTML);
cj.push(bJ(bE(cx).css("width")))},cq);a8(function(cy,cx){if(bE.inArray(cy,ca)!==-1){cy.style.width=cj[cx]
}},bT);bE(cq).height(0);if(b6){a8(b5,cs);a8(function(cx){cv.push(cx.innerHTML);
cl.push(bJ(bE(cx).css("width")))},cs);a8(function(cy,cx){cy.style.width=cl[cx]
},bW);bE(cs).height(0)}a8(function(cy,cx){cy.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+cg[cx]+"</div>";
cy.style.width=cj[cx]},cq);if(b6){a8(function(cy,cx){cy.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+cv[cx]+"</div>";
cy.style.width=cl[cx]},cs)}if(cb.outerWidth()<cw){b0=((b1.scrollHeight>b1.offsetHeight||cd.css("overflow-y")=="scroll"))?cw+cf:cw;
if(b3&&(b1.scrollHeight>b1.offsetHeight||cd.css("overflow-y")=="scroll")){bX.width=bJ(b0-cf)
}if(bV===""||ch!==""){aL(cr,1,"Possible column misalignment",6)
}}else{b0="100%"}b7.width=bJ(b0);b8.width=bJ(b0);
if(b6){cr.nScrollFoot.style.width=bJ(b0)}if(!bS){if(b3){b7.height=bJ(ce.offsetHeight+cf)
}}var bQ=cb.outerWidth();cu[0].style.width=bJ(bQ);
bR.width=bJ(bQ);var ci=cb.height()>b1.clientHeight||cd.css("overflow-y")=="scroll";
var cp="padding"+(bY.bScrollbarLeft?"Left":"Right");
bR[cp]=ci?cf+"px":"0px";if(b6){b9[0].style.width=bJ(bQ);
cc[0].style.width=bJ(bQ);cc[0].style[cp]=ci?cf+"px":"0px"
}cb.children("colgroup").insertBefore(cb.children("thead"));
cd.scroll();if((cr.bSorted||cr.bFiltered)&&!cr._drawHold){b1.scrollTop=0
}}function a8(bV,bS,bR){var bT=0,bU=0,bQ=bS.length;
var bX,bW;while(bU<bQ){bX=bS[bU].firstChild;bW=bR?bR[bU].firstChild:null;
while(bX){if(bX.nodeType===1){if(bR){bV(bX,bW,bT)
}else{bV(bX,bT)}bT++}bX=bX.nextSibling;bW=bR?bW.nextSibling:null
}bU++}}var aZ=/<.*?>/g;function bv(bY){var cb=bY.nTable,bU=bY.aoColumns,bS=bY.oScroll,b6=bS.sY,b8=bS.sX,bX=bS.sXInner,cg=bU.length,cd=m(bY,"bVisible"),cc=bE("th",bY.nTHead),b3=cb.getAttribute("width"),b0=cb.parentNode,ce=false,ca,bV,ci,b5,bQ,ch=bY.oBrowser,b9=ch.bScrollOversize;
var b2=cb.style.width;if(b2&&b2.indexOf("%")!==-1){b3=b2
}for(ca=0;ca<cd.length;ca++){bV=bU[cd[ca]];if(bV.sWidth!==null){bV.sWidth=ae(bV.sWidthOrig,b0);
ce=true}}if(b9||!ce&&!b8&&!b6&&cg==aO(bY)&&cg==cc.length){for(ca=0;
ca<cg;ca++){var b1=o(bY,ca);if(b1!==null){bU[b1].sWidth=bJ(cc.eq(ca).width())
}}}else{var bZ=bE(cb).clone().css("visibility","hidden").removeAttr("id");
bZ.find("tbody tr").remove();var bR=bE("<tr/>").appendTo(bZ.find("tbody"));
bZ.find("thead, tfoot").remove();bZ.append(bE(bY.nTHead).clone()).append(bE(bY.nTFoot).clone());
bZ.find("tfoot th, tfoot td").css("width","");cc=bg(bY,bZ.find("thead")[0]);
for(ca=0;ca<cd.length;ca++){bV=bU[cd[ca]];cc[ca].style.width=bV.sWidthOrig!==null&&bV.sWidthOrig!==""?bJ(bV.sWidthOrig):"";
if(bV.sWidthOrig&&b8){bE(cc[ca]).append(bE("<div/>").css({width:bV.sWidthOrig,margin:0,padding:0,border:0,height:1}))
}}if(bY.aoData.length){for(ca=0;ca<cd.length;ca++){ci=cd[ca];
bV=bU[ci];bE(aI(bY,ci)).clone(false).append(bV.sContentPadding).appendTo(bR)
}}bE("[name]",bZ).removeAttr("name");var b4=bE("<div/>").css(b8||b6?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(bZ).appendTo(b0);
if(b8&&bX){bZ.width(bX)}else{if(b8){bZ.css("width","auto");
bZ.removeAttr("width");if(bZ.width()<b0.clientWidth&&b3){bZ.width(b0.clientWidth)
}}else{if(b6){bZ.width(b0.clientWidth)}else{if(b3){bZ.width(b3)
}}}}var cj=0;for(ca=0;ca<cd.length;ca++){var bT=bE(cc[ca]);
var b7=bT.outerWidth()-bT.width();var bW=ch.bBounding?Math.ceil(cc[ca].getBoundingClientRect().width):bT.outerWidth();
cj+=bW;bU[cd[ca]].sWidth=bJ(bW-b7)}cb.style.width=bJ(cj);
b4.remove()}if(b3){cb.style.width=bJ(b3)}if((b3||b8)&&!bY._reszEvt){var cf=function(){bE(a6).bind("resize.DT-"+bY.sInstance,aj(function(){aG(bY)
}))};if(b9){setTimeout(cf,1000)}else{cf()}bY._reszEvt=true
}}function aj(bQ,bT){var bS=bT!==aH?bT:200,bR,bU;
return function(){var bX=this,bW=+new Date(),bV=arguments;
if(bR&&bW<bR+bS){clearTimeout(bU);bU=setTimeout(function(){bR=aH;
bQ.apply(bX,bV)},bS)}else{bR=bW;bQ.apply(bX,bV)}}
}function ae(bR,bQ){if(!bR){return 0}var bT=bE("<div/>").css("width",bJ(bR)).appendTo(bQ||v.body);
var bS=bT[0].offsetWidth;bT.remove();return bS}function aI(bR,bT){var bQ=Z(bR,bT);
if(bQ<0){return null}var bS=bR.aoData[bQ];return !bS.nTr?bE("<td/>").html(bt(bR,bQ,bT,"display"))[0]:bS.anCells[bT]
}function Z(bV,bW){var bU,bQ=-1,bS=-1;for(var bT=0,bR=bV.aoData.length;
bT<bR;bT++){bU=bt(bV,bT,bW,"display")+"";bU=bU.replace(aZ,"");
bU=bU.replace(/&nbsp;/g," ");if(bU.length>bQ){bQ=bU.length;
bS=bT}}return bS}function bJ(bQ){if(bQ===null){return"0px"
}if(typeof bQ=="number"){return bQ<0?"0px":bQ+"px"
}return bQ.match(/\d$/)?bQ+"px":bQ}function aF(bT){var bY,bS,bV,bZ,bW=[],b1=[],b3=bT.aoColumns,bX,b2,bQ,b0,bU=bT.aaSortingFixed,b5=bE.isPlainObject(bU),bR=[],b4=function(b6){if(b6.length&&!bE.isArray(b6[0])){bR.push(b6)
}else{bE.merge(bR,b6)}};if(bE.isArray(bU)){b4(bU)
}if(b5&&bU.pre){b4(bU.pre)}b4(bT.aaSorting);if(b5&&bU.post){b4(bU.post)
}for(bY=0;bY<bR.length;bY++){b0=bR[bY][0];bX=b3[b0].aDataSort;
for(bV=0,bZ=bX.length;bV<bZ;bV++){b2=bX[bV];bQ=b3[b2].sType||"string";
if(bR[bY]._idx===aH){bR[bY]._idx=bE.inArray(bR[bY][1],b3[b2].asSorting)
}bW.push({src:b0,col:b2,dir:bR[bY][1],index:bR[bY]._idx,type:bQ,formatter:L.ext.type.order[bQ+"-pre"]})
}}return bW}function u(bV){var b7,bT,b4,b6,b8,b3,bQ,b0,bW,cc=[],bZ=L.ext.type.order,b1=bV.aoData,b5=bV.aoColumns,bR,cb,bU,bY,b2,b9=0,bX,bS=bV.aiDisplayMaster,ca;
s(bV);ca=aF(bV);for(b7=0,bT=ca.length;b7<bT;b7++){bX=ca[b7];
if(bX.formatter){b9++}E(bV,bX.col)}if(w(bV)!="ssp"&&ca.length!==0){for(b7=0,b4=bS.length;
b7<b4;b7++){cc[bS[b7]]=b7}if(b9===ca.length){bS.sort(function(cl,ck){var cm,cj,cd,ci,ce,cf=ca.length,ch=b1[cl]._aSortData,cg=b1[ck]._aSortData;
for(cd=0;cd<cf;cd++){ce=ca[cd];cm=ch[ce.col];cj=cg[ce.col];
ci=cm<cj?-1:cm>cj?1:0;if(ci!==0){return ce.dir==="asc"?ci:-ci
}}cm=cc[cl];cj=cc[ck];return cm<cj?-1:cm>cj?1:0})
}else{bS.sort(function(cn,cm){var co,cl,ce,cd,cj,cf,ck,cg=ca.length,ci=b1[cn]._aSortData,ch=b1[cm]._aSortData;
for(ce=0;ce<cg;ce++){cf=ca[ce];co=ci[cf.col];cl=ch[cf.col];
ck=bZ[cf.type+"-"+cf.dir]||bZ["string-"+cf.dir];cj=ck(co,cl);
if(cj!==0){return cj}}co=cc[cn];cl=cc[cm];return co<cl?-1:co>cl?1:0
})}}bV.bSorted=true}function bc(bU){var b0;var bZ;
var bV=bU.aoColumns;var bW=aF(bU);var bX=bU.oLanguage.oAria;
for(var bY=0,bS=bV.length;bY<bS;bY++){var bR=bV[bY];
var bT=bR.asSorting;var b1=bR.sTitle.replace(/<.*?>/g,"");
var bQ=bR.nTh;bQ.removeAttribute("aria-sort");if(bR.bSortable){if(bW.length>0&&bW[0].col==bY){bQ.setAttribute("aria-sort",bW[0].dir=="asc"?"ascending":"descending");
bZ=bT[bW[0].index+1]||bT[0]}else{bZ=bT[0]}b0=b1+(bZ==="asc"?bX.sSortAscending:bX.sSortDescending)
}else{b0=b1}bQ.setAttribute("aria-label",b0)}}function bi(bT,bV,bQ,bZ){var bR=bT.aoColumns[bV];
var bX=bT.aaSorting;var bU=bR.asSorting;var bY;var bW=function(b1,b2){var b0=b1._idx;
if(b0===aH){b0=bE.inArray(b1[1],bU)}return b0+1<bU.length?b0+1:b2?null:0
};if(typeof bX[0]==="number"){bX=bT.aaSorting=[bX]
}if(bQ&&bT.oFeatures.bSortMulti){var bS=bE.inArray(bV,ar(bX,"0"));
if(bS!==-1){bY=bW(bX[bS],true);if(bY===null&&bX.length===1){bY=0
}if(bY===null){bX.splice(bS,1)}else{bX[bS][1]=bU[bY];
bX[bS]._idx=bY}}else{bX.push([bV,bU[0],0]);bX[bX.length-1]._idx=0
}}else{if(bX.length&&bX[0][0]==bV){bY=bW(bX[0]);bX.length=1;
bX[0][1]=bU[bY];bX[0]._idx=bY}else{bX.length=0;bX.push([bV,bU[0]]);
bX[0]._idx=0}}ag(bT);if(typeof bZ=="function"){bZ(bT)
}}function A(bS,bR,bU,bT){var bQ=bS.aoColumns[bU];
bb(bR,{},function(bV){if(bQ.bSortable===false){return
}if(bS.oFeatures.bProcessing){t(bS,true);setTimeout(function(){bi(bS,bU,bV.shiftKey,bT);
if(w(bS)!=="ssp"){t(bS,false)}},0)}else{bi(bS,bU,bV.shiftKey,bT)
}})}function ac(bV){var bW=bV.aLastSort;var bR=bV.oClasses.sSortColumn;
var bT=aF(bV);var bU=bV.oFeatures;var bS,bQ,bX;if(bU.bSort&&bU.bSortClasses){for(bS=0,bQ=bW.length;
bS<bQ;bS++){bX=bW[bS].src;bE(ar(bV.aoData,"anCells",bX)).removeClass(bR+(bS<2?bS+1:3))
}for(bS=0,bQ=bT.length;bS<bQ;bS++){bX=bT[bS].src;
bE(ar(bV.aoData,"anCells",bX)).addClass(bR+(bS<2?bS+1:3))
}}bV.aLastSort=bT}function E(bQ,bV){var bR=bQ.aoColumns[bV];
var bZ=L.ext.order[bR.sSortDataType];var bX;if(bZ){bX=bZ.call(bQ.oInstance,bQ,bV,bI(bQ,bV))
}var bY,bT;var bU=L.ext.type.order[bR.sType+"-pre"];
for(var bS=0,bW=bQ.aoData.length;bS<bW;bS++){bY=bQ.aoData[bS];
if(!bY._aSortData){bY._aSortData=[]}if(!bY._aSortData[bV]||bZ){bT=bZ?bX[bS]:bt(bQ,bS,bV,"sort");
bY._aSortData[bV]=bU?bU(bT):bT}}}function bn(bQ){if(!bQ.oFeatures.bStateSave||bQ.bDestroying){return
}var bR={time:+new Date(),start:bQ._iDisplayStart,length:bQ._iDisplayLength,order:bE.extend(true,[],bQ.aaSorting),search:bx(bQ.oPreviousSearch),columns:bE.map(bQ.aoColumns,function(bS,bT){return{visible:bS.bVisible,search:bx(bQ.aoPreSearchCols[bT])}
})};J(bQ,"aoStateSaveParams","stateSaveParams",[bQ,bR]);
bQ.oSavedState=bR;bQ.fnStateSaveCallback.call(bQ.oInstance,bQ,bR)
}function bN(bS,bX){var bV,bY;var bT=bS.aoColumns;
if(!bS.oFeatures.bStateSave){return}var bQ=bS.fnStateLoadCallback.call(bS.oInstance,bS);
if(!bQ||!bQ.time){return}var bW=J(bS,"aoStateLoadParams","stateLoadParams",[bS,bQ]);
if(bE.inArray(false,bW)!==-1){return}var bU=bS.iStateDuration;
if(bU>0&&bQ.time<+new Date()-(bU*1000)){return}if(bT.length!==bQ.columns.length){return
}bS.oLoadedState=bE.extend(true,{},bQ);if(bQ.start!==aH){bS._iDisplayStart=bQ.start;
bS.iInitDisplayStart=bQ.start}if(bQ.length!==aH){bS._iDisplayLength=bQ.length
}if(bQ.order!==aH){bS.aaSorting=[];bE.each(bQ.order,function(b0,bZ){bS.aaSorting.push(bZ[0]>=bT.length?[0,bZ[1]]:bZ)
})}if(bQ.search!==aH){bE.extend(bS.oPreviousSearch,aC(bQ.search))
}for(bV=0,bY=bQ.columns.length;bV<bY;bV++){var bR=bQ.columns[bV];
if(bR.visible!==aH){bT[bV].bVisible=bR.visible}if(bR.search!==aH){bE.extend(bS.aoPreSearchCols[bV],aC(bR.search))
}}J(bS,"aoStateLoaded","stateLoaded",[bS,bQ])}function al(bS){var bR=L.settings;
var bQ=bE.inArray(bS,ar(bR,"nTable"));return bQ!==-1?bR[bQ]:null
}function aL(bT,bV,bU,bQ){bU="DataTables warning: "+(bT?"table id="+bT.sTableId+" - ":"")+bU;
if(bQ){bU+=". For more information about this error, please see http://datatables.net/tn/"+bQ
}if(!bV){var bS=L.ext;var bR=bS.sErrMode||bS.errMode;
if(bT){J(bT,null,"error",[bT,bQ,bU])}if(bR=="alert"){alert(bU)
}else{if(bR=="throw"){throw new Error(bU)}else{if(typeof bR=="function"){bR(bT,bQ,bU)
}}}}else{if(a6.console&&console.log){console.log(bU)
}}}function P(bR,bT,bQ,bS){if(bE.isArray(bQ)){bE.each(bQ,function(bU,bV){if(bE.isArray(bV)){P(bR,bT,bV[0],bV[1])
}else{P(bR,bT,bV)}});return}if(bS===aH){bS=bQ}if(bT[bQ]!==aH){bR[bS]=bT[bQ]
}}function aV(bQ,bS,bR){var bT;for(var bU in bS){if(bS.hasOwnProperty(bU)){bT=bS[bU];
if(bE.isPlainObject(bT)){if(!bE.isPlainObject(bQ[bU])){bQ[bU]={}
}bE.extend(true,bQ[bU],bT)}else{if(bR&&bU!=="data"&&bU!=="aaData"&&bE.isArray(bT)){bQ[bU]=bT.slice()
}else{bQ[bU]=bT}}}}return bQ}function bb(bS,bR,bQ){bE(bS).bind("click.DT",bR,function(bT){bS.blur();
bQ(bT)}).bind("keypress.DT",bR,function(bT){if(bT.which===13){bT.preventDefault();
bQ(bT)}}).bind("selectstart.DT",function(){return false
})}function bM(bT,bR,bQ,bS){if(bQ){bT[bR].push({fn:bQ,sName:bS})
}}function J(bT,bU,bQ,bS){var bR=[];if(bU){bR=bE.map(bT[bU].slice().reverse(),function(bX,bW){return bX.fn.apply(bT.oInstance,bS)
})}if(bQ!==null){var bV=bE.Event(bQ+".dt");bE(bT.nTable).trigger(bV,bS);
bR.push(bV.result)}return bR}function bk(bS){var bT=bS._iDisplayStart,bR=bS.fnDisplayEnd(),bQ=bS._iDisplayLength;
if(bT>=bR){bT=bR-bQ}bT-=(bT%bQ);if(bQ===-1||bT<0){bT=0
}bS._iDisplayStart=bT}function Q(bR,bQ){var bT=bR.renderer;
var bS=L.ext.renderer[bQ];if(bE.isPlainObject(bT)&&bT[bQ]){return bS[bT[bQ]]||bS._
}else{if(typeof bT==="string"){return bS[bT]||bS._
}}return bS._}function w(bQ){if(bQ.oFeatures.bServerSide){return"ssp"
}else{if(bQ.ajax||bQ.sAjaxSource){return"ajax"}}return"dom"
}L=function(bS){this.$=function(bW,bV){return this.api(true).$(bW,bV)
};this._=function(bW,bV){return this.api(true).rows(bW,bV).data()
};this.api=function(bV){return bV?new H(al(this[G.iApiIndex])):new H(this)
};this.fnAddData=function(bX,bY){var bV=this.api(true);
var bW=bE.isArray(bX)&&(bE.isArray(bX[0])||bE.isPlainObject(bX[0]))?bV.rows.add(bX):bV.row.add(bX);
if(bY===aH||bY){bV.draw()}return bW.flatten().toArray()
};this.fnAdjustColumnSizing=function(bY){var bX=this.api(true).columns.adjust();
var bW=bX.settings()[0];var bV=bW.oScroll;if(bY===aH||bY){bX.draw(false)
}else{if(bV.sX!==""||bV.sY!==""){i(bW)}}};this.fnClearTable=function(bW){var bV=this.api(true).clear();
if(bW===aH||bW){bV.draw()}};this.fnClose=function(bV){this.api(true).row(bV).child.hide()
};this.fnDeleteRow=function(bZ,b1,b0){var bW=this.api(true);
var bY=bW.rows(bZ);var bV=bY.settings()[0];var bX=bV.aoData[bY[0][0]];
bY.remove();if(b1){b1.call(this,bV,bX)}if(b0===aH||b0){bW.draw()
}return bX};this.fnDestroy=function(bV){this.api(true).destroy(bV)
};this.fnDraw=function(bV){this.api(true).draw(bV)
};this.fnFilter=function(bZ,bW,bX,b1,b0,bV){var bY=this.api(true);
if(bW===null||bW===aH){bY.search(bZ,bX,b1,bV)}else{bY.column(bW).search(bZ,bX,b1,bV)
}bY.draw()};this.fnGetData=function(bY,bV){var bX=this.api(true);
if(bY!==aH){var bW=bY.nodeName?bY.nodeName.toLowerCase():"";
return bV!==aH||bW=="td"||bW=="th"?bX.cell(bY,bV).data():bX.row(bY).data()||null
}return bX.data().toArray()};this.fnGetNodes=function(bW){var bV=this.api(true);
return bW!==aH?bV.row(bW).node():bV.rows().nodes().flatten().toArray()
};this.fnGetPosition=function(bX){var bW=this.api(true);
var bY=bX.nodeName.toUpperCase();if(bY=="TR"){return bW.row(bX).index()
}else{if(bY=="TD"||bY=="TH"){var bV=bW.cell(bX).index();
return[bV.row,bV.columnVisible,bV.column]}}return null
};this.fnIsOpen=function(bV){return this.api(true).row(bV).child.isShown()
};this.fnOpen=function(bW,bV,bX){return this.api(true).row(bW).child(bV,bX).show().child()[0]
};this.fnPageChange=function(bV,bX){var bW=this.api(true).page(bV);
if(bX===aH||bX){bW.draw(false)}};this.fnSetColumnVis=function(bW,bV,bY){var bX=this.api(true).column(bW).visible(bV);
if(bY===aH||bY){bX.columns.adjust().draw()}};this.fnSettings=function(){return al(this[G.iApiIndex])
};this.fnSort=function(bV){this.api(true).order(bV).draw()
};this.fnSortListener=function(bW,bV,bX){this.api(true).order.listener(bW,bV,bX)
};this.fnUpdate=function(bZ,bY,bV,b0,bX){var bW=this.api(true);
if(bV===aH||bV===null){bW.row(bY).data(bZ)}else{bW.cell(bY,bV).data(bZ)
}if(bX===aH||bX){bW.columns.adjust()}if(b0===aH||b0){bW.draw()
}return 0};this.fnVersionCheck=G.fnVersionCheck;var bT=this;
var bR=bS===aH;var bQ=this.length;if(bR){bS={}}this.oApi=this.internal=G.internal;
for(var bU in L.ext.internal){if(bU){this[bU]=af(bU)
}}this.each(function(){var cf={};var cb=bQ>1?aV(cf,bS,true):bS;
var cl=0,cj,ck,co,ci,bV;var b6=this.getAttribute("id");
var b4=false;var b9=L.defaults;var b5=bE(this);if(this.nodeName.toLowerCase()!="table"){aL(null,0,"Non-table node initialisation ("+this.nodeName+")",2);
return}a2(b9);V(b9.column);Y(b9,b9,true);Y(b9.column,b9.column,true);
Y(b9,bE.extend(cb,b5.data()));var b1=L.settings;for(cl=0,cj=b1.length;
cl<cj;cl++){var cc=b1[cl];if(cc.nTable==this||cc.nTHead.parentNode==this||(cc.nTFoot&&cc.nTFoot.parentNode==this)){var ch=cb.bRetrieve!==aH?cb.bRetrieve:b9.bRetrieve;
var b8=cb.bDestroy!==aH?cb.bDestroy:b9.bDestroy;if(bR||ch){return cc.oInstance
}else{if(b8){cc.oInstance.fnDestroy();break}else{aL(cc,0,"Cannot reinitialise DataTable",3);
return}}}if(cc.sTableId==this.id){b1.splice(cl,1);
break}}if(b6===null||b6===""){b6="DataTables_Table_"+(L.ext._unique++);
this.id=b6}var b2=bE.extend(true,{},L.models.oSettings,{sDestroyWidth:b5[0].style.width,sInstance:b6,sTableId:b6});
b2.nTable=this;b2.oApi=bT.internal;b2.oInit=cb;b1.push(b2);
b2.oInstance=(bT.length===1)?bT:b5.dataTable();a2(cb);
if(cb.oLanguage){aQ(cb.oLanguage)}if(cb.aLengthMenu&&!cb.iDisplayLength){cb.iDisplayLength=bE.isArray(cb.aLengthMenu[0])?cb.aLengthMenu[0][0]:cb.aLengthMenu[0]
}cb=aV(bE.extend(true,{},b9),cb);P(b2.oFeatures,cb,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]);
P(b2,cb,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);
P(b2.oScroll,cb,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);
P(b2.oLanguage,cb,"fnInfoCallback");bM(b2,"aoDrawCallback",cb.fnDrawCallback,"user");
bM(b2,"aoServerParams",cb.fnServerParams,"user");
bM(b2,"aoStateSaveParams",cb.fnStateSaveParams,"user");
bM(b2,"aoStateLoadParams",cb.fnStateLoadParams,"user");
bM(b2,"aoStateLoaded",cb.fnStateLoaded,"user");bM(b2,"aoRowCallback",cb.fnRowCallback,"user");
bM(b2,"aoRowCreatedCallback",cb.fnCreatedRow,"user");
bM(b2,"aoHeaderCallback",cb.fnHeaderCallback,"user");
bM(b2,"aoFooterCallback",cb.fnFooterCallback,"user");
bM(b2,"aoInitComplete",cb.fnInitComplete,"user");
bM(b2,"aoPreDrawCallback",cb.fnPreDrawCallback,"user");
b2.rowIdFn=am(cb.rowId);bd(b2);var b7=b2.oClasses;
if(cb.bJQueryUI){bE.extend(b7,L.ext.oJUIClasses,cb.oClasses);
if(cb.sDom===b9.sDom&&b9.sDom==="lfrtip"){b2.sDom='<"H"lfr>t<"F"ip>'
}if(!b2.renderer){b2.renderer="jqueryui"}else{if(bE.isPlainObject(b2.renderer)&&!b2.renderer.header){b2.renderer.header="jqueryui"
}}}else{bE.extend(b7,L.ext.classes,cb.oClasses)}b5.addClass(b7.sTable);
if(b2.iInitDisplayStart===aH){b2.iInitDisplayStart=cb.iDisplayStart;
b2._iDisplayStart=cb.iDisplayStart}if(cb.iDeferLoading!==null){b2.bDeferLoading=true;
var cp=bE.isArray(cb.iDeferLoading);b2._iRecordsDisplay=cp?cb.iDeferLoading[0]:cb.iDeferLoading;
b2._iRecordsTotal=cp?cb.iDeferLoading[1]:cb.iDeferLoading
}var ce=b2.oLanguage;bE.extend(true,ce,cb.oLanguage);
if(ce.sUrl!==""){bE.ajax({dataType:"json",url:ce.sUrl,success:function(cr){aQ(cr);
Y(b9.oLanguage,cr);bE.extend(true,ce,cr);e(b2)},error:function(){e(b2)
}});b4=true}if(cb.asStripeClasses===null){b2.asStripeClasses=[b7.sStripeOdd,b7.sStripeEven]
}var cm=b2.asStripeClasses;var b0=b5.children("tbody").find("tr").eq(0);
if(bE.inArray(true,bE.map(cm,function(cs,cr){return b0.hasClass(cs)
}))!==-1){bE("tbody tr",this).removeClass(cm.join(" "));
b2.asDestroyStripes=cm.slice()}var cg=[];var bZ;var cd=this.getElementsByTagName("thead");
if(cd.length!==0){au(b2.aoHeader,cd[0]);cg=bg(b2)
}if(cb.aoColumns===null){bZ=[];for(cl=0,cj=cg.length;
cl<cj;cl++){bZ.push(null)}}else{bZ=cb.aoColumns}for(cl=0,cj=bZ.length;
cl<cj;cl++){M(b2,cg?cg[cl]:null)}h(b2,cb.aoColumnDefs,bZ,function(cs,cr){a0(b2,cs,cr)
});if(b0.length){var cq=function(cr,cs){return cr.getAttribute("data-"+cs)!==null?cs:null
};bE(b0[0]).children("th, td").each(function(cu,cr){var cs=b2.aoColumns[cu];
if(cs.mData===cu){var ct=cq(cr,"sort")||cq(cr,"order");
var cv=cq(cr,"filter")||cq(cr,"search");if(ct!==null||cv!==null){cs.mData={_:cu+".display",sort:ct!==null?cu+".@data-"+ct:aH,type:ct!==null?cu+".@data-"+ct:aH,filter:cv!==null?cu+".@data-"+cv:aH};
a0(b2,cu)}}})}var b3=b2.oFeatures;if(cb.bStateSave){b3.bStateSave=true;
bN(b2,cb);bM(b2,"aoDrawCallback",bn,"state_save")
}if(cb.aaSorting===aH){var bY=b2.aaSorting;for(cl=0,cj=bY.length;
cl<cj;cl++){bY[cl][1]=b2.aoColumns[cl].asSorting[0]
}}ac(b2);if(b3.bSort){bM(b2,"aoDrawCallback",function(){if(b2.bSorted){var cr=aF(b2);
var cs={};bE.each(cr,function(ct,cu){cs[cu.src]=cu.dir
});J(b2,null,"order",[b2,cr,cs]);bc(b2)}})}bM(b2,"aoDrawCallback",function(){if(b2.bSorted||w(b2)==="ssp"||b3.bDeferRender){ac(b2)
}},"sc");var bX=b5.children("caption").each(function(){this._captionSide=b5.css("caption-side")
});var cn=b5.children("thead");if(cn.length===0){cn=bE("<thead/>").appendTo(this)
}b2.nTHead=cn[0];var bW=b5.children("tbody");if(bW.length===0){bW=bE("<tbody/>").appendTo(this)
}b2.nTBody=bW[0];var ca=b5.children("tfoot");if(ca.length===0&&bX.length>0&&(b2.oScroll.sX!==""||b2.oScroll.sY!=="")){ca=bE("<tfoot/>").appendTo(this)
}if(ca.length===0||ca.children().length===0){b5.addClass(b7.sNoFooter)
}else{if(ca.length>0){b2.nTFoot=ca[0];au(b2.aoFooter,b2.nTFoot)
}}if(cb.aaData){for(cl=0;cl<cb.aaData.length;cl++){aM(b2,cb.aaData[cl])
}}else{if(b2.bDeferLoading||w(b2)=="dom"){bP(b2,bE(b2.nTBody).children("tr"))
}}b2.aiDisplay=b2.aiDisplayMaster.slice();b2.bInitialised=true;
if(b4===false){e(b2)}});bT=null;return this};var S=[];
var l=Array.prototype;var bO=function(bS){var bQ,bU;
var bT=L.settings;var bR=bE.map(bT,function(bW,bV){return bW.nTable
});if(!bS){return[]}else{if(bS.nTable&&bS.oApi){return[bS]
}else{if(bS.nodeName&&bS.nodeName.toLowerCase()==="table"){bQ=bE.inArray(bS,bR);
return bQ!==-1?[bT[bQ]]:null}else{if(bS&&typeof bS.settings==="function"){return bS.settings().toArray()
}else{if(typeof bS==="string"){bU=bE(bS)}else{if(bS instanceof bE){bU=bS
}}}}}}if(bU){return bU.map(function(bV){bQ=bE.inArray(this,bR);
return bQ!==-1?bT[bQ]:null}).toArray()}};H=function(bS,bU){if(!(this instanceof H)){return new H(bS,bU)
}var bT=[];var bV=function(bX){var bW=bO(bX);if(bW){bT=bT.concat(bW)
}};if(bE.isArray(bS)){for(var bR=0,bQ=bS.length;bR<bQ;
bR++){bV(bS[bR])}}else{bV(bS)}this.context=aE(bT);
if(bU){bE.merge(this,bU)}this.selector={rows:null,cols:null,opts:null};
H.extend(this,this,S)};L.Api=H;bE.extend(H.prototype,{any:function(){return this.count()!==0
},concat:l.concat,context:[],count:function(){return this.flatten().length
},each:function(bS){for(var bR=0,bQ=this.length;bR<bQ;
bR++){bS.call(this,this[bR],bR,this)}return this},eq:function(bQ){var bR=this.context;
return bR.length>bQ?new H(bR[bQ],this[bQ]):null},filter:function(bT){var bR=[];
if(l.filter){bR=l.filter.call(this,bT,this)}else{for(var bS=0,bQ=this.length;
bS<bQ;bS++){if(bT.call(this,this[bS],bS,this)){bR.push(this[bS])
}}}return new H(this.context,bR)},flatten:function(){var bQ=[];
return new H(this.context,bQ.concat.apply(bQ,this.toArray()))
},join:l.join,indexOf:l.indexOf||function(bS,bT){for(var bR=(bT||0),bQ=this.length;
bR<bQ;bR++){if(this[bR]===bS){return bR}}return -1
},iterator:function(b7,bS,bT,bV){var b5=[],b6,b2,bQ,b0,bZ,bR=this.context,bU,bX,b4,b1=this.selector;
if(typeof b7==="string"){bV=bT;bT=bS;bS=b7;b7=false
}for(b2=0,bQ=bR.length;b2<bQ;b2++){var bY=new H(bR[b2]);
if(bS==="table"){b6=bT.call(bY,bR[b2],b2);if(b6!==aH){b5.push(b6)
}}else{if(bS==="columns"||bS==="rows"){b6=bT.call(bY,bR[b2],this[b2],b2);
if(b6!==aH){b5.push(b6)}}else{if(bS==="column"||bS==="column-rows"||bS==="row"||bS==="cell"){bX=this[b2];
if(bS==="column-rows"){bU=aN(bR[b2],b1.opts)}for(b0=0,bZ=bX.length;
b0<bZ;b0++){b4=bX[b0];if(bS==="cell"){b6=bT.call(bY,bR[b2],b4.row,b4.column,b2,b0)
}else{b6=bT.call(bY,bR[b2],b4,b2,b0,bU)}if(b6!==aH){b5.push(b6)
}}}}}}if(b5.length||bV){var bW=new H(bR,b7?b5.concat.apply([],b5):b5);
var b3=bW.selector;b3.rows=b1.rows;b3.cols=b1.cols;
b3.opts=b1.opts;return bW}return this},lastIndexOf:l.lastIndexOf||function(bQ,bR){return this.indexOf.apply(this.toArray.reverse(),arguments)
},length:0,map:function(bT){var bR=[];if(l.map){bR=l.map.call(this,bT,this)
}else{for(var bS=0,bQ=this.length;bS<bQ;bS++){bR.push(bT.call(this,this[bS],bS))
}}return new H(this.context,bR)},pluck:function(bQ){return this.map(function(bR){return bR[bQ]
})},pop:l.pop,push:l.push,reduce:l.reduce||function(bQ,bR){return aT(this,bQ,bR,0,this.length,1)
},reduceRight:l.reduceRight||function(bQ,bR){return aT(this,bQ,bR,this.length-1,-1,-1)
},reverse:l.reverse,selector:null,shift:l.shift,sort:l.sort,splice:l.splice,toArray:function(){return l.slice.call(this)
},to$:function(){return bE(this)},toJQuery:function(){return bE(this)
},unique:function(){return new H(this.context,aE(this))
},unshift:l.unshift});H.extend=function(bY,bU,bR){if(!bR.length||!bU||(!(bU instanceof H)&&!bU.__dt_wrapper)){return
}var bV,bX,bT,bQ,bS,bZ,bW=function(b1,b0,b2){return function(){var b3=b0.apply(b1,arguments);
H.extend(b3,b3,b2.methodExt);return b3}};for(bV=0,bX=bR.length;
bV<bX;bV++){bS=bR[bV];bU[bS.name]=typeof bS.val==="function"?bW(bY,bS.val,bS):bE.isPlainObject(bS.val)?{}:bS.val;
bU[bS.name].__dt_wrapper=true;H.extend(bY,bU[bS.name],bS.propExt)
}};H.register=bj=function(bS,bU){if(bE.isArray(bS)){for(var bX=0,bT=bS.length;
bX<bT;bX++){H.register(bS[bX],bU)}return}var bY,b1,bV=bS.split("."),bW=S,b0,bR;
var bZ=function(b5,b3){for(var b4=0,b2=b5.length;
b4<b2;b4++){if(b5[b4].name===b3){return b5[b4]}}return null
};for(bY=0,b1=bV.length;bY<b1;bY++){bR=bV[bY].indexOf("()")!==-1;
b0=bR?bV[bY].replace("()",""):bV[bY];var bQ=bZ(bW,b0);
if(!bQ){bQ={name:b0,val:{},methodExt:[],propExt:[]};
bW.push(bQ)}if(bY===b1-1){bQ.val=bU}else{bW=bR?bQ.methodExt:bQ.propExt
}}};H.registerPlural=ay=function(bQ,bS,bR){H.register(bQ,bR);
H.register(bS,function(){var bT=bR.apply(this,arguments);
if(bT===this){return this}else{if(bT instanceof H){return bT.length?bE.isArray(bT[0])?new H(bT.context,bT[0]):bT[0]:aH
}}return bT})};var a=function(bQ,bR){if(typeof bQ==="number"){return[bR[bQ]]
}var bS=bE.map(bR,function(bU,bT){return bU.nTable
});return bE(bS).filter(bQ).map(function(bU){var bT=bE.inArray(this,bS);
return bR[bT]}).toArray()};bj("tables()",function(bQ){return bQ?new H(a(bQ,this.context)):this
});bj("table()",function(bQ){var bS=this.tables(bQ);
var bR=bS.context;return bR.length?new H(bR[0]):bS
});ay("tables().nodes()","table().node()",function(){return this.iterator("table",function(bQ){return bQ.nTable
},1)});ay("tables().body()","table().body()",function(){return this.iterator("table",function(bQ){return bQ.nTBody
},1)});ay("tables().header()","table().header()",function(){return this.iterator("table",function(bQ){return bQ.nTHead
},1)});ay("tables().footer()","table().footer()",function(){return this.iterator("table",function(bQ){return bQ.nTFoot
},1)});ay("tables().containers()","table().container()",function(){return this.iterator("table",function(bQ){return bQ.nTableWrapper
},1)});bj("draw()",function(bQ){return this.iterator("table",function(bR){if(bQ==="page"){a1(bR)
}else{if(typeof bQ==="string"){bQ=bQ==="full-hold"?false:true
}ag(bR,bQ===false)}})});bj("page()",function(bQ){if(bQ===aH){return this.page.info().page
}return this.iterator("table",function(bR){aD(bR,bQ)
})});bj("page.info()",function(bU){if(this.context.length===0){return aH
}var bT=this.context[0],bV=bT._iDisplayStart,bQ=bT.oFeatures.bPaginate?bT._iDisplayLength:-1,bR=bT.fnRecordsDisplay(),bS=bQ===-1;
return{page:bS?0:Math.floor(bV/bQ),pages:bS?1:Math.ceil(bR/bQ),start:bV,end:bT.fnDisplayEnd(),length:bQ,recordsTotal:bT.fnRecordsTotal(),recordsDisplay:bR,serverSide:w(bT)==="ssp"}
});bj("page.len()",function(bQ){if(bQ===aH){return this.context.length!==0?this.context[0]._iDisplayLength:aH
}return this.iterator("table",function(bR){aR(bR,bQ)
})});var F=function(bS,bQ,bU){if(bU){var bR=new H(bS);
bR.one("draw",function(){bU(bR.ajax.json())})}if(w(bS)=="ssp"){ag(bS,bQ)
}else{t(bS,true);var bT=bS.jqXHR;if(bT&&bT.readyState!==4){bT.abort()
}at(bS,[],function(bX){bh(bS);var bY=bs(bS,bX);for(var bW=0,bV=bY.length;
bW<bV;bW++){aM(bS,bY[bW])}ag(bS,bQ);t(bS,false)})
}};bj("ajax.json()",function(){var bQ=this.context;
if(bQ.length>0){return bQ[0].json}});bj("ajax.params()",function(){var bQ=this.context;
if(bQ.length>0){return bQ[0].oAjaxData}});bj("ajax.reload()",function(bR,bQ){return this.iterator("table",function(bS){F(bS,bQ===false,bR)
})});bj("ajax.url()",function(bR){var bQ=this.context;
if(bR===aH){if(bQ.length===0){return aH}bQ=bQ[0];
return bQ.ajax?bE.isPlainObject(bQ.ajax)?bQ.ajax.url:bQ.ajax:bQ.sAjaxSource
}return this.iterator("table",function(bS){if(bE.isPlainObject(bS.ajax)){bS.ajax.url=bR
}else{bS.ajax=bR}})});bj("ajax.url().load()",function(bR,bQ){return this.iterator("table",function(bS){F(bS,bQ===false,bR)
})});var an=function(bZ,bU,b0,bT,bQ){var bW=[],bY,b1,bX,b3,bV,bR,b2=typeof bU;
if(!bU||b2==="string"||b2==="function"||bU.length===aH){bU=[bU]
}for(bX=0,b3=bU.length;bX<b3;bX++){b1=bU[bX]&&bU[bX].split?bU[bX].split(","):[bU[bX]];
for(bV=0,bR=b1.length;bV<bR;bV++){bY=b0(typeof b1[bV]==="string"?bE.trim(b1[bV]):b1[bV]);
if(bY&&bY.length){bW=bW.concat(bY)}}}var bS=G.selector[bZ];
if(bS.length){for(bX=0,b3=bS.length;bX<b3;bX++){bW=bS[bX](bT,bQ,bW)
}}return aE(bW)};var bD=function(bQ){if(!bQ){bQ={}
}if(bQ.filter&&bQ.search===aH){bQ.search=bQ.filter
}return bE.extend({search:"none",order:"current",page:"all"},bQ)
};var x=function(bS){for(var bR=0,bQ=bS.length;bR<bQ;
bR++){if(bS[bR].length>0){bS[0]=bS[bR];bS[0].length=1;
bS.length=1;bS.context=[bS.context[bR]];return bS
}}bS.length=0;return bS};var aN=function(bS,bQ){var bT,bZ,bU,bX=[],bY=bS.aiDisplay,bV=bS.aiDisplayMaster;
var b0=bQ.search,bR=bQ.order,bW=bQ.page;if(w(bS)=="ssp"){return b0==="removed"?[]:bf(0,bV.length)
}else{if(bW=="current"){for(bT=bS._iDisplayStart,bZ=bS.fnDisplayEnd();
bT<bZ;bT++){bX.push(bY[bT])}}else{if(bR=="current"||bR=="applied"){bX=b0=="none"?bV.slice():b0=="applied"?bY.slice():bE.map(bV,function(b2,b1){return bE.inArray(b2,bY)===-1?b2:null
})}else{if(bR=="index"||bR=="original"){for(bT=0,bZ=bS.aoData.length;
bT<bZ;bT++){if(b0=="none"){bX.push(bT)}else{bU=bE.inArray(bT,bY);
if((bU===-1&&b0=="removed")||(bU>=0&&b0=="applied")){bX.push(bT)
}}}}}}}return bX};var C=function(bR,bQ,bS){var bT=function(b1){var bW=D(b1);
var bY,bU;if(bW!==null&&!bS){return[bW]}var b0=aN(bR,bS);
if(bW!==null&&bE.inArray(bW,b0)!==-1){return[bW]}else{if(!b1){return b0
}}if(typeof b1==="function"){return bE.map(b0,function(b2){var b3=bR.aoData[b2];
return b1(b2,b3._aData,b3.nTr)?b2:null})}var bV=ab(q(bR.aoData,b0,"nTr"));
if(b1.nodeName){if(b1._DT_RowIndex!==aH){return[b1._DT_RowIndex]
}else{if(b1._DT_CellIndex){return[b1._DT_CellIndex.row]
}else{var bZ=bE(b1).closest("*[data-dt-row]");return bZ.length?[bZ.data("dt-row")]:[]
}}}if(typeof b1==="string"&&b1.charAt(0)==="#"){var bX=bR.aIds[b1.replace(/^#/,"")];
if(bX!==aH){return[bX.idx]}}return bE(bV).filter(b1).map(function(){return this._DT_RowIndex
}).toArray()};return an("row",bQ,bT,bR,bS)};bj("rows()",function(bQ,bR){if(bQ===aH){bQ=""
}else{if(bE.isPlainObject(bQ)){bR=bQ;bQ=""}}bR=bD(bR);
var bS=this.iterator("table",function(bT){return C(bT,bQ,bR)
},1);bS.selector.rows=bQ;bS.selector.opts=bR;return bS
});bj("rows().nodes()",function(){return this.iterator("row",function(bQ,bR){return bQ.aoData[bR].nTr||aH
},1)});bj("rows().data()",function(){return this.iterator(true,"rows",function(bQ,bR){return q(bQ.aoData,bR,"_aData")
},1)});ay("rows().cache()","row().cache()",function(bQ){return this.iterator("row",function(bR,bT){var bS=bR.aoData[bT];
return bQ==="search"?bS._aFilterData:bS._aSortData
},1)});ay("rows().invalidate()","row().invalidate()",function(bQ){return this.iterator("row",function(bR,bS){z(bR,bS,bQ)
})});ay("rows().indexes()","row().index()",function(){return this.iterator("row",function(bQ,bR){return bR
},1)});ay("rows().ids()","row().id()",function(bW){var bR=[];
var bU=this.context;for(var bT=0,bQ=bU.length;bT<bQ;
bT++){for(var bS=0,bV=this[bT].length;bS<bV;bS++){var bX=bU[bT].rowIdFn(bU[bT].aoData[this[bT][bS]]._aData);
bR.push((bW===true?"#":"")+bX)}}return new H(bU,bR)
});ay("rows().remove()","row().remove()",function(){var bQ=this;
this.iterator("row",function(bW,b2,bR){var bY=bW.aoData;
var bV=bY[b2];var bZ,b1,bX,bU;var b0,bS;bY.splice(b2,1);
for(bZ=0,b1=bY.length;bZ<b1;bZ++){b0=bY[bZ];bS=b0.anCells;
if(b0.nTr!==null){b0.nTr._DT_RowIndex=bZ}if(bS!==null){for(bX=0,bU=bS.length;
bX<bU;bX++){bS[bX]._DT_CellIndex.row=bZ}}}a4(bW.aiDisplayMaster,b2);
a4(bW.aiDisplay,b2);a4(bQ[bR],b2,false);bk(bW);var bT=bW.rowIdFn(bV._aData);
if(bT!==aH){delete bW.aIds[bT]}});this.iterator("table",function(bT){for(var bS=0,bR=bT.aoData.length;
bS<bR;bS++){bT.aoData[bS].idx=bS}});return this});
bj("rows.add()",function(bS){var bR=this.iterator("table",function(bW){var bX,bV,bT;
var bU=[];for(bV=0,bT=bS.length;bV<bT;bV++){bX=bS[bV];
if(bX.nodeName&&bX.nodeName.toUpperCase()==="TR"){bU.push(bP(bW,bX)[0])
}else{bU.push(aM(bW,bX))}}return bU},1);var bQ=this.rows(-1);
bQ.pop();bE.merge(bQ,bR);return bQ});bj("row()",function(bQ,bR){return x(this.rows(bQ,bR))
});bj("row().data()",function(bR){var bQ=this.context;
if(bR===aH){return bQ.length&&this.length?bQ[0].aoData[this[0]]._aData:aH
}bQ[0].aoData[this[0]]._aData=bR;z(bQ[0],this[0],"data");
return this});bj("row().node()",function(){var bQ=this.context;
return bQ.length&&this.length?bQ[0].aoData[this[0]].nTr||null:null
});bj("row.add()",function(bR){if(bR instanceof bE&&bR.length){bR=bR[0]
}var bQ=this.iterator("table",function(bS){if(bR.nodeName&&bR.nodeName.toUpperCase()==="TR"){return bP(bS,bR)[0]
}return aM(bS,bR)});return this.row(bQ[0])});var X=function(bS,bV,bU,bQ){var bT=[];
var bR=function(bZ,bX){if(bE.isArray(bZ)||bZ instanceof bE){for(var bY=0,bW=bZ.length;
bY<bW;bY++){bR(bZ[bY],bX)}return}if(bZ.nodeName&&bZ.nodeName.toLowerCase()==="tr"){bT.push(bZ)
}else{var b0=bE("<tr><td/></tr>").addClass(bX);bE("td",b0).addClass(bX).html(bZ)[0].colSpan=aO(bS);
bT.push(b0[0])}};bR(bU,bQ);if(bV._details){bV._details.remove()
}bV._details=bE(bT);if(bV._detailsShow){bV._details.insertAfter(bV.nTr)
}};var y=function(bS,bQ){var bR=bS.context;if(bR.length){var bT=bR[0].aoData[bQ!==aH?bQ:bS[0]];
if(bT&&bT._details){bT._details.remove();bT._detailsShow=aH;
bT._details=aH}}};var ba=function(bS,bR){var bQ=bS.context;
if(bQ.length&&bS.length){var bT=bQ[0].aoData[bS[0]];
if(bT._details){bT._detailsShow=bR;if(bR){bT._details.insertAfter(bT.nTr)
}else{bT._details.detach()}bw(bQ[0])}}};var bw=function(bV){var bU=new H(bV);
var bT=".dt.DT_details";var bS="draw"+bT;var bQ="column-visibility"+bT;
var bR="destroy"+bT;var bW=bV.aoData;bU.off(bS+" "+bQ+" "+bR);
if(ar(bW,"_details").length>0){bU.on(bS,function(bY,bX){if(bV!==bX){return
}bU.rows({page:"current"}).eq(0).each(function(bZ){var b0=bW[bZ];
if(b0._detailsShow){b0._details.insertAfter(b0.nTr)
}})});bU.on(bQ,function(b2,bZ,bX,b1){if(bV!==bZ){return
}var b4,b3=aO(bZ);for(var b0=0,bY=bW.length;b0<bY;
b0++){b4=bW[b0];if(b4._details){b4._details.children("td[colspan]").attr("colspan",b3)
}}});bU.on(bR,function(b0,bY){if(bV!==bY){return}for(var bZ=0,bX=bW.length;
bZ<bX;bZ++){if(bW[bZ]._details){y(bU,bZ)}}})}};var k="";
var p=k+"row().child";var aW=p+"()";bj(aW,function(bS,bQ){var bR=this.context;
if(bS===aH){return bR.length&&this.length?bR[0].aoData[this[0]]._details:aH
}else{if(bS===true){this.child.show()}else{if(bS===false){y(this)
}else{if(bR.length&&this.length){X(bR[0],bR[0].aoData[this[0]],bS,bQ)
}}}}return this});bj([p+".show()",aW+".show()"],function(bQ){ba(this,true);
return this});bj([p+".hide()",aW+".hide()"],function(){ba(this,false);
return this});bj([p+".remove()",aW+".remove()"],function(){y(this);
return this});bj(p+".isShown()",function(){var bQ=this.context;
if(bQ.length&&this.length){return bQ[0].aoData[this[0]]._detailsShow||false
}return false});var a9=/^(.+):(name|visIdx|visible)$/;
var aX=function(bV,bU,bT,bS,bW){var bR=[];for(var bX=0,bQ=bW.length;
bX<bQ;bX++){bR.push(bt(bV,bW[bX],bU))}return bR};
var bB=function(bT,bQ,bU){var bS=bT.aoColumns,bW=ar(bS,"sName"),bR=ar(bS,"nTh");
var bV=function(b2){var bZ=D(b2);if(b2===""){return bf(bS.length)
}if(bZ!==null){return[bZ>=0?bZ:bS.length+bZ]}if(typeof b2==="function"){var b4=aN(bT,bU);
return bE.map(bS,function(b6,b5){return b2(b5,aX(bT,b5,0,0,b4),bR[b5])?b5:null
})}var b0=typeof b2==="string"?b2.match(a9):"";if(b0){switch(b0[2]){case"visIdx":case"visible":var bX=parseInt(b0[1],10);
if(bX<0){var b1=bE.map(bS,function(b5,b6){return b5.bVisible?b6:null
});return[b1[b1.length+bX]]}return[o(bT,bX)];case"name":return bE.map(bW,function(b5,b6){return b5===b0[1]?b6:null
});default:return[]}}if(b2.nodeName&&b2._DT_CellIndex){return[b2._DT_CellIndex.column]
}var bY=bE(bR).filter(b2).map(function(){return bE.inArray(this,bR)
}).toArray();if(bY.length||!b2.nodeName){return bY
}var b3=bE(b2).closest("*[data-dt-column]");return b3.length?[b3.data("dt-column")]:[]
};return an("column",bQ,bV,bT,bU)};var K=function(bS,bT,bQ,bX){var bZ=bS.aoColumns,bR=bZ[bT],bV=bS.aoData,b2,b1,bU,b0,bY;
if(bQ===aH){return bR.bVisible}if(bR.bVisible===bQ){return
}if(bQ){var bW=bE.inArray(true,ar(bZ,"bVisible"),bT+1);
for(bU=0,b0=bV.length;bU<b0;bU++){bY=bV[bU].nTr;b1=bV[bU].anCells;
if(bY){bY.insertBefore(b1[bT],b1[bW]||null)}}}else{bE(ar(bS.aoData,"anCells",bT)).detach()
}bR.bVisible=bQ;a5(bS,bS.aoHeader);a5(bS,bS.aoFooter);
if(bX===aH||bX){aG(bS)}J(bS,null,"column-visibility",[bS,bT,bQ,bX]);
bn(bS)};bj("columns()",function(bQ,bR){if(bQ===aH){bQ=""
}else{if(bE.isPlainObject(bQ)){bR=bQ;bQ=""}}bR=bD(bR);
var bS=this.iterator("table",function(bT){return bB(bT,bQ,bR)
},1);bS.selector.cols=bQ;bS.selector.opts=bR;return bS
});ay("columns().header()","column().header()",function(bQ,bR){return this.iterator("column",function(bT,bS){return bT.aoColumns[bS].nTh
},1)});ay("columns().footer()","column().footer()",function(bQ,bR){return this.iterator("column",function(bT,bS){return bT.aoColumns[bS].nTf
},1)});ay("columns().data()","column().data()",function(){return this.iterator("column-rows",aX,1)
});ay("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(bR,bQ){return bR.aoColumns[bQ].mData
},1)});ay("columns().cache()","column().cache()",function(bQ){return this.iterator("column-rows",function(bU,bT,bS,bR,bV){return q(bU.aoData,bV,bQ==="search"?"_aFilterData":"_aSortData",bT)
},1)});ay("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(bT,bS,bR,bQ,bU){return q(bT.aoData,bU,"anCells",bS)
},1)});ay("columns().visible()","column().visible()",function(bR,bQ){return this.iterator("column",function(bT,bS){if(bR===aH){return bT.aoColumns[bS].bVisible
}K(bT,bS,bR,bQ)})});ay("columns().indexes()","column().index()",function(bQ){return this.iterator("column",function(bS,bR){return bQ==="visible"?bI(bS,bR):bR
},1)});bj("columns.adjust()",function(){return this.iterator("table",function(bQ){aG(bQ)
},1)});bj("column.index()",function(bS,bQ){if(this.context.length!==0){var bR=this.context[0];
if(bS==="fromVisible"||bS==="toData"){return o(bR,bQ)
}else{if(bS==="fromData"||bS==="toVisible"){return bI(bR,bQ)
}}}});bj("column()",function(bQ,bR){return x(this.columns(bQ,bR))
});var bp=function(bU,bV,bQ){var bY=bU.aoData;var b5=aN(bU,bQ);
var b3=ab(q(bY,b5,"anCells"));var b2=bE([].concat.apply([],b3));
var b4;var bT=bU.aoColumns.length;var bZ,bX,b0,bW,bR,b1;
var bS=function(b7){var b8=typeof b7==="function";
if(b7===null||b7===aH||b8){bZ=[];for(bX=0,b0=b5.length;
bX<b0;bX++){b4=b5[bX];for(bW=0;bW<bT;bW++){bR={row:b4,column:bW};
if(b8){b1=bY[b4];if(b7(bR,bt(bU,b4,bW),b1.anCells?b1.anCells[bW]:null)){bZ.push(bR)
}}else{bZ.push(bR)}}}return bZ}if(bE.isPlainObject(b7)){return[b7]
}var b6=b2.filter(b7).map(function(b9,ca){return{row:ca._DT_CellIndex.row,column:ca._DT_CellIndex.column}
}).toArray();if(b6.length||!b7.nodeName){return b6
}b1=bE(b7).closest("*[data-dt-row]");return b1.length?[{row:b1.data("dt-row"),column:b1.data("dt-column")}]:[]
};return an("cell",bV,bS,bU,bQ)};bj("cells()",function(bT,bQ,bR){if(bE.isPlainObject(bT)){if(bT.row===aH){bR=bT;
bT=null}else{bR=bQ;bQ=null}}if(bE.isPlainObject(bQ)){bR=bQ;
bQ=null}if(bQ===null||bQ===aH){return this.iterator("table",function(b1){return bp(b1,bT,bD(bR))
})}var bU=this.columns(bQ,bR);var b0=this.rows(bT,bR);
var bX,bW,bY,bV,bS;var bZ=this.iterator("table",function(b2,b1){bX=[];
for(bW=0,bY=b0[b1].length;bW<bY;bW++){for(bV=0,bS=bU[b1].length;
bV<bS;bV++){bX.push({row:b0[b1][bW],column:bU[b1][bV]})
}}return bX},1);bE.extend(bZ.selector,{cols:bQ,rows:bT,opts:bR});
return bZ});ay("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(bR,bT,bQ){var bS=bR.aoData[bT];
return bS&&bS.anCells?bS.anCells[bQ]:aH},1)});bj("cells().data()",function(){return this.iterator("cell",function(bR,bS,bQ){return bt(bR,bS,bQ)
},1)});ay("cells().cache()","cell().cache()",function(bQ){bQ=bQ==="search"?"_aFilterData":"_aSortData";
return this.iterator("cell",function(bS,bT,bR){return bS.aoData[bT][bQ][bR]
},1)});ay("cells().render()","cell().render()",function(bQ){return this.iterator("cell",function(bS,bT,bR){return bt(bS,bT,bR,bQ)
},1)});ay("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(bR,bS,bQ){return{row:bS,column:bQ,columnVisible:bI(bR,bQ)}
},1)});ay("cells().invalidate()","cell().invalidate()",function(bQ){return this.iterator("cell",function(bS,bT,bR){z(bS,bT,bQ,bR)
})});bj("cell()",function(bQ,bS,bR){return x(this.cells(bQ,bS,bR))
});bj("cell().data()",function(bS){var bR=this.context;
var bQ=this[0];if(bS===aH){return bR.length&&bQ.length?bt(bR[0],bQ[0].row,bQ[0].column):aH
}bl(bR[0],bQ[0].row,bQ[0].column,bS);z(bR[0],bQ[0].row,"data",bQ[0].column);
return this});bj("order()",function(bQ,bS){var bR=this.context;
if(bQ===aH){return bR.length!==0?bR[0].aaSorting:aH
}if(typeof bQ==="number"){bQ=[[bQ,bS]]}else{if(!bE.isArray(bQ[0])){bQ=Array.prototype.slice.call(arguments)
}}return this.iterator("table",function(bT){bT.aaSorting=bQ.slice()
})});bj("order.listener()",function(bR,bQ,bS){return this.iterator("table",function(bT){A(bT,bR,bQ,bS)
})});bj("order.fixed()",function(bS){if(!bS){var bQ=this.context;
var bR=bQ.length?bQ[0].aaSortingFixed:aH;return bE.isArray(bR)?{pre:bR}:bR
}return this.iterator("table",function(bT){bT.aaSortingFixed=bE.extend(true,{},bS)
})});bj(["columns().order()","column().order()"],function(bQ){var bR=this;
return this.iterator("table",function(bU,bT){var bS=[];
bE.each(bR[bT],function(bW,bV){bS.push([bV,bQ])});
bU.aaSorting=bS})});bj("search()",function(bR,bT,bU,bS){var bQ=this.context;
if(bR===aH){return bQ.length!==0?bQ[0].oPreviousSearch.sSearch:aH
}return this.iterator("table",function(bV){if(!bV.oFeatures.bFilter){return
}r(bV,bE.extend({},bV.oPreviousSearch,{sSearch:bR+"",bRegex:bT===null?false:bT,bSmart:bU===null?true:bU,bCaseInsensitive:bS===null?true:bS}),1)
})});ay("columns().search()","column().search()",function(bQ,bS,bT,bR){return this.iterator("column",function(bW,bV){var bU=bW.aoPreSearchCols;
if(bQ===aH){return bU[bV].sSearch}if(!bW.oFeatures.bFilter){return
}bE.extend(bU[bV],{sSearch:bQ+"",bRegex:bS===null?false:bS,bSmart:bT===null?true:bT,bCaseInsensitive:bR===null?true:bR});
r(bW,bW.oPreviousSearch,1)})});bj("state()",function(){return this.context.length?this.context[0].oSavedState:null
});bj("state.clear()",function(){return this.iterator("table",function(bQ){bQ.fnStateSaveCallback.call(bQ.oInstance,bQ,{})
})});bj("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null
});bj("state.save()",function(){return this.iterator("table",function(bQ){bn(bQ)
})});L.versionCheck=L.fnVersionCheck=function(bS){var bW=L.version.split(".");
var bT=bS.split(".");var bR,bV;for(var bU=0,bQ=bT.length;
bU<bQ;bU++){bR=parseInt(bW[bU],10)||0;bV=parseInt(bT[bU],10)||0;
if(bR===bV){continue}return bR>bV}return true};L.isDataTable=L.fnIsDataTable=function(bS){var bQ=bE(bS).get(0);
var bR=false;bE.each(L.settings,function(bV,bW){var bU=bW.nScrollHead?bE("table",bW.nScrollHead)[0]:null;
var bT=bW.nScrollFoot?bE("table",bW.nScrollFoot)[0]:null;
if(bW.nTable===bQ||bU===bQ||bT===bQ){bR=true}});return bR
};L.tables=L.fnTables=function(bS){var bR=false;if(bE.isPlainObject(bS)){bR=bS.api;
bS=bS.visible}var bQ=bE.map(L.settings,function(bT){if(!bS||(bS&&bE(bT.nTable).is(":visible"))){return bT.nTable
}});return bR?new H(bQ):bQ};L.util={throttle:aj,escapeRegex:j};
L.camelToHungarian=Y;bj("$()",function(bQ,bS){var bT=this.rows(bS).nodes(),bR=bE(bT);
return bE([].concat(bR.filter(bQ).toArray(),bR.find(bQ).toArray()))
});bE.each(["on","one","off"],function(bR,bQ){bj(bQ+"()",function(){var bS=Array.prototype.slice.call(arguments);
if(!bS[0].match(/\.dt\b/)){bS[0]+=".dt"}var bT=bE(this.tables().nodes());
bT[bQ].apply(bT,bS);return this})});bj("clear()",function(){return this.iterator("table",function(bQ){bh(bQ)
})});bj("settings()",function(){return new H(this.context,this.context)
});bj("init()",function(){var bQ=this.context;return bQ.length?bQ[0].oInit:null
});bj("data()",function(){return this.iterator("table",function(bQ){return ar(bQ.aoData,"_aData")
}).flatten()});bj("destroy()",function(bQ){bQ=bQ||false;
return this.iterator("table",function(bR){var b1=bR.nTableWrapper.parentNode;
var bS=bR.oClasses;var b3=bR.nTable;var bW=bR.nTBody;
var bY=bR.nTHead;var bZ=bR.nTFoot;var b4=bE(b3);var bV=bE(bW);
var bX=bE(bR.nTableWrapper);var b5=bE.map(bR.aoData,function(b6){return b6.nTr
});var bU,b2;bR.bDestroying=true;J(bR,"aoDestroyCallback","destroy",[bR]);
if(!bQ){new H(bR).columns().visible(true)}bX.unbind(".DT").find(":not(tbody *)").unbind(".DT");
bE(a6).unbind(".DT-"+bR.sInstance);if(b3!=bY.parentNode){b4.children("thead").detach();
b4.append(bY)}if(bZ&&b3!=bZ.parentNode){b4.children("tfoot").detach();
b4.append(bZ)}bR.aaSorting=[];bR.aaSortingFixed=[];
ac(bR);bE(b5).removeClass(bR.asStripeClasses.join(" "));
bE("th, td",bY).removeClass(bS.sSortable+" "+bS.sSortableAsc+" "+bS.sSortableDesc+" "+bS.sSortableNone);
if(bR.bJUI){bE("th span."+bS.sSortIcon+", td span."+bS.sSortIcon,bY).detach();
bE("th, td",bY).each(function(){var b6=bE("div."+bS.sSortJUIWrapper,this);
bE(this).append(b6.contents());b6.detach()})}bV.children().detach();
bV.append(b5);var bT=bQ?"remove":"detach";b4[bT]();
bX[bT]();if(!bQ&&b1){b1.insertBefore(b3,bR.nTableReinsertBefore);
b4.css("width",bR.sDestroyWidth).removeClass(bS.sTable);
b2=bR.asDestroyStripes.length;if(b2){bV.children().each(function(b6){bE(this).addClass(bR.asDestroyStripes[b6%b2])
})}}var b0=bE.inArray(bR,L.settings);if(b0!==-1){L.settings.splice(b0,1)
}})});bE.each(["column","row","cell"],function(bQ,bR){bj(bR+"s().every()",function(bT){var bU=this.selector.opts;
var bS=this;return this.iterator(bR,function(bZ,bY,bX,bW,bV){bT.call(bS[bR](bY,bR==="cell"?bX:bU,bR==="cell"?bU:aH),bY,bX,bW,bV)
})})});bj("i18n()",function(bT,bU,bS){var bR=this.context[0];
var bQ=am(bT)(bR.oLanguage);if(bQ===aH){bQ=bU}if(bS!==aH&&bE.isPlainObject(bQ)){bQ=bQ[bS]!==aH?bQ[bS]:bQ._
}return bQ.replace("%d",bS)});L.version="1.10.11";
L.settings=[];L.models={};L.models.oSearch={bCaseInsensitive:true,sSearch:"",bRegex:false,bSmart:true};
L.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};
L.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:false,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};
L.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:true,bDeferRender:false,bDestroy:false,bFilter:true,bInfo:true,bJQueryUI:false,bLengthChange:true,bPaginate:true,bProcessing:false,bRetrieve:false,bScrollCollapse:false,bServerSide:false,bSort:true,bSortMulti:true,bSortCellsTop:false,bSortClasses:true,bStateSave:false,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(bQ){return bQ.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)
},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(bQ){try{return JSON.parse((bQ.iStateDuration===-1?sessionStorage:localStorage).getItem("DataTables_"+bQ.sInstance+"_"+location.pathname))
}catch(bR){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(bQ,bR){try{(bQ.iStateDuration===-1?sessionStorage:localStorage).setItem("DataTables_"+bQ.sInstance+"_"+location.pathname,JSON.stringify(bR))
}catch(bS){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:bE.extend({},L.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};
R(L.defaults);L.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:true,bSortable:true,bVisible:true,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};
R(L.defaults.column);L.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:false,bScrollbarLeft:false,bBounding:false,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:false,bInitialised:false,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:true,jqXHR:null,json:aH,oAjaxData:aH,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:false,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:false,bSorted:false,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return w(this)=="ssp"?this._iRecordsTotal*1:this.aiDisplayMaster.length
},fnRecordsDisplay:function(){return w(this)=="ssp"?this._iRecordsDisplay*1:this.aiDisplay.length
},fnDisplayEnd:function(){var bQ=this._iDisplayLength,bV=this._iDisplayStart,bS=bV+bQ,bR=this.aiDisplay.length,bT=this.oFeatures,bU=bT.bPaginate;
if(bT.bServerSide){return bU===false||bQ===-1?bV+bR:Math.min(bV+bQ,this._iRecordsDisplay)
}else{return !bU||bS>bR||bQ===-1?bR:bS}},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};
L.ext=G={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:L.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:L.version};
bE.extend(G,{afnFiltering:G.search,aTypes:G.type.detect,ofnSearch:G.type.search,oSort:G.type.order,afnSortData:G.order,aoFeatures:G.feature,oApi:G.internal,oStdClasses:G.classes,oPagination:G.pager});
bE.extend(L.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});
(function(){var bR="";bR="";var bS=bR+"ui-state-default";
var bT=bR+"css_right ui-icon ui-icon-";var bQ=bR+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
bE.extend(L.ext.oJUIClasses,L.ext.classes,{sPageButton:"fg-button ui-button "+bS,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:bS+" sorting_asc",sSortDesc:bS+" sorting_desc",sSortable:bS+" sorting",sSortableAsc:bS+" sorting_asc_disabled",sSortableDesc:bS+" sorting_desc_disabled",sSortableNone:bS+" sorting_disabled",sSortJUIAsc:bT+"triangle-1-n",sSortJUIDesc:bT+"triangle-1-s",sSortJUI:bT+"carat-2-n-s",sSortJUIAscAllowed:bT+"carat-1-n",sSortJUIDescAllowed:bT+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+bS,sScrollFoot:"dataTables_scrollFoot "+bS,sHeaderTH:bS,sFooterTH:bS,sJUIHeader:bQ+" ui-corner-tl ui-corner-tr",sJUIFooter:bQ+" ui-corner-bl ui-corner-br"})
}());var bH=L.ext.pager;function bm(bV,bQ){var bR=[],bT=bH.numbers_length,bU=Math.floor(bT/2),bS=1;
if(bQ<=bT){bR=bf(0,bQ)}else{if(bV<=bU){bR=bf(0,bT-2);
bR.push("ellipsis");bR.push(bQ-1)}else{if(bV>=bQ-1-bU){bR=bf(bQ-(bT-2),bQ);
bR.splice(0,0,"ellipsis");bR.splice(0,0,0)}else{bR=bf(bV-bU+2,bV+bU-1);
bR.push("ellipsis");bR.push(bQ-1);bR.splice(0,0,"ellipsis");
bR.splice(0,0,0)}}}bR.DT_el="span";return bR}bE.extend(bH,{simple:function(bR,bQ){return["previous","next"]
},full:function(bR,bQ){return["first","previous","next","last"]
},numbers:function(bR,bQ){return[bm(bR,bQ)]},simple_numbers:function(bR,bQ){return["previous",bm(bR,bQ),"next"]
},full_numbers:function(bR,bQ){return["first","previous",bm(bR,bQ),"next","last"]
},_numbers:bm,numbers_length:7});bE.extend(true,L.ext.renderer,{pageButton:{_:function(bW,b4,b3,b1,b0,bU){var bX=bW.oClasses;
var bT=bW.oLanguage.oPaginate;var b2=bW.oLanguage.oAria.paginate||{};
var bS,bR,bQ=0;var bY=function(b6,cb){var b9,b5,ca,b8;
var cc=function(cd){aD(bW,cd.data.action,true)};for(b9=0,b5=cb.length;
b9<b5;b9++){b8=cb[b9];if(bE.isArray(b8)){var b7=bE("<"+(b8.DT_el||"div")+"/>").appendTo(b6);
bY(b7,b8)}else{bS=null;bR="";switch(b8){case"ellipsis":b6.append('<span class="ellipsis">&#x2026;</span>');
break;case"first":bS=bT.sFirst;bR=b8+(b0>0?"":" "+bX.sPageButtonDisabled);
break;case"previous":bS=bT.sPrevious;bR=b8+(b0>0?"":" "+bX.sPageButtonDisabled);
break;case"next":bS=bT.sNext;bR=b8+(b0<bU-1?"":" "+bX.sPageButtonDisabled);
break;case"last":bS=bT.sLast;bR=b8+(b0<bU-1?"":" "+bX.sPageButtonDisabled);
break;default:bS=b8+1;bR=b0===b8?bX.sPageButtonActive:"";
break}if(bS!==null){ca=bE("<a>",{"class":bX.sPageButton+" "+bR,"aria-controls":bW.sTableId,"aria-label":b2[b8],"data-dt-idx":bQ,tabindex:bW.iTabIndex,id:b3===0&&typeof b8==="string"?bW.sTableId+"_"+b8:null}).html(bS).appendTo(b6);
bb(ca,{action:b8},cc);bQ++}}}};var bV;try{bV=bE(b4).find(v.activeElement).data("dt-idx")
}catch(bZ){}bY(bE(b4).empty(),b1);if(bV){bE(b4).find("[data-dt-idx="+bV+"]").focus()
}}}});bE.extend(L.ext.type.detect,[function(bS,bR){var bQ=bR.oLanguage.sDecimal;
return ah(bS,bQ)?"num"+bQ:null},function(bS,bR){if(bS&&!(bS instanceof Date)&&(!ak.test(bS)||!bu.test(bS))){return null
}var bQ=Date.parse(bS);return(bQ!==null&&!isNaN(bQ))||bA(bS)?"date":null
},function(bS,bR){var bQ=bR.oLanguage.sDecimal;return ah(bS,bQ,true)?"num-fmt"+bQ:null
},function(bS,bR){var bQ=bR.oLanguage.sDecimal;return g(bS,bQ)?"html-num"+bQ:null
},function(bS,bR){var bQ=bR.oLanguage.sDecimal;return g(bS,bQ,true)?"html-num-fmt"+bQ:null
},function(bR,bQ){return bA(bR)||(typeof bR==="string"&&bR.indexOf("<")!==-1)?"html":null
}]);bE.extend(L.ext.type.search,{html:function(bQ){return bA(bQ)?bQ:typeof bQ==="string"?bQ.replace(U," ").replace(aS,""):""
},string:function(bQ){return bA(bQ)?bQ:typeof bQ==="string"?bQ.replace(U," "):bQ
}});var O=function(bT,bQ,bS,bR){if(bT!==0&&(!bT||bT==="-")){return -Infinity
}if(bQ){bT=bC(bT,bQ)}if(bT.replace){if(bS){bT=bT.replace(bS,"")
}if(bR){bT=bT.replace(bR,"")}}return bT*1};function bq(bQ){bE.each({num:function(bR){return O(bR,bQ)
},"num-fmt":function(bR){return O(bR,bQ,bF)},"html-num":function(bR){return O(bR,bQ,aS)
},"html-num-fmt":function(bR){return O(bR,bQ,aS,bF)
}},function(bR,bS){G.type.order[bR+bQ+"-pre"]=bS;
if(bR.match(/^html\-/)){G.type.search[bR+bQ]=G.type.search.html
}})}bE.extend(G.type.order,{"date-pre":function(bQ){return Date.parse(bQ)||0
},"html-pre":function(bQ){return bA(bQ)?"":bQ.replace?bQ.replace(/<.*?>/g,"").toLowerCase():bQ+""
},"string-pre":function(bQ){return bA(bQ)?"":typeof bQ==="string"?bQ.toLowerCase():!bQ.toString?"":bQ.toString()
},"string-asc":function(bQ,bR){return((bQ<bR)?-1:((bQ>bR)?1:0))
},"string-desc":function(bQ,bR){return((bQ<bR)?1:((bQ>bR)?-1:0))
}});bq("");bE.extend(true,L.ext.renderer,{header:{_:function(bT,bQ,bS,bR){bE(bT.nTable).on("order.dt.DT",function(bX,bU,bW,bV){if(bT!==bU){return
}var bY=bS.idx;bQ.removeClass(bS.sSortingClass+" "+bR.sSortAsc+" "+bR.sSortDesc).addClass(bV[bY]=="asc"?bR.sSortAsc:bV[bY]=="desc"?bR.sSortDesc:bS.sSortingClass)
})},jqueryui:function(bT,bQ,bS,bR){bE("<div/>").addClass(bR.sSortJUIWrapper).append(bQ.contents()).append(bE("<span/>").addClass(bR.sSortIcon+" "+bS.sSortingClassJUI)).appendTo(bQ);
bE(bT.nTable).on("order.dt.DT",function(bX,bU,bW,bV){if(bT!==bU){return
}var bY=bS.idx;bQ.removeClass(bR.sSortAsc+" "+bR.sSortDesc).addClass(bV[bY]=="asc"?bR.sSortAsc:bV[bY]=="desc"?bR.sSortDesc:bS.sSortingClass);
bQ.find("span."+bR.sSortIcon).removeClass(bR.sSortJUIAsc+" "+bR.sSortJUIDesc+" "+bR.sSortJUI+" "+bR.sSortJUIAscAllowed+" "+bR.sSortJUIDescAllowed).addClass(bV[bY]=="asc"?bR.sSortJUIAsc:bV[bY]=="desc"?bR.sSortJUIDesc:bS.sSortingClassJUI)
})}}});var a3=function(bQ){return typeof bQ==="string"?bQ.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):bQ
};L.render={number:function(bS,bR,bQ,bT,bU){return{display:function(bZ){if(typeof bZ!=="number"&&typeof bZ!=="string"){return bZ
}var bW=bZ<0?"-":"";var bY=parseFloat(bZ);if(isNaN(bY)){return a3(bZ)
}bZ=Math.abs(bY);var bX=parseInt(bZ,10);var bV=bQ?bR+(bZ-bX).toFixed(bQ).substring(2):"";
return bW+(bT||"")+bX.toString().replace(/\B(?=(\d{3})+(?!\d))/g,bS)+bV+(bU||"")
}}},text:function(){return{display:a3}}};function af(bQ){return function(){var bR=[al(this[L.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
return L.ext.internal[bQ].apply(this,bR)}}bE.extend(L.ext.internal,{_fnExternApiFunc:af,_fnBuildAjax:at,_fnAjaxUpdate:ad,_fnAjaxParameters:bK,_fnAjaxUpdateDraw:T,_fnAjaxDataSrc:bs,_fnAddColumn:M,_fnColumnOptions:a0,_fnAdjustColumnSizing:aG,_fnVisibleToColumnIndex:o,_fnColumnIndexToVisible:bI,_fnVisbleColumns:aO,_fnGetColumns:m,_fnColumnTypes:s,_fnApplyColumnDefs:h,_fnHungarianMap:R,_fnCamelToHungarian:Y,_fnLanguageCompat:aQ,_fnBrowserDetect:bd,_fnAddData:aM,_fnAddTr:bP,_fnNodeToDataIndex:br,_fnNodeToColumnIndex:aY,_fnGetCellData:bt,_fnSetCellData:bl,_fnSplitObjNotation:ai,_fnGetObjectDataFn:am,_fnSetObjectDataFn:av,_fnGetDataMaster:bG,_fnClearTable:bh,_fnDeleteIndex:a4,_fnInvalidate:z,_fnGetRowElements:be,_fnCreateTr:N,_fnBuildHead:aJ,_fnDrawHead:a5,_fnDraw:a1,_fnReDraw:ag,_fnAddOptionsHtml:f,_fnDetectHeader:au,_fnGetUniqueThs:bg,_fnFeatureHtmlFilter:n,_fnFilterComplete:r,_fnFilterCustom:ap,_fnFilterColumn:W,_fnFilter:aw,_fnFilterCreateSearch:aU,_fnEscapeRegex:j,_fnFilterData:aB,_fnFeatureHtmlInfo:d,_fnUpdateInfo:aq,_fnInfoMacros:bo,_fnInitialise:e,_fnInitComplete:az,_fnLengthChange:aR,_fnFeatureHtmlLength:aP,_fnFeatureHtmlPaginate:ax,_fnPageChange:aD,_fnFeatureHtmlProcessing:bz,_fnProcessingDisplay:t,_fnFeatureHtmlTable:by,_fnScrollDraw:i,_fnApplyToChildren:a8,_fnCalculateColumnWidths:bv,_fnThrottle:aj,_fnConvertToWidth:ae,_fnGetWidestNode:aI,_fnGetMaxLenString:Z,_fnStringToCss:bJ,_fnSortFlatten:aF,_fnSort:u,_fnSortAria:bc,_fnSortListener:bi,_fnSortAttachListener:A,_fnSortingClasses:ac,_fnSortData:E,_fnSaveState:bn,_fnLoadState:bN,_fnSettingsFromNode:al,_fnLog:aL,_fnMap:P,_fnBindAction:bb,_fnCallbackReg:bM,_fnCallbackFire:J,_fnLengthOverflow:bk,_fnRenderer:Q,_fnDataSource:w,_fnRowAttributes:aa,_fnCalculateEnd:function(){}});
bE.fn.dataTable=L;L.$=bE;bE.fn.dataTableSettings=L.settings;
bE.fn.dataTableExt=L.ext;bE.fn.DataTable=function(bQ){return bE(this).dataTable(bQ).api()
};bE.each(L,function(bR,bQ){bE.fn.DataTable[bR]=bQ
});return bE.fn.dataTable}));console.log("=============== >  jqueryJSStuff/jquery.dataTables.js ");
var FixedHeader=function(b,a){if(typeof this.fnInit!="function"){alert("FixedHeader warning: FixedHeader must be initialised with the 'new' keyword.");
return}var c=this;var d={aoCache:[],oSides:{top:true,bottom:false,left:false,right:false},oZIndexes:{top:104,bottom:103,left:102,right:101},oMes:{iTableWidth:0,iTableHeight:0,iTableLeft:0,iTableRight:0,iTableTop:0,iTableBottom:0},oOffset:{top:0},nTable:null,bUseAbsPos:false,bFooter:false};
this.fnGetSettings=function(){return d};this.fnUpdate=function(){this._fnUpdateClones();
this._fnUpdatePositions()};this.fnPosition=function(){this._fnUpdatePositions()
};this.fnInit(b,a);if(typeof b.fnSettings=="function"){b._oPluginFixedHeader=this
}};FixedHeader.prototype={fnInit:function(b,a){var c=this.fnGetSettings();
var d=this;this.fnInitSettings(c,a);if(typeof b.fnSettings=="function"){if(typeof b.fnVersionCheck=="functon"&&b.fnVersionCheck("1.6.0")!==true){alert("FixedHeader 2 required DataTables 1.6.0 or later. Please upgrade your DataTables installation");
return}var e=b.fnSettings();if(e.oScroll.sX!=""||e.oScroll.sY!=""){alert("FixedHeader 2 is not supported with DataTables' scrolling mode at this time");
return}c.nTable=e.nTable;e.aoDrawCallback.push({fn:function(){FixedHeader.fnMeasure();
d._fnUpdateClones.call(d);d._fnUpdatePositions.call(d)
},sName:"FixedHeader"})}else{c.nTable=b}c.bFooter=($(">tfoot",c.nTable).length>0)?true:false;
c.bUseAbsPos=(jQuery.browser.msie&&(jQuery.browser.version=="6.0"||jQuery.browser.version=="7.0"));
if(c.oSides.top){c.aoCache.push(d._fnCloneTable("fixedHeader","FixedHeader_Header",d._fnCloneThead))
}if(c.oSides.bottom){c.aoCache.push(d._fnCloneTable("fixedFooter","FixedHeader_Footer",d._fnCloneTfoot))
}if(c.oSides.left){c.aoCache.push(d._fnCloneTable("fixedLeft","FixedHeader_Left",d._fnCloneTLeft))
}if(c.oSides.right){c.aoCache.push(d._fnCloneTable("fixedRight","FixedHeader_Right",d._fnCloneTRight))
}FixedHeader.afnScroll.push(function(){d._fnUpdatePositions.call(d)
});jQuery(window).resize(function(){FixedHeader.fnMeasure();
d._fnUpdateClones.call(d);d._fnUpdatePositions.call(d)
});FixedHeader.fnMeasure();d._fnUpdateClones();d._fnUpdatePositions()
},fnInitSettings:function(b,a){if(typeof a!="undefined"){if(typeof a.top!="undefined"){b.oSides.top=a.top
}if(typeof a.bottom!="undefined"){b.oSides.bottom=a.bottom
}if(typeof a.left!="undefined"){b.oSides.left=a.left
}if(typeof a.right!="undefined"){b.oSides.right=a.right
}if(typeof a.zTop!="undefined"){b.oZIndexes.top=a.zTop
}if(typeof a.zBottom!="undefined"){b.oZIndexes.bottom=a.zBottom
}if(typeof a.zLeft!="undefined"){b.oZIndexes.left=a.zLeft
}if(typeof a.zRight!="undefined"){b.oZIndexes.right=a.zRight
}if(typeof a.offsetTop!="undefined"){b.oOffset.top=a.offsetTop
}}b.bUseAbsPos=(jQuery.browser.msie&&(jQuery.browser.version=="6.0"||jQuery.browser.version=="7.0"))
},_fnCloneTable:function(f,e,d){var b=this.fnGetSettings();
var a;if(jQuery(b.nTable.parentNode).css("position")!="absolute"){b.nTable.parentNode.style.position="relative"
}a=b.nTable.cloneNode(false);a.removeAttribute("id");
var c=document.createElement("div");c.style.position="absolute";
c.style.top="0px";c.style.left="0px";c.className+=" FixedHeader_Cloned "+f+" "+e;
if(f=="fixedHeader"){c.style.zIndex=b.oZIndexes.top
}if(f=="fixedFooter"){c.style.zIndex=b.oZIndexes.bottom
}if(f=="fixedLeft"){c.style.zIndex=b.oZIndexes.left
}else{if(f=="fixedRight"){c.style.zIndex=b.oZIndexes.right
}}a.style.margin="0";c.appendChild(a);document.body.appendChild(c);
return{nNode:a,nWrapper:c,sType:f,sPosition:"",sTop:"",sLeft:"",fnClone:d}
},_fnMeasure:function(){var d=this.fnGetSettings(),a=d.oMes,c=jQuery(d.nTable),b=c.offset(),f=this._fnSumScroll(d.nTable.parentNode,"scrollTop"),e=this._fnSumScroll(d.nTable.parentNode,"scrollLeft");
a.iTableWidth=c.outerWidth();a.iTableHeight=c.outerHeight();
a.iTableLeft=b.left+d.nTable.parentNode.scrollLeft;
a.iTableTop=b.top+f;a.iTableRight=a.iTableLeft+a.iTableWidth;
a.iTableRight=FixedHeader.oDoc.iWidth-a.iTableLeft-a.iTableWidth;
a.iTableBottom=FixedHeader.oDoc.iHeight-a.iTableTop-a.iTableHeight
},_fnSumScroll:function(c,b){var a=c[b];while(c=c.parentNode){if(c.nodeName=="HTML"||c.nodeName=="BODY"){break
}a=c[b]}return a},_fnUpdatePositions:function(){var c=this.fnGetSettings();
this._fnMeasure();for(var b=0,a=c.aoCache.length;
b<a;b++){if(c.aoCache[b].sType=="fixedHeader"){this._fnScrollFixedHeader(c.aoCache[b])
}else{if(c.aoCache[b].sType=="fixedFooter"){this._fnScrollFixedFooter(c.aoCache[b])
}else{if(c.aoCache[b].sType=="fixedLeft"){this._fnScrollHorizontalLeft(c.aoCache[b])
}else{this._fnScrollHorizontalRight(c.aoCache[b])
}}}}},_fnUpdateClones:function(){var c=this.fnGetSettings();
for(var b=0,a=c.aoCache.length;b<a;b++){c.aoCache[b].fnClone.call(this,c.aoCache[b])
}},_fnScrollHorizontalRight:function(g){var e=this.fnGetSettings(),f=e.oMes,b=FixedHeader.oWin,a=FixedHeader.oDoc,d=g.nWrapper,c=jQuery(d).outerWidth();
if(b.iScrollRight<f.iTableRight){this._fnUpdateCache(g,"sPosition","absolute","position",d.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",d.style);
this._fnUpdateCache(g,"sLeft",(f.iTableLeft+f.iTableWidth-c)+"px","left",d.style)
}else{if(f.iTableLeft<a.iWidth-b.iScrollRight-c){if(e.bUseAbsPos){this._fnUpdateCache(g,"sPosition","absolute","position",d.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",d.style);
this._fnUpdateCache(g,"sLeft",(a.iWidth-b.iScrollRight-c)+"px","left",d.style)
}else{this._fnUpdateCache(g,"sPosition","fixed","position",d.style);
this._fnUpdateCache(g,"sTop",(f.iTableTop-b.iScrollTop)+"px","top",d.style);
this._fnUpdateCache(g,"sLeft",(b.iWidth-c)+"px","left",d.style)
}}else{this._fnUpdateCache(g,"sPosition","absolute","position",d.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",d.style);
this._fnUpdateCache(g,"sLeft",f.iTableLeft+"px","left",d.style)
}}},_fnScrollHorizontalLeft:function(g){var e=this.fnGetSettings(),f=e.oMes,b=FixedHeader.oWin,a=FixedHeader.oDoc,c=g.nWrapper,d=jQuery(c).outerWidth();
if(b.iScrollLeft<f.iTableLeft){this._fnUpdateCache(g,"sPosition","absolute","position",c.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",c.style);
this._fnUpdateCache(g,"sLeft",f.iTableLeft+"px","left",c.style)
}else{if(b.iScrollLeft<f.iTableLeft+f.iTableWidth-d){if(e.bUseAbsPos){this._fnUpdateCache(g,"sPosition","absolute","position",c.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",c.style);
this._fnUpdateCache(g,"sLeft",b.iScrollLeft+"px","left",c.style)
}else{this._fnUpdateCache(g,"sPosition","fixed","position",c.style);
this._fnUpdateCache(g,"sTop",(f.iTableTop-b.iScrollTop)+"px","top",c.style);
this._fnUpdateCache(g,"sLeft","0px","left",c.style)
}}else{this._fnUpdateCache(g,"sPosition","absolute","position",c.style);
this._fnUpdateCache(g,"sTop",f.iTableTop+"px","top",c.style);
this._fnUpdateCache(g,"sLeft",(f.iTableLeft+f.iTableWidth-d)+"px","left",c.style)
}}},_fnScrollFixedFooter:function(h){var f=this.fnGetSettings(),g=f.oMes,b=FixedHeader.oWin,a=FixedHeader.oDoc,c=h.nWrapper,e=jQuery("thead",f.nTable).outerHeight(),d=jQuery(c).outerHeight();
if(b.iScrollBottom<g.iTableBottom){this._fnUpdateCache(h,"sPosition","absolute","position",c.style);
this._fnUpdateCache(h,"sTop",(g.iTableTop+g.iTableHeight-d)+"px","top",c.style);
this._fnUpdateCache(h,"sLeft",g.iTableLeft+"px","left",c.style)
}else{if(b.iScrollBottom<g.iTableBottom+g.iTableHeight-d-e){if(f.bUseAbsPos){this._fnUpdateCache(h,"sPosition","absolute","position",c.style);
this._fnUpdateCache(h,"sTop",(a.iHeight-b.iScrollBottom-d)+"px","top",c.style);
this._fnUpdateCache(h,"sLeft",g.iTableLeft+"px","left",c.style)
}else{this._fnUpdateCache(h,"sPosition","fixed","position",c.style);
this._fnUpdateCache(h,"sTop",(b.iHeight-d)+"px","top",c.style);
this._fnUpdateCache(h,"sLeft",(g.iTableLeft-b.iScrollLeft)+"px","left",c.style)
}}else{this._fnUpdateCache(h,"sPosition","absolute","position",c.style);
this._fnUpdateCache(h,"sTop",(g.iTableTop+d)+"px","top",c.style);
this._fnUpdateCache(h,"sLeft",g.iTableLeft+"px","left",c.style)
}}},_fnScrollFixedHeader:function(f){var j=this.fnGetSettings(),c=j.oMes,d=FixedHeader.oWin,h=FixedHeader.oDoc,b=f.nWrapper,g=0,e=j.nTable.getElementsByTagName("tbody");
for(var a=0;a<e.length;++a){g+=e[a].offsetHeight}if(c.iTableTop>d.iScrollTop+j.oOffset.top){this._fnUpdateCache(f,"sPosition","absolute","position",b.style);
this._fnUpdateCache(f,"sTop",c.iTableTop+"px","top",b.style);
this._fnUpdateCache(f,"sLeft",c.iTableLeft+"px","left",b.style)
}else{if(d.iScrollTop+j.oOffset.top>c.iTableTop+g){this._fnUpdateCache(f,"sPosition","absolute","position",b.style);
this._fnUpdateCache(f,"sTop",(c.iTableTop+g)+"px","top",b.style);
this._fnUpdateCache(f,"sLeft",c.iTableLeft+"px","left",b.style)
}else{if(j.bUseAbsPos){this._fnUpdateCache(f,"sPosition","absolute","position",b.style);
this._fnUpdateCache(f,"sTop",d.iScrollTop+"px","top",b.style);
this._fnUpdateCache(f,"sLeft",c.iTableLeft+"px","left",b.style)
}else{this._fnUpdateCache(f,"sPosition","fixed","position",b.style);
this._fnUpdateCache(f,"sTop",j.oOffset.top+"px","top",b.style);
this._fnUpdateCache(f,"sLeft",(c.iTableLeft-d.iScrollLeft)+"px","left",b.style)
}}}},_fnUpdateCache:function(e,c,b,d,a){if(e[c]!=b){a[d]=b;
e[c]=b}},_fnCloneThead:function(d){var c=this.fnGetSettings();
var a=d.nNode;d.nWrapper.style.width=jQuery(c.nTable).outerWidth()+"px";
while(a.childNodes.length>0){jQuery("thead th",a).unbind("click");
a.removeChild(a.childNodes[0])}var b=jQuery("thead",c.nTable).clone(true)[0];
a.appendChild(b);jQuery("thead>tr th",c.nTable).each(function(e){jQuery("thead>tr th:eq("+e+")",a).width(jQuery(this).width())
});jQuery("thead>tr td",c.nTable).each(function(e){jQuery("thead>tr td:eq("+e+")",a).width(jQuery(this).width())
})},_fnCloneTfoot:function(d){var c=this.fnGetSettings();
var a=d.nNode;d.nWrapper.style.width=jQuery(c.nTable).outerWidth()+"px";
while(a.childNodes.length>0){a.removeChild(a.childNodes[0])
}var b=jQuery("tfoot",c.nTable).clone(true)[0];a.appendChild(b);
jQuery("tfoot:eq(0)>tr th",c.nTable).each(function(e){jQuery("tfoot:eq(0)>tr th:eq("+e+")",a).width(jQuery(this).width())
});jQuery("tfoot:eq(0)>tr td",c.nTable).each(function(e){jQuery("tfoot:eq(0)>tr th:eq("+e+")",a)[0].style.width(jQuery(this).width())
})},_fnCloneTLeft:function(g){var c=this.fnGetSettings();
var b=g.nNode;var f=$("tbody",c.nTable)[0];var e=$("tbody tr:eq(0) td",c.nTable).length;
var a=($.browser.msie&&($.browser.version=="6.0"||$.browser.version=="7.0"));
while(b.childNodes.length>0){b.removeChild(b.childNodes[0])
}b.appendChild(jQuery("thead",c.nTable).clone(true)[0]);
b.appendChild(jQuery("tbody",c.nTable).clone(true)[0]);
if(c.bFooter){b.appendChild(jQuery("tfoot",c.nTable).clone(true)[0])
}$("thead tr",b).each(function(h){$("th:gt(0)",this).remove()
});$("tfoot tr",b).each(function(h){$("th:gt(0)",this).remove()
});$("tbody tr",b).each(function(h){$("td:gt(0)",this).remove()
});this.fnEqualiseHeights("tbody",f.parentNode,b);
var d=jQuery("thead tr th:eq(0)",c.nTable).outerWidth();
b.style.width=d+"px";g.nWrapper.style.width=d+"px"
},_fnCloneTRight:function(g){var c=this.fnGetSettings();
var f=$("tbody",c.nTable)[0];var b=g.nNode;var e=jQuery("tbody tr:eq(0) td",c.nTable).length;
var a=($.browser.msie&&($.browser.version=="6.0"||$.browser.version=="7.0"));
while(b.childNodes.length>0){b.removeChild(b.childNodes[0])
}b.appendChild(jQuery("thead",c.nTable).clone(true)[0]);
b.appendChild(jQuery("tbody",c.nTable).clone(true)[0]);
if(c.bFooter){b.appendChild(jQuery("tfoot",c.nTable).clone(true)[0])
}jQuery("thead tr th:not(:nth-child("+e+"n))",b).remove();
jQuery("tfoot tr th:not(:nth-child("+e+"n))",b).remove();
$("tbody tr",b).each(function(h){$("td:lt("+(e-1)+")",this).remove()
});this.fnEqualiseHeights("tbody",f.parentNode,b);
var d=jQuery("thead tr th:eq("+(e-1)+")",c.nTable).outerWidth();
b.style.width=d+"px";g.nWrapper.style.width=d+"px"
},fnEqualiseHeights:function(e,d,g){var f=this,c=$(e+" tr:eq(0)",d).children(":eq(0)"),b=c.outerHeight()-c.height(),a=($.browser.msie&&($.browser.version=="6.0"||$.browser.version=="7.0"));
$(e+" tr",g).each(function(h){if($.browser.mozilla||$.browser.opera){$(this).children().height($(e+" tr:eq("+h+")",d).outerHeight())
}else{$(this).children().height($(e+" tr:eq("+h+")",d).outerHeight()-b)
}if(!a){$(e+" tr:eq("+h+")",d).height($(e+" tr:eq("+h+")",d).outerHeight())
}})}};FixedHeader.oWin={iScrollTop:0,iScrollRight:0,iScrollBottom:0,iScrollLeft:0,iHeight:0,iWidth:0};
FixedHeader.oDoc={iHeight:0,iWidth:0};FixedHeader.afnScroll=[];
FixedHeader.fnMeasure=function(){var d=jQuery(window),c=jQuery(document),b=FixedHeader.oWin,a=FixedHeader.oDoc;
a.iHeight=c.height();a.iWidth=c.width();b.iHeight=d.height();
b.iWidth=d.width();b.iScrollTop=d.scrollTop();b.iScrollLeft=d.scrollLeft();
b.iScrollRight=a.iWidth-b.iScrollLeft-b.iWidth;b.iScrollBottom=a.iHeight-b.iScrollTop-b.iHeight
};FixedHeader.VERSION="2.0.6";FixedHeader.prototype.VERSION=FixedHeader.VERSION;
jQuery(window).scroll(function(){FixedHeader.fnMeasure();
for(var b=0,a=FixedHeader.afnScroll.length;b<a;b++){FixedHeader.afnScroll[b]()
}});console.log("=============== >  jqueryJSStuff/FixedHeader.js ");
jQuery.fn.print=function(){if(this.size()>1){this.eq(0).print();
return}else{if(!this.size()){return}}var d=("printer-"+(new Date()).getTime());
var e=$("<iframe id='"+d+"' name='"+d+"'>");e.css("width","1px").css("height","1px").css("position","absolute").css("left","-9999px").appendTo($("body:first"));
var b=window.frames[d];var a=b.document;var c=$("<div>").append($("style").clone());
a.open();a.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
a.write("<html>");a.write("<body>");a.write("<head>");
a.write("<title>");a.write(document.title);a.write("</title>");
a.write(c.html());a.write("</head>");a.write(this.html());
a.write("</body>");a.write("</html>");a.close();b.focus();
b.print();setTimeout(function(){e.remove()},(60*1000))
};console.log("=============== >  jqueryJSStuff/jquery.prints.js ");
(function(e){var b={},k,m,o,j=e.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),a=false;
e.tooltip={blocked:false,defaults:{delay:200,fade:false,showURL:true,extraClass:"",top:15,left:15,id:"tooltip"},block:function(){e.tooltip.blocked=!e.tooltip.blocked
}};e.fn.extend({tooltip:function(p){p=e.extend({},e.tooltip.defaults,p);
h(p);return this.each(function(){e.data(this,"tooltip",p);
this.tOpacity=b.parent.css("opacity");this.tooltipText=this.title;
e(this).removeAttr("title");this.alt=""}).mouseover(l).mouseout(f).click(f)
},fixPNG:j?function(){return this.each(function(){var p=e(this).css("backgroundImage");
if(p.match(/^url\(["']?(.*\.png)["']?\)$/i)){p=RegExp.$1;
e(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+p+"')"}).each(function(){var q=e(this).css("position");
if(q!="absolute"&&q!="relative"){e(this).css("position","relative")
}})}})}:function(){return this},unfixPNG:j?function(){return this.each(function(){e(this).css({filter:"",backgroundImage:""})
})}:function(){return this},hideWhenEmpty:function(){return this.each(function(){e(this)[e(this).html()?"show":"hide"]()
})},url:function(){return this.attr("href")||this.attr("src")
}});function h(p){if(b.parent){return}b.parent=e('<div id="'+p.id+'"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
if(e.fn.bgiframe){b.parent.bgiframe()}b.title=e("h3",b.parent);
b.body=e("div.body",b.parent);b.url=e("div.url",b.parent)
}function c(p){return e.data(p,"tooltip")}function g(p){if(c(this).delay){o=setTimeout(n,c(this).delay)
}else{n()}a=!!c(this).track;e(document.body).bind("mousemove",d);
d(p)}function l(){if(e.tooltip.blocked||this==k||(!this.tooltipText&&!c(this).bodyHandler)){return
}k=this;m=this.tooltipText;if(c(this).bodyHandler){b.title.hide();
var s=c(this).bodyHandler.call(this);if(s.nodeType||s.jquery){b.body.empty().append(s)
}else{b.body.html(s)}b.body.show()}else{if(c(this).showBody){var r=m.split(c(this).showBody);
b.title.html(r.shift()).show();b.body.empty();for(var q=0,p;
(p=r[q]);q++){if(q>0){b.body.append("<br/>")}b.body.append(p)
}b.body.hideWhenEmpty()}else{b.title.html(m).show();
b.body.hide()}}if(c(this).showURL&&e(this).url()){b.url.html(e(this).url().replace("http://","")).show()
}else{b.url.hide()}b.parent.addClass(c(this).extraClass);
if(c(this).fixPNG){b.parent.fixPNG()}g.apply(this,arguments)
}function n(){o=null;if((!j||!e.fn.bgiframe)&&c(k).fade){if(b.parent.is(":animated")){b.parent.stop().show().fadeTo(c(k).fade,k.tOpacity)
}else{b.parent.is(":visible")?b.parent.fadeTo(c(k).fade,k.tOpacity):b.parent.fadeIn(c(k).fade)
}}else{b.parent.show()}d()}function d(s){if(e.tooltip.blocked){return
}if(s&&s.target.tagName=="OPTION"){return}if(!a&&b.parent.is(":visible")){e(document.body).unbind("mousemove",d)
}if(k==null){e(document.body).unbind("mousemove",d);
return}b.parent.removeClass("viewport-right").removeClass("viewport-bottom");
var u=b.parent[0].offsetLeft;var t=b.parent[0].offsetTop;
if(s){u=s.pageX+c(k).left;t=s.pageY+c(k).top;var q="auto";
if(c(k).positionLeft){q=e(window).width()-u;u="auto"
}b.parent.css({left:u,right:q,top:t})}var p=i(),r=b.parent[0];
if(p.x+p.cx<r.offsetLeft+r.offsetWidth){u-=r.offsetWidth+20+c(k).left;
b.parent.css({left:u+"px"}).addClass("viewport-right")
}if(p.y+p.cy<r.offsetTop+r.offsetHeight){t-=r.offsetHeight+20+c(k).top;
b.parent.css({top:t+"px"}).addClass("viewport-bottom")
}}function i(){return{x:e(window).scrollLeft(),y:e(window).scrollTop(),cx:e(window).width(),cy:e(window).height()}
}function f(r){if(e.tooltip.blocked){return}if(o){clearTimeout(o)
}k=null;var q=c(this);function p(){b.parent.removeClass(q.extraClass).hide().css("opacity","")
}if((!j||!e.fn.bgiframe)&&q.fade){if(b.parent.is(":animated")){b.parent.stop().fadeTo(q.fade,0,p)
}else{b.parent.stop().fadeOut(q.fade,p)}}else{p()
}if(c(this).fixPNG){b.parent.unfixPNG()}}})(jQuery);
console.log("=============== >  jqueryJSStuff/jquery.tooltip.js ");
/*!
 * jQuery Form Plugin
 * version: 3.27.0-2013.02.06
 * @requires jQuery v1.5 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
;
(function(e){var c={};c.fileapi=e("<input type='file'/>").get(0).files!==undefined;
c.formdata=window.FormData!==undefined;e.fn.ajaxSubmit=function(h){if(!this.length){d("ajaxSubmit: skipping submit process - no element selected");
return this}var g,y,j,m=this;if(typeof h=="function"){h={success:h}
}g=this.attr("method");y=this.attr("action");j=(typeof y==="string")?e.trim(y):"";
j=j||window.location.href||"";if(j){j=(j.match(/^([^#]+)/)||[])[1]
}h=e.extend(true,{url:j,success:e.ajaxSettings.success,type:g||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},h);
var s={};this.trigger("form-pre-serialize",[this,h,s]);
if(s.veto){d("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this}if(h.beforeSerialize&&h.beforeSerialize(this,h)===false){d("ajaxSubmit: submit aborted via beforeSerialize callback");
return this}var l=h.traditional;if(l===undefined){l=e.ajaxSettings.traditional
}var p=[];var B,C=this.formToArray(h.semantic,p);
if(h.data){h.extraData=h.data;B=e.param(h.data,l)
}if(h.beforeSubmit&&h.beforeSubmit(C,this,h)===false){d("ajaxSubmit: submit aborted via beforeSubmit callback");
return this}this.trigger("form-submit-validate",[C,this,h,s]);
if(s.veto){d("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this}var w=e.param(C,l);if(B){w=(w?(w+"&"+B):B)
}if(h.type.toUpperCase()=="GET"){h.url+=(h.url.indexOf("?")>=0?"&":"?")+w;
h.data=null}else{h.data=w}var E=[];if(h.resetForm){E.push(function(){m.resetForm()
})}if(h.clearForm){E.push(function(){m.clearForm(h.includeHidden)
})}if(!h.dataType&&h.target){var i=h.success||function(){};
E.push(function(q){var k=h.replaceTarget?"replaceWith":"html";
e(h.target)[k](q).each(i,arguments)})}else{if(h.success){E.push(h.success)
}}h.success=function(H,q,I){var G=h.context||this;
for(var F=0,k=E.length;F<k;F++){E[F].apply(G,[H,q,I||m,m])
}};var A=e('input[type=file]:enabled[value!=""]',this);
var n=A.length>0;var z="multipart/form-data";var v=(m.attr("enctype")==z||m.attr("encoding")==z);
var u=c.fileapi&&c.formdata;d("fileAPI :"+u);var o=(n||v)&&!u;
var t;if(h.iframe!==false&&(h.iframe||o)){if(h.closeKeepAlive){e.get(h.closeKeepAlive,function(){t=D(C)
})}else{t=D(C)}}else{if((n||v)&&u){t=r(C)}else{t=e.ajax(h)
}}m.removeData("jqxhr").data("jqxhr",t);for(var x=0;
x<p.length;x++){p[x]=null}this.trigger("form-submit-notify",[this,h]);
return this;function f(H){var I=e.param(H).split("&");
var q=I.length;var k=[];var G,F;for(G=0;G<q;G++){I[G]=I[G].replace(/\+/g," ");
F=I[G].split("=");k.push([decodeURIComponent(F[0]),decodeURIComponent(F[1])])
}return k}function r(q){var k=new FormData();for(var F=0;
F<q.length;F++){k.append(q[F].name,q[F].value)}if(h.extraData){var I=f(h.extraData);
for(F=0;F<I.length;F++){if(I[F]){k.append(I[F][0],I[F][1])
}}}h.data=null;var H=e.extend(true,{},e.ajaxSettings,h,{contentType:false,processData:false,cache:false,type:g||"POST"});
if(h.uploadProgress){H.xhr=function(){var J=jQuery.ajaxSettings.xhr();
if(J.upload){J.upload.addEventListener("progress",function(N){var M=0;
var K=N.loaded||N.position;var L=N.total;if(N.lengthComputable){M=Math.ceil(K/L*100)
}h.uploadProgress(N,K,L,M)},false)}return J}}H.data=null;
var G=H.beforeSend;H.beforeSend=function(K,J){J.data=k;
if(G){G.call(this,K,J)}};return e.ajax(H)}function D(ad){var I=m[0],H,Z,T,ab,W,K,O,M,N,X,aa,R;
var L=!!e.fn.prop;var ag=e.Deferred();if(ad){for(Z=0;
Z<p.length;Z++){H=e(p[Z]);if(L){H.prop("disabled",false)
}else{H.removeAttr("disabled")}}}T=e.extend(true,{},e.ajaxSettings,h);
T.context=T.context||T;W="jqFormIO"+(new Date().getTime());
if(T.iframeTarget){K=e(T.iframeTarget);X=K.attr("name");
if(!X){K.attr("name",W)}else{W=X}}else{K=e('<iframe name="'+W+'" src="'+T.iframeSrc+'" />');
K.css({position:"absolute",top:"-1000px",left:"-1000px"})
}O=K[0];M={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(ah){var ai=(ah==="timeout"?"timeout":"aborted");
d("aborting upload... "+ai);this.aborted=1;try{if(O.contentWindow.document.execCommand){O.contentWindow.document.execCommand("Stop")
}}catch(aj){}K.attr("src",T.iframeSrc);M.error=ai;
if(T.error){T.error.call(T.context,M,ai,ah)}if(ab){e.event.trigger("ajaxError",[M,T,ai])
}if(T.complete){T.complete.call(T.context,M,ai)}}};
ab=T.global;if(ab&&0===e.active++){e.event.trigger("ajaxStart")
}if(ab){e.event.trigger("ajaxSend",[M,T])}if(T.beforeSend&&T.beforeSend.call(T.context,M,T)===false){if(T.global){e.active--
}ag.reject();return ag}if(M.aborted){ag.reject();
return ag}N=I.clk;if(N){X=N.name;if(X&&!N.disabled){T.extraData=T.extraData||{};
T.extraData[X]=N.value;if(N.type=="image"){T.extraData[X+".x"]=I.clk_x;
T.extraData[X+".y"]=I.clk_y}}}var S=1;var P=2;function Q(ai){var ah=ai.contentWindow?ai.contentWindow.document:ai.contentDocument?ai.contentDocument:ai.document;
return ah}var G=e("meta[name=csrf-token]").attr("content");
var F=e("meta[name=csrf-param]").attr("content");
if(F&&G){T.extraData=T.extraData||{};T.extraData[F]=G
}function Y(){var aj=m.attr("target"),ah=m.attr("action");
I.setAttribute("target",W);if(!g){I.setAttribute("method","POST")
}if(ah!=T.url){I.setAttribute("action",T.url)}if(!T.skipEncodingOverride&&(!g||/post/i.test(g))){m.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})
}if(T.timeout){R=setTimeout(function(){aa=true;V(S)
},T.timeout)}function ak(){try{var an=Q(O).readyState;
d("state = "+an);if(an&&an.toLowerCase()=="uninitialized"){setTimeout(ak,50)
}}catch(ao){d("Server abort: ",ao," (",ao.name,")");
V(P);if(R){clearTimeout(R)}R=undefined}}var ai=[];
try{if(T.extraData){for(var am in T.extraData){if(T.extraData.hasOwnProperty(am)){if(e.isPlainObject(T.extraData[am])&&T.extraData[am].hasOwnProperty("name")&&T.extraData[am].hasOwnProperty("value")){ai.push(e('<input type="hidden" name="'+T.extraData[am].name+'">').val(T.extraData[am].value).appendTo(I)[0])
}else{ai.push(e('<input type="hidden" name="'+am+'">').val(T.extraData[am]).appendTo(I)[0])
}}}}if(!T.iframeTarget){K.appendTo("body");if(O.attachEvent){O.attachEvent("onload",V)
}else{O.addEventListener("load",V,false)}}setTimeout(ak,15);
var al=document.createElement("form").submit;al.apply(I)
}finally{I.setAttribute("action",ah);if(aj){I.setAttribute("target",aj)
}else{m.removeAttr("target")}e(ai).remove()}}if(T.forceSync){Y()
}else{setTimeout(Y,10)}var ae,af,ac=50,J;function V(am){if(M.aborted||J){return
}try{af=Q(O)}catch(ap){d("cannot access response document: ",ap);
am=P}if(am===S&&M){M.abort("timeout");ag.reject(M,"timeout");
return}else{if(am==P&&M){M.abort("server abort");
ag.reject(M,"error","server abort");return}}if(!af||af.location.href==T.iframeSrc){if(!aa){return
}}if(O.detachEvent){O.detachEvent("onload",V)}else{O.removeEventListener("load",V,false)
}var ak="success",ao;try{if(aa){throw"timeout"}var aj=T.dataType=="xml"||af.XMLDocument||e.isXMLDoc(af);
d("isXml="+aj);if(!aj&&window.opera&&(af.body===null||!af.body.innerHTML)){if(--ac){d("requeing onLoad callback, DOM not available");
setTimeout(V,250);return}}var aq=af.body?af.body:af.documentElement;
M.responseText=aq?aq.innerHTML:null;M.responseXML=af.XMLDocument?af.XMLDocument:af;
if(aj){T.dataType="xml"}M.getResponseHeader=function(au){var at={"content-type":T.dataType};
return at[au]};if(aq){M.status=Number(aq.getAttribute("status"))||M.status;
M.statusText=aq.getAttribute("statusText")||M.statusText
}var ah=(T.dataType||"").toLowerCase();var an=/(json|script|text)/.test(ah);
if(an||T.textarea){var al=af.getElementsByTagName("textarea")[0];
if(al){M.responseText=al.value;M.status=Number(al.getAttribute("status"))||M.status;
M.statusText=al.getAttribute("statusText")||M.statusText
}else{if(an){var ai=af.getElementsByTagName("pre")[0];
var ar=af.getElementsByTagName("body")[0];if(ai){M.responseText=ai.textContent?ai.textContent:ai.innerText
}else{if(ar){M.responseText=ar.textContent?ar.textContent:ar.innerText
}}}}}else{if(ah=="xml"&&!M.responseXML&&M.responseText){M.responseXML=U(M.responseText)
}}try{ae=k(M,ah,T)}catch(am){ak="parsererror";M.error=ao=(am||ak)
}}catch(am){d("error caught: ",am);ak="error";M.error=ao=(am||ak)
}if(M.aborted){d("upload aborted");ak=null}if(M.status){ak=(M.status>=200&&M.status<300||M.status===304)?"success":"error"
}if(ak==="success"){if(T.success){T.success.call(T.context,ae,"success",M)
}ag.resolve(M.responseText,"success",M);if(ab){e.event.trigger("ajaxSuccess",[M,T])
}}else{if(ak){if(ao===undefined){ao=M.statusText}if(T.error){T.error.call(T.context,M,ak,ao)
}ag.reject(M,"error",ao);if(ab){e.event.trigger("ajaxError",[M,T,ao])
}}}if(ab){e.event.trigger("ajaxComplete",[M,T])}if(ab&&!--e.active){e.event.trigger("ajaxStop")
}if(T.complete){T.complete.call(T.context,M,ak)}J=true;
if(T.timeout){clearTimeout(R)}setTimeout(function(){if(!T.iframeTarget){K.remove()
}M.responseXML=null},100)}var U=e.parseXML||function(ah,ai){if(window.ActiveXObject){ai=new ActiveXObject("Microsoft.XMLDOM");
ai.async="false";ai.loadXML(ah)}else{ai=(new DOMParser()).parseFromString(ah,"text/xml")
}return(ai&&ai.documentElement&&ai.documentElement.nodeName!="parsererror")?ai:null
};var q=e.parseJSON||function(ah){return window["eval"]("("+ah+")")
};var k=function(am,ak,aj){var ai=am.getResponseHeader("content-type")||"",ah=ak==="xml"||!ak&&ai.indexOf("xml")>=0,al=ah?am.responseXML:am.responseText;
if(ah&&al.documentElement.nodeName==="parsererror"){if(e.error){e.error("parsererror")
}}if(aj&&aj.dataFilter){al=aj.dataFilter(al,ak)}if(typeof al==="string"){if(ak==="json"||!ak&&ai.indexOf("json")>=0){al=q(al)
}else{if(ak==="script"||!ak&&ai.indexOf("javascript")>=0){e.globalEval(al)
}}}return al};return ag}};e.fn.ajaxForm=function(f){f=f||{};
f.delegation=f.delegation&&e.isFunction(e.fn.on);
if(!f.delegation&&this.length===0){var g={s:this.selector,c:this.context};
if(!e.isReady&&g.s){d("DOM not ready, queuing ajaxForm");
e(function(){e(g.s,g.c).ajaxForm(f)});return this
}d("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)"));
return this}if(f.delegation){e(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,f,b).on("click.form-plugin",this.selector,f,a);
return this}return this.ajaxFormUnbind().bind("submit.form-plugin",f,b).bind("click.form-plugin",f,a)
};function b(g){var f=g.data;if(!g.isDefaultPrevented()){g.preventDefault();
e(this).ajaxSubmit(f)}}function a(j){var i=j.target;
var g=e(i);if(!(g.is("[type=submit],[type=image]"))){var f=g.closest("[type=submit]");
if(f.length===0){return}i=f[0]}var h=this;h.clk=i;
if(i.type=="image"){if(j.offsetX!==undefined){h.clk_x=j.offsetX;
h.clk_y=j.offsetY}else{if(typeof e.fn.offset=="function"){var k=g.offset();
h.clk_x=j.pageX-k.left;h.clk_y=j.pageY-k.top}else{h.clk_x=j.pageX-i.offsetLeft;
h.clk_y=j.pageY-i.offsetTop}}}setTimeout(function(){h.clk=h.clk_x=h.clk_y=null
},100)}e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")
};e.fn.formToArray=function(w,f){var u=[];if(this.length===0){return u
}var k=this[0];var o=w?k.getElementsByTagName("*"):k.elements;
if(!o){return u}var q,p,m,x,l,s,h;for(q=0,s=o.length;
q<s;q++){l=o[q];m=l.name;if(!m){continue}if(w&&k.clk&&l.type=="image"){if(!l.disabled&&k.clk==l){u.push({name:m,value:e(l).val(),type:l.type});
u.push({name:m+".x",value:k.clk_x},{name:m+".y",value:k.clk_y})
}continue}x=e.fieldValue(l,true);if(x&&x.constructor==Array){if(f){f.push(l)
}for(p=0,h=x.length;p<h;p++){u.push({name:m,value:x[p]})
}}else{if(c.fileapi&&l.type=="file"&&!l.disabled){if(f){f.push(l)
}var g=l.files;if(g.length){for(p=0;p<g.length;p++){u.push({name:m,value:g[p],type:l.type})
}}else{u.push({name:m,value:"",type:l.type})}}else{if(x!==null&&typeof x!="undefined"){if(f){f.push(l)
}u.push({name:m,value:x,type:l.type,required:l.required})
}}}}if(!w&&k.clk){var r=e(k.clk),t=r[0];m=t.name;
if(m&&!t.disabled&&t.type=="image"){u.push({name:m,value:r.val()});
u.push({name:m+".x",value:k.clk_x},{name:m+".y",value:k.clk_y})
}}return u};e.fn.formSerialize=function(f){return e.param(this.formToArray(f))
};e.fn.fieldSerialize=function(g){var f=[];this.each(function(){var l=this.name;
if(!l){return}var j=e.fieldValue(this,g);if(j&&j.constructor==Array){for(var k=0,h=j.length;
k<h;k++){f.push({name:l,value:j[k]})}}else{if(j!==null&&typeof j!="undefined"){f.push({name:this.name,value:j})
}}});return e.param(f)};e.fn.fieldValue=function(l){for(var k=[],h=0,f=this.length;
h<f;h++){var j=this[h];var g=e.fieldValue(j,l);if(g===null||typeof g=="undefined"||(g.constructor==Array&&!g.length)){continue
}if(g.constructor==Array){e.merge(k,g)}else{k.push(g)
}}return k};e.fieldValue=function(f,m){var h=f.name,s=f.type,u=f.tagName.toLowerCase();
if(m===undefined){m=true}if(m&&(!h||f.disabled||s=="reset"||s=="button"||(s=="checkbox"||s=="radio")&&!f.checked||(s=="submit"||s=="image")&&f.form&&f.form.clk!=f||u=="select"&&f.selectedIndex==-1)){return null
}if(u=="select"){var o=f.selectedIndex;if(o<0){return null
}var q=[],g=f.options;var k=(s=="select-one");var p=(k?o+1:g.length);
for(var j=(k?o:0);j<p;j++){var l=g[j];if(l.selected){var r=l.value;
if(!r){r=(l.attributes&&l.attributes.value&&!(l.attributes.value.specified))?l.text:l.value
}if(k){return r}q.push(r)}}return q}return e(f).val()
};e.fn.clearForm=function(f){return this.each(function(){e("input,select,textarea",this).clearFields(f)
})};e.fn.clearFields=e.fn.clearInputs=function(f){var g=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function(){var i=this.type,h=this.tagName.toLowerCase();
if(g.test(i)||h=="textarea"){this.value=""}else{if(i=="checkbox"||i=="radio"){this.checked=false
}else{if(h=="select"){this.selectedIndex=-1}else{if(i=="file"){if(/MSIE/.test(navigator.userAgent)){e(this).replaceWith(e(this).clone())
}else{e(this).val("")}}else{if(f){if((f===true&&/hidden/.test(i))||(typeof f=="string"&&e(this).is(f))){this.value=""
}}}}}}})};e.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()
}})};e.fn.enable=function(f){if(f===undefined){f=true
}return this.each(function(){this.disabled=!f})};
e.fn.selected=function(f){if(f===undefined){f=true
}return this.each(function(){var g=this.type;if(g=="checkbox"||g=="radio"){this.checked=f
}else{if(this.tagName.toLowerCase()=="option"){var h=e(this).parent("select");
if(f&&h[0]&&h[0].type=="select-one"){h.find("option").selected(false)
}this.selected=f}}})};e.fn.ajaxSubmit.debug=false;
function d(){if(!e.fn.ajaxSubmit.debug){return}var f="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){window.console.log(f)
}else{if(window.opera&&window.opera.postError){window.opera.postError(f)
}}}})(jQuery);console.log("=============== >  jqueryJSStuff/jquery.form.js ");
/*!
 * jQuery Migrate - v1.4.1 - 2016-05-19
 * Copyright jQuery Foundation and other contributors
 */
(function(u,I,j){u.migrateVersion="1.4.1";
var p={};u.migrateWarnings=[];if(I.console&&I.console.log){I.console.log("JQMIGRATE: Migrate is installed"+(u.migrateMute?"":" with logging active")+", version "+u.migrateVersion)
}if(u.migrateTrace===j){u.migrateTrace=true}u.migrateReset=function(){p={};
u.migrateWarnings.length=0};function K(R){var Q=I.console;
if(!p[R]){p[R]=true;u.migrateWarnings.push(R);if(Q&&Q.warn&&!u.migrateMute){Q.warn("JQMIGRATE: "+R);
if(u.migrateTrace&&Q.trace){Q.trace()}}}}function s(S,U,R,T){if(Object.defineProperty){try{Object.defineProperty(S,U,{configurable:true,enumerable:true,get:function(){K(T);
return R},set:function(V){K(T);R=V}});return}catch(Q){}}u._definePropertyBroken=true;
S[U]=R}if(document.compatMode==="BackCompat"){K("jQuery is not compatible with Quirks Mode")
}var G=u("<input/>",{size:1}).attr("size")&&u.attrFn,M=u.attr,H=u.attrHooks.value&&u.attrHooks.value.get||function(){return null
},r=u.attrHooks.value&&u.attrHooks.value.set||function(){return j
},w=/^(?:input|button)$/i,o=/^[238]$/,O=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;
s(u,"attrFn",G||{},"jQuery.attrFn is deprecated");
u.attr=function(U,S,V,T){var R=S.toLowerCase(),Q=U&&U.nodeType;
if(T){if(M.length<4){K("jQuery.fn.attr( props, pass ) is deprecated")
}if(U&&!o.test(Q)&&(G?S in G:u.isFunction(u.fn[S]))){return u(U)[S](V)
}}if(S==="type"&&V!==j&&w.test(U.nodeName)&&U.parentNode){K("Can't change the 'type' of an input or button in IE 6/7/8")
}if(!u.attrHooks[R]&&O.test(R)){u.attrHooks[R]={get:function(X,W){var Z,Y=u.prop(X,W);
return Y===true||typeof Y!=="boolean"&&(Z=X.getAttributeNode(W))&&Z.nodeValue!==false?W.toLowerCase():j
},set:function(X,Z,W){var Y;if(Z===false){u.removeAttr(X,W)
}else{Y=u.propFix[W]||W;if(Y in X){X[Y]=true}X.setAttribute(W,W.toLowerCase())
}return W}};if(f.test(R)){K("jQuery.fn.attr('"+R+"') might use property instead of attribute")
}}return M.call(u,U,S,V)};u.attrHooks.value={get:function(R,Q){var S=(R.nodeName||"").toLowerCase();
if(S==="button"){return H.apply(this,arguments)}if(S!=="input"&&S!=="option"){K("jQuery.fn.attr('value') no longer gets properties")
}return Q in R?R.value:null},set:function(Q,R){var S=(Q.nodeName||"").toLowerCase();
if(S==="button"){return r.apply(this,arguments)}if(S!=="input"&&S!=="option"){K("jQuery.fn.attr('value', val) no longer sets properties")
}Q.value=R}};var h,b,t=u.fn.init,k=u.find,y=u.parseJSON,v=/^\s*</,l=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,A=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,F=/^([^<]*)(<[\w\W]+>)([^>]*)$/;
u.fn.init=function(Q,U,T){var S,R;if(Q&&typeof Q==="string"){if(!u.isPlainObject(U)&&(S=F.exec(u.trim(Q)))&&S[0]){if(!v.test(Q)){K("$(html) HTML strings must start with '<' character")
}if(S[3]){K("$(html) HTML text after last tag is ignored")
}if(S[0].charAt(0)==="#"){K("HTML string cannot start with a '#' character");
u.error("JQMIGRATE: Invalid selector string (XSS)")
}if(U&&U.context&&U.context.nodeType){U=U.context
}if(u.parseHTML){return t.call(this,u.parseHTML(S[2],U&&U.ownerDocument||U||document,true),U,T)
}}}R=t.apply(this,arguments);if(Q&&Q.selector!==j){R.selector=Q.selector;
R.context=Q.context}else{R.selector=typeof Q==="string"?Q:"";
if(Q){R.context=Q.nodeType?Q:U||document}}return R
};u.fn.init.prototype=u.fn;u.find=function(Q){var T=Array.prototype.slice.call(arguments);
if(typeof Q==="string"&&l.test(Q)){try{document.querySelector(Q)
}catch(S){Q=Q.replace(A,function(V,U,X,W){return"["+U+X+'"'+W+'"]'
});try{document.querySelector(Q);K("Attribute selector with '#' must be quoted: "+T[0]);
T[0]=Q}catch(R){K("Attribute selector with '#' was not fixed: "+T[0])
}}}return k.apply(this,T)};var N;for(N in k){if(Object.prototype.hasOwnProperty.call(k,N)){u.find[N]=k[N]
}}u.parseJSON=function(Q){if(!Q){K("jQuery.parseJSON requires a valid JSON string");
return null}return y.apply(this,arguments)};u.uaMatch=function(R){R=R.toLowerCase();
var Q=/(chrome)[ \/]([\w.]+)/.exec(R)||/(webkit)[ \/]([\w.]+)/.exec(R)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(R)||/(msie) ([\w.]+)/.exec(R)||R.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(R)||[];
return{browser:Q[1]||"",version:Q[2]||"0"}};if(!u.browser){h=u.uaMatch(navigator.userAgent);
b={};if(h.browser){b[h.browser]=true;b.version=h.version
}if(b.chrome){b.webkit=true}else{if(b.webkit){b.safari=true
}}u.browser=b}s(u,"browser",u.browser,"jQuery.browser is deprecated");
u.boxModel=u.support.boxModel=(document.compatMode==="CSS1Compat");
s(u,"boxModel",u.boxModel,"jQuery.boxModel is deprecated");
s(u.support,"boxModel",u.support.boxModel,"jQuery.support.boxModel is deprecated");
u.sub=function(){function Q(T,U){return new Q.fn.init(T,U)
}u.extend(true,Q,this);Q.superclass=this;Q.fn=Q.prototype=this();
Q.fn.constructor=Q;Q.sub=this.sub;Q.fn.init=function S(U,V){var T=u.fn.init.call(this,U,V,R);
return T instanceof Q?T:Q(T)};Q.fn.init.prototype=Q.fn;
var R=Q(document);K("jQuery.sub() is deprecated");
return Q};u.fn.size=function(){K("jQuery.fn.size() is deprecated; use the .length property");
return this.length};var n=false;if(u.swap){u.each(["height","width","reliableMarginRight"],function(R,Q){var S=u.cssHooks[Q]&&u.cssHooks[Q].get;
if(S){u.cssHooks[Q].get=function(){var T;n=true;T=S.apply(this,arguments);
n=false;return T}}})}u.swap=function(V,U,W,T){var S,R,Q={};
if(!n){K("jQuery.swap() is undocumented and deprecated")
}for(R in U){Q[R]=V.style[R];V.style[R]=U[R]}S=W.apply(V,T||[]);
for(R in U){V.style[R]=Q[R]}return S};u.ajaxSetup({converters:{"text json":u.parseJSON}});
var L=u.fn.data;u.fn.data=function(S){var R,Q,T=this[0];
if(T&&S==="events"&&arguments.length===1){R=u.data(T,S);
Q=u._data(T,S);if((R===j||R===Q)&&Q!==j){K("Use of jQuery.fn.data('events') is deprecated");
return Q}}return L.apply(this,arguments)};var P=/\/(java|ecma)script/i;
if(!u.clean){u.clean=function(Q,R,X,T){R=R||document;
R=!R.nodeType&&R[0]||R;R=R.ownerDocument||R;K("jQuery.clean() is deprecated");
var U,S,V,Y,W=[];u.merge(W,u.buildFragment(Q,R).childNodes);
if(X){V=function(Z){if(!Z.type||P.test(Z.type)){return T?T.push(Z.parentNode?Z.parentNode.removeChild(Z):Z):X.appendChild(Z)
}};for(U=0;(S=W[U])!=null;U++){if(!(u.nodeName(S,"script")&&V(S))){X.appendChild(S);
if(typeof S.getElementsByTagName!=="undefined"){Y=u.grep(u.merge([],S.getElementsByTagName("script")),V);
W.splice.apply(W,[U+1,0].concat(Y));U+=Y.length}}}}return W
}}var C=u.event.add,x=u.event.remove,q=u.event.trigger,a=u.fn.toggle,d=u.fn.live,z=u.fn.die,m=u.fn.load,g="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",i=new RegExp("\\b(?:"+g+")\\b"),J=/(?:^|\s)hover(\.\S+|)\b/,c=function(Q){if(typeof(Q)!=="string"||u.event.special.hover){return Q
}if(J.test(Q)){K("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")
}return Q&&Q.replace(J,"mouseenter$1 mouseleave$1")
};if(u.event.props&&u.event.props[0]!=="attrChange"){u.event.props.unshift("attrChange","attrName","relatedNode","srcElement")
}if(u.event.dispatch){s(u.event,"handle",u.event.dispatch,"jQuery.event.handle is undocumented and deprecated")
}u.event.add=function(T,R,S,U,Q){if(T!==document&&i.test(R)){K("AJAX events should be attached to document: "+R)
}C.call(this,T,c(R||""),S,U,Q)};u.event.remove=function(U,S,T,Q,R){x.call(this,U,c(S)||"",T,Q,R)
};u.each(["load","unload","error"],function(R,Q){u.fn[Q]=function(){var S=Array.prototype.slice.call(arguments,0);
if(Q==="load"&&typeof S[0]==="string"){return m.apply(this,S)
}K("jQuery.fn."+Q+"() is deprecated");S.splice(0,0,Q);
if(arguments.length){return this.bind.apply(this,S)
}this.triggerHandler.apply(this,S);return this}});
u.fn.toggle=function(U,S){if(!u.isFunction(U)||!u.isFunction(S)){return a.apply(this,arguments)
}K("jQuery.fn.toggle(handler, handler...) is deprecated");
var R=arguments,Q=U.guid||u.guid++,T=0,V=function(W){var X=(u._data(this,"lastToggle"+U.guid)||0)%T;
u._data(this,"lastToggle"+U.guid,X+1);W.preventDefault();
return R[X].apply(this,arguments)||false};V.guid=Q;
while(T<R.length){R[T++].guid=Q}return this.click(V)
};u.fn.live=function(Q,S,R){K("jQuery.fn.live() is deprecated");
if(d){return d.apply(this,arguments)}u(this.context).on(Q,this.selector,S,R);
return this};u.fn.die=function(Q,R){K("jQuery.fn.die() is deprecated");
if(z){return z.apply(this,arguments)}u(this.context).off(Q,this.selector||"**",R);
return this};u.event.trigger=function(S,T,R,Q){if(!R&&!i.test(S)){K("Global events are undocumented and deprecated")
}return q.call(this,S,T,R||document,Q)};u.each(g.split("|"),function(R,Q){u.event.special[Q]={setup:function(){var S=this;
if(S!==document){u.event.add(document,Q+"."+u.guid,function(){u.event.trigger(Q,Array.prototype.slice.call(arguments,1),S,true)
});u._data(this,Q,u.guid++)}return false},teardown:function(){if(this!==document){u.event.remove(document,Q+"."+u._data(this,Q))
}return false}}});u.event.special.ready={setup:function(){if(this===document){K("'ready' event is deprecated")
}}};var E=u.fn.andSelf||u.fn.addBack,B=u.fn.find;
u.fn.andSelf=function(){K("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
return E.apply(this,arguments)};u.fn.find=function(Q){var R=B.apply(this,arguments);
R.context=this.context;R.selector=this.selector?this.selector+" "+Q:Q;
return R};if(u.Callbacks){var D=u.Deferred,e=[["resolve","done",u.Callbacks("once memory"),u.Callbacks("once memory"),"resolved"],["reject","fail",u.Callbacks("once memory"),u.Callbacks("once memory"),"rejected"],["notify","progress",u.Callbacks("memory"),u.Callbacks("memory")]];
u.Deferred=function(R){var Q=D(),S=Q.promise();Q.pipe=S.pipe=function(){var T=arguments;
K("deferred.pipe() is deprecated");return u.Deferred(function(U){u.each(e,function(W,V){var X=u.isFunction(T[W])&&T[W];
Q[V[1]](function(){var Y=X&&X.apply(this,arguments);
if(Y&&u.isFunction(Y.promise)){Y.promise().done(U.resolve).fail(U.reject).progress(U.notify)
}else{U[V[0]+"With"](this===S?U.promise():this,X?[Y]:arguments)
}})});T=null}).promise()};Q.isResolved=function(){K("deferred.isResolved is deprecated");
return Q.state()==="resolved"};Q.isRejected=function(){K("deferred.isRejected is deprecated");
return Q.state()==="rejected"};if(R){R.call(Q,Q)}return Q
}}})(jQuery,window);console.log("=============== >  jqueryJSStuff/jquery-migrate-1.4.1.js ");
if(!document.createElement("canvas").getContext){(function(){var ab=Math;
var n=ab.round;var l=ab.sin;var A=ab.cos;var H=ab.abs;
var N=ab.sqrt;var d=10;var f=d/2;var z=+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];
function y(){return this.context_||(this.context_=new D(this))
}var t=Array.prototype.slice;function g(j,m,p){var i=t.call(arguments,2);
return function(){return j.apply(m,i.concat(t.call(arguments)))
}}function af(i){return String(i).replace(/&/g,"&amp;").replace(/"/g,"&quot;")
}function Y(m,j,i){if(!m.namespaces[j]){m.namespaces.add(j,i,"#default#VML")
}}function R(j){Y(j,"g_vml_","urn:schemas-microsoft-com:vml");
Y(j,"g_o_","urn:schemas-microsoft-com:office:office");
if(!j.styleSheets.ex_canvas_){var i=j.createStyleSheet();
i.owningElement.id="ex_canvas_";i.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
}}R(document);var e={init:function(i){var j=i||document;
j.createElement("canvas");j.attachEvent("onreadystatechange",g(this.init_,this,j))
},init_:function(p){var m=p.getElementsByTagName("canvas");
for(var j=0;j<m.length;j++){this.initElement(m[j])
}},initElement:function(j){if(!j.getContext){j.getContext=y;
R(j.ownerDocument);j.innerHTML="";j.attachEvent("onpropertychange",x);
j.attachEvent("onresize",W);var i=j.attributes;if(i.width&&i.width.specified){j.style.width=i.width.nodeValue+"px"
}else{j.width=j.clientWidth}if(i.height&&i.height.specified){j.style.height=i.height.nodeValue+"px"
}else{j.height=j.clientHeight}}return j}};function x(j){var i=j.srcElement;
switch(j.propertyName){case"width":i.getContext().clearRect();
i.style.width=i.attributes.width.nodeValue+"px";i.firstChild.style.width=i.clientWidth+"px";
break;case"height":i.getContext().clearRect();i.style.height=i.attributes.height.nodeValue+"px";
i.firstChild.style.height=i.clientHeight+"px";break
}}function W(j){var i=j.srcElement;if(i.firstChild){i.firstChild.style.width=i.clientWidth+"px";
i.firstChild.style.height=i.clientHeight+"px"}}e.init();
var k=[];for(var ae=0;ae<16;ae++){for(var ad=0;ad<16;
ad++){k[ae*16+ad]=ae.toString(16)+ad.toString(16)
}}function B(){return[[1,0,0],[0,1,0],[0,0,1]]}function J(p,m){var j=B();
for(var i=0;i<3;i++){for(var ah=0;ah<3;ah++){var Z=0;
for(var ag=0;ag<3;ag++){Z+=p[i][ag]*m[ag][ah]}j[i][ah]=Z
}}return j}function v(j,i){i.fillStyle=j.fillStyle;
i.lineCap=j.lineCap;i.lineJoin=j.lineJoin;i.lineWidth=j.lineWidth;
i.miterLimit=j.miterLimit;i.shadowBlur=j.shadowBlur;
i.shadowColor=j.shadowColor;i.shadowOffsetX=j.shadowOffsetX;
i.shadowOffsetY=j.shadowOffsetY;i.strokeStyle=j.strokeStyle;
i.globalAlpha=j.globalAlpha;i.font=j.font;i.textAlign=j.textAlign;
i.textBaseline=j.textBaseline;i.arcScaleX_=j.arcScaleX_;
i.arcScaleY_=j.arcScaleY_;i.lineScale_=j.lineScale_
}var b={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"};
function M(j){var p=j.indexOf("(",3);var i=j.indexOf(")",p+1);
var m=j.substring(p+1,i).split(",");if(m.length!=4||j.charAt(3)!="a"){m[3]=1
}return m}function c(i){return parseFloat(i)/100}function r(j,m,i){return Math.min(i,Math.max(m,j))
}function I(ag){var i,ai,aj,ah,ak,Z;ah=parseFloat(ag[0])/360%360;
if(ah<0){ah++}ak=r(c(ag[1]),0,1);Z=r(c(ag[2]),0,1);
if(ak==0){i=ai=aj=Z}else{var j=Z<0.5?Z*(1+ak):Z+ak-Z*ak;
var m=2*Z-j;i=a(m,j,ah+1/3);ai=a(m,j,ah);aj=a(m,j,ah-1/3)
}return"#"+k[Math.floor(i*255)]+k[Math.floor(ai*255)]+k[Math.floor(aj*255)]
}function a(j,i,m){if(m<0){m++}if(m>1){m--}if(6*m<1){return j+(i-j)*6*m
}else{if(2*m<1){return i}else{if(3*m<2){return j+(i-j)*(2/3-m)*6
}else{return j}}}}var C={};function F(j){if(j in C){return C[j]
}var ag,Z=1;j=String(j);if(j.charAt(0)=="#"){ag=j
}else{if(/^rgb/.test(j)){var p=M(j);var ag="#",ah;
for(var m=0;m<3;m++){if(p[m].indexOf("%")!=-1){ah=Math.floor(c(p[m])*255)
}else{ah=+p[m]}ag+=k[r(ah,0,255)]}Z=+p[3]}else{if(/^hsl/.test(j)){var p=M(j);
ag=I(p);Z=p[3]}else{ag=b[j]||j}}}return C[j]={color:ag,alpha:Z}
}var o={style:"normal",variant:"normal",weight:"normal",size:10,family:"sans-serif"};
var L={};function E(i){if(L[i]){return L[i]}var p=document.createElement("div");
var m=p.style;try{m.font=i}catch(j){}return L[i]={style:m.fontStyle||o.style,variant:m.fontVariant||o.variant,weight:m.fontWeight||o.weight,size:m.fontSize||o.size,family:m.fontFamily||o.family}
}function u(m,j){var i={};for(var ah in m){i[ah]=m[ah]
}var ag=parseFloat(j.currentStyle.fontSize),Z=parseFloat(m.size);
if(typeof m.size=="number"){i.size=m.size}else{if(m.size.indexOf("px")!=-1){i.size=Z
}else{if(m.size.indexOf("em")!=-1){i.size=ag*Z}else{if(m.size.indexOf("%")!=-1){i.size=(ag/100)*Z
}else{if(m.size.indexOf("pt")!=-1){i.size=Z/0.75}else{i.size=ag
}}}}}i.size*=0.981;return i}function ac(i){return i.style+" "+i.variant+" "+i.weight+" "+i.size+"px "+i.family
}var s={butt:"flat",round:"round"};function S(i){return s[i]||"square"
}function D(i){this.m_=B();this.mStack_=[];this.aStack_=[];
this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#000";
this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";
this.miterLimit=d*1;this.globalAlpha=1;this.font="10px sans-serif";
this.textAlign="left";this.textBaseline="alphabetic";
this.canvas=i;var m="width:"+i.clientWidth+"px;height:"+i.clientHeight+"px;overflow:hidden;position:absolute";
var j=i.ownerDocument.createElement("div");j.style.cssText=m;
i.appendChild(j);var p=j.cloneNode(false);p.style.backgroundColor="red";
p.style.filter="alpha(opacity=0)";i.appendChild(p);
this.element_=j;this.arcScaleX_=1;this.arcScaleY_=1;
this.lineScale_=1}var q=D.prototype;q.clearRect=function(){if(this.textMeasureEl_){this.textMeasureEl_.removeNode(true);
this.textMeasureEl_=null}this.element_.innerHTML=""
};q.beginPath=function(){this.currentPath_=[]};q.moveTo=function(j,i){var m=V(this,j,i);
this.currentPath_.push({type:"moveTo",x:m.x,y:m.y});
this.currentX_=m.x;this.currentY_=m.y};q.lineTo=function(j,i){var m=V(this,j,i);
this.currentPath_.push({type:"lineTo",x:m.x,y:m.y});
this.currentX_=m.x;this.currentY_=m.y};q.bezierCurveTo=function(m,j,ak,aj,ai,ag){var i=V(this,ai,ag);
var ah=V(this,m,j);var Z=V(this,ak,aj);K(this,ah,Z,i)
};function K(i,Z,m,j){i.currentPath_.push({type:"bezierCurveTo",cp1x:Z.x,cp1y:Z.y,cp2x:m.x,cp2y:m.y,x:j.x,y:j.y});
i.currentX_=j.x;i.currentY_=j.y}q.quadraticCurveTo=function(ai,m,j,i){var ah=V(this,ai,m);
var ag=V(this,j,i);var aj={x:this.currentX_+2/3*(ah.x-this.currentX_),y:this.currentY_+2/3*(ah.y-this.currentY_)};
var Z={x:aj.x+(ag.x-this.currentX_)/3,y:aj.y+(ag.y-this.currentY_)/3};
K(this,aj,Z,ag)};q.arc=function(al,aj,ak,ag,j,m){ak*=d;
var ap=m?"at":"wa";var am=al+A(ag)*ak-f;var ao=aj+l(ag)*ak-f;
var i=al+A(j)*ak-f;var an=aj+l(j)*ak-f;if(am==i&&!m){am+=0.125
}var Z=V(this,al,aj);var ai=V(this,am,ao);var ah=V(this,i,an);
this.currentPath_.push({type:ap,x:Z.x,y:Z.y,radius:ak,xStart:ai.x,yStart:ai.y,xEnd:ah.x,yEnd:ah.y})
};q.rect=function(m,j,i,p){this.moveTo(m,j);this.lineTo(m+i,j);
this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath()
};q.strokeRect=function(m,j,i,p){var Z=this.currentPath_;
this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);
this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();
this.stroke();this.currentPath_=Z};q.fillRect=function(m,j,i,p){var Z=this.currentPath_;
this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);
this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();
this.fill();this.currentPath_=Z};q.createLinearGradient=function(j,p,i,m){var Z=new U("gradient");
Z.x0_=j;Z.y0_=p;Z.x1_=i;Z.y1_=m;return Z};q.createRadialGradient=function(p,ag,m,j,Z,i){var ah=new U("gradientradial");
ah.x0_=p;ah.y0_=ag;ah.r0_=m;ah.x1_=j;ah.y1_=Z;ah.r1_=i;
return ah};q.drawImage=function(aq,m){var aj,ah,al,ay,ao,am,at,aA;
var ak=aq.runtimeStyle.width;var ap=aq.runtimeStyle.height;
aq.runtimeStyle.width="auto";aq.runtimeStyle.height="auto";
var ai=aq.width;var aw=aq.height;aq.runtimeStyle.width=ak;
aq.runtimeStyle.height=ap;if(arguments.length==3){aj=arguments[1];
ah=arguments[2];ao=am=0;at=al=ai;aA=ay=aw}else{if(arguments.length==5){aj=arguments[1];
ah=arguments[2];al=arguments[3];ay=arguments[4];ao=am=0;
at=ai;aA=aw}else{if(arguments.length==9){ao=arguments[1];
am=arguments[2];at=arguments[3];aA=arguments[4];aj=arguments[5];
ah=arguments[6];al=arguments[7];ay=arguments[8]}else{throw Error("Invalid number of arguments")
}}}var az=V(this,aj,ah);var p=at/2;var j=aA/2;var ax=[];
var i=10;var ag=10;ax.push(" <g_vml_:group",' coordsize="',d*i,",",d*ag,'"',' coordorigin="0,0"',' style="width:',i,"px;height:",ag,"px;position:absolute;");
if(this.m_[0][0]!=1||this.m_[0][1]||this.m_[1][1]!=1||this.m_[1][0]){var Z=[];
Z.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",n(az.x/d),",","Dy=",n(az.y/d),"");
var av=az;var au=V(this,aj+al,ah);var ar=V(this,aj,ah+ay);
var an=V(this,aj+al,ah+ay);av.x=ab.max(av.x,au.x,ar.x,an.x);
av.y=ab.max(av.y,au.y,ar.y,an.y);ax.push("padding:0 ",n(av.x/d),"px ",n(av.y/d),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",Z.join(""),", sizingmethod='clip');")
}else{ax.push("top:",n(az.y/d),"px;left:",n(az.x/d),"px;")
}ax.push(' ">','<g_vml_:image src="',aq.src,'"',' style="width:',d*al,"px;"," height:",d*ay,'px"',' cropleft="',ao/ai,'"',' croptop="',am/aw,'"',' cropright="',(ai-ao-at)/ai,'"',' cropbottom="',(aw-am-aA)/aw,'"'," />","</g_vml_:group>");
this.element_.insertAdjacentHTML("BeforeEnd",ax.join(""))
};q.stroke=function(ao){var Z=10;var ap=10;var ag=5000;
var ai={x:null,y:null};var an={x:null,y:null};for(var aj=0;
aj<this.currentPath_.length;aj+=ag){var am=[];var ah=false;
am.push("<g_vml_:shape",' filled="',!!ao,'"',' style="position:absolute;width:',Z,"px;height:",ap,'px;"',' coordorigin="0,0"',' coordsize="',d*Z,",",d*ap,'"',' stroked="',!ao,'"',' path="');
var aq=false;for(var ak=aj;ak<Math.min(aj+ag,this.currentPath_.length);
ak++){if(ak%ag==0&&ak>0){am.push(" m ",n(this.currentPath_[ak-1].x),",",n(this.currentPath_[ak-1].y))
}var m=this.currentPath_[ak];var al;switch(m.type){case"moveTo":al=m;
am.push(" m ",n(m.x),",",n(m.y));break;case"lineTo":am.push(" l ",n(m.x),",",n(m.y));
break;case"close":am.push(" x ");m=null;break;case"bezierCurveTo":am.push(" c ",n(m.cp1x),",",n(m.cp1y),",",n(m.cp2x),",",n(m.cp2y),",",n(m.x),",",n(m.y));
break;case"at":case"wa":am.push(" ",m.type," ",n(m.x-this.arcScaleX_*m.radius),",",n(m.y-this.arcScaleY_*m.radius)," ",n(m.x+this.arcScaleX_*m.radius),",",n(m.y+this.arcScaleY_*m.radius)," ",n(m.xStart),",",n(m.yStart)," ",n(m.xEnd),",",n(m.yEnd));
break}if(m){if(ai.x==null||m.x<ai.x){ai.x=m.x}if(an.x==null||m.x>an.x){an.x=m.x
}if(ai.y==null||m.y<ai.y){ai.y=m.y}if(an.y==null||m.y>an.y){an.y=m.y
}}}am.push(' ">');if(!ao){w(this,am)}else{G(this,am,ai,an)
}am.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",am.join(""))
}};function w(m,ag){var j=F(m.strokeStyle);var p=j.color;
var Z=j.alpha*m.globalAlpha;var i=m.lineScale_*m.lineWidth;
if(i<1){Z*=i}ag.push("<g_vml_:stroke",' opacity="',Z,'"',' joinstyle="',m.lineJoin,'"',' miterlimit="',m.miterLimit,'"',' endcap="',S(m.lineCap),'"',' weight="',i,'px"',' color="',p,'" />')
}function G(aq,ai,aK,ar){var aj=aq.fillStyle;var aB=aq.arcScaleX_;
var aA=aq.arcScaleY_;var j=ar.x-aK.x;var p=ar.y-aK.y;
if(aj instanceof U){var an=0;var aF={x:0,y:0};var ax=0;
var am=1;if(aj.type_=="gradient"){var al=aj.x0_/aB;
var m=aj.y0_/aA;var ak=aj.x1_/aB;var aM=aj.y1_/aA;
var aJ=V(aq,al,m);var aI=V(aq,ak,aM);var ag=aI.x-aJ.x;
var Z=aI.y-aJ.y;an=Math.atan2(ag,Z)*180/Math.PI;if(an<0){an+=360
}if(an<0.000001){an=0}}else{var aJ=V(aq,aj.x0_,aj.y0_);
aF={x:(aJ.x-aK.x)/j,y:(aJ.y-aK.y)/p};j/=aB*d;p/=aA*d;
var aD=ab.max(j,p);ax=2*aj.r0_/aD;am=2*aj.r1_/aD-ax
}var av=aj.colors_;av.sort(function(aN,i){return aN.offset-i.offset
});var ap=av.length;var au=av[0].color;var at=av[ap-1].color;
var az=av[0].alpha*aq.globalAlpha;var ay=av[ap-1].alpha*aq.globalAlpha;
var aE=[];for(var aH=0;aH<ap;aH++){var ao=av[aH];
aE.push(ao.offset*am+ax+" "+ao.color)}ai.push('<g_vml_:fill type="',aj.type_,'"',' method="none" focus="100%"',' color="',au,'"',' color2="',at,'"',' colors="',aE.join(","),'"',' opacity="',ay,'"',' g_o_:opacity2="',az,'"',' angle="',an,'"',' focusposition="',aF.x,",",aF.y,'" />')
}else{if(aj instanceof T){if(j&&p){var ah=-aK.x;var aC=-aK.y;
ai.push("<g_vml_:fill",' position="',ah/j*aB*aB,",",aC/p*aA*aA,'"',' type="tile"',' src="',aj.src_,'" />')
}}else{var aL=F(aq.fillStyle);var aw=aL.color;var aG=aL.alpha*aq.globalAlpha;
ai.push('<g_vml_:fill color="',aw,'" opacity="',aG,'" />')
}}}q.fill=function(){this.stroke(true)};q.closePath=function(){this.currentPath_.push({type:"close"})
};function V(j,Z,p){var i=j.m_;return{x:d*(Z*i[0][0]+p*i[1][0]+i[2][0])-f,y:d*(Z*i[0][1]+p*i[1][1]+i[2][1])-f}
}q.save=function(){var i={};v(this,i);this.aStack_.push(i);
this.mStack_.push(this.m_);this.m_=J(B(),this.m_)
};q.restore=function(){if(this.aStack_.length){v(this.aStack_.pop(),this);
this.m_=this.mStack_.pop()}};function h(i){return isFinite(i[0][0])&&isFinite(i[0][1])&&isFinite(i[1][0])&&isFinite(i[1][1])&&isFinite(i[2][0])&&isFinite(i[2][1])
}function aa(j,i,p){if(!h(i)){return}j.m_=i;if(p){var Z=i[0][0]*i[1][1]-i[0][1]*i[1][0];
j.lineScale_=N(H(Z))}}q.translate=function(m,j){var i=[[1,0,0],[0,1,0],[m,j,1]];
aa(this,J(i,this.m_),false)};q.rotate=function(j){var p=A(j);
var m=l(j);var i=[[p,m,0],[-m,p,0],[0,0,1]];aa(this,J(i,this.m_),false)
};q.scale=function(m,j){this.arcScaleX_*=m;this.arcScaleY_*=j;
var i=[[m,0,0],[0,j,0],[0,0,1]];aa(this,J(i,this.m_),true)
};q.transform=function(Z,p,ah,ag,j,i){var m=[[Z,p,0],[ah,ag,0],[j,i,1]];
aa(this,J(m,this.m_),true)};q.setTransform=function(ag,Z,ai,ah,p,j){var i=[[ag,Z,0],[ai,ah,0],[p,j,1]];
aa(this,i,true)};q.drawText_=function(am,ak,aj,ap,ai){var ao=this.m_,at=1000,j=0,ar=at,ah={x:0,y:0},ag=[];
var i=u(E(this.font),this.element_);var p=ac(i);var au=this.element_.currentStyle;
var Z=this.textAlign.toLowerCase();switch(Z){case"left":case"center":case"right":break;
case"end":Z=au.direction=="ltr"?"right":"left";break;
case"start":Z=au.direction=="rtl"?"right":"left";
break;default:Z="left"}switch(this.textBaseline){case"hanging":case"top":ah.y=i.size/1.75;
break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":ah.y=-i.size/2.25;
break}switch(Z){case"right":j=at;ar=0.05;break;case"center":j=ar=at/2;
break}var aq=V(this,ak+ah.x,aj+ah.y);ag.push('<g_vml_:line from="',-j,' 0" to="',ar,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!ai,'" stroked="',!!ai,'" style="position:absolute;width:1px;height:1px;">');
if(ai){w(this,ag)}else{G(this,ag,{x:-j,y:0},{x:ar,y:i.size})
}var an=ao[0][0].toFixed(3)+","+ao[1][0].toFixed(3)+","+ao[0][1].toFixed(3)+","+ao[1][1].toFixed(3)+",0,0";
var al=n(aq.x/d)+","+n(aq.y/d);ag.push('<g_vml_:skew on="t" matrix="',an,'" ',' offset="',al,'" origin="',j,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',af(am),'" style="v-text-align:',Z,";font:",af(p),'" /></g_vml_:line>');
this.element_.insertAdjacentHTML("beforeEnd",ag.join(""))
};q.fillText=function(m,i,p,j){this.drawText_(m,i,p,j,false)
};q.strokeText=function(m,i,p,j){this.drawText_(m,i,p,j,true)
};q.measureText=function(m){if(!this.textMeasureEl_){var i='<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
this.element_.insertAdjacentHTML("beforeEnd",i);this.textMeasureEl_=this.element_.lastChild
}var j=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";
this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(j.createTextNode(m));
return{width:this.textMeasureEl_.offsetWidth}};q.clip=function(){};
q.arcTo=function(){};q.createPattern=function(j,i){return new T(j,i)
};function U(i){this.type_=i;this.x0_=0;this.y0_=0;
this.r0_=0;this.x1_=0;this.y1_=0;this.r1_=0;this.colors_=[]
}U.prototype.addColorStop=function(j,i){i=F(i);this.colors_.push({offset:j,color:i.color,alpha:i.alpha})
};function T(j,i){Q(j);switch(i){case"repeat":case null:case"":this.repetition_="repeat";
break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=i;
break;default:O("SYNTAX_ERR")}this.src_=j.src;this.width_=j.width;
this.height_=j.height}function O(i){throw new P(i)
}function Q(i){if(!i||i.nodeType!=1||i.tagName!="IMG"){O("TYPE_MISMATCH_ERR")
}if(i.readyState!="complete"){O("INVALID_STATE_ERR")
}}function P(i){this.code=this[i];this.message=i+": DOM Exception "+this.code
}var X=P.prototype=new Error;X.INDEX_SIZE_ERR=1;X.DOMSTRING_SIZE_ERR=2;
X.HIERARCHY_REQUEST_ERR=3;X.WRONG_DOCUMENT_ERR=4;
X.INVALID_CHARACTER_ERR=5;X.NO_DATA_ALLOWED_ERR=6;
X.NO_MODIFICATION_ALLOWED_ERR=7;X.NOT_FOUND_ERR=8;
X.NOT_SUPPORTED_ERR=9;X.INUSE_ATTRIBUTE_ERR=10;X.INVALID_STATE_ERR=11;
X.SYNTAX_ERR=12;X.INVALID_MODIFICATION_ERR=13;X.NAMESPACE_ERR=14;
X.INVALID_ACCESS_ERR=15;X.VALIDATION_ERR=16;X.TYPE_MISMATCH_ERR=17;
G_vmlCanvasManager=e;CanvasRenderingContext2D=D;CanvasGradient=U;
CanvasPattern=T;DOMException=P})()}console.log("=============== >  excanvas.js ");
(function(b){b.color={};b.color.make=function(f,e,c,d){var h={};
h.r=f||0;h.g=e||0;h.b=c||0;h.a=d!=null?d:1;h.add=function(k,j){for(var g=0;
g<k.length;++g){h[k.charAt(g)]+=j}return h.normalize()
};h.scale=function(k,j){for(var g=0;g<k.length;++g){h[k.charAt(g)]*=j
}return h.normalize()};h.toString=function(){if(h.a>=1){return"rgb("+[h.r,h.g,h.b].join(",")+")"
}else{return"rgba("+[h.r,h.g,h.b,h.a].join(",")+")"
}};h.normalize=function(){function g(j,k,i){return k<j?j:k>i?i:k
}h.r=g(0,parseInt(h.r),255);h.g=g(0,parseInt(h.g),255);
h.b=g(0,parseInt(h.b),255);h.a=g(0,h.a,1);return h
};h.clone=function(){return b.color.make(h.r,h.b,h.g,h.a)
};return h.normalize()};b.color.extract=function(e,d){var f;
do{f=e.css(d).toLowerCase();if(f!=""&&f!="transparent"){break
}e=e.parent()}while(e.length&&!b.nodeName(e.get(0),"body"));
if(f=="rgba(0, 0, 0, 0)"){f="transparent"}return b.color.parse(f)
};b.color.parse=function(f){var e,c=b.color.make;
if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return c(parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10))
}if(e=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(f)){return c(parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10),parseFloat(e[4]))
}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return c(parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55)
}if(e=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(f)){return c(parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55,parseFloat(e[4]))
}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return c(parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16))
}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return c(parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16))
}var d=b.trim(f).toLowerCase();if(d=="transparent"){return c(255,255,255,0)
}else{e=a[d]||[0,0,0];return c(e[0],e[1],e[2])}};
var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}
})(jQuery);(function(e){var d=Object.prototype.hasOwnProperty;
if(!e.fn.detach){e.fn.detach=function(){return this.each(function(){if(this.parentNode){this.parentNode.removeChild(this)
}})}}function a(h,g){var j=g.children("."+h)[0];if(j==null){j=document.createElement("canvas");
j.className=h;e(j).css({direction:"ltr",position:"absolute",left:0,top:0}).appendTo(g);
if(!j.getContext){if(window.G_vmlCanvasManager){j=window.G_vmlCanvasManager.initElement(j)
}else{throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.")
}}}this.element=j;var i=this.context=j.getContext("2d");
var f=window.devicePixelRatio||1,k=i.webkitBackingStorePixelRatio||i.mozBackingStorePixelRatio||i.msBackingStorePixelRatio||i.oBackingStorePixelRatio||i.backingStorePixelRatio||1;
this.pixelRatio=f/k;this.resize(g.width(),g.height());
this.textContainer=null;this.text={};this._textCache={}
}a.prototype.resize=function(i,f){if(i<=0||f<=0){throw new Error("Invalid dimensions for plot, width = "+i+", height = "+f)
}var h=this.element,g=this.context,j=this.pixelRatio;
if(this.width!=i){h.width=i*j;h.style.width=i+"px";
this.width=i}if(this.height!=f){h.height=f*j;h.style.height=f+"px";
this.height=f}g.restore();g.save();g.scale(j,j)};
a.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)
};a.prototype.render=function(){var f=this._textCache;
for(var o in f){if(d.call(f,o)){var n=this.getTextLayer(o),g=f[o];
n.hide();for(var m in g){if(d.call(g,m)){var h=g[m];
for(var p in h){if(d.call(h,p)){var k=h[p].positions;
for(var j=0,l;l=k[j];j++){if(l.active){if(!l.rendered){n.append(l.element);
l.rendered=true}}else{k.splice(j--,1);if(l.rendered){l.element.detach()
}}}if(k.length==0){delete h[p]}}}}}n.show()}}};a.prototype.getTextLayer=function(g){var f=this.text[g];
if(f==null){if(this.textContainer==null){this.textContainer=e("<div class='flot-text'></div>").css({position:"absolute",top:0,left:0,bottom:0,right:0,"font-size":"smaller",color:"#545454"}).insertAfter(this.element)
}f=this.text[g]=e("<div></div>").addClass(g).css({position:"absolute",top:0,left:0,bottom:0,right:0}).appendTo(this.textContainer)
}return f};a.prototype.getTextInfo=function(m,o,j,k,g){var n,f,i,h;
o=""+o;if(typeof j==="object"){n=j.style+" "+j.variant+" "+j.weight+" "+j.size+"px/"+j.lineHeight+"px "+j.family
}else{n=j}f=this._textCache[m];if(f==null){f=this._textCache[m]={}
}i=f[n];if(i==null){i=f[n]={}}h=i[o];if(h==null){var l=e("<div></div>").html(o).css({position:"absolute","max-width":g,top:-9999}).appendTo(this.getTextLayer(m));
if(typeof j==="object"){l.css({font:n,color:j.color})
}else{if(typeof j==="string"){l.addClass(j)}}h=i[o]={width:l.outerWidth(true),height:l.outerHeight(true),element:l,positions:[]};
l.detach()}return h};a.prototype.addText=function(o,r,p,s,h,j,f,n,q){var g=this.getTextInfo(o,s,h,j,f),l=g.positions;
if(n=="center"){r-=g.width/2}else{if(n=="right"){r-=g.width
}}if(q=="middle"){p-=g.height/2}else{if(q=="bottom"){p-=g.height
}}for(var k=0,m;m=l[k];k++){if(m.x==r&&m.y==p){m.active=true;
return}}m={active:true,rendered:false,element:l.length?g.element.clone():g.element,x:r,y:p};
l.push(m);m.element.css({top:Math.round(p),left:Math.round(r),"text-align":n})
};a.prototype.removeText=function(o,q,p,s,h,j){if(s==null){var f=this._textCache[o];
if(f!=null){for(var n in f){if(d.call(f,n)){var g=f[n];
for(var r in g){if(d.call(g,r)){var l=g[r].positions;
for(var k=0,m;m=l[k];k++){m.active=false}}}}}}}else{var l=this.getTextInfo(o,s,h,j).positions;
for(var k=0,m;m=l[k];k++){if(m.x==q&&m.y==p){m.active=false
}}}};function c(Q,A,C,g){var t=[],L={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:0.85,sorted:null},xaxis:{show:null,position:"bottom",mode:null,font:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,reserveSpace:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null},yaxis:{autoscaleMargin:0.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:2,fill:false,fillColor:null,steps:false},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left",horizontal:false,zero:true},shadowSize:3,highlightColor:null},grid:{show:true,aboveData:false,color:"#545454",backgroundColor:null,borderColor:null,tickColor:null,margin:0,labelMargin:5,axisMargin:8,borderWidth:2,minBorderMargin:null,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},interaction:{redrawOverlayInterval:1000/60},hooks:{}},ac=null,al=null,am=null,D=null,aw=null,ao=[],W=[],J={left:0,right:0,top:0,bottom:0},k=0,ad=0,p={processOptions:[],processRawData:[],processDatapoints:[],processOffset:[],drawBackground:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[],shutdown:[]},h=this;
h.setData=K;h.setupGrid=O;h.draw=au;h.getPlaceholder=function(){return Q
};h.getCanvas=function(){return ac.element};h.getPlotOffset=function(){return J
};h.width=function(){return k};h.height=function(){return ad
};h.offset=function(){var ay=am.offset();ay.left+=J.left;
ay.top+=J.top;return ay};h.getData=function(){return t
};h.getAxes=function(){var az={},ay;e.each(ao.concat(W),function(aA,aB){if(aB){az[aB.direction+(aB.n!=1?aB.n:"")+"axis"]=aB
}});return az};h.getXAxes=function(){return ao};h.getYAxes=function(){return W
};h.c2p=Y;h.p2c=R;h.getOptions=function(){return L
};h.highlight=an;h.unhighlight=ah;h.triggerRedrawOverlay=X;
h.pointOffset=function(ay){return{left:parseInt(ao[x(ay,"x")-1].p2c(+ay.x)+J.left,10),top:parseInt(W[x(ay,"y")-1].p2c(+ay.y)+J.top,10)}
};h.shutdown=o;h.destroy=function(){o();Q.removeData("plot").empty();
t=[];L=null;ac=null;al=null;am=null;D=null;aw=null;
ao=[];W=[];p=null;ag=[];h=null};h.resize=function(){var az=Q.width(),ay=Q.height();
ac.resize(az,ay);al.resize(az,ay)};h.hooks=p;H(h);
aa(C);ax();K(A);O();au();ar();function F(aA,ay){ay=[h].concat(ay);
for(var az=0;az<aA.length;++az){aA[az].apply(this,ay)
}}function H(){var az={Canvas:a};for(var ay=0;ay<g.length;
++ay){var aA=g[ay];aA.init(h,az);if(aA.options){e.extend(true,L,aA.options)
}}}function aa(aA){e.extend(true,L,aA);if(aA&&aA.colors){L.colors=aA.colors
}if(L.xaxis.color==null){L.xaxis.color=e.color.parse(L.grid.color).scale("a",0.22).toString()
}if(L.yaxis.color==null){L.yaxis.color=e.color.parse(L.grid.color).scale("a",0.22).toString()
}if(L.xaxis.tickColor==null){L.xaxis.tickColor=L.grid.tickColor||L.xaxis.color
}if(L.yaxis.tickColor==null){L.yaxis.tickColor=L.grid.tickColor||L.yaxis.color
}if(L.grid.borderColor==null){L.grid.borderColor=L.grid.color
}if(L.grid.tickColor==null){L.grid.tickColor=e.color.parse(L.grid.color).scale("a",0.22).toString()
}var ay,aF,aD,aC=Q.css("font-size"),aB=aC?+aC.replace("px",""):13,az={style:Q.css("font-style"),size:Math.round(0.8*aB),variant:Q.css("font-variant"),weight:Q.css("font-weight"),family:Q.css("font-family")};
aD=L.xaxes.length||1;for(ay=0;ay<aD;++ay){aF=L.xaxes[ay];
if(aF&&!aF.tickColor){aF.tickColor=aF.color}aF=e.extend(true,{},L.xaxis,aF);
L.xaxes[ay]=aF;if(aF.font){aF.font=e.extend({},az,aF.font);
if(!aF.font.color){aF.font.color=aF.color}if(!aF.font.lineHeight){aF.font.lineHeight=Math.round(aF.font.size*1.15)
}}}aD=L.yaxes.length||1;for(ay=0;ay<aD;++ay){aF=L.yaxes[ay];
if(aF&&!aF.tickColor){aF.tickColor=aF.color}aF=e.extend(true,{},L.yaxis,aF);
L.yaxes[ay]=aF;if(aF.font){aF.font=e.extend({},az,aF.font);
if(!aF.font.color){aF.font.color=aF.color}if(!aF.font.lineHeight){aF.font.lineHeight=Math.round(aF.font.size*1.15)
}}}if(L.xaxis.noTicks&&L.xaxis.ticks==null){L.xaxis.ticks=L.xaxis.noTicks
}if(L.yaxis.noTicks&&L.yaxis.ticks==null){L.yaxis.ticks=L.yaxis.noTicks
}if(L.x2axis){L.xaxes[1]=e.extend(true,{},L.xaxis,L.x2axis);
L.xaxes[1].position="top";if(L.x2axis.min==null){L.xaxes[1].min=null
}if(L.x2axis.max==null){L.xaxes[1].max=null}}if(L.y2axis){L.yaxes[1]=e.extend(true,{},L.yaxis,L.y2axis);
L.yaxes[1].position="right";if(L.y2axis.min==null){L.yaxes[1].min=null
}if(L.y2axis.max==null){L.yaxes[1].max=null}}if(L.grid.coloredAreas){L.grid.markings=L.grid.coloredAreas
}if(L.grid.coloredAreasColor){L.grid.markingsColor=L.grid.coloredAreasColor
}if(L.lines){e.extend(true,L.series.lines,L.lines)
}if(L.points){e.extend(true,L.series.points,L.points)
}if(L.bars){e.extend(true,L.series.bars,L.bars)}if(L.shadowSize!=null){L.series.shadowSize=L.shadowSize
}if(L.highlightColor!=null){L.series.highlightColor=L.highlightColor
}for(ay=0;ay<L.xaxes.length;++ay){M(ao,ay+1).options=L.xaxes[ay]
}for(ay=0;ay<L.yaxes.length;++ay){M(W,ay+1).options=L.yaxes[ay]
}for(var aE in p){if(L.hooks[aE]&&L.hooks[aE].length){p[aE]=p[aE].concat(L.hooks[aE])
}}F(p.processOptions,[L])}function K(ay){t=q(ay);
y();S()}function q(aB){var az=[];for(var ay=0;ay<aB.length;
++ay){var aA=e.extend(true,{},L.series);if(aB[ay].data!=null){aA.data=aB[ay].data;
delete aB[ay].data;e.extend(true,aA,aB[ay]);aB[ay].data=aA.data
}else{aA.data=aB[ay]}az.push(aA)}return az}function x(az,aA){var ay=az[aA+"axis"];
if(typeof ay=="object"){ay=ay.n}if(typeof ay!="number"){ay=1
}return ay}function j(){return e.grep(ao.concat(W),function(ay){return ay
})}function Y(aB){var az={},ay,aA;for(ay=0;ay<ao.length;
++ay){aA=ao[ay];if(aA&&aA.used){az["x"+aA.n]=aA.c2p(aB.left)
}}for(ay=0;ay<W.length;++ay){aA=W[ay];if(aA&&aA.used){az["y"+aA.n]=aA.c2p(aB.top)
}}if(az.x1!==undefined){az.x=az.x1}if(az.y1!==undefined){az.y=az.y1
}return az}function R(aC){var aA={},az,aB,ay;for(az=0;
az<ao.length;++az){aB=ao[az];if(aB&&aB.used){ay="x"+aB.n;
if(aC[ay]==null&&aB.n==1){ay="x"}if(aC[ay]!=null){aA.left=aB.p2c(aC[ay]);
break}}}for(az=0;az<W.length;++az){aB=W[az];if(aB&&aB.used){ay="y"+aB.n;
if(aC[ay]==null&&aB.n==1){ay="y"}if(aC[ay]!=null){aA.top=aB.p2c(aC[ay]);
break}}}return aA}function M(az,ay){if(!az[ay-1]){az[ay-1]={n:ay,direction:az==ao?"x":"y",options:e.extend(true,{},az==ao?L.xaxis:L.yaxis)}
}return az[ay-1]}function y(){var aJ=t.length,aA=-1,aB;
for(aB=0;aB<t.length;++aB){var aG=t[aB].color;if(aG!=null){aJ--;
if(typeof aG=="number"&&aG>aA){aA=aG}}}if(aJ<=aA){aJ=aA+1
}var aF,ay=[],aE=L.colors,aD=aE.length,az=0;for(aB=0;
aB<aJ;aB++){aF=e.color.parse(aE[aB%aD]||"#666");if(aB%aD==0&&aB){if(az>=0){if(az<0.5){az=-az-0.2
}else{az=0}}else{az=-az}}ay[aB]=aF.scale("rgb",1+az)
}var aC=0,aK;for(aB=0;aB<t.length;++aB){aK=t[aB];
if(aK.color==null){aK.color=ay[aC].toString();++aC
}else{if(typeof aK.color=="number"){aK.color=ay[aK.color].toString()
}}if(aK.lines.show==null){var aI,aH=true;for(aI in aK){if(aK[aI]&&aK[aI].show){aH=false;
break}}if(aH){aK.lines.show=true}}if(aK.lines.zero==null){aK.lines.zero=!!aK.lines.fill
}aK.xaxis=M(ao,x(aK,"x"));aK.yaxis=M(W,x(aK,"y"))
}}function S(){var aM=Number.POSITIVE_INFINITY,aG=Number.NEGATIVE_INFINITY,ay=Number.MAX_VALUE,aT,aR,aQ,aL,aA,aH,aS,aN,aF,aE,az,aZ,aW,aJ,aY,aV;
function aC(a2,a1,a0){if(a1<a2.datamin&&a1!=-ay){a2.datamin=a1
}if(a0>a2.datamax&&a0!=ay){a2.datamax=a0}}e.each(j(),function(a0,a1){a1.datamin=aM;
a1.datamax=aG;a1.used=false});for(aT=0;aT<t.length;
++aT){aH=t[aT];aH.datapoints={points:[]};F(p.processRawData,[aH,aH.data,aH.datapoints])
}for(aT=0;aT<t.length;++aT){aH=t[aT];aY=aH.data;aV=aH.datapoints.format;
if(!aV){aV=[];aV.push({x:true,number:true,required:true});
aV.push({y:true,number:true,required:true});if(aH.bars.show||(aH.lines.show&&aH.lines.fill)){var aO=!!((aH.bars.show&&aH.bars.zero)||(aH.lines.show&&aH.lines.zero));
aV.push({y:true,number:true,required:false,defaultValue:0,autoscale:aO});
if(aH.bars.horizontal){delete aV[aV.length-1].y;aV[aV.length-1].x=true
}}aH.datapoints.format=aV}if(aH.datapoints.pointsize!=null){continue
}aH.datapoints.pointsize=aV.length;aN=aH.datapoints.pointsize;
aS=aH.datapoints.points;var aD=aH.lines.show&&aH.lines.steps;
aH.xaxis.used=aH.yaxis.used=true;for(aR=aQ=0;aR<aY.length;
++aR,aQ+=aN){aJ=aY[aR];var aB=aJ==null;if(!aB){for(aL=0;
aL<aN;++aL){aZ=aJ[aL];aW=aV[aL];if(aW){if(aW.number&&aZ!=null){aZ=+aZ;
if(isNaN(aZ)){aZ=null}else{if(aZ==Infinity){aZ=ay
}else{if(aZ==-Infinity){aZ=-ay}}}}if(aZ==null){if(aW.required){aB=true
}if(aW.defaultValue!=null){aZ=aW.defaultValue}}}aS[aQ+aL]=aZ
}}if(aB){for(aL=0;aL<aN;++aL){aZ=aS[aQ+aL];if(aZ!=null){aW=aV[aL];
if(aW.autoscale!==false){if(aW.x){aC(aH.xaxis,aZ,aZ)
}if(aW.y){aC(aH.yaxis,aZ,aZ)}}}aS[aQ+aL]=null}}else{if(aD&&aQ>0&&aS[aQ-aN]!=null&&aS[aQ-aN]!=aS[aQ]&&aS[aQ-aN+1]!=aS[aQ+1]){for(aL=0;
aL<aN;++aL){aS[aQ+aN+aL]=aS[aQ+aL]}aS[aQ+1]=aS[aQ-aN+1];
aQ+=aN}}}}for(aT=0;aT<t.length;++aT){aH=t[aT];F(p.processDatapoints,[aH,aH.datapoints])
}for(aT=0;aT<t.length;++aT){aH=t[aT];aS=aH.datapoints.points;
aN=aH.datapoints.pointsize;aV=aH.datapoints.format;
var aI=aM,aP=aM,aK=aG,aU=aG;for(aR=0;aR<aS.length;
aR+=aN){if(aS[aR]==null){continue}for(aL=0;aL<aN;
++aL){aZ=aS[aR+aL];aW=aV[aL];if(!aW||aW.autoscale===false||aZ==ay||aZ==-ay){continue
}if(aW.x){if(aZ<aI){aI=aZ}if(aZ>aK){aK=aZ}}if(aW.y){if(aZ<aP){aP=aZ
}if(aZ>aU){aU=aZ}}}}if(aH.bars.show){var aX;switch(aH.bars.align){case"left":aX=0;
break;case"right":aX=-aH.bars.barWidth;break;default:aX=-aH.bars.barWidth/2
}if(aH.bars.horizontal){aP+=aX;aU+=aX+aH.bars.barWidth
}else{aI+=aX;aK+=aX+aH.bars.barWidth}}aC(aH.xaxis,aI,aK);
aC(aH.yaxis,aP,aU)}e.each(j(),function(a0,a1){if(a1.datamin==aM){a1.datamin=null
}if(a1.datamax==aG){a1.datamax=null}})}function ax(){Q.css("padding",0).children().filter(function(){return !e(this).hasClass("flot-overlay")&&!e(this).hasClass("flot-base")
}).remove();if(Q.css("position")=="static"){Q.css("position","relative")
}ac=new a("flot-base",Q);al=new a("flot-overlay",Q);
D=ac.context;aw=al.context;am=e(al.element).unbind();
var ay=Q.data("plot");if(ay){ay.shutdown();al.clear()
}Q.data("plot",h)}function ar(){if(L.grid.hoverable){am.mousemove(f);
am.bind("mouseleave",P)}if(L.grid.clickable){am.click(I)
}F(p.bindEvents,[am])}function o(){if(l){clearTimeout(l)
}am.unbind("mousemove",f);am.unbind("mouseleave",P);
am.unbind("click",I);F(p.shutdown,[am])}function n(aD){function az(aE){return aE
}var aC,ay,aA=aD.options.transform||az,aB=aD.options.inverseTransform;
if(aD.direction=="x"){aC=aD.scale=k/Math.abs(aA(aD.max)-aA(aD.min));
ay=Math.min(aA(aD.max),aA(aD.min))}else{aC=aD.scale=ad/Math.abs(aA(aD.max)-aA(aD.min));
aC=-aC;ay=Math.max(aA(aD.max),aA(aD.min))}if(aA==az){aD.p2c=function(aE){return(aE-ay)*aC
}}else{aD.p2c=function(aE){return(aA(aE)-ay)*aC}}if(!aB){aD.c2p=function(aE){return ay+aE/aC
}}else{aD.c2p=function(aE){return aB(ay+aE/aC)}}}function Z(aB){var ay=aB.options,aH=aB.ticks||[],aG=ay.labelWidth||0,aC=ay.labelHeight||0,aI=aG||(aB.direction=="x"?Math.floor(ac.width/(aH.length||1)):null),aE=aB.direction+"Axis "+aB.direction+aB.n+"Axis",aF="flot-"+aB.direction+"-axis flot-"+aB.direction+aB.n+"-axis "+aE,aA=ay.font||"flot-tick-label tickLabel";
for(var aD=0;aD<aH.length;++aD){var aJ=aH[aD];if(!aJ.label){continue
}var az=ac.getTextInfo(aF,aJ.label,aA,null,aI);aG=Math.max(aG,az.width);
aC=Math.max(aC,az.height)}aB.labelWidth=ay.labelWidth||aG;
aB.labelHeight=ay.labelHeight||aC}function E(aA){var az=aA.labelWidth,aH=aA.labelHeight,aF=aA.options.position,ay=aA.direction==="x",aD=aA.options.tickLength,aE=L.grid.axisMargin,aG=L.grid.labelMargin,aJ=true,aC=true,aB=true,aI=false;
e.each(ay?ao:W,function(aL,aK){if(aK&&(aK.show||aK.reserveSpace)){if(aK===aA){aI=true
}else{if(aK.options.position===aF){if(aI){aC=false
}else{aJ=false}}}if(!aI){aB=false}}});if(aC){aE=0
}if(aD==null){aD=aB?"full":5}if(!isNaN(+aD)){aG+=+aD
}if(ay){aH+=aG;if(aF=="bottom"){J.bottom+=aH+aE;aA.box={top:ac.height-J.bottom,height:aH}
}else{aA.box={top:J.top+aE,height:aH};J.top+=aH+aE
}}else{az+=aG;if(aF=="left"){aA.box={left:J.left+aE,width:az};
J.left+=az+aE}else{J.right+=az+aE;aA.box={left:ac.width-J.right,width:az}
}}aA.position=aF;aA.tickLength=aD;aA.box.padding=aG;
aA.innermost=aJ}function ab(ay){if(ay.direction=="x"){ay.box.left=J.left-ay.labelWidth/2;
ay.box.width=ac.width-J.left-J.right+ay.labelWidth
}else{ay.box.top=J.top-ay.labelHeight/2;ay.box.height=ac.height-J.bottom-J.top+ay.labelHeight
}}function B(){var aA=L.grid.minBorderMargin,az,ay;
if(aA==null){aA=0;for(ay=0;ay<t.length;++ay){aA=Math.max(aA,2*(t[ay].points.radius+t[ay].points.lineWidth/2))
}}var aB={left:aA,right:aA,top:aA,bottom:aA};e.each(j(),function(aC,aD){if(aD.reserveSpace&&aD.ticks&&aD.ticks.length){if(aD.direction==="x"){aB.left=Math.max(aB.left,aD.labelWidth/2);
aB.right=Math.max(aB.right,aD.labelWidth/2)}else{aB.bottom=Math.max(aB.bottom,aD.labelHeight/2);
aB.top=Math.max(aB.top,aD.labelHeight/2)}}});J.left=Math.ceil(Math.max(aB.left,J.left));
J.right=Math.ceil(Math.max(aB.right,J.right));J.top=Math.ceil(Math.max(aB.top,J.top));
J.bottom=Math.ceil(Math.max(aB.bottom,J.bottom))}function O(){var aA,aC=j(),aD=L.grid.show;
for(var az in J){var aB=L.grid.margin||0;J[az]=typeof aB=="number"?aB:aB[az]||0
}F(p.processOffset,[J]);for(var az in J){if(typeof(L.grid.borderWidth)=="object"){J[az]+=aD?L.grid.borderWidth[az]:0
}else{J[az]+=aD?L.grid.borderWidth:0}}e.each(aC,function(aF,aG){var aE=aG.options;
aG.show=aE.show==null?aG.used:aE.show;aG.reserveSpace=aE.reserveSpace==null?aG.show:aE.reserveSpace;
m(aG)});if(aD){var ay=e.grep(aC,function(aE){return aE.show||aE.reserveSpace
});e.each(ay,function(aE,aF){aq(aF);V(aF);u(aF,aF.ticks);
Z(aF)});for(aA=ay.length-1;aA>=0;--aA){E(ay[aA])}B();
e.each(ay,function(aE,aF){ab(aF)})}k=ac.width-J.left-J.right;
ad=ac.height-J.bottom-J.top;e.each(aC,function(aE,aF){n(aF)
});if(aD){at()}av()}function m(aB){var aC=aB.options,aA=+(aC.min!=null?aC.min:aB.datamin),ay=+(aC.max!=null?aC.max:aB.datamax),aE=ay-aA;
if(aE==0){var az=ay==0?1:0.01;if(aC.min==null){aA-=az
}if(aC.max==null||aC.min!=null){ay+=az}}else{var aD=aC.autoscaleMargin;
if(aD!=null){if(aC.min==null){aA-=aE*aD;if(aA<0&&aB.datamin!=null&&aB.datamin>=0){aA=0
}}if(aC.max==null){ay+=aE*aD;if(ay>0&&aB.datamax!=null&&aB.datamax<=0){ay=0
}}}}aB.min=aA;aB.max=ay}function aq(aD){var az=aD.options;
var aC;if(typeof az.ticks=="number"&&az.ticks>0){aC=az.ticks
}else{aC=0.3*Math.sqrt(aD.direction=="x"?ac.width:ac.height)
}var aI=(aD.max-aD.min)/aC,aE=-Math.floor(Math.log(aI)/Math.LN10),aB=az.tickDecimals;
if(aB!=null&&aE>aB){aE=aB}var ay=Math.pow(10,-aE),aA=aI/ay,aK;
if(aA<1.5){aK=1}else{if(aA<3){aK=2;if(aA>2.25&&(aB==null||aE+1<=aB)){aK=2.5;
++aE}}else{if(aA<7.5){aK=5}else{aK=10}}}aK*=ay;if(az.minTickSize!=null&&aK<az.minTickSize){aK=az.minTickSize
}aD.delta=aI;aD.tickDecimals=Math.max(0,aB!=null?aB:aE);
aD.tickSize=az.tickSize||aK;if(az.mode=="time"&&!aD.tickGenerator){throw new Error("Time mode requires the flot.time plugin.")
}if(!aD.tickGenerator){aD.tickGenerator=function(aN){var aP=[],aQ=b(aN.min,aN.tickSize),aM=0,aL=Number.NaN,aO;
do{aO=aL;aL=aQ+aM*aN.tickSize;aP.push(aL);++aM}while(aL<aN.max&&aL!=aO);
return aP};aD.tickFormatter=function(aQ,aO){var aN=aO.tickDecimals?Math.pow(10,aO.tickDecimals):1;
var aP=""+Math.round(aQ*aN)/aN;if(aO.tickDecimals!=null){var aM=aP.indexOf(".");
var aL=aM==-1?0:aP.length-aM-1;if(aL<aO.tickDecimals){return(aL?aP:aP+".")+(""+aN).substr(1,aO.tickDecimals-aL)
}}return aP}}if(e.isFunction(az.tickFormatter)){aD.tickFormatter=function(aL,aM){return""+az.tickFormatter(aL,aM)
}}if(az.alignTicksWithAxis!=null){var aF=(aD.direction=="x"?ao:W)[az.alignTicksWithAxis-1];
if(aF&&aF.used&&aF!=aD){var aJ=aD.tickGenerator(aD);
if(aJ.length>0){if(az.min==null){aD.min=Math.min(aD.min,aJ[0])
}if(az.max==null&&aJ.length>1){aD.max=Math.max(aD.max,aJ[aJ.length-1])
}}aD.tickGenerator=function(aN){var aO=[],aL,aM;for(aM=0;
aM<aF.ticks.length;++aM){aL=(aF.ticks[aM].v-aF.min)/(aF.max-aF.min);
aL=aN.min+aL*(aN.max-aN.min);aO.push(aL)}return aO
};if(!aD.mode&&az.tickDecimals==null){var aH=Math.max(0,-Math.floor(Math.log(aD.delta)/Math.LN10)+1),aG=aD.tickGenerator(aD);
if(!(aG.length>1&&/\..*0$/.test((aG[1]-aG[0]).toFixed(aH)))){aD.tickDecimals=aH
}}}}}function V(aC){var aE=aC.options.ticks,aD=[];
if(aE==null||(typeof aE=="number"&&aE>0)){aD=aC.tickGenerator(aC)
}else{if(aE){if(e.isFunction(aE)){aD=aE(aC)}else{aD=aE
}}}var aB,ay;aC.ticks=[];for(aB=0;aB<aD.length;++aB){var az=null;
var aA=aD[aB];if(typeof aA=="object"){ay=+aA[0];if(aA.length>1){az=aA[1]
}}else{ay=+aA}if(az==null){az=aC.tickFormatter(ay,aC)
}if(!isNaN(ay)){aC.ticks.push({v:ay,label:az})}}}function u(ay,az){if(ay.options.autoscaleMargin&&az.length>0){if(ay.options.min==null){ay.min=Math.min(ay.min,az[0].v)
}if(ay.options.max==null&&az.length>1){ay.max=Math.max(ay.max,az[az.length-1].v)
}}}function au(){ac.clear();F(p.drawBackground,[D]);
var az=L.grid;if(az.show&&az.backgroundColor){r()
}if(az.show&&!az.aboveData){w()}for(var ay=0;ay<t.length;
++ay){F(p.drawSeries,[D,t[ay]]);aj(t[ay])}F(p.draw,[D]);
if(az.show&&az.aboveData){w()}ac.render();X()}function s(ay,aC){var az,aE,aF,aG,aD=j();
for(var aB=0;aB<aD.length;++aB){az=aD[aB];if(az.direction==aC){aG=aC+az.n+"axis";
if(!ay[aG]&&az.n==1){aG=aC+"axis"}if(ay[aG]){aE=ay[aG].from;
aF=ay[aG].to;break}}}if(!ay[aG]){az=aC=="x"?ao[0]:W[0];
aE=ay[aC+"1"];aF=ay[aC+"2"]}if(aE!=null&&aF!=null&&aE>aF){var aA=aE;
aE=aF;aF=aA}return{from:aE,to:aF,axis:az}}function r(){D.save();
D.translate(J.left,J.top);D.fillStyle=v(L.grid.backgroundColor,ad,0,"rgba(255, 255, 255, 0)");
D.fillRect(0,0,k,ad);D.restore()}function w(){var aO,aN,aR,aA;
D.save();D.translate(J.left,J.top);var aB=L.grid.markings;
if(aB){if(e.isFunction(aB)){aN=h.getAxes();aN.xmin=aN.xaxis.min;
aN.xmax=aN.xaxis.max;aN.ymin=aN.yaxis.min;aN.ymax=aN.yaxis.max;
aB=aB(aN)}for(aO=0;aO<aB.length;++aO){var aL=aB[aO],aC=s(aL,"x"),aG=s(aL,"y");
if(aC.from==null){aC.from=aC.axis.min}if(aC.to==null){aC.to=aC.axis.max
}if(aG.from==null){aG.from=aG.axis.min}if(aG.to==null){aG.to=aG.axis.max
}if(aC.to<aC.axis.min||aC.from>aC.axis.max||aG.to<aG.axis.min||aG.from>aG.axis.max){continue
}aC.from=Math.max(aC.from,aC.axis.min);aC.to=Math.min(aC.to,aC.axis.max);
aG.from=Math.max(aG.from,aG.axis.min);aG.to=Math.min(aG.to,aG.axis.max);
var aD=aC.from===aC.to,aJ=aG.from===aG.to;if(aD&&aJ){continue
}aC.from=Math.floor(aC.axis.p2c(aC.from));aC.to=Math.floor(aC.axis.p2c(aC.to));
aG.from=Math.floor(aG.axis.p2c(aG.from));aG.to=Math.floor(aG.axis.p2c(aG.to));
if(aD||aJ){var ay=aL.lineWidth||L.grid.markingsLineWidth,aP=ay%2?0.5:0;
D.beginPath();D.strokeStyle=aL.color||L.grid.markingsColor;
D.lineWidth=ay;if(aD){D.moveTo(aC.to+aP,aG.from);
D.lineTo(aC.to+aP,aG.to)}else{D.moveTo(aC.from,aG.to+aP);
D.lineTo(aC.to,aG.to+aP)}D.stroke()}else{D.fillStyle=aL.color||L.grid.markingsColor;
D.fillRect(aC.from,aG.to,aC.to-aC.from,aG.from-aG.to)
}}}aN=j();aR=L.grid.borderWidth;for(var aM=0;aM<aN.length;
++aM){var az=aN[aM],aH=az.box,aK=az.tickLength,aF,aE,aQ,aS;
if(!az.show||az.ticks.length==0){continue}D.lineWidth=1;
if(az.direction=="x"){aF=0;if(aK=="full"){aE=(az.position=="top"?0:ad)
}else{aE=aH.top-J.top+(az.position=="top"?aH.height:0)
}}else{aE=0;if(aK=="full"){aF=(az.position=="left"?0:k)
}else{aF=aH.left-J.left+(az.position=="left"?aH.width:0)
}}if(!az.innermost){D.strokeStyle=az.options.color;
D.beginPath();aQ=aS=0;if(az.direction=="x"){aQ=k+1
}else{aS=ad+1}if(D.lineWidth==1){if(az.direction=="x"){aE=Math.floor(aE)+0.5
}else{aF=Math.floor(aF)+0.5}}D.moveTo(aF,aE);D.lineTo(aF+aQ,aE+aS);
D.stroke()}D.strokeStyle=az.options.tickColor;D.beginPath();
for(aO=0;aO<az.ticks.length;++aO){var aI=az.ticks[aO].v;
aQ=aS=0;if(isNaN(aI)||aI<az.min||aI>az.max||(aK=="full"&&((typeof aR=="object"&&aR[az.position]>0)||aR>0)&&(aI==az.min||aI==az.max))){continue
}if(az.direction=="x"){aF=az.p2c(aI);aS=aK=="full"?-ad:aK;
if(az.position=="top"){aS=-aS}}else{aE=az.p2c(aI);
aQ=aK=="full"?-k:aK;if(az.position=="left"){aQ=-aQ
}}if(D.lineWidth==1){if(az.direction=="x"){aF=Math.floor(aF)+0.5
}else{aE=Math.floor(aE)+0.5}}D.moveTo(aF,aE);D.lineTo(aF+aQ,aE+aS)
}D.stroke()}if(aR){aA=L.grid.borderColor;if(typeof aR=="object"||typeof aA=="object"){if(typeof aR!=="object"){aR={top:aR,right:aR,bottom:aR,left:aR}
}if(typeof aA!=="object"){aA={top:aA,right:aA,bottom:aA,left:aA}
}if(aR.top>0){D.strokeStyle=aA.top;D.lineWidth=aR.top;
D.beginPath();D.moveTo(0-aR.left,0-aR.top/2);D.lineTo(k,0-aR.top/2);
D.stroke()}if(aR.right>0){D.strokeStyle=aA.right;
D.lineWidth=aR.right;D.beginPath();D.moveTo(k+aR.right/2,0-aR.top);
D.lineTo(k+aR.right/2,ad);D.stroke()}if(aR.bottom>0){D.strokeStyle=aA.bottom;
D.lineWidth=aR.bottom;D.beginPath();D.moveTo(k+aR.right,ad+aR.bottom/2);
D.lineTo(0,ad+aR.bottom/2);D.stroke()}if(aR.left>0){D.strokeStyle=aA.left;
D.lineWidth=aR.left;D.beginPath();D.moveTo(0-aR.left/2,ad+aR.bottom);
D.lineTo(0-aR.left/2,0);D.stroke()}}else{D.lineWidth=aR;
D.strokeStyle=L.grid.borderColor;D.strokeRect(-aR/2,-aR/2,k+aR,ad+aR)
}}D.restore()}function at(){e.each(j(),function(aJ,az){var aC=az.box,aB=az.direction+"Axis "+az.direction+az.n+"Axis",aF="flot-"+az.direction+"-axis flot-"+az.direction+az.n+"-axis "+aB,ay=az.options.font||"flot-tick-label tickLabel",aD,aI,aG,aE,aH;
ac.removeText(aF);if(!az.show||az.ticks.length==0){return
}for(var aA=0;aA<az.ticks.length;++aA){aD=az.ticks[aA];
if(!aD.label||aD.v<az.min||aD.v>az.max){continue}if(az.direction=="x"){aE="center";
aI=J.left+az.p2c(aD.v);if(az.position=="bottom"){aG=aC.top+aC.padding
}else{aG=aC.top+aC.height-aC.padding;aH="bottom"}}else{aH="middle";
aG=J.top+az.p2c(aD.v);if(az.position=="left"){aI=aC.left+aC.width-aC.padding;
aE="right"}else{aI=aC.left+aC.padding}}ac.addText(aF,aI,aG,aD.label,ay,null,null,aE,aH)
}})}function aj(ay){if(ay.lines.show){G(ay)}if(ay.bars.show){T(ay)
}if(ay.points.show){U(ay)}}function G(aB){function aA(aM,aN,aF,aR,aQ){var aS=aM.points,aG=aM.pointsize,aK=null,aJ=null;
D.beginPath();for(var aL=aG;aL<aS.length;aL+=aG){var aI=aS[aL-aG],aP=aS[aL-aG+1],aH=aS[aL],aO=aS[aL+1];
if(aI==null||aH==null){continue}if(aP<=aO&&aP<aQ.min){if(aO<aQ.min){continue
}aI=(aQ.min-aP)/(aO-aP)*(aH-aI)+aI;aP=aQ.min}else{if(aO<=aP&&aO<aQ.min){if(aP<aQ.min){continue
}aH=(aQ.min-aP)/(aO-aP)*(aH-aI)+aI;aO=aQ.min}}if(aP>=aO&&aP>aQ.max){if(aO>aQ.max){continue
}aI=(aQ.max-aP)/(aO-aP)*(aH-aI)+aI;aP=aQ.max}else{if(aO>=aP&&aO>aQ.max){if(aP>aQ.max){continue
}aH=(aQ.max-aP)/(aO-aP)*(aH-aI)+aI;aO=aQ.max}}if(aI<=aH&&aI<aR.min){if(aH<aR.min){continue
}aP=(aR.min-aI)/(aH-aI)*(aO-aP)+aP;aI=aR.min}else{if(aH<=aI&&aH<aR.min){if(aI<aR.min){continue
}aO=(aR.min-aI)/(aH-aI)*(aO-aP)+aP;aH=aR.min}}if(aI>=aH&&aI>aR.max){if(aH>aR.max){continue
}aP=(aR.max-aI)/(aH-aI)*(aO-aP)+aP;aI=aR.max}else{if(aH>=aI&&aH>aR.max){if(aI>aR.max){continue
}aO=(aR.max-aI)/(aH-aI)*(aO-aP)+aP;aH=aR.max}}if(aI!=aK||aP!=aJ){D.moveTo(aR.p2c(aI)+aN,aQ.p2c(aP)+aF)
}aK=aH;aJ=aO;D.lineTo(aR.p2c(aH)+aN,aQ.p2c(aO)+aF)
}D.stroke()}function aC(aF,aN,aM){var aT=aF.points,aS=aF.pointsize,aK=Math.min(Math.max(0,aM.min),aM.max),aU=0,aR,aQ=false,aJ=1,aI=0,aO=0;
while(true){if(aS>0&&aU>aT.length+aS){break}aU+=aS;
var aW=aT[aU-aS],aH=aT[aU-aS+aJ],aV=aT[aU],aG=aT[aU+aJ];
if(aQ){if(aS>0&&aW!=null&&aV==null){aO=aU;aS=-aS;
aJ=2;continue}if(aS<0&&aU==aI+aS){D.fill();aQ=false;
aS=-aS;aJ=1;aU=aI=aO+aS;continue}}if(aW==null||aV==null){continue
}if(aW<=aV&&aW<aN.min){if(aV<aN.min){continue}aH=(aN.min-aW)/(aV-aW)*(aG-aH)+aH;
aW=aN.min}else{if(aV<=aW&&aV<aN.min){if(aW<aN.min){continue
}aG=(aN.min-aW)/(aV-aW)*(aG-aH)+aH;aV=aN.min}}if(aW>=aV&&aW>aN.max){if(aV>aN.max){continue
}aH=(aN.max-aW)/(aV-aW)*(aG-aH)+aH;aW=aN.max}else{if(aV>=aW&&aV>aN.max){if(aW>aN.max){continue
}aG=(aN.max-aW)/(aV-aW)*(aG-aH)+aH;aV=aN.max}}if(!aQ){D.beginPath();
D.moveTo(aN.p2c(aW),aM.p2c(aK));aQ=true}if(aH>=aM.max&&aG>=aM.max){D.lineTo(aN.p2c(aW),aM.p2c(aM.max));
D.lineTo(aN.p2c(aV),aM.p2c(aM.max));continue}else{if(aH<=aM.min&&aG<=aM.min){D.lineTo(aN.p2c(aW),aM.p2c(aM.min));
D.lineTo(aN.p2c(aV),aM.p2c(aM.min));continue}}var aL=aW,aP=aV;
if(aH<=aG&&aH<aM.min&&aG>=aM.min){aW=(aM.min-aH)/(aG-aH)*(aV-aW)+aW;
aH=aM.min}else{if(aG<=aH&&aG<aM.min&&aH>=aM.min){aV=(aM.min-aH)/(aG-aH)*(aV-aW)+aW;
aG=aM.min}}if(aH>=aG&&aH>aM.max&&aG<=aM.max){aW=(aM.max-aH)/(aG-aH)*(aV-aW)+aW;
aH=aM.max}else{if(aG>=aH&&aG>aM.max&&aH<=aM.max){aV=(aM.max-aH)/(aG-aH)*(aV-aW)+aW;
aG=aM.max}}if(aW!=aL){D.lineTo(aN.p2c(aL),aM.p2c(aH))
}D.lineTo(aN.p2c(aW),aM.p2c(aH));D.lineTo(aN.p2c(aV),aM.p2c(aG));
if(aV!=aP){D.lineTo(aN.p2c(aV),aM.p2c(aG));D.lineTo(aN.p2c(aP),aM.p2c(aG))
}}}D.save();D.translate(J.left,J.top);D.lineJoin="round";
var aD=aB.lines.lineWidth,ay=aB.shadowSize;if(aD>0&&ay>0){D.lineWidth=ay;
D.strokeStyle="rgba(0,0,0,0.1)";var aE=Math.PI/18;
aA(aB.datapoints,Math.sin(aE)*(aD/2+ay/2),Math.cos(aE)*(aD/2+ay/2),aB.xaxis,aB.yaxis);
D.lineWidth=ay/2;aA(aB.datapoints,Math.sin(aE)*(aD/2+ay/4),Math.cos(aE)*(aD/2+ay/4),aB.xaxis,aB.yaxis)
}D.lineWidth=aD;D.strokeStyle=aB.color;var az=z(aB.lines,aB.color,0,ad);
if(az){D.fillStyle=az;aC(aB.datapoints,aB.xaxis,aB.yaxis)
}if(aD>0){aA(aB.datapoints,0,0,aB.xaxis,aB.yaxis)
}D.restore()}function U(aB){function aE(aK,aJ,aR,aH,aP,aQ,aN,aG){var aO=aK.points,aF=aK.pointsize;
for(var aI=0;aI<aO.length;aI+=aF){var aM=aO[aI],aL=aO[aI+1];
if(aM==null||aM<aQ.min||aM>aQ.max||aL<aN.min||aL>aN.max){continue
}D.beginPath();aM=aQ.p2c(aM);aL=aN.p2c(aL)+aH;if(aG=="circle"){D.arc(aM,aL,aJ,0,aP?Math.PI:Math.PI*2,false)
}else{aG(D,aM,aL,aJ,aP)}D.closePath();if(aR){D.fillStyle=aR;
D.fill()}D.stroke()}}D.save();D.translate(J.left,J.top);
var aD=aB.points.lineWidth,az=aB.shadowSize,ay=aB.points.radius,aC=aB.points.symbol;
if(aD==0){aD=0.0001}if(aD>0&&az>0){var aA=az/2;D.lineWidth=aA;
D.strokeStyle="rgba(0,0,0,0.1)";aE(aB.datapoints,ay,null,aA+aA/2,true,aB.xaxis,aB.yaxis,aC);
D.strokeStyle="rgba(0,0,0,0.2)";aE(aB.datapoints,ay,null,aA/2,true,aB.xaxis,aB.yaxis,aC)
}D.lineWidth=aD;D.strokeStyle=aB.color;aE(aB.datapoints,ay,z(aB.points,aB.color),0,false,aB.xaxis,aB.yaxis,aC);
D.restore()}function ak(aJ,aI,aR,aE,aM,aA,aH,aG,aQ,aN,az){var aB,aP,aF,aL,aC,ay,aK,aD,aO;
if(aN){aD=ay=aK=true;aC=false;aB=aR;aP=aJ;aL=aI+aE;
aF=aI+aM;if(aP<aB){aO=aP;aP=aB;aB=aO;aC=true;ay=false
}}else{aC=ay=aK=true;aD=false;aB=aJ+aE;aP=aJ+aM;aF=aR;
aL=aI;if(aL<aF){aO=aL;aL=aF;aF=aO;aD=true;aK=false
}}if(aP<aH.min||aB>aH.max||aL<aG.min||aF>aG.max){return
}if(aB<aH.min){aB=aH.min;aC=false}if(aP>aH.max){aP=aH.max;
ay=false}if(aF<aG.min){aF=aG.min;aD=false}if(aL>aG.max){aL=aG.max;
aK=false}aB=aH.p2c(aB);aF=aG.p2c(aF);aP=aH.p2c(aP);
aL=aG.p2c(aL);if(aA){aQ.fillStyle=aA(aF,aL);aQ.fillRect(aB,aL,aP-aB,aF-aL)
}if(az>0&&(aC||ay||aK||aD)){aQ.beginPath();aQ.moveTo(aB,aF);
if(aC){aQ.lineTo(aB,aL)}else{aQ.moveTo(aB,aL)}if(aK){aQ.lineTo(aP,aL)
}else{aQ.moveTo(aP,aL)}if(ay){aQ.lineTo(aP,aF)}else{aQ.moveTo(aP,aF)
}if(aD){aQ.lineTo(aB,aF)}else{aQ.moveTo(aB,aF)}aQ.stroke()
}}function T(aA){function az(aF,aE,aH,aG,aJ,aI){var aK=aF.points,aC=aF.pointsize;
for(var aD=0;aD<aK.length;aD+=aC){if(aK[aD]==null){continue
}ak(aK[aD],aK[aD+1],aK[aD+2],aE,aH,aG,aJ,aI,D,aA.bars.horizontal,aA.bars.lineWidth)
}}D.save();D.translate(J.left,J.top);D.lineWidth=aA.bars.lineWidth;
D.strokeStyle=aA.color;var ay;switch(aA.bars.align){case"left":ay=0;
break;case"right":ay=-aA.bars.barWidth;break;default:ay=-aA.bars.barWidth/2
}var aB=aA.bars.fill?function(aC,aD){return z(aA.bars,aA.color,aC,aD)
}:null;az(aA.datapoints,ay,ay+aA.bars.barWidth,aB,aA.xaxis,aA.yaxis);
D.restore()}function z(aA,ay,az,aC){var aB=aA.fill;
if(!aB){return null}if(aA.fillColor){return v(aA.fillColor,az,aC,ay)
}var aD=e.color.parse(ay);aD.a=typeof aB=="number"?aB:0.4;
aD.normalize();return aD.toString()}function av(){if(L.legend.container!=null){e(L.legend.container).html("")
}else{Q.find(".legend").remove()}if(!L.legend.show){return
}var aG=[],aD=[],aE=false,aN=L.legend.labelFormatter,aM,aI;
for(var aC=0;aC<t.length;++aC){aM=t[aC];if(aM.label){aI=aN?aN(aM.label,aM):aM.label;
if(aI){aD.push({label:aI,color:aM.color})}}}if(L.legend.sorted){if(e.isFunction(L.legend.sorted)){aD.sort(L.legend.sorted)
}else{if(L.legend.sorted=="reverse"){aD.reverse()
}else{var aB=L.legend.sorted!="descending";aD.sort(function(aP,aO){return aP.label==aO.label?0:((aP.label<aO.label)!=aB?1:-1)
})}}}for(var aC=0;aC<aD.length;++aC){var aK=aD[aC];
if(aC%L.legend.noColumns==0){if(aE){aG.push("</tr>")
}aG.push("<tr>");aE=true}aG.push('<td class="legendColorBox"><div style="border:1px solid '+L.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+aK.color+';overflow:hidden"></div></div></td><td class="legendLabel">'+aK.label+"</td>")
}if(aE){aG.push("</tr>")}if(aG.length==0){return}var aL='<table style="font-size:smaller;color:'+L.grid.color+'">'+aG.join("")+"</table>";
if(L.legend.container!=null){e(L.legend.container).html(aL)
}else{var aH="",az=L.legend.position,aA=L.legend.margin;
if(aA[0]==null){aA=[aA,aA]}if(az.charAt(0)=="n"){aH+="top:"+(aA[1]+J.top)+"px;"
}else{if(az.charAt(0)=="s"){aH+="bottom:"+(aA[1]+J.bottom)+"px;"
}}if(az.charAt(1)=="e"){aH+="right:"+(aA[0]+J.right)+"px;"
}else{if(az.charAt(1)=="w"){aH+="left:"+(aA[0]+J.left)+"px;"
}}var aJ=e('<div class="legend">'+aL.replace('style="','style="position:absolute;'+aH+";")+"</div>").appendTo(Q);
if(L.legend.backgroundOpacity!=0){var aF=L.legend.backgroundColor;
if(aF==null){aF=L.grid.backgroundColor;if(aF&&typeof aF=="string"){aF=e.color.parse(aF)
}else{aF=e.color.extract(aJ,"background-color")}aF.a=1;
aF=aF.toString()}var ay=aJ.children();e('<div style="position:absolute;width:'+ay.width()+"px;height:"+ay.height()+"px;"+aH+"background-color:"+aF+';"> </div>').prependTo(aJ).css("opacity",L.legend.backgroundOpacity)
}}}var ag=[],l=null;function ap(aF,aD,aA){var aL=L.grid.mouseActiveRadius,aX=aL*aL+1,aV=null,aO=false,aT,aR,aQ;
for(aT=t.length-1;aT>=0;--aT){if(!aA(t[aT])){continue
}var aM=t[aT],aE=aM.xaxis,aC=aM.yaxis,aS=aM.datapoints.points,aN=aE.c2p(aF),aK=aC.c2p(aD),az=aL/aE.scale,ay=aL/aC.scale;
aQ=aM.datapoints.pointsize;if(aE.options.inverseTransform){az=Number.MAX_VALUE
}if(aC.options.inverseTransform){ay=Number.MAX_VALUE
}if(aM.lines.show||aM.points.show){for(aR=0;aR<aS.length;
aR+=aQ){var aH=aS[aR],aG=aS[aR+1];if(aH==null){continue
}if(aH-aN>az||aH-aN<-az||aG-aK>ay||aG-aK<-ay){continue
}var aJ=Math.abs(aE.p2c(aH)-aF),aI=Math.abs(aC.p2c(aG)-aD),aP=aJ*aJ+aI*aI;
if(aP<aX){aX=aP;aV=[aT,aR/aQ]}}}if(aM.bars.show&&!aV){var aB,aU;
switch(aM.bars.align){case"left":aB=0;break;case"right":aB=-aM.bars.barWidth;
break;default:aB=-aM.bars.barWidth/2}aU=aB+aM.bars.barWidth;
for(aR=0;aR<aS.length;aR+=aQ){var aH=aS[aR],aG=aS[aR+1],aW=aS[aR+2];
if(aH==null){continue}if(t[aT].bars.horizontal?(aN<=Math.max(aW,aH)&&aN>=Math.min(aW,aH)&&aK>=aG+aB&&aK<=aG+aU):(aN>=aH+aB&&aN<=aH+aU&&aK>=Math.min(aW,aG)&&aK<=Math.max(aW,aG))){aV=[aT,aR/aQ]
}}}}if(aV){aT=aV[0];aR=aV[1];aQ=t[aT].datapoints.pointsize;
return{datapoint:t[aT].datapoints.points.slice(aR*aQ,(aR+1)*aQ),dataIndex:aR,series:t[aT],seriesIndex:aT}
}return null}function f(ay){if(L.grid.hoverable){i("plothover",ay,function(az){return az.hoverable!=false
})}}function P(ay){if(L.grid.hoverable){i("plothover",ay,function(az){return false
})}}function I(ay){i("plotclick",ay,function(az){return az.clickable!=false
})}function i(az,ay,aA){var aB=am.offset(),aE=ay.pageX-aB.left-J.left,aC=ay.pageY-aB.top-J.top,aG=Y({left:aE,top:aC});
aG.pageX=ay.pageX;aG.pageY=ay.pageY;var aH=ap(aE,aC,aA);
if(aH){aH.pageX=parseInt(aH.series.xaxis.p2c(aH.datapoint[0])+aB.left+J.left,10);
aH.pageY=parseInt(aH.series.yaxis.p2c(aH.datapoint[1])+aB.top+J.top,10)
}if(L.grid.autoHighlight){for(var aD=0;aD<ag.length;
++aD){var aF=ag[aD];if(aF.auto==az&&!(aH&&aF.series==aH.series&&aF.point[0]==aH.datapoint[0]&&aF.point[1]==aH.datapoint[1])){ah(aF.series,aF.point)
}}if(aH){an(aH.series,aH.datapoint,az)}}Q.trigger(az,[aG,aH])
}function X(){var ay=L.interaction.redrawOverlayInterval;
if(ay==-1){af();return}if(!l){l=setTimeout(af,ay)
}}function af(){l=null;aw.save();al.clear();aw.translate(J.left,J.top);
var az,ay;for(az=0;az<ag.length;++az){ay=ag[az];if(ay.series.bars.show){ai(ay.series,ay.point)
}else{ae(ay.series,ay.point)}}aw.restore();F(p.drawOverlay,[aw])
}function an(aA,ay,aC){if(typeof aA=="number"){aA=t[aA]
}if(typeof ay=="number"){var aB=aA.datapoints.pointsize;
ay=aA.datapoints.points.slice(aB*ay,aB*(ay+1))}var az=N(aA,ay);
if(az==-1){ag.push({series:aA,point:ay,auto:aC});
X()}else{if(!aC){ag[az].auto=false}}}function ah(aA,ay){if(aA==null&&ay==null){ag=[];
X();return}if(typeof aA=="number"){aA=t[aA]}if(typeof ay=="number"){var aB=aA.datapoints.pointsize;
ay=aA.datapoints.points.slice(aB*ay,aB*(ay+1))}var az=N(aA,ay);
if(az!=-1){ag.splice(az,1);X()}}function N(aA,aB){for(var ay=0;
ay<ag.length;++ay){var az=ag[ay];if(az.series==aA&&az.point[0]==aB[0]&&az.point[1]==aB[1]){return ay
}}return -1}function ae(ay,aE){var aC=aE[0],aA=aE[1],aF=ay.xaxis,aD=ay.yaxis,aG=(typeof ay.highlightColor==="string")?ay.highlightColor:e.color.parse(ay.color).scale("a",0.5).toString();
if(aC<aF.min||aC>aF.max||aA<aD.min||aA>aD.max){return
}var aB=ay.points.radius+ay.points.lineWidth/2;aw.lineWidth=aB;
aw.strokeStyle=aG;var az=1.5*aB;aC=aF.p2c(aC);aA=aD.p2c(aA);
aw.beginPath();if(ay.points.symbol=="circle"){aw.arc(aC,aA,az,0,2*Math.PI,false)
}else{ay.points.symbol(aw,aC,aA,az,false)}aw.closePath();
aw.stroke()}function ai(aB,ay){var aC=(typeof aB.highlightColor==="string")?aB.highlightColor:e.color.parse(aB.color).scale("a",0.5).toString(),aA=aC,az;
switch(aB.bars.align){case"left":az=0;break;case"right":az=-aB.bars.barWidth;
break;default:az=-aB.bars.barWidth/2}aw.lineWidth=aB.bars.lineWidth;
aw.strokeStyle=aC;ak(ay[0],ay[1],ay[2]||0,az,az+aB.bars.barWidth,function(){return aA
},aB.xaxis,aB.yaxis,aw,aB.bars.horizontal,aB.bars.lineWidth)
}function v(aG,ay,aE,az){if(typeof aG=="string"){return aG
}else{var aF=D.createLinearGradient(0,aE,0,ay);for(var aB=0,aA=aG.colors.length;
aB<aA;++aB){var aC=aG.colors[aB];if(typeof aC!="string"){var aD=e.color.parse(az);
if(aC.brightness!=null){aD=aD.scale("rgb",aC.brightness)
}if(aC.opacity!=null){aD.a*=aC.opacity}aC=aD.toString()
}aF.addColorStop(aB/(aA-1),aC)}return aF}}}e.plot=function(i,g,f){var h=new c(e(i),g,f,e.plot.plugins);
return h};e.plot.version="0.8.3";e.plot.plugins=[];
e.fn.plot=function(g,f){return this.each(function(){e.plot(this,g,f)
})};function b(g,f){return f*Math.floor(g/f)}})(jQuery);
console.log("=============== >  jquery.flot.js ");
(function(d){var k={axisLabels:{show:true}};function e(){return !!document.createElement("canvas").getContext
}function f(){if(!e()){return false}var m=document.createElement("canvas");
var l=m.getContext("2d");return typeof l.fillText=="function"
}function i(){var l=document.createElement("div");
return typeof l.style.MozTransition!="undefined"||typeof l.style.OTransition!="undefined"||typeof l.style.webkitTransition!="undefined"||typeof l.style.transition!="undefined"
}function c(p,l,o,n,m){this.axisName=p;this.position=l;
this.padding=o;this.plot=n;this.opts=m;this.width=0;
this.height=0}c.prototype.cleanup=function(){};b.prototype=new c();
b.prototype.constructor=b;function b(p,l,o,n,m){c.prototype.constructor.call(this,p,l,o,n,m)
}b.prototype.calculateSize=function(){if(!this.opts.axisLabelFontSizePixels){this.opts.axisLabelFontSizePixels=14
}if(!this.opts.axisLabelFontFamily){this.opts.axisLabelFontFamily="sans-serif"
}var m=this.opts.axisLabelFontSizePixels+this.padding;
var l=this.opts.axisLabelFontSizePixels+this.padding;
if(this.position=="left"||this.position=="right"){this.width=this.opts.axisLabelFontSizePixels+this.padding;
this.height=0}else{this.width=0;this.height=this.opts.axisLabelFontSizePixels+this.padding
}};b.prototype.draw=function(p){if(!this.opts.axisLabelColour){this.opts.axisLabelColour="black"
}var n=this.plot.getCanvas().getContext("2d");n.save();
n.font=this.opts.axisLabelFontSizePixels+"px "+this.opts.axisLabelFontFamily;
n.fillStyle=this.opts.axisLabelColour;var o=n.measureText(this.opts.axisLabel).width;
var m=this.opts.axisLabelFontSizePixels;var l,r,q=0;
if(this.position=="top"){l=p.left+p.width/2-o/2;r=p.top+m*0.72
}else{if(this.position=="bottom"){l=p.left+p.width/2-o/2;
r=p.top+p.height-m*0.72}else{if(this.position=="left"){l=p.left+m*0.72;
r=p.height/2+p.top+o/2;q=-Math.PI/2}else{if(this.position=="right"){l=p.left+p.width-m*0.72;
r=p.height/2+p.top-o/2;q=Math.PI/2}}}}n.translate(l,r);
n.rotate(q);n.fillText(this.opts.axisLabel,0,0);n.restore()
};h.prototype=new c();h.prototype.constructor=h;function h(p,l,o,n,m){c.prototype.constructor.call(this,p,l,o,n,m);
this.elem=null}h.prototype.calculateSize=function(){var l=d('<div class="axisLabels" style="position:absolute;">'+this.opts.axisLabel+"</div>");
this.plot.getPlaceholder().append(l);this.labelWidth=l.outerWidth(true);
this.labelHeight=l.outerHeight(true);l.remove();this.width=this.height=0;
if(this.position=="left"||this.position=="right"){this.width=this.labelWidth+this.padding
}else{this.height=this.labelHeight+this.padding}};
h.prototype.cleanup=function(){if(this.elem){this.elem.remove()
}};h.prototype.draw=function(l){this.plot.getPlaceholder().find("#"+this.axisName+"Label").remove();
this.elem=d('<div id="'+this.axisName+'Label" " class="axisLabels" style="position:absolute;">'+this.opts.axisLabel+"</div>");
this.plot.getPlaceholder().append(this.elem);if(this.position=="top"){this.elem.css("left",l.left+l.width/2-this.labelWidth/2+"px");
this.elem.css("top",l.top+"px")}else{if(this.position=="bottom"){this.elem.css("left",l.left+l.width/2-this.labelWidth/2+"px");
this.elem.css("top",l.top+l.height-this.labelHeight+"px")
}else{if(this.position=="left"){this.elem.css("top",l.top+l.height/2-this.labelHeight/2+"px");
this.elem.css("left",l.left+"px")}else{if(this.position=="right"){this.elem.css("top",l.top+l.height/2-this.labelHeight/2+"px");
this.elem.css("left",l.left+l.width-this.labelWidth+"px")
}}}}};g.prototype=new h();g.prototype.constructor=g;
function g(p,l,o,n,m){h.prototype.constructor.call(this,p,l,o,n,m)
}g.prototype.calculateSize=function(){h.prototype.calculateSize.call(this);
this.width=this.height=0;if(this.position=="left"||this.position=="right"){this.width=this.labelHeight+this.padding
}else{this.height=this.labelHeight+this.padding}};
g.prototype.transforms=function(n,r,q){var o={"-moz-transform":"","-webkit-transform":"","-o-transform":"","-ms-transform":""};
if(r!=0||q!=0){var l=" translate("+r+"px, "+q+"px)";
o["-moz-transform"]+=l;o["-webkit-transform"]+=l;
o["-o-transform"]+=l;o["-ms-transform"]+=l}if(n!=0){var t=n/90;
var p=" rotate("+n+"deg)";o["-moz-transform"]+=p;
o["-webkit-transform"]+=p;o["-o-transform"]+=p;o["-ms-transform"]+=p
}var u="top: 0; left: 0; ";for(var m in o){if(o[m]){u+=m+":"+o[m]+";"
}}u+=";";return u};g.prototype.calculateOffsets=function(m){var l={x:0,y:0,degrees:0};
if(this.position=="bottom"){l.x=m.left+m.width/2-this.labelWidth/2;
l.y=m.top+m.height-this.labelHeight}else{if(this.position=="top"){l.x=m.left+m.width/2-this.labelWidth/2;
l.y=m.top}else{if(this.position=="left"){l.degrees=-90;
l.x=m.left-this.labelWidth/2+this.labelHeight/2;l.y=m.height/2+m.top
}else{if(this.position=="right"){l.degrees=90;l.x=m.left+m.width-this.labelWidth/2-this.labelHeight/2;
l.y=m.height/2+m.top}}}}l.x=Math.round(l.x);l.y=Math.round(l.y);
return l};g.prototype.draw=function(m){this.plot.getPlaceholder().find("."+this.axisName+"Label").remove();
var l=this.calculateOffsets(m);this.elem=d('<div class="axisLabels '+this.axisName+'Label" style="position:absolute; '+this.transforms(l.degrees,l.x,l.y)+'">'+this.opts.axisLabel+"</div>");
this.plot.getPlaceholder().append(this.elem)};a.prototype=new g();
a.prototype.constructor=a;function a(p,l,o,n,m){g.prototype.constructor.call(this,p,l,o,n,m);
this.requiresResize=false}a.prototype.transforms=function(o,l,p){var n="";
if(o!=0){var m=o/90;while(m<0){m+=4}n+=" filter: progid:DXImageTransform.Microsoft.BasicImage(rotation="+m+"); ";
this.requiresResize=(this.position=="right")}if(l!=0){n+="left: "+l+"px; "
}if(p!=0){n+="top: "+p+"px; "}return n};a.prototype.calculateOffsets=function(m){var l=g.prototype.calculateOffsets.call(this,m);
if(this.position=="top"){l.y=m.top+1}else{if(this.position=="left"){l.x=m.left;
l.y=m.height/2+m.top-this.labelWidth/2}else{if(this.position=="right"){l.x=m.left+m.width-this.labelHeight;
l.y=m.height/2+m.top-this.labelWidth/2}}}return l
};a.prototype.draw=function(l){g.prototype.draw.call(this,l);
if(this.requiresResize){this.elem=this.plot.getPlaceholder().find("."+this.axisName+"Label");
this.elem.css("width",this.labelWidth);this.elem.css("height",this.labelHeight)
}};function j(l){l.hooks.processOptions.push(function(q,m){if(!m.axisLabels.show){return
}var o=false;var n={};var r={left:0,right:0,top:0,bottom:0};
var p=2;q.hooks.draw.push(function(t,s){var u=false;
if(!o){d.each(t.getAxes(),function(B,x){var y=x.options||t.getOptions()[B];
if(B in n){x.labelHeight=x.labelHeight-n[B].height;
x.labelWidth=x.labelWidth-n[B].width;y.labelHeight=x.labelHeight;
y.labelWidth=x.labelWidth;n[B].cleanup();delete n[B]
}if(!y||!y.axisLabel||!x.show){return}u=true;var z=null;
if(!y.axisLabelUseHtml&&navigator.appName=="Microsoft Internet Explorer"){var v=navigator.userAgent;
var w=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(w.exec(v)!=null){rv=parseFloat(RegExp.$1)
}if(rv>=9&&!y.axisLabelUseCanvas&&!y.axisLabelUseHtml){z=g
}else{if(!y.axisLabelUseCanvas&&!y.axisLabelUseHtml){z=a
}else{if(y.axisLabelUseCanvas){z=b}else{z=h}}}}else{if(y.axisLabelUseHtml||(!i()&&!f())&&!y.axisLabelUseCanvas){z=h
}else{if(y.axisLabelUseCanvas||!i()){z=b}else{z=g
}}}var A=y.axisLabelPadding===undefined?p:y.axisLabelPadding;
n[B]=new z(B,x.position,A,t,y);n[B].calculateSize();
y.labelHeight=x.labelHeight+n[B].height;y.labelWidth=x.labelWidth+n[B].width
});if(u){o=true;t.setupGrid();t.draw()}}else{o=false;
d.each(t.getAxes(),function(x,v){var w=v.options||t.getOptions()[x];
if(!w||!w.axisLabel||!v.show){return}n[x].draw(v.box)
})}})})}d.plot.plugins.push({init:j,options:k,name:"axisLabels",version:"2.0"})
})(jQuery);console.log("=============== >  jquery.flot.axislabels.js ");
(function(a){var i={series:{points:{errorbars:null,xerr:{err:"x",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null},yerr:{err:"y",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null}}}};
function f(n,j,k,m){if(!j.points.errorbars){return
}var l=[{x:true,number:true,required:true},{y:true,number:true,required:true}];
var o=j.points.errorbars;if(o=="x"||o=="xy"){if(j.points.xerr.asymmetric){l.push({x:true,number:true,required:true});
l.push({x:true,number:true,required:true})}else{l.push({x:true,number:true,required:true})
}}if(o=="y"||o=="xy"){if(j.points.yerr.asymmetric){l.push({y:true,number:true,required:true});
l.push({y:true,number:true,required:true})}else{l.push({y:true,number:true,required:true})
}}m.format=l}function h(n,o){var t=n.datapoints.points;
var p=null,k=null,l=null,s=null;var j=n.points.xerr,r=n.points.yerr;
var q=n.points.errorbars;if(q=="x"||q=="xy"){if(j.asymmetric){p=t[o+2];
k=t[o+3];if(q=="xy"){if(r.asymmetric){l=t[o+4];s=t[o+5]
}else{l=t[o+4]}}}else{p=t[o+2];if(q=="xy"){if(r.asymmetric){l=t[o+3];
s=t[o+4]}else{l=t[o+3]}}}}else{if(q=="y"){if(r.asymmetric){l=t[o+2];
s=t[o+3]}else{l=t[o+2]}}}if(k==null){k=p}if(s==null){s=l
}var m=[p,k,l,s];if(!j.show){m[0]=null;m[1]=null}if(!r.show){m[2]=null;
m[3]=null}return m}function d(A,z,t){var D=t.datapoints.points,v=t.datapoints.pointsize,r=[t.xaxis,t.yaxis],k=t.points.radius,m=[t.points.xerr,t.points.yerr];
var E=false;if(r[0].p2c(r[0].max)<r[0].p2c(r[0].min)){E=true;
var I=m[0].lowerCap;m[0].lowerCap=m[0].upperCap;m[0].upperCap=I
}var B=false;if(r[1].p2c(r[1].min)<r[1].p2c(r[1].max)){B=true;
var I=m[1].lowerCap;m[1].lowerCap=m[1].upperCap;m[1].upperCap=I
}for(var F=0;F<t.datapoints.points.length;F+=v){var C=h(t,F);
for(var H=0;H<m.length;H++){var n=[r[H].min,r[H].max];
if(C[H*m.length]){var p=D[F],o=D[F+1];var G=[p,o][H]+C[H*m.length+1],K=[p,o][H]-C[H*m.length];
if(m[H].err=="x"){if(o>r[1].max||o<r[1].min||G<r[0].min||K>r[0].max){continue
}}if(m[H].err=="y"){if(p>r[0].max||p<r[0].min||G<r[1].min||K>r[1].max){continue
}}var J=true,j=true;if(G>n[1]){J=false;G=n[1]}if(K<n[0]){j=false;
K=n[0]}if((m[H].err=="x"&&E)||(m[H].err=="y"&&B)){var I=K;
K=G;G=I;I=j;j=J;J=I;I=n[0];n[0]=n[1];n[1]=I}p=r[0].p2c(p),o=r[1].p2c(o),G=r[H].p2c(G);
K=r[H].p2c(K);n[0]=r[H].p2c(n[0]);n[1]=r[H].p2c(n[1]);
var l=m[H].lineWidth?m[H].lineWidth:t.points.lineWidth,u=t.points.shadowSize!=null?t.points.shadowSize:t.shadowSize;
if(l>0&&u>0){var q=u/2;z.lineWidth=q;z.strokeStyle="rgba(0,0,0,0.1)";
b(z,m[H],p,o,G,K,J,j,k,q+q/2,n);z.strokeStyle="rgba(0,0,0,0.2)";
b(z,m[H],p,o,G,K,J,j,k,q/2,n)}z.strokeStyle=m[H].color?m[H].color:t.color;
z.lineWidth=l;b(z,m[H],p,o,G,K,J,j,k,0,n)}}}}function b(t,l,r,q,s,n,p,j,o,m,k){q+=m;
s+=m;n+=m;if(l.err=="x"){if(s>r+o){c(t,[[s,q],[Math.max(r+o,k[0]),q]])
}else{p=false}if(n<r-o){c(t,[[Math.min(r-o,k[1]),q],[n,q]])
}else{j=false}}else{if(s<q-o){c(t,[[r,s],[r,Math.min(q-o,k[0])]])
}else{p=false}if(n>q+o){c(t,[[r,Math.max(q+o,k[1])],[r,n]])
}else{j=false}}o=l.radius!=null?l.radius:o;if(p){if(l.upperCap=="-"){if(l.err=="x"){c(t,[[s,q-o],[s,q+o]])
}else{c(t,[[r-o,s],[r+o,s]])}}else{if(a.isFunction(l.upperCap)){if(l.err=="x"){l.upperCap(t,s,q,o)
}else{l.upperCap(t,r,s,o)}}}}if(j){if(l.lowerCap=="-"){if(l.err=="x"){c(t,[[n,q-o],[n,q+o]])
}else{c(t,[[r-o,n],[r+o,n]])}}else{if(a.isFunction(l.lowerCap)){if(l.err=="x"){l.lowerCap(t,n,q,o)
}else{l.lowerCap(t,r,n,o)}}}}}function c(j,l){j.beginPath();
j.moveTo(l[0][0],l[0][1]);for(var k=1;k<l.length;
k++){j.lineTo(l[k][0],l[k][1])}j.stroke()}function e(l,j){var k=l.getPlotOffset();
j.save();j.translate(k.left,k.top);a.each(l.getData(),function(m,n){if(n.points.errorbars&&(n.points.xerr.show||n.points.yerr.show)){d(l,j,n)
}});j.restore()}function g(j){j.hooks.processRawData.push(f);
j.hooks.draw.push(e)}a.plot.plugins.push({init:g,options:i,name:"errorbars",version:"1.0"})
})(jQuery);console.log("=============== >  jquery.flot.errorbars.js ");
(function(r){function n(d){var b,c=this,a=d.data||{};
if(a.elem){c=d.dragTarget=a.elem,d.dragProxy=o.proxy||c,d.cursorOffsetX=a.pageX-a.left,d.cursorOffsetY=a.pageY-a.top,d.offsetX=d.pageX-d.cursorOffsetX,d.offsetY=d.pageY-d.cursorOffsetY
}else{if(o.dragging||a.which>0&&d.which!=a.which||r(d.target).is(a.not)){return
}}switch(d.type){case"mousedown":return r.extend(a,r(c).offset(),{elem:c,target:d.target,pageX:d.pageX,pageY:d.pageY}),q.add(document,"mousemove mouseup",n,a),j(c,!1),o.dragging=null,!1;
case !o.dragging&&"mousemove":if(l(d.pageX-a.pageX)+l(d.pageY-a.pageY)<a.distance){break
}d.target=a.target,b=m(d,"dragstart",c),b!==!1&&(o.dragging=c,o.proxy=d.dragProxy=r(b||c)[0]);
case"mousemove":if(o.dragging){if(b=m(d,"drag",c),p.drop&&(p.drop.allowed=b!==!1,p.drop.handler(d)),b!==!1){break
}d.type="mouseup"}case"mouseup":q.remove(document,"mousemove mouseup",n),o.dragging&&(p.drop&&p.drop.handler(d),m(d,"dragend",c)),j(c,!0),o.dragging=o.proxy=a.elem=!1
}return !0}function m(a,h,g){a.type=h;var f=r.event.dispatch.call(g,a);
return f===!1?!1:f||a.result}function l(b){return Math.pow(b,2)
}function k(){return o.dragging===!1}function j(d,c){d&&(d.unselectable=c?"off":"on",d.onselectstart=function(){return c
},d.style&&(d.style.MozUserSelect=c?"":"none"))}r.fn.drag=function(e,d,f){return d&&this.bind("dragstart",e),f&&this.bind("dragend",f),e?this.bind("drag",d?d:e):this.trigger("drag")
};var q=r.event,p=q.special,o=p.drag={not:":input",distance:0,which:1,dragging:!1,setup:function(a){a=r.extend({distance:o.distance,which:o.which,not:o.not},a||{}),a.distance=l(a.distance),q.add(this,"mousedown",n,a),this.attachEvent&&this.attachEvent("ondragstart",k)
},teardown:function(){q.remove(this,"mousedown",n),this===o.dragging&&(o.dragging=o.proxy=!1),j(this,!0),this.detachEvent&&this.detachEvent("ondragstart",k)
}};p.dragstart=p.dragend={setup:function(){},teardown:function(){}}
})(jQuery);(function(f){function b(h){var d=h||window.event,l=[].slice.call(arguments,1),j=0,k=0,i=0,h=f.event.fix(d);
h.type="mousewheel";d.wheelDelta&&(j=d.wheelDelta/120);
d.detail&&(j=-d.detail/3);i=j;void 0!==d.axis&&d.axis===d.HORIZONTAL_AXIS&&(i=0,k=-1*j);
void 0!==d.wheelDeltaY&&(i=d.wheelDeltaY/120);void 0!==d.wheelDeltaX&&(k=-1*d.wheelDeltaX/120);
l.unshift(h,j,k,i);return(f.event.dispatch||f.event.handle).apply(this,l)
}var g=["DOMMouseScroll","mousewheel"];if(f.event.fixHooks){for(var a=g.length;
a;){f.event.fixHooks[g[--a]]=f.event.mouseHooks}}f.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var c=g.length;
c;){this.addEventListener(g[--c],b,!1)}}else{this.onmousewheel=b
}},teardown:function(){if(this.removeEventListener){for(var c=g.length;
c;){this.removeEventListener(g[--c],b,!1)}}else{this.onmousewheel=null
}}};f.fn.extend({mousewheel:function(c){return c?this.bind("mousewheel",c):this.trigger("mousewheel")
},unmousewheel:function(c){return this.unbind("mousewheel",c)
}})})(jQuery);(function(b){var a={xaxis:{zoomRange:null,panRange:null},zoom:{interactive:false,trigger:"dblclick",amount:1.5},pan:{interactive:false,cursor:"move",frameRate:20}};
function c(o){function m(q,p){var r=o.offset();r.left=q.pageX-r.left;
r.top=q.pageY-r.top;if(p){o.zoomOut({center:r})}else{o.zoom({center:r})
}}function d(p,q){p.preventDefault();m(p,q<0);return false
}var i="default",g=0,e=0,n=null;function f(p){if(p.which!=1){return false
}var q=o.getPlaceholder().css("cursor");if(q){i=q
}o.getPlaceholder().css("cursor",o.getOptions().pan.cursor);
g=p.pageX;e=p.pageY}function j(q){var p=o.getOptions().pan.frameRate;
if(n||!p){return}n=setTimeout(function(){o.pan({left:g-q.pageX,top:e-q.pageY});
g=q.pageX;e=q.pageY;n=null},1/p*1000)}function h(p){if(n){clearTimeout(n);
n=null}o.getPlaceholder().css("cursor",i);o.pan({left:g-p.pageX,top:e-p.pageY})
}function l(q,p){var r=q.getOptions();if(r.zoom.interactive){p[r.zoom.trigger](m);
p.mousewheel(d)}if(r.pan.interactive){p.bind("dragstart",{distance:10},f);
p.bind("drag",j);p.bind("dragend",h)}}o.zoomOut=function(p){if(!p){p={}
}if(!p.amount){p.amount=o.getOptions().zoom.amount
}p.amount=1/p.amount;o.zoom(p)};o.zoom=function(q){if(!q){q={}
}var x=q.center,r=q.amount||o.getOptions().zoom.amount,p=o.width(),t=o.height();
if(!x){x={left:p/2,top:t/2}}var s=x.left/p,v=x.top/t,u={x:{min:x.left-s*p/r,max:x.left+(1-s)*p/r},y:{min:x.top-v*t/r,max:x.top+(1-v)*t/r}};
b.each(o.getAxes(),function(F,z){var w=z.options,A=u[z.direction].min,E=u[z.direction].max,D=w.zoomRange,y=w.panRange;
if(D===false){return}A=z.c2p(A);E=z.c2p(E);if(A>E){var B=A;
A=E;E=B}if(y){if(y[0]!=null&&A<y[0]){A=y[0]}if(y[1]!=null&&E>y[1]){E=y[1]
}}var C=E-A;if(D&&((D[0]!=null&&C<D[0]&&r>1)||(D[1]!=null&&C>D[1]&&r<1))){return
}w.min=A;w.max=E});o.setupGrid();o.draw();if(!q.preventEvent){o.getPlaceholder().trigger("plotzoom",[o,q])
}};o.pan=function(p){var q={x:+p.left,y:+p.top};if(isNaN(q.x)){q.x=0
}if(isNaN(q.y)){q.y=0}b.each(o.getAxes(),function(s,u){var v=u.options,t,r,w=q[u.direction];
t=u.c2p(u.p2c(u.min)+w),r=u.c2p(u.p2c(u.max)+w);var x=v.panRange;
if(x===false){return}if(x){if(x[0]!=null&&x[0]>t){w=x[0]-t;
t+=w;r+=w}if(x[1]!=null&&x[1]<r){w=x[1]-r;t+=w;r+=w
}}v.min=t;v.max=r});o.setupGrid();o.draw();if(!p.preventEvent){o.getPlaceholder().trigger("plotpan",[o,p])
}};function k(q,p){p.unbind(q.getOptions().zoom.trigger,m);
p.unbind("mousewheel",d);p.unbind("dragstart",f);
p.unbind("drag",j);p.unbind("dragend",h);if(n){clearTimeout(n)
}}o.hooks.bindEvents.push(l);o.hooks.shutdown.push(k)
}b.plot.plugins.push({init:c,options:a,name:"navigate",version:"1.3"})
})(jQuery);console.log("=============== >  jquery.flot.navigate.js ");
(function(b){function a(h,e,g){var d={square:function(k,j,n,i,m){var l=i*Math.sqrt(Math.PI)/2;
k.rect(j-l,n-l,l+l,l+l)},diamond:function(k,j,n,i,m){var l=i*Math.sqrt(Math.PI/2);
k.moveTo(j-l,n);k.lineTo(j,n-l);k.lineTo(j+l,n);k.lineTo(j,n+l);
k.lineTo(j-l,n)},triangle:function(l,k,o,j,n){var m=j*Math.sqrt(2*Math.PI/Math.sin(Math.PI/3));
var i=m*Math.sin(Math.PI/3);l.moveTo(k-m/2,o+i/2);
l.lineTo(k+m/2,o+i/2);if(!n){l.lineTo(k,o-i/2);l.lineTo(k-m/2,o+i/2)
}},cross:function(k,j,n,i,m){var l=i*Math.sqrt(Math.PI)/2;
k.moveTo(j-l,n-l);k.lineTo(j+l,n+l);k.moveTo(j-l,n+l);
k.lineTo(j+l,n-l)}};var f=e.points.symbol;if(d[f]){e.points.symbol=d[f]
}}function c(d){d.hooks.processDatapoints.push(a)
}b.plot.plugins.push({init:c,name:"symbols",version:"1.0"})
})(jQuery);console.log("=============== >  jquery.flot.symbol.js ");