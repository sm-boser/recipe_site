var userModel = require('../models/user');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var salt = '011e139acebe0f6ae58caff7ca27962b';
var settings = require('../config/settings');

exports.saveUser = (req, res) => {
    let user = new userModel({
        name: req.body.name,
        pwd: this.encryptingPwd(req.body.pwd)
    })

    // Trasaction 
    // const session = await userModel.startSession();
    // session.startTransaction();
    // session.commitTransaction();
    // session.abortTransaction();
    // session.endSession();

    userModel.create(user, function (err, u) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': err
            })
        } else {
            res.json({
                'success': true,
                'msg': `Record added successfully with name ${req.body.name}`
            })
        }
    })
}

exports.encryptingPwd = (pass) => {
    //salt = crypto.randomBytes(16).toString('hex');
    const encPwd = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
    return encPwd;
}

/**
 * Passport local staretagy
 * 
 * 
 */

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pwd'
}, function (username, password, done) {
    userModel.findOne({ 'name': username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        // const salt = crypto.randomBytes(16).toString('hex');
        const encPwd = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        if (encPwd !== user.pwd) {
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        return done(null, user);
    })
}));

exports.login = (req, res) => {
    console.log('Here');
    passport.authenticate('local', function (err, user, info) {
        // If Passport throws/catches an error
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': err
            })
        } else {
            if (user) {
                let token = jwt.sign({
                    'userId': user._id,
                    'name': user.name,
                }, settings.jwtTokenSecret, { expiresIn: "1h" });
                res.status(200).send({
                    'success': true,
                    'msg': 'success',
                    'name': user.name,
                    'token': token,
                    'expiresIn': 3600
                })
            } else {
                res.status(200).send({
                    'success': false,
                    'msg': 'No User found'
                })
            }
        }
    })(req, res)
}

