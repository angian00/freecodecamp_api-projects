'use strict';

var MAX_RESULTS = 10;

var https = require("https")

var LATEST_SIZE = 10;
var latestQueries = [];


module.exports = {
	search: function (req, res) {
	
		updateLatestQueries(req.params.keyword)
		
		var apiKey = process.env.IMAGESEARCH_GOOGLE_API_KEY
		var apiCx = process.env.IMAGESEARCH_GOOGLE_CSE_CX

		var baseUrl = "https://www.googleapis.com/customsearch/v1"


		var fullUrl = baseUrl + "?";
		fullUrl += "q=" + req.params.keyword + "&";
		fullUrl += "num=" + MAX_RESULTS + "&";
		if (req.query.offset)
			fullUrl += "start=" + req.query.offset + "&";
		fullUrl += "searchType=image" + "&";
		fullUrl += "key=" + apiKey + "&";
		fullUrl += "cx=" + apiCx + "&";
	
		console.log(fullUrl)
		https.request(fullUrl, function(response) {
			var str = '';
			
			response.on('data', function (chunk) {
				str += chunk;
			});
			
			response.on('end', function () {
				parseGoogleApiResponse(str, res);
			});
		}).end();
	},
	
	latest: function(req, res) {
		res.json(latestQueries)
	}
	
};


function updateLatestQueries(query) {
	//newest first
	latestQueries.unshift({query: query, ts: new Date()})
	
	if (latestQueries.length > LATEST_SIZE)
		latestQueries.pop()
}
	
function parseGoogleApiResponse (jsonStr, res) {
	var resultObj = []
	//console.log(jsonStr)
	var googleRespData = JSON.parse(jsonStr)
	if (googleRespData.error) {
		res.json(googleRespData)
	} else {
		for (var i=0; i < googleRespData.items.length; i++) {
			var dataItem = googleRespData.items[i]
	
			//console.log(dataItem.title, dataItem.link, dataItem.image.contextLink)
			resultObj.push({imageUrl: dataItem.link, altText: dataItem.title, pageUrl: dataItem.image.contextLink})
		}

		res.json(resultObj)
	}
}
