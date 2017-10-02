var express = require('express');
var router = express.Router();

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
