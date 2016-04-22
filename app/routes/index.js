'use strict';

var bodyParser = require("body-parser")
var bp = bodyParser();

var path = process.cwd();

var getTs = require(path + '/app/controllers/ts-ms.server.js');
var reqHeaderParser = require(path + '/app/controllers/request-header-parser.server.js');
var urlShortener = require(path + '/app/controllers/url-shortener.server.js');

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
			getTs(req, res);
		});

	app.route('/request-header-parser')
		.get(function (req, res) {
			res.sendFile(path + '/public/request-header-parser.html');
		});

	app.route('/request-header-parser/api')
		.get(function (req, res) {
			reqHeaderParser(req, res);
		});


	app.route('/url-shortener')
		.get(function (req, res) {
			res.sendFile(path + '/public/url-shortener.html');
		});

	//maps HTTP verb semantics on different operations
	app.route('/url-shortener/api')
		.post(bp, function (req, res) {
			urlShortener.createShortcut(req, res);
		});

	app.route('/url-shortener/api/:shortUrl')
		.get(function (req, res) {
			urlShortener.retrieveShortcut(req, res);
		});

};
