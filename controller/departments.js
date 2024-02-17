const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.departments = async function(req, res, next) {
    try {
        const departments = await prisma.departments.findMany()
        res.send(departments)
    } catch (error) {
        console.log(error);
    }
}