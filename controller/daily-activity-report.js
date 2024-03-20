const repository = require("../repository/daily-activity-report");

exports.createDailyActivityReport = async function (req, res, next) {
  try {
    const darItem = await repository.createDailyActivityReport(req.body);
    res.send(darItem);
  } catch (error) {
    console.error(error);
  }
};
