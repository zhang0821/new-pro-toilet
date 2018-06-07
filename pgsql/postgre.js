const pg=require('pg');
var config=require("../config.json");
var myPromise = require('bluebird');

var Q=require('q');
//var constr="postgres://postgres:dbpassword@localhost:5432/loraserver";
 var constr="postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;

const client=new pg.Client(constr);
client.connect(function(err){
    if (err){
        console.error("\tUnable to connect");
        process.exit(1);
    }
    else{
    	console.log("connect success");
    }
});

var queryDB=function(str)
{
    var defferDB=Q.defer();
    client.query(str,function(error, results, fields){
        if(!error && results){
            defferDB.resolve(results);//同步中执行for循环会报错
        }
        if (error){  
            console.log('GetData Error: ' + error.message),  
            client.end();  
            defferDB.reject(error);
        }  
    });
    return defferDB.promise;
}


var insertDB=function(tbname,condition,values)
{
    var defferDB=Q.defer();
console.log("进入插入函数时的几个变量："+tbname+"/"+condition+"/"+values);

    //client.query("update smoke_para set res =$1  where dev_eui = $2 ",[values,condition],function(error, results, fields){
client.query("update smoke_para set res ="+values+"where dev_eui = "+condition,function(error, results, fields){
        if(!error && results){
            if(!results){
                results=1;
            }
            defferDB.resolve(results);//同步中执行for循环会报错
            console.log("插入操作结果"+results.rows.length);
        }
        if (error){  
            console.log('GetData Error: ' + error.message),  
            client.end();  
            defferDB.reject(error);
        }  
    });
    return defferDB.promise;
}

var main={
    getQueryResult:function(str,callback){
        queryDB(str).then(function(results){
            callback(results);
        }).catch(function(err){
            console.log('错误'+err);
        });
    },
    getInserResult:function(tbname,condition,values,callback){
        insertDB(tbname,condition,values).then(function(results){
            callback(results);
        }).catch(function(err){
            console.log("错误"+err);
        })
    }
};
module.exports=main;
