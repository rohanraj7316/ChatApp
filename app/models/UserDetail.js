var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    name:String,
    username:{type:String,required:true,index: { unique : true }},
    password:{type:String,required:true,select:false}
});
UserSchema.pre('save',function(next){
    var user = this;
   /* var salt;
    bcrypt.genSalt(10,function(err,result){
        if(err) {
            console.log('ere in salt generation');
            next(result);
        }
        salt = result;
    });*/

    if(!user.isModified('password'))
        return next();

    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();

    });
});
     UserSchema.methods.passComparison = function(password){
        var user = this;
        //console.log('i come here');
        return bcrypt.compareSync(password,user.password);
        // console.log('i come here');
     };
    module.exports =  mongoose.model('User',UserSchema);
