'use strict';

var content = require('../../app/controllers/content.server.controller');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
    // Root routing
    var u = user.requiresLogin;
    var a = user.hasAuthorizationAdmin;

    app.route('/contents').get(content.getContents);
    app.route('/content/slide').get(content.getSlider);
    app.route('/contentSearch').get(content.getContentSearch);
    app.route('/content/:id').get(content.getContent);

    //content DML
    app.route('/content').post(u,a,content.saveContents);
    app.route('/content/:id').delete(u,a,content.deleteContents);
    app.route('/content/:id').put(u,a,content.updateContent);
};
