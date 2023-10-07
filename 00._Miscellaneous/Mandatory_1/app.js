import express from "express";
import { frontpagePage, nodeJSPage, appJSPage, JSpagePage, structurePage, loginPage } from "./util/preparePage.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send(loginPage);
});

app.get("/velkommen", (req, res) => {
    res.send(frontpagePage);
});

app.get("/node.js", (req, res) => {
    res.send(nodeJSPage);
});

app.get("/app.js", (req, res) => {
    res.send(appJSPage);
});

app.get("/js", (req, res) => {
    res.send(JSpagePage);
});

app.get("/mappe-struktur", (req, res) => {
    res.send(structurePage);
});




const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});