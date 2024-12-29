const User = require("../../models/users/user.model")

exports.getUsers = async (limit, offset, role) => {
    const query = role ? { role } : {}
    const findUsers = await User.find(query).select("-_id -__v -updatedAt").limit(limit).skip(offset).lean()
    if (findUsers.length == 0) {
        return { success: false }
    }
    return { success: true, data: findUsers }
}

exports.findAdmin = async (email) => {
    const admin = await User.findOne({ email, role: "admin" }).lean()
    return admin ? true : false
}

exports.existingId = async (id) => {
    const existingId = await User.findOne({ user_id: id })
    return existingId ? true : false
}

exports.deleteId = async (id) => {
    const deleteId = await User.deleteOne({ user_id: id })
    return deleteId ? true : false;
}

exports.findPassword = async (password) => {
    const findPassword = await User.findOne({ password }).lean()
    return findPassword;
}

exports.updatePassword = async (email, password) => {
    const update = await User.findOneAndUpdate(
        { email },
        { $set: { password: password } },
        { new: true }
    )

    return true
}