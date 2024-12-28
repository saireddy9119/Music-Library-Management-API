const express = require("express")
const router = express()
const FavoriteController = require("../../controllers/favorites/favorites.controller")

router.get("/:category", [FavoriteController.getFavorites])
router.post("/add-favorite", [FavoriteController.addFavorites])
router.delete("/remove-favorite/:favorite_id", [FavoriteController.deleteFavorite])

module.exports = router