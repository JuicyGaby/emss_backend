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
  return familyMember;
}
async function deleteFamilyMember(id) {
  const familyMember = await prisma.patient_family_composition.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("deleted family member", familyMember);
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

// * mswd classfication

async function getMswdClassification(patient_id) {
  const mswdClassification = await prisma.patient_mswd_classification.findFirst(
    {
      where: {
        patient_id: parseInt(patient_id),
      },
    }
  );
  // return something if the mswdclassification is null
  if (!mswdClassification) {
    return {
      haveClassification: false,
      main_classification_type: null,
      sub_classification_type: null,
      membership_to_marginalized_sector: null,
      remarks: null,
    };
  }
  mswdClassification.haveClassification = true;
  if (mswdClassification.membership_to_marginalized_sector) {
    mswdClassification.membership_to_marginalized_sector =
      mswdClassification.membership_to_marginalized_sector.split(",");
  }
  return mswdClassification;
}

async function createMswdClassification(reqBody) {
  let sectors = reqBody.membership_to_marginalized_sector;
  let marginalizedSectorString = sectors.join(",");
  const mswdClassification = await prisma.patient_mswd_classification.create({
    data: {
      patient_id: parseInt(reqBody.patient_id),
      main_classification_type: reqBody.main_classification_type,
      sub_classification_type: reqBody.sub_classification_type,
      membership_to_marginalized_sector: marginalizedSectorString,
      remarks: reqBody.remarks,
    },
  });
  console.log("mswdClassification", mswdClassification);
  return mswdClassification;
}

async function updateMswwdClassification(reqBody) {
  let sectors = reqBody.membership_to_marginalized_sector;
  let marginalizedSectorString = sectors.join(",");
  const mswdClassification = await prisma.patient_mswd_classification.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      main_classification_type: reqBody.main_classification_type,
      sub_classification_type: reqBody.sub_classification_type,
      membership_to_marginalized_sector: marginalizedSectorString,
      remarks: reqBody.remarks,
    },
  });
  console.log("updated", mswdClassification);
  return mswdClassification;
}

// * monthly Expenses

async function getMonthlyExpenses(patient_id) {
  const monthlyExpenses = await prisma.patient_monthly_expenses.findUnique({
    where: {
      patient_id: parseInt(patient_id),
    },
    include: {
      patient_water_source: true,
      patient_light_source: true,
      patient_fuel_source: true,
    },
  });
  if (!monthlyExpenses) {
    return false;
  }
  // if (monthlyExpenses.transportation_type) {
  //   monthlyExpenses.transportation_type =
  //     monthlyExpenses.transportation_type.split(",");
  // }
  return monthlyExpenses;
}

async function createMonthlyExpenses(reqBody) {
  console.log("reqBody", reqBody);
  let transportation_type = null;
  if (reqBody.transportation_type) {
    let transpo = reqBody.transportation_type;
    transportation_type = transpo.join(",");
  }
  const monthlyExpenses = await prisma.patient_monthly_expenses.create({
    data: {
      patient_id: reqBody.patient_id,
      house_lot_cost: reqBody.house_lot_cost || "0",
      food_water_cost: reqBody.food_water_cost || "0",
      education_cost: reqBody.education_cost || "0",
      clothing_cost: reqBody.clothing_cost || "0",
      transportation_type: transportation_type,
      transportation_cost: reqBody.transportation_cost || "0",
      communication_cost: reqBody.communication_cost || "0",
      house_help_cost: reqBody.house_help_cost || "0",
      medical_cost: reqBody.medical_cost || "0",
      others_description: reqBody.others_description || "",
      others_cost: reqBody.others_cost || "0",
      total_cost: reqBody.total_cost || "0",
      remarks: reqBody.remarks || "",
    },
  });
  patient_monthly_expenses_id = monthlyExpenses.id;
  await createSources(patient_monthly_expenses_id, reqBody);
  return monthlyExpenses;
}

async function createSources(id, reqBody) {
  const waterSource = await prisma.patient_water_source.create({
    data: {
      patient_monthly_expenses_id: id,
      water_district: reqBody.patient_water_source.water_district || "0",
      private_artesian_well:
        reqBody.patient_water_source.private_artesian_well || "0",
      public_artesian_well:
        reqBody.patient_water_source.public_artesian_well || "0",
    },
  });
  const lightSource = await prisma.patient_light_source.create({
    data: {
      patient_monthly_expenses_id: id,
      electric: reqBody.patient_light_source.electric || "0",
      kerosene: reqBody.patient_light_source.kerosene || "0",
      candle: reqBody.patient_light_source.candle || "0",
    },
  });
  const fuelSource = await prisma.patient_fuel_source.create({
    data: {
      patient_monthly_expenses_id: id,
      charcoal: reqBody.patient_fuel_source.charcoal || "0",
      kerosene: reqBody.patient_fuel_source.kerosene || "0",
      gas: reqBody.patient_fuel_source.gas || "0",
    },
  });
  console.log("waterSource", waterSource);
  console.log("lightSource", lightSource);
  console.log("fuelSource", fuelSource);
}

async function getWaterSource() {
  const waterSource = await prisma.patient_water_source.findMany();
  return waterSource;
}

async function updateMonthlyExpenses(reqBody) {
  const monthlyExpenses = await prisma.patient_monthly_expenses.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      patient_id: parseInt(reqBody.patient_id),
      monthly_income: reqBody.monthly_income,
      water_source: reqBody.water_source,
      light_source: reqBody.light_source,
      fuel_source: reqBody.fuel_source,
      remarks: reqBody.remarks,
    },
  });
  return monthlyExpenses;
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
  deleteFamilyMember,
  // MSWD Classification
  getMswdClassification,
  createMswdClassification,
  updateMswwdClassification,
  // monthly expenses
  getMonthlyExpenses,
  updateMonthlyExpenses,
  createMonthlyExpenses,
};
