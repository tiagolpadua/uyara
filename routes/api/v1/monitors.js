'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Monitor = require('../../../models/monitor')

router.get('/', function(req, res) {
    Monitor.find({}, function(err, monitors) {
        if (err) {
            throw err;
        }
        res.json(monitors);
    });
});

router.post('/', function(req, res) {
    if (!req.body.name) {
        res.send(400, 'Empty name');
        return;
    }

    var newMonitor = new Monitor({
        name: req.body.name,
        created: new Date()
    });

    newMonitor.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Monitor created!');
            res.send(201, newMonitor);
        }
    });
});

module.exports = router;
