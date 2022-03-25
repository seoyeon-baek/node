const http = require('http');
const fs = require("fs");

const app = http.createServer(function (req, res){
    let url = req.url;

    if(url === '/')
        url = '/index.html';
    if(url === '/favicon.ico')
        return res.writeHead(404);

    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

app.listen(3333); //3000 port start, port change