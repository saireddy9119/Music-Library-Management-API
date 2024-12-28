const jwt = require('jsonwebtoken');
const { responseBody } = require('../util/responseBody');
const UserMongo = require("../dao/user/user.mongo.dao")

exports.validAuthorization = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const [bea, bearers] = authHeader.split(' ');
        if (!bearers) {
            return res.status(400).send(requestBody(400, null, "Bad Request", null))
        }
        const decoded = jwt.verify(bearers, process.env.SECRET_KEY)
        next()
    } catch (e) {
        res.status(401).send(responseBody(401, null, "Unauthorized Access", null))
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
        const admin = await UserMongo.findAdmin(decoded.email)
        if (!admin) {
            throw new Error("Unauthorized Access")
        }
        next()
    } catch (e) {
        res.status(401).send(responseBody(401, null, e.message, null))
    }
}