var express = require('express');
var router = express.Router();
const lmgtfy = require('lmgtfy');

router.post('/', function (req, res) {
    console.log('post /post route');
    console.log(req.body);
    let postName = req.body.name;
    let searchResult = lmgtfy(postName);
    res.send(searchResult);
});

router.post('/add', function(req, res) {
    console.log('post /post/add route');
    console.log(req.body);
})

module.exports = router;