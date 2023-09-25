const express = require("express");
const app = express();

app.use(express.static("public"));

const { getWelcomeMessage } = require("./util/welcomeMessageUtil.js");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.get("/second", (req, res) => {
    res.sendFile(__dirname + "/public/secondPage.html");
});

app.get("/secondPage", (req, res) => {
    res.sendFile(__dirname + "/public/second.html");
});

app.get("/welcomeMessage", (req, res) => {
    const clientName = req.query.user;
    res.send({ data: getWelcomeMessage(clientName) });
})

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Server failed to start", error);
        return;
    } 
    console.log("Server is running on port", PORT);
});

module.exports = app;