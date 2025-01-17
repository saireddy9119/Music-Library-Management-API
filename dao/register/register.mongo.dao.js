
const User = require('../../models/users/user.model')
exports.signUp = async (email, password, role) => {
    const user = new User({
        email, password, role
    })
    await user.save()
    return user;
}

exports.existingEmail = async (email) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return true
    }
    return false
}

exports.getPassword = async (email) => {
    const user = await User.findOne({ email }).lean()
    return user.password
}

exports.emptyCollection = async () => {
    const user = await User.find({ role: 'admin' }).lean()
    return user.length == 0 ? true : false
}