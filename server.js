require('dotenv').config();

const   
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    User = require('./models/userSchema'),
    UserRouter = require('./routes/UserRouter'),
    PORT = process.env.PORT || 4000;

    require('./db/mongoose');

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + '/public/views'));

// Routes
    // HOME Route
    app.get('/', (req, res) => {
        res.json({success:true})
    });

    // API Root Route
    app.get('/api', (req, res) => {
        res.json({ message: `API Root Route`})
    });

    app.use('/api/Users', UserRouter);

       // Listening on Ports
    app.listen(PORT, err => {
        console.log( err || `Server listening on PORT ${PORT}`)
    });




































































console.log(`""-Zeeshan 2019`)