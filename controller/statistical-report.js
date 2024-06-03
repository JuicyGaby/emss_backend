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
exports.getSocialWorkerMonthlyDarEntries = async (req, res) => {
  try {
    const { darEntries, report } =
      await repository.getSocialWorkerMonthlyDarEntries(req.body);
    res.send({ darEntries, report });
  } catch (error) {
    console.log(error);
  }
};
exports.getSocialWorkerMonthlySwaEntries = async (req, res) => {
  try {
    const { swaEntries, report } =
      await repository.getSocialWorkerMonthlySwaEntries(req.body);
    res.send({ swaEntries, report });
  } catch (error) {
    console.log(error);
  }
};
exports.getMonthlyStatisticalReport = async (req, res) => {
  try {
    const month = req.body.month;
    const report = await repository.getMonthlyStatisticalReport("may");
    res.send(report);
  } catch (error) {
    console.log(error);
  }
};

// ? generation of Statistical Report
exports.generateSourceOfReferralDarItems = async (req, res) => {
  try {
    const { month, sor_id } = req.body;
    console.log(req.body);
    const items = await repository.generateSourceOfReferralDarItems(
      month,
      sor_id
    );
    res.send(items);
  } catch (error) {
    console.log(error);
  }
};
