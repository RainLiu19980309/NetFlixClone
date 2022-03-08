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