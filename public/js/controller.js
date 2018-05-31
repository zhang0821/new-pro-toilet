var toilet_data=[{
	location_title:'九号楼二楼东侧',
	style:{
		"top":"100px",
		"left":"30px",
		"background":"green";
	},
	detection:{
			"temp":
			{
				name:"温度",
				manValue:"18℃",
				womanValue:"19℃"
			},
			"humi":
			{
				name:"湿度",
				manValue:"60%Rh",
				womanValue:"60%Rh"
			},
			"h2s":
			{
				name:"硫化氢",
				manValue:"0.3mg",
				womanValue:"0.2mg"
			},
			"nh4":
			{
				name:"氨气",
				manValue:"0.1mg",
				womanValue:"0.5mg"
			},
			"number":
			{
				name:"流量",
				manValue:"100",
				womanValue:"200"
			}
	},
	// posx:'100px',
	// top:'30px',
	id:'node0',
	name:'9_2_东',
	location:"九号楼二楼东侧",
	woman:[{
			name:'女1',
			type:'0'
		},{
			name:'女2',
			type:'2'
		},{
			name:'女3',
			type:'1'
		}],
	man:[{
			name:'男1',
			type:'0'
		},{
			name:'男2',
			type:'2'
		},{
			name:'男3',
			type:'1'
		},{
			name:'男4',
			type:'1'
		}]
	},{
	location_title:'九号楼二楼西侧',
	style:{
		"top":"400px",
		"left":"100px",
		"background":"yellow";
	},
	detection:{
			"temp":
			{
				name:"温度",
				manValue:"1℃",
				womanValue:"19℃"
			},
			"humi":
			{
				name:"湿度",
				manValue:"6%Rh",
				womanValue:"6%Rh"
			},
			"h2s":
			{
				name:"硫化氢",
				manValue:"0.03mg",
				womanValue:"0.02mg"
			},
			"nh4":
			{
				name:"氨气",
				manValue:"0.01mg",
				womanValue:"0.05mg"
			},
			"number":
			{
				name:"流量",
				manValue:"10",
				womanValue:"20"
			}
		},
	// posx:'400px',
	// top:'100px',
	id:'node1',
	name:'9_2_西',
	location:"九号楼二楼西侧",
	woman:[{
			name:'女x1',
			type:'0'
		},{
			name:'女x2',
			type:'2'
		},{
			name:'女x3',
			type:'1'
		},{
			name:'女x4',
			type:'1'
		},{
			name:'女x5',
			type:'1'
		}],
	man:[{
			name:'男x1',
			type:'0'
		},{
			name:'男x2',
			type:'2'
		},{
			name:'男x3',
			type:'1'
		},{
			name:'男x4',
			type:'1'
		},{
			name:'男x5',
			type:'0'
		},{
			name:'男x6',
			type:'2'
		},{
			name:'男x7',
			type:'1'
		},{
			name:'男x8',
			type:'1'
		}]
	}
]

var app=angular.module("toilet",[]);

app.controller('parentCtrl', ['$scope', function($scope){
	$scope.$on("childChangeNameId",function(event,msg){
		console.log("parent,msg"+msg);
		$scope.$broadcast("ctrlNameIdChangeFromParent", msg);
	});
	
}]);

app.controller("info_show",function($scope){
	$scope.$on("ctrlNameIdChangeFromParent",function (event, msg) {
        console.log("Ctr_info_show:", msg);
        $scope.location_title=toilet_data[msg].location_title;
		$scope.man=toilet_data[msg].man;
		$scope.woman=toilet_data[msg].woman;
		$scope.detection=toilet_data[msg].detection;
     });
});
app.controller("map_node",function($scope){
	$scope.nodes=toilet_data;
	$scope.node_click=function($event){

		console.log("点击函数"+$event.target.id);
		let id_name=$event.target.id;
		// choice_id=parseInt(name);//如果字符串前面有非数字字符，此法不能取出数字
		id_name=parseInt(id_name.replace(/[^0-9]/ig,""));//取出数字部分

		console.log("要传递给父控制器的改变的值是"+id_name);
		$scope.$emit("childChangeNameId", id_name);

		var target=document.getElementById("detial");
		target.style.cssText='display:block;z-index:10;';
	}
});