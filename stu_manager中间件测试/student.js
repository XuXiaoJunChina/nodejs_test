
var fs = require('fs');

var dbPath = './db.json';

/***
 *
 *  获取所有学生,json格式的数组对象
 *
 * **/

var getAllStudents = function(callback)
{
    fs.readFile(dbPath,'utf8',function (err, data) {

        if (err)  return callback(err);

        var jsonArrayStudents = JSON.parse(data).students;

        callback(null,jsonArrayStudents);
    })
}


/**
 * 将json格式的所有学生数组对象存入文件
 * **/


var saveAllStudents = function(stus,callback)
{
    // console.log('save' + JSON.stringify({students:stus}));

    fs.writeFile(dbPath,JSON.stringify({students:stus}),function (err) {

        if (err) return callback(err);

        callback(null);
    })
}

//获取所有
exports.getStudents = function (callback)
{
    getAllStudents(callback);
}


exports.getStudentByID = function (id,callback) {

    getAllStudents(function (err,data) {

        if (err) return callback('不存在这个用户');

        var student = data.find(function (item) {
            
            if (parseInt(item.id) === parseInt(id)) 
            {
                return item;
            }
            
        })
        
        if (student)
        {
            callback(null,student);

        }else callback('不存在这个用户');

    })


}

exports.updateStudentWithStu = function (stu,callback) {

    getAllStudents(function (err,data) {

        var targetstu = data.find(function (item) {

            if (parseInt(item.id) === parseInt(stu.id)){
                return item;
            }
        })

        for(key in targetstu)
        {
            targetstu[key] = stu[key];
        }

        saveAllStudents(data,callback);

    })

}

exports.deleteStudentByID = function (id,callback) {

    getAllStudents(function (err,data) {

        var targetstu = data.find(function (item) {

            return parseInt(item.id) === parseInt(id)
        })

        var index = data.indexOf(targetstu);

        data.splice(index,1);

        saveAllStudents(data,callback);
    })

}