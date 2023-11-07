const express = require('express')

const brandRoutes = require('./../controllers/brand-routes.js')
const productRoutes = require('./../controllers/product-routes.js')
const generalRoutes = require('./../controllers/general-routes.js')

const router = express.Router()

router.post('/createBrand', brandRoutes.createBrand)
router.put('/deleteBrand', brandRoutes.deleteBrand)
router.put('/resetBrands', brandRoutes.brandReset)
router.get('/findBrand', brandRoutes.findBrand)
router.get('/getAll', generalRoutes.getAll)
router.post('/createRow/:tablename', generalRoutes.createRow)
router.put('/resetAll', generalRoutes.resetAll)
router.put('/delete/:tablename/:id', generalRoutes.delete)

module.exports = router