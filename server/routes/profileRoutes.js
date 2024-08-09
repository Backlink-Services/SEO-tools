const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const authController = require('../controllers/authController')

router.use(authController.protect)
// router.use(authController.restrictTo('admin'))

router.get('/profiles', profileController.getAllProfile)
router.post('/profiles', profileController.createProfile)
router.put('/profiles/:id', profileController.updateProfile)
router.delete('/profiles/:id', profileController.deleteProfile)

router.post('/comment', profileController.profileComment)

module.exports = router
