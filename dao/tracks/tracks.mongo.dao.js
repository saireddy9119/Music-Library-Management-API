
const Tracks = require("../../models/track/track.model")
const Album = require("../../models/album/album.model")
const Artist = require("../../models/artist/artist.model")

exports.getTracks = async (album_id, artist_id, hidden, limit, offset) => {
    try {
        const query = {}
        if (album_id) query.album_id = album_id
        if (artist_id) query.artist_id = artist_id
        if (hidden !== undefined) query.hidden == hidden == true
        const tracks = await Tracks.find(query).select("-_id -__v -updatedAt").skip(parseInt(offset)).limit(parseInt(limit)).lean();
        return { success: true, data: tracks }
    } catch (err) {
        return { success: false, error: error.message };
    }
}

exports.getTrack = async (track_id) => {
    try {
        const findTrack = await Tracks.findOne({ track_id })
            .select('-_id -__v -updatedAt -artist_id -album_id')
            .lean();

        if (!findTrack) {
            return { success: false };
        }

        const { artist_id, album_id } = await Tracks.findOne({ track_id })
            .select('artist_id album_id')
            .lean();

        const [findArtist, findAlbum] = await Promise.all([
            Artist.findOne({ artist_id }).select('name -_id').lean(),
            Album.findOne({ album_id }).select('name -_id').lean(),
        ]);

        if (!findArtist || !findAlbum) {
            return { success: false };
        }

        return {
            success: true,
            data: {
                ...findTrack,
                artist_name: findArtist.name,
                album_name: findAlbum.name,
            },
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
};


exports.addTrack = async (request) => {
    try {
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
    } catch (err) {
        return { success: false, error: err.message }
    }
}


exports.updateTracks = async (track_id, request) => {
    try {
        const result = await Tracks.findOneAndUpdate(
            { track_id },
            { $set: request },
            { new: true }
        )
        if (!result) {
            return { success: false }
        }
        return { success: true }
    } catch (err) {
        return { sucess: false, error: err.message }
    }
}

exports.deleteTracks = async (track_id) => {
    try {
        const findTrack = await Tracks.findOne({ track_id })
        if (!findTrack) {
            return { success: false }
        }
        const name = findTrack.toJSON()
        const result = await Tracks.deleteOne({ track_id })
        result.name = name.name
        return { success: true, name: result.name }
    } catch (err) {
        return { success: false, error: err.message }
    }
}