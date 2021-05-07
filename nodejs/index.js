var express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const dao = require('./DAO');
const con = new dao()

console.log(process.env.HOST)
var app = express()
const port = 80

app.use(express.json())
app.use(cors())

app.get('/', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.post('/login', cors(), (req, res) =>{
    con.checkLogin(req.body.id, (result)=>{res.json(result)});
})

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 80')
})