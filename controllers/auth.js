const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports.login = async function (req, res) {

  const futureUser = await User.findOne({
    email: req.body.email
  })

  if (futureUser) {

    const isPassword = bcryptjs.compareSync(req.body.password, futureUser.password)

    if (isPassword) {
      // token generation
      const token = jwt.sign({
        email: futureUser.email,
        userId: futureUser._id,
        role: futureUser.role
      }, config.jwt, {
        expiresIn: 60 * 60
      })

      const decoded = jwt.decode(token)
      const response = {
        token: `Bearer ${token}`,
        role: decoded.role
      }

      console.log(response , 'response');
      

      res.status(200).json(response)

    } else {
      res.status(401).json({
        message: 'Невірний пароль'
      })
    }

  } else {

    res.status(404).json({
      message: 'Такого користувача не існує'
    })

  }

}

module.exports.register = async function (req, res) {

  if (req.body.email === '') {
    throw 'email can not be empty'
  } else if (req.body.password === '') {
    throw 'password can not be empty'
  }

  const futureUser = await User.findOne({
    email: req.body.email
  })

  if (futureUser) {
    res.status(409).json({
      messgae: 'Аккаунт з таким емейлом існує'
    })
  } else {

    const salt = bcryptjs.genSaltSync(10)
    const password = req.body.password

    const user = new User({
      email: req.body.email,
      password: bcryptjs.hashSync(password, salt)
    })

    try {

      await user.save()
      res.status(201).json(user)

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message ? error.message : error
      })
    }
  }
}

// module.exports.get = async function (req, res) {
//   try {
//     const user = await User.findById(req.user.id)
//     res.status(200).json({
//       role: user.role
//     })
//     console.log(user.role)

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message ? error.message : error
//     })
//   }
// }