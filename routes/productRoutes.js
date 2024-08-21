const {
    createProduct,
    getAllProduct
} = require('../controllers/productController');
const {uploadProductImageLocal, uploadProductImage} = require('../controllers/uploadsController')
const express = require('express');
const router = express.Router()

router.route('/').post(createProduct)
router.route('/').get(getAllProduct)
router.route('/uploads').post(uploadProductImage)

module.exports = router;

