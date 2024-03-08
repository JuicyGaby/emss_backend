
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
    // family composition
    getFamilyComposition

} = require('../repository/assessment-tool');

// * interview
exports.interview = async function(req, res, next) {
    try {
        // console.log(req.body);
        const interview = await createInterview(req.body);
        res.send(interview);
    } catch (error) {
        console.error(error);
    }
}
exports.getInterview = async function(req, res, next) {
    const patientId = req.params.id;
    try {
        const interview = await getInterviewById(patientId);
        res.send(interview);
    } catch (error) {
        console.error(error);
    }
}
exports.updateInterview = async function(req, res, next) {
    const patientId = req.params.id;
    const body = req.body;
    try {
        const interview = await updateInterviewById(patientId, req.body);
        res.send(interview);
    } catch (error) {
        console.error(error);
    }
}




// * family composition
exports.getFamilyComposition = async function(req, res, next) {
    const patientId = req.params.id;
    try {
        const familyComposition = await getFamilyComposition(patientId);
        res.send(familyComposition);
    } catch (error) {
        console.error(error);
    }
}




exports.getRegion = async function(req, res, next) {
    try {
        const region = await getRegion();
        res.send(region);
    } catch (error) {
        console.error(error);
    }
}
exports.getProvinceByRegionCode = async function(req, res, next) {
    const regCode = req.params.id;
    try {
        const province = await getProvinceByRegionCode(regCode);
        res.send(province);
    } catch (error) {
        console.error(error);
    }
}
exports.getMunicipalityByProvinceCode = async function(req, res, next) {
    const provCode = req.params.id;
    try {
        const municipality = await getMunicipalityByProvinceCode(provCode);
        res.send(municipality);
    } catch (error) {
        console.error(error);
    }
}
exports.getBarangayByMunicipalityCode = async function(req, res, next) {
    const citymunCode = req.params.id;
    try {
        const barangay = await getBarangayByMunicipalityCode(citymunCode);
        res.send(barangay);
    } catch (error) {
        console.error(error);
    }
}


