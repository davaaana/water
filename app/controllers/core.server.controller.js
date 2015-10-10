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

exports.chartContent = function(req, res, next) {
    req.pg.query("select count(id) as y,category_id as name from content group by category_id", function (err, result) {
        res.status(200).json(result.rows);
    });
};

exports.lastContents = function(req, res, next) {
    req.pg.query("select * from content order by created_Date limit 10", function (err, result) {
        res.status(200).json(result.rows);
    });
};

exports.chartUser = function(req, res, next) {
    req.pg.query("select count(id) as y,\"user\" as name from content group by name", function (err, result) {
        res.status(200).json(result.rows);
    });
};

