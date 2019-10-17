const Category = require('../models/Category')
const User = require('../models/User')
const Position = require('../models/Position')

module.exports.getAll = async function (req, res) {
    try {
        //@todo make to show admin`s categories
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.create = async function (req, res) {
    // try {
    //     // console.log('SSSAAASSS')
    //     // console.log(req.body.name)
    //     // console.log('SSSAAASSS after name')
    //     // console.log(req.file.path)
    //     // console.log('SSSAAASSS after file')
    //     const user = await User.findOne({email: "empty"})
    //     const category = new Category({
    //         name: req.body.name,
    //         //@todo make to show admin`s
    //         user: user.id,
    //         imageSrc: req.file ? req.file.path : ''
    //     })
    //     // console.log(category )
    //     console.log('SSSAAASSS  before save')
    //     await category.save()
    //     console.log('SSSAAASSS  after save')
    //     res.status(201).json(category)

    // } catch (error) {
    //     // console.log('SSSAAASSS  error')
    //     res.status(500).json({
    //         success: false,
    //         message: error.message ? error.message : error
    //     })
    // }
    try {
    const user = await User.findOne({
        email: "empty"
    })
    if(req.body.name === '') 
    throw error
    const category = new Category({
        name: req.body.name ? req.body.name : 'error' ,
        user: user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    console.log(category )

    
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.getById = async function (req, res) {
    try {
        //@todo make to show admin`s categories
        // let category
        // if(req.params.filter !== '') category = await Category.find({ _id = req.params.id, name: {$rejex : `.*${req.params.filter}.*`}})
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.delete = async function (req, res) {
    try {

        await Category.remove({
            _id: req.params.id
        })
        await Position.remove({
            category: req.params.id
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
    const updated = {
        name: req.body.name
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const category = await Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })
        res.status(200).json(category)
    } catch (e) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}