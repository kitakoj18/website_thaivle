const dotenv = require('dotenv').config();
const userEmail = process.env.USER_EMAIL;

exports.getLogin = (req, res, next) =>{
    res.render('auth/login')
}

exports.login = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    if(email !== userEmail){
        return res.redirect('/login');
    }

    req.session.isLoggedIn = true;
    req.session.save(err =>{
        console.log(err);
        res.redirect('/');
    })
}