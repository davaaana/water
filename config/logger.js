'use strict';

/**
 * Module dependencies.
 */

var morgan = require('morgan');
var config = require('./config');
var fs = require('fs');

/**
 * Module init function.
 */
module.exports = {

	getLogFormat: function() {
		return config.log.format;
	},

	getLogOptions: function() {
		var options = {};
		try {
			if ('stream' in config.log.options) {
                var logDirectory = process.cwd() + '/log';
                fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

                var accessLogStream = require('file-stream-rotator').getStream({
                    filename: logDirectory + '/' + config.log.options.stream,
                    frequency: 'daily',
                    verbose: false,
                    date_format: 'YYYY-MM-DD'
                });

				options = {
					stream: accessLogStream
				};
			}
		} catch (e) {
			options = {};
		}

		return options;
	}

};
