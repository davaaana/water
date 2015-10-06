'use strict';

var user_roles = {
    admin:      0,
    consumer:   1,
    merchant:   2,
    operator:   3,
    monitoring: 4
};
var ws_url = 'http://portal.vatps.mta.mn';
var oauth_url = 'http://oauth.vatps.mta.mn';
var pos_url = 'http://pos.vatps.mta.mn';



exports.user_roles = user_roles;

exports.ws_url = ws_url;
exports.oauth_url = oauth_url;
exports.pos_url = pos_url;

exports.convertToJson = function (data) {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        return false;
    }
};
