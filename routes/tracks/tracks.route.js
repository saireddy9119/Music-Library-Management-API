const express = require("express")
const router = express.Router()
const TrackController = require("../../controllers/tracks/tracks.controller")

router.get("/", [TrackController.getTracks])
router.get("/:track_id", [TrackController.getTrack])
router.post("/add-track", [TrackController.addTrack])
router.put("/:track_id", [TrackController.updateTracks])
router.delete("/:track_id", [TrackController.deleteTrack])

module.exports = router;