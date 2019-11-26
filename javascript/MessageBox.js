var MessageBox = function(){
	var alertBox = function(str){
		var alert_message = "";
		alert_message += '<div id="alert_box" style="display:block"><br>'
						+'<span class=strong style="font-size: 15px;"><center><strong>' + str + '</center></strong></span><br>'
						+'<center><input type="button" value="OK" class="aladin-btn aladin-btn-small aladin-reverseCm" onclick="MessageBox.closeAlertBox()"></center></div>'
		$("#aladin-lite-div").append(alert_message);
	}
	
	var inputBox = function(str,note){
		var input_message = "";
		input_message += '<div id="input_box" style="display:block"><br>'
			+'<span class=strong style="font-size: 15px;"><center><strong>' + str + '</center></strong></span><br>'
			+'<center><input type="text" id="target_note" onfocus="this.select()"></center><br>'
			+'<input type="button" value="Cancel" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;right:90px;font-weight:900" onclick="MessageBox.closeInputBox()">'
			+'<input type="button" value="Commit" class="aladin-btn aladin-btn-small aladin-reverseCm" style="position:absolute;font-size:12px;left:90px;font-weight:900" onclick="MessageBox.returnInputMessage()"></div>';
		
		$("#aladin-lite-div").append(input_message);
		//return $("#target_note").val();
	}
	var closeAlertBox = function(){
		if($("#alert_box").css("display")=="block")
			$("#alert_box").css("display","none");
		$("#alert_box").remove();
	}
	
	var closeInputBox = function(){
		if($("#input_box").css("display")=="block")
			$("#input_box").css("display","none");
		$("#input_box").remove();
	}
	var returnInputMessage = function(){
		if($("#input_box").css("display")=="block")
			$("#input_box").css("display","none");
		var note = $("#target_note").val();
		$("#input_box").remove();
		var targetName=$("#aladin-lite-div-select").children('option:selected').attr('id');
		if(note=="")
			$("#aladin-lite-div-select").children('option:selected').html(targetName+" ["+"null"+"] ");
		else
			$("#aladin-lite-div-select").children('option:selected').html(targetName+" ["+note+"] ");
	}
	var retour = {
		alertBox : alertBox,
		inputBox : inputBox,
		closeAlertBox : closeAlertBox,
		closeInputBox : closeInputBox,
		returnInputMessage : returnInputMessage
	};
	
	return retour;
}();