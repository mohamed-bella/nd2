const router = require('express').Router();

const dashboardController = require('../controllers/dashboard')
const isAuth = require('../middlewares/is-auth')

router.get('/', isAuth ,dashboardController.getDashboard ) 
router.post('/chien/:id/delete', isAuth , dashboardController.deleteDogListening ) 
router.get('/chien/:id/edit', isAuth , dashboardController.getEditDogListening ) 
router.post('/chien/:id/edit', isAuth , dashboardController.postEditDogListening ) 
module.exports = router; 