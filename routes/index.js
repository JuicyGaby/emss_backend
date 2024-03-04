var express = require('express');
var router = express.Router();

//* imported controllers

const authentication = require('../controller/authentication')
const patients = require('../controller/patients')
const assessmentTool = require('../controller/assesment-tool')
const employees = require('../controller/employees')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// * authentication

// router.get('/employees', authentication.employees)
router.post('/login', authentication.login)
router.get('/userByToken', authentication.userByToken)

module.exports = router;


// * patients

router.get('/patients', patients.getPatients)
router.get('/patients/:id', patients.getPatientById)

// * assesment-tool

router.post('/interview', assessmentTool.interview)


// employees 
router.get('/employees', employees.employeeRights)

