const express = require('express')
import CategoryRoutes from './category.routes'
import AuthRoutes from './auth.routes'
import ProductRoutes from './product.routes'
import OrderRoutes from './order.routes'
const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/auth', AuthRoutes)
router.use('/product', ProductRoutes)
router.use('/order', OrderRoutes)

module.exports = router
