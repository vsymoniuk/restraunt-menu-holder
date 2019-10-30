const Category = require('../models/Category')
const User = require('../models/User')
const Position = require('../models/Position')

const keys = require('../config')
const cloudinaryUpload = require('../cloudinary')
const DataUri = require('datauri')

module.exports.getAll = async function (req, res) {
    try {

        const limit = +keys.pageLimit
        const page = +req.params.page

        const user = await User.findOne({
            role: 'admin'
        })

        let categories

        if (page == -1) {
            categories = await Category.find({
                user: user._id
            })

        } else {
            categories = await Category.find({
                    user: user._id
                })
                .skip(limit * page - limit)
                .limit(limit)
        }

        res.status(200).json(categories)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}



module.exports.create = async function (req, res) {
    try {

        if (!req.body.name) throw error


        console.log(req.file);


        const category = new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: ''
        })

        if (req.file) {

            const datauri = new DataUri()
            datauri.format('.jpeg', req.file.buffer)
            cloudinaryUpload(datauri.content)
                .then(async res => {
                    category.imageSrc = res.secure_url
                    await category.save()
                })

        } else {
            imageSrc = ''
            await category.save()
        }

        res.status(201).json(category)


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
        console.log(error);

    }
}

module.exports.update = async function (req, res) {

    try {
        if (!req.body.name) throw error


        let updated = {
            name: req.body.name,
            imageSrc: ''
        }


        let category

        if (req.file) {
            const datauri = new DataUri()
            datauri.format('.jpeg', req.file.buffer)

            cloudinaryUpload(datauri.content)
               .then(
                    async response => {
                        updated.imageSrc = response.secure_url
                        category = await Category.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $set: updated
                        }, {
                            new: true
                        })
                    }
                ).then(
                    response => {
                        res.status(200).json(category)
                    }
                )
        } else {
            category = await Category.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: updated
            }, {
                new: true
            })
            res.status(200).json(category)
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.getById = async function (req, res) {
    try {
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