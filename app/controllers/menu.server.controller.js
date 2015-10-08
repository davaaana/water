'use strict';

exports.getMenus = function(req, res) {
    req.pg.query("SELECT * FROM menu", function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'???????? ??????? ???? ?????'});
            }
            return res.status(200).json(result.rows);
        }

    });
};

exports.getMenu = function(req, res, next) {
    req.pg.query("SELECT * FROM menu WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????'});
        }else{
            if(result.rows.length == 0){
                return res.status(201).json({message:'???????? ??????? ???? ?????'});
            }
            return res.status(200).json(result.rows);
        }
    });
};

exports.deleteMenu = function(req, res, next) {
    req.pg.query("DELETE FROM menu WHERE id = $1",[req.params.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????'});
        }else{
            return res.status(200).json({message:'????????? ??????????'});
        }
    });
};

exports.saveMenu = function(req, res, next) {
        var body = "INSERT INTO menu(name, url) VALUES ( $1, $2)";
        req.pg.query(body,[req.body.name,req.body.url], function (err, result) {
            if(err){
                return res.status(400).json({message:'???? ???? ????? ??????'});
            }else{
                return res.status(200).json({message:'????????? ?????????'});
            }
        });
    };

exports.updateContent = function(req, res, next) {
    var body = "UPDATE menu SET name=$1, url=$2 WHERE id = $3";
    req.pg.query(body,[req.body.name,req.body.url,req.body.id], function (err, result) {
        if(err){
            return res.status(400).json({message:'???? ???? ????? ??????'});
        }else{
            return res.status(200).json({message:'????????? ?????????'});
        }
    });
};