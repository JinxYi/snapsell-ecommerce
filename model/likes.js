/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var db = require("./databaseConfig.js");

var likesDB = {
    // 13) GET /listings/:id/likes
    getLikesByProduct: function(fk_product_id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting likes for item with listing id " + fk_product_id + ".");
                var sql = "SELECT l.id, u.username liker, p.title product, l.created_at FROM likes l, listing p, user u WHERE l.fk_product_id = p.id AND l.fk_liker_id = u.id AND p.id = ?;";
                // displays id, liker, product name, and time created of a particular product

                dbConn.query(sql, [fk_product_id], function(err, result) {
                    dbConn.end();

                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                })
            }
        })
    },

    // 14) GET /likes
    getLikes: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting likes for items.");
                var sql = "SELECT l.id, u.username liker, p.title product, l.created_at FROM likes l, listing p, user u WHERE l.fk_product_id = p.id AND l.fk_liker_id = u.id;";
                // displays id, liker, product name, and time created
                
                dbConn.query(sql, function(err, result) {
                    dbConn.end();

                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                })
            }
        })
    },

    // 15) POST /listings/:id/likes
    addLike: function (fk_liker_id, fk_product_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Liking item with id " + fk_product_id + ".");
                var sql = 'INSERT INTO likes(fk_liker_id, fk_product_id) VALUES(?, ?)';

                conn.query(sql, [fk_liker_id, fk_product_id], function (err, result) {
                   conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        console.log(result.affectedRows + " row(s) affected.");
                        console.log("Row inserted! New like id is " + result.insertId)
                        return callback(null, result.insertId);
                    }
                                                
                });

            }
        });
    },

    // 16) DELETE /likes/:id
    deleteLike: function(id, callback) {
        var conn = db.getConnection();
        conn.connect(function(err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Deleting like with id " + id + ".");
                var sql = "DELETE FROM likes WHERE id = ?";

                conn.query(sql, [id], function(err, result) {
                    conn.end();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result.affectedRows);
                    }
                });
            }
        })
    }

}

module.exports = likesDB;