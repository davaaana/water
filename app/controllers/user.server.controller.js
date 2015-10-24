'use strict';

/**
 * Module dependencies.
 */
var _ = require('underscore'),
    passport = require('passport');

var fs = require('fs');
var multer = require('multer');
var request = require('request');
var roles = require('../../app/models/config.js');
var config = require('../../config/config.js');

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            res.status(401).json(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;
            user.passcode = undefined;

            req.login(user, function (err) {
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
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {
        passport.authenticate(strategy, function (err, user, redirectURL) {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.login(user, function (err) {
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
exports.requiresLogin = function (req, res, next) {
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
exports.hasAuthorization = function (roles) {
    var _this = this;

    return function (req, res, next) {
        _this.requiresLogin(req, res, function () {
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

exports.getRoles = function (req, res) {
    req.pg.query("SELECT * FROM role", function (err, result) {
        if (err) {
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.createUser = [
    multer({
        dest: './public/img/',
        limits: {
            fieldNameSize: 1000,
            files: 1,
            fields: 5
        },
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                return false;
            }
        },
        onFileUploadData: function () {
        },
        onFileUploadComplete: function () {
        }
    }), function (req, res) {
        var user = config.convertToJson(req.body.user);
        var imgPath = '/img/' + req.files.file.name;
        var params = [user.username, user.password, user.fullname, user.phone, user.email, user.role_id, imgPath];
        req.pg.query("INSERT INTO \"user\"(username, password, fullname, phone, email, role_id,image) VALUES ($1, $2, $3, $4, $5, $6,$7);", params, function (err, result) {
            if (err) {
                return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
            } else {
                return res.status(200).json({message: 'Амжилттай хадгаллаа'});
            }
        });
    }];

exports.updateUser = [
    multer({
        dest: './public/img/',
        limits: {
            fieldNameSize: 1000,
            files: 1,
            fields: 5
        },
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                return false;
            }
        },
        onFileUploadData: function () {
        },
        onFileUploadComplete: function () {
        }
    }), function (req, res) {
        var user = config.convertToJson(req.body.user);
        console.log(req.body.user);
        req.pg.query("SELECT * FROM \"user\" WHERE username = $1", [user.username], function (err, rst) {
            if (err) {
                console.log(err);
                return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
            }
            if (rst.rows.length > 0) {
                var fs = require('fs');
                fs.exists('./public' + rst.rows[0].image, function (exists) {
                    if (exists) {
                        fs.unlink('./public' + rst.rows[0].image);
                    }
                });
            } else {
                return res.status(400).json({message: 'Хэрэглэгчийн мэдээлэл бааз дээр алга байна'});
            }
        })
        var imgPath = '/img/' + req.files.file.name;
        var params = [user.password, user.fullname, user.phone, user.email || '', user.role_id || 1, imgPath, user.username,];
        req.pg.query("UPDATE \"user\" SET password = $1, fullname = $2, phone = $3, email = $4, role_id = $5, image = $6 WHERE username = $7", params, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
            } else {
                return res.status(200).json({message: 'Амжилттай хадгаллаа',body:user});
            }
        });
    }];

exports.getUsers = function (req, res) {
    req.pg.query("SELECT * FROM \"user\"", function (err, result) {
        if (err) {
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.deleteUser = function (req, res) {
    req.pg.query("SELECT * FROM \"user\" WHERE username = $1", [req.params.id], function (err, rst) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        }
        if (rst.rows.length > 0) {
            var fs = require('fs');
            fs.exists('./public' + rst.rows[0].image, function (exists) {
                if (exists) {
                    fs.unlink('./public' + rst.rows[0].image);
                }
            });
        } else {
            return res.status(400).json({message: 'Хэрэглэгчийн мэдээлэл бааз дээр алга байна'});
        }
    });

    req.pg.query("DELETE FROM \"user\" WHERE username = $1",[req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        } else {
            return res.status(200).json({message:'Амжилттай устгагдлаа'});
        }
    });
};
