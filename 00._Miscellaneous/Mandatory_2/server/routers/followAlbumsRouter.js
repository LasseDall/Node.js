import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/follow-albums/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send({ data: "Id is not a number" });
    } else {
        const likeCount = await db.all(`SELECT albums.id, COUNT(users_albums.albums_id) AS likeCount FROM albums
                                          LEFT JOIN users_albums ON albums.id = users_albums.albums_id
                                          GROUP BY albums.id`);   

        const followedAlbumsList = await db.all(`SELECT users_albums.albums_id, albums.* FROM users_albums 
                                                 JOIN albums ON users_albums.albums_id = albums.id WHERE users_id = ?;`,
                                                 id);

        const likeCountMap = {};
        
        likeCount.forEach(item => {
            likeCountMap[item.id] = item.likeCount;
        });
                                                                                         
        const result = followedAlbumsList.map(album => ({
            ...album,
            likeCount: likeCountMap[album.id] || 0
        }));

        if (!followedAlbumsList) {
            res.status(404).send({ data: "No albums found"});
        } else {
            res.send({ data: result });
        }
    }
});
    

router.post("/api/follow-albums", async (req, res) => {
    const userId = req.body.id;
    const albumId = req.body.albumId;
    if (isNaN(userId) || isNaN(albumId)) {
        res.status(404).send({ data: "An id was not a number"});
    } else {
        await db.run(`INSERT INTO users_albums (users_id, albums_id) VALUES (?, ?);`, 
                      [userId, albumId]);
        res.send({ data: req.body.id + " " + req.body.albumId });
    }
});

router.delete("/api/follow-albums/:id", async (req, res) => {
    const albumId = req.params.id;
    const userId = req.body.id;
    if (isNaN(userId) || isNaN(albumId)) {
        res.status(404).send({ data: "An id was not a number"});
    } else {
        await db.run(`DELETE FROM users_albums WHERE users_id=? AND albums_id=?;`, 
                      [userId, albumId]);
        res.send({ data: `Album with id: ${albumId} deleted` });
    }
}); 


export default router;