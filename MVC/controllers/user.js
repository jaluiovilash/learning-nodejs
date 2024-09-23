const User = require("../models/user")

async function handleGetAllUsers(req, res) {
    const allDBusers = await User.find({});
    return res.json(allDBusers)
}


async function handleGetUserById(req, res) {
    const userId = req.params.id;
    User.findById(userId) // Mongoose function to find user by ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(user); // Send user data if found
        })
        .catch(err => res.status(500).json({ error: "Error fetching user" }));
}


async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" }, { new: true }) // Mongoose method to update user
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ msg: "User updated", user });
        })
        .catch(err => res.status(500).json({ error: "Error updating user" }));
}


async function handleCreateUserById(req, res) {
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
}


async function handleDeleteUserById(req, res) {
    const userId = req.params.id;

    User.findByIdAndDelete(userId) // Mongoose method to delete user by ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ msg: "User deleted" });
        })
        .catch(err => res.status(500).json({ error: "Error deleting user" }));
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleCreateUserById,
    handleDeleteUserById,
}
