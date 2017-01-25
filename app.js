var express = require('express');
var bodyParser = require('body-parser');
var morgon = require('morgan');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080 ;
var apiRouter = express.Router();
//var deviceCreation = require(./deviceDetail);
var Devices = require('./deviceDetail');

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
mongoose.connect('mongodb://localhost/demo',function(err,res){
    if(err)
        console.log("error occure in conection of database "+err);
    else{
        console.log('sucessfully connected to database');

    }
});
app.get('/',function (req,res){
    res.send('welcome to home page');
});
apiRouter.use(function (req,res,next) {
    console.log("someone is comming on our website");
    next();
});


apiRouter.get('/',function (req,res) {
    res.json({message:'horray ! welcome'});
});

apiRouter.route('/users').post(function (req,res) {
        var device = new Devices();
        device.name = req.body.name;
        device.username = req.body.username;
        device.password = req.body.password;
        device.save(function(err){
            if(err){
                if(err.code == 11000)
                    return res.json({sucess:'duplicate data'});
                else
                    return res.send(err);
            }
            res.json({message:'new user created'});
        });
    // res.json({message:'your routing is sucessfull:'+this});
}).get(function (req,res) {
    Devices.find(function (err,users) {
       if(err) res.send(err);

       res.json(users);
    });
});
apiRouter.route('/users/:user_id').get(function (req,res) {
   Devices.findById(req.params.user_id,function (err,user) {
       if(err) return res.json('user doen\'t exits '+err);
       res.json(user);
   });
}).put(function(req,res){
    Devices.findById(req.params.user_id,function (err,user) {
       if(err) return res.json(err);
       if(req.body.name) user.name = req.body.name;
       if(req.body.username) user.username = req.body.username;
       if(req.body.password) user.password = req.body.password;
       user.save(function(err){
           if(err) return res.send(err);
           res.json({message:'user data is updated'});
       });
    });
}).delete(function(req,res){
    Devices.findByIdAndRemove(req.params.user_id,function(err){
        if(err) return res.json(err);
        res.json({message:'the user of given: '+req.params.user_id+' is deleated'});
    });
});
apiRouter.post('/auth',function(req,res){
    Devices.findOne({
        username:req.body.username
    }).select('username name password').exec(function(err,user){
        if(err) return res.json(user);
        if(!user){
            res.json({message:'authentication failed',
                        sucess: false});
        }else if(user){
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    sucess:false,
                    message:'authentication failed due to password failer'
                });
            }else{
                var token = jwt.sign({
                    name : user.name,
                    username: user.username
                },superSecret,{
                    expiresInMinutes : 1440
                });
                res.json({
                    sucess: true,
                    message:'enjoy your token',
                    token : token
                });

            }
        }
    });
});



app.listen(port);
console.log('port is on '+port);