const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
})
module.exports = mongoose.model('Auth_User', UserSchema)