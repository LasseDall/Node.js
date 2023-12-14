import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

import bcrypt from "bcrypt";

router.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ data: "Du er logget ud!" });
    });
});

router.post("/auth/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const userData = await db.get(`SELECT id, password FROM users WHERE username = ?;`, [username]);
        if (userData) {
            const encryptedPassword = userData.password;
            const userId = userData.id;
            if (!encryptedPassword) {
                res.status(401).send({ data: "Username or password was not correct" });
            } else {
                const compareResult = await bcrypt.compare(password, encryptedPassword);
                if (!compareResult) {
                    res.status(401).send({ data: "Username or password was not correct" });
                } else {
                    req.session.username = username;
                    res.send({ data: { username: username, id: userId }});
                }
            }
        } else {
            res.status(401).send({ data: "Username or password was not correct" });
        }
    } else {
        res.status(401).send({ data: "Username or password was not correct" });
    }
});

export default router;