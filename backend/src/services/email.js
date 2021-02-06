import nodemailer from 'nodemailer';
import config from '../utils/config.js';

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = config;
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

class Email {
    static getTransponder() {
        return transporter;
    }

    static send({ email, subject, text, html, attachments}, reply=false) {
        const options = {
            from: EMAIL_USER,
            to: reply ? EMAIL_USER : email,
            replyTo: reply ? email : undefined,
            subject,
            text,
            html,
            attachments
        }
        return transporter.sendMail(options);
    }
}

export default Email;