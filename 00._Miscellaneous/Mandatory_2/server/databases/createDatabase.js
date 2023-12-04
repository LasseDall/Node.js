import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS users;");
    await db.exec("DROP TABLE IF EXISTS albums;");
    await db.exec("DROP TABLE IF EXISTS users_albums;");
    await db.exec("DROP TABLE IF EXISTS follow_users;");
}


//Create tables (DDL)
await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username VARCHAR(50) NOT NULL,
    password TEXT
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title VARCHAR(50) NOT NULL,
    artist VARCHAR(50) NOT NULL,
    genre VARCHAR(50),
    rating int
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS users_albums ( 
    users_id INTEGER NOT NULL,
    albums_id INTEGER NOT NULL
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS follow_users ( 
    users_id INTEGER NOT NULL,
    followed_users_id INTEGER NOT NULL
);`);

//SEED the DB (DML)
if (isDeleteMode) {
    await db.run("INSERT INTO users (username, password) VALUES ('Lasse123', '$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu');");
    await db.run("INSERT INTO users (username, password) VALUES ('Brian', '$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu');");
    await db.run("INSERT INTO albums (title, artist, genre) VALUES ('The Wall', 'Pink Floyd', 'Prog Rock');");
    await db.run("INSERT INTO albums (title, artist, genre) VALUES ('Animals', 'Pink Floyd', 'Prog Rock');");
    await db.run("INSERT INTO users_albums (users_id, albums_id) VALUES (1, 1);");
    await db.run("INSERT INTO users_albums (users_id, albums_id) VALUES (1, 2);");
    await db.run("INSERT INTO follow_users (users_id, followed_users_id) VALUES (1, 1);");
    await db.run("INSERT INTO follow_users (users_id, followed_users_id) VALUES (1, 2);");

}