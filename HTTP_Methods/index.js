const http = require("http");
const fs = require("fs");
const url = require("url");

// my server
const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico')
        return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Receieved\n`;
    const myUrl = url.parse(req.url, true);
    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                if (req.method === 'GET')
                    res.end('homepage')
                break;

            case '/about':
                res.end(`Hiii, ${username}`);
                break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;

            case '/signup':
                if (req.method === 'GET')
                    res.end('this is a signup form');
                // DB query
                else if (req.method === 'POST') {
                    res.end("Success");
                }

            default:
                res.end("404 not found")
        }
    });
    console.log('New request received');
});

myServer.listen(8000, () => console.log('server started'));
