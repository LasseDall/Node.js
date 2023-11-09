import "dotenv/config";

import express from "express";
const app = express();

import helmet from "helmet";
app.use(helmet()); 

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import { rateLimit } from 'express-rate-limit';

const allRoutesRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});

app.use(allRoutesRateLimiter);

const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});

function authorize(req, res, next) {
    if (!req.session.username) {
        res.send({ data: "Log ind for at se dagbøgerne!" });
    } else {
        next();
    }
}

app.use("/api/auth", authRateLimiter);

app.use("/api/diaries", authorize);

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marianna.wehner@ethereal.email',
        pass: process.env.EMAIL_PASSWORD
    }
});

async function main(userEmail, name) {
    try {
        const info = await transporter.sendMail({
            from: '"Secret diaries" <secretdiaries@gmail.com>',
            to: userEmail, 
            subject: "Hello", 
            text: `Hello ${name}`,
            html: `<b>Hello ${name}</b>`,
          });
    } catch(error) {
        console.log(error.message);
    }
}


import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import diariesRouter from "./routers/diariesRouter.js";
app.use(diariesRouter);




app.get("*", (req, res) => {
    res.send("<h1>404 - Page not found</h1>");
});

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});