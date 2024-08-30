const Dog = require('../models/dog')

exports.getHome = (req, res) => {
     try {
          const { breed, city, age, sex } = req.query;
      
          // Build the filter object
          let filter = {};
      
          if (breed) {
            filter.breed = breed;
          }
          if (city) {
            filter['location.city'] = city;
          }
          if (age) {
            filter.age = age;
          }
          if (sex) {
            filter.sex = sex;
          }

     Dog.find(filter).sort({createdAt : -1})
     .then(dogs => {
          res.render('public/home',{
               pageTitle : "Aceuill - Ndressilik Marketplace",
               lang : 'ar',
               dogs
          })
     })
} catch (e) {
     console.log(e)
}
}


exports.getMarket = (req, res) => {
     Dog.find().sort({createdAt : -1})
     .then(dogs => {
          res.render('public/marche',{
               pageTitle : "Marche Canine",
               lang : 'ar',
               dogs
          })
     })
}

exports.getTrainers = (req, res) => {
     res.render('public/trainers',{
          pageTitle : "Nos Dresseur Partous Sur Le Maroc",
          lang : 'ar',
     
})
}


