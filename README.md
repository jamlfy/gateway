# Gateway

Simple y functional, multi-payment system. Payment systems are extremely variable. Because of this I have decided to create a method that only a few functions using and making use of any payment system. According to the needs of each and every user software.


## Use

	var gateway = require('gateway');
	gateway.serialize( function(req, methods, next){
		// What are the methods of payment for the user
		next(methods);
	});

	getway.request(function(method, payment, next){
		// The payment just made
		console.log(method, payment);
		next();
	});

	// Methods with use
	getway.use( new PayPal({
		api : 'My API',
		secret : 'My secret',
		succes : 'http://mydomain.com/coinbase/',
		cancel : 'http://mydomain.com/pay'
	}));

	getway.use( new CoinBase({
		api : 'My API',
		secret : 'My secret',
		succes : 'http://mydomain.com/coinbase/'
	}));


	app.use(getway.methods());
	app.post('/paypal', getway.payment('paypal'), otherFunction );
	app.get('/pay', function(req, res, next){
		getway.create('paypal', {
			title : 'Give the donate',
			description : 'A donation',
			amount : 10,
			currency : 'USD',
			tax : 0.1
		}, function(err, obj){
			if(err) return next(err);
			res.redirect(obj.link);
		});
	});

This under construction !!