const {Router} = require('express')
const detailRoutes = Router()

detailRoutes.get('/detail/uz', (req, res) => {
    res.render('detail/detail_uz', {
      lang: "uz",
      route: "detail/",
      title: "Katalog"
     });
  });

  detailRoutes.get('/detail/en', (req, res) => {
    res.render('detail/detail_en', {
      lang: "en",
      route: "detail/",
      title: "detail"
     });
  });
  detailRoutes.get('/detail/ru', (req, res) => {
    res.render('detail/detail_ru', {
      lang: "ru",
      route: "detail/",
      title: "Каталог"
     });
  });

  module.exports = detailRoutes