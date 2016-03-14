'use strict';

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    req.session.destroy(function() {
        res.json('Ok');
    });
});

module.exports = router;