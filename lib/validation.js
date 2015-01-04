;
(function(undefined) {

	function FailedResult(field, severity, type) {
		this.field = field;
		this.severity = severity;
		this.type = type;
	}


	function Validator(validFn, failedResult, level) {
		this.validate = validFn;
		this.failedResult = failedResult;
		this.level = level || 1;
	}

	// requiredValidator gets level 1 implicitly because it used to be validated in the first round
	function RequiredValidator(field) {
		var validateFn = function validate(obj) {
			return !!obj[field];
		};
		Validator.call(this, validateFn, new FailedResult(field, 'ERROR', 'required'));
	}

	RequiredValidator.prototype = new Validator();

	function validate(obj, validators, cb) {

		var result = {
			validationResults: []
		};

		if (!validators) {
			return cb(null, result);
		}

		var validator;
		var i = 0;
		var level = 1;
		var processed = 0;

		var iterate = function() {
			validator = validators[i];

			function iter() {
				i++;
				if (processed >= validators.length) {
					// everything is processed, we can quit
					cb(null, result);
				} else if (i >= validators.length) {
					// every validators processed on one level
					if (result.validationResults.length > 0) {
						// this level contained error, therefore we quit
						cb(null, result);
					} else {
						// this level did not contain error, we go to the next level
						i = 0;
						level++;
						iterate();
					}
				} else {
					// inside of one loop; next validator must be checked
					iterate();
				}
			}

			if (validator.validate.length === 1) {
				// sync version, takes no callback function

				if (validator.level === level) {

					if (!validator.validate(obj)) {
						result.validationResults.push(validator.failedResult);
					}
					processed++;
				}
				iter();

			} else if (validator.validate.length === 2) {
				// async version, one callback function

				if (validator.level === level) {
					validator.validate(obj, function(valid) {
						processed++;
						if (!valid) {
							result.validationResults.push(validator.failedResult);
						}
						iter();
					});
				} else {
					iter();
				}

			} else {
				cb('one of the validator signature is wrong', null);
			}

		};
		iterate();

	}
	var ync = {
		validate: validate,
		FailedResult: FailedResult,
		Validator: Validator,
		RequiredValidator: RequiredValidator
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = ync;
	} else {
		window.ync = ync;
	}



})();