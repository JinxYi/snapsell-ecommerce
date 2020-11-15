/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/



var db = require('./databaseConfig.js');
var jwt = require('jsonwebtoken');
var config = require('../config');

var userDB = {
    // 1) GET /users
    getUsers: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting users...");
                var sql = 'SELECT * FROM user'; // returns all users
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // 2) POST /users
    addUser: function (username, profile_pic_url, password, callback) { // id and created_at are automatically generated
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Inserting user record.");
                var sql = 'INSERT INTO user(username, profile_pic_url, password) VALUES(?, ?, ?)';

                conn.query(sql, [username, profile_pic_url, password], function (err, result) {
                   conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        console.log("Row inserted! New user id is " + result.insertId + ".")
                        return callback(null, result.insertId); // insertId = new user id
                    }
                                                
                });

            }
        });
    },

    // 3) GET /users/:id
    getUser: function (id, callback) {  
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected! Getting user with id " + id + ".");
                var sql = 'SELECT * FROM user WHERE id = ?'; //displays user with specified id
                conn.query(sql, [id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // 4) PUT /users/:id
    updateUser: function (username, profile_pic_url, id, callback) {

        var conn = db.getConnection(); 
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected! Getting user with id " + id + ".");
                var sql = 'SELECT * FROM user WHERE id = ?';
                conn.query(sql, [id], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    }
                    else {
                        if (username == undefined) username = result[0].username
                        if (profile_pic_url == undefined) profile_pic_url = result[0].profile_pic_url
                        // attribute remains unchanged if it is not defined

                        var sql = 'UPDATE user SET username=?, profile_pic_url=? WHERE id=?';
                        conn.query(sql, [username, profile_pic_url, id], function (err, result) {
                            conn.end();
                            
                            if (err) {
                                console.log(err.errno); //return 1062 if username is not unique
                                return callback(err.errno, null);
                            }
                            else {
                                return callback(null, result.affectedRows);
                            }
                        })
                    }
                });
            }       
        })
    },

    // CA2 POST /login
    loginUser: function (username, password, callback) {
        
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
        
                var sql = 'SELECT * from user WHERE username=? AND password=?';
        
                conn.query(sql, [username, password], function (err, result) {
                    conn.end();
                            
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                                
                    } else {
                        var token="";
                        if(result.length==1) {
                            token = jwt.sign({id:result[0].userid}, // userid is unique
                                config.key, // "admin password"
                                {expiresIn:300/*expires in 24 hrs*/}
                            );
        
                        }
        
                        return callback(null, token, result);
        
                    }
                });
        
            }
        
        });
    },

    logoutUser: function(req, res, callback) {
        var session = req.session.user;
        if(session) {
            req.session.user = null;
            return callback(null, {'success': true, "message": "user logout successfully"});
        }
        else {
            callback(null, {'success': false, "message": "user logout unsuccessfully"});
        }
    }
}

module.exports = userDB;