const index=require('./index'),
      monitor=require('./monitor');
module.exports=function(app)
{
	app.get('/',index.index);
	app.get('/monitor',monitor.monitor)
}