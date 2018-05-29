var path=require('path');
exports.monitor=function (req,res) {
	var html=path.normalize(__dirname+'/../views/monitor.html');
	res.sendfile(html);
};
