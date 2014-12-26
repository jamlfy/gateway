/**
* Module dependencies.
*/

var Gateway = require('./gateway');

/**
* Export default singleton.
*
* @api public
*/
exports = module.exports = new Gateway();

/**
* Expose constructors.
*/
exports.Gateway =
exports.payment = Gateway;
exports.Strategy = require('./Strategy');

/**
* Expose strategies.
*/
exports.strategies = {};


gateway.serialize( function (req, methods, next){
	// What are the methods of payment for the user
	next(methods);
});

getway.request(function (method, payment, next){
	// The payment just made
	console.log(method, payment);
	next();
});