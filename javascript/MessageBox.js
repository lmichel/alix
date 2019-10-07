var MessageBox = function(){
	var alertBox = function(str){
		var alert_message = "";
		alert_message += '<div id="alert_box" style="display:block"><br>'
						+'<span class=strong style="font-size: 15px;"><center><strong>' + str + '</center></strong></span><br>'
						+'<center><input type="button" value="OK" class="aladin-btn aladin-btn-small aladin-reverseCm" onclick="MessageBox.closeAlertBox()"></center></div>'
		$("#aladin-lite-div").append(alert_message);
	}
	
	var closeAlertBox = function(){
		if($("#alert_box").css("display")=="block")
			$("#alert_box").css("display","none");
		$("#alert_box").remove();
	}
	
	var retour = {
		alertBox : alertBox,
		closeAlertBox : closeAlertBox
	};
	
	return retour;
}();