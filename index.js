const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const router = require('./routes/routes');
const dotenv = require('dotenv');
const app = express();

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
app.use(router)

// Set up Handlebars as the view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
