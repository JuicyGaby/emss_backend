const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

exports.getSocialWorkerMonthlyDarEntries = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let darEntries = await prisma.daily_activity_report.findMany({
    where: {
      creator_id,
      is_active: 1,
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
  const report = await this.generateMonthlyReport(body);
  return { darEntries, report };
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
  const report = await this.generateMonthlyReport(body);
  return { swaEntries, report };
};
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
      is_active: 1,
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

exports.getMonthlyStatisticalReport = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const statisticalReport = {};

  statisticalReport.sourceOfReferral = await getMonthlySourceOfReferral(
    startOfMonth,
    endOfMonth
  );
  // statisticalReport.caseLoad = await getMonthlyCaseLoad(
  //   startOfMonth,
  //   endOfMonth
  // );
  return statisticalReport;
};
// statistical report starts
// ? I source or referral
const getMonthlySourceOfReferral = async (startOfMonth, endOfMonth) => {
  const result = await prisma.$queryRaw`
  SELECT sor.name, HA.id, COUNT(*) as count
  FROM emss_system.daily_activity_report AS dar 
  LEFT JOIN emss_system.source_of_referral AS sor ON dar.source_of_referral_id = sor.id
  LEFT JOIN emss_system.hospital_area AS HA ON dar.area_id = HA.id
  WHERE dar.date_created >= ${startOfMonth} AND dar.date_created <= ${endOfMonth} AND dar.phic_classification IS NOT NULL
  GROUP BY sor.name, HA.id`;

  // Convert count to number
  result.forEach((row) => {
    row.count = Number(row.count);
  });

  // Transform the data
  const updatedData = transformedResult(result);
  return updatedData;
};

const transformedResult = (array) => {
  const result = {};

  array.forEach((item) => {
    if (!result[item.name]) {
      result[item.name] = {
        name: item.name,
        area_1_count: 0,
        area_2_count: 0,
        area_3_count: 0,
        total_count: 0,
      };
    }

    if (item.id === 1 || item.id === 2) {
      result[item.name].area_1_count += item.count;
    }
    if (item.id === 3) {
      result[item.name].area_2_count += item.count;
    }
    if (item.id === 4) {
      result[item.name].area_3_count += item.count;
    }
    result[item.name].total_count =
      result[item.name].area_1_count +
      result[item.name].area_2_count +
      result[item.name].area_3_count;
  });

  return Object.values(result);
};
// ? II case load
const getMonthlyCaseLoad = async (startOfMonth, endOfMonth) => {
  // const isphic = await phicCaseLoad(startOfMonth, endOfMonth, 1);
  const nonPhic = await nonPhicCaseLoad(startOfMonth, endOfMonth, 0);
  console.log("nonPhic", nonPhic);
};
const phicCaseLoad = async (startOfMonth, endOfMonth, isPhic) => {};
const nonPhicCaseLoad = async (startOfMonth, endOfMonth, isPhic) => {
  const caseLoad = {
    area: {
      ip: {},
      op: {},
      er: {},
    },
    totalCount: 0,
    newCaseCount: 0,
    oldCaseCount: 0,
    caseClosedCount: 0,
  };
  const result = await prisma.$queryRaw`
    SELECT phic_classification, HA.id, CT.case_type, COUNT(*) AS count
    FROM emss_system.daily_activity_report as DAR
    LEFT JOIN emss_system.hospital_area as HA 
        ON DAR.area_id = HA.id
    LEFT JOIN emss_system.case_type as CT 
        ON DAR.case_type_id = CT.id
    WHERE DAR.date_created >= ${startOfMonth} AND DAR.date_created <= ${endOfMonth}
        AND is_phic_member = ${isPhic}
        AND phic_classification IS NOT NULL
        AND HA.area_name IS NOT NULL
        AND CT.case_type IS NOT NULL
    GROUP BY phic_classification, HA.id, CT.case_type;
  `;

  // Convert bigint to number
  result.forEach((row) => {
    row.count = Number(row.count);
  });
  const areaMap = {
    1: "ip",
    2: "ip",
    3: "op",
    4: "er",
  };

  const caseTypeMap = {
    "New Case": "newCaseCount",
    "Old Case": "oldCaseCount",
    "Case Closed": "caseClosedCount",
  };

  result.forEach((item) => {
    const area = areaMap[item.id];
    if (area) {
      caseLoad.area[area][item.phic_classification] = item.count;
    }
    const caseType = caseTypeMap[item.case_type];
    if (caseType) {
      caseLoad[caseType] += item.count;
    }
  });
  caseLoad.totalCount = result.length;
  console.log(result);
  return caseLoad;
};
// ? Place of Origin
const getMonthlyPlaceOfOrigin = async (startOfMonth, endOfMonth) => {
  const darItems = await prisma.daily_activity_report.findMany({
    where: {
      phic_classification: {
        not: null,
      },
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      patients: true,
    },
  });
};
// statistical report ends
const getMonthlyDarCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const darCount = await prisma.daily_activity_report.count({
    where: {
      is_active: 1,
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
      is_active: 1,
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
