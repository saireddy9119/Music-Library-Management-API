const TrackMongo = require("../../dao/tracks/tracks.mongo.dao")
const { responseBody } = require("../../util/responseBody")

exports.getTracks = async (req, res) => {
    try {
        const { album_id, artist_id, hidden, limit, offset } = req.query
        const result = await TrackMongo.getTracks(album_id, artist_id, hidden, limit, offset)
        return res.status(200).send(responseBody(200, result.data, "Tracks Retrived Sucessfully", null))
    } catch (err) {
        res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}
exports.getTrack = async (req, res) => {
    try {
        const { track_id } = req.params
        const result = await TrackMongo.getTrack(track_id)
        if (!result.success) {
            return res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
        }
        const { data } = result
        return res.status(200).send(responseBody(200, data, "Track retrieved successfully", null))
    } catch (err) {
        res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}

exports.addTrack = async (req, res) => {
    try {
        const { track_id, album_id, name, duration } = req.body
        if (!track_id || album_id || !name || !duration) throw new Error("Bad Request")
        const result = await TrackMongo.addTrack(req.body)
        if (!result.success) {
            res.status(404).send(responseBody(404, null, "Resource Doesn't Exists", null))
        }
        return res.status(201).send(responseBody(201, null, "Track Created Successfully"))
    } catch (err) {
        res.status(400).send(responseBody(400, null, err.message, null))
    }
}

exports.updateTracks = async (req, res) => {

    const { track_id } = req.params
    const updated = { ...req.body }
    const result = await TrackMongo.updateTracks(track_id, updated)
    if (!result.success) {
        return res.status(404).send(responseBody(404, null, "Resource Doesn't Exists", null))
    }
    return res.status(204).send()
}

exports.deleteTrack = async (req, res) => {
    const { track_id } = req.params
    const result = await TrackMongo.deleteTracks(track_id)
    if (!result.success) {
        return res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
    }
    return res.status(200).send(responseBody(200, null, `Track:${result.name} Deleted Successfully`, null))
}