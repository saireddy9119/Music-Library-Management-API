const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODBURL)
}

module.exports = connectDB;

