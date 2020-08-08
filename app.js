const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(mainRoutes);

app.listen(3000);