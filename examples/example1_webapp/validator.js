var validation = require('../../lib/validation');
var validate = validation.validate;
var Validator = validation.Validator;
var FailedResult = validation.FailedResult;

module.exports = function(obj, callback) {

	function RequiredValidator(field, failedResult) {
		var validateFn = function validate(obj) {
			return !!obj[field];
		};
		Validator.call(this, validateFn, failedResult);
	}

	RequiredValidator.prototype = new Validator();

	var emailRequiredValidator = new RequiredValidator(
		'email',
		new FailedResult('email', 'ERROR')
	);

	var passwordRequiredValidator = new RequiredValidator(
		'password',
		new FailedResult('password', 'ERROR')
	);

	validate(obj, [emailRequiredValidator, passwordRequiredValidator], callback);

}