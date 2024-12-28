const UserMongo = require("../../dao/register/register.mongo.dao")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.logOut = async (req, res) => {
    const authToken = req.headers.authorization;
    const existingEmail = await UserMongo.existingEmail(email)
    const status = !existingEmail ? 200 : 400;
    const result = {
        "status": status,
        "data": null,
        "message": !existingEmail ? "User logged Out successfully" : "Bad Request",
        "error": "null"
    }
    res.status(status).send(result)
}

exports.signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email) {
            throw new Error("Email Id is Required")
        } else if (!password) {
            throw new Error("Password is Required")
        }
        const existingEmail = await UserMongo.existingEmail(email)
        if (existingEmail) {
            return res.status(409).send({
                "status": 409,
                "data": null,
                "message": "Email already Exists",
                "error": null
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await UserMongo.emptyCollection()
        if (!admin && role == 'Admin') {
            throw new Error("Admin Cannot be created")
        }
        let result;
        if (admin) {
            result = await UserMongo.signUp(email, hashedPassword, "Admin")
        } else {
            result = await UserMongo.signUp(email, hashedPassword, role)
        }
        res.status(201).send({
            "status": 201,
            "data": null,
            "message": "User created Successfully",
            "error": null
        })
    } catch (err) {
        res.status(400).send({
            "status": 400,
            "data": null,
            "message": `Bad Request,Reason:${err.message}`,
            "error": "null"
        })
    }

}

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await UserMongo.existingEmail(email)
        const secret = await UserMongo.getPassword(email)
        if (!bcrypt.compare(password, secret.password)) {
            throw new Error("Password is Invalid")
        }
        if (!result) {
            res.status(404).send({
                "status": 404,
                "data": null,
                "message": "User not found",
                "error": null
            })
        }
        const payload = { email, password }
        const authToken = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).send({
            "status": 200,
            "data": {
                "token": authToken
            },
            "message": "Login Successful",
            "error": null
        })
    } catch (err) {
        res.status(400).send({
            "status": 400,
            "data": null,
            "message": `Bad Request, Reason:${err.message}`,
            "error": null
        })
    }
}