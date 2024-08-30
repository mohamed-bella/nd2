const Trainer = require('../models/trainer')
const bcrypt = require('bcrypt')

// get register page
exports.getRegister = (req, res) => {
     let message = req.flash('error')
     if (message.length > 0) {
          message = message[0]
     }
     else {
          message = null
     }
     res.render('auth/register',{
          pageTitle : "Register Page",
          lang : 'ar',
          errorMessage : message
     })
}

// get login page
exports.getLogin = (req, res) => {
     let message = req.flash('error')
     if (message.length > 0) {
          message = message[0]
     }
     else {
          message = null
     }
     res.render('auth/login',{
          pageTitle : "Login Page",
          lang : 'ar',
          errorMessage : message
     })
}

// post register
exports.postRegister = (req, res, next) => {
     const {fullname, email, password} = req.body;
   
     Trainer.findOne({email : email})
     .then(async (trainerDoc) => {
          if (trainerDoc) {
               req.flash('error', 'Email already exists')
               return res.redirect('/login')
          }
          
          const trainer = new Trainer({
               fullname : fullname,
               email : email,
               password : await bcrypt.hash(password, 12)
          })
          return trainer.save()
          .then((trainerDoc) => {
               req.session.isLogin = true
               req.session.trainer = trainerDoc
               res.redirect('/login')
          })
          .catch((err) => {
               console.log(err);
          })
     })
}
// post login
exports.postLogin = (req, res) => {
     const {email, password} = req.body
     Trainer.findOne({email : email})
     .then((trainerDoc) => {
          if (!trainerDoc) {
               req.flash('error', 'Invalid Email')
               return res.redirect('/login')
          }
          bcrypt.compare(password, trainerDoc.password)
          .then((doMatch) => {
               if (doMatch) {
                    req.session.isLogin = true
                    req.session.trainer = trainerDoc
                    return req.session.save(() => {
                         res.redirect('/')
                    })
               } else {
                    req.flash('error', 'Invalid Password')
                    return res.redirect('/login')
               }
               res.redirect('/login')
          })
          .catch((err) => {   
               console.log(err);
          })
     })
}

exports.postlogout = (req, res) => {
     req.session.destroy(() => {
          res.redirect('/')
     })
}
