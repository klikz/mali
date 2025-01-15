const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const router = require('./routes/routes');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
// test


const TelegramBot = require('./lib/TelegramBot'); // Правильный импорт
const _TelegramBot = new TelegramBot();
// Инициализация бота
_TelegramBot.int();

app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb'}));
dotenv.config();

// Create an instance of express-handlebars
const hbs = create({ 
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'), 
    helpers: { 
        eq: function(a, b, options) { if (a === b) { return options.fn(this); } return options.inverse(this); }, 
        or: function(a, b, options) { if (a || b) { return options.fn(this); } return options.inverse(this); } 
    }
 });
app.use(express.static(path.join(__dirname, 'public')))


app.post('/message', (req, res)=>{

  console.log(req.body);  
  const { name, phone, email, message } = req.body;

  // Проверка наличия всех полей
  if (name!='' && phone!='' && email!='' && message!='') {
    const mes = `<b>Имя:</b> ${name}\n<b>Номер телефона:</b> ${phone} \n<b>Е-mail</b>: ${email} \n<b>Cообщение:</b>\n${message}`;
    console.log(mes);
    _TelegramBot
      .send(mes)
      .then(() => {
        res.status(200).send({ result: 'OK' });
      })
      .catch((err) => {
        console.error('Ошибка при отправке сообщения:', err);
        res.status(500).send({ result: 'ERROR', error: 'Ошибка при отправке сообщения' });
      });
  } else {
    res.status(400).send({ result: 'ERROR', error: 'Некорректные данные' });
  }
})

app.use(router)
app.get('/', (req, res) => { res.redirect('/uz');})

// app.use((req, res, next) => { res.status(404).render('404', { title: 'Page Not Found1' }); });
app.use((req, res, next) => { res.render('not_found/not_found', {
  lang: "uz",
//   route: "search/",
  title: "Mali"
 }); });

// Set up Handlebars as the view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
