'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    socket = require('./config/socket.js'),
    pg = require('pg'),
    async = require('async'),
    chalk = require('chalk');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

var conString = "postgres://postgres:postgres@10.0.0.100/water";
//var conString = "postgres://water:water@123@10.2.101.147/water";
var client = new pg.Client(conString);

client.connect(function(err, result) {
   if (err) {
       console.log(result);
       console.log(err);
       process.exit(-1);
   }
});

// Init the express application
var app = require('./config/express')(client);
app.locals.c = 0;

// Bootstrap passport config
require('./config/passport')(client);

// Hook Socket.io into Express
var server = require('http').Server(app);
// Start the app by listening on <port>
server.listen(config.port);

// Expose app
module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
if (process.env.NODE_ENV === 'secure') {
    console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
