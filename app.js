const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();
const mongoDB_connect = process.env.MONGO_DB;

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: mongoDB_connect,
    collection: 'sessions'
});

const csrf = require('csurf');
const csrfProtection = csrf();

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

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
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single('thumbnail')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'secretsecretsecret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)
app.use(csrfProtection);

app.use((req, res, next) =>{
    console.log(req.session.isLoggedIn);
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/admin', adminRoutes);
app.use(mainRoutes);
app.use(authRoutes);

mongoose.connect(
    mongoDB_connect
).then(result=>{

    app.listen(3000);
})
.catch(err => console.log(err))