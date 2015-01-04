var validation = require('../../lib/validation');
var validate = validation.validate;
var Validator = validation.Validator;
var FailedResult = validation.FailedResult;
var RequiredValidator = validation.RequiredValidator;

module.exports = function(obj, callback) {

	var emailRequiredValidator = new RequiredValidator('email');

	var passwordRequiredValidator = new RequiredValidator('password');

	var emailFormatValidator = new Validator(
		function validate(obj) {
			var field = obj.email;
			return !field || (field.indexOf('@') >= 0 && field.indexOf('.') >= 0 && field.lastIndexOf('@') < field.lastIndexOf('.'));
		},
		new FailedResult('email', 'ERROR', 'format'));

	var passwordLengthValidator = new Validator(
		function validate(obj) {
			return !obj.password || obj.password.length >= 6;
		},
		new FailedResult('password', 'ERROR', 'length')
	);

	var emailReservedValidator = new Validator(
		function validate(obj, callback) {
			setTimeout(
				function() {
					callback(
						false
					)
				},
				2000);
		},
		new FailedResult('email', 'ERROR', 'reserved'),
		2 // it gets level 2, it means it will be validated only if everything else is fine
	);

	validate(
		obj, [
			emailRequiredValidator,
			emailFormatValidator,
			emailReservedValidator,
			passwordRequiredValidator,
			passwordLengthValidator
		],
		callback
	);

}