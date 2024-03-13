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
  if (monthlyExpenses.transportation_type) {
    monthlyExpenses.transportation_type =
      monthlyExpenses.transportation_type.split(",");
  }
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
  console.log("Created", monthlyExpenses);
  return monthlyExpenses;
}
async function updateMonthlyExpenses(reqBody) {
  let transportation_type = null;
  if (reqBody.transportation_type) {
    let transpo = reqBody.transportation_type;
    transportation_type = transpo.join(",");
  }
  const monthlyExpenses = await prisma.patient_monthly_expenses.update({
    where: {
      id: reqBody.id,
    },
    data: {
      house_lot_cost: reqBody.house_lot_cost,
      food_water_cost: reqBody.food_water_cost,
      education_cost: reqBody.education_cost,
      clothing_cost: reqBody.clothing_cost,
      transportation_type: transportation_type,
      transportation_cost: reqBody.transportation_cost,
      communication_cost: reqBody.communication_cost,
      house_help_cost: reqBody.house_help_cost,
      medical_cost: reqBody.medical_cost,
      others_description: reqBody.others_description,
      others_cost: reqBody.others_cost,
      total_cost: reqBody.total_cost,
      remarks: reqBody.remarks,
    },
  });
  console.log("Updated", monthlyExpenses);
  if (monthlyExpenses) {
    const patient_monthly_expenses_id = monthlyExpenses.id;
    await updateSources(patient_monthly_expenses_id, reqBody);
  }
  return monthlyExpenses;
}
async function createSources(id, reqBody) {
  const waterSource = await prisma.patient_water_source.create({
    data: {
      patient_monthly_expenses_id: id,
      water_district: reqBody.patient_water_source.water_district,
      private_artesian_well: reqBody.patient_water_source.private_artesian_well,
      public_artesian_well: reqBody.patient_water_source.public_artesian_well,
    },
  });
  const lightSource = await prisma.patient_light_source.create({
    data: {
      patient_monthly_expenses_id: id,
      electric: reqBody.patient_light_source.electric,
      kerosene: reqBody.patient_light_source.kerosene,
      candle: reqBody.patient_light_source.candle,
    },
  });
  const fuelSource = await prisma.patient_fuel_source.create({
    data: {
      patient_monthly_expenses_id: id,
      charcoal: reqBody.patient_fuel_source.charcoal,
      kerosene: reqBody.patient_fuel_source.kerosene,
      gas: reqBody.patient_fuel_source.gas,
    },
  });
}
async function updateSources(id, reqBody) {
  const waterSourceProfile = await findFirst("patient_water_source", id);
  const lightSourceProfile = await findFirst("patient_light_source", id);
  const fuelSourceProfile = await findFirst("patient_fuel_source", id);
  const waterSource = await prisma.patient_water_source.update({
    where: {
      id: waterSourceProfile.id,
    },
    data: {
      water_district: reqBody.patient_water_source.water_district,
      private_artesian_well: reqBody.patient_water_source.private_artesian_well,
      public_artesian_well: reqBody.patient_water_source.public_artesian_well,
    },
  });
  const lightSource = await prisma.patient_light_source.update({
    where: {
      id: lightSourceProfile.id,
    },
    data: {
      electric: reqBody.patient_light_source.electric,
      kerosene: reqBody.patient_light_source.kerosene,
      candle: reqBody.patient_light_source.candle,
    },
  });
  const fuelSource = await prisma.patient_fuel_source.update({
    where: {
      id: fuelSourceProfile.id,
    },
    data: {
      charcoal: reqBody.patient_fuel_source.charcoal,
      kerosene: reqBody.patient_fuel_source.kerosene,
      gas: reqBody.patient_fuel_source.gas,
    },
  });
  console.log("updated sources", waterSource, lightSource, fuelSource);
}
async function findFirst(model, id) {
  return await prisma[model].findFirst({
    where: {
      patient_monthly_expenses_id: id,
    },
  });
}

// * medical data
async function getMedicalData(patient_id) {
  const medicalData = await prisma.patient_medical_data.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return medicalData || false;
}
async function createMedicalData(reqBody) {
  console.log("reqBody", reqBody);
  const medicalData = await prisma.patient_medical_data.create({
    data: {
      patient_id: reqBody.patient_id,
      admitting_diagnosis: reqBody.admitting_diagnosis,
      final_diagnosis: reqBody.final_diagnosis,
      duration_of_problems: reqBody.duration_of_problems,
      previous_treatment: reqBody.previous_treatment,
      present_treatment_plan: reqBody.present_treatment_plan,
      health_accessibility_problem: reqBody.health_accessibility_problem,
    },
  });
  console.log("medicalData created", medicalData);
  return medicalData;
}
async function updateMedicalData(reqBody) {
  const medicalData = await prisma.patient_medical_data.update({
    where: {
      id: reqBody.id,
    },
    data: {
      admitting_diagnosis: reqBody.admitting_diagnosis,
      final_diagnosis: reqBody.final_diagnosis,
      duration_of_problems: reqBody.duration_of_problems,
      previous_treatment: reqBody.previous_treatment,
      present_treatment_plan: reqBody.present_treatment_plan,
      health_accessibility_problem: reqBody.health_accessibility_problem,
    },
  });
  console.log("medicalData updated", medicalData);
  return medicalData;
}

// health and mental health
async function getHealthAndMentalHealth(patient_id) {
  const healthAndMentalHealth =
    await prisma.patient_health_and_mental_health.findFirst({
      where: {
        patient_id: parseInt(patient_id),
      },
    });
  return healthAndMentalHealth || false;
}
async function createHealthAndMentalHealth(reqBody) {
  console.log('reqBody', reqBody);
  const healthAndMentalHealth =
    await prisma.patient_health_and_mental_health.create({
      data: {
        patient_id: reqBody.patient_id,
        abscence_of_adequate_health_services:
          reqBody.abscence_of_adequate_health_services,
        inaccessibility_of_health_services:
          reqBody.inaccessibility_of_health_services,
        abscence_of_support_health_services:
          reqBody.abscence_of_support_health_services,
        absence_of_adequate_mental_services:
          reqBody.absence_of_adequate_mental_services,
        inaccessibility_of_mental_services:
          reqBody.inaccessibility_of_mental_services,
        absence_of_support_mental_services:
          reqBody.absence_of_support_mental_services,
        remarks: reqBody.remarks,
      },
    });
  console.log('created', healthAndMentalHealth);
  return healthAndMentalHealth;
}
async function updateHealthAndMentalHealth(reqBody) {
  const healthAndMentalHealth =
    await prisma.patient_health_and_mental_health.update({
      where: {
        id: reqBody.id,
      },
      data: {
        abscence_of_adequate_health_services:
          reqBody.abscence_of_adequate_health_services,
        inaccessibility_of_health_services:
          reqBody.inaccessibility_of_health_services,
        abscence_of_support_health_services:
          reqBody.abscence_of_support_health_services,
        absence_of_adequate_mental_services:
          reqBody.absence_of_adequate_mental_services,
        inaccessibility_of_mental_services:
          reqBody.inaccessibility_of_mental_services,
        absence_of_support_mental_services:
          reqBody.absence_of_support_mental_services,
        remarks: reqBody.remarks,
      },
    });
  console.log('updated', healthAndMentalHealth);
  return healthAndMentalHealth;
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
  // medical data
  getMedicalData,
  createMedicalData,
  updateMedicalData,
  // health and mental health
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
  getHealthAndMentalHealth,
};
