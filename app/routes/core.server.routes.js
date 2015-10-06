'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.visitors,core.index);
	app.route('/user').get(core.getUsers);
};
