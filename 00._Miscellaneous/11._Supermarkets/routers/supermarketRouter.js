import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/supermarkets", async (req, res) => {
    const supermarkets = await db.all("SELECT name, location, pant_automat, score FROM supermarkets;");
    res.send({ data: supermarkets });
});

router.post("/api/supermarkets", async (req, res) => {
    const result = await db.run(`INSERT INTO supermarkets (name, location) VALUES (?, ?);`, 
    [req.body.name, req.body.location]);
    res.send({ data: null })
});

export default router;