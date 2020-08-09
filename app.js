const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();
const mongoPW = process.env.MONGO_PW;

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(mainRoutes);

mongoose.connect(
    'mongodb+srv://kojikit:' + mongoPW + '@cluster0-sz1ci.mongodb.net/le_blogs?retryWrites=true&w=majority'
).then(result=>{

    app.listen(3000);
})
.catch(err => console.log(err))