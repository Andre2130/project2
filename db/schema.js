const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    songs: [SongSchema]
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})


const PlaylistModel = mongoose.model('Playlist', PlaylistSchema)
const SongModel = mongoose.model('Song', SongSchema)
const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    PlaylistModel: PlaylistModel,
    SongModel: SongModel,
    UserModle: UserModel
}