const repository = require("../repository/statistical-report");

exports.generateMonthlyReport = async (req, res) => {
  try {
    const report = await repository.generateMonthlyReport(req.body);
    res.send(report);
  } catch (error) {
    console.log(error);
  }
};
exports.getMonthlyDarEntries = async (req, res) => {
  try {
    const month = req.body.dar_month;
    console.log(month);
    const entries = await repository.getMonthlyDarEntries(month);
    res.send(entries);
  } catch (error) {
    console.log(error);
  }
};
exports.getMonthlySwaEntries = async (req, res) => {
  try {
    const month = req.body.swa_month;
    const entries = await repository.getMonthlySwaEntries(month);
    res.send(entries);
  } catch (error) {
    console.log(error);
  }
};
