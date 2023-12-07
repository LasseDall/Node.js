import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/follow-users/:id", async (req, res) => {
    const followedUsersList = await db.all(`SELECT follow_users.followed_users_id, users.id, users.username 
    FROM follow_users JOIN users ON follow_users.followed_users_id = users.id WHERE follow_users.users_id = ?;`,
    req.params.id);
    res.send({ data: followedUsersList });
}); 

router.post("/api/follow-users", async (req, res) => {
    await db.run(`INSERT INTO follow_users (users_id, followed_users_id) VALUES (?, ?);`, 
    [req.body.id, req.body.followUserId]);
    res.send({ data: req.body.id + " " + req.body.followUserId });
}); 

router.delete("/api/follow-users/:id", async (req, res) => {
    await db.run(`DELETE FROM follow_users WHERE users_id=? AND followed_users_id=?;`, 
    [req.body.id, req.params.id]);
    res.send({ data: `You unfollowed user with id: ${req.params.followUserId}` });
});


export default router;