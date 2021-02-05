const express = require('express')
const mongoose = require("mongoose");
const Message = require('../models/message');
const router = express.Router()

exports.get_index = router.get('/', (req, res) => {
    Message.find({}, function(err, message) {
        res.render('index', {message})
    })
})

