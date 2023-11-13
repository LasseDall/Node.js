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
    console.log(req.session.username);
    if (!req.session.username) {
        res.status(403).send({ data: "Log ind for at se dagbøgerne!" });
    } else {
        next();
    }
}

app.use("/api/auth", authRateLimiter);

app.use("/api/diaries", authorize);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import diariesRouter from "./routers/diariesRouter.js";
app.use(diariesRouter);
import emailRouter from "./routers/emailRouter.js";
app.use(emailRouter);



app.get("*", (req, res) => {
    res.send("<h1>404 - Page not found</h1>");
});

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});