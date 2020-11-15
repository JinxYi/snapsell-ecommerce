/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var db = require("./databaseConfig.js");

var metaphone = require('metaphone');

var listingDB = {
    // 5) GET /users/:user_id/listings/
    getListingByUserId: function(id, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function(err) {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting list of products by user with id " + id + ".");
                var sql = "SELECT * FROM listing WHERE fk_user_id = ?";
                // displays all items by a particular user

                dbConn.query(sql,[id],function(err, result) {
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

    // 6) GET /listings/
    getListing: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting list of products...")
                var sql = "SELECT * FROM listing";
                // displays all items

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

    // 7) GET /listings/:listing_id/
    getListingById: function (id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected! Getting listing by id " + id +".");
                var sql = 'SELECT * FROM listing WHERE id = ?';
                // displays item by their id

                dbConn.query(sql, [id], function (err, result) {
                    dbConn.end();
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

    // 8) POST /listings/
    addListing: function (title, description, price, fk_user_id, item_pic_url, title_metaphone, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Inserting user record.");
                var sql = 'INSERT INTO listing(title, description, price, fk_user_id, item_pic_url, title_metaphone) VALUES(?, ?, ?, ?, ?, ?)';

                dbConn.query(sql, [title, description, price, fk_user_id, item_pic_url, title_metaphone], function (err, result) {
                   dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        console.log(result.affectedRows + " row(s) affected.");
                        console.log("Row inserted! New listing id is " + result.insertId)
                        return callback(null, result.insertId);
                    }
                                                
                });

            }
        });
    },

    // 9) DELETE /listings/:id/
    deleteListing: function(id, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function(err) {
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Deleting item with list id " + id + ".");
                var sql = "DELETE FROM listing WHERE id = ?";

                dbConn.query(sql, [id], function(err, result) {
                    dbConn.end();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    // 10) PUT /listings/:id/
    updateListing: function (title, description, price, fk_user_id, item_pic_url, id, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting item with list id " + id + ".");
                var sql = 'SELECT * FROM listing WHERE id = ?';
                dbConn.query(sql, [id], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    }
                    else {
                        if (title == undefined) title = result[0].title;
                        if (description == undefined) description = result[0].description;
                        if (price == undefined) price = result[0].price;
                        if (fk_user_id == undefined) fk_user_id = result[0].fk_user_id;
                        if (item_pic_url == undefined) item_pic_url = result[0].item_pic_url;

                        var sql = 'UPDATE listing SET title=?, description=?, price=?, fk_user_id=?, item_pic_url=? WHERE id=?';
                        dbConn.query(sql, [title, description, price, fk_user_id, id], function (err, result) {
                            dbConn.end();
                            
                            if (err) {
                                console.log(err);
                                return callback(err, null);
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

    searchListing: function(keyword, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {
            console.log(metaphone(keyword))
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting products like \""+ keyword + "\"...");
                var sql = "SELECT * FROM listing WHERE title_metaphone LIKE CONCAT('%', ?, '%')";

                dbConn.query(sql, [metaphone(keyword)], function(err, result) {
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

}

module.exports = listingDB;