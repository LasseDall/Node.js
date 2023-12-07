import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/album-reviews/users/:id", async (req, res) => {
    const usersAlbumReviews = await db.all(`SELECT album_reviews.*, albums.title, albums.artist, albums.genre, albums.rating FROM album_reviews
    JOIN albums ON album_reviews.albums_id = albums.id JOIN users ON album_reviews.users_id = users.id WHERE album_reviews.users_id = ?;`,
    req.params.id);
    res.send({ data: usersAlbumReviews });
}); 

router.get("/api/album-reviews/albums/:id", async (req, res) => {
    const albumReviews = await db.all(`SELECT album_reviews.*, albums.title, albums.artist, albums.genre, albums.rating, users.username FROM album_reviews
    JOIN albums ON album_reviews.albums_id = albums.id JOIN users ON album_reviews.users_id = users.id WHERE albums_id=?;`,
    req.params.id);
    res.send({ data: albumReviews });
}); 

router.post("/api/album-reviews", async (req, res) => {
    await db.run(`INSERT INTO album_reviews (users_id, albums_id, reviews_score, reviews_text) VALUES (?, ?, ?, ?);`, 
    [req.body.userId, req.body.albumId, req.body.reviewScore, req.body.reviewText]);
    const albumRating = await db.get(`SELECT rating, review_count FROM albums WHERE id=?`,
    req.body.albumId);
    const updatedReviewCount = Number(albumRating.review_count) + 1;
    let updatedAlbumRating = req.body.reviewScore;
    if (updatedReviewCount > 1) {
        updatedAlbumRating = (Number(albumRating.rating) * Number(albumRating.review_count) + Number(req.body.reviewScore)) / Number(updatedReviewCount)
    }
    await db.run(`UPDATE albums SET rating = ${updatedAlbumRating}, review_count = ${updatedReviewCount} WHERE id=?`,
    req.body.albumId);
    res.send({ data: [req.body.userId, req.body.albumId, req.body.reviewScore, req.body.reviewText] });
}); 

router.delete("/api/album-reviews/:id", async (req, res) => {
    const deletedRating = await db.get(`SELECT reviews_score FROM album_reviews WHERE users_id=? AND albums_id=?;`, 
    [req.body.id, req.params.id]);
    if (!deletedRating) {
        return res.status(404).send({ data: "Review not found" });
    }
    await db.run(`DELETE FROM album_reviews WHERE users_id=? AND albums_id=?;`, 
    [req.body.id, req.params.id]);
    const albumRating = await db.get(`SELECT rating, review_count FROM albums WHERE id=?`,
    req.params.id);
    if (!albumRating) {
        return res.status(404).send({ data: "Rating not found" });
    }
    const updatedReviewCount = Number(albumRating.review_count) - 1;
    let updatedAlbumRating = 0;
    if (updatedReviewCount < 0) {
        updatedAlbumRating = (Number(albumRating.rating) * Number(albumRating.review_count) - Number(deletedRating)) / Number(updatedReviewCount)
    }
    await db.run(`UPDATE albums SET rating = ${updatedAlbumRating}, review_count = ${updatedReviewCount} WHERE id=?`,
    req.params.id);
    res.send({ data: `Review with id: ${req.params.id} deleted` });
}); 



export default router;