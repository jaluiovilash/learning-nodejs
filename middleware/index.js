const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 8000;

const users = require('./MOCK_DATA.json');

// Middleware - it is like a plugin
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log("Hello i am m1");
//     // return res.json({ msg: 'Hello i am m1' });
//     fs.appendFile('log.txt', `\n${Date.now()}:${req.method}: ${req.ip}: ${req.path}`, (err, data) => {
//         next();
//     })
//     // req.myUserName = "Ovilash";
// });

// app.use((req, res, next) => {
//     console.log("Hello i am m2", req.myUserName);
//     return res.json({ msg: 'Hello i am m2' });
//     // next();
// });


// ROUTES
//REST API POINT
// 1 - gives the list of the data
app.get("/api/users", (req, res) => {
    console.log(req.headers);
    res.setHeader("X-MyName", "Ovilash"); //Custome headers
    // Always add X to custom headers
    return res.json(users);
});

// 2 - gives the user - names from data
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(users => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// DYNAMIC PATH PARAMETERS
// 3 - gives the user details by giving the id.
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// 4 - adding extra user
app.route('/api/user/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    // Edit the user with id
    return res.json({ status: "success" });
}).delete((req, res) => {
    // delete the user with the id
    return res.json({ status: "success" });
});

// 5 - Create new users
app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log(body);

    users.push({ ...body, id: users.length + 1 }); //data pushed
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
