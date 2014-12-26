var act = {
	create : require('./create.js'),
	exec : require('./exec.js');
};

module.exports =  function (action, this, strategy, options, callback) {
	act[ action ]( this, strategy, options, callback );
};