const express = require('express');
const router = express.Router();
const config = require('../config.js');
const sql = require('mysql');
const { password } = require('../config.js');

// add some middleware to prepare out our post request data
router.use(express.json());
router.use(express.urlencoded({ 'extended' : false }));

// /users/getone?username="rain"&&password="password"

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
// can be used like a variable in your JS code function(arg) {}

router.post('/getone', (req, res) => {
    // console.log(`hit the user route: the user is ${req.params.user}`);
    // res.end('done');

    // console.log(req.params.user);
    pool.getConnection((err, connection) => {
        if (err) throw err;

        let currentUser = req.body;
            loginResult = {};

        let query = `SELECT first_name, password FROM user WHERE first_name="${currentUser.username}"`;

        connection.query(query, (err, user) => {
            connection.release();
            if (err) throw err;

            // check if the user exists
            if(!user[0]) {
                loginResult.action = 'add';
                // if it does, check the password
            } else if (user[0].password !== currentUser.password) {
                loginResult.field = 'password';
                loginResult.action = 'retry'
            } else {
                loginResult.message = 'authenticated';
            }
            // send back the login result - pass or fail
            res.json(loginResult);
        })
    })
})

router.post('/signup', (req, res) => {
    console.log('hit add user route');

    let user = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        let query = `INSERT INTO user(first_name, last_name, password, role, permissions, avatar) VALUES('${user.username}', 'test', '${user.password}', 0, 3, '')`;

        connection.query(query, (err, result) => {
            connection.release();

            if (err) throw err;

            console.log(result);

            res.json({action: 'added'});
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