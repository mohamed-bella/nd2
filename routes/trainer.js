const express = require('express')
const multer = require('multer')
const router = express.Router()
const trainerController = require('../controllers/trainer')
const dogController = require('../controllers/dog')
const storage = multer.memoryStorage();
const upload = multer({ storage });

const isAuth = require('../middlewares/is-auth')


router.get('/vendre-votre-chien'  ,isAuth, trainerController.getSellADog)
router.post('/vendre-votre-chien', isAuth,upload.single('picture'), trainerController.postSellADog)

router.get('/chien/:id',dogController.getDog)

module.exports = router;