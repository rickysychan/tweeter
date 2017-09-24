"use strict";

const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        = require('bcrypt');
const path           = require('path');

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

  return usersRoutes;
}