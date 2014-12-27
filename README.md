# Gateway

Simple y functional, multi-payment system. Payment systems are extremely variable. Because of this I have decided to create a method that only a few functions using and making use of any payment system. According to the needs of each and every user software.


## Use

	var gateway = require('gateway');
	gateway.give(function(method, params, next){
		// Give the Id
		db.payment.find(params.id, function(err, doc){
			next(err, doc.uuid);
		});
	});

	gateway.request(function(method, payment, next){
		// The payment just made
		console.log(method, payment);
		db.payment.findAndUpdate(payment.id, payment, function(err){
			next(err);
		});
	});

	// OPTIONAL
	gateway.serialize( function(req, methods, next){
		// What are the methods of payment for the user
		next(methods);
	});

	// Methods with use
	gateway.use(PayPal({
		api : 'My API',
		secret : 'My secret',
		succes : 'http://mydomain.com/:method/:id',
		cancel : 'http://mydomain.com/pay',
		showMethod : true
	}));

	gateway.use(CoinBase({
		api : 'My API',
		secret : 'My secret',
		succes : 'http://mydomain.com/bitcoin/:id'
	}));


	app.use(gateway.methods());
	app.post('/paypal', gateway.payment('paypal'), otherFunction );
	app.get('/pay', function(req, res, next){
		gateway.create('paypal', {
			title : 'Give the donate',
			description : 'A donation',
			amount : 10,
			currency : 'USD',
			tax : 0.1,
			id : '--My Id --'
		}, function(err, obj){
			if(err) return next(err);
			res.redirect(obj.link);
		});
	});

This under construction !!