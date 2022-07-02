const userRoutes = require("express")();
const { getUsers, register } = require("../controllers/userController");

userRoutes.route("/").get(getUsers).post(register);

module.exports = { userRoutes };
