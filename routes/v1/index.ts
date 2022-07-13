const express = require('express')
import CategoryRoutes from './category.routes'
import AuthRoutes from './auth.routes'
const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/auth', AuthRoutes)

module.exports = router
