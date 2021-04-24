const express = require('express')
const path = require('path')
const fs = require('fs')
const mysql = require('mysql2')
const cors = require('cors')
const moment = require('moment')

var config = require('./config.json')
var app = express()
var PORT = config.PORT
var HOST = config.HOST
var DB_HOST = config.DB_HOST
var DB_PORT = config.DB_USER
var DB_USER = config.DB_USER

var connection = mysql.createConnection({
  host     : "sql4.freemysqlhosting.net",
  user     : `${DB_USER}`,
  password : "SDfeuawb7d",
  database : "sql4407744",
  port 	   : "3306",
});

connection.connect(function(err){
	if(err) {console.log(err)}
	else {console.log(`Connected to database`)}	
})

app.use(cors({
	origin : "http://localhost:3000" || process.env.URL ,
	credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/items', (req, res) =>{
	if(req){
		console.dir(req)
	}
	connection.query("select * from Tab", function(error, result, fields){ 
		if(error) throw error;

		res.send(JSON.stringify(result))
	 })
})
app.post("/search" , (req, res) =>{
	if(req.body){
		console.log(req.body)
		var search = req.body.search
		var query = `select * from Tab where ?`
		connection.query(query [search], (error, data) =>{
			if(error){
				console.log(error.message)
			} else {
				res.send(data)
			}
		})
	}
})
app.post('/remove', (req, res) => {
	const index = req.body.index
	const sql = `delete from Tab where id=` + index;
	connection.query(sql, (error, data)=> {
		if(error){
			console.log(error)
		} else {
			connection.query("select * from Tab", function(error, result, fields){ 
				if(error) throw error;

				res.send(JSON.stringify(result))
	 		})
		}
	})
})

app.post("/create" , (req, res) =>{
	if(req.body){
		console.log(req.body)
			var domain = req.body.domain;
			var amount = req.body.amount;
			var distance = req.body.distance;
			var date = req.body.date;
			var regDate = moment(Date.now()).format('MM/DD/YYYY')
			var query = `INSERT INTO Tab(domain, amount, distance, date, reg_date)
			 			 VALUES(?,?,?,?,?)`;			  			 
			connection.query(query, [domain, amount, distance, date, regDate],
				(error, data) =>{
					if(error){
						console.log(error.message)
					} else {
						connection.query("select * from Tab", function(error, result, fields){ 
							if(error) throw error;
							res.send(JSON.stringify(result))
	 					})
					}
			})

		}
})
app.listen(PORT, console.log(`APP on port : ${PORT}`));