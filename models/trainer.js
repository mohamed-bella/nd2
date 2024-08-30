const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
     fullname: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          default: 'trainer'
     },
     image: {
          type: String,
          default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
     },
     bio: {
          type: String,
          default: 'bio'
     }

}, {
     timestamps: true
})

module.exports = mongoose.model('Trainer', trainerSchema)