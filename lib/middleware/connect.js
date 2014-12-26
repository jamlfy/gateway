
module.exports = function (gateway, name, options, callback) {
	if (_.isFunction(options)) {
		callback = options;
		options = {};
	}

	options = options || {};
	var multi = true;

	 if (!Array.isArray(name)) {
		name = [ name ];
		multi = false;
	}

	return function (req, res, next) {
		var par = _.clone(options.params);
		if( options.params ){
			for (var name in options.params) {
				if (req.params.hasOwnProperty(name)) {
					par[name] = req.params[name];
				}
			}
		}

		ascy.map( name, function (name, cb) {
			var gate = gateway._strategy(name);
			if( _.isFunction(gate.payment)){
				gate.payment(req, par, options, cb);
			} else {
				cb();
			}
		}, function (err, doc) {
			if(err) return next(err);
			gateway.request( doc.name, doc, next);
		});
	};
};

module.exports.initialize = function (gateway, options) {
	options = options || {};
	return function (req, res, next) {
		if( !_.isObject(res.locals) )
			res.locals = {};

		var list = gateway._list();

		gateway.serialize(req, list, function (err, names) {
			if(err) return next(err);
			res.locals.methods = [];

			for (var i = names.length - 1; i >= 0; i--) {
				var mid = gateway._strategy( _.isObject(names[i]) ? names[i].name  : names[i] );
				res.locals.methods.push( mid.data() );
			};

			next();
		});
	};
};