const AlixLogger = function(){
	/*
	var logger =  Log4js.getLogger("Alix Default Logger");
	logger.addAppender(new Log4js.BrowserConsoleAppender());
	logger.setLevel(Log4js.Level.TRACE);
	
	var initLogger = function(context){
		logger =  new Log4js.getLogger(context);
	}
	*/
	var trackerHandler = null;

	var connectTracker = function(handler){
		trackerHandler = handler;
	}
	var trackAction = function(actionName){
		if (trackerHandler)
			trackerHandler(actionName);
		else 
			console.log("track " + actionName);
	}
	/**
	 * 	OFF	nothing is logged
		FATAL	fatal errors are logged
		ERROR	errors are logged
		WARN	warnings are logged
		INFO	infos are logged
		DEBUG	debug infos are logged
		TRACE	traces are logged
		ALL	everything is logged
	 *
	var setDebug = function(){
		logger.setLevel(Log4js.Level.DEBUG);
	}
	var setInfo = function(){
		logger.setLevel(Log4js.Level.INFO);
	}
	var setWarning = function(){
		logger.setLevel(Log4js.Level.WARN);
	}
	var setTrace = function(){
		logger.setLevel(Log4js.Level.TRACE);
	}
	var setError = function(){
		logger.setLevel(Log4js.Level.ERROR);
	}
	var setOff = function(){
		logger.setLevel(Log4js.Level.OFF);
	}

	var debug = function(message){
		logger.debug(message)
	}
	var info = function(message){
		logger.info(message)
	}
	var warning = function(message){
		logger.warn(message)
	}
	var error = function(message){
		logger.error(message)
	}
	var trace = function(message){
		logger.trace(message)
	}
	
	var test = function(){
		console.log("test DEBUG level")
		setDebug();
		testRound()
		console.log("test INFO level")
		setInfo();
		testRound()
		console.log("test WARNNIG level")
		setWarning();
		testRound()
		console.log("test ERROR level")
		setError();
		testRound()
		console.log("test TRACE level")
		setTrace();
		testRound()
		console.log("test OFF level")
		setOff();
		testRound()
		connectTracker(function(message){console.log("tracker " + message)})
		trackAction("track")
	}
	
	var testRound = function(level){
		debug("debug test level");
		info("info test level");
		warning("warning test level");
		error("error test level");
		trace("trace test level");
		
	}*/
	
	var retour = {
			/*
			 * 
			setDebug: setDebug,
			setInfo: setInfo,
			setTrace: setTrace,
			setError: setError,
			setOff: setOff,
			debug: debug,
			info: info,
			warning: warning,
			error: error,
			trace: trace,
			initLogger: initLogger,
			test:test
			*/
			connectTracker: connectTracker,
			trackAction: trackAction
	}

	return retour;
}();
