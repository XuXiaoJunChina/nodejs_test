
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_user',{ useNewUrlParser: true });

var Scheme = mongoose.Schema;

var userScheme = new Scheme({

    email:String,

    password:String

});



module.exports = mongoose.model('User',userScheme);