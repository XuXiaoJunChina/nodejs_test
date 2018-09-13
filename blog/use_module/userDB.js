var User = require('./userModel');

var CryptoJS = require("crypto-js");

var md5 = require('md5');

//一般这种都是用库的形式抛出接口来加解密的!!!
var decodeKey = '1!2@3#8*'; //秘钥必须为：8/16/32位


function psdMD5Encrypt(psd) {

    return md5(psd + decodeKey);

}

//aes加密,相同的明文 + 相同的pkey,加密结果不同
function psdAESEncrypt(psd,pKey){


    return CryptoJS.AES.encrypt(psd, pKey).toString();

    // return CryptoJS.AES.encrypt(psd, CryptoJS.enc.Utf8.parse(pKey), {
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    // });

}

//aes解密
function psdAESDecrypt(encryPsd,pKey)
{
    var bytes  = CryptoJS.AES.decrypt(encryPsd, pKey);

    return bytes.toString(CryptoJS.enc.Utf8);


    // return CryptoJS.AES.decrypt(encryPsd, CryptoJS.enc.Utf8.parse(pKey), {
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    // });
}

module.exports.addOneUser =  function (user,errCallback,succCallback) {

    console.log(user);

    // var psd = psdMD5Encrypt(user.password);

    User.findOne({

        email:user.email,

    },function (err,character) {

        if (err)  return errCallback('服务器错误');

        if (character){
            //存在,注册失败
            console.log(character);
            return errCallback('邮箱已被注册');

        }else
        {
            var usertoDB = new User({

                email:user.email,

                password: psdMD5Encrypt(user.password)
            });

            usertoDB.save(function (err,ret) {

                if (err) return errCallback(err);

                console.log(ret);

                succCallback(ret);

            })
        }


    })

}

module.exports.searchOneUser =  function (user,errCallback,succCallback) {

    // #warning 2018-09-12

    // console.log('密文:'+ typeof(JSON.stringify(SHA256(user.password))));

    User.findOne({

        email:user.email,

        //密文加密后查询
        password:psdMD5Encrypt(user.password)

    },function (err,character) {


        console.log(character);

        if (err)  return errCallback(err);

        if (character){
            //存在,登录成功
            // console.log(character);
            succCallback(character);

        }else errCallback('帐号或密码错误');


    })

}