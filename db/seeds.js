require('dotenv').config();

var mongoose = require('mongoose');
var Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

var PlaylistModel = Schema.PlaylistModel;
var SongModel = Schema.SongModel;

PlaylistModel.remove({}, function (err) {
    console.log(err);
});

const soulSauce = new PlaylistModel({ name: 'SoulSauce', country: 'US'})
const trapSauce = new PlaylistModel({ name: 'TrapSauce', country: 'US'})
const hotSauce = new PlaylistModel({ name: 'HotSauce', country: 'Canada'})

const littleSong = new SongModel({ name: 'Little Song', price: 123.45}) 
const bigSong = new SongModel({ name: 'Big Song', price: 123.45}) 
const blueSong = new SongModel({ name: 'Blue Song', price: 123.45}) 

const playlists = [soulSauce, trapSauce, hotSauce]
const songs = [littleSong, bigSong, blueSong]


// Here we assign some projects to each student.
playlists.forEach((playlist) => {

    playlist.songs = songs

    playlist.save()
        .then((playlist) => {
            console.log(`${playlist.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();