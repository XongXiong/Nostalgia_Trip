var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
const lmgtfy = require('lmgtfy');

router.get('/:postName', function (req, res) {
    console.log('post /post route');
    // console.log('req.params = ', req.params.postName);
    var postName = req.params.postName;
    var searchResult = lmgtfy(postName);
    res.send(searchResult);
});

router.post('/add', function (req, res) {
    console.log('post /post/add route');
    console.log(req.body);
    var post = req.body;
    console.log('this is req.body', post);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting to DB');
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO posts ("postname", "postdesc", "postpic", "id", "username") VALUES ($1, $2, $3, $4, $5);';
            db.query(queryText, [post.postname, post.postdesc, post.postpic, post.id, post.username], function (errorQueryingDb, result) {
                done();
                if (errorQueryingDb) {
                    console.log('Error in POST route querying database with');
                    console.log(queryText, errorQueryingDb);
                    res.sendStatus(500);
                } else {
                    console.log('New Post added');
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.put('/:p_id', function (req, res) {
    var postId = req.params.p_id;
    var newVote = req.body.voteCount;
    console.log('this is the new vote', newVote);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'UPDATE "posts" SET "votes" = $1 WHERE "p_id" = $2;';
            db.query(queryText, [newVote, postId], function (errorMakingQuery, result) {
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

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'SELECT * FROM "posts" ORDER BY "p_id"';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
})

router.get('/user/:username', function (req, res) {
    var username = req.params.username;
    console.log(username);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'SELECT p.postname, p.postdesc, p.postpic, p.votes, u.firstname, u.lastname, u.bio, u.profilepic, u.username, p.p_id FROM "users" u JOIN "posts" p ON u."username" = p."username" WHERE u."username" = $1 ORDER BY "p_id";';
            db.query(queryText, [username], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
})

router.put('/edit/:p_id', function (req, res) {
    var postId = req.params.p_id;
    var postname = req.body.postname;
    var postdesc = req.body.postdesc;
    var postpic = req.body.postpic;

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'UPDATE "posts" SET "postname" = $1, "postdesc" = $2, "postpic" = $3 WHERE "p_id" = $4;';
            db.query(queryText, [postname, postdesc, postpic, postId], function (errorMakingQuery, result) {
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

router.delete('/:p_id', function (req, res) {
    var postId = req.params.p_id;
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'DELETE FROM "posts" WHERE "p_id" = $1';
            db.query(queryText, [postId], function (errorMakingQuery, result) {
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