const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();
const mongoPW = process.env.MONGO_PW;

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');

app.set('view engine', 'ejs');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
// argument in .single() is the same name given to the file input tag
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('thumbnail'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/images', path.join(__dirname, 'images')));

app.use('/admin', adminRoutes);
app.use(mainRoutes);

mongoose.connect(
    'mongodb+srv://kojikit:' + mongoPW + '@cluster0-sz1ci.mongodb.net/le_blogs?retryWrites=true&w=majority'
).then(result=>{

    app.listen(3000);
})
.catch(err => console.log(err))