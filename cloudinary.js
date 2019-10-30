const keys = require('./config')
const Category = require('./models/Category')
const cloudinary = require('cloudinary')


cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.api_key,
  api_secret: keys.api_secret
})

function cloudinaryUpload(image) {
  
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, res) => {
      if(err) reject(err)
      else resolve(res)
    })
  })

}

module.exports = cloudinaryUpload