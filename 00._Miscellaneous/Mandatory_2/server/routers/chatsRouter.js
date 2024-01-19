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

const chatRooms = {
    "General room": {
        users: [],
        messages: []
    }
};

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    socket.on("join-room", (roomName) => {
        if (!chatRooms[roomName]) {
            chatRooms[roomName] = {
                users: [],
                messages: [],
            };
            io.emit("server-update-rooms", chatRooms);
        }

        socket.join(roomName);

        chatRooms[roomName].users.push({
            id: socket.id,
            username: socket.request.session.username,
        });

        io.to(roomName).emit("server-update-users", chatRooms[roomName].users);
    });

    socket.on("client-send-a-message", (data) => {
        const username = socket.request.session.username;
        const roomName = data.room;
        const room = chatRooms[roomName];

        if (room && room.users.some((user) => user.username === username)) {
            const message = { name: username, message: data.message, roomName: roomName };
            chatRooms[roomName].messages.push(message);

            io.to(roomName).emit("server-send-a-message", message);
        }
    });
});

const PORT_SOCKETIO = Number(process.env.PORT_SOCKETIO || 3001);

server.listen(PORT_SOCKETIO, () => {
    console.log("Socket.IO-server kører på port:", PORT_SOCKETIO);
});

export default router;