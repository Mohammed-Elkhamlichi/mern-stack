const crypto = require('crypto')
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
});
UserSchema.methods.generateSalt = async () => {
    const salt = crypto.randomBytes(16).toString('hex')
    return salt
}

UserSchema.methods.generatePassword = async (password, salt) => {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 16, "sha512").toString('hex')
    return hash
}

UserSchema.methods.isValidPassword = async (userPassword, getPassword, salt) => {
    const hash = crypto.pbkdf2Sync(getPassword, salt, 10000, 16, "sha512").toString('hex')
    console.log({ this: this })
    // return this.hash === hash
}
module.exports =
    mongoose.models.UserSchema || mongoose.model("User", UserSchema);
