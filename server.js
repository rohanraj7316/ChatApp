/**
 * Created by ROHANRAJ on 21-01-2017.
 */
var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');

app.use('/',express.static(__dirname + '/public'));
app.use('/node_modules',express.static(__dirname + 'node_modules'));
app.use(bodyParser());
app.get('/',function (req,res) {
   res.sendFile('index.html',{root:path.join(__dirname,'./public')});//write the name of the file
});
app.post('/signIn',function (req,res) {
   var result = {
       email : req.body.emailSignIn,
       pass : req.body.passSignIn
   };
   console.log(result.email+" "+result.pass);
});
app.post('/signUp',function(req,res){
    var result = {
        fname : req.body.fnameSignUp,
        lname : req.body.lnameSignUp,
        email : req.body.emailSignUp,
        pass : req.body.passSignUp
    };
    console.log(result.fname+" "+result.lname+" "+result.email+" "+result.pass );
});
app.listen(8081,function () {
    console.log("the server is working at 8080 port");
});