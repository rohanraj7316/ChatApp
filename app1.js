var express = require('express');
var bodyParser = require('body-parser');
var morgon = require('morgan');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var request = require('request');
var port = process.env.PORT || 8080 ;
var apiRouter = express.Router();
//var deviceCreation = require(./deviceDetail);
var Devices = require('./app/models/UserDetail');
var jwt = require('jsonwebtoken');
var option = {
    'uri' : 'https://www.mywoohoo.io',
    'method' : 'GET'
};
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, \
      Authorization');
    next();
});
app.use(morgon('dev'));
app.use('/api',apiRouter);
app.get('/',function(req,res){
    request('https://www.mywoohoo.io/fitbit').pipe(fs.createWriteStream('demo.html'))

});


app.listen(port);
console.log('port is on '+port);