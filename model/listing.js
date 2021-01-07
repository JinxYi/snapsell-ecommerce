/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var dbConn = require("./databaseConfig.js");


var listingDB = {
    // 5) GET /users/:user_id/listings/
    getListingByUserId: function (id, callback) {

        console.log("Connected! Getting list of products by users with id " + id + ".");
        var sql = "SELECT * FROM listing WHERE fk_user_id = $1";
        // displays all items by a particular user

        dbConn.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result);
            }
        })

    },

    // 6) GET /listings/ DONE
    getListing: function (callback) {
        console.log("Connected! Getting list of products...")
        var sql = 
        `SELECT listing.id, title, description, price, fk_user_id, listing.created_at, item_pic_url, COALESCE(count(likes.id), 0) likes_number
            FROM listing
            FULL OUTER JOIN likes
                ON listing.id = likes.fk_product_id
            GROUP BY listing.id
            ORDER BY listing.id;
        `;
        // displays all items

        dbConn.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result)
                return callback(null, result.rows);
            }
        })

    },

    // 7) GET /listings/:listing_id/ DONE
    getListingById: function (id, callback) {

        console.log("Connected! Getting listing by id " + id + ".");
        var sql = 
        `SELECT 
            listing.id, title, description, price, fk_user_id, listing.created_at, item_pic_url, 
            COALESCE(count(likes.id), 0) likes_number,
            users.id seller_id, users.username seller_name, users.profile_pic_url seller_pic
        FROM listing
        FULL OUTER JOIN likes
            ON listing.id = likes.fk_product_id
        JOIN users 
            ON listing.fk_user_id = users.id
        WHERE listing.id = $1
        GROUP BY listing.id, users.id;`;
        // displays item by their id

        dbConn.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        });

    },

    // 8) POST /listings/
    addListing: function (title, description, price, fk_user_id, item_pic_url, callback) {
        console.log("Connected! Inserting product record.");
        var sql = 'INSERT INTO listing(title, description, price, fk_user_id, item_pic_url) VALUES($1, $2, $3, $4, $5, $6)';

        dbConn.query(sql, [title, description, price, fk_user_id, item_pic_url], function (err, result) {
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

    // 9) DELETE /listings/:id/
    deleteListing: function (id, callback) {
        console.log("Connected! Deleting item with list id " + id + ".");
        var sql = "DELETE FROM listing WHERE id = $1";

        dbConn.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rowCount);
            }
        });
    },

    // 10) PUT /listings/:id/
    updateListing: function (title, description, price, fk_user_id, item_pic_url, id, callback) {
        console.log("Connected! Getting item with list id " + id + ".");
        var sql = 'SELECT * FROM listing WHERE id = $1';
        dbConn.query(sql, [id], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                result = result.rows;
                if (title == undefined) title = result[0].title;
                if (description == undefined) description = result[0].description;
                if (price == undefined) price = result[0].price;
                if (fk_user_id == undefined) fk_user_id = result[0].fk_user_id;
                if (item_pic_url == undefined) item_pic_url = result[0].item_pic_url;

                var sql = 'UPDATE listing SET title=$1, description=$2, price=$3, fk_user_id=$4, item_pic_url=$5 WHERE id=$6';
                dbConn.query(sql, [title, description, price, fk_user_id, id], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result.rowCount);
                    }
                })
            }
        })
    },

    // Search for product DONE
    searchListing: function (keyword, callback) {
        console.log("Connected! Getting products like \"" + keyword + "\"...");
        var sql = `
        SELECT listing.id, title, description, price, fk_user_id, listing.created_at, item_pic_url, COALESCE(count(likes.id), 0) likes_number
        FROM listing
            FULL OUTER JOIN likes
            ON listing.id = likes.fk_product_id
        WHERE lower(title) LIKE '%' || lower($1) || '%'
        GROUP BY listing.id;
        `;
        
        dbConn.query(sql, [keyword], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                return callback(null, result.rows);
            }
        })

    }

}

module.exports = listingDB;