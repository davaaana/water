'use strict';

/**
 * Created by Javkhaa on 1/30/2015.
 */
var _ = require('underscore');

var TYPE_USER = 'user';
var TYPE_SYSTEM = 'system';
var TYPE_OPERATOR = 'operator';
var c_users = [];
var w_users = [];

function d_w_u(id){
    for(var i=0; i < w_users.length; i++) {
        if (!!w_users[i].cid && w_users[i].cid == id) {
            w_users.splice(i, 1);
            return true;
        }
    }
    return false;
}

module.exports = function (client) {
    return function (socket) {
        var that = this;
        c_users[socket.id] = {};
        socket.on('initialize', function (e) {
            client.execute('select login_name from account where login_name = ?', [e.n], {prepare: true}, function (err, result) {
                if (err) {
                    return;
                } else {
                    if (result.rows.length === 0 && e.n.search('O.Operator') < 0) {
                            return;
                    }
                }

                c_users[socket.id].s = socket;
                c_users[socket.id].n = e.n || ('Anonymous' + Math.floor(Math.random() * 100));
                c_users[socket.id].c = [];
                c_users[socket.id].t = e.t || ('Anonymous' + Math.floor(Math.random() * 100));

                if (e.t == TYPE_USER) {
                    w_users.push({cid: socket.id, n: c_users[socket.id].n});
                    that.to('o').emit('waiting users', w_users);
                }
                else {
                    //check o
                    socket.join('o');
                    socket.emit('waiting users', w_users);
                }

                socket.on('msg send', function (e) {
                    if (!e.m) {return;}
                    if (!e.cid) {return;}

                    var data1 = {cid: e.cid, m: e.m, d: Date.now(), n: c_users[socket.id].n};
                    var data2 = {cid: socket.id, m: e.m, d: Date.now(), n: c_users[socket.id].n};

                    if (!!c_users[socket.id]) {
                        if (c_users[socket.id].t == TYPE_USER) {
                            c_users[socket.id].s.emit('msg received', data2);
                        }
                        else {
                            c_users[socket.id].s.emit('msg received', data1);
                        }
                    }
                    if (!!c_users[e.cid]) {c_users[e.cid].s.emit('msg received', data2);}
                });

                socket.on('tunnel', function (cid) {
                    if (!cid) {return;}
                    c_users[cid].s.join(socket.id);
                    c_users[cid].s.emit('o connected', {cid: socket.id, n: c_users[socket.id].n || ''});
                    d_w_u(cid);
                    that.to('o').emit('waiting users', w_users);
                });

                socket.on('typing', function (cid) {
                    if (!!c_users[cid] && !!c_users[cid].s) {c_users[cid].s.emit('typing', socket.id);}
                });

                socket.on('stop typing', function (cid) {
                    if (!!c_users[cid] && !!c_users[cid].s) {c_users[cid].s.emit('stop typing', socket.id);}
                });

                socket.on('o disconnected', function () {
                    w_users.push({cid: socket.id, n: c_users[socket.id].n});
                    that.to('o').emit('waiting users', w_users);
                });

                socket.on('disconnect', function () {
                    if (c_users[socket.id].t == TYPE_USER) {
                        d_w_u(socket.id);
                        that.to('o').emit('waiting users', w_users);
                        that.to('o').emit('user logout', socket.id);
                    }
                    else if (c_users[socket.id].t == TYPE_OPERATOR) {
                        that.to(socket.id).emit('o disconnected');
                    }
                    delete c_users[socket.id];
                });
            });
        });
    };
};
