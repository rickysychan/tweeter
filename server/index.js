"use strict";

// Basic express setup:

const bodyParser     = require("body-parser");
const express        = require("express");
const app            = express();
const PORT           = 8080;
const sassMiddleware = require('node-sass-middleware')
const path           = require('path');
const bcrypt         = require('bcrypt');
const cookieSession  = require('cookie-session')
const cookieParser   = require('cookie-parser')

app.use(cookieSession({
  name: 'session',
  keys: ["pepsicola"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(sassMiddleware({
  src: path.join( __dirname, '..', 'public' ,'styles'),
  dest: path.join(__dirname, '..', 'public', 'styles'),
  debug: true,
  outputStyle: 'expanded',
  prefix: '/styles'
}));

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  // The in-memory database of tweets. It's a basic object with an array in it.

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const userRoutes   = require("./routes/users")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  app.use("/users", userRoutes);

  app.listen(PORT, () => {
    console.log("Tweeter app listening on port " + PORT);
  });
});
