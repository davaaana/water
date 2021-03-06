'use strict';

var roles = require('../../app/models/config.js');
var config = require('../../config/config.js');
var multer = require('multer');

exports.getContents = function (req, res) {

    var query = 'SELECT * FROM content';

    if (req.query.categoryName) {
        query += ' WHERE category_id = (SELECT id FROM category WHERE name = \''+req.query.categoryName+'\')';
    }

    if (req.query.page && req.query.pageSize) {
        query += ' ORDER BY created_date DESC OFFSET ' + (req.query.page * req.query.pageSize) + ' LIMIT ' + req.query.pageSize;
    }

    var data = {};
    req.pg.query(query, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гралаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах өгөгдөл алга байна'});
            } else {
                data.data = result.rows;
                req.pg.query('SELECT count(id) as count FROM content', function (err, resu) {
                    data.count = resu.rows[0].count;
                    return res.status(200).json(data);
                })
            }
        }
    });
};

exports.getContentSearch = function (req, res) {

    var query = 'SELECT * FROM content';

    if (req.query.search) {
        query += ' WHERE LOWER(content) LIKE LOWER(\'%' + req.query.search + '%\') OR LOWER(title) LIKE LOWER(\'%' + req.query.search + '%\') ';
    }

    req.pg.query(query, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гралаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }

    });
};

exports.getSlider = function (req, res) {

    var query = 'SELECT * FROM content WHERE category_id = (SELECT id FROM category WHERE name = \'Слайд\')';

    req.pg.query(query, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гралаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }

    });
};

exports.getContent = function (req, res, next) {
    req.pg.query("SELECT * FROM content WHERE id = $1", [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        } else {
            if (result.rows.length == 0) {
                return res.status(201).json({message: 'Харуулах мэдээлэл алга байна'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.deleteContents = function (req, res, next) {
    req.pg.query("SELECT * FROM content WHERE id = $1", [req.params.id], function (err, rst) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
        }
        if (rst.rows.length > 0) {
            try{
                if(rst.rows[0].image && rst.rows[0].image != '') {
                    var fs = require('fs');
                    fs.exists('./public' + rst.rows[0].image, function (exists) {
                        if (exists) {
                            fs.unlink('./public' + rst.rows[0].image, function (err) {

                            });
                        }
                    });
                }
            }catch(e){};

        } else {
            return res.status(400).json({message: 'Мэдээлэл бааз дээр алга байна'});
        }
    });
    req.pg.query("DELETE FROM content WHERE id = $1", [req.params.id], function (err, result) {
        if (err) {
            return res.status(400).json({message: 'Мэдээлэл устгахад алдаа гарлаа'});
        } else {
            return res.status(200).json({message: 'Амжилттай устгалаа'});
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
    }), function (req, res, next) {
        var content = config.convertToJson(req.body.content);
        var imgPath = '';
        if (req.files.file) {
            imgPath = '/img/' + req.files.file.name;
        }

        var params = [content.title, content.content, imgPath, new Date(), req.user.username, content.category_id];
        var body = "INSERT INTO content(title, content, image, created_date, \"user\", category_id) VALUES ($1, $2, $3, $4, $5, $6);";
        req.pg.query(body, params, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
            } else {
                return res.status(200).json({message: 'Амжилттай хадгаллаа'});
            }
        });
    }];

exports.updateContent = [
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
    }), function (req, res, next) {
        var content = config.convertToJson(req.body.content);
        req.pg.query("SELECT * FROM content WHERE id = $1", [req.params.id], function (err, rst) {
            if (err) {
                console.log(err);
                return res.status(400).json({message: 'Бааз дээр алдаа гарлаа'});
            }
            try{
                if (rst.rows.length > 0 && req.files.file.name) {
                    var fs = require('fs');
                    fs.exists('./public' + rst.rows[0].image, function (exists) {
                        console.log(exists);
                        if (exists) {
                            fs.unlink('./public' + rst.rows[0].image, function (err) {

                            });
                        }
                    });
                } else {
                    return res.status(400).json({message: 'Мэдээлэл бааз дээр алга байна'});
                }
            }
            catch (e){}
        })
        var imgPath;
        try{
            imgPath = '/img/' + req.files.file.name;
        }catch (e){imgPath = ''}

        var params = [content.title, content.content, imgPath, new Date(), req.user.username, content.category_id, req.params.id];
        var body = "UPDATE content SET title=$1, content=$2, image=$3, created_date=$4, \"user\"=$5,  category_id=$6 WHERE id = $7";
        req.pg.query(body, params, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
            } else {
                return res.status(200).json({message: 'Амжилттай хадгаллаа'});
            }
        });
    }];
