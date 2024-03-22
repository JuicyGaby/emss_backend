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
exports.createSocialWorkAdministration = async function (req, res, next) {
  try {
    const darItem = await repository.createSocialWorkAdministration(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getSocialWorkAdministration = async function (req, res, next) {
  try {
    const darItem = await repository.getSocialWorkAdministration(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.getSocialWorkAdministrationById = async function (req, res, next) {
  try {
    const darId = req.params.id;
    const darItem = await repository.getSocialWorkAdministrationById(darId);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
exports.updateSocialWorkAdministration = async function (req, res, next) {
  try {
    const darItem = await repository.updateSocialWorkAdministration(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
