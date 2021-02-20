
const { time } = require('console');
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser'); 

// app.use(bodyParser.urlencoded({extended:true})); 
// app.use(bodyParser.json());


app.get('/:link', function(req, res){
    console.log(req.params.link);
    try{
        res.writeHead(200,{"Content-Type":"text/html"}); 
        fs.createReadStream("./url/"+req.params.link+".html").pipe(res); 
    } catch(err){
        res.send(err);
    }
});

app.get('/url/shorten', function(req, res){

    fs.readdir('./url', (err, file_list) => { 
        console.log(file_list)
        var link_short = req.query.link;
        console.log("get : " + link_short);
        try{
            var flag = true;
            while(flag){
                flag = true;
                var result = Math.random().toString(36).substr(2,11);

                for(var i=0; i<file_list.length; i++){
                    if(result === file_list[i].split('.')[0]){
                        console.log();
                        flag = false;
                    }
                }
                if(flag){
                    // 랜덤문자열.html 생성
                    var html_name = result+".html";
                    var html_content = '<!DOCTYPE html><html><head><meta charset="utf-8"> <title>혜자스토어 바로가기</title></head><body><script>function Redirect(){window.location="'+link_short+'";}setTimeout("Redirect()", 1);</script></body></html>';
                    fs.writeFileSync("./url/"+html_name, html_content);
                    break;
                }
            }
            res.send(result);
        } catch(err){
            res.send(err);
        }
    });
});


var port = 3000;
app.listen(port, function(){
    console.log('server on! https://22h.link:'+port);
})