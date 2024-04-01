const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

exports.createDailyActivityReport = async function (reqBody) {
  const { isExisting } = reqBody;
  if (isExisting) {
    console.log("Existing", reqBody);
    const darItem = await createDarItem(reqBody);
    const services = await createDarServicesItem(darItem.id, reqBody.services);
    return darItem;
  }
  const patient = await createPatientItem(reqBody);
  reqBody.patient_id = patient.id;
  const darItem = await createDarItem(reqBody);
  return darItem;
};
async function createPatientItem(reqBody) {
  return await prisma.patients.create({
    data: {
      first_name: reqBody.first_name,
      middle_name: reqBody.middle_name,
      last_name: reqBody.last_name,
      age: reqBody.age,
      sex: reqBody.sex,
      civil_status: reqBody.civil_status,
    },
  });
}
async function createDarItem(reqBody) {
  const darItem = await prisma.daily_activity_report.create({
    data: {
      patient_id: reqBody.patient_id,
      creator_id: reqBody.creatorId,
      created_by: reqBody.creatorFullName,
    },
  });
  const patient = await prisma.patients.findUnique({
    where: {
      id: reqBody.patient_id,
    },
  });
  darItem.fullname =
    `${patient.first_name} ${patient.middle_name} ${patient.last_name}`.toUpperCase();
  return darItem;
}
async function createDarServicesItem(darId, services) {
  const darServices = await Promise.all(
    services.map((serviceId) => {
      return prisma.dar_case_services.create({
        data: {
          dar_service_id: serviceId,
          dar_id: darId,
        },
      });
    })
  );
  return darServices;
}

exports.getDailyActivityReport = async function (reqBody) {
  let dar = await prisma.daily_activity_report.findMany({
    include: {
      patients: true,
    },
  });
  const darLocalTime = dar.map((item) => {
    return {
      ...item,
      fullname:
        `${item.patients.first_name} ${item.patients.middle_name} ${item.patients.last_name}`.toUpperCase(),
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return darLocalTime || [];
};
exports.getDailyActivityReportById = async function (dar_id) {
  const dar = await prisma.daily_activity_report.findUnique({
    where: {
      id: parseInt(dar_id),
    },
    include: {
      patients: true,
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

exports.darCreatePatient = async function (reqBody) {
  console.log(reqBody);
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
  swaItem.admission_date = moment(swaItem.admission_date)
    .local()
    .format("YYYY-MM-DD hh:mm A");
  return swaItem;
};
exports.getSocialWorkAdministration = async function (reqBody) {
  const swa = await prisma.dar_swa.findMany();

  const swaLocalTime = swa.map((item) => {
    return {
      ...item,
      admission_date: moment(item.admission_date)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });

  return swaLocalTime || [];
};
exports.getSocialWorkAdministrationById = async function (swa_id) {};
exports.updateSocialWorkAdministration = async function (reqBody) {
  console.log(reqBody);
};

exports.getDarServices = async function () {
  const services = await prisma.dar_services.findMany();
  return services || [];
};
