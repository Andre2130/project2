const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const PlaylistModel = Schema.PlaylistModel;

// INDEX route (all routes structered from previous HW)
router.get('/', (request, response) => {

    // FIND all of the playlists in the database
    PlaylistModel.find({})
        .then((playlists) => {

            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('playlists/index', {
                playlists: playlists
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW route
router.get('/new', (request, response) => {
    // RENDER an empty form for the new playlist
    response.render('playlists/new')
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the new playlist info as a JS object from the request body
    const newPlaylist = request.body

    // CREATE and SAVE a new playlist using the playlistModel
    PlaylistModel.create(newPlaylist)
        .then(() => {
            // THEN once the model has saved, redirect to the playlists INDEX
            response.redirect('/playlists')
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT route
router.get('/:playlistId/edit', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // FIND the playlist by ID using the playlistModel
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist has been returned from
            // the database, RENDER a form containing the current
            // playlist information
            response.render('playlists/edit', {
                playlist: playlist
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:playlistId', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // GRAB the updated playlist info from the request body
    const updatedPlaylist = request.body

    // Use Mongoose to find the playlist by ID and update it with the 
    // new playlist info. Be sure to include the {new: true} option as your
    // third parameter
    PlaylistModel.findByIdAndUpdate(playlistId, updatedPlaylist, { new: true })
        .then(() => {
            // THEN once the new playlist info has been saved,
            // redirect to that playlist's SHOW page
            response.redirect(`/playlists/${playlistId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW route
router.get('/:playlistId', (request, response) => {

    // GRAB the playlist ID from the parameters
    const playlistId = request.params.playlistId

    // Use the playlistModel to find the playlist by ID in the database
    PlaylistModel.findById(playlistId)
        .then((playlist) => {
            // THEN once the playlist comes back from the database,
            // render the single playlist's info using Handlebars
            response.render('playlists/show', {
                playlist: playlist
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:playlistId/delete', (request, response) => {

    // GRAB the playlist ID that you want to delete from the parameters
    const playlistId = request.params.playlistId

    // Use the playlistModel to find and delete the playlist in the database
    PlaylistModel.findByIdAndRemove(playlistId)
        .then(() => {

            // THEN once the playlist has been deleted from the database
            // redirect back to the playlists INDEX
            response.redirect('/playlists')
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router