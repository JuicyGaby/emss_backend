var express = require('express');
var router = express.Router();

//* imported controllers

const authentication = require('../controller/authentication')
const departments = require('../controller/departments')
const patients = require('../controller/patients')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// * authentication

// router.get('/employees', authentication.employees)
router.post('/login', authentication.login)
router.get('/userByToken', authentication.userByToken)

module.exports = router;

//* departments 

router.get('/departments', departments.departments)


// * patients

router.get('/patients', patients.getPatients)
router.post('/patients', patients.createPatient)
