const { Router } = require('express')
const mainRoutes = Router()

mainRoutes.get('/en', (req, res) => {
    res.render('home_en', {
        hasNotify: true,
        title: "Dear customers!",
        message: "Due to popular demand, we are accepting orders until 10 PM.",
        lang: "en",
        host: process.env.HOST
    });
});

mainRoutes.get('/uz', (req, res) => {
    res.render('home_uz', {
        hasNotify: true,
        title: "Hurmatli xaridorlar!",
        message: "Ko‘p sonli iltimoslarga ko‘ra bugun buyurtmalarni soat 22:00 gacha qabul qilamiz",
        lang: "uz",
        host: process.env.HOST
    });
});

module.exports = mainRoutes