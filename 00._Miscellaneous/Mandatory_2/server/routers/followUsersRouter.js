import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/api/follow-users/:id", async (req, res) => {
    const followedUsersList = await db.all(`SELECT followed_users_id FROM follow_users WHERE users_id = ?;`,
    req.params.id);
    const placeholders = followedUsersList.map(() => '?').join(',');
    const followedUsersIds = followedUsersList.map(followedUsersList => followedUsersList.followed_users_id);
    const followedUsers = await db.all(`SELECT id, username FROM users WHERE id IN (${placeholders});`,
    followedUsersIds);
    res.send({ data: followedUsers });
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