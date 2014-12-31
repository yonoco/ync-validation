(function(undefined) {

	function FailedResult(field, severity, type) {
		this.field = field;
		this.severity = severity;
		this.type = type;
	}


	function Validator(validFn, failedResult) {
		this.valid = validFn;
		this.failedResult = failedResult;
	}



})();