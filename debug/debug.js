


//伪数组专用.
Array.prototype.mySlice = function () {

    // console.log(arguments);

    var start = 0;

    var end = this.length;

    if (arguments.length == 1)
    {
        start = arguments[0];

    }else if (arguments.length == 2)
    {
        start = arguments[0];
        end = arguments[1];
    }

    var temp  = [];

    for (var i = start; i < end; i ++)
    {
        temp.push(this[i]);
    }

    return temp;

}


var fk = {

    0 : 'a',

    1 : 'b',

    2 : 'c',

    length:3

}




// console.log(fk.length);

//位数组转数组,   myslice不写括号的目的:方法声明/传参,写括号:执行
// var temp =  [].mySlice.call(fk);
//
// console.log(temp);


//真数组
// var ttmp = [1,2,3,4];
//
// console.log(ttmp.mySlice());

var json = JSON.parse("{\"name\":\"dd\"}");

console.log(json);