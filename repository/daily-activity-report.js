const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

exports.createDailyActivityReport = async function (reqBody) {
  const { admission_date, patient_name, age, address, sex } = reqBody;
  const patientDar = await prisma.daily_activity_report.create({
    data: {
      admission_date: moment
        .tz(admission_date, "Asia/Manila")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      patient_name,
      age,
      address,
      sex,
    },
  });
  console.log("Created", patientDar);
  return patientDar;
};
exports.getDailyActivityReport = async function (reqBody) {
  const dar = await prisma.daily_activity_report.findMany({
    select: {
      id: true,
      admission_date: true,
      patient_name: true,
      age: true,
      sex: true,
    },
  });
  return dar || [];
};
exports.getDailyActivityReportById = async function (dar_id) {
  const dar = await prisma.daily_activity_report.findUnique({
    where: {
      id: parseInt(dar_id),
    },
  });
  return dar || false;
};
exports.updateDailyActivityReport = async function (reqBody) {
  const darItem = await prisma.daily_activity_report.update({
    where: {
      id: reqBody.id,
    },
    data: {
      admission_date: moment
        .tz(reqBody.admission_date, "Asia/Manila")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      patient_name: reqBody.patient_name,
      age: reqBody.age,
      sex: reqBody.sex,
      address: reqBody.address,
      civil_status: reqBody.civil_status,
      area: reqBody.area,
      case_type: reqBody.case_type,
      contributor_type: reqBody.contributor_type,
      phic_classification: reqBody.phic_classification,
      non_phic_classification: reqBody.non_phic_classification,
      interview_start_time: reqBody.interview_start_time,
      interview_end_time: reqBody.interview_end_time,
      sectoral_grouping: reqBody.sectoral_grouping,
      educational_attainment: reqBody.educational_attainment,
      religion: reqBody.religion,
      occupation: reqBody.occupation,
      household_size: reqBody.household_size,
      monthly_income: reqBody.monthly_income,
      referral_source: reqBody.referral_source,
      diagnosis: reqBody.diagnosis,
      informant_name: reqBody.informant_name,
      relationship_to_patient: reqBody.relationship_to_patient,
    },
  });
  console.log("Updated", darItem);
  return darItem;
};

exports.createSocialWorkAdministration = async function (reqBody) {
  const formattedDate = moment(reqBody.admission_date).toISOString();
  const swaItem = await prisma.dar_swa.create({
    data: {
      created_by: reqBody.id.toString(),
      creator_name: reqBody.fullname,
      admission_date: formattedDate,
    },
  });
  console.log("Created", swaItem);
  swaItem.admission_date = moment(swaItem.admission_date).local().format('YYYY-MM-DD hh:mm A');
  return swaItem;
};
exports.getSocialWorkAdministration = async function (reqBody) {
  const swa = await prisma.dar_swa.findMany();
  
  const swaLocalTime = swa.map(item => {
    return {
      ...item,
      admission_date: moment(item.admission_date).local().format('YYYY-MM-DD hh:mm A'),
    };
  });

  return swaLocalTime || [];
};
exports.getSocialWorkAdministrationById = async function (swa_id) {};
exports.updateSocialWorkAdministration = async function (reqBody) {};
