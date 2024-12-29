const express = require("express")
const dotenv = require("dotenv").config();
const app = express()
const connectDB = require("./config/database")


const port = process.env.HTTP_PORT || 8080
app.use(express.json());
app.use("/api/v1", require("./routes/index.route"))

connectDB().then(() => {
    console.log("Database connection established")
    app.listen(port, () => {
        console.log("Server is Running on port 8081")
    })
})
    .catch(err => {
        console.error("Database Not connected!")
    })
