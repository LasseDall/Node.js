import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/album-reviews/users/:id", async (req, res) => {
    const id = req.params.id;
    if(!isNaN(id)) {
        const usersAlbumReviews = await db.all(`SELECT album_reviews.*, albums.title, albums.artist, albums.genre, albums.rating FROM album_reviews
                                                JOIN albums ON album_reviews.albums_id = albums.id JOIN users ON album_reviews.users_id = users.id 
                                                WHERE album_reviews.users_id = ?;`,
                                                id);
        if(usersAlbumReviews) {
            res.send({ data: usersAlbumReviews });
        } else {
            res.status(404).send({ data: "No reviews found" });
        }
    } else {
        res.status(404).send({ data: "Id was not a number" });
    }
});

router.get("/api/album-reviews/albums/:id", async (req, res) => {
    const id = req.params.id;
    if(!isNaN(id)) {
        const albumReviews = await db.all(`SELECT album_reviews.*, albums.title, albums.artist, albums.genre, albums.rating, users.username FROM album_reviews
                                           JOIN albums ON album_reviews.albums_id = albums.id 
                                           JOIN users ON album_reviews.users_id = users.id WHERE albums_id=?;`,
                                           id);
        if(albumReviews) {
            res.send({ data: albumReviews });
        } else {
            res.status(404).send({ data: "No reviews found" });
        }
    } else {
        res.status(404).send({ data: "Id was not a number" });
    }
}); 

router.get("/api/album-reviews/:userId/:albumId", async (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;

    if(isNaN(userId) || isNaN(albumId)) {
        res.status(404).send({ data: "Id was not a number" });
    } else {
        const review = await db.all(`SELECT users.username, albums.*, album_reviews.* FROM album_reviews
                                     JOIN albums ON album_reviews.albums_id = albums.id
                                     JOIN users ON album_reviews.users_id = users.id  
                                     WHERE users_id = ? AND albums_id = ?;`,
                                     [userId, albumId]);
        
        if(review) {
            res.send({ data: review });
        } else {
            res.status(404).send({ data: "No reviews found" });
        }
    }
});

router.post("/api/album-reviews", async (req, res) => {
    const userId = req.body.userId;
    const albumId = req.body.albumId;
    const reviewScore = req.body.reviewScore;
    const reviewText = req.body.reviewText;

    
    if(!isNaN(userId) || !isNaN(albumId) || !isNaN(reviewScore)) {
        await db.run(`INSERT INTO album_reviews (users_id, albums_id, reviews_score, reviews_text) VALUES (?, ?, ?, ?);`, 
                      [userId, albumId, reviewScore, reviewText]);
        const albumRating = await db.get(`SELECT rating, review_count FROM albums WHERE id=?`,
                                          albumId);
        if (albumRating) {
            const updatedReviewCount = Number(albumRating.review_count) + 1;
            let updatedAlbumRating = req.body.reviewScore;
            if (updatedReviewCount > 1) {
                updatedAlbumRating = (Number(albumRating.rating) * Number(albumRating.review_count) + Number(req.body.reviewScore)) / Number(updatedReviewCount);
            }
            await db.run(`UPDATE albums SET rating = ${updatedAlbumRating}, review_count = ${updatedReviewCount} WHERE id=?`,
                          albumId);
            res.send({ data: [userId, albumId, reviewScore, reviewText] });
        } else {
            res.status(404).send({ data: "Album was not found" });
        }
    } else {
        res.status(404).send({ data: "An id was not a number" });
    }
}); 

router.delete("/api/album-reviews/:id", async (req, res) => {
    const albumId = req.params.id;
    const userId = req.body.id;
    if(!isNaN(userId) || !isNaN(albumId)) {
        const deletedRating = await db.get(`SELECT reviews_score FROM album_reviews WHERE users_id=? AND albums_id=?;`, 
                                            [userId, albumId]);
        if (!deletedRating) {
            res.status(404).send({ data: "Review not found" });
        } else {
            await db.run(`DELETE FROM album_reviews WHERE users_id=? AND albums_id=?;`, 
                          [userId, albumId]);
            const albumRating = await db.get(`SELECT rating, review_count FROM albums WHERE id=?`,
                                              albumId);
                if (!albumRating) {
                    res.status(404).send({ data: "Rating not found" });
                } else {
                    const updatedReviewCount = Number(albumRating.review_count) - 1;
                    let updatedAlbumRating = 0;
                    if (updatedReviewCount > 0) {
                        updatedAlbumRating = (Number(albumRating.rating) * Number(albumRating.review_count) - Number(deletedRating)) / Number(updatedReviewCount);
                    }
                    await db.run(`UPDATE albums SET rating = ${updatedAlbumRating}, review_count = ${updatedReviewCount} WHERE id=?`,
                                  albumId);
                    res.send({ data: `Review with id: ${req.params.id} deleted` });
                }
        }
    } else {
        res.status(404).send({ data: "An id was not a number" });
    }
});

export default router;