const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female']  // Enforce values
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true
    },
    region: {
      type: String,
      required: true,
      trim: true
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  picture: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'], // Options for size
    required: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  temperament: {
    type: String,
    required: true,
    trim: true
  },
  vaccinationStatus: {
    type: String,
    enum: ['up-to-date', 'not-vaccinated'], // Options for vaccination status
    required: true
  },
  spayedNeutered: {
    type: String,
    enum: ['yes', 'no'], // Options for spayed/neutered status
    required: true
  },
  healthCondition: {
    type: String,
    required: true,
    trim: true
  },
  whatsapp : {
    type : Number,
    required : true,
    trim : true
  } ,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer'
  }
});

module.exports = mongoose.model('Dog', dogSchema);
