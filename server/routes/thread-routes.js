const express = require('express')

const brandRoutes = require('./../controllers/thread-controller.js')

const router = express.Router()

router.get('/all', brandRoutes.getAllBrands)
router.post('/createBrand', brandRoutes.createBrand)
router.put('/deleteBrand', brandRoutes.deleteBrand)
router.put('/resetBrands', brandRoutes.brandReset)
router.get('/findBrand', brandRoutes.findBrand)

module.exports = router