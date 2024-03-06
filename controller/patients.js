const { getPatients, getPatientById, createPatient } = require('../repository/patients');


exports.getPatients = async function(req, res, next) {
    try {
        const patients = await getPatients();
        res.send(patients);
    } catch (error) {
        console.error(error);
    }
}

exports.getPatientById = async function(req, res, next) {
    const id = req.params.id;
    try {
        const patient = await getPatientById(id);
        res.send(patient);
    } catch (error) {
        console.error(error);
    }
}

exports.createPatient = async function(req, res, next) {
    try {
        const patient = await createPatient(req.body);
        res.send(patient);
    } catch (error) {
        console.error(error);
    }
}