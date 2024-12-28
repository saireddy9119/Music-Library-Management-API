const Album = require("../../models/album/album.model")
const Artist = require("../../models/artist/artist.model")
const Track = require("../../models/track/track.model")
const Favorite = require("../../models/favorites/favorites.model")
const { responseBody } = require("../../util/responseBody")
const models = {
    album: Album,
    artist: Artist,
    track: Track
};


exports.getFavorites = async (category, limit, offset) => {
    const findCategory = await Favorite.find({ category }).select('-_id -__v -updatedAt').limit(limit).skip(offset).lean()
    if (findCategory.length === 0) {
        return { success: false }
    }
    const Model = models[category]
    const findCategoryName = await Promise.all(
        findCategory.map(async (item) => {
            const nameDoc = await Model.findOne({ [`${category}_id`]: item.item_id });
            return {
                ...item,
                name: nameDoc ? nameDoc.name : null,
            };
        })
    );
    return { success: true, data: findCategoryName }


}
exports.addFavorites = async (category, item_id) => {



    const Model = models[category];
    if (!Model) {
        return false
    }
    const itemExists = await Model.findOne({ [`${category}_id`]: item_id });
    if (!itemExists) {
        return false
    }

    const favorite = new Favorite({ item_id, category });
    await favorite.save();

    return true;
    // let result = false
    // if (category === "album") {
    //     const findAlbum = await Album.findOne({ album_id: item_id })
    //     if (!findAlbum) {
    //         result = true
    //     }
    // } else if (category === "artist") {
    //     const findArtist = await Artist.findOne({ artist_id: item_id })
    //     if (!findArtist) {
    //         result = true
    //     }
    // } else {
    //     const findTrack = await Track.findOne({ track_id: item_id })
    //     if (!findTrack) {
    //         result = true
    //     }
    // }
    // const favorite = new Favorite({
    //     item_id, category
    // })
    // await favorite.save()

    // return result;
}

exports.deleteFavorites = async (favorite_id) => {
    const result = await Favorite.deleteOne({ favorite_id })
    if (!result) {
        return { success: false }
    }
    return { success: true }
}