const {Router} = require('express')
const catalogRoutes = Router()

catalogRoutes.get('/catalog/uz', (req, res) => {
    res.render('catalog_uz', {
      lang: "uz",
      route: "catalog/"
     });
  });

  catalogRoutes.get('/catalog/en', (req, res) => {
    res.render('catalog_en', {
      lang: "en",
      route: "catalog/"
     });
  });
  catalogRoutes.get('/catalog/ru', (req, res) => {
    res.render('catalog_ru', {
      lang: "ru",
      route: "catalog/"
     });
  });


module.exports = catalogRoutes