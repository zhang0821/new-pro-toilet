
var handleFile=function()
{
	alert("文件文件！")	;
}
function ws(){
	console.log("this is socket.io test");
	var myio=io();
	var socket = myio.connect('ws://localhost:3000');       
      	socket.on('news', function (data) {      
        	console.log(data);  
        	//socket.emit('my other event', 'front to back');  
     	 }); 
	socket.emit('dbInfo', { opStr: 'select * from contact' });
}
ws();