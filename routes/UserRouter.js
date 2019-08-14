const 
    express = require('express'),
    UserRouter = express.Router(),
    User = require('../controllers/user');
    auth = require('../middleware/auth')

// CREATE
UserRouter.post('/create', User.create);
// READ ALL (Index)
UserRouter.get('/', User.index);
//AUTHENTICATE
UserRouter.get('/auth', auth, User.auth);
//LOGIN
UserRouter.post('/login', User.login);
// READ ONE
UserRouter.get('/:id', auth, User.show);
//UPDATE
UserRouter.patch('/:id', auth, User.update);
//DELETE
UserRouter.delete('/:id', auth, User.destroy);



module.exports = UserRouter;