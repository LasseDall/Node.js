import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import bcrypt from "bcrypt";

router.get("/api/users", async (req, res) => {
    const users = await db.all(`SELECT id, username FROM users;`);
    res.send({ data: users });
}); 

router.post("/api/users", async (req, res) => {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
    await db.run(`INSERT INTO users (username, password) VALUES (?, ?);`, 
    [req.body.username, hashedPassword]);
    res.send({ data: [req.body.username, hashedPassword] });
}); 

export default router;

