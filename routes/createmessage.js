const express = require('express')
const Message = require('../models/message');
const router = express.Router()
const app = express();

exports.get_createmessage = router.get('/createmessage', (req, res) => {
    res.render('createmessage')
})

exports.post_createmessage = app.post("/createmessage", (req, res, next) => {
    const currentUser = req.user.username;

                const message = new Message({
                    messageTitle: req.body.messageTitle,
                    messageText: req.body.messageText,
                    messageAuthor: currentUser,
                    Date: Date.now,
                  }).save(err => {
                    if (err) { 
                      return next(err);
                    };
                    res.redirect("/");
                  });
            });