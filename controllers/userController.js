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
        let { username, password } = req.body
        // remove spaces from the user credentials
        username = username.trim()
        password = password.trim()
        console.log({ username, password })
        // check if the credentials not empty
        if (username !== undefined && password !== undefined && username !== "" && password !== "") {
            // check if the user exist
            const isUserExist = await User.findOne({ username })
            if (isUserExist === null) {
                // generate new salt
                const salt = await user.generateSalt()
                // passsword encypted
                const encryptedPassword = await user.encryptedPassword(password, salt)
                // create new user
                await User.create({ username, password: encryptedPassword, salt })
                // get all users
                const users = await User.find({});
                res.status(201).json({ success: true, msg: "user created successfully", users });
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
// login user method
const login = async (req, res) => {
    try {
        let { username, password } = req.body
        // remove spaces from the user credentials
        username = username.trim()
        password = password.trim()
        console.log({ username, password })
        // check if the credentials not empty
        if (username !== undefined && password !== undefined && username !== "" && password !== "") {
            // check if the user exist
            const isUserExist = await User.findOne({ username })
            if (isUserExist !== null) {
                // check if the password provided match the user password stored in DB
                const isValidPassword = await user.isValidPassword(
                    password,
                    isUserExist.password,
                    isUserExist.salt
                )
            if(isValidPassword){
                console.log({ isValidPassword })
                // get all users
                const users = await User.find({});
                res.status(201).json({ success: true, msg: "login success", users });
            }else{
                res.status(201).json({ success: false, msg: "username or password incorrects" });

            }
            } else {
                res.status(400).json({ success: false, msg: 'account with this username not exist' })
            }
        } else {
            res.status(400).json({ success: false, msg: 'Username && password not provided' })
        }
    } catch (error) {
        console.log({ login_user_error: error })
    }
}

// delete User Method
const deleteUser = async (req, res) => {
    try {
        res.status(200).json({ success: true, msg: 'delete user seccuss' })
    } catch (error) {
        console.log({ delete_user_error: error })
    }
}

// Update User Method
const updateUser = async (req, res) => {
     try {
        res.status(200).json({ success: true, msg: 'delete user seccuss' })
    } catch (error) {
        console.log({ delete_user_error: error })
    }}

module.exports = { getUsers, register, login };
