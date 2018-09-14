var fs = require('fs');

var  p1 = new  Promise(function (successCallback,failureCallBack) {

    fs.readFile('./text.html','utf8',function (err,data) {



        if (data)
        {

            successCallback(data);

        }else failureCallBack(err);


    })
})

var  p2 = new  Promise(function (successCallback, failueCallBack) {

    fs.readFile('./post.html','utf8',function (err,data) {



        if (data)
        {

            successCallback(data);

        }else failureCallBack(err);

    })
})

var  p3 = new  Promise(function (successCallback, failueCallBack) {

    fs.readFile('./index.html','utf8',function (err,data) {



        if (data)
        {

            successCallback(data);

        }else failureCallBack(err);

    })
})

p3.then(function (data) {

    console.log(3);
    return p1;

},function (err) {

})
.then(function (data) {

    console.log(1);
    return p2;

},function (err){

}).then(function (data) {

    console.log(2);

},function (err) {

})