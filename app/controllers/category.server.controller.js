'use strict';

exports.getCategories = function(req, res) {
    req.pg.query("SELECT * FROM category", function (err, result) {
        if(err){
            return res.status(400).json({message:'Бааз дээр алдаа гарлаа'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }

    });
};

exports.getCategory = function(req, res, next) {
    req.pg.query("SELECT * FROM category WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'Бааз дээр алдаа гарлаа'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'Харуулах өгөгдөл алга байна'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.deleteCategory = function(req, res, next) {
    req.pg.query("DELETE FROM category WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            console.log(err);
            return res.status(400).json({message:'Бааз дээр алдаа гарлаа'});
        }else{
            return res.status(200).json({message:'Амжилттай устгагдлаа'});
        }
    });
};

exports.saveCategory = function(req, res, next) {
    var body = "INSERT INTO category(name) VALUES ($1)";
    req.pg.query(body,[req.body.name], function (err, result) {
        if(err){
            return res.status(400).json({message:'Бааз дээр алдаа гарлаа'});
        }else{
            return res.status(200).json({message:'Амжилттай хадгаллаа'});
        }
    });
};

exports.updateCategory = function(req, res, next) {
    var body = "UPDATE category SET name=$1 WHERE id = $2";
    req.pg.query(body,[req.body.name,req.body.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'Бааз дээр алдаа гарлаа'});
        }else{
            return res.status(200).json({message:'Амжилттай хадгаллаа'});
        }
    });
};
