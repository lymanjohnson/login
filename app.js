const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mustache = require('mustache-express');
const data = require('./data.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');

app.engine('mustache', mustache());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.set('trust proxy', 1)
app.use(session({secret:'so-many-secrets',cookie:{maxAge:600000,httpOnly:false}}));

app.get('/', function (req, res) {
  console.log(data);
  console.log(data.users);
  res.render('index', {"users":data.users})
})

app.post('/', function (req,res) {
  authorize(req,res);
  if (res.authenticated) {
    res.render('index',{authenticated:res.authenticated, user:req.username})
  }
  else {
    res.render('index',{authError:res.authError});
  }
});


app.listen(port, function () {
	  console.log('Successfully started express application!');
})

function authorize(req,res){
  let username = req.body.username;
  let password = req.body.password;
  for (i=0; i<data.users.length;i++){
    if (data.users[i].username == username){
      console.log("username exists");
      if (data.users[i].password == password) {
        console.log("password is a match!");
        res.authenticated = true;
        return;
      }
      else {
        console.log("wrong password");
        res.authenticated = false;
        res.authError = "wrong password";
        return;
      }
    }
  }
  console.log("no such user");
  res.authenticated = false;
  res.authError = "no such user"
  return;
}
