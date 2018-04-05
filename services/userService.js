const userModel = require('../models/userModel');
var userValidator = require('../validators/userValidator');
const jwt=require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

module.exports = class userService {

    static regsiter(req, res) {
        return function (req, res) {

            //console.log(req.file);
            let check = true;

            // check firstName
            var firstname = validator.trim(req.body.firstname);
            if(!firstname) {
                res.send({ success: false, message: 'FirstName can not be empty' });
                check = false;
            }

            // check lastName
            var lastname = validator.trim(req.body.lastname);
            if(!lastname) {
                res.send({ success: false, message: 'LastName can not be empty' });
                check = false;
            }

            // check username
            var username = validator.trim(req.body.username);
            if(!username) {
                res.send({ success: false, message: 'Username can not be empty' });
                check = false;
            }

            // check email 
            var email = validator.trim(req.body.email);
            if(!email) {
                res.send({ success: false, message: 'Email can not be empty' });
                check = false;
            } else {
                if(!validator.isEmail(req.body.email)) {
                    res.send({ success: false, message: "Email \'" + email +"\' not in correct format"});
                    check = false;
                }
            }

            // check contact
            var contact = validator.trim(req.body.contact);
            if(!contact) {
                res.send({ success: false, message: 'Contact can not be empty' });
                check = false;
            } else {
                if(!validator.isLength(contact, {min: 11, max: 11}) || !validator.matches(contact, /^[0][3][0-4][0-9]+$/)) {
                    res.send({ success: false, message: "Contact \'" + contact +"\' not in correct format"});
                    check = false;
                }
            }

            // check password
            var password = validator.trim(req.body.password);
            if(!password) {
                res.send({ success: false, message: 'Password can not be empty' });
                check = false;
            } else {
                // encrypt password
                var hash = bcrypt.hashSync(password);
            }

            if(check) {
                let user = {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    contact: contact,
                    password: hash,
                    productImage: req.file.path
                };

                //res.send('All good');
                //console.log(req.body);
                //console.log(hash);
                userModel.create(user).then((result) => {
                    if(result) {
                        res.send('User registered');
                    } else {
                        res.send('User already registered');
                    }
                });
            }
        }
    }

    static getImage(req, res) {
        return function(req, res) {
            userModel.get(req.params.id).then((result) => {
                if(result) {
                    res.send(result);
                } else {
                    res.send('Error');
                }
            })
        }
    }
}


