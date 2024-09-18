const http = require("http");
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Receieved\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch (req.url) {
            case '/':
                res.end('Homepage');
                break;
            case '/about':
                res.end('i am ovilash')
                break;
            default:
                res.end("404 not found")
        }
    });
    console.log(req);
    // console.log('New request received');
});

myServer.listen(8000, () => console.log('server started'));
