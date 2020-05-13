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
    date: {
        type: String,
        date: Date.now
    },
});
module.exports = mongoose.model("contact", ContactSchema)