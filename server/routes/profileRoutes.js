const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.get('/profiles', profileController.getAllProfile)
router.post('/profiles', profileController.createProfile)
router.put('/profiles/:id', profileController.updateProfile)
router.delete('/profiles/:id', profileController.deleteProfile)

router.post('/comment', profileController.postComment)

module.exports = router
