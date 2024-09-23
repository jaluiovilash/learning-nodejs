const express = require("express");
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleCreateUserById, handleDeleteUserById } = require("../controllers/user")

const router = express.Router();

router
    .route("/:id")
    .get(handleGetUserById)
    .post(handleCreateUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUserById);


module.exports = router;