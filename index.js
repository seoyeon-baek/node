const http = require('http');

const app = http.createServer(function (req, res){
    res.writeHead(200);
    console.log(__dirname + req.url); //folder address
    res.end("hello world");
});

app.listen(3000); //3000 port start, port change