const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    phoneNum: {
        type: String,
        required: true
    },
    
    citizenshipNum: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel