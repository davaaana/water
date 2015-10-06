'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js');
var multer = require('multer');

/**
 * Хэрэглэгчийн мэдээлэлийг өөрчлөх
 * @param email,phone,lastname
 */
exports.update = function (req, res) {
    if (req.user == null) {
        return res.status(403).send({
            message: 'Та хандах эрхгүй байна.'
        });
    }

    var query = 'UPDATE account SET email = ?, firstname = ? , image = ? ,lastname = ?, phone = ?,ispromo = ? where login_name= ?';

    var user = req.body.user || {};

    user.email = req.body.user.email == null ? ' ' : req.body.user.email;
    user.phone = req.body.user.phone == null ? ' ' : req.body.user.phone;
    user.isPromo = req.body.user.isPromo == null ? 0 : Number(req.body.user.isPromo);
    user.lastname = req.body.user.lastname == null ? ' ' : req.body.user.lastname;
    user.token = req.user.token;


    if (!user.email || !user.firstname || !user.lastname || !user.phone) {
        return res.status(400).json({message: 'Мэдээллээ буруу оруулсан байна.', type: 0});
    }

    var params = [
        user.email,
        user.firstname,
        user.image,
        user.lastname,
        user.phone,
        user.isPromo,
        user.id
    ];

    req.cassandra.execute(query, params, {prepare: true}, function (err) {
        if (!err) {
            req.login(user,function(err){
                if(err){
                    res.status(400).send(err);
                } else{
                    return res.json({message: 'Амжилттай хадгаллаа', type: 1});
                }
            });

        } else {
            return res.status(400).json({message: 'Алдаа гарлаа', type: 0});
        }
    });


};

/**
 * Хэрэглэгчийн зургыг өөрчлөх
 * @param file
 * @return json
 */
exports.imageChange = [
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
    }), function (req, res) {
        if (req.user == null) {
            return res.status(403).send({
                message: 'Та хандах эрхгүй байна.',
                type:0
            });
        }
        try {
            req.cassandra.execute('SELECT image FROM account WHERE login_name = ?', [req.user.id], {prepare: true}, function (err, rst) {
                if (err) {
                    return res.status(400).json({message:'Хэрэглэгчийн мэдээлэл бааз дээр алга байна',type:0});
                }
                if (rst.rows.length > 0) {
                    var fs = require('fs');
                    fs.exists('./public' + rst.rows[0].image, function (exists) {
                        if (exists) {
                            fs.unlink('./public' + rst.rows[0].image);
                        }
                    });
                } else {
                    return res.status(400).json({message:'Хэрэглэгчийн мэдээлэл бааз дээр алга байна',type:0});
                }
            });
            var imgPath = '/img/' + req.files.data.name;
            var query = 'UPDATE account SET image = ?  where login_name= ?';
            req.cassandra.execute(query, [imgPath, req.user.id], {prepare: true}, function (err) {
                if (!err) {
                    return res.status(200).json({message:'Зургийн мэдээлэлийг амжилттай хадгалалаа',type:1});
                } else {
                    return res.status(400).json({message: 'Зургийг хадгалж чадсангүй та дахин оролдоно уу?', type: 0});
                }
            });
        } catch (e) {
            return res.status(500).json({message: 'Алдаа гарлаа', type: 0});
        }
    }
]

/**
 * Нэвтэрч орсон хэрэглэгчийн зургийг харуулах
 * @return json
 */
exports.getImage = function (req, res) {
    if (req.user == null || (req.user.id == undefined)) {
        return res.status(403).send({
            message: 'Та хандах эрхгүй байна.'
        });
    }

    req.cassandra.execute('SELECT image FROM account WHERE login_name = ?', [req.user.id], {prepare: true}, function (err, result) {
        if (!err) {
            if (result.rows.length > 0) {
                var fs = require('fs');
                fs.exists('./public' + result.rows[0].image, function (exists) {
                    if (!exists) {
                        result.rows[0].image = '/img/avatar.png';
                    }
                    return res.json(result.rows[0]);
                });
            } else {
                return res.json({image: 'img/avatar.png'});
            }
        } else {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    if (req.user == null || (req.user.id == undefined)) {
        return res.status(403).send({
            message: 'Та хандах эрхгүй байна.'
        });
    }

    req.cassandra.execute('SELECT * FROM account WHERE login_name = ?', [req.user.id], {prepare: true}, function (err, user) {
        if (err) {
            res.json(req.user);
        }
        else {
            if (user.rows.length ==0) {
                res.json(req.user);
            }
            user = user.rows[0];

            var a = {
                id : user.login_name,
                accType : user.type,
                firstname : user.firstname,
                lastname : user.lastname,
                token : req.user.token,
                isPromo : user.ispromo,
                email : user.email,
                phone : user.phone,
                image : user.image
            };
        }
    });
};
