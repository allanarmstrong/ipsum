var express = require('express');
var router = express.Router();
var generate = require('../controllers/');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate', generate);


module.exports = router;
