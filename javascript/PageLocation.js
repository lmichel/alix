//take out from jsStuff

Alix_PageLocation = function () {
	var that = this;
	var downloadIframe = null;
	/*
	/*
	 * Public functions
	 */
	var changeLocation = function (url, title){
		Alix_Out.info("changeLocation to " + url);
		authOK = true;
		var t = ( title )? title: '_blank';
		window.open (url, t);
	};
	var download = function (url){
		authOK = true;
		if( !url.startsWith("http")) {
			url = window.location.protocol + "//" + window.location.hostname +  (location.port?":"+location.port:"") + window.location.pathname + "/" + url; 
		}
		Alix_Out.info("Download " + url);
		if( downloadIframe == null ) {
			$(document.body).append('<iframe id="downloadIframe" src="' + url + '" style="display: hiddden;">Waitng for server response...</iframe>');
			this.downloadIframe =  $("#downloadIframe");
		} else {
			this.downloadIframe.attr("src", url);
		}
	};
	var confirmBeforeUnlaod = function() {
		Alix_Out.info("Prompt user before to leave");
		window.onbeforeunload = function() {
			if( !that.authOK) {
				if( WebSamp_mVc.fireIsConnected() ) {
					WebSamp_mVc.fireUnregister();
				}
				return  'WARNING: Reloading or leaving this page will lost the current session';
			} else {
				that.authOK = false;
			}
		};
	};
	/*
	 * exports
	 */
	var pblc = {};
	pblc.download   = download;
	pblc.changeLocation   = changeLocation;
	pblc.confirmBeforeUnlaod   = confirmBeforeUnlaod; // oupps type
	pblc.confirmBeforeUnload   = confirmBeforeUnlaod;
	return pblc;
}();