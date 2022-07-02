const userRoutes = require("express")();
const { getUsers,createUser } = require("../controllers/userController");

userRoutes.route("/").get(getUsers).post(createUser);

module.exports = { userRoutes };
