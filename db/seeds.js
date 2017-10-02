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
var UserModel = Schema.UserModle;

PlaylistModel.remove({}, function (err) {
    console.log(err);
});

UserModel.remove({}, function (err) {
    console.log(err);
});

const soulSauce = new PlaylistModel({ name: 'Soul', creator: 'US'})
const trapSauce = new PlaylistModel({ name: 'Trap', creator: 'US'})
const hotSauce = new PlaylistModel({ name: 'Hot', creator: 'Canada'})

const controlla = new SongModel({ name: 'Controlla', length: 123.45}) 
const oneDance = new SongModel({ name: 'One Dance', length: 123.45}) 
const uWithMe = new SongModel({ name: 'U With Me?', length: 123.45}) 

const controlla2 = new SongModel({ name: 'Controlla2', length: 123.45}) 
const oneDance2 = new SongModel({ name: 'One Dance2', length: 123.45}) 
const uWithMe2 = new SongModel({ name: 'U With Me?2', length: 123.45}) 

const andre = new UserModel({name: 'Andre', email: 'Andre@sauceradio.com'})

const playlists = [soulSauce, trapSauce, hotSauce]
const songs = [controlla, oneDance, uWithMe]
const song2 = [controlla2, oneDance2, uWithMe2]
const users = [andre]


// Here we assign some projects to each student.
playlists.forEach((playlist) => {

    playlist.songs = songs
    soulSauce.songs = song2

    playlist.save()
        .then((playlist) => {
            console.log(`${playlist.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});
users.forEach((user) => {
    
        user.playlists = playlists
    
        andre.save()
            .then((user) => {
                console.log(`${user.name} saved!`)
            })
            .catch((error) => {
                console.log(error)
            })
    });

// Disconnect from database
db.close();