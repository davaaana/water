'use strict';

var errorHandler = require('./errors.server.controller');
var multer = require('multer');
var async = require('async');

/**
 * Хуулсан зурагнуудыг бааз дээр хадгалах
 * @param file
 * @return json буцаана
 */
exports.upload = [
    multer({
        dest: './public/img/',
        limits: {
            fieldNameSize: 1000,
            files: 10,
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
    }), function (req, res) {
        console.log(req.files);
        async.each(req.files.file, function (data,callback) {
                console.log(data);
                var dt = new Date();
                var twodigit = function (number) {
                    if (number < 10) {
                        number = '0' + number;
                    }
                    return number;
                };
                var time = dt.getFullYear() + '-' + twodigit((dt.getMonth() + 1)) + '-' + twodigit(dt.getDate()) + ' ' + twodigit(dt.getHours()) + ':' + twodigit(dt.getMinutes()) + ':' + twodigit(dt.getSeconds());
                var id = new Date().getTime();
                req.pg.query("insert into file_manager(\"image\",\"store_image\",created_date,\"thumb\") values ('/img/" + data.name + "','/img/" + data.name + "',now(),'public/img')", function (err) {
                    if (!err) {
                        callback(null);
                    } else {
                        callback(null);
                        console.log(err);
                    }
                });
        }, function (err) {
            if(err){
                return res.status(400).json({message: 'Амжилтгүй боллоо',type: 0});
            }else{
                res.json(req.files);
            }
        })

    }];

/**
 * Хадгалсан зурагнуудын жагсаалт
 * @return json буцаана
 */
exports.list = function (req, res) {
    req.pg.query('select id,created_date,\"image\",\"store_image\",\"thumb\" from file_manager', function (err, result) {
        if (!err) {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
res.status(400).json({message: 'File олдсонгүй',type: 0 });
            }
        } else {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });
};

/**
 * Бааз дээрээс файлуудыг устгах
 * @param id
 * @return json буцаана
 */
exports.delete = function (req, res) {
    req.pg.query('DELETE FROM file_manager WHERE static=1 and id=' + req.param('id'), function (err) {
        if (!err) {
            res.json({message: 'Амжилттай устгагдлаа',type: 1});
        } else {
            return res.status(400).json({message: 'Амжилтгүй боллоо',type: 0});
        }
    });
};

