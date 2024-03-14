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
router.post('/patients', patients.createPatient)
router.put('/patients', patients.updatePatient)

// * assesment-tool

// ? interview
router.post('/interview', assessmentTool.interview)
router.get('/interview/:id', assessmentTool.getInterview)
router.put('/interview/:id', assessmentTool.updateInterview)

// ? family composition
router.get('/family-composition/:id', assessmentTool.getFamilyComposition)
router.get('/family-info/:id', assessmentTool.getFamilyInfo)
router.post('/family-composition', assessmentTool.createFamilyMember)
router.put('/family-composition', assessmentTool.updateFamilyMember)
router.delete('/family-composition/:id', assessmentTool.deleteFamilyMember)

// ? address
router.get('/region', assessmentTool.getRegion)
router.get('/province/:id', assessmentTool.getProvinceByRegionCode)
router.get('/municipality/:id', assessmentTool.getMunicipalityByProvinceCode)
router.get('/barangay/:id', assessmentTool.getBarangayByMunicipalityCode)
router.put('/address', assessmentTool.updatePatientAddress)

// ? mswd classification
router.get('/mswd-classification/:id', assessmentTool.getMswdClassification)
router.post('/mswd-classification', assessmentTool.createMswdClassification)
router.put('/mswd-classification', assessmentTool.updateMswwdClassification)

// ? monthly expenses

router.get('/monthly-expenses/:id', assessmentTool.getMonthlyExpenses)
router.put('/monthly-expenses', assessmentTool.updateMonthlyExpenses)
router.post('/monthly-expenses', assessmentTool.createMonthlyExpenses)

// ? medical data
router.get('/medical-data/:id', assessmentTool.getMedicalData)
router.post('/medical-data', assessmentTool.createMedicalData)
router.put('/medical-data', assessmentTool.updateMedicalData)


// ? health and mental health
router.get('/health-and-mental-health/:id', assessmentTool.getHealthAndMentalHealth)
router.post('/health-and-mental-health', assessmentTool.createHealthAndMentalHealth)
router.put('/health-and-mental-health', assessmentTool.updateHealthAndMentalHealth)

// ? discrimination
router.get('/discrimination/:id', assessmentTool.getDiscrimination)
router.post('/discrimination', assessmentTool.createDiscrimination)
router.put('/discrimination', assessmentTool.updateDiscrimination)

// ? safety
router.get('/safety/:id', assessmentTool.getSafety)
router.post('/safety', assessmentTool.createSafety)
router.put('/safety', assessmentTool.updateSafety)
// ? social functioning
router.get('/social-functioning/:id', assessmentTool.getSocialFunction)
router.post('/social-functioning', assessmentTool.createSocialFunction)
router.put('/social-functioning', assessmentTool.updateSocialFunction)

// employees 
router.get('/employees', employees.employeeRights)

