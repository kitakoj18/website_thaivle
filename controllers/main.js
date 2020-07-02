const dotenv = require('dotenv').config();
const API_KEY_sendgrid = process.env.SENDGRID_API;

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: API_KEY_sendgrid
    }
}));

exports.home = (req, res, next) =>{
    res.render('home')
};

exports.research = (req, res, next) =>{
    res.render('research')
};

exports.thoughts = (req, res, next) =>{
    res.render('thoughts')
};

exports.contact = (req, res, next) =>{
    res.render('contact')
};

exports.sendEmail = (req, res, next) =>{

    const reqSubject = req.body.subject;
    const reqSenderName = req.body.contactName;
    const reqEmail = req.body.contactEmail;
    const reqMsg = req.body.message;

    console.log(reqEmail);

    const html = '<p>Contact Name: ' + reqSenderName + `</p>
                  <p>Contact message:</p>
                  <p>` + reqMsg + '</p>'

    res.redirect('/contact');
    return transporter.sendMail({
        to: 'kitakoj18@gmail.com',
        from: reqEmail,
        subject: "Message request from Thai V Le's website - " + reqSubject,
        html: html
    })
    .then()
    .catch(err=>{
        console.log(err)
    })
};