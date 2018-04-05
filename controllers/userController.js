const express = require('express');
const router = express.Router();
const multer = require('multer');

// execute this function whenever a new file will recieved
const storage = multer.diskStorage({
    destination: function(req, fil, cb) {
        cb(null, './uploads/');     // store at specific place
    },
    filename: function(req, file, cb) {
        // store by specific name
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

// fwhich files should be uploaded and which should be skipped
const fileFilter = (req, file, cb) => {

    // accept a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } 

    // if(file.mimetype === 'image/png') {
    //     // accpet a file
    //     cb(new Error('Can upload only .png file'), true);
    // }

    else {
        // reject a file
        cb(null, false);
    }
}

// upload file upto limited size (in bytes)
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const usersModel = require('../models/userModel');
const usersServices = require('../services/userService');

let validator;

module.exports.construct = function (body_parser) {
    
    //getting validator from app.js
    validator = module.exports.validator;
    usersServices.validator = validator;

    router.post('/register', upload.single('productImage'), usersServices.regsiter());

    router.get('/getImage/:id', usersServices.getImage());
}

module.exports.router = router;