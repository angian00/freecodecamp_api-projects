'use strict';

var useragent = require('useragent')

module.exports = function (req, res) {
	//console.log(req.headers)
	
	var osStr = useragent.parse(req.headers["user-agent"]).os.toString();
	
	var resObj = { ip: req.ip, language: req.headers["accept-language"], os:  osStr}
	res.json(resObj)
};
