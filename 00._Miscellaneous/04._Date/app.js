const express = require("express");
const app = express();

// Dato
console.log(Date());
// Zulu time / UTC
console.log(new Date());
// Unix time / epoch timestamp
console.log(Date.now());

const weekdays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
const months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "Septemper", "Oktober", "November", "December"];

app.get("/", (req, res) => {
    res.send({ data: Date() });
});

app.get("/day", (req, res) => {
    res.send({ data: weekdays[new Date().getDay()] });
});

app.get("/month", (req, res) => {
    res.send({ data: months[new Date().getMonth()] });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});