/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/

var verifyToken = require('../auth/verifyToken.js');

var metaphone = require('metaphone'); // for search query

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse application/json data
app.use(urlencodedParser);

app.use(express.static("public"));

// user database
var user = require("../model/user.js");

// 1) GET /users
app.get('/users', function(req, res) {

    user.getUsers(function(err, result) {
        if(!err) {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.sendFile("/public/users.html", { root: __dirname });
            res.json(JSON.stringify(result));
        } else {
            res.status(500).send(err.message);

        }
    });

});

// 2) POST /users
app.post('/users', function (req, res) {

    var username = req.body.username;
    var profile_pic_url = req.body.profile_pic_url; 
    var password = req.body.password;

    user.addUser(username, profile_pic_url, password, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"id": ${result}}`);
        } else{
            res.status(500).send(err.message);
        }
    });
});


// 3) GET /users/:id
app.get('/users/:id', function (req, res) {
    var id = req.params.id;

    user.getUser(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else{
            res.status(500).send(err.message);
        }
    });
});


// 4) PUT /users/:id
app.put('/users/:id', verifyToken, function (req, res) {
    
    var id = req.params.id;   
    var username = req.body.username;
    var profile_pic_url = req.body.profile_pic_url;
    
    user.updateUser(username, profile_pic_url, id, function (err, result) {
        if (!err) {
            console.log(result + " row(s) affected.");
            res.sendStatus(204);
        }
        else {
            if(err == 1062) { //if username already exists
                console.log("Error " + err + ": Username already exists.");
                res.status(422).send(`Error! Username ${username} already exists.`);
                // unprocessable entity
            }
            else {
                res.status(500).send(err.message);
            }
            
        }
    });
});



// CA2 POST /login
app.post('/login', function(req,res){

    var username=req.body.username;
    var password = req.body.password;

    user.loginUser(username, password, function(err, token, result) {
        if(!err){
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, UserData: JSON.stringify(result), token:token, status:"User has logged in!"});
        } else{
            res.status(500).send(err.message);
        }

    });


});

// CA2 GET /logout
app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(!err) {
            return res.redirect('/listings.html');
        } else {
            return next(err);
        }
      });
    }
  });


// listing database
var listing = require("../model/listing.js");


// 5) GET /users/:user_id/listings/
app.get('/users/:user_id/listings', function(req, res) {
    var id = req.params.user_id;

    listing.getListingByUserId(id, function(err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});


// 6) GET /listings/
app.get('/listings', function(req, res) {
    
    listing.getListing(function(err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});


// 7) GET /listings/:listing_id/
app.get('/listings/:listing_id/', function(req, res) {
    var listing_id = req.params.listing_id;

    listing.getListingById(listing_id, function(err, result) {
        if(!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});


// 8) POST /listings
app.post('/listings', function (req, res) {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var fk_user_id = req.body.fk_user_id;
    var item_pic_url = req.body.item_pic_url;
    var title_metaphone = metaphone(title);

    listing.addListing(title, description, price, fk_user_id, item_pic_url, title_metaphone, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"listingID": ${result}}`);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});


// 9) DELETE /listings/:id/
app.delete('/listings/:id', function(req, res) {

    var id = req.params.id;
    listing.deleteListing(id, function(err, result) {
        if(!err) {
            console.log(result + " row affected.");
            res.sendStatus(204);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    })
})


// CA2 SEARCH GET /search
app.post('/search', function(req, res) {
    var keyword = req.body.keyword;

    listing.searchListing(keyword, function(err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});



// offer database
var offers = require("../model/offer.js");


// 11) GET /listings/:id/offers/
app.get('/listings/:id/offers', function(req, res) {
    var id = req.params.id; // id refers to listing id

    offers.getOffers(id, function(err, result) {
        if(!err) {
            res.status(200).send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 12) POST /listings/:id/offers/
app.post('/listings/:id/offers', function (req, res) {
    var fk_listing_id = req.params.id;
    var offer = req.body.offer;
    var fk_offeror_id = req.body.fk_offeror_id;

    offers.addOffer(offer, fk_offeror_id, fk_listing_id, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"offerID": ${result}}`);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});



// likes database
var likes = require("../model/likes.js");


// 13) GET /listings/:id/likes
app.get('/listings/:id/likes', function(req, res) {
    var fk_product_id = req.params.id; // id refers to listing id

    likes.getLikesByProduct(fk_product_id, function(err, result) {
        if(!err) {
            res.status(200).send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 14) GET /likes
app.get('/likes', function(req, res) {
    likes.getLikes(function(err, result) {
        if(!err) {
            res.status(200).send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 15) POST /listings/:id/likes
app.post('/listings/:id/likes', function (req, res) {
    var fk_product_id = req.params.id;
    var fk_liker_id = req.body.fk_liker_id;

    likes.addLike(fk_liker_id, fk_product_id, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"likeID": ${result}}`);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 16) DELETE /likes/:id
app.delete('/likes/:id', function(req, res) {
    var id = req.params.id;

    console.log(id);
    likes.deleteLike(id, function(err, result) {
        if(!err) {
            res.status(200).end();
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    })
})

module.exports = app;