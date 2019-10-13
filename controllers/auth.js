const User = require('../models/User')

module.exports.login = function(req, res) {
}

module.exports.register = async function(req, res) {
    
    console.log(req.body.email)
    console.log(req.body.password);
    
    const user = new User({
        email: req.body.email,
        password: req.body.password
        
      })
      await user.save()
      res.status(201).json(user)
}

module.exports.tempGetAll = async function(req, res) {
    try {

        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}