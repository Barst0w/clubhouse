const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const router = express.Router()
const app = express();

exports.get_signup = router.get('/signup', (req, res) => {
    res.render('sign-up-form')
})

exports.post_signup = app.post("/signup", (req, res, next) => {
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
  });
