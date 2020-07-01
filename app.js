const express = require('express');
const app = express();

const path = require('path');

const routes = require('./routes/main');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(3000);