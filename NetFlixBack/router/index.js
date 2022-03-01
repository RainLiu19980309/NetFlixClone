const express = require('express');
const router = express.Router();

const config = require('../config.js');
const sql = require('mysql');

// create a connection to our sql database using our user credential
// that were stored in config.js
let connection = sql.createConnection({
    host : config.host,
    user : config.user,
    password: config.password,
    database : config.database,
    port: 8889 // windows/linux: 3306
})

// this route handler will match with any /users api call
router.get('/', (req, res) => {
    // connect to the database
    connection.connect();

    // run a query, get some results (or an error)
    connection.query('SELECT * FROM user', function(error, results) {
        // connection.release();

        if(error) throw error;

        console.log(results);
        res.json(results);
    })
})

module.exports = router;