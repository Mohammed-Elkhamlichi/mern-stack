const userRoutes = require("express")();
const { getUsers } = require("../controllers/userController");

userRoutes.route("/").get(getUsers);

module.exports = { userRoutes };
