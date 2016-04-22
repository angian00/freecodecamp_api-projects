'use strict';

var moment = require('moment');

module.exports = function (req, res) {
	var reqStr = req.params.reqStr

	var unixTs
	var dateStr

	var isUnixTs = false
	if (reqStr.match(/\d+/)) {
		unixTs = Number(reqStr)
		if (!isNaN(unixTs))
			isUnixTs = true
	}
	
	if (isUnixTs) {
		console.log("unixTs: ", unixTs)
		dateStr = moment.unix(unixTs).format("MMMM DD, YYYY")
	} else {
		var aDate = moment(reqStr, "MMMM DD, YYYY")
		console.log("date: ", aDate)
		if (aDate && aDate.isValid()) {
			unixTs = aDate.unix()
			dateStr = reqStr
		} else {
			unixTs = null
			dateStr = null
		}
	}
	
	var resObj = { unix: unixTs, natural: dateStr }
	res.json(resObj)
};
