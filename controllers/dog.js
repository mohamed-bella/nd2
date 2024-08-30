const Dog = require('../models/dog')

exports.getDog = (req, res) => {
     const id = req.params.id
     Dog.findById(id)
     .then(dog => {
          // check if dog exist
          if (!dog) {
               return res.redirect('/')
          }

          res.render('public/dog-details',{
               pageTitle : dog.name,
               lang : 'ar',
               dog,
               trainer : req.session.trainer
          })
     })
     .catch(err => console.log(err))

}