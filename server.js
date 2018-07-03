'use strict';
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.url}: ${req.method}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'From the Scream it helper',
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page as rendered',
        currentYear: new Date().getFullYear()
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Could not fulfill this request'
    });
});
app.listen(3000);