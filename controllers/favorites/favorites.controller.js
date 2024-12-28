
const favoriteMongo = require("../../dao/favorites/favorites.mongo.dao")
const { responseBody } = require("../../util/responseBody")

exports.getFavorites = async (req, res) => {
    const { category, limit = 10, offset = 0 } = req.query
    const result = await favoriteMongo.getFavorites(category, limit, offset)
    if (!result.success) {
        return res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
    }
    res.status(200).send(responseBody(200, result?.data, "Favorites retrieved Successfully", null))
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
    const favorite_id = req.params.favorite_id
    const result = await favoriteMongo.deleteFavorites(favorite_id)
    if (!result.success) {
        res.status(404).send(responseBody(404, null, "Resource Doesn't Exist", null))
    }
    return res.status(200).send(responseBody(200, null, "Favorite Removed Successfully", null))
}