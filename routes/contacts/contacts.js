const {Router} = require('express')
const contactsRoutes = Router()

contactsRoutes.get('/contact/uz', (req, res) => {
    res.render('contacts/contacts_uz', {
      lang: "uz",
      route: "contact/",
      title: "Kontaktlar"
     });
  });
contactsRoutes.get('/contact/ru', (req, res) => {
    res.render('contacts/contacts_ru', {
      lang: "ru",
      route: "contact/",
      title: "Контакты"
     });
  });

contactsRoutes.get('/contact/en', (req, res) => {
    res.render('contacts/contacts_en', {
      lang: "en",
      route: "contact/",
      title: "Contacts"
     });
  });


module.exports = contactsRoutes