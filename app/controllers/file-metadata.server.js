'use strict';


module.exports = function (req, res) {
    //console.log(req.file)
    var upFile = req.file
	res.json({origName: upFile.originalname, size: upFile.buffer.length})
};