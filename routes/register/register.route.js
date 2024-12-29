const express = require("express")
const router = express.Router();
const RegisterController = require("../../controllers/register/register.controller")
const AuthController = require("../../auth/permissions.controller")

router.get('/logout', [AuthController.validAuthorization, RegisterController.logOut])
router.post('/signup', [RegisterController.signUp])
router.post('/login', [RegisterController.logIn])

module.exports = router