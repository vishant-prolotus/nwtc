var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var sess;

var con = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'vishant@123',
  database: 'nwtc_dev_db'
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/embark'));
app.set('views',path.join(__dirname, '/../nwtc.aditya.dapp'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'BlockchainSecretKey',
  name: 'MySession',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.post('/login', (req, res) => {
  var sql = 'SELECT password FROM users WHERE email = ?'
  
  global.con.query(sql,[req.body.email],function(err,result) {
    if(err) return res.send(err);

    if(result.length > 0) {
      if(req.body.password == result[0].password) {

        req.session.name = req.body.email;
        req.session.email = req.body.password;
        sess = req.session;

        return res.json({status:200,res:result});

      }else{
        return res.json({status:300,res:result});
      }
    }else{
      return res.json({status:300,res:result});
    }
  });
});

app.get('/dappp', (req, res) => {
  if(!req.session.email || !req.session.name){
    res.render('./views/login');
  }else{
    if(req.session.email == sess.email && req.session.name == sess.name ) {
      res.render('./embark/index');
    }else{
      res.render('./views/login');
    }
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });
});

app.get('*', (req, res) => {
  res.render('./views/login');
});

app.listen(3216, () => {
   con.connect(function(err) {
     if(err) return console.log(err);
     global.con = con;
    console.log('App Started at Port:3216');
   });
});

module.exports = app;
