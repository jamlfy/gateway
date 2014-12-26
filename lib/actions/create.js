module.exports =  function (gateway, name, options, callback) {
	 if (_.isFunction(options) )
	 	return callback( new Error('No options to create a payment'));
	var get = gateway._strategy(name);
	 if ( !get || !_.isFunction(get.create) )
	 	return callback( new Error('The payment dont reguister'));

	 get.create(options, callback);
};