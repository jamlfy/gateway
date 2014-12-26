function Strategy (name, aditional, more) {
	this._name = name;
	this._aditional = aditional;
	this.more = more;
}

Strategy.prototype.data = function() {
	var data = {};
	data.name = this._name;
	data.aditional = this._aditional;
	data.more  = this._more;
	return data;
};

Strategy.prototype.add = function(name, fn) {
	this[name] = fn;
};

module.exports = Strategy;