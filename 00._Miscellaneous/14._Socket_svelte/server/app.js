import "dotenv/config";

import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/vite-project/dist")));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));


io.on("connection", (socket) => {
    socket.on("client-choose-a-color", (data) => {
        io.emit("server-sent-a-color", data);
        data.name = socket.request.session.name;
        console.log(socket.request.session);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));