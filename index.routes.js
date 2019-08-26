const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

const User = require("../models/user.model");


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.route('/users').get((req, res) => {
  User.find((err, users)=> {
    if (err)
      console.log(err);
    else
      res.json(users);
  });

});

module.exports = router;
