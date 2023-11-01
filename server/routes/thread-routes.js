// Import express
const express = require('express')

// Import books-controller
const brandRoutes = require('./../controllers/thread-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get('/all', brandRoutes.getAllBrands)

// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/createBrand', brandRoutes.createBrand)

// Add route for PUT request to delete specific book
// In server.js, books route is specified as '/books'
// this means that '/delete' translates to '/books/delete'
router.put('/deleteBrand', brandRoutes.deleteBrand)

// Add route for PUT request to reset bookshelf list
// In server.js, books route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/resetBrands', brandRoutes.brandReset)

// Export router
module.exports = router