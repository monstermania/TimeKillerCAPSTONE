const 
    express = require('express'),
    UserRouter = express.Router(),
    User = require('../controllers/user');
    auth = require('../middleware/auth')

// CREATE
UserRouter.post('/create', User.create);
// READ ALL (Index)
UserRouter.get('/', User.index);
// READ ONE
UserRouter.get('/:id', User.show);
//UPDATE
UserRouter.patch('/:id', User.update);
//DELETE
UserRouter.delete('/:id', User.destroy);
//LOGIN
UserRouter.post('/login', User.login);
//AUTHENTICATE
UserRouter.get('/auth', auth, User.auth);


module.exports = UserRouter;