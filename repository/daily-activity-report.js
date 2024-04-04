const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

// DAR
exports.createDailyActivityReport = async function (reqBody) {
  const { isExisting } = reqBody;
  if (isExisting) {
    console.log("Existing", reqBody);
    const darItem = await createDarItem(reqBody);
    await createDarServicesItem(darItem.id, reqBody.services);
    return darItem;
  }
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
  let dar = await prisma.daily_activity_report.findUnique({
    where: {
      id: parseInt(dar_id),
    },
    include: {
      patients: true,
    },
  });
  dar.date_created = moment(dar.date_created)
    .local()
    .format("YYYY-MM-DD hh:mm A");
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
exports.getDarSwa = async function (reqBody) {
  const dar_swa = await prisma.dar_swa.findMany({});
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
  console.log(reqBody);
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
  return darNote;
};
exports.deleteDarNote = async function (note_id) {
  const darNote = await prisma.dar_notes.delete({
    where: {
      id: parseInt(note_id),
    },
  });
  return darNote;
};
