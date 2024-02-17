var express = require('express');
var router = express.Router();

//* imported controllers

const authemtication = require('../controller/authentication')
const departments = require('../controller/departments')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// * authentication

router.get('/employees', authemtication.employees)

module.exports = router;

//* departments 

router.get('/departments', departments.departments)


