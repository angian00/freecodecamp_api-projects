'use strict';

var path = process.cwd();
var TsMicroservice = require(path + '/app/controllers/ts-ms.server.js');

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/ts-ms')
		.get(function (req, res) {
			res.sendFile(path + '/public/ts-ms.html');
		});

	app.route('/ts-ms/api/:reqStr')
		.get(function (req, res) {
			new TsMicroservice().getTs(req, res);
		});

};
