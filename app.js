const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db=require('./configs/db');
const validator = require('validator');
const authConfig=require('./configs/authConfig');
const morgan = require('morgan')
const jwt = require('jsonwebtoken');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Authorization, Content-Length, X-Requested-With,Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

});


app.use(morgan('dev'));
app.set('superSecret', authConfig.secret); // secret variable
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const users = require('./controllers/userController');

users.validator = validator;
users.construct(bodyParser);

app.use('/users', users.router);

//app.use('/uploads', express.static('uploads'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(4100,function () {
    console.log('Server has started, listening on port 4100');
});