const http = require("http")
const express = require("express")
const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
    return res.send("Helo from Home page");
});

app.get("/about", (req, res) => {
    return res.send(`heloo ${req.query.myname}`);
});

app.get("/contact", (req, res) => {
    return res.send("Helo from Contact page");
});

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server Started at http://localhost:8000"))
// myServer.listen(8000, () => console.log("Server Started"))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));