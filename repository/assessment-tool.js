const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// * interview

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
async function getInterviewById(patient_id) {
  const interview = await prisma.patient_interview.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return interview;
}
async function updateInterviewById(patient_id, reqBody) {
  const interview = await prisma.patient_interview.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      interview_date: reqBody.interview_date,
      interview_time: reqBody.interview_time,
      admission_date_and_time: reqBody.admission_date_and_time,
      basic_ward: reqBody.basic_ward,
      nonbasic_ward: reqBody.nonbasic_ward,
      health_record_number: reqBody.health_record_number,
      mswd_number: reqBody.mswd_number,
      referring_party: reqBody.referring_party,
      address: reqBody.address,
      contact_number: reqBody.contact_number,
      informant: reqBody.informant,
      relationship_to_patient: reqBody.relationship_to_patient,
      informant_contact_number: reqBody.informant_contact_number,
      informant_address: reqBody.informant_address,
      remarks: reqBody.remarks,
    },
  });
  return interview;
}

// * FAMILY COMPOSITION

async function getFamilyComposition(patient_id) {
  const familyComposition = await prisma.patient_family_composition.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return familyComposition;
}

async function getFamilyInfo(patient_id) {
  const familyInfo = await prisma.patient_family_info.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return familyInfo;
}
async function createFamilyMember(reqBody) {
  console.log("reqBody", reqBody);
  const familyMember = await prisma.patient_family_composition.create({
    data: {
      patient_id: parseInt(reqBody.patient_id),
      full_name: reqBody.full_name,
      age: reqBody.age,
      birth_date: reqBody.birth_date,
      civil_status: reqBody.civil_status,
      relationship: reqBody.relationship,
      educational_attainment: reqBody.educational_attainment,
      occupation: reqBody.occupation,
      monthly_income: reqBody.monthly_income,
    },
  });
  return familyMember;
}
async function updateFamilyMember(reqBody) {
  const familyMember = await prisma.patient_family_composition.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      patient_id: parseInt(reqBody.patient_id),
      full_name: reqBody.full_name,
      age: reqBody.age,
      birth_date: reqBody.birth_date,
      civil_status: reqBody.civil_status,
      relationship: reqBody.relationship,
      educational_attainment: reqBody.educational_attainment,
      occupation: reqBody.occupation,
      monthly_income: reqBody.monthly_income,
    },
  });
  console.log("Updated", familyMember);
  return familyMember;
}

// * address

async function getRegion() {
  const region = await prisma.ph_regions.findMany({
    select: {
      regDesc: true,
      regCode: true,
    },
  });
  return region;
}
async function getProvinceByRegionCode(regCode) {
  const province = await prisma.ph_provinces.findMany({
    where: {
      regCode,
    },
    select: {
      provDesc: true,
      provCode: true,
    },
  });
  return province;
}
async function getMunicipalityByProvinceCode(provCode) {
  const municipality = await prisma.ph_city_mun.findMany({
    where: {
      provCode,
    },
    select: {
      citymunDesc: true,
      citymunCode: true,
    },
  });
  return municipality;
}

async function getBarangayByMunicipalityCode(citymunCode) {
  const barangay = await prisma.ph_barangays.findMany({
    where: {
      citymunCode,
    },
    select: {
      brgyDesc: true,
    },
  });
  return barangay;
}

async function updatePatientAddress(patientAddresses) {
  const updatedAddresses = await Promise.all(
    patientAddresses.map(async (address) => {
      const updatedAddress = await prisma.patient_address.update({
        where: {
          id: address.id,
          address_type: address.address_type,
        },
        data: {
          region: address.region,
          province: address.province,
          district: address.district,
          municipality: address.municipality,
          barangay: address.barangay,
          purok: address.purok,
        },
      });
      return updatedAddress;
    })
  );
  console.log("address updated", updatedAddresses);
  return updatedAddresses;
}

module.exports = {
  // interview
  createInterview,
  getInterviewById,
  updateInterviewById,
  // address
  getRegion,
  getProvinceByRegionCode,
  getMunicipalityByProvinceCode,
  getBarangayByMunicipalityCode,
  updatePatientAddress,
  // family composition
  getFamilyComposition,
  getFamilyInfo,
  createFamilyMember,
  updateFamilyMember,
};
