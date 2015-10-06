'use strict';

var roles = require('../../app/models/config.js');
var multer = require('multer');

exports.getContents = function(req, res) {
    req.pg.query("SELECT * FROM content", function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????!'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'??????? ?????????'});
            }
            return res.status(200).json(result.rows);
        }

    });
};

exports.getContent = function(req, res, next) {
    req.pg.query("SELECT * FROM content WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????!'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'??????? ?????????'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.deleteContents = function(req, res, next) {
    req.pg.query("DELETE FROM content WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????!'});
        }else{
            return res.status(200).json({message:'????????? ??????????'});
        }
    });
};

exports.saveContents = [
    multer({
    dest: './public/img/',
    limits: {
        fieldNameSize: 1000,
        files: 1,
        fields: 5
    },
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return false;
        }
    },
    onFileUploadData: function () {
    },
    onFileUploadComplete: function () {
    }
}),function(req, res, next) {
    var params = [req.body.title,req.body.content,'/img/' + req.files.file0.originalname +'' ,new Date(),req.user.username,req.body.category_id];
    var body = "INSERT INTO content(id, title, content, image, created_date, \"user\", category_id) VALUES (null,$1, $2, $3, $4, $5, $6);";
    req.pg.query(body,params, function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????!'});
        }else{
            return res.status(200).json({message:'????????? ?????????'});
        }
    });
}];

exports.updateContent = function(req, res, next) {
    var params = [req.body.title,req.body.content,req.body.image,new Date(),req.user.username,req.body.category_id];
    var body = "INSERT INTO content(id, title, content, image, created_date, \"user\", category_id) VALUES (null,$1, $2, $3, $4, $5, $6);";
    req.pg.query(body,params, function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????!'});
        }else{
            return res.status(200).json({message:'????????? ?????????'});
        }
    });
};



/**
 * ?????? ?????? ?????? ?????
 * @return String
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.user.role_id != roles.user_roles.admin) {
        return res.status(403).send({
            message: '?? ?????? ?????? ?????.'
        });
    }
    next();
};
