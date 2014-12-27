
const _ = require('underscore');
const async = require('async');

function Gateway () {
	this._key = 'Gateway';
	this._strategies = {};
	this._serializers = [];
	this._request = [];
	this._give = [];
	this._framework = null;
	this._actions = null;

	this.init();
}

/**
* Examples:
*
* gatewaye.use(new Paypal(...));
*
* gatewaye.use('api', BasicStrategy(...));
*
* @param {String|Strategy} name
* @param {Strategy} strategy
* @return {Authenticator} for chaining
* @api public
*/

Gateway.prototype.use = function(name, strategy) {
	if (!strategy) {
		strategy = name;
		name = strategy.name;
	}

	if (!name)
		throw new Error('The system payment is not exist');

	this._strategies[name] = strategy;
	
	return this;
};

/**
* Examples:
*
* gateway.unuse('paypal');
*
* @param {String} name
* @return {Authenticator} for chaining
* @api public
*/

Gateway.prototype.unuse = function(name) {
	delete this._strategies[name];
	return this;
};


/**
* Examples:
*
* app.use(gateway.methods());
*
* app.use(gateway.initialize({}));
*
* @param {Object} options
* @return {Function} middleware
* @api public
*/

Gateway.prototype.methods = function(options) {
	return this._framework.initialize(this, options || {});
};
	
/**
* Examples:
*
* gateway.serialize(function(user, done) {
* 	done(null, user.id);
* });
*
* @api public
*/
Gateway.prototype.serialize = function (fn, req, done) {
	if (_.isFunction(fn) ) 
		return this._serializers.push(fn);

	if( this._serializers.length === 0 ){
		done( null, req);
	} else {
		ascyn.map(this._serializers, function (fz, next) {
			fz(fn, req, next);
		}, done);	
	}
};
/**
* Examples:
*	gateway.request(function(method, payment, next){
*		// The payment just made
*		console.log(method, payment);
*		db.payment.findAndUpdate(payment.id, payment, function(err){
*			next(err);
*		});
*	});
* @api public
*/
Gateway.prototype.request = function (fn, req, done) {
	if (_.isFunction(fn) ) 
		return this._request.push(fn);

	async.map(this._request, function (fz, next) {
		fz(fn, req, next);
	}, done);
};

/**
* Examples:
*	gateway.give(function(method, params, next){
*		// Give the Id
*		db.payment.find(params.id, function(err, doc){
*			next(err, doc.uuid);
*		});
*	});
* @api public
*/
Gateway.prototype.give = function (fn, req, done) {
	if (_.isFunction(fn) ) 
		return this._give.push(fn);

	if( this._give.length === 0 )
		throw new Error('No exist the function to give the id');

	async.map(this._give, function (fz, next) {
		fz(fn, req, next);
	}, done);
};

/**
* Examples:
*	gateway.create('paypal', {
*			title : 'Give the donate',
*			description : 'A donation',
*			amount : 10,
*			currency : 'USD',
*			tax : 0.1,
*			id : '--My Id --'
*		}, function(err, obj){
*			if(err) return next(err);
*			res.redirect(obj.link);
*		});
* @param {String} name
* @param {Object} Params
* @param {Function} Callback
* @return {Strategy}
* @api public
*/
Gateway.prototype.create = function(strategy, options, callback) {
	return this._actions( 'create', this, strategy, options, callback);
};
/**
* Examples:
*
* gateway.payment('paypal', {})(req, res);
*
* gateway.payment('paypal', function(err, payment) {
* 	if (!payment) { return res.redirect('/pay'); }
* 	res.end('Is pay!!');
* })(req, res);
*
* gateway.payment('basic', { session: false })(req, res);
*
* app.get('/payment/paypal', gateway.payment('paypal'), function(req, res) {
* // request will be redirected to Twitter
* });
*
* @param {String} strategy
* @param {Object} options
* @param {Function} callback
* @return {Function} middleware
* @api public
*/
Gateway.prototype.payment = function (strategy, options, callback) {
	return this._framework(this, strategy, options, callback);
};

Gateway.prototype.adds = function(name, fw) {
	this[ '_' + name ] = fw;
	return this[ '_' + name ];
};


/**
* Return strategy with given `name`.
*
* @param {String} name
* @return {Strategy}
* @api private
*/
Gateway.prototype._strategy = function(name) {
	return this._strategies[name];
};

/**
* Return list strategy
*
* @param {String} name
* @return {Strategy}
* @api private
*/
Gateway.prototype._list = function () {
	var list = [];
	for (var name in this._strategies) {
		if (this._strategies.hasOwnProperty(name) && _.isFunction(this._strategies[name].create) && _.isFunction(this._strategies[name].payment)) {
			list.push( this._strategies[name].data() );
		}
	}
	return list;
};

Gateway.prototype.init = function() {
	this.adds('framework', require('./middleware/connect'));
	this.adds('actions', require('./actions'));
};

module.exports = Gateway;
