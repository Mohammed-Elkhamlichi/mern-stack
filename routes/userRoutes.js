const userRoutes = require("express")();
const { getUsers, register, login } = require("../controllers/userController");

userRoutes.route("/").get(getUsers).post(register)
userRoutes.route('/login').post(login)
module.exports = { userRoutes };
