const express = require('express')
import CategoryRoutes from './category.routes'
import AuthRoutes from './auth.routes'
import ProductRoutes from './product.routes'
const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/auth', AuthRoutes)
router.use('/product', ProductRoutes)

module.exports = router
