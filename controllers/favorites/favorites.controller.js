
const favoriteMongo = require("../../dao/favorites/favorites.mongo.dao")
const { responseBody } = require("../../util/responseBody")

exports.getFavorites = async (req, res) => {
    try {
        const { category } = req.params
        if (!category) {
            throw new Error("Bad Request")
        }
        const { limit = 10, offset = 0 } = req.query
        const result = await favoriteMongo.getFavorites(category, limit, offset)
        if (!result.success) {
            return res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
        }
        res.status(200).send(responseBody(200, result?.data, "Favorites retrieved Successfully", null))
    } catch (err) {
        res.status(401).send(responseBody(401, null, err.message, null))
    }
}
exports.addFavorites = async (req, res) => {
    try {
        const { category, item_id } = req.body
        const result = await favoriteMongo.addFavorites(category, item_id)
        if (!result) {
            res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
        }
        res.status(201).send(responseBody(201, null, "Favorite Added Successfully", null))
    } catch (err) {
        return res.status(400).send(responseBody(400, null, err.message, null))
    }
}


exports.deleteFavorite = async (req, res) => {
    try {
        const { favorite_id } = req.params
        if (!favorite_id) {
            throw new Error("Bad Request")
        }
        const result = await favoriteMongo.deleteFavorites(favorite_id)
        if (!result.success) {
            res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
        }
        return res.status(200).send(responseBody(200, null, "Favorite Removed Successfully", null))
    } catch (err) {
        res.status(401).send(responseBody(401, null, err.message, null))
    }
}