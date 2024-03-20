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
    },
  });
  console.log("Created", patientDar);
  return patientDar;
};
exports.getDailyActivityReport = async function (reqBody) {
  const dar = await prisma.daily_activity_report.findMany({
    where: {
        date_created: reqBody.date_created
    }
  });
  return dar;
};
exports.getDailyActivityReportById = async function (reqBody) {
    console.log(reqBody);
}
exports.updateDailyActivityReport = async function (reqBody) {
    console.log(reqBody);
}

