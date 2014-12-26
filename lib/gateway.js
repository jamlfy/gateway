
function Gateway () {
	this._key = 'Gateway';
	this._strategies = {};
	this._serializers = [];
	this._deserializers = [];
	this._infoTransformers = [];
	this._framework = null;
	this._actions = null;

	this.init();
}

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

Gateway.prototype.methods = function(options) {
	return this._framework.initialize(this, options || {});
};

Gateway.prototype.unuse = function(name) {
	delete this._strategies[name];
	return this;
};

Gateway.prototype.serialize = function (fn, req, done) {
	if (typeof fn === 'function') 
		return this._serializers.push(fn);

	ascyn.map(this._serializers, function (fz, next) {
		fz(fn, req, next);
	}, done);
};

Gateway.prototype.framework = function(fw) {
	this._framework = fw;
	return this;
};

Gateway.prototype.actions = function(fw) {
	this._actions = fw;
	return this;
};

Gateway.prototype.request = function (fn, req, done) {
	if (typeof fn === 'function') 
		return this._serializers.push(fn);

	ascyn.map(this._serializers, function (fz, next) {
		fz(fn, req, next);
	}, done);
};

Gateway.prototype.create = function(strategy, options, callback) {
	return this._actions.create(this, strategy, options, callback);
};

Gateway.prototype.exec = function(strategy, options, callback) {
	return this._actions.exec(this, strategy, options, callback);
};

Gateway.prototype.payment = function(strategy, options, callback) {
	return this._framework(this, strategy, options, callback);
};

Gateway.prototype._strategy = function(name) {
	return this._strategies[name];
};

Gateway.prototype.init = function() {
	this.framework(require('./middleware/connect'));
	this.actions(require('./actions'));
};

module.exports = Gateway;