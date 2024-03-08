const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
} = require("../repository/patients");

exports.getPatients = async function (req, res, next) {
  try {
    const patients = await getPatients();
    res.send(patients);
  } catch (error) {
    console.error(error);
  }
};

exports.getPatientById = async function (req, res, next) {
  const patient_id = req.params.id;
  try {
    const patient = await getPatientById(patient_id);
    res.send(patient);
  } catch (error) {
    console.log(error);
  }
};

exports.createPatient = async function (req, res, next) {
  try {
    const patient = await createPatient(req.body);
    res.send(patient);
  } catch (error) {
    console.error(error);
  }
};

exports.updatePatient = async function (req, res, next) {
  try {
    const patient = await updatePatient(req.body);
    res.send(patient);
  } catch (error) {
    console.error(error);
  }
};
