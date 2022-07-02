const User = require("../models/User");
const user = new User

// get Users Method
const getUsers = async (req, res) => {
    try {
        // get all users
        const users = await User.find({});
        // response
        res.status(200).json({
            success: true,
            msg: "get users success",
            users,
        });
    } catch (error) {
        console.log({ get_users_controller_err: error });
    }
};


// create User Method
const register = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log({ username, password })
        if (username !== undefined && password !== undefined && username === "" && password === "") {
            // generate new salt
            const salt = await user.generateSalt()
            console.log({ salt })
            // passsword encypted
            const encryptedPassword = await user.generatePassword(password, salt)
            console.log({ encryptedPassword })
            // create new user
            const isUserExist = await User.findOne({ username })
            if (isUserExist === null) {
                // create new user
                await User.create({ username, password: encryptedPassword, salt })
                // get all users
                const users = await User.find({});
                // response
                res.status(201).json({ success: true, msg: "get users success", users });
            } else {
                res.status(400).json({ success: false, msg: 'User ALredy Exist' })
            }
        } else {
            res.status(400).json({ success: false, msg: 'Username && password not provided' })
        }
    } catch (error) {
        console.log({ create_user_error: error });
    }
};

// delete User Method

// Update User Method

module.exports = { getUsers, register };
