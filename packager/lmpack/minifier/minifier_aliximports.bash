#!/bin/bash
#
# Minifier alix

# Merge all required JS file in one 
# Warning: CSS is not packed here
#

script_dir=`dirname "$0"`
##########################
# Script Resources
#########################     
#alixDir="/home/xshan/gitRepository/AladinLiteX"
alixDir="${script_dir}/../../.."
outputDir="${script_dir}/../alix_packed" # directory where  packed JS are stored 
tmpDir="${script_dir}/../tmp" # tmp directory where   JS are stored 
packedJS=$outputDir/packed_aliximports.js       # name of the file containing the packed JS
packedJSmin=$outputDir/packed_aliximports_min.js       # name of the file containing the packed JS

#
# List of alix JS objects
# MVC template for names:
#    Files without a js suffix are related to the MVC pattern.
#    There are actually 3 files *_m/v/c.js 
#
js_array=(
 	     "spectrum.js"
 	     "Alix_Logger.js"
         "jquery-ui-1.12.1/jquery-ui.js"
	     "jquery-ui-1.12.1/jquery.ui.dialog.js"
	     "jqueryJSStuff/jquery.simplemodal.js"
	     "jqueryJSStuff/jquery.alerts.js"
	     "jqueryJSStuff/jquery.dataTables.js"
	     "jqueryJSStuff/FixedHeader.js"
	     "jqueryJSStuff/jquery.prints.js"
	     "jqueryJSStuff/jquery.tooltip.js"
	     "jqueryJSStuff/jquery.form.js"
	     "jqueryJSStuff/jquery-migrate-1.4.1.js"
         "excanvas.js"
	     "jquery.flot.js"
	     "jquery.flot.axislabels.js"
	     "jquery.flot.errorbars.js"
	     "jquery.flot.navigate.js"
	     "jquery.flot.symbol.js"
          )   
          
##########################
# Script Functions
#########################      
#
# Build the real list of alix JS files by applying the MVC template for names
#
js_basic_array=() 
for item in ${js_array[*]}
do
	if [[ "$item" == *.js ]]
	then
    	js_basic_array[${#js_basic_array[@]}]=$item	
	else
    	js_basic_array[${#js_basic_array[@]}]=$item'_m.js'
    	js_basic_array[${#js_basic_array[@]}]=$item'_v.js'
    	js_basic_array[${#js_basic_array[@]}]=$item'_c.js'
	fi
done

#
# function compiling a set of js files to the packed file
# The compiled files are stored in the global output dir
# USAGE: minifySet jsfiledir file1 file2 ....
# jsfiledir: dir where JS files are
#
js_array=() # list of packed js files
function minifySet(){
	inputDir=$1
	shift
	fileList=("$@")
	for item in "${fileList[@]}"
	do
		echo push $inputDir/${item} to  $packedJS
		#
		# Closure compilation is commented whole the validation phase
    	#java -jar yuicompressor-2.4.8.jar -o $tmpDir/a.js --type js $inputDir/${item}  || exit 1
    	cat $inputDir/${item} >> $packedJS || exit 1
		echo ";console.log('=============== > " $item "');" >> $packedJS

    	#cp $inputDir/${item}  $outputDir || exit 1
    	# Store an ordered list of minified files
    	js_array[${#js_array[@]}]=$item
	done
}


##########################
# Script Job
#########################      
pwd
echo "=========== Pack JS  files"
rm -f $packedJS
minifySet "${alixDir}/jsimports/"   \
    ${js_basic_array[@]} 


echo "=========== Compress JS"
#java -jar ${script_dir}/compiler.jar --js=$packedJS --js_output_file=$packedJSmin
java -jar yuicompressor-2.4.8.jar --line-break 48 -o $packedJSmin --type js $packedJS  || exit 1

echo "=========== Compress is over"


exit