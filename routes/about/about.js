const {Router} = require('express')
const aboutRoutes = Router()

aboutRoutes.get('/about/uz', (req, res) => {
    res.render('about/about_uz', {
      lang: "uz",
      route: "about/",
      title: "Biz haqimizda"
     });
  });
aboutRoutes.get('/about/ru', (req, res) => {
    res.render('about/about_ru', {
      lang: "ru",
      route: "about/",
      title: "О нас"
     });
  });

aboutRoutes.get('/about/en', (req, res) => {
    res.render('about/about_en', {
      lang: "en",
      route: "about/",
      title: "About us"
     });
  });


module.exports = aboutRoutes