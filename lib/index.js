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