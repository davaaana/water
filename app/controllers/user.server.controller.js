'use strict';

/**
 * Module dependencies.
 */
var _ = require('underscore'),
    passport = require('passport');

var fs = require('fs');
var request = require('request');

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            res.status(401).json(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;
            user.passcode = undefined;

            req.login(user, function(err) {
                if (err) {
                    next(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
    return function(req, res, next) {
        passport.authenticate(strategy, function(err, user, redirectURL) {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.login(user, function(err) {
                if (err) {
                    return res.redirect('/login');
                }

                return res.redirect(redirectURL || '/');
            });
        })(req, res, next);
    };
};


/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
    var _this = this;

    return function(req, res, next) {
        _this.requiresLogin(req, res, function() {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};

/**
 * ?????? ???
 * @return String
 */
exports.hasAuthorizationAdmin = function (req, res, next) {
    if (req.user.role_id != roles.user_roles.admin) {
        return res.status(403).send({
            message: 'Таны хандах эрх хүрэхгүй байна'
        });
    }
    next();
};

exports.getRoles = function(req, res) {
    req.pg.query("SELECT * FROM role", function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'???????? ??????? ???? ?????'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

