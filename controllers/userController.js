const getUsers = async (req, res) => {
    const User = require("../models/User");
    try {
        const users = User.find({});
        res.status(200).json({ success: true, msg: "success get users",users });
        console.log("get users success");
    } catch (error) {
        console.log({ get_users_controller_err: error });
    }
};

module.exports = { getUsers };
