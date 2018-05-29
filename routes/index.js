/* 
var express = require('express');
var router = express.Router();

GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
 */
var path=require('path');
exports.index=function (req,res) {
	var html=path.normalize(__dirname+'/../views/index_s.html');
	res.sendfile(html);
};