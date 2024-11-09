const {Router} = require('express')
const catalogRoutes = Router()

catalogRoutes.get('/catalog/uz', (req, res) => {
    res.render('catalog/catalog_uz', {
      lang: "uz",
      route: "catalog/",
      title: "Katalog"
     });
  });

  catalogRoutes.get('/catalog/en', (req, res) => {
    res.render('catalog/catalog_en', {
      lang: "en",
      route: "catalog/",
      title: "Catalog"
     });
  });
  catalogRoutes.get('/catalog/ru', (req, res) => {
    res.render('catalog/catalog_ru', {
      lang: "ru",
      route: "catalog/",
      title: "Каталог"
     });
  });


module.exports = catalogRoutes