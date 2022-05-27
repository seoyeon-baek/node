const express = require('express');
const app = express();
const template = require('./lib/template.js');
const fs = require('fs');

app.get('/', function (req,res){
    fs.readdir("./data", function(err, filelist){
        const title = "welcome";
        const description = "Hello, Node.js"
        const list = template.List(filelist);
        const html = template.HTML(title, list, description,
           `<a href="/create">create</a>`);
        res.send(html);
    });
});

app.get('/page/:pageId', function (req,res){
    fs.readdir("/data", function(errm, filelist){
        const list = template.list(filelist);
        const id = req.params.pageId;
        fs.readFile(`./data/${id}`, 'utf8', function (err, description){
            const title = id;
            const html = template.HTML(title, list, description,
                `<a href="/create">create</a>
                        <a href="/update?id=${title}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}"/>
                            <input type="submit" value="delete"/>
                        </form>`);
                        res.send(html);
        });
    });
});

app.listen(4444);