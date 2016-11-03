var _s = +new Date();
var express = require('express');

var app = express();

var handlebars = require('express3-handlebars').create({
	defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
	//app.get('env') !== 'production' &&
	console.log(res.locals,req.query);
	res.locals.showTests = req.query.test === '1';
	next();
});



app.get('/', function(req, res) {
	res.render('home', {
		test: ['a', 'b', 'c']
	});
});

app.get('/about', function(req, res) {
	res.render('about',{
		pageTestScript:'/qa/tests-about.js'
	});
});


app.use(express.static(__dirname + '/public'));

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function() {
	var _e = +new Date();
	console.log('=====express=======:' + app.get('port'));
	console.log('=====express=======:' + (_e - _s) + 'ms');
});

/*
	app.get('/',function(req,res){
		res.type('text/plain');
		res.sendFile(__dirname+'/index.txt');
	});

	app.get('/about',function(req,res){
		res.type('text/plain');
		res.send('about');
	});

	app.use(function(req,res){
			res.type('text/plain');
			res.status(404);
			res.send('404 - Not Found');
	});

	app.use(function(err,req,res,next){
			console.log(err);
			res.type('text/plain');
			res.status(500);
			res.send('500 - Server Error');
	});
*/