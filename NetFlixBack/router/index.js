const express = require('express');
const router = express.Router();
const config = require('../config.js');
const sql = require('mysql');

// create a connection to our sql database using our user credential
// that were stored in config.js
let pool = sql.createPool({
    connectionLimit: 20,
    host : config.host,
    user : config.user,
    password: config.password,
    database : config.database,
    port: 8889 // windows/linux: 3306
})

// a router with /:text is a dynamic route
// what comes after the colon is a route parameter
// can be used like a variable in your JS code

router.get('/getone/:user', (req, res) => {
    console.log(req.params.user);

    pool.getConnection((err, connection) => {
        if (err) throw err;

        let currentUser = req.params.user;
            loginResult = {};

        let query = `SELECT first_name FROM user WHERE first_name="${currentUser}"`;

        connection.query(query, (err, user) => {
            connection.release();
            
            if (err) throw err;

            console.log(user);

            res.json(user);
        })
    })
})

// this route handler will match with any /users api call
router.get('/getall', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        // run a query, get some results (or an error)
        connection.query('SELECT * FROM user', function(error, results) {
            connection.release();

            if (error) throw error;

            results.forEach(result => {
                delete result.password;
                delete result.last_name;

                if(!result.avatar) {
                    result.avatar = "temp_avatar.jpg";
                }
            })

            console.log(results);
            res.json(results);
        })
    })
})

module.exports = router;