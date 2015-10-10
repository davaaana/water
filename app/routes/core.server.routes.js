'use strict';

var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
	// Root routing
	var u = user.requiresLogin;
	var a = user.hasAuthorizationAdmin;

	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.visitors,core.index);
	app.route('/chartContent').get(u,a,core.chartContent);
	app.route('/chartUser').get(u,a,core.chartUser);
	app.route('/lastContents').get(u,a,core.lastContents);
};
