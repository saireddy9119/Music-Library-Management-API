const Artist = require("../../models/artist/artist.model")



exports.getArtists = async (limit, offset, grammy, hidden) => {
    const query = {};
    if (grammy !== undefined) query.grammy = parseInt(grammy) > 0;
    if (hidden !== undefined) query.hidden = hidden === "true";
    const artists = await Artist.find(query).select("-_id -__v -updatedAt").skip(offset).limit(limit).lean();
    if (artists.length === 0) {
        return { success: true, data: [] }
    }
    return { success: true, data: artists }
}
exports.getArtist = async (artist_id) => {
    const findArtist = await Artist.findOne({ artist_id }).select('-_id -__v').lean()
    if (!findArtist) {
        return { success: false }
    }
    return { success: true, data: findArtist }
}
exports.addArtist = async (name, grammy, hidden) => {
    const artist = new Artist({
        name, grammy, hidden
    })
    await artist.save()
    return artist
}

exports.updateArtist = async (artist_id, req) => {
    const findId = await Artist.findOne({ artist_id })
    if (!findId) {
        return { success: false }
    }
    const result = await Artist.findOneAndUpdate(
        { artist_id },
        { $set: req },
        { new: true }
    )
    return { success: true }
}


exports.deleteArtist = async (artist_id) => {
    const findId = await Artist.findOne({ artist_id }).lean()
    if (!findId) {
        return { success: false }
    }

    const result = await Artist.deleteOne({ artist_id })
    return { success: true, name: findId.name }
}