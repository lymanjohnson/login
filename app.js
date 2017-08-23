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

app.get('/', function (req, res) {
  console.log(data);
  console.log(data.users);
  res.render('index', {"users":data.users})
})

app.post('/', function (req,res) {
  console.log(req.body);
  // console.log(req.body.username);
  // console.log(req.body.password);
});


app.listen(port, function () {
	  console.log('Successfully started express application!');
})


function authorize(username,password){
  let check = data.users.find( function(user){
    console.log("running authorize");
    console.log("user:",user);
    if (user.name==username && user.password == password) {
      console.log("user.name",user.name);
      console.log("username",username);
      console.log("user.password",user.password);
      console.log("password",password);
      console.log("it's a match");
      return true;
    }
    else {
      return false;
    }
  });
}
