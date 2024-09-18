const { log } = require('console');
const fs = require('fs');

// SYNC - synchronour call... Blocking Req...
fs.writeFileSync('./test.txt', 'hey there! I am Ovilash');


// ASYN - asynchronous call, comes with a callback fn
// fs.writeFile('./test.txt', 'hey there! Asyn', (err) => { });

// SYNC
// const result = fs.readFileSync('./test.txt', "utf-8");
// console.log(result);

// ASYNC... Non-Blocking
const result = fs.readFile('./test.txt', "utf-8", (err, result) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(result);
    }
});
