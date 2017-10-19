var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5000,
    max: 10,
    idleTimeoutMillis: 30000
};


module.exports = router;