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

exports.login = async function(req, res, next) {
    try {
        const { username, password } = req.body
        const user = await prisma.employees.findUnique({
            where: {
                username: username.toUpperCase()
            }
        })
        if (user && user.password === password) {
            res.send(user)
            return
        }
        // return error if user not found
        res.send({ error: 'Wrong credentials. Please try again' })
        
    } catch (error) {
        console.error(error);
    }
}





