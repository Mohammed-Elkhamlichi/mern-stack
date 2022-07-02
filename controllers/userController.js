const getUsers = async (req, res) => {
    const User = require("../models/User");
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            msg: "get users success",
            users,
        });
        console.log("get users success");
    } catch (error) {
        console.log({ get_users_controller_err: error });
    }
};

const createUser = async (req, res) => {
    try {
        res.status(201).json({ success: true, msg: "create user success" });
    } catch (error) {
        console.log({ create_user_error: error });
    }
};

module.exports = { getUsers, createUser };
