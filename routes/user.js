const express = require('express')
const {registerUser, login} = require('../controllers/user')
const router = express.Router()

// http://localhost:5000/api/v1/users/login
router.post('/login', login)

// http://localhost:5000/api/v1/users/register
router.post('/register', registerUser)

module.exports = router;