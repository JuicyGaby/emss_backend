const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');


exports.employees = async function(req, res, next) {
    try {
        const users = await prisma.employees.findMany()
        res.send(users)
    } catch (error) {
        console.error(error);
    }
}

exports.login = async function(req, res, next) {
    try {
        const { username, password } = req.body
        let user = await prisma.employees.findUnique({
            where: {
                username: username.toUpperCase()
            }
        })
        if (user && user.password === md5(password)) {
            if (!user.login_token) {
                await generateToken(user)
                // Re-fetch the user from the database to get the updated login_token
                user = await prisma.employees.findUnique({
                    where: {
                        username: username.toUpperCase()
                    }
                })
            }
            res.send(user)
            return
        }
        res.send({ error: 'Wrong credentials. Please try again' })
    } catch (error) {
        console.error(error);
    }
}

async function generateToken(user) {
    const token = jwt.sign( user.id , process.env.JWT_SECRET)
    console.log(token);
    await insertToken(token, user)
}

async function insertToken(token, user) {
    await prisma.employees.update({
        where: {
            id: user.id
        },
        data: {
            login_token: token
        }
    })
    return token
}
