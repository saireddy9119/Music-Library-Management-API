const express = require("express")
const router = express.Router();
const RegisterController = require("../../controllers/register/register.controller")

router.get('/logout', RegisterController.logOut)
router.post('/signup', RegisterController.signUp)
router.post('/login', RegisterController.logIn)

module.exports = router