import { Router } from "express";
const router = Router();

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marianna.wehner@ethereal.email',
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail(name, email) {
    try {
        const info = await transporter.sendMail({
            from: '"Secret diaries" <secretdiaries@gmail.com>',
            to: email, 
            subject: "Hello", 
            text: `Hello ${name}`,
            html: `<b>Hello ${name}</b>`,
          });
    } catch(error) {
        console.log(error.message);
    }
}

router.post("/api/email/sendEmail", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
        res.status(401).send({ data: "Name or email is missing!"});
    } else {
        try {
            await sendEmail(name, email);
            res.send({ data: "Email send!"});
        } catch (error) {
            res.status(401).send({ data: "Something went wrong!"});
        }
    }
});

export default router;