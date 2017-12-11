var mongoose=require('mongoose'),bcrypt=require('bcryptjs'),AdminSchema=mongoose.Schema({adminname:{type:String,required:!0},password:{type:String,required:!0}}),Admin=module.exports=mongoose.model('Admin',AdminSchema);module.exports.getAdminById=function(a,b){Admin.findById(a,b)},module.exports.getAdminByAdminname=function(a,b){Admin.findOne({adminname:a},b)},module.exports.addAdmin=function(a,b){bcrypt.genSalt(10,function(c,d){bcrypt.hash(a.password,d,function(e,f){if(e)throw e;a.password=f,a.save(b)})})},module.exports.comparePassword=function(a,b,c){bcrypt.compare(a,b,function(d,e){if(d)throw d;c(null,e)})};