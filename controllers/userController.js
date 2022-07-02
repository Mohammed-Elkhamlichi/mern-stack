const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const user = new User
        // generate new salt
        const salt = await user.generateSalt()
        console.log({ salt })
        // passsword encypted
        const password = await user.generatePassword('Mohammed', salt)
        console.log({ password })
        // create new user
        const newUser = await User.create({
            username: 'Mohammmed',
            password,
            salt
        })
        console.log({ newUser: user })

        // get all users
        const users = await User.find({});

        // response
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
