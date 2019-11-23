const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()

const passport = require('passport')

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const tableRoutes = require('./routes/table')

const config = require('./config')
const mongoLink = process.env["MONGO_URI"] || config.mongoURI

const sgMail = require('@sendgrid/mail');
const keys = require('./config')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



mongoose.connect(mongoLink)
  .then(() => console.log('Mongo connected.'))
  .catch(error => console.log(error))


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())


app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/table', tableRoutes)

app.use('/uploads', express.static('uploads'))

// hosting


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('owp-client/dist/owp-client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'owp-client', 'dist', 'owp-client', 'index.html'
      )
    )
  })
}

module.exports = app