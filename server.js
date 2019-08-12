require('dotenv').config();

const   
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    PORT = process.env.PORT || 4000;

    require('./db/mongoose');

app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

// Routes
    // HOME Route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/views/index.html'));
    });

    // API Root Route
    app.get('/api', (req, res) => {
        res.json({ message: `API Root Route`})
    });

       // Listening on Ports
    app.listen(PORT, err => {
        console.log( err || `Server listening on PORT ${PORT}`)
    });




































































console.log('""-Zeeshan 2019')