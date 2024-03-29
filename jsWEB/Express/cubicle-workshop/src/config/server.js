const cookieParser = require('cookie-parser');
const express = require('express')
const hbs = require('express-handlebars');
const { auth } = require('../middlewares/authMiddleware.js');
const router = require('../routes.js');

module.exports = (app) => {
    app.engine('hbs', hbs.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');

    // const hbsCreate = hbs.create({})
    // hbsCreate.registerHelper('select', function(selected, options) {
    //     return options.fn(this).replace(
    //         new RegExp(' value=\"' + selected + '\"'),
    //         '$& selected="selected"');
    // });

    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())
    app.use(auth);
    app.use(router);
}

