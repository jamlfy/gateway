function Strategy (name, aditional, more, urls, opts) {
	this._name = name;
	this._aditional = aditional;
	this._more = more;
	this._url = urls;
	this._opts = opts;
}

Strategy.prototype.data = function() {
	var data = {};
	data.name = this._name;
	data.aditional = this._aditional;
	data.more  = this._more;
	return data;
};

Strategy.prototype.url = function (name, data) {
	var url = this.url[ name ];
	if (data.id)
		url.replace( /\:id/,  data.id );
	
	if (data.method)
		url.replace( /\:method/,  this.name );
	
	return url;
};

Strategy.prototype.add = function (name, fn) {
	this[name] = fn;
};

module.exports = Strategy;