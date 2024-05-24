const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

// activity log

async function createActivityLog(patient_id, body) {
  const activity = await prisma.patient_activity_logs.create({
    data: {
      patient_id: parseInt(patient_id),
      created_by: body.social_worker,
      activity: body.activity,
    },
  });
  console.log("activity", activity);
}
async function getPatientActivityLogs(patient_id) {
  let activityLogs = await prisma.patient_activity_logs.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  activityLogs = activityLogs.map((log) => {
    return {
      ...log,
      created_at: moment(log.created_at).local().format("YYYY-MM-DD hh:mm A"),
    };
  });
  return activityLogs;
}
// * interview

async function createInterview(reqBody) {
  const body = reqBody;
  const interview = await prisma.patient_interview.create({
    data: {
      patient_id: parseInt(body.patientId),
      interview_date: body.interview_date,
      interview_time: body.interview_time,
      admission_date_and_time: new Date(
        body.admission_date_and_time
      ).toISOString(),
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
  let interview = await prisma.patient_interview.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });

  if (interview) {
    interview = {
      ...interview,
      interview_date: moment(interview.interview_date)
        .local()
        .format("YYYY-MM-DD"),
    };
  }
  return interview || false;
}
async function updateInterviewById(patient_id, reqBody) {
  const interview = await prisma.patient_interview.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      interview_date: reqBody.interview_date,
      interview_time: reqBody.interview_time,
      interview_end_time: reqBody.interview_end_time,
      interview_duration: reqBody.interview_duration,
      admission_date_and_time: reqBody.admission_date_and_time,
      area: reqBody.area,
      department: reqBody.department,
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
  console.log("updated interview", interview);
  reqBody.activity = "Updated interview details";
  await createActivityLog(patient_id, reqBody);
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
      age: reqBody.age.toString(),
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
async function getProvinceByRegionCode(regDesc) {
  const region = await prisma.ph_regions.findFirst({
    where: {
      regDesc,
    },
  });
  if (!region) {
    return;
  }
  console.log("region", region);
  const province = await prisma.ph_provinces.findMany({
    where: {
      regCode: region.regCode,
    },
    select: {
      provDesc: true,
      provCode: true,
    },
  });
  return province;
}
async function getDistrictByProvinceCode(provDesc) {
  const province = await prisma.ph_provinces.findFirst({
    where: {
      provDesc,
    },
  });
  if (!province) {
    return;
  }
  const district = await prisma.ph_districts.findMany({
    where: {
      provCode: province.provCode,
    },
    select: {
      disDesc: true,
      provCode: true,
    },
  });
  return district;
}
async function getMunicipalityByProvinceCode(provDesc) {
  const province = await prisma.ph_provinces.findFirst({
    where: {
      provDesc,
    },
  });
  if (!province) {
    return;
  }
  const municipality = await prisma.ph_city_mun.findMany({
    where: {
      provCode: province.provCode,
    },
    select: {
      citymunDesc: true,
      citymunCode: true,
    },
  });
  return municipality;
}
async function getBarangayByMunicipalityCode(citymunDesc) {
  const municipality = await prisma.ph_city_mun.findFirst({
    where: {
      citymunDesc,
    },
  });
  if (!municipality) {
    return;
  }
  const barangay = await prisma.ph_barangays.findMany({
    where: {
      citymunCode: municipality.citymunCode,
    },
    select: {
      brgyDesc: true,
    },
  });
  return barangay;
}
async function createPatientAddress(reqBody) {
  console.log("reqBody", reqBody);
  const permanent = reqBody[0];
  const temporary = reqBody[1];
  const permanentAddress = await prisma.patient_address.create({
    data: {
      patient_id: parseInt(permanent.patient_id),
      region: permanent.region,
      province: permanent.province,
      district: permanent.district,
      municipality: permanent.municipality,
      barangay: permanent.barangay,
      purok: permanent.purok,
      address_type: "permanent",
    },
  });
  const temporaryAddress = await prisma.patient_address.create({
    data: {
      patient_id: parseInt(temporary.patient_id),
      region: temporary.region,
      province: temporary.province,
      district: temporary.district,
      municipality: temporary.municipality,
      barangay: temporary.barangay,
      purok: temporary.purok,
      address_type: "temporary",
    },
  });
  return [permanentAddress, temporaryAddress];
}

async function updatePatientAddress(patientAddresses) {
  console.log("patientAddresses", patientAddresses);
  const permanent = patientAddresses[0];
  const temporary = patientAddresses[1];
  const permanentAddress = await prisma.patient_address.update({
    where: {
      id: parseInt(permanent.id),
    },
    data: {
      region: permanent.region,
      province: permanent.province,
      district: permanent.district,
      municipality: permanent.municipality,
      barangay: permanent.barangay,
      purok: permanent.purok,
    },
  });
  const temporaryAddress = await prisma.patient_address.update({
    where: {
      id: parseInt(temporary.id),
    },
    data: {
      region: temporary.region,
      province: temporary.province,
      district: temporary.district,
      municipality: temporary.municipality,
      barangay: temporary.barangay,
      purok: temporary.purok,
    },
  });
  return [permanentAddress, temporaryAddress];
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
  if (!mswdClassification) {
    return false;
  }
  console.log("mswdClassification", mswdClassification);
  if (mswdClassification.membership_to_marginalized_sector) {
    mswdClassification.membership_to_marginalized_sector =
      mswdClassification.membership_to_marginalized_sector.split(",");
  }
  return mswdClassification;
}
async function createMswdClassification(reqBody) {
  let marginalizedSectorString = null;
  if (reqBody.membership_to_marginalized_sector) {
    let sectors = reqBody.membership_to_marginalized_sector;
    marginalizedSectorString = sectors.join(",");
  }
  const mswdClassification = await prisma.patient_mswd_classification.create({
    data: {
      patient_id: parseInt(reqBody.patient_id),
      main_classification_type: reqBody.main_classification_type,
      sub_classification_type: reqBody.sub_classification_type,
      membership_to_marginalized_sector: marginalizedSectorString,
      remarks: reqBody.remarks,
    },
  });
  reqBody.activity = "Created MSWD classification";
  await createActivityLog(reqBody.patient_id, reqBody);
  return mswdClassification;
}
async function updateMswwdClassification(reqBody) {
  let marginalizedSectorString = null;
  if (reqBody.membership_to_marginalized_sector) {
    let sectors = reqBody.membership_to_marginalized_sector;
    marginalizedSectorString = sectors.join(",");
  }
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
  reqBody.activity = "Updated MSWD classification";
  await createActivityLog(mswdClassification.patient_id, reqBody);
  console.log("updated", mswdClassification);
  return mswdClassification;
}

// * monthly Expenses

async function getMonthlyExpenses(patient_id) {
  const monthlyExpenses = await prisma.patient_monthly_expenses.findUnique({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  console.log("monthlyExpenses", monthlyExpenses);
  if (!monthlyExpenses) {
    return false;
  }
  const listTypes = [
    "transportation_type",
    "light_source_type",
    "water_source_type",
    "fuel_source_type",
    "others_description",
  ];
  listTypes.forEach((type) => {
    if (monthlyExpenses[type] !== undefined && monthlyExpenses[type] !== null) {
      if (monthlyExpenses[type].trim() === "") {
        delete monthlyExpenses[type];
      } else {
        monthlyExpenses[type] = monthlyExpenses[type].split(",");
      }
    }
  });
  return monthlyExpenses;
}
async function createMonthlyExpenses(reqBody) {
  const { number, text } = reqBody;
  console.log(reqBody);
  const listTypes = [
    "transportation_type",
    "light_source_type",
    "water_source_type",
    "fuel_source_type",
    "others_description",
  ];
  const joinedTypes = {};
  listTypes.forEach((type) => {
    if (text && text[type] && Array.isArray(text[type])) {
      joinedTypes[type] = text[type].join(",");
    }
  });
  const monthlyExpenses = await prisma.patient_monthly_expenses.create({
    data: {
      house_lot_cost: number.house_lot_cost,
      food_water_cost: number.food_water_cost,
      education_cost: number.education_cost,
      clothing_cost: number.clothing_cost,
      transportation_type: joinedTypes.transportation_type,
      light_source_type: joinedTypes.light_source_type,
      water_source_type: joinedTypes.water_source_type,
      fuel_source_type: joinedTypes.fuel_source_type,
      others_description: joinedTypes.others_description,
      others_cost: number.others_cost,
      transportation_cost: number.transportation_cost,
      light_source_cost: number.light_source_cost,
      water_source_cost: number.water_source_cost,
      fuel_source_cost: number.fuel_source_cost,
      communication_cost: number.communication_cost,
      house_help_cost: number.house_help_cost,
      medical_cost: number.medical_cost,
      living_arrangement: text.living_arrangement,
      remarks: text.remarks,
      total_cost: reqBody.total_cost.toString(),
      patient_id: reqBody.id,
    },
  });
  reqBody.activity = "Created Monthly Expenses";
  await createActivityLog(monthlyExpenses.patient_id, reqBody);
  return monthlyExpenses;
}
async function updateMonthlyExpenses(reqBody) {
  const { number, text, id } = reqBody;
  console.log("updating", reqBody);
  const listTypes = [
    "transportation_type",
    "light_source_type",
    "water_source_type",
    "fuel_source_type",
    "others_description",
  ];
  const joinedTypes = {};
  listTypes.forEach((type) => {
    if (text && text[type] && Array.isArray(text[type])) {
      joinedTypes[type] = text[type].join(",");
    }
  });
  const monthlyExpenses = await prisma.patient_monthly_expenses.update({
    where: { id },
    data: {
      living_arrangement: text.living_arrangement,
      house_lot_cost: number.house_lot_cost,
      food_water_cost: number.food_water_cost,
      education_cost: number.education_cost,
      clothing_cost: number.clothing_cost,
      transportation_type: joinedTypes.transportation_type,
      light_source_type: joinedTypes.light_source_type,
      water_source_type: joinedTypes.water_source_type,
      fuel_source_type: joinedTypes.fuel_source_type,
      others_description: joinedTypes.others_description,
      others_cost: number.others_cost,
      transportation_cost: number.transportation_cost,
      light_source_cost: number.light_source_cost,
      water_source_cost: number.water_source_cost,
      fuel_source_cost: number.fuel_source_cost,
      communication_cost: number.communication_cost,
      house_help_cost: number.house_help_cost,
      medical_cost: number.medical_cost,
      total_cost: reqBody.total_cost.toString(),
      remarks: text.remarks,
    },
  });
  reqBody.activity = "Updated Monthly Expenses";
  await createActivityLog(monthlyExpenses.patient_id, reqBody);
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

// * medical data
async function getMedicalData(patient_id) {
  let medicalDataItems = await prisma.patient_medical_data.findMany({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  // modify the 'date_created
  medicalDataItems = medicalDataItems.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created).local().format("YYYY-MM-DD"),
    };
  });
  return medicalDataItems || [];
}
async function getMedicalDataById(medicalDataId) {
  const medicalData = await prisma.patient_medical_data.findFirst({
    where: {
      id: parseInt(medicalDataId),
    },
  });
  return medicalData || false;
}
async function createMedicalData(reqBody) {
  let medicalData = await prisma.patient_medical_data.create({
    data: {
      patient_id: reqBody.patient_id,
      medical_data_type: reqBody.medical_data_type,
      medical_data_note: reqBody.medical_data_note,
      creator_id: reqBody.creator_id,
      created_by: reqBody.created_by,
    },
  });
  medicalData = { ...medicalData, date_created: moment().format("YYYY-MM-DD") };
  return medicalData;
}
async function updateMedicalData(reqBody) {
  let medicalData = await prisma.patient_medical_data.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      medical_data_note: reqBody.medical_data_note,
    },
  });
  medicalData = { ...medicalData, date_created: moment().format("YYYY-MM-DD") };
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
  console.log("reqBody", reqBody);
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
  console.log("created", healthAndMentalHealth);
  reqBody.activity = "Created Health and Mental Health";
  await createActivityLog(healthAndMentalHealth.patient_id, reqBody);
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
  console.log("updated", healthAndMentalHealth);
  reqBody.activity = "Updated Health and Mental Health";
  await createActivityLog(healthAndMentalHealth.patient_id, reqBody);
  return healthAndMentalHealth;
}

// discrimination

async function getDiscrimination(patient_id) {
  const discrimination = await prisma.patient_descrimination.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return discrimination || false;
}

async function createDiscrimination(reqBody) {
  console.log("reqBody", reqBody);
  const discrimination = await prisma.patient_descrimination.create({
    data: {
      patient_id: reqBody.patient_id,
      Age: reqBody.Age,
      Ethnicity: reqBody.Ethnicity,
      Religion: reqBody.Religion,
      Sex: reqBody.Sex,
      Sexual_Orientation: reqBody.Sexual_Orientation,
      Lifestyle: reqBody.Lifestyle,
      NonCitizen: reqBody.NonCitizen,
      Veteran_Status: reqBody.Veteran_Status,
      Dependency_Status: reqBody.Dependency_Status,
      Disability_Status: reqBody.Disability_Status,
      Marital_Status: reqBody.Marital_Status,
    },
  });
  console.log("created", discrimination);
  await createActivityLog(discrimination.patient_id, reqBody);
  return discrimination || false;
}
async function updateDiscrimination(reqBody) {
  console.log("reqBody", reqBody);
  const discrimination = await prisma.patient_descrimination.update({
    where: {
      id: reqBody.id,
    },
    data: {
      patient_id: reqBody.patient_id,
      Age: reqBody.Age,
      Ethnicity: reqBody.Ethnicity,
      Religion: reqBody.Religion,
      Sex: reqBody.Sex,
      Sexual_Orientation: reqBody.Sexual_Orientation,
      Lifestyle: reqBody.Lifestyle,
      NonCitizen: reqBody.NonCitizen,
      Veteran_Status: reqBody.Veteran_Status,
      Dependency_Status: reqBody.Dependency_Status,
      Disability_Status: reqBody.Disability_Status,
      Marital_Status: reqBody.Marital_Status,
    },
  });
  console.log("updated", discrimination);
  await createActivityLog(discrimination.patient_id, reqBody);
  return discrimination;
}

// safety

async function getSafety(patient_id) {
  const safety = await prisma.patient_safety.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  return safety || false;
}
async function createSafety(reqBody) {
  const createdSafetyData = await prisma.patient_safety.create({
    data: {
      patient_id: reqBody.patient_id,
      voice_crime_in_community: reqBody.voice_crime_in_community,
      unsafe_working_conditions: reqBody.unsafe_working_conditions,
      unsafe_codition_home: reqBody.unsafe_codition_home,
      absence_of_adequate_safety_services:
        reqBody.absence_of_adequate_safety_services,
      natural_disasters: reqBody.natural_disasters,
      human_created_disasters: reqBody.human_created_disasters,
    },
  });
  console.log("created", createdSafetyData);
  await createActivityLog(createdSafetyData.patient_id, reqBody);
  return createdSafetyData;
}
async function updateSafety(reqBody) {
  const updatedSafetyData = await prisma.patient_safety.update({
    where: {
      id: reqBody.id,
    },
    data: {
      voice_crime_in_community: reqBody.voice_crime_in_community,
      unsafe_working_conditions: reqBody.unsafe_working_conditions,
      unsafe_codition_home: reqBody.unsafe_codition_home,
      absence_of_adequate_safety_services:
        reqBody.absence_of_adequate_safety_services,
      natural_disasters: reqBody.natural_disasters,
      human_created_disasters: reqBody.human_created_disasters,
    },
  });
  console.log("updated", updatedSafetyData);
  await createActivityLog(updatedSafetyData.patient_id, reqBody);
  return updatedSafetyData;
}

// social functioning
async function getSocialFunction(patient_id) {
  const response =
    await prisma.patient_assessment_of_social_functioning.findFirst({
      where: {
        patient_id: parseInt(patient_id),
      },
    });
  return response || false;
}
async function createSocialFunction(reqBody) {
  const createdSocialFunction =
    await prisma.patient_assessment_of_social_functioning.create({
      data: {
        patient_id: reqBody.patient_id,
        parent: reqBody.parent,
        spouse: reqBody.spouse,
        child: reqBody.child,
        sibling: reqBody.sibling,
        other_family_member: reqBody.other_family_member,
        significant_others: reqBody.significant_others,
        // interpersonal roles
        lover: reqBody.lover,
        friend: reqBody.friend,
        neighbor: reqBody.neighbor,
        member: reqBody.member,
        // occupational roles
        worker_paid_economy: reqBody.worker_paid_economy,
        worker_home: reqBody.worker_home,
        worker_volunteer: reqBody.worker_volunteer,
        student: reqBody.student,
        // Special life situation roles
        consumer: reqBody.consumer,
        inpatient: reqBody.inpatient,
        outpatient: reqBody.outpatient,
        er_patient: reqBody.er_patient,
        prisoner: reqBody.prisoner,
        immigrant_legal: reqBody.immigrant_legal,
        immigrant_undocumented: reqBody.immigrant_undocumented,
        imigrant_refugee: reqBody.imigrant_refugee,
      },
    });
  console.log("created", createdSocialFunction);
  await createActivityLog(createdSocialFunction.patient_id, reqBody);
  return createdSocialFunction;
}
async function updateSocialFunction(reqBody) {
  const updatedSocialFunction =
    await prisma.patient_assessment_of_social_functioning.update({
      where: {
        id: reqBody.id,
      },
      data: {
        parent: reqBody.parent,
        spouse: reqBody.spouse,
        child: reqBody.child,
        sibling: reqBody.sibling,
        other_family_member: reqBody.other_family_member,
        significant_others: reqBody.significant_others,
        // interpersonal roles
        lover: reqBody.lover,
        friend: reqBody.friend,
        neighbor: reqBody.neighbor,
        member: reqBody.member,
        // occupational roles
        worker_paid_economy: reqBody.worker_paid_economy,
        worker_home: reqBody.worker_home,
        worker_volunteer: reqBody.worker_volunteer,
        student: reqBody.student,
        // Special life situation roles
        consumer: reqBody.consumer,
        inpatient: reqBody.inpatient,
        outpatient: reqBody.outpatient,
        er_patient: reqBody.er_patient,
        prisoner: reqBody.prisoner,
        immigrant_legal: reqBody.immigrant_legal,
        immigrant_undocumented: reqBody.immigrant_undocumented,
        imigrant_refugee: reqBody.imigrant_refugee,
      },
    });
  console.log("updated", updatedSocialFunction);
  await createActivityLog(updatedSocialFunction.patient_id, reqBody);
  return updatedSocialFunction;
}

// problems in environment
async function getProblemsInEnvironment(patient_id) {
  const response = await prisma.patient_problems_environment.findFirst({
    where: {
      patient_id: parseInt(patient_id),
    },
  });
  if (!response) {
    return false;
  }
  const listTypes = ["problems_presented", "reasons_psychosocial_counselling"];
  listTypes.forEach((type) => {
    if (response[type] !== undefined && response[type] !== null) {
      if (response[type].trim() === "") {
        delete response[type];
      } else {
        response[type] = response[type].split(",");
      }
    }
  });
  const excludedProperties = [
    "problems_presented",
    "reasons_psychosocial_counselling",
    "assesment_findings",
    "recommended_intervention",
    "action_taken",
    "person_emergency",
    "relationship_to_patient",
    "address",
    "contact_number",
    "contact_number_2",
    "contact_number_3",
    "interviewed_by",
    "remarks",
  ];

  for (const prop in response) {
    if (
      response.hasOwnProperty(prop) &&
      response[prop] === null &&
      !excludedProperties.includes(prop)
    ) {
      response[prop] = { duration: "", severity: "" };
    }
  }
  console.log("response", response);
  return response;
}
async function createPatientProblemsEnvironment(reqBody) {
  const listTypes = ["problems_presented", "reasons_psychosocial_counselling"];
  const joinedTypes = {};
  listTypes.forEach((type) => {
    if (reqBody[type] !== undefined && reqBody[type] !== null) {
      if (Array.isArray(reqBody[type])) {
        joinedTypes[type] = reqBody[type].join(",").trim();
      } else if (typeof reqBody[type] === "string") {
        if (reqBody[type].trim() === "") {
          delete reqBody[type];
        }
      }
    }
  });

  const newRecord = await prisma.patient_problems_environment.create({
    data: {
      patient_id: reqBody.patient_id,
      lack_regular_food: reqBody.lack_regular_food,
      nutritionally_inadequate_food: reqBody.nutritionally_inadequate_food,
      documented_malnutrition: reqBody.documented_malnutrition,
      absence_of_shelter: reqBody.absence_of_shelter,
      inadequate_shelter: reqBody.inadequate_shelter,
      unemployment: reqBody.unemployment,
      underemployment: reqBody.underemployment,
      inappropiate_employment: reqBody.inappropiate_employment,
      insufficient_community_resources:
        reqBody.insufficient_community_resources,
      insufficient_provide_resources: reqBody.insufficient_provide_resources,
      no_personal_transportation: reqBody.no_personal_transportation,
      no_problems: reqBody.no_problems,
      absence_of_affectional_support: reqBody.absence_of_affectional_support,
      inadequate_support_system: reqBody.inadequate_support_system,
      excessive_support_system: reqBody.excessive_support_system,
      // array
      problems_presented: joinedTypes.problems_presented,
      reasons_psychosocial_counselling:
        joinedTypes.reasons_psychosocial_counselling,
      // end of array
      assesment_findings: reqBody.assesment_findings,
      recommended_intervention: reqBody.recommended_intervention,
      action_taken: reqBody.action_taken,
      person_emergency: reqBody.person_emergency,
      relationship_to_patient: reqBody.relationship_to_patient,
      address: reqBody.address,
      contact_number: reqBody.contact_number,
      contact_number_2: reqBody.contact_number_2,
      contact_number_3: reqBody.contact_number_3,
      interviewed_by: reqBody.interviewed_by,
      remarks: reqBody.remarks,
    },
  });
  console.log("created", newRecord);
  await createActivityLog(newRecord.patient_id, reqBody);
  return newRecord;
}
async function updatePatientProblemsEnvironment(reqBody) {
  console.log("reqBody", reqBody);
  const listTypes = ["problems_presented", "reasons_psychosocial_counselling"];
  const joinedTypes = {};
  listTypes.forEach((type) => {
    if (reqBody[type] !== undefined && reqBody[type] !== null) {
      if (Array.isArray(reqBody[type])) {
        joinedTypes[type] = reqBody[type].join(",").trim();
      } else if (typeof reqBody[type] === "string") {
        if (reqBody[type].trim() === "") {
          delete reqBody[type];
        }
      }
    }
  });
  const updatedRecord = await prisma.patient_problems_environment.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      patient_id: reqBody.patient_id,
      lack_regular_food: reqBody.lack_regular_food,
      nutritionally_inadequate_food: reqBody.nutritionally_inadequate_food,
      documented_malnutrition: reqBody.documented_malnutrition,
      absence_of_shelter: reqBody.absence_of_shelter,
      inadequate_shelter: reqBody.inadequate_shelter,
      unemployment: reqBody.unemployment,
      underemployment: reqBody.underemployment,
      inappropiate_employment: reqBody.inappropiate_employment,
      insufficient_community_resources:
        reqBody.insufficient_community_resources,
      insufficient_provide_resources: reqBody.insufficient_provide_resources,
      no_personal_transportation: reqBody.no_personal_transportation,
      no_problems: reqBody.no_problems,
      absence_of_affectional_support: reqBody.absence_of_affectional_support,
      inadequate_support_system: reqBody.inadequate_support_system,
      excessive_support_system: reqBody.excessive_support_system,
      // array
      problems_presented: joinedTypes.problems_presented,
      reasons_psychosocial_counselling:
        joinedTypes.reasons_psychosocial_counselling,
      // end of array
      assesment_findings: reqBody.assesment_findings,
      recommended_intervention: reqBody.recommended_intervention,
      action_taken: reqBody.action_taken,
      person_emergency: reqBody.person_emergency,
      relationship_to_patient: reqBody.relationship_to_patient,
      address: reqBody.address,
      contact_number: reqBody.contact_number,
      contact_number_2: reqBody.contact_number_2,
      contact_number_3: reqBody.contact_number_3,
      interviewed_by: reqBody.interviewed_by,
      remarks: reqBody.remarks,
    },
  });
  console.log("updated", updatedRecord);
  await createActivityLog(updatedRecord.patient_id, reqBody);
  return updatedRecord;
}
module.exports = {
  // interview
  createInterview,
  getInterviewById,
  updateInterviewById,
  // address
  getRegion,
  getProvinceByRegionCode,
  getDistrictByProvinceCode,
  getMunicipalityByProvinceCode,
  getBarangayByMunicipalityCode,
  createPatientAddress,
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
  getMedicalDataById,
  // health and mental health
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
  getHealthAndMentalHealth,
  // discrimination
  getDiscrimination,
  createDiscrimination,
  updateDiscrimination,
  // safety
  getSafety,
  createSafety,
  updateSafety,
  // social functioning
  getSocialFunction,
  createSocialFunction,
  updateSocialFunction,
  // problems in environment
  getProblemsInEnvironment,
  createPatientProblemsEnvironment,
  updatePatientProblemsEnvironment,
  getPatientActivityLogs,
};
