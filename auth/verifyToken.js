var jwt = require('jsonwebtoken');
require('dotenv').config();

var config = process.env.KEY;

function verifyToken(req, res, next) {

    var token = req.headers['authorization']; //retrieve authorization header’s content
    console.log(token);
    if (!token || !token.includes('Bearer')) { //process the token
        res.status(403);
        return res.send({ auth: 'false', message: 'Not authorized!' });
    } else {
        token = token.split('Bearer ')[1]; //obtain the token’s value

        jwt.verify(token, config, function (err, decoded) {//verify token
            if (err) {
                res.status(403);
                return res.send({ auth: false, message: 'Not authorized!' });
            } else {
                if(req.params.userid != null && decoded.id != req.params.userid) {
                    console.log()
                    return res.status(403).send({ auth: false, message: 'Not authorized!' });
                }
                else if(req.body.userid != null && decoded.id != req.body.userid) {
                    return res.status(403).send({ auth: false, message: 'Not authorized!' });
                }
                else {
                    req.userid = decoded.id; //decode the userid and store in req for use
                    // req.role = decoded.role; //decode the role and store in req for use
                    next();
                }
            }
        });
    }
}

module.exports = verifyToken;
