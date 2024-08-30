const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')


const isLogin = (req, res, next) => {
     if(req.session.isLogin) {
            return res.redirect('/dashboard')
     } else {
          next();
     }
}

router.get('/register',isLogin, authController.getRegister)
router.get('/login', isLogin, authController.getLogin)
router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)
router.post('/logout', authController.postlogout)

module.exports = router;
