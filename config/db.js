const mongoose = require('mongoose')
require('dotenv').config()

const dbURI = process.env.dbURI ;


const connectDB = async () => {
    try {
          await mongoose.connect(dbURI)
          .then(() => console.warn('CONNECTED TO DATABASE'))
    } catch (e) {
          console.error(e)
    }
}

module.exports = connectDB;