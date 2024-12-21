const {Router} = require('express')
const searchRoutes = Router()

searchRoutes.get('/search/uz', (req, res) => {
    res.render('search/search_uz', {
      lang: "uz",
      route: "search/",
      title: "Qidirish"
     });
  });
searchRoutes.get('/search/ru', (req, res) => {
    res.render('search/search_ru', {
      lang: "ru",
      route: "search/",
      title: "Посик"
     });
  });

searchRoutes.get('/search/en', (req, res) => {
    res.render('search/search_en', {
      lang: "en",
      route: "search/",
      title: "Search"
     });
  });


module.exports = searchRoutes