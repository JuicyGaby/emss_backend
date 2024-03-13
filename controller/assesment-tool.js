const {
  // interview
  createInterview,
  getInterviewById,
  updateInterviewById,
  // addresss
  getRegion,
  getProvinceByRegionCode,
  getMunicipalityByProvinceCode,
  getBarangayByMunicipalityCode,
  updatePatientAddress,
  // family composition
  getFamilyComposition,
  getFamilyInfo,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  // mswd classification
  getMswdClassification,
  createMswdClassification,
  updateMswwdClassification,
  // monthly expenses
  getMonthlyExpenses,
  updateMonthlyExpenses,
  createMonthlyExpenses,
  // medical data
  getMedicalData,
  createMedicalData,
  updateMedicalData,
  // health and mental health
  getHealthAndMentalHealth,
  createHealthAndMentalHealth,
  updateHealthAndMentalHealth,
} = require("../repository/assessment-tool");

const assesmentTool = require("../repository/assessment-tool");

// * interview
exports.interview = async function (req, res, next) {
  try {
    // console.log(req.body);
    const interview = await createInterview(req.body);
    res.send(interview);
  } catch (error) {
    console.error(error);
  }
};
exports.getInterview = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const interview = await getInterviewById(patientId);
    res.send(interview);
  } catch (error) {
    console.error(error);
  }
};
exports.updateInterview = async function (req, res, next) {
  const patientId = req.params.id;
  const body = req.body;
  try {
    const interview = await updateInterviewById(patientId, req.body);
    res.send(interview);
  } catch (error) {
    console.error(error);
  }
};

// * family composition

exports.getFamilyComposition = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const familyComposition = await getFamilyComposition(patientId);
    res.send(familyComposition);
  } catch (error) {
    console.error(error);
  }
};
exports.getFamilyInfo = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const familyInfo = await getFamilyInfo(patientId);
    res.send(familyInfo);
  } catch (error) {
    console.error(error);
  }
};

exports.createFamilyMember = async function (req, res, next) {
  const familyMember = req.body;
  try {
    const newFamilyMember = await createFamilyMember(familyMember);
    res.send(newFamilyMember);
  } catch (error) {
    console.error(error);
  }
};

exports.updateFamilyMember = async function (req, res, next) {
  const familyMember = req.body;
  try {
    const updatedFamilyMember = await updateFamilyMember(familyMember);
    res.send(updatedFamilyMember);
  } catch (error) {
    console.error(error);
  }
};
exports.deleteFamilyMember = async function (req, res, next) {
  const id = req.params.id;
  try {
    const deletedFamilyMember = await deleteFamilyMember(id);
    res.send(deletedFamilyMember);
  } catch (error) {
    console.error(error);
  }
};

// *address

// ? get
exports.getRegion = async function (req, res, next) {
  try {
    const region = await getRegion();
    res.send(region);
  } catch (error) {
    console.error(error);
  }
};
exports.getProvinceByRegionCode = async function (req, res, next) {
  const regCode = req.params.id;
  try {
    const province = await getProvinceByRegionCode(regCode);
    res.send(province);
  } catch (error) {
    console.error(error);
  }
};
exports.getMunicipalityByProvinceCode = async function (req, res, next) {
  const provCode = req.params.id;
  try {
    const municipality = await getMunicipalityByProvinceCode(provCode);
    res.send(municipality);
  } catch (error) {
    console.error(error);
  }
};
exports.getBarangayByMunicipalityCode = async function (req, res, next) {
  const citymunCode = req.params.id;
  try {
    const barangay = await getBarangayByMunicipalityCode(citymunCode);
    res.send(barangay);
  } catch (error) {
    console.error(error);
  }
};
// ? put
exports.updatePatientAddress = async function (req, res, next) {
  const patientAddress = req.body;
  try {
    const patientUpdatedAddress = await updatePatientAddress(patientAddress);
    res.send(patientUpdatedAddress);
  } catch (error) {
    console.log(error);
  }
};

// * mswd classfication
exports.getMswdClassification = async function (req, res, next) {
  const patientId = req.params.id;
  console.log(patientId);
  try {
    const mswdClassification = await getMswdClassification(patientId);
    res.send(mswdClassification);
  } catch (error) {
    console.error(error);
  }
};
exports.createMswdClassification = async function (req, res, next) {
  const mswdClassification = req.body;
  try {
    const newMswdClassification = await createMswdClassification(
      mswdClassification
    );
    res.send(newMswdClassification);
  } catch (error) {
    console.error(error);
  }
};
exports.updateMswwdClassification = async function (req, res, next) {
  const mswdClassification = req.body;
  try {
    const updatedMswdClassification = await updateMswwdClassification(
      mswdClassification
    );
    res.send(updatedMswdClassification);
  } catch (error) {
    console.error(error);
  }
};

// * monthly expenses
exports.getMonthlyExpenses = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const monthlyExpenses = await getMonthlyExpenses(patientId);
    res.send(monthlyExpenses);
  } catch (error) {
    console.error(error);
  }
};

exports.updateMonthlyExpenses = async function (req, res, next) {
  const monthlyExpenses = req.body;
  try {
    const updatedMonthlyExpenses = await updateMonthlyExpenses(monthlyExpenses);
    res.send(updatedMonthlyExpenses);
  } catch (error) {
    console.error(error);
  }
};

exports.createMonthlyExpenses = async function (req, res, next) {
  const monthlyExpenses = req.body;
  try {
    const newMonthlyExpenses = await createMonthlyExpenses(monthlyExpenses);
    res.send(newMonthlyExpenses);
  } catch (error) {
    console.error(error);
  }
};

// * medical data
exports.getMedicalData = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const medicalData = await getMedicalData(patientId);
    res.send(medicalData);
  } catch (error) {
    console.error(error);
  }
};
exports.createMedicalData = async function (req, res, next) {
  const medicalData = req.body;
  try {
    const newMedicalData = await createMedicalData(medicalData);
    res.send(newMedicalData);
  } catch (error) {
    console.error(error);
  }
};
exports.updateMedicalData = async function (req, res, next) {
  const medicalData = req.body;
  try {
    const updatedMedicalData = await updateMedicalData(medicalData);
    res.send(updatedMedicalData);
  } catch (error) {
    console.error(error);
  }
};

// * health and mental health
exports.getHealthAndMentalHealth = async function (req, res, next) {
  const patientId = req.params.id;
  try {
    const healthAndMentalHealth = await getHealthAndMentalHealth(patientId);
    res.send(healthAndMentalHealth);
  } catch (error) {
    console.error(error);
  }
};
exports.createHealthAndMentalHealth = async function (req, res, next) {
  const healthAndMentalHealth = req.body;
  try {
    const newHealthAndMentalHealth = await createHealthAndMentalHealth(
      healthAndMentalHealth
    );
    res.send(newHealthAndMentalHealth);
  } catch (error) {
    console.error(error);
  }
};
exports.updateHealthAndMentalHealth = async function (req, res, next) {
  const healthAndMentalHealth = req.body;
  try {
    const updatedHealthAndMentalHealth = await updateHealthAndMentalHealth(
      healthAndMentalHealth
    );
    res.send(updatedHealthAndMentalHealth);
  } catch (error) {
    console.error(error);
  }
};
