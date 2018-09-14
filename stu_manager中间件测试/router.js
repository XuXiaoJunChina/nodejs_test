
// var fs = require('fs');

// var express = require('express');

var student = require('./student');

var router = express.Router();

//router 本身是个函数,get/post为函数内的回调
//路由实现
router.get('/student',function (req,res) {

    student.getStudents(function (err,data) {

        if (err) return console.log('file get error');

        res.render('students.html',{

            students:data

        })


    })


})


router.get('/student/edit',function (req,res) {

    var userID = req.query.id;

    console.log(userID);

    if (!userID) return res.status(400).send('no auth');

    student.getStudentByID(userID,function (err,student) {

        //模板赋值并直接传值
        res.render('edit.html',{

            id:student.id,

            gender:student.gender,

            name:student.name,

            age:student.age,

            hobbies:student.hobbies
        })

    })

})

router.get('/student/delete',function (req,res) {

    var  userID = req.query.id;

    if (!userID) return res.status(400).send('no auth');

    student.deleteStudentByID(userID,function (err) {

        if (err) return res.status(400).send('删除失败');

        res.redirect('/student');
    })

})

router.post('/student/edit',function (req,res) {

    var stu = req.body;

    console.log(stu);

    student.updateStudentWithStu(stu,function (err) {

        if (err) return res.status(500).send(err);

        res.redirect('/student');

    })

})



module.exports = router;
