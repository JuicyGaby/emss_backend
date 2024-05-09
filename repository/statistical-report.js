const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

exports.generateMonthlyReport = async (body) => {
  const data = {
    social_worker: {
      darCount: 0,
      swaCount: 0,
      patientAssessedCount: 0,
    },
    month: {
      darCount: 0,
      swaCount: 0,
      patientAssessedCount: 0,
    },
  };
  // social worker
  data.social_worker.darCount = await getSocialWorkerDarCount(body);
  data.social_worker.swaCount = await getSocialWorkerSwaCount(body);
  data.social_worker.patientAssessedCount =
    await getSocialWorkerPatientAssessedCount(body);
  // month
  data.month.darCount = await getMonthlyDarCount(body.month);
  data.month.swaCount = await getMonthlySwaCount(body.month);
  data.month.patientAssessedCount = await getMonthlyPatientAssessedCount(
    body.month
  );
  // console.log(data);
  return data;
};
exports.getMonthlyDarEntries = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let darEntries = await prisma.daily_activity_report.findMany({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      patients: true,
    },
  });
  darEntries = darEntries.map((item) => {
    return {
      ...item,
      fullname:
        `${item.patients.first_name} ${item.patients.middle_name} ${item.patients.last_name}`.toUpperCase(),
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return darEntries || [];
};
exports.getMonthlySwaEntries = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let swaEntries = await prisma.dar_swa.findMany({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  swaEntries = swaEntries.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return swaEntries || [];
};
exports.getSocialWorkerMonthlyDarEntries = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let darEntries = await prisma.daily_activity_report.findMany({
    where: {
      creator_id,
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      patients: true,
    },
  });
  darEntries = darEntries.map((item) => {
    return {
      ...item,
      fullname:
        `${item.patients.first_name} ${item.patients.middle_name} ${item.patients.last_name}`.toUpperCase(),
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return darEntries || [];
};
exports.getSocialWorkerMonthlySwaEntries = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let swaEntries = await prisma.dar_swa.findMany({
    where: {
      creator_id,
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  swaEntries = swaEntries.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return swaEntries || [];
};

const getMonthlyDarCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const darCount = await prisma.daily_activity_report.count({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return darCount;
};
const getMonthlySwaCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const swaCount = await prisma.dar_swa.count({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return swaCount;
};
const getMonthlyPatientAssessedCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const patientAssessedCount = await prisma.patients.count({
    where: {
      created_at: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return patientAssessedCount;
};

const getSocialWorkerDarCount = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const darCount = await prisma.daily_activity_report.count({
    where: {
      creator_id,
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return darCount;
};
const getSocialWorkerSwaCount = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const swaCount = await prisma.dar_swa.count({
    where: {
      creator_id,
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return swaCount;
};
const getSocialWorkerPatientAssessedCount = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const patientAssessedCount = await prisma.patients.count({
    where: {
      creator_id,
      created_at: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  return patientAssessedCount;
};
const generateStartAndEndOfMonth = (month) => {
  const startOfMonth = moment(month, "MMMM").startOf("month").toISOString();
  const endOfMonth = moment(month, "MMMM").endOf("month").toISOString();
  return { startOfMonth, endOfMonth };
};
