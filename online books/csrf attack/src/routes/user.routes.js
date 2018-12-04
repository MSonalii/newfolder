var express = require('express');
var userController = require('../controller/user.controller');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');

const router = express.Router()

router.use(csurf({ cookie: true }));

router.use((req, res, next) => {
    console.log('in books routes');
    console.log(req.session.csrfToken);
    if (req.session.csrfToken === undefined) {
        console.log('in undefined');
        req.session.csrfToken = req.csrfToken();
        console.log(req.session.csrfToken);
        res.locals.csrfToken = req.session.csrfToken;
    }
    
    next();
});

// Login routers details
router.get('/addBook', (req, res) => {
   console.log('in route  addBook');
   res.render('addBook');
});
// Login routers details
router.post('/addBook', (req, res) => {
    console.log('in router addBook post');
    userController.addBook(req,res);
});

module.exports =  router;