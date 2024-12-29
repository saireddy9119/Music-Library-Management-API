const express = require("express")
const router = express.Router()
const TrackController = require("../../controllers/tracks/tracks.controller")
const AuthController = require("../../auth/permissions.controller")

router.get("/", [AuthController.validAuthorization, TrackController.getTracks])
router.get("/:track_id", [AuthController.validAuthorization, TrackController.getTrack])
router.post("/add-track", [AuthController.validAuthorization, TrackController.addTrack])
router.put("/:track_id", [AuthController.validAuthorization, TrackController.updateTracks])
router.delete("/:track_id", [AuthController.validAuthorization, TrackController.deleteTrack])

module.exports = router;