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

app.get("/homePage", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/homePage.html");
});

app.get("/doorman/:key", (req, res) => {
    if (req.params.key === "sesamopenup") {
        return res.redirect("/secondPage")
    }
    res.send({ data: "Forkert kode!" })
});

app.get("/secondPage", (req, res) => {
    res.sendFile(__dirname + "/public/second.html");
});

app.get("/welcomeMessage", (req, res) => {
    const clientName = req.query.user;
    res.send({ data: getWelcomeMessage(clientName) });
});

app.get("/proxyserver", (req, res) => {
    fetch("https://google.com")
    .then((response) => {
        if (!response.ok) {
            res.send({ error: "Fejl!" }); 
        } else {
             return response.text();
        }
    })
    .then((result) => res.send(result))
    .catch((err) => console.log(err)); 
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Server failed to start", error);
        return;
    } 
    console.log("Server is running on port", PORT);
});

module.exports = app;