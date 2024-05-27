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
        .format("MMMM DD, YYYY hh:mm A"),
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
        .format("MMMM DD, YYYY hh:mm A"),
    };
  });
  return swaEntries || [];
};

exports.getMonthlyStatisticalReport = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);

  // Initialize the statistical report object
  const statisticalReport = {};

  // Gather the various parts of the statistical report
  statisticalReport.sourceOfReferral = await getMonthlySourceOfReferral(
    startOfMonth,
    endOfMonth
  );
  statisticalReport.placeOfOrigin = await getMonthlyPlaceOfOrigin(
    startOfMonth,
    endOfMonth
  );
  //  Get Place of Origin
  const { regionSevenObject, otherProviceObject } =
    await getMonthlyPlaceOfOrigin(startOfMonth, endOfMonth);
  statisticalReport.regionSevenObject = regionSevenObject;
  statisticalReport.otherProviceObject = otherProviceObject;
  // Get DAR services and MSWD documentation
  const { updatedResult: darServices, filteredResults: mswdDocumentation } =
    await getDarServicesStatisticalReport(startOfMonth, endOfMonth);
  statisticalReport.darServices = darServices;
  statisticalReport.mswdDocumentation = mswdDocumentation;

  // Gather social work administration report
  statisticalReport.socialWorkAdministration = await getSwaStatisticalReport(
    startOfMonth,
    endOfMonth
  );

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
  const updatedData = transformedSourceOfReferralResult(result);
  return updatedData;
};

const transformedSourceOfReferralResult = (array) => {
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

// ? III Place of Origin
const getMonthlyPlaceOfOrigin = async (startOfMonth, endOfMonth) => {
  const regionSevenProvince = ["CEBU", "BOHOL", "SIQUIJOR", "NEGROS ORIENTAL"];
  const result = await prisma.$queryRaw`
  SELECT DAR.id, DAR.area_id, HA.area_name, province
  FROM emss_system.daily_activity_report AS DAR
  LEFT JOIN emss_system.hospital_area AS HA ON DAR.area_id = HA.id
  LEFT JOIN emss_system.patients AS PT ON DAR.patient_id = PT.id
  LEFT JOIN emss_system.patient_address AS PTA ON PT.id = PTA.patient_id
  WHERE DAR.date_created >= ${startOfMonth}
  AND DAR.date_created <= ${endOfMonth}
  AND DAR.area_id IS NOT NULL
  AND HA.area_name IS NOT NULL
  AND province IS NOT NULL
  GROUP BY DAR.id, DAR.area_id, HA.area_name, province;
`;
  const filteredProvince = result.filter((item) =>
    regionSevenProvince.some((category) => item.province.includes(category))
  );
  const updatedResult = result.filter(
    (item) =>
      !regionSevenProvince.some((province) => item.province.includes(province))
  );
  const regionSevenObject = transformedPlaceOfOrigin(filteredProvince);
  const otherProviceObject = transformedPlaceOfOrigin(updatedResult);
  return { regionSevenObject, otherProviceObject };
};
const transformedPlaceOfOrigin = (array) => {
  const result = {};
  array.forEach((item) => {
    if (!result[item.province]) {
      result[item.province] = {
        province: item.province,
        area_1_count: 0,
        area_2_count: 0,
        area_3_count: 0,
        total_count: 0,
      };
    }
    if (item.area_id === 1 || item.area_id === 2) {
      result[item.province].area_1_count += 1;
    }
    if (item.area_id === 3) {
      result[item.province].area_2_count += 1;
    }
    if (item.area_id === 4) {
      result[item.province].area_3_count += 1;
    }
    result[item.province].total_count =
      result[item.province].area_1_count +
      result[item.province].area_2_count +
      result[item.province].area_3_count;
  });
  return Object.values(result);
};
// ? IV. Dar Services
const getDarServicesStatisticalReport = async (startOfMonth, endOfMonth) => {
  const result = await prisma.$queryRaw`
  SELECT dar_service_id, service_name, COUNT(*) as count
  FROM emss_system.dar_case_services AS dcs
  LEFT JOIN emss_system.daily_activity_report AS dar ON dcs.dar_id = dar.id
  LEFT JOIN emss_system.dar_services AS ds ON dcs.dar_service_id = ds.id
  WHERE dar.date_created >= ${startOfMonth} AND dar.date_created <= ${endOfMonth}
  GROUP BY dar_service_id, service_name;
  `;
  result.forEach((row) => {
    row.count = Number(row.count);
  });
  const mswdCategories = [
    "MSWD Assessment Tool",
    "Social Profile with Social Care Plan",
    "Medical Social Worker's Progress Note",
    "Group Work Recording",
    "Social Case Study Report",
    "Social Case Summary",
    "Home Visit Report",
    "Service Card",
    "Registration Book",
    "Daily Activity Report",
    "Feedback Report",
    "Home Conduction Report",
  ];
  const filteredResults = result.filter((result) =>
    mswdCategories.some((category) => result.service_name.includes(category))
  );
  const updatedResult = result.filter(
    (row) =>
      !mswdCategories.some((category) => row.service_name.includes(category))
  );
  return { updatedResult, filteredResults };
};

// ? VI. Social Work Administration
const getSwaStatisticalReport = async (startOfMonth, endOfMonth) => {
  const swaTable = {};
  const result = await prisma.$queryRaw`
  select service_id, service_name, count(*) as count
  from emss_system.dar_swa_services as DSS
  left join emss_system.dar_swa as DS
    on DSS.dar_swa_id = DS.id
  left join emss_system.swa_services as SS on DSS.service_id = SS.id
  WHERE DS.date_created >= ${startOfMonth}
    AND DS.date_created < ${endOfMonth}
  group by service_id, service_name
  `;
  result.forEach((row) => {
    row.count = Number(row.count);
  });
  return result;
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
