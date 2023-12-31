const express = require('express')

const brandRoutes = require('./../controllers/brand-routes.js')
const productRoutes = require('./../controllers/product-routes.js')
const generalRoutes = require('./../controllers/general-routes.js')
const ormRoutes = require('./../controllers/orm-routes.js');
const complexRoutes = require('./../controllers/complex-routes')

const router = express.Router()

router.post('/createBrand', brandRoutes.createBrand)
router.put('/deleteBrand', brandRoutes.deleteBrand)
router.put('/resetBrands', brandRoutes.brandReset)
router.get('/find/:tablename', ormRoutes.find)
router.post('/createRow/:tablename', ormRoutes.createRow)
router.put('/resetAll', ormRoutes.reset)
router.put('/delete/:tablename/:id', ormRoutes.delete)
router.get('/getAll', ormRoutes.getAllRecords)
router.put('/edit/:tablename', ormRoutes.edit)
router.get('/getBrandSummary', complexRoutes.getBrandSummary)
router.get('/findRange', productRoutes.findRange)
router.get('/getProductFilter', productRoutes.getProductFilter)
router.get('/findCategories', productRoutes.findCategories)

module.exports = router