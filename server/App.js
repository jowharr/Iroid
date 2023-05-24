const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Router = require('./routes/MainRouter')

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use('/', Router)

app.listen(8000,() => {
    console.log("server starts at http://localhost:8000");
})

