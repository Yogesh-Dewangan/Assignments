const fs = require('fs');
const http = require('http');

const data = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> Hello World </h1> 
    <p> This is Yogesh Dewangan... </p>
</body>
</html>`

fs.writeFile('index.html', data, err => {
    if(err) {
        console.log(err)
    }
})
let html;

fs.readFile('index.html', (err, res) => {
    if (err) {
        throw err
    } else {
        html = res.toString();
    }

})

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(html)
    res.end();
})

server.listen(8000, () => {
    console.log('Server is running at 8000 post')
})
