
const { getDepartments } = require("../repository/departments");

exports.departments = async function(req, res, next) {
    try {
        const data = await getDepartments();
        // console.log(data);
        res.send(data);
    } catch (error) {
        console.error(error);
    }
}