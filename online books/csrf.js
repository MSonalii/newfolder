import express from "express";
import bodyParser from 'body-parser';
import cookieParser from'cookie-parser';
import session from 'express-session';
import csurf from 'csurf';
import path from 'path';
import exphbs from 'express-handlebars'
const port = 3000;

connectToDb();

const app = express();
let sessionStore = new session.MemoryStore;
app.use(cookieParser());

app.use(flash());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(passport.initialize())
app.use(passport.session())
app.set('views', path.join(__dirname,'src','views'));
app.engine('handlebars', exphbs({defaultLayout: 'main',layoutsDir:'src/views/layouts',data:{title:"jhhjkhjkjjhsad"}}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(csurf({ cookie: true }))
// Generate token for all get requests
app.get('*', function (req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use('/public',express.static(__dirname + '/src/public'));

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});
    // error handler
app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err)

        // handle CSRF token errors here
        res.status(403)
        res.send('session has expired or form tampered with')
});

app.get('/', (req, res) => {
    if (!req.session.user) {
        req.flash('error','Please login to access the application')
        res.redirect('/user/login');
    }else{
        res.redirect('/book/allbooks');
    }
});


app.use('/user',user);
app.use('/book',books);




app.listen(port, () => {
   // console.log('server started - ', port);
});