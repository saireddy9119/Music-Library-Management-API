const express = require("express")
const router = express.Router()
const AlbumController = require("../../controllers/albums/albums.controller")
const AuthController = require("../../auth/permissions.controller")

router.get("/", [AuthController.validAuthorization, AlbumController.getAlbums])
router.get("/:album_id", [AuthController.validAuthorization, AlbumController.getAlbum])
router.post("/add-album", [AuthController.validAuthorization, AlbumController.addAlbum])
router.put("/:album_id", [AuthController.validAuthorization, AlbumController.updateAlbum])
router.delete("/:album_id", [AuthController.validAuthorization, AlbumController.deleteAlbum])


module.exports = router;