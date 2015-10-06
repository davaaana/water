'use strict';

module.exports = function(app) {
    // Root routing
    var user = require('../../app/controllers/user.server.controller');

    app.route('/signin').post(user.signin);

    //user DML
    app.route('/user').post(user.signin);
    //app.route('/user').get(user.signin);
    app.route('/user').delete(user.signin);
    app.route('/user').put(user.signin);

    app.route('/user/:username').put(user.signin);
    app.route('/users').get(user.signin);


};
