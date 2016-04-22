'use strict';

var validUrl = require('valid-url');

//in-memory url storage
var long2short = {};
var short2long = {};

module.exports = {
	createShortcut: function (req, res) {
		console.log(req)
		//var origUrl = req.body.originalUrl
		var origUrl = req.param("originalUrl")
		
		if (!validUrl.isWebUri(origUrl)) {
			res.json({ err: "Invalid URL", originalUrl: origUrl })
			console.log("Invalid URL", origUrl)
			return
		}
		
		//has this exact url already been shortened?
		var shortUrl = long2short[origUrl];
		if (!shortUrl) {
			//add it
			shortUrl = Object.keys(long2short).length.toString()
			long2short[origUrl] = shortUrl
			short2long[shortUrl] = origUrl
		}
		
		console.log(req.body.originalUrl, shortUrl);
		res.json({ shortenedUrl: shortUrl })
	},

	retrieveShortcut :function (req, res) {
		var shortUrl = req.params.shortUrl
		var origUrl =  short2long[shortUrl]

		if (origUrl) {
			//build HTTP redirect; not sure about correct 30x code
			res.writeHead(302, {
			  'Location': origUrl
			});
			res.end();

		} else {
			//"Not found" seems fit for the situation
			res.status(404).send('Not found')
		}
}
};


