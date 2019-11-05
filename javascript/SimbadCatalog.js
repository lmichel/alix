var SimbadCatalog = function(){
	var simbad = function (data) {
		/**
		 ** part of VizierCatalog
		 */
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var pos = strlon+" " +strlat;
		var content = '<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
		if( data.data != undefined){
	    	for (key in data.data){
		    	if(data.data[key])
		    		content+='<tr style="background-color:#f2f2f2;"><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
		    }
	    }
	    else{
	    	for (key in data){
		    	if(data[key])
		    		content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
		    }
	    }
	    content += '</table></div></div>';
		/**
		 * Translate SimbadTooltip.java
		 */
		var url = "http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
		url += encodeURIComponent("format object \"%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)\"\n" + pos + " radius=1m", "ISO-8859-1");
		//Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			//url:'http://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=format+object+%22%25IDLIST%5B%25-30*%5D%7C-%25COO%28A%29%7C%25COO%28D%29%7C%25OTYPELIST%28S%29%22%0A01+33+50.904+%2B30+39+35.79+radius%3D1m',
			url: url,
			method: 'GET',
	        async: true,
	        dataType: 'text',
	        success: function(jsdata){
				Processing.hide();
				
				var boeuf;
				var data_found = false;
				var json = {};
				var dataarray = [];
				var colarray = [];
				var jsloc1 = {};
				jsloc1["sTitle"]="ID";
				colarray.push(jsloc1);
				var jsloc2 = {};
				jsloc2["sTitle"]="Position";
				colarray.push(jsloc2);
				var jsloc3 = {};
				jsloc3["sTitle"]="Type";
				colarray.push(jsloc3);
				json["aoColumns"]=colarray;
				var datasize = 0;
				var lines = jsdata.split("\n");
				var i = 0;
				while ((boeuf = lines[i]) != undefined){
					if(data_found){
						var fields = boeuf.trim().split("|", -1);
						let pos = fields.length - 1;
						if( pos >= 3 ) {
							var type = fields[pos]; pos--;
							var dec = fields[pos]; pos--;
							var ra = fields[pos];
							/*
							 * Takes the first alias
							 */
							var id =  fields[0].split(/\s{2,}/)[0].trim();
							var darray = [];
							darray.push(id.trim());
							darray.push(ra + " " + dec);
							darray.push(type.trim());
							dataarray.push(darray);
							datasize++;
							if( datasize >= 15 ) {
								var darray = [];
								darray.push("truncated to 15");
								darray.push("");
								darray.push("");
								dataarray.push(darray);
								datasize++;									
							}
						}
					}
					else if(boeuf.startsWith("::data")){
						data_found = true;
					}
					i++;
				}
				json["aaData"] = dataarray;
				json["iTotalRecords"]= datasize;
				json["iTotalDisplayRecords"] = datasize;
				
				if( Processing.jsonError(json, "Simbad Tooltip Failure") ) {
					return;
				} else {
					var table = "";
					table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
					var id_modal = Modalinfo.nextId();
					//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
					Modalinfo.setModal(id_modal, false, "Simbad Summary for Position " 
							+ pos 
							+ "<a class=simbad target=blank href=\"http://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
							+ encodeURIComponent(pos) + "\"></a>"
							, table);
					Modalinfo.setShadow(id_modal);
					Modalinfo.whenClosed(id_modal);

					$("#"+id_modal).css("overflow","hidden");

					var options = {
							"aoColumns" : json.aoColumns,
							"aaData" : json.aaData,
							"bPaginate" : true,
							"sPaginationType": "full_numbers",
							"aaSorting" : [],
							"bSort" : false,
							"bFilter" : true,
							"bAutoWidth" : true,
							"bDestroy" : true
					};

					var img;

					/*if( json.aaData.length > 0 ) {
						img = '<img src="http://alasky.u-strasbg.fr/cgi/simbad-thumbnails/get-thumbnail.py?name=' 
							+ encodeURIComponent((json.aaData[0])[0]) + '"/>';
					} else {		var divAladin = "aladin-lite-catdiv";
					var divInfoAladin = "aladin-lite-catdiv-info";

					img = '<span class="help">No vignette available</span>';
					}*/

					var position = [
					                { "name": img,
					                	"pos": "top-left"
					                },
					                { "name": "filter",
					                	"pos": "top-right"
					                },
					                { "name": 'information',
					                	"pos" : "bottom-left"
					                },
					                { "name": "pagination",
					                	"pos" : "bottom-center"
					                },
					                { "name": " ",
					                	"pos" : "bottom-right"
					                }
					                ];

					CustomDataTable.create("simbadtable", options, position);
					$("#simbadtable_paginate").css("left","250px");
					$(".txt-left").remove();	
					// Put the filter just above the table
					$("#"+id_modal).find(".dataTables_filter").css("margin-top","34%");
					$("#"+id_modal).find(".dataTables_filter").css("position","absolute");
					$("#"+id_modal).find(".dataTables_filter").css("left","1000px");
					$("#"+id_modal).find(".dataTables_filter").css("top","-394px");
					$("#"+id_modal).find(".dataTables_filter").css("z-index","1");
					var dataFilter = $("#"+id_modal).find(".dataTables_filter");
					dataFilter.css("top","-275px");
					dataFilter.css("left","767px");
					$("#"+id_modal).dialog( "option", "position", { my: "center", at: "center", of: window } );
					//add the SourceDiv to SimbadCatalog and adjust the css
					var parent = $("#"+id_modal).parent("div");
					parent.append(content);
					parent.append(dataFilter);
					parent.css("width","950px");
					parent.css("height","400px");
					$("#"+id_modal).css("width","650px");
					$("#"+id_modal).css("left","298px");
					$("#"+id_modal).css("height","auto");
					$("#"+id_modal).css("top","15px");
					$("#"+id_modal).css("min-height","93.16px");
					var SourceDiv = $("#SimbadSourceDiv");
				    SourceDiv.css("display","block");
				    SourceDiv.css("position","absolute");
				    SourceDiv.css("top","70px");
				    SourceDiv.css("left","0px");
				    SourceDiv.css("background-color","#ffeded");
					$("#simbadtable_next").html("&nbsp;&nbsp;&nbsp;");
					$("#simbadtable_previous").html("&nbsp;&nbsp;&nbsp;");
				}
	        }
		});
	}
	
	var retour = {
		simbad : simbad
	};
	
	return retour;
}();