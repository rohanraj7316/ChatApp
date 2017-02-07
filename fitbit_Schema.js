var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fitbit = new Schema({
	accesstoken:{
		type:String,
		default:'',
		required:[true , 'accesstoken is required feild']
	},
	expiresIn:{
		type:String,
		default:''
	},
	refreshtoken:{
		type:String,
		default:'',
		required:[true,'refreshtoken is required feild']
	},
	scope:{
		type:String,
		default:''
	},
	tokentype:{
		type:String,
		default:''
	},
	userID:{
		type:String,
		default:'',
		required:[true,'userID is a required feild']
	},
	created:{
		type:Date,
		default:Date.now
	}
});

var fitbitUserDetail = mongoose.model('fitbitUserData',fitbitUserDetail);
module.exports = fitbitUserDetail;