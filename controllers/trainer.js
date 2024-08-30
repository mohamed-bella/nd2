const Trainer = require('../models/trainer')
const Dog = require('../models/dog')
const multer = require('multer')
const bcrypt = require('bcrypt')
const axios = require('axios');
const FormData = require('form-data')


exports.getSellADog = (req, res) => {
     res.render('public/sell-a-dog',{
          pageTitle : "Vendre Votre Chien",
          // isAuth : false,
          lang : 'ar',
     })
}

exports.postSellADog = async (req, res) => {
  const trainerID = req.session.trainer._id;
  const {
    name,
    breed,
    age,
    sex,
    size,
    color,
    temperament,
    vaccinationStatus,
    spayedNeutered,
    healthCondition,
    description,
    city,
    region,
    price,
    whatsapp
  } = req.body;

  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }

    const form = new FormData();
    form.append('file', req.file.buffer, req.file.originalname);

    // Upload the image to Telegra.ph
    const response = await axios.post('https://telegra.ph/upload', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    if (response.data && response.data[0] && response.data[0].src) {
      const imageUrl = `https://telegra.ph${response.data[0].src}`;

      const newDog = new Dog({
        name: name,
        breed: breed,
        age: age,
        sex: sex,
        size: size,
        color: color,
        temperament: temperament,
        vaccinationStatus: vaccinationStatus,
        spayedNeutered: spayedNeutered,
        healthCondition: healthCondition,
        description: description,
        location: { city, region },
        price: price,
        picture: imageUrl,
        whatsapp : whatsapp,
        owner: trainerID
      });

      await newDog.save();
      return res.redirect('/marche-canine');
    } else {
      return res.status(500).json({ error: 'Failed to upload image.' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};
