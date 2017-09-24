"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/login", function(req, res) {
      res.redirect("/")
  });

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

// this is a get action which gets information of the tweets when someone requests for the
// home page
//this checks to see if there is an error, if there isn't it responds with the tweets
// organized as a JSON file

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

// this is a post router which only activates when a user has submitted something in our form
// (the tweeter form)
// this checks to see if there is actually anything entered in the tweet if there is
// it geneterates a random user and it's information as well as the current time

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

  // this checks for errors if none it will send an ok form and returns
  // whatever has been generated in tweetsroutes, it saves it to the db with datahelpers.

};
