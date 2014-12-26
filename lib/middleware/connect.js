
module.exports = function (gateway, name, options, callback) {
	 if (typeof options == 'function') {
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
		ascyn.map(name, function (fz, other) {
			var get = gateway._strategy( fz );
			if( typeof get.payment === 'function' )
				return get.payment( req, other );
			other();
		}, function (err) {
			next(err);
		});
	};
};

module.exports.initialize = function (gateway, options) {
	options = options || {};
	return function (req, res, next) {
		gateway.serialize(req, options, function (err, names) {
			if(err) return next(err);
			res.locals.methods = [];

			for (var i = names.length - 1; i >= 0; i--) {
				var mid = gateway._strategy( names[i]);
				if(typeof mid.create === 'function' &&  typeof mid.payment === 'function' )
					res.locals.methods.push( mid.data() );
			};

			next();
		});
	};
};