const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

exports.getMonthlyDarCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
};
exports.getMonthlySwaCount = async (month) => {
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
};

exports.getSocialWorkerDarCount = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
};
exports.getSocialWorkerSwaCount = async (body) => {
  const { creator_id, month } = body;
  const { startOfMonth, endOfMonth } = generateStartAndEndOfMonth(month);
};

const generateStartAndEndOfMonth = (month) => {
  const startOfMonth = moment(month, "MMMM")
    .startOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  const endOfMonth = moment(month, "MMMM")
    .endOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  return { startOfMonth, endOfMonth };
};
