const router = require('express').Router();

const { registerUser } = require('../users/user.services');
const authServices = require('../users/user.services')

router.post('/register', registerUser)

router.post('/login', authServices.login)

module.exports = router