const { responseBody } = require("../../util/responseBody");
const AlbumMongo = require("../../dao/albums/albums.mongo.dao");
const { response } = require("express");


exports.getAlbums = async (req, res) => {
    try {
        const { limit = 10, offset = 0, artist_id, hidden } = req.query;
        const result = await AlbumMongo.getAlbums(limit, offset, artist_id, hidden)
        if (result.success) {
            res.status(200).send(responseBody(200, result.data, "Albums Retrieved Successfully", null))
        }
    } catch (err) {
        res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}

exports.getAlbum = async (req, res) => {
    try {
        const album_id = req.params.album_id;
        const result = await AlbumMongo.getAlbum(album_id)
        if (!result.success) {
            throw new Error("Resource Doesn't Exist")
        }
        const { data } = result
        return res.status(200).send(responseBody(200, data, "Album retrieved Successfully", null))
    } catch (err) {
        res.status(404).send(responseBody(404, null, err.message, null))
    }
}
exports.addAlbum = async (req, res) => {
    try {
        const request = req.body;
        const { artist_id, name, year } = request
        if (!artist_id || !name || !year) {
            throw new Error("Bad Request")
        }
        const addAlbum = await AlbumMongo.addAlbum(request)
        if (!addAlbum.success) {
            return res.status(404).send(responseBody(404, null, "Resouce Doesn't exist", null))
        }
        res.status(201).send(responseBody(201, null, "Album created Successfully", null))
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}


exports.updateAlbum = async (req, res) => {
    try {
        const album_id = req.params.album_id
        if (!album_id) {
            throw new Error("Bad Request")
        }
        const result = await AlbumMongo.updateAlbum(album_id, req.body)
        if (!result.success) {
            res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
        }
        return res.status(204).send("")
    } catch (err) {
        res.status(400).send(responseBody(400, null, "Bad Request", null))
    }
}


exports.deleteAlbum = async (req, res) => {
    try {
        const album_id = req.params.album_id
        if (!album_id) {
            throw new Error("Bad Request")
        }
        const result = await AlbumMongo.deleteAlbum(album_id)
        if (!result.success) {
            return res.status(404).send(responseBody(404, null, "Resource Doesn't Exist"))
        }
        const { name } = result
        return res.status(200).send(responseBody(200, null, `Album:${name} Deleted Successfully`, null))
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}