const jwt = require('jsonwebtoken')
const UserMongo = require("../../dao/user/user.mongo.dao")
const RegisterMongo = require("../../dao/register/register.mongo.dao")
const { responseBody } = require('../../util/responseBody')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
    try {
        const { limit = 10, offset = 0, role } = req.query
        const result = await UserMongo.getUsers(limit, offset, role)
        if (!result.success) {
            throw new Error("Bad Request")
        }
        res.status(200).send(responseBody(200, result.data, "Users retrieved Successfully", null))
    } catch (err) {
        res.status(400).send(responseBody(400, null, err.message, null))
    }
}

exports.addUser = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const existingEmail = await RegisterMongo.existingEmail(email)
        if (existingEmail) {
            res.status(409).send(responseBody(409, null, "Email already exists", null))
        }
        const admin = await UserMongo.findAdmin(role)
        if (admin && role === "Admin") {
            throw new Error("Forbidden Access/Operation not allowed")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await RegisterMongo.signUp(email, hashedPassword, role)
        res.status(201).send(
            responseBody(201, null, "User created Successfully", null)
        )
    } catch (e) {
        res.status(403).send(responseBody(403, null, e.message, null))
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await UserMongo.existingId(id)
        if (!findId) {
            throw new Error("User Not Found")
        }
        const deleteId = await UserMongo.deleteId(id);
        return res.status(200).send(responseBody(200, null, "User deleted Successfully", null))
    } catch (e) {
        return res.status(404).send(responseBody(404, null, e.message, null))
    }

}

exports.updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body
        const hashedPassword = await bcrypt.hash(old_password, 10)
        const hashedNewPassword = await bcrypt.hash(new_password, 10)
        const findPassword = await UserMongo.findPassword(hashedPassword, hashedNewPassword)
        if (!findPassword) {
            throw new Error("User Not Found")
        }
        const filter = await Promise.all(findPassword.map(async (item) => {
            const isMatch = await bcrypt.compare(old_password, item.password);
            return isMatch ? item : null;
        }));
        const filteredItems = filter.filter(item => item !== null);
        const email = filteredItems[0].email
        const updatePassword = await UserMongo.updatePassword(email, hashedNewPassword)
        return res.status(204).send("")
    } catch (e) {
        res.status(404).send(responseBody(404, null, e.message, null))
    }
}