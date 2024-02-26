const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();

const getEmployeeAccessRights = async function(employeeID) {
    console.log(employeeID);
    checkEmployeeAccessRights(employeeID);
    return await prisma.employee_access_rights.findFirst({
        where: { employee_id: parseInt(employeeID) },
        include: {
            access_rights: true,
        }
    });
}

const checkEmployeeAccessRights = async function(employeeID) {
    const employeeRight = await prisma.employee_access_rights.findFirst({
        where: {
            employee_id: parseInt(employeeID),
        }
    });
    if (!employeeRight) {
        console.log('you do not have access rights');
        createEmployeeAccessRights(employeeID);
        console.log('access rights created');
        return
    }
    console.log('you have access rights');
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