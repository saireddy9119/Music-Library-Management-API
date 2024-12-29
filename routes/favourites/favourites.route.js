const express = require("express")
const router = express()
const FavoriteController = require("../../controllers/favorites/favorites.controller")
const AuthController = require("../../auth/permissions.controller")

router.get("/:category", [AuthController.validAuthorization, FavoriteController.getFavorites])
router.post("/add-favorite", [AuthController.validAuthorization, FavoriteController.addFavorites])
router.delete("/remove-favorite/:favorite_id", [AuthController.validAuthorization, FavoriteController.deleteFavorite])

module.exports = router