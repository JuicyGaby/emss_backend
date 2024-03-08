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
async function getInterviewById(patient_id) {
const interview = await prisma.patient_interview.findFirst({
    where: {
        patient_id: parseInt(patient_id)
    },
});
  return interview;
}

async function getFamilyComposition(patient_id) {
  const familyComposition = await prisma.patient_family_composition.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return familyComposition;
}

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

module.exports = {
  createInterview,
  getRegion,
  getProvinceByRegionCode,
  getMunicipalityByProvinceCode,
  getBarangayByMunicipalityCode,
  getInterviewById,
  getFamilyComposition,
};
