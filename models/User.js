const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
});

module.exports =
    mongoose.models.UserSchema || mongoose.model("User", UserSchema);
