'use strict';

var category = require('../../app/controllers/category.server.controller');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
    // Root routing
    var u = user.requiresLogin;
    var a = user.hasAuthorizationAdmin;

    app.route('/categories').get(category.getCategory);
    app.route('/category/:id').get(category.getCategory);

    //content DML
    app.route('/category').post(u,a,category.saveCategory);
    app.route('/category/:id').delete(u,a,category.deleteCategory);
    app.route('/category/:id').put(u,a,category.updateCategory);
};
