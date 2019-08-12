const 
    express = require('express'),
    UserRouter = express.Router(),
    User = require('../controllers/user');

UserRouter.post('/create', User.create);
// READ ALL (Index)
UserRouter.get('/', User.index);

module.exports = UserRouter;