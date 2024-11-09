const { Router } = require('express')
const mainRoutes = Router()

mainRoutes.get('/en', (req, res) => {
    res.render('main/home_en', {
        hasNotify: false,
        title: "Dear customers!",
        message: "Due to popular demand, we are accepting orders until 10 PM.",
        lang: "en"
    });
});

mainRoutes.get('/uz', (req, res) => {
    res.render('main/home_uz', {
        hasNotify: false,
        title: "Hurmatli xaridorlar!",
        message: "Ko‘p sonli iltimoslarga ko‘ra bugun buyurtmalarni soat 22:00 gacha qabul qilamiz",
        lang: "uz"
    });
});

mainRoutes.get('/ru', (req, res) => {
        res.render('main/home_ru', {
            hasNotify: false,
            title: "Hurmatli xaridorlar!",
            message: "Ko‘p sonli iltimoslarga ko‘ra bugun buyurtmalarni soat 22:00 gacha qabul qilamiz",
            lang: "ru"
        });
});

module.exports = mainRoutes