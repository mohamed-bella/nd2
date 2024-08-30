const express = require('express')
const router = express.Router()

const publicController = require('../controllers/public')

router.get('/',publicController.getHome)
router.get('/marche-canine',publicController.getMarket)
router.get('/nos-dresseurs',publicController.getTrainers)
router.get('/about', (req,res) =>{
     res.render('public/about', {
          pageTitle : 'A propos de Ndressilik - ndressilik'
     })
})

router.get('/contact', (req,res) =>{
     res.render('public/contact', {
          pageTitle : 'Contacter Ndressilik - ndressilik'
     })
})

module.exports = router;