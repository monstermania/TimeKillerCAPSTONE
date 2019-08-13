const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required: true
    },
    username:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        require:true
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;