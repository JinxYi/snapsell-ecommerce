/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var db = require("./databaseConfig.js");

var offerDB = {
    // 11) GET /listings/:id/offers/
    getOffers: function (id, callback) {

        console.log("Connected! Getting offers for item with listing id " + id + ".");
        var sql = 
        `SELECT o.id, o.offer, o.fk_offeror_id, u.username offeror, u.profile_pic_url, o.fk_listing_id, p.title product, o.created_at 
            FROM offer o, listing p, users u 
            WHERE o.fk_listing_id = p.id AND o.fk_offeror_id = u.id AND o.fk_listing_id=$1`;

        db.query(sql, [id], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        })
    },

    // 12) POST /listings/:id/offers/
    addOffer: function (offer, fk_offeror_id, fk_listing_id, callback) {
        console.log("Connected! Inserting offer for item with id " + fk_listing_id + ".");
        var sql = 'INSERT INTO offer(offer, fk_offeror_id, fk_listing_id) VALUES($1, $2, $3)';

        db.query(sql, [offer, fk_offeror_id, fk_listing_id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                console.log(result.rowCount + " row(s) affected.");
                return callback(null, result.rowCount);
            }

        });

    },

    getOfferByUser: function(userid, callback) {
        var sql = `
        SELECT o.offer, p.id, p.title product, p.item_pic_url, o.created_at 
        FROM offer o, listing p, users u 
        WHERE o.fk_listing_id = p.id AND o.fk_offeror_id = u.id AND o.fk_offeror_id=$1
        `;

        db.query(sql, [userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                return callback(null, result.rows);
            }
        })
    }


}

module.exports = offerDB;