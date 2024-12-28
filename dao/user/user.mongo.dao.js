const User = require("../../models/users/user.model")

exports.getUsers = async (limit, offset, role) => {
    const query = role ? { role } : {}
    const findUsers = await User.find(query).select("-__id -__v -updatedAt").limit(limit).skip(offset).lean()
    if (findUsers.length == 0) {
        return { success: false }
    }
    return { success: true, data: findUsers }
}

exports.findAdmin = async (email) => {
    const admin = await User.findOne({ email, role: "Admin" })
    return admin ? true : false
}

exports.existingId = async (id) => {
    const existingId = await User.finOne({ user_id: id })
    return existingId ? true : false
}

exports.deleteId = async (id) => {
    const deleteId = await User.deleteOne({ user_id: id })
    return deleteId ? true : false;
}

exports.findPassword = async () => {
    const findPassword = await User.find()
    const extractedRecords = findPassword.map(record => record.toJSON());
    return extractedRecords;
}

exports.updatePassword = async (email, password) => {
    const user = await User.findOne({ email })
    const extractedRecords = user.toJSON();
    if (extractedRecords) {
        user.password = password
        await user.save()
    } else {
        return false;
    }

    return true
}