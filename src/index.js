const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash =  require('connect-flash');
const passport = require('passport');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

//Initialization
const app = express();
require('./database.js');
require('./config/passport');

// Settings
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layout'),
  partialsDir: path.join(app.get('views'), 'partial'),
  extname: '.hbs',
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mySecretWord',
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Static Files
app.use(express.static(path.join(__dirname,'public')));


// Server is listening
app.listen(app.get('PORT'),() => {
  console.log(`Server listening on port ${app.get('PORT')}`);
})