// Description: This file is used to authenticate the user.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const md5 = require("md5");

async function getUser(username, password) {
  let user = await prisma.employees.findFirst({
    where: {
      username: username.toUpperCase(),
      password: md5(password),
    },
  });
  return user;
}

async function getUserByToken(token) {
  const user = await prisma.employees.findFirst({
    where: {
      login_token: token,
    },
  });
  return user;
}

async function updateUserToken(token, user) {
  const updatedUser = await prisma.employees.update({
    where: {
      id: user.id,
    },
    data: {
      login_token: token,
    },
  });
  return updatedUser;
}
async function getUserAccessRightsById(accessRightsId) {
  console.log(accessRightsId);
  const accessRights = await prisma.access_rights.findUnique({
    where: {
      id: parseInt(accessRightsId),
    },
  });
  console.log(accessRights);
  return accessRights || null;
}

module.exports = {
  getUser,
  getUserByToken,
  updateUserToken,
  getUserAccessRightsById,
};
