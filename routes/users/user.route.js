const express = require('express')
const router = express.Router();
const UserController = require("../../controllers/users/users.controller")
const AuthController = require("../../auth/permissions.controller")


router.get('/', [UserController.getUsers]);
router.post("/add-user", [AuthController.validAuthorization, UserController.addUser])
router.delete("/:id", [AuthController.validAdmin, UserController.deleteUser])
router.put("/update-password", UserController.updatePassword)

module.exports = router;
