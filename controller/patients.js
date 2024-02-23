const { getPatients, createPatient, updatePatient } = require('../repository/patients');


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
        const patient = await createPatient(req.body);
        if (patient.error) {
            res.status(400).send({ error: 'A patient with these details already exists' });
            return
        }
        console.log(patient);
        res.send(patient);
    } catch (error) {
        console.error(error);
    }
}

exports.updatePatient = async function(req, res, next) {
    try {
        // console.log(req.body)
        const patient = await updatePatient(req.body);
        if (patient.error) {
            res.status(400).send({ error: 'A patient with these details already exists' });
            return
        }
        res.send(patient);
    } catch (error) {
        console.error(error);
    }
}