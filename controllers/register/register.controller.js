const RegisterMongo = require("../../dao/register/register.mongo.dao")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { responseBody } = require("../../util/responseBody")
const { response } = require("../../routes/favourites/favourites.route")

exports.logOut = async (req, res) => {
    return res.status(200).send(responseBody(200, null, "User Logout Successfully", null))
}

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            throw new Error("Email Id is Required")
        } else if (!password) {
            throw new Error("Password is Required")
        }
        const existingEmail = await RegisterMongo.existingEmail(email)
        if (existingEmail) {
            return res.status(409).send(responseBody(409, null, "Email Already Exists", null))
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await RegisterMongo.emptyCollection()
        if (!admin) {
            throw new Error("Admin Already Created")
        }
        const result = await RegisterMongo.signUp(email, hashedPassword, "admin")
        res.status(201).send(responseBody(201, null, "User created Successfully", null))
    } catch (err) {
        res.status(400).send(responseBody(400, null, `Bad Request,Reason:${err.message}`, null))
    }

}

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) {
            throw new Error("Password is Required")
        }
        const result = await RegisterMongo.existingEmail(email)
        const secret = await RegisterMongo.getPassword(email)
        if (!(await bcrypt.compare(password, secret))) {
            throw new Error("Password is Invalid")
        }
        if (!result) {
            res.status(404).send(responseBody(404, null, "User Not Found", null))
        }
        const payload = { email, password }
        const authToken = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).send(responseBody(200, { token: authToken }, "Login Successful", null))
    } catch (err) {
        res.status(400).send(responseBody(400, null, `Bad Request, Reason:${err.message}`, null))
    }
}