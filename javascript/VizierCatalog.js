var VizierCatalogue = function(){
	
	var showSourceData = function(data){
		var e = event||window.event;
		var width=$("#aladin-lite-div").width();
		var length=$("#aladin-lite-div").height();
		var x=e.clientX;
		var y=e.clientY;
		 //alert(JSON.stringify(data.data));
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var SourceDiv = $("#SourceDiv");
		if( SourceDiv.css("display") == "none"){
			SourceDiv.css("display", "block");
			SourceDiv.css("position", "center");
			if(x+300>width)
				SourceDiv.css("left",width-400);
			else
				SourceDiv.css("left",x);
			if(y+300>length)
				SourceDiv.css("top",length-400);
			else
				SourceDiv.css("top",y);
		}
		var name = (data.data) ? data.catalog.name : "Alix Master Catalogue"
		var source_label = ""
		if (data.data ) {
			if(data.data.CatalogName){
				name = data.data.CatalogName;
			}
			if(data.data.name){
				source_label = "<span class=strong style='font-size: 15px;'><center><strong>" + data.data.name + "</center></strong></span>";
			}
		}
		 SourceDiv.html("<span class=strong style='font-size: 15px;'><center><strong>" + name + "</center></strong></span>\n"
					+ '<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
					+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
					+ '<span class="glyphicon_SourceClose glyphicon-remove"></span></a>'
					+ source_label
					+ "<span class=strong style='font-size: 15px;'><center><strong>" + '    '+strlon + ' ' +strlat + "</center></strong></span><br>");
		 //var header = '<thead><tr>';
	     var content = '<thead>';
	     if( data.data != undefined){
	    	 for (var key in data.data){
		    	 if(data.data[key])
		    		 content+='<tr><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
		     }
	     }
	     else{
	    	 for (key in data){
		    	 if(data[key])
		    		 content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
		     }
	     }
	     content+='<thead>'
	     SourceDiv.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">' + content + '</table></div>');
	     if(data.ra && name == "Simbad" ){
	    	 var pos=strlon+" " +strlat;
	    	 SimbadCatalog.simbad(pos,data);
	     }
	}
	
	var showXMMSourceData = function(data){
		var e = event||window.event;
		var width=$("#aladin-lite-div").width();
		var length=$("#aladin-lite-div").height();
		var x=e.clientX;
		var y=e.clientY;
		 //alert(JSON.stringify(data.data));
		var strlon = Numbers.toSexagesimal(data.ra/15, 8, false);
		var strlat = Numbers.toSexagesimal(data.dec, 7, false);
		var SourceDiv = $("#SourceDiv");
		if( SourceDiv.css("display") == "none"){
			SourceDiv.css("display", "block");
			SourceDiv.css("position", "center");
			if(x+300>width)
				SourceDiv.css("left",width-400);
			else
				SourceDiv.css("left",x);
			if(y+300>length)
				SourceDiv.css("top",length-400);
			else
				SourceDiv.css("top",y);
		}
		 SourceDiv.html("<span class=strong style='font-size: 18px;'><center><strong>" + "XMM" + "</center></strong></span>\n"
					+ '<a href="#" onclick="$(&quot;#SourceDiv&quot;).css(&quot;display&quot;, &quot;none&quot;);" '
					+ 'style="top: 18px;float: right;" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
					+ '<span class="glyphicon_SourceClose glyphicon-remove"></span></a>'
					+"<span class=strong style='font-size: 15px;'><center><strong>" + '    '+strlon + ' ' + '+'+strlat + "</center></strong></span><br>");
		 //var header = '<thead><tr>';
	     var content = '<thead>';
	     /*for (key in data.data) {
	    	 header += '<th>' + key + '</th>';
	         content += '<td>' + data.data[key] + '</td>';
	     }*/
	     //header += '</tr></thead>';
	     //content += '</tr>';
	     //SourceDiv.append('<table>' + header + content + '</table>');
		 //$("#aladin-lite-div").append(SourceDiv);
	     for (key in data){
	    	 if(data[key])
	    		 content+='<tr><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data[key]+'</td></tr>';
	     }
	     content+='<thead>'
	     SourceDiv.append('<div id="SourceDiv_Child"><table id="SourceDiv_table">' + content + '</table></div>');
	}
	
	var SourceDataMove = function(){
		
			var move=false;
			var _x,_y;
			$("#SourceDiv").mousedown(function(event){
				move=true;
				_x=event.pageX-$("#SourceDiv").position().left;
				_y=event.pageY-$("#SourceDiv").position().top;
			});
			$("#SourceDiv").mousemove(function(event){
				if(move){
					var x=event.pageX-_x;
					var y=event.pageY-_y;
					$("#SourceDiv").css("left",x);
					$("#SourceDiv").css("top",y);
				}
			}).mouseup(function(){
				move = false;
			}).mouseleave(function(){
				move = false;
			});
		
		
	}
	var retour = {
			showSourceData : showSourceData,
			SourceDataMove : SourceDataMove,
			showXMMSourceData : showXMMSourceData
			
	};
	
	return retour;
}();