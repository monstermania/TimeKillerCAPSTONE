const 
    express = require('express'),
    UserRouter = express.Router(),
    User = require('../controllers/user');

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



module.exports = UserRouter;