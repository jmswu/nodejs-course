const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/')
    {
        res.write('Hello World');
        res.end();
    }

    if (req.url == '/app/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});


server.listen(port);
console.log(`Listening on port ${port}`);