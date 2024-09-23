const mongoose = require("mongoose");

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

module.exports = User;