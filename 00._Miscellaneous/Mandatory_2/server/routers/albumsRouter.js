import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/albums", async (req, res) => {
    const ITEMS_PER_PAGE = 10; 
    const page = parseInt(req.query.page) || 1; 
    const offset = (page - 1) * ITEMS_PER_PAGE; 

    try {
        const allAlbums = await db.all(`SELECT *, (SELECT COUNT(*) FROM albums) as total_albums FROM albums`);
        const totalAlbums = allAlbums[0].total_albums;
        const albums = await db.all(`SELECT * FROM albums LIMIT ?, ?;`, [offset, ITEMS_PER_PAGE]);
        res.send({ data: { albums, ITEMS_PER_PAGE, totalAlbums } });
    } catch (error) {
        res.status(404).send({ data: "No albums found" });
    }
});


router.post("/api/albums", async (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const year = req.body.year;

    if (!title || !artist || !genre || isNaN(year)) {
        res.status(404).send({ data: "Some data is missing" });
    } else {
        await db.run(`INSERT INTO albums (title, artist, genre, year) VALUES (?, ?, ?, ?);`, 
                  [title, artist, genre, year]);
        res.send({ data: [title, artist, genre, year] });
    }
}); 


export default router;