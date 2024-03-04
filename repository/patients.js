const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getPatients() {
    const patients = await prisma.patients.findMany({
        take: 100,
    });
    return patients;
}
async function getPatientById(id) {
    const patient = await prisma.patients.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            patient_interview: true,
            patient_family_composition: true,
        }
    });
    return patient;
}

module.exports = {
    getPatients, getPatientById
}