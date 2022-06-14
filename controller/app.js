/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/

var verifyToken = require('../auth/verifyToken.js');

var express = require('express');
var app = express();
const path = require('path');

var bodyParser = require('body-parser');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse application/json data
app.use(urlencodedParser);

app.use(express.static("public"));

//validation
const {check, validationResult} = require('express-validator');


// user database
var user = require("../model/user.js");

app.get('/', function(req, res) {
    res.status(200);
    res.redirect("../home.html");
});

// 1) GET /users
app.get('/users', function(req, res) {

    user.getUsers(function(err, result) {
        if(!err) {
            res.status(200);
            // res.setHeader('Content-Type', 'application/json');
            // res.sendFile("/public/user.html", { root: __dirname });
            // res.json(JSON.stringify(result));
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
    var password2 = req.body.password2;

    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!password.match(re)) {
        res.status(400).send({"error": "Password must include one lowercase character, one uppercase character, a number, and a special character."});
    }
    else if(password != password2) {
        res.status(400).send({"error": "Password does not match"});
    }
    else {
        user.addUser(username, profile_pic_url, password, function (err, result) {
            if (!err) {
                res.status(201).send(`{"id": "created"}`);
            } else{
                if(err.code == 23505) {
                    res.status(409).send({"error": "Username already exists"})
                }
                else {
                    res.status(500).send(err.message);
                }
                
            }
        });
    }

});


// 3) GET /users/:id
app.get('/users/:userid', function (req, res) {
    var userid = req.params.userid;

    user.getUser(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else{
            res.status(500).send(err.message);
        }
    });
});


// 4) PUT /users/:id
app.put('/users/:userid', verifyToken, function (req, res) {
    
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
            console.log(token);
            result = result[0];
            // const user = `{id: "${result.id}", username: "${result.username}", profile_pic_url: "${result.profile_pic_url}", created_at: "${result.created_at}"}`
            res.json({UserData: result.id, token:token});
        } else{
            res.status(500).send(err.message);
        }

    });
});



// listing database
var listing = require("../model/listing.js");


// 5) GET /users/:user_id/listings/
app.get('/users/:user_id/listings', verifyToken, function(req, res) {
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
app.get('/listings/:listing_id/', [ check("listing_id").isInt() ],function(req, res) {
    var listing_id = req.params.listing_id;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(500).send(`{"error": "id does not match format"}`)
    }
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
app.post('/listings', verifyToken, function (req, res) {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var fk_user_id = req.body.fk_user_id;
    var item_pic_url = req.body.item_pic_url;

    listing.addListing(title, description, price, fk_user_id, item_pic_url, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"listingID": "created"`);
        }
        else {
            res.status(500).send(err.message);
        }
    });
});


// 9) DELETE /listings/:id/
app.delete('/listings/:id', verifyToken, function(req, res) {

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
    // , [check("keyword").matches(/[a-zA-Z0-9!@#$%^&*()-=_+]/).escape()]
    //checking errors
    // const errors = validationResult(req);

    listing.searchListing(keyword, function(err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(err.message);
            console.log(err.message);
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
app.post('/listings/:id/offers', verifyToken, function (req, res) {
    var fk_listing_id = req.params.id;
    var offer = req.body.offer;
    var fk_offeror_id = req.body.fk_offeror_id;

    console.log(fk_listing_id, offer, fk_offeror_id);
    offers.addOffer(offer, fk_offeror_id, fk_listing_id, function (err, result) {
        if (!err) {
            res.status(200);
            res.send(`{"offerID": "created"`);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 11) GET /listings/:id/offers/
app.get('/users/:userid/offers', verifyToken, function(req, res) {
    var user_id = req.params.userid; // id refers to listing id

    offers.getOfferByUser(user_id, function(err, result) {
        if(!err) {
            res.status(200).send(result);
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

// GET /users/:id/likes
app.get('/users/:userid/likes', verifyToken, function(req, res) {
    var user_id = req.params.userid;

    likes.getLikesByUser(user_id, function(err, result) {
        if(!err) {
            console.log(result);
            res.status(200).send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    })
})


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
app.post('/listings/:id/likes', verifyToken, function (req, res) {
    var fk_product_id = req.params.id;
    var userid = req.body.userid;

    likes.addLike(userid, fk_product_id, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"likeID": ""created""`);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    });
});


// 16) DELETE /likes/:id
app.delete('/likes/:id', verifyToken, function(req, res) {
    var id = req.params.id;
    var id = req.body.id;

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

app.post('/likes/toggle', verifyToken, function(req, res) {
    var listing_id = req.body.listing_id;
    var userid = req.body.userid;

    likes.toggleLike(listing_id, userid, function(err, result) {
        if(!err) {
            res.status(200).send(`{"affectedRows": 1}`);
        }
        else {
            console.log(err);
            res.status(500).send(err.message);
        }
    })
})

module.exports = app;