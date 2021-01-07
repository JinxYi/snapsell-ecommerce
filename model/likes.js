/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var db = require("./databaseConfig.js");

var likesDB = {
    // 13) GET /listings/:id/likes
    getLikesByProduct: function (fk_product_id, callback) {
        console.log("Connected! Getting likes for item with listing id " + fk_product_id + ".");
        var sql = `SELECT l.id, u.id userid, u.username liker, p.title product, l.created_at 
            FROM likes l, listing p, users u 
            WHERE l.fk_product_id = p.id AND l.fk_liker_id = u.id AND p.id = $1;`;
        // displays id, liker, product name, and time created of a particular product

        db.query(sql, [fk_product_id], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        })

    },

    // GET /users/:id/likes
    getLikesByUser: function(userid, callback) {
        var sql = `
        SELECT p.id, p.title, p.price, p.item_pic_url, u.id userid
        FROM likes l, listing p, users u
        WHERE l.fk_product_id = p.id AND l.fk_liker_id = u.id
            AND u.id = $1;`;

        db.query(sql, [userid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        })
    },

    // 14) GET /likes
    getLikes: function (callback) {
        console.log("Connected! Getting likes for items.");
        var sql = "SELECT l.id, u.username liker, p.title product, l.created_at FROM likes l, listing p, users u WHERE l.fk_product_id = p.id AND l.fk_liker_id = u.id;";
        // displays id, liker, product name, and time created

        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        })
    },

    // 15) POST /listings/:id/likes
    addLike: function (fk_liker_id, fk_product_id, callback) {
        console.log("Connected! Liking item with id " + fk_product_id + ".");
        var sql = 'INSERT INTO likes(fk_liker_id, fk_product_id) VALUES($1, $2)';

        db.query(sql, [fk_liker_id, fk_product_id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result.rowCount + " row(s) affected.");
                return callback(null, result.rowCount);
            }

        });

    },

    // 16) DELETE /likes/:id
    deleteLike: function (id, callback) {
        console.log("Connected! Deleting like with id " + id + ".");
        var sql = "DELETE FROM likes WHERE id = $1";

        db.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rowCount);
            }
        });

    },

    toggleLike: function (listingid, userid, callback) {        
        var checksql = `SELECT id from likes WHERE fk_liker_id = $1::int AND fk_product_id::int = $2`;
        var insertsql = 'INSERT INTO likes(fk_liker_id, fk_product_id) VALUES($1, $2)';
        var deletesql = "DELETE FROM likes WHERE id = $1";
        db.query(checksql, [userid, listingid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
                
            }
            else {
                if(result.rowCount > 0 && result.rows[0].id != null) {
                    console.log(result.rows[0].id);
                    db.query(deletesql, [parseInt(result.rows[0].id)], function(err, result) {
                        if (err) {
                            return callback(err, null);
                        }
                        return callback(null, result.rowCount);
                    })
                }
                else {
                    db.query(insertsql, [userid, listingid], function(err, result) {
                        if (err) {
                            return callback(err, null);
                        }
                        return callback(null, result.rowCount);
                    });
                }
            }
        });

    }

}

module.exports = likesDB;