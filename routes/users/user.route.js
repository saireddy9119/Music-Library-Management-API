const express = require('express')
const router = express.Router();
const UserController = require("../../controllers/users/users.controller")
const AuthController = require("../../auth/permissions.controller")


router.get('/', [AuthController.validAuthorization, AuthController.validAdmin, UserController.getUsers]);
router.post("/add-user", [AuthController.validAuthorization, AuthController.validAdmin, UserController.addUser])
router.delete("/:id", [AuthController.validAdmin, UserController.deleteUser])
router.put("/update-password", [AuthController.validAuthorization, UserController.updatePassword])

module.exports = router;
