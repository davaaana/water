'use strict';

/**
 * Module dependencies.
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'davaana0210@gmail.com',
        pass: '88164977'
    }
});

exports.index = function (req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};

exports.visitors = function (req, res, next) {
    next();
};

exports.getUsers = function (req, res, next) {
    req.pg.query("SELECT * FROM \"user\"", function (err, result) {
        res.status(200).json(result.rows);
    });
};

exports.chartContent = function (req, res, next) {
    req.pg.query("select count(id) as y,category_id as name from content group by category_id", function (err, result) {
        res.status(200).json(result.rows);
    });
};

exports.lastContents = function (req, res, next) {
    req.pg.query("select id, title, content, image, created_date, \"user\", category_id FROM content WHERE category_id in (SELECT id FROM category WHERE id != 39 AND id != 40) order by created_date desc limit 5", function (err, result) {
        if (err) {
            console.log(err);
            res.status(200).json({message: 'Бааз дээр алдаа гарлаа'});
        } else {
            return res.status(200).json(result.rows);
        }
    });
};

exports.chartUser = function (req, res, next) {
    req.pg.query("select count(id) as y,\"user\" as name from content group by name", function (err, result) {
        res.status(200).json(result.rows);
    });
};

exports.generateCaptcha = function (req, res) {
    var captcha = require('node-svgcaptcha');
    var options = {
        values: '1234567890',
        length: 5
    };
    var genCaptcha = captcha(options);

    if (req.session) {
        req.session.captcha = genCaptcha.captchaValue;
    }

    //return svg to render in the browser
    res.set('Content-Type', 'image/svg+xml');
    res.send(genCaptcha.svg);
};

exports.checkCaptcha = function (req, res) {
    if (!req.params.text || !req.params.text) {
        return res.status(400).json({message: 'Өгөгдөл буруу байна', type: 0});
    }

    if (req.session) {
        console.log(req.session.captcha + "=" + req.params.text);
        if (req.session.captcha == req.params.text) {
            return res.status(200).json({message: 'Зурган код зөв байна', success: 1});
        } else {
            return res.status(400).json({message: 'Зурган код буруу байна', success: 0});
        }
    } else {
        return res.status(400).json({message: "Системд алдаа гарлаа. Session идэвхгүй байна.", success: 0});
    }
};

exports.feedback = function (req, res) {
    console.log(req.body);
    if (req.session) {
        if (req.session.captcha == req.body.captcha) {
            req.pg.query("INSERT INTO feed(name, email, phone, description,ip) VALUES ($1, $2, $3, $4, $5)", [req.body.name, req.body.email || '', req.body.phone || '', req.body.description, req.connection.remoteAddress], function (err, result) {
                if (!err) {
                    return res.status(200).json({message: 'Амжилттай илгээгдлээ'});
                } else {
                    console.log(err);
                    return res.status(200).json({message: 'Амжилтгүй боллоо'});
                }

            });
        } else {
            return res.status(201).json({message: 'Зурган код буруу байна', success: 0});
        }
    } else {
        return res.status(201).json({message: "Системд алдаа гарлаа. Session идэвхгүй байна.", success: 0});
    }
};

exports.getFeedbacks = function (req, res) {
    req.pg.query("SELECT * FROM feed", function (err, result) {
        if (!err) {
            return res.status(200).json(result.rows);
        } else {
            console.log(err);
            return res.status(200).json({message: 'Гарах мэдээлэл алга байна'});
        }
    });
};

exports.sentFeed = function (req, res) {
    var mailOptions = {
        from: 'Ус хангамж,ариун цэвэрийн байгууламжийн мэдээллийн сан <davaana0210@gmail.com>' , // sender address
        to: req.body.email, // list of receivers req.body.email
        subject: 'Таны асуултын хариулт', // Subject line
        text: 'Таны асуултын хариулт', // plaintext body
        html: '<b>Таны асуулт: </b>' + req.body.question + '<br><br><b>Хариулт: </b>' + req.body.answer +
        '<br><br>' +
        'Утас: +976 99999999<br>' +
        'И-майл: <br>'
        // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //res.status(400).json({message: error, type: 0});
            res.status(400).json({message:'Имэйл илгээхэд алдаа гарлаа'});
        } else {
            req.pg.query("UPDATE feed SET res = true,res_description = $1 WHERE id = $2",[req.body.answer,req.body.id], function (err, result) {
                if(err){
                    console.log(err);
                    return res.status(400).json({message:'Мэдээллийг шинэчлэхэд алдаа гарлаа'})
                }else{
                    return res.status(200).json({message:'Амжилттай илгээгдлээ'})
                }
            });

        }
    });
}
