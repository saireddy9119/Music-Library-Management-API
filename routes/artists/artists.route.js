const express = require('express')
const router = express.Router()
const ArtistController = require("../../controllers/artist/artist.controller")

router.get("/", [ArtistController.getArtists])
router.get("/:artist_id", [ArtistController.getArtist])
router.post("/add-artist", [ArtistController.addArtist])
router.put("/:artist_id", [ArtistController.updateArtist])
router.delete("/:artist_id", [ArtistController.deleteArtist])

module.exports = router