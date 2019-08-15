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
        },
        show: async (req, res) => {
            // Console log to test route is active
            console.log(`Finding User with ID#: ${req.params.id}`);
            // Find car result using ID parameter
            const result = await User.find({_id: req.params.id});
            // Respond with ok if successful and return the result found
            res.status(200).send(result);
            },
            update: ( req, res) => {
                console.log(`Trying to Update User with ID# ${req.params.id}`)

                User.findById(req.params.id, ( err, updatedUser) => {
                    if (!req.body.password) delete req.body.password
                    Object.assign(updatedUser, req.body)
                    updatedUser.save((err, updatedUser) => {
                        if(err) res.json({message: "ERROR", payload: null, code: err.code})
                        res.json({message: "Successfully updated the user!", payload: updatedUser})
                    })
                })
                    
            },
            destroy: async (req, res) => {
                // Console log to test route connection
                console.log(`Finding user id# ${req.params.id} to delete`);
                // Find car with id and delete
                await User.findOneAndDelete({ _id: req.params.id });
                // Response with 200 if successful and send message
                res.status(200).send(`Successfully deleted user ID # ${req.params.id}`);
                },
                login: async (req,res) => {
                    console.log('Checking for Users')
                    try {
                        const user = await User.findByCredentials(req.body.input, req.body.password)
                         console.log(`userFound: ${user}`)
                        const createdToken = await user.generateAuthToken();

                        res.status(200).header('x-auth', createdToken).send(user);
                        } 
                        catch (err) {
                        res.status(401).send({errorMsg: err})
                        console.log(err)
                                    }   
                                         },
                                         auth: (req,res) => {
                                            console.log('hi')
                                         }
                                        
                                        }

    

