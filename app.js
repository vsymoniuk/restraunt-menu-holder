// hosting

const path = require('path')
let links

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('owp-client/dist/owp-client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'owp-client', 'dist', 'owp-client', 'index.html'
      )
    )
  })

  links = {mongoURI: process.env.MONGO_URI}

} else {

  links = require('./links')
  
}

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(links.mongoURI)
  .then(() => console.log('Mongo connected.'))
  .catch(error => console.log(error))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


app.use(require('morgan')('dev'))
app.use(require('cors')())

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const tableRoutes = require('./routes/table')

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/table', tableRoutes)

app.use('/uploads', express.static('uploads'))


// Serve only the static files form the dist directory
// app.use(express.static('owp-client/dist/owp-client'));
// app.get('*', function(req,res) {
//   res.sendFile(path.join(__dirname,'owp-client/dist/owp-client/index.html'));
// });
 
module.exports = app