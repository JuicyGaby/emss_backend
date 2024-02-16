const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.employees = async function(req, res, next) {
    try {
        const users = await prisma.employees.findMany()
        res.send(users)
    } catch (error) {
        console.error(error);
    }
}