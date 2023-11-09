import express  from "express";

const app = express();

app.use(express.json());

import supermarketRouter from "./routers/supermarketRouter.js";
app.use(supermarketRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));