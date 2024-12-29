const express = require('express')
const router = express.Router()
const ArtistController = require("../../controllers/artist/artist.controller")
const AuthController = require("../../auth/permissions.controller")

router.get("/", [AuthController.validAuthorization, ArtistController.getArtists])
router.get("/:artist_id", [AuthController.validAuthorization, ArtistController.getArtist])
router.post("/add-artist", [AuthController.validAuthorization, ArtistController.addArtist])
router.put("/:artist_id", [AuthController.validAuthorization, ArtistController.updateArtist])
router.delete("/:artist_id", [AuthController.validAuthorization, ArtistController.deleteArtist])

module.exports = router