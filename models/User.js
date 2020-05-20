const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    provider: {
        type: String,
        default: "Email"
    },
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    },
    picture: {
        type: String
    }
});
module.exports = mongoose.model("user", UserSchema)