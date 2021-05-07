var mysql = require('mysql')

class DAO{
    constructor(){
        this.conn = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        this.conn.connect((err)=>{
            if(err) throw err;
            console.log("DATABASE CONNECTED!");
        });
    }

    checkLogin(id, callBack){
        this.conn.query("SELECT StudentName from student where StudentID = "+id,(err, result) => {
            if(err) throw err;
            return callBack(result);
        });
    }
}

module.exports = DAO