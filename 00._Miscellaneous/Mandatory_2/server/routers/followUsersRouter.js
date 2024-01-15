import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/follow-users/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send({ data: "Id is not a number" });
    } else {
        const followedUsersList = await db.all(`SELECT follow_users.followed_users_id, users.id, users.username 
                                                FROM follow_users JOIN users ON follow_users.followed_users_id = users.id 
                                                WHERE follow_users.users_id = ?;`,
                                                id);
        if (!followedUsersList) {
            res.status(404).send({ data: "No users found" });
        } else {
            res.send({ data: followedUsersList });
        }
    }
});

router.post("/api/follow-users", async (req, res) => {
    const id = req.body.id;
    const followUserId = req.body.followUserId;
    if (isNaN(id) ||isNaN(followUserId)) {
        res.status(404).send({ data: "An id was not a number" });
    } else {
        await db.run(`INSERT INTO follow_users (users_id, followed_users_id) VALUES (?, ?);`, 
                      [id, followUserId]);
        res.send({ data: id + " " + followUserId });
    }
}); 

router.delete("/api/follow-users/:id", async (req, res) => {
    const userId = req.body.userId;
    const followUserId = req.body.followUserId;
    if (isNaN(userId) ||isNaN(followUserId)) {
        res.status(404).send({ data: "An id was not a number" });
    } else {
        await db.run(`DELETE FROM follow_users WHERE users_id=? AND followed_users_id=?;`, 
                      [userId, followUserId]);
        res.send({ data: `You unfollowed user with id: ${followUserId}` });
    }
});


export default router;