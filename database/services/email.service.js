import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})