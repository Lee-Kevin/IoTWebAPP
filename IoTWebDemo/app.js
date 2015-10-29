var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var request = require('request');
/* url  */
var humidity_url = "https://120.25.216.117/v1/node/GroveTempHum/humidity?access_token=6b53bce4b8c63c886f4449efa782e232";

var temperature_url = "https://120.25.216.117/v1/node/GroveTempHum/temperature?access_token=6b53bce4b8c63c886f4449efa782e232";

var light_url = "https://120.25.216.117/v1/node/GroveDigitalLight/lux?access_token=6b53bce4b8c63c886f4449efa782e232";

var moisture_url = "https://120.25.216.117/v1/node/GroveMoisture/moisture?access_token=5bb1818d2be56b25fa9b856de74297b1";

var quality_url = "https://120.25.216.117/v1/node/GroveAirquality/quality?access_token=6b53bce4b8c63c886f4449efa782e232";

app.io = require('socket.io')();

app.io.on('connection', function(socket){
    console.log('a user connected');
	var humidity_data ;
	update_humidity_data = function(){
		request({method: 'GET',
				url:humidity_url,
				json: true,
				strictSSL: false, 
				rejectUnhauthorized : false 
				}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 //var info = JSON.parse(body)
			humidity_data = body.msg.humidity
		 console.log(body.msg.humidity)
		 socket.emit('humidity_data',humidity_data);
		 //console.log(info)
	  }else
		  console.log(error)
	 })
	}
	update_temperature_data = function(){
		request({method: 'GET',
				url:temperature_url,
				json: true,
				strictSSL: false, 
				rejectUnhauthorized : false 
				}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 //var info = JSON.parse(body)
			temperature_data = body.msg.temperature
		 console.log(body.msg.temperature)
		 socket.emit('temperature_data',temperature_data);
		 //console.log(info)
	  }else
		  console.log(error)
	 })
	}
	update_moisture_data = function(){
		request({method: 'GET',
				url:moisture_url,
				json: true,
				strictSSL: false, 
				rejectUnhauthorized : false 
				}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 //var info = JSON.parse(body)
			moisture_data = body.msg.moisture;
		 console.log(body.msg.moisture);
		 socket.emit('moisture_data',moisture_data);
		 //console.log(info)
	  }else
		  console.log(error)
	 })
	}
	update_light_data = function(){
		request({method: 'GET',
				url:light_url,
				json: true,
				strictSSL: false, 
				rejectUnhauthorized : false 
				}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 //var info = JSON.parse(body)
			light_data = body.msg.lux;
		 console.log(body.msg.lux)
		 socket.emit('light_data',light_data);
		 //console.log(info)
	  }else
		  console.log(error)
	 })
	}
	update_quality_data = function(){
		request({method: 'GET',
				url:quality_url,
				json: true,
				strictSSL: false, 
				rejectUnhauthorized : false 
				}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 //var info = JSON.parse(body)
			quality_data = body.msg.quality;
		 console.log(body.msg.temperature);
		 socket.emit('quality_data',quality_data);
		 //console.log(info)
	  }else
		  console.log(error)
	 })
	}
	update_date =function(){
		update_humidity_data();
		update_temperature_data();
        update_light_data();
        update_moisture_data();
        update_quality_data();
	}
	setInterval(update_date,1000);
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  }); 
});

var ejs=require('ejs');//新增  
//添加以下  
app.engine('.html',ejs.__express);  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');  




// view engine setup

//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
