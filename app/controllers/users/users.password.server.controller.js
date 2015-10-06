'use strict';


var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	config = require('../../../config/config'),
	async = require('async');


/**
 * Нууц үг мартсан тохиолдолд
 */
exports.forgot = function(req, res) {
	res.json('Password forget');
};

/**
 * Нууц үгээ мартсан тохиолдолд мэйлээр илгээх
 */
exports.validateResetToken = function() {

};

/**
 * Нууц үгээ мартсэн тохиолдолд мэйлээр илгээх
 */
exports.reset = function(req, res) {
	res.json('password reset');
};

/**
 * Нууц үг солих
 */
exports.changePassword = function(req, res) {

    if (req.body.oldPassword == undefined || !req.body.newPassword) {
        return res.status(400).json({message:'Өгөгдөл буруу байна.', type: 0});
    }

	req.cassandra.execute('SELECT password FROM account WHERE login_name = ?',[req.user.id], {prepare:true}, function (err, result) {
		if (!err) {
			if(req.body.oldPassword == result.rows[0].password){
				req.cassandra.execute('UPDATE account SET password = ? WHERE login_name = ?',[req.body.newPassword, req.user.id],{prepare:true}, function (err) {
					if (!err) {
						return res.json({message:'Амжилттай хадгаллаа',type:1});
					}
					else {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err),type:0
						});
					}
				});
			}else{
				res.json({message:'Та нууц үгээ шалгаад дахин хадгалана уу?', type:0});
			}
		} else {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};
