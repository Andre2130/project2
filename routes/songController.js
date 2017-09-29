const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const PlaylistModel = Schema.PlaylistModel;

// INDEX route
router.get('/', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // Use the PlaylistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once you have found the playlist in the database
            // RENDER the playlist and its EMBEDDED song info 
            // using Handlebars
            response.render('songs/index', {
                playlist: playlist
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW route
router.get('/new', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // RENDER a new form for a fresh song,
    // also passing the playlistId to use in the
    // form's ACTION
    response.render('songs/new', {
        playlistId: playlistId
    })
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // GRAB the new song info from the request body
    const newSong = request.body

    // USE the PlaylistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once you have found the playlist from the database
            // PUSH the new song object into the playlist's 
            // song array            
            playlist.songs.push(newSong)

            // SAVE the playlist and return the PROMISE
            return playlist.save()
        })
        .then((playlist) => {
            // THEN once the playlist has been saved, 
            // REDIRECT to the songs index for that playlist
            response.redirect(`/playlists/${playlistId}/songs`)
        })

})

// EDIT route
router.get('/:songId/edit', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // GRAB the song ID from the parameters
    const songId = request.params.songId

    // USE the PlaylistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist has been returned,
            // FIND the song by ID that you want to edit
            const song = playlist.songs.id(songId)

            // RENDER a form pre-populated with that song info,
            // ALSO passing the playlistId to use for the form's ACTION
            response.render('songs/edit', {
                song: song,
                playlistId: playlistId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:songId', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // GRAB the song ID from the parameters
    const songId = request.params.songId

    // GRAB the updated song object from the request body
    const updatedsong = request.body

    // USE the PlaylistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist has been returned,
            // FIND the song by ID from the playlist's songs
            const song = playlist.songs.id(songId)

            // MAP each attribute from the updated song object to
            // the same attribute on the original song
            song.name = updatedsong.name
            song.price = updatedsong.price

            // SAVE the updated playlist and return the PROMISE
            return playlist.save()
        })
        .then(() => {
            // THEN once the playlist has saved, REDIRECT to the 
            // song's SHOW page
            response.redirect(`/playlists/${playlistId}/songs/${songId}`)
        })

})

// SHOW route
router.get('/:songId', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId
    
    // GRAB the song ID from the parameters
    const songId = request.params.songId

    // USE the PlaylistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist has been returned,
            // FIND the song by ID from the playlist's songs
            const song = playlist.songs.id(songId)

            // THEN render the song info using Handlebars
            // and pass the playlistId to use in link URLs
            response.render('songs/show', {
                song: song,
                playlistId: playlistId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:songId/delete', (request, response) => {

    // GRAB the company ID from the parameters
    const playlistId = request.params.playlistId
    
    // GRAB the song ID from the parameters
    const songId = request.params.songId

    // USE the playlistModel to find the playlist by ID
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist has been returned,
            // REMOVE the song from the playlist's song array
            const song = playlist.songs.id(songId).remove()

            // THEN save the playlist and return the PROMISE
            return playlist.save()
        })
        .then(() => {
            // THEN once the playlist has saved, redirect to the 
            // playlist's songs INDEX page
            response.redirect(`/playlists/${playlistId}/songs`)
        })
})


module.exports = router