/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var db = require("./databaseConfig.js");

var offerDB = {
    // 11) GET /listings/:id/offers/
    getOffers: function(id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function(err) {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Getting offers for item with listing id " + id + ".");
                var sql = "SELECT o.id, o.offer, o.fk_offeror_id, u.username offeror, o.fk_listing_id, p.title product, o.created_at FROM offer o, listing p, user u WHERE o.fk_listing_id = p.id AND o.fk_offeror_id = u.id AND o.fk_listing_id=?";

                dbConn.query(sql, [id], function(err, result) {
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

    // 12) POST /listings/:id/offers/
    addOffer: function (offer, fk_offeror_id, fk_listing_id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected! Inserting offer for item with id " + fk_listing_id + ".");
                var sql = 'INSERT INTO offer(offer, fk_offeror_id, fk_listing_id) VALUES(?, ?, ?)';

                dbConn.query(sql, [offer, fk_offeror_id, fk_listing_id], function (err, result) {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        console.log(result.affectedRows + " row(s) affected.");
                        console.log("Row inserted! New offer id is " + result.insertId)
                        return callback(null, result.insertId);
                    }
                                                
                });

            }
        });
    },

}

module.exports = offerDB;