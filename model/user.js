/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


require('dotenv').config();
var db = require('./databaseConfig.js');
var jwt = require('jsonwebtoken');
var config = process.env.KEY;
const saltRounds = 10;
var bcrypt = require("bcrypt");

var userDB = {
    // 1) GET /users
    getUsers: function (callback) {
        var conn = db;
        console.log("Connected! Getting users...");
        var sql ="SELECT id, username, profile_pic_url, created_at FROM users;";

        conn.query(sql, function (err, result) {
            if(err) {
                return callback(err, null);
            };
            return callback(null, result.rows);
        });  
    },

    // 2) POST /users DONE
    addUser: function (username, profile_pic_url, password, callback) { // id and created_at are automatically generated
        var conn = db;
        console.log("Connected! Inserting users record.");
        var sql = 'INSERT INTO users(id, username, profile_pic_url, password) VALUES(DEFAULT, $1, $2, $3)';

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            if(err) {
                return callback(err, null);
            }
            else {
                conn.query(sql, [username, profile_pic_url, hash], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result.rowCount);
                    }
        
                });
            }
        });


    },

    // 3) GET /users/:id
    getUser: function (id, callback) {
        console.log("Connected! Getting users with id " + id + ".");
        var sql = 'SELECT id, username, profile_pic_url, created_at FROM users WHERE id = $1'; //displays users with specified id
        db.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        });
    },

    // 4) PUT /users/:id
    updateUser: function (username, profile_pic_url, id, callback) {

        var conn = db;
        console.log("Connected! Getting users with id " + id + ".");
        var sql = 'SELECT id, username, profile_pic_url, created_at FROM users WHERE id = $1';
        conn.query(sql, [id], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                if (username == undefined) username = result[0].username
                if (profile_pic_url == undefined) profile_pic_url = result[0].profile_pic_url
                // attribute remains unchanged if it is not defined

                var sql = 'UPDATE users SET username=$1, profile_pic_url=$2 WHERE id=$3';
                conn.query(sql, [username, profile_pic_url, id], function (err, result) {

                    if (err) {
                        console.log(err.errno); //return 1062 if username is not unique
                        return callback(err.errno, null);
                    }
                    else {
                        return callback(null, result.rowCount);
                    }
                })
            }
        });

    },

    // CA2 POST /login DONE
    loginUser: function (username, password, callback) {

        var conn = db;
        console.log("Logging in...");

        var sql = 'SELECT id, username, profile_pic_url, created_at, password from users WHERE username=$1';

        conn.query(sql, [username], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);

            } else {
                var token = "";
                var res = result.rows;
                const hpassword = res[0].password;

                bcrypt.compare(password, hpassword, function(err, result) {
                    if(err) {
                        return callback({"error": "Password is incorrect"});
                    }
                    else {
                        token = jwt.sign({ id: res[0].id }, // userid is unique
                            config, // "admin password"
                            { expiresIn: 900 }
                        );

                    return callback(null, token, res);

                    }
                });


            }
        });

    }
}

module.exports = userDB;