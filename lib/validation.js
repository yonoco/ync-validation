;
(function(undefined) {

	function FailedResult(field, severity, type) {
		this.field = field;
		this.severity = severity;
		this.type = type;
	}


	function Validator(validFn, failedResult) {
		this.validate = validFn;
		this.failedResult = failedResult;
	}

	function validate(obj, validators, cb) {

		var result = {
			validationResults: []
		};

		if (!validators) {
			return cb(null, result);
		}

		var validator;
		var i = 0;

		var iterate = function() {
			validator = validators[i];

			function iter() {
				i++;
				if (i >= validators.length) {
					cb(null, result);
				} else {
					iterate();
				}
			}

			if (validator.validate.length === 1) {

				// sync version, takes no callback function
				if (!validator.validate(obj)) {
					result.validationResults.push(validator.failedResult);
				}
				iter();

			} else if (validator.validate.length === 2) {

				// async version, one callback function
				validator.validate(obj, function(failedResult) {
					if (failedResult) {
						result.validationResults.push(validator.failedResult);
					}
					iter();
				});

			} else {
				cb('one of the validator signature is wrong', null);
			}

		};
		iterate();

	}

	module = module || {};
	module.exports.validate = validate;
	module.exports.FailedResult = FailedResult;
	module.exports.Validator = Validator;



})();