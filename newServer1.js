var express = require('express');
var app = express();
var Fitbit = require('fitbit-lib').Fitbit;
var https = require('https');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
app.use(cookieParser());
app.use(session({secret:'bigSecret'}));

app.listen(4000,function(){
    console.log('the port is working');
});

var options = {
    creds:{
        clientID:'2284BL',
        clientSecret:'14abd1c17677bc179027a507c11d793b'
    },
    uris: {
        "authorizationUri": "https://www.fitbit.com",
        "authorizationPath": "/oauth2/authorize",
        "tokenUri": "https://api.fitbit.com",
        "tokenPath": "/oauth2/token"
    },
    authorization_uri: {
        "redirect_uri": "http://localhost:4000/auth/fitbitdata",
        "response_type": "code",
        "scope": "activity",
        "state": "3(#0/!~"
    }
};

app.get('/',function(req,res){
    var client = new Fitbit(options);
    res.redirect(client.authorizeURL());
});

app.get('/auth/fitbitdata',function(req,res){
    var code = req.query.code;
    var client = new Fitbit(options);
    client.fetchToken(code,function(err,token){
        if(err){
            return res.send(err);
        }
        req.session.oauth = token;
        res.redirect('/activity/steps');
    });
});
app.get('/activity/steps',function(req,res){
    var fitbit = new Fitbit(options);
    var data = '2017-02-01';
    fitbit.setToken(req.session.oauth);
    fitbit.getDailySteps(data,function(err,result){
        if(err){
            res.status(400).send(err);
        }else{
            res.send({value:result});
        }
    });
});

app.get('/steps',function(req,res){
    var fitbit = new Fitbit(options);
    var startdate = '2017-01-26';
    var enddate = '2017-01-30';
    fitbit.setToken(req.session.oauth);
    fitbit.getTimeSeriesActivity(startdate,enddate,function(err,result){
        if(err){
            res.status(400).send(err);
        }else{
            res.send({value:result});
        }
    });
});

app.get('/activity/',function (req,res) {
    var fitbit = new Fitbit(options);
    var date = '2017-01-31';
    var fitbitUrl = "https://api.fitbit.com/1/user/" + req.session.oauth.user_id + "/activities/date/" + date + ".json";
    fitbit.setToken(req.session.oauth);
    fitbit.request({
        uri:fitbitUrl,method:'GET'
    },function(err,body,token){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(body);
        }
    });
});
// app.get('/demo',function(req,res){
//     var fitbit = new Fitbit(options);
//     request.get('http://localhost:4000/').auth(null,null.null,fitbit.setToken(req.session.oauthA));
// });

app.get('/demodata',function(req,res){
    request('http://localhost:4000/activity/steps',function(err,responce,body){
        if(err){
            throw err;
        }else{
            res.send(body);
        }
    });
});

app.get('/demo',function (req,res) {
   var fitbit = new Fitbit(options);
   fitbit.setToken(req.session.oauth);


});