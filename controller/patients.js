const { getPatients, createPatient } = require('../repository/patients');


exports.getPatients = async function(req, res, next) {
    try {
        const patients = await getPatients();
        res.send(patients);
    } catch (error) {
        console.error(error);
    }
}

exports.createPatient = async function(req, res, next) {
    try {
        console.log(req.body)
        const patient = await createPatient(req.body);
        res.send(patient);
    } catch (error) {
        console.error(error);
    }
}