const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// CONNECTION
mongoose.connect("mongodb://localhost:27017/my-first-db")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error", err));

// SCHEMA (A user model to represent users in the database)
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    },
},
    { timestamps: true },
);

// Creating a model from the schema
const User = mongoose.model("user", userSchema);

// Middleware to handle URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // To handle JSON data in requests

// ROUTES

// 1. Fetch all users from the database
app.get("/api/users", async (req, res) => {
    const allDBusers = await User.find({}) // Mongoose function to get all users
        .then(users => res.json(users)) // Send the users data back as JSON
        .catch(err => res.status(500).json({ error: "Error fetching users", err }));
});

// 2. Fetch a single user by ID from the database
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId) // Mongoose function to find user by ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(user); // Send user data if found
        })
        .catch(err => res.status(500).json({ error: "Error fetching user" }));
});

// 2 (ANOTHER WAY) - gives the user - names from data
app.get('/users', async (req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <ul>
        ${allDBusers
            .map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


// 3. Add a new user to the database
app.post('/api/users', (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;

    if (!first_name || !email) {
        return res.status(400).json({ msg: "First name and email are required" });
    }

    const newUser = new User({
        first_name,
        last_name,
        email,
        gender,
        job_title
    });

    newUser.save() // Save the new user to the database
        .then(user => res.status(201).json({ msg: "User created", user }))
        .catch(err => res.status(500).json({ error: "Error saving user", err }));
});


// 4. Update a user by ID (Partial update using PATCH)
app.patch('/api/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" }, { new: true }) // Mongoose method to update user
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ msg: "User updated", user });
        })
        .catch(err => res.status(500).json({ error: "Error updating user" }));
});

// 5. Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId) // Mongoose method to delete user by ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ msg: "User deleted" });
        })
        .catch(err => res.status(500).json({ error: "Error deleting user" }));
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
