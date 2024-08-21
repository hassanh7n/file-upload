const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes')


const createProduct = async(req, res) => {
    const product = await Product.create(req.body);
    console.log(req.body)
    res.status(200).json({
        product
    })
}

const getAllProduct = async(req, res) => {
    const product = await Product.find({});
    res.status(200).json({
        product
    })
}


module.exports = {
    createProduct,
    getAllProduct
}