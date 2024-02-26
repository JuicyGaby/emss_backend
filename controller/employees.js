
const { getEmployeeAccessRights } = require('../repository/employees');

exports.employeeRights = async function (req, res, next) {
    try {
        const employeeID = req.headers.authorization;
        const employeeRights = await getEmployeeAccessRights(employeeID);
        res.send(employeeRights);
    } catch (error) {
        console.error(error);
    }
}