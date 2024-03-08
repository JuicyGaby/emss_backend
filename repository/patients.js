const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

async function getPatients() {
  const patients = await prisma.patients.findMany({
    take: 10,
  });
  return patients;
}
async function getPatientById(patient_id) {
  const patient = await prisma.patients.findUnique({
    where: {
      id: parseInt(patient_id),
    },
  });
  const address = await prisma.patient_address.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });

  patient.address = address;
  console.log(patient);
  return patient;
}
async function createPatient(reqBody) {
  const { interview, demographicData } = reqBody;
  const patient = await prisma.patients.create({
    data: {
      first_name: demographicData.first_name,
      middle_name: demographicData.middle_name,
      last_name: demographicData.last_name,
      age: demographicData.age,
      birth_date: demographicData.birth_date,
      sex: demographicData.sex,
      gender: demographicData.gender,
      civil_status: demographicData.civil_status,
      contact_number: demographicData.contact_number,
      place_of_birth: demographicData.place_of_birth,
      nationality: demographicData.nationality,
      religion: demographicData.religion,
      occupation: demographicData.occupation,
      monthly_income: demographicData.monthly_income,
      living_arrangement: demographicData.living_arrangement,
      ph_membership_number: demographicData.ph_membership_number,
      ph_membership_type: demographicData.ph_membership_type,
    },
  });
  const patientId = patient.id;
  for (let addressType in demographicData.address) {
    await createPatientAddress(
      demographicData.address[addressType],
      addressType,
      patientId
    );
  }
  await createPatientInterview(interview, patientId);
  return patient;
}
async function createPatientAddress(addressData, addressType, patientId) {
  const [region, province, municipality] = await Promise.all([
    addressData.region
      ? prisma.ph_regions.findFirst({
          where: {
            regCode: addressData.region,
          },
          select: {
            regDesc: true,
          },
        })
      : { regDesc: null },
    addressData.province
      ? prisma.ph_provinces.findFirst({
          where: {
            provCode: addressData.province,
          },
          select: {
            provDesc: true,
          },
        })
      : { provDesc: null },
    addressData.municipality
      ? prisma.ph_city_mun.findFirst({
          where: {
            citymunCode: addressData.municipality,
          },
          select: {
            citymunDesc: true,
          },
        })
      : { citymunDesc: null },
  ]);

  console.log(region, province, municipality);
  const newAddress = await prisma.patient_address.create({
    data: {
      patient_id: patientId,
      region: region.regDesc,
      province: province.provDesc,
      district: addressData.district,
      municipality: municipality.citymunDesc,
      barangay: addressData.baranggay,
      purok: addressData.purok,
      address_type: addressType,
    },
  });
  console.log("Created address", newAddress);
}
async function createPatientInterview(interview, patientId) {
  const interviewDateTime = moment(interview.interview_date_time);
  const body = {
    interview_date: interviewDateTime.format("YYYY-MM-DD"),
    interview_time: interviewDateTime.format("HH:mm"),
  };
  const newInterview = await prisma.patient_interview.create({
    data: {
      patient_id: patientId,
      interview_date: body.interview_date,
      interview_time: body.interview_time,
      admission_date_and_time: interview.admission_date_time,
      basic_ward: interview.basic_ward,
      nonbasic_ward: interview.nonbasic_ward,
      health_record_number: interview.health_record_number,
      mswd_number: interview.mswd_number,
      source_of_referral: interview.source_of_referral,
      referring_party: interview.referring_party,
      address: interview.address,
      contact_number: interview.contact_number,
      informant: interview.informant,
      relationship_to_patient: interview.relationship_to_patient,
      informant_contact_number: interview.informant_contact_number,
      informant_address: interview.informant_address,
    },
  });
  console.log("Created interview", newInterview);
}

async function updatePatient(reqBody) {
  const patient = await prisma.patients.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      first_name: reqBody.first_name,
      middle_name: reqBody.middle_name,
      last_name: reqBody.last_name,
      age: reqBody.age,
      birth_date: reqBody.birth_date,
      sex: reqBody.sex,
      contact_number: reqBody.contact_number,
      gender: reqBody.gender,
      religion: reqBody.religion,
      nationality: reqBody.nationality,
      civil_status: reqBody.civil_status,
      living_arrangement: reqBody.living_arrangement,
      highest_education_level: reqBody.highest_education_level,
      education_status: reqBody.education_status,
      occupation: reqBody.occupation,
      monthly_income: reqBody.monthly_income,
      ph_membership_number: reqBody.ph_membership_number,
      ph_membership_type: reqBody.ph_membership_type,
      remarks: reqBody.remarks,
    },
  });
  console.log("updated", patient);
  return patient;
} 

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient
};
