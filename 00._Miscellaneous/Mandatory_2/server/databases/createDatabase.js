import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS users;");
}


//Create tables (DDL)
await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username VARCHAR(50) NOT NULL,
    password TEXT
);`);

//SEED the DB (DML)
if (isDeleteMode) {
    await db.run("INSERT INTO users (username, password) VALUES ('Lasse123', '$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu');");
}