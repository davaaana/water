'use strict';

module.exports = function(app) {
    // root routing
    var user = require('../../app/controllers/user.server.controller');

    app.route('/signin').post(user.signin);

    //user dml
    app.route('/user').post(user.signin);
    //app.route('/createUser').post(user.createUser);
    app.route('/roles').get(user.getRoles);

    //app.route('/user').get(user.signin);
    app.route('/user').delete(user.signin);
    app.route('/user').put(user.signin);

    app.route('/user/:username').put(user.signin);
    app.route('/users').get(user.signin);
    app.route('/logout').get(user.signout);


};
