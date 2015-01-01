var validation = require('../../lib/validation');
var validate = validation.validate;
var Validator = validation.Validator;
var FailedResult = validation.FailedResult;

module.exports = function(obj, callback) {

	function RequiredValidator(field) {
		var validateFn = function validate(obj) {
			return !!obj[field];
		};
		Validator.call(this, validateFn, new FailedResult(field, 'ERROR', 'required'));
	}

	RequiredValidator.prototype = new Validator();

	var emailRequiredValidator = new RequiredValidator('email');

	var passwordRequiredValidator = new RequiredValidator('password');

	var emailFormatValidator = new Validator(function validate(obj) {
		var field = obj.email;
		return !field || (field.indexOf('@') >= 0 && field.indexOf('.') >= 0 && field.lastIndexOf('@') < field.lastIndexOf('.'));
	}, new FailedResult('email', 'ERROR', 'email'));

	validate(obj, [emailRequiredValidator, emailFormatValidator, passwordRequiredValidator], callback);

}