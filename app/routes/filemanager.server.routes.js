'use strict';

var file = require('../../app/controllers/filemanager.server.controller');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
    // Root routing
    var u = user.requiresLogin;
    var a = user.hasAuthorizationAdmin;

    app.route('/api/v1/filemanager').get(u,a,file.list);

    //content DML
    app.route('/api/v1/filemanager').post(u,a,file.upload);
    app.route('/api/v1/filemanager/:id').delete(u,a,file.delete);
};
