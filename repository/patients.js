const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();


async function getPatients() {
    return await prisma.sample_patients.findMany();
}

async function createPatient(patient) {
    
    const {
        firstName,
        middleName,
        lastName,
        age,
        contactNumber,
        sex,
        civilStatus,
    } = patient;

    return await prisma.sample_patients.create({
        data: {
            fname: firstName,
            mname: middleName,
            lname: lastName,
            age: parseInt(age),
            sex,
            civil_status: civilStatus,
        }
    });
}
module.exports = {
    getPatients, createPatient
}