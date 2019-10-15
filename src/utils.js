import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"
import jwt from "jsonwebtoken"

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email)
}

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "sabo@lawdians.com",
        to: address,
        subject: "Login Secret for instatata",
        html: `Hello! Your Login secret it <b>${secret}.<b><br/> Copy paste on the app/web to login`
    }
    return sendMail(email)
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}