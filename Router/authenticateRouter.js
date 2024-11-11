const express = require("express");
const router = express.Router();
const {userRegister,userLogin} = require('../Controller/Authentication')

router.post('/register', userRegister)
router.post('/userLogin', userLogin)

module.exports = router

