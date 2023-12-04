import express from "express";
const app = express();

app.use(express.static("public"));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A socket connected", socket.id);

    
    //socket.broadcast.emit("server-send-color", data); // sender til alle andre sockets, men ikke sig selv

    // io.emit("server-send-color", data); // sender til sig selv og de andre

    socket.on("client-choose-color", (data) => {
        console.log(data);
        socket.emit("server-send-color", data); // sender kun til sig selv
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
