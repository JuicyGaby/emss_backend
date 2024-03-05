const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getPatients() {
    const patients = await prisma.patients.findMany( {
        take: 20000,
    }
    );
    return patients;
}
async function getPatientById(id) {
    const address = await getPatientAddress(id);
    const patient = await prisma.patients.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            patient_interview: true,
            patient_family_composition: true,
        },
    });
    patient.address = address;
    return patient;
}

const getPatientAddress = async id => {
    return await prisma.patient_address.findFirst({
        where: {
            patient_id: parseInt(id)
        }
    });

}



module.exports = {
    getPatients, getPatientById
}