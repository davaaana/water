'use strict';

module.exports = function(app) {
    // root routing
    var user = require('../../app/controllers/user.server.controller');
    var u = user.requiresLogin;
    var a = user.hasAuthorizationAdmin;

    app.route('/signin').post(user.signin);

    //user dml
    app.route('/user').post(user.signin);
    app.route('/createUser').post(u,a,user.createUser);
    app.route('/roles').get(user.getRoles);

    //app.route('/user').get(user.signin);
    app.route('/user/:id').delete(u,a,user.deleteUser);
    app.route('/updateUser').post(u,a,user.updateUser);
    app.route('/users').get(user.getUsers);
    //app.route('/userImage').get(user.get);
    app.route('/logout').get(user.signout);


};
