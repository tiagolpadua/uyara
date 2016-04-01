'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonitorSchema = new Schema({
    created: Date,
    updated: Date,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var Monitor = mongoose.model('Monitor', MonitorSchema);

module.exports = Monitor;
