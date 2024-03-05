
const { 
    createInterview, 
    getRegion, 
    getProvinceByRegionCode, 
    getMunicipalityByProvinceCode,
    getBarangayByMunicipalityCode
} = require('../repository/assessment-tool');


exports.interview = async function(req, res, next) {
    try {
        // console.log(req.body);
        const interview = await createInterview(req.body);
        res.send(interview);
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