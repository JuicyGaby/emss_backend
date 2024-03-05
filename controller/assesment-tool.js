
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
    try {
        const province = await getProvinceByRegionCode();
        res.send(province);
    } catch (error) {
        console.error(error);
    }
}
exports.getMunicipalityByProvinceCode = async function(req, res, next) {
    try {
        const municipality = await getMunicipalityByProvinceCode();
        res.send(municipality);
    } catch (error) {
        console.error(error);
    }
}

exports.getBarangayByMunicipalityCode = async function(req, res, next) {
    try {
        const barangay = await getBarangayByMunicipalityCode();
        res.send(barangay);
    } catch (error) {
        console.error(error);
    }
}