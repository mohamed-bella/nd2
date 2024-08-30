const isAuth = (req, res, next) => {
     if(!req.session.isLogin && !req.session.trainer) {
           res.redirect('/login')
     } else {
          next();
     }
}




module.exports = isAuth