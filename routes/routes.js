const {Router} = require('express')
const catalogRoutes = require('./catalog/catalog')
const mainRoutes = require('./main/main')
const router = Router()

router.use(catalogRoutes)
router.use(mainRoutes)

module.exports = router