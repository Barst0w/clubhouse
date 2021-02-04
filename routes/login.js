const express = require('express')
const passport = require("passport")
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router()
const app = express();

exports.get_login = router.get('/login', (req, res) => {
    res.render('login')
})

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, {msg: "Incorrect password"})
            }
          })
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  exports.set_currentUser = app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

  exports.post_login = app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/Login"
    })
  );

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
