const ArtistMongo = require("../../dao/artist/artist.mongo.dao");
const { responseBody } = require("../../util/responseBody");



exports.getArtists = async (req, res) => {
    try {
        const { limit = 10, offset = 0, grammy, hidden } = req.query
        const result = await ArtistMongo.getArtists(limit, offset, grammy, hidden)
        if (result.success) {
            res.staus(200).send(responseBody(200, result.data, "Artists Retrieved Successfully"))
        }
    } catch (err) {
        res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}

exports.getArtist = async (req, res) => {
    try {
        const artist_id = req.params.artist_id
        if (!artist_id) {
            throw new Error("Bad Request")
        }
        const result = await ArtistMongo.getArtist(artist_id)
        if (result.success) {
            const { data } = result
            return res.status(200).send(responseBody(200, [data], "Artist retrieved Successfully", null))
        } else {
            return res.status(404).send(404, null, "Artist Not Found", null)
        }
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}
exports.addArtist = async (req, res) => {
    try {
        const { name, grammy, hidden } = req.body;
        if (!name || !grammy || hidden == undefined) {
            throw new Error("Bad Request")
        }
        const result = await ArtistMongo.addArtist(name, grammy, hidden);
        return res.status(201).send(responseBody(201, null, "Artist Created Successfully"))
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}

exports.updateArtist = async (req, res) => {
    try {
        const artist_id = req.params.artist_id
        if (!artist_id) {
            throw new Error("Bad Request")
        }
        const result = await ArtistMongo.updateArtist(artist_id, req.body)
        if (result.success) {
            return res.status(204).send(responseBody(204, null, "Artist Updated Successfully", null))
        } else {
            return res.status(404).send(responseBody(404, null, "Artist Not Found", null))
        }
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}


exports.deleteArtist = async (req, res) => {
    try {
        const artist_id = req.params.artist_id
        if (!artist_id) {
            throw new Error("Bad Request")
        }
        const result = await ArtistMongo.deleteArtist(artist_id)
        if (result.success) {
            return res.status(200).send(responseBody(200, { artist_id }, `Artist:${result.name} Deleted Successfully`, null))
        } else {
            return res.status(404).send(responseBody(404, null, "Artist Not Found", null))
        }
    } catch (err) {
        return res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}