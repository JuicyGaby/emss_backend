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
exports.getDarSwaServices = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.getDarSwaServices(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getDarSwaServicesById = async function (req, res, next) {
  try {
    const swaId = req.params.id;
    const darItem = await repository.getDarSwaServicesById(swaId);
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
    const darItem = await repository.deleteSwaNoteById(noteId);
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
