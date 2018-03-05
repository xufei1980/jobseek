/**
 * Created by think on 2018/2/7.
 */
const mongoose=require('mongoose');
const DB_URL='mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);
// mongoose.connection.on('connected',function () {
//     console.log('connect to Mongodb');
// })
const models={
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        //avatar
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},
        //if you r boss there another two filed
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,default:''},
        'create_time':{type:Number,default:new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports={
    getModel:function (name) {
        return mongoose.model(name)
    }
}
// const User=mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }));

// User.create({user:'bbb',age:20},function (err,doc) {
//     if(!err){
//         console.log(doc);
//     }else {
//         console.log(err);
//     }
//
// })
// User.update({'user':'apple'},{'$set':{age:24}},function (err,doc) {
//     console.log(doc);
//
// })
// User.remove({age:18},function (err,doc) {
//     console.log(doc);
// })
