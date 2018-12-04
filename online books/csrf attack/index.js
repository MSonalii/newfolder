var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var path = require('path');
var exphbs = require('express-handlebars');
var user = require('./src/routes/user.routes');
const port = 2000;

const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1800000
    }
}));
app.set('views', path.join(__dirname,'src','views'));
app.engine('handlebars', exphbs({defaultLayout: 'main',layoutsDir:'src/views/layouts',data:{title:"jhhjkhjkjjhsad"}}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static(__dirname + '/src/public'));

//app.use(csurf({ cookie: true }));

// Generate token for all get requests
/*app.get('*', function (req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403)
    res.send('You are not authorized to access')
});*/

app.get('/', (req, res) => {
    res.redirect('/user/addBook');
});

app.use('/user',user);

const server = app.listen(port, () => {
   console.log('server started - ', port);
});

module.exports =  server;