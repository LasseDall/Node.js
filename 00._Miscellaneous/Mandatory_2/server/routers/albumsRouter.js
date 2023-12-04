import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/albums", async (req, res) => {
    const albums = await db.all(`SELECT title, artist, genre, rating FROM albums;`);
    res.send({ data: albums });
}); 

router.post("/api/albums", async (req, res) => {
    await db.run(`INSERT INTO albums (title, artist, genre) VALUES (?, ?, ?);`, 
    [req.body.title, req.body.artist, req.body.genre]);
    res.send({ data: [req.body.title, req.body.artist, req.body.genre] });
}); 


export default router;