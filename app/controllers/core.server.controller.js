'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.visitors = function(req, res, next) {
        next();
};

exports.getUsers = function(req, res, next) {
    req.pg.query("SELECT * FROM \"user\"", function (err, result) {
        res.status(200).json(result.rows);
    });
};
