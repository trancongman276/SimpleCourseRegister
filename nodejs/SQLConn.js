var mysql = require('mysql')

class SqlConn{
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

    login(id, callBack){
        this.conn.query(`call getStudent(${id})`,(err, result) => {
            if(err) throw err;
            return callBack(result[0][0]?.StudentName);
        });
    }

    getStudentCourse(id, callBack){
        this.conn.query(`call getStudentCourse(${id})`,(err, result) => {
            var temp = {};
            result[0].forEach((row)=>{temp[row.CourseID] = {"CourseName": row.CourseName}})
            return callBack(temp);
        });
    }
    
    getCourseList(callBack){
        this.conn.query("call getAllCourses()",(err, result) => {
            if(err) throw err;
            var temp = {};
            result[0].forEach((row)=>{temp[row.CourseID] = {"CourseName": row.CourseName}})
            return callBack(temp);
        });
    }

    registerCourse(id, courseId, callBack){
        this.conn.query(`call registerCourse(${id},${courseId})`,(err, result) => {
            if(err) throw err;
            return callBack("Success");
        });
    }

    dropCourse(id, courseId, callBack){
        this.conn.query(`call dropCourse(${id},${courseId})`,(err, result) => {
            if(err) throw err;
            return callBack("Success");
        });
    }
}

module.exports = SqlConn