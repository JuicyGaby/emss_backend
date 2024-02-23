const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();


async function getPatients() {
    return await prisma.sample_patients.findMany();
}

async function createPatient(patient) {
    console.log(patient);
    const {
        firstName,
        middleName,
        lastName,
        age,
        contactNumber,
        sex,
        civilStatus,
        birthDate,
    } = patient;

    if (await isPatientExisting(firstName, middleName, lastName)) {
        return ({ error: 'A patient with these details already exists' });
    }

    return await prisma.sample_patients.create({
        data: {
            fname: firstName,
            mname: middleName,
            lname: lastName,
            age: parseInt(age),
            birth_date: new Date(birthDate),
            civil_status: civilStatus,
            sex,
        }
    });
}

async function updatePatient(patient) {
    const {
        id,
        fname,
        mname,
        lname,
        age,
        birth_date,
        civil_status
    } = patient;
    return await prisma.sample_patients.update({
        where: {
            id: parseInt(id)
        },
        data: {
            fname,
            mname,
            lname,
            age: parseInt(age),
            birth_date: new Date(birth_date),
            civil_status
        }
    })
}
async function isPatientExisting(fname, mname, lname) {
    const existingPatient = await prisma.sample_patients.findFirst({
        where : {
            fname,
            mname,
            lname
        }
    })
    return existingPatient !== null
}

module.exports = {
    getPatients, createPatient, updatePatient
}