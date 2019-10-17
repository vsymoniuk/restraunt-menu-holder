const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()


const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const tableRoutes = require('./routes/table')

const links = require('./links')
let mongoLink

if (process.env.NODE_ENV === 'production') {
  mongoLink = process.env.MONGO_URI
} else {
  mongoLink = links.mongoURI
}

mongoose.connect(mongoLink)
  .then(() => console.log('Mongo connected.'))
  .catch(error => console.log(error))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


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