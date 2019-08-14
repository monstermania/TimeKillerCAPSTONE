const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    },
    tokens:[{
        access:{
        type:String,
        required:true
        },
        token:{
        type: String,
        required:true
            }
    }]
}, {timestamps:true});

userSchema.methods.generateAuthToken = async function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    console.log(user)
    console.log(access)
    console.log(token)


    user.tokens = user.tokens.concat([{ access, token }]);

    const savedToken = await user.save();

    return token;
}

userSchema.statics.findByToken = async function(token) {
    let User = this;
    var decoded;

    try 
    { 
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`decoded successful`)
    }

    catch(err)
    {
        return Promise.reject();
        console.log(err);
    }

    try
    {
        const foundUser = await User.findOne ({
            "_id": decoded._id,
            "tokens.token": token,
            "tokens.access": "auth"
        });
        console.log(`verifytoken: ${foundUser}`)
        return foundUser;
    }
    catch(err)
    {
        return Promise.reject();
        console.log(err);
    }
}

userSchema.statics.findByCredentials = async function(email, password) {

    let User = this;

    try {
        const foundEmail = await User.findOne({email});

    if(!foundEmail)
    {
        const foundUsername = await User.findone({username});

        if(!foundUsername)
        {
        return Promise.reject();
        }

        const matchedPassword = await foundUsername.comparePassword(password);
        console.log(`matchedPassword: ${matchedPassword}`);
        console.log(`foundUsername: ${foundUsername}`);
        return Promise.resolve(foundUsername)

    }
    
    const matchedPassword = await foundEmail.comparePassword(password);
    console.log(`matchedPassword: ${matchedPassword}`);
    console.log(`foundEmail: ${foundEmail}`);
    return Promise.resolve(foundEmail) 

    }
    catch (err) {
        return Promise.reject(err);
        console.log(err)
    }
}

userSchema.methods.comparePassword = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    if(!match) 
    {
        console.log('Password is invalid')
        return Promise.reject
    } 
    console.log(`comparePassword match is: ${match}`)
    console.log('Password is a match.')
    return Promise.resolve(match);
}

userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password'))
    {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next();
            })
        });
    }
    else
    {
        next();
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;