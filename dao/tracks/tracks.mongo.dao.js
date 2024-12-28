
const Tracks = require("../../models/track/track.model")
const Album = require("../../models/album/album.model")
const Artist = require("../../models/artist/artist.model")

exports.getTracks = async (album_id, artist_id, hidden, limit, offset) => {
    const query = {}
    if (album_id) query.album_id = album_id
    if (artist_id) query.artist_id = artist_id
    if (hidden !== undefined) query.hidden == hidden == true
    const tracks = await Track.find(query).skip(parseInt(offset)).limit(parseInt(limit)).lean();
    return { success: true, data: tracks }
}
exports.getTrack = async (track_id) => {
    const findTrack = await Tracks.findOne({ track_id }).select('-_id')
    if (!findTrack) return { success: false }
    let result = findTrack.toJSON()
    const { artist_id, album_id } = result
    const findArtist = await Artist.findOne({ artist_id })
    const findAlbum = await Album.findOne({ album_id })
    const findArtistName = findArtist.toJSON()
    const findAlbumName = findAlbum.toJSON()
    result.album_name = findAlbumName.name
    result.artist_name = findArtistName.name
    delete result.artist_id
    delete result.album_id
    return { success: true, data: result }
}

exports.addTrack = async (request) => {
    const { artist_id, album_id, name, duration, hidden } = request
    const findArtist = await Artist.findOne({ artist_id })
    const findAlbum = await Album.findOne({ album_id })
    if (!findArtist && !findAlbum) {
        return { success: false }
    }
    const track = new Tracks({
        artist_id,
        album_id,
        name,
        duration,
        hidden
    })
    await track.save()
    return { success: true }
}


exports.updateTracks = async (track_id, request) => {
    const result = await Tracks.findOneAndUpdate(
        { track_id },
        request,
        { new: true }
    )
    if (!result) {
        return { success: false }
    }
    return { success: true }
}

exports.deleteTracks = async (track_id) => {
    const findTrack = await Tracks.findOne({ track_id })
    if (!findTrack) {
        return { success: false }
    }
    const name = findTrack.toJSON()
    const result = await Tracks.deleteOne({ track_id })
    result.name = name.name
    return { success: true, name: result.name }
}