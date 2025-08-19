const express = require('express')
const { allProduct, createProduct, deleteProductById } = require('../controllers/product.controller')
const {auth} = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/create', auth(['seller']), createProduct)
router.get('/all', auth(['seller','buyer']),allProduct)
router.delete('/delete/:id',auth(['seller']),deleteProductById)




module.exports = router;