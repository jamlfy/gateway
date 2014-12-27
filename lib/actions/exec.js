const _ = require('underscore');
const async = require('async');

module.exports =  function (gateway, name, options, callback) {
	 if (_.isFunction( options)) {
		callback = options;
		options = {};
	}
	options = options || {};
	var multi = true;

	 if (!Array.isArray(name)) {
		name = [ name ];
		multi = false;
	}

	var run = [];

	for (var i = name.length - 1; i >= 0; i--){
		var stra = gateway._strategy( name[i] );
		if( _.isFunction(stra.exec) )
			run.push( stra );
	}

	ascyn.map( run, function (strategy, next) {
		strategy.exec( options, next );
	}, callback);
};