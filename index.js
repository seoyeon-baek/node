const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring');

function templateList(filelist){
    let list = '<ul>';
    for(let i=0; i<filelist.length; i++) {
        list += `<li> <a href="/?id=${filelist[i]}"> ${filelist[i]} </a> </li>`;
    }
    list += '</ul>';
    return list;
}
function templateHTML(title, list, body){
    return `
          <!doctype html>
          <html lang="ko">
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <a href="/create">create</a>
            <p>${body}</p>
          </body>
          </html>
          `
}

const app = http.createServer(function (request, response) {
    const _url = request.url
    const queryData = url.parse(_url, true).query
    const pathname = url.parse(_url, true).pathname
    if (pathname === '/') {
        if (queryData.id === undefined) {
            const title = 'Welcome'
            const description = 'Hello, Node.js'
            fs.readdir('data/', function (err, data) {
                const title = "Welcome";
                const list = templateList(data);
                const template = templateHTML(title, list, description);
                response.writeHead(200)
                response.end(template)
            })
        } else {
            fs.readdir('data/', function (err, data) {
                let list = '<ul>';
                for (let i = 0; i < data.length; i++) {
                    list += `<li> <a href="/?id=${data[i]}"> ${data[i]} </a> </li>`;
                }
                list += '</ul>';

                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    const title = queryData.id
                    const template = templateHTML(title, list, description);
                    response.writeHead(200)
                    response.end(template)
                })
            });
        }
    }
    else if(pathname === '/create'){
        fs.readdir('data/', function(err, data){
            const title = 'Web - create';
            const list = templateList(data);
            const template = templateHTML(title, list, `
                <form action="create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"/></p>
                    <p><textarea  name="description" placeholder="description"></textarea></p>
                    <p><input type="submit"/></p>
                </form>`)
                response.writeHead(200);
                response.end(template);
        })
    }else if (pathname === '/create_process'){
        let body = '';
        request.on('data', function(data){
            body+=body+data;
        });
        request.on('end', function(){
            const post = qs.parse(body);
            const title = post.title;
            const description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf-8', function(err){})
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
        })

    }else {
        response.writeHead(404)
        response.end('Not found')
    }
})
app.listen(3333)