/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/



var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"root",
            database:"snapsell"

        }

        );

        return conn;

    }
}
module.exports=dbConnect;