'use strict';
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home.hbs' , {
        welcomeMessage: 'This is the home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page as rendered',
        year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Could not fulfill this request'
    });
});
app.listen(3000);