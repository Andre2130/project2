var express = require('express');
var router = express.Router();

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

/* GET users listing. */
// INDEX route
router.get('/', (request, response) => {
  
      // FIND all of the playlists in the database
      UserModel.find({})
          .then((users) => {
  
              // THEN once they come back from the database
              // RENDER them in Handlebars
              response.render('users/index', {
                  users: users
              })
          })
          .catch((error) => {
              console.log(error)
          })
  })
// NEW route
router.get('/new', (request, response) => {
  // RENDER an empty form for the new user
  response.render('users/new')
})

// CREATE route
router.post('/', (request, response) => {

  // GRAB the new user info as a JS object from the request body
  const newUser = request.body

  // CREATE and SAVE a new user using the userModel
  UserModel.create(newUser)
      .then(() => {
          // THEN once the model has saved, redirect to the users INDEX
          response.redirect('/users')
      })
      .catch((error) => {
          console.log(error)
      })
})

// EDIT route
router.get('/:userId/edit', (request, response) => {

  // GRAB the user ID from the parameters
  const userId = request.params.userId

  // FIND the user by ID using the userModel
  UserModel.findById(userId)
      .then((user) => {
          // THEN once the user has been returned from
          // the database, RENDER a form containing the current
          // user information
          response.render('users/edit', {
              user: user
          })
      })
      .catch((error) => {
          console.log(error)
      })
})

// UPDATE route
router.put('/:userId', (request, response) => {

  // GRAB the user ID from the parameters
  const userId = request.params.userId

  // GRAB the updated user info from the request body
  const updatedUser = request.body

  // Use Mongoose to find the user by ID and update it with the 
  // new user info. Be sure to include the {new: true} option as your
  // third parameter
  UserModel.findByIdAndUpdate(userId, updatedUser, { new: true })
      .then(() => {
          // THEN once the new user info has been saved,
          // redirect to that user's SHOW page
          response.redirect(`/users/${userId}`)
      })
      .catch((error) => {
          console.log(error)
      })
})

// SHOW route
router.get('/:userId', (request, response) => {

  // GRAB the user ID from the parameters
  const userId = request.params.userId

  // Use the userModel to find the user by ID in the database
  UserModel.findById(userId)
      .then((user) => {
          // THEN once the user comes back from the database,
          // render the single user's info using Handlebars
          response.render('users/show', {
              user: user
          })
      })
      .catch((error) => {
          console.log(error)
      })
})

// DELETE route
router.get('/:userId/delete', (request, response) => {

  // GRAB the user ID that you want to delete from the parameters
  const userId = request.params.userId

  // Use the userModel to find and delete the user in the database
  UserModel.findByIdAndRemove(userId)
      .then(() => {

          // THEN once the user has been deleted from the database
          // redirect back to the users INDEX
          response.redirect('/users')
      })
      .catch((error) => {
          console.log(error)
      })
})
module.exports = router;
