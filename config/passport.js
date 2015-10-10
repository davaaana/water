'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	config = require('./config'),
    request = require('request');

/**
 * Module init function.
 */
module.exports = function(client) {

	// Serialize sessions
	passport.serializeUser(function(user, done) {
        done(null, user);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
        done(null, id);
	});

    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
        function(username, password, done) {
            client.query('select * from \"user\" where username = $1 and password = $2', [username,password], function (err, user) {
                if (err) {
                    done(err, null);
                }
                else {
                    if (user.rows.length === 0) {
                        done(new TypeError('Account not found.'), null);
                    }
                    var fs = require('fs');
                    fs.exists('./public' + user.rows[0].image, function (exists) {
                        user = user.rows[0];
                        if (!exists) {
                            console.log('image not found');
                            user.image = '/img/avatar.png';
                            done(null, user);
                        }else{
                            done(null, user);
                        }
                    });






                }
            });
        }
    ));
};
