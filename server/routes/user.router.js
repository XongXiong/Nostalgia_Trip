var express = require('express');
var router = express.Router();
let pool = require('../modules/pool.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username,
      id: req.user.id
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.put('/edit/:username', function(req, res) {
  let username = req.params.username;
  let user = req.body;
  console.log(user);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      //added ordering
      let queryText = 'UPDATE "users" SET "firstname" = $1, "lastname" = $2, "profilepic" = $3, "bio" = $4 WHERE "username" = $5;';
      db.query(queryText, [user.firstname, user.lastname, user.profilepic, user.bio, username], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // END QUERY
    }
  }); // END POOL
})

module.exports = router;
