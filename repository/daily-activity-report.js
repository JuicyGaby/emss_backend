const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();
const moment = require("moment-timezone");


// activity logs

// const createActivityLog = async function

// DAR
exports.createDailyActivityReport = async function (reqBody) {
  const { isExisting } = reqBody;
  if (isExisting) {
    console.log("Existing", reqBody);
    const darItem = await createDarItem(reqBody);
    await createDarServicesItem(darItem.id, reqBody.services);
    return darItem;
  }
  console.log("New", reqBody);
  const patient = await createPatientItem(reqBody);
  reqBody.patient_id = patient.id;
  const darItem = await createDarItem(reqBody);
  const services = await createDarServicesItem(darItem.id, reqBody.services);
  console.log("Created", darItem);
  console.log("services", services);
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
      occupation: reqBody.occupation,
      highest_education_level: reqBody.highest_education_level,
    },
  });
}
async function createDarItem(reqBody) {
  const darItem = await prisma.daily_activity_report.create({
    data: {
      patient_id: reqBody.patient_id,
      creator_id: reqBody.creatorId,
      created_by: reqBody.creatorFullName,
      is_phic_member: reqBody.phic_member === "Yes" ? 1 : 0,
      non_phic_classification:
        reqBody.phic_member === "No" ? reqBody.phic_classification : null,
      phic_classification:
        reqBody.phic_member === "Yes" ? reqBody.phic_classification : null,
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
  const today = moment().startOf("day");
  const tomorrow = moment(today).add(1, "days");

  let dar = await prisma.daily_activity_report.findMany({
    where: {
      date_created: {
        gte: today.toDate(),
        lt: tomorrow.toDate(),
      },
      is_active: 1,
    },
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
  let dar = await prisma.daily_activity_report.findUnique({
    where: {
      id: parseInt(dar_id),
    },
    include: {
      patients: true,
    },
  });

  if (dar) {
    if (dar.admission_date) {
      dar.admission_date = moment(dar.admission_date)
        .local()
        .format("YYYY-MM-DD hh:mm");
    } else {
      dar.admission_date = moment().local().format("YYYY-MM-DD hh:mm");
    }
    if (dar.phic_classification !== null) {
      dar.classification = dar.phic_classification;
    } else if (dar.non_phic_classification !== null) {
      dar.classification = dar.non_phic_classification;
    }
  }
  console.log(dar);
  return dar || false;
};
exports.getDailyActivityReportByDate = async function (date) {
  const today = moment(date).startOf("day");
  const tomorrow = moment(today).add(1, "days");

  let dar = await prisma.daily_activity_report.findMany({
    where: {
      date_created: {
        gte: today.toDate(),
        lt: tomorrow.toDate(),
      },
    },
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
exports.updateDailyActivityReport = async function (reqBody) {
  const { patients } = reqBody;
  await updateDarPatientItem(patients);
  const darItem = await prisma.daily_activity_report.update({
    where: {
      id: parseInt(reqBody.id),
    },
    data: {
      area: reqBody.area,
      case_type: reqBody.case_type,
      indirect_contributor: reqBody.indirect_contributor,
      phic_classification:
        reqBody.is_phic_member === 1 ? reqBody.phic_classification : null,
      non_phic_classification:
        reqBody.is_phic_member === 0 ? reqBody.phic_classification : null,
      sectoral_grouping: reqBody.sectoral_grouping,
      house_hold_size: reqBody.house_hold_size,
      source_of_referral: reqBody.source_of_referral,
      diagnosis: reqBody.diagnosis,
      informant: reqBody.informant,
      relationship_to_patient: reqBody.relationship_to_patient,
      interview_start_time: reqBody.interview_start_time,
      interview_end_time: reqBody.interview_end_time,
      admission_date: new Date(reqBody.admission_date).toISOString(),
      remarks: reqBody.remarks,
    },
  });
  console.log("Updated DAR", darItem);
  return darItem;
};
async function updateDarPatientItem(patientData) {
  const patient = await prisma.patients.update({
    where: {
      id: parseInt(patientData.id),
    },
    data: {
      first_name: patientData.first_name,
      middle_name: patientData.middle_name,
      last_name: patientData.last_name,
      age: patientData.age,
      sex: patientData.sex,
      religion: patientData.religion,
      civil_status: patientData.civil_status,
      occupation: patientData.occupation,
      monthly_income: patientData.monthly_income,
      highest_education_level: patientData.highest_education_level,
    },
  });
  console.log("Updated Patient", patient);
}
exports.updateDarStatus = async function (dar_id) {
  const dar = await prisma.daily_activity_report.update({
    where: {
      id: parseInt(dar_id),
    },
    data: {
      is_active: 0,
    },
  });
  return dar;
};

// SWA
exports.createSwaItem = async function (reqBody) {
  const swaItem = await prisma.dar_swa.create({
    data: {
      creator_name: reqBody.creator_fullname,
      creator_id: reqBody.creator_id,
    },
  });
  console.log(reqBody);
  const services = await createSwaServicesItem(swaItem.id, reqBody.services);
  const updatedSwaItem = {
    ...swaItem,
    date_created: moment(swaItem.date_created)
      .local()
      .format("YYYY-MM-DD hh:mm A"),
  };
  console.log("Created", updatedSwaItem);
  return updatedSwaItem;
};
async function createSwaServicesItem(swaId, services) {
  const swaServices = await Promise.all(
    services.map((serviceId) => {
      return prisma.dar_swa_services.create({
        data: {
          dar_swa_id: parseInt(swaId),
          service_id: parseInt(serviceId),
        },
      });
    })
  );
  console.log(swaServices);
}
exports.getSwaServices = async function () {
  const services = await prisma.swa_services.findMany();
  return services || [];
};
exports.getDarSwa = async function () {
  // Set 'today' to April 4, 2024
  //const today = moment("2024-04-04").startOf('day');
  const today = moment().startOf("day");
  const tomorrow = moment(today).add(1, "days");

  const dar_swa = await prisma.dar_swa.findMany({
    where: {
      date_created: {
        gte: today.toDate(),
        lt: tomorrow.toDate(),
      },
    },
  });

  const updated_dar_swa = dar_swa.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });

  return updated_dar_swa || [];
};
exports.getDarSwaByDate = async function (date) {
  const today = moment(date).startOf("day");
  const tomorrow = moment(today).add(1, "days");

  const dar_swa = await prisma.dar_swa.findMany({
    where: {
      date_created: {
        gte: today.toDate(),
        lt: tomorrow.toDate(),
      },
    },
  });

  const updated_dar_swa = dar_swa.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });

  return updated_dar_swa || [];
};
exports.getDarSwaId = async function (dar_swa_id) {
  const darSwaServices = await prisma.dar_swa_services.findMany({
    where: {
      dar_swa_id: parseInt(dar_swa_id),
    },
    include: {
      services: true,
    },
  });
  const servicesArray = darSwaServices.map((item) => {
    return item.services;
  });
  return servicesArray || [];
};

exports.createSwaServicesItem = async function (reqBody) {
  console.log(reqBody);
  const swaServices = await Promise.all(
    reqBody.services.map(async (serviceId) => {
      // Check if a dar_swa_services item with the same service_id and dar_swa_id already exists
      const existingServices = await prisma.dar_swa_services.findMany({
        where: {
          service_id: parseInt(serviceId),
          dar_swa_id: parseInt(reqBody.swa_id),
        },
      });

      // If it doesn't exist, create a new one
      if (existingServices.length === 0) {
        const createdService = await prisma.dar_swa_services.create({
          data: {
            service_id: parseInt(serviceId),
            dar_swa_id: parseInt(reqBody.swa_id),
          },
          include: {
            services: true,
          },
        });

        console.log(createdService);
        return createdService;
      }
    })
  );
  // Filter out undefined values (services that already existed and were not created)
  const filteredSwaServices = swaServices.filter(Boolean);
  // log all created services
  const servicesArray = filteredSwaServices.map((item) => {
    return item.services;
  });
  return servicesArray;
};

// SWA notes
exports.createSwaNote = async function (reqBody) {
  console.log(reqBody);
  const swaNote = await prisma.dar_swa_notes.create({
    data: {
      dar_swa_id: reqBody.dar_swa_id,
      note_title: reqBody.note_title,
      note_body: reqBody.note_body,
      created_by: reqBody.created_by,
      creator_id: reqBody.creator_id,
    },
  });
  const updatedSwaNote = {
    ...swaNote,
    date_created: moment(swaNote.date_created)
      .local()
      .format("YYYY-MM-DD hh:mm A"),
  };
  return updatedSwaNote;
};
exports.getSwaNotes = async function (dar_swa_id) {
  const swaNotes = await prisma.dar_swa_notes.findMany({
    where: {
      dar_swa_id: parseInt(dar_swa_id),
    },
  });
  const updatedSwaNotes = swaNotes.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return updatedSwaNotes || [];
};
exports.getSwaNoteById = async function (note_id) {
  const swaNote = await prisma.dar_swa_notes.findUnique({
    where: {
      id: parseInt(note_id),
    },
  });
  console.log(swaNote);
  return swaNote;
};
exports.updateSwaNote = async function (reqBody) {
  let swaNote = await prisma.dar_swa_notes.update({
    where: {
      id: reqBody.id,
    },
    data: {
      note_title: reqBody.note_title,
      note_body: reqBody.note_body,
    },
  });
  swaNote = {
    ...swaNote,
    date_created: moment(swaNote.date_created)
      .local()
      .format("YYYY-MM-DD hh:mm A"),
  };
  return swaNote;
};
exports.deleteSwaNote = async function (note_id) {
  const swaNote = await prisma.dar_swa_notes.delete({
    where: {
      id: parseInt(note_id),
    },
  });
  return swaNote;
};

// DAR services
exports.getDarServices = async function () {
  const services = await prisma.dar_services.findMany();
  return services || [];
};
exports.getDarServicesByDarId = async function (dar_id) {
  const services = await prisma.dar_case_services.findMany({
    where: {
      dar_id: parseInt(dar_id),
    },
    include: {
      dar_services: true,
    },
  });
  const servicesArray = services.map((item) => {
    return item.dar_services;
  });
  return servicesArray || [];
};
exports.createDarServicesItem = async function (reqBody) {
  console.log(reqBody);
  const darServices = await Promise.all(
    reqBody.services.map(async (serviceId) => {
      // Check if a dar_case_services item with the same dar_service_id and dar_id already exists
      const existingService = await prisma.dar_case_services.findUnique({
        where: {
          dar_service_id: parseInt(serviceId),
          dar_id: parseInt(reqBody.dar_id),
        },
      });

      // If it doesn't exist, create a new one
      if (!existingService) {
        const createdService = await prisma.dar_case_services.create({
          data: {
            dar_service_id: parseInt(serviceId),
            dar_id: parseInt(reqBody.dar_id),
          },
          include: {
            dar_services: true,
          },
        });

        console.log(createdService);
        return createdService;
      }
    })
  );

  // Filter out undefined values (services that already existed and were not created)
  const filteredDarServices = darServices.filter(Boolean);

  // log all created services
  const servicesArray = filteredDarServices.map((item) => {
    return item.dar_services;
  });
  return servicesArray;
};

// DAR Notes
exports.createDarNote = async function (reqBody) {
  const darNote = await prisma.dar_notes.create({
    data: {
      dar_id: reqBody.dar_id,
      note_title: reqBody.note_title,
      note_body: reqBody.note_body,
      created_by: reqBody.created_by,
      creator_id: reqBody.creator_id,
    },
  });
  const updatedDarNote = {
    ...darNote,
    date_created: moment(darNote.date_created)
      .local()
      .format("YYYY-MM-DD hh:mm A"),
  };

  return updatedDarNote;
};
exports.getDarNotes = async function (dar_id) {
  const darNotes = await prisma.dar_notes.findMany({
    where: {
      dar_id: parseInt(dar_id),
    },
  });
  const updatedDarNOtes = darNotes.map((item) => {
    return {
      ...item,
      date_created: moment(item.date_created)
        .local()
        .format("YYYY-MM-DD hh:mm A"),
    };
  });
  return updatedDarNOtes || [];
};
exports.getDarNoteById = async function (note_id) {
  console.log(note_id);
  const darNote = await prisma.dar_notes.findUnique({
    where: {
      id: parseInt(note_id),
    },
  });
  console.log(darNote);
  return darNote;
};
exports.updateDarNote = async function (reqBody) {
  const darNote = await prisma.dar_notes.update({
    where: {
      id: reqBody.id,
    },
    data: {
      note_title: reqBody.note_title,
      note_body: reqBody.note_body,
    },
  });
  const updatedDarNote = {
    ...darNote,
    date_created: moment(darNote.date_created)
      .local()
      .format("YYYY-MM-DD hh:mm A"),
  };
  console.log(updatedDarNote);
  return updatedDarNote;
};
exports.deleteDarNote = async function (note_id) {
  const darNote = await prisma.dar_notes.delete({
    where: {
      id: parseInt(note_id),
    },
  });
  return darNote;
};

// Statistical Report

exports.getDarByMonth = async function (month) {
  // Parse the month name into a date
  const startOfMonth = moment(month, "MMMM")
    .startOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  const endOfMonth = moment(month, "MMMM")
    .endOf("month")
    .format("YYYY-MM-DD HH:mm:ss");

  const result = await prisma.$queryRaw`
    SELECT dcs.dar_service_id, ds.service_name, COUNT(*) as count
    FROM emss_system.dar_case_services AS dcs
    LEFT JOIN emss_system.daily_activity_report AS dar ON dcs.dar_id = dar.id
    LEFT JOIN emss_system.dar_services AS ds ON dcs.dar_service_id = ds.id
    WHERE dar.date_created >= ${startOfMonth} AND dar.date_created <= ${endOfMonth}
    GROUP BY dcs.dar_service_id
  `;

  // Convert BigInt values to strings
  const resultWithStrings = result.map((row) => ({
    ...row,
    count: row.count.toString(),
  }));
  return resultWithStrings;
};
