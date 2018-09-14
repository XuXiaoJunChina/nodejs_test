
var express = require('express');

var bodyParser = require('body-parser');

var router = require('./router');

// var mongoose = require('mongoose');
//
// // var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');
//
// //student 为数据库文件,如果不存在则自动创建
// mongoose.connect('mongodb://127.0.0.1:27017/student',{useNewUrlParser:true},function (err) {
//
//     if (err)
//     {
//         console.log(err);
//     }
//
// });
//
// var  Schema = mongoose.Schema;
//
// var stuSchema  = new  Schema({
//
//     name:String,
//
//     gender:Number,
//
//     age :Number
// });
//
// var Stu = mongoose.model('Stu',stuSchema);
//
// Stu.findOne()
//
//
// var s1 = new  Stu({
//     name:'wqq',
//     gender:0,
//     age:25
// });
//
//
//
// s1.save(function (err,ret) {
//
//     if (err) console.log(err);
//
//     else console.log(ret);
//
// })

var sv = express();

sv.use('/node_modules/',express.static('./node_modules'));

sv.use('public',express.static('./public'));

sv.engine('html',require('express-art-template'));

//这里设置post的req的body解析, 即sv的post请求可以直接使用req.body得到json对象
//内部原理: 解析body后,原sv的req去设置一个body.
sv.use(bodyParser.urlencoded({extended:false}));

sv.use(bodyParser.json());

//sv 注册 router中间件,表示router内部函数都会去注册.
sv.use(router);

sv.listen(3000,function () {

    console.log('running...');

})



