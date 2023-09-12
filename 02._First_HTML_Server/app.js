const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.get("/second", (req, res) => {
    res.sendFile(__dirname + "/public/secondPage.html");
});

app.get("/welcome", (req, res) => {
    const name = req.query.user;
    
    if(!name) {
        res.send({ data: `Welcome!` });
    } else {
        res.send({ data: `Welcome to this website ${name}!` });
    }
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Server failed to start", error);
        return;
    } 
    console.log("Server is running on port", PORT);
});