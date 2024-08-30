const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const app = express()

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.listen(process.env.PORT || 5000, () => {
     console.warn(`Listening on port ${process.env.PORT}`)
})

// store session to database
const store = new MongoDBStore({
     uri: process.env.dbURI,
     collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
     console.log(error);
});

// Set up session and flash middleware
app.use(session({
     secret: 'your-secret-key', // Replace with your secret key
     resave: false,
     saveUninitialized: true,
     store: store
 }));

connectDB();

app.use(flash())

app.use((req, res, next) => {
     // Set app.locals.isLogin based on req.session.isLogin
     res.locals.isLogin = req.session.isLogin || false;
     
     next();
 });

const authRoutes = require('./routes/auth')
app.use(authRoutes)

const publicRoutes = require('./routes/public')
app.use(publicRoutes)

const trainerRoutes = require('./routes/trainer')
app.use(trainerRoutes)

const dashboardRoutes = require('./routes/dashboard')
app.use('/dashboard', dashboardRoutes)

// app.use((req,res) => {
//      res.status(404).render('public/404', {
//           pageTitle : 'PAGE TO FOUND'
//      })
// })


