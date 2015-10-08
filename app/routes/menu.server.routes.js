'use strict';

var menu = require('../../app/controllers/menu.server.controller');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
    // Root routing
    var u = user.requiresLogin;
    var a = user.hasAuthorizationAdmin;

    app.route('/menus').get(menu.getMenus);
    app.route('/menu/:id').get(menu.getMenu);

    //content DML
    app.route('/menu').post(u,a,menu.saveMenu);
    app.route('/menu/:id').delete(u,a,menu.deleteMenu);
    app.route('/menu/:id').put(u,a,menu.updateMenu);
};
