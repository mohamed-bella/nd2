const Dog = require('../models/dog')
const axios = require('axios');
const FormData = require('form-data');

exports.getDashboard =  async (req,res) => {
          const trainerID = req.session.trainer._id
          const dogs = await Dog.find({ owner: trainerID }).exec();
          res.render('trainer/dashboard', {
               pageTitle : `${req.session.trainer.fullname}'s Dashboard`,
               errorMessage : req.flash('error'),
               lang : 'ar',
               successMessage : req.flash('success'),
               dogs,
          })
}

exports.deleteDogListening = (req, res, ) => {
     const dogID = req.params.id;
     Dog.findByIdAndDelete(dogID)
     .then((result) => {
          console.log(result);
          req.flash('success', 'Your Listening deleted Successfully ')
          res.redirect('/dashboard')
     })
}

exports.getEditDogListening = async (req, res) => {
     const dogID = req.params.id;
     const dog = await Dog.findById(dogID);  
     const trainerID = req.session.trainer._id;
     if (!dog) {
          return res.status(404).send('Dog not found');
        }
        if (dog.owner.toString() !== trainerID.toString()) {
          return res.status(403).send('You are not authorized to edit this listing');
        }

       Dog.findById(dogID)
       .then((dog) => {
            res.render('trainer/edit-dog-details', {
                 pageTitle : 'Edit',
                 lang : 'ar',
                 dog
            })
       })
}

        


exports.postEditDogListening = async (req, res) => {
  const dogID = req.params.id;
  const { name, breed, age, sex, description, location, price } = req.body;
  const trainerID = req.session.trainer._id; // Assuming the user ID is stored in the session
  const dog = await Dog.findById(dogID);
  if (!dog) {
     return res.status(404).send('Dog not found');
   }

  try {
    // Prepare data for update
    let updatedDogData = {
      name,
      breed,
      age,
      sex,
      description,
      price,
    };
        // Handle location format
        if (typeof location === 'string') {
          // If location is a single string (e.g., "Casablanca, Grand Casablanca")
          const [city, region] = location.split(',').map(part => part.trim());
          updatedDogData.location = { city, region };
        } else if (typeof location === 'object') {
          // If location is an object with city and region properties
          updatedDogData.location = {
            city: location.city,
            region: location.region,
          };
        }


    // If a new picture is uploaded, handle the upload to Telegra.ph
    if (req.file) {
      const form = new FormData();
      form.append('file', req.file.buffer, req.file.originalname);

      const response = await axios.post('https://telegra.ph/upload', form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      if (response.data && response.data[0] && response.data[0].src) {
        const pictureUrl = `https://telegra.ph${response.data[0].src}`;
        updatedDogData.picture = pictureUrl;
      }
    }
    console.log(updatedDogData)
    // Update the dog data in the database
    await Dog.findByIdAndUpdate(dogID, updatedDogData);

    // Redirect to the updated dog's listing page or another relevant page
    res.redirect(`/chien/${dogID}`);
  } catch (error) {
    console.error('Error updating dog listing:', error);
    res.status(500).send('An error occurred while updating the dog listing.');
  }
};
