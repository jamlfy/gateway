module.exports =  function (gateway, name, options, callback) {
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

	var run = [];

	for (var i = name.length - 1; i >= 0; i--)
		run.push( gateway._strategy( name[i] ) );

	ascyn.map( run, function (strategy, next) {
		strategy.create( options, next );
	}, callback);
};