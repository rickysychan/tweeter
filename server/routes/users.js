"use strict";

const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        = require('bcrypt');
const path          = require('path');
const cookieSession = require('cookie-session')
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser')

usersRoutes.use(bodyParser.urlencoded({extended: true}));

usersRoutes.use(cookieSession({
  name: 'session',
  keys: ["pepsicola"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

module.exports = function(DataHelpers) {

  usersRoutes.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '/public', 'login_page.html'));
  })

  usersRoutes.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '/public', 'register.html'));
  })

  usersRoutes.post("/login", function(req, res) {
    res.redirect("https://stackoverflow.com/questions/11799159/trying-to-align-html-button-at-the-center-of-the-my-page")
  })

  const users = {}

  usersRoutes.post("/register", function(req, res) {
    let result = generateRandomString(4, possibleValues);
    let password = req.body.password;
    let hashedPassword = bcrypt.hashSync(password, 10);
    users[result] = {id: result, email: req.body.email, password: hashedPassword, likes:[]}
    req.session.user_id = result;
    DataHelpers.registerUser(users, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.redirect("/").status(201).send();
      }
    });
  });


const possibleValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateRandomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

  return usersRoutes;
}