let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../modules/pool.js');
let encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function (req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {

  let saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    profilepic: req.body.profilepic
  };
  console.log('new user:', saveUser);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password, firstname, lastname, bio, profilepic) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.firstName, saveUser.lastName, saveUser.bio, saveUser.profilepic],
      function (err, result) {
        client.end();

        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });

});


module.exports = router;
