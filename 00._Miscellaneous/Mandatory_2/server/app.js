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

import { sessionMiddleware } from "./sessionHandler.js";

app.use(express.json());

app.use(sessionMiddleware);

import { rateLimit } from 'express-rate-limit';

const allRoutesRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 200,
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});

app.use(allRoutesRateLimiter);

const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 5, 
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
});

function authorize(req, res, next) {
    if (!req.session.username) {
        res.status(403).send({ data: "Login to be a part of this cool community!" });
    } else {
        next();
    }
}

app.use("/auth/", authRateLimiter);

app.use("/api/", authorize);


import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import emailsRouter from "./routers/emailsRouter.js";
app.use(emailsRouter);
import albumsRouter from "./routers/albumsRouter.js";
app.use(albumsRouter);
import followAlbumsRouter from "./routers/followAlbumsRouter.js";
app.use(followAlbumsRouter);
import followUsersRouter from "./routers/followUsersRouter.js";
app.use(followUsersRouter);
import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);
import albumReviewsRouter from "./routers/albumReviewsRouter.js";
app.use(albumReviewsRouter);
import chatsRouter from "./routers/chatsRouter.js";
app.use(chatsRouter);


app.get("*", (req, res) => {
    res.send("<h1>404 - Page not found</h1>");
});

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
