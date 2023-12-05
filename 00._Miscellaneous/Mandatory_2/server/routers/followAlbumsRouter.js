import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/follow-albums/:id", async (req, res) => {
    const followedAlbumsList = await db.all(`SELECT albums_id FROM users_albums WHERE users_id = ?;`,
    req.params.id);
    const placeholders = followedAlbumsList.map(() => '?').join(',');
    const followedAlbumsIds = followedAlbumsList.map(followedAlbumsList => followedAlbumsList.albums_id);
    const followedAlbums = await db.all(`SELECT * FROM albums WHERE id IN (${placeholders});`,
    followedAlbumsIds);
    res.send({ data: followedAlbums });
});

router.post("/api/follow-albums", async (req, res) => {
    await db.run(`INSERT INTO users_albums (users_id, albums_id) VALUES (?, ?);`, 
    [req.body.id, req.body.albumId]);
    res.send({ data: req.body.id + " " + req.body.albumId });
});

router.delete("/api/follow-albums/:id", async (req, res) => {
    await db.run(`DELETE FROM users_albums WHERE users_id=? AND albums_id=?;`, 
    [req.body.id, req.params.id]);
    res.send({ data: `Album with id: ${req.params.id} deleted` });
}); 


export default router;