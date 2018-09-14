var http = require('http')

var fs = require('fs')

var url = require('url')

var template = require('art-template')

var server = http.createServer()

var chats = [
			
		// 	{name:"john",
		// 	content:"see you torrorw",
		// 	time:"2018-02-16"
		// },
		// {name:"john1",
		// 	content:"see you torrorw",
		// 	time:"2018-02-16"
		// },
		// {name:"john2",
		// 	content:"see you torrorw",
		// 	time:"2018-02-16"
		// },
		// {name:"john3",
		// 	content:"see you torrorw",
		// 	time:"2018-02-16"
		// 	}
			
			];//name,content,time

function formatDateTime(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

var that = this;

server.on('request', function (req, res) {
	
	// var urStr = req.url;


	
	var urlparse = url.parse(req.url,true);

	var pathName = urlparse.pathname;
	
	// res.end(JSON.stringify(urlparse));
	//
	//return


	if(pathName == "/")
	{

//		//index
		fs.readFile("./view/index.html",function(err,data){
			if(err)
			{
				res.end('404 not find');
			}
			
			 var htmlStr = template.render(data.toString(),{chatList:chats});
			 
			 res.end(htmlStr);
		})
	}else if (pathName.indexOf('/public/') == 0) {

		//其他公共资源获取

		//.代表当前js的根路径
		fs.readFile("." + req.url, function(err,data){
			
			if(err) return;
			
			res.end(data);
			
		})
		
//		res.end(url);
	}else if (pathName == "/post"){

		fs.readFile('./view/post.html',function (err,data) {

			if (err) return;

			res.end(data);
        })

	}else if (pathName == '/talk_submit') {


        // var name = urlparse.query.name;
        //
        // var content = urlparse.query.content;

        var newChat = urlparse.query;

        var date = new Date();

        date = formatDateTime(date);


        newChat.time = date;

        chats.unshift(newChat);

        res.statusCode = 302;//302 临时重定向, 301 永久重定向

        res.setHeader("Location", "/");

        res.end();

    }else{

	    fs.readFile('./view/404.html',function (err,data) {

	        if (err) return;

	        res.end(data);
        })

    }
	
	
});

server.listen(3000, function () {
  console.log('running...')
});
