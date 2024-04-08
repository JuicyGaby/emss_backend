const repository = require("../repository/daily-activity-report");

exports.createDailyActivityReport = async function (req, res, next) {
  try {
    const darItem = await repository.createDailyActivityReport(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDailyActivityReport = async function (req, res, next) {
  try {
    const darItem = await repository.getDailyActivityReport(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDailyActivityReportById = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.getDailyActivityReportById(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
// getDarByMonth
exports.getDarByMonth = async function (req, res, next) {
  try {
    const month = req.params.month;
    const darItem = await repository.getDarByMonth(month);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};

exports.getDailyActivityReportByDate = async function (req, res, next) {
  try {
    const date = req.params.date;
    const darItem = await repository.getDailyActivityReportByDate(date);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.updateDailyActivityReport = async function (req, res, next) {
  try {
    const darItem = await repository.updateDailyActivityReport(req.body);
    res.send(darItem);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
  }
};

// SWA
exports.createSwaItem = async function (req, res, next) {
  try {
    const swaItem = await repository.createSwaItem(req.body);
    res.send(swaItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getSwaServices = async function (req, res, next) {
  try {
    const swaItem = await repository.getSwaServices();
    res.send(swaItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarSwa = async function (req, res, next) {
  try {
    const darItem = await repository.getDarSwa();
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarSwaByDate = async function (req, res, next) {
  try {
    const date = req.params.date;
    const darItem = await repository.getDarSwaByDate(date);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarSwaId = async function (req, res, next) {
  try {
    const swaId = req.params.id;
    const darItem = await repository.getDarSwaId(swaId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.createSwaServicesItem = async function (req, res, next) {
  try {
    const darItem = await repository.createSwaServicesItem(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};

// SWA NOTES

exports.createSwaNote = async function (req, res, next) {
  try {
    const darItem = await repository.createSwaNote(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getSwaNotes = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.getSwaNotes(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getSwaNoteById = async function (req, res, next) {
  try {
    const noteId = req.params.id;
    const noteItem = await repository.getSwaNoteById(noteId);
    res.send(noteItem);
  } catch (error) {
    console.error(error);
  }
};
exports.updateSwaNote = async function (req, res, next) {
  try {
    const darItem = await repository.updateSwaNote(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.deleteSwaNote = async function (req, res, next) {
  try {
    const noteId = req.params.id;
    const darItem = await repository.deleteSwaNote(noteId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};

// DAR SERVICES
exports.getDarServices = async function (req, res, next) {
  try {
    const darItem = await repository.getDarServices();
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarServicesByDarId = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.getDarServicesByDarId(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.createDarServicesItem = async function (req, res, next) {
  try {
    const darItem = await repository.createDarServicesItem(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};

// DAR NOTES
exports.createDarNote = async function (req, res, next) {
  try {
    const darItem = await repository.createDarNote(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarNotes = async function (req, res, next) {
  try {
    const dar_id = req.params.id;
    const darItem = await repository.getDarNotes(dar_id);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarNoteById = async function (req, res, next) {
  try {
    const noteId = req.params.id;
    const noteItem = await repository.getDarNoteById(noteId);
    res.send(noteItem);
  } catch (error) {
    console.error(error);
  }
};
exports.updateDarNote = async function (req, res, next) {
  try {
    const darItem = await repository.updateDarNote(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.deleteDarNote = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.deleteDarNote(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
