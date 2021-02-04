const express = require('express')
const router = express.Router()

exports.get_index = router.get('/', (req, res) => {
    res.render('index')
})

