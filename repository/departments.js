const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getDepartments() {
  const departments = await prisma.departments.findMany({
    select: {
      id: true,
      dept_name: true,
    },
  });
  return departments;
}
module.exports = {
    getDepartments, 
}