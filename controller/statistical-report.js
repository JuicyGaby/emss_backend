const repository = require("../repository/statistical-report");

exports.generateMonthlyReport = async (req, res) => {
  try {
    const report = await repository.generateMonthlyReport(req.body);
    res.send(report);
  } catch (error) {
    console.log(error);
  }
};
