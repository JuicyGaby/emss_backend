const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();

const getEmployeeAccessRights = async function(employeeID) {
    checkEmployeeAccessRights(employeeID);
    const user = await prisma.employee_access_rights.findFirst({
        where: { employee_id: parseInt(employeeID) },
        include: {
            access_rights: true,
        }
    });
    return user;
}

const checkEmployeeAccessRights = async function(employeeID) {
    const employeeRight = await prisma.employee_access_rights.findFirst({
        where: {
            employee_id: parseInt(employeeID),
        }
    });
    if (!employeeRight) {
        createEmployeeAccessRights(employeeID);
        return
    }
}
const createEmployeeAccessRights = async function(employeeID) {
    await prisma.employee_access_rights.create({
        data: {
            employee_id: parseInt(employeeID),
        }
    });
}
module.exports = {
    getEmployeeAccessRights
}