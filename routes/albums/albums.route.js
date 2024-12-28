const express = require("express")
const router = express.Router()
const AlbumController = require("../../controllers/albums/albums.controller")

router.get("/", [AlbumController.getAlbums])
router.get("/:album_id", [AlbumController.getAlbum])
router.post("/add-album", [AlbumController.addAlbum])
router.put("/:album_id", [AlbumController.updateAlbum])
router.delete("/:album_id", [AlbumController.deleteAlbum])


module.exports = router;