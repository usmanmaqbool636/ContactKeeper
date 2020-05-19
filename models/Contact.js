const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContactSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "personal"
    },
    phone: {
        type: String,
    },
    favourite: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
}
);
module.exports = mongoose.model("contact", ContactSchema)