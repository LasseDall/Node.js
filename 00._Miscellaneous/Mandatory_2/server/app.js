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

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

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

//app.use("/api/", authorize);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import emailRouter from "./routers/emailRouter.js";
app.use(emailRouter);
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

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*"
    },
    path: "/socket.io/"
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    socket.on("client-choose-a-color", (data) => {
        io.emit("server-sent-a-color", data);
        data.name = socket.request.session.name;
    });
});


app.get("*", (req, res) => {
    res.send("<h1>404 - Page not found</h1>");
});

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});

const PORT_SOCKETIO = Number(process.env.PORT_SOCKETIO || 3001);

server.listen(PORT_SOCKETIO, () => {
    console.log("Socket.IO-server kører på port:", PORT_SOCKETIO);
});