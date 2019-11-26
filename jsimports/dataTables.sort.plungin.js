jQuery.extend(jQuery.fn.dataTableExt).oSort,{
	"html-percent-pre":function(a){
		var x = String(a).replace(/<[\s\S]*?>/g,"");
		x = x.replace(/&amp;nbsp;/ig,"");
		x = x.replace(/%/,"");
		return parseFloat(x);
	},
	"html-percent-asc":function(a,b){
		return ((a<b)?-1:((a>b)?1:0));
	},
	"html-percent-desc":function(a,b){
		return ((a<b)?1:((a>b)?-1:0));
	}
	
}