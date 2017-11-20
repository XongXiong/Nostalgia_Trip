let express = require('express');
let router = express.Router();
let pool = require('../modules/pool.js');
const lmgtfy = require('lmgtfy');

router.get('/', function (req, res) {
    console.log('post /post route');
    let postName = req.query.name;
    let searchResult = lmgtfy(postName);
    res.send(searchResult);
});

router.post('/add', function(req, res) {
    console.log('post /post/add route');
    console.log(req.body);
});

router.get('/', function(req, res) {
    console.log(req.body.id);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            let queryText = 'SELECT * FROM "posts" WHERE "id" = $1;';
            db.query(queryText, [req.body.id], function (errorMakingQuery, result) {
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

module.exports = router;