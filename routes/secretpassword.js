const express = require('express')
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { Mongoose } = require('mongoose');
const router = express.Router()
const app = express();

exports.get_secretpassword = router.get('/secretpassword', (req, res) => {
    res.render('secretpassword')
})

exports.post_secretpassword = app.post("/secretpassword", [
    check('secretPassword', 'Wrong Password').exists().bail().equals('tacotime').bail()
], (req, res, next) => {
    const currentUser = req.user.id;
    const errors = validationResult(req);

    const updateUser = async () => {
        const doc = await User.findById(currentUser);
        doc.member = true;
        await doc.save(err => {
        if (err) { 
        return next(err);
        };
        res.redirect("/");
    });
    }

    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
        } else { updateUser() 
    } 
});
