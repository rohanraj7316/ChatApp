var mongoose =require('mongoose');

var Schema = mongoose.Schema;

var deviceCreation = new Schema({
    id : {
        type:String,
        required:[true,'id of the device required']
    },
    userId : {
        type:String,
        required:[true,'user id is required']
    },
    fVersion : {
        type:String,
        default:''
    },
    sNumber : {
        type:String,
        default:''
    },
    description : {
        type:String,
        default:''
    },
    model : {
        type:String,
        default:''
    },
    manufacturer : {
        type:String,
        default:''
    },
    type : {
        type:String,
        default:''
    },
    name : {
        type:String,
        default:''
    },
    hubName : {
        type:String,
        default:''
    },
    hubId : {
        type:String,
        default : '',
        required : [true,'id feild is required']
    },
    created : {
        type : Date,
        default : Date.now
    }
});
var devices = mongoose.model('deviceRegistration',deviceCreation);
module.exports = devices;