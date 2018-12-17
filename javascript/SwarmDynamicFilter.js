var SwarmDynamicFilter = function(){
	var ConstraintList = [];
	var alixCat;
	var sources;
// add constraint in the list and apply the constraint list _xs.
var addConstraint  = function(constraint){	
	if(!ConstraintList[constraint.element]){
		ConstraintList.length++;
	}
	ConstraintList[constraint.element]= constraint;
	runConstraint();
}
//delete constraint in the list	and apply the constraint list _xs.
var delConstraint  = function(element){
	if(ConstraintList != null&&ConstraintList[element]){
	delete ConstraintList[element];
	ConstraintList.length--;
	}
	runConstraint();
}
var runConstraint = function(){
	alixCat = LibraryCatalog.getCatalog("Swarm");
	sources = alixCat.al_refs.getSources();
	if (ConstraintList.length == 0 ){
		displayCatalogFiltered();
		console.log("@@@@@@@@No constraint for 3XMM Sources")//When there's no constraint _xs.
	}else{
	for(var element in ConstraintList){
		displayCatalogFiltered(ConstraintList[element]);//apply every constraint in the list _xs.
	}
	}
}
var displayCatalogFiltered = function(constraint){	
	if(constraint != undefined){
		var value = constraint.value;
		var element = constraint.element;
		var comparator = constraint.comparator;
		var type = constraint.type;
		var sourcesShown = [];
		ConstraintList[element]= constraint;
	}
	
	for(var i=0;i<sources.length;i++){
		source =sources[i];
		console.log(source.data[element]);
	//for constraint numeric _xs.
	if(type=="num"){
		if(comparator==">"){
			if(parseFloat(source.data[element])>value){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		}else if(comparator=="="){
			if(parseFloat(source.data[element])==value){
				console.log("show");	
				source.show();
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		
		}else if(comparator=="<"){
			if(parseFloat(source.data[element])< value){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
			}else{
				console.log("hide");
				source.hide();			
			}
		}
		
	}else if(type=="boolean"){
	//for constraint boolean _xs.
			if(source.data[element]==value){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
	}else if(type=="String"){
		//for constraint String _xs.	
		if(comparator=="LIKE"){
			if(source.data[element].startsWith(value)){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
		}else if(comparator=="NOT LIKE"){
			if(source.data[element].startsWith(value)){
					console.log("hide");
					source.hide();	
				}else{
					console.log("show");	
					source.show();	
					sourcesShown.push(source);		
				}
		}else if(comparator=="IS NULL"){
			if(source.data[element]==null){
				console.log("show");	
				source.show();	
				sourcesShown.push(source);
				}else{
					console.log("hide");
					source.hide();			
				}
		}else if(comparator=="IS NOT NULL"){
			if(source.data[element]==null){
				console.log("hide");
				source.hide();	
			}else{
				console.log("show");	
				source.show();	
				sourcesShown.push(source);		
			}
		}
	}else if(constraint == undefined){
		source.show();//show all the sources _xs.
	}
	}
	sources = sourcesShown;//Give the sources selected to the next constraint to select again _xs.
	}
	
   var retour =  {
		   runConstraint : runConstraint
		   ,addConstraint :addConstraint
		   ,delConstraint : delConstraint
		,displayCatalogFiltered : displayCatalogFiltered
   };

	return retour;
}()