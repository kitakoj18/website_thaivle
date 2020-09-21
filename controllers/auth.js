const dotenv = require('dotenv').config();
const userEmail = process.env.USER_EMAIL;
const userPW = process.env.USER_PW;

exports.getLogin = (req, res, next) =>{
    res.render('auth/login')
}

exports.login = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    if(email !== userEmail && password !== userPW){
        return res.redirect('/login');
    }

    req.session.isLoggedIn = true;
    req.session.save(err =>{
        console.log(err);
        res.redirect('/thoughts');
    })
}