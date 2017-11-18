var express = require('express');
var router = express.Router();
const lmgtfy = require('lmgtfy');

router.post('/', function (req, res) {
    console.log('get /post route');
    console.log(req.body);
    let postName = req.body.name;
    let searchResult = lmgtfy(postName);
    res.send(searchResult);
});

module.exports = router;