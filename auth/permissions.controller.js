const jwt = require('jsonwebtoken');
const { responseBody } = require('../util/responseBody');
const RegisterMongo = require("../dao/register/register.mongo.dao")
const UserMongo = require("../dao/user/user.mongo.dao")

exports.validAuthorization = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error("Bad Request")
        const [bea, bearers] = authHeader.split(' ');
        if (!bearers) {
            throw new Error("Bad Request")
        }
        const decoded = jwt.verify(bearers, process.env.SECRET_KEY)
        if (!decoded || !decoded.email) {
            throw new Error("Bad Request")
        }
        const existingMail = await RegisterMongo.existingEmail(decoded.email)
        if (!existingMail) {
            return res.status(404).send(requestBody(404, null, "User Not Found", null))
        }
        req.email = decoded.email
        next()
    } catch (e) {
        res.status(401).send(responseBody(401, null, e.message, null))
    }
}

exports.validAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const [bea, bearers] = authHeader.split(' ');
        if (!bearers) {
            return res.status(400).send(responseBody(400, null, "Bad Request", null))
        }
        const decoded = jwt.verify(bearers, process.env.SECRET_KEY)
        const admin = await UserMongo.findAdmin("sai1@gmail.com")
        if (!admin) {
            throw new Error("Unauthorized Access")
        }
        next()
    } catch (e) {
        res.status(401).send(responseBody(401, null, e.message, null))
    }
}