import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import bcrypt from "bcrypt";

router.get("/api/users", async (req, res) => {
    const ITEMS_PER_PAGE = 10; 
    const page = parseInt(req.query.page) || 1; 
    const offset = (page - 1) * ITEMS_PER_PAGE; 

    try {
        const allUsers = await db.all(`SELECT *, (SELECT COUNT(*) FROM users) as total_users FROM users`);
        const totalUsers = allUsers[0].total_users;
        const users = await db.all(`SELECT * FROM users LIMIT ?, ?;`, [offset, ITEMS_PER_PAGE]);        
        res.send({ data: { users, ITEMS_PER_PAGE, totalUsers } });
    } catch (error) {
        res.status(404).send("No users found");
    }
}); 

router.post("/auth/users", async (req, res) => {
    const saltRounds = 14;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const DBUsernames = await db.all(`SELECT username FROM users;`);

    if (!password || !username || !firstName || !lastName || !email) {
        res.status(404).send({ data: "Data is missing" });
    } else {
        const usernameExist = await DBUsernames.find(DBUsername => DBUsername == username);
        
        if (usernameExist) {
            res.status(404).send({ data: "Username already in use" });
        } else {
            const hashedPassword = await bcrypt.hashSync(password, saltRounds);
            await db.run(`INSERT INTO users (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?);`, 
            [username, hashedPassword, firstName, lastName, email]);
            res.send({ data: [username, hashedPassword] });   
        }
    }
}); 

export default router;

