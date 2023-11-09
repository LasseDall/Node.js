import express from "express";
import { rateLimit } from 'express-rate-limit';

const app = express();

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

app.use("/auth", authRateLimiter);

function ipLogger(req, res, next) {
    console.log(req.ip);
    next();
}

app.use("/room", ipLogger);

function doorman(req, res, next) {
    if(req.params.secretPhrase === "KOOSH KOOSH") {
        next();
    } else {
        res.send({ data: "No acces!!" });
    }
}

app.get("/secretRoom/:secretPhrase", doorman, (req, res, next) => {
    res.send({ data: "SECRET ROOM!"})
});

import roomsRouter from './routers/roomsRouter.js';
app.use(roomsRouter);
import furnituresRouter from './routers/furnituresRouter.js';
app.use(furnituresRouter);
import authRouter from './routers/authRouter.js';
app.use(authRouter);

app.get("*", (req, res) => {
    res.send("<h1>404 - Page not found</h1>");
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});