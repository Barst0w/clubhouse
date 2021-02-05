const express = require('express')
const Message = require('../models/message');
const { check, validationResult } = require('express-validator')
const router = express.Router()
const app = express();

exports.get_createmessage = router.get('/createmessage', (req, res) => {
    res.render('createmessage')
})

exports.post_createmessage = app.post("/createmessage", [
    check('messageTitle', 'Invalid Title. Title needs to be entered and have a maximum of 50 characters.').exists().bail().isLength({max: 50}).bail(),
    check('messageText', 'Invalid Message. Message needs to be entered and have a maximum of 400 characters.').exists().bail().isLength({max: 400}).bail()
], (req, res, next) => {
    const currentUser = req.user.username;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else { const message = new Message({
        messageTitle: req.body.messageTitle,
        messageText: req.body.messageText,
        messageAuthor: currentUser,
        Date: Date(),
      }).save(err => {
        if (err) { 
          return next(err);
        };
        res.redirect("/");
      });
    }
});