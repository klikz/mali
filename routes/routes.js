const {Router} = require('express')
const catalogRoutes = require('./catalog/catalog')
const mainRoutes = require('./main/main')
const aboutRoutes = require('./about/about')
const contactsRoutes = require('./contacts/contacts')
const detailRoutes = require('./detail/detail')
const searchRoutes = require('./search/search')
const router = Router()

router.use(catalogRoutes)
router.use(mainRoutes)
router.use(aboutRoutes)
router.use(contactsRoutes)
router.use(detailRoutes)
router.use(searchRoutes)

router.get('*', (req, res) => {
    res.render('not_found/not_found', {
      lang: "uz",
    //   route: "search/",
      title: "Mali"
     });
  });



module.exports = router