const { PrismaClient } = require("@prisma/client");
const e = require("cors");
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
      date_created: modifyDate(item.date_created),
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
      date_created: moment(item.date_created),
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
      date_created: modifyDate(item.date_created),
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
      is_active: 1,
    },
  });
  swaEntries = swaEntries.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created),
    };
  });
  return swaEntries || [];
};
exports.getMonthlyStatisticalReport = async (month) => {
  console.log("month", month);
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);

  // Initialize the statistical report object
  const statisticalReport = {
    caseLoad: {},
  };

  // Gather the various parts of the statistical report
  statisticalReport.sourceOfReferral = await getMonthlySourceOfReferral(
    startOfMonth,
    endOfMonth
  );
  statisticalReport.caseLoad.nonPhic = await generateCaseLoad(
    0,
    startOfMonth,
    endOfMonth
  );
  statisticalReport.caseLoad.phic = await generateCaseLoad(
    1,
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

const modifyDate = (date) => {
  return moment(date).local().format("MMMM DD, YYYY hh:mm A");
};

// statistical report starts
// ? I source or referral
const getMonthlySourceOfReferral = async (startOfMonth, endOfMonth) => {
  const result = await prisma.$queryRaw`
  SELECT sor.id as sor_id, sor.name, HA.id, COUNT(*) as count
  FROM emss_system.daily_activity_report AS dar 
  LEFT JOIN emss_system.source_of_referral AS sor ON dar.source_of_referral_id = sor.id
  LEFT JOIN emss_system.hospital_area AS HA ON dar.area_id = HA.id
  WHERE dar.date_created >= ${startOfMonth} AND dar.date_created <= ${endOfMonth} AND dar.phic_classification IS NOT NULL AND dar.is_active = 1
  GROUP BY sor.id, sor.name, HA.id`;
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
        name_id: item.sor_id,
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
    regionSevenProvince.some((category) =>
      item.province.trim().toUpperCase().includes(category)
    )
  );
  const updatedResult = result.filter(
    (item) =>
      !regionSevenProvince.some((province) =>
        item.province.trim().toUpperCase().includes(province)
      )
  );
  const regionSevenObject = transformedPlaceOfOrigin(filteredProvince);
  const otherProviceObject = transformedPlaceOfOrigin(updatedResult);
  return { regionSevenObject, otherProviceObject };
};
const transformedPlaceOfOrigin = (array) => {
  const result = {};
  array.forEach((item) => {
    const trimmedProvince = item.province.trim().toUpperCase();
    if (!result[trimmedProvince]) {
      result[trimmedProvince] = {
        province: trimmedProvince,
        area_1_count: 0,
        area_2_count: 0,
        area_3_count: 0,
        total_count: 0,
      };
    }
    if (item.area_id === 1 || item.area_id === 2) {
      result[trimmedProvince].area_1_count += 1;
    }
    if (item.area_id === 3) {
      result[trimmedProvince].area_2_count += 1;
    }
    if (item.area_id === 4) {
      result[trimmedProvince].area_3_count += 1;
    }
    result[trimmedProvince].total_count =
      result[trimmedProvince].area_1_count +
      result[trimmedProvince].area_2_count +
      result[trimmedProvince].area_3_count;
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
  WHERE dar.date_created >= ${startOfMonth} AND dar.date_created <= ${endOfMonth} AND dar.is_active = 1
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
    AND DS.is_active = 1
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
      is_active: 1,
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
      is_active: 1,
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
const generateCaseLoad = async (isPhic, startOfMonth, endOfMonth) => {
  if (!isPhic) {
    const result = await prisma.$queryRaw`
      select
        case_type_id, area_id, phic_classification, count(*) as count
      from
        emss_system.daily_activity_report
      where
          date_created >=  ${startOfMonth}
          and date_created <= ${endOfMonth}
          and is_phic_member = ${isPhic}
          and case_type_id is not null
          and area_id is not null
          and phic_classification is not null
      group by
        case_type_id, area_id, phic_classification
    `;
    result.forEach((row) => {
      row.count = Number(row.count);
    });
    return result;
  }
  console.log("this is phic");
  const result = await prisma.$queryRaw`
    SELECT
      dar.contributor_type, dar.area_id, dar.phic_classification, dar.case_type_id, count(*) as count
    FROM
      emss_system.daily_activity_report AS dar
    WHERE
      dar.date_created >= ${startOfMonth}
      AND dar.date_created <= ${endOfMonth}
      AND dar.is_active = 1
      AND dar.is_phic_member = 1
      AND dar.case_type_id IS NOT NULL
      AND dar.area_id IS NOT NULL
      AND dar.phic_classification IS NOT NULL
    GROUP BY
      dar.contributor_type, dar.area_id, dar.case_type_id, dar.phic_classification`;
  result.forEach((row) => {
    row.count = Number(row.count);
  });
  // get the sum using reduce with the "count" property of result
  // const sum = result.reduce((acc, curr) => acc + curr.count, 0);
  return result;
};

// ? statistical report generate of dar items
exports.generateSourceOfReferralDarItems = async (month, sor_id) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  let darItems = await prisma.daily_activity_report.findMany({
    where: {
      source_of_referral_id: sor_id,
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      is_active: 1,
      phic_classification: {
        not: null,
      },
    },
  });
  darItems = darItems.map((item) => {
    return {
      ...item,
      date_created: modifyDate(item.date_created),
    };
  });
  return darItems;
};

exports.generateSocialWorkAdministrationItems = async (month, service_id) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const swaItems = await prisma.dar_swa.findMany({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      is_active: 1,
    },
    include: {
      dar_swa_services: true,
    },
  });
  let filteredSwaItems = swaItems.filter((item) =>
    item.dar_swa_services.some((service) => service.service_id === service_id)
  );
  filteredSwaItems = filteredSwaItems.map((item) => {
    return {
      ...item,
      date_created: modifyDate(item.date_created),
    };
  });
  return filteredSwaItems;
};
exports.generateDarServicesItems = async (month, dar_service_id) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const darItems = await prisma.daily_activity_report.findMany({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      is_active: 1,
    },
    include: {
      dar_case_services: true,
    },
  });
  let filteredDarItems = darItems.filter((item) =>
    item.dar_case_services.some(
      (service) => service.dar_service_id === dar_service_id
    )
  );
  filteredDarItems = filteredDarItems.map((item) => {
    return {
      ...item,
      date_created: modifyDate(item.date_created),
    };
  });
  return filteredDarItems;
};
exports.generateMswDocumentationItems = async (month, dar_service_id) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
  const darItems = await prisma.daily_activity_report.findMany({
    where: {
      date_created: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      is_active: 1,
    },
    include: {
      dar_case_services: true,
    },
  });
  let filteredDarItems = darItems.filter((item) =>
    item.dar_case_services.some(
      (service) => service.dar_service_id === dar_service_id
    )
  );
  filteredDarItems = filteredDarItems.map((item) => {
    return {
      ...item,
      date_created: modifyDate(item.date_created),
    };
  });
  return filteredDarItems;
};
