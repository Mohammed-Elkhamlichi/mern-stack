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

UserSchema.methods.encryptedPassword = async (passwordProvider, generateSalt) => {
    const encryptedPass = crypto.pbkdf2Sync(passwordProvider, generateSalt, 10000, 16, "sha512").toString('hex')
    return encryptedPass
}

UserSchema.methods.isValidPassword = async (passwordProvider, passwordStored, saltStored) => {
    const encryptedPass = crypto.pbkdf2Sync(passwordProvider, saltStored, 10000, 16, "sha512").toString('hex')
    return passwordStored === encryptedPass
}
module.exports =
    mongoose.models.UserSchema || mongoose.model("User", UserSchema);
