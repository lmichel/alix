var SimbadCatalog = function(){
	var sources;
	var sourceType = "";
	var aladinCatalog = null;
	var filterMode= "all";
	var longname;
	var firstCall = true;

	var simbad = function (data) {
		Alix_Processing.show("Waiting on Simbad Response");
		/**
		 ** part of VizierCatalog
		 */
		var strlon = (data.ra) ? Numbers.toSexagesimal(data.ra/15, 8, false):" ";
		var strlat = (data.dec) ? "+"+Numbers.toSexagesimal(data.dec, 7, false):"";
		var pos = strlon+" " +strlat;
		var content = '<div id="SimbadSourceDiv" class="alix_source_panels"><div id="SourceDiv_Child" style="height:300px"><table id="SourceDiv_table"><thead>';
		if( data.data != undefined){
			for (var key in data.data){
				//if(key=="main_type"){
					//if(longname!=undefined&&longname!=""&&longname.indexOf("[")!=-1)
						//content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+'  '+longname+'</td></tr>';
					//else
						content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data.data[key]+'</td></tr>';
				//}
				//else if(data.data[key])
				//	content+='<tr style="background-color:#f2f2f2;"><th style="text-align:right">'+key+':'+'</th>'+'<td>'+'  '+data.data[key]+'</td></tr>';
			}
		} else{
			for (key in data){
				if(data[key])
					content+='<tr><th style="text-align:right">'+key+':&nbsp;'+'</th>'+'<td style="text-align:justify">'+data[key]+'</td></tr>';
			}
		}
		content += '</table></div></div>';
		/**
		 * Translate SimbadTooltip.java
		 */
		var url = "https://simbad.u-strasbg.fr/simbad/sim-script?submit=submit+script&script=";
		url += encodeURIComponent("format object \"%IDLIST[%-30*]|-%COO(A)|%COO(D)|%OTYPELIST(S)\"\n" + pos + " radius=1m", "ISO-8859-1");
		//Alix_Processing.show("Waiting on Simbad Response");
		/*$.ajax()...*/
		$.ajax({
			url: url,
			method: 'GET',
			async: true,
			dataType: 'text',
			success: function(jsdata){
				Alix_Processing.hide();

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
							/**if( datasize >= 15 ) {
								var darray = [];
								darray.push("truncated to 15");
								darray.push("");
								darray.push("");
								dataarray.push(darray);
								datasize++;									
							} **/
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

				if( Alix_Processing.jsonError(json, "Simbad Tooltip Failure") ) {
					return;
				} else {
					var table = "";
					table += '<table cellpadding="0" cellspacing="0" border="0"  id="simbadtable" class="display table"></table>';
					var id_modal = Alix_Modalinfo.nextId();
					//setModal(id_modal, false, getTitle("Confirmation", title), formatMessage(content));
					Alix_Modalinfo.setModal(id_modal, false, "Simbad Summary for Position " 
							+ pos 
							+ "<a class=simbad target=blank href=\"https://simbad.u-strasbg.fr/simbad/sim-coo?Radius=1&Coord=" 
							+ encodeURIComponent(pos) + "\"></a>"
							, table);
					Alix_Modalinfo.setShadow(id_modal);
					Alix_Modalinfo.whenClosed(id_modal);

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

					Alix_CustomDataTable.create("simbadtable", options, position);
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
		Alix_Processing.hide();
	}
	
	var activateControle = function() {

		if( firstCall ) {
			firstCall = false;
			var table=["(Micro)Lensing Event [Lev]",
				"Absorption Line system [ALS]",
				"Active Galaxy Nucleus [AGN]",
				"Association of Stars [As*]",
				"Asymptotic Giant Branch Star (He-burning) [AB*]",
				"Asymptotic Giant Branch Star candidate [AB?]",
				"BL Lac - type object [BLL]",
				"Be Star [Be*]",
				"Black Hole Candidate [BH?]",
				"Blazar [Bla]",
				"Blue Straggler Star [BS*]",
				"Blue compact Galaxy [bCG]",
				"Blue object [blu]",
				"Blue supergiant star [s*b]",
				"Bright Nebula [BNe]",
				"Brightest galaxy in a Cluster (BCG) [BiC]",
				"Broad Absorption Line system [BAL]",
				"Brown Dwarf (M<0.08solMass) [BD*]",
				"Brown Dwarf Candidate [BD?]",
				"Bubble [bub]",
				"CV DQ Her type (intermediate polar) [DQ*]",
				"CV of AM Her type (polar) [AM*]",
				"Candidate blue Straggler Star [BS?]",
				"Candidate objects [..?]",
				"Carbon Star [C*]",
				"Cataclysmic Binary Candidate [CV?]",
				"Cataclysmic Variable Star [CV*]",
				"Cepheid variable Star [Ce*]",
				"Classical Cepheid (delta Cep type) [cC*]",
				"Cloud [Cld]",
				"Cluster of Galaxies [ClG]",
				"Cluster of Stars [Cl*]",
				"Cometary Globule [CGb]",
				"Compact Group of Galaxies [CGG]",
				"Composite object [mul]",
				"Confirmed Neutron Star [N*]",
				"Damped Ly-alpha Absorption Line system [DLA]",
				"Dark Cloud (nebula) [DNe]",
				"Dense core [cor]",
				"Double or multiple star [**]",
				"Dwarf Nova [DN*]",
				"Eclipsing Binary Candidate [EB?]",
				"Eclipsing binary of Algol type (detached) [Al*]",
				"Eclipsing binary of W UMa type (contact binary) [WU*]",
				"Eclipsing binary of beta Lyr type (semi-detached)[bL*]",
				"Eclipsing binary [EB*]",
				"Ellipsoidal variable Star [El*]",
				"Emission Object [EmO]",
				"Emission-line Star [Em*]",
				"Emission-line galaxy [EmG]",
				"Eruptive variable Star [Er*]",
				"Evolved supergiant star [sg*]",
				"Extra-solar Confirmed Planet [Pl]",
				"Extra-solar Planet Candidate [Pl?]",
				"Extremely Red Object [ERO]",
				"Far-IR source (\lambda >= 30 {\mu}m) [FIR]",
				"Flare Star [Fl*]",
				"Galactic Nebula [GNe]",
				"Galaxy in Cluster of Galaxies [GiC]",
				"Galaxy in Group of Galaxies [GiG]",
				"Galaxy in Pair of Galaxies [GiP]",
				"Galaxy with high redshift [HzG]",
				"Galaxy [G]",
				"Globular Cluster [GlC]",
				"Globule (low-mass dark cloud) [glb]",
				"Gravitational Lens System (lens+images) [gLS]",
				"Gravitational Lens [gLe]",
				"Gravitational Source [grv]",
				"Gravitational Wave Event [GWE]",
				"Gravitationally Lensed Image of a Galaxy [LeG]",
				"Gravitationally Lensed Image of a Quasar [LeQ]",
				"Gravitationally Lensed Image [LeI]",
				"Group of Galaxies [GrG]",
				"HI (21cm) source [HI]",
				"HI shell [sh]",
				"HII (ionized) region [HII]",
				"HII Galaxy [H2G]",
				"Herbig Ae/Be star [Ae*]",
				"Herbig-Haro Object [HH]",
				"High Mass X-ray Binary [HXB]",
				"High proper-motion Star [PM*]",
				"High-Mass X-ray binary Candidate [HX?]",
				"High-velocity Cloud [HVC]",
				"High-velocity Star [HV*]",
				"Horizontal Branch Star [HB*]",
				"Hot subdwarf candidate [HS?]",
				"Hot subdwarf [HS*]",
				"Infra-Red source [IR]",
				"Interacting Galaxies [IG]",
				"Interstellar matter [ISM]",
				"LINER-type Active Galaxy Nucleus [LIN]",
				"Long Period Variable candidate [LP?]",
				"Long-period variable star [LP*]",
				"Low Mass X-ray Binary [LXB]",
				"Low Surface Brightness Galaxy [LSB]",
				"Low-Mass X-ray binary Candidate [LX?]",
				"Low-mass star (M<1solMass) [LM*]",
				"Low-mass star candidate [LM?]",
				"Ly alpha Absorption Line system [LyA]",
				"Lyman limit system [LLS]",
				"Maser [Mas]",
				"Mira candidate [Mi?]",
				"Molecular Cloud [MoC]",
				"Moving Group [MGr]",
				"Near-IR source (\lambda < 10 {\mu}m) [NIR]",
				"Neutron Star Candidate [N*?]",
				"Not an object (error, artefact, ...) [err]",
				"Nova Candidate [No?]",
				"Nova [No*]",
				"Nova-like Star [NL*]",
				"OH/IR star [OH*]",
				"Object of unknown nature [?]",
				"Open (galactic) Cluster [OpC]",
				"Optically Violently Variable object [OVV]",
				"Outflow candidate [of?]",
				"Outflow [out]",
				"Pair of Galaxies [PaG]",
				"Part of Cloud [PoC]",
				"Part of a Galaxy [PoG]",
				"Peculiar Star [Pe*]",
				"Physical Binary Candidate [**?]",
				"Planetary Nebula [PN]",
				"Possible (open) star cluster [C?*]",
				"Possible Active Galaxy Nucleus [AG?]",
				"Possible BL Lac [BL?]",
				"Possible Be Star [Be?]",
				"Possible Blazar [Bz?]",
				"Possible Blue supergiant star [s?b]",
				"Possible Carbon Star [C*?]",
				"Possible Cepheid [Ce?]",
				"Possible Cluster of Galaxies [C?G]",
				"Possible Galaxy [G?]",
				"Possible Globular Cluster [Gl?]",
				"Possible Group of Galaxies [Gr?]",
				"Possible Herbig Ae/Be Star [Ae?]",
				"Possible Horizontal Branch Star [HB?]",
				"Possible Peculiar Star [Pec?]",
				"Possible Planetary Nebula [PN?]",
				"Possible Quasar [Q?]",
				"Possible Red Giant Branch star [RB?]",
				"Possible Red supergiant star [s?r]",
				"Possible S Star [S*?]",
				"Possible Star of RR Lyr type [RR?]",
				"Possible Star with envelope of CH type [CH?]",
				"Possible Star with envelope of OH/IR type [OH?]",
				"Possible Supercluster of Galaxies [SC?]",
				"Possible Supergiant star [sg?]",
				"Possible Wolf-Rayet Star [WR?]",
				"Possible Yellow supergiant star [s?y]",
				"Possible gravitational lens System [LS?]",
				"Possible gravitational lens [Le?]",
				"Possible gravitationally lensed image [LI?]",
				"Post-AGB Star (proto-PN) [pA*]",
				"Post-AGB Star Candidate [pA?]",
				"Pre-main sequence Star Candidate [pr?]",
				"Pre-main sequence Star [pr*]",
				"Pulsar [Psr]",
				"Pulsating White Dwarf [ZZ*]",
				"Pulsating variable Star [Pu*]",
				"Quasar [QSO]",
				"Radio Galaxy [rG]",
				"Radio-source [Rad]",
				"Red Giant Branch star [RG*]",
				"Red supergiant star [s*r]",
				"Reflection Nebula [RNe]",
				"Region defined in the sky [reg]",
				"Rotationally variable Star [Ro*]",
				"S Star [S*]",
				"Semi-regular pulsating Star [sr*]",
				"Semi-regular variable candidate [sv?]",
				"Seyfert 1 Galaxy [Sy1]",
				"Seyfert 2 Galaxy [Sy2]",
				"Seyfert Galaxy [SyG]",
				"Spectroscopic binary [SB*]",
				"Star forming region [SFR]",
				"Star in Association [*iA]",
				"Star in Cluster [*iC]",
				"Star in Nebula [*iN]",
				"Star in double system [*i*]",
				"Star showing eclipses by its planet [EP*]",
				"Star suspected of Variability [V*?]",
				"Star with envelope of CH type [CH*]",
				"Star [*]",
				"Starburst Galaxy [SBG]",
				"Stellar Stream [St*]",
				"Sub-stellar object [su*]",
				"SuperNova Candidate [SN?]",
				"SuperNova Remnant Candidate [SR?]",
				"SuperNova Remnant [SNR]",
				"SuperNova [SN*]",
				"Supercluster of Galaxies [SCG]",
				"Symbiotic Star Candidate [Sy?]",
				"Symbiotic Star [Sy*]",
				"T Tau star Candidate [TT?]",
				"T Tau-type Star [TT*]",
				"UV-emission source [UV]",
				"Ultra-luminous X-ray candidate [UX?]",
				"Ultra-luminous X-ray source [ULX]",
				"Underdense region of the Universe [vid]",
				"Variable Star of FU Ori type [FU*]",
				"Variable Star of Mira Cet type [Mi*]",
				"Variable Star of Orion Type [Or*]",
				"Variable Star of R CrB type candiate [RC?]",
				"Variable Star of R CrB type [RC*]",
				"Variable Star of RR Lyr type [RR*]",
				"Variable Star of RV Tau type [RV*]",
				"Variable Star of SX Phe type (subdwarf) [SX*]",
				"Variable Star of W Vir type [WV*]",
				"Variable Star of alpha2 CVn type [a2*]",
				"Variable Star of beta Cep type [bC*]",
				"Variable Star of delta Sct type [dS*]",
				"Variable Star of gamma Dor type [gD*]",
				"Variable Star of irregular type [Ir*]",
				"Variable Star with rapid variations [RI*]",
				"Variable Star [V*]",
				"Variable of BY Dra type [BY*]",
				"Variable of RS CVn type [RS*]",
				"Very red source [red]",
				"White Dwarf Candidate [WD?]",
				"White Dwarf [WD*]",
				"Wolf-Rayet Star [WR*]",
				"X-ray Binary [XB*]",
				"X-ray binary Candidate [XB?]",
				"X-ray source [X]",
				"Yellow supergiant star [s*y]",
				"Young Stellar Object Candidate [Y*?]",
				"Young Stellar Object [Y*O]",
				"centimetric Radio-source [cm]",
				"gamma-ray Burst [gB]",
				"gamma-ray source [gam]",
				"metallic Absorption Line system [mAL]",
				"metric Radio-source [mR]",
				"millimetric Radio-source [mm]",
				"radio Burst [rB]",
				"sub-millimetric source [smm]",
				"transient event [ev]"]
			// Put the pop list in front (does not work sometime)
			$("[id^=ui-id-]").css("z-index","1000000");
			$("#SearchType").autocomplete({source:table,select:function(a, b){
				$(this).val(b.item.value);
				longname=$("#SearchType").val();
				if(table.indexOf(longname)==-1&&longname!=""){
					MessageBox.alertBox("This type doesn't exist");
					return ;
				}
				var regex = /\[(.+?)\]/g;
				var i = $("#SearchType").val().match(regex);
				if(i!=undefined){
					var j = i[0].substring(1,i[0].length - 1);
					sourceType = j;
					displayCatalogFiltered();
				} else {
					sourceType="";
					$("#SearchTypeNot").text("all");				
					filterMode = "all";
					$(this).css("display","none");
					displayCatalogFiltered();
				}
			}}).css('z-index', 10000);
			
			$("#SearchType").keyup(function(e){
				var key = e.which;
				$("[id^=ui-id-]").css("z-index","1000000");

				if(key==13){
					longname=$("#SearchType").val();
					if(table.indexOf(longname)==-1&&longname!=""){
						MessageBox.alertBox("This type doesn't exist");
						return ;
					}
					var regex = /\[(.+?)\]/g;
					var i = $("#SearchType").val().match(regex);
					if(i!=undefined){
						var j = i[0].substring(1,i[0].length - 1);
						sourceType = j;
						displayCatalogFiltered();
					} else {
						sourceType="";
						$("#SearchTypeNot").text("all");				
						filterMode = "all";
						$(this).css("display","none");
						displayCatalogFiltered();

					}
				}
			})

			$("#SearchTypeNot").click(function() {
				var text = $(this).text();
				if( text == "all" ) {
					$(this).text("only");
					$(this).attr("title", "Only display sources matching the type (click to change)");
					filterMode = "only";
					displayCatalogFiltered();
					$("#SearchType").css("display","inline");
				} else if( text == "only" ) {
					$(this).text("not");				
					$(this).attr("title", "Only display sources not matching the type (click to change)");
					filterMode = "not";
					$("#SearchType").css("display","inline");
					displayCatalogFiltered();
				} else {
					$(this).text("all");				
					$(this).attr("title", "Display all sources (click to change)");
					filterMode = "all";
					$("#SearchType").css("display","none");
					displayCatalogFiltered();
				}
			});
		}
	};

	var setCatalog = function(catalog){
		aladinCatalog = catalog
	};
	
	var sourceFilter = function(source){
		var filterCondition  = (source.data.other_types.indexOf(sourceType)!=-1 || source.data.main_type.startsWith(sourceType));
		if( filterMode == "all" ) {
			return true;
		} else if( (filterMode == "not" && !filterCondition ) || (filterMode == "only" && filterCondition) ){
				return true
		} else {
			return false;
		}

	};
	
	var displayCatalogFiltered = function(){
		sources = aladinCatalog.getSources();
		for(var i=0;i<sources.length;i++){
			let source = sources[i];
			if( sourceFilter(source) ) {
				source.show();
			} else {
				source.hide();
			}
		}
		return;
	}


	/*
	 * These 2 functions are designed to get the data from https://simbad.u-strasbg.fr/simbad/sim-tap/sync
	 */
	function Query(adql){
		//var site= "https://simbad.u-strasbg.fr/simbad/sim-tap/sync";
		var reTable;
		reTable = $.ajax({
			url: '${site}',
			type: "GET",
			data: {query: "${adql}", format: 'text', lang: 'ADQL', request :'doQuery'},
			async:false
		})
		.done(function(result){
			return result;
		});
		return reTable;
	}
	var getTable = function(){
		var adql = "SELECT  distinct \"public\".otypedef.otype_longname, \"public\".otypedef.otype_shortname FROM \"public\".otypedef order by otype_longname" ;
		var obj = Query(adql);
		var content = obj.responseText;
		var list = content.split("|");
		var result=[];
		for(let i = 2;i<list.length;i++){
			var temp = list[i].split("\n");
			for(var j=0;j<temp.length;j++){
				result.push(temp[j]);
			}
		}
		var json={};
		for(let i =0;i<result.length;i++){
			result[i]=result[i+1]
		}
		for(var h=0;h<result.length-2;h=h+2){
			json[result[h]]=result[h+1];
		}
	}
	var retour = {
			simbad : simbad,
			setCatalog : setCatalog,
			displayCatalogFiltered :displayCatalogFiltered,
			getTable : getTable,
			sourceFilter : sourceFilter,
			activateControle: activateControle
	};
	return retour;
}();