const User = require('../models/userSchema');

module.exports = {
    create: async (req, res) => {
        console.log(req.body);

        const user = new User({
            email : req.body.email,
            username : req.body.username,
            password : req.body.password 
        });

        await user.save();

        res.status(200).send(`User successfully posted ${user}`);
    },
    index: async (req, res) => {
        // Console log to test route is active
        console.log(`Finding users in database.`)
        // Create a results variable that will hold all the Users in our database
        const results = await User.find({});
        // Respond with ok and return all Users found in results
        res.status(200).send(results);
        }

}