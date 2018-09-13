var fs = require('fs');

var express = require('express');

var session = require('express-session');

var bodyParse = require('body-parser');

var userDB = require('./use_module/userDB');

//记录session.

var sv = express();

sv.use('/public',express.static('./public/'));

sv.use('/node_modules',express.static('./node_modules/'));

sv.engine('html',require('express-art-template'));

sv.use(bodyParse.urlencoded({extended:false}));

sv.use(bodyParse.json());

sv.use(session({

    secret:'winsoft',




    }));

sv.get('/',function (req,res) {

    //读取session
    // console.log(req.url);

    // console.log(req.session.user);

    if (req.session.user)
    {
        //主页
        res.render('home.html',{

            topics:[{
                topic:'test topic',

                username:'xxj',

                time:'2018-08-24 12:23:25',

                relay:23,

                favority:100,

                lastRelayTime:'2018-08-24 12:23:25',

                lastRelayUser:'jone5',

            }],

            user:req.session.user

        });
    }else

    res.render('login.html');


})

sv.get('/register',function (req,res) {

    res.render('register.html');

})

sv.post('/register',function (req,res) {


    userDB.addOneUser(req.body,function (err) {

        res.status(200).json({

            status:0,

            message:err

        });

    },function (success) {

        req.session.user = success;

        res.status(200).json({

            status:1,

            message:'注册成功'

        });

    });

})

sv.post('/login',function (req,res) {

    // console.log(req.body);

    //chaxun
    userDB.searchOneUser(req.body,function (err) {

        console.log(err);

        res.status(200).json({
            message:err,
            status:0
        });

    },function (success) {

        req.session.user = success;

        res.status(200).json({

            status:1,

            message:'login success'

        });

    });

})

sv.listen(5000,function (err) {

    console.log('running....');

})