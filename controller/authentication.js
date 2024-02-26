// Description: This file contains the logic for authenticating users.
require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { getUser, getUserByToken, updateUserToken } = require('../repository/authentication')

exports.login = async function(req, res, next) {
    try {
        const { username, password } = req.body
        console.log(md5(password));
        let user = await getUser(username, password)
        if (user) {
            if (!user.login_token) {
                user = await generateToken(user);
            }
            res.send(user)
            return
        }
        res.send({ error: 'Invalid username or password' })
    } catch (error) {
        console.error(error);
    }
}

exports.userByToken = async function(req, res, next) {
    try {
        const token = req.headers.authorization
        if (token) {
            const user = await getUserByToken(token)
            delete user.password
            if (user) {
                res.send(user)
                return
            }
        }
        res.send({ error: 'Invalid token' })
    } catch (error) {
        console.error(error);
    }
}

async function generateToken(user) {
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    console.log(token);
    await updateUserToken(token, user);
}

