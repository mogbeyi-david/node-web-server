'use strict';
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.send({
    name: 'David',
    likes: ['Jesus', 'chess']
  });
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Could not fulfill this request'
  });
})
app.listen(3000);