import { Router } from "express";
const router = Router();

import { sessionMiddleware } from "../sessionHandler.js"

import http from "http";
const server = http.createServer(router);

import { Server } from "socket.io";

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: "*",
        credentials: true
    },
    path: "/socket.io/"
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    socket.on("client-send-a-message", (data) => {
        if (socket.request.session.username) {
            data.name = socket.request.session.username;
            io.emit("server-send-a-message", { name: data.name, message: data.message });
        }
    });
});

const PORT_SOCKETIO = Number(process.env.PORT_SOCKETIO || 3001);

server.listen(PORT_SOCKETIO, () => {
    console.log("Socket.IO-server kører på port:", PORT_SOCKETIO);
});

export default router;