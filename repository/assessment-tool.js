const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createInterview(reqBody) {
    const body = reqBody;
    const interview = await prisma.patient_interview.create({
        data: {
            interview_date: new Date(body.interview_date),
            interview_time: body.interview_time,
            admission_date_and_time: new Date(body.admission_date_and_time),
            basic_ward: body.basic_ward,
            nonbasic_ward: body.nonbasic_ward,
            health_record_number: body.health_record_number,
            mswd_number: body.mswd_number,
            referring_party: body.referring_party,
            address: body.address,
            contact_number: body.contact_number,
            informant: body.informant,
            relationship_to_patient: body.relationship_to_patient,
            informant_contact_number: body.informant_contact_number,
            informant_address: body.informant_address,
          },
    });
    return interview;
}

module.exports = {
    createInterview
}


