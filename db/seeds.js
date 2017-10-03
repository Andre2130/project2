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
var UserModel = Schema.UserModel;

PlaylistModel.remove({}, function (err) {
    console.log(err);
});

UserModel.remove({}, function (err) {
    console.log(err);
});

const soulSauce = new PlaylistModel({ name: 'Soul', creator: 'Andre'})
const trapSauce = new PlaylistModel({ name: 'Trap', creator: 'Andre'})
const hotSauce = new PlaylistModel({ name: 'Hot', creator: 'Sauce Radio'})

const controlla = new SongModel({ name: 'Controlla', artist: 'Drake', mp3:'http://wethesauce.com/wp-content/uploads/2016/06/11.-Controlla.mp3'}) 
const sleepWalkin = new SongModel({ name: 'Sleep Walkin', artist: 'Mozzy', mp3:'http://wethesauce.com/wp-content/uploads/2017/08/05.-Sleep-Walkin.mp3'}) 
const uWithMe = new SongModel({ name: 'U With Me?', artist: 'Drake', mp3:'http://wethesauce.com/wp-content/uploads/2016/06/03.-U-With-Me.mp3'}) 
const getYou = new SongModel({ name: 'Get You', artist: 'Daniel Caesar (feat. Kali Uchis)', mp3:'http://wethesauce.com/wp-content/uploads/2017/08/01-Get-You-feat.-Kali-Uchis.mp3'}) 
const oneDance = new SongModel({ name: 'One Dance', artist: 'Drake(Ft. Wizkid & Kyla)', mp3:'http://wethesauce.com/wp-content/uploads/2016/06/12.-One-Dance-Ft.-Wizkid-Kyla.mp3'}) 
const iDoLoveYou = new SongModel({ name: 'I do love you', artist: 'GQ', mp3:'http://wethesauce.com/wp-content/uploads/2017/07/gq_i_do_love_you-lookingforlyrics.org_.mp3'}) 
const bankAccount = new SongModel({ name: 'Bank Account', artist: '21 Savage', mp3:'http://wethesauce.com/wp-content/uploads/2017/07/02.-Bank-Account.mp3'}) 
const wildThoughts = new SongModel({ name: 'Wild thoughts', artist: 'DJ Khaled(feat. Rihanna & Bryson Tiller)', mp3:'http://wethesauce.com/wp-content/uploads/2017/06/04-Wild-Thoughts-feat.-Rihanna-Br.m4a'}) 
const firstDayOut = new SongModel({ name: 'First Day Out', artist: 'Tee Grizzley', mp3:'http://wethesauce.com/wp-content/uploads/2017/04/02.-First-Day-Out.mp3'}) 

const andre = new UserModel({name: 'Andre', email: 'Andre@sauceradio.com'})

const playlists = [soulSauce, trapSauce, hotSauce]
const trap = [sleepWalkin, bankAccount, firstDayOut]
const soul = [controlla, getYou, iDoLoveYou]
const hot = [oneDance, uWithMe,wildThoughts]
const users = [andre]


// Here we assign some projects to each student.
playlists.forEach((playlist) => {

    trapSauce.songs = trap
    soulSauce.songs = soul
    hotSauce.songs = hot

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