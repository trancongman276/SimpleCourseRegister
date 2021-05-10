var express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser');

const dotenv = require('dotenv')
dotenv.config()

const sqlconn = require('./SQLConn');
const con = new sqlconn()

console.log(process.env.HOST)
var app = express()
const port = 80

const allowedOrigins = ['http://localhost:3000'];

const options= {
  origin: allowedOrigins,
  credentials: true
};

app.use(express.json())
app.use(cors(options))
app.use(cookieParser())

app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.post('/login', (req, res) =>{
    con.login(req.body.id, (result)=>{
      if (result!=='') {
        res.cookie('id',req.body.id,{expires: new Date(Date.now() + 3600*24*1000)});
      }
      res.send(result);
    });

    console.log("??USer ",res.cookies);
})

app.post('/logout', (req, res)=>{
  console.log("??logout ",req.cookies);
    res.clearCookie('id');
    res.send("success");
})

app.post('/user', (req, res) =>{
  if(req.body.id)
    con.login(req.body.id,(result)=>{res.json(result)});
  else res.send("Error");
})

app.post('/getStudentCourse', (req, res) =>{
  console.log("getStudentCourse: ",req.body.id);
  if(req.body.id)
    con.getStudentCourse(req.body.id, (result)=>{res.json(result)});
  else res.send("Error");
})

app.post('/registerCourse', (req, res) =>{
  if(req.body.id)
    con.registerCourse(req.body.id, req.body.courseId, (result)=>{res.json(result)});
  else res.send("Error");
})

app.post('/dropCourse', (req, res)=>{
  if(req.body.id) 
    con.dropCourse(req.body.id, req.body.courseId, (result)=>{res.json(result)});
  else res.send("Error");
})

app.post('/getAllCourse', (req, res) =>{
  con.getCourseList((result)=>{res.json(result)});
})

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port '+port)
})