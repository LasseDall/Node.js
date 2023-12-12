import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/albums", async (req, res) => {
    const albums = await db.all(`SELECT * FROM albums;`);
    if (albums) {
        res.send({ data: albums });
    } else {
        res.status(404).send({ data: "No albums found" });
    }
}); 

router.post("/api/albums", async (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;
    if (title && artist && genre) {
        await db.run(`INSERT INTO albums (title, artist, genre) VALUES (?, ?, ?);`, 
                  [title, artist, genre]);
        res.send({ data: [title, artist, genre] });
    } else {
        res.status(404).send({ data: "Some data is missing" });
    }
}); 


export default router;