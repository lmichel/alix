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
**/
var SwarmDynamicFilter = function(){
	var ConstraintList = [];
	var alixCat;
	var sources;
	var aladinLiteView;
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
var runConstraint = function(ALV){
	aladinLiteView = ALV;
	alixCat = LibraryCatalog.getCatalog("Swarm");
	sources = alixCat.al_refs.getSources();
	if (ConstraintList.length == 0 ){
		displayCatalogFiltered();
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
	//for constraint numeric _xs.
	if(type=="num"){
		if(comparator==">"){
			if(parseFloat(source.data[element])>parseFloat(value)){
				source.show();	
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		}else if(comparator=="="){// if = 6.2 means 6<= x <7
			if(parseFloat(source.data[element])>=parseFloat(value)&&parseFloat(source.data[element])<(parseFloat(value)+1)){
				source.show();
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		
		}else if(comparator=="<"){
			if(parseFloat(source.data[element])< parseFloat(value)){
				source.show();	
				sourcesShown.push(source);
			}else{
				source.hide();			
			}
		}
		
	}else if(type=="boolean"){
	//for constraint boolean _xs.
			if(source.data[element]==value){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
	}else if(type=="String"){
		//for constraint String _xs.	
		if(comparator=="LIKE"){
			if(source.data[element].startsWith(value)){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
		}else if(comparator=="NOT LIKE"){
			if(source.data[element].startsWith(value)){
	
					source.hide();	
				}else{
		
					source.show();	
					sourcesShown.push(source);		
				}
		}else if(comparator=="IS NULL"){
			if(source.data[element]==null){
	
				source.show();	
				sourcesShown.push(source);
				}else{
	
					source.hide();			
				}
		}else if(comparator=="IS NOT NULL"){
			if(source.data[element]==null){

				source.hide();	
			}else{
	
				source.show();	
				sourcesShown.push(source);		
			}
		}
		else if(comparator=="CONTAINS"){
			if(source.data[element].indexOf(value)!=-1){
				source.show();	
				sourcesShown.push(source);
			}
			else
				source.hide();
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