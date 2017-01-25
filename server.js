/**
 * Created by ROHANRAJ on 21-01-2017.
 */
var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./DocumentsCreation');
var passport = require('passport');

mongoose.connect('mongodb://localhost/demo',function(err,res){
    if(err)
        console.log("error occure in conection of database "+err);
    else{
        console.log('sucessfully connected to database');

    }
});
/*
var chris = new User({
    fname: "rohan",
    lname: "raj",
    email: "raj@gmail.com",
    password: "raj@123"
});

chris.save(function(err){
    if(err)
    {
        console.log("error occur in saving the data in database");
        throw err;
    }else{
        console.log("user saved sucessfull");
    }});
*/
app.use('/',express.static(__dirname + '/public'));
app.use('/node_modules',express.static(__dirname + 'node_modules'));
app.use(bodyParser());
app.get('/',function (req,res) {
   res.sendFile('index.html',{root:path.join(__dirname,'./public')});//write the name of the file
});
/*
app.post('/signIn',function (req,res) {
   var result = {
       email : req.body.emailSignIn,
       pass : req.body.passSignIn
   };
   User.find({email: result.email},function (err,user) {
       if(err) {
           console.log("error in finding the user "+err);
            throw  err;
       }else{
               // if(user==null)
           console.log("user found sucessfull "+typeof user);
       }
   });
   console.log(result.email+" "+result.pass);

});
*/
app.post('/signUp',function(req,res){
    var result = new User({
        id:'',
        userId:'',
        fVersion:'',
        sNumber:'',
        description:'',
        model:'',
        manufacturer:'',
        type:'',
        name:'',
        hubName:'',
        hubId:''
    });
   // console.log(result.fname+" "+result.lname+" "+result.email+" "+result.pass );
    result.save(function (err) {
       if(err){
           console.log("error occured "+err);
       } else{
           console.log("user saved sucessfully");
       }
    });

});
/*app.post('/signIn', passport.authenticate('local',{successRedirect:'/new.html',
                                                        failureRedirect:'/'}));
*/
app.listen(8081,function () {
    console.log("the server is working at 8080 port");
});