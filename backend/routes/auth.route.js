const express = require('express')
const { signup, login, logout, check } = require('../controllers/auth.controller')
const authenticate = require("../middleware/auth.middleware")


const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/authenticate', authenticate, check)


module.exports = router
