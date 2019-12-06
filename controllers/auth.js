const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const keys = require('../config')
const sgMail = require('@sendgrid/mail');



module.exports.emailConfirm = async function (req, res) {
  try {

    sgMail.setApiKey(keys.SENDGRID_API_KEY);

    let code = getRandomInt(100000, 999999)

    User.findOneAndUpdate(
    {email: req.params.email}, 
    {restoringCode: bcryptjs.hashSync(`${code}`, bcryptjs.genSaltSync(10)) },
    {new: true}, 
    function (err, user) {
      // console.log(user);
    })


    const msg = {
      to: req.params.email,
      from: 'izogid42@gmail.com',
      subject: 'Відновлення паролю до Online Restraunt Host',
      text: `Код для відновлення: ${code}`,
      html: `Код для відновлення: ${code}`,
    };

    sgMail.send(msg);
    res.status(200).json({
      message: `${code}`
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
}

module.exports.restorePassword = async function (req, res) {
  
  const candidateUser = await User.findOne({email: req.body.email}) 

  if(candidateUser && bcryptjs.compareSync(req.body.code, candidateUser.restoringCode)) {
    
    User.findOneAndUpdate(
      {email: req.body.email}, 
      {password: bcryptjs.hashSync(`${req.body.password}`, bcryptjs.genSaltSync(10)) },
      {new: true}, 
      function (err, user) {
        // console.log(user);
      })

  } else {
    res.status(500).json({
      success: false,
      message: 'Секретні ключі не співпадають!'
    })
  }


  
  

  try {

    res.status(200).json({
      message: 'Пароль було успішно змінено!'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
}

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
        expiresIn: 60 * 60 * 5
      })

      const decoded = jwt.decode(token)
      const response = {
        token: `Bearer ${token}`,
        role: decoded.role
      }

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

module.exports.getById = async function (req, res) {
  try {

    const token = req.body.token
    const userin = jwt.decode(token.substring(7))
    const user = await User.findById(userin.userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
}


module.exports.delete = async function (req, res) {
  try {

    await User.remove({
      _id: req.params.id
    })
    res.status(200).json({
      message: 'Category was deleted'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
}

module.exports.update = async function (req, res) {
  const updated = req.body
  try {


    
    const user = await User.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: updated
    }, {
      new: true
    })
    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
}

module.exports.getUsers = async function (req, res) {
  try {

    const limit = +keys.pageLimit
    let page = +req.query.page || 1

    const users = await User.find({
        role: req.params.role,
        email: {
          $regex: `.*(?i)${req.query.filter || ''}(?-i).*`
        }
      }).skip(limit * page - limit)
      .limit(limit)


    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }

}

module.exports.getEmpty = function (req, res) {
  res.status(200).json({})
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}