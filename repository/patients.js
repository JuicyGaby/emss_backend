const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();
const moment = require("moment");

async function getPatients() {
  const currentDate = moment().format("YYYY-MM-DD");
  const today = moment(currentDate).toISOString();
  const tomorrow = moment(currentDate).add(1, "days").toISOString();
  const patients = await prisma.patients.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      created_at: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

  const updatedPatient = patients.map((patient) => {
    return {
      ...patient,
      fullname: `${patient.first_name} ${patient.last_name}`.toUpperCase(),
      created_at: moment(patient.created_at).format("MMMM DD, YYYY hh:mm A"),
    };
  });
  return updatedPatient || [];
}
const generateStartAndEndOfMonth = (month) => {
  const startOfMonth = moment(month, "MMMM").startOf("month").toISOString();
  const endOfMonth = moment(month, "MMMM").endOf("month").toISOString();
  return { startOfMonth, endOfMonth };
};
async function getPatientById(patient_id) {
  const patient = await prisma.patients.findUnique({
    where: {
      id: parseInt(patient_id),
    },
  });
  return patient || {};
}
async function getPatientAddress(patient_id) {
  const address = await prisma.patient_address.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  if (address.length <= 0) {
    return false;
  }
  return address;
}
async function searchPatient(search) {
  const patients = await prisma.patients.findMany({
    where: {
      first_name: {
        contains: search.first_name,
      },
      last_name: {
        contains: search.last_name,
      },
    },
    orderBy: {
      last_name: "asc",
    },
    take: 20,
  });
  patients.map((patient) => {
    patient.fullname =
      `${patient.first_name} ${patient.middle_name} ${patient.last_name}`.toUpperCase();
    // modify created_at to human readable format local
    patient.created_at = moment(patient.created_at).format(
      "MMMM DD, YYYY hh:mm A"
    );
  });
  return patients || [];
}

async function createPatient(reqBody) {
  const { interview, demographicData } = reqBody;
  // console.log(interview, demographicData);
  let patient = await prisma.patients.create({
    data: {
      first_name: demographicData.first_name,
      middle_name: demographicData.middle_name,
      last_name: demographicData.last_name,
      preferred_name: demographicData.preferred_name,
      age: demographicData.age.toString(),
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
      created_by: demographicData.social_worker,
      creator_id: parseInt(demographicData.social_worker_id),
    },
  });
  const patientId = patient.id;
  console.log("created", patientId);
  await createPatientInterview(interview, patientId);
  await createPatientProblemsEnvironment(
    patientId,
    demographicData.social_worker
  );
  const updatedPatient = {
    ...patient,
    created_at: moment(patient.created_at).format("MMMM DD, YYYY hh:mm A"),
    fullname: `${patient.first_name} ${patient.last_name}`.toUpperCase(),
  };

  return updatedPatient;
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
      department: interview.department,
      area: interview.area,
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
  console.log("created interview", newInterview);
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
      preferred_name: reqBody.preferred_name,
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
  return patient;
}

async function createPatientProblemsEnvironment(patientId, social_worker) {
  const entry = await prisma.patient_problems_environment.create({
    data: {
      patient_id: patientId,
      interviewed_by: social_worker,
    },
  });
  console.log("created", entry);
}
module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  getPatientAddress,
  searchPatient,
};
