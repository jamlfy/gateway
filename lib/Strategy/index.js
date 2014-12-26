function Strategy (name, aditional, more, opts) {
	this._name = name;
	this._aditional = aditional;
	this._more = more;
	this._opts = opts;
}

Strategy.prototype.data = function() {
	var data = {};
	data.name = this._name;
	data.aditional = this._aditional;
	data.more  = this._more;
	return data;
};

Strategy.prototype.url = function(name, replace) {
	var url = this.opts[name];
	for (var i = replace.length - 1; i >= 0; i--)
		url.replace(replace[i].reg, replace[i].fors);

	return url;
};

Strategy.prototype.add = function(name, fn) {
	this[name] = fn;
};

module.exports = Strategy;