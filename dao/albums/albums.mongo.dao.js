
const Album = require("../../models/album/album.model")
const Artist = require("../../models/artist/artist.model")



exports.getAlbums = async (limit, offset, artist_id, hidden) => {
    const query = {};
    if (artist_id) query.artist_id = artist_id;
    if (hidden !== undefined) query.hidden = hidden === "true";
    const albums = await Album.find(query).skip(parseInt(offset)).limit(parseInt(limit)).lean();
    return { success: true, data: albums }
}
exports.getAlbum = async (album_id) => {
    const findAlbum = await Album.findOne({ album_id }).select('-_id')
    if (!findAlbum) {
        return { success: false }
    }
    const extractedAlbum = findAlbum.toJSON()
    return { success: true, data: extractedAlbum }
}
exports.addAlbum = async (request) => {
    const { artist_id, name, year, hidden } = request
    const findId = await Artist.findOne({ artist_id });
    if (!findId) {
        return { success: false }
    }
    const album = new Album({
        name, year, hidden
    })
    await album.save()
    return { success: true }
}


exports.updateAlbum = async (album_id, request) => {
    const findAlbum = await Album.findOne({ album_id })
    if (!findAlbum) {
        return { success: false }
    }
    const result = await Album.findOneAndUpdate(
        { album_id },
        request,
        { new: true }
    )
    return { success: true }
}


exports.deleteAlbum = async (album_id) => {
    const findAlbum = await Album.findOne({ album_id })
    if (!findAlbum) {
        return { success: false }
    }
    const extractedAlbum = findAlbum.toJSON()
    const result = await Album.deleteOne({ album_id })
    return { success: true, name: extractedAlbum.name }
}