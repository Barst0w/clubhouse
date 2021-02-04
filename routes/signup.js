const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const { check, validationResult } = require('express-validator')
const router = express.Router()
const app = express();

exports.get_signup = router.get('/signup', (req, res) => {
    res.render('sign-up-form', {errors: undefined})
})

exports.post_signup = app.post("/signup", [
    check('email', 'Email is Invalid').exists().bail().isEmail().bail(),
    check('username', 'Username is Invalid').exists().bail(),
    check('password', `Password's don't match`).exists().bail(),
    check('confirmPassword', `Password's don't match`).custom((value, {req})=> value === req.body.password)
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) next(err)
            else {
                const user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword,
                    member: false,
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
            }
          });
    }
  });
