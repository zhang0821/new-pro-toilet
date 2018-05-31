//5.24
var showTime=function()
{
	let getTime=new Date();
	let time={
		year:getTime.getFullYear()+'年',
		month:getTime.getMonth()+1+'月',
		day:getTime.getDate()+'日&nbsp',
		week:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'].slice((getTime.getDay()),(getTime.getDay()+1)),
		hour:(getTime.getHours()<10?'0'+getTime.getHours():getTime.getHours())+':',
		minute:(getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes())+':',
		seconds:(getTime.getSeconds()<10?'0'+getTime.getSeconds():getTime.getSeconds())
	}
	let showTime=time.year+time.month+time.day+time.week+time.hour+time.minute+time.seconds;
	document.getElementById("time").innerHTML=showTime;
	//console.log(showTime);
}
var warnInfo=['hahahahahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'];
var updateWarnInfo=function(info){
	let warnBox=document.getElementById("warnBox");
	let infoBox1=document.getElementById("infoBox1");
	let infoBox2=document.getElementById("infoBox2");
	infoBox1.innerText=info;
	let n=200/infoBox1.offsetWidth;
	for(let i=0;i<n;i++){
		infoBox1.innerHTML+=infoBox1.innerHTML;
	}
	infoBox2.innerHTML=infoBox1.innerHTML;
	let conf={
		speed:'50',
		boxRolling:function(){
			(warnBox.scrollLeft>=infoBox2.offsetLeft)?(warnBox.scrollLeft-=infoBox1.offsetWidth):(warnBox.scrollLeft+=1);
		}
	}
	let timmer=setInterval(conf.boxRolling,conf.speed);
	warnBox.addEventListener('mouseenter',function(){
		clearInterval(timmer);
	});
	warnBox.addEventListener('mouseleave',function(){
		timmer=setInterval(conf.boxRolling,conf.speed);
	});
}





var render_info=function(data){
	var target=document.getElementById("map");
	for(let i=0;i<data.length;i++){
		// var newNode=document.createElement('div');
		// newNode.style.top=data[i].top;
		// newNode.style.left=data[i].posx;
		// newNode.innerText=data[i].name;
		// newNode.setAttribute('id',data[i].id);
		// target.appendChild(newNode);

		let str='<div id="'+data[i].id+'" value="'+data[i].location+'" style="top:'+data[i].top+';left:'+data[i].posx+';" onclick=node_click("'+data[i].id+'")>'+data[i].name+'<div>';
		target.innerHTML+=str;
	}
}
var node_click=function(){
	name='node1';
	console.log("点击函数"+name);
	//choice_id=parseInt(name);//如果字符串前面有非数字字符，此法不能取出数字
	choice_id=parseInt(name.replace(/[^0-9]/ig,""));//取出数字部分
	// document.getElementById("title_left").innerHTML='{{location_title'+name+'}}';
	// document.getElementById("man").innerHTML='<div ng-repeat="node in man'+name+' track by $index"  ng-class="0:"style_empty",1:"style_occupi",2:"style_warn"}[{{node.type}}]"><p>{{node.name}}</p></div>';

	var target=document.getElementById("detial");
	target.style.cssText='display:block;z-index:10;';
}
var close=function() {
	console.log("进入关闭函数");
	var target=document.getElementById("detial");
	target.style.cssText='display:none;z-index:0;';
}
var bind_evt=function(){
	// var btn=document.getElementById("close");
	// btn.addEventListener("onclick",close(),false);
	document.getElementById("close").addEventListener("click", function(){
	    close();
	});
}
function ws(){
	var myio=io();
	var socket = myio.connect('ws://localhost:3000');       
      	socket.on('news', function (data) {      
        		console.log(data);   
     	 }); 
}
ws();
//bind_evt();
//setInterval(showTime,1000);
//updateWarnInfo(warnInfo);